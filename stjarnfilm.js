/* En stjärnas liv: en film i nio steg (gasmoln, stjärna, röd jätte, vit dvärg, supernova, neutronstjärna och svart hål), ritad i kod (canvas).
   Använder filmmotorn i svarthal.js (MPSvartHal.start med o.def: undertexter, röst, kontroller, helskärm).
   Röst: ljud/stjarna/s<scen>-<replik>.mp3 (ElevenLabs, samma röst som de andra filmerna); saknas en fil visas bara texten.
   Riktiga foton: Carinanebulosan (ESO, CC BY 4.0) och Cassiopeia A (NASA/CXC/SAO, NASA/STScI, NASA/JPL, public domain).
   MPStjarnFilm.start(host,{overlay,onClose}). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/";}})();
const TAU=Math.PI*2;

/* ---------- Manus: nio scener (0 = inledning), undertexter med starttid i sekunder ---------- */
const SC=[
 {k:"Inledning",d:8,cap:[[0.5,"Alla stjärnor har ett liv. De föds, lyser i miljarder år och dör. Följ med på resan, från gasmoln till svart hål."]]},
 {k:"01 · Ett moln av gas och damm",d:15.5,cap:[[0.8,"Allt börjar i ett jättelikt moln av gas och damm. Molnet kan vara många ljusår brett."],[7.7,"Tyngdkraften drar ihop det, bit för bit. Där gasen blir tätast börjar en ny stjärna formas."]]},
 {k:"02 · En stjärna tänds",d:14.8,cap:[[0.8,"Mitt i molnet blir gasen så hoptryckt att den blir varm, över 10 miljoner grader."],[6.5,"Då börjar atomerna smälta ihop, och det frigör enormt med energi. Stjärnan lyser!"]]},
 {k:"03 · Balans",d:16.4,cap:[[0.8,"Nu råder balans. Tyngdkraften pressar inåt, och hettan pressar lika hårt utåt."],[7.2,"Så kan solen lysa lugnt i 10 miljarder år. Idag är den 4,6 miljarder år gammal, ungefär halvvägs."]]},
 {k:"04 · En röd jätte",d:16.6,cap:[[0.8,"Om ungefär 5 miljarder år tar vätet i mitten slut. Då sväller solen till en röd jätte, över hundra gånger större än i dag."],[10.7,"Den slukar Merkurius och Venus, och jorden blir alldeles för het för liv."]]},
 {k:"05 · En vit dvärg",d:15.7,cap:[[0.8,"Sedan blåser stjärnan bort sina yttre lager, som ett vackert, glödande moln."],[6.1,"Kvar blir en vit dvärg, bara lika stor som jorden men nästan lika tung som solen. Den svalnar sakta i miljarder år."]]},
 {k:"06 · Jättestjärnor",d:16.6,cap:[[0.8,"Stjärnor som är mycket tyngre än solen lever fort. En blå jätte gör av med sitt bränsle på bara några miljoner år."],[8.6,"Sedan sväller den till en röd superjätte, som Betelgeuse i Orion, tusen gånger bredare än solen."]]},
 {k:"07 · Supernova",d:21.5,cap:[[0.8,"I mitten bygger stjärnan järn, och järn ger ingen energi. Då rasar kärnan ihop på mindre än en sekund."],[9.2,"Smällen kastar ut stjärnan i en supernova, som kan lysa starkare än en hel galax."],[15,"Järnet i ditt blod och kalciumet i dina ben har bildats inne i stjärnor."]]},
 {k:"08 · Neutronstjärna och svart hål",d:13,cap:[[0.8,"Kvar i mitten blir en neutronstjärna, så tät att en tesked väger miljarder ton."],[6.5,"Är stjärnan ännu tyngre fortsätter kärnan att rasa ihop, och då föds ett svart hål."]]}
];
const META={hud:"PLUGGPARKEN · RYMDARKIVET · FILM 03",titel:"En stjärnas liv",under:"En film i åtta steg · ca 3 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Stjärnor föds och dör, och av deras rester bildas nya stjärnor, planeter och till slut även vi. Fortsätt vara nyfiken! Filmen följer solens och jättestjärnornas liv, och siffrorna är hämtade från NASA och vanliga astronomiböcker.",igen:"↻ Se filmen igen"};

/* ---------- Bilder ---------- */
const IMG={};function img(u){if(!IMG[u]){const i=new Image();i.src=u;IMG[u]=i;}return IMG[u];}
const CAR=ROOT+"specialare/bilder/atom-6.jpg",CASA=ROOT+"ovriga/rymdlabbet/supernova-casa.jpg",EARTH=ROOT+"ovriga/solsystemet/bilder/2k_earth_daymap.jpg";
[CAR,CASA,EARTH].forEach(img);
const ok=i=>i&&i.complete&&i.naturalWidth;
const srand=s=>()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};

window.MPStjarnFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"stjarna",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {A,eo,cl,lerp,ease,seg,font,glowDot,hole}=E;
  const tx=(t,px,py,col,al,sz,w)=>{const x=E.x;x.font=font(w||600,sz||12);x.fillStyle=col||"rgba(255,255,255,.85)";x.textAlign=al||"left";x.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#7fd6ff",al,11,700);
  const S=()=>{const a=A();return{a,s:Math.min(a.w,a.h),cx:a.x+a.w/2,cy:a.y+a.h*.5,port:E.W<E.H*.9};};
  const line=(x1,y1,x2,y2,col,w,dash)=>{const x=E.x;x.strokeStyle=col;x.lineWidth=w||1;if(dash)x.setLineDash(dash);x.beginPath();x.moveTo(x1,y1);x.lineTo(x2,y2);x.stroke();x.setLineDash([]);};
  const dim=(x1,y,x2,label,col)=>{line(x1,y,x2,y,col||"#ffd86b",1.3);line(x1,y-6,x1,y+6,col||"#ffd86b",1.3);line(x2,y-6,x2,y+6,col||"#ffd86b",1.3);tx(label,(x1+x2)/2,y-10,col||"#ffd86b","center",13,700);};
  const ring=(cx,cy,r,col,w,dash)=>{const x=E.x;x.strokeStyle=col;x.lineWidth=w||1;if(dash)x.setLineDash(dash);x.beginPath();x.arc(cx,cy,r,0,TAU);x.stroke();x.setLineDash([]);};
  const disc=(px,py,r,col)=>{const x=E.x;x.fillStyle=col;x.beginPath();x.arc(px,py,r,0,TAU);x.fill();};
  const glow=(cx,cy,r,rgb,a)=>{const x=E.x;x.save();x.globalCompositeOperation="lighter";const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,`rgba(${rgb},${a})`);g.addColorStop(.4,`rgba(${rgb},${a*.35})`);g.addColorStop(1,`rgba(${rgb},0)`);x.fillStyle=g;x.beginPath();x.arc(cx,cy,r,0,TAU);x.fill();x.restore();};
  const star=(cx,cy,r,core,rim,a)=>{const x=E.x;a=a==null?1:a;glow(cx,cy,r*3.2,rim,.55*a);const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,`rgba(${core},${a})`);g.addColorStop(.7,`rgba(${rim},${a})`);g.addColorStop(1,`rgba(${rim},${a*.85})`);x.fillStyle=g;x.beginPath();x.arc(cx,cy,r,0,TAU);x.fill();};
  const cred=(t,a)=>{const x=E.x;x.save();x.globalAlpha=a==null?.6:a;x.fillStyle="#fff";x.font=font(600,11);x.textAlign="right";x.fillText(t,E.W-Math.max(14,E.W*.03),E.H-Math.max(96,E.H*.13));x.restore();};
  const cover=(im,cx,cy,w,h,zoom,ox,oy)=>{const x=E.x,s=Math.max(w/im.naturalWidth,h/im.naturalHeight)*zoom,iw=im.naturalWidth*s,ih=im.naturalHeight*s;x.save();x.beginPath();x.rect(cx-w/2,cy-h/2,w,h);x.clip();x.drawImage(im,cx-iw/2+(ox||0)*w,cy-ih/2+(oy||0)*h,iw,ih);x.restore();};

  /* ---- 0 · Inledning: stjärnor som tänds, långsamt inzoomning i ett moln ---- */
  const s0=(t)=>{const{s,cx,cy,a}=S(),im=img(CAR);const f=eo(t/7);
    if(ok(im)){const x=E.x;x.save();x.globalAlpha=.55*f;cover(im,cx,cy,a.w,a.h,1+.1*f,0,0);x.restore();}
    glow(cx,cy,s*.5,"255,170,120",.25*f);};

  /* ---- 1 · Molnet: riktigt foto + damm som drar mot en tät knut ---- */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),x=E.x,im=img(CAR),f=eo(t/3);
    const w=a.w*.96,h=a.h*.84;
    if(ok(im)){x.save();x.globalAlpha=f;cover(im,cx,cy,w,h,1.02+.06*Math.min(1,t/16),0,0);x.restore();}
    // vinjett så fotot går i mörker vid kanterna
    x.save();const g=x.createRadialGradient(cx,cy,Math.min(w,h)*.3,cx,cy,Math.max(w,h)*.62);g.addColorStop(0,"rgba(2,3,10,0)");g.addColorStop(1,"rgba(2,3,10,.92)");x.fillStyle=g;x.fillRect(a.x,a.y,a.w,a.h);x.restore();
    // dammkorn som drivs mot mitten (den andra halvan: tyngdkraften)
    const pull=cl((t-8)/9,0,1),r=srand(9);x.save();x.globalCompositeOperation="lighter";
    for(let i=0;i<220;i++){const an=r()*TAU,d0=(.25+r()*.75)*Math.min(w,h)*.5,ph=(t*.05+r())%1,k=Math.max(0,pull),d=d0*(1-k*.78*(.3+ph*.7)),px=cx+Math.cos(an)*d,py=cy+Math.sin(an)*d*.82;
      x.fillStyle=`rgba(255,${Math.round(190+r()*50)},${Math.round(150+r()*80)},${.12+.25*k})`;x.fillRect(px,py,1.5,1.5);}
    x.restore();
    if(pull>0)glow(cx,cy,s*(.04+.18*pull),"255,190,140",.5*pull);
    dim(cx-w*.42,cy+h*.5+22,cx+w*.42,"många ljusår","#7fd6ff");
    tg("Nebulosa",a.x+Math.max(16,a.w*.04),a.y+Math.max(24,a.h*.06),"#ffd86b","left");
    cred("Riktigt foto: Carinanebulosan · ESO · CC BY 4.0",.55*f);};

  /* ---- 2 · Stjärnan tänds: ihopdragning, temperatur, fusion ---- */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),x=E.x,r=srand(4);
    const col=cl(t/6.2,0,1),ign=cl((t-6)/1,0,1);                       // 0–9,5 s: molnet krymper och hettas upp
    const R0=s*.46,Rc=lerp(R0,s*.05,eo(col));
    x.save();x.globalCompositeOperation="lighter";
    for(let i=0;i<520;i++){const an=r()*TAU,d=(.2+r()*.8)*R0*(1-eo(col)*.82)*(.55+.45*Math.sin(i+t*.4)*0+.45),px=cx+Math.cos(an+t*.18*(1-d/R0))*d,py=cy+Math.sin(an+t*.18*(1-d/R0))*d*.85;
      const heat=cl(1-d/(R0*.45),0,1)*col;x.fillStyle=`rgba(255,${Math.round(150+heat*90)},${Math.round(110+heat*120)},${.12+.3*(1-d/R0)})`;x.fillRect(px,py,1.6+heat*1.4,1.6+heat*1.4);}
    x.restore();
    const core=s*.045*(1+.2*Math.sin(t*3)*0);glow(cx,cy,Rc*.7+core*3,"255,150,90",.55*col);
    if(ign>0){const fl=Math.max(0,1-(t-6)/1.8);if(fl>0){x.save();x.globalCompositeOperation="lighter";const g=x.createRadialGradient(cx,cy,0,cx,cy,s*.7);g.addColorStop(0,`rgba(255,255,240,${.9*fl})`);g.addColorStop(1,"rgba(255,220,150,0)");x.fillStyle=g;x.fillRect(a.x,a.y,a.w,a.h);x.restore();}
      star(cx,cy,s*.055*(.6+.4*ign),"255,252,235","255,214,120",ign);}
    else star(cx,cy,Math.max(3,Rc*.12),"255,200,160","255,120,70",col*.9);
    // temperatur
    const T=Math.round(lerp(10,10000000,Math.pow(col,2.2)));
    const px=a.x+Math.max(16,a.w*.04),py=a.y+Math.max(40,a.h*.1);
    tg("Temperatur i mitten",px,py-24,"#7fd6ff","left");
    tx((T<1000?T:T.toLocaleString("sv-SE").replace(/ /g," "))+" °C",px,py+6,ign>0?"#ffd86b":"#fff","left",Math.max(24,s*.07),700);
    // fusion: fyra väteatomer blir en heliumatom (efter tändningen)
    if(t>6.6){const u=cl((t-6.8)/6,0,1),fx=cx+(port?0:s*.5),fy=port?cy+s*.45:cy,q=((t-6.8)*.4)%1;
      x.save();x.globalAlpha=eo(u*4);
      const pos=[[-1,-1],[1,-1],[-1,1],[1,1]],m=eo(Math.min(1,q*1.6)),Rr=s*.1;
      pos.forEach(([dx,dy])=>{disc(fx+dx*Rr*(1-m)*1.1,fy+dy*Rr*(1-m)*1.1,Math.max(3,s*.018),"rgba(140,200,255,1)");});
      if(m>=.95){const pu=(q-.62)/.38;star(fx,fy,s*.03,"255,255,255","255,200,120",cl(pu*2,0,1)*cl(1-(pu-.6)*2.5,0,1));}
      tx("4 väteatomer → 1 heliumatom",fx,fy+Rr*1.9,"rgba(255,255,255,.85)","center",12,700);tx("+ energi",fx,fy+Rr*1.9+17,"#ffd86b","center",12,700);x.restore();}};

  /* ---- 3 · Balans: pilar inåt och utåt, tidslinje för solens liv ---- */
  const s3=(t)=>{const{s,cx,a,port}=S(),cy=a.y+a.h*.4,x=E.x,R=s*.1*(1+.012*Math.sin(t*2.2)),k=eo(t/2);
    glow(cx,cy,R*3.5,"255,200,110",.4);star(cx,cy,R,"255,252,230","255,200,90");
    const n=12,d1=R*2.6,d0=R*1.45,len=R*.9,pu=1+.05*Math.sin(t*2.2);
    for(let i=0;i<n;i++){const an=i/n*TAU+t*.05,c=Math.cos(an),sn=Math.sin(an);
      x.save();x.globalAlpha=k;
      E.arrow(cx+c*d1*pu,cy+sn*d1*pu,cx+c*(d1-len)*pu,cy+sn*(d1-len)*pu,"rgba(110,170,255,.95)",2.4);                      // tyngdkraft inåt
      E.arrow(cx+c*(d0+R*.1)*pu,cy+sn*(d0+R*.1)*pu,cx+c*(d0+len*.9)*pu,cy+sn*(d0+len*.9)*pu,"rgba(255,150,70,.95)",2.4);     // tryck utåt
      x.restore();}
    x.save();x.globalAlpha=k;tx("Tyngdkraft",cx,cy-d1-len*.55-12,"#7fb2ff","center",14,700);tx("Tryck och hetta",cx,cy+d1+len*.55+14,"#ffa760","center",14,700);x.restore();
    // tidslinje över solens liv
    const lw=Math.min(a.w*.8,s*1.5),lx=cx-lw/2,ly=a.y+a.h*.9;
    if(t>7.2){const f=eo((t-7.2)/2.5);x.save();x.globalAlpha=f;
      x.fillStyle="rgba(127,214,255,.18)";x.fillRect(lx,ly-3,lw,6);x.fillStyle="#ffd86b";x.fillRect(lx,ly-3,lw*.46*f,6);
      tx("Födelse",lx,ly+20,"rgba(255,255,255,.7)","left",11);tx("10 miljarder år",lx+lw,ly+20,"rgba(255,255,255,.7)","right",11);
      glowDot(lx+lw*.46*f,ly,5,"rgba(255,216,107,1)");tx("Solen idag · 4,6 miljarder år",lx+lw*.46,ly-18,"#ffd86b","center",13,700);x.restore();}};

  /* ---- 4 · Röd jätte: solen sväller förbi Merkurius och Venus ---- */
  const s4=(t)=>{const{s,cy,a,port}=S(),x=E.x,cx=a.x+a.w*(port?.5:.27),k=s*(port?.36:.42),f=eo((t-2)/9);
    const P=[["Merkurius",.39,"#b5b5b5"],["Venus",.72,"#e8c27a"],["Jorden",1,"#4aa3ff"]];
    const R=lerp(s*.04,k*.9,f),ys=cy+(port?s*.25:0)*0;
    // banor och planeter
    P.forEach(([n,au,col],i)=>{const r=k*au;ring(cx,cy,r,"rgba(127,214,255,.22)",1,[2,6]);
      const an=t*(.9-i*.25)+i*1.7,px=cx+Math.cos(an)*r,py=cy+Math.sin(an)*r*(.99),eaten=R>r;
      if(!eaten){disc(px,py,i===2?5:3.4,col);tx(n,px+8,py-8,"rgba(255,255,255,.75)","left",12);}
      else if(R-r<k*.18){glow(px,py,10,"255,120,60",.8*(1-(R-r)/(k*.18)));}});
    // jordens bana syns också när den blir het
    const hot=cl((f-.7)/.3,0,1);
    const col0=[255,Math.round(220-120*f),Math.round(120-90*f)];
    x.save();x.globalCompositeOperation="lighter";const g=x.createRadialGradient(cx,cy,R*.5,cx,cy,R*1.9);g.addColorStop(0,`rgba(${col0},.5)`);g.addColorStop(1,"rgba(255,70,20,0)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,R*1.9,0,TAU);x.fill();x.restore();
    const g2=x.createRadialGradient(cx,cy,0,cx,cy,R);g2.addColorStop(0,`rgba(255,${Math.round(235-110*f)},${Math.round(190-150*f)},1)`);g2.addColorStop(1,`rgba(${Math.round(255-35*f)},${Math.round(150-90*f)},${Math.round(60-30*f)},1)`);x.fillStyle=g2;x.beginPath();x.arc(cx,cy,R,0,TAU);x.fill();
    tx(f<.3?"Solen idag":"Röd jätte",cx,cy-R-14,f<.3?"#ffe9a8":"#ff9a70","center",14,700);
    // förklaring till höger
    const px=port?a.x+a.w*.5:a.x+a.w*.62,py=a.y+(port?a.h*.93:a.h*.3);
    if(t>2&&!port){x.save();x.globalAlpha=eo((t-2)/3);tg("Solens storlek",px,py-20,"#7fd6ff","left");
      tx("Idag: 1 sol",px,py+8,"#fff","left",Math.max(18,s*.045),700);tx("Röd jätte: över 100 gånger större",px,py+8+Math.max(26,s*.07),"#ff9a70","left",Math.max(16,s*.04),700);x.restore();}};

  /* ---- 5 · Vit dvärg: planetarisk nebulosa, sedan jämförelse med jorden ---- */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),x=E.x,f=eo(t/7),r=srand(13);
    const R=s*.48*f;
    // skal i flera färger runt stjärnan, med klumpar
    x.save();x.globalCompositeOperation="lighter";
    const shells=[[.95,"90,230,255",.5],[.72,"140,255,170",.4],[.5,"255,120,200",.5]];
    shells.forEach(([q,c,al],j)=>{const rr=R*q,fade=1-eo((t-8)/5)*.85;
      x.strokeStyle=`rgba(${c},${al*.5*fade})`;x.lineWidth=Math.max(3,s*.05)*(1-j*.2);x.beginPath();x.ellipse(cx,cy,rr,rr*.88,.35,0,TAU);x.stroke();
      for(let i=0;i<50;i++){const an=r()*TAU,rd=rr*(1+(r()-.5)*.1),px=cx+Math.cos(an)*rd,py=cy+Math.sin(an)*rd*.88;
        const gg=x.createRadialGradient(px,py,0,px,py,s*.03);gg.addColorStop(0,`rgba(${c},${.28*fade})`);gg.addColorStop(1,`rgba(${c},0)`);x.fillStyle=gg;x.beginPath();x.arc(px,py,s*.03,0,TAU);x.fill();}});
    x.restore();
    // den lilla heta kärnan
    glow(cx,cy,s*.09,"200,225,255",.7);disc(cx,cy,Math.max(2.5,s*.012),"#fff");
    if(t<8)tg("Planetarisk nebulosa",cx,cy+R*.95+22,"#7fd6ff","center");
    // jämförelse: vit dvärg och jorden i rätt storlek
    if(t>6.4){const u=eo((t-6.4)/3),ex=cx+(port?-s*.2:-s*.22),wx=cx+(port?s*.2:s*.22),yy=cy+(port?s*.3:s*.28),Re=s*.07;
      x.save();x.globalAlpha=u;
      const em=img(EARTH);x.save();x.beginPath();x.arc(ex,yy,Re,0,TAU);x.clip();if(ok(em))x.drawImage(em,ex-Re*2.2+(t*3%(Re*2)),yy-Re,Re*4.4,Re*2);else disc(ex,yy,Re,"#2f7fd0");
      const sh=x.createRadialGradient(ex-Re*.4,yy-Re*.4,Re*.2,ex,yy,Re*1.1);sh.addColorStop(0,"rgba(0,0,0,0)");sh.addColorStop(1,"rgba(0,0,10,.6)");x.fillStyle=sh;x.fillRect(ex-Re,yy-Re,Re*2,Re*2);x.restore();
      star(wx,yy,Re*.97,"255,255,255","190,215,255");
      tx("Jorden",ex,yy+Re+22,"#fff","center",14,700);tx("Vit dvärg",wx,yy+Re+22,"#cfe4ff","center",14,700);
      tx("lika stora",cx,yy-Re-14,"#ffd86b","center",13,700);x.restore();}};

  /* ---- 6 · Jättestjärnor: solen, blå jätte, röd superjätte ---- */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),x=E.x;
    const items=[
      {n:"Solen",R:s*.05,c1:"255,252,230",c2:"255,200,90",life:"10 miljarder år",lc:"#ffe9a8"},
      {n:"Blå jätte",R:s*.14,c1:"235,245,255",c2:"120,170,255",life:"några miljoner år",lc:"#9fc4ff"},
      {n:"Röd superjätte",R:s*.34,c1:"255,200,150",c2:"230,70,40",life:"några miljoner år",lc:"#ff9a70"}];
    const xs=port?[cx-a.w*.28,cx+a.w*.18,cx]:[a.x+a.w*.14,a.x+a.w*.4,a.x+a.w*.72],ys=port?[a.y+a.h*.2,a.y+a.h*.3,a.y+a.h*.66]:[cy,cy,cy];
    const sc=port?[.55,.55,.5]:[1,1,1];
    items.forEach((it,i)=>{const st=[0.5,3.5,8.6][i],f=eo((t-st)/2.5);if(f<=0)return;const R=it.R*sc[i]*f,px=xs[i],py=ys[i];
      x.save();x.globalAlpha=Math.min(1,f*1.4);
      if(i===2){const g=x.createRadialGradient(px,py,0,px,py,R);g.addColorStop(0,`rgba(${it.c1},1)`);g.addColorStop(1,`rgba(${it.c2},1)`);glow(px,py,R*1.7,"255,90,50",.4);x.fillStyle=g;x.beginPath();x.arc(px,py,R,0,TAU);x.fill();
        for(let q=0;q<26;q++){const rr=srand(q+3),an=rr()*TAU,d=rr()*R*.9,sx=px+Math.cos(an)*d,sy=py+Math.sin(an)*d;x.fillStyle="rgba(255,255,200,.07)";x.beginPath();x.arc(sx,sy,R*.1*(.6+rr()),0,TAU);x.fill();}}
      else star(px,py,R,it.c1,it.c2);
      x.restore();
      if(t>st+1.5){x.save();x.globalAlpha=eo((t-st-1.5)/2);
        const up=i===2&&!port,ly=up?py-R-16:py+R+26;tx(it.n,px,ly,"#fff","center",15,700);
        tx("Liv: "+it.life,px,ly+(up?-20:20),it.lc,"center",12,700);x.restore();}});
    if(t>8.6){x.save();x.globalAlpha=eo((t-8.6)/3);tg("Tyngre stjärna = kortare liv",cx,a.y+a.h*(port?.1:.1),"#ffd86b","center");x.restore();}
    if(t>12)tg("Betelgeuse",xs[2],ys[2]+items[2].R*sc[2]*.2,"rgba(255,255,255,.6)","center");};

  /* ---- 7 · Supernova (ur Rymdlabbets film, anpassad till motorn) ---- */
  let tmp=null;
  const s7=(t)=>{const W=E.W,H=E.H,a=A(),x=E.x,cx=a.x+a.w/2,cy=a.y+a.h*.5,hh=a.h*1.15,uu=Math.min(Math.max(0,t-6.2),15.99),T=16,u=uu%T;
    const c=x,ease=q=>q<0?0:q>1?1:q*q*(3-2*q),sm=Math.min(a.w,a.h);
    c.save();
    const shk=u>2.45&&u<4.6?Math.exp(-(u-2.45)*1.6)*hh*.018:0;if(shk>.2)c.translate((Math.random()-.5)*shk*2,(Math.random()-.5)*shk*2);
    if(u<2.6){const k=u/2.6,rad=sm*(.3-.24*ease(k)),pul=1+Math.sin(u*(6+k*30))*.04*(1-k*.5);
      const g=c.createRadialGradient(cx,cy,0,cx,cy,rad*pul*1.9);g.addColorStop(0,`rgba(255,${180+75*k|0},${120+135*k|0},1)`);g.addColorStop(.35,`rgba(255,${90+60*k|0},${50+120*k|0},.9)`);g.addColorStop(1,"rgba(255,60,20,0)");
      c.globalCompositeOperation="lighter";c.fillStyle=g;c.beginPath();c.arc(cx,cy,rad*pul*1.9,0,TAU);c.fill();
      c.fillStyle=`rgba(255,${230+25*k|0},${200+55*k|0},${.55+.4*k})`;c.beginPath();c.arc(cx,cy,rad*pul*.62,0,TAU);c.fill();}
    const tau=Math.max(0,u-2.45),R0=sm*.76,sp=Math.min(1,tau/13);
    if(tau>0){const r=srand(21);c.globalCompositeOperation="lighter";
      for(let i=0;i<1300;i++){const an=r()*TAU,sv=Math.pow(r(),.5),tur=(r()-.5)*.35,rad=R0*sv*Math.pow(sp,.62)*(1+tur*.25)*(1+.18*Math.sin(an*5+i)),px=cx+Math.cos(an)*rad,py=cy+Math.sin(an)*rad;
        const size=sm*(.01+r()*.045)*(.5+sp*1.2),al=(.1+r()*.18)*Math.min(1,tau*2)*(1-.55*sp)*(1-.7*ease((tau-2)/5));
        const hot=1-sv,cr=hot>.7?[160,190,255]:hot>.4?[255,215,150]:sv>.85?[255,70,50]:[255,130,60];
        const g=c.createRadialGradient(px,py,0,px,py,size);g.addColorStop(0,`rgba(${cr[0]},${cr[1]},${cr[2]},${al})`);g.addColorStop(1,`rgba(${cr[0]},${cr[1]},${cr[2]},0)`);c.fillStyle=g;c.beginPath();c.arc(px,py,size,0,TAU);c.fill();}
      c.lineWidth=Math.max(1,sm*.006);const r2=srand(5);
      for(let i=0;i<80;i++){const a0=r2()*7,len=.25+r2()*.9,rad=R0*(.45+r2()*.5)*Math.pow(sp,.62),col=r2()<.5?"120,230,255":r2()<.5?"255,120,190":"255,170,90";
        c.strokeStyle=`rgba(${col},${.2*Math.min(1,tau)*(1-.5*sp)})`;c.beginPath();for(let k=0;k<=24;k++){const an=a0+len*k/24,rr=rad*(1+.05*Math.sin(k*.45+i*1.3)+.03*Math.sin(k*.17+i));const px=cx+Math.cos(an)*rr,py=cy+Math.sin(an)*rr;k?c.lineTo(px,py):c.moveTo(px,py);}c.stroke();}
      const sr=R0*1.02*Math.pow(sp,.62);c.shadowColor="rgba(180,210,255,.9)";c.shadowBlur=sm*.03;c.strokeStyle=`rgba(190,215,255,${.32*(1-sp)})`;c.lineWidth=sm*.005;c.beginPath();c.arc(cx,cy,sr,0,TAU);c.stroke();c.shadowBlur=0;}
    const snI=img(CASA);
    if(tau>1&&ok(snI)){const pa=ease((tau-1.2)/4.5),rv=ease((tau-1)/9);
      if(!tmp)tmp=document.createElement("canvas");if(tmp.width!==W||tmp.height!==H){tmp.width=W;tmp.height=H;}
      const t2=tmp.getContext("2d");t2.globalCompositeOperation="source-over";t2.clearRect(0,0,W,H);
      const ih=sm*(.85+.35*ease(tau/14)),iw=ih*snI.naturalWidth/snI.naturalHeight;t2.drawImage(snI,cx-iw/2,cy-ih/2,iw,ih);
      const rr=sm*(.08+.7*rv),m=t2.createRadialGradient(cx,cy,rr*.35,cx,cy,rr);m.addColorStop(0,"rgba(0,0,0,1)");m.addColorStop(1,"rgba(0,0,0,0)");
      t2.globalCompositeOperation="destination-in";t2.fillStyle=m;t2.fillRect(0,0,W,H);
      c.globalCompositeOperation="lighter";c.globalAlpha=pa*.95;c.drawImage(tmp,0,0);c.globalAlpha=1;
      if(tau>7){c.globalCompositeOperation="source-over";cred("Så ser en riktig supernovarest ut: Cassiopeia A · NASA, CXC, STScI",Math.min(.6,(tau-7)*.3));}}
    const fl=u>2.4?Math.exp(-(u-2.4)*1.1)*Math.min(1,(u-2.4)*8):0;
    if(tau>0){c.globalCompositeOperation="lighter";for(let k=0;k<3;k++){const q=tau-k*.55;if(q<=0)continue;const rr=R0*1.3*Math.pow(Math.min(1,q/6),.7),al=Math.max(0,.5*(1-q/6));if(al<=0)continue;c.strokeStyle=`rgba(${k?"255,190,140":"170,210,255"},${al})`;c.lineWidth=sm*(.01-k*.003);c.shadowColor="rgba(170,210,255,.9)";c.shadowBlur=sm*.04;c.beginPath();c.arc(cx,cy,rr,0,TAU);c.stroke();}c.shadowBlur=0;
      if(fl>.01){c.globalCompositeOperation="lighter";const g=c.createRadialGradient(cx,cy,0,cx,cy,sm*(.5+1.1*fl));g.addColorStop(0,`rgba(255,255,255,${Math.min(1,fl*1.1)})`);g.addColorStop(.25,`rgba(190,215,255,${fl*.7})`);g.addColorStop(1,"rgba(80,120,255,0)");c.fillStyle=g;c.fillRect(0,0,W,H);}}
    if(tau>1.5){const k=Math.min(1,(tau-1.5)/2),p=1+.25*Math.sin(u*14);c.globalCompositeOperation="lighter";const g=c.createRadialGradient(cx,cy,0,cx,cy,sm*.06*p);g.addColorStop(0,`rgba(220,235,255,${k})`);g.addColorStop(1,"rgba(110,160,255,0)");c.fillStyle=g;c.beginPath();c.arc(cx,cy,sm*.06*p,0,TAU);c.fill();}
    c.restore();
    if(t>15){x.save();x.globalAlpha=eo((t-15)/2.5);tg("Järn · kalcium · syre",cx,a.y+a.h*.93,"#ffd86b","center");x.restore();}};

  /* ---- 8 · Neutronstjärna med strålar, sedan ett svart hål ---- */
  const s8=(t)=>{const{s,cx,cy,a,port}=S(),x=E.x,f=eo(t/3);
    const ns=cl(1-eo((t-6.3)/2.5),0,1),bh=eo((t-6.9)/4);
    if(ns>0){x.save();x.globalAlpha=ns;
      const R=s*.035,rot=t*5;
      x.save();x.globalCompositeOperation="lighter";
      for(let b=0;b<2;b++){const an=rot+b*Math.PI,L=s*.55,g=x.createLinearGradient(cx,cy,cx+Math.cos(an)*L,cy+Math.sin(an)*L);g.addColorStop(0,"rgba(160,200,255,.7)");g.addColorStop(1,"rgba(120,160,255,0)");
        x.fillStyle=g;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(an-.06)*L,cy+Math.sin(an-.06)*L);x.lineTo(cx+Math.cos(an+.06)*L,cy+Math.sin(an+.06)*L);x.closePath();x.fill();}
      x.restore();
      glow(cx,cy,R*5,"150,190,255",.6*f);disc(cx,cy,R*f,"#eaf3ff");
      // jämförelse: stad
      if(t>2){const u=eo((t-2)/2.5);x.globalAlpha=ns*u;
        tx("Bara ca 20 km bred, lika stor som en stad",cx,cy+s*.2,"#7fd6ff","center",14,700);
        // tesked
        const tx0=cx+(port?0:s*.7)*0;
      }
      x.restore();
      if(t>3){x.save();x.globalAlpha=ns*eo((t-3)/2);
        const bx=a.x+a.w*(port?.5:.2),by=a.y+a.h*(port?.12:.5);
        x.fillStyle="rgba(255,255,255,.07)";x.strokeStyle="rgba(127,214,255,.5)";x.lineWidth=1;
        const bw=Math.max(150,s*.4),bhh=Math.max(60,s*.15);x.fillRect(bx-bw/2,by-bhh/2,bw,bhh);x.strokeRect(bx-bw/2,by-bhh/2,bw,bhh);
        tx("1 tesked",bx,by-6,"#fff","center",Math.max(16,s*.04),700);tx("≈ 2 miljarder ton",bx,by+Math.max(18,s*.05),"#ffd86b","center",Math.max(14,s*.035),700);x.restore();}}
    if(bh>0){const R=s*.11*bh;hole(cx,cy,R,t,bh);
      if(t>10.5){x.save();x.globalAlpha=eo((t-10.5)/2);tg("Svart hål",cx,cy+R*2.6,"#ffb070","center");x.restore();}}};

  return[s0,s1,s2,s3,s4,s5,s6,s7,s8];
}
})();
