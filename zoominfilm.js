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
 {k:"Tillbaka ut",d:11,cap:[[0.5,"Nu vänder vi. Förbi atomen, cellen och handen, hela vägen ut till jorden. Därifrån fortsätter resan ut i universum."]]}
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

/* ---------- Scenerna ---------- */
function scenes(E){
  const {A,eo,cl,lerp,seg,font,glowDot}=E;
  const tx=(t,px,py,col,al,sz,w)=>{const x=E.x;x.font=font(w||600,sz||12);x.textAlign=al||"left";x.lineJoin="round";x.lineWidth=3.5;x.strokeStyle="rgba(3,6,14,.72)";x.strokeText(t,px,py);x.fillStyle=col||"rgba(255,255,255,.85)";x.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#7fd6ff",al,11,700);
  const G=()=>{const a=A(),port=E.W<E.H*.9;return{a,s:Math.min(a.w,a.h)*(port?1:.93),cx:a.x+a.w*(port?.5:.57),cy:a.y+a.h*(port?.5:.525),port};}; // liggande: lite åt höger, undertexten står nere till vänster
  const line=(x1,y1,x2,y2,col,w,dash)=>{const x=E.x;x.strokeStyle=col;x.lineWidth=w||1;if(dash)x.setLineDash(dash);x.beginPath();x.moveTo(x1,y1);x.lineTo(x2,y2);x.stroke();x.setLineDash([]);};
  const dim=(x1,y,x2,label,col)=>{line(x1,y,x2,y,col||"#ffd86b",1.3);line(x1,y-6,x1,y+6,col||"#ffd86b",1.3);line(x2,y-6,x2,y+6,col||"#ffd86b",1.3);tx(label,(x1+x2)/2,y-10,col||"#ffd86b","center",13,700);};
  const dimV=(xx,y1,y2,label)=>{line(xx,y1,xx,y2,"#ffd86b",1.3);line(xx-6,y1,xx+6,y1,"#ffd86b",1.3);line(xx-6,y2,xx+6,y2,"#ffd86b",1.3);tx(label,xx+10,(y1+y2)/2+4,"#ffd86b","left",13,700);};
  // en etikett med tunn pekare från (px,py) till texten
  const pek=(t,px,py,lx,ly,al,col)=>{const x=E.x;x.font=font(600,13);const tw=x.measureText(t).width+10;if(al!=="right"&&lx+tw>E.W-6)lx=E.W-6-tw;if(al==="right"&&lx-tw<6)lx=6+tw;line(px,py,lx,ly,"rgba(255,255,255,.45)",1);x.fillStyle="#fff";x.beginPath();x.arc(px,py,2.2,0,TAU);x.fill();tx(t,lx+(al==="right"?-6:6),ly+4,col||"rgba(255,255,255,.92)",al||"left",13,600);};
  // siktet som visar vart vi zoomar härnäst
  const sikte=(cx,cy,r,u)=>{if(u<=0)return;const x=E.x,q=r*(1.25-.25*Math.sin(u*9));x.save();x.globalAlpha*=Math.min(1,u*3);x.strokeStyle="#ffd86b";x.lineWidth=2;const l=q*.4;
    [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sy])=>{x.beginPath();x.moveTo(cx+sx*q,cy+sy*(q-l));x.lineTo(cx+sx*q,cy+sy*q);x.lineTo(cx+sx*(q-l),cy+sy*q);x.stroke();});x.restore();};

  /* nivåer: ritas runt (cx,cy) med storlek S och tid t. Det man zoomar in mot ligger alltid i mitten. d = om detaljer (etiketter) ska med */
  const LV=[null,
  // 1 · Handen (handryggen, fingrarna rör sig lite)
  (cx,cy,S,t,d)=>{const x=E.x,u=S*.0039;x.save();x.translate(cx,cy-u*45);x.scale(u,u);
    x.fillStyle="rgba(0,0,0,.3)";x.beginPath();x.ellipse(5,62,50,62,0,0,TAU);x.fill();
    const hud=x.createLinearGradient(-48,0,48,0);hud.addColorStop(0,"#f1c6a4");hud.addColorStop(.55,"#e6b08c");hud.addColorStop(1,"#c98e6c");
    const finger=(x0,y0,len,w,ang,boj)=>{x.save();x.translate(x0,y0);x.rotate(ang+boj);x.fillStyle=hud;x.strokeStyle="rgba(140,85,60,.55)";x.lineWidth=1.1;x.beginPath();x.roundRect(-w/2,-len,w,len+w*.6,w/2);x.fill();x.stroke();
      x.fillStyle="#f8dfd0";x.strokeStyle="rgba(170,110,95,.6)";x.beginPath();x.roundRect(-w*.33,-len+w*.14,w*.66,w*.78,w*.26);x.fill();x.stroke();
      x.strokeStyle="rgba(140,85,60,.4)";x.lineWidth=1;[-len*.52,-len*.5+2.4,-len*.1,-len*.1+2.4].forEach(yy=>{x.beginPath();x.moveTo(-w*.3,yy);x.quadraticCurveTo(0,yy+1.6,w*.3,yy);x.stroke();});x.restore();};
    // handled och handrygg
    x.fillStyle=hud;x.strokeStyle="rgba(140,85,60,.55)";x.lineWidth=1.1;x.beginPath();x.moveTo(-27,150);x.lineTo(-25,80);x.quadraticCurveTo(-40,52,-36,22);x.quadraticCurveTo(-34,-6,-2,-8);x.quadraticCurveTo(34,-6,36,22);x.quadraticCurveTo(40,54,27,82);x.lineTo(29,150);x.closePath();x.fill();x.stroke();
    const v=i=>Math.sin(t*1.1+i*1.3)*.035;
    finger(-36,38,34,16,-.95,v(0));finger(-25,-2,43,14,-.13,v(1));finger(-8,-6,52,14.5,-.03,v(2));finger(9,-5,48,14,.06,v(3));finger(25,0,36,12.5,.17,v(4));
    // knogar och senor
    x.strokeStyle="rgba(150,95,70,.3)";x.lineWidth=1.3;[[-25,2],[-8,-2],[9,-1],[25,3]].forEach(([kx,ky])=>{x.beginPath();x.arc(kx,ky+4,5.5,Math.PI*1.1,Math.PI*1.9);x.stroke();});
    // ärmen
    const arm=x.createLinearGradient(-34,0,34,0);arm.addColorStop(0,"#5b78ff");arm.addColorStop(1,"#2f47c9");x.fillStyle=arm;x.strokeStyle="#1d2f96";x.lineWidth=1.2;x.beginPath();x.roundRect(-34,118,68,46,10);x.fill();x.stroke();x.strokeStyle="rgba(255,255,255,.35)";x.beginPath();x.moveTo(-30,128);x.lineTo(30,128);x.stroke();
    x.restore();
    if(d){dim(cx-u*56,cy-u*45-u*74,cx+u*37,"ungefär 10 cm");}},
  // 2 · Huden i genomskärning
  (cx,cy,S,t,d)=>{const x=E.x,h=bakaHud(),k=S*1.2/HW,w=HW*k,hh=HH*k,x0=cx-w/2,y0=cy-(YT+118)*k;
    x.save();x.beginPath();x.roundRect(x0,y0-40*k,w,hh+40*k,16*k);x.clip();x.drawImage(h,x0,y0,w,hh);x.restore();
    // blod som rör sig i slingorna och hudflagor som släpper
    for(let i=0;i<6;i++){const bx=x0+(60+i*128+10)*k,q=((t*.22+i*.31)%1),by=y0+lerp(HH,grans(60+i*128)+20,q)*k;x.fillStyle="rgba(255,235,235,.9)";x.beginPath();x.arc(bx-10*k*(1-q),by,2.6*k+.6,0,TAU);x.fill();}
    for(let i=0;i<5;i++){const q=((t*.08+i*.2)%1),fx=x0+((60+i*151)%HW)*k+Math.sin(t+i)*8*k,fy=y0+(YT-4-q*105)*k;x.save();x.translate(fx,fy);x.rotate(Math.sin(t*.5+i*2)*.5);x.globalAlpha*=Math.sin(Math.min(1,q*1.1)*Math.PI)*.95;x.fillStyle="#fbe9d2";x.beginPath();x.roundRect(-22*k,-4*k,44*k,8*k,3.5*k);x.fill();x.restore();}
    if(d){const lx=x0+w*.04;pek("Döda hudceller",x0+w*.22,y0+(YT+18)*k,lx,y0+(YT-46)*k,"left");pek("Hårstrå",x0+545*k,y0+60*k,x0+600*k,y0+36*k,"left");
      pek("Blodkärl",x0+(60+128*4+6)*k,y0+440*k,x0+w*.9,y0+470*k,"right");tx("LÄDERHUDEN",x0+w*.5,y0+500*k,"rgba(255,255,255,.85)","center",11,700);
      dimV(x0+w*.14,y0+YT*k,y0+grans(HW*.14)*k,"överhuden · 0,1 mm");}},
  // 3 · En cell (cellkärnan ligger i mitten)
  (cx,cy,S,t,d)=>{const x=E.x,R=S*.4,ox=cx+R*.14,oy=cy-R*.04;
    // cellen: mjuk, lite vågig kant
    x.beginPath();for(let i=0;i<=72;i++){const a=i/72*TAU,rr=R*(1+.035*Math.sin(a*5+t*.7)+.02*Math.sin(a*9-t*.5)),px=ox+Math.cos(a)*rr*1.06,py=oy+Math.sin(a)*rr*.92;i?x.lineTo(px,py):x.moveTo(px,py);}x.closePath();
    const g=x.createRadialGradient(ox,oy,R*.1,ox,oy,R*1.1);g.addColorStop(0,"rgba(70,150,215,.30)");g.addColorStop(.8,"rgba(60,130,205,.22)");g.addColorStop(1,"rgba(120,200,255,.42)");x.fillStyle=g;x.fill();
    x.strokeStyle="rgba(150,220,255,.9)";x.lineWidth=Math.max(1.5,R*.022);x.stroke();x.strokeStyle="rgba(20,60,110,.6)";x.lineWidth=Math.max(.6,R*.006);x.stroke();
    // ribosomer
    x.fillStyle="rgba(200,230,255,.55)";RIBO.forEach(([a,b,ph])=>{const s=R*.012*(1+.3*Math.sin(t*2+ph));x.fillRect(ox+a*R*.95,oy+b*R*.8,s,s);});
    // nätverket runt kärnan (ER)
    x.strokeStyle="rgba(190,150,255,.55)";x.lineWidth=Math.max(1,R*.02);for(let j=0;j<4;j++){x.beginPath();for(let i=0;i<=40;i++){const a=-1.2+i/40*2.6+j*.2,rr=R*(.44+j*.055)+Math.sin(i*1.3+t+j)*R*.012,px=cx+Math.cos(a)*rr,py=cy+Math.sin(a)*rr;i?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();}
    // golgi
    x.strokeStyle="rgba(255,214,107,.75)";x.lineWidth=Math.max(1.2,R*.026);x.lineCap="round";for(let j=0;j<4;j++){x.beginPath();x.arc(cx-R*.86,cy+R*.1,R*(.2+j*.045),-.75,.75);x.stroke();}
    // mitokondrier
    [[.62,-.5,.5],[.78,.3,-.4],[.1,.68,.2],[-.5,.6,1.2],[.25,-.72,-.2],[-.6,-.52,.9]].forEach(([mx,my,ma],i)=>{const px=ox+mx*R+Math.sin(t*.5+i)*R*.02,py=oy+my*R*.86+Math.cos(t*.4+i*2)*R*.02,l=R*.2,w=R*.085;x.save();x.translate(px,py);x.rotate(ma+Math.sin(t*.3+i)*.1);
      x.fillStyle="#ff9d4d";x.strokeStyle="#b8551a";x.lineWidth=Math.max(.8,R*.008);x.beginPath();x.roundRect(-l/2,-w/2,l,w,w/2);x.fill();x.stroke();x.strokeStyle="rgba(120,50,10,.7)";x.beginPath();for(let q=0;q<=10;q++){const xx=-l*.4+q*l*.08,yy=(q%2?-1:1)*w*.26;q?x.lineTo(xx,yy):x.moveTo(xx,yy);}x.stroke();x.restore();});
    // blåsor som åker runt
    const b1=boll("#c9ffd9","#3fbf7f"),b2=boll("#fff3b0","#e0a020");for(let i=0;i<12;i++){const a=t*.12*(i%2?1:-1)+i*.52,rr=R*(.5+.32*Math.sin(i*2.1+t*.2)),px=ox+Math.cos(a)*rr,py=oy+Math.sin(a)*rr*.82;ritaBoll(x,i%3?b1:b2,px,py,R*.028);}
    // cellkärnan i mitten
    ritaBoll(x,boll("#c9a8ff","#5b3fb0"),cx,cy,R*.33);x.fillStyle="rgba(60,30,120,.55)";x.beginPath();x.arc(cx+R*.07,cy+R*.05,R*.09,0,TAU);x.fill();
    if(d){pek("Cellkärnan",cx-R*.12,cy-R*.2,cx-R*.75,cy-R*.92,"right");pek("Mitokondrie · cellens kraftverk",ox+.78*R,oy+.3*R*.86,cx+R*.5,cy+R*1.04,"left");pek("Cellmembran",ox+Math.cos(-.5)*R*1.06,oy+Math.sin(-.5)*R*.92,cx+R*.72,cy-R*.95,"left");
      dim(ox-R*1.06,cy+R*1.2,ox+R*1.06,"ungefär 0,03 mm");}},
  // 4 · Cellkärnan med kromosomtrådarna
  (cx,cy,S,t,d)=>{const x=E.x,R=S*.4,ay=t*.12,ax=.25;
    let g=x.createRadialGradient(cx-R*.3,cy-R*.35,R*.1,cx,cy,R);g.addColorStop(0,"rgba(190,160,255,.30)");g.addColorStop(.75,"rgba(110,80,210,.22)");g.addColorStop(1,"rgba(170,140,255,.5)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,R,0,TAU);x.fill();
    // trådarna, de bakre först
    const lista=TRAD.map(tr=>{const p=tr.p.map(q=>rot(q,ay,ax));return{p,z:p[3][2],h:tr.h};}).sort((a,b)=>a.z-b.z);
    x.lineCap="round";x.lineJoin="round";lista.forEach(tr=>{const lj=.5+.5*(tr.z+1)/2;x.strokeStyle=`hsla(${tr.h},85%,${48+lj*24}%,${.45+lj*.5})`;x.lineWidth=Math.max(1.2,R*.02*(.7+lj*.6));x.beginPath();
      tr.p.forEach((q,i)=>{const px=cx+q[0]*R,py=cy+q[1]*R;if(!i)x.moveTo(px,py);else{const pr=tr.p[i-1],mx=cx+(pr[0]+q[0])/2*R,my=cy+(pr[1]+q[1])/2*R;x.quadraticCurveTo(cx+pr[0]*R,cy+pr[1]*R,mx,my);}});x.stroke();});
    // skalet med porer
    x.strokeStyle="rgba(200,180,255,.85)";x.lineWidth=Math.max(1.5,R*.02);x.beginPath();x.arc(cx,cy,R,0,TAU);x.stroke();
    PORER.forEach(q=>{const p=rot(q,ay*1.4,ax);if(p[2]<.1)return;x.fillStyle=`rgba(40,20,90,${.25+p[2]*.4})`;x.beginPath();x.ellipse(cx+p[0]*R,cy+p[1]*R,R*.022*p[2]+1,R*.022,0,0,TAU);x.fill();});
    if(d){tg("46 kromosomer · trådar av DNA",cx,cy-R-16,"#ffd86b","center");pek("Porer i kärnans skal",cx+R*.72,cy-R*.66,cx+R*1.02,cy-R*.95,"left");tx("Allt DNA i en cellkärna: ungefär 2 meter",cx,cy+R+30,"rgba(255,236,170,.92)","center",13);}},
  // 5 · DNA: en vriden stege i 3D
  (cx,cy,S,t,d)=>{const x=E.x,n=BASER.length,L=S*1.32,amp=S*.14,ang=.4,ca=Math.cos(ang),sa=Math.sin(ang),F=["#5bd67a","#ff6b6b","#5aa8ff","#ffd24a"],PAR=[1,0,3,2],delar=[];
    const b1=boll("#dfe9ff","#6f86c8"),b2=boll("#ffe1ef","#c76f9c");
    for(let i=0;i<n;i++){const s=(i-(n-1)/2)/(n-1),ph=i*.62+t*.7,c=Math.cos(ph),z=Math.sin(ph),ax=cx+s*L*ca,ay=cy+s*L*sa,px=-sa*amp*c,py=ca*amp*c;
      const p1=[ax+px,ay+py,z],p2=[ax-px,ay-py,-z];delar.push({z:0,i,p1,p2,b:BASER[i]},{z:z,boll:b1,p:p1},{z:-z,boll:b2,p:p2});}
    // ryggarna som band (ritas först, tunt), sedan allt i djupordning
    [1,2].forEach(k=>{x.strokeStyle=k===1?"rgba(160,185,255,.45)":"rgba(255,170,205,.45)";x.lineWidth=Math.max(2,S*.012);x.lineJoin="round";x.beginPath();for(let i=0;i<n;i++){const q=delar[i*3+k].p;i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]);}x.stroke();});
    delar.sort((a,b)=>a.z-b.z).forEach(o=>{if(o.boll){const r=S*.026*(1+.28*o.z);ritaBoll(x,o.boll,o.p[0],o.p[1],r);}else{const mx=(o.p1[0]+o.p2[0])/2,my=(o.p1[1]+o.p2[1])/2;x.lineCap="round";x.lineWidth=Math.max(2.5,S*.017);
      x.strokeStyle=F[o.b];x.beginPath();x.moveTo(o.p1[0],o.p1[1]);x.lineTo(mx,my);x.stroke();x.strokeStyle=F[PAR[o.b]];x.beginPath();x.moveTo(mx,my);x.lineTo(o.p2[0],o.p2[1]);x.stroke();}});
    if(d){const ly=cy-S*.43,lx=cx-S*.02;[["A",0],["T",1],["C",2],["G",3]].forEach(([b,i],k)=>{const px=lx+k*S*.11+(k>1?S*.05:0);x.fillStyle=F[i];x.beginPath();x.roundRect(px,ly-13,S*.09,18,6);x.fill();x.font=font(800,13);x.textAlign="center";x.fillStyle="#08101e";x.fillText(b,px+S*.045,ly+1);});
      tx("A sitter alltid ihop med T, och C med G",lx,ly+26,"rgba(255,255,255,.85)","left",12);tg("2 miljondels millimeter brett",lx,ly+48,"#ffd86b","left");}},
  // 6 · En kolatom: elektronmoln med kärnan som en prick i mitten
  (cx,cy,S,t,d)=>{const x=E.x,R=S*.42,m=bakaMoln();x.save();x.globalCompositeOperation="lighter";x.translate(cx,cy);x.rotate(t*.05);const k=1+.02*Math.sin(t*1.3);x.drawImage(m,-R*k,-R*k,R*2*k,R*2*k);x.rotate(-t*.11);x.globalAlpha*=.6;x.drawImage(m,-R*.97,-R*.97,R*1.94,R*1.94);x.restore();
    // sex elektroner som blinkar till där de råkar vara
    for(let i=0;i<6;i++){const steg=Math.floor(t*1.6+i*.37),q=(t*1.6+i*.37)%1,r=frand(steg*13+i*101+7),a=r()*TAU,rad=i<2?R*.2*(.4+r()):R*(.5+r()*.34);x.save();x.globalAlpha*=Math.sin(q*Math.PI);glowDot(cx+Math.cos(a)*rad,cy+Math.sin(a)*rad,Math.max(2,S*.007),"rgba(140,220,255,1)");x.restore();}
    glowDot(cx,cy,Math.max(1.6,S*.004),"rgba(255,216,140,1)");
    if(d){pek("Atomkärnan (här inne)",cx,cy,cx+R*.5,cy-R*.86,"left","#ffe2a8");pek("Elektronmolnet · 6 elektroner",cx-R*.62,cy+R*.3,cx-R*.9,cy+R*.95,"left");tg("Kolatom",cx,cy-R-14,"#7fd6ff","center");dim(cx-R*.86,cy+R+26,cx+R*.86,"en tiomiljondels millimeter");}},
  // 7 · Atomkärnan: sex protoner och sex neutroner
  (cx,cy,S,t,d)=>{const x=E.x,R=S*.36,bp=boll("#ffb3a1","#c7372a"),bn=boll("#dfe6f2","#6c7c98"),lista=NUKL.map((n,i)=>{const p=rot(n.p,t*.35,.4+Math.sin(t*.3)*.15),j=1+.03*Math.sin(t*5+i*1.7);return{x:p[0]*j,y:p[1]*j,z:p[2],proton:n.proton};}).sort((a,b)=>a.z-b.z);
    const gl=x.createRadialGradient(cx,cy,R*.3,cx,cy,R*1.5);gl.addColorStop(0,"rgba(255,170,110,.22)");gl.addColorStop(1,"rgba(255,120,60,0)");x.fillStyle=gl;x.beginPath();x.arc(cx,cy,R*1.5,0,TAU);x.fill();
    lista.forEach(n=>{const r=R*.4*(1+.12*n.z),px=cx+n.x*R,py=cy+n.y*R;ritaBoll(x,n.proton?bp:bn,px,py,r);if(d&&n.proton&&n.z>.1){x.save();x.globalAlpha*=Math.min(1,n.z*1.6);tx("+",px,py+r*.3,"rgba(255,255,255,.95)","center",Math.max(10,r*.85),800);x.restore();}});
    if(d){const fr=[...lista].reverse(),p=fr.find(n=>n.proton),ne=fr.find(n=>!n.proton);if(p)pek("Proton",cx+p.x*R,cy+p.y*R,cx-R*1.1,cy-R*1.05,"right","#ffc2b5");if(ne)pek("Neutron",cx+ne.x*R,cy+ne.y*R,cx+R*1.1,cy-R*1.05,"left","#dfe6f2");
      // arenan som jämförelse
      const ax=cx,ay=cy+R*1.42,aw=S*.2,ah=aw*.42;x.strokeStyle="rgba(127,214,255,.7)";x.lineWidth=1.3;x.beginPath();x.ellipse(ax,ay,aw,ah,0,0,TAU);x.stroke();x.beginPath();x.ellipse(ax,ay,aw*.62,ah*.6,0,0,TAU);x.stroke();line(ax,ay-ah*.6,ax,ay+ah*.6,"rgba(127,214,255,.5)",1);
      x.fillStyle="#ffd86b";x.beginPath();x.arc(ax,ay,2,0,TAU);x.fill();tx("Atomen = en arena · kärnan = en ärta på mittpunkten",ax,ay+ah+18,"rgba(255,236,170,.92)","center",12);}},
  // 8 · En proton med tre kvarkar och gluonerna som håller ihop dem (modell)
  (cx,cy,S,t,d)=>{const x=E.x,R=S*.36;
    let g=x.createRadialGradient(cx-R*.3,cy-R*.35,R*.1,cx,cy,R);g.addColorStop(0,"rgba(255,190,170,.26)");g.addColorStop(.8,"rgba(200,70,55,.2)");g.addColorStop(1,"rgba(255,150,130,.5)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,R,0,TAU);x.fill();x.strokeStyle="rgba(255,180,160,.7)";x.lineWidth=Math.max(1.2,R*.014);x.stroke();
    const q=[0,1,2].map(i=>{const a=t*.5+i*TAU/3,rr=R*(.46+.08*Math.sin(t*1.7+i*2));return[cx+Math.cos(a)*rr+Math.sin(t*2.3+i)*R*.04,cy+Math.sin(a)*rr*.9+Math.cos(t*1.9+i*2)*R*.04];});
    // gluonerna: fjädrar som byter färg
    x.save();x.globalCompositeOperation="lighter";x.lineCap="round";for(let i=0;i<3;i++){const a=q[i],b=q[(i+1)%3],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l;x.strokeStyle=`hsla(${(t*90+i*120)%360},95%,68%,.85)`;x.lineWidth=Math.max(1.6,R*.022);x.beginPath();
      for(let s=0;s<=44;s++){const u=s/44,w=Math.sin(u*Math.PI)*Math.sin(u*TAU*6-t*7)*R*.05,px=a[0]+dx*u+nx*w,py=a[1]+dy*u+ny*w;s?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();}x.restore();
    const bu=boll("#ffe0a8","#e07f18"),bd=boll("#b8f3ff","#1a8fb0");q.forEach((p,i)=>{const r=R*.17;ritaBoll(x,i<2?bu:bd,p[0],p[1],r);tx(i<2?"u":"d",p[0],p[1]+r*.3,"rgba(10,20,40,.85)","center",Math.max(11,r*.9),800);});
    if(d){pek("Uppkvark",q[0][0],q[0][1]-R*.15,cx-R*1.08,cy-R*1.02,"right","#ffd9a0");pek("Nerkvark",q[2][0],q[2][1]+R*.15,cx+R*1.08,cy+R*1.06,"left","#b8f3ff");
      tx("Gluoner · limmet",cx,cy+R+28,"rgba(255,255,255,.85)","center",13);tg("Modell · ingen har sett en kvark",cx,cy-R-16,"#ffd86b","center");tx("En proton = två uppkvarkar och en nerkvark",cx,cy+R+48,"rgba(255,236,170,.92)","center",12);}}
  ];
  const jorden=(cx,cy,R,a)=>{const x=E.x,cv=jordCv();x.save();x.globalAlpha*=a;const g=x.createRadialGradient(cx,cy,R*.98,cx,cy,R*1.28);g.addColorStop(0,"rgba(110,190,255,.55)");g.addColorStop(1,"rgba(60,130,255,0)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,R*1.28,0,TAU);x.fill();
    if(cv)x.drawImage(cv,cx-R,cy-R,R*2,R*2);else{x.fillStyle="#2f7fd0";x.beginPath();x.arc(cx,cy,R,0,TAU);x.fill();}x.restore();};
  const niva=(i,cx,cy,S,t,a,d)=>{if(a<=.003)return;const x=E.x;x.save();x.globalAlpha=a;LV[i](cx,cy,S,t,d);x.restore();};

  // en vanlig scen: den förra nivån växer och tonar bort, den nya växer fram ur mitten
  const scen=i=>(t,k)=>{const g=G(),u=i>1?eo(seg(t,0,2.8)):1,S=g.s*(g.port?.92:1);
    if(i>1&&u<1)niva(i-1,g.cx,g.cy,S*lerp(1,10,u*u),t,1-seg(u,.15,.8),false);
    niva(i,g.cx,g.cy,S*lerp(.1,1,u),t,i>1?seg(u,.12,.75):1,u>.97);
    if(i<8)sikte(g.cx,g.cy,S*.07,seg(t,SC[i].d-2.6,SC[i].d));};
  return[
   // 0 · Inledning: handen i lugn rörelse
   (t,k)=>{const g=G();niva(1,g.cx,g.cy,g.s*(g.port?.92:1)*lerp(.82,1,eo(k)),t,eo(seg(t,0,1.5)),false);},
   scen(1),scen(2),scen(3),scen(4),scen(5),scen(6),scen(7),scen(8),
   // 9 · Tillbaka ut: nivåerna far förbi baklänges, sist blir handen en prick på jorden
   (t,k)=>{const g=G(),S=g.s*(g.port?.92:1),T=6.6,steg=T/7,x=E.x;
     if(t<T){const f=t/steg,i=Math.min(6,Math.floor(f)),u=eo(f-i),inre=8-i,yttre=7-i;
       niva(inre,g.cx,g.cy,S*lerp(1,.1,u),t,1-seg(u,.25,.88),false);niva(yttre,g.cx,g.cy,S*lerp(10,1,u*(2-u)),t,seg(u,.2,.85),false);}
     else{const u=eo(seg(t,T,T+3.2)),R=S*.3;jorden(g.cx,g.cy,R*lerp(9,1,u),seg(u,.1,.7));niva(1,g.cx,g.cy,S*lerp(1,.03,u),t,1-seg(u,.2,.75),false);
       if(u>.8){x.save();x.globalAlpha=seg(u,.8,1);dim(g.cx-R,g.cy+R*1.28,g.cx+R,"12 742 km");tg("Jorden · här börjar resan ut",g.cx,g.cy-R*1.34,"#7fd6ff","center");x.restore();}}}
  ];
}

window.MPZoomInFilm={SC,start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"zoomin",scenes:E=>scenes(E)}}));
}};
})();
