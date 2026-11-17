#!/usr/bin/env node
/* Enstaka ord låter ofta konstigt i ElevenLabs (rösten "håller andan", korta ord blir ett kort t).
   Lösning: rösten får säga "Ordet är: <ord>." och orden klipps ut med teckentider (with-timestamps), så att ordet får en naturlig melodi.
   Användning: node skript/ord-klipp.js <manus.txt med rader "sN-1   ord"> <utmapp> [--om s3-1 …]
   Röst: VOICE-raden i manuset. Nyckel som i elevenlabs.js. Kodas till mono-mp3 med lib/lamejs. */
const fs=require("fs"),path=require("path");
const lame=(()=>{const src=fs.readFileSync(path.join(__dirname,"..","lib","lamejs","lame.min.js"),"utf8");const m={exports:{}};new Function("module","exports","self",src+";if(typeof lamejs!=='undefined')module.exports=lamejs;")(m,m.exports,{});return m.exports;})();
const args=process.argv.slice(2),pos=args.filter(a=>!a.startsWith("--")&&!/^s\d+-\d+$/.test(a)),omI=args.indexOf("--om"),om=omI>=0?args.slice(omI+1).filter(a=>/^s\d+-\d+$/.test(a)):[];
const [manus,ut]=pos;const txt=fs.readFileSync(manus,"utf8"),vm=txt.match(/^VOICE:\s*(\S+)/m),VOICE=vm[1];
const key=(()=>{if(process.env.ELEVENLABS_API_KEY)return process.env.ELEVENLABS_API_KEY.trim();const m=fs.readFileSync(path.join(__dirname,"..",".env.local"),"utf8").match(/^\s*ELEVENLABS_API_KEY\s*=\s*(.+?)\s*$/m);return m[1].replace(/^["']|["']$/g,"");})();
const SET=process.env.ELEVEN_SETTINGS?JSON.parse(process.env.ELEVEN_SETTINGS):{stability:0.5,similarity_boost:0.75,speed:0.9};
const rader=txt.split("\n").map(r=>r.match(/^(s\d+-\d+)\s+(.+)$/)).filter(Boolean).map(m=>({id:m[1],ord:m[2].trim()}));
const att=rader.filter(r=>om.length?om.includes(r.id):!fs.existsSync(path.join(ut,r.id+".mp3")));
fs.mkdirSync(ut,{recursive:true});const sov=ms=>new Promise(r=>setTimeout(r,ms));
const SR=24000;
async function hamta(ord){const text="Ordet är: "+ord+".";
  for(let f=1;f<=4;f++){const res=await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=pcm_24000`,{method:"POST",headers:{"xi-api-key":key,"Content-Type":"application/json"},body:JSON.stringify({text,model_id:"eleven_multilingual_v2",voice_settings:SET})});
    if(res.status===429||res.status>=500){await sov(4000*f);continue;}if(!res.ok)throw new Error(res.status+" "+(await res.text()).slice(0,160));
    const d=await res.json();return{pcm:Buffer.from(d.audio_base64,"base64"),al:d.alignment,text};}
  throw new Error("gav upp");}
function klipp({pcm,al,text},ord){const ch=al.characters,s=al.character_start_times_seconds,e=al.character_end_times_seconds,a=text.length-ord.length-1;
  const t0=Math.max(0,s[a]-0.03),t1=Math.min(pcm.length/2/SR,e[a+ord.length-1]+0.12);
  const all=new Int16Array(pcm.buffer,pcm.byteOffset,pcm.length>>1),i0=Math.floor(t0*SR),i1=Math.floor(t1*SR),n=i1-i0,out=new Int16Array(n);
  const fi=Math.floor(.012*SR),fo=Math.floor(.06*SR);
  for(let i=0;i<n;i++){let v=all[i0+i];if(i<fi)v*=i/fi;if(n-i<fo)v*=(n-i)/fo;out[i]=v;}
  const enc=new lame.Mp3Encoder(1,SR,64),bufs=[];for(let i=0;i<n;i+=1152){const b=enc.encodeBuffer(out.subarray(i,i+1152));if(b.length)bufs.push(Buffer.from(b));}const f=enc.flush();if(f.length)bufs.push(Buffer.from(f));return Buffer.concat(bufs);}
(async()=>{console.log(att.length,"ord att göra");let ok=0;for(const r of att){try{const h=await hamta(r.ord);fs.writeFileSync(path.join(ut,r.id+".mp3"),klipp(h,r.ord));ok++;}catch(x){console.log(r.id,r.ord,"FEL",x.message);}await sov(300);}console.log("Klart:",ok);})();
