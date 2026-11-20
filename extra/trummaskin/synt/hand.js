/* Styr med handen (PPSyntHand), 20 nov 2026.
   Kameran följer en hand framför datorn. Två lägen:
   - PLATTA (🖐 HAND bredvid STAMMA): handflatan = pricken på effektplattan.
       🤏 nyp (tumme mot pekfinger) = effekten på, ↻ vrid handen = WAH (filtrets resonans),
       ✊ knytnäve = STAMMA 1/8, ✌️ två fingrar = STAMMA 1/16, öppen hand = bara sikte.
   - THEREMIN (🎶 THEREMIN i INSTRUMENT): handens höjd = ton i tonartens skala, nyp = spela,
       åt sidan = mörk/ljus, vrid = wah, ✊/✌️ = stamma. Spelar med valt spårs ljud och spelas in med REC.
   Kameran syns svagt spegelvänd i plattan, så att pricken hamnar där handen är.
   Modellen (MediaPipe Hand Landmarker) ligger i /lib/mediapipe och hämtas först när man trycker på en knapp.
   Allt körs i webbläsaren. Ingen bild sparas eller skickas. En platta åt gången (en kamera).
   PPSyntHand.koppla(sektion, vilk, host, spel) lägger till knapparna; spel = {spela(n), slapp(), namn(n)} för instrumentplattan. */
(function(){
  const LIB='/lib/mediapipe';
  const NYP_PA=.33,NYP_AV=.48,MJUK=.45,TAPP_MS=350,BILDER_IN=2;
  let lm=null,laddar=null,strom=null,video=null,aktiv=null,raf=0,senast=-1,senHand=0,delegat='',felN=0,tvingaCPU=false;
  /* På telefoner och surfplattor körs modellen på processorn: GPU-läget kan starta utan fel men sedan inte hitta
     några händer (sett på Samsung S25 Ultra, nov 2026). Datorn kör GPU med CPU som reserv. */
  const MOBIL=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&/Macintosh/.test(navigator.userAgent);

  const css=`.sy-handknapp[aria-pressed="true"],.sy-thereminknapp[aria-pressed="true"]{border-color:var(--sy)!important;background:color-mix(in srgb,var(--sy) 35%,#2a2d33)!important;color:#fff!important}
.sy-handknapp[data-laddar],.sy-thereminknapp[data-laddar]{opacity:.7;cursor:progress}
.sy-thereminknapp{align-self:flex-end;min-height:34px;padding:0 12px;border:1px solid #3d4047;border-radius:8px;background:#2a2d33;color:#e3e5ea;font:800 10px/1 ui-monospace,monospace;letter-spacing:.06em;white-space:nowrap;cursor:pointer;flex:none}
@media(min-width:621px){.sy-play-settings:has(.sy-thereminknapp){flex-wrap:wrap}.sy-thereminknapp{flex:1 0 100%;align-self:stretch}}
.sy-handbild{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.32;object-fit:cover;transform:scaleX(-1);filter:grayscale(.4) contrast(1.1)}
.sy-handrit{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.sy-platta-yta.hand .sy-platta-prick{transition:opacity .12s}
.sy-platta-yta.hand.sikte .sy-platta-prick{background:transparent;box-shadow:0 0 0 3px var(--sy);opacity:.85}
.sy-handtips{position:absolute;right:8px;top:8px;font:800 9px/1 ui-monospace,monospace;letter-spacing:.08em;color:#fff;background:rgba(0,0,0,.5);padding:5px 7px;border-radius:6px;pointer-events:none;white-space:nowrap}
.sy-miniplatta .sy-handtips{display:none}
.sy-play .sy-miniplatta .sy-platta-yta.theremin{height:clamp(170px,30vh,260px)}
.sy-platta-yta.theremin .sy-platta-x,.sy-platta-yta.theremin .sy-platta-y{display:none}
.sy-miniplatta .sy-platta-yta.theremin .sy-handtips{display:block;font-size:11px}
.sy-handton{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font:800 clamp(34px,7vw,64px)/1 "Inter",Arial,sans-serif;color:#fff;opacity:0;text-shadow:0 0 24px var(--sy);pointer-events:none;transition:opacity .15s}
.sy-handton.pa{opacity:.9}
.sy-platta-knappar button.hand-on{border-color:var(--sy);background:color-mix(in srgb,var(--sy) 35%,#2a2d33);color:#fff}`;

  function ladda(){
    if(lm)return Promise.resolve(lm);
    if(laddar)return laddar;
    laddar=(async()=>{
      if(!window.Vision)await new Promise((ok,fel)=>{const sc=document.createElement('script');sc.src=LIB+'/vision_bundle.js';sc.onload=ok;sc.onerror=()=>fel(new Error('lib'));document.head.appendChild(sc)});
      const v=window.Vision;
      const fil=await v.FilesetResolver.forVisionTasks(LIB+'/wasm');
      const opt=d=>({baseOptions:{modelAssetPath:LIB+'/hand_landmarker.task',delegate:d},runningMode:'VIDEO',numHands:1,
        minHandDetectionConfidence:.6,minHandPresenceConfidence:.5,minTrackingConfidence:.5});
      const ordning=MOBIL||tvingaCPU?['CPU']:['GPU','CPU'];let fel;
      for(const d of ordning){try{lm=await v.HandLandmarker.createFromOptions(fil,opt(d));delegat=d;felN=0;return lm}catch(e){fel=e}}
      throw fel;
    })();
    laddar.catch(()=>{laddar=null});
    return laddar;
  }

  async function kamera(){
    if(strom)return strom;
    strom=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:640},height:{ideal:480}},audio:false});
    return strom;
  }

  /* Vilken del av kamerabilden som fyller plattan. Liggande kamera (dator): samma form som plattan (som object-fit:cover).
     Stående kamera (telefon) mot en bred platta: med cover räknades bara en smal rand i mitten, så handen gick knappt
     att styra uppåt och nedåt. Där tas en högre bit (formen mitt emellan kamerans och plattans) och dras ut lite. */
  function utsnitt(r){
    const vw=video.videoWidth||640,vh=video.videoHeight||480,ap=r.width/(r.height||1),ac=vw/vh;
    const ar=vh>vw&&ap>ac?Math.sqrt(ap*ac):ap;
    const rw=ar>ac?vw:vh*ar,rh=ar>ac?vw/ar:vh;
    return{vw,vh,rw,rh,rx:(vw-rw)/2,ry:(vh-rh)/2};
  }
  /* kamerabilden läggs så att utsnittet täcker plattan precis (spegelvänd) */
  function placeraBild(A){
    const r=A.yta.getBoundingClientRect(),u=utsnitt(r),sx=r.width/u.rw,sy=r.height/u.rh;
    const k=[r.width,r.height,u.vw,u.vh].join();if(A.bildK===k)return;A.bildK=k;
    Object.assign(A.bild.style,{inset:'auto',left:-u.rx*sx+'px',top:-u.ry*sy+'px',width:u.vw*sx+'px',height:u.vh*sy+'px',objectFit:'fill'});
  }
  /* var i plattan en punkt från kameran hamnar */
  function tillPlatta(p,yta){
    const r=yta.getBoundingClientRect(),u=utsnitt(r);
    const px=((1-p.x)*u.vw-u.rx)/u.rw*r.width,py=(p.y*u.vh-u.ry)/u.rh*r.height;
    return{x:px/r.width,y:py/r.height,px,py};
  }
  /* GPU-läget felar under spelet: byt till processorn i stället för att tiga */
  function tillCPU(){
    const g=lm;lm=null;laddar=null;tvingaCPU=true;felN=0;try{g&&g.close()}catch(e){}
    ladda().catch(()=>{const A=aktiv;if(A){A.host.toast?.('Handstyrningen fungerar inte på den här enheten. Dra med fingret som vanligt.');stang(false)}});
  }
  const avst=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);

  /* ---------- gester ---------- */
  const FINGRAR=[[6,8],[10,12],[14,16],[18,20]]; // [mellanled, topp] för pekfinger, långfinger, ringfinger, lillfinger
  function gest(h,var_nyp){
    const d0=i=>avst(h[0],h[i]);
    const ute=FINGRAR.map(([m,t])=>d0(t)>d0(m)*1.15),inne=FINGRAR.map(([m,t])=>d0(t)<d0(m));
    if(inne.every(Boolean))return'knytnave';
    if(ute[0]&&ute[1]&&inne[2]&&inne[3])return'tva'; /* två fingrar uppe, isär eller ihop */
    const nyp=avst(h[4],h[8])/(avst(h[0],h[9])||1e-3);
    if(nyp<(var_nyp?NYP_AV:NYP_PA))return'nyp';
    return'oppen';
  }
  /* vridning: handens lutning (handled → långfingrets bas), 0 = rak. Höger = mer wah, vänster = mjukare */
  function wahQ(pts){
    const a=Math.atan2(pts[9].px-pts[0].px,pts[0].py-pts[9].py),d=.12,m=.85;
    if(a>d)return 4+Math.min(1,(a-d)/(m-d))*6;
    if(a<-d)return 4-Math.min(1,(-a-d)/(m-d))*3.3;
    return 4;
  }

  /* ---------- theremin: tonerna i tonartens skala, två oktaver ---------- */
  function thereminToner(A){
    const sk=(A.host.skala&&A.host.skala())||[0,2,4,7,9],ton=(A.host.tonart&&A.host.tonart())||0,ut=[];
    for(let o=0;o<2;o++)sk.forEach(i=>{if(i<12)ut.push(60+ton+o*12+i)});
    ut.push(84+ton);return ut;
  }

  function rita(A,pts){
    const c=A.rit,r=A.yta.getBoundingClientRect(),d=devicePixelRatio||1;
    if(c.width!==Math.round(r.width*d)||c.height!==Math.round(r.height*d)){c.width=Math.round(r.width*d);c.height=Math.round(r.height*d)}
    const g=c.getContext('2d');g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,r.width,r.height);
    const col=getComputedStyle(A.yta).getPropertyValue('--sy').trim()||'#ff985d';
    if(A.lage==='theremin'&&A.toner){const N=A.toner.length,hh=r.height/N;g.font='800 10px ui-monospace,monospace';g.textBaseline='middle';
      for(let i=0;i<N;i++){const y=r.height-(i+1)*hh,pa=i===A.idx;
        g.fillStyle=pa?(A.spelar?col:'rgba(255,255,255,.14)'):i%2?'rgba(255,255,255,.03)':'rgba(255,255,255,.06)';if(pa&&A.spelar)g.globalAlpha=.35;g.fillRect(0,y,r.width,hh);g.globalAlpha=1;
        g.fillStyle=pa?'#fff':'rgba(255,255,255,.45)';g.fillText(A.spel.namn(A.toner[i]),8,y+hh/2)}}
    if(!pts)return;
    const B=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]];
    g.lineWidth=2;g.strokeStyle='rgba(255,255,255,.55)';g.beginPath();B.forEach(([a,b])=>{g.moveTo(pts[a].px,pts[a].py);g.lineTo(pts[b].px,pts[b].py)});g.stroke();
    g.fillStyle=col;[4,8].forEach(i=>{g.beginPath();g.arc(pts[i].px,pts[i].py,4.5,0,7);g.fill()});
  }

  const TIPS={platta:{oppen:'🤏 NYP = EFFEKT',nyp:'↻ VRID = WAH',knytnave:'✊ STAMMA 1/8',tva:'✌️ STAMMA 1/16'},
              theremin:{oppen:'🤏 NYP = SPELA',nyp:'↕ TON · ↻ WAH',knytnave:'✊ STAMMA 1/8',tva:'✌️ STAMMA 1/16'}};
  function stammaKnapp(A,m){A.sek.querySelectorAll('[data-stamma]').forEach(b=>b.classList.toggle('hand-on',+b.dataset.stamma===m))}

  /* lämna en gest: släpp det den höll i */
  function lamna(A,g){
    const P=A.host.platta;
    if(g==='nyp'){if(A.lage==='theremin'&&A.spelar){A.spel.slapp();A.spelar=false;A.ton.classList.remove('pa')}
      A.yta.classList.remove('aktiv');P?.xy(1,0,true,A.vilk);P?.hall(false,A.vilk)}
    if(g==='knytnave'||g==='tva'){stammaKnapp(A,0);P?.stamma(0,A.vilk);P?.hall(false,A.vilk)}
  }
  function ga_in(A,g){
    const P=A.host.platta;
    if(g==='nyp'){A.yta.classList.add('aktiv');P?.hall(true,A.vilk)}
    if(g==='knytnave'||g==='tva'){const m=g==='knytnave'?1:2;stammaKnapp(A,m);P?.hall(true,A.vilk);P?.stamma(m,A.vilk)}
  }
  function bytGest(A,g){if(g===A.g)return;lamna(A,A.g);A.g=g;ga_in(A,g);A.tips.textContent=TIPS[A.lage][g]||'';A.yta.classList.toggle('sikte',g==='oppen')}

  function loop(){
    raf=requestAnimationFrame(loop);const A=aktiv;if(!A||!lm||!video||video.readyState<2)return;
    if(video.currentTime===senast)return;senast=video.currentTime;
    placeraBild(A);
    let res;try{res=lm.detectForVideo(video,performance.now());felN=0}
    catch(e){if(++felN>=5){if(delegat==='GPU')tillCPU();else{A.host.toast?.('Handstyrningen fungerar inte på den här enheten. Dra med fingret som vanligt.');stang(false)}}return}
    const h=res&&res.landmarks&&res.landmarks[0],nu=performance.now();
    if(!h){if(nu-senHand>TAPP_MS&&(A.g!=='ingen'||!A.prick.hidden)){bytGest(A,'ingen');A.yta.classList.remove('sikte');A.tips.textContent=TIPS[A.lage].oppen;A.prick.hidden=true;A.pos=null;A.idx=-1;rita(A,null)}return}
    senHand=nu;
    const pts=h.map(p=>tillPlatta(p,A.yta)),mitt=[0,5,9,13,17].reduce((s,i)=>({x:s.x+pts[i].x/5,y:s.y+pts[i].y/5}),{x:0,y:0});
    const kl=v=>Math.max(0,Math.min(1,v));
    const m={x:kl(mitt.x),y:kl(mitt.y)};
    A.pos=A.pos?{x:A.pos.x+(m.x-A.pos.x)*MJUK,y:A.pos.y+(m.y-A.pos.y)*MJUK}:m;
    const q0=wahQ(pts);A.q=A.q?A.q+(q0-A.q)*.35:q0;
    const x=A.pos.x,y=1-A.pos.y;
    /* gesten måste synas två bilder i rad innan den gäller (inget fladder) */
    const r=gest(h,A.g==='nyp');
    if(r===A.kand)A.kandN++;else{A.kand=r;A.kandN=1}
    if(A.kandN>=BILDER_IN||r==='oppen'&&A.g==='nyp')bytGest(A,r);
    A.prick.hidden=false;A.prick.style.left=x*100+'%';A.prick.style.top=(1-y)*100+'%';
    if(A.lage==='theremin'){
      const N=A.toner.length;let i=A.idx;
      if(i<0||y<(i-.25)/N||y>(i+1.25)/N)i=Math.max(0,Math.min(N-1,Math.floor(y*N)));
      const ny=i!==A.idx;A.idx=i;
      if(A.g==='nyp'){if(!A.spelar||ny){A.spel.spela(A.toner[i]);A.spelar=true;A.ton.textContent=A.spel.namn(A.toner[i]);A.ton.classList.add('pa')}
        A.host.platta?.xy(x,.3,false,A.vilk,A.q)}
    }else if(A.g==='nyp')A.host.platta?.xy(x,y,false,A.vilk,A.q);
    if(A.g==='nyp'){const n=Math.round((A.q-.7)/9.3*5);A.tips.textContent=A.lage==='theremin'?TIPS.theremin.nyp:'↻ WAH '+'▮'.repeat(n)+'▯'.repeat(5-n)}
    rita(A,pts);
  }

  function stang(meddela){
    const A=aktiv;aktiv=null;cancelAnimationFrame(raf);raf=0;
    if(A){bytGest(A,'ingen');const kn=A.lage==='theremin'?A.tknapp:A.knapp;kn.setAttribute('aria-pressed','false');
      A.yta.classList.remove('hand','sikte','theremin');A.prick.hidden=true;A.bildK='';A.bild.removeAttribute('style');
      A.bild.remove();A.rit.remove();A.tips.remove();A.ton.remove();}
    if(strom){strom.getTracks().forEach(t=>t.stop());strom=null}
    if(video){video.srcObject=null}
    if(meddela&&A)A.host.toast?.('Kameran är avstängd');
  }

  async function starta(A,lage){
    stang(false);
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){A.host.toast?.('Den här webbläsaren kan inte använda kameran');return}
    const kn=lage==='theremin'?A.tknapp:A.knapp;
    kn.dataset.laddar='';const txt=kn.textContent;kn.textContent=A.mini&&lage!=='theremin'?'…':'LADDAR …';
    try{
      const [s]=await Promise.all([kamera(),ladda()]);
      if(!video){video=document.createElement('video');video.muted=true;video.playsInline=true;video.setAttribute('playsinline','')}
      video.srcObject=s;await video.play();
      A.lage=lage;A.bild=video;A.bild.className='sy-handbild';
      A.rit=document.createElement('canvas');A.rit.className='sy-handrit';
      A.tips=document.createElement('span');A.tips.className='sy-handtips';A.tips.textContent=TIPS[lage].oppen;
      A.ton=document.createElement('span');A.ton.className='sy-handton';
      A.yta.prepend(A.bild);A.prick.before(A.rit);A.yta.append(A.tips,A.ton);A.yta.classList.add('hand');
      A.yta.classList.toggle('theremin',lage==='theremin');
      if(lage==='theremin')A.toner=thereminToner(A);
      aktiv=A;A.pos=null;A.q=0;A.g='ingen';A.kand='';A.kandN=0;A.idx=-1;A.spelar=false;senHand=0;senast=-1;kn.setAttribute('aria-pressed','true');
      A.host.startAudio?.();
      if(!raf)raf=requestAnimationFrame(loop);
      if(lage==='theremin')A.yta.scrollIntoView({block:'nearest',behavior:'smooth'});
    }catch(e){
      stang(false);
      const n=e&&e.name;
      A.host.toast?.(n==='NotAllowedError'||n==='SecurityError'?'Kameran är inte tillåten. Du kan ge lov i webbläsarens inställningar, eller dra med fingret som vanligt.':
        n==='NotFoundError'||n==='OverconstrainedError'?'Ingen kamera hittades. Dra med fingret som vanligt.':
        n==='NotReadableError'?'Kameran används av något annat just nu.':'Handstyrningen kunde inte starta. Dra med fingret som vanligt.');
    }finally{delete kn.dataset.laddar;kn.textContent=txt}
  }

  function koppla(sek,vilk,host,spel){
    if(!document.getElementById('sy-hand-css')){const st=document.createElement('style');st.id='sy-hand-css';st.textContent=css;document.head.appendChild(st)}
    const rad=sek.querySelector('.sy-platta-knappar'),yta=sek.querySelector('.sy-platta-yta');if(!rad||!yta)return;
    const mini=sek.classList.contains('sy-miniplatta');
    const b=document.createElement('button');b.type='button';b.className='sy-handknapp';b.setAttribute('aria-pressed','false');
    b.textContent=mini?'🖐':'🖐 HAND';
    b.title='Styr plattan med handen framför kameran. Nyp = effekt, vrid handen = wah, knytnäve = stamma 1/8, två fingrar = stamma 1/16. Kameran används bara här, inget spelas in eller skickas.';
    b.setAttribute('aria-label','Styr effektplattan med handen via kameran');
    const A={sek,vilk,host,spel,yta,knapp:b,mini,prick:yta.querySelector('.sy-platta-prick')};
    const klick=(kn,lage)=>{if(kn.dataset.laddar!==undefined)return;if(aktiv===A&&A.lage===lage)stang(true);else starta(A,lage)};
    b.onclick=()=>klick(b,'platta');
    rad.append(b);
    /* thereminen bor i INSTRUMENT, bredvid arpeggiator och oktav */
    const inst=spel&&sek.closest('.sy-play')?.querySelector('.sy-play-settings');
    if(inst){const t=document.createElement('button');t.type='button';t.className='sy-thereminknapp';t.setAttribute('aria-pressed','false');t.textContent='🎶 THEREMIN';
      t.title='Spela med handen i luften: höjden är tonen, nyp med tumme och pekfinger för att spela. Kameran används bara här, inget spelas in eller skickas.';
      t.setAttribute('aria-label','Theremin: spela toner med handen via kameran');A.tknapp=t;t.onclick=()=>klick(t,'theremin');inst.append(t)}
  }

  /* kameran stängs när fliken döljs eller när plattan inte längre syns */
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&aktiv)stang(false)});
  setInterval(()=>{if(aktiv&&!aktiv.yta.offsetParent)stang(false)},1000);

  window.PPSyntHand={koppla,stang,_test:{tillPlatta,utsnitt,gest,get aktiv(){return aktiv},get delegat(){return delegat},get lm(){return lm}}};
})();
