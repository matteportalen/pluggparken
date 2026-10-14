// Smakprofil: lärarens 👍/👎. Sparas i specialare/smak.json och används av hamta.js för att sortera förslagen.
// Kör:  node specialare/skript/smak.js '<JSON från "Kopiera mina betyg">'
const fs=require("fs"),path=require("path");
const fil=path.join(__dirname,"../smak.json");
function las(){try{return JSON.parse(fs.readFileSync(fil,"utf8"))}catch(e){return{betyg:[]}}}
function lagg(lista){const d=las();for(const b of lista){const i=d.betyg.findIndex(x=>x.id===b.id);if(i>=0)d.betyg[i]=Object.assign(d.betyg[i],b);else d.betyg.push(b)}
  fs.writeFileSync(fil,JSON.stringify(d,null,1));return d}
// poäng per ord och per kanal/ämne: +1 för 👍, −1 för 👎
function profil(){const d=las(),ord={},kan={};
  for(const b of d.betyg){const v=b.v;if(b.kanal)kan[b.kanal]=(kan[b.kanal]||0)+v;if(b.kat)kan[b.kat]=(kan[b.kat]||0)+v;
    for(const w of (b.titel||"").toLowerCase().match(/[a-zåäö]{4,}/g)||[])ord[w]=(ord[w]||0)+v}
  return{ord,kan,nej:new Set(d.betyg.filter(b=>b.v<0).map(b=>b.id)),ant:d.betyg.length}}
function poang(p,x){let s=(p.kan[x.kanal]||0)*2;for(const w of x.titel.toLowerCase().match(/[a-zåäö]{4,}/g)||[])s+=p.ord[w]||0;return s}
module.exports={las,lagg,profil,poang};
if(require.main===module){const l=JSON.parse(process.argv[2]);const d=lagg(l);const p=profil();console.log(d.betyg.length,"betyg sparade");
  console.log("Bäst:",Object.entries(p.kan).sort((a,b)=>b[1]-a[1]).slice(0,6).join(" | "));console.log("Sämst:",Object.entries(p.kan).sort((a,b)=>a[1]-b[1]).slice(0,6).join(" | "))}
