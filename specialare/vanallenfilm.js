/* Strålningsbältena: minilektionen som film (sju scener), NASA/ESA-bilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/vanallen/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/vanallen-1..6.jpg. MPVanAllenFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.8,cap:[[0.5,"Osynliga ringar av strålning runt jorden. Det här är berättelsen om Van Allen-bältena."]]},
 {k:"01 · Två ringar",d:7.2,cap:[[0.8,"Runt jorden finns två stora ringar av laddade partiklar. De kallas Van Allen-bältena."]]},
 {k:"02 · Upptäckten",d:10.4,cap:[[0.8,"De upptäcktes 1958 av den amerikanska satelliten Explorer 1."],[6.5,"De är uppkallade efter forskaren James Van Allen."]]},
 {k:"03 · Magnetfältet",d:6.6,cap:[[0.8,"Jordens magnetfält fångar partiklar från solen och håller dem kvar i bältena."]]},
 {k:"04 · Strålning",d:8.6,cap:[[0.8,"Strålningen kan skada satelliter och astronauter."],[4.5,"Rymdskepp som ska förbi åker igenom bältena snabbt."]]},
 {k:"05 · Skyddet",d:5.1,cap:[[0.8,"Samma magnetfält skyddar också oss mot solens partiklar."]]},
 {k:"06 · Hur stora?",d:8.9,cap:[[0.8,"Det inre bältet börjar ungefär 1 000 kilometer upp."],[4.5,"Det yttre når nästan 60 000 kilometer ut."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Strålningsbältena",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Osynliga ringar skyddar oss varje dag. Filmen bygger på bilder från NASA och ESA ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Bild: OpenStax · CC BY 4.0 · Wikimedia Commons",2:"Foto: NASA/JPL-Caltech (Explorer 1) · Public domain · Wikimedia Commons",3:"Bild: NASA Goddard · Public domain · Wikimedia Commons",4:"Foto: NASA (Apollo 8) · Public domain · Wikimedia Commons",5:"Bild: ESA · CC BY-SA 3.0 IGO · Wikimedia Commons",6:"Bild: NASA · Public domain · Wikimedia Commons"};

window.MPVanAllenFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"vanallen",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"vanallen-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const earth=(px,py,r)=>{const c=x();c.save();const g=c.createRadialGradient(px-r*.35,py-r*.35,r*.1,px,py,r);g.addColorStop(0,"#6fb4ff");g.addColorStop(.7,"#1d5fb8");g.addColorStop(1,"#0a2a66");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.fillStyle="rgba(80,170,90,.85)";[[-.3,-.1,.28,.2],[.25,.2,.22,.16],[.05,-.45,.16,.1]].forEach(([dx,dy,w,h])=>{c.beginPath();c.ellipse(px+dx*r,py+dy*r,w*r,h*r,.5,0,TAU);c.fill();});c.restore();};
  /* dipolens fältlinje: r = L·cos²(λ), runt jorden (px,py) med radie R */
  const fline=(px,py,R,Lr,side,al,col)=>{const c=x();c.save();c.strokeStyle=col||"rgba(150,190,255,.7)";c.globalAlpha=al;c.lineWidth=1.8;c.beginPath();const lam0=Math.acos(Math.sqrt(1/Lr));for(let i=0;i<=40;i++){const lam=-lam0+2*lam0*i/40,r=R*Lr*Math.cos(lam)**2;const X=px+side*Math.cos(lam)*r,Y=py-Math.sin(lam)*r;i?c.lineTo(X,Y):c.moveTo(X,Y);}c.stroke();c.restore();};
  const dotP=(X,Y,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(X,Y,r,0,TAU);c.fill();};

  const s0=(t)=>{photo(4,t,6.8,1.12,.3);const f=title(t,"STRÅLNINGSBÄLTEN","OSYNLIGA RINGAR RUNT JORDEN","#c9b6ff");cred(4,.55*f);};

  /* 1 · Två ringar (sidovy med två belten av prickar) */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,7.2,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const R=s*.1,k=eo((t-2.8)/2),r=L.srand(3);
      [[2.2,"#8fd0ff",320,"inre bältet"],[4.6,"#c9b6ff",420,"yttre bältet"]].forEach(([Lr,col,N,nm],bi)=>{for(let i=0;i<N*k;i++){const sd=i%2?1:-1,lam=(r()-.5)*1.6*(bi?.9:.7),rr=R*Lr*(1+(r()-.5)*.35)*Math.cos(lam)**.9;const X=cx+sd*Math.cos(lam)*rr*(1+bi*.05),Y=cy-Math.sin(lam)*rr*.9;dotP(X,Y,1.7,col);}
        if(t>3.6+bi*1.2){c.globalAlpha=g*eo((t-3.6-bi*1.2)/.8);tx(nm,Math.min(cx+R*Lr*1.25*(bi?1.15:1.05),a.x+a.w-s*.2),cy-R*Lr*(bi?.7:.55),col,"left",Math.max(13,s*.034),700);c.globalAlpha=g;}});
      earth(cx,cy,R);c.restore();}};

  /* 2 · Upptäckten: Explorer 1 */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,10.4,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const ex=cx,ey=cy-s*.02,len=Math.min(a.w*.5,s*.9),h=len*.12,rot=-.25;
      c.save();c.translate(ex,ey);c.rotate(rot+Math.sin(t*.6)*.03);c.fillStyle="#cfd5df";c.fillRect(-len/2,-h/2,len,h);c.fillStyle="#4a5060";c.fillRect(-len*.1,-h/2,len*.07,h);c.fillRect(len*.12,-h/2,len*.07,h);c.beginPath();c.moveTo(len/2,-h/2);c.lineTo(len/2+len*.12,0);c.lineTo(len/2,h/2);c.closePath();c.fillStyle="#9aa2b2";c.fill();
      c.strokeStyle="#cfd5df";c.lineWidth=3;c.beginPath();c.moveTo(-len/2,-h/2);c.lineTo(-len/2-len*.18,-h*1.6);c.moveTo(-len/2,h/2);c.lineTo(-len/2-len*.18,h*1.6);c.stroke();c.restore();
      for(let i=0;i<3;i++){const p=((t*.5+i/3)%1);c.strokeStyle=`rgba(143,208,255,${.6*(1-p)})`;c.lineWidth=2;c.beginPath();c.arc(ex,ey,len*.2+p*len*.7,0,TAU);c.stroke();}
      tx("Explorer 1",ex,ey-len*.38,"#ffd86b","center",Math.max(20,s*.055),700);
      if(t>3.2){c.globalAlpha=g*eo((t-3.2)/.8);tx("1958",ex,ey+len*.42,"#8fd0ff","center",Math.max(24,s*.07),700);}
      if(t>6.5){c.globalAlpha=g*eo((t-6.5)/.8);tx("James Van Allen",ex,ey+len*.42+Math.max(36,s*.08),"#c9b6ff","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 3 · Magnetfältet fångar partiklar */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2)/1.1);photo(3,t,6.6,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const R=s*.09,px=cx+a.w*.05;
      [2,3,4.4,6].forEach((Lr,i)=>{fline(px,cy,R,Lr,1,.7,"rgba(150,190,255,.7)");fline(px,cy,R,Lr,-1,.7,"rgba(150,190,255,.7)");});
      earth(px,cy,R);
      /* solpartiklar kommer från vänster, fångade pendlar längs fältlinjen */
      for(let i=0;i<26;i++){const ph=(t*.35+i*.137)%1,y=cy+((i*53)%100-50)/50*s*.34;if(i%3){const X=lerp(a.x,px-R*3.4,ph);dotP(X,y+Math.sin(ph*9+i)*4,3,"#ffd23c");}
        else{const Lr=i%2?3:4.4,lam0=Math.acos(Math.sqrt(1/Lr)),lam=Math.sin(t*1.6+i)*lam0*.92,rr=R*Lr*Math.cos(lam)**2,sd=i%2?1:-1;dotP(px+sd*Math.cos(lam)*rr,cy-Math.sin(lam)*rr,3.4,"#ff9a5a");}}
      tx("solens partiklar",a.x+a.w*.16,cy-s*.4,"#ffd86b","center",Math.max(13,s*.034),700);
      if(t>3.4){c.globalAlpha=g*eo((t-3.4)/.8);tx("fångas av magnetfältet",px,cy+s*.42,"#ff9a5a","center",Math.max(14,s*.037),700);}
      c.restore();}};

  /* 4 · Strålning: rymdskepp åker igenom bältet snabbt */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2)/1.1);photo(5,t,8.6,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const R=s*.09,r=L.srand(5);
      const band=(Lr,col,N)=>{for(let i=0;i<N;i++){const sd=i%2?1:-1,lam=(r()-.5)*1.4,rr=R*Lr*(1+(r()-.5)*.3)*Math.cos(lam)**.9;dotP(cx+sd*Math.cos(lam)*rr,cy-Math.sin(lam)*rr*.9,1.6,col);}};
      band(2.3,"rgba(143,208,255,.9)",260);earth(cx,cy,R);
      const sx=lerp(a.x+a.w*.02,a.x+a.w*.98,cl((t-2.6)/(t<4.5?5:2.2),0,1)),sy=cy-R*2.7;const fast=t>4.5;
      c.save();c.translate(sx,sy);c.fillStyle="#e8ecf4";c.fillRect(-14,-6,28,12);c.fillStyle="#4a7ad9";c.fillRect(-30,-3,14,6);c.fillRect(16,-3,14,6);c.restore();
      const inb=Math.abs(sx-cx)<R*3.4;if(inb){c.fillStyle="rgba(255,90,80,.85)";for(let i=0;i<6;i++){const an=t*8+i;dotP(sx+Math.cos(an)*18,sy+Math.sin(an)*14,2.5,"#ff6a5a");}}
      tx("satellit",sx,sy-26,"#fff","center",Math.max(12,s*.03),700);
      if(t<4.5)tx("☢ kan skada satelliter och astronauter",cx,a.y+a.h*.1,"#ff9a8a","center",Math.max(15,s*.04),700);
      else{c.globalAlpha=g*eo((t-4.5)/.8);tx("snabbt igenom = mindre strålning",cx,a.y+a.h*.1,"#9be3b0","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 5 · Skyddet: partiklarna böjer av runt magnetfältet */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-1.8)/1.1);photo(5,t,5.1,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const R=s*.08,px=cx+a.w*.12;
      c.strokeStyle="rgba(150,190,255,.55)";c.lineWidth=2.5;c.beginPath();c.ellipse(px+R*.6,cy,R*5.4,R*4.2,0,Math.PI*.5,Math.PI*1.5,true);c.stroke();
      earth(px,cy,R);
      for(let i=0;i<22;i++){const ph=(t*.3+i*.113)%1,y0=cy+((i*47)%100-50)/50*s*.36,X0=lerp(a.x,a.x+a.w,ph),dx=X0-(px-R*4.8);let Y=y0;if(Math.abs(y0-cy)<R*4.2&&dx>-R*.5){const k=cl(1-Math.abs(y0-cy)/(R*4.2),0,1);Y=y0+Math.sign(y0-cy||1)*k*R*2.2*cl(dx/(R*6),0,1);if(dx>0&&X0<px-R*4.6+ R*6*.0)Y=y0;}
        dotP(X0,Y,3,"#ffd23c");}
      tx("solens partiklar",a.x+a.w*.16,a.y+a.h*.12,"#ffd86b","center",Math.max(13,s*.034),700);
      if(t>3){c.globalAlpha=g*eo((t-3)/.8);tx("magnetfältet böjer av dem",cx,a.y+a.h*.9,"#9fd0ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 6 · Hur stora: avståndsaxel i km */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,8.9,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.84,s*1.6),lx=cx-w/2,y=cy,px=km=>lx+km/60000*w,bh=Math.max(20,s*.05);
      c.fillStyle="rgba(255,255,255,.1)";c.fillRect(lx,y,w,bh);
      const k1=eo((t-2.8)/1.2),k2=eo((t-5)/2);
      c.fillStyle="#8fd0ff";c.fillRect(px(1000),y,(px(6000)-px(1000))*k1,bh);
      c.fillStyle="#c9b6ff";c.fillRect(px(13000),y,(px(60000)-px(13000))*k2,bh);
      c.fillStyle="#2a73c8";c.beginPath();c.arc(lx,y+bh/2,bh*.9,0,TAU);c.fill();
      [0,10000,20000,30000,40000,50000,60000].forEach(km=>{c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=1.5;c.beginPath();c.moveTo(px(km),y+bh);c.lineTo(px(km),y+bh+8);c.stroke();tx(km?String(km/1000)+" 000":"0",px(km),y+bh+Math.max(24,s*.052),"rgba(255,255,255,.75)","center",Math.max(11,s*.027),600);});
      tx("km från jorden",cx,y+bh+Math.max(52,s*.11),"rgba(255,255,255,.6)","center",Math.max(12,s*.03),600);
      tx("inre bältet",px(3500),y-Math.max(16,s*.04),"#8fd0ff","center",Math.max(14,s*.036),700);
      if(t>3){c.globalAlpha=g*eo((t-3)/.8);tx("börjar ca 1 000 km upp",px(3500),y-Math.max(44,s*.1),"#cfe8ff","center",Math.max(12,s*.03),600);}
      if(t>5){c.globalAlpha=g*eo((t-5)/.8);tx("yttre bältet",px(36000),y-Math.max(16,s*.04),"#c9b6ff","center",Math.max(14,s*.036),700);c.globalAlpha=g*eo((t-6.5)/.8);tx("nästan 60 000 km ut",px(36000),y-Math.max(44,s*.1),"#e2d8ff","center",Math.max(12,s*.03),600);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
