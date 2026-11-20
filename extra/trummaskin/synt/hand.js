/* Styr med handen (PPSyntHand), 20 nov 2026.
   Kameran följer en hand framför datorn och styr effektplattan: handflatans läge = pricken,
   nyp med tumme och pekfinger = effekten på (som att hålla fingret på plattan), släpp nypet = tillbaka.
   Kameran syns svagt spegelvänd i plattan, så att pricken hamnar där handen är.
   Modellen (MediaPipe Hand Landmarker) ligger i /lib/mediapipe och hämtas först när man trycker på knappen.
   Allt körs i webbläsaren. Ingen bild sparas eller skickas. En platta åt gången (en kamera).
   PPSyntHand.koppla(sektion, vilk, host) lägger till knappen "🖐 HAND" bland plattans knappar. */
(function(){
  const LIB='/lib/mediapipe';
  const NYP_PA=.33,NYP_AV=.48,MJUK=.45,TAPP_MS=350;
  let lm=null,laddar=null,strom=null,video=null,aktiv=null,raf=0,senast=-1,senHand=0;

  const css=`.sy-handknapp[aria-pressed="true"]{border-color:var(--sy)!important;background:color-mix(in srgb,var(--sy) 35%,#2a2d33)!important;color:#fff!important}
.sy-handknapp[data-laddar]{opacity:.7;cursor:progress}
.sy-handbild{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.32;object-fit:cover;transform:scaleX(-1);filter:grayscale(.4) contrast(1.1)}
.sy-handrit{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.sy-platta-yta.hand .sy-platta-prick{transition:opacity .12s}
.sy-platta-yta.hand.sikte .sy-platta-prick{background:transparent;box-shadow:0 0 0 3px var(--sy);opacity:.85}
.sy-handtips{position:absolute;right:8px;top:8px;font:800 9px/1 ui-monospace,monospace;letter-spacing:.08em;color:#fff;background:rgba(0,0,0,.45);padding:5px 7px;border-radius:6px;pointer-events:none}
.sy-miniplatta .sy-handtips{display:none}`;

  function ladda(){
    if(lm)return Promise.resolve(lm);
    if(laddar)return laddar;
    laddar=(async()=>{
      if(!window.Vision)await new Promise((ok,fel)=>{const sc=document.createElement('script');sc.src=LIB+'/vision_bundle.js';sc.onload=ok;sc.onerror=()=>fel(new Error('lib'));document.head.appendChild(sc)});
      const v=window.Vision;
      const fil=await v.FilesetResolver.forVisionTasks(LIB+'/wasm');
      const opt=d=>({baseOptions:{modelAssetPath:LIB+'/hand_landmarker.task',delegate:d},runningMode:'VIDEO',numHands:1,
        minHandDetectionConfidence:.6,minHandPresenceConfidence:.5,minTrackingConfidence:.5});
      try{lm=await v.HandLandmarker.createFromOptions(fil,opt('GPU'))}
      catch(e){lm=await v.HandLandmarker.createFromOptions(fil,opt('CPU'))}
      return lm;
    })();
    laddar.catch(()=>{laddar=null});
    return laddar;
  }

  async function kamera(){
    if(strom)return strom;
    strom=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:640},height:{ideal:480}},audio:false});
    return strom;
  }

  /* var i den spegelvända, beskurna bilden (object-fit:cover) hamnar en punkt från kameran */
  function tillPlatta(p,yta){
    const r=yta.getBoundingClientRect(),vw=video.videoWidth||640,vh=video.videoHeight||480;
    const s=Math.max(r.width/vw,r.height/vh),bw=vw*s,bh=vh*s,ox=(bw-r.width)/2,oy=(bh-r.height)/2;
    const px=(1-p.x)*bw-ox,py=p.y*bh-oy;
    return{x:px/r.width,y:py/r.height,px,py};
  }
  const avst=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);

  function rita(A,pts){
    const c=A.rit,r=A.yta.getBoundingClientRect(),d=devicePixelRatio||1;
    if(c.width!==Math.round(r.width*d)||c.height!==Math.round(r.height*d)){c.width=Math.round(r.width*d);c.height=Math.round(r.height*d)}
    const g=c.getContext('2d');g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,r.width,r.height);if(!pts)return;
    const col=getComputedStyle(A.yta).getPropertyValue('--sy').trim()||'#ff985d';
    const B=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]];
    g.lineWidth=2;g.strokeStyle='rgba(255,255,255,.55)';g.beginPath();B.forEach(([a,b])=>{g.moveTo(pts[a].px,pts[a].py);g.lineTo(pts[b].px,pts[b].py)});g.stroke();
    g.fillStyle=col;[4,8].forEach(i=>{g.beginPath();g.arc(pts[i].px,pts[i].py,4.5,0,7);g.fill()});
  }

  function slapp(A){if(A.haller){A.haller=false;A.yta.classList.remove('aktiv');A.host.platta?.xy(1,0,true,A.vilk);A.host.platta?.hall(false,A.vilk)}}

  function loop(){
    raf=requestAnimationFrame(loop);const A=aktiv;if(!A||!lm||!video||video.readyState<2)return;
    if(video.currentTime===senast)return;senast=video.currentTime;
    let res;try{res=lm.detectForVideo(video,performance.now())}catch(e){return}
    const h=res&&res.landmarks&&res.landmarks[0],nu=performance.now();
    if(!h){if(nu-senHand>TAPP_MS){slapp(A);A.prick.hidden=true;A.yta.classList.remove('sikte');A.pos=null;rita(A,null)}return}
    senHand=nu;
    const pts=h.map(p=>tillPlatta(p,A.yta)),mitt=[0,5,9,13,17].reduce((s,i)=>({x:s.x+pts[i].x/5,y:s.y+pts[i].y/5}),{x:0,y:0});
    const kl=v=>Math.max(0,Math.min(1,v));
    const m={x:kl(mitt.x),y:kl(mitt.y)};
    A.pos=A.pos?{x:A.pos.x+(m.x-A.pos.x)*MJUK,y:A.pos.y+(m.y-A.pos.y)*MJUK}:m;
    /* nyp mäts mot handens storlek, så att det fungerar nära och långt från kameran */
    const storlek=avst(h[0],h[9])||1e-3,nyp=avst(h[4],h[8])/storlek;
    const x=A.pos.x,y=1-A.pos.y;
    A.prick.hidden=false;A.prick.style.left=x*100+'%';A.prick.style.top=(1-y)*100+'%';
    if(!A.haller&&nyp<NYP_PA){A.haller=true;A.yta.classList.add('aktiv');A.host.platta?.hall(true,A.vilk)}
    else if(A.haller&&nyp>NYP_AV)slapp(A);
    A.yta.classList.toggle('sikte',!A.haller);
    if(A.haller)A.host.platta?.xy(x,y,false,A.vilk);
    rita(A,pts);
  }

  function stang(meddela){
    const A=aktiv;aktiv=null;cancelAnimationFrame(raf);raf=0;
    if(A){slapp(A);A.knapp.setAttribute('aria-pressed','false');A.yta.classList.remove('hand','sikte');A.prick.hidden=true;
      A.bild.remove();A.rit.remove();A.tips.remove();}
    if(strom){strom.getTracks().forEach(t=>t.stop());strom=null}
    if(video){video.srcObject=null}
    if(meddela&&A)A.host.toast?.('Kameran är avstängd');
  }

  async function starta(A){
    stang(false);
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){A.host.toast?.('Den här webbläsaren kan inte använda kameran');return}
    A.knapp.dataset.laddar='';const txt=A.knapp.textContent;A.knapp.textContent=A.mini?'…':'LADDAR …';
    try{
      const [s]=await Promise.all([kamera(),ladda()]);
      if(!video){video=document.createElement('video');video.muted=true;video.playsInline=true;video.setAttribute('playsinline','')}
      video.srcObject=s;await video.play();
      A.bild=video;A.bild.className='sy-handbild';
      A.rit=document.createElement('canvas');A.rit.className='sy-handrit';
      A.tips=document.createElement('span');A.tips.className='sy-handtips';A.tips.textContent='🤏 NYP = EFFEKT';
      A.yta.prepend(A.bild);A.prick.before(A.rit);A.yta.append(A.tips);A.yta.classList.add('hand');
      aktiv=A;A.pos=null;A.haller=false;senHand=0;senast=-1;A.knapp.setAttribute('aria-pressed','true');
      A.host.startAudio?.();
      if(!raf)raf=requestAnimationFrame(loop);
    }catch(e){
      stang(false);
      const n=e&&e.name;
      A.host.toast?.(n==='NotAllowedError'||n==='SecurityError'?'Kameran är inte tillåten. Du kan ge lov i webbläsarens inställningar, eller dra med fingret som vanligt.':
        n==='NotFoundError'||n==='OverconstrainedError'?'Ingen kamera hittades. Dra med fingret som vanligt.':
        n==='NotReadableError'?'Kameran används av något annat just nu.':'Handstyrningen kunde inte starta. Dra med fingret som vanligt.');
    }finally{delete A.knapp.dataset.laddar;A.knapp.textContent=txt}
  }

  function koppla(sek,vilk,host){
    if(!document.getElementById('sy-hand-css')){const st=document.createElement('style');st.id='sy-hand-css';st.textContent=css;document.head.appendChild(st)}
    const rad=sek.querySelector('.sy-platta-knappar'),yta=sek.querySelector('.sy-platta-yta');if(!rad||!yta)return;
    const mini=sek.classList.contains('sy-miniplatta');
    const b=document.createElement('button');b.type='button';b.className='sy-handknapp';b.setAttribute('aria-pressed','false');
    b.textContent=mini?'🖐':'🖐 HAND';
    b.title='Styr plattan med handen framför kameran. Nyp med tumme och pekfinger för att sätta på effekten. Kameran används bara här, inget spelas in eller skickas.';
    b.setAttribute('aria-label','Styr effektplattan med handen via kameran');
    const A={sek,vilk,host,yta,knapp:b,mini,prick:yta.querySelector('.sy-platta-prick')};
    b.onclick=()=>{if(b.dataset.laddar!==undefined)return;if(aktiv===A)stang(true);else starta(A)};
    rad.append(b);
  }

  /* kameran stängs när fliken döljs eller när plattan inte längre syns */
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&aktiv)stang(false)});
  setInterval(()=>{if(aktiv&&!aktiv.yta.offsetParent)stang(false)},1000);

  window.PPSyntHand={koppla,stang,_test:{tillPlatta,get aktiv(){return aktiv}}};
})();
