/* Gemensamma motion graphics för minilektionsfilmerna (Webb, Raket, Mars, Kontinenterna …). Bygger på filmlib.js.
   MPFilmFX.make(E,L) → {sm,serif,kb,vign,dim,glow,clip,snow,stars,trace,curve,chip,bigNum,fmt,spike,goldHex,sphere,ring,counter,beam,rgba,srand}
   E = ritverktygen från filmmotorn, L = MPFilmLib.make(...). Alla funktioner ritar direkt på filmens canvas (E.x). */
(function(){
const TAU=Math.PI*2;
window.MPFilmFX={make(E,L){
  const {eo,cl,lerp,font}=E,x=()=>E.x,srand=L.srand,tx=L.tx;
  const sm=k=>{k=cl(k,0,1);return k*k*(3-2*k);};
  const serif=(w,sz)=>`${w} ${Math.round(sz)}px "Source Serif 4",Georgia,serif`;
  const fmt=n=>Math.round(n).toLocaleString("sv-SE");
  const rgba=(h,al)=>{const n=parseInt(h.slice(1),16);return`rgba(${n>>16&255},${n>>8&255},${n&255},${al})`;};
  /* en liten (suddig) kopia av bilden, gjord en gång: ersätter ctx.filter=blur som är mycket dyrt varje bildruta */
  const SMALL=new WeakMap();const smallOf=im=>{let c2=SMALL.get(im);if(c2)return c2;const w=32,h=Math.max(8,Math.round(32*im.naturalHeight/im.naturalWidth));c2=document.createElement("canvas");c2.width=w;c2.height=h;const g=c2.getContext("2d");g.drawImage(im,0,0,w,h);SMALL.set(im,c2);return c2;};
  const clip=a=>{const c=x();c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();};
  /* foto i rutan med kamerarörelse. o.z = zoom, o.fx/o.fy = punkt i bilden (0..1) i mitten, o.fit = hela bilden (suddig bakgrund), smal ruta visar hela bredden.
     Ger {X,Y,sc} som räknar bildens bildpunkter till skärmen (så att grafik kan ligga exakt på fotot). */
  const kb=(n,a,o,al)=>{const c=x(),im=L.img(n);if(!L.ok(im))return null;const iw=im.naturalWidth,ih=im.naturalHeight,ir=iw/ih,narrow=a.w/a.h<ir*.72;o=o||{};
    c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=al==null?1:al;
    let sc,ox,oy;const fx=o.fx==null?.5:o.fx,fy=o.fy==null?.5:o.fy,z=o.z||1;
    if(o.fit||narrow){const sb=Math.max(a.w/iw,a.h/ih),sm0=smallOf(im);c.imageSmoothingQuality="low";c.drawImage(sm0,a.x+a.w/2-iw*sb/2,a.y+a.h/2-ih*sb/2,iw*sb,ih*sb);c.fillStyle="rgba(0,0,0,.5)";c.fillRect(a.x,a.y,a.w,a.h);}
    if(o.fit){sc=Math.min(a.w/iw,a.h/ih)*z;ox=a.x+a.w/2-fx*iw*sc;oy=a.y+a.h/2-fy*ih*sc;}
    else if(narrow){sc=a.w/iw*z;ox=a.x+a.w/2-fx*iw*sc;oy=a.y+a.h*.46-fy*ih*sc;ox=Math.min(a.x,Math.max(a.x+a.w-iw*sc,ox));}
    else{sc=Math.max(a.w/iw,a.h/ih)*z;ox=a.x+a.w/2-fx*iw*sc;oy=a.y+a.h/2-fy*ih*sc;ox=Math.min(a.x,Math.max(a.x+a.w-iw*sc,ox));oy=Math.min(a.y,Math.max(a.y+a.h-ih*sc,oy));}
    c.drawImage(im,ox,oy,iw*sc,ih*sc);c.restore();return{X:v=>ox+v*sc,Y:v=>oy+v*sc,sc};};
  const vign=(a,k)=>{const c=x(),g=c.createRadialGradient(a.x+a.w/2,a.y+a.h/2,Math.min(a.w,a.h)*.28,a.x+a.w/2,a.y+a.h/2,Math.max(a.w,a.h)*.66);g.addColorStop(0,"rgba(2,3,10,0)");g.addColorStop(1,`rgba(2,3,10,${k==null?.8:k})`);c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);};
  const dim=(a,k,col)=>{const c=x();c.fillStyle=col||`rgba(3,6,16,${k})`;c.fillRect(a.x,a.y,a.w,a.h);};
  /* glöd: en färdig toning (sprite) per färg, ritas skalad och med genomskinlighet; mycket billigare än en ny toning varje gång */
  const SPR={};const sprite=(rgb)=>{let c2=SPR[rgb];if(c2)return c2;c2=document.createElement("canvas");c2.width=c2.height=64;const g=c2.getContext("2d"),gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,`rgba(${rgb},1)`);gr.addColorStop(1,`rgba(${rgb},0)`);g.fillStyle=gr;g.fillRect(0,0,64,64);SPR[rgb]=c2;return c2;};
  const PAR=/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/;
  const glow=(px,py,r,col,over)=>{const c=x();if(r<=.5)return;let rgb,al=1;const m=PAR.exec(col);if(m){rgb=m[1]+","+m[2]+","+m[3];al=m[4]===undefined?1:+m[4];}else if(col&&col[0]==="#"){const n=parseInt(col.slice(1),16);rgb=(n>>16&255)+","+(n>>8&255)+","+(n&255);}else rgb="255,255,255";
    if(al<=.005)return;c.save();if(!over)c.globalCompositeOperation="lighter";c.globalAlpha=Math.min(1,al);c.drawImage(sprite(rgb),px-r,py-r,r*2,r*2);c.restore();};
  const stars=(a,al,t,n)=>{const c=x(),R=srand(9);c.save();c.globalAlpha=al==null?1:al;c.fillStyle="#02040c";c.fillRect(a.x,a.y,a.w,a.h);c.fillStyle="#fff";for(let i=0;i<(n||150);i++){const px=a.x+R()*a.w,py=a.y+R()*a.h,tw=.55+.45*Math.sin((t||0)*(.6+R())+i);c.globalAlpha=(al==null?1:al)*(.2+R()*.7)*tw;c.fillRect(px,py,1.3+R()*.8,1.3+R()*.8);}c.restore();};
  /* snö/damm i flera djup */
  const snow=(a,t,n,wind,al)=>{const c=x(),R=srand(41);clip(a);for(let i=0;i<n;i++){const z=R(),sp=.04+z*.16,ph=R(),ph2=R(),X=a.x+(((ph2+t*(wind||.02)*(.5+z))%1)+1)%1*a.w,Y=a.y+((ph+t*sp)%1)*a.h,r=.8+z*z*3.2;c.fillStyle=`rgba(235,245,255,${(al||.8)*(.25+z*.6)})`;c.beginPath();c.arc(X+Math.sin(t*1.3+i)*6*z,Y,r,0,TAU);c.fill();}c.restore();};
  /* lysande linje som ritas fram längs punkter; k = 0..1 */
  const trace=(pts,k,col,w,head)=>{const c=x();if(k<=0||pts.length<2)return null;const segs=[];let tot=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);segs.push(d);tot+=d;}
    const left=tot*cl(k,0,1);let hx=pts[0][0],hy=pts[0][1];c.save();c.lineCap="round";c.lineJoin="round";c.globalCompositeOperation="lighter";
    [[w*4,.16],[w*2,.35],[w,1]].forEach(([lw,al])=>{c.strokeStyle=col;c.globalAlpha=al;c.lineWidth=lw;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);let l=left;for(let i=1;i<pts.length&&l>0;i++){const f=Math.min(1,l/segs[i-1]),px=pts[i-1][0]+(pts[i][0]-pts[i-1][0])*f,py=pts[i-1][1]+(pts[i][1]-pts[i-1][1])*f;c.lineTo(px,py);hx=px;hy=py;l-=segs[i-1];}c.stroke();});
    c.restore();if(head!==false&&k<1)glow(hx,hy,w*9,"rgba(255,240,200,.9)");return[hx,hy];};
  const curve=(P,n)=>{const out=[];for(let i=0;i<P.length-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];for(let j=0;j<n;j++){const t=j/n,t2=t*t,t3=t2*t;out.push([.5*((2*p1[0])+(-p0[0]+p2[0])*t+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),.5*((2*p1[1])+(-p0[1]+p2[1])*t+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3)]);}}out.push(P[P.length-1]);return out;};
  const chip=(t,px,py,col,sz,al,left)=>{const c=x();c.save();c.globalAlpha=al;c.font=font(700,sz);const w=c.measureText(t).width+sz*1.3,h=sz*1.9,X=left?px:px-w/2;c.fillStyle="rgba(8,14,32,.72)";c.strokeStyle=col;c.lineWidth=1.5;c.beginPath();c.roundRect?c.roundRect(X,py-h*.68,w,h,h/2):c.rect(X,py-h*.68,w,h);c.fill();c.stroke();c.fillStyle="#fff";c.textAlign="left";c.fillText(t,X+sz*.65,py+sz*.05);c.restore();};
  const bigNum=(txt,px,py,sz,col,al,align)=>{const c=x();c.save();c.globalAlpha=al;c.font=serif(700,sz);c.textAlign=align||"center";c.shadowColor=col;c.shadowBlur=sz*.35;c.fillStyle="#fff";c.fillText(txt,px,py);c.shadowBlur=0;c.restore();};
  /* webbs åttauddiga diffraktionsstjärna (sex stora och två små uddar) */
  const spike=(px,py,r,al,col)=>{const c=x();if(al<=0||r<2)return;c.save();c.globalCompositeOperation="lighter";c.globalAlpha=al;c.lineCap="round";
    [[0,1],[Math.PI/3,1],[-Math.PI/3,1],[Math.PI/2,.35]].forEach(([an,k])=>{for(const s of [1,-1]){const gx=px+Math.cos(an)*r*k*s,gy=py+Math.sin(an)*r*k*s,g=c.createLinearGradient(px,py,gx,gy);g.addColorStop(0,col||"rgba(200,220,255,.95)");g.addColorStop(1,"rgba(200,220,255,0)");c.strokeStyle=g;c.lineWidth=Math.max(1,r*.025);c.beginPath();c.moveTo(px,py);c.lineTo(gx,gy);c.stroke();}});
    c.restore();glow(px,py,r*.28,"rgba(220,235,255,.9)");};
  /* guldspegelns sexkant med metallisk gradient och glans; sh = 0..1 glansens läge */
  const hexPath=(c,px,py,r,rot)=>{c.beginPath();for(let i=0;i<6;i++){const an=TAU/6*i+(rot==null?TAU/12:rot);i?c.lineTo(px+Math.cos(an)*r,py+Math.sin(an)*r):c.moveTo(px+Math.cos(an)*r,py+Math.sin(an)*r);}c.closePath();};
  const goldHex=(px,py,r,sh,al)=>{const c=x();c.save();c.globalAlpha*=al==null?1:al;hexPath(c,px,py,r);const g=c.createLinearGradient(px-r,py-r,px+r,py+r);g.addColorStop(0,"#fff0b0");g.addColorStop(.35,"#e8b83a");g.addColorStop(.7,"#b8801c");g.addColorStop(1,"#e8c050");c.fillStyle=g;c.fill();
    c.save();hexPath(c,px,py,r);c.clip();const q=(sh%1+1)%1,gx=px-r*1.6+q*r*3.2,sg=c.createLinearGradient(gx-r*.4,py-r,gx+r*.4,py+r);sg.addColorStop(0,"rgba(255,255,255,0)");sg.addColorStop(.5,"rgba(255,255,240,.7)");sg.addColorStop(1,"rgba(255,255,255,0)");c.globalCompositeOperation="lighter";c.fillStyle=sg;c.fillRect(px-r,py-r,r*2,r*2);c.restore();
    hexPath(c,px,py,r);c.strokeStyle="rgba(70,40,0,.75)";c.lineWidth=Math.max(1,r*.05);c.stroke();c.restore();};
  /* klot med riktig textur (klot.js): name = jorden | manen | mars | jupiter | venus | merkurius | saturnus; rot i grader */
  const SPH={};
  const sphere=(name,px,py,r,rotDeg,lit)=>{const c=x(),rot=(rotDeg%360+360)%360/360*1024,st=SPH[name]||(SPH[name]={rot:-99,cv:null});let cv=st.cv;if(!cv||Math.abs(rot-st.rot)>=3||Math.abs(rot-st.rot)>1020){cv=window.MPKlot&&MPKlot.planet(name,rot,lit!==false);if(!cv)return false;st.rot=rot;
      const c2=st.own||(st.own=document.createElement("canvas"));c2.width=cv.width;c2.height=cv.height;c2.getContext("2d").drawImage(cv,0,0);st.cv=c2;cv=c2;}glow(px,py,r*1.5,name==="jorden"?"rgba(90,160,255,.2)":"rgba(255,200,150,.12)");c.drawImage(cv,px-r,py-r,2*r,2*r);
    const sh=c.createRadialGradient(px-r*.3,py-r*.4,r*.2,px,py,r*1.02);sh.addColorStop(0,"rgba(255,250,235,.1)");sh.addColorStop(.6,"rgba(0,0,0,0)");sh.addColorStop(1,"rgba(2,4,14,.8)");c.fillStyle=sh;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();
    c.save();c.globalCompositeOperation="lighter";c.strokeStyle=name==="jorden"?"rgba(120,180,255,.35)":"rgba(255,190,140,.25)";c.lineWidth=Math.max(1.5,r*.03);c.beginPath();c.arc(px,py,r,0,TAU);c.stroke();c.restore();return true;};
  const ring=(px,py,r,al,col,w)=>{const c=x();c.save();c.globalAlpha=al;c.strokeStyle=col||"#ffd86b";c.lineWidth=w||2;c.beginPath();c.arc(px,py,r,0,TAU);c.stroke();c.restore();};
  /* ping: pulserande ringar runt en punkt; q = tid sedan start */
  const ping=(px,py,q,s,col,al)=>{if(q<0)return;for(let i=0;i<2;i++){const ph=((q*.8+i*.5)%1);ring(px,py,s*(.012+ph*.09),(al==null?1:al)*(1-ph)*sm(q/.4),col||"#ffd86b",2);}glow(px,py,s*.035,col?"rgba(255,230,160,.8)":"rgba(255,220,120,.9)");};
  /* sträcka med glödande ljuspuls som rör sig längs den */
  const beam=(x0,y0,x1,y1,t,col,w,speed)=>{const c=x();c.save();c.globalCompositeOperation="lighter";c.strokeStyle=col;c.globalAlpha=.4;c.lineWidth=w;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();c.restore();for(let i=0;i<3;i++){const f=((t*(speed||.4)+i/3)%1);glow(lerp(x0,x1,f),lerp(y0,y1,f),w*7,col.replace(/[\d.]+\)$/,".7)"));}};
  const counter=(from,to,t,t0,dur)=>lerp(from,to,sm((t-t0)/dur));
  /* titel bokstav för bokstav med ljussvep; ty = baslinjens y (default 80 % ner i rutan) */
  const titleSweep=(t,a,main,sub,col,ty0,t0)=>{const c=x(),s=Math.min(a.w,a.h),sz=Math.min(a.w*(main.length>12?.085:.11),s*.14),ty=ty0==null?a.y+a.h*.8:ty0,T0=t0==null?1:t0;c.save();c.font=serif(700,sz);const sp=sz*.12,ws=[...main].map(ch=>c.measureText(ch).width),W=ws.reduce((q,w)=>q+w,0)+sp*(main.length-1);let px=a.x+a.w/2-W/2;const sweep=(t-T0-1.6)*9;
    [...main].forEach((ch,i)=>{const k=eo((t-T0-i*.07)/.7);if(k<=0){px+=ws[i]+sp;return;}c.globalAlpha=k;c.fillStyle="#fff";c.shadowColor="rgba(0,0,0,.75)";c.shadowBlur=20;c.fillText(ch,px,ty+(1-k)*sz*.35);c.shadowBlur=0;
      const sh=Math.exp(-Math.pow(i-sweep,2)/3);if(sh>.02){c.globalAlpha=k*sh;c.fillStyle="#fff6dc";c.shadowColor=col||"#ffe2a8";c.shadowBlur=sz*.5;c.fillText(ch,px,ty+(1-k)*sz*.35);c.shadowBlur=0;}px+=ws[i]+sp;});c.restore();
    const f=eo((t-T0-1.4)/1.2);tx(sub,a.x+a.w/2,ty+Math.max(26,s*.075),`rgba(255,215,160,${f})`,"center",Math.max(12,s*.03),700);
    c.save();c.globalAlpha=.6*f;c.strokeStyle=col||"#ffd79a";c.lineWidth=1.5;const lw=Math.min(a.w*.3,s*.5)*f;c.beginPath();c.moveTo(a.x+a.w/2-lw/2,ty+Math.max(40,s*.105));c.lineTo(a.x+a.w/2+lw/2,ty+Math.max(40,s*.105));c.stroke();c.restore();return f;};
  return{titleSweep,sm,serif,kb,vign,dim,glow,clip,snow,stars,trace,curve,chip,bigNum,fmt,spike,goldHex,hexPath,sphere,ring,ping,beam,counter,rgba,srand};
}};
})();
