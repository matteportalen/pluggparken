# Klasstavlan

_Det som gäller nu för `larare/` (visas som **Klasstavlan**; adressen och nycklarna heter kvar larare). Hur varje ruta byggdes, mått, funktionsnamn och ljudsyntes står i `docs/historik/klasstavlan.md` (sök där med `grep -n "ord" docs/historik/klasstavlan.md`, läs inte hela)._

## Vad det är

En interaktiv whiteboard för projektorn i klassrummet, allt i `larare/index.html`. Egen minimal sida utan `huvud.js`. Länken är en smal pillknapp direkt under ämneskorten på första sidan.

- **Ritytan** är oändlig med zoom och flytt, penslar, former, 14 färger och upp till sex lager.
- **Rutor** ovanpå: Du behöver, När du är klar, Timer, Lyckohjul, Post-it, Ljudnivå, Burk, Par och grupper, Skrivrad, Textruta, Video.
- **Mina tavlor:** sparade tavlor som går att byta mellan, även av timern när tiden är slut.

localStorage: `pluggparken-larare-v1` (rutor, tavlor, lager, favoriter) och `pluggparken-larare-v1-ritning`. **Nycklarna ligger inte i `PKEYS` och synkas aldrig till molnet.**

## Elevdata

- Namn i lyckohjulet och i Par och grupper är elevdata. De ligger bara i lärarens webbläsare och följer med 💾-filen **bara** om läraren kryssar i "Ta med namnen".
- Ritningen kan innehålla elevnamn: den sparas bara på enheten och ingår inte i 💾-filen.
- **Ljudnivån spelar aldrig in något.** Bara nivån räknas ut i webbläsaren. Mikrofonen frågas först när man trycker Starta.
- Filer som läses in granskas: bara kända rutor, begränsade längder, bilder bara som små jpg-data-adresser.

## Regler

- **Gjord för projektorn:** rutorna ligger i en yta som är 1 920 enheter bred och skalas till fönstret, så att layouten ser likadan ut överallt.
- **Rutorna ligger fast på skärmen, ritningen och textrutorna ligger i världen** och följer zoomen. De är inte låsta till varandra.
- **Inget får hamna utanför bilden:** menyer rullar inom fönstret, rutor hålls helt inom tavlan (utom textrutor).
- **Inga varningsrutor för sådant som går att ångra.** Ny lektion, mallar, byte av tavla och Sudda hela ritningen visar i stället "↩ Ångra" i nio sekunder. Fråga bara vid Ladda från fil och Grundlistan.
- **Låsta rutor och post-it med text ligger kvar** vid Ny lektion, mallar och byte av tavla.
- **Verktygsfältet får inte hoppa:** knappar som inte gäller tonas ned, de göms inte. Grupper öppnas som små paneler med text.
- Storlek ändras med handtaget i hörnet (+ och − togs bort: lätta att trycka på av misstag).
- Rutor snappar mot varandra och mot marginalerna. Alt slår av snappningen. En ny ruta hamnar på första lediga plats uppifrån.
- Namn och bild som läraren ändrar på en sak sparas och används nästa gång.
- **Timern** visar minuthjulet tills man trycker Start, sedan bara nedräkningen. Hjulet har fart när man kastar det, även när Windows har animationer avstängda (det är en reaktion på användarens drag, inte dekoration). Timern går att dra i hela kroppen utan att text markeras.
- **Timerns slutljud är egna** (Klockspel, Sångskål, Marimba), inte samma som övningarnas.
- **Burken är bara positiv:** för högt ljud ger paus, kulor tas aldrig bort av sig själva.
- **Ljudnivån** räknar bara röstljud över rummets egen tystnad, har fyra lägen med färg på hela rutan plus ikon och ord. Reglagen Gräns och Känslighet ligger framme på rutan.
- **Par och grupper:** namnen skrivs på en rad (mellanslag, komma eller radbrytning; understreck i tvåordsnamn). Byter man läge slumpas det om direkt.
- Videorutan bäddar in via `youtube-nocookie.com`. YouTubes sökning går inte att bädda in.
- Designen: frostat glas, runda hörn, diskreta skuggor ("Apple-känsla").

## Fällor i koden

- **Testa alltid att pennan ritar efter ändringar i `larare/index.html`.** En ny funktion med samma namn som en befintlig (`storlek`, `fyll`) har slagit ut ritandet förut. Kontrollera att namnet är ledigt.
- **Skriv aldrig `//`-kommentarer i de långa ihopklistrade kodraderna.** Använd `/* */`. En sådan kommentar stängde av resten av raden, och `node --check` såg inget fel.
- Fältet `ly` på ett streck är lagret. Använd inte korta fältnamn som redan finns.
- Webbläsaren pausar ljudsystemet tills man trycker någonstans. Mätaren försöker återuppta det och säger till annars.

## Inte testat

Riktig projektor, pekskärm och iPad, pekpenna med tryck, riktig mikrofon i klassrum (siffrorna för golv och känslighet är rimliga gissningar som ska finjusteras), mycket gamla Chromebooks med tunga penslar. Ljuden är verifierade tekniskt, inte avlyssnade.

## Väntar

- Rutor som följer med i världen, flera sidor.
- Att tavlan rätar upp en ritad linje eller cirkel av sig själv.
- Par och grupper: undvik samma par som förra gången, bestämda par.
- Att en tavla startar sin egen timer, och att en dold ruta visas när timern är slut.
- Fler rutor (schema, dagens datum), spara tavlan som bild.
