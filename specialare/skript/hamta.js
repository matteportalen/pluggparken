// Hämtar förslag på klipp från godkända kanaler (öppna RSS-flöden, ingen nyckel).
// Kör:  node specialare/skript/hamta.js     → skriver specialare/klipp/forslag.json
// Sedan öppnar man specialare/klipp/granska.html (via en lokal webbserver), bockar i och klistrar in listan i chatten.
// Lägg till en kanal här genom att skriva en rad: [kanalens id (UC…), namn, språk]
const fs=require("fs"),path=require("path");
const KANALER=[
 ["UCRFIPG2u1DxKLNuE3y2SjHA","SciShow Kids","en"],
 ["UCXVCgDuD_QCkI7gTKU7-tpg","Nat Geo Kids","en"],
 ["UCbprhISv-0ReKPPyhf7-Dtw","Science Max","en"],
 ["UCeiYXex_fwgYDonaTcSIk6w","MinuteEarth","en"],
 ["UCUHW94eEFW7hkUMVaZz4eDg","minutephysics","en"],
 ["UCoxcjq-8xIDTYp3uz647V5A","Numberphile","en"],
 ["UC6E2mP01ZLH_kbAyeazCNdg","Brave Wilderness","en"],
 ["UCwmZiChSryoWQCZMIQezgTg","BBC Earth","en"],
 ["UCONtPx56PSebXJOxbFv-2jQ","Crash Course Kids","en"]];
const MAXSEK=8*60, MINSEK=45;
const get=async u=>{const r=await fetch(u,{headers:{"User-Agent":"Mozilla/5.0","Accept-Language":"sv"}});if(!r.ok)throw new Error(r.status);return r.text()};
const ent=s=>s.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">");
(async()=>{
  const ut=[];
  for(const [cid,namn,sprak] of KANALER){
    let f;try{f=await get("https://www.youtube.com/feeds/videos.xml?channel_id="+cid)}catch(e){console.log("hoppar över",namn,e.message);continue}
    const poster=[...f.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(m=>m[1]);
    for(const p of poster){
      const id=(p.match(/<yt:videoId>(.*?)</)||[])[1],titel=ent((p.match(/<title>(.*?)</)||[])[1]||""),lank=(p.match(/<link rel="alternate" href="(.*?)"/)||[])[1]||"";
      if(!id||lank.includes("/shorts/")||/#shorts?\b/i.test(titel))continue;
      let sek=0,emb=false,fam=false;
      try{const w=await get("https://www.youtube.com/watch?v="+id);sek=+((w.match(/"lengthSeconds":"(\d+)"/)||[])[1]||0);emb=/"playableInEmbed":true/.test(w);fam=/"isFamilySafe":true/.test(w);}catch(e){continue}
      if(!emb||!fam||sek>MAXSEK||sek<MINSEK)continue;
      ut.push({id,titel,kanal:namn,sprak,sek,datum:(p.match(/<published>(.*?)</)||[])[1].slice(0,10)});
    }
    console.log(namn,ut.filter(x=>x.kanal===namn).length,"förslag");
  }
  fs.writeFileSync(path.join(__dirname,"../klipp/forslag.json"),JSON.stringify(ut,null,1));
  console.log("Klart:",ut.length,"förslag → specialare/klipp/forslag.json");
})();
