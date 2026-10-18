/* Tjernobyl: minilektionen som film (åtta scener, ca 2 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas). Sakligt och lugnt, inga bilder på skador.
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/tjernobyl/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/tjernobyl-1..7.jpg. MPTjernobylFilm.start(host,{overlay,onClose}). Ljudmatta: klockor (djup lugn ton och avlägsen klocka). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.1,cap:[[0.5,"En olycka som förändrade Europa. Det här är berättelsen om Tjernobyl."]]},
 {k:"01 · Kraftverket",d:15.4,cap:[[0.8,"Vid staden Tjernobyl, i dagens Ukraina, fanns ett stort kärnkraftverk med fyra reaktorer. Det drevs av Sovjetunionen."],[8.95,"Den närmaste staden, Pripjat, byggdes för kraftverkets arbetare och deras familjer."]]},
 {k:"02 · Natten",d:12.5,cap:[[0.8,"Natten till den 26 april 1986 gick något fel under ett test i reaktor 4."],[9.1,"Det blev två explosioner och en stor brand."]]},
 {k:"03 · Molnet",d:7.3,cap:[[0.8,"Radioaktiva ämnen släpptes ut. Molnet spreds med vinden över stora delar av Europa."]]},
 {k:"04 · Sverige märkte det",d:14.8,cap:[[0.8,"Två dagar senare larmade mätare på kärnkraftverket Forsmark i Sverige."],[5.7,"Först trodde man att läckan fanns på det egna kraftverket. Då förstod man att något hade hänt, innan Sovjetunionen berättade det."]]},
 {k:"05 · Pripjat tömdes",d:12.7,cap:[[0.8,"Staden Pripjat tömdes på invånare, ungefär 50 000 människor. Över tusen bussar körde dem därifrån."],[9.1,"Totalt flyttades hundratusentals människor."]]},
 {k:"06 · Skyddet",d:9.3,cap:[[0.8,"Reaktorn täcktes först med betong. Sedan 2016 flyttades ett jättelikt stålvalv över den, över hundra meter högt."]]},
 {k:"07 · Naturen",d:14.2,cap:[[0.8,"I zonen runt kraftverket bor nästan inga människor. Där lever nu vargar, rådjur och vildhästar."],[8.6,"Men ämnen finns kvar i marken, så området är fortfarande avspärrat."]]}
];
const META={mat:"klockor",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Tjernobyl",under:"En film i åtta steg · ca 2 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Tjernobyl lärde världen mycket om säkerhet. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Cls14 (kärnkraftverket 2016) · CC BY-SA 4.0 · Wikimedia Commons",2:"Foto: Peer.Gynt (Mi-8) · CC BY-SA 2.0 · Wikimedia Commons",3:"Foto: Jorge Franganillo (kärnkraftverket) · CC BY 2.0 · Wikimedia Commons",4:"Foto: Dennis140 (Forsmark) · Public domain · Wikimedia Commons",5:"Foto: Slawojar (Pripjat) · CC BY-SA 3.0 · Wikimedia Commons",6:"Foto: Cls14 (nya skyddet 2016) · CC BY-SA 4.0 · Wikimedia Commons",7:"Montage: Wikiwind m.fl. (Pripjat) · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPTjernobylFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"tjernobyl",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"tjernobyl-",names:[1,2,3,4,5,6,7],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const plant=(px,py,u,hl)=>{const c=x();c.save();for(let i=0;i<4;i++){const bx=px-u*3.2+i*u*2.2;c.fillStyle=(i===3&&hl)?"#d9703a":"#9aa3b3";c.fillRect(bx,py-u*2.2,u*1.8,u*2.2);c.fillStyle="#cfd5df";c.fillRect(bx+u*.3,py-u*2.8,u*.4,u*.6);}c.fillStyle="#6a7384";c.fillRect(px-u*3.6,py,u*8.8,u*.5);
    c.fillStyle="#7a8190";c.beginPath();c.moveTo(px+u*6,py);c.lineTo(px+u*6.5,py-u*3.4);c.lineTo(px+u*7.7,py-u*3.4);c.lineTo(px+u*8.2,py);c.closePath();c.fill();c.restore();};
  const house=(px,py,u,col)=>{const c=x();c.save();c.fillStyle=col||"#b8b0a0";c.fillRect(px,py-u*1.2,u*1.4,u*1.2);c.fillStyle="#7a6a5a";c.beginPath();c.moveTo(px-u*.1,py-u*1.2);c.lineTo(px+u*.7,py-u*1.9);c.lineTo(px+u*1.5,py-u*1.2);c.closePath();c.fill();c.restore();};

  const s0=(t)=>{photo(1,t,6.1,1.12,.3);const f=title(t,"TJERNOBYL","EN OLYCKA SOM FÖRÄNDRADE EUROPA","#c9d19a");cred(1,.55*f);};

  /* 1 · kraftverket, sedan Pripjat */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,15.4,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfd9e6"],[.7,"#e8eef4"],[.701,"#8a9a6a"],[1,"#6a7a4a"]]);const u=Math.max(10,Math.min(a.w*.03,s*.036));
      if(t<8.95){const q=eo((t-3)/1);c.globalAlpha=g*q;plant(cx-u*1.2,cy+u*1.2,u);tx("4 reaktorer",cx,a.y+a.h*.14,"#2a3a4a","center",Math.max(22,s*.06),700);tx("Tjernobyl · Ukraina (då Sovjetunionen)",cx,cy+u*3.6,"#2a3a4a","center",Math.max(14,s*.036),700);}
      else{const q=eo((t-9.2)/1);c.globalAlpha=g*q;plant(cx+a.w*.28,cy-s*.1,u*.45);for(let i=0;i<8;i++)house(cx-a.w*.3+i*u*2.2,cy+u*1.6+((i%2)*u*.8),u,"#b8b0a0");tx("Pripjat",cx-a.w*.12,cy-s*.04,"#2a3a4a","center",Math.max(20,s*.055),700);tx("byggd för arbetarna och deras familjer",cx,a.y+a.h*.88,"#2a3a4a","center",Math.max(14,s*.037),600);}
      c.restore();}};

  /* 2 · natten, utan skrämmande bilder: reaktor 4 markerad och en klocka */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(1,t,12.5,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0a1224"],[1,"#1d2540"]]);const u=Math.max(10,Math.min(a.w*.03,s*.036));
      tx("26 april 1986",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(26,s*.075),700);plant(cx-u*1.2,cy+u*1.4,u,t>5);
      if(t>5){c.globalAlpha=g*eo((t-5)/1);tx("reaktor 4",cx+u*3.9,cy+u*1.4-u*3.6,"#ffb878","center",Math.max(15,s*.04),700);}
      if(t>9.1){const q=eo((t-9.1)/1);c.globalAlpha=g*q*(.6+.4*Math.sin(t*6));const gr=c.createRadialGradient(cx+u*3.9,cy-u*.4,0,cx+u*3.9,cy-u*.4,u*4);gr.addColorStop(0,"rgba(255,140,40,.5)");gr.addColorStop(1,"rgba(255,140,40,0)");c.fillStyle=gr;c.beginPath();c.arc(cx+u*3.9,cy-u*.4,u*4,0,TAU);c.fill();c.globalAlpha=g*q;tx("2 explosioner · brand",cx,a.y+a.h*.9,"#fff","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 3 · molnet drar med vinden */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(1,t,7.3,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d1730"],[1,"#1a2a48"]]);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,sx=lx+w*.78,sy=cy+s*.12,ex=lx+w*.18,ey=cy-s*.12;
      dot(sx,sy,8,"#ffb878");tx("Tjernobyl",sx,sy+Math.max(28,s*.065),"#ffb878","center",Math.max(14,s*.036),700);dot(ex,ey,8,"#9fd0ff");tx("Sverige",ex,ey-Math.max(18,s*.04),"#9fd0ff","center",Math.max(14,s*.036),700);
      const k=eo((t-3)/3.4);const r=L.srand(4);for(let i=0;i<90;i++){const p=cl(k*(.4+r()*.7),0,1),px=lerp(sx,ex,p)+(r()-.5)*s*.2*p,py=lerp(sy,ey,p)+(r()-.5)*s*.16*p;c.fillStyle=`rgba(255,200,120,${.6*(1-p*.6)})`;c.beginPath();c.arc(px,py,2.5+p*3,0,TAU);c.fill();}
      c.strokeStyle="rgba(255,255,255,.5)";c.lineWidth=3;for(let i=0;i<3;i++){const yy=cy-s*.08+i*s*.08;c.beginPath();c.moveTo(cx+w*.25,yy+s*.1);c.lineTo(cx-w*.05,yy-s*.03);c.stroke();}tx("vinden",cx+w*.1,cy+s*.2,"rgba(255,255,255,.7)","center",Math.max(13,s*.034),600);
      c.restore();}};

  /* 4 · Forsmark larmar, tidslinje */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,14.8,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      if(t<5.7){const r=Math.max(50,Math.min(a.w*.14,s*.2)),py=cy+r*.3;c.strokeStyle="rgba(255,255,255,.6)";c.lineWidth=4;c.beginPath();c.arc(cx,py,r,Math.PI,TAU);c.stroke();for(let i=0;i<=6;i++){const an=Math.PI+i*Math.PI/6;c.beginPath();c.moveTo(cx+Math.cos(an)*r*.88,py+Math.sin(an)*r*.88);c.lineTo(cx+Math.cos(an)*r,py+Math.sin(an)*r);c.stroke();}
        const k=eo((t-3)/2),an=Math.PI+.2+k*Math.PI*.7+Math.sin(t*14)*.04;c.strokeStyle="#ff6a5e";c.lineWidth=5;c.beginPath();c.moveTo(cx,py);c.lineTo(cx+Math.cos(an)*r*.85,py+Math.sin(an)*r*.85);c.stroke();dot(cx,py,8,"#fff");
        tx("Forsmark",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(24,s*.07),700);tx("strålningsmätaren larmar",cx,py+Math.max(52,s*.11),"#cfd8ff","center",Math.max(15,s*.04),700);}
      else{const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy-s*.02;c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=3;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();
        [[.1,"26 april","olyckan","#ffb878"],[.5,"28 april, morgon","Forsmark larmar","#9fd0ff"],[.9,"28 april, kväll","Sovjetunionen berättar","#9be3b0"]].forEach(([p,d,n,col],i)=>{const q=eo((t-6-i*1.4)/.8);if(q<=0)return;c.globalAlpha=g*q;const px=lx+w*p;dot(px,y,9,col);tx(d,px,y-Math.max(22,s*.05),col,"center",Math.max(13,s*.034),700);tx(n,px,y+Math.max(34,s*.075),col,"center",Math.max(13,s*.034),600);});}
      c.restore();}};

  /* 5 · Pripjat tömdes: bussar och zonen */
  const bus=(px,py,u)=>{const c=x();c.save();c.fillStyle="#e8b030";c.fillRect(px,py-u*.9,u*2.4,u*.9);c.fillStyle="#2a3a4a";for(let i=0;i<4;i++)c.fillRect(px+u*.15+i*u*.55,py-u*.75,u*.4,u*.35);c.fillStyle="#222";c.beginPath();c.arc(px+u*.5,py,u*.2,0,TAU);c.arc(px+u*1.9,py,u*.2,0,TAU);c.fill();c.restore();};
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,12.7,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      if(t<9.1){grad(a,[[0,"#cfd9e6"],[.7,"#e8eef4"],[.701,"#5a5f68"],[1,"#3a3f48"]]);const u=Math.max(12,Math.min(a.w*.03,s*.036)),gy=cy+u*2;
        const k=cl((t-3)/5.5,0,1);for(let i=0;i<8;i++){const px=lerp(a.x-u*3,a.x+a.w+u*3,cl(k*1.6-i*.12,0,1));bus(px,gy,u*1.2);}
        const n=Math.round(50000*eo((t-3.4)/4));tx(n.toLocaleString("sv-SE").replace(/ /g," ")+" människor",cx,a.y+a.h*.14,"#1d2b53","center",Math.max(24,s*.07),700);tx("över 1 000 bussar",cx,gy+u*3,"#1d2b53","center",Math.max(15,s*.04),700);}
      else{grad(a,[[0,"#0d1730"],[1,"#1a2a48"]]);const R=Math.min(a.w*.3,a.h*.34),k=eo((t-9.3)/1.4);c.fillStyle="rgba(255,170,60,.12)";c.strokeStyle="#ffb878";c.setLineDash([8,8]);c.lineWidth=3;c.beginPath();c.arc(cx,cy,R*k,0,TAU);c.fill();c.stroke();c.setLineDash([]);dot(cx,cy,7,"#ffb878");tx("30 km",cx+R*.55,cy-R*.55,"#ffd86b","left",Math.max(17,s*.045),700);tx("hundratusentals flyttades",cx,a.y+a.h*.9,"#fff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 6 · skyddet: betong, sedan stålvalv */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,9.3,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfd9e6"],[.72,"#e8eef4"],[.721,"#8a9a6a"],[1,"#6a7a4a"]]);const gy=a.y+a.h*.72,u=Math.max(10,Math.min(a.w*.03,s*.036));
      c.fillStyle="#9aa3b3";c.fillRect(cx-u*3,gy-u*3,u*6,u*3);
      const kc=eo((t-3.4)/1.2);c.fillStyle="#b8b8b0";c.fillRect(cx-u*3.2,gy-u*3.2-u*.5*kc,u*6.4,u*.7*kc);c.fillRect(cx-u*3.3,gy-u*3,u*.5*kc,u*3);c.fillRect(cx+u*2.8,gy-u*3,u*.5*kc,u*3);
      if(t>4.6){const k=eo((t-4.6)/3.2);c.strokeStyle="#cfd5df";c.lineWidth=u*.5;c.beginPath();const rx=u*6.4,ry=u*5.8;c.ellipse(lerp(cx-a.w*.4,cx,k),gy,rx,ry,0,Math.PI,TAU);c.stroke();c.fillStyle="rgba(207,213,223,.28)";c.beginPath();c.ellipse(lerp(cx-a.w*.4,cx,k),gy,rx,ry,0,Math.PI,TAU);c.fill();}
      if(t>6.8){c.globalAlpha=g*eo((t-6.8)/1);tx("2016 · 108 m högt",cx,a.y+a.h*.1,"#2a3a4a","center",Math.max(20,s*.055),700);}
      c.restore();}};

  /* 7 · naturen tog tillbaka, men marken är kvar */
  const deer=(px,py,u,col)=>{const c=x();c.save();c.fillStyle=col;c.beginPath();c.ellipse(px,py-u*1.6,u*1.1,u*.6,0,0,TAU);c.fill();c.fillRect(px-u*.8,py-u*1.4,u*.18,u*1.4);c.fillRect(px+u*.6,py-u*1.4,u*.18,u*1.4);c.beginPath();c.ellipse(px+u*1.2,py-u*2.2,u*.4,u*.3,.3,0,TAU);c.fill();c.fillRect(px+u*.9,py-u*2.1,u*.22,u*.6);c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.moveTo(px+u*1.2,py-u*2.5);c.lineTo(px+u*1.1,py-u*3);c.moveTo(px+u*1.3,py-u*2.5);c.lineTo(px+u*1.5,py-u*3);c.stroke();c.restore();};
  const wolf=(px,py,u,col)=>{const c=x();c.save();c.fillStyle=col;c.beginPath();c.ellipse(px,py-u*1.1,u*1.2,u*.55,0,0,TAU);c.fill();c.fillRect(px-u*.9,py-u*1,u*.2,u);c.fillRect(px+u*.7,py-u*1,u*.2,u);c.beginPath();c.moveTo(px+u*1.1,py-u*1.6);c.lineTo(px+u*1.9,py-u*1.3);c.lineTo(px+u*1.1,py-u*1);c.closePath();c.fill();c.beginPath();c.moveTo(px-u*1.1,py-u*1.2);c.quadraticCurveTo(px-u*2,py-u*1.4,px-u*2.1,py-u*.7);c.lineTo(px-u*1.7,py-u*1.1);c.closePath();c.fill();c.restore();};
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(7,t,14.2,1.1,.15+.5*g);cred(7,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfe3d0"],[.7,"#e6f0e0"],[.701,"#6f9a4a"],[1,"#4a7a3a"]]);const gy=a.y+a.h*.72,u=Math.max(12,Math.min(a.w*.028,s*.034));
      for(let i=0;i<6;i++){c.fillStyle="#3a6a3a";c.beginPath();c.moveTo(a.x+a.w*(.08+i*.17),gy);c.lineTo(a.x+a.w*(.1+i*.17),gy-u*4);c.lineTo(a.x+a.w*(.12+i*.17),gy);c.closePath();c.fill();}
      const q=eo((t-3)/1);c.globalAlpha=g*q;wolf(cx-a.w*.22,gy+u*.3,u*1.3,"#4a4a50");deer(cx+a.w*.02+Math.sin(t*.4)*8,gy+u*.3,u*1.3,"#7a5a3a");deer(cx+a.w*.2,gy+u*.4,u*1.1,"#8a6a4a");
      tx("vargar, rådjur, vildhästar",cx,a.y+a.h*.12,"#1d3a1d","center",Math.max(20,s*.055),700);
      if(t>8.6){c.globalAlpha=g*eo((t-8.6)/1);const ty=a.y+a.h*.85,tr=Math.max(20,s*.05);c.fillStyle="#ffd23c";c.strokeStyle="#7a3a00";c.lineWidth=3;c.beginPath();c.moveTo(cx-a.w*.28,ty-tr);c.lineTo(cx-a.w*.28+tr*1.1,ty+tr*.8);c.lineTo(cx-a.w*.28-tr*1.1,ty+tr*.8);c.closePath();c.fill();c.stroke();tx("!",cx-a.w*.28,ty+tr*.5,"#7a3a00","center",Math.max(22,tr),700);tx("ämnen kvar i marken: avspärrat",cx+tr*.2,ty+tr*.3,"#1d2b53","center",Math.max(15,s*.04),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
