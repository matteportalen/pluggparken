/* Ananasen äter tillbaka: minilektionen som film (åtta scener, ca 1,5 minuter), bilder ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/ananas/s<scen>-<replik>.mp3 (ElevenLabs, Malin; "annanas" skrivet så för uttalet).
   Bilderna: bilder/ananas-1..6.jpg. MPAnanasFilm.start(host,{overlay,onClose}). Ljudmatta: tradgarden. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:5.7,cap:[[0.5,"Frukten som äter tillbaka. Det här är berättelsen om ananas."]]},
 {k:"01 · Svider i munnen",d:9.2,cap:[[0.8,"Har du ätit ananas och känt att det svider i munnen? Det beror på att frukten faktiskt försöker smälta din mun."]]},
 {k:"02 · Ett enzym",d:15.8,cap:[[0.8,"I ananas finns ett ämne som heter bromelain. Det är ett enzym som bryter ner proteiner, samma sorts ämnen som tungan och kinderna består av."],[10.6,"Dessutom sitter det små kristallnålar i frukten som kan reta munnen."]]},
 {k:"03 · Små skador",d:9.4,cap:[[0.8,"Bromelain bryter ner lite av det yttersta skiktet i munnen. Det är en lindrig skada som läker på några timmar, och saliven skyddar dig."]]},
 {k:"04 · Mört kött",d:12.9,cap:[[0.8,"Bromelain används för att göra kött mört, eftersom det bryter ner de sega proteinerna i köttet."],[7.5,"Även papaya och kiwi innehåller enzymer som kan göra kött mört."]]},
 {k:"05 · Gelé",d:10,cap:[[0.8,"Gelatin är också ett protein. Lägger du färsk ananas i gelé, stelnar den inte, eftersom bromelain bryter ner gelatinet."]]},
 {k:"06 · Burk går bra",d:9.7,cap:[[0.8,"Ananas på burk har värmts upp, och då slutar enzymet att fungera. Därför funkar den i gelé, och den sticker inte lika mycket."]]},
 {k:"07 · Många frukter",d:13.5,cap:[[0.8,"Ananas är egentligen många små frukter som har vuxit ihop. Varje ruta på skalet är en egen liten frukt."],[8.1,"Det tar ungefär ett och ett halvt till två år innan en ananas är mogen."]]}
];
const META={mat:"tradgarden",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Ananasen äter tillbaka",under:"En film i åtta steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Ananas försvarar sig med kemi. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Diego Delso (ananas, Hawaii) · CC BY-SA 3.0 · Wikimedia Commons",2:"Foto: Thamizhpparithi Maari (skuren ananas) · CC BY-SA 3.0 · Wikimedia Commons",3:"Foto: Kritzolina (ananasodling, Azorerna) · CC BY-SA 4.0 · Wikimedia Commons",4:"Foto: Alexshakh (köttmörare) · CC BY-SA 4.0 · Wikimedia Commons",5:"Foto: Yip Alberto (dessert) · CC BY-SA 3.0 · Wikimedia Commons",6:"Foto: Alabama Extension (ananasbitar på burk) · CC0 · Wikimedia Commons"};

window.MPAnanasFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"ananas",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"ananas-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  /* ananas: kropp med rutmönster, krona av blad; face = ögon och mun */
  const pine=(px,py,r,face,hl)=>{const c=x();c.save();c.fillStyle="#3f8f3a";for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(px+i*r*.12,py-r*.9);c.lineTo(px+i*r*.34,py-r*1.9-Math.abs(i)*0);c.lineTo(px+i*r*.2+r*.1,py-r*.85);c.closePath();c.fill();}
    c.fillStyle="#e8b52a";c.beginPath();c.ellipse(px,py,r*.78,r,0,0,TAU);c.fill();c.strokeStyle="#a8741a";c.lineWidth=Math.max(1.5,r*.04);c.save();c.beginPath();c.ellipse(px,py,r*.78,r,0,0,TAU);c.clip();for(let i=-6;i<=6;i++){c.beginPath();c.moveTo(px+i*r*.28-r,py-r*1.1);c.lineTo(px+i*r*.28+r,py+r*1.1);c.moveTo(px+i*r*.28+r,py-r*1.1);c.lineTo(px+i*r*.28-r,py+r*1.1);c.stroke();}c.restore();
    if(face){c.fillStyle="#fff";[-1,1].forEach(sd=>{c.beginPath();c.arc(px+sd*r*.25,py-r*.15,r*.16,0,TAU);c.fill();});c.fillStyle="#222";[-1,1].forEach(sd=>{c.beginPath();c.arc(px+sd*r*.25+sd*r*.03,py-r*.13,r*.07,0,TAU);c.fill();});c.strokeStyle="#7a2a1a";c.lineWidth=Math.max(3,r*.06);c.beginPath();c.arc(px,py+r*.15,r*.28,.1*Math.PI,.9*Math.PI);c.stroke();c.fillStyle="#fff";for(let i=-2;i<=2;i++)c.fillRect(px+i*r*.1-r*.04,py+r*.2,r*.08,r*.08);}
    c.restore();};
  const frame=(n,px,py,w,h)=>{const c=x(),im=L.img(n);if(!L.ok(im))return;const ir=im.width/im.height,fr=w/h;let sw,sh,sx,sy;if(ir>fr){sh=im.height;sw=sh*fr;sx=(im.width-sw)/2;sy=0;}else{sw=im.width;sh=sw/fr;sx=0;sy=(im.height-sh)/2;}
    c.save();c.shadowColor="rgba(0,0,0,.35)";c.shadowBlur=24;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,16):c.rect(px-w/2,py-h/2,w,h);c.fillStyle="#fff";c.fill();c.shadowBlur=0;c.clip();c.drawImage(im,sx,sy,sw,sh,px-w/2,py-h/2,w,h);c.restore();c.save();c.strokeStyle="rgba(255,255,255,.9)";c.lineWidth=4;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,16):c.rect(px-w/2,py-h/2,w,h);c.stroke();c.restore();};
  const bead=(px,py,r,col)=>{dot(px,py,r,col);};
  const pac=(px,py,r,col,open,dir)=>{const c=x();c.save();c.fillStyle=col;c.beginPath();c.moveTo(px,py);const a0=open*.5,d=dir||1;c.arc(px,py,r,d>0?a0:Math.PI-a0*0-Math.PI+a0,d>0?TAU-a0:TAU-a0);c.closePath();c.fill();c.fillStyle="#222";c.beginPath();c.arc(px+r*.1,py-r*.45,r*.1,0,TAU);c.fill();c.restore();};

  const s0=(t)=>{photo(1,t,5.7,1.12,.3);const f=title(t,"ANANASEN","FRUKTEN SOM ÄTER TILLBAKA","#ffd86b");cred(1,.55*f);};

  /* 1 · svider i munnen */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,9.2,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfe9f7"],[1,"#eaf5fb"]]);const r=Math.max(40,Math.min(a.w*.12,a.h*.22,s*.2));frame(2,cx-r*1.7,cy+r*.3,r*2.8,r*2.3);
      const mx=cx+r*1.6,my=cy+r*.3;c.fillStyle="#e87a8a";c.beginPath();c.ellipse(mx,my,r*.9,r*.6,0,0,TAU);c.fill();c.fillStyle="#7a1a2a";c.beginPath();c.ellipse(mx,my+r*.05,r*.6,r*.3,0,0,TAU);c.fill();c.fillStyle="#f09aa8";c.beginPath();c.ellipse(mx,my+r*.15,r*.4,r*.18,0,0,TAU);c.fill();
      if(t>4){const q=eo((t-4)/.8);c.globalAlpha=g*q;c.strokeStyle="#ffb020";c.lineWidth=4;for(let i=0;i<5;i++){const an=-Math.PI/2+i*.5-1,rr=r*(1.15+(Math.sin(t*10+i)*.05));c.beginPath();c.moveTo(mx+Math.cos(an)*rr*.9,my+Math.sin(an)*rr*.7);c.lineTo(mx+Math.cos(an)*rr*1.25,my+Math.sin(an)*rr*1.05);c.stroke();}tx("svider!",mx,my-r*1.4,"#d1383a","center",Math.max(20,s*.055),700);}
      c.restore();}};

  /* 2 · enzymet klipper proteinkedjan, sedan kristallnålar */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,15.8,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,n=18,gap=w/n,r=gap*.32;
      if(t<10.6){const k=eo((t-4)/5),cut=k*n;for(let i=0;i<n;i++){const split=i<cut-1?(1-Math.abs((cut-1-i)/6))*0:0;const yo=i<cut?Math.sin(i*1.7)*10+(i<cut-1?Math.min(14,(cut-1-i)*3)*(i%2?1:-1):0):0;const sx=lx+i*gap+gap/2+(i<cut?(i%2?3:-3):0);bead(sx,cy+yo,r,["#ff9a8a","#ffd86b","#9be3b0","#9fd0ff"][i%4]);}
        const px=lx+cut*gap;pac(px,cy-Math.max(0,0),Math.max(18,gap*.9),"#ffe27a",.6+.4*Math.sin(t*10),1);tx("bromelain",px,cy-Math.max(44,s*.1),"#ffd86b","center",Math.max(16,s*.042),700);
        tx("protein (tungan, kinderna)",cx,a.y+a.h*.14,"#cfd8ff","center",Math.max(17,s*.045),700);tx("enzymet klipper kedjan i bitar",cx,a.y+a.h*.88,"#9be3b0","center",Math.max(16,s*.042),700);}
      else{const q=eo((t-10.6)/1);c.globalAlpha=g*q;const r2=L.srand(2);c.fillStyle="#e8b52a";c.beginPath();c.ellipse(cx,cy,w*.25,s*.14,0,0,TAU);c.fill();c.strokeStyle="#fff";c.lineWidth=2.5;for(let i=0;i<22;i++){const an=r2()*TAU,rr=r2()*s*.1,px=cx+Math.cos(an)*rr*1.8,py=cy+Math.sin(an)*rr,l=Math.max(10,s*.03);c.beginPath();c.moveTo(px-l*.3,py-l);c.lineTo(px+l*.3,py+l);c.stroke();}tx("små kristallnålar",cx,cy+s*.24,"#cfd8ff","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 3 · yttersta skiktet tunnas ut och läker */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,9.4,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const w=Math.min(a.w*.6,s*1.1),lx=cx-w/2,y=cy-s*.1,h=Math.max(30,s*.08);
      const th=t<5?1:(t<6.6?1-.7*eo((t-5)/1.6):.3+.7*eo((t-6.6)/2));
      c.fillStyle="#e87a8a";c.fillRect(lx,y,w,h*th);c.fillStyle="#b84a5a";c.fillRect(lx,y+h,w,h*1.4);c.fillStyle="#7a2a3a";c.fillRect(lx,y+h*2.4,w,h*1.6);
      tx("yttersta skiktet",lx+w+14,y+h*.5,"#ffb0b8","left",Math.max(13,s*.034),700);
      tx(th<.5?"bryts ner lite":(t>7.4?"läker på några timmar":"skiktet"),cx,a.y+a.h*.12,"#ffd86b","center",Math.max(19,s*.052),700);
      if(t>7){c.globalAlpha=g*eo((t-7)/1);for(let i=0;i<6;i++){const px=lx+w*(.1+i*.16),py=y-8-((t*40+i*30)%50);dot(px,py,3,"#9fd0ff");}tx("saliven skyddar",cx,y+h*4.4+Math.max(18,s*.04),"#9fd0ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 4 · mört kött */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,12.9,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const w=Math.min(a.w*.55,s*1),h=Math.min(a.h*.28,s*.3),lx=cx-w/2,y=cy-h/2-s*.04;
      c.fillStyle="#b83a3a";c.fillRect(lx,y,w,h);c.strokeStyle="rgba(255,200,200,.7)";c.lineWidth=4;const cut=eo((t-3.4)/3);for(let i=0;i<8;i++){const yy=y+h*(i+.5)/8;c.beginPath();c.moveTo(lx+8,yy);c.lineTo(lx+w-8,yy);c.stroke();if(cut>0){c.strokeStyle="#13203c";c.lineWidth=5;for(let j=0;j<6;j++){const px=lx+w*(.12+j*.15)+(i%2)*w*.04;c.beginPath();c.moveTo(px,yy-h*.04);c.lineTo(px+4,yy+h*.04);c.stroke();}c.strokeStyle="rgba(255,200,200,.7)";c.lineWidth=4;}}
      tx("seg",lx-14,y+h*.5,"#ff9a8a","right",Math.max(14,s*.037),700);tx("mört",lx+w+14,y+h*.5,"#9be3b0","left",Math.max(14,s*.037),700);
      tx("bromelain bryter ner proteinet",cx,y+h+Math.max(40,s*.09),"#ffd86b","center",Math.max(16,s*.042),700);
      if(t>7.5){const q=eo((t-7.5)/1);c.globalAlpha=g*q;const py=a.y+a.h*.14,pw=Math.max(18,s*.05);dot(cx-pw*3,py+pw*.5,pw,"#f0a050");tx("papaya",cx-pw*3,py+pw*2.3,"#fff","center",Math.max(12,s*.032),600);dot(cx+pw*3,py+pw*.5,pw,"#7ab040");tx("kiwi",cx+pw*3,py+pw*2.3,"#fff","center",Math.max(12,s*.032),600);}
      c.restore();}};

  /* 5 · gelé stelnar inte med färsk ananas */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,10,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const bw=Math.min(a.w*.26,s*.4),bh=bw*.7,y=cy-bh*.3;
      [[-1,"färsk ananas","stelnar inte","#ff9a8a",false],[1,"ananas på burk","stelnar","#9be3b0",true]].forEach(([sd,n,r,col,solid],i)=>{const q=eo((t-3-i*.6)/.7);if(q<=0)return;c.save();c.globalAlpha=g*q;const px=cx+sd*(bw*.65);c.fillStyle="#e8f0f8";c.beginPath();c.moveTo(px-bw/2,y);c.lineTo(px+bw/2,y);c.lineTo(px+bw*.4,y+bh);c.lineTo(px-bw*.4,y+bh);c.closePath();c.fill();
        c.fillStyle=solid?"#e84a6a":"rgba(232,74,106,.5)";c.beginPath();c.moveTo(px-bw*.46,y+bh*.15);if(solid){c.lineTo(px+bw*.46,y+bh*.15);}else{for(let k=0;k<=20;k++){const xx=px-bw*.46+bw*.92*k/20;c.lineTo(xx,y+bh*.2+Math.sin(k*1.3+t*4)*4);}}c.lineTo(px+bw*.38,y+bh*.95);c.lineTo(px-bw*.38,y+bh*.95);c.closePath();c.fill();
        c.fillStyle="#e8b52a";c.fillRect(px-bw*.12,y+bh*.25+(solid?0:Math.sin(t*3)*4),bw*.24,bw*.14);
        tx(n,px,y+bh+Math.max(30,s*.07),"#fff","center",Math.max(14,s*.036),700);tx(r,px,y+bh+Math.max(30,s*.07)+Math.max(26,s*.06),col,"center",Math.max(15,s*.04),700);c.restore();});
      tx("gelatin är ett protein",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(19,s*.052),700);
      c.restore();}};

  /* 6 · värme stoppar enzymet */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,9.7,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const th=a.h*.5,tx0=cx-a.w*.2,top=cy-th*.55,k=eo((t-3.4)/2.4);
      c.fillStyle="rgba(255,255,255,.14)";c.fillRect(tx0,top,24,th);c.fillStyle=k>.5?"#ff6a5e":"#4aa8ff";c.fillRect(tx0,top+th*(1-.15-.8*k),24,th*(.15+.8*k));c.beginPath();c.arc(tx0+12,top+th+16,28,0,TAU);c.fill();tx("värme",tx0+12,top+th+Math.max(66,s*.14),"#ffb0a0","center",Math.max(15,s*.04),700);
      const px=cx+a.w*.12,py=cy;const dead=k>.7;pac(px,py,Math.max(30,s*.07),dead?"#7a7a82":"#ffe27a",dead?.05:.6+.4*Math.sin(t*10),1);
      tx(dead?"enzymet har slutat fungera":"enzymet jobbar",px,py+Math.max(64,s*.14),dead?"#cfd8ff":"#ffd86b","center",Math.max(15,s*.04),700);
      if(t>6){c.globalAlpha=g*eo((t-6)/1);tx("burk = uppvärmd",cx,a.y+a.h*.12,"#9be3b0","center",Math.max(19,s*.052),700);}
      c.restore();}};

  /* 7 · många små frukter, tid till mogen */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,13.5,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfe9f7"],[1,"#eaf5fb"]]);const r=Math.max(50,Math.min(a.w*.12,a.h*.24,s*.22));frame(3,cx-a.w*.18,cy,r*2.9,r*2.6);if(t>3.6){c.globalAlpha=g*eo((t-3.6)/1);tx("varje ruta = en liten frukt",cx-a.w*.18,cy+r*1.8,"#1d2b53","center",Math.max(15,s*.04),700);}
      if(t>8.1){const q=eo((t-8.1)/1),w=Math.min(a.w*.3,s*.5),lx=cx+a.w*.18-w/2,y=cy-s*.04;c.globalAlpha=g*q;c.strokeStyle="rgba(29,43,83,.4)";c.lineWidth=3;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();const k=eo((t-8.4)/3);dot(lx+w*k,y,9,"#e8b52a");tx("planterad",lx,y+Math.max(30,s*.07),"#1d2b53","center",Math.max(12,s*.032),700);tx("mogen: 1,5–2 år",lx+w,y+Math.max(30,s*.07),"#1d2b53","center",Math.max(12,s*.032),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
