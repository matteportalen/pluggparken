/* Gemensamt sidhuvud och bakåtknapp för Pluggparken.
   Laddas efter ljud.js och djur.js, före sidans eget skript:
     <script src="../huvud.js" data-titel="Klockan" data-ikon="🕒"></script>
   data-hem       väg till startsidan (standard "../")
   data-nav       "av" för sidor med egen historik (NP3 med #-adresser) eller utan skärmar (startsidan, Tiobas)
   data-helskarm  skärmar där sidhuvudet göms helt (spel med egen ✕), t.ex. "game mem bub"
   data-liggande  "ja": göm sidhuvudet på mobil i liggande läge (Tiobas)
   data-portal    "ovriga" på sidorna i Fler ämnen (annan logga, färg och startsida). Standard: matte (startsidan).
   Loggan är en hamburgerknapp (☰): den öppnar menyn med portalerna (startsidan och Fler ämnen).
   Tillbaka-knappen (←) längst till vänster finns på alla sidor utom startsidorna: ett steg bakåt i sidan,
   och från sidans första skärm tillbaka dit man kom ifrån (eller till startsidan).
   Bara portaler med innehåll står i listan.
   Sidan anropar MPS.visa(id) varje gång den byter skärm (i sin show-funktion).

   Sidhuvudet: loggan Pluggparken (griffeltavla med kritat + A planet stjärna, öppnar menyn), sidans namn, profilens namn med elevens djur och stjärnor
   (leder till garderoben) och ljudknappen. Under räkning (skärmen "game") krymper det till ✕ och sidans namn.
   Stjärnorna räknas här (MPStjarnor) med samma regler som startsidan och uppdateras direkt när något sparas.

   Bakåtknappen: varje skärm i en övning blir ett steg i webbläsarens historik (hem 0, val/lägen 1, spel och
   resultat 2). Går man bakåt trycker sidhuvudet på skärmens egen tillbaka-knapp (#quit, [data-home], #rModes …),
   så sidornas egna knappar fungerar som förut. Kräver djur.js (lasDjur, owlSVG); ljud.js för ljudknappen. */
(function(){
  const me=document.currentScript,ds=(me&&me.dataset)||{};
  const CSS=`
.mph{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:8px;min-height:52px;padding:calc(6px + env(safe-area-inset-top,0px)) 12px 6px;
  background:linear-gradient(110deg,#1A302C 0%,#1F3A35 50%,#2B4F47 100%);color:#fff;font-family:"Baloo 2","Trebuchet MS",system-ui,sans-serif;box-shadow:0 3px 0 #7E5129;line-height:1.2;font-size:18px}
.mph a{color:inherit;text-decoration:none}
.mph button{font:inherit;color:inherit;border:0;background:none;cursor:pointer;touch-action:manipulation;padding:0}
.mph-logo{position:relative;display:flex;align-items:center;gap:7px;font-weight:800;font-size:1.2rem!important;line-height:1;letter-spacing:-.3px;white-space:nowrap;min-height:44px;padding:3px 6px 3px 3px!important;border-radius:999px;background:rgba(255,255,255,.12)!important;flex:none;transition:background .2s}
.mph-logo b{color:#F4D35E}
.mph-burger em{display:none;font-style:normal;font-size:.9rem;font-weight:800;letter-spacing:0}
@media (min-width:700px){.mph .mph-burger{padding:0 11px 0 9px}.mph-burger em{display:inline}}
.mph-logo .mph-mark{transition:transform .25s,filter .25s}
.mph .mph-burger{min-width:28px;height:28px;border-radius:999px;gap:5px;grid-auto-flow:column;background:#FFC93C;color:#1D2B53;display:grid;place-items:center;font-size:1rem;line-height:1;box-shadow:0 2px 0 rgba(29,43,83,.25)}
.mph-burger::before{content:"";position:absolute;inset:-3px;border-radius:inherit;padding:3px;background:conic-gradient(from var(--mph-a,0deg),transparent 0 55%,rgba(255,201,60,.0) 58%,#FFC93C 74%,#fff 82%,rgba(255,255,255,0) 90%,transparent);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .25s;pointer-events:none}
@property --mph-a{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes mph-varv{to{--mph-a:360deg}}
.mph-home{display:flex;align-items:center;gap:7px;color:inherit;text-decoration:none;border-radius:999px;padding-right:4px}.mph-home:hover,.mph-home:focus-visible{outline:0;background:rgba(255,255,255,.14)}.mph .mph-burger{position:relative}.mph-burger:hover,.mph-burger:focus-visible,.mph-burger[aria-expanded="true"]{outline:0;filter:brightness(1.06)}
.mph-burger:hover::before,.mph-burger:focus-visible::before,.mph-burger[aria-expanded="true"]::before,.mph-burger:active::before{opacity:1;animation:mph-varv 1.6s linear infinite}
.mph-home:hover .mph-mark,.mph-home:focus-visible .mph-mark{transform:rotate(-6deg) scale(1.08);filter:drop-shadow(0 0 6px rgba(255,255,255,.9)) drop-shadow(0 2px 0 rgba(29,43,83,.25))}
@media (prefers-reduced-motion:reduce){.mph-burger::before{animation:none!important}.mph-logo .mph-mark{transition:none}}
.mph-mark{width:34px;height:34px;display:block;flex:none;filter:drop-shadow(0 2px 0 rgba(29,43,83,.25))}
.mph-bk{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.95)!important;color:#1D2B53!important;font-weight:800;font-size:1.35rem!important;line-height:1;flex:none;box-shadow:0 3px 0 rgba(29,43,83,.25);display:grid;place-items:center}
.mph-bk:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(29,43,83,.25)}
.mph.mini .mph-bk{display:none}
.mph-x{display:none;width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.95)!important;color:#1D2B53!important;font-weight:800;font-size:1.2rem;box-shadow:0 3px 0 rgba(29,43,83,.25)}
.mph-title{flex:1;min-width:0;font-weight:800;font-size:1.05rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.95}
.mph-sep{opacity:.6;margin:0 2px}
.mph-right{display:flex;align-items:center;gap:6px;flex:0 1 auto;min-width:0}
.mph-pet{min-width:0;display:flex;align-items:center;gap:4px;background:rgba(255,255,255,.18);border-radius:999px;padding:2px 10px 2px 2px;font-weight:800;min-height:40px}
.mph-pet svg{width:34px;height:auto;display:block;flex:none}
.mph-mynt{position:relative;white-space:nowrap}
.mph-stj{display:inline-block;width:max-content;margin-top:6px;background:var(--warn-bg,#FFF4CC);color:var(--warn-ink,#8A5A00);border-radius:999px;padding:1px 10px;font-weight:800;font-size:.82rem;line-height:1.5}.mph-stj.noll{background:var(--soft,#EEF2FA);color:var(--muted,#56668F);font-weight:700}.gamecard .mph-stj{background:rgba(255,255,255,.22);color:#fff}.gamecard .mph-stj.noll{background:rgba(255,255,255,.14);color:rgba(255,255,255,.85)}@media(min-width:760px){.glist .gamecard .mph-stj{background:var(--warn-bg,#FFF4CC);color:var(--warn-ink,#8A5A00)}.glist .gamecard .mph-stj.noll{background:var(--soft,#EEF2FA);color:var(--muted,#56668F)}}
.mph-plus{position:absolute;left:50%;top:-4px;transform:translateX(-50%);background:#F2B707;color:#1D2B53;border-radius:999px;padding:0 8px;font-size:.85rem;white-space:nowrap;animation:mph-up 1.6s ease-out forwards;pointer-events:none}
@keyframes mph-up{0%{opacity:0;transform:translate(-50%,10px)}15%{opacity:1;transform:translate(-50%,24px)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,30px)}}
@media(max-width:400px){.mph.has-title .mph-mynt{display:none}}
.mph-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:9em}
.mph-sok{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.18)!important;font-size:1.1rem;flex:none}
@media(max-width:419px){.mph-sok{display:none}}
html.mph-nozoom,html.mph-nozoom body{touch-action:pan-x pan-y}
.mph-zoomut{position:fixed;right:12px;bottom:max(12px,env(safe-area-inset-bottom));z-index:99998;border:0;border-radius:999px;padding:10px 18px;font:800 1rem/1 "Baloo 2",sans-serif;background:#F2B707;color:#2A2108;box-shadow:0 4px 0 #7A5F1E,0 8px 20px rgba(0,0,0,.35);cursor:pointer}
.mph-snd{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.18)!important;font-size:1.15rem;flex:none}
.mph.ovriga{background:linear-gradient(110deg,#17302F 0%,#1C3F3D 50%,#25605C 100%);box-shadow:0 3px 0 #7E5129}
.mph-menu{position:absolute;top:calc(100% + 6px);left:10px;animation:mph-ner .18s ease-out;background:#fff;color:#1D2B53;border-radius:18px;padding:6px;box-shadow:0 10px 30px rgba(29,43,83,.25),0 3px 0 #C6D6F2;min-width:240px;z-index:30}
.mph-menu a{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;font-weight:800;font-size:1.1rem}
.mph-em{flex:none;width:30px;height:30px;border-radius:9px;background:#EAF3FF;display:grid;place-items:center;font-size:1.2rem}
.mph-menu a:hover,.mph-menu a:focus-visible{background:#EAF3FF;outline:0}
.mph-menu a[aria-current="true"]::after{content:"✓";margin-left:auto;color:#1E9E5E}
.mph-menu .mph-mark{width:30px;height:30px;filter:none}
.mph-menu .mph-vann .mph-mark{border-radius:8px;object-fit:cover;flex:none}
.mph-menu .mph-vann::after{content:"↗";margin-left:auto;color:#56668F;font-weight:800}
@keyframes mph-ner{from{opacity:0;transform:translateY(-8px)}}
.mph-menu small{display:block;font-weight:700;font-size:.8rem;color:#56668F}
.mph.mini .mph-logo,.mph.mini .mph-right,.mph.mini .mph-sep{display:none}
.mph.mini .mph-x{display:grid;place-items:center}
.mph.dold{display:none}
body.mph-mini #quit{display:none}
@media (max-width:520px){.mph-home span.t{display:none}.mph-name{max-width:5em}.mph.has-title .mph-name{display:none}}
@media (max-width:360px){.mph-name{display:none}}
@media (orientation:landscape) and (max-height:500px){.mph.liggande{display:none}}
@media print{.mph{display:none}}`;
  /* Pluggparkens logga: en griffeltavla i träram med kritat +, A, planet och stjärna (lärarens val 4).
     Flikikonen har tjockare krita och smalare ram, så att den syns i 16 px. */
  const LOGO_PP='<svg class="mph-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true"><rect x="2" y="2" width="96" height="96" rx="24" fill="#6E4522"/><rect x="9" y="9" width="82" height="76" rx="9" fill="#1F3A35"/><rect x="9" y="85" width="82" height="6" fill="#7E5129"/><path d="M29.5 22v15M22 29.5h15" stroke="#F3F0E4" stroke-width="5" stroke-linecap="round"/><path d="M63 38L70.5 21L78 38M66 32.5H75" fill="none" stroke="#F4D35E" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="29.5" cy="64" r="6" fill="none" stroke="#9FD3EC" stroke-width="3"/><ellipse cx="29.5" cy="64" rx="12" ry="3.8" fill="none" stroke="#9FD3EC" stroke-width="2.4" transform="rotate(-20 29.5 64)"/><path d="M70.5 53l2.8 6 6.5.7-4.9 4.4 1.4 6.4-5.8-3.3-5.8 3.3 1.4-6.4-4.9-4.4 6.5-.7z" fill="none" stroke="#F2A7BB" stroke-width="2.6" stroke-linejoin="round"/></svg>';
  const LOGO_FAV='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" rx="20" fill="#6E4522"/><rect x="6" y="6" width="88" height="82" rx="10" fill="#1F3A35"/><path d="M28 18v22M17 29h22" stroke="#F3F0E4" stroke-width="8" stroke-linecap="round"/><path d="M60 42L71 17L82 42M64.5 34H77.5" fill="none" stroke="#F4D35E" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="28" cy="66" r="8" fill="none" stroke="#9FD3EC" stroke-width="5"/><path d="M71 52l3.3 7.2 7.7.8-5.8 5.2 1.6 7.6-6.8-3.9-6.8 3.9 1.6-7.6-5.8-5.2 7.7-.8z" fill="#F2A7BB"/></svg>';
  /* Matte (startsidan): fyra räknesätt i färgade rutor, visas i menyn */
  const LOGO='<svg class="mph-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true"><rect x="2" y="2" width="96" height="96" rx="24" fill="#fff"/><rect x="12" y="12" width="35" height="35" rx="9" fill="#2BB673"/><rect x="53" y="12" width="35" height="35" rx="9" fill="#FF6B6B"/><rect x="12" y="53" width="35" height="35" rx="9" fill="#7B61FF"/><rect x="53" y="53" width="35" height="35" rx="9" fill="#FF9F43"/><g stroke="#fff" stroke-width="6" stroke-linecap="round"><path d="M29.5 21v17M21 29.5h17M62 29.5h17M23.5 64.5l12 12M35.5 64.5l-12 12M62 70.5h17"/></g><circle cx="70.5" cy="62" r="3.6" fill="#fff"/><circle cx="70.5" cy="79" r="3.6" fill="#fff"/></svg>';
  /* Loggan för Fler ämnen: blad, vattendroppe, planet och sol i samma sorts rutor */
  const LOGO_NO='<svg class="mph-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true"><rect x="2" y="2" width="96" height="96" rx="24" fill="#fff"/><rect x="12" y="12" width="35" height="35" rx="9" fill="#2BB673"/><rect x="53" y="12" width="35" height="35" rx="9" fill="#3D8BFD"/><rect x="12" y="53" width="35" height="35" rx="9" fill="#7B61FF"/><rect x="53" y="53" width="35" height="35" rx="9" fill="#FF9F43"/><path d="M21 39C21 26 29 20 39 20C39 32 33 39 21 39Z" fill="#fff"/><path d="M21 39L31 29" stroke="#2BB673" stroke-width="2.5" stroke-linecap="round"/><path d="M70.5 19C70.5 19 61 30 61 35.5A9.5 9.5 0 0 0 80 35.5C80 30 70.5 19 70.5 19Z" fill="#fff"/><circle cx="29.5" cy="70.5" r="7.5" fill="#fff"/><ellipse cx="29.5" cy="70.5" rx="14" ry="4.5" fill="none" stroke="#fff" stroke-width="2.6" transform="rotate(-20 29.5 70.5)"/><circle cx="70.5" cy="70.5" r="7" fill="#fff"/><g stroke="#fff" stroke-width="3.2" stroke-linecap="round"><path d="M70.5 56v4M70.5 81v4M56 70.5h4M81 70.5h4M60.3 60.3l2.8 2.8M77.9 77.9l2.8 2.8M60.3 80.7l2.8-2.8M77.9 63.1l2.8-2.8"/></g></svg>';
  const PORTALER=[{id:'matte',namn:'Matte',sub:'Räkna, spela och utforska',kort:'Matte',ikon:'🔢',href:'v1/',logo:LOGO},{id:'ovriga',namn:'Fler ämnen',sub:'Svenska, NO, SO, engelska och mer',kort:'Fler ämnen',ikon:'🌍',href:'ovriga/',logo:LOGO_NO}];
  const PORTAL=PORTALER.find(p=>p.id===ds.portal)||PORTALER[0];
  /* ---------- Designval: nya (ämnen på första sidan) eller gamla (v1: Matte och Fler ämnen) ----------
     Valet sparas i localStorage "pluggparken-design" ("v1" = gamla). Alla länkar i menyn och tillbaka-knappen följer valet. */
  const DESIGN='ny';
  const em=e=>`<span class="mph-em" aria-hidden="true">${e}</span>`;
  const NYMENY=[{id:'hem',namn:'Välj ämne',sub:'Alla ämnen',href:'',logo:em('🏠')},{id:'matte',namn:'Matematik',sub:'Räkna, spela och utforska',href:'matte/',logo:em('🔢')},
    {id:'svenska',namn:'Svenska',sub:'Ord, stavning, läsning och sagor',href:'svenska/',logo:em('📖')},{id:'rymd',namn:'Rymdlabbet',sub:'Planeterna, stjärnorna och svarta hål',href:'ovriga/rymdlabbet/',logo:em('🔭')},
    {id:'so',namn:'SO',sub:'Kartor, länder och platser',href:'so/',logo:em('🗺️')},{id:'special',namn:'Specialare',sub:'Minilektioner om spännande ämnen',href:'specialare/',logo:em('🎁')},
    {id:'fler',namn:'Fler ämnen',sub:'Engelska, logik, kod och pengar',href:'fler/',logo:em('🧩')},
    {id:'extra',namn:'Extra',sub:'Saker att göra själv',href:'extra/',logo:em('✨')}];
  // vilket ämne en sida hör till (för menyn och tillbaka-knappen)
  const REL=location.pathname.replace(/^\//,'').replace(/index\.html$/,'');
  function amneAv(){const seg=REL.split('/'),top=seg[0],sub=seg[1]||'';
    if(REL==='')return'hem';
    if(['matte','svenska','so','fler','extra'].includes(top)&&seg.length<=2)return top;
    if(top==='extra')return'extra';
    if(top==='ovriga'){if(/^(ordgomma|ordgatan|hogfrekventa|lasflyt|bokstaver)$/.test(sub))return'svenska';if(/^(sverigekartan|europa|varlden)$/.test(sub))return'so';
      if(/^(rymdlabbet|solsystemet|vintergatan)$/.test(sub))return'rymd';if(sub==='ansiktsloppan')return'extra';return'fler';}
    if(/^(meningsbyggaren|ordkedjan|ordgissning|dubbelteckning|knepigaljud|sagobyggaren)$/.test(top))return'svenska';
    if(top==='tidslinjen')return'so';
    if(/^(schack|trerirad|sudoku|trafikstockning)$/.test(top))return'fler';
    if(top==='specialare')return'special';
    if(/^(mittrum|flytta)$/.test(top))return'hem';
    return'matte';}
  const AMNE=amneAv(),EGENSIDA=REL===''||['matte','svenska','so','fler','extra'].includes(REL.replace(/\/$/,''));   // sidan är ämnets egen sida
  const MENY=DESIGN==='ny'?NYMENY:PORTALER,MENYNU=DESIGN==='ny'?(NYMENY.find(p=>p.id===AMNE)||null):PORTAL;
  window.MPLogo=LOGO_PP;
  // loggan som ikon i webbläsarfliken
  if(!document.querySelector('link[rel="icon"]')){const l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(LOGO_FAV);document.head.appendChild(l);}

  /* ---------- Stjärnor: samma regler som startsidan ---------- */
  const get=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}};
  const sum=o=>Object.values(o||{}).reduce((s,v)=>s+(typeof v==='number'?v:sum(v)),0);
  const T10=[1,2,3,4,5,6,7,8,9,10];
  function medalsFrom(h){
    const lv=(a,b)=>{const x=h(a,b);if(!x.length)return 0;const l=x.slice(-2);if(l.length===2&&l[0][0]&&l[1][0])return(l[0][1]<3000&&l[1][1]<3000)?3:2;return 1};
    return T10.map(T=>{if(T10.every(n=>lv(n,T)===3))return 3;if(T10.every(n=>lv(n,T)>=2))return 2;if(T10.every(n=>h(n,T).some(x=>x[0])))return 1;return 0});
  }
  // stjärnor per övning (samma regler som startsidan); k = mappens namn, "spel:<spel>" för spelen i Spelhörnan, "spelhornan" för alla där
  const STJ=['tidslinjen','knepigaljud','sagobyggaren','meningsbyggaren','tiointe','klockan','geometri','brak','uppstallning','hundraruta','tiotal','taluppfattning','sverigekartan','ordgomma','europa','varlden','talfoljd','rutjakten','brakbitar','kortdivision','vagen','gomda','kulbanan','affaren','hogfrekventa','rita','ordgatan','tangentbord','kodverkstan','delaupp','matning','pengar','lasflyt','sagoriket','sifferslottet','schack','trerirad','sudoku','trafikstockning'];
  const SPELSUB=['fly','mem','car','space','frog','tower','skatt','kiosk','bubbel','tug'];
  const SPELHORNAN=['skattjakten','kulbanan','sagoriket','sifferslottet','affaren','rutjakten'];
  function stjFor(k){
    if(k==='multiplikation'){const mu=get('mattespel-multiplikation-v1');return mu&&mu.facts?medalsFrom((a,b)=>mu.facts[Math.min(a,b)+'x'+Math.max(a,b)]||[]).reduce((a,b)=>a+b,0):0;}
    if(k==='division'){const dv=get('mattespel-division-v1');return dv&&dv.facts?medalsFrom((q,d)=>dv.facts[d+':'+q+':0']||[]).reduce((a,b)=>a+b,0):0;}
    if(k==='skattjakten'){const sj=get('mattespel-skattjakten-v1');return Object.values((sj&&sj.stars)||{}).reduce((a,b)=>a+(+b||0),0);}
    if(k.startsWith('spel:')){const sp=get('mattespel-spel-v1')||{};return Object.values(sp[k.slice(5)]||{}).reduce((a,r)=>a+((r&&r.stars)||0),0);}
    if(k==='spelhornan')return SPELSUB.reduce((a,x)=>a+stjFor('spel:'+x),0)+SPELHORNAN.reduce((a,x)=>a+stjFor(x),0);
    if(STJ.includes(k)){const d=get('mattespel-'+k+'-v1');return sum((d&&d.stars)||{});}
    return null;}
  window.MPStjarnorFor=stjFor;
  window.MPStjarnor=function(){
    return stjFor('multiplikation')+stjFor('division')+SPELSUB.reduce((a,x)=>a+stjFor('spel:'+x),0)+STJ.reduce((a,x)=>a+stjFor(x),0)+stjFor('skattjakten');
  };

  /* ---------- Mynt (matteportalen-mynt) ----------
     Stjärnorna visar vad man kan och samlas för alltid; mynten tjänas på att träna och används i Garderoben.
     Ny stjärna = 20 mynt (räknas här, på alla sidor), avklarad runda = 6 mynt (när sidan visar skärmen "result"),
     dagens första runda = 10 extra. Första gången: 5 mynt per stjärna man redan har.
     {m: mynt nu, tj: tjänat totalt, sedd: stjärnor som redan gett mynt, kopt: köpta saker "plats:id" (null = inte flyttat än), dag, senast} */
  const MK='matteportalen-mynt',idag=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
  function myntLas(){let m=get(MK);const s=MPStjarnor();
    if(!m||typeof m.m!=='number'){m={m:5*s,tj:5*s,sedd:s,hi:s,kopt:null,dag:'',senast:0};myntSpara(m);}
    else{
      // Mynt för nya stjärnor ges bara när stjärnorna passerar det högsta antal som någonsin gett mynt (hi). Det går aldrig ned,
      // så två flikar med olika version av koden (eller data som tillfälligt ger färre stjärnor) kan inte ge mynt om och om igen.
      // Gamla versioner skrev bara "sedd" (och sänkte den); hi läses som det större av dem.
      const hi=Math.max(m.hi||0,m.sedd||0);
      if(s>hi){const n=(s-hi)*20;m.m+=n;m.tj+=n;m.hi=s;myntSpara(m);myntVisa(n);}
      else if(m.hi!==hi){m.hi=hi;myntSpara(m);}
    }
    // spärr mot orimliga summor (t.ex. efter felet ovan, som gav tusentals per minut): tak = 25 per stjärna + 3000 per spelad dag + 2000, så högt att riktigt spelande aldrig når det. Det som redan är köpt dras av.
    try{const dg=get('matteportalen-dagar'),dagar=(dg&&dg.days&&dg.days.length)||1,tak=25*MPStjarnor()+3000*dagar+2000;
      if(m.tj>tak){const spent=Math.max(0,m.tj-m.m);m.tj=tak;m.m=Math.max(0,tak-spent);myntSpara(m);}}catch(e){}
    return m;}
  function myntSpara(m){try{localStorage.setItem(MK,JSON.stringify(m));}catch(e){}}
  let myntFlyg=null;function myntVisa(n){if(!n)return;myntFlyg=n;setTimeout(()=>{const el=document.querySelector('.mph-m');if(!el)return;
    el.textContent=myntLas().m;const f=document.createElement('span');f.className='mph-plus';f.textContent='+'+n+' 🪙';el.parentNode.appendChild(f);setTimeout(()=>f.remove(),1600);},80);}
  window.MPMynt={
    get(){return myntLas();},
    // en avklarad runda (anropas av huvud.js när skärmen "result" visas, eller av en sida själv)
    runda(n){const m=myntLas(),nu=Date.now();if(nu-(m.senast||0)<15000)return 0;let f=n==null?6:n;if(m.dag!==idag()){f+=10;m.dag=idag();}
      m.m+=f;m.tj+=f;m.senast=nu;myntSpara(m);myntVisa(f);window.MPKonto&&MPKonto.puffa();return f;},
    kop(id,pris){const m=myntLas();if(m.m<pris)return false;m.m-=pris;m.kopt=[...new Set([...(m.kopt||[]),id])];myntSpara(m);const el=document.querySelector('.mph-m');if(el)el.textContent=m.m;return true;},
    spara:myntSpara};
  function profilnamn(){try{const a=sessionStorage.getItem('mp-active');if(!a||a==='gast')return'';const p=(JSON.parse(localStorage.getItem('mp-profiles')||'[]')||[]).find(x=>x.id===a);return p?p.name:'';}catch(e){return''}}
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ---------- Sidhuvudet ---------- */
  const hem=ds.hem||'../',titel=ds.titel||'',ikon=ds.ikon||'';
  if(!document.getElementById('mph-css')){const st=document.createElement('style');st.id='mph-css';st.textContent=CSS;document.head.appendChild(st);}
  const h=document.createElement('header');h.className='mph'+(titel?' has-title':'')+(ds.liggande==='ja'?' liggande':'')+(PORTAL.id!=='matte'?' '+PORTAL.id:'');
  const pet=window.lasDjur&&window.owlSVG?owlSVG(lasDjur()):'',namn=profilnamn();
  const hemUrl=new URL(hem+(ds.start!=null?ds.start:DESIGN==='ny'?(EGENSIDA?'':NYMENY.find(p=>p.id===AMNE).href):PORTAL.href),location.href),paStart=hemUrl.pathname.replace(/index\.html$/,'')===location.pathname.replace(/index\.html$/,'');
  h.innerHTML=`${paStart?'':'<button class="mph-bk" aria-label="Tillbaka">←</button>'}<button class="mph-x" aria-label="Avsluta">✕</button>
    <span class="mph-logo"><a class="mph-home" href="${hem||'./'}" aria-label="Pluggparken, till startsidan">${LOGO_PP}<span class="t">Plugg<b>parken</b></span></a><button class="mph-burger" type="button" aria-label="Ämnen, öppna menyn" aria-haspopup="true" aria-expanded="false"><i style="font-style:normal">☰</i><em>Ämnen</em></button></span>
    <span class="mph-title">${titel?`<span class="mph-sep">›</span> ${ikon?ikon+' ':''}${esc(titel)}`:''}</span>
    <span class="mph-right"><a class="mph-pet" href="${hem}#garderob" aria-label="Ditt djur och dina stjärnor">${pet}${namn?`<span class="mph-name">${esc(namn)}</span>`:''}<span>⭐&nbsp;<span class="mph-n">${MPStjarnor()}</span></span><span class="mph-mynt">🪙&nbsp;<span class="mph-m">${myntLas().m}</span></span></a><button class="mph-sok" aria-label="Sök övning" title="Sök (tryck /)">🔍</button><button class="mph-snd" aria-label="Ljud av eller på"></button><button class="mph-tema" aria-label="Byt mellan ljust och mörkt läge"></button></span>`;
  document.body.prepend(h);
  // sökning: sok.js hämtas först när den behövs
  const rotUrl=new URL('.',(me&&me.src)||location.href).href;
  // stjärnlapp på varje kort som ger stjärnor: "⭐ 5 stjärnor" (grå "☆ 0 stjärnor" om inga än)
  const KNAPP={btnBub:'spel:bubbel',btnTower:'spel:tower',btnMem:'spel:mem',btnTug:'spel:tug',btnCar:'spel:car',btnFrog:'spel:frog'};
  const rotSti=new URL(rotUrl).pathname;
  function kortNyckel(el){if(el.id&&KNAPP[el.id])return KNAPP[el.id];const h=el.getAttribute('href');if(!h||/^(https?:)?\/\//.test(h)&&!h.startsWith(location.origin))return null;
    let p=new URL(h,location.href).pathname;if(!p.startsWith(rotSti))return null;p=p.slice(rotSti.length).replace(/index\.html$/,'').replace(/\/$/,'');
    if(p==='spel'||p.endsWith('/spel'))return'spelhornan';return p.split('/').pop()||null;}
  function stjLappar(){document.querySelectorAll('a.card,a.gamecard,button.gamecard').forEach(el=>{if(el.querySelector('.mph-stj'))return;
    const k=kortNyckel(el);if(!k)return;const n=stjFor(k);if(n==null)return;
    const t=el.querySelector('.txt')||el.querySelector('.tx')||[...el.children].find(c=>c.querySelector&&c.querySelector('b'));if(!t)return;
    const gammal=t.querySelector('.badge');if(gammal&&(gammal.hidden||/^⭐/.test(gammal.textContent.trim())))gammal.hidden=true;
    const c=document.createElement('span');c.className='mph-stj'+(n?'':' noll');c.textContent=n?`⭐ ${n} ${n===1?'stjärna':'stjärnor'}`:'☆ 0 stjärnor';
    c.setAttribute('aria-label',`${n} ${n===1?'stjärna':'stjärnor'} i den här övningen`);t.appendChild(c);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',stjLappar);else setTimeout(stjLappar,0);
  // konton i molnet: konto.js laddas bara om profilen på enheten har ett konto
  try{const ow=localStorage.getItem('mp-owner'),ps=JSON.parse(localStorage.getItem('mp-profiles')||'[]'),p=ow&&ps.find(x=>x.id===ow);
    if(p&&p.konto&&!window.MPKonto){const k=document.createElement('script');k.src=rotUrl+'konto.js?v=1';document.head.appendChild(k);}}catch(e){}
  window.MPSokOpen=function(){
    if(window.MPSok)return MPSok.open();
    const sc=document.createElement('script');sc.src=rotUrl+'sok.js?v=1';sc.onload=()=>MPSok.open();document.head.appendChild(sc);};
  h.querySelector('.mph-sok').onclick=()=>MPSokOpen();
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sok]');if(t){e.preventDefault();MPSokOpen();}});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey){const a=document.activeElement,tag=a&&a.tagName;if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'||(a&&a.isContentEditable))return;if(window.MPSok&&document.querySelector('.sok-ov'))return;e.preventDefault();MPSokOpen();}});
  const snd=h.querySelector('.mph-snd'),label=()=>{snd.textContent=window.Ljud&&!Ljud.on?'🔇':'🔊';};label();
  snd.onclick=()=>{if(!window.Ljud)return;Ljud.set(!Ljud.on);label();if(Ljud.on&&Ljud.ok)Ljud.ok();document.dispatchEvent(new Event('mp-ljud'));};
  document.addEventListener('mp-ljud-andrat',label);
  const tm=h.querySelector('.mph-tema'),tlabel=()=>{const m=window.MPTema&&MPTema.get()==='mork';tm.textContent=m?'☀️':'🌙';tm.title=m?'Byt till ljust läge':'Byt till mörkt läge';};
  if(window.MPTema){tlabel();tm.onclick=()=>{MPTema.toggle();tlabel();};document.addEventListener('mp-tema',tlabel);}else tm.remove();
  h.querySelector('.mph-x').onclick=()=>history.back();
  // tillbaka: inne i sidan ett steg bakåt (sidans egna knappar trycks via historiken), annars dit man kom ifrån
  const bk=h.querySelector('.mph-bk');
  // lämna sidan: till föregående sida om man kom från en annan sida här, annars till ämnets/startsidan
  function lamna(){
    let fran=null;try{fran=document.referrer?new URL(document.referrer):null;}catch(e){}
    // ämnessidans ←: upp till första sidan (bakåt i historiken bara om man kom därifrån, annars byt ut sidan så att ← inte hoppar fram och tillbaka)
    if(DESIGN==='ny'&&EGENSIDA){if(fran&&fran.origin===location.origin&&fran.pathname===hemUrl.pathname)history.back();else location.replace(hemUrl.href);return;}
    if(fran&&fran.origin===location.origin&&fran.pathname!==location.pathname)history.back();else location.replace(hemUrl.href);}
  window.__mpsLamna=lamna;
  if(bk)bk.onclick=()=>{if(navOn&&cur.i>0){history.back();return;}lamna();};
  // menyn bakom loggan
  const ptl=h.querySelector('.mph-burger');let meny=null;
  const stang=()=>{if(meny){meny.remove();meny=null;ptl.setAttribute('aria-expanded','false');}};
  ptl.onclick=e=>{e.stopPropagation();if(meny)return stang();
    meny=document.createElement('nav');meny.className='mph-menu';meny.setAttribute('aria-label','Meny');
    meny.innerHTML=MENY.map(p=>`<a href="${hem}${p.href}"${p===MENYNU?' aria-current="true"':''}>${p.logo}<span>${p.namn}<small>${p.sub}</small></span></a>`).join('')
    meny.innerHTML+=`<a href="https://fritidsparken.se" target="_blank" rel="noopener" class="mph-vann"><img class="mph-mark" src="${hem}fritidsparken-logo.jpg" alt="" width="30" height="30"><span>Fritidsparken.se<small>Våra vänner: lek och aktiviteter</small></span></a>`;

    {const sk=document.createElement('button');sk.className='mph-mt';sk.type='button';sk.innerHTML='<span>🔍</span><span>Sök övning</span>';sk.onclick=e=>{e.stopPropagation();stang();MPSokOpen();};meny.appendChild(sk);}
    if(window.MPTema){const mt=document.createElement('button');mt.className='mph-mt';mt.type='button';const ml=()=>{mt.innerHTML=MPTema.get()==='mork'?'<span>☀️</span><span>Ljust läge</span>':'<span>🌙</span><span>Mörkt läge</span>';};ml();mt.onclick=e=>{e.stopPropagation();MPTema.toggle();ml();};meny.appendChild(mt);}
    h.appendChild(meny);ptl.setAttribute('aria-expanded','true');meny.querySelector('a').focus({preventScroll:true});};
  document.addEventListener('click',e=>{if(meny&&!meny.contains(e.target))stang();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')stang();});
  // stjärnorna uppdateras när något sparas (i den här fliken eller en annan)
  let tmr=0;const upd=()=>{clearTimeout(tmr);tmr=setTimeout(()=>{h.querySelector('.mph-n').textContent=MPStjarnor();h.querySelector('.mph-m').textContent=myntLas().m;},60);};
  try{const orig=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){orig.call(this,k,v);if(this===window.localStorage&&/^(mattespel-|np3)/.test(k))upd();};}catch(e){}
  window.addEventListener('storage',upd);
  window.addEventListener('pageshow',()=>{upd();label();});

  /* ---------- Bakåtknappen ---------- */
  const helskarm=(ds.helskarm||'').split(/\s+/).filter(Boolean);
  const djup=id=>id==='home'||id==='menu'||id==='start'?0:['game','result','mem','bub','win','tug','paint','pbplay','tid','fragor','klar'].includes(id)?2:1;
  const BACK=['#quit','[data-home]','#toolBack','#rModes','#rHome','#rChoose','#backMenu','#memQuit','#bubQuit','#wHome','#tugQuit','#tugBack','.back:not(a)'];
  const navOn=ds.nav!=='av';
  let cur={mp:'home',d:0,i:0},st=[0],ign=0,fix=null,popping=false;
  if(navOn)history.replaceState(cur,'');
  /* Zoomskydd (iPad): på spelskärmar går det inte att nypa in bilden av misstag, och är den redan inzoomad finns knappen "Zooma ut" */
  const vm=document.querySelector('meta[name="viewport"]'),vmOrig=vm&&vm.content;let zoomLas=false,zbtn=null;
  const skala=()=>(window.visualViewport&&visualViewport.scale)||1;
  function zoomaUt(){if(!vm)return;vm.content='width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover';setTimeout(()=>{vm.content=vmOrig;zoomKnapp();},250);}
  function zoomKnapp(){const visa=zoomLas&&skala()>1.03;if(visa&&!zbtn){zbtn=document.createElement('button');zbtn.className='mph-zoomut';zbtn.textContent='🔍 Zooma ut';zbtn.onclick=zoomaUt;document.body.appendChild(zbtn);}else if(!visa&&zbtn){zbtn.remove();zbtn=null;}}
  function zoomSkydd(på){zoomLas=!!på;document.documentElement.classList.toggle('mph-nozoom',zoomLas);if(zoomLas&&skala()>1.03)zoomaUt();zoomKnapp();}
  ['gesturestart','gesturechange','gestureend'].forEach(t=>document.addEventListener(t,e=>{if(zoomLas)e.preventDefault();},{passive:false}));
  document.addEventListener('touchmove',e=>{if(zoomLas&&e.touches.length>1)e.preventDefault();},{passive:false});
  if(window.visualViewport)visualViewport.addEventListener('resize',zoomKnapp);
  const spelSida=/\/(spel|rutjakten)(\/|$)/.test(location.pathname); // Spelhörnan och spelen i den: zoomskydd på alla skärmar
  zoomSkydd(spelSida);
  function mode(id){zoomSkydd(spelSida||djup(id)===2||helskarm.includes(id));const full=helskarm.includes(id);h.classList.toggle('dold',full);h.classList.toggle('mini',id==='game'&&!full);document.body.classList.toggle('mph-mini',id==='game'&&!full);}
  function tryckTillbaka(){
    const sc=document.getElementById(cur.mp);if(!sc)return false;
    for(const sel of BACK){const b=sc.querySelector(sel);if(b){b.click();return true;}}
    return false;
  }
  window.MPS={
    huvud:h,
    /* Direktlänk (t.ex. från Verktygslådan): skärmen id blir sidans första steg, så att bakåt lämnar sidan
       i stället för att landa på sidans egen startskärm. Anropas före show(id). */
    start(id){if(!navOn)return;const d=djup(id);cur={mp:id,d,i:0};st=[d];history.replaceState(cur,'');},
    visa(id){
      mode(id);if(id==='result')MPMynt.runda();if(!navOn)return;
      const d=djup(id);
      if(popping){cur={mp:id,d,i:cur.i};return;}
      if(d>cur.d){cur={mp:id,d,i:cur.i+1};st.length=cur.i;st.push(d);history.pushState(cur,'');}
      else if(d===cur.d){cur={mp:id,d,i:cur.i};history.replaceState(cur,'');}
      else{
        // sidans egen tillbaka-knapp: gå bakåt i historiken till steget med rätt nivå
        let j=cur.i-1;while(j>0&&st[j]>d)j--;if(j<0)j=0;
        const steps=cur.i-j;cur={mp:id,d,i:j};st.length=j+1;st[j]=d;
        if(steps>0){fix=cur;ign++;history.go(-steps);}else history.replaceState(cur,'');
      }
    }
  };
  if(navOn)window.addEventListener('popstate',e=>{
    const s=e.state;if(!s||s.mp==null)return;
    if(ign){ign--;if(fix)history.replaceState(fix,'');fix=null;return;}
    if(s.i>cur.i){ign++;fix=cur;history.go(cur.i-s.i);return;} // framåt går inte: stanna kvar
    // bakåt: tryck på skärmens egen tillbaka-knapp tills vi är på rätt nivå
    popping=true;let bytt=false;
    for(let k=0;k<4&&cur.d>s.d;k++){const was=cur.mp;if(!tryckTillbaka()||cur.mp===was)break;bytt=true;}
    popping=false;const kvar=!bytt&&cur.d>s.d;
    st.length=s.i+1;st[s.i]=cur.d;cur={mp:cur.mp,d:cur.d,i:s.i};history.replaceState(cur,'');
    if(kvar)lamna();   // skärmen har ingen egen tillbaka-knapp: lämna sidan med det här trycket i stället för att ingenting händer
  });
})();
