/* Dinosaurierna: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js (MPSvartHal.start med o.def). Röst: ../ljud/dinosaurier/s<scen>-<replik>.mp3 (ElevenLabs).
   Bilderna: bilder/dinosaurier-1..6.jpg. MPDinoFilm.start(host,{overlay,onClose}). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/specialare/";}})();
const TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.8,cap:[[0.5,"De var jordens jättar i över hundra miljoner år. Det här är berättelsen om dinosaurierna."]]},
 {k:"01 · Mycket länge",d:13,cap:[[0.8,"Dinosaurierna levde på jorden i ungefär 165 miljoner år."],[6.2,"Människan har bara funnits i några hundratusen år. Dinosaurierna var här mycket, mycket längre."]]},
 {k:"02 · Alla storlekar",d:11.8,cap:[[0.8,"Dinosaurier fanns i alla storlekar. Vissa var stora som flera bussar efter varandra."],[6.7,"Andra var små som en kyckling, och sprang omkring mellan jättarnas ben."]]},
 {k:"03 · Ägg",d:12.2,cap:[[0.8,"Alla dinosaurier kläcktes ur ägg, precis som fåglar och krokodiler gör i dag."],[6.3,"Mammorna lade äggen i bon, och vissa kan ha vaktat dem tills ungarna kläcktes."]]},
 {k:"04 · Asteroiden",d:13.3,cap:[[0.8,"För ungefär 66 miljoner år sedan slog en jättelik asteroid ner vid dagens Mexiko."],[6.8,"Det blev mörkt och kallt, klimatet förändrades, och de flesta dinosaurier dog ut."]]},
 {k:"05 · De finns kvar",d:9.5,cap:[[0.8,"Men några små dinosaurier överlevde, och de blev fåglar."],[5.2,"En höna är alltså en slags dinosaurie."]]},
 {k:"06 · Fossil",d:13.3,cap:[[0.8,"Allt det här vet vi tack vare fossil: ben och avtryck som har blivit till sten under miljoner år."],[8.9,"Forskare gräver fram dem och lär sig mer, år efter år."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Dinosaurierna",under:"En film i sex steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Dinosaurierna är borta, men du kan se dem om du tittar på en fågel. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Robosorne · CC BY-SA 3.0 · Wikimedia Commons",2:"Foto: Dosseman · CC BY-SA 4.0 · Wikimedia Commons",3:"Foto: Gary Todd · CC0 · Wikimedia Commons",4:"Konstnärens bild av en asteroidkrock: ESO/M. Kornmesser · CC BY 4.0 · Wikimedia Commons",5:"Foto: Thegreenj · CC BY-SA 3.0 · Wikimedia Commons",6:"Foto: Stuart Plotkin · CC BY-SA 3.0 · Wikimedia Commons"};
const IMG={};function img(n){const u=ROOT+"bilder/dinosaurier-"+n+".jpg";if(!IMG[u]){const i=new Image();i.src=u;IMG[u]=i;}return IMG[u];}
[1,2,3,4,5,6].forEach(img);
const ok=i=>i&&i.complete&&i.naturalWidth;
const srand=s=>()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};

window.MPDinoFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"dinosaurier",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {A,eo,cl,lerp,font}=E;
  const x=()=>E.x;
  const tx=(t,px,py,col,al,sz,w)=>{const c=x();c.font=font(w||600,sz||12);c.fillStyle=col||"rgba(255,255,255,.88)";c.textAlign=al||"left";c.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#7fd6ff",al,11,700);
  const S=()=>{const a=A();return{a,s:Math.min(a.w,a.h),cx:a.x+a.w/2,cy:a.y+a.h/2,port:E.W<E.H*.9};};
  const cred=(n,a)=>{const c=x();c.save();c.globalAlpha=a==null?.6:a;c.fillStyle="#fff";c.font=font(600,11);c.textAlign="right";c.fillText(KR[n],E.W-Math.max(14,E.W*.03),E.H-Math.max(96,E.H*.13));c.restore();};
  const photo=(n,t,dur,zoom,dim)=>{const c=x(),a=A(),im=img(n);if(!ok(im))return;const k=cl(t/Math.max(1,dur),0,1),z=lerp(1,zoom||1.12,k);
    const sc=Math.max(a.w/im.naturalWidth,a.h/im.naturalHeight)*z,iw=im.naturalWidth*sc,ih=im.naturalHeight*sc;
    c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=eo(t/1.6);c.drawImage(im,a.x+a.w/2-iw/2,a.y+a.h/2-ih/2,iw,ih);
    c.fillStyle=`rgba(2,4,12,${dim||0})`;c.fillRect(a.x,a.y,a.w,a.h);
    const g=c.createRadialGradient(a.x+a.w/2,a.y+a.h/2,Math.min(a.w,a.h)*.3,a.x+a.w/2,a.y+a.h/2,Math.max(a.w,a.h)*.62);g.addColorStop(0,"rgba(2,3,10,0)");g.addColorStop(1,"rgba(2,3,10,.82)");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};
  const panel=(a,al)=>{const c=x();c.save();c.globalAlpha=al;c.fillStyle="rgba(6,10,22,.82)";c.fillRect(a.x,a.y,a.w,a.h);c.restore();};

  /* ---- siluetter ---- */
  // långhalsad växtätare, sedd från sidan: längd L, fötterna på y=gy
  const sauro=(cx,gy,L,col,al)=>{const c=x(),u=L/100;c.save();c.globalAlpha=al==null?1:al;c.fillStyle=col;c.strokeStyle=col;c.lineCap="round";c.lineJoin="round";
    // kropp
    c.beginPath();c.ellipse(cx-8*u,gy-17*u,20*u,9.5*u,0,0,TAU);c.fill();
    // hals
    c.lineWidth=7*u;c.beginPath();c.moveTo(cx+8*u,gy-20*u);c.bezierCurveTo(cx+22*u,gy-26*u,cx+30*u,gy-34*u,cx+40*u,gy-33*u);c.stroke();
    c.lineWidth=3.2*u;c.beginPath();c.moveTo(cx+38*u,gy-33*u);c.lineTo(cx+45*u,gy-32*u);c.stroke();
    // svans
    c.lineWidth=6*u;c.beginPath();c.moveTo(cx-24*u,gy-18*u);c.bezierCurveTo(cx-38*u,gy-17*u,cx-45*u,gy-14*u,cx-55*u,gy-10*u);c.stroke();
    c.lineWidth=2.2*u;c.beginPath();c.moveTo(cx-55*u,gy-10*u);c.lineTo(cx-62*u,gy-9*u);c.stroke();
    // ben
    c.lineWidth=5*u;[[-22,-8,13],[-10,-6,13],[4,8,12],[12,14,12]].forEach(([a,b,h])=>{c.beginPath();c.moveTo(cx+a*u,gy-13*u);c.lineTo(cx+b*u,gy);c.stroke();});
    c.restore();};
  // liten tvåbent köttätare (som en kyckling)
  const theropod=(cx,gy,L,col,al,feath)=>{const c=x(),u=L/100;c.save();c.globalAlpha=al==null?1:al;c.fillStyle=col;c.strokeStyle=col;c.lineCap="round";c.lineJoin="round";
    c.beginPath();c.ellipse(cx,gy-27*u,19*u,11*u,-.25,0,TAU);c.fill();                       // kropp
    c.lineWidth=6*u;c.beginPath();c.moveTo(cx+14*u,gy-33*u);c.quadraticCurveTo(cx+24*u,gy-48*u,cx+30*u,gy-52*u);c.stroke();   // hals
    c.beginPath();c.ellipse(cx+34*u,gy-53*u,8*u,5*u,.2,0,TAU);c.fill();                       // huvud
    c.lineWidth=5*u;c.beginPath();c.moveTo(cx-17*u,gy-25*u);c.quadraticCurveTo(cx-40*u,gy-22*u,cx-52*u,gy-30*u);c.stroke();   // svans
    c.lineWidth=4.5*u;[[-4,0],[8,12]].forEach(([a,b])=>{c.beginPath();c.moveTo(cx+a*u,gy-20*u);c.lineTo(cx+(a+b)*.5*u,gy-9*u);c.lineTo(cx+b*u,gy);c.stroke();}); // ben
    if(feath){c.lineWidth=2*u;c.strokeStyle=col;for(let i=0;i<9;i++){c.beginPath();c.moveTo(cx-14*u+i*3*u,gy-36*u);c.lineTo(cx-20*u+i*3*u,gy-48*u);c.stroke();}}
    c.restore();};
  const bird=(cx,gy,L,col,al)=>{const c=x(),u=L/100;c.save();c.globalAlpha=al==null?1:al;c.fillStyle=col;c.strokeStyle=col;c.lineCap="round";
    c.beginPath();c.ellipse(cx,gy-30*u,22*u,17*u,-.15,0,TAU);c.fill();c.beginPath();c.arc(cx+22*u,gy-48*u,8*u,0,TAU);c.fill();
    c.beginPath();c.moveTo(cx+29*u,gy-49*u);c.lineTo(cx+38*u,gy-46*u);c.lineTo(cx+29*u,gy-44*u);c.fill();
    c.beginPath();c.moveTo(cx-18*u,gy-34*u);c.lineTo(cx-38*u,gy-52*u);c.lineTo(cx-26*u,gy-28*u);c.fill();                // stjärt
    c.lineWidth=3*u;[[0],[8]].forEach(([a])=>{c.beginPath();c.moveTo(cx+a*u,gy-14*u);c.lineTo(cx+a*u,gy);c.stroke();});c.restore();};
  const egg=(cx,cy,r,col,crack,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.fillStyle=col;c.beginPath();c.ellipse(cx,cy,r*.78,r,0,0,TAU);c.fill();
    c.fillStyle="rgba(255,255,255,.22)";c.beginPath();c.ellipse(cx-r*.25,cy-r*.3,r*.2,r*.32,-.4,0,TAU);c.fill();
    if(crack>0){c.strokeStyle="#3a2a1c";c.lineWidth=Math.max(1.5,r*.07);c.beginPath();c.moveTo(cx-r*.45,cy-r*.1);for(let i=1;i<=6;i++){const q=i/6*crack;c.lineTo(cx-r*.45+i*r*.15,cy-r*.1+(i%2?r*.18:-r*.08));}c.stroke();}
    c.restore();};

  /* 0 · Inledning */
  const s0=(t)=>{const{s,cx,cy,a}=S();photo(1,t,7,1.12,.3);const f=eo((t-.8)/2),c=x();c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="#fff";c.font=`700 ${Math.round(Math.min(a.w*.095,s*.2))}px "Source Serif 4",Georgia,serif`;c.shadowColor="rgba(0,0,0,.7)";c.shadowBlur=18;c.fillText("DINOSAURIERNA",cx,cy+s*.05);c.shadowBlur=0;
    tx("JORDENS JÄTTAR",cx,cy+s*.05+Math.max(26,s*.07),"#9be3b0","center",Math.max(13,s*.03),700);c.restore();cred(1,.55*f);};

  /* 1 · Tid: 165 miljoner år mot några hundratusen */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();panel(a,1);
    const w=Math.min(a.w*.86,s*1.6),lx=cx-w/2,y1=cy-s*.1,bh=Math.max(34,s*.1),k1=eo((t-.8)/3.5);
    tg("Hur länge fanns de?",cx,a.y+a.h*.12,"#7fd6ff","center");
    c.fillStyle="rgba(255,255,255,.1)";c.fillRect(lx,y1,w,bh);
    const gr=c.createLinearGradient(lx,0,lx+w,0);gr.addColorStop(0,"#3f8f4e");gr.addColorStop(1,"#79c98a");c.fillStyle=gr;c.fillRect(lx,y1,w*k1,bh);
    tx("Dinosaurierna: ca 165 miljoner år",lx+8,y1-12,"#9be3b0","left",Math.max(14,s*.034),700);
    if(k1>.95)tx("165 000 000 år",lx+w-10,y1+bh*.66,"#06121f","right",Math.max(14,s*.035),700);
    // människan: nästan osynligt streck
    const k2=eo((t-6.3)/2),y2=y1+bh+Math.max(70,s*.2);
    if(t>6.2){c.save();c.globalAlpha=k2;
      tx("Människan: ca 300 000 år",lx+w-6,y2-18,"#ffb070","right",Math.max(14,s*.034),700);
      c.fillStyle="rgba(255,255,255,.1)";c.fillRect(lx,y2,w,bh);
      const hw=Math.max(2,w*300000/165000000);c.fillStyle="#ff9a5a";c.fillRect(lx+w-hw,y2,hw,bh);
      c.strokeStyle="rgba(255,176,112,.8)";c.lineWidth=1.2;c.beginPath();c.moveTo(lx+w-hw/2,y2+bh);c.lineTo(lx+w-hw/2,y2+bh+22);c.stroke();
      tx("bara ett litet streck",lx+w-hw/2,y2+bh+40,"#ffb070","center",Math.max(13,s*.032),700);
      c.restore();}};

  /* 2 · Storlekar: skelettfoto, sedan jämförelse buss, jätte och liten dinosaurie */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-4.2)/1.4);photo(2,t,11.8,1.1,.1+.6*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      const w=Math.min(a.w*.88,s*1.7),lx=cx-w/2,gy=cy+s*.2,pxm=w/32;     // 32 m ryms i bredden
      // marklinje
      c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=1.5;c.beginPath();c.moveTo(lx,gy);c.lineTo(lx+w,gy);c.stroke();
      const k=eo((t-4.8)/1.5);
      // jätten: 25 m
      sauro(lx+14.5*pxm,gy,23.4*pxm,"#5fa56b",k);c.globalAlpha=g*k;tx("Diplodocus ca 25 m",lx+12*pxm,gy-9.8*pxm,"#9be3b0","center",Math.max(13,s*.032),700);
      // två bussar à 12 m under
      const bw=12*pxm,bh=Math.max(14,pxm*3),by=gy+16;
      for(let i=0;i<2;i++){const bx=lx+i*(bw+3);c.globalAlpha=g*cl((t-5.6-i*.5)/.8,0,1);c.fillStyle="#f2b707";c.fillRect(bx,by,bw,bh);c.fillStyle="rgba(0,0,0,.55)";for(let j=0;j<5;j++)c.fillRect(bx+bw*.08+j*bw*.17,by+bh*.18,bw*.11,bh*.3);}
      c.globalAlpha=g*cl((t-6)/1,0,1);tx("2 bussar",lx+bw+1.5,by+bh+22,"#ffd86b","center",Math.max(13,s*.032),700);
      // liten dinosaurie och barn (andra repliken)
      const k2=eo((t-7)/1.5);c.globalAlpha=g*k2;
      theropod(lx+27.2*pxm,gy,Math.max(30,pxm*2),"#c3a76a",1);
      tx("kycklingstor",lx+(port?30.6:27.2)*pxm,gy+Math.max(26,s*.07)+(port?20:0),"#d9c38a",port?"right":"center",Math.max(12,s*.03),700);
      c.fillStyle="#e8eef7";const ph=pxm*1.7,pw=pxm*.45,pxp=lx+30.4*pxm;c.fillRect(pxp-pw/2,gy-ph*.75,pw,ph*.75);c.beginPath();c.arc(pxp,gy-ph*.75-pw*.55,pw*.55,0,TAU);c.fill();tx("barn",pxp,gy+Math.max(26,s*.07),"#e8eef7","center",Math.max(12,s*.03),600);
      c.restore();}};

  /* 3 · Ägg: foto, sedan bo med ägg som kläcks */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-4.6)/1.4);photo(3,t,12.2,1.1,.1+.62*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      const by=cy+s*.12,bw=Math.min(a.w*.5,s*.9);
      // boet
      c.fillStyle="#6b4f2e";c.beginPath();c.ellipse(cx,by+s*.06,bw*.55,s*.075,0,0,TAU);c.fill();
      c.strokeStyle="#9c7a4a";c.lineWidth=2;for(let i=0;i<40;i++){const r=srand(i+4),ax=cx+(r()-.5)*bw*1.0,ay=by+s*.06+(r()-.4)*s*.07;c.beginPath();c.moveTo(ax,ay);c.lineTo(ax+(r()-.5)*bw*.15,ay-r()*s*.03);c.stroke();}
      const R=s*.07,xs=[-bw*.26,0,bw*.26];
      xs.forEach((dx,i)=>{const cr=i===1?cl((t-7)/2.2,0,1):0;egg(cx+dx,by-R*.4+(i===1?0:R*.1),R,i===1?"#e8ddc4":"#d9cdb0",cr,1);});
      // en unge kikar fram efter 9,5 s
      const k=eo((t-9.5)/1.6);if(k>0){c.globalAlpha=g*k;theropod(cx+xs[1]+R*.1,by-R*.3-(1-k)*-R*.4,s*.12,"#79c98a",1);}
      c.globalAlpha=g;tx("Fåglar och krokodiler lägger också ägg",cx,by+s*.2,"#cfe3d4","center",Math.max(13,s*.032),700);
      c.restore();}};

  /* 4 · Asteroiden: konstnärsbild, sedan nedslag och mörker */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-4.4)/1.4);photo(4,t,13.3,1.1,.05+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();
      c.fillStyle="#04060f";c.fillRect(a.x,a.y,a.w,a.h);
      const dust=eo((t-8)/4);
      // himmel som mörknar efter nedslaget
      const sg=c.createLinearGradient(0,a.y,0,a.y+a.h);sg.addColorStop(0,`rgb(${20-14*dust|0},${34-26*dust|0},${70-56*dust|0})`);sg.addColorStop(1,`rgb(${70-50*dust|0},${58-44*dust|0},${70-54*dust|0})`);c.fillStyle=sg;c.fillRect(a.x,a.y,a.w,a.h);
      // jordens horisont
      const hy=a.y+a.h*.78;c.fillStyle="#1d3a2a";c.beginPath();c.ellipse(cx,hy+a.h*.9,a.w*.95,a.h*1.0,0,Math.PI,TAU);c.fill();
      // några dinosaurier på marken
      const dy=hy+2;sauro(cx-a.w*.28,dy,s*.28,"#0c1a12",1);theropod(cx-a.w*.12,dy,s*.12,"#0c1a12",1);sauro(cx+a.w*.3,dy,s*.22,"#0c1a12",1);
      // asteroiden
      const ix=cx+a.w*.02,iy=hy-s*.01,fl=cl((t-5.2)/3,0,1);
      if(fl<1){const ax=lerp(a.x+a.w*.95,ix,eo(fl)),ay=lerp(a.y+a.h*.04,iy,eo(fl));
        c.save();c.globalCompositeOperation="lighter";const tl=c.createLinearGradient(ax,ay,ax+(a.x+a.w*.95-ax)*.35,ay+(a.y+a.h*.04-ay)*.35);tl.addColorStop(0,"rgba(255,200,120,.9)");tl.addColorStop(1,"rgba(255,120,40,0)");c.strokeStyle=tl;c.lineWidth=s*.04;c.lineCap="round";c.beginPath();c.moveTo(ax,ay);c.lineTo(ax+(a.x+a.w*.95-ax)*.35,ay+(a.y+a.h*.04-ay)*.35);c.stroke();c.restore();
        c.fillStyle="#7a6a5a";c.beginPath();c.arc(ax,ay,s*.035,0,TAU);c.fill();}
      // nedslag
      const hit=t-8;if(hit>0){const fl2=Math.exp(-hit*.9)*Math.min(1,hit*6);c.save();c.globalCompositeOperation="lighter";
        const gg=c.createRadialGradient(ix,iy,0,ix,iy,s*(.2+.5*cl(hit/3,0,1)));gg.addColorStop(0,`rgba(255,240,200,${.9*fl2})`);gg.addColorStop(.4,`rgba(255,140,50,${.5*fl2})`);gg.addColorStop(1,"rgba(255,60,10,0)");c.fillStyle=gg;c.fillRect(a.x,a.y,a.w,a.h);
        c.strokeStyle=`rgba(255,200,140,${.6*Math.exp(-hit*.5)})`;c.lineWidth=4;c.beginPath();c.arc(ix,iy,hit*s*.18,Math.PI,TAU);c.stroke();c.restore();
        // dammoln som stiger
        for(let i=0;i<40;i++){const r=srand(i+9),q=cl(hit/5,0,1),px=ix+(r()-.5)*a.w*.5*q,py=iy-q*a.h*(.3+r()*.5),sz=s*.05*(1+q*2);c.fillStyle=`rgba(70,58,52,${.5*q})`;c.beginPath();c.arc(px,py,sz,0,TAU);c.fill();}}
      c.restore();
      c.save();c.globalAlpha=g;tx("Mexiko, för 66 miljoner år sedan",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(14,s*.036),700);c.restore();}};

  /* 5 · Fåglar: höna, sedan släktskapet */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.4);photo(5,t,9.5,1.1,.1+.62*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      const w=Math.min(a.w*.84,s*1.5),lx=cx-w/2,gy=cy+s*.14,L=Math.min(s*.3,w*.22);
      const xs=[lx+w*.14,lx+w*.5,lx+w*.86];
      c.globalAlpha=g*cl((t-3.8)/1,0,1);theropod(xs[0],gy,L,"#79c98a",1);tx("Liten dinosaurie",xs[0],gy+Math.max(26,s*.07),"#9be3b0","center",Math.max(12,s*.03),700);
      c.globalAlpha=g*cl((t-4.6)/1,0,1);theropod(xs[1],gy,L,"#c3d68a",1,true);tx("med fjädrar",xs[1],gy+Math.max(26,s*.07),"#d6e2a8","center",Math.max(12,s*.03),700);
      c.globalAlpha=g*cl((t-5.6)/1,0,1);bird(xs[2],gy,L,"#e8eef7",1);tx("Höna",xs[2],gy+Math.max(26,s*.07),"#fff","center",Math.max(12,s*.03),700);
      c.globalAlpha=g;[[xs[0]+L*.7,xs[1]-L*.7,4.2],[xs[1]+L*.7,xs[2]-L*.7,5.2]].forEach(([x1,x2,st])=>{if(t<st)return;const q=eo((t-st)/.8);c.strokeStyle="#ffd86b";c.lineWidth=3;c.beginPath();c.moveTo(x1,gy-L*.3);c.lineTo(lerp(x1,x2,q),gy-L*.3);c.stroke();if(q>.95){c.fillStyle="#ffd86b";c.beginPath();c.moveTo(x2,gy-L*.3);c.lineTo(x2-12,gy-L*.3-8);c.lineTo(x2-12,gy-L*.3+8);c.fill();}});
      c.restore();}};

  /* 6 · Fossil: foto, sedan lager som blir sten och en forskare som gräver */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-4.6)/1.4);photo(6,t,13.3,1.1,.1+.62*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      panel(a,.78);
      const w=Math.min(a.w*.78,s*1.4),lx=cx-w/2,top=a.y+a.h*.22,h=a.h*.58,n=7;
      const grow=eo((t-5.4)/4.5);
      // lager växer uppifrån och ner (nya lager läggs ovanpå)
      const cols=["#8a6b4a","#6e5a42","#9a7d5a","#5f4d3a","#a58a66","#6a563f","#80664a"];
      for(let i=0;i<n;i++){const k=cl(grow*n-(n-1-i)*.9,0,1);if(k<=0)continue;const ly=top+h*(i/n),lh=h/n*k;c.fillStyle=cols[i];c.fillRect(lx,ly+h/n*(1-k),w,lh);}
      // benet, nedersta lagret
      const bone=cl((t-5.2)/1.2,0,1);c.save();c.globalAlpha=g*bone;c.fillStyle="#efe6d2";const by=top+h*(n-.6)/n,bl=w*.34;c.fillRect(cx-bl/2,by-5,bl,10);[[-1],[1]].forEach(([d])=>{c.beginPath();c.arc(cx+d*bl/2,by-6,9,0,TAU);c.arc(cx+d*bl/2,by+6,9,0,TAU);c.fill();});c.restore();
      c.globalAlpha=g*cl((t-6)/1.2,0,1);tx("miljoner år",lx+w+10,top+h*.5,"#ffd86b","left",Math.max(13,s*.032),700);
      c.strokeStyle="#ffd86b";c.lineWidth=2;c.beginPath();c.moveTo(lx+w+4,top+4);c.lineTo(lx+w+4,top+h-4);c.stroke();
      // grävande hacka (andra repliken)
      if(t>9){const k=eo((t-9)/1.5);c.globalAlpha=g*k;const px=cx+w*.2,py=top-8+Math.sin(t*5)*5;c.strokeStyle="#c9b48a";c.lineWidth=4;c.beginPath();c.moveTo(px,py-34);c.lineTo(px,py+8);c.stroke();c.fillStyle="#9aa2ad";c.beginPath();c.moveTo(px-18,py-30);c.lineTo(px+18,py-34);c.lineTo(px+16,py-26);c.lineTo(px-16,py-24);c.fill();
        tx("Forskaren gräver fram benet",cx,a.y+a.h*.12,"#fff","center",Math.max(14,s*.036),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
