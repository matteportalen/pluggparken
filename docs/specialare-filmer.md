# Specialare och filmerna

_Det som gäller nu för Specialare (minilektioner, quiz, prova själv) och alla filmer med röst. Vad varje film innehåller scen för scen, alla uttalsfynd och hur bilderna hämtades står i `docs/historik/specialare-filmer.md` (sök där med `grep -n "ord" docs/historik/specialare-filmer.md`, läs inte hela)._

## Var ligger vad

| Fil | Innehåll |
| --- | --- |
| `specialare/index.html` | Sidan: Dagens mysterium, 🎲 Slumpa, ämnesfilter, kort. Filmregistret (`{titanic:window.MPTitanicFilm, …}`). |
| `specialare/lektioner.js` | `LEKTIONER`: varje bild `[emoji, rubrik, text]`, fälten `film`, `grej`, `lank`. Nya lektioner läggs **sist**. |
| `specialare/bilder.js` | `BILDER[lektion][n]` = fil, källa, licens. Bilderna i `specialare/bilder/<lektion>-<n>.jpg`. |
| `specialare/ledtradar.js` | Tre ledtrådar per lektion, från svår till lätt. |
| `specialare/quiz.js` | `QUIZ[lektion]` = tre frågor med förklaring. |
| `specialare/grejer.js` | `GREJER`: de interaktiva sakerna (`#g/<id>`). |
| `specialare/klippl.js` | `KLIPPL`: kuriosaklipp som läraren själv valt. |
| `specialare/<namn>film.js` | En film per lektion (`MP<Namn>Film.start`). |
| `specialare/filmreg.js` | `MPFilmReg`: lektionens `film` → [fil, global]. Används av Biografen i 3D-världen, som bara laddar den valda filmen. |
| `specialare/filmlib.js`, `filmfx.js`, `klot.js` | Delade ritverktyg för filmerna: foton, paneler, kamerarörelse, glöd, klot. |
| `svarthal.js` (roten) | **Filmmotorn** för alla filmer med röst (`MPSvartHal.start(host,{def,extra,onClose})`), och filmen Inuti ett svart hål. |
| `zoomfilm.js`, `stjarnfilm.js` (roten) | Zooma ut i universum, En stjärnas liv (Rymdlabbet). |
| `manus/<film>-manus.txt` | Rösttexten per replik. Raden `VOICE: <id>` överst väljer röst. |
| `ljud/<film>/s<scen>-<replik>.mp3` | Röstfilerna. |
| `skript/elevenlabs.js` | Skapar röstfiler ur ett manus. |
| `skript/bygg-sok.js` | Lägger lektionerna i `sok.js`. |

Specialare sparar ingenting: inga stjärnor, mynt eller `PKEYS`. Sidan är mörk och laddar inte `huvud.js` eller `tema.js`.

## Regler för minilektioner

- **Kort:** högst sex bilder, en eller två korta meningar per bild. Texten visas som punkter.
- **Alla bilder är riktiga foton** från Wikimedia Commons med fri licens, en per bild, med källa och licens under. Ny lektion: riktig bild till varje bild, på samma sätt.
- **Varje lektion börjar med tre ledtrådar** som inte får innehålla lektionens namn. Dagens mysterium avslöjar inte titeln.
- **Ny lektion behöver:** post i `lektioner.js` (sist), `bilder.js`, `ledtradar.js`, `quiz.js` (annars ingen quizknapp), och `node skript/bygg-sok.js`.
- **Quiz:** rätt svar får inte vara längst, svaren slumpas av sidan, varje fråga har en förklaring, en bonusfråga med fakta utöver lektionen.
- **En grej får inte ha samma id som en lektion eller ett klipp.**
- **Bara klipp som läraren själv valt.** YouTube-länkar i `lank` spelas alltid inbäddade, aldrig i ny flik. Klippsamlingen (`klipp.js`) är pausad.
- **Känsliga ämnen görs sakligt och varsamt:** inga upprörande bilder (11 september, Digerdöden, Tjernobyl, orkaner), inga dödstal där uppgifterna går isär.
- Stilen är mörk och museal: serifrubriker, glasknappar, glöd i lektionens färg. Allt stilla vid `prefers-reduced-motion`.
- Minilektionerna länkas inte från ämnessidorna. De visas även i Biografen i 3D-världen, där filmen och quizet spelas direkt på bioduken (se `docs/plattform.md`).

## Regler för filmer med röst

- **Upplägg:** ledtrådarna och svaret först, sedan knappen "🎬 Starta filmen" (lektionsfältet `film:"<id>"` plus en rad i registret). Slutrutan får lektionens länkar, Prova själv och quiz av sig själv.
- **Längd ca 2 minuter**, med några kontrollerade fakta utöver lektionstexten.
- **Realistiskt och med wow-känsla:** riktiga foton som huvudbild med kamerarörelse, ljus och glöd, partiklar, simulering där det går. Rita bara enkla diagram, ikoner och symboler. **Ritade figurer av sådant som ska se riktigt ut ser billiga ut** (ananasen, mammuten): använd foton.
- **Samma bild visas inte stort i flera scener.** Stående foton visas hela, inte beskurna.
- **Prestanda:** ingen `ctx.filter`, ingen `createRadialGradient` per partikel (använd `glow()`), inga stora bilder med `shadowBlur` varje bildruta (baka dem en gång), räkna inte om klot varje bildruta. Jag kan inte mäta bildtid i förhandsvisningen: be läraren kontrollera att det flyter.
- **Röster:** Paul Axel i rymd- och historiefilmer, Malin i naturfilmer. Aldrig två röster i samma film. Nya röster provas med samma replik och läraren väljer.
- **Skapa röst:** `node skript/elevenlabs.js manus/X-manus.txt ljud/X` (`--om s3-2` gör om en replik, `--torrt` visar bara). Nyckeln ligger i `.env.local`, aldrig i chatten eller repot. En replik i taget.
- **Uttal:** skriv tal och svåra ord som de ska låta i manuset ("åtta tuusen", "nitton-hundra-sextio-nio", "Moona Liisa", "Nobell", "gäst" för jäst, "Kirrunna"). Provlyssna två eller tre varianter av meningar med tal och låt läraren välja. **Undertexten i `SC` ska ha siffror och rätt stavning.**
- **Byts en röstfil: höj `VOICE_VER` i `svarthal.js`.** Nya talfiler kodas 64 kbps mono.
- Texterna tajmas efter rösten (mät med `afinfo`). Filmen väntar in rösten och har en reservutgång så att den aldrig hänger. Saknas en fil visas bara texten.
- **Ljudmatta** väljs med `meta.mat`: `rymd` (standard), `vagor`, `havet`, `vulkan`, `djungel`, `tradgarden`, `klockor`, `slott`. Den sänks medan rösten talar.
- Hastighetsknappen (1× till 2×) delar sparat val med resorna i Människokroppen.
- **Ny film ska in på två ställen:** registret och skriptlistan i `specialare/index.html`, och en rad i `specialare/filmreg.js` (annars länkar Biografen ut i stället för att visa filmen på duken).
- Ny film laddar `filmlib.js` (och `filmfx.js`) före sin egen fil. Testkrokar: `root.__seek(scen,tid)`, `root.__slut()`.

## Instruktionsfilmer utan röst

De korta "🎬 Se hur man gör" i övningarna använder `film.js` (`MPFilm`) och en annan mall: se `docs/design.md`.

## Läget

Alla lektioner har film utom Svarta hål, som har sin egen i Rymdlabbet. Lyfta till den nya grafiknivån: GPS, Vaccin, Mikrochipet, Bitcoin, Smaklökarna, Penicillinet, Marie Curie, Så jäser brödet, Himlen, Mammuten, Krakatau, Nobelpriset, Webb, Raket, Mars, Kontinenterna. Kvar att lyfta: Spinnande och Bermuda.

## Borttaget med flit (bygg inte igen)

Alla filmklipp som jag valt utan att någon sett dem. Webbläsarens röst och Pipers röst som berättarröst. Det gamla Zooma ut-läget och En stjärnas liv-läget i Rymdlabbet. Sex foton i Hitta djuret (för lätta). Texten om förebilden på svarta hål-filmens slutbild.
