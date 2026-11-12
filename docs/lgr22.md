# Lgr22-koppling och lärarpaket (idé, påbörjad 12 nov 2026)

_Inget är byggt på sidorna än. Det här är underlaget. Läs bara den här filen._

## Beslut (lärarens, 12 nov 2026)
- Lärarpaket vid flaggskeppsövningar (Rymdlabbet räknas som flaggskepp) och Lgr22-koppling med filter i sökningen. **Inga paket i bulk** (sminkad gris): först två provpaket (Vattnets kretslopp, Solsystemet) som läraren provar med klassen.
- Paketmall, högst en halv sida: **Vad tränas** (Lgr22-rubrik) · **Före** (gissa/fråga) · **Under** (vad ska man titta på) · **Efter** (samtalsfrågor och vanliga missförstånd). Missförstånden ska vara ett som eleverna faktiskt gör och bara gälla just den övningen. Fakta hämtas ur koden/simuleringen, inte påhittade. Markeras "granskad av ___" först när en ämneskunnig har läst.

## Så märks övningarna (viktigt: citera aldrig punkterna)
Skolverkets **rubriker** är hämtade ordagrant (12 nov 2026, `skolverket.se/.../curriculums/LGR22/GRGRBIO01`, `GRGRFYS01`, `GRGRKEM01`). **Punkterna under dem är bara omskrivna** och får inte citeras som Lgr22-text. Märk därför med rubrik + länk till Skolverkets sida, och be läraren läsa punkterna där.

NO åk 1–3 har ett gemensamt centralt innehåll (samma i biologi, fysik och kemi) med fem rubriker: *Året runt i naturen · Kropp och hälsa · Kraft och rörelse · Material och ämnen · Systematiska undersökningar.*
NO åk 4–6 delas: Biologi *Natur och miljö*, *Kropp och hälsa*, *Systematiska undersökningar och granskning av information*; Fysik *Fysiken i naturen och samhället* (+ samma undersökningsrubrik); Kemi *Kemin i naturen, i samhället och i människokroppen* (+ samma undersökningsrubrik).

## Inventering NO (Claudes bedömning, ej kontrollerad av läraren; Rymdlabbet och kroppen är inte genomlästa för detta)
| Övning | Åk 1–3 | Åk 4–6 |
| --- | --- | --- |
| Sjön | Året runt i naturen (näringskedjor); Systematiska undersökningar | Biologi: Natur och miljö |
| Vattnets kretslopp | Material och ämnen (vattnets former); Systematiska undersökningar | Kemi: Kemin i naturen… (vattnets kretslopp); Fysik: Fysiken i naturen och samhället (väder) |
| Elkretsen | Systematiska undersökningar | Fysik: Fysiken i naturen och samhället (elektriska kretsar) |
| Rymdlabbet, Solsystemet 3D | Kraft och rörelse (solsystemet, människan i rymden) | Fysik: Fysiken i naturen och samhället (dag, natt, årstider) |
| Människokroppen 3D | Kropp och hälsa | Biologi: Kropp och hälsa |
| Kontinentaldrift | (ingen) | SO/geografi, **inte verifierat mot Skolverket än** |

**Luckor** (kandidater till nya flaggskepp): åk 1–3 *Material och ämnen* (sortera material, magnet, flyta/sjunka, blandningar), *Kraft och rörelse* (tyngdkraft, balans, friktion); åk 4–6 fysik (ljus och ljud, energi), kemi (partiklar, löslighet, surt/basiskt), biologi (fotosyntes och cellandning, ekosystemtjänster). SO, matematik och svenska är inte inventerade.

## Nästa steg
1. Provpaket: Vattnets kretslopp och Solsystemet. Läraren provar. 2. Lägg ett fält `lgr22` per övning i `IDX` i `sok.js` (rubrik, ämne, årskurs) och ett filter. 3. Inventera SO, matematik och svenska på samma sätt (hämta rubrikerna från Skolverket först).

## Status (12 nov 2026)
- Provpaketen för Vattnets kretslopp och Rymdlabbet ligger på `lararpaket/index.html` (adress pluggparken.se/lararpaket/, `noindex`, inte länkad, utskriftsvänlig). Rymdlabbet-paketets uppdrag är inte kontrollerade mot lägena (Dag och natt, Årstiderna, Väg dig och hoppa) och måste granskas. Väntar på lärarens prov med klassen innan fler paket eller länkar från övningarna.
