/* Svampar: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/svampar/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/svampar-1..6.jpg. MPSvampFilm.start(host,{overlay,onClose}). Ljudmatta: trädgården (vind och fåglar). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.9,cap:[[0.5,"De växer i skogen, men de är varken växter eller djur. Det här är berättelsen om svamparna."]]},
 {k:"01 · Ett eget rike",d:7.8,cap:[[0.8,"Svampar är ett eget rike. De är inte växter, de är faktiskt närmare släkt med djur."]]},
 {k:"02 · Mest under jord",d:10.6,cap:[[0.8,"Det du ser, svampen med hatt, är bara fruktkroppen."],[4.8,"Den största delen är ett nät av tunna trådar, mycel, under marken."]]},
 {k:"03 · Den största",d:12.7,cap:[[0.8,"I Oregon i USA växer en honungsskivling som täcker ungefär 9 kvadratkilometer, mer än tusen fotbollsplaner."],[9.6,"Den är flera tusen år gammal."]]},
 {k:"04 · Skogens nätverk",d:8.6,cap:[[0.8,"Mycelet kopplar ihop träd. Forskare tror att träden delar socker och varnar varandra genom svamparna."]]},
 {k:"05 · Städare",d:9.7,cap:[[0.8,"Många svampar bryter ner döda träd och löv till jord. Utan dem skulle skogen vara full av gamla grenar."]]},
 {k:"06 · Mat och medicin",d:13.7,cap:[[0.8,"Penicillinet kommer från en mögelsvamp. Jäst är också en svamp, och vi äter champinjoner och kantareller."],[8.3,"Men plocka aldrig svamp du inte är helt säker på, för vissa är giftiga."]]}
];
const META={mat:"tradgarden",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Svampar",under:"En film i sju steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Under skogens golv finns en dold värld. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Olympic National Park · Public domain · Wikimedia Commons",2:"Foto: Olympic National Park · Public domain · Wikimedia Commons",3:"Foto: Henk Monster (honungsskivling) · CC BY 3.0 · Wikimedia Commons",4:"Foto: Henk Monster (två arter av honungsskivling) · CC BY 3.0 · Wikimedia Commons",5:"Foto: RhinoMind (murken stock) · CC BY-SA 3.0 · Wikimedia Commons",6:"Foto: Owain Davies (kantareller) · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPSvampFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"svampar",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"svampar-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,title}=L;
  const soil=(a,gy)=>{grad({x:a.x,y:gy,w:a.w,h:a.y+a.h-gy},[[0,"#5a3a22"],[1,"#2a1a0e"]]);};
  const shroom=(px,gy,r,col,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.fillStyle="#efe6d2";c.fillRect(px-r*.18,gy-r*1.1,r*.36,r*1.1);c.fillStyle=col||"#c9542a";c.beginPath();c.arc(px,gy-r*1.1,r,Math.PI,TAU);c.closePath();c.fill();c.fillStyle="rgba(255,255,255,.75)";[[-.4,-.3],[.2,-.5],[.5,-.2]].forEach(([dx,dy])=>{c.beginPath();c.arc(px+dx*r,gy-r*1.1+dy*r,r*.12,0,TAU);c.fill();});c.restore();};
  /* grenande trådar (mycel) som växer nedåt/utåt från en punkt */
  const myc=(px,py,len,t,k,seed,col)=>{const c=x(),r=L.srand(seed||5);c.save();c.strokeStyle=col||"rgba(240,236,220,.8)";c.lineWidth=2;c.lineCap="round";
    const branch=(bx,by,ang,l,d)=>{if(d>3||l<8)return;const n=Math.max(2,Math.floor(l/10)),m=Math.max(1,Math.floor(n*cl(k*(1.4-d*.25),0,1)));let X=bx,Y=by;c.beginPath();c.moveTo(X,Y);for(let i=1;i<=m;i++){ang+=(r()-.5)*.5;X+=Math.cos(ang)*l/n;Y+=Math.sin(ang)*l/n;c.lineTo(X,Y);}c.stroke();if(m>=n*.6){branch(X,Y,ang-.7,l*.62,d+1);branch(X,Y,ang+.7,l*.62,d+1);}};
    for(let i=0;i<5;i++)branch(px,py,Math.PI/2+(i-2)*.55,len,0);c.restore();};

  const s0=(t)=>{photo(2,t,7.9,1.12,.3);const f=title(t,"SVAMPAR","VARKEN VÄXT ELLER DJUR","#ffcf8a");cred(2,.55*f);};

  /* 1 · Ett eget rike: släktträd där svampar och djur hör ihop */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(1,t,7.8,1.1,.15+.4*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.8,s*1.4),lx=cx-w/2,top=a.y+a.h*.22,h=a.h*.5,rx=lx+w*.08,ry=top+h/2;
      c.strokeStyle="rgba(255,255,255,.55)";c.lineWidth=4;c.lineCap="round";
      const k=eo((t-2.8)/1.6);c.beginPath();c.moveTo(rx,ry);c.lineTo(lerp(rx,lx+w*.4,k),ry);c.stroke();
      const jx=lx+w*.4;[[top+h*.12,"växter","#6fd38a"],[top+h*.62,null,null]].forEach(([y,n,col],i)=>{c.beginPath();c.moveTo(jx,ry);c.lineTo(jx,lerp(ry,y,k));c.lineTo(lerp(jx,i?lx+w*.62:lx+w*.78,k),lerp(ry,y,k));c.stroke();if(n&&k>.95)tx(n,lx+w*.78+10,y+6,col,"left",Math.max(17,s*.045),700);});
      if(t>4.4){const q=eo((t-4.4)/1.2),jx2=lx+w*.62,y2=top+h*.62;c.save();c.globalAlpha=g*q;c.beginPath();c.moveTo(jx2,y2);c.lineTo(jx2,y2-h*.14);c.lineTo(lx+w*.78,y2-h*.14);c.moveTo(jx2,y2);c.lineTo(jx2,y2+h*.14);c.lineTo(lx+w*.78,y2+h*.14);c.stroke();tx("djur",lx+w*.78+10,y2-h*.14+6,"#ffb0a0","left",Math.max(17,s*.045),700);tx("svampar",lx+w*.78+10,y2+h*.14+6,"#ffd86b","left",Math.max(17,s*.045),700);c.restore();}
      tx("ett eget rike",cx,a.y+a.h*.1,"#fff","center",Math.max(19,s*.052),700);
      c.restore();}};

  /* 2 · Mest under jord: fruktkroppen och mycelet */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,10.6,1.1,.15+.4*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfe4f2"],[1,"#eef6fb"]]);const gy=a.y+a.h*.46;soil(a,gy);
      const r=Math.max(18,s*.06);[-.3,0,.28].forEach((d,i)=>shroom(cx+d*a.w*.4,gy,r*(1-i*.12),["#c9542a","#d98a3a","#b9422a"][i]));
      tx("fruktkropp",cx+a.w*.28,gy-r*2.2,"#3a2410","center",Math.max(15,s*.038),700);
      if(t>4.8){const k=eo((t-4.8)/3.6);myc(cx,gy+4,a.h*.4,t,k,5);myc(cx-a.w*.12,gy+4,a.h*.34,t,k,9);myc(cx+a.w*.12,gy+4,a.h*.36,t,k,13);const q=eo((t-6)/1);c.globalAlpha=g*q;tx("mycel",cx,a.y+a.h*.92,"#ffe6a8","center",Math.max(18,s*.05),700);}
      c.restore();}};

  /* 3 · Den största: ett stort mycel mot fotbollsplaner */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(3,t,12.7,1.1,.15+.4*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const R=Math.min(a.w*.3,a.h*.34),py=cy-s*.02,k=eo((t-3.6)/3);
      c.fillStyle="rgba(120,200,120,.18)";c.strokeStyle="#7fe08a";c.lineWidth=3;c.beginPath();for(let i=0;i<=40;i++){const an=i/40*TAU,rr=R*(.85+.12*Math.sin(an*3)+.06*Math.sin(an*7))*k;const px=cx+Math.cos(an)*rr*1.2,pY=py+Math.sin(an)*rr;if(i===0)c.moveTo(px,pY);else c.lineTo(px,pY);}c.closePath();c.fill();c.stroke();
      const pw=Math.max(7,R*.1),ph=pw*.65,n=Math.floor(160*cl((t-4.6)/4,0,1)),r=L.srand(3);for(let i=0;i<n;i++){const an=r()*TAU,rr=Math.sqrt(r())*R*.78*k;c.fillStyle="rgba(255,255,255,.75)";c.fillRect(cx+Math.cos(an)*rr*1.2-pw/2,py+Math.sin(an)*rr-ph/2,pw,ph);}
      tx("9 km²",cx,py+4,"#fff","center",Math.max(24,s*.07),700);
      if(t>5)tx("över 1 000 fotbollsplaner",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(17,s*.045),700);
      if(t>9.6){const q=eo((t-9.6)/1);c.globalAlpha=g*q;tx("flera tusen år gammal",cx,a.y+a.h*.92,"#fff","center",Math.max(18,s*.05),700);}
      c.restore();}};

  /* 4 · Skogens nätverk: träd förbundna under marken */
  const tree=(px,gy,h)=>{const c=x();c.save();c.fillStyle="#5a3a1e";c.fillRect(px-h*.05,gy-h*.5,h*.1,h*.5);c.fillStyle="#2f7a3d";[[0,-.68,.28],[-.16,-.52,.22],[.16,-.52,.22]].forEach(([dx,dy,r])=>{c.beginPath();c.arc(px+dx*h,gy+dy*h,r*h,0,TAU);c.fill();});c.restore();};
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(4,t,8.6,1.1,.15+.4*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfe4f2"],[1,"#eef6fb"]]);const gy=a.y+a.h*.5;soil(a,gy);
      const xs=[cx-a.w*.28,cx,cx+a.w*.28],h=Math.min(a.h*.42,s*.55);xs.forEach(px=>tree(px,gy,h));
      const k=eo((t-3.2)/2);c.strokeStyle="rgba(240,236,220,.85)";c.lineWidth=2.5;
      [[0,1,.12],[1,2,.12],[0,2,.24]].forEach(([i,j,d])=>{const x1=xs[i],x2=xs[j],dy=a.h*d;c.beginPath();c.moveTo(x1,gy+6);for(let u=1;u<=24;u++){const p=u/24*k;c.lineTo(lerp(x1,x2,p),gy+6+Math.sin(p*Math.PI)*dy);}c.stroke();});
      if(t>5){[[0,1],[1,2]].forEach(([i,j],n)=>{const p=((t*.4+n*.5)%1),x1=xs[i],x2=xs[j],my=gy+a.h*.12,bx=lerp(x1,x2,p),by=gy+6+Math.sin(p*Math.PI)*(my-gy);c.fillStyle="#ffe27a";c.beginPath();c.arc(bx,by,6,0,TAU);c.fill();});tx("socker och varningar",cx,a.y+a.h*.1,"#1d2b53","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 5 · Städare: en stock som blir jord */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,9.7,1.1,.15+.4*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#cfe4f2"],[1,"#eef6fb"]]);const gy=a.y+a.h*.7;c.fillStyle="#6a4a2a";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
      const k=eo((t-3.4)/5),w=Math.min(a.w*.6,s*1.1),h=Math.max(36,s*.11)*(1-k*.65),lx=cx-w/2;
      c.fillStyle="#7a5230";c.beginPath();c.roundRect?c.roundRect(lx,gy-h,w,h,h*.4):c.rect(lx,gy-h,w,h);c.fill();c.strokeStyle="#4a2e14";c.lineWidth=2;for(let i=0;i<8;i++){c.beginPath();c.moveTo(lx+w*(.08+i*.12),gy-h*.8);c.lineTo(lx+w*(.12+i*.12),gy-h*.2);c.stroke();}
      const r=L.srand(11),n=Math.floor(8*cl((t-3.6)/3,0,1));for(let i=0;i<n;i++)shroom(lx+w*(.1+r()*.8),gy-h,Math.max(8,s*.026),["#e8a85a","#c9542a"][i%2]);
      c.fillStyle=`rgba(90,58,34,${.2+k*.7})`;c.fillRect(a.x,gy-6,a.w,6+k*14);
      tx("döda träd och löv blir jord",cx,a.y+a.h*.12,"#3a2410","center",Math.max(17,s*.045),700);
      c.restore();}};

  /* 6 · Mat och medicin, och varningen */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(6,t,13.7,1.1,.15+.4*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const w=Math.min(a.w*.8,s*1.3),h=Math.max(52,s*.12),y0=a.y+a.h*.14,items=[["penicillin","medicin","#9be3b0",3.5],["jäst","i brödet","#ffd86b",4.5],["champinjoner, kantareller","mat","#ffb090",5.5]];
      items.forEach(([n,sub,col,st],i)=>{const q=eo((t-st)/.8);if(q<=0)return;const y=y0+i*h*1.2;c.save();c.globalAlpha=g*q;c.fillStyle="rgba(255,255,255,.07)";c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.roundRect?c.roundRect(cx-w/2,y,w,h,14):c.rect(cx-w/2,y,w,h);c.fill();c.stroke();tx(n,cx-w/2+18,y+h*.64,col,"left",Math.max(17,h*.36),700);tx(sub,cx+w/2-18,y+h*.62,"#fff","right",Math.max(14,h*.3),600);c.restore();});
      if(t>8.3){const q=eo((t-8.3)/1),ty=y0+3*h*1.2+Math.max(30,s*.07),tr=Math.max(26,s*.07);c.globalAlpha=g*q;c.fillStyle="#ffd23c";c.strokeStyle="#7a3a00";c.lineWidth=4;c.beginPath();c.moveTo(cx,ty-tr);c.lineTo(cx+tr*1.1,ty+tr*.8);c.lineTo(cx-tr*1.1,ty+tr*.8);c.closePath();c.fill();c.stroke();tx("!",cx,ty+tr*.5,"#7a3a00","center",Math.max(30,tr),700);tx("plocka aldrig svamp du inte är säker på",cx,ty+tr*.8+Math.max(30,s*.07),"#fff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
