/* Åska och blixt: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/blixt/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/blixt-1..6.jpg. MPBlixtFilm.start(host,{overlay,onClose}). Ljudmatta: slott (vind och sprakande). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.9,cap:[[0.5,"Det blixtrar, och en stund senare mullrar det. Det här är berättelsen om åska och blixt."]]},
 {k:"01 · Åskmolnet",d:8.1,cap:[[0.8,"Inne i stora moln gnuggas isbitar och vattendroppar mot varandra. Då bildas elektricitet."]]},
 {k:"02 · Blixten",d:9.7,cap:[[0.8,"När elektriciteten blir för stor hoppar den som en gnista, en blixt."],[6.1,"Den kan gå mellan moln eller ner till marken."]]},
 {k:"03 · Varmare än solen",d:8.4,cap:[[0.8,"Luften runt en blixt blir ungefär 30 000 grader varm. Det är flera gånger varmare än solens yta."]]},
 {k:"04 · Åskan",d:7.5,cap:[[0.8,"Luften blir så het att den utvidgas explosionsartat. Det ger ett högt dån, åskan."]]},
 {k:"05 · Räkna avståndet",d:10.2,cap:[[0.8,"Ljuset är snabbare än ljudet. Räkna sekunderna mellan blixt och dån."],[6.3,"Tre sekunder är ungefär en kilometer."]]},
 {k:"06 · Var säker",d:5.9,cap:[[0.8,"Gå inomhus när det åskar. Stå inte under ensamma höga träd."]]}
];
const META={mat:"slott",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Åska och blixt",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Nästa gång det åskar vet du vad som händer. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Arnold Paul · CC BY-SA 2.5 · Wikimedia Commons",2:"Foto: Maxime Raynal · CC BY 2.0 · Wikimedia Commons",3:"Foto: Adam Block/NOIRLab/NSF/AURA · CC BY 4.0 · Wikimedia Commons",4:"Foto: Henry Sattink Rath · CC BY-SA 3.0 · Wikimedia Commons",5:"Foto: Ken Lund · CC BY-SA 2.0 · Wikimedia Commons",6:"Foto: Infrogmation of New Orleans · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPBlixtFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"blixt",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"blixt-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,man,title}=L;
  const sky=(a,flash)=>{grad(a,[[0,"#0a1224"],[.7,"#1c2540"],[1,"#2a3350"]]);if(flash>0){const c=x();c.save();c.globalAlpha=.35*flash;c.fillStyle="#dfe9ff";c.fillRect(a.x,a.y,a.w,a.h);c.restore();}};
  const cloud=(cx,cy,w,col,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.fillStyle=col||"#3b4560";[[-.32,.05,.2],[-.12,-.1,.26],[.12,-.06,.24],[.3,.06,.18],[0,.06,.28]].forEach(([dx,dy,r])=>{c.beginPath();c.arc(cx+dx*w,cy+dy*w,r*w,0,TAU);c.fill();});c.restore();};
  /* ojämn blixt från (x1,y1) till (x2,y2); seed ger formen. k = hur långt den hunnit (0..1) */
  const bolt=(x1,y1,x2,y2,seed,k,wd)=>{const c=x();if(k<=0)return;const r=L.srand(seed),n=14,pts=[[x1,y1]];for(let i=1;i<n;i++){const q=i/n;pts.push([lerp(x1,x2,q)+(r()-.5)*Math.abs(y2-y1)*.16,lerp(y1,y2,q)]);}pts.push([x2,y2]);
    const m=Math.max(2,Math.floor(pts.length*cl(k,0,1)));c.save();c.lineCap="round";c.lineJoin="round";c.shadowColor="#bcd4ff";c.shadowBlur=18;c.strokeStyle="#fff";c.lineWidth=wd||4;c.beginPath();pts.slice(0,m).forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();c.shadowBlur=0;c.strokeStyle="rgba(190,215,255,.7)";c.lineWidth=(wd||4)*.4;c.beginPath();pts.slice(0,m).forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();c.restore();};
  const house=(px,gy,w,col)=>{const c=x();c.save();c.fillStyle=col||"#c9884a";c.fillRect(px-w/2,gy-w*.55,w,w*.55);c.fillStyle="#7a3b2a";c.beginPath();c.moveTo(px-w*.6,gy-w*.55);c.lineTo(px,gy-w*1.05);c.lineTo(px+w*.6,gy-w*.55);c.closePath();c.fill();c.fillStyle="#ffe08a";c.fillRect(px-w*.12,gy-w*.38,w*.24,w*.24);c.restore();};
  const tree=(px,gy,h)=>{const c=x();c.save();c.fillStyle="#5a3a1e";c.fillRect(px-h*.05,gy-h*.45,h*.1,h*.45);c.fillStyle="#2f7a3d";[[0,-.62,.26],[-.14,-.5,.2],[.14,-.5,.2]].forEach(([dx,dy,r])=>{c.beginPath();c.arc(px+dx*h,gy+dy*h,r*h,0,TAU);c.fill();});c.restore();};
  const mark=(px,py,ok,r)=>{const c=x();c.save();c.lineWidth=Math.max(5,r*.3);c.lineCap="round";c.strokeStyle=ok?"#5ee08a":"#ff6b5e";c.beginPath();if(ok){c.moveTo(px-r*.6,py);c.lineTo(px-r*.15,py+r*.5);c.lineTo(px+r*.7,py-r*.5);}else{c.moveTo(px-r*.6,py-r*.6);c.lineTo(px+r*.6,py+r*.6);c.moveTo(px+r*.6,py-r*.6);c.lineTo(px-r*.6,py+r*.6);}c.stroke();c.restore();};

  const s0=(t)=>{photo(2,t,7.9,1.12,.3);const f=title(t,"ÅSKA OCH BLIXT","NÄR HIMLEN SPRAKAR","#cfd8ff");cred(2,.55*f);};

  /* 1 · Åskmolnet: partiklar som krockar, plus och minus */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(1,t,8.1,1.1,.1+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;sky(a,0);
      const w=Math.min(a.w*.7,s*1.3),cyc=cy-s*.06;cloud(cx,cyc,w,"#46506c");
      const r=L.srand(21),n=40;for(let i=0;i<n;i++){const bx=cx+(r()-.5)*w*.7,by=cyc+(r()-.4)*w*.26,ph=r()*6,mv=Math.max(6,w*.03),px=bx+Math.sin(t*2.2+ph)*mv,py=by+Math.cos(t*1.9+ph*1.3)*mv;
        if(i%2){c.fillStyle="#e8f2ff";c.beginPath();c.moveTo(px,py-5);c.lineTo(px+4,py);c.lineTo(px,py+5);c.lineTo(px-4,py);c.closePath();c.fill();}else{c.fillStyle="#6fb0e8";c.beginPath();c.arc(px,py,3.5,0,TAU);c.fill();}}
      const k=cl((t-4)/3,0,1),m=Math.round(8*k);c.font=font(700,Math.max(16,s*.04));c.textAlign="center";
      for(let i=0;i<m;i++){c.fillStyle="#ffd86b";c.fillText("+",cx-w*.3+i*w*.085,cyc-w*.2);c.fillStyle="#7ec8ff";c.fillText("−",cx-w*.3+i*w*.085,cyc+w*.28);}
      if(t>4.2){tx("elektricitet bildas",cx,a.y+a.h*.1,"#fff","center",Math.max(18,s*.048),700);}
      c.restore();}};

  /* 2 · Blixten: mot marken och mellan moln */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(3,t,9.7,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      const fl1=Math.exp(-Math.max(0,t-3.6)*3.5)*(t>3.6?1:0),fl2=Math.exp(-Math.max(0,t-6.8)*3.5)*(t>6.8?1:0);sky(a,Math.max(fl1,fl2));
      const gy=a.y+a.h*.8;c.fillStyle="#141b2e";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
      cloud(cx-a.w*.18,a.y+a.h*.22,Math.min(a.w*.4,s*.7),"#46506c");cloud(cx+a.w*.22,a.y+a.h*.2,Math.min(a.w*.3,s*.55),"#3d4760");
      house(cx-a.w*.3,gy,Math.max(30,s*.08),"#8a6a4a");
      const k1=cl((t-3.6)/.35,0,1);if(t>3.6&&t<5.4)bolt(cx-a.w*.18,a.y+a.h*.3,cx-a.w*.12,gy,5,k1,Math.max(3,s*.01));
      const k2=cl((t-6.8)/.3,0,1);if(t>6.8&&t<8.6)bolt(cx-a.w*.05,a.y+a.h*.24,cx+a.w*.12,a.y+a.h*.24+s*.05,9,k2,Math.max(3,s*.01));
      c.restore();}};

  /* 3 · Varmare än solen: två staplar */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(4,t,8.4,1.1,.1+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,bh=Math.max(34,s*.09),y1=cy-s*.12,y2=y1+bh*2.4,k1=eo((t-3.2)/1.2),k2=eo((t-4.6)/1.6);
      tx("Solens yta",lx,y1-10,"#ffd86b","left",Math.max(14,s*.034),700);c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y1,w,bh);c.fillStyle="#ffb347";c.fillRect(lx,y1,w*(5500/30000)*k1,bh);tx("ca 5 500°",lx+w*(5500/30000)*k1+10,y1+bh*.66,"#fff","left",Math.max(14,s*.034),700);
      tx("Luften runt en blixt",lx,y2-10,"#bcd4ff","left",Math.max(14,s*.034),700);c.fillStyle="rgba(255,255,255,.08)";c.fillRect(lx,y2,w,bh);c.fillStyle="#9fc4ff";c.fillRect(lx,y2,w*k2,bh);if(k2>.95)tx("ca 30 000°",lx+w-10,y2+bh*.66,"#06121f","right",Math.max(15,s*.038),700);
      c.restore();}};

  /* 4 · Åskan: ljudvågor från blixten */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,7.5,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;const fl=Math.exp(-Math.max(0,t-3)*3)*(t>3?1:0);sky(a,fl);
      const gy=a.y+a.h*.82,bx=cx,top=a.y+a.h*.18;c.fillStyle="#141b2e";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);cloud(cx,top-s*.02,Math.min(a.w*.5,s*.9),"#46506c");
      if(t>3&&t<4.5)bolt(bx,top+s*.04,bx+a.w*.02,gy,12,cl((t-3)/.3,0,1),Math.max(3,s*.01));
      if(t>3.2){const hx=bx,hy=gy-s*.05;c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();for(let i=0;i<5;i++){const ph=(((t-3.2)*.6)-i*.2);if(ph<0)continue;const rr=(ph%1)*a.w*.7;c.strokeStyle=`rgba(255,216,107,${.6*(1-rr/(a.w*.7))})`;c.lineWidth=3;c.beginPath();c.arc(hx,hy,rr,0,TAU);c.stroke();}c.restore();
        const q=eo((t-3.6)/.6);c.globalAlpha=g*q;tx("KRACK!",cx,a.y+a.h*.62,"#ffd86b","center",Math.max(30,s*.1),700);}
      c.restore();}};

  /* 5 · Räkna avståndet */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    const fl=Math.exp(-Math.max(0,t-1.6)*3)*(t>1.6?1:0);sky(a,fl);
    const gy=a.y+a.h*.74;c.fillStyle="#141b2e";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
    const ox=a.x+a.w*.16,sx=a.x+a.w*.78;man(ox,gy,Math.max(40,s*.12),"#e8eef7",t,false);house(ox+Math.max(40,s*.1),gy,Math.max(30,s*.08),"#8a6a4a");
    cloud(sx,a.y+a.h*.3,Math.min(a.w*.3,s*.55),"#46506c");if(t>1.6&&t<3)bolt(sx,a.y+a.h*.36,sx,gy,6,cl((t-1.6)/.25,0,1),Math.max(3,s*.01));
    // dånet kommer som en ring: framme efter 3 s
    if(t>1.6){const p=cl((t-1.6)/2.7,0,1),rr=p*(sx-ox);c.save();c.beginPath();c.rect(a.x,a.y,a.w,gy-a.y);c.clip();c.strokeStyle=`rgba(255,216,107,${.7*(1-p*.6)})`;c.lineWidth=3;c.beginPath();c.arc(sx,gy-s*.1,rr,Math.PI*.6,Math.PI*1.4);c.stroke();c.restore();}
    [[1,2.5],[2,3.4],[3,4.3]].forEach(([n,st])=>{if(t>=st){tx(String(n),cx-s*.1+(n-1)*s*.1,a.y+a.h*.16,n===3?"#ffd86b":"#fff","center",Math.max(34,s*.1),700);}});
    if(t>1.8)tx("blixt!",sx,a.y+a.h*.14,"#bcd4ff","center",Math.max(16,s*.04),700);
    if(t>4.4)tx("dån!",ox+(sx-ox)*.5,gy+Math.max(34,s*.07),"#ffd86b","center",Math.max(16,s*.04),700);
    if(t>6.3){const q=eo((t-6.3)/1),by=gy+Math.max(70,s*.14);c.save();c.globalAlpha=q;c.strokeStyle="#fff";c.lineWidth=2;c.beginPath();c.moveTo(ox,by-8);c.lineTo(ox,by);c.lineTo(sx,by);c.lineTo(sx,by-8);c.stroke();tx("3 sekunder ≈ 1 kilometer",cx,by+Math.max(28,s*.065),"#ffd86b","center",Math.max(17,s*.045),700);c.restore();}};

  /* 6 · Var säker: hus ja, ensamt träd nej */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2)/1.1);photo(6,t,5.9,1.1,.1+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;sky(a,0);const gy=a.y+a.h*.74;c.fillStyle="#141b2e";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
      const dx=Math.min(a.w*.22,s*.4),hw=Math.max(60,s*.18),k1=eo((t-2.6)/.8),k2=eo((t-3.6)/.8);
      c.globalAlpha=g*k1;house(cx-dx,gy,hw);mark(cx-dx,gy-hw*1.4,true,hw*.25);tx("inomhus",cx-dx,gy+Math.max(30,s*.065),"#9be3b0","center",Math.max(15,s*.04),700);
      c.globalAlpha=g*k2;tree(cx+dx,gy,hw*1.7);mark(cx+dx,gy-hw*2.1,false,hw*.25);tx("ensamt högt träd",cx+dx,gy+Math.max(30,s*.065),"#ffb0a8","center",Math.max(15,s*.04),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
