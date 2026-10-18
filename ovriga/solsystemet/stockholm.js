/* Zooma från jorden ända in i Stockholm.
   Kartmotor: MapLibre GL JS (BSD-3) med globvy.
   Satellitbilder: EOX Sentinel-2 cloudless 2016 (CC BY 4.0, fri även kommersiellt), används från rymden ner till Sverige.
   Karta och 3D-byggnader: OpenFreeMap (OpenMapTiles, data från OpenStreetMap), används från regionnivå ner till kvarteret.
   Allt hämtas från utomstående servrar när man öppnar vyn; inget om eleven skickas (kartleverantörerna ser bara IP-adressen). */
(function(){
const MLV='5.6.0',JS='https://cdn.jsdelivr.net/npm/maplibre-gl@'+MLV+'/dist/maplibre-gl.js',CSSU='https://cdn.jsdelivr.net/npm/maplibre-gl@'+MLV+'/dist/maplibre-gl.css';
const STYLE='https://tiles.openfreemap.org/styles/liberty',EOX='https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg';
/* kamerabanan: zoom → mitt, lutning, riktning */
const PATH=[[1.1,[16,38],0,0],[3.4,[14,54],0,0],[4.7,[16.5,61.5],0,0],[9.4,[18.07,59.33],0,0],[12.5,[18.07,59.325],35,-10],[16.4,[18.0712,59.3257],62,-25]];
const STEPS=[
 {k:'Jorden',z:1.1,t:'Jorden från rymden',f:['Så här ser jorden ut från en satellit.','Bilderna kommer från satelliterna Sentinel-2, som fotograferar hela jorden.']},
 {k:'Europa',z:3.4,t:'Europa',f:['Europa är en världsdel med många länder.','Sverige ligger långt upp i norr.']},
 {k:'Sverige',z:4.7,t:'Sverige',f:['Sverige är ungefär 1 600 kilometer långt, från Skåne i söder till Lappland i norr.']},
 {k:'Stockholm',z:9.4,t:'Stockholm',f:['Stockholm är Sveriges huvudstad och har nästan en miljon invånare.','Staden ligger där Mälaren möter Östersjön, på många öar.']},
 {k:'Innerstaden',z:12.5,t:'Stockholms innerstad',f:['Stockholm nämns första gången i skrift år 1252.','Titta på vattnet: staden är byggd på öar som hänger ihop med broar.']},
 {k:'Gamla stan',z:16.4,t:'Gamla stan',f:['Gamla stan är stadens äldsta del, med medeltida gränder.','Här ligger Kungliga slottet, ett av Europas största slott som fortfarande används.']}];
let ov,map,card,slider,chips,cur=0,loadP=null,booting=false,rafT=0,onClose=null,ovAcc=0,userPan=false;
const css=`#mpsOv{position:fixed;inset:0;z-index:60;background:#02040a;opacity:0;transition:opacity .7s;font-family:"Baloo 2",system-ui,sans-serif;color:#fff}#mpsOv.on{opacity:1}#mpsOv[hidden]{display:none}
#mpsMap{position:absolute;inset:0}
#mpsOv .top{position:absolute;left:10px;right:10px;top:calc(10px + env(safe-area-inset-top,0px));display:flex;gap:8px;align-items:flex-start;pointer-events:none;z-index:3}#mpsOv .top>*{pointer-events:auto}
#mpsOv .bk{border:0;border-radius:999px;background:#fff;color:#1D2B53;font:800 .95rem "Baloo 2",system-ui,sans-serif;padding:7px 14px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.4)}
#mpsOv .ch{background:rgba(10,16,40,.74);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-radius:999px;padding:5px 14px;font-weight:800;font-size:.95rem;box-shadow:0 0 0 1px rgba(255,255,255,.14)}
#mpsCard{position:absolute;right:12px;top:calc(60px + env(safe-area-inset-top,0px));width:min(310px,calc(100vw - 24px));background:rgba(10,16,40,.74);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:16px;box-shadow:0 0 0 1px rgba(255,255,255,.14),0 10px 30px rgba(0,0,0,.4);z-index:3;opacity:0;transform:translateX(14px)}
#mpsCard.in{opacity:1;transform:none;transition:opacity .5s,transform .5s}#mpsCard h2{margin:0;padding:10px 14px 4px;font-size:1.1rem}#mpsCard ul{margin:0;padding:0 14px 12px 30px}#mpsCard li{font-size:.92rem;margin:4px 0;color:#CBD5F5}
#mpsOv .bot{position:absolute;left:0;right:0;bottom:calc(26px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none;z-index:3;padding:0 10px}#mpsOv .bot>*{pointer-events:auto}
#mpsChips{display:flex;gap:5px;max-width:min(760px,100%);overflow-x:auto;padding:2px}
#mpsChips button{flex:0 0 auto;border:0;border-radius:999px;background:rgba(12,18,44,.78);color:#fff;font:800 .85rem "Baloo 2",system-ui,sans-serif;padding:6px 12px;cursor:pointer;box-shadow:0 0 0 1px rgba(255,255,255,.14)}#mpsChips button[aria-pressed=true]{background:#fff;color:#1D2B53}
#mpsOv .sl{display:flex;align-items:center;gap:8px;width:min(560px,100%);background:rgba(10,16,40,.74);backdrop-filter:blur(8px);border-radius:14px;padding:6px 12px;font-weight:800}#mpsOv .sl input{flex:1;accent-color:#FFE58A;height:28px}
#mpsCr{position:absolute;left:8px;bottom:calc(4px + env(safe-area-inset-bottom,0px));width:fit-content;max-width:calc(100% - 16px);background:rgba(5,8,20,.72);border-radius:8px;padding:3px 8px;font:600 10.5px/1.3 system-ui,sans-serif;color:#9fb0d8;z-index:3;pointer-events:none}#mpsCr a{color:#cfe0ff;pointer-events:auto}
#mpsMsg{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:24px;z-index:2;font-weight:800;font-size:1.1rem;color:#cbd5f5}
@media (orientation:landscape) and (max-height:520px){#mpsCard{top:calc(52px + env(safe-area-inset-top,0px));width:min(270px,36vw)}#mpsOv .bot{bottom:20px;gap:4px}#mpsOv .bk,#mpsOv .ch{font-size:.8rem;padding:4px 10px}}`;
const lerp=(a,b,t)=>a+(b-a)*t,sm=t=>t*t*(3-2*t);
function cam(z){let i=0;while(i<PATH.length-2&&z>PATH[i+1][0])i++;const a=PATH[i],b=PATH[i+1],t=sm(Math.max(0,Math.min(1,(z-a[0])/(b[0]-a[0]))));
  return{center:[lerp(a[1][0],b[1][0],t),lerp(a[1][1],b[1][1],t)],zoom:z,pitch:lerp(a[2],b[2],t),bearing:lerp(a[3],b[3],t)};}
function setZ(z,quick){z=Math.max(1.1,Math.min(16.4,z));if(!map)return;const c=cam(z);map.jumpTo(c);sync(z);}
function sync(z){slider.value=Math.round((z-1.1)/(16.4-1.1)*1000);let k=0,bd=1e9;STEPS.forEach((s,i)=>{const d=Math.abs(s.z-z);if(d<bd){bd=d;k=i;}});if(k!==cur||!card.classList.contains('in')){cur=k;const s=STEPS[k];card.classList.remove('in');card.innerHTML=`<h2>📍 ${s.t}</h2><ul>${s.f.map(x=>`<li>${x}</li>`).join('')}</ul>`;void card.offsetWidth;card.classList.add('in');}
  [...chips.children].forEach((b,i)=>b.setAttribute('aria-pressed',i===cur));}
function tween(to,ms,cb){cancelAnimationFrame(rafT);const from=map.getZoom(),t0=performance.now();const f=n=>{const q=Math.min(1,(n-t0)/ms),e=sm(q);setZ(lerp(from,to,e));if(q<1)rafT=requestAnimationFrame(f);else if(cb)cb();};rafT=requestAnimationFrame(f);}
function load(){if(loadP)return loadP;loadP=new Promise((res,rej)=>{const l=document.createElement('link');l.rel='stylesheet';l.href=CSSU;document.head.appendChild(l);const s=document.createElement('script');s.src=JS;s.onload=res;s.onerror=()=>rej(new Error('maplibre'));document.head.appendChild(s);});return loadP;}
async function build(){
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  ov=document.createElement('div');ov.id='mpsOv';ov.hidden=true;
  ov.innerHTML=`<div id="mpsMap"></div><div id="mpsMsg">Laddar kartan …</div>
   <div class="top"><button class="bk" id="mpsBack">← Jorden</button><span class="ch">📍 Zooma in till Stockholm</span><button class="bk" id="mpsTour" hidden>⏸ Pausa resan</button></div>
   <div id="mpsCard"></div>
   <div class="bot"><div id="mpsChips"></div><label class="sl"><span>🌍</span><input type="range" id="mpsZ" min="0" max="1000" value="0" aria-label="Zooma från jorden till Gamla stan"><span>🏙️</span></label></div>
   <div id="mpsCr">Satellitbilder: <a href="https://cloudless.eox.at" target="_blank" rel="noopener">EOxCloudless</a> by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016), <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a> · <a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> © <a href="https://openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a></div>`;
  document.body.appendChild(ov);card=ov.querySelector('#mpsCard');slider=ov.querySelector('#mpsZ');chips=ov.querySelector('#mpsChips');
  STEPS.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s.k;b.onclick=()=>endTour()||tween(s.z,Math.max(2500,Math.min(7000,Math.abs(s.z-map.getZoom())*900)));chips.appendChild(b);});
  slider.oninput=()=>{endTour();cancelAnimationFrame(rafT);setZ(1.1+slider.value/1000*(16.4-1.1));};
  ov.querySelector('#mpsBack').onclick=close;
  addEventListener('keydown',e=>{if(e.key==='Escape'&&ov&&!ov.hidden)close();});
  ov.addEventListener('wheel',e=>{if(!map)return;if(e.deltaY>0&&map.getZoom()<1.25){ovAcc+=e.deltaY;if(ovAcc>360){ovAcc=0;close();}}else ovAcc=0;},{passive:true});
  await load();
  const style=await (await fetch(STYLE)).json();
  style.projection={type:'globe'};style.sources.eox={type:'raster',tiles:[EOX],tileSize:256,maxzoom:12,attribution:''};
  /* svenska namn där de finns */
  style.layers.forEach(l=>{if(l.layout&&l.layout['text-field'])l.layout['text-field']=['coalesce',['get','name:sv'],['get','name:latin'],['get','name']];});
  const first=style.layers.findIndex(l=>l.type==='symbol');
  style.layers.splice(first<0?style.layers.length:first,0,{id:'eox',type:'raster',source:'eox',paint:{'raster-opacity':['interpolate',['linear'],['zoom'],0,1,6.2,1,9,0],'raster-fade-duration':400}});
  const c=cam(1.1);
  map=new maplibregl.Map({container:'mpsMap',style,center:c.center,zoom:c.zoom,pitch:c.pitch,bearing:c.bearing,maxPitch:75,attributionControl:false,fadeDuration:300,maxZoom:18,minZoom:0.8});
  map.on('error',e=>{if(e&&e.error&&/Failed to fetch|NetworkError|Load failed/i.test(String(e.error.message||e.error)))msg('Kartan behöver internet. Kontrollera uppkopplingen och försök igen.');});
  const hideMsg=()=>{const m=ov.querySelector('#mpsMsg');if(!m.dataset.err)m.style.display='none';};map.once('load',hideMsg);map.once('idle',hideMsg);setTimeout(hideMsg,3500);
  map.on('dragstart',()=>{cancelAnimationFrame(rafT);});
}
function msg(t){const m=ov&&ov.querySelector('#mpsMsg');if(m){m.dataset.err='1';m.style.display='grid';m.textContent=t;}}
async function open(cb,noAuto){onClose=cb||null;if(!ov&&!booting){booting=true;try{await build();}catch(e){booting=false;if(!ov){const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);}msg('Kartan behöver internet. Kontrollera uppkopplingen och försök igen.');}booting=false;}
  if(!ov)return;ov.hidden=false;requestAnimationFrame(()=>ov.classList.add('on'));document.body.style.overflow='hidden';
  if(map){map.resize();if(noAuto)setZ(16.4);else{setZ(1.1);setTimeout(()=>tween(9.4,6500),900);}}}
/* berättelsen börjar här: Gamla stan → ut genom innerstaden, Stockholm, Sverige, Europa → jorden; sedan tar solsystemets berättelse över (done) */
let T=null;
function tAudio(file,cb){if(!(window.Ljud&&Ljud.on)){T.timer=true;const tk=()=>{if(!T||T.cb!==cb)return;if(T.paused)setTimeout(tk,500);else cb();};T.cb=cb;setTimeout(tk,6500);return;}
  const a=new Audio('../../ljud/resa/'+file+'?v=3');T.aud=a;T.cb=cb;let d=false;const fin=()=>{if(d)return;d=true;if(T&&T.aud===a)T.aud=null;if(T&&T.cb===cb)cb();};a.onended=fin;a.onerror=()=>setTimeout(fin,4000);a.play().catch(()=>setTimeout(fin,4000));}
function tStep(){if(!T)return;const i=T.i;T.target=i;sync(STEPS[i].z);tAudio('s'+(100+i)+'-1.mp3',()=>{if(!T)return;if(i===0){const d=T.done;endTour(true);if(d)d();close();return;}T.i=i-1;T.moving=true;tween(STEPS[i-1].z,Math.max(3200,Math.min(6500,Math.abs(STEPS[i].z-STEPS[i-1].z)*900)),()=>{if(T){T.moving=false;tStep();}});});}
function endTour(keep){const was=!!T;if(T){if(T.aud){T.aud.onended=null;T.aud.pause();}T.cb=null;T=null;}const b=ov&&ov.querySelector('#mpsTour');if(b)b.hidden=true;return false&&was;}
async function tour(done){await open(null,true);if(!ov||!map){if(ov)close();return false;}endTour();T={i:STEPS.length-1,done,paused:false};const b=ov.querySelector('#mpsTour');b.hidden=false;b.textContent='⏸ Pausa resan';
  b.onclick=()=>{if(!T)return;if(!T.paused){T.paused=true;cancelAnimationFrame(rafT);if(T.aud)T.aud.pause();b.textContent='▶ Fortsätt resan';}else{T.paused=false;b.textContent='⏸ Pausa resan';if(T.moving){const i=T.i;tween(STEPS[i].z,3000,()=>{if(T){T.moving=false;tStep();}});}else if(T.aud)T.aud.play();else tStep();}};
  setTimeout(()=>{if(T)tStep();},1100);return true;}
function close(){endTour();if(!ov)return;cancelAnimationFrame(rafT);ov.classList.remove('on');setTimeout(()=>{ov.hidden=true;document.body.style.overflow='';},700);if(onClose)onClose();}
window.MPStockholm={open,close,tour,get isOpen(){return !!ov&&!ov.hidden}};
})();
