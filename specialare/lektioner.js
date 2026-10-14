/* Minilektioner till Specialare.
   Lägg till en ny lektion sist i listan. Varje bild i en lektion är [emoji, rubrik, text].
   kat: Rymden, Natur, Historia, Kroppen, Tal, Hjärnan  ·  c = färg på kortet  ·  e = ikon */
var LEKTIONER=[
{id:"titanic",titel:"Titanic",kat:"Historia",e:"🚢",c:"#3B6EA8",rutor:[
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
["🦐","Liv även där","Forskare har hittat små räkliknande djur och andra varelser som lever där nere. Liv finns nästan överallt!"]]},

{id:"vulkan",titel:"Så fungerar en vulkan",kat:"Natur",e:"🌋",c:"#C4511F",rutor:[
["🌍","Jorden är het inuti","Långt ner under våra fötter är det så varmt att berg kan smälta. Smält berg kallas magma."],
["⬆️","Magman stiger","Magma är lättare än hårt berg, så den stiger uppåt genom sprickor, som en bubbla i en sirapsburk."],
["💥","Utbrott!","När magman når ytan eller trycket blir för stort kommer ett utbrott. Gaser, aska och het sten flyger upp."],
["🔥","Lava","Magma som kommer ut på ytan kallas lava. Den kan vara över 1 000 grader varm."],
["⛰️","Berget växer","När lavan svalnar blir den hård sten. Utbrott efter utbrott bygger upp ett berg, en vulkan."],
["🇮🇸","Island","Island har många vulkaner, eftersom ön ligger där två jordplattor möts. Där finns även varma källor."]]},

{id:"svartahal",titel:"Svarta hål",kat:"Rymden",e:"🕳️",c:"#34255E",rutor:[
["🕳️","Ett hål i rymden?","Ett svart hål är inte riktigt ett hål. Det är en plats där väldigt mycket materia har trängts ihop på en liten yta."],
["🧲","Enormt stark dragning","Dragningskraften är så stark att inget kan komma ut, inte ens ljus. Det är därför det är svart."],
["⭐","Hur blir de till?","Många svarta hål bildas när en mycket stor stjärna får slut på bränsle och faller ihop."],
["🌌","I mitten av Vintergatan","Mitt i vår galax, Vintergatan, finns ett jättelikt svart hål. Det väger ungefär 4 miljoner gånger så mycket som solen."],
["📸","Första fotot","År 2019 tog forskare den första bilden av ett svart hål: en glödande ring runt en mörk mitt."],
["😌","Ingen fara för oss","Det närmaste vi känner till ligger tusentals ljusår bort. Det kan inte hämta in jorden."]]},

{id:"dinosaurier",titel:"Dinosaurierna",kat:"Natur",e:"🦖",c:"#5B8C3E",rutor:[
["🦖","Jordens jättar","Dinosaurier levde på jorden i ungefär 165 miljoner år. Människan har bara funnits i några hundratusen år."],
["🦕","Alla storlekar","Vissa var stora som flera bussar efter varandra, andra var små som en kyckling."],
["🥚","De la ägg","Alla dinosaurier kläcktes ur ägg, precis som fåglar och krokodiler."],
["☄️","Asteroiden","För ungefär 66 miljoner år sedan slog en stor asteroid ner vid dagens Mexiko. Klimatet förändrades och de flesta dinosaurier dog ut."],
["🐦","De finns kvar!","Några små dinosaurier överlevde och blev fåglar. En höna är alltså en slags dinosaurie."],
["🔨","Fossil","Vi vet allt det här tack vare fossil: ben och avtryck som blivit till sten under miljoner år."]]},

{id:"pyramid",titel:"Pyramiderna i Egypten",kat:"Historia",e:"🏜️",c:"#C99A2E",rutor:[
["🏜️","Mitt i öknen","Vid Giza i Egypten står Cheopspyramiden. Den byggdes för ungefär 4 500 år sedan."],
["🪨","Miljontals stenblock","Pyramiden består av över två miljoner stenblock. Många av dem väger lika mycket som en bil."],
["📏","Högst i världen","I nästan 4 000 år var den det högsta byggnadsverket på jorden. Från början var den ungefär 146 meter hög."],
["👷","Vem byggde den?","Tusentals arbetare byggde den under många år. De hade inga kranar, utan använde ramper, rep och mycket muskelkraft."],
["⚰️","En grav","Pyramiden byggdes som grav åt kungen, farao Cheops. De trodde att han skulle behöva sina saker i nästa liv."],
["🧭","Exakt byggd","Sidorna pekar nästan exakt mot norr, söder, öster och väster. Det är fantastiskt noggrant för så länge sedan."]]},

{id:"blaval",titel:"Blåvalen",kat:"Natur",e:"🐋",c:"#2F7FB5",rutor:[
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

{id:"stora-tal",titel:"Hur stor är en miljard?",kat:"Tal",e:"🔢",c:"#2E7D5B",rutor:[
["🔢","Stora tal","En miljon är 1 000 000. En miljard är tusen miljoner. Det är svårt att föreställa sig, så vi räknar med tid."],
["⏱️","En miljon sekunder","1 miljon sekunder är ungefär 11 och en halv dag."],
["📅","En miljard sekunder","1 miljard sekunder är ungefär 31 år och 8 månader! Det är en jättestor skillnad."],
["🧮","Mellan dem","Skillnaden mellan en miljon och en miljard är lika stor som mellan 11 dagar och nästan 32 år."],
["🌍","Biljon","En biljon är tusen miljarder. En biljon sekunder är över 31 000 år. Då levde mammutar och människor jagade med spjut."],
["💡","Tänk på","Siffror ser ibland små ut, men de kan vara enorma. Nollorna gör hela skillnaden."]]},

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
["⭐","Stjärnstoft","Du är alltså, på riktigt, gjord av stjärnstoft!"]]}
];
