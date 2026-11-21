// CHIMERA (c) 2026 Jameson Hodge. MIT; see ../../LICENSE.txt and SOURCE.md.
let module = null;
let exports = null;
let loading = null;
/** Compile and instantiate the engine (once). `source`: the wasm bytes or a URL (default: the bundled build). */
export function initChimera(source) {
    if (loading)
        return loading;
    loading = (async () => {
        let mod;
        if (source && typeof source !== "string")
            mod = await WebAssembly.compile(source);
        else {
            const url = source ?? new URL("./chimera.wasm", import.meta.url).href;
            const res = await fetch(url);
            if (!res.ok)
                throw new Error(`engine: ${url}: HTTP ${res.status}`);
            mod = await WebAssembly.compile(await res.arrayBuffer());
        }
        if (WebAssembly.Module.imports(mod).length)
            throw new Error("engine: the wasm module must not have imports");
        exports = (await WebAssembly.instantiate(mod, {})).exports;
        module = mod;
    })();
    loading.catch(() => (loading = null)); // a failed load may be retried
    return loading;
}
export function chimeraReady() {
    return exports !== null;
}
/** The compiled module, for the AudioWorklet's own instance. */
export function chimeraModule() {
    if (!module)
        throw new Error("engine not loaded (await initChimera())");
    return module;
}
function x() {
    if (!exports)
        throw new Error("engine not loaded (await initChimera())");
    return exports;
}
const enc = new TextEncoder();
const dec = new TextDecoder();
/** Call the engine's JSON interface (crates/chimera-wasm/src/api.rs); throws on an engine error. */
export function call(fn, args = {}) {
    const e = x();
    const bytes = enc.encode(JSON.stringify({ fn, ...args }));
    const p = e.chimera_alloc(bytes.length);
    new Uint8Array(e.memory.buffer, p, bytes.length).set(bytes);
    const status = e.chimera_call(p, bytes.length);
    e.chimera_free(p, bytes.length);
    const out = dec.decode(new Uint8Array(e.memory.buffer, e.chimera_result_ptr(), e.chimera_result_len()));
    const v = JSON.parse(out);
    if (status !== 0)
        throw new Error(`engine ${fn}: ${v.error}`);
    return v;
}
