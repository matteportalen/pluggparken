# Racerbanans bildproduktion

2026-11-07. Originalbilder framtagna med OpenAI ImageGen för Pluggparken. Inga externa bild- eller ljudanrop görs under spelet. PNG-originalens metadata är bevarade. Vägen, vägmarkeringar, träd, hinder, mynt, kontrollskyltar och HUD ritas i Canvas/CSS.

## Stil och motiv

Gemensam riktning: handmålad arkadracing, petrolblått, varm gräddvit och bränd orange. Tydliga former, lugna ytor för spelobjekten, utan text eller gränssnitt i målningarna.

- `vehicles.png`: transparent atlas med sex fordon i tre kolumner och två rader, vy bakifrån och något ovanifrån. Sportbil, rallybil, klassiker; pickup, formelbil, motorcyklist. Orange lack, mörka däck, svalt glas och god marginal runt varje fordon. Färgvarianter skapas lokalt med Canvas-filter.
- `race.png`: bred kustmiljö med berg, hav, läktare och cypresser. Horisont i övre halvan; lugn nedre halva, inga förgrundsbilar eller vägar.
- `skog.png`: skandinavisk tallskog, morgondimma och granitberg; samma komposition och stil.
- `oken.png`: ökenkanjon med ockra- och terrakottafärgade platåberg; samma komposition och stil.
- `vinter.png`: snöigt bergspass med blå barrskog, blek lavendelhimmel och små varma ljuspunkter; samma komposition och stil.

Originalen behålls även i Codex generated_images. Bilderna ersätter inte de tidigare Kenney-filerna, som finns kvar för äldre kod. Den nya Racerbanan laddar endast sina egna bilder här.

## Titelskärm och depå, 2026-11-07

Två nya ImageGen-original, kopierade med ursprunglig inbäddad metadata från Codex generated_images. Inga externa bildanrop i spelet.

- `title-pit-v1.png`: opak 16:9 målning av en kustdepå i blå skymning. Mörk lugn vänsterhalva för titel och meny, öppen betongyta på höger sida för den separat renderade valda bilen. Belyst bergsväg, hav och kustljus utanför, varm arbetslampa och enstaka verktyg/flagga. Handmålad HD-2D med petrolblått, skiffer och återhållna orange accenter. Promptkrav: inga fordon, människor, texter, logotyper eller UI; en faktisk spelöppning, inte en webbhero.
- `title-logo-v1.png`: nativ alfa. Specialritad motorsporttitel “RACERBANAN”, två sammanhängande rader RACER/BANAN, lutande skulpterad elfenbensmetall, blå stålskugga och små slitna orange kanter. Diskret schackflaggeaccent, utan skyltplatta, bil, extra ord eller bakgrund. Läslig vid 320 px bredd.

Den valda bilen komponeras lokalt på titelskärmen så lack och modell alltid motsvarar depåvalet. Förinställningen syns även i text. Bakgrunden har mycket långsam kamerarörelse; minskad rörelse stänger av den.

Färgerna använder nu HSL-baserad selektiv maskning av originalets orange lack i Canvas. Hela bildens hue-filter har tagits bort. Gula lackens målton är 50°, blå 210°, grön 139°; svart sänker lackens ljushet. Neutrala ytor, glas, lampor och alfakanal lämnas kvar. `test-racerbanan-farger.cjs` kontrollerar alla 6×5 varianter och skapar en kontaktkarta från den verkliga renderaren.

## Fartkänsla, 7 november 2026

Ingen nygenererad bildgrafik. Befintliga miljöer, titelskärm, fordon och selektiva lackfärger bevaras. Nya vägkantsföremål, räcken, reflektorer och fartstreck är kodritade och perspektivprojicerade i banornas befintliga paletter. Föremålen har fasta världspositioner utifrån banans frö. Farteffekterna ligger i periferin; matematik och HUD hålls skarpa. Kamerapresentation är separat från körsimuleringen. Ingen 3D-motor eller extern resurs har tillkommit.

## Myntrespons, 8 november 2026

Pop, små guldglimtar och flygande mynt är kodritade Canvas-effekter i befintlig guldpalett. Räknaren är HTML/CSS. Inga nya bildfiler eller externa resurser. Reduced-motion visar belöningen direkt utan rörelse.

Väguppdatering 8 november 2026: kodritade band och filstreck glider med interpolerade världsgränser. Paletter och bildfiler behålls; felaktigt triangulära filstreck rättade.
