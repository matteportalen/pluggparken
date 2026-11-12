# Flyta eller sjunka (NO, flaggskepp)

_Under bygge (12 nov 2026). Den som tar över läser bara den här filen och `flytasjunka/index.html`. Läs inte `docs/historik/`._

## Beslut (lärarens, 12 nov 2026)
- Nytt NO-flaggskepp för åk 1–3 (och uppåt), fyller Lgr22-luckan *Material och ämnen* (se `docs/lgr22.md`). Samma recept som Sjön/Kretsloppet: gissa först, riktig fysik, ingen mallad flervalsövning. Kort under 🔬 NO i `fler/index.html`.
- Föremål är **emojis**, ingen SVG-konst. Sparnyckel `mattespel-flytasjunka-v1` = {stars:{1,2,3}}.
- Spara tokens: små tester, få skärmbilder.

## Fysiken (en enda modell för alla nivåer)
- Föremål med höjd `s` (px) och densitet `rho` (g/cm³, vatten = 1). Nedsänkt andel `sub` = överlapp med vattnet / `s`. Kraft: `net = 1 − rhoW·sub/rho`, `a = 2400·net − 10·vy` (luft: dämpning 0,3). Täta föremål som sjunker får minst `net = 0,25` så att långsamma sjunkare (ägg) syns sjunka. Jämvikt: `sub = rho/rhoW`.
- Båten (nivå 2) är ett föremål med `rho = massa / (W·H)` (hela skrovvolymen inklusive luft i skålen), alltså flyter den om `rho ≤ 1`. 2D-tvärsnitt: lerarea A = 30 cm², lerdensitet 2 g/cm³ → 60 g. Bottenbredd `w` (4–30 cm), kanthöjd `h` (0–20 cm). Tjocklek `t = (−(w+2h)+√((w+2h)²+8A))/4`, ytterbredd `W = w+2t`, höjd `H = t+h`. Last: kulor à 20 g, `n` kulor måste också få plats: `floor(w/2.4)·floor(h/2.4)`. Max last ≈ `W·H − 60` g.
- Uppdrag nivå 2: bär 4, 10 och 20 kulor. Stjärnor på antal släpp: högst 5 = 3, högst 9 = 2, annars 1.

## Nivåer
1. **Flyter eller sjunker?** Åtta föremål (äpple, mynt, isbit, ägg, löv, nyckel, potatis, banan). Eleven trycker Flyter/Sjunker, föremålet släpps, förklaring. Stjärnor: högst 1 fel = 3, högst 3 = 2.
2. **Bygg en båt** (se ovan).
3. **Gissa först:** fem frågor (ägg i saltvatten, isbit, lerskål, flisa av trä, Döda havet). Facit räknas av samma fysik (`ans`). Stjärnor: högst 1 fel = 3, högst 2 = 2.

## Inkopplingar
`fler/index.html` (NO-kort), `sok.js`, `sitemap.xml`, `konto.js` (`PKEYS`), `huvud.js` (`STJ` + fler-regex), `index.html` (stjärnor + `snap`), rad i `CLAUDE.md`, rad i `docs/lgr22.md` (Material och ämnen, åk 1–3).

## Status
- [x] Sidan byggd
- [x] Testad i tre storlekar (375 × 667 skrollar ca 32 px i nivå 2)
- [x] Inkopplad, pushad
- Inte provat: pekskärm, gamla enheter. Texterna är inte granskade av en fysiker. Densiteterna är avrundade.
