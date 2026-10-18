/* Vasa: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och ritverktygen i filmlib.js. Röst: ../ljud/vasa/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/vasa-1..6.jpg. MPVasaFilm.start(host,{overlay,onClose}). Ljudmatta: vågor (meta.mat). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:9.1,cap:[[0.5,"Hon skulle bli det mäktigaste skeppet i kungens flotta, men hon sjönk redan på sin första resa. Det här är berättelsen om Vasa."]]},
 {k:"01 · Kungens skepp",d:9.6,cap:[[0.8,"Vasa var ett stort krigsskepp som kung Gustav II Adolf lät bygga."],[5.7,"Hon var rikt dekorerad med hundratals skulpturer."]]},
 {k:"02 · Jungfrufärden",d:10.9,cap:[[0.8,"Den 10 augusti 1628 seglade Vasa ut från Stockholm för första gången."],[7.1,"Tusentals människor stod på stranden och tittade."]]},
 {k:"03 · Vindpusten",d:11.1,cap:[[0.8,"Efter drygt en kilometer tog en vindpust tag i seglen."],[4.8,"Skeppet lutade, vatten kom in genom kanonportarna, och hon sjönk."]]},
 {k:"04 · På botten",d:8.8,cap:[[0.8,"Vasa låg kvar på botten i över 300 år."],[4.2,"I Östersjön finns nästan ingen skeppsmask, så träet höll."]]},
 {k:"05 · Upp igen",d:6.9,cap:[[0.8,"År 1961 lyftes skeppet upp. Det tog många år att bevara det."]]},
 {k:"06 · Museet",d:9.6,cap:[[0.8,"I dag står Vasa i ett eget museum i Stockholm. Det är det bäst bevarade skeppet från 1600-talet i världen."]]}
];
const META={mat:"vagor",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Vasa",under:"En film i sju steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Vasa sjönk för över 300 år sedan, och nu får alla se henne. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Jules Verne Times Two · CC BY-SA 4.0 · Wikimedia Commons",2:"Foto: Hugh Llewelyn · CC BY-SA 2.0 · Wikimedia Commons",3:"Foto: Hugh Llewelyn · CC BY-SA 2.0 · Wikimedia Commons",4:"Foto: Dwi sumaiyyah makmur · CC BY-SA 4.0 (undervattensarkeologi, illustrativt) · Wikimedia Commons",5:"Pressfoto 14 maj 1961 · Public domain · Wikimedia Commons",6:"Foto: John Samuel · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPVasaFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"vasa",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"vasa-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,grad,sea,man,title}=L;

  /* galjon sedd från sidan, bogen åt höger. o.tilt = lutning (rad), o.sculpt = glitter, o.ports = öppna kanonportar */
  const galleon=(cx,gy,Ln,t,o)=>{const c=x(),u=Ln/100;o=o||{};c.save();c.translate(cx,gy);c.rotate(o.tilt||0);c.translate(-cx,-gy);c.lineJoin="round";c.lineCap="round";
    // mastsegel
    const masts=[[-22,64,2],[4,72,3],[30,54,2]];
    c.strokeStyle="#5a3a1e";c.lineWidth=Math.max(2,1.6*u);masts.forEach(([mx,h])=>{c.beginPath();c.moveTo(cx+mx*u,gy-12*u);c.lineTo(cx+mx*u,gy-h*u);c.stroke();});
    masts.forEach(([mx,h,n])=>{for(let i=0;i<n;i++){const sy=gy-(h-3)*u+i*(h*.42)*u,sw=(i?26:20)*u,sh=h*.36*u;c.fillStyle="#efe6d2";c.beginPath();c.moveTo(cx+mx*u-sw/2,sy);c.quadraticCurveTo(cx+mx*u,sy+sh*.15,cx+mx*u+sw/2,sy);c.lineTo(cx+mx*u+sw/2*.92,sy+sh);c.quadraticCurveTo(cx+mx*u,sy+sh*1.1,cx+mx*u-sw/2*.92,sy+sh);c.closePath();c.fill();c.strokeStyle="rgba(90,60,30,.4)";c.lineWidth=1;c.stroke();}
      c.fillStyle="#2a6bb5";c.beginPath();c.moveTo(cx+mx*u,gy-h*u);c.lineTo(cx+mx*u+14*u,gy-(h-2)*u);c.lineTo(cx+mx*u,gy-(h-4)*u);c.fill();});
    // skrov
    c.fillStyle="#6b3f1c";c.beginPath();c.moveTo(cx-52*u,gy-30*u);c.lineTo(cx-52*u,gy-10*u);c.quadraticCurveTo(cx-44*u,gy+2*u,cx-24*u,gy+3*u);c.lineTo(cx+28*u,gy+3*u);c.quadraticCurveTo(cx+48*u,gy,cx+58*u,gy-16*u);c.lineTo(cx+50*u,gy-14*u);c.lineTo(cx+44*u,gy-12*u);c.lineTo(cx-30*u,gy-12*u);c.lineTo(cx-30*u,gy-30*u);c.closePath();c.fill();
    // akterkastell med guld
    c.fillStyle="#7a4a22";c.fillRect(cx-52*u,gy-34*u,22*u,22*u);c.strokeStyle="#e0b840";c.lineWidth=Math.max(1.5,1.3*u);c.strokeRect(cx-52*u,gy-34*u,22*u,22*u);
    // kanonportar
    for(let i=0;i<8;i++){const px=cx-24*u+i*7.4*u;c.fillStyle=o.ports?"#06121f":"#3b2210";c.fillRect(px,gy-9*u,3.6*u,3.6*u);}
    // gul list
    c.strokeStyle="#e0b840";c.lineWidth=Math.max(1.5,1.2*u);c.beginPath();c.moveTo(cx-30*u,gy-12*u);c.lineTo(cx+44*u,gy-12*u);c.stroke();
    if(o.sculpt){c.save();c.globalCompositeOperation="lighter";const r=MPFilmLib.srand(5);for(let i=0;i<26;i++){const px=cx-52*u+r()*108*u,py=gy-30*u+r()*24*u,k=.5+.5*Math.sin(t*4+i*1.7);const gr=c.createRadialGradient(px,py,0,px,py,3.5*u*k+1.5);gr.addColorStop(0,"rgba(255,215,100,.75)");gr.addColorStop(1,"rgba(255,200,80,0)");c.fillStyle=gr;c.beginPath();c.arc(px,py,3.5*u*k+1.5,0,TAU);c.fill();}c.restore();}
    c.restore();};

  /* 0 */
  const s0=(t)=>{photo(1,t,9.1,1.12,.3);const f=title(t,"VASA","KUNGENS KRIGSSKEPP");cred(1,.55*f);};

  /* 1 · Kungens skepp: foto, sedan galjon med glittrande skulpturer */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-5.3)/1.1);photo(2,t,9.6,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[.6,"#5a4a63"],[.72,"#d98a4a"],[.721,"#0e2540"],[1,"#061423"]]);
      const Ln=Math.min(a.w*.6,a.h*.8,s*1.2),gy=a.y+a.h*.7+Math.sin(t*1.4)*2;galleon(cx,gy,Ln,t,{sculpt:true});sea(a,gy,t,["rgba(16,46,86,.72)","rgba(10,34,68,.8)","rgba(6,22,48,.9)"],3);
      const q=eo((t-6.3)/1);c.globalAlpha=g*q;tx("hundratals skulpturer",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(16,s*.042),700);c.restore();}};

  /* 2 · Jungfrufärden */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,10.9,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#17284a"],[.6,"#7b6f8c"],[.72,"#e8a45a"],[.721,"#0e2540"],[1,"#061423"]]);
      const Ln=Math.min(a.w*.46,a.h*.7,s*1.0),gy=a.y+a.h*.7,p=cl((t-2.8)/7,0,1),px=lerp(a.x+a.w*.32,a.x+a.w*.62,p);
      galleon(px,gy+Math.sin(t*1.4)*2,Ln,t,{});sea(a,gy,t,["rgba(16,46,86,.72)","rgba(10,34,68,.8)","rgba(6,22,48,.9)"],3);
      // strand med folk
      c.fillStyle="#3a2c1a";c.beginPath();c.moveTo(a.x,a.y+a.h*.82);c.quadraticCurveTo(a.x+a.w*.12,a.y+a.h*.74,a.x+a.w*.24,a.y+a.h*.84);c.lineTo(a.x+a.w*.24,a.y+a.h);c.lineTo(a.x,a.y+a.h);c.closePath();c.fill();
      if(t>7.1){const q=eo((t-7.1)/1.4),r=MPFilmLib.srand(3),n=Math.round(26*q);for(let i=0;i<n;i++){man(a.x+a.w*.02+r()*a.w*.2,a.y+a.h*.84+r()*a.h*.06,Math.max(14,s*.05),"#d8c9a8",t+i,Math.sin(t*3+i)>.3);}}
      const k=eo((t-1.6)/1);c.globalAlpha=g*k;tx("10 augusti 1628",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(20,s*.055),700);
      c.restore();}};

  /* 3 · Vindpusten: seglar, lutar, vatten in, sjunker */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    grad(a,[[0,"#243a5e"],[.6,"#6b6f88"],[.72,"#b7a78f"],[.721,"#0e2540"],[1,"#061423"]]);
    const Ln=Math.min(a.w*.5,a.h*.72,s*1.1),gy0=a.y+a.h*.68;
    const lean=eo((t-4.6)/2.6),sink=eo((t-7.2)/3.6)*.75,tilt=lean*.42,gy=gy0+sink*a.h*.26+Math.sin(t*1.4)*(2-lean*1.5);
    const sx=cx-a.w*.05;
    galleon(sx,gy,Ln,t,{tilt,ports:lean>.3});
    sea(a,gy0,t,["rgba(16,46,86,.78)","rgba(10,34,68,.85)","rgba(6,22,48,.92)"],3);
    tg("drygt 1 km från kajen",cx,a.y+a.h*.1,"#7fd6ff","center");
    // vindpust
    if(t>2.4&&t<7.8){const q=cl((t-2.4)/1.2,0,1)*(1-cl((t-6.6)/1.2,0,1));c.save();c.globalAlpha=q;c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=2.5;c.lineCap="round";for(let i=0;i<5;i++){const yy=a.y+a.h*(.28+i*.07),off=((t*260+i*90)%(a.w*.9));c.beginPath();c.moveTo(a.x+off,yy);c.lineTo(a.x+off+60,yy);c.stroke();}c.restore();tx("en vindpust",a.x+a.w*.12,a.y+a.h*.22,"#fff","left",Math.max(15,s*.038),700);}
    // vatten in genom portarna
    if(t>5.6&&t<10){const q=eo((t-5.6)/1.2);c.save();c.globalAlpha=q*.8;c.fillStyle="#5aa6e0";const u=Ln/100;for(let i=0;i<5;i++){const px=sx-24*u+i*7.4*u+Ln*.02;c.fillRect(px,gy-4*u+Math.sin(t*8+i)*2,3*u,10*u*q);}c.restore();}
    if(t>8.6){const q=eo((t-8.6)/1.4);c.save();c.globalAlpha=q;tx("Vasa sjunker",cx,a.y+a.h*.2,"#ffd0b0","center",Math.max(18,s*.048),700);c.restore();}};

  /* 4 · På botten: foto, sedan tidslinje 1628–1961 och maskar som inte finns */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.9)/1.1);photo(4,t,8.8,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;L.panel(a,1);
      const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=a.y+a.h*.3,bh=Math.max(24,s*.065),px=yr=>lx+(yr-1628)/(1961-1628)*w;
      tg("På havsbotten",cx,a.y+a.h*.12,"#7fd6ff","center");
      c.fillStyle="rgba(255,255,255,.1)";c.fillRect(lx,y,w,bh);const k=eo((t-4.3)/2.2);c.fillStyle="#5aa6e0";c.fillRect(lx,y,w*k,bh);
      tx("1628",lx,y+bh+Math.max(24,s*.055),"#fff","left",Math.max(14,s*.034),700);tx("1961",lx+w,y+bh+Math.max(24,s*.055),"#fff","right",Math.max(14,s*.034),700);
      if(k>.9)tx("över 300 år",cx,y+bh*.68,"#06121f","center",Math.max(16,s*.042),700);
      // skeppsmask (överstruken)
      if(t>6.2){const q=eo((t-6.2)/1),my=a.y+a.h*.66,mx=cx;c.globalAlpha=g*q;c.strokeStyle="#d9c9a0";c.lineWidth=Math.max(5,s*.016);c.lineCap="round";c.beginPath();for(let i=0;i<=18;i++){const p=i/18,xx=mx-s*.16+p*s*.32,yy=my+Math.sin(p*9+t*3)*s*.02;if(i===0)c.moveTo(xx,yy);else c.lineTo(xx,yy);}c.stroke();
        const k2=cl((t-6.8)/.6,0,1);c.strokeStyle="#ff6b5e";c.lineWidth=Math.max(5,s*.014);const q2=s*.2;c.beginPath();c.moveTo(mx-q2,my-q2*.7);c.lineTo(mx-q2+2*q2*k2,my-q2*.7+1.4*q2*k2);c.stroke();
        tx("skeppsmasken saknas i Östersjön",cx,my+s*.19,"#ffd86b","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 5 · Upp igen: foto, sedan skeppet som lyfts mot ytan */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(5,t,6.9,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#7fb6e8"],[.22,"#7fb6e8"],[.221,"#0d3b63"],[1,"#020b18"]]);
      const ys=a.y+a.h*.22,Ln=Math.min(a.w*.4,a.h*.5,s*.9),p=eo((t-3.6)/3),gy=lerp(a.y+a.h*.92,ys+Ln*.1,p);
      galleon(cx,gy,Ln,t,{});
      c.strokeStyle="#ffd86b";c.lineWidth=3;c.lineCap="round";c.fillStyle="#ffd86b";[-1,1].forEach(d=>{const ax=cx+d*Ln*.62,y1=a.y+a.h*.9,y2=lerp(a.y+a.h*.9,a.y+a.h*.36,p);c.beginPath();c.moveTo(ax,y1);c.lineTo(ax,y2);c.stroke();c.beginPath();c.moveTo(ax,y2-8);c.lineTo(ax-7,y2+4);c.lineTo(ax+7,y2+4);c.fill();});
      c.restore();tx("1961",a.x+a.w*.14,a.y+a.h*.17,"#fff","left",Math.max(24,s*.07),700);}};

  /* 6 · Museet */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();photo(6,t,9.6,1.1,.15);cred(6,.55);
    const f=eo((t-2)/1);if(f>0){c.save();c.globalAlpha=f;c.fillStyle="rgba(6,10,22,.72)";c.fillRect(a.x,a.y+a.h*.62,a.w,a.h*.26);tx("Vasamuseet, Stockholm",cx,a.y+a.h*.62+a.h*.11,"#fff","center",Math.max(17,s*.045),700);
      const f2=eo((t-4.6)/1);c.globalAlpha=f*f2;tx("Bäst bevarade skeppet från 1600-talet",cx,a.y+a.h*.62+a.h*.2,"#ffd86b","center",Math.max(15,s*.038),700);c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
