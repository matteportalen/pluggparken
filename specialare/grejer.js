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

/* ---------- Pengar i skala ---------- */
GREJER.push({id:"pengar",titel:"Pengar i skala",kat:"Tal",e:"💰",c:"#2E8B57",mork:true,beskr:"En miljon, en miljard och en biljon kronor som sedelstaplar. Hur högt blir de?",start(host){
  const S=[
   {l:"1 miljon kronor",n:1e3,h:.1,t:"17 minuter",lon:"drygt 2 år och 9 månader",text:"1 000 sedlar à 1 000 kr. Stapeln är 10 centimeter hög och ryms i en hand. Det är en stor summa för en människa."},
   {l:"10 miljoner kronor",n:1e4,h:1,t:"knappt 3 timmar",lon:"27 år och 9 månader",text:"10 000 sedlar. Stapeln är en meter hög, ungefär till ditt midjemått."},
   {l:"100 miljoner kronor",n:1e5,h:10,t:"28 timmar",lon:"277 år",text:"100 000 sedlar. Stapeln är lika hög som ett tre våningar högt hus."},
   {l:"1 miljard kronor",n:1e6,h:100,t:"11 dygn och 14 timmar",lon:"2 778 år",text:"1 miljon sedlar. Stapeln är 100 meter hög, nästan lika hög som ett tjugovåningshus. Så mycket har bara några hundra människor i Sverige."},
   {l:"10 miljarder kronor",n:1e7,h:1e3,t:"116 dygn",lon:"27 778 år",text:"10 miljoner sedlar. Stapeln är en kilometer hög, högre än världens högsta byggnad."},
   {l:"100 miljarder kronor",n:1e8,h:1e4,t:"3 år och 2 månader",lon:"277 778 år",text:"100 miljoner sedlar. Stapeln är 10 kilometer hög, lika högt som ett flygplan flyger."},
   {l:"1 biljon kronor",n:1e9,h:1e5,t:"nästan 32 år",lon:"2,8 miljoner år",text:"1 000 miljarder, en miljard sedlar. Stapeln är 100 kilometer hög och når upp till gränsen mot rymden."},
   {l:"Elon Musk: ca 5 biljoner kronor",n:5e9,h:5e5,t:"nästan 159 år",lon:"ca 14 miljoner år",text:"Forbes räknar Elon Musk som världens rikaste person, med ungefär 500 miljarder dollar, alltså runt 5 biljoner kronor (siffran ändras hela tiden). Det blir 5 miljarder sedlar à 1 000 kr, en stapel som är 500 kilometer hög, högre än rymdstationen ISS."}];
  const LM=[[.17,"en mobil"],[1.3,"ett barn"],[10,"ett trevåningshus"],[190,"Turning Torso"],[828,"Burj Khalifa, världens högsta byggnad"],[8849,"Mount Everest"],[10500,"ett flygplan"],[1e5,"gränsen mot rymden"],[4e5,"rymdstationen ISS"]];
  host.innerHTML=`<div class="pg"><div class="kick" id="pK">Pengar i skala · sedlar à 1 000 kr</div><div class="ill-kn" style="margin:8px 0"><button class="k on" id="pM1">Kronor: sedelstaplar</button><button class="k" id="pM2">Dollar: lastpallar</button></div><h2 id="pL"></h2>
  <div class="pg-st"><canvas id="pC" width="900" height="560"></canvas></div>
  <p class="pg-t" id="pT"></p>
  <div class="pg-rad"><div class="pg-box"><small id="pS1">Tid att räkna sedlarna</small><b id="pTid"></b><span id="pU1">en sedel i sekunden</span></div><div class="pg-box"><small id="pS2">Så länge tar det att tjäna ihop</small><b id="pLon"></b><span id="pU2">med 30 000 kr i månaden, före skatt</span></div></div>
  <input type="range" id="pR" min="0" max="${S.length-1}" step="1" value="0" aria-label="Summa"><div class="pg-skala"><span>1 miljon</span><span>1 miljard</span><span>1 biljon</span><span>Rikaste</span></div>
  <div class="ill-kn"><button class="k" id="pP">‹ Mindre</button><button class="k ok" id="pN">Mer ›</button></div>
  <p class="pg-f">Sedlarna är räknade som 0,1 mm tjocka. Stapelns bredd är inte i skala: en riktig stapel skulle vara en tunn nål vid 100 km.</p></div>`;
  const $=s=>host.querySelector(s),C=$("#pC"),x=C.getContext("2d");let i=0,anim=0,hv=S[0].h,raf=0,mode="k";
  const D=[
   {l:"1 miljon dollar",p:.01,v:"10 kg",lb:"ryms i en handväska",text:"10 000 sedlar à 100 dollar. De är bara en liten kub, ungefär 22 cm hög, och ligger i en handväska."},
   {l:"10 miljoner dollar",p:.1,v:"100 kg",lb:"ryms i en stor resväska",text:"100 000 sedlar. En tiondels pall, ungefär en meter hög på en kvarts pall."},
   {l:"100 miljoner dollar",p:1,v:"1 ton",lb:"går på en pall",text:"1 miljon sedlar fyller en hel lastpall."},
   {l:"1 miljard dollar",p:10,v:"10 ton",lb:"en halv lastbil",text:"10 miljoner sedlar. Tio lastpallar i två rader."},
   {l:"10 miljarder dollar",p:100,v:"100 ton",lb:"ca 4 lastbilar",text:"100 miljoner sedlar. 100 lastpallar, som ett litet lager."},
   {l:"100 miljarder dollar",p:1000,v:"1 000 ton",lb:"ca 42 lastbilar",text:"1 000 lastpallar fyller en hel lagerhall."},
   {l:"1 biljon dollar",p:1e4,v:"10 000 ton",lb:"ca 420 lastbilar",text:"10 miljarder sedlar. 10 000 lastpallar. Det är tusen gånger mer än en miljard dollar, som är 10 pallar."},
   {l:"Elon Musk: ca 500 miljarder dollar",p:5000,v:"5 000 ton",lb:"ca 210 lastbilar",text:"Forbes räknar Elon Musk som världens rikaste person, med ungefär 500 miljarder dollar (siffran ändras hela tiden). I 100-dollarssedlar blir det 5 miljarder sedlar, 5 000 lastpallar och en stapel som är 550 kilometer hög."}];
  const SOURCE=S;
  const fmt=(m)=>m>=1000?(m/1000).toLocaleString("sv-SE",{maximumFractionDigits:1})+" km":m>=1?m.toLocaleString("sv-SE",{maximumFractionDigits:1})+" m":(m*100).toLocaleString("sv-SE",{maximumFractionDigits:0})+" cm";
  function rita(){const W=C.width,H=C.height;x.clearRect(0,0,W,H);
    const gy=H-50,top=40,view=hv*1.35,sc=(gy-top)/view;
    const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,"#0a1628");g.addColorStop(1,"#12263f");x.fillStyle=g;x.fillRect(0,0,W,H);
    // stjärnor högt upp
    if(hv>2e4){for(let k=0;k<50;k++){x.fillStyle=`rgba(255,255,255,${.2+((k*37)%10)/14})`;x.fillRect((k*173)%W,(k*91)%(H*.5),1.5,1.5)}}
    // marken
    x.fillStyle="#1b3b2a";x.fillRect(0,gy,W,H-gy);x.fillStyle="#2b6a45";x.fillRect(0,gy,W,3);
    // landmärken som linjer
    let lastY=1e9;[...LM].reverse().forEach(([m,n])=>{if(m>view*1.02||m<hv*.02)return;const y=gy-m*sc;if(Math.abs(lastY-y)<34)return;lastY=y;x.strokeStyle="rgba(255,255,255,.28)";x.setLineDash([6,8]);x.lineWidth=1.5;x.beginPath();x.moveTo(40,y);x.lineTo(W-40,y);x.stroke();x.setLineDash([]);
      x.fillStyle="rgba(255,255,255,.85)";x.font="600 20px Inter,sans-serif";x.textAlign="left";x.fillText(`${n} · ${fmt(m)}`,52,y-8)});
    // stapeln
    const sw=Math.max(34,Math.min(70,W*.07)),sx=W*.62-sw/2,sh=Math.max(2,hv*sc);
    const gr=x.createLinearGradient(sx,0,sx+sw,0);gr.addColorStop(0,"#6a4fa0");gr.addColorStop(.5,"#9b7ad6");gr.addColorStop(1,"#5a4090");x.fillStyle=gr;x.shadowColor="rgba(160,130,255,.7)";x.shadowBlur=28;x.fillRect(sx,gy-sh,sw,sh);x.shadowBlur=0;
    x.strokeStyle="rgba(255,255,255,.18)";x.lineWidth=1;const step=Math.max(3,sh/Math.min(60,S[i].n/40));for(let y=gy;y>gy-sh;y-=step){x.beginPath();x.moveTo(sx,y);x.lineTo(sx+sw,y);x.stroke()}
    x.fillStyle="#ffd86b";x.font="800 30px 'Source Serif 4',Georgia,serif";x.textAlign="left";x.fillText(fmt(hv),sx+sw+16,Math.max(top+26,gy-sh+10));
    // människa 1,7 m
    const hp=1.7*sc;if(hp>=6){const px=W*.62-sw/2-90;x.fillStyle="#cfd8ff";const hh=Math.max(hp,6);x.beginPath();x.arc(px,gy-hh+hh*.09,hh*.09,0,7);x.fill();x.fillRect(px-hh*.07,gy-hh+hh*.19,hh*.14,hh*.45);x.fillRect(px-hh*.07,gy-hh*.36,hh*.055,hh*.36);x.fillRect(px+hh*.015,gy-hh*.36,hh*.055,hh*.36);
      x.fillStyle="rgba(255,255,255,.8)";x.font="600 18px Inter,sans-serif";x.textAlign="center";x.fillText("du, 1,7 m",px,gy+28)}
    else{x.fillStyle="#cfd8ff";x.fillRect(W*.62-sw/2-90,gy-3,3,3);x.fillStyle="rgba(255,255,255,.7)";x.font="600 18px Inter,sans-serif";x.textAlign="center";x.fillText("du är den här pricken",W*.62-sw/2-90,gy+28)}}
  function ritaP(){const W=C.width,H=C.height,d=D[i];x.clearRect(0,0,W,H);const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,"#0a1628");g.addColorStop(1,"#12263f");x.fillStyle=g;x.fillRect(0,0,W,H);
    const gy=H-50;x.fillStyle="#1b3b2a";x.fillRect(0,gy,W,H-gy);x.fillStyle="#2b6a45";x.fillRect(0,gy,W,3);
    const pallet=(px,py,w,h,fill)=>{x.fillStyle="#6b4a2a";x.fillRect(px,py,w,h*.13);x.fillStyle="#3f8f5c";x.shadowColor="rgba(120,220,160,.5)";x.shadowBlur=8;x.fillRect(px,py-h*.87*fill,w,h*.87*fill);x.shadowBlur=0;x.strokeStyle="rgba(255,255,255,.25)";x.lineWidth=1;x.strokeRect(px,py-h*.87,w,h*.87)};
    const lab=(t,xx,yy,al)=>{x.fillStyle="rgba(255,255,255,.85)";x.font="600 20px Inter,sans-serif";x.textAlign=al||"center";x.fillText(t,xx,yy)};
    if(d.p<=1){const pw=Math.min(W*.42,420),ph=pw*.9,px=W*.5-pw/2,py=gy-6;pallet(px,py,pw,ph,Math.max(.012,d.p));
      const hp=ph/1.16*1.7;x.fillStyle="#cfd8ff";const hx=px-70,hh=Math.min(hp,gy-30);x.beginPath();x.arc(hx,gy-hh+hh*.09,hh*.09,0,7);x.fill();x.fillRect(hx-hh*.07,gy-hh+hh*.19,hh*.14,hh*.45);x.fillRect(hx-hh*.07,gy-hh*.36,hh*.055,hh*.36);x.fillRect(hx+hh*.015,gy-hh*.36,hh*.055,hh*.36);lab("du, 1,7 m",hx,gy+28);lab("1 lastpall = 100 miljoner dollar",px+pw/2,gy+28)}
    else{const n=d.p,cols=n<=10?5:n<=100?20:n<=1000?50:100,rows=Math.ceil(n/cols),aw=W-100,ah=gy-70,cw=Math.min(aw/cols,ah/rows*1.3),ch=cw*.75,gw=cols*cw,gx=(W-gw)/2,gyt=gy-rows*ch-6;
      for(let k=0;k<n;k++){const cx=gx+(k%cols)*cw,cy=gyt+Math.floor(k/cols)*ch;x.fillStyle="#3f8f5c";x.fillRect(cx+.5,cy+.5,Math.max(1,cw-1.2),Math.max(1,ch-1.2))}
      lab(n.toLocaleString("sv-SE")+(n===1?" lastpall":" lastpallar")+" · varje ruta = 1 pall",W/2,gyt-14)}
    x.fillStyle="#ffd86b";x.font="800 28px 'Source Serif 4',Georgia,serif";x.textAlign="right";x.fillText(d.l,W-24,40)}
  function visP(){const d=D[i];$("#pL").textContent=d.l;$("#pT").textContent=d.text;$("#pTid").textContent=d.v;$("#pLon").textContent=d.lb;$("#pS1").textContent="Vikt (100-dollarssedlar)";$("#pU1").textContent="en sedel väger ungefär 1 gram";$("#pS2").textContent="Så mycket plats";$("#pU2").textContent="en lastbil tar ca 24 ton";ritaP()}
  function setM(m){mode=m;$("#pM1").classList.toggle("on",m==="k");$("#pM2").classList.toggle("on",m==="d");$("#pK").textContent=m==="k"?"Pengar i skala · sedlar à 1 000 kr":"Pengar i skala · 100-dollarssedlar på lastpallar";
    $(".pg-f").textContent=m==="k"?"Sedlarna är räknade som 0,1 mm tjocka. Stapelns bredd är inte i skala: en riktig stapel skulle vara en tunn nål vid 100 km.":"Ungefär 1 miljon sedlar per lastpall (1,2 × 1 × 1 m). Siffrorna är grova och kan vara olika beroende på hur man packar.";
    vis(i)}
  function vis(n){i=Math.max(0,Math.min(S.length-1,n));$("#pR").value=i;if(mode==="d"){cancelAnimationFrame(raf);visP();return}$("#pS1").textContent="Tid att räkna sedlarna";$("#pU1").textContent="en sedel i sekunden";$("#pS2").textContent="Så länge tar det att tjäna ihop";$("#pU2").textContent="med 30 000 kr i månaden, före skatt";const d=S[i];$("#pL").textContent=d.l;$("#pT").textContent=d.text;$("#pTid").textContent=d.t;$("#pLon").textContent=d.lon;
    cancelAnimationFrame(raf);const from=hv,to=d.h,t0=performance.now(),dur=900;(function f(t){const k=Math.min(1,(t-t0)/dur),e=k*k*(3-2*k);hv=Math.exp(Math.log(from)+(Math.log(to)-Math.log(from))*e);rita();if(k<1)raf=requestAnimationFrame(f)})(t0)}
  $("#pM1").onclick=()=>setM("k");$("#pM2").onclick=()=>setM("d");$("#pR").oninput=()=>vis(+$("#pR").value);$("#pP").onclick=()=>vis(i-1);$("#pN").onclick=()=>vis(i+1);
  const key=e=>{if(!document.querySelector("#gv.on"))return;if(e.key==="ArrowRight")vis(i+1);else if(e.key==="ArrowLeft")vis(i-1)};document.addEventListener("keydown",key);
  vis(0);return()=>{cancelAnimationFrame(raf);document.removeEventListener("keydown",key)};
}});

/* ---------- Spirograf och kalejdoskop (helskärm) ---------- */
GREJER.push({id:"ritloop",titel:"Oändlig ritloop",kat:"Skapa",e:"🌀",c:"#7E57C2",mork:true,beskr:"Spirografen ritar själv, för alltid. Eller rita med kalejdoskop.",start(host){
  host.innerHTML=`<div class="rit"><canvas id="rC"></canvas><div class="rit-t" id="rTxt"></div>
  <div class="rit-ui"><div class="rit-rad"><button class="k on" id="rS">🌀 Spirograf</button><button class="k" id="rK">✨ Kalejdoskop</button></div>
  <div class="rit-rad"><button class="k" id="rN">Ny figur</button><button class="k" id="rY" hidden>◐ 12 speglar</button><button class="k" id="rP">⏸ Pausa</button><button class="k" id="rT">Sudda</button><button class="k" id="rB">⬇ Spara bild</button></div></div></div>`;
  const $=s=>host.querySelector(s),C=$("#rC"),x=C.getContext("2d");
  let W=0,H=0,dpr=1,mode="s",paus=false,raf=0,alive=true,txtT=0;
  const top=document.querySelector("#gv .gv-top");const root=$(".rit");
  function storlek(){dpr=Math.min(2,window.devicePixelRatio||1);const t=top?top.offsetHeight:67;root.style.setProperty("--top",t+"px");
    const w=window.innerWidth,h=window.innerHeight-t;if(Math.abs(w-W)<2&&Math.abs(h-H)<2)return;W=w;H=h;C.width=Math.round(W*dpr);C.height=Math.round(H*dpr);x.setTransform(dpr,0,0,dpr,0,0);svart();if(sp)ny()}
  function svart(){x.fillStyle="#070a11";x.fillRect(0,0,W,H)}
  function g(a,b){return b?g(b,a%b):a}
  /* spirograf: fortsätter rita och förändras långsamt, tidigare linjer bleknar */
  let sp=null,fade=0;
  function ny(){const par=[[5,3],[7,3],[8,3],[9,4],[11,4],[7,2],[5,2],[8,5],[10,3],[13,5]];const [R,r]=par[Math.random()*par.length|0];
    const d0=r*(1.1+Math.random()*1.3);sp={R,r,d0,t:0,h:Math.random()*360,rot:0,age:0,A:.18+Math.random()*.25,fas:Math.random()*6,hs:6+Math.random()*10,
      s:Math.min(W,H)*.47/((R-r)+d0*1.35)};svart();x.globalAlpha=1}
  function punkt(t,d){const {R,r}=sp;return[(R-r)*Math.cos(t)+d*Math.cos((R-r)/r*t),(R-r)*Math.sin(t)-d*Math.sin((R-r)/r*t)]}
  function stegS(){
    const {R,r,d0}=sp;const cx=W/2,cy=H/2;x.lineCap="round";x.lineWidth=Math.max(1.2,Math.min(W,H)/420);
    for(let k=0;k<24;k++){
      const t=sp.t,t2=t+.028;sp.age+=.028;
      const mod=1+sp.A*Math.sin(sp.age*.012+sp.fas),d=d0*mod;
      const a=punkt(t,d),b=punkt(t2,d),cr=Math.cos(sp.rot),sr=Math.sin(sp.rot);
      const hue=(sp.h+sp.age*sp.hs)%360;x.strokeStyle=`hsla(${hue},95%,66%,.85)`;x.shadowColor=`hsl(${hue},100%,60%)`;x.shadowBlur=9;
      x.beginPath();x.moveTo(cx+(a[0]*cr-a[1]*sr)*sp.s,cy+(a[0]*sr+a[1]*cr)*sp.s);x.lineTo(cx+(b[0]*cr-b[1]*sr)*sp.s,cy+(b[0]*sr+b[1]*cr)*sp.s);x.stroke();
      sp.t=t2;sp.rot+=.00045;
    }
    x.shadowBlur=0;fade++;if(fade%12===0){x.fillStyle="rgba(7,10,17,.035)";x.fillRect(0,0,W,H)}
    if(sp.age>7000)ny();   // ungefär två och en halv minut, sedan en ny figur
  }
  function slinga(){if(!alive)return;if(!paus&&mode==="s"&&sp)stegS();txtT++;if(txtT===400)$("#rTxt").classList.add("dim");raf=requestAnimationFrame(slinga)}
  /* kalejdoskop */
  let sym=12,down=false,lx=0,ly=0,hue=0;
  function pos(e){const b=C.getBoundingClientRect();return[(e.clientX-b.left)*W/b.width-W/2,(e.clientY-b.top)*H/b.height-H/2]}
  function seg(a,b){hue=(hue+2.2)%360;const lw=Math.max(2,Math.min(W,H)/200);x.lineWidth=lw;x.lineCap="round";x.strokeStyle=`hsl(${hue},95%,66%)`;x.shadowColor=`hsl(${hue},100%,60%)`;x.shadowBlur=12;
    for(let k=0;k<sym;k++){const ang=k*Math.PI*2/sym,c=Math.cos(ang),s=Math.sin(ang);
      for(const f of [1,-1]){const ay=a[1]*f,by=b[1]*f;x.beginPath();x.moveTo(W/2+a[0]*c-ay*s,H/2+a[0]*s+ay*c);x.lineTo(W/2+b[0]*c-by*s,H/2+b[0]*s+by*c);x.stroke()}}
    x.shadowBlur=0}
  C.onpointerdown=e=>{if(mode==="s"){ny();return}down=true;[lx,ly]=pos(e);seg([lx,ly],[lx+.01,ly+.01]);C.setPointerCapture(e.pointerId);e.preventDefault()};
  C.onpointermove=e=>{if(!down)return;const p=pos(e);seg([lx,ly],p);lx=p[0];ly=p[1]};
  C.onpointerup=C.onpointercancel=()=>{down=false};C.style.touchAction="none";
  function setM(m){mode=m;$("#rS").classList.toggle("on",m==="s");$("#rK").classList.toggle("on",m==="k");$("#rY").hidden=m!=="k";$("#rN").hidden=m!=="s";
    $("#rTxt").textContent=m==="s"?"Spirografen ritar vidare och förändras långsamt. Tryck för en ny figur.":"Rita med fingret eller musen. Allt speglas runt mitten.";$("#rTxt").classList.remove("dim");txtT=0;svart();if(m==="s")ny()}
  $("#rS").onclick=()=>setM("s");$("#rK").onclick=()=>setM("k");$("#rN").onclick=()=>ny();
  $("#rY").onclick=e=>{sym=sym===12?8:sym===8?6:sym===6?16:12;e.target.textContent="◐ "+sym+" speglar"};
  $("#rP").onclick=e=>{paus=!paus;e.target.textContent=paus?"▶ Fortsätt":"⏸ Pausa"};
  $("#rT").onclick=()=>{svart();if(mode==="s")ny()};
  $("#rB").onclick=()=>{const a=document.createElement("a");a.download="min-ritning.png";a.href=C.toDataURL("image/png");a.click()};
  const ro=()=>storlek();window.addEventListener("resize",ro);storlek();setM("s");raf=requestAnimationFrame(slinga);
  return()=>{cancelAnimationFrame(raf);alive=false;window.removeEventListener("resize",ro)};
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
GREJER.push({id:"djuret",titel:"Hitta djuret",kat:"Hjärnan",e:"🐆",c:"#546E7A",mork:true,beskr:"Mästare på att gömma sig. Hittar du djuret?",start(host){
  const B=[
   {src:"snoleopard1.jpg",w:1280,h:960,m:[[618,458]],r:46,f:"Hitta snöleoparden! Den tittar fram ur en liten glipa i berget.",tips:"Titta i skuggan under bergsöverhänget, mitt i bilden.",fakta:"Snöleoparden bor högt upp i bergen i Asien. Dess grå, fläckiga päls gör den nästan osynlig mot sten och snö.",ant:"Foto: Ksuryawanshi, CC BY-SA 4.0 (Wikimedia Commons)"},
   {src:"djur-gecko.jpg",w:960,h:568,m:[[450,280]],r:190,f:"Hitta geckon! Den ser ut som lav på en gren.",tips:"Det som ser ut som en lavbevuxen kvist är djuret. Titta längs hela grenen.",fakta:"Mossgeckon bor på Madagaskar. Den har hudflikar längs kroppen som tar bort skuggorna, så den ser ut att sitta platt som en del av grenen.",ant:"Foto: Charles J. Sharp, CC BY-SA 4.0 (Wikimedia Commons)"}];
  for(let k=B.length-1;k>0;k--){const j=1+Math.floor(Math.random()*k);[B[k],B[j]]=[B[j],B[k]]}  // leoparden först, resten blandas
  let i=0,hit=[],fel=0,klar=false;
  host.innerHTML=`<div class="hitta"><div class="kick" id="hK"></div><h3 class="ill-q" id="hQ"></h3><div class="hitta-b" id="hB"><div class="hitta-w" id="hW"><img id="hI" alt="Foto av ett djur som gömmer sig" draggable="false"></div></div><p class="rit-t" id="hM"></p><p class="hitta-fakta" id="hF"></p>
  <div class="ill-kn"><button class="k" id="hT">💡 Tips</button><button class="k" id="hV">Visa var</button><button class="k ok" id="hN">Nästa bild ›</button></div><p class="kallan" id="hA"></p><p class="hitta-mer">Vill du ha fler svåra bilder? <a href="https://www.livescience.com/animals/camouflaged-animals-are-hiding-in-every-one-of-these-photos-can-you-spot-them-all" target="_blank" rel="noopener">Se Live Sciences galleri med kamouflerade djur ↗</a> (öppnas på en annan sajt, på engelska)</p></div>`;
  const $=s=>host.querySelector(s),Q=$("#hQ"),W=$("#hW"),Im=$("#hI"),Mm=$("#hM"),A=$("#hA"),F=$("#hF");
  function ring(m,cls){const d=B[i],e=document.createElement("div");e.className="ring "+(cls||"");e.style.left=(m[0]/d.w*100)+"%";e.style.top=(m[1]/d.h*100)+"%";e.style.width=(2*d.r/d.w*100)+"%";e.style.aspectRatio="1";W.appendChild(e)}
  function ladda(){const d=B[i];hit=[];fel=0;klar=false;Q.textContent=d.f;Im.src="bilder/"+d.src;Mm.textContent="Tryck på bilden där du ser djuret.";A.textContent=d.ant;F.textContent="";$("#hK").textContent="BILD "+(i+1)+" / "+B.length;W.querySelectorAll(".ring").forEach(r=>r.remove())}
  function klart(txt){klar=true;Mm.textContent=txt;F.textContent=B[i].fakta}
  Im.onclick=e=>{const d=B[i],b=Im.getBoundingClientRect(),px=(e.clientX-b.left)*d.w/b.width,py=(e.clientY-b.top)*d.h/b.height;
    const k=d.m.findIndex((m,j)=>!hit.includes(j)&&Math.hypot(px-m[0],py-m[1])<d.r*1.6);
    if(k>=0){hit.push(k);ring(d.m[k],"ok");if(hit.length===d.m.length)klart("🎉 Du hittade "+(d.m.length>1?"alla!":"den!"));else Mm.textContent="Snyggt! En till!"}
    else if(!klar){fel++;Mm.textContent=fel>2?"Fortfarande inte. Prova 💡 Tips!":"Inte där. Titta noga!"}};
  $("#hT").onclick=()=>{Mm.textContent=B[i].tips};
  $("#hV").onclick=()=>{B[i].m.forEach((m,j)=>{if(!hit.includes(j)){ring(m,"visa");hit.push(j)}});klart("Där var den!")};
  $("#hN").onclick=()=>{i=(i+1)%B.length;ladda()};
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
