/* Skalresan: kopplar ihop filmerna Zooma in (zoominfilm.js) och Zooma ut (zoomfilm.js) till en resa från kvark till kosmiskt nät.
   MPSkalresa.start("in"|"ut",{scen,onClose,auto,hem,ut}) (ut = egen funktion för resan ut, hem = "skola" ger slut på skolgården) öppnar filmen över hela fönstret och lägger en linjal överst med alla 17 stegen.
   Linjalen visar var man är och är samtidigt ett reglage: tryck eller dra för att hoppa till ett steg, även i den andra filmen
   (inzoomat till vänster, utzoomat till höger, som alla reglage på sajten). Slutrutan får en knapp som fortsätter i den andra filmen.
   Filmerna ändras inte: linjalen läser vilken scen som visas ur filmens egna scenprickar (.sh-dot.done) och byter scen genom att trycka på dem. */
(function(){
const STEG=[
 {f:"in",s:8,n:"Kvarkarna",m:"mindre än en proton"},
 {f:"in",s:7,n:"Atomkärnan",m:"tiotusentals gånger mindre än atomen"},
 {f:"in",s:6,n:"Atomen",m:"0,1 nanometer"},
 {f:"in",s:5,n:"DNA",m:"2 nanometer brett"},
 {f:"in",s:4,n:"Cellkärnan",m:"0,006 mm"},
 {f:"in",s:3,n:"Cellen",m:"0,03 mm"},
 {f:"in",s:2,n:"Huden",m:"0,1 mm"},
 {f:"in",s:1,n:"Handen",m:"10 cm"},
 {f:"ut",s:1,n:"Jorden",m:"12 742 km"},
 {f:"ut",s:2,n:"Månen",m:"384 400 km bort"},
 {f:"ut",s:3,n:"Solen",m:"150 miljoner km bort"},
 {f:"ut",s:4,n:"Solsystemet",m:"4 ljustimmar"},
 {f:"ut",s:5,n:"Närmaste stjärnorna",m:"4 ljusår"},
 {f:"ut",s:6,n:"Vintergatan",m:"100 000 ljusår"},
 {f:"ut",s:7,n:"Andromeda",m:"2,5 miljoner ljusår"},
 {f:"ut",s:8,n:"Laniakea",m:"500 miljoner ljusår"},
 {f:"ut",s:9,n:"Kosmiska nätet",m:"miljarder ljusår"}
];
const CSS=`
.skr{position:absolute;z-index:2;left:50%;transform:translateX(-50%);top:calc(8px + env(safe-area-inset-top,0px));width:min(44%,520px);color:#fff;font-family:Inter,"Helvetica Neue",Arial,system-ui,sans-serif;user-select:none;-webkit-user-select:none;text-align:center}
.skr-rad{display:flex;align-items:center;gap:8px}
.skr-rad>span{flex:none;font-size:15px;opacity:.85}
.skr-sp{position:relative;flex:1;height:30px;cursor:pointer;touch-action:none;outline:0;border-radius:15px}
.skr-sp:focus-visible{box-shadow:0 0 0 2px #ffd86b}
.skr-sp::before{content:"";position:absolute;left:0;right:0;top:14px;height:2px;border-radius:1px;background:linear-gradient(90deg,rgba(255,150,120,.6),rgba(127,214,255,.6) 47%,rgba(180,160,255,.6))}
.skr-p{position:absolute;top:15px;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;background:rgba(255,255,255,.55);transition:transform .2s,background .2s}
.skr-p.g{background:rgba(255,255,255,.85)}
.skr-p.h{width:2px;height:14px;margin:-7px 0 0 -1px;border-radius:1px;background:rgba(255,255,255,.35)}
.skr-m{position:absolute;top:15px;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:#ffd86b;box-shadow:0 0 14px rgba(255,216,107,.9);transition:left .5s cubic-bezier(.2,.7,.2,1)}
.skr-t{margin-top:1px;font-size:12px;font-weight:700;letter-spacing:.02em;white-space:nowrap;text-shadow:0 1px 8px rgba(0,0,0,.95)}
.skr-t b{color:#ffd86b;font-weight:800}
.skr-t small{font-size:11px;font-weight:600;opacity:.8}
@media(max-width:700px){.skr{top:calc(60px + env(safe-area-inset-top,0px));width:calc(100% - 28px)}}
@media(prefers-reduced-motion:reduce){.skr-m,.skr-p{transition:none}}`;
let nu=null; // {vilken,root,stang,obs,prev,onClose}
const FILM=v=>v==="in"?window.MPZoomInFilm:window.MPZoomFilm;
function stegAv(vilken,si,hem){if(vilken==="in")return si<=0?7:si>=9?(hem==="skola"?7:8):8-si;return si<=0?8:7+Math.min(9,si);}
function linjal(root,vilken){
  if(!document.getElementById("skr-css")){const st=document.createElement("style");st.id="skr-css";st.textContent=CSS;document.head.appendChild(st);}
  const el=document.createElement("div");el.className="skr";
  el.innerHTML=`<div class="skr-rad"><span aria-hidden="true">🔬</span><div class="skr-sp" role="slider" tabindex="0" aria-label="Skala: från kvark till kosmiskt nät" aria-valuemin="1" aria-valuemax="${STEG.length}"></div><span aria-hidden="true">🌌</span></div><div class="skr-t" aria-hidden="true"></div>`;
  const sp=el.querySelector(".skr-sp"),txt=el.querySelector(".skr-t"),pos=i=>(i/(STEG.length-1)*100)+"%";
  // prickarna, och ett streck mellan handen och jorden: där byter resan film
  STEG.forEach((s,i)=>{const p=document.createElement("i");p.className="skr-p";p.style.left=pos(i);sp.appendChild(p);});
  const h=document.createElement("i");h.className="skr-p h";h.style.left=pos(7.5);sp.appendChild(h);
  const m=document.createElement("i");m.className="skr-m";sp.appendChild(m);
  let aktiv=-1,drar=false;
  const visa=(i,forhand)=>{const s=STEG[i];m.style.left=pos(i);txt.innerHTML=`<b>${s.n}</b> <small>· ${s.m}</small>`;sp.setAttribute("aria-valuenow",i+1);sp.setAttribute("aria-valuetext",s.n+", "+s.m);
    [...sp.querySelectorAll(".skr-p:not(.h)")].forEach((p,k)=>p.classList.toggle("g",forhand?k===i:k<=i));};
  const las=()=>{if(drar)return;const i=stegAv(vilken,root.querySelectorAll(".sh-dot.done").length,nu&&nu.hem);if(i!==aktiv){aktiv=i;visa(i);}};
  const vid=e=>{const r=sp.getBoundingClientRect();return Math.max(0,Math.min(STEG.length-1,Math.round((e.clientX-r.left)/r.width*(STEG.length-1))));};
  sp.addEventListener("pointerdown",e=>{drar=true;try{sp.setPointerCapture(e.pointerId);}catch(_){}visa(vid(e),true);e.preventDefault();});
  sp.addEventListener("pointermove",e=>{if(drar)visa(vid(e),true);});
  const slapp=e=>{if(!drar)return;drar=false;const i=vid(e);aktiv=-1;ga(i);};
  sp.addEventListener("pointerup",slapp);sp.addEventListener("pointercancel",()=>{drar=false;aktiv=-1;las();});
  // pilarna flyttar ett steg; filmmotorn ska inte också byta scen på samma tangent
  sp.addEventListener("keydown",e=>{const d=e.key==="ArrowRight"||e.key==="ArrowUp"?1:e.key==="ArrowLeft"||e.key==="ArrowDown"?-1:0;if(!d)return;e.preventDefault();e.stopPropagation();const i=Math.max(0,Math.min(STEG.length-1,(aktiv<0?0:aktiv)+d));if(i!==aktiv)ga(i);});
  root.appendChild(el);
  const obs=new MutationObserver(las);obs.observe(root.querySelector(".sh-dots"),{subtree:true,attributes:true,attributeFilter:["class"]});las();
  return obs;}
function ga(i){const s=STEG[i];if(!nu)return;if(s.f==="ut"&&nu.ut){const f=nu.ut;stang(true);f();return;}if(s.f===nu.vilken){const d=nu.root.querySelector('.sh-dot[data-i="'+s.s+'"]');if(d)d.click();}else start(s.f,{scen:s.s,onClose:nu.onClose,_byte:true});}
function stang(tyst){if(!nu)return;const n=nu;nu=null;try{n.obs.disconnect();}catch(e){}if(tyst){try{n.stang();}catch(e){}}document.body.style.overflow=n.prev;return n;}
function start(vilken,o){
  o=o||{};const F=FILM(vilken);if(!F||!window.MPSvartHal)return false;
  let prev=document.body.style.overflow;if(nu){prev=nu.prev;stang(true);}
  document.body.style.overflow="hidden";
  const extra=vilken==="in"?[{t:"🚀 Fortsätt ut i universum",guld:true,go:()=>o.ut?o.ut():start("ut",{onClose:o.onClose,_byte:true,auto:true})}]:(window.MPZoomInFilm?[{t:"🔬 Zooma in till atomen",guld:true,go:()=>start("in",{onClose:o.onClose,_byte:true,auto:true})}]:[]);
  const jag={vilken,prev,hem:o.hem,onClose:o.onClose,ut:vilken==="in"?o.ut:null,root:null,stang:null,obs:null};
  jag.stang=F.start(document.body,{overlay:true,extra,hem:o.hem,onClose:()=>{if(nu===jag){stang(false);if(o.onClose)o.onClose();}}});
  jag.root=document.body.lastElementChild;nu=jag;jag.obs=linjal(jag.root,vilken);
  if(o.scen!=null){const d=jag.root.querySelector('.sh-dot[data-i="'+o.scen+'"]');if(d)d.click();}
  else if(o.auto){const b=jag.root.querySelector('.sh-start [data-a="go"]');if(b)b.click();}
  return true;}
window.MPSkalresa={STEG,start,stang:()=>stang(true)};
})();
