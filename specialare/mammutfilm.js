/* Ullhårsmammuten: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/mammutar/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/mammutar-1..6.jpg. MPMammutFilm.start(host,{overlay,onClose}). Ljudmatta: slott (vind). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.5,cap:[[0.5,"En jättelik, lurvig elefant som levde under istiden. Det här är berättelsen om ullhårsmammuten."]]},
 {k:"01 · Istidens djur",d:11.2,cap:[[0.8,"Ullhårsmammuten levde under istiden. De sista försvann för ungefär 4 000 år sedan."],[7.4,"Då byggdes redan pyramiderna i Egypten."]]},
 {k:"02 · Stora betar",d:8.4,cap:[[0.8,"Den var ungefär lika stor som en afrikansk elefant, med långa böjda betar som kunde bli flera meter."]]},
 {k:"03 · Päls mot kylan",d:6,cap:[[0.8,"Den hade tjock päls och ett tjockt lager fett som skydd mot kylan."]]},
 {k:"04 · Grottmålningar",d:5.4,cap:[[0.8,"Människor jagade mammutar och ritade dem på grottväggar."]]},
 {k:"05 · Frusna fynd",d:8.6,cap:[[0.8,"Hela mammutar har hittats frusna i Sibirien."],[4.5,"Kalven Lyuba är över 40 000 år gammal."]]},
 {k:"06 · Tillbaka?",d:9.9,cap:[[0.8,"Forskare har tagit DNA från frusna mammutar och funderar på om man kan skapa mammutliknande djur."],[7.4,"Ingen har lyckats ännu."]]}
];
const META={mat:"slott",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Ullhårsmammuten",under:"En film i sju steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Mammuten är borta, men vi lär oss om den än i dag. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Thomas Quine (modell, Royal BC Museum) · CC BY 2.0 · Wikimedia Commons",2:"Foto: Zde (mammutbete med ristningar) · CC BY-SA 4.0 · Wikimedia Commons",3:"Foto: Jim Linwood (modell, Horniman Museum) · CC BY 2.0 · Wikimedia Commons",4:"Grottmålning, Grotte de Rouffignac · Public domain · Wikimedia Commons",5:"Foto: Ruth Hartnup (Lyuba) · CC BY 2.0 · Wikimedia Commons",6:"Foto: Spudgun67 (DNA-plakett, Cambridge) · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPMammutFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"mammutar",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"mammutar-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,man,title}=L;
  /* mammut sedd från sidan, tittar åt höger. L = längd. o.fill=false ritar bara linjer. o.k = hur stor del (0..1 från vänster) som är ritad */
  const mammoth=(cx,gy,Ln,t,o)=>{const c=x(),u=Ln/100;o=o||{};c.save();if(o.k!=null){c.beginPath();c.rect(cx-60*u,gy-80*u,120*u*o.k,100*u);c.clip();}
    const fill=o.fill!==false,col=o.col||"#6b4a2e",line=o.line||"#3a2410";c.lineJoin="round";c.lineCap="round";c.strokeStyle=fill?line:(o.stroke||"#c98a4a");c.lineWidth=fill?Math.max(1.5,u*.9):Math.max(3,u*1.4);c.fillStyle=col;
    const body=()=>{c.beginPath();c.moveTo(cx-46*u,gy-30*u);c.bezierCurveTo(cx-46*u,gy-58*u,cx-18*u,gy-62*u,cx+4*u,gy-58*u);c.bezierCurveTo(cx+14*u,gy-70*u,cx+34*u,gy-68*u,cx+38*u,gy-50*u);c.bezierCurveTo(cx+44*u,gy-40*u,cx+42*u,gy-24*u,cx+40*u,gy-14*u);   // rygg, puckel, panna
      c.lineTo(cx+34*u,gy-14*u);c.bezierCurveTo(cx+36*u,gy-28*u,cx+32*u,gy-34*u,cx+26*u,gy-34*u);                                                           // snabel nedåt
      c.lineTo(cx+22*u,gy);c.lineTo(cx+14*u,gy);c.lineTo(cx+12*u,gy-26*u);c.lineTo(cx-10*u,gy-26*u);c.lineTo(cx-12*u,gy);c.lineTo(cx-20*u,gy);c.lineTo(cx-22*u,gy-24*u);c.lineTo(cx-36*u,gy-22*u);c.lineTo(cx-38*u,gy);c.lineTo(cx-46*u,gy);c.closePath();};
    body();if(fill)c.fill();c.stroke();
    // lång päls längs magen
    c.lineWidth=Math.max(1,u*.7);for(let i=0;i<18;i++){const px=cx-40*u+i*3.8*u,sw=Math.sin(t*1.5+i)*u*.8;c.beginPath();c.moveTo(px,gy-26*u);c.lineTo(px+sw,gy-17*u);c.stroke();}
    // betar
    c.strokeStyle=fill?"#efe6d2":(o.stroke||"#c98a4a");c.lineWidth=Math.max(3,u*2.2);c.beginPath();c.moveTo(cx+37*u,gy-36*u);c.bezierCurveTo(cx+52*u,gy-30*u,cx+60*u,gy-44*u,cx+52*u,gy-58*u);c.stroke();
    c.fillStyle="#10141f";c.beginPath();c.arc(cx+34*u,gy-46*u,Math.max(1.5,u*1.2),0,TAU);c.fill();c.restore();};

  const s0=(t)=>{photo(3,t,8.5,1.12,.3);const f=title(t,"ULLHÅRSMAMMUTEN","EN LURVIG JÄTTE FRÅN ISTIDEN","#e6d2b0");cred(3,.55*f);};

  /* 1 · Istidens djur: foto, sedan tidslinje mot pyramiderna */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(1,t,11.2,1.08,.15+.4*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.84,s*1.6),lx=cx-w/2,y=cy-s*.06,bh=Math.max(26,s*.07),px=ago=>lx+(1-ago/10000)*w;
      tg("År sedan",cx,a.y+a.h*.1,"#7fd6ff","center");
      [[10000,"10 000"],[8000,"8 000"],[6000,"6 000"],[4000,"4 000"],[2000,"2 000"],[0,"i dag"]].forEach(([v,l])=>{c.strokeStyle="rgba(255,255,255,.25)";c.lineWidth=1.5;c.beginPath();c.moveTo(px(v),y-8);c.lineTo(px(v),y+bh*2.6+8);c.stroke();tx(l,px(v),y+bh*2.6+Math.max(28,s*.065),"rgba(255,255,255,.75)","center",Math.max(12,s*.03),600);});
      const k=eo((t-3.6)/1.8);c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y,w,bh);c.fillStyle="#b9783a";c.fillRect(px(10000),y,(px(4000)-px(10000))*k,bh);tx("mammuten",px(10000)+8,y+bh*.68,"#fff","left",Math.max(14,s*.034),700);if(k>.9)tx("sista, för 4 000 år sedan",px(4000),y-12,"#ffd0a0","center",Math.max(13,s*.032),700);
      if(t>7.4){const q=eo((t-7.4)/1);c.globalAlpha=g*q;c.fillStyle="#d9b878";c.fillRect(px(4600),y+bh*1.5,px(4300)-px(4600),bh);c.strokeStyle="#d9b878";c.lineWidth=2;c.beginPath();c.moveTo(px(4450),y+bh*1.5);c.lineTo(px(4450),y+bh);c.stroke();tx("pyramiderna byggs",px(4450),y+bh*2.5+Math.max(18,s*.04),"#ffe0a8","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 2 · Stora betar: mammut mot en människa */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(2,t,8.4,1.1,.15+.4*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfe0ee"],[1,"#eef4f8"]]);const gy=a.y+a.h*.78;c.fillStyle="#f6f9fc";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
      const Ln=Math.min(a.w*.62,a.h*1.05),mx=cx-Ln*.1;mammoth(mx,gy,Ln,t,{});
      const k=eo((t-3.8)/1);c.globalAlpha=g*k;man(mx-Ln*.62,gy,Ln*.27,"#10223e",t,false);tx("människa",mx-Ln*.62,gy+Math.max(24,s*.055),"#10223e","center",Math.max(13,s*.032),700);
      if(t>5){const q=eo((t-5)/1);c.globalAlpha=g*q;tx("betar: flera meter",mx+Ln*.5,gy-Ln*.72,"#7a4a1a","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 3 · Päls mot kylan: lager av päls, fett och hud */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,6,1.1,.15+.4*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#243a5e"],[1,"#6a8ab8"]]);
      const w=Math.min(a.w*.6,s*1.1),lx=cx-w/2,y=cy-s*.1,lh=Math.max(36,s*.1);
      const layers=[["päls","#7a5230",3],["fett","#f0d070",3.6],["kropp","#c97a6a",4.2]];
      layers.forEach(([n,col,st],i)=>{const q=eo((t-st)/.7);if(q<=0)return;const ly=y+i*lh;c.save();c.globalAlpha=g*q;c.fillStyle=col;c.fillRect(lx,ly,w,lh);
        if(i===0){c.strokeStyle="#4a2e14";c.lineWidth=2;for(let k=0;k<30;k++){c.beginPath();c.moveTo(lx+k*w/30+4,ly);c.lineTo(lx+k*w/30+4+Math.sin(t*2+k)*3,ly+lh*.9);c.stroke();}}
        tx(n,lx+w+Math.max(14,s*.03),ly+lh*.66,"#fff","left",Math.max(17,s*.045),700);c.restore();});
      if(t>4.6){const q=eo((t-4.6)/1);c.globalAlpha=g*q;tx("skydd mot kylan",cx,a.y+a.h*.12,"#fff","center",Math.max(19,s*.052),700);}
      c.restore();}};

  /* 4 · Grottmålningar: en mammut ritas på grottväggen */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,5.4,1.1,.15+.4*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#4a3a2c"],[1,"#2a2018"]]);const r=L.srand(8);c.fillStyle="rgba(0,0,0,.18)";for(let i=0;i<60;i++){c.beginPath();c.arc(a.x+r()*a.w,a.y+r()*a.h,3+r()*10,0,TAU);c.fill();}
      const Ln=Math.min(a.w*.7,a.h*1.2),gy=cy+Ln*.25;mammoth(cx,gy,Ln,t,{fill:false,stroke:"#d98a4a",k:eo((t-2.6)/2.4)});
      tx("ritade dem på grottväggar",cx,a.y+a.h*.12,"#ffd0a0","center",Math.max(17,s*.045),700);
      c.restore();}};

  /* 5 · Frusna fynd: mammut i is, Lyuba */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,8.6,1.1,.15+.4*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d2a4a"],[1,"#1a4a78"]]);
      const w=Math.min(a.w*.7,s*1.25),h=w*.58,lx=cx-w/2,ly=cy-h/2-s*.03;
      const ig=c.createLinearGradient(lx,ly,lx+w,ly+h);ig.addColorStop(0,"rgba(190,230,255,.55)");ig.addColorStop(1,"rgba(120,190,240,.45)");c.fillStyle=ig;c.strokeStyle="rgba(220,240,255,.8)";c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(lx,ly,w,h,14):c.rect(lx,ly,w,h);c.fill();c.stroke();
      mammoth(cx,ly+h*.9,w*.72,t,{col:"rgba(90,64,40,.85)"});
      tx("Sibirien",cx,a.y+a.h*.1,"#cfe8ff","center",Math.max(19,s*.052),700);
      if(t>4.5){const q=eo((t-4.5)/1);c.globalAlpha=g*q;tx("Lyuba: över 40 000 år",cx,ly+h+Math.max(36,s*.08),"#ffd86b","center",Math.max(18,s*.048),700);}
      c.restore();}};

  /* 6 · Tillbaka?: DNA och ett frågetecken */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(6,t,9.9,1.1,.15+.4*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const h=Math.min(a.h*.6,s*.8),w=Math.min(a.w*.3,s*.5),px=cx-(port?0:a.w*.14),top=cy-h/2-s*.02,n=26;
      for(let i=0;i<n;i++){const q=i/(n-1),y=top+q*h,ph=q*TAU*2.2+t*1.4,dx=Math.sin(ph)*w/2,dz=Math.cos(ph);c.strokeStyle="rgba(255,255,255,.28)";c.lineWidth=3;c.beginPath();c.moveTo(px-dx,y);c.lineTo(px+dx,y);c.stroke();c.fillStyle=dz>0?"#ff8a5a":"#7fd6ff";c.beginPath();c.arc(px-dx,y,6,0,TAU);c.fill();c.fillStyle=dz>0?"#7fd6ff":"#ff8a5a";c.beginPath();c.arc(px+dx,y,6,0,TAU);c.fill();}
      tx("DNA",px,top-16,"#fff","center",Math.max(20,s*.055),700);
      const qx=cx+(port?0:a.w*.2),qy=cy+(port?h*.7:0);tx("?",qx,qy,"#ffd86b","center",Math.max(80,s*.3),700);
      if(t>7.4){const q=eo((t-7.4)/1);c.globalAlpha=g*q;tx("ingen har lyckats ännu",qx,qy+Math.max(36,s*.08),"#fff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
