/* Rymdstationen ISS: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/iss/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/iss-1..6.jpg. MPIssFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.9,cap:[[0.5,"Högt över våra huvuden flyger ett hem i rymden. Det här är berättelsen om rymdstationen ISS."]]},
 {k:"01 · Ett hem i rymden",d:8.1,cap:[[0.8,"Den internationella rymdstationen, ISS, är både en bostad och ett laboratorium i rymden."]]},
 {k:"02 · 90 minuter",d:8.7,cap:[[0.8,"Den flyger ungefär 400 kilometer över jorden."],[4.5,"Den åker ett varv runt jorden på cirka 90 minuter."]]},
 {k:"03 · Soluppgångar",d:6.4,cap:[[0.8,"Därför ser astronauterna ungefär 16 soluppgångar och solnedgångar varje dygn."]]},
 {k:"04 · Stor som en fotbollsplan",d:6.3,cap:[[0.8,"Stationen är ungefär lika stor som en fotbollsplan och väger över 400 ton."]]},
 {k:"05 · Allt svävar",d:8.8,cap:[[0.8,"På ISS svävar allt."],[3.0,"Astronauterna tränar två timmar varje dag för att musklerna inte ska bli svaga."]]},
 {k:"06 · Sedan år 2000",d:5.5,cap:[[0.8,"Människor har bott på stationen utan avbrott sedan år 2000."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Rymdstationen ISS",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Just nu flyger stationen runt jorden, igen och igen. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: NASA (STS-134) · Public domain · Wikimedia Commons",2:"Foto: NASA (ISS-56) · Public domain · Wikimedia Commons",3:"Foto: ESA/Alexander Gerst · CC BY-SA 2.0 · Wikimedia Commons",4:"Foto: NASA · Public domain · Wikimedia Commons",5:"Foto: NASA Johnson Space Center · Public domain · Wikimedia Commons",6:"Foto: NASA Johnson Space Center · Public domain · Wikimedia Commons"};

window.MPIssFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"iss",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"iss-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,space,man,title}=L;
  /* rymdstationen sedd framifrån: stomme, moduler och solpaneler. W = bredd */
  const iss=(cx,cy,W,al)=>{const c=x(),u=W/100;c.save();c.globalAlpha=al==null?1:al;
    c.fillStyle="#9aa3b2";c.fillRect(cx-46*u,cy-1.2*u,92*u,2.4*u);                                   // stomme
    [[-40],[-26],[26],[40]].forEach(([dx])=>{const px=cx+dx*u;c.fillStyle="#1d3f7a";c.fillRect(px-5*u,cy-26*u,10*u,22*u);c.fillRect(px-5*u,cy+4*u,10*u,22*u);
      c.strokeStyle="rgba(150,190,255,.45)";c.lineWidth=Math.max(1,.3*u);for(let i=1;i<4;i++){c.beginPath();c.moveTo(px-5*u,cy-26*u+i*5.5*u);c.lineTo(px+5*u,cy-26*u+i*5.5*u);c.moveTo(px-5*u,cy+4*u+i*5.5*u);c.lineTo(px+5*u,cy+4*u+i*5.5*u);c.stroke();}
      c.strokeStyle="rgba(150,190,255,.45)";c.beginPath();c.moveTo(px,cy-26*u);c.lineTo(px,cy-4*u);c.moveTo(px,cy+4*u);c.lineTo(px,cy+26*u);c.stroke();});
    c.fillStyle="#e7ebf2";[[-12,18,5],[-4,22,5.4],[7,16,5]].forEach(([dx,w,h])=>{c.fillRect(cx+dx*u-w*u/2,cy-h*u/2,w*u,h*u);});c.fillStyle="#c5ccd8";c.fillRect(cx-5*u,cy-9*u,10*u,18*u);
    c.fillStyle="#d8a64a";c.fillRect(cx+14*u,cy-4*u,8*u,8*u);c.restore();};

  const s0=(t)=>{photo(1,t,7.9,1.12,.25);const f=title(t,"ISS","ETT HEM I RYMDEN","#cfe8ff");cred(1,.55*f);};

  /* 1 · Ett hem: foto, sedan stationen med två ord */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(5,t,8.1,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const W=Math.min(a.w*.9,s*1.7);iss(cx,cy-s*.04,W,1);
      if(t>4.2){const q=eo((t-4.2)/1),pw=Math.max(110,s*.26);L.x();c.globalAlpha=g*q;
        [["bostad",cx-W*.26,"#9be3b0"],["laboratorium",cx+W*.26,"#7fd6ff"]].forEach(([n,px,col])=>{const py=cy-s*.04+W*.3;c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.moveTo(px,py-W*.16);c.lineTo(px,py-12);c.stroke();tx(n,px,py,col,"center",Math.max(16,s*.042),700);});}
      c.restore();}};

  /* 2 · 90 minuter: foto, sedan stationen i bana runt jorden */
  const earth=(px,py,r)=>{const c=x();c.save();const g=c.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,"#5ba7e8");g.addColorStop(1,"#12427d");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();
    c.beginPath();c.arc(px,py,r,0,TAU);c.clip();c.fillStyle="rgba(86,170,96,.85)";[[-.35,-.15,.4,.28],[.3,.2,.3,.4],[.05,-.5,.22,.15]].forEach(([dx,dy,rx,ry])=>{c.beginPath();c.ellipse(px+dx*r,py+dy*r,rx*r,ry*r,.5,0,TAU);c.fill();});c.restore();};
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,8.7,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const R=Math.min(a.w*.26,a.h*.26),er=R*.5,py=cy-s*.02;
      c.strokeStyle="rgba(255,255,255,.22)";c.setLineDash([5,7]);c.lineWidth=1.5;c.beginPath();c.arc(cx,py,R,0,TAU);c.stroke();c.setLineDash([]);
      earth(cx,py,er);
      const an=t<4.5?-1.2:-1.2+((t-4.5)/3.6)*TAU;c.fillStyle="#fff";c.beginPath();c.arc(cx+Math.cos(an)*R,py+Math.sin(an)*R,Math.max(5,s*.014),0,TAU);c.fill();
      c.strokeStyle="#ffd86b";c.lineWidth=2;c.beginPath();c.moveTo(cx+er,py);c.lineTo(cx+R,py);c.stroke();tx("400 km",cx+(er+R)/2,py-10,"#ffd86b","center",Math.max(13,s*.032),700);
      if(t>4.6){const q=eo((t-4.6)/1);c.globalAlpha=g*q;tx("1 varv ≈ 90 minuter",cx,a.y+a.h*.1,"#fff","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 3 · Soluppgångar: 16 sol-markeringar på ett dygn */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,6.4,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.84,s*1.6),lx=cx-w/2,y=cy-s*.02,bh=Math.max(26,s*.07),n=Math.min(16,Math.floor((t-3)/.18)+1);
      c.fillStyle="rgba(255,255,255,.1)";c.fillRect(lx,y,w,bh);tx("ett dygn (24 timmar)",cx,y+bh+Math.max(30,s*.07),"rgba(255,255,255,.75)","center",Math.max(13,s*.032),700);
      for(let i=0;i<16;i++){if(i>=n)break;const px=lx+(i+.5)*w/16;c.fillStyle="#ffd86b";c.beginPath();c.arc(px,y+bh/2,Math.max(5,bh*.3),0,TAU);c.fill();c.strokeStyle="#ffd86b";c.lineWidth=2;for(let k=0;k<8;k++){const an=k*TAU/8,r1=bh*.4,r2=bh*.55;c.beginPath();c.moveTo(px+Math.cos(an)*r1,y+bh/2+Math.sin(an)*r1);c.lineTo(px+Math.cos(an)*r2,y+bh/2+Math.sin(an)*r2);c.stroke();}}
      tx(Math.max(0,Math.min(16,n))+" soluppgångar",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(24,s*.07),700);
      c.restore();}};

  /* 4 · Stor som en fotbollsplan */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,6.3,1.1,.1+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const pw=Math.min(a.w*.8,s*1.5),ph=pw*68/105,px=cx-pw/2,py=cy-ph/2-s*.04;
      c.fillStyle="#2f7a3d";c.fillRect(px,py,pw,ph);c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=2;c.strokeRect(px,py,pw,ph);c.beginPath();c.moveTo(cx,py);c.lineTo(cx,py+ph);c.stroke();c.beginPath();c.arc(cx,cy-s*.04,ph*.14,0,TAU);c.stroke();c.strokeRect(px,py+ph*.28,pw*.16,ph*.44);c.strokeRect(px+pw*.84,py+ph*.28,pw*.16,ph*.44);
      const k=eo((t-3.2)/1);iss(cx,cy-s*.04,pw*1.04,k*.9);
      tx("ungefär en fotbollsplan",cx,py+ph+Math.max(30,s*.07),"#9be3b0","center",Math.max(15,s*.04),700);
      if(t>4.4){const q=eo((t-4.4)/1);c.globalAlpha=g*q;tx("över 400 ton",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(22,s*.06),700);}
      c.restore();}};

  /* 5 · Allt svävar */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(6,t,8.8,1.1,.1+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const fl=(ph,ax,ay)=>[Math.sin(t*.9+ph)*ax,Math.cos(t*.7+ph*1.3)*ay];
      const bx=cx-Math.min(a.w*.22,s*.4);let [dx,dy]=fl(0,10,12);man(bx+dx,cy-s*.1+dy,Math.max(50,s*.15),"#e8eef7",t,true);
      [[1,"#ffd86b",.9],[2,"#ff8a6a",1.3],[3,"#9be3b0",1.7]].forEach(([ph,col,sz],i)=>{[dx,dy]=fl(ph*1.7,16,16);const ox=cx+(i-.2)*Math.min(a.w*.12,s*.2),oy=cy-s*.12+dy;c.save();c.translate(ox+dx,oy);c.rotate(Math.sin(t*.8+ph)*.8);c.fillStyle=col;if(i===0)c.fillRect(-14*sz,-2,28*sz,4);else{c.beginPath();c.arc(0,0,9*sz,0,TAU);c.fill();}c.restore();});
      tx("allt svävar",cx,a.y+a.h*.12,"#fff","center",Math.max(20,s*.055),700);
      if(t>3.2){const q=eo((t-3.2)/1),w=Math.min(a.w*.7,s*1.2),y=cy+s*.2,bh=Math.max(20,s*.05);c.globalAlpha=g*q;c.fillStyle="rgba(255,255,255,.1)";c.fillRect(cx-w/2,y,w,bh);c.fillStyle="#7ec8ff";c.fillRect(cx-w/2,y,w*2/24,bh);tx("2 timmar träning varje dag",cx,y+bh+Math.max(28,s*.065),"#cfe8ff","center",Math.max(14,s*.036),700);}
      c.restore();}};

  /* 6 · Sedan år 2000 */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();space(a);
    const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy-s*.02,bh=Math.max(26,s*.07),px=yr=>lx+(yr-1995)/35*w;
    [[2000,"2000"],[2010,"2010"],[2020,"2020"],[2026,"i dag"]].forEach(([yr,l])=>{c.strokeStyle="rgba(255,255,255,.3)";c.lineWidth=1.5;c.beginPath();c.moveTo(px(yr),y-8);c.lineTo(px(yr),y+bh+8);c.stroke();tx(l,px(yr),y+bh+Math.max(30,s*.065),"rgba(255,255,255,.8)","center",Math.max(12,s*.03),600);});
    c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y,w,bh);const k=eo((t-1.2)/3);c.fillStyle="#7ec8ff";c.fillRect(px(2000),y,(px(2026)-px(2000))*k,bh);
    if(k>.9)tx("utan avbrott",(px(2000)+px(2026))/2,y+bh*.68,"#06121f","center",Math.max(15,s*.04),700);
    tx("Människor bor ombord",cx,a.y+a.h*.16,"#ffd86b","center",Math.max(20,s*.055),700);};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
