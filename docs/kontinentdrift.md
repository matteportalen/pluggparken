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

## Hur plattornas rörelser togs fram (viktigt, byt inte utan ny passning)
- Land per platta klassas ur jordtexturen med `plateOf(lon,lat)` (polygoner för Arabien och Indien, lat/lon-regler för resten; finns i sidans skript). Hav: `b>r+12 && b>=g-8 && r<120`.
- **Pangaea (250 Mya) relativt Afrika** (Afrika och Eurasien sitter fast): varje platta har en 3×3-rotationsmatris `ROT` som minimerar kvadratavståndet mellan ankarpunkter (t.ex. Sydamerikas kust mot Afrikas kust, Newfoundland mot Irland, Australiens södra kust mot Antarktis) plus ett straff för överlapp. Fri slumpsökning på enbart kustkontakt gav fel resultat (kontinenter hamnade intill fel kust); ankarpunkterna behövdes. Passningen har några graders fel.
- **Tiden:** rörelsen interpoleras (slerp) från Pangaea till nu med en tidslinje per platta (`TL`: andel kvar av rörelsen vid tiden t): Nordatlanten öppnas ca 200–150, Sydatlanten ca 150–110, Indien lossnar ca 130 och krockar ca 50, Australien lossnar ca 100–50. Banorna är raka bågar, inte riktiga rekonstruktioner.
- Plattor som inte är med: Pacifiska, Nazca och mindre. Nya Zeeland följer Australien, Arabien följer Afrika, Grönland följer Nordamerika.
- Verktyg som användes (finns inte kvar i repot): Node-skript som sökte rotationerna mot en landmask på 720 × 360.

## Status
- [x] Plattmasker och rotationer (Pangaea-passning mot ankarpunkter)
- [x] Globen (three.js, texturer per platta, atmosfär, stjärnbakgrund) och tidsreglaget, eror, spökkuster, tryck på platta för fakta
- [x] Nivå 2 Bevisen: fem frågor (fossil, bergskedja, växt, Indiens tid med reglage, fart); stjärnor
- [x] Testat i 390 × 844, 375 × 667 (skrollar ca 60 px) och 1200 × 760, inkopplat i Fler ämnen (NO), sök, sitemap, konto, stjärnor
- Inte provat: pekskärm, gammal iPad/Chromebook (3D). Inte gjort: portal i världen, framtiden (Pangaea Proxima), fler plattor. Texterna är inte granskade av en geolog.

## Putsning av Pangaea (12 nov 2026, lärarens "känns billig")
- **Ny passning:** efter ankarpassningen finslipades varje platta mot grannarna med en kontaktkostnad (avståndet från plattans kust till närmaste redan placerade land, plus straff för överlapp). Nordamerika ligger nu intill Afrika och Europa, Sydamerika i Afrikas utbuktning, Indien vid Madagaskar, Antarktis och Australien samlade. `ROT` i skriptet är utbytt för plattorna 0, 1, 4, 5, 6 (Afrika och Eurasien står stilla). Mexikanska golfen är ett innanhav, som i verkligheten.
- **Kustkanter:** plattornas texturer görs nu av 2×2 delpunkter per texel (mjuk täckning, ingen hackig kant) som `DataTexture` med färg utspridd över genomskinliga kantpixlar (ingen mörk söm).
- **Sömmen över Afrika:** Nordafrikas kust (Maghreb, Libyen) tillhörde fel platta; reglerna i `plateOf` är rättade.
- Inte löst: tidslinjens banor är fortfarande raka bågar (slerp), så plattor kan glida genom varandra mellan 250 och 150 Mya. Passningen har några graders fel.
- **Kompaktare Pangaea (samma dag):** passningen kördes om med längre räckvidd och mjukare överlappsstraff (`CAP` 40, `OW` 14), så att kontinenterna ligger tätt (kustöverlapp mot Europa är kvar, som en sockel). Hero-cirkeln på sidans startvy är nu jordens riktiga dagkarta (CSS-bakgrund som snurrar långsamt, stillastående vid `prefers-reduced-motion`) i stället för tre gröna fläckar.
