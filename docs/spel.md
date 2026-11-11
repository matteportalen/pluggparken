# Spel

_Det som gäller nu för Spelhörnan och alla spel. Hur varje spel byggdes, alla tal, banlistor och tidigare versioner står i `docs/historik/spel.md` (sök där med `grep -n "ord" docs/historik/spel.md`, läs inte hela)._

## Var ligger vad

| Mapp | Spel | localStorage-nyckel |
| --- | --- | --- |
| `spel/index.html` | Spelhörnan (menyn) och spelen som bor i samma fil: Bubbelskjutaren, Tornbygget, Memory, Dragkampen, Grodhoppet. Gamla Racerbanan (`#car`) leder vidare till `spel/racerbanan/`; gamla Kiosken ligger kvar i filen men nås inte. | `mattespel-spel-v1` |
| `spel/tornbygget/` | Tornbyggets utseende (`grafik.js`, `utseende.css`, bilder, ljud). Spelet självt ligger i `spel/index.html`. | (samma, `data.tower`) |
| `spel/racerbanan/` | Racerbanan, Rallyklubben: lopp och mästerskap, åtta mattecheckar per lopp. `fartkansla.js` är bara presentation. | `mattespel-spel-v1` (`car…`, `carRallyCup`) |
| `spel/skattjakten/` | Skattjakten: slumpad labyrint, affär och nyckel, tre delmål och final. | `mattespel-skattjakten-v1` |
| `rutjakten/` | Rutjakten: Korset, Femhörningarna, Rutnätet. | `mattespel-rutjakten-v1` |
| `spel/kulbanan/` | Kulbanan: åtta banor i två världar. | `mattespel-kulbanan-v1` |
| `spel/sagoriket/` | Sagoriket: plattformsspel, fyra världar med boss. | `mattespel-sagoriket-v1` |
| `spel/sifferslottet/` | Sifferslottet: 24 rum på fyra våningar, ett rum i taget. | `mattespel-sifferslottet-v1` |
| `spel/affaren/` | Affären: kassa, kundärenden, Min affär. | `mattespel-affaren-v1` |
| `spel/slungan/` | Slungan: 36 banor i sex världar. | `mattespel-slungan-v1` |
| `spel/tradgard/` | Trädgårdsvakten: försvarsspel, 18 banor i tre världar. | `mattespel-tradgard-v1` |
| `spel/glodvaktaren/` | Glödväktaren: mörkt riddaräventyr (Gläntan, Bergspasset, Klockstaden, Djupen). | `mattespel-glodvaktaren-v1` |
| `schack/`, `trerirad/`, `sudoku/`, `trafikstockning/` | Logik och strategi. Ligger under **Fler ämnen** (`data-portal="ovriga"`), inte i Spelhörnan. | `mattespel-<namn>-v1` |
| `gissastorlek/`, `fylltillstrecket/` | Hur stor är den? och Fyll till kanten (mappen heter kvar `fylltillstrecket`). Under 🎯 Gissa och uppskatta i Fler ämnen. | `mattespel-<namn>-v1` |

Delad kod: `spel/plattform.js` (`MPPlatt`: fysik, styrning, musik, djuret) används av Sagoriket, Sifferslottet och Glödväktaren. Matter.js ligger i `lib/` (Tornbygget, Slungan). Glödväktaren använder `lib/pixelfx/` (MIT).

## Regler som gäller alla spel

- **Matten ska vara själva valet i spelet**, inte en fråga som klistrats på. Läraren har underkänt "arbetsblad i kostym".
- **Eget namn, egen grafik, egna regler.** Förebilder nämns inte vid namn i spelet, och inget kopieras.
- **Fel svar:** inget straffljud och aldrig bara "Fel". Visa en ledtråd eller uträkningen. I Skattjakten visas svaret aldrig, bara tipset.
- **Färg får aldrig avslöja svaret** (skjutbubblan och skjutkulan är vita tills de skjutits).
- **Världsstjärnor:** i spel med många banor ger en värld, våning eller ett paket lika många stjärnor som det lägsta betyget bland sina banor, och 0 tills alla är klara (högst 3). Så hålls Garderobens ekonomi i schack. Betyg per bana sparas separat i `betyg`.
- **Mynt:** 2 riktiga mynt per klarad bana via resultatskärmen i `huvud.js`. Mynt som plockas på banan är bara poäng.
- **Nytt spel ska registreras** på alla ställen: kortet i Spelhörnan eller `fler/index.html`, `STJ` och `SPELHORNAN` i `huvud.js`, `PKEYS` i `konto.js`, `snap` och stjärnsumman i `index.html`, `sok.js`, `sitemap.xml`.
- **Sparnycklar byter aldrig namn.** Nya fält läggs till i samma nyckel, gamla stjärnor räknas alltid vidare, även för borttagna spel.
- **Zoomskydd:** nyp-zoom och dubbeltryckszoom är avstängda på alla sidor under `spel/` och `rutjakten/`, och på spel- och resultatskärmar i övrigt (`huvud.js`).
- **Håll inne en knapp på mobil** får aldrig ge textmarkering eller kopiera-meny i spelytan.
- **Tryck som börjar före en ruta öppnas får inte svara i rutan.** Ignorera tryck de första ca 0,6 s, eller kräv att trycket började inne i rutan (buggar i Skattjakten och Trädgårdsvakten).
- **Nya djur, krafter och hinder förklaras första gången de dyker upp**, en sak per bana i stället för allt från början.
- **Ljud och musik** följer sidhuvudets ljudknapp, tystnar vid paus och när fliken göms. Rörelse i bakgrunden stillas vid `prefers-reduced-motion`.
- **Bilder till spel:** WebP (kör `python3 skript/till-webp.py <mapp>`), licens i `LICENS.txt` eller `PRODUKTION.md` i spelets bildmapp. Kenney-paketen är CC0.

## Testning

- Spel med fysik eller banor testas med en robot som spelar med spelets egen fysik: alla banor ska gå att klara. Slungan har testkroken `window.__sl`, Glödväktaren `MPGlod`.
- Testskripten ligger i `skript/test-*.cjs` och körs ett i taget mot lokal server på port 8765: `NODE_PATH=/opt/homebrew/lib/node_modules node skript/test-<namn>.cjs` (`BASE_URL` byter adress).
- **Testa alltid stående mobil (390 × 800) för spel med verktygsrad**, och liggande mobil för plattformsspelen.
- Förhandsfönstret kör inte `requestAnimationFrame` när det är dolt. Driv spelet med en timer vid skärmbilder.
- Fel som bara syns på den publicerade sajten finns (filer som börjar med `_` föll bort före `.nojekyll`). `skript/test-glodvaktaren-start.cjs` kan köras mot `https://pluggparken.se`.
- Två Glödväktartester föll redan före WebP-bytet och är inte åtgärdade: `test-glodvaktaren-pratbubblor.cjs` och `test-glodvaktaren-varld.cjs`.
- Nästan inget är provat på riktig pekskärm eller med barn. Skriv det i svaret när det gäller.

## Beslut per spel

- **Spelhörnan:** ordningen på korten är lärarens val. På dator vita kort i rutnät, på mobil breda färgglada kort. Memory och Dragkampen är vanliga breda kort (inte halva).
- **Bubbelskjutaren:** en ny värld per bana, ingen väljare. Siktlinjen visar bara ca 60 % av vägen (det ska vara lite svårt att sikta). Bara fel kostar "missar kvar".
- **Tornbygget:** ska vara svårt (läraren tyckte första versionen var "sjukt lätt"): gungning i världsenheter, smalnande balkar, vind från våning 10. Stjärnor bara vid månen.
- **Skattjakten:** utgången är låst, nyckeln köps i affären, eleven räknar själv när hen säljer och köper. Mynten sparas inte mellan rundorna. Utgången kräver nyckel och alla tre delar.
- **Rutjakten:** Korset har ingen klocka och inget slut. På tid (Femhörningarna, Rutnätet) syns klockan alltid och varje fel ger 3 s straff. Inga rullistor.
- **Kulbanan:** ormen har svaren, skjutkulan uttrycket. På pekskärm: fingret ner siktar, lyft skjuter.
- **Sagoriket:** en ny sak per bana. 3–4 svarsportar per bana, fel svar ger ny uppgift utan att banan spelas om. Mellanslag är trollstaven.
- **Sifferslottet:** inga rum med en enda uppgift och ett tal. Talplatserna slumpas, nyckelkista i varje rum, rummet är suddigt tills man rör sig, alltid klocka. Fel tal startar om rummet med samma ekvationer. Ändras rum måste en planerare visa att alla ordningar går att klara.
- **Affären:** uppgifterna var bra, det läraren ville ha var liv runt dem (stamkunder, kundärenden, inredning). Pengarna har egen design, inte kopior av riktiga. Allt köpt ska ta ungefär 15 speldagar. Inredningen är målade bilder i `bilder/inredning/` (Kenneys möbler valdes bort). Knappsats 1 2 3 överst.
- **Slungan:** skylten visar avståndet, aldrig faktorerna. Division passar inte i spelet: Vulkanön har enheter i stället. Banor från 13 ska inte gå att "dundra igenom" med ett platt skott. Flera mål per bana (läraren: en sak att träffa per bana känns tomt).
- **Trädgårdsvakten:** spelet startar direkt, bana 1 är en handledning steg för steg som visas varje gång. Skadetal visas som uträkningar ("15 − 3 = 12") och ligger kvar i 2,2 s.
- **Racerbanan:** arkadkänsla, men faktisk fart, avstånd och svarstid får inte ändras av presentationen. Deterministiska körningar jämförs mot en baseline (`test-racerbanan-fart.cjs`).
- **Glödväktaren:** mörkt men inte läskigt, inget blod. Att dö kostar ingenting. Känslan kommer från pixelfx-riggen (silvergrå riddare); PatchPixel-typsnittet får inte användas (inte MIT). Frågor väntar alltid, ingen tidspress medan man tänker. Text i världen visas som mörka pixelbubblor, inga ljusa rutor ("Word-dokument"). Inga knappar får ligga över spelvärlden på pekskärm: stående har en remsa under bilden, liggande har fält vid sidorna. Bildmanifest och kvalitetskrav ligger som `*.md` i spelets mapp.
- **Schack:** pjäserna är Cburnetts set (CC BY-SA 3.0, källan står på sidan). Regelmotorn `schack/motor.js` är kontrollerad med perft. I jaktläget går bara en bonde åt gången, bönder står aldrig på första eller sista raden. Schackklocka bara i Två spelare.
- **Sudoku:** bara siffror. Lätt och Mellan ska gå att lösa utan gissning.
- **Trafikstockning:** bana 1 i varje paket är alltid öppen.
- **Hur stor är den?:** siluetterna är riktiga former (PhyloPic, Commons; CC BY-upphov står på sidan). Storleken ändras med fyra små hörnpunkter. Varje runda har byggnader, rymd och djur.
- **Fyll till kanten:** målet är alltid kärlets kant, ingen kantlinje ritas.

## Borttaget med flit (bygg inte igen)

Asteroidstormen, Ugglans flygtur, Skattkartan och Kiosken (ersatt av Affären). Djur-läget i Sudoku. Division på skyltarna i Slungan. Kojan i Slungan. Iglo, stora flaggor och lila stenbitar i Bubbelskjutaren. Stjärnor från borttagna spel räknas fortfarande på startsidan.

## Väntar

- Glödväktaren: gruvan och ruinerna har inga extra rum, balansen är inte provad med elever.
- Slungan om det känns tomt: fler material och former, sprängkistor, djurens olika krafter.
- Bredare sidor på dator är inte gjort för matteövningarna, Hundrarutan, Tallinjen och Tidslinjen.
