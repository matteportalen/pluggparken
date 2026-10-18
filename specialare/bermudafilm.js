/* Bermudatriangeln: minilektionen som film (åtta scener, ca 1,6 minuter), bilder ur Wikimedia Commons blandade med egen grafik (canvas). Faktakoll: myten förklaras.
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/bermuda/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/bermuda-1..6.jpg. MPBermudaFilm.start(host,{overlay,onClose}). Ljudmatta: vågor. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.5,cap:[[0.5,"En gåta som visade sig vara en myt. Det här är berättelsen om Bermudatriangeln."]]},
 {k:"01 · En mystisk triangel",d:11.5,cap:[[0.8,"Bermudatriangeln är ett område i Atlanten, mellan Florida, Bermuda och Puerto Rico. Man säger att skepp och flygplan försvinner där."]]},
 {k:"02 · Hur myten började",d:17.3,cap:[[0.8,"Myten växte fram på 1950- och 60-talet, när tidningar och böcker skrev spännande berättelser om försvunna skepp och flygplan."],[10.7,"Namnet Bermudatriangeln dök upp i en tidning år 1964."]]},
 {k:"03 · Flight 19",d:12.1,cap:[[0.8,"Den mest kända historien handlar om fem flygplan som försvann år 1945."],[7.2,"Piloterna blev vilsna i dåligt väder och fick slut på bränsle."]]},
 {k:"04 · Vad säger forskarna?",d:13.7,cap:[[0.8,"Forskare har tittat på siffrorna. Det försvinner inte fler skepp där än på andra platser med lika mycket trafik."],[7.6,"Sjöförsäkringsbolaget Lloyd's tar inte ens extra betalt för resor genom området."]]},
 {k:"05 · Farligt väder",d:11.3,cap:[[0.8,"Området har kraftiga stormar och starka strömmar. Golfströmmen är en av världens starkaste havsströmmar, och sprider vrakdelar snabbt."]]},
 {k:"06 · Varför lever myten?",d:6.4,cap:[[0.8,"Spännande historier sprids lätt, och en gåta är roligare än ett vanligt svar."]]},
 {k:"07 · Fråga hur man vet",d:10.2,cap:[[0.8,"Bra att tänka på: fråga alltid hur man vet något."],[5.1,"Titta på vilka källor som finns, och om flera oberoende håller med."]]}
];
const META={mat:"vagor",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Bermudatriangeln",under:"En film i åtta steg · ca 1,6 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Bästa sättet att lösa en gåta är att undersöka den. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"US Navy (U.S. National Archives) · Public domain · Wikimedia Commons",2:"Niels Johannes · CC BY-SA 4.0 · Wikimedia Commons",3:"Acroterion · CC BY-SA 4.0 · Wikimedia Commons",4:"PH1 Doolittle, USN · Public domain · Wikimedia Commons",5:"GOES imagery: CSU/CIRA & NOAA · Public domain · Wikimedia Commons",6:"NOAA · Public domain · Wikimedia Commons"};

window.MPBermudaFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"bermuda",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"bermuda-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,deep,sea,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const plane=(px,py,u,col)=>{const c=x();c.save();c.fillStyle=col||"#cfd5df";c.beginPath();c.moveTo(px+u*1.6,py);c.lineTo(px-u*1.2,py-u*.35);c.lineTo(px-u*1.4,py);c.lineTo(px-u*1.2,py+u*.35);c.closePath();c.fill();c.beginPath();c.moveTo(px+u*.2,py);c.lineTo(px-u*.7,py-u*1.6);c.lineTo(px-u*.2,py-u*1.6);c.lineTo(px+u*.7,py);c.lineTo(px-u*.2,py+u*1.6);c.lineTo(px-u*.7,py+u*1.6);c.closePath();c.fill();c.restore();};
  const SEAS=["rgba(16,70,110,.8)","rgba(10,50,90,.85)","rgba(6,34,66,.9)"];

  const s0=(t)=>{photo(1,t,6.5,1.12,.3);const f=title(t,"BERMUDATRIANGELN","EN GÅTA SOM VISADE SIG VARA EN MYT","#9fe0e0");cred(1,.55*f);};

  /* 1 · triangeln mellan Florida, Bermuda och Puerto Rico */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,11.5,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t,1);const w=Math.min(a.w*.7,s*1.3),h=w*.62,lx=cx-w/2,y0=cy-h/2-s*.02,mx=lon=>lx+(lon+84)/(60-84+0.0001)*0+( (lon+84)/22)*w,my=lat=>y0+(35-lat)/20*h;
      const P=[[mx(-80.2),my(25.8),"Florida"],[mx(-64.8),my(32.3),"Bermuda"],[mx(-66.1),my(18.5),"Puerto Rico"]];
      c.fillStyle="#3d6b3a";c.beginPath();c.ellipse(mx(-82),my(28),w*.06,h*.3,0,0,TAU);c.fill();
      const k=eo((t-3.4)/2.4);c.fillStyle="rgba(255,80,60,.2)";c.strokeStyle="#ff6a5e";c.lineWidth=4;c.setLineDash([10,8]);c.beginPath();c.moveTo(P[0][0],P[0][1]);for(let i=1;i<=3;i++){const a1=P[i%3],a0=P[i-1];c.lineTo(lerp(a0[0],a1[0],i<3?1:1)*1,lerp(a0[1],a1[1],1));}c.closePath();c.globalAlpha=g*k;c.fill();c.stroke();c.setLineDash([]);c.globalAlpha=g;
      P.forEach(([px,py,n])=>{dot(px,py,8,"#ffd86b");tx(n,px,py-Math.max(16,s*.04),"#ffd86b","center",Math.max(15,s*.04),700);});
      c.restore();}};

  /* 2 · hur myten började: tidslinje 1950–1964 */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,17.3,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy,px=yr=>lx+(yr-1945)/(1970-1945)*w;
      c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=3;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();
      [[1950,"1950"],[1960,"1960"],[1970,"1970"]].forEach(([yr,l])=>{c.beginPath();c.moveTo(px(yr),y-8);c.lineTo(px(yr),y+8);c.stroke();tx(l,px(yr),y+Math.max(30,s*.07),"rgba(255,255,255,.8)","center",Math.max(13,s*.034),600);});
      const k=eo((t-3.4)/4);c.fillStyle="#ffd86b";c.fillRect(px(1950),y-6,(px(1969)-px(1950))*k,12);tx("berättelser i tidningar och böcker",(px(1950)+px(1969))/2,y-Math.max(28,s*.065),"#ffd86b","center",Math.max(15,s*.04),700);
      if(t>10.7){const q=eo((t-10.7)/1);c.globalAlpha=g*q;dot(px(1964),y,10,"#ff9a8a");tx("1964: namnet",px(1964),y+Math.max(66,s*.15),"#ffb0a0","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 3 · Flight 19: fem plan, bränslet tar slut */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(3,t,12.1,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[.7,"#2a3a58"],[.701,"#0e2540"],[1,"#061423"]]);const u=Math.max(10,Math.min(a.w*.02,s*.03));
      const k=eo((t-3)/4),bx=lerp(cx+a.w*.3,cx-a.w*.05,k),by=cy-s*.1;[[0,0],[-2.6,-1.6],[-2.6,1.6],[-5.2,-3.2],[-5.2,3.2]].forEach(([dx,dy],i)=>plane(bx+dx*u*-1,by+dy*u,u,"#cfd5df"));
      tx("5 plan · 1945",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(20,s*.055),700);
      if(t>7.2){const q=eo((t-7.2)/1),tw=Math.min(a.w*.35,s*.6),tl=cx-tw/2,ty=cy+s*.2;c.globalAlpha=g*q;c.fillStyle="rgba(255,255,255,.12)";c.fillRect(tl,ty,tw,24);const f=1-eo((t-7.6)/3.4);c.fillStyle=f>.25?"#9be3b0":"#ff6a5e";c.fillRect(tl,ty,tw*f,24);tx("bränsle",tl,ty-12,"#cfd8ff","left",Math.max(13,s*.034),700);tx("vilsna i dåligt väder",cx,ty+Math.max(56,s*.12),"#ffb0a0","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 4 · lika många förluster per trafik */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,13.7,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);const bw=Math.min(a.w*.18,s*.3),H=a.h*.4,y0=cy+H*.5;
      const k=eo((t-3)/2);[[-1,"Bermudatriangeln","#ff9a8a"],[1,"andra liknande områden","#9fd0ff"]].forEach(([sd,n,col],i)=>{const px=cx+sd*bw*.9;const q=eo((t-3-i*.6)/1.2);c.fillStyle=col;c.fillRect(px-bw/2,y0-H*.6*q,bw,H*.6*q);tx(n,px,y0+Math.max(30,s*.07),col,"center",Math.max(14,s*.037),700);});
      if(t>5.6){c.globalAlpha=g*eo((t-5.6)/1);tx("lika många per fartyg",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(20,s*.055),700);}
      if(t>7.6){c.globalAlpha=g*eo((t-7.6)/1);tx("försäkringsbolaget: inget extra pris",cx,a.y+a.h*.9,"#9be3b0","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 5 · väder och Golfströmmen */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,11.3,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t,1);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2;
      c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=5;c.lineCap="round";c.beginPath();c.moveTo(lx+w*.1,cy+s*.12);c.quadraticCurveTo(lx+w*.45,cy+s*.02,lx+w*.9,cy-s*.12);c.stroke();
      const k=(t*.3)%1;for(let i=0;i<6;i++){const p=((k+i/6)%1),X=lerp(lx+w*.1,lx+w*.9,p),Y=lerp(cy+s*.12,cy-s*.12,p)+Math.sin(p*3.14)*(-s*.08)+0;dot(X,Y,5,"#ffd86b");}
      tx("Golfströmmen",lx+w*.5,cy+s*.2,"#ffd86b","center",Math.max(18,s*.048),700);
      const sx=lx+w*.75,sy=cy-s*.2;c.strokeStyle="rgba(200,215,255,.8)";c.lineWidth=4;for(let i=0;i<4;i++){c.beginPath();c.arc(sx,sy,s*.02+i*s*.02,t*2+i,t*2+i+4);c.stroke();}tx("stormar",sx,sy+s*.12,"#cfd8ff","center",Math.max(14,s*.037),700);
      c.restore();}};

  /* 6 · historier sprids: pratbubblor som växer i antal */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(6,t,6.4,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const u=Math.max(16,Math.min(a.w*.03,s*.04));
      const r=L.srand(3);const n=Math.floor(14*eo((t-2.8)/2.8));for(let i=0;i<n;i++){const px=cx+(r()-.5)*a.w*.7,py=cy+(r()-.5)*a.h*.5,sz=u*(.7+r()*.7);c.fillStyle=`rgba(255,255,255,${.5+r()*.4})`;c.beginPath();c.roundRect?c.roundRect(px-sz*1.4,py-sz*.8,sz*2.8,sz*1.6,sz*.6):c.rect(px-sz*1.4,py-sz*.8,sz*2.8,sz*1.6);c.fill();tx("?!",px,py+sz*.3,"#1d2b53","center",sz*1.1,700);}
      tx("spännande historier sprids",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(19,s*.052),700);
      c.restore();}};

  /* 7 · fråga hur man vet: förstoringsglas och kontrollrutor */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,10.2,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const u=Math.max(18,Math.min(a.w*.035,s*.045));
      const mx=cx-a.w*.18,my=cy;c.strokeStyle="#ffd86b";c.lineWidth=u*.5;c.beginPath();c.arc(mx,my,u*3,0,TAU);c.stroke();c.beginPath();c.moveTo(mx+u*2.2,my+u*2.2);c.lineTo(mx+u*4.4,my+u*4.4);c.stroke();tx("?",mx,my+u*1.2,"#ffd86b","center",u*3.4,700);
      tx("hur vet man det?",cx,a.y+a.h*.1,"#fff","center",Math.max(22,s*.06),700);
      if(t>5.1){[["källor?",5.3],["flera oberoende?",6.4],["bevis?",7.5]].forEach(([n,st],i)=>{const q=eo((t-st)/.7);if(q<=0)return;const bx=cx+a.w*.08,by=cy-u*2+i*u*2.2;c.globalAlpha=g*q;c.strokeStyle="#9be3b0";c.lineWidth=4;c.strokeRect(bx,by-u*.7,u*1.4,u*1.4);c.beginPath();c.moveTo(bx+u*.2,by);c.lineTo(bx+u*.6,by+u*.4);c.lineTo(bx+u*1.2,by-u*.6);c.stroke();tx(n,bx+u*2,by+u*.35,"#fff","left",Math.max(16,u*.8),700);});}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
