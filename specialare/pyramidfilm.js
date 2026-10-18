/* Pyramiderna: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js (MPSvartHal.start med o.def). Röst: ../ljud/pyramiderna/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/pyramid-1..6.jpg. MPPyramidFilm.start(host,{overlay,onClose}). Ljudmatta: vind (meta.mat = "pyramid" finns inte i Ljud.ambient och ger standardljudet: vind med mjuka toner). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/specialare/";}})();
const TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.7,cap:[[0.5,"Mitt i öknen står ett av människans största byggen. Det här är berättelsen om pyramiderna."]]},
 {k:"01 · Mitt i öknen",d:7.8,cap:[[0.8,"Vid Giza i Egypten står Cheopspyramiden. Den byggdes för ungefär 4 500 år sedan."]]},
 {k:"02 · Miljontals block",d:7.4,cap:[[0.8,"Pyramiden består av över två miljoner stenblock."],[4.3,"Många av dem väger lika mycket som en bil."]]},
 {k:"03 · Högst i världen",d:9.4,cap:[[0.8,"I nästan 4 000 år var den det högsta byggnadsverket på jorden."],[5.1,"Från början var den ungefär 146 meter hög."]]},
 {k:"04 · Byggarna",d:10.2,cap:[[0.8,"Tusentals arbetare byggde den under många år."],[4.1,"De hade inga kranar, utan använde ramper, rep och mycket muskelkraft."]]},
 {k:"05 · En grav",d:8.9,cap:[[0.8,"Pyramiden byggdes som grav åt kungen, farao Cheops."],[4.9,"De trodde att han skulle behöva sina saker i nästa liv."]]},
 {k:"06 · Exakt byggd",d:9.7,cap:[[0.8,"Sidorna pekar nästan exakt mot norr, söder, öster och väster. Det är fantastiskt noggrant för så länge sedan."]]}
];
const META={mat:"pyramid",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Pyramiderna",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Pyramiderna har stått i över 4 000 år. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Kallerna · CC BY-SA 3.0 · Wikimedia Commons",2:"Foto: Bilal Detailz · CC BY-SA 4.0 · Wikimedia Commons",3:"Foto: Nina R from Africa · CC BY 2.0 · Wikimedia Commons",4:"Teckning av egyptiska arbetare (tegeltillverkning i Thebe), ur en gammal bok · Wikimedia Commons",5:"Foto: Kallerna · CC BY-SA 3.0 · Wikimedia Commons",6:"Foto: Raimond Spekking · CC BY-SA 4.0 · Wikimedia Commons"};
const IMG={};function img(n){const u=ROOT+"bilder/pyramid-"+n+".jpg";if(!IMG[u]){const i=new Image();i.src=u;IMG[u]=i;}return IMG[u];}
[1,2,3,4,5,6].forEach(img);
const ok=i=>i&&i.complete&&i.naturalWidth;

window.MPPyramidFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"pyramiderna",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {A,eo,cl,lerp,font}=E;
  const x=()=>E.x;
  const tx=(t,px,py,col,al,sz,w)=>{const c=x();c.font=font(w||600,sz||12);c.fillStyle=col||"rgba(255,255,255,.88)";c.textAlign=al||"left";c.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#ffcf8a",al,11,700);
  const S=()=>{const a=A();return{a,s:Math.min(a.w,a.h),cx:a.x+a.w/2,cy:a.y+a.h/2,port:E.W<E.H*.9};};
  const cred=(n,a)=>{const c=x();c.save();c.globalAlpha=a==null?.6:a;c.fillStyle="#fff";c.font=font(600,11);c.textAlign="right";c.fillText(KR[n],E.W-Math.max(14,E.W*.03),E.H-Math.max(96,E.H*.13));c.restore();};
  const photo=(n,t,dur,zoom,dim)=>{const c=x(),a=A(),im=img(n);if(!ok(im))return;const k=cl(t/Math.max(1,dur),0,1),z=lerp(1,zoom||1.12,k);
    const sc=Math.max(a.w/im.naturalWidth,a.h/im.naturalHeight)*z,iw=im.naturalWidth*sc,ih=im.naturalHeight*sc;
    c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=eo(t/1.6);c.drawImage(im,a.x+a.w/2-iw/2,a.y+a.h/2-ih/2,iw,ih);
    c.fillStyle=`rgba(2,4,12,${dim||0})`;c.fillRect(a.x,a.y,a.w,a.h);
    const g=c.createRadialGradient(a.x+a.w/2,a.y+a.h/2,Math.min(a.w,a.h)*.3,a.x+a.w/2,a.y+a.h/2,Math.max(a.w,a.h)*.62);g.addColorStop(0,"rgba(2,3,10,0)");g.addColorStop(1,"rgba(2,3,10,.82)");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};
  /* mörk ökenkväll som bakgrund för egen grafik */
  const dusk=(a,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;const g=c.createLinearGradient(0,a.y,0,a.y+a.h);g.addColorStop(0,"#0d1730");g.addColorStop(.62,"#3a2c3e");g.addColorStop(.8,"#b4683a");g.addColorStop(.801,"#2a1d12");g.addColorStop(1,"#150d07");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};
  /* pyramid, sedd från sidan: basbredd W, höjd H, k = hur många av N rader som är byggda */
  const NR=18;
  const pyr=(cx,gy,W,H,k,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;for(let r=0;r<NR&&r<k;r++){const part=cl(k-r,0,1),y1=gy-r*H/NR,y2=y1-H/NR*part,w1=W*(1-r/NR),w2=W*(1-(r+part)/NR);
      c.fillStyle=r%2?"#d9b878":"#c9a762";c.beginPath();c.moveTo(cx-w1/2,y1);c.lineTo(cx+w1/2,y1);c.lineTo(cx+w2/2,y2);c.lineTo(cx-w2/2,y2);c.closePath();c.fill();
      c.strokeStyle="rgba(80,50,20,.35)";c.lineWidth=1;c.stroke();}
    c.restore();};
  const man=(px,gy,h,col,t,pull)=>{const c=x();c.save();c.strokeStyle=col;c.fillStyle=col;c.lineWidth=Math.max(1.5,h*.09);c.lineCap="round";c.beginPath();c.arc(px,gy-h*.88,h*.11,0,TAU);c.fill();
    const lean=pull?.25:0,sw=Math.sin(t*5+px)*h*.08;c.beginPath();c.moveTo(px,gy-h*.76);c.lineTo(px-lean*h,gy-h*.38);c.stroke();
    c.beginPath();c.moveTo(px-lean*h,gy-h*.38);c.lineTo(px-lean*h-h*.12+sw,gy);c.moveTo(px-lean*h,gy-h*.38);c.lineTo(px-lean*h+h*.12-sw,gy);c.stroke();
    c.beginPath();c.moveTo(px,gy-h*.68);c.lineTo(px+h*(pull?.35:.1),gy-h*(pull?.5:.45));c.stroke();c.restore();};
  const car=(px,gy,L,col)=>{const c=x(),u=L/100;c.save();c.fillStyle=col;c.beginPath();c.roundRect?c.roundRect(px-50*u,gy-22*u,100*u,16*u,4*u):c.rect(px-50*u,gy-22*u,100*u,16*u);c.fill();c.beginPath();c.moveTo(px-26*u,gy-22*u);c.lineTo(px-16*u,gy-34*u);c.lineTo(px+14*u,gy-34*u);c.lineTo(px+30*u,gy-22*u);c.closePath();c.fill();
    c.fillStyle="rgba(180,220,255,.7)";c.beginPath();c.moveTo(px-20*u,gy-23*u);c.lineTo(px-13*u,gy-32*u);c.lineTo(px+12*u,gy-32*u);c.lineTo(px+24*u,gy-23*u);c.closePath();c.fill();
    c.fillStyle="#111";[-30,30].forEach(d=>{c.beginPath();c.arc(px+d*u,gy-6*u,8*u,0,TAU);c.fill();});c.restore();};

  /* 0 · Inledning */
  const s0=(t)=>{const{s,cx,cy,a}=S();photo(1,t,6.7,1.12,.25);const f=eo((t-.8)/2),c=x();c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="#fff";c.font=`700 ${Math.round(Math.min(a.w*.095,s*.19))}px "Source Serif 4",Georgia,serif`;c.shadowColor="rgba(0,0,0,.7)";c.shadowBlur=18;c.fillText("PYRAMIDERNA",cx,cy+s*.05);c.shadowBlur=0;
    tx("FARAONERNAS JÄTTEBYGGE",cx,cy+s*.05+Math.max(26,s*.07),"#ffcf8a","center",Math.max(13,s*.03),700);c.restore();cred(1,.55*f);};

  /* 1 · För 4 500 år sedan: foto, sedan tidslinje mot vikingatiden */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.2);photo(3,t,7.8,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;dusk(a);
      const w=Math.min(a.w*.84,s*1.6),lx=cx-w/2,px=ago=>lx+(1-ago/4600)*w,bh=Math.max(22,s*.06),y0=a.y+a.h*.3,gap=Math.max(54,s*.14);
      tg("År sedan",cx,a.y+a.h*.12,"#ffcf8a","center");
      [[4000,"4 000"],[3000,"3 000"],[2000,"2 000"],[1000,"1 000"],[0,"i dag"]].forEach(([m,l])=>{c.strokeStyle="rgba(255,255,255,.2)";c.lineWidth=1;c.beginPath();c.moveTo(px(m),y0-14);c.lineTo(px(m),y0+gap+bh+14);c.stroke();tx(l,px(m),y0+gap+bh+34,"rgba(255,255,255,.75)","center",Math.max(12,s*.028),600);});
      const k1=eo((t-4)/1.6);c.fillStyle="#d9b878";c.fillRect(px(4500),y0,(px(0)-px(4500))*k1,bh);tx("Cheopspyramiden byggs",px(4500),y0-9,"#ffe0a8","left",Math.max(13,s*.032),700);
      const k2=eo((t-5.2)/1.2);if(k2>0){c.globalAlpha=g*k2;c.fillStyle="#7fb0e8";c.fillRect(px(1226),y0+gap,px(976)-px(1226),bh);tx("Vikingatiden",px(1100),y0+gap-9,"#a9ccf2","center",Math.max(13,s*.032),700);}
      if(k1>.9){c.globalAlpha=g;tx("ca 4 500 år",px(2300),y0+bh*.68,"#2a1d12","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 2 · Miljontals block: foto, sedan en pyramid som byggs rad för rad och en bil */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(2,t,7.4,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;dusk(a);
      const W=Math.min(a.w*.5,s*.9),H=W*.63,gy=cy+s*.2,px=cx-(port?0:a.w*.14),k=NR*eo((t-3.4)/3.4);
      pyr(px,gy,W,H,k,1);
      const n=Math.round(2000000*cl((t-3.4)/3.4,0,1));tx(n.toLocaleString("sv-SE").replace(/ /g," ")+" block",px,gy+Math.max(28,s*.065),"#ffe0a8","center",Math.max(16,s*.042),700);
      if(t>4.3){const q=eo((t-4.3)/1);c.globalAlpha=g*q;const cxx=port?cx:cx+a.w*.28,L=Math.min(a.w*.2,s*.3),by=port?gy-H-Math.max(48,s*.1):gy;
        c.fillStyle="#b99456";c.fillRect(cxx-L*.62,by-L*.46,L*.45,L*.45);car(cxx+L*.34,by,L*.72,"#d85b5b");
        tx("1 block ≈ 1 bil",cxx,by+Math.max(24,s*.056),"#ffd86b","center",Math.max(13,s*.032),700);}
      c.restore();}};

  /* 3 · Högst i världen: foto, sedan höjd mot Turning Torso */
  const tower=(px,gy,w,h,t,col)=>{const c=x();c.save();c.fillStyle=col;const n=9;for(let i=0;i<n;i++){const y=gy-(i+1)*h/n,tw=w*(1-.18*i/n),rot=Math.sin(i*.45)*.07*w;c.beginPath();c.rect(px-tw/2+rot,y,tw,h/n+1);c.fill();c.fillStyle=i%2?col:"rgba(255,255,255,.12)";}c.restore();};
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-4.5)/1.1);photo(5,t,9.4,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;dusk(a);
      const gy=a.y+a.h*.86,sc=Math.min(a.h*.62/190,a.w*.5/200),H=146*sc,W=H*1.58,px=cx-Math.min(a.w*.2,s*.34);
      pyr(px,gy,W,H,NR*eo((t-4.8)/1),1);
      // måttstock
      const q=eo((t-5.2)/1);c.strokeStyle="#ffd86b";c.lineWidth=2;c.beginPath();c.moveTo(px+W*.55,gy);c.lineTo(px+W*.55,gy-H*q);c.stroke();[0,H*q].forEach(d=>{c.beginPath();c.moveTo(px+W*.55-6,gy-d);c.lineTo(px+W*.55+6,gy-d);c.stroke();});
      if(q>.8)tx("146 m",px+W*.55+10,gy-H*.5,"#ffd86b","left",Math.max(16,s*.04),700);
      tx("Cheopspyramiden",px,gy+Math.max(26,s*.058),"#ffe0a8","center",Math.max(13,s*.03),700);
      if(t>6.8){const k=eo((t-6.8)/1.4),tx0=cx+Math.min(a.w*.22,s*.36);c.globalAlpha=g*k;tower(tx0,gy,Math.max(16,190*sc*.14),190*sc*k,t,"#9aa7b8");tx("Turning Torso, Malmö",tx0,gy+Math.max(26,s*.058),"#c9d4e2","center",Math.max(13,s*.03),700);tx("190 m",tx0,gy-190*sc*k-10,"#c9d4e2","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 4 · Byggarna: teckning, sedan ramp, släde och arbetare */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(4,t,10.2,1.05,.0+.15*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;dusk(a);
      const W=Math.min(a.w*.62,s*1.1),H=W*.63,gy=a.y+a.h*.8,px=cx+(port?0:a.w*.08),rows=11;
      pyr(px,gy,W,H,rows,1);
      // ramp från marken (vänster) upp till översta byggda raden
      const topY=gy-rows*H/NR,topW=W*(1-rows/NR),rx0=px-W*.5-Math.min(a.w*.18,s*.3),rx1=px-topW/2;
      c.fillStyle="#a8895a";c.beginPath();c.moveTo(rx0,gy);c.lineTo(rx1,topY);c.lineTo(rx1,gy);c.closePath();c.fill();c.strokeStyle="rgba(80,50,20,.5)";c.lineWidth=1.5;c.stroke();
      // släde med block som åker uppför
      const p=cl((t-4.6)/4.4,0,1),sx=lerp(rx0+14,rx1-26,p),sy=lerp(gy,topY,p)-14,bs=Math.max(18,W*.07);
      c.save();c.translate(sx,sy);c.rotate(-Math.atan2(gy-topY,rx1-rx0)*.9);c.fillStyle="#e3c98a";c.fillRect(-bs/2,-bs,bs,bs);c.strokeStyle="#6b4a20";c.lineWidth=2;c.strokeRect(-bs/2,-bs,bs,bs);c.restore();
      // arbetare som drar i rep
      const hm=Math.max(22,s*.07);for(let i=0;i<4;i++){const q=cl(p+.02,0,1),mx=lerp(rx0+40,rx1-26,q)+i*hm*.9+hm*.8,my=lerp(gy,topY,(mx-rx0)/(rx1-rx0))-2;if(mx<rx1)man(mx,my,hm,"#2a1b0e",t+i,true);}
      c.strokeStyle="#6b4a20";c.lineWidth=2;c.beginPath();c.moveTo(sx,sy-6);c.lineTo(sx+bs*2.6,sy-lerp(0,topY-gy,.03)-6);c.stroke();
      if(t>6){const q=eo((t-6)/1);c.globalAlpha=g*q;["Ramper","Rep","Muskelkraft"].forEach((w,i)=>tx(w,a.x+a.w*(.2+.3*i),a.y+a.h*.15,"#ffd86b","center",Math.max(15,s*.04),700));}
      c.restore();}};

  /* 5 · En grav: foto, sedan snitt med gravkammare och saker */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(1,t,8.9,1.15,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;dusk(a);
      const W=Math.min(a.w*.66,s*1.15),H=W*.63,gy=a.y+a.h*.82,px=cx;
      pyr(px,gy,W,H,NR,.28);
      c.strokeStyle="#d9b878";c.lineWidth=3;c.beginPath();c.moveTo(px-W/2,gy);c.lineTo(px,gy-H);c.lineTo(px+W/2,gy);c.closePath();c.stroke();
      // gång och kammare
      const ky=gy-H*.38,kw=W*.2,kh=H*.16;c.fillStyle="rgba(20,12,6,.9)";c.fillRect(px-kw/2,ky-kh,kw,kh);c.strokeStyle="#6b4a20";c.lineWidth=2;c.strokeRect(px-kw/2,ky-kh,kw,kh);
      c.strokeStyle="rgba(20,12,6,.9)";c.lineWidth=Math.max(5,W*.015);c.beginPath();c.moveTo(px-W*.18,gy-H*.0);c.lineTo(px-W*.04,ky-kh*.4);c.stroke();
      const k=eo((t-3.6)/1);c.globalAlpha=g*k;
      c.fillStyle="#f2c94c";c.fillRect(px-kw*.34,ky-kh*.55,kw*.68,kh*.38);c.strokeStyle="#8a6a10";c.lineWidth=1.5;c.strokeRect(px-kw*.34,ky-kh*.55,kw*.68,kh*.38);
      tx("Kungens grav",px,ky-kh-12,"#ffe0a8","center",Math.max(14,s*.034),700);
      // saker till nästa liv
      if(t>5){const q=eo((t-5)/1.2);c.globalAlpha=g*q;const iy=ky-kh*.1,off=kw*.78;
        // kruka
        c.fillStyle="#c9794a";c.beginPath();c.ellipse(px-off,iy-kh*.3,kh*.2,kh*.3,0,0,TAU);c.fill();c.fillRect(px-off-kh*.08,iy-kh*.75,kh*.16,kh*.22);
        // båt
        c.fillStyle="#b88a52";c.beginPath();c.moveTo(px+off-kh*.45,iy-kh*.35);c.quadraticCurveTo(px+off,iy+kh*.05,px+off+kh*.45,iy-kh*.35);c.closePath();c.fill();
        // guldkedja
        c.fillStyle="#f2c94c";for(let i=0;i<5;i++){c.beginPath();c.arc(px+off*1.7+i*kh*.14,iy-kh*.2+Math.sin(i)*3,kh*.06,0,TAU);c.fill();}
        tx("saker till nästa liv",px,gy+Math.max(26,s*.058),"#ffd86b","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 6 · Exakt byggd: flygfoto, sedan väderstreck ovanifrån */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(6,Math.max(0,t),9.7,1.1,.1+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;dusk(a,1);c.fillStyle="#150d07";c.fillRect(a.x,a.y,a.w,a.h);
      const R=Math.min(a.w*.3,a.h*.26),py=cy-s*.04;
      // pyramidens botten (kvadrat) med fyra sneda sidor
      const q=eo((t-3.8)/1.2);c.save();c.translate(cx,py);c.globalAlpha=g*q;const sq=R*.82;
      const cols=["#d9b878","#b99456","#c9a762","#a8895a"];[[ -1,-1,1,-1],[1,-1,1,1],[1,1,-1,1],[-1,1,-1,-1]].forEach((v,i)=>{c.fillStyle=cols[i];c.beginPath();c.moveTo(v[0]*sq,v[1]*sq);c.lineTo(v[2]*sq,v[3]*sq);c.lineTo(0,0);c.closePath();c.fill();});
      c.strokeStyle="rgba(80,50,20,.5)";c.lineWidth=2;c.strokeRect(-sq,-sq,sq*2,sq*2);c.restore();
      // väderstreck
      const k=eo((t-5.2)/1.2);c.globalAlpha=g*k;c.strokeStyle="#ffd86b";c.fillStyle="#ffd86b";c.lineWidth=2.5;
      [["N",0,-1],["Ö",1,0],["S",0,1],["V",-1,0]].forEach(([l,dx,dy])=>{const rl=dx?Math.min(R*1.7,a.w*.4):R*1.7,ex=cx+dx*(rl-R*.22)*k,ey=py+dy*R*1.45*k;c.beginPath();c.moveTo(cx+dx*sq*1.08,py+dy*sq*1.08);c.lineTo(ex,ey);c.stroke();c.font=font(700,Math.max(20,s*.06));c.textAlign="center";c.fillText(l,cx+dx*rl,py+dy*R*1.7+Math.max(7,s*.02));});
      tx("Pekar nästan exakt åt rätt håll",cx,a.y+a.h*.985,"#ffe0a8","center",Math.max(14,s*.034),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
