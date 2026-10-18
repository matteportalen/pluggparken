/* Miljon, miljard och biljon: minilektionen som film (sju scener, ca 1,6 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas, sedelstaplar med glöd).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/storatal/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/stora-tal-1..6.jpg. MPStoraTalFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.4,cap:[[0.5,"Hur stor är en miljard egentligen? Det här är berättelsen om riktigt stora tal."]]},
 {k:"01 · Stora tal",d:18.8,cap:[[0.8,"Tusen är en etta med tre nollor. En miljon har sex nollor, en miljard nio, och en biljon tolv. Varje steg är 1 000 gånger större."],[13.4,"På engelska heter en miljard billion, och en biljon heter trillion."]]},
 {k:"02 · Räkna i sekunder",d:12.7,cap:[[0.8,"En miljon sekunder är ungefär 11 dygn. En miljard sekunder är ungefär 32 år."],[7.3,"En biljon sekunder är över 30 000 år. Då levde mammutar."]]},
 {k:"03 · En miljon kronor",d:11.7,cap:[[0.8,"En miljon kronor är 1 000 sedlar à 1 000 kronor. En sedel är en tiondels millimeter tjock, så stapeln blir 10 centimeter hög."]]},
 {k:"04 · En miljard kronor",d:12.3,cap:[[0.8,"En miljard kronor är en miljon sedlar. Stapeln blir 100 meter hög, som ett tjugovåningshus. Turning Torso är 190 meter."]]},
 {k:"05 · En biljon kronor",d:9.1,cap:[[0.8,"En biljon kronor är en miljard sedlar. Stapeln blir 100 kilometer hög, och når upp till gränsen mot rymden."]]},
 {k:"06 · Räkna sedlarna",d:9.3,cap:[[0.8,"Räknar du en sedel i sekunden tar en miljard kronor 11 dygn. En biljon kronor tar nästan 32 år."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Miljon, miljard och biljon",under:"En film i sju steg · ca 1,6 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Stora tal blir lättare med bilder. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={"1":"Clematitedusud · CC BY-SA 4.0 · Wikimedia Commons","2":"John Morgan · CC BY 2.0 · Wikimedia Commons","3":"CC BY-SA 3.0 · Wikimedia Commons","4":"Albertyanks - Albert Jankowski · Public domain · Wikimedia Commons","5":"Astronaut photograph ISS071-E-609044 was a… · Public domain · Wikimedia Commons","6":"SchmiAlf · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPStoraTalFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"storatal",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"stora-tal-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title,srand}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,Math.max(.1,r));g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();c.restore();};
  const frame=(n,px,py,w,h)=>{const c=x(),im=L.img(n);if(!L.ok(im))return;const ir=im.width/im.height,fr=w/h;let sw,sh,sx,sy;if(ir>fr){sh=im.height;sw=sh*fr;sx=(im.width-sw)/2;sy=0;}else{sw=im.width;sh=sw/fr;sx=0;sy=(im.height-sh)/2;}
    c.save();c.shadowColor="rgba(120,230,170,.35)";c.shadowBlur=28;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.fillStyle="#000";c.fill();c.shadowBlur=0;c.clip();c.drawImage(im,sx,sy,sw,sh,px-w/2,py-h/2,w,h);c.restore();c.save();c.strokeStyle="rgba(150,235,185,.7)";c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.stroke();c.restore();};
  const BG=a=>grad(a,[[0,"#060d0c"],[1,"#0e1c18"]]);
  const sv=n=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g," ");
  /* sedelstapel: tunna gröna lager med glans, h = höjd i pixlar */
  const stack=(px,py,w,h,glow)=>{const c=x();c.save();if(glow)gl(px,py-h/2,Math.max(w,h)*.9,"rgba(120,255,170,.28)");const g=c.createLinearGradient(px-w/2,0,px+w/2,0);g.addColorStop(0,"#2f7a4a");g.addColorStop(.5,"#6fd08c");g.addColorStop(1,"#2f7a4a");c.fillStyle=g;c.fillRect(px-w/2,py-h,w,h);c.strokeStyle="rgba(10,40,25,.55)";c.lineWidth=1;const step=Math.max(2.5,h/70);for(let y=py;y>py-h;y-=step){c.beginPath();c.moveTo(px-w/2,y);c.lineTo(px+w/2,y);c.stroke();}c.fillStyle="rgba(255,255,255,.18)";c.fillRect(px-w/2+w*.08,py-h,w*.12,h);c.restore();};
  const person=(px,py,hh)=>{const c=x();c.save();c.fillStyle="#cfe0ea";c.beginPath();c.arc(px,py-hh*.88,hh*.1,0,TAU);c.fill();c.strokeStyle="#cfe0ea";c.lineWidth=Math.max(1.5,hh*.07);c.lineCap="round";c.beginPath();c.moveTo(px,py-hh*.78);c.lineTo(px,py-hh*.4);c.moveTo(px,py-hh*.4);c.lineTo(px-hh*.14,py);c.moveTo(px,py-hh*.4);c.lineTo(px+hh*.14,py);c.moveTo(px-hh*.18,py-hh*.62);c.lineTo(px+hh*.18,py-hh*.62);c.stroke();c.restore();};
  const noteFly=(a,t,n,speed)=>{const c=x(),R=srand(5);for(let i=0;i<n;i++){const q=((t*speed+R())%1),X=a.x+R()*a.w,Y=a.y-20+q*(a.h+40),rot=Math.sin(t*2+i)*.6,w=18+R()*10;c.save();c.translate(X,Y);c.rotate(rot);c.fillStyle="rgba(100,210,140,.55)";c.fillRect(-w,-w*.45,w*2,w*.9);c.strokeStyle="rgba(190,255,215,.5)";c.lineWidth=1;c.strokeRect(-w,-w*.45,w*2,w*.9);c.restore();}};

  const s0=(t)=>{photo(1,t,7.4,1.12,.3);const f=title(t,"STORA TAL","MILJON, MILJARD OCH BILJON","#bfe8d0");cred(1,.55*f);};

  /* 1 · tusen, miljon, miljard, biljon: nollor som växer */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,18.8,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);
      if(t<13.4){const rows=[["tusen",3,"#cfe8d8"],["miljon",6,"#9be3b0"],["miljard",9,"#ffe27a"],["biljon",12,"#ff9ac0"]],rh=Math.min(a.h*.18,s*.2),y0=cy-rh*1.9,fs=Math.max(20,Math.min(a.w*.05,rh*.5));
        rows.forEach(([nm,z,col],i)=>{const k=eo((t-3-i*2.3)/1.2);if(k<=0)return;const y=y0+i*rh*1.25,tw=Math.min(a.w*.8,s*1.5),lx=cx-tw/2;c.save();c.globalAlpha=g*k;gl(lx+tw*.5,y,tw*.5,col.replace("#","")&&`rgba(${i===0?"200,230,215":i===1?"150,230,175":i===2?"255,226,120":"255,154,192"},.1)`);
          tx(nm,lx,y+fs*.3,col,"left",fs*1.05,700);const digits="1"+"0".repeat(z);let s2=digits.replace(/\B(?=(\d{3})+(?!\d))/g," ");c.font=`700 ${Math.round(fs*1.2)}px "Source Serif 4",Georgia,serif`;c.textAlign="right";c.fillStyle="#fff";c.shadowColor=col;c.shadowBlur=14;c.fillText(s2,lx+tw,y+fs*.35);c.restore();
          if(i>0){c.save();c.globalAlpha=g*k;c.fillStyle=col;c.font=`700 ${Math.round(fs*.7)}px Inter,system-ui,sans-serif`;c.textAlign="center";c.fillText("× 1 000",cx,y-rh*.52);c.restore();}});
        tx(sv(1000)+"  →  "+(t>4.5?"1 000 000":"")+(t>6.8?"  →  1 000 000 000":""),cx,a.y+a.h*.93,"rgba(255,255,255,.0)","center",10,700);}
      else{const q=eo((t-13.4)/1.1),pw=Math.min(a.w*.34,s*.6),ph=pw*.5;c.globalAlpha=g*q;
        [["miljard","billion",-1,"#ffe27a"],["biljon","trillion",1,"#ff9ac0"]].forEach(([sv_,en,k,col])=>{const px=cx+k*a.w*.2,py=cy;c.fillStyle="rgba(255,255,255,.06)";c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(px-pw/2,py-ph/2,pw,ph,14):c.rect(px-pw/2,py-ph/2,pw,ph);c.fill();c.stroke();gl(px,py,pw*.6,col==="#ffe27a"?"rgba(255,226,120,.14)":"rgba(255,154,192,.14)");tx(sv_,px,py-ph*.1,"#fff","center",Math.max(20,pw*.12),700);tx("på engelska:",px,py+ph*.14,"#9fb4a8","center",Math.max(12,pw*.06),600);tx(en,px,py+ph*.36,col,"center",Math.max(20,pw*.12),700);});
        tx("svenska och engelska tal skiljer sig",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 2 · sekunder: elva dygn, trettiotvå år, trettio tusen år */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,12.7,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const fw=Math.min(a.w*.24,s*.42),fh=Math.min(a.h*.7,fw*1.3);frame(2,a.x+a.w*.2,cy,fw,fh);
      const w=Math.min(a.w*.42,s*.8),lx=cx-a.w*.0+a.w*.0,bx=cx+a.w*.04,bh=Math.max(26,s*.07),y0=cy-bh*2.1,lg=v=>Math.log10(v)/15;const rows=[["1 000 000 sekunder","≈ 11 dygn",1e6,"#9be3b0",3],["1 000 000 000 sekunder","≈ 32 år",1e9,"#ffe27a",5],["1 000 000 000 000 sekunder","> 31 000 år",1e12,"#ff9ac0",7.3]];
      rows.forEach(([l,r,v,col,t0],i)=>{const k=eo((t-t0)/1.6);if(k<=0)return;const y=y0+i*bh*2.3;c.save();c.globalAlpha=g*k;c.fillStyle="rgba(255,255,255,.07)";c.fillRect(bx,y,w,bh);gl(bx+w*lg(v)*k,y+bh/2,bh*1.8,col==="#9be3b0"?"rgba(150,230,175,.4)":col==="#ffe27a"?"rgba(255,226,120,.4)":"rgba(255,154,192,.4)");const bg=c.createLinearGradient(bx,0,bx+w*lg(v),0);bg.addColorStop(0,"rgba(255,255,255,.2)");bg.addColorStop(1,col);c.fillStyle=bg;c.fillRect(bx,y,w*lg(v)*k,bh);tx(l,bx,y-Math.max(8,s*.018),"#cfe0d6","left",Math.max(12,s*.032),600);tx(r,bx+w*lg(v)*k+10,y+bh*.7,col,"left",Math.max(17,s*.045),700);c.restore();});
      if(t>7.3){c.globalAlpha=g*eo((t-7.3)/1);tx("då levde mammutar",bx+w/2,y0+2*bh*2.3+bh+Math.max(34,s*.075),"#ffd0a0","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 3 · en miljon kronor: 10 cm */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,11.7,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const fw=Math.min(a.w*.28,s*.5),fh=fw*.75;frame(3,a.x+a.w*.22,cy,fw,fh);
      const gy=cy+s*.28,k=eo((t-3.4)/4),H=s*.5*k,sx=cx+a.w*.12,sw=Math.min(a.w*.12,s*.22);
      /* linjal i cm bakom stapeln */
      c.strokeStyle="rgba(255,255,255,.55)";c.lineWidth=2;c.beginPath();c.moveTo(sx+sw/2+20,gy);c.lineTo(sx+sw/2+20,gy-s*.5);c.stroke();for(let i=0;i<=10;i++){const y=gy-i*s*.05;c.beginPath();c.moveTo(sx+sw/2+20,y);c.lineTo(sx+sw/2+(i%5?30:40),y);c.stroke();if(i%5===0||i===10)tx(i+" cm",sx+sw/2+46,y+5,"rgba(255,255,255,.8)","left",Math.max(11,s*.028),600);}
      stack(sx,gy,sw,Math.max(1,H),true);c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=2;c.beginPath();c.moveTo(a.x+a.w*.46,gy);c.lineTo(sx+sw/2+20,gy);c.stroke();
      tx(sv(Math.round(1000*k))+" sedlar",sx,gy+Math.max(34,s*.075),"#9be3b0","center",Math.max(17,s*.045),700);tx("1 000 kr styck",sx,gy+Math.max(34,s*.075)+Math.max(26,s*.058),"#cfe0d6","center",Math.max(13,s*.034),600);
      if(k>.95)tx("10 cm",sx-sw/2-20,gy-H/2,"#ffe27a","right",Math.max(22,s*.06),700);tx("1 000 000 kr",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(22,s*.06),700);
      c.restore();}};

  /* 4 · en miljard kronor: 100 m, Turning Torso 190 m */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,12.3,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#05101c"],[.7,"#143040"],[1,"#2a4a3a"]]);const gy=a.y+a.h*.88,top=a.y+a.h*.1,m=a.h*.78/200,k=eo((t-3)/4.5);
      c.fillStyle="#1a2a22";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
      /* Turning Torso: vridna våningar */
      const tx0=cx+a.w*.18,tw=Math.min(a.w*.07,s*.12),N=54;for(let i=0;i<N;i++){const y=gy-i*190*m/N,off=Math.sin(i*.115)*tw*.28,hh=190*m/N+.5;const g2=c.createLinearGradient(tx0-tw/2+off,0,tx0+tw/2+off,0);g2.addColorStop(0,"#9fb4c8");g2.addColorStop(1,"#e8f0f8");c.fillStyle=g2;c.fillRect(tx0-tw/2+off,y-hh,tw*(1-i*.004),hh);}
      c.strokeStyle="rgba(255,226,120,.5)";c.setLineDash([6,6]);c.lineWidth=2;c.beginPath();c.moveTo(a.x+a.w*.12,gy-190*m);c.lineTo(tx0+tw,gy-190*m);c.stroke();c.setLineDash([]);tx("Turning Torso 190 m",tx0,gy-190*m-Math.max(10,s*.022),"#ffe27a","center",Math.max(13,s*.034),700);
      /* sedelstapeln */
      const sx=cx-a.w*.06,sw=Math.min(a.w*.07,s*.12);stack(sx,gy,sw,Math.max(1,100*m*k),true);
      for(let i=0;i<8;i++){const q=((t*.4+i*.13)%1);gl(sx+(i%2?1:-1)*sw*.3*q,gy-100*m*k*q,sw*.4,"rgba(150,255,190,.35)");}
      person(sx-sw*1.4,gy,1.7*m*3);tx("du 1,7 m",sx-sw*1.4,gy+Math.max(24,s*.054),"#cfe0ea","center",Math.max(12,s*.03),600);
      tx(Math.round(100*k)+" m",sx,gy-100*m*k-Math.max(14,s*.03),"#9be3b0","center",Math.max(20,s*.055),700);tx("1 miljon sedlar",sx,gy+Math.max(48,s*.1),"#9be3b0","center",Math.max(13,s*.034),700);
      tx("1 000 000 000 kr",cx,a.y+a.h*.05+Math.max(10,s*.02),"#ffd86b","center",Math.max(20,s*.055),700);
      c.restore();}};

  /* 5 · en biljon kronor: 100 km, gränsen mot rymden */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(5,t,9.1,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;const top=a.y+a.h*.1,bot=a.y+a.h*.88,H=bot-top,m=km=>bot-km/110*H,k=eo((t-3)/3.8);
      const sg=c.createLinearGradient(0,top,0,bot);sg.addColorStop(0,"#000308");sg.addColorStop(.5,"#0a1c3a");sg.addColorStop(1,"#4a88c8");c.fillStyle=sg;c.fillRect(a.x,a.y,a.w,a.h);const R=srand(3);for(let i=0;i<60;i++){gl(a.x+R()*a.w,top+R()*H*.35,2+R()*3,`rgba(255,255,255,${.3+.4*R()})`);}
      const px=cx-a.w*.12;c.fillStyle="#1a3a2a";c.fillRect(a.x,bot,a.w,a.y+a.h-bot);
      /* mätare */[[0,"0"],[8.8,"Mount Everest 8,8 km"],[10,"flygplan 10 km"],[100,"gränsen mot rymden 100 km"]].forEach(([km,l])=>{c.strokeStyle=km===100?"#ffd86b":"rgba(255,255,255,.4)";c.lineWidth=km===100?3:1.5;c.setLineDash(km===100?[10,6]:[]);c.beginPath();c.moveTo(px+40,m(km));c.lineTo(px+a.w*.3,m(km));c.stroke();c.setLineDash([]);if(km>0)tx(l,px+a.w*.3+10,m(km)+(km===8.8?14:km===10?-6:5),km===100?"#ffd86b":"rgba(255,255,255,.8)","left",Math.max(12,s*.032),km===100?700:600);});
      const hh=(bot-m(100*k)),sw=Math.max(8,Math.min(a.w*.02,16));gl(px,bot-hh/2,hh*.5,"rgba(120,255,170,.3)");const gg=c.createLinearGradient(0,bot,0,bot-hh);gg.addColorStop(0,"#3a9a5a");gg.addColorStop(1,"#a0ffc0");c.fillStyle=gg;c.fillRect(px-sw/2,bot-hh,sw,hh);gl(px,bot-hh,sw*4,"rgba(200,255,220,.8)");
      tx("1 miljard sedlar",px,bot+Math.max(26,s*.058),"#9be3b0","center",Math.max(14,s*.037),700);tx("≈ "+Math.round(100*k)+" km",px,bot-hh-Math.max(16,s*.035),"#fff","center",Math.max(20,s*.055),700);
      tx("1 000 000 000 000 kr",cx,a.y+a.h*.06,"#ffd86b","center",Math.max(19,s*.052),700);
      c.restore();}};

  /* 6 · en sedel i sekunden: 11 dygn, 32 år */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,9.3,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);noteFly(a,t,22,.18);
      const w=Math.min(a.w*.6,s*1.1),lx=cx-w/2,bh=Math.max(32,s*.085),y1=cy-bh*1.3,y2=cy+bh*.6;const k1=eo((t-3.2)/3.2),k2=eo((t-5.6)/2.6);
      const row=(y,k,col,rgb,l1,l2)=>{c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y,w,bh);gl(lx+w*k,y+bh/2,bh*2,`rgba(${rgb},.45)`);const bg=c.createLinearGradient(lx,0,lx+w,0);bg.addColorStop(0,"rgba(255,255,255,.25)");bg.addColorStop(1,col);c.fillStyle=bg;c.fillRect(lx,y,w*k,bh);tx(l1,lx,y-Math.max(8,s*.02),"#cfe0d6","left",Math.max(14,s*.037),700);tx(l2,lx+w,y+bh*.7,"#fff","right",Math.max(18,s*.048),700);};
      row(y1,k1,"#ffe27a","255,226,120","1 miljard kronor (1 sedel/s)","≈ "+Math.round(11*k1)+" dygn");
      if(t>5.6)row(y2,k2,"#ff9ac0","255,154,192","1 biljon kronor (1 sedel/s)","≈ "+Math.round(32*k2)+" år");
      tx("en sedel i sekunden",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(20,s*.055),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
