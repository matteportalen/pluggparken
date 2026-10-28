/* app.js - gränssnitt för hörnillusionsgeneratorn. Kräver engine.js, pdf.js, worker.js. */
(function () {
  'use strict';
  const E = window.HornEngine, P = window.HornPdf;
  const $ = (id) => document.getElementById(id);
  const SIZE = { A3: 270, A4: 180 };
  const QUALITY = {
    snabb: { ppm: 4, ss: 1, K: 8, label: 'Snabb (utkast)' },
    bra:   { ppm: 8, ss: 2, K: 10, label: 'Bra (rekommenderas)' },
    bast:  { ppm: 10, ss: 2, K: 12, label: 'Bäst (tar längre tid)' },
  };

  // ------------------------------------------------------------ tillstånd
  const st = { design: 'labyrint', mode: 'tak', paper: 'A3', eye: 1.2, cells: E.DESIGNS.labyrint.cells, seed: 7, quality: 'bra' };
  let preview = null;                 // {sheets, defs, mode, eyeMm}
  let runToken = 0;
  let pdfBusy = false;                // medan PDF:en skapas pausas förhandsvisningen (annars avbryter den PDF-körningen)

  // ------------------------------------------------------------ worker-pool
  let pool = [];
  function getPool() {
    if (pool.length) return pool;
    const n = Math.max(1, Math.min(8, (navigator.hardwareConcurrency || 4)));
    for (let i = 0; i < n; i++) pool.push(new Worker('worker.js'));
    return pool;
  }
  function resetPool() { pool.forEach((w) => w.terminate()); pool = []; }

  /*
   * Renderar de tre arken. Returnerar Promise<{sheets:{namn:{data,w}}, defs, W, eyeMm}>.
   * onProgress(0..1). Avbryts (Promise avvisas med 'avbruten') om runToken ändras.
   */
  function renderAll(q, onProgress) {
    const token = ++runToken;
    resetPool();   // nya arbetare för varje körning: kvarglömda svar från en avbruten körning kan inte hamna i de nya bladen
    const size = SIZE[st.paper];
    const o = { design: st.design, mode: st.mode, cells: st.cells, seed: st.seed, size: size, eye: st.eye, ppm: q.ppm, ss: q.ss, K: q.K };
    const { scene, cfg, defs, W } = E.makeConfig(o);
    const names = E.sheetOrder(st.mode);
    const sheets = {};
    names.forEach((nm) => { sheets[nm] = { data: new Uint8ClampedArray(W * W * 4), w: W }; });
    const rowsPer = Math.max(4, Math.round(W / 60));
    const tasks = [];
    names.forEach((nm) => { for (let y = 0; y < W; y += rowsPer) tasks.push({ nm: nm, y0: y, y1: Math.min(W, y + rowsPer) }); });
    const total = tasks.length;
    let done = 0, next = 0;
    const workers = getPool();
    return new Promise((resolve, reject) => {
      let failed = false;
      workers.forEach((w) => {
        const feed = () => {
          if (failed) return;
          if (token !== runToken) { failed = true; reject(new Error('avbruten')); return; }
          if (next >= total) return;
          const t = tasks[next++];
          w.onmessage = (ev) => {
            const m = ev.data;
            sheets[m.sheet].data.set(m.rgba, m.y0 * W * 4);
            done++;
            if (onProgress) onProgress(done / total);
            if (done === total) resolve({ sheets: sheets, defs: defs, W: W, eyeMm: st.eye * 1000, size: size });
            else feed();
          };
          w.onerror = (err) => { failed = true; reject(err); };
          w.postMessage({ id: 0, sheet: t.nm, scene: scene, cfg: cfg, def: defs[t.nm], y0: t.y0, y1: t.y1 });
        };
        feed();
      });
    });
  }

  // ------------------------------------------------------------ förhandsvisning / "flytta dig"
  const view = $('view'), vctx = view.getContext('2d');
  const VW = 720, VH = 480;
  const vImg = vctx.createImageData(VW, VH);
  let viewPending = false;

  function eyeNow() {
    const lat = Number($('lat').value) * 10, dist = Number($('dist').value) * 10;     // cm -> mm
    const e0 = st.eye * 1000;
    const base = [e0, e0, e0];
    const bs = E.cameraBasis(st.mode, base);
    const eye = [0, 1, 2].map((k) => Math.max(80, base[k] + bs.right[k] * lat - bs.f[k] * dist));
    return eye;
  }
  function drawView() {
    if (!preview) return;
    viewPending = false;
    E.viewFrame(preview.sheets, preview.defs, preview.mode, eyeNow(), VW, VH, vImg.data, 26);
    vctx.putImageData(vImg, 0, 0);
  }
  function scheduleView() { if (!viewPending) { viewPending = true; requestAnimationFrame(drawView); } }

  let previewTimer = null;
  function schedulePreview(delay) {
    clearTimeout(previewTimer);
    if (pdfBusy) { previewTimer = setTimeout(() => schedulePreview(delay), 500); return; }
    previewTimer = setTimeout(doPreview, delay === undefined ? 350 : delay);
  }
  function doPreview() {
    $('viewStatus').textContent = 'Räknar ut bilden …';
    renderAll(QUALITY.snabb, null).then((r) => {
      preview = { sheets: r.sheets, defs: r.defs, mode: st.mode };
      $('lat').value = 0; $('dist').value = 0; updateSliderLabels();
      drawView();
      $('viewStatus').textContent = '';
    }).catch((e) => { if (!e || e.message !== 'avbruten') { $('viewStatus').textContent = 'Något gick fel: ' + (e && e.message || e); } });
  }

  // ------------------------------------------------------------ PDF
  function toJpeg(sheet) {
    const c = document.createElement('canvas');
    c.width = c.height = sheet.w;
    c.getContext('2d').putImageData(new ImageData(sheet.data, sheet.w, sheet.w), 0, 0);
    return new Promise((res) => c.toBlob((b) => b.arrayBuffer().then((ab) => res(new Uint8Array(ab))), 'image/jpeg', 0.92));
  }

  async function makePdf() {
    const btn = $('makePdf'), bar = $('bar'), prog = $('progress');
    pdfBusy = true; clearTimeout(previewTimer);
    btn.disabled = true; prog.hidden = false; bar.style.width = '0%';
    $('pdfStatus').textContent = 'Räknar ut bladen …';
    try {
      const q = QUALITY[st.quality];
      const r = await renderAll(q, (f) => { bar.style.width = Math.round(f * 90) + '%'; });
      $('pdfStatus').textContent = 'Bygger PDF …';
      const names = E.sheetOrder(st.mode);
      const sheets = [];
      for (const nm of names) sheets.push({ name: nm, jpg: await toJpeg(r.sheets[nm]), w: r.W, h: r.W });
      const bytes = P.buildHornPdf({ mode: st.mode, title: E.DESIGNS[st.design].title, size: r.size, eyeM: st.eye, paper: st.paper, sheets: sheets });
      bar.style.width = '100%';
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'hornillusion_' + st.design + '_' + st.mode + '_' + st.paper + '.pdf';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 20000);
      $('pdfStatus').textContent = 'Klart! PDF:en har laddats ner (' + st.paper + ', ' + SIZE[st.paper] + ' mm kvadrat).';
      window.__lastPdfBytes = bytes.length;
    } catch (e) {
      $('pdfStatus').textContent = (e && e.message === 'avbruten') ? 'Avbrutet.' : 'Något gick fel: ' + (e && e.message || e);
    } finally {
      pdfBusy = false; btn.disabled = false;
      schedulePreview(300);   // förhandsvisningen kan ha avbrutits när PDF:en startade
      setTimeout(() => { prog.hidden = true; }, 1500);
    }
  }

  // ------------------------------------------------------------ gränssnitt
  function updateSliderLabels() {
    const lat = Number($('lat').value), dist = Number($('dist').value);
    $('latv').textContent = lat === 0 ? 'rätt plats' : (lat > 0 ? lat + ' cm åt höger' : (-lat) + ' cm åt vänster');
    $('distv').textContent = dist === 0 ? 'rätt avstånd' : (dist > 0 ? dist + ' cm längre bort' : (-dist) + ' cm närmare');
  }
  function updateDesignUi() {
    const d = E.DESIGNS[st.design];
    $('designInfo').textContent = d.info;
    const c = $('cells'); c.min = d.cellsMin; c.max = d.cellsMax; c.value = st.cells;
    $('cellsv').textContent = st.cells;
    document.querySelectorAll('.design').forEach((el) => el.classList.toggle('on', el.dataset.design === st.design));
  }
  function updateStatic() {
    $('eyev').textContent = st.eye.toFixed(1).replace('.', ',') + ' m';
    $('eyeHelp').textContent = st.mode === 'tak'
      ? 'Stå ' + $('eyev').textContent + ' från båda väggarna, med ögonen ' + $('eyev').textContent + ' under taket.'
      : 'Stå ' + $('eyev').textContent + ' från båda väggarna, med ögonen ' + $('eyev').textContent + ' över golvet.';
    $('sizeHelp').textContent = 'Bladen blir ' + SIZE[st.paper] + ' × ' + SIZE[st.paper] + ' mm.';
  }

  function build() {
    const box = $('designs');
    Object.keys(E.DESIGNS).forEach((k) => {
      const d = E.DESIGNS[k];
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'design'; b.dataset.design = k;
      b.innerHTML = '<strong></strong><span></span>';
      b.firstChild.textContent = d.label; b.lastChild.textContent = d.info;
      b.addEventListener('click', () => { st.design = k; st.cells = d.cells; updateDesignUi(); schedulePreview(100); });
      box.appendChild(b);
    });
    const q = $('quality');
    Object.keys(QUALITY).forEach((k) => { const o = document.createElement('option'); o.value = k; o.textContent = QUALITY[k].label; q.appendChild(o); });
    q.value = st.quality;
    q.addEventListener('change', () => { st.quality = q.value; });
    document.querySelectorAll('input[name=mode]').forEach((r) => r.addEventListener('change', () => { st.mode = r.value; updateStatic(); schedulePreview(100); }));
    document.querySelectorAll('input[name=paper]').forEach((r) => r.addEventListener('change', () => { st.paper = r.value; updateStatic(); schedulePreview(100); }));
    $('eye').addEventListener('input', () => { st.eye = Number($('eye').value); updateStatic(); schedulePreview(); });
    $('cells').addEventListener('input', () => { st.cells = Number($('cells').value); $('cellsv').textContent = st.cells; schedulePreview(); });
    $('reseed').addEventListener('click', () => { st.seed = Math.floor(Math.random() * 1e6); $('seedv').textContent = st.seed; schedulePreview(100); });
    $('lat').addEventListener('input', () => { updateSliderLabels(); scheduleView(); });
    $('dist').addEventListener('input', () => { updateSliderLabels(); scheduleView(); });
    $('resetview').addEventListener('click', () => { $('lat').value = 0; $('dist').value = 0; updateSliderLabels(); scheduleView(); });
    $('makePdf').addEventListener('click', makePdf);
    $('seedv').textContent = st.seed;
    updateDesignUi(); updateStatic(); updateSliderLabels();
    schedulePreview(50);
  }
  window.__horn = { st: st, renderAll: renderAll, QUALITY: QUALITY };
  document.addEventListener('DOMContentLoaded', build);
})();
