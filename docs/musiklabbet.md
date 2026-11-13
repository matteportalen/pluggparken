# Musiklabbet

_Det som gäller nu för `extra/trummaskin/` (visas som **Musiklabbet**; mappen och nycklarna heter kvar trummaskin). Hur varje del byggdes, mätvärden och funktionsnamn står i `docs/historik/musiklabbet.md` (sök där med `grep -n "ord" docs/historik/musiklabbet.md`, läs inte hela)._

## Var ligger vad

| Fil | Innehåll |
| --- | --- |
| `extra/trummaskin/index.html` | Hela verktyget utom synten: trummaskin, melodi och ackord, loopstation, låtläge, mixer, pedalrader, export. Ca 1 700 rader; låt den inte växa mer än nödvändigt. |
| `synt/ljud.js` | Syntens ljudmotorer och ljudbank (`PPSyntLjud`). Kan skapas i både `AudioContext` och `OfflineAudioContext`. |
| `synt/synt.js`, `synt/synt.css` | Syntmaskin SM-4: vy, klaviatur, pads, stegrad. Stilar börjar med `.sy-`. |
| `synt/klipp.js` | Röstklipp: en loop delas i 4, 8 eller 16 delar och läggs på syntens pads (`PPSyntKlipp`). |
| `synt/rostloop.js` | Röstloopens ljudbehandling (`PPRostloop`): tonhöjd med samma längd (`pitch`, används även av loopstationens TONHÖJD och RÖST), HACK, FRYS, GRIND, baklänges. Panelen ligger i `synt.js`. |
| `pad.wav`, `pad2.wav`, `samples.wav` med `.json` | Samplingarna. Källor och licens i `LICENS-pad.txt` (alla CC0 eller fria). Hämtas med `?v=N`: höj siffran när en fil byts. |
| `lib/lamejs/` | Mp3-kodaren (lokal). |

Fem flikar: **TRUMMASKIN, SYNTMASKIN, MELODI & ACKORD, LOOPSTATION, LÅT**. Transport, tempo, projektknappar och mixer är gemensamma och ligger ovanför. Inga stjärnor, inget i `PKEYS`.

localStorage: `pluggparken-trummaskin` (sparade rytmer), `-mic`, `-fav`, `-vik`. Får inte byta namn.

## Regler

- **Eget, bara inspiration.** Inga namn, märken, kod, firmware eller ljud från andra instrument. Allt som heter något (maskiner, moduler, ljud, reglage) får egna namn. Gäller varje modul som läggs till.
- **Inget ska "bebisifieras".** Ackordnamn och teori finns kvar; hjälpen är att ackordtoner lyser, Snappa till ackord och 💡 Föreslå.
- **Barns röster sparas aldrig i webbläsaren.** Loopar, egna ljud och röstklipp ligger bara i minnet. Det som blir kvar är det eleven själv laddar ner: mp3 eller projektfil. Inget ljud skickas någonstans.
- **Gamla delningslänkar ska alltid fungera.** Nytt i delningskoden läggs som en valfri extra del. Nya trumljud, pedaler (`PED`) och racknycklar (`RKK`) läggs **sist** i sina listor, bank-id:n byter aldrig nummer.
- **Tre nivåer av sparande:** delningslänken och 💾 Spara rytm bär rytm, mönster, låt, melodi, ackord, synt och pedalrader. Projektfilen bär dessutom loopar, egna ljud, röstklipp, rattrörelser och mixer. Säg i texten vad som inte följer med.
- **Allt som hörs live ska låta likadant i mp3-exporten.** Exporten bygger om ljudkedjan i en `OfflineAudioContext`, så nya ljudkällor och effekter måste gå att skapa i valfri kontext. Undantag som är bara live: TAPE STOP och BUILD-UP-knappen (🚀-raden i låten exporteras).
- **Ekokansling är alltid avstängd** för mikrofonen (den får webbläsaren att gå över till samtalsläge och förstöra ljudet i hörlurarna).
- **Alltid fyra räkningar före inspelning.** REC väcker inte stoppade loopar. Undantag: Röstloopen i synten startar direkt utan räkningar (lärarens beslut 13 nov 2026).
- **Tempot låses medan det finns loopar.**
- **Ljud start kräver ett tryck**, och allt tystnar vid stopp, paus och när fliken göms.
- **Sidan är högst 1 240 px bred** (full bredd prövades och valdes bort).
- **Ingen sidledsscroll vid 375 px.** Rutnät som inte ryms scrollar inuti sin egen panel.

## Jag kan inte lyssna

Ljuden är bara mätta (nivå, tonhöjd, inga NaN), aldrig avlyssnade. Skriv alltid "inte lyssnat på" och låt läraren bedöma klang och balans. Inget är provat med riktig mikrofon, riktiga hörlurar, Bluetooth, iPad eller Chromebook. Flera hallar och ekon samtidigt kan vara tungt på en Chromebook.

## Testning

- Starta lokal server på port 8765 och kör ett skript i taget: `NODE_PATH=/opt/homebrew/lib/node_modules node skript/test-synt.cjs` (även `test-synt-rostloop`, `test-synt-inspelning`, `-ljudbank`, `-arp-slagverk`, `-klipp`, `-effekter`, `-samplepaket`, `-kortkommandon` och `test-musiklabbet-flikar`).
- Mikrofon testas med en påhittad mikrofon (`MPTrummaskin.fakeMic`). `MPTrummaskin` har även `kod`, `avkod` och `voice` för tester.
- Förhandsfönstret döljer sidan och då stoppar `visibilitychange` maskinen. Stäng av den händelsen vid test.
- Attributnamn som `data-m` och `data-mode` har fångats av fel klickhanterare förut. Ge nya attribut egna namn.

## Beslut per del

- **Trummaskin:** 16 steg, åtta spår, åtta mönster A–H. Koklockan är borta (plats 0 på Slag är claves). Boom bap ska använda standardljuden. SYNT/GAMLA-växeln är borta.
- **Melodi:** skalorna GLAD, LUGN och MYSTISK kan inte låta fel. 12 rader, två toner samtidigt som mest. Ett tryck på en ton tar alltid bort hela tonen; längd ändras med drag på dator och ↔ på pekskärm.
- **Ackord:** färdiga gångar plus egna ackord, upp till åtta och två per takt. Ackorden är relativa tonarten.
- **Instrument:** gitarr går inte att göra bra och är borttagen. Samplade instrument väljer det klipp som ligger närmast tonen.
- **Loopstation:** fyra loopar, allt är icke-destruktivt (rådata ändras aldrig, ↶ ångrar). Knapparna ligger i grupperna REDIGERA, TON, EFFEKTER, SLICER. RÖST är färdiga rösteffekter (formant valdes bort: lät som "burk"). Raden med Spela-zoner är borttagen.
- **Effekter:** pedalraderna öppnas som en panel från sidan (från höger på dator, nedifrån på mobil), fyra platser per källa. Den ligger inte i sidans flöde.
- **Synt SM-4:** fyra spår A–D, stor LJUD-ratt, fyra huvudreglage (KLANG, FILTER, RÖRELSE, RYMD), resten under Fler inställningar. En ton per steg. Padsen är tonpads, de sexton stegen ligger på en egen rad under klaviaturen. Bara synten ser ut som ett hårdvaruinstrument, inte hela Musiklabbet. Samplepaketen ligger i synten; den gamla samplepanelen är borttagen.
- **Röstklipp:** en kopia av loopen, originalet ändras inte. Klippet loopar medan paden hålls och tystnar vid släpp.
- **Röstloop** (nov 2026, syntens egen loopstation; panelen visas när spåret har ljudet Röstklipp): 🎤 SPELA IN direkt i synten (1, 2 eller 4 takter, ingen nedräkning, stannar själv; **START VID LJUD** (förval) lyssnar direkt men loopen börjar vid första ljudet, så mikrofonens fördröjning och reaktionstiden inte ger tystnad först; DIREKT börjar exakt vid trycket), delarna hamnar genast på padsen. TON (mörk/ljus ±12, samma fart), RÖST, AUTOTUNE, NÄR PADEN HÅLLS (LOOP, HACK 1/8–1/32, FRYS), GRIND, BAKLÄNGES, DELAR 4/8/16 och LÄGG I TAKT (delarna på stegraden). Tangenterna spelar delarna i tur och ordning, som förut. Effekterna ligger i spårets `klfx` och räknas ovanpå originalet, som aldrig ändras; de följer med i delningslänk och projektfil, ljudet bara i projektfilen. Vägen från loopstationen (✂) finns kvar och nollställer effekterna. **Redigera** (som i loopstationen): dra över vågen för att markera en bit av valfri längd (en liten magnet mot 16-delslinjerna, kanterna kan dras om, ett tryck utan drag avmarkerar), ALLT / 1:A HALVAN / 2:A HALVAN / AVMARKERA, **RADERA** (tystar biten), **BESKÄR** (loopen blir bara det markerade och delas om i lika delar), **◀ ▶ FLYTTA** hela loopen ett sextondelssteg (`klfx.flytt`, ingen kopia), ↶ ÅNGRA. Radera och beskär görs på en kopia med nytt id, så ångra och originalet är säkra; en flytt bakas in vid radera/beskär.
- **Tonhöjd utan tempoändring** görs med egen kod (WSOLA) i `rostloop.js`. Inget bibliotek: de bra som finns har licenser som inte passar. Att behålla röstkaraktären (formant) är fortfarande bortvalt.
- **Minimera-knappen** sitter uppe i högra hörnet på varje panel, gul och orange. Mixern har ingen.

## Väntar

- Effekter på mikrofoningången avråddes (rundgång utan hörlurar).
- Synten: längre toner och ackord per steg, fler röster eller lättläge, MIDI, fler motorer. Egna moduler som fil bara bakom en "Utvecklare"-flik.
- Namn på låtens delar när man själv ändrar takterna, pianorulle, melodi längre än en takt.
