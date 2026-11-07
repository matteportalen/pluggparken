# Vålnaden och det lagade klockverket

## Spelbar kedja
Vålnaden vid första elden minns hur staden stannade och ger ledtrådar till tre föremål. Pendelns hjärta ligger på urmakarhusets mellersta bjälke. Tidens sigill kräver ett extra hopp till en hög avsats över taken. Efter Spegelriddaren kan spelaren gå ner i De tidlösa valven, ett separat rum med fyra höjdsteg, småfiender, en andra möjlighet att tala med vålnaden och motvikten på den höga avsatsen. Saknade delar visas om spelaren når klockverket för tidigt.

Klockan startas genom tre sparade reparationssteg: pendeln, motvikten och sigillet. En talring kan vridas genom att dra i urtavlans kant eller med plus/minus; talet kan även skrivas med tangentbord. Uttryckets två sidor ska väga lika innan handtaget dras. Uppgifterna följer valt matteområde. Felsvar behåller steget och visar en ledtråd. Redan lagade fästen sparas när pusslet lämnas. Först tredje rätta inställningen väcker tiden, visarna och gångbron. En kort stilla sekvens och vålnadens sista minnesfragment avslutar uppdraget i världen, utan en vanlig slutruta.

## Bildfamilj och produktion
Alla fyra nya bilder skapades med **inbyggda OpenAI image_gen** och kopierades oförändrade till denna mapp. Native alfa verifieras för dial/ghost. Ursprung: Codex generated_images/01a1ad68-5c6a-7ec2-97c1-707715721bda.

| Fil | Källa | Användning |
| --- | --- | --- |
| clock-dial-v3.png | exec-f707a1ef-6756-4a05-854a-2cdf9eaa5339.png | Rund urtavla i mörk sten/järn med nativ alfa. Monteras i bakgrundstornet och mekaniken. Visarna animeras separat. |
| oracle-table-v1.png | exec-68e97cba-dda6-43b4-b21c-35e07f012fe0.png | Opak närbild av spåkvinnan och hennes slitna bord. Kort och svar ligger som interaktiva papper/benbrickor i själva scenen. |
| clock-keeper-v1.png | exec-7e4afec6-f266-4d3f-a2a6-64dc406dec5c.png | Nativ transparent vålnad, placeras i världen med diskret genomskinlighet och rörelse. |
| crypt-landscape-v2.png | exec-7483b806-9b3a-4b35-b181-4ca9da92d0ee.png | Opak bakgrund till det spelbara valvrummet, med separata kollisionsavsatser. |

## Promptuppsättning
- **Urtavla:** Production isolated front-orthographic perfect-circle cathedral clock dial for a sombre soulslike medieval game. Weathered dark slate/tarnished iron, engraved aged-ivory Roman I–XII, fine ticks, chipped stone surround, corrosion/rain streaks. Readable authored material detail. No hands; central spindle only, hands animated in game. Charcoal/slate palette. No gears, steampunk, gold/neon/cartoon, background/UI/extra words. Square native transparent canvas, complete round silhouette.
- **Spåbord:** Wide 16:9 actual encounter background, player's seated viewpoint slightly down over a battered wooden table. Mysterious hooded aged seer on LEFT, pale cheek/fingers, worn black-violet shawl, one guttering candle, cold shadows and restrained dirty amber. Dark burgundy threadbare cloth and worn wood fill lower two thirds. Empty areas center-right/lower table for code-native cards. No cards/text/UI/borders/crystal ball/gold stars/cozy grandmother. Detailed sombre HD2D, plausible medieval materials.
- **Vålnad:** Production transparent full-standing NPC: ancient clock keeper trapped outside time, gaunt bowed human facing left, tattered medieval robe and mantle, pale sorrowful face, empty hand extended, frayed hem and thin mist. Desaturated silver/slate, dark eyes, melancholy not gore, HD2D with crisp silhouette at 110px. No scenery/neon/orb/magic circles/crown/weapons/text/cartoon/extra people.
- **Valv:** Wide 2:1 side-view production backdrop. Drowned clock keeper's undercroft beneath a gothic canal city: damp massive stone vaults, plausible rusty counterweight shafts and chain hoists, black water, broken masonry, three depth layers, cold light shaft and one dim lamp. Desaturated charcoal/slate HD2D. Dark empty lower third for real platforms. No characters/foreground floor or platforms/decorative gears/steampunk/gold/neon/text/UI/mockup.

## Spåkvinnans gränssnitt
Den tidigare centrerade rutan är ersatt av ett helt bordsperspektiv. Frågan står på det aktuella kortet; svaren är lösa benbrickor på duken. Hennes repliker har ingen panelbakgrund. Riktiga DOM-knappar, fokusfälla, tangentbord och Escape finns kvar. Mobilen använder ett särskilt utsnitt och tätare kortplacering.

## Spelkortet
Som sista ändring byttes Spelhörnans miniatyr till ett ljust, tätt utsnitt kring riddaren i title-landscape-v1.png. Utsnitt och ljusning görs i CSS för just kortet; titelbilden och dess ursprungliga metadata är oförändrade. kort.png används inte längre av Spelhörnans Glödväktaren-kort.

## Sparning och kontroller
Nya per-matteval-fält: ghostMet, timeFragments (pendulum/seal/weight), clockLocks (0–3). Profiler förenar delarna, uppdragsflaggan och högsta antal lagade fästen. Tidigare färdigspelade stadsresor behåller avslutet. Genomspelning verifierar hela kedjan, låsning före saknade delar, fel/rätt inställning, återupptagning, bridge och sparning. Alla fyra matteval testas på mobil. Bildplaceringarna granskas i riktig spelvy.
