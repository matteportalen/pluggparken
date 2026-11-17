/* Svensk uppläsning av enstaka ord med riktig röst (Malin, ElevenLabs): MPOrd.tala(ord, reserv). Filer i ljud/ord/, karta.json kopplar ord (gemener) till filnamn.
   Saknas filen (t.ex. egna ord) anropas reserv (webbläsarens röst). Används av Högfrekventa ord. Nya ord: node skript/bygg-ord-ljud.js (se docs/svenska.md). */
(function(){
  const bas=document.currentScript.src.replace(/[^\/]*$/,"")+"ljud/ord/";let karta=null,a=null;
  fetch(bas+"karta.json").then(r=>r.json()).then(k=>{karta=k;}).catch(()=>{});
  function tyst(){try{if(a){a.pause();a=null;}}catch(e){}}
  function tala(t,reserv){tyst();const f=karta&&karta[String(t).toLowerCase().trim()];
    if(!f){return reserv?reserv():false;}
    try{a=new Audio(bas+f+".mp3");const p=a.play();if(p&&p.catch)p.catch(()=>{if(reserv)reserv();});return true;}catch(e){return reserv?reserv():false;}}
  window.MPOrd={tala,tyst};
})();
