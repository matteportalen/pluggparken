/* Mörk materia: minilektionen som film (åtta scener, ca 2 minuter), bilder från NASA/ESA m.fl. ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/morkmateria/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/morkmateria-1..6.jpg. MPMorkMateriaFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.4,cap:[[0.5,"Nästan allt i universum är osynligt. Det här är berättelsen om mörk materia."]]},
 {k:"01 · Det vi ser",d:8.7,cap:[[0.8,"Allt vi ser i rymden, stjärnor, planeter och gas, är bara ungefär 5 procent av universum."]]},
 {k:"02 · Osynlig",d:12.5,cap:[[0.8,"Ungefär 27 procent är mörk materia. Vi kan inte se den, men vi vet att den finns."],[6.9,"Resten, ungefär 68 procent, kallas mörk energi."]]},
 {k:"03 · Galaxer snurrar för fort",d:14.6,cap:[[0.8,"Galaxer snurrar så fort att de borde flyga isär. Något osynligt måste hålla dem ihop."],[7.3,"Redan år 1933 misstänkte astronomen Fritz Zwicky att något saknades."]]},
 {k:"04 · Vera Rubin",d:14.7,cap:[[0.8,"Den amerikanska astronomen Vera Rubin mätte det här på 1970-talet."],[6.5,"Hon mätte hur fort stjärnor går runt i galaxer, även långt från mitten, och övertygade många forskare."]]},
 {k:"05 · Böjer ljuset",d:11.3,cap:[[0.8,"Mörk materia ger inget ljus, men dess tyngdkraft böjer ljuset från galaxer bakom den."],[7.0,"Så kan forskare kartlägga mörk materia, fast den är osynlig."]]},
 {k:"06 · Kulhopen",d:11.1,cap:[[0.8,"I en galaxhop som kallas Kulhopen har två galaxhopar kolliderat. Gasen bromsades upp, men den mörka materian gled rakt igenom."]]},
 {k:"07 · En gåta",d:11.2,cap:[[0.8,"Ingen vet ännu vad mörk materia är gjord av. Det är en av vetenskapens största gåtor."],[7.0,"Experiment djupt under jorden letar efter partiklarna."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Mörk materia",under:"En film i åtta steg · ca 2 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Det mesta av universum är fortfarande ett mysterium. Filmen bygger på bilder från NASA, ESA och andra ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Bild: NASA, ESA, S. Beckwith (STScI) m.fl. (Hubble Ultra Deep Field) · Public domain · Wikimedia Commons",2:"Bild: NASA/Planck (universums innehåll) · Public domain · Wikimedia Commons",3:"Foto: Adam Evans (Andromedagalaxen) · CC BY 2.0 · Wikimedia Commons",4:"Foto: Rubin Obs./NSF/AURA (Vera C. Rubin) · CC BY 4.0 · Wikimedia Commons",5:"Bild: NASA, N. Benitez m.fl. (gravitationslins Abell 1689) · Public domain · Wikimedia Commons",6:"Bild: NASA/CXC/CfA/Markevitch m.fl. (Kulhopen) · Public domain · Wikimedia Commons"};

window.MPMorkMateriaFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"morkmateria",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"morkmateria-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  /* galaxskiva sedd ovanifrån: stjärnor på cirklar, vinkelfart v(r) */
  const galaxy=(px,py,R,t,vfun,col,n)=>{const r=L.srand(9);for(let i=0;i<n;i++){const rr=Math.sqrt(r())*R,an=r()*TAU+vfun(rr/R)*t;const sx=px+Math.cos(an+rr/R*3)*rr,sy=py+Math.sin(an+rr/R*3)*rr*.55;dot(sx,sy,1.6,col(rr/R));}};
  const glow=(px,py,r,col)=>{const c=x();const g=c.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};

  const s0=(t)=>{photo(1,t,6.4,1.12,.3);const f=title(t,"MÖRK MATERIA","NÄSTAN ALLT ÄR OSYNLIGT","#c9b6ff");cred(1,.55*f);};

  /* 1 · bara 5 procent syns */
  const pie=(px,py,r,parts,k)=>{const c=x();c.save();let a0=-Math.PI/2;parts.forEach(([v,col])=>{const a1=a0+v/100*TAU*k;c.fillStyle=col;c.beginPath();c.moveTo(px,py);c.arc(px,py,r,a0,a1);c.closePath();c.fill();a0=a1;});c.restore();};
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,8.7,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const r=Math.max(40,Math.min(a.w*.2,a.h*.3,s*.34)),k=eo((t-3)/1.6);
      c.fillStyle="rgba(60,60,90,.55)";c.beginPath();c.arc(cx,cy,r,0,TAU);c.fill();
      pie(cx,cy,r,[[5,"#ffd23c"]],k);
      tx("5 %",cx+r*1.2,cy-r*.6,"#ffd86b","left",Math.max(28,s*.08),700);tx("det vi ser",cx+r*1.2,cy-r*.6+Math.max(32,s*.07),"#ffd86b","left",Math.max(15,s*.04),600);
      tx("stjärnor, planeter, gas",cx,a.y+a.h*.9,"#cfd8ff","center",Math.max(15,s*.04),600);
      c.restore();}};

  /* 2 · 27 procent mörk materia, 68 procent mörk energi */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,12.5,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const r=Math.max(40,Math.min(a.w*.2,a.h*.3,s*.34));
      c.fillStyle="rgba(60,60,90,.35)";c.beginPath();c.arc(cx,cy,r,0,TAU);c.fill();
      const k1=eo((t-2.6)/1.2),k2=eo((t-7.2)/1.8);
      let a0=-Math.PI/2;const slice=(v,col,k)=>{c.fillStyle=col;c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,r,a0,a0+v/100*TAU*k);c.closePath();c.fill();return a0+v/100*TAU;};
      a0=slice(5,"#ffd23c",1);a0=slice(27,"#8a5fe0",k1);
      if(t>7.2){slice(68,"#2a73c8",k2);}
      tx("5 %  syns",cx-r*1.15,cy-r*.5,"#ffd86b","right",Math.max(16,s*.042),700);
      if(t>3){c.globalAlpha=g*eo((t-3)/1);tx("27 %  mörk materia",cx+r*1.15,cy-r*.5,"#c9b6ff","left",Math.max(16,s*.042),700);}
      if(t>7.2){c.globalAlpha=g*eo((t-7.2)/1);tx("68 %  mörk energi",cx,cy+r+Math.max(34,s*.08),"#9fd0ff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 3 · galaxer snurrar för fort */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,14.6,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const R=Math.min(a.w*.3,s*.5);
      const showHalo=t>4.6,hk=eo((t-4.6)/1.5);
      glow(cx,cy,R*.5,"rgba(255,220,140,.5)");
      galaxy(cx,cy,R,t,(q)=>.9,(q)=>q<.3?"#ffe6a8":"#9fd0ff",260);
      if(t<4.6){tx("de ytterst fastnar inte",cx,a.y+a.h*.86,"#ffb0a0","center",Math.max(15,s*.04),600);}
      else{c.save();c.globalAlpha=g*hk*.35;glow(cx,cy,R*1.5,"rgba(140,90,230,.9)");c.restore();c.globalAlpha=g*hk;tx("osynlig mörk materia håller dem ihop",cx,a.y+a.h*.86,"#c9b6ff","center",Math.max(15,s*.04),700);}
      tx("Galaxen snurrar",cx,a.y+a.h*.12,"#fff","center",Math.max(18,s*.048),700);
      if(t>7.3){c.globalAlpha=g*eo((t-7.3)/1);tx("1933 · Fritz Zwicky",cx,a.y+a.h*.2,"#ffd86b","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 4 · Vera Rubin: rotationskurvan */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,14.7,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);const w=Math.min(a.w*.72,s*1.3),h=Math.min(a.h*.5,s*.6),lx=cx-w/2,y0=cy+h*.55;
      tx("1970-talet · Vera Rubin",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(20,s*.055),700);
      c.strokeStyle="rgba(255,255,255,.6)";c.lineWidth=2;c.beginPath();c.moveTo(lx,y0-h);c.lineTo(lx,y0);c.lineTo(lx+w,y0);c.stroke();
      tx("fart",lx-10,y0-h*.5,"#cfd8ff","right",Math.max(12,s*.03),600);tx("avstånd från mitten",lx+w/2,y0+Math.max(26,s*.06),"#cfd8ff","center",Math.max(12,s*.03),600);
      if(t>6.6){const k=eo((t-6.6)/1.6);c.strokeStyle="#ff9a8a";c.setLineDash([8,6]);c.lineWidth=3;c.beginPath();for(let i=0;i<=40*k;i++){const q=i/40,v=Math.sqrt(Math.min(q,.2)/.2)*(q<.2?1:(.2/q)**.5);const X=lx+q*w,Y=y0-v*h*.8;i?c.lineTo(X,Y):c.moveTo(X,Y);}c.stroke();c.setLineDash([]);tx("väntat",lx+w*.8,y0-h*.25,"#ff9a8a","left",Math.max(14,s*.037),700);}
      if(t>9.2){const k=eo((t-9.2)/1.6);c.strokeStyle="#9be3b0";c.lineWidth=4;c.beginPath();for(let i=0;i<=40*k;i++){const q=i/40,v=q<.2?Math.sqrt(q/.2):1;const X=lx+q*w,Y=y0-v*h*.8;i?c.lineTo(X,Y):c.moveTo(X,Y);}c.stroke();tx("uppmätt",lx+w*.8,y0-h*.88,"#9be3b0","left",Math.max(14,s*.037),700);}
      c.restore();}};

  /* 5 · gravitationslins */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,11.3,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,gx=cx,gy=cy,r=Math.max(20,s*.06);
      glow(gx,gy,r*3,"rgba(140,90,230,.55)");dot(gx,gy,r*.4,"rgba(150,110,230,.5)");tx("mörk materia",gx,gy+r*2.6,"#c9b6ff","center",Math.max(13,s*.034),700);
      const bx=lx+w*.95,by=gy,k=eo((t-3.2)/1.4);dot(bx,by,Math.max(8,s*.02),"#ffd23c");tx("galax bakom",bx,by+Math.max(30,s*.07),"#ffd86b","center",Math.max(12,s*.03),700);
      const ex=lx+w*.02;dot(ex,by,5,"#fff");tx("vi",ex,by+Math.max(26,s*.06),"#fff","center",Math.max(12,s*.03),700);
      [[-1,"#ffe27a"],[1,"#ffe27a"]].forEach(([sd,col])=>{c.strokeStyle=col;c.lineWidth=2.5;c.beginPath();c.moveTo(bx,by);c.quadraticCurveTo(gx,gy+sd*r*3.6,lerp(bx,ex,k),lerp(by,by,k));
        c.stroke();});
      c.restore();}};

  /* 6 · Kulhopen */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,11.1,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const w=Math.min(a.w*.78,s*1.45),lx=cx-w/2,y=cy,k=eo((t-3)/3),sep=k*w*.18;
      const gasx=cx,gasr=Math.max(20,s*.06);
      [[-1],[1]].forEach(([sd])=>{glow(cx+sd*(w*.28+sep),y,gasr*3.2,"rgba(140,90,230,.7)");});
      glow(cx-(1-k)*w*.12,y,gasr*2.6,"rgba(255,110,160,.75)");glow(cx+(1-k)*w*.12,y,gasr*2.6,"rgba(255,110,160,.75)");
      tx("gas",cx,y-gasr*3.2,"#ff9ac0","center",Math.max(14,s*.036),700);tx("mörk materia",cx-w*.28-sep,y+gasr*3.7,"#c9b6ff","center",Math.max(13,s*.034),700);tx("mörk materia",cx+w*.28+sep,y+gasr*3.7,"#c9b6ff","center",Math.max(13,s*.034),700);
      if(t>6.5){c.globalAlpha=g*eo((t-6.5)/1);tx("gasen bromsas, mörk materia glider förbi",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 7 · en gåta: frågetecken, detektor under jorden */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(1,t,11.2,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      if(t<7){space(a,1);glow(cx,cy,Math.min(a.w,a.h)*.4,"rgba(140,90,230,.55)");tx("?",cx,cy+s*.12,"#fff","center",Math.max(120,s*.38),700);tx("vad är den gjord av?",cx,a.y+a.h*.88,"#c9b6ff","center",Math.max(17,s*.045),700);}
      else{grad(a,[[0,"#8fb8e8"],[.35,"#cfe6fb"],[.351,"#5a4636"],[1,"#2a2018"]]);const gy=a.y+a.h*.35;c.fillStyle="#7fbf6a";c.fillRect(a.x,gy-6,a.w,10);const dx=cx,dy=a.y+a.h*.74,r=Math.max(26,s*.07);c.fillStyle="#1d2b53";c.fillRect(dx-r,dy-r*1.1,r*2,r*2.2);c.strokeStyle="#9fd0ff";c.lineWidth=3;c.strokeRect(dx-r,dy-r*1.1,r*2,r*2.2);glow(dx,dy,r*1.2,"rgba(140,90,230,.7)");
        tx("detektor långt under jorden",cx,dy+r*1.9,"#fff","center",Math.max(15,s*.04),700);tx("↓ djupt nere",cx,gy+Math.max(36,s*.08),"#e8dcc4","center",Math.max(13,s*.034),600);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
