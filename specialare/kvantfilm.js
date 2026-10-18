/* Kvantfysik: minilektionen som film (åtta scener, ca 1,5 minuter), bilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/kvant/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/kvant-1..6.jpg. MPKvantFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7,cap:[[0.5,"Det minsta som finns följer märkliga regler. Det här är berättelsen om kvantfysiken."]]},
 {k:"01 · Det minsta",d:14.6,cap:[[0.8,"Kvantfysik är läran om de allra minsta sakerna: atomer, och ännu mindre delar."],[7.1,"Den började år 1900, när Max Planck upptäckte att energi kommer i små paket, som kallas kvanta."]]},
 {k:"02 · Konstigt",d:7.8,cap:[[0.8,"Där fungerar världen på ett annat sätt än i vardagen. Reglerna känns ofta konstiga, även för forskare."]]},
 {k:"03 · Våg och partikel",d:14.6,cap:[[0.8,"Ljus kan vara både en våg och en ström av små partiklar, som kallas fotoner."],[6.6,"Det visar dubbelspaltsförsöket. Skickar man elektroner en och en genom två springor, bildas ändå ett vågmönster."]]},
 {k:"04 · Flera lägen",d:12.5,cap:[[0.8,"Enligt teorin kan en partikel ha flera möjliga lägen samtidigt, tills någon mäter den."],[6.5,"Fysikern Schrödinger hittade på en katt i en låda, för att visa hur konstigt det är."]]},
 {k:"05 · Osäkerhet",d:9.1,cap:[[0.8,"Man kan inte veta exakt både var en partikel är, och hur fort den rör sig. Det är Heisenbergs osäkerhetsprincip."]]},
 {k:"06 · Nytta idag",d:10.5,cap:[[0.8,"Kvantfysiken ligger bakom lasrar, datorer, mobiler och magnetkameror på sjukhus."],[7.0,"Och bakom de kvantdatorer som byggs idag."]]},
 {k:"07 · Aldrig fel",d:7.9,cap:[[0.8,"Kvantfysiken är en av de mest noggrant testade teorierna någonsin, och den har ännu inte visat sig fel."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Kvantfysik",under:"En film i åtta steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Det minsta styr det mesta. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"National Institute of Standards and… · Public domain · Wikimedia Commons",2:"David Revoy · CC BY 4.0 · Wikimedia Commons",3:"File:Double-slit experiment results… · CC BY-SA 3.0 · Wikimedia Commons",4:"Ragsxl · CC BY-SA 4.0 · Wikimedia Commons",5:"CC BY-SA 3.0 de · Wikimedia Commons",6:"Hullian111 · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPKvantFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"kvant",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"kvant-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const glow=(px,py,r,col,al)=>{const c=x();c.save();c.globalCompositeOperation="lighter";c.globalAlpha*=al==null?1:al;const g=c.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};
  /* elektronmoln: punkter dragna ur en sannolikhetsfördelning (1s och 2p), flimrar */
  const cloud=(px,py,R,t,n)=>{const c=x(),r=L.srand(Math.floor(t*6)%40+1);c.save();c.globalCompositeOperation="lighter";glow(px,py,R*1.3,"rgba(80,140,255,.35)");glow(px,py,R*.18,"rgba(255,140,110,.95)");
    for(let i=0;i<n;i++){const u=r(),v=r(),rad=-Math.log(1-u*.98)*R*.28,an=v*TAU,lobes=(i%3===0)?Math.abs(Math.cos(an*1))*1.8:1;c.fillStyle=`rgba(${120+r()*80|0},${180+r()*60|0},255,${.25+r()*.45})`;c.beginPath();c.arc(px+Math.cos(an)*rad*lobes,py+Math.sin(an)*rad*lobes*(i%3===0?1:.9),1.2+r()*1.6,0,TAU);c.fill();}
    c.restore();};
  /* ripplande interferens från två springor: hela fältet som ljus, mörka band där vågorna släcker varandra */
  const ripples=(x0,y0,w,h,sy1,sy2,sx,t,lam)=>{const c=x(),step=Math.max(6,Math.floor(Math.min(w,h)/60));c.save();c.beginPath();c.rect(x0,y0,w,h);c.clip();for(let yy=y0;yy<y0+h;yy+=step)for(let xx=x0;xx<x0+w;xx+=step){const r1=Math.hypot(xx-sx,yy-sy1),r2=Math.hypot(xx-sx,yy-sy2),k=TAU/lam;const A=Math.sin(k*r1-t*4)/Math.sqrt(1+r1*.03)+Math.sin(k*r2-t*4)/Math.sqrt(1+r2*.03);const v=Math.min(1,A*A*.28);c.fillStyle=`rgba(${40+v*100|0},${90+v*140|0},${200+v*55|0},${.15+v*.75})`;c.fillRect(xx,yy,step,step);}c.restore();};
  const atom=(px,py,r,t)=>{const c=x();c.save();dot(px,py,r*.16,"#ff9a8a");for(let i=0;i<3;i++){c.strokeStyle="rgba(159,208,255,.5)";c.lineWidth=2;c.beginPath();c.ellipse(px,py,r,r*.4,i*TAU/6,0,TAU);c.stroke();const an=t*(2+i*.6);const ex=Math.cos(an)*r,ey=Math.sin(an)*r*.4;const cs=Math.cos(i*TAU/6),sn=Math.sin(i*TAU/6);dot(px+ex*cs-ey*sn,py+ex*sn+ey*cs,r*.07,"#9fd0ff");}c.restore();};

  const s0=(t)=>{photo(3,t,7,1.12,.3);const f=title(t,"KVANTFYSIK","DET MINSTA, DE MÄRKLIGASTE REGLERNA","#9fe0ff");cred(3,.55*f);};

  /* 1 · atomen, och energi i paket (trappa) */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,14.6,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);
      if(t<7.1){const R0=Math.max(60,Math.min(a.w*.15,a.h*.28,s*.26))*(1+.04*Math.sin(t));cloud(cx,cy,R0*(0.7+0.3*eo((t-2.8)/2)),t,420);tx("atomer och ännu mindre delar",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(19,s*.052),700);}
      else{const w=Math.min(a.w*.6,s*1.1),lx=cx-w/2,y1=cy+s*.15,n=6,sw=w/n,sh=Math.max(20,s*.05);c.strokeStyle="rgba(255,255,255,.4)";c.setLineDash([6,6]);c.lineWidth=2;c.beginPath();c.moveTo(lx,y1);c.lineTo(lx+w,y1-n*sh);c.stroke();c.setLineDash([]);
        const k=eo((t-7.4)/2.4),m=Math.floor(k*n);c.strokeStyle="#ffd86b";c.lineWidth=5;c.beginPath();c.moveTo(lx,y1);for(let i=0;i<=m;i++){c.lineTo(lx+i*sw,y1-i*sh);c.lineTo(lx+(i+1)*sw,y1-i*sh);}c.stroke();
        tx("1900 · Max Planck",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(20,s*.055),700);tx("energi kommer i små paket (kvanta)",cx,y1+Math.max(50,s*.11),"#cfd8ff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 2 · konstigt */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,7.8,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const r=Math.max(50,Math.min(a.w*.1,a.h*.2,s*.18));
      c.fillStyle="rgba(160,200,255,.12)";c.beginPath();c.arc(cx,cy,r*2.2,0,TAU);c.fill();c.strokeStyle="rgba(160,200,255,.5)";c.lineWidth=2;c.beginPath();c.arc(cx,cy,r*2.2,0,TAU);c.stroke();
      cloud(cx,cy,r*1.4,t*.7,360);tx("vardagen",cx-a.w*.28,cy,"#cfd8ff","center",Math.max(18,s*.048),700);tx("här gäller andra regler",cx,cy+r*2.8,"#ffd86b","center",Math.max(17,s*.045),700);
      c.restore();}};

  /* 3 · våg och partikel: dubbelspalt, mönster byggs punkt för punkt */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,14.6,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,h=Math.min(a.h*.55,s*.7),top=cy-h/2;
      if(t<6.6){const wy=cy;c.strokeStyle="#9fd0ff";c.lineWidth=4;c.beginPath();for(let i=0;i<=120;i++){const q=i/120,X=lx+q*w*.5,Y=wy+Math.sin(q*TAU*6-t*5)*Math.max(14,s*.04);i?c.lineTo(X,Y):c.moveTo(X,Y);}c.stroke();tx("våg",lx+w*.25,wy-Math.max(50,s*.11),"#9fd0ff","center",Math.max(20,s*.055),700);
        for(let i=0;i<9;i++){const p=((t*.4+i/9)%1),qx=lx+w*.55+p*w*.4,qy=wy+(i%3-1)*s*.05;glow(qx,qy,Math.max(16,s*.04),"rgba(255,216,107,.9)");dot(qx,qy,Math.max(3,s*.008),"#fff");}tx("partiklar (fotoner)",lx+w*.75,wy-Math.max(50,s*.11),"#ffd86b","center",Math.max(17,s*.045),700);}
      else{const wall=lx+w*.3,sx=lx+w*.85,s1y=cy-h*.12,s2y=cy+h*.12;ripples(wall,top,sx-wall,h,s1y,s2y,wall,t,Math.max(14,s*.035));
        c.fillStyle="#6a7080";c.fillRect(wall-8,top,16,s1y-top-6);c.fillRect(wall-8,s1y+6,16,s2y-s1y-12);c.fillRect(wall-8,s2y+6,16,top+h-s2y-6);
        c.fillStyle="rgba(255,255,255,.12)";c.fillRect(sx,top,10,h);
        const r=L.srand(21),n=Math.floor(520*eo((t-7)/6));c.save();c.globalCompositeOperation="lighter";for(let i=0;i<n;i++){const y0=(r()-.5)*2*h*.5;const I=Math.pow(Math.cos(y0/h*TAU*2.2),2)*Math.exp(-Math.pow(y0/(h*.38),2));if(r()>I)continue;glow(sx+5+(r()-.5)*10,cy+y0,Math.max(5,s*.012),"rgba(120,230,255,.55)");}c.restore();
        dot(lx+w*.1,cy,Math.max(7,s*.018),"#ffd86b");glow(lx+w*.1,cy,Math.max(24,s*.06),"rgba(255,220,120,.8)");tx("elektroner en och en",lx+w*.1,cy+Math.max(40,s*.085),"#ffd86b","center",Math.max(13,s*.034),700);
        tx("ändå bildas ett vågmönster",cx,a.y+a.h*.08,"#9be3b0","center",Math.max(19,s*.052),700);}
      c.restore();}};

  /* 4 · flera lägen, Schrödingers katt */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,12.5,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const w=Math.max(100,Math.min(a.w*.2,s*.34)),h=w*.7;
      if(t<6.5){c.strokeStyle="#9fd0ff";c.lineWidth=3;c.strokeRect(cx-w/2,cy-h/2,w,h);for(let i=0;i<5;i++){const ph=i*1.3,px=cx+Math.cos(t*1.7+ph)*w*.36,py=cy+Math.sin(t*1.1+ph*2)*h*.32;glow(px,py,Math.max(24,w*.16),`rgba(255,216,107,${.25+.12*i})`);}c.globalAlpha=g;tx("flera lägen på en gång",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(19,s*.052),700);tx("tills någon mäter",cx,cy+h*.9,"#cfd8ff","center",Math.max(16,s*.042),700);}
      else{c.fillStyle="#3a4256";c.strokeStyle="#9fd0ff";c.lineWidth=4;c.fillRect(cx-w/2,cy-h/2,w,h);c.strokeRect(cx-w/2,cy-h/2,w,h);tx("?",cx,cy+h*.2,"#ffd86b","center",Math.max(50,h*.8),700);tx("katten i lådan",cx,cy+h*.9,"#ffd86b","center",Math.max(19,s*.052),700);tx("ett tankeexperiment av Schrödinger",cx,cy+h*.9+Math.max(40,s*.085),"#cfd8ff","center",Math.max(15,s*.04),600);}
      c.restore();}};

  /* 5 · osäkerhet: skarp plats ↔ suddig fart */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,9.1,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const w=Math.min(a.w*.7,s*1.3),lx=cx-w/2,y1=cy-s*.1,y2=cy+s*.12,bh=Math.max(28,s*.07);
      const k=.5+.5*Math.sin(t*1.2);
      c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y1,w,bh);c.fillRect(lx,y2,w,bh);
      const gw=Math.max(10,w*(.04+.5*(1-k)));const g1=c.createLinearGradient(lx,0,lx+w,0);g1.addColorStop(Math.max(0,.5-gw/w),"rgba(255,216,107,0)");g1.addColorStop(.5,"rgba(255,216,107,1)");g1.addColorStop(Math.min(1,.5+gw/w),"rgba(255,216,107,0)");c.fillStyle=g1;c.fillRect(lx,y1,w,bh);
      const gw2=Math.max(10,w*(.04+.5*k));const g2=c.createLinearGradient(lx,0,lx+w,0);g2.addColorStop(Math.max(0,.5-gw2/w),"rgba(159,208,255,0)");g2.addColorStop(.5,"rgba(159,208,255,1)");g2.addColorStop(Math.min(1,.5+gw2/w),"rgba(159,208,255,0)");c.fillStyle=g2;c.fillRect(lx,y2,w,bh);
      tx("var den är",lx,y1-Math.max(12,s*.03),"#ffd86b","left",Math.max(16,s*.042),700);tx("hur fort den rör sig",lx,y2-Math.max(12,s*.03),"#9fd0ff","left",Math.max(16,s*.042),700);
      tx("Heisenberg · skarpt ena = suddigt andra",cx,a.y+a.h*.9,"#cfd8ff","center",Math.max(15,s*.04),700);
      c.restore();}};

  /* 6 · nytta: laser, chip, mobil, magnetkamera, kvantdator */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,10.5,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const u=Math.max(18,Math.min(a.w*.035,s*.045));
      const items=["laser","dator","mobil","magnetkamera"];items.forEach((n,i)=>{const q=eo((t-2.8-i*.7)/.7);if(q<=0)return;const px=cx+(i-1.5)*u*5.6;c.save();c.globalAlpha=g*q;
        if(i===0){c.strokeStyle="#ff3a3a";c.lineWidth=5;c.beginPath();c.moveTo(px-u*1.6,cy);c.lineTo(px+u*1.6,cy);c.stroke();dot(px-u*1.6,cy,u*.35,"#ccc");}
        else if(i===1){c.fillStyle="#2a3550";c.strokeStyle="#9fd0ff";c.lineWidth=3;c.fillRect(px-u,cy-u,u*2,u*2);c.strokeRect(px-u,cy-u,u*2,u*2);}
        else if(i===2){c.fillStyle="#e8ecf4";c.fillRect(px-u*.6,cy-u*1.2,u*1.2,u*2.4);c.fillStyle="#4a7ad9";c.fillRect(px-u*.5,cy-u*1,u,u*1.9);}
        else{c.strokeStyle="#cfd5df";c.lineWidth=u*.5;c.beginPath();c.arc(px,cy,u*1.2,0,TAU);c.stroke();}
        tx(n,px,cy+u*2.6,"#fff","center",Math.max(14,s*.037),700);c.restore();});
      if(t>7){c.globalAlpha=g*eo((t-7)/1);tx("+ kvantdatorer",cx,a.y+a.h*.12,"#9be3b0","center",Math.max(22,s*.06),700);}
      c.restore();}};

  /* 7 · aldrig fel: många tester, alla gröna */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(1,t,7.9,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const cols=14,rows=6,cell=Math.min(a.w*.05,s*.07),n=Math.floor(cols*rows*eo((t-2.8)/3.5));for(let i=0;i<n;i++){const px=cx+((i%cols)-(cols-1)/2)*cell*1.2,py=cy+(Math.floor(i/cols)-(rows-1)/2)*cell*1.2-s*.02;c.fillStyle="#3aa86a";c.fillRect(px-cell*.45,py-cell*.45,cell*.9,cell*.9);c.strokeStyle="#fff";c.lineWidth=2;c.beginPath();c.moveTo(px-cell*.25,py);c.lineTo(px-cell*.05,py+cell*.2);c.lineTo(px+cell*.28,py-cell*.2);c.stroke();}
      tx("test efter test efter test",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(19,s*.052),700);tx("ännu inget fel",cx,a.y+a.h*.9,"#9be3b0","center",Math.max(20,s*.055),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
