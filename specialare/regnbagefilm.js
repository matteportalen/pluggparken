/* Så blir en regnbåge: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/regnbage/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/regnbage-1..6.jpg. MPRegnbageFilm.start(host,{overlay,onClose}). Ljudmatta: standard (rymd/vind). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:9.1,cap:[[0.5,"Sol och regn på samma gång, och plötsligt en båge i alla färger. Det här är berättelsen om regnbågen."]]},
 {k:"01 · Regn och sol",d:7.5,cap:[[0.8,"För en regnbåge behövs två saker samtidigt: regndroppar i luften och sol som lyser på dem."]]},
 {k:"02 · Droppen böjer ljuset",d:7.5,cap:[[0.8,"Solljuset går in i en regndroppe, böjs, studsar på insidan och går ut igen."]]},
 {k:"03 · Färgerna skiljs åt",d:10.2,cap:[[0.8,"Varje färg böjs lite olika mycket. Därför delas det vita ljuset upp i röd, orange, gul, grön, blå och violett."]]},
 {k:"04 · Solen i ryggen",d:6.3,cap:[[0.8,"För att se en regnbåge måste du ha solen bakom dig och regnet framför dig."]]},
 {k:"05 · En hel cirkel",d:10.6,cap:[[0.8,"En regnbåge är egentligen en hel cirkel. Från marken ser vi bara den övre halvan."],[7.0,"Från ett flygplan kan man ibland se hela."]]},
 {k:"06 · Din egen regnbåge",d:7.4,cap:[[0.8,"Ingen ser exakt samma regnbåge som du. Din regnbåge beror på var just du står."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Så blir en regnbåge",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Nästa gång det regnar och solen skiner vet du var du ska titta. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: B. Navez · CC BY-SA 3.0 · Wikimedia Commons",2:"Foto: Tomasz Baranowski · CC BY 2.0 · Wikimedia Commons",3:"Foto: D-Kuru · CC BY-SA 3.0 AT · Wikimedia Commons",4:"Foto: Artaxerxes · CC BY-SA 4.0 · Wikimedia Commons",5:"Foto: Barbara Sciascia (gloria sedd från flygplan) · CC BY 4.0 · Wikimedia Commons",6:"Foto: Nkpelawuni · CC BY-SA 4.0 · Wikimedia Commons"};
const FARG=["#ff4d4d","#ff9a3c","#ffe14d","#5ad66b","#4da6ff","#5a63e0","#a05ae0"];
const NAMN=["röd","orange","gul","grön","blå","indigo","violett"];

window.MPRegnbageFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"regnbage",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"regnbage-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,man,title}=L;
  const sky=(a)=>grad(a,[[0,"#2b4a7a"],[.6,"#6f8fb8"],[1,"#a9c2dd"]]);
  const arc=(cx,cy,R,wd,a0,a1,al)=>{const c=x();c.save();c.globalAlpha=al==null?1:al;c.lineWidth=wd;c.lineCap="butt";FARG.forEach((col,i)=>{c.strokeStyle=col;c.beginPath();c.arc(cx,cy,R-i*wd*.95,a0,a1);c.stroke();});c.restore();};
  const sun=(px,py,r,t)=>{const c=x();c.save();c.fillStyle="#ffe27a";c.shadowColor="#ffd24a";c.shadowBlur=24;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.shadowBlur=0;c.strokeStyle="#ffe27a";c.lineWidth=Math.max(2,r*.12);c.lineCap="round";for(let i=0;i<12;i++){const an=i*TAU/12+t*.2,r1=r*1.3,r2=r*(1.6+.15*Math.sin(t*3+i));c.beginPath();c.moveTo(px+Math.cos(an)*r1,py+Math.sin(an)*r1);c.lineTo(px+Math.cos(an)*r2,py+Math.sin(an)*r2);c.stroke();}c.restore();};
  const rain=(a,t,al)=>{const c=x();c.save();c.beginPath();c.rect(a.x,a.y,a.w,a.h);c.clip();c.globalAlpha=al==null?1:al;c.strokeStyle="rgba(170,210,255,.7)";c.lineWidth=2;const r=L.srand(31);for(let i=0;i<60;i++){const bx=a.x+r()*a.w,sp=140+r()*120,by=a.y+((t*sp+r()*a.h)%a.h);c.beginPath();c.moveTo(bx,by);c.lineTo(bx-4,by+14);c.stroke();}c.restore();};

  const s0=(t)=>{photo(1,t,9.1,1.12,.2);const f=title(t,"REGNBÅGEN","SOL OCH REGN PÅ SAMMA GÅNG","#ffe27a");cred(1,.55*f);};

  /* 1 · Regn och sol */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(6,t,7.5,1.1,.1+.4*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;sky(a);
      sun(a.x+a.w*.2,a.y+a.h*.26,Math.min(a.w,a.h)*.07,t);rain(a,t,eo((t-3.2)/1));
      if(t>5.8){const q=eo((t-5.8)/1);c.globalAlpha=g*q;arc(cx,a.y+a.h*.92,Math.min(a.w*.3,s*.5),Math.max(5,s*.014),Math.PI,TAU);}
      const k1=eo((t-3.4)/1),k2=eo((t-4.4)/1);c.globalAlpha=g*k1;tx("sol",a.x+a.w*.2,a.y+a.h*.5,"#fff","center",Math.max(18,s*.05),700);
      c.globalAlpha=g*k2;tx("regndroppar",a.x+a.w*.7,a.y+a.h*.2,"#fff","center",Math.max(18,s*.05),700);
      c.restore();}};

  /* 2 · Droppen böjer ljuset: in, bryts, studsar, ut */
  const drop=(cx,cy,R,t)=>{const c=x();c.save();c.fillStyle="rgba(150,200,255,.25)";c.strokeStyle="rgba(200,230,255,.9)";c.lineWidth=3;c.beginPath();c.arc(cx,cy,R,0,TAU);c.fill();c.stroke();c.restore();};
  const P=(cx,cy,R,deg)=>[cx+Math.cos(deg*Math.PI/180)*R,cy+Math.sin(deg*Math.PI/180)*R];
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,7.5,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const R=Math.min(a.w*.26,a.h*.34),dx=cx,dy=cy;drop(dx,dy,R,t);
      const p1=P(dx,dy,R,215),p2=P(dx,dy,R,-20),p3=P(dx,dy,R,125),src=[a.x+a.w*.08,p1[1]-R*.2],out=[p3[0]-R*1.1,p3[1]+R*.9];
      const segs=[[src,p1,"#fff"],[p1,p2,"#ffe9a8"],[p2,p3,"#ffe9a8"],[p3,out,"#fff"]],n=segs.length,prog=cl((t-3.2)/4,0,1)*n;
      c.lineWidth=4;c.lineCap="round";segs.forEach(([A1,B1,col],i)=>{const k=cl(prog-i,0,1);if(k<=0)return;c.strokeStyle=col;c.shadowColor="#fff";c.shadowBlur=8;c.beginPath();c.moveTo(A1[0],A1[1]);c.lineTo(lerp(A1[0],B1[0],k),lerp(A1[1],B1[1],k));c.stroke();c.shadowBlur=0;});
      [[p1,"böjs",.5],[p2,"studsar",1],[p3,"ut",.2]].forEach(([p,l,k])=>{if(prog>(k===.5?1.2:k===1?2.2:3.2))tx(l,p[0]+(l==="böjs"?-R*.1:l==="studsar"?R*.45:-R*.7),p[1]+(l==="ut"?R*.25:0),"#ffd86b",l==="studsar"?"left":"center",Math.max(14,s*.036),700);});
      tx("solljus",src[0]+10,src[1]-14,"#fff","left",Math.max(14,s*.034),700);
      c.restore();}};

  /* 3 · Färgerna skiljs åt: ett vitt streck blir sju färger */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(3,t,10.2,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const R=Math.min(a.w*.14,a.h*.2),dx=cx-Math.min(a.w*.12,s*.2),dy=cy-s*.02;drop(dx,dy,R,t);
      const p1=P(dx,dy,R,215),p3=P(dx,dy,R,125),beam=cl((t-3.2)/1,0,1);
      c.strokeStyle="#fff";c.lineWidth=5;c.lineCap="round";c.shadowColor="#fff";c.shadowBlur=10;c.beginPath();c.moveTo(a.x+a.w*.04,p1[1]-R*.1);c.lineTo(lerp(a.x+a.w*.04,p1[0],beam),p1[1]-R*.1+beam*R*.1);c.stroke();c.shadowBlur=0;
      const fan=eo((t-4.6)/2);FARG.forEach((col,i)=>{const an=Math.PI*(.62+i*.025)*1,len=a.w*.3*fan;const ex=p3[0]+Math.cos(an)*len-len*.1,ey=p3[1]+Math.sin(an)*len*.7;c.strokeStyle=col;c.lineWidth=4;c.beginPath();c.moveTo(p3[0],p3[1]);c.lineTo(ex,ey);c.stroke();if(fan>.95)tx(NAMN[i],ex-8,ey+4,col,"right",Math.max(12,s*.03),700);});
      c.restore();}};

  /* 4 · Solen i ryggen */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(4,t,6.3,1.1,.1+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;sky(a);const gy=a.y+a.h*.8;c.fillStyle="#3d6a3a";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
      sun(a.x+a.w*.1,a.y+a.h*.38,Math.min(a.w,a.h)*.055,t);
      const px=cx-a.w*.12,hm=Math.max(60,s*.2);man(px,gy,hm,"#10223e",t,false);
      rain(L.S?{x:cx+a.w*.04,y:a.y,w:a.w*.4,h:gy-a.y}:{x:cx,y:a.y,w:a.w*.4,h:gy-a.y},t,eo((t-3)/1));
      arc(cx+a.w*.2,gy,Math.min(a.w*.22,s*.4),Math.max(5,s*.014),Math.PI,TAU,eo((t-3.4)/1.2));
      tx("solen bakom dig",a.x+a.w*.12,a.y+a.h*.18,"#fff4b0","left",Math.max(15,s*.038),700);
      tx("regnet framför",cx+a.w*.2,a.y+a.h*.18,"#dff0ff","center",Math.max(15,s*.038),700);
      c.restore();}};

  /* 5 · En hel cirkel: marken döljer nedre halvan, flygplan visar allt */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.8)/1.1);photo(5,t,10.6,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;sky(a);
      const R=Math.min(a.w*.26,a.h*.3),py=cy-s*.04,ground=1-eo((t-7.4)/1.4);
      arc(cx,py,R,Math.max(6,s*.018),0,TAU,eo((t-3.4)/1));
      if(ground>0){c.save();c.globalAlpha=g*ground;c.fillStyle="#3d6a3a";c.fillRect(a.x,py,a.w,a.y+a.h-py);c.restore();}
      tx(ground>.5?"från marken: bara övre halvan":"från ett flygplan: hela cirkeln",cx,a.y+a.h*.1,"#fff","center",Math.max(17,s*.045),700);
      c.restore();}};

  /* 6 · Din egen regnbåge: två personer, två bågar */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,7.4,1.1,.1+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;sky(a);const gy=a.y+a.h*.8;c.fillStyle="#3d6a3a";c.fillRect(a.x,gy,a.w,a.y+a.h-gy);
      const dx=Math.min(a.w*.22,s*.4),hm=Math.max(50,s*.16),Rb=Math.min(a.w*.2,s*.34),w=Math.max(4,s*.011);
      [[cx-dx,"du",0.6,"#10223e"],[cx+dx,"din kompis",1,"#3a1f5e"]].forEach(([px,l,k,col],i)=>{const q=eo((t-3.2-i*.8)/1);c.globalAlpha=g*q;man(px,gy,hm,col,t,false);arc(px+(i?-1:1)*Rb*.15,gy-hm*.1,Rb,w,Math.PI,TAU,.85);tx(l,px,gy+Math.max(28,s*.065),"#fff","center",Math.max(14,s*.036),700);});
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
