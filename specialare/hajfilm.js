/* Hajar: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js (MPSvartHal.start med o.def). Röst: ../ljud/hajar/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/hajar-*.jpg. MPHajFilm.start(host,{overlay,onClose}). Ljudmatta: havet (meta.mat). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/specialare/";}})();
const TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:8.1,cap:[[0.5,"Hajar har simmat i haven längre än nästan alla andra djur. Det här är berättelsen om hajarna."]]},
 {k:"01 · Urgamla",d:8.7,cap:[[0.8,"Hajar har funnits i över 400 miljoner år."],[4.7,"De är äldre än både dinosaurierna och träden."]]},
 {k:"02 · Små och stora",d:15,cap:[[0.8,"Det finns över 500 olika hajarter, från små dvärghajar till jättelika valhajar."],[7.2,"Valhajen är världens största fisk, upp till 12 meter lång. Den äter plankton och är ofarlig för människor."]]},
 {k:"03 · Brosk",d:9.5,cap:[[0.8,"Hajar saknar riktiga ben. Skelettet är gjort av brosk, samma material som i din näsa och dina öron."]]},
 {k:"04 · Tänder",d:7,cap:[[0.8,"En haj byter tänder hela livet. Vissa arter kan få tusentals tänder under sitt liv."]]},
 {k:"05 · Ungar",d:16.2,cap:[[0.8,"Många hajar lägger ägg i en hård kapsel. Hornhajens ägg ser ut som en spiralformad skruv."],[7.5,"Men de flesta hajar föder levande ungar, till exempel hammarhajen. Ungarna föds som små kopior av de vuxna."]]},
 {k:"06 · Hotade",d:9.3,cap:[[0.8,"Hajar har fått ett dåligt rykte. Men människor dödar många fler hajar än tvärtom, och många arter är hotade."]]}
];
const META={mat:"havet",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Hajar",under:"En film i sju steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Hajar är viktiga för havet. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={fossil:"Foto: James St. John · CC BY 2.0 · Wikimedia Commons",1:"Foto: Bernard Dupont · CC BY-SA 2.0 · Wikimedia Commons",3:"Foto: Zac Wolf · CC BY-SA 2.5 · Wikimedia Commons",4:"Foto: James St. John · CC BY 2.0 · Wikimedia Commons",egg:"Foto: devra from los osos · CC BY 2.0 · Wikimedia Commons",hammare:"Foto: Ryo Sato · CC BY-SA 2.0 · Wikimedia Commons",6:"Foto: Marko Dimitrijevic · CC BY-SA 2.0 · Wikimedia Commons"};
const IMG={};function img(n){const u=ROOT+"bilder/hajar-"+n+".jpg";if(!IMG[u]){const i=new Image();i.src=u;IMG[u]=i;}return IMG[u];}
["fossil",1,3,4,"egg","hammare",6].forEach(img);
const ok=i=>i&&i.complete&&i.naturalWidth;

window.MPHajFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"hajar",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {A,eo,cl,lerp,font}=E;
  const x=()=>E.x;
  const tx=(t,px,py,col,al,sz,w)=>{const c=x();c.font=font(w||600,sz||12);c.fillStyle=col||"rgba(255,255,255,.88)";c.textAlign=al||"left";c.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#7fd6ff",al,11,700);
  const S=()=>{const a=A();return{a,s:Math.min(a.w,a.h),cx:a.x+a.w/2,cy:a.y+a.h/2,port:E.W<E.H*.9};};
  const cred=(n,a)=>{const c=x();c.save();c.globalAlpha=a==null?.6:a;c.fillStyle="#fff";c.font=font(600,11);c.textAlign="right";c.fillText(KR[n],E.W-Math.max(14,E.W*.03),E.H-Math.max(96,E.H*.13));c.restore();};
  const photo=(n,t,dur,zoom,dim)=>{const c=x(),a=A(),im=img(n);if(!ok(im))return;const k=cl(t/Math.max(1,dur),0,1),z=lerp(1,zoom||1.12,k);
    const sc=Math.max(a.w/im.naturalWidth,a.h/im.naturalHeight)*z,iw=im.naturalWidth*sc,ih=im.naturalHeight*sc,ir=im.naturalWidth/im.naturalHeight;
    c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=eo(t/1.6);
    if(ir<a.w/a.h*.85){const sb=Math.max(a.w/im.naturalWidth,a.h/im.naturalHeight)*1.15;try{c.filter="blur(22px)";}catch(e){}c.globalAlpha*=.55;c.drawImage(im,a.x+a.w/2-im.naturalWidth*sb/2,a.y+a.h/2-im.naturalHeight*sb/2,im.naturalWidth*sb,im.naturalHeight*sb);c.filter="none";c.globalAlpha=eo(t/1.6);const hh=a.h*.9*(1+(z-1)*.35),ww=hh*ir;c.shadowColor="rgba(0,0,0,.6)";c.shadowBlur=30;c.drawImage(im,a.x+a.w/2-ww/2,a.y+a.h/2-hh/2,ww,hh);c.shadowBlur=0;}
    else c.drawImage(im,a.x+a.w/2-iw/2,a.y+a.h/2-ih/2,iw,ih);
    c.fillStyle=`rgba(2,4,12,${dim||0})`;c.fillRect(a.x,a.y,a.w,a.h);
    const g=c.createRadialGradient(a.x+a.w/2,a.y+a.h/2,Math.min(a.w,a.h)*.3,a.x+a.w/2,a.y+a.h/2,Math.max(a.w,a.h)*.62);g.addColorStop(0,"rgba(2,3,10,0)");g.addColorStop(1,"rgba(2,3,10,.82)");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};
  const deep=(a,t,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;const g=c.createLinearGradient(0,a.y,0,a.y+a.h);g.addColorStop(0,"#0d3b63");g.addColorStop(.55,"#07233f");g.addColorStop(1,"#020b18");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);
    c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalCompositeOperation="lighter";
    for(let i=0;i<4;i++){const bx=a.x+a.w*(.15+.23*i)+Math.sin(t*.25+i)*a.w*.03,w=a.w*.06;const lg=c.createLinearGradient(0,a.y,0,a.y+a.h*.8);lg.addColorStop(0,"rgba(120,190,255,.16)");lg.addColorStop(1,"rgba(120,190,255,0)");c.fillStyle=lg;c.beginPath();c.moveTo(bx-w*.3,a.y);c.lineTo(bx+w*.3,a.y);c.lineTo(bx+w*1.6,a.y+a.h*.8);c.lineTo(bx-w*1.6,a.y+a.h*.8);c.closePath();c.fill();}
    c.restore();};
  const bus=(bx,by,bw,bh,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.fillStyle="#f2b707";c.fillRect(bx,by,bw,bh);c.fillStyle="rgba(0,0,0,.55)";for(let j=0;j<5;j++)c.fillRect(bx+bw*.07+j*bw*.18,by+bh*.18,bw*.12,bh*.32);c.fillStyle="#222";c.beginPath();c.arc(bx+bw*.2,by+bh,bh*.14,0,TAU);c.arc(bx+bw*.8,by+bh,bh*.14,0,TAU);c.fill();c.restore();};

  /* ---- haj, sedd från sidan, tittar åt höger. L = längd ---- */
  const shark=(cx,cy,L,t,o)=>{const c=x(),u=L/100;o=o||{};c.save();c.globalAlpha=o.al==null?1:o.al;c.lineJoin="round";
    const sw=Math.sin(t*2.2+(o.ph||0))*u*1.6;cy+=Math.sin(t*1.1+(o.ph||0))*u*.5;
    const g=c.createLinearGradient(0,cy-9*u,0,cy+8*u);g.addColorStop(0,o.top||"#5b7184");g.addColorStop(.55,o.mid||"#7c93a6");g.addColorStop(1,o.bot||"#dfe8ee");
    c.fillStyle=g;c.beginPath();c.moveTo(cx+50*u,cy+1*u);
    c.bezierCurveTo(cx+36*u,cy-6*u,cx+12*u,cy-9*u,cx-14*u,cy-6*u);
    c.bezierCurveTo(cx-30*u,cy-4*u,cx-38*u,cy-2*u+sw*.4,cx-46*u,cy-1*u+sw);
    c.lineTo(cx-46*u,cy+1*u+sw);
    c.bezierCurveTo(cx-36*u,cy+3*u,cx-24*u,cy+6*u,cx-10*u,cy+6.5*u);
    c.bezierCurveTo(cx+14*u,cy+8*u,cx+38*u,cy+6*u,cx+50*u,cy+1*u);c.closePath();c.fill();
    // stjärtfena (övre flik större)
    c.fillStyle=o.top||"#5b7184";c.beginPath();c.moveTo(cx-45*u,cy-0.5*u+sw);c.lineTo(cx-60*u,cy-16*u+sw*1.6);c.lineTo(cx-53*u,cy-1*u+sw);c.lineTo(cx-57*u,cy+8*u+sw*1.6);c.closePath();c.fill();
    // ryggfena
    c.beginPath();c.moveTo(cx+8*u,cy-8.5*u);c.lineTo(cx-4*u,cy-20*u);c.lineTo(cx-8*u,cy-6.5*u);c.closePath();c.fill();
    // bröstfena
    c.fillStyle=o.mid||"#7c93a6";c.beginPath();c.moveTo(cx+18*u,cy+5*u);c.lineTo(cx+3*u,cy+16*u);c.lineTo(cx+8*u,cy+5.5*u);c.closePath();c.fill();
    if(o.hammer){c.fillStyle=o.top||"#5b7184";c.beginPath();c.ellipse(cx+46*u,cy+1*u,2.6*u,9*u,0,0,TAU);c.fill();}
    if(o.spots){c.fillStyle="rgba(255,255,255,.55)";for(let i=0;i<22;i++){const sx=cx-30*u+(i%11)*5.5*u,sy=cy-4*u+Math.floor(i/11)*3.6*u+((i*7)%3)*.8*u;c.beginPath();c.arc(sx,sy,Math.max(1,u*.55),0,TAU);c.fill();}}
    // gälspringor, öga
    c.strokeStyle="rgba(0,0,0,.25)";c.lineWidth=Math.max(1,u*.35);for(let i=0;i<4;i++){c.beginPath();c.moveTo(cx+22*u-i*2.6*u,cy-3*u);c.lineTo(cx+21*u-i*2.6*u,cy+3.5*u);c.stroke();}
    c.fillStyle="#0c1620";c.beginPath();c.arc(cx+(o.hammer?45:40)*u,cy-1.5*u,Math.max(1.4,u*.8),0,TAU);c.fill();
    c.restore();};

  /* 0 · Inledning */
  const s0=(t)=>{const{s,cx,cy,a}=S();photo(1,t,8.1,1.12,.35);const f=eo((t-.8)/2),c=x();c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="#fff";c.font=`700 ${Math.round(Math.min(a.w*.12,s*.22))}px "Source Serif 4",Georgia,serif`;c.shadowColor="rgba(0,0,0,.7)";c.shadowBlur=18;c.fillText("HAJARNA",cx,cy+s*.05);c.shadowBlur=0;
    tx("HAVETS URGAMLA DJUR",cx,cy+s*.05+Math.max(26,s*.07),"#8fd4ff","center",Math.max(13,s*.03),700);c.restore();cred(1,.55*f);};

  /* 1 · Äldre än dinosaurierna: fossil, sedan tidslinje */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.2);photo("fossil",t,8.7,1.1,.15+.5*g);cred("fossil",.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t);
      const w=Math.min(a.w*.84,s*1.6),lx=cx-w/2,px=my=>lx+(1-my/450)*w,bh=Math.max(20,s*.055),y0=a.y+a.h*.24,gap=Math.max(42,s*.11);
      tg("Miljoner år sedan",cx,a.y+a.h*.1,"#7fd6ff","center");
      [[400,"400"],[300,"300"],[200,"200"],[100,"100"],[0,"i dag"]].forEach(([m,l])=>{c.strokeStyle="rgba(255,255,255,.2)";c.lineWidth=1;c.beginPath();c.moveTo(px(m),y0-12);c.lineTo(px(m),y0+gap*2+bh+14);c.stroke();tx(l,px(m),y0+gap*2+bh+34,"rgba(255,255,255,.7)","center",Math.max(12,s*.028),600);});
      const bars=[["Hajar",450,0,"#6fb0e0",3.6],["Träd",385,0,"#7fcf8a",5.6],["Dinosaurier",230,66,"#e8a05a",6.6]];
      bars.forEach(([n,from,to,col,st],i)=>{const k=eo((t-st)/1.4);if(k<=0)return;const by=y0+i*gap;c.fillStyle=col;const x0=px(from),x1=px(to);c.fillRect(x0,by,(x1-x0)*k,bh);tx(n,x0,by-8,col,"left",Math.max(13,s*.032),700);});
      if(t>4.8)tx("över 400 miljoner år",px(0),y0-8,"#cfe8ff","right",Math.max(13,s*.03),700);
      c.restore();}};

  /* 2 · Små och stora: valhajsfoto, sedan storleksjämförelse */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-4.4)/1.2);photo(3,t,15,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t);
      const w=Math.min(a.w*.9,s*1.7),L=w*.82,wy=cy-s*.1;
      // dvärghaj
      const k1=eo((t-5.2)/1);shark(cx-L*.34,wy+L*.04-s*.18,Math.max(26,s*.07),t,{al:k1,ph:1});if(k1>.3){c.globalAlpha=g*k1;tx("dvärghaj",cx-L*.34,wy+L*.04-s*.18+Math.max(26,s*.06),"#9be3b0","center",Math.max(13,s*.03),700);}
      // valhaj
      c.globalAlpha=g;const k2=eo((t-6.2)/1.2);shark(cx,wy+L*.09,L,t,{al:k2,spots:true,top:"#4a6679",mid:"#6b8aa0"});
      if(k2>.5){c.globalAlpha=g*k2;tx("valhaj",cx+L*.28,wy-L*.02,"#8fd4ff","center",Math.max(14,s*.034),700);}
      // buss, 12 m
      if(t>9){const q=eo((t-9)/1),bw=L*.98,bh=Math.max(16,bw*.12),by=wy+L*.09+L*.16,bx=cx-bw/2;bus(bx,by,bw,bh,q);c.globalAlpha=g*q;tx("ca 12 meter · lika långt som en buss",cx,by+bh+Math.max(26,s*.058),"#ffd86b","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 3 · Brosk: skelett som böjer sig, näsa och öron */
  const ear=(px,py,r,col)=>{const c=x();c.save();c.strokeStyle=col;c.lineWidth=Math.max(3,r*.18);c.lineCap="round";c.beginPath();c.arc(px,py,r,Math.PI*.55,Math.PI*2.1);c.stroke();c.beginPath();c.arc(px+r*.05,py+r*.05,r*.55,Math.PI*.7,Math.PI*1.9);c.stroke();c.restore();};
  const nose=(px,py,r,col)=>{const c=x();c.save();c.strokeStyle=col;c.lineWidth=Math.max(3,r*.18);c.lineCap="round";c.lineJoin="round";c.beginPath();c.moveTo(px-r*.2,py-r);c.quadraticCurveTo(px+r*.2,py,px+r*.9,py+r*.6);c.quadraticCurveTo(px+r*.5,py+r*.95,px-r*.4,py+r*.7);c.stroke();c.restore();};
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();deep(a,t);
    tg("Brosk, inte ben",cx,a.y+a.h*.12,"#7fd6ff","center");
    const L=Math.min(a.w*.78,s*1.3),wy=cy-s*.08,k=eo((t-1)/1.2);shark(cx,wy,L,t,{al:.35+.3*k});
    // lysande, böjlig ryggrad av brosk
    c.save();c.globalAlpha=k;c.strokeStyle="#ffd86b";c.lineWidth=Math.max(3,L*.014);c.lineCap="round";c.shadowColor="#ffd86b";c.shadowBlur=10;c.beginPath();
    for(let i=0;i<=40;i++){const q=i/40,px=cx+L*.46-q*L*.92,py=wy-L*.01+Math.sin(q*5+t*2.2)*L*.012*(q+.2)+(q>.9?(q-.9)*L*.1:0);if(i===0)c.moveTo(px,py);else c.lineTo(px,py);}c.stroke();c.restore();
    if(t>3){const q=eo((t-3)/1);c.save();c.globalAlpha=q;const r=Math.min(s*.1,a.w*.08),y=wy+s*.32,dx=Math.min(a.w*.18,s*.3);
      nose(cx-dx,y,r,"#ffd0b0");tx("din näsa",cx-dx,y+r*1.7,"#ffd0b0","center",Math.max(13,s*.032),700);
      ear(cx+dx,y,r*.9,"#ffd0b0");tx("dina öron",cx+dx,y+r*1.7,"#ffd0b0","center",Math.max(13,s*.032),700);
      tx("brosk",cx,y-r*.1,"#ffd86b","center",Math.max(15,s*.038),700);c.restore();}};

  /* 4 · Tänder: megalodonkäke, sedan tänder som byts */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(4,t,7,1.1,.1+.55*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t);
      const w=Math.min(a.w*.84,s*1.5),lx=cx-w/2,y0=cy-s*.12,base=Math.max(30,s*.1);
      const gum=(y,flip)=>{c.fillStyle="#9c4a55";c.beginPath();c.roundRect?c.roundRect(lx-12,y-(flip?0:base*.45),w+24,base*.45,12):c.rect(lx-12,y-(flip?0:base*.45),w+24,base*.45);c.fill();};
      gum(y0,false);gum(y0+base*2.6,true);
      for(let row=0;row<2;row++){const up=row===1,yb=up?y0+base*2.6:y0;
        for(let i=0;i<10;i++){const ph=((i/10)+t*.16)%1,px=lx+ph*w,sz=base*lerp(.45,1,Math.min(1,ph*1.2)),fall=cl((ph-.84)/.16,0,1),al=1-fall;
          c.globalAlpha=g*al;c.fillStyle="#f4efe3";c.strokeStyle="rgba(0,0,0,.3)";c.lineWidth=1;c.beginPath();
          const dy=fall*sz*1.2*(up?-1:1),d=up?-1:1;c.moveTo(px-sz*.32,yb+dy);c.lineTo(px+sz*.32,yb+dy);c.lineTo(px,yb+dy+d*sz*1.25);c.closePath();c.fill();c.stroke();}}
      c.globalAlpha=g;tx("Nya tänder växer fram bakom de gamla",cx,y0+base*2.6+base*1.9,"#cfe8ff","center",Math.max(14,s*.034),700);
      if(t>4.4){const q=eo((t-4.4)/1);c.globalAlpha=g*q;tx("Tusentals tänder under ett liv",cx,a.y+a.h*.13,"#ffd86b","center",Math.max(16,s*.04),700);}
      c.restore();}};

  /* 5 · Ungar: hornhajens ägg, sedan hammarhajar och små kopior */
  const eggcase=(px,py,r,col,t)=>{const c=x();c.save();c.translate(px,py);c.rotate(-.5);c.fillStyle=col;c.strokeStyle="rgba(0,0,0,.35)";c.lineWidth=Math.max(1.5,r*.05);
    c.beginPath();c.ellipse(0,0,r*.55,r,0,0,TAU);c.fill();
    for(let i=0;i<5;i++){const yy=-r*.85+i*r*.4;c.beginPath();c.moveTo(-r*.55,yy+r*.2);c.quadraticCurveTo(0,yy-r*.1,r*.55,yy+r*.3);c.stroke();}
    c.restore();};
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    if(t<7.4){photo("egg",t,7.4,1.1,.15+.3*eo((t-2)/1));cred("egg",.55);
      if(t>2.2){const q=eo((t-2.2)/1.2);c.save();c.globalAlpha=q;const r=Math.min(s*.2,a.w*.15);c.fillStyle="rgba(6,10,22,.72)";c.fillRect(a.x,a.y+a.h*.58,a.w,a.h*.28);eggcase(cx-r*1.6,a.y+a.h*.72,r*.55,"#b48a52",t);tx("Hornhajens ägg",cx+r*.2,a.y+a.h*.72,"#ffe0a8","center",Math.max(15,s*.04),700);tx("en hård, spiralformad kapsel",cx+r*.2,a.y+a.h*.72+Math.max(24,s*.055),"#cfe8ff","center",Math.max(13,s*.03),600);c.restore();}}
    else{const g=eo((t-7.4)/1.2);photo("hammare",t-7.4,8.8,1.1,.15+.45*eo((t-10)/1));cred("hammare",.55*g);
      if(t>10.4){const q=eo((t-10.4)/1.1);c.save();c.globalAlpha=q;c.fillStyle="rgba(6,10,22,.72)";c.fillRect(a.x,a.y+a.h*.5,a.w,a.h*.38);
        const L=Math.min(a.w*.36,s*.62),yy=a.y+a.h*.67,sx=cx-Math.min(a.w*.22,s*.34),px2=cx+Math.min(a.w*.26,s*.4);
        shark(sx,yy,L,t,{hammer:true});shark(px2,yy+L*.04,L*.3,t,{hammer:true,ph:2});
        tx("vuxen",sx,yy+L*.28,"#8fd4ff","center",Math.max(13,s*.03),700);tx("unge · liten kopia",px2,yy+L*.28,"#9be3b0","center",Math.max(13,s*.03),700);c.restore();}}};

  /* 6 · Hotade */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();photo(6,t,9.3,1.1,.45);cred(6,.55);
    const f=eo((t-3.2)/1.2);if(f>0){c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="rgba(6,10,22,.7)";c.fillRect(a.x,cy-s*.12,a.w,s*.24);
      tx("Människor dödar många fler hajar än tvärtom",cx,cy-s*.02,"#fff","center",Math.max(16,s*.04),700);
      const f2=eo((t-5.2)/1.2);c.globalAlpha=f*f2;tx("Många arter är hotade",cx,cy+s*.07,"#ffb070","center",Math.max(18,s*.048),700);c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
