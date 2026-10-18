/* Så vet mobilen var du är (GPS): minilektionen som film (åtta scener, ca 1,7 minuter), bilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/gps/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/gps-1..6.jpg. MPGpsFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.6,cap:[[0.5,"Signaler från rymden som visar var du är. Det här är berättelsen om GPS."]]},
 {k:"01 · Signaler från satelliter",d:11.9,cap:[[0.8,"Mobilen tar emot signaler från satelliter som flyger högt över jorden. Systemet heter GPS."],[7.8,"Mobilen skickar ingenting upp, den lyssnar bara."]]},
 {k:"02 · Över 30 satelliter",d:10.4,cap:[[0.8,"GPS har ungefär 30 satelliter som flyger runt jorden på ungefär 20 000 kilometers höjd."],[7.3,"Ett varv tar ungefär tolv timmar."]]},
 {k:"03 · Klockor i rymden",d:7.6,cap:[[0.8,"Varje satellit har en extremt exakt atomklocka. Den skickar ut tiden och var satelliten är."]]},
 {k:"04 · Räknar avstånd",d:12.5,cap:[[0.8,"Mobilen mäter hur lång tid signalen tog. Eftersom ljuset har en känd fart kan den räkna ut avståndet till satelliten."],[8.9,"Signalen tar ungefär sju hundradels sekund."]]},
 {k:"05 · Minst fyra satelliter",d:14.1,cap:[[0.8,"Med avstånd till minst fyra satelliter kan mobilen räkna ut exakt var den är, ofta inom några meter."],[8.7,"Tre behövs för läget. Den fjärde rättar mobilens egen klocka."]]},
 {k:"06 · Einstein hjälper till",d:15.2,cap:[[0.8,"Satelliternas klockor går lite fortare än klockor på jorden, enligt Einsteins relativitetsteori."],[6.7,"Utan korrigering skulle GPS bli fel redan efter någon timme, och efter ett dygn ungefär tio kilometer fel."]]},
 {k:"07 · Flera system",d:13.1,cap:[[0.8,"Det finns flera sådana system. Europa har Galileo, Ryssland har Glonass och Kina har Beidou."],[8.9,"Din mobil kan ofta använda flera av dem samtidigt."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Så vet mobilen var du är",under:"En film i åtta steg · ca 1,7 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Tid och avstånd, från rymden till din ficka. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Vyacheslav Argenberg (GPS-navigering på mobil) · CC BY 4.0 · Wikimedia Commons",2:"Bild: NASA (GPS-satellit, konstnärlig bild) · Public domain · Wikimedia Commons",3:"Foto: ESO (en atomklocka) · CC BY 4.0 · Wikimedia Commons",4:"Foto: Shujianyang (Beidou-atomklocka) · CC BY-SA 4.0 · Wikimedia Commons",5:"Bild: NASA (GPS-satellit, konstnärlig bild) · Public domain · Wikimedia Commons",6:"Foto: Oren Jack Turner (Albert Einstein) · Public domain · Wikimedia Commons"};

window.MPGpsFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"gps",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"gps-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const earth=(px,py,r)=>{const c=x();c.save();const g=c.createRadialGradient(px-r*.35,py-r*.35,r*.1,px,py,r);g.addColorStop(0,"#6fb4ff");g.addColorStop(.7,"#1d5fb8");g.addColorStop(1,"#0a2a66");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.fillStyle="rgba(80,170,90,.85)";[[-.3,-.1,.28,.2],[.25,.2,.22,.16],[.05,-.45,.16,.1]].forEach(([dx,dy,w,h])=>{c.beginPath();c.ellipse(px+dx*r,py+dy*r,w*r,h*r,.5,0,TAU);c.fill();});c.restore();};
  const sat=(px,py,u,ang)=>{const c=x();c.save();c.translate(px,py);c.rotate(ang||0);c.fillStyle="#cfd5df";c.fillRect(-u*.5,-u*.5,u,u);c.fillStyle="#4a7ad9";c.fillRect(-u*2.1,-u*.3,u*1.5,u*.6);c.fillRect(u*.6,-u*.3,u*1.5,u*.6);c.restore();};
  const phone=(px,py,u)=>{const c=x();c.save();c.fillStyle="#e8ecf4";c.fillRect(px-u*.6,py-u*1.1,u*1.2,u*2.2);c.fillStyle="#1d5fb8";c.fillRect(px-u*.5,py-u*.95,u*1,u*1.8);c.fillStyle="#ffd23c";c.beginPath();c.arc(px,py-u*.1,u*.22,0,TAU);c.fill();c.restore();};

  const s0=(t)=>{photo(1,t,6.6,1.12,.3);const f=title(t,"GPS","SIGNALER FRÅN RYMDEN","#9fe0ff");cred(1,.55*f);};

  /* 1 · satelliter skickar, mobilen lyssnar */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,11.9,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const R=Math.max(40,Math.min(a.w*.12,a.h*.22,s*.2)),ex=cx,ey=cy+R*1.2;earth(ex,ey,R);
      const px=ex,py=ey-R-2;phone(px,py-Math.max(10,s*.02),Math.max(8,R*.12));
      [[-.7],[0],[.7]].forEach(([d],i)=>{const sx=cx+d*R*2.6,sy=cy-R*1.4-Math.abs(d)*R*.2;sat(sx,sy,Math.max(7,R*.1),d*.4);
        if(t>4){const p=((t*.6+i*.3)%1);c.strokeStyle="rgba(255,226,122,.55)";c.lineWidth=2;c.beginPath();c.moveTo(sx,sy);c.lineTo(px,py);c.stroke();dot(lerp(sx,px,p),lerp(sy,py,p),4,"#ffe27a");}});
      tx("signaler ner till mobilen",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(18,s*.048),700);
      if(t>7.8){c.globalAlpha=g*eo((t-7.8)/1);tx("mobilen lyssnar bara",cx,a.y+a.h*.92,"#9be3b0","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 2 · 30 satelliter på 20 000 km, ett varv på 12 timmar */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,10.4,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const R=Math.max(30,Math.min(a.w*.1,a.h*.14,s*.14)),ex=cx,ey=cy+s*.02,OR=R*4.2;earth(ex,ey,R);
      c.strokeStyle="rgba(255,255,255,.3)";c.setLineDash([6,8]);c.lineWidth=2;c.beginPath();c.arc(ex,ey,OR,0,TAU);c.stroke();c.setLineDash([]);
      const n=30,rot=t*(t>7.3?.55:.12);for(let i=0;i<n;i++){const an=i*TAU/n+rot,rr=OR*(1+((i*7)%5-2)*.02);dot(ex+Math.cos(an)*rr,ey+Math.sin(an)*rr,Math.max(3,R*.07),"#ffe27a");}
      tx("ca 30 satelliter · ca 20 000 km upp",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(17,s*.045),700);
      if(t>7.3){c.globalAlpha=g*eo((t-7.3)/1);tx("ett varv ≈ 12 timmar",cx,a.y+a.h*.92,"#9be3b0","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 3 · atomklockan sänder tid och läge */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,7.6,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const r=Math.max(40,Math.min(a.w*.1,a.h*.2,s*.18)),lx=cx-a.w*.2;
      c.fillStyle="#f2efe6";c.beginPath();c.arc(lx,cy,r,0,TAU);c.fill();c.strokeStyle="#1d2b53";c.lineWidth=4;c.stroke();for(let i=0;i<12;i++){const an=i*TAU/12;c.beginPath();c.moveTo(lx+Math.cos(an)*r*.85,cy+Math.sin(an)*r*.85);c.lineTo(lx+Math.cos(an)*r*.95,cy+Math.sin(an)*r*.95);c.stroke();}
      const an=t*4;c.beginPath();c.moveTo(lx,cy);c.lineTo(lx+Math.cos(an)*r*.8,cy+Math.sin(an)*r*.8);c.stroke();tx("atomklocka",lx,cy+r*1.5,"#ffd86b","center",Math.max(15,s*.04),700);
      if(t>4){const k=cl((t-4)/2,0,1),bx=cx+a.w*.18;c.strokeStyle="rgba(255,226,122,.6)";c.lineWidth=3;c.beginPath();c.moveTo(lx+r*1.2,cy);c.lineTo(bx-r*.6,cy);c.stroke();for(let i=0;i<3;i++){const p=((t*.5+i/3)%1);dot(lerp(lx+r*1.2,bx-r*.6,p),cy,5,"#ffe27a");}
        c.fillStyle="rgba(255,255,255,.1)";c.strokeStyle="#9fd0ff";c.lineWidth=2;c.fillRect(bx-r*.6,cy-r*.7,r*1.7,r*1.4);c.strokeRect(bx-r*.6,cy-r*.7,r*1.7,r*1.4);tx("tid",bx+r*.25,cy-r*.15,"#fff","center",Math.max(15,s*.04),700);tx("och läge",bx+r*.25,cy+r*.3,"#9fd0ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 4 · tid × ljusets fart = avstånd */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,12.5,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const w=Math.min(a.w*.7,s*1.3),lx=cx-w/2,sy=cy-s*.05,py=cy+s*.05,sx=lx+w*.15,px2=lx+w*.85;
      sat(sx,sy-s*.08,Math.max(10,s*.03),0);phone(px2,py,Math.max(12,s*.035));
      c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=3;c.beginPath();c.moveTo(sx,sy-s*.08);c.lineTo(px2,py);c.stroke();
      const p=((t*.4)%1);dot(lerp(sx,px2,p),lerp(sy-s*.08,py,p),6,"#ffe27a");
      tx("tid × ljusets fart = avstånd",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(19,s*.052),700);
      if(t>8.9){c.globalAlpha=g*eo((t-8.9)/1);tx("≈ 0,07 s",cx,a.y+a.h*.82,"#9be3b0","center",Math.max(30,s*.085),700);}
      c.restore();}};

  /* 5 · cirklar som korsas: tre för läget, fjärde rättar klockan */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,14.1,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const mx=cx,my=cy+s*.04,R=Math.min(a.w*.2,a.h*.3,s*.34);
      const sats=[[-.9,-.95],[.95,-.7],[0,1.05],[1.05,.6]];
      sats.forEach(([dx,dy],i)=>{if(i===3&&t<8.7)return;const sx=mx+dx*R,sy=my+dy*R,k=eo((t-3-i*.8)/1);if(i<3&&k<=0)return;const rr=Math.hypot(sx-mx,sy-my);c.globalAlpha=g*(i===3?eo((t-8.7)/.8):Math.max(0,k));c.strokeStyle=i===3?"#ff9a8a":"#9fd0ff";c.lineWidth=2.5;c.beginPath();c.arc(sx,sy,rr*Math.max(.2,k),0,TAU);c.stroke();sat(sx,sy,Math.max(7,s*.02),0);});
      c.globalAlpha=g;dot(mx,my,Math.max(7,s*.018),"#ffd23c");tx("du är här",mx,my+Math.max(24,s*.055),"#ffd86b","center",Math.max(14,s*.037),700);
      tx(t<8.7?"minst tre satelliter ger läget":"den fjärde rättar klockan",cx,a.y+a.h*.1,t<8.7?"#9fd0ff":"#ffb0a0","center",Math.max(17,s*.045),700);
      c.restore();}};

  /* 6 · Einstein: klockorna går olika, fel växer */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,15.2,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const r=Math.max(34,Math.min(a.w*.09,a.h*.18,s*.16));
      const clock=(px,py,hand,col,lbl)=>{c.fillStyle="#f2efe6";c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.strokeStyle=col;c.lineWidth=5;c.stroke();c.strokeStyle="#1d2b53";c.lineWidth=4;c.beginPath();c.moveTo(px,py);c.lineTo(px+Math.cos(hand)*r*.8,py+Math.sin(hand)*r*.8);c.stroke();tx(lbl,px,py+r*1.6,col,"center",Math.max(15,s*.04),700);};
      if(t<6.7){clock(cx-r*1.8,cy,t*1.2-Math.PI/2,"#9fd0ff","på jorden");clock(cx+r*1.8,cy,t*1.35-Math.PI/2,"#ffb878","i satelliten");tx("går lite fortare i satelliten",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(18,s*.048),700);}
      else{const w=Math.min(a.w*.7,s*1.2),lx=cx-w/2,y=cy,bh=Math.max(26,s*.065),k=eo((t-7)/6);c.fillStyle="rgba(255,255,255,.1)";c.fillRect(lx,y,w,bh);c.fillStyle="#ff6a5e";c.fillRect(lx,y,w*k,bh);tx("fel i läget",lx,y-Math.max(12,s*.03),"#ffb0a0","left",Math.max(15,s*.04),700);
        tx("0",lx,y+bh+Math.max(24,s*.055),"#fff","center",Math.max(13,s*.034),600);tx("ca 10 km efter ett dygn",lx+w,y+bh+Math.max(24,s*.055),"#ffb0a0","right",Math.max(14,s*.037),700);}
      c.restore();}};

  /* 7 · fyra system */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,13.1,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const w=Math.max(100,Math.min(a.w*.19,s*.3)),h=w*.62;
      [["GPS","USA","#9fd0ff"],["Galileo","Europa","#ffd86b"],["Glonass","Ryssland","#ffb878"],["Beidou","Kina","#ff9a8a"]].forEach(([n,l,col],i)=>{const q=eo((t-3-i*.8)/.8);if(q<=0)return;const px=cx+(i-1.5)*w*1.12;c.save();c.globalAlpha=g*q;c.fillStyle="rgba(255,255,255,.08)";c.strokeStyle=col;c.lineWidth=3;c.fillRect(px-w/2,cy-h/2,w,h);c.strokeRect(px-w/2,cy-h/2,w,h);tx(n,px,cy-h*.02,"#fff","center",Math.max(17,w*.19),700);tx(l,px,cy+h*.3,col,"center",Math.max(13,w*.14),700);c.restore();});
      if(t>8.9){c.globalAlpha=g*eo((t-8.9)/1);tx("mobilen kan använda flera samtidigt",cx,a.y+a.h*.82,"#9be3b0","center",Math.max(17,s*.045),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
