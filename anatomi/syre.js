/* Syrets resa: en lysande kula följer syret från ett andetag, genom lungorna, hjärtat och kroppen och tillbaka.
   Röstfiler: ../ljud/syretsresa/s<n>-1.mp3 (s0 inledning, s1–s7 stegen, s8 avslutning). Manus: manus/syretsresa-manus.txt.
   Vägarna är räknade ur modellens egna kärl (medelpunkter av kärlens hörn på olika höjder). */
const STG=[
 {id:"luft",namn:"Luften in",tid:"ca 2 sekunder",dur:14,c:0xbfeaff,hl:["luftstrupe","lungor"],t:"Du andas in genom näsan eller munnen. Luften åker ner genom luftstrupen och grenar sig in i lungorna. Ungefär en femtedel av luften är syre."},
 {id:"lungan",namn:"Syret går över i blodet",tid:"mindre än en sekund",dur:13.5,c:0xff4a4a,hl:["lungor","lungvener"],t:"Längst ut i lungorna finns miljontals små luftblåsor. Deras väggar är så tunna att syret kan ta sig igenom och in i blodet, som blir klarrött. Sedan åker blodet till hjärtat."},
 {id:"hjarta",namn:"Hjärtat pumpar",tid:"ett slag tar under en sekund",dur:14,c:0xff3b3b,hl:["hjarta","aorta","kranskarl"],t:"Hjärtat är en stark muskel som slår ungefär 70 gånger i minuten. Varje slag skjuter ut blodet i aorta, kroppens största pulsåder."},
 {id:"kroppen",namn:"Ut i kroppen",tid:"några sekunder",dur:17.5,c:0xff3b3b,hl:["aorta","armben_art"],t:"Pulsådrorna grenar sig och blir smalare och smalare. Ute i fötterna och musklerna släpper blodet ifrån sig syret, som musklerna behöver för att få energi. Blodet blir mörkare."},
 {id:"hem",namn:"Tillbaka mot hjärtat",tid:"ett helt varv tar ungefär en minut",dur:18.5,c:0x5b6bd8,hl:["benvener","halven"],t:"Blodet tar med sig koldioxid, ett avfall som cellerna gör. Venerna för det mörka blodet tillbaka uppåt. I benen hjälper musklerna till att pressa blodet uppåt."},
 {id:"lungorna",namn:"Till lungorna igen",tid:"några sekunder",dur:12.5,c:0x5b6bd8,hl:["lungartar","lungor","hjarta"],t:"Hjärtat pumpar det mörka blodet vidare till lungorna. Där lämnar blodet koldioxiden och hämtar nytt syre. Sedan börjar varvet om."},
 {id:"ut",namn:"Ut med luften",tid:"ca 2–3 sekunder",dur:11,c:0xc3b4ff,hl:["luftstrupe","lungor"],t:"När du andas ut lämnar koldioxiden kroppen genom luftstrupen och munnen. Så fortsätter det hela livet: ungefär 20 000 andetag om dagen."}];
const INTRO="Följ med syret på en resa genom kroppen. Det börjar med ett andetag och slutar med att du andas ut. Tiderna i rutan är ungefärliga, och här går allt mycket snabbare än i verkligheten.";
const FIN="Nu har du följt syret ett helt varv. Du kan se resan igen, eller dra i reglaget för att titta närmare på ett steg.";
const P=[
 [[0,1.512,.085],[0,1.49,.04],[0,1.455,.012],[0,1.40,0],[0,1.355,0],[-.03,1.33,0],[-.06,1.30,.01],[-.085,1.27,.012]],
 [[-.085,1.27,.012],[-.06,1.285,-.005],[-.03,1.30,-.015],[-.003,1.322,-.006],[.012,1.309,-.014],[.017,1.296,-.021]],
 [[.017,1.296,-.021],[.04,1.265,.03],[.03,1.30,.025],[.014,1.331,.007],[.013,1.361,.001],[.005,1.397,.013],[.008,1.385,-.012],[.015,1.35,-.02],[.015,1.302,-.018],[.012,1.25,-.019],[.01,1.148,.013],[.007,1.051,.029]],
 [[.007,1.051,.029],[.019,.999,.019],[.054,.898,.025],[.072,.801,.038],[.062,.7,.036],[.053,.601,.012],[.073,.498,-.042],[.087,.398,-.056],[.093,.301,-.028],[.09,.201,-.034],[.071,.097,-.034],[.057,.05,-.051]],
 [[.071,.058,-.051],[.087,.148,-.045],[.085,.252,-.05],[.083,.35,-.043],[.063,.45,-.059],[.056,.55,-.018],[.063,.65,.027],[.067,.749,.029],[.043,.848,.048],[.028,.951,-.003],[.005,1.015,.025],[-.01,1.04,.026],[-.011,1.1,.026],[-.01,1.151,.019],[-.01,1.2,.011],[-.013,1.25,.018],[-.012,1.285,.03]],
 [[-.012,1.285,.03],[.005,1.275,.06],[.02,1.32,.03],[.03,1.338,-.012],[.05,1.318,-.024],[.08,1.283,-.031],[.1,1.26,-.02]],
 [[.1,1.26,-.02],[.07,1.29,.005],[.03,1.33,0],[0,1.355,0],[0,1.40,0],[0,1.455,.012],[0,1.49,.04],[0,1.512,.085],[0,1.525,.13]]];
const HEART=[.02,1.29,.03];
const VIS={lungor:.5,hjarta:.82,luftstrupe:.5,aorta:.8,armben_art:.72,lungartar:.8,lungvener:.8,kranskarl:.5,halven:.8,benvener:.75,brostvener:.45,hjartaven:.4};
const MUS=new Set(["quad","hamstrings","vad","tibialis","skink","innerlar"]);
const GRP=new Set(["skelett","organ","karl","ven","muskler"]);
export function syreStory(H){
 const {THREE,all,grp}=H;
 const col=new THREE.Color(),c2=new THREE.Color();
 const mix=(a,b,t)=>{col.setHex(a);c2.setHex(b);return col.lerp(c2,Math.max(0,Math.min(1,t)));};
 const blod=(i,u)=>{ // blodets färg längs steget
  if(i===0)return mix(0xbfeaff,0xbfeaff,0);
  if(i===1)return mix(0x5b6bd8,0xff4040,u*1.6);
  if(i===2)return mix(0xff3b3b,0xff3b3b,0);
  if(i===3)return mix(0xff3b3b,0x5b6bd8,(u-.5)/.5);
  if(i===4)return mix(0x5b6bd8,0x5b6bd8,0);
  if(i===5)return mix(0x5b6bd8,0xff4040,(u-.5)/.4);
  return mix(0xc3b4ff,0xc3b4ff,0);};
 const rt=(()=>{const c=document.createElement("canvas");c.width=c.height=128;const g=c.getContext("2d"),r=g.createRadialGradient(64,64,40,64,64,62);r.addColorStop(0,"rgba(255,255,255,0)");r.addColorStop(.7,"rgba(255,255,255,.9)");r.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=r;g.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);})();
 function bygg(o){const NF=220,pos=new Float32Array(NF*3),cl=new Float32Array(NF*3),sd=[];
  for(let k=0;k<NF;k++)sd.push({p:Math.random(),v:.55+Math.random()*.7,a:Math.random()*6.283,r:Math.random()*.008});
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(cl,3));
  const m=new THREE.PointsMaterial({size:.0085,map:H.tex,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true});
  const pts=new THREE.Points(g,m);pts.frustumCulled=false;pts.renderOrder=9;
  const rings=[];for(let k=0;k<3;k++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:rt,color:0xff6a6a,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0}));sp.renderOrder=14;sp.position.set(...HEART);o.grpR.add(sp);rings.push({sp,t:9});}
  o.grpR.add(pts);o.fl={NF,pos,cl,sd,g,pts,rings,beat:0,ri:0,tt:0};}
 function ring(o,colr,sc){const f=o.fl,r=f.rings[f.ri++%3];r.t=0;r.sc=sc||1;r.sp.material.color.setHex(colr);r.sp.position.set(...HEART);}
 return {namn:"Syrets resa",rost:"syretsresa",STG,INTRO,FIN,SPAR:new Set(),orbit:.22,
  dd:[.3,.26,.24,.55,.55,.3,.3],
  ladda:async()=>({kurvor:P.map(a=>new THREE.CatmullRomCurve3(a.map(p=>new THREE.Vector3(...p)),false,"centripetal"))}),
  setup(){for(const k of Object.keys(grp))grp[k].visible=GRP.has(k);
   for(const o of all){const s=o.userData.s;if(!GRP.has(s))continue;const m=o.material.clone();m.transparent=true;m.opacity=s==="skelett"?.045:0;if(m.emissive)m.emissive.set(s==="muskler"?0xff7a2e:0xff9a3c);m.emissiveIntensity=0;o.material=m;o.visible=s==="skelett";}},
  kern:(i,u)=>.0085*(1+.1*Math.sin(performance.now()/180)),
  farg:(i,u)=>blod(i,u).getHex(),
  sprut(dt,i,bol,u){const R=H.R();if(!R)return;const o=R.ob;if(!o.fl)bygg(o);const f=o.fl,cur=H.VAG().kurvor[i];f.tt+=dt;
   // blodströmmen: små celler som flyter längs hela stegets väg
   const fa=f.cl,fp=f.pos;
   for(let k=0;k<f.NF;k++){const q=f.sd[k];q.p=(q.p+dt*.09*q.v*(i===2?1.7:1))%1;const pnt=cur.getPointAt(Math.min(.9999,q.p));
    const s=q.p,w=.5+.5*Math.sin(f.tt*3+q.a*4);const e=Math.sin(Math.PI*s);
    fp[k*3]=pnt.x+Math.cos(q.a+f.tt*2)*q.r;fp[k*3+1]=pnt.y+Math.sin(q.a*1.7+f.tt*1.6)*q.r;fp[k*3+2]=pnt.z+Math.sin(q.a+f.tt*2)*q.r;
    const cc=blod(i,s),br=Math.pow(e,.6)*(.55+.45*w)*(i===0||i===6?.8:1);fa[k*3]=cc.r*br;fa[k*3+1]=cc.g*br;fa[k*3+2]=cc.b*br;}
   f.g.attributes.position.needsUpdate=true;f.g.attributes.color.needsUpdate=true;
   // hjärtslag: ringar som breder ut sig
   f.beat+=dt;const per=i===2?.8:(i===1||i===5||i===3)?1.4:0;if(per&&f.beat>per){f.beat=0;ring(o,0xff5a5a,i===2?1.3:.8);H.C.puls&&H.C.puls();}
   for(const r of f.rings){r.t+=dt;const a=Math.min(1,r.t/.9);r.sp.material.opacity=a<1?(1-a)*(.9):0;const sc=(.04+a*.22)*(r.sc||1);r.sp.scale.set(sc,sc,sc);}
   // partiklar som visar vad som händer
   const acc=o.acc,mk=(key,rate,fn)=>{acc[key]=(acc[key]||0)+dt*rate;while(acc[key]>=1){acc[key]--;fn();}};
   const V=THREE.Vector3,rnd=a=>(Math.random()-.5)*a,on=(a)=>new V(bol.x+rnd(a),bol.y+rnd(a),bol.z+rnd(a));
   if(i===0)mk("a",22,()=>H.nyPartikel("c",on(.025),on(.05),.9,0xcfeeff));
   if(i===1)mk("b",34,()=>{const a=new V(bol.x+rnd(.16),bol.y+rnd(.1),bol.z+rnd(.1));H.nyPartikel("b",a,bol,1.0,0x9fe8ff);});
   if(i===2)mk("c",16,()=>H.nyPartikel("c",bol,on(.045),.8,0xff7a7a));
   if(i===3&&u>.42)mk("d",26,()=>{const a=bol.clone();const b=new V(bol.x+(Math.random()>.5?1:-1)*(.03+Math.random()*.04),bol.y+rnd(.05),bol.z+rnd(.06));H.nyPartikel("a",a,b,1.0,0x9fe8ff);});
   if(i===4&&u<.65)mk("e",26,()=>{const a=new V(bol.x+rnd(.12),bol.y+rnd(.1),bol.z+rnd(.12));H.nyPartikel("b",a,bol,1.0,0xb7a6ff);});
   if(i===5){mk("f",22,()=>{const b=new V(bol.x+rnd(.1),bol.y+.02+Math.random()*.06,bol.z+rnd(.08));H.nyPartikel("a",bol,b,1.1,0xb7a6ff);});if(u>.5)mk("g",28,()=>{const a=new V(bol.x+rnd(.14),bol.y+rnd(.1),bol.z+rnd(.1));H.nyPartikel("b",a,bol,1.0,0x9fe8ff);});}
   if(i===6)mk("h",24,()=>H.nyPartikel("c",on(.02),on(.05),1.0,0xc3b4ff));},
  synlig(i,act,dt,puls){const now=performance.now(),bt=(now/800)%1,env=Math.exp(-bt*5.5),breath=.5+.5*Math.sin(now/1100);
   for(const m of all){const s=m.userData.s;if(!GRP.has(s))continue;const id=m.userData.id,mat=m.material;if(!mat.transparent)continue;
    let tgt=0,em=0;
    if(s==="skelett")tgt=.045;
    else if(s==="muskler"){if(MUS.has(id)){tgt=(i===3||i===4)?.3:.07;em=i===3?puls*(m.userData.u||1)*.9:0;}}
    else if(VIS[id]!==undefined){tgt=VIS[id];}
    if(act.includes(id)){em=Math.max(em,puls);tgt=Math.min(1,tgt+.12);}
    if(id==="hjarta"){em=.12+(i===2?.9:.35)*env;}
    if((id==="aorta"||id==="armben_art"||id==="kranskarl")&&i>=2&&i<=3){em=Math.max(em,.12+.5*env*(1-Math.min(1,.0)));}
    if(id==="lungor"){em=Math.max(em,.08+.3*breath*(i===0||i===1||i===5||i===6?1:.3));}
    mat.opacity+=(tgt-mat.opacity)*Math.min(1,dt*5);if(mat.emissive)mat.emissiveIntensity+=(em-mat.emissiveIntensity)*Math.min(1,dt*7);
    m.visible=mat.opacity>.015;mat.depthWrite=mat.opacity>.85;}}
 };}
