/* Bygger delar.js: vilka delar (nivåer, områden, chattar) varje övning har, för Uppdrag till klassen (uppdrag/).
   Kör från repots rot med en webbserver igång:  python3 -m http.server 8765 &  node skript/bygg-delar.js
   Skriptet öppnar varje övning i sökningens lista (sok.js) i en tom webbläsare och läser startknapparna på första skärmen:
   [data-l] = nivå, [data-a] = område, [data-c] = chatt. Låsta (disabled) knappar tas inte med.
   huvud.js trycker på samma knapp när adressen har ?del=a:kroppar. Kräver Playwright. */
const fs=require('fs'),path=require('path'),{chromium}=require('playwright');
const ROT=path.join(__dirname,'..'),BAS=process.env.BAS||'http://localhost:8765/';
const sok=fs.readFileSync(path.join(ROT,'sok.js'),'utf8');
const adresser=[...new Set([...sok.matchAll(/^\s*\['([a-z0-9-]+\/)'/gm)].map(m=>m[1]))].filter(u=>!/^(larare|skriv-ut|uppdrag|specialare)\//.test(u));
(async()=>{const b=await chromium.launch();const ut={};
  for(const u of adresser){const c=await b.newContext({viewport:{width:1280,height:900}});const p=await c.newPage();
    try{await p.goto(BAS+u,{waitUntil:'load',timeout:20000});await p.waitForTimeout(600);
      const d=await p.evaluate(()=>{const scr=[...document.querySelectorAll('.screen')].find(s=>!s.hidden)||document.querySelector('main')||document.body;
        const ren=t=>(t||'').replace(/\s+/g,' ').replace(/[★☆]/g,'').trim();
        const res=[];scr.querySelectorAll('[data-l],[data-a],[data-c]').forEach(el=>{if(el.offsetParent===null||el.disabled||!/^(BUTTON|A)$/.test(el.tagName))return;
          const k=el.hasAttribute('data-l')?'l':el.hasAttribute('data-a')?'a':'c',v=el.getAttribute('data-'+k);if(!/^[\w-]{1,30}$/.test(v))return;
          const nb=el.querySelector('b,strong,h3'),sm=el.querySelector('small');
          let txt=ren(sm?sm.innerText:'').slice(0,90),namn=ren(nb?nb.innerText:el.innerText);
          if(!nb&&txt)namn=ren(namn.replace(txt,''));            // knapp utan rubrik: texten minus den lilla raden
          if(!/[a-zåäöA-ZÅÄÖ]/.test(namn)){namn=txt;txt='';}   // rubriken är bara ett exempel (42): använd den lilla raden
          namn=namn.slice(0,60);
          if(k==='c')txt='';                                     // chattens förhandsvisning slumpas, ta inte med den
          if(namn&&!res.some(r=>r[0]===k+':'+v))res.push([k+':'+v,namn,txt]);});return res;});
      if(d.length>=2){ut[u]=d;console.log(u,d.length);}
    }catch(e){console.log(u,'FEL',e.message.split('\n')[0]);}
    await c.close();}
  await b.close();
  const js='/* Byggd av skript/bygg-delar.js. Ändra inte för hand: kör skriptet igen när en övning får nya nivåer eller delar.\n   [del, namn, kort text]; del = l:nivå, a:område eller c:chatt (huvud.js trycker på knappen [data-l|a|c]). */\nwindow.MPDelar='+JSON.stringify(ut,null,0).replace(/\],"/g,'],\n"')+';\n';
  fs.writeFileSync(path.join(ROT,'delar.js'),js);console.log('delar.js:',Object.keys(ut).length,'övningar');})();
