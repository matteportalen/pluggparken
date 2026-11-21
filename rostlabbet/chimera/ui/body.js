// CHIMERA (c) 2026 Jameson Hodge. MIT; see ../../LICENSE.txt and SOURCE.md.
export const PRESETS = {
    male: { female: 0, child: 0 },
    female: { female: 1, child: 0 },
    child: { female: 0, child: 1 },
};
export const PRESET_LABEL = { male: "Adult male", female: "Adult female", child: "Child" };
const clamp01 = (x) => (Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0);
/** Weights of male, female and child (as the engine computes them; they sum to 1). */
export function bodyWeights(b) {
    const f = clamp01(b.female), c = clamp01(b.child);
    return [
        ["male", (1 - c) * (1 - f)],
        ["female", (1 - c) * f],
        ["child", c],
    ];
}
/** The preset this body is exactly, or null. */
export function presetOf(b) {
    return bodyWeights(b).find(([, w]) => w === 1)?.[0] ?? null;
}
/** The preset with the largest weight (for things that stay per preset, like the keyboard's octave). */
export function nearestBody(b) {
    return bodyWeights(b).reduce((best, x) => (x[1] > best[1] ? x : best))[0];
}
export function sameBody(a, b) {
    return !!a && !!b && a.female === b.female && a.child === b.child;
}
export const bodyKey = (b) => `${b.female},${b.child}`;
/** A per-preset quantity blended by the body's weights (geometrically: pitches, frequencies). */
export function blendLog(b, of) {
    const p = presetOf(b);
    if (p)
        return of[p];
    return Math.exp(bodyWeights(b).reduce((s, [n, w]) => s + w * Math.log(of[n]), 0));
}
/** Default pitch: the presets' (as the engine's `default_f0`), blended geometrically in between. */
export const defaultF0 = (b) => blendLog(b, { male: 110, female: 205, child: 260 });
/** "Adult female", or the blend's shares: "Male 40 · Female 30 · Child 30 %". */
export function bodyLabel(b) {
    const p = presetOf(b);
    if (p)
        return PRESET_LABEL[p];
    const parts = bodyWeights(b)
        .filter(([, w]) => w > 0.005)
        .map(([n, w]) => `${n[0].toUpperCase()}${n.slice(1)} ${Math.round(w * 100)}`);
    return `${parts.join(" · ")} %`;
}
