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

## 2026-11-24 – Mer pengar på nivå 3–7

Läraren tyckte att pengarna tog slut. Referensbroarna låg nästan på budgeten (Stenen 472/500, Ravinen 632/650, Stålbron 1110/1150), så ett barn som provar sig fram hade inget utrymme. Ny budget: Stenen 650, Ravinen 850, Stålbron 1500, Hängbron 950, Rekordbron 1800 kr. Materialen och fordonen är oförändrade. `skript/test-brobygget.cjs` gick igenom (bara väg räcker fortfarande inte efter nivå 1).

## 2026-11-24 – Motorn utflyttad till fackverk.js och Tornverkstan byggd

Motorn (MAT, nyVarld, steg, narmast, kostnad, konstanterna) flyttades oförändrad från `brobygget/index.html` till `fackverk.js` (`MPFack`). Två tillägg som inte ändrar Brobygget: en led kan ha en sidokraft `fx` (vind), och `seg` (bergkanterna för hjulen) skapas bara om nivån har `gap`. Brobyggets test gav exakt samma siffror efteråt.

Tornverkstan (`tornverkstan/index.html`): byggläge och ritning efter Brobyggets mönster (rutnät 0–8 m brett, 1–10 m högt, fästpunkter på marken, Sudda/Ångra/Rensa, budget, linjal med meter och streckade mållinjer). Provet är ett tillståndsobjekt `nyttProv(niv,bal)` med `steg1()` som används både av animationen och av `prov()` (headless): 90 bilder "sätter sig" med dämpning och vind 2 m/s, sedan för varje steg 60 bilder upprampning och håll (vind 220, last 150, höjd 240 bilder). Vindkraft per balk = `KV·v²·L` (KV = 8, med byar ±18 %), delad på balkens två leder, från vänster. Last = massa på de högsta lederna. Brott = motorns balkbrott; välta = någon led har flyttat sig mer än 1 m.

Kalibrering (referenstorn → stjärnor, kostnad): Kikärtstornet stege 3 m → 1, stege 5 m med 2 m-fack 3 (238/300; med 1 m-fack 310, över budget). Vattentornet två ben → 2 (15 t), tre ben → 3 (20 t, 312/350). Blåsiga berget sicksack-stege → 1 (kuling), kryss + stålstöttor → 3 (orkan, 450/500). Masten stege → 1, stege + två rep → 3 (storm, 406/600; repen trycker ner läbenet, som då brister i orkan). Höga vattentornet tre träben → 2 (20 t), tre stålben → 3 (70 t, 828/900). Rekordtornet stege 7 m utan rep brast i kuling (0), 9 m med rep → 3 (494/600). Testat i Playwright 390 × 844 och 1280 × 900: bygga med musen, prov i sidan, ingen sidledsscroll, inga JS-fel.

## 2026-11-24 – Balkar fogas ihop där de möts

`MPFack.foga(bal, ny, ankare)` i `fackverk.js`: den nya balkens ändar delar befintliga balkar de hamnar mitt på (exakt kontroll med heltal: kryssprodukt 0 och 0 < t < 1), och den nya balken delas vid befintliga leder och fästpunkter den går över; dubbletter tas bort. Kostnaden räknas på resultatet (även den röda förhandsvisningen). Sparade bygg fogas vid start. Brobyggets test hade själv byggt fällan (trästötta till (1,0) mitt på vägbiten 0–3 m): nu delas vägen och testbron bär bussen 14 t i stället för lastbilen 9 t; testets antal balkar uppdaterades. Tornverkstans test kontrollerar att en stötta till mitten av ett ben delar benet.

## 2026-11-24 – Tornverkstan: mer pengar

Läraren frågade om vattentornen var lika generösa som Brobygget. Det var de inte (referenstornen tog 89–92 % av budgeten). Nya budgetar: Vattentornet 350 → 450, Höga vattentornet 900 → 1150, Blåsiga berget 500 → 650, Rekordtornet 600 → 700 kr. Ett torn helt i stål på Blåsiga berget (717 kr) ryms fortfarande inte. Testet gick igenom.
