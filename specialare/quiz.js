/* Quiz till minilektionerna: QUIZ[id] = [[fråga, rätt svar, fel, fel, förklaring], …]. Svaren slumpas av sidan. */
var QUIZ={
"titanic":[
["Ungefär hur lång var Titanic?","Ungefär 270 meter","Ungefär 100 meter","Ungefär 500 meter","Det är nästan tre fotbollsplaner efter varandra. När hon byggdes var hon världens största skepp."],
["Vad körde Titanic in i på sin första resa 1912?","Ett isberg","Ett annat skepp","Ett korallrev","Hon skrapade längs isberget så att flera av de vattentäta rummen fick hål och fylldes med vatten."],
["Hur många platser fanns det i livbåtarna jämfört med alla som var ombord?","Ungefär hälften av vad som behövdes","Precis lika många som människorna","Fler än vad som behövdes","Det fanns platser för ca 1 200 av drygt 2 200 människor. De gamla reglerna räknade på fartygets storlek, inte på hur många som var ombord. Efter Titanic ändrades de."]
],
"bermuda":[
["Mellan vilka tre platser brukar Bermudatriangeln ritas?","Florida, Bermuda och Puerto Rico","Island, Skottland och Norge","Hawaii, Japan och Guam","Triangeln ligger i västra Atlanten. Den är inte ett officiellt område, så gränserna ritas lite olika."],
["Hur ofta försvinner skepp och flygplan där jämfört med andra hav med lika mycket trafik?","Inte oftare än på andra hav","Mycket oftare än någon annanstans","Aldrig, det är bara en saga","Försäkringsbolaget Lloyd’s tar inte ut något extra pris för området. Olyckor sker, men inte fler än på andra hav med mycket trafik."],
["Varför försvann flygplansgruppen Flight 19 år 1945, tror experterna?","De gick vilse och fick slut på bränsle","De flög in i ett osynligt kraftfält","De blev beskjutna av en annan stat","Piloterna hade tappat orienteringen över havet och bränslet tog slut. Vädret försämrades också. Det mest spännande är ofta inte det som är sant."]
],
"himlen":[
["Vilken färg på solljuset sprids mest i luften?","Blått","Rött","Gult","Blått ljus har korta vågor och sprids ungefär sex gånger mer än rött. Därför lyser hela himlen blå."],
["Varför blir solnedgången röd och orange?","Ljuset går en lång väg genom luften och blått sprids bort","Solen blir varmare och rödare på kvällen","Molnen färgar ljuset när det blir mörkt","När solen står lågt måste ljuset passera mycket mer luft. Det blåa har då spridits åt sidan, och det röda hinner fram."],
["Vilken färg har himlen mitt på dagen på månen?","Svart","Blå","Röd","Månen har ingen luft som kan sprida ljuset. Därför är himlen svart även när solen lyser."]
],
"marianer":[
["Hur djupt är Marianergraven, den djupaste platsen i havet?","Nästan 11 kilometer","Ungefär 3 kilometer","Ungefär 6 kilometer","Det djupaste stället heter Challengerdjupet och är runt 10 900 meter djupt."],
["Om Mount Everest stod på botten av graven, hur långt under ytan skulle toppen ligga?","Mer än 2 kilometer","Precis vid ytan","1 kilometer ovanför ytan","Everest är 8 849 meter högt och graven är drygt 10 900 meter djup. Det blir ungefär 2 kilometer över."],
["Vad har man hittat även längst ner i Marianergraven?","Plastskräp","Guld och juveler","Fossil av dinosaurier","Forskare har hittat plastpåsar långt ner i djuphavet. Skräp når även platser som nästan ingen har besökt."]
],
"vulkan":[
["Vad heter den heta, smälta stenen inne i jorden?","Magma","Aska","Pimpsten","Magma är smält sten under jordytan. När den kommer upp ur vulkanen kallas den lava."],
["Var på jorden hittar man många vulkaner?","Där jordplattor möts eller glider isär","Där havet är som kallast","Där det finns mest sand","Magman kan tränga upp i skarvarna mellan plattorna. Många vulkaner ligger därför i långa rader."],
["Vilket land ligger mitt på en glipa mellan två jordplattor och har både vulkaner och gejsrar?","Island","Danmark","Spanien","Island ligger där den nordamerikanska och den eurasiska plattan glider isär några centimeter om året."]
],
"svartahal":[
["Vad kallas gränsen runt ett svart hål som inget ljus kommer ut ifrån?","Händelsehorisonten","Ljusmuren","Magnetgränsen","Utanför den kan man fortfarande komma loss. Innanför kommer inte ens ljuset ut."],
["Hur bildas många svarta hål?","När en mycket stor stjärna dör och trycks ihop","När två planeter krockar med hög fart","När en komet brinner upp i rymden","När en tung stjärna får slut på bränsle trycks den ihop och blir så tät att tyngdkraften vinner över allt."],
["Om solen blev ett svart hål med samma tyngd, vad skulle hända med jordens bana?","Jorden skulle gå kvar i sin bana","Jorden skulle sugas in direkt","Jorden skulle slungas ut i rymden","Tyngdkraften långt bort är densamma. Ett svart hål är ingen dammsugare, det är bara farligt nära."]
],
"dinosaurier":[
["När dog de flesta dinosaurierna ut?","För ungefär 66 miljoner år sedan","För ungefär 6 000 år sedan","För ungefär 100 år sedan","Dinosaurierna levde i över 160 miljoner år. Människan finns bara sedan ungefär 300 000 år."],
["Vad tror forskare orsakade att dinosaurierna dog ut?","En asteroid som slog ner på jorden","Att alla blev utan mat i en torka","En enda stor översvämning","Nedslaget fick himlen att mörkna och klimatet att förändras. Många växter och djur försvann."],
["Vilka av dagens djur är släkt med dinosaurierna?","Fåglar","Grodor","Fladdermöss","Fåglarna härstammar från små fjäderklädda dinosaurier. En kyckling är ganska nära en levande dinosaurie."]
],
"pyramid":[
["Vilken pyramid i Giza är störst?","Cheopspyramiden","Kleopatras pyramid","Tutankhamons pyramid","Cheopspyramiden är ungefär 146 meter hög och byggdes av ca 2 miljoner stenblock."],
["Hur tror forskare att pyramiderna byggdes?","Arbetare drog stenblocken på släde uppför ramper","Med stora kranar av järn och trä","Med hjälp av elmotorer och vajrar","Man har hittat teckningar och rester av ramper. Arbetarna var skickliga hantverkare med fast lön."],
["Mot vad är pyramidens sidor riktade nästan exakt?","Väderstrecken: norr, söder, öster och väster","Mot Nilens källa långt i söder","Mot staden Mecka i öster","Egyptierna mätte noga med stjärnor och solen. Fel i väderstrecken är bara en liten bråkdel av en grad."]
],
"blaval":[
["Vilket är det tyngsta djur som någonsin har levt?","Blåvalen","Elefanten","Tyrannosaurus","Blåvalen kan bli 30 meter lång och väga omkring 150 ton. Det är mer än många dinosaurier."],
["Vad äter blåvalen?","Krill, små räkliknande djur","Stora hajar","Sälar och pingviner","Den filtrerar krill ur vattnet och kan äta flera ton om dagen. Munnen är stor men svalget är smalt."],
["Hur mycket väger blåvalens hjärta ungefär?","Ungefär 180 kilo","Ungefär 2 kilo","Ungefär 20 kilo","Det är tungt som tre vuxna människor. Hjärtat slår bara några gånger i minuten när valen dyker."]
],
"manen":[
["Hur lång tid tar det för ljuset från månen att nå jorden?","Drygt 1 sekund","Åtta minuter","En timme","Månen är cirka 384 000 km bort. Ljus färdas 300 000 km på en sekund, så det tar drygt en sekund."],
["Varför ser vi alltid samma sida av månen?","Den snurrar ett varv på samma tid som den går runt jorden","Den andra sidan är alltid mörk","Månen snurrar inte alls runt sig själv","Den bortre sidan är inte mörk. Den får lika mycket solljus, men vi ser den aldrig från jorden."],
["Hur långt flyttar sig månen bort från jorden varje år?","Ungefär 4 centimeter","Ungefär 4 meter","Ungefär 4 kilometer","Ungefär så fort som en nagel växer. Det har man mätt med speglar som astronauter lämnade på månen."]
],
"regnbage":[
["Vad händer med ljuset när det går in i en regndroppe?","Det böjs och delas upp i färger","Det försvinner helt i droppen","Det blir svart när det blir blött","Ljuset bryts, studsar mot baksidan av droppen och bryts igen. Varje färg böjs lite olika mycket."],
["Var måste solen stå för att du ska kunna se en regnbåge?","Bakom dig","Framför dig","Rakt ovanför dig","Du ska ha solen i ryggen och regnet framför. Då träffar det studsade ljuset dina ögon."],
["Hur ser en regnbåge ut om man tittar på den från ett flygplan?","Som en hel cirkel","Som en rak linje","Som en prick","Marken skymmer nedre halvan, så vi ser bara en båge. Uppifrån kan man se hela ringen."]
],
"bin":[
["Hur berättar ett bi för de andra var blommorna finns?","Med en liten dans","Med en sång","Med en karta av vax","Biet gör en vaggdans. Riktningen och hur länge den varar visar åt vilket håll och hur långt det är."],
["Vem lägger äggen i bikupan?","Drottningen","Arbetarbina","Drönarna","Drottningen kan lägga över 1 000 ägg på en enda dag, hela sommaren."],
["Hur mycket honung gör ett bi under hela sitt liv?","Ungefär en tolftedels tesked","En hel burk, ungefär 400 gram","Tre matskedar, ungefär 45 gram","Det går åt väldigt många bin för en burk honung. Varje bi bidrar med en liten bit."]
],
"vasa":[
["Vad hände med Vasa på jungfrufärden 1628?","Hon sjönk efter några hundra meter","Hon blev kapad av pirater","Hon kom fram till Danmark","Hon vältes av en vindpust och vatten rann in genom kanonportarna. Hon var för smal och tung högt upp."],
["Hur länge låg Vasa på botten?","Mer än 300 år","Ungefär 30 år","Ungefär 3 år","Hon lyftes 1961 efter 333 år på botten. Idag står hon på Vasamuseet i Stockholm."],
["Varför klarade sig träet så bra på botten?","Skeppsmasken trivs inte i Östersjöns vatten","Havsbotten var varm och torr","Skeppet var täckt av ett guldlager","Skeppsmasken äter trä men klarar inte det bräckta vattnet i Östersjön. I salt hav hade skrovet ätits upp."]
],
"everest":[
["Hur högt är Mount Everest ungefär?","8 849 meter","4 000 meter","12 000 meter","Det är det högsta berget över havet. Kebnekaise är bara ungefär 2 100 meter."],
["Vem nådde toppen först 1953?","Edmund Hillary och Tenzing Norgay","Roald Amundsen och Robert Scott","Neil Armstrong och Buzz Aldrin","Tenzing var en sherpa. Sherpafolket hjälper klättrare med bagage, vägar och rep."],
["Varför blir Everest fortfarande högre?","Två jordplattor trycker ihop varandra","Snön fryser till högre lager","Vinden blåser upp sand","Den indiska plattan trycker mot den asiatiska. Berget växer cirka 4 millimeter per år."]
],
"illusioner":[
["Varför luras vi av optiska illusioner?","Hjärnan gissar och fyller i vad ögonen ser","Ögonen är dåliga på att se rätt","Bilderna på papperet är trasiga","Hjärnan tolkar bilden snabbt med hjälp av vad den lärt sig. Ibland blir gissningen fel."],
["Vad får två lika långa linjer att se olika långa ut i Müller-Lyer-illusionen?","Pilspetsarna i ändarna","Färgen på linjerna","Tjockleken på pappret","Spetsarna pekar in eller ut. Hjärnan tolkar det som avstånd och tror att linjerna är olika långa."],
["Samma grå ruta ser ljusare ut mot en mörk bakgrund. Vad visar det?","Hjärnan jämför med omgivningen","Rutan ändrar färg","Ögat vet exakt hur ljus rutan är","Vi ser inte färger som de är utan hur de ser ut jämfört med det som finns runtom."]
],
"dygn":[
["Hur lång är ett dygn på Mars ungefär?","24 timmar och 37 minuter","Ungefär 12 timmar och 5 minuter","Ungefär 3 dygn och 7 timmar","Mars snurrar nästan lika fort som jorden. Marsdagen kallas sol och är 40 minuter längre än vår."],
["Vilken planet snurrar ett varv fortast?","Jupiter, ungefär 10 timmar","Venus, ungefär 5 timmar","Jorden, 24 timmar","Jupiter är elva gånger bredare än jorden men snurrar ändå ett varv på bara ungefär 10 timmar."],
["I vilket väderstreck går solen upp på Venus?","I väster","I öster","I norr","Venus snurrar åt andra hållet jämfört med jorden. Dessutom tar ett varv över 240 jorddygn."]
],
"antarktis":[
["Vilken är den lägsta temperaturen som uppmätts på jorden, ungefär?","Minus 89 grader","Minus 40 grader","Minus 20 grader","Den uppmättes i Antarktis, vid den ryska forskningsstationen Vostok."],
["Vilket av djuren finns vid sydpolen men inte vid nordpolen?","Pingvinen","Isbjörnen","Valrossen","Pingviner bor på södra halvklotet. Isbjörnar bor på norra, vid Arktis."],
["Hur tjock är isen på sina tjockaste ställen?","Nästan 5 kilometer","Ungefär 50 meter","Ungefär 500 meter","Så mycket is att en stor del av kontinentens berg döljs. Det är det mesta sötvattnet på jorden."]
],
"snabbast":[
["Vilket djur är snabbast i hela världen?","Pilgrimsfalken","Geparden","Seglarfisken","När den störtdyker mot ett byte kan den komma upp i över 300 kilometer i timmen."],
["Hur snabbt kan en gepard springa, som mest?","Ungefär 100 km/h","Ungefär 20 km/h","Ungefär 300 km/h","Men bara en kort stund. Efter en sprint på några hundra meter måste den vila."],
["Hur snabbt springer den snabbaste människan, som mest?","Ungefär 44 km/h","Ungefär 100 km/h","Ungefär 20 km/h","Så fort sprang Usain Bolt under ett världsrekordlopp. Geparden hade tagit en kilometer på 36 sekunder."]
],
"hjarnan":[
["Hur stor del av hjärnan är vatten?","Ungefär tre fjärdedelar","Ungefär en tiondel","Nästan ingenting","Hjärnan är mjuk som gelé eftersom den mest består av vatten, ca 75 procent."],
["Hur snabbt kan en signal färdas i en nervcell?","Över 100 meter per sekund","Ungefär 1 meter per sekund","Ungefär 10 meter i timmen","Signalerna är elektriska och går snabbt. Därför hinner du dra bort handen från något hett."],
["Hur mycket energi behöver hjärnan?","Lika mycket som en svag glödlampa","Lika mycket som en dammsugare","Nästan ingenting","Hjärnan använder cirka 20 watt, men det är en femtedel av kroppens energi."]
],
"kroppen":[
["Hur många ben har en vuxen människa?","206","60","1 000","Bebisar föds med omkring 300 ben. Många växer ihop medan vi växer."],
["Hur mycket blod pumpar hjärtat runt per minut?","Ungefär 5 liter","Ungefär en tesked","Ungefär 100 liter","Hela blodmängden hos en vuxen är ungefär 5 liter och den hinner runt hela kroppen på en minut."],
["Vilket sinne är kopplat nära minnescentrum i hjärnan?","Luktsinnet","Synen","Hörseln","Därför kan en doft ge en stark minnesbild av något som hände för länge sedan."]
],
"blixt":[
["Hur varm är en blixt ungefär?","Ungefär 30 000 grader","Ungefär 100 grader","Ungefär 1 000 grader","Det är mycket varmare än solens yta, som är ungefär 5 500 grader."],
["Du ser en blixt och hör dånet tre sekunder senare. Hur långt bort slog den ned?","Ungefär 1 kilometer","Ungefär 3 kilometer","Ungefär 100 meter","Ljud går ca 340 meter på en sekund. Tre sekunder blir ungefär en kilometer."],
["Vad är åskdånet egentligen?","Luft som hettas upp så fort att den smäller","Moln som slår ihop och krockar","Isbitar som faller från himlen","Blixten hettar upp luften på sin väg på en bråkdel av en sekund. Luften sprängs utåt och det hörs som en smäll."]
],
"stora-tal":[
["Hur lång tid tar det att räkna till en miljon med en sekund per tal?","Ungefär 11 dygn","Ungefär 1 timme","Ungefär 1 år","En miljon sekunder är drygt 11 och ett halvt dygn, om man räknar utan att sova."],
["Hur lång tid tar det att räkna till en miljard med en sekund per tal?","Ungefär 32 år","Ungefär 3 månader","Ungefär 300 år","Det är faktiskt 1 000 gånger längre än en miljon. Att räkna till en miljard räcker nästan ett halvt liv."],
["Vad betyder ordet billion på engelska?","En miljard","En biljon","En miljon","Svenska biljon motsvarar engelska trillion. Så en engelsk billion är bara en svensk miljard."]
],
"kontinenter":[
["Vad hette den stora kontinenten där alla landmassor satt ihop?","Pangea","Atlantis","Lemuria","Pangea fanns för ca 300 miljoner år sedan. Sedan gled kontinenterna isär."],
["Vilka två kontinenter passar ihop som pusselbitar?","Sydamerika och Afrika","Asien och Australien","Europa och Antarktis","Kusterna passar nästan exakt. Det var ett av de första tecknen på att kontinenterna flyttar sig."],
["Hur fort rör sig jordplattorna ungefär?","Några centimeter om året","Några meter om dagen","Några kilometer i timmen","Ungefär så fort som nageln växer. På miljoner år blir det tusentals kilometer."]
],
"norrsken":[
["Vad skapar norrsken?","Partiklar från solen som träffar gas i luften","Månens sken som speglas i molnen","Nordpolens isar som lyser i mörkret","Partiklarna kommer med solvinden. När de krockar med syre och kväve i luften sänds ljus ut."],
["Vilken gas ger det gröna norrskenet?","Syre","Kväve","Helium","Syre ger grönt och ibland rött. Kväve ger blått och lila."],
["Varför syns norrsken mest nära polerna?","Jordens magnetfält leder partiklarna dit","Där är det mörkast och längst natt","Där är det kallast på hela jorden","Magnetfältet böjer av solens partiklar. De följer fältet och hamnar i en ring kring polerna, till exempel över Kiruna."]
],
"atom":[
["Hur många atomer får plats på en rad över ett hårstrå?","Flera hundratusen","Ungefär tio","Ungefär tusen","Atomerna är så små att de inte syns i vanliga mikroskop."],
["Vad finns det mest av i en atom?","Tomrum","Fasta kulor","Vatten","Kärnan är pytteliten. Om atomen var en stor arena vore kärnan bara en ärta i mitten."],
["Varför faller du inte genom stolen när du sitter?","Elektronerna stöter bort varandra","Atomerna är fastlimmade","Stolen är hård","Elektroner har samma laddning och trycker bort varandra. Ingenting rör sig egentligen vid varandra, det är krafter."]
],
"nobel":[
["Vad uppfann Alfred Nobel?","Dynamit","Telefonen","Glödlampan","Nobel blev rik på dynamit och bestämde i sitt testamente att pengarna skulle bli ett pris."],
["När delas Nobelpriset ut varje år?","Den 10 december","Den 1 januari","Midsommar","Det är dagen då Nobel dog, 1896. Prisceremonin hålls i Stockholm, utom fredspriset som delas ut i Oslo."],
["Vem är den yngsta som fått ett Nobelpris, 17 år gammal?","Malala Yousafzai","Greta Thunberg","Albert Einstein","Malala fick fredspriset 2014 för sin kamp för flickors rätt att gå i skolan."]
],
"bitcoin":[
["Vem skapade Bitcoin?","Någon som kallade sig Satoshi Nakamoto","Elon Musk, en rik amerikan","En stor svensk bank för länge sedan","Ingen vet vem det egentligen är. Namnet är ett påhittat alias."],
["Hur många bitcoin kan det finnas som mest?","21 miljoner","1 000","Hur många som helst","Gränsen är inbyggd i koden. Den sista bitcoinen beräknas skapas runt år 2140."],
["Hur många bitcoin betalade någon för två pizzor år 2010?","10 000","1","100","Det är den första kända affären med bitcoin. Den dagen firas som Bitcoin Pizza Day."]
],
"digerdoden":[
["Hur spreds pesten?","Loppor som levde på råttor bet människor","Smittan kom med sjöfåglarna","Bärare av brev spred smittan","Loppor bar på bakterien. Smittan följde med skepp längs handelsvägarna."],
["Ungefär när kom Digerdöden till Sverige?","Runt år 1350","Runt år 1050","Runt år 1850","Pesten kom till Europa 1347 och nådde Sverige några år senare. Man tror att en tredjedel till hälften av alla dog."],
["Efter pesten fanns det färre arbetare. Vad hände med lönerna?","De steg","De sjönk","De var oförändrade","När arbetare var få blev de eftertraktade. Bönder kunde kräva högre betalning."]
],
"elfte":[
["Vilket år hände det som kallas 11 september?","2001","1991","2011","Det var en tisdagsmorgon. Många skadades och dog i USA, och världen reagerade med sorg och sammanhållning."],
["Vad finns idag där tvillingtornen stod i New York?","Ett minnesmärke med två fontäner","En stor flygplats","Ett nytt, högre torn och inget annat","Fontänerna ligger där tornen stod. Namnen på alla som dog är inristade runt dem."],
["Vad förändrades på flygplan efter 2001?","Cockpitdörrarna blev förstärkta och låsta","Alla plan fick gallerfönster","Plan flyger inte över städer","Man införde också striktare säkerhetskontroll på flygplatser, som vi känner igen idag."]
],
"vanallen":[
["Vem upptäckte strålningsbältena runt jorden?","James Van Allen","Isaac Newton","Albert Einstein","Van Allen ledde mätningarna med satelliten Explorer 1 år 1958."],
["Vad fångas i bältena?","Laddade partiklar från solen","Små stenar","Vatten från rymden","Jordens magnetfält fångar partiklarna och leder dem fram och tillbaka mellan polerna."],
["Vad skyddar oss på jorden från solens partiklar?","Jordens magnetfält","Molnen","Månen","Magnetfältet böjer av det mesta. Därför kan vi leva här, och därför ser vi norrsken."]
],
"kvant":[
["Vad gäller för Schrödingers katt?","Den är både levande och död tills man tittar","Den är alltid levande men sover","Den kan tala när man frågar","Det är ett tankeexperiment. Schrödinger ville visa hur konstigt det blir om små partiklars regler skulle gälla för stora saker."],
["Vad visar dubbelspaltsförsöket?","Små partiklar kan bete sig som vågor","Ljuset kan inte gå genom hål","Elektroner är som bollar","Elektroner ger ett vågmönster, trots att de kommer en och en. Det var chockerande för forskare."],
["Vilken av dessa saker fungerar tack vare kvantfysik?","Mobilens chip","Cykelkedjan","Ett vanligt paraply","Transistorerna i chipp bygger på hur elektroner beter sig. Lasrar och MR-kameror också."]
],
"pirater":[
["Vad kallas den svarta piratflaggan?","Jolly Roger","Black Pete","Bonny Flag","Flaggan visade skallar eller korsade ben och skulle skrämma andra fartyg att ge upp utan strid."],
["Vilken sak är en myt från böcker och filmer?","Att pirater lät fångar gå på plankan","Att pirater fanns på riktigt","Att pirater hade en flagga","Det finns nästan inga belägg för plankan. Inte heller att de grävde ner skatter är särskilt vanligt."],
["Hur valdes kaptenen på många piratskepp?","Besättningen röstade","Han ärvde skeppet","Kungen utsåg honom","Piratskeppen var ofta mer demokratiska än vanliga fartyg. Besättningen kunde också byta ut en dålig kapten."]
],
"petrichor":[
["Vad kallas doften av regn mot torr mark?","Petrikor","Aromax","Regnolja","Ordet myntades 1964 av två australiska forskare."],
["Vilket ämne gör att jord luktar jord?","Geosmin","Klorin","Etanol","Vi människor är otroligt känsliga för geosmin. Vi kan känna det i en mycket liten mängd."],
["Vad betyder de grekiska orden som ligger bakom petrikor?","Sten och gudarnas blod","Regn och jord på latin","Doft och luft på franska","Petra betyder sten och ichor var vätskan som rann i gudarnas ådror."]
],
"hajar":[
["Hur länge har hajar funnits på jorden?","Mer än 400 miljoner år","Ungefär 4 000 år","Ungefär 1 miljon år","Hajar fanns före träd och före dinosaurierna."],
["Vad har hajen i stället för ben i kroppen?","Brosk","Gelé","Sten","Brosk är mjukare och lättare än ben. Det är samma sak som vi har i örat och näsan."],
["Vad händer när en hajtand lossnar?","En ny tand flyttar fram","Hajen får aldrig någon ny","Tanden växer tillbaka på en timme","Hajar har flera rader tänder bakom de främsta och kan tappa tusentals tänder under ett liv."]
],
"morkmateria":[
["Hur stor del av universum är vanlig materia som vi kan se?","Cirka 5 procent","Cirka 50 procent","Cirka 95 procent","Resten är mörk materia och mörk energi. Vi vet inte vad de är."],
["Vem mätte hur galaxer snurrar och hittade ledtrådar till mörk materia?","Vera Rubin","Galileo","Marie Curie","Galaxerna snurrade för fort för att hålla ihop. Något osynligt måste hålla dem på plats."],
["Hur vet forskarna att mörk materia finns?","Man ser hur den drar i ljus och galaxer","Man kan känna dess lukt","Man har tagit prover med spade","Mörk materia syns inte, men dess tyngdkraft böjer ljuset från galaxer bakom."]
],
"vikingar":[
["Hade vikingar horn på hjälmen?","Nej, det är en myt","Ja, alltid","Ja, men bara kungar","Hornen kommer från en operaföreställning på 1800-talet. Hjälmarna man hittat saknar horn."],
["Vem nådde Amerika omkring år 1000?","Leif Eriksson","Christofer Columbus","Gustav Vasa","Det var nästan 500 år före Columbus, som kom år 1492."],
["Vad kallades vikingarnas skepp?","Långskepp","Kryssare","Galärer","De var långa och smala, drevs av segel och åror och kunde ta sig upp på floder."]
],
"blackfisk":[
["Hur många hjärtan har en bläckfisk?","Tre","Ett","Åtta","Två hjärtan pumpar blod till gälarna och ett pumpar ut i kroppen."],
["Vilken färg har bläckfiskens blod?","Blå","Röd","Grön","Blodet innehåller koppar och inte järn som vårt. Då blir det blått."],
["Hur kan en bläckfisk krypa genom ett litet hål?","Den har inga ben, bara en mjuk kropp","Den kan pressa ihop sina ben","Den är så liten","Det enda hårda är näbben. Så den kommer igenom hål lika stora som näbben."]
],
"iss":[
["Hur högt över jorden flyger rymdstationen ISS?","Ungefär 400 kilometer","Ungefär 40 kilometer","Ungefär 4 000 kilometer","Den går ett varv runt jorden på ungefär 90 minuter."],
["Hur många solnedgångar ser astronauterna på ISS per dygn?","Ungefär 16","Bara en","Aldrig någon","Stationen susar runt jorden så fort att dag och natt växlar ungefär var 45:e minut."],
["Hur mycket tränar astronauterna varje dag?","Ungefär 2 timmar","Ingenting","Ungefär 20 minuter","I tyngdlöshet tappar kroppen muskler och skelettet blir svagare, så träning är obligatoriskt."]
],
"mammutar":[
["När dog de sista ullhårsmammutarna ut?","För ungefär 4 000 år sedan","För 66 miljoner år sedan","För 100 år sedan","De sista levde på Wrangelön. Då var pyramiderna redan byggda."],
["Vad skyddade mammutarna mot kylan?","Lång päls och ett tjockt fettlager","Pälsrock från människor","En grotta de bodde i","Under pälsen hade de upp till tio centimeter fett. De hade också små öron som inte frös."],
["Vad är Lyuba?","En mammutunge som hittats nästan helt bevarad i isen","En grotta i Spanien med målningar","Ett stort mammutben från en myr","Lyuba hittades 2007 i Sibirien, bara någon månad gammal när hon dog."]
],
"penicillin":[
["Vem upptäckte penicillinet 1928?","Alexander Fleming","Louis Pasteur","Thomas Edison","Han kom tillbaka från semester och såg att mögel hade dödat bakterierna på en bortglömd skål."],
["Vad gör penicillinet?","Dödar bakterier","Dödar virus","Stoppar värk","Penicillin hjälper mot bakterier som halsfluss och lunginflammation, inte mot förkylning."],
["Vilken sorts infektion hjälper inte penicillin mot?","Virus, till exempel förkylning","Halsfluss, som beror på bakterier","Infekterade sår, som beror på bakterier","Virus är något helt annat än bakterier. Därför ska man inte ta antibiotika i onödan."]
],
"jast":[
["Vad gör jästen med sockret i degen?","Äter det och gör koldioxid","Gör ännu mer socker av det","Gör salt av det i smeten","Gasen fastnar i degen och bildar bubblor som gör att degen jäser och växer."],
["Vad gör att brödet blir segt och elastiskt?","Gluten, ett nät av protein","Vattnet som blandas i degen","Sockret som ger sötma","Glutentrådarna håller kvar gasbubblorna. Därför bygger man bröd av vetemjöl."],
["Vilket forntida folk bakade bröd med jäst för ca 4 000 år sedan?","Egyptierna","Vikingarna","Romarna","Egyptierna upptäckte att deg som fått stå började jäsa."]
],
"dans":[
["Vilken kung grundade en dansakademi i Paris år 1661?","Ludvig XIV","Gustav Vasa","Napoleon","Han dansade själv i baletter. Därför är många balettermer franska än idag."],
["Vilket dansgrepp blev världsberömt 1983 av Michael Jackson?","Moonwalk","Breakdance","Valsen","Han visade moonwalk på tv. Det ser ut som att man går framåt men glider bakåt."],
["Vilken dansstil föddes i New York på 1970-talet?","Hiphop","Vals","Balett","Break dance växte fram bland ungdomar i stadsdelen Bronx."]
],
"webb":[
["Hur långt från jorden befinner sig James Webb-teleskopet?","Ungefär 1,5 miljoner kilometer","Ungefär 400 kilometer","Ungefär 384 000 kilometer","Det är fyra gånger längre bort än månen."],
["Av hur många bitar består Webbs stora spegel?","18 sexkantiga bitar","En enda stor bit i ett stycke","Tusen små bitar i rader","Spegelbitarna är täckta av ett tunt lager guld och viks ihop under uppskjutningen."],
["Varför måste teleskopet vara så kallt, ungefär minus 230 grader?","Det ser värmestrålning och den skulle störa","Så att det inte ska rosta","Så att batterierna håller länge","Ljuset från de allra första galaxerna är infrarött. Om teleskopet var varmt skulle det själv lysa."]
],
"sjokablar":[
["Hur reser internet mellan kontinenterna?","Genom kablar på havsbotten","Via satelliter bara","Via flygplan","Nästan all internettrafik mellan världsdelar går i kablar på havsbotten."],
["Vad skickas genom kablarna?","Ljus i glasfiber","Elektricitet i kopparrör","Radiovågor","Ljusblixtar tar en text eller film från ena sidan Atlanten till den andra på mindre än en tiondels sekund."],
["Hur tjock är en kabel i djuphavet ungefär?","Ungefär 2,5 centimeter","Ungefär 2,5 meter","Ungefär 25 centimeter","Djuphavskabeln är tunn som en trädgårdsslang. Nära land är de skyddade av tjocka mantlar."]
],
"chip":[
["Vad görs mikrochip av?","Kisel från sand","Plast","Järn","Kisel är ett grundämne som finns i vanlig sand."],
["Vad säger Moores lag om chip?","Antalet transistorer dubbleras ungefär vartannat år","Chip blir dubbelt så dyra vartannat år","Chip blir dubbelt så stora vartannat år","Därför blir datorer och mobiler snabbare och mindre."],
["Hur stor var den första datorn ENIAC?","Den fyllde ett helt rum","Den var lika stor som en bok","Den var lika stor som en bil","Den hade nästan 18 000 glasrör som kunde gå sönder."]
],
"mars":[
["Vad heter helikoptern som flög på Mars?","Ingenuity","Curiosity","Perseverance","Ingenuity lyfte 2021. Det var första gången en farkost flög i en annan planets luft."],
["Hur lång tid tar en radiosignal mellan jorden och Mars?","Mellan 5 och 20 minuter","Ungefär 1 sekund","Ungefär ett dygn","Avståndet varierar beroende på var planeterna står. Därför går det inte att styra en rover med joystick."],
["Vilken Mars-rover är lika stor som en bil?","Curiosity","Sojourner","Spirit","Sojourner var bara lika stor som en mikrovågsugn. Curiosity kom 2012."]
],
"gps":[
["Hur högt ovanför jorden ligger GPS-satelliterna?","Ungefär 20 000 kilometer","Ungefär 200 kilometer","Ungefär 2 000 kilometer","De behöver ligga högt för att se en stor del av jorden åt gången."],
["Vad mäter mobilen för att räkna ut var du är?","Hur lång tid signalerna från satelliterna tar","Hur kallt det är i luften omkring","Hur högt du hoppar med mobilen","Tiden gånger ljusets hastighet ger avståndet. Med flera satelliter kan mobilen räkna ut var den är."],
["Vad skulle hända om GPS inte korrigerade för Einsteins relativitetsteori?","Positionen blev flera kilometer fel varje dygn","Mobilen blev varm","Det skulle inte spela någon roll","Satelliternas klockor går lite annorlunda. Utan korrigering blir felet ca 10 km efter ett dygn."]
],
"vaccin":[
["Vad betyder ordet vaccin från början?","Ko","Skydd","Spruta","Det kommer av latinets vacca. Edward Jenner använde koppor från kor."],
["Vem gjorde det första vaccinet 1796?","Edward Jenner","Albert Einstein","Marie Curie","Han märkte att mjölkpigor som haft kokoppor inte blev sjuka i smittkoppor."],
["Vilken sjukdom har helt utrotats tack vare vaccin?","Smittkoppor","Förkylning","Influensa","Det sista kända fallet var i Somalia 1977. WHO förklarade sjukdomen utrotad 1980."]
],
"leonardo":[
["Vilken berömd målning målade Leonardo da Vinci?","Mona Lisa","Skriet","Stjärnenatten","Mona Lisa hänger på Louvren i Paris och ses av miljontals besökare varje år."],
["Hur skrev Leonardo ofta sina anteckningar?","Med spegelvänd skrift","På latin","Med ritningar utan ord","Han skrev från höger till vänster så att man behövde en spegel för att läsa."],
["Vilka av Leonardos idéer var långt före sin tid?","Flygmaskin och fallskärm","Telefon och dator","Bil och tåg","Han ritade fallskärmar och maskiner som flaxade med vingar. Många byggdes aldrig."]
],
"ananas":[
["Vad heter enzymet i ananas som kan få munnen att svida?","Bromelain","Laktas","Glukos","Enzymet bryter ned protein, och det kan också bryta ner lite av munnens yttersta hud."],
["Varför stelnar inte gelé om man använder färsk ananas?","Enzymet klipper sönder gelatinets protein","Ananasen är för kall för geléen","Ananasen är för söt för geléen","Med konserverad ananas går det bra, för där har man hettat upp frukten så att enzymet inte längre fungerar."],
["Vad är en ananas egentligen?","Många små frukter som växt ihop","En enda stor bär på en buske","En rot som växer under marken","Varje ruta på skalet är en egen liten blomma som blev frukt. Det tar ett till två år innan en ananas är mogen."]
],
"smaklokar":[
["Hur många grundsmaker finns det?","Fem","Två","Tio","Sött, surt, salt, bittert och umami. Umami upptäcktes 1908 av en japansk forskare."],
["Vad påverkar hur maten smakar mest?","Lukten","Tungans färg","Tandborsten","Håller du för näsan märks smaken av maten betydligt sämre."],
["Vad händer om man äter ett mirakelbär och sedan en citron?","Citronen smakar sött","Citronen smakar surare","Citronen smakar ingenting","Mirakelbär får surt att smaka sött i en halvtimme, utan att det är något socker."]
],
"orkan":[
["Hur varmt måste havsvattnet minst vara för att en orkan ska bildas?","Ungefär 26 grader","Ungefär 5 grader","Ungefär 10 grader","Orkaner hämtar energi från varmt vatten. Därför försvagas de när de når land."],
["Vad kallas mitten av en orkan?","Ögat","Hjärtat","Navet","Där är det nästan vindstilla, men runt ögat är vinden som starkast."],
["Vad kallas samma sorts storm över Stilla havet?","Tyfon","Cyklon","Tornado","Det är samma sorts storm. Namnet beror på var den bildas."]
],
"krakatau":[
["Vilket år exploderade vulkanen Krakatau?","1883","1783","1983","Det är en av de största vulkanutbrotten som människor skrivit om."],
["Hur långt bort hördes smällen?","Mer än 4 500 kilometer","Ungefär 4 kilometer","Ungefär 40 kilometer","Det är ungefär avståndet mellan Stockholm och Dubai."],
["Hur påverkades solnedgångarna efter utbrottet?","De blev röda över hela världen","De försvann helt i flera år","De blev gröna över hela världen","Askan i luften färgade himlen. Vissa tror att Edvard Munchs Skriet visar en sådan röd himmel."]
],
"tjernobyl":[
["Vilket år hände olyckan i kärnkraftverket i Tjernobyl?","1986","1966","2006","Det hände natten mellan den 25 och 26 april. Reaktor 4 exploderade."],
["Hur upptäcktes olyckan i Sverige?","Strålningsmätare på Forsmark larmade","Det kom ett meddelande på radio","Ett brev från Sovjetunionen","Forsmark trodde först att det var ett fel hos dem. Sedan visade det sig att molnet kom från Sovjetunionen."],
["Vad har kommit tillbaka i den övergivna zonen?","Vilda djur som vargar och hästar","Stora städer","Skog som aldrig fanns","Människor är borta, så djuren har fått ha området ifred. Men en del ämnen finns kvar i marken."]
],
"svampar":[
["Vad är svampar?","Ett eget rike, varken växter eller djur","Växter som saknar blommor","Små djur utan ben och ögon","Svampar är mer släkt med djur än med växter. De kan inte göra sin egen mat."],
["Vad kallas trådarna som finns under marken?","Mycel","Rötter","Stjälkar","Det vi plockar är bara fruktkroppen. Mycelet kan vara jättestort under jorden."],
["Hur stor är den största levande varelsen på jorden, en svamp?","Över tusen fotbollsplaner stor","Lika stor som en bil","Lika stor som en fotbollsplan","En honungsskivling i Oregon täcker nästan 10 kvadratkilometer."]
],
"spinnande":[
["Hur många gånger per sekund vibrerar en katts spinnande?","25 till 150 gånger","1 till 5 gånger","1 000 gånger","Det är en lågfrekvent vibration som man känner i handen när man klappar katten."],
["När spinner katter?","När de är nöjda men också när de är oroliga eller har ont","Bara när de är nöjda och mätta","Bara när de äter sin mat","Katter spinner även för att lugna sig. Därför kan det vara svårt att veta vad den vill."],
["Vad är skillnaden mellan stora katter som lejon och små katter?","Små katter spinner, lejon ryter","Lejon spinner mer","Det finns ingen skillnad","Hur halsbenet är byggt avgör. Små katter kan spinna men inte ryta, stora katter tvärtom."]
],
"raket":[
["Vad säger Newtons tredje lag?","Varje kraft har en lika stor motkraft","Allt som går upp kommer ned","Tunga saker faller fortast","Raketen trycker ut gas bakåt och gasen trycker raketen framåt."],
["Varför tar raketen med sitt eget syre?","Det finns ingen luft i rymden","Syret gör den tyngre","Rymden är för kall","Bränslet behöver syre för att brinna. I rymden finns inget, så raketen har med sig både bränsle och syre."],
["Hur fort måste en raket färdas för att hålla sig kvar i bana runt jorden?","Ungefär 28 000 km/h","Ungefär 280 km/h","Ungefär 2 800 km/h","Satelliten faller hela tiden men har så hög fart att jorden kröker sig bort under den."]
],
"curie":[
["Vilka två nya grundämnen upptäckte Marie och Pierre Curie?","Polonium och radium","Guld och silver","Syre och väte","Poloniumet döpte Marie efter sitt hemland Polen."],
["Hur många Nobelpris fick Marie Curie?","Två, i fysik och kemi","Ett, bara i fysik","Fyra, i alla naturvetenskaper","Hon är den första som fått Nobelpris två gånger och det enda som fått det i två olika vetenskaper."],
["Vilket ord myntade Marie Curie för strålningen från uran?","Radioaktivitet","Atomkraft","Strålskydd","Hon ville förstå strålningen. Under första världskriget byggde hon röntgenbilar som kunde köra till fronten."]
]
};
