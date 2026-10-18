/* Gemensamma ritverktyg för minilektionsfilmerna (Vasa, Digerdöden m.fl.). Äldre filmer har egna kopior.
   MPFilmLib.make(E,{ROOT,prefix,names,KR}) → {x,tx,tg,S,cred,photo,panel,space,deep,dusk,srand,ok,TAU}
   E = ritverktygen från filmmotorn (svarthal.js). prefix = "vasa-" ger bilder/vasa-<namn>.jpg. KR = källtexter per bildnamn. */
(function(){
const TAU=Math.PI*2;
const srand=s=>()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};
const IMG={};
window.MPFilmLib={TAU,srand,
 root(script){try{return new URL("./",script.src).href;}catch(e){return "/specialare/";}},
 make(E,o){
  const {A,eo,cl,lerp,font}=E,ROOT=o.ROOT,KR=o.KR||{};
  const x=()=>E.x;
  const img=n=>{const u=ROOT+"bilder/"+o.prefix+n+".jpg";if(!IMG[u]){const i=new Image();i.src=u;IMG[u]=i;}return IMG[u];};
  (o.names||[]).forEach(img);
  const ok=i=>i&&i.complete&&i.naturalWidth;
  const tx=(t,px,py,col,al,sz,w)=>{const c=x();c.font=font(w||600,sz||12);c.fillStyle=col||"rgba(255,255,255,.88)";c.textAlign=al||"left";c.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#7fd6ff",al,11,700);
  const S=()=>{const a=A();return{a,s:Math.min(a.w,a.h),cx:a.x+a.w/2,cy:a.y+a.h/2,port:E.W<E.H*.9};};
  const cred=(n,a)=>{const c=x();c.save();c.globalAlpha=a==null?.6:a;c.fillStyle="#fff";let sz=11;c.font=font(600,sz);const tt=KR[n]||"",avail=E.W-2*Math.max(14,E.W*.03);while(sz>8&&c.measureText(tt).width>avail){sz-=.5;c.font=font(600,sz);}c.textAlign="right";c.fillText(tt,E.W-Math.max(14,E.W*.03),E.H-Math.max(96,E.H*.13));c.restore();};
  const photo=(n,t,dur,zoom,dim)=>{const c=x(),a=A(),im=img(n);if(!ok(im))return;const k=cl(t/Math.max(1,dur),0,1),z=lerp(1,zoom||1.12,k);
    const sc=Math.max(a.w/im.naturalWidth,a.h/im.naturalHeight)*z,iw=im.naturalWidth*sc,ih=im.naturalHeight*sc;
    c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=eo(Math.max(0,t)/1.6);c.drawImage(im,a.x+a.w/2-iw/2,a.y+a.h/2-ih/2,iw,ih);
    c.fillStyle=`rgba(2,4,12,${dim||0})`;c.fillRect(a.x,a.y,a.w,a.h);
    const g=c.createRadialGradient(a.x+a.w/2,a.y+a.h/2,Math.min(a.w,a.h)*.3,a.x+a.w/2,a.y+a.h/2,Math.max(a.w,a.h)*.62);g.addColorStop(0,"rgba(2,3,10,0)");g.addColorStop(1,"rgba(2,3,10,.82)");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};
  /* bakgrunder för egen grafik: grad(a,[[stopp,färg],…],al) */
  const grad=(a,stops,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;const g=c.createLinearGradient(0,a.y,0,a.y+a.h);stops.forEach(([p,col])=>g.addColorStop(p,col));c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};
  const panel=(a,al)=>{grad(a,[[0,"#0b1830"],[1,"#10223e"]],al==null?1:al);};
  const space=(a,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.fillStyle="#04060f";c.fillRect(a.x,a.y,a.w,a.h);const r=srand(7);c.fillStyle="#fff";for(let i=0;i<70;i++){c.globalAlpha=(al==null?1:al)*(.25+r()*.6);c.fillRect(a.x+r()*a.w,a.y+r()*a.h,1.4,1.4);}c.restore();};
  const deep=(a,t,al)=>{grad(a,[[0,"#0d3b63"],[.55,"#07233f"],[1,"#020b18"]],al);};
  const dusk=(a,al)=>{grad(a,[[0,"#0d1730"],[.62,"#3a2c3e"],[.8,"#b4683a"],[.801,"#2a1d12"],[1,"#150d07"]],al);};
  const sea=(a,gy,t,cols,n)=>{const c=x();c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();for(let j=0;j<(n||3);j++){const yy=gy+4+j*Math.max(10,a.h*.035);c.fillStyle=cols[j%cols.length];c.beginPath();c.moveTo(a.x,a.y+a.h);for(let px=a.x;px<=a.x+a.w+8;px+=8)c.lineTo(px,yy+Math.sin(px*.018+t*(1.2+j*.3)+j*2)*(3+j));c.lineTo(a.x+a.w,a.y+a.h);c.closePath();c.fill();}c.restore();};
  const man=(px,gy,h,col,t,arms)=>{const c=x();c.save();c.strokeStyle=col;c.fillStyle=col;c.lineWidth=Math.max(1.5,h*.09);c.lineCap="round";c.beginPath();c.arc(px,gy-h*.88,h*.11,0,TAU);c.fill();
    const sw=Math.sin((t||0)*5+px)*h*.08;c.beginPath();c.moveTo(px,gy-h*.76);c.lineTo(px,gy-h*.38);c.stroke();
    c.beginPath();c.moveTo(px,gy-h*.38);c.lineTo(px-h*.12+sw,gy);c.moveTo(px,gy-h*.38);c.lineTo(px+h*.12-sw,gy);c.stroke();
    c.beginPath();c.moveTo(px,gy-h*.68);c.lineTo(px-h*.16,gy-h*(arms?.95:.5));c.moveTo(px,gy-h*.68);c.lineTo(px+h*.16,gy-h*(arms?.95:.5));c.stroke();c.restore();};
  const title=(t,main,sub,col,dur)=>{const{s,cx,cy,a}=S(),f=eo((t-.8)/2),c=x();c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="#fff";c.font=`700 ${Math.round(Math.min(a.w*(o.titleW||.1),s*.2))}px "Source Serif 4",Georgia,serif`;c.shadowColor="rgba(0,0,0,.7)";c.shadowBlur=18;c.fillText(main,cx,cy+s*.05);c.shadowBlur=0;
    tx(sub,cx,cy+s*.05+Math.max(26,s*.07),col||"#ffcf8a","center",Math.max(13,s*.03),700);c.restore();return f;};
  return{x,tx,tg,S,cred,photo,panel,grad,space,deep,dusk,sea,man,title,srand,ok,img,TAU,E};
 }};
})();
