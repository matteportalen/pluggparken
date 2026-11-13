# Brobygget (NO/teknik, flaggskepp)

_Det som gäller nu för `brobygget/`. Hur det byggdes och alla mätvärden står i `docs/historik/brobygget.md` (sök där, läs inte hela)._

## Beslut (lärarens, 13 nov 2026)
- Läraren valde bort att putsa Flyta eller sjunka och ville ha ett bygglabb: **bygga broar som ska tåla så mycket vikt som möjligt**. Byggt direkt på "kör".
- Eget namn och egen kod. Genren (brobyggarspel) är inspiration, inget är kopierat.
- Fordonen är emojis (speglade så att de kör åt höger). Berg, vatten, torn och balkar ritas på canvas.
- Sparnyckel `mattespel-brobygget-v1` = `{stars:{1..7}, rek:{nivå: fordonsindex}, bro:{nivå: [[x1,y1,x2,y2,material], ...]}}`. Bron sparas vid varje ändring.

## Så fungerar det
- **Bygga:** dra från en fästpunkt eller led till en rutpunkt (1 m rutnät). Material: väg (enda man kan köra på), trä, stål, rep (bara drag, får vara långt). Längsta balk 3,2 m, rep 5,2 m. Varje nivå har en budget som inte går att överskrida. Sudda, Ångra, Rensa allt (två tryck).
- **Testa:** bron sätter sig, sedan kör uppdragets fordon, och därefter **tyngre och tyngre** tills något brister: 🚲 100 kg, 🛵 300 kg, 🚗 1,5 t, 🚐 3 t, 🐘 5 t, 🚚 9 t, 🚌 14 t, 🚛 25 t, 🦕 40 t. Balkarna färgas grön → gul → röd efter kraften. ⏩ fyrdubblar farten.
- **Stjärnor:** 1 = uppdragets fordon kom över, 2 = nästa tyngre också, 3 = två steg tyngre. Rekordet (tyngsta fordon) visas på nivåkortet.
- **Efter provet:** balken som brast först är markerad med rött kryss i byggläget, och hårt belastade balkar är färgade.

## Motorn (i `index.html`, mellan rubrikerna MOTORN och NIVÅER)
- Leder är punkter med massa, balkar håller avstånd (XPBD, 16 delsteg per bild, fast tidssteg 1/60 s, alltså samma resultat varje gång). Kraften i balken läses ur lösaren, jämnas ut och jämförs med `styrka`; över 1 brister balken.
- Fordon = två hjul med stel axel; hjulen ligger an mot vägbalkar och fördelar trycket på balkens två leder. `prov(niv,bal,från)` kör ett helt prov utan att rita och används av testet.
- Förenkling som står på sidan: balkar kan dras och tryckas men inte böjas. En ensam rak balk mellan två stöd är därför stel; en kedja av vägbitar hänger som en lina.
- **Rör inte materialvärdena utan att köra testet**: nivåerna är kalibrerade mot referensbroar (bara väg bär bilen men inte minibussen; varje nivå har en verifierad trestjärnig lösning inom budget).

## Testning
`NODE_PATH=/opt/homebrew/lib/node_modules node skript/test-brobygget.cjs` (server på 8765). `window.__bro` ger `prov`, `satt(bal)`, `G`, `V`, `X`, `Y`.

## Inkopplingar
`no/index.html` (kort), `sok.js`, `sitemap.xml`, `konto.js` (`PKEYS`), `huvud.js` (`STJ` + NO-regex), `index.html` (stjärnor + `snap`), `docs/lgr22.md`.

## Inte gjort
- Inget klistermärke i `STICKERS`. Ingen 🔊-uppläsning. Ingen instruktionsfilm (nivå 1 visar en hand som drar).
- Inte provat på riktig pekskärm. På mobil i stående läge blir de breda broarna små; sidan tipsar om att vända mobilen.
- Idéer: gungbräda och ramp (resten av bygglabbet), vind, flera fordon samtidigt, dela sin bro med länk.
