/* Pluggparken: konton i molnet (Supabase, region Stockholm). Okt 2026.
   Ett konto hör till en profil på enheten (profilen i mp-profiles får konto:{namn,kod}). Kontot har ett påhittat namn
   ("katt-317") och en kod med sex siffror som servern väljer. Inga riktiga namn eller e-post.
   Synken: startsidan hämtar, slår ihop och skriver (synka({skriv:true})); övriga sidor skickar bara upp
   (puffa(), efter en runda och när fliken göms). Sammanslagningen behåller det som kommit längst per övning,
   så inget kan försvinna. Databasen: supabase/konton.sql. Nyckeln nedan är den publika ("publishable"),
   gjord för att ligga i webbläsaren; tabellen går inte att läsa direkt, bara via funktionerna med rätt namn och kod. */
(function(){
if(window.MPKonto)return;
const ADR="https://tjbifeckuielfbbaoxnj.supabase.co",NYCKEL="sb_publishable_IRMsYh9XN-71eITjSOxFZg_mCqikRdt";
// alla nycklar som hör till en profil (profilbyte, flyttkod, inloggningskort och konton)
const PKEYS=["mattespel-meningsbyggaren-v1","mattespel-tiointe-v1","mattespel-sifferslottet-v1","mattespel-sagoriket-v1","mattespel-lasflyt-v1","mattespel-pengar-v1","mattespel-multiplikation-v1","matteportalen-rum","mattespel-division-v1","mattespel-klockan-v1","mattespel-tiotal-v1","mattespel-taluppfattning-v1","mattespel-lillaplus-v1",
  "mattespel-spel-v1","mattespel-geometri-v1","mattespel-brak-v1","mattespel-hundraruta-v1","mattespel-uppstallning-v1","np3-resultat","mattespel-skattjakten-v1","mattespel-sverigekartan-v1","mattespel-ordgomma-v1","mattespel-hogfrekventa-v1","mattespel-europa-v1","mattespel-varlden-v1","mattespel-talfoljd-v1","mattespel-rutjakten-v1","mattespel-brakbitar-v1","mattespel-kortdivision-v1","mattespel-vagen-v1","mattespel-gomda-v1","mattespel-kulbanan-v1","mattespel-affaren-v1","mattespel-rita-v1","mattespel-ordgatan-v1","mattespel-tangentbord-v1","mattespel-delaupp-v1","mattespel-matning-v1","mattespel-kodverkstan-v1","mattespel-schack-v1","mattespel-trerirad-v1","matteportalen-mynt","matteportalen-uggla","matteportalen-klister","matteportalen-dagar"];
const lsGet=k=>{try{return localStorage.getItem(k)}catch(e){return null}},lsSet=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const jGet=k=>{try{return JSON.parse(lsGet(k)||"null")}catch(e){return null}};

// Sammanslagning: för varje övning behålls den version som kommit längst, så att kort och konton aldrig tar bort framsteg.
function progressOf(v){try{const o=JSON.parse(v);let n=0;const walk=x=>{if(typeof x==="number")n+=x;else if(x&&typeof x==="object")Object.values(x).forEach(walk);};
  walk(o.stars||{});walk(o.fly||{});walk(o.mem||{});walk(o.car||{});walk(o.space||{});walk(o.frog||{});walk(o.tower||{});walk(o.skatt||{});walk(o.kiosk||{});
  n+=Object.keys(o.facts||{}).length+(o.days||[]).length+(o.seen||[]).length+(Array.isArray(o)?o.length:0)+Object.keys(o.race||{}).length+Object.keys(o.blitz||{}).length;return n;}catch(e){return 0;}}
function merge(a,b){const out=Object.assign({},a);
  Object.keys(b||{}).forEach(k=>{if(!(k in a)){out[k]=b[k];return;}
    if(k==="matteportalen-dagar"||k==="matteportalen-klister"){try{const x=JSON.parse(a[k]),y=JSON.parse(b[k]),f=k==="matteportalen-dagar"?"days":"seen";
      x[f]=[...new Set([...(x[f]||[]),...(y[f]||[])])].sort();out[k]=JSON.stringify(x);}catch(e){}return;}
    // Läsflyt: läsningarna läggs ihop (inget försvinner), bokstäverna: senaste markeringen vinner
    if(k==="mattespel-lasflyt-v1"){try{const x=JSON.parse(a[k]),y=JSON.parse(b[k]),o=Object.assign({},x);
      o.las={...(x.las||{})};Object.entries(y.las||{}).forEach(([id,r])=>{const m=new Map([...(o.las[id]||[]),...r].map(e=>[e.d,e]));o.las[id]=[...m.values()].sort((p,q)=>p.d-q.d).slice(-20);});
      ["stars","pass"].forEach(f=>{o[f]={...(x[f]||{})};Object.entries(y[f]||{}).forEach(([n,v])=>{o[f][n]=Math.max(o[f][n]||0,v);});});
      o.bokst={...(x.bokst||{})};Object.entries(y.bokst||{}).forEach(([bk,v])=>{if(!o.bokst[bk]||(v.d||0)>(o.bokst[bk].d||0))o.bokst[bk]=v;});
      o.fr={...(y.fr||{}),...(x.fr||{})};out[k]=JSON.stringify(o);}catch(e){}return;}
    if(k==="matteportalen-mynt"){try{const x=JSON.parse(a[k]),y=JSON.parse(b[k]),o=(y.tj||0)>(x.tj||0)?y:x;
      o.kopt=[...new Set([...(x.kopt||[]),...(y.kopt||[])])];o.hi=Math.max(x.hi||0,x.sedd||0,y.hi||0,y.sedd||0);out[k]=JSON.stringify(o);}catch(e){}return;}
    if(progressOf(b[k])>progressOf(a[k]))out[k]=b[k];});
  return out;}

const snap=()=>{const o={};PKEYS.forEach(k=>{const v=lsGet(k);if(v!=null)o[k]=v;});return o;};
// håll kontot under serverns gräns: kortare historik om det behövs
function krymp(d){let s=JSON.stringify(d);if(s.length<250000)return d;const o={};
  Object.keys(d).forEach(k=>{try{const x=JSON.parse(d[k]);if(x&&x.facts)Object.keys(x.facts).forEach(f=>{if(Array.isArray(x.facts[f]))x.facts[f]=x.facts[f].slice(-3);});
    if(x&&Array.isArray(x.days))x.days=x.days.slice(-40);o[k]=JSON.stringify(x);}catch(e){o[k]=d[k];}});
  // fortfarande för stort: Kodverkstans projekt (kan ha egna bilder) stannar på enheten, stjärnorna följer med
  if(JSON.stringify(o).length>=250000&&o["mattespel-kodverkstan-v1"]){try{const x=JSON.parse(o["mattespel-kodverkstan-v1"]);o["mattespel-kodverkstan-v1"]=JSON.stringify({stars:x.stars||{}});}catch(e){}}
  return o;}
const profiler=()=>jGet("mp-profiles")||[];
const minProfil=()=>{const id=lsGet("mp-owner");return id?profiler().find(p=>p.id===id)||null:null;};
const paket=(p,d)=>({v:1,n:p.name,h:p.pinH,s:p.salt,d:krymp(d)});

async function rpc(fn,args,keep){const r=await fetch(ADR+"/rest/v1/rpc/"+fn,{method:"POST",keepalive:!!keep,
    headers:{apikey:NYCKEL,"Content-Type":"application/json"},body:JSON.stringify(args)});
  if(!r.ok)throw new Error("natet");return r.json();}

let pagar=null;
// hämta, slå ihop och skicka tillbaka. skriv = lägg också in det sammanslagna på enheten (bara startsidan)
async function synka(o={}){const p=minProfil();if(!p||!p.konto)return{ingen:true};
  if(pagar)return pagar;
  pagar=(async()=>{try{
    const r=await rpc("pp_hamta",{p_namn:p.konto.namn,p_kod:p.konto.kod});if(r.fel)return{fel:r.fel};
    const fj=(r.data&&r.data.d)||{},ihop=merge(snap(),fj);let andrad=false;
    if(o.skriv)Object.keys(ihop).forEach(k=>{if(lsGet(k)!==ihop[k]){lsSet(k,ihop[k]);andrad=true;}});
    if(JSON.stringify(fj)!==JSON.stringify(ihop)){const s=await rpc("pp_spara",{p_namn:p.konto.namn,p_kod:p.konto.kod,p_data:paket(p,ihop)},o.keep);if(s.fel)return{fel:s.fel};}
    lsSet("mp-konto-senast",String(Date.now()));return{ok:true,andrad};
  }catch(e){return{fel:"natet"};}finally{pagar=null;}})();
  return pagar;}
let tid=0;
const puffa=()=>{if(!minProfil()?.konto)return;clearTimeout(tid);tid=setTimeout(()=>synka(),1200);};
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"&&minProfil()?.konto)synka({keep:true});});

window.MPKonto={PKEYS,merge,progressOf,snap,paket,minProfil,synka,puffa,
  skapa:p=>rpc("pp_skapa",{p_data:paket(p,snap())}),
  skapaMed:(p,d)=>rpc("pp_skapa",{p_data:paket(p,d)}),
  hamta:(n,k)=>rpc("pp_hamta",{p_namn:String(n).trim().toLowerCase(),p_kod:String(k).trim()}),
  radera:(n,k)=>rpc("pp_radera",{p_namn:n,p_kod:k}),
  senast:()=>+(lsGet("mp-konto-senast")||0)};
})();
