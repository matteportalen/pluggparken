/* Kontinenterna rör sig: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Kontinenterna är förenklade bilder (inte exakta kartor). Använder filmmotorn i ../svarthal.js och filmlib.js.
   Röst: ../ljud/kontinenter/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel). Bilderna: bilder/kontinenter-1..6.jpg. MPKontFilm.start(host,{overlay,onClose}). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:8.5,cap:[[0.5,"För 300 miljoner år sedan såg jorden helt annorlunda ut. Det här är berättelsen om kontinenterna som rör sig."]]},
 {k:"01 · Jordens pussel",d:8.8,cap:[[0.8,"Jordens yta består av stora bitar, plattor, som flyter på het sten."],[6.3,"Länderna sitter fast på dem."]]},
 {k:"02 · Mycket långsamt",d:7.5,cap:[[0.8,"Plattorna rör sig ungefär några centimeter om året, ungefär lika fort som dina naglar växer."]]},
 {k:"03 · Pangea",d:9.4,cap:[[0.8,"För ungefär 300 miljoner år sedan satt nästan alla landområden ihop till en enda stor landmassa."],[7.0,"Den kallas Pangea."]]},
 {k:"04 · Passar ihop",d:8.5,cap:[[0.8,"Titta på kartan. Sydamerikas östkant och Afrikas västkant passar nästan ihop, som pusselbitar."]]},
 {k:"05 · Berg växer fram",d:7.5,cap:[[0.8,"När två plattor pressas mot varandra veckas marken, och berg växer upp, som Himalaya."]]},
 {k:"06 · Jordbävningar",d:7.2,cap:[[0.8,"När plattor hakar upp sig och sedan släpper kan det komma jordbävningar och vulkanutbrott."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Kontinenterna rör sig",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Marken under dina fötter rör sig hela tiden, fast väldigt långsamt. Filmen bygger på riktiga bilder ur Wikimedia Commons; kontinenterna i animationen är förenklade.",igen:"↻ Se filmen igen"};
const KR={1:"Karta över jordens plattor · Public domain · Wikimedia Commons",2:"Foto: Rjglewis (Islands rift) · Public domain · Wikimedia Commons",3:"Karta: Fama Clamosa (Pangea för 200 miljoner år sedan) · CC BY-SA 4.0 · Wikimedia Commons",4:"Figur ur Alfred Wegener, The origin of continents and oceans (1924) · Public domain",5:"Foto: NASA (Himalaya) · Public domain · Wikimedia Commons",6:"Foto: Mike McBey (San Andreas-förkastningen) · CC BY 2.0 · Wikimedia Commons"};

window.MPKontFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"kontinenter",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"kontinenter-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,title}=L;
  /* förenklade kontinenter: form, storlek, plats idag och som Pangea (karta 2:1, 0..1) */
  const K=[
   {n:"Nordamerika",p:[[-1,-.5],[-.2,-.9],[.7,-.7],[1,-.2],[.4,.1],[.2,.8],[-.1,.3],[-.6,.1]],sc:.13,idag:[.2,.3],pang:[.4,.33],col:"#6fa86a"},
   {n:"Sydamerika",p:[[-.4,-.9],[.5,-.6],[.7,0],[.2,.9],[-.1,.5],[-.4,-.2]],sc:.09,idag:[.29,.66],pang:[.45,.62],col:"#c9a24a"},
   {n:"Afrika",p:[[-.6,-.8],[.5,-.8],[.9,-.2],[.4,.9],[.1,.8],[-.2,0],[-.8,-.1]],sc:.12,idag:[.5,.55],pang:[.52,.52],col:"#d98a4a"},
   {n:"Eurasien",p:[[-1,-.4],[-.3,-.9],[.9,-.8],[1,0],[.4,.4],[-.2,.1],[-.9,.3]],sc:.17,idag:[.7,.3],pang:[.56,.3],col:"#a77fd0"},
   {n:"Indien",p:[[0,-.8],[.8,-.2],[0,.9],[-.8,-.2]],sc:.06,idag:[.68,.56],pang:[.55,.7],col:"#e0679a"},
   {n:"Australien",p:[[-.9,-.2],[0,-.7],[.9,-.2],[.5,.7],[-.6,.6]],sc:.08,idag:[.86,.76],pang:[.52,.8],col:"#e8c14a"},
   {n:"Antarktis",p:[[-1,0],[-.5,-.5],[.5,-.5],[1,0],[.5,.5],[-.5,.5]],sc:.13,idag:[.5,.94],pang:[.44,.88],col:"#dfe9f5"}
  ];
  const blob=(k,mx,my,mw,q,al,lab)=>{const c=x(),px=mx+lerp(k.pang[0],k.idag[0],q)*mw,py=my+lerp(k.pang[1],k.idag[1],q)*mw/2,r=k.sc*mw;c.save();c.globalAlpha=al==null?1:al;c.fillStyle=k.col;c.strokeStyle="rgba(0,0,0,.35)";c.lineWidth=1.5;c.lineJoin="round";c.beginPath();k.p.forEach(([a,b],i)=>{const X=px+a*r,Y=py+b*r*.9;if(i)c.lineTo(X,Y);else c.moveTo(X,Y);});c.closePath();c.fill();c.stroke();if(lab)tx(k.n,px,py+4,"#10223e","center",Math.max(10,mw*.018),700);c.restore();};

  const s0=(t)=>{photo(3,t,8.5,1.1,.35);const f=title(t,"KONTINENTERNA","SOM RÖR SIG","#ffcf8a");cred(3,.55*f);};

  /* 1 · Jordens pussel: foto på plattor, sedan tvärsnitt med plattor på het sten */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(1,t,8.8,1.05,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.88,s*1.7),lx=cx-w/2,top=cy-s*.06,th=Math.max(26,s*.07),mh=Math.max(60,s*.2),bw=w/3-8;
      const mg=c.createLinearGradient(0,top+th,0,top+th+mh);mg.addColorStop(0,"#ff7a3a");mg.addColorStop(1,"#a8281a");c.fillStyle=mg;c.fillRect(lx,top+th,w,mh);tx("het sten",cx,top+th+mh*.62,"#fff","center",Math.max(16,s*.04),700);
      const drift=Math.sin(t*.8)*6;["#6fa86a","#c9a24a","#a77fd0"].forEach((col,i)=>{c.fillStyle=col;c.fillRect(lx+i*(bw+12)+drift*(i-1),top,bw,th);});
      tx("plattor",cx,top-th*.55-34,"#9be3b0","center",Math.max(16,s*.04),700);
      if(t>6.3){const q=eo((t-6.3)/1);c.globalAlpha=g*q;["land","land","land"].forEach((n,i)=>{const px=lx+i*(bw+12)+bw/2+drift*(i-1);c.fillStyle="#2f7a3d";c.fillRect(px-bw*.2,top-th*.55,bw*.4,th*.55);tx(n,px,top-th*.55-8,"#cfe8d4","center",Math.max(12,s*.028),700);});}
      c.restore();}};

  /* 2 · Mycket långsamt: Island-rift, plattor isär, och en nagel */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(2,t,7.5,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.7,s*1.2),lx=cx-w/2,y=cy-s*.1,th=Math.max(26,s*.08),gap=Math.min(1,(t-3.4)/4)*w*.04;
      c.fillStyle="#a07c52";c.fillRect(lx,y,w/2-gap,th);c.fillRect(cx+gap,y,w/2-gap,th);c.fillStyle="#ff7a3a";c.fillRect(cx-gap,y,gap*2,th);
      c.strokeStyle="#ffd86b";c.fillStyle="#ffd86b";c.lineWidth=3;[[-1],[1]].forEach(([d])=>{c.beginPath();c.moveTo(cx+d*(gap+8),y-14);c.lineTo(cx+d*(gap+36),y-14);c.stroke();c.beginPath();c.moveTo(cx+d*(gap+42),y-14);c.lineTo(cx+d*(gap+30),y-20);c.lineTo(cx+d*(gap+30),y-8);c.fill();});
      tx("några centimeter om året",cx,y-Math.max(40,s*.09),"#ffd86b","center",Math.max(18,s*.048),700);
      if(t>4.4){const q=eo((t-4.4)/1);c.globalAlpha=g*q;const fx=cx,fy=y+th+Math.max(70,s*.17),fw=Math.min(a.w*.12,s*.14),fh=fw*1.6;
        c.fillStyle="#e8b894";c.beginPath();c.roundRect?c.roundRect(fx-fw/2,fy-fh*.2,fw,fh,fw*.45):c.rect(fx-fw/2,fy-fh*.2,fw,fh);c.fill();const grow=cl((t-5)/2,0,1);c.fillStyle="#f8dcc8";c.beginPath();c.roundRect?c.roundRect(fx-fw*.36,fy-fh*.05-fh*.1*grow,fw*.72,fh*.42+fh*.1*grow,fw*.25):c.rect(fx-fw*.36,fy-fh*.05-fh*.1*grow,fw*.72,fh*.42+fh*.1*grow);c.fill();
        tx("lika fort som naglar",fx,fy+fh*.95,"#fff","center",Math.max(14,s*.036),700);}
      c.restore();}};

  /* 3 · Pangea som glider isär */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();grad(a,[[0,"#0b2a52"],[1,"#07182f"]]);
    const mw=Math.min(a.w*.94,(a.h*.78)*2),mx=cx-mw/2,my=cy-mw/4-s*.03,q=eo((t-2.6)/5.4);
    K.forEach(k=>blob(k,mx,my,mw,q,1,t>7.6));
    const yr=Math.round(lerp(300,0,q));
    tx(q<.02?"Pangea":(yr>0?yr+" miljoner år sedan":"i dag"),cx,a.y+a.h*.1,"#ffd86b","center",Math.max(20,s*.055),700);
    tx("förenklad bild",a.x+a.w-14,a.y+a.h-14,"rgba(255,255,255,.5)","right",11,600);};

  /* 4 · Passar ihop: Sydamerika och Afrika glider ihop */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(4,t,8.5,1.1,.1+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const R=Math.min(a.w*.2,a.h*.3,s*.34),yy=cy-s*.04,p=eo((t-4.2)/3),off=lerp(R*1.4,R*.18,p);
      const AF=K[2],SA=K[1];[[SA,cx-R*.95-off+R*.35,"#c9a24a"],[AF,cx+R*.55,"#d98a4a"]].forEach(([k,px,col])=>{c.fillStyle=col;c.strokeStyle="rgba(0,0,0,.4)";c.lineWidth=2;c.lineJoin="round";c.beginPath();k.p.forEach(([u,v],i)=>{const X=px+u*R*(k===SA?.85:1.15),Y=yy+v*R*1.2;if(i)c.lineTo(X,Y);else c.moveTo(X,Y);});c.closePath();c.fill();c.stroke();});
      tx("Sydamerika",cx-R*1.1-off*.4,yy+R*1.55,"#e8c97a","center",Math.max(14,s*.034),700);tx("Afrika",cx+R*.55,yy+R*1.55,"#ffc79a","center",Math.max(14,s*.034),700);
      if(p>.95)tx("passar ihop som pusselbitar",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(17,s*.045),700);
      tx("förenklad bild",a.x+a.w-14,a.y+a.h-14,"rgba(255,255,255,.5)","right",11,600);
      c.restore();}};

  /* 5 · Berg växer fram: lager som veckas upp */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(5,t,7.5,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,base=cy+s*.16,p=eo((t-3.4)/3.6),cols=["#a07c52","#8b6c48","#c9a24a","#7a5e40","#b08a5a"];
      for(let l=0;l<5;l++){c.fillStyle=cols[l];c.beginPath();c.moveTo(lx,base+l*14);for(let i=0;i<=60;i++){const q=i/60,bump=Math.sin(q*Math.PI)*Math.max(0,1-Math.abs(q-.5)*1.4)*p*s*.28*(1-l*.12);c.lineTo(lx+q*w,base+l*14-bump);}c.lineTo(lx+w,base+l*14+16);c.lineTo(lx,base+l*14+16);c.closePath();c.fill();}
      c.strokeStyle="#ffd86b";c.fillStyle="#ffd86b";c.lineWidth=4;c.lineCap="round";[[-1],[1]].forEach(([d])=>{const sx=cx+d*w*.45,ex=cx+d*(w*.3-p*w*.06);c.beginPath();c.moveTo(sx,base+30);c.lineTo(ex,base+30);c.stroke();c.beginPath();c.moveTo(ex,base+30);c.lineTo(ex+d*14,base+22);c.lineTo(ex+d*14,base+38);c.fill();});
      tx("Himalaya",cx,base-p*s*.3-14,"#fff","center",Math.max(17,s*.045),700);
      c.restore();}};

  /* 6 · Jordbävningar: plattor som hakar upp sig och släpper */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(6,t,7.2,1.1,.1+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy-s*.02,bh=Math.max(40,s*.12),stress=cl((t-3.6)/2.2,0,1),release=t>5.8?1:0,shake=release?Math.exp(-(t-5.8)*3)*8:0;
      const offA=stress*w*.04*(release?0:1),sh=Math.sin(t*60)*shake;
      c.fillStyle="#a07c52";c.fillRect(lx+sh,y-bh/2-6,w,bh);c.fillStyle="#8b6c48";c.fillRect(lx-offA*0+offA+(release?w*.03:0)-sh,y+bh/2-2,w,bh);
      c.strokeStyle="#ff6b5e";c.lineWidth=3;c.setLineDash([8,6]);c.beginPath();c.moveTo(lx,y+bh/2-2);c.lineTo(lx+w,y+bh/2-2);c.stroke();c.setLineDash([]);
      c.strokeStyle="#ffd86b";c.fillStyle="#ffd86b";c.lineWidth=4;c.lineCap="round";[[y-bh/2-30,-1],[y+bh*1.5+10,1]].forEach(([yy,d])=>{c.beginPath();c.moveTo(cx-d*w*.12,yy);c.lineTo(cx+d*w*.12,yy);c.stroke();c.beginPath();c.moveTo(cx+d*w*.12+d*12,yy);c.lineTo(cx+d*w*.12,yy-7);c.lineTo(cx+d*w*.12,yy+7);c.fill();});
      tx(release?"släpper: jordbävning":"hakar upp sig …",cx,a.y+a.h*.14,release?"#ffd86b":"#cfe8ff","center",Math.max(18,s*.05),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
