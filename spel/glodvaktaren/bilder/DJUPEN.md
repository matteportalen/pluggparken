# De glömda djupen — bildmanifest

2026-11-07. Läs `../KVALITET.md` före vidare utveckling.

Samtliga PNG-filer i nedanstående familj är originalproduktion med OpenAI ImageGen för Glödväktaren. Nio opaka rumsbilder, två atlaser med nativ alfa. Exporterna har kopierats med ursprunglig inbäddad metadata från Codex generated_images; inga genererade bilder laddas från andra domäner under spel.

Gemensam riktning: painterly HD-2D, sliten gotisk sten, dämpad blåviolett/teal, svart vatten, små bärnstenslyktor. Den befintliga `crypt-landscape-v2.png` var stilreferens för rummen. Tom mörk nedre tredjedel reserverad för verkliga plattformar och figurer; inga HUD-element eller genererade bokstäver. Spelets ursprungliga silverriddare och pixelfx-animationer används oförändrade.

| Fil | Motiv och spelroll |
| --- | --- |
| depth-shaft-v1.png | Hisschakt med kedjor och ljus långt ovanifrån |
| depth-hall-v1.png | Motviktshall med massiva hängande vikter |
| depth-pump-v1.png | Gamla kopparledningar, trasigt vattenrör och pump |
| depth-archive-v1.png | Dränkt arkiv, bokhyllor och förseglad nisch |
| depth-quarters-v1.png | Övergivna bostäder, slitna tyger, stol och liten kallnande kamin |
| depth-gallery-v1.png | Trasiga stenbroar över ett djupt schakt |
| depth-cistern-v1.png | Tre slussmynningar, vattenmätare och svart vattenspegel |
| depth-prison-v1.png | Kedjekammare med en förseglad relief i bakväggen |
| depth-heart-v1.png | Hjärtvalvets bassäng och stilla silverljus |
| depth-characters-v1.png | 3 kolumner: slussvakten, lärlingen Iri, den kedjade väktaren |
| depth-machines-v1.png | 2×2: motviktsvåg, vattenpump, tavlealtare, brovinsch |

Atlasers objekt beskärs en gång vid laddning mot alfa över 40. Ursprungliga proportioner bevaras; fotpunkter förankras vid faktisk mark/plattform. NPC-höjder 145 px, kedjad väktare 235 px; apparater 130–150 px. Ingångarnas tidigare artwork återanvänds. Mekanismernas förändringar (vatten, hiss, öppna galler, gångbro och kedjor) ritas separat så de följer det verkliga pusseltillståndet.

## Produktionsprompter

Rumsprompter: “Production in-game 2D side-scrolling background for Glödväktaren, The Forgotten Depths. Match reference's painterly HD-2D gothic soulslike masonry, desaturated blue-violet/teal grey, black water, rare tiny amber lights. Landscape 2:1, side elevation stage view. Beautiful architecture in upper two thirds, empty dark lower third for playable foreground. No characters, gameplay foreground floor/platforms, text/UI or ornamental gear clutter.” Varje motiv följer tabellens rumsbeskrivning.

Karaktärer: “Production transparent sprite atlas, three full-body characters in equal columns, front/side three-quarter stage view, feet aligned, uncropped, transparent padding. Ancient gaunt sluice keeper in patched cloak with keys and dim lantern; young adult former apprentice in ash-grey work coat with hood and copper tool; enormous kneeling stone-armored guardian with sealed helmet and heavy chains. Somber painterly HD-2D, no scenery, labels, floor or cartoon cuteness.”

Mekanismer: “Production transparent foreground props atlas, strict 2×2 grid, equal cells, front orthographic side elevation. Heavy stone/iron balance with two empty pans; sluice pump with copper handwheel and glass gauges; archive altar with three blank tablets; bridge winch with long handle and chain. Blue-violet granite, tarnished iron/copper, tiny amber accents. No generated text, people, scenery or ornamental gears.”

## Provspelning

Se `skript/test-glodvaktaren-djupen*.cjs` och `skript/test-glodvaktaren-djupen-data.mjs`. Hela rumsgrafen, klättervägen, fel svar, fysiska broytan, NPC-ledtrådar, smygning, sista kedjan, slutet, omladdning och retur till tidigare kapitel kontrolleras. Mekanismvyer granskas i 390 px stående mobil, 844×390 liggande och dator.

## Innehållspass efter provspelning (7 november)

Ytterligare sex lokala ImageGen-original med bevarad metadata och nativ alfa:

| Fil | Produktion och användning |
| --- | --- |
| depth-enemies-v1.png | 3×2 atlas: rostkrabba och skugglarv, vardera patrull, förvarning och anfall. Samma figur/proportioner per rad, sidovy åt vänster; 48–55 px i spelet. |
| depth-chain-links-v1.png | 2×2: framvänd oval järnlänk, sidovänd länk, bruten länk och boja. Slitet mörkt järn med rost och ljusa nötta kanter. 24 px länkar repeteras längs hängande kedjor; brott ger fallande länkar. Även sigillvyn använder denna artwork. |
| depth-guardian-free-v1.png | Den befintliga kedjade väktaren som referens, samma hjälm/rustning, nu stående med fria armar och korta brutna bojor; 270 px. Inga nya personer från referensatlasen. |
| depth-heart-pump-v1.png | Monumental hjärtpump i granit/koppar/järn med mörk tryckkammare, två kolvar, tre röranslutningar och utlopp; 300 px. Vatten, ljus och kolvrörelse läggs ovanpå i spelet. |
| depth-loot-v1.png | 2×2: samma kista stängd/öppen, glaslykta och bryne. Blanketter, text och UI uteslutna. |
| depth-fountain-v1.png | Stadens återställda tvådelade stenfontän, mörk granit och ärgad koppar, utan inritat vatten. Spelet animerar strålen efter finalen; 130 px. |

Gemensamma promptkrav: production transparent sprites, painterly HD-2D dark gothic soulslike, muted teal/violet grey, pitted rust and worn metal bevels, readable silhouettes, full uncropped objects in equal atlas cells with alpha padding, no scenery/floor/text/UI/cuteness/ornamental gear clutter. Kedjelänkarnas öppningar ska också vara transparenta. Fiendeatlasen har två arter och tre tydliga poser. Den fria väktaren genererades med `depth-characters-v1.png` som identitetsreferens.

`djupen-liv.js` läser varje cellgräns mot alfa vid laddning. Fiendeposer delar radens höjdskala för att kroppen inte ska krympa när klorna höjs. Renderade fotpunkter, patrullgränser och skattpositioner följer de verkliga plattformarna. Minskad rörelse tar bort fallande kedjefragment/partiklar och rörliga kolvar.
