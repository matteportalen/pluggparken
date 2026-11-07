# Affären – målad bildfamilj, 7 november 2026

Skapad med Codex inbyggda `image_gen` (inte API/CLI). Egen genererad spelgrafik, inga externa bildanrop under spel. Ursprungliga PNG-resultat och eventuell inbäddad proveniens bevaras i Codex bildmapp. Levererade WebP är deterministiska kodningar med Pillow, kvalitet 92, metod 6, oförändrade dimensioner och alfakanal; tillgänglig ICC/XMP förs vidare. Totalt cirka 2,6 MB för hela familjen. Tidigare Kenney-atlas `varor.png` och dess CC0-licens ligger kvar som historisk källa, men används inte av den nya spelvyn.

## Teknisk ram och vald riktning

Egen HTML/CSS/JS-motor. Frontvy, gouache med varma bläckkonturer, slitna gröna träytor, ockra, gräddvitt och terrakotta. Lokalen är ett bildlager; hyllor, valbar tapet/markis, målade varor, kassa, personer, dekorationer och prislappar är separata lager. Priser, uppgifter och namn är riktig text. Djur läses runt 80–120 px och varor runt 34–64 px. Ingen bild är en förbakad spelmockup.

Lokalbilden valdes som visuell referens innan resterande familj producerades. Övriga fyra genereringar använde lokalbilden som referens. Granskade i faktiskt kundärende, vid skanning och summauppgift, på dator och mobil; atlasarna har äkta varierande alfa och samtliga celler går att nå i spelet. Kundernas ursprungliga klädaccessoarer ersätts visuellt av målade grundgestalter; lagrade relationer, namn, repliker, djurval och elevens garderob ändras inte.

| Levererad fil | Faktisk storlek | Funktion/pivot | Ursprunglig PNG i Codex bildmapp |
|---|---|---|---|
| lokal-v1.webp | 1536×1024, opak | Skalbar bakgrund, mittpunkt | exec-adc0e615-3d3e-4b6d-a5d0-b01f542daf65.png |
| varor-malade-v1.webp | 1586×992, alfa | 8×5 atlas, 34 varor, centrum per cell | exec-89a30f0d-b6bd-4c98-bcec-b4eed601bf1d.png |
| disk-v1.webp | 2172×724, alfa | Separat disk, förankrad vid scenens botten | exec-b5d5fc95-11fa-4dca-8a1f-e6261dd3e57f.png |
| skylt-v1.webp | 2172×724, alfa | Titelskylt, centrerad, tillgänglig H1-text under bildlagret | exec-8011f43b-ec85-457c-9df3-2786e802a9f6.png |
| kunder-v1.webp | 1448×1086, alfa | 4×3 atlas, fotpunkt nere i varje ruta | exec-92fe0b3d-5e3a-4fcc-9ba8-bdaa22353472.png |

Codex originalkatalog för denna produktion: `/Users/jesper/.codex/generated_images/01a1ad68-5c6a-7ec2-97c1-707715721bda/`. Inga original raderades. Referenser i spelet går enbart till projektets WebP-filer.

## Produktionspromptar

### Lokal (ny bild)

Production game background for Swedish children's shop game AFFÄREN. Landscape 1536x1024. Hand painted gouache storybook game art with tactile wood grain, confident warm ink edges, forest green wooden walls, cream plaster, amber afternoon window light. Straight front view of small neighborhood shop INTERIOR. Empty pale plaster wall across central 75 percent upper area where movable shelves will be overlaid in game. Tall narrow glazed entrance door at far left, little window far right, worn green wood wall panels. Bottom 35 percent warm terracotta tiled floor. NO counter, NO shelves, NO merchandise, NO characters, NO letters or text. Charming crafted game environment not a web mockup. Rich material personality, clear restrained composition, no interface. This is actual playable background not concept presentation.

### Varuatlas (lokalen som stilreferens; transparent)

Reference is the approved gouache game world. Create a production sprite atlas matching its brushwork, amber highlights and confident dark ink edges, recognizable at 48px. Transparent background. EXACT grid 8 columns x 5 rows, equally sized square cells, canvas aspect 8:5. Each object fully contained within central 78% of its cell, individually isolated, no gridlines, NO shadows outside cells, NO text. Read left to right top to bottom. Row1: red apple, yellow banana, orange fruit, green pear, yellow lemon, orange carrot, single egg, wedge of cheese. Row2: strawberry, pair cherries, purple grapes, watermelon wedge, croissant, whole bread loaf, blueberry muffin, pink cupcake. Row3: ring donut, round cookie, birthday cake, waffle, red ice lolly on stick, glass sundae, icecream in paper cup, wrapped chocolate bar. Row4: single chocolate square, round spiral lollipop, soda can, glass soda bottle, milk carton, honey jar, hotdog in bun, sandwich. Row5: pizza slice, stack pancakes, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY. 34 unique food objects total. Hand painted charming Swedish shop game, consistent perspective slight three-quarter view. All five rows exactly equal height and all eight columns exactly equal width. No captions or packaging lettering.

### Disk (lokalen som stilreferens; transparent)

Create one transparent game environment prop matching reference's tactile hand painted gouache style: a wide wooden shop checkout counter viewed straight from front, dark forest green painted front with raised wood panels worn at edges, polished honey-colored oak countertop visible slightly from above. Counter fills nearly entire landscape 3:1 canvas, very long horizontal counter, no scenery no floor no products no register no text no characters. Top surface occupies top20 percent, front80 percent. Strong silhouette soft illustrated material detail. Actual movable foreground game asset. Transparent background.

### Titelskylt (lokalen som stilreferens; transparent)

Production transparent title logo matching hand painted warm gouache Swedish neighborhood shop game. One old forest green wooden hanging shop sign, warm cream and ochre ornamental painted lettering reading EXACTLY 'Affären'. Large personality, beautifully hand lettered A and clear umlaut over ä. No other words. Leaf sprig at each end, tiny apple painted below, two brass hooks at top. Horizontal landscape 3:1 composition, only sign on transparent background, no world or mockup, fills 90% width. Worn painted wood, welcoming, crafted videogame title art.

### Kundatlas (lokalen som stilreferens; transparent)

Production character sprite atlas for this painted gouache shop game. Transparent canvas exact4 columns3 rows equal square cells, no gridlines. Twelve charming individual anthropomorphic neighborhood animal customers facing forward, full body, big expressive faces, small clothed bodies and feet, hands at sides, each centered in its cell with generous 12percent margin. Hand painted fur, dark ink edges, warm amber light, subdued forestgreen rust mustard cream clothing, cohesive with reference room. Row1 left to right: round brown owl in knitted vest; orange tabby cat in green coat; white rabbit in ochre cardigan; orange fox in brown coat. Row2: black white panda in green pullover; black white penguin in red scarf; friendly little tin robot with rivets and amber eyes; small green dragon in tan vest. Row3: white unicorn with muted pink mane in green vest; green frog in brown overalls; brown floppy eared dog in blue workcoat; brown bear in tan cardigan. All isolated, no scenery, no props, no hats, no glasses, no text. Preserve clean silhouette readable at100px. Exactly twelve characters.

## Köpbar inredning och kassa – komplettering

Bildriktningen förblir den tidigare målade butiken. `inredning/` innehåller 19 beskurna, transparenta WebP-föremål: radio, kaffe, tv, nalle, blommor, vaxt, hangare, lampa, pall, hogtalare, flakt, fem kassafärger, disco, lampor och skylt. Inga nya köp-ID:n eller färgfilter: de fem kassorna är separata bilder. Bordets föremål och kassan förankras i nederkant. Takföremål förankras upptill, golvföremål nedtill. Storlekar cirka 36–100 px i spel; source-sprites normaliserades till högst 320×360 px. Alla filnamn slutar `-v1.webp`.

Inbyggd `image_gen` användes, med `lokal-v1.webp` som stilreferens. Första två atlasresultaten hade en synlig bakgrund och grå rutlinjer trots begärd transparens; de används inte. Bakgrunden togs bort i två efterföljande bildredigeringar med inbyggda verktyget. Slutresultatens alfakanal verifierades ha både 0 och opaka pixlar. Vanlig Pillow-normalisering delade atlasarna i 4×3 respektive 4×2 celler, beskärde tomma kanter till alfa >24, skalade proportionellt och sparade WebP kvalitet 94/metod 4. Ingen bakgrundsborttagning gjordes med kod. Alla original finns kvar i den tidigare angivna Codex-katalogen.

Källor: `exec-5a802fa8-49d7-4c39-ae31-bbcf1e097633.png` → godkänt alfaredigerat `exec-957e7278-7815-4427-a29c-b66dc4109a46.png`; `exec-79d87cc1-2107-4469-a080-19a143bdc9ac.png` → godkänt alfaredigerat `exec-b1a5db1c-4f9d-43e4-9152-6a73de30c769.png`. Första atlasens gröna extrakassa används inte; den andra atlasens fem färger används. Bilddelarnas faktiska dimensioner och SHA-256 finns i `inredning/manifest.json`.

### Prompt: möbler

Production sprite atlas of shop furniture matching reference gouache brushwork, worn forest green wood, amber brass, dark warm outlines. Transparent background EXACT 4 columns x3 rows equal square cells. Each object centered fully isolated with generous 12percent margin and ALL object feet resting at 88percent cell height. Front view slight visible top, coherent game props. Row1: vintage forestgreen cash register with blank dark rectangular display top center and brass keys below, wooden tabletop radio, coffee maker with glass pot, small wooden vintage television blank dark screen. Row2: seated teddy bear, vase of flowers, terracotta potted leafy plant, wooden coat stand with scarf. Row3: tall floor lamp fabric shade, wooden bar stool, single wooden speaker cabinet, ceiling fan with three blades viewed from below with short hanging stem. No text no digits no floor no scenery no shadows outside individual cells. All12 separate props clear at60-100px. Cash register must have a wide blank dark display at x25..75percent y20..35percent of its own cell, no symbols. Maintain hand painted tactile material detail and not flat vector icons.

### Prompt: kassa och takföremål

Production sprite atlas matching warm painted gouache forestgreen wooden shop reference. Transparent EXACT4columns2rows equal square cells, isolated centered objects within generous12percent margins. All object bases at90percent cellheight. Row1 four IDENTICAL vintage cash registers, straight frontal view, same shape, brass keys and black blank rectangular display at x25-75percent y20-35percent of each cell. Their painted metal body colors respectively: slate gray, rose pink, cobalt blue, antique gold. Row2: same cash register with clearly rainbow striped body, a hanging silver disco mirror ball on short cord, a curved festive strand of eight glowing amber colored bulbs, an empty rectangular darkgreen wooden shop name plaque on two small brass hooks. No letters no digits no text on anything. NO scenery NO ground plane NO cast shadows outside cells. Tactile brushwork, worn painted edges, coherent warm brass highlights, actual game sprites readable at80px. Each register occupies same position with feet at90percent cell, top15percent. Keep cells strictly aligned.

### Prompt: alfaredigering, en per atlas

Precise background extraction edit: Remove ALL white paper background and ALL gray gridlines from this sprite sheet, make those areas genuinely fully transparent alpha0. Preserve the twelve [andra atlasen: eight] illustrated props in exactly their current positions, shapes, colors and sizes. Keep original4column3row [andra atlasen: original4column2row] layout and canvas ratio. No checkerboard drawn, no haze, no paper rectangle, no new objects. Only the12 [andra atlasen: 8] individual objects on fully transparent empty space. Need usable game cutouts with clean alpha silhouettes.

### Varubildernas fotpunkter

`varor/0.webp` till `varor/33.webp` är normaliserade utsnitt ur befintliga `varor-malade-v1.webp`, i samma ID-ordning som VAROR. Ursprunglig atlas ligger kvar. Varje 8×5-cell beskärs till alfakanalens innehåll (>32), sparas proportionellt som WebP kvalitet 94/metod 4 och visas med `contain`/`center bottom`. Ingen nygenerering eller kreativ bildredigering, endast utskärning av spelatlas. Detta tar bort varierande tomrum under maten så att högarna får en verklig fotpunkt mot hyllan.
