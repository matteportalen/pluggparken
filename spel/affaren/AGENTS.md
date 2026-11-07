# Affären

Behåll `mattespel-affaren-v1`, köpta avdelningar, inredning, priser, stamkundsrelationer, stjärnor och sparpengar. Ingen migrering som nollställer elevernas butik.

Spelet använder egen HTML/JS, inget nytt motorberoende. Målad gouachemiljö och separata lokala bildlager ska synas under spel, inte bara på startsidan. Använd befintlig CSS/JS för prislappar, siffror, pengar och tillgängliga kontroller. Bildfamiljen dokumenteras i `bilder/PRODUKTION.md`.

Automatisk påfyllning är ett frivilligt kassaläge: gratis leveranser innan dagens utbud väljs och mellan kunderna. Manuell lagerhantering betalas som tidigare. Beskriv skillnaden tydligt; inget läge får oförutsett tömma sparpengarna. Gamla sparningar behåller manuellt läge tills eleven väljer annat.

Kundärendets varor plockas på de verkliga hyllorna. Alla varor måste vara nåbara även på 320 px och vid full utbyggnad; varken skanner, personer, skyltar eller dekor får täcka klickytorna. Testa träffytor, inte bara sidledsscroll. Skanning ska fungera med dragning, tryck och tangentbord. Ingen lager-/belöningsändring innan köpet är klart, inga dubbla kvitton.

Kör `skript/test-affaren-arenden.cjs` och `skript/test-affaren-butik.cjs` med lokal server och Playwright. Kontrollera dator/mobil, alla nivåer, fel svar, gratis leveranser med tom kassa, manuella inköp och återupptagning. Uppdatera `docs/spel.md` efter ändringar.

Läraren valde att behålla den tidigare målade stilen efter att ha övervägt en verklighetstrogen närbutik. Gör ingen sådan stiländring utan ny instruktion. Nya inredningsbilder ska matcha den befintliga lokalen. Bordsprylars och kassans fotpunkt ska ligga på den synliga träskivan, inte på diskbildens transparenta överkant. Behåll den lugna bakgrunden utanför den tydligt inramade spelrutan. Testa köpbara saker även utrustade, med fullt sortiment; särskilt kassan får inte täcka en hyllvara.
