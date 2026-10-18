/* Smaklökarna: minilektionen som film (åtta scener, ca 1,5 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/smaklokar/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/smaklokar-1..6.jpg. MPSmaklokarFilm.start(host,{overlay,onClose}). Ljudmatta: tradgarden. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.8,cap:[[0.5,"Din tunga har tusentals små sensorer. Det här är berättelsen om smaklökarna."]]},
 {k:"01 · Tusentals smaklökar",d:9.3,cap:[[0.8,"På tungan sitter ungefär 2 000 till 10 000 smaklökar. De byts ut ungefär var tionde till fjortonde dag."]]},
 {k:"02 · Fem grundsmaker",d:14.5,cap:[[0.8,"Vi känner sött, surt, salt, bittert och umami."],[5.4,"Umami är smaken av till exempel parmesan och soja. Den upptäcktes av en japansk forskare, år 1908."]]},
 {k:"03 · Tungkartan stämmer inte",d:10,cap:[[0.8,"Man trodde att varje smak sitter på sin del av tungan. Det är fel. Alla smaker kan kännas på hela tungan."]]},
 {k:"04 · Mest lukt",d:8.1,cap:[[0.8,"Det mesta av det vi kallar smak är egentligen lukt. Håller du för näsan blir maten mycket blekare."]]},
 {k:"05 · Chili",d:14.4,cap:[[0.8,"Chili ger inte en smak, utan en smärtsignal. Ämnet capsaicin aktiverar nerver som tror att munnen är het."],[9.2,"Fåglar känner inte av capsaicin, så de kan äta chili utan problem."]]},
 {k:"06 · Mint",d:7.9,cap:[[0.8,"Menthol i mynta aktiverar nerver som känner kyla. Munnen blir inte kallare, men hjärnan tror det."]]},
 {k:"07 · Mirakelbär",d:10,cap:[[0.8,"Mirakelbäret från Västafrika gör att sur mat smakar sött i ungefär en halvtimme."],[6.6,"Du kan äta en citron som om det vore godis."]]}
];
const META={mat:"tradgarden",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Smaklökarna",under:"En film i åtta steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Tungan och näsan lurar hjärnan hela tiden. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Saurabh R. Patil · CC BY-SA 3.0 · Wikimedia Commons",2:"OpenStax · CC BY-SA 3.0 · Wikimedia Commons",3:"Ana Marcos · CC BY 4.0 · Wikimedia Commons",4:"Rotadefterim · CC BY-SA 4.0 · Wikimedia Commons",5:"Commonists · CC BY-SA 4.0 · Wikimedia Commons",6:"MiracleFruitFarm · CC BY-SA 3.0 · Wikimedia Commons"};

window.MPSmaklokarFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"smaklokar",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"smaklokar-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const frame=(n,px,py,w,h)=>{const c=x(),im=L.img(n);if(!L.ok(im))return;const ir=im.width/im.height,fr=w/h;let sw,sh,sx,sy;if(ir>fr){sh=im.height;sw=sh*fr;sx=(im.width-sw)/2;sy=0;}else{sw=im.width;sh=sw/fr;sx=0;sy=(im.height-sh)/2;}
    c.save();c.shadowColor="rgba(0,0,0,.35)";c.shadowBlur=24;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,16):c.rect(px-w/2,py-h/2,w,h);c.fillStyle="#fff";c.fill();c.shadowBlur=0;c.clip();c.drawImage(im,sx,sy,sw,sh,px-w/2,py-h/2,w,h);c.restore();c.save();c.strokeStyle="rgba(255,255,255,.9)";c.lineWidth=4;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,16):c.rect(px-w/2,py-h/2,w,h);c.stroke();c.restore();};
  /* tunga sedd ovanifrån: avlång rundad form, mittfåra */
  const tongue=(px,py,w,h,col)=>{const c=x();c.save();c.fillStyle=col||"#e07a8a";c.beginPath();c.moveTo(px-w*.38,py-h*.45);c.quadraticCurveTo(px-w*.5,py+h*.1,px-w*.28,py+h*.42);c.quadraticCurveTo(px,py+h*.62,px+w*.28,py+h*.42);c.quadraticCurveTo(px+w*.5,py+h*.1,px+w*.38,py-h*.45);c.quadraticCurveTo(px,py-h*.55,px-w*.38,py-h*.45);c.closePath();c.fill();c.strokeStyle="rgba(120,40,60,.5)";c.lineWidth=Math.max(2,w*.012);c.beginPath();c.moveTo(px,py-h*.4);c.lineTo(px,py+h*.2);c.stroke();c.restore();};

  const s0=(t)=>{photo(1,t,6.8,1.12,.3);const f=title(t,"SMAKLÖKARNA","TUNGANS SMÅ SENSORER","#ffc0cc");cred(1,.55*f);};

  /* 1 · tusentals smaklökar, byts ut var 10:e–14:e dag */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,9.3,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a1820"],[1,"#3a2028"]]);const w=Math.min(a.w*.3,s*.5),h=Math.min(a.h*.6,s*.75);tongue(cx,cy,w,h);
      const r=L.srand(4),n=Math.floor(120*eo((t-3)/2.5));for(let i=0;i<n;i++){const an=r()*TAU,d=Math.sqrt(r())*.9,px=cx+Math.cos(an)*d*w*.3,py=cy+Math.sin(an)*d*h*.38+h*.02;dot(px,py,Math.max(2,w*.012),"rgba(255,230,160,.85)");}
      tx("2 000 – 10 000 smaklökar",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(19,s*.052),700);
      if(t>6){c.globalAlpha=g*eo((t-6)/1);tx("nya var 10:e–14:e dag",cx,a.y+a.h*.92,"#9be3b0","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 2 · fem grundsmaker, umami 1908 */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,14.5,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a1820"],[1,"#3a2028"]]);const w=Math.max(80,Math.min(a.w*.17,s*.28)),h=w*.9,names=[["sött","#ff9ac0"],["surt","#ffe27a"],["salt","#9fd0ff"],["bittert","#9be3b0"],["umami","#ffb878"]];
      names.forEach(([n,col],i)=>{const q=eo((t-2.8-i*.35)/.6);if(q<=0)return;const px=cx+(i-2)*w*1.1;c.save();c.globalAlpha=g*q*(i===4&&t>5.4?1:i===4?1:1);c.fillStyle="rgba(255,255,255,.07)";c.strokeStyle=col;c.lineWidth=i===4&&t>5.4?5:3;c.fillRect(px-w/2,cy-h/2,w,h);c.strokeRect(px-w/2,cy-h/2,w,h);tx(n,px,cy+h*.1,col,"center",Math.max(15,w*.2),700);c.restore();});
      if(t>5.4){c.globalAlpha=g*eo((t-5.4)/1);tx("umami · 1908 · japansk forskare",cx,cy+h*.9,"#ffd86b","center",Math.max(16,s*.042),700);tx("parmesan, soja",cx,cy+h*.9+Math.max(34,s*.075),"#cfd8ff","center",Math.max(14,s*.037),600);}
      c.restore();}};

  /* 3 · tungkartan stämmer inte */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,10,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a1820"],[1,"#3a2028"]]);const w=Math.min(a.w*.28,s*.46),h=Math.min(a.h*.6,s*.72),lx=cx-a.w*.2,rx=cx+a.w*.2;
      c.save();tongue(lx,cy,w,h,"#e07a8a");const bands=[["sött","#ff9ac0",-.32],["salt","#9fd0ff",-.1],["surt","#ffe27a",.1],["bittert","#9be3b0",.32]];bands.forEach(([n,col,o])=>{c.globalAlpha=g*.55;c.fillStyle=col;c.fillRect(lx-w*.35,cy+o*h-h*.09,w*.7,h*.18);c.globalAlpha=g;tx(n,lx,cy+o*h+4,"#222","center",Math.max(13,w*.1),700);});
      if(t>5){const k=eo((t-5)/.8);c.globalAlpha=g*k;c.strokeStyle="#ff3a3a";c.lineWidth=8;c.beginPath();c.moveTo(lx-w*.5,cy-h*.5);c.lineTo(lx+w*.5,cy+h*.5);c.moveTo(lx+w*.5,cy-h*.5);c.lineTo(lx-w*.5,cy+h*.5);c.stroke();}c.restore();
      tx("gamla tungkartan",lx,a.y+a.h*.1,"#ff9a8a","center",Math.max(15,s*.04),700);
      if(t>6.5){const q=eo((t-6.5)/1);c.globalAlpha=g*q;tongue(rx,cy,w,h,"#e07a8a");const r=L.srand(6);const cols=["#ff9ac0","#ffe27a","#9fd0ff","#9be3b0","#ffb878"];for(let i=0;i<70;i++){const an=r()*TAU,d=Math.sqrt(r())*.85;dot(rx+Math.cos(an)*d*w*.3,cy+Math.sin(an)*d*h*.38,Math.max(3,w*.018),cols[i%5]);}tx("alla smaker på hela tungan",rx,a.y+a.h*.1,"#9be3b0","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 4 · mest lukt: näsa, hålla för */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,8.1,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a1820"],[1,"#3a2028"]]);const w=Math.min(a.w*.6,s*1.1),lx=cx-w/2,y=cy-s*.04,bh=Math.max(34,s*.09);
      const k=t<5?1:1-.7*eo((t-5)/1.2);tx("smak",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(24,s*.07),700);
      c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y,w,bh);c.fillStyle="#9be3b0";c.fillRect(lx,y,w*.2,bh);c.fillStyle="#ffb878";c.fillRect(lx+w*.2,y,w*.8*k,bh);
      tx("tungan",lx+w*.1,y+bh+Math.max(26,s*.06),"#9be3b0","center",Math.max(14,s*.037),700);tx("lukt",lx+w*.6,y+bh+Math.max(26,s*.06),"#ffb878","center",Math.max(14,s*.037),700);
      if(t>5){c.globalAlpha=g*eo((t-5)/.8);const nx=cx,ny=cy+s*.2,r=Math.max(18,s*.05);c.fillStyle="#e8b090";c.beginPath();c.moveTo(nx,ny-r);c.lineTo(nx+r,ny+r);c.lineTo(nx-r,ny+r);c.closePath();c.fill();c.fillStyle="#cfd5df";c.fillRect(nx-r*.9,ny+r*.1,r*1.8,r*.4);tx("håller för näsan",nx,ny+r*2.3,"#cfd8ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 5 · chili: foto + capsaicin, fåglar */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,14.4,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a1820"],[1,"#3a2028"]]);const fw=Math.min(a.w*.36,s*.6),fh=fw*.65;frame(4,cx-a.w*.2,cy,fw,fh);
      const tx0=cx+a.w*.22,th=a.h*.45,top=cy-th*.55,fill=eo((t-3.4)/2.2);c.fillStyle="rgba(255,255,255,.14)";c.fillRect(tx0,top,22,th);c.fillStyle="#ff5a4a";c.fillRect(tx0,top+th*(1-.15-.7*fill),22,th*(.15+.7*fill));c.beginPath();c.arc(tx0+11,top+th+14,26,0,TAU);c.fill();
      tx("smärtsignal, inte en smak",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(18,s*.048),700);tx("munnen tror: het!",tx0+11,top+th+Math.max(70,s*.15),"#ffb0a0","center",Math.max(14,s*.037),700);
      if(t>9.2){c.globalAlpha=g*eo((t-9.2)/1);const bx=cx-a.w*.2,by=cy+fh*.75;tx("fåglar märker inget",bx,by,"#9be3b0","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 6 · mint: foto + menthol, kyla */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,7.9,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const fw=Math.min(a.w*.36,s*.6),fh=fw*.75;frame(5,cx-a.w*.2,cy,fw,fh);
      const sx=cx+a.w*.22,sy=cy,r=Math.max(28,s*.08);c.strokeStyle="#bfe6ff";c.lineWidth=5;c.lineCap="round";for(let i=0;i<3;i++){const an=i*Math.PI/3;c.beginPath();c.moveTo(sx-Math.cos(an)*r,sy-Math.sin(an)*r);c.lineTo(sx+Math.cos(an)*r,sy+Math.sin(an)*r);c.stroke();}
      tx("menthol = kall-nerver",cx,a.y+a.h*.1,"#bfe6ff","center",Math.max(18,s*.048),700);
      if(t>5){c.globalAlpha=g*eo((t-5)/1);tx("munnen är inte kallare, hjärnan tror det",cx,a.y+a.h*.9,"#cfd8ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 7 · mirakelbär: sött i en halvtimme */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(6,t,10,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a1820"],[1,"#3a2028"]]);const fw=Math.min(a.w*.36,s*.6),fh=fw*.75;frame(6,cx-a.w*.2,cy,fw,fh);
      const w=Math.min(a.w*.3,s*.5),lx=cx+a.w*.22-w/2,y=cy;c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=3;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();const k=eo((t-3)/3.5);c.strokeStyle="#ff9ac0";c.lineWidth=7;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w*k,y);c.stroke();dot(lx+w*k,y,8,"#ffd86b");tx("sött i ca 30 min",lx+w/2,y-Math.max(24,s*.055),"#ff9ac0","center",Math.max(15,s*.04),700);
      tx("surt blir sött",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(19,s*.052),700);
      if(t>6.6){const q=eo((t-6.6)/1),lr=Math.max(20,s*.05),lx2=cx+a.w*.22,ly=cy+Math.max(80,s*.18);c.globalAlpha=g*q;c.fillStyle="#ffe45a";c.beginPath();c.ellipse(lx2,ly,lr*1.3,lr,0,0,TAU);c.fill();c.fillStyle="#fff7b0";c.beginPath();c.ellipse(lx2-lr*.3,ly-lr*.25,lr*.35,lr*.22,0,0,TAU);c.fill();tx("citron = godis",lx2,ly+lr*1.9,"#ffe27a","center",Math.max(15,s*.04),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
