/* Hjärnan luras: minilektionen som film (sex scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/illusioner/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/illusioner-1..6.jpg. MPIllusionerFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7.5,cap:[[0.5,"Är du säker på att du ser det du tror att du ser? Det här är berättelsen om hur hjärnan luras."]]},
 {k:"01 · Ögon och hjärna",d:6.2,cap:[[0.8,"Ögonen tar emot ljus, men det är hjärnan som bestämmer vad vi ser."]]},
 {k:"02 · Hjärnan gissar",d:7.1,cap:[[0.8,"Hjärnan gör hela tiden kloka gissningar, för att gå snabbt. Ofta har den rätt."]]},
 {k:"03 · Fel gissning",d:7.2,cap:[[0.8,"När bilden är gjord på ett särskilt sätt gissar hjärnan fel. Då ser vi en optisk illusion."]]},
 {k:"04 · Färger påverkas",d:6.7,cap:[[0.8,"Samma färg kan se ljusare eller mörkare ut, beroende på vad som finns runt omkring."]]},
 {k:"05 · Mät själv",d:6.6,cap:[[0.8,"Det bästa sättet att vara säker är att mäta. Linjal slår ögonmått!"]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Hjärnan luras",under:"En film i sex steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Prova själv i Specialare och se om du kan lura hjärnan. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Bild: Aliyu Mohammed Aliyu (ögats anatomi) · CC0 · Wikimedia Commons",2:"Foto: Rhododendrites (golvet i Duomo, Florens) · CC BY-SA 4.0 · Wikimedia Commons",3:"Foto: Dennis Sylvester Hurd · CC BY 2.0 · Wikimedia Commons",4:"Bild: Edward H. Adelson (schackbrädesskuggan) · CC BY 3.0 · Wikimedia Commons",5:"Bild: Hamaredha (Müller-Lyer-illusionen) · CC BY-SA 4.0 · Wikimedia Commons",6:"Bild: Hamaredha (Ebbinghaus-illusionen) · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPIllusionerFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"illusioner",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"illusioner-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const paper=(a)=>grad(a,[[0,"#f2ead8"],[1,"#e6dcc4"]]);
  const check=(px,py,r)=>{const c=x();c.save();c.strokeStyle="#2f9e5e";c.lineWidth=Math.max(5,r*.3);c.lineCap="round";c.lineJoin="round";c.beginPath();c.moveTo(px-r*.6,py);c.lineTo(px-r*.15,py+r*.5);c.lineTo(px+r*.7,py-r*.5);c.stroke();c.restore();};

  const s0=(t)=>{photo(3,t,7.5,1.12,.3);const f=title(t,"HJÄRNAN LURAS","ÄR DU SÄKER PÅ ATT DU SER RÄTT?","#cfd8ff");cred(3,.55*f);};

  /* 1 · Ögon och hjärna */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(1,t,6.2,1.1,.1+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const R=Math.min(a.w*.09,a.h*.12),ex=cx-Math.min(a.w*.3,s*.5),bx=cx+Math.min(a.w*.3,s*.5),y=cy-s*.04;
      // öga
      c.fillStyle="#f6f1e2";c.beginPath();c.ellipse(ex,y,R*1.3,R,0,0,TAU);c.fill();c.fillStyle="#4a8fd6";c.beginPath();c.arc(ex+R*.2,y,R*.55,0,TAU);c.fill();c.fillStyle="#10141f";c.beginPath();c.arc(ex+R*.2,y,R*.25,0,TAU);c.fill();
      // hjärna
      c.fillStyle="#f0a0b0";c.beginPath();[[-.5,0,.7],[.2,-.2,.8],[.7,.1,.6],[0,.3,.7],[-.4,.45,.5]].forEach(([dx,dy,r])=>{c.moveTo(bx+dx*R*1.6+r*R,y+dy*R*1.6);c.arc(bx+dx*R*1.6,y+dy*R*1.6,r*R,0,TAU);});c.fill();c.strokeStyle="rgba(120,40,60,.5)";c.lineWidth=2;c.beginPath();c.moveTo(bx-R,y+R*.2);c.quadraticCurveTo(bx,y-R*.4,bx+R*1.1,y+R*.3);c.stroke();
      // synnerv med signaler
      c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=3;c.beginPath();c.moveTo(ex+R*1.3,y);c.lineTo(bx-R*1.4,y);c.stroke();
      for(let i=0;i<5;i++){const p=((t*.5+i/5)%1);c.fillStyle="#ffe27a";c.beginPath();c.arc(lerp(ex+R*1.3,bx-R*1.4,p),y,5,0,TAU);c.fill();}
      const k1=eo((t-3.2)/1),k2=eo((t-4.2)/1);c.globalAlpha=g*k1;tx("ögon",ex,y+R*1.9,"#9fd0ff","center",Math.max(15,s*.04),700);tx("tar emot ljus",ex,y+R*1.9+Math.max(24,s*.055),"#cfe8ff","center",Math.max(12,s*.03),600);
      c.globalAlpha=g*k2;tx("hjärnan",bx,y+R*1.9,"#ffb8c4","center",Math.max(15,s*.04),700);tx("bestämmer vad vi ser",bx,y+R*1.9+Math.max(24,s*.055),"#ffd0d6","center",Math.max(12,s*.03),600);
      c.restore();}};

  /* 2 · Hjärnan gissar: halvt dold cirkel */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,7.1,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;paper(a);
      const R=Math.min(a.w*.14,a.h*.2),px=cx,py=cy-s*.02;c.fillStyle="#d9534f";c.beginPath();c.arc(px,py,R,0,TAU);c.fill();
      c.fillStyle="#3a4260";c.fillRect(px-R*.1,py-R*1.2,R*1.4,R*2.4);
      const k=eo((t-4.2)/1.2);if(k>0){c.save();c.globalAlpha=g*k;c.strokeStyle="#3a4260";c.setLineDash([8,7]);c.lineWidth=3;c.beginPath();c.arc(px,py,R,-Math.PI/2,Math.PI/2,false);c.stroke();c.setLineDash([]);c.restore();tx("hjärnan gissar: en hel cirkel",cx,a.y+a.h*.14,"#3a4260","center",Math.max(17,s*.045),700);check(cx+R*1.8,py,R*.4);}
      c.restore();}};

  /* 3 · Fel gissning: Müller-Lyer */
  const ml=(px,py,w,inward)=>{const c=x();c.save();c.strokeStyle="#2a2f45";c.lineWidth=Math.max(4,w*.012);c.lineCap="round";c.beginPath();c.moveTo(px-w/2,py);c.lineTo(px+w/2,py);c.stroke();const f=w*.1;[[-1],[1]].forEach(([d])=>{const ex=px+d*w/2,dir=inward?-d:d;c.beginPath();c.moveTo(ex,py);c.lineTo(ex+dir*f,py-f*.8);c.moveTo(ex,py);c.lineTo(ex+dir*f,py+f*.8);c.stroke();});c.restore();};
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(5,t,7.2,1.1,.1+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;paper(a);
      const w=Math.min(a.w*.56,s*1.0),y1=cy-s*.1,y2=cy+s*.1;ml(cx,y1,w,true);ml(cx,y2,w,false);
      tx("Vilken är längst?",cx,a.y+a.h*.12,"#3a4260","center",Math.max(18,s*.05),700);
      const k=eo((t-4.8)/1.2);if(k>0){c.save();c.globalAlpha=g*k;c.strokeStyle="#d9534f";c.setLineDash([6,6]);c.lineWidth=3;[-1,1].forEach(d=>{c.beginPath();c.moveTo(cx+d*w/2,y1-s*.1);c.lineTo(cx+d*w/2,y2+s*.1);c.stroke();});c.setLineDash([]);c.restore();tx("lika långa!",cx,y2+s*.2,"#d9534f","center",Math.max(20,s*.055),700);}
      c.restore();}};

  /* 4 · Färger påverkas: samma grå mot ljus och mörk bakgrund */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(4,t,6.7,1.1,.1+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,h=Math.min(a.h*.5,w*.5),y=cy-h/2-s*.03,sq=Math.min(w*.16,h*.5),GR="#8c8c8c";
      c.fillStyle="#e9e9e9";c.fillRect(lx,y,w/2,h);c.fillStyle="#2a2a2a";c.fillRect(cx,y,w/2,h);
      c.fillStyle=GR;c.fillRect(lx+w/4-sq/2,y+h/2-sq/2,sq,sq);c.fillRect(cx+w/4-sq/2,y+h/2-sq/2,sq,sq);
      tx("ljusare?",lx+w/4,y+h-12,"#555","center",Math.max(14,s*.034),700);tx("mörkare?",cx+w/4,y+h-12,"#bbb","center",Math.max(14,s*.034),700);
      const k=eo((t-4.6)/1.2);if(k>0){c.save();c.globalAlpha=g*k;c.fillStyle=GR;c.fillRect(lx+w/4+sq/2,y+h/2-sq*.12,(cx+w/4-sq/2)-(lx+w/4+sq/2),sq*.24);c.restore();tx("samma grå färg",cx,y-14,"#fff","center",Math.max(18,s*.05),700);}
      c.restore();}};

  /* 5 · Mät själv: Ebbinghaus */
  const ebb=(px,py,rc,rn,n,dist,col)=>{const c=x();c.fillStyle="#8a93b8";for(let i=0;i<n;i++){const an=i*TAU/n;c.beginPath();c.arc(px+Math.cos(an)*dist,py+Math.sin(an)*dist,rn,0,TAU);c.fill();}c.fillStyle=col;c.beginPath();c.arc(px,py,rc,0,TAU);c.fill();};
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(6,t,6.6,1.1,.1+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;paper(a);
      const rc=Math.min(a.w*.05,a.h*.075),dx=Math.min(a.w*.22,s*.4),py=cy-s*.04;
      ebb(cx-dx,py,rc,rc*2.1,6,rc*3.8,"#ff9a3c");ebb(cx+dx,py,rc,rc*.55,6,rc*1.9,"#ff9a3c");
      tx("Vilken orange cirkel är störst?",cx,a.y+a.h*.1,"#3a4260","center",Math.max(17,s*.045),700);
      const k=eo((t-4.4)/1.2);if(k>0){c.save();c.globalAlpha=g*k;const ry=py+rc*5.6;c.strokeStyle="#d9534f";c.lineWidth=4;[-dx,dx].forEach(d=>{c.beginPath();c.moveTo(cx+d-rc,ry);c.lineTo(cx+d+rc,ry);c.moveTo(cx+d-rc,ry-8);c.lineTo(cx+d-rc,ry+8);c.moveTo(cx+d+rc,ry-8);c.lineTo(cx+d+rc,ry+8);c.stroke();});c.restore();tx("lika stora!",cx,ry+Math.max(34,s*.075),"#d9534f","center",Math.max(20,s*.055),700);}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5];
}
})();
