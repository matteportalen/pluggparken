/* Vikingarna: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js (MPSvartHal.start med o.def). Röst: ../ljud/vikingar/s<scen>-<replik>.mp3 (ElevenLabs).
   Bilderna: bilder/vikingar-1..6.jpg. MPVikingFilm.start(host,{overlay,onClose}). Ljudmatta: vågor (meta.mat). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/specialare/";}})();
const TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:10.5,cap:[[0.5,"De seglade över hav och floder i smala skepp, och de nådde längre än någon trodde. Det här är berättelsen om vikingarna."]]},
 {k:"01 · För tusen år sedan",d:15.8,cap:[[0.8,"Vikingatiden varade från ungefär år 800 till 1050. Det är för ungefär tusen år sedan."],[7.3,"Då fanns det inga bilar, inga tåg och inga flygplan. Man tog sig fram till fots, till häst eller med skepp."]]},
 {k:"02 · Långskeppen",d:13.5,cap:[[0.8,"Vikingarna seglade i långskepp, smala och snabba skepp som var byggda av trä."],[6.2,"De hade ett stort segel och rader av åror, och de kunde gå både på havet och högt upp i floder."]]},
 {k:"03 · Österut och västerut",d:15.5,cap:[[0.8,"Svenska vikingar reste mest österut, mot dagens Ryssland och Ukraina, ofta längs stora floder."],[8.0,"Danska och norska vikingar reste i stället västerut, till England, Irland, Island och Grönland."]]},
 {k:"04 · Leif Eriksson",d:10.8,cap:[[0.8,"Leif Eriksson seglade ännu längre västerut, och han nådde Nordamerika omkring år 1000."],[6.9,"Det var nästan 500 år innan Columbus kom dit."]]},
 {k:"05 · Inga horn",d:11.3,cap:[[0.8,"Och hjälmarna då? Vikingarna hade inga horn på hjälmarna."],[5.0,"Det är något som kom från teaterkläder på 1800-talet, långt efter vikingatiden."]]},
 {k:"06 · Runstenar",d:14.3,cap:[[0.8,"Vi vet mycket om vikingarna tack vare runstenar, stenar med ristade tecken som berättar om människor som levde då."],[8.0,"Bara i Sverige finns det tusentals runstenar, och många står kvar än i dag."]]}
];
const META={mat:"vagor",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Vikingarna",under:"En film i sex steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Vikingarna var både bönder, handlare och äventyrare. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Sylvia Duckworth · CC BY-SA 2.0 · Wikimedia Commons",2:"Foto: Colgill · CC BY-SA 4.0 · Wikimedia Commons",3:"Karta: Valdentro · CC BY-SA 4.0 · Wikimedia Commons",4:"Foto: Rob Larsen · CC BY 2.0 · Wikimedia Commons",5:"Foto: Wolfmann · CC BY-SA 4.0 · Wikimedia Commons",6:"Foto: Riksantikvarieämbetet · Wikimedia Commons"};
const IMG={};function img(n){const u=ROOT+"bilder/vikingar-"+n+".jpg";if(!IMG[u]){const i=new Image();i.src=u;IMG[u]=i;}return IMG[u];}
[1,2,3,4,5,6].forEach(img);
const ok=i=>i&&i.complete&&i.naturalWidth;
const srand=s=>()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};

window.MPVikingFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"vikingar",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {A,eo,cl,lerp,font}=E;
  const x=()=>E.x;
  const tx=(t,px,py,col,al,sz,w)=>{const c=x();c.font=font(w||600,sz||12);c.fillStyle=col||"rgba(255,255,255,.88)";c.textAlign=al||"left";c.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#7fd6ff",al,11,700);
  const S=()=>{const a=A();return{a,s:Math.min(a.w,a.h),cx:a.x+a.w/2,cy:a.y+a.h/2,port:E.W<E.H*.9};};
  const cred=(n,a)=>{const c=x();c.save();c.globalAlpha=a==null?.6:a;c.fillStyle="#fff";c.font=font(600,11);c.textAlign="right";c.fillText(KR[n],E.W-Math.max(14,E.W*.03),E.H-Math.max(96,E.H*.13));c.restore();};
  const photo=(n,t,dur,zoom,dim)=>{const c=x(),a=A(),im=img(n);if(!ok(im))return;const k=cl(t/Math.max(1,dur),0,1),z=lerp(1,zoom||1.12,k);
    const sc=Math.max(a.w/im.naturalWidth,a.h/im.naturalHeight)*z,iw=im.naturalWidth*sc,ih=im.naturalHeight*sc,ir=im.naturalWidth/im.naturalHeight;
    c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=eo(t/1.6);
    if(ir<a.w/a.h*.85){const sb=Math.max(a.w/im.naturalWidth,a.h/im.naturalHeight)*1.15;try{c.filter="blur(22px)";}catch(e){}c.globalAlpha*=.55;c.drawImage(im,a.x+a.w/2-im.naturalWidth*sb/2,a.y+a.h/2-im.naturalHeight*sb/2,im.naturalWidth*sb,im.naturalHeight*sb);c.filter="none";c.globalAlpha=eo(t/1.6);const hh=a.h*.9*(1+(z-1)*.35),ww=hh*ir;c.shadowColor="rgba(0,0,0,.6)";c.shadowBlur=30;c.drawImage(im,a.x+a.w/2-ww/2,a.y+a.h/2-hh/2,ww,hh);c.shadowBlur=0;}
    else c.drawImage(im,a.x+a.w/2-iw/2,a.y+a.h/2-ih/2,iw,ih);
    c.fillStyle=`rgba(2,4,12,${dim||0})`;c.fillRect(a.x,a.y,a.w,a.h);
    const g=c.createRadialGradient(a.x+a.w/2,a.y+a.h/2,Math.min(a.w,a.h)*.3,a.x+a.w/2,a.y+a.h/2,Math.max(a.w,a.h)*.62);g.addColorStop(0,"rgba(2,3,10,0)");g.addColorStop(1,"rgba(2,3,10,.82)");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};
  const panel=(a,al)=>{const c=x();c.save();c.globalAlpha=al;c.fillStyle="rgba(6,10,22,.82)";c.fillRect(a.x,a.y,a.w,a.h);c.restore();};

  /* ---- långskepp, sett från sidan, tittar åt höger ---- */
  const ship=(cx,gy,L,t,o)=>{const c=x(),u=L/100;o=o||{};c.save();c.lineCap="round";c.lineJoin="round";
    // åror (bakom skrovet)
    if(o.oars){c.strokeStyle="#c9a36a";c.lineWidth=Math.max(1.5,1.1*u);for(let i=0;i<8;i++){const ox=cx-36*u+i*9.5*u,sw=Math.sin(t*2.2+i*.6)*5*u;c.beginPath();c.moveTo(ox,gy-5*u);c.lineTo(ox-8*u+sw,gy+11*u);c.stroke();}}
    // skrov
    c.fillStyle="#5a3a1e";c.beginPath();c.moveTo(cx-52*u,gy-17*u);c.quadraticCurveTo(cx-45*u,gy+1*u,cx-26*u,gy+3*u);c.lineTo(cx+30*u,gy+3*u);c.quadraticCurveTo(cx+48*u,gy,cx+55*u,gy-26*u);c.quadraticCurveTo(cx+47*u,gy-20*u,cx+44*u,gy-12*u);c.lineTo(cx-46*u,gy-10*u);c.closePath();c.fill();
    c.strokeStyle="#b88a52";c.lineWidth=Math.max(1.5,1.2*u);c.beginPath();c.moveTo(cx-46*u,gy-10*u);c.lineTo(cx+44*u,gy-12*u);c.stroke();
    // drakhuvud
    c.fillStyle="#7a4f27";c.beginPath();c.arc(cx+55.5*u,gy-28*u,2.2*u,0,TAU);c.fill();
    // sköldar
    for(let i=0;i<9;i++){c.fillStyle=i%2?"#d8b13a":"#b33a2e";c.beginPath();c.arc(cx-40*u+i*9.4*u,gy-6.5*u,3.1*u,0,TAU);c.fill();}
    // mast och segel
    if(o.sail){const k=o.sail;c.strokeStyle="#8a6538";c.lineWidth=Math.max(2,1.8*u);c.beginPath();c.moveTo(cx,gy-10*u);c.lineTo(cx,gy-(10+54*k)*u);c.stroke();
      const sx=cx-26*u,sw=52*u,sh=34*u*k,sy=gy-58*u;
      c.beginPath();c.rect(sx,sy,sw,sh);c.save();c.clip();for(let i=0;i<8;i++){c.fillStyle=i%2?"#efe6d2":"#b33a2e";c.fillRect(sx+i*sw/8,sy,sw/8+.5,sh);}
      const sh2=c.createLinearGradient(sx,0,sx+sw,0);sh2.addColorStop(0,"rgba(0,0,0,.18)");sh2.addColorStop(.5,"rgba(255,255,255,.1)");sh2.addColorStop(1,"rgba(0,0,0,.22)");c.fillStyle=sh2;c.fillRect(sx,sy,sw,sh);c.restore();
      c.strokeStyle="#8a6538";c.lineWidth=Math.max(2,1.5*u);c.beginPath();c.moveTo(sx-2*u,sy);c.lineTo(sx+sw+2*u,sy);c.stroke();}
    c.restore();};
  const sea=(a,gy,t,col,n)=>{const c=x();c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();
    for(let j=0;j<(n||3);j++){const yy=gy+4+j*Math.max(10,a.h*.035);c.fillStyle=col[j%col.length];c.beginPath();c.moveTo(a.x,a.y+a.h);for(let px=a.x;px<=a.x+a.w+8;px+=8)c.lineTo(px,yy+Math.sin(px*.018+t*(1.2+j*.3)+j*2)*(3+j));c.lineTo(a.x+a.w,a.y+a.h);c.closePath();c.fill();}
    c.restore();};
  /* delvis ritad linje med pilspets (pts i skärmkoordinater, k = hur långt 0..1) */
  const route=(pts,k,col,wd)=>{const c=x();if(k<=0)return;let tot=0;const seg=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(d);tot+=d;}
    let rest=tot*cl(k,0,1),px=pts[0][0],py=pts[0][1],lx=px,ly=py,ang=0;c.save();c.strokeStyle=col;c.fillStyle=col;c.lineWidth=wd||4;c.lineCap="round";c.lineJoin="round";c.shadowColor=col;c.shadowBlur=10;c.beginPath();c.moveTo(px,py);
    for(let i=1;i<pts.length&&rest>0;i++){const d=seg[i-1],f=Math.min(1,rest/d);lx=px;ly=py;px=lerp(pts[i-1][0],pts[i][0],f);py=lerp(pts[i-1][1],pts[i][1],f);c.lineTo(px,py);ang=Math.atan2(pts[i][1]-pts[i-1][1],pts[i][0]-pts[i-1][0]);rest-=d;}
    c.stroke();c.shadowBlur=0;if(k>.04){const h=Math.max(10,(wd||4)*3);c.beginPath();c.moveTo(px,py);c.lineTo(px-Math.cos(ang-.45)*h,py-Math.sin(ang-.45)*h);c.lineTo(px-Math.cos(ang+.45)*h,py-Math.sin(ang+.45)*h);c.closePath();c.fill();}c.restore();};
  const pill=(t,px,py,col,sz,al)=>{const c=x();c.save();c.font=font(700,sz);const w=c.measureText(t).width+16,h=sz+10;px=Math.max(w/2+6,Math.min(E.W-w/2-6,px));c.globalAlpha=al==null?1:al;c.fillStyle="rgba(6,10,22,.78)";c.beginPath();if(c.roundRect)c.roundRect(px-w/2,py-h/2-2,w,h,h/2);else c.rect(px-w/2,py-h/2-2,w,h);c.fill();c.fillStyle=col;c.textAlign="center";c.fillText(t,px,py+sz*.35);c.restore();};

  /* 0 · Inledning */
  const s0=(t)=>{const{s,cx,cy,a}=S();photo(1,t,10.5,1.12,.3);const f=eo((t-.8)/2),c=x();c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="#fff";c.font=`700 ${Math.round(Math.min(a.w*.1,s*.2))}px "Source Serif 4",Georgia,serif`;c.shadowColor="rgba(0,0,0,.7)";c.shadowBlur=18;c.fillText("VIKINGARNA",cx,cy+s*.05);c.shadowBlur=0;
    tx("FRÅN NORDEN TILL VÄRLDEN",cx,cy+s*.05+Math.max(26,s*.07),"#ffcf8a","center",Math.max(13,s*.03),700);c.restore();cred(1,.55*f);};

  /* 1 · Tidslinje: år 800–2026, och vad som inte fanns */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();panel(a,1);
    const w=Math.min(a.w*.86,s*1.7),lx=cx-w/2,y1=cy-s*.12,bh=Math.max(30,s*.085),px=yr=>lx+(yr-800)/(2026-800)*w;
    tg("Tidslinje",cx,a.y+a.h*.1,"#7fd6ff","center");
    c.fillStyle="rgba(255,255,255,.1)";c.fillRect(lx,y1,w,bh);
    const k1=eo((t-.8)/2.6);
    const gr=c.createLinearGradient(px(800),0,px(1050),0);gr.addColorStop(0,"#c4872f");gr.addColorStop(1,"#f0b45a");c.fillStyle=gr;c.fillRect(px(800),y1,(px(1050)-px(800))*k1,bh);
    [[800,"800"],[1000,"1000"],[1500,"1500"],[2000,"2000"]].forEach(([yr,l])=>{c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=1;c.beginPath();c.moveTo(px(yr),y1+bh);c.lineTo(px(yr),y1+bh+8);c.stroke();tx(l,px(yr),y1+bh+24,"rgba(255,255,255,.7)","center",Math.max(12,s*.028),600);});
    if(k1>.9)tx("Vikingatiden 800–1050",px(800),y1-12,"#ffcf8a","left",Math.max(14,s*.034),700);
    const k2=eo((t-3.4)/1.6);if(k2>0){c.save();c.globalAlpha=k2;c.fillStyle="#7fd6ff";c.beginPath();c.arc(px(2026),y1+bh/2,Math.max(6,bh*.2),0,TAU);c.fill();tx("Nu · 2026",px(2026),y1-12,"#7fd6ff","right",Math.max(14,s*.034),700);
      // parentes: ca 1000 år
      const bx=px(1026),by=y1+bh+Math.max(46,s*.12);c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=2;c.beginPath();c.moveTo(bx,by-8);c.lineTo(bx,by);c.lineTo(px(2026),by);c.lineTo(px(2026),by-8);c.stroke();
      tx("ca 1 000 år sedan",(bx+px(2026))/2,by+Math.max(22,s*.05),"#fff","center",Math.max(14,s*.034),700);c.restore();}
    // inga bilar, tåg, flygplan
    if(t>7.3){const items=["Inga bilar","Inga tåg","Inga flygplan"],ys=a.y+a.h*.74,gap=Math.min(w/3,s*.5);
      items.forEach((it,i)=>{const q=eo((t-7.8-i*1.2)/.7);if(q<=0)return;c.save();c.globalAlpha=q;const ix=cx+(i-1)*gap;tx(it,ix,ys,"#fff","center",Math.max(14,s*.036),700);const tw=c.measureText(it).width;c.strokeStyle="#ff6b5e";c.lineWidth=3;c.beginPath();c.moveTo(ix-tw/2-4,ys-5);c.lineTo(ix-tw/2-4+(tw+8)*cl((t-8.2-i*1.2)/.5,0,1),ys-5);c.stroke();c.restore();});
      const q=eo((t-11.8)/1.2);if(q>0){c.save();c.globalAlpha=q;tx("Till fots · till häst · med skepp",cx,ys+Math.max(36,s*.09),"#9be3b0","center",Math.max(15,s*.04),700);c.restore();}}};

  /* 2 · Långskeppen: foto av Gokstadskeppet, sedan egen ritning med segel och åror */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-5.8)/1.4);photo(2,t,13.5,1.1,.1+.4*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      const sg=c.createLinearGradient(0,a.y,0,a.y+a.h);sg.addColorStop(0,"#17233f");sg.addColorStop(.55,"#4c4a63");sg.addColorStop(.7,"#d98a4a");sg.addColorStop(.71,"#10253f");sg.addColorStop(1,"#071426");c.fillStyle=sg;c.fillRect(a.x,a.y,a.w,a.h);
      const L=Math.min(a.w*.56,a.h*.76,s*1.2),gy=a.y+a.h*.7+Math.sin(t*1.6)*3,drift=(t-6)*Math.min(8,a.w*.012),sx=cx-a.w*.04+drift*.5;
      c.fillStyle="rgba(255,226,170,.9)";c.beginPath();c.arc(a.x+a.w*.16,a.y+a.h*.5,s*.045,0,TAU);c.fill();
      ship(sx,gy,L,t,{sail:eo((t-6.6)/1.4),oars:true});
      sea(a,gy,t,["rgba(16,46,86,.72)","rgba(10,34,68,.8)","rgba(6,22,48,.9)"],3);
      const u=L/100,lab=(txt,px,py,col)=>pill(txt,px,py,col,Math.max(13,s*.03),eo((t-7.8)/1));
      if(t>7.6){lab("Segel",sx,gy-66*u,"#ffd86b");lab("Åror",sx-30*u,gy+24*u,"#9be3b0");lab("Skrov av trä",sx+30*u,gy+12*u,"#ffcf8a");}
      if(t>10.2){const q=eo((t-10.2)/1);c.globalAlpha=g*q;tg("Hav · floder",cx,a.y+a.h*.12,"#7fd6ff","center");}
      c.restore();}};

  /* 3 · Österut och västerut: kartan med egna pilar */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x(),im=img(3);panel(a,1);
    const iw=900,ih=710;let sc=Math.min(a.w/iw,a.h/ih)*.94;const ox=a.x+a.w/2-iw*sc/2,oy=a.y+a.h/2-ih*sc/2,P=(px,py)=>[ox+px*sc,oy+py*sc];
    if(ok(im)){c.save();c.globalAlpha=eo(t/1.4)*.55;c.drawImage(im,ox,oy,iw*sc,ih*sc);c.restore();c.save();c.fillStyle="rgba(4,8,20,.42)";c.fillRect(ox,oy,iw*sc,ih*sc);c.restore();}
    cred(3,.55);
    const wd=Math.max(3,sc*5);
    // österut (orange)
    route([P(400,238),P(470,236),P(537,236),P(570,320),P(592,380),P(588,480),P(578,562)],eo((t-1.4)/5),"#ffb347",wd);
    // västerut (blå)
    const bl="#6fd0ff",k=(t-8.4)/3.6;
    route([P(290,232),P(210,285),P(182,338)],eo(k),bl,wd);
    route([P(190,310),P(130,330),P(100,350)],eo(k-.1),bl,wd);
    route([P(285,215),P(170,215),P(75,128)],eo(k-.05),bl,wd);
    route([P(75,120),P(45,60),P(35,22)],eo(k-.3),bl,wd);
    const fs=Math.max(13,sc*17);
    if(t>1.6)pill("Svenska vikingar",...P(440,188),"#ffb347",fs,eo((t-2)/.8));
    if(t>4.2)pill("Ryssland",...P(640,232),"#ffe0b0",fs*.9,eo((t-4.2)/.8));
    if(t>5.4)pill("Ukraina",...P(655,372),"#ffe0b0",fs*.9,eo((t-5.4)/.8));
    if(t>8.6)pill("Danska och norska vikingar",...P(200,505),bl,fs,eo((t-8.6)/.8));
    if(t>10)pill("England",...P(190,355),"#cfeeff",fs*.9,eo((t-10)/.8));
    if(t>10.6)pill("Irland",...P(55,432),"#cfeeff",fs*.9,eo((t-10.6)/.8));
    if(t>11.2)pill("Island",...P(52,150),"#cfeeff",fs*.9,eo((t-11.2)/.8));
    if(t>12.2)pill("Grönland",...P(80,42),"#cfeeff",fs*.9,eo((t-12.2)/.8));};

  /* 4 · Leif Eriksson: statyn, sedan 500 år före Columbus */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-4.4)/1.4);photo(4,t,10.8,1.1,.1+.6*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,.0);
      const w=Math.min(a.w*.86,s*1.7),lx=cx-w/2,y1=cy-s*.02,px=yr=>lx+(yr-980)/(1500-980)*w,bh=Math.max(22,s*.06);
      tg("Nordamerika",cx,a.y+a.h*.12,"#7fd6ff","center");
      c.fillStyle="rgba(255,255,255,.12)";c.fillRect(lx,y1,w,bh);
      const k=eo((t-5.2)/2.2);c.fillStyle="#f0b45a";c.fillRect(px(1000),y1,(px(1492)-px(1000))*k,bh);
      [[1000,"år 1000"],[1492,"år 1492"]].forEach(([yr,l],i)=>{const q=cl((t-5.2-i*2)/.6,0,1);c.save();c.globalAlpha=g*q;c.fillStyle=i?"#ff9a5a":"#ffcf8a";c.beginPath();c.arc(px(yr),y1+bh/2,Math.max(7,bh*.38),0,TAU);c.fill();tx(i?"Columbus":"Leif Eriksson",px(yr),y1-16,i?"#ffb070":"#ffe0b0","center",Math.max(14,s*.034),700);tx(l,px(yr),y1+bh+Math.max(24,s*.056),"rgba(255,255,255,.85)","center",Math.max(13,s*.03),600);c.restore();});
      if(t>7.4){const q=eo((t-7.4)/1);c.globalAlpha=g*q;tx("nästan 500 år",(px(1000)+px(1492))/2,y1+bh+Math.max(70,s*.16),"#fff","center",Math.max(18,s*.05),700);}
      c.restore();}};

  /* 5 · Inga horn: vikingahjälm och teaterhjälm */
  const helmet=(cx,cy,r,col,horns,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.lineCap="round";c.lineJoin="round";
    if(horns){c.fillStyle="#efe6d2";[[-1],[1]].forEach(([d])=>{c.beginPath();c.moveTo(cx+d*r*.82,cy-r*.15);c.bezierCurveTo(cx+d*r*1.55,cy-r*.1,cx+d*r*1.75,cy-r*.85,cx+d*r*1.35,cy-r*1.35);c.bezierCurveTo(cx+d*r*1.4,cy-r*.75,cx+d*r*1.15,cy-r*.45,cx+d*r*.7,cy-r*.55);c.closePath();c.fill();});}
    const g=c.createLinearGradient(cx-r,cy-r,cx+r,cy+r*.4);g.addColorStop(0,"#d6dbe3");g.addColorStop(1,"#6b7480");c.fillStyle=g;c.beginPath();c.arc(cx,cy,r,Math.PI,TAU);c.lineTo(cx+r,cy+r*.18);c.lineTo(cx-r,cy+r*.18);c.closePath();c.fill();
    c.strokeStyle="#4a525c";c.lineWidth=Math.max(2,r*.07);c.beginPath();c.moveTo(cx-r,cy+r*.1);c.lineTo(cx+r,cy+r*.1);c.stroke();
    if(!horns){c.fillStyle="#6b7480";c.beginPath();c.moveTo(cx-r*.1,cy+r*.1);c.lineTo(cx+r*.1,cy+r*.1);c.lineTo(cx+r*.07,cy+r*.8);c.lineTo(cx-r*.07,cy+r*.8);c.closePath();c.fill();}
    c.restore();};
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.4);photo(5,t,11.3,1.1,.1+.6*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      const r=Math.min(s*.2,a.w*.16),yy=cy+s*.02,dx=Math.min(a.w*.24,s*.5);
      const k1=eo((t-4.2)/1);helmet(cx-dx,yy,r,"",false,k1);if(k1>.3){c.globalAlpha=g*k1;tx("Vikingatiden",cx-dx,yy+r*1.35,"#ffe0b0","center",Math.max(14,s*.034),700);tx("inga horn",cx-dx,yy+r*1.35+Math.max(22,s*.05),"#9be3b0","center",Math.max(13,s*.03),700);}
      const k2=eo((t-5.2)/1);c.globalAlpha=g;helmet(cx+dx,yy,r,"",true,k2);
      if(k2>.3){c.globalAlpha=g*k2;tx("Teatern på 1800-talet",cx+dx,yy+r*1.35,"#ffb070","center",Math.max(14,s*.034),700);}
      const k3=cl((t-8.4)/.8,0,1);if(k3>0){c.globalAlpha=g;c.strokeStyle="#ff6b5e";c.lineWidth=Math.max(4,r*.09);c.lineCap="round";const q=r*.95;c.beginPath();c.moveTo(cx+dx-q,yy-q);c.lineTo(cx+dx-q+2*q*k3,yy-q+2*q*k3);c.stroke();if(k3>.5){const k4=(k3-.5)*2;c.beginPath();c.moveTo(cx+dx+q,yy-q);c.lineTo(cx+dx+q-2*q*k4,yy-q+2*q*k4);c.stroke();}}
      c.restore();}};

  /* 6 · Runstenar: stenen med runor som ristas, och många stenar */
  const rune=(px,py,h,k)=>{const c=x();c.beginPath();c.moveTo(px,py);c.lineTo(px,py+h*k);c.stroke();if(k>.5){const kk=(k-.5)*2,v=(px*7+py*3)%4;c.beginPath();if(v===0){c.moveTo(px,py+h*.15);c.lineTo(px+h*.28*kk,py+h*.4);c.moveTo(px,py+h*.4);c.lineTo(px+h*.28*kk,py+h*.65);}else if(v===1){c.moveTo(px,py+h*.1);c.lineTo(px+h*.3*kk,py+h*.35);c.lineTo(px,py+h*.6);}else if(v===2){c.moveTo(px-h*.25*kk,py+h*.3);c.lineTo(px,py+h*.5);c.lineTo(px+h*.25*kk,py+h*.3);}else{c.moveTo(px,py+h*.2);c.lineTo(px+h*.3*kk,py+h*.4);c.lineTo(px,py+h*.6);c.lineTo(px+h*.3*kk,py+h*.8);}c.stroke();}};
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-5.2)/1.4);photo(6,t,14.3,1.1,.1+.62*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,.7);
      const sw=Math.min(a.w*.34,s*.5),sh=Math.min(a.h*.62,s*.78),sx=cx-(t>8?sw*.9:0),sy=cy-sh*.46;
      const sg=c.createLinearGradient(sx-sw/2,0,sx+sw/2,0);sg.addColorStop(0,"#6f6a62");sg.addColorStop(.5,"#8b857a");sg.addColorStop(1,"#5c574f");
      c.fillStyle=sg;c.beginPath();c.moveTo(sx-sw/2,sy+sh);c.bezierCurveTo(sx-sw*.58,sy+sh*.3,sx-sw*.3,sy,sx,sy);c.bezierCurveTo(sx+sw*.3,sy,sx+sw*.58,sy+sh*.3,sx+sw/2,sy+sh);c.closePath();c.fill();
      // ristade runor, rad för rad
      c.strokeStyle="#e8cf9a";c.lineWidth=Math.max(2,sw*.025);c.lineCap="round";const rh=sh*.1,n=4,cols=5;
      for(let r=0;r<n;r++)for(let q=0;q<cols;q++){const idx=r*cols+q,k=cl((t-6.4-idx*.16)/.5,0,1);if(k<=0)continue;rune(sx-sw*.3+q*sw*.15,sy+sh*.22+r*sh*.18,rh,k);}
      // tusentals runstenar
      if(t>8.4){const q=eo((t-8.4)/1.2),gx=cx+Math.min(a.w*.2,s*.34),gy0=cy-sh*.3,cw=Math.min(a.w*.36,s*.54),cnt=6,rows=5;c.globalAlpha=g*q;
        for(let r=0;r<rows;r++)for(let i=0;i<cnt;i++){const ix=gx-cw/2+i*cw/cnt+cw/cnt*.5,iy=gy0+r*sh*.15,h=sh*.12;c.fillStyle=(r+i)%2?"#7b756b":"#8b857a";c.beginPath();c.moveTo(ix-h*.28,iy+h);c.quadraticCurveTo(ix-h*.34,iy+h*.1,ix,iy);c.quadraticCurveTo(ix+h*.34,iy+h*.1,ix+h*.28,iy+h);c.closePath();c.fill();}
        tx("Tusentals runstenar i Sverige",gx,gy0+rows*sh*.15+Math.max(26,s*.06),"#ffd86b","center",Math.max(14,s*.034),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
