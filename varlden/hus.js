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

const TAPET={slat:['#DCEBFF'],prickar:['#FFF1E0','#FFB86B'],rander:['#E6F7EE','#C8EEDB'],rutor:['#FCEBF3','#F7D3E4'],stjarnor:['#2B3A67','#FFE07A'],regnbage:['#FFB3B3','#FFD7A8','#FFF1A8','#C9F2C2','#BFE3FF','#D9CCFF']};
function tapetRita(id){return(g,w,h)=>{const c=TAPET[id]||TAPET.slat;g.fillStyle=c[0];g.fillRect(0,0,w,h);
  if(id==='prickar'){g.fillStyle=c[1];g.globalAlpha=.6;for(let y=16;y<h;y+=32)for(let x=(y/32%2)*16+8;x<w;x+=32){g.beginPath();g.arc(x,y,5,0,7);g.fill();}}
  if(id==='rander'){g.fillStyle=c[1];for(let x=0;x<w;x+=40)g.fillRect(x,0,20,h);}
  if(id==='rutor'){g.fillStyle=c[1];g.globalAlpha=.7;for(let x=0;x<w;x+=48)g.fillRect(x,0,24,h);for(let y=0;y<h;y+=48)g.fillRect(0,y,w,24);}
  if(id==='stjarnor'){g.fillStyle=c[1];for(let i=0;i<46;i++){const x=(i*97)%w,y=(i*53)%h;g.beginPath();g.arc(x,y,i%3?1.8:3,0,7);g.fill();}}
  if(id==='regnbage'){c.forEach((f,i)=>{g.fillStyle=f;g.fillRect(0,i*h/6,w,h/6+1);});}
  g.globalAlpha=1;g.fillStyle='rgba(255,255,255,.85)';g.fillRect(0,h-10,w,10);};}
function golvRita(id){return(g,w,h)=>{
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
  const ut=portalBygg({n:'Ut på ön',e:'🏝️',scen:'hub',c:0x1E9E5E},0,8.75,0,0,.62);
  // dörrmattan syns alltid, även när portalbågen är gömd
  const matta=new T.Mesh(new T.CircleGeometry(1.5,28),mat(0x1E9E5E));matta.rotation.x=-Math.PI/2;matta.scale.y=.6;matta.position.set(0,.04,7.9);S.W.add(matta);
  const mtxt=new T.Mesh(new T.PlaneGeometry(2.4,.6),new T.MeshBasicMaterial({map:canvas(256,64,(q,w,h)=>{q.fillStyle='#fff';q.font='800 34px "Baloo 2","Trebuchet MS",sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillText('🏝️ Ut på ön',w/2,h/2+2);}),transparent:true}));
  mtxt.rotation.x=-Math.PI/2;mtxt.position.set(0,.05,7.9);S.W.add(mtxt);
  S.ref.basKoll=S.kollider.slice();
  S.ref.husLiv=[];S.liv.push(t=>{for(const f of S.ref.husLiv)f(t);});
  S.ref.inred=prov=>inred(ctx,V,prov);
  inred(ctx,V,{});
  // väggar mellan kameran och rummet göms, så att man alltid ser in (som i ett dockskåp); portalbågen göms med framväggen
  S.liv.push(()=>{for(const w of S.ref.vaggar||[]){const u=(cam.position.x-w.cx)*w.nx+(cam.position.z-w.cz)*w.nz;w.g.visible=u<.3;}
    ut.g.visible=cam.position.z<ut.g.position.z-.5;});
}

/* Bygger om allt som går att välja. prov = saker man provar men inte köpt ({plats:id}). */
function inred(ctx,V,prov){
  const{THREE:T,S,reduce,lasDjur}=ctx,{mat,B,C,K,ljus,canvas}=V;
  if(S.ref.inr){S.W.remove(S.ref.inr);S.ref.inr.traverse(o=>{if(o.geometry)o.geometry.dispose();const m=o.material;if(m&&m.map)m.map.dispose();});}
  const g=new T.Group();S.ref.inr=g;S.W.add(g);S.ref.husLiv.length=0;S.kollider=S.ref.basKoll.slice();
  const d=MPRum.las(),v=Object.assign({},d.val,prov),liv=S.ref.husLiv,koll=(x,z,r,top)=>S.kollider.push({x,z,r,top});
  const tex=(w,h,rit,rx,ry)=>{const t=canvas(w,h,rit);if(rx){t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rx,ry);}return t;};
  // golv
  const golv=new T.Mesh(new T.PlaneGeometry(R*2,R*2),new T.MeshLambertMaterial({map:tex(256,256,golvRita(v.golv),3,3)}));golv.rotation.x=-Math.PI/2;g.add(golv);
  // väggar med tapet: bak (-z), vänster (-x), höger (+x), fram (+z, med dörren)
  const tapM=new T.MeshLambertMaterial({map:tex(256,128,tapetRita(v.tapet),4,1)}),list=0xFFFFFF;
  S.ref.vaggar=[];
  const vagg=(cx,cz,nx,nz,len,medDorr)=>{const w=new T.Group();g.add(w);const ry=Math.atan2(nx,nz);w.position.set(cx,0,cz);w.rotation.y=ry;
    if(medDorr){const sid=(len-3.6)/2;for(const sx of[-1,1]){const m=new T.Mesh(new T.BoxGeometry(sid,VH,.3),tapM);m.position.set(sx*(1.8+sid/2),VH/2,0);w.add(m);}
      const ov=new T.Mesh(new T.BoxGeometry(3.6,VH-3.3,.3),tapM);ov.position.set(0,3.3+(VH-3.3)/2,0);w.add(ov);}
    else{const m=new T.Mesh(new T.BoxGeometry(len,VH,.3),tapM);m.position.y=VH/2;w.add(m);}
    const top=new T.Mesh(new T.BoxGeometry(len+.3,.18,.42),mat(list));top.position.y=VH+.09;w.add(top);
    const sockel=new T.Mesh(new T.BoxGeometry(len,.25,.36),mat(list));sockel.position.y=.12;w.add(sockel);
    S.ref.vaggar.push({g:w,cx,cz,nx,nz});return w;};
  const bak=vagg(0,-R,0,-1,R*2+.3),vanster=vagg(-R,0,-1,0,R*2+.3),hoger=vagg(R,0,1,0,R*2+.3);vagg(0,R,0,1,R*2+.3,true);
  // väggarnas inre sida vetter mot rummet: i väggens grupp är +z ut från rummet, så saker på väggen ligger på z = -0.16 och vrids ett halvt varv
  const paVagg=(w,x,y)=>{const p=new T.Group();p.position.set(x,y,-.16);p.rotation.y=Math.PI;w.add(p);return p;};
  // fönster på bakväggen med utsikt och gardiner
  {const f=paVagg(bak,1.6,2.4);
    const ut=new T.Mesh(new T.PlaneGeometry(2.6,1.9),new T.MeshBasicMaterial({map:tex(256,192,utsiktRita(v.fonster))}));ut.position.z=.02;f.add(ut);
    B(f,2.9,.16,.2,0xFFFFFF,0,1.03,.08);B(f,2.9,.16,.2,0xFFFFFF,0,-1.03,.08);B(f,.16,2.2,.2,0xFFFFFF,-1.38,0,.08);B(f,.16,2.2,.2,0xFFFFFF,1.38,0,.08);
    B(f,.08,1.9,.12,0xFFFFFF,0,0,.08);B(f,2.6,.08,.12,0xFFFFFF,0,0,.08);B(f,3.1,.14,.4,0xFFFFFF,0,-1.12,.2);
    const gt=tex(128,256,gardinRita(v.gardin)),gm=new T.MeshLambertMaterial({map:gt});
    B(f,3.8,.1,.1,0x8B5A2B,0,1.32,.28);
    for(const sx of[-1,1]){const p=new T.Mesh(new T.BoxGeometry(.75,2.6,.08),gm);p.position.set(sx*1.75,.05,.3);f.add(p);}}
  // tavla ovanför sängen
  if(v.tavla&&v.tavla!=='ingen'){const f=paVagg(bak,-PLATS.sang[0],3.25); /* bakväggens grupp är vriden ett halvt varv: x är spegelvänd */const EM={sol:'🌞',karta:'🗺️',portratt:'🦉',hjarta:'💖'},BG={sol:'#BDE3FF',karta:'#BDE3FF',portratt:'#FFF1E0',hjarta:'#FFE3EE'};
    B(f,1.8,1.4,.1,0xC99A0A,0,0,.02);
    const bild=new T.Mesh(new T.PlaneGeometry(1.5,1.1),new T.MeshBasicMaterial({map:tex(160,120,(q,w,h)=>{q.fillStyle=BG[v.tavla]||'#fff';q.fillRect(0,0,w,h);q.font='80px serif';q.textAlign='center';q.textBaseline='middle';q.fillText(EM[v.tavla]||'🖼️',w/2,h/2+4);})}));bild.position.z=.08;f.add(bild);}
  // ljusslingor i taket (längs bak- och vänsterväggen)
  if(v.tak==='slinga'||v.tak==='hjartslinga'){const cols=v.tak==='slinga'?[0xFF5FA2,0xFFC93C,0x3D8BFD,0x2BB673]:[0xE5484D,0xFF7EB6];const kulor=[];
    for(const w of[bak,vanster]){const f=paVagg(w,0,VH-.35);for(let i=0;i<16;i++){const x=-8.4+i*1.12,y=-Math.abs(Math.sin(i*.9))*.3;const k=K(f,.12,ljus(cols[i%cols.length]),x,y,.12);kulor.push(k);}}
    if(!reduce)liv.push(t=>kulor.forEach((k,i)=>k.visible=Math.sin(t*3+i)>-.6));}
  // möbler och saker
  const plats=(id,bygg)=>{const p=PLATS[id];const q=new T.Group();q.position.set(p[0],0,p[1]);q.rotation.y=p[2];g.add(q);bygg(q);return q;};
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
      if(!reduce)liv.push(t=>fiskar.forEach((f,i)=>{const a=t*(.8+i*.3)+i*2;f.position.x=Math.sin(a)*.85;f.position.z=Math.cos(a*1.3)*.2;f.rotation.y=Math.cos(a)>0?0:Math.PI;}));
      koll(q.position.x,q.position.z,1.2,99);return;}
    if(id==='pumpor'){[[-.6,.55,.5],[.6,.4,.38]].forEach(([x,r,s])=>{K(q,r,0xFF8A1F,x,r,0,1.2,1,1.2);C(q,.05,.05,.25,0x2BB673,x,r*2+.1,0,6);const ljusk=K(q,r*.35,ljus(0xFFE07A),x,r,r*1.1);});koll(q.position.x,q.position.z,1,1.1);return;}
    B(q,2.4,3,.7,0xA86B35,0,1.5,0);for(const y of[.9,1.9])B(q,2.2,.08,.6,0x7A4A22,0,y,.05);
    const cols=[0xE5484D,0x3D8BFD,0x2BB673,0xFFC93C,0x7B61FF,0xFF9F43];
    if(id==='bok'){for(const y of[.95,1.95,2.95-.05])for(let i=0;i<8;i++)if(y<2.9||i<5)B(q,.18,.6+(i%3)*.08,.45,cols[(i+y*3|0)%6],-.95+i*.24,y+.32,.1);}
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
@media (max-width:560px){#husP{max-height:62vh;border-radius:20px}#husP .hp-items{grid-template-columns:repeat(3,1fr)}}`;

export function husButik({S:getS,toast,pling,stoppaRorelse}){
  if(document.getElementById('husP'))return;
  const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
  const knapp=document.createElement('button');knapp.id='husKnapp';knapp.className='btn pill';knapp.type='button';knapp.hidden=true;knapp.innerHTML='🛒<span class="tx"> Inred</span>';knapp.setAttribute('aria-label','Inred ditt hus');
  const topR=document.getElementById('topR');topR&&topR.prepend(knapp);
  const p=document.createElement('div');p.id='husP';p.hidden=true;p.setAttribute('role','dialog');p.setAttribute('aria-label','Inred ditt hus');
  p.innerHTML=`<div class="hp-top"><h2>🛒 Inred ditt hus</h2><span class="hp-mynt" id="hpMynt"></span></div><div class="hp-tabs" id="hpTabs"></div><div class="hp-items" id="hpItems"></div>
    <div class="hp-fot"><span class="hp-msg" id="hpMsg" aria-live="polite"></span><button class="hp-b" id="hpRens" type="button" hidden>Ångra provet</button><button class="hp-b kop" id="hpKop" type="button" hidden></button><button class="hp-b" id="hpKlar" type="button">✓ Klar</button></div>`;
  document.body.appendChild(p);
  const $=id=>document.getElementById(id);
  const ORDNING=['soffa','bord','sang','tv','kyl','spis','tvatt','kompis','husdjur','matta','vaxt','hylla','tavla','tak','gardin','fonster','tapet','golv'];
  let flik='soffa',prov={};
  const RUM=()=>MPRum.RUM,mynt=()=>(window.MPMynt?MPMynt.get().m:0);
  const provLista=()=>Object.entries(prov).map(([sl,id])=>[sl,id,MPRum.item(sl,id)]).filter(([sl,id,it])=>it&&!MPRum.owned(sl,id)&&MPRum.kanKopa(it));
  const bygg=()=>{const S=getS();if(S&&S.id==='hus'&&S.ref.inred)S.ref.inred(prov);};
  function rita(){
    const d=MPRum.las(),R=RUM();
    $('hpMynt').textContent='🪙 '+mynt();
    $('hpTabs').innerHTML=ORDNING.filter(k=>R[k]).map(k=>`<button type="button" data-tab="${k}" aria-pressed="${k===flik}">${R[k].n}</button>`).join('');
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
  const stang=()=>{p.hidden=true;knapp.setAttribute('aria-pressed','false');if(Object.keys(prov).length){prov={};bygg();}};
  knapp.onclick=()=>p.hidden?oppna():stang();
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
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!p.hidden){stang();e.stopPropagation();}},true);
  return{visa(paa){knapp.hidden=!paa;if(!paa)stang();},oppen:()=>!p.hidden};
}
