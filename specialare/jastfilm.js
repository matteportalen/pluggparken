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
  const yeast=(px,py,r,bud)=>{const c=x();c.save();c.fillStyle="#e8d8a8";c.strokeStyle="#a88a50";c.lineWidth=Math.max(2,r*.08);c.beginPath();c.ellipse(px,py,r,r*.85,0,0,TAU);c.fill();c.stroke();if(bud){c.beginPath();c.ellipse(px+r*.95,py-r*.4,r*.45,r*.4,0,0,TAU);c.fill();c.stroke();}c.fillStyle="#c8a860";c.beginPath();c.arc(px-r*.15,py+r*.05,r*.28,0,TAU);c.fill();c.restore();};

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
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const r=Math.max(40,Math.min(a.w*.1,a.h*.2,s*.18));yeast(cx,cy-s*.04,r*(.9+.1*Math.sin(t*3)),t>5);
      tx("en enda cell",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(20,s*.055),700);
      if(t>4){const q=eo((t-4)/1);c.globalAlpha=g*q;const y=cy+r*1.7;[["varmt","#ff9a8a"],["vått","#9fd0ff"],["sött","#ffe27a"]].forEach(([n,col],i)=>{const px=cx+(i-1)*r*2.4;c.strokeStyle=col;c.lineWidth=3;c.strokeRect(px-r*.9,y-r*.4,r*1.8,r*.8);tx(n,px,y+r*.12,col,"center",Math.max(15,r*.4),700);});}
      c.restore();}};

  /* 3 · jästen äter socker och gör bubblor */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,13.5,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;const w=Math.min(a.w*.6,s*1.1),h=Math.min(a.h*.55,s*.7),lx=cx-w/2,y0=cy+h*.5;
      c.fillStyle="#e8d0a0";c.beginPath();c.roundRect?c.roundRect(lx,y0-h,w,h,18):c.rect(lx,y0-h,w,h);c.fill();
      const r=L.srand(8),n=Math.floor(10+40*eo((t-3.6)/4));for(let i=0;i<n;i++){const bx=lx+w*(.08+r()*.84),by0=y0-h*(.08+r()*.84),rise=((t*.15+i*.07)%1)*h*.15;c.strokeStyle="rgba(120,160,200,.9)";c.fillStyle="rgba(200,225,255,.55)";c.lineWidth=2;c.beginPath();c.arc(bx,by0-rise*0,3+r()*Math.max(4,s*.012)+Math.max(0,(t-3.6)*.8),0,TAU);c.fill();c.stroke();}
      for(let i=0;i<5;i++){yeast(lx+w*(.15+i*.18),y0-h*(.3+(i%2)*.3),Math.max(9,s*.022),false);dot(lx+w*(.15+i*.18)+Math.max(16,s*.04),y0-h*(.3+(i%2)*.3),Math.max(3,s*.007),"#fff");}
      tx("socker → koldioxid",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(20,s*.055),700);
      if(t>9.5){c.globalAlpha=g*eo((t-9.5)/1);tx("lite alkohol, som dunstar i ugnen",cx,a.y+a.h*.92,"#cfd8ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 4 · gluten: nät som håller gasen */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,9.6,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const w=Math.min(a.w*.5,s*.9),h=Math.min(a.h*.55,s*.7),lx=cx-w/2,ty=cy-h/2;
      const r=L.srand(11),pts=[];for(let i=0;i<14;i++)pts.push([lx+w*(.1+r()*.8),ty+h*(.1+r()*.8)]);
      const k=eo((t-3)/2);c.strokeStyle="rgba(255,226,160,.8)";c.lineWidth=3;for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i][0]-pts[j][0],pts[i][1]-pts[j][1]);if(d<w*.35){c.globalAlpha=g*k;c.beginPath();c.moveTo(pts[i][0],pts[i][1]);c.lineTo(pts[j][0],pts[j][1]);c.stroke();}}
      c.globalAlpha=g;pts.slice(0,7).forEach(([px,py],i)=>{c.fillStyle="rgba(200,225,255,.5)";c.strokeStyle="rgba(150,190,230,.9)";c.lineWidth=2;c.beginPath();c.arc(px,py,Math.max(8,s*.022)*(1+.08*Math.sin(t*2+i)),0,TAU);c.fill();c.stroke();});
      tx("gluten = ett elastiskt nät",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(19,s*.052),700);tx("som en ballong",cx,ty+h+Math.max(40,s*.085),"#cfd8ff","center",Math.max(15,s*.04),700);
      c.restore();}};

  /* 5 · ugnen: brödet växer, 55 grader */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,10.3,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a1810"],[1,"#4a2814"]]);const k=eo((t-3)/4),w=Math.min(a.w*.3,s*.55),y=cy+s*.1;
      loaf(cx-a.w*.15,y,w*(.7+.4*k),w*(.3+.4*k),"#d9a860");
      const tx0=cx+a.w*.2,th=a.h*.5,top=cy-th*.55,heat=eo((t-3)/4);c.fillStyle="rgba(255,255,255,.14)";c.fillRect(tx0,top,22,th);c.fillStyle="#ff6a4a";c.fillRect(tx0,top+th*(1-.1-.8*heat),22,th*(.1+.8*heat));c.beginPath();c.arc(tx0+11,top+th+14,26,0,TAU);c.fill();
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
