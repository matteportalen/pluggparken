/* Zooma ut i universum: en film i tio steg (kamera från jorden till det kosmiska nätet), ritad i kod (canvas).
   Använder filmmotorn i svarthal.js (MPSvartHal.start med o.def: undertexter, röst, kontroller, helskärm).
   Röst: ljud/zoom/s<scen>-<replik>.mp3 (ElevenLabs, samma röst som svarta hål); saknas en fil visas bara texten.
   Jorden och månen ritas som riktiga klot ur Solar System Scope-texturerna (CC BY 4.0) i ovriga/solsystemet/bilder/.
   MPZoomFilm.start(host,{overlay,onClose}). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/";}})();
const TEX=ROOT+"ovriga/solsystemet/bilder/";
const TAU=Math.PI*2;

/* ---------- Manus: tio scener (0 = inledning), undertexter med starttid i sekunder ---------- */
const SC=[
 {k:"Inledning",d:7,cap:[[0.5,"Följ med på en resa genom universum. Vi börjar här, hemma på jorden, och zoomar ut, steg för steg."]]},
 {k:"01 · Jorden",d:17,cap:[[0.8,"Det här är jorden, vårt hem. Den är 12 742 kilometer bred."],[8.5,"Ett flygplan skulle behöva flyga i nästan två dygn för att ta sig runt den."]]},
 {k:"02 · Månen",d:17,cap:[[0.8,"Zoomar vi ut möter vi månen, 384 400 kilometer bort."],[8.5,"Skulle du köra dit med bil tar det ungefär ett halvår. Ljuset klarar sig på drygt en sekund."]]},
 {k:"03 · Solen och de inre planeterna",d:17,cap:[[0.8,"Nu syns solen och de inre planeterna: Merkurius, Venus, jorden och Mars."],[8.5,"Solen är 150 miljoner kilometer bort. Ljuset därifrån behöver drygt åtta minuter till oss."]]},
 {k:"04 · Hela solsystemet",d:17,cap:[[0.8,"Längst ut går Neptunus, 30 gånger längre från solen än jorden."],[8.5,"Ljuset behöver ungefär fyra timmar för att nå dit. Ändå är det bara vår egen bakgård."]]},
 {k:"05 · De närmaste stjärnorna",d:24,cap:[[0.8,"Nu är hela solsystemet bara en liten prick. Varje stjärna här är en egen sol, och många har egna planeter."],[8.5,"Den närmaste, Proxima Centauri, ligger drygt 4 ljusår bort. Rymdsonden Voyager skulle behöva ungefär 75 000 år dit."],[16.5,"Ett ljusår är så långt ljuset hinner på ett år, nästan 10 biljoner kilometer."]]},
 {k:"06 · Vintergatan",d:17,cap:[[0.8,"Solen är en av hundratals miljarder stjärnor i Vintergatan, vår galax."],[8.5,"Vi bor ute i en av spiralarmarna, ungefär 26 000 ljusår från mitten. Ett varv runt galaxen tar ungefär 230 miljoner år."]]},
 {k:"07 · Andromeda och grannarna",d:17,cap:[[0.8,"Andromedagalaxen är vår stora granne, 2,5 miljoner ljusår bort. Den är ännu större än Vintergatan."],[8.5,"Runt oss finns också små dvärggalaxer. Tillsammans bildar de den lokala gruppen, med ungefär 80 kända galaxer."]]},
 {k:"08 · Superhopen Laniakea",d:17,cap:[[0.8,"Galaxerna ligger inte jämnt utspridda, utan sitter i stora hopar. Vår galax hör till superhopen Laniakea."],[8.5,"Där strömmar ungefär 100 000 galaxer sakta mot samma punkt, som forskarna kallar den stora attraktorn."]]},
 {k:"09 · Det kosmiska nätet",d:17,cap:[[0.8,"Zoomar vi ut ännu mer bildar galaxerna ett jättestort nät av trådar, med enorma, nästan tomma rum emellan."],[8.5,"Laniakea är bara en liten bit av nätet. Det observerbara universum rymmer hundratals miljarder galaxer."]]}
];
const META={hud:"PLUGGPARKEN · RYMDARKIVET · FILM 02",titel:"Zooma ut i universum",under:"En film i nio steg · ca 3 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Allt du har sett är bara en liten del av universum. Fortsätt vara nyfiken! Filmen följer en kamera från jorden ut till det kosmiska nätet, och avstånden är hämtade från NASA och vanliga astronomiböcker.",igen:"↻ Se filmen igen"};

/* ---------- Bilder och klot ---------- */
const IMG={};function img(n){if(!IMG[n]){const i=new Image();i.src=TEX+n;IMG[n]=i;}return IMG[n];}
["2k_earth_daymap.jpg","2k_moon.jpg"].forEach(img);
function texData(n){const i=img(n);if(!i.complete||!i.naturalWidth)return null;if(!i._d){const c=document.createElement("canvas");c.width=1024;c.height=512;const g=c.getContext("2d");g.drawImage(i,0,0,1024,512);i._d=g.getImageData(0,0,1024,512).data;}return i._d;}
// ett klot som ritas från en kartstruktur; rot = rotation i bildpunkter längs ekvatorn, ljus från vänster
function makeSphere(N){const n=N*N,rowIdx=new Uint16Array(n),lonIdx=new Uint16Array(n),shade=new Float32Array(n),alpha=new Uint8Array(n),R=N/2-1;
  for(let y=0;y<N;y++)for(let xx=0;xx<N;xx++){const nx=(xx-N/2+.5)/R,ny=(y-N/2+.5)/R,r2=nx*nx+ny*ny,p=y*N+xx;if(r2>1){alpha[p]=0;continue;}
    const nz=Math.sqrt(1-r2),lat=Math.asin(-ny),lon=Math.atan2(nx,nz);rowIdx[p]=Math.max(0,Math.min(511,Math.round((.5-lat/Math.PI)*511)));
    lonIdx[p]=Math.round(((lon/TAU)+.5)*1023)&1023;
    const lx=-.75,lz=.66,d=Math.max(0,nx*lx+nz*lz);shade[p]=.06+.94*Math.pow(d,.8);alpha[p]=r2>.985?Math.round(255*(1-r2)/.015):255;}
  const cv=document.createElement("canvas");cv.width=N;cv.height=N;const g=cv.getContext("2d"),id=g.createImageData(N,N);
  return{N,cv,g,id,rowIdx,lonIdx,shade,alpha,draw(tex,rot,lit){const d=texData(tex);if(!d)return false;const o=id.data;
    for(let p=0;p<n;p++){const a=alpha[p],q=p*4;if(!a){o[q+3]=0;continue;}const s=lit===false?1:shade[p],u=(lonIdx[p]+rot)&1023,t=(rowIdx[p]*1024+u)*4;o[q]=d[t]*s;o[q+1]=d[t+1]*s;o[q+2]=d[t+2]*s;o[q+3]=a;}
    g.putImageData(id,0,0);return true;}};}
let EARTH=null,MOON=null;
function earthCv(rot){if(!EARTH)EARTH=makeSphere(300);return EARTH.draw("2k_earth_daymap.jpg",rot,true)?EARTH.cv:null;}
function moonCv(){if(!MOON)MOON=makeSphere(160);if(!MOON.done&&MOON.draw("2k_moon.jpg",300,true))MOON.done=true;return MOON.done?MOON.cv:null;}

/* ---------- Galaxer: en förberäknad bild av en spiralgalax ---------- */
function makeGalaxy(size,seed,arms,twist){let s=seed;const r=()=>(s=(s*16807)%2147483647)/2147483647,c=document.createElement("canvas");c.width=c.height=size;const g=c.getContext("2d"),h=size/2;
  g.globalCompositeOperation="lighter";
  const bg=g.createRadialGradient(h,h,0,h,h,h*.55);bg.addColorStop(0,"rgba(255,230,170,.9)");bg.addColorStop(.25,"rgba(255,200,130,.38)");bg.addColorStop(1,"rgba(255,170,100,0)");g.fillStyle=bg;g.beginPath();g.arc(h,h,h*.55,0,TAU);g.fill();
  for(let i=0;i<9000;i++){const arm=i%arms,t=Math.pow(r(),.7),rad=h*.92*t,ang=arm/arms*TAU+t*twist+(r()-.5)*(.5+(1-t)*1.2)*.9;
    const xx=h+Math.cos(ang)*rad,yy=h+Math.sin(ang)*rad,blue=Math.min(1,.25+t*.9),al=(.14+r()*.34)*(1-t*.45);
    g.fillStyle=`rgba(${Math.round(255-blue*110)},${Math.round(225-blue*40)},255,${al})`;g.fillRect(xx,yy,1.5+r()*1.6,1.5+r()*1.6);}
  for(let i=0;i<260;i++){const arm=i%arms,t=.2+r()*.8,rad=h*.9*t,ang=arm/arms*TAU+t*twist+(r()-.5)*.25,xx=h+Math.cos(ang)*rad,yy=h+Math.sin(ang)*rad;
    const gg=g.createRadialGradient(xx,yy,0,xx,yy,5+r()*7);gg.addColorStop(0,"rgba(255,170,200,.35)");gg.addColorStop(1,"rgba(255,120,160,0)");g.fillStyle=gg;g.beginPath();g.arc(xx,yy,12,0,TAU);g.fill();}
  return c;}
let GAL=null,GAL2=null;

window.MPZoomFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"zoom",scenes:E=>scenes(E)}}));
}};

/* ---------- Scenerna ---------- */
function scenes(E){
  const {A,eo,cl,lerp,ease,seg,serif,font,glowDot}=E;
  const tx=(t,px,py,col,al,sz,w)=>{const x=E.x;x.font=font(w||600,sz||12);x.fillStyle=col||"rgba(255,255,255,.85)";x.textAlign=al||"left";x.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#7fd6ff",al,11,700);
  const S=()=>{const a=A();return{a,s:Math.min(a.w,a.h),cx:a.x+a.w/2,cy:a.y+a.h*.5,port:E.W<E.H*.9};};
  const line=(x1,y1,x2,y2,col,w,dash)=>{const x=E.x;x.strokeStyle=col;x.lineWidth=w||1;if(dash)x.setLineDash(dash);x.beginPath();x.moveTo(x1,y1);x.lineTo(x2,y2);x.stroke();x.setLineDash([]);};
  const dim=(x1,y,x2,label,col)=>{const x=E.x;line(x1,y,x2,y,col||"#ffd86b",1.3);line(x1,y-6,x1,y+6,col||"#ffd86b",1.3);line(x2,y-6,x2,y+6,col||"#ffd86b",1.3);tx(label,(x1+x2)/2,y-10,col||"#ffd86b","center",13,700);};
  const ring=(cx,cy,r,col,w,dash,flat)=>{const x=E.x;x.strokeStyle=col;x.lineWidth=w||1;if(dash)x.setLineDash(dash);x.beginPath();x.ellipse(cx,cy,r,r*(flat||1),0,0,TAU);x.stroke();x.setLineDash([]);};
  const sunGlow=(cx,cy,r,a)=>{const x=E.x;x.save();x.globalCompositeOperation="lighter";let g=x.createRadialGradient(cx,cy,0,cx,cy,r*5);g.addColorStop(0,`rgba(255,235,170,${.55*a})`);g.addColorStop(.25,`rgba(255,170,70,${.25*a})`);g.addColorStop(1,"rgba(255,120,30,0)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,r*5,0,TAU);x.fill();x.restore();
    x.fillStyle=`rgba(255,248,215,${a})`;x.beginPath();x.arc(cx,cy,Math.max(1.6,r),0,TAU);x.fill();};
  const dot=(px,py,r,col)=>{const x=E.x;x.fillStyle=col;x.beginPath();x.arc(px,py,r,0,TAU);x.fill();};
  const pulse=(cx,cy,r0,r1,u,col,lab)=>{if(u<=0||u>1)return;const x=E.x,r=lerp(r0,r1,u);x.save();x.globalCompositeOperation="lighter";x.strokeStyle=col.replace("1)",(.7*(1-u*.5))+")");x.lineWidth=2;x.beginPath();x.arc(cx,cy,r,0,TAU);x.stroke();x.restore();};

  /* nivåer: varje nivå ritas runt (cx,cy) med storlek S, tid t, och gör sig själv genomskinlig med alpha a */
  const LV=[null,
  // 1 · Jorden
  (cx,cy,S,t,a)=>{const x=E.x,R=S*.3,cv=earthCv(Math.floor(t*14)%1024);
    const g=x.createRadialGradient(cx,cy,R*.98,cx,cy,R*1.28);g.addColorStop(0,`rgba(110,190,255,${.55*a})`);g.addColorStop(1,"rgba(60,130,255,0)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,R*1.28,0,TAU);x.fill();
    if(cv){x.globalAlpha=a;x.drawImage(cv,cx-R,cy-R,R*2,R*2);x.globalAlpha=1;}else{dot(cx,cy,R,"#2f7fd0");}
    if(a>.6){x.globalAlpha=a;dim(cx-R,cy+R*1.28,cx+R,"12 742 km");x.globalAlpha=1;
      // flygplanets väg runt ekvatorn
      const an=-t*.5,px=cx+Math.cos(an)*R*1.12,py=cy+Math.sin(an)*R*1.12*.28+R*.0;x.save();x.globalAlpha=a*.8;x.strokeStyle="rgba(255,216,107,.5)";x.setLineDash([3,7]);x.lineWidth=1.3;x.beginPath();x.ellipse(cx,cy,R*1.12,R*1.12*.28,0,0,TAU);x.stroke();x.setLineDash([]);glowDot(px,py,3,"rgba(255,216,107,1)");x.restore();}},
  // 2 · Månen (jorden och månen i rätt skala)
  (cx,cy,S,t,a)=>{const x=E.x,W=E.W,Re=Math.max(5,Math.min(W*.0125,S*.02)),D=Re*60,ex=cx-D/2,mx=cx+D/2,Rm=Re*.2725,ec=earthCv(Math.floor(t*10)%1024),mc=moonCv();
    x.globalAlpha=a;x.drawImage(ec||EARTH.cv,ex-Re,cy-Re,Re*2,Re*2);if(mc)x.drawImage(mc,mx-Rm,cy-Rm,Rm*2,Rm*2);else dot(mx,cy,Rm,"#bbb");
    const g=x.createRadialGradient(ex,cy,Re,ex,cy,Re*2.2);g.addColorStop(0,"rgba(110,190,255,.45)");g.addColorStop(1,"rgba(60,130,255,0)");x.fillStyle=g;x.beginPath();x.arc(ex,cy,Re*2.2,0,TAU);x.fill();
    tx("Jorden",ex,cy+Re+22,"#fff","center",13);tx("Månen",mx,cy+Rm+22,"#fff","center",13);
    if(a>.6){dim(ex,cy-S*.12,mx,"384 400 km");const u=((t*.35)%1.6)/1.6;glowDot(lerp(ex+Re,mx-Rm,Math.min(1,u*1.25)),cy,2.4,"rgba(255,236,170,1)");tx("Ljus: 1,3 sekunder",cx,cy+S*.14,"rgba(255,236,170,.9)","center",13);}x.globalAlpha=1;},
  // 3 · Solen och de inre planeterna
  (cx,cy,S,t,a)=>{const x=E.x,k=S*.27,P=[["Merkurius",.39,88,"#b5b5b5"],["Venus",.72,225,"#e8c27a"],["Jorden",1,365,"#4aa3ff"],["Mars",1.52,687,"#e0603a"]];
    x.globalAlpha=a;sunGlow(cx,cy,S*.03,1);tx("Solen",cx,cy+S*.075,"#ffe9a8","center",13);
    P.forEach(([n,au,per,col],i)=>{const r=k*au;ring(cx,cy,r,"rgba(127,214,255,.2)",1,[2,6]);const an=t*TAU/per*38+i*1.7,px=cx+Math.cos(an)*r,py=cy+Math.sin(an)*r;dot(px,py,i===2?5:3.6,col);tx(n,px+8,py-8,i===2?"#9fe3ff":"rgba(255,255,255,.75)","left",12);});
    if(a>.6){const ex=cx+Math.cos(2*TAU/365*38*t+3.4)*k,ey=cy+Math.sin(2*TAU/365*38*t+3.4)*k;const u=((t*.18)%1.2)/1.2;pulse(cx,cy,S*.03,k,Math.min(1,u*1.2),"rgba(255,230,160,1)");tg("1 AU = 150 miljoner km",cx,cy-k-18,"#ffd86b","center");tx("Ljus: 8 min 20 s",cx,cy+k+30,"rgba(255,236,170,.9)","center",13);}x.globalAlpha=1;},
  // 4 · Hela solsystemet
  (cx,cy,S,t,a)=>{const x=E.x,k=S*.46/30.1,P=[["Merkurius",.39,88,"#b5b5b5"],["Venus",.72,225,"#e8c27a"],["Jorden",1,365,"#4aa3ff"],["Mars",1.52,687,"#e0603a"],["Jupiter",5.2,4333,"#d8b894"],["Saturnus",9.54,10759,"#e3d3a0"],["Uranus",19.2,30687,"#9fe3ef"],["Neptunus",30.07,60190,"#5b7bff"]];
    x.globalAlpha=a;sunGlow(cx,cy,S*.012,1);
    P.forEach(([n,au,per,col],i)=>{const r=k*au;ring(cx,cy,r,"rgba(127,214,255,.2)",1,[2,6]);const an=t*TAU/per*260+i*.9,px=cx+Math.cos(an)*r,py=cy+Math.sin(an)*r;dot(px,py,i>3?3.4:2.2,col);if(i>=3||i===2)tx(n,px+7,py-7,i===7?"#9fb4ff":"rgba(255,255,255,.7)","left",12);});
    ring(cx,cy,k*45,"rgba(180,160,255,.18)",1,[1,5]);tx("Kuiperbältet",cx,cy-k*45-6,"rgba(200,190,255,.55)","center",11);
    if(a>.6){const u=((t*.12)%1.15)/1.15;pulse(cx,cy,S*.012,k*30.07,Math.min(1,u*1.12),"rgba(255,230,160,1)");tg("30 AU",cx+k*30.07+8,cy+4,"#ffd86b","left");tx("Ljus: ca 4 timmar",cx,cy+S*.5+16,"rgba(255,236,170,.9)","center",13);}x.globalAlpha=1;},
  // 5 · De närmaste stjärnorna (avstånden i ljusår är riktiga, riktningarna är ungefärliga)
  (cx,cy,S,t,a)=>{const x=E.x,k=S*.45/10,N=[["Proxima Centauri",4.24,-.5,"#ff9c7a"],["Alfa Centauri",4.37,-.38,"#ffe9a8"],["Barnards stjärna",5.96,1.9,"#ff9c7a"],["Wolf 359",7.9,3.3,"#ff8a6a"],["Sirius",8.6,5.2,"#cfe6ff"],["Ross 154",9.7,2.6,"#ff9c7a"]];
    x.globalAlpha=a;[2,4,6,8,10].forEach(ly=>{ring(cx,cy,k*ly,"rgba(127,214,255,.2)",1,[2,7]);tx(ly+" ljusår",cx+k*ly*.707+4,cy-k*ly*.707-3,"rgba(127,214,255,.6)","left",10);});
    sunGlow(cx,cy,3,1);tx("Solen",cx+10,cy+16,"#ffe9a8","left",12);
    N.forEach(([n,ly,an,col],i)=>{const px=cx+Math.cos(an)*k*ly,py=cy+Math.sin(an)*k*ly*.8,tw=.8+.2*Math.sin(t*2+i);glowDot(px,py,2.2*tw,col.replace("#","rgba(").length?"rgba(255,230,190,1)":col);tx(n,px+9,py+4,"rgba(255,255,255,.85)","left",12);});
    if(a>.6){const px=cx+Math.cos(-.5)*k*4.24,py=cy+Math.sin(-.5)*k*4.24*.8;line(cx,cy,px,py,"rgba(255,216,107,.55)",1.3,[4,5]);tg("drygt 4 ljusår",(cx+px)/2,(cy+py)/2-10,"#ffd86b","center");}x.globalAlpha=1;},
  // 6 · Vintergatan
  (cx,cy,S,t,a)=>{const x=E.x,R=S*.5;if(!GAL)GAL=makeGalaxy(640,11,4,5.2);x.save();x.globalAlpha=a;x.translate(cx,cy);x.rotate(t*.03);x.drawImage(GAL,-R,-R,R*2,R*2);x.restore();
    if(a>.6){x.globalAlpha=a;const hx=cx+Math.cos(t*.03+.7)*R*.52,hy=cy+Math.sin(t*.03+.7)*R*.52;line(hx,hy,hx+R*.22,hy-R*.2,"#ffd86b",1.3);glowDot(hx,hy,3,"rgba(255,236,170,1)");tx("Du är här",hx+R*.22+6,hy-R*.2-3,"#ffd86b","left",14,700);
      dim(cx-R,cy+R*1.08,cx+R,"ca 100 000 ljusår","#7fd6ff");tg("Mitten: ett jättelikt svart hål",cx,cy-R*.1-12,"rgba(255,200,140,.9)","center");}x.globalAlpha=1;},
  // 7 · Andromeda och grannarna
  (cx,cy,S,t,a)=>{const x=E.x,port=E.W<E.H*.9,R=S*.2;if(!GAL)GAL=makeGalaxy(640,11,4,5.2);if(!GAL2)GAL2=makeGalaxy(640,29,3,4.2);
    const mx=port?cx-S*.22:cx-S*.34,my=port?cy+S*.2:cy+S*.1,ax=port?cx+S*.22:cx+S*.34,ay=port?cy-S*.2:cy-S*.1;
    x.save();x.globalAlpha=a;x.translate(mx,my);x.rotate(t*.02);x.drawImage(GAL,-R,-R,R*2,R*2);x.restore();
    x.save();x.globalAlpha=a;x.translate(ax,ay);x.rotate(-.7);x.scale(1,.42);x.drawImage(GAL2,-R*1.3,-R*1.3,R*2.6,R*2.6);x.restore();
    x.globalAlpha=a;tx("Vintergatan",mx,my+R+22,"#fff","center",14,700);tx("Andromeda",ax,ay+R*.9,"#fff","center",14,700);
    // dvärggalaxer
    const D=[["Stora Magellanska molnet",-.1,.14,"rgba(200,220,255,1)"],["Lilla Magellanska molnet",-.14,.19,"rgba(200,220,255,1)"],["Triangelgalaxen",.14,-.22,"rgba(255,230,200,1)"],["M32",.32,-.06,"rgba(255,220,180,1)"],["M110",.4,-.14,"rgba(255,220,180,1)"]];
    D.forEach(([n,dx,dy,col],i)=>{const px=cx+dx*S+(port?0:0),py=cy+dy*S,tw=.8+.2*Math.sin(t*1.5+i);glowDot(px,py,2.2*tw,col);tx(n,px+8,py+4,"rgba(255,255,255,.7)","left",11);});
    if(a>.6){line(mx,my,ax,ay,"#ffd86b",1.3,[5,6]);tx("2,5 miljoner ljusår",(mx+ax)/2+(port?-90:0),(my+ay)/2-10,"#ffd86b","center",14,700);tg("Den lokala gruppen · ca 80 galaxer",cx,E.A().y+E.A().h*.96,"#7fd6ff","center");}x.globalAlpha=1;},
  // 8 · Laniakea
  (cx,cy,S,t,a)=>{const x=E.x,R=S*.46;let s=5;const r=()=>(s=(s*16807)%2147483647)/2147483647;
    // galaxhopar längs strömlinjer mot den stora attraktorn (till höger), ritade med fast frö varje bild
    const gx=cx+R*.55,gy=cy+R*.05;x.save();x.globalAlpha=a;x.globalCompositeOperation="lighter";
    const fg=x.createRadialGradient(gx,gy,0,gx,gy,R*.5);fg.addColorStop(0,"rgba(255,170,90,.38)");fg.addColorStop(1,"rgba(255,120,60,0)");x.fillStyle=fg;x.beginPath();x.arc(gx,gy,R*.5,0,TAU);x.fill();
    for(let i=0;i<150;i++){const an=r()*TAU,rad=Math.pow(r(),.6)*R,px=cx+Math.cos(an)*rad,py=cy+Math.sin(an)*rad*.82;
      const dx=gx-px,dy=gy-py,d=Math.hypot(dx,dy)+1,flow=((t*.06+r())%1);const f=Math.min(1,d/R)*.0;
      x.strokeStyle="rgba(150,200,255,.2)";x.lineWidth=1;x.beginPath();x.moveTo(px,py);x.lineTo(px+dx/d*R*.34,py+dy/d*R*.34);x.stroke();
      const mx=px+dx/d*R*.34*flow,my=py+dy/d*R*.34*flow;glowDot(mx,my,1.1,"rgba(190,225,255,1)");}
    for(let i=0;i<650;i++){const an=r()*TAU,rad=Math.pow(r(),.55)*R,px=cx+Math.cos(an)*rad,py=cy+Math.sin(an)*rad*.82;x.fillStyle=`rgba(255,${Math.round(200+r()*55)},${Math.round(150+r()*100)},${.18+r()*.35})`;x.fillRect(px,py,1.6,1.6);}
    x.restore();x.globalAlpha=a;ring(cx,cy,R,"rgba(127,214,255,.35)",1.3,[6,6],.82);
    glowDot(cx-R*.05,cy,3.2,"rgba(255,236,170,1)");tx("Vintergatan",cx-R*.05+8,cy+16,"#ffd86b","left",13,700);
    tx("Stora attraktorn",gx,gy-R*.42,"#ffb070","center",13,700);tx("Virgohopen",cx+R*.18,cy-R*.3,"rgba(255,255,255,.7)","left",11);tx("Perseus–Fiskarna",cx-R*.7,cy-R*.62,"rgba(255,255,255,.6)","left",11);
    if(a>.6)dim(cx-R,cy+R*.82+20,cx+R,"ca 520 miljoner ljusår","#7fd6ff");x.globalAlpha=1;},
  // 9 · Det kosmiska nätet
  (cx,cy,S,t,a)=>{const x=E.x,R=S*.56;let s=17;const r=()=>(s=(s*16807)%2147483647)/2147483647;const N=[];for(let i=0;i<120;i++){const an=r()*TAU,rad=Math.sqrt(r())*R;N.push([cx+Math.cos(an)*rad,cy+Math.sin(an)*rad*.82]);}
    x.save();x.globalAlpha=a;x.globalCompositeOperation="lighter";x.lineWidth=1;
    N.forEach((p,i)=>{const near=N.map((q,j)=>[j,(q[0]-p[0])**2+(q[1]-p[1])**2]).filter(o=>o[0]!==i).sort((u,v)=>u[1]-v[1]).slice(0,3);
      near.forEach(([j,d2])=>{if(d2>R*R*.16)return;const q=N[j];x.strokeStyle="rgba(120,170,255,.22)";x.beginPath();x.moveTo(p[0],p[1]);x.lineTo(q[0],q[1]);x.stroke();
        const u=((t*.05+i*.13+j*.07)%1);x.fillStyle="rgba(190,220,255,.9)";x.fillRect(p[0]+(q[0]-p[0])*u,p[1]+(q[1]-p[1])*u,1.6,1.6);});
      const gl=x.createRadialGradient(p[0],p[1],0,p[0],p[1],7);gl.addColorStop(0,"rgba(255,225,180,.75)");gl.addColorStop(1,"rgba(255,170,100,0)");x.fillStyle=gl;x.beginPath();x.arc(p[0],p[1],7,0,TAU);x.fill();});
    for(let i=0;i<500;i++){const an=r()*TAU,rad=Math.sqrt(r())*R,px=cx+Math.cos(an)*rad,py=cy+Math.sin(an)*rad*.82;x.fillStyle="rgba(200,215,255,.22)";x.fillRect(px,py,1.3,1.3);}
    x.restore();x.globalAlpha=a;
    // Laniakea som en liten ruta i nätet
    const lx=cx-R*.1,ly=cy+R*.06,lr=R*.1;x.strokeStyle="#ffd86b";x.lineWidth=1.4;x.strokeRect(lx-lr,ly-lr*.82,lr*2,lr*1.64);line(lx+lr,ly-lr*.82,lx+lr*2.6,ly-lr*1.7,"#ffd86b",1.2);tx("Laniakea",lx+lr*2.6+6,ly-lr*1.7,"#ffd86b","left",14,700);
    tg("Tomrum",cx+R*.55,cy-R*.62,"rgba(255,255,255,.4)","center");tg("Tomrum",cx-R*.6,cy+R*.5,"rgba(255,255,255,.4)","center");
    if(a>.6)dim(cx-R,cy+R*.82+20,cx+R,"miljarder ljusår","#7fd6ff");x.globalAlpha=1;}
  ];
  /* kameran: scen k visar nivå k; de första sekunderna zoomar den förra nivån ut till en prick medan den nya kommer in */
  const T=3.4;
  const scene=k=>(t,kk)=>{const{s,cx,cy}=S();
    if(k===0){const u=eo(t/6);LV[1](cx,cy,s*lerp(.55,.62,u),t,eo(t/2.5)*.9);return;}
    if(k===1){const f=eo(t/T);LV[1](cx,cy,s*lerp(.62,1,f),t+6,1);return;}
    const f=t<T?ease(t/T):1;
    if(f<1){LV[k-1](cx,cy,s*lerp(1,.05,f),t+20,1-f);}
    LV[k](cx,cy,s*lerp(9,1,f),t+(t<T?0:0),Math.pow(f,.8));};
  return SC.map((_,k)=>scene(k));
}
})();
