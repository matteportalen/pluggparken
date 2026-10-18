/* Norrsken: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/norrsken/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/norrsken-1..6.jpg. MPNorrskenFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.1,cap:[[0.5,"Gröna slingor dansar på natthimlen. Det här är berättelsen om norrskenet."]]},
 {k:"01 · Ljus på natthimlen",d:8,cap:[[0.8,"Norrsken är gröna, ibland rosa eller lila, ljusa slingor som dansar på natthimlen."]]},
 {k:"02 · Solvinden",d:6.4,cap:[[0.8,"Solen skickar ut små laddade partiklar hela tiden. De kallas solvind."]]},
 {k:"03 · Magnetfältet",d:5.1,cap:[[0.8,"Jorden har ett magnetfält som leder partiklarna mot polerna."]]},
 {k:"04 · Krock i luften",d:7.2,cap:[[0.8,"Partiklarna krockar med luften högt upp. Då lyser gasen, som i ett lysrör."]]},
 {k:"05 · Färgerna",d:6,cap:[[0.8,"Syre ger grönt och ibland rött. Kväve kan ge blått och lila."]]},
 {k:"06 · I Sverige",d:8.2,cap:[[0.8,"Bäst syns norrsken i norra Sverige, till exempel i Kiruna, en klar och mörk vinternatt."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Norrsken",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Nästa gång himlen är klar och mörk, titta norrut. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: U.S. Air Force (norrsken över Eielson, Alaska) · Public domain · Wikimedia Commons",2:"Bild: NASA's Scientific Visualization Studio (solutbrott 2024) · Public domain",3:"Bild: ESA (jordens magnetosfär) · CC BY-SA 3.0 IGO · Wikimedia Commons",4:"Foto: NASA (norrsken från rymden) · Public domain · Wikimedia Commons",5:"Foto: NASA Johnson Space Center · Public domain · Wikimedia Commons",6:"Foto: Tamura (Kiruna) · CC0 · Wikimedia Commons"};

window.MPNorrskenFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"norrsken",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"norrsken-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  /* norrskensridåer: tre band som vågar sig över himlen. al = styrka */
  const aurora=(a,t,al)=>{const c=x();c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=al==null?1:al;c.globalCompositeOperation="lighter";
    [["80,255,150",.46,0],["200,90,255",.38,1.6],["80,220,255",.54,3.1]].forEach(([rgb,by,ph],i)=>{const base=a.y+a.h*by,step=Math.max(6,a.w/90),top=[],bot=[];
      for(let px=a.x;px<=a.x+a.w+step;px+=step){const q=(px-a.x)/a.w,h=a.h*(.2+.07*Math.sin(q*7+t*.7+ph)+.04*Math.sin(q*17-t*1.3+ph)),b=base+a.h*.06*Math.sin(q*4+t*.5+ph);top.push([px,b-h]);bot.push([px,b+a.h*.03]);}
      const g=c.createLinearGradient(0,base-a.h*.3,0,base+a.h*.06);g.addColorStop(0,`rgba(${rgb},0)`);g.addColorStop(.7,`rgba(${rgb},.3)`);g.addColorStop(1,`rgba(${rgb},0)`);c.fillStyle=g;
      c.beginPath();top.forEach((p,k)=>k?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));for(let k=bot.length-1;k>=0;k--)c.lineTo(bot[k][0],bot[k][1]);c.closePath();c.fill();
      c.strokeStyle=`rgba(${rgb},.16)`;c.lineWidth=1;for(let k=0;k<top.length;k+=3){c.beginPath();c.moveTo(top[k][0],top[k][1]);c.lineTo(bot[k][0],bot[k][1]);c.stroke();}});
    c.restore();};
  const ground=(a,col)=>{const c=x();c.save();c.fillStyle=col||"#06080f";c.beginPath();c.moveTo(a.x,a.y+a.h);c.lineTo(a.x,a.y+a.h*.88);const r=L.srand(3);for(let i=0;i<=24;i++){c.lineTo(a.x+a.w*i/24,a.y+a.h*(.84+r()*.08));}c.lineTo(a.x+a.w,a.y+a.h);c.closePath();c.fill();c.restore();};
  const earthDisc=(px,py,r)=>{const c=x();c.save();const g=c.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,"#5ba7e8");g.addColorStop(1,"#12427d");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};

  const s0=(t)=>{photo(1,t,7.1,1.12,.2);const f=title(t,"NORRSKEN","DANSANDE LJUS PÅ NATTHIMLEN","#9bffc0");cred(1,.55*f);};

  /* 1 · Ljus på natthimlen: foto, sedan ridåer över ett landskap */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(6,t,8,1.08,.1+.4*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);aurora(a,t,eo((t-3.2)/1.2));ground(a);c.restore();}};

  /* 2 · Solvinden: partiklar från solen mot jorden */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,6.4,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const R=Math.min(a.h*.3,a.w*.18),sx=a.x+R*.3,sy=cy;const sg=c.createRadialGradient(sx,sy,R*.2,sx,sy,R*1.5);sg.addColorStop(0,"#fff2a8");sg.addColorStop(.4,"#ffb43c");sg.addColorStop(1,"rgba(255,140,40,0)");c.fillStyle=sg;c.beginPath();c.arc(sx,sy,R*1.5,0,TAU);c.fill();
      const ex=a.x+a.w*.86,er=Math.max(14,Math.min(a.w,a.h)*.06);earthDisc(ex,sy,er);
      const r=L.srand(5);c.fillStyle="#ffe9a0";for(let i=0;i<60;i++){const ang=(r()-.5)*.9,sp=60+r()*70,ph=(t*sp+r()*a.w)%(ex-sx),px=sx+ph,py=sy+Math.tan(ang)*ph*.35+Math.sin(t+i)*4;if(px>ex-er)continue;c.globalAlpha=g*(.3+.6*Math.min(1,ph/(a.w*.2)));c.beginPath();c.arc(px,py,2.2,0,TAU);c.fill();}
      c.globalAlpha=g;tx("solvind",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(20,s*.055),700);tx("Solen",sx+R*.4,sy+R*1.7,"#ffd0a0","center",Math.max(13,s*.032),700);tx("Jorden",ex,sy+er+Math.max(24,s*.055),"#9fd0ff","center",Math.max(13,s*.032),700);
      c.restore();}};

  /* 3 · Magnetfältet: fältlinjer och partiklar mot polerna */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,5.1,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const R=Math.min(a.w*.12,a.h*.17),py=cy;earthDisc(cx,py,R);
      const lines=[1.8,2.5,3.3];c.strokeStyle="rgba(130,190,255,.55)";c.lineWidth=2;
      lines.forEach(Lr=>[-1,1].forEach(d=>{c.beginPath();for(let i=0;i<=40;i++){const th=.18+(Math.PI-.36)*i/40,r=Lr*R*Math.sin(th)*Math.sin(th),px=cx+d*Math.sin(th)*r*1.6,py2=py-Math.cos(th)*r*1.6;if(i===0)c.moveTo(px,py2);else c.lineTo(px,py2);}c.stroke();}));
      // partiklar som följer fältlinjerna mot polerna
      c.fillStyle="#9bffc0";lines.forEach((Lr,li)=>[-1,1].forEach((d,di)=>{for(let k=0;k<3;k++){const u=((t*.18+k/3+li*.2+di*.5)%1),th=.18+(Math.PI-.36)*u,r=Lr*R*Math.sin(th)*Math.sin(th),px=cx+d*Math.sin(th)*r*1.6,py2=py-Math.cos(th)*r*1.6;c.beginPath();c.arc(px,py2,3,0,TAU);c.fill();}}));
      tx("magnetfält",cx,a.y+a.h*.12,"#9fd0ff","center",Math.max(20,s*.055),700);tx("nordpolen",cx,py-R*1.1-Math.max(8,s*.02),"#fff","center",Math.max(12,s*.028),600);
      c.restore();}};

  /* 4 · Krock i luften: partiklar träffar gas och lyser */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,7.2,1.1,.1+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const by=cy+s*.02,bh=Math.max(60,s*.2),w=Math.min(a.w*.84,s*1.6),lx=cx-w/2;
      const gl=c.createLinearGradient(0,by-bh/2,0,by+bh/2);gl.addColorStop(0,"rgba(80,255,150,0)");gl.addColorStop(.5,"rgba(80,255,150,.22)");gl.addColorStop(1,"rgba(80,255,150,0)");c.fillStyle=gl;c.fillRect(lx,by-bh/2,w,bh);
      const r=L.srand(9);c.fillStyle="rgba(200,230,255,.7)";for(let i=0;i<70;i++){c.beginPath();c.arc(lx+r()*w,by-bh/2+r()*bh,2,0,TAU);c.fill();}
      for(let i=0;i<14;i++){const ph=r()*3,px=lx+r()*w,cyc=(t*.8+ph)%2.2,top=a.y+a.h*.12,hit=by-bh*.1+r()*bh*.4,y=lerp(top,hit,cl(cyc/1.3,0,1));
        if(cyc<1.3){c.strokeStyle="#ffe9a0";c.lineWidth=2.5;c.beginPath();c.moveTo(px,y-14);c.lineTo(px,y);c.stroke();}else{const k=cl((cyc-1.3)/.9,0,1),gg=c.createRadialGradient(px,hit,0,px,hit,24*k+4);gg.addColorStop(0,`rgba(140,255,190,${.9*(1-k)})`);gg.addColorStop(1,"rgba(140,255,190,0)");c.fillStyle=gg;c.beginPath();c.arc(px,hit,24*k+4,0,TAU);c.fill();}}
      tx("partiklar krockar med gas och den lyser",cx,a.y+a.h*.88,"#9bffc0","center",Math.max(15,s*.04),700);
      c.restore();}};

  /* 5 · Färgerna: gas och höjd */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,6,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const w=Math.min(a.w*.78,s*1.5),lx=cx-w/2,top=a.y+a.h*.2,rowH=Math.max(44,s*.12),items=[["Syre högt upp","rött","#ff5a5a",3.2],["Syre","grönt","#5affa0",3.8],["Kväve","blått och lila","#a07aff",4.4]];
      items.forEach(([gas,col,rgb,st],i)=>{const q=eo((t-st)/.8);if(q<=0)return;const y=top+i*rowH*1.25;c.save();c.globalAlpha=g*q;const gr=c.createLinearGradient(lx,0,lx+w,0);gr.addColorStop(0,"rgba(255,255,255,.06)");gr.addColorStop(1,rgb);c.fillStyle=gr;c.beginPath();c.roundRect?c.roundRect(lx,y,w,rowH,14):c.rect(lx,y,w,rowH);c.fill();tx(gas,lx+18,y+rowH*.62,"#fff","left",Math.max(17,rowH*.38),700);tx(col,lx+w-18,y+rowH*.62,"#fff","right",Math.max(17,rowH*.38),700);c.restore();});
      c.restore();}};

  /* 6 · I Sverige: Kiruna, klart, mörkt, vinter */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();photo(6,t,8.2,1.1,.2);cred(6,.55);
    const items=[["Kiruna","#9bffc0"],["klart","#cfe8ff"],["mörkt","#cfe8ff"],["vinter","#cfe8ff"]],y=a.y+a.h*.14,pw=Math.min(a.w*.2,s*.34);
    items.forEach(([n,col],i)=>{const q=eo((t-2-i*.9)/.8);if(q<=0)return;const px=cx+(i-1.5)*(pw+10);c.save();c.globalAlpha=q;c.fillStyle="rgba(6,10,22,.78)";c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.roundRect?c.roundRect(px-pw/2,y,pw,Math.max(40,s*.1),12):c.rect(px-pw/2,y,pw,Math.max(40,s*.1),12);c.fill();c.stroke();tx(n,px,y+Math.max(26,s*.065),col,"center",Math.max(15,s*.04),700);c.restore();});};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
