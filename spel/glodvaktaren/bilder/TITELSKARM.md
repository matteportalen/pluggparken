# Glödväktarens titelskärm

## Visuell riktning och användning
En mörk tv-spelstitelskärm: sliten stenbro, en ensam riddare sedd bakifrån och en avlägsen fyr i dimman. Kalla, dämpade färger och små glödspår. Den vänstra delen lämnar plats åt den separat ritade logotypen och en meny i levande text. Mobilens bildutsnitt flyttar riddaren åt höger så att motivet kan synas bredvid menyn. Ingen övningsdashboard eller informationskort på första sidan. Pluggparkens vanliga topprad döljs på titelskärmen och återkommer inne i spelet; en diskret länk till Spelhörnan finns i nederkanten.

Logotypen stavar GLÖDVÄKTAREN, inklusive Ö och Ä. Dess material och ojämna mejslade former är bildritade. Namnet finns samtidigt som en riktig h1 för hjälpmedel. Native transparent PNG används oförändrad, med CSS-placering av de transparenta marginalerna. Inställningarna och bildkällorna är tangentbordsstyrbara dialoger; övrig meny är inert när en dialog är öppen. All spelinformation och alla knappar är DOM-element, inte del av bakgrundsbilden.

Matteval och sparstatus syns direkt under menyn. Ny resa öppnar matteval först. Fortsätt går till den redan valda resan. Om en ny resa skulle ersätta ett befintligt matteområdes resa behövs en uttrycklig bekräftelse; andra matteresor och intjänade stjärnor behålls. Avbrutna inställningar sparar inte ändringar. Instruktionerna finns i spelets journal och i själva situationerna.

## Manifest
Båda tillgångarna genererades med **inbyggda OpenAI image_gen** och kopierades oförändrade till denna mapp. Ursprung: Codex generated_images/01a1ad68-5c6a-7ec2-97c1-707715721bda.

| Fil | Produktion | Tekniskt |
| --- | --- | --- |
| title-landscape-v1.png | exec-9f205ff6-161c-43e4-a087-e4ac0cf5a27a.png | 1672×941; opak; title canvas, cover-skalning och responsivt utsnitt |
| title-logo-v1.png | exec-ee3eddb6-5d0f-4701-ba4f-a03e72cf1c21.png | 2172×724; nativ alfakanal; egen logotyp, inga knappar eller textlager utöver namnet |
| kort.png | Skärmbild av den faktiska nya titelskärmen | Spelhörnans kort, fångas av integrationstestet |

Canvas använder långsamma, tidsbaserade rörelser och få glödpartiklar. prefers-reduced-motion ger en stilla bild. Animationen stoppas när spelet öppnas eller sidan är dold. Inget ljud spelas automatiskt när sidan laddas. Spelets ljudinställning finns i inställningsvyn.

## Slutlig promptuppsättning
1. **Miljö:** Production background for the title screen of GLÖDVÄKTAREN, a sombre soulslike 2D fantasy adventure. Wide cinematic 16:9, detailed painterly HD2D with subtle pixel-inspired texture. Ancient deserted stone bridge crosses black flooded chasm on RIGHT. Tiny solitary silver-armoured knight seen from behind with weathered cloak and lowered sword at around 78% width, 72% height. Distant cathedral ruins and one ember-lit beacon through cold blue-grey mist. Overcast dark night, wet stone, desaturated slate, charcoal, petrol; sparse dim embers, no golden sunset. Left half quiet near-black fog deliberately empty for separate logo/menu. No gears, steampunk, flowers, cute cozy houses, smiling figures, neon, border, lettering, title, buttons, HUD or UI. Actual game background, not a mockup.
2. **Logotyp:** Bespoke hand-drawn title logotype. Exact Swedish uppercase word GLÖDVÄKTAREN, one Ö after L and one Ä after V, all letters in one horizontal line fully visible. Custom angular but legible carved weathered iron/stone, hand-cut edges, chisel marks, cold silver-grey face, charcoal bevels, a few hairline cracks with faint ember red-orange. Tall expressive G/V and clearly drawn diacritics. Mature sombre medieval soulslike identity, strong silhouette at 450px wide. Wide canvas with native transparent background and margins. No background, banner, shield, sword, crest, subtitle, tagline, extra symbols, border, glow cloud, sparks, UI, giant flourishes, gold, neon, cartoon or glossy chrome.

## Ljudövergång
Portaler använder `Ljud.glod('portal')`: filtrerat vinddrag och låg fallande resonans utan melodiska toner. Samma övergång används vid världsbyte och glödfröets teleport. Portalens ljudgraf renderas i ljudtestet och en verklig portalpassage verifieras i titelskärmstestet.

## Kontroll
Titelskärmstestet täcker 1440×950, 320×780, 390×844 och 844×390; start, avbrutna inställningar, matteval, menyretur, bildkällor, sparad resa och bekräftad omstart av ett valt matteområde. Bilderna bedöms också i den riktiga sidan på dator och mobil. Källbildens alfakanal och logotypens stavning kontrolleras separat.
