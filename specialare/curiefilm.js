/* Marie Curie: minilektionen som film (nio scener, ca 2,2 minuter), foton ur Wikimedia Commons blandade med egen grafik (canvas).
   Använder filmmotorn i ../svarthal.js och filmlib.js. Röst: ../ljud/curie/s<scen>-<replik>.mp3 (ElevenLabs, Malin).
   Bilderna: bilder/curie-1..9.jpg (mest stående, visas hela). MPCurieFilm.start(host,{overlay,onClose}). Ljudmatta: rymd (standard). */
(function(){
const ROOT=MPFilmLib.root(document.currentScript),TAU=Math.PI*2;
const SC=[
 {k:"Inledning",d:7,cap:[[0.5,"Hon fick två Nobelpris, i två olika vetenskaper. Det här är berättelsen om Marie Curie."]]},
 {k:"01 · Född i Polen",d:12.7,cap:[[0.8,"Marie föddes år 1867 i Warszawa i Polen, och hette då Maria Skłodowska."],[8.0,"På den tiden fick kvinnor inte studera på universitetet där."]]},
 {k:"02 · Studier i Paris",d:11.4,cap:[[0.8,"År 1891 flyttade hon till Paris och läste fysik och matematik vid Sorbonne."],[7.2,"Hon var fattig och bodde i ett litet, kallt rum."]]},
 {k:"03 · Marie och Pierre",d:11.2,cap:[[0.8,"I Paris träffade hon fysikern Pierre Curie. De gifte sig 1895 och forskade tillsammans i ett enkelt, kallt laboratorium."]]},
 {k:"04 · Radium och polonium",d:21.1,cap:[[0.8,"År 1898 upptäckte de två nya grundämnen. Det ena kallade hon polonium, efter hennes hemland Polen. Det andra fick namnet radium."],[11.7,"Det var Marie som började använda ordet radioaktivitet."],[16.0,"För att få fram en liten bit radium behövdes flera ton uranmalm."]]},
 {k:"05 · Två Nobelpris",d:16.1,cap:[[0.8,"År 1903 fick hon Nobelpriset i fysik, tillsammans med Pierre och Henri Becquerel. År 1911 fick hon ett i kemi."],[11.2,"Hon är den enda som fått Nobelpris i två olika vetenskaper."]]},
 {k:"06 · Röntgenbilar",d:12.1,cap:[[0.8,"Under första världskriget lät hon bygga bilar med röntgenapparater som åkte till fronten."],[6.8,"Då kunde läkare se kulor och brutna ben hos sårade soldater."]]},
 {k:"07 · Ett farligt arbete",d:17.4,cap:[[0.8,"På den tiden visste man inte att strålningen var farlig. Marie Curie dog 1934, troligen av sjukdom orsakad av strålningen."],[10.6,"Hennes anteckningsböcker är fortfarande radioaktiva, och förvaras i blyfodrade lådor."]]},
 {k:"08 · Dottern Irène",d:14.1,cap:[[0.8,"Hennes dotter Irène blev också forskare, och fick Nobelpriset i kemi 1935."],[7.6,"Marie, Pierre, Irène och Irènes man Frédéric har alla fått Nobelpris."]]}
];
const META={hud:"PLUGGPARKEN · SPECIALARE · FILM",titel:"Marie Curie",under:"En film i nio steg · ca 2 minuter",
  slutRubrik:"Tack för att du har följt med",slutText:"Nyfikenhet och hårt arbete kan förändra världen. Filmen bygger på bilder ur Wikimedia Commons. Källor står under bilderna.",igen:"↻ Se filmen igen"};
const KR={1:"Foto: Nobelstiftelsen (Marie Curie 1903) · Public domain · Wikimedia Commons",2:"Väggmålning: Nihil novi (Marie Curies födelsehus) · CC BY 3.0 · Wikimedia Commons",3:"Foto: La Sorbonne, Paris · CC BY 4.0 · Wikimedia Commons",4:"Foto: Wellcome Collection (Marie och Pierre Curie i labbet) · CC BY 4.0 · Wikimedia Commons",5:"Foto: Monceau (labbet på rue Vauquelin) · CC BY 2.0 · Wikimedia Commons",6:"Foto: Marie Curie i sitt laboratorium, 1912 · Public domain · Wikimedia Commons",7:"Bild ur La radiologie et la guerre (1921) · Internet Archive Book Images · Wikimedia Commons",8:"Bild: Wellcome Collection (Marie och Pierre Curie med ett lysande prov) · CC BY 4.0 · Wikimedia Commons",9:"Foto: Smithsonian Institution (Irène Joliot-Curie, ca 1935) · Wikimedia Commons"};

window.MPCurieFilm={start(host,o){
  return MPSvartHal.start(host,Object.assign({},o||{},{def:{SC,meta:META,ljud:"curie",scenes:E=>scenes(E)}}));
}};

function scenes(E){
  const {eo,cl,lerp,font}=E;
  const L=MPFilmLib.make(E,{ROOT,prefix:"curie-",names:[1,2,3,4,5,6,7,8,9],KR});
  const {x,tx,tg,S,cred,photo,panel,grad,space,title}=L;
  const dot=(px,py,r,col)=>{const c=x();c.fillStyle=col;c.beginPath();c.arc(px,py,r,0,TAU);c.fill();};
  const tile=(px,py,w,num,sym,nm,col)=>{const c=x();c.save();c.fillStyle="rgba(255,255,255,.08)";c.strokeStyle=col;c.lineWidth=3;c.fillRect(px-w/2,py-w/2,w,w);c.strokeRect(px-w/2,py-w/2,w,w);c.restore();tx(String(num),px-w*.36,py-w*.28,col,"left",Math.max(13,w*.16),700);tx(sym,px,py+w*.12,"#fff","center",Math.max(30,w*.45),700);tx(nm,px,py+w*.4,col,"center",Math.max(12,w*.14),700);};
  const medal=(px,py,r,l1,l2,col)=>{const c=x();c.save();c.fillStyle=col||"#d9a84a";c.strokeStyle="#8a5a10";c.lineWidth=Math.max(3,r*.08);c.beginPath();c.arc(px,py,r,0,TAU);c.fill();c.stroke();c.fillStyle="#fff7e0";c.beginPath();c.arc(px,py,r*.78,0,TAU);c.fill();c.restore();tx(l1,px,py-r*.05,"#6a4a10","center",Math.max(14,r*.3),700);tx(l2,px,py+r*.32,"#6a4a10","center",Math.max(12,r*.22),600);};
  const person=(px,py,u,col)=>{const c=x();c.save();c.fillStyle=col;c.beginPath();c.arc(px,py-u*1.5,u*.5,0,TAU);c.fill();c.beginPath();c.moveTo(px-u*.8,py+u*1.2);c.lineTo(px-u*.45,py-u*.8);c.lineTo(px+u*.45,py-u*.8);c.lineTo(px+u*.8,py+u*1.2);c.closePath();c.fill();c.restore();};

  const s0=(t)=>{photo(1,t,7,1.12,.3);const f=title(t,"MARIE CURIE","TVÅ NOBELPRIS · TVÅ VETENSKAPER","#e2c9ff");cred(1,.55*f);};

  /* 1 · Warszawa 1867 → Paris 1891 */
  const s1=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(2,t,12.7,1.1,.15+.5*g);cred(2,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const w=Math.min(a.w*.7,s*1.3),lx=cx-w/2,wx=lx+w*.82,wy=cy-s*.04,px=lx+w*.14,py=cy+s*.06;
      dot(wx,wy,9,"#ffb878");tx("Warszawa · 1867",wx,wy-Math.max(22,s*.05),"#ffb878","center",Math.max(15,s*.04),700);tx("kvinnor fick inte studera",wx,wy+Math.max(34,s*.075),"#cfd8ff","center",Math.max(12,s*.032),600);
      if(t>4.6){const k=eo((t-4.6)/2.4);dot(px,py,9,"#9fd0ff");c.globalAlpha=g*k;tx("Paris · 1891",px,py-Math.max(22,s*.05),"#9fd0ff","center",Math.max(15,s*.04),700);c.strokeStyle="rgba(255,255,255,.6)";c.lineWidth=4;c.setLineDash([8,8]);c.beginPath();c.moveTo(wx-14,wy+6);c.lineTo(lerp(wx-14,px+14,k),lerp(wy+6,py-6,k));c.stroke();c.setLineDash([]);}
      c.restore();}};

  /* 2 · kallt rum i Paris */
  const s2=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(3,t,11.4,1.1,.15+.5*g);cred(3,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#1d2b4a"]]);const u=Math.max(16,Math.min(a.w*.04,s*.05));
      tx("fysik och matematik · Sorbonne",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(18,s*.048),700);
      const bx=cx-a.w*.18;for(let i=0;i<4;i++){c.fillStyle=["#c93a3a","#3a7ac9","#3aa86a","#d9a84a"][i];c.fillRect(bx-u*1.6+i*u*.2,cy+u*1.6-i*u*.55,u*3.2-i*u*.2,u*.5);}
      if(t>7.2){const q=eo((t-7.2)/1),tx0=cx+a.w*.18,th=u*6;c.globalAlpha=g*q;c.fillStyle="rgba(255,255,255,.14)";c.fillRect(tx0,cy-th*.6,u*.6,th);c.fillStyle="#4aa8ff";c.fillRect(tx0,cy+th*.4-th*.2,u*.6,th*.2);c.beginPath();c.arc(tx0+u*.3,cy+th*.4+u*.3,u*.55,0,TAU);c.fill();tx("kallt rum",tx0+u*.3,cy+th*.4+u*2.2,"#9fd0ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 3 · Marie och Pierre */
  const s3=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(4,t,11.2,1.1,.15+.5*g);cred(4,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const u=Math.max(18,Math.min(a.w*.045,s*.055));
      person(cx-u*3,cy+u,u*1.2,"#e2c9ff");person(cx+u*3,cy+u,u*1.2,"#9fd0ff");
      tx("Marie",cx-u*3,cy+u*3.8,"#e2c9ff","center",Math.max(16,s*.042),700);tx("Pierre",cx+u*3,cy+u*3.8,"#9fd0ff","center",Math.max(16,s*.042),700);
      if(t>4){const q=eo((t-4)/1);c.globalAlpha=g*q;c.strokeStyle="#ffd86b";c.lineWidth=5;c.beginPath();c.arc(cx-u*.5,cy-u*.2,u*.5,0,TAU);c.stroke();c.beginPath();c.arc(cx+u*.5,cy-u*.2,u*.5,0,TAU);c.stroke();tx("gifta 1895",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(22,s*.06),700);}
      if(t>7){c.globalAlpha=g*eo((t-7)/1);tx("ett enkelt, kallt laboratorium",cx,a.y+a.h*.9,"#cfd8ff","center",Math.max(16,s*.042),700);}
      c.restore();}};

  /* 4 · polonium, radium, radioaktivitet, ton malm */
  const s4=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(5,t,21.1,1.1,.15+.5*g);cred(5,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const w=Math.max(80,Math.min(a.w*.18,a.h*.3,s*.3));
      if(t<11.7){const q1=eo((t-3.2)/1),q2=eo((t-5.2)/1);c.globalAlpha=g*q1;tile(cx-w*.8,cy,w,84,"Po","polonium","#ffb878");tx("efter Polen",cx-w*.8,cy+w*.8,"#ffb878","center",Math.max(14,s*.037),700);c.globalAlpha=g*q2;tile(cx+w*.8,cy,w,88,"Ra","radium","#9be3b0");tx("1898 · två nya grundämnen",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(18,s*.048),700);}
      else if(t<16){const q=eo((t-11.7)/1);c.globalAlpha=g*q;tx("radioaktivitet",cx,cy,"#9be3b0","center",Math.max(34,s*.1),700);tx("ordet myntades av Marie",cx,cy+Math.max(54,s*.12),"#cfd8ff","center",Math.max(16,s*.042),700);}
      else{const q=eo((t-16)/1),ww=Math.min(a.w*.4,s*.7),y=cy;c.globalAlpha=g*q;c.fillStyle="#6a6f7a";c.beginPath();c.moveTo(cx-ww*.5,y+s*.1);c.lineTo(cx-ww*.3,y-s*.05);c.lineTo(cx-ww*.05,y-s*.12);c.lineTo(cx+ww*.2,y-s*.03);c.lineTo(cx+ww*.45,y+s*.1);c.closePath();c.fill();tx("flera ton uranmalm",cx-ww*.02,y+s*.2,"#cfd8ff","center",Math.max(15,s*.04),700);
        c.strokeStyle="#fff";c.lineWidth=4;c.beginPath();c.moveTo(cx+ww*.6,y-s*.02);c.lineTo(cx+ww*.78,y-s*.02);c.stroke();dot(cx+ww*.88,y-s*.02,Math.max(4,s*.01),"#7ae0a0");tx("en liten bit radium",cx+ww*.88,y+s*.06,"#9be3b0","center",Math.max(13,s*.034),700);}
      c.restore();}};

  /* 5 · två Nobelpris */
  const s5=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(6,t,16.1,1.1,.15+.5*g);cred(6,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const r=Math.max(40,Math.min(a.w*.1,a.h*.2,s*.18));
      const q1=eo((t-3)/1),q2=eo((t-7)/1);c.globalAlpha=g*q1;medal(cx-r*1.7,cy,r,"FYSIK","1903","#d9a84a");c.globalAlpha=g*q2;medal(cx+r*1.7,cy,r,"KEMI","1911","#c0c8d8");
      if(t>11.2){c.globalAlpha=g*eo((t-11.2)/1);tx("den enda: två olika vetenskaper",cx,cy+r*2.2,"#ffd86b","center",Math.max(18,s*.048),700);}
      c.restore();}};

  /* 6 · röntgenbilar: bil och ben med kula */
  const s6=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(7,t,12.1,1.1,.15+.5*g);cred(7,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const u=Math.max(16,Math.min(a.w*.04,s*.05));
      if(t<6.8){const k=eo((t-3)/3),px=lerp(a.x+a.w*.1,cx,k),py=cy+u;c.fillStyle="#e8ecf4";c.fillRect(px-u*2.4,py-u*1.4,u*4.8,u*1.8);c.fillRect(px-u*2.4,py-u*2.2,u*2,u*.9);c.fillStyle="#d1383a";c.fillRect(px-u*.4,py-u*1.1,u*.35,u*1.1);c.fillRect(px-u*.75,py-u*.7,u*1.05,u*.35);dot(px-u*1.5,py+u*.5,u*.5,"#222");dot(px+u*1.5,py+u*.5,u*.5,"#222");tx("röntgenbil till fronten",cx,a.y+a.h*.14,"#ffd86b","center",Math.max(18,s*.048),700);}
      else{const q=eo((t-6.8)/1);c.globalAlpha=g*q;const bw=u*8;c.fillStyle="rgba(180,200,230,.25)";c.fillRect(cx-bw/2,cy-u*2,bw,u*4);c.strokeStyle="#e8f0ff";c.lineWidth=u*.5;c.lineCap="round";c.beginPath();c.moveTo(cx-bw*.4,cy);c.lineTo(cx-bw*.05,cy-u*.2);c.moveTo(cx+bw*.05,cy+u*.3);c.lineTo(cx+bw*.4,cy+u*.1);c.stroke();c.beginPath();c.arc(cx-bw*.42,cy,u*.55,0,TAU);c.arc(cx+bw*.42,cy+u*.1,u*.55,0,TAU);c.stroke();dot(cx+bw*.15,cy+u*.4,u*.28,"#ff6a5e");tx("läkarna ser kulan och benbrottet",cx,cy+u*3.5,"#cfd8ff","center",Math.max(15,s*.04),700);}
      c.restore();}};

  /* 7 · farligt arbete: anteckningsbok och blylåda */
  const s7=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(8,t,17.4,1.1,.15+.5*g);cred(8,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#1d2b4a"]]);const u=Math.max(18,Math.min(a.w*.045,s*.055));
      const bx=cx-a.w*.14,by=cy;c.fillStyle="#8a6a3a";c.fillRect(bx-u*1.5,by-u*2,u*3,u*4);c.fillStyle="#f2e6c4";c.fillRect(bx-u*1.3,by-u*1.8,u*2.6,u*3.6);c.strokeStyle="#6a5a3a";c.lineWidth=2;for(let i=0;i<7;i++){c.beginPath();c.moveTo(bx-u*1,by-u*1.4+i*u*.5);c.lineTo(bx+u*1,by-u*1.4+i*u*.5);c.stroke();}
      const tf=(px,py,r)=>{c.save();c.translate(px,py);c.fillStyle="#ffd23c";c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.fillStyle="#222";for(let i=0;i<3;i++){c.beginPath();c.moveTo(0,0);c.arc(0,0,r*.9,i*TAU/3-Math.PI/2-.5,i*TAU/3-Math.PI/2+.5);c.closePath();c.fill();}c.beginPath();c.arc(0,0,r*.18,0,TAU);c.fill();c.restore();};
      tf(bx+u*1.2,by-u*1.6,u*.7);tx("anteckningsboken",bx,by+u*2.8,"#cfd8ff","center",Math.max(14,s*.037),700);
      if(t>10.6){const q=eo((t-10.6)/1),lx=cx+a.w*.16;c.globalAlpha=g*q;c.fillStyle="#6a7080";c.fillRect(lx-u*2,by-u*1.4,u*4,u*2.8);c.fillStyle="#8a90a0";c.fillRect(lx-u*2,by-u*1.4,u*4,u*.7);c.fillStyle="#222";c.fillRect(lx-u*.3,by-u*.7,u*.6,u*.5);tx("blyfodrad låda",lx,by+u*2.8,"#cfd8ff","center",Math.max(14,s*.037),700);}
      tx("1934",cx,a.y+a.h*.12,"#ffd86b","center",Math.max(22,s*.06),700);
      c.restore();}};

  /* 8 · dottern Irène, fyra Nobelpristagare */
  const s8=(t)=>{const{s,cx,cy,a,port}=S(),c=x();const g=eo((t-2.4)/1.1);photo(9,t,14.1,1.1,.15+.5*g);cred(9,.55*(1-g));
    if(g>0){c.save();c.globalAlpha=g;grad(a,[[0,"#13203c"],[1,"#26324f"]]);const u=Math.max(16,Math.min(a.w*.035,s*.045));
      if(t<7.6){const q=eo((t-3.2)/1);c.globalAlpha=g*q;medal(cx,cy-u*.5,u*2.4,"KEMI","1935","#c0c8d8");tx("Irène Joliot-Curie",cx,cy+u*4.4,"#e2c9ff","center",Math.max(18,s*.048),700);}
      else{const n=4,names=["Marie","Pierre","Irène","Frédéric"],cols=["#e2c9ff","#9fd0ff","#ffb878","#9be3b0"];for(let i=0;i<n;i++){const q=eo((t-7.8-i*.5)/.6);if(q<=0)continue;const px=cx+(i-1.5)*u*5.2;c.globalAlpha=g*q;person(px,cy+u,u,cols[i]);medal(px,cy-u*2.9,u*.8,"","",cols[i]);tx("★",px,cy-u*2.6,"#6a4a10","center",u*1.1,700);tx(names[i],px,cy+u*3.4,cols[i],"center",Math.max(14,s*.037),700);}}
      c.restore();}};

  return[s0,s1,s2,s3,s4,s5,s6,s7,s8];
}
})();
