/* Därför spinner katter: minilektionen som film (åtta scener, ca 1,5 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/spinnande/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/spinnande-1..6.jpg. MPSpinnandeFilm.start(host,{overlay,onClose}). Ljudmatta: tradgarden. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.4,cap:[[0.5,"Ett ljud som vibrerar i hela kroppen. Det här är berättelsen om varför katter spinner."]]},
 {k:"01 · Vibrerar",d:9.7,cap:[[0.8,"När katter spinner vibrerar det i kroppen. Kroppen skakar snabbt, mellan 25 och 150 gånger varje sekund."]]},
 {k:"02 · Hjärnan styr",d:12.7,cap:[[0.8,"Hjärnan skickar signaler till musklerna i struphuvudet, som öppnar och stänger stämspringan snabbt."],[7.9,"Ljudet hörs både när katten andas in och när den andas ut."]]},
 {k:"03 · Inte bara glad",d:10.8,cap:[[0.8,"Katter spinner när de trivs, men också när de är oroliga, har ont eller är hos veterinären."],[7.1,"Det kan vara ett sätt att lugna sig själva."]]},
 {k:"04 · Ljud för att få mat",d:11.2,cap:[[0.8,"Forskare har hittat ett högt, gnälligt ljud gömt i spinnandet, som katter använder för att få mat."],[7.6,"Det låter lite som en bebis som gråter."]]},
 {k:"05 · Kattungar",d:9.3,cap:[[0.8,"Kattungar börjar spinna när de är bara några dagar gamla. Det visar mamman att allt är bra, och hjälper dem att hitta mjölken."]]},
 {k:"06 · Kan det läka?",d:8.1,cap:[[0.8,"Vissa forskare tror att vibrationerna kan hjälpa kroppen att läka sig själv. Det är inte säkert än."]]},
 {k:"07 · Stora katter",d:13.4,cap:[[0.8,"Geparder och pumor kan spinna. Lejon, tigrar och jaguarer kan inte spinna på samma sätt, men de kan ryta."],[8.8,"Ett lejons rytande kan höras flera kilometer bort."]]}
];
const META={mat:"tradgarden",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Därför spinner katter",under:"En film i åtta steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Ett litet ljud som gör både katten och oss lugnare. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Von.grzanka (katt i snö) · CC BY-SA 3.0 · Wikimedia Commons",2:"Foto: Basile Morin (katt som leker med en ödla) · CC BY-SA 4.0 · Wikimedia Commons",3:"Foto: Indonesiens regering (veterinärer undersöker en katt) · Public domain · Wikimedia Commons",4:"Foto: Flyingimam (nyfödd kattunge) · Public domain · Wikimedia Commons",5:"Foto: Department of Labor, 1913 (veterinär) · Public domain · Wikimedia Commons",6:"Foto: Charles J. Sharp (gepard) · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPSpinnandeFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"spinnande",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"spinnande-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const wave=(lx,w,y,amp,freq,t,col,lw)=>{const c=x();c.save();c.strokeStyle=col;c.lineWidth=lw||3;c.beginPath();for(let i=0;i<=120;i++){const q=i/120,X=lx+q*w,Y=y+Math.sin(q*TAU*freq-t*freq*1.5)*amp;i?c.lineTo(X,Y):c.moveTo(X,Y);}c.stroke();c.restore();};
  const catHead=(px,py,r,col)=>{const c=x();c.save();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.beginPath();c.moveTo(px-r*.95,py-r*.2);c.lineTo(px-r*.7,py-r*1.3);c.lineTo(px-r*.15,py-r*.85);c.closePath();c.fill();c.beginPath();c.moveTo(px+r*.95,py-r*.2);c.lineTo(px+r*.7,py-r*1.3);c.lineTo(px+r*.15,py-r*.85);c.closePath();c.fill();c.fillStyle="#222";c.beginPath();c.arc(px-r*.35,py-r*.1,r*.1,0,TAU);c.arc(px+r*.35,py-r*.1,r*.1,0,TAU);c.fill();c.fillStyle="#e8a0a8";c.beginPath();c.moveTo(px,py+r*.15);c.lineTo(px-r*.12,py+r*.02);c.lineTo(px+r*.12,py+r*.02);c.closePath();c.fill();c.strokeStyle="#222";c.lineWidth=Math.max(1.5,r*.04);for(const sd of[-1,1]){c.beginPath();c.moveTo(px+sd*r*.2,py+r*.2);c.lineTo(px+sd*r*.9,py+r*.1);c.moveTo(px+sd*r*.2,py+r*.28);c.lineTo(px+sd*r*.9,py+r*.35);c.stroke();}c.restore();};

  const s0=(t)=>{photo(1,t,7.4,1.12,.3);const f=title(t,"SPINNANDE","VARFÖR KATTER SPINNER","#ffe0a8");cred(1,.55*f);};

  /* 1 · vibrationer 25–150 gånger per sekund */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,9.7,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,amp=Math.max(14,s*.04);
      [[25,"#9fd0ff",.0],[75,"#ffd86b",.12],[150,"#ff9a8a",.24]].forEach(([f,col,off],i)=>{const q=eo((t-3-i*.9)/.8);if(q<=0)return;c.globalAlpha=g*q;const y=cy-s*.1+i*Math.max(70,s*.16);wave(lx,w,y,amp,f/10,t,col,3);tx(f+" gånger/s",lx,y-amp-Math.max(10,s*.026),col,"left",Math.max(14,s*.037),700);});
      tx("25 – 150 gånger varje sekund",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(19,s*.052),700);
      c.restore();}};

  /* 2 · struphuvudet: stämspringan öppnas och stängs, andas in och ut */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,12.7,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const w=Math.min(a.w*.3,s*.5),h=Math.min(a.h*.5,s*.6),lx=cx-w/2,top=cy-h/2;
      c.fillStyle="rgba(232,150,150,.55)";c.fillRect(lx,top,w,h);c.fillStyle="#2a2018";c.fillRect(lx+w*.2,top+h*.1,w*.6,h*.8);
      const op=.5+.5*Math.sin(t*(t>5?14:3));const gap=op*w*.22+2;c.fillStyle="#e07a8a";c.beginPath();c.moveTo(lx+w*.2,top+h*.5);c.quadraticCurveTo(cx-gap,top+h*.5-h*.12,cx-gap,top+h*.5);c.quadraticCurveTo(cx-gap,top+h*.5+h*.12,lx+w*.2,top+h*.5);c.fill();c.beginPath();c.moveTo(lx+w*.8,top+h*.5);c.quadraticCurveTo(cx+gap,top+h*.5-h*.12,cx+gap,top+h*.5);c.quadraticCurveTo(cx+gap,top+h*.5+h*.12,lx+w*.8,top+h*.5);c.fill();
      tx("stämspringan öppnas och stängs",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(17,s*.045),700);
      if(t>7.9){const inn=Math.sin((t-7.9)*1.6)>0;c.globalAlpha=g*eo((t-7.9)/1);c.strokeStyle=inn?"#9fd0ff":"#ffb878";c.lineWidth=6;const ax=lx+w+Math.max(40,s*.1),ay0=cy-h*.3,ay1=cy+h*.3;c.beginPath();c.moveTo(ax,inn?ay0:ay1);c.lineTo(ax,inn?ay1:ay0);c.stroke();tx(inn?"in":"ut",ax+Math.max(26,s*.06),cy,inn?"#9fd0ff":"#ffb878","left",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 3 · inte bara glad: tre känslor, alla spinner */
  const face=(px,py,r,mood,col)=>{const c=x();c.save();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.fillStyle="#222";c.beginPath();c.arc(px-r*.32,py-r*.15,r*.1,0,TAU);c.arc(px+r*.32,py-r*.15,r*.1,0,TAU);c.fill();c.strokeStyle="#222";c.lineWidth=Math.max(3,r*.07);c.beginPath();if(mood==="happy")c.arc(px,py+r*.05,r*.4,.15*Math.PI,.85*Math.PI);else if(mood==="worry")c.arc(px,py+r*.7,r*.4,1.15*Math.PI,1.85*Math.PI);else{c.moveTo(px-r*.3,py+r*.35);c.lineTo(px+r*.3,py+r*.35);}c.stroke();if(mood==="hurt"){c.strokeStyle="#d93030";c.lineWidth=4;c.beginPath();c.moveTo(px+r*.5,py-r*.9);c.lineTo(px+r*.9,py-r*.5);c.moveTo(px+r*.9,py-r*.9);c.lineTo(px+r*.5,py-r*.5);c.stroke();}c.restore();};
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,10.8,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const r=Math.max(34,Math.min(a.w*.08,a.h*.16,s*.14));
      [["happy","trivs","#ffd86b"],["worry","orolig","#9fd0ff"],["hurt","har ont","#ff9a8a"]].forEach(([m,n,col],i)=>{const q=eo((t-3-i*.9)/.8);if(q<=0)return;c.globalAlpha=g*q;const px=cx+(i-1)*r*3.4;face(px,cy-r*.3,r,m,col);tx(n,px,cy+r*1.4,col,"center",Math.max(15,s*.04),700);wave(px-r,r*2,cy+r*2.4,r*.14,4,t,col,3);});
      if(t>7.1){c.globalAlpha=g*eo((t-7.1)/1);tx("spinnandet lugnar katten",cx,a.y+a.h*.1,"#9be3b0","center",Math.max(18,s*.048),700);}
      c.restore();}};

  /* 4 · högt gnälligt ljud gömt i spinnandet */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,11.2,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy;
      wave(lx,w,y,Math.max(14,s*.04),2.2,t,"#9fd0ff",3);tx("vanligt spinn",lx,y+Math.max(70,s*.15),"#9fd0ff","left",Math.max(14,s*.037),700);
      if(t>4.5){const q=eo((t-4.5)/1);c.globalAlpha=g*q;wave(lx,w,y,Math.max(8,s*.022),13,t,"#ff9a8a",2.5);tx("högt, gnälligt ljud",lx+w,y+Math.max(70,s*.15),"#ff9a8a","right",Math.max(14,s*.037),700);}
      tx("mat!",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(30,s*.085),700);
      if(t>7.6){c.globalAlpha=g*eo((t-7.6)/1);tx("lite som en bebis som gråter",cx,a.y+a.h*.88,"#cfd8ff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 5 · mamma och kattunge */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,9.3,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const r=Math.max(40,Math.min(a.w*.09,a.h*.18,s*.16));
      catHead(cx-r*2.2,cy,r*1.2,"#b88a4a");catHead(cx+r*2,cy+r*.5,r*.65,"#d9a860");
      if(t>4){const q=eo((t-4)/1);c.globalAlpha=g*q;wave(cx-r*.7,r*2,cy+r*.3,r*.15,5,t,"#9fd0ff",3);}
      tx("mamma",cx-r*2.2,cy+r*2.1,"#ffd86b","center",Math.max(15,s*.04),700);tx("kattunge, några dagar gammal",cx+r*2,cy+r*1.7,"#ffd86b","center",Math.max(13,s*.034),700);
      if(t>6.5){c.globalAlpha=g*eo((t-6.5)/1);tx("allt är bra · hitta mjölken",cx,a.y+a.h*.1,"#9be3b0","center",Math.max(18,s*.048),700);}
      c.restore();}};

  /* 6 · kan det läka? ben med pulser */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,8.1,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const u=Math.max(20,Math.min(a.w*.045,s*.055));
      for(let i=0;i<3;i++){const p=((t*.5+i/3)%1);c.strokeStyle=`rgba(155,227,176,${.6*(1-p)})`;c.lineWidth=3;c.beginPath();c.arc(cx,cy,u*2+p*u*5,0,TAU);c.stroke();}
      c.strokeStyle="#f2efe6";c.lineWidth=u*.8;c.lineCap="round";c.beginPath();c.moveTo(cx-u*3,cy);c.lineTo(cx+u*3,cy);c.stroke();c.fillStyle="#f2efe6";for(const sx of[-1,1])for(const sy of[-.5,.5]){c.beginPath();c.arc(cx+sx*u*3.2,cy+sy*u*.7,u*.6,0,TAU);c.fill();}
      tx("kanske läker vibrationerna",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(19,s*.052),700);tx("inte säkert än",cx,cy+u*5,"#cfd8ff","center",Math.max(16,s*.042),700);
      c.restore();}};

  /* 7 · stora katter: spinner mot ryter */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,13.4,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a2018"],[1,"#3a2c20"]]);const cw=Math.min(a.w*.34,s*.6),lx=cx-cw*.6,rx=cx+cw*.6;
      const col=(px,title,items,color)=>{c.fillStyle="rgba(255,255,255,.07)";c.strokeStyle=color;c.lineWidth=3;c.fillRect(px-cw/2,cy-s*.2,cw,s*.4);c.strokeRect(px-cw/2,cy-s*.2,cw,s*.4);tx(title,px,cy-s*.2+Math.max(34,s*.075),color,"center",Math.max(19,s*.052),700);items.forEach((n,i)=>tx(n,px,cy-s*.2+Math.max(80,s*.18)+i*Math.max(32,s*.07),"#fff","center",Math.max(15,s*.04),600));};
      const q1=eo((t-3)/1),q2=eo((t-5)/1);c.globalAlpha=g*q1;col(lx,"spinner",["gepard","puma"],"#9fd0ff");c.globalAlpha=g*q2;col(rx,"ryter",["lejon","tiger","jaguar"],"#ff9a8a");
      if(t>8.8){const q=eo((t-8.8)/1);c.globalAlpha=g*q;for(let i=0;i<4;i++){const p=((t*.4+i/4)%1);c.strokeStyle=`rgba(255,154,138,${.5*(1-p)})`;c.lineWidth=3;c.beginPath();c.arc(rx,cy+s*.34,p*Math.max(60,s*.2),Math.PI,TAU);c.stroke();}tx("hörs flera kilometer bort",rx,cy+s*.36,"#ffb0a0","center",Math.max(13,s*.034),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
