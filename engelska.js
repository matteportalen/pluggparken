/* Engelsk uppläsning med riktig röst (Philippa, ElevenLabs): MPEngelska.tala(text, reserv). Filerna ligger i ljud/engelska/ och hör ihop via karta.json (text i gemener -> filnamn).
   Saknas filen eller kartan används reservfunktionen (webbläsarens röst). Används av Engelska ord och Klockan på engelska. */
(function(){
  const bas=document.currentScript.src.replace(/[^\/]*$/,"")+"ljud/engelska/";let karta=null,a=null;
  const lovad=fetch(bas+"karta.json").then(r=>r.json()).then(k=>{karta=k;}).catch(()=>{});
  function tyst(){try{if(a){a.pause();a=null;}}catch(e){}}
  function tala(t,reserv){tyst();const f=karta&&karta[String(t).toLowerCase().trim()];
    if(!f){if(reserv)reserv();return;}
    try{a=new Audio(bas+f+".mp3");const p=a.play();if(p&&p.catch)p.catch(()=>{if(reserv)reserv();});}catch(e){if(reserv)reserv();}}
  window.MPEngelska={tala,tyst,klar:lovad};
})();
