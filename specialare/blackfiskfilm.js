/* Bläckfisken: minilektionen som film (sju scener), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/blackfisk/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/blackfisk-1..5.jpg (bild 6 är samma som 1). MPBlackfiskFilm.start(host,{overlay,onClose}). Ljudmatta: havet. */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.8,cap:[[0.5,"Den har åtta armar, tre hjärtan och blått blod. Det här är berättelsen om bläckfisken."]]},
 {k:"01 · Åtta armar, tre hjärtan",d:4.8,cap:[[0.8,"Bläckfisken har åtta armar och tre hjärtan."]]},
 {k:"02 · Blått blod",d:6,cap:[[0.8,"Blodet är blått, eftersom det innehåller koppar i stället för järn."]]},
 {k:"03 · Byter färg",d:6.3,cap:[[0.8,"Den kan ändra färg och mönster på huden på en sekund, för att gömma sig."]]},
 {k:"04 · Smart",d:7.8,cap:[[0.8,"Bläckfiskar är mycket smarta."],[3.5,"De kan öppna burkar och hitta ut ur labyrinter."]]},
 {k:"05 · Bläckmolnet",d:6.8,cap:[[0.8,"När bläckfisken är i fara sprutar den ut ett mörkt bläckmoln och simmar iväg."]]},
 {k:"06 · Mjuk kropp",d:7.2,cap:[[0.8,"Den har inget skal och inget skelett. Därför kan den pressa sig genom mycket trånga hål."]]}
];
const META={mat:"havet",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Bläckfisken",under:"En film i sju steg · ca 1 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Bläckfisken är ett av havets mest märkliga djur. Filmen bygger på riktiga foton ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: H. Zell · CC BY-SA 3.0 · Wikimedia Commons",2:"Foto: Victor Micallef · CC BY-SA 4.0 · Wikimedia Commons",3:"Foto: Kirill Naidenkin · CC BY-SA 4.0 · Wikimedia Commons",4:"Antik kruka med bläckfisk, The Met · CC0 · Wikimedia Commons",5:"Foto: National Marine Sanctuaries (en vampyrbläckfisk, släkting) · Public domain"};

window.MPBlackfiskFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"blackfisk",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"blackfisk-",names:[1,2,3,4,5],KR});
  const {x,tx,tg,S,cred,photo,panel,deep,grad,title}=L;
  const mix=(c1,c2,k)=>{const h=v=>[parseInt(v.slice(1,3),16),parseInt(v.slice(3,5),16),parseInt(v.slice(5,7),16)],a=h(c1),b=h(c2);return"rgb("+a.map((v,i)=>Math.round(lerp(v,b[i],k))).join(",")+")";};
  /* bläckfisk, huvudet uppe, åtta armar neråt. R = huvudets bredd/2. o: col, hearts (0..1), flat (0..1 = hopplattad), armsOut */
  const octo=(cx,cy,R,t,o)=>{const c=x();o=o||{};c.save();c.lineCap="round";c.lineJoin="round";
    const col=o.col||"#d9704f",flat=o.flat||0,sx=1+flat*.9,sy=1-flat*.45;
    // armar
    for(let i=0;i<8;i++){const base=-.9+i*(1.8/7),len=R*(2.1-Math.abs(i-3.5)*.1);c.strokeStyle=col;
      const N=16;let px=cx+Math.sin(base)*R*.7*sx,py=cy+R*.7*sy;for(let k=1;k<=N;k++){const q=k/N,wig=Math.sin(t*2.4+i*.9-q*5)*R*.22*q,tx2=cx+Math.sin(base)*R*(.7+q*1.1)*(o.spread||1)*sx+wig,ty2=cy+R*.7*sy+q*len*(.8+Math.cos(base)*.2);
        c.lineWidth=Math.max(1.5,R*.22*(1-q*.85));c.beginPath();c.moveTo(px,py);c.lineTo(tx2,ty2);c.stroke();px=tx2;py=ty2;}}
    // huvud
    c.fillStyle=col;c.beginPath();c.ellipse(cx,cy,R*sx,R*1.1*sy,0,0,TAU);c.fill();
    c.fillStyle="rgba(255,255,255,.14)";c.beginPath();c.ellipse(cx-R*.3*sx,cy-R*.45*sy,R*.22,R*.32*sy,-.4,0,TAU);c.fill();
    // ögon
    [[-.42],[.42]].forEach(([d])=>{c.fillStyle="#f6f1e2";c.beginPath();c.ellipse(cx+d*R*sx,cy+R*.22*sy,R*.2,R*.2*sy,0,0,TAU);c.fill();c.fillStyle="#111";c.beginPath();c.rect(cx+d*R*sx-R*.14,cy+R*.22*sy-R*.04,R*.28,R*.08);c.fill();});
    // hjärtan
    if(o.hearts>0){const beat=1+.12*Math.pow(Math.max(0,Math.sin(t*4.5)),3);[[-.32,-.45],[.32,-.45],[0,-.05]].forEach(([dx,dy],i)=>{const hr=R*.2*beat*cl(o.hearts*3-i,0,1);if(hr<=0)return;const hx=cx+dx*R,hy=cy+dy*R;c.fillStyle="#ff4d5e";c.beginPath();c.moveTo(hx,hy+hr*.9);c.bezierCurveTo(hx-hr*1.7,hy-hr*.1,hx-hr*.9,hy-hr*1.2,hx,hy-hr*.45);c.bezierCurveTo(hx+hr*.9,hy-hr*1.2,hx+hr*1.7,hy-hr*.1,hx,hy+hr*.9);c.fill();});}
    c.restore();};
  const drop=(px,py,r,col)=>{const c=x();c.save();c.fillStyle=col;c.beginPath();c.moveTo(px,py-r*1.5);c.bezierCurveTo(px+r*.2,py-r*.8,px+r,py-r*.2,px+r,py+r*.4);c.arc(px,py+r*.4,r,0,Math.PI);c.bezierCurveTo(px-r,py-r*.2,px-r*.2,py-r*.8,px,py-r*1.5);c.fill();c.fillStyle="rgba(255,255,255,.25)";c.beginPath();c.ellipse(px-r*.35,py+r*.1,r*.15,r*.3,.3,0,TAU);c.fill();c.restore();};

  const s0=(t)=>{photo(1,t,6.8,1.12,.3);const f=title(t,"BLÄCKFISKEN","HAVETS MÄSTARE PÅ SMYGANDE","#cfe8ff");cred(1,.55*f);};

  /* 1 · Åtta armar och tre hjärtan */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2)/1);photo(2,t,4.8,1.1,.1+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t);
      const R=Math.min(a.w*.18,a.h*.2);octo(cx,cy-R*.35,R*.9,t,{hearts:cl((t-3.6)/1.2,0,1)});
      const n=Math.max(0,Math.min(8,Math.floor((t-2.6)/.2)));tx(n?n+" armar":"",cx,a.y+a.h*.1,"#ffd86b","center",Math.max(20,s*.055),700);
      if(t>3.6)tx("3 hjärtan",cx,a.y+a.h*.1+Math.max(34,s*.075),"#ff9aa4","center",Math.max(18,s*.048),700);
      c.restore();}};

  /* 2 · Blått blod: järn mot koppar */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();deep(a,t);
    const r=Math.min(s*.1,a.w*.1),dx=Math.min(a.w*.2,s*.34),y=cy-s*.04,k1=eo((t-1)/1),k2=eo((t-2.2)/1);
    c.save();c.globalAlpha=k1;drop(cx-dx,y,r*(.6+.4*k1),"#d84a56");tx("Människa",cx-dx,y+r*2.3,"#ffb0b8","center",Math.max(15,s*.038),700);tx("järn",cx-dx,y+r*2.3+Math.max(30,s*.07),"#fff","center",Math.max(18,s*.048),700);c.restore();
    c.save();c.globalAlpha=k2;drop(cx+dx,y,r*(.6+.4*k2),"#3f8fe8");tx("Bläckfisk",cx+dx,y+r*2.3,"#a9ccf2","center",Math.max(15,s*.038),700);tx("koppar",cx+dx,y+r*2.3+Math.max(30,s*.07),"#fff","center",Math.max(18,s*.048),700);c.restore();
    tx("blått blod",cx,a.y+a.h*.14,"#7ec8ff","center",Math.max(22,s*.06),700);};

  /* 3 · Byter färg: foto, sedan en bläckfisk som matchar bakgrunden */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1);photo(3,t,6.3,1.1,.1+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;
      const bgs=[["#3a6e4a","#8cc08c"],["#8a6a3a","#e0c28a"],["#35507a","#7fa6d6"]],i=Math.floor(Math.max(0,t-2.6)/1.2)%3,j=(i+1)%3,ph=((t-2.6)%1.2)/1.2,k=ph>.75?(ph-.75)*4:0;
      const bg=bgs[i],nb=bgs[j];grad(a,[[0,mix(bg[0],nb[0],k)],[1,mix(bg[0],nb[0],k)]]);
      const rnd=L.srand(4);for(let n=0;n<60;n++){c.fillStyle=mix(bg[1],nb[1],k);c.globalAlpha=g*.5;c.beginPath();c.arc(a.x+rnd()*a.w,a.y+rnd()*a.h,3+rnd()*7,0,TAU);c.fill();}
      c.globalAlpha=g;const R=Math.min(a.w*.16,a.h*.2);octo(cx,cy-R*.9,R,t,{col:mix(bg[1],nb[1],k)});
      tx("på en sekund",cx,a.y+a.h*.1,"#fff","center",Math.max(20,s*.055),700);
      c.restore();}};

  /* 4 · Smart: foto, sedan burk och labyrint */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1);photo(4,t,7.8,1.1,.1+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);
      const u=Math.min(a.w*(port?.34:.2),s*.34),bx=cx-(port?u*1.0:u*1.6),by=cy-s*.02;
      // burk med lock som lyfts
      if(t>3.5){const q=eo((t-3.5)/1.2),lid=Math.max(0,Math.sin(Math.PI*cl((t-4.5)/1.6,0,1)))*u*.4;c.globalAlpha=g*q;c.fillStyle="rgba(170,210,235,.35)";c.strokeStyle="#bfe3f5";c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(bx-u*.4,by-u*.5,u*.8,u,10):c.rect(bx-u*.4,by-u*.5,u*.8,u);c.fill();c.stroke();c.fillStyle="#d9a14a";c.fillRect(bx-u*.45,by-u*.62-lid,u*.9,u*.14);c.fillStyle="#ff9a6b";c.beginPath();c.ellipse(bx,by+u*.2,u*.2,u*.16,0,0,TAU);c.fill();tx("öppnar burkar",bx,by+u*.85,"#ffd86b","center",Math.max(13,s*.032),700);}
      // labyrint
      if(t>3.8){const q=eo((t-3.8)/1.2),mw=u*1.5,mx=cx+(port?u*1.1:u*1.6)-mw/2,my=by-mw/2,cell=mw/5;c.globalAlpha=g*q;c.strokeStyle="#9fb4ff";c.lineWidth=3;c.lineCap="round";
        const walls=[[0,0,5,0],[0,5,5,5],[0,0,0,5],[5,0,5,4],[1,0,1,3],[2,1,2,5],[3,0,3,3],[4,2,4,5],[1,3,2,3],[3,3,4,3],[0,1,1,1],[3,1,4,1]];walls.forEach(([x1,y1,x2,y2])=>{c.beginPath();c.moveTo(mx+x1*cell,my+y1*cell);c.lineTo(mx+x2*cell,my+y2*cell);c.stroke();});
        const path=[[.5,5.5],[.5,3.5],[1.5,3.5],[1.5,1.5],[2.5,.5],[2.5,0.4],[3.5,.5],[3.5,2.5],[4.5,2.5],[4.5,4.5],[5.4,4.5]],p=cl((t-4.4)/2.6,0,1),seg=p*(path.length-1),i0=Math.min(path.length-2,Math.floor(seg)),f=seg-i0,ppx=mx+lerp(path[i0][0],path[i0+1][0],f)*cell,ppy=my+lerp(path[i0][1],path[i0+1][1],f)*cell;
        c.fillStyle="#ff9a6b";c.beginPath();c.arc(ppx,ppy,Math.max(5,cell*.2),0,TAU);c.fill();tx("hittar ut ur labyrinter",mx+mw/2,my+mw+Math.max(28,s*.065),"#ffd86b","center",Math.max(13,s*.032),700);}
      c.restore();}};

  /* 5 · Bläckmolnet: foto, sedan flykt med bläck */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1);photo(5,t,6.8,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;deep(a,t);
      const R=Math.min(a.w*.12,a.h*.16),p=eo((t-2.8)/3.2),ox=lerp(a.x+a.w*.3,a.x+a.w*.72,p),oy=cy-s*.02;
      // bläckmoln bakom
      const inkT=cl((t-2.8)/1.2,0,1),rnd=L.srand(8);for(let i=0;i<14;i++){const bx=a.x+a.w*.3+rnd()*a.w*.2*inkT,by=oy+(rnd()-.5)*R*3*inkT,r=R*(.5+rnd()*.9)*inkT;const gr=c.createRadialGradient(bx,by,0,bx,by,Math.max(1,r));gr.addColorStop(0,"rgba(5,5,12,.85)");gr.addColorStop(1,"rgba(5,5,12,0)");c.fillStyle=gr;c.beginPath();c.arc(bx,by,Math.max(1,r),0,TAU);c.fill();}
      c.save();c.translate(ox,oy);c.rotate(Math.PI/2*.9);octo(0,0,R,t*2.5,{col:"#d9704f",spread:.7});c.restore();
      tx("bläckmoln!",a.x+a.w*.3,a.y+a.h*.16,"#ffd86b","center",Math.max(20,s*.055),700);
      c.restore();}};

  /* 6 · Mjuk kropp: kryper genom ett litet hål */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();deep(a,t);
    const wx=cx,gap=Math.max(26,s*.07),wy0=cy-gap/2-s*.02,ww=Math.max(24,s*.05);
    c.fillStyle="#4a5568";c.fillRect(wx-ww/2,a.y,ww,wy0-a.y);c.fillRect(wx-ww/2,wy0+gap,ww,a.y+a.h-(wy0+gap));
    const R=Math.min(a.w*.1,a.h*.12),p=eo((t-1.4)/4.8),ox=lerp(a.x+a.w*.2,a.x+a.w*.8,p),dist=Math.abs(ox-wx),flat=cl(1-dist/(R*2.2),0,1);
    octo(ox,wy0+gap/2-R*.2,R,t*1.5,{col:"#d9704f",flat,spread:1-flat*.5});
    tx("inget skal, inget skelett",cx,a.y+a.h*.1,"#fff","center",Math.max(18,s*.05),700);tx("pressar sig genom trånga hål",cx,a.y+a.h*.1+Math.max(34,s*.075),"#ffd86b","center",Math.max(15,s*.04),700);};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
