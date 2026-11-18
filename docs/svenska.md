# Svenska

_Det som gäller nu för svenskaövningarna (kort på `svenska/index.html`). Hur varje övning byggdes, ordlistor, tal och alla turer kring skrivstilens bokstäver står i `docs/historik/svenska.md` (sök där med `grep -n "ord" docs/historik/svenska.md`, läs inte hela)._

## Var ligger vad

| Mapp | Övning | localStorage-nyckel |
| --- | --- | --- |
| `ovriga/hogfrekventa/` | Högfrekventa ord (200 ord i 20 paket, plus egna ord). `kbwhisper.js` och `lasfel.js` är lyssnarmotorerna. | `mattespel-hogfrekventa-v1` |
| `ovriga/ordgatan/` | Ordgåtan. Orden i `ord/niva1.json`–`niva3.json`, läraren kan ändra dem utan att röra koden. | `mattespel-ordgatan-v1` |
| `ovriga/lasflyt/` | Läsflyt, upprepad läsning med en vuxen. `texter.js`, bilder i `scener.js`. | `mattespel-lasflyt-v1` |
| `ovriga/bokstaver/` | Bokstäver (samma nivåer och nyckel som Läsflyt) | `mattespel-lasflyt-v1` |
| `handstil/` | Handstil: tryckbokstäver, skrivstil, siffror, ord. Penndragen i `glyfer.js` (`MPGlyfer`), övningsblad i `blad.html`. | `mattespel-handstil-v1` |
| `sagobyggaren/` | Sagobyggaren | `mattespel-sagobyggaren-v1` |
| `meningsbyggaren/`, `vemgorvad/`, `delameningar/` | Meningar | `mattespel-<namn>-v1` |
| `verb/`, `substantiv/`, `adjektiv/`, `ordfargaren/`, `sorteraord/`, `ordregn/` | Ordklasser | `mattespel-<namn>-v1` |
| `ordkedjan/` | Ordkedjan. `ord.txt` = 853 000 ordformer ur SALDO (CC BY 4.0, källan står på sidan). | `mattespel-ordkedjan-v1` |
| `ordgissning/` | Ordgissning | `mattespel-ordgissning-v1` |
| `dubbelteckning/` | Dubbelteckning | `mattespel-dubbelteckning-v1` |
| `knepigaljud/` | Knepiga ljud (ng, tj, sj, ck). Bilder: Noto Emoji (Apache 2.0). | `mattespel-knepigaljud-v1` |

Typsnittet för ord som eleven ska läsa är **Andika** (`var(--ord)`).

## Regler som gäller alla svenskaövningar

- **Uppläsning bara med 🔊.** Enda undantaget är Hitta ordet i Högfrekventa ord.
- **Datorns röst kan inte säga enstaka ljud** (den säger "ess" för s). Barnet eller den vuxne säger ljuden.
- **Ordklassernas färger är fasta på hela sajten:** verb orange, substantiv blått, adjektiv grönt.
- **Inga facktermer i elevens text** utöver verb, substantiv och adjektiv (inte subjekt, predikat). Tips ges som enkla test: "kan man säga *jag* före?".
- **Elever läser inte småtext.** En stor färgad uppmaning, inga hjälptexter under rutan, en kort rad som ledtråd.
- **Bilden får bara kunna betyda ordet** (🔒 betyder "lås", inte "lock"). Felstavningar som alternativ får inte vara riktiga ord.
- **Ett riktigt ord ska aldrig nekas.** Ordkedjan kontrollerar mot egen lista, SALDO, sammansättningar och namn; okända ord som ser ut som ord godtas som gissningar (högst två per runda, då högst två stjärnor). Ordgissning tar vilka bokstäver som helst.
- **Namn som eleven skriver sparas aldrig** (personuppgifter): Ord och namn i Handstil ger inga stjärnor och sparar inget.
- **Missade ord kommer tillbaka** i nästa runda tills de gått rätt två rundor i rad (Dubbelteckning, Knepiga ljud).
- **Flera av sidorna är skapade ur samma mall**, och generatorerna finns inte i repot. Ändra direkt i filerna. Meningsbanken `BANK` är identisk i alla ordklassidor: **ändra alla om en mening ändras.** Nya namn i Meningsbyggaren måste in i `NAMN`.

## Beslut per övning

- **Högfrekventa ord:** listan bygger på barnböckerna i LäSBarT och är godkänd av läraren. Väljaren Ljud, Stavelser, Hela ordet. Ingen markering av ord som inte låter som de stavas. Ett ord räknas som "kan" när det lästs rätt två olika dagar. Ord på en minut har inga normer. 🎤 Lyssna på mig är ett tillval, av från början, och kan **bara ge grönt, aldrig rött**; inget pling. **Riktig röst (17 nov 2026):** 🔊 spelar mp3 med rösten Evelina (ElevenLabs, `kPdGSxhZAqy4bmPAf9iJ`, valdes av läraren efter prov med Malin och sju andra) ur `ljud/ord/` via `ord.js` (`MPOrd.tala`, datorrösten som reserv om fil saknas eller inte kan spelas); `karta.json` ord -> fil. Alla 200 ord. Egna ord läses av datorrösten. Malin gav konstiga enstaka ord. Nya ord: `node skript/bygg-ord-ljud.js <mapp>` och sedan `ELEVEN_SETTINGS='{"stability":0.5,"similarity_boost":0.75,"speed":0.9}' node skript/elevenlabs.js <mapp>/ord-manus.txt ljud/ord`. Uttalsfel rättas genom att ändra stavningen i manuset och göra om filen (`--om`). Uttal i manuset: "deht" för det (så att t:et hörs) och "ock" för och (läraren valde efter flera prov; deet och okk lät sämst). Stavelser och bokstavsljud är inte inspelade. `skript/ord-klipp.js` (klipper ord ur en mening) gav inte bättre resultat. Två motorer: Webbläsaren (skickar ljud till Google eller Apple) eller I enheten (KB-Whisper, inget ljud lämnar enheten).
- **Läsflyt:** alltid med en vuxen. Ingen tid, inga ord per minut, inga felmarkeringar, bara "Läs igen tills det flyter". Bilden visas först efter elevens första egna läsning. Texterna får bara innehålla nivåns bokstäver plus högst två helord. Bilderna är ritade i kod, inga emojis. Stjärnor för att man övat, inte för fart.
- **Bokstäver:** inga stjärnor, inga ljudfiler.
- **Ordgåtan:** två eller tre ledtrådar per ord, ledtråden får inte innehålla svaret. Inget eget tangentbord ritas. Ett ord kommer inte igen förrän alla har kommit.
- **Sagobyggaren:** färdiga bilder (Kenney och akylrum, CC0), inte egenritade. Den färdiga sagan är en sida med rubrik, en bild och hela texten.
- **Dubbelteckning:** "Tänk först, stava sen": först kort eller lång vokal, sedan stavningen. ck hör till kort vokal och finns på alla nivåer; ng och nk hör inte hit.
- **Vem gör vad?:** frågan innehåller meningens eget ord ("Vem eller vad **äter**?").
- **Dela upp i meningar:** man trycker på sista ordet i varje mening, orden färgas per mening.
- **Ordregn:** 60 sekunder, ingen game over. I Fånga-lägena en korg som bara rör sig i sidled.

## Handstil

- **Penndragen följer lärarens skola.** Bokstäver skrivs med så få drag som i riktig handstil (lilla m i ett drag). Enskilda bokstäver som läraren har rättat (E, K, k, M, 4, 6, 9, och i skrivstil a, b, c, d, r) ska inte ritas om utan att fråga. Skrivstilens versaler följer lärarens blad `skrivstil-2.jpg`.
- **Skrivstil är sammanhängande:** ett ord är ett långt penndrag, prickar och tvärstreck kommer sist. Kopplingarna har inga vågor nere vid raden.
- **Byt `?v=` för `glyfer.js` i både `index.html` och `blad.html` varje gång filen ändras** (GitHub Pages cachar).
- **Se-animationen är tidsstyrd efter streckets längd** och påverkas inte av `prefers-reduced-motion` (den rusade annars på PC). ⏩ x2 är förinställd.
- **"Ta det här näst"** ger en blandad omgång: 2 uppvärmningar ur olika grupper och 4 bokstavspar ur olika grupper, sist ett kort ord med bokstäver man klarat. Aldrig en hel grupp av samma sort. Uppvärmning högst en gång per dag. I en omgång går det vidare av sig självt efter en lyckad skrivning.
- Startsidan är ett dragspel med en grupp öppen i taget (färre val samtidigt).
- Penna går före finger, handflatan ignoreras.
- Tester: `skript/test-handstil-versaler.cjs`, `-bindningar.cjs`, `-animation.cjs`. Testa även förövningarna, inte bara bokstäverna.
- Inte utskrivet på papper och inte provat med riktig penna.

## Borttaget med flit (bygg inte igen)

Rimmaskinen och andra snabba frågeövningar ur en gemensam mall. **Stavningsjakten** (välj rätt stavning av fyra, påhittade felstavningar; `stavningsjakten/` är bara en omdirigering till Svenska-sidan, nyckeln `mattespel-stavningsjakten-v1` ligger kvar i stjärnräkningen och `PKEYS`). Testsidorna Läsfelslabbet och Mikrofonlabbet. Markeringen 👂 "låter som" i Högfrekventa ord. Tid, ord per minut och felmarkeringar i Läsflyt. De rena ck-, ng- och nk-orden i Dubbelteckning. Raden med en bild per sida i Sagobyggarens bok.

## Väntar

- Bokstäver: hittepåord och fonologi (lärarens beslut: vänta).
- Sagobyggaren: trollkarl och häxa (ingen fri figur i samma stil hittad).
- Ordklasser: fyll i luckan med rätt sort, hitta det som inte passar, bygg ut meningen med adjektiv.
- Handstil: diktamen, tre rutor på samma sida.
- Engelska ord: läraren gör om bilderna själv (byts i listan `ORD`, se `docs/ovriga-amnen.md`).

## Utskrivbart (Skriv ut)

- **Ordjakt med egna ord** (`skriv-ut/ordjakt.html`, lärarens önskan 14 nov 2026): läraren skriver veckans ord (3–14 bokstäver, ett per rad eller med mellanslag/komma), väljer ruta 10, 12, 14 eller 16. **Rutstorleken väljs automatiskt** (standard, knappen ✨ Automatiskt visar vald storlek): minsta ruta där orden ryms och längsta ordet får plats; handval 10/12/14/16 finns kvar. **Antal ord följer rutan** (`MAXORD`: 10 → 16, 12 → 22, 14 → 28, 16 → 36; mätt med 50 slumpade blad per storlek, alla ord fick plats); sidan räknar "12 av högst 22 ord" och föreslår en större ruta om orden är för många. Rutan har **rundad ram** och åt vilka håll orden får stå (höger, nedåt, snett, baklänges). Ny ruta varje gång, 1/2/5/10 blad med samma ord men olika placering, bladnummer som på hundrarutan. Orden som skrivs in sparas inte. Facit sist (fyra mini-rutor per sida, orden i svart). Ord som inte får plats visas som en varning.
- **Ordjakt: orden korsar varandra** (14 nov 2026): ett nytt ord prefererar en plats där det delar bokstav med ett ord som redan ligger (85 % av gångerna, `kors` i `blad()`), aldrig i samma riktning som ordet det korsar, högst tre delade bokstäver per ord. Mätt: 8–29 delade bokstäver per blad beroende på ruta och riktningar, aldrig noll, och alla ord får fortfarande plats. Nackdel: i facit kan ihopkopplade ord flyta ihop till en svart klump.
- **Seriesidor** (`skriv-ut/seriesidor.pdf`, lärarens önskan 18 nov 2026, efter lärarens egna mallar): tjugo A4-sidor med rutor (titelruta, prat-, tanke- och textbubblor, skrivrader under rutorna, omslag med "av", actionsida med sneda rutor) och en namnrad. Görs om med `node skript/seriesidor.cjs` (sidorna står i listan `SIDOR`); ändra där, inte i PDF:en. **Sidorna 1–5 är lärarens egna A4-mallar** (först i dokumentet, lärarens önskan; mina sidor är 6–25, **sida 6 är omslaget**, lärarens önskan) (`skript/mallar/seriemallar-a4.pdf`, 18 nov 2026; den första versionen var A5 och blev för tjock uppskalad). PDF:en görs i två steg: `node skript/seriesidor.cjs` (de 20 egna sidorna) och sedan `python3 skript/seriesidor-lagg-till-mallar.py` (kräver PyMuPDF). Körs bara det första försvinner mallarna.
