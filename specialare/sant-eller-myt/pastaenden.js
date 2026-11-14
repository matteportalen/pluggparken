const REGNBAGSFAKTA = "https://www.nesdis.noaa.gov/about/k-12-education/optical-phenomena/what-causes-rainbow";
const HIMMELSFAKTA = "https://spaceplace.nasa.gov/blue-sky/en/";
const DINOSAURIEFAKTA = "https://www.amnh.org/dinosaurs/dinosaur-facts";
const MANFAKTA = "https://science.nasa.gov/moon/top-moon-questions/";
const MYTAMNEN = [
  {
    id: "vikingatiden", titel: "Vikingatiden", farg: "#e5aa64",
    omslag: "../../vikingatiden/bilder/skepp.jpg",
    pastaenden: VIKINGAPASTAENDEN.map(({q, r, f, e, kred}) => ({
      fraga: q, svar: r, forklaring: f.replace(/^(Myt|Sant)! /, ""),
      bild: e ? {url: "../../vikingatiden/bilder/" + e + ".jpg", kred} : null
    }))
  },
  {
    id: "dinosaurier", titel: "Dinosaurier", farg: "#86c781", omslag: "../bilder/dinosaurier-1.jpg",
    pastaenden: [
      {fraga: "Alla dinosaurier dog ut.", svar: "myt", foto: 4, alt: "En höna", bildEfterSvar: true,
        forklaring: "Dagens fåglar är dinosaurier. En höna hör alltså till den gren av dinosaurierna som överlevde.", kalla: DINOSAURIEFAKTA},
      {fraga: "En del dinosaurier hade fjädrar.", svar: "sant", bildEfterSvar: true, alt: "Fossil av Archaeopteryx med fjäderavtryck runt vingarna",
        bild: {url: "urfagel.jpg", kred: "Mike Dickison · CC0 · Wikimedia Commons", kalla: "https://commons.wikimedia.org/wiki/File:Archaeopteryx_in_Berlin_Museum.jpg"},
        forklaring: "Forskare har hittat fossil där man kan se spår av fjädrar. Därför vet vi att vissa dinosaurier var fjäderklädda.",
        kalla: "https://www.amnh.org/learn-teach/curriculum-collections/dinosaurs-activities-and-lesson-plans/explore-the-family-tree-of-birds"},
      {fraga: "Stegosaurus och T. rex levde samtidigt.", svar: "myt", foto: 0, alt: "Skelett av en T. rex",
        forklaring: "Stegosaurus levde många miljoner år innan T. rex dök upp. De hade aldrig kunnat träffas.", kalla: DINOSAURIEFAKTA},
      {fraga: "Det finns dinosaurieägg bevarade som fossil.", svar: "sant", foto: 2, alt: "Fossila dinosaurieägg", bildEfterSvar: true,
        forklaring: "Forskare har hittat fossil av både ägg och hela bon. I vissa ägg finns det till och med rester av ungen kvar.", kalla: DINOSAURIEFAKTA},
      {fraga: "En dinosauries fotspår kan bli fossil.", svar: "sant",
        forklaring: "Ett fotspår i mjuk lera kan täckas av nya lager och bevaras i berg. Flera spår i rad kan visa hur djuret rörde sig.", kalla: DINOSAURIEFAKTA},
      {fraga: "Flygödlor som pterodaktylen var dinosaurier.", svar: "myt",
        forklaring: "Flygödlor och dinosaurier var olika grupper av kräldjur. De levde samtidigt, så det är lätt att blanda ihop dem.",
        kalla: "https://www.amnh.org/dinosaurs/types-of-dinosaurs"},
      {fraga: "En del dinosaurier var ungefär lika små som en höna.", svar: "sant",
        forklaring: "En del dinosaurier var jättar. Andra var så små att en vanlig höna kan ge en bild av deras storlek.",
        kalla: "https://www.amnh.org/dinosaurs/types-of-dinosaurs"},
      {fraga: "Alla dinosaurier åt kött.", svar: "myt", foto: 1, alt: "Ett skelett av den långhalsade dinosaurien Diplodocus",
        forklaring: "Många dinosaurier åt växter. Diplodocus var en av de stora växtätarna.",
        kalla: "https://www.amnh.org/dinosaurs/types-of-dinosaurs"},
      {fraga: "Avtryck av dinosauriers hud kan bevaras i sten.", svar: "sant",
        forklaring: "Ibland har huden lämnat ett mönster i marken som bevarats som fossil. Då går det att se hur huden såg ut på just den delen av kroppen.", kalla: DINOSAURIEFAKTA},
      {fraga: "En stor asteroid slog ner när de sista dinosaurierna utom fåglarna dog ut.", svar: "sant",
        forklaring: "Nedslaget för ungefär 66 miljoner år sedan förändrade miljön kraftigt. Många djur och växter dog ut vid den tiden.", kalla: DINOSAURIEFAKTA}
    ]
  },
  {
    id: "manen", titel: "Månen", farg: "#a2aeff", omslag: "../bilder/manen-1.jpg",
    pastaenden: [
      {fraga: "Månen lyser av sig själv.", svar: "myt", foto: 0, alt: "En ljus fullmåne",
        forklaring: "Solen lyser på månen. När en del av ljuset studsar från månytan mot jorden ser vi månen lysa.", kalla: MANFAKTA},
      {fraga: "Man kan se månen mitt på dagen.", svar: "sant", bildEfterSvar: true, alt: "Månen på en blå daghimmel",
        bild: {url: "dagsmane.jpg", kred: "Andrew Fogg · CC BY 2.0 · Wikimedia Commons", kalla: "https://commons.wikimedia.org/wiki/File:Daytime_moon_(4631813390).jpg"},
        forklaring: "Månen kan vara uppe samtidigt som solen. Om den är tillräckligt ljus ser vi den även mot en blå himmel.", kalla: MANFAKTA},
      {fraga: "Jordens skugga orsakar månens vanliga faser.", svar: "myt", foto: 5, alt: "En teckning av månens olika faser",
        forklaring: "När månen rör sig runt jorden ser vi olika mycket av månens solbelysta sida. Jordens skugga faller på månen vid en månförmörkelse.", kalla: MANFAKTA},
      {fraga: "Månens baksida får solljus.", svar: "sant",
        forklaring: "När månen är ny får sidan som vetter bort från jorden mest solljus. Månen har dag och natt även på baksidan.", kalla: MANFAKTA},
      {fraga: "Månen snurrar runt sin egen axel.", svar: "sant", foto: 1, alt: "Jorden och månen med avståndet mellan dem",
        forklaring: "Månen snurrar ett varv på samma tid som den går ett varv runt jorden. Därför ser vi ungefär samma sida hela tiden.", kalla: MANFAKTA},
      {fraga: "Månen drar lika hårt i dig som jorden gör.", svar: "myt",
        forklaring: "På månens yta är tyngdkraften ungefär en sjättedel av jordens. Där skulle du kunna hoppa högre.", kalla: MANFAKTA},
      {fraga: "Stenar från rymden har gjort kratrar på månen.", svar: "sant",
        forklaring: "När en sten träffar månytan i hög fart kan den slå upp en grop som kallas krater.", kalla: "https://science.nasa.gov/moon/facts/"},
      {fraga: "Vind kan blåsa bort astronauternas fotspår på månen.", svar: "myt", foto: 4, alt: "Ett stövelavtryck på månen",
        forklaring: "Månen har nästan ingen atmosfär, så det blåser ingen vind som kan sudda ut spåren. Små nedslag kan nöta bort dem med tiden.", kalla: "https://science.nasa.gov/moon/facts/"},
      {fraga: "Det finns vattenis på månen.", svar: "sant",
        forklaring: "Is har hittats bland annat i skuggiga kratrar nära månens poler. Där kan det vara kallt året runt.", kalla: "https://science.nasa.gov/moon/facts/"},
      {fraga: "Bara två människor har gått på månen.", svar: "myt", foto: 2, alt: "Astronauten John Young på månen",
        forklaring: "Två astronauter gick på månen vid den första landningen. Med alla Apolloresor räknade blev det tolv personer som gick på månen.", kalla: MANFAKTA}
    ]
  },
  {
    id: "kroppen", titel: "Kroppen", farg: "#ffacaa", omslag: "../bilder/kroppen-2.jpg",
    pastaenden: [
      {fraga: "Blodet i dina vener är blått.", svar: "myt",
        forklaring: "Blodet är rött även när det innehåller mindre syre. Vener kan se blå ut genom huden på grund av hur ljuset rör sig genom den.",
        kalla: "https://www.nigms.nih.gov/biobeat/2019/02/roses-are-red-and-so-is-blood"},
      {fraga: "Du har små ben inuti öronen.", svar: "sant", bildEfterSvar: true, alt: "Mellanörats tre ben bredvid ett mynt",
        bild: {url: "horselben.jpg", kred: "Anatomist90, beskuren av Huntster · CC BY-SA 3.0 · Wikimedia Commons", kalla: "https://commons.wikimedia.org/wiki/File:Slide1ghe.JPG"},
        forklaring: "I varje mellanöra finns hammaren, städet och stigbygeln. De för vibrationer från trumhinnan vidare när du hör ett ljud.",
        kalla: "https://www.nidcd.nih.gov/health/how-do-we-hear"},
      {fraga: "En vuxen har fler ben i kroppen än en bebis.", svar: "myt", foto: 1, alt: "En modell av människans skelett",
        forklaring: "En bebis har fler ben. När barnet blir större växer en del av benen ihop.",
        kalla: "https://www.niams.nih.gov/health-topics/educational-resources/health-lesson-learning-about-bones"},
      {fraga: "Det hårdaste materialet i kroppen finns på tänderna.", svar: "sant", foto: 4, alt: "En teckning av en tand i genomskärning", bildEfterSvar: true,
        forklaring: "Tandens yttersta lager heter emalj. Emaljen är hårdare än ben och skyddar tanden när du tuggar.",
        kalla: "https://www.nidcr.nih.gov/sites/default/files/2021-12/Oral-Health-in-America-Advances-and-Challenges.pdf"},
      {fraga: "Huden är kroppens största organ.", svar: "sant",
        forklaring: "Huden täcker hela kroppen och hjälper bland annat till att skydda oss och hålla kroppstemperaturen lagom.",
        kalla: "https://www.ncbi.nlm.nih.gov/books/NBK20361/"},
      {fraga: "En del av ditt blod bildas inuti skelettet.", svar: "sant",
        forklaring: "Inuti många ben finns benmärg. Där bildas nya blodceller.", kalla: "https://www.niams.nih.gov/health-topics/educational-resources/health-lesson-learning-about-bones"},
      {fraga: "Blodet hämtar syre i hjärtat.", svar: "myt",
        forklaring: "Hjärtat pumpar blodet till lungorna. Där tar blodet upp syre innan det åker vidare ut i kroppen.", kalla: "https://www.nhlbi.nih.gov/health/heart/anatomy"},
      {fraga: "Vissa muskler jobbar även när du sover.", svar: "sant",
        forklaring: "Hjärtmuskeln fortsätter pumpa under sömnen. Musklerna som hjälper dig att andas arbetar också vidare.", kalla: "https://www.niams.nih.gov/health-topics/educational-resources/health-lesson-learning-about-muscles"},
      {fraga: "Du kan bara känna söt smak längst fram på tungan.", svar: "myt",
        forklaring: "Smaklökar som känner sötma finns på flera delar av tungan. Detsamma gäller de andra grundsmakerna.", kalla: "https://www.nidcd.nih.gov/health/taste-disorders"},
      {fraga: "Luktsinnet hjälper dig att känna skillnad på olika smaker.", svar: "sant", foto: 5, alt: "Ett barn luktar på en blomma",
        forklaring: "När du tuggar kommer dofter upp till näsan inifrån munnen. När du är täppt kan du fortfarande känna till exempel sött, men det kan bli svårare att känna vad du äter.", kalla: "https://www.nidcd.nih.gov/health/taste-disorders"}
    ]
  },
  {
    id: "ljus-och-synvillor", titel: "Ljus och synvillor", farg: "#ffcf77", omslag: "../bilder/regnbage-1.jpg",
    pastaenden: [
      {fraga: "Två rutor med exakt samma grå färg kan se olika ljusa ut.", svar: "sant", prov: "kontrast",
        forklaring: "En grå ruta kan se ljusare ut mot mörk bakgrund. Ta bort bakgrunderna och jämför rutorna på nytt.",
        kalla: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3592747/"},
      {fraga: "Två personer på olika platser får alltid regnbågens ljus från samma regndroppar.", svar: "myt",
        bild: {url: "../bilder/regnbage-1.jpg", kred: "B.navez · CC BY-SA 3.0 · Wikimedia Commons", kalla: "https://commons.wikimedia.org/wiki/File:Rainbow_over_the_house_in_the_sugar_cane_fields.JPG"},
        alt: "En regnbåge över ett hus", forklaring: "Vilka droppar som skickar ljuset mot dina ögon beror på var du står. Flyttar du dig kan andra droppar ge dig samma färger.", kalla: REGNBAGSFAKTA},
      {fraga: "Ett prisma kan dela upp solljus i olika färger.", svar: "sant",
        forklaring: "Solljus innehåller många färger. När ljuset går genom prismat böjs färgerna olika mycket och går åt lite olika håll.",
        kalla: "https://science.nasa.gov/learn/heat/resource/colors-of-sunlight-mini-experiments/"},
      {fraga: "En regnbåge kan synas som en hel cirkel.", svar: "sant",
        forklaring: "Från marken ser vi oftast bara den övre delen. Högt upp kan du få syn på hela cirkeln om det finns vattendroppar åt rätt håll.", kalla: REGNBAGSFAKTA},
      {fraga: "Färgerna ligger i samma ordning i båda bågarna i en dubbel regnbåge.", svar: "myt",
        forklaring: "Den yttre bågen har rött längst in. Där har ljuset studsat två gånger inuti dropparna, så färgernas ordning blir omvänd.", kalla: REGNBAGSFAKTA},
      {fraga: "Luften sprider blått solljus mer än rött solljus.", svar: "sant",
        forklaring: "En del av det blå ljuset sprids åt alla håll av molekyler i luften. Det är därför du ser blått nästan vart du än tittar på en klar dag.", kalla: HIMMELSFAKTA},
      {fraga: "Vid solnedgång går solljuset en kortare väg genom luften än mitt på dagen.", svar: "myt",
        forklaring: "När solen står lågt går ljuset en längre väg genom atmosfären. Mer av det blå ljuset sprids bort och det röda och orange syns tydligare.", kalla: HIMMELSFAKTA},
      {fraga: "En del av näthinnan saknar celler som kan känna av ljus.", svar: "sant", prov: "blindflack",
        forklaring: "Där synnerven lämnar ögat finns inga ljuskänsliga celler. Den platsen kallas blinda fläcken.",
        kalla: "https://www.exploratorium.edu/snacks/blind-spot"},
      {fraga: "Om du har blundat med ett öga måste du se ett svart hål där blinda fläcken är.", svar: "myt",
        forklaring: "Hjärnan kan fylla i det som saknas med hjälp av det som syns runt omkring. I testet kan den vita bakgrunden se hel ut när pricken försvinner.",
        kalla: "https://www.exploratorium.edu/snacks/blind-spot"},
      {fraga: "Du kan se en färgfläck på vitt papper efter att ha tittat på något rött.", svar: "sant",
        forklaring: "När du tittar länge på en röd färg blir synen tillfälligt mindre känslig för rött på just den platsen. När du tittar på vitt kan det se blågrönt ut där en kort stund.",
        kalla: "https://annex.exploratorium.edu/colorfest/trythis.html"}
    ]
  }
];
