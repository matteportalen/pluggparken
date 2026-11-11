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
| `vagen/` | Vågen (likhetstecknets betydelse) | `mattespel-vagen-v1` |
| `gomda/` | Gömda tal | `mattespel-gomda-v1` |
| `brak/` | Bråk med pizza, chokladkaka och rulltårta | `mattespel-brak-v1` |
| `brakbitar/` | Bråkbitarna | `mattespel-brakbitar-v1` |
| `klockan/` | Klockan, Stationen | `mattespel-klockan-v1` |
| `matning/` | Mätning: längd, vikt, volym | `mattespel-matning-v1` |
| `geometri/` | Geometri, Tangram, Spegelmåla (galleri i `matteportalen-galleri`) | `mattespel-geometri-v1` |
| `spegelbilder/`, `rutnat/` | Spegelbilder, Rutnät och koordinater | `mattespel-<namn>-v1` |
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
- **Kulramen:** noll = alla kulor till vänster, de röda flyttas först (lärarens val, tvärtom mot vanliga kulramar).
- **Uppställning:** se `CLAUDE.md`. Subtraktion med växling visar en liten bildruta om att man trycker på siffran till vänster.
- **Multiplikation:** överst en stor "▶ Fortsätt" som startar Öva direkt, i den föreslagna ordningen 2, 5, 10, 3, 4, 9, 6, 7, 8, 1 (inget låses). Tabellkorten öppnar Öva direkt. **Inga knep per tabell** i filmen.
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

Bygg bilden i Geometri, Lätt-nivån i Tangram, mönsterbitar och fritt tangram i Verktygslådan, "Rita ovanpå", nivå 3 i Dela upp och dela, knappen "＋ Ny del", Lär-steget i Multiplikation, den stora Spegelmåla-bannern, kortet för Tiobas på startsidan, 100 överst i Hundrarutan. Se även listan i `CLAUDE.md`.

## Väntar

- Äldre mått i Mätning (tum, fot, aln, famn).
- En uppgift om hur mönsterbitarna hänger ihop, kanske i Bråk.
- Rest i Dela upp och dela, bara efter lärarens ok.
- Bredare layout på dator för matteövningarna, en i taget om det behövs.
