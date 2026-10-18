/* Dans genom tiderna: minilektionen som film (sju scener, ca 1,7 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas, scenljus, glöd och partiklar).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/dans/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/dans-1..6.jpg. MPDansFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.2,cap:[[0.5,"Människor har dansat i tusentals år. Det här är berättelsen om dansen genom tiderna."]]},
 {k:"01 · Äldre än skriften",d:10.0,cap:[[0.8,"Människor har dansat längre än det finns skrift. Gamla gravmålningar i Egypten visar dansare för över 4 000 år sedan."]]},
 {k:"02 · Balett",d:17.7,cap:[[0.8,"Balett började vid furstehov i Italien för ungefär 500 år sedan. I Frankrike grundade kung Ludvig XIV en dansskola, år 1661."],[11.4,"Därför är många balettord franska. Dans på tå blev vanligt först på 1800-talet."]]},
 {k:"03 · Folkdans",d:14.3,cap:[[0.8,"I Sverige har man dansat folkdanser som polska och schottis i hundratals år, ofta till fiol och dragspel."],[8.8,"Polskan är äldst. Schottisen kom hit från Europa på 1800-talet."]]},
 {k:"04 · Moonwalk",d:13.3,cap:[[0.8,"Den 25 maj 1983 visade Michael Jackson sin berömda moonwalk på tv. Han ser ut att gå bakåt medan han glider framåt."]]},
 {k:"05 · Breakdance",d:15.8,cap:[[0.8,"Breakdance föddes i Bronx i New York på 1970-talet, bland unga som dansade till discjockeyns musik."],[8.1,"Namnet kommer från break, den korta instrumentala delen i en låt, där dansarna visade sina bästa steg."]]},
 {k:"06 · Olympiska spel",d:11.1,cap:[[0.8,"År 2024 blev breaking en olympisk gren för första gången, i Paris. Den är dock inte med i planerna för Los Angeles 2028."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Dans genom tiderna",under:"En film i sju steg · ca 1,7 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Dansen är äldre än orden. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={"1":"George Lodge · CC BY 3.0 · Wikimedia Commons","2":"Stano Novak · CC BY 2.5 · Wikimedia Commons","3":"Zoltan Kluger / Adam Cuerden · Public domain · Wikimedia Commons","4":"Drew H. Cohen · CC BY-SA 3.0 · Wikimedia Commons","5":"NexusMoves · CC BY-SA 3.0 · Wikimedia Commons","6":"NASA Earth Observatory image by Michala… · Public domain · Wikimedia Commons"};

window.MPDansFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"dans",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"dans-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title,srand}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();};
  const gl=(px,py,r,col)=>{const c=x();c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(px,py,0,px,py,Math.max(.1,r));g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,Math.max(.1,r),0,TAU);c.fill();c.restore();};
  const frame=(n,px,py,w,h,col)=>{const c=x(),im=L.img(n);if(!L.ok(im))return;const ir=im.width/im.height,fr=w/h;let sw,sh,sx,sy;if(ir>fr){sh=im.height;sw=sh*fr;sx=(im.width-sw)/2;sy=0;}else{sw=im.width;sh=sw/fr;sx=0;sy=(im.height-sh)/2;}
    c.save();c.shadowColor=col||"rgba(255,120,190,.4)";c.shadowBlur=30;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.fillStyle="#000";c.fill();c.shadowBlur=0;c.clip();c.drawImage(im,sx,sy,sw,sh,px-w/2,py-h/2,w,h);c.restore();c.save();c.strokeStyle="rgba(255,170,215,.75)";c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,14):c.rect(px-w/2,py-h/2,w,h);c.stroke();c.restore();};
  const BG=a=>grad(a,[[0,"#0c0710"],[1,"#1c0e1e"]]);
  /* scenljus: strålkastarkoner med dammkorn */
  const beams=(a,t,cols)=>{const c=x();c.save();c.globalCompositeOperation="lighter";cols.forEach(([fx,col],i)=>{const X=a.x+a.w*fx,sw=Math.sin(t*.7+i*2)*a.w*.05,g=c.createLinearGradient(X,a.y,X+sw,a.y+a.h);g.addColorStop(0,col.replace("A",".38"));g.addColorStop(1,col.replace("A","0"));c.fillStyle=g;c.beginPath();c.moveTo(X-6,a.y);c.lineTo(X+6,a.y);c.lineTo(X+sw+a.w*.1,a.y+a.h);c.lineTo(X+sw-a.w*.1,a.y+a.h);c.closePath();c.fill();});c.restore();const R=srand(33);for(let i=0;i<40;i++){gl(a.x+R()*a.w,a.y+((R()+t*.03*(.5+R()))%1)*a.h,2+R()*3,"rgba(255,230,200,.2)");}};
  const note=(px,py,r,col,rot)=>{const c=x();c.save();c.translate(px,py);c.rotate(rot||0);c.fillStyle=col;c.strokeStyle=col;c.lineWidth=Math.max(2,r*.12);c.beginPath();c.ellipse(0,0,r*.55,r*.4,-.4,0,TAU);c.fill();c.beginPath();c.moveTo(r*.45,-r*.1);c.lineTo(r*.45,-r*1.5);c.quadraticCurveTo(r*1.2,-r*1.1,r*.9,-r*.5);c.stroke();c.restore();};

  const s0=(t)=>{photo(1,t,7.2,1.12,.3);const f=title(t,"DANS","GENOM TIDERNA","#ffc0e0");cred(1,.55*f);};

  /* 1 · äldre än skriften: gravmålning och tidslinje */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,10,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;BG(a);const fw=Math.min(a.w*.42,s*.78),fh=fw*.62,fy=cy-s*.08;frame(1,cx,fy,fw,fh,"rgba(255,200,100,.45)");
      const R=srand(8);for(let i=0;i<26;i++){const X=cx-fw/2+((R()+t*.05*(.5+R()))%1)*fw,Y=fy-fh/2+R()*fh;gl(X,Y,3+R()*5,"rgba(255,215,120,.35)");}
      const w=Math.min(a.w*.74,s*1.4),lx=cx-w/2,y=cy+fh*.72,k=eo((t-4)/2.5);c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=3;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+w,y);c.stroke();
      /* skrift (ca 5 000 år) och dans (äldre) */
      const px=ago=>lx+w-(Math.min(ago,12000)/12000)*w;const sk=px(5000),dn=px(12000);
      c.fillStyle="#9fd0ff";c.fillRect(sk,y-Math.max(10,s*.022),(lx+w-sk)*k,Math.max(10,s*.022));tx("skrift: ca 5 000 år",lerp(lx+w,sk,.5),y-Math.max(20,s*.045),"#9fd0ff","center",Math.max(13,s*.034),700);
      gl(lerp(lx+w,dn,k),y+Math.max(14,s*.03),s*.1,"rgba(255,150,200,.5)");c.fillStyle="#ff9ac8";c.fillRect(lerp(lx+w,dn,k),y+Math.max(6,s*.014),(lx+w-lerp(lx+w,dn,k)),Math.max(10,s*.022));tx("dans: äldre än skriften",lx,y+Math.max(46,s*.1),"#ffb8d8","left",Math.max(14,s*.037),700);
      tx("Egypten: över 4 000 år sedan",cx,a.y+a.h*.1,"#ffe27a","center",Math.max(19,s*.052),700);
      c.restore();}};

  /* 2 · balett: scen, strålkastare, tidslinje */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,17.7,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#080510"],[.7,"#1a0f22"],[1,"#2a1a1a"]]);beams(a,t,[[.3,"rgba(255,200,230,A)"],[.7,"rgba(200,210,255,A)"]]);
      const fw=Math.min(a.w*.2,s*.34),fh=Math.min(a.h*.6,fw*1.5);frame(2,cx,cy-s*.06,fw,fh,"rgba(255,190,220,.5)");
      /* scengolv */c.fillStyle="rgba(120,70,40,.5)";c.fillRect(a.x,cy+fh/2-s*.02,a.w,a.y+a.h-(cy+fh/2-s*.02));gl(cx,cy+fh/2,fw,"rgba(255,220,200,.3)");
      const ty=a.y+a.h*.84,w=Math.min(a.w*.74,s*1.4),lx=cx-w/2,yr=v=>lx+(v-1450)/(1850-1450)*w;c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=3;c.beginPath();c.moveTo(lx,ty);c.lineTo(lx+w,ty);c.stroke();
      [[1500,"ca 1500","Italien","#ffd86b",3.5],[1661,"1661","Frankrike","#9fd0ff",6.6],[1832,"1800-talet","dans på tå","#ff9ac8",12]].forEach(([yv,l,l2,col,t0])=>{const k=eo((t-t0)/.8);if(k<=0)return;c.save();c.globalAlpha=g*k;gl(yr(yv),ty,s*.06,col==="#ffd86b"?"rgba(255,216,107,.6)":col==="#9fd0ff"?"rgba(159,208,255,.6)":"rgba(255,154,200,.6)");dot(yr(yv),ty,8,col);tx(l,yr(yv),ty-Math.max(18,s*.04),col,"center",Math.max(15,s*.04),700);tx(l2,yr(yv),ty+Math.max(26,s*.058),"#cfd8ff","center",Math.max(13,s*.034),600);c.restore();});
      c.restore();}};

  /* 3 · folkdans: par som snurrar, musiknoter */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,14.3,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#14100a"],[1,"#2a1c10"]]);const fw=Math.min(a.w*.3,s*.52),fh=fw*.75;frame(3,a.x+a.w*.22,cy,fw,fh,"rgba(255,200,120,.4)");
      const px=cx+a.w*.16,R=Math.min(a.w*.17,a.h*.3,s*.3);gl(px,cy,R*1.6,"rgba(255,190,110,.2)");c.strokeStyle="rgba(255,220,160,.35)";c.lineWidth=2;c.beginPath();c.ellipse(px,cy,R,R*.5,0,0,TAU);c.stroke();
      /* par som går runt i ring och snurrar */
      const n=5;for(let i=0;i<n;i++){const an=t*.7+i*TAU/n,X=px+Math.cos(an)*R,Y=cy+Math.sin(an)*R*.5,sp=t*3+i;[0,Math.PI].forEach((ph,j)=>{const ox=Math.cos(sp+ph)*R*.09,oy=Math.sin(sp+ph)*R*.045;gl(X+ox,Y+oy,R*.14,j?"rgba(255,170,200,.8)":"rgba(255,225,150,.8)");dot(X+ox,Y+oy,R*.04,j?"#ffc0d8":"#fff0b8");});}
      /* noter */const Rr=srand(4);for(let i=0;i<7;i++){const q=((t*.18+Rr())%1),X=px-R*1.1+Rr()*R*2.2,Y=cy-R*.6-q*R*1.2;c.save();c.globalAlpha=g*(1-q);gl(X,Y,R*.2,"rgba(255,220,150,.3)");note(X,Y,R*.1,"#ffe2a0",Math.sin(t+i)*.3);c.restore();}
      tx(t<8.8?"polska · schottis":"polskan är äldst",px,cy+R*.95,"#ffe2a0","center",Math.max(19,s*.052),700);tx("fiol · dragspel",px,cy+R*.95+Math.max(28,s*.062),"#cfd8ff","center",Math.max(14,s*.037),600);
      c.restore();}};

  /* 4 · moonwalk: fötter som glider bakåt */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,13.3,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#06060e"],[1,"#12102a"]]);const fw=Math.min(a.w*.22,s*.38),fh=fw*1.2;frame(4,a.x+a.w*.2,cy,fw,fh,"rgba(160,190,255,.45)");
      /* golv i perspektiv som rullar bakåt */
      const fx0=cx-a.w*.02,fy=cy+s*.14,fW=Math.min(a.w*.5,s*.95);c.save();c.beginPath();c.rect(a.x,fy-s*.02,a.w,a.y+a.h-fy);c.clip();const mv=(t*.9)%1;c.strokeStyle="rgba(160,150,255,.35)";c.lineWidth=2;for(let i=-8;i<=8;i++){c.beginPath();c.moveTo(fx0+i*fW*.02,fy);c.lineTo(fx0+i*fW*.14,a.y+a.h);c.stroke();}for(let i=0;i<9;i++){const q=((i+mv)/9),Y=fy+q*q*(a.y+a.h-fy);c.beginPath();c.moveTo(a.x,Y);c.lineTo(a.x+a.w,Y);c.stroke();}c.restore();gl(fx0,fy+s*.05,fW*.7,"rgba(150,140,255,.2)");
      /* fötter: glider bakåt medan kroppen går framåt */
      const sh=((t*.55)%1),slide=-sh*fW*.35,bob=Math.sin(t*5)*s*.004,loaf=(px,py,lift,flip)=>{c.save();c.translate(px,py-lift);c.scale(flip,1);c.fillStyle="#0a0a12";c.beginPath();c.moveTo(-fW*.09,0);c.lineTo(-fW*.09,-s*.025);c.quadraticCurveTo(fW*.02,-s*.04,fW*.08,-s*.015);c.quadraticCurveTo(fW*.1,0,fW*.07,s*.01);c.lineTo(-fW*.09,s*.01);c.closePath();c.fill();c.fillStyle="#fff";c.fillRect(-fW*.1,-s*.052,fW*.055,s*.03);gl(fW*.02,-s*.02,fW*.05,"rgba(255,255,255,.35)");c.restore();};
      loaf(fx0+slide+fW*.12,fy+s*.05,0,1);loaf(fx0+slide*.2-fW*.14,fy+s*.05,s*.012+bob,1);
      /* pilar: fötter bakåt, kropp framåt */
      c.strokeStyle="#ff9ac8";c.lineWidth=5;c.lineCap="round";c.beginPath();c.moveTo(fx0+fW*.2,fy+s*.12);c.lineTo(fx0-fW*.12,fy+s*.12);c.moveTo(fx0-fW*.12,fy+s*.12);c.lineTo(fx0-fW*.07,fy+s*.1);c.moveTo(fx0-fW*.12,fy+s*.12);c.lineTo(fx0-fW*.07,fy+s*.14);c.stroke();tx("fötterna: bakåt",fx0+fW*.04,fy+s*.2,"#ffb8d8","center",Math.max(14,s*.037),700);
      c.strokeStyle="#9fd0ff";c.beginPath();c.moveTo(fx0-fW*.2,fy-s*.17);c.lineTo(fx0+fW*.25,fy-s*.17);c.moveTo(fx0+fW*.25,fy-s*.17);c.lineTo(fx0+fW*.2,fy-s*.19);c.moveTo(fx0+fW*.25,fy-s*.17);c.lineTo(fx0+fW*.2,fy-s*.15);c.stroke();tx("kroppen: framåt",fx0+fW*.02,fy-s*.2,"#bfe0ff","center",Math.max(14,s*.037),700);
      tx("25 maj 1983",cx+a.w*.12,a.y+a.h*.12,"#ffe27a","center",Math.max(22,s*.06),700);
      c.restore();}};

  /* 5 · breakdance: vinylskiva med break, snurr */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,15.8,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#080614"],[1,"#1a0a2a"]]);beams(a,t,[[.2,"rgba(255,90,170,A)"],[.8,"rgba(90,170,255,A)"]]);const fw=Math.min(a.w*.26,s*.46),fh=fw*.75;frame(5,a.x+a.w*.2,cy,fw,fh,"rgba(255,120,200,.45)");
      const R=Math.min(a.w*.16,a.h*.28,s*.28),vx=cx+a.w*.17,vy=cy,rot=t*3.2;gl(vx,vy,R*1.8,"rgba(255,120,200,.22)");c.save();c.translate(vx,vy);c.rotate(rot);const vg=c.createRadialGradient(0,0,R*.25,0,0,R);vg.addColorStop(0,"#1a1a24");vg.addColorStop(1,"#08080e");c.fillStyle=vg;c.beginPath();c.arc(0,0,R,0,TAU);c.fill();c.strokeStyle="rgba(255,255,255,.1)";c.lineWidth=1;for(let i=0;i<14;i++){c.beginPath();c.arc(0,0,R*(.34+i*.045),0,TAU);c.stroke();}
      /* break: ett glödande segment */const on=t>8.1;if(on){c.strokeStyle="rgba(255,225,120,.95)";c.lineWidth=R*.1;c.shadowColor="#ffe080";c.shadowBlur=20;c.beginPath();c.arc(0,0,R*.62,-.3,.9);c.stroke();c.shadowBlur=0;}
      const lg=c.createRadialGradient(0,0,0,0,0,R*.28);lg.addColorStop(0,"#ff9ac8");lg.addColorStop(1,"#c0306e");c.fillStyle=lg;c.beginPath();c.arc(0,0,R*.28,0,TAU);c.fill();c.fillStyle="#08080e";c.beginPath();c.arc(0,0,R*.04,0,TAU);c.fill();c.fillStyle="rgba(255,255,255,.25)";c.fillRect(-R*.2,-R*.02,R*.4,R*.04);c.restore();gl(vx-R*.4,vy-R*.45,R*.3,"rgba(255,255,255,.18)");
      tx(t<8.1?"Bronx · 1970-talet":"break = instrumentala delen",vx,vy+R*1.35,t<8.1?"#ffe27a":"#ffe9a8","center",Math.max(17,s*.045),700);if(t<8.1)tx("discjockeyns musik",vx,vy+R*1.35+Math.max(28,s*.06),"#cfd8ff","center",Math.max(14,s*.037),600);
      c.restore();}};

  /* 6 · OS i Paris: Eiffeltornet och strålkastare */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,11.1,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#06081a"],[.7,"#1a1636"],[1,"#2a1a2a"]]);beams(a,t,[[.25,"rgba(255,230,160,A)"],[.5,"rgba(255,160,210,A)"],[.75,"rgba(160,200,255,A)"]]);
      const gy=a.y+a.h*.86,H=a.h*.62,w=H*.34,ex=cx-a.w*.12;c.save();const eg=c.createLinearGradient(0,gy-H,0,gy);eg.addColorStop(0,"#d8c8a0");eg.addColorStop(1,"#6a5a3a");c.fillStyle=eg;c.strokeStyle="rgba(255,235,180,.5)";c.lineWidth=2;c.beginPath();c.moveTo(ex-w/2,gy);c.quadraticCurveTo(ex-w*.14,gy-H*.38,ex-w*.04,gy-H);c.lineTo(ex+w*.04,gy-H);c.quadraticCurveTo(ex+w*.14,gy-H*.38,ex+w/2,gy);c.lineTo(ex+w*.32,gy);c.quadraticCurveTo(ex,gy-H*.2,ex-w*.32,gy);c.closePath();c.fill();c.stroke();
      for(let i=1;i<7;i++){const yy=gy-H*i/7,ww=w*(1-i/7)*.5;c.beginPath();c.moveTo(ex-ww,yy);c.lineTo(ex+ww,yy);c.stroke();}c.restore();gl(ex,gy-H,s*.15,"rgba(255,235,180,.7)");const sw=((t*1.2)%1);gl(ex+Math.cos(t*2)*s*.02,gy-H*.55,w*.7,"rgba(255,220,150,"+(.15+.1*Math.sin(t*6)).toFixed(2)+")");
      const fw=Math.min(a.w*.3,s*.52),fh=fw*.66;frame(6,cx+a.w*.22,cy-s*.04,fw,fh,"rgba(255,200,120,.4)");
      const k=eo((t-3.2)/1.4);c.globalAlpha=g*k;gl(cx+a.w*.22,cy-s*.04+fh/2+Math.max(40,s*.09),s*.2,"rgba(255,216,107,.3)");tx("2024 · Paris",cx+a.w*.22,cy-s*.04+fh/2+Math.max(46,s*.1),"#ffe27a","center",Math.max(24,s*.065),700);tx("breaking blir en olympisk gren",cx+a.w*.22,cy-s*.04+fh/2+Math.max(46,s*.1)+Math.max(30,s*.065),"#ffd0e8","center",Math.max(15,s*.04),700);
      if(t>8){c.globalAlpha=g*eo((t-8)/1);tx("Los Angeles 2028: inte med",cx,a.y+a.h*.1,"#ff9aa8","center",Math.max(18,s*.048),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
