#!/usr/bin/env node
/* Bygger manus och karta för Högfrekventa ord: node skript/bygg-ord-ljud.js <mapp-för-manus>
   Skriver <mapp>/ord-manus.txt och ljud/ord/karta.json (ord -> filnamn). Generera sedan:
   ELEVEN_SETTINGS='{"stability":0.5,"similarity_boost":0.75,"speed":0.9}' node skript/elevenlabs.js <mapp>/ord-manus.txt ljud/ord */
const fs=require("fs");const h=fs.readFileSync("ovriga/hogfrekventa/index.html","utf8");
const a=h.indexOf("const PAKET=["),b=h.indexOf("const ALLA=");const m={};new Function("m",h.slice(a,b)+";m.P=PAKET;")(m);
const ord=[...new Set(m.P.flat())];const karta={};let man="VOICE: zyfJspwEDo0sxPeFmtsn\n";
ord.forEach((w,i)=>{karta[w]="s"+(i+1)+"-1";man+=`s${i+1}-1   ${w}\n`;});
fs.mkdirSync("ljud/ord",{recursive:true});fs.writeFileSync(process.argv[2]+"/ord-manus.txt",man);fs.writeFileSync("ljud/ord/karta.json",JSON.stringify(karta));
console.log(ord.length,"ord");
