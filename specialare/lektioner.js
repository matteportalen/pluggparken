/* Minilektioner till Specialare.
   Lägg till en ny lektion sist i listan. Varje bild i en lektion är [emoji, rubrik, text].
   kat: Rymden, Natur, Historia, Kroppen, Tal, Hjärnan  ·  c = färg på kortet  ·  e = ikon */
var LEKTIONER=[
{id:"titanic",titel:"Titanic",kat:"Historia",e:"🚢",c:"#3B6EA8",film:"titanic",rutor:[
["🚢","Det största skeppet","Titanic var när hon byggdes det största skeppet i världen: ungefär 270 meter långt. Det är som 2,5 fotbollsplaner efter varandra."],
["🗓️","Jungfrufärden 1912","I april 1912 lämnade Titanic England på sin allra första resa. Hon skulle till New York. Ombord fanns över 2 000 människor."],
["🧊","Isberget","Sent en kall natt, den 14 april, såg man ett isberg alldeles för sent. Skeppet hann inte svänga och skrapade längs sidan."],
["🕳️","Vattnet kom in","Isberget gjorde hål längs skrovets sida så att flera av rummen längst fram fyllde med vatten. Skeppet var byggt för att klara några fyllda rum, men inte så många."],
["🛟","För få livbåtar","Det fanns livbåtar för ungefär hälften av alla ombord. Efter olyckan ändrades reglerna: alla skepp måste ha plats i livbåtar för alla."],
["🔦","Hittat på havsbotten","Vraket hittades först 1985, nästan fyra kilometer ner. Där är det kolsvart och iskallt. Skeppet ligger i två delar."],
["💡","Visste du att …","… Titanic kallades \"osänkbart\" av många? Det är därför det blev en så stor nyhet när hon sjönk."]]},

{id:"bermuda",titel:"Bermudatriangeln",kat:"Historia",e:"🔺",c:"#2E8B8B",rutor:[
["🔺","En mystisk triangel","Bermudatriangeln är ett område i Atlanten mellan Florida, Bermuda och Puerto Rico. Man säger att skepp och flygplan försvinner där."],
["📖","Hur myten började","Myten växte fram på 1950- och 60-talet, när tidningar och böcker skrev spännande berättelser om försvunna skepp och flygplan."],
["✈️","Flight 19","Den mest kända historien handlar om fem flygplan som försvann 1945. Piloterna blev vilsna i dåligt väder och fick slut på bränsle."],
["🔎","Vad säger forskarna?","Forskare har tittat på siffrorna. Det försvinner inte fler skepp där än på andra platser med lika mycket trafik."],
["🌀","Farligt väder","Området har kraftiga stormar och starka strömmar. Det förklarar många av olyckorna, utan att det behövs något mystiskt."],
["🕵️","Varför lever myten?","Spännande historier sprids lätt, och en gåta är roligare än ett vanligt svar. Bra att tänka på: fråga alltid hur man vet något!"]]},

{id:"himlen",titel:"Varför är himlen blå?",kat:"Natur",e:"🌤️",c:"#4A90D9",rutor:[
["☀️","Solljus är alla färger","Solens ljus ser vitt ut, men det innehåller alla regnbågens färger blandade."],
["🌈","Ljus som vågor","Varje färg är en ljusvåg. Blått ljus har korta vågor och rött ljus har långa vågor."],
["🌬️","Luften studsar ljuset","Ljuset träffar luftens små molekyler. De sprider det korta blå ljuset åt alla håll, mycket mer än det röda."],
["🔵","Blått överallt","Det blå ljuset kommer alltså från hela himlen, åt alla håll. Därför ser himlen blå ut, vart du än tittar."],
["🌅","Röd solnedgång","När solen är lågt står ljuset längre väg genom luften. Det mesta blå sprids bort, och rött och orange blir kvar."],
["🌌","I rymden är det svart","Uppe i rymden finns ingen luft som sprider ljuset. Därför är himlen svart där, även mitt på dagen."]]},

{id:"marianer",titel:"Det djupaste stället",kat:"Natur",e:"🌊",c:"#1C5D99",rutor:[
["🌊","Marianergraven","Det djupaste stället på jorden ligger i Stilla havet och heter Marianergraven. Det är en lång djup spricka i havsbotten."],
["📏","Nästan 11 kilometer","På det djupaste stället är det ungefär 10 900 meter ner. Det är längre än en flygplansresa är hög!"],
["🏔️","Större än Mount Everest","Om man lade Mount Everest (8 849 meter) på botten av graven skulle det fortfarande vara mer än två kilometer vatten ovanför toppen."],
["⚖️","Enormt tryck","Där nere trycker vattnet med mer än 1 000 gånger så mycket som på land. Det är som om en elefant stod på ett frimärke."],
["🌑","Kolsvart och kallt","Solljuset når inte ner. Det är kolsvart och bara några grader varmt."],
["🦐","Liv även där","Forskare har hittat små räkliknande djur och andra varelser som lever där nere. Liv finns nästan överallt!"],
["🗑️","Även här finns vårt skräp","Forskare har hittat skräp på havets djupaste ställen, bland annat en plastpåse på nästan 11 kilometers djup i Marianergraven. Bilden visar en färgburk på en annan djup havsbotten. Skräp som vi kastar kan hamna väldigt långt bort. Vad kan vi göra för att skräpet inte ska hamna i havet?"]]},

{id:"vulkan",titel:"Så fungerar en vulkan",kat:"Natur",e:"🌋",c:"#C4511F",film:"vulkan",rutor:[
["🌍","Jorden är het inuti","Långt ner under våra fötter är det så varmt att berg kan smälta. Smält berg kallas magma."],
["⬆️","Magman stiger","Magma är lättare än hårt berg, så den stiger uppåt genom sprickor, som en bubbla i en sirapsburk."],
["💥","Utbrott!","När magman når ytan eller trycket blir för stort kommer ett utbrott. Gaser, aska och het sten flyger upp."],
["🔥","Lava","Magma som kommer ut på ytan kallas lava. Den kan vara över 1 000 grader varm."],
["⛰️","Berget växer","När lavan svalnar blir den hård sten. Utbrott efter utbrott bygger upp ett berg, en vulkan."],
["🇮🇸","Island","Island har många vulkaner, eftersom ön ligger där två jordplattor möts. Där finns även varma källor."]]},

{id:"svartahal",lank:[["Se filmen: Inuti ett svart hål","#g/svarthal"],["Titta: TON 618 mot Phoenix A, storleksjämförelse (YouTube)","https://www.youtube.com/watch?v=vtqWnq4RZUE"]],titel:"Svarta hål",kat:"Rymden",e:"🕳️",c:"#34255E",rutor:[
["🕳️","Ett hål i rymden?","Ett svart hål är inte riktigt ett hål. Det är en plats där väldigt mycket materia har trängts ihop på en liten yta."],
["🧲","Enormt stark dragning","Dragningskraften är så stark att inget kan komma ut, inte ens ljus. Det är därför det är svart."],
["⭐","Hur blir de till?","Många svarta hål bildas när en mycket stor stjärna får slut på bränsle och faller ihop."],
["🌌","I mitten av Vintergatan","Mitt i vår galax, Vintergatan, finns ett jättelikt svart hål. Det väger ungefär 4 miljoner gånger så mycket som solen."],
["📸","Första fotot","År 2019 tog forskare den första bilden av ett svart hål: en glödande ring runt en mörk mitt."],
["🏆","Ett av de största","Ett av de största svarta hål vi känner till heter TON 618. Det ligger i mitten av en kvasar, en galax som lyser extra starkt, ungefär 10 miljarder ljusår bort. Det väger ungefär 40 till 66 miljarder gånger så mycket som solen. Siffran är osäker, eftersom forskare har mätt olika. På bilden syns kvasaren bara som en liten ljuspunkt."],
["☀️","Jämfört med solen","Ett svart hål med solens vikt skulle bara vara några kilometer stort. TON 618 är över 100 000 gånger bredare än solen. Det är mycket större än hela vårt solsystem: Neptunus ligger bara 30 gånger längre bort än jorden, men TON 618:s gräns ligger 800 till 1 300 gånger längre bort."],
["😌","Ingen fara för oss","Det närmaste vi känner till ligger tusentals ljusår bort. Det kan inte hämta in jorden."]]},

{id:"dinosaurier",titel:"Dinosaurierna",kat:"Natur",e:"🦖",c:"#5B8C3E",film:"dinosaurier",rutor:[
["🦖","Jordens jättar","Dinosaurier levde på jorden i ungefär 165 miljoner år. Människan har bara funnits i några hundratusen år."],
["🦕","Alla storlekar","Vissa var stora som flera bussar efter varandra, andra var små som en kyckling."],
["🥚","De la ägg","Alla dinosaurier kläcktes ur ägg, precis som fåglar och krokodiler."],
["☄️","Asteroiden","För ungefär 66 miljoner år sedan slog en stor asteroid ner vid dagens Mexiko. Klimatet förändrades och de flesta dinosaurier dog ut."],
["🐦","De finns kvar!","Några små dinosaurier överlevde och blev fåglar. En höna är alltså en slags dinosaurie."],
["🔨","Fossil","Vi vet allt det här tack vare fossil: ben och avtryck som blivit till sten under miljoner år."]]},

{id:"pyramid",film:"pyramid",titel:"Pyramiderna i Egypten",kat:"Historia",e:"🏜️",c:"#C99A2E",rutor:[
["🏜️","Mitt i öknen","Vid Giza i Egypten står Cheopspyramiden. Den byggdes för ungefär 4 500 år sedan."],
["🪨","Miljontals stenblock","Pyramiden består av över två miljoner stenblock. Många av dem väger lika mycket som en bil."],
["📏","Högst i världen","I nästan 4 000 år var den det högsta byggnadsverket på jorden. Från början var den ungefär 146 meter hög."],
["👷","Vem byggde den?","Tusentals arbetare byggde den under många år. De hade inga kranar, utan använde ramper, rep och mycket muskelkraft."],
["⚰️","En grav","Pyramiden byggdes som grav åt kungen, farao Cheops. De trodde att han skulle behöva sina saker i nästa liv."],
["🧭","Exakt byggd","Sidorna pekar nästan exakt mot norr, söder, öster och väster. Det är fantastiskt noggrant för så länge sedan."]]},

{id:"blaval",film:"blaval",titel:"Blåvalen",kat:"Natur",e:"🐋",c:"#2F7FB5",rutor:[
["🐋","Det största djuret","Blåvalen är det största djur som någonsin har levt, större än alla dinosaurier."],
["📏","30 meter lång","Den kan bli ungefär 30 meter lång, som tre bussar efter varandra."],
["⚖️","Över 100 ton","En stor blåval väger mer än 100 ton. Bara tungan kan väga lika mycket som en elefant."],
["❤️","Jättehjärta","Hjärtat är jättestort och väger ungefär 180 kilo, mer än en vuxen människa."],
["🦐","Äter bara pyttesmå djur","Blåvalen äter krill, små räkliknande djur. En stor val äter flera ton krill varje dag."],
["🔊","Hörs långt","Blåvalens sång är en av de starkaste ljuden bland djuren och kan höras många kilometer bort under vatten."]]},

{id:"manen",titel:"Månen",kat:"Rymden",e:"🌙",c:"#5C6BC0",rutor:[
["🌙","Vår granne","Månen är jordens enda naturliga måne. Den snurrar runt jorden hela tiden."],
["📏","384 000 kilometer","Månen är ungefär 384 000 kilometer bort. Ljuset behöver drygt en sekund för att komma hit."],
["🚀","Människor har gått där","År 1969 gick Neil Armstrong och Buzz Aldrin på månen. Resan dit tog ungefär tre dygn."],
["🦘","Hoppa högt","På månen är tyngdkraften ungefär sex gånger svagare än hos oss. Du skulle kunna hoppa många gånger högre."],
["👣","Fotspåren sitter kvar","Där finns ingen vind eller regn, så astronauternas fotspår ligger kvar i månens damm."],
["🌗","Månens faser","Månen lyser inte själv, den reflekterar solljus. Vi ser olika mycket av den upplysta delen, och det ger månens faser."],
["🐢","Den flyttar sig","Månen flyttar sig långsamt bort från jorden, ungefär 4 centimeter om året. Ungefär så fort som dina naglar växer."]]},

{id:"regnbage",titel:"Så blir en regnbåge",kat:"Natur",e:"🌈",c:"#8E4FC7",rutor:[
["🌧️","Regn och sol","För en regnbåge behövs två saker samtidigt: regndroppar i luften och sol som lyser på dem."],
["💧","Droppen böjer ljuset","Solljuset går in i en regndroppe, böjs, studsar på insidan och går ut igen."],
["🌈","Färgerna skiljs åt","Varje färg böjs lite olika mycket. Därför delas det vita ljuset upp i röd, orange, gul, grön, blå och violett."],
["📍","Solen i ryggen","För att se en regnbåge måste du ha solen bakom dig och regnet framför dig."],
["⭕","Egentligen en cirkel","En regnbåge är egentligen en hel cirkel. Från marken ser vi bara den övre halvan. Från ett flygplan kan man ibland se hela."],
["👀","Din egen regnbåge","Ingen ser exakt samma regnbåge som du. Din regnbåge beror på var just du står."]]},

{id:"bin",titel:"Bin och honung",kat:"Natur",e:"🐝",c:"#E0A800",rutor:[
["🐝","Ett stort samhälle","I en bikupa kan det bo 20 000 till 60 000 bin. De jobbar tillsammans som en enda stor familj."],
["👑","En drottning","I varje kupa finns en drottning som lägger ägg, ibland över tusen om dagen."],
["💃","Dansen","När ett bi hittar blommor dansar det inne i kupan. Dansens riktning och längd visar de andra var maten finns."],
["🍯","Honung","Bina gör honung av nektar från blommor. Ett enda bi gör bara ungefär en tolftedels tesked under hela sitt liv."],
["🌸","Bina hjälper oss","Bin för över pollen mellan blommor. Utan dem skulle många frukter och grönsaker inte bli till."],
["🏡","Hjälp bina","Du kan hjälpa bin genom att plantera blommor och inte klippa gräsmattan så ofta."]]},

{id:"vasa",titel:"Regalskeppet Vasa",kat:"Historia",e:"⚓",c:"#8B4513",rutor:[
["⚓","Ett kungligt skepp","Vasa var ett stort krigsskepp som kung Gustav II Adolf lät bygga. Hon var rikt dekorerad med hundratals skulpturer."],
["🌬️","Jungfrufärden 1628","Den 10 augusti 1628 seglade Vasa ut från Stockholm för första gången. Tusentals människor stod på stranden och tittade."],
["💨","En vindpust","Efter drygt en kilometer tog en vindpust tag i seglen. Skeppet lutade, vatten kom in genom kanonportarna och hon sjönk."],
["🌊","Under vattnet","Vasa låg kvar på botten i över 300 år. I Östersjön finns nästan ingen skeppsmask, så träet höll."],
["🏗️","Upp igen","År 1961 lyftes skeppet upp. Det tog många år att bevara det."],
["🏛️","Ett museum","I dag står Vasa i ett eget museum i Stockholm. Det är det bäst bevarade skeppet från 1600-talet i världen."]]},

{id:"everest",titel:"Mount Everest",kat:"Natur",e:"🏔️",c:"#6D8CA8",rutor:[
["🏔️","Världens högsta berg","Mount Everest är 8 849 meter högt och ligger mellan Nepal och Tibet."],
["🥶","Iskallt","Högst upp kan det vara långt under minus 30 grader. Där blåser också mycket kraftiga vindar."],
["😮‍💨","Lite syre","Högt upp är luften tunn. Det finns mycket mindre syre, så klättrarna bär ofta med sig syrgas."],
["🎉","Första toppen","1953 nådde Edmund Hillary från Nya Zeeland och Tenzing Norgay från Nepal toppen för första gången."],
["🎒","Sherpafolket","Sherpor som bor i bergen hjälper klättrare att hitta vägen och bära utrustning. De är vana vid höjden."],
["📈","Berget växer","Bergen i Himalaya trycks upp ännu i dag, ungefär 4 millimeter om året."]]},

{id:"illusioner",titel:"Hjärnan luras",kat:"Hjärnan",e:"👁️",c:"#D14B8F",rutor:[
["👁️","Ögon och hjärna","Ögonen tar emot ljus, men det är hjärnan som bestämmer vad vi ser."],
["🧠","Hjärnan gissar","Hjärnan gör hela tiden kloka gissningar, för att gå snabbt. Ofta har den rätt."],
["📐","Ibland gissar den fel","När bilden är gjord på ett särskilt sätt gissar hjärnan fel. Då ser vi en optisk illusion."],
["🎨","Färger påverkas","Samma färg kan se ljusare eller mörkare ut beroende på vad som finns runt omkring."],
["📏","Mät själv","Det bästa sättet att vara säker är att mäta. Linjal slår ögonmått!"],
["🕵️","Gå till Illusioner","I Specialare finns en sida med illusioner du kan prova. Kolla om du kan lura hjärnan!"]]},

{id:"dygn",titel:"Dygnet på andra planeter",kat:"Rymden",e:"🪐",c:"#7B5EA7",rutor:[
["🌍","Ett dygn på jorden","Ett dygn är den tid det tar för en planet att snurra ett varv. På jorden är det 24 timmar."],
["🪐","Jupiter snurrar fort","Jupiter är störst av alla planeter men snurrar fortast. Ett dygn där är bara ungefär 10 timmar."],
["🔴","Mars","På Mars är ett dygn nästan som vårt: ungefär 24 timmar och 37 minuter."],
["🐌","Venus snurrar sakta","Venus snurrar väldigt långsamt, ett varv tar ungefär 243 jorddygn."],
["🤯","Längre än ett år","Venus tar ungefär 225 dygn på sig att åka runt solen. Ett dygn på Venus är alltså längre än ett år där!"],
["↩️","Baklänges","Venus snurrar dessutom åt andra hållet än de flesta planeter. Där går solen upp i väster."]]},

{id:"antarktis",titel:"Antarktis",kat:"Natur",e:"🐧",c:"#5AB0D1",rutor:[
["🧊","Mest is","Antarktis är en kontinent längst ner på jorden där nästan allt är täckt av is."],
["📏","Tjock is","Isen är i genomsnitt över två kilometer tjock. På vissa ställen är den nästan fem kilometer."],
["🥶","Jordens kallaste","Den lägsta temperaturen som någonsin har mätts på jorden, ungefär minus 89 grader, mättes i Antarktis."],
["🐧","Pingviner","Pingviner bor där, och många andra djur lever i havet runt omkring. Men inga isbjörnar, de bor i Arktis, längst upp."],
["🔬","Ingen bor där","Det finns inga människor som bor där hela livet, bara forskare som stannar i några månader eller ett år."],
["🤝","Till för forskning","Länder har kommit överens om att Antarktis ska användas för fred och forskning."]]},

{id:"snabbast",titel:"De snabbaste djuren",kat:"Natur",e:"🦅",c:"#3C8D6E",rutor:[
["🦅","Pilgrimsfalken","Snabbast i världen är pilgrimsfalken. När den störtdyker efter en fågel kan den komma upp i över 300 kilometer i timmen."],
["🐆","Geparden","Snabbast på marken är geparden: upp till ungefär 100 kilometer i timmen. Men bara i korta sprintar."],
["🐟","Snabb i havet","Seglarfisken tillhör de snabbaste fiskarna, kanske runt 100 kilometer i timmen. Den är svår att mäta."],
["🐌","Och den långsamma","Trädsengångaren rör sig sakta och sover mycket. Den spar energi på det sättet."],
["🏃","Och vi?","Den snabbaste människan har sprungit ungefär 44 kilometer i timmen, men bara en liten stund."],
["💨","Räkna ut!","En gepard som springer 100 kilometer i timmen tar ungefär 36 sekunder på sig för en kilometer. Kan du springa det?"]]},

{id:"hjarnan",titel:"Din hjärna",kat:"Kroppen",e:"🧠",c:"#E57373",rutor:[
["🧠","Kroppens chef","Hjärnan styr allt du tänker, känner, rör dig och minns."],
["⚖️","Ganska liten","Hjärnan väger ungefär 1,4 kilo. Det är inte mycket, men den är otroligt komplicerad."],
["🔌","Miljarder trådar","Den har runt 86 miljarder nervceller som skickar små signaler till varandra."],
["⚡","Kräver mycket energi","Hjärnan är bara en liten del av kroppen, men använder ungefär en femtedel av all energi."],
["😴","Sömn","När du sover sorterar hjärnan det du lärt dig. Därför är sömn viktigt för att komma ihåg."],
["💪","Tränas som en muskel","Varje gång du lär dig något nytt bildas nya kopplingar mellan nervcellerna. Du blir smartare av att öva!"]]},

{id:"kroppen",titel:"Snabbfakta om kroppen",kat:"Kroppen",e:"🫀",c:"#D4574E",rutor:[
["🫀","Hjärtat jobbar","Hjärtat slår ungefär 100 000 gånger varje dygn, utan att du tänker på det."],
["🦴","Många ben","En vuxen människa har 206 ben. Ett bebisskelett har fler, som växer ihop."],
["👁️","Blinkningar","Vi blinkar ungefär 15 till 20 gånger varje minut, utan att tänka på det."],
["🩸","Blodets resa","Allt blod i kroppen pumpas runt hela kroppen på ungefär en minut."],
["🦷","Tänder","Tandemaljen är det hårdaste ämnet i kroppen. Men den kan inte växa tillbaka, så borsta tänderna!"],
["👃","Näsan","Du kan känna igen tusentals olika dofter, och doften går direkt till de delar av hjärnan som sköter minnen."]]},

{id:"blixt",titel:"Åska och blixt",kat:"Natur",e:"⚡",c:"#5C5CA8",rutor:[
["⛈️","Åskmoln","Inne i stora moln gnuggas isbitar och vattendroppar mot varandra. Då bildas elektricitet."],
["⚡","Blixten","När elektriciteten blir för stor hoppar den som en gnista, en blixt. Den kan gå mellan moln eller ner till marken."],
["🔥","Varmare än solen","Luften runt en blixt blir ungefär 30 000 grader varm, flera gånger varmare än solens yta."],
["🔊","Åskan är ljudet","Luften blir så het att den utvidgas explosionsartat. Det ger ett högt dån, åskan."],
["🧮","Räkna avståndet","Ljuset är snabbare än ljudet. Räkna sekunderna mellan blixt och dån. Tre sekunder är ungefär en kilometer."],
["🏠","Var säker","Gå inomhus när det åskar. Stå inte under ensamma höga träd."]]},

{id:"stora-tal",grej:"pengar",titel:"Miljon, miljard och biljon",kat:"Tal",e:"🔢",c:"#2E7D5B",rutor:[
["🔢","Stora tal","Tusen är 1 000, en miljon 1 000 000, en miljard 1 000 000 000 och en biljon 1 000 000 000 000. Varje steg är 1 000 gånger större. På bilden är kuben 1 000 pärlor, plattan 100 och staven 10."],
["⏱️","Räkna i sekunder","1 miljon sekunder är ungefär 11 dygn. 1 miljard sekunder är ungefär 32 år. 1 biljon sekunder är över 31 000 år, då levde mammutar."],
["💵","En miljon kronor","1 000 sedlar à 1 000 kr. En sedel är 0,1 mm tjock, så stapeln blir 10 cm hög. Bilden visar dollar, men tanken är densamma."],
["🏙️","En miljard kronor","1 miljon sedlar. Stapeln blir 100 m hög, som ett tjugovåningshus. Turning Torso är 190 m."],
["🚀","En biljon kronor","1 miljard sedlar. Stapeln blir 100 km hög och når upp till gränsen mot rymden."],
["⏳","Räkna sedlarna","En sedel i sekunden: en miljard kronor tar 11 dygn, en biljon kronor nästan 32 år. Tryck på knappen och se hur högt stapeln blir!"]]},

{id:"kontinenter",titel:"Kontinenterna rör sig",kat:"Natur",e:"🗺️",c:"#6B8E3A",rutor:[
["🗺️","Jordens pussel","Jordens yta består av stora bitar, plattor, som flyter på het sten. Länderna sitter fast på dem."],
["🐌","Mycket långsamt","Plattorna rör sig ungefär några centimeter om året, ungefär lika fort som dina naglar växer."],
["🌎","Ett gammalt jätteland","För ungefär 300 miljoner år sedan satt nästan alla landområden ihop till en enda stor landmassa som kallas Pangea."],
["🧩","Passar ihop","Titta på kartan: Sydamerikas östkant och Afrikas västkant passar nästan ihop som pusselbitar."],
["🏔️","Berg växer fram","När två plattor pressas mot varandra veckas marken och berg växer upp, som Himalaya."],
["🌋","Jordbävningar","När plattor hakar upp sig och sedan släpper kan det komma jordbävningar och vulkanutbrott."]]},

{id:"norrsken",titel:"Norrsken",kat:"Rymden",e:"🌌",c:"#2F8F6B",rutor:[
["🌌","Ljus på natthimlen","Norrsken är gröna, ibland rosa eller lila, ljusa slingor som dansar på natthimlen."],
["☀️","Det börjar på solen","Solen skickar ut små laddade partiklar hela tiden. De kallas solvind."],
["🧲","Jordens magnetfält","Jorden har ett magnetfält som leder partiklarna mot polerna."],
["💥","Krock i luften","Partiklarna krockar med luften högt upp. Då lyser gasen, som i ett lysrör."],
["🟢","Färger","Syre ger grönt och ibland rött. Kväve kan ge blått och lila."],
["🇸🇪","Se det i Sverige","Bäst syns norrsken i norra Sverige, till exempel i Kiruna, en klar och mörk vinternatt."]]},

{id:"atom",titel:"Allt är gjort av atomer",kat:"Tal",e:"⚛️",c:"#3B7DD8",rutor:[
["⚛️","Små byggstenar","Allt omkring dig, du själv också, är gjort av atomer. De är otroligt små."],
["🔬","Hur små?","Du skulle kunna lägga flera hundra tusen atomer på rad över tjockleken av ett hårstrå."],
["🧩","Tre delar","En atom består av en kärna i mitten med protoner och neutroner, och elektroner som susar runt."],
["💨","Nästan tom","Det mesta av en atom är tomrum. Om kärnan var en ärta skulle elektronerna vara flera hundra meter bort."],
["♻️","Gamla atomer","Atomerna i din kropp har funnits i miljarder år. Många bildades inne i stjärnor."],
["⭐","Stjärnstoft","Du är alltså, på riktigt, gjord av stjärnstoft!"]]},
{id:"nobel",lank:[["Läs mer: Marie Curie","#l/curie"],["Lyssna: Alfred Nobel (Historierummet)","https://www.sverigesradio.se/avsnitt/historierummet-om-alfred-nobel"],["Lyssna: Marie Curie (Historierummet)","https://www.sverigesradio.se/avsnitt/historierummet-marie-curie"]],titel:"Nobelpriset",kat:"Historia",e:"🏅",c:"#B8860B",rutor:[
["🧪","Alfred Nobel","Alfred Nobel var en svensk uppfinnare och företagare. År 1867 uppfann han dynamiten."],
["📜","Testamentet","När han dog 1896 stod det i hans testamente att pengarna skulle bli ett pris till dem som gjort mest nytta för mänskligheten."],
["🏅","Fem priser","Det första Nobelpriset delades ut 1901. Det finns priser i fysik, kemi, medicin, litteratur och fred. Ekonomipriset kom senare, 1969."],
["🏛️","Stockholm och Oslo","Priserna delas ut den 10 december, den dag Nobel dog. Fredspriset delas ut i Oslo och de andra i Stockholm."],
["🥇","Medaljen","Varje pristagare får en guldmedalj, ett diplom och prispengar."],
["👩‍🔬","Marie Curie","Marie Curie var den första kvinnan som fick ett Nobelpris. Hon fick det två gånger: i fysik 1903 och i kemi 1911."]]},

{id:"bitcoin",titel:"Bitcoin",kat:"Samhälle",e:"🪙",c:"#F7931A",rutor:[
["💻","Pengar på datorn","Bitcoin är pengar som bara finns på datorer. Du kan inte hålla dem i handen."],
["🕵️","Satoshi Nakamoto","Bitcoin startade år 2009. Den som skapade det kallade sig Satoshi Nakamoto. Ingen vet vem det egentligen är."],
["⛓️","Blockkedjan","Ingen bank eller regering styr Bitcoin. Tusentals datorer håller reda på vem som äger vad i en gemensam bok som kallas blockkedjan."],
["🔢","Bara 21 miljoner","Det kommer aldrig att finnas fler än 21 miljoner bitcoin. Det gör dem sällsynta, lite som guld."],
["🍕","Pizzan","År 2010 köpte någon två pizzor för 10 000 bitcoin. Idag skulle de vara värda enormt mycket pengar."],
["⚠️","Var försiktig","Priset går upp och ner väldigt snabbt. Man kan förlora mycket pengar. Fråga alltid en vuxen först."]]},

{id:"digerdoden",titel:"Digerdöden",kat:"Historia",e:"🐀",c:"#6B4C3B",rutor:[
["🏰","1300-talet","Digerdöden var en sjukdom som spred sig över Europa på 1300-talet."],
["🚢","Från Asien","Den kom med handelsvägar och skepp och nådde Europa omkring år 1347."],
["🐀","Råttor och loppor","Sjukdomen kallas pest. Bakterien spreds av loppor som levde på råttor och människor."],
["⚰️","Många dog","Mellan en tredjedel och hälften av alla i Europa dog. Det var kanske 25 miljoner människor."],
["⚒️","Världen förändrades","Efteråt var det brist på arbetare. De som levde kunde kräva bättre betalt, och samhället förändrades."],
["💊","Idag finns medicin","Digerdöden nådde Sverige omkring år 1350. Idag kan pest botas med antibiotika."]]},

{id:"elfte",titel:"11 september 2001",kat:"Historia",e:"🕊️",c:"#46607A",rutor:[
["📅","En tisdag i september","Den 11 september 2001 attackerades USA av terrorister som kapade fyra flygplan."],
["🏙️","Tvillingtornen","Två plan flög in i tvillingtornen i World Trade Center i New York. Tornen föll samman."],
["🛩️","Fler platser","Ett tredje plan flög in i Pentagon nära Washington. Ett fjärde störtade på ett fält i Pennsylvania."],
["🚒","Hjälparna","Nästan 3 000 människor dog. Brandmän och poliser sprang in för att hjälpa andra."],
["🛃","Ny säkerhet","Efter attackerna ändrades säkerheten på flygplatser över hela världen. Därför går vi idag igenom säkerhetskontroller."],
["🕯️","Minnesmärket","På platsen i New York finns nu ett minnesmärke med två stora fontäner. Namnen på alla som dog finns inristade."]]},

{id:"vanallen",titel:"Strålningsbältena runt jorden",kat:"Rymden",e:"🛰️",c:"#5B3FA0",rutor:[
["🌍","Två ringar","Runt jorden finns två stora ringar av laddade partiklar. De kallas Van Allen-bältena."],
["🛰️","Upptäckten","De upptäcktes 1958 av den amerikanska satelliten Explorer 1. De är uppkallade efter forskaren James Van Allen."],
["🧲","Fångade partiklar","Jordens magnetfält fångar partiklar från solen och håller dem kvar i bältena."],
["☢️","Farlig strålning","Strålningen kan skada satelliter och astronauter. Rymdskepp som ska förbi bältena åker igenom dem snabbt."],
["🛡️","Magnetfältet skyddar","Magnetfältet som skapar bältena skyddar också oss mot solens partiklar."],
["📏","Hur stora?","Det inre bältet börjar ungefär 1 000 kilometer upp. Det yttre når nästan 60 000 kilometer ut."]]},

{id:"kvant",titel:"Kvantfysik",kat:"Fysik",e:"⚛️",c:"#2E86AB",rutor:[
["🔬","Det minsta","Kvantfysik är läran om de allra minsta sakerna: atomer och ännu mindre delar."],
["🤯","Konstigt","Där fungerar världen på ett annat sätt än i vardagen. Reglerna känns ofta konstiga, även för forskare."],
["🌊","Våg och partikel","Ljus kan vara både en våg och en ström av små partiklar, fotoner."],
["🎲","Flera lägen","Enligt teorin kan en partikel ha flera möjliga lägen samtidigt, tills någon mäter den."],
["❓","Osäkerhet","Man kan inte veta exakt både var en partikel är och hur fort den rör sig. Det är Heisenbergs osäkerhetsprincip."],
["📱","Nytta idag","Kvantfysiken ligger bakom lasrar, datorer, mobiler och magnetkameror på sjukhus."]]},

{id:"pirater",titel:"Pirater",kat:"Historia",e:"🏴‍☠️",c:"#4A4E69",rutor:[
["🏴‍☠️","Sjörövare","Pirater är sjörövare som anfaller fartyg och stjäl det de har ombord."],
["⚓","Guldåldern","Den mest kända tiden för pirater var omkring 1650 till 1730, särskilt i Karibien."],
["💀","Jolly Roger","Piraterna hade ofta en svart flagga med dödskalle, kallad Jolly Roger, för att skrämma andra."],
["👩‍✈️","Kända pirater","Svartskägg hette egentligen Edward Teach. Anne Bonny och Mary Read var två kvinnliga pirater."],
["🗺️","Sanning och myter","De grävde nästan aldrig ner skatter och lät ingen gå på plankan. Det mesta kommer från böcker och filmer."],
["🚤","Pirater idag","Pirater finns fortfarande, bland annat utanför Somalias kust. Idag använder de små snabba motorbåtar."]]},

{id:"petrichor",titel:"Varför luktar det så speciellt när det regnar?",kat:"Natur",e:"🌧️",c:"#4C7F7A",rutor:[
["🌧️","Petrichor","Doften när det börjar regna efter en torr period har ett eget namn: petrichor."],
["📖","Ordet","Ordet kommer från grekiskan: petra betyder sten och ichor var vätskan i gudarnas ådror."],
["🦠","Bakterier i jorden","Marken innehåller bakterier som gör ett ämne som heter geosmin. Det är lukten av jord."],
["💧","Droppen och bubblorna","När en regndroppe träffar marken bildas små luftbubblor. De slungar ut doften i luften."],
["👃","Vi är duktiga","Människor känner geosmin även när det bara finns några få delar på en biljon i luften."],
["🌿","Växtoljor","Växter lagrar också oljor i torr jord. När det regnar lossnar de och blandas in i doften."]]},

{id:"hajar",film:"hajar",titel:"Hajar",kat:"Natur",e:"🦈",c:"#2C6E91",rutor:[
["🦈","Äldre än dinosaurierna","Hajar har funnits i över 400 miljoner år. De är äldre än både dinosaurierna och träden."],
["📏","Över 500 arter","Det finns över 500 olika hajarter, från små dvärghajar till jättelika valhajar."],
["🐋","Valhajen","Valhajen är världens största fisk, upp till 12 meter lång. Den äter plankton och är ofarlig för människor."],
["🦴","Inga ben","Hajar saknar riktiga ben. Skelettet är gjort av brosk, samma material som i din näsa och dina öron."],
["🦷","Tusentals tänder","En haj byter tänder hela livet. Vissa arter kan få tusentals tänder under sitt liv."],
["🥚","Hajägg","Inte alla hajar föder levande ungar. Många lägger ägg i en hård, läderaktig kapsel. Hornhajens ägg ser ut som en spiralformad skruv, och hajmamman puttar in dem i en klippspricka så att de sitter fast. Inuti växer ungen i många månader."],
["🍼","Levande ungar","De flesta hajar föder levande ungar. Hos hammarhajen växer ungarna i mammans mage och får näring genom en moderkaka, ungefär som hos däggdjur, och föds som små kopior av de vuxna."],
["🦷","Ungar som äter varandra","Hos sandtigerhajen börjar de största ungarna äta sina syskon redan inne i mamman. Den som blir kvar är större och starkare när den föds."],
["🌊","Hotade","Hajar har fått ett dåligt rykte. Människor dödar många fler hajar än tvärtom, och många arter är hotade."]]},

{id:"morkmateria",titel:"Mörk materia",kat:"Rymden",e:"🌌",c:"#4B2E83",rutor:[
["🔭","Det vi ser","Allt vi ser i rymden, stjärnor, planeter och gas, är bara ungefär 5 procent av universum."],
["👻","Osynlig","Ungefär 27 procent är mörk materia. Vi kan inte se den, men vi vet att den finns."],
["🌀","Galaxer snurrar för fort","Forskare märkte att galaxer snurrar så fort att de borde flyga isär. Något osynligt måste hålla dem ihop."],
["👩‍🔬","Vera Rubin","Den amerikanska astronomen Vera Rubin mätte det här på 1970-talet och övertygade många forskare."],
["🔍","Böjer ljuset","Mörk materia ger inget ljus, men dess tyngdkraft böjer ljuset från galaxer bakom den."],
["❓","Ingen vet","Ingen vet ännu vad mörk materia är gjord av. Det är en av vetenskapens största gåtor."]]},

{id:"vikingar",film:"vikingar",titel:"Vikingarna",kat:"Historia",e:"⚔️",c:"#8B5A2B",rutor:[
["⏳","För tusen år sedan","Vikingatiden brukar räknas från omkring år 800 till 1050, alltså för ungefär tusen år sedan."],
["⛵","Långskeppen","De seglade i långskepp, smala snabba skepp som kunde gå både på hav och i floder."],
["🧭","Österut och västerut","Svenska vikingar reste mest österut mot dagens Ryssland och Ukraina. Danska och norska reste västerut."],
["🌎","Leif Eriksson","Leif Eriksson nådde Nordamerika omkring år 1000, nästan 500 år före Columbus."],
["🪖","Inga horn","Vikingarna hade inte horn på hjälmarna. Det kommer från teaterdräkter på 1800-talet."],
["🪨","Runstenar","Runstenar berättar om vikingarna. I Sverige finns tusentals runstenar."]]},

{id:"blackfisk",titel:"Bläckfisken",kat:"Natur",e:"🐙",c:"#B5446E",rutor:[
["❤️","Tre hjärtan","Bläckfisken har åtta armar och tre hjärtan."],
["🔵","Blått blod","Blodet är blått, eftersom det innehåller koppar i stället för järn."],
["🎨","Byter färg","Den kan ändra färg och mönster på huden på en sekund för att gömma sig."],
["🧠","Smart","Bläckfiskar är mycket smarta. De kan öppna burkar och hitta ut ur labyrinter."],
["💨","Bläckmolnet","När bläckfisken är i fara sprutar den ut ett mörkt bläckmoln och simmar iväg."],
["🕳️","Mjuk kropp","Den har inget skal och inget skelett. Därför kan den pressa sig genom mycket trånga hål."]]},

{id:"iss",lank:[["Titta: ISS flyger förbi (YouTube)","https://youtu.be/f9QHSGpTEkY"]],titel:"Rymdstationen ISS",kat:"Rymden",e:"🧑‍🚀",c:"#2F6DB5",rutor:[
["🛰️","Ett hem i rymden","Den internationella rymdstationen, ISS, är både en bostad och ett laboratorium i rymden."],
["⏱️","90 minuter","Den flyger ungefär 400 kilometer över jorden och åker ett varv runt jorden på cirka 90 minuter."],
["🌅","Många soluppgångar","Därför ser astronauterna ungefär 16 soluppgångar och solnedgångar varje dygn."],
["📐","Stor som en fotbollsplan","Stationen är ungefär lika stor som en fotbollsplan och väger över 400 ton."],
["🤸","Allt svävar","På ISS svävar allt. Astronauterna tränar två timmar varje dag för att musklerna inte ska bli svaga."],
["📅","Sedan år 2000","Människor har bott på stationen utan avbrott sedan år 2000."]]},

{id:"mammutar",titel:"Ullhårsmammuten",kat:"Natur",e:"🦣",c:"#7A5C3E",rutor:[
["🧊","Istidens djur","Ullhårsmammuten levde under istiden. De sista försvann för ungefär 4 000 år sedan."],
["📏","Stora betar","Den var ungefär lika stor som en afrikansk elefant, med långa böjda betar som kunde bli flera meter."],
["🧥","Päls mot kylan","Den hade tjock päls och ett tjockt lager fett som skydd mot kylan."],
["🎨","Grottmålningar","Människor jagade mammutar och ritade dem på grottväggar."],
["❄️","Frusna fynd","Hela mammutar har hittats frusna i Sibirien. Kalven Lyuba är över 40 000 år gammal."],
["🧬","Tillbaka?","Forskare har tagit DNA från frusna mammutar och funderar på om man kan skapa mammutliknande djur. Ingen har lyckats ännu."]]}
,
{id:"penicillin",titel:"Penicillinet",kat:"Kroppen",e:"💊",c:"#3E8E5A",rutor:[
["🧫","En bortglömd skål","År 1928 kom forskaren Alexander Fleming tillbaka från semestern till sitt labb i London. Han hade glömt en skål med bakterier."],
["🍄","Mögel som dödade","I skålen hade det växt mögel. Runt mögelfläcken var alla bakterier döda."],
["🔬","Penicillium","Mögel heter Penicillium. Det gör ett ämne som dödar bakterier. Fleming kallade ämnet penicillin."],
["👩‍⚕️","Det tog över tio år","Det tog tills 1940-talet innan Howard Florey och Ernst Chain lyckades göra penicillinet till en riktig medicin."],
["🏥","Räddade miljoner","Före penicillin kunde ett litet sår eller en lunginflammation vara livsfarligt. Nu kunde läkare bota bakterieinfektioner."],
["🏅","Nobelpris","Fleming, Florey och Chain fick Nobelpriset 1945. Men penicillin dödar bara bakterier, inte virus, och man ska aldrig äta antibiotika i onödan."]]},

{id:"jast",titel:"Så jäser brödet",kat:"Natur",e:"🍞",c:"#C8933E",rutor:[
["🌾","Ett av de äldsta matlagen","Människor har bakat bröd i över 10 000 år. De äldsta bröden var platta och hårda."],
["🦠","Jäst är levande","Jäst är en liten svamp som består av en enda cell. Den vaknar när den får det varmt, vått och sött."],
["🫧","Jästen äter socker","När jästen äter socker i degen gör den koldioxid, samma gas som finns i läsk. Det bildas tusentals små bubblor."],
["🧶","Gluten fångar bubblorna","Vetemjölet innehåller gluten. När man knådar bildas en seg, elastisk väv som håller kvar gasen, som en ballong."],
["🔥","I ugnen","I ugnen utvidgas bubblorna och brödet växer. Vid ungefär 55 grader dör jästen, och degen blir fast och luftig."],
["🟤","Gyllene skorpa","Den bruna skorpan och den goda doften bildas när socker och proteiner reagerar med varandra i värmen. Det kallas Maillard-reaktionen."]]},

{id:"dans",titel:"Dans genom tiderna",kat:"Historia",e:"💃",c:"#C2467A",rutor:[
["🏺","Äldre än skriften","Människor har dansat i tusentals år. Gamla gravmålningar i Egypten visar dansare för över 4 000 år sedan."],
["🎭","Balett","Balett började vid furstehov i Italien för ungefär 500 år sedan. I Frankrike grundade kung Ludvig XIV en dansskola 1661."],
["🪗","Folkdans","I Sverige har man dansat folkdanser som polska och schottis i hundratals år, ofta till fiol och dragspel."],
["🕺","Moonwalk","1983 visade Michael Jackson sin berömda moonwalk, där han ser ut att gå bakåt medan han glider framåt."],
["🌆","Breakdance","Breakdance föddes i stadsdelen Bronx i New York på 1970-talet, bland unga som dansade till DJ:ns musik."],
["🏅","Olympiska spel","År 2024 blev breaking, som breakdance heter, en olympisk gren för första gången, i Paris."]]},

{id:"webb",titel:"James Webb-teleskopet",kat:"Rymden",e:"🔭",c:"#C99A2E",rutor:[
["🚀","Uppskjutet på juldagen","James Webb-teleskopet sköts upp den 25 december 2021. Det är det största och mest kraftfulla rymdteleskop som någonsin byggts."],
["📍","Långt bortom månen","Det befinner sig 1,5 miljoner kilometer från jorden, fyra gånger längre bort än månen."],
["🪞","Guldspegeln","Spegeln är 6,5 meter bred och består av 18 sexkantiga bitar av guldbelagd metall. Den fälldes ihop som origami för att få plats i raketen."],
["🧊","Ett jättestort solskydd","Teleskopet ser värme, infrarött ljus, så det måste vara iskallt, runt minus 230 grader. Ett solskydd stort som en tennisplan skyddar det."],
["🌌","De första galaxerna","Eftersom ljuset behöver tid ser teleskopet tillbaka i tiden. Det kan se galaxer som lyste över 13 miljarder år sedan."],
["📸","Första bilderna","I juli 2022 kom de första bilderna. De visade tusentals galaxer i en liten fläck av himlen och färgglada moln där stjärnor föds."]]},

{id:"sjokablar",titel:"Internet ligger på havsbotten",kat:"Tal",e:"🌐",c:"#1F7A8C",rutor:[
["🌐","Är internet i luften?","Nej. Nästan allt internet mellan länderna går genom kablar som ligger på havsbotten."],
["📏","Över en miljon kilometer","Det finns ungefär 500 kablar som tillsammans är över en miljon kilometer långa. Det är mer än två gånger till månen."],
["💡","Ljus i glasfiber","Inuti kablarna finns glasfibertrådar. Informationen skickas som ljusblixtar, tusentals miljoner varje sekund."],
["🪢","Tunna som en trädgårdsslang","Ute i djuphavet är kabeln bara ungefär lika tjock som en trädgårdsslang, men har ett skydd av stål och plast."],
["🚢","Kabelfartyg","Särskilda fartyg lägger ut kablarna och lagar dem när de går sönder, ibland på flera kilometers djup."],
["📜","Den första kabeln","Den första kabeln över Atlanten lades 1858. Den skickade telegram, och ett meddelande tog många timmar."]]},

{id:"chip",titel:"Mikrochipet",kat:"Tal",e:"🖥️",c:"#4A5D8F",rutor:[
["🏢","Datorer stora som rum","De första datorerna på 1940-talet fyllde ett helt rum och vägde flera ton. De använde glasrör."],
["🔌","Transistorn","1947 uppfann forskare transistorn. Den är en liten strömbrytare som kan slå på och av tusentals gånger i sekunden."],
["🧱","Sand blir chip","Chip görs av kisel, som finns i sand. Det renas, skärs i skivor och bearbetas i extremt rena rum."],
["🔬","Mindre än ett virus","Transistorerna är bara några miljondels millimeter stora. Ett hårstrå är tiotusentals gånger tjockare."],
["📱","Miljarder i en mobil","Ett chip i en mobil är stort som en nagel och har mer än tio miljarder transistorer."],
["⚡","Därför är allt smart","Utan chip skulle det inte finnas mobiler, bilar med datorer eller sjukhusens magnetkameror."]]},

{id:"mars",titel:"Robotar på Mars",kat:"Rymden",e:"🤖",c:"#B5532A",rutor:[
["🔴","Röd och död planet","Mars är kall, torr och full av damm. Ingen människa har varit där, men robotar har kört runt på ytan i många år."],
["🚙","Sojourner","1997 landade den första lilla roboten, Sojourner, som var ungefär lika stor som en mikrovågsugn."],
["🪨","Curiosity","Curiosity landade 2012. Den är stor som en bil och undersöker stenar för att hitta spår av vatten."],
["🛰️","Perseverance","I februari 2021 landade Perseverance i Jezerokratern, där det för länge sedan fanns en sjö. Den samlar stenprover."],
["🚁","Helikopter på Mars","Med Perseverance kom helikoptern Ingenuity. Den gjorde den första flygningen på en annan planet, i april 2021."],
["📡","Radiosignaler tar tid","Signalerna från jorden tar mellan 5 och 20 minuter att nå Mars. Därför kan man inte styra roboten med joystick."]]},

{id:"gps",titel:"Så vet mobilen var du är",kat:"Tal",e:"📍",c:"#2B8A6B",rutor:[
["📍","Hur vet kartan var du är?","Mobilen tar emot signaler från satelliter som flyger högt över jorden. Systemet heter GPS."],
["🛰️","Över 30 satelliter","GPS har ungefär 30 satelliter som flyger runt jorden på ungefär 20 000 kilometers höjd."],
["⏱️","Klockor i rymden","Varje satellit har en extremt exakt atomklocka. Den skickar ut tiden och var satelliten är."],
["📐","Räknar avstånd","Mobilen mäter hur lång tid signalen tog. Eftersom ljuset har en känd fart kan den räkna ut avståndet till satelliten."],
["🔺","Minst fyra satelliter","Med avstånd till minst fyra satelliter kan mobilen räkna ut exakt var den är, ofta inom några meter."],
["🧠","Einstein hjälper till","Satelliternas klockor går lite fortare än klockor på jorden, enligt Einsteins relativitetsteori. Utan korrigering skulle GPS bli fel redan efter någon timme."]]},

{id:"vaccin",titel:"Hur vaccin fungerar",kat:"Kroppen",e:"💉",c:"#3F8FB5",rutor:[
["🐄","Från en ko","Ordet vaccin kommer från latinets vacca, som betyder ko. Det är en historia om kor och mjölkpigor."],
["👨‍⚕️","Edward Jenner","1796 såg läkaren Edward Jenner att mjölkpigor som fått kokoppor inte fick de farliga smittkopporna."],
["💉","Första vaccinet","Jenner provade att ge en pojke lite kokoppsvätska. Pojken blev inte sjuk av smittkoppor när han senare utsattes."],
["🛡️","Tränar kroppen","Ett vaccin visar immunförsvaret en ofarlig bit av en sjukdom. Kroppen lär sig känna igen den, så den är redo."],
["🌍","Smittkoppor borta","Genom vaccinering försvann smittkopporna. 1980 förklarade WHO att sjukdomen var utrotad i hela världen."],
["🧒","Skyddar fler","Vaccin skyddar inte bara dig utan också människor som inte kan vaccineras, eftersom sjukdomen har svårare att sprida sig."]]},

{id:"leonardo",titel:"Leonardo da Vinci",kat:"Historia",e:"🎨",c:"#8A6E3E",rutor:[
["🎨","Konstnär och uppfinnare","Leonardo da Vinci levde i Italien för över 500 år sedan, 1452 till 1519. Han är mest känd för målningen Mona Lisa."],
["🖼️","Mona Lisa","Mona Lisa hänger i Louvren i Paris och ses av miljontals människor varje år. Hennes leende har fascinerat folk i hundratals år."],
["✍️","Spegelskrift","Leonardo skrev sina anteckningar i spegelskrift, från höger till vänster, så att man måste använda en spegel för att läsa dem."],
["🛩️","Flygmaskiner","Han ritade flygmaskiner, fallskärmar och pansarvagnar. Det mesta byggdes aldrig på hans tid, men många idéer liknar saker som kom senare."],
["🦴","Han studerade kroppen","Leonardo undersökte människokroppen för att kunna måla den rätt. Hans teckningar av muskler och ben är mycket exakta."],
["📓","Tusentals sidor","Av hans anteckningsböcker finns ungefär 7 000 sidor kvar, fulla av teckningar, idéer och tankar."]]}
,
{id:"ananas",titel:"Ananasen äter tillbaka",kat:"Natur",e:"🍍",c:"#D9A521",rutor:[
["🍍","Svider i munnen","Har du ätit ananas och känt att det svider eller sticker i munnen? Det beror på att ananasen faktiskt försöker smälta din mun."],
["🧪","Ett enzym","I ananasen finns ett ämne som heter bromelain. Det är ett enzym som bryter ner proteiner, samma sorts ämnen som tungan och kinderna består av."],
["👅","Små skador","Bromelain bryter ner lite av det yttersta skiktet i munnen. Det är en lindrig skada som läker på några timmar, och saliven skyddar dig."],
["🥩","Mördar tuggor","Bromelain används för att göra kött mört, eftersom det bryter ner de sega proteinerna i köttet."],
["🍮","Gelé som inte stelnar","Gelatin är också ett protein. Lägger du färsk ananas i gelé stelnar den inte, eftersom bromelain bryter ner gelatinet."],
["🥫","Burk går bra","Ananas på burk har värmts upp, och då slutar enzymet att fungera. Därför funkar den i gelé, och den sticker inte lika mycket."]]},

{id:"smaklokar",titel:"Smaklökarna",kat:"Kroppen",e:"👅",c:"#D6546B",rutor:[
["👅","Tusentals smaklökar","På tungan sitter ungefär 2 000 till 10 000 smaklökar. De byts ut ungefär var tionde till fjortonde dag."],
["🍬","Fem grundsmaker","Vi känner sött, surt, salt, bittert och umami, som är smaken av t.ex. parmesan och soja."],
["🗺️","Tungkartan stämmer inte","Man trodde att varje smak sitter på sin del av tungan. Det är fel. Alla smaker kan kännas på hela tungan."],
["🌶️","Chili är inte en smak","Chili ger inte en smak utan en smärtsignal. Ämnet capsaicin aktiverar nerver som tror att munnen är het."],
["❄️","Mint känns kall","Menthol i mynta aktiverar nerver som känner kyla. Munnen blir inte kallare, men hjärnan tror det."],
["🫐","Mirakelbär","Mirakelbäret från Västafrika gör att sur mat smakar sött i ungefär en halvtimme. Du kan äta en citron som om det vore godis."]]}
,
{id:"orkan",titel:"Orkaner",kat:"Natur",e:"🌀",c:"#3A6EA5",rutor:[
["🌊","Börjar över varmt hav","En orkan bildas över ett hav som är minst ungefär 26 grader varmt. Varm, fuktig luft stiger uppåt och bildar åskmoln."],
["🔄","Snurrar","Jordens rotation får vindarna att börja snurra. På norra halvklotet snurrar de moturs, åt vänster."],
["👁️","Ögat","I mitten finns ögat, ett område där det nästan är vindstilla och ibland sol. Runt ögat står ögonväggen med de allra starkaste vindarna."],
["💨","Över 119 km/h","Man kallar det en orkan när vinden blåser över 119 kilometer i timmen. De starkaste når över 250 kilometer i timmen."],
["🌍","Olika namn","Orkan heter tyfon i västra Stilla havet och cyklon i Indiska oceanen. Det är samma sorts storm."],
["🔤","Stormar får namn","Stormarna får namn från listor i bokstavsordning, så att alla kan hålla reda på dem. Namnen kommer från världsmeteorologiska organisationen."],
["🏠","Vattnet är farligast","Mest skada gör oftast stormfloden, när havet pressas in över land. Över land tappar orkanen sin kraft eftersom den inte får mer varmt vatten."]]},

{id:"krakatau",titel:"Krakatau 1883",kat:"Historia",e:"🌋",c:"#B5452A",rutor:[
["🏝️","En ö mellan Java och Sumatra","Krakatau var en vulkanö i Indonesien. I augusti 1883 började den få utbrott."],
["💥","Den sista smällen","Den 27 augusti kom fyra jättelika explosioner. Den sista hördes över 4 500 kilometer bort, kanske det högsta ljud människor någonsin har hört."],
["🌫️","Aska 80 km upp","Askan sköts upp mer än 70 kilometer, långt upp i atmosfären. På dagen blev det mörkt som natt."],
["🌊","Jättelika flodvågor","Explosionerna skapade tsunamier som var över 30 meter höga. Mer än 36 000 människor dog."],
["🌍","Tryckvågen gick runt jorden","Luftens tryckvåg gick flera varv runt jorden och syntes på mätinstrument över hela världen."],
["🌅","Röda solnedgångar","Askan i atmosfären gjorde solnedgångarna röda och starka på många platser i flera år."],
["👶","Krakataus barn","Ön sprängdes nästan helt. 1927 steg en ny vulkan upp ur havet på platsen. Den kallas Anak Krakatau, Krakataus barn."]]},

{id:"tjernobyl",titel:"Tjernobyl",kat:"Historia",e:"☢️",c:"#6E7B52",rutor:[
["⚡","Ett kärnkraftverk","Vid staden Tjernobyl i dagens Ukraina fanns ett stort kärnkraftverk med fyra reaktorer. Det drevs då av Sovjetunionen."],
["💥","Natten den 26 april 1986","Under ett test gick något fel i reaktor 4. Det blev två explosioner och en stor brand."],
["☁️","Ett radioaktivt moln","Explosionen släppte ut radioaktiva ämnen. Molnet spreds med vinden över stora delar av Europa."],
["🇸🇪","Sverige märkte det först","Två dagar senare larmade mätare på kärnkraftverket Forsmark i Sverige. Då förstod man att något hade hänt, innan Sovjetunionen berättade det."],
["🚌","Hela städer tömdes","Närmaste staden, Pripjat, tömdes på invånare, ungefär 50 000 människor. Totalt flyttades hundratusentals människor."],
["🏗️","Ett stort skydd","Reaktorn täcktes med betong, och sedan 2016 med ett jättelikt stålvalv som skydd mot strålningen."],
["🐺","Naturen tog tillbaka","I zonen runt kraftverket bor nästan inga människor. Där lever nu vargar, rådjur och vildhästar. Men ämnen finns kvar i marken, så området är fortfarande avspärrat."]]},

{id:"svampar",titel:"Svampar",kat:"Natur",e:"🍄",c:"#8A5A3C",rutor:[
["🍄","Varken växt eller djur","Svampar är ett eget rike. De är inte växter, de är faktiskt närmare släkt med djur."],
["🕸️","Mest under jord","Det du ser, svampen med hatt, är bara fruktkroppen. Den största delen är ett nät av tunna trådar, mycel, under marken."],
["🌲","Världens största levande varelse","I Oregon i USA växer en honungsskivling som täcker ungefär 9 kvadratkilometer, flera hundra fotbollsplaner. Den är flera tusen år gammal."],
["🤝","Skogens nätverk","Mycelet kopplar ihop träd. Forskare tror att träden delar socker och varnar varandra genom svamparna."],
["♻️","Städare i naturen","Många svampar bryter ner döda träd och löv till jord. Utan dem skulle skogen vara full av gamla grenar."],
["💊","Medicin och mat","Penicillinet kommer från en mögelsvamp. Jäst är också en svamp, och vi äter champinjoner, kantareller och många fler. Men plocka aldrig svamp du inte är helt säker på, för vissa är giftiga."]]},

{id:"spinnande",titel:"Därför spinner katter",kat:"Natur",e:"🐱",c:"#B88A4A",rutor:[
["🐱","Ett ljud som vibrerar","När katter spinner vibrerar det i kroppen. Kroppen skakar snabbt, 25 till 150 gånger varje sekund."],
["🧠","Hjärnan styr","Hjärnan skickar signaler till musklerna i struphuvudet, som öppnar och stänger stämspringan snabbt. Det ger ljudet, både när katten andas in och ut."],
["😌","Inte bara glad","Katter spinner när de trivs, men också när de är oroliga, har ont eller är hos veterinären. Det kan vara ett sätt att lugna sig själva."],
["🍼","Redan som kattungar","Kattungar börjar spinna när de är bara några dagar gamla. Det visar mamman att allt är bra och hjälper dem att hitta mjölken."],
["🦴","Kan det läka?","Vissa forskare tror att vibrationerna i spinnandet kan hjälpa kroppen att läka sig själv. Det är inte säkert än."],
["🦁","Stora katter","Geparder och pumor kan spinna. Lejon, tigrar och jaguarer kan inte spinna på samma sätt, men de kan ryta."]]},

{id:"raket",titel:"Hur fungerar en raket?",kat:"Rymden",e:"🚀",c:"#D1583A",rutor:[
["💨","Gas åt ena hållet","En raket fungerar genom att trycka ut het gas bakåt, och då åker raketen framåt. Det kallas rekyl."],
["📐","Newtons tredje lag","Newton upptäckte att varje kraft har en lika stor motkraft åt andra hållet. När gasen rusar ut åt ena hållet pressas raketen åt det andra."],
["🌌","Även i tomma rymden","Raketer fungerar utan luft. De behöver inte trycka mot något, eftersom gasen själv ger kraften."],
["🔥","Bränsle och syre","Raketer tar med sig både bränsle och syre, så att de kan brinna även där det inte finns luft."],
["🪜","Flera steg","För att nå rymden släpper raketen tomma tankar på vägen. Då blir den lättare och kan accelerera mer."],
["🛰️","Fart som en kula","För att stanna i bana runt jorden behövs en fart på ungefär 28 000 kilometer i timmen. Det är ungefär 8 kilometer per sekund."],
["♻️","Raketer som landar","Sedan 2015 har man lyckats landa raketsteg efter uppskjutning så att de kan användas igen. Det sparar mycket pengar."]]},

{id:"curie",lank:[["Lyssna: Marie Curie (Historierummet)","https://www.sverigesradio.se/avsnitt/historierummet-marie-curie"]],titel:"Marie Curie",kat:"Historia",e:"👩‍🔬",c:"#7A4FA3",rutor:[
["👩‍🔬","Marie Curie","Marie Curie är en av historiens mest berömda forskare. Hon upptäckte två nya grundämnen och fick två Nobelpris."],
["🇵🇱","Född i Polen","Hon föddes 1867 i Warszawa i Polen och hette då Maria Skłodowska. På den tiden fick kvinnor inte studera på universitetet där."],
["🎓","Studier i Paris","År 1891 flyttade hon till Paris och läste fysik och matematik vid universitetet Sorbonne. Hon var fattig och bodde i ett litet, kallt rum."],
["💑","Marie och Pierre","I Paris träffade hon fysikern Pierre Curie. De gifte sig 1895 och forskade tillsammans i ett enkelt, kallt laboratorium."],
["☢️","Radium och polonium","År 1898 upptäckte de två nya grundämnen. Det ena kallade hon polonium, efter hennes hemland Polen. Det andra fick namnet radium. Det var Marie som började använda ordet radioaktivitet."],
["🏅","Två Nobelpris","År 1903 fick hon Nobelpriset i fysik tillsammans med Pierre och Henri Becquerel. År 1911 fick hon ett i kemi. Hon är den enda som fått Nobelpris i två olika vetenskaper."],
["🚑","Röntgenbilar i kriget","Under första världskriget lät hon bygga bilar med röntgenapparater som åkte till fronten. Då kunde läkare se kulor och brutna ben hos sårade soldater."],
["⚠️","Ett farligt arbete","På den tiden visste man inte att strålningen var farlig. Marie Curie dog 1934, troligen av sjukdom orsakad av strålningen. Hennes anteckningsböcker är fortfarande radioaktiva."],
["👩‍👧","Dottern Irène","Hennes dotter Irène blev också forskare och fick Nobelpriset i kemi 1935. Marie, Pierre, Irène och Irènes man Frédéric har alla fått Nobelpris."]]}

];
