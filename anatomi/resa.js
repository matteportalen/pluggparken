/* Matens resa: en lysande matklump åker genom matspjälkningen. Tid, text och röst per steg.
   Röstfiler: ../ljud/matensresa/s<n>-1.mp3 (s0 inledning, s1–s7 stegen, s8 avslutning). Saknas en fil visas bara texten.
   Manus: manus/matensresa-manus.txt. Höj VER när en röstfil byts ut. */
import {syreStory} from "./syre.js?v=1";
import {nervStory} from "./nerv.js?v=5";
const VER="4";
const FARTER=[1,1.25,1.5,2];
const MAT_STG=[
 {id:"munn",namn:"Munnen",tid:"ca 10–30 sekunder",dur:12,hl:["tunga"],c:0xe0b070,t:"Maten tuggas sönder av tänderna, och saliven gör den mjuk och börjar bryta ner den. Tungan för maten bakåt när du sväljer."},
 {id:"matstrupe",namn:"Matstrupen",tid:"5–10 sekunder",dur:13.5,hl:["matstrupe"],c:0xd9a35f,t:"Ett rör ungefär 25 centimeter långt. Musklerna i väggen kramar ihop sig i en våg och pressar maten ner mot magen, även om du står på huvudet."},
 {id:"magsack",namn:"Magsäcken",tid:"2–4 timmar",dur:12.5,hl:["magsack"],c:0xe8c24a,t:"Maten blandas med magsaft och blir en tjock gröt. Magsaften är så sur att den dödar många bakterier. Magsäcken knådar maten som en degmaskin."},
 {id:"tolvfinger",namn:"Tolvfingertarmen",tid:"några minuter",dur:14,hl:["tolvfinger","gallblasa","bukspott","lever"],c:0xf0d45a,t:"Här kommer galla från gallblåsan (levern gör gallan) och saft från bukspottkörteln. Gallan hjälper till att bryta ner fett, och saften bryter ner resten av maten."},
 {id:"tunntarm",namn:"Tunntarmen",tid:"3–5 timmar",dur:18,hl:["tunntarm","portader"],c:0xf6e27a,t:"Här tas näringen upp. Tarmens vägg är full av små fingrar som suger upp näringen, och den går över i blodet. Blodet bär näringen först till levern genom portådern, sedan vidare ut i hela kroppen. Tunntarmen är flera meter lång."},
 {id:"tjocktarm",namn:"Tjocktarmen",tid:"10–50 timmar",dur:11.8,hl:["tjocktarm","blindtarm"],c:0xa8803f,t:"Det som blir kvar är mest vatten och sådant som kroppen inte kan ta upp. Tjocktarmen suger upp vattnet så att resten blir fast. Här bor också miljarder nyttiga bakterier som hjälper till."},
 {id:"slut",namn:"Ändtarmen",tid:"oftast 1–3 dygn för hela resan",dur:8.5,hl:["tjocktarm"],c:0x8a6a30,t:"Sist samlas resten i ändtarmen. När du går på toaletten lämnar det kroppen. Hela resan tar oftast mellan ett och tre dygn."}];
const MAT_INTRO="Följ med på maten resa genom kroppen. Det börjar i munnen och slutar flera dygn senare. Tiderna i rutan är ungefärliga, och här går allt mycket snabbare än i verkligheten.";
const MAT_FIN="Nu har du följt maten hela vägen. Du kan se resan igen, eller dra i reglaget för att titta närmare på ett steg.";
const MAT_SPAR=new Set(["tunga","matstrupe","magsack","tolvfinger","gallblasa","bukspott","lever","tunntarm","tjocktarm","blindtarm"]);
const $=id=>document.getElementById(id);
export function initResa(C){
 const {THREE,S,cam,ctl,grp,all}=C;
 let VAG=null,R=null,ST=null,STG=MAT_STG,INTRO=MAT_INTRO,FIN=MAT_FIN,SPAR=MAT_SPAR,starts=[];
 const calc=()=>{let t=0;starts=STG.map(s=>{const a=t;t+=s.dur;return a;});};calc();
 const tex=(()=>{const c=document.createElement("canvas");c.width=c.height=64;const g=c.getContext("2d"),r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255,255,255,1)");r.addColorStop(.35,"rgba(255,255,255,.55)");r.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=r;g.fillRect(0,0,64,64);const t=new THREE.CanvasTexture(c);return t;})();
 const fart=()=>{try{const v=+localStorage.getItem("pluggparken-resa-fart");if(FARTER.includes(v))return v;}catch(e){}return 1;};
 const rostPa=()=>{try{return localStorage.getItem("pluggparken-resa-rost")!=="0";}catch(e){return true;}};
 const tot=()=>STG.reduce((a,s)=>a+s.dur,0);
 function stageAt(t){let i=0;for(let k=0;k<STG.length;k++)if(t>=starts[k])i=k;return i;}

 async function ladda(){if(ST.vag)return ST.vag;ST.vag=await ST.ladda();return ST.vag;}

 function bygg(){
  const NP=200,pos=new Float32Array(NP*3),col=new Float32Array(NP*3);
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(col,3));
  const pm=new THREE.PointsMaterial({size:.011,map:tex,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true});
  const pts=new THREE.Points(g,pm);pts.frustumCulled=false;pts.renderOrder=10;
  const tg=new THREE.BufferGeometry(),TN=46,tp=new Float32Array(TN*3),tc=new Float32Array(TN*3);tg.setAttribute("position",new THREE.BufferAttribute(tp,3));tg.setAttribute("color",new THREE.BufferAttribute(tc,3));
  const tm=new THREE.PointsMaterial({size:.016,map:tex,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true});
  const trail=new THREE.Points(tg,tm);trail.frustumCulled=false;trail.renderOrder=11;
  const head=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0xffd27a,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));head.renderOrder=12;
  const core=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),new THREE.MeshBasicMaterial({color:0xffe9b0}));core.renderOrder=13;
  const grpR=new THREE.Group();grpR.add(pts,trail,head,core);S.add(grpR);
  return {grpR,pts,g,NP,pos,col,trail,tg,TN,tp,tc,head,core,P:[],acc:{}};}

 function paneler(){
  $("resa").hidden=false;document.body.classList.add("resa");
  const bar=$("rBar");bar.innerHTML="";STG.forEach((s,i)=>{const b=document.createElement("button");b.title=s.namn;b.innerHTML=`<i></i><span>${s.namn}</span>`;b.onclick=()=>hoppa(i);bar.appendChild(b);});
  $("rS").max=String(Math.round(tot()*100));$("rS").value="0";}

 /* ---- berättelser: varje resa har sin data och sina hooks ---- */
 const MAT={namn:"Matens resa",rost:"matensresa",dd:[.28,.36,.4,.3,.5,.55,.4],STG:MAT_STG,INTRO:MAT_INTRO,FIN:MAT_FIN,
  ladda:async()=>{const v=await (await fetch("modell/vag.json")).json();v.kurvor=v.steg.map(s=>new THREE.CatmullRomCurve3(s.pts.map(p=>new THREE.Vector3(...p)),false,"centripetal"));return v;},
  setup:()=>{for(const k of Object.keys(grp))grp[k].visible=(k==="organ"||k==="skelett"||k==="ven");
   for(const o of all){const s=o.userData.s;if(s==="skelett"||s==="organ"||s==="ven"){const m=o.material.clone();m.transparent=true;m.opacity=s==="ven"?0:.5;if(m.emissive)m.emissive.set(0xff9a3c);m.emissiveIntensity=0;o.material=m;o.visible=s==="ven"?false:(s==="organ"?SPAR.has(o.userData.id):true);}}},
  sprut:(dt,i,bol)=>sprut(dt,i,bol),
  kern:(i,u)=>i===4?.0075-.003*u:(i>=5?.0045:.0075),
  farg:(i)=>STG[i].c,
  synlig:(i,act,dt,puls)=>{
  for(const m of all){const s=m.userData.s;if(s!=="skelett"&&s!=="organ"&&s!=="ven")continue;const id=m.userData.id,mat=m.material;if(!mat.transparent)continue;
   let tgt,em=0;if(s==="skelett")tgt=.045;else if(s==="ven")tgt=(id==="portader"&&act.includes("portader"))?.9:0;else{const on=act.includes(id);tgt=on?1:(SPAR.has(id)?.3:0);em=on?(["gallblasa","bukspott","lever"].includes(id)?puls:.3):0;}
   mat.opacity+=(tgt-mat.opacity)*Math.min(1,dt*5);if(mat.emissive)mat.emissiveIntensity+=(em-mat.emissiveIntensity)*Math.min(1,dt*6);
   m.visible=mat.opacity>.015&&(s!=="organ"||SPAR.has(id)||mat.opacity>.05);mat.depthWrite=mat.opacity>.85;}
  }};
 const SYRE=syreStory({THREE,all,grp,C,R:()=>R,VAG:()=>VAG,nyPartikel:(...a)=>nyPartikel(...a),tex});SYRE.SPAR=new Set();
 const NERV=nervStory({THREE,all,grp,C,R:()=>R,VAG:()=>VAG,nyPartikel:(...a)=>nyPartikel(...a),tex});
 const STORIES={mat:MAT,syre:SYRE,nerv:NERV};
 function setStory(id){ST=STORIES[id]||MAT;STG=ST.STG;INTRO=ST.INTRO;FIN=ST.FIN;SPAR=ST.SPAR||MAT_SPAR;calc();}

 function start(id){if(R)return;setStory(id||"mat");ladda().then(v=>{if(R)return;VAG=v;
  const sv={vis:Object.fromEntries(Object.keys(grp).map(k=>[k,grp[k].visible])),mv:all.map(o=>[o,o.visible,o.material]),min:ctl.minDistance};
  R={sv,t:0,phase:"intro",play:true,intro:0,stage:-1,vo:null,busy:false,dd:.3,ddT:0,ob:bygg(),sound:rostPa()};
  $("kort").hidden=true;
  ST.setup();
  paneler();$("rSnd").textContent=R.sound?"🔊":"🔇";ctl.minDistance=.1;
  const p0=VAG.kurvor[0].getPointAt(0);ctl.target.copy(p0);cam.position.set(p0.x+.06,p0.y+.04,p0.z+.3);
  C.setLines&&C.setLines(false);
  intro();});}

 function rost(i){if(R.vo){try{R.vo.pause();}catch(e){}R.vo=null;}R.busy=false;if(!R.sound)return;
  const a=new Audio("../ljud/"+ST.rost+"/s"+i+"-1.mp3?v="+VER);a.preload="auto";a.playbackRate=fart();R.vo=a;R.busy=true;
  a.onended=a.onerror=()=>{if(R&&R.vo===a)R.busy=false;};a.play().catch(()=>{if(R&&R.vo===a)R.busy=false;});}

 function kort(n,namn,tid,text){$("rN").textContent=n;$("rT").textContent=namn;$("rTid").textContent=tid||"";$("rP").textContent=text;
  const k=$("resa");k.classList.remove("in");void k.offsetWidth;k.classList.add("in");}
 function intro(){R.phase="intro";R.t=0;R.intro=0;R.stage=-1;kort("Start",ST.namn,"",INTRO);$("rPlay").textContent="⏸";rost(0);}
 function sluta(){R.phase="done";kort("Klar","Resan är slut","",FIN);rost(STG.length+1);$("rPlay").textContent="↺";}

 function steg(i){R.stage=i;const s=STG[i];kort(`${i+1} / ${STG.length}`,s.namn,"I verkligheten: "+s.tid,s.t);
  R.dd=ST.dd[i];R.ddT=1.6;
  R.ob.head.material.color.setHex(s.c);rost(i+1);
  [...$("rBar").children].forEach((b,k)=>b.classList.toggle("on",k===i));}

 function hoppa(i){if(!R)return;if(R.phase!=="run"){R.phase="run";}R.t=starts[i]+.01;steg(i);$("rPlay").textContent=R.play?"⏸":"▶";}

 function nyPartikel(kind,a,b,life,col){const P=R.ob.P;if(P.length>=R.ob.NP)return;P.push({k:kind,a:a.clone(),b:b.clone(),life,age:0,col:new THREE.Color(col),j:Math.random()*6.28,r:(Math.random()-.5)*.02});}
 const _v=new THREE.Vector3(),_w=new THREE.Vector3(),_c=new THREE.Color();
 function sprut(dt,i,bol){const acc=R.ob.acc,id=STG[i].id;
  const mk=(key,rate,fn)=>{acc[key]=(acc[key]||0)+dt*rate;while(acc[key]>=1){acc[key]--;fn();}};
  if(id==="munn")mk("sal",7,()=>{_v.copy(bol).add(_w.set((Math.random()-.5)*.03,.02+Math.random()*.02,(Math.random()-.5)*.02));nyPartikel("a",_v,bol,.9,0xbfe7ff);});
  if(id==="magsack")mk("syra",9,()=>{_v.copy(bol).add(_w.set((Math.random()-.5)*.07,(Math.random()-.5)*.06,(Math.random()-.5)*.05));nyPartikel("a",_v,bol,1.1,0xff7a6a);});
  if(id==="tolvfinger"){const g=new THREE.Vector3(...VAG.gallblasa),b=new THREE.Vector3(...VAG.bukspott);mk("galla",9,()=>nyPartikel("a",g,bol,1.4,0x7fe05a));mk("saft",9,()=>nyPartikel("a",b,bol,1.4,0xffb347));}
  if(id==="tunntarm"){const l=new THREE.Vector3(...VAG.lever);mk("nar",16,()=>{_v.copy(bol).add(_w.set((Math.random()-.5)*.02,(Math.random()-.5)*.02,(Math.random()-.5)*.02));nyPartikel("b",_v,l,1.8,0xffd84a);});}
  if(id==="tjocktarm")mk("vat",11,()=>{_v.copy(bol);_w.set((Math.random()-.5)*.06,(Math.random()-.2)*.05,(Math.random()-.5)*.06);nyPartikel("c",_v,_v.clone().add(_w),1.1,0x5ac8ff);});
 }
 function partiklar(dt){const o=R.ob,P=o.P;let n=0;
  for(let q=P.length-1;q>=0;q--){const p=P[q];p.age+=dt;if(p.age>=p.life){P.splice(q,1);}}
  for(const p of P){const u=p.age/p.life,e=u*u*(3-2*u);let x,y,z;
   if(p.k==="b"){x=p.a.x+(p.b.x-p.a.x)*e;y=p.a.y+(p.b.y-p.a.y)*e+Math.sin(u*Math.PI)*.03;z=p.a.z+(p.b.z-p.a.z)*e;}
   else if(p.k==="c"){x=p.a.x+(p.b.x-p.a.x)*e;y=p.a.y+(p.b.y-p.a.y)*e+u*.015;z=p.a.z+(p.b.z-p.a.z)*e;}
   else{x=p.a.x+(p.b.x-p.a.x)*e;y=p.a.y+(p.b.y-p.a.y)*e;z=p.a.z+(p.b.z-p.a.z)*e;}
   const f=Math.min(1,u*6)*(1-u*u);o.pos[n*3]=x;o.pos[n*3+1]=y;o.pos[n*3+2]=z;o.col[n*3]=p.col.r*f;o.col[n*3+1]=p.col.g*f;o.col[n*3+2]=p.col.b*f;n++;}
  for(let k=n;k<o.NP;k++){o.pos[k*3]=o.pos[k*3+1]=o.pos[k*3+2]=0;o.col[k*3]=o.col[k*3+1]=o.col[k*3+2]=0;}
  o.g.attributes.position.needsUpdate=true;o.g.attributes.color.needsUpdate=true;}

 function frame(dtRaw){if(!R)return;const dt=Math.min(.05,dtRaw||.016),o=R.ob;const f=fart();
  if(R.phase==="intro"){R.intro+=dt;if(R.play&&R.intro>2.2&&!R.busy){R.phase="run";R.t=.01;steg(0);}}
  else if(R.phase==="run"&&R.play){R.t+=dt*f;const T=tot();
   if(R.t>=T){R.t=T-.001;if(R.busy){}else{sluta();}}
   else{const i=stageAt(R.t);if(i!==R.stage)steg(i);else if(R.busy&&R.t>starts[i]+STG[i].dur-.04)R.t=starts[i]+STG[i].dur-.04;}}
  const i=R.phase==="intro"?0:(R.phase==="done"?STG.length-1:stageAt(R.t));
  const u=R.phase==="intro"?0:(R.phase==="done"?1:Math.min(1,Math.max(0,(R.t-starts[i])/STG[i].dur)));
  const cur=VAG.kurvor[i],bol=cur.getPointAt(Math.min(.9999,u));
  /* matklumpen och svansen */
  const sc=ST.kern(i,u);o.core.position.copy(bol);o.core.scale.setScalar(sc);o.head.position.copy(bol);o.head.scale.setScalar(.05);
  const hx=ST.farg(i,u);o.head.material.color.setHex(hx);
  const cc=_c.setHex(hx);
  for(let k=0;k<o.TN;k++){const uu=Math.max(0,u-k*.011);const p=cur.getPointAt(Math.min(.9999,uu));const fd=Math.pow(1-k/o.TN,1.7)*.9;o.tp[k*3]=p.x;o.tp[k*3+1]=p.y;o.tp[k*3+2]=p.z;o.tc[k*3]=cc.r*fd;o.tc[k*3+1]=cc.g*fd;o.tc[k*3+2]=cc.b*fd;}
  o.tg.attributes.position.needsUpdate=true;o.tg.attributes.color.needsUpdate=true;
  if(R.play&&R.phase==="run")ST.sprut(dt*f,i,bol,u);partiklar(dt);
  /* organens synlighet */
  const act=R.phase==="intro"?[]:STG[i].hl,puls=.22+.16*Math.sin(performance.now()/260);
  ST.synlig(i,act,dt,puls);
  /* kamera: bilden skjuts uppåt så att matklumpen inte hamnar bakom rutan */
  {const W=innerWidth,H=innerHeight,k=W<=760?.26:.15,pr=$("resa").getBoundingClientRect(),y=Math.round(H*k);if(R.vy!==y||R.vw!==W||R.vh!==H){R.vy=y;R.vw=W;R.vh=H;cam.setViewOffset(W,H,0,y,W,H);}}
  /* kamera */
  const old=ctl.target.clone();ctl.target.lerp(bol,Math.min(1,dt*3.2));cam.position.add(ctl.target.clone().sub(old));
  if(R.ddT>0){R.ddT-=dt;const d=cam.position.distanceTo(ctl.target),nd=d+(R.dd-d)*Math.min(1,dt*2.2);cam.position.sub(ctl.target).setLength(nd).add(ctl.target);}
  if(ST.orbit&&R.phase!=="done"){const d=cam.position.clone().sub(ctl.target),a=ST.orbit*Math.cos(performance.now()/2600)*dt,cs=Math.cos(a),sn=Math.sin(a);cam.position.set(ctl.target.x+d.x*cs-d.z*sn,cam.position.y,ctl.target.z+d.x*sn+d.z*cs);}
  /* reglage och staplar */
  if(!R.dragS)$("rS").value=String(Math.round(R.t*100));
  [...$("rBar").children].forEach((b,k)=>b.style.setProperty("--p",k<i?1:(k===i?u:0)));
 }

 function stopp(){if(!R)return;if(R.vo){try{R.vo.pause();}catch(e){}}
  const o=R.ob;S.remove(o.grpR);o.g.dispose();o.tg.dispose();
  for(const [m,v,mat] of R.sv.mv){if(m.material!==mat&&m.material.dispose)m.material.dispose();m.material=mat;m.visible=v;}
  for(const k of Object.keys(R.sv.vis))grp[k].visible=R.sv.vis[k];
  cam.clearViewOffset();ctl.minDistance=R.sv.min;$("resa").hidden=true;document.body.classList.remove("resa");R=null;C.hudUpd&&C.hudUpd();C.flyHome&&C.flyHome();}

 /* knappar */
 $("rPlay").onclick=()=>{if(!R)return;if(R.phase==="done"){R.phase="run";R.t=.01;R.play=true;steg(0);$("rPlay").textContent="⏸";return;}
  R.play=!R.play;$("rPlay").textContent=R.play?"⏸":"▶";if(R.vo){try{R.play?R.vo.play():R.vo.pause();}catch(e){}}};
 $("rPrev").onclick=()=>{if(!R)return;const i=R.phase==="run"?stageAt(R.t):0;hoppa(Math.max(0,(R.t-starts[i]>2)?i:i-1));};
 $("rNext").onclick=()=>{if(!R)return;const i=R.phase==="run"?stageAt(R.t):-1;if(i>=STG.length-1){R.t=tot()-.002;R.busy=false;if(R.vo)try{R.vo.pause();}catch(e){}sluta();}else hoppa(i+1);};
 $("rSpd").onclick=()=>{const n=FARTER[(FARTER.indexOf(fart())+1)%FARTER.length];try{localStorage.setItem("pluggparken-resa-fart",n);}catch(e){}window.dispatchEvent(new Event("mpfart"));};
 const spdTxt=()=>{$("rSpd").textContent=fart()+"×";if(R&&R.vo)R.vo.playbackRate=fart();};window.addEventListener("mpfart",spdTxt);spdTxt();
 $("rSnd").onclick=()=>{if(!R)return;R.sound=!R.sound;try{localStorage.setItem("pluggparken-resa-rost",R.sound?"1":"0");}catch(e){}$("rSnd").textContent=R.sound?"🔊":"🔇";if(!R.sound){if(R.vo)try{R.vo.pause();}catch(e){}R.busy=false;}else if(R.phase==="run")rost(R.stage+1);};
 $("rX").onclick=stopp;
 $("rS").addEventListener("input",()=>{if(!R)return;R.dragS=true;const t=+$("rS").value/100;R.t=Math.min(tot()-.01,Math.max(.01,t));if(R.phase!=="run"){R.phase="run";}const i=stageAt(R.t);if(i!==R.stage)steg(i);});
 $("rS").addEventListener("change",()=>{if(R)R.dragS=false;});
 addEventListener("keydown",e=>{if(R&&e.key==="Escape")stopp();});
 return {start,stopp,frame,aktiv:()=>!!R};
}
