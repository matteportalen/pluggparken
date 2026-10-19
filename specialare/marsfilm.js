/* Robotar på Mars: minilektionen som film (sju scener), NASA- och ESA-bilder med motion graphics (riktiga klot, damm, lysande banor, mätlinjer).
   Använder filmmotorn i ../svarthal.js, filmlib.js och filmfx.js. Röst: ../ljud/mars/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/mars-1..6.jpg. MPMarsFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:10,cap:[[0.5,"En röd, kall planet, och robotar som utforskar den åt oss. Det här är berättelsen om robotarna på Mars."]]},
 {k:"01 · Röd planet",d:9.8,cap:[[0.8,"Mars är kall, torr och full av damm."],[4.2,"Ingen människa har varit där, men robotar har kört runt på ytan i många år."]]},
 {k:"02 · Sojourner",d:9.2,cap:[[0.8,"År 1997 landade den första lilla roboten, Sojourner, som var ungefär lika stor som en mikrovågsugn."]]},
 {k:"03 · Curiosity",d:9.9,cap:[[0.8,"Curiosity landade år 2012. Den är stor som en bil och undersöker stenar för att hitta spår av vatten."]]},
 {k:"04 · Perseverance",d:10.9,cap:[[0.8,"I februari år 2021 landade Perseverance i Jezerokratern, där det för länge sedan fanns en sjö."],[8.6,"Den samlar stenprover."]]},
 {k:"05 · Helikoptern",d:9.8,cap:[[0.8,"Med Perseverance kom helikoptern Ingenuity."],[3.9,"Den gjorde den första flygningen på en annan planet, i april år 2021."]]},
 {k:"06 · Radiosignaler",d:9.7,cap:[[0.8,"Signalerna från jorden tar mellan 5 och 20 minuter att nå Mars."],[6.0,"Därför kan man inte styra roboten med joystick."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Robotar på Mars",under:"En film i sju steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Kanske blir du den första människan på Mars. Filmen bygger på NASA:s och ESA:s bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Bild: NASA (Sojourner, schema) · Public domain · Wikimedia Commons",2:"Foto: NASA (Perseverances självporträtt) · Public domain · Wikimedia Commons",3:"Foto: NASA/semeion.photo (Curiosity vid Rocknest) · CC BY 2.0 · Wikimedia Commons",4:"Bild: ESA/DLR/FU Berlin (Jezerokraterns delta) · CC BY-SA 3.0 IGO · Wikimedia Commons",5:"Foto: NASA (Ingenuity sedd av Perseverance) · CC BY 2.0 · Wikimedia Commons",6:"Foto: NASA (Curiosity vid Mont Mercou) · Public domain · Wikimedia Commons",7:"Jordklot och Mars: Solar System Scope · CC BY 4.0"};

window.MPMarsFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"mars",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"mars-",names:[1,2,3,4,5,6],KR});
  const F=MPFilmFX.make(E,L);
  const {x,tx,S,cred}=L,{sm,serif,kb,vign,dim,glow,clip,stars,trace,curve,chip,bigNum,fmt,sphere,ring,ping,beam,rgba}=F;
  const RED="#ff9a6a",DUST="rgba(255,170,110,.5)";
  const rnd=i=>{const v=Math.sin(i*127.1+311.7)*43758.5453;return v-Math.floor(v);};
  /* dammvirvlar som driver över bilden */
  const dust=(a,t,n,al)=>{const c=x();clip(a);c.globalCompositeOperation="lighter";for(let i=0;i<n;i++){const z=rnd(i),X=a.x+(((rnd(i+5)+t*(.012+z*.05))%1)+1)%1*a.w,Y=a.y+rnd(i+9)*a.h+Math.sin(t*.8+i)*a.h*.02,r=a.h*(.03+z*.09);glow(X,Y,r,`rgba(255,160,100,${.1*(al||1)*(.4+z)})`);}c.restore();};
  /* foto i en glasram med glöd */
  const card=(n,px,py,w,h,al,fxy)=>{const c=x(),im=L.img(n);if(!L.ok(im))return;c.save();c.globalAlpha=al;c.shadowColor="rgba(255,150,90,.55)";c.shadowBlur=24;c.fillStyle="#10101a";c.beginPath();c.roundRect?c.roundRect(px,py,w,h,16):c.rect(px,py,w,h);c.fill();c.shadowBlur=0;c.save();c.beginPath();c.roundRect?c.roundRect(px,py,w,h,16):c.rect(px,py,w,h);c.clip();
    const iw=im.naturalWidth,ih=im.naturalHeight,sc=Math.max(w/iw,h/ih),fx=fxy?fxy[0]:.5,fy=fxy?fxy[1]:.5,ox=px+w/2-fx*iw*sc,oy=py+h/2-fy*ih*sc;c.drawImage(im,Math.min(px,Math.max(px+w-iw*sc,ox)),Math.min(py,Math.max(py+h-ih*sc,oy)),iw*sc,ih*sc);c.restore();c.strokeStyle="rgba(255,190,150,.7)";c.lineWidth=2;c.beginPath();c.roundRect?c.roundRect(px,py,w,h,16):c.rect(px,py,w,h);c.stroke();c.restore();};

  /* 0 · Inledning: Perseverances självporträtt, kameran glider mot roboten, dammet driver, titel */
  const s0=(t)=>{const{a,s}=S(),c=x(),p=cl(t/10,0,1);kb(2,a,{z:lerp(1.05,1.4,sm(p)),fx:lerp(.5,.72,sm(p)),fy:.45},eo(t/1.4));c.save();c.globalCompositeOperation="soft-light";c.fillStyle="rgba(255,120,60,.3)";c.fillRect(a.x,a.y,a.w,a.h);c.restore();dust(a,t,18,1);vign(a,.78);
    F.titleSweep(t,a,"ROBOTAR PÅ MARS","UTFORSKARE PÅ DEN RÖDA PLANETEN","#ffb890",a.y+a.h*.82);cred(2,.5*eo(t/2));};

  /* 1 · Röd planet: Mars som klot, kall/torr/dammig som glasbrickor, sedan Curiosity i en ram */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();stars(a,1,t,110);const R=Math.min(a.w*.19,a.h*.3),px=port?cx:a.x+a.w*.3,py=port?a.y+a.h*.34:cy;
    glow(px,py,R*1.7,"rgba(255,120,70,.18)");sphere("mars",px,py,R,t*7,true);
    // atmosfärens dimma
    dust({x:px-R,y:py-R,w:R*2,h:R*2},t,10,.8);
    const tem=Math.round(lerp(20,-63,sm((t-3)/2)));
    [["KALL",`ca ${tem} °C i medel`,"#9fd0ff",3],["TORR","ingen vätska på ytan","#ffd86b",4],["DAMMIG","stormar som täcker hela planeten",RED,5]].forEach(([n,sub,col,st],i)=>{const q=sm((t-st)/.6);if(q<=0)return;const bx=port?cx:a.x+a.w*.58,by=port?a.y+a.h*.68+i*Math.max(52,s*.11):cy-s*.2+i*Math.max(60,s*.14);c.save();c.globalAlpha=q;c.translate((1-q)*30,0);bigNum(n,bx,by,Math.max(26,s*.075),col,1,port?"center":"left");tx(sub,bx,by+Math.max(22,s*.05),"rgba(220,230,255,.85)",port?"center":"left",Math.max(11,s*.028),600);c.restore();});
    if(t>6.4){const q=sm((t-6.4)/.9),w=port?a.w*.4:a.w*.2,h=w*1.1;card(3,port?a.x+a.w*.55:a.x+a.w*.72,port?a.y+a.h*.08:a.y+a.h*.5,w*.8,h*.8,q*.95,[.5,.4]);}
    cred(7,.3);};

  /* 2 · Sojourner: ritningen i en ljus ram, mått på ritningen, jämförelse med en mikrovågsugn */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();stars(a,1,t,80);const im=L.img(1);
    const w=port?a.w*.84:a.w*.46,h=w*.64,lx=port?cx-w/2:a.x+a.w*.05,ly=port?a.y+a.h*.2:cy-h/2,q=sm((t-.4)/.9);
    c.save();c.globalAlpha=q;c.shadowColor="rgba(255,180,130,.5)";c.shadowBlur=24;c.fillStyle="#f6f4ee";c.beginPath();c.roundRect?c.roundRect(lx,ly,w,h,14):c.rect(lx,ly,w,h);c.fill();c.shadowBlur=0;
    if(L.ok(im)){c.save();c.beginPath();c.roundRect?c.roundRect(lx,ly,w,h,14):c.rect(lx,ly,w,h);c.clip();const sc=Math.min(w/im.naturalWidth,h/im.naturalHeight)*1.05;c.drawImage(im,lx+w/2-im.naturalWidth*sc/2,ly+h/2-im.naturalHeight*sc/2,im.naturalWidth*sc,im.naturalHeight*sc);c.restore();}
    c.restore();
    // måttlinje under ritningen och räknare
    const k=sm((t-2)/1.4),my=ly+h+Math.max(26,s*.06);if(k>0){c.save();c.strokeStyle="#ffd86b";c.lineWidth=2.5;c.shadowColor="#ffd86b";c.shadowBlur=10;c.beginPath();c.moveTo(lx,my);c.lineTo(lx+w*k,my);c.moveTo(lx,my-8);c.lineTo(lx,my+8);c.moveTo(lx+w*k,my-8);c.lineTo(lx+w*k,my+8);c.stroke();c.restore();tx("ca "+Math.round(65*k)+" cm",lx+w/2,my+Math.max(28,s*.065),"#ffd86b","center",Math.max(16,s*.045),700);}
    // mikrovågsugnen som symbol (jämförelse)
    const mq=sm((t-4.2)/.9);if(mq>0){const mw=port?a.w*.56:a.w*.3,mh=mw*.62,mx=port?cx-mw/2:a.x+a.w*.6,my2=port?a.y+a.h*.64:cy-mh/2;c.save();c.globalAlpha=mq;c.strokeStyle="rgba(255,255,255,.75)";c.lineWidth=3;c.shadowColor="#9fd0ff";c.shadowBlur=14;c.beginPath();c.roundRect?c.roundRect(mx,my2,mw,mh,10):c.rect(mx,my2,mw,mh);c.stroke();c.beginPath();c.roundRect?c.roundRect(mx+mw*.06,my2+mh*.12,mw*.62,mh*.76,6):c.rect(mx+mw*.06,my2+mh*.12,mw*.62,mh*.76);c.stroke();c.beginPath();c.arc(mx+mw*.85,my2+mh*.3,mh*.09,0,TAU);c.stroke();c.fillStyle="#7fd6ff";c.fillRect(mx+mw*.78,my2+mh*.6,mw*.14,mh*.07);c.restore();tx("MIKROVÅGSUGN",mx+mw/2,my2+mh+Math.max(26,s*.06),"rgba(207,216,255,.9)","center",Math.max(11,s*.028),700);}
    bigNum("1997",port?cx:a.x+a.w*.77,a.y+a.h*(port?.08:.16),Math.min(a.w*.09,s*.14),RED,sm((t-1)/.6));tx("SOJOURNER · FÖRSTA ROBOTEN",port?cx:a.x+a.w*.77,a.y+a.h*(port?.08:.16)+Math.max(24,s*.055),"rgba(255,184,144,.9)","center",Math.max(10,s*.024),700);
    if(t>6)chip("ungefär lika stora",port?cx:a.x+a.w*.77,a.y+a.h*.9,"rgba(255,216,107,.85)",Math.max(14,s*.04),sm((t-6)/.7));};

  /* 3 · Curiosity: Mont Mercou-fotot, sedan tre staplar (Sojourner, Curiosity, bil) som växer med mått */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    if(t<3.2){const p=cl(t/3.2,0,1);kb(6,a,{z:lerp(1.05,1.25,p),fx:.7,fy:.5},1);dust(a,t,10,.8);vign(a,.7);cred(6,.4);}
    else{const g=sm((t-2.6)/.9);stars(a,1,t,80);dim(a,.0);c.save();c.globalAlpha=g;
      const data=[["Sojourner",.65,"10 kg","#ffd86b"],["Curiosity",2.9,"900 kg",RED],["Bil",4.5,"1 500 kg","#9fd0ff"]],mx=4.5,bw=Math.min(a.w*(port?.7:.62),s*1.2),lx=cx-bw/2+(port?0:a.w*.04),bh=Math.max(28,s*.08),gap=Math.max(54,s*.17),y0=cy-gap*1.1;
      data.forEach(([n,len,kg,col],i)=>{const k=sm((t-3.2-i*.7)/1.2);if(k<=0)return;const y=y0+i*gap;tx(n.toUpperCase(),lx-14,y+bh*.66,col,"right",Math.max(11,s*.028),700);c.fillStyle="rgba(255,255,255,.07)";c.fillRect(lx,y,bw,bh);const g2=c.createLinearGradient(lx,0,lx+bw*len/mx,0);g2.addColorStop(0,rgba(col,.35));g2.addColorStop(1,col);c.fillStyle=g2;c.shadowColor=col;c.shadowBlur=14;c.fillRect(lx,y,bw*len/mx*k,bh);c.shadowBlur=0;
        tx((len*k).toFixed(len<1?2:1).replace(".",",")+" m · "+kg,lx+bw*len/mx*k+10,y+bh*.66,"#fff","left",Math.max(12,s*.034),700);});
      bigNum("2012",cx,a.y+a.h*.14,Math.min(a.w*.09,s*.14),RED,sm((t-3)/.6));tx("CURIOSITY LANDADE · STOR SOM EN LITEN BIL",cx,a.y+a.h*.14+Math.max(24,s*.055),"rgba(255,184,144,.9)","center",Math.max(10,s*.024),700);
      c.restore();}};

  /* 4 · Perseverance: kratern med deltat, en sjö som torkar bort, landningsplatsen pingar, stenproverna */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x(),p=cl(t/10.9,0,1);const T=kb(4,a,{fit:true,z:lerp(1,1.12,p),fx:.5,fy:.5},1);if(!T)return;
    // sjön: blått vatten som täcker deltats nedre del och sjunker undan
    const lake=1-sm((t-2.4)/5);c.save();clip(a);c.globalCompositeOperation="source-over";const wy=T.Y(300+(1-lake)*300);const wg=c.createLinearGradient(0,T.Y(0),0,T.Y(600));wg.addColorStop(0,`rgba(60,150,240,${.38*lake})`);wg.addColorStop(.5,`rgba(60,150,240,${.55*lake})`);wg.addColorStop(1,`rgba(40,110,220,${.75*lake})`);c.fillStyle=wg;c.fillRect(a.x,a.y,a.w,a.h);
    c.globalCompositeOperation="lighter";for(let i=0;i<14;i++){const yy=T.Y(60+i*40)+Math.sin(t*1.7+i)*3,al=.14*lake*(.4+rnd(i));c.strokeStyle=`rgba(190,225,255,${al})`;c.lineWidth=1.5;c.beginPath();c.moveTo(T.X(0),yy);c.bezierCurveTo(T.X(120),yy-6,T.X(200),yy+6,T.X(260),yy);c.stroke();}c.restore();vign(a,.6);
    // landningsplatsen
    const lx=T.X(70),ly=T.Y(400);ping(lx,ly,t-5.4,s,"#ffd86b",1);chip("Perseverance landade här · 2021",lx+s*.2,ly-s*.12,"rgba(255,216,107,.85)",Math.max(11,s*.03),sm((t-5.6)/.7));
    const f=sm((t-.8)/.8);chip(lake>.4?"för länge sedan: en sjö":"i dag: torrt",cx,a.y+a.h*.1,"rgba(159,208,255,.85)",Math.max(13,s*.036),f);tx("JEZEROKRATERN",cx,a.y+a.h*.1+Math.max(34,s*.075),`rgba(255,208,176,${f})`,"center",Math.max(10,s*.024),700);
    // stenprover: lysande rör
    if(t>8.6){const q=sm((t-8.6)/.9),tw=Math.max(14,s*.04),th=Math.max(52,s*.14),n=5;c.save();c.globalAlpha=q;for(let i=0;i<n;i++){const k=sm((t-8.9-i*.2)/.5);if(k<=0)continue;const X=cx-(n-1)/2*tw*1.6+i*tw*1.6,Y=a.y+a.h*.72;const g=c.createLinearGradient(X-tw/2,0,X+tw/2,0);g.addColorStop(0,"#8c93a3");g.addColorStop(.4,"#eef1f6");g.addColorStop(1,"#6d7586");c.globalAlpha=q*k;c.fillStyle=g;c.shadowColor="rgba(255,200,150,.7)";c.shadowBlur=14;c.beginPath();c.roundRect?c.roundRect(X-tw/2,Y-th*k,tw,th*k,tw*.4):c.rect(X-tw/2,Y-th*k,tw,th*k);c.fill();c.shadowBlur=0;c.fillStyle="#a85a30";c.fillRect(X-tw/2+2,Y-th*k*.5,tw-4,th*k*.22);}c.restore();chip("samlar stenprover",cx,a.y+a.h*.72+Math.max(40,s*.09),"rgba(255,216,107,.85)",Math.max(12,s*.032),q);}
    cred(4,.4);};

  /* 5 · Helikoptern: Ingenuity i fotot, rotorn snurrar, höjdmätare och räknare */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x(),p=cl(t/9.8,0,1);const lift=sm((t-2.4)/2.2)*(1-sm((t-5.6)/2));const T=kb(5,a,{z:lerp(1.1,1.7,sm(p)),fx:.6,fy:lerp(.55,.48,sm(p))},1);vign(a,.65);
    if(T){const hx=T.X(540),hy=T.Y(420)-lift*s*.18;c.save();c.globalCompositeOperation="lighter";const spin=t*40;for(let i=0;i<3;i++){c.strokeStyle=`rgba(255,235,210,${.22-i*.05})`;c.lineWidth=Math.max(2,T.sc*3);c.beginPath();c.ellipse(hx,hy-T.sc*34,T.sc*210+i*4,T.sc*12,0,0,TAU);c.stroke();}c.restore();glow(hx,hy,s*.1,"rgba(255,170,110,.18)");
      // höjdmätare
      const gx=a.x+a.w*(port?.88:.9),g0=a.y+a.h*.82,g1=a.y+a.h*.22;c.save();c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=2;c.beginPath();c.moveTo(gx,g0);c.lineTo(gx,g1);c.stroke();for(let i=0;i<=3;i++){const yy=lerp(g0,g1,i/3);c.beginPath();c.moveTo(gx-8,yy);c.lineTo(gx+8,yy);c.stroke();tx(i+" m",gx-14,yy+5,"rgba(220,230,255,.8)","right",Math.max(10,s*.024),600);}
      const my=lerp(g0,g1,lift);glow(gx,my,s*.04,"rgba(255,216,107,.9)");c.fillStyle="#ffd86b";c.beginPath();c.arc(gx,my,6,0,TAU);c.fill();c.restore();bigNum((3*lift).toFixed(1).replace(".",",")+" m",gx-(port?s*.1:s*.18),my,Math.max(20,s*.06),"#ffd86b",sm((t-2.4)/.5));}
    if(t>4.2){const q=sm((t-4.2)/.8);bigNum("19 april 2021",cx,a.y+a.h*.12,Math.min(a.w*.07,s*.11),RED,q);tx("FÖRSTA FLYGNINGEN PÅ EN ANNAN PLANET · ca 40 SEKUNDER",cx,a.y+a.h*.12+Math.max(26,s*.058),`rgba(255,208,176,${q})`,"center",Math.max(10,s*.022),700);}
    cred(5,.4);};

  /* 6 · Radiosignaler: jorden och Mars som klot, ljuspulser mellan dem och en överstruken joystick */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();stars(a,1,t,120);const ex=a.x+a.w*(port?.5:.14),ey=port?a.y+a.h*.16:cy-s*.06,mx=port?ex:a.x+a.w*.86,my=port?a.y+a.h*.56:cy-s*.06,re=Math.max(20,s*.075),rm=re*.55;
    sphere("jorden",ex,ey,re,t*14,true);sphere("mars",mx,my,rm,t*8,true);tx("JORDEN",ex,ey+re+Math.max(22,s*.05),"rgba(159,208,255,.9)","center",Math.max(10,s*.024),700);tx("MARS",mx,my+rm+Math.max(22,s*.05),"rgba(255,184,144,.9)","center",Math.max(10,s*.024),700);
    beam(ex+(port?0:re+6),ey+(port?re+6:0),mx-(port?0:rm+6),my-(port?rm+6:0),t,"rgba(127,214,255,.9)",3,.28);
    const mins=Math.round(lerp(5,20,.5+.5*Math.sin(t*.9)));const qk=sm((t-1.5)/.8);bigNum("5–20 minuter",port?cx:a.x+a.w*.5,port?a.y+a.h*.38:cy-s*.2,Math.min(a.w*.075,s*.12),"#7fd6ff",qk);tx("SIGNALEN FRÅN JORDEN TILL MARS",port?cx:a.x+a.w*.5,(port?a.y+a.h*.38:cy-s*.2)+Math.max(26,s*.058),`rgba(159,208,255,${qk})`,"center",Math.max(10,s*.024),700);
    if(t>5.6){const q=sm((t-5.6)/.8),jx=port?cx:a.x+a.w*.5,jy=port?a.y+a.h*.82:cy+s*.2;c.save();c.globalAlpha=q;c.strokeStyle="rgba(255,255,255,.85)";c.lineWidth=5;c.lineCap="round";const jh=Math.max(44,s*.12);c.beginPath();c.moveTo(jx,jy);c.lineTo(jx+jh*.12,jy-jh*.7);c.stroke();c.fillStyle="#e5484d";c.beginPath();c.arc(jx+jh*.12,jy-jh*.78,jh*.14,0,TAU);c.fill();c.beginPath();c.ellipse(jx,jy+4,jh*.34,jh*.1,0,0,TAU);c.stroke();
      c.strokeStyle="#ff6a6a";c.lineWidth=7;c.shadowColor="#ff6a6a";c.shadowBlur=16;c.beginPath();c.moveTo(jx-jh*.55,jy-jh*.95);c.lineTo(jx+jh*.55,jy+jh*.15);c.moveTo(jx+jh*.55,jy-jh*.95);c.lineTo(jx-jh*.55,jy+jh*.15);c.stroke();c.restore();}
    cred(7,.3);};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
