/* Röstlabbet: Sjung och spela, Beatbox, Djurens röster och Ljudskolan.
   Allt låter från samma CHIMERA-motor som resten av Röstlabbet (rostlabbet.js ger __rostApi).
   Sång: motorns planSong (hela sången) och planNoteOn/planNoteOff (en stavelse per tangent, som i originalets Sing);
   egen text fördelas på en stämningsmelodi som i originalets song/fit.ts. Tonrulle och filminspelning (MediaRecorder).
   Beatbox: motorns sekvenserare (meddelandet beat) och beatHit, rutnät med ett ljud per rad.
   Djur: motorns djurröster (creature, call) och deras genomskärningar (djurbild.js). Ljudskolan: skola.js. */
import {wordSounds} from './svenska-ljud.js';
import {ritaDjur} from './djurbild.js';
import {SKOLA_HTML,initSkola,ritaVokalkarta} from './skola.js';

const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let A=null,flik=null;

/* ================= SÅNGERNA ================= */
const UTTAL={blinka:'b l ɪ ŋ k a',stjärna:'ʃ ɛː r n a',undrar:'ɵ n d r a r',hur:'h ʉː r',jag:'j ɑː',du:'d ʉː',är:'ɛː r',där:'d ɛː r',vad:'v ɑː d',lilla:'l ɪ l a'};
const SANGER=[
 {id:'blinka',namn:'Blinka lilla',ikon:'⭐',spr:'sv',demo:'Twinkle, twinkle',text:'Blin-ka lil-la stjär-na där, hur jag und-rar vad du är.'},
 {id:'twinkle',namn:'Twinkle, twinkle',ikon:'✨',spr:'en',demo:'Twinkle, twinkle'},
 {id:'daisy',namn:'Daisy Bell',ikon:'🚲',spr:'en',demo:'Daisy Bell'},
 {id:'luft',namn:'Made of air',ikon:'🌬️',spr:'en',demo:'Made of air'},
 {id:'egen',namn:'Egen text',ikon:'✏️',spr:'sv',egen:true}];
// Stämningsmelodierna för egen text (originalets song/tunes.ts). Noter [midi, slag] i den ljusa röstens läge, en rad per fras.
const OKT={male:-1,female:0,child:0};
const MELODIER=[
 {id:'drom',namn:'Drömsk',ikon:'🌙',demo:'Made of air',delar:[9,10]},
 {id:'glad',namn:'Glad',ikon:'☀️',bpm:104,fraser:[[[64,1],[64,1],[67,1],[69,1],[67,1.5],[64,.5],[62,2]],[[60,1],[62,1],[64,1],[67,1],[64,1.5],[62,.5],[60,2]],[[69,1],[69,1],[72,1],[69,1],[67,1.5],[64,.5],[67,2]],[[65,1],[64,1],[62,1],[64,1],[62,1],[59,1],[60,2]]]},
 {id:'sorg',namn:'Sorgsen',ikon:'🌧️',bpm:76,fraser:[[[57,1],[60,1],[64,1.5],[62,.5],[60,1],[59,1],[57,2]],[[57,1],[60,1],[64,1],[67,1],[65,1.5],[64,.5],[64,2]],[[65,1],[64,1],[62,1],[60,1],[62,1.5],[60,.5],[59,2]],[[57,1],[59,1],[60,1],[62,1],[64,1],[59,1],[57,2]]]},
 {id:'lek',namn:'Lekfull',ikon:'🎈',bpm:120,fraser:[[[67,.5],[67,.5],[64,.5],[67,.5],[69,1],[67,1],[64,.5],[62,.5],[60,1],[62,2]],[[60,.5],[60,.5],[62,.5],[64,.5],[67,1],[64,1],[62,.5],[60,.5],[62,1],[64,2]],[[67,.5],[67,.5],[69,.5],[71,.5],[72,1],[71,1],[69,.5],[67,.5],[64,1],[67,2]],[[69,.5],[67,.5],[64,.5],[62,.5],[60,1],[62,1],[64,.5],[62,.5],[60,1],[60,2]]]},
 {id:'mjuk',namn:'Mjuk vals',ikon:'🌸',bpm:96,fraser:[[[65,2],[69,1],[72,2],[69,1],[67,2],[65,1],[67,3]],[[65,2],[69,1],[72,2],[74,1],[72,2],[69,1],[67,3]],[[70,2],[69,1],[67,2],[65,1],[64,2],[65,1],[67,3]],[[65,2],[69,1],[67,2],[64,1],[62,2],[64,1],[65,3]]]},
 {id:'blinkam',namn:'Blinka lilla',ikon:'⭐',demo:'Twinkle, twinkle',delar:[7,7]}];
const AH={text:'a',onset:[],nucleus:{ipa:'ɑ',stress:1},coda:[],wordEnd:true,phraseEnd:false};
const VOKAL=/[aeiouyɑɛɪɔɵœøʉəæɐʊʌɒ]/;
const demoAv=namn=>A.eng.DEMO_SONGS.find(d=>d.name===namn);
function melodi(id){const m=MELODIER.find(x=>x.id===id)||MELODIER[0];if(m.fraser)return m;
 const d=demoAv(m.demo);let at=0;return {...m,bpm:d.bpm,fraser:m.delar.map(n=>d.notes.slice(at,at+=n).map(([a,b])=>[a,b]))}}

/** Svensk text → stavelser som motorn kan sjunga. Med bindestreck (Blin-ka) styr texten stavelserna, annars delas ordet vid vokalerna. */
function svStavelser(text){
 const ut=[];const fraser=text.normalize('NFC').split(/(?<=[.!?,;:\n])\s*/).filter(f=>f.trim());
 fraser.forEach((fras,fi)=>{
  const ord=fras.match(/[A-Za-zÅÄÖåäö-]+/g)||[];
  ord.forEach((o,oi)=>{
   const ren=o.toLowerCase().replace(/-/g,'');if(!ren)return;
   const ljud=(UTTAL[ren]||wordSounds(ren).join(' ')).replaceAll('ʉ','y').replaceAll('ɵ','œ').replaceAll('ɕ','ʃ');
   const seg=A.eng.tokenizeIpa(ljud);if(!seg.length)return;
   const v=seg.map((s,i)=>VOKAL.test(s.ipa)?i:-1).filter(i=>i>=0);if(!v.length)return;
   let skr=o.includes('-')?o.split('-'):(o.match(/[^aeiouyåäöAEIOUYÅÄÖ]*[aeiouyåäöAEIOUYÅÄÖ]+(?:[^aeiouyåäöAEIOUYÅÄÖ]*$)?/g)||[o]);
   if(skr.length!==v.length)skr=v.map((_,i)=>i?'':o);
   v.forEach((vi,k)=>{
    const forra=k?v[k-1]:-1,nasta=k<v.length-1?v[k+1]:seg.length;
    // konsonanter mellan två vokaler: en går till nästa stavelse, fler: den första stannar kvar
    const startOnset=k?forra+1+(vi-forra-1>=2?1:0):0,slutCoda=k<v.length-1?vi+1+(nasta-vi-1>=2?1:0):seg.length;
    const mk=s=>({ipa:s.ipa,stress:0});
    ut.push({text:skr[k]||'',onset:seg.slice(startOnset,vi).map(mk),nucleus:{ipa:seg[vi].ipa,stress:k===0?1:0},coda:seg.slice(vi+1,slutCoda).map(mk),
     wordEnd:k===v.length-1,phraseEnd:k===v.length-1&&oi===ord.length-1&&fi<fraser.length-1});
   });
  });
 });
 return ut;
}
/* ---- egen text på en melodi (originalets song/fit.ts, samma regler) ---- */
const fragStorlek=t=>Math.max(1,Math.round(t.fraser.reduce((n,p)=>n+p.length,0)/t.fraser.length));
function rader(syls,size){const raw=[];let cur=[];for(let i=0;i<syls.length;i++){cur.push(i);if(syls[i].phraseEnd){raw.push(cur);cur=[]}}if(cur.length)raw.push(cur);
 const kort=p=>p.length<size/3,ryms=(a,b)=>a.length+b.length<=1.5*size,m=[];
 for(const p of raw){const f=m[m.length-1];if(f&&kort(f)&&ryms(f,p))f.push(...p);else m.push([...p])}
 if(m.length>1){const l=m[m.length-1],f=m[m.length-2];if(kort(l)&&ryms(f,l))f.push(...m.pop())}
 const out=[];for(const p of m){if(p.length<=1.5*size){out.push(p);continue}const k=Math.ceil(p.length/size);let start=0;
  for(let c=1;c<k;c++){const target=Math.round(c*p.length/k);let cut=-1;for(let i=start+1;i<p.length;i++)if(syls[p[i-1]].wordEnd&&(cut<0||Math.abs(i-target)<Math.abs(cut-target)))cut=i;if(cut<0)break;out.push(p.slice(start,cut));start=cut}
  out.push(p.slice(start))}return out}
function passaRad(line,fras){const n=line.length;if(!n)return{notes:[],from:[]};const notes=fras.map(([midi,beats])=>({midi,beats}));
 while(notes.length<n){let k=0;for(let i=1;i<notes.length;i++)if(notes[i].beats>notes[k].beats)k=i;const h=notes[k].beats/2;notes.splice(k,1,{midi:notes[k].midi,beats:h},{midi:notes[k].midi,beats:h})}
 while(notes.length>2*n){let k=0;const last=notes.length>2?notes.length-2:notes.length-1;for(let i=1;i<last;i++)if(notes[i].beats+notes[i+1].beats<notes[k].beats+notes[k+1].beats)k=i;notes.splice(k,2,{midi:notes[k].midi,beats:notes[k].beats+notes[k+1].beats})}
 const m=notes.length,at=j=>n-1-Math.floor((m-1-j)*n/m);
 return{notes:notes.map((note,j)=>{const s=line[at(j)],held=j>0&&at(j-1)===at(j);const syl=held?{text:'~',onset:[],nucleus:s.nucleus,coda:[],melisma:true,wordEnd:s.wordEnd,phraseEnd:false}:{...s,phraseEnd:false};if(j===m-1)syl.phraseEnd=true;return{midi:note.midi,beats:note.beats,syl}}),from:notes.map((_,j)=>at(j))}}
function passaSang(t,syls,shift){const notes=[],from=[];rader(syls,fragStorlek(t)).forEach((line,k)=>{const f=passaRad(line.map(i=>syls[i]),t.fraser[k%t.fraser.length]);for(const n of f.notes)notes.push({...n,midi:n.midi+shift});for(const j of f.from)from.push(line[j])});return{notes,from}}

/* ================= FLIKARNA ================= */
const HTML=`
<div class="flikar" role="tablist" aria-label="Mer att göra med rösten">
 <button role="tab" class="flik" data-flik="sjung" aria-selected="false">🎹 Sjung och spela</button>
 <button role="tab" class="flik" data-flik="beat" aria-selected="false">🥁 Beatbox</button>
 <button role="tab" class="flik" data-flik="djur" aria-selected="false">🐘 Djurens röster</button>
 <button role="tab" class="flik" data-flik="skola" aria-selected="false">🔤 Ljudskola</button>
</div>
<div class="flikyta" id="f-sjung" role="tabpanel" hidden>
 <p class="lead">Välj en sång. Låt huvudet sjunga den, eller spela själv: <b>varje tangent sjunger nästa stavelse</b>. Följ den gula tangenten!</p>
 <div class="sanger" id="sanger" role="group" aria-label="Välj sång"></div>
 <div class="egen" id="egen" hidden>
  <label for="egenText">Din text</label>
  <textarea id="egenText" rows="3" maxlength="240" placeholder="Hej på dig, min bästa vän. Nu ska vi sjunga en gång igen."></textarea>
  <div class="sprak" role="group" aria-label="Språk"><button class="small selected" data-spr="sv" aria-pressed="true">Svenska</button><button class="small" data-spr="en" aria-pressed="false">English</button></div>
  <p class="smal">Välj en melodi. Varje mening blir en rad i melodin.</p>
  <div class="melodier" id="melodier" role="group" aria-label="Välj melodi"></div>
 </div>
 <div class="munrad"><canvas class="mun" aria-hidden="true"></canvas><div class="karaoke" id="karaoke" aria-live="off"></div></div>
 <canvas class="rulle" id="rulle" role="img" aria-label="Tonrulle: tonerna som sjungs ritas som streck. Högre upp är ljusare ton."></canvas>
 <div class="sjungknappar"><button class="knapp primary" id="sjungHela">▶ Låt huvudet sjunga</button><button class="knapp film" id="filmKnapp">🎬 Spela in film</button><button class="knapp" id="borjaOm">↺ Från början</button></div>
 <div class="filmyta" id="filmyta" hidden></div>
 <div class="piano-wrap"><div class="piano" id="piano" role="group" aria-label="Pianotangenter: varje tangent sjunger nästa stavelse"></div></div>
 <p class="hint" id="pianoHint">Tryck på tangenterna, eller använd datorns tangentbord: A S D F G H J K L.</p>
</div>
<div class="flikyta" id="f-beat" role="tabpanel" hidden>
 <p class="lead">Beatbox är trummor med munnen. Titta på munnen: läpparna smäller, tungan klickar och luften väser.</p>
 <div class="takter" id="takter" role="group" aria-label="Välj takt"></div>
 <div class="taktrad"><button class="knapp primary" id="taktSpela">▶ Spela takten</button>
  <label class="tempo">Tempo <input type="range" id="tempo" min="60" max="140" value="96"><output id="tempoV">96</output></label>
  <button class="small" id="taktTom">Töm takten</button></div>
 <div class="munrad"><canvas class="mun" aria-hidden="true"></canvas><div class="natwrap"><div class="nat" id="nat" role="grid" aria-label="Taktens rutnät: ett ljud per rad, ett steg per ruta"></div></div></div>
 <h3>Trumma själv</h3>
 <div class="pads" id="pads"></div>
 <p class="hur" id="hur" aria-live="polite"></p>
</div>
<div class="flikyta" id="f-djur" role="tabpanel" hidden>
 <p class="lead">Djur har också röster, men byggda på andra sätt. Motorn räknar fram ljudet ur djurets kropp. Titta hur luftrören lyser när ljudet går igenom!</p>
 <div class="djur" id="djurval" role="group" aria-label="Välj djur"></div>
 <canvas class="djurcanvas" id="djurcanvas" role="img" aria-label="Djurets luftvägar i genomskärning"></canvas>
 <div class="djurkort" id="djurkort"></div>
</div>
<div class="flikyta" id="f-skola" role="tabpanel" hidden>${SKOLA_HTML}</div>`;

/* ================= SJUNG ================= */
let S={sang:'blinka',spr:'sv',mel:'drom',syl:[],cursor:0,run:null,keys:[],sounding:null,tag:2,tails:[],plan:null,rulle:[]};
const sang=()=>SANGER.find(s=>s.id===S.sang);
const shift=()=>(OKT[A.bodyName]||0)*12;
function sangText(s){return s.egen?($('egenText').value.trim()||'La la la la la la la.'):s.text||demoAv(s.demo).lyrics}
/** sångens noter: demosångerna en stavelse per not (runt igen), egen text fördelad på melodin. */
function gorPlan(){
 const s=sang(),sh=shift();
 if(s.egen){const t=melodi(S.mel);const r=passaSang(t,S.syl,sh);return{notes:r.notes,from:r.from,bpm:t.bpm}}
 const d=demoAv(s.demo),n=Math.max(S.syl.length,d.notes.length),notes=[],from=[];
 for(let i=0;i<n;i++){const [m,b]=d.notes[i%d.notes.length];notes.push({midi:m+sh,beats:b,syl:S.syl[i%S.syl.length]});from.push(i%S.syl.length)}
 return{notes,from,bpm:d.bpm}}
function laddaSang(){
 const s=sang(),spr=s.egen?S.spr:s.spr,text=sangText(s);
 S.syl=spr==='sv'?svStavelser(text):(()=>{try{return A.eng.lyricsToSyllables(text,'en')}catch(e){return []}})();
 if(!S.syl.length)S.syl=[AH];S.cursor=0;S.plan=gorPlan();ritaKaraoke();ritaPiano();
}
function ritaSanger(){
 $('sanger').innerHTML=SANGER.map(s=>`<button class="sangval${s.id===S.sang?' selected':''}" data-sang="${s.id}" aria-pressed="${s.id===S.sang}"><span aria-hidden="true">${s.ikon}</span>${esc(s.namn)}</button>`).join('');
 $('egen').hidden=!sang().egen;
 $('melodier').innerHTML=MELODIER.map(m=>`<button class="sangval${m.id===S.mel?' selected':''}" data-mel="${m.id}" aria-pressed="${m.id===S.mel}"><span aria-hidden="true">${m.ikon}</span>${esc(m.namn)}</button>`).join('');
}
function ritaKaraoke(at=S.cursor){$('karaoke').innerHTML=S.syl.map((s,i)=>`<span class="st${i===at?' nu':''}${i<at?' sjungen':''}">${esc(s.text||'~')}${s.wordEnd?'':'-'}</span>${s.wordEnd?' ':''}${s.phraseEnd?'<br>':''}`).join('')}
const NAMN=['C','C#','D','D#','E','F','F#','G','G#','A','A#','H'],SVART=[1,3,6,8,10],DATOR='asdfghjklöä',DATORS='wetyuop';
const svart=m=>SVART.includes(((m%12)+12)%12);
let pianoLo=60,pianoHi=72;
function ritaPiano(){
 const ms=S.plan.notes.map(n=>n.midi);let lo=Math.min(...ms),hi=Math.max(...ms);
 while(svart(lo))lo--;while(svart(hi))hi++;while(hi-lo<12){hi++;while(svart(hi))hi++}
 pianoLo=lo;pianoHi=hi;const vita=[];for(let m=lo;m<=hi;m++)if(!svart(m))vita.push(m);
 let vi=0,si=0,h='';for(let m=lo;m<=hi;m++){const sv=svart(m),pos=sv?vi:vi++,tk=sv?(DATORS[si++]||''):(DATOR[pos]||''),nm=NAMN[((m%12)+12)%12];
  h+=`<button class="tang ${sv?'svart':'vit'}" data-midi="${m}" style="--i:${pos}" aria-label="Ton ${nm}"><span class="tn">${nm}</span>${tk?`<span class="tk">${tk.toUpperCase()}</span>`:''}</button>`}
 $('piano').style.setProperty('--vita',vita.length);$('piano').innerHTML=h;glod();
}
/** tonen som stavelsen vid markören ska sjungas på */
function nastaTon(){const p=S.plan;if(!p)return null;const k=p.from.indexOf(S.cursor);return k>=0?p.notes[k].midi:null}
function glod(){const n=nastaTon();document.querySelectorAll('#piano .tang').forEach(b=>b.classList.toggle('nasta',!S.run&&n!==null&&+b.dataset.midi===n))}
const klocka=()=>A.clock??0;
async function redo(){if(A.playing&&!A.utterance&&S.aktiv)return true;const ok=await A.aktivera('Rösten sjunger …');if(ok){S.aktiv=true;A.status('Sjung! Varje tangent sjunger nästa stavelse.')}return ok}
let schedId=7e8;
function sched(gs){A.send({type:'schedule',gestures:gs,segments:[],end:0,id:++schedId,replace:false,lead:.006})}
const rel=t=>A.send({type:'release',tag:t});
async function tonPa(midi,el){
 if(S.run)A.stop('Rösten är tyst.');if(!await redo())return;
 S.keys=S.keys.filter(k=>k!==midi).concat(midi);
 const i=S.cursor%S.syl.length,syl=S.syl[i],tag=S.tag;S.tag+=2;
 for(const t of S.tails)rel(t+1);
 const fran=S.sounding;if(fran){rel(fran.tag);rel(fran.tag+1);if(fran.not)fran.not.t1=klocka()}
 try{sched(A.eng.planNoteOn(syl,midi,{body:A.body,vibrato:35,tag,legatoFrom:fran?{syl:fran.syl,midi:fran.midi}:undefined}))}catch(e){console.error(e)}
 const not={midi,t0:klocka(),t1:null,text:syl.text};S.rulle.push(not);if(S.rulle.length>200)S.rulle.splice(0,100);
 S.sounding={midi,syl,tag,not};S.cursor=(i+1)%S.syl.length;
 el?.classList.add('ner');ritaKaraoke(i);glod();
}
function tonAv(midi,el){
 el?.classList.remove('ner');S.keys=S.keys.filter(k=>k!==midi);const s=S.sounding;if(!s||s.midi!==midi)return;
 rel(s.tag);rel(s.tag+1);S.sounding=null;if(s.not)s.not.t1=klocka();
 try{const gs=A.eng.planNoteOff(s.syl,midi,A.body);if(gs.length){const tag=S.tag;S.tag+=2;sched(gs.map(g=>({...g,tag:g.label===A.eng.EXHALE_LABEL?tag+1:tag})));S.tails.push(tag);if(S.tails.length>8)S.tails.shift()}}catch(e){console.error(e)}
 ritaKaraoke();
}
function tystaToner(){if(S.sounding){rel(S.sounding.tag);rel(S.sounding.tag+1);if(S.sounding.not)S.sounding.not.t1=klocka();S.sounding=null}for(const t of S.tails){rel(t);rel(t+1)}S.tails=[];S.keys=[];document.querySelectorAll('#piano .ner').forEach(b=>b.classList.remove('ner'))}
/* ---- hela sången (och filmen) ---- */
let planId=0;
async function sjungHela(film=false){
 if(S.run){A.stop('Sången är slut.');return}
 tystaToner();const p=S.plan,t0=.35,plan=A.eng.planSong(p.notes,{body:A.body,bpm:p.bpm,t0,vibrato:35});
 if(!await A.aktivera(film?'Filmen spelas in …':'Huvudet sjunger …'))return;S.aktiv=false;
 const beat=60/p.bpm;let t=t0;const tider=p.notes.map(x=>{const a=t;t+=x.beats*beat;return [a,t]});
 const id=++planId+5e8;S.run={id,tider,offset:null,from:p.from,midi:p.notes.map(x=>x.midi),text:p.notes.map(x=>x.syl.text),end:plan.end,k:-2};
 A.setUtterance({id,end:null});
 A.send({type:'schedule',id,gestures:plan.gestures,segments:plan.segments,end:plan.end,replace:true});
 $('sjungHela').textContent='■ Sluta sjunga';glod();
 if(film)startaFilm();
}
function stoppaHela(){if(!S.run)return;S.run=null;$('sjungHela').textContent='▶ Låt huvudet sjunga';ritaKaraoke();glod();document.querySelectorAll('#piano .spelas').forEach(b=>b.classList.remove('spelas'));stoppaFilm()}
function tickSang(){
 const r=S.run;if(!r||r.offset===null)return;const t=klocka()-r.offset;let k=-1;while(k+1<r.tider.length&&r.tider[k+1][0]<=t)k++;
 if(k!==r.k){r.k=k;ritaKaraoke(k<0?-1:r.from[k]);document.querySelectorAll('#piano .tang').forEach(b=>b.classList.toggle('spelas',k>=0&&t<r.tider[k][1]&&+b.dataset.midi===r.midi[k]))}
}
/* ---- tonrullen: tonerna som streck som glider åt vänster ---- */
function ritaRulle(){
 const c=$('rulle');if(!c||!c.offsetParent)return;const dpr=Math.min(devicePixelRatio||1,2),w=c.clientWidth,h=c.clientHeight;
 if(c.width!==Math.round(w*dpr)||c.height!==Math.round(h*dpr)){c.width=Math.round(w*dpr);c.height=Math.round(h*dpr)}
 const x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);x.fillStyle='#0c2234';x.fillRect(0,0,w,h);
 const lo=pianoLo-1,hi=pianoHi+1,Y=m=>h-6-(m-lo)/(hi-lo)*(h-12),now=klocka(),pps=Math.max(60,w/7),X=t=>w*.72+(t-now)*pps;
 for(let m=lo;m<=hi;m++){if(svart(m))continue;x.strokeStyle=m%12===0?'rgba(98,160,220,.35)':'rgba(98,160,220,.12)';x.lineWidth=1;x.beginPath();x.moveTo(0,Y(m));x.lineTo(w,Y(m));x.stroke()}
 x.strokeStyle='rgba(255,207,125,.6)';x.beginPath();x.moveTo(w*.72,0);x.lineTo(w*.72,h);x.stroke();
 const ritaNot=(m,a,b,text,farg)=>{const x0=X(a),x1=X(b);if(x1<0||x0>w)return;const y=Y(m);x.fillStyle=farg;x.beginPath();x.roundRect(x0,y-5,Math.max(4,x1-x0-2),10,5);x.fill();
  if(text&&text!=='~'&&x1-x0>14){x.fillStyle='#0c2234';x.font='800 9px "Baloo 2",sans-serif';x.fillText(text.slice(0,6),x0+3,y+3)}};
 const r=S.run;if(r&&r.offset!==null)r.tider.forEach(([a,b],k)=>ritaNot(r.midi[k],r.offset+a,r.offset+b-.02,r.text[k],r.offset+a<=now?'#ffcf7d':'rgba(255,207,125,.35)'));
 for(const n of S.rulle)ritaNot(n.midi,n.t0,n.t1??now,n.text,'#7CF5A6');
}
/* ---- filmen: huvudet, munnen och texten i en stående film med ljudet, sparas bara på enheten ---- */
let F=null;
function filmTyp(){if(!window.MediaRecorder)return null;for(const t of ['video/mp4;codecs=avc1,mp4a.40.2','video/mp4','video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'])if(MediaRecorder.isTypeSupported(t))return t;return null}
function startaFilm(){
 const typ=filmTyp(),ljud=A.ljudStrom();if(!typ||!ljud){A.status('Den här webbläsaren kan inte spela in film. Prova Chrome eller Safari.',true);return}
 const c=document.createElement('canvas');c.width=540;c.height=960;const ctx=c.getContext('2d');
 const strom=new MediaStream([...c.captureStream(30).getVideoTracks(),...ljud.getAudioTracks()]);
 const rec=new MediaRecorder(strom,{mimeType:typ,videoBitsPerSecond:2500000});const bitar=[];rec.ondataavailable=e=>{if(e.data.size)bitar.push(e.data)};
 rec.onstop=()=>{const blob=new Blob(bitar,{type:typ.split(';')[0]});visaFilm(blob,typ)};
 F={c,ctx,rec};rec.start(500);$('filmKnapp').textContent='⏺ Spelar in …';$('filmKnapp').disabled=true;
}
function ritaFilmruta(){
 if(!F)return;const {c,ctx}=F,W=c.width,H=c.height;const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0c2234');g.addColorStop(1,'#1D2B53');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 ctx.textAlign='center';ctx.fillStyle='#ffcf7d';ctx.font='800 34px "Baloo 2",sans-serif';ctx.fillText(sang().egen?($('egenText').value.trim().split(/[.!?\n]/)[0]||'Min sång').slice(0,28):sang().namn,W/2,70);
 const hv=A.huvud;if(hv&&hv.width){const s=Math.min((W-40)/hv.width,560/hv.height);const w=hv.width*s,h=hv.height*s;ctx.drawImage(hv,(W-w)/2,100,w,h)}
 const mun=document.querySelector('#f-sjung canvas.mun');if(mun&&mun.width){const h=170,w=mun.width/mun.height*h;ctx.drawImage(mun,W-w-24,560,w,h)}
 // texten: stavelsen som sjungs nu i gult, resten av raden runt omkring
 const r=S.run,k=r&&r.k>=0?r.from[r.k]:-1;
 if(k>=0){let a=k;while(a>0&&!S.syl[a-1].phraseEnd)a--;let b=k;while(b<S.syl.length-1&&!S.syl[b].phraseEnd)b++;
  const delar=S.syl.slice(a,b+1).map((s,i)=>({t:(s.text||'~')+(s.wordEnd?' ':'-'),nu:a+i===k}));ctx.font='800 40px "Baloo 2",sans-serif';
  const rader=[[]];let bredd=0;for(const d of delar){const dw=ctx.measureText(d.t).width;if(bredd+dw>W-60&&rader[rader.length-1].length){rader.push([]);bredd=0}rader[rader.length-1].push(d);bredd+=dw}
  rader.forEach((rad,ri)=>{const tot=rad.reduce((s,d)=>s+ctx.measureText(d.t).width,0);let x=(W-tot)/2;ctx.textAlign='left';for(const d of rad){ctx.fillStyle=d.nu?'#ffcf7d':'#e0f4ff';ctx.fillText(d.t,x,800+ri*52);x+=ctx.measureText(d.t).width}})}
 ctx.textAlign='center';ctx.fillStyle='#9fb8d0';ctx.font='700 22px "Baloo 2",sans-serif';ctx.fillText('Pluggparken · Röstlabbet',W/2,H-30);
}
function stoppaFilm(){if(!F)return;const f=F;F=null;try{if(f.rec.state!=='inactive')f.rec.stop()}catch(e){}$('filmKnapp').textContent='🎬 Spela in film';$('filmKnapp').disabled=false}
function visaFilm(blob,typ){
 const url=URL.createObjectURL(blob),ext=typ.includes('mp4')?'mp4':'webm',yta=$('filmyta');
 yta.innerHTML=`<video controls playsinline src="${url}"></video><div><p><b>Din film är klar!</b> Den finns bara på den här enheten.</p><a class="knapp primary" href="${url}" download="rostlabbet-sang.${ext}">💾 Spara filmen</a> <button class="knapp" id="filmBort">Ta bort</button></div>`;
 yta.hidden=false;$('filmBort').onclick=()=>{URL.revokeObjectURL(url);yta.innerHTML='';yta.hidden=true};
}

/* ================= BEATBOX ================= */
const LJUDNAMN={B:['Bastrumma','🥁','Läpparna smäller upp. Struphuvudet trycker ut luften.'],t:['Hi-hat','🔔','Tungspetsen släpper och det väser kort.'],tss:['Öppen hi-hat','🌬️','Som hi-hat, men väsandet får fortsätta.'],
 Pf:['Virvel','💥','Läpparna smäller och sedan väser underläppen mot tänderna.'],K:['Kantslag','🪵','Bakre delen av tungan smäller.'],'^K':['Inandad virvel','😮‍💨','Ett snabbt andetag in förbi tungan.'],
 '!':['Tungklick','👅','Tungan suger fast och smäller loss.'],'P!':['Läppknäpp','💋','Stängda läppar, käken går ner och läpparna poppar upp.'],kch:['Cymbal','🔊','Bakre tungan släpper ut ett långt väsande.'],m:['Brum','🎵','En brummande baston genom näsan.']};
const TAKTNAMN={'Boots and cats':'Boots and cats','Four on the floor':'Fyra på golvet','Breakbeat':'Breakbeat','Rimshot shuffle':'Kantslag-shuffle','Inward snare':'Inandad virvel','Clicks and pops':'Klick och knäpp','Hum bass':'Brumbas'};
let B={takt:null,steg:[],spelar:false,bpm:96,swing:0};
function ritaTakter(){$('takter').innerHTML=A.eng.BEAT_PRESETS.map(p=>`<button class="small${p.name===B.takt?' selected':''}" data-takt="${esc(p.name)}" aria-pressed="${p.name===B.takt}">${esc(TAKTNAMN[p.name]||p.name)}</button>`).join('')}
function valjTakt(namn){const p=A.eng.BEAT_PRESETS.find(x=>x.name===namn);if(!p)return;B.takt=namn;B.steg=A.eng.parseBeat(p.text);B.bpm=p.bpm;B.swing=p.swing;$('tempo').value=p.bpm;$('tempoV').textContent=p.bpm;
 ritaTakter();ritaNat();if(B.spelar)A.send({type:'beat',steps:B.steg,bpm:B.bpm,swing:B.swing,preset:namn,playing:true})}
function ritaNat(){
 const n=B.steg.length;$('nat').style.setProperty('--n',n);
 $('nat').innerHTML=A.eng.BEAT_SOUNDS.map(s=>{const nm=LJUDNAMN[s.id]||[s.name,'🔈'];
  return `<span class="radnamn" title="${esc(nm[0])}" aria-hidden="true">${nm[1]}</span>`+B.steg.map((st,i)=>`<button class="ruta${st&&st.id===s.id?' på':''}${i%4===0?' slag':''}" data-r="${esc(s.id)}" data-i="${i}" aria-label="${esc(nm[0])}, steg ${i+1}" aria-pressed="${!!(st&&st.id===s.id)}"></button>`).join('')}).join('');
}
function ritaPads(){$('pads').innerHTML=A.eng.BEAT_SOUNDS.map((s,i)=>{const n=LJUDNAMN[s.id]||[s.name,'🔈',s.hint];return `<button class="pad" data-pad="${esc(s.id)}"><span class="pe" aria-hidden="true">${n[1]}</span><b>${esc(n[0])}</b><small>${(i+1)%10}</small></button>`}).join('')}
async function beatPa(){if(!await A.aktivera('Beatbox …'))return false;B.aktiv=true;A.förstärk(3);A.setArtic(A.eng.beatReady(A.body));return true}
async function spelaTakt(){
 if(B.spelar){A.stop('Takten har slutat.');return}
 if(!await beatPa())return;
 B.spelar=true;A.send({type:'beat',steps:B.steg,bpm:B.bpm,swing:B.swing,preset:B.takt,playing:true});$('taktSpela').textContent='■ Stoppa takten';A.status('Titta på munnen när takten spelar!');
}
async function pad(id){const n=LJUDNAMN[id];$('hur').innerHTML=n?`<b>${n[1]} ${esc(n[0])}:</b> ${esc(n[2])}`:'';
 if(!B.aktiv&&!await beatPa())return;A.send({type:'beatHit',id})}
function tickBeat(){const s=A.tele?.beatStep??-1;if(s===B.ss)return;B.ss=s;document.querySelectorAll('#nat .ruta').forEach(b=>b.classList.toggle('nu',+b.dataset.i===s))}

/* ================= DJUREN ================= */
const DJUR={songbird:{namn:'Sångfågel',e:'🐦',om:'Fågeln har två små röstläppar, en i varje luftrör. De kan sjunga två toner samtidigt!'},
 seal:{namn:'Weddellsäl',e:'🦭',om:'Sälen kan glida från ljusa toner ner till så mörka att de nästan inte hörs. Under isen låter det som rymdljud.'},
 alligator:{namn:'Alligator',e:'🐊',om:'Alligatorn ryter med stängd mun. Hela kroppen skakar, och vattnet ovanpå ryggen börjar dansa.'},
 elephant:{namn:'Elefant',e:'🐘',om:'Elefanten mullrar så djupt att vi inte kan höra det (infraljud). Andra elefanter känner det genom marken! Den trumpetar genom snabeln.'}};
const LATE={flute:'Flöjtsång',trill:'Drill',chirps:'Kvitterkaskad',buzz:'Surr',zap:'Laserzapp',whistle:'Vissling',chug:'Grymtning',bellow:'Vrål',growl:'Morrning',hiss:'Väsning',dance:'Vattendans',rumble:'Mullrande',trumpet:'Trumpetande',squeak:'Pip'};
const KALLA={left:'Vänster röst',right:'Höger röst',glottis:'Stämbanden',lips:'Snabelns ventil'};
const LAG=new Set(['alligator:bellow','alligator:dance','alligator:growl','elephant:rumble','seal:chug']);  // så låga att små högtalare inte återger dem
let D={id:'elephant',horbart:true,aktiv:false,senast:0};
function ritaDjurval(){
 $('djurval').innerHTML=A.eng.CREATURES.map(c=>{const d=DJUR[c.id]||{namn:c.name,e:'🐾'};return `<button class="djurval${c.id===D.id?' selected':''}" data-djur="${c.id}" aria-pressed="${c.id===D.id}"><span aria-hidden="true">${d.e}</span>${esc(d.namn)}</button>`}).join('');
 const c=A.eng.creatureById(D.id),d=DJUR[D.id]||{namn:c.name,e:'🐾',om:c.blurb},lag=c.calls.some(k=>LAG.has(D.id+':'+k.id));
 $('djurkort').innerHTML=`<h3>${d.e} ${esc(d.namn)} <small>${esc(c.latin||'')}</small></h3><p>${esc(d.om)}</p>
  <div class="laten">${c.calls.map(k=>`<button class="knapp" data-late="${k.id}" title="${esc(k.hint)}">▶ ${esc(LATE[k.id]||k.name)}</button>`).join('')}</div>
  ${lag?`<label class="horbart"><input type="checkbox" id="horbart" ${D.horbart?'checked':''}> Gör de lägsta ljuden hörbara <small>Det riktiga ljudet är för lågt för våra öron och för små högtalare. Då spelar vi det högre upp.</small></label>`:''}`;
}
async function late(id){
 const c=A.eng.creatureById(D.id),k=c.calls.find(x=>x.id===id);if(!k)return;
 if(!D.aktiv){if(!await A.aktivera('Djuret gör sig redo …'))return;A.send({type:'creature',id:D.id});D.aktiv=true}
 let pitch;const pp=c.params.find(p=>p.role==='pitch');
 if(D.horbart&&LAG.has(D.id+':'+id)&&k.pitchRef&&pp)pitch=Math.min(pp.max,k.pitchRef*4);
 A.send({type:'call',id,pitch,amp:1});A.status(`${DJUR[D.id]?.e||''} ${LATE[id]||k.name}!`);
}
let forra=0;
function tickDjur(t){
 const c=$('djurcanvas');if(!c||!c.offsetParent)return;const def=A.eng.creatureById(D.id);if(!def)return;
 const ct=A.ctele?.t,live=D.aktiv&&ct&&ct.id===D.id?ct:null;let prev=null;if(!live){try{prev=A.eng.creaturePreview(D.id)}catch(e){}}
 const dt=Math.min(.05,(t-forra)/1000||.03);forra=t;ritaDjur(c,def,live,prev,dt,KALLA);
}

/* ================= START ================= */
function visaFlik(f){
 if(flik===f)return;
 if(flik)A.stop('Rösten är tyst.');
 flik=f;document.querySelectorAll('.flik').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.flik===f)));
 for(const x of ['sjung','beat','djur','skola'])$('f-'+x).hidden=x!==f;
 try{sessionStorage.setItem('rost-flik',f)}catch(e){}
}
export function init(api){
 A=api;const host=$('scen');if(!host)return;host.innerHTML=HTML;host.hidden=false;
 // Tyst (knappen, Escape, flikbyte, ljudet av) stoppar allt här också
 A.vidStopp(()=>{stoppaHela();tystaToner();S.aktiv=false;
  if(B.spelar||B.aktiv){A.send({type:'beat',playing:false});B.spelar=false;B.aktiv=false;$('taktSpela').textContent='▶ Spela takten'}
  if(D.aktiv){A.send({type:'stopCall'});A.send({type:'creature',id:'human'});D.aktiv=false}});
 A.lyssna(m=>{if(m.type==='planned'&&S.run&&m.id===S.run.id)S.run.offset=m.t0});
 // sjung
 ritaSanger();laddaSang();
 $('sanger').onclick=e=>{const b=e.target.closest('[data-sang]');if(!b)return;A.stop('Rösten är tyst.');S.sang=b.dataset.sang;ritaSanger();laddaSang()};
 $('melodier').onclick=e=>{const b=e.target.closest('[data-mel]');if(!b)return;A.stop('Rösten är tyst.');S.mel=b.dataset.mel;ritaSanger();laddaSang()};
 let vanta=0;$('egenText').oninput=()=>{clearTimeout(vanta);vanta=setTimeout(laddaSang,250)};
 document.querySelector('#f-sjung .sprak').onclick=e=>{const b=e.target.closest('[data-spr]');if(!b)return;S.spr=b.dataset.spr;document.querySelectorAll('#f-sjung [data-spr]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});laddaSang()};
 $('sjungHela').onclick=()=>sjungHela(false);$('filmKnapp').onclick=()=>{if(S.run)A.stop('Rösten är tyst.');sjungHela(true)};
 $('borjaOm').onclick=()=>{S.cursor=0;ritaKaraoke();glod()};
 const piano=$('piano');
 piano.addEventListener('pointerdown',e=>{const b=e.target.closest('.tang');if(!b)return;e.preventDefault();b.dataset.pid=e.pointerId;tonPa(+b.dataset.midi,b)});
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
 $('taktTom').onclick=()=>{B.steg=B.steg.map(()=>null);B.takt=null;ritaTakter();ritaNat();A.send({type:'beat',steps:B.steg,preset:null})};
 $('tempo').oninput=()=>{B.bpm=+$('tempo').value;$('tempoV').textContent=B.bpm;if(B.spelar)A.send({type:'beat',bpm:B.bpm})};
 $('pads').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-pad]');if(!b)return;e.preventDefault();b.classList.add('slag');setTimeout(()=>b.classList.remove('slag'),140);pad(b.dataset.pad)});
 $('nat').onclick=e=>{const b=e.target.closest('.ruta');if(!b)return;const i=+b.dataset.i,id=b.dataset.r,s=B.steg[i];B.steg[i]=s&&s.id===id?null:{id};B.takt=null;ritaTakter();ritaNat();A.send({type:'beat',steps:B.steg,preset:null});
  if(!B.spelar&&B.steg[i]){const n=LJUDNAMN[id];$('hur').innerHTML=n?`<b>${n[1]} ${esc(n[0])}:</b> ${esc(n[2])}`:''}};
 addEventListener('keydown',e=>{if(flik!=='beat'||e.repeat||!/^[0-9]$/.test(e.key))return;const a=document.activeElement;if(a&&/^(INPUT|TEXTAREA)$/.test(a.tagName)&&a.type!=='range')return;const i=(+e.key+9)%10,s=A.eng.BEAT_SOUNDS[i];if(s){e.preventDefault();pad(s.id)}});
 // djur
 ritaDjurval();
 $('djurval').onclick=e=>{const b=e.target.closest('[data-djur]');if(!b)return;if(D.aktiv)A.stop('Rösten är tyst.');D.id=b.dataset.djur;ritaDjurval()};
 $('djurkort').addEventListener('click',e=>{const b=e.target.closest('[data-late]');if(b)late(b.dataset.late)});
 $('djurkort').addEventListener('change',e=>{if(e.target.id==='horbart')D.horbart=e.target.checked});
 // ljudskolan
 initSkola(A);
 // flikar
 host.querySelector('.flikar').onclick=e=>{const b=e.target.closest('[data-flik]');if(b)visaFlik(b.dataset.flik)};
 let f='sjung';try{f=sessionStorage.getItem('rost-flik')||'sjung'}catch(e){}visaFlik(['sjung','beat','djur','skola'].includes(f)?f:'sjung');
 // rösttyp ändrar sångens läge
 document.querySelectorAll('[data-body]').forEach(b=>b.addEventListener('click',()=>setTimeout(laddaSang,0)));
 (function loop(t){requestAnimationFrame(loop);if(document.hidden)return;
  if(flik==='sjung'){tickSang();ritaRulle();ritaFilmruta();if(F&&S.run&&S.run.offset!==null&&klocka()-S.run.offset>S.run.end+.6)A.stop('Filmen är klar!')}
  if(flik==='beat')tickBeat();if(flik==='djur')tickDjur(t);if(flik==='skola')ritaVokalkarta()})(0);
 window.__scen={get S(){return S},get B(){return B},get D(){return D},get F(){return F},visaFlik,tonPa,tonAv,sjungHela,spelaTakt,pad,late,svStavelser,passaSang,melodi};
}
