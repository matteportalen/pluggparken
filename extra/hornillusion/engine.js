/*
 * engine.js - motor för "impossible corner"-illusioner (körs i webbläsare, worker eller Node).
 *
 * Tre kvadratiska ark (golv/tak + två väggar) räknas så att de, sedda från EN punkt, ser ut som ett
 * 3D-motiv som sticker ut ur hörnet. Varje pixel på ett ark får färgen från den punkt på det virtuella
 * motivet som en stråle från ögat träffar (anamorfos).
 *
 * Hörnram (a,b,c): a = öster, c = söder, b = avstånd från tak/golv in i rummet.
 * Vänster vägg = väst (a=0), höger vägg = nord (c=0).
 */
(function (root) {
  'use strict';

  const DESIGNS = {
    labyrint: { title: '3D-labyrintkub', label: 'Labyrintkub', info: 'Tre labyrinter på en kub som hänger ut ur hörnet.', cells: 12, cellsMin: 6, cellsMax: 20, obj: [0.80, 0.80, 0.92], wall: [0.80, 0.80, 0.92] },
    kub:      { title: 'Svävande kub', label: 'Svävande kub', info: 'En kub som svävar i hörnet och kastar skugga på väggarna.', cells: 16, cellsMin: 8, cellsMax: 32, obj: [0.42, 0.42, 0.48], wall: [0.90, 0.90, 0.93] },
    pelare:   { title: 'Pelare', label: 'Pelare', info: 'Staplar av olika höjd som växer ut ur de tre väggarna.', cells: 14, cellsMin: 8, cellsMax: 24, obj: [0.70, 0.72, 0.90], wall: [0.92, 0.92, 0.95] },
    trappa:   { title: 'Trappor', label: 'Trappor', info: 'Trappsteg som stiger från väggarna mot hörnet.', cells: 14, cellsMin: 8, cellsMax: 24, obj: [0.88, 0.78, 0.66], wall: [0.93, 0.91, 0.88] },
  };

  // ---------------------------------------------------------------- slump
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---------------------------------------------------------------- scen
  function makeMaze(n, rnd) {
    const N = 2 * n + 1;
    const m = new Uint8Array(N * N).fill(1);
    m[1 * N + 1] = 0;
    const seen = new Uint8Array(n * n);
    seen[0] = 1;
    const stack = [[0, 0]];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    while (stack.length) {
      const [r, c] = stack[stack.length - 1];
      const nb = [];
      for (const [dr, dc] of dirs) {
        const rr = r + dr, cc = c + dc;
        if (rr >= 0 && rr < n && cc >= 0 && cc < n && !seen[rr * n + cc]) nb.push([rr, cc, dr, dc]);
      }
      if (!nb.length) { stack.pop(); continue; }
      const [rr, cc, dr, dc] = nb[Math.floor(rnd() * nb.length)];
      seen[rr * n + cc] = 1;
      m[(2 * r + 1 + dr) * N + (2 * c + 1 + dc)] = 0;
      m[(2 * rr + 1) * N + (2 * cc + 1)] = 0;
      stack.push([rr, cc]);
    }
    return m;
  }

  // returnerar { G, occ (G*G*G, index (i*G+j)*G+k), aod }
  function makeScene(design, n, seed) {
    const rnd = mulberry32(seed >>> 0);
    if (design === 'labyrint') {
      const G = 2 * n + 1;
      const occ = new Uint8Array(G * G * G);
      const at = (i, j, k) => (i * G + j) * G + k;
      for (let i = 0; i < G - 1; i++) for (let j = 0; j < G - 1; j++) for (let k = 0; k < G - 1; k++) occ[at(i, j, k)] = 1;
      const mx = makeMaze(n, rnd), my = makeMaze(n, rnd), mz = makeMaze(n, rnd);
      for (let p = 0; p < G; p++) for (let q = 0; q < G; q++) {
        occ[at(G - 1, p, q)] |= mx[p * G + q];
        occ[at(p, G - 1, q)] |= my[p * G + q];
        occ[at(p, q, G - 1)] |= mz[p * G + q];
      }
      return { G, occ, aod: 2.2 };
    }
    const G = Math.max(6, n | 0);
    const occ = new Uint8Array(G * G * G);
    const at = (i, j, k) => (i * G + j) * G + k;
    if (design === 'kub') {
      const m = Math.max(2, Math.round(G * 0.5));
      const g = Math.floor((G - m) / 2);
      for (let i = g; i < g + m; i++) for (let j = g; j < g + m; j++) for (let k = g; k < g + m; k++) occ[at(i, j, k)] = 1;
      return { G, occ, aod: G * 0.45 };
    }
    const hmax = Math.max(2, G >> 1);
    const heights = () => {
      const h = new Int32Array(G * G);
      const p1 = rnd() * 6, p2 = rnd() * 6;
      for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) {
        let v;
        if (design === 'pelare') {
          v = 0.5 + 0.38 * Math.sin(0.75 * i + p1) * Math.sin(0.75 * j + p2) + 0.22 * (rnd() - 0.5);
          v = Math.round(v * hmax);
        } else {
          v = Math.floor((G - (i + j)) / 2);
        }
        h[i * G + j] = Math.min(hmax, Math.max(0, v));
      }
      return h;
    };
    const ha = heights(), hb = heights(), hc = heights();
    for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) for (let k = 0; k < G; k++) {
      let v = 0;
      if (k < hc[i * G + j]) v = 1;       // från planet c = 0
      if (i < ha[j * G + k]) v = 1;       // från planet a = 0
      if (j < hb[i * G + k]) v = 1;       // från planet b = 0
      occ[at(i, j, k)] = v;
    }
    return { G, occ, aod: 2.2 };
  }

  // ---------------------------------------------------------------- geometri
  // Arkens placering i hörnramen, mm. Pixel (cx,cy) -> O + cx*U + cy*V.
  function sheetDefs(mode, s, ps) {
    if (mode === 'tak') {
      return {
        tak:     { O: [0, 0, s], U: [ps, 0, 0],  V: [0, 0, -ps] },
        vanster: { O: [0, 0, s], U: [0, 0, -ps], V: [0, ps, 0] },
        hoger:   { O: [0, 0, 0], U: [ps, 0, 0],  V: [0, ps, 0] },
      };
    }
    return {
      golv:    { O: [0, 0, 0], U: [ps, 0, 0],  V: [0, 0, ps] },
      vanster: { O: [0, s, s], U: [0, 0, -ps], V: [0, -ps, 0] },
      hoger:   { O: [0, s, 0], U: [ps, 0, 0],  V: [0, -ps, 0] },
    };
  }
  function sheetOrder(mode) { return [mode === 'tak' ? 'tak' : 'golv', 'vanster', 'hoger']; }
  function planeAxis(def) { for (let k = 0; k < 3; k++) if (def.U[k] === 0 && def.V[k] === 0) return k; return 1; }

  const norm = (v) => { const l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; };
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

  // Kamerabas (fram, upp, höger) i hörnramen, räknad i den fysiska (högerhänta) ramen.
  function cameraBasis(mode, Ec) {
    const sb = mode === 'tak' ? -1 : 1;
    const S = [1, sb, 1];
    const E = [Ec[0] * S[0], Ec[1] * S[1], Ec[2] * S[2]];
    const f = norm([-E[0], -E[1], -E[2]]);
    let up = [0, 1, 0];
    const d = dot(up, f);
    up = norm([up[0] - d * f[0], up[1] - d * f[1], up[2] - d * f[2]]);
    const right = cross(f, up);
    const toC = (v) => [v[0] * S[0], v[1] * S[1], v[2] * S[2]];
    return { f: toC(f), up: toC(up), right: toC(right) };
  }

  function lightDir(mode, Ec) {
    const { f, up, right } = cameraBasis(mode, Ec);
    const L = [0, 1, 2].map((k) => -0.60 * f[k] + 0.62 * up[k] - 0.38 * right[k]);
    return norm(L);
  }

  // ---------------------------------------------------------------- strålkastning
  const ix = new Int32Array(3), st = new Int32Array(3);
  const tM = new Float64Array(3), tD = new Float64Array(3);
  let hAx = 0, hSg = 1, hT = 0;

  function traverse(occ, G, o, d, tmaxIn) {
    let tmin = 0, tmax = tmaxIn, entry = -1;
    for (let k = 0; k < 3; k++) {
      const dk = d[k];
      if (Math.abs(dk) < 1e-14) { if (o[k] < 0 || o[k] > G) return 0; continue; }
      let t0 = (0 - o[k]) / dk, t1 = (G - o[k]) / dk;
      if (t0 > t1) { const tt = t0; t0 = t1; t1 = tt; }
      if (t0 > tmin) { tmin = t0; entry = k; }
      if (t1 < tmax) tmax = t1;
    }
    if (tmin >= tmax) return 0;
    for (let k = 0; k < 3; k++) {
      const p = o[k] + d[k] * (tmin + 1e-7);
      let i = Math.floor(p);
      if (i < 0) i = 0;
      if (i > G - 1) i = G - 1;
      ix[k] = i;
      if (d[k] > 0) { st[k] = 1; tM[k] = ((i + 1) - o[k]) / d[k]; tD[k] = 1.0 / d[k]; }
      else if (d[k] < 0) { st[k] = -1; tM[k] = (i - o[k]) / d[k]; tD[k] = -1.0 / d[k]; }
      else { st[k] = 0; tM[k] = 1e30; tD[k] = 1e30; }
    }
    let ax = entry >= 0 ? entry : 0;
    let sg = entry >= 0 ? (d[entry] > 0 ? -1 : 1) : 1;
    let t = tmin;
    for (;;) {
      if (occ[(ix[0] * G + ix[1]) * G + ix[2]]) { hAx = ax; hSg = sg; hT = t; return 1; }
      let m = 0;
      if (tM[1] < tM[m]) m = 1;
      if (tM[2] < tM[m]) m = 2;
      if (tM[m] > tmax) return 0;
      t = tM[m];
      ix[m] += st[m];
      if (ix[m] < 0 || ix[m] >= G) return 0;
      tM[m] += tD[m];
      ax = m; sg = st[m] > 0 ? -1 : 1;
    }
  }

  function hash32(x) {
    x ^= x >>> 16; x = Math.imul(x, 0x7feb352d);
    x ^= x >>> 15; x = Math.imul(x, 0x846ca68b);
    x ^= x >>> 16; return x >>> 0;
  }

  /*
   * Renderar raderna y0..y1-1 av ett ark.
   * scene: {G, occ, aod}; cfg: {W, ss, K, E[3], L[3] (voxelenheter), vs (mm/voxel), obj[3], wall[3]}
   * def: {O,U,V} i mm per pixel (sheetDefs).  Returnerar RGBA (Uint8ClampedArray) för bandet.
   */
  function renderBand(scene, cfg, def, y0, y1) {
    const { G, occ, aod } = scene;
    const { W, ss, K, vs } = cfg;
    const E = cfg.E;
    const Ln = norm(cfg.L);
    const plane = planeAxis(def);
    const O = def.O.map((v) => v / vs), U = def.U.map((v) => v / vs), V = def.V.map((v) => v / vs);
    const out = new Uint8ClampedArray((y1 - y0) * W * 4);
    const Q = [0, 0, 0], d = [0, 0, 0], P = [0, 0, 0], N = [0, 0, 0], dir = [0, 0, 0];
    const col = [0, 0, 0];
    const amb = 0.42, dif = 0.66;
    for (let y = y0; y < y1; y++) {
      for (let x = 0; x < W; x++) {
        let sA = 0, sD = 0, sM = 0, sW = 0;
        for (let sy = 0; sy < ss; sy++) for (let sx = 0; sx < ss; sx++) {
          const cx = x + (sx + 0.5) / ss, cy = y + (sy + 0.5) / ss;
          for (let k = 0; k < 3; k++) { Q[k] = O[k] + cx * U[k] + cy * V[k]; d[k] = Q[k] - E[k]; }
          let ax, sg, WL = 0;
          N[0] = 0; N[1] = 0; N[2] = 0;
          if (traverse(occ, G, E, d, 1e9)) {
            ax = hAx; sg = hSg; N[ax] = sg;
            for (let k = 0; k < 3; k++) P[k] = E[k] + d[k] * hT + N[k] * 1e-3;
          } else {
            WL = 1; ax = plane; sg = 1; N[ax] = 1;
            for (let k = 0; k < 3; k++) P[k] = Q[k] + N[k] * 1e-3;
          }
          const ndl = N[0] * Ln[0] + N[1] * Ln[1] + N[2] * Ln[2];
          let D = 0;
          if (ndl > 0 && !traverse(occ, G, P, Ln, 1e9)) D = ndl;
          const h = hash32((Math.imul(x, 73856093) ^ Math.imul(y, 19349663) ^ Math.imul(sx * ss + sy, 83492791)) >>> 0);
          const phi = (h & 0xFFFF) / 65536.0 * 6.283185307;
          const u1 = (ax + 1) % 3, u2 = (ax + 2) % 3;
          let occl = 0;
          for (let i = 0; i < K; i++) {
            const u = (i + 0.5) / K, r = Math.sqrt(u), th = i * 2.39996323 + phi;
            dir[u1] = r * Math.cos(th); dir[u2] = r * Math.sin(th); dir[ax] = sg * Math.sqrt(1 - u);
            if (traverse(occ, G, P, dir, aod)) occl++;
          }
          const A = 1.0 - occl / K;
          sA += A; sD += D; sM += A * D; sW += WL;
        }
        const n2 = ss * ss;
        const A = sA / n2, D = sD / n2, M = sM / n2, Wl = sW / n2;
        let lum = amb * A + dif * (0.55 * D + 0.45 * M);
        lum = Math.pow(Math.min(1, Math.max(0, lum)), 1 / 1.5);
        const o = ((y - y0) * W + x) * 4;
        for (let k = 0; k < 3; k++) {
          const c = (1 - Wl) * cfg.obj[k] + Wl * cfg.wall[k];
          out[o + k] = Math.min(1, lum * c * 1.08) * 255 + 0.5;
        }
        out[o + 3] = 255;
      }
    }
    return out;
  }

  // Standardkonfiguration för ett motiv och en inställning (allt i voxelenheter där det behövs).
  function makeConfig(o) {
    const des = DESIGNS[o.design];
    const scene = makeScene(o.design, o.cells, o.seed);
    const vs = o.size / scene.G;
    const eyeMm = o.eye * 1000;
    const Ec = [eyeMm / vs, eyeMm / vs, eyeMm / vs];
    const W = Math.round(o.size * o.ppm);
    const cfg = { W, ss: o.ss, K: o.K, E: Ec, L: lightDir(o.mode, Ec), vs, obj: des.obj, wall: des.wall };
    const defs = sheetDefs(o.mode, o.size, 1 / o.ppm);
    return { scene, cfg, defs, W };
  }

  // ---------------------------------------------------------------- "så ser du det": ark sedda från en punkt
  /*
   * sheets: { namn: {data: RGBA, w} }, defs i mm, eye i mm (hörnramen), mode.
   * Skriver in i out (Uint8ClampedArray RGBA, width*height*4).
   */
  function viewFrame(sheets, defs, mode, eye, width, height, out, fovDeg, bg) {
    const { f, up, right } = cameraBasis(mode, eye);
    const tanh = Math.tan((fovDeg || 34) / 2 * Math.PI / 180);
    const names = ['vanster', mode === 'tak' ? 'tak' : 'golv', 'hoger'];   // plan a=0, b=0, c=0
    const B = bg || [206, 217, 208];
    const dd = [0, 0, 0];
    const meta = names.map((nm) => {
      const df = defs[nm];
      const uu = df.U[0] * df.U[0] + df.U[1] * df.U[1] + df.U[2] * df.U[2];
      const vv = df.V[0] * df.V[0] + df.V[1] * df.V[1] + df.V[2] * df.V[2];
      return { O: df.O, U: df.U, V: df.V, uu, vv, sh: sheets[nm] };
    });
    for (let py = 0; py < height; py++) {
      const Y = (1 - (py + 0.5) / height * 2) * tanh * height / width;
      for (let px = 0; px < width; px++) {
        const X = ((px + 0.5) / width * 2 - 1) * tanh;
        for (let k = 0; k < 3; k++) dd[k] = f[k] + X * right[k] + Y * up[k];
        let best = Infinity, bk = -1;
        for (let k = 0; k < 3; k++) {
          if (dd[k] < -1e-12) { const t = -eye[k] / dd[k]; if (t < best) { best = t; bk = k; } }
        }
        const o = (py * width + px) * 4;
        let r = B[0], g = B[1], b = B[2];
        if (bk >= 0) {
          const m = meta[bk];
          const rx = eye[0] + best * dd[0] - m.O[0], ry = eye[1] + best * dd[1] - m.O[1], rz = eye[2] + best * dd[2] - m.O[2];
          const cx = (rx * m.U[0] + ry * m.U[1] + rz * m.U[2]) / m.uu;
          const cy = (rx * m.V[0] + ry * m.V[1] + rz * m.V[2]) / m.vv;
          const Wp = m.sh.w;
          if (cx >= 0 && cx < Wp && cy >= 0 && cy < Wp) {
            const si = ((cy | 0) * Wp + (cx | 0)) * 4;
            r = m.sh.data[si]; g = m.sh.data[si + 1]; b = m.sh.data[si + 2];
          }
        }
        out[o] = r; out[o + 1] = g; out[o + 2] = b; out[o + 3] = 255;
      }
    }
  }

  const api = { DESIGNS, makeScene, makeMaze, sheetDefs, sheetOrder, planeAxis, cameraBasis, lightDir, renderBand, makeConfig, viewFrame, mulberry32 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.HornEngine = api;
})(typeof self !== 'undefined' ? self : this);
