/* Varför är himlen blå?: minilektionen som film (åtta scener, ca 1,4 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/himlen/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/himlen-1..6.jpg. MPHimlenFilm.start(host,{overlay,onClose}). Ljudmatta: tradgarden. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.2,cap:[[0.5,"Varför är himlen blå, och solnedgången röd? Det här är berättelsen om himlens färger."]]},
 {k:"01 · Solljus är alla färger",d:7,cap:[[0.8,"Solens ljus ser vitt ut, men det innehåller alla regnbågens färger blandade."]]},
 {k:"02 · Ljus som vågor",d:7.8,cap:[[0.8,"Varje färg är en ljusvåg. Blått ljus har korta vågor, och rött ljus har långa vågor."]]},
 {k:"03 · Luften sprider ljuset",d:15.8,cap:[[0.8,"Ljuset träffar luftens små molekyler. De sprider det korta blå ljuset åt alla håll, ungefär sex gånger mer än det röda."],[9.6,"Det upptäcktes av den brittiske forskaren Lord Rayleigh, på 1870-talet."]]},
 {k:"04 · Blått överallt",d:15.4,cap:[[0.8,"Det blå ljuset kommer alltså från hela himlen, åt alla håll. Därför ser himlen blå ut, vart du än tittar."],[9.0,"Violett sprids ännu mer, men solen ger mindre violett, och våra ögon ser det sämre."]]},
 {k:"05 · Röd solnedgång",d:9.8,cap:[[0.8,"När solen står lågt, går ljuset en längre väg genom luften. Det mesta blåa sprids bort, och rött och orange blir kvar."]]},
 {k:"06 · Svart i rymden",d:8.5,cap:[[0.8,"Uppe i rymden finns ingen luft som sprider ljuset. Därför är himlen svart där, även mitt på dagen."]]},
 {k:"07 · Mars",d:6.2,cap:[[0.8,"På Mars är dagshimlen rödaktig av damm, men solnedgången där är blå."]]}
];
const META={mat:"tradgarden",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Varför är himlen blå?",under:"En film i åtta steg · ca 1,4 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Himlens färger berättar hur ljus och luft samspelar. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Mundoo · CC BY-SA 4.0 · Wikimedia Commons",2:"Pittigrilli · CC BY-SA 4.0 · Wikimedia Commons",3:"Basile Morin · CC BY-SA 4.0 · Wikimedia Commons",4:"Zarerh · CC BY-SA 4.0 · Wikimedia Commons",5:"Gerda Arendt · CC0 · Wikimedia Commons",6:"NASA · Public domain · Wikimedia Commons"};

window.MPHimlenFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"himlen",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"himlen-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const wave=(lx,w,y,amp,cycles,t,col,lw)=>{const c=x();c.save();c.strokeStyle=col;c.lineWidth=lw||4;c.beginPath();for(let i=0;i<=160;i++){const q=i/160,X=lx+q*w,Y=y+Math.sin(q*TAU*cycles-t*3)*amp;i?c.lineTo(X,Y):c.moveTo(X,Y);}c.stroke();c.restore();};

  const s0=(t)=>{photo(4,t,7.2,1.12,.3);const f=title(t,"HIMLENS FÄRGER","VARFÖR BLÅ OCH VARFÖR RÖD","#cfe8ff");cred(4,.55*f);};

  /* 1 · vitt ljus delas i regnbågens färger */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,7,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0a1224"],[1,"#162240"]]);const w=Math.min(a.w*.7,s*1.3),lx=cx-w/2,pw=Math.max(60,s*.14);
      c.strokeStyle="#fff";c.lineWidth=8;c.beginPath();c.moveTo(lx,cy);c.lineTo(cx-pw*.2,cy);c.stroke();
      c.fillStyle="rgba(200,230,255,.35)";c.strokeStyle="rgba(255,255,255,.8)";c.lineWidth=3;c.beginPath();c.moveTo(cx-pw*.6,cy+pw*.6);c.lineTo(cx,cy-pw*.7);c.lineTo(cx+pw*.6,cy+pw*.6);c.closePath();c.fill();c.stroke();
      const k=eo((t-3.4)/2),cols=["#ff3a3a","#ff9a3a","#ffe23a","#3acf5a","#3a9aff","#4a5aff","#9a5aff"];cols.forEach((col,i)=>{const an=(-.35+i*.1)*1,len=w*.5*k;c.strokeStyle=col;c.lineWidth=6;c.beginPath();c.moveTo(cx+pw*.25,cy);c.lineTo(cx+pw*.25+Math.cos(an)*len,cy+Math.sin(an)*len+i*0);c.stroke();});
      tx("vitt ljus = alla färger",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(20,s*.055),700);
      c.restore();}};

  /* 2 · blått: korta vågor, rött: långa */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,7.8,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0a1224"],[1,"#162240"]]);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,amp=Math.max(16,s*.045);
      const q1=eo((t-3)/.8),q2=eo((t-4.6)/.8);c.globalAlpha=g*q1;wave(lx,w,cy-s*.12,amp,14,t,"#4a8aff",4);tx("blått: korta vågor",lx,cy-s*.12-amp-Math.max(12,s*.03),"#7aaaff","left",Math.max(16,s*.042),700);
      c.globalAlpha=g*q2;wave(lx,w,cy+s*.14,amp,5,t,"#ff4a3a",4);tx("rött: långa vågor",lx,cy+s*.14-amp-Math.max(12,s*.03),"#ff8a7a","left",Math.max(16,s*.042),700);
      c.restore();}};

  /* 3 · luftens molekyler sprider blått */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,15.8,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0a1224"],[1,"#162240"]]);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy;
      const r=L.srand(5);c.fillStyle="rgba(200,220,255,.5)";for(let i=0;i<40;i++)dot(lx+w*.35+r()*w*.3,y-s*.25+r()*s*.5,Math.max(3,s*.008),"rgba(200,220,255,.55)");
      c.strokeStyle="#ff4a3a";c.lineWidth=5;c.beginPath();c.moveTo(lx,y+s*.02);c.lineTo(lx+w,y+s*.02);c.stroke();
      c.strokeStyle="#4a8aff";c.lineWidth=5;c.beginPath();c.moveTo(lx,y-s*.02);c.lineTo(lx+w*.5,y-s*.02);c.stroke();
      const k=eo((t-3.6)/1.6);for(let i=0;i<9;i++){const an=-Math.PI/2+i*(Math.PI/8)-Math.PI*.1;c.globalAlpha=g*k;c.beginPath();c.moveTo(lx+w*.5,y-s*.02);c.lineTo(lx+w*.5+Math.cos(an)*s*.22*k,y-s*.02+Math.sin(an)*s*.22*k);c.stroke();}
      c.globalAlpha=g;tx("blått sprids åt alla håll",lx+w*.5,a.y+a.h*.14,"#7aaaff","center",Math.max(16,s*.042),700);tx("rött går rakt igenom",lx+w*.85,y+s*.14,"#ff8a7a","center",Math.max(14,s*.037),700);
      if(t>9.6){c.globalAlpha=g*eo((t-9.6)/1);tx("Lord Rayleigh · 1870-talet",cx,a.y+a.h*.9,"#ffd86b","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 4 · blått från hela himlen, violett */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,15.4,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;const R=Math.min(a.w*.36,a.h*.7,s*.7),gx=cx,gy=a.y+a.h*.88;
      const gr=c.createRadialGradient(gx,gy,R*.1,gx,gy,R*1.1);gr.addColorStop(0,"#9fd0ff");gr.addColorStop(1,"#2a73c8");c.fillStyle=gr;c.beginPath();c.arc(gx,gy,R,Math.PI,TAU);c.fill();
      c.fillStyle="#3a6a3a";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);dot(gx,gy-Math.max(10,s*.026),Math.max(7,s*.018),"#fff");
      const k=eo((t-3.2)/1.5);c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=3;for(let i=0;i<9;i++){const an=Math.PI+.2+i*(Math.PI-.4)/8;const ex=gx+Math.cos(an)*R*.8,ey=gy+Math.sin(an)*R*.8;c.beginPath();c.moveTo(ex,ey);c.lineTo(lerp(ex,gx,.15*k),lerp(ey,gy-12,.15*k));c.stroke();}
      tx("blått ljus från alla håll",cx,a.y+a.h*.1,"#fff","center",Math.max(19,s*.052),700);
      if(t>9){const q=eo((t-9)/1),w=Math.min(a.w*.3,s*.5);c.globalAlpha=g*q;c.fillStyle="rgba(10,18,36,.85)";c.fillRect(cx-w*.9,a.y+a.h*.2,w*1.8,Math.max(70,s*.16));tx("solens violetta ljus: lite",cx,a.y+a.h*.2+Math.max(26,s*.06),"#b88aff","center",Math.max(14,s*.037),700);tx("ögats känslighet för violett: låg",cx,a.y+a.h*.2+Math.max(54,s*.12),"#b88aff","center",Math.max(14,s*.037),700);}
      c.restore();}};

  /* 5 · solnedgång: lång väg genom luften */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,9.8,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0a1224"],[1,"#162240"]]);const R=Math.min(a.w*.45,s*.8),ex=cx,ey=cy+s*.5;
      c.strokeStyle="rgba(120,180,255,.6)";c.lineWidth=Math.max(10,s*.03);c.beginPath();c.arc(ex,ey,R,Math.PI*1.05,Math.PI*1.95);c.stroke();c.fillStyle="#1d5fb8";c.beginPath();c.arc(ex,ey,R-Math.max(12,s*.035),0,TAU);c.fill();
      const k=eo((t-3)/2);const sunAn=lerp(Math.PI*1.5,Math.PI*1.1,k);const sx=ex+Math.cos(sunAn)*R*1.5,sy=ey+Math.sin(sunAn)*R*1.5;dot(sx,sy,Math.max(12,s*.03),"#ffd23c");
      const px=ex+Math.cos(Math.PI*1.5)*(R-Math.max(12,s*.035)),py=ey+Math.sin(Math.PI*1.5)*(R-Math.max(12,s*.035));const grd=c.createLinearGradient(sx,sy,px,py);grd.addColorStop(0,"#fff");grd.addColorStop(.5,"#ffb050");grd.addColorStop(1,"#ff4a3a");c.strokeStyle=grd;c.lineWidth=5;c.beginPath();c.moveTo(sx,sy);c.lineTo(px,py);c.stroke();dot(px,py,6,"#fff");
      tx(k>.6?"lång väg: blått sprids bort":"kort väg: blått kvar",cx,a.y+a.h*.1,k>.6?"#ffb878":"#9fd0ff","center",Math.max(18,s*.048),700);
      c.restore();}};

  /* 6 · rymden: svart himmel */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,8.5,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const R=Math.min(a.w*.5,a.h*.8,s*.9),ex=cx,ey=a.y+a.h+R*.5;
      const gr=c.createRadialGradient(ex,ey,R*.9,ex,ey,R*1.06);gr.addColorStop(0,"rgba(120,180,255,.9)");gr.addColorStop(1,"rgba(120,180,255,0)");c.fillStyle=gr;c.beginPath();c.arc(ex,ey,R*1.06,0,TAU);c.fill();c.fillStyle="#1d5fb8";c.beginPath();c.arc(ex,ey,R,0,TAU);c.fill();
      dot(a.x+a.w*.82,a.y+a.h*.2,Math.max(16,s*.04),"#ffd23c");tx("solen lyser, himlen är svart",cx,a.y+a.h*.12,"#fff","center",Math.max(19,s*.052),700);
      c.restore();}};

  /* 7 · Mars: rödaktig dag, blå solnedgång */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(5,t,6.2,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;const w=Math.min(a.w*.34,s*.6),h=Math.min(a.h*.5,s*.7),lx=cx-w*.6,rx=cx+w*.6;
      [[lx,"dag",["#d9a070","#e8c090"],"#e8c090"],[rx,"solnedgång",["#3a5a9a","#8aa8e0"],"#bcd8ff"]].forEach(([px,n,cs,sun],i)=>{const q=eo((t-2.8-i*.9)/.8);if(q<=0)return;c.save();c.globalAlpha=g*q;const gr=c.createLinearGradient(0,cy-h/2,0,cy+h/2);gr.addColorStop(0,cs[0]);gr.addColorStop(1,cs[1]);c.fillStyle=gr;c.fillRect(px-w/2,cy-h/2,w,h);c.fillStyle="#5a3a28";c.fillRect(px-w/2,cy+h*.28,w,h*.22);dot(px+(i?w*.25:0),cy+h*.15-(i?0:h*.3),Math.max(12,w*.07),sun);tx(n,px,cy+h/2+Math.max(26,s*.06),"#fff","center",Math.max(15,s*.04),700);c.restore();});
      tx("Mars",cx,a.y+a.h*.1,"#ffb878","center",Math.max(24,s*.07),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
