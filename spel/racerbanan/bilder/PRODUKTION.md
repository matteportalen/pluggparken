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
