# Elkretsen (NO, flaggskepp)

_Under bygge (nov 2026). Den som tar över läser bara den här filen och `elkrets/index.html`._

## Beslut (lärarens, 12 nov 2026)
- Näst flaggskepp efter Sjön, samma recept: **Bygg → Laborera → Gissa först.** Eleven jobbar själv, inget fyra-knappar-quiz. Kort under 🔬 NO i `fler/index.html`.
- Figurerna (batteri, lampa, brytare, motstånd) är ritade i SVG (lärarens ok för flaggskeppen). Starkt förenklad modell; texterna är inte granskade av en lärare i fysik.
- Spara tokens: små tester, få skärmbilder, en incheckning per steg, uppdatera Status längst ner.

## Hur det fungerar
- **Ritbräda:** 7 × 5 knutpunkter. Varje *kant* mellan två grannpunkter rymmer en komponent: ledning, batteri (3 V, vändbart), lampa (10 Ω), brytare (öppen/stängd), motstånd (20 Ω), **motor (12 Ω)**. Man väljer verktyg och trycker på kanten. ✋ trycker på brytare. Sudd tar bort. Fungerar med tryck på mobil.
- **Simulering:** nodanalys (Gauss) över alla knutpunkter. Ledning och stängd brytare = 0,02 Ω, öppen brytare = ingen kant, batteri = 3 V med 0,2 Ω inre resistans. Lampans ljusstyrka = effekt / 0,9 W (högst 1). Ström över 3 A ur batteriet = **kortslutning** (varning).
- **Ström visas** som ljuspulser längs kanterna (riktning och fart följer strömmen); lampor lyser med glöd efter ljusstyrkan.
- **Nivå 1 Bygg** (sex utmaningar): tänd lampan, lägg in en brytare, två lampor i serie (svagare), två lampor parallellt (fullt), ta bort en kortslutning, **få motorn att snurra åt andra hållet (vänd batteriet)**. Mål kontrolleras automatiskt mot simuleringen.
- **Nivå 2 Laborera:** fri bräda med färdiga exempel (serie, parallell) och mätvärden (lampornas styrka, ström).
- **Nivå 3 Gissa först:** fem av åtta frågor (serie, bruten serie, parallell, brytare, kortslutning, motstånd, **vänd batteriet, motor och lampa i serie**). Eleven gissar, trycker Kör, kretsen ändras och körs, förklaring visas. Facit ur simuleringen, inte inskrivet.
- Stjärnor: nivå 1 efter antal tips, nivå 3 efter antal fel. Nivå 2 ger inga. Nyckel `mattespel-elkrets-v1` = {stars:{1,3}}.

- **Motorn** (12 Ω, 81 % fart vid 0,24 A) ritas som en fläkt med tre blad som snurrar med strömmen. Rotationsriktningen = strömmens tecken i kantens egen riktning (positivt = medurs), så den vänder när batteriet vänds. Förenklad: ingen startström, ingen belastning (sägs på sidan).

## Inkopplingar (kryssa av)
Kort i `fler/index.html` (NO), `sok.js`, `sitemap.xml`, `konto.js` (`PKEYS`), `STJ` i `huvud.js` (+ sidnamnet i regexen för "fler"), stjärnor och `snap` i `index.html`, rad i `CLAUDE.md`.

## Status
- [x] Simulator verifierad i Node (en lampa 92 %, två i serie 24 %, två parallellt 85–87 %, kortslutning flaggas över 3 A)
- [x] Sidan byggd och testad i 390 × 844, 375 × 667 och 1200 × 760 (alla fem utmaningar, laboratorium, gissa-först med facit ur simuleringen)
- [x] Inkopplad i Fler ämnen (NO), sök, sitemap, konto, stjärnor
- Inte provat: pekskärm, riktig telefon. Inte gjort: portal i världen, fler komponenter (summer, kondensator), amperemeter. Texterna är inte granskade av en fysiklärare.
