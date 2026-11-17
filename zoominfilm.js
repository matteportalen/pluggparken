/* Zooma in: en film i åtta steg (från handen till kvarkarna), helt animerad som en modell (canvas, inga foton).
   Syskon till zoomfilm.js (Zooma ut i universum): den här slutar med att kameran backar ut till jorden, där Zooma ut tar vid.
   Använder filmmotorn i svarthal.js (MPSvartHal.start med o.def). Röst: ljud/zoomin/s<scen>-<replik>.mp3, manus i manus/zoomin-manus.txt.
   Saknas ljudfilerna visas bara undertexterna. MPZoomInFilm.start(host,{overlay,onClose,extra}).
   Regler: allt är modeller, inte foton, och det ska synas (kvarkarna märks "modell"). Ingen createRadialGradient per partikel
   och bildruta: klot och moln bakas en gång till små bilder (boll(), bakaMoln()). Testa med root.__seek(scen,tid). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/";}})();
const TAU=Math.PI*2;

/* ---------- Manus: åtta scener + utbackning (0 = inledning), undertexter med starttid i sekunder ---------- */
const SC=[
 {k:"Inledning",d:7,cap:[[0.5,"Följ med på en resa inåt. Vi börjar med din egen hand och zoomar in, steg för steg, tills det inte går att komma längre."]]},
 {k:"01 · Handen",d:17,cap:[[0.8,"Det här är en hand, ungefär 10 centimeter bred. Den ser slät ut, men vänta bara."],[8.5,"Vi ska zooma in mer än en biljon gånger. Det är en etta med tolv nollor."]]},
 {k:"02 · Huden",d:17,cap:[[0.8,"Hudens yttersta lager är ungefär en tiondels millimeter tjockt, som ett pappersark. Det är byggt av celler i många lager."],[8.5,"Längst ut ligger döda, platta celler som skyddar dig. Varje minut tappar du tiotusentals av dem."]]},
 {k:"03 · En cell",d:17,cap:[[0.8,"Det här är en enda hudcell. Den är ungefär 3 hundradels millimeter bred, tunnare än ett hårstrå."],[8.5,"Hela din kropp är byggd av ungefär 30 000 miljarder celler. I mitten av cellen ligger cellkärnan."]]},
 {k:"04 · Cellkärnan",d:17,cap:[[0.8,"I cellkärnan ligger 46 kromosomer. De är långa trådar av DNA, hoprullade för att få plats."],[8.5,"Om man drog ut allt DNA i en enda cellkärna skulle tråden bli ungefär 2 meter lång."]]},
 {k:"05 · DNA",d:17,cap:[[0.8,"Det här är DNA. Det ser ut som en vriden stege och är bara 2 miljondels millimeter brett."],[8.5,"Stegpinnarna är fyra sorters byggstenar: A, T, C och G. Ordningen på dem är ritningen till dig, ungefär 3 miljarder bokstäver lång."]]},
 {k:"06 · En atom",d:17,cap:[[0.8,"Allt är byggt av atomer. Det här är en kolatom. Tio miljoner atomer i rad blir bara en millimeter."],[8.5,"Runt atomen far sex elektroner i ett moln. Nästan allt det andra är tomrum. Längst in finns atomkärnan."]]},
 {k:"07 · Atomkärnan",d:17,cap:[[0.8,"Atomkärnan är tiotusentals gånger mindre än atomen. Om atomen vore en fotbollsarena skulle kärnan vara en ärta på mittpunkten."],[8.5,"Ändå finns nästan all vikt här. Kolets kärna är byggd av sex protoner och sex neutroner."]]},
 {k:"08 · Kvarkarna",d:17,cap:[[0.8,"Varje proton är byggd av tre kvarkar, som hålls ihop av gluoner. Gluonerna är naturens starkaste lim."],[8.5,"Ingen har sett en kvark. Bilden är en modell som forskarna har räknat fram. Mindre än så här känner vi inte till något."]]},
 {k:"Tillbaka ut",d:11,cap:[[0.5,"Nu vänder vi. Förbi atomen, cellen och handen, hela vägen ut igen. Härifrån fortsätter resan ut i universum."]]}
];
const META={hud:"PLUGGPARKEN · RYMDARKIVET · FILM 04",titel:"Zooma in",under:"En film i åtta steg · ca 2,5 minuter",mat:"rymd",
  slutRubrik:"Tack för att du har följt med",slutText:"Allt du har sett finns i din egen hand, miljarder gånger om. Bilderna är modeller, inte foton. Storlekarna är ungefärliga och hämtade från vanliga läroböcker i biologi och fysik.",igen:"↻ Se filmen igen"};

/* ---------- Slump med frö (samma bild varje gång) ---------- */
function frand(seed){let s=(seed*48271+12345)%2147483647||7;const f=()=>(s=(s*16807)%2147483647)/2147483647;f();f();f();return f;}

/* ---------- Bakade bilder: klot, elektronmoln, hudsnitt, jorden ---------- */
const BOLL={};
// ett skuggat klot med glans, bakat en gång per färg
function boll(c1,c2,glans){const k=c1+c2+(glans||"");if(BOLL[k])return BOLL[k];const N=96,c=document.createElement("canvas");c.width=c.height=N;const g=c.getContext("2d"),h=N/2;
  let gr=g.createRadialGradient(h-N*.16,h-N*.2,N*.04,h,h,h);gr.addColorStop(0,c1);gr.addColorStop(.72,c2);gr.addColorStop(1,"rgba(0,0,0,.55)");g.fillStyle=gr;g.beginPath();g.arc(h,h,h-1,0,TAU);g.fill();
  g.globalCompositeOperation="source-atop";gr=g.createRadialGradient(h-N*.2,h-N*.25,0,h-N*.2,h-N*.25,N*.3);gr.addColorStop(0,glans||"rgba(255,255,255,.75)");gr.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=gr;g.fillRect(0,0,N,N);
  return BOLL[k]=c;}
function ritaBoll(x,b,px,py,r){x.drawImage(b,px-r,py-r,r*2,r*2);}
let MOLN=null;
function bakaMoln(){if(MOLN)return MOLN;const N=560,c=document.createElement("canvas");c.width=c.height=N;const g=c.getContext("2d"),h=N/2,r=frand(77);g.globalCompositeOperation="lighter";
  const gauss=()=>{let u=0;for(let i=0;i<4;i++)u+=r();return(u-2)/2;};
  // inre skalet (två elektroner) och yttre skalet (fyra elektroner): tätare där elektronerna oftast är
  for(let i=0;i<5200;i++){const a=r()*TAU,rad=Math.abs(gauss())*h*.34;g.fillStyle="rgba(150,215,255,.05)";g.fillRect(h+Math.cos(a)*rad,h+Math.sin(a)*rad,2.2,2.2);}
  for(let i=0;i<26000;i++){const a=r()*TAU,rad=h*(.6+gauss()*.42),lob=.6+.4*Math.pow(Math.abs(Math.cos(a*1.5)),1.4);if(rad<=0||rad>h||r()>lob)continue;g.fillStyle="rgba(110,170,255,.06)";g.fillRect(h+Math.cos(a)*rad,h+Math.sin(a)*rad,2.4,2.4);}
  return MOLN=c;}
/* hudsnittet: döda platta celler överst, levande celler i lager, vågig gräns mot läderhuden med blodkärl och ett hårstrå */
let HUD=null;const HW=760,HH=520,YT=150;const grans=xx=>372+20*Math.sin(xx*.028)+8*Math.sin(xx*.071+1);
function bakaHud(){if(HUD)return HUD;const c=document.createElement("canvas");c.width=HW;c.height=HH;const g=c.getContext("2d"),r=frand(5);
  const rr=(px,py,w,h,rad,fill,str)=>{g.beginPath();g.roundRect(px,py,w,h,rad);g.fillStyle=fill;g.fill();if(str){g.strokeStyle=str;g.lineWidth=1.2;g.stroke();}};
  // läderhuden
  let gr=g.createLinearGradient(0,330,0,HH);gr.addColorStop(0,"#f3b9b4");gr.addColorStop(1,"#d98a92");g.fillStyle=gr;g.beginPath();g.moveTo(0,HH);for(let xx=0;xx<=HW;xx+=8)g.lineTo(xx,grans(xx));g.lineTo(HW,HH);g.closePath();g.fill();
  g.strokeStyle="rgba(255,235,230,.35)";g.lineWidth=2;for(let i=0;i<26;i++){const y0=grans(0)+26+r()*120,ph=r()*6;g.beginPath();for(let xx=-10;xx<=HW+10;xx+=14){const yy=y0+Math.sin(xx*.02+ph)*10+xx*.01;xx<0?g.moveTo(xx,yy):g.lineTo(xx,yy);}g.stroke();}
  // överhuden: grundfärg
  gr=g.createLinearGradient(0,YT,0,400);gr.addColorStop(0,"#ecc9a4");gr.addColorStop(1,"#e3a48c");g.fillStyle=gr;g.beginPath();g.moveTo(0,YT);g.lineTo(HW,YT);for(let xx=HW;xx>=0;xx-=8)g.lineTo(xx,grans(xx));g.closePath();g.fill();
  // basalceller: höga celler längs gränsen
  for(let xx=2;xx<HW;xx+=15){const yb=grans(xx+7);rr(xx,yb-27,13,26,5,"#d98974","#b96a5a");g.fillStyle="rgba(120,50,60,.55)";g.beginPath();g.ellipse(xx+6.5,yb-13,3.2,5,0,0,TAU);g.fill();}
  // levande celler i lager: rundare längre ner, plattare högre upp
  for(let row=0;row<8;row++){const y0=YT+52+row*21,h=18-row*.2+ (row<2?-5:0),w=40-row*2.6;
    for(let xx=-20+(row%2)*w*.5;xx<HW;xx+=w+2){const cx2=xx+w/2;if(y0+h>grans(cx2)-29)continue;const sh=228-row*5;rr(xx+r()*2,y0,w,h,7,`rgb(${sh+12},${sh-38-row*3},${sh-70-row*4})`,"rgba(150,90,70,.55)");
      g.fillStyle="rgba(110,55,70,.5)";g.beginPath();g.ellipse(cx2+r()*4-2,y0+h/2,w*.16,h*.26,0,0,TAU);g.fill();}}
  // hornlagret: döda, platta celler utan kärna
  for(let row=0;row<5;row++){const y0=YT+row*10;for(let xx=-30+(row%2)*26;xx<HW;xx+=52){rr(xx+r()*4,y0+1,49,8.5,3.5,row===0?"#f4dcc0":"#eccfae","rgba(160,120,90,.5)");}}
  // blodkärl: kapillärslingor upp i varje topp
  for(let i=0;i<6;i++){const cx2=60+i*128+r()*20,top=grans(cx2)+16;g.lineWidth=5;g.lineCap="round";g.strokeStyle="#d8414f";g.beginPath();g.moveTo(cx2-14,HH);g.bezierCurveTo(cx2-16,HH-70,cx2-10,top+10,cx2,top);g.stroke();
    g.strokeStyle="#5f6fd0";g.beginPath();g.moveTo(cx2,top);g.bezierCurveTo(cx2+10,top+10,cx2+16,HH-70,cx2+14,HH);g.stroke();}
  // hårstrå med hårsäck
  g.save();g.translate(560,0);g.fillStyle="#c98877";g.beginPath();g.moveTo(-17,YT+2);g.quadraticCurveTo(-30,330,-10,470);g.quadraticCurveTo(8,496,26,470);g.quadraticCurveTo(40,330,17,YT+2);g.closePath();g.fill();
  g.strokeStyle="#4a2f1c";g.lineWidth=15;g.lineCap="round";g.beginPath();g.moveTo(8,462);g.quadraticCurveTo(2,250,-22,-10);g.stroke();g.strokeStyle="rgba(255,220,180,.25)";g.lineWidth=3;g.beginPath();g.moveTo(4,440);g.quadraticCurveTo(-2,250,-26,-10);g.stroke();g.restore();
  return HUD=c;}
/* jorden som riktigt klot ur kartbilden (samma bild och metod som i zoomfilm.js), för slutscenen */
const JIMG=new Image();JIMG.src=ROOT+"ovriga/solsystemet/bilder/2k_earth_daymap.jpg";let JORD=null;
function jordCv(){if(JORD)return JORD;if(!JIMG.complete||!JIMG.naturalWidth)return null;const N=260,t=document.createElement("canvas");t.width=1024;t.height=512;const tg=t.getContext("2d");tg.drawImage(JIMG,0,0,1024,512);let d;try{d=tg.getImageData(0,0,1024,512).data;}catch(e){return null;}
  const c=document.createElement("canvas");c.width=c.height=N;const g=c.getContext("2d"),id=g.createImageData(N,N),o=id.data,R=N/2-1;
  for(let y=0;y<N;y++)for(let xx=0;xx<N;xx++){const nx=(xx-N/2+.5)/R,ny=(y-N/2+.5)/R,r2=nx*nx+ny*ny,p=(y*N+xx)*4;if(r2>1)continue;const nz=Math.sqrt(1-r2),lat=Math.asin(-ny),lon=Math.atan2(nx,nz);
    const v=Math.max(0,Math.min(511,Math.round((.5-lat/Math.PI)*511))),u=(Math.round(((lon/TAU)+.5)*1023)+45)&1023,q=(v*1024+u)*4,s=.1+.9*Math.pow(Math.max(0,nx*-.42+ny*-.18+nz*.89),.75);
    o[p]=d[q]*s;o[p+1]=d[q+1]*s;o[p+2]=d[q+2]*s;o[p+3]=r2>.985?Math.round(255*(1-r2)/.015):255;}
  g.putImageData(id,0,0);return JORD=c;}


/* ---------- Förberäknade former ---------- */
const TRAD=(()=>{const r=frand(31),ut=[];for(let i=0;i<46;i++){const p=[];let a=r()*TAU,b=Math.acos(2*r()-1),rad=.25+r()*.6;for(let j=0;j<7;j++){a+=(r()-.5)*1.5;b+=(r()-.5)*1.1;rad=Math.max(.12,Math.min(.86,rad+(r()-.5)*.3));p.push([Math.sin(b)*Math.cos(a)*rad,Math.cos(b)*rad,Math.sin(b)*Math.sin(a)*rad]);}ut.push({p,h:200+r()*140});}return ut;})();
const PORER=(()=>{const ut=[];for(let i=0;i<70;i++){const yy=1-2*(i+.5)/70,rad=Math.sqrt(1-yy*yy),a=i*2.39996;ut.push([Math.cos(a)*rad,yy,Math.sin(a)*rad]);}return ut;})();
// tolv kärnpartiklar tätt packade (hörnen i en ikosaeder), varannan proton och neutron
const NUKL=(()=>{const f=(1+Math.sqrt(5))/2,v=[[-1,f,0],[1,f,0],[-1,-f,0],[1,-f,0],[0,-1,f],[0,1,f],[0,-1,-f],[0,1,-f],[f,0,-1],[f,0,1],[-f,0,-1],[-f,0,1]],n=Math.hypot(1,f);
  return v.map((q,i)=>({p:q.map(c=>c/n*.62),proton:[0,3,4,7,8,11].includes(i)}));})();
const BASER=(()=>{const r=frand(9),ut=[];for(let i=0;i<30;i++)ut.push(Math.floor(r()*4));return ut;})();
const RIBO=(()=>{const r=frand(12),ut=[];for(let i=0;i<90;i++){const a=r()*TAU,d=.42+r()*.5;ut.push([Math.cos(a)*d,Math.sin(a)*d,r()*TAU]);}return ut;})();
const rot=(p,ay,ax)=>{const cy=Math.cos(ay),sy=Math.sin(ay),cx=Math.cos(ax),sx=Math.sin(ax),x1=p[0]*cy+p[2]*sy,z1=-p[0]*sy+p[2]*cy,y1=p[1]*cx-z1*sx,z2=p[1]*sx+z1*cx;return[x1,y1,z2];};
const r2=(v,a)=>{const c=Math.cos(a),s=Math.sin(a);return[v[0]*c-v[1]*s,v[0]*s+v[1]*c];};
const clamp=(v,a,b)=>v<a?a:v>b?b:v,sg=(v,a,b)=>clamp((v-a)/(b-a),0,1),sm=u=>{u=clamp(u,0,1);return u*u*(3-2*u);};

/* Hudens yta (nivå 1): ett nät av fåror (snett rutnät med slump), porer i korsningarna, några fina hårstrån.
   Allt i enheter av nivåns storlek S. T = mitten av den ruta som kameran dyker in i (långt från fårorna). */
const HY=(()=>{const r=frand(41),sp=.2,n=11,N=[];for(let i=-n;i<=n;i++){const row=[];for(let j=-n;j<=n;j++){const a=.55,gx=i*sp,gy=j*sp*.78;row.push([gx*Math.cos(a)-gy*Math.sin(a)+(r()-.5)*.07,gx*Math.sin(a)+gy*Math.cos(a)+(r()-.5)*.07]);}N.push(row);}
  const L=N.length,S=[];for(let i=0;i<L;i++)for(let j=0;j<L;j++){const p=N[i][j];if(i+1<L)S.push([p,N[i+1][j],1]);if(j+1<L)S.push([p,N[i][j+1],.6]);}
  let T=[0,0],bd=9;for(let i=0;i+1<L;i++)for(let j=0;j+1<L;j++){const q=[N[i][j],N[i+1][j],N[i][j+1],N[i+1][j+1]],c=[(q[0][0]+q[1][0]+q[2][0]+q[3][0])/4,(q[0][1]+q[1][1]+q[2][1]+q[3][1])/4],d=Math.hypot(c[0]-.04,c[1]-.04);if(d<bd){bd=d;T=c;}}
  const P=[];N.forEach(row=>row.forEach(p=>{if(r()<.32&&Math.hypot(p[0]-T[0],p[1]-T[1])>.14)P.push(p);}));
  const H=[];P.forEach(p=>{const d=Math.hypot(p[0]-T[0],p[1]-T[1]);if(H.length<4&&d>.38&&d<1.05&&r()<.3)H.push({x:p[0],y:p[1],a:-1.9+r()*.9,l:.55+r()*.3,ph:r()*6});});
  const B=[];for(let i=0;i<8;i++)B.push({x:(r()-.5)*2.4,y:(r()-.5)*2.4,r:.25+r()*.35,l:r()<.5,a:.07+r()*.07});
  const near=(arr,q)=>arr.reduce((b,p)=>Math.hypot(p[0]-q[0],p[1]-q[1])<Math.hypot(b[0]-q[0],b[1]-q[1])?p:b,arr[0]);
  const mids=S.filter(s=>s[2]===1).map(s=>[(s[0][0]+s[1][0])/2,(s[0][1]+s[1][1])/2]);
  return{S,T,P,H,B,lab:{f:near(mids,[T[0]-.3,T[1]+.2]),p:near(P,[T[0]+.32,T[1]-.18])}};})();
/* Hornlagret (nivå 2): döda, platta celler som fjäll, sorterade uppifrån så att de ligger omlott */
const PL=(()=>{const r=frand(57),ut=[],sp=.1;for(let row=-25;row<=25;row++)for(let col=-25;col<=25;col++){const px=col*sp+(row%2?sp/2:0)+(r()-.5)*.02,py=row*sp*.866+(r()-.5)*.02;if(Math.hypot(px,py)>2.15)continue;
    const v=[],a0=r()*TAU;for(let k=0;k<6;k++){const a=a0+k*TAU/6+(r()-.5)*.5,rr=.06+r()*.014;v.push([Math.cos(a)*rr,Math.sin(a)*rr*.92]);}ut.push({x:px,y:py,v,c:Math.floor(r()*5),lift:r()<.05,ph:r()*6});}
  return ut.sort((a,b)=>a.y-b.y);})();
const PCOL=["#f3dcc3","#efd4b8","#ead0b2","#f6e2cc","#e6c5a5"];
/* De levande cellerna (nivå 3) och den cell som kameran dyker in i (G = hålet där nivå 4 ritas) */
const CE=(()=>{const r=frand(23),sp=.118,ut=[];let G=null,bd=9;const pts=[];for(let row=-24;row<=24;row++)for(let col=-24;col<=24;col++){const px=col*sp+(row%2?sp/2:0),py=row*sp*.866;if(Math.hypot(px,py)>2.45)continue;pts.push([px,py]);const d=Math.hypot(px-.03,py-.02);if(d<bd){bd=d;G=[px,py];}}
  pts.forEach(p=>{if(p===G)return;const rx=.05+r()*.006;ut.push({x:p[0]+(r()-.5)*.012,y:p[1]+(r()-.5)*.012,rx,ry:rx*(.84+r()*.1),a:(r()-.5)*1.2,nx:(r()-.5)*.25,ny:(r()-.5)*.25,ph:r()*6,m:r()*TAU});});return{c:ut,G};})();
/* Kromosomtråden (nivå 6): små kulor (DNA lindat runt proteiner) i en spiral längs x. Kula 0 ligger längst fram i mitten. */
const BE=(()=>{const ut=[];for(let i=-230;i<=230;i++){const u=Math.PI/2+i*.3;ut.push({i,x:i*.0095,y:.3*Math.cos(u),d:Math.sin(u)});}return{idx:ut,dep:[...ut].sort((a,b)=>a.d-b.d)};})();
/* Nukleosomen (nivå 7): DNA-bandet in från vänster, 1,75 varv runt proteinkulan, ut uppåt (där tar DNA-stegen vid) */
const NU=(()=>{const th0=-Math.PI/2,turns=1.75,rho=t=>.33+.085*(t-th0)/TAU,ds=.0177,pts=[];let idx=0;
  for(let s=-.75;s<0;s+=ds)pts.push({x:s,y:-.33,nx:0,ny:1,i:idx++,f:sg(s,-.75,-.45)});
  let th=th0;const th1=th0+turns*TAU;while(th<th1){const r=rho(th),tx=-Math.sin(th)*r+Math.cos(th)*.085/TAU,ty=Math.cos(th)*r+Math.sin(th)*.085/TAU,tl=Math.hypot(tx,ty);pts.push({x:Math.cos(th)*r,y:Math.sin(th)*r,nx:-ty/tl,ny:tx/tl,i:idx++,f:1});th+=ds/r;}
  const r=rho(th1),E=[Math.cos(th1)*r,Math.sin(th1)*r],tx=-Math.sin(th1)*r+Math.cos(th1)*.085/TAU,ty=Math.cos(th1)*r+Math.sin(th1)*.085/TAU,tl=Math.hypot(tx,ty);
  return{pts,E,tan:[tx/tl,ty/tl]};})();

/* ---------- Kamerans väg: ett zoomvärde z för hela filmen (heltal = en nivå fyller bilden) ---------- */
// mjuk, monoton kurva genom nyckelpunkterna (harmoniskt medelvärde av lutningarna: landar mjukt, skjuter aldrig över)
function mono(P){const n=P.length,dx=[],s=[],m=[];for(let i=0;i<n-1;i++){dx[i]=P[i+1][0]-P[i][0];s[i]=(P[i+1][1]-P[i][1])/dx[i];}
  m[0]=0;m[n-1]=0;for(let i=1;i<n-1;i++)m[i]=s[i-1]*s[i]<=0?0:2*s[i-1]*s[i]/(s[i-1]+s[i]);
  return T=>{if(T<=P[0][0])return P[0][1];if(T>=P[n-1][0])return P[n-1][1];let i=0;while(T>P[i+1][0])i++;const h=dx[i],u=(T-P[i][0])/h,u2=u*u,u3=u2*u;
    return(2*u3-3*u2+1)*P[i][1]+(u3-2*u2+u)*h*m[i]+(-2*u3+3*u2)*P[i+1][1]+(u3-u2)*h*m[i+1];};}
// [sekund i filmen, z]. Scenstarter: 0, 7, 24, 41, 58, 75, 92, 109, 126, 143 (Tillbaka ut)
const ZF=mono([[0,-.1],[7,0],[23.5,.1],[27,1],[29.5,1.07],[33,2],[38,2.08],[40.7,3],[41.5,3.03],[44.5,4],[57,4.1],[61,5],[63.5,5.06],[67.5,6],[74.5,6.08],[77,7],[78,7.04],[80.5,8],[91,8.1],[95,9],[108,9.1],[115.5,10],[125,10.08],[129,11],[142.5,11.08]]);
const TVAND=142.5;
// klockor som saktar in och står still när kameran närmar sig något som rör sig (kärnan snurrar, DNA vrider sig, kärnpartiklarna)
const KLOCKA=(z0,z1)=>{const dt=.05,n=3400,a=new Float32Array(n);let s=0;for(let i=0;i<n;i++){a[i]=s;s+=(1-sg(ZF(Math.min(i*dt,TVAND)),z0,z1))*dt;}return T=>{const f=clamp(T/dt,0,n-1.001),i=Math.floor(f);return a[i]+(a[i+1]-a[i])*(f-i);};};
const K5=KLOCKA(5.07,5.35),K8=KLOCKA(8.12,8.45),K10=KLOCKA(10.09,10.35);
const ST=T=>({T,ay5:.6+K5(T)*.12,p8:K8(T)*.7,t10:K10(T)});
const STE=ST(170);
/* länkarna: nivå k ligger i nivå k-1 med storleken r (andel av förälderns S), mitt o (i förälderns enheter) och vridning a.
   Ungefärliga verkliga storlekar på bilden: hand 25 cm, hud 1,5 cm, hornlager 0,32 mm, celler 0,27 mm, cell 0,035 mm, cellkärna 0,012 mm,
   kromosomtråd 0,17 µm, nukleosom 20 nm, DNA 8 nm, atom 0,6 nm, atomkärna 15 fm, proton 6 fm. */
const L6val=(()=>{const ax=.25;let best=null,bv=-9;TRAD.forEach((tr,k)=>{const m=[0,1,2].map(c=>(tr.p[2][c]+tr.p[3][c])/2),q=rot(m,STE.ay5,ax),v=q[2]-.6*Math.hypot(q[0],q[1]);if(v>bv){bv=v;best=k;}});
  const tr=TRAD[best],lj=.5+.5*(rot(tr.p[3],STE.ay5,ax)[2]+1)/2;return{k:best,h:tr.h,r:.4*.02*(.7+lj*.6)/.69};})();
const L9val=(()=>{let best=0,bv=-9;for(let i=-3;i<=3;i++){const z=Math.sin(i*.62+STE.p8);if(z>bv){bv=z;best=i;}}return{i:best,r:.026*(1+.28*bv)/.42};})();
const L11val=(()=>{let best=0,bv=-9;NUKL.forEach((n,i)=>{if(!n.proton)return;const p=rot(n.p,STE.t10*.35,.4+Math.sin(STE.t10*.3)*.15);if(p[2]>bv){bv=p[2];best=i;}});return{i:best,r:.4*(1+.12*bv)};})();
const HANDPKT=(()=>{const u=.0039,c=Math.cos(-.05),s=Math.sin(-.05),hx=-4,hy=45;return[(hx*c-hy*s)*u,(hx*s+hy*c)*u-38*u];})();
const nukPos=(i,t10)=>{const p=rot(NUKL[i].p,t10*.35,.4+Math.sin(t10*.3)*.15),j=1+.03*Math.sin(t10*5+i*1.7);return[p[0]*j,p[1]*j,p[2]];};
const dnaBoll=(i,p8)=>{const ang=.4,ca=Math.cos(ang),sa=Math.sin(ang),s=i*.0455,ph=i*.62+p8,c=Math.cos(ph);return[s*ca-sa*.14*c,s*sa+ca*.14*c,Math.sin(ph)];};
const LINK=[null,
  st=>({r:.06,o:HANDPKT,a:0}),
  st=>({r:.0213,o:HY.T,a:.25}),
  st=>({r:.85,o:[0,0],a:0}),
  st=>({r:.13,o:[CE.G[0]-.056*.13,CE.G[1]+.016*.13],a:0}),
  st=>({r:.33,o:[0,0],a:0}),
  st=>{const tr=TRAD[L6val.k],p2=rot(tr.p[2],st.ay5,.25),p3=rot(tr.p[3],st.ay5,.25);return{r:L6val.r,o:[.4*(p2[0]+p3[0])/2,.4*(p2[1]+p3[1])/2],a:Math.atan2(p3[1]-p2[1],p3[0]-p2[0])};},
  st=>({r:.118,o:[0,0],a:Math.atan2(-.09,.0095)}),
  st=>({r:.39,o:[NU.E[0]+NU.tan[0]*.5,NU.E[1]+NU.tan[1]*.5],a:Math.atan2(NU.tan[1],NU.tan[0])-.4}),
  st=>{const b=dnaBoll(L9val.i,st.p8);return{r:L9val.r,o:[b[0],b[1]],a:0};},
  st=>({r:4e-5,o:[0,0],a:0}),
  st=>{const p=nukPos(L11val.i,st.t10);return{r:L11val.r,o:[.36*p[0],.36*p[1]],a:0};}
];
const NL=LINK.length;
// förstoringen (logaritmen av hur mycket mindre bilden är än handens bild), och vägen tillbaka
const LNR=LINK.map(f=>f?Math.log(1/f(STE).r):0),CUM=[0];for(let k=1;k<NL;k++)CUM[k]=CUM[k-1]+LNR[k];
const LAM=z=>{const j=clamp(Math.floor(z),0,NL-2);return CUM[j]+(z-j)*LNR[j+1];};
const ZAV=l=>{for(let j=0;j<NL-1;j++)if(l<=CUM[j+1]||j===NL-2)return j+(l-CUM[j])/LNR[j+1];};
const fmtMag=m=>{if(m<1.05)return"×1";if(m<1e6){const p=Math.pow(10,Math.max(0,Math.floor(Math.log10(m))-1));return"×"+(Math.round(m/p)*p).toLocaleString("sv-SE");}
  for(const[v,en,fl]of[[1e12,"biljon","biljoner"],[1e9,"miljard","miljarder"],[1e6,"miljon","miljoner"]])if(m>=v){const q=m/v,s=q>=10?String(Math.round(q)):String(Math.round(q*10)/10).replace(".",",");return"×"+s+" "+(s==="1"?en:fl);}};

/* ---------- Scenerna ---------- */
function scenes(E,hem){
  const {A,eo,cl,lerp,seg,font,glowDot}=E;
  const tx=(t,px,py,col,al,sz,w)=>{const x=E.x;x.font=font(w||600,sz||12);x.textAlign=al||"left";x.lineJoin="round";x.lineWidth=3.5;x.strokeStyle="rgba(3,6,14,.72)";x.strokeText(t,px,py);x.fillStyle=col||"rgba(255,255,255,.85)";x.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#7fd6ff",al,11,700);
  const G=()=>{const a=A(),port=E.W<E.H*.9;return{a,s:Math.min(a.w,a.h)*(port?1:.93),cx:a.x+a.w*(port?.5:.57),cy:a.y+a.h*(port?.5:.525),port};}; // liggande: lite åt höger, undertexten står nere till vänster
  const line=(x1,y1,x2,y2,col,w,dash)=>{const x=E.x;x.strokeStyle=col;x.lineWidth=w||1;if(dash)x.setLineDash(dash);x.beginPath();x.moveTo(x1,y1);x.lineTo(x2,y2);x.stroke();x.setLineDash([]);};
  const dim=(x1,y,x2,label,col)=>{line(x1,y,x2,y,col||"#ffd86b",1.3);line(x1,y-6,x1,y+6,col||"#ffd86b",1.3);line(x2,y-6,x2,y+6,col||"#ffd86b",1.3);tx(label,(x1+x2)/2,y-10,col||"#ffd86b","center",13,700);};
  // en etikett med tunn pekare från (px,py) till texten
  const pek=(t,px,py,lx,ly,al,col)=>{const x=E.x;x.font=font(600,13);const tw=x.measureText(t).width+10;if(al!=="right"&&lx+tw>E.W-6)lx=E.W-6-tw;if(al==="right"&&lx-tw<6)lx=6+tw;line(px,py,lx,ly,"rgba(255,255,255,.55)",1);x.fillStyle="#fff";x.beginPath();x.arc(px,py,2.2,0,TAU);x.fill();tx(t,lx+(al==="right"?-6:6),ly+4,col||"rgba(255,255,255,.92)",al||"left",13,600);};
  const syns=(px,py,rr,o)=>Math.hypot(px-o.vc[0],py-o.vc[1])<o.vr+rr;
  // ett DNA-band längs en lista punkter (mitt + normal), med två ryggar och färgade stegpinnar (samma färger som DNA-stegen)
  const FB=["#5bd67a","#ff6b6b","#5aa8ff","#ffd24a"],PAR=[1,0,3,2];
  const dnaBand=(pts,cx,cy,S,w)=>{const x=E.x,ga=x.globalAlpha;x.lineCap="round";
    for(let k=0;k<pts.length;k++){const p=pts[k],c=Math.cos(p.i*.62),ox=p.nx*w*c,oy=p.ny*w*c,ax=cx+p.x*S,ay=cy+p.y*S,b=BASER[p.i%30];x.globalAlpha=ga*p.f;x.lineWidth=Math.max(1,S*.012);
      x.strokeStyle=FB[b];x.beginPath();x.moveTo(ax+ox*S,ay+oy*S);x.lineTo(ax,ay);x.stroke();x.strokeStyle=FB[PAR[b]];x.beginPath();x.moveTo(ax,ay);x.lineTo(ax-ox*S,ay-oy*S);x.stroke();}
    [1,-1].forEach(sd=>{x.strokeStyle=sd>0?"rgba(170,195,255,.95)":"rgba(255,180,212,.95)";x.lineWidth=Math.max(1.3,S*.017);for(let k=1;k<pts.length;k++){const a=pts[k-1],b=pts[k];x.globalAlpha=ga*b.f;const ca=Math.cos(a.i*.62)*w*sd,cb=Math.cos(b.i*.62)*w*sd;
      x.beginPath();x.moveTo(cx+(a.x+a.nx*ca)*S,cy+(a.y+a.ny*ca)*S);x.lineTo(cx+(b.x+b.nx*cb)*S,cy+(b.y+b.ny*cb)*S);x.stroke();}});x.globalAlpha=ga;};

  /* nivåer: ritas runt (cx,cy) med storlek S och tid t. o = {d: etiketternas synlighet 0–1, hide: hur mycket av nästa nivå som tagit över, st: klockorna, vc/vr: synlig del} */
  const LV=[
  // 0 · Handen (handryggen): fingrar som smalnar av, med leder, naglar och mjuk skuggning. Fingrarna rör sig lite.
  (cx,cy,S,t,o)=>{const x=E.x,u=S*.0039,d=o.d;x.save();x.translate(cx,cy-u*38);x.scale(u,u);x.rotate(-.05);
    const KANT="rgba(120,68,48,.62)";
    x.fillStyle="rgba(0,0,0,.28)";x.beginPath();x.ellipse(8,60,52,66,0,0,TAU);x.fill();
    const HW=[[.06,.5],[-.2,.455],[-.42,.495],[-.57,.43],[-.72,.46],[-.88,.4],[-.975,.27]];
    const finger=(x0,y0,len,w,ang,boj,nagel)=>{x.save();x.translate(x0,y0);x.rotate(ang+boj);
      const L=HW.map(([yy,hw])=>[-hw*w,yy*len]),R=HW.map(([yy,hw])=>[hw*w,yy*len]).reverse(),P=[...L,[0,-len*1.01],...R];
      x.beginPath();x.moveTo(P[0][0],P[0][1]+w*.5);x.lineTo(P[0][0],P[0][1]);for(let k=1;k<P.length-1;k++){const mx=(P[k][0]+P[k+1][0])/2,my=(P[k][1]+P[k+1][1])/2;x.quadraticCurveTo(P[k][0],P[k][1],mx,my);}x.lineTo(P[P.length-1][0],P[P.length-1][1]);x.lineTo(P[P.length-1][0],P[P.length-1][1]+w*.5);x.closePath();
      const g=x.createLinearGradient(-w*.5,0,w*.5,0);g.addColorStop(0,"#d39a79");g.addColorStop(.22,"#eec3a3");g.addColorStop(.55,"#f5d0b3");g.addColorStop(.85,"#e2ad8b");g.addColorStop(1,"#c68a68");x.fillStyle=g;x.fill();x.strokeStyle=KANT;x.lineWidth=.9;x.stroke();
      x.strokeStyle="rgba(130,75,55,.42)";x.lineWidth=.8;[[-.42,.33],[-.4,.24],[-.44,.2],[-.72,.3],[-.7,.2]].forEach(([yy,b],k)=>{x.beginPath();x.moveTo(-w*b,yy*len);x.quadraticCurveTo(0,yy*len+(k%2?1.2:1.8),w*b,yy*len);x.stroke();});
      if(nagel!==false){const ny=-len*.985,nh=len*.17,nw=w*.29;x.beginPath();x.moveTo(-nw,ny+nh);x.quadraticCurveTo(-nw*1.08,ny+nh*.3,-nw*.7,ny+nh*.06);x.quadraticCurveTo(0,ny-nh*.12,nw*.7,ny+nh*.06);x.quadraticCurveTo(nw*1.08,ny+nh*.3,nw,ny+nh);x.quadraticCurveTo(0,ny+nh*1.18,-nw,ny+nh);x.closePath();
        const ng=x.createLinearGradient(-nw,0,nw,0);ng.addColorStop(0,"#f3cfc2");ng.addColorStop(.45,"#fdeee6");ng.addColorStop(1,"#eec2b4");x.fillStyle=ng;x.fill();x.strokeStyle="rgba(150,90,80,.55)";x.lineWidth=.7;x.stroke();
        x.strokeStyle="rgba(255,255,255,.75)";x.lineWidth=.9;x.beginPath();x.moveTo(-nw*.35,ny+nh*.28);x.lineTo(-nw*.3,ny+nh*.78);x.stroke();
        x.fillStyle="rgba(255,255,255,.5)";x.beginPath();x.ellipse(0,ny+nh*.98,nw*.55,nh*.16,0,Math.PI,TAU);x.fill();}
      x.restore();};
    const v=i=>Math.sin(t*1.1+i*1.3)*.03;
    finger(-30,56,58,20,-.8,v(0)*1.4);
    finger(-25,3,55,16.6,-.15,v(1));finger(-8.3,-3.5,64,17.2,-.045,v(2));finger(8.8,-2.5,59,16.6,.05,v(3));finger(25,4.5,46,14.4,.16,v(4));
    const rygg=()=>{x.beginPath();x.moveTo(-23,122);x.bezierCurveTo(-25,100,-33,88,-38,70);x.bezierCurveTo(-43,52,-38,22,-32,9);x.quadraticCurveTo(-28,-3,-20,-3);x.quadraticCurveTo(-8,-10,6,-8);x.quadraticCurveTo(20,-6,29,1);x.quadraticCurveTo(35,8,35,22);x.bezierCurveTo(37,50,33,78,26,96);x.bezierCurveTo(24,106,24,114,24,122);x.closePath();};
    rygg();const pg=x.createRadialGradient(-10,30,6,0,55,84);pg.addColorStop(0,"#f6d3b6");pg.addColorStop(.55,"#ecbe9d");pg.addColorStop(1,"#cd9270");x.fillStyle=pg;x.fill();
    x.strokeStyle=KANT;x.lineWidth=.9;x.beginPath();x.moveTo(-23,122);x.bezierCurveTo(-25,100,-33,88,-38,70);x.bezierCurveTo(-43,52,-38,22,-32,9);x.stroke();x.beginPath();x.moveTo(35,22);x.bezierCurveTo(37,50,33,78,26,96);x.bezierCurveTo(24,106,24,114,24,122);x.stroke();
    [[-24,4,6.6],[-8,-1.5,7],[9,-.5,6.8],[24,5.5,6]].forEach(([kx,ky,r])=>{const kg=x.createRadialGradient(kx-1,ky+1,.5,kx,ky+2,r*1.25);kg.addColorStop(0,"rgba(255,232,214,.85)");kg.addColorStop(1,"rgba(255,232,214,0)");x.fillStyle=kg;x.beginPath();x.arc(kx,ky+2,r*1.25,0,TAU);x.fill();
      x.strokeStyle="rgba(130,75,55,.34)";x.lineWidth=.8;x.beginPath();x.arc(kx,ky+1.5,r*.72,Math.PI*.12,Math.PI*.88);x.stroke();x.beginPath();x.arc(kx,ky+4,r*.5,Math.PI*.18,Math.PI*.82);x.stroke();});
    x.strokeStyle="rgba(120,68,48,.3)";x.lineWidth=1;[[-16,-1],[1,-4.5],[17,-1]].forEach(([sx,sy])=>{x.beginPath();x.moveTo(sx,sy);x.quadraticCurveTo(sx+.6,sy+6,sx-.4,sy+11);x.stroke();});
    x.beginPath();x.moveTo(-35,34);x.quadraticCurveTo(-27,44,-29,58);x.stroke();
    const arm=x.createLinearGradient(-34,0,34,0);arm.addColorStop(0,"#6d88ff");arm.addColorStop(.5,"#4a65ee");arm.addColorStop(1,"#2c43c0");x.fillStyle=arm;x.strokeStyle="#1d2f96";x.lineWidth=1.1;x.beginPath();x.roundRect(-33,113,67,50,11);x.fill();x.stroke();
    x.strokeStyle="rgba(255,255,255,.4)";x.lineWidth=1;x.beginPath();x.moveTo(-28,122);x.quadraticCurveTo(0,125,29,122);x.stroke();x.strokeStyle="rgba(20,30,110,.35)";x.beginPath();x.moveTo(-10,128);x.quadraticCurveTo(-8,145,-12,160);x.moveTo(12,130);x.quadraticCurveTo(15,146,11,160);x.stroke();
    x.restore();
    if(d){x.globalAlpha*=d;dim(cx-u*66,cy-u*45-u*84,cx+u*37,"ungefär 10 cm");}},
  // 1 · Hudens yta: fåror i ett nät, porer, några hårstrån. Kanten tonar ut så att ytan smälter in i handen.
  (cx,cy,S,t,o)=>{const x=E.x,d=o.d,ga=x.globalAlpha,BAS="240,199,170";
    let g=x.createRadialGradient(cx,cy,0,cx,cy,S*1.9);g.addColorStop(0,`rgba(${BAS},1)`);g.addColorStop(.47,`rgba(${BAS},1)`);g.addColorStop(1,`rgba(${BAS},0)`);x.fillStyle=g;x.beginPath();x.arc(cx,cy,S*1.9,0,TAU);x.fill();
    HY.B.forEach(b=>{const al=b.a*(1-sg(Math.hypot(b.x,b.y),1.0,1.6));if(al<=0)return;const px=cx+b.x*S,py=cy+b.y*S,rr=b.r*S;if(!syns(px,py,rr,o))return;const c=b.l?"255,228,205":"205,140,112",gg=x.createRadialGradient(px,py,0,px,py,rr);gg.addColorStop(0,`rgba(${c},${al})`);gg.addColorStop(1,`rgba(${c},0)`);x.fillStyle=gg;x.beginPath();x.arc(px,py,rr,0,TAU);x.fill();});
    const bk=[[],[],[],[],[]];HY.S.forEach(s=>{const al=(1-sg(Math.hypot((s[0][0]+s[1][0])/2,(s[0][1]+s[1][1])/2),1.1,1.75))*s[2];if(al<.06)return;bk[Math.min(4,Math.floor(al*5))].push(s);});
    x.lineCap="round";bk.forEach((L,b)=>{if(!L.length)return;const al=(b+.5)/5,path=(oy)=>{x.beginPath();L.forEach(s=>{x.moveTo(cx+s[0][0]*S,cy+s[0][1]*S+oy);x.lineTo(cx+s[1][0]*S,cy+s[1][1]*S+oy);});x.stroke();};
      x.strokeStyle=`rgba(255,238,222,${al*.6})`;x.lineWidth=S*.007;path(S*.008);x.strokeStyle=`rgba(158,94,72,${al*.75})`;x.lineWidth=S*.012;path(0);});
    HY.P.forEach(p=>{const al=1-sg(Math.hypot(p[0],p[1]),1.1,1.7);if(al<=0)return;x.globalAlpha=ga*al;x.fillStyle="rgba(255,236,220,.7)";x.beginPath();x.ellipse(cx+p[0]*S,cy+p[1]*S+S*.005,S*.014,S*.011,0,0,TAU);x.fill();x.fillStyle="rgba(110,58,46,.7)";x.beginPath();x.ellipse(cx+p[0]*S,cy+p[1]*S,S*.011,S*.0085,0,0,TAU);x.fill();});
    HY.H.forEach((h,k)=>{const a=h.a+Math.sin(t*.8+h.ph)*.05,L=h.l*S,bx=cx+h.x*S,by=cy+h.y*S,ex=bx+Math.cos(a)*L,ey=by+Math.sin(a)*L,mx=bx+Math.cos(a+.25)*L*.55,my=by+Math.sin(a+.25)*L*.55,n=14,lf=[],rt=[];
      for(let i=0;i<=n;i++){const u=i/n,px=(1-u)*(1-u)*bx+2*(1-u)*u*mx+u*u*ex,py=(1-u)*(1-u)*by+2*(1-u)*u*my+u*u*ey,tx2=2*(1-u)*(mx-bx)+2*u*(ex-mx),ty2=2*(1-u)*(my-by)+2*u*(ey-my),tl=Math.hypot(tx2,ty2)||1,w=S*.009*(1-u*.9);lf.push([px-ty2/tl*w,py+tx2/tl*w]);rt.push([px+ty2/tl*w,py-tx2/tl*w]);}
      x.globalAlpha=ga;x.fillStyle="rgba(70,40,26,.22)";x.beginPath();lf.forEach((p,i)=>i?x.lineTo(p[0]+S*.012,p[1]+S*.016):x.moveTo(p[0]+S*.012,p[1]+S*.016));rt.reverse().forEach(p=>x.lineTo(p[0]+S*.012,p[1]+S*.016));x.fill();rt.reverse();
      x.fillStyle="rgba(96,62,42,.9)";x.beginPath();lf.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));rt.reverse().forEach(p=>x.lineTo(p[0],p[1]));x.fill();});
    x.globalAlpha=ga;
    if(d){x.globalAlpha*=d;tg("Hudens yta",cx,cy-S*.42,"#7fd6ff","center");pek("Hudfåra",cx+HY.lab.f[0]*S,cy+HY.lab.f[1]*S,cx-S*.62,cy+S*.3,"right");pek("Por",cx+HY.lab.p[0]*S,cy+HY.lab.p[1]*S,cx+S*.55,cy-S*.3,"left");
      const h=HY.H[0];if(h)pek("Hårstrå",cx+(h.x+Math.cos(h.a)*h.l*.6)*S,cy+(h.y+Math.sin(h.a)*h.l*.6)*S,cx+S*.5,cy-S*.12,"left");dim(cx-S*.0333,cy+S*.4,cx+S*.0333,"1 mm");}},
  // 2 · Hornlagret: döda, platta celler som fjäll. Några lyfter lite, några flagor släpper.
  (cx,cy,S,t,o)=>{const x=E.x,d=o.d,ga=x.globalAlpha;
    let g=x.createRadialGradient(cx,cy,0,cx,cy,S*2.15);g.addColorStop(0,"rgba(214,168,138,1)");g.addColorStop(.45,"rgba(214,168,138,1)");g.addColorStop(1,"rgba(214,168,138,0)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,S*2.15,0,TAU);x.fill();
    const plat=(p,ox,oy,k,col)=>{x.beginPath();p.v.forEach((q,i)=>{const px=cx+(p.x+q[0]*k)*S+ox,py=cy+(p.y+q[1]*k)*S+oy;i?x.lineTo(px,py):x.moveTo(px,py);});x.closePath();x.fillStyle=col;x.fill();};
    const lw=Math.max(.6,S*.004),rr=S*.08,fin=S*.06>6;x.lineJoin="round";if(S*.06>1.8)
    PL.forEach(p=>{const al=1-sg(Math.hypot(p.x,p.y),1.1,2.1);if(al<=0)return;const px=cx+p.x*S,py=cy+p.y*S;if(!syns(px,py,rr,o))return;x.globalAlpha=ga*al;
      const lift=p.lift?(.55+.45*Math.sin(t*.6+p.ph)):0;if(lift){x.fillStyle="rgba(60,30,20,.28)";plat(p,S*.008*lift,S*.014*lift,1.04,"rgba(60,30,20,.28)");}
      plat(p,-S*.006*lift,-S*.012*lift,1,PCOL[p.c]);if(fin){x.strokeStyle="rgba(140,98,74,.7)";x.lineWidth=lw;x.stroke();}if(!fin)return;
      x.strokeStyle="rgba(255,248,238,.55)";x.lineWidth=lw*.8;x.beginPath();x.moveTo(px+p.v[3][0]*S*.7-S*.006*lift,py+p.v[3][1]*S*.7-S*.012*lift);x.lineTo(px+p.v[4][0]*S*.7-S*.006*lift,py+p.v[4][1]*S*.7-S*.012*lift);x.stroke();});
    // flagor som släpper och far förbi kameran
    for(let i=0;i<5;i++){const q=(t*.055+i*.2)%1,p=PL[(i*311+97)%PL.length],k=1+q*2.6,al=Math.sin(q*Math.PI)*.9*(1-sg(Math.hypot(p.x,p.y),1.2,1.8));if(al<=0)continue;x.globalAlpha=ga*al;
      plat(p,S*.03*k,S*.04*k-q*S*.1,k*1.02,"rgba(50,25,15,.25)");plat(p,0,-q*S*.16,k,"#f8e6d2");x.strokeStyle="rgba(140,98,74,.6)";x.lineWidth=lw*k;x.stroke();}
    x.globalAlpha=ga;
    if(d){x.globalAlpha*=d;tg("Hornlagret · döda, platta hudceller",cx,cy-S*.42,"#7fd6ff","center");const p=PL.reduce((b,q)=>Math.hypot(q.x-.16,q.y-.12)<Math.hypot(b.x-.16,b.y-.12)?q:b,PL[0]);
      pek("Död hudcell · utan cellkärna",cx+p.x*S,cy+p.y*S,cx+S*.5,cy+S*.32,"left");dim(cx-S*.062,cy+S*.44,cx+S*.062,"ungefär 0,04 mm");}},
  // 3 · De levande cellerna under hornlagret (nivå 4 är cellen i hålet)
  (cx,cy,S,t,o)=>{const x=E.x,d=o.d,ga=x.globalAlpha,bn=boll("#c9a8ff","#5b3fb0");
    CE.c.forEach(c=>{const rx=c.rx*S;if(rx<1.2)return;const px=cx+c.x*S,py=cy+c.y*S;if(!syns(px,py,rx,o))return;const al=1-sg(Math.hypot(c.x,c.y),2.0,2.45);if(al<=0)return;x.globalAlpha=ga*al;
      const k=1+.025*Math.sin(t*.7+c.ph);x.beginPath();x.ellipse(px,py,rx*k,c.ry*S*k,c.a,0,TAU);x.fillStyle="rgba(66,140,205,.34)";x.fill();
      if(rx>4){x.strokeStyle="rgba(150,220,255,.85)";x.lineWidth=Math.max(1,rx*.022);x.stroke();}
      if(rx>14){x.fillStyle="#ff9d4d";for(let m=0;m<3;m++){const a=c.m+m*2.1,mx=px+Math.cos(a)*rx*.62,my=py+Math.sin(a)*rx*.55;x.save();x.translate(mx,my);x.rotate(a+1.2);x.beginPath();x.roundRect(-rx*.1,-rx*.04,rx*.2,rx*.08,rx*.04);x.fill();x.restore();}}
      ritaBoll(x,bn,px+c.nx*rx,py+c.ny*rx,rx*.31);});
    x.globalAlpha=ga;if(d){x.globalAlpha*=d;tg("Levande hudceller",cx,cy-S*.42,"#7fd6ff","center");}},
  // 4 · En cell (cellkärnan ligger i mitten)
  (cx,cy,S,t,o)=>{const x=E.x,d=o.d,R=S*.4,ox=cx+R*.14,oy=cy-R*.04;
    x.beginPath();for(let i=0;i<=72;i++){const a=i/72*TAU,rr=R*(1+.035*Math.sin(a*5+t*.7)+.02*Math.sin(a*9-t*.5)),px=ox+Math.cos(a)*rr*1.06,py=oy+Math.sin(a)*rr*.92;i?x.lineTo(px,py):x.moveTo(px,py);}x.closePath();
    const g=x.createRadialGradient(ox,oy,R*.1,ox,oy,R*1.1);g.addColorStop(0,"rgba(70,150,215,.30)");g.addColorStop(.8,"rgba(60,130,205,.24)");g.addColorStop(1,"rgba(120,200,255,.42)");x.fillStyle=g;x.fill();
    x.strokeStyle="rgba(150,220,255,.9)";x.lineWidth=Math.max(1,R*.022);x.stroke();x.strokeStyle="rgba(20,60,110,.6)";x.lineWidth=Math.max(.6,R*.006);x.stroke();
    x.fillStyle="rgba(200,230,255,.55)";RIBO.forEach(([a,b,ph])=>{const s=R*.012*(1+.3*Math.sin(t*2+ph));x.fillRect(ox+a*R*.95,oy+b*R*.8,s,s);});
    x.strokeStyle="rgba(190,150,255,.55)";x.lineWidth=Math.max(1,R*.02);for(let j=0;j<4;j++){x.beginPath();for(let i=0;i<=40;i++){const a=-1.2+i/40*2.6+j*.2,rr=R*(.44+j*.055)+Math.sin(i*1.3+t+j)*R*.012,px=cx+Math.cos(a)*rr,py=cy+Math.sin(a)*rr;i?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();}
    x.strokeStyle="rgba(255,214,107,.75)";x.lineWidth=Math.max(1,R*.026);x.lineCap="round";for(let j=0;j<4;j++){x.beginPath();x.arc(cx-R*.86,cy+R*.1,R*(.2+j*.045),-.75,.75);x.stroke();}
    [[.62,-.5,.5],[.78,.3,-.4],[.1,.68,.2],[-.5,.6,1.2],[.25,-.72,-.2],[-.6,-.52,.9]].forEach(([mx,my,ma],i)=>{const px=ox+mx*R+Math.sin(t*.5+i)*R*.02,py=oy+my*R*.86+Math.cos(t*.4+i*2)*R*.02,l=R*.2,w=R*.085;x.save();x.translate(px,py);x.rotate(ma+Math.sin(t*.3+i)*.1);
      x.fillStyle="#ff9d4d";x.strokeStyle="#b8551a";x.lineWidth=Math.max(.5,R*.008);x.beginPath();x.roundRect(-l/2,-w/2,l,w,w/2);x.fill();x.stroke();x.strokeStyle="rgba(120,50,10,.7)";x.beginPath();for(let q=0;q<=10;q++){const xx=-l*.4+q*l*.08,yy=(q%2?-1:1)*w*.26;q?x.lineTo(xx,yy):x.moveTo(xx,yy);}x.stroke();x.restore();});
    const b1=boll("#c9ffd9","#3fbf7f"),b2=boll("#fff3b0","#e0a020");for(let i=0;i<12;i++){const a=t*.12*(i%2?1:-1)+i*.52,rr=R*(.5+.32*Math.sin(i*2.1+t*.2)),px=ox+Math.cos(a)*rr,py=oy+Math.sin(a)*rr*.82;ritaBoll(x,i%3?b1:b2,px,py,R*.028);}
    // cellkärnan i mitten: en solid kula som blir genomskinlig när kameran kommer nära (då tar nivå 5 över)
    if(o.hide<1){const ga=x.globalAlpha;x.globalAlpha=ga*(1-o.hide);ritaBoll(x,boll("#c9a8ff","#5b3fb0"),cx,cy,R*.33);x.fillStyle="rgba(60,30,120,.55)";x.beginPath();x.arc(cx+R*.07,cy+R*.05,R*.09,0,TAU);x.fill();x.globalAlpha=ga;}
    if(d){x.globalAlpha*=d;pek("Cellkärnan",cx-R*.12,cy-R*.2,cx-R*.75,cy-R*.92,"right");pek("Mitokondrie · cellens kraftverk",ox+.78*R,oy+.3*R*.86,cx+R*.5,cy+R*1.04,"left");pek("Cellmembran",ox+Math.cos(-.5)*R*1.06,oy+Math.sin(-.5)*R*.92,cx+R*.72,cy-R*.95,"left");
      dim(ox-R*1.06,cy+R*1.2,ox+R*1.06,"ungefär 0,03 mm");}},
  // 5 · Cellkärnan med kromosomtrådarna (snurrar långsamt, stannar när kameran ska in i en tråd)
  (cx,cy,S,t,o)=>{const x=E.x,d=o.d,R=S*.4,ay=o.st.ay5,ax=.25;
    let g=x.createRadialGradient(cx-R*.3,cy-R*.35,R*.1,cx,cy,R);g.addColorStop(0,"rgba(190,160,255,.30)");g.addColorStop(.75,"rgba(110,80,210,.24)");g.addColorStop(1,"rgba(170,140,255,.5)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,R,0,TAU);x.fill();
    const lista=TRAD.map(tr=>{const p=tr.p.map(q=>rot(q,ay,ax));return{p,z:p[3][2],h:tr.h};}).sort((a,b)=>a.z-b.z);
    x.lineCap="round";x.lineJoin="round";lista.forEach(tr=>{const lj=.5+.5*(tr.z+1)/2;x.strokeStyle=`hsla(${tr.h},85%,${48+lj*24}%,${.45+lj*.5})`;x.lineWidth=Math.max(1.2,R*.02*(.7+lj*.6));x.beginPath();
      tr.p.forEach((q,i)=>{const px=cx+q[0]*R,py=cy+q[1]*R;if(!i)x.moveTo(px,py);else{const pr=tr.p[i-1],mx=cx+(pr[0]+q[0])/2*R,my=cy+(pr[1]+q[1])/2*R;x.quadraticCurveTo(cx+pr[0]*R,cy+pr[1]*R,mx,my);}});x.stroke();});
    x.strokeStyle="rgba(200,180,255,.85)";x.lineWidth=Math.max(1.5,R*.02);x.beginPath();x.arc(cx,cy,R,0,TAU);x.stroke();
    PORER.forEach(q=>{const p=rot(q,ay*1.4,ax);if(p[2]<.1)return;x.fillStyle=`rgba(40,20,90,${.25+p[2]*.4})`;x.beginPath();x.ellipse(cx+p[0]*R,cy+p[1]*R,R*.022*p[2]+1,R*.022,0,0,TAU);x.fill();});
    if(d){x.globalAlpha*=d;tg("46 kromosomer · trådar av DNA",cx,cy-R-16,"#ffd86b","center");pek("Porer i kärnans skal",cx+R*.72,cy-R*.66,cx+R*1.02,cy-R*.95,"left");tx("Allt DNA i en cellkärna: ungefär 2 meter",cx,cy+R+30,"rgba(255,236,170,.92)","center",13);}},
  // 6 · Kromosomtråden: hoprullat DNA, som ett pärlband i spiral (varje kula är DNA lindat runt proteiner)
  (cx,cy,S,t,o)=>{const x=E.x,d=o.d,ga=x.globalAlpha,h=L6val.h,bl=boll(`hsl(${h},90%,82%)`,`hsl(${h},70%,44%)`),bd=boll(`hsl(${h},70%,64%)`,`hsl(${h},60%,26%)`);
    x.strokeStyle=`hsla(${h},70%,85%,.5)`;x.lineWidth=Math.max(.8,S*.01);x.beginPath();let f=true;BE.idx.forEach(b=>{if(Math.abs(b.x)>2)return;const px=cx+b.x*S,py=cy+b.y*S;f?x.moveTo(px,py):x.lineTo(px,py);f=false;});x.stroke();
    BE.dep.forEach(b=>{const al=1-sg(Math.abs(b.x),1.15,2.0);if(al<=0)return;const px=cx+b.x*S,py=cy+b.y*S,r=S*.045*(1+.12*b.d);if(!syns(px,py,r,o))return;x.globalAlpha=ga*al*(b.i===0?1-o.hide:1)*(.55+.45*(b.d+1)/2);ritaBoll(x,b.d>0?bl:bd,px,py,r);});
    x.globalAlpha=ga;if(d){x.globalAlpha*=d;tg("Kromosomtråden · hoprullat DNA",cx,cy-S*.42,"#ffd86b","center");pek("DNA lindat runt små proteinkulor",cx,cy-S*.05,cx+S*.3,cy+S*.36,"left");}},
  // 7 · Nukleosomen: DNA-bandet lindat nästan två varv runt en kula av proteiner
  (cx,cy,S,t,o)=>{const x=E.x,d=o.d,h=L6val.h,b=boll(`hsl(${h},85%,80%)`,`hsl(${h},65%,40%)`),R=S*.135;
    const kl=[];for(let k=0;k<8;k++){const a=k*TAU/4+(k>3?TAU/8:0),z=k>3?1:-1;kl.push({x:Math.cos(a)*S*.115,y:Math.sin(a)*S*.115+z*S*.012,z});}kl.sort((a,b)=>a.z-b.z).forEach(q=>ritaBoll(x,b,cx+q.x,cy+q.y,R*(q.z>0?1:.92)));
    dnaBand(NU.pts,cx,cy,S,.055);
    if(d){x.globalAlpha*=d;tg("DNA lindat runt en kula av proteiner",cx,cy+S*.6,"#ffd86b","center");}},
  // 8 · DNA: en vriden stege i 3D, lång (den ena änden går in i nukleosomen). Vridningen stannar när kameran ska in i en atom.
  (cx,cy,S,t,o)=>{const x=E.x,d=o.d,ga=x.globalAlpha,amp=S*.14,ang=.4,ca=Math.cos(ang),sa=Math.sin(ang),delar=[],p8=o.st.p8,i0=-28,i1=88;
    const b1=boll("#dfe9ff","#6f86c8"),b2=boll("#ffe1ef","#c76f9c");
    for(let i=i0;i<=i1;i++){const s=i*.0455*S,ph=i*.62+p8,c=Math.cos(ph),z=Math.sin(ph),ax=cx+s*ca,ay=cy+s*sa,px=-sa*amp*c,py=ca*amp*c,fa=1-sg(i,i1-16,i1);
      const p1=[ax+px,ay+py],p2=[ax-px,ay-py];delar.push({z:0,p1,p2,b:BASER[((i%30)+30)%30],fa},{z,boll:b1,p:p1,fa:fa*(i===L9val.i?1-o.hide:1)},{z:-z,boll:b2,p:p2,fa});}
    [1,2].forEach(k=>{x.strokeStyle=k===1?"rgba(160,185,255,.45)":"rgba(255,170,205,.45)";x.lineWidth=Math.max(1.3,S*.012);x.lineJoin="round";x.beginPath();for(let i=0;i<=i1-i0-6;i++){const q=delar[i*3+k].p;i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]);}x.stroke();});
    delar.sort((a,b)=>a.z-b.z).forEach(o2=>{if(o2.fa<=0)return;x.globalAlpha=ga*o2.fa;if(o2.boll){ritaBoll(x,o2.boll,o2.p[0],o2.p[1],S*.026*(1+.28*o2.z));}else{const mx=(o2.p1[0]+o2.p2[0])/2,my=(o2.p1[1]+o2.p2[1])/2;x.lineCap="round";x.lineWidth=Math.max(1.2,S*.017);
      x.strokeStyle=FB[o2.b];x.beginPath();x.moveTo(o2.p1[0],o2.p1[1]);x.lineTo(mx,my);x.stroke();x.strokeStyle=FB[PAR[o2.b]];x.beginPath();x.moveTo(mx,my);x.lineTo(o2.p2[0],o2.p2[1]);x.stroke();}});
    x.globalAlpha=ga;
    if(d){x.globalAlpha*=d;const ly=cy-S*.43,lx=cx-S*.02;[["A",0],["T",1],["C",2],["G",3]].forEach(([b,i],k)=>{const px=lx+k*S*.11+(k>1?S*.05:0);x.fillStyle=FB[i];x.beginPath();x.roundRect(px,ly-13,S*.09,18,6);x.fill();x.font=font(800,13);x.textAlign="center";x.fillStyle="#08101e";x.fillText(b,px+S*.045,ly+1);});
      tx("A sitter alltid ihop med T, och C med G",lx,ly+26,"rgba(255,255,255,.85)","left",12);tg("2 miljondels millimeter brett",lx,ly+48,"#ffd86b","left");}},
  // 9 · En kolatom: elektronmoln med kärnan som en prick i mitten
  (cx,cy,S,t,o)=>{const x=E.x,d=o.d,R=S*.42,m=bakaMoln(),inne=1-sg(S/o.Sv,1.4,7);x.save();x.globalAlpha*=inne;x.globalCompositeOperation="lighter";x.translate(cx,cy);x.rotate(t*.05);const k=1+.02*Math.sin(t*1.3);x.drawImage(m,-R*k,-R*k,R*2*k,R*2*k);x.rotate(-t*.11);x.globalAlpha*=.6;x.drawImage(m,-R*.97,-R*.97,R*1.94,R*1.94);x.restore();
    x.save();x.globalAlpha*=inne;for(let i=0;i<6;i++){const steg=Math.floor(t*1.6+i*.37),q=(t*1.6+i*.37)%1,r=frand(steg*13+i*101+7),a=r()*TAU,rad=i<2?R*.2*(.4+r()):R*(.5+r()*.34);x.save();x.globalAlpha*=Math.sin(q*Math.PI);glowDot(cx+Math.cos(a)*rad,cy+Math.sin(a)*rad,clamp(S*.007,2,9),"rgba(140,220,255,1)");x.restore();}
    x.restore();if(o.hide<1){x.save();x.globalAlpha*=1-o.hide;glowDot(cx,cy,clamp(S*2e-5,1.6,6),"rgba(255,216,140,1)");x.restore();}
    if(d){x.globalAlpha*=d;pek("Atomkärnan (här inne)",cx,cy,cx+R*.5,cy-R*.86,"left","#ffe2a8");pek("Elektronmolnet · 6 elektroner",cx-R*.62,cy+R*.3,cx-R*.9,cy+R*.95,"left");tg("Kolatom",cx,cy-R-14,"#7fd6ff","center");dim(cx-R*.86,cy+R+26,cx+R*.86,"en tiomiljondels millimeter");}},
  // 10 · Atomkärnan: sex protoner och sex neutroner (snurrar, stannar när kameran ska in i en proton)
  (cx,cy,S,t,o)=>{const x=E.x,d=o.d,ga=x.globalAlpha,R=S*.36,bp=boll("#ffb3a1","#c7372a"),bn=boll("#dfe6f2","#6c7c98"),lista=NUKL.map((n,i)=>{const p=nukPos(i,o.st.t10);return{x:p[0],y:p[1],z:p[2],proton:n.proton,i};}).sort((a,b)=>a.z-b.z);
    const gl=x.createRadialGradient(cx,cy,R*.3,cx,cy,R*1.5);gl.addColorStop(0,"rgba(255,170,110,.22)");gl.addColorStop(1,"rgba(255,120,60,0)");x.fillStyle=gl;x.beginPath();x.arc(cx,cy,R*1.5,0,TAU);x.fill();
    lista.forEach(n=>{const r=R*.4*(1+.12*n.z),px=cx+n.x*R,py=cy+n.y*R;x.globalAlpha=ga*(n.i===L11val.i?1-o.hide:1);if(x.globalAlpha<=0)return;ritaBoll(x,n.proton?bp:bn,px,py,r);if(d&&n.proton&&n.z>.1){x.save();x.globalAlpha*=Math.min(1,n.z*1.6)*d;tx("+",px,py+r*.3,"rgba(255,255,255,.95)","center",Math.max(10,r*.85),800);x.restore();}});
    x.globalAlpha=ga;
    if(d){x.globalAlpha*=d;const fr=[...lista].reverse(),p=fr.find(n=>n.proton),ne=fr.find(n=>!n.proton);if(p)pek("Proton",cx+p.x*R,cy+p.y*R,cx-R*1.1,cy-R*1.05,"right","#ffc2b5");if(ne)pek("Neutron",cx+ne.x*R,cy+ne.y*R,cx+R*1.1,cy-R*1.05,"left","#dfe6f2");
      const ax=cx,ay=cy+R*1.42,aw=S*.2,ah=aw*.42;x.strokeStyle="rgba(127,214,255,.7)";x.lineWidth=1.3;x.beginPath();x.ellipse(ax,ay,aw,ah,0,0,TAU);x.stroke();x.beginPath();x.ellipse(ax,ay,aw*.62,ah*.6,0,0,TAU);x.stroke();line(ax,ay-ah*.6,ax,ay+ah*.6,"rgba(127,214,255,.5)",1);
      x.fillStyle="#ffd86b";x.beginPath();x.arc(ax,ay,2,0,TAU);x.fill();tx("Atomen = en arena · kärnan = en ärta på mittpunkten",ax,ay+ah+18,"rgba(255,236,170,.92)","center",12);}},
  // 11 · En proton med tre kvarkar och gluonerna som håller ihop dem (modell)
  (cx,cy,S,t,o)=>{const x=E.x,d=o.d,R=S*.36;
    let g=x.createRadialGradient(cx-R*.3,cy-R*.35,R*.1,cx,cy,R);g.addColorStop(0,"rgba(255,190,170,.30)");g.addColorStop(.8,"rgba(200,70,55,.26)");g.addColorStop(1,"rgba(255,150,130,.55)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,R,0,TAU);x.fill();x.strokeStyle="rgba(255,180,160,.7)";x.lineWidth=Math.max(1.2,R*.014);x.stroke();
    const q=[0,1,2].map(i=>{const a=t*.5+i*TAU/3,rr=R*(.46+.08*Math.sin(t*1.7+i*2));return[cx+Math.cos(a)*rr+Math.sin(t*2.3+i)*R*.04,cy+Math.sin(a)*rr*.9+Math.cos(t*1.9+i*2)*R*.04];});
    x.save();x.globalCompositeOperation="lighter";x.lineCap="round";for(let i=0;i<3;i++){const a=q[i],b=q[(i+1)%3],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l;x.strokeStyle=`hsla(${(t*90+i*120)%360},95%,68%,.85)`;x.lineWidth=Math.max(1.6,R*.022);x.beginPath();
      for(let s=0;s<=44;s++){const u=s/44,w=Math.sin(u*Math.PI)*Math.sin(u*TAU*6-t*7)*R*.05,px=a[0]+dx*u+nx*w,py=a[1]+dy*u+ny*w;s?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();}x.restore();
    const bu=boll("#ffe0a8","#e07f18"),bd=boll("#b8f3ff","#1a8fb0");q.forEach((p,i)=>{const r=R*.17;ritaBoll(x,i<2?bu:bd,p[0],p[1],r);if(r>5)tx(i<2?"u":"d",p[0],p[1]+r*.3,"rgba(10,20,40,.85)","center",Math.max(11,r*.9),800);});
    if(d){x.globalAlpha*=d;pek("Uppkvark",q[0][0],q[0][1]-R*.15,cx-R*1.08,cy-R*1.02,"right","#ffd9a0");pek("Nerkvark",q[2][0],q[2][1]+R*.15,cx+R*1.08,cy+R*1.06,"left","#b8f3ff");
      tx("Gluoner · limmet",cx,cy+R+28,"rgba(255,255,255,.85)","center",13);tg("Modell · ingen har sett en kvark",cx,cy-R-16,"#ffd86b","center");tx("En proton = två uppkvarkar och en nerkvark",cx,cy+R+48,"rgba(255,236,170,.92)","center",12);}}
  ];
  /* när varje nivå syns (i z): tonas in när den är liten inuti den förra, tonas ut när den är så stor att nästa täcker bilden */
  const IN=[null,[.3,.75],[1.35,1.8],[2.15,2.3],[2.15,2.3],[4.1,4.5],[5.2,5.55],[6.3,6.65],[6.3,6.65],[8.3,8.7],null,[10.3,10.62]];
  const UT=[[1.1,1.3],[2.15,2.45],[2.35,2.9],[4.8,5.1],[5.55,5.9],[5.6,6.0],[6.75,7.05],[7.5,7.85],[8.6,8.95],[9.75,10.05],[10.6,10.95],null];
  const ORD=[0,1,3,4,2,5,6,7,8,9,10,11]; // de levande cellerna ligger under hornlagret
  const LAB=[[-.04,.14],[.9,1.12],[1.94,2.13],[2.92,3.12],[3.94,4.14],[4.94,5.1],[5.94,6.12],[6.9,7.12],[7.94,8.14],[8.94,9.14],[9.94,10.12],[10.94,11.2]];
  // bakgrunden ändrar färg med djupet: hudens mörka inre, vävnaden, cellen, cellkärnan, atomens tomrum
  const TONE=[[1.3,40,22,18,0],[1.7,40,22,18,1],[2.25,10,28,42,1],[4.6,12,24,54,1],[5.7,24,14,46,1],[7.4,18,10,36,1],[8.6,6,10,24,1],[10.4,8,6,12,1],[11.1,16,7,7,1]];
  const ton=z=>{if(z<=TONE[0][0])return null;for(let i=1;i<TONE.length;i++)if(z<=TONE[i][0]){const a=TONE[i-1],b=TONE[i],u=(z-a[0])/(b[0]-a[0]);return a.slice(1).map((v,k)=>v+(b[k+1]-v)*u);}return TONE[TONE.length-1].slice(1);};

  // kameran: z → var varje nivå ligger på skärmen (mitt, storlek, vridning). Barnet glider mjukt in mot mitten medan föräldern växer.
  function kamera(z,L,Sv,C){const F=[],j=clamp(Math.floor(z),0,NL-2),f=z-j,lk=L[j+1],Lr=Math.log(1/lk.r),gf=clamp(f,0,1);
    const phi=-lk.a*sm(gf),Sj=Sv*Math.exp(Lr*f),g=f<0?Math.exp(Lr*f):(2*gf*gf*gf-3*gf*gf+1)+(gf*gf*gf-2*gf*gf+gf)*Lr,ov=r2(lk.o,phi);
    F[j]={x:C[0]+ov[0]*(Sv*g-Sj),y:C[1]+ov[1]*(Sv*g-Sj),S:Sj,phi};
    for(let k=j+1;k<NL;k++){const p=F[k-1],l=L[k],v=r2(l.o,p.phi);F[k]={x:p.x+v[0]*p.S,y:p.y+v[1]*p.S,S:p.S*l.r,phi:p.phi+l.a};}
    for(let k=j-1;k>=0;k--){const c=F[k+1],l=L[k+1],phi=c.phi-l.a,S=c.S/l.r,v=r2(l.o,phi);F[k]={x:c.x-v[0]*S,y:c.y-v[1]*S,S,phi};}
    return F;}
  const syn=(z,k)=>{const a=IN[k]?sg(z,IN[k][0],IN[k][1]):1,b=UT[k]?1-sg(z,UT[k][0],UT[k][1]):1;return a*b;};
  function rita(T,z,si,alla){const x=E.x,g=G(),Sv=g.s*(g.port?.92:1),C=[g.cx,g.cy],st=ST(T),L=LINK.map(f=>f&&f(st)),F=kamera(z,L,Sv,C),W=E.W,H=E.H;
    const c=ton(z);if(c){x.fillStyle=`rgba(${c[0]|0},${c[1]|0},${c[2]|0},${c[3]})`;x.fillRect(0,0,W,H);}
    const al=[];for(let k=0;k<NL;k++)al[k]=syn(z,k);
    // nivå 10 (atomkärnan) syns först när den är några bildpunkter stor
    al[10]*=sg(F[10].S/Sv,.004,.02);
    const hide=k=>k+1<NL?(k===3?0:IN[k+1]?sg(z,IN[k+1][0],IN[k+1][1]):sg(F[10].S/Sv,.004,.02)):0;
    const vr=Math.hypot(W,H)/2+4;
    ORD.forEach(k=>{if(al[k]<=.003)return;const Fk=F[k];let S=Fk.S;if(k===2)S*=1+1.4*Math.pow(sg(z,2.25,3),2); // hornlagret far förbi när vi dyker igenom
      if(S>Sv*4e4)return;
      const dv=r2([W/2-Fk.x,H/2-Fk.y],-Fk.phi),d=alla?sg(z,LAB[k][0],LAB[k][0]+.05)*(1-sg(z,LAB[k][1]-.05,LAB[k][1])):0;
      x.save();x.globalAlpha=al[k];x.translate(Fk.x,Fk.y);x.rotate(Fk.phi);x.translate(-Fk.x,-Fk.y);
      LV[k](Fk.x,Fk.y,S,T,{d:d>.01?d:0,hide:hide(k),st,vc:[Fk.x+dv[0],Fk.y+dv[1]],vr,Sv});x.restore();});
    // förstoringen i hörnet
    const m=Math.exp(LAM(z)),fa=sg(z,.05,.3);if(fa>0){const a=g.a,rx=a.x+a.w-12,sk=document.querySelector(".skr"),ry=Math.max(a.y+(g.port?14:18),sk?sk.getBoundingClientRect().bottom+16:0);x.save();x.globalAlpha=fa;tg("Förstoring",rx,ry,"rgba(127,214,255,.85)","right");tx(fmtMag(m),rx,ry+20,"#ffd86b","right",17,800);x.restore();}}

  const jorden=(cx,cy,R,a)=>{const x=E.x,cv=jordCv();x.save();x.globalAlpha*=a;const g=x.createRadialGradient(cx,cy,R*.98,cx,cy,R*1.28);g.addColorStop(0,"rgba(110,190,255,.55)");g.addColorStop(1,"rgba(60,130,255,0)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,R*1.28,0,TAU);x.fill();
    if(cv)x.drawImage(cv,cx-R,cy-R,R*2,R*2);else{x.fillStyle="#2f7fd0";x.beginPath();x.arc(cx,cy,R,0,TAU);x.fill();}x.restore();};
  // skolgården uppifrån (när filmen startats från kartan vid skolan): en enkel ritad karta med en nål
  const skolgard=(cx,cy,R,a)=>{const x=E.x;x.save();x.globalAlpha*=a;x.beginPath();x.roundRect(cx-R,cy-R,R*2,R*2,R*.12);x.clip();
    x.fillStyle="#24483c";x.fillRect(cx-R,cy-R,R*2,R*2);
    const ruta=(px,py,w,h,col,r)=>{x.fillStyle=col;x.beginPath();x.roundRect(cx+px*R,cy+py*R,w*R,h*R,(r||.03)*R);x.fill();};
    ruta(-.62,-.5,1.3,1.02,"#5b6272",.06);ruta(-.95,-.95,.5,.6,"#2f6a4c");ruta(.55,.62,.5,.45,"#2f6a4c");ruta(-.98,.62,.7,.4,"#2c5f47");
    x.strokeStyle="rgba(235,235,225,.85)";x.lineWidth=R*.07;x.lineCap="round";x.beginPath();x.moveTo(cx-R*1.1,cy+R*.58);x.lineTo(cx+R*1.1,cy+R*.5);x.moveTo(cx+R*.78,cy-R*1.1);x.lineTo(cx+R*.7,cy+R*1.1);x.stroke();
    ruta(-.5,-.42,.72,.2,"#c0694b");ruta(-.5,-.42,.2,.62,"#c0694b");ruta(.2,.05,.34,.3,"#b55f43");
    x.strokeStyle="rgba(255,255,255,.5)";x.lineWidth=R*.012;x.beginPath();x.arc(cx-R*.02,cy+R*.2,R*.13,0,TAU);x.stroke();
    x.fillStyle="#3f8f5f";[[-.8,-.2],[-.75,.1],[.45,-.7],[.3,-.82],[-.2,.42],[.5,.4],[.1,-.62]].forEach(([px,py])=>{x.beginPath();x.arc(cx+px*R,cy+py*R,R*.06,0,TAU);x.fill();});
    x.restore();
    if(a>.5){x.save();x.globalAlpha*=a;x.fillStyle="#e5484d";x.beginPath();x.arc(cx,cy-R*.1,R*.07,Math.PI,0);x.lineTo(cx,cy+R*.06);x.closePath();x.fill();x.fillStyle="#fff";x.beginPath();x.arc(cx,cy-R*.1,R*.028,0,TAU);x.fill();x.restore();}};

  const OFF=[];{let s=0;SC.forEach((c,i)=>{OFF[i]=s;s+=c.d;});}
  const TB=6.6,LAMSLUT=LAM(ZF(TVAND));
  return SC.map((c,i)=>(t,k)=>{const T=OFF[i]+t,x=E.x;
    if(i<SC.length-1){x.save();if(i===0)x.globalAlpha=eo(seg(t,0,1.5));rita(T,ZF(T),i,true);x.restore();return;}
    // Tillbaka ut: samma kamera baklänges, med jämn fart genom alla storlekar, sist blir handen en prick på jorden
    if(t<TB){rita(T,ZAV(LAMSLUT*(1-E.ease(t/TB))),i,false);return;}
    const g=G(),S=g.s*(g.port?.92:1),u=eo(seg(t,TB,TB+3.2)),st=ST(T),o={d:0,hide:0,st,vc:[g.cx,g.cy],vr:1e5,Sv:S};
    const hand=s=>{x.save();x.globalAlpha=1-seg(u,.2,.75);LV[0](g.cx,g.cy,s,T,o);x.restore();};
    if(hem==="skola"){const R=S*.36;skolgard(g.cx,g.cy,R*lerp(8,1,u),seg(u,.1,.7));hand(S*lerp(1,.03,u));
      if(u>.8){x.save();x.globalAlpha=seg(u,.8,1);tg("Skolgården · härifrån fortsätter resan ut",g.cx,g.cy-R*1.12,"#7fd6ff","center");x.restore();}}
    else{const R=S*.3;jorden(g.cx,g.cy,R*lerp(9,1,u),seg(u,.1,.7));hand(S*lerp(1,.03,u));
      if(u>.8){x.save();x.globalAlpha=seg(u,.8,1);dim(g.cx-R,g.cy+R*1.28,g.cx+R,"12 742 km");tg("Jorden · här börjar resan ut",g.cx,g.cy-R*1.34,"#7fd6ff","center");x.restore();}}});
}

window.MPZoomInFilm={SC,start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"zoomin",scenes:E=>scenes(E,o&&o.hem)}}));
}};
})();
