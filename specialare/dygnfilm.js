/* Dygnet på andra planeter: minilektionen som film (sju scener, ca 1,8 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas, planeter som klot via klot.js).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/dygn/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/dygn-1..6.jpg. MPDygnFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:10.7,cap:[[0.5,"På jorden är ett dygn tjugofyra timmar. Men på andra planeter är dygnen helt olika. Det här är berättelsen om dygnet i solsystemet."]]},
 {k:"01 · Jorden",d:13.6,cap:[[0.8,"Ett dygn är den tid det tar för en planet att snurra ett varv. På jorden tar det tjugofyra timmar."],[7.5,"Vid ekvatorn åker du i ungefär sjutton hundra kilometer i timmen, bara genom att stå still."]]},
 {k:"02 · Jupiter",d:17.1,cap:[[0.8,"Jupiter är störst av alla planeter, men snurrar fortast. Ett dygn där är bara ungefär tio timmar."],[7.6,"Vid Jupiters ekvator rusar molnen runt i ungefär fyrtiofem tuusen kilometer i timmen. Farten gör planeten lite tillplattad."]]},
 {k:"03 · Mars",d:15.3,cap:[[0.8,"På Mars är ett dygn nästan som vårt: tjugofyra timmar och trettiosju minuter."],[6.8,"Forskare som styr rovrar på Mars lever på Mars-tid, och deras arbetsdag flyttar sig ungefär fyrtio minuter varje dag."]]},
 {k:"04 · Venus",d:7.9,cap:[[0.8,"Venus snurrar väldigt långsamt. Ett enda varv tar ungefär tvåhundra fyrtiotre jorddygn."]]},
 {k:"05 · Längre än ett år",d:16.9,cap:[[0.8,"Venus åker runt solen på ungefär tvåhundra tjugofem dygn. Ett varv runt sig själv tar alltså längre tid än ett helt år där."],[10.1,"Räknar man från soluppgång till soluppgång blir ett dygn på Venus ändå ungefär hundra sjutton jorddygn."]]},
 {k:"06 · Baklänges",d:8.2,cap:[[0.8,"Venus snurrar dessutom åt andra hållet än de flesta planeter. På Venus går solen upp i väster."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Dygnet på andra planeter",under:"En film i sju steg · ca 1,8 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Varje planet har sin egen takt. Filmen bygger på bilder ur Wikimedia Commons och texturer från Solar System Scope. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={"1":"Harrison Schmitt / Apollo 17 · Public domain · Wikimedia Commons","2":"Andrea Luck · CC BY 2.0 · Wikimedia Commons","3":"NASA/JPL/Cornell University, Maas Digital… · Public domain · Wikimedia Commons","4":"NASA/JPL · Public domain · Wikimedia Commons","5":"Pioneer Venus Orbiter (NASA) · Public domain · Wikimedia Commons","6":"NASA/Ames/JPL-Caltech · Public domain · Wikimedia Commons"};

window.MPDygnFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"dygn",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"dygn-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title,srand}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,Math.max(.1,r));g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();c.restore();};
  const frame=(n,px,py,w,h)=>{const c=x(),im=L.img(n);if(!L.ok(im))return;const ir=im.width/im.height,fr=w/h;let sw,sh,sx,sy;if(ir>fr){sh=im.height;sw=sh*fr;sx=(im.width-sw)/2;sy=0;}else{sw=im.width;sh=sw/fr;sx=0;sy=(im.height-sh)/2;}
    c.save();c.shadowColor="rgba(190,160,255,.4)";c.shadowBlur=28;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.fillStyle="#000";c.fill();c.shadowBlur=0;c.clip();c.drawImage(im,sx,sy,sw,sh,px-w/2,py-h/2,w,h);c.restore();c.save();c.strokeStyle="rgba(200,180,255,.7)";c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.stroke();c.restore();};
  /* klot med atmosfärsglöd (flattening = sammantryckning i höjd) */
  const globe=(name,px,py,r,rot,glow,flat)=>{const c=x(),cv=window.MPKlot&&MPKlot.planet(name,rot);c.save();gl(px,py,r*1.5,glow||"rgba(120,170,255,.25)");
    if(cv){c.translate(px,py);c.scale(1,flat||1);c.drawImage(cv,-r,-r,r*2,r*2);}else{dot(px,py,r,"#445");}
    c.restore();};
  /* urtavla med visare som visar andel av ett varv */
  const dial=(px,py,r,frac,lab,col,wedge)=>{const c=x();c.save();gl(px,py,r*1.4,col.replace("A",".18"));c.fillStyle="rgba(10,16,34,.85)";c.strokeStyle=col.replace("A","1");c.lineWidth=3;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.stroke();
    if(wedge){c.fillStyle="rgba(255,150,60,.6)";c.beginPath();c.moveTo(px,py);c.arc(px,py,r*.96,-Math.PI/2,-Math.PI/2+TAU*wedge);c.closePath();c.fill();}
    for(let i=0;i<24;i++){const an=i*TAU/24-Math.PI/2;c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=i%6?1:2.5;c.beginPath();c.moveTo(px+Math.cos(an)*r*(i%6?.88:.8),py+Math.sin(an)*r*(i%6?.88:.8));c.lineTo(px+Math.cos(an)*r*.95,py+Math.sin(an)*r*.95);c.stroke();}
    const an=frac*TAU-Math.PI/2;c.strokeStyle=col.replace("A","1");c.lineWidth=4;c.lineCap="round";c.beginPath();c.moveTo(px,py);c.lineTo(px+Math.cos(an)*r*.78,py+Math.sin(an)*r*.78);c.stroke();dot(px,py,r*.07,"#fff");c.restore();if(lab)tx(lab,px,py+r*1.55,col.replace("A","1"),"center",Math.max(15,r*.34),700);};
  const BG=a=>space(a,1);

  const s0=(t)=>{photo(6,t,10.7,1.12,.3);const f=title(t,"DYGNET","PÅ ANDRA PLANETER","#d8c8ff");cred(6,.55*f);};

  /* 1 · jorden: 24 timmar, ekvatorfarten */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,13.6,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const R=Math.max(70,Math.min(a.w*.17,a.h*.3,s*.3)),ex=cx-a.w*.16,ey=cy;const k=((t-3)/7)%1;const rot=-Math.max(0,t-3)/7*1024;
      globe("jorden",ex,ey,R,rot,"rgba(110,170,255,.3)");
      /* urtavla som följer varvet */
      const hr=((Math.max(0,t-3)/7)%1)*24,fr=hr/24;dial(cx+a.w*.22,cy-s*.04,Math.max(46,R*.55),fr,"24 timmar","rgba(150,200,255,A)");
      tx(String(Math.floor(hr)).padStart(2,"0")+":"+String(Math.floor((hr%1)*60)).padStart(2,"0"),cx+a.w*.22,cy-s*.04+Math.max(46,R*.55)*1.55+Math.max(26,s*.06),"#ffd86b","center",Math.max(20,s*.055),700);
      if(t>7.5){const q=eo((t-7.5)/1);c.globalAlpha=g*q;c.strokeStyle="rgba(255,216,107,.9)";c.lineWidth=4;c.lineCap="round";for(let i=0;i<3;i++){const off=((t*1.2+i*.33)%1);c.globalAlpha=g*q*(1-off);c.beginPath();c.moveTo(ex-R*.6+off*R*.4,ey+R*.04+i*0);c.lineTo(ex-R*.2+off*R*.7,ey);c.stroke();}
        c.globalAlpha=g*q;tx("ca 1 700 km/h vid ekvatorn",ex,ey+R*1.35,"#ffd86b","center",Math.max(16,s*.042),700);tx("snabbare än ett passagerarplan",ex,ey+R*1.35+Math.max(24,s*.055),"#bfd8ff","center",Math.max(13,s*.034),600);}
      c.restore();}};

  /* 2 · Jupiter: tio timmar */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,17.1,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const R=Math.max(80,Math.min(a.w*.2,a.h*.34,s*.34)),jx=cx-a.w*.14,jy=cy,tt=Math.max(0,t-3);
      globe("jupiter",jx,jy,R,-tt*130,"rgba(255,200,140,.25)",.935);
      /* jorden i skala (elva gånger smalare) */
      const er=R/11,exx=cx+a.w*.26,eyy=cy-R*.3;globe("jorden",exx,eyy,er*1.0,-tt*54,"rgba(110,170,255,.3)");tx("jorden",exx,eyy+er*2.4,"#bfd8ff","center",Math.max(13,s*.034),700);
      tx("Jupiter ≈ 10 h",jx,jy+R*1.3,"#ffcf9a","center",Math.max(18,s*.048),700);tx("jorden 24 h",exx,eyy+er*2.4+Math.max(22,s*.05),"#bfd8ff","center",Math.max(13,s*.034),600);
      if(t>7.6){const q=eo((t-7.6)/1);c.globalAlpha=g*q;for(let i=0;i<9;i++){const yy=jy-R*.7+i*R*.175,off=((t*1.6+i*.17)%1);c.strokeStyle=`rgba(255,235,200,${.7*(1-off)})`;c.lineWidth=2.5;c.beginPath();c.moveTo(jx-R*.9+off*R*.4,yy);c.lineTo(jx-R*.3+off*R*.9,yy);c.stroke();}
        tx("≈ 45 000 km/h vid ekvatorn",jx,a.y+a.h*.12,"#ffd86b","center",Math.max(17,s*.045),700);tx("tillplattad av farten",jx,a.y+a.h*.12+Math.max(26,s*.058),"#ffcf9a","center",Math.max(14,s*.037),600);}
      c.restore();}};

  /* 3 · Mars: 24 h 37 min, arbetsdagen flyttas */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,15.3,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);
      if(t<6.8){const R=Math.max(70,Math.min(a.w*.15,a.h*.28,s*.26)),mx=cx-a.w*.22;globe("mars",mx,cy,R,-Math.max(0,t-3)*56,"rgba(255,130,80,.28)");tx("Mars",mx,cy+R*1.35,"#ffb090","center",Math.max(18,s*.048),700);
        const dr=Math.max(46,R*.6);dial(cx+a.w*.02,cy,dr,((Math.max(0,t-3))/3.8)%1,"jorden 24:00","rgba(150,200,255,A)");dial(cx+a.w*.28,cy,dr,((Math.max(0,t-3))/3.8/(1+37/1440))%1,"Mars 24:37","rgba(255,160,110,A)",t>4.5?37/1440*eo((t-4.5)/1):0);}
      else{const q=eo((t-6.8)/1),fw=Math.min(a.w*.34,s*.6),fh=fw*.65;c.globalAlpha=g*q;frame(3,cx-a.w*.24,cy,fw,fh);
        const days=["dag 1","dag 2","dag 3","dag 4","dag 5","dag 6","dag 7"],bw=Math.min(a.w*.08,s*.15),lx=cx+a.w*.04;
        days.forEach((d,i)=>{const k=eo((t-7.4-i*.45)/.5);if(k<=0)return;const bx=lx+(i%4)*bw*1.15,by=cy-bw*.9+Math.floor(i/4)*bw*1.45,m=480+i*40,hh=Math.floor(m/60),mm=m%60;c.save();c.globalAlpha=g*k;gl(bx+bw/2,by+bw/2,bw*.9,"rgba(255,160,110,.18)");c.fillStyle="rgba(255,255,255,.07)";c.strokeStyle="rgba(255,170,120,.9)";c.lineWidth=2;c.fillRect(bx,by,bw,bw*1.05);c.strokeRect(bx,by,bw,bw*1.05);tx(d,bx+bw/2,by+bw*.3,"#cfd8ff","center",Math.max(11,bw*.17),700);tx(String(hh).padStart(2,"0")+":"+String(mm).padStart(2,"0"),bx+bw/2,by+bw*.78,"#ffb090","center",Math.max(13,bw*.24),700);c.restore();});
        tx("arbetsdagen börjar ca 40 min senare varje dag",cx+a.w*.14,a.y+a.h*.14,"#ffd86b","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 4 · Venus: 243 jorddygn per varv */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,7.9,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const R=Math.max(80,Math.min(a.w*.17,a.h*.32,s*.3)),vx=cx-a.w*.16,k=cl((t-3)/4.2,0,1),day=Math.round(243*k);
      globe("venus",vx,cy,R,k*1024,"rgba(255,210,140,.3)");
      /* jorden snurrar många varv under samma tid */
      const er=R*.38,exx=cx+a.w*.2;globe("jorden",exx,cy-R*.3,er,-k*243*1024*.05%1024*0-t*220,"rgba(110,170,255,.3)");tx("jorden",exx,cy-R*.3+er*1.6,"#bfd8ff","center",Math.max(13,s*.034),700);
      tx("Venus · ett varv",vx,cy+R*1.3,"#ffd7a0","center",Math.max(17,s*.045),700);
      tx("dygn "+day+" av 243",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(22,s*.06),700);
      c.restore();}};

  /* 5 · dygn längre än år: staplar */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,16.9,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const w=Math.min(a.w*.78,s*1.45),lx=cx-w/2,bh=Math.max(34,s*.085),sc=w/260,y0=cy-bh*1.5;
      const bar=(i,n,col,lab,t0)=>{const k=eo((t-t0)/2);if(k<=0)return;const y=y0+i*bh*1.9;c.save();gl(lx+n*sc*k,y+bh/2,bh*1.6,col.replace("A",".4"));const gr=c.createLinearGradient(lx,0,lx+n*sc,0);gr.addColorStop(0,col.replace("A",".35"));gr.addColorStop(1,col.replace("A",".95"));c.fillStyle=gr;c.fillRect(lx,y,n*sc*k,bh);c.restore();tx(lab,lx,y-Math.max(8,bh*.2),col.replace("A","1"),"left",Math.max(14,s*.037),700);tx(Math.round(n*k)+" jorddygn",lx+n*sc*k+10,y+bh*.68,"#fff","left",Math.max(15,s*.04),700);};
      bar(0,243,"rgba(255,170,110,A)","ett varv runt sig själv (ett dygn)",3);bar(1,225,"rgba(130,190,255,A)","ett varv runt solen (ett år)",5.5);
      if(t>10.1)bar(2,117,"rgba(255,226,120,A)","soluppgång till soluppgång",10.4);
      if(t>7.5){c.globalAlpha=g*eo((t-7.5)/1);tx("dygnet är längre än året",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(19,s*.052),700);}
      c.restore();}};

  /* 6 · baklänges: solen går upp i väster */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,8.2,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const pw=Math.min(a.w*.36,s*.62),ph=pw*.62,lx=cx-a.w*.22,rx=cx+a.w*.22;
      const pan=(px,name,sunFrom,col)=>{const k=cl((t-3.2)/3.6,0,1),top=cy-ph*.55;c.save();c.beginPath();c.rect(px-pw/2,top,pw,ph);c.clip();const sg=c.createLinearGradient(0,top,0,top+ph);sg.addColorStop(0,"#0a1430");sg.addColorStop(1,k>.15?"#5a3a50":"#0a1430");c.fillStyle=sg;c.fillRect(px-pw/2,top,pw,ph);
        const sx=px+sunFrom*pw*(.34-.34*eo(k)*.6),sy=top+ph*(.86-.5*eo(k));gl(sx,sy,ph*.5,"rgba(255,200,110,.6)");dot(sx,sy,ph*.07,"#ffe9a8");
        c.fillStyle="#150d12";c.beginPath();c.moveTo(px-pw/2,top+ph);c.lineTo(px-pw/2,top+ph*.84);for(let i=0;i<=20;i++)c.lineTo(px-pw/2+i*pw/20,top+ph*(.84-.04*Math.sin(i*1.7)));c.lineTo(px+pw/2,top+ph);c.closePath();c.fill();c.restore();
        c.strokeStyle=col;c.lineWidth=3;c.strokeRect(px-pw/2,top,pw,ph);tx("väst",px-pw/2+8,top+ph+Math.max(20,s*.045),"#9fb0d0","left",Math.max(12,s*.032),600);tx("öst",px+pw/2-8,top+ph+Math.max(20,s*.045),"#9fb0d0","right",Math.max(12,s*.032),600);tx(name,px,top-Math.max(12,s*.028),col,"center",Math.max(16,s*.042),700);};
      /* sett söderut: öst till höger? (söderut: öst vänster) – vi märker ut väst/öst längs horisonten */
      pan(lx,"jorden: solen upp i öster",1,"rgba(150,200,255,.9)");pan(rx,"Venus: solen upp i väster",-1,"rgba(255,180,120,.9)");
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
