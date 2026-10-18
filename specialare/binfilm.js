/* Bin och honung: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/bin/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/bin-1..6.jpg. MPBinFilm.start(host,{overlay,onClose}). Ljudmatta: trädgården (vind och fågelkvitter). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.3,cap:[[0.5,"Ett litet bi gör ett stort jobb. Det här är berättelsen om bin och honung."]]},
 {k:"01 · Ett stort samhälle",d:9.3,cap:[[0.8,"I en bikupa kan det bo 20 000 till 60 000 bin."],[5.3,"De jobbar tillsammans som en enda stor familj."]]},
 {k:"02 · En drottning",d:6.3,cap:[[0.8,"I varje kupa finns en drottning som lägger ägg, ibland över tusen om dagen."]]},
 {k:"03 · Dansen",d:9.3,cap:[[0.8,"När ett bi hittar blommor dansar det inne i kupan."],[4.6,"Dansens riktning och längd visar de andra var maten finns."]]},
 {k:"04 · Honung",d:9.9,cap:[[0.8,"Bina gör honung av nektar från blommor."],[3.8,"Ett enda bi gör bara ungefär en tolftedels tesked under hela sitt liv."]]},
 {k:"05 · Bina hjälper oss",d:7.6,cap:[[0.8,"Bin för över pollen mellan blommor. Utan dem skulle många frukter och grönsaker inte bli till."]]},
 {k:"06 · Hjälp bina",d:6.6,cap:[[0.8,"Du kan hjälpa bin genom att plantera blommor och inte klippa gräsmattan så ofta."]]}
];
const META={mat:"tradgarden",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Bin och honung",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Små bin gör stora saker för oss alla. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: U.S. Geological Survey (drottning) · Public domain · Wikimedia Commons",2:"Foto: Levi Asay (drottning i kupan) · CC BY-SA 3.0 · Wikimedia Commons",3:"Foto: Bob Peterson (bidans) · CC BY-SA 2.0 · Wikimedia Commons",4:"Foto: Vyacheslav Argenberg (honung) · CC BY 4.0 · Wikimedia Commons",5:"Foto: Vlasenko (bi på blomma) · CC BY-SA 3.0 · Wikimedia Commons",6:"Foto: Kapteinkos (bi på blomma) · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPBinFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"bin",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"bin-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,title}=L;
  const bee=(px,py,r,t,queen)=>{const c=x();c.save();c.translate(px,py);const fl=Math.sin(t*40)*.25;
    c.fillStyle="rgba(210,235,255,.65)";c.beginPath();c.ellipse(-r*.1,-r*.7,r*.55,r*.3,-.5+fl,0,TAU);c.fill();c.beginPath();c.ellipse(r*.25,-r*.7,r*.55,r*.3,.2-fl,0,TAU);c.fill();
    c.fillStyle=queen?"#ffb830":"#ffd23c";c.beginPath();c.ellipse(0,0,r*1.1,r*.7,0,0,TAU);c.fill();
    c.save();c.beginPath();c.ellipse(0,0,r*1.1,r*.7,0,0,TAU);c.clip();c.fillStyle="#1d1a14";[-.5,.15].forEach(o=>c.fillRect(r*o-r*.14,-r,r*.28,r*2));c.restore();
    c.fillStyle="#1d1a14";c.beginPath();c.arc(r*1.1,-r*.05,r*.4,0,TAU);c.fill();c.fillStyle="#fff";c.beginPath();c.arc(r*1.22,-r*.15,r*.1,0,TAU);c.fill();
    if(queen){c.fillStyle="#ffd86b";c.beginPath();c.moveTo(r*.7,-r*.65);c.lineTo(r*.8,-r*1.2);c.lineTo(r*1.0,-r*.85);c.lineTo(r*1.2,-r*1.2);c.lineTo(r*1.3,-r*.65);c.closePath();c.fill();}
    c.restore();};
  const hex=(px,py,r,fill,stroke)=>{const c=x();c.beginPath();for(let i=0;i<6;i++){const an=Math.PI/6+i*TAU/6;const X=px+Math.cos(an)*r,Y=py+Math.sin(an)*r;if(i)c.lineTo(X,Y);else c.moveTo(X,Y);}c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}};
  const comb=(a,r,fillFn)=>{const w=r*Math.sqrt(3);for(let row=0;row*r*1.5<a.h+r;row++)for(let col=0;col*w<a.w+w;col++){const px=a.x+col*w+(row%2?w/2:0),py=a.y+row*r*1.5;hex(px,py,r*.94,fillFn?fillFn(col,row):"#c98b1e","#8a5a10");}};
  const hive=(a,t,al)=>{const c=x();c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=al==null?1:al;grad(a,[[0,"#3a2608"],[1,"#5a3a0c"]]);comb(a,Math.max(18,Math.min(a.w,a.h)*.06),(col,row)=>`rgba(255,${180+((col*7+row*13)%40)},60,${.55+((col*3+row*5)%4)*.1})`);c.restore();};

  const s0=(t)=>{photo(6,t,6.3,1.12,.25);const f=title(t,"BIN OCH HONUNG","ETT LITET BI GÖR ETT STORT JOBB","#ffe27a");cred(6,.55*f);};

  /* 1 · Ett stort samhälle: kupa full av bin */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,9.3,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;hive(a,t,1);
      const n=Math.round(60*eo((t-2.8)/2.4)),r=L.srand(41);for(let i=0;i<n;i++){const bx=a.x+r()*a.w,by=a.y+r()*a.h*.8,ph=r()*6;bee(bx+Math.sin(t*1.5+ph)*12,by+Math.cos(t*1.2+ph)*9,Math.max(5,s*.016),t+i);}
      c.fillStyle="rgba(6,10,22,.78)";c.fillRect(cx-s*.5,a.y+a.h*.06,s*1.0,Math.max(46,s*.12));tx("20 000 – 60 000 bin",cx,a.y+a.h*.06+Math.max(32,s*.085),"#ffe27a","center",Math.max(22,s*.06),700);
      if(t>5.4){const q=eo((t-5.4)/1);c.globalAlpha=g*q;c.fillStyle="rgba(6,10,22,.78)";c.fillRect(cx-s*.5,a.y+a.h*.8,s*1.0,Math.max(40,s*.1));tx("en enda stor familj",cx,a.y+a.h*.8+Math.max(28,s*.07),"#fff","center",Math.max(18,s*.048),700);}
      c.restore();}};

  /* 2 · En drottning: ägg i cellerna */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,6.3,1.1,.1+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;const k=cl((t-3)/3,0,1),eggs=Math.round(1200*k);
      hive(a,t,1);c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();const r=Math.max(18,Math.min(a.w,a.h)*.06),w=r*Math.sqrt(3),rn=L.srand(17);
      for(let row=0;row*r*1.5<a.h+r;row++)for(let col=0;col*w<a.w+w;col++){if(rn()<k*.8){const px=a.x+col*w+(row%2?w/2:0),py=a.y+row*r*1.5;c.fillStyle="#fff7e0";c.beginPath();c.ellipse(px,py,r*.22,r*.4,0,0,TAU);c.fill();}}
      bee(cx+Math.sin(t*.8)*a.w*.08,cy+Math.cos(t*.6)*a.h*.06,Math.max(14,s*.045),t,true);
      c.fillStyle="rgba(6,10,22,.78)";c.fillRect(cx-s*.5,a.y+a.h*.06,s*1.0,Math.max(46,s*.12));tx((eggs>1000?"över 1 000":eggs)+" ägg på en dag",cx,a.y+a.h*.06+Math.max(32,s*.085),"#fff7e0","center",Math.max(20,s*.055),700);
      c.restore();}};

  /* 3 · Dansen: åttan, och kartan till blommorna */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(3,t,9.3,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;hive(a,t,1);
      const R=Math.min(a.h*.2,a.w*.13),dx=port?cx:cx-a.w*.2,dy=port?cy-a.h*.12:cy;
      c.fillStyle="rgba(6,10,22,.55)";c.beginPath();c.arc(dx,dy,R*1.9,0,TAU);c.fill();
      // vaggdans: åtta med rakt streck i mitten (lutar 30° mot lodrätt)
      const ang=.5,u=(t*.5)%1,loop=(q)=>{const side=q<.5?-1:1,qq=(q%.5)/.5;return qq<.4?[0,lerp(-R*.8,R*.8,qq/.4)]:[side*R*.7*Math.sin((qq-.4)/.6*Math.PI),R*.8-(qq-.4)/.6*R*1.6];};
      const pts=[];for(let i=0;i<=60;i++)pts.push(loop(i/60*.999));c.save();c.translate(dx,dy);c.rotate(ang);c.strokeStyle="rgba(255,226,122,.5)";c.lineWidth=3;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();const bp=loop(u*.999);bee(bp[0],bp[1],Math.max(8,R*.17),t);c.restore();
      // karta: kupa -> blommor i dansens riktning och längd
      if(t>4.6){const q=eo((t-4.6)/1.2),mx=port?cx:cx+a.w*.22,my=port?cy+a.h*.28:cy;c.globalAlpha=g*q;c.fillStyle="#7ac36a";c.fillRect(mx-a.w*.14,my+R*.8,a.w*.28,3);c.fillStyle="#d98a2a";c.beginPath();c.arc(mx-a.w*.1,my+R*.8-8,10,0,TAU);c.fill();
        const fx=mx-a.w*.1+Math.sin(ang)*a.w*.2,fy=my+R*.8-8-Math.cos(ang)*R*1.4;c.strokeStyle="#ffe27a";c.setLineDash([6,6]);c.lineWidth=2.5;c.beginPath();c.moveTo(mx-a.w*.1,my+R*.8-8);c.lineTo(fx,fy);c.stroke();c.setLineDash([]);
        [0,1,2,3,4].forEach(i=>{c.fillStyle=["#ff6a8a","#ffd23c","#ff9a3c","#c07aff","#ff6a8a"][i];c.beginPath();c.arc(fx+Math.cos(i*1.26)*10,fy+Math.sin(i*1.26)*10,7,0,TAU);c.fill();});c.fillStyle="#ffd23c";c.beginPath();c.arc(fx,fy,5,0,TAU);c.fill();
        tx("riktning och längd",mx,my-R*1.7,"#fff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 4 · Honung: en tolftedels tesked */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2)/1.1);photo(4,t,9.9,1.1,.1+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const R=Math.min(a.w*.14,a.h*.2),sx=cx-(port?0:a.w*.14),sy=cy-s*.02;
      if(t>2.4){const q=eo((t-2.4)/1);c.globalAlpha=g*q;for(let i=0;i<3;i++){const bx=sx+(i-1)*R*1.4,by=a.y+a.h*.2+((t*50+i*60)%60);c.fillStyle="#ffcf3a";c.beginPath();c.moveTo(bx,by-12);c.quadraticCurveTo(bx+9,by+6,bx,by+10);c.quadraticCurveTo(bx-9,by+6,bx,by-12);c.fill();}tx("nektar → honung",sx,a.y+a.h*.12,"#ffe27a","center",Math.max(17,s*.045),700);}
      // tesked delad i 12
      if(t>3.8){const q=eo((t-3.8)/1);c.globalAlpha=g*q;const spx=cx+(port?0:a.w*.14),spy=cy+(port?s*.1:0);
        c.fillStyle="#d8dde6";c.beginPath();c.ellipse(spx,spy,R,R*.62,0,0,TAU);c.fill();c.fillRect(spx+R*.85,spy-R*.06,R*1.2,R*.12);
        const n=12;for(let i=0;i<n;i++){const an0=i*TAU/n-Math.PI/2,an1=(i+1)*TAU/n-Math.PI/2;c.fillStyle=i===0?"#ffb81f":"#ece6d4";c.beginPath();c.moveTo(spx,spy);c.ellipse(spx,spy,R*.88,R*.55,0,an0,an1);c.closePath();c.fill();c.strokeStyle="rgba(0,0,0,.25)";c.lineWidth=1;c.stroke();}
        tx("1/12 tesked",spx,spy+R*1.1+Math.max(20,s*.05),"#ffd86b","center",Math.max(18,s*.05),700);tx("under hela livet",spx,spy+R*1.1+Math.max(48,s*.11),"#fff","center",Math.max(14,s*.036),700);}
      c.restore();}};

  /* 5 · Bina hjälper oss: pollen mellan blommor, sedan frukt */
  const flower=(px,py,r,col)=>{const c=x();c.save();c.strokeStyle="#4c9a3f";c.lineWidth=Math.max(3,r*.18);c.beginPath();c.moveTo(px,py);c.lineTo(px,py+r*3);c.stroke();c.fillStyle=col;for(let i=0;i<6;i++){c.beginPath();c.arc(px+Math.cos(i*TAU/6)*r*.7,py+Math.sin(i*TAU/6)*r*.7,r*.5,0,TAU);c.fill();}c.fillStyle="#ffd23c";c.beginPath();c.arc(px,py,r*.4,0,TAU);c.fill();c.restore();};
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,7.6,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#a9d2f0"],[1,"#d8ecf8"]]);const gy=a.y+a.h*.82;c.fillStyle="#6cae5a";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
      const fr=Math.max(14,s*.045),f1=[cx-a.w*.24,gy-fr*3.4],f2=[cx+a.w*.24,gy-fr*3.4];flower(f1[0],f1[1],fr,"#ff6a8a");flower(f2[0],f2[1],fr,"#c07aff");
      const p=(Math.sin((t-3)*1.1)+1)/2,bx=lerp(f1[0],f2[0],p),by=f1[1]-fr*1.3-Math.sin(p*Math.PI)*fr*1.5;
      bee(bx,by,Math.max(8,s*.026),t);c.fillStyle="#ffd23c";for(let i=0;i<4;i++){c.beginPath();c.arc(bx-6+i*3,by+8+i*3,2,0,TAU);c.fill();}
      tx("pollen",cx,a.y+a.h*.16,"#10223e","center",Math.max(18,s*.05),700);
      if(t>5){const q=eo((t-5)/1);c.globalAlpha=g*q;["#e84a4a","#7ac36a","#ff9a3c"].forEach((col,i)=>{const px=cx+(i-1)*s*.2,py=cy+s*.02;c.fillStyle=col;c.beginPath();c.arc(px,py,Math.max(14,s*.045),0,TAU);c.fill();c.fillStyle="#3a7a2a";c.fillRect(px-2,py-Math.max(14,s*.045)-8,4,9);});tx("frukter och grönsaker",cx,cy+s*.02+Math.max(56,s*.12),"#10223e","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 6 · Hjälp bina: blommor som växer, gräs som får stå */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2)/1.1);photo(6,t,6.6,1.1,.1+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#a9d2f0"],[1,"#d8ecf8"]]);const gy=a.y+a.h*.74;c.fillStyle="#6cae5a";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
      const r=L.srand(11),n=8;for(let i=0;i<n;i++){const px=a.x+a.w*(.1+.8*i/(n-1)),k=eo((t-2.6-i*.25)/.8);if(k<=0)continue;const fr=Math.max(10,s*.032)*k;flower(px,gy-fr*3.5*k,fr,["#ff6a8a","#ffd23c","#c07aff","#ff9a3c"][i%4]);}
      [["plantera blommor",2.6],["klipp gräset mer sällan",4.2]].forEach(([tt,st],i)=>{const q=eo((t-st)/.8);if(q<=0)return;c.save();c.globalAlpha=g*q;c.fillStyle="rgba(6,10,22,.78)";const w=Math.min(a.w*.8,s*1.2),y=a.y+a.h*.08+i*Math.max(56,s*.13);c.beginPath();c.roundRect?c.roundRect(cx-w/2,y,w,Math.max(44,s*.1),14):c.rect(cx-w/2,y,w,Math.max(44,s*.1));c.fill();tx(tt,cx,y+Math.max(30,s*.07),"#ffe27a","center",Math.max(18,s*.05),700);c.restore();});
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
