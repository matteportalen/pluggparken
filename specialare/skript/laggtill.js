// Lägger till godkända klipp i specialare/klipp.js och hämtar deras bilder.
// Kör:  node specialare/skript/laggtill.js '<JSON-listan från granska.html>'
const fs=require("fs"),path=require("path");
const lista=JSON.parse(process.argv[2]);
const fil=path.join(__dirname,"../klipp.js");
let t=fs.readFileSync(fil,"utf8");
const nu=JSON.parse(t.slice(t.indexOf("["),t.lastIndexOf("]")+1));
(async()=>{
 for(const k of lista){
  if(nu.some(x=>x.id===k.id))continue;
  const r=await fetch(`https://i.ytimg.com/vi/${k.id}/mqdefault.jpg`);
  fs.writeFileSync(path.join(__dirname,`../klipp/bilder/${k.id}.jpg`),Buffer.from(await r.arrayBuffer()));
  nu.push({id:k.id,titel:k.titel,sprak:k.sprak||"en",kanal:k.kanal,sek:k.sek});
 }
 fs.writeFileSync(fil,t.slice(0,t.indexOf("var KLIPP="))+"var KLIPP="+JSON.stringify(nu,null,1)+";\n");
 console.log("Nu",nu.length,"klipp");
})();
