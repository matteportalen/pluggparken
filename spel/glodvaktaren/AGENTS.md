# Arbete i Glödväktaren

Läs `KVALITET.md` före ändringar i spelet. Dokumentet samlar lärarens tidigare rättningar och gäller även nya kapitel. Håll rumsgraf, ledtrådar, lokal artwork och sparformat dokumenterade i `../../docs/spel.md` och bildmanifesten.

Bevara riddaren, verkliga portalpositioner och tidigare kampanjer. Provspela ändrade resvägar och pussel med riktiga inmatningar, även mobil; kontrollera fel svar och återupptagning. Förklara skillnaden mellan push och lyckad Pages-publicering i leveransen.

Touchstyrningen är lokal i `mobilkontroller.js`: separata pointer-ID:n, glidning över vänster/höger, hopp till höger och inga dubbla syntetiska klick. Rensa pekinmatning vid paus/resväxling. Behåll fysikens befintliga hoppbuffert och coyote time i gemensamma plattformsmotorn; ändra inte andra spel för lokal kontrollayout. Situationsetiketter ska följa samma avstånd/höjd som verklig interaktion, även i Djupen. Landskapshöjden räknar bort verklig sidtopprad och safe-area.
