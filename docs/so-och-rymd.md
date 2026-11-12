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
- Frågan står stor överst och sitter kvar när man skrollar. Kartan till vänster, panelen till höger. Hela Sverige ska synas utan att skrolla på mobil.
- Uppläsning bara med 🔊.

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
