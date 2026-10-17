/* Så fungerar en vulkan: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js (MPSvartHal.start med o.def). Röst: ../ljud/vulkan/s<scen>-<replik>.mp3 (ElevenLabs).
   Bilderna: bilder/vulkan-1,3,4,5,6.jpg. MPVulkanFilm.start(host,{overlay,onClose}). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/specialare/";}})();
const TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.7,cap:[[0.5,"Under våra fötter finns en av jordens största krafter. Så här fungerar en vulkan."]]},
 {k:"01 · Het sten",d:13.6,cap:[[0.8,"Långt ner i jorden är det så hett att sten smälter. Smält sten kallas magma."],[6.9,"Allra längst in är det över 5 000 grader, nästan lika hett som på solens yta."]]},
 {k:"02 · Magman stiger",d:13.7,cap:[[0.8,"Magma är lättare än hård sten, så den stiger uppåt genom sprickor, som en bubbla i en sirapsburk."],[7.6,"Den samlas i en jättelik magmakammare under berget, och trycket växer."]]},
 {k:"03 · Utbrott",d:12.6,cap:[[0.8,"När magman når ytan, eller trycket blir för stort, kommer ett utbrott."],[6.1,"Gaser, aska och het sten flyger upp i luften, ibland flera kilometer högt."]]},
 {k:"04 · Lava",d:13.5,cap:[[0.8,"Magma som kommer ut på ytan kallas lava. Den kan vara över 1 000 grader varm."],[6.9,"Lavan rinner fram som en het flod, men den svalnar och blir hård sten."]]},
 {k:"05 · Berget växer",d:15.6,cap:[[0.8,"När lavan har svalnat blir den till sten. Utbrott efter utbrott bygger upp berget, lager för lager."],[8.7,"Så växer en vulkan under tusentals år, tills den blir ett högt berg, som Fuji i Japan."]]},
 {k:"06 · Island",d:15,cap:[[0.8,"Island har många vulkaner, eftersom ön ligger där två jordplattor möts."],[6.6,"Plattorna glider isär, och magma tränger upp i springan. Därför finns det även varma källor, som gejsern Geysir."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Så fungerar en vulkan",under:"En film i sex steg · ca 2 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"En vulkan är ett fönster in till jordens heta inre. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Illustration: Benoit Gougeon, Université de Montréal · Public domain · Wikimedia Commons",3:"Foto: James St. John · Public domain · Wikimedia Commons",4:"Foto: Christoph Strässler · CC BY-SA 2.0 · Wikimedia Commons",5:"Foto: Romain Guy · CC0 · Wikimedia Commons",6:"Foto: Jakub Hałun · CC BY-SA 4.0 · Wikimedia Commons"};
const IMG={};function img(n){const u=ROOT+"bilder/vulkan-"+n+".jpg";if(!IMG[u]){const i=new Image();i.src=u;IMG[u]=i;}return IMG[u];}
[1,3,4,5,6].forEach(img);
const ok=i=>i&&i.complete&&i.naturalWidth;
const srand=s=>()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};

window.MPVulkanFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"vulkan",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {A,eo,cl,lerp,font}=E;
  const x=()=>E.x;
  const tx=(t,px,py,col,al,sz,w)=>{const c=x();c.font=font(w||600,sz||12);c.fillStyle=col||"rgba(255,255,255,.88)";c.textAlign=al||"left";c.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#7fd6ff",al,11,700);
  const S=()=>{const a=A();return{a,s:Math.min(a.w,a.h),cx:a.x+a.w/2,cy:a.y+a.h/2,port:E.W<E.H*.9};};
  const cred=(n,a)=>{if(!KR[n])return;const c=x();c.save();c.globalAlpha=a==null?.6:a;c.fillStyle="#fff";c.font=font(600,11);c.textAlign="right";c.fillText(KR[n],E.W-Math.max(14,E.W*.03),E.H-Math.max(96,E.H*.13));c.restore();};
  const photo=(n,t,dur,zoom,dim)=>{const c=x(),a=A(),im=img(n);if(!ok(im))return;const k=cl(t/Math.max(1,dur),0,1),z=lerp(1,zoom||1.12,k);
    const sc=Math.max(a.w/im.naturalWidth,a.h/im.naturalHeight)*z,iw=im.naturalWidth*sc,ih=im.naturalHeight*sc;
    c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=eo(t/1.6);c.drawImage(im,a.x+a.w/2-iw/2,a.y+a.h/2-ih/2,iw,ih);
    c.fillStyle=`rgba(2,4,12,${dim||0})`;c.fillRect(a.x,a.y,a.w,a.h);
    const g=c.createRadialGradient(a.x+a.w/2,a.y+a.h/2,Math.min(a.w,a.h)*.3,a.x+a.w/2,a.y+a.h/2,Math.max(a.w,a.h)*.62);g.addColorStop(0,"rgba(2,3,10,0)");g.addColorStop(1,"rgba(2,3,10,.82)");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};
  const glow=(cx,cy,r,rgb,a)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,`rgba(${rgb},${a})`);g.addColorStop(.45,`rgba(${rgb},${a*.35})`);g.addColorStop(1,`rgba(${rgb},0)`);c.fillStyle=g;c.beginPath();c.arc(cx,cy,r,0,TAU);c.fill();c.restore();};

  /* en tvärsnittsbild av en vulkan: rise = magma i röret (0–1), press = tryck i kammaren (0–1), erupt = utbrott (0–1), layers = antal lager i konen */
  const volc=(bx,by,w,h,t,rise,press,erupt,layers)=>{const c=x(),cx=bx+w/2,gy=by+h*.62,cone=h*.34,bot=by+h;c.save();
    // himmel (mörk) och mark under ytan
    c.fillStyle="#3a2c27";c.fillRect(bx,gy,w,bot-gy);
    // lagerstruktur i marken
    for(let i=0;i<5;i++){c.fillStyle=`rgba(${70+i*12},${52+i*8},${44+i*6},.55)`;c.fillRect(bx,gy+(bot-gy)*i/5,w,(bot-gy)/5-2);}
    // konen
    const n=layers==null?1:layers,cw=w*.46;
    const poly=(k,col)=>{c.fillStyle=col;c.beginPath();c.moveTo(cx-cw*k,gy);c.lineTo(cx-w*.045*k,gy-cone*k);c.lineTo(cx+w*.045*k,gy-cone*k);c.lineTo(cx+cw*k,gy);c.closePath();c.fill();};
    if(layers==null){poly(1,"#5b4a41");}
    else{const m=Math.max(1,Math.ceil(n));for(let i=m-1;i>=0;i--){const k=(i+1)/6*(i===m-1?(n-(m-1)||1):1);poly(Math.max(.08,k),i%2?"#6a5547":"#8b3d2b");}}
    // magmakammare
    const mw=w*.34,mh=h*.12,my=gy+(bot-gy)*.62;
    const gl=.7+.3*Math.sin(t*2.4);
    c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(cx,my,0,cx,my,mw*.9);g.addColorStop(0,`rgba(255,${150+60*press|0},60,${.35+.4*press})`);g.addColorStop(1,"rgba(255,80,20,0)");c.fillStyle=g;c.fillRect(cx-mw,my-mw,mw*2,mw*2);c.restore();
    c.fillStyle=`rgb(255,${100+50*gl|0},40)`;c.beginPath();c.ellipse(cx,my,mw*.5,mh*.5,0,0,TAU);c.fill();
    // röret
    const rw=w*.035,top=gy-cone;c.fillStyle="#2a1d19";c.fillRect(cx-rw,top,rw*2,my-top);
    const colTop=lerp(my,top,rise);c.fillStyle="#ff8a2a";c.fillRect(cx-rw,colTop,rw*2,my-colTop);
    // bubblor som stiger i röret
    if(rise>0){for(let i=0;i<5;i++){const q=((t*.35+i/5)%1),py=lerp(my,colTop,q);c.fillStyle="rgba(255,235,170,.9)";c.beginPath();c.arc(cx+Math.sin(i*2+t*3)*rw*.4,py,rw*.45*(.6+q*.5),0,TAU);c.fill();}}
    // utbrott
    if(erupt>0){const r=srand(7),k=eo(erupt);c.save();c.globalCompositeOperation="lighter";
      glow(cx,top,w*.22*k,"255,150,60",.85);
      for(let i=0;i<110;i++){const an=-Math.PI/2+(r()-.5)*1.5,sp=h*(.25+r()*.5)*k,tt=((t*.6+r())%1),px=cx+Math.cos(an)*sp*tt*1.3,py=top+Math.sin(an)*sp*tt*1.4+tt*tt*h*.5*k;
        c.fillStyle=r()<.5?"rgba(255,170,70,.9)":"rgba(255,230,160,.9)";c.fillRect(px,py,2.6,2.6);}
      c.restore();
      // askmoln
      for(let i=0;i<26;i++){const q=((t*.18+i/26)%1)*k,px=cx+Math.sin(i*1.7+t*.5)*w*.07*(1+q*3),py=top-q*h*.75,sz=w*.03*(1+q*3);c.fillStyle=`rgba(${80+q*70|0},${74+q*70|0},${72+q*60|0},${.5*(1-q)*k})`;c.beginPath();c.arc(px,py,sz,0,TAU);c.fill();}}
    c.restore();return{cx,top,gy,my,rise:colTop};};

  /* 0 · Inledning */
  const s0=(t)=>{const{s,cx,cy,a}=S();photo(3,t,7,1.12,.3);const f=eo((t-.8)/2),c=x();c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="#fff";c.font=`700 ${Math.round(Math.min(a.w*.13,s*.26))}px "Source Serif 4",Georgia,serif`;c.shadowColor="rgba(0,0,0,.7)";c.shadowBlur=18;c.fillText("VULKAN",cx,cy+s*.03);c.shadowBlur=0;
    tx("SÅ FUNGERAR EN VULKAN",cx,cy+s*.03+Math.max(26,s*.07),"#ffb070","center",Math.max(13,s*.03),700);c.restore();cred(3,.55*f);};

  /* 1 · Het sten: jordens lager, temperatur */
  const s1=(t)=>{const{s,cx,cy,a,port}=S();const g=eo((t-.6)/1.4),c=x();photo(1,t,13.6,1.1,.55+.2*g);cred(1,.5*(1-eo((t-3)/2)));
    const R=Math.min(a.w*(port?.34:.2),a.h*(port?.3:.33)),ex=port?cx:a.x+a.w*.3,ey=port?a.y+a.h*.38:cy;
    c.save();c.globalAlpha=eo((t-1.5)/1.5);
    const L=[[1,"#6b5a4e","Skorpan"],[.995,"#c4511f","Manteln"],[.546,"#ff9a3c","Yttre kärnan"],[.19,"#fff2b0","Inre kärnan"]];
    // lagren
    L.forEach(([k,col])=>{const gg=c.createRadialGradient(ex,ey,R*k*.2,ex,ey,R*k);gg.addColorStop(0,col);gg.addColorStop(1,col);c.fillStyle=col;c.beginPath();c.arc(ex,ey,R*k,0,TAU);c.fill();});
    // glöd i mitten
    glow(ex,ey,R*.7,"255,200,100",.55+.15*Math.sin(t*2));
    c.strokeStyle="rgba(255,255,255,.55)";c.lineWidth=1.2;c.beginPath();c.arc(ex,ey,R,0,TAU);c.stroke();
    c.restore();
    const lb=eo((t-3)/1.5);c.save();c.globalAlpha=lb;
    [["Skorpan",0,R*1.0,-.9],["Manteln: het sten",1,R*.75,-.4],["Yttre kärnan",2,R*.37,.15],["Inre kärnan",3,R*.1,.7]].forEach(([n,i,rr,an])=>{
      const px=ex+Math.cos(an)*rr,py=ey+Math.sin(an)*rr,lx=ex+R*1.08,ly=ey-R*.9+i*R*.5;
      c.strokeStyle="rgba(255,255,255,.55)";c.lineWidth=1;c.beginPath();c.moveTo(px,py);c.lineTo(lx-6,ly-4);c.stroke();tx(n,lx,ly,"#fff","left",Math.max(13,s*.032),700);});
    c.restore();
    // temperatur: inre kärnan mot solens yta (andra repliken)
    const k=eo((t-7.4)/2.5);if(k>0){c.save();c.globalAlpha=k;const bw=Math.min(a.w*.3,s*.55),bx=port?cx-bw/2:a.x+a.w*.5,by=port?a.y+a.h*.8:a.y+a.h*.78,bh=Math.max(22,s*.06);
      tg("Temperatur",bx,by-26,"#7fd6ff","left");
      c.fillStyle="rgba(255,255,255,.12)";c.fillRect(bx,by,bw,bh);c.fillStyle="#ffd86b";c.fillRect(bx,by,bw*(5200/5600)*k,bh);tx("Inre kärnan ca 5 200 °C",bx+6,by+bh*.68,"#06121f","left",Math.max(12,s*.03),700);
      const by2=by+bh+12;c.fillStyle="rgba(255,255,255,.12)";c.fillRect(bx,by2,bw,bh);c.fillStyle="#ff9a5a";c.fillRect(bx,by2,bw*k,bh);tx("Solens yta ca 5 500 °C",bx+6,by2+bh*.68,"#06121f","left",Math.max(12,s*.03),700);c.restore();}};

  /* 2 · Magman stiger, kammaren fylls */
  const s2=(t)=>{const{s,cx,cy,a,port}=S();const c=x();
    c.save();c.fillStyle="#150d0b";c.fillRect(a.x,a.y,a.w,a.h);const sg=c.createLinearGradient(0,a.y,0,a.y+a.h*.5);sg.addColorStop(0,"#1b2a45");sg.addColorStop(1,"#6b5a52");c.fillStyle=sg;c.fillRect(a.x,a.y,a.w,a.h*.5);c.restore();
    const w=Math.min(a.w*.9,s*1.5),h=a.h*.96,bx=cx-w/2,by=a.y+a.h*.02;
    const rise=eo(t/6.6),press=eo((t-7.6)/5);
    const v=volc(bx,by,w,h,t,rise,press,0,null);
    if(t>1.5){const f=eo((t-1.5)/1.2);c.save();c.globalAlpha=f;tx("Magma stiger genom sprickor",v.cx+w*.06,v.my-(v.my-v.top)*.5,"#ffd86b","left",Math.max(13,s*.03),700);c.restore();}
    if(t>7.8){const f=eo((t-7.8)/1.2);c.save();c.globalAlpha=f;tx("Magmakammare",v.cx+w*.2,v.my+8,"#ffb070","left",Math.max(13,s*.03),700);
      const tw=Math.min(w*.3,200),tx0=bx+w*.04,ty0=by+h*.58;tg("Tryck",tx0,ty0-14,"#7fd6ff","left");c.fillStyle="rgba(255,255,255,.14)";c.fillRect(tx0,ty0,tw,16);c.fillStyle=`rgb(255,${200-120*press|0},60)`;c.fillRect(tx0,ty0,tw*press,16);c.restore();}};

  /* 3 · Utbrott: foto, sedan tvärsnitt med utbrott och höjdskala */
  const s3=(t)=>{const{s,cx,cy,a,port}=S();const c=x();const g=eo((t-5)/1.4);photo(3,t,12.6,1.12,.12+.55*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      c.fillStyle="rgba(8,12,24,.8)";c.fillRect(a.x,a.y,a.w,a.h);
      const w=Math.min(a.w*.8,s*1.35),h=a.h*.92,bx=cx-w/2-(port?0:a.w*.07),by=a.y+a.h*.05;
      const v=volc(bx,by,w,h,t,1,1,eo((t-5.8)/2),null);
      // höjdskala
      const sx=a.x+a.w*(port?.9:.9),sy0=v.top,sy1=by+h*.04;c.strokeStyle="rgba(255,255,255,.55)";c.lineWidth=1.2;c.beginPath();c.moveTo(sx,v.top);c.lineTo(sx,by);c.stroke();
      [[0,"0 km"],[.5,"5 km"],[1,"10 km"]].forEach(([q,n])=>{const yy=lerp(v.top,by,q);c.beginPath();c.moveTo(sx-6,yy);c.lineTo(sx+6,yy);c.stroke();tx(n,sx-10,yy+4,"rgba(255,255,255,.8)","right",12,600);});
      const hh=eo((t-7)/4)*.6;c.fillStyle="rgba(255,216,107,.9)";c.fillRect(sx-3,lerp(v.top,by,hh),6,lerp(0,v.top-by,hh));
      c.restore();}};

  /* 4 · Lava: foto, sedan temperatur och svalnande ström */
  const s4=(t)=>{const{s,cx,cy,a,port}=S();const c=x();const g=eo((t-5.8)/1.4);photo(4,t,13.5,1.12,.1+.55*g);cred(4,.55*(1-g));
    const f1=eo((t-1.5)/2);
    if(t>1.5){c.save();c.globalAlpha=f1*(1-g*.0);const bx=a.x+a.w*(port?.08:.06),by=a.y+a.h*.1,bw=Math.min(a.w*.34,s*.6),bh=Math.max(22,s*.06);
      tg("Lavans temperatur",bx,by-10,"#7fd6ff","left");
      c.fillStyle="rgba(4,8,20,.72)";c.fillRect(bx-8,by-24,bw+16,bh*2+30);
      c.fillStyle="rgba(255,255,255,.12)";c.fillRect(bx,by,bw,bh);c.fillStyle="#ff8a2a";c.fillRect(bx,by,bw*eo((t-2)/2.5),bh);tx("över 1 000 °C",bx+6,by+bh*.68,"#06121f","left",Math.max(12,s*.03),700);
      c.restore();}
    if(g>0){c.save();c.globalAlpha=g;
      const w=Math.min(a.w*.84,s*1.5),lx=cx-w/2,ly=cy-s*.06,lh=Math.max(34,s*.1),k=eo((t-7.4)/4);
      c.fillStyle="rgba(4,8,20,.8)";c.fillRect(a.x+a.w*.04,ly-lh*1.8,a.w*.92,lh*4.6);
      tg("Lavaströmmen svalnar",cx,ly-lh*.95,"#7fd6ff","center");
      const gr=c.createLinearGradient(lx,0,lx+w,0);gr.addColorStop(0,"#ffd24a");gr.addColorStop(.3,"#ff7a1f");gr.addColorStop(.62,"#8a2f1c");gr.addColorStop(1,"#2e2a2a");
      c.fillStyle=gr;c.beginPath();c.moveTo(lx,ly);for(let i=0;i<=40;i++){const q=i/40;c.lineTo(lx+w*q*k,ly+Math.sin(q*6+t*1.2)*lh*.08-lh*.5);}for(let i=40;i>=0;i--){const q=i/40;c.lineTo(lx+w*q*k,ly+lh*.5+Math.sin(q*5+t)*lh*.08);}c.closePath();c.fill();
      c.globalAlpha=g*cl((t-9)/1.5,0,1);tx("het lava",lx+w*.05,ly+lh*1.25,"#ffb070","left",Math.max(13,s*.032),700);tx("hård sten",lx+w*.95,ly+lh*1.25,"#c9c3c0","right",Math.max(13,s*.032),700);
      c.restore();}};

  /* 5 · Berget växer: foto på Fuji, sedan lager för lager */
  const s5=(t)=>{const{s,cx,cy,a,port}=S();const c=x();const g=eo((t-5.2)/1.4);photo(5,t,15.6,1.1,.08+.55*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      c.fillStyle="rgba(8,12,24,.82)";c.fillRect(a.x,a.y,a.w,a.h);
      const w=Math.min(a.w*.8,s*1.35),h=a.h*.9,bx=cx-w/2,by=a.y+a.h*.06;
      const n=eo((t-6)/6)*6;
      volc(bx,by,w,h,t,0,0,0,n);
      // dessa fyra nedre lager får årtal
      if(t>6.5)tx(n<5.9?"lager efter lager …":"tusentals år",cx,by+h*.5-h*.42-14,"#ffd86b","center",Math.max(14,s*.034),700);
      if(t>12){const f=eo((t-12)/1.6);c.globalAlpha=g*f;tx("Fuji, Japan: 3 776 m",cx+w*.3,by+h*.14,"#fff","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 6 · Island: foto på Geysir, sedan plattor som glider isär */
  const s6=(t)=>{const{s,cx,cy,a,port}=S();const c=x();const g=eo((t-4.8)/1.4);photo(6,t,15,1.1,.08+.6*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      c.fillStyle="rgba(8,12,24,.84)";c.fillRect(a.x,a.y,a.w,a.h);
      const w=Math.min(a.w*.86,s*1.5),lx=cx-w/2,gy=cy-s*.1,th=s*.22,gap=eo((t-6.4)/4)*w*.07+w*.012;
      // två plattor som glider isär
      c.fillStyle="#6b5a4e";c.fillRect(lx,gy,w/2-gap,th);c.fillRect(cx+gap,gy,w/2-gap,th);
      c.fillStyle="#4a3b33";c.fillRect(lx,gy+th,w,s*.12);
      // magma upp i springan
      const mh=th+s*.12;const rise=eo((t-7.4)/3);c.fillStyle="#ff7a2a";c.fillRect(cx-gap,gy+mh-mh*rise,gap*2,mh*rise);
      glow(cx,gy+th+s*.1,s*.25,"255,120,40",.5*rise);
      c.fillStyle="#ff9a3c";c.beginPath();c.ellipse(cx,gy+th+s*.1,w*.18,s*.05,0,0,TAU);c.fill();
      // pilar isär
      const ar=(x1,x2)=>{c.strokeStyle="#7fd6ff";c.lineWidth=3;c.beginPath();c.moveTo(x1,gy-18);c.lineTo(x2,gy-18);c.stroke();const d=x2>x1?-1:1;c.fillStyle="#7fd6ff";c.beginPath();c.moveTo(x2,gy-18);c.lineTo(x2+d*12,gy-26);c.lineTo(x2+d*12,gy-10);c.fill();};
      if(t>6.4){ar(cx-gap-12,lx+w*.18);ar(cx+gap+12,lx+w*.82);}
      tx("Jordplatta",lx+w*.25,gy+th*.55,"#fff","center",Math.max(13,s*.032),700);tx("Jordplatta",lx+w*.75,gy+th*.55,"#fff","center",Math.max(13,s*.032),700);
      if(t>9)tx("Island ligger här",cx,gy-s*.12,"#ffd86b","center",Math.max(15,s*.04),700);
      // gejser
      if(t>10.5){const k=eo((t-10.5)/2),r=srand(3);c.fillStyle="rgba(210,235,255,.85)";for(let i=0;i<60;i++){const q=((t*.8+r())%1),px=cx+(r()-.5)*s*.05*(1+q*2)+w*.3,py=gy-q*s*.32*k;c.fillRect(px,py,2.4,2.4);}tx("Gejser",cx+w*.3,gy-s*.36,"#cfe9ff","center",13,700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
