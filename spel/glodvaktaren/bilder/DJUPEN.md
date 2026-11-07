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
