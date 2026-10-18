/* Digerdöden: minilektionen som film (sex scener), foton ur Wikimedia Commons blandade med egen grafik (canvas). Lugn och saklig ton, inga upprörande bilder.
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/digerdoden/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/digerdoden-1,2,3,5,6.jpg (Bruegels Dödens triumf, bild 4, används inte). MPDigerFilm.start(host,{overlay,onClose}). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:8.5,cap:[[0.5,"För nästan 700 år sedan drabbades Europa av en sjukdom som förändrade världen. Det här är berättelsen om digerdöden."]]},
 {k:"01 · Från Asien",d:11.5,cap:[[0.8,"Digerdöden spreds över Europa på 1300-talet. Den kom med handelsvägar och skepp."],[7.6,"Den nådde Europa omkring år 1347."]]},
 {k:"02 · Pest",d:7.5,cap:[[0.8,"Sjukdomen kallas pest. Bakterien spreds av loppor som levde på råttor och på människor."]]},
 {k:"03 · Många dog",d:8,cap:[[0.8,"Mellan en tredjedel och hälften av alla i Europa dog. Det var kanske 25 miljoner människor."]]},
 {k:"04 · Världen förändrades",d:8.5,cap:[[0.8,"Efteråt var det brist på arbetare. De som levde kunde kräva bättre betalt, och samhället förändrades."]]},
 {k:"05 · I dag",d:8.6,cap:[[0.8,"Digerdöden nådde Sverige omkring år 1350."],[5.1,"I dag kan pest botas med antibiotika."]]}
];
const META={mat:"klockor",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Digerdöden",under:"En film i sex steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Tack vare forskning och medicin kan vi i dag bota pest. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Medeltida bokmålning, Pierart dou Tielt · Public domain · Wikimedia Commons",2:"Foto: Qkiel · CC BY-SA 4.0 · Wikimedia Commons",3:"Foto: Alex O'Neal · CC BY-SA 2.0 · Wikimedia Commons",5:"Medeltida bokmålning, 1200-talet · Public domain · Wikimedia Commons",6:"Foto: Maksym Kozlenko · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPDigerFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"digerdoden",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"digerdoden-",names:[1,2,3,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,man,title}=L;
  const cog=(cx,gy,Ln,col)=>{const c=x(),u=Ln/100;c.save();c.fillStyle=col||"#b88a52";c.beginPath();c.moveTo(cx-40*u,gy-8*u);c.quadraticCurveTo(cx-30*u,gy+4*u,cx-10*u,gy+5*u);c.lineTo(cx+22*u,gy+5*u);c.quadraticCurveTo(cx+38*u,gy+2*u,cx+44*u,gy-10*u);c.lineTo(cx-40*u,gy-8*u);c.fill();
    c.strokeStyle="#5a3a1e";c.lineWidth=Math.max(1.5,1.4*u);c.beginPath();c.moveTo(cx,gy-8*u);c.lineTo(cx,gy-46*u);c.stroke();c.fillStyle="#efe6d2";c.beginPath();c.moveTo(cx-18*u,gy-42*u);c.quadraticCurveTo(cx,gy-38*u,cx+18*u,gy-42*u);c.lineTo(cx+16*u,gy-14*u);c.quadraticCurveTo(cx,gy-10*u,cx-16*u,gy-14*u);c.closePath();c.fill();c.restore();};
  const rat=(cx,gy,Ln,col)=>{const c=x(),u=Ln/100;c.save();c.fillStyle=col;c.strokeStyle=col;c.lineCap="round";c.beginPath();c.ellipse(cx,gy-14*u,24*u,12*u,0,0,TAU);c.fill();c.beginPath();c.moveTo(cx+22*u,gy-16*u);c.lineTo(cx+44*u,gy-10*u);c.lineTo(cx+22*u,gy-6*u);c.fill();c.beginPath();c.arc(cx+24*u,gy-22*u,4*u,0,TAU);c.fill();
    c.lineWidth=Math.max(2,2.4*u);c.beginPath();c.moveTo(cx-22*u,gy-12*u);c.bezierCurveTo(cx-44*u,gy-6*u,cx-50*u,gy-24*u,cx-62*u,gy-16*u);c.stroke();c.fillStyle="#fff";c.beginPath();c.arc(cx+34*u,gy-14*u,1.6*u,0,TAU);c.fill();c.restore();};
  const flea=(cx,cy,r,col)=>{const c=x();c.save();c.fillStyle=col;c.strokeStyle=col;c.lineWidth=Math.max(1.5,r*.18);c.lineCap="round";c.beginPath();c.ellipse(cx,cy,r,r*.7,0,0,TAU);c.fill();for(let i=-1;i<=1;i++){c.beginPath();c.moveTo(cx+i*r*.4,cy+r*.5);c.lineTo(cx+i*r*.9,cy+r*1.3);c.stroke();}c.restore();};
  const arrow=(x1,y1,x2,y2,col,q)=>{const c=x();if(q<=0)return;const ex=lerp(x1,x2,q),ey=lerp(y1,y2,q);c.save();c.strokeStyle=col;c.fillStyle=col;c.lineWidth=3;c.lineCap="round";c.beginPath();c.moveTo(x1,y1);c.lineTo(ex,ey);c.stroke();if(q>.95){const an=Math.atan2(y2-y1,x2-x1);c.beginPath();c.moveTo(x2,y2);c.lineTo(x2-Math.cos(an-.45)*12,y2-Math.sin(an-.45)*12);c.lineTo(x2-Math.cos(an+.45)*12,y2-Math.sin(an+.45)*12);c.fill();}c.restore();};

  const s0=(t)=>{photo(2,t,8.5,1.12,.4);const f=title(t,"DIGERDÖDEN","EN SJUKDOM SOM FÖRÄNDRADE EUROPA","#cfd8ff");cred(2,.55*f);};

  /* 1 · Från Asien: handelsväg med skepp */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();panel(a,1);
    const w=Math.min(a.w*.84,s*1.7),lx=cx-w/2,y=cy-s*.04;
    tx("Asien",lx+w,y-s*.15,"#ffcf8a","right",Math.max(15,s*.04),700);tx("Europa",lx,y-s*.15,"#9fd0ff","left",Math.max(15,s*.04),700);
    c.strokeStyle="rgba(255,255,255,.25)";c.setLineDash([6,8]);c.lineWidth=2;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();c.setLineDash([]);
    [0,.33,.66,1].forEach(p=>{c.fillStyle=p===0?"#9fd0ff":p===1?"#ffcf8a":"rgba(255,255,255,.5)";c.beginPath();c.arc(lx+w*p,y,7,0,TAU);c.fill();});
    const p=cl((t-1.2)/8,0,1),sx=lerp(lx+w,lx+w*.02,eo(p)),Ln=Math.min(a.w*.14,s*.2);cog(sx,y-4,Ln);
    for(let i=1;i<14;i++){c.fillStyle=`rgba(255,255,255,${.18*(1-i/14)})`;c.beginPath();c.arc(sx+Ln*.3+i*9,y+2,2,0,TAU);c.fill();}
    tx("handelsvägar och skepp",cx,y+s*.2,"#fff","center",Math.max(15,s*.038),700);
    if(t>7.6){const q=eo((t-7.6)/1);c.save();c.globalAlpha=q;tx("1347",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(30,s*.1),700);c.restore();}};

  /* 2 · Pest: råtta, loppa, människa */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(3,t,7.5,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const gy=cy+s*.12,dx=Math.min(a.w*.3,s*.52),Ln=Math.min(a.w*.18,s*.3),h=Math.min(s*.3,a.h*.3);
      const k1=eo((t-3.2)/.8);c.globalAlpha=g*k1;rat(cx-dx,gy,Ln,"#8f8a82");tx("Råtta",cx-dx,gy+Math.max(26,s*.058),"#cfc9bd","center",Math.max(14,s*.034),700);
      const k2=eo((t-4.3)/.8);c.globalAlpha=g*k2;flea(cx,gy-h*.2+Math.abs(Math.sin(t*5))*-8,Math.max(7,s*.02),"#d9b36a");tx("Loppa",cx,gy+Math.max(26,s*.058),"#e8cf93","center",Math.max(14,s*.034),700);
      const k3=eo((t-5.4)/.8);c.globalAlpha=g*k3;man(cx+dx,gy,h,"#9fd0ff",t,false);tx("Människa",cx+dx,gy+Math.max(26,s*.058),"#9fd0ff","center",Math.max(14,s*.034),700);
      c.globalAlpha=g;arrow(cx-dx+Ln*.5,gy-h*.3,cx-Math.max(24,s*.05),gy-h*.3,"#ffd86b",eo((t-4)/.6));arrow(cx+Math.max(24,s*.05),gy-h*.3,cx+dx-Ln*.3,gy-h*.3,"#ffd86b",eo((t-5.1)/.6));
      c.restore();}};

  /* 3 · Många dog: figurer som tonar bort, en tredjedel till hälften */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,8,1.1,.45+.3*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const n=12,cols=port?6:12,rows=n/cols,hm=Math.min(s*(port?.14:.2),a.w/(cols+1)*1.6),gx=Math.min(a.w*.9,hm*.62*cols),lx=cx-gx/2,y0=cy-s*.06;
      for(let i=0;i<n;i++){const col=i%cols,row=Math.floor(i/cols),px=lx+(col+.5)*gx/cols,py=y0+row*hm*1.15;
        const out=(i<4&&t>3.8)||(i>=4&&i<6&&t>5.6);man(px,py,hm,out?"rgba(255,255,255,.18)":"#cfd8ff",t,false);}
      tx("1/3 till 1/2",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(22,s*.065),700);
      if(t>5){const q=eo((t-5)/1);c.globalAlpha=g*q;tx("kanske 25 miljoner människor",cx,y0+rows*hm*1.15+Math.max(34,s*.08),"#fff","center",Math.max(15,s*.038),700);}
      c.restore();}};

  /* 4 · Världen förändrades: färre arbetare, högre lön */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(5,t,8.5,1.08,.15+.4*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.7,s*1.2),lx=cx-w/2,base=a.y+a.h*.72,bh=a.h*.4,bw=w*.14,gap=w*.12;
      const bars=[["Arbetare","före",1,"#9fd0ff"],["Arbetare","efter",.55,"#9fd0ff"],["Lön","före",.45,"#ffd86b"],["Lön","efter",.95,"#ffd86b"]];
      const k=eo((t-4)/1.6);
      bars.forEach(([n,w2,v,col],i)=>{const bx=lx+i*(bw+gap)+(i>1?gap:0),h=bh*v*(i%2?k:1)*(i%2?1:eo((t-3.8)/.8));c.fillStyle=col;c.globalAlpha=g*(i%2?.95:.55);c.fillRect(bx,base-h,bw,h);c.globalAlpha=g;tx(w2,bx+bw/2,base+Math.max(22,s*.05),"rgba(255,255,255,.75)","center",Math.max(12,s*.028),600);if(i%2===0)tx(n,bx+bw+gap/2,base+Math.max(46,s*.1),col,"center",Math.max(14,s*.034),700);});
      if(t>5.6){const q=eo((t-5.6)/1);c.globalAlpha=g*q;tx("färre arbetare, högre lön",cx,a.y+a.h*.14,"#fff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 5 · I dag: Sverige 1350, sedan antibiotika */
  const pill=(px,py,Ln,al)=>{const c=x();c.save();c.globalAlpha=al;c.translate(px,py);c.rotate(-.5);const r=Ln*.22;c.fillStyle="#e8eef7";c.beginPath();c.roundRect?c.roundRect(-Ln/2,-r,Ln,r*2,r):c.rect(-Ln/2,-r,Ln,r*2);c.fill();c.fillStyle="#d85b5b";c.beginPath();c.roundRect?c.roundRect(0,-r,Ln/2,r*2,[0,r,r,0]):c.rect(0,-r,Ln/2,r*2);c.fill();c.restore();};
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-4.6)/1.1);panel(a,1);if(t>4.6)photo(6,t-4.6,4,1.05,.62);
    const w=Math.min(a.w*.78,s*1.5),lx=cx-w/2,y=a.y+a.h*.32,px=yr=>lx+(yr-1340)/(1360-1340)*w;
    c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=2;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();
    [[1340,"1340"],[1350,"1350"],[1360,"1360"]].forEach(([yr,l])=>{c.beginPath();c.moveTo(px(yr),y-6);c.lineTo(px(yr),y+6);c.stroke();tx(l,px(yr),y+Math.max(26,s*.06),"rgba(255,255,255,.7)","center",Math.max(12,s*.03),600);});
    const k1=eo((t-1)/1),k2=eo((t-2.2)/1);
    if(k1>0){c.save();c.globalAlpha=k1;c.fillStyle="#ffb070";c.beginPath();c.arc(px(1347),y,9,0,TAU);c.fill();tx("Europa 1347",px(1347),y-22,"#ffb070","center",Math.max(13,s*.032),700);c.restore();}
    if(k2>0){c.save();c.globalAlpha=k2;c.fillStyle="#ffd86b";c.beginPath();c.arc(px(1350),y,9,0,TAU);c.fill();tx("Sverige 1350",px(1350)+Math.max(10,s*.02),y+Math.max(52,s*.12),"#ffd86b","left",Math.max(13,s*.032),700);c.restore();}
    if(g>0){c.save();c.globalAlpha=g;const py=a.y+a.h*.68,Ln=Math.min(a.w*.16,s*.26);
      for(let i=-1;i<=1;i++)pill(cx+i*Ln*1.2,py+Math.sin(t*2+i)*4,Ln,1);
      tx("Idag: antibiotika botar pest",cx,py+Math.max(54,s*.12),"#9be3b0","center",Math.max(17,s*.045),700);c.restore();cred(6,.55*g);}};

  return[s0,s1,s2,s3,s4,s5];
}
})();
