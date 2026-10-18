/* Det djupaste stället (Marianergraven): minilektionen som film (åtta scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/marianer/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/marianer-1..7.jpg. MPMarianerFilm.start(host,{overlay,onClose}). Ljudmatta: havet. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.1,cap:[[0.5,"Det djupaste stället på jorden. Det här är berättelsen om Marianergraven."]]},
 {k:"01 · En spricka i havsbotten",d:7.3,cap:[[0.8,"Marianergraven ligger i Stilla havet. Det är en lång, djup spricka i havsbotten."]]},
 {k:"02 · Nästan elva kilometer",d:11.9,cap:[[0.8,"På det djupaste stället är det ungefär 10 900 meter ner. Det är nästan elva kilometer."],[7.9,"Det är längre ner än ett flygplan flyger högt upp."]]},
 {k:"03 · Större än Everest",d:8.3,cap:[[0.8,"Om man lade Mount Everest på botten, skulle det fortfarande vara mer än två kilometer vatten ovanför toppen."]]},
 {k:"04 · Enormt tryck",d:8.9,cap:[[0.8,"Där nere trycker vattnet över 1 000 gånger hårdare än på land."],[5.1,"Det är som om en elefant stod på ett frimärke."]]},
 {k:"05 · Kolsvart",d:6.7,cap:[[0.8,"Solljuset når inte ner. Det är kolsvart, och bara några grader varmt."]]},
 {k:"06 · Liv även här",d:6.7,cap:[[0.8,"Ändå lever det små räkliknande djur där nere. Liv finns nästan överallt."]]},
 {k:"07 · Skräp",d:8.1,cap:[[0.8,"Men även här har forskare hittat skräp, till exempel en plastpåse på nästan elva kilometers djup."]]}
];
const META={mat:"havet",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Det djupaste stället",under:"En film i åtta steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Havets djup är fortfarande nästan outforskat. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Karta: Gerringer m.fl. (2017) · CC BY 3.0 · Wikimedia Commons",2:"Foto: Vobonline · CC BY-SA 4.0 · Wikimedia Commons",3:"Foto: Vyacheslav Argenberg · CC BY 4.0 · Wikimedia Commons",4:"Foto: D64 (tryckkärl) · CC BY-SA 4.0 · Wikimedia Commons",5:"Foto: Badskaffen Trieste · Public domain · Wikimedia Commons",6:"Foto: OldMateWA (havsgubbar) · CC BY-SA 4.0 · Wikimedia Commons",7:"Foto: NOAA Okeanos Explorer (färgburk på en annan djup havsbotten, inte i Marianergraven) · Public domain · Wikimedia Commons"};

window.MPMarianerFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"marianer",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"marianer-",names:[1,2,3,4,5,6,7],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,deep,title}=L;
  /* djupkolumn: y(m) 0..11 000 m från ytan (y0) till botten (y1) */
  const sub=(px,py,u)=>{const c=x();c.save();c.fillStyle="#ffd23c";c.beginPath();c.ellipse(px,py,u*1.4,u*.8,0,0,TAU);c.fill();c.fillStyle="#e8a000";c.fillRect(px-u*.2,py-u*1.25,u*.4,u*.5);c.fillStyle="#0d3b63";c.beginPath();c.arc(px+u*.6,py-u*.05,u*.28,0,TAU);c.fill();c.restore();};
  const jet=(px,py,u)=>{const c=x();c.save();c.fillStyle="#eef2f8";c.beginPath();c.ellipse(px,py,u*2,u*.45,0,0,TAU);c.fill();c.fillStyle="#9fb0c9";c.beginPath();c.moveTo(px-u*.2,py);c.lineTo(px-u*1.2,py-u*1.1);c.lineTo(px-u*.6,py-u*1.1);c.lineTo(px+u*.5,py);c.closePath();c.fill();c.beginPath();c.moveTo(px-u*.2,py);c.lineTo(px-u*1.2,py+u*1.0);c.lineTo(px-u*.6,py+u*1.0);c.lineTo(px+u*.5,py);c.closePath();c.fill();c.fillStyle="#9fb0c9";c.beginPath();c.moveTo(px-u*1.7,py);c.lineTo(px-u*2.1,py-u*.8);c.lineTo(px-u*1.6,py-u*.8);c.lineTo(px-u*1.3,py);c.closePath();c.fill();c.restore();};

  const s0=(t)=>{photo(1,t,6.1,1.12,.3);const f=title(t,"MARIANERGRAVEN","DET DJUPASTE STÄLLET PÅ JORDEN","#9fd0ff");cred(1,.55*f);};

  /* 1 · en spricka i havsbotten (tvärsnitt) */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,7.3,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t,1);const w=Math.min(a.w*.86,s*1.6),lx=cx-w/2,top=a.y+a.h*.3,k=eo((t-2.8)/1.6);
      grad({x:lx,y:top,w,h:a.h*.4},[[0,"#0d3b63"],[1,"#07233f"]]);
      c.fillStyle="#3a2c22";c.beginPath();c.moveTo(lx,top+a.h*.18);c.lineTo(cx-w*.14,top+a.h*.18);c.lineTo(cx-w*.02,top+a.h*.18+a.h*.2*k);c.lineTo(cx+w*.02,top+a.h*.18+a.h*.2*k);c.lineTo(cx+w*.14,top+a.h*.18);c.lineTo(lx+w,top+a.h*.18);c.lineTo(lx+w,top+a.h*.55);c.lineTo(lx,top+a.h*.55);c.closePath();c.fill();
      c.strokeStyle="rgba(143,208,255,.8)";c.lineWidth=2;c.beginPath();c.moveTo(lx,top);c.lineTo(lx+w,top);c.stroke();
      tx("Stilla havet",cx-w*.34,top-Math.max(12,s*.03),"#9fd0ff","center",Math.max(15,s*.04),700);
      if(t>4.2){c.globalAlpha=g*eo((t-4.2)/.8);tx("Marianergraven",cx,top+a.h*.18+a.h*.2+Math.max(34,s*.08),"#ffd86b","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 2 · djupkolumn med ubåt och flygplan */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,11.9,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;const top=a.y+a.h*.05,y1=a.y+a.h*.92,K=(y1-top)/20.9,y0=top+10*K,m=km=>y0+km*K,px=cx-Math.min(a.w*.22,s*.4);
      grad({x:a.x,y:top,w:a.w,h:y0-top},[[0,"#8fb8e8"],[1,"#cfe6fb"]]);deep({x:a.x,y:y0,w:a.w,h:y1-y0},t,1);c.fillStyle="#1b130d";c.fillRect(a.x,y1,a.w,a.y+a.h-y1);
      [0,2,4,6,8,10].forEach(km=>{c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=1.5;c.beginPath();c.moveTo(px+34,m(km));c.lineTo(px+60,m(km));c.stroke();tx(km+" km",px+70,m(km)+5,"rgba(255,255,255,.8)","left",Math.max(12,s*.03),600);});
      c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=2;c.beginPath();c.moveTo(a.x,y0);c.lineTo(a.x+a.w,y0);c.stroke();tx("havsytan",a.x+8,y0-8,"#fff","left",Math.max(12,s*.03),700);
      const k=eo((t-3)/4),yb=lerp(m(0)+6,m(10.9),k);sub(px,yb,Math.max(10,s*.026));
      tx("ca 10 900 m",px+Math.max(110,s*.22),m(10.9)+5,"#ffd86b","left",Math.max(15,s*.04),700);
      if(t>7.9){const q=eo((t-7.9)/1);c.globalAlpha=g*q;jet(px,m(-10)+Math.max(14,s*.035),Math.max(10,s*.026));tx("flygplan ca 10 km upp",px+Math.max(60,s*.14),m(-10)+Math.max(14,s*.035)+5,"#1d3a6a","left",Math.max(13,s*.034),700);}
      c.restore();}};

  /* 3 · Everest på botten */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,8.3,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t,1);const top=a.y+a.h*.1,bot=a.y+a.h*.86,H=bot-top,m=v=>bot-v/10900*H,mx=cx;
      c.strokeStyle="rgba(143,208,255,.8)";c.lineWidth=2;c.beginPath();c.moveTo(a.x,top);c.lineTo(a.x+a.w,top);c.stroke();tx("havsytan",a.x+8,top-8,"#9fd0ff","left",Math.max(12,s*.03),700);
      c.fillStyle="#3a2c22";c.fillRect(a.x,bot,a.w,a.y+a.h-bot);
      const k=eo((t-3)/2),bw=Math.min(a.w*.36,H*.8);c.fillStyle="#cfd8e4";c.beginPath();c.moveTo(mx-bw/2,bot);c.lineTo(mx,lerp(bot,m(8849),k));c.lineTo(mx+bw/2,bot);c.closePath();c.fill();c.fillStyle="#fff";c.beginPath();c.moveTo(mx-bw*.12,lerp(bot,m(8849),k)+H*.08*k);c.lineTo(mx,lerp(bot,m(8849),k));c.lineTo(mx+bw*.12,lerp(bot,m(8849),k)+H*.08*k);c.closePath();c.fill();
      tx("Mount Everest",mx,bot-Math.max(10,s*.025),"#1b2a40","center",Math.max(13,s*.032),700);
      if(t>5.4){const q=eo((t-5.4)/1),bx=mx+bw*.7;c.globalAlpha=g*q;c.strokeStyle="#ffd86b";c.lineWidth=3;c.beginPath();c.moveTo(bx,top);c.lineTo(bx,m(8849));c.moveTo(bx-8,top);c.lineTo(bx+8,top);c.moveTo(bx-8,m(8849));c.lineTo(bx+8,m(8849));c.stroke();tx("över 2 km vatten kvar",bx+12,(top+m(8849))/2+5,"#ffd86b","left",Math.max(14,s*.037),700);}
      c.restore();}};

  /* 4 · tryck: elefant på frimärke */
  const elephant=(px,py,u)=>{const c=x();c.save();c.fillStyle="#9aa3b3";c.beginPath();c.ellipse(px,py-u*1.2,u*1.6,u*1.1,0,0,TAU);c.fill();c.beginPath();c.ellipse(px+u*1.8,py-u*1.6,u*.8,u*.7,0,0,TAU);c.fill();c.fillRect(px+u*2.3,py-u*1.5,u*.35,u*1.5);c.fillRect(px-u*1.2,py-u*.4,u*.5,u*.5);c.fillRect(px-u*.2,py-u*.4,u*.5,u*.5);c.fillRect(px+u*.7,py-u*.4,u*.5,u*.5);c.fillStyle="#7e8797";c.beginPath();c.ellipse(px+u*1.4,py-u*1.5,u*.45,u*.6,0,0,TAU);c.fill();c.fillStyle="#222";c.beginPath();c.arc(px+u*2.05,py-u*1.8,u*.09,0,TAU);c.fill();c.restore();};
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,8.9,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);const u=Math.max(14,Math.min(a.w*.055,s*.05)),y=cy+s*.06;
      const q=eo((t-2.8)/1);c.globalAlpha=g*q;tx("över 1 000 × trycket på land",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(18,s*.048),700);
      if(t>5.1){const k=eo((t-5.1)/1.2);c.globalAlpha=g;elephant(cx-u*.6,y-(1-k)*a.h*.3-u*.4,u);}
      c.globalAlpha=g;c.fillStyle="#f2e6c4";c.strokeStyle="#c93030";c.lineWidth=2;c.setLineDash([3,3]);c.fillRect(cx-u*.4,y,u*.8,u*.9);c.strokeRect(cx-u*.4,y,u*.8,u*.9);c.setLineDash([]);tx("frimärke",cx,y+u*.9+Math.max(24,s*.055),"rgba(255,255,255,.8)","center",Math.max(13,s*.034),700);
      for(let i=0;i<5;i++){const ax=cx-u*1.6+i*u*.8,ph=(t*1.2+i*.2)%1;c.strokeStyle="rgba(143,208,255,.8)";c.lineWidth=2;c.beginPath();c.moveTo(ax,y+u*1.6+ph*0);c.lineTo(ax,y+u*.9);c.stroke();}
      c.restore();}};

  /* 5 · kolsvart och kallt */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,6.7,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t,1);const w=Math.min(a.w*.22,s*.4),lx=cx-w*1.6,top=a.y+a.h*.1,H=a.h*.78;grad({x:lx,y:top,w,h:H},[[0,"#6fb4ff"],[.18,"#1d5fb8"],[.5,"#07233f"],[1,"#000"]]);
      [["0 m","#fff",0],["200 m","#fff",.12],["1 000 m","#9fb0c9",.35],["10 000 m","#667",.95]].forEach(([n,col,p])=>{tx(n,lx+w+12,top+p*H+5,col,"left",Math.max(12,s*.032),600);});
      const k=eo((t-3)/2.5);c.fillStyle="#ffd23c";c.beginPath();c.arc(lx+w/2,top+k*H*.98,8,0,TAU);c.fill();
      const tx0=cx+w*.9,th=H*.7,fill=eo((t-3.4)/1.5);c.fillStyle="rgba(255,255,255,.12)";c.fillRect(tx0,top+H*.12,w*.18,th);c.fillStyle="#4aa8ff";c.fillRect(tx0,top+H*.12+th*(1-.1-.06*fill),w*.18,th*(.1+.06*fill));c.beginPath();c.arc(tx0+w*.09,top+H*.12+th+10,w*.18,0,TAU);c.fill();
      tx("några grader",tx0+w*.09,top+H*.12+th+Math.max(48,s*.1),"#9fd0ff","center",Math.max(14,s*.036),700);
      c.restore();}};

  /* 6 · liv: små glödande räkdjur i mörkret */
  const shrimp=(px,py,u,ph,col)=>{const c=x();c.save();c.translate(px,py);c.strokeStyle=col;c.fillStyle=col;c.lineWidth=Math.max(1.5,u*.15);c.lineCap="round";c.globalAlpha*=.92;c.beginPath();c.ellipse(0,0,u*1.3,u*.55,Math.sin(ph)*.15,0,TAU);c.fill();for(let i=0;i<5;i++){const lx=-u*.9+i*u*.45,sw=Math.sin(ph*2+i)*u*.25;c.beginPath();c.moveTo(lx,u*.4);c.lineTo(lx+sw,u*1.1);c.stroke();}c.beginPath();c.moveTo(u*1.2,-u*.1);c.quadraticCurveTo(u*2,-u*.6,u*2.5,-u*.2);c.moveTo(u*1.2,u*.05);c.quadraticCurveTo(u*2,u*.1,u*2.4,u*.5);c.stroke();c.restore();};
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(6,t,6.7,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t,1);c.fillStyle="#120d08";c.fillRect(a.x,a.y+a.h*.82,a.w,a.h*.18);const u=Math.max(9,s*.025),r=L.srand(8);
      for(let i=0;i<7;i++){const bx=a.x+a.w*(.14+r()*.72)+Math.sin(t*.5+i)*14,by=a.y+a.h*(.3+r()*.45)+Math.cos(t*.4+i)*8;const gl=c.createRadialGradient(bx,by,0,bx,by,u*4);gl.addColorStop(0,"rgba(120,220,255,.35)");gl.addColorStop(1,"rgba(120,220,255,0)");c.fillStyle=gl;c.beginPath();c.arc(bx,by,u*4,0,TAU);c.fill();shrimp(bx,by,u,t*3+i,"#f2a98a");}
      tx("små räkliknande djur",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(17,s*.045),700);
      c.restore();}};

  /* 7 · skräp: plastpåse på botten */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(7,t,8.1,1.1,.2+.4*g);cred(7,.55);
    if(g>0){c.save();c.globalAlpha=g;const w=Math.min(a.w*.8,s*1.4),h=a.h*.36,lx=cx-w/2,y=a.y+a.h*.4;c.fillStyle="rgba(2,8,18,.8)";c.beginPath();c.roundRect?c.roundRect(lx,y,w,h,14):c.rect(lx,y,w,h);c.fill();
      const bx=cx,by=y+h*.52+Math.sin(t*.9)*6,u=Math.max(26,Math.min(w,h)*.22);c.fillStyle="rgba(235,240,250,.75)";c.strokeStyle="rgba(255,255,255,.9)";c.lineWidth=2;c.beginPath();c.moveTo(bx-u*.6,by-u*.8);c.quadraticCurveTo(bx-u*.9,by,bx-u*.5,by+u*.8);c.quadraticCurveTo(bx,by+u*1.05,bx+u*.5,by+u*.8);c.quadraticCurveTo(bx+u*.9,by,bx+u*.6,by-u*.8);c.quadraticCurveTo(bx+u*.3,by-u*1.1,bx,by-u*.8);c.quadraticCurveTo(bx-u*.3,by-u*1.1,bx-u*.6,by-u*.8);c.closePath();c.fill();c.stroke();
      c.strokeStyle="rgba(255,255,255,.5)";c.lineWidth=2;c.beginPath();c.moveTo(bx-u*.35,by-u*.7);c.quadraticCurveTo(bx-u*.55,by,bx-u*.25,by+u*.6);c.stroke();
      tx("plastpåse, nästan 11 km ner",cx,y+h+Math.max(34,s*.08),"#ffd86b","center",Math.max(16,s*.042),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
