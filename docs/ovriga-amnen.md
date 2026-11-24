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
| `extra/trummaskin/` | Musiklabbet (kortet ligger i Fler ämnen under 🎵 Musik sedan 16 nov 2026, adressen är kvar), se `docs/musiklabbet.md` | – |

**Extra** är bara för udda pyssel och sådant som inte är ett ämne (nu Hörnillusioner och Ansiktsloppan). Allt som hör till ett ämne, som musik, ligger i Fler ämnen (lärarens beslut 16 nov 2026).

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
- **🌠 Ordregnet** (16 nov 2026, lärarens önskan efter ett klipp med ett skriv-och-skjut-spel; egen svensk version med eget namn, tema och kod): femte läget. Ord faller som stjärnfall mot en stad, man börjar skriva ett ord (det lyser guld, rätt bokstäver blir gröna) och trollstaven 🪄 skjuter ner det när det är klart; når ett ord den röda linjen tappar man ett hjärta (tre hjärtan). Nivån stiger var åttonde ord (fortare, tätare), och då firas det (läraren ville ha "större happening"): spelet står still knappt två sekunder, stor skylt "Nivå 3!" med en peppande rad och tre studsande stjärnor, stjärnregn och stjärnfall, fanfar; med minska rörelse bara skylten. Fem ordpaket i stigande svårighet: Hemraden (åk 1), Korta ord (åk 1–2), Vanliga ord (åk 2–3), Långa ord (åk 3–4), Svåra ord (åk 5–6). Stjärnor per paket (`regn1`–`regn5`): 10, 20, 35 nerskjutna ord; rekord i poäng. Backsteg släpper valt ord. Paus, och paus när fliken göms.
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

## Engelska som eget ämne (24 nov 2026)
- Läraren: engelska behövde fler övningar och ett eget kort, och får gälla upp till åk 6. **Eget ämneskort på första sidan** (`amnek en`, pratbubbla "Hi!") och **ämnessidan `engelska/`** (samma mall som `fler/`). `huvud.js`: `engelska` i `NYMENY` och `amneAv` (engelskaord, klockanengelska, monsterfabriken och Draw it! hör till Engelska), 🏝️ leder till Fler ämnen-ön. Övningarna ligger kvar i Fler ämnen också.
- **Planerade övningar** (läraren gillade alla sex): Monsterfabriken (byggd), Var är katten? (in/on/under), Hello! (prata med djuret, spela in sig själv), Måla efter röst, Shopping, Morning routine (på tavlan).

## Monsterfabriken (`monsterfabriken/`, `mattespel-monsterfabriken-v1`)
- Lyssna och bygg monstret: kroppsfärg (7), ögon 1–6, armar 0/2/4/6, ben 0/2/3/4, horn 0–3, stor eller liten mun. Raderna har engelska namn med svenska under. **Nivå 1** en sak i taget (åk 1–3, 8 uppgifter), **nivå 2** tre saker i rad (åk 3–4, 5), **nivå 3** läs en beskrivning i löpande text och bygg allt (åk 5–6, 5). Fel: de felaktiga raderna blir rosa och man försöker igen. Efter rätt svar visas meningen på engelska och svenska.
- 🔊 bara när man trycker. Riktig röst Philippa, 28 inspelade meningar i `ljud/monster/` (manus `manus/monster-manus.txt`); nivå 2 och 3 spelar meningarna i rad. Saknas en fil används webbläsarens röst. Är sajtens ljud av visas meningen som text i stället.
- Monstret är ritat i SVG (`rita(m)`), godkänt av läraren som del av idén. Klistermärke 👾 Monstermakaren (tre stjärnor på nivå 3).

## Engelska ord

- Omgjord nov 2026: inga "välj rätt ord av fyra". Uppgifter: **lyssna** (🔊 säger ordet, tryck på rätt bild av sex), **läs** (ordet står, tryck på bilden), **bygg** (stava ordet med bokstavsbrickor) och på nivå 3 **para ihop** (fyra engelska och fyra svenska fraser), **hör** (lyssna, välj betydelsen) och bygg frasen av ordbrickor.
- **Bilderna byts i listan `ORD`** överst i skriptet: `[engelska, svenska, bild]`. Bilden är en emoji, `färg:#hex`, `tal:7` eller en bildfil (`bilder/cat.webp`). Läraren gör om bilderna själv; byt bara tredje värdet.
- Efter första felet i en lyssna-uppgift visas ordet i text, så att ingen fastnar utan ljud. Finns ingen röst i enheten visas ordet direkt.
- Bilden får bara kunna betyda ordet.

- **Riktig röst (17 nov 2026):** 🔊 spelar mp3-filer med rösten Philippa (ElevenLabs, brittisk) ur `ljud/engelska/` via `engelska.js` (`MPEngelska.tala(text, reserv)`); `karta.json` kopplar text (gemener) till filnamn. Saknas filen används webbläsarens röst. 202 uttryck: alla ord och fraser i `ORD`/`FRASER` samt alla klockfraser (12 timmar × femminuterstider). **Lägger du till ord eller fraser: kör `node skript/bygg-engelska-ljud.js <mapp>` (skriver `<mapp>/en-manus.txt` och `ljud/engelska/karta.json`), sedan `ELEVEN_SETTINGS='{"stability":0.5,"similarity_boost":0.75,"speed":0.9}' node skript/elevenlabs.js <mapp>/en-manus.txt ljud/engelska`** (hoppar över filer som finns). Gäller även Klockan på engelska. Draw it! har kvar datorrösten.

## Klockan på engelska

- Omgjord nov 2026: inga svarsalternativ. Två sorters uppgifter: **ställ klockan** efter frasen ("Set the clock to half past three", visarna dras med `klocka.js`) och **bygg klockslaget** av ordbrickor efter en klocka.
- 🔊 läser frasen på engelska (en-GB), bara vid tryck. I bygg-uppgifter finns 🔊 först efter svaret, annars avslöjas det.
- Förklaringen visar alltid det svenska klockslaget ("half past three = halv fyra"), eftersom det är just där svenskan och engelskan skiljer sig.
- Ett klockslag där samma ord behövs två gånger (five past five) kommer aldrig.

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

## Röstlabbet

`rostlabbet/`, under Extra → Ljudexperiment. Lokal Chimera-motor (WASM/AudioWorklet) och två synkroniserade canvasvyer (genomskärning och förenklat ansikte framifrån): dra tunga, käke och läppar eller använd reglagen. Nio vokaler (A/E/I/O/U/Y/Å/Ä/Ö), vanlig röst, viskning, sång, tonhöjd och tre experiment. Ingen mikrofon, uppladdning, sparad progression eller stjärnor. Ljud kräver Starta och stoppas vid Tyst, flikbyte, fokusförlust och gemensam ljudavstängning. Utforskande ljudmodell, inte svensk uttalsbedömning. Meningsrutan (max 200 tecken) använder samma Chimera-motor: `svenska-ljud.js` gör en enkel svensk ljudtolkning, motorns planPhrases skapar artikulationsgester och workletens verkliga telemetri driver munbilden. Ingen Web Speech eller separat uppläsare. Uttalet är experimentellt (svenska U, sj/tj och prosodi approximeras). Manuell röst och textläge stoppar varandra. U-knappen är en approximation mellan Y- och O-positionerna. Ursprung, låst version och MIT-licens i `rostlabbet/chimera/SOURCE.md` och `LICENSE.txt`. Webbläsartest: `skript/test-rostlabbet.cjs` (PLAYWRIGHT_PATH kan anges).
