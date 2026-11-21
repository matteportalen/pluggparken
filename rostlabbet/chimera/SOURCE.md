# CHIMERA i Pluggparkens Röstlabb

Ursprung: https://github.com/jamesondh/chimera-vocal-synth
Upphovsperson: Jameson Hodge, 2026. MIT-licens, se LICENSE.txt.
Låst källversion: caf270abf893bdc63f6342059d4468f754edf5c6 (hämtad 2026-11-21).

## Motor

`wasm/chimera.wasm` är byggd från ovanstående version, utan ändringar i Rust-koden:

```
cargo build --locked -p chimera-wasm --release --target wasm32-unknown-unknown
```

Byggverktyg: Rust 1.100.0, wasm32-unknown-unknown. Ursprunglig Cargo.lock används.
Artefakt: target/wasm32-unknown-unknown/release/chimera_wasm.wasm.
Ingen kompilering eller extern tjänst behövs vid drift; den färdiga filen ingår här.

## JavaScript

Följande TS-moduler i originalets src/ är översatta med TypeScript 5.9.3,
`transpileModule`, target ES2022, module ES2022. Importändelser är ändrade till .js:

- wasm/chimera, engine, wire
- worklet/processor, telemetry
- ui/analysis, body, creatureVisuals, colors
- ui/render/anatomy, profile, geom, vector, readouts, expression

Pluggparkens små anpassningar:
- wasm/chimera: lokal URL via import.meta.url i stället för Vites ?url-import.
- ui/render/vector: redan lokalt installerade Baloo 2 som textfont.
- ui/render/anatomy: centrerat huvud, 16 px marginal utan instrumentavläsningar;
  bara dragpunkterna tunga, käke och läppar, med svenska etiketter.

Den ursprungliga React-appen, språkdictionaries och externa typsnitt ingår inte.
Det svenska gränssnittet och ljudets livscykel ligger i ../rostlabbet.js (utanför denna mapp).
Vokalerna A, I, O använder motorns kalibrerade ɑ, i, u. Detta är ett experimentverktyg,
inte en validerad svensk uttalsmodell eller text-till-tal-tjänst.
