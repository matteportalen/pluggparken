# Tornbyggets bild- och ljudlager

Själva spelet ligger fortfarande i `../index.html` och delar meny/data med Spelhörnan. `grafik.js` och `utseende.css` är endast Tornbyggets presentation. Ändra inte de andra spelen eller deras data när bildlagret uppdateras.

Behåll `mattespel-spel-v1`, `data.tower`, räknesätt/tabellval, stjärnor, rekord och klistermärkesflaggor. Behåll tvåstegsflödet: räkna rätt → tajma balkens släpp. Matter.js lokalt i `/lib/matter` äger fysiken, balans, vind och kroppar. Rita balkar efter de verkliga kroppsgränserna så att visuell träff och fysik stämmer.

Riktning: ren stiliserad 3D-känsla, matte material, stål/betong, neutralt dagsljus, ingen sepia/gouache/antik sliten trästil från Affären. Bakgrunderna ska vara lågmälda i mitten där barnet siktar. Bildresan går från byggplats och stad via moln till jordens horisont i rymden. Bildkällor och promptar finns i `bilder/PRODUKTION.md`; alla levererade bilder och ljud är lokala.

Behåll stor synlig knappsats (1 2 3 överst), tangentbord, Enter/mellanslag och touchsläpp. Kontroller ska få plats i stående och liggande vy. Slutsekvensen ska rama in hela månen, kranföraren och flaggan; kranarmen får inte skymma målet. Inaktiva sifferknappar göms då.

Metalljud följer sajtens gemensamma ljudval, tystnar vid avslut/dold flik och har egen av-knapp i spelet. Bakgrunds- och dekorativa rörelser ska begränsas med reduced-motion; tajmningen i själva spelet får inte ändras.

Verifiera `skript/test-tornbygget-utseende.cjs` med lokal server. Den spelar hela 20-våningsresan genom faktiska knappar, testar fel/rätt matematik, fysik, mål, sparande och annan speldata samt mobil/surfplatta/landskap och ljudavstängning. Granska faktiska spelbilder, inte bara bakgrundsfilerna. Dokumentera nya beslut i `../../docs/spel.md`.
