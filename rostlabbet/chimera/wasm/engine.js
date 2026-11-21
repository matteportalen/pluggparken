// CHIMERA (c) 2026 Jameson Hodge. MIT; see ../../LICENSE.txt and SOURCE.md.
/**
 * The engine as the UI uses it: constants, planners, G2P, the anatomy model and the creature
 * catalogue, all from the Rust engine (crates/chimera) through its JSON interface. Import only
 * after `initChimera()` has resolved (main.tsx does this before loading any UI module): the
 * constants below are read from the engine when this module loads.
 */
import { call } from "./chimera.js";
import { CREATURE_VISUALS } from "../ui/creatureVisuals.js";
const CATALOG = call("catalog");
export const NEUTRAL = CATALOG.neutral;
export const BODY_MALE = CATALOG.bodies.male;
export const BODY_FEMALE = CATALOG.bodies.female;
export const BODY_CHILD = CATALOG.bodies.child;
export const ARTIC_KEYS = CATALOG.articKeys;
export const ARTIC_SPECS = CATALOG.articSpecs;
export const DEFAULT_SOURCE = CATALOG.defaultSource;
/** label of the end-of-breath-group abduction (a live note can drop it when the next one starts) */
export const EXHALE_LABEL = CATALOG.exhaleLabel;
/** default hum note of the beatbox bass (MIDI) */
export const BASS_NOTE = CATALOG.bassNote;
export const BEAT_SOUNDS = CATALOG.beatSounds;
export const BEAT_PRESETS = CATALOG.beatPresets;
/** calibrated vowels per body: articulation and the formants it gives */
export const VOWEL_TARGETS = CATALOG.vowelTargets;
export const DEMO_SONGS = CATALOG.demoSongs;
/** reference vowels (IPA chart, vowel map) */
export const VOWELS = CATALOG.vowels;
/** the creatures, with how each is drawn */
export const CREATURES = CATALOG.creatures.map((c) => ({ ...c, visual: CREATURE_VISUALS[c.id] }));
export const creatureById = (id) => CREATURES.find((c) => c.id === id);
// ------------------------------------------------------------------ text → phonemes
/** IPA text → segments (stress marks, word breaks, multi-character symbols). */
export function tokenizeIpa(text) {
    return call("tokenizeIpa", { text });
}
/**
 * What `tokenizeIpa` leaves out of IPA text without a word, in input order, each item once: symbols
 * the engine does not know, symbols it knows but has no sound for, and letters whose mark it
 * cannot say (shown with the letter). Stress, length, spaces and the marks it reads are not listed.
 */
export function skippedIpa(text) {
    return call("skippedIpa", { text });
}
/**
 * English text → phonemes: CMUdict once loaded (fetched and gunzipped here, parsed by the
 * engine), letter-to-sound rules until then. One dictionary per page (the engine keeps it).
 */
export class EnglishG2P {
    loading = null;
    isLoaded = false;
    get loaded() {
        return this.isLoaded;
    }
    /** Load the gzipped dictionary ("word\tPHONES" lines). */
    load(url = "/data/cmudict.txt.gz") {
        if (this.isLoaded)
            return Promise.resolve();
        if (this.loading)
            return this.loading;
        this.loading = fetchGzText(url).then((text) => this.setDictionaryText(text), (e) => {
            this.loading = null; // allow a retry
            throw e;
        });
        return this.loading;
    }
    setDictionaryText(text) {
        call("g2pLoad", { text });
        this.isLoaded = true;
    }
    /** Text → phrases of segments. */
    toPhrases(text) {
        return call("g2pPhrases", { text });
    }
    /** One word → segments with lexical stress. `reduce`: weak forms of function words (speech). */
    word(w, reduce = true) {
        return call("g2pWord", { word: w, reduce });
    }
}
/** Fetch a gzipped text file (servers differ: some send Content-Encoding: gzip, already inflated). */
async function fetchGzText(url) {
    const res = await fetch(url);
    if (!res.ok)
        throw new Error(`${url}: ${res.status}`);
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
        const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
        return new Response(stream).text();
    }
    return new TextDecoder().decode(bytes);
}
/** Han characters, which the Mandarin front end reads once its lexicon is loaded. */
export const hasHan = (text) => /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/u.test(text);
/** The Mandarin front end's lexicon (character and phrase readings), fetched once when needed. */
export class MandarinLexicon {
    loading = null;
    isLoaded = false;
    get loaded() {
        return this.isLoaded;
    }
    load(url = "/data/mandarin.txt.gz") {
        if (this.isLoaded)
            return Promise.resolve();
        if (this.loading)
            return this.loading;
        this.loading = fetchGzText(url).then((text) => {
            call("zhLoad", { text });
            this.isLoaded = true;
        }, (e) => {
            this.loading = null;
            throw e;
        });
        return this.loading;
    }
}
/**
 * Lyrics → sung syllables through the built-in front ends: pinyin, the Latin-script language
 * (`lang`: English through the page's dictionary, see EnglishG2P, or Turkish), Korean, Russian,
 * and Mandarin once its lexicon is loaded.
 */
export function lyricsToSyllables(text, lang = "en") {
    return call("lyricsToSyllables", { text, lang });
}
/**
 * Turkish text → phrases of segments. Its spelling rules are the G2P, so there is no dictionary to
 * load (crates/chimera/src/phonetics/turkish.rs).
 */
export function turkishPhrases(text) {
    return call("trPhrases", { text });
}
export function planUtterance(segments, options) {
    return call("planUtterance", { segments, options });
}
/** How many planned segments each segment becomes (a diphthong is planned as its two vowels). */
export function plannedCounts(ipa) {
    return call("plannedCounts", { ipa });
}
export function planPhrases(phrases, options) {
    return call("planPhrases", { phrases: phrases.map((p) => ({ segments: p.segments, intonation: p.intonation, pause: p.pause })), options });
}
export function planSong(notes, options) {
    return call("planSong", { notes, options });
}
export function planNoteOn(syl, midi, options) {
    return call("planNoteOn", { syl, midi, options });
}
export function planMelisma(midi, options) {
    return call("planMelisma", { midi, options });
}
export function planNoteOff(syl, midi, body) {
    return call("planNoteOff", { syl, midi, body });
}
/** Smooth activation 0..1..0 with cosine ramps (for drawing the score; the engine's own blend uses its Rust twin). */
export function activation(g, t) {
    if (t <= g.t0 - g.rampIn || t >= g.t1 + g.rampOut)
        return 0;
    if (t < g.t0)
        return 0.5 - 0.5 * Math.cos((Math.PI * (t - (g.t0 - g.rampIn))) / Math.max(1e-6, g.rampIn));
    if (t > g.t1)
        return 0.5 + 0.5 * Math.cos((Math.PI * (t - g.t1)) / Math.max(1e-6, g.rampOut));
    return 1;
}
// ------------------------------------------------------------------ beatbox
export function parseBeat(text) {
    return call("parseBeat", { text });
}
export function formatBeat(steps) {
    return call("formatBeat", { steps });
}
/** A beatboxer's ready posture for this body. */
export function beatReady(body) {
    return call("beatReady", { body });
}
// ------------------------------------------------------------------ anatomy
/** Resting tongue-tip position (template coordinates) for a jaw and tongue body. */
export function restTip(jaw, tbX, tbY) {
    return call("restTip", { jaw, tbX, tbY });
}
/** Template ↔ body coordinates of one body (mirrors HumanVocalTract::p / un_p, for drawing and dragging). */
export class TractMap {
    scale;
    ph;
    constructor(body) {
        this.scale = body.scale;
        this.ph = body.pharynx;
    }
    P(x, y) {
        const k = this.scale;
        const xx = x > 0.5 ? 0.5 + (x - 0.5) * 0.86 : x;
        const yy = y < 7 ? 7 - (7 - y) * this.ph : y;
        return { x: xx * k, y: yy * k };
    }
    unP(x, y) {
        const k = this.scale;
        let xx = x / k, yy = y / k;
        if (xx > 0.5)
            xx = 0.5 + (xx - 0.5) / 0.86;
        if (yy < 7)
            yy = 7 - (7 - yy) / this.ph;
        return { x: xx, y: yy };
    }
}
export function airwayModel(body, sampleRate) {
    return call("model", { body, sampleRate });
}
/** Free a model (its id is invalid afterwards). */
export function dropAirwayModel(m) {
    call("dropModel", { model: m.model });
}
export function airwayFrame(m, artic) {
    return call("frame", { model: m.model, artic });
}
/** The tract's area function (what the worklet's airway would be given) for an articulation. */
export function airwayAreas(m, artic) {
    return call("apply", { model: m.model, artic });
}
/** Transfer function (dB at 360 log-spaced frequencies 60 Hz–8 kHz) and formants. */
export function airwayTransfer(m, artic) {
    return call("transfer", { model: m.model, artic });
}
// ------------------------------------------------------------------ creatures
/** A creature's telemetry right after construction at these settings (drawn before audio starts). */
export function creaturePreview(id, params) {
    return call("creaturePreview", { id, params: params ?? {} });
}
