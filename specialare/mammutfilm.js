/* Ullhårsmammuten: minilektionen som film (sju scener). Motion graphics ovanpå riktiga foton ur Wikimedia Commons (inga ritade mammutar):
   kamerarörelser i fotona, mätlinjer och konturer som ritas fram på fotona, en tidslinje som zoomar ut, ett riktigt jordklot (klot.js),
   frost som växer, räknare och en DNA-spiral i 3D. Använder filmmotorn i ../svarthal.js och filmlib.js.
   Röst: ../ljud/mammutar/s<scen>-<replik>.mp3 (ElevenLabs, Malin). Bilderna: bilder/mammutar-1..6.jpg. MPMammutFilm.start(host,{overlay,onClose}). Ljudmatta: slott (vind). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.5,cap:[[0.5,"En jättelik, lurvig elefant som levde under istiden. Det här är berättelsen om ullhårsmammuten."]]},
 {k:"01 · Istidens djur",d:11.2,cap:[[0.8,"Ullhårsmammuten levde under istiden. De sista försvann för ungefär 4 000 år sedan."],[7.4,"Då byggdes redan pyramiderna i Egypten."]]},
 {k:"02 · Stora betar",d:8.4,cap:[[0.8,"Den var ungefär lika stor som en afrikansk elefant, med långa böjda betar som kunde bli flera meter."]]},
 {k:"03 · Päls mot kylan",d:6,cap:[[0.8,"Den hade tjock päls och ett tjockt lager fett som skydd mot kylan."]]},
 {k:"04 · Grottmålningar",d:5.3,cap:[[0.8,"Människor jagade mammutar och ritade dem på grottväggar."]]},
 {k:"05 · Frusna fynd",d:8.5,cap:[[0.8,"Hela mammutar har hittats frusna i Sibirien."],[4.4,"Kalven Lyuba är över 40 000 år gammal."]]},
 {k:"06 · Tillbaka?",d:10.1,cap:[[0.8,"Forskare har tagit DNA från frusna mammutar och funderar på om man kan skapa mammutliknande djur."],[7.6,"Ingen har lyckats ännu."]]}
];
const META={mat:"slott",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Ullhårsmammuten",under:"En film i sju steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Mammuten är borta, men vi lär oss om den än i dag. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Thomas Quine (modell, Royal BC Museum) · CC BY 2.0 · Wikimedia Commons",2:"Foto: Zde (mammutbete med ristningar) · CC BY-SA 4.0 · Wikimedia Commons",3:"Foto: Jim Linwood (modell, Horniman Museum) · CC BY 2.0 · Wikimedia Commons",4:"Grottmålning, Grotte de Rouffignac · Public domain · Wikimedia Commons",5:"Foto: Ruth Hartnup (Lyuba) · CC BY 2.0 · Wikimedia Commons",6:"Foto: Spudgun67 (DNA-plakett, Cambridge) · CC BY-SA 4.0 · Wikimedia Commons",7:"Jordklot: Solar System Scope · CC BY 4.0"};

window.MPMammutFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"mammutar",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"mammutar-",names:[1,2,3,4,5,6],KR});
  const {x,tx,S,cred,srand}=L;
  const FX=MPFilmFX.make(E,L),{kb,glow}=FX;
  const sm=k=>{k=cl(k,0,1);return k*k*(3-2*k);};
  const serif=(w,sz)=>`${w} ${Math.round(sz)}px "Source Serif 4",Georgia,serif`;

  const vign=(a,k)=>{const c=x(),g=c.createRadialGradient(a.x+a.w/2,a.y+a.h/2,Math.min(a.w,a.h)*.28,a.x+a.w/2,a.y+a.h/2,Math.max(a.w,a.h)*.66);g.addColorStop(0,"rgba(2,3,10,0)");g.addColorStop(1,`rgba(2,3,10,${k==null?.8:k})`);c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);};
  const dim=(a,k,col)=>{const c=x();c.fillStyle=col||`rgba(3,6,16,${k})`;c.fillRect(a.x,a.y,a.w,a.h);};
  const clip=a=>{const c=x();c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();};
  /* snö: små flingor långt bort och stora, suddiga flingor nära kameran (djup) */
  const snow=(a,t,n,wind,al)=>{const c=x(),R=srand(41);clip(a);for(let i=0;i<n;i++){const z=R(),sp=.04+z*.16,ph=R(),ph2=R(),X=a.x+(((ph2+t*(wind||.02)*(.5+z))%1)+1)%1*a.w,Y=a.y+((ph+t*sp)%1)*a.h,r=.8+z*z*3.2;c.fillStyle=`rgba(235,245,255,${(al||.8)*(.25+z*.6)})`;c.beginPath();c.arc(X+Math.sin(t*1.3+i)*6*z,Y,r,0,TAU);c.fill();}
    for(let i=0;i<9;i++){const ph=R(),ph2=R(),X=a.x+(((ph2-t*.05*(1+i%3))%1)+1)%1*a.w,Y=a.y+((ph+t*.09)%1)*a.h,r=Math.min(a.w,a.h)*(.025+R()*.03);const g=c.createRadialGradient(X,Y,0,X,Y,r);g.addColorStop(0,`rgba(255,255,255,${.18*(al||1)})`);g.addColorStop(1,"rgba(255,255,255,0)");c.fillStyle=g;c.beginPath();c.arc(X,Y,r,0,TAU);c.fill();}
    c.restore();};
  /* en lysande linje som ritas fram längs punkter (pts = [[x,y],…] på skärmen), k = 0..1 */
  const trace=(pts,k,col,w,head)=>{const c=x();if(k<=0||pts.length<2)return null;const segs=[];let tot=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);segs.push(d);tot+=d;}
    let left=tot*cl(k,0,1),hx=pts[0][0],hy=pts[0][1];c.save();c.lineCap="round";c.lineJoin="round";c.globalCompositeOperation="lighter";
    [[w*4,.16],[w*2,.35],[w,1]].forEach(([lw,al])=>{c.strokeStyle=col;c.globalAlpha=al;c.lineWidth=lw;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);let l=left;for(let i=1;i<pts.length&&l>0;i++){const f=Math.min(1,l/segs[i-1]),px=pts[i-1][0]+(pts[i][0]-pts[i-1][0])*f,py=pts[i-1][1]+(pts[i][1]-pts[i-1][1])*f;c.lineTo(px,py);hx=px;hy=py;l-=segs[i-1];}c.stroke();});
    c.restore();if(head!==false&&k<1){glow(hx,hy,w*9,"rgba(255,240,200,.9)");}return[hx,hy];};
  /* mjuk kurva genom punkter (Catmull-Rom), ger fler punkter */
  const curve=(P,n)=>{const out=[];for(let i=0;i<P.length-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];for(let j=0;j<n;j++){const t=j/n,t2=t*t,t3=t2*t;out.push([.5*((2*p1[0])+(-p0[0]+p2[0])*t+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),.5*((2*p1[1])+(-p0[1]+p2[1])*t+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3)]);}}out.push(P[P.length-1]);return out;};
  /* glasbricka med text */
  const chip=(t,px,py,col,sz,al,center)=>{const c=x();c.save();c.globalAlpha=al;c.font=font(700,sz);const w=c.measureText(t).width+sz*1.3,h=sz*1.9,X=center===false?px:px-w/2;c.fillStyle="rgba(8,14,32,.72)";c.strokeStyle=col;c.lineWidth=1.5;c.beginPath();c.roundRect?c.roundRect(X,py-h*.68,w,h,h/2):c.rect(X,py-h*.68,w,h);c.fill();c.stroke();c.fillStyle="#fff";c.textAlign="left";c.fillText(t,X+sz*.65,py+sz*.05);c.restore();};
  /* stort tal som räknas upp */
  const bigNum=(txt,px,py,sz,col,al,align)=>{const c=x();c.save();c.globalAlpha=al;c.font=serif(700,sz);c.textAlign=align||"center";c.shadowColor=col;c.shadowBlur=sz*.35;c.fillStyle="#fff";c.fillText(txt,px,py);c.shadowBlur=0;c.restore();};
  const rgba=(h,al)=>{const n=parseInt(h.slice(1),16);return`rgba(${n>>16&255},${n>>8&255},${n&255},${al})`;};
  const fmt=n=>Math.round(n).toLocaleString("sv-SE");

  /* 0 · Inledning: museimodellen, kameran glider in mot huvudet, snö, titeln bokstav för bokstav med ett ljussvep */
  const s0=(t)=>{const{a,s}=S(),c=x(),p=cl(t/7.5,0,1);kb(1,a,{z:lerp(1.02,1.2,sm(p)),fx:lerp(.5,.52,p),fy:lerp(.44,.33,p)},eo(t/1.6));
    c.save();c.globalCompositeOperation="soft-light";c.fillStyle="rgba(70,110,170,.35)";c.fillRect(a.x,a.y,a.w,a.h);c.restore();
    snow(a,t,110,.03,.85);vign(a,.85);
    const main="ULLHÅRSMAMMUTEN",sz=Math.min(a.w*.085,s*.14),ty=a.y+a.h*.8;c.save();c.font=serif(700,sz);const sp=sz*.12,ws=[...main].map(ch=>c.measureText(ch).width),W=ws.reduce((q,w)=>q+w,0)+sp*(main.length-1);let px=a.x+a.w/2-W/2;
      const sweep=(t-2.6)*9;[...main].forEach((ch,i)=>{const k=eo((t-1-i*.07)/.7);if(k<=0){px+=ws[i]+sp;return;}c.globalAlpha=k;c.fillStyle="#fff";c.shadowColor="rgba(0,0,0,.75)";c.shadowBlur=20;c.fillText(ch,px,ty+(1-k)*sz*.35);c.shadowBlur=0;
        const sh=Math.exp(-Math.pow(i-sweep,2)/3);if(sh>.02){c.globalAlpha=k*sh;c.fillStyle="#fff6dc";c.shadowColor="#ffe2a8";c.shadowBlur=sz*.5;c.fillText(ch,px,ty+(1-k)*sz*.35);c.shadowBlur=0;}px+=ws[i]+sp;});c.restore();
    const f=eo((t-2.4)/1.2);tx("EN LURVIG JÄTTE FRÅN ISTIDEN",a.x+a.w/2,ty+Math.max(26,s*.075),`rgba(255,215,160,${f})`,"center",Math.max(12,s*.03),700);
    c.save();c.globalAlpha=.6*f;c.strokeStyle="#ffd79a";c.lineWidth=1.5;const lw=Math.min(a.w*.3,s*.5)*f;c.beginPath();c.moveTo(a.x+a.w/2-lw/2,ty+Math.max(40,s*.105));c.lineTo(a.x+a.w/2+lw/2,ty+Math.max(40,s*.105));c.stroke();c.restore();
    cred(1,.5*eo(t/2));};

  /* 1 · Istidens djur: tidslinjen zoomar ut från i dag bakåt; räknaren springer till 4 000 år, de sista mammutarna pingar, sedan pyramiderna */
  const s1=(t)=>{const{a,s,cx,cy,port}=S(),c=x();kb(3,a,{z:1.25,fx:.12,fy:.3},1);dim(a,.84);snow(a,t,60,.015,.5);vign(a,.9);
    const g=eo((t-.4)/1);if(g<=0)return;c.save();c.globalAlpha=g;
    const R=a.x+a.w*.9,W=a.w*.8,ly=cy+s*.16,zk=sm((t-7.3)/1.5),off=3000*zk,V=lerp(Math.exp(lerp(Math.log(1200),Math.log(11500),sm((t-.8)/3.4))),2800,zk),X=ago=>R-(ago-off)/V*W;
    // mammutarnas tid: ett brett bärnstensband långt bakåt som slutar för 4 000 år sedan
    const bk=sm((t-2.6)/1.6);if(bk>0){const x0=Math.max(a.x,X(11500)),x1=X(4000);const gr=c.createLinearGradient(x0,0,x1,0);gr.addColorStop(0,"rgba(214,140,60,0)");gr.addColorStop(.25,"rgba(214,140,60,.55)");gr.addColorStop(1,"rgba(255,180,90,.85)");
      c.save();c.globalAlpha=g*bk;c.fillStyle=gr;const bh=Math.max(10,s*.026);c.fillRect(x0,ly-bh-6,(x1-x0)*bk,bh);tx("MAMMUTARNAS TID",x0+(x1-x0)*.35,ly-bh-14,"rgba(255,215,160,.9)","center",Math.max(11,s*.026),700);c.restore();}
    // linjen och strecken
    c.save();c.globalCompositeOperation="lighter";c.strokeStyle="rgba(140,210,255,.9)";c.lineWidth=2;c.shadowColor="#7fd6ff";c.shadowBlur=12;c.beginPath();c.moveTo(a.x+a.w*.06,ly);c.lineTo(R,ly);c.stroke();c.restore();
    const step=V>6000?2000:V>2500?1000:500;for(let v=0;v<=12000;v+=step){const px=X(v);if(px>R+2)continue;if(px<a.x+a.w*.06-2)break;const al=v%(step*2)===0?1:.55;c.strokeStyle=`rgba(255,255,255,${.5*al})`;c.lineWidth=1.5;c.beginPath();c.moveTo(px,ly-6);c.lineTo(px,ly+8);c.stroke();
      if(v%(step*2)===0||step>=2000||V<4000)tx(v===0?"i dag":fmt(v),px,ly+Math.max(26,s*.06),`rgba(220,235,255,${.8*al})`,"center",Math.max(11,s*.028),600);}
    tx("ÅR SEDAN",a.x+a.w*.06,ly+Math.max(50,s*.115),"rgba(127,214,255,.8)","left",Math.max(10,s*.024),700);
    // markören som reser bakåt till 4 000 år
    const mk=sm((t-1)/3.4),ago=4000*mk,mx=X(ago);c.save();c.globalCompositeOperation="lighter";c.strokeStyle="rgba(255,226,160,.9)";c.lineWidth=2;c.beginPath();c.moveTo(mx,ly-s*.24);c.lineTo(mx,ly+10);c.stroke();c.restore();glow(mx,ly,s*.06,"rgba(255,220,150,.7)");
    bigNum(fmt(ago)+" år sedan",cx,a.y+a.h*(port?.2:.24),Math.min(a.w*.09,s*.13),"#ffcf8a",1);
    if(t>4.4){const q=t-4.4;for(let i=0;i<2;i++){const ph=((q*.8+i*.5)%1);c.save();c.globalAlpha=g*(1-ph);c.strokeStyle="#ffd79a";c.lineWidth=2;c.beginPath();c.arc(mx,ly,s*(.02+ph*.12),0,TAU);c.stroke();c.restore();}
      chip("De sista mammutarna · Wrangelön",mx,lerp(ly-s*.3,ly+s*.24,sm((t-7.2)/1)),"rgba(255,207,138,.8)",Math.max(12,s*.03),eo((t-4.5)/.8));}
    // pyramiderna, ca 4 500 år sedan
    if(t>7.2){const q=eo((t-7.2)/1),px=X(4500),py=ly-s*.1,ph=s*.09*q;c.save();c.globalAlpha=g*q;const pg=c.createLinearGradient(px,py-ph,px,py);pg.addColorStop(0,"#ffe7a8");pg.addColorStop(1,"#b8863c");c.fillStyle=pg;c.shadowColor="#ffd27a";c.shadowBlur=24;c.beginPath();c.moveTo(px,py-ph);c.lineTo(px+ph*.85,py);c.lineTo(px-ph*.85,py);c.closePath();c.fill();c.shadowBlur=0;c.restore();
      chip("Pyramiderna byggs · ca 4 500 år sedan",px,ly-s*(port?.26:.24),"rgba(255,231,168,.85)",Math.max(12,s*.03),q);
      const b=eo((t-8.4)/1);if(b>0){c.save();c.globalAlpha=g*b;c.strokeStyle="#ffe7a8";c.lineWidth=2;const by=ly+Math.max(40,s*.1);c.beginPath();c.moveTo(X(4500),by);c.lineTo(X(4500),by+8);c.lineTo(X(4000),by+8);c.lineTo(X(4000),by);c.stroke();c.restore();tx("SAMTIDIGT",(X(4500)+X(4000))/2,by+Math.max(24,s*.05),`rgba(255,231,168,${b})`,"center",Math.max(10,s*.024),700);}}
    c.restore();cred(3,.4);};

  /* 2 · Stora betar: mätlinjer på fotot, höjden räknas upp och betens båge ritas fram */
  const s2=(t)=>{const{a,s,cx,port}=S(),c=x(),p=cl(t/8.4,0,1);const T=kb(1,a,{fit:true,z:lerp(.96,1,p),fx:.5,fy:.5},eo(t/1));if(!T)return;dim(a,.25);vign(a,.7);
    // höjd: från marken (y 497) till huvudets topp (y 68), linjen till höger om djuret
    const hx=T.X(840),g0=T.Y(497),g1=T.Y(68),hk=sm((t-1)/1.6);if(hk>0){c.save();c.setLineDash([6,6]);c.strokeStyle=`rgba(255,255,255,${.55*hk})`;c.lineWidth=1.5;c.beginPath();c.moveTo(T.X(455),g1);c.lineTo(hx,g1);c.moveTo(T.X(760),g0);c.lineTo(hx,g0);c.stroke();c.restore();
      const yy=lerp(g0,g1,hk);trace([[hx,g0],[hx,yy]],1,"rgba(127,214,255,.95)",2.5,false);c.save();c.strokeStyle="#bfe8ff";c.lineWidth=2;c.beginPath();c.moveTo(hx-8,g0);c.lineTo(hx+8,g0);c.moveTo(hx-8,yy);c.lineTo(hx+8,yy);c.stroke();c.restore();
      const nx=port?hx:hx+16,ny=port?T.Y(600)+Math.max(46,s*.13):lerp(g0,g1,.5);bigNum((3*hk).toFixed(1).replace(".",",")+" m",nx,ny,Math.max(24,s*.075),"#7fd6ff",hk,port?"right":"left");tx("HÖJD",nx,ny+Math.max(20,s*.045),`rgba(191,232,255,${hk})`,port?"right":"left",Math.max(10,s*.024),700);}
    // betarna: den vänstra betens båge från käken ut och upp
    const tusk=curve([[356,262],[300,292],[232,276],[196,214],[200,142],[236,104],[278,96]].map(([u,v])=>[T.X(u),T.Y(v)]),8),tk=sm((t-3.3)/2.2);
    const hd=trace(tusk,tk,"rgba(255,200,120,.95)",3);if(tk>0){const end=tusk[tusk.length-1];const lx=T.X(176),lyy=T.Y(200),al=port?"left":"right",lx2=port?T.X(30):lx;bigNum("upp till ca "+(4*tk).toFixed(0)+" m",lx2,port?T.Y(600)+Math.max(46,s*.13):lyy,Math.max(20,s*.06),"#ffc078",eo((t-3.6)/.8),al);tx("BETAR",lx2,(port?T.Y(600)+Math.max(46,s*.13)+Math.max(20,s*.045)+Math.max(30,s*.07):lyy)-Math.max(30,s*.07),`rgba(255,215,160,${eo((t-3.6)/.8)})`,al,Math.max(10,s*.024),700);}
    if(t>6.2)chip("Lika stor som en afrikansk elefant",cx,port?a.y+a.h*.12:a.y+a.h*.93,"rgba(255,215,160,.8)",Math.max(12,s*.032),eo((t-6.2)/.8));
    cred(1,.45);};

  /* 3 · Päls mot kylan: kameran in i pälsen, snöstorm, ett tvärsnitt med päls, fett och hud glider in */
  const s3=(t)=>{const{a,s,cx,cy,port}=S(),c=x(),p=cl(t/6,0,1);kb(3,a,{z:lerp(1.12,1.4,sm(p)),fx:.66,fy:.36},1);dim(a,.35,"rgba(20,40,80,.35)");
    // snöstorm från vänster
    clip(a);const R=srand(17);for(let i=0;i<70;i++){const z=R(),y0=R(),x0=R(),sp=.6+z*1.4,X=a.x+((x0+t*sp*.45)%1)*a.w,Y=a.y+((y0+t*.12*sp)%1)*a.h,len=s*(.02+z*.07);c.strokeStyle=`rgba(235,245,255,${.15+z*.5})`;c.lineWidth=.8+z*2;c.beginPath();c.moveTo(X,Y);c.lineTo(X-len,Y-len*.18);c.stroke();}c.restore();vign(a,.75);
    // termometer
    const tk=sm((t-.6)/2.2);bigNum(Math.round(-32*tk)+" °C",a.x+a.w*(port?.5:.18),a.y+a.h*.2,Math.min(a.w*.08,s*.11),"#7fd6ff",eo((t-.4)/.6));
    // tvärsnittet
    const w=port?a.w*.8:Math.min(a.w*.36,s*.6),h=port?a.h*.38:a.h*.56,bx=port?cx-w/2:a.x+a.w*.58,by=port?a.y+a.h*.52:cy-h*.38;const pk=eo((t-1)/.8);if(pk>0){c.save();c.globalAlpha=pk;c.translate((1-pk)*s*.12,0);
      c.fillStyle="rgba(8,14,32,.72)";c.strokeStyle="rgba(127,214,255,.6)";c.lineWidth=1.5;c.beginPath();c.roundRect?c.roundRect(bx,by,w,h,16):c.rect(bx,by,w,h);c.fill();c.stroke();
      tx("TVÄRSNITT",bx+16,by+24,"#7fd6ff","left",Math.max(10,s*.024),700);
      const ix=bx+16,iw=w*.56,top=by+38,lh=(h-54)/3,lay=[["Päls","upp till ca 90 cm lång",1.4,"#7a5230"],["Fett","upp till ca 10 cm",2.2,"#f2cf6a"],["Hud","tjock och seg",3,"#c98272"]];
      lay.forEach(([n,d,st,col],i)=>{const q=sm((t-st)/.7);if(q<=0)return;const ly=top+i*lh,hh=lh*.82*q;c.save();c.globalAlpha=pk*q;
        const gg=c.createLinearGradient(ix,ly,ix+iw,ly+hh);gg.addColorStop(0,col);gg.addColorStop(1,"rgba(0,0,0,.25)");c.fillStyle=col;c.fillRect(ix,ly,iw,hh);c.fillStyle=gg;c.fillRect(ix,ly,iw,hh);
        if(i===0){c.strokeStyle="rgba(40,22,8,.7)";c.lineWidth=1.6;for(let k=0;k<28;k++){const sx=ix+(k+.5)*iw/28,sw=Math.sin(t*3+k*.9)*iw*.012;c.beginPath();c.moveTo(sx,ly+hh);c.quadraticCurveTo(sx+sw*2,ly+hh*.5,sx+sw*3,ly+2);c.stroke();}}
        if(i===1){c.fillStyle="rgba(255,250,210,.35)";for(let k=0;k<14;k++){c.beginPath();c.arc(ix+((k*37)%100)/100*iw,ly+hh*(.3+((k*53)%60)/100),Math.max(2,hh*.12),0,TAU);c.fill();}}
        c.restore();c.save();c.globalAlpha=pk*q;tx(n,ix+iw+12,ly+hh*.48,"#fff","left",Math.max(13,s*.034),700);tx(d,ix+iw+12,ly+hh*.48+Math.max(16,s*.032),"rgba(200,220,255,.85)","left",Math.max(10,s*.024),600);c.restore();});
      // kylan studsar mot pälsen
      for(let i=0;i<5;i++){const ph=((t*1.1+i*.2)%1),yy=top+lh*.4+i*lh*.1;c.save();c.globalAlpha=pk*(1-ph)*.8;c.strokeStyle="#bfe8ff";c.lineWidth=2;const xx=ix-14-(1-ph)*w*.25;c.beginPath();c.moveTo(xx,yy);c.lineTo(xx+w*.05,yy);c.stroke();c.restore();}
      c.restore();}
    cred(3,.4);};

  /* 4 · Grottmålningar: mörker, en fackla glider fram över väggen och mammutens kontur lyser upp */
  const s4=(t)=>{const{a,s}=S(),c=x(),p=cl(t/5.3,0,1);const T=kb(4,a,{fit:true,z:lerp(.98,1.04,p),fx:.5,fy:.5},1);if(!T)return;
    const fl=.9+.07*Math.sin(t*17)+.05*Math.sin(t*31+1),tq=sm((t-.2)/3.4),txp=T.X(lerp(140,560,tq)),typ=T.Y(lerp(330,190,tq)),Rr=Math.max(a.w,a.h)*.42*fl;
    const dk=c.createRadialGradient(txp,typ,Rr*.08,txp,typ,Rr);dk.addColorStop(0,"rgba(10,5,2,0)");dk.addColorStop(.55,"rgba(10,5,2,.45)");dk.addColorStop(1,"rgba(6,3,1,.94)");c.fillStyle=dk;c.fillRect(a.x,a.y,a.w,a.h);
    glow(txp,typ,Rr*.7,"rgba(255,150,60,.22)");glow(txp,typ,Rr*.18,"rgba(255,210,140,.35)");
    const back=curve([[300,186],[332,140],[382,96],[442,66],[502,52],[562,54],[602,68],[622,102],[628,150],[616,200],[602,258],[596,318],[586,346]].map(([u,v])=>[T.X(u),T.Y(v)]),8);
    const tusk=curve([[604,248],[652,262],[712,244],[762,204]].map(([u,v])=>[T.X(u),T.Y(v)]),8);
    trace(back,sm((t-.9)/2.6),"rgba(255,190,110,.95)",2.6);trace(tusk,sm((t-3.1)/1.2),"rgba(255,226,170,.95)",2.6);
    for(let i=0;i<10;i++){const q=((t*.7+i*.1)%1);glow(txp+Math.sin(t*3+i)*s*.02,typ-q*s*.18,s*.012*(1-q),`rgba(255,190,90,${(.8*(1-q)).toFixed(2)})`);}
    if(t>3.6)chip("Grotte de Rouffignac, Frankrike · ca 13 000 år gammal",a.x+a.w/2,a.y+a.h*.92,"rgba(255,190,110,.8)",Math.max(11,s*.028),eo((t-3.6)/.8));
    cred(4,.4);};

  /* 5 · Frusna fynd: jordklotet vrids till Sibirien, fyndplatsen pingar; sedan Lyuba med frost som växer och en räknare */
  const frost=(a,k,t)=>{const c=x();if(k<=0)return;clip(a);const R=srand(5),corners=[[a.x,a.y,1,1],[a.x+a.w,a.y,-1,1],[a.x,a.y+a.h,1,-1],[a.x+a.w,a.y+a.h,-1,-1]];c.globalCompositeOperation="lighter";
    corners.forEach(([ox,oy,sx,sy])=>{for(let b=0;b<9;b++){const ang=(.08+R()*.84)*Math.PI/2,len=Math.min(a.w,a.h)*(.18+R()*.22)*k,ex=ox+sx*Math.cos(ang)*len,ey=oy+sy*Math.sin(ang)*len;c.strokeStyle="rgba(200,235,255,.35)";c.lineWidth=1.4;c.beginPath();c.moveTo(ox,oy);c.lineTo(ex,ey);c.stroke();
      for(let j=1;j<6;j++){const f=j/6,px=ox+(ex-ox)*f,py=oy+(ey-oy)*f,l2=len*.16*(1-f),a1=ang+.7,a2=ang-.7;c.beginPath();c.moveTo(px,py);c.lineTo(px+sx*Math.cos(a1)*l2,py+sy*Math.sin(a1)*l2);c.moveTo(px,py);c.lineTo(px+sx*Math.cos(a2)*l2,py+sy*Math.sin(a2)*l2);c.stroke();}}});
    const g=c.createRadialGradient(a.x+a.w/2,a.y+a.h/2,Math.min(a.w,a.h)*.35,a.x+a.w/2,a.y+a.h/2,Math.max(a.w,a.h)*.7);g.addColorStop(0,"rgba(120,180,230,0)");g.addColorStop(1,`rgba(150,200,240,${.35*k})`);c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};
  const stars=(a,al)=>{const c=x(),R=srand(9);c.save();c.fillStyle="#02040c";c.fillRect(a.x,a.y,a.w,a.h);c.fillStyle="#fff";for(let i=0;i<140;i++){c.globalAlpha=al*(.2+R()*.7);c.fillRect(a.x+R()*a.w,a.y+R()*a.h,1.3,1.3);}c.restore();};
  const s5=(t)=>{const{a,s,cx,cy,port}=S(),c=x();const gx=eo((t-4.1)/.9);
    if(gx<1){c.save();c.globalAlpha=1-gx;stars(a,1);const lam=lerp(15,72,sm((t-.2)/3)),cv=window.MPKlot&&MPKlot.planet("jorden",lam*1024/360,false),r=Math.min(a.w,a.h)*.36,zz=1+.18*sm(t/4.2);
      glow(cx,cy,r*zz*1.25,"rgba(90,160,255,.18)");if(cv){const rr=r*zz;c.drawImage(cv,cx-rr,cy-rr,2*rr,2*rr);const sh=c.createRadialGradient(cx-rr*.25,cy-rr*.45,rr*.1,cx,cy,rr*1.02);sh.addColorStop(0,"rgba(255,250,235,.12)");sh.addColorStop(.55,"rgba(0,0,0,0)");sh.addColorStop(1,"rgba(2,4,14,.82)");c.fillStyle=sh;c.beginPath();c.arc(cx,cy,rr,0,TAU);c.fill();c.save();c.globalCompositeOperation="lighter";c.strokeStyle="rgba(120,180,255,.35)";c.lineWidth=Math.max(2,rr*.025);c.beginPath();c.arc(cx,cy,rr,0,TAU);c.stroke();c.restore();}
      const la=68.5*Math.PI/180,l=(70-lam)*Math.PI/180,vis=Math.cos(la)*Math.cos(l),px=cx+r*zz*Math.cos(la)*Math.sin(l),py=cy-r*zz*Math.sin(la);
      if(vis>0&&t>2.4){const q=t-2.4;for(let i=0;i<2;i++){const ph=((q*.7+i*.5)%1);c.save();c.globalAlpha=(1-gx)*(1-ph)*sm(q/.5);c.strokeStyle="#ffd86b";c.lineWidth=2;c.beginPath();c.arc(px,py,s*(.01+ph*.08),0,TAU);c.stroke();c.restore();}glow(px,py,s*.03,"rgba(255,220,120,.9)");
        chip("Sibirien · Jamalhalvön",px+s*.3,py+s*.04,"rgba(255,216,107,.85)",Math.max(12,s*.03),sm((q-.3)/.6)*(1-gx));}
      c.restore();cred(7,.4*(1-gx));}
    if(gx>0){const q=cl((t-4.1)/4.4,0,1);kb(5,a,{z:lerp(1.04,1.16,sm(q)),fx:.5,fy:.45},gx);dim(a,.2);frost(a,sm((t-4.4)/2.8),t);vign(a,.75);
      const ck=sm((t-4.8)/2),sz=Math.min(a.w*.1,s*.15);bigNum(fmt(40000*ck)+" år",cx,a.y+a.h*(port?.2:.22),sz,"#bfe8ff",eo((t-4.6)/.6));
      if(ck>=1)tx("ÖVER",cx,a.y+a.h*(port?.2:.22)-sz*1.02,"rgba(191,232,255,.9)","center",Math.max(11,s*.028),700);
      if(t>6.2)chip("Lyuba · hittad 2007 · ca en månad gammal",cx,a.y+a.h*.9,"rgba(191,232,255,.8)",Math.max(11,s*.028),eo((t-6.2)/.8));cred(5,.4*gx);}};

  /* 6 · Tillbaka?: en DNA-spiral i 3D av ljus, bokstäverna strömmar, en cell med ett frågetecken */
  const BASE=[["A","T","#ff9a5a","#7fd6ff"],["T","A","#7fd6ff","#ff9a5a"],["C","G","#8af0a8","#ff7ab6"],["G","C","#ff7ab6","#8af0a8"]];
  const s6=(t)=>{const{a,s,cx,cy,port}=S(),c=x();c.save();const bg=c.createRadialGradient(cx,cy,0,cx,cy,Math.max(a.w,a.h)*.7);bg.addColorStop(0,"#0b1a36");bg.addColorStop(1,"#02040c");c.fillStyle=bg;c.fillRect(a.x,a.y,a.w,a.h);c.restore();
    clip(a);const Rb=srand(3);for(let i=0;i<22;i++){const X=a.x+Rb()*a.w,Y=a.y+((Rb()+t*.02*(1+Rb()))%1)*a.h;glow(X,Y,s*(.02+Rb()*.05),`rgba(${Rb()<.5?"127,214,255":"255,154,90"},.12)`);}
    // bokstäver som strömmar
    c.font=font(700,Math.max(11,s*.026));const cols=port?6:10;for(let j=0;j<cols;j++){const X=a.x+a.w*(port?.04+j*.16:j<5?.03+j*.045:.75+(j-5)*.05);for(let k=0;k<14;k++){const Y=a.y+(((k/14)+t*(.05+.02*(j%3))+j*.07)%1)*a.h,ch="ATCG"[(j*7+k*3)%4];c.fillStyle=`rgba(127,214,255,${.08+.1*((k+j)%3)})`;c.fillText(ch,X,Y);}}c.restore();
    // spiralen
    const hx=port?cx:a.x+a.w*.4,hh=Math.min(a.h*.78,s*1.05),top=cy-hh/2,R=Math.min(a.w*(port?.2:.12),s*.17),n=34,ap=eo((t-.3)/1.4);
    const pts=[];for(let i=0;i<n;i++){const q=i/(n-1),ang=q*TAU*2.4+t*1.1,y=top+q*hh,b=BASE[(i*5)%4];pts.push({y,ang,b,i,q});}
    const draw=(front)=>{pts.forEach(P=>{const z1=Math.sin(P.ang),z2=-z1;if((z1>0)!==front&&(z2>0)!==front)return;const x1=hx+Math.cos(P.ang)*R,x2=hx-Math.cos(P.ang)*R,vis=sm((ap*1.3-P.q*.3)/.3);if(vis<=0)return;
      if(front===(Math.abs(z1)<.5?true:z1>0)){c.save();c.globalAlpha=vis*.65;const lg=c.createLinearGradient(x1,0,x2,0);lg.addColorStop(0,P.b[2]);lg.addColorStop(.5,"rgba(255,255,255,.35)");lg.addColorStop(1,P.b[3]);c.strokeStyle=lg;c.lineWidth=Math.max(2,s*.006);c.beginPath();c.moveTo(x1,P.y);c.lineTo(x2,P.y);c.stroke();c.restore();}
      [[x1,z1,P.b[2]],[x2,z2,P.b[3]]].forEach(([px,z,col])=>{if((z>0)!==front)return;const rr=s*(.009+.006*(z+1));c.save();c.globalAlpha=vis*(.55+.45*(z+1)/2);glow(px,P.y,rr*4,rgba(col,.5));c.fillStyle=col;c.beginPath();c.arc(px,P.y,rr,0,TAU);c.fill();c.restore();});});};
    draw(false);draw(true);
    // skanner som går längs spiralen
    if(t>2.2&&t<7.2){const q=((t-2.2)/2.5)%1,yy=top+q*hh;c.save();c.globalCompositeOperation="lighter";const sg=c.createLinearGradient(0,yy-14,0,yy+14);sg.addColorStop(0,"rgba(127,214,255,0)");sg.addColorStop(.5,"rgba(127,214,255,.5)");sg.addColorStop(1,"rgba(127,214,255,0)");c.fillStyle=sg;c.fillRect(hx-R*1.6,yy-14,R*3.2,28);c.restore();}
    tx("MAMMUTENS DNA",hx,top-Math.max(14,s*.03),`rgba(191,232,255,${eo((t-1)/.8)})`,"center",Math.max(11,s*.026),700);
    // cellen med frågetecken
    const ck=eo((t-3.4)/1.2);if(ck>0){const ccx=port?cx:a.x+a.w*.74,ccy=port?a.y+a.h*.82:cy,cr=Math.min(a.w,a.h)*(port?.12:.2)*(0.85+.15*ck)*(1+.02*Math.sin(t*2));c.save();c.globalAlpha=ck;
      const cg=c.createRadialGradient(ccx-cr*.3,ccy-cr*.3,cr*.1,ccx,ccy,cr);cg.addColorStop(0,"rgba(255,200,170,.35)");cg.addColorStop(.85,"rgba(255,140,120,.18)");cg.addColorStop(1,"rgba(255,170,150,.55)");c.fillStyle=cg;c.beginPath();c.arc(ccx,ccy,cr,0,TAU);c.fill();
      c.strokeStyle="rgba(255,190,170,.7)";c.lineWidth=2;c.stroke();glow(ccx,ccy,cr*1.4,"rgba(255,140,110,.12)");
      const ng=c.createRadialGradient(ccx+cr*.08,ccy+cr*.05,0,ccx+cr*.08,ccy+cr*.05,cr*.36);ng.addColorStop(0,"rgba(190,120,255,.8)");ng.addColorStop(1,"rgba(120,80,220,.25)");c.fillStyle=ng;c.beginPath();c.arc(ccx+cr*.08,ccy+cr*.05,cr*.36,0,TAU);c.fill();
      tx("ELEFANTCELL",ccx,ccy+cr+Math.max(22,s*.05),"rgba(255,200,180,.85)","center",Math.max(10,s*.024),700);
      const qk=eo((t-5.2)/.9);if(qk>0){bigNum("?",ccx+cr*.08,ccy+cr*.2,cr*1.0,"#ffd86b",qk);}
      // DNA-bitar som flyger in i cellen
      if(t>4.2&&t<7.6){for(let i=0;i<6;i++){const f=((t-4.2)*.6+i/6)%1,sx=hx+R,sy=top+hh*(.2+.1*i),ex=ccx,ey=ccy,px=lerp(sx,ex,sm(f)),py=lerp(sy,ey,sm(f))-Math.sin(f*Math.PI)*s*.08;glow(px,py,s*.02*(1-f*.5),"rgba(127,214,255,.7)");}}
      c.restore();}
    if(t>7.6)chip("Ingen har lyckats ännu",port?cx:a.x+a.w*.74,port?a.y+a.h*.62:a.y+a.h*.86,"rgba(255,216,107,.85)",Math.max(13,s*.034),eo((t-7.6)/.7));};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
