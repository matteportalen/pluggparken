/* Krakatau 1883: minilektionen som film (åtta scener, ca 1,7 minuter), gamla bilder och foton ur Wikimedia Commons blandade med egen grafik (canvas). Sakligt.
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/krakatau/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/krakatau-1..7.jpg. MPKrakatauFilm.start(host,{overlay,onClose}). Ljudmatta: vulkan. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.1,cap:[[0.5,"En ö som sprängdes och förändrade himlen över hela jorden. Det här är berättelsen om Krakatau."]]},
 {k:"01 · En vulkanö",d:10.6,cap:[[0.8,"Krakatau var en vulkanö i Indonesien, mellan Java och Sumatra. I augusti 1883 började den få utbrott."]]},
 {k:"02 · Fyra explosioner",d:16.7,cap:[[0.8,"Den 27 augusti kom fyra jättelika explosioner."],[4.8,"Den sista hördes över 4 500 kilometer bort, ungefär lika långt som från Stockholm till Dubai. Kanske det högsta ljud människor någonsin har hört."]]},
 {k:"03 · Aska 70 km upp",d:9.5,cap:[[0.8,"Askan sköts upp mer än 70 kilometer, långt upp i atmosfären. På dagen blev det mörkt som natt."]]},
 {k:"04 · Tsunamier",d:8.9,cap:[[0.8,"Explosionerna skapade tsunamier som var över 30 meter höga."],[5.5,"Mer än 36 000 människor omkom."]]},
 {k:"05 · Tryckvågen",d:13.1,cap:[[0.8,"Tryckvågen i luften gick flera varv runt jorden och syntes på mätinstrument över hela världen."],[8.2,"Nyheten nådde världen med telegraf, redan inom några timmar."]]},
 {k:"06 · Röda solnedgångar",d:16.8,cap:[[0.8,"Askan i atmosfären gjorde solnedgångarna röda och starka i flera år. Jordens medeltemperatur sjönk ungefär en grad under ett år."],[10.5,"Vissa tror att den röda himlen syns i Edvard Munchs målning Skriet."]]},
 {k:"07 · Krakataus barn",d:11.8,cap:[[0.8,"Ön sprängdes nästan helt. 1927 steg en ny vulkan upp ur havet på platsen."],[7.8,"Den kallas Anak Krakatau, Krakataus barn."]]}
];
const META={mat:"vulkan",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Krakatau 1883",under:"En film i åtta steg · ca 1,7 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Naturens krafter kan påverka hela jorden. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Sjökort över Sundasundet, 1851 · Public domain · UK Hydrographic Office via Wikimedia Commons",2:"Litografi av Krakatauutbrottet · Public domain · Parker & Coward via Wikimedia Commons",3:"Foto: James St. John (pimpsten från utbrottet 1883) · CC BY 2.0 · Wikimedia Commons",4:"Kollage över händelserna 1883 · CC0 · Wikimedia Commons",5:"Foto: James St. John (pimpsten) · CC BY 2.0 · Wikimedia Commons",6:"Bild ur boken Java and her neighbours · Internet Archive Book Images · Wikimedia Commons",7:"Foto: Copernicus Sentinel-2 (Anak Krakatau) · CC BY 4.0 · Wikimedia Commons"};

window.MPKrakatauFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"krakatau",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"krakatau-",names:[1,2,3,4,5,6,7],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,deep,sea,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,Math.max(.1,r));g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();c.restore();};
  const sparks=(px,py,r,t,n,col)=>{const Rr=L.srand(19);for(let i=0;i<n;i++){const an=-Math.PI/2+(Rr()-.5)*2.4,sp=.5+Rr()*.9,q=((t*sp*.6+Rr())%1),d=r*q*(1.4+Rr());gl(px+Math.cos(an)*d,py+Math.sin(an)*d+q*q*r*.8,Math.max(3,r*.07)*(1-q),col||`rgba(255,${150+Math.floor(80*Rr())},60,${(.9*(1-q)).toFixed(2)})`);}};
  const SEAS=["rgba(16,70,110,.8)","rgba(10,50,90,.85)","rgba(6,34,66,.9)"];
  const volcano=(px,py,u,col,smoke,t)=>{const c=x();c.save();const vg=c.createLinearGradient(0,py-u*2.6,0,py);vg.addColorStop(0,"#6a5444");vg.addColorStop(1,"#2e2018");c.fillStyle=vg;c.beginPath();c.moveTo(px-u*3,py);c.lineTo(px-u*.5,py-u*2.6);c.lineTo(px+u*.5,py-u*2.6);c.lineTo(px+u*3,py);c.closePath();c.fill();
    if(smoke){gl(px,py-u*2.6,u*3.2,"rgba(255,120,40,.55)");c.strokeStyle="rgba(255,150,50,.8)";c.lineWidth=Math.max(1.5,u*.1);c.shadowColor="#ff8a30";c.shadowBlur=12;for(let k=-1;k<=1;k+=2){c.beginPath();c.moveTo(px+k*u*.3,py-u*2.6);c.quadraticCurveTo(px+k*u*1.2,py-u*1.4,px+k*u*(1.5+.3*Math.sin(t*2)),py);c.stroke();}c.shadowBlur=0;
      for(let i=0;i<12;i++){const p=((t*.4+i/12)%1);c.fillStyle=`rgba(${90+Math.floor(70*(1-p))},${80+Math.floor(30*(1-p))},${90},${.6*(1-p)})`;c.beginPath();c.arc(px+Math.sin(i*2+t)*u*.5*p,py-u*2.6-p*u*5,u*(.5+p*1.5),0,TAU);c.fill();if(p<.35)gl(px+Math.sin(i*2+t)*u*.5*p,py-u*2.6-p*u*5,u*(.9+p*2),"rgba(255,130,40,"+(.35*(1-p/.35)).toFixed(2)+")");}
      sparks(px,py-u*2.6,u*3,t,16);}
    c.restore();};

  const s0=(t)=>{photo(2,t,7.1,1.12,.3);const f=title(t,"KRAKATAU","EN Ö SOM SPRANG I LUFTEN","#ffb878");cred(2,.55*f);};

  /* 1 · en vulkanö mellan Java och Sumatra */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,10.6,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d3b63"],[1,"#07233f"]]);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2;
      c.fillStyle="#3d6b3a";c.beginPath();c.ellipse(lx+w*.14,cy-s*.04,w*.12,s*.14,.4,0,TAU);c.fill();c.beginPath();c.ellipse(lx+w*.86,cy+s*.06,w*.14,s*.12,-.3,0,TAU);c.fill();
      tx("Sumatra",lx+w*.14,cy-s*.04,"#fff","center",Math.max(14,s*.036),700);tx("Java",lx+w*.86,cy+s*.06,"#fff","center",Math.max(14,s*.036),700);
      const u=Math.max(10,s*.026);volcano(cx,cy+s*.06,u,"#5a4636",t>4.5,t);dot(cx,cy+s*.06,0,"#fff");tx("Krakatau",cx,cy+s*.06+Math.max(32,s*.075),"#ffd86b","center",Math.max(17,s*.045),700);
      c.restore();}};

  /* 2 · fyra explosioner, ljudet nådde 4 500 km */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,16.7,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1a1020"],[1,"#2a1a18"]]);
      if(t<4.8){const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,r=Math.max(22,s*.06);for(let i=0;i<4;i++){const q=eo((t-2.8-i*.5)/.5);if(q<=0)continue;const px=lx+w*(.15+i*.23);c.globalAlpha=g*q;const gr=c.createRadialGradient(px,cy,0,px,cy,r*2);gr.addColorStop(0,"rgba(255,200,100,.9)");gr.addColorStop(1,"rgba(255,100,30,0)");c.fillStyle=gr;c.beginPath();c.arc(px,cy,r*2,0,TAU);c.fill();gl(px,cy,r*(3+(1-q)*3),"rgba(255,170,80,.45)");sparks(px,cy,r*3,t-i*.5,14);tx(String(i+1),px,cy+r*.5,"#fff","center",Math.max(24,r*1.2),700);}}
      else{const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy;const k=eo((t-5.2)/4);c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=3;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();
        dot(lx,y,8,"#ffb878");tx("Krakatau",lx,y+Math.max(32,s*.07),"#ffb878","center",Math.max(14,s*.036),700);
        for(let i=0;i<4;i++){const p=((k*1.2+i*.12)%1)*k;c.save();c.shadowColor="#ffd070";c.shadowBlur=14;c.strokeStyle=`rgba(255,226,122,${.8*(1-p)})`;c.lineWidth=3;c.beginPath();c.arc(lx,y,w*p,-.6,.6);c.stroke();c.restore();}gl(lx,y,s*.1*(1+.2*Math.sin(t*6)),"rgba(255,170,70,.6)");
        if(t>9.5){c.globalAlpha=g*eo((t-9.5)/1);dot(lx+w,y,8,"#9fd0ff");tx("hördes här: ca 4 500 km",lx+w,y+Math.max(32,s*.07),"#9fd0ff","center",Math.max(14,s*.036),700);tx("≈ Stockholm–Dubai",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(20,s*.055),700);}}
      c.restore();}};

  /* 3 · askhöjd */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,9.5,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#06080f"],[.45,"#1a2a4a"],[1,"#8fb8e8"]]);const top=a.y+a.h*.08,bot=a.y+a.h*.9,H=bot-top,m=km=>bot-km/80*H,px=cx-Math.min(a.w*.2,s*.3);
      [[0,"0"],[10,"10 km"],[20,"20"],[40,"40"],[60,"60"],[80,"80 km"]].forEach(([km,l])=>{c.strokeStyle="rgba(255,255,255,.3)";c.lineWidth=1.5;c.beginPath();c.moveTo(px+30,m(km));c.lineTo(px+60,m(km));c.stroke();tx(l,px+70,m(km)+5,"rgba(255,255,255,.85)","left",Math.max(12,s*.03),600);});
      const k=eo((t-3)/3),yy=lerp(bot,m(70),k);const gr=c.createLinearGradient(0,bot,0,yy);gr.addColorStop(0,"rgba(150,120,100,.9)");gr.addColorStop(1,"rgba(90,90,100,.5)");c.fillStyle=gr;c.beginPath();c.moveTo(px-18,bot);c.lineTo(px-6,yy);c.lineTo(px+6,yy);c.lineTo(px+18,bot);c.closePath();c.fill();gl(px,bot,s*.25,"rgba(255,120,40,.5)");{const Rr=L.srand(23);for(let i=0;i<46;i++){const q=((t*.35+Rr())%1)*k,X=px+(Rr()-.5)*(30+q*120),Y=lerp(bot,yy,q);gl(X,Y,10+q*26,`rgba(${110+Math.floor(60*(1-q))},${100+Math.floor(30*(1-q))},110,${.3*(1-q*.4)})`);}gl(px,yy,s*.22*k,"rgba(150,150,170,.25)");}
      tx("askan: över 70 km",px,yy-Math.max(18,s*.04),"#ffd86b","center",Math.max(16,s*.042),700);tx("flygplan 10 km",px+Math.max(150,s*.3),m(10)+5,"#cfd8ff","left",Math.max(12,s*.03),600);
      c.restore();}};

  /* 4 · tsunami mot byggnad */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,8.9,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0e2540"],[1,"#061423"]]);const gy=a.y+a.h*.8,u=Math.max(8,Math.min(a.h,a.w)*.016);
      c.fillStyle="#b8b0a0";c.fillRect(cx-u*5,gy-u*10,u*3.4,u*10);for(let r=0;r<10;r++)for(let q=0;q<2;q++){c.fillStyle="#7a8190";c.fillRect(cx-u*4.6+q*u*1.4,gy-u*9.6+r*u,u*.8,u*.6);}
      tx("10 våningar ≈ 30 m",cx-u*3.3,gy-u*10-Math.max(16,s*.04),"#cfd8ff","center",Math.max(13,s*.034),700);
      const k=eo((t-3)/2.2);c.fillStyle="rgba(40,120,190,.88)";c.beginPath();c.moveTo(a.x,gy);for(let i=0;i<=40;i++){const px=a.x+a.w*(i/40);const hgt=u*30*Math.exp(-Math.pow((i/40-(.1+k*.5))*3,2))*(.4+.6*k);c.lineTo(px,gy-hgt+Math.sin(i*.8+t*4)*3);}c.lineTo(a.x+a.w,gy);c.closePath();c.fill();
      tx("över 30 m",a.x+a.w*(.1+k*.5),gy-u*30*(.4+.6*k)-Math.max(14,s*.034),"#9fd0ff","center",Math.max(17,s*.045),700);
      c.restore();}};

  /* 5 · tryckvågen runt jorden, telegraf */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,13.1,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0a1224"],[1,"#162240"]]);const R=Math.max(40,Math.min(a.w*.18,a.h*.3,s*.34));
      if(t<8.2){{const cv=window.MPKlot&&MPKlot.jorden(300+t*6);gl(cx,cy,R*1.5,"rgba(110,170,255,.25)");if(cv)c.drawImage(cv,cx-R,cy-R,R*2,R*2);else{c.fillStyle="#1d5fb8";c.beginPath();c.arc(cx,cy,R,0,TAU);c.fill();}gl(cx-R*.45,cy+R*.1,R*.2,"rgba(255,170,70,.9)");dot(cx-R*.45,cy+R*.1,4,"#fff2c0");}
        for(let i=0;i<4;i++){const p=((t*.18+i*.22)%1);c.save();c.shadowColor="#ffd070";c.shadowBlur=12;c.strokeStyle=`rgba(255,226,122,${.7*(1-p)})`;c.lineWidth=3;c.beginPath();c.arc(cx,cy,R*(1.05+p*.7),0,TAU);c.stroke();c.restore();}
        tx("tryckvågen gick flera varv runt jorden",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(16,s*.042),700);}
      else{const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy;c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=3;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();for(let i=0;i<=10;i++){const px=lx+w*i/10;c.beginPath();c.moveTo(px,y);c.lineTo(px,y+14);c.stroke();}
        const k=cl((t-8.4)/3,0,1);dot(lx+w*k,y,8,"#ffe27a");tx("telegraf",cx,y-Math.max(36,s*.08),"#ffd86b","center",Math.max(20,s*.055),700);tx("inom några timmar",cx,y+Math.max(50,s*.11),"#cfd8ff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 6 · röda solnedgångar, temperatur, Skriet (teori) */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,16.8,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#3a0a18"],[.35,"#c93a2a"],[.62,"#f0a050"],[.621,"#1a0e0a"],[1,"#0a0604"]]);
      const gy=a.y+a.h*.62;gl(cx,gy-s*.03,s*.55,"rgba(255,140,50,.5)");gl(cx,gy-s*.03,s*.2,"rgba(255,230,150,.6)");dot(cx,gy-s*.03,Math.max(26,s*.07),"#ffd23c");{const Rr=L.srand(51);for(let i=0;i<50;i++){const X=a.x+((Rr()+t*.01*(.5+Rr()))%1)*a.w,Y=a.y+Rr()*gy*.95;gl(X,Y,6+Rr()*10,"rgba(160,60,40,.12)");}}
      if(t<10.5){const w=Math.min(a.w*.16,s*.2),th=a.h*.34,tx0=a.x+a.w*.12,top=a.y+a.h*.12;c.fillStyle="rgba(255,255,255,.18)";c.fillRect(tx0,top,18,th);const f=eo((t-4)/2);c.fillStyle="#4aa8ff";c.fillRect(tx0,top+th*(.35+.2*f),18,th*(.65-.2*f));tx("−1 °C",tx0+36,top+th*.55,"#fff","left",Math.max(20,s*.055),700);tx("under ett år",tx0+36,top+th*.55+Math.max(30,s*.065),"#cfd8ff","left",Math.max(13,s*.034),600);}
      else{c.strokeStyle="rgba(255,90,60,.8)";c.lineWidth=5;for(let i=0;i<5;i++){c.beginPath();for(let u=0;u<=40;u++){const px=a.x+a.w*u/40,py=a.y+a.h*(.18+i*.07)+Math.sin(u*.5+i+t*1.2)*10;u?c.lineTo(px,py):c.moveTo(px,py);}c.stroke();}c.globalAlpha=g*eo((t-10.5)/1);tx("Munch · Skriet (en teori)",cx,gy+Math.max(60,s*.13),"#ffd86b","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 7 · Anak Krakatau växer upp ur havet */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(7,t,11.8,1.1,.15+.5*g);cred(7,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[.6,"#5a4a63"],[.7,"#d98a4a"],[.701,"#0e2540"],[1,"#061423"]]);const gy=a.y+a.h*.7,u=Math.max(10,Math.min(a.w*.03,s*.04));
      tx("1883",cx-a.w*.25,a.y+a.h*.14,"#ffb878","center",Math.max(22,s*.06),700);
      const k=eo((t-3)/4.5);if(k>0){volcano(cx+a.w*.12,gy+2,u*1.3*k+.01,"#4a3a2e",t>7.8,t);}
      sea(a,gy,t,SEAS,3);
      if(t>4){c.globalAlpha=g*eo((t-4)/1);tx("1927",cx+a.w*.12,a.y+a.h*.14,"#9be3b0","center",Math.max(22,s*.06),700);}
      if(t>7.8){c.globalAlpha=g*eo((t-7.8)/1);tx("Anak Krakatau",cx+a.w*.12,gy+Math.max(60,s*.14),"#ffd86b","center",Math.max(17,s*.045),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
