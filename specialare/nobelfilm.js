/* Nobelpriset: minilektionen som film (åtta scener, ca 1,4 minuter), bilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/nobel/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel; "Nobell" skrivet så för uttalet).
   Bilderna: bilder/nobel-1..6.jpg. MPNobelFilm.start(host,{overlay,onClose}). Ljudmatta: klockor. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.4,cap:[[0.5,"Ett pris som skapades av en uppfinnare. Det här är berättelsen om Nobelpriset."]]},
 {k:"01 · Alfred Nobel",d:8.1,cap:[[0.8,"Alfred Nobel var en svensk uppfinnare och företagare. År 1867 uppfann han dynamiten."]]},
 {k:"02 · Testamentet",d:11.8,cap:[[0.8,"Nobel skrev sitt testamente år 1895."],[4.5,"När han dog året efter, stod det att pengarna skulle bli ett pris till dem som gjort mest nytta för mänskligheten."]]},
 {k:"03 · Fem priser",d:16,cap:[[0.8,"Det första Nobelpriset delades ut år 1901. Det finns priser i fysik, kemi, medicin, litteratur och fred."],[11.4,"Ekonomipriset kom senare, år 1969."]]},
 {k:"04 · Stockholm och Oslo",d:9.5,cap:[[0.8,"Priserna delas ut den 10 december, den dag Nobel dog."],[5.4,"Fredspriset delas ut i Oslo, och de andra i Stockholm."]]},
 {k:"05 · Medaljen",d:9,cap:[[0.8,"Varje pristagare får en guldmedalj, ett diplom och prispengar."],[5.0,"Prissumman är ungefär 11 miljoner kronor per pris."]]},
 {k:"06 · Den yngsta",d:8.2,cap:[[0.8,"Den yngsta pristagaren hittills är Malala Yousafzai. Hon var 17 år när hon fick fredspriset."]]},
 {k:"07 · Marie Curie",d:8.4,cap:[[0.8,"Marie Curie var den första kvinnan som fick ett Nobelpris."],[4.5,"Hon fick det två gånger, i fysik och i kemi."]]}
];
const META={mat:"klockor",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Nobelpriset",under:"En film i åtta steg · ca 1,4 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"En uppfinnares testamente har hedrat forskare i över hundra år. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Gösta Florman (1831–1900) / The Royal… · Public domain · Wikimedia Commons",2:"Waage · CC BY-SA 3.0 · Wikimedia Commons",3:"Public domain · Wikimedia Commons",4:"Jorge Láscar from Melbourne, Australia · CC BY 2.0 · Wikimedia Commons",5:"Osama Shukir Muhammed Amin FRCP(Glasg) · CC BY-SA 4.0 · Wikimedia Commons",6:"Photographische Gesellschaft in… · CC BY 4.0 · Wikimedia Commons"};

window.MPNobelFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"nobel",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"nobel-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,Math.max(.1,r));g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();c.restore();};
  const dust=(a,t)=>{const Rr=L.srand(61);for(let i=0;i<44;i++){const X=a.x+Rr()*a.w,Y=a.y+((Rr()+t*(.015+Rr()*.02))%1)*a.h,f=.4+.6*Math.abs(Math.sin(t*1.3+i));gl(X,Y,3+Rr()*5,`rgba(255,215,130,${.16*f})`);}};
  const sparks=(px,py,r,t,n)=>{const Rr=L.srand(77);for(let i=0;i<n;i++){const an=Rr()*TAU,sp=.5+Rr(),q=((t*sp*.8+Rr())%1),d=r*q*(1+Rr());gl(px+Math.cos(an)*d,py+Math.sin(an)*d+q*q*r*.6,Math.max(2,r*.12)*(1-q),`rgba(255,${180+Math.floor(60*Rr())},80,${(.95*(1-q)).toFixed(2)})`);}};
  const medalOld=(px,py,r,l1,l2,col)=>{const c=x();c.save();c.fillStyle=col||"#d9a84a";c.strokeStyle="#8a5a10";c.lineWidth=Math.max(3,r*.08);c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.stroke();c.fillStyle="#fff7e0";c.beginPath();c.arc(px,py,r*.78,0,TAU);c.fill();c.restore();tx(l1,px,py-r*.05,"#6a4a10","center",Math.max(14,r*.3),700);tx(l2,px,py+r*.32,"#6a4a10","center",Math.max(12,r*.22),600);};

  const medal=(px,py,r,l1,l2,col)=>{const c=x();c.save();gl(px,py,r*2,"rgba(255,215,120,.3)");const light=col==="#c0c8d8";const mg=c.createLinearGradient(px-r,py-r,px+r,py+r);mg.addColorStop(0,light?"#f4f7ff":"#fff0b8");mg.addColorStop(.4,col||"#d9a84a");mg.addColorStop(1,light?"#6a7490":"#7a5412");c.fillStyle=mg;c.strokeStyle=light?"#586078":"#6a4208";c.lineWidth=Math.max(3,r*.07);c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.stroke();
    const ig=c.createRadialGradient(px-r*.2,py-r*.25,r*.1,px,py,r*.8);ig.addColorStop(0,"#fffaf0");ig.addColorStop(1,light?"#d6dcec":"#f0d89a");c.fillStyle=ig;c.beginPath();c.arc(px,py,r*.78,0,TAU);c.fill();c.strokeStyle="rgba(120,80,20,.4)";c.lineWidth=2;c.beginPath();c.arc(px,py,r*.7,0,TAU);c.stroke();
    const sh=((x.t0||0));c.restore();tx(l1,px,py-r*.05,"#6a4a10","center",Math.max(14,r*.3),700);tx(l2,px,py+r*.32,"#6a4a10","center",Math.max(12,r*.22),600);};

  const s0=(t)=>{photo(1,t,6.4,1.12,.3);const f=title(t,"NOBELPRISET","ETT PRIS FRÅN EN UPPFINNARE","#ffe0a0");cred(1,.55*f);};

  /* 1 · dynamit 1867 */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(1,t,8.1,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1a1620"],[1,"#2a2230"]]);dust(a,t);const u=Math.max(16,Math.min(a.w*.035,s*.045));
      const bx=cx-u*2.2;for(let i=0;i<3;i++){const px=bx+i*u*1.2;c.fillStyle="#c93a3a";c.fillRect(px,cy-u*2,u,u*4);c.fillStyle="#e8d0a0";c.fillRect(px,cy-u*.4,u,u*.8);}
      c.strokeStyle="#cfd5df";c.lineWidth=3;c.beginPath();c.moveTo(bx+u*1.7,cy-u*2);c.quadraticCurveTo(bx+u*1.8,cy-u*3,bx+u*2.8,cy-u*3.2);c.stroke();if(t>4){gl(bx+u*2.8,cy-u*3.2,u*3,"rgba(255,200,80,.7)");sparks(bx+u*2.8,cy-u*3.2,u*3,t,16);dot(bx+u*2.8,cy-u*3.2,5+Math.sin(t*20)*2,"#fff2c0");}
      tx("1867 · dynamit",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(22,s*.06),700);tx("Alfred Nobel · svensk uppfinnare",cx,cy+u*4.2,"#cfd8ff","center",Math.max(16,s*.042),700);
      c.restore();}};

  /* 2 · testamentet 1895, dog 1896, pengar blir pris */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,11.8,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1a1620"],[1,"#2a2230"]]);dust(a,t);const u=Math.max(16,Math.min(a.w*.035,s*.045));
      const px=cx-a.w*.22,py=cy;c.fillStyle="#f2e6c4";c.fillRect(px-u*2,py-u*2.6,u*4,u*5.2);c.strokeStyle="#9a7a40";c.lineWidth=2;for(let i=0;i<8;i++){c.beginPath();c.moveTo(px-u*1.5,py-u*2+i*u*.55);c.lineTo(px+u*1.5,py-u*2+i*u*.55);c.stroke();}tx("testamentet",px,py+u*3.7,"#ffd86b","center",Math.max(15,s*.04),700);tx("1895",px,a.y+a.h*.14,"#ffd86b","center",Math.max(30,s*.085),700);
      if(t>4.5){const q=eo((t-4.5)/1);c.globalAlpha=g*q;const mx=cx+a.w*.2;for(let i=0;i<5;i++){gl(mx,py+u*1.6-i*u*.45,u*2.2,"rgba(255,210,80,.35)");c.fillStyle="#ffd23c";c.strokeStyle="#a87a10";c.lineWidth=2;c.beginPath();c.ellipse(mx,py+u*1.6-i*u*.45,u*1.3,u*.45,0,0,TAU);c.fill();c.stroke();}for(let i=0;i<14;i++){const q=((t*.5+i*.071)%1),X=lerp(px+u*2.6,mx-u*2,q),Y=py-Math.sin(q*Math.PI)*u*1.4+(i%3-1)*u*.2;gl(X,Y,u*.7,"rgba(255,215,110,.8)");}
        c.strokeStyle="#fff";c.lineWidth=5;c.beginPath();c.moveTo(px+u*2.6,py);c.lineTo(mx-u*2,py);c.stroke();tx("pengarna blir ett pris",mx,py+u*3.7,"#9be3b0","center",Math.max(15,s*.04),700);tx("nytta för mänskligheten",mx,py+u*3.7+Math.max(30,s*.065),"#cfd8ff","center",Math.max(13,s*.034),600);}
      c.restore();}};

  /* 3 · fem priser, och ekonomipriset 1969 */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,16,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1a1620"],[1,"#2a2230"]]);dust(a,t);const w=Math.max(80,Math.min(a.w*.15,s*.24)),h=w*.9;
      tx("första gången 1901",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(20,s*.055),700);
      [["fysik","#9fd0ff"],["kemi","#9be3b0"],["medicin","#ff9a8a"],["litteratur","#ffe27a"],["fred","#d9a8ff"]].forEach(([n,col],i)=>{const q=eo((t-3.6-i*.7)/.6);if(q<=0)return;const px=cx+(i-2)*w*1.08;c.save();c.globalAlpha=g*q;c.fillStyle="rgba(255,255,255,.07)";c.strokeStyle=col;c.lineWidth=3;c.fillRect(px-w/2,cy-h/2,w,h);c.strokeRect(px-w/2,cy-h/2,w,h);tx(n,px,cy+h*.1,col,"center",Math.max(14,w*.17),700);c.restore();});
      if(t>11.4){const q=eo((t-11.4)/1),px=cx,py=cy+h*.95;c.globalAlpha=g*q;c.strokeStyle="#cfd8ff";c.setLineDash([8,6]);c.lineWidth=3;c.strokeRect(px-w*.6,py-h*.3,w*1.2,h*.6);c.setLineDash([]);tx("ekonomi 1969",px,py+h*.05,"#cfd8ff","center",Math.max(14,w*.15),700);}
      c.restore();}};

  /* 4 · 10 december, Stockholm och Oslo */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,9.5,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1a1620"],[1,"#2a2230"]]);dust(a,t);
      if(t<5.4){const w=Math.min(a.w*.3,s*.5),h=w*.9,lx=cx-w/2,y=cy-h/2;c.fillStyle="#f2efe6";c.fillRect(lx,y,w,h);c.fillStyle="#b83a3a";c.fillRect(lx,y,w,h*.22);tx("DECEMBER",cx,y+h*.15,"#fff","center",Math.max(14,w*.1),700);tx("10",cx,y+h*.7,"#1d2b53","center",Math.max(50,w*.45),700);tx("Nobels dödsdag",cx,y+h+Math.max(34,s*.075),"#cfd8ff","center",Math.max(15,s*.04),700);}
      else{const w=Math.min(a.w*.6,s*1.1),lx=cx-w/2,y=cy;const sx=lx+w*.75,ox=lx+w*.25;gl(ox,y-s*.08,s*.1,"rgba(217,168,255,.5)");dot(ox,y-s*.08,11,"#d9a8ff");tx("Oslo",ox,y-s*.08-Math.max(22,s*.05),"#d9a8ff","center",Math.max(18,s*.048),700);tx("fred",ox,y-s*.08+Math.max(40,s*.085),"#d9a8ff","center",Math.max(14,s*.037),700);
        gl(sx,y+s*.04,s*.1,"rgba(255,216,107,.5)");dot(sx,y+s*.04,11,"#ffd86b");tx("Stockholm",sx,y+s*.04-Math.max(22,s*.05),"#ffd86b","center",Math.max(18,s*.048),700);tx("de andra fyra",sx,y+s*.04+Math.max(40,s*.085),"#ffd86b","center",Math.max(14,s*.037),700);}
      c.restore();}};

  /* 5 · medalj, diplom, prispengar */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(5,t,9,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1a1620"],[1,"#2a2230"]]);dust(a,t);const r=Math.max(40,Math.min(a.w*.09,a.h*.18,s*.16));
      const q1=eo((t-2.8)/.8),q2=eo((t-3.6)/.8);c.globalAlpha=g*q1;medal(cx-r*2.6,cy,r,"NOBEL","","#d9a84a");tx("guldmedalj",cx-r*2.6,cy+r*1.7,"#ffd86b","center",Math.max(14,s*.037),700);
      c.globalAlpha=g*q2;c.fillStyle="#f2e6c4";c.fillRect(cx-r*.8,cy-r*.9,r*1.6,r*1.8);c.strokeStyle="#9a7a40";c.lineWidth=2;for(let i=0;i<5;i++){c.beginPath();c.moveTo(cx-r*.6,cy-r*.5+i*r*.3);c.lineTo(cx+r*.6,cy-r*.5+i*r*.3);c.stroke();}tx("diplom",cx,cy+r*1.7,"#ffd86b","center",Math.max(14,s*.037),700);
      if(t>4.2){c.globalAlpha=g*eo((t-4.2)/.8);for(let i=0;i<4;i++){gl(cx+r*2.6,cy+r*.6-i*r*.3,r*1.4,"rgba(255,210,80,.3)");c.fillStyle="#ffd23c";c.strokeStyle="#a87a10";c.lineWidth=2;c.beginPath();c.ellipse(cx+r*2.6,cy+r*.6-i*r*.3,r*.8,r*.28,0,0,TAU);c.fill();c.stroke();}sparks(cx+r*2.6,cy,r*1.6,t,10);tx("prispengar",cx+r*2.6,cy+r*1.7,"#ffd86b","center",Math.max(14,s*.037),700);}
      if(t>5){c.globalAlpha=g*eo((t-5)/1);tx("ca 11 miljoner kr",cx,a.y+a.h*.12,"#9be3b0","center",Math.max(24,s*.07),700);}
      c.restore();}};

  /* 6 · yngsta pristagaren: 17 år */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(3,t,8.2,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1a1620"],[1,"#2a2230"]]);dust(a,t);const k=eo((t-3)/2);gl(cx,cy-s*.04,s*.5*k,"rgba(255,215,120,.28)");sparks(cx,cy-s*.04,s*.4,t,18);tx("17 år",cx,cy-s*.02,"#ffd86b","center",Math.max(60,s*.18)*(.6+.4*k),700);tx("yngsta Nobelpristagaren",cx,cy+Math.max(70,s*.15),"#cfd8ff","center",Math.max(18,s*.048),700);tx("fredspriset · Malala Yousafzai",cx,cy+Math.max(70,s*.15)+Math.max(40,s*.085),"#d9a8ff","center",Math.max(16,s*.042),700);
      c.restore();}};

  /* 7 · Marie Curie: två medaljer */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(6,t,8.4,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1a1620"],[1,"#2a2230"]]);dust(a,t);const r=Math.max(40,Math.min(a.w*.09,a.h*.18,s*.16));
      const q1=eo((t-2.8)/.8),q2=eo((t-4.6)/.8);c.globalAlpha=g*q1;medal(cx-r*1.4,cy,r,"FYSIK","1903","#d9a84a");c.globalAlpha=g*q2;medal(cx+r*1.4,cy,r,"KEMI","1911","#c0c8d8");
      c.globalAlpha=g;tx("Marie Curie · första kvinnan",cx,a.y+a.h*.14,"#e2c9ff","center",Math.max(19,s*.052),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
