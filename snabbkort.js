/* Snabbkort (MPSnabbkort), delas av Lilla plus & minus och Tiotalsövergång.
   Uppgiften blinkar fram 1, 2 eller 3 sekunder, klassen säger tal och svar, Visa svaret, Nästa.
   Tio kort per runda. Ingen inmatning, inga stjärnor. Helskärm och mellanslag/Enter/→/PageDown för helklass.
   Sidan har klasserna .gtop, .back, .gright, .info och .go, och färgvariablerna --card, --line, --good, --accent, --sun, --muted, --bg.

   MPSnabbkort.skapa(sektion,{
     nasta: () => ({q:'6 + 3', a:9}),   // nästa uppgift (sidan undviker själv upprepningar)
     tid: () => 2000, satTid: ms => {},  // sparad visningstid
     visa: () => {},                     // sidan visar sektionen (show('snabb'))
     avsluta: () => {},                  // tillbaka till sidans start
     fira: () => {}                      // konfetti efter tio kort
   }) → {oppna()} */
(function(){
  var N=10;
  var CSS='.skort{position:relative;background:var(--card);border-radius:28px;box-shadow:0 6px 0 var(--line);min-height:clamp(240px,48vh,440px);display:grid;place-items:center;margin:14px 0 16px;overflow:hidden;text-align:center;padding:18px 14px;transition:background .2s}'+
  '.skort.svar{background:var(--ok-bg,#DDF5E7)}'+
  '.sktxt{font-size:clamp(3.6rem,17vw,7.5rem);font-weight:800;line-height:1;white-space:nowrap}'+
  '.sktxt b{color:var(--good)}.sktxt .skq{color:#C9D5EC}.sktxt .skti{font-size:.6em;color:var(--accent)}.sktxt .skic{font-size:.8em}'+
  '.sktxt small{display:block;font-size:1.15rem;font-weight:700;color:var(--muted);white-space:normal;line-height:1.35;margin-top:14px}'+
  '.sktimer{position:absolute;left:0;bottom:0;height:8px;width:0;background:var(--sun,#FFC93C)}'+
  '.skknappar{display:flex;gap:10px}.skknappar .go{flex:1;margin:0}'+
  '.skigen{flex:none;padding:0 16px;border-radius:18px;background:var(--card);box-shadow:0 5px 0 var(--line);font-weight:800;font-size:1.05rem}'+
  '.skigen:active,.sktid button:active,.skfull:active{transform:translateY(3px)}'+
  '.sklbl{margin:12px 0 6px;font-weight:700;color:var(--muted)}'+
  '.sktid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}'+
  '.sktid button{min-height:48px;border-radius:14px;background:var(--card);box-shadow:0 4px 0 var(--line);font-weight:800;font-size:1.2rem}'+
  '.sktid button[aria-pressed="true"]{background:var(--accent);color:#fff;box-shadow:0 4px 0 #2A3FC0}'+
  '.skfull{width:44px;height:44px;border-radius:12px;background:var(--card);box-shadow:0 3px 0 var(--line);font-size:1.3rem;margin-left:10px}'+
  '.skhint{text-align:center;color:var(--muted);font-size:.9rem;margin:14px 0 0}'+
  '@media (pointer:coarse){.skhint{display:none}}'+
  '.sksek:fullscreen{background:var(--bg);padding:2vh 4vw 3vh;display:flex;flex-direction:column;overflow:auto}'+
  '.sksek:fullscreen .skort{flex:1;min-height:0}'+
  '.sksek:fullscreen .sktxt{font-size:min(19vw,30vh)}'+
  '.sksek:fullscreen .sktxt small{font-size:min(3vw,4vh)}'+
  '.sksek:fullscreen .skset,.sksek:fullscreen .skknappar,.sksek:fullscreen .skhint{width:100%;max-width:760px;margin-inline:auto}'+
  '.sksek:fullscreen .go{font-size:1.8rem;padding:18px}';
  var HTML='<div class="gtop"><button class="back" data-sk="quit">← Avsluta</button><span class="gright"><span class="info" data-sk="info"></span><button class="skfull" data-sk="full" aria-label="Helskärm" title="Helskärm">⛶</button></span></div>'+
  '<div class="skset" data-sk="set"><p class="sklbl">Så länge syns kortet</p><div class="sktid" role="group" aria-label="Så länge syns kortet"><button data-sktid="1000">1 s</button><button data-sktid="2000">2 s</button><button data-sktid="3000">3 s</button></div></div>'+
  '<div class="skort" data-sk="kort"><div class="sktxt" data-sk="txt" aria-live="polite"></div><i class="sktimer" data-sk="timer"></i></div>'+
  '<div class="skknappar"><button class="skigen" data-sk="igen" hidden>👀 Visa igen</button><button class="go" data-sk="go">Starta</button></div>'+
  '<p class="skhint">Mellanslag, Enter eller → går vidare.</p>';

  function skapa(sek,o){
    if(!document.getElementById('mp-snabbkort-css')){var st=document.createElement('style');st.id='mp-snabbkort-css';st.textContent=CSS;document.head.appendChild(st);}
    sek.classList.add('sksek');sek.innerHTML=HTML;
    var el=function(k){return sek.querySelector('[data-sk="'+k+'"]');};
    var K=null;
    var tid=function(){var t=o.tid();return [1000,2000,3000].indexOf(t)>=0?t:2000;};
    /* långa uppgifter (56 − 9 = 47) krymps så att de får plats på kortet */
    var txt=function(h){var t=el('txt'),k=el('kort');t.innerHTML=h;t.style.fontSize='';
      var w=k.clientWidth-28;if(t.scrollWidth>w){var f=parseFloat(getComputedStyle(t).fontSize);t.style.fontSize=Math.floor(f*w/t.scrollWidth)+'px';}};
    var rensa=function(){if(K){K.timers.forEach(clearTimeout);K.timers=[];}};
    var sen=function(fn,ms){K.timers.push(setTimeout(fn,ms));};
    function timer(on){var t=el('timer');t.style.transition='none';t.style.width=on?'100%':'0';if(on){void t.offsetWidth;t.style.transition='width '+tid()+'ms linear';t.style.width='0';}}
    function ui(){
      var s=K.st,go=el('go');
      el('set').hidden=!(s==='start'||s==='klar');
      el('igen').hidden=s!=='dold';
      el('kort').classList.toggle('svar',s==='svar');
      el('info').textContent=s==='start'?'':'Kort '+Math.min(K.n,N)+' av '+N;
      go.textContent={start:'Starta',titta:'Titta!',visar:'Titta!',dold:'Visa svaret',svar:K.n>=N?'Klart':'Nästa ›',klar:'Tio kort till'}[s];
      go.disabled=s==='titta'||s==='visar';go.style.opacity=go.disabled?.55:'';
      sek.querySelectorAll('[data-sktid]').forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.sktid===tid());});
    }
    function startText(){var s=tid()/1000;txt('<span class="skic">🃏</span><small>Kortet syns i '+s+' '+(s===1?'sekund':'sekunder')+'. Säg vad det blev, sedan visar du svaret.</small>');}
    function blinka(igen){
      var visa=function(){K.st='visar';ui();txt(K.u.q);timer(true);
        sen(function(){K.st='dold';timer(false);txt('<span class="skq">?</span>');ui();},tid());};
      if(igen)return visa();
      K.st='titta';ui();txt('<span class="skti">Titta!</span>');sen(visa,650);
    }
    function nasta(){K.n++;K.u=o.nasta();blinka(false);}
    function fram(){if(!K)return;
      if(K.st==='start'||K.st==='klar'){K.n=0;return nasta();}
      if(K.st==='dold'){K.st='svar';txt(K.u.q+' = <b>'+K.u.a+'</b>');ui();return;}
      if(K.st==='svar'){if(K.n<N)return nasta();
        K.st='klar';txt('<span class="skic">🎉</span><small>Bra jobbat! '+N+' snabbkort klara.</small>');ui();if(o.fira)o.fira();}
    }
    var fs=function(){return document.fullscreenElement||document.webkitFullscreenElement;};
    var ut=function(){if(fs())(document.exitFullscreen||document.webkitExitFullscreen).call(document);};
    if(!(sek.requestFullscreen||sek.webkitRequestFullscreen))el('full').hidden=true;
    el('full').onclick=function(e){e.currentTarget.blur();if(fs())return ut();var r=sek.requestFullscreen||sek.webkitRequestFullscreen,p=r.call(sek);if(p&&p.catch)p.catch(function(){});};
    el('go').onclick=function(e){e.currentTarget.blur();fram();};
    el('igen').onclick=function(e){e.currentTarget.blur();if(K&&K.st==='dold')blinka(true);};
    sek.querySelectorAll('[data-sktid]').forEach(function(b){b.onclick=function(){o.satTid(+b.dataset.sktid);if(K&&K.st==='start')startText();if(K)ui();};});
    el('quit').onclick=function(){rensa();K=null;ut();o.avsluta();};
    document.addEventListener('keydown',function(e){
      if(sek.hidden||!K||e.altKey||e.ctrlKey||e.metaKey)return;
      if([' ','Enter','ArrowRight','PageDown'].indexOf(e.key)>=0){e.preventDefault();fram();}
    });
    return{oppna:function(){rensa();K={st:'start',n:0,u:null,timers:[]};startText();timer(false);ui();o.visa();}};
  }
  window.MPSnabbkort={skapa:skapa};
})();
