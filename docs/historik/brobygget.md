# Brobygget: historik

### Första versionen (13 nov 2026)

Lärarens beställning efter att Flyta eller sjunka dömts ut som billig: ett bygglabb, och av idéerna valde han broar som ska tåla så mycket vikt som möjligt.

- **Motor:** XPBD med små tidssteg (`steg`, 16 delsteg, `DT` 1/60). Balk: `al = L/EA`, kraft = −λ/h², medel över delstegen och utjämning 0,35 per bild; brott när |T|/styrka > 1 (värsta balken först, en per bild). Rep hoppas över när de är slaka. Leders massa = 4 kg + halva balkarnas vikt. Sättning: 90 bilder med dämpning 6, sedan 0,6.
- **Material** (`MAT`): väg 20 kr/m, 60 kg/m, 150 kN, EA 1e8; trä 10 kr, 20 kg, 100 kN, 6e6; stål 30 kr, 45 kg, 420 kN, 2,4e7; rep 8 kr, 4 kg, 260 kN, 8e6. Vägens höga styvhet är medveten: en hängande kedja av vägbitar får då så hög dragkraft att den brister för minibussen men bär bilen.
- **Fordon:** två hjulpunkter (radie `r`, axelavstånd `ax`), stel axel, drivs mot 2,4 m/s längs vägens riktning (acceleration högst 8 m/s²). Kontakt hjul–balk fördelas på balkens ändar efter var hjulet står. Klar när bakhjulet är 0,6 m in på andra sidan; plums under vattenytan; fastnat efter 40 s.
- **Kalibrering i node** (referensbroar): bara väg 4 m bär 🚗, inte 🚐; väg + två trästöttor bär 🚐; träfackverk 8 m bär 🚚; stålfackverk 8 m bär 🚛; hängbro med fyra rep 12 m bär 🚐. Ett prov tar 25–70 ms att räkna.
- **Nivåer** (gap, budget, uppdrag; referensbro för tre stjärnor): Bäcken 4 m, 200 kr, 🛵 (124 kr); Bussbron 6 m, 320 kr, 🚐 (176 kr); Stenen 8 m med fästpunkt på sten, 500 kr, 🐘 (472 kr); Ravinen 8 m, 650 kr, 🐘 (632 kr); Stålbron 10 m, 1150 kr, 🚚 (1110 kr); Hängbron 12 m med torn, 800 kr, 🚐 (612 kr); Rekordbron 10 m med allt, 1500 kr, 🚌 (1308 kr bär 🦕).
- **Ritordning:** himmel, kullar, vatten bakom → balkar → berg, sten, torn → leder → fordon → flisor och stänk → vatten framför. Trasiga delar som svänger in i berget döljs alltså av berget.
- **Rättat efter skärmbilder:** trasiga brodelar syntes ovanpå berget; solen krockade med Hängbrons torn; materialknapparnas färgprov låg dikt an mot texten; lösa leder inne i berget ritades.
- **Testat** (`skript/test-brobygget.cjs`): referensbroarna för alla sju nivåer (tre stjärnor inom budget, bara väg räcker inte efter nivå 1), dra balkar med mus, dubbletter och start i tomma luften avvisas, sudda, ångra, budgetstopp, ett helt prov i sidan som stämmer med `prov`, stjärnor/rekord/bro sparas, halv bro ger besked, 390/375/1024 px utan sidledsscroll, inga JS-fel.
- **Inte testat:** riktig pekskärm, iPad, Chromebook. Hur ljuden låter.
