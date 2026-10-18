/* Petrikor (doften av regn): minilektionen som film (sju scener, ca 1,7 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas, glöd och partiklar).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/petrichor/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/petrichor-1..6.jpg. MPPetrichorFilm.start(host,{overlay,onClose}). Ljudmatta: tradgarden. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.6,cap:[[0.5,"Doften av regn efter en torr period har ett eget namn. Det här är berättelsen om petrikor."]]},
 {k:"01 · Ordet",d:14.8,cap:[[0.8,"Ordet petrikor kommer från grekiskan. Petra betyder sten, och ikor var vätskan som flöt i gudarnas ådror."],[9,"Två australiska forskare hittade på ordet, år nitton-hundra-sextio-fyra."]]},
 {k:"02 · Växtoljor",d:9.0,cap:[[0.8,"De upptäckte att växter gör oljor under torra perioder. Oljorna samlas i jord och stenar, och lossnar när det regnar."]]},
 {k:"03 · Bakterierna",d:17.5,cap:[[0.8,"Men största delen av doften kommer från bakterier i jorden. De gör ett ämne som heter geosmin, och det betyder just lukten av jord."],[10.2,"Forskare tror att lukten lockar små djur, som hoppstjärtar, som sedan sprider bakteriernas sporer."]]},
 {k:"04 · Droppen",d:14.6,cap:[[0.8,"När en regndroppe träffar torr mark fångar den små luftfickor. De stiger som bubblor och spricker, och slungar ut doften i luften."],[9.7,"Det händer bäst vid lätt eller måttligt regn, på jord med små hål."]]},
 {k:"05 · Näsan",d:14.9,cap:[[0.8,"Vi människor är otroligt bra på att känna geosmin. Vi märker det när det bara finns några få delar på en biljon i luften."],[9.3,"Det är som att lösa upp en sockerbit i ungefär hundra stora simbassänger."]]},
 {k:"06 · Regnet",d:11.7,cap:[[0.8,"Så nästa gång det börjar regna efter en torr tid, stanna upp och känn efter. Du luktar bakterier, växtoljor och en droppe som träffar marken."]]}
];
const META={mat:"tradgarden",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Petrikor",under:"En film i sju steg · ca 1,7 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Regnets doft är bakterier, växtoljor och bubblor. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={"1":"Paul The Writer · CC0 · Wikimedia Commons","2":"Zde · CC BY-SA 4.0 · Wikimedia Commons","3":"Carlos Espinoza, Pedro Morales, Brenda… · CC BY 4.0 · Wikimedia Commons","4":"US Department of Agriculture · Public domain · Wikimedia Commons","5":"D. Sharon Pruitt from Hill Air Force… · CC BY 2.0 · Wikimedia Commons","6":"Richard Nevell (WMUK) · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPPetrichorFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"petrichor",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"petrichor-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title,srand}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,Math.max(.1,r));g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();c.restore();};
  const frame=(n,px,py,w,h)=>{const c=x(),im=L.img(n);if(!L.ok(im))return;const ir=im.width/im.height,fr=w/h;let sw,sh,sx,sy;if(ir>fr){sh=im.height;sw=sh*fr;sx=(im.width-sw)/2;sy=0;}else{sw=im.width;sh=sw/fr;sx=0;sy=(im.height-sh)/2;}
    c.save();c.shadowColor="rgba(120,220,200,.35)";c.shadowBlur=30;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.fillStyle="#000";c.fill();c.shadowBlur=0;c.clip();c.drawImage(im,sx,sy,sw,sh,px-w/2,py-h/2,w,h);c.restore();c.save();c.strokeStyle="rgba(160,230,215,.7)";c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.stroke();c.restore();};
  const BG=a=>grad(a,[[0,"#08141a"],[1,"#10262c"]]);
  /* regn: streck som faller */
  const rain=(a,t,n,len,col)=>{const c=x(),R=srand(5);c.save();c.strokeStyle=col||"rgba(170,210,235,.5)";c.lineWidth=1.6;for(let i=0;i<n;i++){const X=a.x+R()*a.w,sp=.7+R()*.6,ph=R(),q=((t*sp*.8+ph)%1),Y=a.y+q*a.h*1.1-len;c.beginPath();c.moveTo(X,Y);c.lineTo(X-len*.12,Y+len);c.stroke();}c.restore();};
  const cracks=(a,gy)=>{const c=x(),R=srand(9);c.save();c.strokeStyle="rgba(20,10,5,.7)";c.lineWidth=2;for(let i=0;i<14;i++){let px=a.x+R()*a.w,py=gy+4;c.beginPath();c.moveTo(px,py);for(let j=0;j<4;j++){px+=(R()-.5)*30;py+=6+R()*10;c.lineTo(px,py);}c.stroke();}c.restore();};
  const soil=(a,gy,col1,col2)=>{const c=x();const g=c.createLinearGradient(0,gy,0,a.y+a.h);g.addColorStop(0,col1||"#6a4a30");g.addColorStop(1,col2||"#2a1a10");c.fillStyle=g;c.fillRect(a.x,gy,a.w,a.y+a.h-gy);const R=srand(3);for(let i=0;i<120;i++){c.fillStyle=`rgba(${R()<.5?"30,20,12":"140,100,70"},.35)`;c.fillRect(a.x+R()*a.w,gy+R()*(a.y+a.h-gy),2+R()*3,2+R()*2);}};

  const s0=(t)=>{photo(1,t,7.6,1.12,.3);const f=title(t,"PETRIKOR","DOFTEN AV REGN","#bfe8e0");cred(1,.55*f);};

  /* 1 · ordet (grekiska) och 1964 */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,14.8,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);
      if(t<9){const fw=Math.min(a.w*.34,s*.6),fh=fw*.7;frame(2,cx-a.w*.24,cy,fw,fh);
        const q1=eo((t-3.4)/1),q2=eo((t-5.4)/1),q3=eo((t-7.4)/1.2);const px=cx+a.w*.2,f1=Math.max(24,s*.07);
        c.globalAlpha=g*q1;gl(px,cy-s*.16,f1*3,"rgba(160,255,230,.15)");tx("πέτρα",px,cy-s*.12,"#bff5e8","center",f1*1.3,700);tx("sten",px,cy-s*.12+f1*1.1,"#8fc8bd","center",Math.max(14,s*.037),600);
        c.globalAlpha=g*q2;gl(px,cy+s*.1,f1*3,"rgba(255,220,140,.15)");tx("ἰχώρ",px,cy+s*.12,"#ffe9a8","center",f1*1.3,700);tx("gudarnas ådervätska",px,cy+s*.12+f1*1.1,"#c8b078","center",Math.max(14,s*.037),600);
        c.globalAlpha=g*q3;tx("petrikor (petrichor)",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(22,s*.06),700);}
      else{const q=eo((t-9)/1.2);c.globalAlpha=g*q;gl(cx,cy,s*.55,"rgba(255,216,107,.18)");tx("1964",cx,cy+s*.04,"#ffd86b","center",Math.max(60,s*.2),700);tx("två australiska forskare",cx,cy+s*.04+Math.max(40,s*.09),"#bff5e8","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 2 · växtoljor samlas i jorden och lossnar när det regnar */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,9,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const gy=a.y+a.h*.64;soil(a,gy,"#7a5a3a","#2a1a10");if(t<5.4)cracks(a,gy);
      /* växt */const px=cx,H=a.h*.3;c.strokeStyle="#4a9a4a";c.lineWidth=5;c.lineCap="round";c.beginPath();c.moveTo(px,gy);c.quadraticCurveTo(px-6,gy-H*.5,px,gy-H);c.stroke();[[-1,.45],[1,.62],[-1,.8]].forEach(([d,h],i)=>{c.fillStyle="#58b058";c.beginPath();c.ellipse(px+d*H*.2,gy-H*h,H*.2,H*.08,d*-.5,0,TAU);c.fill();});
      const R=srand(2);const dry=eo((t-3)/2);
      /* gyllene oljedroppar: faller ner i jorden i torka, stiger vid regn */
      for(let i=0;i<46;i++){const bx=a.x+a.w*(.12+.76*R()),by0=gy+8+R()*(a.y+a.h-gy)*.55,ph=R();let X=bx,Y;if(t<5.4){const k=cl((t-2.8-ph*1.4)/1.8,0,1);Y=lerp(gy-H*.6*R(),by0,eo(k));X=lerp(px+(bx-px)*.2,bx,eo(k));}else{const k=cl((t-5.6-ph*1.8)/1.8,0,1);Y=by0-eo(k)*(by0-(gy-a.h*.3*(.4+R())));X=bx+Math.sin(t*2+i)*8*k;}
        gl(X,Y,Math.max(8,s*.02),"rgba(255,210,100,.7)");dot(X,Y,Math.max(2,s*.004),"#fff2c8");}
      if(t>5.4){rain(a,t,70,Math.max(14,s*.04));}
      tx(t<5.4?"torrt: oljor samlas i jorden":"regn: oljorna lossnar",cx,a.y+a.h*.1,t<5.4?"#ffd86b":"#bff5e8","center",Math.max(19,s*.052),700);
      c.restore();}};

  /* 3 · bakterier, geosmin och hoppstjärtar */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,17.5,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);
      if(t<10.2){const fw=Math.min(a.w*.36,s*.6),fh=fw*.7;frame(3,cx-a.w*.22,cy,fw,fh);
        const mx=cx+a.w*.2,my=cy,r=Math.max(26,s*.06),q=eo((t-4)/1.2);c.globalAlpha=g*q;
        /* geosminmolekyl: två sammanfogade ringar */
        const ring=(px,py,rr,rot)=>{c.beginPath();for(let i=0;i<6;i++){const an=rot+i*TAU/6;i?c.lineTo(px+Math.cos(an)*rr,py+Math.sin(an)*rr):c.moveTo(px+Math.cos(an)*rr,py+Math.sin(an)*rr);}c.closePath();c.stroke();};
        gl(mx,my,r*3,"rgba(150,255,210,.2)");c.strokeStyle="#bfffe0";c.lineWidth=4;c.lineJoin="round";ring(mx-r*.55,my,r*.62,0);ring(mx+r*.55,my,r*.62,0);
        [[mx-r*1.1,my-r*.55],[mx+r*1.1,my+r*.55],[mx,my-r*.95]].forEach(([X,Y],i)=>{gl(X,Y,r*.5,i===2?"rgba(255,90,80,.7)":"rgba(160,255,210,.6)");dot(X,Y,r*.14,i===2?"#ff8a7a":"#dfffee");});
        tx("geosmin",mx,my+r*2.1,"#bfffe0","center",Math.max(18,s*.048),700);tx("= jordens lukt",mx,my+r*2.1+Math.max(26,s*.058),"#8fc8bd","center",Math.max(13,s*.034),600);
        tx("bakterier i jorden",cx-a.w*.22,cy-fh/2-Math.max(14,s*.03),"#cfd8ff","center",Math.max(14,s*.037),700);}
      else{const q=eo((t-10.2)/1);c.globalAlpha=g*q;const gx=cx-a.w*.2,gy=cy+s*.06,R=srand(4);
        /* koloni av bakterier med doftdimma */
        gl(gx,gy,s*.28,"rgba(150,255,210,.2)");for(let i=0;i<40;i++){const an=R()*TAU,d=Math.sqrt(R())*s*.07;dot(gx+Math.cos(an)*d,gy+Math.sin(an)*d*.7,Math.max(2,s*.006),"#d8c898");}
        tx("bakterier + sporer",gx,gy+s*.14,"#cfd8ff","center",Math.max(14,s*.037),700);
        /* hoppstjärtar som kommer och hämtar sporer */
        for(let i=0;i<4;i++){const ph=((t-10.8)*.12+i*.25)%1,k=eo(Math.min(1,ph*1.6)),sx=lerp(cx+a.w*.38,gx,k)+Math.sin(t*3+i)*4,sy=lerp(cy-s*.2+i*s*.12,gy,k),back=ph>.62?eo((ph-.62)/.38):0,X=lerp(sx,cx+a.w*.38,back),Y=lerp(sy,cy-s*.2+i*s*.12,back);
          c.save();c.translate(X,Y);c.rotate(back?Math.PI:0);const u=Math.max(6,s*.016);c.fillStyle="#d8d0c0";c.beginPath();c.ellipse(0,0,u*1.5,u*.7,0,0,TAU);c.fill();c.strokeStyle="#d8d0c0";c.lineWidth=1.4;c.beginPath();c.moveTo(u,-u*.3);c.lineTo(u*2.2,-u*1.1);c.moveTo(u,-u*.1);c.lineTo(u*2.3,-u*.5);c.stroke();c.beginPath();c.moveTo(-u*1.4,u*.4);c.lineTo(-u*2.2,u*1.3);c.stroke();c.restore();if(back>0)gl(X,Y,u*2.5,"rgba(255,230,140,.7)");}
        tx("hoppstjärtar sprider sporerna",cx+a.w*.2,cy+s*.3,"#ffd86b","center",Math.max(15,s*.04),700);}
      c.restore();}};

  const BUB=(()=>{const R=srand(31),o=[];for(let i=0;i<34;i++)o.push([-Math.PI/2+(R()-.5)*2.6,.1+.22*R(),R()*.8,R()-.5]);return o;})();
  /* 4 · droppe träffar torr jord, bubblor slungar ut doften */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,14.6,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const gy=a.y+a.h*.6;soil(a,gy,"#8a6a48","#2a1a10");
      /* porer */const R=srand(6);c.fillStyle="rgba(15,8,4,.55)";for(let i=0;i<34;i++){const px=a.x+R()*a.w,py=gy+8+R()*(a.y+a.h-gy-14),r=3+R()*7;c.beginPath();c.ellipse(px,py,r,r*.7,0,0,TAU);c.fill();}
      const loopT=(t-3)%4.2,hx=cx,dropY=gy-a.h*.45;
      if(t>3){const k=loopT;
        if(k<1.0){const Y=lerp(dropY,gy-4,k*k);c.fillStyle="rgba(170,215,255,.95)";c.beginPath();c.moveTo(hx,Y-14);c.quadraticCurveTo(hx+8,Y,hx,Y+6);c.quadraticCurveTo(hx-8,Y,hx,Y-14);c.fill();gl(hx,Y,20,"rgba(170,215,255,.4)");}
        else{const u=k-1;const wr=u*s*.12;c.strokeStyle=`rgba(170,215,255,${Math.max(0,.7-u*.4)})`;c.lineWidth=3;c.beginPath();c.ellipse(hx,gy-2,wr,wr*.25,0,0,TAU);c.stroke();
          /* bubblor stiger ur marken och spricker */
          for(let i=0;i<34;i++){const B=BUB[i],st=u-B[2];if(st<0)continue;const rise=Math.min(1,st/.9),X=hx+Math.cos(B[0])*s*B[1]*rise+B[3]*s*.12,Y=gy-4+Math.sin(B[0])*s*B[1]*1.5*rise;
            if(rise<.5){const br=Math.max(3,s*.011*(.6+B[1]*2));c.strokeStyle="rgba(210,235,255,.9)";c.fillStyle="rgba(200,225,250,.25)";c.lineWidth=1.6;c.beginPath();c.arc(hx+B[3]*s*.2*(1+rise),gy-4-rise*s*.12,br*(1+rise),0,TAU);c.fill();c.stroke();}
            else{const q=(rise-.5)/.5;gl(X,Y,Math.max(8,s*.026)*(1+q),`rgba(255,215,120,${.8*(1-q*.6)})`);dot(X,Y,Math.max(1.8,s*.004),"#fff2c8");}}}}
      tx("droppe + luftfickor = doftbubblor",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(18,s*.048),700);
      if(t>9.7){c.globalAlpha=g*eo((t-9.7)/1);tx("bäst vid lätt eller måttligt regn",cx,a.y+a.h*.2,"#bff5e8","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 5 · några få delar på en biljon, sockerbit i hundra simbassänger */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,14.9,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);
      if(t<9.3){const cols=40,rows=22,gw=Math.min(a.w*.78,s*1.4),gh=gw*rows/cols*.8,lx=cx-gw/2,ty=cy-gh/2,R=srand(13);
        for(let i=0;i<cols*rows;i++){const px=lx+(i%cols+.5)*gw/cols,py=ty+(Math.floor(i/cols)+.5)*gh/rows;dot(px,py,Math.max(1.5,s*.0035),"rgba(150,190,210,.45)");}
        const k=eo((t-4)/1.2);for(let j=0;j<3;j++){const px=lx+(.2+.3*j+.07*Math.sin(j))*gw,py=ty+(.3+.35*((j*7)%3)/2)*gh;c.globalAlpha=g*k;gl(px,py,Math.max(18,s*.05)*(1+.2*Math.sin(t*5+j)),"rgba(255,220,120,.9)");dot(px,py,Math.max(3,s*.007),"#fff2c8");}
        c.globalAlpha=g;tx("några få delar på en biljon i luften",cx,ty-Math.max(22,s*.05),"#ffd86b","center",Math.max(17,s*.045),700);tx("en geosminmolekyl bland tusentals miljarder andra",cx,ty+gh+Math.max(34,s*.075),"#bff5e8","center",Math.max(14,s*.037),700);}
      else{const q=eo((t-9.3)/1),cols=10,rows=10,pw=Math.min(a.w*.7,s*1.2),ph=pw*.5,lx=cx-pw/2,ty=cy-ph*.35;c.globalAlpha=g*q;
        const k=cl((t-10.4)/3,0,1);for(let i=0;i<100;i++){const px=lx+(i%cols)*pw/cols,py=ty+Math.floor(i/cols)*ph/rows,w=pw/cols-4,h=ph/rows-4;c.fillStyle=`rgba(${70+Math.round(60*k*(1-Math.min(1,Math.hypot(i%cols-4.5,Math.floor(i/cols)-4.5)/7)))},170,230,.55)`;c.fillRect(px+2,py+2,w,h);c.strokeStyle="rgba(190,230,255,.5)";c.lineWidth=1;c.strokeRect(px+2,py+2,w,h);}
        const sx=cx,sy=ty-Math.max(30,s*.07)-(1-eo((t-9.6)/1))*s*.1,u=Math.max(10,s*.026);c.fillStyle="#fff";c.strokeStyle="#cdd";c.lineWidth=2;c.fillRect(sx-u,sy-u,u*2,u*2);c.strokeRect(sx-u,sy-u,u*2,u*2);gl(sx,sy,u*3,"rgba(255,255,255,.35)");tx("1 sockerbit",sx+u*2,sy+u*.5,"#fff","left",Math.max(14,s*.037),700);
        tx("≈ 100 stora simbassänger",cx,ty+ph+Math.max(32,s*.07),"#ffd86b","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 6 · regnet: dofterna stiger */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,11.7,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const gy=a.y+a.h*.7;soil(a,gy,"#5a4028","#1a100a");rain(a,t,110,Math.max(16,s*.045));
      const R=srand(8),cols=["rgba(150,255,210,.8)","rgba(255,210,100,.8)","rgba(190,225,255,.8)"],names=[["bakterier","#bfffe0"],["växtoljor","#ffe9a8"],["droppen","#cfe6ff"]];
      for(let i=0;i<60;i++){const k=i%3,ph=R(),bx=a.x+a.w*(.1+.8*R()),q=((t*.22+ph)%1),Y=gy-q*a.h*.55,X=bx+Math.sin(t*1.5+i)*14*q;gl(X,Y,Math.max(10,s*.03),cols[k].replace(".8",String(.6*(1-q))));dot(X,Y,Math.max(1.6,s*.004),"#fff");}
      names.forEach(([n,col],i)=>{const q=eo((t-4-i*1.3)/.8);c.globalAlpha=g*q;tx(n,cx+(i-1)*Math.min(a.w*.25,s*.5),a.y+a.h*.14,col,"center",Math.max(18,s*.048),700);});
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
