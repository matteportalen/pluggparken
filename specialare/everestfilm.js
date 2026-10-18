/* Mount Everest: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/everest/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/everest-1..6.jpg. MPEverestFilm.start(host,{overlay,onClose}). Ljudmatta: vind (standardljudet). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:8.6,cap:[[0.5,"Högst upp på jorden är luften tunn och vindarna iskalla. Det här är berättelsen om Mount Everest."]]},
 {k:"01 · Högst på jorden",d:7.8,cap:[[0.8,"Mount Everest är 8 849 meter högt och ligger mellan Nepal och Tibet."]]},
 {k:"02 · Iskallt",d:7.9,cap:[[0.8,"Högst upp kan det vara långt under minus 30 grader. Där blåser också mycket kraftiga vindar."]]},
 {k:"03 · Lite syre",d:8.1,cap:[[0.8,"Högt upp är luften tunn. Det finns mycket mindre syre, så klättrarna bär ofta med sig syrgas."]]},
 {k:"04 · Första toppen",d:10,cap:[[0.8,"År 1953 nådde Edmund Hillary från Nya Zeeland och Tenzing Norgay från Nepal toppen för första gången."]]},
 {k:"05 · Sherpafolket",d:8.1,cap:[[0.8,"Sherpor som bor i bergen hjälper klättrare att hitta vägen och bära utrustning. De är vana vid höjden."]]},
 {k:"06 · Berget växer",d:6.9,cap:[[0.8,"Bergen i Himalaya trycks upp ännu i dag, ungefär 4 millimeter om året."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Mount Everest",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Berget är fortfarande på väg uppåt. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Vyacheslav Argenberg · CC BY 4.0 · Wikimedia Commons",2:"Foto: Daniel Oberhaus · CC BY-SA 4.0 · Wikimedia Commons",3:"Foto: Vlvescovo (Kami Rita Sherpa, 2010) · CC BY-SA 4.0 · Wikimedia Commons",4:"Foto: Jamling Tenzing Norgay · CC BY-SA 3.0 · Wikimedia Commons",5:"Foto: Goutam1962 · CC BY-SA 4.0 · Wikimedia Commons",6:"Foto: NASA · Public domain · Wikimedia Commons"};

window.MPEverestFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"everest",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"everest-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,man,title}=L;
  /* berg: triangel med snötopp, bas på y=gy, bredd W, höjd H */
  const mount=(cx,gy,W,H,col,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.fillStyle=col||"#6b7a90";c.beginPath();c.moveTo(cx-W/2,gy);c.lineTo(cx-W*.06,gy-H*.97);c.lineTo(cx,gy-H);c.lineTo(cx+W*.08,gy-H*.94);c.lineTo(cx+W/2,gy);c.closePath();c.fill();
    c.fillStyle="#eef3fa";c.beginPath();c.moveTo(cx-W*.1,gy-H*.78);c.lineTo(cx-W*.06,gy-H*.97);c.lineTo(cx,gy-H);c.lineTo(cx+W*.08,gy-H*.94);c.lineTo(cx+W*.13,gy-H*.74);c.lineTo(cx+W*.05,gy-H*.8);c.lineTo(cx-W*.02,gy-H*.72);c.closePath();c.fill();
    c.fillStyle="rgba(0,0,0,.18)";c.beginPath();c.moveTo(cx,gy-H);c.lineTo(cx+W*.08,gy-H*.94);c.lineTo(cx+W/2,gy);c.lineTo(cx+W*.1,gy);c.closePath();c.fill();c.restore();};

  const s0=(t)=>{photo(1,t,8.6,1.12,.3);const f=title(t,"MOUNT EVEREST","JORDENS HÖGSTA BERG","#cfe8ff");cred(1,.55*f);};

  /* 1 · Högst: foto, sedan jämförelse med Kebnekaise */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.8)/1.1);photo(6,t,7.6,1.1,.1+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d2142"],[1,"#2a4a7a"]]);
      const gy=a.y+a.h*.86,Hm=Math.min(a.h*.66,a.w*.6),sc=Hm/8849,px=cx-Math.min(a.w*.2,s*.34),k=eo((t-3.4)/1.6);
      c.fillStyle="#1c2d44";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
      mount(px,gy,Hm*1.3,Hm*k,"#6b7a90");
      const kx=cx+Math.min(a.w*.25,s*.42),kh=2096*sc*k;mount(kx,gy,Math.max(30,kh*1.6),kh,"#5a6f86");
      if(k>.95){tx("Mount Everest",px,gy+Math.max(26,s*.058),"#fff","center",Math.max(14,s*.034),700);tx("8 849 m",px,gy-Hm-12,"#ffd86b","center",Math.max(20,s*.055),700);
        tx("Kebnekaise",kx,gy+Math.max(26,s*.058),"#cfe8ff","center",Math.max(13,s*.032),700);tx("2 100 m",kx,gy-kh-10,"#cfe8ff","center",Math.max(14,s*.036),700);}
      c.restore();}};

  /* 2 · Iskallt: termometer och vind */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(2,t,7.9,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d1f3d"],[1,"#1e3a63"]]);
      const th=Math.min(a.h*.6,s*.8),tw=Math.max(26,s*.07),tx0=cx-(port?0:a.w*.14),ty=a.y+a.h*.16;
      // termometer: skala -40..+20
      const yv=v=>ty+th*(1-(v+40)/60);
      c.fillStyle="rgba(255,255,255,.15)";c.beginPath();c.roundRect?c.roundRect(tx0-tw/2,ty,tw,th,tw/2):c.rect(tx0-tw/2,ty,tw,th);c.fill();
      const cur=lerp(15,-30,eo((t-3.4)/2.4)),col=cur<0?"#7ec8ff":"#ff8a6a";c.fillStyle=col;c.fillRect(tx0-tw*.28,yv(cur),tw*.56,ty+th-yv(cur));c.beginPath();c.arc(tx0,ty+th+tw*.1,tw*.7,0,TAU);c.fill();
      c.fillStyle="rgba(255,255,255,.8)";c.font=font(600,Math.max(11,s*.028));c.textAlign="left";[-40,-30,-20,-10,0,10,20].forEach(v=>{c.fillRect(tx0+tw*.6,yv(v),8,1.5);c.fillText(v+"°",tx0+tw*.6+14,yv(v)+4);});
      tx(Math.round(cur)+"°",tx0,ty-16,col,"center",Math.max(24,s*.07),700);
      if(t>5.8){const q=eo((t-5.8)/1);c.globalAlpha=g*q;
        const wx=port?cx:cx+a.w*.2,wy=a.y+a.h*.42;c.strokeStyle="rgba(255,255,255,.65)";c.lineWidth=2.5;c.lineCap="round";
        for(let i=0;i<5;i++){const off=((t*300+i*80)%(a.w*.3)),yy=wy+i*s*.06,len=40+i*6;c.beginPath();c.moveTo(wx-a.w*.15+off,yy);c.lineTo(wx-a.w*.15+off+len,yy);c.stroke();}
        tx("kraftiga vindar",wx,wy+s*.36,"#fff","center",Math.max(15,s*.038),700);}
      c.restore();}};

  /* 3 · Lite syre: två rutor med syrepunkter */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.8)/1.1);photo(3,t,8.1,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const bw=Math.min(a.w*(port?.4:.3),s*.5),bh=bw*.8,dx=Math.min(a.w*.22,s*.4),y=cy-bh*.5-s*.02,cols=6,rows=5,r=Math.max(3,bw/cols*.22);
      const box=(px,full,label,col)=>{c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=2;c.strokeRect(px-bw/2,y,bw,bh);const rnd=L.srand(full?3:9);const n=cols*rows,keep=full?n:10;const idx=[...Array(n).keys()].sort(()=>rnd()-.5).slice(0,keep);
        idx.forEach(i=>{const cc=i%cols,rr=Math.floor(i/cols);c.fillStyle=col;c.beginPath();c.arc(px-bw/2+(cc+.5)*bw/cols,y+(rr+.5)*bh/rows,r,0,TAU);c.fill();});tx(label,px,y+bh+Math.max(28,s*.065),col,"center",Math.max(14,s*.034),700);};
      box(cx-dx,true,"Havsnivå","#7ec8ff");const k=eo((t-4)/1);c.globalAlpha=g*k;box(cx+dx,false,"Everests topp","#ffd86b");
      if(t>5.6){const q=eo((t-5.6)/1);c.globalAlpha=g*q;tx("ungefär en tredjedel av syret",cx,a.y+a.h*.14,"#fff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 4 · Första toppen */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(4,t,10,1.1,.1+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#0d2142"],[1,"#2a4a7a"]]);
      const gy=a.y+a.h*.88,H=Math.min(a.h*.5,a.w*.45),W=H*1.5;mount(cx,gy,W,H,"#6b7a90");
      // stig i sicksack mot toppen
      const pts=[[0,.02],[-.18,.2],[.1,.38],[-.1,.55],[.06,.72],[-.01,.97]].map(([dx,dy])=>[cx+dx*W*.5,gy-dy*H]);
      c.strokeStyle="rgba(255,216,107,.45)";c.setLineDash([6,7]);c.lineWidth=2.5;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();c.setLineDash([]);
      const p=eo((t-4)/5),seg=p*(pts.length-1),i0=Math.min(pts.length-2,Math.floor(seg)),f=seg-i0,px=lerp(pts[i0][0],pts[i0+1][0],f),py=lerp(pts[i0][1],pts[i0+1][1],f);
      [[-7,"#ff8a6a"],[7,"#7ec8ff"]].forEach(([d,col])=>{c.fillStyle=col;c.beginPath();c.arc(px+d,py-6,6,0,TAU);c.fill();c.fillRect(px+d-3,py-1,6,10);});
      if(p>.97){c.strokeStyle="#fff";c.lineWidth=3;c.beginPath();c.moveTo(cx,gy-H);c.lineTo(cx,gy-H-Math.max(26,s*.07));c.stroke();c.fillStyle="#e84a4a";c.beginPath();c.moveTo(cx,gy-H-Math.max(26,s*.07));c.lineTo(cx+Math.max(22,s*.06),gy-H-Math.max(20,s*.055));c.lineTo(cx,gy-H-Math.max(14,s*.04));c.fill();}
      tx("1953",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(34,s*.1),700);
      if(t>6){const q=eo((t-6)/1);c.globalAlpha=g*q;tx("Edmund Hillary · Tenzing Norgay",cx,a.y+a.h*.1+Math.max(34,s*.075),"#fff","center",Math.max(15,s*.038),700);}
      c.restore();}};

  /* 5 · Sherpafolket */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(5,t,8.1,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const items=[["Hittar vägen","#7ec8ff"],["Bär utrustning","#ffd86b"],["Vana vid höjden","#9be3b0"]],w=Math.min(a.w*.8,s*1.1),h=Math.max(54,s*.13),y0=cy-h*1.9;
      items.forEach(([n,col],i)=>{const q=eo((t-3.8-i*1.2)/.8);if(q<=0)return;const y=y0+i*h*1.35;c.save();c.globalAlpha=g*q;c.fillStyle="rgba(255,255,255,.07)";c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.roundRect?c.roundRect(cx-w/2,y,w,h,14):c.rect(cx-w/2,y,w,h);c.fill();c.stroke();
        c.fillStyle=col;c.beginPath();c.arc(cx-w/2+h*.5,y+h/2,h*.22,0,TAU);c.fill();tx(n,cx-w/2+h*1.05,y+h*.63,"#fff","left",Math.max(17,h*.38),700);c.restore();});
      c.restore();}};

  /* 6 · Berget växer: två plattor trycker ihop och trycker upp berget */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();grad(a,[[0,"#0d1f3d"],[1,"#1e3a63"]]);
    const gy=a.y+a.h*.66,bh=a.h*.2,w=a.w*.9,lx=cx-w/2,move=Math.min(1,(t-1)/5)*a.w*.04,rise=Math.min(1,(t-1)/5)*a.h*.05;
    // jordskorpan
    c.fillStyle="#8b6c48";c.fillRect(lx+move,gy,w/2-move,bh);c.fillStyle="#a07c52";c.fillRect(cx,gy,w/2-move,bh);c.strokeStyle="rgba(0,0,0,.35)";c.lineWidth=2;c.beginPath();c.moveTo(cx,gy);c.lineTo(cx,gy+bh);c.stroke();
    // berget växer i mitten
    const H=a.h*.3+rise*3,W=Math.min(a.w*.5,s*.9);mount(cx,gy,W,H,"#6b7a90");
    // pilar
    c.strokeStyle="#ffd86b";c.fillStyle="#ffd86b";c.lineWidth=4;c.lineCap="round";[[-1],[1]].forEach(([d])=>{const sx=cx+d*(a.w*.34),ex=cx+d*(a.w*.2+Math.sin(t*3)*4);c.beginPath();c.moveTo(sx,gy+bh*.5);c.lineTo(ex,gy+bh*.5);c.stroke();c.beginPath();c.moveTo(ex,gy+bh*.5);c.lineTo(ex+d*14,gy+bh*.5-8);c.lineTo(ex+d*14,gy+bh*.5+8);c.fill();});
    tx("Indien",a.x+a.w*.2,gy+bh+Math.max(26,s*.058),"#ffd0a0","center",Math.max(14,s*.034),700);tx("Asien",a.x+a.w*.8,gy+bh+Math.max(26,s*.058),"#ffd0a0","center",Math.max(14,s*.034),700);
    const f=eo((t-3)/1);if(f>0){c.save();c.globalAlpha=f;tx("4 millimeter om året",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(20,s*.055),700);c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
