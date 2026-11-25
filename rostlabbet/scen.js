/* Röstlabbet: Sjung och spela, Beatbox och Djurens röster.
   Allt låter från samma CHIMERA-motor som resten av Röstlabbet (rostlabbet.js ger __rostApi).
   Sång: motorns planSong (hela sången) och planNoteOn/planNoteOff (en stavelse per tangent, som i originalets Sing).
   Beatbox: motorns sekvenserare (meddelandet beat) och beatHit. Djur: motorns djurröster (creature, call). */
import {wordSounds} from './svenska-ljud.js';

const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let A=null,E=null,flik=null;

/* ================= SÅNGERNA ================= */
// Melodierna är motorns egna demosånger (DEMO_SONGS), noter [midi, slag] i den ljusa röstens läge.
// Blinka lilla sjungs till Twinkle-melodin. Svenska ord delas i stavelser här (stavelser med bindestreck).
const UTTAL={blinka:'b l ɪ ŋ k a',stjärna:'ʃ ɛː r n a',undrar:'ɵ n d r a r',hur:'h ʉː r',jag:'j ɑː',du:'d ʉː',är:'ɛː r',där:'d ɛː r',vad:'v ɑː d',lilla:'l ɪ l a'};
const SANGER=[
 {id:'blinka',namn:'Blinka lilla',ikon:'⭐',spr:'sv',demo:'Twinkle, twinkle',text:'Blin-ka lil-la stjär-na där, hur jag und-rar vad du är.'},
 {id:'twinkle',namn:'Twinkle, twinkle',ikon:'✨',spr:'en',demo:'Twinkle, twinkle'},
 {id:'daisy',namn:'Daisy Bell',ikon:'🚲',spr:'en',demo:'Daisy Bell'},
 {id:'luft',namn:'Made of air',ikon:'🌬️',spr:'en',demo:'Made of air'},
 {id:'egen',namn:'Egen text',ikon:'✏️',spr:'sv',demo:'Twinkle, twinkle',egen:true}];
const AH={text:'a',onset:[],nucleus:{ipa:'ɑ',stress:1},coda:[],wordEnd:true,phraseEnd:false};
const VOKAL=/[aeiouyɑɛɪɔɵœøʉəæɐʊʌɒ]/;

/** Svensk text → stavelser som motorn kan sjunga. Med bindestreck (Blin-ka) styr texten stavelserna, annars delas ordet vid vokalerna. */
function svStavelser(text){
 const ut=[];const fraser=text.normalize('NFC').split(/(?<=[.!?,;:])\s*/).filter(f=>f.trim());
 fraser.forEach((fras,fi)=>{
  const ord=fras.match(/[A-Za-zÅÄÖåäö-]+/g)||[];
  ord.forEach((o,oi)=>{
   const ren=o.toLowerCase().replace(/-/g,'');if(!ren)return;
   let ljud=(UTTAL[ren]||wordSounds(ren).join(' ')).replaceAll('ʉ','y').replaceAll('ɵ','œ').replaceAll('ɕ','ʃ');
   const seg=A.eng.tokenizeIpa(ljud);if(!seg.length)return;
   const v=seg.map((s,i)=>VOKAL.test(s.ipa)?i:-1).filter(i=>i>=0);if(!v.length)return;
   // skrivna stavelser: bindestreck, annars vokalgrupper i stavningen
   let skr=o.includes('-')?o.split('-'):(o.match(/[^aeiouyåäöAEIOUYÅÄÖ]*[aeiouyåäöAEIOUYÅÄÖ]+(?:[^aeiouyåäöAEIOUYÅÄÖ]*$)?/g)||[o]);
   if(skr.length!==v.length)skr=v.map((_,i)=>i?'':o);
   v.forEach((vi,k)=>{
    const forra=k?v[k-1]:-1,nasta=k<v.length-1?v[k+1]:seg.length;
    // konsonanter mellan två vokaler: en går till nästa stavelse, fler: den första stannar kvar
    const mellanFore=k?vi-forra-1:0,startOnset=k?forra+1+(mellanFore>=2?1:0):0;
    const mellanEfter=nasta-vi-1,slutCoda=k<v.length-1?vi+1+(mellanEfter>=2?1:0):seg.length;
    const mk=s=>({ipa:s.ipa,stress:0});
    ut.push({text:skr[k]||'',onset:seg.slice(startOnset,vi).map(mk),nucleus:{ipa:seg[vi].ipa,stress:k===0?1:0},coda:seg.slice(vi+1,slutCoda).map(mk),
     wordEnd:k===v.length-1,phraseEnd:k===v.length-1&&oi===ord.length-1&&fi<fraser.length-1});
   });
  });
 });
 return ut;
}
function stavelser(s,text){
 if(s.spr==='sv')return svStavelser(text);
 try{return A.eng.lyricsToSyllables(text,'en')}catch(e){return []}
}
const demo=s=>A.eng.DEMO_SONGS.find(d=>d.name===s.demo);
const oktav=()=>{const o=demo(sang()).octave||{};return (o[A.bodyName]||0)*12};

/* ================= FLIKARNA ================= */
const HTML=`
<div class="flikar" role="tablist" aria-label="Mer att göra med rösten">
 <button role="tab" class="flik" data-flik="sjung" aria-selected="false">🎹 Sjung och spela</button>
 <button role="tab" class="flik" data-flik="beat" aria-selected="false">🥁 Beatbox</button>
 <button role="tab" class="flik" data-flik="djur" aria-selected="false">🐘 Djurens röster</button>
</div>
<div class="flikyta" id="f-sjung" role="tabpanel" hidden>
 <p class="lead">Välj en sång. Låt huvudet sjunga den, eller spela själv: <b>varje tangent sjunger nästa stavelse</b>. Följ den gula tangenten!</p>
 <div class="sanger" id="sanger" role="group" aria-label="Välj sång"></div>
 <div class="egen" id="egen" hidden>
  <label for="egenText">Din text (sjungs till Blinka lilla-melodin)</label>
  <textarea id="egenText" rows="2" maxlength="160" placeholder="Hej på dig, min bästa vän, nu ska vi sjunga en gång igen."></textarea>
  <div class="sprak" role="group" aria-label="Språk"><button class="small selected" data-spr="sv" aria-pressed="true">Svenska</button><button class="small" data-spr="en" aria-pressed="false">English</button></div>
 </div>
 <div class="munrad"><canvas class="mun" aria-hidden="true"></canvas><div class="karaoke" id="karaoke" aria-live="off"></div></div>
 <div class="sjungknappar"><button class="knapp primary" id="sjungHela">▶ Låt huvudet sjunga</button><button class="knapp" id="borjaOm">↺ Från början</button></div>
 <div class="piano-wrap"><div class="piano" id="piano" role="group" aria-label="Pianotangenter: varje tangent sjunger nästa stavelse"></div></div>
 <p class="hint" id="pianoHint">Tryck på tangenterna, eller använd datorns tangentbord: A S D F G H J K L.</p>
</div>
<div class="flikyta" id="f-beat" role="tabpanel" hidden>
 <p class="lead">Beatbox är trummor med munnen. Titta på genomskärningen: läpparna smäller, tungan klickar och luften väser.</p>
 <h3>Spela en takt</h3>
 <div class="takter" id="takter" role="group" aria-label="Välj takt"></div>
 <div class="taktrad"><button class="knapp primary" id="taktSpela">▶ Spela takten</button>
  <label class="tempo">Tempo <input type="range" id="tempo" min="60" max="140" value="96"><output id="tempoV">96</output></label></div>
 <div class="munrad"><canvas class="mun" aria-hidden="true"></canvas><div class="steg" id="steg" aria-label="Taktens steg"></div></div>
 <h3>Trumma själv</h3>
 <p class="hint">Tryck på ett ljud för att höra det. Välj ett ljud och tryck på stegen ovanför för att göra en egen takt.</p>
 <div class="pads" id="pads"></div>
 <p class="hur" id="hur" aria-live="polite"></p>
</div>
<div class="flikyta" id="f-djur" role="tabpanel" hidden>
 <p class="lead">Djur har också röster, men byggda på andra sätt. Motorn räknar fram ljudet ur djurets kropp.</p>
 <div class="djur" id="djurval" role="group" aria-label="Välj djur"></div>
 <div class="djurkort" id="djurkort"></div>
</div>`;

/* ================= SJUNG ================= */
let S={sang:'blinka',spr:'sv',syl:[],cursor:0,run:null,keys:[],sounding:null,tag:2,tails:[],noter:[]};
const sang=()=>SANGER.find(s=>s.id===S.sang);
function sangText(s){return s.egen?($('egenText').value.trim()||'La la la la la la la.'):s.text||demo(s).lyrics}
function laddaSang(){
 const s=sang(),spr=s.egen?S.spr:s.spr;S.syl=stavelser({...s,spr},sangText(s));if(!S.syl.length)S.syl=[AH];S.cursor=0;
 const d=demo(s),sh=oktav();S.noter=d.notes.map(([m,b])=>[m+sh,b]);
 ritaKaraoke();ritaPiano();
}
function ritaSanger(){$('sanger').innerHTML=SANGER.map(s=>`<button class="sangval${s.id===S.sang?' selected':''}" data-sang="${s.id}" aria-pressed="${s.id===S.sang}"><span aria-hidden="true">${s.ikon}</span>${esc(s.namn)}</button>`).join('');$('egen').hidden=!sang().egen}
function ritaKaraoke(at=S.cursor){$('karaoke').innerHTML=S.syl.map((s,i)=>`<span class="st${i===at?' nu':''}${i<at?' sjungen':''}">${esc(s.text||'~')}${s.wordEnd?'':'-'}</span>${s.wordEnd?' ':''}`).join('')}
// pianot: tangenterna som melodin behöver, minst en oktav, svenska tonnamn (H i stället för B)
const NAMN=['C','C#','D','D#','E','F','F#','G','G#','A','A#','H'],SVART=[1,3,6,8,10];
const DATOR='asdfghjklöä',DATORS='wetyuop';
let pianoMidi=[];
function ritaPiano(){
 const ms=S.noter.map(n=>n[0]);let lo=Math.min(...ms),hi=Math.max(...ms);
 while(SVART.includes(((lo%12)+12)%12))lo--;while(SVART.includes(((hi%12)+12)%12))hi++;
 while(hi-lo<12){hi++;while(SVART.includes(((hi%12)+12)%12))hi++}
 pianoMidi=[];for(let m=lo;m<=hi;m++)pianoMidi.push(m);
 const vita=pianoMidi.filter(m=>!SVART.includes(((m%12)+12)%12));
 let vi=0,si=0;
 $('piano').style.setProperty('--vita',vita.length);
 $('piano').innerHTML=pianoMidi.map(m=>{const sv=SVART.includes(((m%12)+12)%12);const pos=sv?vi:vi++;const tk=sv?(DATORS[si++]||''):(DATOR[pos]||'');
  return `<button class="tang ${sv?'svart':'vit'}" data-midi="${m}" style="--i:${pos}" aria-label="Ton ${NAMN[((m%12)+12)%12]}"><span class="tn">${NAMN[((m%12)+12)%12]}</span>${tk?`<span class="tk">${tk.toUpperCase()}</span>`:''}</button>`}).join('');
 glod();
}
function glod(){const n=S.noter[S.cursor%S.noter.length];document.querySelectorAll('#piano .tang').forEach(b=>b.classList.toggle('nasta',!S.run&&n&&+b.dataset.midi===n[0]))}
const klocka=()=>A.clock??0;
async function redo(){if(A.playing&&!A.utterance&&S.aktiv)return true;const ok=await A.aktivera('Rösten sjunger …');if(ok){S.aktiv=true;A.status('Sjung! Varje tangent sjunger nästa stavelse.')}return ok}
function sched(gs){A.send({type:'schedule',gestures:gs,segments:[],end:0,id:Date.now()%1e9,replace:false,lead:.006})}
const rel=t=>A.send({type:'release',tag:t});
async function tonPa(midi,el){
 stoppaHela();if(!await redo())return;
 S.keys=S.keys.filter(k=>k!==midi).concat(midi);
 const i=S.cursor%S.syl.length,syl=S.syl[i];
 const tag=S.tag;S.tag+=2;
 for(const t of S.tails)rel(t+1);
 const fran=S.sounding;if(fran){rel(fran.tag);rel(fran.tag+1)}
 try{const gs=A.eng.planNoteOn(syl,midi,{body:A.body,vibrato:35,tag,legatoFrom:fran?{syl:fran.syl,midi:fran.midi}:undefined});sched(gs)}catch(e){console.error(e)}
 S.sounding={midi,syl,tag};S.cursor=(i+1)%S.syl.length;
 el?.classList.add('ner');ritaKaraoke(i);glod();
}
function tonAv(midi,el){
 el?.classList.remove('ner');S.keys=S.keys.filter(k=>k!==midi);const s=S.sounding;if(!s||s.midi!==midi)return;
 rel(s.tag);rel(s.tag+1);S.sounding=null;
 try{const gs=A.eng.planNoteOff(s.syl,midi,A.body);if(gs.length){const tag=S.tag;S.tag+=2;sched(gs.map(g=>({...g,tag:g.label===A.eng.EXHALE_LABEL?tag+1:tag})));S.tails.push(tag);if(S.tails.length>8)S.tails.shift()}}catch(e){console.error(e)}
 ritaKaraoke();
}
function tystaToner(){if(S.sounding){rel(S.sounding.tag);rel(S.sounding.tag+1);S.sounding=null}for(const t of S.tails){rel(t);rel(t+1)}S.tails=[];S.keys=[];document.querySelectorAll('#piano .ner').forEach(b=>b.classList.remove('ner'))}
// hela sången
let planId=0;
async function sjungHela(){
 if(S.run){A.stop('Sången är slut.');return}
 tystaToner();const syl=S.syl,d=demo(sang()),bpm=d.bpm;
 // en stavelse per not; finns fler stavelser går melodin runt igen
 const n=Math.max(syl.length,S.noter.length),notes=[];for(let i=0;i<n;i++){const [m,b]=S.noter[i%S.noter.length];notes.push({midi:m,beats:b,syl:syl[i%syl.length]})}
 const t0=.35,plan=A.eng.planSong(notes,{body:A.body,bpm,t0,vibrato:35});
 if(!await A.aktivera('Huvudet sjunger …'))return;S.aktiv=false;
 const beat=60/bpm;let t=t0;const tider=notes.map(x=>{const a=t;t+=x.beats*beat;return [a,t]});
 const id=++planId+5e8;S.run={id,tider,offset:null,from:notes.map((_,i)=>i%syl.length),midi:notes.map(x=>x.midi)};
 A.setUtterance({id,end:null});
 A.send({type:'schedule',id,gestures:plan.gestures,segments:plan.segments,end:plan.end,replace:true});
 $('sjungHela').textContent='■ Sluta sjunga';glod();
}
function stoppaHela(){if(!S.run)return;S.run=null;$('sjungHela').textContent='▶ Låt huvudet sjunga';ritaKaraoke();glod();document.querySelectorAll('#piano .spelas').forEach(b=>b.classList.remove('spelas'))}
function tickSang(){
 const r=S.run;if(!r||r.offset===null)return;const t=klocka()-r.offset;let k=-1;while(k+1<r.tider.length&&r.tider[k+1][0]<=t)k++;
 if(k!==r.k){r.k=k;ritaKaraoke(k<0?-1:r.from[k]);document.querySelectorAll('#piano .tang').forEach(b=>b.classList.toggle('spelas',k>=0&&t<r.tider[k][1]&&+b.dataset.midi===r.midi[k]))}
}

/* ================= BEATBOX ================= */
const LJUDNAMN={B:['Bastrumma','🥁','Läpparna smäller upp. Struphuvudet trycker ut luften.'],t:['Hi-hat','🔔','Tungspetsen släpper och det väser kort.'],tss:['Öppen hi-hat','🌬️','Som hi-hat, men väsandet får fortsätta.'],
 Pf:['Virvel','💥','Läpparna smäller och sedan väser underläppen mot tänderna.'],K:['Kantslag','🪵','Bakre delen av tungan smäller.'],'^K':['Inandad virvel','😮‍💨','Ett snabbt andetag in förbi tungan.'],
 '!':['Tungklick','👅','Tungan suger fast och smäller loss.'],'P!':['Läppknäpp','💋','Stängda läppar, käken går ner och läpparna poppar upp.'],kch:['Cymbal','🔊','Bakre tungan släpper ut ett långt väsande.'],m:['Brum','🎵','En brummande baston genom näsan.']};
const TAKTNAMN={'Boots and cats':'Boots and cats','Four on the floor':'Fyra på golvet','Breakbeat':'Breakbeat','Rimshot shuffle':'Kantslag-shuffle','Inward snare':'Inandad virvel','Clicks and pops':'Klick och knäpp','Hum bass':'Brumbas'};
let B={takt:null,steg:[],spelar:false,pensel:'B',bpm:96,swing:0};
function ritaTakter(){$('takter').innerHTML=A.eng.BEAT_PRESETS.map(p=>`<button class="small${p.name===B.takt?' selected':''}" data-takt="${esc(p.name)}" aria-pressed="${p.name===B.takt}">${esc(TAKTNAMN[p.name]||p.name)}</button>`).join('')}
function valjTakt(namn){const p=A.eng.BEAT_PRESETS.find(x=>x.name===namn);if(!p)return;B.takt=namn;B.steg=A.eng.parseBeat(p.text);B.bpm=p.bpm;B.swing=p.swing;$('tempo').value=p.bpm;$('tempoV').textContent=p.bpm;
 ritaTakter();ritaSteg();if(B.spelar)A.send({type:'beat',steps:B.steg,bpm:B.bpm,swing:B.swing,preset:namn,playing:true})}
function ritaSteg(){$('steg').style.setProperty('--n',B.steg.length);$('steg').innerHTML=B.steg.map((s,i)=>`<button class="steg1${i%4===0?' slag':''}" data-steg="${i}" aria-label="Steg ${i+1}: ${s?LJUDNAMN[s.id]?.[0]||s.id:'tyst'}">${s?(LJUDNAMN[s.id]?.[1]||s.id):''}</button>`).join('')}
function ritaPads(){$('pads').innerHTML=A.eng.BEAT_SOUNDS.map((s,i)=>{const n=LJUDNAMN[s.id]||[s.name,'🔈',s.hint];return `<button class="pad${s.id===B.pensel?' pensel':''}" data-pad="${esc(s.id)}"><span class="pe" aria-hidden="true">${n[1]}</span><b>${esc(n[0])}</b><small>${(i+1)%10}</small></button>`}).join('')}
async function beatPa(){if(!await A.aktivera('Beatbox …'))return false;B.aktiv=true;A.förstärk(3);A.setArtic(A.eng.beatReady(A.body));return true}
async function spelaTakt(){
 if(B.spelar){A.stop('Takten har slutat.');return}
 if(!await beatPa())return;
 B.spelar=true;A.send({type:'beat',steps:B.steg,bpm:B.bpm,swing:B.swing,preset:B.takt,playing:true});$('taktSpela').textContent='■ Stoppa takten';A.status('Titta på munnen när takten spelar!');
}
async function pad(id){B.pensel=id;ritaPads();const n=LJUDNAMN[id];$('hur').innerHTML=n?`<b>${n[1]} ${esc(n[0])}:</b> ${esc(n[2])}`:'';
 if(!B.aktiv&&!await beatPa())return;A.send({type:'beatHit',id})}
function tickBeat(){const s=A.tele?.beatStep??-1;if(s===B.ss)return;B.ss=s;document.querySelectorAll('#steg .steg1').forEach((b,i)=>b.classList.toggle('nu',i===s))}

/* ================= DJUREN ================= */
const DJUR={songbird:{namn:'Sångfågel',e:'🐦',om:'Fågeln har två små röstläppar, en i varje luftrör. De kan sjunga två toner samtidigt!'},
 seal:{namn:'Weddellsäl',e:'🦭',om:'Sälen kan glida från ljusa toner ner till så mörka att de nästan inte hörs. Under isen låter det som rymdljud.'},
 alligator:{namn:'Alligator',e:'🐊',om:'Alligatorn ryter med stängd mun. Hela kroppen skakar, och vattnet ovanpå ryggen börjar dansa.'},
 elephant:{namn:'Elefant',e:'🐘',om:'Elefanten mullrar så djupt att vi inte kan höra det (infraljud). Andra elefanter känner det genom marken! Den trumpetar genom snabeln.'}};
const LATE={flute:'Flöjtsång',trill:'Drill',chirps:'Kvitterkaskad',buzz:'Surr',zap:'Laserzapp',whistle:'Vissling',chug:'Grymtning',bellow:'Vrål',growl:'Morrning',hiss:'Väsning',dance:'Vattendans',rumble:'Mullrande',trumpet:'Trumpetande',squeak:'Pip'};
const LAG=new Set(['alligator:bellow','alligator:dance','alligator:growl','elephant:rumble','seal:chug']);  // så låga att små högtalare inte återger dem
let D={id:'elephant',horbart:true,aktiv:false,raf:0};
function ritaDjur(){
 $('djurval').innerHTML=A.eng.CREATURES.map(c=>{const d=DJUR[c.id]||{namn:c.name,e:'🐾'};return `<button class="djurval${c.id===D.id?' selected':''}" data-djur="${c.id}" aria-pressed="${c.id===D.id}"><span aria-hidden="true">${d.e}</span>${esc(d.namn)}</button>`}).join('');
 const c=A.eng.creatureById(D.id),d=DJUR[D.id]||{namn:c.name,e:'🐾',om:c.blurb},lag=c.calls.some(k=>LAG.has(D.id+':'+k.id));
 $('djurkort').innerHTML=`<div class="djurbild" id="djurbild" aria-hidden="true">${d.e}</div><div><h3>${esc(d.namn)} <small>${esc(c.latin||'')}</small></h3><p>${esc(d.om)}</p>
  <div class="laten">${c.calls.map(k=>`<button class="knapp" data-late="${k.id}" title="${esc(k.hint)}">▶ ${esc(LATE[k.id]||k.name)}</button>`).join('')}</div>
  ${lag?`<label class="horbart"><input type="checkbox" id="horbart" ${D.horbart?'checked':''}> Gör de lägsta ljuden hörbara <small>Det riktiga ljudet är för lågt för våra öron och för små högtalare. Då spelar vi det högre upp.</small></label>`:''}</div>`;
}
async function late(id){
 const c=A.eng.creatureById(D.id),k=c.calls.find(x=>x.id===id);if(!k)return;
 if(!D.aktiv){if(!await A.aktivera('Djuret gör sig redo …'))return;A.send({type:'creature',id:D.id});D.aktiv=true}
 let pitch;const pp=c.params.find(p=>p.role==='pitch');
 if(D.horbart&&LAG.has(D.id+':'+id)&&k.pitchRef&&pp)pitch=Math.min(pp.max,k.pitchRef*4);
 A.send({type:'call',id,pitch,amp:1});A.status(`${DJUR[D.id]?.e||''} ${LATE[id]||k.name}!`);
 cancelAnimationFrame(D.raf);const t0=performance.now();const anim=()=>{const el=$('djurbild');if(!el)return;const l=Math.min(1,A.level()*6);el.style.transform=`scale(${1+l*.35}) rotate(${(Math.random()-.5)*l*8}deg)`;if(performance.now()-t0<6000)D.raf=requestAnimationFrame(anim);else el.style.transform=''};anim();
}

/* ================= START ================= */
function visaFlik(f){
 if(flik===f)return;
 if(flik)A.stop('Rösten är tyst.');
 flik=f;document.querySelectorAll('.flik').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.flik===f)));
 for(const x of ['sjung','beat','djur'])$('f-'+x).hidden=x!==f;
 try{sessionStorage.setItem('rost-flik',f)}catch(e){}
}
export function init(api){
 A=api;E=api.eng;const host=$('scen');if(!host)return;host.innerHTML=HTML;host.hidden=false;
 // Tyst (knappen, Escape, flikbyte, ljudet av) stoppar allt här också
 A.vidStopp(()=>{stoppaHela();tystaToner();S.aktiv=false;
  if(B.spelar||B.aktiv){A.send({type:'beat',playing:false});B.spelar=false;B.aktiv=false;$('taktSpela').textContent='▶ Spela takten'}
  if(D.aktiv){A.send({type:'stopCall'});A.send({type:'creature',id:'human'});D.aktiv=false}});
 A.lyssna(m=>{if(m.type==='planned'&&S.run&&m.id===S.run.id)S.run.offset=m.t0});
 // sjung
 ritaSanger();laddaSang();
 $('sanger').onclick=e=>{const b=e.target.closest('[data-sang]');if(!b)return;A.stop('Rösten är tyst.');S.sang=b.dataset.sang;ritaSanger();laddaSang()};
 $('egenText').oninput=()=>{laddaSang()};
 document.querySelector('#f-sjung .sprak').onclick=e=>{const b=e.target.closest('[data-spr]');if(!b)return;S.spr=b.dataset.spr;document.querySelectorAll('#f-sjung [data-spr]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});laddaSang()};
 $('sjungHela').onclick=sjungHela;$('borjaOm').onclick=()=>{S.cursor=0;ritaKaraoke();glod()};
 const piano=$('piano');
 piano.addEventListener('pointerdown',e=>{const b=e.target.closest('.tang');if(!b)return;e.preventDefault();try{b.releasePointerCapture?.(e.pointerId)}catch(x){}b.dataset.pid=e.pointerId;tonPa(+b.dataset.midi,b)});
 const upp=e=>{document.querySelectorAll(`#piano .tang[data-pid="${e.pointerId}"]`).forEach(b=>{delete b.dataset.pid;tonAv(+b.dataset.midi,b)})};
 addEventListener('pointerup',upp);addEventListener('pointercancel',upp);
 const tangent=e=>{if(flik!=='sjung'||e.repeat||e.metaKey||e.ctrlKey||e.altKey)return;const a=document.activeElement;if(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))return;
  const k=e.key.toLowerCase(),vit=DATOR.indexOf(k),sv=DATORS.indexOf(k);let el=null;
  if(vit>=0)el=document.querySelectorAll('#piano .vit')[vit];else if(sv>=0)el=document.querySelectorAll('#piano .svart')[sv];
  if(!el)return;e.preventDefault();if(e.type==='keydown')tonPa(+el.dataset.midi,el);else tonAv(+el.dataset.midi,el)};
 addEventListener('keydown',tangent);addEventListener('keyup',tangent);
 // beatbox
 ritaPads();valjTakt(A.eng.BEAT_PRESETS[0].name);
 $('takter').onclick=e=>{const b=e.target.closest('[data-takt]');if(b)valjTakt(b.dataset.takt)};
 $('taktSpela').onclick=spelaTakt;
 $('tempo').oninput=()=>{B.bpm=+$('tempo').value;$('tempoV').textContent=B.bpm;if(B.spelar)A.send({type:'beat',bpm:B.bpm})};
 $('pads').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-pad]');if(!b)return;e.preventDefault();b.classList.add('slag');setTimeout(()=>b.classList.remove('slag'),140);pad(b.dataset.pad)});
 $('steg').onclick=e=>{const b=e.target.closest('[data-steg]');if(!b)return;const i=+b.dataset.steg,s=B.steg[i];B.steg[i]=s&&s.id===B.pensel?null:{id:B.pensel};B.takt=null;ritaTakter();ritaSteg();A.send({type:'beat',steps:B.steg,preset:null})};
 addEventListener('keydown',e=>{if(flik!=='beat'||e.repeat||!/^[0-9]$/.test(e.key))return;const a=document.activeElement;if(a&&/^(INPUT|TEXTAREA)$/.test(a.tagName)&&a.type!=='range')return;const i=(+e.key+9)%10,s=A.eng.BEAT_SOUNDS[i];if(s){e.preventDefault();pad(s.id)}});
 // djur
 ritaDjur();
 $('djurval').onclick=e=>{const b=e.target.closest('[data-djur]');if(!b)return;if(D.aktiv)A.stop('Rösten är tyst.');D.id=b.dataset.djur;ritaDjur()};
 $('djurkort').addEventListener('click',e=>{const b=e.target.closest('[data-late]');if(b)late(b.dataset.late)});
 $('djurkort').addEventListener('change',e=>{if(e.target.id==='horbart')D.horbart=e.target.checked});
 // flikar
 host.querySelector('.flikar').onclick=e=>{const b=e.target.closest('[data-flik]');if(b)visaFlik(b.dataset.flik)};
 let f='sjung';try{f=sessionStorage.getItem('rost-flik')||'sjung'}catch(e){}visaFlik(f);
 // rösttyp ändrar sångens läge
 document.querySelectorAll('[data-body]').forEach(b=>b.addEventListener('click',()=>setTimeout(laddaSang,0)));
 (function loop(){requestAnimationFrame(loop);if(document.hidden)return;if(flik==='sjung')tickSang();if(flik==='beat')tickBeat()})();
 window.__scen={get S(){return S},get B(){return B},get D(){return D},visaFlik,tonPa,tonAv,sjungHela,spelaTakt,pad,late,svStavelser};
}
