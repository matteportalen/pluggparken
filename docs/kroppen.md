# Människokroppen i 3D

_Det som gäller nu för `anatomi/`: modellen, lagren, infokortet och resorna. Hur det byggdes, Blender-stegen och röstfilernas längder står i `docs/historik/kroppen.md` (sök där med `grep -n "ord" docs/historik/kroppen.md`, läs inte hela)._

## Var ligger vad

| Fil | Innehåll |
| --- | --- |
| `anatomi/index.html` | Sidan: three.js ur `lib/three/`, lagerknappar, områdesknappar, infokort med ledlinje. Eget enkelt sidhuvud, ingen `huvud.js`. |
| `anatomi/modell/*.glb`, `grupper.json` | Modellen per lager (hud, skelett, muskler, organ, organ2, karl, ven, nerver), ca 60 grupper. |
| `anatomi/resa.js` | Motorn för resorna (`STORIES`). Matens resa ligger här, vägen i `modell/vag.json`. |
| `anatomi/syre.js`, `anatomi/nerv.js` | Syrets resa, Hjärnan och nerverna. |
| `skript/anatomi/` | Blender-skripten som gör modellen (`spec.py`, `exp2b.py` m.fl.). Källan Z-Anatomy.zip ligger inte i repot. |
| `manus/matensresa-manus.txt`, `syretsresa-`, `nervresan-` | Rösttexterna. Röstfiler i `ljud/matensresa/`, `ljud/syretsresa/`, `ljud/nervresan/`. |

Inga stjärnor, inget sparas (utom `pluggparken-anatomi-open` för mobilmenyn och resornas fart och röst). Kortet ligger under 🔬 NO i `fler/index.html`.

## Regler

- **Modellen är Z-Anatomy (CC BY-SA 4.0), byggd på BodyParts3D.** Filerna i `anatomi/modell/` måste förbli CC BY-SA och källan stå längst ner på sidan.
- **Njurarna i Z-Anatomy har NC-licens och får inte användas.** Njurar och urinledare ritas i kod.
- **Starkt förenklad för skolan** (lärarens beslut): ca 60 grupper i stället för tusentals delar.
- **Utelämnat med flit:** könsorgan och könsområdet (därför ett litet hål i ljumsken; ett hål är bättre än en klump), stora nätet, små ansiktsmuskler, inre örat.
- **Texterna är skrivna av mig och inte granskade av någon med medicinsk kunskap.** Säg det när texter läggs till eller ändras.
- **Mörk, medicinsk-futuristisk stil:** nattblå bakgrund, cyan glöd, glasknappar i versaler. Sidan laddar inte `tema.js`.
- **Startbilden:** allt på utom Huden och Musklerna. Musklerna är alltid täta (man stänger av det som är i vägen). Huden blir nästan genomskinlig när ett inre lager är på och markeras inte vid tryck.
- **Blodkärl som i läroböcker:** pulsådror röda och vener blå, men lungartärerna blå och lungvenerna röda.
- **Infokortet** hamnar bredvid kroppen på den sida delen ligger, 40 px utanför kroppens kant, med en lysande ledlinje från punkten man tryckte på.
- **På mobil** ligger lagren bakom knappen "Lager" som viks upp, områdesraden ligger alltid längst ner, och resorna under knappen "Resor".
- **Webbläsaren cachar modellfilerna:** byt filnamn eller lägg `?v=` när en `.glb` ändras.
- **Nya kort läggs bara i de nya ämnessidorna** (`fler/`, `matte/`, `svenska/`, `so/`, `extra/`), aldrig i `ovriga/index.html`.

## Resorna

- Tre resor i menyn Resor: **Matens resa**, **Syrets resa**, **Hjärnan och nerverna** (åk 4–6). De har djuplänkar: `anatomi/#resa-mat`, `#resa-syre`, `#resa-nerv`.
- **Rösten spelar läraren in själv** i ElevenLabs (Tommy Thunström). Jag skriver manuset; filerna paras ihop efter ordning och längd.
- **Stegens längd (`dur`) sätts efter röstfilerna**, så att rörelsen pågår medan rösten pratar. Bygg inte filmen klar före filerna finns.
- **Byts en röstfil: höj `VER` i `resa.js`** och `?v=` på importen i `index.html`.
- Saknas en röstfil visas bara texten (404 i konsolen är då väntat). Resan väntar in rösten.
- Vägarna är ritade ur modellens egna mittlinjer.
- Börja med helheten: kameran visar kroppen först och zoomar in när det behövs (läraren: för inzoomat i början).
- Fart och röst av/på delas med filmerna (`pluggparken-resa-fart`, `pluggparken-resa-rost`).
- Hjärnan är en enda del i modellen: hjärnbarken, lillhjärnan och hjärnstammen visas som glödande områden på ungefärliga platser.

## Inte testat

Riktig telefon och pekskärm (dubbeltryck med finger, hur mobilmenyns animation känns), rösterna är inte avlyssnade av mig, ingen medicinsk granskning.

## Borttaget med flit (bygg inte igen)

Sinnena och Tänderna som frågeövningar. Den vita, kliniska designen. Genomskinliga muskler. Försöken att täcka hålet i ljumsken.

## Väntar

- Tänderna som interaktiv 3D-modell inne i Människokroppen (hur en tand är byggd, hål, borstning).
- Håret på huvudet ser ut som en kort rufsig frisyr (inte löst). Modellen är en man; ingen kvinnokropp finns.
- Genomskinlighetsreglage.
