/* Interaktiva specialare. Varje grej: {id,titel,kat,e,c,beskr,start(host,ut)}.
   start ritar i host och returnerar en funktion som städar när man går därifrån. */
var GREJER=[];
(function(){
const el=(t,a,h)=>{const e=document.createElement(t);if(a)for(const k in a){if(k==="class")e.className=a[k];else if(k==="style")e.style.cssText=a[k];else e.setAttribute(k,a[k]);}if(h!=null)e.innerHTML=h;return e;};

/* ---------- Storleksresan ---------- */
GREJER.push({id:"storlek",titel:"Storleksresan",kat:"Rymden",e:"🔭",c:"#3F51B5",mork:true,beskr:"Zooma från en atom till hela universum.",start(host){
  const L=[
   ["En atom",1e-10,"Så liten att flera hundra tusen ryms på tjockleken av ett hårstrå."],
   ["Ett virus",1e-7,"Mindre än en bakterie. Man kan bara se det med ett elektronmikroskop."],
   ["En bakterie",2e-6,"Det finns fler bakterier på din hud än det finns människor i Sverige."],
   ["Ett hårstrå",7e-5,"Tjockleken på ett hårstrå är ungefär en tiondels millimeter."],
   ["En myra",5e-3,"Ungefär en halv centimeter. Myror kan bära saker som väger mer än de själva."],
   ["Ett barn",1.3,"Ungefär en och en kvarts meter. Det är du, i storlek."],
   ["En blåval",30,"Det största djur som någonsin har levt."],
   ["Mount Everest",8849,"Åtta och en halv kilometer upp, världens högsta berg."],
   ["Jorden",1.27e7,"Tvärs igenom är jorden ungefär 12 700 kilometer."],
   ["Solen",1.39e9,"Mer än en miljon jordklot ryms inuti solen."],
   ["Betelgeuse",1.2e12,"En jättestjärna. Om den satt där solen sitter skulle den fylla upp förbi Mars bana."],
   ["Solsystemet",9e12,"Från ena sidan av Neptunus bana till den andra."],
   ["Ett ljusår",9.46e15,"Så långt ljuset hinner på ett år. Bilden visar Alpha Centauri, vårt närmaste stjärnsystem, 4,2 ljusår bort."],
   ["Vintergatan",9.5e20,"Ungefär 100 000 ljusår tvärs över, med hundratals miljarder stjärnor."],
   ["Det observerbara universum",8.8e26,"Så långt vi kan se. Det finns hundratals miljarder galaxer."]];
  const BI=(typeof BILDER!=="undefined"&&BILDER.storlek)||[];
  const E=["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹"];
  const pot=p=>"10"+(p<0?"⁻":"")+String(Math.abs(p)).split("").map(d=>E[d]).join("");
  const fmt=m=>{const f=(v,s)=>v.toLocaleString("sv-SE",{maximumSignificantDigits:s});
    if(m<1e-6)return f(m*1e9,2)+" nanometer";if(m<1e-3)return f(m*1e6,2)+" mikrometer";if(m<1)return f(m*1e3,2)+" millimeter";
    if(m<1000)return f(m,3)+" meter";if(m<9e15)return f(m/1000,3)+" kilometer";return f(m/9.46e15,3)+" ljusår"};
  const LO=-10.5,HI=27.5,pos=m=>(Math.log10(m)-LO)/(HI-LO)*100;
  let ticks="";for(let p=-10;p<=27;p++)ticks+=`<i class="${p%5===0?"st":""}" style="left:${pos(Math.pow(10,p))}%"></i>`;
  let lab="";for(let p=-10;p<=27;p+=5)lab+=`<b style="left:${pos(Math.pow(10,p))}%">${pot(p)}</b>`;
  const dots=L.map((l,i)=>`<button class="pr" data-i="${i}" style="left:${pos(l[1])}%" aria-label="${l[0]}"></button>`).join("");
  host.innerHTML=`<div class="sr"><div class="sr-bg" id="srBg"></div>
   <div class="sr-main"><figure class="sr-foto"><div class="rama"><img id="srI" alt=""></div><figcaption id="srC"></figcaption></figure>
   <div class="sr-tx"><div class="kick" id="srK"></div><h2 id="srN"></h2><div class="sr-m" id="srM"></div><div class="sr-e" id="srE"></div>
   <ul><li id="srF"></li><li id="srJ"></li></ul></div></div>
   <div class="sr-nav"><div class="sr-skala"><div class="sr-lin">${ticks}</div>${dots}<div class="sr-mark" id="srMk"></div><div class="sr-lab">${lab}</div></div>
   <div class="sr-kn"><button class="srb" id="srP" aria-label="Förra">‹</button><button class="srb pl" id="srA">▶ Zooma ut</button><button class="srb" id="srX" aria-label="Nästa">›</button></div></div></div>`;
  const $=s=>host.querySelector(s);let i=0,tim=null;
  const jmf=m=>{const r=m/1.3;return r>=1?(r<1.5?"Ungefär lika stort som du.":r.toLocaleString("sv-SE",{maximumSignificantDigits:2})+" gånger större än du."):"Du är "+(1/r).toLocaleString("sv-SE",{maximumSignificantDigits:2})+" gånger större."};
  function vis(n){
    i=Math.max(0,Math.min(L.length-1,n));const l=L[i],b=BI[i];
    $("#srBg").style.backgroundImage=b?`url(bilder/${b.f})`:"none";
    const im=$("#srI");im.classList.remove("zin");void im.offsetWidth;im.src=b?"bilder/"+b.f:"";im.alt=l[0];im.classList.add("zin");
    $("#srC").innerHTML=b?`<span class="fig">FIG. ${i+1}</span><a href="${b.s}" target="_blank" rel="noopener">${b.k}</a>`:"";
    $("#srK").textContent="STEG "+(i+1)+" / "+L.length;$("#srN").textContent=l[0];$("#srM").textContent=fmt(l[1]);$("#srE").textContent=pot(Math.round(Math.log10(l[1])))+" meter";
    $("#srF").textContent=l[2];$("#srJ").textContent=i>0?"Det är "+(l[1]/L[i-1][1]).toLocaleString("sv-SE",{maximumSignificantDigits:2})+" gånger större än förra steget. "+jmf(l[1]):jmf(l[1]);
    $("#srMk").style.left=pos(l[1])+"%";[...host.querySelectorAll(".pr")].forEach((d,j)=>d.classList.toggle("on",j===i));
  }
  function stoppa(){clearInterval(tim);tim=null;$("#srA").textContent="▶ Zooma ut"}
  $("#srP").onclick=()=>{stoppa();vis(i-1)};$("#srX").onclick=()=>{stoppa();vis(i+1)};
  $("#srA").onclick=()=>{if(tim){stoppa();return}if(i>=L.length-1)vis(0);$("#srA").textContent="⏸ Pausa";tim=setInterval(()=>{if(i>=L.length-1){stoppa();return}vis(i+1)},3800)};
  host.querySelector(".sr-skala").onclick=e=>{const d=e.target.closest(".pr");if(d){stoppa();vis(+d.dataset.i)}};
  const key=e=>{if(!document.querySelector("#gv.on"))return;if(e.key==="ArrowRight"){stoppa();vis(i+1)}else if(e.key==="ArrowLeft"){stoppa();vis(i-1)}};
  document.addEventListener("keydown",key);
  vis(0);return()=>{stoppa();document.removeEventListener("keydown",key)};
}});

/* ---------- Illusioner ---------- */
GREJER.push({id:"illusioner",titel:"Optiska illusioner",kat:"Hjärnan",e:"👁️",c:"#D14B8F",mork:true,beskr:"Lura hjärnan. Mät sedan själv!",start(host){
  const I=[
  {n:"Müller-Lyer",fraga:"Vilken linje är längst?",svar:"De är exakt lika långa!",varfor:"Pilspetsarna får hjärnan att tro att den ena linjen är längre bort, så den tolkar den som längre.",
   svg:(r)=>`<svg viewBox="0 0 400 220"><g stroke="#1D2B53" stroke-width="6" stroke-linecap="round" fill="none">
   <line x1="80" y1="70" x2="320" y2="70"/><polyline points="105,45 80,70 105,95"/><polyline points="295,45 320,70 295,95"/>
   <line x1="80" y1="150" x2="320" y2="150"/><polyline points="55,125 80,150 55,175"/><polyline points="345,125 320,150 345,175"/></g>
   ${r?`<g stroke="#E5484D" stroke-width="3" stroke-dasharray="6 5"><line x1="80" y1="30" x2="80" y2="200"/><line x1="320" y1="30" x2="320" y2="200"/></g>`:""}</svg>`},
  {n:"Ebbinghaus",fraga:"Vilken orange cirkel är störst?",svar:"De är lika stora!",varfor:"Hjärnan jämför med det som finns runt omkring. Små cirklar omkring får den mitten att kännas större.",
   svg:(r)=>{let a="",b="";for(let i=0;i<6;i++){const t=i*Math.PI/3;a+=`<circle cx="${110+Math.cos(t)*66}" cy="110+${0}" r="0"/>`;}
    let s="";for(let i=0;i<6;i++){const t=i*Math.PI/3;s+=`<circle cx="${110+Math.cos(t)*68}" cy="${110+Math.sin(t)*68}" r="34" fill="#9AA8D8"/>`;}
    for(let i=0;i<8;i++){const t=i*Math.PI/4;s+=`<circle cx="${290+Math.cos(t)*44}" cy="${110+Math.sin(t)*44}" r="11" fill="#9AA8D8"/>`;}
    return `<svg viewBox="0 0 400 220">${s}<circle cx="110" cy="110" r="22" fill="#F2842B"/><circle cx="290" cy="110" r="22" fill="#F2842B"/>${r?`<circle cx="110" cy="110" r="22" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="5 4"/><circle cx="290" cy="110" r="22" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="5 4"/>`:""}</svg>`}},
  {n:"Ponzo",fraga:"Vilket streck är längst?",svar:"De är exakt lika långa!",varfor:"De sneda linjerna ser ut som en väg som försvinner långt bort. Det som ser ut att vara längre bort tror hjärnan måste vara större.",
   svg:(r)=>`<svg viewBox="0 0 400 240"><g stroke="#56668F" stroke-width="5" fill="none"><line x1="40" y1="230" x2="170" y2="10"/><line x1="360" y1="230" x2="230" y2="10"/>
   <line x1="90" y1="190" x2="310" y2="190" stroke="#c6d6f2" stroke-width="3"/><line x1="115" y1="150" x2="285" y2="150" stroke="#c6d6f2" stroke-width="3"/><line x1="140" y1="110" x2="260" y2="110" stroke="#c6d6f2" stroke-width="3"/></g>
   <line x1="140" y1="60" x2="260" y2="60" stroke="#E5484D" stroke-width="9" stroke-linecap="round"/><line x1="140" y1="200" x2="260" y2="200" stroke="#3D5AFE" stroke-width="9" stroke-linecap="round"/>
   ${r?`<g stroke="#1D2B53" stroke-width="2" stroke-dasharray="5 4"><line x1="140" y1="10" x2="140" y2="235"/><line x1="260" y1="10" x2="260" y2="235"/></g>`:""}</svg>`},
  {n:"Kafémuren",fraga:"Lutar de vågräta linjerna?",svar:"Nej, alla linjer är helt raka och parallella!",varfor:"De förskjutna svarta och vita rutorna lurar ögats sätt att se kanter, så linjerna ser ut att luta.",
   svg:(r)=>{let s="";for(let y=0;y<6;y++){const off=[0,24,48,24,0,24][y]-0;for(let x=-2;x<8;x++){const c=(x%2===0)?"#1D2B53":"#fff";s+=`<rect x="${x*48+off}" y="${y*38+10}" width="48" height="34" fill="${c}"/>`;}}
    let l="";for(let y=0;y<=6;y++)l+=`<line x1="0" y1="${y*38+10+(y?-2:-2)+ (y===0?2:0)}" x2="400" y2="${y*38+8+ (y===0?2:0)}" stroke="#9aa" stroke-width="4"/>`;
    return `<svg viewBox="0 0 400 250"><defs><clipPath id="cw"><rect width="400" height="250"/></clipPath></defs><g clip-path="url(#cw)">${s}${l}${r?[0,1,2,3,4,5,6].map(y=>`<line x1="0" y1="${y*38+9}" x2="400" y2="${y*38+9}" stroke="#E5484D" stroke-width="2.5"/>`).join(""):""}</g></svg>`}},
  {n:"Hermanns rutnät",fraga:"Ser du grå prickar där linjerna korsas?",svar:"Det finns inga prickar! Titta på ett kryss, så försvinner dem du tittar på.",varfor:"Ögats nervceller jämför ljus och mörkt med närmaste granne. Vid korsningarna blir jämförelsen annorlunda, och hjärnan hittar på en grå prick.",
   svg:()=>{let s="";for(let i=0;i<4;i++)for(let j=0;j<4;j++)s+=`<rect x="${20+i*92}" y="${12+j*58}" width="78" height="46" rx="5" fill="#1D2B53"/>`;return `<svg viewBox="0 0 400 240"><rect width="400" height="240" fill="#fff"/>${s}</svg>`}},
  {n:"Försvinnande prickar",fraga:"Titta på krysset i mitten i 15 sekunder utan att flytta blicken.",svar:"De suddiga prickarna kan försvinna!",varfor:"Hjärnan slutar lägga märke till det som inte ändras. Det kallas Troxlers effekt.",
   svg:()=>{let s="";for(let i=0;i<12;i++){const t=i*Math.PI/6;s+=`<circle cx="${200+Math.cos(t)*90}" cy="${120+Math.sin(t)*90}" r="22" fill="#e85fa0" opacity=".55" style="filter:blur(6px)"/>`;}
    return `<svg viewBox="0 0 400 240"><rect width="400" height="240" fill="#f3f3f3"/>${s}<g stroke="#000" stroke-width="5"><line x1="188" y1="120" x2="212" y2="120"/><line x1="200" y1="108" x2="200" y2="132"/></g></svg>`}}];
  let i=0,r=false;
  host.innerHTML=`<div class="ill"><div class="kick" id="iN"></div><h3 class="ill-q" id="iQ"></h3><div class="ill-b" id="iB"></div><div class="ill-svar" id="iS"></div>
  <div class="ill-kn"><button class="k" id="iP">‹ Förra</button><button class="k ok" id="iV">Visa svaret</button><button class="k" id="iX">Nästa ›</button></div></div>`;
  const N=host.querySelector("#iN"),Q=host.querySelector("#iQ"),Bx=host.querySelector("#iB"),S=host.querySelector("#iS"),V=host.querySelector("#iV");
  function rita(){const d=I[i];N.textContent=`${i+1} av ${I.length} · ${d.n}`;Q.textContent=d.fraga;Bx.innerHTML=d.svg(r);S.innerHTML=r?`<b>${d.svar}</b><span>${d.varfor||""}</span>`:"";V.textContent=r?"Dölj svaret":"Visa svaret";}
  host.querySelector("#iP").onclick=()=>{i=(i+I.length-1)%I.length;r=false;rita()};
  host.querySelector("#iX").onclick=()=>{i=(i+1)%I.length;r=false;rita()};
  V.onclick=()=>{r=!r;rita()};rita();return()=>{};
}});

/* ---------- Spirograf och kalejdoskop ---------- */
GREJER.push({id:"ritloop",titel:"Oändlig ritloop",kat:"Skapa",e:"🌀",c:"#7E57C2",mork:true,beskr:"Spirografen ritar själv. Eller rita med kalejdoskop.",start(host){
  host.innerHTML=`<div class="rit"><div class="rit-tabs"><button class="k on" id="rS">🌀 Spirograf</button><button class="k" id="rK">✨ Kalejdoskop</button></div>
  <canvas id="rC" width="720" height="720"></canvas><div class="ill-kn"><button class="k" id="rN">Ny figur</button><button class="k" id="rP">⏸ Pausa</button><button class="k" id="rT">Sudda</button></div><p class="rit-t" id="rTxt"></p></div>`;
  const C=host.querySelector("#rC"),x=C.getContext("2d"),W=720,mid=W/2;let mode="s",paus=false,raf=0,alive=true,rot=0;
  const txt=host.querySelector("#rTxt"),bS=host.querySelector("#rS"),bK=host.querySelector("#rK");
  function svart(){x.fillStyle="#12122b";x.fillRect(0,0,W,W)}svart();
  let sp;function ny(){const R=[5,7,8,9,11][Math.random()*5|0],r=[2,3,4][Math.random()*3|0],d=[1.2,1.6,2.2,2.8][Math.random()*4|0];
    sp={R:R*30,r:r*30,d:d*30,t:0,h:Math.random()*360,len:0,fade:0};svart();}
  ny();
  function g(a,b){return b?g(b,a%b):a}
  function steg(){
    if(paus)return;
    if(mode==="s"){
      const {R,r,d}=sp;const per=2*Math.PI*(r/g(R/30,r/30)/ (r/30))*1;
      for(let k=0;k<6;k++){
        const t=sp.t;const px=(R-r)*Math.cos(t)+d*Math.cos((R-r)/r*t),py=(R-r)*Math.sin(t)-d*Math.sin((R-r)/r*t);
        const t2=t+.03;const qx=(R-r)*Math.cos(t2)+d*Math.cos((R-r)/r*t2),qy=(R-r)*Math.sin(t2)-d*Math.sin((R-r)/r*t2);
        x.strokeStyle=`hsl(${(sp.h+t*20)%360},90%,65%)`;x.lineWidth=2.4;x.lineCap="round";x.shadowColor=x.strokeStyle;x.shadowBlur=8;
        x.beginPath();x.moveTo(mid+px*.9,mid+py*.9);x.lineTo(mid+qx*.9,mid+qy*.9);x.stroke();x.shadowBlur=0;sp.t=t2;
      }
      const tot=2*Math.PI*(r/g(R/30,r/30))/(r/30)*(R/30)/(R/30)*(r/30)/(r/30);
      if(sp.t>2*Math.PI*(r/30)/g(R/30,r/30)+.1){sp.fade++;if(sp.fade>120){ny()}}
      if(sp.fade>0&&sp.fade<=120&&sp.fade%8===0){x.fillStyle="rgba(18,18,43,.18)";x.fillRect(0,0,W,W)}
    }
    raf=requestAnimationFrame(steg);
  }
  function setT(){txt.textContent=mode==="s"?"Spirografen ritar en ny figur varje gång. Tryck på Ny figur om du vill byta.":"Rita med fingret eller musen. Allt du ritar speglas 12 gånger runt mitten.";bS.classList.toggle("on",mode==="s");bK.classList.toggle("on",mode==="k");}
  setT();
  let down=false,lx=0,ly=0,hue=0;
  function pos(e){const b=C.getBoundingClientRect();return[(e.clientX-b.left)*W/b.width-mid,(e.clientY-b.top)*W/b.height-mid]}
  function seg(a,b){hue=(hue+4)%360;for(let k=0;k<12;k++){for(const f of[1,-1]){const ang=k*Math.PI/6;const c=Math.cos(ang),s=Math.sin(ang);
    const ax=a[0],ay=a[1]*f,bx=b[0],by=b[1]*f;x.strokeStyle=`hsl(${hue},90%,65%)`;x.lineWidth=3;x.lineCap="round";x.shadowColor=x.strokeStyle;x.shadowBlur=8;
    x.beginPath();x.moveTo(mid+ax*c-ay*s,mid+ax*s+ay*c);x.lineTo(mid+bx*c-by*s,mid+bx*s+by*c);x.stroke();}}x.shadowBlur=0}
  C.onpointerdown=e=>{if(mode!=="k")return;down=true;[lx,ly]=pos(e);C.setPointerCapture(e.pointerId);e.preventDefault()};
  C.onpointermove=e=>{if(!down)return;const p=pos(e);seg([lx,ly],p);lx=p[0];ly=p[1]};
  C.onpointerup=C.onpointercancel=()=>{down=false};C.style.touchAction="none";
  host.querySelector("#rN").onclick=()=>{mode="s";setT();ny()};
  host.querySelector("#rP").onclick=e=>{paus=!paus;e.target.textContent=paus?"▶ Fortsätt":"⏸ Pausa"};
  host.querySelector("#rT").onclick=()=>{svart();if(mode==="s")ny()};
  bS.onclick=()=>{mode="s";setT();ny()};bK.onclick=()=>{mode="k";setT();svart()};
  raf=requestAnimationFrame(steg);
  return()=>{cancelAnimationFrame(raf);alive=false};
}});

/* ---------- Hitta den udda ---------- */
GREJER.push({id:"udda",titel:"Hitta den udda",kat:"Hjärnan",e:"🔍",c:"#E08A00",mork:true,beskr:"Alla är lika utom en. Hur långt kommer du?",start(host){
  const P=[["🐶","🐕"],["😀","😃"],["🍎","🍅"],["⭐","🌟"],["🟦","🔷"],["🐰","🐇"],["🦊","🐱"],["🍓","🍒"],["🌼","🌻"],["🔴","🟠"],["🚗","🚙"],["🐢","🐊"],["🌙","🌛"],["😮","😯"],["🍊","🍑"]];
  host.innerHTML=`<div class="udda"><div class="udda-top"><span id="uN">Nivå 1</span><span id="uT">⏱ 0</span><span id="uR">Rekord: 0</span></div><div class="udda-g" id="uG"></div><p class="rit-t" id="uM">Tryck på den som är annorlunda!</p></div>`;
  const G=host.querySelector("#uG"),Nn=host.querySelector("#uN"),Tt=host.querySelector("#uT"),Rr=host.querySelector("#uR"),Mm=host.querySelector("#uM");
  let niv=1,rek=0,t0=Date.now(),tim=0;try{rek=+localStorage.getItem("sp-udda")||0}catch(e){}
  Rr.textContent="Rekord: "+rek;
  function ny(){const n=Math.min(2+Math.ceil(niv/2),7),pr=P[Math.random()*P.length|0];const [a,b]=Math.random()<.5?pr:[pr[1],pr[0]];const o=Math.random()*n*n|0;
    G.style.gridTemplateColumns=`repeat(${n},1fr)`;G.innerHTML="";
    for(let i=0;i<n*n;i++){const bt=el("button",{class:"udda-c","aria-label":"ruta"},i===o?b:a);bt.style.fontSize=`clamp(1.4rem,${46/n}vmin,${210/n}px)`;bt.onclick=()=>{
      if(i===o){niv++;if(niv-1>rek){rek=niv-1;try{localStorage.setItem("sp-udda",rek)}catch(e){}Rr.textContent="Rekord: "+rek}Nn.textContent="Nivå "+niv;Mm.textContent="Rätt! 🎉";ny()}
      else{bt.classList.add("fel");Mm.textContent="Inte den. Prova en annan!"}};G.appendChild(bt);}}
  ny();tim=setInterval(()=>{Tt.textContent="⏱ "+Math.floor((Date.now()-t0)/1000)},500);
  return()=>clearInterval(tim);
}});

/* ---------- Hitta djuret ---------- */
GREJER.push({id:"djuret",titel:"Hitta snöleoparden",kat:"Hjärnan",e:"🐆",c:"#546E7A",mork:true,beskr:"Snöleoparden är mästare på att gömma sig. Hittar du den?",start(host){
  const B=[
   {src:"bilder/snoleopard1.jpg",w:1280,h:960,m:[[618,458]],r:46,f:"Hitta snöleoparden! Den tittar fram ur en liten glipa i berget.",tips:"Titta i skuggan under bergsöverhänget, mitt i bilden.",ant:"Foto: Ksuryawanshi, CC BY-SA 4.0 (Wikimedia Commons)"},
   {src:"bilder/snoleopard2.jpg",w:1280,h:960,m:[[283,598],[958,640]],r:54,f:"Här finns två snöleoparder som går i snön. Hitta båda!",tips:"De går på snön långt nere i bilden, en på vänster och en på höger sida.",ant:"Foto: Ksuryawanshi, CC BY-SA 4.0 (Wikimedia Commons)"}];
  let i=0,hit=[],fel=0;
  host.innerHTML=`<div class="hitta"><h3 class="ill-q" id="hQ"></h3><div class="hitta-b" id="hB"><img id="hI" alt="Foto av klippor och snö. Någonstans finns en snöleopard." draggable="false"></div><p class="rit-t" id="hM"></p>
  <div class="ill-kn"><button class="k" id="hT">💡 Tips</button><button class="k" id="hV">Visa var</button><button class="k ok" id="hN">Nästa bild ›</button></div><p class="kallan" id="hA"></p></div>`;
  const Q=host.querySelector("#hQ"),Bx=host.querySelector("#hB"),Im=host.querySelector("#hI"),Mm=host.querySelector("#hM"),A=host.querySelector("#hA");
  function ring(m,cls){const d=el("div",{class:"ring "+(cls||"")});d.style.left=(m[0]/1280*100)+"%";d.style.top=(m[1]/960*100)+"%";d.style.width=d.style.height=(2*B[i].r/1280*100)+"%";Bx.appendChild(d)}
  function ladda(){const d=B[i];hit=[];fel=0;Q.textContent=d.f;Im.src=d.src;Mm.textContent="Tryck på bilden där du ser djuret.";A.textContent=d.ant;[...Bx.querySelectorAll(".ring")].forEach(r=>r.remove());}
  Im.onclick=e=>{const d=B[i],b=Im.getBoundingClientRect(),px=(e.clientX-b.left)*d.w/b.width,py=(e.clientY-b.top)*d.h/b.height;
    const k=d.m.findIndex((m,j)=>!hit.includes(j)&&Math.hypot(px-m[0],py-m[1])<d.r*1.6);
    if(k>=0){hit.push(k);ring(d.m[k],"ok");Mm.textContent=hit.length===d.m.length?"🎉 Du hittade "+(d.m.length>1?"båda!":"den!"):"Snyggt! En till!"}
    else{fel++;Mm.textContent=fel>2?"Fortfarande inte. Prova 💡 Tips!":"Inte där. Titta noga!"}};
  host.querySelector("#hT").onclick=()=>{Mm.textContent=B[i].tips};
  host.querySelector("#hV").onclick=()=>{B[i].m.forEach((m,j)=>{if(!hit.includes(j)){ring(m,"visa");hit.push(j)}});Mm.textContent="Där var den!"};
  host.querySelector("#hN").onclick=()=>{i=(i+1)%B.length;ladda()};
  ladda();return()=>{};
}});

/* ---------- Tiden går ---------- */
GREJER.push({id:"tid",titel:"Hur lång är 10 sekunder?",kat:"Hjärnan",e:"⏱️",c:"#00897B",mork:true,beskr:"Känn efter. Ingen klocka syns!",start(host){
  const M=[10,20,5,30];let mi=0,t0=0,kor=false;
  host.innerHTML=`<div class="tid"><h3 class="ill-q" id="tQ"></h3><div class="tid-s" id="tS">?</div><p class="rit-t" id="tM">Tryck Start och tryck Stopp när du tror att tiden har gått. Räkna inte med högt!</p>
  <div class="ill-kn"><button class="k ok" id="tB">Start</button><button class="k" id="tX">Annan tid</button></div></div>`;
  const Q=host.querySelector("#tQ"),S=host.querySelector("#tS"),Mm=host.querySelector("#tM"),Bt=host.querySelector("#tB");
  const upd=()=>{Q.textContent=`Stoppa efter ${M[mi]} sekunder`};upd();
  Bt.onclick=()=>{if(!kor){kor=true;t0=performance.now();S.textContent="⏳";Bt.textContent="Stopp!";Mm.textContent="Känn efter …";}
    else{kor=false;const s=(performance.now()-t0)/1000,d=s-M[mi];S.textContent=s.toFixed(1)+" s";Bt.textContent="Prova igen";
      Mm.textContent=Math.abs(d)<.5?"🎉 Wow! Nästan exakt!":Math.abs(d)<1.5?"Mycket nära! "+(d>0?"För lång tid.":"För kort tid."):d>0?"Du väntade för länge ("+d.toFixed(1)+" s för mycket).":"Du stoppade för tidigt ("+(-d).toFixed(1)+" s för lite).";}};
  host.querySelector("#tX").onclick=()=>{kor=false;mi=(mi+1)%M.length;upd();S.textContent="?";Bt.textContent="Start";Mm.textContent="Tryck Start och tryck Stopp när du tror att tiden har gått."};
  return()=>{};
}});
})();
