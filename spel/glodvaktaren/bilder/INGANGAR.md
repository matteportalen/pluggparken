# Glödväktaren — ingångar och portaler, 7 november 2026

Fyra lokala PNG-original genererade med OpenAI ImageGen för spelet. Nativ alfakanal (0–255), ursprunglig inbäddad metadata bevarad. Ingen extern bildtjänst anropas under spel. Formerna och färgerna ansluter till smedjans befintliga artwork: slitet trä, sprucken gråviolett granit, dämpad teal, små varma lyktor; den övernaturliga portalen har kallt silverljus.

| Fil | Spelroll | Renderhöjd i världskoordinater |
| --- | --- | --- |
| entrance-mine-v1.png | Gruvöppning i skogen och gruvans två utgångar | 185 / 145 |
| entrance-stone-v1.png | Valv mellan Gläntan och Bergspasset, ingång/utgång till de tidlösa valven | 176 / 158 |
| entrance-magic-v1.png | Aktiverad portal mellan smedjan och klockstaden | 178 |
| entrance-door-v1.png | Smedjans utgång och urmakarhusets två dörrar | 165 / 140 |

Canvas läser opaka gränser en gång när varje bild laddats, beskär genomskinliga marginaler vid rendering och förankrar bilden i interaktionens befintliga fotpunkt. Bildproportioner bevaras. Ingångarna är kulisser, utan nya kollisionsytor eller ändrade sparpositioner. Kodritad reservform finns under laddning. Portalen har sparsam lokal ljusanimation; minskad rörelse stänger av rörelsen.

## Produktionsprompter

Gemensamt: production transparent 2D side-view game sprite for Glödväktaren; front orthographic; detailed painterly HD-2D; desaturated charcoal/violet/teal stone and timber, somber soulslike mystery, clear silhouette at native game size; single complete uncropped asset; native transparent alpha outside, dark opaque interior; no UI, text, characters, gears or scenery.

- **Gruva:** Broad irregular granite rock mouth reinforced by heavy aged timber beams. Clearly open deep black tunnel, dim copper rails into darkness, one pickaxe at right, warm lantern on left jamb, sparse moss. No trees across the opening. Read at 220×190 pixels.
- **Stenvalv:** Ancient tall weathered asymmetrical granite passage with narrow fractured buttresses, sparse dead vines, open black doorway, two tiny dim amber lantern niches. Handmade architecture, restrained decoration, no elaborate magic symbols. Read at 135×180 pixels.
- **Portal:** Rough old narrow granite arch, shallow hand-carved marks and irregular chips. Dark almost-black liquid glass opening with faint pale silver-teal vertical seam, cold light on inner edges, cracked sill and two extinguished candles. No bright sci-fi ring, rainbow or ornate clutter. Read at 125×180 pixels.
- **Dörr:** Open workshop doorway in weathered stone. Heavy timber door swung inward, dark blue-black opening with sliver of cold night, solid threshold, simple iron hinges, dim lantern on left jamb. No building or perspective floor. Read at 105×165 pixels.

## Sikt och provspelning

Gruvans interaktionspunkt ligger kvar på x=1640. Det skymmande trädets visuella stam har flyttats från x=1600 till x=1440; klättergrenarnas spelbara ytor är oförändrade. Gruvöppningen ritas efter träden och före figurerna, så att varken stammen eller en förgrundsgren täcker öppningen.

`skript/test-glodvaktaren-portaler.cjs` kontrollerar lokal laddning och verkliga E-interaktioner tur och retur mellan skog/gruva, smedja/stad, skog/berg, stad/valv och stad/urmakarhus. Skärmbilder för gruvans sikt tas på dator och 390 px mobil.
