/* Bygger om Specialares rader i sok.js (mellan LEKTIONER-START och LEKTIONER-SLUT).
   Kör: node skript/bygg-sok.js   (efter att en lektion eller prova-själv-sak lagts till i specialare/) */
const fs=require('fs'),path=require('path');
const rot=path.join(__dirname,'..');
global.window=global;
eval(fs.readFileSync(path.join(rot,'specialare/lektioner.js'),'utf8')+';global.__LEK=LEKTIONER;');
const rader=[];
for(const l of global.__LEK)rader.push(['specialare/#l/'+l.id,l.titel,'Minilektion · '+(l.kat||''),l.e||'🎁',(l.kat||'')+' lektion bildspel film mysterium','Specialare']);
const g=fs.readFileSync(path.join(rot,'specialare/grejer.js'),'utf8');
for(const m of g.matchAll(/GREJER\.push\(\{id:"([^"]+)",titel:"([^"]+)",kat:"([^"]*)",e:"([^"]*)"(?:[^}]*?beskr:"([^"]*)")?/g))
  rader.push(['specialare/#g/'+m[1],m[2],'Prova själv · '+(m[5]||m[3]),m[4]||'🧪',m[3]+' prova själv interaktiv','Specialare']);
const q=s=>JSON.stringify(s);
const kod='const LEK=[\n'+rader.map(r=>' '+q(r)).join(',\n')+'\n];';
const f=path.join(rot,'sok.js');let s=fs.readFileSync(f,'utf8');
s=s.replace(/\/\*LEKTIONER-START\*\/[\s\S]*?\/\*LEKTIONER-SLUT\*\//,'/*LEKTIONER-START*/\n'+kod+'\n/*LEKTIONER-SLUT*/');
fs.writeFileSync(f,s);
console.log(rader.length+' rader (Specialare) skrivna till sok.js');
