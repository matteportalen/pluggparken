const HELV_W = [761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584, 761, 556, 0, 222, 556, 333, 1000, 556, 556, 333, 1000, 667, 333, 1000, 0, 611, 0, 0, 222, 222, 333, 333, 350, 556, 1000, 333, 1000, 500, 333, 944, 0, 500, 667, 278, 333, 556, 556, 556, 556, 260, 556, 333, 737, 370, 556, 584, 333, 737, 333, 400, 584, 333, 333, 333, 556, 537, 278, 333, 333, 365, 556, 834, 834, 834, 611, 667, 667, 667, 667, 667, 667, 1000, 722, 667, 667, 667, 667, 278, 278, 278, 278, 722, 722, 778, 778, 778, 778, 778, 584, 778, 722, 722, 722, 722, 667, 667, 611, 556, 556, 556, 556, 556, 556, 889, 500, 556, 556, 556, 556, 278, 278, 278, 278, 556, 556, 556, 556, 556, 556, 556, 584, 611, 556, 556, 556, 556, 500, 556, 500];
const HELV_B_W = [761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 761, 278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611, 975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556, 333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611, 611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584, 761, 556, 0, 278, 556, 500, 1000, 556, 556, 333, 1000, 667, 333, 1000, 0, 611, 0, 0, 278, 278, 500, 500, 350, 556, 1000, 333, 1000, 556, 333, 944, 0, 500, 667, 278, 333, 556, 556, 556, 556, 280, 556, 333, 737, 370, 556, 584, 333, 737, 333, 400, 584, 333, 333, 333, 611, 556, 278, 333, 333, 365, 556, 834, 834, 834, 611, 722, 722, 722, 722, 722, 722, 1000, 722, 667, 667, 667, 667, 278, 278, 278, 278, 722, 722, 778, 778, 778, 778, 778, 584, 778, 722, 722, 722, 722, 667, 667, 611, 556, 556, 556, 556, 556, 556, 889, 556, 556, 556, 556, 556, 278, 278, 278, 278, 611, 611, 611, 611, 611, 611, 611, 584, 611, 611, 611, 611, 611, 556, 611, 556];

/*
 * pdf.js - minimal PDF-skrivare (inga beroenden) + layouten för hörnillusionsbladen.
 * Använder standardtypsnittet Helvetica (WinAnsi), JPEG-bilder (DCTDecode) och vektorgrafik.
 * Koordinater i mm, origo uppe till vänster.
 */
(function (root) {
  'use strict';
  const K = 72 / 25.4;
  const CP = { 'å': 0xE5, 'ä': 0xE4, 'ö': 0xF6, 'Å': 0xC5, 'Ä': 0xC4, 'Ö': 0xD6, 'é': 0xE9, '×': 0xD7, '–': 0x96, '—': 0x97, '·': 0xB7, '°': 0xB0, '’': 0x92, '“': 0x93, '”': 0x94, '…': 0x85 };

  function enc(str) {
    let s = '';
    for (const ch of String(str)) {
      const c = ch.codePointAt(0);
      if (c < 128) s += ch; else if (CP[ch] !== undefined) s += String.fromCharCode(CP[ch]); else s += '?';
    }
    return s;
  }
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  function textWidth(str, size, bold) {
    const Wt = bold ? HELV_B_W : HELV_W;
    const e = enc(str);
    let w = 0;
    for (let i = 0; i < e.length; i++) w += Wt[e.charCodeAt(i)] || 0;
    return (w / 1000 * size) / K;
  }
  const num = (n) => (Math.round(n * 1000) / 1000).toString();

  class PdfDoc {
    constructor(wmm, hmm) { this.W = wmm; this.H = hmm; this.pages = []; this.images = []; this.cur = null; }
    addPage() { this.cur = { ops: [], imgs: new Set() }; this.pages.push(this.cur); }
    _y(y) { return (this.H - y) * K; }
    fill(r, g, b) { this.cur.ops.push(`${num(r)} ${num(g)} ${num(b)} rg`); }
    stroke(r, g, b) { this.cur.ops.push(`${num(r)} ${num(g)} ${num(b)} RG`); }
    lineWidth(mm) { this.cur.ops.push(`${num(mm * K)} w`); }
    line(x1, y1, x2, y2) { this.cur.ops.push(`${num(x1 * K)} ${num(this._y(y1))} m ${num(x2 * K)} ${num(this._y(y2))} l S`); }
    poly(pts, doFill, doStroke) {
      const o = this.cur.ops;
      pts.forEach((p, i) => o.push(`${num(p[0] * K)} ${num(this._y(p[1]))} ${i ? 'l' : 'm'}`));
      o.push(doFill && doStroke ? 'b' : doFill ? 'f' : 's');
    }
    circle(cx, cy, r) {
      const k = 0.5523 * r, o = this.cur.ops, X = (x) => num(x * K), Y = (y) => num(this._y(y));
      o.push(`${X(cx + r)} ${Y(cy)} m`);
      o.push(`${X(cx + r)} ${Y(cy - k)} ${X(cx + k)} ${Y(cy - r)} ${X(cx)} ${Y(cy - r)} c`);
      o.push(`${X(cx - k)} ${Y(cy - r)} ${X(cx - r)} ${Y(cy - k)} ${X(cx - r)} ${Y(cy)} c`);
      o.push(`${X(cx - r)} ${Y(cy + k)} ${X(cx - k)} ${Y(cy + r)} ${X(cx)} ${Y(cy + r)} c`);
      o.push(`${X(cx + k)} ${Y(cy + r)} ${X(cx + r)} ${Y(cy + k)} ${X(cx + r)} ${Y(cy)} c f`);
    }
    // opts: size (pt), bold, align ('left'|'center'|'right'), angle (grader, moturs), color [r,g,b]
    text(str, x, y, opts) {
      opts = opts || {};
      const size = opts.size || 10, bold = !!opts.bold, al = opts.align || 'left';
      const w = textWidth(str, size, bold) * K;               // pt
      const dx = al === 'center' ? -w / 2 : al === 'right' ? -w : 0;
      const a = (opts.angle || 0) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
      const o = this.cur.ops;
      if (opts.color) this.fill(opts.color[0], opts.color[1], opts.color[2]);
      o.push(`q ${num(c)} ${num(s)} ${num(-s)} ${num(c)} ${num(x * K)} ${num(this._y(y))} cm BT /${bold ? 'F2' : 'F1'} ${num(size)} Tf ${num(dx)} 0 Td (${esc(enc(str))}) Tj ET Q`);
    }
    image(jpg, pw, ph, x, y, w, h) {
      let idx = this.images.findIndex((im) => im.bytes === jpg);
      if (idx < 0) { this.images.push({ bytes: jpg, w: pw, h: ph }); idx = this.images.length - 1; }
      this.cur.imgs.add(idx);
      this.cur.ops.push(`q ${num(w * K)} 0 0 ${num(h * K)} ${num(x * K)} ${num(this._y(y + h))} cm /Im${idx} Do Q`);
    }
    output() {
      const chunks = []; let len = 0; const offs = [];
      const push = (s) => { const b = typeof s === 'string' ? Uint8Array.from(s, (ch) => ch.charCodeAt(0) & 255) : s; chunks.push(b); len += b.length; };
      const obj = (n, body) => { offs[n] = len; push(`${n} 0 obj\n`); push(body); push('\nendobj\n'); };
      push('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
      let n = 4; const imgObj = this.images.map(() => ++n);
      const pageObjs = this.pages.map(() => { const c = ++n, p = ++n; return { c, p }; });
      obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
      obj(2, `<< /Type /Pages /Kids [${pageObjs.map((o) => o.p + ' 0 R').join(' ')}] /Count ${this.pages.length} >>`);
      obj(3, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
      obj(4, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
      this.images.forEach((im, i) => {
        offs[imgObj[i]] = len;
        push(`${imgObj[i]} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${im.w} /Height ${im.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${im.bytes.length} >>\nstream\n`);
        push(im.bytes); push('\nendstream\nendobj\n');
      });
      this.pages.forEach((pg, i) => {
        const content = pg.ops.join('\n');
        const { c, p } = pageObjs[i];
        offs[c] = len; push(`${c} 0 obj\n<< /Length ${content.length} >>\nstream\n`); push(content); push('\nendstream\nendobj\n');
        const xo = [...pg.imgs].map((k) => `/Im${k} ${imgObj[k]} 0 R`).join(' ');
        obj(p, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${num(this.W * K)} ${num(this.H * K)}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << ${xo} >> >> /Contents ${c} 0 R >>`);
      });
      const xref = len;
      push(`xref\n0 ${n + 1}\n0000000000 65535 f \n`);
      for (let i = 1; i <= n; i++) push(String(offs[i]).padStart(10, '0') + ' 00000 n \n');
      push(`trailer\n<< /Size ${n + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
      const out = new Uint8Array(len); let p = 0;
      for (const c of chunks) { out.set(c, p); p += c.length; }
      return out;
    }
  }

  // ------------------------------------------------------------------ layout
  const PAPERS = { A3: [297, 420], A4: [210, 297] };

  const EDGES = {
    tak: {
      tak:     { left: 'mot VÄNSTER vägg', bottom: 'mot HÖGER vägg', vertex: 'bl', name: 'TAK' },
      vanster: { top: 'mot TAKET', right: 'hörnkant, mot HÖGER vägg', vertex: 'tr', name: 'VÄNSTER VÄGG' },
      hoger:   { top: 'mot TAKET', left: 'hörnkant, mot VÄNSTER vägg', vertex: 'tl', name: 'HÖGER VÄGG' },
    },
    golv: {
      golv:    { top: 'mot HÖGER vägg', left: 'mot VÄNSTER vägg', vertex: 'tl', name: 'GOLV' },
      vanster: { bottom: 'mot GOLVET', right: 'hörnkant, mot HÖGER vägg', vertex: 'br', name: 'VÄNSTER VÄGG' },
      hoger:   { bottom: 'mot GOLVET', left: 'hörnkant, mot VÄNSTER vägg', vertex: 'bl', name: 'HÖGER VÄGG' },
    },
  };

  const fmtM = (x) => x.toFixed(1).replace('.', ',');

  function wrap(str, size, widthMm) {
    const words = str.split(' '); const lines = []; let cur = '';
    for (const w of words) {
      const t = cur ? cur + ' ' + w : w;
      if (textWidth(t, size, false) <= widthMm || !cur) cur = t; else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  function tri(doc, cx, cy, dir, r) {       // liten fylld triangel, dir: 'u','d','l','r'
    const P = { u: [[0, -r], [r, r], [-r, r]], d: [[0, r], [r, -r], [-r, -r]], l: [[-r, 0], [r, -r], [r, r]], r: [[r, 0], [-r, -r], [-r, r]] }[dir];
    doc.poly(P.map((p) => [cx + p[0], cy + p[1]]), true, false);
  }

  function rhombi(mode, cx, cy, r) {
    const vt = {}; [30, 90, 150, 210, 270, 330].forEach((a) => { vt[a] = [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)]; });
    const c = [cx, cy];
    if (mode === 'tak') return { 1: [c, vt[150], vt[90], vt[30]], 2: [c, vt[150], vt[210], vt[270]], 3: [c, vt[30], vt[330], vt[270]] };
    return { 2: [c, vt[90], vt[150], vt[210]], 3: [c, vt[90], vt[30], vt[330]], 1: [c, vt[210], vt[270], vt[330]] };
  }

  /*
   * opts: { mode:'tak'|'golv', title, size (mm), eyeM, paper, sheets:[{name, jpg:Uint8Array, w, h}] (ordning 1,2,3) }
   */
  function buildHornPdf(opts) {
    const [PW, PH] = PAPERS[opts.paper];
    const s = opts.size, mode = opts.mode;
    const doc = new PdfDoc(PW, PH);
    const x0 = (PW - s) / 2, top = 24, bot = top + s;
    opts.sheets.forEach((sh, idx) => {
      const i = idx + 1, ed = EDGES[mode][sh.name];
      doc.addPage();
      doc.image(sh.jpg, sh.w, sh.h, x0, top, s, s);
      doc.stroke(0, 0, 0); doc.lineWidth(0.15);
      for (const X of [x0, x0 + s]) for (const Y of [top, bot]) {
        const dx = X === x0 ? -1 : 1, dy = Y === top ? -1 : 1;
        doc.line(X + dx * 2, Y, X + dx * 9, Y);
        doc.line(X, Y + dy * 2, X, Y + dy * 9);
      }
      doc.text('BLAD ' + i + ' av 3 - ' + ed.name, x0, 13, { size: 18, bold: true, color: [0, 0, 0] });
      doc.text(opts.title + ' · hörnillusion', x0 + s, 13, { size: 8, align: 'right', color: [0, 0, 0] });
      doc.text('pluggparken.se', PW - 10, PH - 7, { size: 7, align: 'right', color: [0.5, 0.5, 0.5] });
      // kantetiketter
      const lc = [0.1, 0.1, 0.5];
      doc.fill(...lc);
      if (ed.top) {
        const w = textWidth(ed.top, 8, true);
        doc.text(ed.top, PW / 2, top - 4, { size: 8, bold: true, align: 'center', color: lc });
        tri(doc, PW / 2 - w / 2 - 3, top - 5.2, 'u', 1.3); tri(doc, PW / 2 + w / 2 + 3, top - 5.2, 'u', 1.3);
      }
      if (ed.bottom) {
        const w = textWidth(ed.bottom, 8, true);
        doc.text(ed.bottom, PW / 2, bot + 6.5, { size: 8, bold: true, align: 'center', color: lc });
        tri(doc, PW / 2 - w / 2 - 3, bot + 5.3, 'd', 1.3); tri(doc, PW / 2 + w / 2 + 3, bot + 5.3, 'd', 1.3);
      }
      for (const side of ['left', 'right']) {
        if (!ed[side]) continue;
        const xx = side === 'left' ? x0 - 5 : x0 + s + 7;
        const w = textWidth(ed[side], 8, true), cy = top + s / 2;
        doc.text(ed[side], xx, cy, { size: 8, bold: true, align: 'center', angle: 90, color: lc });
        const tx = xx - 1.2;
        tri(doc, tx, cy - w / 2 - 3, side === 'left' ? 'l' : 'r', 1.3);
        tri(doc, tx, cy + w / 2 + 3, side === 'left' ? 'l' : 'r', 1.3);
      }
      // hörnmarkering
      const vx = ed.vertex[1] === 'l' ? x0 : x0 + s, vy = ed.vertex[0] === 't' ? top : bot;
      const sx = ed.vertex[1] === 'l' ? -1 : 1, sy = ed.vertex[0] === 't' ? -1 : 1;
      doc.fill(0.8, 0.1, 0.1);
      doc.circle(vx + sx * 5.5, vy + sy * 5.5, 1.6);
      doc.text('HÖRN', vx + sx * 5.5, vy + sy * 10.5 + (sy > 0 ? 2 : 0), { size: 7, bold: true, align: 'center', color: [0.8, 0.1, 0.1] });
      // instruktioner
      const yb = bot + 14;
      doc.text('SÅ HÄR GÖR DU', x0, yb, { size: 12, bold: true, color: [0, 0, 0] });
      const where = mode === 'tak' ? 'taket' : 'golvet';
      const eye = mode === 'tak' ? 'ögonen ' + fmtM(opts.eyeM) + ' m under taket' : 'ögonen ' + fmtM(opts.eyeM) + ' m över golvet';
      const steps = [
        'Skriv ut alla tre blad i ' + opts.paper + ', stående, i 100 % ("verklig storlek", inte "anpassa till sida"). Kontrollmät: linjalen nedan ska vara 100 mm och bildkvadraten ' + s + ' × ' + s + ' mm.',
        'Klipp ut kvadraten precis på bildens kant - bilden går ända ut. Klippmärkena i hörnen visar var.',
        'Tejpa fast bladen i hörnet med målartejp: blad 1 i ' + where + ', blad 2 på vänster vägg, blad 3 på höger vägg. Hörnet markerat HÖRN ska gå exakt in i hörnpunkten; kanterna ska mötas utan glapp och utan överlapp.',
        'Stå ' + fmtM(opts.eyeM) + ' m från båda väggarna (på diagonalen mot hörnet), ' + eye + '. Titta rakt in i hörnet, helst med ETT öga (håll för det andra) eller filma med mobilen. Det funkar även med båda ögonen, men då ser man lättare att bilden är platt.',
        'Motivet ska nu se ut att sticka ut ur hörnet. Flytta dig åt sidan och illusionen "vrider sig" och släpper till slut.',
      ];
      let y = yb + 6.5;
      const textw = s - 78;
      steps.forEach((t, k) => {
        wrap((k + 1) + '.  ' + t, 8.6, textw).forEach((ln, j) => { doc.text(ln, x0 + (j === 0 ? 0 : 4.2), y, { size: 8.6, color: [0, 0, 0] }); y += 4.3; });
        y += 1.4;
      });
      // diagram
      const cx = x0 + s - 33, cy = yb + 38, r = 24 * 0.9;
      const polys = rhombi(mode, cx, cy, r);
      doc.lineWidth(0.2); doc.stroke(0.25, 0.25, 0.3);
      for (const key of Object.keys(polys)) {
        const act = Number(key) === i;
        if (act) doc.fill(0.62, 0.58, 0.9); else doc.fill(0.9, 0.9, 0.93);
        doc.poly(polys[key], true, true);
        const mx = polys[key].reduce((a, p) => a + p[0], 0) / 4, my = polys[key].reduce((a, p) => a + p[1], 0) / 4;
        doc.text(key, mx, my + 1.4, { size: 11, bold: true, align: 'center', color: [0, 0, 0] });
      }
      const lab = [0.2, 0.2, 0.25];
      if (mode === 'tak') {
        doc.text('1 = TAK', cx, cy - r - 4, { size: 7, align: 'center', color: lab });
        doc.text('2 = VÄNSTER', cx - r - 18, cy + r * 0.95, { size: 7, color: lab });
        doc.text('3 = HÖGER', cx + r + 18, cy + r * 0.95, { size: 7, align: 'right', color: lab });
      } else {
        doc.text('1 = GOLV', cx, cy + r + 9, { size: 7, align: 'center', color: lab });
        doc.text('2 = VÄNSTER', cx - r - 18, cy - r * 0.95, { size: 7, color: lab });
        doc.text('3 = HÖGER', cx + r + 18, cy - r * 0.95, { size: 7, align: 'right', color: lab });
      }
      // linjal 100 mm
      const ry = PH - 14;
      doc.stroke(0, 0, 0); doc.lineWidth(0.18);
      doc.line(x0, ry, x0 + 100, ry);
      for (let m = 0; m <= 100; m += 10) doc.line(x0 + m, ry, x0 + m, ry - (m % 50 === 0 ? 3 : 2));
      doc.text('100 mm - kontrollmät vid utskrift', x0 + 103, ry + 1, { size: 7.5, color: [0, 0, 0] });
    });
    return doc.output();
  }

  const api = { PdfDoc, buildHornPdf, textWidth, PAPERS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.HornPdf = api;
})(typeof self !== 'undefined' ? self : this);
