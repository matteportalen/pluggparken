/* Din hjärna: minilektionen som film (sex scener, ca 1,6 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas, glöd, nervnät och partiklar).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/hjarnan/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/hjarnan-1..6.jpg. MPHjarnFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.3,cap:[[0.5,"Den väger bara ett och ett halvt kilo, men den styr allt du gör. Det här är berättelsen om din hjärna."]]},
 {k:"01 · Kroppens chef",d:15.2,cap:[[0.8,"Hjärnan styr allt du tänker, känner, rör dig och minns. Den väger ungefär 1,4 kilo."],[9,"Den känns mjuk som gelé, och ungefär tre fjärdedelar av den är vatten."]]},
 {k:"02 · Miljarder trådar",d:13.9,cap:[[0.8,"Hjärnan har ungefär 86 miljarder nervceller. De skickar små elektriska signaler till varandra."],[7.8,"Signalerna kan färdas över hundra meter i sekunden, snabbare än en racerbil."]]},
 {k:"03 · Energi",d:13.2,cap:[[0.8,"Hjärnan är bara en liten del av kroppen, men använder ungefär en femtedel av all energi."],[6.9,"Och ändå räcker det med ungefär 20 watt, ungefär lika mycket som en svag glödlampa."]]},
 {k:"04 · Sömn",d:12.8,cap:[[0.8,"När du sover sorterar hjärnan det du har lärt dig. Därför är sömn viktigt för att komma ihåg."],[7.2,"Forskare har också sett att hjärnan städar bort avfall medan du sover."]]},
 {k:"05 · Tränas",d:20.8,cap:[[0.8,"Varje gång du lär dig något nytt bildas nya kopplingar mellan nervcellerna. Första gången du cyklade var det svårt. Nu klarar hjärnan det nästan av sig själv."],[11.1,"Hos taxichaufförer i London har forskare sett att den del av hjärnan som minns vägar är större. Hjärnan tränas, precis som en muskel."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Din hjärna",under:"En film i sex steg · ca 1,6 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Hjärnan tränas av det du gör. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={"1":"511KeV · CC BY-SA 4.0 · Wikimedia Commons","2":"Gaetan Lee from London, UK · CC BY 2.0 · Wikimedia Commons","3":"Yourazidan · CC BY-SA 4.0 · Wikimedia Commons","4":"JonRichfield · CC BY-SA 4.0 · Wikimedia Commons","5":"Francesco Bartolozzi · CC0 · Wikimedia Commons","6":"Alextredz · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPHjarnFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"hjarnan",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"hjarnan-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title,srand}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,Math.max(.1,r));g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();c.restore();};
  const frame=(n,px,py,w,h)=>{const c=x(),im=L.img(n);if(!L.ok(im))return;const ir=im.width/im.height,fr=w/h;let sw,sh,sx,sy;if(ir>fr){sh=im.height;sw=sh*fr;sx=(im.width-sw)/2;sy=0;}else{sw=im.width;sh=sw/fr;sx=0;sy=(im.height-sh)/2;}
    c.save();c.shadowColor="rgba(255,140,160,.35)";c.shadowBlur=28;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.fillStyle="#000";c.fill();c.shadowBlur=0;c.clip();c.drawImage(im,sx,sy,sw,sh,px-w/2,py-h/2,w,h);c.restore();c.save();c.strokeStyle="rgba(255,170,190,.7)";c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.stroke();c.restore();};
  const BG=a=>grad(a,[[0,"#080a16"],[1,"#140d1e"]]);
  /* hjärna sedd från sidan: kontur med gyri, hjärnstam och lillhjärna */
  const brainPath=(px,py,w,h)=>{const c=x();c.beginPath();const N=120;for(let i=0;i<=N;i++){const th=i/N*TAU,bump=1+.045*Math.sin(th*13)+.025*Math.sin(th*7+1);let X=Math.cos(th)*w/2*bump,Y=Math.sin(th)*h/2*(Math.sin(th)>0?.78:1)*bump;i?c.lineTo(px+X,py+Y):c.moveTo(px+X,py+Y);}c.closePath();};
  const inBrain=(X,Y)=>{return X*X+Y*Y<1&&!(Y>.55&&X>.15);};
  const NODES=(()=>{const R=srand(21),p=[];while(p.length<170){const X=R()*2-1,Y=R()*2-1;if(X*X+Y*Y<.92)p.push([X,Y,R()]);}const links=[];p.forEach((a,i)=>{const d=p.map((b,j)=>[j,Math.hypot(a[0]-b[0],a[1]-b[1])]).filter(z=>z[0]!==i).sort((u,v)=>u[1]-v[1]).slice(0,3);d.forEach(z=>{if(z[0]>i||!links.some(l=>l[0]===z[0]&&l[1]===i))links.push([i,z[0]]);});});return{p,links};})();
  const net=(px,py,w,h,t,lit,hue)=>{const c=x();c.save();c.lineWidth=1.1;NODES.links.forEach(([i,j],k)=>{const A=NODES.p[i],B=NODES.p[j];const X1=px+A[0]*w/2,Y1=py+A[1]*h/2*.9,X2=px+B[0]*w/2,Y2=py+B[1]*h/2*.9;c.strokeStyle=`rgba(${hue||"255,140,170"},${.16*lit})`;c.beginPath();c.moveTo(X1,Y1);c.lineTo(X2,Y2);c.stroke();const q=((t*.7+k*.137)%1);if(((k*7)%5)<2){const X=lerp(X1,X2,q),Y=lerp(Y1,Y2,q);gl(X,Y,w*.03,`rgba(${hue||"255,200,120"},${.85*lit})`);}});
    NODES.p.forEach((a,i)=>{const f=.5+.5*Math.sin(t*2+a[2]*20);gl(px+a[0]*w/2,py+a[1]*h/2*.9,w*.025*(1+f),`rgba(${hue||"255,150,180"},${.35*lit*f})`);});c.restore();};

  const s0=(t)=>{photo(1,t,7.3,1.12,.3);const f=title(t,"DIN HJÄRNA","KROPPENS CHEF","#ffc0cf");cred(1,.55*f);};

  /* 1 · kroppens chef: 1,4 kg, gelé, vatten */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,15.2,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const w=Math.min(a.w*.46,s*.9),h=w*.72,bx=cx-a.w*.14,by=cy-s*.02;
      gl(bx,by,w*.9,"rgba(255,120,160,.18)");const bg=c.createRadialGradient(bx-w*.2,by-h*.2,w*.05,bx,by,w*.6);bg.addColorStop(0,"rgba(240,170,190,.55)");bg.addColorStop(1,"rgba(150,70,100,.4)");c.fillStyle=bg;brainPath(bx,by,w,h);c.fill();c.strokeStyle="rgba(255,190,205,.75)";c.lineWidth=2.5;c.stroke();
      c.save();brainPath(bx,by,w,h);c.clip();net(bx,by,w,h,t,eo((t-3)/1.5));c.restore();
      /* vattenmätare: tre fjärdedelar */
      const mx=cx+a.w*.24,mh=h*1.05,mw=Math.max(30,w*.12),k=eo((t-9)/1.5);
      tx("1,4 kg",bx,by+h*.75,"#ffd0dc","center",Math.max(22,s*.06),700);
      if(t>9){c.globalAlpha=g*eo((t-9)/1);c.fillStyle="rgba(255,255,255,.08)";c.strokeStyle="rgba(180,220,255,.7)";c.lineWidth=3;c.fillRect(mx-mw/2,cy-mh/2,mw,mh);c.strokeRect(mx-mw/2,cy-mh/2,mw,mh);const wg=c.createLinearGradient(0,cy+mh/2,0,cy-mh/2);wg.addColorStop(0,"#2a78c8");wg.addColorStop(1,"#7ac0ff");c.fillStyle=wg;const fh=mh*.75*k;c.fillRect(mx-mw/2,cy+mh/2-fh,mw,fh);for(let i=0;i<6;i++){const q=((t*.5+i*.17)%1);gl(mx+Math.sin(t*2+i)*mw*.3,cy+mh/2-q*fh,mw*.3,"rgba(200,235,255,.5)");}
        tx("≈ 75 % vatten",mx,cy+mh/2+Math.max(30,s*.07),"#bfe0ff","center",Math.max(17,s*.045),700);tx("mjuk som gelé",mx,cy-mh/2-Math.max(16,s*.035),"#ffd0dc","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 2 · en nervcell i närbild, signal, 86 miljarder */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,13.9,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);
      /* nervcell: cellkropp, dendriter, axon */
      const sx=a.x+a.w*.2,sy=cy,len=a.w*.6,R=srand(8),ax=sx+len;
      const branch=(x0,y0,an,l,d)=>{if(d>3||l<s*.012)return;const x1=x0+Math.cos(an)*l,y1=y0+Math.sin(an)*l;c.strokeStyle=`rgba(255,160,190,${.7-d*.12})`;c.lineWidth=Math.max(1,(4-d)*1.6);c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();gl(x1,y1,s*.015,"rgba(255,170,200,.4)");branch(x1,y1,an+.5+R()*.4,l*.62,d+1);branch(x1,y1,an-.5-R()*.4,l*.62,d+1);};
      c.save();c.lineCap="round";for(let i=0;i<5;i++)branch(sx,sy,Math.PI+(i-2)*.55,s*.12,0);
      const axg=c.createLinearGradient(sx,0,ax,0);axg.addColorStop(0,"rgba(255,190,205,.9)");axg.addColorStop(1,"rgba(255,140,170,.5)");c.strokeStyle=axg;c.lineWidth=Math.max(3,s*.01);c.beginPath();c.moveTo(sx,sy);c.lineTo(ax,sy);c.stroke();
      for(let i=0;i<9;i++){c.fillStyle="rgba(255,230,200,.5)";c.fillRect(sx+len*(.12+i*.095),sy-Math.max(3,s*.008),len*.06,Math.max(6,s*.016));}
      for(let i=0;i<4;i++)branch(ax,sy,(i-1.5)*.45,s*.09,1);c.restore();
      const cg=c.createRadialGradient(sx-s*.01,sy-s*.01,0,sx,sy,s*.05);cg.addColorStop(0,"#ffe0ea");cg.addColorStop(1,"#d86a90");c.fillStyle=cg;c.beginPath();c.arc(sx,sy,s*.045,0,TAU);c.fill();gl(sx,sy,s*.14,"rgba(255,120,160,.35)");dot(sx,sy,s*.014,"#8a2a50");
      /* signal */
      const cyc=((t-3)*.45)%1,fast=t>7.8,spd=fast?1.6:.45,pq=Math.max(0,((t-3)*spd)%1);if(t>3.4){const X=lerp(sx,ax,pq);for(let i=0;i<10;i++){gl(X-i*len*.012,sy,s*.03*(1-i*.08),`rgba(255,235,150,${.7*(1-i*.1)})`);}gl(X,sy,s*.09,"rgba(255,220,120,.8)");}
      tx("en nervcell",sx,sy+s*.2,"#ffd0dc","center",Math.max(15,s*.04),700);
      const n=Math.round(86e9*eo((t-3)/4));tx(n.toLocaleString("sv-SE").replace(/ /g," ")+" nervceller",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(20,s*.055),700);
      if(t>7.8){c.globalAlpha=g*eo((t-7.8)/1);tx("signal: över 100 m/s",cx,a.y+a.h*.86,"#ffe9a8","center",Math.max(18,s*.048),700);tx("racerbil: ca 100 m/s",cx,a.y+a.h*.86+Math.max(30,s*.065),"#9fb4d0","center",Math.max(13,s*.034),600);}
      c.restore();}};

  /* 3 · energi: en femtedel, 20 watt */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,13.2,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);
      if(t<6.9){const w=Math.min(a.w*.5,s*.9),lx=cx-w/2,bh=Math.max(32,s*.085),y1=cy-bh*1.1,y2=cy+bh*.7,k1=eo((t-3.2)/1.2),k2=eo((t-4.4)/1.5);
        gl(lx+w*.02*k1,y1+bh/2,bh*2,"rgba(150,200,255,.25)");c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y1,w,bh);c.fillStyle="#7ab0e8";c.fillRect(lx,y1,w*.02*k1*5,bh);tx("vikt: ca 2 % av kroppen",lx,y1-Math.max(10,s*.024),"#bfe0ff","left",Math.max(15,s*.04),700);
        c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y2,w,bh);gl(lx+w*.2*k2,y2+bh/2,bh*2.4,"rgba(255,140,170,.45)");const eg=c.createLinearGradient(lx,0,lx+w*.2,0);eg.addColorStop(0,"#c8486e");eg.addColorStop(1,"#ff9ab8");c.fillStyle=eg;c.fillRect(lx,y2,w*.2*k2*1,bh);tx("energi: ca 20 % av all energi",lx,y2-Math.max(10,s*.024),"#ffc0d0","left",Math.max(15,s*.04),700);}
      else{const q=eo((t-6.9)/1),bx=cx,by=cy-s*.02,r=Math.max(44,s*.12);c.globalAlpha=g*q;const fl=.9+.1*Math.sin(t*9);gl(bx,by,r*3.4*fl,"rgba(255,220,120,.4)");gl(bx,by,r*1.6,"rgba(255,245,200,.6)");
        c.strokeStyle="rgba(255,255,255,.6)";c.lineWidth=3;c.fillStyle="rgba(255,240,190,.25)";c.beginPath();c.arc(bx,by,r,Math.PI*.8,Math.PI*2.2);c.lineTo(bx+r*.35,by+r*1.15);c.lineTo(bx-r*.35,by+r*1.15);c.closePath();c.fill();c.stroke();c.strokeStyle="#ffd060";c.lineWidth=3;c.beginPath();c.moveTo(bx-r*.2,by+r*1.0);c.lineTo(bx-r*.15,by-r*.1);c.quadraticCurveTo(bx,by-r*.35,bx+r*.15,by-r*.1);c.lineTo(bx+r*.2,by+r*1.0);c.stroke();c.fillStyle="#9a9aa6";c.fillRect(bx-r*.4,by+r*1.15,r*.8,r*.35);
        tx("≈ 20 watt",bx,by+r*2.4,"#ffd86b","center",Math.max(24,s*.07),700);tx("en svag glödlampa",bx,by+r*2.4+Math.max(28,s*.06),"#cfd8ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 4 · sömn: hjärnvågor, minnen sorteras, avfall spolas bort */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,12.8,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#050818"],[1,"#101436"]]);const R=srand(5);for(let i=0;i<60;i++){gl(a.x+R()*a.w,a.y+R()*a.h*.6,2+R()*3,`rgba(200,215,255,${.3+.4*Math.abs(Math.sin(t+i))})`);}
      /* måne */gl(a.x+a.w*.85,a.y+a.h*.16,s*.2,"rgba(220,230,255,.35)");dot(a.x+a.w*.85,a.y+a.h*.16,s*.04,"#e8eeff");
      const w=Math.min(a.w*.46,s*.85),h=w*.72,bx=cx,by=cy+s*.02;c.save();brainPath(bx,by,w,h);c.fillStyle="rgba(120,140,220,.25)";c.fill();c.clip();
      if(t<7.2){/* minnen: färgade prickar som sorteras i tre grupper */const cols=["#ffb878","#9fd0ff","#ffd0dc"];for(let i=0;i<54;i++){const gi=i%3,k=eo((t-3.6-(i%9)*.25)/1.6),hx=lerp((R()-.5)*w*.8,(gi-1)*w*.28,k),hy=lerp((R()-.5)*h*.7,(gi===1?-.1:.1)*h,k);gl(bx+hx,by+hy,w*.03,cols[gi].replace("#","")&&"rgba("+(gi===0?"255,184,120":gi===1?"159,208,255":"255,208,220")+",.7)");dot(bx+hx,by+hy,w*.007,cols[gi]);}}
      else{/* spolning: blå partiklar flyter genom hjärnan */for(let i=0;i<70;i++){const q=((t*.25+R())%1),X=lerp(-w*.5,w*.5,q),Y=(R()-.5)*h*.7+Math.sin(q*9+i)*h*.06;gl(bx+X,by+Y,w*.03,"rgba(120,200,255,.55)");}}
      c.restore();c.strokeStyle="rgba(170,190,255,.6)";c.lineWidth=2.5;brainPath(bx,by,w,h);c.stroke();
      /* sömnvågor (EEG) */
      c.strokeStyle="rgba(150,200,255,.85)";c.lineWidth=3;c.shadowColor="#7ab0ff";c.shadowBlur=12;c.beginPath();const wy=a.y+a.h*.82,ww=Math.min(a.w*.7,s*1.3);for(let i=0;i<=120;i++){const q=i/120,X=cx-ww/2+q*ww,Y=wy+Math.sin(q*TAU*2.4-t*1.8)*s*.03*(1+.4*Math.sin(q*5));i?c.lineTo(X,Y):c.moveTo(X,Y);}c.stroke();c.shadowBlur=0;
      tx(t<7.2?"minnen sorteras":"avfall spolas bort",cx,a.y+a.h*.1,"#bfd0ff","center",Math.max(19,s*.052),700);
      c.restore();}};

  /* 5 · tränas: nya kopplingar, cykel, taxichaufförer */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,20.8,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const fw=Math.min(a.w*.34,s*.62),fh=fw*.7;
      if(t<11.1){frame(6,cx-a.w*.22,cy,fw,fh);const w=Math.min(a.w*.4,s*.8),h=w*.72,bx=cx+a.w*.22,by=cy;c.save();brainPath(bx,by,w,h);c.fillStyle="rgba(150,90,130,.25)";c.fill();c.clip();
        const lit=Math.min(1,.2+(t-3)*.1);net(bx,by,w,h,t,lit);
        /* nya kopplingar tänds en efter en */
        const R=srand(30);for(let i=0;i<14;i++){const A=NODES.p[Math.floor(R()*170)],B=NODES.p[Math.floor(R()*170)],k=eo((t-4.5-i*.45)/.6);if(k<=0)continue;const X1=bx+A[0]*w/2,Y1=by+A[1]*h/2*.9,X2=bx+B[0]*w/2,Y2=by+B[1]*h/2*.9;c.strokeStyle=`rgba(255,235,140,${.9*k})`;c.lineWidth=2.5;c.shadowColor="#ffe080";c.shadowBlur=14;c.beginPath();c.moveTo(X1,Y1);c.lineTo(lerp(X1,X2,k),lerp(Y1,Y2,k));c.stroke();c.shadowBlur=0;}c.restore();
        c.strokeStyle="rgba(255,190,205,.7)";c.lineWidth=2.5;brainPath(bx,by,w,h);c.stroke();tx("nya kopplingar",bx,by+h*.7,"#ffe9a8","center",Math.max(17,s*.045),700);}
      else{const w=Math.min(a.w*.56,s*1.05),h=w*.72,bx=cx,by=cy;gl(bx,by,w,"rgba(255,140,170,.15)");c.save();brainPath(bx,by,w,h);c.fillStyle="rgba(150,90,130,.28)";c.fill();c.clip();net(bx,by,w,h,t,1);
        /* hippocampus: en glödande kurva som växer */const k=eo((t-12)/3),gr=1+.35*k;c.strokeStyle="rgba(255,235,140,.95)";c.lineWidth=7*gr;c.lineCap="round";c.shadowColor="#ffe080";c.shadowBlur=22;c.beginPath();c.arc(bx+w*.02,by+h*.12,w*.14*gr,Math.PI*.9,Math.PI*1.9);c.stroke();c.shadowBlur=0;c.restore();c.strokeStyle="rgba(255,190,205,.7)";c.lineWidth=2.5;brainPath(bx,by,w,h);c.stroke();
        tx("minnet för vägar är större hos taxichaufförer",cx,a.y+a.h*.1,"#ffe9a8","center",Math.max(17,s*.045),700);tx("tränas som en muskel",cx,by+h*.62,"#ffd0dc","center",Math.max(19,s*.052),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5];
}
})();
