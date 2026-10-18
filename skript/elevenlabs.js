#!/usr/bin/env node
/* Genererar berättarröst direkt mot ElevenLabs API (inga Claude-tokens går åt per replik).
   Användning:
     node skript/elevenlabs.js manus/titanic-manus.txt ljud/titanic            (hoppar över filer som redan finns)
     node skript/elevenlabs.js manus/titanic-manus.txt ljud/titanic --om s3-2   (gör om bara en eller flera, t.ex. --om s3-2 s5-1)
     node skript/elevenlabs.js manus/titanic-manus.txt ljud/titanic --torrt     (visar bara vad som skulle göras)
   Manusfilen har rader som "s3-2   Texten som ska läsas." (filnamnet blir s3-2.mp3).
   Nyckeln läses ur miljövariabeln ELEVENLABS_API_KEY eller filen .env.local i repots rot (står i .gitignore, läggs aldrig på GitHub).
   Röst: Paul Axel (8vE32fWOR99kGIH4Vg1s), modell eleven_multilingual_v2, samma som alla filmer hittills. */
const fs=require("fs"),path=require("path");
const VOICE=process.env.ELEVEN_VOICE||"8vE32fWOR99kGIH4Vg1s",MODEL=process.env.ELEVEN_MODEL||"eleven_multilingual_v2";
const args=process.argv.slice(2),pos=args.filter(a=>!a.startsWith("--")&&!/^s\d+-\d+$/.test(a)),torrt=args.includes("--torrt");
const omIdx=args.indexOf("--om"),om=omIdx>=0?args.slice(omIdx+1).filter(a=>/^s\d+-\d+$/.test(a)):[];
if(pos.length<2){console.log("Användning: node skript/elevenlabs.js <manus.txt> <utmapp> [--om s3-2 …] [--torrt]");process.exit(1);}
const [manus,ut]=pos;
const manusText=fs.readFileSync(manus,"utf8"),vm=manusText.match(/^VOICE:\s*(\S+)/m),VOICE_ID=vm?vm[1]:VOICE;   /* en rad "VOICE: <id>" i manuset väljer röst för just den filmen */
function nyckel(){if(process.env.ELEVENLABS_API_KEY)return process.env.ELEVENLABS_API_KEY.trim();
  const f=path.join(__dirname,"..",".env.local");if(fs.existsSync(f)){const m=fs.readFileSync(f,"utf8").match(/^\s*ELEVENLABS_API_KEY\s*=\s*(.+?)\s*$/m);if(m)return m[1].replace(/^["']|["']$/g,"");}return null;}
const rader=manusText.split("\n").map(r=>r.match(/^(s\d+-\d+)(?:\.mp3)?\s+(.+)$/)).filter(Boolean).map(m=>({id:m[1],text:m[2].trim()}));
if(!rader.length){console.log("Hittade inga repliker i "+manus);process.exit(1);}
const att=rader.filter(r=>om.length?om.includes(r.id):!fs.existsSync(path.join(ut,r.id+".mp3")));
console.log(`${rader.length} repliker i manuset, ${att.length} att generera till ${ut}/`);
if(torrt||!att.length){att.forEach(r=>console.log("  "+r.id+": "+r.text));process.exit(0);}
const key=nyckel();if(!key){console.log("Ingen nyckel. Lägg ELEVENLABS_API_KEY=... i filen .env.local i repots rot (eller som miljövariabel).");process.exit(1);}
fs.mkdirSync(ut,{recursive:true});
const sov=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{let ok=0,fel=0;
  for(const r of att){
    for(let forsok=1;forsok<=4;forsok++){
      try{
        const res=await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,{method:"POST",headers:{"xi-api-key":key,"Content-Type":"application/json",Accept:"audio/mpeg"},body:JSON.stringify({text:r.text,model_id:MODEL})});
        if(res.status===429||res.status>=500){console.log(`  ${r.id}: ${res.status}, väntar och provar igen (${forsok}/4)`);await sov(4000*forsok);continue;}
        if(!res.ok){console.log(`  ${r.id}: FEL ${res.status} ${(await res.text()).slice(0,200)}`);fel++;break;}
        const buf=Buffer.from(await res.arrayBuffer());fs.writeFileSync(path.join(ut,r.id+".mp3"),buf);ok++;console.log(`  ${r.id}.mp3  ${(buf.length/1024).toFixed(0)} kB`);break;
      }catch(e){console.log(`  ${r.id}: ${e.message}`);await sov(2000);}
    }
    await sov(500);
  }
  console.log(`Klart: ${ok} skapade, ${fel} fel.`);
})();
