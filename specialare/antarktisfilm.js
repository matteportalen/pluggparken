/* Antarktis: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/antarktis/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/antarktis-1..6.jpg. MPAntarktisFilm.start(host,{overlay,onClose}). Ljudmatta: vind (standardljudet). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:8.4,cap:[[0.5,"Längst ner på jorden finns en kontinent som är nästan helt täckt av is. Det här är berättelsen om Antarktis."]]},
 {k:"01 · Mest is",d:6.8,cap:[[0.8,"Antarktis är en kontinent längst ner på jorden, där nästan allt är täckt av is."]]},
 {k:"02 · Tjock is",d:8.7,cap:[[0.8,"Isen är i genomsnitt över två kilometer tjock."],[4.6,"På vissa ställen är den nästan fem kilometer."]]},
 {k:"03 · Jordens kallaste",d:9.6,cap:[[0.8,"Den lägsta temperaturen som någonsin har mätts på jorden, ungefär minus 89 grader, mättes i Antarktis."]]},
 {k:"04 · Djuren",d:10.6,cap:[[0.8,"Pingviner bor där, och många andra djur lever i havet runt omkring."],[6.0,"Men inga isbjörnar. De bor i Arktis, längst upp."]]},
 {k:"05 · Ingen bor där",d:7.6,cap:[[0.8,"Det finns inga människor som bor där hela livet, bara forskare som stannar i några månader eller ett år."]]},
 {k:"06 · Fred och forskning",d:6.6,cap:[[0.8,"Länder har kommit överens om att Antarktis ska användas för fred och forskning."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Antarktis",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Antarktis är en av jordens sista stora vildmarker. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: NASA/Christy Hansen · Public domain · Wikimedia Commons",2:"Foto: Larsen-ishyllan · Public domain · Wikimedia Commons",3:"Foto: Spetser007 (Vostokstationen) · CC BY-SA 4.0 · Wikimedia Commons",4:"Foto: Christopher Michel · CC BY 2.0 · Wikimedia Commons",5:"Foto: U.S. Department of State (McMurdostationen) · Public domain · Wikimedia Commons",6:"Foto: Tsy1980 (monument över Antarktisfördraget) · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPAntarktisFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"antarktis",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"antarktis-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,man,title}=L;
  const penguin=(px,gy,h)=>{const c=x();c.save();c.fillStyle="#10141f";c.beginPath();c.ellipse(px,gy-h*.5,h*.3,h*.5,0,0,TAU);c.fill();c.fillStyle="#f4f4f4";c.beginPath();c.ellipse(px+h*.03,gy-h*.42,h*.2,h*.36,0,0,TAU);c.fill();c.fillStyle="#f2b707";c.beginPath();c.moveTo(px+h*.1,gy-h*.78);c.lineTo(px+h*.28,gy-h*.72);c.lineTo(px+h*.1,gy-h*.68);c.fill();c.fillStyle="#fff";c.beginPath();c.arc(px+h*.06,gy-h*.8,h*.04,0,TAU);c.fill();c.fillStyle="#f2b707";c.fillRect(px-h*.16,gy-h*.02,h*.14,h*.04);c.fillRect(px+h*.02,gy-h*.02,h*.14,h*.04);c.restore();};
  const bear=(px,gy,h)=>{const c=x();c.save();c.fillStyle="#f2f2ee";c.beginPath();c.ellipse(px,gy-h*.42,h*.5,h*.28,0,0,TAU);c.fill();c.beginPath();c.ellipse(px+h*.52,gy-h*.52,h*.2,h*.14,.2,0,TAU);c.fill();c.beginPath();c.arc(px+h*.46,gy-h*.64,h*.05,0,TAU);c.fill();c.fillRect(px-h*.38,gy-h*.3,h*.12,h*.3);c.fillRect(px+h*.2,gy-h*.3,h*.12,h*.3);c.fillStyle="#10141f";c.beginPath();c.arc(px+h*.68,gy-h*.54,h*.03,0,TAU);c.fill();c.restore();};

  const s0=(t)=>{photo(1,t,8.4,1.12,.3);const f=title(t,"ANTARKTIS","JORDENS ISKALLA KONTINENT","#cfe8ff");cred(1,.55*f);};

  /* 1 · Mest is: jorden ovanifrån med isen */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.8)/1.1);photo(2,t,6.8,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const R=Math.min(a.w*.36,a.h*.36),py=cy-s*.02;
      const og=c.createRadialGradient(cx-R*.3,py-R*.3,R*.1,cx,py,R);og.addColorStop(0,"#2c6aa8");og.addColorStop(1,"#0d2c52");c.fillStyle=og;c.beginPath();c.arc(cx,py,R,0,TAU);c.fill();
      const rnd=L.srand(12),k=eo((t-3.4)/1.8);c.fillStyle="#f2f7ff";c.beginPath();for(let i=0;i<=40;i++){const an=i/40*TAU,rr=R*(.46+.1*Math.sin(an*3+1)+.05*Math.sin(an*7)+(rnd()-.5)*.02)*k;const px=cx+Math.cos(an)*rr,pY=py+Math.sin(an)*rr;if(i===0)c.moveTo(px,pY);else c.lineTo(px,pY);}c.closePath();c.fill();
      c.fillStyle="#ff6b5e";c.beginPath();c.arc(cx,py,Math.max(4,R*.03),0,TAU);c.fill();
      tx("Sydpolen",cx,py+Math.max(24,R*.14),"#10223e","center",Math.max(13,s*.032),700);
      if(t>5){const q=eo((t-5)/1);c.globalAlpha=g*q;tx("nästan allt är is",cx,a.y+a.h*.1,"#fff","center",Math.max(18,s*.048),700);}
      c.restore();}};

  /* 2 · Tjock is: staplar mot Kebnekaise */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(1,t,8.7,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const H=Math.min(a.h*.6,s*.8),base=a.y+a.h*.8,w=Math.min(a.w*.5,s*.9),lx=cx-w/2,yv=km=>base-H*km/5,bw=w*.2;
      tg("Isens tjocklek",cx,a.y+a.h*.1,"#7fd6ff","center");
      c.strokeStyle="rgba(255,255,255,.3)";c.lineWidth=1.5;c.beginPath();c.moveTo(lx-20,base);c.lineTo(lx+w+20,base);c.stroke();
      [0,1,2,3,4,5].forEach(k=>{c.fillStyle="rgba(255,255,255,.6)";c.font=font(600,Math.max(11,s*.026));c.textAlign="right";c.fillText(k+" km",lx-26,yv(k)+4);c.fillRect(lx-20,yv(k),8,1.5);});
      const k1=eo((t-3.2)/1.2);c.fillStyle="#cfe8ff";c.fillRect(lx+w*.18,base-H*2.1/5*k1,bw,H*2.1/5*k1);if(k1>.9)tx("över 2 km",lx+w*.18+bw/2,base+Math.max(26,s*.058),"#cfe8ff","center",Math.max(13,s*.032),700);
      const k2=eo((t-5)/1.4);c.fillStyle="#7ec8ff";c.fillRect(lx+w*.62,base-H*4.8/5*k2,bw,H*4.8/5*k2);if(k2>.9)tx("nästan 5 km",lx+w*.62+bw/2,base+Math.max(26,s*.058),"#7ec8ff","center",Math.max(13,s*.032),700);
      if(k1>.9){c.setLineDash([6,6]);c.strokeStyle="#ffd86b";c.lineWidth=2;c.beginPath();c.moveTo(lx,yv(2.1));c.lineTo(lx+w+20,yv(2.1));c.stroke();c.setLineDash([]);tx("lika högt som Kebnekaise",lx+w+24,yv(2.1)+4,"#ffd86b","left",Math.max(12,s*.028),700);}
      c.restore();}};

  /* 3 · Jordens kallaste: termometer mot −89° */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(3,t,9.4,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d1f3d"],[1,"#1e3a63"]]);
      const th=Math.min(a.h*.62,s*.8),tw=Math.max(26,s*.07),tx0=cx-(port?0:a.w*.12),ty=a.y+a.h*.16,yv=v=>ty+th*(1-(v+100)/130);
      c.fillStyle="rgba(255,255,255,.15)";c.beginPath();c.roundRect?c.roundRect(tx0-tw/2,ty,tw,th,tw/2):c.rect(tx0-tw/2,ty,tw,th);c.fill();
      const cur=lerp(10,-89,eo((t-4)/3.2));c.fillStyle="#7ec8ff";c.fillRect(tx0-tw*.28,yv(cur),tw*.56,ty+th-yv(cur));c.beginPath();c.arc(tx0,ty+th+tw*.1,tw*.7,0,TAU);c.fill();
      c.fillStyle="rgba(255,255,255,.8)";c.font=font(600,Math.max(11,s*.028));c.textAlign="left";[-100,-80,-60,-40,-20,0,20].forEach(v=>{c.fillRect(tx0+tw*.6,yv(v),8,1.5);c.fillText(v+"°",tx0+tw*.6+14,yv(v)+4);});
      tx(Math.round(cur)+"°",tx0,ty-14,"#7ec8ff","center",Math.max(26,s*.075),700);
      if(t>7.2){const q=eo((t-7.2)/1);c.globalAlpha=g*q;const wx=port?cx:cx+a.w*.22;tx("Rekord på jorden",wx,a.y+a.h*.42,"#ffd86b","center",Math.max(17,s*.045),700);tx("Antarktis",wx,a.y+a.h*.42+Math.max(30,s*.07),"#fff","center",Math.max(15,s*.038),700);}
      c.restore();}};

  /* 4 · Djuren: pingvin i söder, isbjörn i norr */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.8)/1.1);photo(4,t,10.6,1.1,.1+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const R=Math.min(a.w*.24,a.h*.3),py=cy+s*.05,hh=Math.max(40,R*.45);
      const og=c.createRadialGradient(cx-R*.3,py-R*.3,R*.1,cx,py,R);og.addColorStop(0,"#2c6aa8");og.addColorStop(1,"#0d2c52");c.fillStyle=og;c.beginPath();c.arc(cx,py,R,0,TAU);c.fill();
      c.fillStyle="#f2f7ff";c.beginPath();c.ellipse(cx,py+R*.9,R*.38,R*.2,0,Math.PI,TAU);c.fill();c.beginPath();c.ellipse(cx,py-R*.9,R*.34,R*.18,0,0,Math.PI);c.fill();
      const k1=eo((t-4.4)/1);c.globalAlpha=g*k1;penguin(cx,py+R*.9+hh*.2,hh);tx("Antarktis · pingviner",cx,py+R+Math.max(28,s*.065),"#9fd0ff","center",Math.max(14,s*.034),700);
      if(t>6.2){const k2=eo((t-6.2)/1);c.globalAlpha=g*k2;bear(cx-hh*.1,py-R*.9+hh*.15,hh);tx("Arktis · isbjörnar",cx,py-R-Math.max(18,s*.05),"#ffd0a0","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 5 · Ingen bor där: forskare en tid */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(5,t,7.6,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const gy=cy+s*.02,hm=Math.max(40,s*.13),dx=Math.min(a.w*.12,s*.2);
      for(let i=0;i<5;i++){const q=eo((t-3.5-i*.3)/.6);if(q<=0)continue;c.globalAlpha=g*q;man(cx+(i-2)*dx,gy,hm,"#e8eef7",t+i,i%2===0);}
      c.globalAlpha=g;tx("forskare",cx,gy+Math.max(30,s*.07),"#ffd86b","center",Math.max(18,s*.048),700);
      if(t>5){const q=eo((t-5)/1),w=Math.min(a.w*.7,s*1.1),bx=cx-w/2,by=gy+Math.max(70,s*.17);c.globalAlpha=g*q;for(let i=0;i<12;i++){c.fillStyle=i<4?"#7ec8ff":i<12?"rgba(126,200,255,.35)":"";c.fillRect(bx+i*w/12+1,by,w/12-2,Math.max(16,s*.04));}tx("några månader eller ett år",cx,by+Math.max(42,s*.1),"#cfe8ff","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 6 · Fred och forskning */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();photo(6,t,6.6,1.1,.3);cred(6,.55);
    const f=eo((t-2.2)/1);if(f>0){c.save();c.globalAlpha=f;c.fillStyle="rgba(6,10,22,.74)";c.fillRect(a.x,cy-s*.1,a.w,s*.2);tx("Fred och forskning",cx,cy+s*.02,"#fff","center",Math.max(22,s*.065),700);c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
