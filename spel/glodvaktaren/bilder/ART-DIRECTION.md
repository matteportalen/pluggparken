# Glödväktaren – spelmiljöer, 6 november 2026

## Visuell riktning
En sagoskog i skymning: teal, blåviolett och mossgrönt, med varmt bärnstensljus som visar trygga platser och mål. Stor arkitektur och gamla träd ger skala; förgrunden måste vara läsbar för en yngre spelare. Silhuetter, ljus och lager prioriteras framför ett strikt pixelrutnät. Den ursprungliga silverriddaren och pixelfx-animationerna behålls.

Bilderna är produktionsmaterial i själva spelet. `drawWorldBackground` ritar skog och berg med parallax, gruva och smedja i rummets koordinater. Stugan är ett separat transparent objekt. Verkliga kollisionsytor, grenar, stenavsatser, förstörbara objekt, fiender och fynd ritas ovanpå och följer spelets fysik. Bakgrundens avlägsna broar och arkitektur är kulisser; spelbara plattformar har tydliga belysta ovansidor.

## Manifest och ursprung
Alla fem PNG-filer genererades med OpenAI image_gen för projektet. De levereras lokalt, utan externa bildanrop. Bredbildsbakgrunder är opaka; stugan har nativ alfakanal, inte ett målat schackmönster. Ingen bild innehåller speltext eller HUD.

| Fil | Användning | Transparens |
| --- | --- | --- |
| forest-landscape-v2.png | Skog, by och ruiner; referens för familjen | Nej |
| pass-landscape-v2.png | Bergspasset, avlägsna toppar och observatorium | Nej |
| mine-landscape-v2.png | Spelbart gruvrum med järn, fiender och tunnel | Nej |
| forge-landscape-v2.png | Smedjans spelbara interiör | Nej |
| forge-exterior-v2.png | Separat stuga vid ingången till smedjan | Ja |

Originalexporter finns i Codex generated_images/01a1ad68-5c6a-7ec2-97c1-707715721bda. Slutfilerna i denna mapp är kopior av exporterna; stugans genomskinliga marginal beskärs endast vid rendering genom att läsa alfakanalen.

## Produktionsprompter
Följande beskriver promptuppsättningen och dess bindande krav. Skogen användes som bildreferens för de efterföljande tillgångarna.

1. **Skog:** Production 2D side-view game background. Monumental twisted mossy trees, ruined gothic aqueduct, distant bell tower with one tiny warm golden light. Ferns, cyan fireflies, moon shafts. Violet/teal/sage/amber palette, rich 16-bit pixel clusters. Open dark lower third for gameplay. No floor, platforms, UI, lettering or characters.
2. **Berg:** Match the forest reference's twilight fantasy art direction. Wind-carved mountain gorge, layered blue-violet peaks, distant observatory with golden window, arches in cliffs, far rope bridges and ribbons, waterfalls, silver mist, cyan crystals and pines. Premium HD-2D detail, open foreground. No UI, characters or foreground floor.
3. **Stuga:** Match the forest reference. Single transparent front orthographic blacksmith cottage, mossy curved slate roof, stone and timber, central open arched doorway at bottom center, warm amber interior, chimney at right, anvil, wood stack, unlettered sign. No scenery, UI or people. Native transparent background.
4. **Gruva:** Match the forest reference. Ancient crystal mine with roots, underground water, cold cyan rock and warm lanterns, background timber rails and waterfall. Side-view HD-2D, empty dark lower third. No foreground floor, UI or characters.
5. **Smedja:** Match the forest reference. Old workshop viewed from the side, detailed stone/timber walls, cool teal window on left, tools, shields, herbs, chains and copper pots, furnace on RIGHT. Warm/cool contrast, dark lower third. No foreground floor, foreground anvil, UI or people.

## Banornas rytm
Byn är trygg. Första lådan och fladdermusen tränar svärdet. Grenvägen ger höjd och ett valfritt glödfrö. Gruvan erbjuder en annan väg, en järnåder och en gömd järngömma bakom en förstörbar vägg. Lägereldar ger vila mellan strider. Bergspasset växlar mellan klättring, småfiender, utkik och väktare. Matematiska turer stoppar småfiendernas simulering så eleven kan tänka i lugn och ro.

## Visuell QA
Spelbara desktop- och mobilvyer kontrolleras med Chromium/Playwright. Kontrollera bildladdning, alfakanal, dörrens läge, kollisionsytor, pratbubblor, höjdvägar och att HUD inte täcker svaret. Slutlig in-game skärmbild skiljs från conceptbilder.
