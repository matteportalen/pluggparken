/* Pianorullen (nov 2026): rutnätet som syntens instrumentspår (BAS, LEAD, spår 3 och 4) skrivs i.
   En not är [start, längd, ton, utan arpeggio]: start och längd i sextondelar (0 till takter*16), ton som midi.
   Används av synt.js (rutnat, rensaNoter, kortaAlla, LENS) och index.html (franStrang för förslag, slump och låtgeneratorn). */
(()=>{'use strict';
const SPAN=24,MAXN=256,LENS=[1,2,4];
const heltal=(v,a,b)=>Math.max(a,Math.min(b,Math.round(+v)||0));
function rensaNoter(a,len,lo=0,hi=SPAN){if(!Array.isArray(a))return[];const max=len*16,ut=[];
  for(const q of a){if(!Array.isArray(q)||q.length<3||!q.every(v=>Number.isFinite(+v)))continue;const s=heltal(q[0],0,max-1),l=heltal(q[1],1,max-s),n=heltal(q[2],lo,hi);ut.push(+q[3]?[s,l,n,1]:[s,l,n]);if(ut.length>=MAXN)break}
  return ut.sort((x,y)=>x[0]-y[0]||x[2]-y[2])}
/* skalsträngar (16 eller 32 tecken, hexsiffra = skalrad, _ = tonen fortsätter) till noter med halvtoner över grundtonen */
function franStrang(str,semi){const ut=[];if(!str)return ut;for(let Lr=0;Lr<2;Lr++)for(let k=0;k<16;k++){const c=str[16*Lr+k];if(c===undefined||c==='.'||c==='_')continue;let n=1;while(k+n<16&&str[16*Lr+k+n]==='_')n++;ut.push([k,n,Math.max(0,Math.min(SPAN,semi(parseInt(c,16))))])}return ut}
/* rensar överlapp på samma rad efter en ändring: noten i har företräde */
function rensaOverlapp(t,i){const a=t[i];if(!a)return t;const e=a[0]+a[1];
  return t.filter((q,j)=>j===i||q[2]!==a[2]||q[0]+q[1]<=a[0]||q[0]>=e||(q[0]<a[0]&&(q[1]=a[0]-q[0],true)))}
/* kortar listor av noter till n takter; svarar om något togs bort */
function kortaAlla(listor,fore,n){let bort=false;listor.forEach(t=>{const ny=t.filter(q=>q[0]<n*16);if(ny.length<t.length)bort=true;t.length=0;ny.forEach(q=>{if(q[0]+q[1]>n*16){q[1]=n*16-q[0];bort=true}t.push(q)})});return bort}

/* ---------- rutnätet ----------
   gh: notes() = noternas lista (ändras på plats), steps(), rows() = tonvärden uppifrån, namn(v), rot(v), roll(v),
   preview(v), change(), toast(t). */
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

window.PPRulle={rutnat,rensaNoter,kortaAlla,franStrang,LENS};
})();
