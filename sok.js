/* Sökning på hela Pluggparken. Laddas först när man trycker på 🔍 i sidhuvudet (huvud.js) eller på ett sökfält.
   IDX = [adress från roten, namn, kort text, ikon, sökord, plats]. Ny övning: lägg en rad här. Specialares lektioner
   skapas av `node skript/bygg-sok.js` (raderna mellan LEKTIONER-START och LEKTIONER-SLUT). */
(function(){
"use strict";
const ROT=new URL('.',document.currentScript.src).href;
const IDX=[
 ['tiointe/','10 eller inte 10?','En bild blinkar fram. Var det tio?','🔟','tio tiokompisar subitisering snabbseende tärning tioram fingrar prickar blink','Matte'],
 ['lillaplus/','Lilla plus & minus','Huvudräkning med tal upp till 10','🐔','addition subtraktion plus minus hönsgård ägg räkna','Matte'],
 ['tiotal/','Tiotalsövergång','Räkna via tiotalet med tioruta och tallinje','🚌','tiotalsövergång 10 addition subtraktion plus minus över tio tiokompisar buss tioruta hundraruta','Matte'],
 ['uppstallning/','Uppställning','Addition och subtraktion som i boken, med minnessiffra och växling','📝','uppställning minnessiffra växling skriftlig addition subtraktion plus minus låna','Matte'],
 ['multiplikation/','Multiplikation','Tabellerna 1–10. Samla medaljer','✖️','gånger tabeller multiplikationstabellen bageri medaljer','Matte'],
 ['division/','Division','Dela lika, med och utan rest','➗','dividera dela lika rest kalas påsar','Matte'],
 ['delaupp/','Dela upp och dela','Dela upp täljaren i delar som är lätta att dela','🧱','division uppdelning täljare nämnare klossar','Matte'],
 ['kortdivision/','Kort division','Dela siffra för siffra med rest','➗','liggande stolen trappan division siffra för siffra rest decimaler','Matte'],
 ['hundraruta/','Hundrarutan','Steg åt sidan är ett, steg upp och ner är tio','💯','hundra ruta 100 tal hoppa tiohopp trasig hundrarutan','Matte'],
 ['talfoljd/','Talföljder','Hitta mönstret och hjälp grodan över bäcken','🐸','mönster tal grodan regel ökar minskar','Matte'],
 ['vagen/','Vågen','Likhetstecknet: lika mycket på båda sidor','⚖️','likhetstecken balans lika mycket ekvation våg','Matte'],
 ['gomda/','Gömda tal','Djuren har gömt tal. Lista ut vilka','🎁','ekvation okänt tal djur gåta lista ut','Matte'],
 ['brak/','Bråk','Halvor, fjärdedelar och andra delar','🍕','halva halvor fjärdedel tredjedel pizza tårta chokladkaka delar jämför','Matte'],
 ['brakbitar/','Bråkbitarna','Bygg med bråkbitar','🧩','bråk bygga lika stora addition subtraktion decimal procent','Matte'],
 ['klockan/','Klockan','Analog och digital tid, och att mäta tid','🕒','tid analog digital station tåg kvart halv över i minuter timmar','Matte'],
 ['matning/','Mätning','Mät med linjalen, väg och häll','📏','längd vikt volym linjal centimeter kilo liter dl hg massa','Matte'],
 ['geometri/','Geometri','Former, kroppar, symmetri, area och tangram','🔷','former kroppar symmetri area omkrets tangram hörn vinklar sträcka mönster fjäril spegel','Matte'],
 ['taluppfattning/','Bedömningsstöd i taluppfattning','Åk 1 och 2, för lärare','📋','diagnos bedömning lärare åk 1 åk 2 tallinje','Matte'],
 ['np3/','Nationella prov','Träna inför proven i åk 3','📝','nationella prov åk 3 np prov','Matte'],
 ['mittrum/','Mitt rum','Inred med mynt','🏠','rum möbler inredning djur mynt sängen','Matte'],
 ['index.html#garderob','Garderoben','Köp kläder och saker till ditt djur','👗','kläder hatt djur mynt klistermärken stjärnor','Matte'],
 ['spel/','Spelhörnan','Spel där man räknar för att vinna','🎮','spel alla spel','Matte'],
 ['verktyg/','Verktygslådan','Verktyg att räkna och visa med','🧰','verktyg material laborativt','Matte'],
 ['spel/skattjakten/','Skattjakten','Labyrint med textuppgifter och skatter','🗺️','labyrint skatt kista affär nyckel','Spelhörnan'],
 ['rutjakten/','Rutjakten','Hitta de tre talen som hör ihop i varje ruta','🟩','kors ruta addition multiplikation tid femhörning rutnät','Spelhörnan'],
 ['spel/kulbanan/','Kulbanan','Skjut svaret dit där tre kulor blir samma tal','🔺','kulor pyramid skjuta tabeller zuma','Spelhörnan'],
 ['spel/sagoriket/','Sagoriket','Spring och hoppa med ditt djur och svara vid portarna','🏰','plattformsspel hoppa trollstav boss världar','Spelhörnan'],
 ['spel/sifferslottet/','Sifferslottet','Hämta talen i rätt ordning innan tiden tar slut','🏰','slott rum tal ordning ekvation tid nyckel','Spelhörnan'],
 ['spel/affaren/','Affären','Stå i kassan, räkna ihop och ge växel','🏪','butik kiosk kassa växel pengar handla priser','Spelhörnan'],
 ['spel/#bub','Bubbelskjutaren','Skjut bubblor med rätt svar','🫧','bubblor poppa skjuta världar havet','Spelhörnan'],
 ['spel/#tower','Tornbygget','Svara rätt och bygg tornet mot månen','🏗️','torn kran balk bygga','Spelhörnan'],
 ['spel/#mem','Memory','Hitta paren, själv eller mot en vän','🃏','minnesspel par två spelare kort','Spelhörnan'],
 ['spel/#tug','Dragkampen','Räkna snabbast och dra repet','🪢','rep dra två spelare robot','Spelhörnan'],
 ['spel/#car','Racerbanan','Svara rätt och kör om motståndarna','🏎️','bil race garage tävling','Spelhörnan'],
 ['spel/#frog','Grodhoppet','Hoppa med grodan','🐸','groda hopp tallinje','Spelhörnan'],
 ['hundraruta/#verktyg','Hundrarutan (verktyg)','Markera tal och hoppa','💯','hundra ruta verktyg hoppa','Verktygslådan'],
 ['verktyg/tallinjen/','Tallinjen','Hoppa fram och tillbaka på en tallinje','📏','tallinje hoppa addition subtraktion','Verktygslådan'],
 ['verktyg/kulramen/','Kulramen','Räkna med röda och vita kulor','🔴','kulram räknehjälp kulor tio tiokompisar','Verktygslådan'],
 ['verktyg/brakvaggen/','Bråkväggen','Bråkstavar från en hel till tolftedelar','🧱','bråk vägg stavar procent decimal linjal','Verktygslådan'],
 ['verktyg/klockan/','Klockan (verktyg)','Dra i visarna och mät tid','🕒','klocka visare mäta tid tidsblock','Verktygslådan'],
 ['tiobas/','Tiobas','Träklossar: ental, tiostavar, hundraplattor och tusenkuber','🧱','tiobasmaterial klossar ental tiotal hundratal tusental växla','Verktygslådan'],
 ['geometri/#spegel','Spegelmåla','Rita, och spegeln ritar andra halvan','🪞','symmetri rita kalejdoskop spegel måla','Verktygslådan'],
 ['ovriga/','Fler ämnen','Svenska, NO, SO, engelska och mer','📚','ämnen andra ämnen','Fler ämnen'],
 ['ovriga/ordgomma/','Ordgömman','Hitta de gömda orden i tio teman','🔤','ordsök ord gömda bokstäver tema','Svenska'],
 ['meningsbyggaren/','Meningsbyggaren','Sätt orden i rätt ordning, stor bokstav och skiljetecken','🧩','mening meningar ord ordning stor bokstav punkt frågetecken utropstecken skiljetecken grammatik skriva svenska','Svenska'],
 ['ordkedjan/','Ordkedjan','Skriv ett ord som börjar på sista bokstaven i förra ordet','⛓️','ordkedja ord bokstav kedja katt tak kaka ordlek svenska stava','Svenska'],
 ['ordgissning/','Ordgissning','Gissa det hemliga ordet, grönt gult grått, som Wordle','🔤','wordle gissa ord bokstäver ordlek ledtråd svenska stava','Svenska'],
 ['dubbelteckning/','Dubbelteckning','Kamma eller kama? Stavning med två konsonanter','✍️','dubbelteckning stavning dubbla konsonanter kamma kama ck stava svenska kort vokal lång vokal','Svenska'],
 ['sagobyggaren/','Sagobyggaren','bygg en saga berätta skriva berättelse sagobok','📖','saga berättelse skriva hjälte bok','Svenska'],
 ['ovriga/ordgatan/','Ordgåtan','Läs ledtråden och gissa ordet','❓','ordgåta ledtråd gissa ord krysslösning','Svenska'],
 ['ovriga/hogfrekventa/','Högfrekventa ord','De 200 vanligaste orden, blixtläs och hitta ordet','📖','läsa ord blixtläsning helordsläsning ord på en minut läsfel mikrofon','Svenska'],
 ['ovriga/bokstaver/','Bokstäver','Kolla av vilka bokstäver man kan','🔤','bokstäver ljud abc läsinlärning','Svenska'],
 ['ovriga/lasflyt/','Läsflyt','Läs en kort text flera gånger med en vuxen','📖','läsa text flyt upprepad läsning','Svenska'],
 ['ovriga/rita/','Draw it!','Rita ordet på engelska så gissar datorn','🎨','engelska rita gissa quick draw glosor','Engelska'],
 ['ovriga/rymdlabbet/','Rymdlabbet','Solsystemet, dag och natt, månens faser och mer','🔭','rymden planeter måne stjärnor svarta hål årstider förmörkelse universum galax jättar','NO'],
 ['ovriga/solsystemet/','Solsystemet i 3D','Res bland planeterna och ut i universum','🪐','planeter solen jorden månen vintergatan resa stockholm','NO'],
 ['ovriga/sverigekartan/','Sverigekartan','Landskap, städer och älvar','🗺️','landskap städer älvar djur blommor vapen karta sverige','SO'],
 ['ovriga/europa/','Europakartan','Europas länder, huvudstäder och flaggor','🌍','länder huvudstäder flaggor karta europa','SO'],
 ['ovriga/varlden/','Världskartan','Världsdelar, världshav och var djuren bor','🌐','världsdelar hav djur karta världen mercator storlek','SO'],
 ['ovriga/pengar/','Pengar och sparande','Spargris, sparkonto eller fond? Tidsmaskinen','💰','sparande aktier fonder bitcoin ränta ekonomi privatekonomi','Privatekonomi'],
 ['schack/','Schack','Lär dig pjäserna, hitta matt och spela mot datorn','♟️','pjäser matt matt i ett drag matt i två drag mattmönster parti slutspel äventyr ö kung dam torn springare löpare bonde klocka två spelare','Logik och strategi'],
 ['trerirad/','Tre i rad','Få tre i rad före datorn eller en kompis','⭕','kryss och ring luffarschack fyra i rad två spelare','Logik och strategi'],
 ['ovriga/tangentbord/','Tangentbordet','Lär dig skriva med rätt fingrar','⌨️','skriva tangenter tiofingersystemet alfabetet','Digitalt'],
 ['ovriga/kodverkstan/','Kodverkstan','Bygg program med block och styr ditt djur','🧩','kodning kod programmera programmering scratch block algoritm spel klon kloner kostym exempel remixa film bilder egen bild','Digitalt'],
 ['specialare/','Specialare','Minilektioner om coola saker','🎁','lektioner filmer fakta mysterium ledtrådar','Utforska']
];
/*LEKTIONER-START*/
const LEK=[
 ["specialare/#l/titanic","Titanic","Minilektion · Historia","🚢","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/bermuda","Bermudatriangeln","Minilektion · Historia","🔺","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/himlen","Varför är himlen blå?","Minilektion · Natur","🌤️","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/marianer","Det djupaste stället","Minilektion · Natur","🌊","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/vulkan","Så fungerar en vulkan","Minilektion · Natur","🌋","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/svartahal","Svarta hål","Minilektion · Rymden","🕳️","Rymden lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/dinosaurier","Dinosaurierna","Minilektion · Natur","🦖","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/pyramid","Pyramiderna i Egypten","Minilektion · Historia","🏜️","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/blaval","Blåvalen","Minilektion · Natur","🐋","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/manen","Månen","Minilektion · Rymden","🌙","Rymden lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/regnbage","Så blir en regnbåge","Minilektion · Natur","🌈","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/bin","Bin och honung","Minilektion · Natur","🐝","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/vasa","Regalskeppet Vasa","Minilektion · Historia","⚓","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/everest","Mount Everest","Minilektion · Natur","🏔️","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/illusioner","Hjärnan luras","Minilektion · Hjärnan","👁️","Hjärnan lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/dygn","Dygnet på andra planeter","Minilektion · Rymden","🪐","Rymden lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/antarktis","Antarktis","Minilektion · Natur","🐧","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/snabbast","De snabbaste djuren","Minilektion · Natur","🦅","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/hjarnan","Din hjärna","Minilektion · Kroppen","🧠","Kroppen lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/kroppen","Snabbfakta om kroppen","Minilektion · Kroppen","🫀","Kroppen lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/blixt","Åska och blixt","Minilektion · Natur","⚡","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/stora-tal","Miljon, miljard och biljon","Minilektion · Tal","🔢","Tal lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/kontinenter","Kontinenterna rör sig","Minilektion · Natur","🗺️","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/norrsken","Norrsken","Minilektion · Rymden","🌌","Rymden lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/atom","Allt är gjort av atomer","Minilektion · Tal","⚛️","Tal lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/nobel","Nobelpriset","Minilektion · Historia","🏅","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/bitcoin","Bitcoin","Minilektion · Samhälle","🪙","Samhälle lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/digerdoden","Digerdöden","Minilektion · Historia","🐀","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/elfte","11 september 2001","Minilektion · Historia","🕊️","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/vanallen","Strålningsbältena runt jorden","Minilektion · Rymden","🛰️","Rymden lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/kvant","Kvantfysik","Minilektion · Fysik","⚛️","Fysik lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/pirater","Pirater","Minilektion · Historia","🏴‍☠️","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/petrichor","Varför luktar det så speciellt när det regnar?","Minilektion · Natur","🌧️","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/hajar","Hajar","Minilektion · Natur","🦈","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/morkmateria","Mörk materia","Minilektion · Rymden","🌌","Rymden lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/vikingar","Vikingarna","Minilektion · Historia","⚔️","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/blackfisk","Bläckfisken","Minilektion · Natur","🐙","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/iss","Rymdstationen ISS","Minilektion · Rymden","🧑‍🚀","Rymden lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/mammutar","Ullhårsmammuten","Minilektion · Natur","🦣","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/penicillin","Penicillinet","Minilektion · Kroppen","💊","Kroppen lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/jast","Så jäser brödet","Minilektion · Natur","🍞","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/dans","Dans genom tiderna","Minilektion · Historia","💃","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/webb","James Webb-teleskopet","Minilektion · Rymden","🔭","Rymden lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/sjokablar","Internet ligger på havsbotten","Minilektion · Tal","🌐","Tal lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/chip","Mikrochipet","Minilektion · Tal","🖥️","Tal lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/mars","Robotar på Mars","Minilektion · Rymden","🤖","Rymden lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/gps","Så vet mobilen var du är","Minilektion · Tal","📍","Tal lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/vaccin","Hur vaccin fungerar","Minilektion · Kroppen","💉","Kroppen lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/leonardo","Leonardo da Vinci","Minilektion · Historia","🎨","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/ananas","Ananasen äter tillbaka","Minilektion · Natur","🍍","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/smaklokar","Smaklökarna","Minilektion · Kroppen","👅","Kroppen lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/orkan","Orkaner","Minilektion · Natur","🌀","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/krakatau","Krakatau 1883","Minilektion · Historia","🌋","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/tjernobyl","Tjernobyl","Minilektion · Historia","☢️","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/svampar","Svampar","Minilektion · Natur","🍄","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/spinnande","Därför spinner katter","Minilektion · Natur","🐱","Natur lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/raket","Hur fungerar en raket?","Minilektion · Rymden","🚀","Rymden lektion bildspel film mysterium","Specialare"],
 ["specialare/#l/curie","Marie Curie","Minilektion · Historia","👩‍🔬","Historia lektion bildspel film mysterium","Specialare"],
 ["specialare/#g/storlek","Storleksresan","Prova själv · Zooma från en atom till hela universum.","🔭","Rymden prova själv interaktiv","Specialare"],
 ["specialare/#g/illusioner","Optiska illusioner","Prova själv · Lura hjärnan. Mät sedan själv!","👁️","Hjärnan prova själv interaktiv","Specialare"],
 ["specialare/#g/svarthal","Inuti ett svart hål","Prova själv · En film i sju steg: flykthastighet, händelsehorisonten och vad som händer med den som faller in.","🕳️","Rymden prova själv interaktiv","Specialare"],
 ["specialare/#g/pengar","Pengar i skala","Prova själv · En miljon, en miljard och en biljon kronor som sedelstaplar. Hur högt blir de?","💰","Tal prova själv interaktiv","Specialare"],
 ["specialare/#g/ritloop","Oändlig ritloop","Prova själv · Spirografen ritar själv, för alltid. Eller rita med kalejdoskop.","🌀","Skapa prova själv interaktiv","Specialare"],
 ["specialare/#g/udda","Hitta den udda","Prova själv · Alla är lika utom en. Hur långt kommer du?","🔍","Hjärnan prova själv interaktiv","Specialare"],
 ["specialare/#g/djuret","Hitta djuret","Prova själv · Mästare på att gömma sig. Hittar du djuret?","🐆","Hjärnan prova själv interaktiv","Specialare"],
 ["specialare/#g/tid","Hur lång är 10 sekunder?","Prova själv · Känn efter. Ingen klocka syns!","⏱️","Hjärnan prova själv interaktiv","Specialare"]
];
/*LEKTIONER-SLUT*/
LEK.forEach(l=>IDX.push(l));
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const E=IDX.map(r=>({u:r[0],n:r[1],t:r[2],i:r[3],p:r[5]||'',nn:norm(r[1]),nw:norm(r[1]).split(' '),kw:norm(r[4]||'').split(' ').filter(Boolean),tw:norm(r[2]+' '+(r[5]||'')).split(' ').filter(Boolean)}));
function lev(a,b){if(Math.abs(a.length-b.length)>2)return 9;const m=[];for(let i=0;i<=a.length;i++){m[i]=[i];}for(let j=1;j<=b.length;j++)m[0][j]=j;
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return m[a.length][b.length];}
/* siffror i sökningen: 100 hittar Hundrarutan, 10 hittar tiokompisar och tiotal osv. */
const NUM={'1':['ett'],'2':['tva'],'3':['tre'],'4':['fyra'],'5':['fem'],'6':['sex'],'7':['sju'],'8':['atta'],'9':['nio'],
 '10':['tio','tiokompisar','tiotal'],'20':['tjugo'],'50':['femtio'],'100':['hundra','hundrarutan'],'1000':['tusen','tusental'],'1000000':['miljon']};
function tokScore(t,e){
  let b=tokScore1(t,e);
  if(NUM[t])for(const sy of NUM[t])b=Math.max(b,Math.round(tokScore1(sy,e)*.95));
  return b;
}
function tokScore1(t,e){
  if(/^\d+$/.test(t)){if(e.kw.includes(t))return 120;if(e.nw.includes(t))return 90;return e.tw.includes(t)?14:0;}
  if(e.nn.startsWith(t))return 100;
  let best=0;
  for(const w of e.nw){if(w===t)best=Math.max(best,90);else if(w.startsWith(t))best=Math.max(best,80);else if(t.length>=3&&w.includes(t))best=Math.max(best,40);}
  for(const w of e.kw){if(w===t)best=Math.max(best,70);else if(w.startsWith(t))best=Math.max(best,55);else if(t.length>=4&&w.includes(t))best=Math.max(best,30);}
  for(const w of e.tw){if(w===t)best=Math.max(best,14);else if(w.startsWith(t))best=Math.max(best,10);}
  if(!best&&t.length>=5){const mx=t.length>=7?2:1;
    for(const w of e.nw.concat(e.kw)){if(lev(w.slice(0,t.length),t)<=mx){best=Math.max(best,18);break;}}}
  return best;
}
function sok(q){
  const ts=norm(q).split(' ').filter(x=>x.length>1||/\d/.test(x));if(!ts.length)return [];
  const out=[];
  for(const e of E){let s=0,ok=true;for(const t of ts){const x=tokScore(t,e);if(!x){ok=false;break;}s+=x;}
    if(ok)out.push([s,e]);}
  out.sort((a,b)=>b[0]-a[0]||a[1].n.localeCompare(b[1].n,'sv'));
  return out.slice(0,14).map(x=>x[1]);
}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SNABB=['klockan/','multiplikation/','schack/','ovriga/rymdlabbet/','spel/','specialare/'];
let ov=null,sel=0,res=[];
function css(){if(document.getElementById('sok-css'))return;const s=document.createElement('style');s.id='sok-css';s.textContent=`
.sok-ov{position:fixed;inset:0;z-index:100000;background:rgba(8,12,24,.72);backdrop-filter:blur(5px);display:flex;justify-content:center;align-items:flex-start;padding:max(8vh,16px) 14px 14px;font-family:"Baloo 2","Trebuchet MS",system-ui,sans-serif}
.sok-box{width:100%;max-width:560px;background:#fff;color:#1D2B53;border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.5);overflow:hidden;display:flex;flex-direction:column;max-height:84vh}
.sok-in{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:2px solid #E6EDFB}
.sok-in span{font-size:1.4rem}.sok-in input{flex:1;border:0;outline:0;font:inherit;font-size:1.2rem;color:inherit;background:none;min-width:0}
.sok-in button{border:0;background:#EAF3FF;color:#1D2B53;border-radius:999px;width:34px;height:34px;font-size:1rem;cursor:pointer}
.sok-list{overflow:auto;padding:8px;margin:0;list-style:none}
.sok-list a{display:flex;align-items:center;gap:12px;padding:8px 10px;border-radius:14px;text-decoration:none;color:inherit}
.sok-list a:hover,.sok-list a.on{background:#EAF3FF}
.sok-list .ic{flex:none;width:44px;height:44px;border-radius:12px;background:#F3F6FD;display:grid;place-items:center;font-size:1.6rem}
.sok-list .tx{display:flex;flex-direction:column;min-width:0}.sok-list b{font-size:1.05rem;line-height:1.15}.sok-list small{color:#5E6A85;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sok-list .pl{margin-left:auto;flex:none;font-size:.72rem;font-weight:700;color:#3D5AFE;background:#E8EDFF;border-radius:999px;padding:1px 9px}
.sok-hint{padding:14px 18px;color:#5E6A85}
.sok-chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 14px}.sok-chips button{border:0;background:#EAF3FF;color:#1D2B53;border-radius:999px;padding:6px 14px;font:inherit;font-weight:700;cursor:pointer}
html[data-tema="mork"] .sok-box{background:#1C2540;color:#EEF2FA}html[data-tema="mork"] .sok-in{border-color:#2D3A5E}html[data-tema="mork"] .sok-in button,html[data-tema="mork"] .sok-chips button{background:#2A3658;color:#EEF2FA}
html[data-tema="mork"] .sok-list a:hover,html[data-tema="mork"] .sok-list a.on{background:#2A3658}html[data-tema="mork"] .sok-list .ic{background:#2A3658}html[data-tema="mork"] .sok-list small,html[data-tema="mork"] .sok-hint{color:#9FAECB}html[data-tema="mork"] .sok-list .pl{background:#2A3658;color:#9DB8FF}
`;document.head.appendChild(s);}
function rita(){
  const q=ov.querySelector('input').value,list=ov.querySelector('.sok-list'),hint=ov.querySelector('.sok-extra');
  res=q.trim()?sok(q):[];sel=0;
  if(!q.trim()){list.innerHTML='';hint.innerHTML='<div class="sok-hint">Skriv vad du letar efter, till exempel <i>klockan</i>, <i>gånger</i> eller <i>schack</i>.</div><div class="sok-chips">'+SNABB.map(u=>{const e=E.find(x=>x.u===u);return `<button data-u="${esc(u)}">${e.i} ${esc(e.n)}</button>`;}).join('')+'</div>';return;}
  if(!res.length){list.innerHTML='';hint.innerHTML='<div class="sok-hint">Hittade ingenting. Prova ett annat ord, till exempel namnet på ämnet.</div>';return;}
  hint.innerHTML='';
  list.innerHTML=res.map((e,i)=>`<li><a href="${ROT+e.u}" class="${i?'':'on'}" data-i="${i}"><span class="ic">${e.i}</span><span class="tx"><b>${esc(e.n)}</b><small>${esc(e.t)}</small></span><span class="pl">${esc(e.p)}</span></a></li>`).join('');
}
function mark(){ov.querySelectorAll('.sok-list a').forEach((a,i)=>{a.classList.toggle('on',i===sel);if(i===sel)a.scrollIntoView({block:'nearest'});});}
function close(){if(ov){ov.remove();ov=null;document.removeEventListener('keydown',key,true);}}
function key(e){
  if(!ov)return;
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close();}
  else if(e.key==='ArrowDown'){e.preventDefault();if(res.length){sel=(sel+1)%res.length;mark();}}
  else if(e.key==='ArrowUp'){e.preventDefault();if(res.length){sel=(sel-1+res.length)%res.length;mark();}}
  else if(e.key==='Enter'){const e0=res[sel];if(e0){e.preventDefault();location.href=ROT+e0.u;}}
}
function open(){
  if(ov)return;css();
  ov=document.createElement('div');ov.className='sok-ov';ov.setAttribute('role','dialog');ov.setAttribute('aria-label','Sök');
  ov.innerHTML='<div class="sok-box"><div class="sok-in"><span aria-hidden="true">🔍</span><input type="search" placeholder="Sök övning, spel eller ämne …" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Sök"><button aria-label="Stäng">✕</button></div><div class="sok-extra"></div><ul class="sok-list"></ul></div>';
  document.body.appendChild(ov);
  const inp=ov.querySelector('input');inp.oninput=rita;
  ov.querySelector('button').onclick=close;
  ov.addEventListener('mousedown',e=>{if(e.target===ov)close();});
  ov.addEventListener('click',e=>{const b=e.target.closest('[data-u]');if(b)location.href=ROT+b.dataset.u;});
  document.addEventListener('keydown',key,true);
  rita();setTimeout(()=>inp.focus(),30);
}
window.MPSok={open,close,sok};
})();
