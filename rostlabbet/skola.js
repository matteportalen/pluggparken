/* Ljudskolan i Röstlabbet: vokalkartan och konsonanterna.
   Vokalkartan följer originalets VowelMap (CHIMERA, MIT): vokalerna där den här rösten faktiskt gör dem
   (F2 åt vänster, F1 nedåt), den gröna ringen är munnens ljud just nu, och man drar för att forma en vokal
   (VoiceModel.articForFormants). Konsonanterna sägs mellan två a (a-p-a) med motorns munmodell. */
const $=id=>document.getElementById(id);
let A=null,dra=false,spar=[];
// svenska bokstäver för motorns vokaler (där det finns en tydlig motsvarighet)
const SV={'ɑ':'A','e':'E','i':'I','u':'O','y':'Y','o':'Å','ɛ':'Ä','ø':'Ö','ʉ':'U','a':'a','ɪ':'i','ʊ':'o','ɔ':'å','œ':'ö','æ':'ä'};
// konsonanterna i grupper efter var i munnen de görs; [ipa, bokstav, exempelord]
const GRUPPER=[
 ['💋 Läpparna',[['p','p','pappa'],['b','b','boll'],['m','m','mamma'],['f','f','fisk'],['v','v','vatten']]],
 ['👅 Tungspetsen',[['t','t','tak'],['d','d','dag'],['n','n','nos'],['s','s','sol'],['l','l','lampa'],['r','r','ros']]],
 ['🫧 Tungryggen',[['j','j','ja'],['ʃ','sj','sjö'],['k','k','katt'],['ɡ','g','gul'],['ŋ','ng','ring']]],
 ['🌬️ Halsen',[['h','h','hus']]]];
export const SKOLA_HTML=`
 <p class="lead">Två sorters ljud: <b>vokaler</b> (luften går fritt, munnen formar klangen) och <b>konsonanter</b> (något stoppar eller trycker ihop luften).</p>
 <h3>Vokalkartan</h3>
 <div class="vokalrad"><canvas id="vokalkarta" class="vokalkarta" role="slider" aria-label="Vokalkarta. Dra för att forma en vokal." aria-valuetext="vokal"></canvas>
  <div class="vokalinfo"><p>Dra punkten. Uppe till vänster blir det <b>I</b>, nere blir det <b>A</b>, uppe till höger <b>O</b>.</p>
   <p class="hint">Uppåt: tungan högre i munnen. Åt vänster: tungan längre fram. Den gröna ringen visar vilket ljud munnen gör nu.</p>
   <p class="nuvokal" id="nuvokal" aria-live="polite"></p></div></div>
 <h3>Konsonanterna</h3>
 <p class="hint">Tryck på ett ljud. Huvudet säger det mellan två a, till exempel a-p-a. Titta var munnen stänger!</p>
 <div class="konsonanter" id="konsonanter"></div>
 <p class="hur" id="konsInfo" aria-live="polite"></p>`;

function range(){const b=A.body,c=b.child?1:0,f=b.female?1:0,at=(m,fe,ch)=>c?ch:f?fe:m;return{f1:[at(230,280,300),at(950,1150,1250)],f2:[at(700,800,900),at(2700,3200,3500)]}}
const P=18;
function toXY(F1,F2,w,h){const r=range();return{x:P+(Math.log(r.f2[1])-Math.log(F2))/(Math.log(r.f2[1])-Math.log(r.f2[0]))*(w-2*P),y:P+(Math.log(F1)-Math.log(r.f1[0]))/(Math.log(r.f1[1])-Math.log(r.f1[0]))*(h-2*P)}}
function fromXY(x,y,w,h){const r=range(),u=Math.min(1,Math.max(0,(x-P)/(w-2*P))),v=Math.min(1,Math.max(0,(y-P)/(h-2*P)));
 return{F2:Math.exp(Math.log(r.f2[1])-u*(Math.log(r.f2[1])-Math.log(r.f2[0]))),F1:Math.exp(Math.log(r.f1[0])+v*(Math.log(r.f1[1])-Math.log(r.f1[0])))}}
function narmast(m,F1,F2){let b='',bd=1e9;for(const v of m.vowels){const d=Math.hypot(Math.log(v.F1/F1),Math.log(v.F2/F2));if(d<bd){bd=d;b=v.ipa}}return b}

export function ritaVokalkarta(){
 const c=$('vokalkarta');if(!c||!c.offsetParent||!A.model)return;
 const dpr=Math.min(devicePixelRatio||1,2),w=c.clientWidth,h=c.clientHeight;if(c.width!==Math.round(w*dpr)||c.height!==Math.round(h*dpr)){c.width=Math.round(w*dpr);c.height=Math.round(h*dpr)}
 const x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);x.fillStyle='#0c2234';x.fillRect(0,0,w,h);
 const m=A.model;let fm=[];try{fm=m.transfer(A.shown).formants}catch(e){}
 // vokalfyrkanten som en karta
 const hörn=[toXY(300,2500,w,h),toXY(320,850,w,h),toXY(720,1050,w,h),toXY(780,1650,w,h)];
 x.strokeStyle='rgba(98,160,220,.45)';x.lineWidth=1.2;x.beginPath();hörn.forEach((p,i)=>i?x.lineTo(p.x,p.y):x.moveTo(p.x,p.y));x.closePath();x.stroke();
 x.font='700 13px "Baloo 2",sans-serif';x.textAlign='center';
 const nu=fm.length>=2?narmast(m,fm[0],fm[1]):'';
 for(const v of m.vowels){const p=toXY(v.F1,v.F2,w,h),sv=SV[v.ipa];x.fillStyle=v.ipa===nu?'#7CF5A6':sv&&sv===sv.toUpperCase()?'#e0f4ff':'#7f9cb8';
  x.font=(sv&&sv===sv.toUpperCase()?'800 18px':'600 13px')+' "Baloo 2",sans-serif';x.fillText(sv&&sv===sv.toUpperCase()?sv:v.ipa,p.x,p.y+5)}
 if(fm.length>=2&&A.playing){const now=performance.now();spar=spar.filter(p=>now-p.t<1500);const l=spar[spar.length-1];if(!l||Math.abs(Math.log(l.F1/fm[0]))+Math.abs(Math.log(l.F2/fm[1]))>.004)spar.push({F1:fm[0],F2:fm[1],t:now});
  for(let i=1;i<spar.length;i++){const a=toXY(spar[i-1].F1,spar[i-1].F2,w,h),b=toXY(spar[i].F1,spar[i].F2,w,h);x.strokeStyle=`rgba(124,245,166,${.7*(1-(now-spar[i].t)/1500)})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}
  const p=toXY(fm[0],fm[1],w,h);x.strokeStyle='#7CF5A6';x.lineWidth=2.5;x.beginPath();x.arc(p.x,p.y,9,0,Math.PI*2);x.stroke();
  const sv=SV[nu];$('nuvokal').textContent=sv?`Det låter som ${sv.toUpperCase()}`:'';}
 x.font='600 10px "Baloo 2",sans-serif';x.fillStyle='#7f9cb8';x.textAlign='left';x.fillText('tungan fram',6,h-6);x.textAlign='right';x.fillText('tungan bak',w-6,h-6);
}
async function forma(e){
 const c=$('vokalkarta'),r=c.getBoundingClientRect(),{F1,F2}=fromXY(e.clientX-r.left,e.clientY-r.top,r.width,r.height);
 if(!A.playing||A.utterance)await A.startaRost();
 try{A.setArtic(A.model.articForFormants(F1,F2))}catch(err){console.error(err)}
}
export function initSkola(api){
 A=api;
 $('konsonanter').innerHTML=GRUPPER.map(([namn,lista])=>`<div class="kgrupp"><b>${namn}</b><div>${lista.map(([ipa,bok,ord])=>`<button class="kons" data-ipa="${ipa}" data-ord="${ord}" data-bok="${bok}"><span>${bok}</span><small>${ord}</small></button>`).join('')}</div></div>`).join('');
 $('konsonanter').onclick=e=>{const b=e.target.closest('[data-ipa]');if(!b)return;
  $('konsInfo').innerHTML=`<b>${b.dataset.bok.toUpperCase()}</b> som i <b>${b.dataset.ord}</b>. Lyssna: a-${b.dataset.bok}-a.`;
  document.querySelectorAll('.kons.nu').forEach(x=>x.classList.remove('nu'));b.classList.add('nu');
  A.sagIpa('ɑː'+b.dataset.ipa+'ɑ')};
 const c=$('vokalkarta');
 c.addEventListener('pointerdown',e=>{dra=true;try{c.setPointerCapture(e.pointerId)}catch(x){}forma(e)});
 c.addEventListener('pointermove',e=>{if(dra)forma(e)});
 for(const t of ['pointerup','pointercancel'])c.addEventListener(t,()=>{dra=false});
}
