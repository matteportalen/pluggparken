# Pluggparken (hette Matte-Portalen)

Matteövningar, spel och övriga ämnen för åk 1–3 (och äldre), byggda av en lärare för sin egen klass (och andra klasser).
Publiceras med GitHub Pages på **pluggparken.se** från repot `pluggparken` (filen `CNAME`). Sajten hette Matte-Portalen och låg på matteportalen.github.io; det repot är nu bara en **omdirigering** som tar med elevens localStorage till **`flytta/`** här (en gång per webbläsare, `mp-flyttad`). **Den gamla adressen får aldrig tas bort och det gamla repot får aldrig kopplas till en egen domän** (då omdirigerar GitHub på servern och datan blir oåtkomlig). Hur flytten fungerar i detalj står i `docs/historik/plattform.md`. Allt språk på sajten är **svenska**.

**Namnet** (okt 2026, lärarens val efter lång brainstorm: inget mattefokus, eget ord som syns på Google, inga å/ä/ö i adressen, inte -o-ändelse, inte för likt Bingel): **Pluggparken**, "Lekparken för hjärnan". Skrivs "Plugg" i vitt och "parken" i gult. localStorage-nycklarna heter fortfarande `matteportalen-…` och `mattespel-…` och får **inte** byta namn (då försvinner framstegen).

## Teknik i korthet

- Ren HTML, CSS och JavaScript. **Inga ramverk, inget byggsteg.** Varje övning är en enda `index.html` i en egen mapp, med CSS och JS i samma fil. Bilder som hämtats utifrån eller ritats av läraren får ligga i en undermapp `bilder/` i övningens mapp (sajten används alltid via webbläsaren). Ange källa och licens i tabellen nedan.
- All data sparas i **localStorage** i elevens webbläsare. Ingen server, inga konton på nätet.
- Typsnitt: **Baloo 2** (vikt 500/700/800) ur `fonts/` (aldrig från Google Fonts, se nedan), med `"Trebuchet MS", system-ui, sans-serif` som reserv.
- Delat ljud: `ljud.js` i roten. Alla sidor laddar den med `<script src="../ljud.js">` (startsidan med `ljud.js`).
- **Plattformsspelen: `spel/plattform.js`** (`MPPlatt`), används av Sagoriket och Sifferslottet: fysiken (`steg`: spring, hopp, dubbelhopp som aldrig bromsar, studsfjädrar, rörliga plankor), styrningen (`styrning`: tangenter och pekknappar; varje nytt tryck sätter även `IN.uT`/`IN.mT` så att snabba tryck mellan två bilder inte missas), musikmotorn (`musik`, Web Audio, slingor med 32 åttondelar) och djuret med trollstaven (`djur`). Banor, rum, kamera och bossar ligger kvar i spelen. **Inga kopior** i sidorna.
- **Klockan: `klocka.js`** i roten (`MPKlocka`), används av Klockan och Verktygslådans klocka. **Inga kopior** i sidorna. Innehåller: `phrase(h,m)` (alla minuter: femminuterstiderna som i Pedagogiska beslut; övriga 1–24 över ("tjugotvå minuter över fyra", **inte** "åtta minuter i halv", lärarens regel), 26–29 i halv ("två minuter i halv fem"), 31–34 över halv, 36–59 i ("sju minuter i nio")), `fmtDur`, `short`, `clockSVG(h,m,o)` (o: `small`, `halves` = fyra fält: 0–25 **över** (grön), 25–30 **i halv** (ljust orange), 30–35 **över halv** (ljust grön), 35–60 **i** (orange), eftersom det är tvärtom runt halv och det är svårt att lära sig (lärarens önskan; syns i verktygets "Över / i" och i hjälpbilderna i Klockan), `ring`, `wedge`, `wide` = större viewBox för blockringar, `mark` = röd slutmarkering på en minut), `setHands`, `setWedge(svg,start,T)` (orange tårtbit från start till minutvisaren; varje helt varv gör urtavlan svagt orange), `drag(svg,{get,set,step,mod})` (man tar visaren man trycker närmast, steg 1 eller 5 min), `blocks(host,{svg,start,end,base,showSum,onChange})` (**tidsblock** 1 tim, 30, 15, 10, 5, 1 i färg: knappar, tidslinje med linjal och Start/Slut, och ringbitar runt klockan, ett varv per ring; tryck på ett block tar bort det).
- **Tangram: `bitar.js`** i roten (`MPBitar`; filnamnet är kvar från mönsterbitarna, som togs bort helt: Bygg bilden ur Geometri och fritt bygge ur Verktygslådan, läraren tyckte att fritt bygge var clutter). Sju bitar (`tL`, `tL2`, `tM`, `tS`, `tS2`, `tQ`, `tP`) ur en kvadrat 4×4, vrids i steg om 45°, parallellogrammet vänds med ⇋ (`flip`). `TANGRAM` = 29 figurer `{id,n,k,p}`, `k` = kategori (`TANGRAM_KAT`: Former, Djur, Saker och människor), `p` = [bit, vridning, vänd, dx, dy], alltid alla sju bitar (yta 16, kontrollerat utan överlapp). Figurerna är klassiska tangrambilder ritade fritt efter förebilder (inga bilder kopierade) eller framräknade med en lösare; Segelbåten togs bort och huset ritades om (gick inte att känna igen). `MPBitar.spel(host,{bild,tray,unik,tips,onDone})`: bitlåda (varje bit en gång, grå när den ligger ute), dra, **fri vridning med snäpp** (gult handtag, två fingrar, scrollhjul, två tryck, ↻), snäpp till andra bitars och silhuettens hörn, släpp på lådan = ta bort, Ångra, Börja om, **💡 Tips** (varje tryck visar en streckad kontur i bitens färg för nästa bit i lösningen som inte ligger rätt, stora bitar först; konturen ligger kvar tills biten ligger där; de två stora och de två små trianglarna räknas som samma). Klar = silhuetten täckt (pixelkontroll: ≥97 % täckt, inget utanför, inget överlapp). Silhuetten ritas som **en enda path** så att inga skarvar avslöjar lösningen. Används bara av Geometri.
- **Balansvågen: `vag.js`** i roten (`MPVag`): ritar vågen i SVG (`svg(L,R,{th,lock,u,top,sums})`, `fit(pans)` = samma klossstorlek och beskuren topp, `tilt(l,r)`, `spring(draw)` = vågen gungar som en fjäder). Klossgrupper: tal (staplar om fem, tiotal som stavar, streckade vid subtraktion, emoji ovanför), grupper för multiplikation, ?-ruta och en gömd sak (ruta med emoji). Används av Vågen. **Inga kopior** i sidorna.
- **Bråk: `brak.js`** i roten (`MPBrak`): färgerna per nämnare (`COL`: 1 röd, ½ rosa, ⅓ orange, ¼ gul, ⅕ grön, ⅙ turkos, ⅛ blå, 1/10 lila, 1/12 grå), `DEN`, och bråkräkning med **heltalspar [täljare, nämnare]** (`red`, `add`, `sub`, `cmp`, `eq`, `sum`, `gcd`, `lcm`), text `html` (staplat bråk), `dec` (komma, ≈ om det inte går jämnt ut), `pct`, `label(n,d,läge)` för Bråk/Decimal/Procent/Ingen, `ink(d)` (mörk text på den gula biten). Används av Bråkväggen, Bråkbitarna och Rutjaktens bråkvariant, så att färgerna alltid är samma. **Inga kopior** i sidorna.
- Delat djur: `djur.js` i roten (`WARD`, `NATUR`, `itemOf`, `owlSVG`, `PETNAME`, `lasDjur()`). Laddas av startsidan, Spelhörnan, Skattjakten och alla övningar med elevens djur (Geometri, Bråk, Division, Multiplikation, Lilla plus, Tiotal, Klockan). **Inga kopior** av djurmallen i sidorna, ändra bara i `djur.js`.
- **Inga externa typsnitt eller bibliotek** (dataskydd, nov 2026: besökarens IP-adress ska inte skickas till Google, Cloudflare eller jsdelivr). Typsnitten (Baloo 2, Andika, Inter, Source Serif 4) ligger i `fonts/` och laddas med `<link rel="stylesheet" href="/fonts/fonts.css">`; biblioteken ligger i `lib/` (qrcodejs, jsQR, Matter.js, lamejs, TensorFlow.js, Blockly 11.2.2 med media, three.js 0.160 med OrbitControls, GLTFLoader, DRACOLoader). **Nya sidor ska aldrig länka till fonts.googleapis.com eller en CDN: lägg filen i `lib/` eller `fonts/`.** Kvar externt med flit: MapLibre och kartplattorna i Stockholmskartan (kartan är extern i sig) och Transformers.js med modellerna från Hugging Face i `lasfel.js` och `kbwhisper.js` (valbara motorer i Högfrekventa ord; modellen hämtas bara om läraren väljer motorn, ljudet lämnar aldrig enheten).

- **Fler delade filer i roten** (inga kopior i sidorna): `klossar.js` (`MPKlossar`, träklossarna i Tiobas, Kort division och Dela upp och dela), `film.js` (`MPFilm`, mallen för instruktionsfilmerna "🎬 Se hur man gör"), `konto.js` (`MPKonto`, molnkonton och `PKEYS`), `svarthal.js` (filmmotorn med röst) med filmerna `stjarnfilm.js` och `zoomfilm.js`, `sok.js` (sökningen), `huvud.js` och `tema.js`.
- **Mer finns i `docs/`** (se tabellen nedan): `huvud.js` (sidhuvud, ← bakåtknapp, ☰-menyn, stjärnor och mynt), filmmotorn `svarthal.js`, Escape-regeln, sökmotorsoptimering, ljust/mörkt läge (`tema.js`) och allt övrigt som förut stod här ligger i `docs/plattform.md` och `docs/specialare-filmer.md`.

## Var hittar jag vad (docs/)

`CLAUDE.md` är medvetet kort: den innehåller bara det som alltid gäller. Varje område har **två filer**:

- **`docs/<område>.md`** (kort, 5–10 kB): det som gäller nu. Var filerna ligger, regler, lärarens beslut, vad som är borttaget med flit och vad som väntar. **Läs den som hör till det du arbetar med, inte alla.**
- **`docs/historik/<område>.md`** (lång): hur allt byggdes, alla tal, funktionsnamn och tidigare versioner. **Läs aldrig hela.** Sök med `grep -n "ord" docs/historik/<område>.md` när du behöver en detalj.

Efter varje ändring: är det en **ny regel eller ett nytt beslut**, skriv en kort rad i rätt avsnitt i `docs/<område>.md` (och ta bort det som inte längre gäller). **Beskrivningen av vad som byggdes** (detaljer, mått, vad som testats) läggs sist i `docs/historik/<område>.md`. Ingenting av det läggs här. `docs/design.md`, `docs/ideer.md` och `docs/instagram.md` är korta och har ingen historikfil. Är du osäker på vilken fil: sök med `grep -rn "ord" docs/`.

| Fil | Innehåll |
| --- | --- |
| `docs/plattform.md` | Plattformen: startsidan, sidhuvud, profiler, konton, mynt, sök, tema. Startsidan och ämnessidorna, `huvud.js` (sidhuvud, ←, menyn), profiler och inloggning, molnkonton (Supabase), mynt och Garderoben, sökning, ljust/mörkt läge, första sidans tavla och kort. |
| `docs/design.md` | Gemensam design. Färger, kort, kortbilder, instruktionsfilmer, djuret och Garderoben (de korta grundreglerna står också i `CLAUDE.md`). |
| `docs/matematik.md` | Matematik: övningar, verktyg och Nationella prov. Lilla plus, Tiotalsövergång, Hundrarutan, Verktygslådan, Uppställning, Multiplikation, Division, Klockan, Geometri, Bråk, Mätning, Vågen, Gömda tal, Tiobas m.fl. |
| `docs/spel.md` | Spel: Spelhörnan, Slungan, Trädgårdsvakten, Schack, Sudoku m.fl.. Spelhörnan och alla spel (Bubbelskjutaren, Tornbygget, Skattjakten, Kulbanan, Sagoriket, Sifferslottet, Affären, Rutjakten, Slungan, Trädgårdsvakten) samt brädspel och gissa-spel. |
| `docs/svenska.md` | Svenska: läsning, ord och skrivande. Högfrekventa ord, Läsfelslabbet, Mikrofonlabbet, Ordgåtan, Läsflyt, Bokstäver, Sagobyggaren, Meningsbyggaren, Ordkedjan, Ordgissning, Dubbelteckning, Knepiga ljud. |
| `docs/so-och-rymd.md` | SO och Rymdlabbet: kartor, solsystemet, resan ut. Fler ämnen-sidan med Ordgömman, Solsystemet 3D och Rymdlabbet, Sverigekartan, zoomresan, Stockholm-kartan, berättarröst. |
| `docs/ovriga-amnen.md` | Övriga ämnen: Kodverkstan, Pengar, Tidslinjen, Europa, Världen, Draw it, Extra. Kodverkstan, Pengar och sparande, Tidslinjen, Europakartan, Världskartan, Draw it!, Tangentbordet, Ansiktsloppan, Hörnillusioner. |
| `docs/specialare-filmer.md` | Specialare och filmerna. Specialare (minilektioner, quiz, interaktiva grejer) och alla animerade filmer med röst (motorn `svarthal.js`, `filmlib.js`, `filmfx.js`). |
| `docs/kroppen.md` | Människokroppen i 3D och Resor. `anatomi/`: modellen, lager, områden, infokort samt resorna (Matens resa, Syrets resa, Hjärnan och nerverna). |
| `docs/musiklabbet.md` | Musiklabbet. `extra/trummaskin/`: trummaskin, melodi, ackord, pads, loopstation, effekter, låtläge och export. |
| `docs/elkrets.md` | Elkretsen (NO). `elkrets/`: byggbräda med batteri, lampor, brytare och motstånd, kretssimulator (nodanalys), fem utmaningar, laboratorium och gissa-först. Figurerna ritade i SVG. |
| `docs/sjon.md` | Sjön (NO). `sjon/`: näringskedja, näringsväv, kretslopp och simulerad sjö med fyra uppdrag. Modellens parametrar, uppdragens par, regler. Figurerna är ritade i SVG (lärarens ok för just den övningen). |
| `docs/klasstavlan.md` | Klasstavlan (lärarsidan). `larare/`: whiteboard för projektorn. |
| `docs/ideer.md` | Idéer som väntar. Sparade idéer och diskussioner som inte är byggda. |
| `docs/instagram.md` | Instagram. Lokal mapp `instagram/` med klipp, bildtexter och plan. |

### När en ny övning läggs till

Fem saker måste uppdateras (fyra på startsidan och en i `sok.js`), annars följer framstegen inte med:
1. Ett kort under rätt rubrik (`<h2 class="grp">` + `<nav class="cards">`) med ett `badge`-element.
2. Stjärnorna räknas in i `S.stars` (läs nyckeln, summera `stars`).
3. Nyckeln läggs i listan `snap` (dagar i rad) på startsidan och i **`PKEYS`** i `konto.js` (profiler, flyttkod, inloggningskort och molnkonton).
4. Gärna ett eller två klistermärken i `STICKERS`.
5. **En rad i `sok.js`** (listan `IDX`: adress, namn, kort text, ikon, sökord, plats), annars hittas övningen inte av sökningen. Nya minilektioner eller prova-själv-saker i Specialare: kör `node skript/bygg-sok.js`.
## Gemensam design
- **Ingen ruta med nya klistermärken när startsidan öppnas** (läraren gillade inte popuppen); man går själv in i Klistermärken, som visar "Nytt!". "Nytt!" på Garderoben och Klistermärken sitter som en **etikett på knappens hörn** (absolut placerad), så att raden inte blir bredare.
- **Inga "Nytt!"-lappar på korten** (läraren: allt är nytt). Bara Garderoben och Klistermärken på startsidan visar "Nytt!" när det finns något nytt att hämta.
- Färger: `--bg #EAF3FF`, `--ink #1D2B53`, `--muted #56668F`, `--card #FFFFFF`, `--line #C6D6F2`, `--good #1E9E5E`, `--good-dark #157548`, `--bad #E5484D`, `--accent #3D5AFE`, `--gold #F2B707`.
- Vita kort med hård skugga rakt nedåt (`box-shadow:0 4px 0 var(--line)`) som trycks ner 3 px vid tryck.
- Stora tryckytor (minst 48 px), sifferknappsats för inmatning (**alltid 1 2 3 överst**, som på en telefon, lärarens val okt 2026; Kort division, Dela upp och dela, Uppställning och Mätning hade 7 8 9 överst och ändrades), 🔊-uppläsning med svensk röst där det finns. **Uppläsningen sker bara när man trycker på 🔊, aldrig automatiskt** (lärarens val). Undantag som läraren valt: Hitta ordet i Högfrekventa ord och Draw it! (datorn säger sina gissningar).
- Konfetti vid alla rätt eller nytt rekord. Respektera `prefers-reduced-motion`.
- Rätt svar: grönt och pling. Fel svar: mjukt rosa, en förklaring och uppgiften kommer tillbaka senare i rundan. Aldrig bara ordet "Fel".
- **Emojis används som ikoner.** Ett försök med egenritade SVG-ikoner och en stilguide gjordes men **valdes bort**: läraren tyckte emojiversionen var snyggare. Rita inte nya figurer i SVG utan att fråga.
## Pedagogiska beslut (viktiga, följ dem)

- **Addition och subtraktion**, inte "plus" och "minus", i Tiotalsövergång. Strategin **"Tänk addition"** för subtraktion (13 − 5: 5 + ? = 13) **togs bort okt 2026** (lärarens val: kan förvirra); subtraktion är alltid "Subtrahera först ner till tio" (väljaren och genomgångens flik borta, gamla val ignoreras, stjärnorna ligger kvar).
- **Addition och subtraktion i texten på hela sajten** (lärarens beslut okt 2026): räknesätten i menyer och knappar heter Addition/Subtraktion (Spelhörnan, Rutjakten, Lilla plus knappar, Talföljders tips, skärmläsartexter). Uppläsning av tecknen får vara kvar ("tre plus fyra"). Namnet "Lilla plus & minus" och Skattjaktens tips är inte ändrade än.
- **Tiokompisar**, inte "tiokamrater".
- Tiotalsövergång följer boken: *"Addera först tiokompisen. Addera sedan resten."* och *"Subtrahera först ner till tio. Subtrahera sedan resten."* Korta instruktioner, siffrorna visas i bilden.
- Klockan: **:20 = "tjugo över"**, **:40 = "tjugo i"**, :25 = "fem i halv", :35 = "fem över halv".
- Multiplikation skrivs med **·**, division med **bråkstreck**.
- **Uppställning, subtraktion med växling (svenskt sätt):** siffran man växlar från **stryks bara över**. Man skriver **inget** nytt tal ovanför den, det hålls i minnet. Ovanför kolumnen som får skrivs en liten **10**. Eleven räknar själv *10 + 2 − 7*. Vid växling över noll (402 − 157) skrivs 10 ovanför nollan, och den tian stryks sedan över när man växlar vidare.
- **Uppställning, addition:** eleven skriver **alltid själv minnessiffran**. Rutorna för minnessiffror och växling finns ovanför alla kolumner i alla uppgifter, så att det inte avslöjas när växling behövs.
- **Själv-läget i Uppställning ger inga tips alls** under räknandet. Tips finns bara i Steg för steg.
- Borttaget med flit: **Känguruhoppet** (höll inte kvaliteten), **Grannar** i Hundrarutan (kändes billig), **Lägesord** i Geometri (förskoleklassnivå), pilar i Trasig hundraruta.

- **Samlingarna** (Godisskålen, Receptboken, gårdsdjuren i Hönsgården) räknas fram ur det eleven kan *nu*: medaljer, eller "rätt två gånger i rad" per uppgift. De kan alltså krympa om eleven svarar fel. Läraren har valt att behålla det så. Busslinjen bygger på stjärnor och krymper aldrig.
## Så vill läraren jobba

- **Säger läraren "börja inte" eller "bolla idéer", bygg ingenting.** Föreslå, förklara och fråga, och vänta på "kör". Ibland vill läraren att du först förklarar vad du har förstått.
- Hög kvalitetsribba. Hellre ta bort något än behålla något som känns billigt. Var ärlig när något inte håller måttet.
- Korta, tydliga svar på svenska. Säg alltid **vilka filer som ändrats och var de ska ligga**.
- **Kodverkstan är för dator och surfplatta** (lärarens fynd okt 2026: ”det här är ingen aktivitet för liten mobilskärm ändå”): på mobil (under 720 px) visas en vänlig ruta ”gjord för dator eller surfplatta … du kan prova ändå”; layouten på mobil är inte prioriterad.
- **Rymdlabbet och liknande utforskande övningar får prioritera dator**; är något lite sämre på mobil är det okej, men lösningar som fungerar på mobil är alltid välkomna. Matteövningarna ska fungera fullt ut på mobil och surfplatta.
- Testa alltid ordentligt innan leverans: kör `node --check` på skripten och spela igenom övningar och spel i en headless webbläsare (Playwright) i både mobilstorlek (390 × 844) och datorstorlek.
- Tänk på delade skol-iPads och Chromebooks, och på yngre barn som inte läser säkert.
