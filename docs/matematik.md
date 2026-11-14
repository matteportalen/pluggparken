# Matematik

_Det som gäller nu för matteövningarna, verktygen och Nationella prov. De pedagogiska grundbesluten står i `CLAUDE.md` och gäller före allt här. Hur varje övning byggdes, alla nivåer och tal står i `docs/historik/matematik.md` (sök där med `grep -n "ord" docs/historik/matematik.md`, läs inte hela)._

## Var ligger vad

| Mapp | Övning | localStorage-nyckel |
| --- | --- | --- |
| `lillaplus/` | Lilla plus & minus (0–10), Hönsgården | `mattespel-lillaplus-v1` |
| `tiointe/` | 10 eller inte 10? (snabbseende av tiokompisar) | `mattespel-tiointe-v1` |
| `tiotal/` | Tiotalsövergång, Bussen | `mattespel-tiotal-v1` |
| `uppstallning/` | Uppställning, addition och subtraktion med växling | `mattespel-uppstallning-v1` |
| `multiplikation/` | Tabellerna, Bageriet | `mattespel-multiplikation-v1` |
| `division/` | Division, Kalaset | `mattespel-division-v1` |
| `delaupp/` | Dela upp och dela (uppdelningsstrategin med klossar) | `mattespel-delaupp-v1` |
| `kortdivision/` | Kort division | `mattespel-kortdivision-v1` |
| `hundraruta/` | Hundrarutan: verktyget (`#verktyg`), Tio hopp, Trasig hundraruta | `mattespel-hundraruta-v1` |
| `talfoljd/` | Talföljder, grodan | `mattespel-talfoljd-v1` |
| `prickatalet/` | Pricka talet (placera tal på tallinjen, uppskatta) | `mattespel-prickatalet-v1` |
| `diagram/` | Diagramverkstan (sortera, bygg och läs av stapeldiagram) | `mattespel-diagram-v1` |
| `vagen/` | Vågen (likhetstecknets betydelse) | `mattespel-vagen-v1` |
| `gomda/` | Gömda tal | `mattespel-gomda-v1` |
| `brak/` | Bråk med pizza, chokladkaka och rulltårta | `mattespel-brak-v1` |
| `brakbitar/` | Bråkbitarna | `mattespel-brakbitar-v1` |
| `klockan/` | Klockan, Stationen | `mattespel-klockan-v1` |
| `matning/` | Mätning: längd, vikt, volym | `mattespel-matning-v1` |
| `geometri/` | Geometri, Tangram, Spegelmåla (galleri i `matteportalen-galleri`) | `mattespel-geometri-v1` |
| `rutnat/` | Rutnät och koordinater (skattkartan) | `mattespel-rutnat-v1` |
| `verktyg/` | Verktygslådan: Klockan, Kulramen, Bråkväggen, Tallinjen, länkar till Hundrarutan, Tiobas och Spegelmåla. Inga stjärnor, sparar inget. | – |
| `tiobas/` | Tiobas (nås bara via Verktygslådan) | – |
| `taluppfattning/` | Bedömningsstöd åk 1 och 2 | `mattespel-taluppfattning-v1` |
| `np3/` | Nationella prov åk 3 | `np3-resultat`, `np3-svar`, `np3-rit`, `np3-direkt`, `np3-zoom` |

Delade ritningar i roten, inga kopior i sidorna: `klocka.js`, `vag.js`, `brak.js`, `klossar.js`, `bitar.js`, `film.js`, `djur.js`.

## Regler som gäller alla matteövningar

- **Fullt ut på mobil och surfplatta.** Sifferknappsats med 1 2 3 överst.
- **Rundor om 6–10 uppgifter.** Stjärnor: 3 utan fel, 2 vid högst 2 fel, annars 1.
- **Fel svar:** en ledtråd först, andra felet visar svaret med förklaring, och uppgiften kommer tillbaka i slutet av rundan (högst 3).
- **Uppgifterna genereras och kontrolleras i mängd** (tusentals) så att varje uppgift har exakt ett svar. Svarsalternativ är aldrig likvärdiga (inte både 3/6 och 1/2).
- **Inget i bilden eller ordningen får avslöja svaret:** svarsrutor i blandad ordning, rest-rutor ovanför alla siffror, frågan "Blir det något över?" ställs alltid.
- **Öva blandar in öppna utsagor** (`__ + 4 = 9`) och "Stämmer det?", som inte räknas till medaljerna.
- **Verktyg sparar inget och ger inga stjärnor.** På dator ska verktyget och knapparna synas i samma bild utan att skrolla.
- **Genomgångar ligger bakom den lilla knappen "🎬 Se hur man gör"** ovanför rubriken, aldrig öppet överst. Filmerna följer mallen i `film.js` (se `docs/design.md`).
- **Startskärmar ska vara korta:** nivåer som kompakta kort eller listor (exempel, namn, stjärnor), beskrivningen först på lägesskärmen.
- **Kortbilder är en miniatyr av övningen**, aldrig en generisk bild.
- **Gamla stjärnor räknas alltid vidare** när en nivå tas bort eller slås ihop.
- **Mynt:** ny stjärna 20, avklarad runda 6, dagens första runda +10.

## Beslut per övning

- **Tiotalsövergång:** följer bokens steg, inga blandade uppgifter. 💯 Hundrarutan finns alltid som hjälp, visar aldrig svaret och påverkar inte stjärnorna.
- **Hundrarutan:** alltid 1 överst. Styrkors för hoppen, gröna pilar för plus och röda för minus.
- **Tallinjen:** 0–10, 0–20 eller 0–100, inte 1000 och ingen tom tallinje. Alla bågar ovanför linjen.
- **Pricka talet** (nov 2026): eleven ställer sitt djur på tallinjen och trycker Klar. Talet där djuret står visas aldrig medan man drar. Sex nivåer: 0–10 och 0–20 (alla streck, exakt), 0–100 (tiotalsstreck, ±3), Vilket tal? (tvärtom, knappsats), Tom tallinje 0–100 (±6) och 0–1000 (±30). Första felet visar var man hamnade och åt vilket håll talet ligger, andra felet visar svaret med tiotalen utskrivna. Heter inte Tallinjen, eftersom verktyget heter så. Verktygets regel "ingen tom tallinje" gäller verktyget, inte den här övningen.
- **Diagramverkstan** (nov 2026): en runda är tre undersökningar med tre moment var (bygg + två frågor, eller tre frågor på Läs av). Blev något fel kommer en fjärde undersökning "för att öva" som inte räknas. Staplarnas värden är alltid olika, så att flest och minst har ett svar. Talen står aldrig på staplarna förrän i förklaringen. Varje tema har egna frågemeningar (`TEMAN`), så att svenskan blir rätt.
- **Kulramen:** noll = alla kulor till vänster, de röda flyttas först (lärarens val, tvärtom mot vanliga kulramar).
- **Uppställning:** se `CLAUDE.md`. Subtraktion med växling visar en liten bildruta om att man trycker på siffran till vänster.
- **Lilla plus & minus och Multiplikation, Öva:** en rad överst fylls med ett ägg (äggkartong) eller en kaka (plåt) för varje avklarad uppgift. Raden visar bara hur långt man kommit, aldrig svaret. Uppgiftens ägg visas efter ett fel, eller när eleven själv trycker på **🥚 Visa med ägg** (lärarens ja nov 2026; bara i Öva, inte på "Stämmer det?"). Har man tittat på äggen räknas uppgiften inte som "kan".
- **Rutnät och koordinater** (omgjord nov 2026): inga svarsalternativ. Eleven trycker på kartan (kryss, sedan Klar), läser av med bokstavs- och sifferknappar, eller går en väg med sitt djur. Nivå 3 är ett riktigt koordinatsystem: punkterna ligger där linjerna korsas och axlarna börjar på 0. Målet har aldrig samma värde åt båda håll, så att "du bytte plats på dem" alltid går att upptäcka.
- **Multiplikation:** överst en stor "▶ Fortsätt" som startar Öva direkt, i den föreslagna ordningen 2, 5, 10, 3, 4, 9, 6, 7, 8, 1 (inget låses). Tabellkorten öppnar Öva direkt. **Inga knep per tabell** i filmen. Uppgiften och svaret står på samma rad och plåten är högst ca 150 px, så att knappsatsen alltid syns utan att skrolla.
- **Dela upp och dela:** täljaren delas upp, aldrig nämnaren. Alltid två delar. Alla uppdelningar som går godtas. Nivån utan klossar är borttagen (det steget är Kort division).
- **Kort division:** uppställningen som i lärarens bok: svaret efter likhetstecknet, resten som en liten siffra snett ovanför nästa siffra, rest i svaret skrivs "rest". Är första siffran för liten tar man de två första direkt. Inga figurer, ingen scroll, spelet fyller fönstret.
- **Vågen:** rutan visar "?" och vågen står still tills eleven svarar; elevens tal läggs på vågen så att ett fel syns som en våg som tippar.
- **Gömda tal:** ingen våg, inga nivåer. "Samma djur är alltid samma tal" (inte "väger"). Kända djur får ingen siffra i raderna. Varje rad har exakt en ny sak, raderna blandas.
- **Bråk:** Bråkväggen och Bråkbitarna länkas inte från Bråk (rörigt och dubbelt). Bråkbitarnas fria bygge ligger i Bråkväggens Bygg-flik.
- **Klockan:** den rena vita urtavlan (en träram valdes bort). Man tar den visare man trycker närmast. Blanda allt har bara femminuterstider. Lokstallet krymper aldrig.
- **Mätning:** uppgifterna ska kräva tanke (rimligt eller orimligt, enhet saknas, sortera, räcker det), inte bara avläsning. Linjalen visar cm men är inte 1:1 med verkligheten.
- **Geometri:** Tangram har en nivå (silhuetten utan linjer). 💡 Tips påverkar stjärnorna. Spegelmåla är ett vanligt kort, ingen banner.
- **10 eller inte 10?:** bilderna är alltid i mönster, aldrig huller om buller. Efter svaret visas bilden igen med förklaring.
- **Tiobas:** ett verktyg, inte ett spel. Lådan har 10 av varje sort, eleven växlar alltid själv, sidan växlar aldrig automatiskt. Liggande läge först på mobil.
- **Nationella prov:** svar och ritningar sparas per gammalt prov, "Rätta direkt" är förvalt och kan stängas av. Rita och Kladdblock är inte en del av rättningen. Räknehjälpen har "och rest" vid division.

## Borttaget med flit (bygg inte igen)

**Spegelbilder** (välj rätt bild av fyra; Symmetri och Spegelmåla i Geometri gör samma sak bättre; `spegelbilder/` är bara en omdirigering till Geometri och nyckeln `mattespel-spegelbilder-v1` ligger kvar i stjärnräkningen och `PKEYS`), Bygg bilden i Geometri, Lätt-nivån i Tangram, mönsterbitar och fritt tangram i Verktygslådan, "Rita ovanpå", nivå 3 i Dela upp och dela, knappen "＋ Ny del", Lär-steget i Multiplikation, den stora Spegelmåla-bannern, kortet för Tiobas på startsidan, 100 överst i Hundrarutan. Se även listan i `CLAUDE.md`.

## Väntar

- Äldre mått i Mätning (tum, fot, aln, famn).
- En uppgift om hur mönsterbitarna hänger ihop, kanske i Bråk.
- Rest i Dela upp och dela, bara efter lärarens ok.
- Bredare layout på dator för matteövningarna, en i taget om det behövs.

## Utskrivbara blad som genereras (Skriv ut)

- **Hundrarutan med hål** (`skriv-ut/hundraruta.html`, lärarens önskan 14 nov 2026): en ny hundraruta med slumpade hål varje gång. Svårighet Lätt (15 hål, aldrig två intill varandra), Medel (30), Svår (50). 1, 2, 5 eller 10 blad, alla olika. **Facit sist** (4 blad per facitsida, de saknade talen i ruta). Varje blad har ett **bladnummer** (femsiffrigt) längst ner; samma nummer och svårighet ger samma blad igen (`blad(nr,svar)`, seedad slump). Svartvitt, A4, grå rutor att skriva i. Mönstret (stage + `fit()` + print-CSS) är lånat från `handstil/blad.html`: nya generatorer ska följa det.
- **Multiplikationsprov och tabellhäfte** (`skriv-ut/multiplikation.html`, lärarens önskan 14 nov 2026): *Veckans prov* (blandade uppgifter ur valda tabeller 2–12, tre kolumner, 20/30/36 eller eget antal 6–36, plats för Start/Slut/Tid/Rätt, avsett att göras på tid) och *Tabellhäfte* (ett blad per vald tabell, båda ordningarna 7 · 6 och 6 · 7). 1, 2, 5 eller 10 blad, alla olika, bladnummer som på hundrarutan. **Facit på baksidan** (kryssruta, på som standard): baksidan har **bara facit** (lärarens regel), längst ner under en streckad viklinje och **vänt upp och ner** (`.vand`, `rotate(180deg)`), så att det blir rättvänt när remsan vikts upp över framsidan; eleven skriver ut dubbelsidigt (vänd på långsidan), viker upp och rättar själv. Utan facit blir det bara framsidor. Uppgifterna läses nedåt i kolumnerna. I provet räknas 3 · 2 och 2 · 3 som samma uppgift (ingen dubblett). Division finns inte (inte beställd).

