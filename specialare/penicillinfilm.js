/* Penicillinet: minilektionen som film (åtta scener, ca 1,6 minuter), bilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/penicillin/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/penicillin-1..6.jpg. MPPenicillinFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.2,cap:[[0.5,"En bortglömd skål som räddade miljontals liv. Det här är berättelsen om penicillinet."]]},
 {k:"01 · En bortglömd skål",d:11.2,cap:[[0.8,"År 1928 kom forskaren Alexander Fleming tillbaka från semestern till sitt labb i London. Han hade glömt en skål med bakterier."]]},
 {k:"02 · Mögel som dödar",d:6.8,cap:[[0.8,"I skålen hade det växt mögel. Runt mögelfläcken var alla bakterier döda."]]},
 {k:"03 · Penicillium",d:9.4,cap:[[0.8,"Mögel av den här sorten heter Penicillium. Det gör ett ämne som dödar bakterier. Fleming kallade ämnet penicillin."]]},
 {k:"04 · Över tio år",d:12.2,cap:[[0.8,"Det tog över tio år innan Howard Florey och Ernst Chain lyckades göra penicillinet till en riktig medicin."],[7.9,"Det var svårt att få fram tillräckligt mycket av ämnet."]]},
 {k:"05 · Under kriget",d:12.8,cap:[[0.8,"Under andra världskriget tillverkades penicillin i stor skala. Till invasionen i Normandie år 1944 räckte det till alla sårade soldater."]]},
 {k:"06 · Räddade liv",d:9.8,cap:[[0.8,"Före penicillin kunde ett litet sår eller en lunginflammation vara livsfarligt. Nu kunde läkare bota bakterieinfektioner."]]},
 {k:"07 · Nobelpris och varning",d:19.1,cap:[[0.8,"Fleming, Florey och Chain fick Nobelpriset år 1945."],[6.0,"Men penicillin dödar bara bakterier, inte virus. Fleming varnade själv för att bakterier kan bli motståndskraftiga."],[15.0,"Därför ska man aldrig ta antibiotika i onödan."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Penicillinet",under:"En film i åtta steg · ca 1,6 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"En bortglömd skål förändrade medicinen. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Ministry of Information Photo Division (Alexander Fleming i labbet) · Public domain · Wikimedia Commons",2:"Foto: Dr Mary Gillham Archive Project (Penicillium notatum) · CC BY 2.0 · Wikimedia Commons",3:"Foto: Louis Bontemps (Penicillium notatum) · CC BY 4.0 · Wikimedia Commons",4:"Porträtt: Howard Florey i Oxford · CC BY 4.0 · Wikimedia Commons",5:"Foto: Agatefilm (St Marys sjukhus och Flemings labb) · CC BY-SA 4.0 · Wikimedia Commons",6:"Foto: Osama Shukir Muhammed Amin (Nobelmedalj för Fleming, 1945) · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPPenicillinFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"penicillin",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"penicillin-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};
  /* petriskål: glaskant, agar med ljus och reflex */
  const dish=(px,py,r)=>{const c=x();c.save();gl(px,py,r*1.5,"rgba(255,220,140,.18)");const g=c.createRadialGradient(px-r*.2,py-r*.25,r*.1,px,py,r);g.addColorStop(0,"#f6dc9a");g.addColorStop(1,"#c89a48");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.strokeStyle="rgba(220,240,255,.8)";c.lineWidth=Math.max(4,r*.07);c.beginPath();c.arc(px,py,r*1.03,0,TAU);c.stroke();c.strokeStyle="rgba(255,255,255,.55)";c.lineWidth=Math.max(2,r*.03);c.beginPath();c.arc(px,py,r*.9,Math.PI*1.05,Math.PI*1.4);c.stroke();c.restore();};
  /* bakterier som små stavar; dör (bleknar) inom clearR kring clearAt */
  const bact=(px,py,r,seed,clearAt,clearR,t)=>{const c=x(),rr=L.srand(seed||3);c.save();for(let i=0;i<260;i++){const an=rr()*TAU,d=Math.sqrt(rr())*r*.92,bx=px+Math.cos(an)*d,by=py+Math.sin(an)*d,rot=rr()*TAU;let al=1;if(clearAt){const dd=Math.hypot(bx-clearAt[0],by-clearAt[1]);if(dd<clearR)continue;if(dd<clearR*1.25)al=(dd-clearR)/(clearR*.25);}
    c.save();c.translate(bx,by);c.rotate(rot);c.globalAlpha*=al;c.fillStyle="#7a4a1a";const L2=Math.max(3,r*.045),W=Math.max(1.6,r*.017);c.beginPath();c.ellipse(0,0,L2,W,0,0,TAU);c.fill();c.fillStyle="rgba(255,190,90,.7)";c.beginPath();c.ellipse(-L2*.2,-W*.2,L2*.6,W*.45,0,0,TAU);c.fill();c.restore();}c.restore();};
  const mould=(px,py,r,t)=>{const c=x();c.save();gl(px,py,r*1.8,"rgba(120,255,170,.3)");for(let i=0;i<18;i++){const an=i*TAU/18,rr=r*(.7+.3*Math.sin(i*2.3+t));c.fillStyle=i%2?"#4f9a72":"#3f8a62";c.beginPath();c.arc(px+Math.cos(an)*rr*.5,py+Math.sin(an)*rr*.5,r*.42,0,TAU);c.fill();}const rg=c.createRadialGradient(px,py,0,px,py,r*.5);rg.addColorStop(0,"#e8f8e8");rg.addColorStop(1,"#7fc79a");c.fillStyle=rg;c.beginPath();c.arc(px,py,r*.45,0,TAU);c.fill();const R=L.srand(8);for(let i=0;i<40;i++){const an=R()*TAU,d=R()*r*.9;c.fillStyle="rgba(210,255,225,.55)";c.beginPath();c.arc(px+Math.cos(an)*d,py+Math.sin(an)*d,Math.max(1.5,r*.03),0,TAU);c.fill();}c.restore();};
  const rod=(px,py,r,rot,col)=>{const c=x();c.save();c.translate(px,py);c.rotate(rot);gl(0,0,r*2,"rgba(255,170,80,.25)");c.fillStyle=col||"#d99a4a";c.beginPath();c.roundRect?c.roundRect(-r*1.1,-r*.45,r*2.2,r*.9,r*.45):c.rect(-r*1.1,-r*.45,r*2.2,r*.9);c.fill();c.fillStyle="rgba(255,240,200,.5)";c.fillRect(-r*.8,-r*.28,r*1.2,r*.16);c.restore();};
  const virus=(px,py,r,col)=>{const c=x();c.save();gl(px,py,r*2.4,"rgba(255,90,110,.25)");c.strokeStyle=col||"#ff6a7e";c.lineWidth=Math.max(2,r*.1);for(let i=0;i<14;i++){const an=i*TAU/14;c.beginPath();c.moveTo(px+Math.cos(an)*r*.9,py+Math.sin(an)*r*.9);c.lineTo(px+Math.cos(an)*r*1.4,py+Math.sin(an)*r*1.4);c.stroke();c.fillStyle=col||"#ff6a7e";c.beginPath();c.arc(px+Math.cos(an)*r*1.45,py+Math.sin(an)*r*1.45,r*.12,0,TAU);c.fill();}const g=c.createRadialGradient(px-r*.3,py-r*.3,0,px,py,r);g.addColorStop(0,"#ffb0b8");g.addColorStop(1,col||"#e04a62");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};

  const s0=(t)=>{photo(1,t,7.2,1.12,.3);const f=title(t,"PENICILLINET","EN BORTGLÖMD SKÅL","#b8ffcf");cred(1,.55*f);};

  /* 1 · skålen i labbet efter semestern */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,11.2,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d1626"],[1,"#1a2740"]]);const r=Math.max(50,Math.min(a.w*.14,a.h*.26,s*.24));
      tx("London · 1928",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(22,s*.06),700);dish(cx,cy+s*.02,r);c.save();c.globalAlpha=g*(.35+.65*eo((t-3)/2.5));bact(cx,cy+s*.02,r,3);c.restore();
      if(t>5.5){const q=eo((t-5.5)/1);c.globalAlpha=g*q;const sx=cx-r*2.2,sy=cy-r*.4;dot(sx,sy,r*.35,"#ffd23c");c.strokeStyle="#ffd23c";c.lineWidth=4;for(let i=0;i<8;i++){const an=i*TAU/8;c.beginPath();c.moveTo(sx+Math.cos(an)*r*.5,sy+Math.sin(an)*r*.5);c.lineTo(sx+Math.cos(an)*r*.75,sy+Math.sin(an)*r*.75);c.stroke();}tx("semester",sx,sy+r*1.1,"#ffd86b","center",Math.max(14,s*.037),700);}
      if(t>7.5){c.globalAlpha=g*eo((t-7.5)/1);tx("en glömd skål med bakterier",cx,cy+r*1.6,"#cfd8ff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 2 · mögel, runt det döda bakterier */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,6.8,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d1626"],[1,"#1a2740"]]);const r=Math.max(60,Math.min(a.w*.16,a.h*.28,s*.28)),px=cx,py=cy,mx=px+r*.15,my=py-r*.1,k=eo((t-3)/1.6);
      dish(px,py,r);bact(px,py,r,3,[mx,my],r*(.05+.5*k));mould(mx,my,r*.22*(.4+.6*k),t);
      if(t>4.8){c.globalAlpha=g*eo((t-4.8)/1);c.strokeStyle="#d93030";c.lineWidth=3;c.setLineDash([6,6]);c.beginPath();c.arc(mx,my,r*.5,0,TAU);c.stroke();c.setLineDash([]);tx("inga bakterier här",px,py+r*1.3,"#cfd8ff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 3 · Penicillium gör ett ämne */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,9.4,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const r=Math.max(40,Math.min(a.w*.1,a.h*.2,s*.18)),lx=cx-a.w*.22,rx=cx+a.w*.22;
      mould(lx,cy,r,t);tx("Penicillium",lx,cy+r*1.8,"#b8ffcf","center",Math.max(17,s*.045),700);
      if(t>4.5){const k=eo((t-4.5)/1.2);c.globalAlpha=g*k;c.strokeStyle="#fff";c.lineWidth=4;c.beginPath();c.moveTo(lx+r*1.5,cy);c.lineTo(rx-r*1.5,cy);c.stroke();c.beginPath();c.moveTo(rx-r*1.5,cy);c.lineTo(rx-r*1.75,cy-r*.2);c.moveTo(rx-r*1.5,cy);c.lineTo(rx-r*1.75,cy+r*.2);c.stroke();
        const bonds=[[0,0],[1,0],[1,1],[0,1]];const mr=r*.9,pts=[[-1,-1],[1,-1],[1,1],[-1,1]].map(p=>[rx+p[0]*mr*.5,cy+p[1]*mr*.5-r*.1]);gl(rx,cy,r*2,"rgba(255,216,107,.25)");c.strokeStyle="#ffe9a8";c.lineWidth=5;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.stroke();const lab=["N","C","C","C"],col2=["#9fd0ff","#ffd86b","#ffd86b","#ffd86b"];pts.forEach((p,i)=>{gl(p[0],p[1],r*.5,i?"rgba(255,216,107,.5)":"rgba(159,208,255,.6)");dot(p[0],p[1],r*.2,col2[i]);});const pO=[rx+mr*.5+r*.9,cy-mr*.5-r*.1-r*.4];c.beginPath();c.moveTo(pts[1][0],pts[1][1]);c.lineTo(pO[0],pO[1]);c.stroke();gl(pO[0],pO[1],r*.5,"rgba(255,90,80,.6)");dot(pO[0],pO[1],r*.2,"#ff7a6a");c.beginPath();c.moveTo(pts[0][0],pts[0][1]);c.lineTo(rx-mr*.5-r*.8,cy+r*.6);c.stroke();dot(rx-mr*.5-r*.8,cy+r*.6,r*.17,"#cfd8ff");
        tx("penicillin",rx,cy+r*1.8,"#ffd86b","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 4 · tidslinje: över tio år, lite ämne */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,12.2,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy-s*.05,px=yr=>lx+(yr-1928)/(1945-1928)*w;
      c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=3;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();
      const k=eo((t-3)/3.4);c.strokeStyle="#ffd86b";c.lineWidth=6;c.beginPath();c.moveTo(px(1928),y);c.lineTo(lerp(px(1928),px(1940),k),y);c.stroke();dot(px(1928),y,8,"#9fd0ff");tx("1928",px(1928),y+Math.max(30,s*.07),"#9fd0ff","center",Math.max(14,s*.037),700);
      if(k>.9){dot(px(1940),y,8,"#9be3b0");tx("1940-talet",px(1940),y+Math.max(30,s*.07),"#9be3b0","center",Math.max(14,s*.037),700);tx("över 10 år",(px(1928)+px(1940))/2,y-Math.max(20,s*.045),"#ffd86b","center",Math.max(18,s*.05),700);}
      if(t>7.9){const q=eo((t-7.9)/1),r=Math.max(12,s*.03);c.globalAlpha=g*q;const vy=a.y+a.h*.74;for(let i=0;i<5;i++){c.fillStyle="rgba(255,255,255,.7)";c.fillRect(cx-r*7+i*r*3,vy,r*2,r*2.2);c.fillStyle="#9be3b0";c.fillRect(cx-r*7+i*r*3,vy+r*2.1,r*2,r*.1);}tx("bara små mängder åt gången",cx,vy+r*4.2,"#cfd8ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 5 · tillverkning i stor skala fram till 1944 */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,12.8,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);const w=Math.min(a.w*.7,s*1.25),h=Math.min(a.h*.4,s*.5),lx=cx-w/2,y0=cy+h*.45;
      c.strokeStyle="rgba(255,255,255,.5)";c.lineWidth=2;c.beginPath();c.moveTo(lx,y0-h);c.lineTo(lx,y0);c.lineTo(lx+w,y0);c.stroke();
      const yrs=[1941,1942,1943,1944],vals=[.03,.12,.5,1];yrs.forEach((yr,i)=>{const q=eo((t-3.2-i*1.3)/1);if(q<=0)return;const bw=w/(yrs.length*1.6);const bx=lx+w*.08+i*(bw*1.55);c.fillStyle=i===3?"#9be3b0":"#9fd0ff";c.fillRect(bx,y0-h*vals[i]*q,bw,h*vals[i]*q);tx(String(yr),bx+bw/2,y0+Math.max(24,s*.055),"#fff","center",Math.max(13,s*.034),700);});
      tx("penicillin per år (ungefärlig utveckling)",cx,a.y+a.h*.1,"#cfd8ff","center",Math.max(14,s*.037),600);
      if(t>9){c.globalAlpha=g*eo((t-9)/1);tx("Normandie 1944: räckte till alla sårade",cx,a.y+a.h*.9,"#ffd86b","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 6 · före och efter */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,9.8,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d1626"],[1,"#1a2740"]]);const r=Math.max(40,Math.min(a.w*.1,a.h*.2,s*.18)),lx=cx-a.w*.22,rx=cx+a.w*.22;
      const wound=(px,py,rr,bacteria)=>{c.fillStyle="#f0c8a8";c.fillRect(px-rr*1.4,py-rr*.7,rr*2.8,rr*1.4);c.strokeStyle="#d93030";c.lineWidth=5;c.beginPath();c.moveTo(px-rr*.6,py);c.lineTo(px+rr*.6,py);c.stroke();if(bacteria){const q=L.srand(5);c.fillStyle="#c9893a";for(let i=0;i<30;i++){c.beginPath();c.arc(px+(q()-.5)*rr*2.6,py+(q()-.5)*rr*1.4,Math.max(2,rr*.06),0,TAU);c.fill();}}};
      wound(lx,cy,r,true);tx("före",lx,cy+r*1.4,"#d1383a","center",Math.max(20,s*.055),700);tx("farligt",lx,cy+r*1.4+Math.max(30,s*.065),"#cfd8ff","center",Math.max(14,s*.037),700);
      if(t>5){const q=eo((t-5)/1);c.globalAlpha=g*q;wound(rx,cy,r,false);c.strokeStyle="#3aa86a";c.lineWidth=6;c.beginPath();c.moveTo(rx-r*.5,cy-r*1.2);c.lineTo(rx-r*.1,cy-r*.9);c.lineTo(rx+r*.6,cy-r*1.6);c.stroke();tx("efter",rx,cy+r*1.4,"#2a8a50","center",Math.max(20,s*.055),700);tx("läkarna kan bota",rx,cy+r*1.4+Math.max(30,s*.065),"#cfd8ff","center",Math.max(14,s*.037),700);}
      c.restore();}};

  /* 7 · Nobelpris, bara bakterier, aldrig i onödan */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(6,t,19.1,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const r=Math.max(18,s*.045);
      if(t<6){for(let i=0;i<3;i++){const px=cx+(i-1)*r*4;c.fillStyle="#d9a84a";c.beginPath();c.arc(px,cy,r*1.2,0,TAU);c.fill();tx("★",px,cy+r*.5,"#8a5a10","center",r*1.3,700);}tx("Nobelpriset 1945",cx,cy+r*3,"#ffd86b","center",Math.max(22,s*.06),700);tx("Fleming · Florey · Chain",cx,cy+r*3+Math.max(36,s*.08),"#cfd8ff","center",Math.max(15,s*.04),600);}
      else if(t<15){const bx=cx-a.w*.2,vx=cx+a.w*.2;c.globalAlpha=g*eo((t-6)/.8);for(let i=0;i<5;i++)rod(bx+(i-2)*r*.9,cy+Math.sin(t*2+i)*r*.15,r*.55,i*.7+t*.2);tx("bakterier",bx,cy+r*1.6,"#fff","center",Math.max(15,s*.04),700);c.strokeStyle="#3aa86a";c.lineWidth=6;c.beginPath();c.moveTo(bx-r*1.4,cy-r*1.6);c.lineTo(bx-r*.8,cy-r*1.1);c.lineTo(bx+r*.2,cy-r*2.1);c.stroke();
        if(t>8.5){c.globalAlpha=g*eo((t-8.5)/.8);virus(vx,cy,r*.75);tx("virus",vx,cy+r*1.8,"#fff","center",Math.max(15,s*.04),700);c.strokeStyle="#ff6a5e";c.lineWidth=7;c.beginPath();c.moveTo(vx-r*1.4,cy-r*1.8);c.lineTo(vx+r*1.4,cy-r*.6);c.moveTo(vx+r*1.4,cy-r*1.8);c.lineTo(vx-r*1.4,cy-r*.6);c.stroke();}
        if(t>10.8){c.globalAlpha=g*eo((t-10.8)/1);tx("bakterier kan bli motståndskraftiga",cx,a.y+a.h*.88,"#ffd86b","center",Math.max(16,s*.042),700);}}
      else{const q=eo((t-15)/1);c.globalAlpha=g*q;c.fillStyle="#e8ecf4";c.beginPath();c.roundRect?c.roundRect(cx-r*1.4,cy-r*.6,r*2.8,r*1.2,r*.6):c.rect(cx-r*1.4,cy-r*.6,r*2.8,r*1.2);c.fill();c.fillStyle="#d1583a";c.fillRect(cx,cy-r*.6,r*1.4,r*1.2);c.strokeStyle="#ff6a5e";c.lineWidth=8;c.beginPath();c.moveTo(cx-r*2.2,cy-r*1.5);c.lineTo(cx+r*2.2,cy+r*1.5);c.stroke();tx("inte i onödan",cx,cy+r*3,"#ffd86b","center",Math.max(22,s*.06),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
