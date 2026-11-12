# SO och Rymdlabbet

_Det som gäller nu för Rymdlabbet, Solsystemet i 3D med resan ut i universum och in till Stockholm, Sverigekartan, Ordgömman, Vikingatiden och Demokrati. Hur varje del byggdes, kameramatematik, bildkällor och röstfiler står i `docs/historik/so-och-rymd.md` (sök där med `grep -n "ord" docs/historik/so-och-rymd.md`, läs inte hela)._

## Var ligger vad

| Mapp | Innehåll | localStorage-nyckel |
| --- | --- | --- |
| `ovriga/rymdlabbet/` | Rymdlabbet: menyn och alla lägen (Dag och natt, Årstiderna, Förmörkelser, Hur stora, Hur långt bort, Ett år, Väg dig och hoppa, Jättarna, Svarta hål, Stjärnhimlen) och filmerna. `jattar3d.js` ritar Jättarna i 3D. | – (inga stjärnor) |
| `ovriga/solsystemet/` | Solsystemet i 3D (three.js ur `lib/three/`): översikt, planetvy, jordvy med månens faser, universumresan. `stockholm.js` = kartvyn. `foton/` = landmärkenas bilder. | – |
| `ovriga/vintergatan/` | Bara en omdirigering till `solsystemet/#vintergatan`. | – |
| `ovriga/sverigekartan/` | Sverigekartan: landskap, städer, älvar, Sätt nålen, två prov | `mattespel-sverigekartan-v1` |
| `ovriga/ordgomma/` | Ordgömman (hör till Svenska) | `mattespel-ordgomma-v1` |
| `vikingatiden/` | Vikingatiden: Myt eller sant och Runskrivaren | `mattespel-vikingatiden-v1` |
| `demokrati/` | Demokrati: Klassrådet, Valet, Rättigheter | `mattespel-demokrati-v1` |
| `so/index.html` | Ämnessidan SO. Europa, Världen och Tidslinjen står i `docs/ovriga-amnen.md`. | – |

Röst till resorna: `ljud/resa/` (manus `manus/resa-manus.txt`) och `ljud/jattar/` (manus `manus/jattar-manus.txt`), rösten Paul Axel. Filmerna står i `docs/specialare-filmer.md`.

## Rymdlabbet

- **En interaktiv lärmiljö, inga poäng, pass eller uppdrag** (rymdpass och rymduppdrag valdes bort).
- **Får prioritera dator.** Jättarna och Solsystemet har liggande läge på mobil och ett tips om att vrida mobilen.
- **Mörk, filmisk och museal stil:** Inter och Source Serif 4 (inte Baloo 2), menykort som plaketter med riktiga foton, glasknappar, guldsiffror. Sidan laddar inte `tema.js`.
- Varje läge har en förklaring med 🔊 som ändras efter vad eleven gör.
- **Säg öppet när något inte är i skala eller är en modell** (ℹ️-texterna gör det).
- Fart visas som "1 sekund = 12 dygn", aldrig "Normalt".
- En ny skärm (`.screen` med id) får en djuplänk av sig själv. Lägg också portalen i `PARKER.rymdlabbet` i `varlden/index.html`.
- I canvas: skriv `"Baloo 2"` med citattecken i `ctx.font`, annars ignoreras hela inställningen.

## Solsystemet i 3D och resan

- **Allt hänger ihop sömlöst:** jordvyn ↔ kartan över Stockholm, översikten ↔ universumresan. Ett extra scrollsteg eller nyp förbi gränsen tar en vidare. Inga hopp.
- **Mät kameran efter varje ändring av kameralogiken:** en simulerad svepning ska ge högst några procent av kameraavståndet per bildruta. Kamerans mål är en viktad blandning av landmärken i närheten, inte "närmast vinner".
- **Guidad resa** börjar vid Smedslättsskolan i Alvik och berättar sig utåt till universums kant. Den startar alltid från början; prickarna på reglaget startar från vald station. Pausa, ⏭ Nästa del och hastighet (delas med filmerna, `pluggparken-resa-fart`).
- Är sajtens ljud av går resan på timer. Saknas en röstfil blir det tystnad vid det steget.
- **Byts en röstfil: höj `?v=`** i `tourVoice` (index.html), `tAudio` (stockholm.js) eller `gVoice` (Jättarna). Höj också `?v=` på `stockholm.js` när den filen ändras.
- **Solen ska försvinna i Vintergatan**, bara "Du är här" visar var den är.
- Landmärken visas diskret: en mjuk glöd och ett glaskort med foto, ingen ring eller pil över bilden. Knappen Namn stänger av både namn och foton.
- **Bara fria bildlicenser som också tillåter betalande sajt** (PD, CC BY, CC BY-SA; aldrig CC BY-NC). Bilder som inte är foton märks "konstnärlig bild" eller "beräknad karta".
- **Kartan över Stockholm** (MapLibre, satellitbilder från EOX 2016, karta från OpenFreeMap) hämtas externt med flit. Använd bara EOX-året 2016 (senare år är CC BY-NC-SA). Källorna står synligt i vyn.
- Reglagen går åt samma håll överallt: inzoomat till vänster, utzoomat till höger.
- Faktakort har ✕ och stängs med Escape utan att kameran flyttas.

## Sverigekartan

- Målningar för djur och blommor (inte emojis eller foton), källförteckning på sidan.
- **Sätt nålen:** inom 80 km är bra (lärarens gräns).
- Proven: alla landskap eller alla städer en gång, stjärna vid minst 90 %.
- Ett landskap färgas efter två rätt i rad och kan blekna igen vid fel.
- Frågan står stor överst och sitter kvar när man skrollar. Kartan till vänster, panelen till höger. Hela Sverige ska synas utan att skrolla på mobil. **Hela Sverige ska också synas på bred pc-skärm** (nov 2026: i Hitta landskapet klipptes Skåne av vid 1200 × 760, eftersom `fitBox` krympte vyn när den blev bredare än naturkartan). Vyn krymps aldrig; bildens högerkant ligger kvar mot kanten och havet till vänster förlängs med en spegling av bilden i `drawMap`. Kontrollerat i 130 kombinationer av skärmstorlek, landsdel och spelläge.
- Uppläsning bara med 🔊.

## Rymdlyftet (pågår, nov 2026): filmen och 3D-modellen efter Vintergatan
Lärarens önskan: "flaggskepp" av **filmen Zooma ut** (scenerna 6–9: Vintergatan, Andromeda, Laniakea, det kosmiska nätet) och av **3D-modellens yttre del** (Vintergatan → Lokala gruppen → Laniakea → nätet → universums kant). Förut: 2D-canvas med några hundra prickar och streck.
- **Plan:** en gemensam fil `kosmos.js` (`MPKosmos`) med generatorer (spiralgalax med 3D-skiva och spiralarmar, kosmiskt nät av noder och trådar, Laniakea med strömlinjer mot den stora attraktorn) och en liten WebGL-motor (punktsprites med additiv blandning, pulser som rör sig längs trådar och strömlinjer i shadern). Filmens scener 6–9 ritar ur den och lägger sina etiketter ovanpå (`proj()` ger skärmpositioner). 3D-modellen (three.js) återanvänder generatorerna för sina yttre nivåer.
- **Rör inte** undertexternas tider, scenernas längd (17 s) eller texterna: röstfilerna i `ljud/zoom/` hör ihop med dem.
- Allt efter Vintergatan är **beräknade modeller, inte foton**. Det ska synas.
- Testa med `__seek(scen, sekund)` på filmens rot (`svarthal.js`) och skärmbilder i 390 × 844 och 1200 × 760. Håll punktantalet nere (skol-Chromebooks): det finns en `kvalitet`-nivå i `kosmos.js`.
- **Status (12 nov 2026): gjort.** Filmens scener 6–9 ritas ur `kosmos.js` (WebGL, 120 000–170 000 punkter per scen, spiralgalaxer med rosa stjärnbildningsområden, Andromeda och grannar, Laniakea med strömlinjer och ljuspulser mot Den stora attraktorn, nätet med böjda trådar). Zoomövergångarna är kamerarörelser, inte uppskalade sprites; etiketter visas först när kameran är framme. Utan WebGL används de gamla 2D-ritningarna (`LVold`). 3D-modellens Laniakea och kosmiska nät (`buildGalaxy` i `ovriga/solsystemet/index.html`) använder samma generatorer via `MPKosmos.data()`; äldre enkla versionen ligger kvar som reserv om `kosmos.js` saknas. `kosmos.kvalitet = .5` på svaga enheter (`low`).
- **Inte gjort / inte provat:** Vintergatan, Lokala gruppen och universums kant i 3D-modellen är orörda (de var redan bra). Inte provat på gammal iPad eller Chromebook (punktantal och tid per bildruta), inte lyssnat på rösten mot de nya bilderna. Strömlinjerna i 3D-modellen syns svagt; pulsstyrkan i shadern (`PULS`) kan höjas.
- Skärmbildstest: `__seek(scen, sekund)` på filmens rot, `#gZoom` (0–1000) i 3D-modellen.

## Ordgömman

- Varje ordgömma genereras, aldrig samma. **Inga ord baklänges**, ingen nivåväljare.
- Kontroll: varje ord finns exakt en gång, inga ord inuti andra, inga fula ord i utfyllnaden.
- Stjärna per tema bara utan tips.

## Vikingatiden och Demokrati

- **Vikingatiden** har Myt eller sant och Runskrivaren (skriv ett namn i runor, rista, skriv ut). Runskrivaren ger inga stjärnor. Utforska med bilder är borttaget; i stället en länk till vikingafilmen i Specialare. Bildkällorna står i historikfilen och under varje bild.
- **Demokrati** (omgjord nov 2026, lärarens krav: bättre men fortfarande individuell, man ska kunna jobba själv). Frågeövningen är borta. Tre nivåer: **Klassrådet** (eleven röstar själv med sitt djur, räknar klassens röster, pekar ut vinnaren och avgör om det blev majoritet), **Valet** (stegen i vallokalen i rätt ordning, vem som får rösta, dela ut tio platser efter rösterna, nästa valår, vem gör vad) och **Rättigheter** (rättighet eller önskan, demokrati eller inte, para ihop begrepp).
- Vinnaren i klassrådet leder alltid med minst två röster, så att elevens egen röst aldrig ger oavgjort. Majoritet räknas efter elevens röst; "precis hälften" är inte majoritet och förklaras så.
- Partierna är påhittade (Äppelpartiet, Bollpartiet, Stjärnpartiet). **Inga riktiga partier eller politiker.** Fakta som används: rösträtt vid 18 år senast på valdagen, val vart fjärde år, riksdagen bestämmer lagarna, regeringen styr landet, statsministern leder regeringen, kungen är statschef.
- Fler frågeövningar ur den gamla frågemotorn byggs inte.

## Borttaget med flit (bygg inte igen)

Sveriges landskap (frågeövning), Raketbygget och Månbasen. Det gamla Zooma ut-läget och En stjärnas liv-läget (ersatta av filmer). Kortet "Från solsystemet till Vintergatan" i Rymdlabbet. Supernovans ljud. Gamla stan som start för resan. Lund bland städerna.

## Väntar

- SO: Hur styrs Sverige? och fler interaktiva övningar.
- Inte testat: mobil och äldre Chromebooks för universumresan och Jättarna i 3D, riktig röst i resorna.
