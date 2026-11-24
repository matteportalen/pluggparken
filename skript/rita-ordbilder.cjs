/* Pluggparkens egna ord- och sakbilder. Kör med node skript/rita-ordbilder.cjs.
   Befintliga motiv återanvänds från Diagramverkstans egna bildbibliotek, övriga ritas här. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'diagram/bilder.js'),'utf8'),ctx);
const D=ctx.window.DiagramBilder,ink='#34445B',cream='#FFF4DC',blue='#71B9D9',green='#79B785',red='#EB7974',gold='#F3C45D',purple='#AB95CB',brown='#AD7858';
const p=(d,f='none',extra='')=>`<path d="${d}" fill="${f}" ${extra}/>`;
const c=(x,y,r,f)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`;
const e=(x,y,rx,ry,f)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}"/>`;
const r=(x,y,w,h,f,rx=3)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}"/>`;
const eye=(x,y)=>c(x,y,1.3,ink),A={};
A.hatt=e(32,49,27,9,purple)+p('M17 48L18 12Q32 5 46 12L47 48Q32 56 17 48Z',ink)+p('M18 35Q32 41 46 35V44Q32 50 18 44Z',red);
A.dörr=r(13,4,38,56,brown,1)+r(18,9,28,51,'#DCAE7E',1)+r(22,14,20,18,cream,1)+r(22,39,20,15,'#EBC799',1)+c(40,35,2,gold);
A.hammare=p('M28 22L38 26L25 59Q20 62 16 56Z',brown)+p('M16 8L36 15L34 25L12 18Z','#A5B9C9')+p('M36 15Q48 12 58 23L50 23L46 29L33 25Z','#A5B9C9')+p('M17 9L14 18');
A.klubba=p('M29 35H35V59H29Z',cream)+c(32,23,20,red)+p('M32 9C49 9 50 34 32 36C15 38 12 16 28 14C39 12 44 28 34 30C25 33 20 21 29 20C34 19 36 24 32 25','none','stroke="#FFF4DC" stroke-width="4"');
A.mygga=e(27,26,9,19,'#DCEAF2')+e(43,25,9,19,'#DCEAF2')+p('M29 38L12 30L7 37M33 42L14 46L10 55M39 42L50 49L55 46')+e(34,36,5,14,brown)+c(36,22,6,brown)+p('M40 21L58 13')+eye(37,20);
A.igelkott=p('M8 43L4 32L13 30L9 18L21 23L23 10L32 19L40 10L44 23L55 21L53 37L58 45Z',brown)+e(30,43,24,13,'#DCAE7E')+p('M42 33Q51 33 60 46L46 52Z',cream)+c(60,45,2,ink)+eye(48,40)+e(18,55,5,3,brown)+e(40,55,5,3,brown);
A.gitarr=p('M34 28L45 6L52 10L40 32Z',brown)+p('M34 25Q43 25 43 34Q43 39 49 43Q56 56 40 60Q25 62 17 51Q11 39 22 36Q26 35 26 30Q27 24 34 25Z',gold)+c(32,41,7,brown)+p('M25 53L47 10M29 55L51 12','none','stroke="#FFF4DC" stroke-width="1"')+p('M20 48L34 56','none','stroke-width="4"')+p('M43 6L47 2L56 7L52 13Z',brown);
A.snögubbe=e(32,45,20,17,cream)+c(32,22,13,cream)+p('M17 12H47M23 11V3H40V11',ink)+p('M28 24L45 27L29 29Z',gold)+eye(27,20)+eye(36,20)+p('M21 34Q33 39 44 33L44 40L22 41Z',red)+r(36,37,7,16,red)+c(29,46,2,ink)+c(29,54,2,ink)+p('M13 43L3 33M51 43L61 31');
A.flagga=p('M13 59V5','none','stroke-width="3"')+p('M15 7Q27 1 36 8Q45 14 57 7V33Q45 40 35 33Q25 26 15 33Z',blue)+p('M28 5V30M15 19Q27 13 37 20Q47 26 57 19','none','stroke="#F3C45D" stroke-width="6"');
A.uggla=e(32,37,23,23,brown)+p('M11 25L9 6L28 19M36 19L55 6L53 25Z',brown)+e(18,42,8,15,'#D9AE83')+e(46,42,8,15,'#D9AE83')+c(23,28,10,cream)+c(41,28,10,cream)+c(23,28,4,ink)+c(41,28,4,ink)+p('M28 38L32 44L36 38Z',gold)+p('M24 58V62M40 58V62');
A.troll=p('M46 42Q62 35 59 53Q55 61 52 54',green)+p('M17 39Q8 37 6 48L15 51M47 39Q55 37 57 47L49 50',green)+r(17,34,30,25,brown,8)+e(23,59,9,4,green)+e(43,59,9,4,green)+p('M16 19L3 13L9 29L18 30M48 19L61 13L55 29L46 30Z',green)+e(32,24,18,19,green)+p('M15 17L13 4L23 9L29 2L35 9L45 3L48 18Z',brown)+eye(25,23)+eye(40,23)+e(32,30,7,5,'#A3CE90')+p('M26 39Q33 43 40 36')+p('M38 38V32L42 36Z',cream);
A.socka=p('M26 5H47V35Q49 45 38 49L20 59Q7 61 5 51Q4 45 13 41L26 33Z',red)+p('M26 5H47V14H26Z',cream)+p('M5 49Q17 44 20 59M36 36Q43 33 47 38');
A.jacka=p('M22 8L30 4H36L44 8L60 29L49 38L45 29V60H19V29L15 38L4 29Z',blue)+p('M22 8L32 20L44 8M32 20V60')+p('M23 7L21 16L28 22L32 20L36 22L45 16L42 7',cream)+r(22,37,7,10,'#A6D6E8',1)+r(36,37,7,10,'#A6D6E8',1)+p('M8 25L17 32M47 32L56 25');
A.klocka=c(32,34,23,blue)+c(32,34,18,cream)+p('M32 34V21M32 34L43 40','none','stroke-width="3"')+c(32,34,2,ink)+p('M12 13L8 8Q17 0 24 7L21 13Z',gold)+p('M43 13L40 7Q47 0 56 8L52 13Z',gold)+p('M18 53L13 61M46 53L51 61M32 12V15M32 53V56M10 34H13M51 34H54');
A.nyckel=c(22,22,16,gold)+c(22,22,7,cream)+p('M31 34L52 55L60 47L54 41L49 46L44 41L49 36L40 27Z',gold);
A.kock=p('M12 60V49Q16 39 32 39Q48 39 52 49V60Z',cream)+p('M32 40V60')+c(26,49,1,ink)+c(26,56,1,ink)+e(32,29,14,16,'#C98E68')+p('M17 20Q5 18 12 7Q17 0 25 7Q31 -1 39 6Q51 0 56 12Q59 20 47 22V25H17Z',cream)+r(18,20,28,6,cream,1)+eye(27,29)+eye(38,29)+p('M28 37Q32 40 36 37')+p('M26 42L32 48L38 42',red);
A.måne=p('M43 5C10 0 0 38 23 54Q40 66 58 45Q30 50 26 29Q24 13 43 5Z',gold)+c(15,31,2,'#D5A33F')+c(25,48,3,'#D5A33F')+c(12,40,1,'#D5A33F');
A.gris=e(31,36,22,17,'#EBA1A8')+p('M13 25L12 12L25 22M39 21L51 12L48 29Z','#EBA1A8')+r(16,47,8,12,'#EBA1A8')+r(38,47,8,12,'#EBA1A8')+e(31,37,12,8,'#D77F92')+eye(27,37)+eye(36,37)+eye(22,29)+eye(41,29)+p('M53 36Q63 28 59 23Q54 22 56 28Q61 32 63 25');
A.mus=p('M43 45Q63 47 59 59Q55 64 48 60','none','stroke="#D9909B" stroke-width="3"')+e(32,42,16,17,'#B5BEC9')+c(19,19,12,'#B5BEC9')+c(45,19,12,'#B5BEC9')+c(19,19,7,'#EAB0B5')+c(45,19,7,'#EAB0B5')+e(32,30,16,17,'#B5BEC9')+eye(26,28)+eye(38,28)+c(32,36,3,'#D9909B')+p('M22 36L7 33M22 40L8 43M42 36L57 33M42 40L56 43')+e(24,58,6,3,'#D9909B')+e(40,58,6,3,'#D9909B');
A.apa=p('M47 49Q63 57 60 39Q58 32 53 36','none','stroke="#AD7858" stroke-width="6"')+e(32,45,16,15,brown)+c(13,23,10,brown)+c(51,23,10,brown)+e(32,25,21,21,brown)+e(24,25,10,14,'#EDC89F')+e(40,25,10,14,'#EDC89F')+e(32,35,12,9,'#EDC89F')+eye(24,24)+eye(40,24)+p('M25 35Q32 43 39 35')+e(19,58,9,4,brown)+e(45,58,9,4,brown);
A.val=p('M5 38Q5 16 29 20Q44 22 48 39L52 30L61 28L58 40L49 45Q38 59 18 52Q5 49 5 38Z',blue)+p('M7 42Q25 51 42 43Q33 58 17 51Z',cream)+eye(17,34)+p('M23 39Q30 37 32 47Q24 48 23 39Z',blue)+p('M25 17V9M25 9Q18 1 16 8M25 9Q32 1 35 7','none','stroke="#71B9D9" stroke-width="3"');
A.myra=p('M24 31L8 23L3 30M27 39L9 42L6 53M36 40L50 43L55 54M38 31L53 23L61 30')+e(32,48,10,13,brown)+e(32,32,7,9,brown)+c(32,17,10,brown)+p('M26 10L20 3M38 10L44 3')+eye(28,16)+eye(36,16);
A.snigel=p('M5 51Q23 45 39 47L45 32L55 34L57 54Q34 63 6 58Z',green)+p('M47 34L45 21M54 35L59 22','none','stroke-width="3"')+c(45,20,3,cream)+c(59,21,3,cream)+eye(45,20)+eye(59,21)+c(25,35,20,gold)+p('M25 21C43 21 43 48 25 48C10 48 10 27 25 28C36 28 34 41 26 40C20 40 21 33 26 34');
A.tiger=c(16,15,9,gold)+c(48,15,9,gold)+e(32,35,25,24,gold)+e(32,44,15,11,cream)+eye(22,32)+eye(42,32)+p('M28 40L36 40L32 45Z',ink)+p('M32 45V49M24 49Q32 55 40 49')+p('M23 13L27 25L29 12M35 12L37 25L41 14M9 29L18 32L8 36M8 42L18 42L12 48M55 29L46 32L56 36M56 42L46 42L52 48',ink);
A.potatis=p('M11 25Q5 9 24 7Q42 1 53 17Q64 33 50 49Q42 62 22 57Q3 52 8 36Z','#D8AE76')+p('M17 19L20 21M37 13L39 15M46 29L49 31M17 40L20 42M36 46L39 48')+c(26,31,1.5,brown)+c(44,40,1.5,brown);
A.lök=p('M25 18L27 4L34 9L39 4L38 20Q62 35 53 50Q46 63 26 59Q4 57 8 38Q11 24 25 18Z','#DDB27A')+p('M28 20Q13 37 24 55M33 20Q25 40 33 57M38 21Q50 38 40 56M25 60L22 64M32 60V64M39 60L42 64')+p('M25 18Q31 22 38 20');
A.stol=p('M13 8H45V36H13Z',brown)+r(17,13,24,15,'#DCAE7E',1)+p('M13 36L23 29H53V42H13Z','#DCAE7E')+p('M14 42V60H20V42M46 42V60H52V42M24 30V35M45 28V34',brown);
A.robot=r(14,11,36,28,blue,7)+p('M32 11V5')+c(32,4,3,red)+r(19,40,26,18,blue,3)+p('M18 43L8 50L4 44M46 43L56 50L60 44','none','stroke-width="5"')+r(21,57,7,6,ink,1)+r(36,57,7,6,ink,1)+c(24,23,5,cream)+c(40,23,5,cream)+eye(24,23)+eye(40,23)+r(24,31,16,4,cream,1)+c(32,48,4,gold);
A.drake=p('M24 33L6 12L5 39L22 42M40 33L58 12L59 39L42 42Z',purple)+p('M45 47Q62 48 57 59L49 56',green)+e(32,44,15,15,green)+e(32,47,8,10,cream)+p('M17 20L18 5L26 16M38 16L46 5L47 21Z',gold)+e(32,25,18,16,green)+eye(24,24)+eye(40,24)+e(32,33,12,7,'#A4CE8B')+eye(28,32)+eye(36,32)+e(20,59,8,3,green)+e(44,59,8,3,green);
A.räka=p('M47 14Q23 0 11 22Q1 45 25 55L38 55L45 61L48 51L38 45L30 48Q12 40 22 28Q28 20 41 27Z','#F2AA87')+p('M43 18Q48 3 59 5M44 20Q56 12 62 20M17 18L25 25M10 29L19 32M11 41L21 39M19 50L25 44M28 54L30 47M27 29L34 37M24 33L30 41')+eye(38,18);
A.bok=p('M5 10Q19 5 32 13Q45 5 59 10V53Q44 48 32 57Q20 49 5 53Z',blue)+p('M9 7Q22 5 32 13Q43 5 55 7V48Q42 45 32 53Q22 46 9 48Z',cream)+p('M32 13V53M15 17L26 20M15 25L26 28M15 33L26 36M38 20L49 17M38 28L49 25M38 36L49 33');
A.is=p('M9 18L33 5L56 17V46L33 60L9 47Z','#A9DDED')+p('M9 18L33 31L56 17M33 31V60')+p('M15 23V42L24 47M40 34L50 28','none','stroke="#F5FCFF" stroke-width="3"');
A.säl=p('M9 36Q7 17 23 15Q37 14 39 35Q47 40 54 36L62 34L57 44L62 51Q50 54 43 47Q24 61 12 49Z','#A5B9C9')+e(23,32,9,7,cream)+eye(18,25)+eye(28,25)+c(23,30,2,ink)+p('M16 32L5 29M16 35L5 37M30 32L39 29M30 35L40 37M22 44Q31 41 34 52Q24 55 22 44Z');
// Geometric everyday objects: shape silhouettes must remain unambiguous.
A.burk=r(13,14,38,39,red,0)+e(32,53,19,7,red)+r(13,16,38,34,red,0)+e(32,14,19,7,'#D6DFE5')+e(32,14,13,3,'#A5B9C9')+r(14,28,36,13,cream,0)+e(32,34,7,5,red)+p('M28 30L31 26L36 29',green);
A.ljus=p('M19 24V54Q32 63 45 54V24Z',cream)+e(32,24,13,5,cream)+p('M32 24V16')+p('M32 3Q45 14 32 18Q23 15 32 3Z',gold);
A.pappersrulle=p('M12 14V50Q32 65 52 50V14Z',cream)+e(32,14,20,9,'#FFFFFF')+e(32,14,8,4,brown)+p('M40 21V57L53 60L58 54V17L52 17',cream)+p('M42 45L56 45','none','stroke-dasharray="2 3"');
A.tårta=p('M7 24V47Q32 64 57 47V24Z','#D9AD7E')+e(32,47,25,10,'#D9AD7E')+p('M7 25V36Q13 42 17 35Q23 42 28 35Q34 42 39 35Q46 42 51 35Q55 39 57 34V25Z',cream)+e(32,24,25,10,'#F3CFD5')+c(21,22,4,red)+c(43,23,4,red)+r(29,6,6,17,blue,1)+p('M32 0Q38 6 32 8Q27 5 32 0Z',gold);
A.låda=p('M6 20L39 10L58 21V49L25 60L6 48Z','#D4A46E')+p('M6 20L25 31L58 21M25 31V60')+p('M19 16L38 27L47 24L28 13Z',cream)+p('M38 27V40L47 37V24Z',cream);
A.tegelsten=p('M5 28L41 13L59 23V40L23 55L5 45Z','#D77561')+p('M5 28L23 38L59 23M23 38V55')+e(22,27,4,2,'#9B544C')+e(33,23,4,2,'#9B544C')+e(44,19,4,2,'#9B544C');
A.tärning=p('M8 19L32 6L56 19V46L32 59L8 46Z',cream)+p('M8 19L32 32L56 19M32 32V59')+e(32,19,3,2,ink)+e(18,30,2.5,3,ink)+e(23,43,2.5,3,ink)+e(41,34,2.5,3,ink)+e(49,29,2.5,3,ink)+e(41,47,2.5,3,ink)+e(49,42,2.5,3,ink);
A.låda=p('M3 22L45 12L61 23V45L19 56L3 45Z','#D4A46E')+p('M3 22L19 33L61 23M19 33V56')+p('M20 18L36 29L45 27L29 16Z',cream)+p('M36 29V40L45 38V27Z',cream);
const mappings={'katt':'🐱','glass':'🍦','äpple':'🍎','nalle':'🧸','penna':'✏️','sköldpadda':'🐢','tåg':'🚂','sol':'☀️','hus':'🏠','räv':'🦊','groda':'🐸','druvor':'🍇','päron':'🍐','tomat':'🍅','morot':'🥕','raket':'🚀','cykel':'🚲','banan':'🍌','trumma':'🥁','fotboll':'⚽','basketboll':'🏀','tärning':'🎲'};
function svg(name){if(mappings[name]&&!A[name])return D.html(mappings[name]).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');if(!A[name])throw Error('Saknar '+name);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g stroke="${ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${A[name]}</g></svg>`}
const source=fs.readFileSync(path.join(root,'dubbelteckning/index.html'),'utf8');
for(const key of ['K','L']){const list=JSON.parse(source.match(new RegExp('const '+key+'=(\\[.*?\\]);'))[1]);for(const [name,code]of list)fs.writeFileSync(path.join(root,'dubbelteckning/bilder',code+'.svg'),svg(name)+'\n')}
for(const name of ['tärning','is','fotboll','basketboll','burk','ljus','pappersrulle','trumma','tårta','glass','låda','tegelsten'])fs.writeFileSync(path.join(root,'geometri/bilder/saker',name+'.svg'),svg(name)+'\n');
console.log('52 ordillustrationer och 12 sakillustrationer skrivna.');
