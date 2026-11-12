# Kontinentaldrift (SO/NO, flaggskepp)

_Under bygge (nov 2026). Den som tar över läser bara den här filen och `kontinentdrift/index.html`._

## Beslut (lärarens, 12 nov 2026)
- Tredje flaggskeppet efter Sjön och Elkretsen. Samma recept: eleven styr själv, gissar först, ser resultatet. Kort under 🔬 NO i `fler/index.html`.
- **En 3D-glob (three.js) där jordens plattor rör sig tillbaka i tiden (250 miljoner år) och fram till nu.** Riktig jordtextur (Solar System Scope, CC BY 4.0, `ovriga/solsystemet/bilder/2k_earth_daymap.jpg`) delad i plattor som flyttas som stela kroppar. Inga riktiga rekonstruktionsdata (GPlates) finns offline: **rörelserna är anpassade för hand och med en liten optimering så att kontinenterna passar ihop i Pangaea**. Starkt förenklat, det ska stå på sidan. Texterna är inte granskade av en geolog.
- Spara tokens: små tester, få skärmbilder, en incheckning per steg, uppdatera Status.

## Plan
- **Nivå 1 Tidsresan:** globen, tidsreglage (250 → 0 Mya), spela-knapp, era-kort (Perm, Trias, Jura, Krita, Paleogen, Nu), valbara "dagens kuster" som spöke, tryck på en platta för namn och fakta. Inga stjärnor.
- **Nivå 2 Bevisen (gissa först):** fyra ledtrådar Wegener använde (Mesosaurus-fossil i Sydamerika och Afrika, bergskedjan Appalacherna som fortsätter i Skottland och Norge, Glossopteris-växten, Indien som kraschar in i Asien på ~50 Mya med reglaget). Eleven gissar, globen spolas tillbaka och visar att platserna låg intill varandra. Stjärnor efter antal rätt.
- Plattor: Nordamerika (med Grönland), Sydamerika, Afrika (med Arabien och Madagaskar), Eurasien, Indien, Australien (med Nya Guinea och Nya Zeeland), Antarktis.

## Inkopplingar (kryssa av)
Kort i `fler/index.html` (NO), `sok.js`, `sitemap.xml`, `konto.js` (`PKEYS`), `STJ` i `huvud.js`, stjärnor och `snap` i `index.html`, rad i `CLAUDE.md`.

## Status
- [ ] Plattmasker och rotationer (Pangaea-passning)
- [ ] Globen och tidsreglaget
- [ ] Nivå 2 Bevisen
- [ ] Test, inkoppling, push
