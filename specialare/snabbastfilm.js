/* Snabbaste djuren: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js (MPSvartHal.start med o.def). Röst: ../ljud/snabbast/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/snabbast-1..6.jpg. MPSnabbastFilm.start(host,{overlay,onClose}). Ljudmatta: meta.mat = "vind" finns inte i Ljud.ambient och ger standardljudet (vind med mjuka toner). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/specialare/";}})();
const TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7,cap:[[0.5,"Vem är snabbast av alla? Här är en tävling mellan jordens snabbaste djur."]]},
 {k:"01 · Pilgrimsfalken",d:9.4,cap:[[0.8,"Snabbast i världen är pilgrimsfalken. När den störtdyker efter en fågel kan den komma upp i över 300 kilometer i timmen."]]},
 {k:"02 · Geparden",d:8.2,cap:[[0.8,"Snabbast på marken är geparden, upp till ungefär 100 kilometer i timmen. Men bara i korta sprintar."]]},
 {k:"03 · Seglarfisken",d:8.9,cap:[[0.8,"Seglarfisken är en av de snabbaste fiskarna, kanske runt 100 kilometer i timmen. Den är svår att mäta."]]},
 {k:"04 · Långsam och snabb",d:14.7,cap:[[0.8,"Trädsengångaren rör sig sakta och sover mycket. Den spar energi på det sättet."],[7,"Den snabbaste människan har sprungit ungefär 44 kilometer i timmen, men bara en liten stund."]]},
 {k:"05 · Tävlingen",d:8.4,cap:[[0.8,"Så här ser tävlingen ut om alla fick tävla sida vid sida. Pilgrimsfalken är långt före de andra."]]},
 {k:"06 · Räkna ut",d:14.9,cap:[[0.8,"En gepard som springer 100 kilometer i timmen tar ungefär 36 sekunder på sig för en kilometer."],[8,"Kan du springa en kilometer så fort? Den snabbaste människan behöver mer än två minuter."]]}
];
const META={mat:"vind",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Snabbaste djuren",under:"En film i sju steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Naturen är full av rekord. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Kytabu · CC BY-SA 4.0 · Wikimedia Commons",2:"Foto: Alexander Klink · CC BY 4.0 · Wikimedia Commons",3:"Foto: 出羽雀台 · CC BY-SA 4.0 · Wikimedia Commons",4:"Foto: Urak-Tou · CC BY 4.0 · Wikimedia Commons",5:"Foto: Ibex73 · CC BY 4.0 · Wikimedia Commons",6:"Foto: Ansgar Koreng · CC BY-SA 4.0 · Wikimedia Commons"};
const IMG={};function img(n){const u=ROOT+"bilder/snabbast-"+n+".jpg";if(!IMG[u]){const i=new Image();i.src=u;IMG[u]=i;}return IMG[u];}
[1,2,3,4,5,6].forEach(img);
const ok=i=>i&&i.complete&&i.naturalWidth;

window.MPSnabbastFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"snabbast",scenes:E=>scenes(E)}}));
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
  const panel=(a,al)=>{const c=x();c.save();c.globalAlpha=al;const g=c.createLinearGradient(0,a.y,0,a.y+a.h);g.addColorStop(0,"#0b1830");g.addColorStop(1,"#10223e");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};

  /* fartmätare: halvcirkel 0..MAX km/h */
  const MAX=350;
  const gauge=(cx,cy,R,val,col,label,jit,t)=>{const c=x();c.save();c.lineCap="round";
    c.strokeStyle="rgba(255,255,255,.12)";c.lineWidth=Math.max(8,R*.12);c.beginPath();c.arc(cx,cy,R,Math.PI,TAU);c.stroke();
    const v=Math.max(0,val+(jit?Math.sin(t*9)*jit:0)),a1=Math.PI+Math.PI*cl(v/MAX,0,1);
    c.strokeStyle=col;c.shadowColor=col;c.shadowBlur=12;c.beginPath();c.arc(cx,cy,R,Math.PI,a1);c.stroke();c.shadowBlur=0;
    c.lineWidth=1.5;c.strokeStyle="rgba(255,255,255,.55)";c.fillStyle="rgba(255,255,255,.7)";c.font=font(600,Math.max(11,R*.1));c.textAlign="center";
    for(let m=0;m<=MAX;m+=50){const an=Math.PI+Math.PI*m/MAX,r0=R*.8,r1=R*.9;c.beginPath();c.moveTo(cx+Math.cos(an)*r0,cy+Math.sin(an)*r0);c.lineTo(cx+Math.cos(an)*r1,cy+Math.sin(an)*r1);c.stroke();c.fillText(m,cx+Math.cos(an)*R*.68,cy+Math.sin(an)*R*.68+4);}
    // visare
    c.strokeStyle="#fff";c.lineWidth=Math.max(3,R*.035);c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(a1)*R*.9,cy+Math.sin(a1)*R*.9);c.stroke();c.fillStyle="#fff";c.beginPath();c.arc(cx,cy,R*.06,0,TAU);c.fill();
    c.fillStyle=col;c.font=font(700,Math.max(22,R*.3));c.textAlign="center";c.fillText(Math.round(v),cx,cy+R*.38);
    tx("km/h",cx,cy+R*.38+Math.max(16,R*.14),"rgba(255,255,255,.8)","center",Math.max(12,R*.1),700);
    if(label)tx(label,cx,cy-R*1.25,col,"center",Math.max(15,R*.14),700);
    c.restore();};
  /* falk som störtdyker, spetsen riktad åt ner-höger; L = längd */
  const falcon=(px,py,L,col,ang)=>{const c=x(),u=L/100;c.save();c.translate(px,py);c.rotate(ang);c.fillStyle=col;
    c.beginPath();c.moveTo(50*u,0);c.quadraticCurveTo(20*u,-8*u,-30*u,-3*u);c.lineTo(-48*u,0);c.lineTo(-30*u,3*u);c.quadraticCurveTo(20*u,8*u,50*u,0);c.fill();   // kropp
    c.beginPath();c.moveTo(14*u,-2*u);c.lineTo(-30*u,-26*u);c.lineTo(-18*u,-2*u);c.closePath();c.fill();                                                     // vinge
    c.beginPath();c.moveTo(14*u,2*u);c.lineTo(-30*u,26*u);c.lineTo(-18*u,2*u);c.closePath();c.fill();
    c.fillStyle="#e8d8b4";c.beginPath();c.arc(40*u,-1*u,3*u,0,TAU);c.fill();c.restore();};

  /* 0 · Inledning */
  const s0=(t)=>{const{s,cx,cy,a}=S();photo(1,t,7,1.12,.35);const f=eo((t-.8)/2),c=x();c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="#fff";c.font=`700 ${Math.round(Math.min(a.w*.085,s*.17))}px "Source Serif 4",Georgia,serif`;c.shadowColor="rgba(0,0,0,.7)";c.shadowBlur=18;c.fillText("SNABBASTE DJUREN",cx,cy+s*.05);c.shadowBlur=0;
    tx("EN TÄVLING I RÄKNING",cx,cy+s*.05+Math.max(26,s*.07),"#ffcf8a","center",Math.max(13,s*.03),700);c.restore();cred(1,.55*f);};

  /* 1 · Pilgrimsfalken: foto, sedan störtdykning och fartmätare mot 300+ */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(1,t,9.4,1.1,.1+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const R=Math.min(a.w*(port?.38:.22),a.h*(port?.2:.34)),gx=port?cx:a.x+a.w*.72,gy=port?a.y+a.h*.76:cy+R*.35;
      // störtdykning
      const sx=a.x+a.w*.1,sy=a.y+a.h*.1,ex=port?a.x+a.w*.85:a.x+a.w*.5,ey=port?a.y+a.h*.5:a.y+a.h*.74,p=eo((t-4)/3);
      c.strokeStyle="rgba(255,255,255,.18)";c.lineWidth=2;c.setLineDash([6,8]);c.beginPath();c.moveTo(sx,sy);c.lineTo(ex,ey);c.stroke();c.setLineDash([]);
      const fx=lerp(sx,ex,p),fy=lerp(sy,ey,p),ang=Math.atan2(ey-sy,ex-sx),L=Math.min(a.w*.14,s*.2);
      for(let i=1;i<9;i++){c.strokeStyle=`rgba(255,255,255,${.25*(1-i/9)*cl(p*3,0,1)})`;c.lineWidth=2;const o=i*L*.28;c.beginPath();c.moveTo(fx-Math.cos(ang)*(o+L*.5),fy-Math.sin(ang)*(o+L*.5)+i*1.5);c.lineTo(fx-Math.cos(ang)*(o+L*.9),fy-Math.sin(ang)*(o+L*.9)+i*1.5);c.stroke();}
      falcon(fx,fy,L,"#cfd8e3",ang);
      gauge(gx,gy,R,320*eo((t-4)/3.4),"#ffd86b","Pilgrimsfalken",0,t);
      if(t>7.4)tx("över 300 km/h",gx,gy+R*.38+Math.max(40,R*.38),"#fff","center",Math.max(15,R*.14),700);
      c.restore();}};

  /* 2 · Geparden: foto, sedan fartmätare mot 100 och en kort sprint */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(2,t,8.2,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const R=Math.min(a.w*(port?.38:.26),a.h*(port?.22:.38));gauge(cx,cy+R*.15,R,100*eo((t-3.6)/2),"#ffa24a","Geparden",0,t);
      if(t>5.6){const q=eo((t-5.6)/1),w=Math.min(a.w*.6,s*1.2),y=cy+R*.15+R*.9;c.globalAlpha=g*q;
        c.fillStyle="rgba(255,255,255,.12)";c.fillRect(cx-w/2,y,w,12);c.fillStyle="#ffa24a";c.fillRect(cx-w/2,y,w*.12,12);
        tx("bara en kort sprint",cx,y+Math.max(32,s*.07),"#ffd0a0","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 3 · Seglarfisken: foto, sedan fartmätare som darrar (svår att mäta) */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(3,t,8.9,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const R=Math.min(a.w*(port?.38:.26),a.h*(port?.22:.38)),k=eo((t-3.6)/2);gauge(cx,cy+R*.15,R,100*k,"#5cc8e8","Seglarfisken",t>5.8?14*k:0,t);
      if(t>5.8){const q=eo((t-5.8)/1);c.globalAlpha=g*q;tx("kanske runt 100 · svår att mäta",cx,cy+R*.15+R*.9,"#bfeaf7","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 4 · Sengångaren och människan */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    if(t<6.8){photo(4,t,6.8,1.12,.2);cred(4,.55);const f=eo((t-1.2)/1);c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="rgba(6,10,22,.72)";c.fillRect(a.x,a.y+a.h*.74,a.w,a.h*.14);tx("Trädsengångaren: långsam och sparsam",cx,a.y+a.h*.74+a.h*.09,"#cfe8ff","center",Math.max(15,s*.04),700);c.restore();}
    else{const g=eo((t-7)/1.1);photo(5,t-6.8,8,1.1,.15+.4*eo((t-9.6)/1));cred(5,.55*g);
      if(t>9.8){const q=eo((t-9.8)/1.2);c.save();c.globalAlpha=q;c.fillStyle="rgba(6,10,22,.78)";c.fillRect(a.x,a.y+a.h*.38,a.w,a.h*.5);const R=Math.min(a.w*(port?.3:.18),a.h*.2);gauge(cx,a.y+a.h*.76,R,44*eo((t-10)/1.6),"#9be3b0","Snabbaste människan",0,t);c.restore();}}};

  /* 5 · Tävlingen: fyra banor, falken långt före */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();panel(a,1);
    const lanes=[["Pilgrimsfalken",320,"#ffd86b"],["Geparden",100,"#ffa24a"],["Seglarfisken",100,"#5cc8e8"],["Människan",44,"#9be3b0"]];
    const w=Math.min(a.w*.8,s*1.7),lx=cx-w/2+(port?0:30),lh=Math.min(a.h*.14,s*.14),y0=a.y+a.h*.2,fin=lx+w*.92;
    tg("Km/h",cx,a.y+a.h*.1,"#7fd6ff","center");
    c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=2;c.beginPath();c.moveTo(lx,y0-8);c.lineTo(lx,y0+lanes.length*lh);c.stroke();
    c.strokeStyle="#fff";c.setLineDash([6,6]);c.beginPath();c.moveTo(fin,y0-8);c.lineTo(fin,y0+lanes.length*lh);c.stroke();c.setLineDash([]);
    const run=cl((t-1.2)/5.4,0,1);
    lanes.forEach(([n,v,col],i)=>{const y=y0+i*lh+lh*.5,reach=Math.min(1,v/320*run*1.0);c.fillStyle="rgba(255,255,255,.07)";c.fillRect(lx,y-lh*.28,fin-lx,lh*.56);
      const px=lx+(fin-lx)*reach;c.fillStyle=col;c.fillRect(lx,y-lh*.1,px-lx,lh*.2);c.beginPath();c.arc(px,y,lh*.26,0,TAU);c.fill();
      tx(n,lx+6,y-lh*.34,col,"left",Math.max(12,s*.028),700);if(run>.97||i===0&&reach>.5)tx(v>300?"över 300":("ca "+v),Math.min(px+lh*.4,fin+6)+(i===0?-lh*1.8:0),y+lh*.07,i===0?"#06121f":col,"left",Math.max(12,s*.028),700);});};

  /* 6 · Räkna ut: stoppur-foto, sedan gepard mot människa på 1 km */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(6,t,14.9,1.1,.15+.45*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.8,s*1.6),lx=cx-w/2,y1=cy-s*.1,bh=Math.max(24,s*.07);
      tg("1 kilometer",cx,a.y+a.h*.1,"#7fd6ff","center");
      c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=2;c.beginPath();c.moveTo(lx,y1-bh);c.lineTo(lx,y1+bh*3.2);c.moveTo(lx+w,y1-bh);c.lineTo(lx+w,y1+bh*3.2);c.stroke();
      const run=cl((t-3.8)/4,0,1),sec=Math.round(36*run);
      c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y1,w,bh);c.fillStyle="#ffa24a";c.fillRect(lx,y1,w*run,bh);tx("Gepard",lx+6,y1-8,"#ffa24a","left",Math.max(13,s*.032),700);
      tx(sec+" s",lx+w*run,y1+bh*.7,run>.98?"#06121f":"#fff",run>.98?"right":"left",Math.max(14,s*.036),700);
      if(t>8){const q=eo((t-8)/1),y2=y1+bh*2.2,hr=cl((t-8.6)/4.5,0,1)*(36/131);c.globalAlpha=g*q;c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y2,w,bh);c.fillStyle="#9be3b0";c.fillRect(lx,y2,w*hr,bh);tx("Snabbaste människan",lx+6,y2-8,"#9be3b0","left",Math.max(13,s*.032),700);
        tx("efter 36 s",lx+w*Math.max(.04,hr)+8,y2+bh*.7,"#fff","left",Math.max(12,s*.03),700);tx("hela sträckan tar över 2 minuter",cx,y2+bh*1.65,"#cfe8ff","center",Math.max(12,s*.03),600);
        if(t>10.2){const q2=eo((t-10.2)/1);c.globalAlpha=g*q2;tx("Geparden är nästan 4 gånger snabbare",cx,y2+bh*3.1,"#ffd86b","center",Math.max(14,s*.034),700);}}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
