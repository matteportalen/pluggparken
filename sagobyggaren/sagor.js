'use strict';
const $=id=>document.getElementById(id),KEY='mattespel-sagobyggaren-v1';
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let data;try{data=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{data={}}
if(!data||typeof data!=='object'||Array.isArray(data))data={};
data.sagor=Array.isArray(data.sagor)?data.sagor:[];data.stars=data.stars||{};
function save(){try{localStorage.setItem(KEY,JSON.stringify(data));return true}catch{return false}}
const LEGACY_SERIES=[
 {id:'nyckeln',name:'Den stora nyckeln',bg:'trees',hero:'rabbit_1',object:'key_1',desc:'En kanin, en nyckel och en hemlig dörr.',alts:['En kanin hittar en stor nyckel i skogen.','Kaninen står med nyckeln framför en stängd dörr.','Dörren är öppen och ljus kommer inifrån. Vad finns där?'],starts:['En dag hittade kaninen …','Men dörren …','Bakom dörren …']},
 {id:'stjarnan',name:'Stjärnan som föll',bg:'snow',hero:'penguin_1',object:'star_1',desc:'En stjärna på fel plats. Vem kan hjälpa?',alts:['En pingvin ser en stjärna falla från himlen.','Stjärnan ligger på marken framför pingvinen.','En uggla flyger med stjärnan medan pingvinen tittar upp.'],starts:['En kväll såg pingvinen …','Stjärnan kunde inte …','Då hjälpte ugglan …']},
 {id:'draken',name:'Vem bor vid slottet?',bg:'slott',hero:'prinsessa',object:'drake_v',desc:'Någon väntar utanför slottet.',alts:['En prinsessa upptäcker en drake utanför slottet.','Draken står framför slottsporten och prinsessan stannar en bit bort.','Prinsessan och draken står nära varandra. Ett hjärta syns ovanför dem.'],starts:['Utanför slottet stod …','Men draken ville …','Till slut …']}
];
const FANTASY_SERIES=[
 {
  "id": "manen",
  "art": "moon",
  "name": "Månen på fotbollsplanen",
  "desc": "Mitt i gräset ligger något som borde vara på himlen.",
  "alts": [
   "Ett barn i gul jacka upptäcker en lysande måne på fotbollsplanen i skymningen.",
   "Barnet rör vid månen. En lysande spricka öppnas i ytan.",
   "Små lysande fotspår leder ut ur sprickan mot barnets utsträckta hand."
  ],
  "starts": [
   "När jag kom till planen …",
   "Plötsligt sprack …",
   "Ur månen kom …"
  ]
 },
 {
  "id": "skuggan",
  "art": "shadow",
  "name": "Skuggan som rymde",
  "desc": "Du står stilla. Din skugga gör något helt annat.",
  "alts": [
   "En rödhårig pojke står på en solig gata. Hans skugga vinkar fast pojken inte gör det.",
   "Skuggan springer iväg runt hörnet medan pojken tittar efter den.",
   "Skuggan visar pojken en liten lysande dörr i väggen."
  ],
  "starts": [
   "Min skugga brukade …",
   "Men den här gången …",
   "När jag kom runt hörnet …"
  ]
 },
 {
  "id": "pennfodralet",
  "art": "pencil",
  "name": "Dörren i pennfodralet",
  "desc": "Bland pennorna finns en dörr som inte fanns där igår.",
  "alts": [
   "En liten mus i grön väst hittar en dörr bland stora färgpennor i ett pennfodral.",
   "Ljus kommer under dörren och musen undersöker en liten karta.",
   "Bakom den öppna dörren syns en lysande svampskog och en stig inåt."
  ],
  "starts": [
   "Mellan pennorna hittade musen …",
   "Under dörren …",
   "Musen tog ett steg …"
  ]
 },
 {
  "id": "drakhissen",
  "art": "elevator",
  "name": "Hissen ovanför molnen",
  "desc": "Vad händer om man trycker på drakknappen?",
  "alts": [
   "En flicka med glasögon och hennes morfar hittar en drakformad knapp i en gammal hiss.",
   "Genom hissens fönster ser de moln. Hissen har lämnat husen långt nedanför.",
   "Dörrarna öppnas ovanför molnen. En vänlig drake väntar med en mystisk korg."
  ],
  "starts": [
   "I hissen fanns en knapp …",
   "Hissen stannade inte …",
   "Utanför dörrarna väntade …"
  ]
 },
 {
  "id": "regnmolnet",
  "art": "fox",
  "name": "Rävens regnmoln",
  "desc": "Ett moln har fastnat. Men vad regnar det egentligen?",
  "alts": [
   "En räv med blå halsduk hittar ett litet regnmoln som fastnat i ett träd.",
   "Räven klättrar upp för att hjälpa molnet loss medan skogens djur tittar på.",
   "Molnet följer räven. Ett gyllene frö faller ner från molnet."
  ],
  "starts": [
   "Räven hörde regn, men …",
   "För att hjälpa molnet …",
   "Då föll något märkligt …"
  ]
 },
 {
  "id": "himmelsvalen",
  "art": "whale",
  "name": "Valen över hustaken",
  "desc": "En oväntad besökare kommer till balkongen.",
  "alts": [
   "Två syskon ser en enorm blå val sväva ovanför stadens hustak.",
   "Valen sänker en repstege mot deras balkong.",
   "På valens rygg finns en liten ö med en trädgård och en lysande fyr."
  ],
  "starts": [
   "Ovanför vårt hus …",
   "Plötsligt kom en stege …",
   "På valens rygg upptäckte vi …"
  ]
 },
 {
  "id": "robotensfro",
  "art": "robot",
  "name": "Roboten och det lilla fröet",
  "desc": "En liten grön växt förändrar en grå gård.",
  "alts": [
   "En liten turkos robot hittar en grön växt i en spricka på en grå gård.",
   "Roboten vattnar växten med en tekanna och den växer sig enorm.",
   "I den stora blomman lyser ett litet fönster. En liten stege leder upp."
  ],
  "starts": [
   "Roboten hade aldrig sett …",
   "Efter en enda kanna vatten …",
   "I blomman fanns …"
  ]
 },
 {
  "id": "skorna",
  "art": "shoes",
  "name": "De hundra små skorna",
  "desc": "Vem lämnar så små fotspår i skolan?",
  "alts": [
   "Ett barn med ficklampa upptäcker små gröna fotspår i en källartrappa.",
   "Nedanför trappan står många par pyttesmå skor framför en dörr.",
   "En liten grön hand sträcker fram ett långt gyllene skosnöre genom dörren."
  ],
  "starts": [
   "Efter skolan såg jag …",
   "Framför dörren stod …",
   "När dörren öppnades …"
  ]
 },
 {
  "id": "monstretsryt",
  "art": "monster",
  "name": "Monstret som tappade sitt ryt",
  "desc": "Det stora monstret får bara fram såpbubblor.",
  "alts": [
   "Ett stort lila pälsmonster försöker ryta, men såpbubblor kommer ur munnen.",
   "En liten gul fågel visar monstret en grotta där märkliga virvlar kommer ut.",
   "I grottan sover en liten varelse med en burk full av gyllene ljus."
  ],
  "starts": [
   "Monstret tog ett djupt andetag …",
   "Fågeln hade hört …",
   "För att få tillbaka rytet …"
  ]
 },
 {
  "id": "bokhavet",
  "art": "library",
  "name": "Havet i boken",
  "desc": "Bibliotekarien öppnar en bok som inte håller tätt.",
  "alts": [
   "En äldre kanin med glasögon ser havsvatten rinna ur en öppen bok i biblioteket.",
   "En liten segelbåt flyter ut ur boken på en ström mellan bokhyllorna.",
   "Båten har blivit större och bär ett brev och en kompass. Kaninen tittar mot ljuset inne i boken."
  ],
  "starts": [
   "Bibliotekarien öppnade boken …",
   "Snart flöt …",
   "Brevet i båten …"
  ]
 }
];
const EVERYDAY_SERIES=[
 {
  "id": "guldringen",
  "art": "ring",
  "name": "Guldringen",
  "desc": "Två vänner hittar något värdefullt på vägen hem.",
  "cols": 2,
  "rows": 2,
  "alts": [
   "Två barn går hem från skolan längs en trädkantad gångväg.",
   "En flicka hittar en guldring vid en bänk. Hennes vän tittar nyfiket på den.",
   "En äldre kvinna letar bekymrat på marken. Barnen ser henne.",
   "Flickan räcker fram ringen till den lättade kvinnan."
  ],
  "starts": [
   "På vägen hem från skolan …",
   "Plötsligt glimmade något …",
   "Vid bänken stod …",
   "När kvinnan såg ringen …"
  ]
 },
 {
  "id": "passatillsam",
  "art": "sam",
  "name": "Ingen passar till Sam",
  "desc": "En ny lagkamrat väntar på sin chans.",
  "cols": 2,
  "rows": 2,
  "alts": [
   "Sam står vid kanten av fotbollsplanen medan de andra spelar.",
   "Sam sträcker upp handen men de andra är upptagna med bollen.",
   "En lagkamrat är trängd och ser att Sam står fri.",
   "Lagkamraten passar bollen till Sam, som gör sig redo att ta emot den."
  ],
  "starts": [
   "Sam var ny …",
   "Ingen verkade märka …",
   "Då fick en lagkamrat syn på …",
   "När bollen kom mot Sam …"
  ]
 },
 {
  "id": "bollenochrutan",
  "art": "window",
  "name": "Bollen genom rutan",
  "desc": "En olycka händer. Vem vågar stanna kvar?",
  "cols": 2,
  "rows": 2,
  "alts": [
   "Tre vänner spelar fotboll på gården nära ett hus.",
   "Bollen träffar en fönsterruta så att den spricker. Barnen blir förskräckta.",
   "Två vänner springer därifrån, men en flicka stannar kvar.",
   "Flickan står med bollen vid grannens stängda dörr och ska knacka."
  ],
  "starts": [
   "Efter skolan brukade vännerna …",
   "Plötsligt hördes …",
   "De andra sprang, men …",
   "När dörren öppnades …"
  ]
 },
 {
  "id": "platsvidbordet",
  "art": "lunch",
  "name": "Platsen vid bordet",
  "desc": "En ledig stol kan göra stor skillnad.",
  "cols": 2,
  "rows": 2,
  "alts": [
   "En pojke med matbricka letar efter en plats i matsalen.",
   "Väskor ligger på stolarna vid ett bord. Pojken står kvar med sin bricka.",
   "En flicka flyttar sin väska och drar fram en stol åt honom.",
   "Barnen sitter tillsammans och pratar medan de äter."
  ],
  "starts": [
   "I matsalen stod …",
   "Vid bordet …",
   "Då flyttade …",
   "Under lunchen upptäckte de …"
  ]
 },
 {
  "id": "trasigamodellen",
  "art": "model",
  "name": "Den trasiga modellen",
  "desc": "Vännernas gemensamma bygge går sönder.",
  "cols": 2,
  "rows": 2,
  "alts": [
   "Två vänner bygger en kartongstad till en utställning.",
   "När en vän är borta råkar den andra slå ner stadens torn.",
   "Barnet står ensamt med det trasiga tornet och ser oroligt mot dörren.",
   "Vännen kommer tillbaka. Barnet håller fram delarna av tornet."
  ],
  "starts": [
   "De hade arbetat länge med …",
   "Just när …",
   "Nu visste ingen annan …",
   "När vännen kom tillbaka …"
  ]
 },
 {
  "id": "vemfarvaramed",
  "art": "hut",
  "name": "Vem får vara med?",
  "desc": "De stora bygger en koja. Den lilla har en idé.",
  "cols": 2,
  "rows": 2,
  "alts": [
   "Två äldre barn bygger en koja av grenar i en trädgård. Ett yngre barn kommer med en liten vagn.",
   "Det yngre barnet får inte komma in och står utanför kojan.",
   "Regnet börjar falla genom kojans tak. De äldre barnen försöker skydda sig.",
   "Det yngre barnet kommer med en presenning i vagnen. De äldre barnen tittar upp."
  ],
  "starts": [
   "De stora barnen byggde …",
   "När den lilla frågade …",
   "Men snart började …",
   "Då kom den lilla tillbaka med …"
  ]
 },
 {
  "id": "harenochskoldpaddan",
  "art": "hare",
  "name": "Haren och sköldpaddan",
  "desc": "Den snabbaste är inte alltid först i mål.",
  "cols": 2,
  "rows": 2,
  "alts": [
   "En självsäker hare och en lugn sköldpadda gör sig redo att tävla längs en stig.",
   "Haren har sprungit långt före och vilar under ett träd. Sköldpaddan fortsätter längre bort på stigen.",
   "Haren sover medan sköldpaddan går förbi mot målet.",
   "Sköldpaddan går i mål medan djuren hejar. Haren kommer efter och ser förvånad ut."
  ],
  "starts": [
   "Haren var säker på att …",
   "Efter en stund tänkte haren …",
   "Medan haren sov …",
   "När haren kom fram …"
  ]
 },
 {
  "id": "borttappadehunden",
  "art": "dog",
  "name": "Den borttappade hunden",
  "desc": "En rädd hund behöver hitta hem.",
  "cols": 2,
  "rows": 2,
  "alts": [
   "Två barn ser en liten hund som gömmer sig under en parkbänk.",
   "Barnen sitter lugnt en bit bort och hunden vågar sig fram.",
   "De tittar på hundens halsband medan en vuxen hjälper dem att ringa.",
   "Hunden springer glatt fram till sin ägare som knäböjer med öppna armar."
  ],
  "starts": [
   "Under bänken hördes …",
   "För att inte skrämma hunden …",
   "På halsbandet …",
   "När ägaren kom …"
  ]
 },
 {
  "id": "ravenochmusen",
  "art": "foxmouse",
  "name": "Räven och den lilla musen",
  "desc": "Ibland är det bra att vara minst.",
  "cols": 2,
  "rows": 2,
  "alts": [
   "En räv med ryggsäck skrattar åt en liten mus på skogsstigen.",
   "Rävens ryggsäck fastnar mellan två stora stenar.",
   "Musen kryper in i den smala springan och lossar remmen.",
   "Räven är fri och böjer sig tacksamt mot musen."
  ],
  "starts": [
   "Räven tyckte att musen …",
   "Längre fram på stigen …",
   "Den lilla musen kunde …",
   "Efter den dagen …"
  ]
 },
 {
  "id": "sistanoten",
  "art": "squirrels",
  "name": "Två ekorrar och sista nöten",
  "desc": "Vintern närmar sig och båda vill ha nöten.",
  "cols": 2,
  "rows": 2,
  "alts": [
   "Två ekorrar hittar en nöt på marken en kylig höstdag.",
   "Båda håller i nöten och drar åt varsitt håll.",
   "Nöten rullar ner i en smal hålighet mellan trädrötterna.",
   "En ekorre håller en kvist medan den andra hjälper till vid håligheten."
  ],
  "starts": [
   "Vintern var på väg och …",
   "Båda ville …",
   "Mitt i grälet …",
   "Om de hjälptes åt …"
  ]
 }
];
const SERIES=[...EVERYDAY_SERIES,...FANTASY_SERIES];
const ALL_SERIES=[...SERIES,...LEGACY_SERIES];
let draft=null,book=null,active=0;
function picture(series,i){
 const s=ALL_SERIES.find(x=>x.id===series)||SERIES[0];
 if(s.art)return `<div class="picture story-art" role="img" aria-label="${esc(s.alts[i])}"><img class="story-painting" src="bilder/sagor/${s.art}.jpg" alt="" loading="lazy" decoding="async" style="width:${(s.cols||3)*100}%;height:${(s.rows||1)*100}%;left:${-100*(i%(s.cols||3))}%;top:${-100*Math.floor(i/(s.cols||3))}%"></div>`;
 const img=(name,x,y,h,extra='')=>`<img class="figure" src="bilder/${name}.webp" alt="" style="left:${x}%;bottom:${y}%;height:${h}%;${extra}">`;
 let figures='';
 if(s.id==='nyckeln')figures=img(s.hero,i===2?38:12,9,44)+img(s.object,i===0?55:40,12,i===0?33:24)+(i>0?`<span class="story-door${i===2?' open':''}"></span>`:'');
 if(s.id==='stjarnan')figures=img(s.hero,12,8,42)+img(s.object,i===0?64:i===1?57:65,i===0?57:i===1?8:59,i===0?22:26)+(i===2?img('owl_1',48,49,29):'');
 if(s.id==='draken')figures=img(s.hero,i===2?34:12,7,55)+img(s.object,i===0?63:53,7,i===0?31:44)+(i===2?img('heart_1',48,64,17):'');
 return `<div class="picture" role="img" aria-label="${esc(s.alts[i])}"><img class="backdrop" src="bilder/bg_${s.bg}.jpg" alt="">${figures}</div>`;
}
function show(id){if(window.speechSynthesis)speechSynthesis.cancel();document.querySelectorAll('.screen').forEach(e=>e.hidden=e.id!==id);window.MPS?.visa(id);window.scrollTo(0,0)}
function hem(){show('home');$('resumeOld').hidden=!(data.utkast&&LEGACY_SERIES.some(s=>s.id===data.utkast.series));$('series').innerHTML=[["Vardag och fabler",EVERYDAY_SERIES],["Fantasi och mysterier",FANTASY_SERIES]].map(([name,list])=>`<h2 class="series-heading">${name}</h2>`+list.map(s=>`<button class="story-choice" data-series="${s.id}"><span class="story-cover">${picture(s.id,0)}</span><b>${s.name}</b><small>${data.utkast?.series===s.id?'Fortsätt din berättelse →':s.desc}</small></button>`).join('')).join('');$('mine').hidden=!data.sagor.length;}
function openSeries(id){
 const old=data.utkast;
 if(old&&old.series!==id&&old.t?.some(t=>t.trim())&&!confirm('Du har en påbörjad berättelse. Börja på en annan bildserie?'))return;
 draft=old?.series===id?JSON.parse(JSON.stringify(old)):{series:id,t:Array((ALL_SERIES.find(s=>s.id===id)||SERIES[0]).alts.length).fill(''),r:''};active=0;editor();
}
function pageNames(s){return s.alts.length===4?['Början','Något händer','Vad gör de?','Slutet']:['Början','Problem','Ditt slut']}
function editor(){
 const s=ALL_SERIES.find(s=>s.id===draft.series)||SERIES[0];show('game');$('storyTitle').textContent=s.name;
 $('pages').classList.toggle('four-pages',s.alts.length===4);
 $('pages').innerHTML=pageNames(s).map((name,i)=>`<article class="story-page"><h2>${i+1}. ${name}</h2>${picture(s.id,i)}<label for="text-${i}">${(s.alts.length===4?['Vilka är här?','Vad händer?','Vad tänker och gör de?','Hur slutar berättelsen?']:['Vem är här?','Vad händer?','Vad händer sedan? Hur slutar det?'])[i]}</label><textarea id="text-${i}" data-page="${i}" maxlength="1000" placeholder="Berätta …">${esc(draft.t[i]||'')}</textarea></article>`).join('');$('helpText').hidden=true;update();
}
function update(){data.utkast=draft;$('saveState').textContent=save()?'Sparas på den här enheten':'Kunde inte spara på enheten';$('finish').disabled=!draft.t.every(t=>t.trim());}
$('resumeOld').onclick=()=>openSeries(data.utkast.series);
$('series').onclick=e=>{const b=e.target.closest('[data-series]');if(b)openSeries(b.dataset.series)};
$('pages').addEventListener('focusin',e=>{if(e.target.matches('textarea'))active=+e.target.dataset.page});
$('pages').oninput=e=>{if(!e.target.matches('textarea'))return;draft.t[+e.target.dataset.page]=e.target.value;update()};
$('help').onclick=()=>{const s=ALL_SERIES.find(s=>s.id===draft.series);$('helpText').textContent=pageNames(s)[active]+': Du kan börja med ”'+s.starts[active]+'”. Fortsätt med dina egna ord.';$('helpText').hidden=false;};
$('back').onclick=hem;
$('finish').onclick=()=>{
 if(!draft?.t.every(t=>t.trim()))return;
 let existing=draft.id&&data.sagor.find(s=>s.id===draft.id);
 if(existing)Object.assign(existing,{t:draft.t.slice(),r:draft.r||'',series:draft.series});
 else{existing={id:Date.now().toString(36),series:draft.series,t:draft.t.slice(),r:draft.r||'',d:Date.now(),version:2};data.sagor.unshift(existing);data.sagor=data.sagor.slice(0,12);data.bildsagor=(Number(data.bildsagor)||0)+1;data.stars.bilder=data.bildsagor>=6?3:data.bildsagor>=3?2:1;}
 delete data.utkast;save();window.Ljud?.chime?.();openBook(existing);
};
function bookName(s){return s.r||ALL_SERIES.find(x=>x.id===s.series)?.name||'Min saga'}
function openBook(s){book=s;show('book');$('title').value=s.r||'';$('edit').hidden=!s.series;renderBook()}
function renderBook(){
 $('bok').innerHTML=`<h2>${esc(bookName(book))}</h2>`+(book.series?book.t.map((t,i)=>`<div class="story-book-page">${picture(book.series,i)}<p>${esc(t)}</p></div>`).join(''):legacyBook(book));
}
$('title').oninput=e=>{if(book){book.r=e.target.value.trim();save();renderBook()}};
$('edit').onclick=()=>{draft={id:book.id,series:book.series,t:book.t.slice(),r:book.r||''};active=0;editor()};
$('worksheetPrint').onclick=async()=>{
 const s=ALL_SERIES.find(s=>s.id===draft?.series);if(!s)return;
 $('worksheet').innerHTML=`<h1>${esc(s.name)}</h1><p class="worksheet-name">Namn: ____________________________________ &nbsp; Datum: ______________</p>`+s.alts.map((_,i)=>`<div class="worksheet-row">${picture(s.id,i)}<div class="worksheet-lines">${'<span></span>'.repeat(5)}</div></div>`).join('');
 await Promise.all([...$('worksheet').querySelectorAll('img')].map(img=>{img.loading='eager';return img.decode()}));
 document.body.classList.add('worksheet-print');
 window.print();
};
window.addEventListener('afterprint',()=>document.body.classList.remove('worksheet-print'));
$('print').onclick=async()=>{document.body.classList.remove('worksheet-print');await Promise.all([...$('bok').querySelectorAll('img')].map(img=>{img.loading='eager';return img.decode().catch(()=>{})}));window.print()};
$('read').onclick=()=>{if(!book||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(bookName(book)+'. '+book.t.join(' '));u.lang='sv-SE';u.rate=.9;const voice=speechSynthesis.getVoices().find(v=>v.lang.startsWith('sv'));if(voice)u.voice=voice;speechSynthesis.speak(u)};
function library(){show('saved');$('stories').innerHTML=data.sagor.length?data.sagor.map((s,i)=>`<div class="saved-story"><button data-open="${i}">${esc(bookName(s))}<small>${new Date(s.d).toLocaleDateString('sv-SE')}</small></button><button class="knapp vit" data-delete="${i}" aria-label="Ta bort ${esc(bookName(s))}">✕</button></div>`).join(''):'<p>Här hamnar dina färdiga sagor.</p>';}
$('stories').onclick=e=>{const open=e.target.closest('[data-open]'),del=e.target.closest('[data-delete]');if(open)openBook(data.sagor[+open.dataset.open]);if(del&&confirm('Ta bort den här sagan?')){data.sagor.splice(+del.dataset.delete,1);save();library()}};
$('mine').onclick=$('library').onclick=library;$('new').onclick=$('homeButton').onclick=hem;
const HJ=[{"id":"pojke","img":"player_1","def":"pojken"},{"id":"flicka","img":"female_1","def":"flickan"},{"id":"aventyrare","img":"adventurer_1","def":"äventyraren"},{"id":"kanin","img":"rabbit_1","def":"kaninen"},{"id":"uggla","img":"owl_1","def":"ugglan"},{"id":"pingvin","img":"penguin_1","def":"pingvinen"},{"id":"apa","img":"monkey_1","def":"apan"},{"id":"groda","img":"frog_1","def":"grodan"},{"id":"prinsessa","img":"prinsessa","def":"prinsessan"},{"id":"riddare","img":"riddare","def":"riddaren"},{"id":"drake","img":"drake","def":"draken"},{"id":"troll","img":"troll","def":"trollet"}];
const PL=[{"id":"skog","bg":"trees"},{"id":"orken","bg":"desert"},{"id":"snoberg","bg":"snow"},{"id":"kullar","bg":"hills"},{"id":"svamp","bg":"mushrooms"},{"id":"slott","bg":"slott"},{"id":"slottnatt","bg":"slottnatt"},{"id":"trollskog","bg":"trollskog"},{"id":"drakberg","bg":"drakberg"},{"id":"by","bg":"by"}];
const EV=[{"id":"nyckel","img":"key_1"},{"id":"edelsten","img":"gem_1"},{"id":"mynt","img":"coin_1"},{"id":"morot","img":"carrot_1"},{"id":"stjarna","img":"star_1"},{"id":"fisk","img":"fish_1"},{"id":"spoke","img":"ghost_1"},{"id":"slem","img":"slime_1"},{"id":"orm","img":"snake_1"},{"id":"ufo","img":"ufo_1"},{"id":"skatt","img":"coin_1"},{"id":"hjarta","img":"heart_1"},{"id":"drake","img":"drake_v"},{"id":"troll","img":"troll_v"},{"id":"prinsessa","img":"prinsessa_v"},{"id":"riddare","img":"riddare_v"}];
// Äldre fyrdelade sagor och deras bilder finns kvar att läsa och skriva ut.
function legacyBook(s){const h=HJ.find(x=>x.id===s.v)||HJ[0],p=PL.find(x=>x.id===s.p)||PL[0],e=EV.find(x=>x.id===s.e)||EV[0];return `<div class="picture" style="max-width:360px;margin:auto"><img class="backdrop" src="bilder/bg_${p.bg}.jpg" alt=""><img class="figure" style="left:15%;bottom:8%;height:50%" src="bilder/${h.img}.webp" alt="${esc(h.def)}"><img class="figure" style="left:60%;bottom:8%;height:40%" src="bilder/${e.img}.webp" alt=""></div>`+s.t.map(t=>`<p style="white-space:pre-wrap">${esc(t)}</p>`).join('');}
window.__sb={SERIES,ALL_SERIES,openSeries,hem,library,get data(){return data},get draft(){return draft}};
hem();
