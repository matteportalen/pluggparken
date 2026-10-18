/* Robotar på Mars: minilektionen som film (sju scener), NASA-bilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/mars/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/mars-1..6.jpg. MPMarsFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:10,cap:[[0.5,"En röd, kall planet, och robotar som utforskar den åt oss. Det här är berättelsen om robotarna på Mars."]]},
 {k:"01 · Röd planet",d:9.8,cap:[[0.8,"Mars är kall, torr och full av damm."],[4.2,"Ingen människa har varit där, men robotar har kört runt på ytan i många år."]]},
 {k:"02 · Sojourner",d:9.2,cap:[[0.8,"År 1997 landade den första lilla roboten, Sojourner, som var ungefär lika stor som en mikrovågsugn."]]},
 {k:"03 · Curiosity",d:9.9,cap:[[0.8,"Curiosity landade år 2012. Den är stor som en bil och undersöker stenar för att hitta spår av vatten."]]},
 {k:"04 · Perseverance",d:10.9,cap:[[0.8,"I februari år 2021 landade Perseverance i Jezerokratern, där det för länge sedan fanns en sjö."],[8.6,"Den samlar stenprover."]]},
 {k:"05 · Helikoptern",d:9.8,cap:[[0.8,"Med Perseverance kom helikoptern Ingenuity."],[3.9,"Den gjorde den första flygningen på en annan planet, i april år 2021."]]},
 {k:"06 · Radiosignaler",d:9.7,cap:[[0.8,"Signalerna från jorden tar mellan 5 och 20 minuter att nå Mars."],[6.0,"Därför kan man inte styra roboten med joystick."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Robotar på Mars",under:"En film i sju steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Kanske blir du den första människan på Mars. Filmen bygger på NASA:s och ESA:s bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Bild: NASA (Sojourner, schema) · Public domain · Wikimedia Commons",2:"Foto: NASA (Perseverances självporträtt) · Public domain · Wikimedia Commons",3:"Foto: NASA/semeion.photo (Curiosity vid Rocknest) · CC BY 2.0 · Wikimedia Commons",4:"Bild: ESA/DLR/FU Berlin (Jezerokraterns delta) · CC BY-SA 3.0 IGO · Wikimedia Commons",5:"Foto: NASA (Ingenuity sedd av Perseverance) · CC BY 2.0 · Wikimedia Commons",6:"Foto: NASA (Curiosity vid Mont Mercou) · Public domain · Wikimedia Commons"};

window.MPMarsFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"mars",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"mars-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const marsDisc=(px,py,r,t)=>{const c=x();c.save();const g=c.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,"#e0794a");g.addColorStop(1,"#8a2e12");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();
    c.beginPath();c.arc(px,py,r,0,TAU);c.clip();c.fillStyle="rgba(60,15,5,.35)";[[-.3,-.2,.14],[.25,.1,.18],[-.1,.45,.1],[.45,-.4,.09],[-.5,.3,.08]].forEach(([dx,dy,rr])=>{c.beginPath();c.arc(px+dx*r,py+dy*r,rr*r,0,TAU);c.fill();});
    c.strokeStyle="rgba(255,210,170,.25)";c.lineWidth=Math.max(3,r*.05);for(let i=0;i<3;i++){c.beginPath();c.arc(px+Math.sin(t*.6+i)*r*.2,py+(i-1)*r*.5,r*.7,.3+i,1.4+i);c.stroke();}c.restore();};
  const rover=(cx,gy,Ln,t,big)=>{const c=x(),u=Ln/100;c.save();c.fillStyle="#d8dde6";c.strokeStyle="#4a5060";c.lineWidth=Math.max(1.5,u*1.2);c.fillRect(cx-36*u,gy-34*u,72*u,18*u);c.strokeRect(cx-36*u,gy-34*u,72*u,18*u);
    c.fillStyle="#2a2f3c";[-30,0,30].forEach(dx=>{[0,1].forEach(()=>{});c.beginPath();c.arc(cx+dx*u,gy-8*u,8*u,0,TAU);c.fill();});
    c.strokeStyle="#4a5060";c.lineWidth=Math.max(2,u*2);c.beginPath();c.moveTo(cx+24*u,gy-34*u);c.lineTo(cx+24*u,gy-56*u);c.stroke();c.fillStyle="#9fd0ff";c.fillRect(cx+18*u,gy-62*u,14*u,8*u);
    if(big){c.strokeStyle="#4a5060";c.lineWidth=Math.max(2,u*2);c.beginPath();c.moveTo(cx-36*u,gy-26*u);c.lineTo(cx-52*u,gy-20*u);c.lineTo(cx-56*u,gy-8*u);c.stroke();}c.restore();};
  const microwave=(cx,gy,Ln)=>{const c=x(),u=Ln/100;c.save();c.fillStyle="#cfd5dd";c.fillRect(cx-40*u,gy-50*u,80*u,50*u);c.strokeStyle="#4a5060";c.lineWidth=Math.max(1.5,u*1.2);c.strokeRect(cx-40*u,gy-50*u,80*u,50*u);c.fillStyle="#1a2030";c.fillRect(cx-34*u,gy-44*u,46*u,38*u);c.fillStyle="#7fd6ff";c.beginPath();c.arc(cx+26*u,gy-30*u,5*u,0,TAU);c.fill();c.fillRect(cx+20*u,gy-18*u,12*u,4*u);c.restore();};
  const car=(cx,gy,Ln)=>{const c=x(),u=Ln/100;c.save();c.fillStyle="#e85a5a";c.beginPath();c.roundRect?c.roundRect(cx-50*u,gy-26*u,100*u,18*u,5*u):c.rect(cx-50*u,gy-26*u,100*u,18*u);c.fill();c.beginPath();c.moveTo(cx-24*u,gy-26*u);c.lineTo(cx-14*u,gy-40*u);c.lineTo(cx+14*u,gy-40*u);c.lineTo(cx+30*u,gy-26*u);c.closePath();c.fill();c.fillStyle="#111";[-30,30].forEach(d=>{c.beginPath();c.arc(cx+d*u,gy-8*u,8*u,0,TAU);c.fill();});c.restore();};
  const surface=(a,y)=>{const c=x();c.fillStyle="#a14a26";c.fillRect(a.x,y,a.w,a.y+a.h-y);c.fillStyle="rgba(60,20,8,.25)";const r=L.srand(4);for(let i=0;i<30;i++){c.beginPath();c.ellipse(a.x+r()*a.w,y+r()*(a.y+a.h-y),12+r()*30,3+r()*6,0,0,TAU);c.fill();}};

  const s0=(t)=>{photo(2,t,10,1.12,.3);const f=title(t,"ROBOTAR PÅ MARS","UTFORSKARE PÅ DEN RÖDA PLANETEN","#ffb890");cred(2,.55*f);};

  /* 1 · Röd planet */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(3,t,9.8,1.1,.15+.4*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const R=Math.min(a.w*.2,a.h*.3),px=cx-(port?0:a.w*.12),py=cy-s*.02;marsDisc(px,py,R,t);
      [["kall","#9fd0ff",3.5],["torr","#ffd86b",4.1],["dammig","#ffb890",4.7]].forEach(([n,col,st],i)=>{const q=eo((t-st)/.7);if(q<=0)return;c.save();c.globalAlpha=g*q;const pw=Math.max(90,s*.2),ph=Math.max(40,s*.09),X=px+R*1.3+(port?0:20),Y=py-R*.9+i*ph*1.3;c.fillStyle="rgba(6,10,22,.8)";c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.roundRect?c.roundRect(X,Y,pw,ph,12):c.rect(X,Y,pw,ph);c.fill();c.stroke();tx(n,X+pw/2,Y+ph*.66,col,"center",Math.max(17,ph*.42),700);c.restore();});
      if(t>5.6){const q=eo((t-5.6)/1);c.globalAlpha=g*q;rover(px-R*.2,py+R*.86,R*.55,t,true);}
      c.restore();}};

  /* 2 · Sojourner mot mikrovågsugn */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(1,t,9.2,1.1,.15+.4*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#3a1a10"],[1,"#7a3016"]]);const gy=a.y+a.h*.74;surface(a,gy);
      const Ln=Math.min(a.w*.22,s*.4),dx=Math.min(a.w*.2,s*.34),k1=eo((t-3.2)/.8),k2=eo((t-4.6)/.8);
      c.globalAlpha=g*k1;rover(cx-dx,gy,Ln*1.2,t,false);tx("Sojourner 1997",cx-dx,gy+Math.max(28,s*.065),"#ffe0c8","center",Math.max(15,s*.038),700);
      c.globalAlpha=g*k2;microwave(cx+dx,gy,Ln*.95);tx("mikrovågsugn",cx+dx,gy+Math.max(28,s*.065),"#ffe0c8","center",Math.max(15,s*.038),700);
      if(t>5.8){const q=eo((t-5.8)/1);c.globalAlpha=g*q;tx("ungefär lika stora",cx,a.y+a.h*.14,"#fff","center",Math.max(20,s*.055),700);}
      c.restore();}};

  /* 3 · Curiosity: stor som en bil */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(6,t,9.9,1.1,.15+.4*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#3a1a10"],[1,"#7a3016"]]);const gy=a.y+a.h*.74;surface(a,gy);
      const sc=Math.min(a.w*.13,s*.22),x1=cx-a.w*.36,x2=cx-a.w*.06,x3=cx+a.w*.3;
      const k1=eo((t-3.2)/.7),k2=eo((t-3.9)/.7),k3=eo((t-4.6)/.7);
      c.globalAlpha=g*k1;microwave(x1,gy,sc*.65);tx("Sojourner",x1,gy+Math.max(26,s*.06),"#ffe0c8","center",Math.max(13,s*.032),700);
      c.globalAlpha=g*k2;rover(x2,gy,sc*3,t,true);tx("Curiosity 2012",x2,gy+Math.max(26,s*.06),"#ffe0c8","center",Math.max(13,s*.032),700);
      c.globalAlpha=g*k3;car(x3,gy,sc*3);tx("bil",x3,gy+Math.max(26,s*.06),"#ffe0c8","center",Math.max(13,s*.032),700);
      tx("letar efter spår av vatten",cx,a.y+a.h*.14,"#fff","center",Math.max(18,s*.05),700);
      c.restore();}};

  /* 4 · Perseverance: kratern där det fanns en sjö */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(4,t,10.9,1.1,.15+.4*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#3a1a10"],[1,"#7a3016"]]);
      const R=Math.min(a.w*.24,a.h*.34),py=cy-s*.02;c.fillStyle="#b2552a";c.strokeStyle="#6a2a12";c.lineWidth=5;c.beginPath();c.arc(cx,py,R,0,TAU);c.fill();c.stroke();
      const lake=eo((t-3.6)/1.2)*(1-eo((t-6.6)/2)*.95);c.fillStyle="#3f8fe8";c.beginPath();c.arc(cx,py,R*.78*lake,0,TAU);c.fill();
      if(t>3.8)tx(lake>.4?"en sjö":"torr",cx,py+4,"#fff","center",Math.max(17,s*.045),700);
      if(t>5.6){const q=eo((t-5.6)/1);c.globalAlpha=g*q;c.fillStyle="#fff";c.beginPath();c.arc(cx+R*.5,py+R*.2,Math.max(6,R*.06),0,TAU);c.fill();tx("Perseverance",cx+R*.5,py+R*.2-14,"#fff","center",Math.max(13,s*.032),700);}
      tx("Jezerokratern",cx,a.y+a.h*.12,"#ffd0b0","center",Math.max(18,s*.05),700);
      if(t>8.6){const q=eo((t-8.6)/1);c.globalAlpha=g*q;for(let i=0;i<3;i++){const px=cx-s*.1+i*s*.1,py2=py+R+Math.max(26,s*.07);c.fillStyle="#d8dde6";c.fillRect(px-6,py2-18,12,36);c.fillStyle="#a14a26";c.fillRect(px-5,py2-4,10,20);}tx("stenprover",cx,py+R+Math.max(80,s*.18),"#fff","center",Math.max(15,s*.038),700);}
      c.restore();}};

  /* 5 · Helikoptern: första flygningen */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(5,t,9.8,1.1,.15+.4*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#d9a07a"],[1,"#f0c6a4"]]);const gy=a.y+a.h*.8;surface(a,gy);
      const lift=Math.min(1,Math.max(0,(t-3.2)/1.4)),hy=gy-s*.06-lift*s*.22+Math.sin(t*2)*3,Ln=Math.min(a.w*.14,s*.24),u=Ln/100;
      c.fillStyle="#2a2f3c";c.fillRect(cx-18*u,hy,36*u,22*u);c.fillStyle="#d8dde6";c.fillRect(cx-14*u,hy+4*u,28*u,14*u);c.strokeStyle="#2a2f3c";c.lineWidth=Math.max(2,u*2);c.beginPath();c.moveTo(cx,hy);c.lineTo(cx,hy-12*u);c.stroke();
      const sp=Math.sin(t*50),rw=60*u*Math.abs(sp)+8*u;c.fillStyle="rgba(40,40,60,.7)";c.fillRect(cx-rw,hy-14*u,rw*2,3*u);c.fillRect(cx-rw*.7,hy-8*u,rw*1.4,3*u);
      c.strokeStyle="#2a2f3c";c.beginPath();c.moveTo(cx-14*u,hy+22*u);c.lineTo(cx-18*u,hy+34*u);c.moveTo(cx+14*u,hy+22*u);c.lineTo(cx+18*u,hy+34*u);c.stroke();
      tx("Ingenuity",cx+Ln*.9,hy+10*u,"#4a2a18","left",Math.max(15,s*.038),700);
      if(t>3.9){const q=eo((t-3.9)/1);c.globalAlpha=g*q;tx("första flygningen på en annan planet",cx,a.y+a.h*.12,"#4a2a18","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 6 · Radiosignaler: tid mellan jorden och Mars */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();space(a);
    const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy-s*.04,er=Math.max(16,s*.05);
    // jorden och Mars
    const g=c.createRadialGradient(lx-er*.3,y-er*.3,er*.1,lx,y,er);g.addColorStop(0,"#5ba7e8");g.addColorStop(1,"#12427d");c.fillStyle=g;c.beginPath();c.arc(lx,y,er,0,TAU);c.fill();tx("jorden",lx,y+er+Math.max(24,s*.055),"#9fd0ff","center",Math.max(13,s*.032),700);
    marsDisc(lx+w,y,er*.8,t);tx("Mars",lx+w,y+er+Math.max(24,s*.055),"#ffb890","center",Math.max(13,s*.032),700);
    c.strokeStyle="rgba(255,255,255,.3)";c.setLineDash([6,8]);c.lineWidth=2;c.beginPath();c.moveTo(lx+er,y);c.lineTo(lx+w-er*.8,y);c.stroke();c.setLineDash([]);
    const p=((t*.3)%1);c.fillStyle="#ffe27a";c.shadowColor="#ffd24a";c.shadowBlur=12;c.beginPath();c.arc(lerp(lx+er,lx+w-er*.8,p),y,7,0,TAU);c.fill();c.shadowBlur=0;
    tx("5 – 20 minuter",cx,y-Math.max(40,s*.09),"#ffd86b","center",Math.max(24,s*.07),700);
    if(t>6){const q=eo((t-6)/1),jx=cx,jy=y+Math.max(110,s*.24),r=Math.max(20,s*.05);c.save();c.globalAlpha=q;c.fillStyle="#c9ced8";c.beginPath();c.arc(jx,jy,r,0,TAU);c.fill();c.fillStyle="#10141f";c.fillRect(jx-r*.15,jy-r*1.6,r*.3,r*1.6);c.beginPath();c.arc(jx,jy-r*1.6,r*.4,0,TAU);c.fill();c.strokeStyle="#ff6b5e";c.lineWidth=Math.max(5,r*.3);c.lineCap="round";c.beginPath();c.moveTo(jx-r*1.6,jy-r*1.9);c.lineTo(jx+r*1.6,jy+r*.5);c.moveTo(jx+r*1.6,jy-r*1.9);c.lineTo(jx-r*1.6,jy+r*.5);c.stroke();tx("ingen joystick",jx,jy+r*1.7+Math.max(14,s*.03),"#ffb0a8","center",Math.max(15,s*.04),700);c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
