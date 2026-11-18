'use strict';
const $=id=>document.getElementById(id),KEY='mattespel-sagobyggaren-v1';
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let data;try{data=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{data={}}
if(!data||typeof data!=='object'||Array.isArray(data))data={};
data.sagor=Array.isArray(data.sagor)?data.sagor:[];data.stars=data.stars||{};
function save(){try{localStorage.setItem(KEY,JSON.stringify(data));return true}catch{return false}}
const SERIES=[
 {id:'nyckeln',name:'Den stora nyckeln',bg:'trees',hero:'rabbit_1',object:'key_1',desc:'En kanin, en nyckel och en hemlig dörr.',alts:['En kanin hittar en stor nyckel i skogen.','Kaninen står med nyckeln framför en stängd dörr.','Dörren är öppen och ljus kommer inifrån. Vad finns där?'],starts:['En dag hittade kaninen …','Men dörren …','Bakom dörren …']},
 {id:'stjarnan',name:'Stjärnan som föll',bg:'snow',hero:'penguin_1',object:'star_1',desc:'En stjärna på fel plats. Vem kan hjälpa?',alts:['En pingvin ser en stjärna falla från himlen.','Stjärnan ligger på marken framför pingvinen.','En uggla flyger med stjärnan medan pingvinen tittar upp.'],starts:['En kväll såg pingvinen …','Stjärnan kunde inte …','Då hjälpte ugglan …']},
 {id:'draken',name:'Vem bor vid slottet?',bg:'slott',hero:'prinsessa',object:'drake_v',desc:'Någon väntar utanför slottet.',alts:['En prinsessa upptäcker en drake utanför slottet.','Draken står framför slottsporten och prinsessan stannar en bit bort.','Prinsessan och draken står nära varandra. Ett hjärta syns ovanför dem.'],starts:['Utanför slottet stod …','Men draken ville …','Till slut …']}
];
let draft=null,book=null,active=0;
function picture(series,i){
 const s=SERIES.find(x=>x.id===series)||SERIES[0];
 const img=(name,x,y,h,extra='')=>`<img class="figure" src="bilder/${name}.webp" alt="" style="left:${x}%;bottom:${y}%;height:${h}%;${extra}">`;
 let figures='';
 if(s.id==='nyckeln')figures=img(s.hero,i===2?38:12,9,44)+img(s.object,i===0?55:40,12,i===0?33:24)+(i>0?`<span class="story-door${i===2?' open':''}"></span>`:'');
 if(s.id==='stjarnan')figures=img(s.hero,12,8,42)+img(s.object,i===0?64:i===1?57:65,i===0?57:i===1?8:59,i===0?22:26)+(i===2?img('owl_1',48,49,29):'');
 if(s.id==='draken')figures=img(s.hero,i===2?34:12,7,55)+img(s.object,i===0?63:53,7,i===0?31:44)+(i===2?img('heart_1',48,64,17):'');
 return `<div class="picture" role="img" aria-label="${esc(s.alts[i])}"><img class="backdrop" src="bilder/bg_${s.bg}.jpg" alt="">${figures}</div>`;
}
function show(id){if(window.speechSynthesis)speechSynthesis.cancel();document.querySelectorAll('.screen').forEach(e=>e.hidden=e.id!==id);window.MPS?.visa(id);window.scrollTo(0,0)}
function hem(){show('home');$('series').innerHTML=SERIES.map(s=>`<button class="story-choice" data-series="${s.id}"><span class="story-strip">${[0,1,2].map(i=>picture(s.id,i)).join('')}</span><b>${s.name}</b><small>${data.utkast?.series===s.id?'Fortsätt din berättelse →':s.desc}</small></button>`).join('');$('mine').hidden=!data.sagor.length;}
function openSeries(id){
 const old=data.utkast;
 if(old&&old.series!==id&&old.t?.some(t=>t.trim())&&!confirm('Du har en påbörjad berättelse. Börja på en annan bildserie?'))return;
 draft=old?.series===id?JSON.parse(JSON.stringify(old)):{series:id,t:['','',''],r:''};active=0;editor();
}
function editor(){
 const s=SERIES.find(s=>s.id===draft.series)||SERIES[0];show('game');$('storyTitle').textContent=s.name;
 $('pages').innerHTML=['Början','Problem','Slut'].map((name,i)=>`<article class="story-page"><h2>${i+1}. ${name}</h2>${picture(s.id,i)}<label for="text-${i}">${['Vem är här?','Vad händer?','Hur slutar det?'][i]}</label><textarea id="text-${i}" data-page="${i}" maxlength="1000" placeholder="Berätta …">${esc(draft.t[i]||'')}</textarea></article>`).join('');$('helpText').hidden=true;update();
}
function update(){data.utkast=draft;$('saveState').textContent=save()?'Sparas på den här enheten':'Kunde inte spara på enheten';$('finish').disabled=!draft.t.every(t=>t.trim());}
$('series').onclick=e=>{const b=e.target.closest('[data-series]');if(b)openSeries(b.dataset.series)};
$('pages').addEventListener('focusin',e=>{if(e.target.matches('textarea'))active=+e.target.dataset.page});
$('pages').oninput=e=>{if(!e.target.matches('textarea'))return;draft.t[+e.target.dataset.page]=e.target.value;update()};
$('help').onclick=()=>{const s=SERIES.find(s=>s.id===draft.series);$('helpText').textContent=['Början','Problem','Slut'][active]+': Du kan börja med ”'+s.starts[active]+'”. Fortsätt med dina egna ord.';$('helpText').hidden=false;};
$('back').onclick=hem;
$('finish').onclick=()=>{
 if(!draft?.t.every(t=>t.trim()))return;
 let existing=draft.id&&data.sagor.find(s=>s.id===draft.id);
 if(existing)Object.assign(existing,{t:draft.t.slice(),r:draft.r||'',series:draft.series});
 else{existing={id:Date.now().toString(36),series:draft.series,t:draft.t.slice(),r:draft.r||'',d:Date.now(),version:2};data.sagor.unshift(existing);data.sagor=data.sagor.slice(0,12);data.bildsagor=(Number(data.bildsagor)||0)+1;data.stars.bilder=data.bildsagor>=6?3:data.bildsagor>=3?2:1;}
 delete data.utkast;save();window.Ljud?.chime?.();openBook(existing);
};
function bookName(s){return s.r||SERIES.find(x=>x.id===s.series)?.name||'Min saga'}
function openBook(s){book=s;show('book');$('title').value=s.r||'';$('edit').hidden=!s.series;renderBook()}
function renderBook(){
 $('bok').innerHTML=`<h2>${esc(bookName(book))}</h2>`+(book.series?book.t.map((t,i)=>`<div class="story-book-page">${picture(book.series,i)}<p>${esc(t)}</p></div>`).join(''):legacyBook(book));
}
$('title').oninput=e=>{if(book){book.r=e.target.value.trim();save();renderBook()}};
$('edit').onclick=()=>{draft={id:book.id,series:book.series,t:book.t.slice(),r:book.r||''};active=0;editor()};
$('print').onclick=()=>window.print();
$('read').onclick=()=>{if(!book||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(bookName(book)+'. '+book.t.join(' '));u.lang='sv-SE';u.rate=.9;const voice=speechSynthesis.getVoices().find(v=>v.lang.startsWith('sv'));if(voice)u.voice=voice;speechSynthesis.speak(u)};
function library(){show('saved');$('stories').innerHTML=data.sagor.length?data.sagor.map((s,i)=>`<div class="saved-story"><button data-open="${i}">${esc(bookName(s))}<small>${new Date(s.d).toLocaleDateString('sv-SE')}</small></button><button class="knapp vit" data-delete="${i}" aria-label="Ta bort ${esc(bookName(s))}">✕</button></div>`).join(''):'<p>Här hamnar dina färdiga sagor.</p>';}
$('stories').onclick=e=>{const open=e.target.closest('[data-open]'),del=e.target.closest('[data-delete]');if(open)openBook(data.sagor[+open.dataset.open]);if(del&&confirm('Ta bort den här sagan?')){data.sagor.splice(+del.dataset.delete,1);save();library()}};
$('mine').onclick=$('library').onclick=library;$('new').onclick=$('homeButton').onclick=hem;
const HJ=[{"id":"pojke","img":"player_1","def":"pojken"},{"id":"flicka","img":"female_1","def":"flickan"},{"id":"aventyrare","img":"adventurer_1","def":"äventyraren"},{"id":"kanin","img":"rabbit_1","def":"kaninen"},{"id":"uggla","img":"owl_1","def":"ugglan"},{"id":"pingvin","img":"penguin_1","def":"pingvinen"},{"id":"apa","img":"monkey_1","def":"apan"},{"id":"groda","img":"frog_1","def":"grodan"},{"id":"prinsessa","img":"prinsessa","def":"prinsessan"},{"id":"riddare","img":"riddare","def":"riddaren"},{"id":"drake","img":"drake","def":"draken"},{"id":"troll","img":"troll","def":"trollet"}];
const PL=[{"id":"skog","bg":"trees"},{"id":"orken","bg":"desert"},{"id":"snoberg","bg":"snow"},{"id":"kullar","bg":"hills"},{"id":"svamp","bg":"mushrooms"},{"id":"slott","bg":"slott"},{"id":"slottnatt","bg":"slottnatt"},{"id":"trollskog","bg":"trollskog"},{"id":"drakberg","bg":"drakberg"},{"id":"by","bg":"by"}];
const EV=[{"id":"nyckel","img":"key_1"},{"id":"edelsten","img":"gem_1"},{"id":"mynt","img":"coin_1"},{"id":"morot","img":"carrot_1"},{"id":"stjarna","img":"star_1"},{"id":"fisk","img":"fish_1"},{"id":"spoke","img":"ghost_1"},{"id":"slem","img":"slime_1"},{"id":"orm","img":"snake_1"},{"id":"ufo","img":"ufo_1"},{"id":"skatt","img":"coin_1"},{"id":"hjarta","img":"heart_1"},{"id":"drake","img":"drake_v"},{"id":"troll","img":"troll_v"},{"id":"prinsessa","img":"prinsessa_v"},{"id":"riddare","img":"riddare_v"}];
// Äldre fyrdelade sagor och deras bilder finns kvar att läsa och skriva ut.
function legacyBook(s){const h=HJ.find(x=>x.id===s.v)||HJ[0],p=PL.find(x=>x.id===s.p)||PL[0],e=EV.find(x=>x.id===s.e)||EV[0];return `<div class="picture" style="max-width:360px;margin:auto"><img class="backdrop" src="bilder/bg_${p.bg}.jpg" alt=""><img class="figure" style="left:15%;bottom:8%;height:50%" src="bilder/${h.img}.webp" alt="${esc(h.def)}"><img class="figure" style="left:60%;bottom:8%;height:40%" src="bilder/${e.img}.webp" alt=""></div>`+s.t.map(t=>`<p style="white-space:pre-wrap">${esc(t)}</p>`).join('');}
window.__sb={SERIES,openSeries,hem,library,get data(){return data},get draft(){return draft}};
hem();
