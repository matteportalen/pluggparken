# Kapitel III – Den sjunkna staden

## Spelbar leverans och rytm
Detta är stadens första kompletta kvarter, efter båda fyrarna. Smeden pekar ut den väntande spåkvinnan. Tre kort låser upp portalen i smedjan. Torgets slussvakt introducerar saknat tal; ett urmakarhus leder via bjälkar till takdörren; en väg över taken innehåller småfiender och en valfri kista. Spegelriddaren introducerar jämförelse av uttryck. Klockverket är kvarterets mål. När det väcks sänks en gångbro över kanalen, så tillbakavägen förändras.

Fortsatta stadsdelar och en större slutboss ingår inte i detta kvarter. Det finns ett tydligt avslut med möjlighet att utforska vidare och återvända till smedjan.

## Banans mått
Samma MPPlatt-fysik och dubbelhopp som tidigare. Golv 640. Bjälkar i huset: 550, 460, 370; steg mellan 80 och 90 i höjd, plattformsbredd 180–260. Tak: 350, 290, 380; fria horisontella mellanrum 60 mellan första taken och 60 till nästa. Alla obligatoriska hopp verifieras med riktiga kontroller. Kanalen återför riddaren till stadens viloplats om man faller. Slussen sparar första viloplatsen; elden vid klocktorget kan spara den andra. Varje vakt kräver två matematikhandlingar och två svärdsträffar. Småfiender stannar helt under frågorna.

## Matematik
- Lyktan, Skuggan, Stjärnorna: addition/subtraktion/saknat tal för respektive talområde, multiplikation för valda tabellområden. Tre lösta kort, ingen tidsgräns eller livsförlust; fel visar ledtråd, och kortens framsteg sparas.
- Kuggvakten: saknat tal i ett uttryck, växlar addition och subtraktion eller placering av tom faktor i multiplikation.
- Spegelriddaren: jämför två uttryck, svara Vänster / Lika / Höger. Första mötet visar lika värde med olika uttryck. Andra paret har olika värden och varierad riktning.
- Rätt svar öppnar försvaret. Spelaren slår direkt, utan en andra mattefråga eller en tidsgräns för svärdet. Fel behåller frågan och ger stöd. UI, pekknappar och 1/2/3 fungerar parallellt.

## Art direction
Användarens uttryckliga korrigering: **dystert, soulslike, mycket mindre sagomys**. Kall våt sten, slitna tak, dimma och svarta kanaler. Dämpad kolgrå/slåblå palett; få små ljus. Ingen dekorativ överlastning av kugghjul. Den stora mörka klockan ska alltid kunna läsas som målet i bakgrunden. Dess visare och urtavlans tillstånd ritas i spelet; de börjar röra sig när mekanismen startar. Den spelbara tornmekanismen och vaktens sköld är de funktionella platser där kugghjul används.

Spåkvinnan är huvtäckt med ansiktet i skugga, en sliten sjal och bleka kort. Kortens motiv och text är kodritade och hålls läsbara på mobil. Rösten är ett kort ordlöst mummel. Scenen stannar medan eleven läser.

## Produktionsmanifest
Alla nya rastertillgångar skapades med **OpenAI image_gen, inbyggda verktyget**, och kopierades till denna mapp. Ursprungsexporterna ligger under Codex generated_images/01a1ad68-5c6a-7ec2-97c1-707715721bda. PNG-exporterna är oförändrade; storlek/placering görs vid rendering. Husets nedre murverk återanvänds också som textur på takvägens fasader, med separat kodritad kollisionskant. Bakgrunder har ingen kollision; husets dörr och de separata spelbara taken/bjälkarna definieras i koden. Alfa verifierad för de transparenta tillgångarna.

| Fil | Roll | Format och pivot | Källa |
| --- | --- | --- | --- |
| city-landscape-v2.png | Stadens faktiska bakgrund, mål i fonden | 1774×887, opak, långsam parallax, mjuk skalning | exec-78aae1dd-b1cb-407e-a69b-25ca0078ba06.png |
| workshop-landscape-v2.png | Faktisk interiör i urmakarhuset | 1774×887, opak, fast rum | exec-0b69d58e-842b-4b50-bb41-165b913def40.png |
| oracle-v2.png | Spåkvinnan och hennes bord i smedjan | 1234×1275, nativ alfa, botten mitt | exec-48c93ebc-3ca8-466b-b011-4e8770da8eb5.png |
| city-house-v2.png | Interaktivt hus, dörr i mitten | 1024×1536, nativ alfa, botten mitt | exec-eaf5ecae-b928-472c-8b05-f49e07bb6eae.png |

Tidiga ljusa varianter av staden och spåkvinnan valdes bort efter användarens återkoppling och ingår inte i spelet.

## Slutlig promptuppsättning
Prompterna normaliseras här till sitt produktionsinnehåll och bindande krav.

1. **Stad:** Production backdrop for a sombre soulslike 2D side-view adventure, wide 2:1. Abandoned medieval stone canal city after rain under an overcast night sky. Oppressive gothic architecture, crooked slate roofs, buttresses, crumbling wet masonry, drowned staircases, cold black water, mist, massive distant bell tower with a dark blank clock face. Bleak, mournful, ancient and restrained. Desaturated charcoal, slate blue, iron grey, petrol; only two tiny dirty amber windows. Detailed painterly pixel-inspired HD2D. Lower quarter empty dark fog for actual terrain. No decorative gears/cogs/brass, steampunk, cozy cottages, flowers, moon spotlight, characters, UI, text or foreground platforms.
2. **Spåkvinnan:** Production transparent 2D NPC, mysterious aged female seer seated behind a narrow battered wooden table. Charcoal and faded violet hood/shawl, face mostly hidden, pale stern profile facing left, long fingers, three worn ivory cards, one tiny guttering tallow candle in iron holder. Austere, melancholy, grounded medieval material, dark HD2D. Full figure and table isolated with native alpha. No friendly cozy grandmother, gold decoration, embroidery stars, crystal ball, saturated colors, glitter, background, text or UI.
3. **Urmakarens hus, interiör:** Production background, abandoned medieval clock keeper's house, cold damp stone, age-blackened beams, rain-streaked gothic window at upper left, distant roofs outside, dismantled pendulum clock on right, dusty workbench, sparse tools, one tiny dim candle, grey cloth. Sombre soulslike, charcoal/slate/petrol palette, detailed painterly HD2D, side elevation, wide 2:1, dark lower quarter. No cute cozy room, gold ornaments, floating gears, steampunk, people, text, UI or foreground platforms.
4. **Hus, exteriör:** Production isolated transparent 2D building, one narrow abandoned medieval stone clock keeper's house, front elevation, full foundation to chimney. Asymmetrical broken slate roof, wet cold grey masonry, dark gothic windows, open black arched doorway at ground center. Desaturated detailed HD2D, width:height about 2:3. No gears, decorative clock faces, brass, cozy lights, flowers, scenery, people, text or UI.

## Acceptans
Riktiga genomspelningar täcker kortens felsvar/återupptagning, portal, två olika fiendemekanismer, klättring, takväg, kista, klocka, tillbakabro och sparning. Frågegeneratorerna verifieras matematiskt. Alla fyra matteval och stående/liggande mobil kontrolleras. In-game skärmbilder används för att bedöma klockans placering, grafisk sammanhållning och kollisionsytor, inte bara conceptbilder.
