# Glödväktarens ljud, 7 november 2026

32 materialljud av **Kenney**, public domain **CC0**:

- RPG Audio: https://kenney.nl/assets/rpg-audio
- Impact Sounds: https://kenney.nl/assets/impact-sounds
- Medföljande originallicenser: KENNEY-RPG-LICENSE.txt och KENNEY-IMPACT-LICENSE.txt.

Hämtade oförändrade Ogg-källor via speglingen `GeorgeQLe/assets-sfx-combat`, commit `9662dc1bed3b06ae753045915f9accfac044c7ce`, katalogerna `assets/kenney/rpg-audio/Audio` och `assets/kenney/impact-sounds/Audio`. Originalsidan bekräftar CC0 men nekade binärhämtning under arbetet. För leverans avkodades ljuden till mono PCM16 WAV i Chromium; samma filstammar, inga nya externa anrop i spelet. WAV ger bred kompatibilitet. Originallicenserna är bevarade.

Svärd: knifeSlice/drawKnife; steg: footstep_concrete/cloth; dörrar: doorOpen/metalLatch; mekanismer: creak/metalPot/impactMetal; sten: nedstämda impactWood-lager; böcker: bookFlip; klockslag: impactBell med låga inharmoniska resonanser.

Lokal ljudmotor: `../ljudmotor.js`, aktiveras bara av Glödväktaren genom det gemensamma `Ljud`-API:et och dess AudioContext/avstängning. Slumpade prov/nyanser, torr ansats plus konvolverad rumsklang, separata röst- och miljönivåer, masterheadroom och kompressor. Långsammare sten/kedje-/vattenförlopp byggs av flera lager. Portal/klocka får mörk resonans snarare än framgångspling. Röster är ordlösa, varierade formantstavelser. Inga verkliga personers röster eller talsyntestjänster används.
