/* Kontinenterna rör sig: minilektionen som film (sju scener), foton ur Wikimedia Commons med motion graphics: riktiga kontinenter ur jordens satellitbild (Solar System Scope) som glider ihop till Pangea och isär igen, strömmar i manteln, veckade bergslager och en jordbävning.
   Kontinenternas lägen i Pangea är förenklade (inte exakta). Använder filmmotorn i ../svarthal.js, filmlib.js och filmfx.js.
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
const KR={1:"Karta över jordens plattor · Public domain · Wikimedia Commons",2:"Foto: Rjglewis (Islands rift) · Public domain · Wikimedia Commons",3:"Karta: Fama Clamosa (Pangea för 200 miljoner år sedan) · CC BY-SA 4.0 · Wikimedia Commons",4:"Figur ur Alfred Wegener, The origin of continents and oceans (1924) · Public domain",5:"Foto: NASA (Himalaya) · Public domain · Wikimedia Commons",6:"Foto: Mike McBey (San Andreas-förkastningen) · CC BY 2.0 · Wikimedia Commons",7:"Kontinenter ur jordens satellitbild: Solar System Scope · CC BY 4.0 (lägena i Pangea är förenklade)"};

window.MPKontFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"kontinenter",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"kontinenter-",names:[1,2,3,4,5,6],KR});
  const F=MPFilmFX.make(E,L);
  const {x,tx,S,cred}=L,{sm,serif,kb,vign,dim,glow,clip,stars,trace,curve,chip,bigNum,fmt,sphere,ring,ping,rgba}=F;
  const rnd=i=>{const v=Math.sin(i*127.1+311.7)*43758.5453;return v-Math.floor(v);};

  /* ---- riktiga kontinenter: jordens dagkarta (2:1) görs om till en "landkarta" där havet är genomskinligt; varje kontinent klipps ut ----- */
  const TEX=new Image();TEX.src=ROOT+"../ovriga/solsystemet/bilder/2k_earth_daymap.jpg";let LAND=null;
  let ANT=null;
  const land=()=>{if(LAND)return LAND;if(!TEX.complete||!TEX.naturalWidth)return null;const cv=document.createElement("canvas");cv.width=1024;cv.height=512;const g=cv.getContext("2d");g.drawImage(TEX,0,0,1024,512);const id=g.getImageData(0,0,1024,512),d=id.data;
    // havet blir genomskinligt; inlandsis och havsis norr om 66° (utom Grönland) och söder om 60° tas bort (Antarktis görs som en egen skiva)
    for(let p=0;p<512*1024;p++){const i=p*4,X=p%1024,Y=(p/1024)|0,lon=X/1024*360-180,lat=90-Y/512*180,r=d[i],gg=d[i+1],b=d[i+2];let kill=b>r+22&&b>=gg-6;
      if(!kill&&lat>66&&!(lon>-75&&lon<-10&&lat<84)&&r>190&&gg>190&&b>190)kill=true;if(!kill&&lat<-58)kill=true;if(!kill&&lat>83)kill=true;if(kill)d[i+3]=0;}
    // Antarktis: skiva sedd rakt ovanifrån (söderifrån)
    const N=256,ac=document.createElement("canvas");ac.width=N;ac.height=N;const ag=ac.getContext("2d"),ai=ag.createImageData(N,N),od=ai.data,src=g.getImageData?null:null;
    const full=document.createElement("canvas");full.width=1024;full.height=512;const fg=full.getContext("2d");fg.drawImage(TEX,0,0,1024,512);const fd=fg.getImageData(0,0,1024,512).data;
    for(let yy=0;yy<N;yy++)for(let xx=0;xx<N;xx++){const nx=(xx-N/2+.5)/(N/2),ny=(yy-N/2+.5)/(N/2),dd=Math.hypot(nx,ny);if(dd>1)continue;const lat=-90+dd*29,lon=Math.atan2(nx,-ny)*180/Math.PI,X=Math.min(1023,Math.max(0,Math.round((lon+180)/360*1023))),Y=Math.min(511,Math.max(0,Math.round((90-lat)/180*511))),si=(Y*1024+X)*4,r=fd[si],gg=fd[si+1],b=fd[si+2],o=(yy*N+xx)*4;if(b>r+22&&b>=gg-6)continue;od[o]=r;od[o+1]=gg;od[o+2]=b;od[o+3]=dd>.96?Math.round(255*(1-dd)/.04):255;}
    ag.putImageData(ai,0,0);ANT=ac;g.putImageData(id,0,0);LAND=cv;return cv;};
  const px=(lon,lat)=>[(lon+180)/360*1024,(90-lat)/180*512];
  const poly=P=>P.map(([lo,la])=>px(lo,la));
  const RECT=(lo0,la0,lo1,la1)=>poly([[lo0,la1],[lo1,la1],[lo1,la0],[lo0,la0]]);
  /* region = lista av polygoner (evenodd), mitt, och förflyttning till Pangea (dx,dy i delar av kartan, rot i grader) */
  const AFR=[[-20,38],[36,38],[36,31],[44,14],[53,12],[53,-37],[-20,-37]];
  const IND=[[66,25],[89,25],[89,19],[80,6],[72,6],[66,15]];
  const PIECES=[
   {n:"Nordamerika",R:[RECT(-170,8,-12,83)],c:[-100,45],D:[.111,.094,-52],col:"#6fa86a"},
   {n:"Sydamerika",R:[RECT(-85,-58,-33,9)],c:[-60,-15],D:[.155,.027,-46],col:"#c9a24a"},
   {n:"Afrika",R:[poly(AFR),RECT(42,-27,52,-11)],c:[20,2],D:[.0,-.01,0],col:"#d98a4a"},
   {n:"Eurasien",R:[RECT(-12,8,190,82),poly(AFR),poly(IND)],eo:true,extra:[RECT(95,-11,141,8)],c:[70,50],D:[0,0,0],col:"#a77fd0"},
   {n:"Indien",R:[poly(IND)],c:[78,18],D:[-.05,.25,-30],col:"#e0679a"},
   {n:"Australien",R:[RECT(112,-48,180,-10)],c:[140,-28],D:[-.15,.19,30],col:"#e8c14a"},
   {n:"Antarktis",ant:true,c:[0,-80],D:[.08,-.04,0],col:"#dfe9f5"}];
  /* tid q: 0 = Pangea, 1 = i dag. Ritar alla kontinenter i kartan (mx,my,mw: bredd) med glödande kant */
  const BAKE={};
  const bake=P=>{if(BAKE[P.n])return BAKE[P.n];const LA=land();if(!LA)return null;let polys=P.eo?[P.R[0]].concat(P.extra||[]):P.R.concat(P.extra||[]);let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;polys.forEach(pl=>pl.forEach(([X,Y])=>{x0=Math.min(x0,X);x1=Math.max(x1,X);y0=Math.min(y0,Y);y1=Math.max(y1,Y);}));const pad=26,w=Math.ceil(x1-x0+pad*2),h=Math.ceil(y1-y0+pad*2);
    const A=document.createElement("canvas");A.width=w;A.height=h;const ag=A.getContext("2d");ag.translate(-x0+pad,-y0+pad);const path=new Path2D();const add=pl=>{pl.forEach(([X,Y],i)=>{if(i)path.lineTo(X,Y);else path.moveTo(X,Y);});path.closePath();};polys.forEach(add);if(P.eo)P.R.slice(1).forEach(add);ag.clip(path,"evenodd");ag.drawImage(LA,0,0);
    const B=document.createElement("canvas");B.width=w;B.height=h;const bg=B.getContext("2d");bg.shadowColor="rgba(255,220,150,.85)";bg.shadowBlur=12;bg.drawImage(A,0,0);bg.shadowBlur=0;bg.drawImage(A,0,0);return BAKE[P.n]={cv:B,ox:x0-pad,oy:y0-pad};};
  const bakeAnt=()=>{if(BAKE.ant)return BAKE.ant;if(!ANT)return null;const pad=18,N=ANT.width,B=document.createElement("canvas");B.width=B.height=N+pad*2;const g=B.getContext("2d");g.shadowColor="rgba(255,220,150,.85)";g.shadowBlur=12;g.drawImage(ANT,pad,pad);g.shadowBlur=0;g.drawImage(ANT,pad,pad);return BAKE.ant={cv:B,pad};};
  const continents=(mx,my,mw,q,al,gl)=>{const c=x(),LA=land();if(!LA)return;const k=mw/1024;c.save();c.globalAlpha=al==null?1:al;
    PIECES.forEach(P=>{if(P.ant){const e=1-q,ax=mx+mw*(.5+P.D[0]*e),ay=my+mw/2*(.9+P.D[1]*e),ar=mw*.085,bk=bakeAnt();if(bk){const sc=ar*2/ANT.width;c.drawImage(bk.cv,ax-ar-bk.pad*sc,ay-ar-bk.pad*sc,bk.cv.width*sc,bk.cv.height*sc);}return;}
      const bk=bake(P);if(!bk)return;const [cx0,cy0]=px(P.c[0],P.c[1]),e=1-q,dx=P.D[0]*e*1024*k,dy=P.D[1]*e*512*k,rot=P.D[2]*e*Math.PI/180;
      c.save();c.translate(mx+cx0*k+dx,my+cy0*k+dy);c.rotate(rot);c.translate(-cx0*k,-cy0*k);c.scale(k,k);c.drawImage(bk.cv,bk.ox,bk.oy);c.restore();});
    c.restore();};
  /* mjukt rutnät av longituder och latituder bakom kartan */
  const grid=(mx,my,mw,al)=>{const c=x();c.save();c.strokeStyle=`rgba(120,170,255,${.14*al})`;c.lineWidth=1;for(let i=0;i<=12;i++){c.beginPath();c.moveTo(mx+mw*i/12,my);c.lineTo(mx+mw*i/12,my+mw/2);c.stroke();}for(let j=0;j<=6;j++){c.beginPath();c.moveTo(mx,my+mw/2*j/6);c.lineTo(mx+mw,my+mw/2*j/6);c.stroke();}c.restore();};
  const mapRect=a=>{const mw=Math.min(a.w*.94,a.h*1.9),mh=mw/2;return{mx:a.x+a.w/2-mw/2,my:a.y+a.h*.48-mh/2,mw,mh};};

  /* 0 · Inledning: jorden som klot, plattgränserna lyser upp, titel */
  const s0=(t)=>{const{s,cx,cy,a,port}=S(),c=x();stars(a,1,t,130);const R=Math.min(a.h*.32,a.w*.24),py=cy-s*.04;sphere("jorden",cx,py,R,t*10,true);
    // plattgränserna som en lysande ring runt klotet (förenklad) som pulserar
    c.save();c.globalCompositeOperation="lighter";const q=sm((t-1)/2);c.strokeStyle=`rgba(255,160,90,${.7*q})`;c.lineWidth=2.5;c.shadowColor="#ff8a4a";c.shadowBlur=14;c.beginPath();for(let u=0;u<=80;u++){const an=u/80*TAU,rr=R*(1.015+.012*Math.sin(an*5+t*2));u?c.lineTo(cx+Math.cos(an)*rr,py+Math.sin(an)*rr):c.moveTo(cx+Math.cos(an)*rr,py+Math.sin(an)*rr);}c.stroke();c.restore();
    F.titleSweep(t,a,"KONTINENTERNA","SOM RÖR SIG","#ffcf8a",a.y+a.h*.88);cred(7,.3);};

  /* 1 · Jordens pussel: plattkartan, sedan tvärsnittet med strömmar i manteln som bär plattorna */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    if(t<3.6){const p=cl(t/3.6,0,1);kb(1,a,{fit:true,z:lerp(.98,1.06,p),fx:.5,fy:.5},1);vign(a,.6);cred(1,.45);}
    else{const g=sm((t-3.2)/.9);stars(a,1,t,60);dim(a,0);c.save();c.globalAlpha=g;const w=Math.min(a.w*.88,s*1.7),lx=cx-w/2,top=cy-s*.04,th=Math.max(28,s*.08),mh=Math.max(90,s*.3),bw=w/3-10;
      const mg=c.createLinearGradient(0,top+th,0,top+th+mh);mg.addColorStop(0,"#ff8a3a");mg.addColorStop(1,"#8a1f14");c.fillStyle=mg;c.fillRect(lx,top+th,w,mh);
      // strömmar: rörliga streck som går runt
      c.save();c.beginPath();c.rect(lx,top+th,w,mh);c.clip();c.globalCompositeOperation="lighter";for(let cell=0;cell<2;cell++){const ccx=lx+w*(.25+cell*.5),dir=cell?-1:1;for(let i=0;i<22;i++){const ph=((t*.22*dir+i/22)%1+1)%1,an=ph*TAU,X=ccx+Math.cos(an)*w*.19,Y=top+th+mh*.5+Math.sin(an)*mh*.36;glow(X,Y,s*.02,"rgba(255,225,150,.75)");}}c.restore();
      tx("HET STEN (MANTELN) · STRÖMMAR BÄR PLATTORNA",cx,top+th+mh+Math.max(24,s*.055),"rgba(255,184,120,.95)","center",Math.max(10,s*.024),700);
      const drift=Math.sin(t*.8)*8;["#6fa86a","#c9a24a","#a77fd0"].forEach((col,i)=>{const X=lx+i*(bw+15)+drift*(i-1);const gg=c.createLinearGradient(0,top,0,top+th);gg.addColorStop(0,col);gg.addColorStop(1,"rgba(0,0,0,.35)");c.fillStyle=col;c.fillRect(X,top,bw,th);c.fillStyle=gg;c.fillRect(X,top,bw,th);});
      tx("PLATTOR",cx,top-Math.max(54,s*.12),"#9be3b0","center",Math.max(12,s*.03),700);
      if(t>6.3){const q=sm((t-6.3)/1);c.globalAlpha=g*q;[0,1,2].forEach(i=>{const X=lx+i*(bw+15)+bw/2+drift*(i-1);c.fillStyle="#2f7a3d";c.beginPath();c.moveTo(X-bw*.3,top);c.lineTo(X-bw*.12,top-th*.9*q);c.lineTo(X+bw*.14,top-th*.7*q);c.lineTo(X+bw*.3,top);c.closePath();c.fill();tx("land",X,top-th*.95*q-8,"#cfe8d4","center",Math.max(11,s*.028),700);});}
      c.restore();}};

  /* 2 · Mycket långsamt: Islands rift, plattorna drar isär, tiden rusar och avståndet växer */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    if(t<3.2){const p=cl(t/3.2,0,1);kb(2,a,{z:lerp(1.05,1.25,p),fx:.5,fy:.55},1);vign(a,.65);cred(2,.45);}
    else{const g=sm((t-2.8)/.9);stars(a,1,t,60);c.save();c.globalAlpha=g;const w=Math.min(a.w*.78,s*1.4),lx=cx-w/2,y=cy-s*.1,th=Math.max(30,s*.09),k=sm((t-3.4)/3.6),gap=k*w*.05+2;
      c.fillStyle="#a07c52";c.fillRect(lx,y,w/2-gap,th);c.fillRect(cx+gap,y,w/2-gap,th);const mg=c.createLinearGradient(0,y,0,y+th);mg.addColorStop(0,"#ff9a4a");mg.addColorStop(1,"#a8281a");c.fillStyle=mg;c.fillRect(cx-gap,y,gap*2,th);glow(cx,y+th*.5,th*1.4+gap*2,"rgba(255,140,60,.5)");
      [[-1],[1]].forEach(([d])=>{F.beam(cx+d*(gap+12),y-18,cx+d*(gap+54),y-18,t,"rgba(255,216,107,.9)",3,.7);});
      const yr=Math.round(100*k),cm=(2.5*yr/100).toFixed(1).replace(".",",");bigNum(yr+" år",cx-w*.22,y-Math.max(60,s*.15),Math.min(a.w*.07,s*.11),"#9fd0ff",1);bigNum(cm+" m",cx+w*.22,y-Math.max(60,s*.15),Math.min(a.w*.07,s*.11),"#ffd86b",1);tx("TID",cx-w*.22,y-Math.max(60,s*.15)-Math.max(40,s*.09),"rgba(159,208,255,.9)","center",Math.max(10,s*.024),700);tx("AVSTÅND ISÄR",cx+w*.22,y-Math.max(60,s*.15)-Math.max(40,s*.09),"rgba(255,216,107,.9)","center",Math.max(10,s*.024),700);
      if(t>5.6){const q=sm((t-5.6)/.8);chip("ca 2–3 cm om året · som naglar växer",cx,y+th+Math.max(54,s*.12),"rgba(255,216,107,.85)",Math.max(12,s*.034),q);}
      c.restore();}};

  /* 3 · Pangea: kontinenterna glider ihop till en enda landmassa */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();stars(a,1,t,100);const M=mapRect(a),q=1-sm((t-1.2)/5.6);grid(M.mx,M.my,M.mw,1);
    continents(M.mx,M.my,M.mw,q,eo(t/.8),true);
    const yrs=Math.round(300*(1-q));bigNum(fmt(yrs)+" miljoner år sedan",cx,a.y+a.h*.1,Math.min(a.w*.06,s*.09),"#ffd86b",eo(t/.6));
    if(t>7){const f=eo((t-7)/.9);c.save();c.globalAlpha=f;c.font=serif(700,Math.min(a.w*.13,s*.2));c.textAlign="center";c.shadowColor="#ffcf8a";c.shadowBlur=26;c.fillStyle="#fff";c.fillText("PANGEA",cx,a.y+a.h*.93);c.restore();}
    cred(7,.3);};

  /* 4 · Passar ihop: kontinenterna glider isär, Sydamerikas och Afrikas kuster lyser och passar ihop */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();stars(a,1,t,100);const M=mapRect(a),q=sm((t-2.4)/5.6);grid(M.mx,M.my,M.mw,1);
    continents(M.mx,M.my,M.mw,q,eo(t/.8),true);
    // de matchande kusterna pulserar när kontinenterna är nära varandra
    if(q<.55){const k=1-q/.55,k2=k*Math.sin(t*5)*.25+k*.75,k3=1,pa=PIECES[1],pb=PIECES[2],kk=M.mw/1024;[pa,pb].forEach((P,j)=>{const [cx0,cy0]=px(P.c[0],P.c[1]),e=1-q,X=M.mx+cx0*kk+P.D[0]*e*1024*kk,Y=M.my+M.mw/2*(cy0/512)+P.D[1]*e*512*kk,pos=j?[X+kk*38,Y-kk*14]:[X+kk*-6,Y-kk*18];glow(pos[0],pos[1],M.mw*.07,rgba(j?"#ffb27a":"#9be3b0",.5*k2));});
      chip("passar som pusselbitar",cx,a.y+a.h*.1,"rgba(255,216,107,.9)",Math.max(14,s*.04),k);}
    bigNum(fmt(300*(1-q))+" miljoner år sedan",cx,a.y+a.h*.93,Math.min(a.w*.045,s*.07),"#ffd86b",eo(t/.6));cred(4,.0);cred(7,.3);};

  /* 5 · Berg växer fram: Himalaya-fotot, sedan lager som pressas ihop och veckas upp */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    if(t<2.8){const p=cl(t/2.8,0,1);kb(5,a,{z:lerp(1.05,1.3,p),fx:.5,fy:.45},1);vign(a,.6);cred(5,.45);}
    else{const g=sm((t-2.4)/.9);stars(a,1,t,40);dim(a,0);c.save();c.globalAlpha=g;const w=Math.min(a.w*.84,s*1.55),lx=cx-w/2,gy=cy+s*.16,k=sm((t-3)/3.6),cols=["#c9a24a","#d98a4a","#a77fd0","#6fa86a","#8a6a4a"];
      c.beginPath();c.rect(lx,gy-s*.5,w,s*.7);c.clip();
      for(let L2=cols.length-1;L2>=0;L2--){c.fillStyle=cols[L2];c.beginPath();c.moveTo(lx,gy+s*.2);for(let u=0;u<=60;u++){const X=lx+w*u/60,fx=u/60,peak=Math.exp(-Math.pow((fx-.5)/.16,2))*k,wave=Math.sin(fx*16+L2*.5)*.05*k;const Y=gy-L2*s*.04+ -(peak*s*.3+wave*s*.2)*(1-L2*.12)+(L2*.0);c.lineTo(X,Y);}c.lineTo(lx+w,gy+s*.2);c.closePath();c.fill();c.strokeStyle="rgba(0,0,0,.25)";c.lineWidth=1.5;c.stroke();}
      c.restore();c.save();c.globalAlpha=g;[[-1,"#9fd0ff"],[1,"#ff9a6a"]].forEach(([d,col])=>{const X=cx+d*w*.44,Y=gy+s*.05;F.beam(X,Y,X-d*w*.18*sm((t-3)/1),Y,t,rgba(col,.9)||col,4,.6);});c.restore();
      tx("TVÅ PLATTOR PRESSAS MOT VARANDRA",cx,a.y+a.h*.12,"rgba(255,216,107,.95)","center",Math.max(12,s*.034),700);if(t>6)chip("Himalaya växer än i dag",cx,a.y+a.h*.88,"rgba(255,216,107,.85)",Math.max(13,s*.036),sm((t-6)/.7));}};

  /* 6 · Jordbävningar: San Andreas, sedan block som hakar upp sig, spänningen stiger och släpper med ringar och seismogram */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();
    if(t<2.6){const p=cl(t/2.6,0,1);kb(6,a,{z:lerp(1.05,1.2,p),fx:.45,fy:.5},1);vign(a,.65);cred(6,.45);}
    else{const g=sm((t-2.2)/.8);stars(a,1,t,40);dim(a,0);c.save();c.globalAlpha=g;const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy-s*.12,bh=Math.max(46,s*.13);const stress=cl((t-2.8)/2.2,0,1),slip=t>5.0;const q=slip?Math.min(1,(t-5.0)/.5):0;
      const sh=slip?Math.exp(-(t-5)*4)*6*Math.sin((t-5)*60):0;
      // två block: det vänstra står stilla, det högra dras åt höger tills det släpper
      const off=stress*w*.025+q*w*.05;c.fillStyle="#7a5a3a";c.fillRect(lx,y,w/2-3,bh);c.fillRect(cx+3+off+sh,y,w/2-3,bh);c.strokeStyle="rgba(255,120,80,.7)";c.lineWidth=3;c.beginPath();c.moveTo(cx,y-8);c.lineTo(cx,y+bh+8);c.stroke();
      F.beam(cx+30,y-24,cx+86,y-24,t,"rgba(255,216,107,.9)",3,.5);F.beam(cx-30,y+bh+24,cx-86,y+bh+24,t,"rgba(159,208,255,.9)",3,.5);
      // spänningsmätare
      const mw=Math.min(a.w*.5,s*.9),mx=cx-mw/2,my=y+bh+Math.max(60,s*.13);c.fillStyle="rgba(255,255,255,.08)";c.fillRect(mx,my,mw,14);const sv=slip?Math.max(0,1-(t-5)*2.2):stress;const sg=c.createLinearGradient(mx,0,mx+mw,0);sg.addColorStop(0,"#ffd86b");sg.addColorStop(1,"#ff4a4a");c.fillStyle=sg;c.shadowColor="#ff8a4a";c.shadowBlur=12;c.fillRect(mx,my,mw*sv,14);c.shadowBlur=0;tx("SPÄNNING I BERGET",cx,my-12,"rgba(255,216,107,.9)","center",Math.max(10,s*.024),700);
      // chockringar när det släpper
      if(slip){for(let i=0;i<4;i++){const ph=(t-5-i*.18);if(ph<0)continue;ring(cx,y+bh*.5,s*(.03+ph*.35),Math.max(0,1-ph*.9),i%2?"#ffd86b":"#ff8a4a",3);}glow(cx,y+bh*.5,s*.3*Math.max(0,1-(t-5)*1.5),"rgba(255,170,90,.45)");}
      // seismogram
      const sy=my+Math.max(54,s*.12),sw=mw,pts=[];for(let u=0;u<=120;u++){const f=u/120,tt=t-3+f*3,amp=tt>2?Math.exp(-(tt-2)*1.6)*(slip?1:0)*Math.max(0,(tt-2)>0):0;pts.push([mx+sw*f,sy+Math.sin(u*1.9)*amp*s*.07*(Math.sin(u*.37)+.4)+Math.sin(u*.6+t)*1]);}
      c.strokeStyle="rgba(155,227,176,.9)";c.lineWidth=2;c.shadowColor="#9be3b0";c.shadowBlur=8;c.beginPath();pts.forEach(([X,Y],i)=>i?c.lineTo(X,Y):c.moveTo(X,Y));c.stroke();c.shadowBlur=0;
      if(t>5.3){const q2=sm((t-5.3)/.7);chip("jordbävning!",cx,a.y+a.h*.1,"rgba(255,138,74,.9)",Math.max(16,s*.05),q2);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
