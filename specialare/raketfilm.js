/* Hur fungerar en raket?: minilektionen som film (nio scener, ca 2 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/raket/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/raket-1..7.jpg. MPRaketFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.9,cap:[[0.5,"Eld, rök och en enorm kraft. Det här är berättelsen om raketer."]]},
 {k:"01 · En gammal uppfinning",d:8.2,cap:[[0.8,"Raketer är en gammal uppfinning. För nästan 800 år sedan använde man små krutraketer i Kina."]]},
 {k:"02 · Gas bakåt",d:12.6,cap:[[0.8,"En raket fungerar genom att trycka ut het gas bakåt. Då åker raketen framåt."],[7.0,"Det kallas rekyl, och du kan känna den om du släpper en uppblåst ballong."]]},
 {k:"03 · Newtons tredje lag",d:13.8,cap:[[0.8,"Isaac Newton upptäckte att varje kraft har en lika stor motkraft åt andra hållet."],[5.9,"När gasen rusar ut åt ena hållet, pressas raketen åt det andra. Det kallas Newtons tredje lag."]]},
 {k:"04 · Även i rymden",d:15,cap:[[0.8,"Raketer fungerar även i tomma rymden. De behöver inte trycka mot luft, eftersom gasen själv ger kraften."],[8.2,"Därför tar de med sig både bränsle och syre, så att de kan brinna där det inte finns någon luft."]]},
 {k:"05 · Saturnus 5",d:12.7,cap:[[0.8,"Raketen som tog människor till månen hette Saturnus 5. Den var ungefär lika lång som en fotbollsplan."],[8.3,"Dess motorer brände ungefär 13 ton bränsle varje sekund."]]},
 {k:"06 · Flera steg",d:8.4,cap:[[0.8,"För att nå rymden släpper raketen tomma tankar på vägen. Då blir den lättare och kan accelerera mer."]]},
 {k:"07 · Hastigheten",d:16.4,cap:[[0.8,"För att stanna i bana runt jorden behövs en fart på ungefär 28 000 kilometer i timmen. Det är ungefär 8 kilometer varje sekund."],[11,"En satellit faller hela tiden, men jorden kröker sig bort under den."]]},
 {k:"08 · Raketer som landar",d:13.6,cap:[[0.8,"Sedan år 2015 har man lyckats landa raketsteg efter uppskjutning, så att de kan användas igen."],[7.8,"Förr kastade man hela raketen efter varje flygning. Nu sparas mycket pengar."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Hur fungerar en raket?",under:"En film i nio steg · ca 2 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Raketer tar oss till rymden, ett litet steg i taget. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: SpaceX · CC0 · Wikimedia Commons",2:"Porträtt av Isaac Newton av Godfrey Kneller, 1689 · Public domain · Wikimedia Commons",3:"Foto: Steve Jurvetson (Saturn V) · CC BY 2.0 · Wikimedia Commons",4:"Foto: NASA/MSFC (motortest) · Public domain · Wikimedia Commons",5:"Bild: SpaceX (stegseparation) · CC0 · Wikimedia Commons",6:"Bild: NASA/MSFC (Saturn V, diagram) · Public domain · Wikimedia Commons",7:"Foto: SpaceX (Falcon 9 landar) · CC0 · Wikimedia Commons"};

window.MPRaketFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"raket",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"raket-",names:[1,2,3,4,5,6,7],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  /* raket med spets uppåt; (px,py) = botten; flame 0..1 */
  const rocket=(px,py,h,flame,col)=>{const c=x(),w=h*.2;c.save();if(flame>0){const fl=h*.35*flame*(.85+.15*Math.sin(performance.now()/60));const g=c.createLinearGradient(0,py,0,py+fl);g.addColorStop(0,"rgba(255,230,120,.95)");g.addColorStop(.5,"rgba(255,140,40,.8)");g.addColorStop(1,"rgba(255,80,20,0)");c.fillStyle=g;c.beginPath();c.moveTo(px-w*.35,py);c.quadraticCurveTo(px,py+fl*1.1,px+w*.35,py);c.closePath();c.fill();}
    c.fillStyle=col||"#e8ecf4";c.beginPath();c.moveTo(px-w/2,py);c.lineTo(px-w/2,py-h*.7);c.quadraticCurveTo(px,py-h*1.15,px+w/2,py-h*.7);c.lineTo(px+w/2,py);c.closePath();c.fill();
    c.fillStyle="#d1583a";c.beginPath();c.moveTo(px-w/2,py-h*.12);c.lineTo(px-w*1.1,py+h*.05);c.lineTo(px-w/2,py-h*.34);c.closePath();c.fill();c.beginPath();c.moveTo(px+w/2,py-h*.12);c.lineTo(px+w*1.1,py+h*.05);c.lineTo(px+w/2,py-h*.34);c.closePath();c.fill();
    c.fillStyle="#4a7ad9";c.beginPath();c.arc(px,py-h*.6,w*.2,0,TAU);c.fill();c.restore();};
  const arrow=(x1,y1,x2,y2,col,w)=>{const c=x();c.save();c.strokeStyle=col;c.fillStyle=col;c.lineWidth=w||5;c.lineCap="round";c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();const an=Math.atan2(y2-y1,x2-x1),hh=(w||5)*3;c.beginPath();c.moveTo(x2,y2);c.lineTo(x2-Math.cos(an-.45)*hh,y2-Math.sin(an-.45)*hh);c.lineTo(x2-Math.cos(an+.45)*hh,y2-Math.sin(an+.45)*hh);c.closePath();c.fill();c.restore();};
  const earth=(px,py,r)=>{const c=x();c.save();const g=c.createRadialGradient(px-r*.3,py-r*.5,r*.1,px,py,r);g.addColorStop(0,"#6fb4ff");g.addColorStop(.7,"#1d5fb8");g.addColorStop(1,"#0a2a66");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};
  const puff=(px,py,t,n,dir,sp)=>{const c=x();for(let i=0;i<n;i++){const p=((t*sp+i/n)%1);c.fillStyle=`rgba(255,255,255,${.5*(1-p)})`;c.beginPath();c.arc(px+dir.x*p*60+Math.sin(i*5)*6,py+dir.y*p*60,3+p*8,0,TAU);c.fill();}};

  const s0=(t)=>{photo(3,t,6.9,1.12,.3);const f=title(t,"RAKETER","FRÅN KRUT TILL MÅNEN","#ffcf8a");cred(3,.55*f);};

  /* 1 · krutraketer i Kina */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,8.2,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1a1020"],[1,"#3a2418"]]);
      const k=cl((t-3)/4.5,0,1),px=lerp(a.x+a.w*.12,a.x+a.w*.8,eo(k)),py=cy-s*.05-Math.sin(k*3)*s*.08,an=-Math.sin(k*3)*.18;
      c.save();c.translate(px,py);c.rotate(an);const len=Math.min(a.w*.26,s*.46);c.strokeStyle="#c9a26a";c.lineWidth=4;c.beginPath();c.moveTo(-len*.7,0);c.lineTo(len*.5,0);c.stroke();c.fillStyle="#8a6a3a";c.fillRect(-len*.2,-8,len*.5,16);c.fillStyle="#cfd5df";c.beginPath();c.moveTo(len*.5,0);c.lineTo(len*.35,-8);c.lineTo(len*.35,8);c.closePath();c.fill();
      for(let i=0;i<14;i++){c.fillStyle=`rgba(255,${150+i*6},40,${.9-i*.06})`;c.beginPath();c.arc(-len*.7-i*7+Math.random()*3,Math.random()*8-4,6-i*.35,0,TAU);c.fill();}c.restore();
      tx("nästan 800 år sedan",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(20,s*.055),700);tx("krutraket · Kina",cx,a.y+a.h*.86,"#cfd8ff","center",Math.max(15,s*.04),700);
      c.restore();}};

  /* 2 · gas bakåt, sedan ballongen */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(1,t,12.6,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);
      if(t<7){const h=Math.min(a.h*.42,s*.6),k=cl((t-3)/3.5,0,1),py=a.y+a.h*.78-k*a.h*.1;puff(cx,py+h*.04,t,10,{x:0,y:1.4},1.2);rocket(cx,py,h,1,"#e8ecf4");arrow(cx+h*.3,py-h*.5,cx+h*.3,py-h*.9,"#9be3b0",6);tx("raketen åt ena hållet",cx+h*.36,py-h*.7,"#9be3b0","left",Math.max(13,s*.034),700);arrow(cx+h*.3,py+h*.2,cx+h*.3,py+h*.55,"#ff9a5a",6);tx("gasen åt andra",cx+h*.36,py+h*.4,"#ff9a5a","left",Math.max(13,s*.034),700);}
      else{const k=cl((t-8)/3.5,0,1),bx=lerp(cx-a.w*.25,cx+a.w*.28,eo(k)),by=cy-Math.sin(k*5)*s*.07+k*s*.1,r=Math.max(24,s*.07);c.fillStyle="#e24a5a";c.beginPath();c.ellipse(bx,by,r*1.15,r,0,0,TAU);c.fill();c.fillStyle="#b83040";c.fillRect(bx-r*1.2-r*.2,by-r*.14,r*.35,r*.28);puff(bx-r*1.45,by,t,7,{x:-1.4,y:0},1.6);
        tx("luften ut åt ena hållet, ballongen åt andra",cx,a.y+a.h*.9,"#ffd86b","center",Math.max(14,s*.037),700);}
      c.restore();}};

  /* 3 · Newtons tredje lag */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,13.8,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const h=Math.min(a.h*.42,s*.58),py=a.y+a.h*.72;rocket(cx,py,h,1,"#e8ecf4");puff(cx,py+h*.04,t,8,{x:0,y:1.4},1.2);
      const q1=eo((t-2.8)/.8);c.globalAlpha=g*q1;arrow(cx-h*.45,py-h*.4,cx-h*.45,py-h*.9,"#9be3b0",6);tx("kraft",cx-h*.55,py-h*.65,"#9be3b0","right",Math.max(15,s*.04),700);
      const q2=eo((t-4)/.8);c.globalAlpha=g*q2;arrow(cx-h*.45,py+h*.2,cx-h*.45,py+h*.7,"#ff9a5a",6);tx("motkraft",cx-h*.55,py+h*.45,"#ff9a5a","right",Math.max(15,s*.04),700);
      if(t>5.9){c.globalAlpha=g*eo((t-5.9)/1);tx("Newtons tredje lag",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(22,s*.06),700);tx("lika stor kraft åt andra hållet",cx,a.y+a.h*.1+Math.max(34,s*.075),"#cfd8ff","center",Math.max(14,s*.036),600);}
      c.restore();}};

  /* 4 · även i rymden: ingen luft, bränsle och syre */
  const tank=(px,py,w,h,col,lbl)=>{const c=x();c.save();c.fillStyle=col;c.beginPath();c.roundRect?c.roundRect(px-w/2,py,w,h,w*.3):c.rect(px-w/2,py,w,h);c.fill();c.fillStyle="rgba(255,255,255,.25)";c.fillRect(px-w*.3,py+h*.1,w*.1,h*.8);c.restore();tx(lbl,px,py+h+Math.max(26,w*.28),"#fff","center",Math.max(15,w*.26),700);};
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,15,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);
      if(t<8.2){const h=Math.min(a.h*.4,s*.56),py=a.y+a.h*.7;rocket(cx,py,h,1,"#e8ecf4");puff(cx,py+h*.04,t,9,{x:0,y:1.4},1.2);tx("tom rymd: ingen luft",cx,a.y+a.h*.1,"#cfd8ff","center",Math.max(19,s*.052),700);tx("gasen ger kraften själv",cx,a.y+a.h*.1+Math.max(34,s*.075),"#9be3b0","center",Math.max(14,s*.036),600);}
      else{const w=Math.min(a.w*.22,s*.34),h=Math.min(a.h*.42,s*.56),y=cy-h*.55;tank(cx-w*.8,y,w,h,"#d9703a","bränsle");tank(cx+w*.8,y,w,h,"#4a8ad9","syre");const q=eo((t-9.5)/1);c.globalAlpha=g*q;tx("= kan brinna utan luft",cx,y+h+Math.max(80,s*.18),"#ffd86b","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 5 · Saturnus 5 mot fotbollsplan, 13 ton per sekund */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,12.7,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#10162a"],[1,"#1b2a3a"]]);
      if(t<8.3){const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy-s*.02,ph=w*105/110;
        c.fillStyle="#2d7a46";c.fillRect(lx,y,ph,Math.max(30,w*.1));c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=2;c.strokeRect(lx+3,y+3,ph-6,Math.max(30,w*.1)-6);c.beginPath();c.moveTo(lx+ph/2,y+3);c.lineTo(lx+ph/2,y+Math.max(30,w*.1)-3);c.stroke();tx("fotbollsplan ca 105 m",lx+ph/2,y+Math.max(30,w*.1)+Math.max(26,s*.06),"#9be3b0","center",Math.max(14,s*.036),700);
        const rh=Math.max(26,w*.085),k=eo((t-3)/1.5);c.save();c.translate(lx,y-rh*.9);c.fillStyle="#f2f2f4";c.fillRect(0,0,w*k,rh*.8);c.fillStyle="#222";c.fillRect(w*k*.18,0,w*k*.03,rh*.8);c.fillRect(w*k*.5,0,w*k*.03,rh*.8);c.fillStyle="#cfd5df";c.beginPath();c.moveTo(w*k,0);c.lineTo(w*k+rh*.7,rh*.4);c.lineTo(w*k,rh*.8);c.closePath();c.fill();c.restore();
        tx("Saturnus 5 · ca 110 m",lx+w*.5,y-rh*1.2-Math.max(12,s*.03),"#ffd86b","center",Math.max(15,s*.04),700);}
      else{const q=eo((t-8.3)/.8),sec=Math.min(5,Math.floor((t-8.6)/.8)+1),n=Math.max(0,sec);c.globalAlpha=g*q;tx("13 ton varje sekund",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(22,s*.06),700);
        const bw=Math.max(22,Math.min(a.w*.06,s*.07));for(let i=0;i<13*n&&i<65;i++){const col=i%13,row=Math.floor(i/13);c.fillStyle="#d9703a";c.fillRect(cx-bw*6.5+col*bw*1.0,a.y+a.h*.3+row*bw*1.0,bw*.9,bw*.9);}
        tx((13*n)+" ton efter "+n+" s",cx,a.y+a.h*.9,"#cfd8ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 6 · flera steg */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,8.4,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const w=Math.min(a.w*.12,s*.16),h=Math.min(a.h*.2,s*.26),base=a.y+a.h*.84;
      const k=eo((t-3.6)/1.8),k2=eo((t-5.2)/1.8);
      const seg=(i,col,off,drop,lbl)=>{const y=base-(2-i)*h*1.08-off-drop;c.globalAlpha=g*(1-Math.max(0,drop/(a.h*.3)));c.fillStyle=col;c.beginPath();c.roundRect?c.roundRect(cx-w/2,y-h,w,h,6):c.rect(cx-w/2,y-h,w,h);c.fill();tx(lbl,cx+w*.8,y-h/2+5,"#fff","left",Math.max(13,s*.034),700);c.globalAlpha=g;};
      seg(2,"#e8ecf4",k*a.h*.18+k2*a.h*.18,0,"steg 3");seg(1,"#cfd5df",k*a.h*.18,k2*a.h*.28,"steg 2");seg(0,"#b8c0cf",0,k*a.h*.3,"steg 1");
      c.beginPath();const fy=base-h*.3-(k*a.h*.18+k2*a.h*.18)+0;
      tx("tomma tankar släpps",cx-w*1.2,a.y+a.h*.2,"#ff9a5a","right",Math.max(14,s*.036),700);tx("lättare = kan accelerera mer",cx-w*1.2,a.y+a.h*.2+Math.max(28,s*.065),"#9be3b0","right",Math.max(13,s*.032),600);
      c.restore();}};

  /* 7 · Newtons kanon: bana och fall */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(3,t,16.4,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const R=Math.min(a.h*.3,a.w*.22,s*.34),ex=cx,ey=cy+R*.5;earth(ex,ey,R);
      const tops=ey-R;
      if(t<11){const sp=[[.35,"#ff9a5a","för lite fart"],[.75,"#ffd23c","mer fart"],[1,"#9be3b0","8 km/s: i bana"]];sp.forEach(([v,col,lbl],i)=>{const q=eo((t-3.2-i*1.6)/1.4);if(q<=0)return;c.strokeStyle=col;c.lineWidth=3;c.beginPath();
          if(v<1){const reach=v*1.9;for(let u=0;u<=40*q;u++){const p=u/40,an=-Math.PI/2+p*reach*.5,r2=R+ R*.1*(1-p*p*4)*(v);const px=ex+Math.cos(an)*(R+4+Math.sin(p*Math.PI)*R*.6*(1-v*.3)),py=ey+Math.sin(an)*(R+4+Math.sin(p*Math.PI)*R*.6*(1-v*.3));u?c.lineTo(px,py):c.moveTo(px,py);}}
          else{c.arc(ex,ey,R*1.35,0,TAU*q);}
          c.stroke();tx(lbl,a.x+a.w*.04,a.y+a.h*(.12+.08*i),col,"left",Math.max(14,s*.036),700);});
        c.fillStyle="#cfd5df";c.fillRect(ex-6,tops-14,12,10);}
      else{const an=t*.9,sx=ex+Math.cos(an)*R*1.35,sy=ey+Math.sin(an)*R*1.35;c.strokeStyle="rgba(155,227,176,.6)";c.lineWidth=2;c.beginPath();c.arc(ex,ey,R*1.35,0,TAU);c.stroke();c.fillStyle="#fff";c.fillRect(sx-6,sy-4,12,8);
        const dx=-(sx-ex),dy=-(sy-ey),dl=Math.hypot(dx,dy);arrow(sx,sy,sx+dx/dl*R*.5,sy+dy/dl*R*.5,"#ff9a5a",4);tx("faller hela tiden",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(19,s*.052),700);tx("men jorden kröker sig undan",cx,a.y+a.h*.1+Math.max(34,s*.075),"#cfd8ff","center",Math.max(14,s*.036),600);}
      c.restore();}};

  /* 8 · landar, sedan återanvänds */
  const s8=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(7,t,13.6,1.1,.15+.5*g);cred(7,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[.7,"#5a4a63"],[.88,"#d98a4a"],[.881,"#0e2540"],[1,"#061423"]]);
      if(t<7.8){const gy=a.y+a.h*.88,h=Math.min(a.h*.42,s*.56),k=eo((t-3)/3.5),py=lerp(a.y+a.h*.38,gy-h*.1,k);
        c.fillStyle="#3a3f4a";c.fillRect(cx-h*.5,gy-8,h,12);rocket(cx,py,h,k<.95?1-k*.5:0,"#f2f2f4");c.strokeStyle="#cfd5df";c.lineWidth=3;c.beginPath();c.moveTo(cx-h*.1,py-h*.08);c.lineTo(cx-h*.28,py+h*.02);c.moveTo(cx+h*.1,py-h*.08);c.lineTo(cx+h*.28,py+h*.02);c.stroke();
        tx("raketsteget landar på en plattform",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(17,s*.045),700);}
      else{const q=eo((t-7.8)/1),rh=Math.max(36,s*.08),rw=Math.min(a.w*.8,s*1.3);c.globalAlpha=g*q;tx("förr",cx-rw*.3,a.y+a.h*.2,"#ff9a8a","center",Math.max(18,s*.048),700);tx("nu",cx+rw*.3,a.y+a.h*.2,"#9be3b0","center",Math.max(18,s*.048),700);
        for(let i=0;i<4;i++){const px=cx-rw*.3+(i-1.5)*rh*.8;rocket(px,a.y+a.h*.62,rh*1.3,0,"#8a93a6");c.strokeStyle="#ff6a5e";c.lineWidth=4;c.beginPath();c.moveTo(px-rh*.25,a.y+a.h*.62-rh*1.2);c.lineTo(px+rh*.25,a.y+a.h*.62-rh*.5);c.moveTo(px+rh*.25,a.y+a.h*.62-rh*1.2);c.lineTo(px-rh*.25,a.y+a.h*.62-rh*.5);c.stroke();}
        rocket(cx+rw*.3,a.y+a.h*.62,rh*1.6,0,"#f2f2f4");tx("↻",cx+rw*.3+rh*.45,a.y+a.h*.62-rh*.6,"#9be3b0","center",Math.max(30,rh),700);
        tx("kastas efter en flygning",cx-rw*.3,a.y+a.h*.8,"#cfd8ff","center",Math.max(13,s*.032),600);tx("används igen",cx+rw*.3,a.y+a.h*.8,"#cfd8ff","center",Math.max(13,s*.032),600);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7,s8];
}
})();
