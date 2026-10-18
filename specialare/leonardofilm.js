/* Leonardo da Vinci: minilektionen som film (sju scener), målningar och teckningar ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/leonardo/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/leonardo-1..6.jpg. MPLeonardoFilm.start(host,{overlay,onClose}). Ljudmatta: slott (vind och sprakande). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:8.2,cap:[[0.5,"Han var konstnär, uppfinnare och forskare, allt på en gång. Det här är berättelsen om Leonardo da Vinci."]]},
 {k:"01 · Över 500 år sedan",d:12.4,cap:[[0.8,"Leonardo da Vinci levde i Italien för över 500 år sedan, från 1452 till 1519."],[9.1,"Han är mest känd för målningen Mona Lisa."]]},
 {k:"02 · Mona Lisa",d:10.6,cap:[[0.8,"Mona Lisa hänger i Louvren i Paris och ses av miljontals människor varje år."],[6.5,"Hennes leende har fascinerat folk i hundratals år."]]},
 {k:"03 · Spegelskrift",d:9.5,cap:[[0.8,"Leonardo skrev sina anteckningar i spegelskrift, från höger till vänster."],[6.2,"Man måste använda en spegel för att läsa dem."]]},
 {k:"04 · Flygmaskiner",d:10.8,cap:[[0.8,"Han ritade flygmaskiner, fallskärmar och pansarvagnar."],[4.5,"Det mesta byggdes aldrig på hans tid, men många idéer liknar saker som kom senare."]]},
 {k:"05 · Kroppen",d:8.8,cap:[[0.8,"Leonardo undersökte människokroppen för att kunna måla den rätt. Hans teckningar av muskler och ben är mycket exakta."]]},
 {k:"06 · Tusentals sidor",d:8.9,cap:[[0.8,"Av hans anteckningsböcker finns ungefär 7 000 sidor kvar, fulla av teckningar, idéer och tankar."]]}
];
const META={mat:"slott",hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Leonardo da Vinci",under:"En film i sju steg · ca 1,5 minut",
  slutRubrik:"Tack för att du har följt med",slutText:"Leonardo var nyfiken på allt. Filmen bygger på målningar och teckningar ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Leonardo da Vinci, Mona Lisa · Public domain · Wikimedia Commons",2:"Leonardo da Vinci (trolig självporträtt) · Public domain · Wikimedia Commons",3:"Leonardo da Vinci, skiss · Public domain · Wikimedia Commons",4:"Leonardo da Vinci, ritning av en flygmaskin · Public domain · Wikimedia Commons",5:"Leonardo da Vinci, Den vitruvianske mannen (foto: Paris Orlando · CC BY-SA 4.0)",6:"Leonardo da Vinci, anatomistudie av axel och nacke · Public domain · Wikimedia Commons"};

window.MPLeonardoFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"leonardo",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"leonardo-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,man,title}=L;
  const parch=(a)=>grad(a,[[0,"#efe0bc"],[1,"#dcc895"]]);
  const pill=(t,px,py,col,sz,al)=>{const c=x();c.save();c.font=font(700,sz);const w=c.measureText(t).width+22,h=sz+14;c.globalAlpha=al==null?1:al;c.fillStyle="rgba(6,10,22,.8)";c.beginPath();c.roundRect?c.roundRect(px-w/2,py-h/2,w,h,h/2):c.rect(px-w/2,py-h/2,w,h);c.fill();c.fillStyle=col;c.textAlign="center";c.fillText(t,px,py+sz*.35);c.restore();};

  const s0=(t)=>{photo(5,t,8.2,1.1,.3);const f=title(t,"LEONARDO DA VINCI","KONSTNÄR · UPPFINNARE · FORSKARE","#ffe0a8");cred(5,.55*f);};

  /* 1 · Över 500 år sedan: självporträtt, sedan livslinje */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(2,t,12.4,1.08,.1+.4*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;parch(a);
      const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,y=cy-s*.02,bh=Math.max(26,s*.07),px=yr=>lx+(yr-1440)/(1530-1440)*w;
      [[1450,"1450"],[1500,"1500"],[1520,"1520"]].forEach(([yr,l])=>{c.strokeStyle="rgba(60,40,20,.5)";c.lineWidth=1.5;c.beginPath();c.moveTo(px(yr),y-8);c.lineTo(px(yr),y+bh+8);c.stroke();tx(l,px(yr),y+bh+Math.max(28,s*.065),"#5a3a1e","center",Math.max(12,s*.03),700);});
      const k=eo((t-3.4)/2.2);c.fillStyle="#b9722a";c.fillRect(px(1452),y,(px(1519)-px(1452))*k,bh);tx("1452 – 1519",(px(1452)+px(1519))/2,y+bh*.68,"#fff","center",Math.max(15,s*.04),700);
      tx("för över 500 år sedan",cx,a.y+a.h*.14,"#3a2410","center",Math.max(19,s*.052),700);
      if(t>9.1){const q=eo((t-9.1)/1);c.globalAlpha=g*q;c.fillStyle="#8a1f1f";c.beginPath();c.arc(px(1503),y-14,8,0,TAU);c.fill();tx("Mona Lisa ca 1503",px(1503),y-34,"#8a1f1f","center",Math.max(14,s*.034),700);}
      c.restore();}};

  /* 2 · Mona Lisa: målningen, Louvren och många besökare */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();photo(1,t,10.6,1.1,.15);cred(1,.55);
    const k=eo((t-2.6)/1);if(k>0){pill("Louvren, Paris",cx,a.y+a.h*.12,"#ffe0a8",Math.max(18,s*.048),k);}
    if(t>3.2){const n=Math.round(40*eo((t-3.2)/3)),r=L.srand(23);for(let i=0;i<n;i++){const px=a.x+a.w*(.06+.88*(i+r()*.4)/40),hm=Math.max(34,s*.09);man(px,a.y+a.h*.98,hm*(.8+r()*.3),"rgba(250,240,220,.85)",t+i,false);}tx("miljontals besökare varje år",cx,a.y+a.h*.8,"#fff","center",Math.max(15,s*.04),700);}
    if(t>6.5){const q=eo((t-6.5)/1);pill("ett leende i hundratals år",cx,a.y+a.h*.22,"#fff",Math.max(16,s*.042),q);}};

  /* 3 · Spegelskrift: spegelvänd text och en spegel */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,9.5,1.1,.15+.4*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;parch(a);
      const fs=Math.max(26,s*.075),lines=["Leonardo da Vinci","Jag är nyfiken","på allt"],x0=cx+Math.min(a.w*.3,s*.5),y0=a.y+a.h*.3;
      c.font=`italic 600 ${fs}px "Source Serif 4",Georgia,serif`;c.fillStyle="#3a2410";
      lines.forEach((ln,i)=>{const q=eo((t-3.2-i*.5)/.6);c.save();c.globalAlpha=g*q;c.translate(x0,y0+i*fs*1.3);c.scale(-1,1);c.textAlign="left";c.fillText(ln,0,0);c.restore();});
      tx("skrivet från höger till vänster",cx,a.y+a.h*.12,"#5a3a1e","center",Math.max(15,s*.04),700);
      if(t>6.2){const q=eo((t-6.2)/1.2),mw=Math.min(a.w*.5,s*.9),mh=fs*4.6,mx=lerp(a.x+a.w+20,cx-mw/2-a.w*.02,q),my=y0-fs*.9;c.save();c.globalAlpha=g*q;c.fillStyle="rgba(200,230,255,.55)";c.strokeStyle="#7a5a30";c.lineWidth=5;c.fillRect(mx,my+fs*3.2,mw,mh*.55);c.strokeRect(mx,my+fs*3.2,mw,mh*.55);
        c.font=`italic 600 ${fs}px "Source Serif 4",Georgia,serif`;c.fillStyle="#1b3b6a";c.textAlign="left";c.fillText("Leonardo da Vinci",mx+12,my+fs*4.6);tx("i spegeln",mx+mw/2,my+fs*3.2-10,"#3a2410","center",Math.max(13,s*.032),700);c.restore();}
      c.restore();}};

  /* 4 · Flygmaskiner, fallskärm, pansarvagn */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.6)/1.1);photo(4,t,10.8,1.1,.15+.4*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;parch(a);
      const dx=Math.min(a.w*.26,s*.46),y=cy-s*.02,u=Math.max(46,s*.14);c.strokeStyle="#4a3018";c.fillStyle="#b9722a";c.lineWidth=3;c.lineJoin="round";
      const k1=eo((t-2.9)/.7);c.save();c.globalAlpha=g*k1;const fl=Math.sin(t*5)*u*.25;c.beginPath();c.moveTo(cx-dx,y);c.lineTo(cx-dx-u,y-u*.5+fl);c.lineTo(cx-dx-u*.7,y+u*.1+fl*.3);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(cx-dx,y);c.lineTo(cx-dx+u,y-u*.5+fl);c.lineTo(cx-dx+u*.7,y+u*.1+fl*.3);c.closePath();c.fill();c.stroke();c.fillStyle="#4a3018";c.fillRect(cx-dx-u*.12,y-u*.1,u*.24,u*.5);tx("flygmaskin",cx-dx,y+u*.9,"#4a3018","center",Math.max(14,s*.034),700);c.restore();
      const k2=eo((t-3.5)/.7);c.save();c.globalAlpha=g*k2;c.fillStyle="#d9b878";c.beginPath();c.moveTo(cx,y-u*.6);c.lineTo(cx-u*.6,y+u*.1);c.lineTo(cx+u*.6,y+u*.1);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(cx-u*.6,y+u*.1);c.lineTo(cx,y+u*.7);c.moveTo(cx+u*.6,y+u*.1);c.lineTo(cx,y+u*.7);c.stroke();tx("fallskärm",cx,y+u*1.2,"#4a3018","center",Math.max(14,s*.034),700);c.restore();
      const k3=eo((t-4.1)/.7);c.save();c.globalAlpha=g*k3;c.fillStyle="#8a6a3a";c.beginPath();c.moveTo(cx+dx-u*.8,y+u*.3);c.lineTo(cx+dx-u*.5,y-u*.35);c.lineTo(cx+dx+u*.5,y-u*.35);c.lineTo(cx+dx+u*.8,y+u*.3);c.closePath();c.fill();c.stroke();for(let i=0;i<5;i++){const an=-Math.PI*.9+i*Math.PI*.45*.9;c.beginPath();c.moveTo(cx+dx,y-u*.35);c.lineTo(cx+dx+Math.cos(an)*u*.9,y-u*.35+Math.sin(an)*u*.9*.2-u*.15);c.stroke();}tx("pansarvagn",cx+dx,y+u*.9,"#4a3018","center",Math.max(14,s*.034),700);c.restore();
      if(t>4.8){const q=eo((t-4.8)/1);c.globalAlpha=g*q;tx("idéer före sin tid",cx,a.y+a.h*.14,"#3a2410","center",Math.max(19,s*.052),700);}
      c.restore();}};

  /* 5 · Kroppen: den vitruvianske mannen */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-3)/1.1);photo(6,t,8.8,1.08,.15+.4*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;parch(a);
      const R=Math.min(a.h*.34,a.w*.22),px=cx,py=cy-s*.02,k=eo((t-3.4)/1.6);c.strokeStyle="#4a3018";c.lineWidth=3;
      c.beginPath();c.arc(px,py,R*k,0,TAU);c.stroke();c.strokeRect(px-R*.86,py-R*.86,R*1.72,R*1.72);
      // figur: armar och ben i två lägen
      c.lineWidth=4;c.lineCap="round";c.beginPath();c.arc(px,py-R*.6,R*.1,0,TAU);c.stroke();c.beginPath();c.moveTo(px,py-R*.5);c.lineTo(px,py+R*.1);c.stroke();
      [[-1],[1]].forEach(([d])=>{c.beginPath();c.moveTo(px,py-R*.38);c.lineTo(px+d*R*.8,py-R*.38);c.stroke();c.beginPath();c.moveTo(px,py-R*.38);c.lineTo(px+d*R*.78,py-R*.7);c.stroke();c.beginPath();c.moveTo(px,py+R*.1);c.lineTo(px+d*R*.3,py+R*.86);c.stroke();c.beginPath();c.moveTo(px,py+R*.1);c.lineTo(px+d*R*.15,py+R*.86);c.stroke();});
      tx("exakta proportioner",cx,a.y+a.h*.12,"#3a2410","center",Math.max(19,s*.052),700);
      c.restore();}};

  /* 6 · Tusentals sidor: sidor som staplas upp mot 7 000 */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();parch(a);
    const k=eo((t-1.2)/5),n=Math.round(7000*k),cols=port?10:20,rows=14,cw=Math.min(a.w*.8/cols,(a.h*.58)/(rows*1.3)),ch=cw*1.3,gx=cx-cols*cw/2,gy=a.y+a.h*.2,total=cols*rows,vis=Math.round(total*k);
    for(let i=0;i<vis;i++){const col=i%cols,row=Math.floor(i/cols),px=gx+col*cw,py=gy+row*ch;c.fillStyle="#fbf5e3";c.strokeStyle="rgba(90,58,30,.5)";c.lineWidth=1;c.fillRect(px+2,py+2,cw-4,ch-4);c.strokeRect(px+2,py+2,cw-4,ch-4);c.strokeStyle="rgba(90,58,30,.3)";for(let l=0;l<3;l++){c.beginPath();c.moveTo(px+5,py+ch*.3+l*ch*.2);c.lineTo(px+cw-5,py+ch*.3+l*ch*.2);c.stroke();}}
    tx(n.toLocaleString("sv-SE").replace(/ /g," ")+" sidor",cx,a.y+a.h*.1,"#3a2410","center",Math.max(24,s*.07),700);
    tx("teckningar, idéer och tankar",cx,gy+rows*ch+Math.max(34,s*.075),"#5a3a1e","center",Math.max(15,s*.04),700);};

  return[s0,s1,s2,s3,s4,s5,s6];
}
})();
