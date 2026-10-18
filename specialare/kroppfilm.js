/* Snabbfakta om kroppen: minilektionen som film (sju scener, ca 1,6 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas, glöd och partiklar).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/kroppen/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/kroppen-1..6.jpg. MPKroppFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.6,cap:[[0.5,"Din kropp gör saker hela tiden, utan att du tänker på det. Det här är berättelsen om några av dem."]]},
 {k:"01 · Hjärtat",d:10.7,cap:[[0.8,"Hjärtat slår ungefär 100 000 gånger varje dygn, utan att du tänker på det."],[6.5,"På ett helt liv blir det över två miljarder slag."]]},
 {k:"02 · Ben",d:9.1,cap:[[0.8,"En vuxen människa har 206 ben. Ett bebisskelett har fler, som växer ihop när man blir äldre."]]},
 {k:"03 · Blinkningar",d:9.1,cap:[[0.8,"Du blinkar ungefär 15 till 20 gånger varje minut. En blinkning tar bara ungefär en tiondels sekund."]]},
 {k:"04 · Blodets resa",d:9.9,cap:[[0.8,"Allt blod i kroppen pumpas runt hela kroppen på ungefär en minut."],[5.6,"Hjärtat pumpar ungefär 5 liter blod varje minut."]]},
 {k:"05 · Tänder",d:11.1,cap:[[0.8,"Tandemaljen är det hårdaste ämnet i kroppen. Men den kan inte växa tillbaka, så borsta tänderna."],[7.7,"En vuxen har upp till 32 tänder."]]},
 {k:"06 · Näsan",d:9.4,cap:[[0.8,"Du kan känna igen tusentals olika dofter. Doften går nästan direkt till de delar av hjärnan som sköter minnen."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Snabbfakta om kroppen",under:"En film i sju steg · ca 1,6 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Din kropp är full av under. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={"1":"Jebulon · CC0 · Wikimedia Commons","2":"Mr Khubaib Sani · CC BY-SA 4.0 · Wikimedia Commons","3":"Aiello BR, Bhamla MS, Gau J, Morris JGL… · CC BY 4.0 · Wikimedia Commons","4":"Ajay Kumar Chaurasiya · CC BY-SA 4.0 · Wikimedia Commons","5":"User:Time3000 and User:Ian Furst · CC BY-SA 3.0 · Wikimedia Commons","6":"☻☺ · CC BY-SA 2.0 · Wikimedia Commons"};

window.MPKroppFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"kroppen",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"kroppen-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title,srand}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,Math.max(.1,r));g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();c.restore();};
  const frame=(n,px,py,w,h)=>{const c=x(),im=L.img(n);if(!L.ok(im))return;const ir=im.width/im.height,fr=w/h;let sw,sh,sx,sy;if(ir>fr){sh=im.height;sw=sh*fr;sx=(im.width-sw)/2;sy=0;}else{sw=im.width;sh=sw/fr;sx=0;sy=(im.height-sh)/2;}
    c.save();c.shadowColor="rgba(255,120,120,.35)";c.shadowBlur=28;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.fillStyle="#000";c.fill();c.shadowBlur=0;c.clip();c.drawImage(im,sx,sy,sw,sh,px-w/2,py-h/2,w,h);c.restore();c.save();c.strokeStyle="rgba(255,150,150,.7)";c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.stroke();c.restore();};
  const BG=a=>grad(a,[[0,"#0a0810"],[1,"#190e18"]]);
  const heart=(px,py,r,t,beat)=>{const c=x();c.save();c.translate(px,py);const k=1+.09*beat;c.scale(k,k);gl(0,0,r*2.2,`rgba(255,60,80,${.25+.2*beat})`);const g=c.createRadialGradient(-r*.3,-r*.35,r*.1,0,0,r*1.2);g.addColorStop(0,"#ff8a8a");g.addColorStop(.55,"#d8283c");g.addColorStop(1,"#7a1020");c.fillStyle=g;c.beginPath();c.moveTo(0,r*.95);c.bezierCurveTo(-r*1.5,r*.1,-r*1.1,-r*1.0,-r*.1,-r*.45);c.bezierCurveTo(r*.1,-r*.9,r*1.6,-r*.9,r*1.15,r*.2);c.bezierCurveTo(r*.9,r*.6,r*.3,r*.8,0,r*.95);c.fill();c.strokeStyle="rgba(255,200,200,.35)";c.lineWidth=r*.04;for(let i=0;i<5;i++){c.beginPath();c.moveTo(-r*.5+i*r*.2,-r*.2);c.quadraticCurveTo(-r*.3+i*r*.25,r*.2,-r*.1+i*r*.18,r*.55);c.stroke();}
    c.fillStyle="#b0202e";c.fillRect(-r*.15,-r*1.0,r*.28,r*.6);c.fillStyle="#3a68b8";c.fillRect(r*.25,-r*.95,r*.25,r*.5);c.restore();};
  const brainPath=(px,py,w,h)=>{const c=x();c.beginPath();const N=100;for(let i=0;i<=N;i++){const th=i/N*TAU,bump=1+.045*Math.sin(th*13)+.025*Math.sin(th*7+1);let X=Math.cos(th)*w/2*bump,Y=Math.sin(th)*h/2*(Math.sin(th)>0?.78:1)*bump;i?c.lineTo(px+X,py+Y):c.moveTo(px+X,py+Y);}c.closePath();};

  const s0=(t)=>{photo(1,t,7.6,1.12,.3);const f=title(t,"KROPPEN","SNABBFAKTA","#ffc0c0");cred(1,.55*f);};

  /* 1 · hjärtat: slag, pulslinje, 100 000 per dygn, över 2 miljarder */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,10.7,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const r=Math.max(50,Math.min(a.w*.12,a.h*.2,s*.2)),hx=cx-a.w*.16,hy=cy-s*.02,ph=(t*1.2)%1,beat=Math.max(0,Math.sin(ph*Math.PI*2*.5))**3;
      heart(hx,hy,r,t,beat);
      /* pulslinje */
      const ew=Math.min(a.w*.36,s*.7),ex=cx+a.w*.06,ey=cy+s*.02;c.save();c.strokeStyle="#ff7a8a";c.lineWidth=3;c.shadowColor="#ff4a60";c.shadowBlur=14;c.beginPath();for(let i=0;i<=160;i++){const q=i/160,u=((q*3.2-t*1.2)%1+1)%1,Y=u<.06?-(u/.06)*s*.02:u<.1?(u-.06)/.04*s*.1-s*.02:u<.14?s*.08-(u-.1)/.04*s*.14:u<.2?-s*.06+(u-.14)/.06*s*.06:Math.sin(u*TAU*2)*s*.003;i?c.lineTo(ex+q*ew,ey-Y):c.moveTo(ex+q*ew,ey-Y);}c.stroke();c.restore();
      if(t<6.5){const hr=Math.min(24,(t-2.4)/3.8*24),n=Math.round(100000*Math.min(1,(t-2.8)/3.6));tx(n.toLocaleString("sv-SE").replace(/ /g," ")+" slag",cx,a.y+a.h*.14,"#ffd0d0","center",Math.max(24,s*.07),700);tx("på ett dygn",cx,a.y+a.h*.14+Math.max(30,s*.065),"#ff9aa8","center",Math.max(15,s*.04),700);}
      else{const q=eo((t-6.5)/1);c.globalAlpha=g*q;const n=Math.round(2.5e9*eo((t-6.8)/2.4));tx("över "+(Math.floor(n/1e8)/10).toString().replace(".",",")+" miljarder slag",cx,a.y+a.h*.14,"#ffd0d0","center",Math.max(22,s*.065),700);tx("på ett helt liv",cx,a.y+a.h*.14+Math.max(30,s*.065),"#ff9aa8","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 2 · ben: 206, bebis fler som växer ihop */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,9.1,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const fw=Math.min(a.w*.26,s*.46),fh=Math.min(a.h*.8,fw*1.7),fx=cx-a.w*.24;frame(2,fx,cy,fw,fh);
      const bx=cx+a.w*.12,k=eo((t-3.5)/3.5),n=Math.round(lerp(300,206,k));
      /* ben-prickar som växer ihop parvis */
      const R=srand(14),W=Math.min(a.w*.34,s*.6),H=Math.min(a.h*.5,s*.4);for(let i=0;i<300;i++){const X=bx-W/2+R()*W,Y=cy-H/2+R()*H,merge=i>=206&&k>(i-206)/94*.9;const al=merge?Math.max(0,1-(k-(i-206)/94*.9)*8):1;if(al<=0)continue;gl(X,Y,W*.02,`rgba(240,235,220,${.35*al})`);dot(X,Y,Math.max(1.6,W*.006),`rgba(250,245,230,${al})`);}
      tx(String(n),bx,cy+H/2+Math.max(46,s*.1),"#fff8e8","center",Math.max(38,s*.12),700);tx(k<.95?"bebis: ca 300 ben":"vuxen: 206 ben",bx,cy+H/2+Math.max(46,s*.1)+Math.max(30,s*.065),k<.95?"#ffd8a0":"#bfe0ff","center",Math.max(16,s*.042),700);
      c.restore();}};

  /* 3 · blinkningar: ögat blinkar, 15–20 per minut, 0,1 s */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,9.1,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const w=Math.min(a.w*.46,s*.85),h=w*.42,ex=cx,ey=cy-s*.04,per=60/17/ (1) ;const ph=((t-3)%3.5)/3.5,bl=ph<.1?Math.sin(ph/.1*Math.PI):0,lid=bl;
      c.save();c.beginPath();c.moveTo(ex-w/2,ey);c.quadraticCurveTo(ex,ey-h*(1-lid)*1.05,ex+w/2,ey);c.quadraticCurveTo(ex,ey+h*(1-lid)*1.05,ex-w/2,ey);c.closePath();c.fillStyle="#f4eeea";c.fill();c.clip();
      const ig=c.createRadialGradient(ex-w*.02,ey-h*.05,h*.05,ex,ey,h*.55);ig.addColorStop(0,"#9ad0ff");ig.addColorStop(.55,"#3a78c0");ig.addColorStop(1,"#17305a");c.fillStyle=ig;c.beginPath();c.arc(ex,ey,h*.55,0,TAU);c.fill();c.fillStyle="#05080f";c.beginPath();c.arc(ex,ey,h*.22,0,TAU);c.fill();gl(ex-h*.18,ey-h*.2,h*.3,"rgba(255,255,255,.7)");c.restore();
      c.strokeStyle="rgba(255,200,180,.85)";c.lineWidth=4;c.lineCap="round";c.beginPath();c.moveTo(ex-w/2,ey);c.quadraticCurveTo(ex,ey-h*(1-lid)*1.05,ex+w/2,ey);c.quadraticCurveTo(ex,ey+h*(1-lid)*1.05,ex-w/2,ey);c.stroke();
      if(t>3.4){const q=eo((t-3.4)/1);c.globalAlpha=g*q;tx("15–20 gånger i minuten",cx,a.y+a.h*.14,"#ffd8c8","center",Math.max(21,s*.058),700);const bw=Math.min(a.w*.5,s*.9),by=ey+h*1.25;c.fillStyle="rgba(255,255,255,.1)";c.fillRect(cx-bw/2,by,bw,Math.max(10,s*.022));gl(cx-bw/2+bw*.1*.5,by+5,s*.05,"rgba(255,220,150,.6)");c.fillStyle="#ffd890";c.fillRect(cx-bw/2,by,bw*.1*Math.min(1,bl*3+(ph<.1?0:.0)+.0)+bw*.0,Math.max(10,s*.022));tx("en blinkning ≈ 0,1 sekund",cx,by+Math.max(42,s*.09),"#ffe9c8","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 4 · blodets resa: kretslopp, en minut, fem liter */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,9.9,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const R=Math.max(60,Math.min(a.w*.16,a.h*.28,s*.28)),lx=cx-R*1.05,rx=cx+R*1.05,hy=cy;
      /* två kretslopp: lungor (blå) och kropp (röd) */
      const loop=(ox,col,glow)=>{c.strokeStyle=col;c.lineWidth=Math.max(5,R*.07);c.shadowColor=glow;c.shadowBlur=14;c.beginPath();c.ellipse(ox,hy,R,R*.62,0,0,TAU);c.stroke();c.shadowBlur=0;};
      loop(lx,"rgba(80,140,230,.55)","#4a8aff");loop(rx,"rgba(230,60,70,.55)","#ff4a5a");
      const cells=(ox,rgb,off)=>{for(let i=0;i<26;i++){const q=((i/26+t*.2+off)%1)*TAU,X=ox+Math.cos(q)*R,Y=hy+Math.sin(q)*R*.62;gl(X,Y,R*.1,`rgba(${rgb},.5)`);c.fillStyle=`rgb(${rgb})`;c.beginPath();c.ellipse(X,Y,R*.035,R*.025,q,0,TAU);c.fill();}};cells(lx,"90,150,240",0);cells(rx,"240,70,80",.5);
      heart(cx,hy,R*.32,t,Math.max(0,Math.sin(((t*1.2)%1)*Math.PI))**3);tx("lungor",lx-R*.55,hy-R*.8,"#9ec0ff","center",Math.max(14,s*.037),700);tx("kroppen",rx+R*.55,hy-R*.8,"#ff9aa4","center",Math.max(14,s*.037),700);
      /* minutvisare */
      const dr=Math.max(34,R*.32),dx=cx,dy=a.y+a.h*.2;c.strokeStyle="rgba(255,255,255,.5)";c.lineWidth=3;c.beginPath();c.arc(dx,dy,dr,0,TAU);c.stroke();const fr=((t-2.6)/5.6)%1;c.strokeStyle="#ffd86b";c.lineWidth=4;c.shadowColor="#ffd86b";c.shadowBlur=10;c.beginPath();c.arc(dx,dy,dr,-Math.PI/2,-Math.PI/2+TAU*fr);c.stroke();c.shadowBlur=0;tx("1 min",dx,dy+dr*.3,"#fff","center",Math.max(15,dr*.5),700);
      if(t>5.6){c.globalAlpha=g*eo((t-5.6)/1);tx("≈ 5 liter blod varje minut",cx,a.y+a.h*.9,"#ffd0d0","center",Math.max(18,s*.048),700);}
      c.restore();}};

  /* 5 · tänder: emalj och trettiotvå */
  const tooth=(px,py,r,col)=>{const c=x();c.save();c.translate(px,py);const g=c.createLinearGradient(-r,-r,r,r);g.addColorStop(0,"#ffffff");g.addColorStop(1,col||"#cfe4f4");c.fillStyle=g;c.strokeStyle="rgba(120,160,200,.7)";c.lineWidth=Math.max(1.5,r*.05);c.beginPath();c.moveTo(-r*.8,-r*.7);c.bezierCurveTo(-r*.9,-r*1.2,-r*.2,-r*1.1,0,-r*.8);c.bezierCurveTo(r*.2,-r*1.1,r*.9,-r*1.2,r*.8,-r*.7);c.bezierCurveTo(r*.9,r*.1,r*.5,r*.4,r*.4,r*1.2);c.quadraticCurveTo(r*.15,r*1.35,r*.05,r*.5);c.quadraticCurveTo(0,r*.3,-r*.05,r*.5);c.quadraticCurveTo(-r*.15,r*1.35,-r*.4,r*1.2);c.bezierCurveTo(-r*.5,r*.4,-r*.9,r*.1,-r*.8,-r*.7);c.closePath();c.fill();c.stroke();c.restore();};
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,11.1,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);
      if(t<7.7){const r=Math.max(60,Math.min(a.w*.12,a.h*.24,s*.22)),tx0=cx-a.w*.18,ty=cy;gl(tx0,ty,r*2.6,"rgba(160,220,255,.22)");tooth(tx0,ty,r);
        const sh=.6+.4*Math.sin(t*2.4);c.strokeStyle=`rgba(190,235,255,${.45+.35*sh})`;c.lineWidth=7;c.shadowColor="#9fd8ff";c.shadowBlur=18;c.beginPath();c.moveTo(tx0-r*.8,-r*.7+ty);c.bezierCurveTo(tx0-r*.9,ty-r*1.2,tx0-r*.2,ty-r*1.1,tx0,ty-r*.8);c.bezierCurveTo(tx0+r*.2,ty-r*1.1,tx0+r*.9,ty-r*1.2,tx0+r*.8,ty-r*.7);c.stroke();c.shadowBlur=0;
        const sx=tx0+r*.2+((t*.5)%1)*r*.4;gl(tx0-r*.3+((t*.4)%1)*r*.9,ty-r*.95,r*.25,"rgba(255,255,255,.7)");
        tx("emalj: hårdast i kroppen",cx+a.w*.14,cy-r*.4,"#bfe8ff","center",Math.max(18,s*.048),700);tx("växer inte tillbaka",cx+a.w*.14,cy+r*.1,"#ffb8b0","center",Math.max(16,s*.042),700);tx("borsta tänderna!",cx+a.w*.14,cy+r*.6,"#ffe9a8","center",Math.max(16,s*.042),700);}
      else{const q=eo((t-7.7)/1),n=16,r=Math.max(16,Math.min(a.w*.03,s*.055));c.globalAlpha=g*q;for(let row=0;row<2;row++)for(let i=0;i<n;i++){const k=eo((t-8-(row*n+i)*.04)/.3);if(k<=0)continue;const ang=Math.PI*(.12+.76*i/(n-1)),rr=Math.min(a.w*.3,s*.55),X=cx+Math.cos(ang+Math.PI)*rr*(row?.95:1.0)*-1,Y=cy+(row?-1:1)*Math.sin(ang)*rr*.55-(row?0:0);c.globalAlpha=g*k;tooth(X,Y,r*(row?.9:1),row?"#dbe9f6":"#cfe4f4");}
        c.globalAlpha=g*q;tx("upp till 32 tänder",cx,a.y+a.h*.14,"#ffe9a8","center",Math.max(22,s*.062),700);}
      c.restore();}};

  /* 6 · näsan: doftmolekyler till minnescentrum */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,9.4,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const fw=Math.min(a.w*.3,s*.55),fh=fw*.78,fx=a.x+a.w*.2;frame(6,fx,cy,fw,fh);
      const bw=Math.min(a.w*.34,s*.62),bh=bw*.72,bx=cx+a.w*.2,by=cy;c.save();brainPath(bx,by,bw,bh);c.fillStyle="rgba(150,90,130,.3)";c.fill();c.restore();c.strokeStyle="rgba(255,190,205,.7)";c.lineWidth=2.5;brainPath(bx,by,bw,bh);c.stroke();
      /* minnescentrum glöder */const pu=.6+.4*Math.sin(t*3),hx=bx+bw*.04,hy2=by+bh*.12;gl(hx,hy2,bw*.3*pu,"rgba(255,220,120,.55)");c.strokeStyle="rgba(255,235,140,.95)";c.lineWidth=6;c.lineCap="round";c.shadowColor="#ffe080";c.shadowBlur=18;c.beginPath();c.arc(hx,hy2,bw*.1,Math.PI*.9,Math.PI*1.9);c.stroke();c.shadowBlur=0;
      /* molekyler från blomman via näsan in till minnet */
      const R=srand(15),sx=fx+fw*.15,sy=cy+fh*.1;for(let i=0;i<46;i++){const q=((t*.22+R())%1),sw=Math.sin(q*9+i)*s*.025;const px=lerp(sx,hx,q)+sw,py=lerp(sy,hy2,q)-Math.sin(q*Math.PI)*s*.12+sw*.4;const col=i%2?"rgba(255,150,200,.8)":"rgba(255,230,140,.8)";gl(px,py,s*.022*(.6+q),col);dot(px,py,Math.max(1.8,s*.004),"#fff");}
      tx("tusentals dofter",cx-a.w*.02,a.y+a.h*.12,"#ffd0e0","center",Math.max(20,s*.055),700);tx("minnescentrum",bx,by+bh*.78,"#ffe9a8","center",Math.max(15,s*.04),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
