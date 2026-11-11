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

- **Bonusläge, inte en ersättning för startsidan.** Huvudön är en platt hub; varje ämne har en egen ö (`PARKER`): Matte, Svenska, Rymdlabbet (ett klot med högre hopp), SO, Spel, Kroppen, Fler ämnen, Extra och Biografen (Specialare).
- **Varje ö ska ha en egen form eller byggnad, en egen sak man gör och egen natur och egna uppdrag.** Öarna får inte likna varandra eller huvudön. Sakerna man samlar ser ut som ämnet, inte bara bollar.
- **Belöningar stannar i världen** (prydnader på huvudön). Mynt och riktiga stjärnor rörs inte. Biljetter som krav för åkturer valdes bort.
- Epoker och platser som inte är övningar är skyltar, inte portaler.
- Platsen sparas vid varje portal (`mp-varlden-pos`), så man kommer tillbaka framför samma portal. Sidhuvudet visar 🏝️ Världen när man kommit därifrån.
- "🐢 Lågt läge" slås på av sig självt på svaga enheter. Inga skuggor.
- Test: `__varlden` och `window.__oversikt=true` ger översiktskamera. Kontrollera att portaler och föremål ligger innanför kusten.

## Väntar

- Egna 3D-modeller (Blender, `.glb`), riktiga organmodeller i Kroppen-ön.
- Bildkort-rader på första sidan (Fortsätt där du var, Prova något nytt).
