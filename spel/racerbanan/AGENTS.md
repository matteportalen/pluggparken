# Racerbanan

Startsidan ska kännas som en illustrerad spelöppning i samma familj som Glödväktaren, med Racerbanans egen racingidentitet. Behåll fullskärmsbild, ritad titel, få huvudval och depåpanelerna för bil/färg, lopp och matematik. Gör inte om den till en lång landningssida med alla inställningar utspridda.

Behåll `mattespel-spel-v1`, gamla mynt/bilköp/rekord och andra Spelhörnan-data. Loppet ska fortsätta när tal visas: nästa tal direkt efter föregående skylt, svar först vid passage, ingen automatisk mattepaus. Rekordspöket finns kvar.

Lack färgas selektivt i `vehicleSprite`; använd inte hue-rotate över hela bilen. Gul måste vara gul på alla sex fordon, medan glas, däck, metall och alfa bevaras. Titelskärm, garage och lopp ska visa samma valda bil/färg.

Kontrollera mobil, liggande skärm, tangentbordsfokus, Escape, depåns sparade val och retur från lopp. Uppdatera `../../docs/spel.md` och `bilder/PRODUKTION.md` när struktur eller artwork ändras. Skilj push från lyckad Pages-publicering.

Fartkänslan i `fartkansla.js` är presentation. Ändra inte `R.speed`, sträcka eller svarstid för att förstärka den. Behåll gemensam projektion för bilar/väg/hinder/svar och använd den för pekstyrning. Vägkantens föremål har stabila fröbaserade världspositioner; låt dem inte slumpas om per bildruta. Kamerarörelse och fartstreck ska respektera reduced-motion. Ljud använder separat `Ljud.rally`; ändra inte äldre `Ljud.engine` för detta spel. Körmeddelanden får inte täcka uppgiften.

Myntresponsen i `myntkansla.js` är presentation: bokför alltid belöningen direkt i `R.coins`, aldrig när animationen anländer. Behåll paus, mål/omstart och reduced-motion utan dubbla belöningar. Myntljud använder `Ljud.rally` och effekter får inte skymma matematiken.

Vägfärg och filstreck ska delas vid fasta världsgränser och interpoleras i projektionen; avrunda inte deras placering till kamerans segment. Båda närhörnen för ett filstreck använder samma filoffset, med endast linjebreddens tecken olika.
