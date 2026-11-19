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
const SERIES=[
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
const ALL_SERIES=[...SERIES,...LEGACY_SERIES];
let draft=null,book=null,active=0;
function picture(series,i){
 const s=ALL_SERIES.find(x=>x.id===series)||SERIES[0];
 if(s.art)return `<div class="picture story-art" role="img" aria-label="${esc(s.alts[i])}"><img class="story-painting" src="bilder/sagor/${s.art}.jpg" alt="" loading="lazy" decoding="async" style="left:${-100*i}%"></div>`;
 const img=(name,x,y,h,extra='')=>`<img class="figure" src="bilder/${name}.webp" alt="" style="left:${x}%;bottom:${y}%;height:${h}%;${extra}">`;
 let figures='';
 if(s.id==='nyckeln')figures=img(s.hero,i===2?38:12,9,44)+img(s.object,i===0?55:40,12,i===0?33:24)+(i>0?`<span class="story-door${i===2?' open':''}"></span>`:'');
 if(s.id==='stjarnan')figures=img(s.hero,12,8,42)+img(s.object,i===0?64:i===1?57:65,i===0?57:i===1?8:59,i===0?22:26)+(i===2?img('owl_1',48,49,29):'');
 if(s.id==='draken')figures=img(s.hero,i===2?34:12,7,55)+img(s.object,i===0?63:53,7,i===0?31:44)+(i===2?img('heart_1',48,64,17):'');
 return `<div class="picture" role="img" aria-label="${esc(s.alts[i])}"><img class="backdrop" src="bilder/bg_${s.bg}.jpg" alt="">${figures}</div>`;
}
function show(id){if(window.speechSynthesis)speechSynthesis.cancel();document.querySelectorAll('.screen').forEach(e=>e.hidden=e.id!==id);window.MPS?.visa(id);window.scrollTo(0,0)}
function hem(){show('home');$('resumeOld').hidden=!(data.utkast&&LEGACY_SERIES.some(s=>s.id===data.utkast.series));$('series').innerHTML=SERIES.map(s=>`<button class="story-choice" data-series="${s.id}"><span class="story-cover">${picture(s.id,0)}</span><b>${s.name}</b><small>${data.utkast?.series===s.id?'Fortsätt din berättelse →':s.desc}</small></button>`).join('');$('mine').hidden=!data.sagor.length;}
function openSeries(id){
 const old=data.utkast;
 if(old&&old.series!==id&&old.t?.some(t=>t.trim())&&!confirm('Du har en påbörjad berättelse. Börja på en annan bildserie?'))return;
 draft=old?.series===id?JSON.parse(JSON.stringify(old)):{series:id,t:['','',''],r:''};active=0;editor();
}
function editor(){
 const s=ALL_SERIES.find(s=>s.id===draft.series)||SERIES[0];show('game');$('storyTitle').textContent=s.name;
 $('pages').innerHTML=['Början','Problem','Ditt slut'].map((name,i)=>`<article class="story-page"><h2>${i+1}. ${name}</h2>${picture(s.id,i)}<label for="text-${i}">${['Vem är här?','Vad händer?','Vad händer sedan? Hur slutar det?'][i]}</label><textarea id="text-${i}" data-page="${i}" maxlength="1000" placeholder="Berätta …">${esc(draft.t[i]||'')}</textarea></article>`).join('');$('helpText').hidden=true;update();
}
function update(){data.utkast=draft;$('saveState').textContent=save()?'Sparas på den här enheten':'Kunde inte spara på enheten';$('finish').disabled=!draft.t.every(t=>t.trim());}
$('resumeOld').onclick=()=>openSeries(data.utkast.series);
$('series').onclick=e=>{const b=e.target.closest('[data-series]');if(b)openSeries(b.dataset.series)};
$('pages').addEventListener('focusin',e=>{if(e.target.matches('textarea'))active=+e.target.dataset.page});
$('pages').oninput=e=>{if(!e.target.matches('textarea'))return;draft.t[+e.target.dataset.page]=e.target.value;update()};
$('help').onclick=()=>{const s=ALL_SERIES.find(s=>s.id===draft.series);$('helpText').textContent=['Början','Problem','Slut'][active]+': Du kan börja med ”'+s.starts[active]+'”. Fortsätt med dina egna ord.';$('helpText').hidden=false;};
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
$('print').onclick=async()=>{await Promise.all([...$('bok').querySelectorAll('img')].map(img=>{img.loading='eager';return img.decode().catch(()=>{})}));window.print()};
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
