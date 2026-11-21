/* Styr med handen (PPSyntHand), 20–21 nov 2026.
   Kameran följer en hand. Allt startas från 🖐 HAND i Musiklabbets översta rad (en meny med de lägen som passar fliken):
   - EFFEKTPLATTA (PADS och INSTRUMENT): handflatan = pricken. 🤏 nyp = effekten på, ↻ vrid = WAH,
       ✊ knytnäve = STAMMA 1/8, ✌️ två fingrar = STAMMA 1/16, öppen hand = bara sikte.
   - THEREMIN (INSTRUMENT): höjden = ton i tonartens skala, nyp = spela med valt spårs ljud (spelas in med REC).
   - ACKORDHARPA (INSTRUMENT): kolumnerna är låtens ackord, nyp = slå an, dra åt sidan under nyp = nästa ackord,
       övre halvan = en oktav upp. Ackordljudet från ACKORD.
   - DIRIGENT (alla flikar): handen högt = starkt, lågt = svagt, ✊ = allt tyst, öppna handen = tillbaka.
   - LOOPMIXER (LOOPSTATION): fyra kolumner L1–L4, nyp i en kolumn och dra upp/ner = loopens volym.
   Plattlägena syns i effektplattan, DIRIGENT och LOOPMIXER i ett litet kamerafönster (`.sy-handflyt`).
   Modellen (MediaPipe Hand Landmarker) ligger i /lib/mediapipe och hämtas först vid första start.
   Allt körs i webbläsaren. Ingen bild sparas eller skickas. Ett läge åt gången (en kamera).
   PPSyntHand.koppla(sektion, vilk, host, spel) registrerar en effektplatta; PPSyntHand.meny(knapp) kopplar 🖐 HAND.
   Musiklabbet ger resten via MPTrummaskin.hand (vy, toast, dirigent, tyst, loopar, loopVol, ackord, spelaAckord). */
(function(){
  const LIB='/lib/mediapipe';
  const NYP_PA=.33,NYP_AV=.48,MJUK=.45,TAPP_MS=350,BILDER_IN=2;
  let lm=null,laddar=null,strom=null,video=null,aktiv=null,raf=0,senast=-1,senHand=0,delegat='',felN=0,tvingaCPU=false,hub=null,menyEl=null,flyt=null;
  const PLATTOR={};
  /* På telefoner och surfplattor körs modellen på processorn: GPU-läget kan starta utan fel men sedan inte hitta
     några händer (sett på Samsung S25 Ultra, nov 2026). Datorn kör GPU med CPU som reserv. */
  const MOBIL=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&/Macintosh/.test(navigator.userAgent);
  const api=()=>(window.MPTrummaskin&&window.MPTrummaskin.hand)||{};
  const toast=t=>{const f=api().toast;if(f)f(t)};

  const LAGEN={
    platta:{ikon:'🎛️',namn:'EFFEKTPLATTA',txt:'Nyp och flytta handen. Vrid = wah, knytnäve och två fingrar = stamma.'},
    theremin:{ikon:'🎶',namn:'THEREMIN',txt:'Höjden är tonen. Nyp för att spela med spårets ljud.'},
    harpa:{ikon:'🪕',namn:'ACKORDHARPA',txt:'Låtens ackord på rad. Nyp för att slå an, dra åt sidan för nästa.'},
    dirigent:{ikon:'🙌',namn:'DIRIGENT',txt:'Handen högt = starkt, lågt = svagt. Knytnäve = allt tyst.'},
    loopar:{ikon:'🎚️',namn:'LOOPMIXER',txt:'Nyp i en loop och dra upp eller ner för volymen.'}};
  const VYLAGEN={trummor:['dirigent'],synt:['platta','theremin','harpa','dirigent'],pads:['platta','dirigent'],loop:['loopar','dirigent'],lat:['dirigent']};

  const css=`.sy-handbild{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.32;object-fit:cover;transform:scaleX(-1);filter:grayscale(.4) contrast(1.1)}
.sy-handrit{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.sy-platta-yta.hand .sy-platta-prick{transition:opacity .12s}
.sy-platta-yta.hand.sikte .sy-platta-prick{background:transparent;box-shadow:0 0 0 3px var(--sy);opacity:.85}
.sy-handtips{position:absolute;right:8px;top:8px;font:800 9px/1 ui-monospace,monospace;letter-spacing:.08em;color:#fff;background:rgba(0,0,0,.5);padding:5px 7px;border-radius:6px;pointer-events:none;white-space:nowrap}
.sy-miniplatta .sy-handtips{display:none}
.sy-play .sy-miniplatta .sy-platta-yta.theremin,.sy-play .sy-miniplatta .sy-platta-yta.harpa{height:clamp(170px,30vh,260px)}
.sy-platta-yta.theremin .sy-platta-x,.sy-platta-yta.theremin .sy-platta-y,.sy-platta-yta.harpa .sy-platta-x,.sy-platta-yta.harpa .sy-platta-y{display:none}
.sy-miniplatta .sy-platta-yta.theremin .sy-handtips,.sy-miniplatta .sy-platta-yta.harpa .sy-handtips{display:block;font-size:11px}
.sy-handton{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font:800 clamp(34px,7vw,64px)/1 "Inter",Arial,sans-serif;color:#fff;opacity:0;text-shadow:0 0 24px var(--sy);pointer-events:none;transition:opacity .15s;white-space:nowrap}
.sy-handton.pa{opacity:.9}
.sy-platta-knappar button.hand-on{border-color:var(--sy);background:color-mix(in srgb,var(--sy) 35%,#2a2d33);color:#fff}
#bHand[aria-pressed="true"]{border-color:#ff985d;background:color-mix(in srgb,#ff985d 30%,#2a2d33);color:#fff}
#bHand[data-laddar]{opacity:.7;cursor:progress}
.sy-handmeny{position:fixed;z-index:1200;width:min(330px,calc(100vw - 16px));background:#1d1f23;border:1px solid #3d4047;border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.5);padding:8px;color:#e3e5ea;font-family:"Inter",Arial,sans-serif}
.sy-handmeny h3{margin:4px 8px 8px;font:800 11px/1.2 ui-monospace,monospace;letter-spacing:.1em;color:#ff985d}
.sy-handmeny button{display:flex;gap:12px;align-items:center;width:100%;text-align:left;background:#2a2d33;border:1px solid #3d4047;border-radius:10px;color:inherit;padding:10px 12px;margin:0 0 6px;cursor:pointer;min-height:52px;font:inherit}
.sy-handmeny button:hover,.sy-handmeny button:focus-visible{border-color:#ff985d;outline:none}
.sy-handmeny button[aria-current="true"]{border-color:#ff985d;background:color-mix(in srgb,#ff985d 22%,#2a2d33)}
.sy-handmeny .ik{font-size:24px;flex:none;width:30px;text-align:center}
.sy-handmeny b{display:block;font:800 12px/1.2 ui-monospace,monospace;letter-spacing:.08em}
.sy-handmeny small{display:block;font-size:12.5px;line-height:1.3;color:#aab0bb;margin-top:3px}
.sy-handmeny .av{justify-content:center;min-height:42px;font:800 11px ui-monospace,monospace;letter-spacing:.08em}
.sy-handmeny p{margin:6px 8px 2px;font-size:11.5px;color:#8c93a0;line-height:1.35}
.sy-handflyt{position:fixed;z-index:1100;right:16px;bottom:16px;width:320px;background:#1d1f23;border:1px solid #3d4047;border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.5);padding:8px;--sy:#ff985d}
.sy-handflyt[hidden]{display:none}
.sy-hf-topp{display:flex;align-items:center;justify-content:space-between;margin:0 2px 6px;cursor:grab;touch-action:none;user-select:none;color:#ff985d;font:800 11px/1 ui-monospace,monospace;letter-spacing:.1em}
.sy-hf-topp button{width:34px;height:34px;border-radius:8px;border:1px solid #3d4047;background:#2a2d33;color:#e3e5ea;font-size:15px;cursor:pointer}
.sy-handflyt .sy-platta-yta{aspect-ratio:auto;height:200px;cursor:default}
@media(max-width:620px){.sy-handflyt{left:8px;right:8px;bottom:8px;width:auto}.sy-handflyt .sy-platta-yta{height:190px}}
@media(prefers-reduced-motion:reduce){.sy-handton{transition:none}}`;

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
    ladda().catch(()=>{const A=aktiv;if(A){toast('Handstyrningen fungerar inte på den här enheten. Dra med fingret som vanligt.');stang(false)}});
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

  /* ---------- ritning ---------- */
  function rita(A,pts){
    const c=A.rit,r=A.yta.getBoundingClientRect(),d=devicePixelRatio||1,W=r.width,H=r.height;
    if(c.width!==Math.round(W*d)||c.height!==Math.round(H*d)){c.width=Math.round(W*d);c.height=Math.round(H*d)}
    const g=c.getContext('2d');g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,W,H);
    const col=getComputedStyle(A.yta).getPropertyValue('--sy').trim()||'#ff985d';
    g.font='800 10px ui-monospace,monospace';g.textBaseline='middle';g.textAlign='left';
    if(A.lage==='theremin'&&A.toner){const N=A.toner.length,hh=H/N;
      for(let i=0;i<N;i++){const y=H-(i+1)*hh,pa=i===A.idx;
        g.fillStyle=pa?(A.spelar?col:'rgba(255,255,255,.14)'):i%2?'rgba(255,255,255,.03)':'rgba(255,255,255,.06)';if(pa&&A.spelar)g.globalAlpha=.35;g.fillRect(0,y,W,hh);g.globalAlpha=1;
        g.fillStyle=pa?'#fff':'rgba(255,255,255,.45)';g.fillText(A.spel.namn(A.toner[i]),8,y+hh/2)}}
    if(A.lage==='harpa'&&A.ack){const N=A.ack.length,w=W/N;
      for(let i=0;i<N;i++){const x=i*w,pa=i===A.idx;
        g.fillStyle=pa?(A.spelar?col:'rgba(255,255,255,.14)'):i%2?'rgba(255,255,255,.03)':'rgba(255,255,255,.07)';if(pa&&A.spelar)g.globalAlpha=.35;g.fillRect(x,0,w,H);g.globalAlpha=1;
        g.fillStyle=pa?'#fff':'rgba(255,255,255,.6)';g.font='800 '+(N>6||w<60?12:15)+'px Inter,Arial,sans-serif';g.textAlign='center';g.fillText(A.ack[i].namn,x+w/2,H-14)}
      g.strokeStyle='rgba(255,255,255,.14)';g.setLineDash([4,6]);g.beginPath();g.moveTo(0,H/2);g.lineTo(W,H/2);g.stroke();g.setLineDash([]);
      g.textAlign='left';g.font='800 9px ui-monospace,monospace';g.fillStyle='rgba(255,255,255,.4)';g.fillText('HÖG',6,12);g.fillText('LÅG',6,H/2+12)}
    if(A.lage==='loopar'){const L=api().loopar?.()||[],w=W/4,top=24,bot=H-24;g.textAlign='center';
      L.forEach((l,i)=>{const x=i*w,grip=!!A.grepp&&A.grepp.i===i;
        if(grip||A.kol===i){g.fillStyle=grip?'rgba(255,255,255,.1)':'rgba(255,255,255,.05)';g.fillRect(x,0,w,H)}
        const bw=Math.min(40,w*.45),bx=x+(w-bw)/2,hh=(bot-top)*l.vol/100;
        g.fillStyle='rgba(255,255,255,.08)';g.fillRect(bx,top,bw,bot-top);
        g.globalAlpha=l.tom?.35:grip?1:.8;g.fillStyle=l.farg;g.fillRect(bx,bot-hh,bw,hh);g.globalAlpha=1;
        g.fillStyle=grip?'#fff':'rgba(255,255,255,.75)';g.font='800 11px ui-monospace,monospace';
        g.fillText('L'+(i+1)+(l.tom?' · TOM':''),x+w/2,H-11);g.fillText(Math.round(l.vol)+' %',x+w/2,12)})}
    if(A.lage==='dirigent'){const top=14,bot=H-14,bx=12,f=Math.max(0,Math.min(1,A.vol/1.2));
      g.fillStyle='rgba(255,255,255,.08)';g.fillRect(bx,top,12,bot-top);g.fillStyle=A.tyst?'#5a5f69':col;g.fillRect(bx,bot-(bot-top)*f,12,(bot-top)*f);
      g.fillStyle='rgba(255,255,255,.5)';g.fillRect(bx-3,bot-(bot-top)/1.2,18,2)} /* strecket = 100 % */
    g.textAlign='left';
    if(!pts)return;
    const B=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]];
    g.lineWidth=2;g.strokeStyle='rgba(255,255,255,.55)';g.beginPath();B.forEach(([a,b])=>{g.moveTo(pts[a].px,pts[a].py);g.lineTo(pts[b].px,pts[b].py)});g.stroke();
    g.fillStyle=col;[4,8].forEach(i=>{g.beginPath();g.arc(pts[i].px,pts[i].py,4.5,0,7);g.fill()});
  }

  const TIPS={platta:{oppen:'🤏 NYP = EFFEKT',nyp:'↻ VRID = WAH',knytnave:'✊ STAMMA 1/8',tva:'✌️ STAMMA 1/16'},
              theremin:{oppen:'🤏 NYP = SPELA',nyp:'↕ TON · ↻ WAH',knytnave:'✊ STAMMA 1/8',tva:'✌️ STAMMA 1/16'},
              harpa:{oppen:'🤏 NYP = SLÅ AN',nyp:'↔ NÄSTA ACKORD'},
              dirigent:{oppen:'↕ HÖGT = STARKT · ✊ = TYST',knytnave:'✊ ALLT TYST · 🖐 = TILLBAKA'},
              loopar:{oppen:'🤏 NYP I EN LOOP',nyp:'↕ VOLYM'}};
  const tips=(A,g)=>TIPS[A.lage][g]||TIPS[A.lage].oppen;
  const plattLage=A=>A.lage==='platta'||A.lage==='theremin';
  function stammaKnapp(A,m){A.sek.querySelectorAll('[data-stamma]').forEach(b=>b.classList.toggle('hand-on',+b.dataset.stamma===m))}

  /* lämna en gest: släpp det den höll i */
  function lamna(A,g){
    const P=A.host.platta,pl=plattLage(A);
    if(g==='nyp'){if(A.spelar){if(A.lage==='theremin')A.spel.slapp();A.spelar=false;A.ton.classList.remove('pa')}
      A.yta.classList.remove('aktiv');A.grepp=null;
      if(pl){P?.xy(1,0,true,A.vilk);P?.hall(false,A.vilk)}}
    if((g==='knytnave'||g==='tva')&&pl){stammaKnapp(A,0);P?.stamma(0,A.vilk);P?.hall(false,A.vilk)}
  }
  function ga_in(A,g){
    const P=A.host.platta,pl=plattLage(A);
    if(g==='nyp'){A.yta.classList.add('aktiv');if(pl)P?.hall(true,A.vilk)}
    if((g==='knytnave'||g==='tva')&&pl){const m=g==='knytnave'?1:2;stammaKnapp(A,m);P?.hall(true,A.vilk);P?.stamma(m,A.vilk)}
    /* dirigenten: knytnäven tystar allt tills en öppen hand syns igen */
    if(A.lage==='dirigent'){if(g==='knytnave'&&!A.tyst){api().tyst?.(true);A.tyst=true}else if(g!=='knytnave'&&g!=='ingen'&&A.tyst){api().tyst?.(false);A.tyst=false}}
  }
  function bytGest(A,g){if(g===A.g)return;lamna(A,A.g);A.g=g;ga_in(A,g);A.tips.textContent=tips(A,g);A.yta.classList.toggle('sikte',g==='oppen')}

  function loop(){
    raf=requestAnimationFrame(loop);const A=aktiv;if(!A||!lm||!video||video.readyState<2)return;
    if(video.currentTime===senast)return;senast=video.currentTime;
    placeraBild(A);
    let res;try{res=lm.detectForVideo(video,performance.now());felN=0}
    catch(e){if(++felN>=5){if(delegat==='GPU')tillCPU();else{toast('Handstyrningen fungerar inte på den här enheten. Dra med fingret som vanligt.');stang(false)}}return}
    const h=res&&res.landmarks&&res.landmarks[0],nu=performance.now();
    if(!h){if(nu-senHand>TAPP_MS&&(A.g!=='ingen'||!A.prick.hidden)){bytGest(A,'ingen');A.yta.classList.remove('sikte');A.tips.textContent=tips(A,'oppen');A.prick.hidden=true;A.pos=null;A.idx=-1;A.kol=-1;rita(A,null)}return}
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
    }else if(A.lage==='harpa'){
      /* kolumnerna har marginal (20 %) så att ackordet inte fladdrar vid gränsen */
      const N=A.ack.length;let i=A.idx;
      if(i<0||x<(i-.2)/N||x>(i+1.2)/N)i=Math.max(0,Math.min(N-1,Math.floor(x*N)));
      const ny=i!==A.idx;A.idx=i;
      if(A.g==='nyp'&&(!A.spelar||ny)){api().spelaAckord?.(A.ack[i].c,y>.5);A.spelar=true;A.ton.textContent=A.ack[i].namn;A.ton.classList.add('pa')}
    }else if(A.lage==='dirigent'){
      if(A.g!=='knytnave'){const t=.08+1.12*kl((y-.1)/.8);A.vol+=(t-A.vol)*.3;api().dirigent?.(A.vol)}
      A.ton.textContent=A.tyst?'🔇 TYST':Math.round(A.vol*100)+' %';A.ton.classList.add('pa');
    }else if(A.lage==='loopar'){
      A.kol=Math.max(0,Math.min(3,Math.floor(x*4)));
      /* greppet är relativt: volymen hoppar inte när man nyper, den följer rörelsen därifrån */
      if(A.g==='nyp'){const L=api();if(!A.grepp)A.grepp={i:A.kol,y0:y,v0:L.loopVol?.(A.kol)??80};L.loopVol?.(A.grepp.i,A.grepp.v0+(y-A.grepp.y0)*130)}
    }else if(A.g==='nyp')A.host.platta?.xy(x,y,false,A.vilk,A.q);
    if(A.g==='nyp'&&A.lage==='platta'){const n=Math.round((A.q-.7)/9.3*5);A.tips.textContent='↻ WAH '+'▮'.repeat(n)+'▯'.repeat(5-n)}
    rita(A,pts);
  }

  function stang(meddela){
    const A=aktiv;aktiv=null;cancelAnimationFrame(raf);raf=0;
    if(A){bytGest(A,'ingen');
      if(A.lage==='dirigent'){api().dirigent?.(1);if(A.tyst)api().tyst?.(false);A.tyst=false}
      A.yta.classList.remove('hand','sikte','theremin','harpa','aktiv');A.prick.hidden=true;A.bildK='';A.bild.removeAttribute('style');
      A.bild.remove();A.rit.remove();A.tips.remove();A.ton.remove();if(A.flyt)A.flyt.hidden=true;}
    if(strom){strom.getTracks().forEach(t=>t.stop());strom=null}
    if(video){video.srcObject=null}
    hubVisa();
    if(meddela&&A)toast('Kameran är avstängd');
  }

  async function starta(A,lage){
    stang(false);
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){toast('Den här webbläsaren kan inte använda kameran');return}
    if(hub){hub.dataset.laddar='';const tx=hub.querySelector('.tx');if(tx)tx.textContent=' LADDAR …'}
    try{
      const [s]=await Promise.all([kamera(),ladda()]);
      if(!video){video=document.createElement('video');video.muted=true;video.playsInline=true;video.setAttribute('playsinline','')}
      video.srcObject=s;await video.play();
      A.lage=lage;A.bild=video;A.bild.className='sy-handbild';
      A.rit=document.createElement('canvas');A.rit.className='sy-handrit';
      A.tips=document.createElement('span');A.tips.className='sy-handtips';A.tips.textContent=tips(A,'oppen');
      A.ton=document.createElement('span');A.ton.className='sy-handton';
      A.yta.prepend(A.bild);A.prick.before(A.rit);A.yta.append(A.ton);
      if(A.flyt){A.titel.textContent=LAGEN[lage].ikon+' '+LAGEN[lage].namn;A.tips.classList.add('sy-hf-tips');A.titel.after(A.tips);A.flyt.hidden=false}
      else A.yta.append(A.tips);
      A.yta.classList.add('hand');A.yta.classList.toggle('theremin',lage==='theremin');A.yta.classList.toggle('harpa',lage==='harpa');
      if(lage==='theremin')A.toner=thereminToner(A);
      if(lage==='harpa'){A.ack=api().ackord?.()||[];if(!A.ack.length)throw new Error('ackord')}
      aktiv=A;A.pos=null;A.q=0;A.g='ingen';A.kand='';A.kandN=0;A.idx=-1;A.kol=-1;A.grepp=null;A.spelar=false;A.vol=1;A.tyst=false;senHand=0;senast=-1;
      A.host.startAudio?.();
      if(!raf)raf=requestAnimationFrame(loop);
      rita(A,null);
      if(!A.flyt)A.yta.scrollIntoView({block:'nearest',behavior:'smooth'});
    }catch(e){
      stang(false);
      const n=e&&e.name;
      toast(n==='NotAllowedError'||n==='SecurityError'?'Kameran är inte tillåten. Du kan ge lov i webbläsarens inställningar.':
        n==='NotFoundError'||n==='OverconstrainedError'?'Ingen kamera hittades.':
        n==='NotReadableError'?'Kameran används av något annat just nu.':'Handstyrningen kunde inte starta.');
    }finally{if(hub)delete hub.dataset.laddar;hubVisa()}
  }

  /* ---------- kamerafönstret för DIRIGENT och LOOPMIXER ---------- */
  function flytA(){
    if(flyt)return flyt;
    const el=document.createElement('div');el.className='sy-handflyt';el.hidden=true;el.setAttribute('role','region');el.setAttribute('aria-label','Handstyrning');
    el.innerHTML='<div class="sy-hf-topp"><span class="sy-hf-titel"></span><button type="button" aria-label="Stäng av kameran" title="Stäng av kameran">✕</button></div><div class="sy-platta-yta"><span class="sy-platta-prick" hidden></span></div>';
    document.body.appendChild(el);el.querySelector('button').onclick=()=>stang(true);
    /* fönstret flyttas genom att dra i namnraden (det får inte täcka det man vill se) */
    const topp=el.querySelector('.sy-hf-topp');let dr=null;
    topp.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;const r=el.getBoundingClientRect();dr={dx:e.clientX-r.left,dy:e.clientY-r.top};topp.setPointerCapture(e.pointerId);e.preventDefault()});
    topp.addEventListener('pointermove',e=>{if(!dr)return;const w=el.offsetWidth,h=el.offsetHeight;
      el.style.left=Math.max(4,Math.min(innerWidth-w-4,e.clientX-dr.dx))+'px';el.style.top=Math.max(4,Math.min(innerHeight-h-4,e.clientY-dr.dy))+'px';el.style.right=el.style.bottom='auto'});
    const slut=()=>{dr=null};topp.addEventListener('pointerup',slut);topp.addEventListener('pointercancel',slut);
    addEventListener('resize',()=>{if(el.style.left){el.style.left=el.style.top=el.style.right=el.style.bottom=''}});
    flyt={flyt:el,titel:el.querySelector('.sy-hf-titel'),yta:el.querySelector('.sy-platta-yta'),prick:el.querySelector('.sy-platta-prick'),sek:el,vilk:null,host:{startAudio:()=>api().startaLjud?.()}};
    return flyt;
  }

  /* ---------- 🖐 HAND i översta raden ---------- */
  function hubVisa(){
    if(!hub)return;const on=!!aktiv;hub.setAttribute('aria-pressed',String(on));
    if(hub.dataset.laddar!==undefined)return;
    const tx=hub.querySelector('.tx');if(tx)tx.textContent=' HAND'; /* samma bredd hela tiden: raden får inte bryta */
    hub.setAttribute('aria-label',on?'Handstyrning: '+LAGEN[aktiv.lage].namn.toLowerCase()+'. Öppna menyn':'Styr med handen via kameran');
  }
  const plattaFor=vy=>vy==='pads'?PLATTOR.p:PLATTOR.i;
  function valj(lage){
    const vy=api().vy?.()||'trummor';
    const A=lage==='dirigent'||lage==='loopar'?flytA():lage==='platta'?plattaFor(vy):PLATTOR.i;
    if(!A){toast('Det finns ingen effektplatta här');return}
    if(aktiv===A&&aktiv.lage===lage){stang(true);return}
    return starta(A,lage);
  }
  function menyStang(){if(menyEl&&!menyEl.hidden){menyEl.hidden=true;hub&&hub.setAttribute('aria-expanded','false')}}
  function menyOppna(){
    if(!menyEl){menyEl=document.createElement('div');menyEl.className='sy-handmeny';menyEl.hidden=true;menyEl.setAttribute('role','menu');menyEl.setAttribute('aria-label','Styr med handen');document.body.appendChild(menyEl);
      menyEl.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;menyStang();if(b.dataset.av!==undefined){stang(true);return}valj(b.dataset.lage)});
      document.addEventListener('pointerdown',e=>{if(menyEl&&!menyEl.hidden&&!menyEl.contains(e.target)&&!(hub&&hub.contains(e.target)))menyStang()},true);
      document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menyEl&&!menyEl.hidden){e.stopPropagation();menyStang();hub&&hub.focus()}},true);
      addEventListener('resize',menyStang);}
    const vy=api().vy?.()||'trummor',lagen=VYLAGEN[vy]||['dirigent'];
    const pa=l=>!!aktiv&&aktiv.lage===l&&(l!=='platta'||aktiv===plattaFor(vy));
    menyEl.innerHTML='<h3>🖐 STYR MED HANDEN</h3>'+lagen.map(l=>`<button type="button" role="menuitem" data-lage="${l}" aria-current="${pa(l)}"><span class="ik" aria-hidden="true">${LAGEN[l].ikon}</span><span><b>${LAGEN[l].namn}${pa(l)?' · PÅ':''}</b><small>${LAGEN[l].txt}</small></span></button>`).join('')+
      (aktiv?'<button type="button" role="menuitem" class="av" data-av>⏹ STÄNG AV KAMERAN</button>':'')+'<p>Kameran används bara här. Ingen bild sparas eller skickas.</p>';
    const r=hub.getBoundingClientRect(),w=Math.min(330,innerWidth-16);
    menyEl.style.left=Math.max(8,Math.min(innerWidth-w-8,r.right-w))+'px';menyEl.style.top=(r.bottom+6)+'px';menyEl.style.maxHeight=(innerHeight-r.bottom-14)+'px';menyEl.style.overflowY='auto';
    menyEl.hidden=false;hub.setAttribute('aria-expanded','true');menyEl.querySelector('button').focus({preventScroll:true});
  }
  function cssIn(){if(!document.getElementById('sy-hand-css')){const st=document.createElement('style');st.id='sy-hand-css';st.textContent=css+'\n.sy-handmeny[hidden]{display:none}.sy-handflyt .sy-hf-tips{position:static;margin:0 8px 0 auto}';document.head.appendChild(st)}}
  function meny(knapp){
    cssIn();hub=knapp;knapp.setAttribute('aria-haspopup','menu');knapp.setAttribute('aria-expanded','false');
    knapp.addEventListener('click',()=>{if(knapp.dataset.laddar!==undefined)return;menyEl&&!menyEl.hidden?menyStang():menyOppna()});
    hubVisa();
  }

  /* en effektplatta registreras (PADS = 'p', INSTRUMENT = 'i'); spel = {spela(n), slapp(), namn(n)} för thereminen */
  function koppla(sek,vilk,host,spel){
    cssIn();const yta=sek.querySelector('.sy-platta-yta');if(!yta)return;
    PLATTOR[vilk]={sek,vilk,host,spel,yta,mini:sek.classList.contains('sy-miniplatta'),prick:yta.querySelector('.sy-platta-prick')};
  }

  /* kameran stängs när fliken döljs; plattlägena även när plattan inte längre syns (DIRIGENT och LOOPMIXER följer med mellan flikarna) */
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&aktiv)stang(false)});
  setInterval(()=>{if(aktiv&&!aktiv.yta.offsetParent)stang(false)},1000);

  window.PPSyntHand={koppla,meny,valj,stang,_test:{tillPlatta,utsnitt,gest,get aktiv(){return aktiv},get delegat(){return delegat},get lm(){return lm}}};
})();
