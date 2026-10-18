/* Orkaner: minilektionen som film (sju scener), satellitbilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/orkan/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/orkan-1..7.jpg. MPOrkanFilm.start(host,{overlay,onClose}). Ljudmatta: slott (vind). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:9.4,cap:[[0.5,"En enorm, snurrande storm som kan vara hundratals kilometer bred. Det här är berättelsen om orkaner."]]},
 {k:"01 · Varmt hav",d:11.1,cap:[[0.8,"En orkan bildas över ett hav som är minst ungefär 26 grader varmt."],[6.6,"Varm, fuktig luft stiger uppåt och bildar åskmoln."]]},
 {k:"02 · Snurrar",d:8.9,cap:[[0.8,"Jordens rotation får vindarna att börja snurra."],[4.3,"På norra halvklotet snurrar de moturs, åt vänster."]]},
 {k:"03 · Ögat",d:11.6,cap:[[0.8,"I mitten finns ögat, ett område där det nästan är vindstilla och ibland sol."],[6.7,"Runt ögat står ögonväggen med de allra starkaste vindarna."]]},
 {k:"04 · Över 119 km/h",d:9.9,cap:[[0.8,"Man kallar det en orkan när vinden blåser över 119 kilometer i timmen."],[6.3,"De starkaste når över 250."]]},
 {k:"05 · Olika namn",d:14,cap:[[0.8,"Orkan heter tyfon i västra Stilla havet och cyklon i Indiska oceanen. Det är samma sorts storm."],[7.9,"Stormarna får namn från listor i bokstavsordning, så att alla kan hålla reda på dem."]]},
 {k:"06 · Vattnet",d:12.1,cap:[[0.8,"Mest skada gör oftast stormfloden, när havet pressas in över land."],[6.3,"Över land tappar orkanen sin kraft, eftersom den inte får mer varmt vatten."]]}
];
const META={mat:"slott",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Orkaner",under:"En film i sju steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Nu vet du hur en orkan blir till. Filmen bygger på satellitbilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Karta: NOAA (havets yttemperatur) · Public domain · Wikimedia Commons",2:"Satellitbild: Jeff Schmaltz, NASA MODIS (Catarina 2004) · Public domain",3:"Satellitbild: GOES/CSU/CIRA & NOAA (orkanen Beryl) · Public domain · Wikimedia Commons",4:"Video-bild: NASA Goddard (orkanen Katrina) · CC BY 2.0 · Wikimedia Commons",5:"Satellitbild: NOAA (supertyfonen Oscar) · Public domain · Wikimedia Commons",6:"Satellitbild: GOES/CSU/CIRA & NOAA (orkanen Milton) · Public domain",7:"Foto: Department of Homeland Security (Staten Island, 2012) · Public domain"};

window.MPOrkanFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"orkan",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"orkan-",names:[1,2,3,4,5,6,7],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,title}=L;
  const sea=(a,gy,t,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;for(let j=0;j<3;j++){c.fillStyle=["#1f6fb5","#195c98","#124a7c"][j];c.beginPath();c.moveTo(a.x,a.y+a.h);for(let px=a.x;px<=a.x+a.w+8;px+=8)c.lineTo(px,gy+j*Math.max(10,a.h*.04)+Math.sin(px*.02+t*(1.3+j*.3)+j)*4);c.lineTo(a.x+a.w,a.y+a.h);c.closePath();c.fill();}c.restore();};
  /* orkan ovanifrån: spiralarmar som snurrar moturs, ett klart öga */
  const storm=(cx,cy,R,t,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;
    const g=c.createRadialGradient(cx,cy,R*.1,cx,cy,R*1.05);g.addColorStop(0,"rgba(240,248,255,.15)");g.addColorStop(.5,"rgba(230,242,255,.5)");g.addColorStop(1,"rgba(230,242,255,0)");c.fillStyle=g;c.beginPath();c.arc(cx,cy,R*1.05,0,TAU);c.fill();
    c.lineCap="round";for(let k=0;k<5;k++){const base=-t*.5+k*TAU/5;c.strokeStyle="rgba(248,252,255,.8)";c.beginPath();for(let i=0;i<=40;i++){const q=i/40,r=R*(.14+q*.86),an=base-q*3.0,X=cx+Math.cos(an)*r,Y=cy+Math.sin(an)*r;if(i===0)c.moveTo(X,Y);else c.lineTo(X,Y);}c.lineWidth=Math.max(6,R*.12);c.globalAlpha=(al==null?1:al)*.5;c.stroke();}
    c.globalAlpha=al==null?1:al;c.fillStyle="#0c2342";c.beginPath();c.arc(cx,cy,R*.09,0,TAU);c.fill();c.restore();};

  const s0=(t)=>{photo(3,t,9.4,1.12,.2);const f=title(t,"ORKANER","JORDENS STÖRSTA STORMAR","#cfe8ff");cred(3,.55*f);};

  /* 1 · Varmt hav: värme som stiger och åskmoln */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(1,t,11.1,1.08,.15+.4*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#14305a"],[1,"#3a6aa8"]]);
      const gy=a.y+a.h*.66;sea(a,gy,t,1);
      // värme och uppåtpilar
      for(let i=0;i<6;i++){const px=a.x+a.w*(.14+.14*i),ph=(t*.5+i*.17)%1,py=gy-ph*a.h*.3;c.strokeStyle=`rgba(255,160,90,${.8*(1-ph)})`;c.lineWidth=4;c.lineCap="round";c.beginPath();c.moveTo(px,py+16);c.lineTo(px,py);c.stroke();c.beginPath();c.moveTo(px,py-6);c.lineTo(px-6,py+4);c.lineTo(px+6,py+4);c.fillStyle=c.strokeStyle;c.fill();}
      // termometer
      const tx0=a.x+a.w*.08,ty=a.y+a.h*.18,th=a.h*.34;c.fillStyle="rgba(255,255,255,.15)";c.fillRect(tx0-8,ty,16,th);c.fillStyle="#ff8a5a";c.fillRect(tx0-5,ty+th*.35,10,th*.65);tx("26°",tx0+18,ty+th*.38,"#ffd0b0","left",Math.max(20,s*.055),700);tx("minst",tx0+18,ty+th*.38-Math.max(22,s*.05),"#ffd0b0","left",Math.max(12,s*.03),600);
      if(t>6.6){const q=eo((t-6.6)/2.4);c.globalAlpha=g*q;[[.35,.3,.1],[.5,.26,.14],[.68,.3,.11],[.58,.2,.09]].forEach(([dx,dy,r])=>{c.fillStyle="#d9dfee";c.beginPath();c.arc(a.x+a.w*dx,a.y+a.h*dy,Math.min(a.w,a.h)*r*q,0,TAU);c.fill();});tx("åskmoln",cx,a.y+a.h*.1,"#fff","center",Math.max(18,s*.05),700);}
      c.restore();}};

  /* 2 · Snurrar moturs */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,8.9,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d2142"],[1,"#1a3f6a"]]);
      const R=Math.min(a.w*.26,a.h*.32);storm(cx,cy-s*.02,R,t,1);
      if(t>4.4){const q=eo((t-4.4)/1);c.globalAlpha=g*q;c.strokeStyle="#ffd86b";c.lineWidth=5;c.lineCap="round";c.beginPath();c.arc(cx,cy-s*.02,R*1.18,Math.PI*.1,Math.PI*1.4,true);c.stroke();const an=Math.PI*1.4,hx=cx+Math.cos(an)*R*1.18,hy=cy-s*.02+Math.sin(an)*R*1.18;c.fillStyle="#ffd86b";c.beginPath();c.moveTo(hx,hy);c.lineTo(hx+16,hy+4);c.lineTo(hx+6,hy+16);c.fill();tx("moturs",cx+R*1.5,cy-s*.02,"#ffd86b","left",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 3 · Ögat: tvärsnitt med ögonvägg */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,11.6,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#2a4f86"],[1,"#7fb0e0"]]);
      const gy=a.y+a.h*.8,w=Math.min(a.w*.84,s*1.6),eyeW=w*.2,wallW=w*.2;c.fillStyle="#1a5a98";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
      // ögonväggar (höga moln) och ögats klara luft med sol
      [[-1],[1]].forEach(([d])=>{const px=cx+d*(eyeW/2+wallW/2);c.fillStyle="#cdd5e6";c.fillRect(px-wallW/2,a.y+a.h*.1,wallW,gy-(a.y+a.h*.1));c.fillStyle="rgba(120,130,160,.35)";for(let i=0;i<8;i++)c.fillRect(px-wallW/2,a.y+a.h*.1+i*(gy-(a.y+a.h*.1))/8,wallW,3);});
      if(t>2.8){c.fillStyle="#ffe27a";c.beginPath();c.arc(cx,a.y+a.h*.18,Math.min(a.w,a.h)*.045,0,TAU);c.fill();}
      const k1=eo((t-3.2)/1);c.globalAlpha=g*k1;tx("ögat: nästan vindstilla",cx,a.y+a.h*.1+Math.max(60,s*.14),"#10223e","center",Math.max(14,s*.034),700);
      if(t>6.7){const q=eo((t-6.7)/1);c.globalAlpha=g*q;[-1,1].forEach(d=>{const px=cx+d*(eyeW/2+wallW/2),y=gy-(gy-(a.y+a.h*.1))*.5;c.strokeStyle="#ff6b5e";c.fillStyle="#ff6b5e";c.lineWidth=5;c.lineCap="round";for(let i=0;i<3;i++){const yy=y+(i-1)*Math.max(26,s*.06),off=((t*160+i*50)%60);c.beginPath();c.moveTo(px-d*20+d*off,yy);c.lineTo(px+d*28+d*off,yy);c.stroke();}});tx("ögonväggen: starkaste vindarna",cx,gy+Math.max(36,s*.08),"#fff","center",Math.max(15,s*.038),700);}
      c.restore();}};

  /* 4 · Över 119 km/h */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(4,t,9.9,1.1,.1+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.82,s*1.55),lx=cx-w/2,y=cy-s*.04,bh=Math.max(34,s*.09),px=v=>lx+v/300*w,k=eo((t-3.2)/1.6);
      c.fillStyle="rgba(255,255,255,.1)";c.fillRect(lx,y,w,bh);const gr=c.createLinearGradient(lx,0,lx+w,0);gr.addColorStop(0,"#7fd6ff");gr.addColorStop(.4,"#ffd86b");gr.addColorStop(1,"#ff5a5a");c.fillStyle=gr;c.fillRect(lx,y,w*(Math.min(1,k*250/300)),bh);
      [0,100,200,300].forEach(v=>{c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=1.5;c.beginPath();c.moveTo(px(v),y+bh);c.lineTo(px(v),y+bh+8);c.stroke();tx(String(v),px(v),y+bh+Math.max(26,s*.06),"rgba(255,255,255,.75)","center",Math.max(12,s*.03),600);});
      tx("km/h",lx+w,y+bh+Math.max(52,s*.115),"rgba(255,255,255,.6)","right",Math.max(12,s*.03),600);
      if(t>4.8){const q=eo((t-4.8)/.8);c.globalAlpha=g*q;c.strokeStyle="#fff";c.lineWidth=3;c.beginPath();c.moveTo(px(119),y-14);c.lineTo(px(119),y+bh);c.stroke();tx("orkan från 119",px(119),y-24,"#fff","center",Math.max(15,s*.04),700);}
      if(t>6.3){const q=eo((t-6.3)/.8);c.globalAlpha=g*q;tx("över 250",px(250),y-24,"#ff9a8a","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 5 · Olika namn: tre regioner, och listan med namn */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(5,t,14,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const items=[["Orkan","Atlanten","#ffd86b",3.6],["Tyfon","västra Stilla havet","#7fd6ff",4.6],["Cyklon","Indiska oceanen","#9be3b0",5.6]],w=Math.min(a.w*.8,s*1.3),h=Math.max(52,s*.12),y0=a.y+a.h*.14;
      items.forEach(([n,r,col,st],i)=>{const q=eo((t-st)/.8);if(q<=0)return;const y=y0+i*h*1.2;c.save();c.globalAlpha=g*q;c.fillStyle="rgba(255,255,255,.07)";c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.roundRect?c.roundRect(cx-w/2,y,w,h,14):c.rect(cx-w/2,y,w,h);c.fill();c.stroke();tx(n,cx-w/2+18,y+h*.64,col,"left",Math.max(20,h*.42),700);tx(r,cx+w/2-18,y+h*.62,"#fff","right",Math.max(15,h*.32),600);c.restore();});
      if(t>6.4){const q=eo((t-6.4)/1);c.globalAlpha=g*q;tx("samma sorts storm",cx,y0+3*h*1.2+Math.max(26,s*.06),"#fff","center",Math.max(16,s*.042),700);}
      if(t>7.9){const nm=["Alberto","Beryl","Chris","Debby"],pw=Math.min(a.w*.18,s*.3),y=a.y+a.h*.84;nm.forEach((n,i)=>{const q=eo((t-8.2-i*.5)/.6);if(q<=0)return;c.save();c.globalAlpha=g*q;c.fillStyle="rgba(6,10,22,.8)";c.strokeStyle="#ffd86b";c.lineWidth=2;const px=cx+(i-1.5)*(pw+8);c.beginPath();c.roundRect?c.roundRect(px-pw/2,y,pw,Math.max(40,s*.09),12):c.rect(px-pw/2,y,pw,Math.max(40,s*.09),12);c.fill();c.stroke();tx(n,px,y+Math.max(27,s*.062),"#ffd86b","center",Math.max(14,s*.034),700);c.restore();});}
      c.restore();}};

  /* 6 · Vattnet: stormflod och orkanen som tynar över land */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(7,t,12.1,1.08,.25+.3*g);cred(7,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#243a5e"],[1,"#5a7aa8"]]);
      const gy=a.y+a.h*.74,shore=a.x+a.w*.5;c.fillStyle="#6a8f4a";c.fillRect(shore,gy-a.h*.04,a.x+a.w-shore,a.y+a.h-gy+a.h*.04);
      const surge=eo((t-3.4)/2.8)*a.w*.18,lvl=eo((t-3.4)/2.8)*a.h*.07;c.fillStyle="#1f6fb5";c.beginPath();c.moveTo(a.x,a.y+a.h);c.lineTo(a.x,gy-lvl);for(let px=a.x;px<=shore+surge;px+=8)c.lineTo(px,gy-lvl+Math.sin(px*.03+t*2)*4);c.lineTo(shore+surge,a.y+a.h);c.closePath();c.fill();
      c.strokeStyle="#ffd86b";c.fillStyle="#ffd86b";c.lineWidth=4;c.lineCap="round";const ax=a.x+a.w*.3,ay=gy-lvl-a.h*.1;c.beginPath();c.moveTo(ax,ay);c.lineTo(ax+a.w*.14,ay);c.stroke();c.beginPath();c.moveTo(ax+a.w*.14+12,ay);c.lineTo(ax+a.w*.14,ay-7);c.lineTo(ax+a.w*.14,ay+7);c.fill();
      tx("stormflod",ax+a.w*.07,ay-14,"#ffd86b","center",Math.max(16,s*.042),700);
      // orkanen: på havet stark, tynar över land
      const p=cl((t-6.3)/4.5,0,1),sx=lerp(a.x+a.w*.22,a.x+a.w*.78,eo(p)),R=Math.min(a.w*.12,a.h*.16),str=1-p*.85;
      storm(sx,a.y+a.h*.3,R*(.7+.3*str),t,.25+.75*str);
      if(t>6.5){const q=eo((t-6.5)/1);c.globalAlpha=g*q;tx(p<.5?"stark över varmt hav":"tappar kraft över land",cx,a.y+a.h*.1,"#fff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
