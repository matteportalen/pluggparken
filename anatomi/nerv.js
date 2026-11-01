/* Hjärnan och nerverna: en lysande signal följer en nerv från ett finger som rört vid något hett, genom ryggmärgen (reflexen),
   upp till hjärnan (hjärnbarken, lillhjärnan, hjärnstammen) och tillbaka ut till musklerna.
   Röstfiler: ../ljud/nervresan/s<n>-1.mp3 (s0 inledning, s1–s8 stegen, s9 avslutning). Manus: manus/nervresan-manus.txt.
   Vägarna är räknade ur modellens egna nerver (medelpunkter av nervens hörn på olika höjder, vänster arm = +x). */
const STG=[
 {id:"finger",namn:"Känseln i fingret",tid:"bråkdelen av en sekund",dur:11.4,c:0xff8a3a,hl:["armnerver"],t:"Du kommer åt en varm kastrull med fingret. I huden finns små sinnesceller som känner av värme, tryck och smärta. När de blir retade skickar de iväg en signal."},
 {id:"nerven",namn:"Längs nerven",tid:"några hundradels sekunder",dur:20.4,c:0xffe45a,hl:["armnerver","armflata"],t:"Signalen åker längs en nerv. Nerverna är långa nervceller, som tunna trådar, och signalen är en liten elektrisk puls. Hos de snabbaste nerverna färdas den över hundra meter per sekund, snabbare än en racerbil. Värme- och smärtsignaler går lite långsammare, men ändå snabbt nog."},
 {id:"rygg",namn:"Ryggmärgen",tid:"några hundradels sekunder",dur:12.7,c:0xffe45a,hl:["ryggmarg","armflata"],t:"Signalen går upp genom armen och in i ryggmärgen, som ligger skyddad inne i ryggraden. Här händer något smart. Signalen hoppar direkt över till en annan nerv, utan att vänta på hjärnan."},
 {id:"reflex",namn:"Reflexen",tid:"under en tiondels sekund",dur:12.1,c:0xffa040,hl:["armnerver","armflata","biceps","underarm"],t:"Den nerven leder ut till armens muskler, och de drar ihop sig. Handen åker bort från kastrullen. Det kallas en reflex, och den hinner bli klar innan du ens har förstått vad som hände."},
 {id:"upp",namn:"Upp till hjärnan",tid:"ungefär en tiondels sekund",dur:13.1,c:0xffe45a,hl:["ryggmarg","hjarna"],t:"Samtidigt går signalen vidare upp längs ryggmärgen och in i hjärnan. Hjärnan är kroppens kontrollcentral. Den har ungefär åttiosex miljarder nervceller, som pratar med varandra hela tiden."},
 {id:"barken",namn:"Hjärnbarken",tid:"en kort stund",dur:14.2,c:0xff9be8,hl:["hjarna"],t:"Först kommer signalen till hjärnbarken, den veckade ytan längst ut. Här förstår du vad som hände: det var hett, och det gjorde ont. Här tänker du, minns du och bestämmer du. Nästa gång tar du dig i akt."},
 {id:"lilla",namn:"Lillhjärnan och hjärnstammen",tid:"hela tiden, utan att du tänker på det",dur:13.9,c:0x8ad0ff,hl:["hjarna","ryggmarg"],t:"Längre ner och bakåt sitter lillhjärnan, som ser till att du håller balansen och rör dig mjukt. Längst ner ligger hjärnstammen. Den sköter andningen och hjärtat, utan att du behöver tänka på det."},
 {id:"ut",namn:"Svar från hjärnan",tid:"ungefär en tiondels sekund",dur:13.2,c:0xffe45a,hl:["hjarna","ryggmarg","armflata","armnerver","biceps","underarm"],t:"Hjärnan skickar också signaler åt andra hållet, ut till musklerna. Du kan skaka handen, blåsa på fingret eller gå och hämta kallt vatten. Du bestämmer själv, och hjärnan lägger det på minnet."}];
const INTRO="Följ med en signal på en resa genom kroppen. Du rör vid något hett, och på en bråkdel av en sekund drar du bort handen. Här går allt mycket långsammare än i verkligheten.";
const FIN="Nu har du följt en signal hela vägen genom kroppen, från fingret till hjärnan och tillbaka. Du kan se resan igen, eller dra i reglaget och titta närmare på ett steg.";
const P0=[[.283,.703,.092],[.281,.723,.075],[.272,.75,.057],[.28,.778,.05],[.27,.80,.04],[.268,.82,.036],[.262,.845,.033]];
const P1=[[.262,.845,.033],[.243,.885,.02],[.23,.921,.01],[.221,.958,-.001],[.214,1.001,-.008],[.215,1.039,-.018],[.213,1.083,-.022],[.215,1.122,-.022],[.21,1.161,-.026],[.202,1.198,-.032],[.194,1.24,-.029],[.185,1.282,-.023],[.17,1.319,-.018],[.144,1.36,-.018],[.114,1.392,-.015],[.082,1.42,-.021],[.059,1.439,-.017],[.037,1.454,-.018],[.022,1.464,-.021]];
const P2=[[.022,1.464,-.021],[.012,1.46,-.027],[.002,1.455,-.032],[-.004,1.462,-.034],[-.002,1.448,-.034],[.004,1.455,-.032],[.012,1.46,-.027]];
const P3=[[.012,1.46,-.027],[.022,1.464,-.021],[.037,1.454,-.018],[.059,1.439,-.017],[.082,1.42,-.021],[.114,1.392,-.015],[.144,1.36,-.018],[.17,1.319,-.018],[.185,1.282,-.023],[.194,1.24,-.029],[.202,1.198,-.032],[.21,1.161,-.026],[.215,1.122,-.022],[.213,1.083,-.022],[.215,1.039,-.018],[.214,1.001,-.008],[.221,.958,-.001]];
const P4=[[0,1.453,-.032],[0,1.475,-.027],[0,1.499,-.023],[0,1.52,-.025],[0,1.537,-.028],[0,1.558,-.03],[0,1.58,-.022],[0,1.61,-.012],[0,1.625,0]];
const P5=[[0,1.625,0],[0,1.64,.012],[.025,1.672,.03],[.05,1.665,.062],[.06,1.64,.068],[.062,1.62,.03],[.058,1.63,-.03],[.048,1.665,-.062],[.024,1.69,-.04],[0,1.697,-.01],[-.024,1.69,-.04],[-.048,1.665,-.062],[-.058,1.63,-.03],[-.062,1.62,.03],[-.05,1.64,.06]];
const P6=[[-.05,1.64,.06],[-.03,1.62,-.04],[0,1.605,-.075],[.03,1.59,-.085],[0,1.578,-.095],[-.03,1.585,-.08],[0,1.592,-.062],[0,1.575,-.04],[0,1.562,-.026],[0,1.548,-.027]];
const P7=[[0,1.675,.02],[0,1.64,.0],[0,1.61,-.012],[0,1.58,-.022],[0,1.558,-.03],[0,1.537,-.028],[0,1.499,-.023],[0,1.475,-.027],[0,1.453,-.032],...P1.slice().reverse().slice(0,P1.length),...P0.slice().reverse().slice(1)].map(p=>p.slice());
const FINGER=P0[0],CORD=[0,1.455,-.032];
const MUS=new Set(["biceps","triceps","underarm","delta"]);
const GRP=new Set(["skelett","organ","nerver","muskler","hud"]);
const ELEC=[0xffe45a,0xffffff,0xfff2a0];
export function nervStory(H){
 const {THREE,all,grp}=H;
 const col=new THREE.Color(),c2=new THREE.Color();
 const mix=(a,b,t)=>{col.setHex(a);c2.setHex(b);return col.lerp(c2,Math.max(0,Math.min(1,t)));};
 const V=THREE.Vector3,rnd=a=>(Math.random()-.5)*a;
 const rt=(()=>{const c=document.createElement("canvas");c.width=c.height=128;const g=c.getContext("2d"),r=g.createRadialGradient(64,64,40,64,64,62);r.addColorStop(0,"rgba(255,255,255,0)");r.addColorStop(.7,"rgba(255,255,255,.9)");r.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=r;g.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);})();
 const lbl=(txt)=>{const c=document.createElement("canvas");c.width=512;c.height=112;const g=c.getContext("2d");g.font="700 40px Inter,system-ui,sans-serif";const w=g.measureText(txt).width+56;
  g.fillStyle="rgba(8,20,36,.82)";g.strokeStyle="rgba(120,220,255,.8)";g.lineWidth=3;const x=(512-w)/2,y=24,h=64,r=32;g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();g.fill();g.stroke();
  g.fillStyle="#e8f6ff";g.textAlign="center";g.textBaseline="middle";g.fillText(txt,256,58);const t=new THREE.CanvasTexture(c);return new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false,opacity:0}));};
 const glow=(hex,sc,pos)=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:H.tex,color:hex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0}));s.scale.setScalar(sc);s.position.set(...pos);s.renderOrder=13;return s;};
 function bygg(o){const NF=150,pos=new Float32Array(NF*3),cl=new Float32Array(NF*3),sd=[];
  for(let k=0;k<NF;k++)sd.push({p:Math.random(),v:.6+Math.random()*.9,a:Math.random()*6.283,r:Math.random()*.006});
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(cl,3));
  const pts=new THREE.Points(g,new THREE.PointsMaterial({size:.0085,map:H.tex,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true}));pts.frustumCulled=false;pts.renderOrder=9;
  const rings=[];for(let k=0;k<3;k++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:rt,color:0xffe45a,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0}));sp.renderOrder=14;o.grpR.add(sp);rings.push({sp,t:9,sc:1});}
  const pot=glow(0xff4a14,.12,[FINGER[0]+.002,FINGER[1]-.032,FINGER[2]+.015]);
  const mk=glow(0xff7ad8,.2,[0,1.655,.02]),ml=glow(0x5ab4ff,.1,[0,1.585,-.08]),ms=glow(0x5affb0,.07,[0,1.558,-.028]);
  const lc=lbl("Hjärnbarken"),ll=lbl("Lillhjärnan"),ls=lbl("Hjärnstammen");
  lc.position.set(.1,1.71,.02);lc.scale.set(.13,.028,1);ll.position.set(.1,1.57,-.1);ll.scale.set(.12,.026,1);ls.position.set(-.1,1.535,-.03);ls.scale.set(.13,.028,1);
  o.grpR.add(pts,pot,mk,ml,ms,lc,ll,ls);
  const lines=H.VAG().kurvor.map((cv,i)=>{const n=Math.max(30,Math.round(cv.getLength()/.003)),a=new Float32Array(n*3);for(let k=0;k<n;k++){const p=cv.getPointAt(k/(n-1));a[k*3]=p.x;a[k*3+1]=p.y;a[k*3+2]=p.z;}
   const gg=new THREE.BufferGeometry();gg.setAttribute("position",new THREE.BufferAttribute(a,3));
   const l=new THREE.Points(gg,new THREE.PointsMaterial({size:.008,map:H.tex,color:STG[i].c,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true}));l.frustumCulled=false;l.renderOrder=8;o.grpR.add(l);return l;});
  o.nv={lines,NF,pos,cl,sd,g,pts,rings,ri:0,tt:0,pot,mk,ml,ms,lc,ll,ls,ev:{},last:-1,beat:0};}
 function flash(o,p,colr,sc){const f=o.nv,r=f.rings[f.ri++%3];r.t=0;r.sc=sc||1;r.sp.material.color.setHex(colr);r.sp.position.set(...p);}
 function burst(n,p,colr,w){for(let k=0;k<n;k++){const a=new V(...p),b=new V(p[0]+rnd(w),p[1]+rnd(w),p[2]+rnd(w));H.nyPartikel("a",a,b,.55+Math.random()*.4,colr);}}
 const lerpO=(m,t,dt,k)=>{m.opacity+=(t-m.opacity)*Math.min(1,dt*(k||4));};
 return {namn:"Hjärnan och nerverna",rost:"nervresan",STG,INTRO,FIN,SPAR:new Set(),orbit:.2,
  introD:1.35,
  dd:[1.3,1.15,.55,.85,.6,.34,.3,.95],
  ladda:async()=>({kurvor:[P0,P1,P2,P3,P4,P5,P6,P7].map(a=>new THREE.CatmullRomCurve3(a.map(p=>new V(...p)),false,"centripetal"))}),
  setup(){for(const k of Object.keys(grp))grp[k].visible=GRP.has(k);
   for(const o of all){const s=o.userData.s;if(!GRP.has(s))continue;const m=o.material.clone();m.transparent=true;m.opacity=s==="skelett"?.04:0;
    if(m.emissive){m.emissive.set(s==="nerver"?0xffd84a:s==="muskler"?0xff7a2e:s==="hud"?0x6ab8ff:0xff8ad8);}m.emissiveIntensity=0;o.material=m;o.visible=s==="skelett";}},
  kern:(i,u)=>.0075*([1.9,1.9,1.2,1.7,1.2,1,1,1.9][i])*(1+.15*Math.sin(performance.now()/160)),
  farg:(i,u)=>(i===0?mix(0xff5a1a,0xffe45a,u*1.5):i===2?mix(0xffe45a,0xffa040,Math.max(0,(u-.55)*2.2)):mix(STG[i].c,STG[i].c,0)).getHex(),
  sprut(dt,i,bol,u){const R=H.R();if(!R)return;const o=R.ob;if(!o.nv)bygg(o);const f=o.nv,cur=H.VAG().kurvor[i];f.tt+=dt;
   if(f.last!==i){f.last=i;f.ev={};}
   const once=(k,c,fn)=>{if(c&&!f.ev[k]){f.ev[k]=1;fn();}};
   // elektriska pulser längs nerven
   const strong=i===1||i===3||i===4||i===7,fa=f.cl,fp=f.pos;
   for(let k=0;k<f.NF;k++){const q=f.sd[k];q.p=(q.p+dt*.16*q.v*(i===7?.55:i===2?.5:1))%1;const pnt=cur.getPointAt(Math.min(.9999,q.p));
    fp[k*3]=pnt.x+Math.cos(q.a+f.tt*5)*q.r;fp[k*3+1]=pnt.y+Math.sin(q.a*1.7+f.tt*4)*q.r;fp[k*3+2]=pnt.z+Math.sin(q.a+f.tt*5)*q.r;
    const e=Math.sin(Math.PI*q.p),fl=.5+.5*Math.sin(f.tt*14+q.a*5),br=(strong?1:i===0?.5:.7)*Math.pow(e,.5)*(.4+.6*fl);
    const cc=i===5?mix(0xff9be8,0xffffff,fl):i===6?mix(0x8ad0ff,0xffffff,fl):mix(0xffd84a,0xffffff,fl);fa[k*3]=cc.r*br;fa[k*3+1]=cc.g*br;fa[k*3+2]=cc.b*br;}
   f.g.attributes.position.needsUpdate=true;f.g.attributes.color.needsUpdate=true;
   // ringar
   for(const r of f.rings){r.t+=dt;const a=Math.min(1,r.t/.9);r.sp.material.opacity=a<1?(1-a)*.9:0;const sc=(.03+a*.2)*r.sc;r.sp.scale.set(sc,sc,sc);}
   const acc=o.acc,mk=(key,rate,fn)=>{acc[key]=(acc[key]||0)+dt*rate;while(acc[key]>=1){acc[key]--;fn();}};
   const around=(w)=>new V(bol.x+rnd(w),bol.y+rnd(w),bol.z+rnd(w));
   const cl=[0xff9be8,0xffe45a,0x8ad0ff,0xffffff];
   if(i===0){mk("heat",26,()=>H.nyPartikel("a",new V(FINGER[0]+rnd(.05),FINGER[1]-.045+rnd(.01),FINGER[2]+rnd(.04)),new V(FINGER[0]+rnd(.012),FINGER[1]+.008,FINGER[2]+rnd(.012)),.8,0xff8a3a));
    once("f0",u>.03,()=>{flash(o,FINGER,0xff7a2a,1.4);burst(22,FINGER,0xffb060,.07);});
    mk("sen",18,()=>H.nyPartikel("c",around(.02),around(.04),.5,0xffcc70));}
   if(i===1||i===3||i===7)mk("zap",34,()=>H.nyPartikel("c",around(.014),around(.045),.45,ELEC[(Math.random()*3)|0]));
   if(i===2){once("f2",u>.35,()=>{flash(o,CORD,0xffe45a,2.2);burst(30,CORD,0xffe45a,.09);});mk("hop",24,()=>H.nyPartikel("c",new V(CORD[0]+rnd(.02),CORD[1]+rnd(.03),CORD[2]+rnd(.02)),around(.03),.5,0xfff2a0));
    once("f2b",u>.75,()=>flash(o,[.012,1.46,-.027],0xffa040,1.2));}
   if(i===3){once("f3",u>.88,()=>{flash(o,[.214,1.0,-.008],0xffa040,1.7);burst(24,[.214,1.0,-.008],0xffa040,.08);});}
   if(i===4){mk("sp",14,()=>H.nyPartikel("c",around(.02),around(.04),.5,0xffe45a));
    once("f4",u>.9,()=>{flash(o,[0,1.6,-.012],0xffe45a,1.9);});
    if(u>.7)mk("br",50,()=>{const p=new V(rnd(.11),1.585+Math.random()*.1,-.085+Math.random()*.15);H.nyPartikel("c",p,p.clone().add(new V(rnd(.01),rnd(.01),rnd(.01))),.5,cl[(Math.random()*4)|0]);});}
   if(i===5){once("f5",u>.0,()=>flash(o,[0,1.66,.02],0xff9be8,2.4));
    mk("br",85,()=>{const p=new V(rnd(.12),1.6+Math.random()*.095,-.09+Math.random()*.165);H.nyPartikel("c",p,p.clone().add(new V(rnd(.012),rnd(.012),rnd(.012))),.5,cl[(Math.random()*4)|0]);});}
   if(i===6){once("f6",u>.0,()=>flash(o,[0,1.585,-.08],0x7ac4ff,1.6));once("f6b",u>.75,()=>flash(o,[0,1.558,-.028],0x5affb0,1.1));
    mk("ml",55,()=>{const p=new V(rnd(.1),1.57+Math.random()*.04,-.1+Math.random()*.045);H.nyPartikel("c",p,p.clone().add(new V(rnd(.01),rnd(.01),rnd(.01))),.5,0x8ad0ff);});
    if(u>.55)mk("ms",40,()=>{const p=new V(rnd(.03),1.545+Math.random()*.04,-.04+Math.random()*.03);H.nyPartikel("c",p,p.clone().add(new V(rnd(.008),rnd(.008),rnd(.008))),.5,0x5affb0);});}
   if(i===7){once("f7",u>.0,()=>{flash(o,[0,1.675,.02],0xffe45a,2);burst(18,[0,1.675,.02],0xffe45a,.08);});once("f7b",u>.88,()=>{flash(o,[.27,.8,.04],0xffa040,1.5);burst(16,[.27,.8,.04],0xffa040,.06);});}},
  synlig(i,act,dt,puls){const f=H.R()&&H.R().ob.nv,now=performance.now(),brain=i>=4&&i<=7,fk=.5+.5*Math.sin(now/230);
   for(const m of all){const s=m.userData.s;if(!GRP.has(s))continue;const id=m.userData.id,mat=m.material;if(!mat.transparent)continue;
    let tgt=0,em=0;
    if(s==="skelett")tgt=id==="skalle"&&brain?.09:.04;
    else if(s==="organ"){if(id==="hjarna"){tgt=brain?.5:.35;em=act.includes("hjarna")?(.12+.28*fk)*(i===5?1.5:1):.05;}}
    else if(s==="hud"){tgt=(i===5||i===6)?.03:.13;em=.35;}
    else if(s==="nerver"){tgt=.62;if(act.includes(id)){tgt=.95;em=puls*1.3;}else em=.08;}
    else if(s==="muskler"){if(MUS.has(id)){tgt=.08;if(act.includes(id)){tgt=.5;em=i===3?.6+.6*fk:.4;}}}
    mat.opacity+=(tgt-mat.opacity)*Math.min(1,dt*5);if(mat.emissive)mat.emissiveIntensity+=(em-mat.emissiveIntensity)*Math.min(1,dt*7);
    m.visible=mat.opacity>.015;mat.depthWrite=mat.opacity>.85;}
   if(f){const pu=.6+.4*fk;
    f.lines.forEach((l,k)=>lerpO(l.material,k===i?.55*(.75+.25*fk):0,dt,4));
    lerpO(f.pot.material,i===0?.9*(.7+.3*fk):0,dt,5);
    lerpO(f.mk.material,i===5?.55*pu:i===7?.2:0,dt,3);lerpO(f.ml.material,i===6?.6*pu:0,dt,3);lerpO(f.ms.material,i===6?.55*pu:0,dt,3);
    lerpO(f.lc.material,i===5?1:0,dt,3);lerpO(f.ll.material,i===6?1:0,dt,3);lerpO(f.ls.material,i===6?1:0,dt,3);}}
 };}
