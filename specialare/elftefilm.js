/* 11 september 2001: minilektionen som film (sju scener, ca 1,5 minuter). Mycket sakligt och varsamt: inga bilder på attackerna, bara tornen före, hjälparna, säkerheten och minnesmärket.
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/elfte/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/elfte-1..6.jpg. MPElfteFilm.start(host,{overlay,onClose}). Ljudmatta: klockor. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.5,cap:[[0.5,"En tisdag som världen aldrig glömt. Det här är berättelsen om den 11 september 2001."]]},
 {k:"01 · En tisdag",d:12.3,cap:[[0.8,"Den 11 september attackerades USA av terrorister som kapade fyra flygplan."],[6.2,"Det är en sorglig historia, men den handlar också om hjälp och sammanhållning."]]},
 {k:"02 · Tvillingtornen",d:10.5,cap:[[0.8,"I New York stod tvillingtornen i World Trade Center. De var drygt 400 meter höga, mer än dubbelt så höga som Turning Torso."]]},
 {k:"03 · Fler platser",d:11.1,cap:[[0.8,"Attackerna drabbade också Pentagon nära Washington, och ett fjärde plan störtade på ett fält i Pennsylvania."],[8.0,"Nästan 3 000 människor dog."]]},
 {k:"04 · Hjälparna",d:12.3,cap:[[0.8,"Brandmän, poliser och många andra sprang mot faran för att hjälpa. Mer än 300 brandmän dog."],[8.5,"Människor över hela världen visade medkänsla."]]},
 {k:"05 · Ny säkerhet",d:13.2,cap:[[0.8,"Efter attackerna ändrades säkerheten på flygplatser över hela världen. Därför går vi idag igenom säkerhetskontroller."],[8.4,"Cockpitdörrarna förstärktes, och de hålls låsta under flygning."]]},
 {k:"06 · Minnesmärket",d:13.9,cap:[[0.8,"På platsen i New York finns nu ett minnesmärke med två stora fontäner, där tornen stod. Namnen på alla som dog finns inristade."],[10.2,"Minnesmärket öppnade tio år efter attackerna."]]}
];
const META={mat:"klockor",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"11 september 2001",under:"En film i sju steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Vi minns dem som dog, och dem som hjälpte. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: 小林 良規 (Nedre Manhattan före 2001) · CC BY-SA 4.0 · Wikimedia Commons",2:"Foto: Carol M. Highsmith (World Trade Center) · Public domain · Wikimedia Commons",3:"Foto: U.S. Navy (Pentagons minnesmärke) · Public domain · Wikimedia Commons",4:"Foto: Leonard F. DeFrancisci (minnesmärke för brandmän) · CC BY-SA 3.0 · Wikimedia Commons",5:"Foto: DaHuzyBru (säkerhetskontroll på en flygplats) · CC BY-SA 4.0 · Wikimedia Commons",6:"Foto: Tomwsulcer (minnesmärkets fontän) · CC0 · Wikimedia Commons"};

window.MPElfteFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"elfte",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"elfte-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const person=(px,py,u,col)=>{const c=x();c.save();c.fillStyle=col;c.beginPath();c.arc(px,py-u*1.5,u*.5,0,TAU);c.fill();c.beginPath();c.moveTo(px-u*.8,py+u*1.2);c.lineTo(px-u*.45,py-u*.8);c.lineTo(px+u*.45,py-u*.8);c.lineTo(px+u*.8,py+u*1.2);c.closePath();c.fill();c.restore();};

  const s0=(t)=>{photo(1,t,7.5,1.12,.3);const f=title(t,"11 SEPTEMBER","EN DAG SOM VÄRLDEN MINNS","#cfd8ff");cred(1,.55*f);};

  /* 1 · kalender, sedan sammanhållning */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(1,t,12.3,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);
      if(t<6.2){const w=Math.min(a.w*.36,s*.62),h=w*.9,lx=cx-w/2,y=cy-h/2;c.fillStyle="#f2efe6";c.fillRect(lx,y,w,h);c.fillStyle="#b83a3a";c.fillRect(lx,y,w,h*.22);tx("SEPTEMBER 2001",cx,y+h*.15,"#fff","center",Math.max(14,w*.08),700);tx("11",cx,y+h*.68,"#1d2b53","center",Math.max(60,w*.4),700);tx("tisdag",cx,y+h*.9,"#4a5a7a","center",Math.max(15,w*.1),600);}
      else{const u=Math.max(12,Math.min(a.w*.03,s*.04)),n=7,cols=["#9fd0ff","#ffb878","#9be3b0","#ffd86b","#d9a8ff","#ff9a8a","#cfd8ff"];c.globalAlpha=g*eo((t-6.2)/1);for(let i=0;i<n;i++){const px=cx+(i-(n-1)/2)*u*2.4;person(px,cy+u,u,cols[i]);if(i<n-1){c.strokeStyle="rgba(255,255,255,.6)";c.lineWidth=3;c.beginPath();c.moveTo(px+u*.7,cy+u*.4);c.lineTo(px+u*1.7,cy+u*.4);c.stroke();}}
        tx("hjälp och sammanhållning",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(20,s*.055),700);}
      c.restore();}};

  /* 2 · tornen mot Turning Torso, i skala */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,10.5,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfd9e6"],[1,"#e8eef4"]]);const gy=a.y+a.h*.88,H=a.h*.74,sc=H/417,k=eo((t-2.8)/2);
      c.fillStyle="#7a8aa0";c.fillRect(cx-sc*95,gy-417*sc*k,sc*60,417*sc*k);c.fillRect(cx-sc*20,gy-415*sc*k,sc*60,415*sc*k);
      c.fillStyle="#cfd8e6";for(let r=0;r<40;r++){const yy=gy-(417*sc*k)+r*(417*sc*k)/40;c.fillRect(cx-sc*90,yy,sc*50,2);c.fillRect(cx-sc*15,yy,sc*50,2);}
      tx("ca 415 m",cx-sc*15,gy-417*sc*k-Math.max(14,s*.034),"#1d2b53","center",Math.max(17,s*.045),700);
      if(t>5){const q=eo((t-5)/1.2),tt=190*sc*q,bx=cx+sc*150;c.globalAlpha=g*q;c.fillStyle="#b8a890";for(let i=0;i<9;i++){c.save();c.translate(bx+sc*25,gy-i*tt/9-tt/18);c.rotate(i*.12);c.fillRect(-sc*25,-tt/18,sc*50,tt/9+1);c.restore();}tx("Turning Torso 190 m",bx+sc*25,gy+Math.max(24,s*.055),"#1d2b53","center",Math.max(13,s*.034),700);}
      c.restore();}};

  /* 3 · tre platser, och antal */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(3,t,11.1,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d1730"],[1,"#1a2a48"]]);const w=Math.min(a.w*.7,s*1.2),lx=cx-w/2,h=w*.5,y=cy-h/2-s*.04;
      c.fillStyle="rgba(120,140,190,.25)";c.strokeStyle="rgba(200,215,255,.5)";c.lineWidth=2;c.beginPath();c.moveTo(lx,y+h*.15);c.lineTo(lx+w*.28,y);c.lineTo(lx+w*.8,y+h*.1);c.lineTo(lx+w,y+h*.28);c.lineTo(lx+w*.92,y+h*.62);c.lineTo(lx+w*.7,y+h*.98);c.lineTo(lx+w*.45,y+h*.9);c.lineTo(lx+w*.2,y+h*.8);c.lineTo(lx+w*.05,y+h*.45);c.closePath();c.fill();c.stroke();
      [[.92,.34,"New York"],[.88,.44,"Washington (Pentagon)"],[.82,.4,"Pennsylvania"]].forEach(([px,py,n],i)=>{const q=eo((t-3-i*.9)/.8);if(q<=0)return;c.globalAlpha=g*q;dot(lx+w*px-i*w*.08,y+h*py+(i===2?-h*.1:0),7,"#ffd86b");});
      c.globalAlpha=g;tx("New York · Washington · Pennsylvania",cx,y+h+Math.max(34,s*.08),"#cfd8ff","center",Math.max(14,s*.036),700);
      if(t>8){c.globalAlpha=g*eo((t-8)/1);tx("nästan 3 000",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(32,s*.09),700);tx("människor dog",cx,a.y+a.h*.1+Math.max(40,s*.09),"#fff","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 4 · hjälparna: brandmanshjälm, ihållande medkänsla */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,12.3,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const r=Math.max(40,Math.min(a.w*.12,a.h*.2,s*.2));
      if(t<8.5){const hy=cy,hx=cx;c.fillStyle="#d1383a";c.beginPath();c.arc(hx,hy,r,Math.PI,TAU);c.lineTo(hx+r*1.35,hy+r*.15);c.lineTo(hx-r*1.35,hy+r*.15);c.closePath();c.fill();c.fillStyle="#a82a2c";c.fillRect(hx-r*1.4,hy+r*.05,r*2.8,r*.2);c.fillStyle="#ffd86b";c.beginPath();c.moveTo(hx,hy-r*.8);c.lineTo(hx+r*.4,hy-r*.35);c.lineTo(hx+r*.3,hy+r*.1);c.lineTo(hx-r*.3,hy+r*.1);c.lineTo(hx-r*.4,hy-r*.35);c.closePath();c.fill();
        tx("de sprang mot faran",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(20,s*.055),700);tx("mer än 300 brandmän dog",cx,cy+r*1.8,"#cfd8ff","center",Math.max(16,s*.042),700);}
      else{c.globalAlpha=g*eo((t-8.5)/1);const hr=Math.max(30,r*.9);c.fillStyle="#d1383a";c.beginPath();const px=cx,py=cy;c.moveTo(px,py+hr*.9);c.bezierCurveTo(px-hr*1.6,py-hr*.1,px-hr*.7,py-hr*1.1,px,py-hr*.4);c.bezierCurveTo(px+hr*.7,py-hr*1.1,px+hr*1.6,py-hr*.1,px,py+hr*.9);c.fill();tx("medkänsla över hela världen",cx,py+hr*2,"#ffd86b","center",Math.max(18,s*.048),700);}
      c.restore();}};

  /* 5 · ny säkerhet och låsta cockpitdörrar */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(5,t,13.2,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfd9e6"],[1,"#e8eef4"]]);const u=Math.max(14,Math.min(a.w*.04,s*.05));
      if(t<8.4){c.strokeStyle="#4a5a7a";c.lineWidth=u*.5;c.beginPath();c.moveTo(cx-u*3,cy+u*3);c.lineTo(cx-u*3,cy-u*3);c.lineTo(cx+u*3,cy-u*3);c.lineTo(cx+u*3,cy+u*3);c.stroke();c.fillStyle="#4a5a7a";c.fillRect(a.x,cy+u*3,a.w,u*.3);
        const k=eo((t-3)/4),px=lerp(a.x+a.w*.12,a.x+a.w*.88,k);person(px,cy+u*1.6,u*.9,"#2a73c8");tx("säkerhetskontroll",cx,a.y+a.h*.14,"#1d2b53","center",Math.max(20,s*.055),700);}
      else{const q=eo((t-8.6)/.8);c.globalAlpha=g*q;const dw=u*5,dh=u*7,dx=cx-dw/2,dy=cy-dh/2;c.fillStyle="#7a8190";c.fillRect(dx,dy,dw,dh);c.strokeStyle="#4a5a7a";c.lineWidth=4;c.strokeRect(dx,dy,dw,dh);c.fillStyle="#ffd23c";c.fillRect(dx+dw*.7,dy+dh*.5,u*.6,u*1);c.strokeStyle="#ffd23c";c.lineWidth=5;c.beginPath();c.arc(dx+dw*.7+u*.3,dy+dh*.5-u*.2,u*.4,Math.PI,TAU);c.stroke();tx("förstärkta, låsta dörrar",cx,dy+dh+Math.max(34,s*.08),"#1d2b53","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 6 · minnesmärket: två fontäner */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,13.9,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#1d2b4a"]]);const w=Math.min(a.w*.22,s*.38),gap=w*.5;
      [-1,1].forEach(sd=>{const px=cx+sd*(w/2+gap/2),py=cy;c.fillStyle="#0e2540";c.fillRect(px-w/2,py-w/2,w,w);c.strokeStyle="#cfd8ff";c.lineWidth=4;c.strokeRect(px-w/2,py-w/2,w,w);
        c.fillStyle="rgba(120,180,255,.5)";c.fillRect(px-w*.4,py-w*.4,w*.8,w*.8);for(let i=0;i<3;i++){const p=((t*.3+i/3)%1);c.strokeStyle=`rgba(255,255,255,${.5*(1-p)})`;c.lineWidth=2;c.strokeRect(px-w*.4*p,py-w*.4*p,w*.8*p,w*.8*p);}
        for(let i=0;i<24;i++){const q=eo((t-4-i*.04)/.5);c.fillStyle=`rgba(255,226,122,${.9*q})`;const sx=px-w/2+(i/24)*w;c.fillRect(sx,py-w/2-8,3,5);}});
      tx("namnen är inristade",cx,cy+w*.9,"#ffd86b","center",Math.max(17,s*.045),700);
      if(t>10.2){c.globalAlpha=g*eo((t-10.2)/1);tx("2011 · tio år senare",cx,a.y+a.h*.12,"#cfd8ff","center",Math.max(19,s*.052),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
