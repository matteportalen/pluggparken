# Vattnets kretslopp (NO åk 1–3, flaggskepp)

_Under bygge (nov 2026). Den som tar över läser bara den här filen och `vattenkretslopp/index.html`._

## Beslut (lärarens, 12 nov 2026)
- Fjärde flaggskeppet, **för de yngsta (åk 1–3)**: samma recept som Sjön, Elkretsen och Kontinentaldrift (bygga, laborera, gissa först), men med enkla ord och handgripliga knappar. Kort under 🔬 NO i `fler/index.html`.
- Ritat i kod (canvas): hav, sol, berg, moln, flod. Figurerna är lärarens ok (SVG/canvas för flaggskeppen). Starkt förenklat, det ska stå på sidan.
- Spara tokens: små tester, få skärmbilder, en incheckning per steg, uppdatera Status.

## Hur det fungerar
- **Partikelsimulering:** ca 210 vattenpartiklar i sex tillstånd: `H` hav, `V` ånga (på väg upp), `M` moln, `R` regn, `S` snö (faller), `L` snö som ligger kvar, `F` flod. Övergångar sker slumpmässigt per sekund: hav→ånga ∝ sol × värme, moln→regn (eller snö vid ≤ 0 °C), snö smälter till flod vid > 0 °C, flodens vatten rinner tillbaka till havet. Allt vatten bevaras. Havets nivå följer antalet havspartiklar.
- **Nivå 1 Följ droppen:** eleven trycker på solen (droppen avdunstar), på molnet (det regnar), droppen rinner ner för berget i floden och tillbaka till havet. Sedan sätter eleven ord (Avdunstning, Moln, Regn, Flod) på fyra markörer. Stjärnor efter antal fel.
- **Nivå 2 Laborera:** reglage för sol och temperatur, färdiga lägen (vanlig dag, ingen sol, vinter), mätare för hav, moln, flod och snö. Inga stjärnor.
- **Nivå 3 Gissa först:** fem frågor (solen släcks och molnen, mycket varmare och regnet, minusgrader och floden, vart vattnet tar vägen utan sol, snön smälter). Eleven gissar, simuleringen körs i snabbspolning, facit kommer ur simuleringen.
- Nyckel `mattespel-vattenkretslopp-v1` = {stars:{1,3}}.

## Inkopplingar (kryssa av)
Kort i `fler/index.html` (NO), `sok.js`, `sitemap.xml`, `konto.js` (`PKEYS`), `STJ` i `huvud.js`, stjärnor och `snap` i `index.html`, rad i `CLAUDE.md`.

## Status
- [x] Sidan byggd (simulering, nivå 1–3). Värmeberoende `varme(T)` justerat så att "mycket varmare" ger tydligt mer regn; kör om facit (12 körningar per fråga) om simuleringen ändras
- [x] Testad i tre storlekar (375 × 667 skrollar ca 60 px i Laborera, godtaget)
- [x] Inkopplad, pushad. Inte provat: pekskärm, biolog/lärare har inte läst texterna

## Ny scen (12 nov 2026, lärarens "känns inte flaggskepp")
- Hela ritningen är omgjord (`scen`, `moln`, `nederbord`, `ritaPart`); simuleringen, nivåerna och facit är orörda (facit omkört: 12 av 12 på alla fem frågor).
- Lager: himmel (dag, frost, släckt sol med stjärnor), sol med sken, fjärran kust, berg med klippa, skuggsida, snötäcke som växer med snömängden, granskog, flod som mjuk kurva (`FLOD` = Catmull-Rom genom `FLOD0`, smal överst, rinnande ljusstreck, torr bädd utan vatten), hav med tre våglager, solglitter och isflak, förgrundskulle.
- `VIS` = utjämnade värden ur simuleringen (snö, moln, flod, frost, natt, havsnivå) så att bilden inte flimrar. Havets partiklar och snöpartiklarna ritas inte längre som prickar: havsnivån, snötäcket och flodens bredd visar mängden. Ånga = mjuka slöjor, regn = stråk, snö = flingor. `nederbord` är dekor under molnet med täthet efter molnmängden.
- Geometrin som inte får flyttas: hav x < 126, molnet vid (250, 50), toppen (290, 66), markörerna i nivå 1 (`MARK`).
