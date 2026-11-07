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
