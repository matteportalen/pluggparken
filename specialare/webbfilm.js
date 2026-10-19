/* James Webb-teleskopet: minilektionen som film (nio scener, ca 2 minuter): NASA-foton med motion graphics (kamerarörelser, lysande linjer, guldspegeln som byggs, riktiga jordklot).
   Använder filmmotorn i ../svarthal.js, filmlib.js och filmfx.js. Röst: ../ljud/webb/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/webb-1..6.jpg. MPWebbFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.9,cap:[[0.5,"Ett gyllene öga i rymden. Det här är berättelsen om James Webb-teleskopet."]]},
 {k:"01 · Uppskjutningen",d:15.5,cap:[[0.8,"Teleskopet sköts upp på juldagen år 2021. Det är det största och mest kraftfulla rymdteleskop som någonsin byggts."],[9.2,"Resan till sin plats tog ungefär en månad, och under resan veckades teleskopet ut."]]},
 {k:"02 · Långt bortom månen",d:14.5,cap:[[0.8,"Det befinner sig 1,5 miljoner kilometer från jorden. Det är fyra gånger längre bort än månen."],[7.6,"Där följer det jorden runt solen, med solen, jorden och månen alltid bakom sig."]]},
 {k:"03 · Guldspegeln",d:18.8,cap:[[0.8,"Spegeln är 6,5 meter bred. Den består av 18 sexkantiga bitar av guldbelagd metall."],[8.5,"Den fälldes ihop som origami för att få plats i raketen."],[12.3,"Guld reflekterar infrarött ljus mycket bra. Guldlagret är tunnare än ett hårstrå."]]},
 {k:"04 · Iskallt",d:18.9,cap:[[0.8,"Teleskopet ser värme, så kallat infrarött ljus. Därför måste det vara iskallt, runt minus 230 grader."],[9,"Ett solskydd, stort som en tennisplan, skyddar det."],[13.5,"Skyddet har fem lager, och varje lager är ungefär lika tunt som ett hårstrå."]]},
 {k:"05 · Webb och Hubble",d:15.6,cap:[[0.8,"Det äldre teleskopet Hubble ser mest vanligt ljus. Webb ser infrarött, och kan därför titta rakt igenom stora dammoln."],[9.6,"Hubbles spegel är drygt två meter bred. Webbs spegel är nästan tre gånger så bred."]]},
 {k:"06 · Tillbaka i tiden",d:11.1,cap:[[0.8,"Ljuset behöver tid på sig, så teleskopet ser tillbaka i tiden. Det kan se galaxer som lyste för över 13 miljarder år sedan."]]},
 {k:"07 · Andra världar",d:12.6,cap:[[0.8,"Webb kan också undersöka luften på planeter som kretsar kring andra stjärnor."],[5.3,"Där har teleskopet redan hittat koldioxid. Forskare letar efter vilka gaser som finns i andra världar."]]},
 {k:"08 · Första bilderna",d:8.9,cap:[[0.8,"I juli 2022 kom de första bilderna. De visade tusentals galaxer i en liten fläck av himlen."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"James Webb-teleskopet",under:"En film i nio steg · ca 2 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Webb hjälper oss att se hur universum började. Filmen bygger på bilder från NASA, ESA och CSA ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Bill Ingalls/NASA (Ariane 5 med Webb) · Public domain · Wikimedia Commons",2:"Foto: NASA/MSFC/David Higginbotham/Emmett Given (spegelbitar) · Public domain · Wikimedia Commons",3:"Foto: Chris Gunn/NASA (speglarna) · CC BY 2.0 · Wikimedia Commons",4:"Foto: NASA Goddard (solskyddet) · Public domain · Wikimedia Commons",5:"Bild: NASA, ESA, CSA och STScI (Webbs första djupa fält) · Public domain · Wikimedia Commons",6:"Bild: NASA, ESA, CSA och STScI (Kosmiska klipporna i Carinanebulosan) · Public domain · Wikimedia Commons",7:"Jord och måne: Solar System Scope · CC BY 4.0"};

window.MPWebbFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"webb",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"webb-",names:[1,2,3,4,5,6],KR});
  const F=MPFilmFX.make(E,L);
  const {x,tx,S,cred}=L,{sm,serif,kb,vign,dim,glow,clip,snow,stars,trace,curve,chip,bigNum,fmt,spike,goldHex,hexPath,sphere,ring,ping,beam,rgba}=F;
  const GOLD="#ffd86b";
  // speglarnas 18 bitar: 6 i inre ringen och 12 i yttre ringen (mitten saknas)
  const mpos=r=>{const p=[],h=r*Math.sqrt(3);for(let i=0;i<6;i++){const an=TAU/6*i;p.push([Math.cos(an)*h,Math.sin(an)*h]);}for(let i=0;i<12;i++){const an=TAU/12*i,d=i%2?h*1.732:h*2;p.push([Math.cos(an)*d,Math.sin(an)*d]);}return p;};

  /* 0 · Inledning: guldspegeln i Webbs renrum, kameran glider uppför spegeln, glimtar, titel */
  const s0=(t)=>{const{a,s}=S(),c=x(),p=cl(t/7.9,0,1);kb(3,a,{z:lerp(1,1.12,sm(p)),fx:.5,fy:lerp(.74,.4,sm(p))},eo(t/1.4));
    // glimtar på spegelbitarna (bildens punkter)
    vign(a,.78);const pts=[[235,420],[225,560],[330,330],[440,370],[530,330],[640,350],[655,500],[440,660],[540,670],[310,520]];
    pts.forEach(([u,v],i)=>{const ph=((t*.42+i*.137)%1),al=Math.sin(Math.PI*ph);if(al<.05)return;const px=a.x+a.w*(.3+.4*((u-140)/640)),py=a.y+a.h*(.15+.7*((v-160)/700));spike(px,py,s*.075*al,al*.9,"rgba(255,235,170,.95)");});
    F.titleSweep(t,a,"JAMES WEBB","ETT GYLLENE ÖGA I RYMDEN",GOLD,a.y+a.h*.82);cred(3,.5*eo(t/2));};

  /* 1 · Uppskjutningen: raketen på startplattan, nedräkning och eldsken, sedan resan till L2 med dagräknare */
  const s1=(t)=>{const{a,s,cx,cy,port}=S(),c=x();
    if(t<9.6){const k=cl((t-5.4)/4.2,0,1),T=kb(1,a,{z:lerp(1.05,1.25,sm(k)),fx:.45,fy:lerp(.88,.2,sm(k))},eo(t/1));vign(a,.7);
      // nedräkning, sedan tändning vid raketens fot
      const n=Math.ceil(4-t*1.1);if(t<3.6&&n>0){const ph=(t*1.1)%1;bigNum(String(n),cx,cy-s*.05,Math.min(a.w*.2,s*.34),"#9fd0ff",.9*(1-ph*.6)*eo(t/.4));}
      if(T&&t>3.6){const q=sm((t-3.6)/2.2),bx=T.X(395),by=T.Y(980),fl=.85+.15*Math.sin(t*40);glow(bx,by,s*(.2+.5*q)*fl,"rgba(255,170,70,.55)");glow(bx,by,s*(.1+.22*q)*fl,"rgba(255,240,200,.9)");
        clip(a);const R=F.srand(3);for(let i=0;i<44;i++){const f=((t*.8+R())%1)*q,sx=bx+(R()-.5)*s*.5*(.3+f),sy=by+f*s*.6;glow(sx,sy,s*(.02+R()*.03)*(1-f*.5),`rgba(255,${160+R()*70|0},80,${.5*(1-f)})`);}c.restore();}
      if(t>6.4){const q=eo((t-6.4)/.9);bigNum("25 december 2021",cx,a.y+a.h*.16,Math.min(a.w*.08,s*.12),GOLD,q);tx("UPPSKJUTNING FRÅN FRANSKA GUYANA",cx,a.y+a.h*.16+Math.max(26,s*.06),`rgba(159,208,255,${q})`,"center",Math.max(11,s*.026),700);}
      cred(1,.45);}
    else{const q=cl((t-9.6)/5.9,0,1),g=eo((t-9.6)/.8);c.save();c.globalAlpha=g;stars(a,1,t,120);
      const lx=a.x+a.w*.14,rx=a.x+a.w*.86,y=cy+s*.04,r=Math.max(18,s*.06);sphere("jorden",lx,y,r,t*14,true);tx("JORDEN",lx,y+r+Math.max(22,s*.05),"rgba(159,208,255,.9)","center",Math.max(10,s*.024),700);
      // banan: en lång, mjuk båge ut till L2
      const path=curve([[lx+r*.8,y],[lerp(lx,rx,.3),y-s*.1],[lerp(lx,rx,.65),y-s*.04],[rx,y]],10);trace(path,q,GOLD,3,false);
      const mp=path[Math.min(path.length-1,Math.floor(q*(path.length-1)))];goldHexSmall(mp[0],mp[1],Math.max(7,s*.022),t,q);
      ping(rx,y,t-12,s,GOLD,q>.9?1:0);tx("L2 · 1,5 miljoner km",rx,y+Math.max(34,s*.075),"rgba(255,216,107,.95)","center",Math.max(11,s*.026),700);
      const day=Math.round(29*sm(q));bigNum("dag "+day,cx,a.y+a.h*.18,Math.min(a.w*.12,s*.19),GOLD,1);
      const ev=[[.02,"solpanelen öppnas"],[.12,"solskyddet fälls ut"],[.42,"spegeln veckas ut"],[.97,"framme!"]];let cur=null;ev.forEach(e=>{if(sm(q)>=e[0])cur=e;});if(cur){chip(cur[1],cx,a.y+a.h*.18+Math.max(34,s*.075),"rgba(255,216,107,.8)",Math.max(12,s*.032),1);}
      c.restore();cred(7,.35*g);}};
  const goldHexSmall=(px,py,r,t,q)=>{const c=x();glow(px,py,r*4,"rgba(255,210,110,.5)");c.save();goldHex(px,py,r,t*.7,1);c.restore();};

  /* 2 · Långt bortom månen: riktiga klot, skalan 4 månavstånd och Webb som följer jorden runt solen */
  const s2=(t)=>{const{a,s,cx,cy,port}=S(),c=x(),g=eo(t/.8);stars(a,1,t,130);
    if(t<7.6){const lx=a.x+a.w*.1,rx=a.x+a.w*.9,w=rx-lx,y=cy+s*.02,px=km=>lx+km/1500000*w,r=Math.max(14,s*.05);
      c.save();c.globalAlpha=g;sphere("jorden",lx,y,r,t*16,true);
      // linjalen: fyra gånger avståndet till månen
      c.strokeStyle="rgba(255,255,255,.3)";c.lineWidth=2;const ly=y+r+Math.max(30,s*.07);c.beginPath();c.moveTo(lx,ly);c.lineTo(rx,ly);c.stroke();
      for(let i=0;i<=4;i++){const k=sm((t-1.8-i*.5)/.5);if(k<=0)continue;const X=px(i*384400);c.strokeStyle=`rgba(255,216,107,${k})`;c.lineWidth=2;c.beginPath();c.moveTo(X,ly-8);c.lineTo(X,ly+8);c.stroke();if(i>0)tx(i+"×",X,ly+Math.max(26,s*.06),`rgba(255,216,107,${k})`,"center",Math.max(12,s*.03),700);}
      const mk=sm((t-1)/1);sphere("manen",px(384400),y,Math.max(7,r*.27)*mk+.01,t*3,true);tx("MÅNEN",px(384400),y-Math.max(26,s*.06),`rgba(207,213,223,${mk})`,"center",Math.max(10,s*.024),700);
      const wq=sm((t-3.3)/3.2),wx=lerp(lx+r,px(1500000),wq);trace([[lx+r*1.1,y],[wx,y]],1,GOLD,2.5,false);goldHexSmall(wx,y,Math.max(7,s*.02),t,wq);if(wq>.05)tx("WEBB",wx,y-Math.max(24,s*.05),GOLD,"center",Math.max(11,s*.026),700);
      bigNum(fmt(1500000*wq)+" km",cx,a.y+a.h*.2,Math.min(a.w*.11,s*.17),GOLD,eo((t-3)/.5));
      c.restore();}
    else{const q=sm((t-7.6)/1.2),sx=a.x+a.w*.2,y=cy+s*.02;c.save();c.globalAlpha=q;
      glow(sx,y,s*.55,"rgba(255,170,60,.3)");glow(sx,y,s*.2,"rgba(255,230,150,.8)");c.fillStyle="#fff3c0";c.beginPath();c.arc(sx,y,s*.04,0,TAU);c.fill();tx("SOLEN",sx,y+s*.1,"rgba(255,216,107,.9)","center",Math.max(10,s*.024),700);
      const orb=Math.min(a.w*.5,s*.8),ang=(t-7.6)*.35,ex=sx+Math.cos(ang)*orb*.9,ey=y+Math.sin(ang)*orb*.28;
      c.strokeStyle="rgba(255,255,255,.18)";c.setLineDash([6,8]);c.beginPath();c.ellipse(sx,y,orb*.9,orb*.28,0,0,TAU);c.stroke();c.setLineDash([]);
      sphere("jorden",ex,ey,Math.max(10,s*.035),t*30,true);
      // Webb längre bort från solen än jorden, hela tiden bakom jorden
      const dx=ex-sx,dy=ey-y,dl=Math.hypot(dx,dy),wx=ex+dx/dl*Math.max(34,s*.1),wy=ey+dy/dl*Math.max(34,s*.1);goldHexSmall(wx,wy,Math.max(7,s*.018),t,0);
      c.strokeStyle="rgba(255,230,140,.3)";c.lineWidth=2;c.beginPath();c.moveTo(sx,y);c.lineTo(wx,wy);c.stroke();
      tx("WEBB",wx+(dx>0?18:-18),wy-14,GOLD,dx>0?"left":"right",Math.max(11,s*.026),700);
      chip("solen, jorden och månen alltid bakom",cx,a.y+a.h*.88,"rgba(207,216,255,.7)",Math.max(12,s*.03),eo((t-9)/.8));c.restore();}};

  /* 3 · Guldspegeln: 18 bitar flyger in, mått, ihopvikning som origami, guldlagret mot ett hårstrå */
  const s3=(t)=>{const{a,s,cx,cy,port}=S(),c=x();
    if(t<2.6){const p=cl(t/2.6,0,1);kb(3,a,{z:lerp(1.05,1.25,p),fx:.5,fy:lerp(.6,.38,p)},1);vign(a,.7);}
    else if(t<12.3){const g=sm((t-2)/1.2);kb(3,a,{z:1.2,fx:.5,fy:.4},1-g);stars(a,g,t,100);const r=Math.max(13,Math.min(a.w*(port?.12:.07),a.h*.09)),my=cy-s*.02,pos=mpos(r);
      const fold=sm((t-8.6)/2.4);pos.forEach(([dx,dy],i)=>{const k=sm((t-2.8-i*.17)/.9);if(k<=0)return;const wing=i>=6&&Math.abs(dx)>r*2.2,fx=wing?(dx>0?-1:1)*Math.abs(dx)*.55*fold:0,ang=TAU*(1-k)*(i%2?1:-1)*.5,sx0=cx+Math.cos(i*.9)*s*.9*(1-k),sy0=my+Math.sin(i*1.7)*s*.7*(1-k);
        c.save();c.translate(lerp(sx0,cx+dx+fx,k),lerp(sy0,my+dy,k));c.rotate(ang);c.globalAlpha=k;goldHex(0,0,r*(wing?1-fold*.1:1),(t*.35+i*.07),1);c.restore();});
      glow(cx,my,s*.45,"rgba(255,200,90,.14)");
      if(t>7&&t<8.8){const q=sm((t-7)/1);c.save();c.strokeStyle=`rgba(159,208,255,${q})`;c.lineWidth=2;const w=r*Math.sqrt(3)*4,y2=my+r*Math.sqrt(3)*2.5;c.beginPath();c.moveTo(cx-w/2*q,y2);c.lineTo(cx+w/2*q,y2);c.moveTo(cx-w/2,y2-8);c.lineTo(cx-w/2,y2+8);c.moveTo(cx+w/2,y2-8);c.lineTo(cx+w/2,y2+8);c.stroke();c.restore();bigNum("6,5 m",cx,y2+Math.max(40,s*.09),Math.max(26,s*.08),"#9fd0ff",q);}
      const cn=Math.min(18,Math.floor(Math.max(0,t-2.8)/.17));if(t<7)chip(cn+" av 18 bitar",cx,a.y+a.h*.1,"rgba(255,216,107,.8)",Math.max(13,s*.034),eo((t-3)/.6));
      if(t>8.6)chip("ihopvikt som origami för raketen",cx,a.y+a.h*.1,"rgba(255,216,107,.8)",Math.max(13,s*.034),eo((t-8.6)/.7));}
    else{const q=sm((t-12.3)/1.2);stars(a,1,t,80);dim(a,0);c.save();c.globalAlpha=q;const w=Math.min(a.w*.78,s*1.4),lx=cx-w/2,y=cy-s*.06;
      // förstoringsglas: hårstrået (bred bit) och guldlagret (smal tråd), proportionen 1 000 : 1
      const hh=Math.max(46,s*.14),hg=c.createLinearGradient(0,y-hh/2,0,y+hh/2);hg.addColorStop(0,"#8a6a48");hg.addColorStop(.5,"#d9c09a");hg.addColorStop(1,"#6a4e30");c.fillStyle=hg;c.fillRect(lx,y-hh/2,w,hh);tx("ETT HÅRSTRÅ · ca 0,07 mm",cx,y-hh/2-Math.max(14,s*.03),"rgba(217,192,154,.95)","center",Math.max(11,s*.026),700);
      const gk=sm((t-14.2)/1);const gy=y+hh/2+Math.max(46,s*.12);c.globalAlpha=q*gk;c.shadowColor="#ffd86b";c.shadowBlur=16;c.fillStyle="#ffd86b";c.fillRect(lx,gy,w,Math.max(1.5,hh/1000*8));c.shadowBlur=0;tx("GULDLAGRET · ca 1 000 gånger tunnare",cx,gy+Math.max(30,s*.07),"rgba(255,216,107,.95)","center",Math.max(11,s*.026),700);
      c.restore();}
    cred(t<2.6?3:7,.35);};

  /* 4 · Iskallt: kylans termometer, solskyddets storlek mot en tennisplan, fem lager som glider isär */
  const s4=(t)=>{const{a,s,cx,cy,port}=S(),c=x();
    if(t<9){const p=cl(t/9,0,1);kb(4,a,{z:lerp(1.02,1.28,sm(p)),fx:lerp(.35,.62,sm(p)),fy:.5},1);c.save();c.globalCompositeOperation="soft-light";c.fillStyle="rgba(60,120,220,.5)";c.fillRect(a.x,a.y,a.w,a.h);c.restore();vign(a,.8);
      // termometer
      const th=a.h*.58,tx0=a.x+a.w*(port?.12:.14),top=a.y+a.h*.14,k=sm((t-1)/4),val=Math.round(lerp(20,-230,k));
      c.save();c.fillStyle="rgba(8,14,32,.7)";c.strokeStyle="rgba(159,208,255,.7)";c.lineWidth=2;c.beginPath();c.roundRect?c.roundRect(tx0-18,top-10,36,th+54,18):c.rect(tx0-18,top-10,36,th+54);c.fill();c.stroke();
      const lg=c.createLinearGradient(0,top,0,top+th);lg.addColorStop(0,"#ff7a5a");lg.addColorStop(1,"#4aa8ff");c.fillStyle=lg;const lvl=th*(.08+.9*(1-k));c.fillRect(tx0-7,top+th-lvl,14,lvl);c.beginPath();c.arc(tx0,top+th+16,19,0,TAU);c.fillStyle=k>.5?"#4aa8ff":"#ff9a6a";c.fill();c.restore();glow(tx0,top+th+16,s*.12,"rgba(80,170,255,.35)");
      bigNum(val+" °C",tx0+(port?28:46),top+th*.5,Math.min(a.w*.1,s*.15),"#7fd6ff",eo(t/.6),"left");
      tx("TELESKOPET SER VÄRME (INFRARÖTT)",tx0+(port?28:46),top+th*.5+Math.max(26,s*.06),"rgba(191,232,255,.85)","left",Math.max(10,s*.022),700);
      snow(a,t,60,.02,.5);}
    else if(t<13.5){const g=sm((t-9)/.8);stars(a,1,t,80);c.save();c.globalAlpha=g;const w=Math.min(a.w*.8,s*1.5),h=w*.46,lx=cx-w/2,y=cy-h/2;
      c.fillStyle="#1f6b44";c.fillRect(lx,y,w,h);c.strokeStyle="rgba(255,255,255,.9)";c.lineWidth=2;c.strokeRect(lx+w*.04,y+h*.07,w*.92,h*.86);c.beginPath();c.moveTo(cx,y+h*.07);c.lineTo(cx,y+h*.93);c.moveTo(lx+w*.04,y+h*.5);c.lineTo(lx+w*.96,y+h*.5);c.stroke();
      const k=sm((t-10)/1.2);c.save();c.globalAlpha=g*k;const sw=w*.9,sh=h*.7;c.translate(cx,cy);c.rotate(-.12);const sg=c.createLinearGradient(-sw/2,0,sw/2,0);sg.addColorStop(0,"rgba(170,185,215,.92)");sg.addColorStop(.5,"rgba(240,245,255,.95)");sg.addColorStop(1,"rgba(150,165,200,.92)");c.fillStyle=sg;c.shadowColor="rgba(190,210,255,.8)";c.shadowBlur=24;c.beginPath();c.moveTo(-sw/2,0);c.lineTo(-sw*.12,-sh/2);c.lineTo(sw/2,0);c.lineTo(-sw*.12,sh/2);c.closePath();c.fill();c.restore();
      tx("TENNISPLAN",cx,y+h+Math.max(26,s*.06),"rgba(155,227,176,.95)","center",Math.max(11,s*.026),700);tx("SOLSKYDDET · ca 21 × 14 m",cx,y-Math.max(14,s*.03),"rgba(210,225,255,.95)","center",Math.max(11,s*.026),700);c.restore();}
    else{stars(a,1,t,80);const w=Math.min(a.w*.62,s*1.1),lh=Math.max(30,s*.07),by=cy-lh*1.5,k0=13.5;
      // värmen från solen uppifrån stoppas lager för lager
      const hot=sm((t-k0)/1);c.save();for(let i=0;i<4;i++){const hh=((t*.9+i*.25)%1);c.globalAlpha=hot*(1-hh)*.8;glow(cx-w*.3+i*w*.2,by-s*.16+hh*s*.12,s*.04,"rgba(255,170,70,.6)");}c.restore();
      for(let i=0;i<5;i++){const q=sm((t-k0-.2-i*.5)/.8);if(q<=0)continue;const yy=by+i*lh*lerp(.55,1,q)-(1-q)*s*.1,al=q;c.save();c.globalAlpha=al;const lg=c.createLinearGradient(cx-w/2,yy,cx+w/2,yy+lh*.5);lg.addColorStop(0,"#b9c4de");lg.addColorStop(.5,"#f4f7ff");lg.addColorStop(1,"#9aa8c8");c.fillStyle=lg;c.beginPath();c.moveTo(cx-w/2,yy+lh*.3);c.lineTo(cx-w*.1,yy);c.lineTo(cx+w/2,yy+lh*.3);c.lineTo(cx-w*.1,yy+lh*.55);c.closePath();c.fill();c.strokeStyle="rgba(120,140,190,.8)";c.lineWidth=1.5;c.stroke();
        tx(String(i+1),cx+w/2+Math.max(16,s*.04),yy+lh*.34,"#ffd86b","left",Math.max(14,s*.04),700);c.restore();}
      bigNum("5 lager",cx,a.y+a.h*.14,Math.min(a.w*.09,s*.14),GOLD,sm((t-k0-2)/.8));}
    cred(4,.35);};

  /* 5 · Webb och Hubble: dammet som släpper igenom infrarött ljus, sedan spegelstorlekarna */
  const s5=(t)=>{const{a,s,cx,cy,port}=S(),c=x();
    if(t<9.6){const k=sm((t-2)/4.5),T=kb(6,a,{z:lerp(1.02,1.14,sm(t/9.6)),fx:.5,fy:.5},1);if(!T)return;
      // vänster del = "vanligt ljus" (dammet skymmer, förenklad illustration), höger del = infrarött (Webb); skiljelinjen glider
      const sx=a.x+a.w*lerp(.8,.45,k);c.save();c.beginPath();c.rect(a.x,a.y,sx-a.x,a.h);c.clip();c.fillStyle="rgba(4,6,14,.78)";c.fillRect(a.x,a.y,a.w,a.h);c.globalCompositeOperation="saturation";c.fillStyle="rgba(120,120,120,1)";c.fillRect(a.x,a.y,a.w,a.h);c.restore();
      c.save();c.globalCompositeOperation="lighter";const lg=c.createLinearGradient(sx-6,0,sx+6,0);lg.addColorStop(0,"rgba(255,216,107,0)");lg.addColorStop(.5,"rgba(255,226,140,.95)");lg.addColorStop(1,"rgba(255,216,107,0)");c.fillStyle=lg;c.fillRect(sx-6,a.y,12,a.h);c.restore();glow(sx,cy,s*.12,"rgba(255,216,107,.3)");
      vign(a,.7);chip("VANLIGT LJUS · dammet skymmer (förenklad bild)",a.x+a.w*(port?.04:.06),a.y+a.h*.1,"rgba(159,208,255,.8)",Math.max(10,s*.026),eo((t-1)/.6),true);chip("INFRARÖTT · Webb ser igenom",a.x+a.w*(port?.98:.95)-(port?190:240),a.y+a.h*.9,"rgba(255,216,107,.85)",Math.max(11,s*.028),eo((t-5)/.6),true);cred(6,.35);}
    else{const g=sm((t-9.6)/.8);stars(a,1,t,100);c.save();c.globalAlpha=g;const R2=Math.min(a.w*.36,a.h*.38),gx=cx-(port?0:R2*1.2),wx=cx+(port?0:R2*1.2),y1=port?cy-R2*1.15:cy,y2=port?cy+R2*1.15:cy,k=sm((t-10)/1.4);
      const hr=R2*(2.4/6.5);[[gx,y1,hr,"#9fd0ff","HUBBLE · 2,4 m",false],[wx,y2,R2,GOLD,"WEBB · 6,5 m",true]].forEach(([px,py,r,col,n,gold])=>{
        const rr=r*k;glow(px,py,rr*1.5,rgba(col,.2));if(gold){c.save();hexPath(c,px,py,rr*.98,TAU/12);c.restore();const pos=mpos(rr/4.05);pos.forEach(([dx,dy],i)=>goldHex(px+dx,py+dy,rr/4.05*.98,t*.3+i*.06,1));}
        else{const hg=c.createRadialGradient(px-rr*.3,py-rr*.3,rr*.1,px,py,rr);hg.addColorStop(0,"#e8f2ff");hg.addColorStop(1,"#6a86b8");c.fillStyle=hg;c.beginPath();c.arc(px,py,rr,0,TAU);c.fill();c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=2;c.stroke();}
        tx(n,px,py+rr+Math.max(26,s*.06),col,"center",Math.max(12,s*.032),700);});
      if(t>12.6)chip("ungefär 6 gånger mer ljus",cx,a.y+a.h*.1,"rgba(255,216,107,.85)",Math.max(14,s*.038),eo((t-12.6)/.8));c.restore();}};

  /* 6 · Tillbaka i tiden: djupa fältet, ljuset som reser, räknare till 13 miljarder år */
  const s6=(t)=>{const{a,s,cx,cy,port}=S(),c=x(),p=cl(t/11.1,0,1);const T=kb(5,a,{z:lerp(1.04,2.6,sm(p)),fx:lerp(.5,.52,p),fy:lerp(.5,.52,p)},1);dim(a,.12);vign(a,.8);
    if(T){[[540,243],[726,268],[640,520],[375,525],[230,708],[772,355]].forEach(([u,v],i)=>{const q=t-1.6-i*.6;ping(T.X(u),T.Y(v),q,s,"#ffb06b",q>0?1:0);});}
    const k=sm((t-1)/6.5),yrs=13.4*k;bigNum(yrs.toFixed(1).replace(".",",")+" miljarder år",cx,a.y+a.h*.14,Math.min(a.w*.08,s*.12),"#ffd86b",eo(t/.6));
    tx("SÅ LÄNGE HAR LJUSET FÄRDATS",cx,a.y+a.h*.14+Math.max(26,s*.06),"rgba(255,216,107,.85)","center",Math.max(10,s*.024),700);
    // tidslinjen längst ner
    const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=a.y+a.h*.88;c.save();c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=2;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();c.restore();
    tx("BIG BANG",lx,y+Math.max(24,s*.055),"rgba(255,255,255,.7)","left",Math.max(10,s*.024),700);tx("I DAG",lx+w,y+Math.max(24,s*.055),"rgba(255,255,255,.7)","right",Math.max(10,s*.024),700);
    const px=lerp(lx,lx+w,1-k*13.4/13.8);glow(px,y,s*.05,"rgba(255,216,107,.8)");trace([[lx,y],[px,y]],1,"#ffd86b",2,false);};

  /* 7 · Andra världar: planeten som passerar framför sin stjärna, ljuset genom luften och ett spektrum med koldioxid */
  const s7=(t)=>{const{a,s,cx,cy,port}=S(),c=x();stars(a,1,t,110);
    const sx=a.x+a.w*(port?.5:.2),sy=a.y+a.h*(port?.28:.4),sr=Math.max(26,s*.09);glow(sx,sy,sr*3.2,"rgba(255,170,70,.28)");const sg=c.createRadialGradient(sx,sy,0,sx,sy,sr);sg.addColorStop(0,"#fff6d0");sg.addColorStop(.7,"#ffb347");sg.addColorStop(1,"#ff8a2a");c.fillStyle=sg;c.beginPath();c.arc(sx,sy,sr,0,TAU);c.fill();
    const pq=sm((t-1)/3),pr=Math.max(10,s*.034),px=lerp(sx-sr*1.9,sx+sr*1.9,pq),py=sy+Math.sin(pq*Math.PI)*0*sr;c.fillStyle="#102a52";c.beginPath();c.arc(px,py,pr,0,TAU);c.fill();c.save();c.globalCompositeOperation="lighter";c.strokeStyle="rgba(150,210,255,.8)";c.lineWidth=Math.max(2,pr*.4);c.beginPath();c.arc(px,py,pr+2,0,TAU);c.stroke();c.restore();
    tx("EN ANNAN STJÄRNA OCH DESS PLANET",sx,sy-sr*1.9,"rgba(207,216,255,.9)","center",Math.max(10,s*.024),700);
    // ljuskurvan: stjärnans ljus dippar när planeten passerar
    const gw=Math.min(a.w*(port?.8:.36),s*.7),gx=port?cx-gw/2:a.x+a.w*.06,gy=port?a.y+a.h*.58:sy+sr*2.6,gh=Math.max(40,s*.1);c.save();c.strokeStyle="rgba(255,255,255,.2)";c.lineWidth=1;c.beginPath();c.moveTo(gx,gy);c.lineTo(gx+gw,gy);c.stroke();c.restore();
    const lc=[];for(let i=0;i<=40;i++){const q=i/40,d=Math.abs(q-.5);lc.push([gx+gw*q,gy-gh*.5+(d<.2?gh*.18*(1-Math.pow(d/.2,4)):0)*-1+gh*.0]);}trace(lc,pq,"rgba(255,216,107,.95)",2.5,true);
    // spektrum med koldioxid vid 4,3 mikrometer
    if(t>5){const q=sm((t-5)/1),sw=Math.min(a.w*(port?.84:.46),s*.9),spx=port?cx-sw/2:a.x+a.w*.5,spy=port?a.y+a.h*.78:cy-s*.02,sh=Math.max(40,s*.1);c.save();c.globalAlpha=q;
      c.fillStyle="rgba(8,14,32,.72)";c.strokeStyle="rgba(159,208,255,.5)";c.lineWidth=1.5;c.beginPath();c.roundRect?c.roundRect(spx-14,spy-sh-34,sw+28,sh+74,14):c.rect(spx-14,spy-sh-34,sw+28,sh+74);c.fill();c.stroke();
      tx("HUR MYCKET LJUS VI SER",spx,spy-sh-12,"rgba(159,208,255,.9)","left",Math.max(9,s*.02),700);
      const pts=[];for(let i=0;i<=60;i++){const u=i/60,dip=Math.exp(-Math.pow((u-.62)/.035,2))*.75;pts.push([spx+sw*u,spy-sh*(.55+.1*Math.sin(u*9)-dip*.5)]);}
      const kk=sm((t-5.4)/2);trace(pts,kk,"#7fd6ff",2.5,true);c.globalAlpha=q;
      if(t>6.6){const dq=sm((t-6.6)/.8),dx=spx+sw*.62,dy=spy-sh*.28;ring(dx,dy,Math.max(12,s*.035)*(1+.1*Math.sin(t*5)),dq,GOLD,2);chip("koldioxid · 4,3 µm",dx,spy+Math.max(30,s*.062),"rgba(255,216,107,.85)",Math.max(11,s*.028),dq);}
      c.restore();}};

  /* 8 · Första bilderna: djupa fältet, åttauddiga stjärnor, ljuspunkter som tänds en och en */
  const s8=(t)=>{const{a,s,cx,cy,port}=S(),c=x(),p=cl(t/8.9,0,1);const T=kb(5,a,{z:lerp(1.2,1,sm(p)),fx:.5,fy:lerp(.45,.5,p)},eo(t/1.2));vign(a,.7);
    if(T){[[388,350,1],[790,572,.7],[120,832,.8],[860,820,.8],[425,775,.6],[70,55,.6],[165,5,.5]].forEach(([u,v,k],i)=>{const q=sm((t-1-i*.35)/.9);spike(T.X(u),T.Y(v),s*.16*k*q,q*(.8+.2*Math.sin(t*3+i)),"rgba(190,210,255,.95)");});}
    const f=eo((t-1.4)/1.2);bigNum("juli 2022",cx,a.y+a.h*.13,Math.min(a.w*.09,s*.14),GOLD,f);
    if(t>3.2){const q=eo((t-3.2)/1);const n=Math.floor(sm((t-3.2)/3.5)*1000);chip("tusentals galaxer i en liten fläck",cx,a.y+a.h*.92,"rgba(255,255,255,.7)",Math.max(13,s*.034),q);}
    cred(5,.4);};

  return[s0,s1,s2,s3,s4,s5,s6,s7,s8];
}
})();
