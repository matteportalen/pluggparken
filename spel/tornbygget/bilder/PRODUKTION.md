# Tornbygget – visuell produktion, 7 november 2026

Inbyggd `image_gen`, tre egna lokala bakgrunder. Original PNG och metadata bevarade i Codex katalog `/Users/jesper/.codex/generated_images/01a1ad68-5c6a-7ec2-97c1-707715721bda/`. Leverans WebP kvalitet 91/metod 4, oförändrade 1024×1536 px, med tillgänglig ICC/XMP vidareförd. Ingen extern bildtjänst kontaktas under spel. Ingen ny 3D-motor: eget Canvas-bildlager ovanpå befintliga Matter-kroppar.

## Bildsystem

Ren stiliserad 3D-känsla, mjuka skuggor, neutralt dagsljus, naturliga men tydliga färger. Stål och betong i förgrunden; detaljrikare stad i periferin. Avsiktligt lugnt siktområde i mitten. Byggplatsbilden valdes först och användes som referens för moln- och omloppsbilderna.

Bakgrunderna tonas mellan zoner och följer höjdresan. Stadens marklinje förankras mot världens markhöjd, så bilden inte får en synlig nedre kant när kameran flyttar sig. Balkar och kran är kodritad materialgrafik, eftersom form, vajer, rörelse, rotation och träffyta måste matcha fysiken exakt. Färger, invändiga skuggor, flänsar, nitar, reflexer och glas ger djup. Avatar och bygghjälm bevarar elevens val. Månen ritas separat som verkligt mål med egen ljussättning; inga mål eller kollisionsföremål är inbakade i bakgrunden.

| Leverans | Ursprunglig generering | Spelanvändning |
|---|---|---|
| byggplats-v1.webp | exec-297be1df-ef46-4df9-b66d-c80c18ebad6f.png | Mark, stad, startskärm |
| moln-v1.webp | exec-821757f0-f771-4e2b-a1fa-4136db76266b.png | Höjdresa ovan molnen |
| omloppsbana-v1.webp | exec-88e96dd0-8612-41c5-8bec-e92d65cd489a.png | Jordhorisont, rymd, månslut |

Alla tre granskade i faktiska spelvyer. Hel genomspelning 20 våningar, skärmbilder vid 1/5/10/15/20, mobil och surfplatta samt liggande vy. Separat granskning av målramning efter kameraändring.

## Prompt 1 – byggplats, ny bild

Production playable background for a polished stylized 3D construction tower game for children. Portrait 1024x1536. Clean art-directed animation-film look, matte materials, convincing lighting, crisp silhouettes, restrained detail not painterly. View straight ahead across a small construction site towards a Scandinavian city beyond. Lower20percent has a gray concrete worksite with material pallets and orange safety barriers ONLY at far left and far right. Center bottom empty for player's tower foundation. City buildings in middle distance at sides, distant hills, pale blue clear sky fills upper65percent. Neutral daylight with soft shadows. IMPORTANT central40percent entire image quiet empty sky with no tall structures, no crane no tower no hanging beam. Background subdued low contrast so foreground colored steel remains most legible. No characters, no text, no UI, no logos, no golden ornamental decoration, no sepia, no fake distressed edges. Actual game environment, not poster or concept board. Strong atmospheric depth and simple pleasing shapes.

## Prompt 2 – moln, byggplatsbilden som referens

Same production game environment family as reference, clean stylized3D animation-film materials and restrained soft lighting. Portrait1024x1536 background for high-altitude stage of tower construction game. Looking horizontally from ABOVE a layer of clouds. Beautiful broad white cloud banks mostly along left/right edges and lower30percent, blue sky upper area, tiny distant city visible far below through one small cloud gap bottomleft. Central40percent entire height mostly clear quiet pale blue sky for interactive tower and crane. Sense of immense height, subtle atmospheric depth, not decorative fantasy. No crane no tower no foreground structures no objects no letters no UI no characters. Keep smooth matte rendered cloud volumes with crisp but soft-lit edges, natural blue and white, no painterly brushwork no sepia no ornate imagery. Match reference daylight and visual simplicity.

## Prompt 3 – omloppsbana, byggplatsbilden som referens

Same clean polished stylized3D game environment family as reference, but ORBIT stage for tower-to-moon game. Portrait1024x1536. Very dark navy space upper75percent, subtle sparse stars, huge blue curved Earth's horizon across lower25percent with white clouds and delicate blue atmospheric rim. Earth illuminated by neutral sunlight, pleasing clear simple shapes as animation-film environment, not real photograph. Middle40percent quiet nearly black space for interactive steel tower and crane. IMPORTANT NO moon because moon will be a separate interactive goal drawn in game. No planets, no spacecraft, no structures, no tower, no lettering no UI no giant flares no nebulas. Strong height and depth with restrained clean composition. This is a playable background not a poster.
