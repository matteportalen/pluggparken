/* Allt är gjort av atomer: minilektionen som film (sju scener, ca 1,8 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas, glöd och partiklar).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/atom/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/atom-1..6.jpg. MPAtomFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.8,cap:[[0.5,"Allt omkring dig är byggt av något otroligt litet. Det här är berättelsen om atomerna."]]},
 {k:"01 · Små byggstenar",d:20.1,cap:[[0.8,"Allt du ser, och du själv, är gjort av atomer. De är så små att man inte kan se dem, inte ens i ett vanligt mikroskop."],[11.5,"Det finns ungefär hundra olika sorters atomer. Blandar man dem på olika sätt får man allt från luft och vatten till sten och hundar."]]},
 {k:"02 · Hur små?",d:12.2,cap:[[0.8,"Lägg atomerna på rad över ett enda hårstrå, och det ryms flera hundra tuusen."],[6.4,"En enda vattendroppe innehåller ungefär fem tuusen miljarder miljarder atomer."]]},
 {k:"03 · Tre delar",d:19.8,cap:[[0.8,"En atom har tre delar. I mitten sitter kärnan, med protoner och neutroner. Runt den susar elektronerna."],[10.2,"Antalet protoner avgör vilket ämne det är. En proton ger väte, sex ger kol, och sjuttionio ger guld."]]},
 {k:"04 · Nästan tom",d:15.3,cap:[[0.8,"Och en atom är nästan helt tom. Om kärnan var en ärta, skulle elektronerna sväva flera hundra meter bort."],[9.4,"Det som hindrar dig från att falla rakt igenom stolen är krafterna mellan elektronerna."]]},
 {k:"05 · Stjärnstoft",d:15.6,cap:[[0.8,"Väte bildades strax efter Big Bang, för tretton komma åtta miljarder år sedan."],[6,"Tyngre atomer, som kol, syre och järn, tillverkades inne i stjärnor. Guld bildas bland annat när neutronstjärnor krockar."]]},
 {k:"06 · Du",d:17.5,cap:[[0.8,"När stjärnor exploderade spreddes atomerna ut i rymden, och blev till nya stjärnor, planeter och till slut till dig."],[9.7,"I din kropp finns ungefär sju miljarder miljarder miljarder atomer. Du är, på riktigt, gjord av stjärnstoft."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Allt är gjort av atomer",under:"En film i sju steg · ca 1,8 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Du består av atomer som är äldre än solen. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={"1":"National Institute of Standards and… · Public domain · Wikimedia Commons","2":"Yana Balakhonova · CC BY-SA 4.0 · Wikimedia Commons","3":"SrKellyOP · CC0 · Wikimedia Commons","4":"U.S. Department of Energy from United… · Public domain · Wikimedia Commons","5":"NASA, H. Ford (JHU), G. Illingworth… · CC BY 4.0 · Wikimedia Commons","6":"ESO · CC BY 4.0 · Wikimedia Commons"};

window.MPAtomFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"atom",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"atom-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title,srand}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};
  const frame=(n,px,py,w,h)=>{const c=x(),im=L.img(n);if(!L.ok(im))return;const ir=im.width/im.height,fr=w/h;let sw,sh,sx,sy;if(ir>fr){sh=im.height;sw=sh*fr;sx=(im.width-sw)/2;sy=0;}else{sw=im.width;sh=sw/fr;sx=0;sy=(im.height-sh)/2;}
    c.save();c.shadowColor="rgba(120,180,255,.4)";c.shadowBlur=30;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.fillStyle="#000";c.fill();c.shadowBlur=0;c.clip();c.drawImage(im,sx,sy,sw,sh,px-w/2,py-h/2,w,h);c.restore();c.save();c.strokeStyle="rgba(160,200,255,.7)";c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.stroke();c.restore();};
  /* kula med volym (proton, neutron, atom) */
  const ball=(px,py,r,c1,c2)=>{const c=x();c.save();const g=c.createRadialGradient(px-r*.35,py-r*.35,r*.1,px,py,r);g.addColorStop(0,c1);g.addColorStop(1,c2);c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};
  /* atom: kärna av protoner (röda) och neutroner (grå), elektroner i skal */
  const atom=(px,py,R,Z,t,o)=>{const c=x();o=o||{};const sh=[2,8,18,32];let rem=Z,k=0;const shells=[];while(rem>0&&k<4){const n=Math.min(sh[k],rem);shells.push(n);rem-=n;k++;}
    gl(px,py,R*1.7,"rgba(120,170,255,.16)");
    shells.forEach((n,i)=>{const rr=R*(.42+.58*(i+1)/shells.length);c.strokeStyle="rgba(150,190,255,.3)";c.lineWidth=Math.max(1.2,R*.015);c.beginPath();c.ellipse(px,py,rr,rr*.38,i*.55,0,TAU);c.stroke();
      for(let j=0;j<n;j++){const an=t*(1.6-i*.3)+j*TAU/n,ex=Math.cos(an)*rr,ey=Math.sin(an)*rr*.38,ca=Math.cos(i*.55),sa=Math.sin(i*.55),X=px+ex*ca-ey*sa,Y=py+ex*sa+ey*ca;gl(X,Y,R*.1,"rgba(120,200,255,.95)");dot(X,Y,Math.max(1.6,R*.022),"#e8f6ff");}});
    const nn=Math.min(Z*2,30),kr=R*(.07+.06*Math.sqrt(Math.min(Z,30)/6)),Rr=srand(Z+3);gl(px,py,kr*3,"rgba(255,120,100,.35)");
    for(let i=0;i<nn;i++){const an=Rr()*TAU,d=Math.sqrt(Rr())*kr;ball(px+Math.cos(an)*d,py+Math.sin(an)*d,Math.max(2,R*.026),i%2?"#ff9a8a":"#b8c4dc",i%2?"#c8362c":"#6a7a98");}};

  const s0=(t)=>{photo(1,t,6.8,1.12,.3);const f=title(t,"ATOMERNA","ALLTINGS BYGGSTENAR","#bfe0ff");cred(1,.55*f);};

  /* 1 · små byggstenar, ungefär hundra sorter */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,20.1,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);
      if(t<11.5){const fw=Math.min(a.w*.5,s*.9),fh=fw*.7;frame(1,cx,cy,fw,fh);tx("så ser atomer ut i ett särskilt mikroskop",cx,cy+fh/2+Math.max(30,s*.07),"#bfe0ff","center",Math.max(15,s*.04),700);tx("allt är gjort av atomer",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(20,s*.055),700);
        const R=srand(3);for(let i=0;i<30;i++){const px=cx+(R()-.5)*fw*1.5,py=cy+(R()-.5)*fh*1.5;if(Math.abs(px-cx)<fw/2&&Math.abs(py-cy)<fh/2)continue;gl(px,py,Math.max(8,s*.02),`rgba(140,190,255,${.25+.2*Math.sin(t*2+i)})`);}}
      else{const q=eo((t-11.5)/1);c.globalAlpha=g*q;tx("ungefär hundra sorters atomer",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(19,s*.052),700);
        const cols=Math.max(10,Math.floor(Math.min(a.w*.8,s*1.4)/Math.max(18,s*.034))),rows=Math.ceil(100/cols),tw=Math.min(a.w*.8,s*1.4)/cols,th=tw*.8,lx=cx-cols*tw/2,ty=a.y+a.h*.2;const hue=[0,35,55,120,200,260,310];
        for(let i=0;i<100;i++){const r=Math.floor(i/cols),cc=i%cols,k2=eo((t-11.8-i*.03)/.5);if(k2<=0)continue;const col=hue[(i*7)%7];c.fillStyle=`hsla(${col+i%5*8},80%,60%,${.8*k2})`;c.fillRect(lx+cc*tw+1,ty+r*th+1,tw-2,th-2);}
        if(t>14.5){const bw=Math.min(a.w*.8,s*1.4)/3,by=a.y+a.h*.74,k3=eo((t-14.5)/1.2);c.globalAlpha=g*k3;
          /* vatten */const wx=cx-bw,r=Math.max(10,s*.032);ball(wx,by,r,"#ff9a8a","#c8362c");ball(wx-r*1.5,by+r*.9,r*.6,"#fff","#9ab0d0");ball(wx+r*1.5,by+r*.9,r*.6,"#fff","#9ab0d0");tx("vatten",wx,by+r*3.2,"#bfe0ff","center",Math.max(14,s*.037),700);
          /* luft: N2 */const ax=cx;ball(ax-r*.9,by,r*.9,"#6a9aff","#2a4ab0");ball(ax+r*.9,by,r*.9,"#6a9aff","#2a4ab0");tx("luft",ax,by+r*3.2,"#bfe0ff","center",Math.max(14,s*.037),700);
          /* sten: gitter */const sx=cx+bw;for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++)ball(sx+i*r*1.7,by+j*r*1.3,r*.7,(i+j)%2?"#d8c8a0":"#a89878","#6a5a40");tx("sten",sx,by+r*3.2,"#bfe0ff","center",Math.max(14,s*.037),700);}}
      c.restore();}};

  /* 2 · hur små? hårstrå och vattendroppe */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,12.2,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);
      if(t<6.4){const fw=Math.min(a.w*.46,s*.85),fh=fw*.62;frame(2,cx,cy-s*.03,fw,fh);const by=cy-s*.03+fh/2+Math.max(26,s*.06),lx=cx-fw*.23,rx=cx+fw*.23;
        /* atomrad över hårets bredd */
        const n=Math.floor(60*eo((t-3.2)/2.2));for(let i=0;i<n;i++){const px=lerp(lx,rx,i/59);gl(px,by,Math.max(5,s*.012),"rgba(120,190,255,.7)");dot(px,by,Math.max(2,s*.005),"#e8f6ff");}
        c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=2;c.beginPath();c.moveTo(lx,by+Math.max(12,s*.03));c.lineTo(rx,by+Math.max(12,s*.03));c.stroke();
        tx("flera hundratusen atomer över ett hårstrå",cx,by+Math.max(48,s*.1),"#ffd86b","center",Math.max(16,s*.042),700);}
      else{const q=eo((t-6.4)/1),r=Math.max(40,Math.min(a.w*.09,a.h*.18,s*.16)),dx=cx,dy=cy;c.globalAlpha=g*q;
        gl(dx,dy,r*2.6,"rgba(90,160,255,.22)");const dg=c.createRadialGradient(dx-r*.3,dy-r*.2,r*.1,dx,dy+r*.2,r*1.3);dg.addColorStop(0,"rgba(190,225,255,.9)");dg.addColorStop(1,"rgba(60,120,220,.7)");c.fillStyle=dg;c.beginPath();c.moveTo(dx,dy-r*1.5);c.bezierCurveTo(dx+r*1.1,dy-r*.2,dx+r*1.1,dy+r*1.1,dx,dy+r*1.1);c.bezierCurveTo(dx-r*1.1,dy+r*1.1,dx-r*1.1,dy-r*.2,dx,dy-r*1.5);c.fill();
        const R=srand(12);for(let i=0;i<80;i++){const an=R()*TAU,d=Math.sqrt(R())*r*.8,X=dx+Math.cos(an+t*.4*(R()-.5))*d,Y=dy+r*.1+Math.sin(an)*d*.9;gl(X,Y,r*.12,i%3?"rgba(255,255,255,.55)":"rgba(255,120,100,.6)");}
        tx("5 · 10²¹ atomer",dx,dy+r*2.2,"#ffd86b","center",Math.max(22,s*.06),700);tx("fem tusen miljarder miljarder",dx,dy+r*2.2+Math.max(32,s*.07),"#bfe0ff","center",Math.max(14,s*.037),700);}
      c.restore();}};

  /* 3 · tre delar och antal protoner */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,19.8,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);
      if(t<10.2){const R=Math.min(a.w*.2,a.h*.34,s*.36);atom(cx,cy,R,6,t);const f=Math.max(15,s*.04);
        const lab=(txt,X,Y,col,al)=>{tx(txt,X,Y,col,al,f,700);};
        const q1=eo((t-4)/.8),q2=eo((t-5.6)/.8),q3=eo((t-7.4)/.8);
        c.globalAlpha=g*q1;lab("kärna",cx+R*.1,cy+R*.38,"#ffd86b","center");c.strokeStyle="rgba(255,216,107,.6)";c.beginPath();c.moveTo(cx,cy+R*.2);c.lineTo(cx+R*.1,cy+R*.3);c.stroke();
        c.globalAlpha=g*q2;lab("protoner och neutroner",Math.max(a.x+14,cx-R*1.15),cy-R*.78,"#ff9a8a","left");
        c.globalAlpha=g*q3;lab("elektroner",Math.min(a.x+a.w-14,cx+R*1.15),cy+R*.78,"#9fd8ff","right");}
      else{const q=eo((t-10.2)/1),R=Math.min(a.w*.11,a.h*.24,s*.2);c.globalAlpha=g*q;const items=[[1,"väte","H",-1],[6,"kol","C",0],[79,"guld","Au",1]];
        items.forEach(([Z,nm,sy,k],i)=>{const qq=eo((t-10.6-i*1.1)/.9);if(qq<=0)return;const X=cx+k*R*2.5;c.save();c.globalAlpha=g*qq;atom(X,cy,R,Z,t+i);tx(sy,X,cy-R*1.12,"#fff","center",Math.max(22,s*.055),700);tx(nm+" · "+Z+(Z===1?" proton":" protoner"),X,cy+R*1.2,"#ffd86b","center",Math.max(14,s*.037),700);c.restore();});}
      c.restore();}};

  /* 4 · nästan tom: ärtan och elektronerna, krafter mellan elektroner */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,15.3,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);
      if(t<9.4){const w=Math.min(a.w*.84,s*1.6),lx=cx-w/2,y=cy,k=eo((t-3)/3);
        /* tre fotbollsplaner à 105 m = 315 m */
        for(let i=0;i<3;i++){const fx=lx+i*w/3,fw=w/3;c.fillStyle=i%2?"rgba(40,130,70,.5)":"rgba(50,150,80,.5)";c.fillRect(fx,y-s*.07,fw,s*.14);c.strokeStyle="rgba(255,255,255,.55)";c.lineWidth=2;c.strokeRect(fx,y-s*.07,fw,s*.14);c.beginPath();c.moveTo(fx+fw/2,y-s*.07);c.lineTo(fx+fw/2,y+s*.07);c.stroke();}
        tx("ca 300 m",lx+w/2,y+s*.17,"#ffd86b","center",Math.max(18,s*.048),700);
        gl(lx,y,Math.max(24,s*.06),"rgba(255,230,120,.6)");ball(lx,y,Math.max(4,s*.011),"#8ac85a","#3a7a28");tx("kärnan = en ärta",lx,y-s*.12,"#cfe8a8","left",Math.max(14,s*.037),700);
        const ex=lx+w*k;gl(ex,y,Math.max(16,s*.04),"rgba(130,210,255,.9)");dot(ex,y,Math.max(3,s*.007),"#e8f6ff");if(k>.8)tx("elektron",ex,y-s*.12,"#9fd8ff","right",Math.max(14,s*.037),700);
        tx("däremellan: tomrum",cx,a.y+a.h*.14,"#cfd8ff","center",Math.max(18,s*.048),700);}
      else{const q=eo((t-9.4)/1);c.globalAlpha=g*q;const w=Math.min(a.w*.7,s*1.3),lx=cx-w/2,n=6,gap=s*.05;
        const row=(yy,col,sgn)=>{for(let i=0;i<n;i++){const X=lx+w*(i+.5)/n;gl(X,yy,s*.075,col.replace("A",".28"));ball(X,yy,Math.max(5,s*.015),"#fff",col.replace("A","1"));for(let j=0;j<3;j++){const an=t*2+i*1.3+j*2.1;gl(X+Math.cos(an)*s*.04,yy+Math.sin(an)*s*.04*.6,s*.016,"rgba(130,210,255,.9)");}}};
        row(cy-gap*1.6,"rgba(255,170,120,A)");row(cy+gap*1.6,"rgba(160,200,255,A)");
        for(let i=0;i<n;i++){const X=lx+w*(i+.5)/n,pu=1+.25*Math.sin(t*5+i);c.strokeStyle="rgba(255,235,140,.8)";c.lineWidth=3;c.beginPath();c.moveTo(X,cy-gap*.55*pu);c.lineTo(X,cy-gap*.15);c.moveTo(X,cy+gap*.55*pu);c.lineTo(X,cy+gap*.15);c.stroke();gl(X,cy,s*.03,"rgba(255,235,140,.6)");}
        tx("du",lx-s*.01,cy-gap*1.6,"#ffb878","right",Math.max(15,s*.04),700);tx("stolen",lx-s*.01,cy+gap*1.6,"#9fc8ff","right",Math.max(15,s*.04),700);tx("elektronerna stöter bort varandra",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 5 · Big Bang, stjärnor, neutronstjärnor */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,15.6,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const tl=(sy,nm,col,px,py,sz)=>{c.save();gl(px,py,sz*1.4,col.replace("A",".3"));c.fillStyle="rgba(255,255,255,.08)";c.strokeStyle=col.replace("A","1");c.lineWidth=3;c.fillRect(px-sz/2,py-sz/2,sz,sz);c.strokeRect(px-sz/2,py-sz/2,sz,sz);tx(sy,px,py+sz*.14,"#fff","center",sz*.5,700);tx(nm,px,py+sz*.42,col.replace("A","1"),"center",Math.max(11,sz*.15),700);c.restore();};
      const sz=Math.max(54,Math.min(a.w*.1,s*.14));
      if(t<6){const k=cl((t-3)/2.4,0,1);gl(cx,cy,s*(.1+.8*k),`rgba(255,240,200,${.9*(1-k*.6)})`);const R=srand(4);for(let i=0;i<70;i++){const an=R()*TAU,sp=.4+R()*.6,d=k*sp*Math.min(a.w,a.h)*.5;gl(cx+Math.cos(an)*d,cy+Math.sin(an)*d,s*.025,"rgba(255,230,180,.8)");}
        if(k>.5)tl("H","väte","rgba(255,200,120,A)",cx,cy,sz*eo((k-.5)/.5));tx("Big Bang · 13,8 miljarder år sedan",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(18,s*.048),700);}
      else if(t<11.5){const q=eo((t-6)/1);c.globalAlpha=g*q;const R=Math.max(30,s*.07);gl(cx-a.w*.28,cy,R*3,"rgba(255,220,140,.35)");ball(cx-a.w*.28,cy,R,"#fff4c0","#ffb830");tx("inne i stjärnor",cx-a.w*.28,cy+R*1.9,"#ffd86b","center",Math.max(15,s*.04),700);
        [["C","kol","rgba(150,150,170,A)"],["O","syre","rgba(120,200,255,A)"],["Fe","järn","rgba(255,130,100,A)"]].forEach(([sy,nm,col],i)=>{const qq=eo((t-7.2-i*.8)/.7);if(qq<=0)return;c.globalAlpha=g*qq;tl(sy,nm,col,cx+a.w*.04+i*(sz+s*.03),cy,sz);});}
      else{const q=eo((t-11.5)/1);c.globalAlpha=g*q;const k=cl((t-11.8)/2.2,0,1),R=Math.max(12,s*.025),d=lerp(s*.2,0,eo(k)),an=t*5*(1+k*2);[[0],[Math.PI]].forEach(([ph])=>{const X=cx-a.w*.18+Math.cos(an+ph)*d,Y=cy+Math.sin(an+ph)*d*.5;gl(X,Y,R*3,"rgba(160,200,255,.6)");ball(X,Y,R,"#fff","#7a9ae0");});
        if(k>.95){gl(cx-a.w*.18,cy,s*.35*(1+Math.sin(t*10)*.1),"rgba(255,240,180,.7)");}tx("neutronstjärnor krockar",cx-a.w*.18,cy+s*.3,"#bfe0ff","center",Math.max(15,s*.04),700);if(k>.9)tl("Au","guld","rgba(255,216,80,A)",cx+a.w*.2,cy,sz);}
      c.restore();}};

  /* 6 · stjärnstoft: partiklar från en explosion bildar en människa */
  const sil=(()=>{const R=srand(77),p=[];while(p.length<1100){const X=R()*1.6-.8,Y=R()*2.6-1.3;const head=Math.hypot(X,Y+.92)<.3,torso=Math.abs(X)<.42&&Y>-.55&&Y<.55,arms=Math.abs(X)>.42&&Math.abs(X)<.64&&Y>-.5&&Y<.5,legs=Math.abs(X)>.03&&Math.abs(X)<.4&&Y>=.55&&Y<1.3;if(head||torso||arms||legs)p.push([X,Y]);}return p;})();
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,17.5,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const R=srand(9),ox=cx-a.w*.28,oy=cy-s*.08,H=Math.min(a.h*.3,s*.34);
      const burst=cl((t-3)/3,0,1),gather=eo((t-5.5)/4);
      if(t<5.6){gl(ox,oy,s*(.08+.2*burst),"rgba(255,220,140,.6)");}
      for(let i=0;i<sil.length;i++){const an=R()*TAU,sp=.3+R()*.7,d=burst*sp*Math.min(a.w,a.h)*.6;const ex=ox+Math.cos(an)*d,ey=oy+Math.sin(an)*d*.7;const tx0=cx+a.w*.14+sil[i][0]*H*.62,ty0=cy-H*.1+sil[i][1]*H*.62;const X=lerp(ex,tx0,gather)+Math.sin(t*2+i)*2*(1-gather),Y=lerp(ey,ty0,gather)+Math.cos(t*2+i)*2*(1-gather);if(burst<=0)continue;gl(X,Y,Math.max(4,s*.01),gather>.5?"rgba(160,210,255,.8)":"rgba(255,200,120,.8)");}
      if(t>9.7){const q=eo((t-9.7)/1.2);c.globalAlpha=g*q;tx("≈ 7 · 10²⁷ atomer",cx+a.w*.14,cy+H*.82+Math.max(30,s*.07),"#ffd86b","center",Math.max(20,s*.055),700);tx("sju miljarder miljarder miljarder",cx+a.w*.14,cy+H*.82+Math.max(58,s*.13),"#bfe0ff","center",Math.max(13,s*.034),700);tx("stjärnstoft",cx-a.w*.28,a.y+a.h*.14,"#ffd86b","center",Math.max(22,s*.06),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
