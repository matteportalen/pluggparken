/* Blåvalen: minilektionen som film (sex scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js (MPSvartHal.start med o.def). Röst: ../ljud/blaval/s<scen>-<replik>.mp3 (ElevenLabs, svensk kvinnoröst).
   Bilderna: bilder/blaval-1..6.jpg. MPBlavalFilm.start(host,{overlay,onClose}). Ljudmatta: havet (meta.mat). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/specialare/";}})();
const TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.3,cap:[[0.5,"Det största djuret som någonsin har levt simmar i havet. Det här är berättelsen om blåvalen."]]},
 {k:"01 · Jättestor",d:11.9,cap:[[0.8,"Blåvalen är större än alla dinosaurier som någonsin har funnits."],[5.9,"Den kan bli ungefär 30 meter lång, lika långt som tre bussar efter varandra."]]},
 {k:"02 · Tung",d:8.3,cap:[[0.8,"En stor blåval väger mer än 100 ton."],[4.2,"Bara tungan kan väga lika mycket som en elefant."]]},
 {k:"03 · Hjärtat",d:8.5,cap:[[0.8,"Hjärtat är jättestort och väger ungefär 180 kilo. Det är mer än en vuxen människa."]]},
 {k:"04 · Krill",d:10.4,cap:[[0.8,"Trots sin storlek äter blåvalen bara krill, små djur som liknar räkor."],[6.5,"En stor blåval äter flera ton krill varje dag."]]},
 {k:"05 · Sången",d:11.9,cap:[[0.8,"Blåvalen sjunger med djupa toner. Det är ett av de starkaste ljuden bland alla djur."],[7.6,"Sången kan höras många kilometer bort under vattnet."]]}
];
const META={mat:"havet",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Blåvalen",under:"En film i sex steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Blåvalen är jordens största djur. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: AWeith · CC BY-SA 4.0 · Wikimedia Commons",2:"Foto: Conty · Public domain · Wikimedia Commons",3:"Foto: NOAA Fisheries · Public domain · Wikimedia Commons",4:"Foto: James St. John · CC BY 2.0 · Wikimedia Commons",5:"Foto: Jamie Hall (krill) · Public domain · Wikimedia Commons",6:"Foto: National Marine Sanctuaries (en knölval, släkting) · Public domain"};
const IMG={};function img(n){const u=ROOT+"bilder/blaval-"+n+".jpg";if(!IMG[u]){const i=new Image();i.src=u;IMG[u]=i;}return IMG[u];}
[1,2,3,4,5,6].forEach(img);
const ok=i=>i&&i.complete&&i.naturalWidth;
const srand=s=>()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};

window.MPBlavalFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"blaval",scenes:E=>scenes(E)}}));
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
  /* djuphavsbakgrund med ljusstrålar */
  const deep=(a,t,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;const g=c.createLinearGradient(0,a.y,0,a.y+a.h);g.addColorStop(0,"#0d3b63");g.addColorStop(.55,"#07233f");g.addColorStop(1,"#020b18");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);
    c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalCompositeOperation="lighter";
    for(let i=0;i<4;i++){const bx=a.x+a.w*(.15+.23*i)+Math.sin(t*.25+i)*a.w*.03,w=a.w*.06;const lg=c.createLinearGradient(0,a.y,0,a.y+a.h*.8);lg.addColorStop(0,"rgba(120,190,255,.16)");lg.addColorStop(1,"rgba(120,190,255,0)");c.fillStyle=lg;c.beginPath();c.moveTo(bx-w*.3,a.y);c.lineTo(bx+w*.3,a.y);c.lineTo(bx+w*1.6,a.y+a.h*.8);c.lineTo(bx-w*1.6,a.y+a.h*.8);c.closePath();c.fill();}
    c.restore();};

  /* ---- blåval, sedd från sidan, tittar åt höger. L = längd ---- */
  const whale=(cx,cy,L,t,o)=>{const c=x(),u=L/100;o=o||{};c.save();c.globalAlpha=o.al==null?1:o.al;
    const bob=Math.sin(t*1.1)*u*.8,fl=Math.sin(t*1.5)*u*2.4;cy+=bob;
    const g=c.createLinearGradient(0,cy-12*u,0,cy+10*u);g.addColorStop(0,o.top||"#4f7798");g.addColorStop(.6,o.mid||"#6f95b4");g.addColorStop(1,o.bot||"#b5cfe0");
    c.fillStyle=g;c.beginPath();c.moveTo(cx+50*u,cy+1*u);
    c.bezierCurveTo(cx+38*u,cy-9*u,cx+10*u,cy-12*u,cx-20*u,cy-6*u);
    c.bezierCurveTo(cx-34*u,cy-3*u,cx-42*u,cy-1.5*u+fl*.3,cx-47*u,cy-1*u+fl*.5);
    c.lineTo(cx-47*u,cy+1*u+fl*.5);
    c.bezierCurveTo(cx-40*u,cy+2*u,cx-30*u,cy+5*u,cx-18*u,cy+5.5*u);
    c.bezierCurveTo(cx+10*u,cy+11*u,cx+38*u,cy+10*u,cx+50*u,cy+1*u);c.closePath();c.fill();
    // stjärtfena
    c.fillStyle=o.top||"#4f7798";c.beginPath();c.moveTo(cx-47*u,cy+fl*.5);c.lineTo(cx-57*u,cy-9*u+fl);c.lineTo(cx-53*u,cy+fl*.5);c.lineTo(cx-57*u,cy+9*u+fl);c.closePath();c.fill();
    // bröstfena
    c.fillStyle=o.mid||"#6f95b4";c.beginPath();c.moveTo(cx+14*u,cy+6*u);c.lineTo(cx+2*u,cy+17*u);c.lineTo(cx+8*u,cy+7*u);c.closePath();c.fill();
    // strupfåror
    c.strokeStyle="rgba(255,255,255,.18)";c.lineWidth=Math.max(1,u*.3);for(let i=0;i<7;i++){c.beginPath();c.moveTo(cx+38*u-i*5*u,cy+4.5*u);c.lineTo(cx+36*u-i*5*u,cy+9*u);c.stroke();}
    // öga
    c.fillStyle="#10202e";c.beginPath();c.arc(cx+37*u,cy+1.6*u,Math.max(1.5,u*.9),0,TAU);c.fill();
    c.restore();};
  const bus=(bx,by,bw,bh,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.fillStyle="#f2b707";c.fillRect(bx,by,bw,bh);c.fillStyle="rgba(0,0,0,.55)";for(let j=0;j<5;j++)c.fillRect(bx+bw*.07+j*bw*.18,by+bh*.18,bw*.12,bh*.32);c.fillStyle="#222";c.beginPath();c.arc(bx+bw*.2,by+bh,bh*.14,0,TAU);c.arc(bx+bw*.8,by+bh,bh*.14,0,TAU);c.fill();c.restore();};
  const elephant=(cx,gy,L,col,al)=>{const c=x(),u=L/100;c.save();c.globalAlpha=al==null?1:al;c.fillStyle=col;c.strokeStyle=col;c.lineCap="round";c.lineJoin="round";
    c.beginPath();c.ellipse(cx-6*u,gy-34*u,34*u,20*u,0,0,TAU);c.fill();
    c.lineWidth=9*u;[[-28],[-12],[8],[24]].forEach(([a])=>{c.beginPath();c.moveTo(cx+a*u,gy-24*u);c.lineTo(cx+a*u,gy);c.stroke();});
    c.beginPath();c.arc(cx+34*u,gy-44*u,14*u,0,TAU);c.fill();
    c.lineWidth=7*u;c.beginPath();c.moveTo(cx+44*u,gy-40*u);c.quadraticCurveTo(cx+54*u,gy-24*u,cx+46*u,gy-10*u);c.stroke();
    c.beginPath();c.ellipse(cx+26*u,gy-44*u,9*u,13*u,.2,0,TAU);c.fillStyle="rgba(0,0,0,.18)";c.fill();
    c.restore();};
  const heart=(cx,cy,r,col,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.fillStyle=col;c.beginPath();c.moveTo(cx,cy+r*.9);c.bezierCurveTo(cx-r*1.7,cy-r*.1,cx-r*.9,cy-r*1.2,cx,cy-r*.45);c.bezierCurveTo(cx+r*.9,cy-r*1.2,cx+r*1.7,cy-r*.1,cx,cy+r*.9);c.fill();
    c.fillStyle="rgba(255,255,255,.2)";c.beginPath();c.ellipse(cx-r*.45,cy-r*.35,r*.2,r*.12,-.6,0,TAU);c.fill();c.restore();};
  const person=(px,gy,h,col,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.fillStyle=col;c.beginPath();c.arc(px,gy-h*.88,h*.1,0,TAU);c.fill();c.fillRect(px-h*.09,gy-h*.78,h*.18,h*.4);c.fillRect(px-h*.09,gy-h*.38,h*.07,h*.38);c.fillRect(px+h*.02,gy-h*.38,h*.07,h*.38);c.fillRect(px-h*.2,gy-h*.76,h*.1,h*.32);c.fillRect(px+h*.1,gy-h*.76,h*.1,h*.32);c.restore();};

  /* 0 · Inledning */
  const s0=(t)=>{const{s,cx,cy,a}=S();photo(1,t,7.3,1.12,.3);const f=eo((t-.8)/2),c=x();c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="#fff";c.font=`700 ${Math.round(Math.min(a.w*.1,s*.2))}px "Source Serif 4",Georgia,serif`;c.shadowColor="rgba(0,0,0,.7)";c.shadowBlur=18;c.fillText("BLÅVALEN",cx,cy+s*.05);c.shadowBlur=0;
    tx("JORDENS STÖRSTA DJUR",cx,cy+s*.05+Math.max(26,s*.07),"#8fd4ff","center",Math.max(13,s*.03),700);c.restore();cred(1,.55*f);};

  /* 1 · Storlek: foto, sedan val mot tre bussar */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-5.2)/1.2);photo(2,t,11.9,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t);
      const w=Math.min(a.w*.88,s*1.7),lx=cx-w/2,L=w*.98,wy=cy-s*.06;
      const k=eo((t-5.6)/1.4);whale(cx,wy,L,t,{al:k});
      // måttlinje 30 m
      const k2=eo((t-6.6)/1.2);c.globalAlpha=g*k2;c.strokeStyle="#ffd86b";c.lineWidth=2;const my=wy+L*.17,x0=cx-L*.5,x1=cx+L*.5;
      c.beginPath();c.moveTo(x0,my);c.lineTo(lerp(x0,x1,k2),my);c.stroke();[x0,lerp(x0,x1,k2)].forEach(px=>{c.beginPath();c.moveTo(px,my-6);c.lineTo(px,my+6);c.stroke();});
      tx("ca 30 meter",cx,my+Math.max(20,s*.045),"#ffd86b","center",Math.max(14,s*.034),700);
      // tre bussar under
      const bw=L/3-6,bh=Math.max(14,bw*.2),by=my+Math.max(46,s*.12);
      for(let i=0;i<3;i++){bus(x0+3+i*(bw+6),by,bw,bh,cl((t-8-i*.6)/.6,0,1));}
      if(t>8)tx("3 bussar",cx,by+bh+Math.max(24,s*.056),"#ffe08a","center",Math.max(14,s*.034),700);
      c.restore();}};

  /* 2 · Vikt: foto, sedan 100 rutor (ton) och en elefant */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1);photo(3,t,8.3,1.1,.1+.55*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t);
      const cell=Math.max(10,Math.min(a.w*.5/10,a.h*.36/10,28)),gx=cx-(port?cell*5:cell*8),gy=a.y+a.h*.2;
      const n=Math.floor(100*cl((t-3.1)/1.8,0,1));
      for(let i=0;i<100;i++){const px=gx+(i%10)*cell,py=gy+Math.floor(i/10)*cell;c.fillStyle=i<n?"#6fb0e0":"rgba(255,255,255,.08)";c.fillRect(px+1,py+1,cell-2,cell-2);}
      if(port){tx(n+" ton",cx,gy-12,"#8fd4ff","center",Math.max(22,s*.07),700);}
      else{tx(n+" ton",gx+cell*10+14,gy+cell*3,"#8fd4ff","left",Math.max(22,s*.07),700);
        tx("över 100 ton",gx+cell*10+14,gy+cell*3+Math.max(24,s*.05),"#cfe8ff","left",Math.max(13,s*.03),700);}
      if(t>4.2){const q=eo((t-4.2)/1);c.globalAlpha=g*q;const L=Math.min(a.w*.26,s*.3),ey=gy+cell*10+L*.62+12;
        elephant(cx-(port?L*.5:L*.2),ey,L,"#9aa4b0",1);
        tx("Tungan väger lika mycket som en elefant",cx,ey+Math.max(28,s*.065),"#ffd86b","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 3 · Hjärtat: foto, sedan hjärta mot människa */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.2);photo(4,t,8.5,1.1,.1+.55*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t);
      const gy=cy+s*.22,R=Math.min(s*.2,a.w*.15),beat=1+.07*Math.pow(Math.max(0,Math.sin(t*4.2)),3);
      const hx=cx-Math.min(a.w*.18,s*.34),hy=gy-R*1.1;
      heart(hx,hy,R*beat,"#d84a56",eo((t-3.6)/1));
      tx("Blåvalens hjärta",hx,gy+Math.max(24,s*.058),"#ff9aa4","center",Math.max(14,s*.034),700);
      tx("ca 180 kg",hx,gy+Math.max(24,s*.058)+Math.max(22,s*.05),"#fff","center",Math.max(16,s*.04),700);
      const px=cx+Math.min(a.w*.2,s*.36),ph=Math.min(s*.32,a.h*.3),k=eo((t-4.8)/1);
      person(px,gy,ph,"#e8eef7",k);
      if(k>.3){c.globalAlpha=g*k;tx("Vuxen människa",px,gy+Math.max(24,s*.058),"#e8eef7","center",Math.max(14,s*.034),700);tx("mindre",px,gy+Math.max(24,s*.058)+Math.max(22,s*.05),"#9be3b0","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 4 · Krill: foto, sedan val som äter ett moln av krill */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-4.6)/1.2);photo(5,t,10.4,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t);
      const L=Math.min(a.w*.5,s*.9),wx=a.x+a.w*.3,wy=cy-s*.02,u=L/100,mx=wx+50*u;
      whale(wx,wy,L,t,{});
      // krill: många små djur som driver åt vänster in i munnen
      const rnd=srand(11),n=140;c.fillStyle="#ff9a6b";c.strokeStyle="#ff9a6b";c.lineWidth=1.2;
      for(let i=0;i<n;i++){const r1=rnd(),r2=rnd(),r3=rnd();const sp=24+r3*28,ph=(t*sp+r1*a.w)%(a.w*.75),px=a.x+a.w-ph*1.0,py=wy+(r2-.5)*a.h*.5+Math.sin(t*2+i)*3;
        if(px<mx+4)continue;const q=cl((t-5.4)/1,0,1);c.globalAlpha=g*q*.9;c.beginPath();c.ellipse(px,py,3.5,1.4,Math.sin(t+i)*.3,0,TAU);c.fill();c.beginPath();c.moveTo(px+3,py);c.lineTo(px+6,py+Math.sin(t*6+i)*1.5);c.stroke();}
      c.globalAlpha=g;
      if(t>6.5){const q=eo((t-6.5)/1);c.globalAlpha=g*q;tx("Flera ton krill varje dag",cx,a.y+a.h*.14,"#ffd0b0","center",Math.max(16,s*.04),700);}
      tx("Krill",a.x+a.w*.86,cy+a.h*.3,"#ff9a6b","center",Math.max(14,s*.034),700);
      c.restore();}};

  /* 5 · Sången: ljudvågor som sprider sig, många kilometer */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-5.2)/1.2);photo(6,t,11.9,1.1,.1+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t);
      const L=Math.min(a.w*.32,s*.6),wx=a.x+a.w*.22,wy=cy-s*.02,u=L/100,hx=wx+36*u,hy=wy+1*u;
      whale(wx,wy,L,t,{});
      c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();
      for(let i=0;i<6;i++){const ph=((t*.55)-i/6)%1,rr=(ph<0?ph+1:ph)*a.w*.8;c.strokeStyle=`rgba(143,212,255,${.5*(1-rr/(a.w*.8))})`;c.lineWidth=2.2;c.beginPath();c.arc(hx,hy,rr,-Math.PI*.38,Math.PI*.38);c.stroke();}
      c.restore();
      // ljudkurva, lång och djup
      c.strokeStyle="rgba(255,216,107,.85)";c.lineWidth=2.5;c.beginPath();const wy2=a.y+a.h*.82;for(let px=a.x+a.w*.08;px<=a.x+a.w*.92;px+=4){const k=(px-a.x)/a.w,amp=(1-k)*a.h*.05;const yy=wy2+Math.sin(px*.03-t*5)*amp;if(px===a.x+a.w*.08)c.moveTo(px,yy);else c.lineTo(px,yy);}c.stroke();
      tx("Djupa toner",a.x+a.w*.08,wy2-a.h*.07,"#ffd86b","left",Math.max(14,s*.034),700);
      // avstånd
      if(t>7.6){const q=eo((t-7.6)/1.2),y=a.y+a.h*.2,x0=hx+10,x1=a.x+a.w*.94;c.globalAlpha=g*q;c.strokeStyle="#fff";c.setLineDash([8,6]);c.lineWidth=2;c.beginPath();c.moveTo(x0,y);c.lineTo(lerp(x0,x1,q),y);c.stroke();c.setLineDash([]);
        tx("många kilometer",(x0+x1)/2,y-12,"#fff","center",Math.max(15,s*.038),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5];
}
})();
