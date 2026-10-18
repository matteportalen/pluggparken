/* James Webb-teleskopet: minilektionen som film (nio scener, ca 2 minuter), NASA-bilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/webb/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/webb-1..6.jpg. MPWebbFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.9,cap:[[0.5,"Ett gyllene öga i rymden. Det här är berättelsen om James Webb-teleskopet."]]},
 {k:"01 · Uppskjutningen",d:15.5,cap:[[0.8,"Teleskopet sköts upp på juldagen år 2021. Det är det största och mest kraftfulla rymdteleskop som någonsin byggts."],[9.2,"Resan till sin plats tog ungefär en månad, och under resan veckades teleskopet ut."]]},
 {k:"02 · Långt bortom månen",d:14.5,cap:[[0.8,"Det befinner sig 1,5 miljoner kilometer från jorden. Det är fyra gånger längre bort än månen."],[7.6,"Där följer det jorden runt solen, med solen, jorden och månen alltid bakom sig."]]},
 {k:"03 · Guldspegeln",d:18.8,cap:[[0.8,"Spegeln är 6,5 meter bred. Den består av 18 sexkantiga bitar av guldbelagd metall."],[8.5,"Den fälldes ihop som origami för att få plats i raketen."],[12.3,"Guld reflekterar infrarött ljus mycket bra. Guldlagret är tunnare än ett hårstrå."]]},
 {k:"04 · Iskallt",d:18.9,cap:[[0.8,"Teleskopet ser värme, så kallat infrarött ljus. Därför måste det vara iskallt, runt minus 230 grader."],[9,"Ett solskydd, stort som en tennisplan, skyddar det."],[13.5,"Skyddet har fem lager, och varje lager är ungefär lika tunt som ett hårstrå."]]},
 {k:"05 · Webb och Hubble",d:15.6,cap:[[0.8,"Det äldre teleskopet Hubble ser mest vanligt ljus. Webb ser infrarött, och kan därför titta rakt igenom stora dammoln."],[9.6,"Hubbles spegel är drygt två meter bred. Webbs spegel är nästan tre gånger så bred."]]},
 {k:"06 · Tillbaka i tiden",d:11.1,cap:[[0.8,"Ljuset behöver tid på sig, så teleskopet ser tillbaka i tiden. Det kan se galaxer som lyste för över 13 miljarder år sedan."]]},
 {k:"07 · Andra världar",d:12.6,cap:[[0.8,"Webb kan också undersöka luften på planeter som kretsar kring andra stjärnor."],[5.3,"Där har teleskopet redan hittat koldioxid. Forskare letar efter vilka gaser som finns i andra världar."]]},
 {k:"08 · Första bilderna",d:8.9,cap:[[0.8,"I juli 2022 kom de första bilderna. De visade tusentals galaxer i en liten fläck av himlen."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"James Webb-teleskopet",under:"En film i nio steg · ca 2 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Webb hjälper oss att se hur universum började. Filmen bygger på bilder från NASA, ESA och CSA ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Bill Ingalls/NASA (Ariane 5 med Webb) · Public domain · Wikimedia Commons",2:"Foto: NASA/MSFC/David Higginbotham/Emmett Given (spegelbitar) · Public domain · Wikimedia Commons",3:"Foto: Chris Gunn/NASA (speglarna) · CC BY 2.0 · Wikimedia Commons",4:"Foto: NASA Goddard (solskyddet) · Public domain · Wikimedia Commons",5:"Bild: NASA, ESA, CSA och STScI (Webbs första djupa fält) · Public domain · Wikimedia Commons",6:"Bild: NASA, ESA, CSA och STScI (Kosmiska klipporna i Carinanebulosan) · Public domain · Wikimedia Commons"};

window.MPWebbFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"webb",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"webb-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const earth=(px,py,r)=>{const c=x();c.save();const g=c.createRadialGradient(px-r*.35,py-r*.35,r*.1,px,py,r);g.addColorStop(0,"#6fb4ff");g.addColorStop(.7,"#1d5fb8");g.addColorStop(1,"#0a2a66");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};
  const sun=(px,py,r)=>{const c=x();c.save();const g=c.createRadialGradient(px,py,r*.2,px,py,r*2.6);g.addColorStop(0,"rgba(255,230,140,.9)");g.addColorStop(.35,"rgba(255,170,60,.35)");g.addColorStop(1,"rgba(255,170,60,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,r*2.6,0,TAU);c.fill();c.fillStyle="#ffd24c";c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};
  const hex=(px,py,r,col,al)=>{const c=x();c.save();c.globalAlpha*=al==null?1:al;c.fillStyle=col;c.strokeStyle="rgba(80,50,0,.7)";c.lineWidth=1.5;c.beginPath();for(let i=0;i<6;i++){const an=TAU/6*i+TAU/12;i?c.lineTo(px+Math.cos(an)*r,py+Math.sin(an)*r):c.moveTo(px+Math.cos(an)*r,py+Math.sin(an)*r);}c.closePath();c.fill();c.stroke();c.restore();};
  /* spegelns 18 bitar: 1 mitt-hål saknas; 6 + 12 i två ringar */
  const mirrorPos=(r)=>{const p=[],h=r*Math.sqrt(3);for(let i=0;i<6;i++){const an=TAU/6*i;p.push([Math.cos(an)*h,Math.sin(an)*h]);}for(let i=0;i<12;i++){const an=TAU/12*i+TAU/24;const d=i%2?h*1.732:h*2;p.push([Math.cos(an)*d*(i%2?1:1),Math.sin(an)*d]);}return p;};
  const mirror=(cx,cy,r,t,shine)=>{const pos=mirrorPos(r);pos.forEach(([dx,dy],i)=>{const sh=shine?.5+.5*Math.sin(t*2+i*.6):0;hex(cx+dx,cy+dy,r,`rgb(${220+sh*25|0},${170+sh*40|0},${40+sh*30|0})`);});};

  const s0=(t)=>{photo(1,t,7.9,1.12,.3);const f=title(t,"JAMES WEBB","ETT GYLLENE ÖGA I RYMDEN","#ffd86b");cred(1,.55*f);};

  /* 1 · uppskjutning, sedan resan */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(1,t,15.5,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);
      if(t<9.2){const q=eo((t-3.4)/1);c.globalAlpha=g*q;tx("25 december",cx,cy-s*.04,"#ffd86b","center",Math.max(26,s*.075),700);tx("2021",cx,cy+s*.06,"#fff","center",Math.max(40,s*.12),700);tx("uppskjutning från Franska Guyana",cx,cy+s*.2,"#9fd0ff","center",Math.max(14,s*.036),600);}
      else{const w=Math.min(a.w*.8,s*1.4),lx=cx-w/2,y=cy,k=cl((t-9.6)/5,0,1);
        earth(lx,y,Math.max(16,s*.04));tx("jorden",lx,y+Math.max(34,s*.08),"#9fd0ff","center",Math.max(12,s*.03),700);
        c.setLineDash([6,8]);c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=2;c.beginPath();c.moveTo(lx+30,y);c.lineTo(lx+w,y);c.stroke();c.setLineDash([]);
        dot(lx+w,y,8,"#ffd23c");tx("sin plats",lx+w,y+Math.max(34,s*.08),"#ffd86b","center",Math.max(12,s*.03),700);
        const px=lerp(lx+30,lx+w,eo(k));c.fillStyle="#ffd23c";c.fillRect(px-7,y-5,14,10);if(k<.6)tx("veckas ut …",px,y-Math.max(22,s*.05),"#fff","center",Math.max(12,s*.03),600);
        tx("ca 1 månad",cx,y-Math.max(60,s*.14),"#fff","center",Math.max(20,s*.055),700);}
      c.restore();}};
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};

  /* 2 · långt bortom månen */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,14.5,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const w=Math.min(a.w*.8,s*1.4),lx=cx-w/2,y=cy,px=km=>lx+km/1500000*w;
      if(t<7.6){earth(px(0),y,Math.max(14,s*.032));c.strokeStyle="rgba(255,255,255,.3)";c.lineWidth=2;c.beginPath();c.moveTo(lx,y+Math.max(40,s*.09));c.lineTo(lx+w,y+Math.max(40,s*.09));c.stroke();
        const k1=eo((t-2.8)/1),k2=eo((t-4.4)/1.4);c.globalAlpha=g*k1;dot(px(384000),y,7,"#cfd5df");tx("månen",px(384000),y-Math.max(26,s*.06),"#cfd5df","center",Math.max(13,s*.034),700);
        c.globalAlpha=g*k2;dot(px(1500000),y,8,"#ffd23c");tx("Webb",px(1500000),y-Math.max(26,s*.06),"#ffd86b","center",Math.max(15,s*.04),700);tx("4 × avståndet till månen",px(750000),y+Math.max(72,s*.16),"#ffd86b","center",Math.max(14,s*.037),700);}
      else{const sx=a.x+a.w*.12;sun(sx,y,Math.max(16,s*.04));const ex=cx-a.w*.02;earth(ex,y,Math.max(12,s*.028));dot(ex+Math.max(18,s*.05),y-Math.max(10,s*.026),5,"#cfd5df");dot(ex+Math.max(70,s*.17),y,7,"#ffd23c");
        c.strokeStyle="rgba(255,230,140,.5)";c.lineWidth=2;c.setLineDash([5,7]);c.beginPath();c.moveTo(sx+40,y);c.lineTo(ex+Math.max(70,s*.17),y);c.stroke();c.setLineDash([]);
        tx("solen",sx,y+Math.max(50,s*.1),"#ffd86b","center",Math.max(13,s*.034),700);tx("jorden och månen",ex,y+Math.max(40,s*.085),"#9fd0ff","center",Math.max(12,s*.03),700);tx("Webb",ex+Math.max(70,s*.17),y-Math.max(26,s*.06),"#ffd86b","center",Math.max(14,s*.038),700);
        if(t>9)tx("alltid skuggan bakom sig",cx,a.y+a.h*.86,"#cfd8ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 3 · guldspegeln */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,18.8,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const r=Math.max(14,Math.min(a.w,a.h)*.075);
      if(t<12.3){const fold=t>8.5?eo((t-8.5)/2.2)*(t>11?1-eo((t-11)/1)*0:1):0;
        const pos=mirrorPos(r),sc=t>8.5?1-fold*.1:1;pos.forEach(([dx,dy],i)=>{const outer=i>=6;const shift=outer?(1-fold*.0):1;const sh=.5+.5*Math.sin(t*2+i*.6);const dd=outer?(1-fold*.25):1;hexAt(cx+dx*dd,cy+dy*dd*(outer?1-fold*.2:1),r*(outer?1-fold*.15:1),sh);});
        if(t<8.5)tx("6,5 meter · 18 bitar",cx,a.y+a.h*.92,"#ffd86b","center",Math.max(17,s*.045),700);else tx("ihopvikt som origami",cx,a.y+a.h*.92,"#ffd86b","center",Math.max(17,s*.045),700);}
      else{const q=eo((t-12.3)/1);c.globalAlpha=g*q;const w=Math.min(a.w*.7,s*1.2),lx=cx-w/2,y=cy-s*.06;
        c.fillStyle="#d9c7a8";c.fillRect(lx,y-Math.max(10,s*.026),w,Math.max(20,s*.052));tx("hårstrå",cx,y-Math.max(26,s*.06),"#d9c7a8","center",Math.max(14,s*.037),700);
        c.fillStyle="#ffd23c";c.fillRect(lx,y+Math.max(70,s*.16),w,2);tx("guldlagret",cx,y+Math.max(70,s*.16)+Math.max(28,s*.065),"#ffd86b","center",Math.max(14,s*.037),700);}
      c.restore();}};
  const hexAt=(px,py,r,sh)=>{hex(px,py,r,`rgb(${220+sh*25|0},${170+sh*40|0},${40+sh*30|0})`);};

  /* 4 · iskallt, solskydd, fem lager */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,18.9,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);
      if(t<9){const th=a.h*.55,tx0=cx-a.w*.12,top=a.y+a.h*.14,fill=eo((t-3)/2.4);c.fillStyle="rgba(255,255,255,.12)";c.fillRect(tx0,top,28,th);c.fillStyle="#4aa8ff";c.fillRect(tx0,top+th*(1-.15-.0*fill)-th*.05*fill+th*.0,28,th*(.15+.05*fill));c.beginPath();c.arc(tx0+14,top+th+14,22,0,TAU);c.fill();
        tx("−230°",tx0+80,top+th+22,"#9fd0ff","left",Math.max(26,s*.075),700);tx("iskallt",tx0+80,top+th*.4,"#cfe8ff","left",Math.max(17,s*.045),700);}
      else if(t<13.5){const w=Math.min(a.w*.6,s*1.1),h=w*.42,lx=cx-w/2,y=cy-h/2,k=eo((t-9.4)/1.2);c.fillStyle="#2d8a4a";c.globalAlpha=g*.9;c.fillRect(lx,y,w,h);c.strokeStyle="#fff";c.lineWidth=2;c.strokeRect(lx+4,y+4,w-8,h-8);c.beginPath();c.moveTo(cx,y+4);c.lineTo(cx,y+h-4);c.stroke();tx("tennisplan",cx,y+h+Math.max(26,s*.06),"#9be3b0","center",Math.max(14,s*.037),700);
        c.globalAlpha=g*k;c.fillStyle="rgba(200,210,235,.85)";c.beginPath();c.moveTo(cx,y-h*.1);c.lineTo(cx+w*.52,cy);c.lineTo(cx,y+h*1.1);c.lineTo(cx-w*.52,cy);c.closePath();c.fill();tx("solskydd",cx,cy+5,"#1a2a4a","center",Math.max(16,s*.042),700);}
      else{const w=Math.min(a.w*.6,s*1.1),lx=cx-w/2,y=cy-s*.14;for(let i=0;i<5;i++){const q=eo((t-13.8-i*.45)/.6);if(q<=0)continue;c.globalAlpha=g*q;c.fillStyle=`rgba(${190+i*10},${200+i*8},${230},.9)`;c.fillRect(lx,y+i*Math.max(24,s*.055),w*q,Math.max(8,s*.018));tx(String(i+1),lx-24,y+i*Math.max(24,s*.055)+Math.max(10,s*.02),"#fff","right",Math.max(13,s*.034),700);}
        c.globalAlpha=g;tx("5 lager",cx,y+5*Math.max(24,s*.055)+Math.max(30,s*.07),"#ffd86b","center",Math.max(18,s*.048),700);}
      c.restore();}};

  /* 5 · Webb och Hubble: damm och spegelbredd */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(6,t,15.6,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);
      if(t<9.6){const bw=Math.min(a.w*.36,s*.62),bh=bw*.8,lx=cx-bw*1.15,rx=cx+bw*.15,y=cy-bh/2,r=L.srand(4);
        [[lx,"Hubble","vanligt ljus",false],[rx,"Webb","infrarött",true]].forEach(([px,n,sub,ir],ix)=>{c.fillStyle="rgba(8,12,30,.9)";c.fillRect(px,y,bw,bh);c.strokeStyle=ir?"#ffd86b":"#9fd0ff";c.lineWidth=2;c.strokeRect(px,y,bw,bh);
          for(let i=0;i<22;i++){const sx=px+8+(r()*(bw-16)),sy=y+8+(r()*(bh-16));const inCloud=Math.hypot(sx-(px+bw/2),sy-(y+bh/2))<bw*.32;c.fillStyle=inCloud&&!ir?"rgba(255,255,255,.0)":"#fff";c.beginPath();c.arc(sx,sy,1.8,0,TAU);c.fill();}
          const cg=c.createRadialGradient(px+bw/2,y+bh/2,0,px+bw/2,y+bh/2,bw*.38);cg.addColorStop(0,ir?"rgba(150,90,60,.18)":"rgba(120,70,40,.95)");cg.addColorStop(1,"rgba(120,70,40,0)");c.fillStyle=cg;c.fillRect(px,y,bw,bh);
          tx(n,px+bw/2,y-Math.max(18,s*.04),ir?"#ffd86b":"#9fd0ff","center",Math.max(17,s*.045),700);tx(sub,px+bw/2,y+bh+Math.max(24,s*.055),"#cfd8ff","center",Math.max(13,s*.034),600);});}
      else{const q=eo((t-9.6)/1),w=Math.min(a.w*.7,s*1.2),lx=cx-w/2,y=cy-s*.1,u=w/6.5;c.globalAlpha=g*q;
        c.fillStyle="#9fd0ff";c.fillRect(lx,y,u*2.4,Math.max(20,s*.05));tx("Hubble ca 2,4 m",lx,y-Math.max(10,s*.026),"#9fd0ff","left",Math.max(14,s*.037),700);
        c.fillStyle="#ffd23c";c.fillRect(lx,y+Math.max(80,s*.18),u*6.5,Math.max(20,s*.05));tx("Webb 6,5 m",lx,y+Math.max(80,s*.18)-Math.max(10,s*.026),"#ffd86b","left",Math.max(14,s*.037),700);}
      c.restore();}};

  /* 6 · tillbaka i tiden */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(2,t,11.1,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);const w=Math.min(a.w*.84,s*1.6),lx=cx-w/2,y=cy,px=yr=>lx+(13.8-yr)/13.8*w;
      c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=3;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();
      [[13.8,"Big bang"],[10,"10"],[5,"5"],[0,"i dag"]].forEach(([yr,n])=>{c.beginPath();c.moveTo(px(yr),y-8);c.lineTo(px(yr),y+8);c.stroke();tx(n,px(yr),y+Math.max(30,s*.065),"rgba(255,255,255,.8)","center",Math.max(12,s*.03),600);});
      tx("miljarder år sedan",cx,y+Math.max(60,s*.13),"rgba(255,255,255,.55)","center",Math.max(12,s*.03),600);
      const k=eo((t-3.4)/3);c.fillStyle="#ffd23c";c.beginPath();c.arc(px(13.2),y,9+Math.sin(t*3)*2,0,TAU);c.fill();tx("galaxens ljus",px(13.2),y-Math.max(30,s*.07),"#ffd86b","center",Math.max(13,s*.034),700);
      const lx2=lerp(px(13.2),px(0),k);c.strokeStyle="#ffd23c";c.lineWidth=3;c.beginPath();c.moveTo(px(13.2),y+14);c.lineTo(lx2,y+14);c.stroke();c.fillStyle="#fff";c.beginPath();c.arc(lx2,y+14,5,0,TAU);c.fill();
      if(t>7){c.globalAlpha=g*eo((t-7)/1);tx("över 13 miljarder år",cx,a.y+a.h*.14,"#fff","center",Math.max(20,s*.055),700);}
      c.restore();}};

  /* 7 · andra världar: planet, spektrum, koldioxid */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2)/1.1);photo(4,t,12.6,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const y=cy-s*.1;sun(cx-Math.min(a.w*.26,s*.46),y,Math.max(18,s*.045));
      const px=cx+Math.min(a.w*.12,s*.2)+Math.sin(t*.8)*8,pr=Math.max(10,s*.026);c.fillStyle="#2a73c8";c.beginPath();c.arc(px,y,pr,0,TAU);c.fill();c.strokeStyle="rgba(143,208,255,.6)";c.lineWidth=3;c.beginPath();c.arc(px,y,pr+4,0,TAU);c.stroke();
      tx("en annan stjärna och dess planet",cx,a.y+a.h*.12,"#cfd8ff","center",Math.max(15,s*.04),700);
      const sw=Math.min(a.w*.7,s*1.2),sx=cx-sw/2,sy=y+Math.max(70,s*.15),sh=Math.max(20,s*.05);
      const gr=c.createLinearGradient(sx,0,sx+sw,0);["#a02020","#e0802a","#e8d030","#40b050","#3080d0","#7040b0"].forEach((cl2,i,arr)=>gr.addColorStop(i/(arr.length-1),cl2));c.globalAlpha=g*eo((t-3)/1);c.fillStyle=gr;c.fillRect(sx,sy,sw,sh);
      c.fillStyle="#000";[[.3,.014],[.55,.01],[.7,.012]].forEach(([p,w],i)=>{const q=i===0?(t>5.3?eo((t-5.3)/1):0):1;c.globalAlpha=g*q*.9;c.fillRect(sx+sw*p,sy,sw*w,sh);});
      if(t>5.3){c.globalAlpha=g*eo((t-5.3)/1);tx("koldioxid",sx+sw*.3,sy+sh+Math.max(30,s*.07),"#ffd86b","center",Math.max(15,s*.04),700);c.strokeStyle="#ffd86b";c.lineWidth=2;c.beginPath();c.moveTo(sx+sw*.3,sy+sh+6);c.lineTo(sx+sw*.3,sy+sh+Math.max(14,s*.034));c.stroke();}
      c.restore();}};

  /* 8 · första bilderna */
  const s8=(t)=>{const{s,cx,cy,a,port}=S(),c=x();photo(5,t,8.9,1.12,.1);cred(5,.55);
    const f=eo((t-1.4)/1.2);c.save();c.globalAlpha=f;tx("juli 2022",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(24,s*.07),700);c.restore();
    if(t>3){const q=eo((t-3)/1),n=Math.floor(q*(t>5?1000+(t-5)*0:1000));c.save();c.globalAlpha=q;tx("tusentals galaxer i en liten fläck",cx,a.y+a.h*.9,"#fff","center",Math.max(15,s*.04),700);c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7,s8];
}
})();
