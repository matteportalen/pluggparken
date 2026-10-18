/* Bitcoin: minilektionen som film (åtta scener, ca 1,6 minuter), bilder ur Wikimedia Commons blandade med egen grafik (canvas). Sakligt, ingen köprekommendation.
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/bitcoin/s<scen>-<replik>.mp3 (ElevenLabs, Paul Axel).
   Bilderna: bilder/bitcoin-1..6.jpg. MPBitcoinFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:6.3,cap:[[0.5,"Pengar som bara finns på datorer. Det här är berättelsen om Bitcoin."]]},
 {k:"01 · Pengar på datorn",d:10.5,cap:[[0.8,"Bitcoin är pengar som bara finns på datorer. Du kan inte hålla dem i handen."],[6.1,"Man kan skicka dem över internet, utan att någon bank är med."]]},
 {k:"02 · Satoshi Nakamoto",d:9.9,cap:[[0.8,"Bitcoin startade år 2009. Den som skapade det kallade sig Satoshi Nakamoto."],[7.2,"Ingen vet vem det egentligen är."]]},
 {k:"03 · Blockkedjan",d:15.9,cap:[[0.8,"Ingen bank eller regering styr Bitcoin. Tusentals datorer håller reda på vem som äger vad, i en gemensam bok som kallas blockkedjan."],[11.4,"Ungefär var tionde minut läggs ett nytt block till i kedjan."]]},
 {k:"04 · Bara 21 miljoner",d:14.2,cap:[[0.8,"Det kommer aldrig att finnas fler än 21 miljoner bitcoin. Det gör dem sällsynta, lite som guld."],[8.1,"Den sista bitcoinen beräknas skapas runt år 2140."]]},
 {k:"05 · Pizzan",d:11,cap:[[0.8,"Den 22 maj 2010 köpte någon två pizzor för 10 000 bitcoin."],[7.3,"Idag skulle de vara värda enormt mycket pengar."]]},
 {k:"06 · Priset",d:11.4,cap:[[0.8,"Priset går upp och ner väldigt snabbt. Flera gånger har det fallit med mer än hälften på kort tid."],[8.7,"Man kan förlora mycket pengar."]]},
 {k:"07 · Var försiktig",d:9.3,cap:[[0.8,"Att skapa nya bitcoin kräver också mycket el, så det diskuteras ur miljösynpunkt. Fråga alltid en vuxen först."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Bitcoin",under:"En film i åtta steg · ca 1,6 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Bitcoin är pengar utan bank, men det är ingen leksak. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Shixart1985 (mynt och dator) · CC BY 2.0 · Wikimedia Commons",2:"Bild: Elekes Andor (Satoshi Nakamoto, konstnärlig bild) · CC BY-SA 4.0 · Wikimedia Commons",3:"Bild: Shivratan rajvi (blockkedja) · CC BY-SA 4.0 · Wikimedia Commons",4:"Foto: Stevebidmead (guldtackor) · CC0 · Wikimedia Commons",5:"Foto: Rhododendrites (pizza) · CC BY-SA 4.0 · Wikimedia Commons",6:"Diagram: Fabo.Hax (Bitcoins pris) · CC BY-SA 4.0 · Wikimedia Commons"};

window.MPBitcoinFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"bitcoin",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"bitcoin-",names:[1,2,3,4,5,6],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const coin=(px,py,r,al)=>{const c=x();c.save();c.globalAlpha*=al==null?1:al;c.fillStyle="#f7931a";c.strokeStyle="#b86a0e";c.lineWidth=Math.max(2,r*.12);c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.stroke();c.fillStyle="#fff";c.font=`700 ${Math.round(r*1.3)}px "Source Serif 4",Georgia,serif`;c.textAlign="center";c.textBaseline="middle";c.fillText("₿",px,py+r*.06);c.restore();};
  const laptop=(px,py,u)=>{const c=x();c.save();c.fillStyle="#2a3550";c.fillRect(px-u*1.6,py-u*1.1,u*3.2,u*2.1);c.fillStyle="#0f1a30";c.fillRect(px-u*1.45,py-u*.95,u*2.9,u*1.8);c.fillStyle="#b8bfd0";c.fillRect(px-u*2,py+u*1.05,u*4,u*.22);c.restore();};

  const s0=(t)=>{photo(1,t,6.3,1.12,.3);const f=title(t,"BITCOIN","PENGAR PÅ DATORER","#ffcf8a");cred(1,.55*f);};

  /* 1 · pengar på datorn, utan bank */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(1,t,10.5,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const u=Math.max(18,Math.min(a.w*.04,s*.05));
      if(t<6.1){laptop(cx,cy,u*1.6);coin(cx,cy-u*.1,u*.9,eo((t-3)/.8));tx("finns bara på datorer",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(19,s*.052),700);}
      else{const k=cl((t-6.5)/3,0,1),lx=cx-a.w*.3,rx=cx+a.w*.3;laptop(lx,cy+u*.6,u);laptop(rx,cy+u*.6,u);c.strokeStyle="rgba(255,255,255,.35)";c.setLineDash([6,8]);c.lineWidth=2;c.beginPath();c.moveTo(lx+u*2.2,cy);c.lineTo(rx-u*2.2,cy);c.stroke();c.setLineDash([]);coin(lerp(lx+u*2.2,rx-u*2.2,eo(k)),cy,u*.5);
        const bx=cx,by=a.y+a.h*.3;c.fillStyle="rgba(180,190,210,.5)";c.fillRect(bx-u*1.2,by-u*.7,u*2.4,u*1.4);c.beginPath();c.moveTo(bx-u*1.4,by-u*.7);c.lineTo(bx,by-u*1.5);c.lineTo(bx+u*1.4,by-u*.7);c.closePath();c.fill();c.strokeStyle="#ff6a5e";c.lineWidth=6;c.beginPath();c.moveTo(bx-u*1.5,by-u*1.4);c.lineTo(bx+u*1.5,by+u*.8);c.moveTo(bx+u*1.5,by-u*1.4);c.lineTo(bx-u*1.5,by+u*.8);c.stroke();tx("ingen bank",bx,by+u*2.2,"#ff9a8a","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 2 · Satoshi Nakamoto: okänd */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(2,t,9.9,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const r=Math.max(40,Math.min(a.w*.1,a.h*.18,s*.16));
      tx("2009",cx,a.y+a.h*.16,"#ffd86b","center",Math.max(30,s*.085),700);
      c.fillStyle="#2a3550";c.beginPath();c.arc(cx,cy-r*.3,r*.7,0,TAU);c.fill();c.beginPath();c.moveTo(cx-r*1.4,cy+r*1.8);c.quadraticCurveTo(cx-r*1.3,cy+r*.4,cx,cy+r*.4);c.quadraticCurveTo(cx+r*1.3,cy+r*.4,cx+r*1.4,cy+r*1.8);c.closePath();c.fill();
      tx("?",cx,cy-r*.15,"#f7931a","center",Math.max(40,r*1.1),700);tx("Satoshi Nakamoto",cx,cy+r*2.4,"#fff","center",Math.max(20,s*.055),700);
      if(t>7.2){c.globalAlpha=g*eo((t-7.2)/1);tx("ingen vet vem det är",cx,cy+r*2.4+Math.max(36,s*.08),"#ffb878","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 3 · blockkedjan */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,15.9,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const bw=Math.max(40,Math.min(a.w*.12,s*.16)),gap=bw*.35,n=Math.max(3,Math.floor(a.w*.88/(bw+gap))),n2=Math.min(n,6),lx=cx-(n2*bw+(n2-1)*gap)/2,y=cy-bw*.5;
      const cnt=Math.min(n2,1+Math.floor((t-3)/1.1)+(t>11.4?1:0));
      for(let i=0;i<Math.max(1,cnt);i++){const q=eo((t-3-i*1.1)/.6);if(q<=0&&i>0)continue;const px=lx+i*(bw+gap);c.save();c.globalAlpha=g*(i===0?1:Math.max(q,0));c.fillStyle="rgba(247,147,26,.18)";c.strokeStyle="#f7931a";c.lineWidth=3;c.fillRect(px,y,bw,bw);c.strokeRect(px,y,bw,bw);tx("block "+(i+1),px+bw/2,y+bw*.55,"#ffd86b","center",Math.max(12,bw*.2),700);if(i>0){c.strokeStyle="#9fd0ff";c.lineWidth=4;c.beginPath();c.moveTo(px-gap,y+bw/2);c.lineTo(px,y+bw/2);c.stroke();}c.restore();}
      tx("en gemensam bok som alla datorer har",cx,a.y+a.h*.14,"#cfd8ff","center",Math.max(17,s*.045),700);
      if(t>11.4){c.globalAlpha=g*eo((t-11.4)/1);const sec=Math.min(10,Math.floor((t-11.4)*2.6));tx("nytt block ungefär var 10:e minut",cx,y+bw+Math.max(54,s*.12),"#ffd86b","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 4 · 21 miljoner, 2140 */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,14.2,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);const w=Math.min(a.w*.8,s*1.5),lx=cx-w/2,bh=Math.max(30,s*.08),y=cy-bh/2;
      tx("21 000 000",cx,a.y+a.h*.16,"#f7931a","center",Math.max(34,s*.1),700);
      c.fillStyle="rgba(255,255,255,.1)";c.strokeStyle="rgba(255,255,255,.5)";c.lineWidth=2;c.fillRect(lx,y,w,bh);c.strokeRect(lx,y,w,bh);const k=eo((t-3.2)/3.5);c.fillStyle="#f7931a";c.fillRect(lx,y,w*k*.94,bh);tx("aldrig fler",cx,y+bh+Math.max(34,s*.08),"#cfd8ff","center",Math.max(16,s*.042),700);
      if(t>8.1){const q=eo((t-8.1)/1),ty=a.y+a.h*.8;c.globalAlpha=g*q;const tw=Math.min(w,s*1.2),tl=cx-tw/2,px=yr=>tl+(yr-2009)/(2140-2009)*tw;c.strokeStyle="rgba(255,255,255,.5)";c.lineWidth=3;c.beginPath();c.moveTo(tl,ty);c.lineTo(tl+tw,ty);c.stroke();dot(px(2009),ty,7,"#9fd0ff");dot(px(2140),ty,8,"#f7931a");tx("2009",px(2009),ty+Math.max(26,s*.06),"#9fd0ff","center",Math.max(13,s*.034),700);tx("2140: den sista",px(2140),ty+Math.max(26,s*.06),"#ffb878","center",Math.max(13,s*.034),700);}
      c.restore();}};

  /* 5 · pizzan */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(5,t,11,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#1a1020"],[1,"#2a1a18"]]);const r=Math.max(40,Math.min(a.w*.1,a.h*.18,s*.16));
      tx("22 maj 2010",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(24,s*.07),700);
      const px=cx-r*1.6;for(let i=0;i<2;i++){const ox=px+i*r*1.2,oy=cy;c.fillStyle="#e8b868";c.beginPath();c.arc(ox,oy,r,0,TAU);c.fill();c.fillStyle="#d93a3a";c.beginPath();c.arc(ox,oy,r*.82,0,TAU);c.fill();c.fillStyle="#f5e6a0";c.beginPath();c.arc(ox,oy,r*.76,0,TAU);c.fill();c.fillStyle="#b83030";for(let j=0;j<7;j++){const an=j*TAU/7+i;c.beginPath();c.arc(ox+Math.cos(an)*r*.45,oy+Math.sin(an)*r*.45,r*.12,0,TAU);c.fill();}}
      tx("2 pizzor",px+r*.6,cy+r*1.5,"#fff","center",Math.max(15,s*.04),700);
      const k=eo((t-3.4)/2.4);coin(cx+r*2.6,cy,r*.55);tx("= "+Math.round(10000*k).toLocaleString("sv-SE").replace(/ /g," ")+" bitcoin",cx+r*2.6,cy+r*1.1,"#f7931a","center",Math.max(18,s*.05),700);
      if(t>7.3){c.globalAlpha=g*eo((t-7.3)/1);tx("idag: enormt mycket mer värda",cx,a.y+a.h*.88,"#9be3b0","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 6 · priset går upp och ner */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,11.4,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;panel(a,1);const w=Math.min(a.w*.82,s*1.5),h=Math.min(a.h*.46,s*.6),lx=cx-w/2,y0=cy+h*.5;
      c.strokeStyle="rgba(255,255,255,.5)";c.lineWidth=2;c.beginPath();c.moveTo(lx,y0-h);c.lineTo(lx,y0);c.lineTo(lx+w,y0);c.stroke();
      const pts=[0,.02,.06,.04,.3,.15,.55,.3,.2,.5,.65,.85,.38,.5,.8,.62,.95,.55];const k=eo((t-3)/5);c.strokeStyle="#f7931a";c.lineWidth=4;c.beginPath();const N=pts.length-1;for(let i=0;i<=40*k;i++){const q=i/40,idx=q*N,i0=Math.floor(idx),f=idx-i0,v=pts[i0]+(pts[Math.min(N,i0+1)]-pts[i0])*f;const X=lx+q*w,Y=y0-v*h;i?c.lineTo(X,Y):c.moveTo(X,Y);}c.stroke();
      if(t>5.5){c.globalAlpha=g*eo((t-5.5)/1);tx("−50 % eller mer, flera gånger",lx+w*.62,y0-h*1.05,"#ff9a8a","center",Math.max(14,s*.037),700);}
      if(t>8.7){c.globalAlpha=g*eo((t-8.7)/1);tx("man kan förlora mycket pengar",cx,a.y+a.h*.9,"#ffd86b","center",Math.max(17,s*.045),700);}
      c.restore();}};

  /* 7 · el och fråga en vuxen */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.2)/1.1);photo(1,t,9.3,1.1,.15+.5*g);cred(1,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;space(a,1);const u=Math.max(20,Math.min(a.w*.05,s*.06));
      c.fillStyle="#ffd23c";c.beginPath();c.moveTo(cx-a.w*.18+u*.4,cy-u*2);c.lineTo(cx-a.w*.18-u*.8,cy+u*.2);c.lineTo(cx-a.w*.18-u*.1,cy+u*.2);c.lineTo(cx-a.w*.18-u*.6,cy+u*2);c.lineTo(cx-a.w*.18+u*.9,cy-u*.5);c.lineTo(cx-a.w*.18+u*.2,cy-u*.5);c.closePath();c.fill();tx("mycket el",cx-a.w*.18,cy+u*3.1,"#ffd86b","center",Math.max(15,s*.04),700);
      const bx=cx+a.w*.16,by=cy-u*.4;c.fillStyle="rgba(255,255,255,.9)";c.beginPath();c.roundRect?c.roundRect(bx-u*3,by-u*1.6,u*6,u*3,u*.5):c.rect(bx-u*3,by-u*1.6,u*6,u*3);c.fill();c.beginPath();c.moveTo(bx-u*1,by+u*1.4);c.lineTo(bx-u*1.8,by+u*2.4);c.lineTo(bx,by+u*1.4);c.closePath();c.fill();tx("Fråga en vuxen först",bx,by+u*.2,"#1d2b53","center",Math.max(15,u*.8),700);
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7];
}
})();
