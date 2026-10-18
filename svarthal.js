/* Inuti ett svart hål: en film i åtta scener, ritad i kod (canvas). Delas av Specialare och Rymdlabbet.
   Bilderna och texterna är egna.
   MPSvartHal.start(host,{overlay,onClose}) ritar filmen i host och returnerar en funktion som städar.
   overlay:true = hela fönstret med en egen ✕ (Rymdlabbet); annars fyller filmen ytan under sidhuvudet (Specialare).
   Berättarröst: inspelade repliker (ElevenLabs) i ljud/svarthal/s<scen>-<replik>.mp3; filmen väntar in rösten. Saknas en fil visas bara texten.
   (Webbläsarens röst prövades och valdes bort av läraren.) Undertexter ord för ord. Ljudmatta: Ljud.rymd om ljud.js finns, eller ett eget ljud med meta.mat (se matStart). */
(function(){
const CSS=`
.sh{position:fixed;left:0;right:0;bottom:0;top:var(--top,67px);z-index:5;background:#03050a;color:#fff;font-family:Inter,"Helvetica Neue",Arial,system-ui,sans-serif;overflow:hidden;user-select:none;-webkit-user-select:none}
.sh.ov{top:0;z-index:200}
.sh canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.sh-cap{position:absolute;left:clamp(16px,4vw,56px);bottom:clamp(70px,11vh,104px);max-width:min(46ch,88vw);pointer-events:none}
.sh-kick{font-size:.72rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#7fd6ff;opacity:.9;margin-bottom:10px;display:flex;gap:12px;align-items:center}
.sh-kick::before{content:"";width:28px;height:1px;background:#7fd6ff;opacity:.8}
.sh-txt{font-family:"Source Serif 4",Georgia,serif;font-weight:600;font-size:clamp(1.15rem,2.1vw,1.85rem);line-height:1.32;text-shadow:0 2px 18px rgba(0,0,0,.9)}
.sh-txt span{opacity:0;display:inline-block;transform:translateY(6px);filter:blur(4px);animation:shw .55s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes shw{to{opacity:1;transform:none;filter:none}}
.sh-bar{position:absolute;left:0;right:0;bottom:0;padding:12px clamp(12px,3vw,40px) calc(12px + env(safe-area-inset-bottom,0px));display:flex;align-items:center;gap:8px;background:linear-gradient(transparent,rgba(0,0,0,.75))}
.sh-b{min-width:44px;height:44px;border-radius:22px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.07);color:#fff;font:600 1rem Inter,system-ui,sans-serif;padding:0 14px;cursor:pointer;backdrop-filter:blur(8px)}
.sh-b:hover{background:rgba(255,255,255,.16)}.sh-b.off{opacity:.45}
.sh-dots{display:flex;gap:6px;flex:1;justify-content:center;flex-wrap:wrap}
.sh-dot{width:28px;height:4px;border-radius:2px;background:rgba(255,255,255,.22);border:0;padding:0;cursor:pointer;position:relative;overflow:hidden}
.sh-dot i{position:absolute;inset:0;width:0;background:#ffd86b}
.sh-dot.done i{width:100%}
.sh-start{position:absolute;inset:0;display:grid;place-items:center;text-align:center;background:radial-gradient(ellipse at 50% 45%,rgba(255,140,60,.12),rgba(0,0,0,.6) 70%)}
.sh-start h2{font-family:"Source Serif 4",Georgia,serif;font-size:clamp(2.2rem,6vw,4.6rem);margin:0 0 6px;line-height:1;background:linear-gradient(100deg,#ffd86b,#fff 55%,#ffb070);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.sh-start p{margin:0 0 22px;color:rgba(255,255,255,.75);font-size:1.05rem}
.sh-play{height:56px;padding:0 30px;border-radius:28px;border:0;background:#fff;color:#08101e;font:800 1.15rem Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 0 40px rgba(255,200,120,.5)}
.sh-opt{margin-top:14px;font-size:.92rem;color:rgba(255,255,255,.7)}
.sh-opt label{cursor:pointer}
.sh-end{position:absolute;inset:0;display:grid;place-items:center;text-align:center;background:rgba(0,0,0,.45);animation:she .8s ease}
@keyframes she{from{opacity:0}}
.sh-end h2{font-family:"Source Serif 4",Georgia,serif;font-size:clamp(2rem,5vw,3.6rem);margin:0 0 8px;color:#ffd86b}
.sh-end p{max-width:52ch;margin:0 auto 18px;color:rgba(255,255,255,.78);line-height:1.45;padding:0 16px}
.sh-x{position:absolute;top:calc(12px + env(safe-area-inset-top,0px));right:14px;z-index:3}
@media(max-width:700px){.sh-cap{bottom:max(116px,16vh)}.sh-bar{flex-wrap:wrap;justify-content:center;gap:8px 8px;padding-top:8px}.sh-dots{order:-1;flex:1 0 100%;gap:4px}.sh-dot{width:20px}.sh-b{padding:0 12px}.sh-kick{font-size:.66rem}}
@media(prefers-reduced-motion:reduce){.sh-txt span{animation:none;opacity:1;transform:none;filter:none}}`;

const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/";}})();
const TAU=Math.PI*2,cl=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,eo=t=>1-Math.pow(1-cl(t,0,1),3);
const seg=(t,a,b)=>cl((t-a)/(b-a),0,1);

/* ---------- Manus: åtta scener, undertexter med starttid i sekunder ---------- */
const SC0=[
 {k:"Inledning",d:7,cap:[[0,"Vad händer om man faller in i ett svart hål? Följ med på en resa i sju steg."]]},
 {k:"01 · Flykthastighet",d:21,cap:[[0,"Kasta en boll rakt upp. Den saktar in, vänder och faller ner igen."],[6.5,"Kastar du hårdare kommer den högre. Men jordens tyngdkraft drar alltid tillbaka den."],[13,"Vid 11,2 kilometer i sekunden kommer den aldrig tillbaka. Det kallas jordens flykthastighet."]]},
 {k:"02 · Mer tyngdkraft",d:25,cap:[[0,"Ju starkare tyngdkraft, desto snabbare måste man åka för att komma loss."],[8,"Pressa ihop massa på en allt mindre yta, så växer flykthastigheten: från månen till en neutronstjärna."],[17.5,"Blir den större än ljusets hastighet, 300 000 kilometer i sekunden, kan inte ens ljus komma ut. Då är det ett svart hål."]]},
 {k:"03 · Händelsehorisonten",d:20,cap:[[0,"Gränsen runt ett svart hål heter händelsehorisonten."],[5,"Massan böjer rumtiden. Ljuset måste följa rumtiden, och nära hålet lutar alla vägar inåt."],[12.5,"Vid horisonten pekar varje väg in mot mitten. Det finns ingen väg ut, inte ens för ljus."]]},
 {k:"04 · Ingen dammsugare",d:21,cap:[[0,"Ett svart hål suger inte in allt omkring sig."],[4.5,"Om solen pressades ihop till ett svart hål skulle den bli bara ungefär 6 kilometer bred."],[11.5,"Men jorden skulle fortsätta i samma bana. På vårt avstånd drar den lika mycket som förut. Det skulle bara bli mörkt och kallt."]]},
 {k:"05 · Sista stabila banan",d:21,cap:[[0,"Långt från hålet kan man cirkla runt i en stabil bana, som jorden runt solen."],[7,"Men innanför ungefär tre gånger horisontens radie finns inga stabila banor."],[13.5,"Den som kommer närmare spiralar in, hur den än försöker."]]},
 {k:"06 · Tidvattenkrafter",d:28,cap:[[0,"När du står på jorden är fötterna lite närmare jordens mitt än huvudet. Därför dras fötterna lite hårdare."],[7.5,"Skillnaden är mindre än en miljondel, så du märker den inte."],[12,"Nära ett svart hål blir skillnaden enorm. Den kallas tidvattenkraft och sträcker en astronaut från huvud till fot."],[19.5,"Till slut delas astronauten i två delar. Sedan delas varje del igen: 2, 4, 8, 16, hela vägen in."]]},
 {k:"07 · Spagettifiering",d:28,cap:[[0,"Samtidigt pressas allt ihop från sidorna, eftersom allt dras mot samma punkt i mitten."],[7,"Det som faller in dras ut till en lång, tunn tråd, som tandkräm ur en tub. Forskarna kallar det spagettifiering."],[15,"Vid små svarta hål händer det långt utanför horisonten. Vid jättestora, som det i Vintergatans mitt, passerar man horisonten hel."],[22,"Vad som finns allra längst in vet ingen. Där räcker inte dagens fysik till."]]}
];

/* ---------- Röst: en inspelad fil per replik ---------- */
const V={on:true,busy:false,a:null,base:ROOT+"ljud/svarthal/"};
function voiceStop(){V.busy=false;if(V.a){try{V.a.pause();}catch(e){}V.a=null;}duck(false);}
let MAT="rymd";/* Ljudmatta: meta.mat (MAT) = "rymd" (standard) eller ett namn i Ljud.ambient (t.ex. "vagor", "vulkan", "djungel") */
function matStart(L){if(MAT!=="rymd"){if(L.ambient&&!(L.ambient.g&&L.ambient.kind===MAT))L.ambient.start(MAT);}else if(L.rymd)L.rymd.start();}
function matStop(L){if(L.rymd&&L.rymd.stop)L.rymd.stop();if(L.ambient&&L.ambient.stop&&MAT!=="rymd")L.ambient.stop();}
function duck(on){const L=window.Ljud;try{const o=MAT!=="rymd"?L&&L.ambient:L&&L.rymd,g=o&&o.g;if(g&&g.context)g.gain.setTargetAtTime(on?.16:(MAT!=="rymd"?1:.55),g.context.currentTime,.4);}catch(e){}}
const VOICE_VER="20261036";/* ändra när röstfiler byts ut, så att webbläsare inte spelar gamla cachade filer */
function voicePlay(si,ci){voiceStop();if(!V.on)return;const a=new Audio(V.base+"s"+si+"-"+(ci+1)+".mp3?v="+VOICE_VER);a.preload="auto";V.a=a;V.busy=true;
  const done=()=>{clearTimeout(V.t);if(V.a===a){V.busy=false;V.a=null;duck(false);}};a.onended=done;a.onerror=done;duck(true);
  clearTimeout(V.t);V.t=setTimeout(done,16000);   // reservutgång: filmen får aldrig hänga om ljudet inte startar
  const p=a.play();if(p&&p.catch)p.catch(done);}

/* ---------- Stjärnhimmel ---------- */
let STARS=[];
function makeStars(){let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;STARS=[];for(let i=0;i<520;i++)STARS.push({x:r(),y:r(),z:.2+r()*.8,tw:r()*TAU,c:r()<.15?"#ffd9b0":r()<.3?"#b8d8ff":"#ffffff"});}
makeStars();

window.MPSvartHal={start(host,o){o=o||{};const D=o.def,SC=D?D.SC:SC0,M=Object.assign({hud:"PLUGGPARKEN · RYMDARKIVET · FILM 01",titel:"Inuti ett svart hål",under:"En film i sju steg · ca 3 minuter",slutRubrik:"Tack för att du har lyssnat",slutText:"Nu vet du lite mer om en av universums mest mystiska platser. Fortsätt vara nyfiken! Filmen handlar om flykthastighet, händelsehorisonten, den sista stabila banan och tidvattenkrafter.",igen:"↻ Se filmen igen"},D&&D.meta);MAT=M.mat||"rymd";V.base=ROOT+"ljud/"+(D?D.ljud:"svarthal")+"/";
  if(!document.getElementById("sh-css")){const st=document.createElement("style");st.id="sh-css";st.textContent=CSS;document.head.appendChild(st);}
  const root=document.createElement("div");root.className="sh"+(o.overlay?" ov":"");
  root.innerHTML=`<canvas></canvas><div class="sh-cap"><div class="sh-kick"></div><div class="sh-txt"></div></div>
   <div class="sh-bar"><button class="sh-b" data-a="prev" aria-label="Förra scenen">⏮</button><button class="sh-b" data-a="play" aria-label="Pausa">⏸</button><button class="sh-b" data-a="next" aria-label="Nästa scen">⏭</button>
   <div class="sh-dots">${SC.map((s,i)=>`<button class="sh-dot" data-i="${i}" aria-label="${s.k}"><i></i></button>`).join("")}</div>
   <button class="sh-b" data-a="voice" aria-label="Berättarröst av eller på">🗣 Röst</button><button class="sh-b" data-a="snd" aria-label="Ljud">🔊</button><button class="sh-b" data-a="fs" aria-label="Helskärm">⛶</button></div>
   ${o.overlay?'<button class="sh-b sh-x" data-a="close" aria-label="Stäng">✕</button>':""}
   <div class="sh-start"><div><h2>${M.titel}</h2><p>${M.under}</p><button class="sh-play" data-a="go">▶ Starta filmen</button>
   </div></div>`;
  host.appendChild(root);
  const C=root.querySelector("canvas"),x=C.getContext("2d"),$=s=>root.querySelector(s);
  let W=800,H=600,dpr=1,si=0,st=0,playing=false,started=false,raf=0,last=0,capShown=-1,ended=false,alive=true;
  function fit(){const r=root.getBoundingClientRect();dpr=Math.min(2,window.devicePixelRatio||1);W=r.width;H=r.height;C.width=Math.round(W*dpr);C.height=Math.round(H*dpr);x.setTransform(dpr,0,0,dpr,0,0);}
  fit();const ro=window.ResizeObserver?new ResizeObserver(()=>{fit();draw();}):null;if(ro)ro.observe(root);
  // ytan där bilden ritas (ovanför texten), och en skala
  const A=()=>{const port=W<H*.9;return port?{x:0,y:H*.06,w:W,h:H*.56}:{x:W*.02,y:H*.04,w:W*.96,h:H*.74};};
  const snd=()=>window.Ljud;
  function sndIcon(){const L=snd();$('[data-a="snd"]').textContent=L&&L.on?"🔊":"🔇";$('[data-a="snd"]').classList.toggle("off",!(L&&L.on));}
  // undertexter
  function showCap(i){const s=SC[si],c=s.cap[i];if(!c)return;capShown=i;$(".sh-kick").textContent=s.k;
    const words=c[1].split(" ");$(".sh-txt").innerHTML=words.map((w,k)=>`<span style="animation-delay:${(k*.06).toFixed(2)}s">${w}</span>`).join(" ");if(playing)voicePlay(si,i);}
  function goto(i,keepPlay){voiceStop();si=cl(i,0,SC.length-1);st=0;capShown=-1;ended=false;const e=$(".sh-end");if(e)e.remove();
    root.querySelectorAll(".sh-dot").forEach((d,k)=>d.classList.toggle("done",k<si));showCap(0);if(keepPlay!==false)setPlay(true);draw();}
  function setPlay(p){const was=playing;playing=p;$('[data-a="play"]').textContent=p?"⏸":"▶";
    if(!p){if(V.a){try{V.a.pause();}catch(e){}}}else if(was===false&&V.a){V.a.play().catch(()=>{V.busy=false;});}else if(p&&!V.a&&capShown>=0&&st<SC[si].d&&!V.busy){/* första starten eller efter hopp */voicePlay(si,capShown);}
    const L=snd();if(L){if(p&&L.on)matStart(L);else matStop(L);}}
  function finish(){playing=false;$('[data-a="play"]').textContent="▶";ended=true;voiceStop();document.dispatchEvent(new Event("mp-sh-slut"));const L=snd();if(L)matStop(L);
    const e=document.createElement("div");e.className="sh-end";e.innerHTML=`<div><h2>${M.slutRubrik}</h2><p>${M.slutText}</p><button class="sh-play" data-a="again">${M.igen}</button></div>`;root.appendChild(e);if(V.on){const a=new Audio(V.base+"s"+SC.length+"-1.mp3?v="+VOICE_VER);V.a=a;V.busy=true;duck(true);const dn=()=>{if(V.a===a){V.busy=false;V.a=null;duck(false);}};a.onended=dn;a.onerror=dn;const p=a.play();if(p&&p.catch)p.catch(dn);}}
  root.addEventListener("click",ev=>{const b=ev.target.closest("[data-a],[data-i]");if(!b)return;
    if(b.dataset.i!=null){if(!started)start();goto(+b.dataset.i);return;}
    const a=b.dataset.a;
    if(a==="go")start();else if(a==="again")goto(0);else if(a==="play"){if(!started)return start();if(ended)return goto(0);setPlay(!playing);}
    else if(a==="next"){if(!started)start();goto(si+1);}else if(a==="prev"){if(!started)start();goto(st>3?si:si-1);}
    else if(a==="voice"){V.on=!V.on;$('[data-a="voice"]').classList.toggle("off",!V.on);if(!V.on)voiceStop();}
    else if(a==="snd"){const L=snd();if(L){L.set(!L.on);if(L.on&&playing)matStart(L);else matStop(L);document.dispatchEvent(new Event("mp-ljud-andrat"));}sndIcon();}
    else if(a==="fs"){const el=document.fullscreenElement;if(el)document.exitFullscreen();else (root.requestFullscreen||root.webkitRequestFullscreen||function(){}).call(root);}
    else if(a==="close"){cleanup();o.onClose&&o.onClose();}});
  function start(){if(started)return;started=true;$(".sh-start").remove();goto(0);}
  const key=e=>{if(!alive)return;if(e.key===" "){e.preventDefault();if(!started)start();else setPlay(!playing);}else if(e.key==="ArrowRight"){if(started)goto(si+1);}else if(e.key==="ArrowLeft"){if(started)goto(si-1);}else if(e.key==="Escape"&&o.overlay){cleanup();o.onClose&&o.onClose();}};
  document.addEventListener("keydown",key);
  const vis=()=>{if(document.hidden&&playing)setPlay(false);};document.addEventListener("visibilitychange",vis);
  sndIcon();
  function loop(now){if(!alive)return;raf=requestAnimationFrame(loop);const dt=Math.min(.12,(now-last)/1000);last=now;
    if(playing){const s=SC[si],nxt=s.cap[capShown+1];
      // filmen väntar in rösten: tiden står still vid nästa text och vid scenens slut tills repliken är klar
      const hold=V.on&&V.busy&&((nxt&&st+dt>=nxt[0])||(!nxt&&st+dt>=s.d));
      if(!hold){st+=dt;if(nxt&&st>=nxt[0])showCap(capShown+1);
        if(st>=s.d){if(si<SC.length-1)goto(si+1);else finish();}}
      const dot=root.querySelectorAll(".sh-dot")[si];if(dot)dot.firstChild.style.width=(cl(st/s.d,0,1)*100)+"%";}
    draw();}
  last=performance.now();raf=requestAnimationFrame(loop);

  /* ---------- Rita ---------- */
  function draw(){const t=st,k=cl(st/SC[si].d,0,1);x.save();x.clearRect(0,0,W,H);bg(t);x.save();SCN[si](t,k);x.restore();hud();x.restore();}
  function bg(t){const g=x.createRadialGradient(W*.5,H*.42,0,W*.5,H*.42,Math.max(W,H)*.75);g.addColorStop(0,"#0c1426");g.addColorStop(1,"#02030a");x.fillStyle=g;x.fillRect(0,0,W,H);
    const T=performance.now()/1000;for(const s of STARS){const px=((s.x+T*.002*s.z)%1)*W,py=s.y*H,a=.25+.55*s.z*(.7+.3*Math.sin(T*1.3+s.tw));x.globalAlpha=a;x.fillStyle=s.c;x.fillRect(px,py,s.z*1.6,s.z*1.6);}x.globalAlpha=1;}
  function hud(){const m=Math.max(12,Math.min(W,H)*.025),l=Math.min(W,H)*.05;x.strokeStyle="rgba(127,214,255,.35)";x.lineWidth=1;
    [[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(([a,b,sx,sy])=>{x.beginPath();x.moveTo(a,b+sy*l);x.lineTo(a,b);x.lineTo(a+sx*l,b);x.stroke();});
    x.fillStyle="rgba(127,214,255,.7)";x.font="600 11px Inter,system-ui,sans-serif";x.textAlign="left";x.fillText(M.hud,m+l*.5,m+16);
    x.textAlign="right";x.fillText(String(si).padStart(2,"0")+" / "+String(SC.length-1).padStart(2,"0"),W-m-l*.5-(o.overlay?52:0),m+16);}
  const font=(w,s)=>`${w} ${Math.round(s)}px Inter,system-ui,sans-serif`,serif=(s)=>`700 ${Math.round(s)}px "Source Serif 4",Georgia,serif`;
  function label(t,px,py,col,al,sz){x.font=font(600,sz||12);x.fillStyle=col||"rgba(255,255,255,.85)";x.textAlign=al||"left";x.fillText(t,px,py);}
  function tag(t,px,py,col,al){label(t.toUpperCase(),px,py,col||"#7fd6ff",al,11);}
  // ett svart hål med gasskiva, ljusring och den böjda bilden av skivan ovanför
  function hole(cx,cy,r,t,a){a=a==null?1:a;if(r<1)return;x.save();x.globalAlpha=a;
    let g=x.createRadialGradient(cx,cy,r*.9,cx,cy,r*4.2);g.addColorStop(0,"rgba(255,150,70,.35)");g.addColorStop(.35,"rgba(255,110,40,.10)");g.addColorStop(1,"rgba(255,90,30,0)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,r*4.2,0,TAU);x.fill();
    const disk=(front)=>{x.save();x.beginPath();front?x.rect(cx-r*5,cy,r*10,r*5):x.rect(cx-r*5,cy-r*5,r*10,r*5);x.clip();x.globalCompositeOperation="lighter";
      for(let i=0;i<44;i++){const q=i/43,rx=r*(1.5+q*2),ry=rx*.2,al=((1-q)*.15+.012)*(i<3?.5:1);x.strokeStyle=`rgba(${255},${Math.round(205-q*125)},${Math.round(150-q*115)},${al})`;x.lineWidth=r*.085;x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,TAU);x.stroke();}
      for(let j=0;j<6;j++){const ang=(t*.6+j*1.05)%TAU,rx=r*(1.8+(j%3)*.5);x.strokeStyle="rgba(255,240,210,.35)";x.lineWidth=r*.06;x.beginPath();x.ellipse(cx,cy,rx,rx*.2,0,ang,ang+.5);x.stroke();}x.restore();};
    disk(false);
    // bilden av skivan böjd över hålet (gravitationslins)
    x.save();x.globalCompositeOperation="lighter";for(let i=0;i<18;i++){const q=i/17;x.strokeStyle=`rgba(255,${Math.round(215-q*95)},${Math.round(160-q*110)},${(.2-q*.1)})`;x.lineWidth=r*.055;x.beginPath();x.ellipse(cx,cy,r*(1.16+q*.38),r*(1.1+q*.46),0,Math.PI,TAU);x.stroke();}x.restore();
    x.fillStyle="#000";x.beginPath();x.arc(cx,cy,r,0,TAU);x.fill();
    x.save();x.globalCompositeOperation="lighter";x.strokeStyle="rgba(255,236,200,.9)";x.lineWidth=Math.max(1,r*.035);x.shadowColor="rgba(255,190,120,1)";x.shadowBlur=r*.35;x.beginPath();x.arc(cx,cy,r*1.03,0,TAU);x.stroke();x.restore();
    disk(true);x.restore();}
  function planet(cx,cy,r,c1,c2,glow){if(glow){const g=x.createRadialGradient(cx,cy,r,cx,cy,r*1.25);g.addColorStop(0,glow);g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,r*1.25,0,TAU);x.fill();}
    const g=x.createRadialGradient(cx-r*.35,cy-r*.4,r*.1,cx,cy,r);g.addColorStop(0,c1);g.addColorStop(1,c2);x.fillStyle=g;x.beginPath();x.arc(cx,cy,r,0,TAU);x.fill();}
  function arrow(x1,y1,x2,y2,col,w){const a=Math.atan2(y2-y1,x2-x1),h=Math.min(12,Math.hypot(x2-x1,y2-y1)*.4)+w;x.strokeStyle=col;x.fillStyle=col;x.lineWidth=w;x.beginPath();x.moveTo(x1,y1);x.lineTo(x2-Math.cos(a)*h*.6,y2-Math.sin(a)*h*.6);x.stroke();
    x.beginPath();x.moveTo(x2,y2);x.lineTo(x2-Math.cos(a-.42)*h,y2-Math.sin(a-.42)*h);x.lineTo(x2-Math.cos(a+.42)*h,y2-Math.sin(a+.42)*h);x.closePath();x.fill();}
  function glowDot(px,py,r,col){x.save();x.globalCompositeOperation="lighter";const g=x.createRadialGradient(px,py,0,px,py,r*4);g.addColorStop(0,col);g.addColorStop(.25,col.replace(/[\d.]+\)$/,".35)"));g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.beginPath();x.arc(px,py,r*4,0,TAU);x.fill();x.restore();x.fillStyle="#fff";x.beginPath();x.arc(px,py,r*.6,0,TAU);x.fill();}
  // en astronaut i ljuslinjer, ritad i en egen duk så att den kan sträckas och delas
  const AST=document.createElement("canvas");AST.width=120;AST.height=300;(function(){const g=AST.getContext("2d");g.strokeStyle="#9fe3ff";g.fillStyle="rgba(120,200,255,.18)";g.lineWidth=5;g.lineCap="round";g.lineJoin="round";g.shadowColor="#7fd6ff";g.shadowBlur=10;
    g.beginPath();g.arc(60,40,26,0,TAU);g.fill();g.stroke();g.beginPath();g.ellipse(64,40,15,11,0,0,TAU);g.stroke();
    g.beginPath();g.moveTo(36,78);g.lineTo(84,78);g.lineTo(88,170);g.lineTo(32,170);g.closePath();g.fill();g.stroke();
    g.beginPath();g.moveTo(36,84);g.lineTo(16,150);g.moveTo(84,84);g.lineTo(104,150);g.stroke();
    g.beginPath();g.moveTo(44,170);g.lineTo(40,280);g.moveTo(76,170);g.lineTo(80,280);g.stroke();g.beginPath();g.moveTo(30,284);g.lineTo(50,284);g.moveTo(70,284);g.lineTo(92,284);g.stroke();})();
  // astronauten delad i n bitar med glipor, sträckt sy gånger på höjden och sx gånger på bredden; feet = fötterna nedåt
  function astro(cx,top,h,n,gap,sx,sy,a){const w=h*.4*sx,H0=h*sy,ph=H0/n;x.save();x.globalAlpha=a==null?1:a;
    for(let i=0;i<n;i++){const sy0=AST.height*i/n,sh=AST.height/n,y=top+i*(ph+gap);x.drawImage(AST,0,sy0,AST.width,sh,cx-w/2,y,w,ph+.5);}x.restore();return top+n*ph+(n-1)*gap;}

  const SCN0=[
  // 0 · Inledning: ett svart hål tonar fram
  (t,k)=>{const a=A(),cx=a.x+a.w/2,cy=a.y+a.h*.52,s=Math.min(a.w,a.h);hole(cx,cy,s*(.1+.03*eo(t/6)),t,eo(t/2.5));
    x.font=serif(Math.max(26,s*.085));x.textAlign="center";x.globalAlpha=eo((t-.8)/2);const g=x.createLinearGradient(cx-s*.4,0,cx+s*.4,0);g.addColorStop(0,"#ffd86b");g.addColorStop(.5,"#fff");g.addColorStop(1,"#ffb070");x.fillStyle=g;x.fillText("Inuti ett svart hål",cx,a.y+a.h*.14+s*.05);
    x.globalAlpha=eo((t-1.6)/2)*.75;label("EN FILM I SJU STEG",cx,a.y+a.h*.14+s*.05+28,"#7fd6ff","center",12);x.globalAlpha=1;},
  // 1 · Flykthastighet: tre kast från jorden
  (t,k)=>{const a=A(),s=Math.min(a.w,a.h),R=Math.max(W,H)*1.1,ex=a.x+a.w/2,ey=a.y+a.h+R*.92-s*.02,top=ey-R;
    planet(ex,ey,R,"#2f7fd0","#0b2b55","rgba(80,170,255,.45)");x.strokeStyle="rgba(140,210,255,.6)";x.lineWidth=2;x.beginPath();x.arc(ex,ey,R,Math.PI*1.2,Math.PI*1.8);x.stroke();
    tag("Jorden",a.x+a.w*.12,top+26);
    const T=[{t0:.8,dx:-.2,vh:.22,lab:"10 m/s",sub:"når ca 5 meter",c:"rgba(127,214,255,1)"},{t0:6.5,dx:0,vh:.62,lab:"5 km/s",sub:"når ca 1 600 km",c:"rgba(255,216,107,1)"},{t0:13,dx:.2,vh:0,lab:"11,2 km/s",sub:"kommer aldrig tillbaka",c:"rgba(255,140,90,1)",esc:true}];
    const port=W<H*.9;let shown=0;T.forEach((p,i)=>{const tt=t-p.t0;if(tt<0)return;shown=i;const bx=ex+p.dx*a.w*(port?1.5:.9),by0=top+2,Hmax=(top-a.y-20),lr=port&&p.dx>0;
      let hh,trail=[];const dur=p.esc?5:4.6;
      for(let q=0;q<=Math.min(tt,dur);q+=dur/90){const u=q/dur;const h=p.esc?Hmax*1.4*(1-Math.pow(1-u,2.2)):Hmax*p.vh*Math.sin(Math.PI*Math.min(u,1));trail.push([bx,by0-h]);}
      x.save();x.globalCompositeOperation="lighter";x.strokeStyle=p.c.replace("1)",".55)");x.lineWidth=2;x.setLineDash([2,6]);x.beginPath();trail.forEach(([px,py],j)=>j?x.lineTo(px,py):x.moveTo(px,py));x.stroke();x.restore();x.setLineDash([]);
      const cur=trail[trail.length-1];if(tt<dur||!p.esc){if(!(tt>=dur&&!p.esc))glowDot(cur[0],cur[1],5,p.c);}
      const apex=p.esc?by0-Hmax*(port?.84:.55):by0-Hmax*p.vh;x.globalAlpha=eo((tt-1)/1);label(p.lab,bx+(lr?-14:14),apex-6,p.c,lr?"right":"left",Math.max(13,s*.03));label(p.sub,bx+(lr?-14:14),apex+12,"rgba(255,255,255,.7)",lr?"right":"left",12);x.globalAlpha=1;});
    // mätare uppe till höger
    const v=t<6.5?10:t<13?5000:11200,lt=t<6.5?t-.8:t<13?t-6.5:t-13,vv=v*eo(lt/1.4),mx=a.x+a.w-16,my=a.y+30;
    tag("Utgångsfart",mx,my,"#7fd6ff","right");x.font=serif(Math.max(24,s*.07));x.textAlign="right";x.fillStyle=t>=13?"#ff9a6a":"#ffd86b";x.fillText(vv<1000?Math.round(vv)+" m/s":(vv/1000).toLocaleString("sv-SE",{minimumFractionDigits:1,maximumFractionDigits:1})+" km/s",mx,my+Math.max(30,s*.08));
    if(t>14.5){x.globalAlpha=eo((t-14.5)/1);tag("= jordens flykthastighet",mx,my+Math.max(30,s*.08)+22,"#ff9a6a","right");x.globalAlpha=1;}},
  // 2 · Mer tyngdkraft: flykthastigheten växer när massan pressas ihop
  (t,k)=>{const a=A(),s=Math.min(a.w,a.h),port=W<H*.9,cx=port?a.x+a.w*.5:a.x+a.w*.3,cy=port?a.y+a.h*.3:a.y+a.h*.48;
    const B=[{n:"Månen",v:2.4,r:.1,c:["#d9d9d9","#555"]},{n:"Jorden",v:11.2,r:.12,c:["#5aa8ff","#0b2b55"]},{n:"Jupiter",v:59.5,r:.2,c:["#f2d2a0","#8a5a2b"]},{n:"Solen",v:618,r:.24,c:["#fff3b0","#ff8a1e"],g:"rgba(255,170,60,.5)"},{n:"En vit dvärg",v:6000,r:.05,c:["#ffffff","#9fc4ff"],g:"rgba(200,220,255,.6)"},{n:"En neutronstjärna",v:150000,r:.025,c:["#ffffff","#7fb0ff"],g:"rgba(160,200,255,.8)"},{n:"Ett svart hål",v:850000,r:.07,bh:true}];
    const per=2.45,t0=1,idx=cl(Math.floor((t-t0)/per),0,B.length-1),fk=t<t0?0:eo(((t-t0)-idx*per)/.9),b=B[idx],pb=B[Math.max(0,idx-1)];
    const rr=s*lerp(idx?pb.r:b.r,b.r,fk);
    if(b.bh){hole(cx,cy,rr,t,fk);if(fk<1)planet(cx,cy,s*lerp(pb.r,.02,fk),"#fff","#7fb0ff");}else{planet(cx,cy,rr,b.c[0],b.c[1],b.g);if(idx===2){x.save();x.globalAlpha=.25;x.strokeStyle="#7a4a20";for(let i=-3;i<=3;i++){x.lineWidth=rr*.08;x.beginPath();x.ellipse(cx,cy+i*rr*.22,rr*Math.sqrt(Math.max(0,1-(i*.22)**2)),rr*.04,0,0,TAU);x.stroke();}x.restore();}
      if(idx===5){x.save();x.globalCompositeOperation="lighter";const ang=t*4;x.strokeStyle="rgba(150,200,255,.35)";x.lineWidth=3;x.beginPath();x.moveTo(cx-Math.cos(ang)*s*.25,cy-s*.25);x.lineTo(cx+Math.cos(ang)*s*.25,cy+s*.25);x.stroke();x.restore();}}
    label(b.n,cx,cy+Math.max(rr,s*.07)+s*.06+14,"#fff","center",Math.max(14,s*.035));
    // mätare: logaritmisk skala 1 km/s – 1 000 000 km/s
    const mx=port?a.x+a.w*.12:a.x+a.w*.62,mw=port?a.w*.76:a.w*.33,my0=port?a.y+a.h*.62:a.y+a.h*.12,mh=port?a.h*.36:a.h*.78,lg=v=>cl(Math.log10(v)/6,0,1);
    if(!port){const y=v=>my0+mh-lg(v)*mh;x.strokeStyle="rgba(255,255,255,.18)";x.lineWidth=1;x.beginPath();x.moveTo(mx,my0);x.lineTo(mx,my0+mh);x.stroke();
      [1,10,100,1000,1e4,1e5,1e6].forEach(v=>{const yy=y(v);x.beginPath();x.moveTo(mx-5,yy);x.lineTo(mx+5,yy);x.stroke();label(v.toLocaleString("sv-SE")+" km/s",mx-10,yy+4,"rgba(255,255,255,.45)","right",10);});
      const yc=y(299792);x.strokeStyle="#ffd86b";x.lineWidth=1.5;x.setLineDash([6,5]);x.beginPath();x.moveTo(mx-4,yc);x.lineTo(mx+mw,yc);x.stroke();x.setLineDash([]);tag("Ljusets hastighet · 299 792 km/s",mx+mw,yc+16,"#ffd86b","right");
      B.slice(0,idx+1).forEach((q,i)=>{const yy=y(q.v)+(i===idx?(1-fk)*(y(pb.v)-y(q.v)):0),last=i===idx;x.globalAlpha=last?1:.5;x.fillStyle=q.bh?"#ff8a5a":"#7fd6ff";x.beginPath();x.arc(mx,cl(yy,my0-6,my0+mh),last?6:3.5,0,TAU);x.fill();
        label(q.n+(q.bh?": mer än ljusets hastighet":": "+(q.v>=1000?"ca ":"")+q.v.toLocaleString("sv-SE")+" km/s"),mx+16,cl(yy,my0+4,my0+mh)+4,q.bh?"#ff9a6a":"#fff","left",last?14:12);x.globalAlpha=1;});
      if(idx===B.length-1){x.globalAlpha=.5+.5*Math.sin(t*5);tag("Inget kommer ut",mx+mw,yc+34,"#ff9a6a","right");x.globalAlpha=1;}}
    else{// stående: en vågrät mätare
      const y=my0+mh*.5,xx=v=>mx+lg(v)*mw;x.strokeStyle="rgba(255,255,255,.25)";x.beginPath();x.moveTo(mx,y);x.lineTo(mx+mw,y);x.stroke();const xc=xx(299792);x.strokeStyle="#ffd86b";x.setLineDash([4,4]);x.beginPath();x.moveTo(xc,y-26);x.lineTo(xc,y+26);x.stroke();x.setLineDash([]);
      tag("Ljuset",xc,y-32,"#ffd86b","center");const xv=xx(lerp(idx?pb.v:b.v,b.v,fk));x.fillStyle=b.bh?"#ff8a5a":"#7fd6ff";x.beginPath();x.arc(Math.min(xv,mx+mw),y,7,0,TAU);x.fill();
      label(b.bh?"Mer än ljusets hastighet":(b.v>=1000?"ca ":"")+b.v.toLocaleString("sv-SE")+" km/s",mx+mw/2,y+44,b.bh?"#ff9a6a":"#fff","center",15);}},
  // 3 · Händelsehorisonten: ljusvägar som lutar inåt
  (t,k)=>{const a=A(),s=Math.min(a.w,a.h),cx=a.x+a.w/2,cy=a.y+a.h*.52,r=s*.11;hole(cx,cy,r,t,1);
    x.strokeStyle="rgba(255,216,107,.6)";x.setLineDash([5,6]);x.lineWidth=1.3;x.beginPath();x.arc(cx,cy,r*1.08,0,TAU);x.stroke();x.setLineDash([]);
    x.globalAlpha=eo((t-1)/1.5);tag("Händelsehorisonten",cx+r*1.2,cy-r*1.25,"#ffd86b");x.globalAlpha=1;
    // ljusvägar: från varje punkt de riktningar ljuset kan ta. Långt ut åt alla håll, nära hålet lutar de inåt
    const show=eo((t-4)/2);if(show>0){const rings=[[3.3,8,0],[1.75,8,.39],[1.2,8,0]];rings.forEach(([m,n,off],ri)=>{const rp=r*m,f=Math.pow(1.08/m,2),span=TAU*(1-f*.62),rays=5;
      for(let j=0;j<n;j++){const ang=j/n*TAU+off,px=cx+Math.cos(ang)*rp,py=cy+Math.sin(ang)*rp*.92,inward=ang+Math.PI;
        x.fillStyle="rgba(255,255,255,.8)";x.beginPath();x.arc(px,py,1.6,0,TAU);x.fill();
        for(let q=0;q<rays;q++){const d=inward+(q/(rays-1)-.5)*span,out=Math.cos(d-ang)>0.05,len=s*.05*show*(out?Math.max(.25,1-f*1.15):1);
          arrow(px,py,px+Math.cos(d)*len,py+Math.sin(d)*len,out?"rgba(127,214,255,.75)":"rgba(255,150,100,.8)",1.3);
          const ph=((performance.now()/1000)*.7+q*.21+j*.13+ri*.3)%1;glowDot(px+Math.cos(d)*len*ph,py+Math.sin(d)*len*ph,1.1,out?"rgba(170,230,255,.9)":"rgba(255,170,120,.9)");}}});
      x.globalAlpha=show;const lx=a.x+a.w-16;tag("Blå: ljus som kan ta sig utåt",lx,a.y+30,"#7fd6ff","right");tag("Röd: ljus som bara kan falla in",lx,a.y+48,"#ff9a6a","right");x.globalAlpha=1;}},
  // 4 · Ingen dammsugare: solen blir ett svart hål och jorden fortsätter i sin bana
  (t,k)=>{const a=A(),s=Math.min(a.w,a.h),cx=a.x+a.w/2,cy=a.y+a.h*.5,ro=s*.38,c0=6;const col=seg(t,c0,c0+1.4);
    x.strokeStyle="rgba(127,214,255,.35)";x.setLineDash([3,7]);x.lineWidth=1.2;x.beginPath();x.ellipse(cx,cy,ro,ro*.9,0,0,TAU);x.stroke();x.setLineDash([]);
    if(col<1){const rs=s*.075*(1-ease(col))+1;planet(cx,cy,rs,"#fff7c0","#ff8a1e","rgba(255,170,60,"+(.6*(1-col))+")");}
    if(col>0){hole(cx,cy,Math.max(2,s*.025*ease(col)),t,col);if(col<1){x.save();x.globalCompositeOperation="lighter";x.fillStyle=`rgba(255,240,200,${(1-col)*.8})`;x.beginPath();x.arc(cx,cy,s*.2*col,0,TAU);x.fill();x.restore();}}
    label(col<.5?"Solen":"Solen som svart hål",cx,cy+s*.13,"#fff","center",Math.max(13,s*.032));if(col>=1){x.globalAlpha=eo((t-c0-1.4)/1);tag("ca 6 km bred",cx,cy+s*.13+18,"#ffd86b","center");x.globalAlpha=1;}
    const ang=t*.45-1.2,ex=cx+Math.cos(ang)*ro,ey=cy+Math.sin(ang)*ro*.9,lit=1-.65*col;
    x.strokeStyle="rgba(90,170,255,.25)";x.lineWidth=3;x.beginPath();x.ellipse(cx,cy,ro,ro*.9,0,ang-.9,ang);x.stroke();
    planet(ex,ey,s*.022,`rgba(${Math.round(90*lit+20)},${Math.round(170*lit+20)},255,1)`,"#0b2b55",`rgba(80,170,255,${.5*lit})`);label("Jorden",ex,ey-s*.04,"#fff","center",13);
    if(t>11.5){x.globalAlpha=eo((t-11.5)/1.2);tag("Samma bana · 150 miljoner km från mitten",cx,cy+ro*.9+22,"#7fd6ff","center");x.globalAlpha=1;}},
  // 5 · Sista stabila banan
  (t,k)=>{const a=A(),s=Math.min(a.w,a.h),cx=a.x+a.w/2,cy=a.y+a.h*.52,r=s*.07;hole(cx,cy,r,t,1);
    const ring=(m,col,txt,show,dy)=>{if(show<=0)return;x.globalAlpha=show;x.strokeStyle=col;x.setLineDash([4,6]);x.lineWidth=1.3;x.beginPath();x.ellipse(cx,cy,r*m,r*m*.92,0,0,TAU);x.stroke();x.setLineDash([]);tag(txt,cx+r*m*.72,cy-r*m*.72*.92+(dy||0),col);x.globalAlpha=1;};
    ring(3,"#ffd86b","Sista stabila banan · 3 × horisontens radie",eo((t-6.5)/1.5));
    // stabila banor långt ut
    [[5.2,.5,"#7fd6ff"],[4.0,.75,"#9fe3ff"]].forEach(([m,w,c],i)=>{const an=t*w+i*2;x.strokeStyle="rgba(127,214,255,.18)";x.lineWidth=1;x.beginPath();x.ellipse(cx,cy,r*m,r*m*.92,0,0,TAU);x.stroke();glowDot(cx+Math.cos(an)*r*m,cy+Math.sin(an)*r*m*.92,3,"rgba(127,214,255,1)");});
    // innanför: spiralar in
    if(t>12){const T0=12,per=4.2,u=((t-T0)%per)/per,m=lerp(2.75,1,Math.pow(u,1.7)),an=(t-T0)*1.2+u*u*9;const tr=[];for(let q=0;q<40;q++){const uu=Math.max(0,u-q*.01),mm=lerp(2.75,1,Math.pow(uu,1.7)),aa=(t-T0-q*.01*per)*1.2+uu*uu*9;tr.push([cx+Math.cos(aa)*r*mm,cy+Math.sin(aa)*r*mm*.92]);}
      x.save();x.globalCompositeOperation="lighter";x.strokeStyle="rgba(255,150,100,.5)";x.lineWidth=2;x.beginPath();tr.forEach(([px,py],j)=>j?x.lineTo(px,py):x.moveTo(px,py));x.stroke();x.restore();
      if(u<.96)glowDot(cx+Math.cos(an)*r*m,cy+Math.sin(an)*r*m*.92,3,"rgba(255,150,100,1)");}
    x.globalAlpha=eo((t-1)/1.5);tag("Stabil bana",cx-r*5.2*.7,cy+r*5.2*.92*.75+16,"#7fd6ff","center");x.globalAlpha=1;},
  // 6 · Tidvattenkrafter
  (t,k)=>{const a=A(),s=Math.min(a.w,a.h),port=W<H*.9,cx=port?a.x+a.w/2:a.x+a.w*.62;
    if(t<12){// på jorden: pilarna vid huvud och fötter är nästan lika långa
      const R=Math.max(W,H)*1.2,ey=a.y+a.h+R*.95,top=ey-R;planet(cx,ey,R,"#2f7fd0","#0b2b55","rgba(80,170,255,.4)");
      const h=a.h*.5,ft=top-h-2;astro(cx,ft,h,1,0,1,1,1);
      const al=eo((t-1)/1.2);x.globalAlpha=al;arrow(cx+h*.42,ft+h*.08,cx+h*.42,ft+h*.08+s*.12,"#ffd86b",2.5);arrow(cx+h*.42,ft+h*.86,cx+h*.42,ft+h*.86+s*.12*1.0000005,"#ff9a6a",2.5);
      label("Huvudet dras",cx+h*.42+12,ft+h*.08+s*.07,"#ffd86b","left",13);label("Fötterna dras lite hårdare",cx+h*.42+12,ft+h*.86+s*.07,"#ff9a6a","left",13);
      if(t>7.5){x.globalAlpha=eo((t-7.5)/1);tag("Skillnad: mindre än en miljondel",cx,a.y+30,"#7fd6ff","center");}x.globalAlpha=1;return;}
    // nära ett svart hål: hålet nedanför, astronauten faller med fötterna först
    const u=t-12,r=s*(port?.16:.13),hx=cx,hy=port?a.y+a.h+r*.9:a.y+a.h*.96;hole(hx,hy,r,t,eo(u/1.5));
    const stretch=1+eo(seg(u,1.5,7))*1.2,split=u<7.5?0:Math.min(4,Math.floor((u-7.5)/1.6)+1),n=[1,2,4,8,16][split],gap=split?s*.012*(1+split*.4):0;
    const h=a.h*(port?.32:.3),ft=a.y+a.h*(port?.16:.04)+eo(seg(u,0,16))*a.h*.1;astro(cx,ft,h,n,gap,1-(stretch-1)*.15,stretch,1);
    const fy=ft+h*stretch+(n-1)*gap;const al=eo(seg(u,.8,2));x.globalAlpha=al;const L0=s*.05,L1=s*.05+eo(seg(u,1,6))*s*.18;
    arrow(cx+h*.32,ft+4,cx+h*.32,ft+4+L0,"#ffd86b",2.5);arrow(cx+h*.32,fy-4,cx+h*.32,fy-4+L1,"#ff9a6a",3);label("Huvudet",cx+h*.32+12,ft+L0*.6,"#ffd86b","left",13);label("Fötterna",cx+h*.32+12,fy+L1*.5,"#ff9a6a","left",13);x.globalAlpha=1;
    if(split>0){const seq=["1","2","4","8","16"];x.font=serif(Math.max(port?18:22,s*.06));x.textAlign="left";let xx=a.x+16,yy=port?a.y+a.h*.08:a.y+a.h*.2;seq.forEach((q,i)=>{x.fillStyle=i<=split?"#ffd86b":"rgba(255,255,255,.25)";x.fillText(q,xx,yy);xx+=x.measureText(q).width+10;if(i<4){x.fillStyle="rgba(255,255,255,.3)";x.fillText("→",xx,yy);xx+=x.measureText("→").width+10;}});}
    else{x.globalAlpha=eo(seg(u,2,3));tag("Tidvattenkraft",a.x+16,a.y+a.h*.2,"#ff9a6a");x.globalAlpha=1;}},
  // 7 · Spagettifiering: en tratt i rumtiden och en tråd som pressas ner
  (t,k)=>{const a=A(),s=Math.min(a.w,a.h),port=W<H*.9,cx=port?a.x+a.w/2:a.x+a.w*.6,ty=a.y+a.h*.1,depth=a.h*(port?.78:.74),wTop=a.w*(port?.46:.36);
    // tratten: ringar och linjer i perspektiv
    const prof=q=>wTop*(.06+.94*Math.pow(1-q,2.4));x.lineWidth=1;
    for(let i=0;i<=16;i++){const q=i/16,y=ty+depth*Math.pow(q,.8),w=prof(q);x.strokeStyle=`rgba(127,214,255,${.12+.3*(1-q)})`;x.beginPath();x.ellipse(cx,y,w,w*.18,0,0,TAU);x.stroke();}
    for(let j=0;j<24;j++){const an=j/24*TAU;x.strokeStyle="rgba(127,214,255,.13)";x.beginPath();for(let i=0;i<=30;i++){const q=i/30,y=ty+depth*Math.pow(q,.8),w=prof(q),px=cx+Math.cos(an)*w,py=y+Math.sin(an)*w*.18;i?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();}
    // tråden
    const prog=eo(seg(t,1,21)),q1=lerp(.02,.92,prog),q0=Math.max(0,q1-lerp(.08,.6,prog));x.save();x.globalCompositeOperation="lighter";
    for(let layer=0;layer<3;layer++){x.strokeStyle=["rgba(127,214,255,.18)","rgba(160,230,255,.5)","rgba(255,255,255,.95)"][layer];x.beginPath();const steps=50;
      for(let i=0;i<=steps;i++){const q=lerp(q0,q1,i/steps),y=ty+depth*Math.pow(q,.8),px=cx+Math.sin(q*9+t*.5)*prof(q)*.25;i?x.lineTo(px,y):x.moveTo(px,y);}
      x.lineWidth=[14,6,2][layer]*lerp(1.4,.35,prog);x.stroke();}x.restore();
    glowDot(cx+Math.sin(q1*9+t*.5)*prof(q1)*.25,ty+depth*Math.pow(q1,.8),3,"rgba(255,220,180,1)");
    x.globalAlpha=eo(seg(t,2,3.5));port?tag("Rumtiden blir smalare och smalare",cx,ty-14,"#7fd6ff","center"):tag("Rumtiden blir smalare och smalare",cx+wTop*.55,ty+depth*.3,"#7fd6ff","left");x.globalAlpha=eo(seg(t,22,23.5));
    const by=ty+depth;x.save();x.globalCompositeOperation="lighter";const gg=x.createRadialGradient(cx,by,0,cx,by,s*.12);gg.addColorStop(0,"rgba(255,200,140,.55)");gg.addColorStop(1,"rgba(255,120,60,0)");x.fillStyle=gg;x.beginPath();x.arc(cx,by,s*.12,0,TAU);x.fill();x.restore();
    label("?",cx+wTop*.12+18,by+8,"#ffd86b","left",Math.max(26,s*.07));tag("Singulariteten",cx+wTop*.12+18+Math.max(26,s*.07)*.7,by+2,"#ffd86b","left");x.globalAlpha=1;}
  ];
  // hjälpmedel som en ny film (o.def) kan rita med
  const E={get x(){return x;},get W(){return W;},get H(){return H;},get dpr(){return dpr;},A,hole,planet,arrow,glowDot,label,tag,serif,font,eo,cl,lerp,ease,seg,TAU,get si(){return si;},bg};
  const SCN=D?D.scenes(E):SCN0;
  function cleanup(){if(!alive)return;alive=false;cancelAnimationFrame(raf);voiceStop();const L=snd();if(L)matStop(L);document.removeEventListener("keydown",key);document.removeEventListener("visibilitychange",vis);if(ro)ro.disconnect();root.remove();}
  root.__slut=()=>{if(!started)start();finish();};
  // för tester: hoppa till en scen och en tid
  root.__seek=(i,tt)=>{if(!started)start();goto(i,false);setPlay(false);voiceStop();st=tt;const c=SC[si].cap;let n=0;c.forEach((q,j)=>{if(tt>=q[0])n=j;});showCap(n);draw();};
  draw();return cleanup;
}};
})();
