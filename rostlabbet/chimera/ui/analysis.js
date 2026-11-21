// CHIMERA (c) 2026 Jameson Hodge. MIT; see ../../LICENSE.txt and SOURCE.md.
/**
 * Main-thread acoustic model mirroring the worklet's airway (same topology & node counts, in the
 * engine): geometry frames for drawing, the transfer function and formants for display, and
 * vowel-space interpolation for the vowel map. Never runs inside the audio thread.
 */
import { airwayModel, dropAirwayModel, airwayFrame, airwayAreas, airwayTransfer, TractMap, NEUTRAL, ARTIC_KEYS, VOWELS, VOWEL_TARGETS } from "../wasm/engine.js";
import { bodyWeights } from "./body.js";
/** Mandarin-only vowels, which the planner sings but the vowel space leaves out: the apical vowels ɿ ʅ
 *  (a consonant's tongue held open, not a point among the vowels) and the retracted u̠ ʊ̠ (Beijing back u and ong, F2 ~660 and
 *  ~730 Hz), which would sit on top of the English u ʊ the map is drawn for. */
const NOT_ON_THE_MAP = new Set(["ɿ", "ʅ", "u̠", "ʊ̠"]);
export class VoiceModel {
    body;
    /** the body's dimensions (blended, as the engine builds it) */
    bodyParams;
    /** template ↔ body coordinates */
    tract;
    vowels;
    nPh;
    nOr;
    model;
    cacheKey = "";
    cacheFrame = null;
    tfKey = "";
    tf = null;
    constructor(body, sampleRate) {
        this.body = body;
        this.model = airwayModel(body, sampleRate);
        this.bodyParams = this.model.body;
        this.tract = new TractMap(this.bodyParams);
        this.nPh = this.model.nPh;
        this.nOr = this.model.nOr;
        // calibrated vowels of the presets, blended by the body's weights (as the engine plans them;
        // the formants are a blend too, close to what this body produces)
        const parts = bodyWeights(body)
            .filter(([, w]) => w > 0)
            .map(([n, w]) => ({ w, table: VOWEL_TARGETS[n] ?? {} }));
        // the vowel space (chart, pad, readouts) leaves out the Mandarin-only vowels (NOT_ON_THE_MAP);
        // the planner still sings them
        this.vowels = VOWELS.filter((v) => !NOT_ON_THE_MAP.has(v.ipa) && parts.every((p) => p.table[v.ipa])).map((v) => {
            const at = (f) => {
                let acc = 0, ws = 0;
                for (const p of parts) {
                    const x = f(p.table[v.ipa]);
                    if (x !== undefined)
                        (acc += p.w * x), (ws += p.w);
                }
                return ws > 0 ? acc / ws : undefined;
            };
            const artic = {};
            for (const k of ARTIC_KEYS) {
                const x = at((t) => t.artic[k]);
                if (x !== undefined)
                    artic[k] = x;
            }
            return { ipa: v.ipa, example: v.example, F1: at((t) => t.formants[0]), F2: at((t) => t.formants[1]), artic };
        });
    }
    /** Free the engine's model; this VoiceModel must not be used afterwards. */
    dispose() {
        dropAirwayModel(this.model);
    }
    static articFromArray(arr) {
        const a = { ...NEUTRAL };
        ARTIC_KEYS.forEach((k, i) => (a[k] = arr[i]));
        return a;
    }
    frame(a) {
        const key = ARTIC_KEYS.map((k) => a[k].toFixed(3)).join(",");
        if (key !== this.cacheKey || !this.cacheFrame) {
            this.cacheFrame = airwayFrame(this.model, a);
            this.cacheKey = key;
        }
        return this.cacheFrame;
    }
    /** The area function the worklet's airway would get for this articulation. */
    areas(a) {
        return airwayAreas(this.model, a);
    }
    /** Transfer function (dB) + formants for an articulation (cached on a coarse key). */
    transfer(a) {
        const key = ARTIC_KEYS.map((k) => a[k].toFixed(2)).join(",");
        if (key === this.tfKey && this.tf)
            return this.tf;
        this.tf = airwayTransfer(this.model, a);
        this.tfKey = key;
        return this.tf;
    }
    /** Blend calibrated vowel articulations for a point in (F1, F2) space (inverse-distance, log Hz). */
    articForFormants(F1, F2) {
        const w = this.vowels.map((v) => {
            const d1 = Math.log(F1 / v.F1) * 2.2; // F1 differences are perceptually larger
            const d2 = Math.log(F2 / v.F2);
            const d = Math.hypot(d1, d2);
            return { v, w: 1 / Math.pow(d + 0.02, 3) };
        });
        w.sort((p, q) => q.w - p.w);
        const top = w.slice(0, 4);
        const sum = top.reduce((s, x) => s + x.w, 0);
        const keys = ["tbX", "tbY", "jaw", "lipAp", "lipProt", "lipWidth", "root", "larynx", "ttCurl"];
        const out = {};
        for (const k of keys) {
            let acc = 0;
            for (const { v, w: wi } of top)
                acc += (v.artic[k] ?? NEUTRAL[k]) * wi;
            out[k] = acc / sum;
        }
        return out;
    }
    /** s-position (cm from glottis) of each tract node in the telemetry arrays */
    nodeS(phLen, orLen) {
        const nPh = this.nPh, nOr = this.nOr;
        const s = new Float64Array(nPh + nOr);
        for (let i = 0; i < nPh; i++)
            s[i] = ((i + 0.5) / nPh) * phLen;
        for (let i = 0; i < nOr; i++)
            s[nPh + i] = phLen + ((i + 0.5) / nOr) * orLen;
        return s;
    }
    /** s-position of a noise-source branch index (pharynx/oral internal branches) */
    branchS(branch, phLen, orLen) {
        const ph = this.model.pharynxBranches, or = this.model.oralBranches;
        if (branch >= ph.base && branch < ph.base + ph.n - 1)
            return ((branch - ph.base + 1) / ph.n) * phLen;
        if (branch >= or.base && branch < or.base + or.n - 1)
            return phLen + ((branch - or.base + 1) / or.n) * orLen;
        if (branch === this.model.glottisPort)
            return 0.2;
        return -1;
    }
}
