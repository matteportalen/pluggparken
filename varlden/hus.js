/* Mitt hus i Pluggparken-världen (nov 2026).
   Ett hus står på huvudön; dörren är en portal till en egen scen (id "hus") där man inreder för mynt.
   Katalog, köp och val delas med Mitt rum (2D) via MPRum (rum.js) och MPMynt (huvud.js):
   köp "rum:plats:id" i matteportalen-mynt, val i matteportalen-rum. Ett köp gäller alltså på båda ställena.
   Allt byggs av enkla former i kod. Inga modeller, inga bilder. */

/* ---------- Var huset står på huvudön (samma räkning varje gång, även när man startar inne i huset) ---------- */
export function husPlats(antalPortaler){
  const a=(3.5)/antalPortaler*Math.PI*2,r=40;           // gluggen mellan SO-parken och Rymdlabbet
  const x=Math.cos(a)*r,z=Math.sin(a)*r,yaw=Math.atan2(-x,-z); // husets framsida pekar mot torget
  const fx=Math.sin(yaw),fz=Math.cos(yaw);
  return{x,z,yaw,fx,fz,dorr:{x:x+fx*3.05,z:z+fz*3.05},ut:{x:x+fx*7.4,z:z+fz*7.4,ang:yaw}};
}

/* ---------- Hjälpare ---------- */
function verktyg(T){
  const cache=new Map();
  const mat=(c,o)=>{if(o)return new T.MeshLambertMaterial(Object.assign({color:c,flatShading:true},o));
    let m=cache.get(c);if(!m){m=new T.MeshLambertMaterial({color:c,flatShading:true});cache.set(c,m);}return m;};
  const B=(g,w,h,d,c,x,y,z)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),typeof c==='object'?c:mat(c));m.position.set(x,y,z);g.add(m);return m;};
  const C=(g,rt,rb,h,c,x,y,z,seg)=>{const m=new T.Mesh(new T.CylinderGeometry(rt,rb,h,seg||16),typeof c==='object'?c:mat(c));m.position.set(x,y,z);g.add(m);return m;};
  const K=(g,r,c,x,y,z,sx,sy,sz)=>{const m=new T.Mesh(new T.SphereGeometry(r,14,10),typeof c==='object'?c:mat(c));m.position.set(x,y,z);if(sx)m.scale.set(sx,sy,sz);g.add(m);return m;};
  const ljus=c=>new T.MeshBasicMaterial({color:c});
  const canvas=(w,h,rit)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;rit(cv.getContext('2d'),w,h);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t;};
  return{mat,B,C,K,ljus,canvas};
}

/* ---------- Utsidan på huvudön ---------- */
export function byggHusUte({THREE:T,S,portalBygg,reduce,antalPortaler}){
  const{B,C,K,ljus,mat}=verktyg(T),h=husPlats(antalPortaler);
  const g=new T.Group();g.position.set(h.x,S.hojd(h.x,h.z),h.z);g.rotation.y=h.yaw;S.W.add(g);
  const W=7,D=5.4,H=4.2;
  B(g,W+.5,.4,D+.5,0xE9E2D0,0,.2,0);                                   // grund
  B(g,W,H,D,0xFFE3EC,0,.4+H/2,0);                                      // väggar
  for(const sx of[-1,1])B(g,.3,H,.3,0xFFFFFF,sx*W/2,.4+H/2,D/2);        // vita hörn
  // taket: en pyramid som sticker ut över väggarna
  const tak=new T.Mesh(new T.ConeGeometry(1,1,4),mat(0xE5484D));tak.rotation.y=Math.PI/4;tak.scale.set(W*.82,2.8,D*.82);tak.position.y=.4+H+1.4;g.add(tak);
  B(g,.8,1.8,.8,0xB24A3A,1.6,.4+H+1.6,-.6);                            // skorsten
  // fönster med varmt ljus och blomlådor
  for(const sx of[-1,1]){
    B(g,1.5,1.3,.1,0xFFFFFF,sx*2.3,2.7,D/2+.02);
    B(g,1.2,1.0,.1,ljus(0xFFE7A0),sx*2.3,2.7,D/2+.06);
    B(g,.08,1.0,.12,0xFFFFFF,sx*2.3,2.7,D/2+.08);B(g,1.2,.08,.12,0xFFFFFF,sx*2.3,2.7,D/2+.08);
    B(g,1.6,.35,.4,0x8B5A2B,sx*2.3,1.85,D/2+.25);
    [0xFF7EB6,0xFFC93C,0xFF5FA2].forEach((c,i)=>K(g,.16,c,sx*2.3+(i-1)*.45,2.1,D/2+.3));
  }
  // dörren bakom portalen
  B(g,1.7,2.6,.1,0xA86B35,0,1.7,D/2+.02);K(g,.09,0xFFC93C,.55,1.7,D/2+.12);
  // brevlåda
  C(g,.07,.07,1.1,0x56668F,W/2+.9,.55,D/2+1.1,8);B(g,.5,.35,.7,0x3D8BFD,W/2+.9,1.2,D/2+1.1);
  // rök ur skorstenen
  if(!reduce){const puffar=[0,1,2].map(i=>K(g,.35,mat(0xFFFFFF,{transparent:true,opacity:.7}),1.6,.4+H+2.8,-.6));
    S.liv.push(t=>puffar.forEach((p,i)=>{const f=(t*.35+i/3)%1;p.position.y=.4+H+2.6+f*3;p.position.x=1.6+f*.8;p.scale.setScalar(.6+f*1.4);p.material.opacity=.7*(1-f);}));}
  // kollision: huskroppen som tre cirklar, så att man kan gå fram till dörren
  for(const lx of[-2.3,0,2.3]){const wx=h.x+Math.cos(h.yaw)*lx+Math.sin(h.yaw)*(-.3),wz=h.z-Math.sin(h.yaw)*lx+Math.cos(h.yaw)*(-.3);S.kollider.push({x:wx,z:wz,r:2.6,top:99});}
  S.kollider.push({x:h.x+Math.cos(h.yaw)*(W/2+.9)+Math.sin(h.yaw)*(D/2+1.1),z:h.z-Math.sin(h.yaw)*(W/2+.9)+Math.cos(h.yaw)*(D/2+1.1),r:.35,top:1.4});
  S.fria.push({x:h.x,z:h.z,r:6.5});
  portalBygg({n:'Mitt hus',e:'🏠',scen:'hus',c:0xFF5FA2},h.dorr.x,h.dorr.z,h.dorr.x+h.fx,h.dorr.z+h.fz,.62);
}

/* ---------- Inuti: rummet ---------- */
const R=9.3,VH=4.2;            // väggarna står på ±R, väggarnas höjd
// var varje sak står: x, z, vridning (0 = framsidan mot +z)
const PLATS={sang:[5.3,-6.95,0],hylla:[-6.6,-8.55,0],matta:[-.6,.4,0],vaxt:[7.95,7.9,0],husdjur:[5.2,7.95,0],soffa:[7.85,1.3,-Math.PI/2],
  tv:[3.9,1.3,Math.PI/2],bord:[-4.7,5.5,0],kyl:[-8.4,-5.6,Math.PI/2],spis:[-8.45,-3.4,Math.PI/2],tvatt:[-8.45,-1.3,Math.PI/2]};
const KOMPIS_C=[-1.2,.6],KOMPIS_R=3;
const PLATS_LEK={musik:[-5.4,-7.3,0],lek:[3.6,2.6,0],teleskop:[2.5,-6.3,Math.PI]};
// väggarna: mitt (x, z) och normal ut från rummet
const VAGGAR={bak:[0,-R,0,-1],vanster:[-R,0,-1,0],hoger:[R,0,1,0],fram:[0,R,0,1]};
// dörrarna i varje rum: på vilken vägg, var längs väggen (lx i väggens egen riktning), vart de leder
const RUMMEN={
  hus:{scen:'hus',dorrar:[{vagg:'fram',lx:0,till:'hub',n:'Ut på ön',e:'🏝️',c:0x1E9E5E},{vagg:'hoger',lx:3.2,till:'lekrum',n:'Lekrummet',e:'🧸',c:0xFFB400}]},
  lek:{scen:'lekrum',dorrar:[{vagg:'fram',lx:0,till:'hus',n:'Vardagsrummet',e:'🛋️',c:0xFF5FA2}]}};
const vaggPkt=(vg,lx,lz)=>{const[cx,cz,nx,nz]=VAGGAR[vg],ry=Math.atan2(nx,nz);return[cx+lx*Math.cos(ry)+lz*Math.sin(ry),cz-lx*Math.sin(ry)+lz*Math.cos(ry)];};
/* Där man hamnar när man kommer in genom dörren som leder till "fran" i rummet "rum" (en bit in, med ryggen mot dörren). */
export function dorrPlats(rum,fran){const d=RUMMEN[rum].dorrar.find(x=>x.till===fran);if(!d)return null;const[x,z]=vaggPkt(d.vagg,d.lx,-4.4),[,,nx,nz]=VAGGAR[d.vagg];return{x,z,ang:Math.atan2(-nx,-nz)};}

/* ---------- Ljud: egna små toner (Web Audio), så att pianot och trummorna låter som instrument ---------- */
let AC=null;
function ac(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();}catch(e){}return AC;}
function ton(f,d=.9,typ='triangle',vol=.22){const a=ac();if(!a)return;const t=a.currentTime,o=a.createOscillator(),g=a.createGain();o.type=typ;o.frequency.value=f;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(a.destination);o.start(t);o.stop(t+d+.05);
  if(typ==='triangle'){const o2=a.createOscillator(),g2=a.createGain();o2.type='sine';o2.frequency.value=f*2;g2.gain.setValueAtTime(vol*.25,t);g2.gain.exponentialRampToValueAtTime(.001,t+d*.6);o2.connect(g2).connect(a.destination);o2.start(t);o2.stop(t+d);}}
function trumma(typ){const a=ac();if(!a)return;const t=a.currentTime;
  if(typ==='bas'){const o=a.createOscillator(),g=a.createGain();o.frequency.setValueAtTime(140,t);o.frequency.exponentialRampToValueAtTime(45,t+.25);g.gain.setValueAtTime(.6,t);g.gain.exponentialRampToValueAtTime(.001,t+.35);o.connect(g).connect(a.destination);o.start(t);o.stop(t+.4);return;}
  const n=a.createBuffer(1,a.sampleRate*.5,a.sampleRate),dd=n.getChannelData(0);for(let i=0;i<dd.length;i++)dd[i]=Math.random()*2-1;
  const src=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();src.buffer=n;
  f.type=typ==='cymbal'?'highpass':'bandpass';f.frequency.value=typ==='cymbal'?6000:typ==='virvel'?1800:600;
  const len=typ==='cymbal'?.6:typ==='virvel'?.18:.25;g.gain.setValueAtTime(typ==='cymbal'?.25:.45,t);g.gain.exponentialRampToValueAtTime(.001,t+len);
  src.connect(f).connect(g).connect(a.destination);src.start(t);src.stop(t+len+.05);
  if(typ==='tom')ton(180,.25,'sine',.35);}
const NOTER=[261.6,293.7,329.6,349.2,392,440,493.9,523.3];
// böckerna i bokhyllan öppnar riktiga minilektioner i Specialare
const BOCKER=[['dinosaurier','Dinosaurierna','🦖'],['hajar','Hajar','🦈'],['vulkan','Så fungerar en vulkan','🌋'],['manen','Månen','🌙'],['blaval','Blåvalen','🐋'],['spinnande','Därför spinner katter','🐱'],['regnbage','Så blir en regnbåge','🌈'],['vikingar','Vikingarna','⚔️']];
// teleskopet visar olika saker i fönstret
const TELESKOP=[['rymd','🪐 Saturnus har ringar av is och sten. De är bredare än avståndet till månen!'],['natt','🌙 Månen ligger 384 000 kilometer bort. Där har bara tolv människor gått.'],['mars','🔴 Mars är röd för att marken är full av rost. Där åker robotar omkring.'],['hop','✨ Stjärnorna ser små ut, men många är mycket större än vår sol.']];

const TAPET={slat:['#DCEBFF'],prickar:['#FFF1E0','#FFB86B'],rander:['#E6F7EE','#C8EEDB'],rutor:['#FCEBF3','#F7D3E4'],stjarnor:['#2B3A67','#FFE07A'],regnbage:['#FFB3B3','#FFD7A8','#FFF1A8','#C9F2C2','#BFE3FF','#D9CCFF']};
function tapetRita(id){return(g,w,h)=>{const c=TAPET[id]||TAPET.slat;g.fillStyle=c[0];g.fillRect(0,0,w,h);
  if(id==='lek'){g.fillStyle='#FFF3C4';g.fillRect(0,0,w,h);['#FF7EB6','#7FD0F5','#8FE3A8','#FFB86B','#B79CFF'].forEach((f,i)=>{g.fillStyle=f;for(let k=0;k<5;k++){g.beginPath();g.arc((i*53+k*97)%w,(i*37+k*61)%(h-20)+8,6+(k%3)*3,0,7);g.fill();}});}
  if(id==='prickar'){g.fillStyle=c[1];g.globalAlpha=.6;for(let y=16;y<h;y+=32)for(let x=(y/32%2)*16+8;x<w;x+=32){g.beginPath();g.arc(x,y,5,0,7);g.fill();}}
  if(id==='rander'){g.fillStyle=c[1];for(let x=0;x<w;x+=40)g.fillRect(x,0,20,h);}
  if(id==='rutor'){g.fillStyle=c[1];g.globalAlpha=.7;for(let x=0;x<w;x+=48)g.fillRect(x,0,24,h);for(let y=0;y<h;y+=48)g.fillRect(0,y,w,24);}
  if(id==='stjarnor'){g.fillStyle=c[1];for(let i=0;i<46;i++){const x=(i*97)%w,y=(i*53)%h;g.beginPath();g.arc(x,y,i%3?1.8:3,0,7);g.fill();}}
  if(id==='regnbage'){c.forEach((f,i)=>{g.fillStyle=f;g.fillRect(0,i*h/6,w,h/6+1);});}
  g.globalAlpha=1;g.fillStyle='rgba(255,255,255,.85)';g.fillRect(0,h-10,w,10);};}
function golvRita(id){return(g,w,h)=>{
  if(id==='lek'){const c=['#7FD0F5','#FFD84D','#FF9FC8','#8FE3A8'];for(let y=0;y<4;y++)for(let x=0;x<4;x++){g.fillStyle=c[(x+y*3)%4];g.fillRect(x*w/4,y*h/4,w/4,h/4);}
    g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=4;for(let i=1;i<4;i++){g.beginPath();g.moveTo(i*w/4,0);g.lineTo(i*w/4,h);g.moveTo(0,i*h/4);g.lineTo(w,i*h/4);g.stroke();}return;}
  if(id==='rutigt'){g.fillStyle='#fff';g.fillRect(0,0,w,h);g.fillStyle='#1D2B53';for(let y=0;y<8;y++)for(let x=0;x<8;x++)if((x+y)%2)g.fillRect(x*w/8,y*h/8,w/8,h/8);return;}
  if(id==='blatt'){g.fillStyle='#7FA8E8';g.fillRect(0,0,w,h);g.strokeStyle='#6890D4';g.lineWidth=3;for(let y=0;y<h;y+=32){g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();}return;}
  if(id==='gras'){g.fillStyle='#7DCB6E';g.fillRect(0,0,w,h);g.strokeStyle='#4FA84A';g.lineWidth=2;for(let i=0;i<260;i++){const x=(i*67)%w,y=(i*131)%h;g.beginPath();g.moveTo(x,y);g.lineTo(x+3,y-8);g.lineTo(x+6,y);g.stroke();}return;}
  g.fillStyle='#D9A86C';g.fillRect(0,0,w,h);g.strokeStyle='#C49158';g.lineWidth=3;for(let y=0;y<h;y+=24){g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();for(let x=((y/24)%2)*70;x<w;x+=140){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+24);g.stroke();}}};}
function utsiktRita(id){return(g,w,h)=>{const sky=(a,b)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,a);gr.addColorStop(1,b);g.fillStyle=gr;g.fillRect(0,0,w,h);};
  const cirkel=(x,y,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,7);g.fill();};
  if(id==='kvall'){sky('#FF8FA3','#FFB37A');cirkel(w*.5,h*.8,30,'#FFE07A');g.fillStyle='#5C3A6B';g.fillRect(0,h*.84,w,h);return;}
  if(id==='natt'){sky('#0E1735','#1B2550');cirkel(w*.75,h*.3,24,'#FFE9A8');cirkel(w*.75+12,h*.3-8,20,'#1B2550');for(let i=0;i<30;i++)cirkel((i*47)%w,(i*29)%(h*.7),i%4?1.5:2.5,'#fff');return;}
  if(id==='hav'){sky('#BDE8FF','#E8F7FF');g.fillStyle='#3D8BFD';g.fillRect(0,h*.58,w,h);g.fillStyle='#fff';g.beginPath();g.moveTo(w*.55,h*.58);g.lineTo(w*.62,h*.3);g.lineTo(w*.62,h*.58);g.fill();return;}
  if(id==='rymd'){sky('#060B1F','#0E1735');for(let i=0;i<40;i++)cirkel((i*53)%w,(i*37)%h,i%5?1.3:2.4,'#fff');cirkel(w*.35,h*.55,34,'#FF9F43');g.strokeStyle='#FFE07A';g.lineWidth=6;g.beginPath();g.ellipse(w*.35,h*.55,58,12,-.2,0,7);g.stroke();cirkel(w*.8,h*.25,12,'#7FA8E8');return;}
  if(id==='mars'){sky('#060B1F','#140F2E');for(let i=0;i<30;i++)cirkel((i*53)%w,(i*37)%h,i%5?1.2:2,'#fff');cirkel(w*.5,h*.55,46,'#C1440E');cirkel(w*.42,h*.48,10,'#9A3209');cirkel(w*.6,h*.62,7,'#9A3209');cirkel(w*.5,h*.55-40,8,'#F3F7FF');return;}
  if(id==='hop'){sky('#050816','#0E1735');for(let i=0;i<140;i++){const a=i*2.4,r=Math.sqrt(i)*7;cirkel(w*.5+Math.cos(a)*r,h*.5+Math.sin(a)*r*.7,i%7?1.2:2.4,['#fff','#FFE7A0','#BFE3FF'][i%3]);}return;}
  if(id==='sno'){sky('#3B4F8A','#6C7FB8');g.fillStyle='#F3F7FF';g.fillRect(0,h*.7,w,h);for(let i=0;i<40;i++)cirkel((i*41)%w,(i*67)%(h*.7),2,'#fff');g.fillStyle='#2B7A4B';g.beginPath();g.moveTo(w*.75,h*.38);g.lineTo(w*.85,h*.72);g.lineTo(w*.65,h*.72);g.fill();return;}
  sky('#8FD0FF','#DDF2FF');cirkel(w*.78,h*.25,22,'#FFD84D');g.fillStyle='#fff';g.beginPath();g.ellipse(w*.3,h*.3,40,14,0,0,7);g.fill();g.fillStyle='#7DCB6E';g.beginPath();g.moveTo(0,h);g.quadraticCurveTo(w*.35,h*.6,w*.65,h*.85);g.quadraticCurveTo(w*.85,h*.7,w,h*.8);g.lineTo(w,h);g.fill();};}
const GARDIN={rod:['#E5484D'],bla:['#3D8BFD'],randig:['#fff','#3D8BFD'],prickig:['#FFE3EE','#FF5FA2'],regnbage:['#FF6B6B','#FF9F43','#FFC93C','#2BB673','#3D8BFD','#7B61FF']};
function gardinRita(id){return(g,w,h)=>{const c=GARDIN[id]||GARDIN.rod;g.fillStyle=c[0];g.fillRect(0,0,w,h);
  if(id==='randig'){g.fillStyle=c[1];for(let x=0;x<w;x+=24)g.fillRect(x,0,12,h);}
  if(id==='prickig'){g.fillStyle=c[1];for(let y=10;y<h;y+=24)for(let x=(y/24%2)*12+6;x<w;x+=24){g.beginPath();g.arc(x,y,5,0,7);g.fill();}}
  if(id==='regnbage')c.forEach((f,i)=>{g.fillStyle=f;g.fillRect(0,i*h/6,w,h/6+1);});
  g.fillStyle='rgba(0,0,0,.12)';for(let x=0;x<w;x+=16)g.fillRect(x,0,4,h);};}

export function byggHusInne(ctx){
  const{THREE:T,S,portalBygg,etikett,cam,reduce}=ctx;
  const V=verktyg(T),{mat,B,C,K,ljus,canvas}=V;
  // golvet utanför rummet: en mjuk platta så att rummet inte svävar
  const utom=new T.Mesh(new T.CircleGeometry(40,40),mat(0xF3E3EC));utom.rotation.x=-Math.PI/2;utom.position.y=-.05;S.W.add(utom);
  ctx.rum=ctx.rum||'hus';S.ref.rum=ctx.rum;
  // dörrarna: en portal en bit in från väggen och en dörrmatta som syns även när portalbågen är gömd
  const dorrar=RUMMEN[ctx.rum].dorrar.map(dd=>{const[px,pz]=vaggPkt(dd.vagg,dd.lx,-.55),[,,nx,nz]=VAGGAR[dd.vagg];
    const po=portalBygg({n:dd.n,e:dd.e,scen:dd.till,c:dd.c},px,pz,px-nx,pz-nz,.62);
    const[mx,mz]=vaggPkt(dd.vagg,dd.lx,-1.4),ry=Math.atan2(nx,nz);
    const mt=new T.Mesh(new T.CircleGeometry(1.5,28),mat(dd.c));mt.rotation.x=-Math.PI/2;mt.rotation.z=ry;mt.scale.y=.6;mt.position.set(mx,.04,mz);S.W.add(mt);
    const tx=new T.Mesh(new T.PlaneGeometry(2.6,.6),new T.MeshBasicMaterial({map:canvas(288,64,(q,w,h)=>{q.fillStyle='#fff';q.font='800 32px "Baloo 2","Trebuchet MS",sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillText(dd.e+' '+dd.n,w/2,h/2+2);}),transparent:true}));
    tx.rotation.x=-Math.PI/2;tx.rotation.z=ry;tx.position.set(mx,.05,mz);S.W.add(tx);
    return{po,vagg:dd.vagg};});
  S.ref.basKoll=S.kollider.slice();
  S.ref.husLiv=[];S.liv.push(t=>{for(const f of S.ref.husLiv)f(t);});
  S.ref.prov={};S.ref.inred=prov=>{S.ref.prov=prov||{};inred(ctx,V,S.ref.prov);FL&&FL.ring();};
  flyttLage(ctx,V);
  inred(ctx,V,{});
  // väggar mellan kameran och rummet göms, så att man alltid ser in (som i ett dockskåp); portalbågen göms med framväggen
  S.liv.push(()=>{for(const w of S.ref.vaggar||[]){const u=(cam.position.x-w.cx)*w.nx+(cam.position.z-w.cz)*w.nz;w.g.visible=u<.3;}
    for(const d of dorrar){const w=(S.ref.vaggar||[]).find(x=>x.namn===d.vagg);d.po.g.visible=!w||w.g.visible;}});
  if(ctx.rum==='lek')nyaTrofeer(ctx);
}

/* Bygger om allt som går att välja. prov = saker man provar men inte köpt ({plats:id}). */
function inred(ctx,V,prov){
  const{THREE:T,S,reduce,lasDjur}=ctx,{mat,B,C,K,ljus,canvas}=V;
  if(S.ref.inr){S.W.remove(S.ref.inr);S.ref.inr.traverse(o=>{if(o.geometry)o.geometry.dispose();const m=o.material;if(m&&m.map)m.map.dispose();});}
  const g=new T.Group();S.ref.inr=g;S.W.add(g);S.ref.husLiv.length=0;S.kollider=S.ref.basKoll.slice();
  const d=MPRum.las(),v=Object.assign({},d.val,prov),liv=S.ref.husLiv,koll=(x,z,r,top)=>S.kollider.push({x,z,r,top}),rum=S.ref.rum||'hus',lek=rum==='lek';
  S.pads=[];S.ref.klick=[];const klick=(o,fn)=>{S.ref.klick.push({o,fn});return o;};
  const tex=(w,h,rit,rx,ry)=>{const t=canvas(w,h,rit);if(rx){t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rx,ry);}return t;};
  // golv
  const golv=new T.Mesh(new T.PlaneGeometry(R*2,R*2),new T.MeshLambertMaterial({map:tex(256,256,golvRita(lek?'lek':v.golv),3,3)}));golv.rotation.x=-Math.PI/2;g.add(golv);
  // väggar med tapet: bak (-z), vänster (-x), höger (+x), fram (+z, med dörren)
  const tapM=new T.MeshLambertMaterial({map:tex(256,128,tapetRita(lek?'lek':v.tapet),4,1)}),list=0xFFFFFF;
  S.ref.vaggar=[];
  const vagg=namn=>{const[cx,cz,nx,nz]=VAGGAR[namn],len=R*2+.3,dorr=RUMMEN[rum].dorrar.find(x=>x.vagg===namn);
    const w=new T.Group();g.add(w);const ry=Math.atan2(nx,nz);w.position.set(cx,0,cz);w.rotation.y=ry;
    const bit=(x0,x1,y0,y1)=>{if(x1-x0<.01)return;const m=new T.Mesh(new T.BoxGeometry(x1-x0,y1-y0,.3),tapM);m.position.set((x0+x1)/2,(y0+y1)/2,0);w.add(m);};
    if(dorr){const a=dorr.lx-1.8,b=dorr.lx+1.8;bit(-len/2,a,0,VH);bit(b,len/2,0,VH);bit(a,b,3.3,VH);}else bit(-len/2,len/2,0,VH);
    const top=new T.Mesh(new T.BoxGeometry(len+.3,.18,.42),mat(list));top.position.y=VH+.09;w.add(top);
    const sockel=new T.Mesh(new T.BoxGeometry(len,.25,.36),mat(list));sockel.position.y=.12;w.add(sockel);
    S.ref.vaggar.push({g:w,cx,cz,nx,nz,namn});return w;};
  const bak=vagg('bak'),vanster=vagg('vanster'),hoger=vagg('hoger');vagg('fram');
  // väggarnas inre sida vetter mot rummet: i väggens grupp är +z ut från rummet, så saker på väggen ligger på z = -0.16 och vrids ett halvt varv
  const paVagg=(w,x,y)=>{const p=new T.Group();p.position.set(x,y,-.16);p.rotation.y=Math.PI;w.add(p);return p;};
  // fönster på bakväggen med utsikt och gardiner
  {const f=paVagg(bak,lek?-PLATS_LEK.teleskop[0]:1.6,2.4);
    const ut=new T.Mesh(new T.PlaneGeometry(2.6,1.9),new T.MeshBasicMaterial({map:tex(256,192,utsiktRita(lek?TELESKOP[S.ref.tsk||0][0]:v.fonster))}));ut.position.z=.02;f.add(ut);S.ref.fonster=ut;
    B(f,2.9,.16,.2,0xFFFFFF,0,1.03,.08);B(f,2.9,.16,.2,0xFFFFFF,0,-1.03,.08);B(f,.16,2.2,.2,0xFFFFFF,-1.38,0,.08);B(f,.16,2.2,.2,0xFFFFFF,1.38,0,.08);
    B(f,.08,1.9,.12,0xFFFFFF,0,0,.08);B(f,2.6,.08,.12,0xFFFFFF,0,0,.08);B(f,3.1,.14,.4,0xFFFFFF,0,-1.12,.2);
    const gt=tex(128,256,gardinRita(lek?'prickig':v.gardin)),gm=new T.MeshLambertMaterial({map:gt});
    B(f,3.8,.1,.1,0x8B5A2B,0,1.32,.28);
    for(const sx of[-1,1]){const p=new T.Mesh(new T.BoxGeometry(.75,2.6,.08),gm);p.position.set(sx*1.75,.05,.3);f.add(p);}}
  S.ref.grupper={};
  if(lek){lekrum(ctx,V,{g,v,d,liv,koll,klick,vanster,paVagg});return;}
  // tavla ovanför sängen
  if(v.tavla&&v.tavla!=='ingen'){const f=paVagg(bak,-PLATS.sang[0],3.25); /* bakväggens grupp är vriden ett halvt varv: x är spegelvänd */const EM={sol:'🌞',karta:'🗺️',portratt:'🦉',hjarta:'💖'},BG={sol:'#BDE3FF',karta:'#BDE3FF',portratt:'#FFF1E0',hjarta:'#FFE3EE'};
    B(f,1.8,1.4,.1,0xC99A0A,0,0,.02);
    const bild=new T.Mesh(new T.PlaneGeometry(1.5,1.1),new T.MeshBasicMaterial({map:tex(160,120,(q,w,h)=>{q.fillStyle=BG[v.tavla]||'#fff';q.fillRect(0,0,w,h);q.font='80px serif';q.textAlign='center';q.textBaseline='middle';q.fillText(EM[v.tavla]||'🖼️',w/2,h/2+4);})}));bild.position.z=.08;f.add(bild);}
  // ljusslingor i taket (längs bak- och vänsterväggen)
  if(v.tak==='slinga'||v.tak==='hjartslinga'){const cols=v.tak==='slinga'?[0xFF5FA2,0xFFC93C,0x3D8BFD,0x2BB673]:[0xE5484D,0xFF7EB6];const kulor=[];
    for(const w of[bak,vanster]){const f=paVagg(w,0,VH-.35);for(let i=0;i<16;i++){const x=-8.4+i*1.12,y=-Math.abs(Math.sin(i*.9))*.3;const k=K(f,.12,ljus(cols[i%cols.length]),x,y,.12);kulor.push(k);}}
    if(!reduce)liv.push(t=>kulor.forEach((k,i)=>k.visible=Math.sin(t*3+i)>-.6));}
  // möbler och saker
  const plats=(id,bygg)=>{const p=(d.pos&&Array.isArray(d.pos[id])&&d.pos[id].length===3)?d.pos[id]:PLATS[id];const q=new T.Group();q.position.set(p[0],0,p[1]);q.rotation.y=p[2];g.add(q);bygg(q);S.ref.grupper[id]=q;return q;};
  const varld=(q,lx,lz)=>{const c=Math.cos(q.rotation.y),s=Math.sin(q.rotation.y);return[q.position.x+c*lx+s*lz,q.position.z-s*lx+c*lz];};
  // säng
  plats('sang',q=>{const id=v.sang;
    if(id==='hangmatta'){for(const sz of[-1.9,1.9]){C(q,.12,.12,2.6,0x8B5A2B,0,1.3,sz);}const duk=new T.Mesh(new T.TorusGeometry(1.9,.32,6,20,Math.PI),mat(0xE8B878));duk.rotation.x=0;duk.rotation.y=Math.PI/2;duk.position.y=2.1;duk.rotation.z=Math.PI;q.add(duk);
      if(!reduce)liv.push(t=>{duk.rotation.x=Math.sin(t*1.2)*.12;});koll(q.position.x,q.position.z,1.2,99);return;}
    if(id==='raket'){C(q,1.2,1.3,3.6,0xE8EDF7,0,1.8,0,16);const n=new T.Mesh(new T.ConeGeometry(1.2,1.6,16),mat(0xE5484D));n.position.y=4.4;q.add(n);
      const fon=C(q,.5,.5,.12,ljus(0xBDE3FF),0,2.6,1.2,16);fon.rotation.x=Math.PI/2;
      for(const sx of[-1,1]){const fe=B(q,.2,1.2,1,0xE5484D,sx*1.3,.6,0);}C(q,.7,.7,.3,0xFFC93C,0,.1,1.25,12);koll(q.position.x,q.position.z,1.4,99);return;}
    const hm=id==='himmel',ram=hm?0xC99A0A:0x8B5A2B,filt=hm?0x7B61FF:0x3D8BFD;
    B(q,2.6,.5,4,ram,0,.45,0);B(q,2.4,.35,3.8,0xFFFFFF,0,.85,0);B(q,2.42,.3,2.6,filt,0,1.05,.6);
    B(q,2.6,1.6,.2,ram,0,.8,-2);B(q,1.4,.3,.7,0xFFFFFF,0,1.15,-1.4);
    if(hm){for(const sx of[-1,1])for(const sz of[-1.9,1.9])C(q,.08,.08,3.4,ram,sx*1.2,1.7,sz,8);B(q,2.7,.12,4.1,0xFFB3D9,0,3.45,0);
      for(const sx of[-1,1])B(q,.05,2.2,3.9,mat(0xFFB3D9,{transparent:true,opacity:.55}),sx*1.28,2.3,0);}
    koll(...varld(q,0,-1),1.35,1.2);koll(...varld(q,0,1),1.35,1.2);});
  // hylla
  if(v.hylla!=='ingen')plats('hylla',q=>{const id=v.hylla;
    if(id==='akvarium'){B(q,2.4,1.1,.9,0x8B5A2B,0,.55,0);const gl=B(q,2.3,1.3,.85,mat(0x9ED8FF,{transparent:true,opacity:.55}),0,1.8,0);B(q,2.2,.2,.8,0xE8C78A,0,1.25,0);
      const fiskar=[0xFF9F43,0xFF5FA2,0xFFC93C].map((c,i)=>K(q,.12,c,0,1.7+i*.2,0,1.6,1,.7));
      // tryck på akvariet: fiskmat faller och fiskarna simmar upp och äter
      const flingor=[0,1,2,3,4,5].map(i=>{const m=B(q,.06,.02,.06,0xC68A4E,(i-2.5)*.25,2.4,0);m.visible=false;return m;});let matad=-99;
      klick(gl,()=>{matad=performance.now()/1000;ctx.toast&&ctx.toast('🐟 Mums! Fiskarna simmar upp och äter.');ton(880,.2,'sine',.15);});
      liv.push(t=>{const sm=performance.now()/1000-matad,ater=sm<6;flingor.forEach((f,i)=>{f.visible=ater&&sm<4+i*.2;f.position.y=Math.max(1.4,2.4-sm*.35*(1+i*.1));f.position.x=(i-2.5)*.25+Math.sin(sm*2+i)*.05;});
        fiskar.forEach((f,i)=>{const a=(reduce?0:t)*(.8+i*.3)+i*2;f.position.x=ater?(i-1)*.45+Math.sin(sm*3+i)*.08:Math.sin(a)*.85;f.position.y+=((ater?2.15:1.7+i*.2)-f.position.y)*.05;f.position.z=ater?0:Math.cos(a*1.3)*.2;f.rotation.y=(ater?Math.sin(sm*3+i):Math.cos(a))>0?0:Math.PI;});});
      koll(q.position.x,q.position.z,1.2,99);return;}
    if(id==='pumpor'){[[-.6,.55,.5],[.6,.4,.38]].forEach(([x,r,s])=>{K(q,r,0xFF8A1F,x,r,0,1.2,1,1.2);C(q,.05,.05,.25,0x2BB673,x,r*2+.1,0,6);const ljusk=K(q,r*.35,ljus(0xFFE07A),x,r,r*1.1);});koll(q.position.x,q.position.z,1,1.1);return;}
    B(q,2.4,3,.7,0xA86B35,0,1.5,0);for(const y of[.9,1.9])B(q,2.2,.08,.6,0x7A4A22,0,y,.05);
    const cols=[0xE5484D,0x3D8BFD,0x2BB673,0xFFC93C,0x7B61FF,0xFF9F43];
    if(id==='bok'){let n=0;for(const y of[.95,1.95,2.95-.05])for(let i=0;i<8;i++)if(y<2.9||i<5){const b=B(q,.18,.6+(i%3)*.08,.45,cols[(i+y*3|0)%6],-.95+i*.24,y+.32,.1);
        const bok=BOCKER[n++%BOCKER.length];klick(b,()=>{b.position.z=.35;ctx.toast&&ctx.toast(bok[2]+' Du öppnar boken '+bok[1]+'…');ton(660,.25,'sine',.15);setTimeout(()=>{try{sessionStorage.setItem('mp-tillbaka-varlden','1');}catch(e){}ctx.lamna&&ctx.lamna('../specialare/#l/'+bok[0]);},1100);});}}
    else{K(q,.28,0xFF6B6B,-.6,1.25,.1);B(q,.45,.5,.4,0xFFC93C,.1,1.2,.1);const ny=new T.Mesh(new T.ConeGeometry(.3,.6,4),mat(0x2BB673));ny.position.set(.75,1.25,.1);q.add(ny);
      K(q,.3,0xC68A4E,-.5,2.25,.1);K(q,.12,0xC68A4E,-.68,2.5,.1);K(q,.12,0xC68A4E,-.32,2.5,.1);B(q,.8,.4,.4,0x3D8BFD,.45,2.15,.1);}
    koll(q.position.x,q.position.z,1.2,99);});
  // matta
  if(v.matta!=='ingen')plats('matta',q=>{const id=v.matta;
    if(id==='regnbage'){[0xFF6B6B,0xFF9F43,0xFFC93C,0x2BB673,0x3D8BFD,0x7B61FF].forEach((c,i)=>{const m=new T.Mesh(new T.CircleGeometry(3.1-i*.45,40),mat(c));m.rotation.x=-Math.PI/2;m.position.y=.02+i*.004;q.add(m);});return;}
    if(id==='handduk'){const m=new T.Mesh(new T.PlaneGeometry(4,2.2),new T.MeshLambertMaterial({map:canvas(160,90,(c2,w,h)=>{['#3D8BFD','#FF7EB6','#FFC93C','#2BB673','#3D8BFD'].forEach((f,i)=>{c2.fillStyle=f;c2.fillRect(i*w/5,0,w/5,h);});})}));m.rotation.x=-Math.PI/2;m.rotation.z=.08;m.position.y=.02;q.add(m);return;}
    const c=id==='fluffig'?0xF3F5FA:0xFF9F43;const m=new T.Mesh(new T.CircleGeometry(3,40),mat(c));m.rotation.x=-Math.PI/2;m.position.y=.02;m.scale.y=.8;q.add(m);
    if(id==='rund'){const r=new T.Mesh(new T.RingGeometry(2.1,2.3,40),mat(0xFFD3A0));r.rotation.x=-Math.PI/2;r.position.y=.03;r.scale.y=.8;q.add(r);}
    if(id==='fluffig')for(let i=0;i<24;i++){const a=i/24*Math.PI*2;K(q,.25,0xFFFFFF,Math.cos(a)*2.85,.06,Math.sin(a)*2.85*.8,1,.4,1);}});
  // växt
  if(v.vaxt!=='ingen')plats('vaxt',q=>{const id=v.vaxt,kruka=c=>C(q,.55,.4,.8,c||0xE07A4E,0,.4,0,12);
    if(id==='kaktus'){kruka();C(q,.3,.3,1.8,0x2BB673,0,1.7,0,10);C(q,.18,.18,.8,0x2BB673,-.45,1.9,0,8).rotation.z=.6;C(q,.18,.18,.7,0x2BB673,.42,2.1,0,8).rotation.z=-.6;}
    else if(id==='palm'){kruka(0x8B5A2B);C(q,.14,.2,3,0xA86B35,0,2.3,0,8);for(let i=0;i<6;i++){const b=B(q,1.8,.06,.45,0x2BB673,0,3.8,0);b.rotation.y=i/6*Math.PI*2;b.translateX(.8);b.rotation.z=-.35;}}
    else if(id==='julgran'){C(q,.15,.15,.6,0x8B5A2B,0,.3,0,8);[[1.1,1.4,1],[.85,1.2,1.8],[.6,1,2.5]].forEach(([r,h,y])=>{const k=new T.Mesh(new T.ConeGeometry(r,h,10),mat(0x2B7A4B));k.position.y=y;q.add(k);});
      const st=K(q,.18,ljus(0xF2C230),0,3.1,0);const kul=[0xE5484D,0xFFC93C,0x3D8BFD,0xFF7EB6].map((c,i)=>K(q,.1,ljus(c),Math.cos(i*1.7)*.75,1.3+i*.35,Math.sin(i*1.7)*.75));if(!reduce)liv.push(t=>kul.forEach((k,i)=>k.visible=Math.sin(t*2.5+i*1.6)>-.5));}
    else if(id==='solros'){kruka();C(q,.06,.06,2.4,0x2BB673,0,1.9,0,6);const h=new T.Group();h.position.set(0,3.1,.1);q.add(h);for(let i=0;i<12;i++){const b=K(h,.22,0xFFC93C,Math.cos(i/12*Math.PI*2)*.45,Math.sin(i/12*Math.PI*2)*.45,0,1,.5,.3);}K(h,.32,0x8B5A2B,0,0,.05,1,1,.4);if(!reduce)liv.push(t=>{h.rotation.z=Math.sin(t*.8)*.12;});}
    else if(id==='paskris'){C(q,.45,.35,.8,mat(0xBDE3FF),0,.4,0,12);[[-.5,2.3],[.1,2.8],[.6,2.4],[-.2,2]].forEach(([x,y],i)=>{C(q,.03,.03,2,0x8B5A2B,x/2,1.6,0,4).rotation.z=-x*.4;K(q,.12,[0xFF7EB6,0xFFC93C,0x2BB673,0x3D8BFD][i],x,y,0,.8,1.3,.8);});}
    else{kruka();for(let i=0;i<7;i++){const b=K(q,.45,i%2?0x2BB673:0x3FAA68,Math.cos(i)*.35,1.2+i*.12,Math.sin(i)*.35,1,.5,1);b.rotation.z=i;}}
    koll(q.position.x,q.position.z,.7,99);});
  // husdjuren från 2D-rummet: på en liten pall
  if(v.husdjur!=='ingen')plats('husdjur',q=>{const id=v.husdjur;B(q,1.4,.8,1.2,0xFFFFFF,0,.4,0);koll(q.position.x,q.position.z,.9,.8);
    const p=new T.Group();p.position.y=.8;q.add(p);
    if(id==='hamster'){const hjul=new T.Mesh(new T.TorusGeometry(.5,.05,6,20),mat(0xAEB9CC));hjul.position.set(0,.6,0);p.add(hjul);const h=K(p,.2,0xF4A259,0,.25,0,1.3,1,1);
      if(!reduce)liv.push(t=>{hjul.rotation.z=t*4;h.position.y=.25+Math.abs(Math.sin(t*8))*.05;});}
    else if(id==='fagel'){for(let i=0;i<8;i++){const a=i/8*Math.PI*2;C(p,.02,.02,1.1,0xC99A0A,Math.cos(a)*.45,.55,Math.sin(a)*.45,4);}const top=new T.Mesh(new T.SphereGeometry(.47,12,6,0,Math.PI*2,0,Math.PI/2),mat(0xC99A0A));top.position.y=1.1;p.add(top);
      const f=new T.Group();f.position.y=.6;p.add(f);K(f,.16,0x3D8BFD,0,0,0,1.2,1,1);K(f,.1,0x3D8BFD,0,.15,.1);const nb=new T.Mesh(new T.ConeGeometry(.04,.12,6),mat(0xFFC93C));nb.rotation.x=Math.PI/2;nb.position.set(0,.15,.22);f.add(nb);
      if(!reduce)liv.push(t=>{f.rotation.z=Math.sin(t*2)*.25;});}
    else if(id==='robot'){const r=new T.Group();p.add(r);B(r,.5,.45,.4,0xAEB9CC,0,.35,0);B(r,.34,.12,.05,ljus(0x7CF0B1),0,.42,.21);C(r,.02,.02,.25,0x56668F,0,.7,0,4);K(r,.06,ljus(0xFF6B6B),0,.85,0);
      if(!reduce)liv.push(t=>{r.rotation.y=Math.sin(t*.9)*.8;r.position.y=Math.abs(Math.sin(t*3))*.06;});}
    else if(id==='spoke'){const s2=new T.Group();p.add(s2);K(s2,.35,mat(0xFFFFFF,{transparent:true,opacity:.9}),0,.6,0,1,1.3,1);K(s2,.06,0x1D2B53,-.12,.7,.3);K(s2,.06,0x1D2B53,.12,.7,.3);
      if(!reduce)liv.push(t=>{s2.position.y=.2+Math.sin(t*1.6)*.2;s2.rotation.y=Math.sin(t*.7)*.5;});}
    else{const k=new T.Group();p.add(k);K(k,.22,0xFFD84D,0,.25,0);K(k,.15,0xFFD84D,0,.5,.08);const nb=new T.Mesh(new T.ConeGeometry(.05,.12,6),mat(0xFF9F43));nb.rotation.x=Math.PI/2;nb.position.set(0,.5,.25);k.add(nb);
      if(!reduce)liv.push(t=>{k.rotation.x=Math.max(0,Math.sin(t*3))*.5;});}});
  // soffa
  if(v.soffa!=='ingen')plats('soffa',q=>{const id=v.soffa;
    if(id==='sacco'){K(q,.95,0xFF7EB6,0,.6,0,1,.65,1);K(q,.6,0xFF7EB6,0,1.05,-.45,1,.8,.7);koll(q.position.x,q.position.z,1,.9);return;}
    if(id==='fatolj'){B(q,1.6,.5,1.4,0x2BA3D8,0,.45,0);B(q,1.6,1.2,.35,0x2BA3D8,0,1,-.55);for(const sx of[-1,1])B(q,.3,.8,1.4,0x1F8BC0,sx*.8,.75,0);koll(q.position.x,q.position.z,1,.7);return;}
    B(q,3.6,.55,1.5,0x7B61FF,0,.45,0);B(q,3.6,1.3,.4,0x7B61FF,0,1,-.6);for(const sx of[-1,1])B(q,.4,.9,1.5,0x6A50EE,sx*1.8,.75,0);
    B(q,.9,.5,.25,0xFFC93C,-1,1.1,-.25).rotation.z=.15;B(q,.9,.5,.25,0xFF7EB6,1,1.1,-.25).rotation.z=-.15;
    koll(...varld(q,-1,0),1,.75);koll(...varld(q,1,0),1,.75);});
  // tv
  if(v.tv!=='ingen')plats('tv',q=>{B(q,2.2,.7,.7,0x8B5A2B,0,.35,0);B(q,2.4,1.4,.12,0x1D2B53,0,1.5,0);
    const sk=new T.Mesh(new T.PlaneGeometry(2.2,1.2),new T.MeshBasicMaterial({color:0x3D8BFD}));sk.position.set(0,1.5,.07);q.add(sk);
    const fa=[0x3D8BFD,0x2BB673,0xFFC93C,0xFF5FA2,0x7B61FF];if(!reduce)liv.push(t=>{sk.material.color.setHex(fa[Math.floor(t*.7)%fa.length]);});
    if(v.tv==='spel'){B(q,.5,.12,.3,0xFFFFFF,-.6,.76,.15);B(q,.4,.08,.25,0x1D2B53,.5,.74,.2);}
    koll(q.position.x,q.position.z,1.1,.7);});
  // bord
  if(v.bord!=='ingen')plats('bord',q=>{const kalas=v.bord==='kalas';
    C(q,1.2,1.2,.12,kalas?0xFFFFFF:0xA86B35,0,1.2,0,24);C(q,.12,.18,1.15,0x8B5A2B,0,.6,0,8);
    for(const[a,c]of[[0,0xFF5FA2],[Math.PI/2,0x3D8BFD],[Math.PI,0xFFC93C],[-Math.PI/2,0x2BB673]]){const x=Math.sin(a)*1.75,z=Math.cos(a)*1.75;B(q,.7,.1,.7,c,x,.7,z);B(q,.1,.7,.1,0x8B5A2B,x,.35,z);
      const rygg=B(q,.7,.8,.1,c,x+Math.sin(a)*.32,1.1,z+Math.cos(a)*.32);rygg.rotation.y=a;}
    if(kalas){C(q,.55,.55,.45,0xFF7EB6,0,1.5,0,20);C(q,.56,.56,.08,0xFFFFFF,0,1.75,0,20);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;C(q,.03,.03,.3,0xFFFFFF,Math.cos(a)*.3,1.92,Math.sin(a)*.3,6);const lag=K(q,.05,ljus(0xFFC93C),Math.cos(a)*.3,2.1,Math.sin(a)*.3);if(!reduce)liv.push(t=>lag.scale.setScalar(.8+Math.sin(t*12+i)*.25));}}
    else{K(q,.18,0xE5484D,-.3,1.4,.2);K(q,.18,0x2BB673,.15,1.4,-.2);}
    koll(q.position.x,q.position.z,1.3,1.25);});
  // kök: kyl, spis, tvättmaskin längs vänsterväggen
  if(v.kyl!=='ingen')plats('kyl',q=>{const r=v.kyl==='retro',c=r?0xE5484D:0xF4F6FA;B(q,1.6,3.4,1.2,c,0,1.7,0);B(q,1.62,.05,1.22,0xC6D6F2,0,2.3,0);
    for(const y of[1.3,2.8])B(q,.08,.6,.1,0xAEB9CC,.6,y,.62);if(r)K(q,.15,0xFFFFFF,-.4,3,.62);
    koll(q.position.x,q.position.z,.9,3.4);});
  if(v.spis!=='ingen')plats('spis',q=>{const p=v.spis==='pizza';
    if(p){B(q,1.6,1.4,1.3,0x8B5A2B,0,.7,0);const ugn=new T.Mesh(new T.SphereGeometry(.85,14,8,0,Math.PI*2,0,Math.PI/2),mat(0xC4673F));ugn.position.y=1.4;q.add(ugn);
      const glod=new T.Mesh(new T.CircleGeometry(.4,16,0,Math.PI),ljus(0xFF9F43));glod.position.set(0,1.42,.82);q.add(glod);if(!reduce)liv.push(t=>glod.material.color.setHSL(.08,1,.55+Math.sin(t*5)*.08));koll(q.position.x,q.position.z,.95,99);return;}
    B(q,1.6,1.8,1.3,0xF4F6FA,0,.9,0);B(q,1.6,.06,1.3,0x1D2B53,0,1.83,0);B(q,1.2,.7,.06,0x1D2B53,0,.8,.66);
    const pl=[[-.4,-.3],[.4,-.3],[-.4,.3],[.4,.3]].map(([x,z])=>C(q,.22,.22,.04,0x56668F,x,1.88,z,16));
    C(q,.32,.28,.4,0xE5484D,-.4,2.1,.3,16);
    koll(q.position.x,q.position.z,.9,1.85);});
  if(v.tvatt!=='ingen')plats('tvatt',q=>{B(q,1.5,1.7,1.3,0xF4F6FA,0,.85,0);const lucka=C(q,.48,.48,.08,0xAEB9CC,0,.8,.66,20);lucka.rotation.x=Math.PI/2;
    const trumma=new T.Mesh(new T.CircleGeometry(.38,20),mat(0x7FA8E8));trumma.position.set(0,.8,.71);q.add(trumma);
    const bubb=[0,1,2].map(i=>K(q,.08,0xFFFFFF,.1*i-.1,.8,.72));if(!reduce)liv.push(t=>{trumma.rotation.z=t*3;bubb.forEach((b,i)=>{const a=t*3+i*2.1;b.position.x=Math.cos(a)*.22;b.position.y=.8+Math.sin(a)*.22;});});
    koll(q.position.x,q.position.z,.85,1.7);});
  // taklampa och discokula hänger från en bjälke
  if(v.tak==='lampa'||v.tak==='disco'){const x=KOMPIS_C[0],z=KOMPIS_C[1];
    C(g,.025,.025,12,0x1D2B53,x,VH-1.3+6,z,4); /* sladden går upp ur bild: rummet har inget tak, så att man ser in */
    if(v.tak==='lampa'){const sk=new T.Mesh(new T.ConeGeometry(.55,.5,16,1,true),mat(0xFF9F43,{side:T.DoubleSide}));sk.position.set(x,VH-1.4,z);g.add(sk);K(g,.18,ljus(0xFFF3B0),x,VH-1.55,z);}
    else{const kula=new T.Group();kula.position.set(x,VH-1.6,z);g.add(kula);K(kula,.45,0xC6D6F2,0,0,0);for(let i=0;i<14;i++){const a=i*2.4,b=Math.acos(1-2*(i+.5)/14);K(kula,.09,ljus(0xFFFFFF),Math.sin(b)*Math.cos(a)*.45,Math.cos(b)*.45,Math.sin(b)*Math.sin(a)*.45);}
      const fl=[0xFF5FA2,0x3D8BFD,0xFFC93C,0x2BB673].map(c=>{const m=new T.Mesh(new T.CircleGeometry(.7,20),new T.MeshBasicMaterial({color:c,transparent:true,opacity:.35,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.y=.06;g.add(m);return m;});
      if(!reduce)liv.push(t=>{kula.rotation.y=t;fl.forEach((m,i)=>{const a=t*.8+i*Math.PI/2;m.position.x=x+Math.cos(a)*3;m.position.z=z+Math.sin(a)*3;});});
      else fl.forEach((m,i)=>{const a=i*Math.PI/2;m.position.x=x+Math.cos(a)*3;m.position.z=z+Math.sin(a)*3;});}}
  // kompisen som går omkring på mattan
  if(v.kompis!=='ingen')kompis(T,V,g,v.kompis,liv,reduce);
  // elevens eget djur på porträttet läses inte här (porträttet visar en uggla-emoji)
}

function kompis(T,V,g,id,liv,reduce){
  const{mat,B,C,K}=V;const k=new T.Group();g.add(k);const kr=new T.Group();k.add(kr);
  const ben=[];const oga=(x,y,z)=>{K(kr,.07,0x1D2B53,x,y,z);};
  if(id==='katt'||id==='hund'){const c=id==='katt'?0xF4A259:0xC68A4E;K(kr,.45,c,0,.65,0,.8,.75,1.3);K(kr,.36,c,0,1.05,.55);oga(-.13,1.12,.85);oga(.13,1.12,.85);K(kr,.06,0xFF7EB6,0,1.02,.9);
    if(id==='katt'){for(const sx of[-1,1]){const o=new T.Mesh(new T.ConeGeometry(.12,.25,4),mat(c));o.position.set(sx*.2,1.4,.5);kr.add(o);}}
    else{for(const sx of[-1,1])K(kr,.14,0x8B5A2B,sx*.33,1.05,.5,.6,1.3,.6);K(kr,.12,0xC68A4E,0,.98,.88,1.3,.8,1);}
    const svans=C(kr,.06,.04,.8,c,0,.95,-.75,6);svans.rotation.x=-.7;
    for(const[x,z]of[[-.22,.4],[.22,.4],[-.22,-.4],[.22,-.4]])ben.push(C(kr,.09,.08,.45,c,x,.22,z,6));
    liv.push(t=>{svans.rotation.z=Math.sin(t*(id==='hund'?12:3))*.5;});}
  else if(id==='kanin'){K(kr,.4,0xF3F5FA,0,.45,0,.9,.85,1.1);K(kr,.28,0xF3F5FA,0,.85,.35);oga(-.1,.92,.6);oga(.1,.92,.6);for(const sx of[-1,1])K(kr,.08,0xF3F5FA,sx*.1,1.3,.3,1,3.5,.6);K(kr,.13,0xFFFFFF,0,.5,-.45);}
  else if(id==='skoldpadda'){const sk=new T.Mesh(new T.SphereGeometry(.6,14,8,0,Math.PI*2,0,Math.PI/2),mat(0x2B7A4B));sk.position.y=.25;kr.add(sk);K(kr,.2,0x7DCB6E,0,.35,.7);oga(-.08,.42,.86);oga(.08,.42,.86);
    for(const[x,z]of[[-.4,.35],[.4,.35],[-.4,-.35],[.4,-.35]])ben.push(K(kr,.13,0x7DCB6E,x,.15,z));}
  else{K(kr,.42,0x1D2B53,0,.7,0,1,1.3,.9);K(kr,.3,0xFFFFFF,0,.65,.2,1,1.2,.6);K(kr,.24,0x1D2B53,0,1.3,0);K(kr,.06,0xFFFFFF,-.09,1.35,.2);K(kr,.06,0xFFFFFF,.09,1.35,.2);const nb=new T.Mesh(new T.ConeGeometry(.07,.2,6),mat(0xFF9F43));nb.rotation.x=Math.PI/2;nb.position.set(0,1.27,.28);kr.add(nb);
    for(const sx of[-1,1])ben.push(K(kr,.12,0xFF9F43,sx*.15,.05,.12,1,.4,1.4));}
  const fart={katt:.45,hund:.6,kanin:.5,skoldpadda:.15,pingvin:.35}[id]||.4,[cx,cz]=KOMPIS_C;
  const pos=t=>{const a=t*fart;return[cx+Math.cos(a)*KOMPIS_R,cz+Math.sin(a*1.3)*KOMPIS_R*.7];};
  liv.push(t=>{const tt=reduce?0:t,[x,z]=pos(tt),[x2,z2]=pos(tt+.05);k.position.set(x,0,z);k.rotation.y=Math.atan2(x2-x,z2-z);
    if(reduce)return;
    if(id==='kanin')kr.position.y=Math.abs(Math.sin(t*6))*.35;
    else if(id==='pingvin')kr.rotation.z=Math.sin(t*6)*.15;
    else ben.forEach((b,i)=>{b.position.y=(b.userData.y0??(b.userData.y0=b.position.y))+Math.max(0,Math.sin(t*10+i*Math.PI/2))*.08;});});
}

/* ---------- Lekrummet: musik, studsmatta eller bollhav, teleskop och troféhyllan ---------- */
function lekrum(ctx,V,{g,v,d,liv,koll,klick,vanster,paVagg}){
  const{THREE:T,S,reduce,P}=ctx,{mat,B,C,K,ljus,canvas}=V;
  const plats=(id,bygg)=>{const p=(d.pos&&Array.isArray(d.pos[id])&&d.pos[id].length===3)?d.pos[id]:PLATS_LEK[id];const q=new T.Group();q.position.set(p[0],0,p[1]);q.rotation.y=p[2];g.add(q);bygg(q);S.ref.grupper[id]=q;return q;};
  const tryck=(m,dy)=>{m.position.y-=dy;setTimeout(()=>m.position.y+=dy,140);};
  // musik
  if(v.musik==='piano')plats('musik',q=>{B(q,3.2,2.4,1,0x2B1D16,0,1.2,-.3);B(q,3.2,.25,1.1,0x2B1D16,0,1.05,.4);B(q,2.9,.06,.02,0xC99A0A,0,2.15,.21);
    for(let i=0;i<8;i++){const k=B(q,.34,.14,.9,0xFFFFFF,-1.21+i*.345,1.22,.5);klick(k,()=>{tryck(k,.06);ton(NOTER[i],1.1);});}
    for(const i of[0,1,3,4,5]){const k=B(q,.2,.14,.55,0x1D2B53,-1.04+i*.345,1.32,.32);klick(k,()=>{tryck(k,.05);ton(NOTER[i]*1.06,1);});}
    B(q,1.4,.12,.5,0x2B1D16,0,.5,1.4);for(const sx of[-.6,.6])B(q,.1,.5,.1,0x2B1D16,sx,.25,1.4);
    koll(q.position.x,q.position.z-.2,1.7,99);});
  if(v.musik==='trummor')plats('musik',q=>{
    const bas=C(q,.75,.75,.6,0xE5484D,0,.75,0,24);bas.rotation.x=Math.PI/2;const fr=C(q,.7,.7,.62,0xFFFFFF,0,.75,0,24);fr.rotation.x=Math.PI/2;fr.scale.set(.98,1,.98);
    klick(bas,()=>{trumma('bas');tryck(bas,.04);});klick(fr,()=>{trumma('bas');});
    const vir=C(q,.4,.4,.3,0xF4F6FA,-.95,1.05,.5,20);C(q,.03,.03,1,0xAEB9CC,-.95,.5,.5,6);klick(vir,()=>{trumma('virvel');tryck(vir,.04);});
    const tom=C(q,.35,.35,.35,0xE5484D,.6,1.55,.2,20);klick(tom,()=>{trumma('tom');tryck(tom,.04);});
    const cym=C(q,.55,.55,.03,0xF2B707,1.05,1.9,.4,24);C(q,.03,.03,1.9,0xAEB9CC,1.05,.95,.4,6);cym.rotation.z=.15;
    klick(cym,()=>{trumma('cymbal');if(!reduce){cym.rotation.x=.35;setTimeout(()=>cym.rotation.x=0,200);}});
    C(q,.35,.4,.55,0x1D2B53,0,.28,1.3,16);koll(q.position.x,q.position.z,1.3,99);});
  if(v.musik==='xylofon')plats('musik',q=>{B(q,2.6,.15,1.2,0x8B5A2B,0,.9,0);for(const sx of[-1.2,1.2])for(const sz of[-.5,.5])B(q,.1,.9,.1,0x8B5A2B,sx,.45,sz);
    const fa=[0xE5484D,0xFF9F43,0xFFC93C,0x2BB673,0x2BA3D8,0x3D5AFE,0x7B61FF,0xFF5FA2];
    for(let i=0;i<8;i++){const k=B(q,.24,.1,1.1-i*.07,fa[i],-1.05+i*.3,1.03,0);klick(k,()=>{tryck(k,.04);ton(NOTER[i]*2,.7,'sine',.25);});}
    koll(q.position.x,q.position.z,1.3,1);});
  // studsmatta: man studsar högt varje gång man landar på den
  if(v.lek==='studsmatta')plats('lek',q=>{const ram=new T.Mesh(new T.TorusGeometry(1.75,.14,8,32),mat(0x3D8BFD));ram.rotation.x=Math.PI/2;ram.position.y=.55;q.add(ram);
    const duk=C(q,1.62,1.62,.04,0x1D2B53,0,.55,0,32);for(let i=0;i<6;i++){const a=i/6*Math.PI*2;C(q,.07,.07,.55,0xAEB9CC,Math.cos(a)*1.7,.27,Math.sin(a)*1.7,6);}
    S.pads.push({x:q.position.x,z:q.position.z,r:1.55,top:.57,boost:17,f:330});koll(q.position.x,q.position.z,1.5,.57);
    liv.push(()=>{const inne=Math.hypot(P.x-q.position.x,P.z-q.position.z)<1.6&&P.y<1.2;duk.scale.y=inne?.3:1;duk.position.y=inne?.42:.55;});});
  // bollhav: bollarna hoppar undan när man går i det
  if(v.lek==='bollhav')plats('lek',q=>{const kant=C(q,2.3,2.3,.7,mat(0xFFFFFF,{side:T.DoubleSide}),0,.35,0,32);kant.material=new T.MeshLambertMaterial({color:0x7FD0F5,side:T.BackSide});
    const kant2=new T.Mesh(new T.CylinderGeometry(2.3,2.3,.7,32,1,true),mat(0x2BA3D8,{side:T.FrontSide}));kant2.position.y=.35;q.add(kant2);const lst=new T.Mesh(new T.TorusGeometry(2.3,.12,8,32),mat(0xFFFFFF));lst.rotation.x=Math.PI/2;lst.position.y=.7;q.add(lst);
    const fa=[0xE5484D,0xFFC93C,0x2BB673,0x3D8BFD,0xFF5FA2,0xFF9F43],bollar=[];
    for(let i=0;i<(ctx.lagt?36:60);i++){const a=i*2.39,r=Math.sqrt((i+.5)/60)*2.05;const b=K(q,.22,fa[i%6],Math.cos(a)*r,.25+(i%3)*.12,Math.sin(a)*r);b.userData={x:b.position.x,z:b.position.z,y:b.position.y,v:0,h:0};bollar.push(b);}
    liv.push(()=>{const lx=P.x-q.position.x,lz=P.z-q.position.z,c=Math.cos(q.rotation.y),s=Math.sin(q.rotation.y),px=lx*c-lz*s,pz=lx*s+lz*c;
      for(const b of bollar){const u=b.userData,dd=Math.hypot(u.x-px,u.z-pz);if(dd<.9&&P.y<1.5&&u.h<=0&&!reduce){u.v=2.2+Math.random()*1.5;}
        if(u.v||u.h>0){u.h+=u.v*.016;u.v-=9*.016;if(u.h<=0){u.h=0;u.v=0;}}b.position.y=u.y+u.h;}});});
  // teleskop: tryck så byts utsikten i fönstret, med en kort fakta
  if(v.teleskop==='teleskop')plats('teleskop',q=>{for(let i=0;i<3;i++){const a=i/3*Math.PI*2,b=C(q,.05,.05,1.9,0x8B5A2B,Math.cos(a)*.35,.9,Math.sin(a)*.35,6);b.rotation.z=Math.cos(a)*.18;b.rotation.x=-Math.sin(a)*.18;}
    const ror=new T.Group();ror.position.y=1.9;ror.rotation.x=-.55;q.add(ror);const tub=C(ror,.22,.17,1.8,0x3D5AFE,0,0,0,16);tub.rotation.x=Math.PI/2;
    const lins=C(ror,.25,.25,.08,0xFFC93C,0,0,.92,16);lins.rotation.x=Math.PI/2;C(ror,.09,.09,.3,0x1D2B53,0,0,-1,10).rotation.x=Math.PI/2;
    const byt=()=>{S.ref.tsk=((S.ref.tsk||0)+1)%TELESKOP.length;const[id,txt]=TELESKOP[S.ref.tsk];const f=S.ref.fonster;if(f){f.material.map.dispose();f.material.map=V.canvas(256,192,utsiktRita(id));f.material.needsUpdate=true;}
      ctx.toast&&ctx.toast(txt);ton(523,.3,'sine',.15);setTimeout(()=>ton(784,.4,'sine',.15),120);};
    klick(tub,byt);klick(lins,byt);koll(q.position.x,q.position.z,.6,99);});
  // troféhyllan på vänsterväggen: troféer förtjänas, de går inte att köpa
  {const f=paVagg(vanster,1,0);const lista=trofeer(ctx);
    for(const y of[1.3,2.3])B(f,5.2,.12,.6,0xA86B35,0,y,.25);
    const skylt=new T.Mesh(new T.PlaneGeometry(3,.6),new T.MeshBasicMaterial({map:canvas(320,64,(q,w,h)=>{q.fillStyle='#FFF4CC';q.beginPath();q.roundRect(2,2,w-4,h-4,24);q.fill();q.fillStyle='#1D2B53';q.font='800 34px "Baloo 2","Trebuchet MS",sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillText('🏆 Mina troféer',w/2,h/2+2);}),transparent:true}));skylt.position.set(0,3.45,.05);f.add(skylt);
    const FARG={brons:0xCD7F32,silver:0xC6CEDC,guld:0xF2B707,diamant:0x7FE3FF};
    lista.forEach((tr,i)=>{const rad=Math.floor(i/5),kol=i%5,x=-2+kol*1,y=1.36+rad;const cup=new T.Group();cup.position.set(x,y,.25);f.add(cup);
      const m=tr.ok?mat(FARG[tr.niva]):mat(0xAEB9CC,{transparent:true,opacity:.45});
      C(cup,.2,.24,.08,m,0,.04,0,12);C(cup,.05,.05,.25,m,0,.2,0,8);const sk=new T.Mesh(new T.CylinderGeometry(.24,.12,.32,14,1,true),m);sk.position.y=.48;cup.add(sk);
      if(tr.ok){for(const sx of[-1,1]){const h=new T.Mesh(new T.TorusGeometry(.09,.025,6,12),m);h.position.set(sx*.26,.5,0);h.rotation.y=Math.PI/2;cup.add(h);}
        const em=new T.Mesh(new T.PlaneGeometry(.34,.34),new T.MeshBasicMaterial({map:canvas(64,64,(q,w,h)=>{q.font='48px serif';q.textAlign='center';q.textBaseline='middle';q.fillText(tr.e,w/2,h/2+3);}),transparent:true}));em.position.set(0,.47,.25);cup.add(em);}
      cup.traverse(o=>{if(o.isMesh)klick(o,()=>{ctx.toast&&ctx.toast(tr.ok?`🏆 ${tr.n}: ${tr.krav}`:`🔒 ${tr.n}: ${tr.krav}`);ton(tr.ok?988:330,.3,'sine',.15);});});});}
}
/* Troféerna räknas fram ur det eleven har gjort på sajten. De kan inte köpas. */
function trofeer(ctx){
  const get=k=>{try{return JSON.parse(localStorage.getItem(k)||'null');}catch(e){return null;}};
  const st=window.MPStjarnor?MPStjarnor():0,m=(window.MPMynt&&MPMynt.get())||{},dg=get('matteportalen-dagar'),dagar=(dg&&dg.days&&dg.days.length)||0,oar=ctx.oar?ctx.oar():{besokta:0,totalt:1};
  return[
    {id:'stj1',n:'Första stjärnan',e:'⭐',niva:'brons',ok:st>=1,krav:'Ta din första stjärna i en övning.'},
    {id:'stj10',n:'Stjärnspanare',e:'🌟',niva:'brons',ok:st>=10,krav:'Samla 10 stjärnor.'},
    {id:'stj50',n:'Stjärnjägare',e:'💫',niva:'silver',ok:st>=50,krav:'Samla 50 stjärnor.'},
    {id:'stj100',n:'Stjärnkapten',e:'🚀',niva:'guld',ok:st>=100,krav:'Samla 100 stjärnor.'},
    {id:'stj250',n:'Stjärnlegend',e:'👑',niva:'diamant',ok:st>=250,krav:'Samla 250 stjärnor.'},
    {id:'dag3',n:'Tre dagar',e:'📅',niva:'brons',ok:dagar>=3,krav:'Träna tre olika dagar.'},
    {id:'dag10',n:'Tio dagar',e:'🗓️',niva:'silver',ok:dagar>=10,krav:'Träna tio olika dagar.'},
    {id:'dag30',n:'Trettio dagar',e:'🏅',niva:'guld',ok:dagar>=30,krav:'Träna trettio olika dagar.'},
    {id:'mynt500',n:'Spargris',e:'🐷',niva:'silver',ok:(m.tj||0)>=500,krav:'Tjäna 500 mynt sammanlagt.'},
    {id:'oar',n:'Upptäckare',e:'🧭',niva:'guld',ok:oar.besokta>=oar.totalt,krav:`Besök alla öar i världen (${Math.min(oar.besokta,oar.totalt)} av ${oar.totalt}).`}];
}
function nyaTrofeer(ctx){const nu=trofeer(ctx).filter(t=>t.ok).map(t=>t.id);let sedda=[];try{sedda=JSON.parse(localStorage.getItem('mp-trofeer-sedda')||'[]');}catch(e){}
  const nya=nu.filter(id=>!sedda.includes(id));try{localStorage.setItem('mp-trofeer-sedda',JSON.stringify(nu));}catch(e){}
  if(nya.length&&ctx.toast){const t=trofeer(ctx).find(x=>x.id===nya[0]);setTimeout(()=>ctx.toast(nya.length===1?`🏆 Ny trofé på hyllan: ${t.n}!`:`🏆 ${nya.length} nya troféer på hyllan!`),900);}}

/* ---------- Flytta möbler: tryck på en möbel i rummet och dra den (fönster, tavla, gardiner och taket sitter fast) ---------- */
const RAD={sang:2.2,hylla:1.3,matta:3,vaxt:.7,husdjur:.9,soffa:1.9,tv:1.2,bord:2.3,kyl:.9,spis:.9,tvatt:.9,musik:1.7,lek:2.3,teleskop:.8};
let FL=null,lyssnar=false;
function flyttLage({THREE:T,S,cam,canvas},V){
  const ray=new T.Raycaster(),ndc=new T.Vector2(),plan=new T.Plane(new T.Vector3(0,1,0),0),pt=new T.Vector3();
  const ring=new T.Mesh(new T.RingGeometry(.92,1,48),new T.MeshBasicMaterial({color:0xFFC93C,transparent:true,opacity:.95,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.07;ring.visible=false;S.W.add(ring);
  const st={pa:false,vald:null,drag:null,cb:null};
  const pek=e=>{const r=canvas.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(ndc,cam);};
  const traff=()=>{let b=null;for(const[sl,gr]of Object.entries(S.ref.grupper||{})){const h=ray.intersectObject(gr,true)[0];if(h&&(!b||h.distance<b.d))b={sl,d:h.distance};}return b&&b.sl;};
  // möbeln stannar i rummet och aldrig framför dörren (annars kommer man inte ut)
  const begr=(sl,x,z)=>{const r=RAD[sl]||1,m=R-.35-(sl==='matta'?0:r);x=Math.max(-m,Math.min(m,x));z=Math.max(-m,Math.min(m,z));
    if(sl!=='matta')for(const dd of RUMMEN[S.ref.rum||'hus'].dorrar){const[cx,cz,nx,nz]=VAGGAR[dd.vagg],tx=-nz,tz=nx;   // väggens riktning
      const[dx,dz]=vaggPkt(dd.vagg,dd.lx,0),langs=(x-dx)*Math.cos(Math.atan2(nx,nz))-(z-dz)*Math.sin(Math.atan2(nx,nz)),djup=-((x-cx)*nx+(z-cz)*nz);
      if(Math.abs(langs)<1.9+r&&djup<2.9+r){const fl=2.9+r-djup;x-=nx*fl;z-=nz*fl;}}
    return[Math.round(x*4)/4,Math.round(z*4)/4];};
  const ringVisa=()=>{const gr=st.vald&&S.ref.grupper[st.vald];ring.visible=!!(st.pa&&gr);if(!gr)return;ring.position.x=gr.position.x;ring.position.z=gr.position.z;const r=RAD[st.vald]||1;ring.scale.set(r+.3,r+.3,1);};
  const spara=sl=>{const gr=S.ref.grupper[sl];if(!gr)return;const d=MPRum.las();d.pos=d.pos||{};d.pos[sl]=[gr.position.x,gr.position.z,Math.round(gr.rotation.y*1000)/1000];d.t['pos:'+sl]=Date.now();MPRum.spara(d);
    window.MPKonto&&MPKonto.puffa&&MPKonto.puffa();S.ref.inred(S.ref.prov);};   // byggs om så att man krockar med möbeln där den står nu
  FL={
    ring:ringVisa,
    satt(pa,cb){st.pa=pa;st.cb=cb||null;if(!pa){st.vald=null;st.drag=null;}ringVisa();},
    vald:()=>st.vald,
    vrid(){const gr=st.vald&&S.ref.grupper[st.vald];if(!gr)return;gr.rotation.y+=Math.PI/4;spara(st.vald);},
    tillbaka(){const sl=st.vald;if(!sl)return;const d=MPRum.las();d.pos=d.pos||{};d.pos[sl]=null;   /* null = standardplatsen (sparas, så att en annan enhet inte lägger tillbaka den gamla) */d.t['pos:'+sl]=Date.now();MPRum.spara(d);S.ref.inred(S.ref.prov);},
    knuffa(dx,dz){const gr=st.vald&&S.ref.grupper[st.vald];if(!gr)return;const[x,z]=begr(st.vald,gr.position.x+dx,gr.position.z+dz);gr.position.x=x;gr.position.z=z;spara(st.vald);},
    // tryck på saker (pianot, böckerna …) när man inte flyttar: ett kort tryck utan att dra
    tryckNed(e){if(st.pa)return;st.tn={x:e.clientX,y:e.clientY,t:performance.now()};},
    tryckUpp(e){const tn=st.tn;st.tn=null;if(st.pa||!tn||!(S.ref.klick||[]).length)return;if(Math.hypot(e.clientX-tn.x,e.clientY-tn.y)>10||performance.now()-tn.t>600)return;
      if(e.target!==canvas)return;pek(e);let b=null;for(const k of S.ref.klick){const h=ray.intersectObject(k.o,true)[0];if(h&&(!b||h.distance<b.d))b={k,d:h.distance};}if(b)b.k.fn();},
    ned(e){FL.tryckNed(e);if(!st.pa||S.id!==FL.id)return;pek(e);const sl=traff();if(!sl)return;e.stopPropagation();e.preventDefault();
      st.vald=sl;const gr=S.ref.grupper[sl];if(ray.ray.intersectPlane(plan,pt))st.drag={id:e.pointerId,dx:gr.position.x-pt.x,dz:gr.position.z-pt.z,flytt:false};ringVisa();st.cb&&st.cb(sl);},
    drag(e){if(!st.drag||e.pointerId!==st.drag.id)return;e.stopPropagation();pek(e);if(!ray.ray.intersectPlane(plan,pt))return;const gr=S.ref.grupper[st.vald];if(!gr)return;
      const[x,z]=begr(st.vald,pt.x+st.drag.dx,pt.z+st.drag.dz);if(x!==gr.position.x||z!==gr.position.z){gr.position.x=x;gr.position.z=z;st.drag.flytt=true;ringVisa();}},
    upp(e){FL.tryckUpp(e);if(!st.drag||e.pointerId!==st.drag.id)return;e.stopPropagation();const f=st.drag.flytt;st.drag=null;if(f)spara(st.vald);},
    id:S.id};
  // lyssnarna läggs bara en gång och går till det rum som är aktivt nu (fångas före världens egna, så att kameran inte vrids medan man drar)
  if(!lyssnar){lyssnar=true;addEventListener('pointerdown',e=>FL&&FL.ned(e),true);addEventListener('pointermove',e=>FL&&FL.drag(e),true);
    addEventListener('pointerup',e=>FL&&FL.upp(e),true);addEventListener('pointercancel',e=>{if(FL){FL.tryckNed({clientX:-999,clientY:-999});FL.upp(e);}},true);}
}

/* ---------- Butiken: "🛒 Inred" ---------- */
const CSS=`#husKnapp[hidden],#husP[hidden]{display:none}
#husP{position:fixed;left:50%;bottom:calc(10px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:11;width:min(760px,calc(100vw - 20px));max-height:min(58vh,520px);display:flex;flex-direction:column;background:#fff;border-radius:24px;box-shadow:0 6px 0 #C6D6F2,0 10px 30px rgba(29,43,83,.18);font-family:"Baloo 2","Trebuchet MS",system-ui,sans-serif;color:#1D2B53}
#husP .hp-top{display:flex;align-items:center;gap:10px;padding:12px 14px 6px}
#husP .hp-top h2{margin:0;font-size:1.25rem;flex:1}
#husP .hp-mynt{font-weight:800;background:#FFF4CC;border-radius:999px;padding:4px 12px}
#husP .hp-tabs{display:flex;gap:6px;overflow-x:auto;padding:4px 14px 8px;scrollbar-width:thin}
#husP .hp-tabs button{flex:none;min-height:40px;padding:0 14px;border-radius:999px;border:0;background:#EAF3FF;color:#1D2B53;font:700 .95rem inherit;font-family:inherit;cursor:pointer}
#husP .hp-tabs button[aria-pressed=true]{background:#3D5AFE;color:#fff}
#husP .hp-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:8px;padding:2px 14px 10px;overflow-y:auto}
#husP .hp-it{display:flex;flex-direction:column;align-items:center;gap:2px;min-height:88px;padding:8px 6px;border-radius:16px;border:0;background:#EAF3FF;box-shadow:0 3px 0 #C6D6F2;color:#1D2B53;font:800 .92rem inherit;font-family:inherit;cursor:pointer;text-align:center;line-height:1.15}
#husP .hp-it:active{transform:translateY(3px);box-shadow:0 0 0 #C6D6F2}
#husP .hp-it .em{font-size:1.7rem;line-height:1.2}
#husP .hp-it small{font-weight:700;color:#56668F}
#husP .hp-it.sel{background:#CFF6DF;box-shadow:0 3px 0 #1E9E5E}
#husP .hp-it.prov{background:#FFF4CC;box-shadow:0 3px 0 #F2B707}
#husP .hp-fot{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:8px 14px 14px;border-top:1px solid #E6EEFB}
#husP .hp-msg{flex:1 1 200px;font-weight:700;font-size:.95rem;color:#56668F;min-height:1.3em}
#husP .hp-b{min-height:48px;padding:0 20px;border-radius:999px;border:0;font:800 1rem inherit;font-family:inherit;cursor:pointer;background:#EAF3FF;color:#1D2B53;box-shadow:0 4px 0 #C6D6F2}
#husP .hp-b.kop{background:#FFC93C;box-shadow:0 4px 0 #C99A0A}
#husP .hp-b:disabled{opacity:.55;cursor:default}
#husP .hp-b[hidden]{display:none}
#husF{position:fixed;left:50%;bottom:calc(10px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:11;width:min(640px,calc(100vw - 20px));display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:12px 14px;background:#fff;border-radius:22px;box-shadow:0 6px 0 #C6D6F2,0 10px 30px rgba(29,43,83,.18);font-family:"Baloo 2","Trebuchet MS",system-ui,sans-serif;color:#1D2B53}
#husF[hidden]{display:none}
#husF .hf-t{flex:1 1 220px;font-weight:800;font-size:1rem;line-height:1.25}
#husF .hp-b{min-height:48px;padding:0 16px;border-radius:999px;border:0;font:800 1rem inherit;font-family:inherit;cursor:pointer;background:#EAF3FF;color:#1D2B53;box-shadow:0 4px 0 #C6D6F2}
#husF .hp-b.ok{background:#1E9E5E;color:#fff;box-shadow:0 4px 0 #157548}
#husF .hp-b:disabled{opacity:.45;cursor:default}
@media (max-width:560px){#husP{max-height:62vh;border-radius:20px}#husP .hp-items{grid-template-columns:repeat(3,1fr)}}`;

export function husButik({S:getS,toast,pling,stoppaRorelse}){
  if(document.getElementById('husP'))return;
  const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
  const knapp=document.createElement('button');knapp.id='husKnapp';knapp.className='btn pill';knapp.type='button';knapp.hidden=true;knapp.innerHTML='🛒<span class="tx"> Inred</span>';knapp.setAttribute('aria-label','Inred ditt hus');
  const topR=document.getElementById('topR');topR&&topR.prepend(knapp);
  const p=document.createElement('div');p.id='husP';p.hidden=true;p.setAttribute('role','dialog');p.setAttribute('aria-label','Inred ditt hus');
  p.innerHTML=`<div class="hp-top"><h2>🛒 Inred ditt hus</h2><span class="hp-mynt" id="hpMynt"></span></div><div class="hp-tabs" id="hpTabs"></div><div class="hp-items" id="hpItems"></div>
    <div class="hp-fot"><span class="hp-msg" id="hpMsg" aria-live="polite"></span><button class="hp-b" id="hpRens" type="button" hidden>Ångra provet</button><button class="hp-b kop" id="hpKop" type="button" hidden></button><button class="hp-b" id="hpFlytt" type="button">✋ Flytta möbler</button><button class="hp-b" id="hpKlar" type="button">✓ Klar</button></div>`;
  document.body.appendChild(p);
  const fb=document.createElement('div');fb.id='husF';fb.hidden=true;fb.setAttribute('role','dialog');fb.setAttribute('aria-label','Flytta möbler');
  fb.innerHTML=`<span class="hf-t" id="hfT" aria-live="polite"></span><button class="hp-b" id="hfVrid" type="button" disabled>↻ Vrid</button><button class="hp-b" id="hfTb" type="button" disabled>↺ Tillbaka</button><button class="hp-b ok" id="hfKlar" type="button">✓ Klar</button>`;
  document.body.appendChild(fb);
  const $=id=>document.getElementById(id);
  const ORDNING=['soffa','bord','sang','tv','kyl','spis','tvatt','kompis','husdjur','matta','vaxt','hylla','tavla','tak','gardin','fonster','tapet','golv','musik','lek','teleskop'];
  let flik='soffa',prov={};
  const rumNu=()=>{const S=getS();return S&&S.id==='lekrum'?'lek':'hus';},flikar=()=>ORDNING.filter(k=>RUM()[k]&&(RUM()[k].rum||'hus')===rumNu());
  const RUM=()=>MPRum.RUM,mynt=()=>(window.MPMynt?MPMynt.get().m:0);
  const provLista=()=>Object.entries(prov).map(([sl,id])=>[sl,id,MPRum.item(sl,id)]).filter(([sl,id,it])=>it&&!MPRum.owned(sl,id)&&MPRum.kanKopa(it));
  const bygg=()=>{const S=getS();if(S&&(S.id==='hus'||S.id==='lekrum')&&S.ref.inred)S.ref.inred(prov);};
  function rita(){
    const d=MPRum.las(),R=RUM();
    $('hpMynt').textContent='🪙 '+mynt();
    if(!flikar().includes(flik))flik=flikar()[0];$('husP').querySelector('h2').textContent=rumNu()==='lek'?'🛒 Inred lekrummet':'🛒 Inred ditt hus';
    $('hpTabs').innerHTML=flikar().map(k=>`<button type="button" data-tab="${k}" aria-pressed="${k===flik}">${R[k].n}</button>`).join('');
    const lista=R[flik].items.filter(it=>MPRum.owned(flik,it[0])||MPRum.kanKopa(it));
    $('hpItems').innerHTML=lista.map(([id,n,em,pris])=>{const har=MPRum.owned(flik,id),cls=d.val[flik]===id&&!prov[flik]?' sel':prov[flik]===id?' prov':'';
      return`<button type="button" class="hp-it${cls}" data-id="${id}"><span class="em">${em}</span>${n}<small>${har?(d.val[flik]===id?'Vald':'Din'):'🪙 '+pris}</small></button>`;}).join('');
    const pv=provLista(),tot=pv.reduce((n,x)=>n+x[2][3],0),m=mynt();
    $('hpRens').hidden=!Object.keys(prov).length;
    if(pv.length){$('hpKop').hidden=false;$('hpKop').disabled=m<tot;
      $('hpKop').textContent=pv.length===1?(m<tot?`Kostar ${tot} 🪙`:`Köp för ${tot} 🪙`):(m<tot?`${pv.length} saker: ${tot} 🪙`:`Köp ${pv.length} saker för ${tot} 🪙`);
      $('hpMsg').textContent='Du provar: '+pv.map(x=>x[2][1]).join(', ')+(m<tot?`. Du har ${m} 🪙. Träna i övningarna så får du fler!`:'');}
    else $('hpKop').hidden=true;
  }
  const oppna=()=>{prov={};p.hidden=false;knapp.setAttribute('aria-pressed','true');stoppaRorelse&&stoppaRorelse();$('hpMsg').textContent='Tryck på en sak för att prova den i huset.';rita();};
  const stang=()=>{p.hidden=true;knapp.setAttribute('aria-pressed','false');if(Object.keys(prov).length){prov={};bygg();}flyttAv();};
  // flyttläget: butiken göms, en liten rad visar vad man gör
  const NAMN=sl=>{const it=MPRum.item(sl,MPRum.las().val[sl]);return it?it[1]:(RUM()[sl]||{}).n||sl;};
  const flyttText=sl=>{$('hfT').textContent=sl?`${NAMN(sl)}: dra den dit du vill.`:'Tryck på en möbel och dra den dit du vill.';$('hfVrid').disabled=$('hfTb').disabled=!sl;};
  function flyttPa(){if(Object.keys(prov).length){prov={};bygg();}p.hidden=true;fb.hidden=false;knapp.setAttribute('aria-pressed','true');stoppaRorelse&&stoppaRorelse();flyttText(null);
    FL&&FL.satt(true,sl=>{flyttText(sl);pling(520,700);});}
  function flyttAv(){if(fb.hidden)return;fb.hidden=true;knapp.setAttribute('aria-pressed','false');FL&&FL.satt(false);}
  $('hpFlytt').onclick=flyttPa;
  $('hfKlar').onclick=()=>{flyttAv();pling(660,990);};
  $('hfVrid').onclick=()=>{FL&&FL.vrid();pling(600,760);};
  $('hfTb').onclick=()=>{FL&&FL.tillbaka();pling(500,420);flyttText(FL&&FL.vald());};
  // piltangenterna knuffar den valda möbeln (i stället för att gå) medan man flyttar
  addEventListener('keydown',e=>{if(fb.hidden||!FL||!FL.vald())return;const k={ArrowLeft:[-.5,0],ArrowRight:[.5,0],ArrowUp:[0,-.5],ArrowDown:[0,.5]}[e.key];
    if(k){e.preventDefault();e.stopPropagation();FL.knuffa(k[0],k[1]);}else if(e.key==='r'||e.key==='R'){e.stopPropagation();FL.vrid();}},true);
  knapp.onclick=()=>(p.hidden&&fb.hidden)?oppna():stang();
  $('hpKlar').onclick=stang;
  $('hpTabs').onclick=e=>{const b=e.target.closest('[data-tab]');if(!b)return;flik=b.dataset.tab;rita();};
  $('hpItems').onclick=e=>{const b=e.target.closest('[data-id]');if(!b)return;const id=b.dataset.id,it=MPRum.item(flik,id);
    if(MPRum.owned(flik,id)){const d=MPRum.las();d.val[flik]=id;d.t[flik]=Date.now();MPRum.spara(d);delete prov[flik];$('hpMsg').textContent=`${it[1]} är vald.`;pling(660,990);window.MPKonto&&MPKonto.puffa&&MPKonto.puffa();}
    else if(MPRum.kanKopa(it)){if(prov[flik]===id)delete prov[flik];else prov[flik]=id;pling(520,620);}
    bygg();rita();};
  $('hpKop').onclick=()=>{const pv=provLista();if(!pv.length||!window.MPMynt)return;let n=0;const d=MPRum.las();
    for(const[sl,id,it]of pv){if(MPMynt.kop('rum:'+sl+':'+id,it[3])){d.val[sl]=id;d.t[sl]=Date.now();delete prov[sl];n++;}else break;}
    if(n){MPRum.spara(d);window.MPKonto&&MPKonto.puffa&&MPKonto.puffa();$('hpMsg').textContent=n===1?`Köpt! ${pv[0][2][1]} är din. 🎉`:`Köpt! ${n} saker är dina. 🎉`;pling(784,1046);setTimeout(()=>pling(1046,1318),150);bygg();rita();}};
  $('hpRens').onclick=()=>{prov={};$('hpMsg').textContent='';bygg();rita();};
  // Escape stänger butiken
  addEventListener('keydown',e=>{if(e.key==='Escape'&&(!p.hidden||!fb.hidden)){stang();e.stopPropagation();}},true);
  return{visa(paa){knapp.hidden=!paa;if(!paa)stang();},oppen:()=>!p.hidden||!fb.hidden};
}
