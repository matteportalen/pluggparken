/* Internet ligger på havsbotten: minilektionen som film (åtta scener, ca 1,7 minuter), foton och gamla bilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/sjokablar/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/sjokablar-1..6.jpg. MPSjokablarFilm.start(host,{overlay,onClose}). Ljudmatta: havet. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.4,cap:[[0.5,"Internet är inte i luften. Det här är berättelsen om kablarna på havsbotten."]]},
 {k:"01 · Inte i luften",d:11.8,cap:[[0.8,"Nästan allt internet mellan länderna går genom kablar som ligger på havsbotten."],[5.5,"Det trådlösa är bara de sista metrarna, till din telefon eller dator."]]},
 {k:"02 · En miljon kilometer",d:9,cap:[[0.8,"Det finns ungefär 500 kablar. Tillsammans är de över en miljon kilometer långa, mer än två gånger till månen."]]},
 {k:"03 · Ljus i glas",d:14.1,cap:[[0.8,"Inuti kablarna finns glasfibertrådar. Informationen skickas som ljusblixtar, tusentals miljoner varje sekund."],[9.3,"Ett meddelande över Atlanten tar mindre än en tiondels sekund."]]},
 {k:"04 · Tunn som en slang",d:13.8,cap:[[0.8,"Ute i djuphavet är kabeln bara ungefär lika tjock som en trädgårdsslang. Den har ett skydd av stål och plast."],[8.4,"Nära land är kabeln tjockare, eftersom ankare och fisknät kan skada den."]]},
 {k:"05 · Kabelfartyg",d:12.5,cap:[[0.8,"Särskilda fartyg lägger ut kablarna och lagar dem när de går sönder, ibland på flera kilometers djup."],[7.3,"Varje år går kablar sönder över hundra gånger, oftast av ankare och fiskeredskap."]]},
 {k:"06 · Den första kabeln",d:16.5,cap:[[0.8,"Den första kabeln över Atlanten lades år 1858. Den skickade telegram."],[7.0,"Det första meddelandet hade ungefär 100 ord och tog över 16 timmar att skicka. Efter några veckor slutade kabeln fungera."]]},
 {k:"07 · Under filmen du ser",d:7.6,cap:[[0.8,"Nästa gång du ser en film från ett annat land, har den troligen färdats genom en kabel på havets botten."]]}
];
const META={mat:"havet",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Internet på havsbotten",under:"En film i åtta steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Världens internet ligger i mörkret under haven. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Karta över den undersjöiska telegrafkabeln mellan Amerika och Europa · CC BY 2.0 · Wikimedia Commons",2:"Målning: HMS Agamemnon lägger Atlantkabeln 1858 · CC0 · Wikimedia Commons",3:"Bild: Infestor (kabelns delar) · CC BY-SA 4.0 · Wikimedia Commons",4:"Foto: Z22 (undervattenskabel) · CC BY-SA 3.0 · Wikimedia Commons",5:"Illustrerad bild ur ILN: kabel dras i land vid Muscat · Public domain · Wikimedia Commons",6:"Teckning: L'Univers illustré (kabelfartygen Agamemnon och Niagara) · Public domain · Wikimedia Commons"};

window.MPSjokablarFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"sjokablar",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"sjokablar-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,deep,sea,title}=L;
  const land=(px,py,w,h,col)=>{const c=x();c.save();c.fillStyle=col||"#3d6b3a";c.beginPath();c.ellipse(px,py,w,h,0,0,TAU);c.fill();c.restore();};
  /* kabel mellan två punkter med nedböjd kurva; pulser rör sig längs den */
  const cable=(x1,y1,x2,y2,sag,t,col,pulses)=>{const c=x();c.save();c.strokeStyle=col||"rgba(255,255,255,.55)";c.lineWidth=3;c.beginPath();c.moveTo(x1,y1);c.quadraticCurveTo((x1+x2)/2,(y1+y2)/2+sag,x2,y2);c.stroke();
    for(let i=0;i<(pulses||0);i++){const p=((t*.45+i/pulses)%1),q=1-p,px=q*q*x1+2*q*p*((x1+x2)/2)+p*p*x2,py=q*q*y1+2*q*p*((y1+y2)/2+sag)+p*p*y2;c.fillStyle="#ffe27a";c.beginPath();c.arc(px,py,5,0,TAU);c.fill();}c.restore();};

  const s0=(t)=>{photo(2,t,6.4,1.12,.3);const f=title(t,"HAVSKABLAR","INTERNET UNDER HAVEN","#9fd0ff");cred(2,.55*f);};

  /* 1 · inte i luften */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,11.8,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t,1);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2;
      if(t<5.5){land(lx+w*.08,cy-s*.04,w*.12,s*.16);land(lx+w*.92,cy-s*.04,w*.12,s*.16);cable(lx+w*.14,cy-s*.04,lx+w*.86,cy-s*.04,s*.12,t,"rgba(255,255,255,.6)",4);cable(lx+w*.12,cy+s*.02,lx+w*.88,cy+s*.02,s*.2,t,"rgba(143,208,255,.6)",3);tx("kablar på havsbotten",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(19,s*.052),700);}
      else{const q=eo((t-5.5)/1);c.globalAlpha=g*q;const px=cx-w*.3,py=cy;c.fillStyle="#e8ecf4";c.fillRect(px-14,py-26,28,52);c.fillStyle="#4a7ad9";c.fillRect(px-10,py-20,20,36);
        for(let i=1;i<=3;i++){c.strokeStyle=`rgba(255,226,122,${.8-i*.2})`;c.lineWidth=3;c.beginPath();c.arc(px,py-30,12+i*12,-Math.PI*.8,-Math.PI*.2);c.stroke();}
        c.fillStyle="#2a73c8";c.fillRect(cx+w*.05,py-16,50,32);tx("sändare",cx+w*.05+25,py+44,"#9fd0ff","center",Math.max(12,s*.03),600);c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=3;c.beginPath();c.moveTo(cx+w*.05+50,py);c.lineTo(cx+w*.4,py);c.stroke();tx("kabel",cx+w*.28,py-12,"#ffe27a","center",Math.max(13,s*.034),700);
        tx("de sista metrarna",px,py+Math.max(70,s*.15),"#9fd0ff","center",Math.max(14,s*.036),700);}
      c.restore();}};

  /* 2 · en miljon kilometer mot avståndet till månen */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,9,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,bh=Math.max(26,s*.07),y1=cy-s*.08,y2=cy+s*.1,sc=w/1000000;
      const k1=eo((t-3)/2);c.fillStyle="#ffd23c";c.fillRect(lx,y1,1000000*sc*k1,bh);tx("kablarna ihop: över 1 000 000 km",lx,y1-Math.max(10,s*.026),"#ffd86b","left",Math.max(14,s*.037),700);
      const k2=eo((t-5)/2);c.fillStyle="#9fd0ff";c.fillRect(lx,y2,768000*sc*k2,bh);tx("jorden–månen, tur och retur: 768 000 km",lx,y2-Math.max(10,s*.026),"#9fd0ff","left",Math.max(14,s*.037),700);
      tx("ca 500 kablar",cx,a.y+a.h*.12,"#fff","center",Math.max(22,s*.06),700);
      c.restore();}};

  /* 3 · ljus i glas */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,14.1,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t,1);
      if(t<9.3){const w=Math.min(a.w*.84,s*1.6),lx=cx-w/2,y=cy,h=Math.max(14,s*.034);c.fillStyle="rgba(200,230,255,.25)";c.strokeStyle="rgba(200,230,255,.7)";c.lineWidth=2;c.fillRect(lx,y-h/2,w,h);c.strokeRect(lx,y-h/2,w,h);
        for(let i=0;i<14;i++){const p=((t*.9+i*.071)%1);if((i%3)===2)continue;c.fillStyle="#ffe27a";c.shadowColor="#ffe27a";c.shadowBlur=12;c.fillRect(lx+p*w,y-h*.3,Math.max(10,w*.025),h*.6);}c.shadowBlur=0;
        tx("glasfiber · ljusblixtar",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(18,s*.048),700);tx("tusentals miljoner varje sekund",cx,y+Math.max(70,s*.15),"#cfd8ff","center",Math.max(14,s*.036),600);}
      else{const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2;land(lx+w*.06,cy,w*.1,s*.15);land(lx+w*.94,cy,w*.1,s*.15);tx("Europa",lx+w*.06,cy+Math.max(40,s*.1),"#cfd8ff","center",Math.max(12,s*.03),600);tx("Amerika",lx+w*.94,cy+Math.max(40,s*.1),"#cfd8ff","center",Math.max(12,s*.03),600);
        cable(lx+w*.12,cy,lx+w*.88,cy,s*.1,t,"rgba(255,255,255,.55)",3);const k=eo((t-9.6)/.8);c.globalAlpha=g*k;tx("< 0,1 s",cx,a.y+a.h*.2,"#ffd86b","center",Math.max(30,s*.085),700);}
      c.restore();}};

  /* 4 · tunn som en trädgårdsslang, tjockare nära land */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,13.8,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t,1);
      const layers=(px,py,r,labelCol)=>{c.save();[["#cfd5df",1],["#7a8190",.8],["#d9703a",.55],["#ffe27a",.28],["#e8f4ff",.12]].forEach(([col,f])=>{c.fillStyle=col;c.beginPath();c.arc(px,py,r*f,0,TAU);c.fill();});c.restore();};
      if(t<8.4){const r=Math.max(22,Math.min(a.w,a.h)*.14);layers(cx,cy,r);tx("ca 2,5 cm",cx,cy+r+Math.max(30,s*.07),"#9fd0ff","center",Math.max(15,s*.04),700);tx("som en trädgårdsslang",cx,cy-r-Math.max(16,s*.04),"#ffd86b","center",Math.max(18,s*.048),700);tx("stål och plast skyddar glasfibern i mitten",cx,a.y+a.h*.92,"#cfd8ff","center",Math.max(13,s*.034),600);}
      else{const r1=Math.max(18,Math.min(a.w,a.h)*.1),r2=r1*1.9;layers(cx-r2*1.1,cy,r1);layers(cx+r2*.9,cy,r2);tx("djuphav",cx-r2*1.1,cy+r2+Math.max(26,s*.06),"#9fd0ff","center",Math.max(14,s*.036),700);tx("nära land",cx+r2*.9,cy+r2+Math.max(26,s*.06),"#ffd86b","center",Math.max(14,s*.036),700);tx("ankare och fisknät kan skada",cx,a.y+a.h*.1,"#ff9a8a","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 5 · kabelfartyg, sedan trasiga kablar per år */
  const ship=(px,py,Ln)=>{const c=x(),u=Ln/100;c.save();c.fillStyle="#cfd5df";c.beginPath();c.moveTo(px-50*u,py-8*u);c.lineTo(px+46*u,py-8*u);c.lineTo(px+34*u,py+6*u);c.lineTo(px-42*u,py+6*u);c.closePath();c.fill();c.fillStyle="#e24a4a";c.fillRect(px-50*u,py-10*u,6*u,8*u);c.fillStyle="#7a8190";c.fillRect(px-10*u,py-26*u,24*u,18*u);c.fillRect(px+22*u,py-34*u,4*u,26*u);c.strokeStyle="#ffd23c";c.lineWidth=Math.max(2,2.5*u);c.beginPath();c.moveTo(px-50*u,py-6*u);c.lineTo(px-62*u,py+4*u);c.stroke();c.restore();};
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(5,t,12.5,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      if(t<7.3){grad(a,[[0,"#8fb8e8"],[.34,"#cfe6fb"],[.341,"#0d3b63"],[1,"#020b18"]]);const gy=a.y+a.h*.34,Ln=Math.min(a.w*.3,s*.55);ship(cx,gy,Ln);const k=eo((t-3)/3.5);c.strokeStyle="#ffd23c";c.lineWidth=3;c.beginPath();c.moveTo(cx-Ln*.62,gy+4);c.quadraticCurveTo(cx-Ln*.7,gy+a.h*.3,cx-Ln*.4,lerp(gy+a.h*.2,a.y+a.h*.92,k));c.stroke();c.fillStyle="#3a2c22";c.fillRect(a.x,a.y+a.h*.92,a.w,a.h*.08);tx("kilometers djup",cx+Ln*.55,a.y+a.h*.66,"#9fd0ff","left",Math.max(13,s*.034),700);}
      else{grad(a,[[0,"#13203c"],[1,"#2a3a58"]]);const n=Math.floor(cl((t-7.6)/3,0,1)*100);tx("över "+Math.max(0,Math.min(100,n)),cx,cy,"#ffd86b","center",Math.max(44,s*.14),700);tx("kabelbrott varje år",cx,cy+Math.max(54,s*.12),"#fff","center",Math.max(17,s*.045),700);tx("oftast ankare och fiskeredskap",cx,cy+Math.max(90,s*.19),"#cfd8ff","center",Math.max(14,s*.036),600);}
      c.restore();}};

  /* 6 · första kabeln 1858 */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,16.5,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      if(t<7){tx("1858",cx,cy-s*.02,"#ffd86b","center",Math.max(50,s*.15),700);tx("telegram över Atlanten",cx,cy+Math.max(54,s*.12),"#cfd8ff","center",Math.max(17,s*.045),700);}
      else{const w=Math.min(a.w*.7,s*1.2),lx=cx-w/2,y=cy-s*.06;const k=cl((t-7.4)/6,0,1);
        tx("ca 100 ord",cx,y-Math.max(30,s*.07),"#ffd86b","center",Math.max(20,s*.055),700);
        c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=3;c.strokeRect(lx,y,w,Math.max(26,s*.065));c.fillStyle="#ffd23c";c.fillRect(lx,y,w*k,Math.max(26,s*.065));
        tx("över 16 timmar att skicka",cx,y+Math.max(70,s*.15),"#fff","center",Math.max(17,s*.045),700);
        if(t>12){c.globalAlpha=g*eo((t-12)/1);tx("efter några veckor: tyst",cx,y+Math.max(116,s*.25),"#ff9a8a","center",Math.max(15,s*.04),700);}}
      c.restore();}};

  /* 7 · under filmen du ser */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2)/1.1);photo(6,t,7.6,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t,1);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2;
      c.fillStyle="#e8ecf4";c.fillRect(lx+w*.5-40,a.y+a.h*.14,80,56);c.fillStyle="#222";c.fillRect(lx+w*.5-36,a.y+a.h*.14+4,72,40);c.fillStyle="#ffd86b";c.beginPath();c.moveTo(lx+w*.5-8,a.y+a.h*.14+14);c.lineTo(lx+w*.5+12,a.y+a.h*.14+24);c.lineTo(lx+w*.5-8,a.y+a.h*.14+34);c.closePath();c.fill();
      land(lx+w*.06,cy+s*.08,w*.1,s*.12);cable(lx+w*.12,cy+s*.08,lx+w*.88,cy+s*.08,s*.14,t,"rgba(255,255,255,.55)",5);land(lx+w*.94,cy+s*.08,w*.1,s*.12);
      cable(lx+w*.88,cy+s*.08,lx+w*.5,a.y+a.h*.22,-s*.05,t,"rgba(255,226,122,.5)",0);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
