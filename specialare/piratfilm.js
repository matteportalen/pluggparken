/* Pirater: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/pirater/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/pirater-1..6.jpg. MPPiratFilm.start(host,{overlay,onClose}). Ljudmatta: vågor. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.7,cap:[[0.5,"Svarta flaggor och snabba skepp. Det här är berättelsen om piraterna."]]},
 {k:"01 · Sjörövare",d:5.9,cap:[[0.8,"Pirater är sjörövare som anfaller fartyg och stjäl det de har ombord."]]},
 {k:"02 · Guldåldern",d:8.4,cap:[[0.8,"Den mest kända tiden för pirater var omkring 1650 till 1730, särskilt i Karibien."]]},
 {k:"03 · Jolly Roger",d:8,cap:[[0.8,"Piraterna hade ofta en svart flagga med dödskalle, kallad Jolly Roger, för att skrämma andra."]]},
 {k:"04 · Kända pirater",d:7.8,cap:[[0.8,"Svartskägg hette egentligen Edward Teach."],[3.8,"Anne Bonny och Mary Read var två kvinnliga pirater."]]},
 {k:"05 · Sanning och myter",d:8.2,cap:[[0.8,"De grävde nästan aldrig ner skatter och lät ingen gå på plankan."],[5.1,"Det mesta kommer från böcker och filmer."]]},
 {k:"06 · Pirater i dag",d:9.1,cap:[[0.8,"Pirater finns fortfarande, bland annat utanför Somalias kust. I dag använder de små snabba motorbåtar."]]}
];
const META={mat:"vagor",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Pirater",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Verklighetens pirater var inte som i filmerna. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Målning efter Ambroise Louis Garneray · Public domain · Wikimedia Commons",2:"Karta över Karibiska kusten · Public domain · Wikimedia Commons",3:"Foto: Friedrich Haag · CC BY-SA 4.0 · Wikimedia Commons",4:"Kopparstick av Edward Teach, Joseph Nicholls · Public domain · Wikimedia Commons",5:"Foto: N. Elladee · CC0 · Wikimedia Commons",6:"Foto: Nick-D · CC BY-SA 3.0 · Wikimedia Commons"};

window.MPPiratFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"pirater",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"pirater-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,sea,title}=L;
  const SEAS=["rgba(16,46,86,.72)","rgba(10,34,68,.8)","rgba(6,22,48,.9)"];

  const flag=(px,py,w,h,t)=>{const c=x();c.save();c.strokeStyle="#6b4a20";c.lineWidth=Math.max(3,h*.05);c.beginPath();c.moveTo(px,py-h*.1);c.lineTo(px,py+h*1.4);c.stroke();
    c.fillStyle="#0b0b0f";c.beginPath();c.moveTo(px,py);const n=14;for(let i=0;i<=n;i++){const q=i/n;c.lineTo(px+q*w,py+Math.sin(q*5-t*4)*h*.06*q);}for(let i=n;i>=0;i--){const q=i/n;c.lineTo(px+q*w,py+h+Math.sin(q*5-t*4)*h*.06*q);}c.closePath();c.fill();
    const cx=px+w*.5,cy=py+h*.42,r=h*.2;c.fillStyle="#f2efe6";c.beginPath();c.arc(cx,cy,r,0,TAU);c.fill();c.fillRect(cx-r*.55,cy+r*.5,r*1.1,r*.8);
    c.fillStyle="#0b0b0f";c.beginPath();c.arc(cx-r*.38,cy-r*.05,r*.24,0,TAU);c.arc(cx+r*.38,cy-r*.05,r*.24,0,TAU);c.fill();c.beginPath();c.moveTo(cx,cy+r*.1);c.lineTo(cx-r*.1,cy+r*.4);c.lineTo(cx+r*.1,cy+r*.4);c.fill();for(let i=-1;i<=1;i++){c.fillRect(cx+i*r*.28-1,cy+r*.7,2,r*.5);}
    c.strokeStyle="#f2efe6";c.lineWidth=Math.max(3,h*.05);c.lineCap="round";c.beginPath();c.moveTo(cx-r*1.3,cy+r*1.6);c.lineTo(cx+r*1.3,cy+r*2.4);c.moveTo(cx+r*1.3,cy+r*1.6);c.lineTo(cx-r*1.3,cy+r*2.4);c.stroke();c.restore();};
  /* mindre piratskepp (trekantssegel) och handelsfartyg (fyrkantssegel), bog åt höger */
  const sloop=(cx,gy,Ln,col,sails)=>{const c=x(),u=Ln/100;c.save();c.fillStyle=col;c.beginPath();c.moveTo(cx-42*u,gy-8*u);c.quadraticCurveTo(cx-30*u,gy+4*u,cx-8*u,gy+5*u);c.lineTo(cx+24*u,gy+5*u);c.quadraticCurveTo(cx+40*u,gy,cx+48*u,gy-12*u);c.closePath();c.fill();
    c.strokeStyle="#4a3118";c.lineWidth=Math.max(2,1.6*u);c.beginPath();c.moveTo(cx,gy-8*u);c.lineTo(cx,gy-60*u);c.stroke();c.fillStyle=sails;
    if(sails==="#222"||sails==="#1a1a22"){c.beginPath();c.moveTo(cx+2*u,gy-58*u);c.quadraticCurveTo(cx+30*u,gy-34*u,cx+34*u,gy-12*u);c.lineTo(cx+2*u,gy-12*u);c.closePath();c.fill();c.beginPath();c.moveTo(cx-2*u,gy-52*u);c.lineTo(cx-28*u,gy-14*u);c.lineTo(cx-2*u,gy-14*u);c.closePath();c.fill();}
    else{for(let i=0;i<2;i++){const sy=gy-58*u+i*24*u;c.beginPath();c.moveTo(cx-20*u,sy);c.quadraticCurveTo(cx,sy+4*u,cx+20*u,sy);c.lineTo(cx+18*u,sy+20*u);c.quadraticCurveTo(cx,sy+24*u,cx-18*u,sy+20*u);c.closePath();c.fill();}}
    c.restore();};

  const s0=(t)=>{photo(1,t,6.7,1.12,.3);const f=title(t,"PIRATERNA","SJÖROVARE I SVART FLAGGA","#ffcf8a");cred(1,.55*f);};

  /* 1 · Sjörövare: pirater jagar ett handelsfartyg */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-1.6)/1);photo(1,t,5.9,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[.6,"#5a4a63"],[.72,"#d98a4a"],[.721,"#0e2540"],[1,"#061423"]]);
      const gy=a.y+a.h*.7,p=cl((t-2)/3.6,0,1),Lm=Math.min(a.w*.3,a.h*.5),Lp=Lm*.72,mx=a.x+a.w*.62+p*a.w*.05,px=lerp(a.x+a.w*.1,a.x+a.w*.4,eo(p));
      sloop(mx,gy+Math.sin(t*1.4)*2,Lm,"#7a5a34","#efe6d2");sloop(px,gy+Math.sin(t*1.8)*2,Lp,"#222","#1a1a22");
      sea(a,gy,t,SEAS,3);
      for(let i=0;i<4;i++){c.strokeStyle=`rgba(255,255,255,${.3-i*.06})`;c.lineWidth=2;c.beginPath();c.moveTo(px-Lp*.55-i*14,gy+i*3-6);c.lineTo(px-Lp*.55-i*14-28,gy+i*3-6);c.stroke();}
      tx("pirater",px,a.y+a.h*.2,"#ff9a8a","center",Math.max(15,s*.038),700);tx("handelsfartyg",mx,a.y+a.h*.2,"#9fd0ff","center",Math.max(15,s*.038),700);
      c.restore();}};

  /* 2 · Guldåldern: karta, sedan tidslinje */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(2,t,8.4,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.84,s*1.6),lx=cx-w/2,y=cy-s*.04,bh=Math.max(24,s*.07),px=yr=>lx+(yr-1600)/150*w;
      [[1600,"1600"],[1650,"1650"],[1700,"1700"],[1750,"1750"]].forEach(([yr,l])=>{c.strokeStyle="rgba(255,255,255,.3)";c.lineWidth=1.5;c.beginPath();c.moveTo(px(yr),y-8);c.lineTo(px(yr),y+bh+8);c.stroke();tx(l,px(yr),y+bh+Math.max(30,s*.065),"rgba(255,255,255,.75)","center",Math.max(12,s*.03),600);});
      c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y,w,bh);const k=eo((t-3.6)/2);c.fillStyle="#ffcf8a";c.fillRect(px(1650),y,(px(1730)-px(1650))*k,bh);
      tx("Piraternas guldålder",(px(1650)+px(1730))/2,y-14,"#ffd86b","center",Math.max(16,s*.042),700);
      if(t>5.6){const q=eo((t-5.6)/1);c.globalAlpha=g*q;tx("särskilt i Karibien",cx,y+bh+Math.max(80,s*.17),"#9be3b0","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 3 · Jolly Roger */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,8,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#2a3a58"]]);
      const w=Math.min(a.w*.46,s*.8),h=w*.62;flag(cx-w*.5,cy-h*.85,w,h,t);
      tx("Jolly Roger",cx,cy+h*.9+Math.max(10,s*.03),"#ffd86b","center",Math.max(20,s*.055),700);
      if(t>4.4){const q=eo((t-4.4)/1);c.globalAlpha=g*q;tx("för att skrämma andra",cx,cy+h*.9+Math.max(46,s*.11),"#cfd8ff","center",Math.max(15,s*.038),700);}
      c.restore();}};

  /* 4 · Kända pirater */
  const plate=(px,py,w,h,l1,l2,col,al)=>{const c=x();c.save();c.globalAlpha=al;c.fillStyle="rgba(6,10,22,.85)";c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,12):c.rect(px-w/2,py-h/2,w,h);c.fill();c.stroke();tx(l1,px,py-h*.05,col,"center",Math.max(15,h*.3),700);tx(l2,px,py+h*.32,"rgba(255,255,255,.8)","center",Math.max(12,h*.22),600);c.restore();};
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();photo(4,t,7.8,1.08,.2);cred(4,.55);
    const pw=Math.min(a.w*.8,s*1.2),ph=Math.max(52,s*.13),y1=a.y+a.h*.66;
    plate(cx,y1,pw,ph,"Svartskägg","hette egentligen Edward Teach","#ffd86b",eo((t-1.6)/1));
    if(t>3.8){plate(cx-pw*.26,y1+ph*1.25,pw*.48,ph*.85,"Anne Bonny","kvinnlig pirat","#9fd0ff",eo((t-4.2)/1));plate(cx+pw*.26,y1+ph*1.25,pw*.48,ph*.85,"Mary Read","kvinnlig pirat","#9fd0ff",eo((t-5)/1));}};

  /* 5 · Sanning och myter */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(5,t,8.2,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const items=[["Nedgrävd skatt",1.2],["Gå på plankan",2.4]],y0=a.y+a.h*.26,gap=Math.max(70,s*.17);
      items.forEach(([n,st],i)=>{const q=eo((t-3.8-i*1.2)/.8);if(q<=0)return;const y=y0+i*gap;c.save();c.globalAlpha=g*q;tx(n,cx,y,"#fff","center",Math.max(20,s*.055),700);const tw=c.measureText(n).width;const k=cl((t-4.4-i*1.2)/.5,0,1);c.strokeStyle="#ff6b5e";c.lineWidth=4;c.beginPath();c.moveTo(cx-tw/2-8,y-8);c.lineTo(cx-tw/2-8+(tw+16)*k,y-8);c.stroke();c.restore();});
      if(t>5.1){const q=eo((t-5.1)/1);c.globalAlpha=g*q;const by=y0+2*gap+Math.max(10,s*.03),bs=Math.max(34,s*.09);
        c.fillStyle="#d9b878";c.fillRect(cx-bs*1.6,by-bs*.5,bs*.9,bs*1.1);c.fillStyle="rgba(0,0,0,.35)";for(let i=0;i<4;i++)c.fillRect(cx-bs*1.5,by-bs*.3+i*bs*.22,bs*.7,2);
        c.fillStyle="#2a2f45";c.fillRect(cx+bs*.7,by-bs*.5,bs*1.1,bs*1.0);c.fillStyle="#ffd86b";for(let i=0;i<4;i++)c.fillRect(cx+bs*.7+i*bs*.28,by-bs*.5,bs*.14,bs*.2);
        tx("böcker och filmer",cx,by+bs*1.35,"#ffd86b","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 6 · Pirater i dag: motorbåt */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(6,t,9.1,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[.6,"#5a4a63"],[.72,"#d98a4a"],[.721,"#0e2540"],[1,"#061423"]]);
      const gy=a.y+a.h*.7,Ln=Math.min(a.w*.34,s*.6),u=Ln/100,bx=cx+Math.sin(t*.8)*a.w*.04;
      sea(a,gy,t,SEAS,3);
      c.fillStyle="#cfd5df";c.beginPath();c.moveTo(bx-46*u,gy-6*u+Math.sin(t*6)*1.5);c.lineTo(bx+44*u,gy-8*u);c.lineTo(bx+30*u,gy+6*u);c.lineTo(bx-46*u,gy+6*u);c.closePath();c.fill();c.fillStyle="#7a8190";c.fillRect(bx-10*u,gy-18*u,26*u,12*u);c.fillStyle="#222";c.fillRect(bx-46*u,gy-4*u,6*u,10*u);
      for(let i=0;i<10;i++){c.fillStyle=`rgba(255,255,255,${.5*(1-i/10)})`;c.beginPath();c.arc(bx-50*u-i*12*u,gy+6*u+Math.sin(t*5+i)*2,3+i*.6,0,TAU);c.fill();}
      tx("liten och snabb motorbåt",cx,a.y+a.h*.2,"#ffd86b","center",Math.max(16,s*.042),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
