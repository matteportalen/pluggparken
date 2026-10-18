/* Månen: minilektionen som film (åtta scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js (MPSvartHal.start med o.def). Röst: ../ljud/manen/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/manen-1..7.jpg. MPManFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/specialare/";}})();
const TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.4,cap:[[0.5,"Vår närmaste granne i rymden lyser varje natt. Det här är berättelsen om månen."]]},
 {k:"01 · Vår granne",d:6.9,cap:[[0.8,"Månen är jordens enda naturliga måne. Den snurrar runt jorden hela tiden."]]},
 {k:"02 · Avståndet",d:9.3,cap:[[0.8,"Månen är ungefär 384 000 kilometer bort. Ljuset behöver drygt en sekund för att komma hit."]]},
 {k:"03 · Människor på månen",d:9.5,cap:[[0.8,"År 1969 gick Neil Armstrong och Buzz Aldrin på månen."],[6.4,"Resan dit tog ungefär tre dygn."]]},
 {k:"04 · Hoppa högt",d:8.3,cap:[[0.8,"På månen är tyngdkraften ungefär sex gånger svagare än hos oss."],[5.2,"Du skulle kunna hoppa många gånger högre."]]},
 {k:"05 · Fotspåren",d:7,cap:[[0.8,"Där finns ingen vind eller regn, så astronauternas fotspår ligger kvar i månens damm."]]},
 {k:"06 · Faserna",d:10.5,cap:[[0.8,"Månen lyser inte själv. Den speglar solens ljus."],[5.1,"Vi ser olika mycket av den upplysta delen, och det ger månens faser."]]},
 {k:"07 · Den flyttar sig",d:10,cap:[[0.8,"Månen flyttar sig långsamt bort från jorden, ungefär 4 centimeter om året."],[6.7,"Ungefär så fort som dina naglar växer."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Månen",under:"En film i åtta steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Månen har följt jorden i miljarder år. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Gregory H. Revera · CC BY-SA 3.0 · Wikimedia Commons",2:"Bild: Pablo Carlos Budassi · CC BY-SA 4.0 · Wikimedia Commons",3:"Foto: Charlie Duke, NASA (Apollo 16, John Young) · Public domain",4:"Foto: NASA Glenn Research Center (Apollo-programmet) · Public domain",5:"Foto: NASA (Apollo 11, fotspår) · Public domain",6:"Diagram: John Emslie, Wellcome Collection · CC BY 4.0",7:"Foto: NASA · Public domain · Wikimedia Commons"};
const IMG={};function img(n){const u=ROOT+"bilder/manen-"+n+".jpg";if(!IMG[u]){const i=new Image();i.src=u;IMG[u]=i;}return IMG[u];}
[1,2,3,4,5,6,7].forEach(img);
const ok=i=>i&&i.complete&&i.naturalWidth;
const srand=s=>()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};

window.MPManFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"manen",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {A,eo,cl,lerp,font}=E;
  const x=()=>E.x;
  const tx=(t,px,py,col,al,sz,w)=>{const c=x();c.font=font(w||600,sz||12);c.fillStyle=col||"rgba(255,255,255,.88)";c.textAlign=al||"left";c.fillText(t,px,py);};
  const tg=(t,px,py,col,al)=>tx(t.toUpperCase(),px,py,col||"#9fb4ff",al,11,700);
  const S=()=>{const a=A();return{a,s:Math.min(a.w,a.h),cx:a.x+a.w/2,cy:a.y+a.h/2,port:E.W<E.H*.9};};
  const cred=(n,a)=>{const c=x();c.save();c.globalAlpha=a==null?.6:a;c.fillStyle="#fff";c.font=font(600,11);c.textAlign="right";c.fillText(KR[n],E.W-Math.max(14,E.W*.03),E.H-Math.max(96,E.H*.13));c.restore();};
  const photo=(n,t,dur,zoom,dim)=>{const c=x(),a=A(),im=img(n);if(!ok(im))return;const k=cl(t/Math.max(1,dur),0,1),z=lerp(1,zoom||1.12,k);
    const sc=Math.max(a.w/im.naturalWidth,a.h/im.naturalHeight)*z,iw=im.naturalWidth*sc,ih=im.naturalHeight*sc;
    c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=eo(t/1.6);c.drawImage(im,a.x+a.w/2-iw/2,a.y+a.h/2-ih/2,iw,ih);
    c.fillStyle=`rgba(2,4,12,${dim||0})`;c.fillRect(a.x,a.y,a.w,a.h);
    const g=c.createRadialGradient(a.x+a.w/2,a.y+a.h/2,Math.min(a.w,a.h)*.3,a.x+a.w/2,a.y+a.h/2,Math.max(a.w,a.h)*.62);g.addColorStop(0,"rgba(2,3,10,0)");g.addColorStop(1,"rgba(2,3,10,.82)");c.fillStyle=g;c.fillRect(a.x,a.y,a.w,a.h);c.restore();};
  const space=(a,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.fillStyle="#04060f";c.fillRect(a.x,a.y,a.w,a.h);const r=srand(7);c.fillStyle="rgba(255,255,255,.7)";for(let i=0;i<70;i++){c.globalAlpha=(al==null?1:al)*(.25+r()*.6);c.fillRect(a.x+r()*a.w,a.y+r()*a.h,1.4,1.4);}c.restore();};
  const earth=(px,py,r)=>{const c=x();c.save();const g=c.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,"#5ba7e8");g.addColorStop(1,"#12427d");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();
    c.beginPath();c.arc(px,py,r,0,TAU);c.clip();c.fillStyle="rgba(86,170,96,.85)";[[-.35,-.15,.4,.28],[.3,.2,.3,.4],[.05,-.5,.22,.15]].forEach(([dx,dy,rx,ry])=>{c.beginPath();c.ellipse(px+dx*r,py+dy*r,rx*r,ry*r,.5,0,TAU);c.fill();});c.restore();};
  const moonDisc=(px,py,r,lit,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;
    if(lit==null){const g=c.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,"#e6e4de");g.addColorStop(1,"#8d8b87");c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();
      c.fillStyle="rgba(90,88,84,.35)";[[-.3,-.2,.18],[.25,.1,.22],[-.1,.4,.12],[.4,-.35,.1]].forEach(([dx,dy,rr])=>{c.beginPath();c.arc(px+dx*r,py+dy*r,rr*r,0,TAU);c.fill();});}
    c.restore();};
  /* månfas: ph 0..1 (0 nymåne, .5 fullmåne), tilltagande = höger sida upplyst */
  const phase=(px,py,r,ph)=>{const c=x();c.save();c.fillStyle="#1a1d2a";c.beginPath();c.arc(px,py,r,0,TAU);c.fill();
    const wax=ph<.5,f=wax?ph*2:(1-ph)*2,k=Math.cos(f*Math.PI),dir=wax?1:-1;   // f 0..1 = hur mycket av cirkeln som lyser
    const g=c.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,"#f3f1e8");g.addColorStop(1,"#b9b6ab");
    c.translate(px,py);c.scale(dir,1);c.fillStyle=g;c.beginPath();c.moveTo(0,-r);c.arc(0,0,r,-Math.PI/2,Math.PI/2,false);c.ellipse(0,0,Math.max(.01,Math.abs(k)*r),r,0,Math.PI/2,-Math.PI/2,k>0);c.closePath();c.fill();
    c.setTransform(1,0,0,1,0,0);c.restore();c.save();c.strokeStyle="rgba(255,255,255,.25)";c.lineWidth=1.5;c.beginPath();c.arc(px,py,r,0,TAU);c.stroke();c.restore();};

  /* 0 · Inledning */
  const s0=(t)=>{const{s,cx,cy,a}=S();photo(1,t,6.4,1.14,.25);const f=eo((t-.8)/2),c=x();c.save();c.globalAlpha=f;c.textAlign="center";c.fillStyle="#fff";c.font=`700 ${Math.round(Math.min(a.w*.12,s*.22))}px "Source Serif 4",Georgia,serif`;c.shadowColor="rgba(0,0,0,.7)";c.shadowBlur=18;c.fillText("MÅNEN",cx,cy+s*.05);c.shadowBlur=0;
    tx("VÅR GRANNE I RYMDEN",cx,cy+s*.05+Math.max(26,s*.07),"#cfd8ff","center",Math.max(13,s*.03),700);c.restore();cred(1,.55*f);};

  /* 1 · Vår granne: foto, sedan månen i bana runt jorden */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.2)/1.1);photo(7,t,6.9,1.1,.1+.5*g);cred(7,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const R=Math.min(a.w*.36,a.h*.34),er=R*.24,mr=R*.07,ang=-1+t*.9;
      c.strokeStyle="rgba(255,255,255,.22)";c.setLineDash([5,7]);c.lineWidth=1.5;c.beginPath();c.arc(cx,cy,R,0,TAU);c.stroke();c.setLineDash([]);
      // svans
      for(let i=0;i<30;i++){const aa=ang-i*.035;c.fillStyle=`rgba(200,205,230,${.4*(1-i/30)})`;c.beginPath();c.arc(cx+Math.cos(aa)*R,cy+Math.sin(aa)*R,mr*.35,0,TAU);c.fill();}
      earth(cx,cy,er);moonDisc(cx+Math.cos(ang)*R,cy+Math.sin(ang)*R,mr);
      tx("Jorden",cx,cy+er+Math.max(22,s*.05),"#9fd0ff","center",Math.max(13,s*.032),700);tx("Månen",cx+Math.cos(ang)*R,cy+Math.sin(ang)*R-mr-12,"#e6e4de","center",Math.max(13,s*.032),700);
      tx("inte i skala",a.x+a.w-14,a.y+a.h-14,"rgba(255,255,255,.5)","right",11,600);
      c.restore();}};

  /* 2 · Avståndet: foto, sedan jorden och månen i riktig skala med en ljuspuls */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(2,t,9.3,1.1,.1+.55*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const w=Math.min(a.w*.84,s*1.7),lx=cx-w/2,dist=w,er=dist/60,y=cy-s*.02,mx=lx+dist;
      earth(lx,y,er);moonDisc(mx,y,er*.273);
      c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=1.5;c.beginPath();c.moveTo(lx+er,y+er*3+10);c.lineTo(mx-er*.3,y+er*3+10);c.stroke();[lx+er,mx-er*.3].forEach(px=>{c.beginPath();c.moveTo(px,y+er*3+4);c.lineTo(px,y+er*3+16);c.stroke();});
      tx("384 000 km",cx,y+er*3+Math.max(34,s*.075),"#ffd86b","center",Math.max(17,s*.045),700);
      tx("ritat i skala",cx,y-er*4,"rgba(255,255,255,.55)","center",Math.max(12,s*.028),600);
      // ljuspuls: drygt en sekund
      if(t>5){const k=cl((t-5)/2.2,0,1),px=lerp(lx+er,mx-er*.3,k);c.save();c.globalCompositeOperation="lighter";const gr=c.createRadialGradient(px,y,0,px,y,16);gr.addColorStop(0,"rgba(255,240,170,1)");gr.addColorStop(1,"rgba(255,200,80,0)");c.fillStyle=gr;c.beginPath();c.arc(px,y,16,0,TAU);c.fill();c.restore();
        tx("ljuset: drygt 1 sekund",cx,y-er*7,"#fff0b0","center",Math.max(14,s*.036),700);}
      c.restore();}};

  /* 3 · Människor på månen: foto, sedan 1969 och resan på tre dygn */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(4,t,9.5,1.1,.1+.55*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const k=eo((t-3.8)/1.2);c.globalAlpha=g*k;tx("1969",cx,a.y+a.h*.3,"#ffd86b","center",Math.max(40,s*.16),700);tx("Neil Armstrong · Buzz Aldrin",cx,a.y+a.h*.3+Math.max(32,s*.07),"#fff","center",Math.max(15,s*.038),700);
      if(t>6.2){const q=eo((t-6.2)/1);c.globalAlpha=g*q;const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=a.y+a.h*.68,er=Math.max(14,s*.045),mr=er*.45;
        earth(lx,y,er);moonDisc(lx+w,y,mr);c.strokeStyle="rgba(255,255,255,.2)";c.setLineDash([5,7]);c.beginPath();c.moveTo(lx+er,y);c.lineTo(lx+w-mr,y);c.stroke();c.setLineDash([]);
        const p=cl((t-6.6)/2.4,0,1),px=lerp(lx+er,lx+w-mr-8,p);c.fillStyle="#fff";c.beginPath();c.moveTo(px+9,y);c.lineTo(px-6,y-5);c.lineTo(px-6,y+5);c.closePath();c.fill();
        [1,2,3].forEach(d=>{const dx=lerp(lx+er,lx+w-mr-8,d/3);tx("dygn "+d,dx,y+Math.max(34,s*.07),px>=dx-2?"#ffd86b":"rgba(255,255,255,.4)","center",Math.max(12,s*.03),700);});}
      c.restore();}};

  /* 4 · Hoppa högt: hoppfoto, sedan två hopp i jämförelse */
  const hopper=(px,gy,h,col)=>{const c=x();c.save();c.fillStyle=col;c.beginPath();c.arc(px,gy-h*.88,h*.1,0,TAU);c.fill();c.fillRect(px-h*.09,gy-h*.78,h*.18,h*.4);c.fillRect(px-h*.09,gy-h*.38,h*.07,h*.38);c.fillRect(px+h*.02,gy-h*.38,h*.07,h*.38);c.fillRect(px-h*.2,gy-h*.8,h*.1,h*.3);c.fillRect(px+h*.1,gy-h*.8,h*.1,h*.3);c.restore();};
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3.4)/1.1);photo(3,t,8.3,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const gy=a.y+a.h*.8,hp=Math.max(40,s*.13),dx=Math.min(a.w*.22,s*.4),ex=cx-dx,mx=cx+dx;
      c.strokeStyle="rgba(255,255,255,.3)";c.lineWidth=2;c.beginPath();c.moveTo(a.x+a.w*.08,gy);c.lineTo(a.x+a.w*.92,gy);c.stroke();
      const jh=hp*1.3,ph=((t-3.8)%2.2)/2.2,up=Math.sin(Math.PI*cl(ph/.9,0,1));  // jordens hopp, lågt
      hopper(ex,gy-up*jh*.3,hp,"#9fd0ff");tx("Jorden",ex,gy+Math.max(26,s*.058),"#9fd0ff","center",Math.max(14,s*.034),700);
      hopper(mx,gy-up*jh*1.8,hp,"#e6e4de");tx("Månen",mx,gy+Math.max(26,s*.058),"#e6e4de","center",Math.max(14,s*.034),700);
      if(t>5.4){const q=eo((t-5.4)/1);c.globalAlpha=g*q;tx("många gånger högre",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 5 · Fotspåren */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();photo(5,t,7,1.08,.15);cred(5,.55);
    const f=eo((t-2)/1);if(f>0){c.save();c.globalAlpha=f;c.fillStyle="rgba(6,10,22,.72)";c.fillRect(a.x,a.y+a.h*.62,a.w,a.h*.26);
      tx("Ingen vind · inget regn",cx,a.y+a.h*.62+a.h*.11,"#fff","center",Math.max(16,s*.042),700);
      const f2=eo((t-3.6)/1);c.globalAlpha=f*f2;tx("Fotspåret ligger kvar",cx,a.y+a.h*.62+a.h*.2,"#ffd86b","center",Math.max(16,s*.042),700);c.restore();}};

  /* 6 · Faserna: foto/diagram, sedan månens faser i omlopp */
  const NAMN=["Nymåne","Tilltagande skära","Tilltagande halvmåne","Tilltagande måne","Fullmåne","Avtagande måne","Avtagande halvmåne","Avtagande skära"];
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(6,t,10.5,1.06,.45+.3*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a);
      const R=Math.min(s*.2,a.w*.15),my=cy-s*.06;
      // solljus från vänster
      for(let i=0;i<5;i++){const yy=my-R+(i+.5)*R*2/5;c.strokeStyle="rgba(255,225,120,.55)";c.lineWidth=2;c.beginPath();c.moveTo(a.x+a.w*.06,yy);c.lineTo(cx-R*(port?2.3:3)-R*.2,yy);c.stroke();}
      tx("solljus",a.x+a.w*.06,my-R-14,"#ffe08a","left",Math.max(13,s*.03),700);
      if(t<5.1){moonDisc(cx,my,R,null);tx("Månen speglar solens ljus",cx,my+R+Math.max(30,s*.07),"#e6e4de","center",Math.max(14,s*.034),700);}
      else{const p=((t-5.1)/8)%1,idx=Math.floor(p*8+.0001);
        phase(cx,my,R,p);tx(NAMN[Math.min(7,idx)],cx,my+R+Math.max(30,s*.07),"#ffd86b","center",Math.max(15,s*.038),700);
        {const span=Math.min(a.w*.84,R*6.4),rr=Math.max(9,Math.min(R*.22,span/7*.38));for(let i=0;i<8;i++)phase(cx-span/2+i*span/7,my+R+Math.max(70,s*.17),rr,i/8);}}
      c.restore();}};

  /* 7 · Den flyttar sig: bort från jorden, och en nagel som växer */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();space(a);
    const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=a.y+a.h*.32,er=Math.max(18,s*.06),drift=Math.min(24,(t-1)*3.5);
    earth(lx,y,er);moonDisc(lx+w*.62+Math.max(0,drift),y,er*.4);
    c.strokeStyle="#ffd86b";c.lineWidth=2.5;c.beginPath();const ax=lx+w*.62+er*.7;c.moveTo(ax+Math.max(0,drift),y);c.lineTo(ax+Math.max(0,drift)+30,y);c.stroke();c.fillStyle="#ffd86b";c.beginPath();c.moveTo(ax+Math.max(0,drift)+38,y);c.lineTo(ax+Math.max(0,drift)+26,y-6);c.lineTo(ax+Math.max(0,drift)+26,y+6);c.fill();
    tx("4 cm om året",cx+w*.1,y-er*1.6,"#ffd86b","center",Math.max(17,s*.045),700);
    if(t>6.6){const q=eo((t-6.6)/1.2);c.save();c.globalAlpha=q;const fx=cx,fy=a.y+a.h*.7,fw=Math.min(a.w*.16,s*.2),fh=fw*1.7;
      c.fillStyle="#e8b894";c.beginPath();c.roundRect?c.roundRect(fx-fw/2,fy-fh*.2,fw,fh,fw*.45):c.rect(fx-fw/2,fy-fh*.2,fw,fh);c.fill();
      const grow=cl((t-7.4)/2,0,1);c.fillStyle="#f8dcc8";c.beginPath();c.roundRect?c.roundRect(fx-fw*.36,fy-fh*.05-fh*.12*grow,fw*.72,fh*.42+fh*.12*grow,fw*.25):c.rect(fx-fw*.36,fy-fh*.05-fh*.12*grow,fw*.72,fh*.42+fh*.12*grow);c.fill();
      tx("naglar växer lika fort",fx,fy+fh*.95,"#fff","center",Math.max(14,s*.036),700);c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
