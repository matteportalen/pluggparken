/* Hur fungerar en raket?: minilektionen som film (nio scener, ca 2 minuter), foton ur Wikimedia Commons med motion graphics (partikelströmmar, lysande banor, riktigt jordklot).
   Använder filmmotorn i ../svarthal.js, filmlib.js och filmfx.js. Röst: ../ljud/raket/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/raket-1..7.jpg. MPRaketFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.9,cap:[[0.5,"Eld, rök och en enorm kraft. Det här är berättelsen om raketer."]]},
 {k:"01 · En gammal uppfinning",d:8.2,cap:[[0.8,"Raketer är en gammal uppfinning. För nästan 800 år sedan använde man små krutraketer i Kina."]]},
 {k:"02 · Gas bakåt",d:12.6,cap:[[0.8,"En raket fungerar genom att trycka ut het gas bakåt. Då åker raketen framåt."],[7.0,"Det kallas rekyl, och du kan känna den om du släpper en uppblåst ballong."]]},
 {k:"03 · Newtons tredje lag",d:13.8,cap:[[0.8,"Isaac Newton upptäckte att varje kraft har en lika stor motkraft åt andra hållet."],[5.9,"När gasen rusar ut åt ena hållet, pressas raketen åt det andra. Det kallas Newtons tredje lag."]]},
 {k:"04 · Även i rymden",d:15,cap:[[0.8,"Raketer fungerar även i tomma rymden. De behöver inte trycka mot luft, eftersom gasen själv ger kraften."],[8.2,"Därför tar de med sig både bränsle och syre, så att de kan brinna där det inte finns någon luft."]]},
 {k:"05 · Saturnus 5",d:12.7,cap:[[0.8,"Raketen som tog människor till månen hette Saturnus 5. Den var ungefär lika lång som en fotbollsplan."],[8.3,"Dess motorer brände ungefär 13 ton bränsle varje sekund."]]},
 {k:"06 · Flera steg",d:8.4,cap:[[0.8,"För att nå rymden släpper raketen tomma tankar på vägen. Då blir den lättare och kan accelerera mer."]]},
 {k:"07 · Hastigheten",d:16.4,cap:[[0.8,"För att stanna i bana runt jorden behövs en fart på ungefär 28 000 kilometer i timmen. Det är ungefär 8 kilometer varje sekund."],[11,"En satellit faller hela tiden, men jorden kröker sig bort under den."]]},
 {k:"08 · Raketer som landar",d:13.6,cap:[[0.8,"Sedan år 2015 har man lyckats landa raketsteg efter uppskjutning, så att de kan användas igen."],[7.8,"Förr kastade man hela raketen efter varje flygning. Nu sparas mycket pengar."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Hur fungerar en raket?",under:"En film i nio steg · ca 2 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Raketer tar oss till rymden, ett litet steg i taget. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: SpaceX · CC0 · Wikimedia Commons",2:"Porträtt av Isaac Newton av Godfrey Kneller, 1689 · Public domain · Wikimedia Commons",3:"Foto: Steve Jurvetson (Saturn V) · CC BY 2.0 · Wikimedia Commons",4:"Foto: NASA/MSFC (motortest) · Public domain · Wikimedia Commons",5:"Bild: SpaceX (stegseparation) · CC0 · Wikimedia Commons",6:"Bild: NASA/MSFC (Saturn V, diagram) · Public domain · Wikimedia Commons",7:"Foto: SpaceX (Falcon 9 landar) · CC0 · Wikimedia Commons",8:"Jordklot: Solar System Scope · CC BY 4.0"};

window.MPRaketFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"raket",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"raket-",names:[1,2,3,4,5,6,7],KR});
  const F=MPFilmFX.make(E,L);
  const {x,tx,S,cred}=L,{sm,serif,kb,vign,dim,glow,clip,stars,trace,curve,chip,bigNum,fmt,sphere,ring,rgba,srand}=F;
  const FIRE="rgba(255,150,50,.75)",HOT="rgba(255,235,170,.95)";
  const rnd=i=>{const v=Math.sin(i*127.1+311.7)*43758.5453;return v-Math.floor(v);};
  /* partikelström från (px,py) i riktning (dx,dy): n glödande punkter som far iväg och tonar ut */
  const jets=(px,py,dx,dy,t,n,len,spread,col,size,sp)=>{const c=x(),pl=Math.hypot(dx,dy)||1,ux=dx/pl,uy=dy/pl,nx=-uy,ny=ux;c.save();c.globalCompositeOperation="lighter";
    for(let i=0;i<n;i++){const age=((t*(sp||1.1)+rnd(i)*3)%1+1)%1,off=(rnd(i+50)-.5)*2*spread*age,X=px+ux*age*len+nx*off,Y=py+uy*age*len+ny*off,r=size*(1.1-age*.5)*(.6+rnd(i+9)*.8),al=Math.pow(1-age,1.4);
      glow(X,Y,r*2.6,col.replace(/[\d.]+\)$/,al.toFixed(2)+")"));}c.restore();};
  const smoke=(px,py,t,w,h,al)=>{const c=x();c.save();for(let i=0;i<26;i++){const age=((t*.35+rnd(i)*2)%1),X=px+(rnd(i+7)-.5)*w*(.3+age),Y=py-age*h*.3+rnd(i+3)*h*.1,r=w*(.07+age*.16);glow(X,Y,r,`rgba(235,235,240,${.38*(1-age)*al})`,true);}c.restore();};
  const arrow=(x1,y1,x2,y2,col,w,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.strokeStyle=col;c.fillStyle=col;c.lineWidth=w||5;c.lineCap="round";c.shadowColor=col;c.shadowBlur=14;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();const an=Math.atan2(y2-y1,x2-x1),hh=(w||5)*3.2;c.beginPath();c.moveTo(x2,y2);c.lineTo(x2-Math.cos(an-.42)*hh,y2-Math.sin(an-.42)*hh);c.lineTo(x2-Math.cos(an+.42)*hh,y2-Math.sin(an+.42)*hh);c.closePath();c.fill();c.restore();};
  const metal=(c,x0,y0,w,h,base)=>{const g=c.createLinearGradient(x0,0,x0+w,0);g.addColorStop(0,"#9aa5ba");g.addColorStop(.35,"#f4f7fc");g.addColorStop(.7,base||"#c3cbdb");g.addColorStop(1,"#7e8aa2");return g;};

  /* 0 · Inledning: Falcon 9 lyfter, kameran följer raketen uppåt, eldsken och rök, titel */
  const s0=(t)=>{const{a,s}=S(),c=x(),p=cl(t/6.9,0,1);const T=kb(1,a,{z:lerp(1.1,2.1,sm(p)),fx:.72,fy:lerp(.62,.3,sm(p))},eo(t/1.2));
    if(T){const bx=T.X(645),by=T.Y(350),fl=.85+.15*Math.sin(t*38);glow(bx,by,s*.5*fl,"rgba(255,170,70,.5)");glow(bx,by,s*.2*fl,"rgba(255,245,210,.9)");jets(bx,by,0,1,t,40,s*.5,s*.1,FIRE,s*.02,1.6);smoke(T.X(500),T.Y(305),t,s*1.4,s*.6,1);}
    vign(a,.8);F.titleSweep(t,a,"RAKETER","FRÅN KRUT TILL MÅNEN","#ffcf8a",a.y+a.h*.8);cred(1,.5*eo(t/2));};

  /* 1 · En gammal uppfinning: eldpil, gnistspår och en tidsräknare mot 800 år */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();c.save();const bg=c.createRadialGradient(cx,cy,0,cx,cy,Math.max(a.w,a.h)*.7);bg.addColorStop(0,"#2a1a26");bg.addColorStop(1,"#080610");c.fillStyle=bg;c.fillRect(a.x,a.y,a.w,a.h);c.restore();stars(a,.5,t,60);
    const k=sm((t-1.4)/4.2),x0=a.x+a.w*.1,x1=a.x+a.w*.86,pyb=cy+s*.22,px=lerp(x0,x1,k),py=pyb-Math.sin(k*Math.PI)*s*.28,an=Math.atan2(-Math.cos(k*Math.PI)*s*.28*Math.PI/(x1-x0),1);
    // gnistspår
    c.save();c.translate(px,py);c.rotate(an);const len=Math.min(a.w*.14,s*.26);c.strokeStyle="#c9a26a";c.lineWidth=4;c.lineCap="round";c.beginPath();c.moveTo(-len,0);c.lineTo(len*.5,0);c.stroke();c.fillStyle="#8a6a3a";c.fillRect(-len*.28,-7,len*.5,14);c.fillStyle="#d9d0c0";c.beginPath();c.moveTo(len*.5,0);c.lineTo(len*.5-14,-6);c.lineTo(len*.5-14,6);c.closePath();c.fill();c.restore();
    c.save();c.translate(px,py);c.rotate(an);jets(-len*.9,0,-1,0,t,70,s*.5,s*.05,FIRE,s*.017,1.8);c.restore();glow(px-Math.cos(an)*len*.9,py-Math.sin(an)*len*.9,s*.07,"rgba(255,220,140,.9)");
    // spårad båge på himlen
    c.save();c.strokeStyle="rgba(255,210,140,.18)";c.setLineDash([5,9]);c.lineWidth=2;c.beginPath();for(let u=0;u<=40;u++){const q=u/40;u?c.lineTo(lerp(x0,x1,q),pyb-Math.sin(q*Math.PI)*s*.28):c.moveTo(x0,pyb);}c.stroke();c.restore();
    const yrs=Math.round(800*sm((t-.8)/3.4));bigNum(fmt(yrs)+" år",cx,a.y+a.h*.2,Math.min(a.w*.1,s*.15),"#ffd86b",eo(t/.5));tx("SEDAN KINESERNA ANVÄNDE KRUTRAKETER",cx,a.y+a.h*.2+Math.max(26,s*.06),"rgba(255,216,107,.85)","center",Math.max(10,s*.024),700);
    if(t>5)chip("krutraket · Kina · ca år 1230",cx,a.y+a.h*.9,"rgba(255,216,107,.8)",Math.max(12,s*.032),eo((t-5)/.7));};

  /* 2 · Gas bakåt: en tryckkammare där gasen studsar och slipper ut, kammaren rycker uppåt; sedan en ballong */
  const gasbox=(cx,py,w,h,t,k)=>{const c=x(),r=Math.max(10,w*.12);c.save();c.fillStyle="rgba(10,16,34,.85)";c.strokeStyle="rgba(159,208,255,.75)";c.lineWidth=2.5;c.beginPath();c.moveTo(cx-w/2,py);c.lineTo(cx+w/2,py);c.lineTo(cx+w/2,py+h-r);c.lineTo(cx+w*.16,py+h);c.lineTo(cx+w*.16,py+h+h*.14);c.lineTo(cx-w*.16,py+h+h*.14);c.lineTo(cx-w*.16,py+h);c.lineTo(cx-w/2,py+h-r);c.closePath();c.fill();c.stroke();c.restore();
    // gaspartiklar som studsar och söker sig mot öppningen
    c.save();c.globalCompositeOperation="lighter";for(let i=0;i<80;i++){const ph=t*(.9+rnd(i)*.9)+rnd(i+1)*9,X=cx+Math.sin(ph*1.9+i)*w*.4*(1-Math.max(0,(Math.sin(ph*.7+i))*.0)),Y=py+h*.5+Math.cos(ph*2.3+i*1.3)*h*.42;c.fillStyle=`rgba(255,${160+rnd(i+4)*70|0},90,.8)`;c.beginPath();c.arc(X,Y,Math.max(2.4,w*.024),0,TAU);c.fill();}c.restore();
    glow(cx,py+h*.5,w*.6,"rgba(255,140,60,.18)");};
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();stars(a,1,t,90);
    if(t<7){const w=Math.min(a.w*.26,s*.4),h=w*1.15,k=sm((t-2.6)/4),py=cy-h*.55-k*s*.16,fl=.85+.15*Math.sin(t*40);
      jets(cx,py+h*1.14,0,1,t,60,s*.55,w*.22,FIRE,s*.02,1.7);glow(cx,py+h*1.16,s*.12*fl,"rgba(255,230,160,.9)");gasbox(cx,py,w,h,t,k);
      if(t>3){const q=eo((t-3)/.7);arrow(cx+w*.8,py+h*1.2,cx+w*.8,py+h*1.75,"#ff9a5a",6,q);tx("GAS ÅT NER",cx+w*.95,py+h*1.5,`rgba(255,154,90,${q})`,"left",Math.max(11,s*.028),700);arrow(cx+w*.8,py+h*.5,cx+w*.8,py-h*.1,"#9be3b0",6,q);tx("RAKETEN ÅT UPP",cx+w*.95,py+h*.2,`rgba(155,227,176,${q})`,"left",Math.max(11,s*.028),700);}
      tx("HET GAS TRYCKS UT BAKÅT",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(14,s*.04),700);}
    else{const g=sm((t-7)/.8),k=sm((t-8.2)/3.8),bx=lerp(a.x+a.w*.22,a.x+a.w*.78,k)+Math.sin(k*18)*s*.03,by=cy+Math.sin(k*13)*s*.14-k*s*.1,r=Math.max(26,s*.08)*(1.1-.5*k),an=-k*10+Math.sin(k*20)*.4;
      c.save();c.globalAlpha=g;c.translate(bx,by);c.rotate(an);const bg=c.createRadialGradient(-r*.3,-r*.3,r*.1,0,0,r*1.1);bg.addColorStop(0,"#ff7a8a");bg.addColorStop(1,"#c0283c");c.fillStyle=bg;c.beginPath();c.ellipse(0,0,r*1.15,r,0,0,TAU);c.fill();c.fillStyle="#a01f30";c.fillRect(-r*1.45,-r*.12,r*.35,r*.24);c.restore();
      c.save();c.globalAlpha=g;c.translate(bx,by);c.rotate(an);jets(-r*1.4,0,-1,0,t,36,s*.3,s*.05,"rgba(190,225,255,.9)",s*.016,2);c.restore();
      if(t>8.4)chip("REKYL",cx,a.y+a.h*.14,"rgba(255,216,107,.9)",Math.max(16,s*.05),eo((t-8.4)/.6));tx("luften ut åt ena hållet, ballongen åt andra",cx,a.y+a.h*.9,"#ffd86b","center",Math.max(13,s*.034),700);}};

  /* 3 · Newtons tredje lag: Newton, sedan kraft och motkraft i balans */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    if(t<5.2){const p=cl(t/5.2,0,1);kb(2,a,{z:lerp(1.05,1.4,sm(p)),fx:.5,fy:lerp(.5,.32,sm(p))},1);dim(a,.2);vign(a,.8);
      const f=eo((t-1)/.9);tx("ISAAC NEWTON",cx,a.y+a.h*.9,`rgba(255,216,107,${f})`,"center",Math.max(14,s*.04),700);tx("ENGELSK FORSKARE, ca 1687",cx,a.y+a.h*.9+Math.max(22,s*.05),`rgba(255,255,255,${.7*f})`,"center",Math.max(10,s*.024),600);cred(2,.45);}
    else{const g=sm((t-4.8)/1.1);stars(a,1,t,80);c.save();c.globalAlpha=g;const w=Math.min(a.w*.18,s*.3),py=cy-s*.14,h=w*1.05;
      jets(cx,py+h*1.1,0,1,t,52,s*.5,w*.2,FIRE,s*.018,1.6);gasbox(cx,py,w,h,t,0);
      const q1=sm((t-6)/.8),q2=sm((t-7.2)/.8),pulse=1+.07*Math.sin(t*4);arrow(cx-w*.9,py+h*.5,cx-w*.9,py-h*.75*q1*pulse,"#9be3b0",7,q1);tx("KRAFT",cx-w*1.05,py-h*.2,`rgba(155,227,176,${q1})`,"right",Math.max(13,s*.036),700);
      arrow(cx-w*.9,py+h*.5,cx-w*.9,py+h*.5+h*.75*q2*pulse,"#ff9a5a",7,q2);tx("MOTKRAFT",cx-w*1.05,py+h*.9,`rgba(255,154,90,${q2})`,"right",Math.max(13,s*.036),700);
      if(t>9){const q=eo((t-9)/.9);bigNum("Newtons tredje lag",cx,a.y+a.h*.14,Math.min(a.w*.065,s*.1),"#ffd86b",q);tx("varje kraft har en lika stor motkraft åt andra hållet",cx,a.y+a.h*.14+Math.max(30,s*.07),`rgba(207,216,255,${q})`,"center",Math.max(12,s*.032),600);}
      c.restore();}};

  /* 4 · Även i rymden: motortest, sedan tankar med bränsle och syre som flödar in i brännkammaren */
  const tank=(c,px,py,w,h,col,lbl,sz)=>{const g=c.createLinearGradient(px-w/2,0,px+w/2,0);g.addColorStop(0,"rgba(0,0,0,.35)");g.addColorStop(.35,col);g.addColorStop(1,"rgba(0,0,0,.45)");c.save();c.fillStyle=col;c.beginPath();c.roundRect?c.roundRect(px-w/2,py,w,h,w*.3):c.rect(px-w/2,py,w,h);c.fill();c.fillStyle=g;c.fill();c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=2;c.stroke();c.restore();tx(lbl,px,py-Math.max(12,sz*.7),"#fff","center",sz,700);};
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    if(t<8.2){const p=cl(t/8.2,0,1);const T=kb(4,a,{z:lerp(1.05,1.45,sm(p)),fx:.62,fy:.4},1);if(T){const fl=.8+.2*Math.sin(t*33);glow(T.X(510),T.Y(300),s*.4*fl,"rgba(255,170,60,.28)");jets(T.X(560),T.Y(305),1,.02,t,34,s*.5,s*.07,FIRE,s*.018,1.7);}vign(a,.75);
      if(t>3){const q=eo((t-3)/.8);chip("INGEN LUFT BEHÖVS",cx,a.y+a.h*.12,"rgba(255,216,107,.85)",Math.max(14,s*.04),q);tx("gasen ger kraften själv",cx,a.y+a.h*.12+Math.max(34,s*.075),`rgba(207,216,255,${q})`,"center",Math.max(12,s*.032),600);}cred(4,.4);}
    else{const g=sm((t-8.2)/.9);stars(a,1,t,100);c.save();c.globalAlpha=g;const w=Math.min(a.w*.16,s*.26),h=Math.min(a.h*.36,s*.5),y=cy-h*.85,lx=cx-w*1.5,rx=cx+w*1.5,chy=y+h*1.35,cw=w*1.5,ch=h*.5;
      tank(c,lx,y,w,h,"#d9703a","BRÄNSLE",Math.max(11,s*.028));tank(c,rx,y,w,h,"#4a8ad9","SYRE",Math.max(11,s*.028));
      // rör: prickar som flödar ner i brännkammaren
      [[lx,"#ffb27a"],[rx,"#8ec4ff"]].forEach(([px,col],j)=>{c.save();c.globalCompositeOperation="lighter";for(let i=0;i<14;i++){const f=((t*.5+i/14)%1),X=lerp(px,cx+(j?w*.35:-w*.35),f),Y=lerp(y+h,chy,Math.pow(f,.8));glow(X,Y,s*.014,rgba(col==="#ffb27a"?"#ffb27a":"#8ec4ff",.7));}c.restore();});
      c.fillStyle="rgba(10,16,34,.85)";c.strokeStyle="rgba(255,190,120,.8)";c.lineWidth=2.5;c.beginPath();c.roundRect?c.roundRect(cx-cw/2,chy,cw,ch,10):c.rect(cx-cw/2,chy,cw,ch);c.fill();c.stroke();const fk=.85+.15*Math.sin(t*35);glow(cx,chy+ch*.5,cw*.9*fk,"rgba(255,150,60,.6)");glow(cx,chy+ch*.5,cw*.35,"rgba(255,240,200,.9)");jets(cx,chy+ch,0,1,t,40,s*.32,cw*.22,FIRE,s*.017,1.7);
      if(t>10)chip("bränsle + syre → brinner utan luft",cx,a.y+a.h*.1,"rgba(255,216,107,.85)",Math.max(13,s*.036),eo((t-10)/.8));c.restore();}};

  /* 5 · Saturnus 5: längd mot fotbollsplan, 13 ton bränsle per sekund */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    if(t<3.2){const p=cl(t/3.2,0,1);const T=kb(3,a,{z:lerp(1.15,1.55,sm(p)),fx:.38,fy:lerp(.62,.4,sm(p))},1);vign(a,.7);cred(3,.45);}
    else if(t<8.3){const g=sm((t-2.6)/.8);stars(a,1,t,60);c.save();c.globalAlpha=g;const w=Math.min(a.w*.84,s*1.55),lx=cx-w/2,ph=w*105/110,gh=Math.max(34,w*.11),y=cy+s*.02;
      c.fillStyle="#26703f";c.fillRect(lx,y,ph,gh);for(let i=0;i<7;i++){c.fillStyle=i%2?"rgba(255,255,255,.04)":"rgba(0,0,0,.08)";c.fillRect(lx+i*ph/7,y,ph/7,gh);}c.strokeStyle="rgba(255,255,255,.8)";c.lineWidth=2;c.strokeRect(lx+3,y+3,ph-6,gh-6);c.beginPath();c.moveTo(lx+ph/2,y+3);c.lineTo(lx+ph/2,y+gh-3);c.stroke();c.beginPath();c.arc(lx+ph/2,y+gh/2,gh*.2,0,TAU);c.stroke();
      tx("FOTBOLLSPLAN · 105 m",lx+ph/2,y+gh+Math.max(24,s*.055),"rgba(155,227,176,.95)","center",Math.max(11,s*.028),700);
      const rh=Math.max(24,w*.075),k=sm((t-3.4)/1.6),rl=w*k,ry=y-rh*1.15;c.save();c.shadowColor="rgba(255,255,255,.5)";c.shadowBlur=16;c.fillStyle="#f6f6f8";c.beginPath();c.moveTo(lx,ry+rh*.15);c.lineTo(lx+rl*.9,ry);c.lineTo(lx+rl,ry+rh*.5);c.lineTo(lx+rl*.9,ry+rh);c.lineTo(lx,ry+rh*.85);c.closePath();c.fill();c.restore();c.fillStyle="#1d1d22";for(const f of [.2,.52]){c.fillRect(lx+rl*f,ry+rh*.02,rl*.035,rh*.96);}jets(lx,ry+rh*.5,-1,0,t,36,s*.22,rh*.4,FIRE,s*.015,1.8);glow(lx-6,ry+rh*.5,s*.07,"rgba(255,220,140,.9)");
      bigNum("SATURNUS 5 · ca 110 m",lx+w*.5,ry-Math.max(26,s*.06),Math.min(a.w*.05,s*.075),"#ffd86b",k);c.restore();}
    else{const q=sm((t-8.3)/.8);stars(a,1,t,70);const n=Math.min(5,(t-8.6)/.8),tons=Math.max(0,Math.floor(13*n+.0));bigNum("13 ton varje sekund",cx,a.y+a.h*.14,Math.min(a.w*.07,s*.1),"#ffd86b",q);
      const bw=Math.max(22,Math.min(a.w*.06,s*.07)),per=13;c.save();c.globalAlpha=q;for(let i=0;i<Math.min(65,tons);i++){const col=i%per,row=Math.floor(i/per),X=cx-bw*per/2+col*bw*1.02,Y=a.y+a.h*.3+row*bw*1.02,cg=c.createLinearGradient(X,Y,X,Y+bw);cg.addColorStop(0,"#f08a46");cg.addColorStop(1,"#b44e1c");c.fillStyle=cg;c.shadowColor="rgba(255,140,60,.6)";c.shadowBlur=8;c.fillRect(X,Y,bw*.92,bw*.92);}c.restore();
      tx(Math.round(tons)+" ton efter "+Math.max(0,Math.floor(n))+" s",cx,a.y+a.h*.9,"#cfd8ff","center",Math.max(14,s*.04),700);}};

  /* 6 · Flera steg: separationen ritas med blixt, tomma tankar faller, resten accelererar */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x(),p=cl(t/8.4,0,1);const T=kb(5,a,{z:lerp(1.05,1.18,p),fx:.5,fy:.5},1);dim(a,.4);vign(a,.7);
    const w=Math.min(a.w*.1,s*.13),h=Math.min(a.h*.14,s*.18),base=a.y+a.h*.8,k=sm((t-2.6)/1.4),k2=sm((t-4.6)/1.4);
    const seg=(i,off,drop,lbl,col)=>{const y=base-i*h*1.06-off,dy=drop;c.save();c.globalAlpha=1-cl(dy/(a.h*.14),0,1)*.9;const g=metal(c,cx-w/2,y-h,w,h,col);c.fillStyle=g;c.beginPath();c.roundRect?c.roundRect(cx-w/2,y-h+dy,w,h,6):c.rect(cx-w/2,y-h+dy,w,h);c.fill();c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=1.5;c.stroke();c.restore();tx(lbl,cx+w*.75,y-h/2+dy+5,"#fff","left",Math.max(11,s*.028),700);};
    seg(2,k*a.h*.1+k2*a.h*.1,0,"STEG 3");seg(1,k*a.h*.1,k2*a.h*.16,"STEG 2");seg(0,0,k*a.h*.16,"STEG 1");
    // flash och eldsken vid separationerna
    [[k,base-h*.5],[k2,base-h*1.6-k*a.h*.1]].forEach(([q,fy],i)=>{if(q>0&&q<1){glow(cx,fy,s*.25*Math.sin(q*Math.PI),"rgba(255,245,210,.85)");}});
    const top=base-3*h*1.06-k*a.h*.1-k2*a.h*.1;jets(cx,base-(k<1?0:1)*h*1.06*(k>=1)-(k>=1?k*a.h*.1-a.h*.16*0:0)+4,0,1,t,40,s*.28,w*.2,FIRE,s*.015,1.7);glow(cx,top+h*2,s*.1,"rgba(255,160,70,.3)");
    tx("TOMMA TANKAR SLÄPPS",cx-w*1.3,a.y+a.h*.22,"#ff9a5a","right",Math.max(12,s*.034),700);tx("lättare = kan accelerera mer",cx-w*1.3,a.y+a.h*.22+Math.max(28,s*.065),"#9be3b0","right",Math.max(11,s*.03),600);cred(5,.4);};

  /* 7 · Newtons kanon: jorden, tre skott med olika fart och en bana runt hela jorden, 8 km/s */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();stars(a,1,t,130);
    const R=Math.min(a.h*.28,a.w*.2,s*.32),ex=cx,ey=cy+R*.5;sphere("jorden",ex,ey,R,t*6,true);
    const topY=ey-R,sx=ex,sy=topY-8,shots=[[.35,"#ff9a5a","för lite fart",3.2],[.72,"#ffd23c","mer fart",5],[1,"#9be3b0","8 km/s · i bana",6.8]];
    shots.forEach(([v,col,lbl,t0],i)=>{const q=sm((t-t0)/(i<2?1.6:3.2));chip(lbl,a.x+a.w*(port?.5:.16),a.y+a.h*(.1+.075*i)+(port?a.h*.04:0),rgba(col,.9)+"",Math.max(11,s*.028),sm((t-t0+.4)/.5),port?false:true);
      if(q<=0)return;const pts=[];if(v<1){const reach=(v<.5?.35:.9),n=60;for(let u=0;u<=n*q;u++){const p=u/n,an=-Math.PI/2+p*reach,rr=R+6+Math.sin(p*Math.PI)*R*(v<.5?.18:.32);pts.push([ex+Math.cos(an)*rr,ey+Math.sin(an)*rr]);}trace(pts,1,col,3,q<1);}
      else{const n=90;for(let u=0;u<=n*q;u++){const an=-Math.PI/2+u/n*TAU;pts.push([ex+Math.cos(an)*(R*1.36),ey+Math.sin(an)*(R*1.36)]);}trace(pts,1,col,3,q<1);}});
    if(t>10){const an=-Math.PI/2+(t-10)*.9,px=ex+Math.cos(an)*R*1.36,py=ey+Math.sin(an)*R*1.36;glow(px,py,s*.05,"rgba(255,255,255,.9)");c.fillStyle="#fff";c.fillRect(px-5,py-4,10,8);
      const dx=ex-px,dy=ey-py,dl=Math.hypot(dx,dy);arrow(px,py,px+dx/dl*R*.5,py+dy/dl*R*.5,"#ff9a5a",4,.85);}
    const sp=Math.round(28000*sm((t-5.5)/3));if(t>5.5)bigNum(fmt(sp)+" km/h",cx,a.y+a.h*(port?.9:.92),Math.min(a.w*.06,s*.1),"#9be3b0",eo((t-5.5)/.6));
    if(t>11){const q=eo((t-11)/.9);tx("faller hela tiden",cx,a.y+a.h*.1,`rgba(255,216,107,${q})`,"center",Math.max(17,s*.048),700);tx("men jorden kröker sig undan",cx,a.y+a.h*.1+Math.max(30,s*.065),`rgba(207,216,255,${q})`,"center",Math.max(12,s*.032),600);}
    cred(8,.35);};

  /* 8 · Raketer som landar: foto av landningen, sedan flygningar som räknas upp */
  const s8=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    if(t<7.8){const p=cl(t/7.8,0,1);const T=kb(7,a,{z:lerp(1.05,2.2,sm(p)),fx:.48,fy:lerp(.55,.74,sm(p))},1);if(T){const bx=T.X(435),by=T.Y(468),fl=sm((t-1.4)/2)*(1-sm((t-6.3)/1.2)),fz=.85+.15*Math.sin(t*34);glow(bx,by,s*.22*fz*fl+1,"rgba(255,170,70,.6)");glow(bx,by,s*.08*fz*fl+1,"rgba(255,245,210,.95)");jets(bx,by,0,1,t,26,s*.2,s*.04,FIRE,s*.012,1.8);}vign(a,.7);
      const f=eo((t-2)/.9);chip("raketsteget landar på en plattform i havet",cx,a.y+a.h*.12,"rgba(255,216,107,.85)",Math.max(12,s*.034),f);cred(7,.4);}
    else{const g=sm((t-7.8)/.9);stars(a,1,t,80);c.save();c.globalAlpha=g;const lx=a.x+a.w*(port?.5:.28),rx=a.x+a.w*(port?.5:.72),ly=port?cy-s*.26:cy,ry=port?cy+s*.3:cy;
      bigNum("FÖRR",lx,ly-s*.22,Math.min(a.w*.06,s*.09),"#ff9a8a",1);bigNum("1 flygning",lx,ly,Math.min(a.w*.07,s*.11),"#ff9a8a",1);tx("sedan kastades hela raketen",lx,ly+Math.max(34,s*.075),"rgba(255,180,170,.9)","center",Math.max(11,s*.028),600);
      const n=Math.min(10,1+Math.floor(Math.max(0,t-9)*1.4));bigNum("NU",rx,ry-s*.22,Math.min(a.w*.06,s*.09),"#9be3b0",1);bigNum(n+" flygningar"+(n>=10?"+":""),rx,ry,Math.min(a.w*.07,s*.11),"#9be3b0",1);tx("steget används igen och igen",rx,ry+Math.max(34,s*.075),"rgba(190,240,205,.9)","center",Math.max(11,s*.028),600);
      c.strokeStyle="rgba(155,227,176,.9)";c.lineWidth=5;c.lineCap="round";c.shadowColor="#9be3b0";c.shadowBlur=14;const rr=Math.max(26,s*.07),an0=t*3;c.beginPath();c.arc(rx,ry-s*.38,rr,an0,an0+TAU*.8);c.stroke();c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7,s8];
}
})();
