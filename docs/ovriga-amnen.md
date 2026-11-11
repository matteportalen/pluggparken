# Övriga ämnen

_Det som gäller nu för Kodverkstan, Tangentbordet, Pengar och sparande, Tidslinjen, Europakartan, Världskartan, Draw it! och Extra (Ansiktsloppan, Hörnillusioner). Hur varje del byggdes, datakällor, tal och alla turer kring Ansiktsloppans insida står i `docs/historik/ovriga-amnen.md` (sök där med `grep -n "ord" docs/historik/ovriga-amnen.md`, läs inte hela)._

## Var ligger vad

| Mapp | Övning | localStorage-nyckel |
| --- | --- | --- |
| `ovriga/kodverkstan/` | Kodverkstan: block (Blockly i `lib/blockly/`), egen tolk, 20 uppdrag, 8 exempel, Fri duk | `mattespel-kodverkstan-v1` |
| `ovriga/tangentbord/` | Tangentbordet: tiofingersträning | `mattespel-tangentbord-v1` |
| `ovriga/pengar/` | Pengar och sparande. Kurserna i `kurser.js` (`?v=N`). | `mattespel-pengar-v1` |
| `tidslinjen/` | Tidslinjen (SO): 48 bildkort, fyra lägen | `mattespel-tidslinjen-v1` |
| `ovriga/europa/` | Europakartan: 50 länder, flaggor (flag-icons, MIT) | `mattespel-europa-v1` |
| `ovriga/varlden/` | Världskartan: världsdelar, hav, Lurad av kartan? | `mattespel-varlden-v1` |
| `ovriga/rita/` | Draw it! (engelska). Modellen DoodleNet i `modell/`, TensorFlow.js i `lib/`. | `mattespel-rita-v1` |
| `engelskaord/`, `klockanengelska/` | Engelska ord, Klockan på engelska | `mattespel-<namn>-v1` |
| `extra/index.html` | Ämnet Extra: saker man skapar, skriver ut och bygger | – |
| `ovriga/ansiktsloppan/` | Ansiktsloppan (ligger under Extra, adressen är kvar) | – (sparar inget) |
| `extra/hornillusion/` | Hörnillusioner | – (sparar inget) |
| `extra/trummaskin/` | Musiklabbet, se `docs/musiklabbet.md` | – |

Kartorna är gjorda ur Natural Earth (public domain). Europakartan, Världskartan och Sverigekartan delar samma spelskärm.

## Regler som gäller flera

- **Riktiga foton, inga emojis, för djur och föremål** i kartorna och Tidslinjen. Bara fria licenser, med källa och licens under "Bilder och källor".
- **Fri text och uppgifter om personer sparas aldrig** och läggs aldrig i `PKEYS` (Min tidslinje, egna bilder i Kodverkstan, foton i Ansiktsloppan). Den som vill ha kvar något skriver ut eller laddar ner.
- **Dölj aldrig SVG-delar med `.hidden`** (egenskapen finns inte på SVG-element). Använd `style.display`.
- **Drag på pekskärm** kräver `touch-action:none` på ytan, annars skrollar sidan och biten flyttar sig bara lite.
- **Inga nivåer i SO-övningarna** ("även de yngsta är smarta"), och inga flervalsfrågor som enda innehåll.

## Kodverkstan

- **För dator och surfplatta.** På mobil visas en vänlig ruta, layouten där är inte prioriterad.
- **Alla rörelser ska synas.** Gå, glid, vrid och storlek sker i små steg per bildruta. Bara `hoppa direkt till x y`, visa/göm och byt bakgrund sker direkt.
- **Egen tolk, ingen `eval` och ingen kodgenerering.** Inga mutatorer i blocken (ska fungera med fingret).
- **Blockmenyns kategorier är färgkodade** och bara de kategorier uppdraget behöver visas.
- Vinstrutan väntar ett par sekunder och är en banner längst ner i scenen, så att man hinner se vad djuret gjorde.
- Varje figur har egna block. Facit finns för alla uppdrag och kan öppnas i Fri duk.
- Figurerna är bilder ur Kenneys bibliotek (CC0), inte emojis.
- Test: kroken `window.__kv` kör alla facit automatiskt.

## Tangentbordet

- Kräver ett riktigt tangentbord. En färg per finger, nästa tangent blinkar.
- Texten som ska skrivas sitter fast överst på pekskärm.
- Inte åtgärdat: en elev fastnade på iPad efter några bokstäver (troligen engelskt tangentbord eller fält som töms).

## Pengar och sparande

- **Tidsmaskin, inte realtid** (ingen server, och realtid lär ut jakt på snabba vinster). Startåret 2007 är fast och förklaras öppet.
- **Bitcoin och Ethereum beskrivs neutralt:** fakta åt båda hållen, inga råd och ingen moral.
- **Inga vapen-, spel om pengar-, alkohol- eller tobaksbolag.** Inga logotyper.
- **Inforutor ska rymmas i en eller två korta meningar.**
- **Skriv aldrig skatte- eller avgiftssiffror ur minnet.** Kontrollera mot källa. Fondavgiften ingår i kursen, skatt ingår inte.
- Nya bolag ger en notis och stoppar inte tiden. Riktiga stopp bara vid finanskrisen, corona, bitcoins uppgång och fall och inflationen, och där måste eleven välja.
- Spela-knappen ligger direkt under grafen och får inte knuffas av notiser. Två kolumner från 1 000 px.
- Följer sajtens ljusa och mörka läge (ljust är standard).
- Stjärnor ges bara för frågorna. Inget diplom.

## Tidslinjen

- Riktiga bilder från Wikimedia Commons. Elva tider från stenåldern till nutid.
- **Min tidslinje sparas aldrig** (namn och födelseår är personuppgifter): allt ligger i sidans minne och glöms när man lämnar läget. Affischen skrivs ut på liggande A4. Slingrande stig upp till 10 händelser, rak linje upp till 24.
- Frågan visas stort och svaret i en ruta med rubrik före Nästa.

## Kartorna

- **Europakartan:** 50 länder inklusive småstaterna. Små länder har en vit ring, och vid gränser vinner det mindre landet.
- **Världskartan:** Oceanien (inte Australien) som världsdel, fem världshav. Inget spel om havsdjur. Lurad av kartan? har valet "Som Google Maps" eller "Rätt storlekar".

## Draw it!

- Datorn säger sina gissningar högt på engelska (lärarens undantag från 🔊-regeln).
- Den svenska översättningen är dold tills eleven trycker.
- Rätt kräver förstahandsgissning, minst 35 %, två kontroller i rad och minst 2 sekunders ritande. Trösklarna är justerade tre gånger mot riktiga teckningar: ändra dem inte utan att mäta. Inga gissningar på ett ensamt streck.
- 20 sekunder per ord, 6 ord per runda. Teckningarna skickas ingenstans.

## Extra

- **Extra är för sådant man skapar, skriver ut och bygger.** Specialare är minilektioner.
- Utskrifter har "pluggparken.se" litet och grått i hörnet.
- **Hörnillusioner:** `engine.js` och `pdf.js` ska inte ändras utan anledning. Kräver http (Web Workers). Läraren ska skriva ut och testa; bygg ingen marginal före det.

### Ansiktsloppan

- **Geometrin får inte ändras:** `EXT`, `INT`, `renderInto`, `paint` och `compose`. Alla rättningar görs på bilden före vikningen (`composeUt`).
- Tre perspektiv: utsidan (ansiktet), öppningen A–D (din egen mun) och öppningen E–H (den färdiga bilden med hjärna, tänder och tunga). "Byt plats" byter öppning.
- Utsidan speglas per kvadrant före vikningen (rättat efter lärarens vikta testark).
- Testark: `ovriga/ansiktsloppan/?test`. **Vikningen går inte att bedöma på skärmen:** be läraren skriva ut, vika och fota innan något ändras i placeringen.
- Standard är ett stort ansikte (`ABST` 0,32), reglagen Huvud och Fisheye. Tomma kanter fylls med en utvidgning av fotot.
- Jag ritar inte snygga figurer: hjärnan är en fri bild (`hjarna.png`, CC0), och ligger `insida.jpg` i mappen ersätter den hela den ritade insidan.
- Allt sker i webbläsaren, inget laddas upp, inget sparas. Sidan har `data-nav="av"` så att ← lämnar med ett tryck.

## Väntar

- Tidslinjen: paket med Sveriges kungar och USA:s presidenter (pausat).
- Kodverkstan: dela projekt via länk, fler uppdrag, matteblock.
- SO: fler övningar (inte minilektioner).
