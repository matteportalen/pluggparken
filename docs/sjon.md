# Sjön (ekosystemet, NO)

_Under bygge (nov 2026). Överlämning: den som tar över läser bara den här filen och `sjon/index.html`. Läs inte `docs/historik/`._

## Beslut (lärarens, 12 nov 2026)
- Nytt NO-flaggskepp: eleven jobbar **helt själv**, ingen fyra-knappar-quiz. Kort under 🔬 NO i `fler/index.html`.
- **Figurerna ritas i SVG** (läraren sa ja just för den här övningen; i övrigt gäller "rita inte nya figurer i SVG utan att fråga").
- **Nivå 1 och 2 först.** Nivå 3 (gissa först, sedan simulering) väntar tills läraren provat sjön.
- Starkt förenklad modell. Texterna är skrivna av Claude och inte granskade av en biolog. Säg det på sidan.
- Spara tokens: små tester, få skärmbilder, en incheckning per steg, uppdatera den här filen efter varje steg.

## Nivå 1: Bygg (tre uppgifter)
1. **Kedjan:** ☀️ → alger → vattenloppa → mört → gädda → fiskgjuse. Tryck på kort för att fylla platserna (som bricker i Engelska ord), Klar kontrollerar. Pilen visar vart energin går.
2. **Väven:** tryck på arten som äts, sedan på den som äter, så ritas en pil (energin går mot den som äter). Rätta pilar (6): alger→vattenloppa, alger→mört, vattenloppa→mört, mört→gädda, mört→fiskgjuse, gädda→fiskgjuse. Tryck på en pil för att ta bort den. Särskild text om en pil pekar fel håll.
3. **Kretsloppet:** ordna: död fisk → bakterier bryter ner → näring i vattnet → algerna växer.
Fel: första felet markerar fel och ger en ledtråd, andra felet visar svaret.

## Nivå 2: Sjön lever (uppdrag)
- Modell: `kor/deriv` (rk4) i `sjon/index.html`, fem arter A V M G F, samma sex ätrelationer som väven. Jämvikten räknas ut när sidan laddas (körs 800 tidsenheter) och allt visas i förhållande till den. 1 tidsenhet = 1 sekund vid fart ×1.
- Eleven kan **släppa ut** (+0,5 × jämvikt) och **fånga** (−0,5 × jämvikt) varje art. En art under 3 % av jämvikten dör ut och kommer bara tillbaka om eleven släpper ut den.
- Uppdragen (en runda = fyra, i ordning): 1 Gäddorna är borta, 2 Fiskgjusen har flyttat, 3 Utsläpp: nästan ingen mört, 4 Bygg upp sjön (bara alger).
- Klart när alla fem arter lever och är mellan 0,5 och 1,8 × jämvikt i 15 tidsenheter i rad.
- Stjärnor per runda: 3 om högst 1 ingrepp över "par", 2 om högst 4 över, annars 1. Par = antalet ingrepp som löser uppdraget.
- Syn: sjö i SVG (himmel, vatten, botten, vass), en figur per ~enhet art som rör sig, vattnet blir grönare när algerna blommar, kurvor per art (Många / Lagom / Få), fart ×1 ×2 ×4 och paus.
- `prefers-reduced-motion`: figurerna står stilla, kurvorna går som vanligt.

## Tekniska regler
- En enda `sjon/index.html`, inga bibliotek. localStorage `mattespel-sjon-v1` = {stars:{1,2}}.
- Inkopplingar (kryssa av): kort i `fler/index.html`, `sok.js`, `sitemap.xml`, `konto.js` (`PKEYS`), startsidans stjärnor + `snap` i `index.html`, `STJ` i `huvud.js`, portal i `varlden/index.html`, rad i `docs/`-tabellen i `CLAUDE.md`.
- Testa med Playwright i 390 × 844, 375 × 667 och 1200 × 760 (utan scroll). Kör `node --check` på skriptet.

## Modellen (färdig och verifierad, byt inte utan ny sökning)
Funna med slumpsökning (konstruerade kring en vald jämvikt, sedan testade: stabil, tål −70 % och +100 % av varje art, kaskad utan gädda och utan fiskgjuse, minst 25 tidsenheter innan gäddan svälter när mörten saknas). Trängsel (kvadratisk dödlighet) behövdes för att sjön ska tåla ingrepp; `iA`/`iV` är en äggbank för alger och vattenloppor (de kan inte dö ut helt). Mört, gädda och fiskgjuse dör ut under 3 % av jämvikten.

`deriv`: A' = rA·A·(1−A/KA) − sAV·V·A/(kAV+A) − sAM·M·A/(kAM+A) + iA; V' = eAV·fAV − fVM − dV·V − qV·V² + iV; M' = eAM·fAM + eVM·fVM − fMG − fMF − dM·M − qM·M²; G' = eMG·fMG − fGF − dG·G − qG·G²; F' = eMF·fMF + eGF·fGF − dF·F − qF·F². Matning typ II: f = s·rovdjur·byte/(k+byte). RK4, h = 0,05.

Parametrar: `{"rA":0.5126,"KA":22.13,"sAV":0.7755,"kAV":3.938,"eAV":0.6861,"sAM":0.4488,"kAM":2.766,"eAM":0.3991,"sVM":0.3637,"kVM":3.685,"eVM":0.4256,"dV":0.1246,"qV":0.04177,"sMG":1.366,"kMG":3.129,"eMG":0.3264,"dM":0.03954,"qM":0.02698,"sMF":0.8063,"kMF":2.581,"eMF":0.5616,"sGF":1.427,"kGF":1.674,"eGF":0.2791,"dG":0.03021,"qG":0.1043,"dF":0.1154,"qF":1.052,"iA":0.01,"iV":0.01}`
Jämvikt (A,V,M,G,F): `[9.428,3.891,1.89,0.3745,0.1416]`

Provat med bot (tid till klart, alla 0,5–1,8 × jämvikt i 15 enheter): uppdrag 1 (gädda borta efter 60 enheter: V nästan borta, M 2×, A 1,9×) löses med 1 gädda på ~43 enheter; uppdrag 2 (fiskgjuse borta) 1 fiskgjuse ~34; uppdrag 3 (mört 0) 1 mört direkt ~16, utan åtgärd dör gäddor och fiskgjusar; uppdrag 4 (bara A och V) mört, gädda, fiskgjuse i ordning ~130–140. Par: 1, 1, 1, 3.

## Status
- [x] Modellparametrar hittade och verifierade
- [x] SVG-figurer och sjöscen (`sjon/index.html`)
- [x] Nivå 1 (kedjan, väven, kretsloppet), testad
- [x] Nivå 2 (uppdragen), botten löser alla fyra uppdrag i tre skärmstorlekar (par 1,1,1,3)
- [x] Inkopplingar: kort i `fler/index.html` (NO), `sok.js`, `sitemap.xml`, `PKEYS`, `STJ`, stjärnor och `snap` på startsidan, rad i `CLAUDE.md`
- [ ] Inte gjort med flit: portal i `varlden/index.html` (kroppens park är ritad hörn för hörn; läraren får välja plats), nivå 3 (gissa först)
- Inte provat: pekskärm, riktig telefon, lärarens åsikt om texterna. Texterna är inte granskade av en biolog.
