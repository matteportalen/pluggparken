/* Pianorullen för BAS och LEAD (nov 2026). Spelar med syntens ljud (PPSyntLjud).
   Datamodell: S.rl = {len:[takter bas, takter lead], lock:1, snd:[ljud bas, ljud lead], pat:[8 mönster][2 spår][noter]}
   En not är [start, längd, ton]: start och längd i sextondelar (0 till len*16), ton i halvtoner över spårets grundton
   (bas C2, lead C4, plus tonarten). Noterna följer alltså tonarten. */
(()=>{'use strict';
const L=window.PPSyntLjud;
const BASE=[36,60],SPAN=24,MAXN=256,LENS=[1,2,4];
const NAMN=['BAS','LEAD'],STD=['djupbas','elpiano'];
const MAKRO=[['color','KLANG'],['cut','FILTER'],['motion','RÖRELSE'],['space','RYMD']];
const ljudLista=()=>L.sounds.filter(s=>!['slagverk','rostklipp','samplepaket'].includes(s.module)&&!s.arp);
const sndFran=id=>{const s=L.sounds.find(x=>x.id===id)||ljudLista()[0];return{soundId:s.id,module:s.module,preset:s.preset||0,params:{...s.params}}};
const fresh=()=>({len:[1,1],lock:1,snd:[sndFran(STD[0]),sndFran(STD[1])],pat:Array.from({length:8},()=>[[],[]])});
const heltal=(v,a,b)=>Math.max(a,Math.min(b,Math.round(+v)||0));
function rensaNoter(a,len,lo=0,hi=SPAN){if(!Array.isArray(a))return[];const max=len*16,ut=[];
  for(const q of a){if(!Array.isArray(q)||q.length<3||!q.every(v=>Number.isFinite(+v)))continue;const s=heltal(q[0],0,max-1),l=heltal(q[1],1,max-s),n=heltal(q[2],lo,hi);ut.push(+q[3]?[s,l,n,1]:[s,l,n]);if(ut.length>=MAXN)break}
  return ut.sort((x,y)=>x[0]-y[0]||x[2]-y[2])}
function rensaLjud(raw,m){const s=raw&&ljudLista().find(x=>x.id===raw.soundId);if(!s)return sndFran(STD[m]);const p={...L.defaults};
  if(raw.params&&typeof raw.params==='object')for(const k in L.defaults)if(Number.isFinite(+raw.params[k]))p[k]=L.clamp(+raw.params[k],0,k==='trim'?200:100);
  return{soundId:s.id,module:s.module,preset:s.preset||0,params:p}}
function clean(raw){const o=fresh();if(!raw||typeof raw!=='object')return o;
  if(Array.isArray(raw.len))o.len=[0,1].map(m=>LENS.includes(+raw.len[m])?+raw.len[m]:1);
  o.lock=raw.lock===0?0:1;if(Array.isArray(raw.snd))o.snd=[0,1].map(m=>rensaLjud(raw.snd[m],m));
  if(Array.isArray(raw.pat))for(let p=0;p<8;p++){const q=raw.pat[p];if(Array.isArray(q))o.pat[p]=[0,1].map(m=>rensaNoter(q[m],o.len[m]))}
  return o}
const harNoter=rl=>!!rl&&rl.pat.some(p=>p.some(t=>t.length));
/* gamla strängar (16 eller 32 tecken, hexsiffra = skalrad, _ = tonen fortsätter) till noter; används av förslag, slump och låtgeneratorn */
function franStrang(str,semi){const ut=[];if(!str)return ut;for(let Lr=0;Lr<2;Lr++)for(let k=0;k<16;k++){const c=str[16*Lr+k];if(c===undefined||c==='.'||c==='_')continue;let n=1;while(k+n<16&&str[16*Lr+k+n]==='_')n++;ut.push([k,n,Math.max(0,Math.min(SPAN,semi(parseInt(c,16))))])}return ut}
/* byter skala: noter på skalans steg flyttas till samma steg i den nya skalan */
function bytSkala(rl,fran,till){if(!fran||!till)return;rl.pat.forEach(p=>p.forEach(t=>t.forEach(q=>{const o=Math.floor(q[2]/12),i=fran.indexOf(q[2]%12);if(i>=0)q[2]=Math.min(SPAN,o*12+till[i])})))}
/* rensar överlapp på samma rad efter en ändring: noten i har företräde */
function rensaOverlapp(t,i){const a=t[i];if(!a)return t;const e=a[0]+a[1];
  return t.filter((q,j)=>j===i||q[2]!==a[2]||q[0]+q[1]<=a[0]||q[0]>=e||(q[0]<a[0]&&(q[1]=a[0]-q[0],true)))}

/* ---------- ljud ---------- */
const motorer=new WeakMap();
function motor(c,ut,m,snd,bpm){let map=motorer.get(c);if(!map){map=[];motorer.set(c,map)}const sig=snd.soundId+':'+JSON.stringify(snd.params)+':'+bpm;let e=map[m];
  if(!e||e.sig!==sig||e.ut!==ut){if(e){try{e.audio.allOff();e.audio.stang()}catch(_){}try{e.g.disconnect()}catch(_){}}const g=c.createGain();g.connect(ut);e={sig,ut,g,audio:L.create(c,{ut:g,module:snd.module,params:snd.params,bpm,limit:m?6:3})};map[m]=e}
  return e}
function spela(c,ut,m,snd,bpm,midi,t,dur,vol){const e=motor(c,ut,m,snd,bpm);e.g.gain.value=vol;e.audio.noteOn(midi,.85,t,dur)}
function tysta(c){const map=c&&motorer.get(c);if(map)map.forEach(e=>{try{e&&e.audio.allOff()}catch(_){}})}

/* ---------- rutnätet (används av BAS/LEAD och av syntens spår) ----------
   gh: notes() = noternas lista (ändras på plats), steps(), rows() = tonvärden uppifrån, namn(v), rot(v), roll(v),
   preview(v), change(), toast(t). Tonvärdet ligger på plats 2 i varje not, tolkningen (halvtoner eller midi) är värdens. */
function rutnat(el,gh){
  el.innerHTML='<div class="rl-wrap"><div class="rl-grid"><div class="rl-rader"></div><div class="rl-noter"></div><div class="rl-ph"></div></div></div>';
  const wrap=el.querySelector('.rl-wrap'),grid=el.querySelector('.rl-grid'),rader=el.querySelector('.rl-rader'),noter=el.querySelector('.rl-noter'),ph=el.querySelector('.rl-ph');
  let rows=[],cw=24,rh=20,LW=40,drag=null,vantar=0;
  const fin=()=>matchMedia('(pointer:fine)').matches,lista=()=>gh.notes(),steg=()=>gh.steps();
  function rita(){const st=steg();rows=gh.rows();
    if(!wrap.clientWidth&&!vantar){vantar=1;requestAnimationFrame(()=>{vantar=0;if(wrap.clientWidth)rita()})}
    const W=wrap.clientWidth||600;rh=fin()?20:24;LW=fin()?44:40;cw=Math.max(fin()?18:26,Math.floor((W-LW-2)/Math.min(st,32)));
    grid.style.width=(LW+st*cw)+'px';grid.style.height=(rows.length*rh)+'px';grid.style.setProperty('--cw',cw+'px');grid.style.setProperty('--rh',rh+'px');grid.style.setProperty('--lw',LW+'px');
    rader.innerHTML=rows.map((v,i)=>{const r=gh.roll(v);return`<div class="rl-rad${gh.rot(v)?' rot':''}${r?' ct':''}" style="top:${i*rh}px"><span>${gh.namn(v)}${r?`<i>${r}</i>`:''}</span></div>`}).join('');
    noter.innerHTML=lista().map((q,i)=>{const ri=rows.indexOf(q[2]);if(ri<0||q[0]>=st)return'';return`<div class="rl-not" data-i="${i}" style="left:${LW+q[0]*cw+1}px;top:${ri*rh+1}px;width:${Math.min(q[1],st-q[0])*cw-2}px;height:${rh-2}px"><i class="rl-h" data-h="${i}"></i></div>`}).join('')}
  function cell(e){const r=grid.getBoundingClientRect();return{k:Math.floor((e.clientX-r.left-LW)/cw),ri:Math.floor((e.clientY-r.top)/rh)}}
  const klampK=(k,l)=>Math.max(0,Math.min(steg()-(l||1),k)),klampR=ri=>Math.max(0,Math.min(rows.length-1,ri)),full=()=>{if(lista().length>=MAXN){gh.toast('Det får plats högst '+MAXN+' toner');return true}return false};
  grid.addEventListener('pointerdown',e=>{if(e.button>0)return;const c=cell(e);if(c.k<0)return;const t=lista(),h=e.target.closest('.rl-h'),nt=e.target.closest('.rl-not');
    if(h||nt){const i=+(h?h.dataset.h:nt.dataset.i),q=t[i];if(!q)return;e.preventDefault();grid.setPointerCapture(e.pointerId);
      drag={typ:h?'lang':'flytt',ny:false,i,id:e.pointerId,k0:c.k,r0:c.ri,s0:q[0],ri0:rows.indexOf(q[2]),flyttad:false};return}
    if(c.ri<0||c.ri>=rows.length||c.k>=steg())return;
    if(e.pointerType==='touch'){drag={typ:'vanta',id:e.pointerId,c,x:e.clientX,y:e.clientY};return}
    e.preventDefault();grid.setPointerCapture(e.pointerId);if(full())return;
    t.push([c.k,1,rows[c.ri]]);gh.preview(rows[c.ri]);drag={typ:'lang',i:t.length-1,id:e.pointerId,ny:true,flyttad:true};gh.change()});
  grid.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const t=lista();
    if(drag.typ==='vanta'){if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>10)drag=null;return}
    const q=t[drag.i];if(!q)return;const c=cell(e);
    if(drag.typ==='lang'){const l=Math.max(1,Math.min(steg()-q[0],c.k-q[0]+1));if(l!==q[1]){q[1]=l;drag.flyttad=true;gh.change()}return}
    const dk=c.k-drag.k0,dr=c.ri-drag.r0;if(!dk&&!dr&&!drag.flyttad)return;
    const s=klampK(drag.s0+dk,q[1]),v=rows[klampR(drag.ri0+dr)];if(s!==q[0]||v!==q[2]){if(v!==q[2])gh.preview(v);q[0]=s;q[2]=v;gh.change()}drag.flyttad=true});
  const slut=e=>{if(!drag||e.pointerId!==drag.id)return;const d=drag;drag=null;const t=lista();
    if(e.type==='pointercancel'){if(d.typ!=='vanta')gh.change();return}
    if(d.typ==='vanta'){if(full())return;t.push([d.c.k,1,rows[d.c.ri]]);gh.preview(rows[d.c.ri]);gh.change();return}
    if(!d.flyttad&&!d.ny){t.splice(d.i,1);gh.change();return}
    const ny=rensaOverlapp(t,d.i);t.length=0;ny.forEach(q=>t.push(q));t.sort((x,y)=>x[0]-y[0]||x[2]-y[2]);gh.change()};
  grid.addEventListener('pointerup',slut);grid.addEventListener('pointercancel',slut);
  let rsz=0;addEventListener('resize',()=>{clearTimeout(rsz);rsz=setTimeout(rita,120)});
  return{rita,borjan(){wrap.scrollLeft=0},markera(st){if(st==null||st<0){ph.style.display='none';return}ph.style.display='block';ph.style.left=(LW+st*cw)+'px';ph.style.width=cw+'px'}}}

/* ---------- BAS och LEAD: rutnät plus ljud, rattar och knappar ---------- */
function spar(el,m,host){
  const ljud=ljudLista();
  el.className='rl-spar';el.dataset.rlspar=m;
  el.innerHTML=`<div class="rl-ctrl"><b class="rl-nam">${NAMN[m]}</b>
    <div class="rl-ljud"><button type="button" class="rl-pil" data-rlsnd="-1" aria-label="Föregående ljud">◀</button><select class="sel" data-rlsel aria-label="Ljud för ${NAMN[m].toLowerCase()}">${ljud.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select><button type="button" class="rl-pil" data-rlsnd="1" aria-label="Nästa ljud">▶</button></div>
    <div class="rl-mak">${MAKRO.map(([k,n])=>`<span class="rl-fx"><div class="knob liten" data-rlk="${k}" role="slider" tabindex="0" aria-label="${n} ${NAMN[m].toLowerCase()}"><div class="kap"></div></div><small>${n}</small></span>`).join('')}
      <span class="rl-fx"><div class="knob liten" data-rlvol role="slider" tabindex="0" aria-label="Volym ${NAMN[m].toLowerCase()}"><div class="kap"></div></div><small>VOLYM</small></span></div>
    <div class="rl-knappar"><button type="button" class="sm" data-rlm aria-label="Tysta ${NAMN[m].toLowerCase()}" title="Tysta ${NAMN[m].toLowerCase()}">M</button>
    <div class="kit rl-len" role="group" aria-label="Antal takter">${LENS.map(n=>`<button type="button" data-rllen="${n}">${n}</button>`).join('')}</div><span class="rl-lenl">TAKTER</span>
    <button type="button" class="lilla rl-fors" data-rlfors title="Låt datorn föreslå en ${m?'melodi':'basgång'} som passar ackorden">💡 FÖRESLÅ</button><button type="button" class="lilla" data-rltom title="Ta bort alla toner i ${NAMN[m].toLowerCase()} i det här mönstret">TÖM</button></div></div>
    <div class="rl-yta"></div>`;
  const S=()=>host.S(),rl=()=>S().rl,snd=()=>rl().snd[m];
  const g=rutnat(el.querySelector('.rl-yta'),{notes:()=>rl().pat[host.cur()][m],steps:()=>rl().len[m]*16,rows:()=>host.rows(m),namn:v=>host.namn(m,v),rot:v=>host.rot(v),roll:v=>host.roll(m,v),preview:v=>host.preview(m,v),change:()=>host.change(),toast:t=>host.toast(t)});
  const knobs=MAKRO.map(([k])=>host.knob(el.querySelector(`[data-rlk="${k}"]`),{min:0,max:100,reset:(L.sounds.find(s=>s.id===snd().soundId)||{params:L.defaults}).params[k],val:()=>snd().params[k],set:v=>{snd().params[k]=v;host.change()}}));
  const kvol=host.knob(el.querySelector('[data-rlvol]'),{min:0,max:100,reset:m?70:85,val:()=>S().mvol[m],set:v=>{S().mvol[m]=v;host.change()}});
  function rita(){g.rita();el.querySelector('[data-rlsel]').value=snd().soundId;
    el.querySelectorAll('[data-rllen]').forEach(b=>b.classList.toggle('on',+b.dataset.rllen===rl().len[m]));
    el.querySelector('[data-rlm]').classList.toggle('on',!!S().mmute[m]);knobs.forEach(u=>u());kvol()}
  el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const r=rl();
    if(b.dataset.rlsnd){const i=ljud.findIndex(s=>s.id===snd().soundId),n=ljud.length,j=((i<0?0:i)+ +b.dataset.rlsnd+n)%n;r.snd[m]=sndFran(ljud[j].id);host.preview(m,m?12:0,.5);host.change();return}
    if(b.dataset.rllen){const n=+b.dataset.rllen;if(n===r.len[m])return;const bort=kortaAlla(r.pat.map(p=>p[m]),r.len[m],n);r.len[m]=n;host.change();rita();g.borjan();if(bort)host.toast('Tonerna efter takt '+n+' togs bort · ↶ ångrar');return}
    if(b.dataset.rlm!==undefined){S().mmute[m]=!S().mmute[m];host.change();return}
    if(b.dataset.rlfors!==undefined){host.forslag(m);return}
    if(b.dataset.rltom!==undefined){const t=rl().pat[host.cur()][m];if(!t.length)return;t.length=0;host.change();host.toast(NAMN[m]+' är tömd · ↶ ångrar')}});
  el.querySelector('[data-rlsel]').addEventListener('change',e=>{rl().snd[m]=sndFran(e.target.value);host.preview(m,m?12:0,.5);host.change()});
  return{rita,mark(bar,k){if(k<0||bar==null){g.markera(-1);return}const L=rl().len[m];g.markera(((bar%L)+L)%L*16+k)}}}
/* kortar listor av noter till n takter; svarar om något togs bort */
function kortaAlla(listor,fore,n){let bort=false;listor.forEach(t=>{const ny=t.filter(q=>q[0]<n*16);if(ny.length<t.length)bort=true;t.length=0;ny.forEach(q=>{if(q[0]+q[1]>n*16){q[1]=n*16-q[0];bort=true}t.push(q)})});return bort}

window.PPRulle={fresh,clean,harNoter,franStrang,bytSkala,spela,tysta,spar,rutnat,kortaAlla,rensaNoter,BASE,SPAN,LENS,NAMN,ljudLista,sndFran};
})();
