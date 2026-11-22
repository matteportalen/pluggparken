# Plattformen

_Det som gäller nu för startsidan, ämnessidorna, sidhuvudet, profiler och konton, mynt, sökning, tema, publicering och 3D-världen. Hur det byggdes och alla detaljer står i `docs/historik/plattform.md` (sök där med `grep -n "ord" docs/historik/plattform.md`, läs inte hela)._

## Var ligger vad

| Fil eller mapp | Innehåll |
| --- | --- |
| `index.html` | Första sidan: griffeltavlan (går att rita på), sökruta, profilrad, ämneskort med animerade SVG-ikoner. |
| `matte/`, `svenska/`, `so/`, `fler/` | Ämnessidorna med övningskorten. Rymdlabbet och Specialare har ingen ämnessida, korten går direkt dit. `ovriga/index.html` är den gamla Fler ämnen-sidan. |
| `huvud.js` | Sidhuvudet på alla sidor: logga, ☰ Ämnen, ←, sök, tema, ljud, stjärnor och mynt (`MPStjarnor`, `MPStjarnorFor`, `MPMynt`), bakåtknappen (`MPS.visa`), zoomskydd, `amneAv()`, `STJ`. |
| `konto.js` | Molnkonton (`MPKonto`), **`PKEYS`** och sammanslagningen (`merge`, `progressOf`). |
| `sok.js` | Sökningen (`IDX`). Specialares lektioner läggs in av `node skript/bygg-sok.js`. |
| `tema.js` | Ljust och mörkt läge (`MPTema`). Första skriptet i `<head>`. |
| `mittrum/` | Mitt rum (köp i `matteportalen-mynt`, val i `matteportalen-rum`). |
| `rum.js` | Katalogen för Mitt rum och Mitt hus (`MPRum`): platser, saker, priser, säsong, `las/spara/owned/kanKopa`. Platser med `d3:true` finns bara i huset. |
| `varlden/hus.js` | Mitt hus i världen: huset på huvudön (`byggHusUte`, `husPlats`), rummet inuti (scen `hus`, `byggHusInne`) och butiken 🛒 Inred (`husButik`). |
| `varlden/` | Pluggparken-världen i 3D (three.js ur `lib/three/`). Data i `mattespel-pluggvarlden-v1`. |
| `integritet/` | Integritetspolicyn. |
| `supabase/konton.sql` | Databasen för konton. |
| `.github/workflows/` | `pages.yml` (publicering), `supabase-ping.yml` (håller gratisprojektet vaket). |

## Ny sida: det här måste med

- `tema.js` först i `<head>`, sedan `ljud.js`, `djur.js` vid behov och `huvud.js` (med `data-titel` och `data-ikon`) före sidans skript.
- Skärmbyten anropar `MPS.visa(id)` (hem 0, val 1, spel och resultat 2).
- **Varje skärm har en tillbaka-knapp som matchar `BACK`** (t.ex. `data-home`, `#quit`). Annars lämnar ← sidan, eller ✕ kräver två tryck.
- **Escape stänger varje ny ruta**, utom rutor som kräver ett val.
- Färger via variablerna (`--bg --ink --muted --card --line`) eller med reservvärde, `var(--card,#fff)`. En pastell som inte finns i `tema.js` får ingen mörk variant.
- `description`, `canonical`, Open Graph och en rad i `sitemap.xml`.
- Kortet på rätt ämnessida, mappen i `amneAv()` om den inte är en matteövning, mappen i `STJ` om den ger stjärnor (då får kortet stjärnlappen av sig självt).
- Nyckeln i `PKEYS` i `konto.js`, i `snap` och stjärnsumman på `index.html`. Stjärnreglerna i `MPStjarnor` och på startsidan måste vara samma.
- En rad i `sok.js`, med siffran som sökord om övningen hör till ett tal (`100`).
- Portal i `PARKER` i `varlden/index.html` (portallistan är skriven för hand).

## Regler

- **Ingen sidledsscroll på mobil**, sidhuvudet ska alltid rymmas (kontrollera 320–390 px med långt profilnamn).
- **Testa startsidan med sparade stjärnor**, inte bara i en tom webbläsare. Skriptet har kraschat för elever med data när ett element saknades.
- **Dagar i rad visas inte** (räknas bara för klistermärkena).
- **Minilektionerna i Specialare länkas inte från ämnessidorna.**
- **Loggan är delad:** "Pluggparken" går till startsidan, den gula ☰ Ämnen öppnar menyn. ← går till sidan man kom ifrån, annars till ämnets sida.
- **Mynt:** nya stjärnor ger mynt bara när totalen passerar `hi` (högsta antal som någonsin gett mynt), och `hi` sänks aldrig. Tjänade mynt har ett tak. `MPMynt.kop` drar aldrig mynt två gånger för samma sak.
- **Mörkt läge:** utan sparat val följer sidan enheten. Mörka eller egna sidor (Specialare, Rymdlabbet, Solsystemet, Schack, np3, flytta, 404) laddar inte `tema.js`. Ritade bilder och spelens färgvärldar behåller sina färger.
- **Första sidan** är upp till 1 400 px bred. Ämneskorten är vita kort med hård skugga. Nytt ämneskort: egen SVG-ikon som rör sig vid hovring och en gång när kortet syns på pekskärm.
- **Teckningen på tavlan sparas inte.**

## Profiler och konton

- Profiler finns på enheten: vid byte sparas alla `PKEYS` i `mp-bundle-<id>`. Övningssidorna märker ingenting.
- **Konton i molnet:** Supabase, gratisnivå, region Stockholm. Påhittat användarnamn (förled + djur), lösenordet är ett ord, ingen e-post. Allt går via funktionerna `pp_skapa`, `pp_hamta`, `pp_spara`, `pp_radera`, `pp_ping`. Den publika nyckeln får ligga i `konto.js`; **den hemliga nyckeln ska aldrig in i repot eller chatten**.
- **Sammanslagning:** per övning behålls datan från den enhet som kommit längst (hela övningen, inte fält för fält). Undantag med egen regel: mynten, Mitt rum (per plats, senast ändrad vinner), Glödväktaren, Racerbanan och världen.
- Startsidan hämtar, slår ihop och skriver. Övriga sidor skickar bara upp efter en runda och när fliken göms.
- **Kom ihåg mig** (`mp-kom`) är förbockad. På delade skoldatorer ska eleverna logga ut eller bocka ur.
- Att radera kontot kräver svaret på en multiplikation.
- Flyttkod och "Ta med min profil" är dolda, men gamla `#flytta=`- och `#kort=`-länkar och QR-kort tas fortfarande emot.

## Dataskydd

Sajten loggar inget och har ingen analys eller kakor. Inga externa typsnitt eller bibliotek (se `CLAUDE.md`). Kända externa anrop: Supabase (konton), Stockholmskartans kartplattor, Hugging Face om läraren väljer den motorn, och Chromes taligenkänning i Högfrekventa ord (skickar ljud till Google). Kvar för läraren: databehandlaravtal med Supabase, och en beskrivning till skolans dataskyddsombud om konton används i klassen.

## Publicering (GitHub Pages)

- `.nojekyll` i roten: allt i repot publiceras som det är.
- **Pusha inte flera gånger medan en publicering pågår.** Kolla `gh run list --repo matteportalen/pluggparken`.
- Hänger en publicering: starta en ny en stund senare med `gh workflow run "Publicera Pluggparken" --repo matteportalen/pluggparken --ref main`. Orsaken är en gammal deployment som GitHub fortfarande räknar som pågående; `pages.yml` avbryter sådana före varje försök.
- Kontrollera att en ändring är ute: jämför `curl -s https://pluggparken.se/<sida> | md5` med `md5 -q <fil>`.
- Håll sajten liten: talfiler 64 kbps mono (`lame --mp3input -b 64 -m m`), stora bilder som WebP. JPG-bilderna i `specialare/bilder/` vinner inget på omkodning.

## Pluggparken-världen (`varlden/`)

- **Bonusläge, inte en ersättning för startsidan.** Huvudön är en hub med fontäntorg, lundar, fyr och utsiktsbrygga; varje ämne har en egen ö (`PARKER`): Matte, Svenska, Spel, SO, Rymdlabbet (ett klot med högre hopp), NO-parken, Kroppen, Biografen (Specialare), Fler ämnen och Musikön.
- **Varje övning och verktyg på ämnessidorna har en portal** (lärarens beslut 16 nov 2026). Ny övning: lägg portalen på rätt ö. NO-övningar står i **NO-parken** (`PARKER.no`: Vattnet, Teknik, Jorden); Rymdlabbet och Kroppen har kvar egna öar.
- **Musikön** är den gamla Extra-ön (scen-id `extra` är kvar, så sparad data följer med) och har bara Musiklabbet. Extra-sidans övningar (Hörnillusioner, Ansiktsloppan) står på Fler ämnen-öns sjätte arm **Extra ✨**. Musiklabbet ligger på Fler ämnen-sidan men har sin portal på Musikön (lärarens val).
- **Varje ö ska ha en egen form eller byggnad, en egen sak man gör och egen natur och egna uppdrag.** Öarna får inte likna varandra eller huvudön. Sakerna man samlar ser ut som ämnet, inte bara bollar.
- **Belöningar stannar i världen** (prydnader på huvudön). Mynt och riktiga stjärnor rörs inte. Biljetter som krav för åkturer valdes bort.
- Epoker och platser som inte är övningar är skyltar, inte portaler.
- Platsen sparas vid varje portal (`mp-varlden-pos`), så man kommer tillbaka framför samma portal. Sidhuvudet visar 🏝️ Världen när man kommit därifrån.
- "🐢 Lågt läge" slås på av sig självt på svaga enheter. Inga realtidsskuggor; billiga instansierade kontaktskuggor används under fasta föremål.
- **Stjärnor på portalerna:** varje portal till en övning som ger stjärnor visar elevens stjärnor ("⭐ 5", grå "☆ 0"), och portalerna till öarna visar öns summa. Världen laddar `huvud.js` med `data-bara="stjarnor"` (bara räkningen, inget sidhuvud, inga mynt) och frågar `MPStjarnorFor`; höj `?v=` på den raden om stjärnreglerna ändras.
- **Liv på öarna** (`byggLiv`, `LIVD` per ö): fjärilar, fåglar som lyfter när man kommer nära, smådjur som skuttar undan och en fisk som hoppar i havet. Djuret lämnar fotspår och damm, plaskar i dammar och snurrar när det hittar något. Allt är avstängt vid `prefers-reduced-motion`, färre i Lågt läge, och finns inte på månen (Rymdlabbet). Ny ö: lägg en post i `LIVD`.
- **Inget får stå på en stig eller framför en portal.** På huvudön står allt som inte är portaler i gluggarna mellan stigarna (`glugg(k,r)` i `byggHub`): hopptrappan mellan Kroppen och Biografen, ljusbrädet mellan Biografen och Fler ämnen (rakt mot −z, rutorna är axelriktade), klossarna mellan Fler ämnen och Musikön. Läggs en ö till i `HUB` flyttas alla portaler: kontrollera trappan, klossarna och ljusbrädet igen. `S.stigPkt` (stigarnas punkter) finns för att kunna testa det.
- **Biografen: filmerna och quizet visas på bioduken, man lämnar inte världen** (lärarens önskan nov 2026). OK på en film ställer kameran rakt framför duken och lägger filmmotorn i rutan `#bioFilm` exakt över duken (`bfRuta`); på smal skärm fyller rutan hela fönstret. Inga ledtrådar före filmen i bion. Quizet (`bioQuiz`, `specialare/quiz.js`) nås från filmens slutruta och från knappen 🧠 Quiz. Bara den valda filmens fil laddas (`specialare/filmreg.js`). Prova själv-sakerna och "Alla specialare" länkar fortfarande ut.
- Test: `__varlden` och `window.__oversikt=true` ger översiktskamera. Kontrollera att portaler och föremål ligger innanför kusten.

- **Upptäckter och miljöputs:** `varlden/upptackter.js` är en lokal ES-modul. Återspelbara aktiviteter: bråkbro (Matte), ordros och studssvampar (Svenska), kulkedja och studssvampar (Spel), ljusspegel (SO), vattenhjul/hiss/rutschkana (NO), puls (Kroppen), låda/tryckplatta (Fler ämnen) och tonminne (Musikön). Uppdrag visar vägen med en gul pil. De tidigare små experimenten med halvor och additiv ljusblandning finns kvar.
- **Egen glänta:** bänk, blomma och två prydnadssocklar på huvudön. Valen sparas som `SV.glanta` i befintliga `mattespel-pluggvarlden-v1`. Fynd har id `lek-…` i `SV.seen` och belönas högst en gång med världens vanliga prydnader.
- **Placering:** nya lekplatser väljs på plana, lediga ytor innanför kusten; hela åkbanan reserveras mot växtlighet. Trädkronor, portaler, gångvägar och samlarföremål ska ha marginal. Huvudöns större entréer har färgkodade skyltar och ämnessymboler.
- **Test:** `skript/test-varlden-upptackter.cjs` kör Playwright mot lokal server (`WORLD_URL`, normalt port 8765; `PLAYWRIGHT_PATH` vid en separat installation). Kontrollerar öar, placering, aktiviteter, pek/tangentbord, åkavbrott, sparning och reducerad rörelse/lågt läge.

- **Mitt hus (17 nov 2026):** ett hus på huvudön (gluggen mellan SO-parken och Rymdlabbet, r 40) där dörren är en portal till scenen `hus`. Inuti ett rum utan tak (väggar mellan kameran och rummet göms, som i ett dockskåp) där man inreder för mynt med 🛒 Inred: prova först, köp sedan. **Köp och val delas med Mitt rum (2D)** (lärarens krav: aldrig köpa två gånger): samma `rum:plats:id` i myntkassan och samma `matteportalen-rum`. Nya saker bara i 3D (`d3:true` i `rum.js`): gardiner, soffa, bord, kylskåp, spis, tvättmaskin, tv och en kompis (katt, hund, kanin, sköldpadda, pingvin) som går runt på mattan. **Lekrummet och saker man gör något med** (lärarens val samma dag): en dörr på vardagsrummets högra vägg leder till scenen `lekrum` (platser med `rum:"lek"` i `rum.js`). Där finns musik (piano, trumset, xylofon: tryck på tangenter och trummor, egna toner med Web Audio i `hus.js`), lek (studsmatta = en `S.pads`-platta som studsar högt, bollhav där bollarna hoppar när man går i det), teleskop (tryck så byts fönstrets utsikt: Saturnus, Månen, Mars, stjärnhop, med en fakta) och **troféhyllan**. Troféerna går inte att köpa, de förtjänas (stjärnor 1/10/50/100/250, tränade dagar 3/10/30, 500 mynt tjänade, alla öar besökta); grå troféer visar vad som krävs, en toast säger till när en ny kommit (`mp-trofeer-sedda`, bara lokalt). I vardagsrummet: bokhyllans böcker öppnar minilektioner i Specialare (✕ i lektionen leder tillbaka till huset via `mp-tillbaka-varlden` i sessionStorage), och man matar fiskarna genom att trycka på akvariet. Tryck på saker = kort tryck utan att dra (`S.ref.klick`). **Möblerna går att flytta fritt** (lärarens val samma dag): 🛒 Inred → ✋ Flytta möbler, tryck på en möbel och dra den, ↻ Vrid (45°), ↺ Tillbaka (standardplatsen), piltangenter knuffar och R vrider. Fönster, tavla, gardiner och taket sitter fast. Möbler stannar i rummet och kan aldrig ställas framför dörren. Platserna sparas i `matteportalen-rum` som `pos` {plats:[x,z,vridning]}, null = standardplatsen; i molnet vinner den senast flyttade per möbel (`t["pos:plats"]`, `konto.js`). Världen laddar `huvud.js` med `data-bara="stjarnor"` men får nu `MPMynt` också. Stjärnräknaren göms i huset. Sakerna är enkla former i kod som resten av världen.

## Väntar

- Egna 3D-modeller (Blender, `.glb`), riktiga organmodeller i Kroppen-ön.
- Bildkort-rader på första sidan (Fortsätt där du var, Prova något nytt).

## NO som eget ämne (12 nov 2026, lärarens beslut)
- Startsidan har ett kort **NO** (`no/`) i stället för Rymdlabbet-kortet. `no/index.html` samlar allt NO i tre grupper: *Rymden och jorden* (Rymdlabbet, Kontinentaldrift), *Kroppen* (Människokroppen i 3D), *Natur och teknik* (Vattnets kretslopp, Sjön, Flyta eller sjunka, Elkretsen). 🔬 NO-sektionen i `fler/` är borttagen. Ny NO-övning: lägg kortet i `no/index.html` (inte i `fler/`) och sökvägen i NO-regexen i `amneAv()` i `huvud.js`.
- Rymdlabbets adress `ovriga/rymdlabbet/` är oförändrad (länkar, portalen i världen och sök bryts inte). I menyn och brödsmulan hör Rymdlabbet, Solsystemet, Vintergatan, Människokroppen och NO-övningarna till ämnet `no`.
- Startkortet NO har en egen animerad atom (klass `no`, roterar med `am-orb`). Rymdlabbets animerade planet (ring, måne, blinkande stjärnor) ligger nu på Rymdlabbets kort på NO-sidan (`.card.rl` i `no/index.html`, CSS och keyframes kopierade från startsidan, spelas en gång när sidan öppnas och vid hover).
- **Rymdlabbet framhävt (12 nov 2026):** överst på NO-sidan ligger ett stort utvalt kort (`.rlhero`, rymdbakgrund med stjärnor, den animerade planeten i 96 px, genvägar "Hoppa direkt till" som djuplänkar till lägena `#dag`, `#arstid`, `#morker`, `#vikt`, `#jattar`, `#hal`, gula knappen "🚀 Starta resan" = Solsystemet i 3D (`ovriga/solsystemet/`, Rymdlabbets paradnummer) och länken "Alla lägen i Rymdlabbet"; kortet är en `div`, inte en länk, så att genvägarna inte ligger inuti en annan länk). Gruppen under heter nu *Jorden* (Kontinentaldrift).
- **NO-kortets atom på startsidan:** elektronerna åker runt sina banor med SMIL (`animateMotion`, `begin="0s;indefinite"`) och startas om av `smil(k)` i ämneskortens skript när kortet animeras; kärnan pulserar (`am-nk`) och atomen lutar (`am-at`). Vid `prefers-reduced-motion` pausas SVG-animationerna.

## Utskriftsgeneratorerna (Skriv ut)

- **Alla generatorer** (`skriv-ut/hundraruta.html`, `multiplikation.html`, `klockan.html`, `mattelabyrint.html`, `ordjakt.html`) följer samma modell: ny slumpad blad varje gång, bladnummer (samma nummer + samma inställningar = samma blad), 1/2/5/10 blad, facit valbart, A4 med `@page` och samma förhandsvisning (`.stage`/`fit()`) som `handstil/blad.html`. Nya generatorer ska följa det.
- **Svartvitt, djur och berömruta** (lärarens beslut 14 nov 2026: färg provades men **svartvitt var bättre**, så färgalternativet är borttaget): alla utskrifter är svartvita (klassen `pages bw` sätts alltid, ingen kryssruta). Kvar är kryssrutan **Mitt djur på bladet** (`owlSVG(lasDjur())`, grått) och en berömruta längst ner på provblad och övningsblad (inte på facit), t.ex. "⭐ Bra jobbat! Jag klarade ___ av 30", **utan** "Mitt mål nästa gång". Gemensam CSS: `.hd`, `.pet`, `.bra`, `.bw`. Färgreglerna (`--c`, rubrikband, tonade rader) ligger kvar i filerna men används inte; lägg inte tillbaka färg utan att läraren ber om det.
- **Luftigare uppgifter:** svar skrivs i rundade rutor (inte på linjer) och rader har mellanrum. Test av nya blad: kontrollera att inget hamnar över sidfoten (36 uppgifter, 36 ord på 16 × 16, 11:an/12:an i multiplikation) och att allt ryms i både färg och svartvitt.
- **Facit** har klassen `sida bw` (från när färg fanns, lärarens önskan: färg på facit är slöseri med toner). Det gäller hundraruta, klocka, labyrint och ordjakt (multiplikationens facit är bara en remsa på baksidan).
- **Årshjulet** (`skriv-ut/arshjul.html`, lärarens önskan 22 nov 2026, efter o-calendar.com som saknas på svenska): runt årshjul, kalenderår eller läsår (aug–jul). Två stilar: **Linjer** (standard, tunna linjer, en linje per dag att skriva på, datum och veckodag ytterst, månens faser och solstånd utanför) och **Färgband**. Färg, svartvitt eller att färglägga; A4, A3, **2 × A4 eller 2 × A3** (lärarens önskan: även A3 kan bli trångt; hjulet delas i en övre och en nedre halva på var sitt liggande blad, del 1 har en grå klisterkant på 12 mm nedanför mitten, del 2 en hårfin klipplinje (0,12 mm) över hjulet och tjocka markeringar bara utanför hjulet (lärarens fynd: tjock streckad linje gav ingen sömlös skarv); året står ovanför snittet och rubriken under). **Alla dagar får datum och veckodag** på alla storlekar (lärarens önskan; Automatiskt med bara måndagar på A4 är borttaget). Bara måndagar finns kvar som val, med större siffror. **Ingen förklaringsrad** (helg, röd dag, veckonummer, månen) längst ner: lärarens beslut, det var överflödig information. **Inga instruktioner på halvorna** (inte "Del 1 av 2" eller hur man klipper; lärarens beslut: den ska vara snygg uppsatt). Rubriken på del 1 är centrerad i det fria utrymmet ovanför halvan. Klipp- och klistermarkeringarna sitter bara i remsorna som klipps bort eller hamnar under; instruktionen står på sidan. **"Pluggparken.se" är en knappt synlig vattenstämpel** (svart, 10 % opacitet, klassen `.vm`), lärarens önskan. På A4 är datumtexten ca 1,3 mm hög. Rutan Att komma ihåg finns inte på halvorna. **Veckorna är egna rutor måndag–söndag**; i Linjer tonas varannan vecka som en hel kil från veckonumret ut till datumen, och helgtoningen ligger bara i datumringen (lärarens fynd: den tjocka månadslinjen, t.ex. torsdag 1 juli, såg ut som en veckogräns) och månadslinjerna går inte igenom veckoringen (lärarens fynd: det såg ut som att veckan bytte mitt i). Veckonumren är ISO 8601 (kontrollerade dag för dag 2020–2034); 1–3 januari kan höra till förra årets v 52/53, och den rutan ligger då bredvid årets sista vecka vid årsskiftet. Röda dagar räknas fram (påsk, midsommar, alla helgons dag), högtider med emoji, egna händelser skrivs radiellt vid dagen. Inget bladnummer eller facit (det är ingen generator med slump). Inställningar och händelser sparas i `pluggparken-arshjul-v1`, **inte** i `PKEYS` (lärarverktyg, kan innehålla elevnamn).
- **Stjärnlappen och totalen styrs av listan `STJ` i `huvud.js`** (18 nov 2026, lärarens fynd: Rutnät, Dubbelteckning, Ordgissning, Ordkedjan, Engelska ord, Klockan på engelska och Demokrati sparade stjärnor men saknade stjärnlapp, räknades inte i totalen och saknades i `PKEYS`). En övning med `data.stars` per nivå ska alltid in i **tre** listor: `STJ` (huvud.js), `PKEYS` (konto.js, höj `?v=` på konto.js) och `snap` (index.html). Annars syns inga stjärnor och framstegen följer inte med i profiler och moln.
