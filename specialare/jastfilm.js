/* Så jäser brödet: minilektionen som film (åtta scener, ca 1,5 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/jast/s<scen>-<replik>.mp3 (ElevenLabs, Malin; "jäst" skrivs "gäst" i manus för uttalet).
   Bilderna: bilder/jast-1..6.jpg. MPJastFilm.start(host,{overlay,onClose}). Ljudmatta: tradgarden. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7,cap:[[0.5,"En liten svamp som får brödet att växa. Det här är berättelsen om hur brödet jäser."]]},
 {k:"01 · Ett av de äldsta matlagen",d:13.7,cap:[[0.8,"Människor har bakat bröd i över 10 000 år. De äldsta bröden var platta och hårda."],[7.0,"I forntidens Egypten, för ungefär 4 000 år sedan, började man baka bröd med jäst."]]},
 {k:"02 · Jäst är levande",d:8.1,cap:[[0.8,"Jäst är en liten svamp som består av en enda cell. Den vaknar när den får det varmt, vått och sött."]]},
 {k:"03 · Jästen äter socker",d:13.5,cap:[[0.8,"När jästen äter socker i degen gör den koldioxid, samma gas som finns i läsk. Det bildas tusentals små bubblor."],[9.5,"Den gör också lite alkohol, som försvinner i ugnen."]]},
 {k:"04 · Gluten fångar bubblorna",d:9.6,cap:[[0.8,"Vetemjölet innehåller gluten. När man knådar bildas en seg, elastisk väv som håller kvar gasen, som en ballong."]]},
 {k:"05 · I ugnen",d:10.3,cap:[[0.8,"I ugnen utvidgas bubblorna och brödet växer. Vid ungefär 55 grader dör jästen, och degen blir fast och luftig."]]},
 {k:"06 · Gyllene skorpa",d:12.4,cap:[[0.8,"Den bruna skorpan och den goda doften bildas när socker och proteiner reagerar med varandra i värmen."],[8.0,"Det kallas Maillard-reaktionen, efter en fransk forskare."]]},
 {k:"07 · Surdeg",d:9.8,cap:[[0.8,"Surdeg är en blandning av vild jäst och bakterier, som man kan hålla vid liv i många år."],[6.7,"Man matar den med mjöl och vatten."]]}
];
const META={mat:"tradgarden",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Så jäser brödet",under:"En film i åtta steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Miljarder små svampar bakar brödet åt oss. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Mona Hassan Abo-Abda · CC BY-SA 4.0 · Wikimedia Commons",2:"Bob Blaylock · CC BY-SA 3.0 · Wikimedia Commons",3:"Ruth Hartnup · CC BY 2.0 · Wikimedia Commons",4:"Food Recipes · CC BY 2.0 · Wikimedia Commons",5:"Kritzolina · CC BY-SA 4.0 · Wikimedia Commons",6:"Agelaia · CC BY 4.0 · Wikimedia Commons"};

window.MPJastFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"jast",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"jast-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const loaf=(px,py,w,h,col)=>{const c=x();c.save();c.fillStyle=col||"#c8933e";c.beginPath();c.moveTo(px-w/2,py);c.quadraticCurveTo(px-w*.55,py-h*1.1,px,py-h*1.05);c.quadraticCurveTo(px+w*.55,py-h*1.1,px+w/2,py);c.closePath();c.fill();c.restore();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};
  /* jästcell sedd i mikroskop: genomskinlig, cellkärna, vakuol, knopp */
  const yeast=(px,py,r,bud,t)=>{const c=x();c.save();gl(px,py,r*1.8,"rgba(255,230,160,.18)");const g=c.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,"rgba(255,245,210,.95)");g.addColorStop(1,"rgba(200,165,90,.9)");c.fillStyle=g;c.strokeStyle="rgba(120,90,40,.9)";c.lineWidth=Math.max(2,r*.07);c.beginPath();c.ellipse(px,py,r,r*.88,0,0,TAU);c.fill();c.stroke();
    if(bud){const bp=.55+.25*Math.sin((t||0)*1.5);c.beginPath();c.ellipse(px+r*.95,py-r*.45,r*.42*bp+r*.12,r*.38*bp+r*.1,0,0,TAU);c.fill();c.stroke();}
    c.fillStyle="rgba(150,110,50,.65)";c.beginPath();c.arc(px-r*.2,py+r*.05,r*.3,0,TAU);c.fill();c.fillStyle="rgba(255,255,255,.28)";c.beginPath();c.ellipse(px+r*.25,py-r*.3,r*.22,r*.14,-.5,0,TAU);c.fill();c.restore();};
  const bubble=(px,py,r)=>{const c=x();c.save();const g=c.createRadialGradient(px-r*.35,py-r*.4,r*.05,px,py,r);g.addColorStop(0,"rgba(255,255,255,.75)");g.addColorStop(.5,"rgba(190,220,255,.18)");g.addColorStop(1,"rgba(120,170,230,.45)");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.strokeStyle="rgba(200,230,255,.8)";c.lineWidth=Math.max(1.2,r*.07);c.stroke();c.restore();};
  const s0=(t)=>{photo(3,t,7,1.12,.3);const f=title(t,"JÄST","SÅ JÄSER BRÖDET","#ffe0a0");cred(3,.55*f);};

  /* 1 · tidslinje: 10 000 år, Egypten 4 000 år sedan */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,13.7,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy-s*.04,px=ya=>lx+(10000-ya)/10000*w;
      c.strokeStyle="rgba(255,255,255,.45)";c.lineWidth=3;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();
      [[10000,"10 000 år sedan"],[4000,"4 000 år sedan"],[0,"idag"]].forEach(([ya,l],i)=>{if(i===1&&t<7)return;c.globalAlpha=g*(i===1?eo((t-7)/1):1);dot(px(ya),y,9,i===1?"#9fd0ff":"#ffd86b");tx(l,px(ya),y+Math.max(32,s*.07),i===1?"#9fd0ff":"#ffd86b","center",Math.max(13,s*.034),700);});
      c.globalAlpha=g;const q=eo((t-3.2)/1.2);c.fillStyle="#c8933e";c.beginPath();c.ellipse(px(10000)+w*.03,y-s*.1,Math.max(26,s*.07),Math.max(7,s*.018),0,0,TAU);c.globalAlpha=g*q;c.fill();tx("platt och hårt",px(10000)+w*.03,y-s*.1-Math.max(26,s*.06),"#ffd86b","center",Math.max(14,s*.037),700);
      if(t>7){c.globalAlpha=g*eo((t-7)/1);loaf(px(4000),y-s*.06,Math.max(60,s*.14),Math.max(36,s*.08),"#c8933e");tx("bröd med jäst",px(4000),y-s*.17,"#9fd0ff","center",Math.max(14,s*.037),700);}
      c.restore();}};

  /* 2 · jästcellen och vad den vill ha */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,8.1,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const r=Math.max(40,Math.min(a.w*.1,a.h*.2,s*.18));c.save();const vg=c.createRadialGradient(cx,cy-s*.04,r*.5,cx,cy-s*.04,r*3.4);vg.addColorStop(0,"rgba(90,70,40,.55)");vg.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=vg;c.fillRect(a.x,a.y,a.w,a.h);c.restore();const RR=L.srand(14);for(let i=0;i<5;i++){const an=RR()*TAU,d=r*(1.8+RR()*1.6);c.save();c.globalAlpha=g*.5;yeast(cx+Math.cos(an)*d*1.3,cy-s*.04+Math.sin(an)*d*.7,r*(.35+RR()*.25),false,t);c.restore();}yeast(cx,cy-s*.04,r*(.95+.05*Math.sin(t*3)),t>5,t);
      tx("en enda cell",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(20,s*.055),700);
      if(t>4){const q=eo((t-4)/1);c.globalAlpha=g*q;const y=cy+r*1.7;[["varmt","#ff9a8a"],["vått","#9fd0ff"],["sött","#ffe27a"]].forEach(([n,col],i)=>{const px=cx+(i-1)*r*2.4;c.strokeStyle=col;c.lineWidth=3;c.strokeRect(px-r*.9,y-r*.4,r*1.8,r*.8);tx(n,px,y+r*.12,col,"center",Math.max(15,r*.4),700);});}
      c.restore();}};

  /* 3 · jästen äter socker och gör koldioxid: degen i tvärsnitt */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,13.5,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1e1810"],[1,"#2c2216"]]);const w=Math.min(a.w*.66,s*1.2),h=Math.min(a.h*.58,s*.72),lx=cx-w/2,y0=cy+h*.5;
      c.save();c.beginPath();c.roundRect?c.roundRect(lx,y0-h,w,h,22):c.rect(lx,y0-h,w,h);c.clip();const dg=c.createLinearGradient(0,y0-h,0,y0);dg.addColorStop(0,"#f0dcae");dg.addColorStop(1,"#d4b678");c.fillStyle=dg;c.fillRect(lx,y0-h,w,h);
      const R=L.srand(8),grow=eo((t-3.4)/6);
      for(let i=0;i<46;i++){const bx=lx+w*(.05+R()*.9),by=y0-h*(.06+R()*.88),r0=R(),rad=(3+r0*Math.max(8,s*.026))*(.25+.75*grow);if(grow>.02)bubble(bx,by,rad);}
      for(let i=0;i<9;i++){const px=lx+w*(.1+R()*.8),py=y0-h*(.15+R()*.7);yeast(px,py,Math.max(9,s*.022),false,t);const q=((t*.7+i*.37)%1);gl(px+Math.max(14,s*.035),py-q*h*.12,Math.max(8,s*.02),"rgba(255,255,255,.55)");}
      /* sockermolekyler dras in */
      for(let i=0;i<12;i++){const px=lx+w*(.08+R()*.84),py=y0-h*(.1+R()*.8),q=((t*.4+i*.21)%1);c.fillStyle=`rgba(255,200,90,${.9*(1-q)})`;c.fillRect(px+(R()-.5)*20*q-3,py-3-q*14,6,6);}
      c.restore();c.strokeStyle="rgba(255,235,190,.5)";c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(lx,y0-h,w,h,22):c.rect(lx,y0-h,w,h);c.stroke();
      tx("socker → koldioxid",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(20,s*.055),700);
      if(t>9.5){c.globalAlpha=g*eo((t-9.5)/1);tx("lite alkohol, som dunstar i ugnen",cx,a.y+a.h*.92,"#cfd8ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 4 · gluten: trådar som bildar väggar runt gasbubblorna */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,9.6,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1e1810"],[1,"#2c2216"]]);const w=Math.min(a.w*.56,s*1.0),h=Math.min(a.h*.58,s*.72),lx=cx-w/2,ty=cy-h/2;
      const R=L.srand(11),B=[];for(let i=0;i<9;i++)B.push([lx+w*(.12+R()*.76),ty+h*(.12+R()*.76),Math.max(14,s*(.03+R()*.03))]);
      const k=eo((t-3)/2.5),br=1+.07*Math.sin(t*2.2);
      /* trådar mellan bubblor */
      c.save();c.lineCap="round";for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const d=Math.hypot(B[i][0]-B[j][0],B[i][1]-B[j][1]);if(d<w*.42){const al=k*(1-d/(w*.42));c.strokeStyle=`rgba(255,226,160,${.65*al})`;c.lineWidth=2.2;c.beginPath();c.moveTo(B[i][0],B[i][1]);c.quadraticCurveTo((B[i][0]+B[j][0])/2+(R()-.5)*6,(B[i][1]+B[j][1])/2+(R()-.5)*6+Math.sin(t*2+i)*2,B[j][0],B[j][1]);c.stroke();gl((B[i][0]+B[j][0])/2,(B[i][1]+B[j][1])/2,6,`rgba(255,226,160,${.4*al})`);}}c.restore();
      B.forEach(([px,py,r],i)=>{gl(px,py,r*2,"rgba(160,200,255,.14)");bubble(px,py,r*br*(1+.05*Math.sin(t*2+i)));});
      tx("gluten = ett elastiskt nät",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(19,s*.052),700);tx("som en ballong",cx,ty+h+Math.max(40,s*.085),"#cfd8ff","center",Math.max(15,s*.04),700);
      c.restore();}};

  /* 5 · ugnen: bubblorna utvidgas, jästen dör vid ca 55° */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,10.3,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a1008"],[1,"#5a2a10"]]);const k=eo((t-3)/4),heat=k;gl(cx-a.w*.12,cy+s*.1,s*1.1,`rgba(255,120,40,${.18+.2*heat})`);
      const w=Math.min(a.w*.3,s*.55),y=cy+s*.12;loaf(cx-a.w*.12,y,w*(.7+.4*k),w*(.3+.4*k),"#d9a860");
      /* tvärsnitt av smulan med växande bubblor */
      const bx=cx-a.w*.12,by=y-w*(.15+.2*k),R=L.srand(21);c.save();c.beginPath();c.ellipse(bx,by,w*(.3+.15*k),w*(.14+.14*k),0,0,TAU);c.clip();for(let i=0;i<24;i++){const px=bx+(R()-.5)*w*.8,py=by+(R()-.5)*w*.5;bubble(px,py,(2+R()*5)*(1+1.4*k));}c.restore();
      const tx0=cx+a.w*.2,th=a.h*.5,top=cy-th*.55;c.fillStyle="rgba(255,255,255,.14)";c.fillRect(tx0,top,22,th);const tg2=c.createLinearGradient(0,top+th,0,top);tg2.addColorStop(0,"#ff8a4a");tg2.addColorStop(1,"#ff3a2a");c.fillStyle=tg2;c.fillRect(tx0,top+th*(1-.1-.8*heat),22,th*(.1+.8*heat));c.beginPath();c.arc(tx0+11,top+th+14,26,0,TAU);c.fill();gl(tx0+11,top+th+14,60,"rgba(255,90,40,.5)");
      tx("55°",tx0+60,top+th*(1-.1-.8*.55),"#ffd86b","left",Math.max(18,s*.048),700);
      if(t>6.5){c.globalAlpha=g*eo((t-6.5)/1);tx("jästen dör, brödet blir fast",cx,a.y+a.h*.9,"#cfd8ff","center",Math.max(17,s*.045),700);}
      tx("bubblorna utvidgas",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(19,s*.052),700);
      c.restore();}};

  /* 6 · skorpan: ljust till brunt */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,12.4,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a1810"],[1,"#3a2214"]]);const w=Math.min(a.w*.3,s*.55),k=eo((t-3)/4);
      const cols=["#f0d8a0","#e0b870","#c8933e","#9a6a28","#7a4a18"];const col=cols[Math.min(4,Math.floor(k*5))];loaf(cx,cy+s*.1,w,w*.5,col);
      tx("socker + proteiner + värme",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(19,s*.052),700);
      if(t>8){c.globalAlpha=g*eo((t-8)/1);tx("Maillard-reaktionen",cx,cy+s*.3,"#9be3b0","center",Math.max(22,s*.06),700);}
      c.restore();}};

  /* 7 · surdeg: burk med bubblor, mjöl och vatten */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(6,t,9.8,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const w=Math.min(a.w*.18,s*.3),h=w*1.4,jx=cx,jy=cy;
      c.fillStyle="rgba(200,225,255,.15)";c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=4;c.beginPath();c.roundRect?c.roundRect(jx-w/2,jy-h/2,w,h,12):c.rect(jx-w/2,jy-h/2,w,h);c.fill();c.stroke();
      const lv=h*(.5+.12*Math.sin(t*1.2));c.fillStyle="#e8d0a0";c.fillRect(jx-w/2+4,jy+h/2-lv,w-8,lv-4);
      const r=L.srand(3);for(let i=0;i<16;i++){const bx=jx-w/2+10+r()*(w-20),by=jy+h/2-8-((t*30+i*20)%lv);c.fillStyle="rgba(255,255,255,.7)";c.beginPath();c.arc(bx,by,3+r()*4,0,TAU);c.fill();}
      tx("surdeg",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(24,s*.07),700);
      if(t>6.7){c.globalAlpha=g*eo((t-6.7)/1);tx("mjöl + vatten",cx,jy+h/2+Math.max(40,s*.085),"#9fd0ff","center",Math.max(17,s*.045),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
