/* Mikrochipet: minilektionen som film (åtta scener, ca 1,8 minuter), bilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/chip/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/chip-1..6.jpg. MPChipFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:8.2,cap:[[0.5,"Mer än tio miljarder strömbrytare på ett chip stort som en nagel. Det här är berättelsen om mikrochipet."]]},
 {k:"01 · Datorer stora som rum",d:12.7,cap:[[0.8,"De första datorerna, på 1940-talet, fyllde ett helt rum och vägde flera ton. De använde glasrör."],[8.7,"Datorn ENIAC hade nästan 18 000 glasrör."]]},
 {k:"02 · Transistorn",d:14.3,cap:[[0.8,"År 1947 uppfann forskare transistorn. Den är en liten strömbrytare som kan slå på och av, tusentals gånger i sekunden."],[10.4,"Tre av dem fick senare Nobelpriset för uppfinningen."]]},
 {k:"03 · Det första chipet",d:9.7,cap:[[0.8,"År 1958 lyckades Jack Kilby sätta flera transistorer på samma bit material. Det blev det första chipet."]]},
 {k:"04 · Sand blir chip",d:9.7,cap:[[0.8,"Chip görs av kisel, som finns i sand. Det renas, skärs i skivor och bearbetas i extremt rena rum."]]},
 {k:"05 · Mindre än ett virus",d:8.1,cap:[[0.8,"Transistorerna är bara några miljondels millimeter stora. Ett hårstrå är tiotusentals gånger tjockare."]]},
 {k:"06 · Miljarder i en mobil",d:17.8,cap:[[0.8,"Ett chip i en mobil är stort som en nagel och har mer än tio miljarder transistorer."],[6.2,"Det första mikroprocessorchipet, år 1971, hade drygt 2 000."],[12.3,"Antalet har fördubblats ungefär vartannat år. Det kallas Moores lag."]]},
 {k:"07 · Därför är allt smart",d:7.7,cap:[[0.8,"Utan chip skulle det inte finnas mobiler, bilar med datorer eller sjukhusens magnetkameror."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Mikrochipet",under:"En film i åtta steg · ca 1,8 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Från sand till smarta maskiner. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Ik T (ENIAC, Computer History Museum) · CC BY 2.0 · Wikimedia Commons",2:"Foto: Windell Oskay (den första transistorn, Bell Labs 1947) · CC BY 2.0 · Wikimedia Commons",3:"Foto: Radiotrefoil (kiselskiva) · CC BY-SA 4.0 · Wikimedia Commons",4:"Foto: Revaldinho (mikroprocessor) · CC BY 4.0 · Wikimedia Commons",5:"Foto: Raimond Spekking (mobilens kretskort) · CC BY-SA 4.0 · Wikimedia Commons",6:"Foto: Aileen Devlin/Jefferson Lab (renrum) · Public domain · Wikimedia Commons"};

window.MPChipFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"chip",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"chip-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};
  /* kretsmönster: slumpade vinkelräta kopparbanor med glödande strömpulser */
  const circuit=(px,py,w,t,seed)=>{const c=x(),r=L.srand(seed||5),n=26,lines=[];c.save();c.beginPath();c.rect(px-w/2,py-w/2,w,w);c.clip();const g=c.createLinearGradient(px-w/2,py-w/2,px+w/2,py+w/2);g.addColorStop(0,"#0c1830");g.addColorStop(1,"#1a2c52");c.fillStyle=g;c.fillRect(px-w/2,py-w/2,w,w);
    for(let i=0;i<n;i++){let X=px-w/2+Math.floor(r()*20)/20*w,Y=py-w/2+Math.floor(r()*20)/20*w;const pts=[[X,Y]];for(let k=0;k<5;k++){if(k%2===0)X+=(r()<.5?-1:1)*Math.floor(1+r()*5)/20*w;else Y+=(r()<.5?-1:1)*Math.floor(1+r()*5)/20*w;pts.push([X,Y]);}lines.push(pts);}
    c.lineWidth=Math.max(1.5,w*.008);c.lineJoin="round";lines.forEach((pts,i)=>{c.strokeStyle=i%3?"rgba(216,150,70,.65)":"rgba(120,200,255,.55)";c.beginPath();pts.forEach(([a,b],k)=>k?c.lineTo(a,b):c.moveTo(a,b));c.stroke();});
    c.fillStyle="rgba(255,230,160,.5)";for(let i=0;i<60;i++){c.fillRect(px-w/2+Math.floor(r()*40)/40*w,py-w/2+Math.floor(r()*40)/40*w,w*.012,w*.012);}
    lines.forEach((pts,i)=>{const p=((t*.5+i*.13)%1)*(pts.length-1),k=Math.floor(p),f=p-k,A=pts[k],B=pts[Math.min(pts.length-1,k+1)];gl(lerp(A[0],B[0],f),lerp(A[1],B[1],f),w*.05,i%3?"rgba(255,200,100,.9)":"rgba(120,220,255,.9)");});
    c.restore();c.strokeStyle="rgba(200,215,240,.8)";c.lineWidth=Math.max(2,w*.012);c.strokeRect(px-w/2,py-w/2,w,w);};
  /* kiselskiva (wafer): regnbågsskimmer, rutnät av chip */
  const wafer=(px,py,r,t)=>{const c=x();c.save();c.shadowColor="rgba(120,160,255,.6)";c.shadowBlur=r*.2;c.fillStyle="#1a2440";c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.shadowBlur=0;c.beginPath();c.arc(px,py,r,0,TAU);c.clip();
    if(c.createConicGradient){const cg=c.createConicGradient(t*.4,px,py);["#ff5a9a","#ffb040","#6aff9a","#40c0ff","#a070ff","#ff5a9a"].forEach((col,i,a)=>cg.addColorStop(i/(a.length-1),col));c.globalAlpha*=.55;c.fillStyle=cg;c.fillRect(px-r,py-r,r*2,r*2);c.globalAlpha=1;}
    const n=14,cell=r*2/n;c.strokeStyle="rgba(10,16,34,.75)";c.lineWidth=Math.max(1,r*.012);for(let i=0;i<=n;i++){c.beginPath();c.moveTo(px-r+i*cell,py-r);c.lineTo(px-r+i*cell,py+r);c.moveTo(px-r,py-r+i*cell);c.lineTo(px+r,py-r+i*cell);c.stroke();}
    const sh=c.createRadialGradient(px-r*.4,py-r*.4,r*.05,px,py,r);sh.addColorStop(0,"rgba(255,255,255,.35)");sh.addColorStop(.4,"rgba(255,255,255,0)");c.fillStyle=sh;c.fillRect(px-r,py-r,r*2,r*2);c.restore();c.strokeStyle="rgba(210,225,255,.8)";c.lineWidth=Math.max(2,r*.02);c.beginPath();c.arc(px,py,r,0,TAU);c.stroke();};
  const chipSq=(px,py,w,col,pins)=>{const c=x();c.save();c.fillStyle=col||"#2a3550";c.strokeStyle="#9fd0ff";c.lineWidth=Math.max(2,w*.03);c.fillRect(px-w/2,py-w/2,w,w);c.strokeRect(px-w/2,py-w/2,w,w);if(pins!==false){c.strokeStyle="#cfd5df";c.lineWidth=Math.max(2,w*.03);for(let i=0;i<8;i++){const o=-w*.4+i*w*.8/7;c.beginPath();c.moveTo(px+o,py-w/2);c.lineTo(px+o,py-w/2-w*.12);c.moveTo(px+o,py+w/2);c.lineTo(px+o,py+w/2+w*.12);c.moveTo(px-w/2,py+o);c.lineTo(px-w/2-w*.12,py+o);c.moveTo(px+w/2,py+o);c.lineTo(px+w/2+w*.12,py+o);c.stroke();}}c.restore();};

  const s0=(t)=>{photo(5,t,8.2,1.12,.3);const f=title(t,"MIKROCHIPET","FRÅN SAND TILL SMARTA MASKINER","#9fd0ff");cred(5,.55*f);};

  /* 1 · datorn som fyller ett rum, glasrör */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,12.7,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1a1c24"],[1,"#2a2d38"]]);const w=Math.min(a.w*.82,s*1.5),h=Math.min(a.h*.5,s*.6),lx=cx-w/2,y=cy-h*.55,cols=24,rows=10,cw=w/cols,ch=h/rows;
      for(let r=0;r<rows;r++)for(let q=0;q<cols;q++){const gl=.5+.5*Math.sin(t*3+r*.9+q*1.3);c.fillStyle=`rgba(255,${180+gl*60|0},${90+gl*60|0},${.35+.4*gl})`;c.fillRect(lx+q*cw+cw*.3,y+r*ch+ch*.1,cw*.4,ch*.8);}
      c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=3;c.strokeRect(lx,y,w,h);
      tx("ett helt rum",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(19,s*.052),700);
      if(t>8.7){c.globalAlpha=g*eo((t-8.7)/1);const n=Math.round(18000*eo((t-8.9)/2));tx("ENIAC: "+n.toLocaleString("sv-SE").replace(/ /g," ")+" glasrör",cx,y+h+Math.max(40,s*.09),"#fff","center",Math.max(19,s*.052),700);}
      c.restore();}};

  /* 2 · transistorn: en liten strömbrytare */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,14.3,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);
      if(t<10.4){const on=Math.sin(t*(t>6?9:2.2))>0,w=Math.min(a.w*.4,s*.7),lx=cx-w/2,y=cy;c.strokeStyle="#cfd5df";c.lineWidth=5;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w*.3,y);c.moveTo(lx+w*.7,y);c.lineTo(lx+w,y);c.stroke();dot(lx+w*.3,y,7,"#fff");dot(lx+w*.7,y,7,"#fff");c.beginPath();c.moveTo(lx+w*.3,y);c.lineTo(lx+w*.7,on?y:y-w*.22);c.stroke();
        const bx=lx+w+Math.max(40,s*.08);c.fillStyle=on?"#ffe27a":"#3a3f55";c.beginPath();c.arc(bx,y,Math.max(16,s*.04),0,TAU);c.fill();
        tx("1947",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(30,s*.085),700);tx("på · av · på · av …",cx,y+Math.max(70,s*.15),"#cfd8ff","center",Math.max(16,s*.042),700);}
      else{const q=eo((t-10.4)/1),r=Math.max(18,s*.045);c.globalAlpha=g*q;for(let i=0;i<3;i++){const px=cx+(i-1)*r*4;c.fillStyle="#d9a84a";c.beginPath();c.arc(px,cy,r,0,TAU);c.fill();c.fillStyle="#fff";c.fillRect(px-r*.1,cy-r*.9,r*.2,r*.5);c.font=`700 ${Math.round(r*.9)}px "Source Serif 4",Georgia,serif`;tx("★",px,cy+r*.3,"#8a5a10","center",r,700);}tx("Nobelpriset",cx,cy+r*2.4,"#ffd86b","center",Math.max(20,s*.055),700);}
      c.restore();}};

  /* 3 · flera transistorer på samma bit: första chipet */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,9.7,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const w=Math.max(120,Math.min(a.w*.26,a.h*.4,s*.46)),k=eo((t-3.6)/2.6);
      tx("1958 · Jack Kilby",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(22,s*.06),700);
      const r=L.srand(7);for(let i=0;i<8;i++){const sx=cx+(r()-.5)*a.w*.7,sy=a.y+a.h*(.3+r()*.5),tx2=cx+(i%4-1.5)*w*.2,ty2=cy+(Math.floor(i/4)-.5)*w*.25;const px=lerp(sx,tx2,k),py=lerp(sy,ty2,k);c.fillStyle="#d9a84a";c.beginPath();c.arc(px,py,Math.max(8,w*.05),0,TAU);c.fill();}
      c.globalAlpha=g*k;circuit(cx,cy,w*1.3,t,5);tx("första chipet",cx,cy+w*.9,"#9fd0ff","center",Math.max(16,s*.042),700);
      c.restore();}};

  /* 4 · sand blir chip */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,9.7,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const n=4,w=Math.min(a.w*.84,s*1.55),gap=w/n,y=cy-s*.02,u=Math.max(26,gap*.3);
      const steps=["sand","kisel","skiva","chip"];steps.forEach((nm,i)=>{const q=eo((t-3-i*1.1)/.7);if(q<=0)return;c.save();c.globalAlpha=g*q;const px=cx-w/2+gap*(i+.5);
        if(i===0){c.fillStyle="#e8c878";c.beginPath();c.moveTo(px-u,y+u*.6);c.lineTo(px,y-u*.8);c.lineTo(px+u,y+u*.6);c.closePath();c.fill();}
        else if(i===1){c.fillStyle="#9aa3b8";c.fillRect(px-u*.5,y-u*.9,u,u*1.6);c.beginPath();c.ellipse(px,y-u*.9,u*.5,u*.2,0,0,TAU);c.fill();}
        else if(i===2){wafer(px,y,u*1.15,t);}
        else{circuit(px,y,u*1.3,t,9);}
        tx(nm,px,y+u*1.7,"#fff","center",Math.max(15,s*.04),700);if(i<n-1){c.strokeStyle="rgba(255,255,255,.5)";c.lineWidth=3;c.beginPath();c.moveTo(px+u*1.2,y);c.lineTo(px+gap-u*1.2,y);c.stroke();}c.restore();});
      if(t>7.5){c.globalAlpha=g*eo((t-7.5)/1);tx("extremt rena rum",cx,a.y+a.h*.14,"#9be3b0","center",Math.max(19,s*.052),700);}
      c.restore();}};

  /* 5 · hårstrå mot transistor */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,8.1,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const w=Math.min(a.w*.7,s*1.3),lx=cx-w/2,y=cy-s*.08;
      const q=eo((t-2.8)/1);c.fillStyle="#d9c7a8";c.fillRect(lx,y,w*q,Math.max(26,s*.07));tx("hårstrå",lx,y-Math.max(12,s*.03),"#d9c7a8","left",Math.max(15,s*.04),700);
      if(t>4.5){const q2=eo((t-4.5)/1);c.globalAlpha=g*q2;c.fillStyle="#ffd23c";c.fillRect(lx,y+Math.max(90,s*.2),Math.max(2,w/10000*4)+2,Math.max(8,s*.02));tx("transistor",lx+Math.max(16,s*.04),y+Math.max(90,s*.2)+Math.max(8,s*.02)+Math.max(26,s*.06),"#ffd86b","left",Math.max(15,s*.04),700);}
      if(t>6){c.globalAlpha=g*eo((t-6)/1);tx("tiotusentals gånger smalare",cx,a.y+a.h*.88,"#cfd8ff","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 6 · antal transistorer, Moores lag */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,17.8,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      if(t<12.3){const w=Math.min(a.w*.78,s*1.45),lx=cx-w/2,y1=cy-s*.12,y2=cy+s*.06,bh=Math.max(28,s*.07),lg=v=>Math.log10(v)/10;
        const k1=eo((t-6.4)/1.4);c.fillStyle="#9fd0ff";c.fillRect(lx,y1,w*lg(2300)*k1,bh);tx("1971: drygt 2 000",lx,y1-Math.max(10,s*.026),"#9fd0ff","left",Math.max(15,s*.04),700);
        const k2=eo((t-3)/2.5);c.fillStyle="#ffd23c";c.fillRect(lx,y2,w*lg(1e10)*k2,bh);tx("mobilchip: över 10 000 000 000",lx,y2-Math.max(10,s*.026),"#ffd86b","left",Math.max(15,s*.04),700);
        tx("(skalan växer 10 gånger per steg)",cx,a.y+a.h*.88,"rgba(255,255,255,.55)","center",Math.max(12,s*.03),600);}
      else{const q=eo((t-12.3)/1),r=Math.max(16,s*.04);c.globalAlpha=g*q;tx("× 2 vartannat år",cx,a.y+a.h*.18,"#ffd86b","center",Math.max(30,s*.085),700);for(let i=0;i<6;i++){const px=cx+(i-2.5)*r*3.2,sz=r*(.6+i*.35);c.fillStyle="#9fd0ff";c.fillRect(px-sz/2,cy+r*2-sz,sz,sz);}tx("Moores lag",cx,cy+r*3.4,"#cfd8ff","center",Math.max(18,s*.048),700);}
      c.restore();}};

  /* 7 · därför är allt smart: mobil, bil, magnetkamera */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(6,t,7.7,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const u=Math.max(20,Math.min(a.w*.045,s*.055));
      const q1=eo((t-2.8)/.7),q2=eo((t-3.8)/.7),q3=eo((t-4.8)/.7);
      c.globalAlpha=g*q1;c.fillStyle="#e8ecf4";c.fillRect(cx-a.w*.24-u*.7,cy-u*1.4,u*1.4,u*2.8);c.fillStyle="#4a7ad9";c.fillRect(cx-a.w*.24-u*.55,cy-u*1.2,u*1.1,u*2.2);tx("mobil",cx-a.w*.24,cy+u*3,"#fff","center",Math.max(15,s*.04),700);
      c.globalAlpha=g*q2;c.fillStyle="#d1383a";c.fillRect(cx-u*1.8,cy-u*.3,u*3.6,u*1.1);c.beginPath();c.moveTo(cx-u*1,cy-u*.3);c.lineTo(cx-u*.5,cy-u*1);c.lineTo(cx+u*.7,cy-u*1);c.lineTo(cx+u*1.2,cy-u*.3);c.closePath();c.fill();dot(cx-u*1,cy+u*.8,u*.35,"#222");dot(cx+u*1,cy+u*.8,u*.35,"#222");tx("bil",cx,cy+u*3,"#fff","center",Math.max(15,s*.04),700);
      c.globalAlpha=g*q3;c.strokeStyle="#cfd5df";c.lineWidth=u*.5;c.beginPath();c.arc(cx+a.w*.24,cy,u*1.4,0,TAU);c.stroke();c.fillStyle="#7a8190";c.fillRect(cx+a.w*.24-u*.4,cy+u*.2,u*.8,u*.9);tx("magnetkamera",cx+a.w*.24,cy+u*3,"#fff","center",Math.max(15,s*.04),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
