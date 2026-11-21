// CHIMERA (c) 2026 Jameson Hodge. MIT; see ../../LICENSE.txt and SOURCE.md.
import { V, heat, pressureLevel } from "../colors.js";
import { beam, beamPts, chaikin, dot, handle, label, ring, seg } from "./vector.js";
import { buildProfile, Gaze, jawFn, VIEW } from "./profile.js";
import { drawReadouts } from "./readouts.js";
import { Expression } from "./expression.js";
/** where the articulators' handles sit (body cm) */
export function faceHandles(model, f, a) {
    const t = model.tract;
    const J = jawFn(model, a);
    const lips = { x: (f.upperLip[6].x + f.lowerLip[6].x) / 2 + 0.15, y: (f.upperLip[6].y + f.lowerLip[6].y) / 2 };
    return [
        { id: "tongue", pos: f.tongueCenter, label: "Tongue body" },
        { id: "tip", pos: f.tip, label: "Tongue tip" },
        { id: "jaw", pos: J(7.5, 4.9), label: "Jaw" },
        { id: "lips", pos: lips, label: "Lips" },
        { id: "velum", pos: f.velum[Math.floor(f.velum.length / 2)], label: "Soft palate" },
        { id: "larynx", pos: { x: f.glottis.x + 1.2 * t.scale, y: f.glottis.y }, label: "Larynx" },
    ];
}
const ECHO_AGES = [0.09, 0.06, 0.03];
/**
 * The whole head in body cm, drawn on every screen: the head is the instrument's face, so the
 * crown and the back of the skull are never cut off. profile.js's skin outline peaks at 22.9 cm
 * and reaches back to -8.7 cm; each bound has a little air. (VIEW, profile.js's tighter crop
 * around the airway, is the duet page's.)
 */
const HEAD = { x0: -9.4, x1: VIEW.x1, y0: VIEW.y0, y1: 23.5 };
const smoothstep = (a, b, x) => {
    const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
};
/**
 * The side view's brow and eyelids (body cm): the brow rides up with the pitch and knits on low
 * notes; the lids, two arcs over the front of the eyeball, meet when the eye blinks or closes on a
 * long note, and open wide on a high one.
 */
export function eyeFeatures(c, k, e) {
    const rx = 1.22 * k, ry = 1.08 * k;
    const arc = (a0, a1) => {
        const o = [];
        for (let i = 0; i <= 14; i++) {
            const an = a0 + ((a1 - a0) * i) / 14;
            o.push({ x: c.x + rx * Math.cos(an), y: c.y + ry * Math.sin(an) });
        }
        return o;
    };
    const deg = Math.PI / 180;
    const wide = Math.max(0, e.brow);
    // the upper lid comes down to meet the lower
    const upEnd = 30 * deg + 14 * deg * wide, lo = -32 * deg;
    const up = upEnd + (lo - upEnd) * e.lid;
    const brow = [];
    const raise = 0.42 * k * e.brow, knit = 0.3 * k * Math.max(0, -e.brow);
    for (let i = 0; i <= 12; i++) {
        const u = -1 + i / 6; // −1 back, +1 front
        const front = (1 + u) / 2;
        brow.push({ x: c.x + 0.1 * k + 0.9 * k * u, y: c.y + 1.4 * k + 0.2 * k * (1 - u * u) + raise - knit * front });
    }
    return [
        { pts: arc(100 * deg, up), w: 1.15, alpha: 0.9 },
        { pts: arc(-78 * deg, lo), w: 1.0, alpha: 0.75 },
        { pts: brow, w: 1.4, alpha: 0.85 },
    ];
}
/**
 * Puffed cheeks in the side view: the face's outline above and below the lips swells forward (the
 * air held in the mouth pushes the skin round the lips out). The lips' meeting edge, where their
 * handle sits, stays put. Returns the map for body points, or null at rest.
 */
export function puffProfile(f, k, puff) {
    if (Math.abs(puff) < 0.01)
        return null;
    const L = { x: (f.upperLip[6].x + f.lowerLip[6].x) / 2, y: (f.upperLip[6].y + f.lowerLip[6].y) / 2 };
    const out = 0.6 * k * puff;
    return (p) => {
        const dy = Math.abs(p.y - L.y) / (2.6 * k);
        if (dy >= 1)
            return p;
        const w = (1 - dy * dy) ** 2 * smoothstep(0.03, 0.45, dy) * smoothstep(L.x - 1.2 * k, L.x - 0.5 * k, p.x);
        return w ? { x: p.x + out * w, y: p.y } : p;
    };
}
export class AnatomyRenderer {
    particles = [];
    scale = 20;
    ox = 0;
    oy = 0;
    w = 0;
    h = 0;
    /** a narrow screen (a phone): readouts in a row above the head, slots in a row below it */
    compact = false;
    sparkSeed = 1;
    geo = null;
    echoes = [];
    clock = 0;
    lastEcho = -1;
    /** where the eye looks */
    gaze = new Gaze();
    /** brows, lids and cheeks, from the voice (the view updates it) */
    face = new Expression();
    constructor() {
        for (let i = 0; i < 170; i++)
            this.particles.push({ s: Math.random() * 17, u: Math.random() * 2 - 1, life: Math.random(), px: NaN, py: NaN });
    }
    /** size in CSS px */
    resize(w, h) {
        this.w = w;
        this.h = h;
        // the readouts need room beside the head; a narrow screen (a phone) moves them above and below it.
        // A tall desktop screen keeps them beside it: the head is then fitted to the width and centred,
        // leaving room above and below, where the compact rows ran over the skull.
        this.compact = w < 560;
        const padX = 12, padT = 16, padB = 16;
        this.scale = Math.max(1, Math.min((w - 2 * padX) / (HEAD.x1 - HEAD.x0), (h - padT - padB) / (HEAD.y1 - HEAD.y0)));
        // left-aligned when there is room to spare, so the readouts get the space in front of the face
        const spare = w - 2 * padX - (HEAD.x1 - HEAD.x0) * this.scale;
        this.ox = padX + (spare / 2) - HEAD.x0 * this.scale;
        this.oy = padT + Math.max(0, (h - padT - padB - (HEAD.y1 - HEAD.y0) * this.scale) / 2) + HEAD.y1 * this.scale;
        for (const p of this.particles)
            p.px = NaN;
    }
    /** body cm → CSS px */
    X(p) {
        return this.ox + p.x * this.scale;
    }
    Y(p) {
        return this.oy - p.y * this.scale;
    }
    P(p) {
        return [this.ox + p.x * this.scale, this.oy - p.y * this.scale];
    }
    /** CSS px (relative to the canvas) → body cm */
    toBody(cx, cy) {
        return { x: (cx - this.ox) / this.scale, y: (this.oy - cy) / this.scale };
    }
    get pxPerCm() {
        return this.scale;
    }
    handles(model, f, a) {
        return faceHandles(model, f, a).filter(h => ["tongue", "jaw", "lips"].includes(h.id)).map(h => ({...h, label: {tongue:"Tunga", jaw:"Käke", lips:"Läppar"}[h.id]}));
    }
    // ------------------------------------------------------------------ geometry
    geometry(model, f, a) {
        if (this.geo && this.geo.f === f && this.geo.model === model)
            return this.geo;
        return (this.geo = buildProfile(model, f, a));
    }
    /**
     * The lens, moved by the eye's gaze: it holds still for a few seconds, then darts somewhere
     * new (a saccade), and every so often back to straight ahead. Pitch swings it round the front
     * of the eyeball; yaw (looking towards or away from the viewer) foreshortens its offset and
     * opens the edge-on disc out.
     */
    lens(c, k, dt) {
        const g = this.gaze;
        g.update(this.clock, dt);
        const off = 0.85 * k * Math.cos(g.yaw);
        const pitch = g.pitch + this.face.lookUp;
        const cp = Math.cos(pitch), sp = Math.sin(pitch);
        const lc = { x: c.x + off * cp, y: c.y + off * sp };
        const rx = (0.18 + 0.2 * Math.abs(Math.sin(g.yaw))) * k, ry = 0.42 * k;
        const o = [];
        for (let i = 0; i <= 20; i++) {
            const an = (i / 20) * Math.PI * 2;
            const x = Math.cos(an) * rx, y = Math.sin(an) * ry;
            o.push({ x: lc.x + x * cp - y * sp, y: lc.y + x * sp + y * cp });
        }
        return o;
    }
    // ------------------------------------------------------------------ main draw
    draw(ctx, model, f, a, tele, view, opts) {
        this.clock += opts.dt;
        const G = this.geometry(model, f, a);
        const pts = (v) => v.map((p) => this.P(p));
        const line = (v, color, w, o = {}) => beamPts(ctx, pts(v), color, w, o);
        // deep structures, dim blue
        line(G.inset, V.blueDim, 0.9, { alpha: 0.9 });
        line(G.skull, V.blueDim, 0.9, { close: true });
        line(G.brain, V.blueMid, 1.1, { close: true });
        line(G.sulcus, V.blueDim, 0.9);
        line(G.eye, V.blueMid, 1.1);
        const k = model.tract.scale;
        const bulge = puffProfile(f, k, this.face.puff);
        const puffed = (v) => (bulge ? v.map(bulge) : v);
        line(this.lens(G.eyeC, k, opts.dt), V.blueDim, 0.9, { alpha: 1 - smoothstep(0.45, 0.9, this.face.lid) });
        for (const l of eyeFeatures(G.eyeC, k, this.face))
            line(l.pts, V.blue, l.w, { alpha: l.alpha });
        for (const v of G.vertebrae)
            line(v, V.blueDim, 1);
        line(G.cords[0], V.blueDim, 0.8, { alpha: 0.8 });
        line(G.cords[1], V.blueDim, 0.8, { alpha: 0.6 });
        line(G.nasal, V.blueMid, 1, { close: true });
        for (const tb of G.turbinates)
            line(tb, V.blueDim, 0.9);
        line(G.palOral, V.blueMid, 1.1);
        line(G.palNasal, V.blueMid, 1.1);
        line(G.hyoid, V.blueDim, 1);
        line(G.thyroid, V.blueDim, 1);
        for (const tr of G.trachea)
            line(tr, V.blueMid, 1);
        for (const r of G.rings)
            line(r, V.blueDim, 0.9);
        // the airway's cross-section lines: lit by sound pressure, else a dim measurement grid
        if (view.pressure && tele)
            this.drawPressure(ctx, model, f, tele);
        else if (view.grid)
            for (const gs of f.grid)
                seg(ctx, this.X(gs.inner), this.Y(gs.inner), this.X(gs.outer), this.Y(gs.outer), V.blueDim, 0.9, { alpha: 0.7 });
        if (view.particles && tele)
            this.drawParticles(ctx, model, f, tele, opts.dt);
        // afterglow: where the tongue, jaw and lips were a moment ago
        if (tele && this.clock - this.lastEcho >= 0.028) {
            this.lastEcho = this.clock;
            this.echoes.push({ t: this.clock, tongue: f.tongue.slice(), jaw: G.jawLower, upperLip: chaikin(puffed(f.upperLip).map((p) => [p.x, p.y])), lowerLip: chaikin(puffed(f.lowerLip).map((p) => [p.x, p.y])) });
            while (this.echoes.length && this.clock - this.echoes[0].t > 0.12)
                this.echoes.shift();
        }
        if (tele) {
            ECHO_AGES.forEach((age, i) => {
                const e = this.nearestEcho(this.clock - age);
                if (!e)
                    return;
                const o = 0.1 + 0.07 * i;
                line(e.tongue, V.green, 1, { alpha: o });
                line(e.jaw, V.red, 1, { alpha: o * 0.9 });
                const lip = (q) => beamPts(ctx, q.map(([x, y]) => [this.ox + x * this.scale, this.oy - y * this.scale]), V.pink, 1, { alpha: o * 0.9 });
                lip(e.upperLip);
                lip(e.lowerLip);
            });
        }
        // skin, airway walls, teeth, folds
        line(puffed(G.skinLower), V.blue, 1.7, { hot: true });
        line(puffed(G.skinUpper), V.blue, 1.7, { hot: true });
        line(G.outerWall, V.blue, 1.4, { hot: true });
        line(f.inner, V.blue, 1.3, { alpha: 0.9 });
        line(G.glottisWall, V.blue, 1.2, { alpha: 0.8 });
        line(f.epiglottis.slice(0, 3), V.blue, 2.2, { alpha: 0.85 });
        line(f.upperTeeth, V.blueMid, 1.1, { close: true });
        line(G.lowerTeeth, V.blueMid, 1.1);
        for (const fo of G.folds)
            line(fo, V.blue, 1);
        // the four handled articulators in their slot colours
        const tongueOutline = pts(f.tongue);
        ctx.save();
        const clip = new Path2D();
        tongueOutline.forEach(([x, y], i) => (i ? clip.lineTo(x, y) : clip.moveTo(x, y)));
        clip.closePath();
        ctx.clip(clip);
        for (const fb of G.fibres)
            line(fb, V.green, 0.8, { alpha: 0.32 });
        ctx.restore();
        // left open: its closing chord runs along the floor of the mouth
        beamPts(ctx, tongueOutline, V.green, 1.6, { hot: true });
        line(G.jawLower, V.red, 1.5, { hot: true });
        line(G.jawUpper, V.red, 1, { alpha: 0.45 });
        const soft = (v, it) => chaikin(v.map((p) => this.P(p)), it);
        beamPts(ctx, soft(puffed(f.upperLip), 2), V.pink, 1.5, { hot: true });
        beamPts(ctx, soft(puffed(f.lowerLip), 2), V.pink, 1.5, { hot: true });
        beamPts(ctx, soft(f.velum, 3), V.white, 1.25, { alpha: 0.92 });
        if (tele)
            this.drawTurbulence(ctx, model, f, tele);
        if (view.calipers)
            this.drawCalipers(ctx, f);
        this.drawHandles(ctx, model, f, a, opts.hover, opts.drag);
        this.drawReadouts(ctx, opts.formants, opts.info, opts.slots);
    }
    nearestEcho(t) {
        let best = null, bd = 0.016;
        for (const e of this.echoes) {
            const d = Math.abs(e.t - t);
            if (d < bd) {
                bd = d;
                best = e;
            }
        }
        return best;
    }
    gridPoint(f, s, u) {
        const g = f.grid;
        if (g.length < 2)
            return null;
        if (s <= g[0].s) {
            const t = Math.max(0, s / Math.max(0.01, g[0].s));
            const base = f.glottis;
            const mid = { x: (g[0].inner.x + g[0].outer.x) / 2, y: (g[0].inner.y + g[0].outer.y) / 2 };
            const half = 0.35;
            return { x: base.x + (mid.x - base.x) * t + u * half * 0.5, y: base.y + (mid.y - base.y) * t };
        }
        let lo = 0, hi = g.length - 1;
        if (s >= g[hi].s)
            return null;
        while (hi - lo > 1) {
            const m = (lo + hi) >> 1;
            if (g[m].s <= s)
                lo = m;
            else
                hi = m;
        }
        const t = (s - g[lo].s) / Math.max(1e-6, g[hi].s - g[lo].s);
        const ix = g[lo].inner.x + (g[hi].inner.x - g[lo].inner.x) * t;
        const iy = g[lo].inner.y + (g[hi].inner.y - g[lo].inner.y) * t;
        const ox = g[lo].outer.x + (g[hi].outer.x - g[lo].outer.x) * t;
        const oy = g[lo].outer.y + (g[hi].outer.y - g[lo].outer.y) * t;
        const w = 0.5 + 0.5 * u * 0.82;
        return { x: ix + (ox - ix) * w, y: iy + (oy - iy) * w };
    }
    nodeValueAtS(values, nodeS, s) {
        let best = 0, bd = Infinity;
        for (let i = 0; i < nodeS.length; i++) {
            const d = Math.abs(nodeS[i] - s);
            if (d < bd) {
                bd = d;
                best = i;
            }
        }
        return values[best] ?? 0;
    }
    drawPressure(ctx, model, f, tele) {
        const t = tele.t;
        const nodeS = model.nodeS(t.phLen, t.orLen);
        if (nodeS.length !== t.pressureRms.length)
            return;
        for (const g of f.grid) {
            const lvl = Math.pow(pressureLevel(this.nodeValueAtS(t.pressureRms, nodeS, g.s)), 0.85);
            seg(ctx, this.X(g.inner), this.Y(g.inner), this.X(g.outer), this.Y(g.outer), heat(lvl), 1.15, { alpha: 0.35 + 0.65 * lvl });
        }
    }
    drawParticles(ctx, model, f, tele, dt) {
        const t = tele.t;
        const nodeS = model.nodeS(t.phLen, t.orLen);
        const areas = new Float32Array(t.phAreas.length + t.orAreas.length);
        areas.set(t.phAreas, 0);
        areas.set(t.orAreas, t.phAreas.length);
        const L = f.lipS;
        const path = [new Path2D(), new Path2D(), new Path2D()];
        for (const p of this.particles) {
            const U = this.nodeValueAtS(t.flow, nodeS, p.s);
            const A = Math.max(0.05, this.nodeValueAtS(areas, nodeS, p.s));
            const u = U / A; // particle velocity cm/s
            const vis = Math.sign(u) * 2.2 * Math.log1p(Math.abs(u) / 30); // perceptual speed (cm/s on screen)
            p.s += vis * dt;
            p.life -= dt * 0.25;
            if (p.s > L || p.s < 0 || p.life <= 0 || Math.abs(u) < 3) {
                if (!(Math.abs(u) < 3 && p.life > 0)) {
                    p.s = Math.random() * 0.8;
                    p.u = Math.random() * 2 - 1;
                    p.life = 0.6 + Math.random() * 0.8;
                    p.px = NaN;
                    continue;
                }
            }
            const pos = this.gridPoint(f, p.s, p.u);
            if (!pos)
                continue;
            const x = this.X(pos), y = this.Y(pos);
            if (Number.isFinite(p.px)) {
                // three brightness bands, one stroke each
                const band = Math.min(2, Math.floor(Math.min(1, Math.abs(vis) / 6) * Math.min(1, p.life) * 3));
                path[band].moveTo(p.px, p.py);
                path[band].lineTo(x, y);
            }
            p.px = x;
            p.py = y;
        }
        path.forEach((pa, i) => beam(ctx, pa, "#ffe2a8", 1.1, { alpha: 0.16 + 0.2 * i }));
    }
    drawTurbulence(ctx, model, f, tele) {
        const t = tele.t;
        if (!(t.noiseLevel > 1) || t.noiseNode < 0)
            return;
        const s = model.branchS(t.noiseNode, t.phLen, t.orLen);
        if (s < 0)
            return;
        const intensity = Math.min(1, Math.log10(t.noiseLevel) / 3.2);
        if (intensity <= 0.05)
            return;
        let seed = (this.sparkSeed = (this.sparkSeed * 16807) % 2147483647);
        const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 30; i++) {
            const pos = this.gridPoint(f, s + 0.2 + rnd() * 1.2, rnd() * 2 - 1);
            if (!pos)
                continue;
            dot(ctx, this.X(pos), this.Y(pos), 0.6 + rnd() * 1.4, "#f4fbff", 0.15 + 0.7 * intensity * rnd());
        }
    }
    drawCalipers(ctx, f) {
        let mi = -1, ma = Infinity;
        for (let i = 2; i < f.grid.length - 1; i++)
            if (f.grid[i].area < ma) {
                ma = f.grid[i].area;
                mi = i;
            }
        if (mi < 0 || ma >= 1.2)
            return;
        const g = f.grid[mi];
        const [x0, y0] = this.P(g.inner), [x1, y1] = this.P(g.outer);
        seg(ctx, x0, y0, x1, y1, V.white, 1.4, { hot: true });
        const nx = -(y1 - y0), ny = x1 - x0, nl = Math.hypot(nx, ny) || 1;
        for (const [x, y] of [[x0, y0], [x1, y1]])
            seg(ctx, x - (nx / nl) * 4, y - (ny / nl) * 4, x + (nx / nl) * 4, y + (ny / nl) * 4, V.white, 1.2);
        // at the lips, in front of them is where Sing and Speak write the words: the label goes behind
        const end = f.grid[f.grid.length - 1];
        const lipsX = Math.max(this.P(end.inner)[0], this.P(end.outer)[0]);
        const atLips = lipsX - Math.max(x0, x1) < 1.5 * this.pxPerCm;
        const lx = atLips ? Math.min(x0, x1) - 10 : Math.max(x0, x1) + 10, ly = Math.min(y0, y1) - 4;
        label(ctx, ma <= 0.0005 ? "CLOSED" : `${ma.toFixed(2)} CM²`, lx, ly, { size: 11, color: V.white, ls: 0.12, align: atLips ? "right" : "left" });
    }
    drawHandles(ctx, model, f, a, hover, drag) {
        const colour = { tongue: V.green, jaw: V.red, lips: V.pink, velum: V.white, tip: V.blueMid, larynx: V.blueMid };
        const size = { tongue: 8, jaw: 7, lips: 7, velum: 6, tip: 5, larynx: 5 };
        for (const h of this.handles(model, f, a)) {
            const x = this.X(h.pos), y = this.Y(h.pos);
            const active = h.id === drag || h.id === hover;
            handle(ctx, x, y, colour[h.id], size[h.id] + (active ? 2 : 0), active ? 1 : 0.9);
            if (active) {
                ring(ctx, x, y, 28, colour[h.id], 1, { alpha: 0.75 });
                label(ctx, h.label.toUpperCase(), x + 32, y - 18, { size: 12, color: colour[h.id], ls: 0.18 });
            }
        }
    }
    drawReadouts(ctx, formants, info, slots) {
        // the slots sit in the empty space under the chin and in front of the neck
        drawReadouts(ctx, { w: this.w, h: this.h, compact: this.compact, slotX: this.X({ x: 3.35, y: 0 }), slotY: this.Y({ x: 0, y: 2.05 }) }, formants, info, slots);
    }
}
