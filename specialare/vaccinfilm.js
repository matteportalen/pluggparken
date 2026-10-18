/* Hur vaccin fungerar: minilektionen som film (åtta scener, ca 2 minuter), bilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/vaccin/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/vaccin-1..6.jpg. MPVaccinFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.5,cap:[[0.5,"Ett litet stick som skyddar. Det här är berättelsen om hur vaccin fungerar."]]},
 {k:"01 · Från en ko",d:8.5,cap:[[0.8,"Ordet vaccin kommer från latinets vacca, som betyder ko. Det är en historia om kor och mjölkpigor."]]},
 {k:"02 · En fruktad sjukdom",d:11,cap:[[0.8,"Smittkoppor var en av världens värsta sjukdomar."],[4.6,"Bara under 1900-talet dog uppskattningsvis 300 miljoner människor av den."]]},
 {k:"03 · Edward Jenner",d:10.6,cap:[[0.8,"År 1796 såg läkaren Edward Jenner att mjölkpigor som fått kokoppor inte fick de farliga smittkopporna."]]},
 {k:"04 · Första vaccinet",d:17.9,cap:[[0.8,"Jenner gav en pojke lite vätska från en kokoppsblåsa. Pojken blev inte sjuk av smittkoppor när han senare utsattes."],[8.95,"Idag skulle ett sådant försök aldrig tillåtas. Nya vaccin testas noga, i flera steg, på frivilliga."]]},
 {k:"05 · Tränar kroppen",d:12.9,cap:[[0.8,"Ett vaccin visar immunförsvaret en ofarlig bit av en sjukdom. Kroppen lär sig känna igen den."],[7.75,"Den sparar en minnesbild, ibland i många år, så att den är redo."]]},
 {k:"06 · Utrotad",d:15.1,cap:[[0.8,"Genom vaccinering försvann smittkopporna. Det sista kända fallet var i Somalia år 1977."],[8.8,"År 1980 förklarade WHO att sjukdomen var utrotad i hela världen."]]},
 {k:"07 · Skyddar fler",d:15.3,cap:[[0.8,"Vaccin skyddar inte bara dig, utan också människor som inte kan vaccineras. Sjukdomen har svårare att sprida sig."],[9.2,"Polio har minskat med över 99 procent sedan år 1988."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Hur vaccin fungerar",under:"En film i åtta steg · ca 2 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Ett litet stick kan rädda många liv. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Teckning: William Brockedon, ko och mjölkpiga · CC0 · Yale Center via Wikimedia Commons",2:"Porträtt av Edward Jenner · CC BY 4.0 · Wellcome Collection via Wikimedia Commons",3:"Edward Jenner vaccinerar patienter · CC BY 4.0 · Wellcome Collection via Wikimedia Commons",4:"Foto: Ajay Kumar Chaurasiya (vaccin) · CC BY-SA 4.0 · Wikimedia Commons",5:"Foto: CDC (programmet för utrotning av smittkoppor) · Public domain · Wikimedia Commons",6:"Foto: Japanexperterna.se · CC BY 2.0 · Wikimedia Commons"};

window.MPVaccinFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"vaccin",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"vaccin-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const cow=(px,py,u)=>{const c=x();c.save();c.fillStyle="#f2efe6";c.beginPath();c.ellipse(px,py,u*2,u*1.2,0,0,TAU);c.fill();c.beginPath();c.ellipse(px+u*2.2,py-u*.6,u*.8,u*.65,0,0,TAU);c.fill();c.fillStyle="#2a2a30";[[-.7,-.2,.5],[.5,.2,.45],[-.2,.5,.3]].forEach(([dx,dy,r])=>{c.beginPath();c.ellipse(px+dx*u,py+dy*u,r*u,r*u*.8,0,0,TAU);c.fill();});c.fillRect(px-u*1.5,py+u*.8,u*.35,u*1.2);c.fillRect(px-u*.6,py+u*.9,u*.35,u*1.1);c.fillRect(px+u*.7,py+u*.9,u*.35,u*1.1);c.fillRect(px+u*1.4,py+u*.8,u*.35,u*1.2);c.fillStyle="#e8b0a0";c.beginPath();c.ellipse(px+u*2.7,py-u*.45,u*.35,u*.3,0,0,TAU);c.fill();c.fillStyle="#222";c.beginPath();c.arc(px+u*2.35,py-u*.8,u*.1,0,TAU);c.fill();c.fillStyle="#cfc7b0";c.fillRect(px+u*1.8,py-u*1.35,u*.15,u*.4);c.fillRect(px+u*2.3,py-u*1.35,u*.15,u*.4);c.restore();};
  const person=(px,py,u,col,hat)=>{const c=x();c.save();c.fillStyle=col;c.beginPath();c.arc(px,py-u*1.5,u*.55,0,TAU);c.fill();c.beginPath();c.moveTo(px-u*.9,py+u*1.2);c.lineTo(px-u*.5,py-u*.8);c.lineTo(px+u*.5,py-u*.8);c.lineTo(px+u*.9,py+u*1.2);c.closePath();c.fill();if(hat){c.fillStyle="#2a2a30";c.fillRect(px-u*.6,py-u*2.2,u*1.2,u*.25);c.fillRect(px-u*.35,py-u*2.7,u*.7,u*.55);}c.restore();};
  /* mikroskopvärlden: röda blodkroppar (skålformade med skuggning), vit blodkropp, virus med taggar, antikroppar, allt med glöd */
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.restore();};
  const rbc=(px,py,r,rot)=>{const c=x();c.save();c.translate(px,py);c.rotate(rot||0);c.scale(1,.78);const g=c.createRadialGradient(-r*.2,-r*.2,r*.1,0,0,r);g.addColorStop(0,"#ff6a6a");g.addColorStop(.55,"#c42a35");g.addColorStop(1,"#6e1018");c.fillStyle=g;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();const d=c.createRadialGradient(0,0,0,0,0,r*.55);d.addColorStop(0,"rgba(70,8,16,.7)");d.addColorStop(1,"rgba(70,8,16,0)");c.fillStyle=d;c.beginPath();c.arc(0,0,r*.55,0,TAU);c.fill();c.restore();};
  const wbc=(px,py,r,t)=>{const c=x();c.save();for(let i=0;i<6;i++){const an=i*TAU/6+t*.6,rr=r*(1.05+.12*Math.sin(t*2+i));c.fillStyle="rgba(235,240,255,.55)";c.beginPath();c.arc(px+Math.cos(an)*rr*.7,py+Math.sin(an)*rr*.7,r*.45,0,TAU);c.fill();}
    const g=c.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,"#ffffff");g.addColorStop(1,"#b8c8e8");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.fillStyle="rgba(110,100,190,.9)";c.beginPath();c.arc(px-r*.2,py,r*.5,0,TAU);c.arc(px+r*.25,py+r*.1,r*.4,0,TAU);c.fill();c.restore();gl(px,py,r*1.8,"rgba(180,210,255,.25)");};
  const virusG=(px,py,r,col,t)=>{const c=x();c.save();gl(px,py,r*2.2,col.replace("1)",".35)"));const g=c.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,"#ff9a8a");g.addColorStop(1,"#a8281c");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.strokeStyle="#ff5a4a";c.lineWidth=Math.max(2,r*.1);for(let i=0;i<16;i++){const an=i*TAU/16+t*.15;c.beginPath();c.moveTo(px+Math.cos(an)*r,py+Math.sin(an)*r);c.lineTo(px+Math.cos(an)*r*1.4,py+Math.sin(an)*r*1.4);c.stroke();c.fillStyle="#ffb0a0";c.beginPath();c.arc(px+Math.cos(an)*r*1.45,py+Math.sin(an)*r*1.45,r*.12,0,TAU);c.fill();}c.restore();};
  const ab=(px,py,u,ang,col)=>{const c=x();c.save();c.translate(px,py);c.rotate(ang||0);gl(0,0,u*2.2,"rgba(120,255,180,.4)");c.strokeStyle=col||"#9be3b0";c.lineWidth=Math.max(2,u*.28);c.lineCap="round";c.beginPath();c.moveTo(0,u);c.lineTo(0,0);c.lineTo(-u*.85,-u*.95);c.moveTo(0,0);c.lineTo(u*.85,-u*.95);c.stroke();c.restore();};
  const vessel=(a,t)=>{const c=x();grad(a,[[0,"#3a0a14"],[.5,"#5a1420"],[1,"#2a060e"]]);const r=L.srand(2);for(let i=0;i<22;i++){const sp=.05+r()*.07,X=a.x+((r()*a.w+t*a.w*sp)%(a.w+80))-40,Y=a.y+a.h*(.12+r()*.76);rbc(X,Y,Math.max(14,a.h*.045)*(.7+r()*.5),t*.3+i);}};
  const antibody=(px,py,u,col)=>{const c=x();c.save();c.strokeStyle=col;c.lineWidth=Math.max(2,u*.22);c.lineCap="round";c.beginPath();c.moveTo(px,py+u);c.lineTo(px,py);c.lineTo(px-u*.8,py-u*.9);c.moveTo(px,py);c.lineTo(px+u*.8,py-u*.9);c.stroke();c.restore();};
  const virus=(px,py,r,col,spikes)=>{const c=x();c.save();c.fillStyle=col;c.strokeStyle=col;c.lineWidth=Math.max(2,r*.12);c.beginPath();c.arc(px,py,r,0,TAU);c.fill();if(spikes)for(let i=0;i<12;i++){const an=TAU/12*i;c.beginPath();c.moveTo(px+Math.cos(an)*r,py+Math.sin(an)*r);c.lineTo(px+Math.cos(an)*r*1.35,py+Math.sin(an)*r*1.35);c.stroke();dot(px+Math.cos(an)*r*1.4,py+Math.sin(an)*r*1.4,r*.13,col);}c.restore();};

  const s0=(t)=>{photo(4,t,6.5,1.12,.3);const f=title(t,"VACCIN","ETT LITET STICK SOM SKYDDAR","#9fe0ff");cred(4,.55*f);};

  /* 1 · vacca = ko */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,8.5,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfe9f7"],[.7,"#eaf5fb"],[.701,"#7fbf6a"],[1,"#5a9a4a"]]);const u=Math.max(16,Math.min(a.w*.045,s*.05));cow(cx-u*1.5,cy+u*.5,u);
      if(t>4){c.globalAlpha=g*eo((t-4)/1);tx("vacca = ko",cx,a.y+a.h*.14,"#1d3a6a","center",Math.max(24,s*.07),700);}
      if(t>5.4){c.globalAlpha=g*eo((t-5.4)/1);tx("vaccin",cx,a.y+a.h*.14+Math.max(46,s*.1),"#d1583a","center",Math.max(20,s*.055),700);}
      c.restore();}};

  /* 2 · en fruktad sjukdom */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(3,t,11,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);tx("smittkoppor",cx,a.y+a.h*.16,"#ff9a8a","center",Math.max(24,s*.07),700);
      if(t>4.6){const k=eo((t-5)/4),n=Math.round(300*k);c.globalAlpha=g*eo((t-4.6)/.8);tx(n+" miljoner",cx,cy+s*.03,"#ffd86b","center",Math.max(40,s*.12),700);tx("döda under 1900-talet (uppskattning)",cx,cy+Math.max(60,s*.14),"#cfd8ff","center",Math.max(14,s*.036),600);}
      c.restore();}};

  /* 3 · Jenner: kokoppor skyddar */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,10.6,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfe9f7"],[.7,"#eaf5fb"],[.701,"#7fbf6a"],[1,"#5a9a4a"]]);const u=Math.max(16,Math.min(a.w*.04,s*.045));cow(cx-a.w*.2,cy+u*.6,u);person(cx+a.w*.02,cy+u*.4,u*1.2,"#d98ab0");
      if(t>3.6){const q=eo((t-3.6)/1);c.globalAlpha=g*q;for(let i=0;i<4;i++)dot(cx+a.w*.02+u*1.2+i*u*.3,cy+u*.35+Math.sin(i)*u*.2,u*.12,"#d93030");tx("kokoppor på händerna",cx+a.w*.02,a.y+a.h*.18,"#1d3a6a","center",Math.max(15,s*.04),700);}
      if(t>6.4){const q=eo((t-6.4)/1);c.globalAlpha=g*q;const sx=cx+a.w*.28,sy=cy;c.fillStyle="#3F8FB5";c.beginPath();c.moveTo(sx-u*1.4,sy-u*2);c.lineTo(sx+u*1.4,sy-u*2);c.lineTo(sx+u*1.4,sy);c.quadraticCurveTo(sx,sy+u*2.4,sx-u*1.4,sy);c.closePath();c.fill();c.strokeStyle="#fff";c.lineWidth=5;c.beginPath();c.moveTo(sx-u*.6,sy-u*.6);c.lineTo(sx-u*.1,sy-u*.1);c.lineTo(sx+u*.7,sy-u*1.2);c.stroke();tx("fick inte smittkoppor",sx,sy+u*3.6,"#1d3a6a","center",Math.max(14,s*.036),700);}
      c.restore();}};

  /* 4 · första vaccinet, sedan idag: tre steg */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,17.9,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      if(t<8.95){const u=Math.max(16,Math.min(a.w*.04,s*.045));tx("1796",cx,a.y+a.h*.16,"#ffd86b","center",Math.max(30,s*.085),700);person(cx-u*3,cy+u,u*1.2,"#9fd0ff",true);person(cx+u*3,cy+u*1.4,u*.9,"#ffb878");c.strokeStyle="#cfd5df";c.lineWidth=3;c.beginPath();c.moveTo(cx-u*1.6,cy);c.lineTo(cx+u*1.4,cy-u*.2);c.stroke();dot(cx+u*1.5,cy-u*.2,5,"#d93030");
        tx("läkaren",cx-u*3,cy+u*3.6,"#9fd0ff","center",Math.max(13,s*.034),700);tx("pojken",cx+u*3,cy+u*3.6,"#ffb878","center",Math.max(13,s*.034),700);}
      else{const w=Math.min(a.w*.82,s*1.5),bw=w/3.4,y=cy-s*.06,h=Math.max(70,s*.17);tx("idag",cx,a.y+a.h*.14,"#9be3b0","center",Math.max(26,s*.075),700);
        ["fas 1","fas 2","fas 3"].forEach((n,i)=>{const q=eo((t-9.6-i*.9)/.8);if(q<=0)return;const px=cx-w/2+i*(bw*1.2);c.save();c.globalAlpha=g*q;c.fillStyle="rgba(255,255,255,.08)";c.strokeStyle="#9be3b0";c.lineWidth=2;c.fillRect(px,y,bw,h);c.strokeRect(px,y,bw,h);tx(n,px+bw/2,y+h*.42,"#fff","center",Math.max(17,h*.3),700);const people=[" få"," fler"," många"][i];tx(people,px+bw/2,y+h*.8,"#cfd8ff","center",Math.max(13,h*.2),600);c.restore();});
        if(t>12.6){c.globalAlpha=g*eo((t-12.6)/1);tx("frivilliga · noggranna tester",cx,y+h+Math.max(56,s*.12),"#ffd86b","center",Math.max(16,s*.042),700);}}
      c.restore();}};

  /* 5 · tränar kroppen: blodbanan, vit blodkropp lär sig, antikroppar, sedan skarpt virus bekämpas */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,12.9,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;vessel(a,t);const r=Math.max(32,Math.min(a.w*.09,a.h*.17,s*.15)),wx=cx+a.w*.12,wy=cy;
      wbc(wx,wy+Math.sin(t*.8)*8,r,t);
      if(t<7.75){const k=eo((t-3)/1.6),fx=lerp(a.x+a.w*.08,wx-r*1.9,k);for(let i=0;i<5;i++){const an=-Math.PI/2+i*.5;dot(fx+Math.cos(an)*r*.28,wy+Math.sin(an)*r*.28,r*.1,"#ff9a8a");}gl(fx,wy,r*.8,"rgba(255,150,130,.35)");
        tx("ofarlig bit av sjukdomen",fx,wy-r*1.4,"#ffd0c0","center",Math.max(14,s*.036),700);tx("immunförsvaret",wx,wy+r*2.1,"#cfe0ff","center",Math.max(14,s*.036),700);
        if(t>5){const q=eo((t-5)/1);c.save();c.globalAlpha=g*q;c.strokeStyle="rgba(155,255,190,.9)";c.lineWidth=4;for(let i=0;i<2;i++){const p=((t*.8+i*.5)%1);c.beginPath();c.arc(wx,wy,r*(1.1+p*1.4),0,TAU);c.globalAlpha=g*q*(1-p);c.stroke();}c.restore();for(let i=0;i<6;i++){const an=i*TAU/6+t,rr=r*(1.6+.2*Math.sin(t*2+i));ab(wx+Math.cos(an)*rr,wy+Math.sin(an)*rr,r*.2,an+Math.PI/2);}tx("lär sig känna igen",cx,a.y+a.h*.9,"#9be3b0","center",Math.max(16,s*.042),700);}}
      else{const vx=cx-a.w*.18,vy=cy,vr=r*.9;const q=eo((t-7.75)/1);c.globalAlpha=g*q;virusG(vx,vy+Math.sin(t*1.3)*6,vr,"rgba(255,90,70,1)",t);
        const k=eo((t-9)/1.8);for(let i=0;i<14;i++){const an=i*TAU/14+t*.2,rr=lerp(r*3.2,vr*1.55,k);ab(vx+Math.cos(an)*rr,vy+Math.sin(an)*rr,r*.2,an+Math.PI/2);}
        tx("sjukdomen kommer",vx,vy+vr*2.6,"#ffb0a0","center",Math.max(14,s*.036),700);
        if(t>10.4){c.globalAlpha=g*eo((t-10.4)/1);tx("redo, tack vare minnet",cx,a.y+a.h*.9,"#ffd86b","center",Math.max(16,s*.042),700);}}
      c.restore();}};

  /* 6 · utrotad: antal fall, tidslinje */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(5,t,15.1,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy-s*.08,px=yr=>lx+(yr-1790)/(1990-1790)*w;
      c.strokeStyle="rgba(255,255,255,.45)";c.lineWidth=3;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();
      [[1796,"1796","Jenner","#9fd0ff"],[1977,"1977","sista fallet","#ffb878"],[1980,"1980","utrotad","#9be3b0"]].forEach(([yr,l,n,col],i)=>{const q=eo((t-3-i*1.2)/.8);if(i===2&&t<8.8)return;if(i===1&&t<3.4)return;if(i===0&&t<3)return;c.globalAlpha=g*(i===2?eo((t-8.8)/1):q);dot(px(yr),y,9,col);tx(l,px(yr),y+(i===2?Math.max(58,s*.13):Math.max(34,s*.075)),col,"center",Math.max(15,s*.04),700);tx(n,px(yr),y-Math.max(18,s*.04)-(i===2?Math.max(30,s*.07):0),col,"center",Math.max(13,s*.034),700);});
      c.globalAlpha=g;
      const gw=Math.min(a.w*.5,s*.9),n=100,cols=20,cell=gw/cols,gy=y+Math.max(110,s*.24),k=cl((t-3.6)/8,0,1);for(let i=0;i<n;i++){const done=i/n<k;dot(lx+w/2-gw/2+(i%cols)*cell+cell/2,gy+Math.floor(i/cols)*cell*.7,cell*.28,done?"#3aa86a":"#d93030");}
      tx("fall",cx,gy-Math.max(18,s*.04),"#cfd8ff","center",Math.max(13,s*.034),600);
      c.restore();}};

  /* 7 · skyddar fler: flockimmunitet, sedan polio */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,15.3,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#2a3a58"]]);
      if(t<9.2){const cols=7,rows=4,sp=Math.min(a.w*.09,s*.13),x0=cx-sp*(cols-1)/2,y0=cy-sp*(rows-1)/2-s*.02,unv=new Set([10,18]);
        for(let r=0;r<rows;r++)for(let q=0;q<cols;q++){const i=r*cols+q,px=x0+q*sp,py=y0+r*sp,u=unv.has(i);c.fillStyle=u?"#ffb878":"#6fb4ff";c.beginPath();c.arc(px,py,sp*.22,0,TAU);c.fill();if(!u){c.strokeStyle="rgba(155,227,176,.8)";c.lineWidth=2;c.beginPath();c.arc(px,py,sp*.34,0,TAU);c.stroke();}}
        const k=eo((t-4)/3),vx=lerp(a.x+a.w*.06,x0-sp*.2,k);virus(vx,y0+sp*1.5,Math.max(8,sp*.18),"#d93030",true);
        tx("några kan inte vaccineras",cx,a.y+a.h*.9,"#ffb878","center",Math.max(15,s*.04),700);tx("de andra skyddar dem",cx,a.y+a.h*.1,"#9be3b0","center",Math.max(17,s*.045),700);}
      else{const w=Math.min(a.w*.6,s*1.1),lx=cx-w/2,y=cy-s*.1,bh=Math.max(30,s*.08),k=eo((t-9.6)/2.5);tx("polio",cx,a.y+a.h*.14,"#fff","center",Math.max(26,s*.075),700);c.fillStyle="rgba(255,255,255,.1)";c.fillRect(lx,y,w,bh);c.fillStyle="#d93030";c.fillRect(lx,y,w*(1-.99*k),bh);tx("1988",lx,y-Math.max(10,s*.026),"#cfd8ff","left",Math.max(14,s*.036),700);tx("−99 %",cx,y+bh+Math.max(50,s*.11),"#9be3b0","center",Math.max(30,s*.085),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
