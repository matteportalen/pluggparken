/* Titanic: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js (MPSvartHal.start med o.def: undertexter, röst, kontroller, helskärm).
   Röst: ../ljud/titanic/s<scen>-<replik>.mp3 (ElevenLabs, samma röst som de andra filmerna).
   Bilderna: bilder/titanic-1..7.jpg (public domain, källa under varje foto i filmen och i lektionen).
   MPTitanicFilm.start(host,{overlay,onClose}). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/specialare/";}})();
const TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:10.8,cap:[[0.5,"Natten mellan den 14 och 15 april 1912 hände något som människor aldrig har glömt. Det här är berättelsen om Titanic."]]},
 {k:"01 · Det största skeppet",d:14,cap:[[0.8,"Titanic byggdes i Belfast. När hon var klar var hon det största skeppet i världen."],[6.7,"Hon var ungefär 270 meter lång, lika långt som två och en halv fotbollsplaner efter varandra."]]},
 {k:"02 · Jungfrufärden",d:15.7,cap:[[0.8,"I april 1912 lämnade hon England på sin allra första resa. Målet var New York."],[7.4,"Ombord fanns över 2 000 människor, både rika resenärer och familjer som hoppades på ett nytt liv."]]},
 {k:"03 · Isberget",d:18.4,cap:[[0.8,"Sent en kall natt, mitt ute i Atlanten, såg utkikarna ett isberg. Men det var nästan för sent."],[8.9,"Bara ungefär en tiondel av ett isberg syns över vattnet. Resten gömmer sig under ytan. Skeppet hann inte svänga, utan skrapade längs sidan."]]},
 {k:"04 · Vattnet kommer in",d:16.6,cap:[[0.8,"Titanic var byggt med 16 vattentäta rum, och hon kunde klara att några av dem fylldes med vatten."],[8,"Men isberget gjorde hål i fem rum längst fram. Det var ett rum för mycket, och skeppet började sjunka."]]},
 {k:"05 · Livbåtarna",d:12.3,cap:[[0.8,"Det fanns livbåtar för ungefär hälften av alla ombord. Det räckte inte."],[5.9,"Efter olyckan ändrades reglerna. Nu måste varje skepp ha plats i livbåtar för alla ombord."]]},
 {k:"06 · Vraket",d:11.7,cap:[[0.8,"Vraket hittades först 1985, nästan fyra kilometer ner på havsbotten."],[6.7,"Där är det kolsvart och iskallt. Skeppet ligger i två delar."]]}
];
const META={mat:"vagor",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Titanic",under:"En film i sex steg · ca 2 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Många kallade Titanic osänkbart, och just därför blev nyheten om olyckan så stor. Filmen bygger på riktiga foton och målningar ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR=[
 "Foto: Robert John Welch · Public domain · Wikimedia Commons",
 "Foto: Public domain · Wikimedia Commons",
 "Foto: ISS Crew Earth Observations · Public domain · Wikimedia Commons",
 "Målning: Willy Stöwer · Public domain · Wikimedia Commons",
 "Foto: Louis Ogden · Public domain · Wikimedia Commons",
 "Foto: NOAA / Institute for Exploration · Public domain · Wikimedia Commons",
 "Affisch: White Star Line · Public domain · Wikimedia Commons"];
const IMG={};function img(n){const u=ROOT+"bilder/titanic-"+n+".jpg";if(!IMG[u]){const i=new Image();i.src=u;IMG[u]=i;}return IMG[u];}
[1,2,3,4,5,6,7].forEach(img);
const ok=i=>i&&i.complete&&i.naturalWidth;

window.MPTitanicFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"titanic",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {A,eo,cl,lerp,ease,font,serif}=E;
  const x=()=>E.x;
  const tx=(t,px,py,col,al,sz,w)=>{const c=x();c.font=font(w||600,sz||12);c.fillStyle=col||"rgba(255,255,255,.88)";c.textAlign=al||"left";c.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#7fd6ff",al,11,700);
  const S=()=>{const a=A();return{a,s:Math.min(a.w,a.h),cx:a.x+a.w/2,cy:a.y+a.h/2,port:E.W<E.H*.9};};
  const cred=(n,a)=>{const c=x();c.save();c.globalAlpha=a==null?.6:a;c.fillStyle="#fff";c.font=font(600,11);c.textAlign="right";c.fillText(KR[n-1],E.W-Math.max(14,E.W*.03),E.H-Math.max(96,E.H*.13));c.restore();};
  // foto som täcker ytan med långsam inzoomning, mörkare kant
  const photo=(n,t,dur,zoom,dim,ox,oy)=>{const c=x(),a=A(),im=img(n);if(!ok(im))return;const k=cl(t/Math.max(1,dur),0,1),z=lerp(1,zoom||1.12,k);
    const sc=Math.max(a.w/im.naturalWidth,a.h/im.naturalHeight)*z,iw=im.naturalWidth*sc,ih=im.naturalHeight*sc;
    c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=eo(t/1.6);
    c.drawImage(im,a.x+a.w/2-iw/2+(ox||0)*k*a.w,a.y+a.h/2-ih/2+(oy||0)*k*a.h,iw,ih);
    c.fillStyle=`rgba(2,4,12,${dim||0})`;c.fillRect(a.x,a.y,a.w,a.h);
    const g=c.createRadialGradient(a.x+a.w/2,a.y+a.h/2,Math.min(a.w,a.h)*.3,a.x+a.w/2,a.y+a.h/2,Math.max(a.w,a.h)*.62);g.addColorStop(0,"rgba(2,3,10,0)");g.addColorStop(1,"rgba(2,3,10,.82)");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};
  const ship=(cx,cy,L,col,al,flip)=>{const c=x(),H=L*.11,u=L/100;c.save();c.globalAlpha=al==null?1:al;c.translate(cx,cy);if(flip)c.scale(-1,1);c.fillStyle=col||"#e8eef7";
    // skrov
    c.beginPath();c.moveTo(-50*u,-H*.15);c.lineTo(46*u,-H*.15);c.lineTo(50*u,-H*.62);c.lineTo(49*u,-H*.62);c.lineTo(41*u,H*.42);c.lineTo(-48*u,H*.42);c.closePath();c.fill();
    // överbyggnad
    c.fillRect(-36*u,-H*.62,70*u,H*.47);c.fillRect(-22*u,-H*1.0,44*u,H*.38);
    // fyra skorstenar
    for(let i=0;i<4;i++){c.fillStyle="#f0b76a";c.fillRect((-17+i*11.5)*u,-H*1.9,6.5*u,H*.95);c.fillStyle="#1a1d24";c.fillRect((-17+i*11.5)*u,-H*1.9,6.5*u,H*.14);}
    // master
    c.strokeStyle=col||"#e8eef7";c.lineWidth=Math.max(1,u*.5);c.beginPath();c.moveTo(-40*u,-H*.62);c.lineTo(-40*u,-H*1.55);c.moveTo(43*u,-H*.62);c.lineTo(43*u,-H*1.4);c.stroke();
    c.restore();};
  const water=(y,t,w,h,col)=>{const c=x(),a=A();c.save();const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,col||"rgba(40,110,190,.55)");g.addColorStop(1,"rgba(8,25,60,.9)");c.fillStyle=g;c.beginPath();c.moveTo(a.x,y);for(let i=0;i<=40;i++){const px=a.x+a.w*i/40;c.lineTo(px,y+Math.sin(i*.9+t*1.4)*2.2);}c.lineTo(a.x+a.w,y+h);c.lineTo(a.x,y+h);c.closePath();c.fill();c.restore();};
  const panel=(px,py,w,h,a)=>{const c=x();c.save();c.globalAlpha=a==null?1:a;c.fillStyle="rgba(4,8,20,.72)";c.strokeStyle="rgba(127,214,255,.35)";c.lineWidth=1;c.beginPath();c.roundRect?c.roundRect(px,py,w,h,10):c.rect(px,py,w,h);c.fill();c.stroke();c.restore();};

  /* 0 · Inledning: affischen, stor titel */
  const s0=(t)=>{const{s,cx,cy,a}=S();photo(7,t,11,1.1,.35);const f=eo((t-1)/2.5);
    const c=x();c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="#fff";c.font=`700 ${Math.round(Math.min(a.w*.14,s*.28))}px "Source Serif 4",Georgia,serif`;c.shadowColor="rgba(0,0,0,.7)";c.shadowBlur=18;c.fillText("TITANIC",cx,cy+s*.04);c.shadowBlur=0;
    tx("14–15 APRIL 1912",cx,cy+s*.04+Math.max(26,s*.07),"#ffd86b","center",Math.max(14,s*.032),700);c.restore();cred(7,.55*f);};

  /* 1 · Det största skeppet: foto, sedan storleksjämförelse med fotbollsplaner */
  const s1=(t)=>{const{s,cx,cy,a,port}=S();const g=eo((t-5.2)/1.6);photo(1,t,14,1.12,.1+.5*g);cred(1,.55*(1-g));
    if(g>0){const c=x();c.save();c.globalAlpha=g;
      const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,pitch=w*105/269,y0=cy+s*.14;
      tg("Så stor var hon",cx,a.y+a.h*.08,"#7fd6ff","center");
      // fotbollsplaner (105 m) i rad: 2,5 st
      const k=eo((t-6.4)/3);
      for(let i=0;i<3;i++){const px=lx+pitch*i,pw=i<2?pitch:pitch*.5,gg=k*cl(1.3-Math.abs(i*.25-0),0,1);
        c.globalAlpha=g*cl(k*3-i*.7,0,1);c.fillStyle=i%2?"#2f8f4e":"#38a05a";c.fillRect(px+1,y0,pw-2,s*.2);c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=1.3;c.strokeRect(px+4,y0+4,pw-8,s*.2-8);
        if(i<2){c.beginPath();c.moveTo(px+pw/2,y0+4);c.lineTo(px+pw/2,y0+s*.2-4);c.stroke();c.beginPath();c.arc(px+pw/2,y0+s*.1,s*.03,0,TAU);c.stroke();}}
      c.globalAlpha=g;
      // skeppet ovanför, ritas fram från vänster
      const sh=eo((t-5.8)/2.2);c.save();c.beginPath();c.rect(lx-10,y0-s*.5,w*sh+10,s*.5);c.clip();ship(lx+w/2,y0-s*.03,w,"#e8eef7",1);c.restore();
      c.globalAlpha=g*cl((t-8.2)/1.2,0,1);
      tx("269 meter",lx+w/2,a.y+a.h*.2,"#ffd86b","center",Math.max(20,s*.06),700);
      tx("2,5 fotbollsplaner",lx+pitch*1.25,y0+s*.2+Math.max(20,s*.05),"#9be3b0","center",Math.max(13,s*.032),700);
      c.restore();}};

  /* 2 · Jungfrufärden: foto, sedan färdväg och antal ombord */
  const s2=(t)=>{const{s,cx,cy,a,port}=S();const g=eo((t-6.2)/1.6);photo(2,t,15.7,1.1,.1+.55*g);cred(2,.55*(1-g));
    if(g>0){const c=x();c.save();c.globalAlpha=g;
      const x0=a.x+a.w*.1,x1=a.x+a.w*.9,yb=cy+s*.15;
      // färdväg Southampton → Cherbourg → Queenstown → New York
      const P=[[0,.0,"Southampton"],[.12,-.04,"Cherbourg"],[.24,.05,"Queenstown"],[1,-.02,"New York"]];
      const pt=q=>({x:x0+(x1-x0)*q,y:yb-Math.sin(q*Math.PI)*s*.18-q*s*.04});
      c.strokeStyle="rgba(127,214,255,.4)";c.lineWidth=2;c.setLineDash([6,8]);c.beginPath();for(let i=0;i<=60;i++){const p=pt(i/60);i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y);}c.stroke();c.setLineDash([]);
      const prog=eo((t-7)/7.5);c.strokeStyle="#ffd86b";c.lineWidth=3;c.beginPath();for(let i=0;i<=60;i++){const q=i/60*prog,p=pt(q);i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y);}c.stroke();
      const sp=pt(prog);ship(sp.x,sp.y-s*.015,s*.16,"#fff",1);
      [[0,"Southampton"],[1,"New York"]].forEach(([q,n])=>{const p=pt(q);c.fillStyle="#fff";c.beginPath();c.arc(p.x,p.y,5,0,TAU);c.fill();tx(n,p.x,p.y+22,"#fff","center",14,700);});
      tx("Atlanten",cx,yb+s*.12,"rgba(127,214,255,.6)","center",13,600);
      // antal ombord
      const n=Math.round(2200*eo((t-8.4)/3));c.globalAlpha=g*cl((t-8.2)/1,0,1);
      tg("Ombord",cx,a.y+a.h*.14,"#7fd6ff","center");
      c.font=`700 ${Math.round(Math.max(36,s*.14))}px "Source Serif 4",Georgia,serif`;c.fillStyle="#ffd86b";c.textAlign="center";c.fillText("över "+(n<2000?n:"2 000").toString().replace(/\B(?=(\d{3})+(?!\d))/g," "),cx,a.y+a.h*.14+Math.max(46,s*.15));
      tx("människor",cx,a.y+a.h*.14+Math.max(46,s*.15)+24,"#fff","center",15,700);
      c.restore();}};

  /* 3 · Isberget: foto, sedan tvärsnitt med dold del och skeppet som skrapar */
  const s3=(t)=>{const{s,cx,cy,a,port}=S();const g=eo((t-8.2)/1.6);photo(3,t,18.4,1.1,.1+.6*g);cred(3,.55*(1-g));
    if(g>0){const c=x();c.save();c.globalAlpha=g;
      const wl=cy-s*.06,bw=Math.min(a.w*.46,s*.9),ix=cx+(port?0:a.w*.12);
      water(wl,t,a.w,a.h/2+a.y-wl+s*.08,"rgba(30,100,180,.4)");
      // isberget (under vattnet större)
      c.fillStyle="rgba(235,248,255,.95)";c.beginPath();c.moveTo(ix-bw*.17,wl);c.lineTo(ix-bw*.08,wl-s*.08);c.lineTo(ix-bw*.02,wl-s*.14);c.lineTo(ix+bw*.06,wl-s*.1);c.lineTo(ix+bw*.12,wl-s*.05);c.lineTo(ix+bw*.2,wl);c.closePath();c.fill();
      c.fillStyle="rgba(170,215,245,.72)";c.beginPath();c.moveTo(ix-bw*.17,wl);c.lineTo(ix+bw*.2,wl);c.lineTo(ix+bw*.32,wl+s*.12);c.lineTo(ix+bw*.22,wl+s*.3);c.lineTo(ix+bw*.02,wl+s*.4);c.lineTo(ix-bw*.2,wl+s*.33);c.lineTo(ix-bw*.34,wl+s*.18);c.closePath();c.fill();
      c.strokeStyle="rgba(127,214,255,.7)";c.setLineDash([4,5]);c.lineWidth=1.2;c.beginPath();c.moveTo(ix+bw*.55,wl);c.lineTo(a.x+a.w*.02,wl);c.stroke();c.setLineDash([]);
      // 1/10 och 9/10
      const lb=cl((t-10)/1.5,0,1);c.globalAlpha=g*lb;
      tx("ca 1/10 syns",ix+bw*.1,wl-s*.17,"#fff","center",Math.max(14,s*.034),700);
      tx("ca 9/10 under vattnet",ix+bw*.06,wl+s*.2,"#0b1a33","center",Math.max(13,s*.032),700);
      // skeppet kommer från vänster och skrapar mot sidan
      const mv=eo((t-11.5)/4.5),shx=lerp(a.x-s*.1,ix-bw*.38,mv),hit=mv>.96;c.globalAlpha=g;
      ship(shx,wl-s*.015,s*.38,"#e8eef7",1);
      if(hit||mv>.9){c.save();c.globalCompositeOperation="lighter";const f=Math.sin((t-15.8)*9)*.5+.5,gg=c.createRadialGradient(ix-bw*.2,wl+s*.02,0,ix-bw*.2,wl+s*.02,s*.1);gg.addColorStop(0,`rgba(255,200,120,${.8*f+.2})`);gg.addColorStop(1,"rgba(255,120,40,0)");c.fillStyle=gg;c.beginPath();c.arc(ix-bw*.2,wl+s*.02,s*.1,0,TAU);c.fill();c.restore();}
      c.restore();}};

  /* 4 · Vattnet kommer in: målning, sedan skrovet med 16 rum */
  const s4=(t)=>{const{s,cx,cy,a,port}=S();const g=eo((t-7.2)/1.6);photo(4,t,16.6,1.1,.08+.6*g);cred(4,.55*(1-g));
    if(g>0){const c=x();c.save();c.globalAlpha=g;
      const w=Math.min(a.w*.86,s*1.7),lx=cx-w/2,y0=cy-s*.02,hh=s*.16,cw=w/16;
      const fill=cl((t-9)/5,0,1);   // 0..1: vattnet fyller först 4, sedan det 5:e
      const tilt=eo((t-13)/3.5)*.08;
      c.translate(cx,y0);c.rotate(tilt);c.translate(-cx,-y0);
      tg("Skrovet från sidan",cx,y0-hh*(port?2.8:1.6),"#7fd6ff","center");
      for(let i=0;i<16;i++){const bi=15-i,cxp=lx+i*cw;       // rum 1 är längst fram (höger)
        const idx=15-i;c.fillStyle="rgba(232,238,247,.12)";c.fillRect(cxp+1,y0,cw-2,hh);
        const lvl=idx<4?cl(fill*5-idx*.8,0,1):idx===4?cl(fill*5-3.4,0,1):0,col=idx<4?"rgba(60,150,230,.85)":"rgba(230,70,60,.9)";
        if(lvl>0){c.fillStyle=col;c.fillRect(cxp+1,y0+hh*(1-lvl),cw-2,hh*lvl);}
        c.strokeStyle="rgba(255,255,255,.6)";c.lineWidth=1;c.strokeRect(cxp+1,y0,cw-2,hh);}
      c.fillStyle="rgba(232,238,247,.8)";c.beginPath();c.moveTo(lx,y0);c.lineTo(lx-cw*.4,y0-hh*.4);c.lineTo(lx,y0-hh*.4);c.fill();c.beginPath();c.moveTo(lx+w,y0);c.lineTo(lx+w+cw*.8,y0-hh*.45);c.lineTo(lx+w,y0-hh*.45);c.closePath();c.fill();
      tx("Akter",lx+cw*2,y0+hh+22,"rgba(255,255,255,.65)","center",12,600);tx("För",lx+w-cw*.8,y0+hh+22,"rgba(255,255,255,.65)","center",12,600);
      c.restore();
      c.save();c.globalAlpha=g;
      tx("16 vattentäta rum",cx,y0+hh+Math.max(58,s*.14),"#fff","center",Math.max(16,s*.04),700);
      if(t>9.5)tx("Klarar 4 rum",cx-w/2+w*14/16,y0-hh*.75,"#6fb7ff","center",Math.max(13,s*.032),700);
      if(t>13)tx("Rum nr 5: för mycket!",port?cx-w/2+w*11.5/16:cx-w/2+w*10.4/16,y0-hh*(port?1.45:.75),"#ff7a6a","center",Math.max(13,s*.034),700);
      c.restore();}};

  /* 5 · Livbåtarna: foto, sedan staplar plats mot människor */
  const s5=(t)=>{const{s,cx,cy,a,port}=S();const g=eo((t-3)/1.4);photo(5,t,12.3,1.1,.08+.62*g);cred(5,.55*(1-g));
    if(g>0){const c=x();c.save();c.globalAlpha=g;
      const bw=Math.min(a.w*.74,s*1.5),bx=cx-bw/2,by=cy-s*.1,bh=Math.max(28,s*.09);
      const full=2200,boats=1200,newB=2200;
      const k1=eo((t-3.5)/1.6),upd=eo((t-6.4)/2.2);
      tg("Människor ombord",bx,by-14,"#7fd6ff","left");
      c.fillStyle="rgba(255,255,255,.14)";c.fillRect(bx,by,bw,bh);c.fillStyle="#7fd6ff";c.fillRect(bx,by,bw*k1,bh);
      tx("ca 2 200",bx+bw*k1-10,by+bh*.66,"#06121f","right",Math.max(14,s*.034),700);
      const by2=by+bh+Math.max(46,s*.12);
      tg("Plats i livbåtarna",bx,by2-14,upd>0.05?"#9be3b0":"#ffb070","left");
      const v=lerp(boats,newB,upd);
      c.fillStyle="rgba(255,255,255,.14)";c.fillRect(bx,by2,bw,bh);c.fillStyle=upd>.05?"#4fd08a":"#ff9a5a";c.fillRect(bx,by2,bw*(v/full)*k1,bh);
      tx(upd>.95?"plats för alla":"ca "+Math.round(v/100)*100,bx+bw*(v/full)*k1-10,by2+bh*.66,"#06121f","right",Math.max(14,s*.034),700);
      if(t>4.2&&upd<.05)tx("ungefär hälften",bx+bw*.62,by2+bh+30,"#ffb070","center",Math.max(15,s*.036),700);
      if(upd>.9)tx("Reglerna ändrades efter olyckan",cx,by2+bh+Math.max(34,s*.09),"#ffd86b","center",Math.max(15,s*.036),700);
      c.restore();}};

  /* 6 · Vraket: foto, sedan djupmätare och skeppet i två delar */
  const s6=(t)=>{const{s,cx,cy,a,port}=S();const g=eo((t-3.6)/1.6);photo(6,t,11.7,1.12,.1+.7*g);cred(6,.55*(1-g));
    if(g>0){const c=x();c.save();c.globalAlpha=g;
      const gx=a.x+a.w*(port?.3:.28),gy0=a.y+a.h*.1,gh=a.h*.8,d=eo((t-4.2)/3.2);
      // mätare 0–4 000 m
      c.fillStyle="rgba(30,110,190,.25)";c.fillRect(gx-34,gy0,68,gh);
      const grd=c.createLinearGradient(0,gy0,0,gy0+gh);grd.addColorStop(0,"rgba(60,150,230,.5)");grd.addColorStop(1,"rgba(2,6,16,.95)");c.fillStyle=grd;c.fillRect(gx-34,gy0,68,gh);
      c.strokeStyle="rgba(255,255,255,.5)";c.lineWidth=1.2;c.strokeRect(gx-34,gy0,68,gh);
      for(let m=0;m<=4000;m+=1000){const yy=gy0+gh*m/4000;c.beginPath();c.moveTo(gx-34,yy);c.lineTo(gx-44,yy);c.stroke();tx(m===0?"havsytan":(m/1000)+" km",gx-52,yy+4,"rgba(255,255,255,.8)","right",12,600);}
      const yy=gy0+gh*(3800/4000)*d;
      // Burj Khalifa som jämförelse (828 m)
      const bh2=gh*828/4000*d;c.fillStyle="rgba(255,216,107,.85)";c.fillRect(gx+44,gy0,16,bh2);tx("Burj Khalifa 828 m",gx+66,gy0+bh2*.5+4,"#ffd86b","left",12,700);
      ship(gx,yy-4,52,"#e8eef7",.95);
      if(d>.95)tx("ca 3 800 m",gx+66,yy+4,"#fff","left",Math.max(15,s*.036),700);
      // två delar
      const tt=eo((t-6.8)/2.5),px=a.x+a.w*(port?.62:.7),py=cy+a.h*.04,L=Math.min(a.w*.3,s*.5);
      c.globalAlpha=g*tt;tg("Skeppet ligger i två delar",px,py-L*.45,"#7fd6ff","center");
      const sl=L*1.05;
      c.save();c.beginPath();c.rect(px-sl,py-sl,sl*1.0,sl*2);c.clip();c.translate(px,py);c.rotate(-.05*tt);c.translate(-px,-py);ship(px,py,sl,"#cfd8e6",1);c.restore();
      c.save();c.beginPath();c.rect(px+sl*.02,py-sl,sl*1.5,sl*2);c.clip();c.translate(px+sl*.1*tt,py+sl*.03*tt);c.rotate(.09*tt);c.translate(-px,-py);ship(px,py,sl,"#9aa6ba",1);c.restore();
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
