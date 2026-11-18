/* Egna illustrationer för Diagramverkstan. Emoji används endast som stabila sparnycklar. */
(function(){
'use strict';
const ink='#34445B',cream='#FFF4DC',blue='#71B9D9',green='#79B785',red='#EB7974',gold='#F3C45D',purple='#AB95CB';
const p=(d,f='none',extra='')=>`<path d="${d}" fill="${f}" ${extra}/>`;
const c=(x,y,r,f)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`;
const e=(x,y,rx,ry,f)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}"/>`;
const r=(x,y,w,h,f,rx=4)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}"/>`;
const eyes=()=>c(25,32,1.7,ink)+c(39,32,1.7,ink);
const smile=()=>p('M27 43Q32 47 37 43');
const nose=()=>p('M29 38Q32 36 35 38L32 41Z',ink);
const leaf=(x=34,y=11)=>p(`M${x} ${y}q3-10 15-7q-3 11-15 7`,green);
const wheel=x=>c(x,48,7,ink)+c(x,48,3,cream);
const ball=(fill)=>c(32,32,23,fill);
const cloud=()=>p('M15 40C0 37 6 20 18 22C17 7 40 8 43 22C58 18 65 39 49 40Z','#DCEAF2');
const A={};
function add(key,name,body){A[key]={name,body};}
add('🐶','hund',e(15,30,9,17,'#AD7858')+e(49,30,9,17,'#AD7858')+r(17,15,30,36,'#E9BE88',13)+e(32,41,12,10,cream)+eyes()+nose()+smile());
add('🐱','katt',p('M13 28L12 8L27 17H38L52 8L51 30Z','#EFB87C')+e(32,35,22,20,'#EFB87C')+p('M17 19L17 13L23 19M42 19L48 13L47 22',red)+eyes()+nose()+smile()+p('M18 38L7 35M18 43L7 45M46 38L57 35M46 43L57 45M29 17V23M36 17V23'));
add('🐰','kanin',e(23,17,7,15,cream)+e(41,17,7,15,cream)+e(23,16,2.5,10,'#EEB2BC')+e(41,16,2.5,10,'#EEB2BC')+e(32,40,21,18,cream)+eyes()+nose()+r(29,44,6,7,'white',1));
add('🐴','häst',p('M18 25L19 6L29 16L39 14L46 6L48 29Z','#BF875F')+p('M18 20Q14 9 38 12L32 25Z','#76503E')+r(19,21,28,35,'#BF875F',12)+e(33,46,16,10,'#EAC8A3')+c(26,30,1.5,ink)+c(40,30,1.5,ink)+c(27,46,2,ink)+c(39,46,2,ink));
add('🐹','hamster',c(16,18,9,'#DBA875')+c(48,18,9,'#DBA875')+c(16,18,4,'#F5C2BC')+c(48,18,4,'#F5C2BC')+e(32,35,24,21,'#DBA875')+e(32,42,21,13,cream)+eyes()+nose()+smile());
add('🐟','fisk',p('M44 29L59 17V47L44 37Z',gold)+e(28,32,21,15,blue)+p('M22 18L31 9L37 19Z',blue)+p('M28 29Q19 34 28 39',blue)+c(16,29,2,ink));
add('🐦','fågel',p('M18 35L5 26L8 45L22 45Z',blue)+e(34,34,20,17,blue)+c(42,21,11,blue)+p('M52 21L61 26L51 28Z',gold)+e(30,36,10,8,'#C5E5ED')+c(44,20,2,ink)+p('M29 51V57M40 50V57'));
add('🐢','sköldpadda',e(16,49,7,5,green)+e(41,49,7,5,green)+c(53,35,9,green)+p('M8 44C5 9 46 8 48 44Z','#A7C681')+p('M23 20L18 32L26 42L37 32L33 20M8 33H18M37 32H46')+c(56,33,1.5,ink));
add('🍎','äpple',p('M32 20C9 5 4 32 15 49Q24 60 32 53Q44 60 52 44C61 18 43 11 32 20Z',red)+p('M32 20L35 7')+leaf()+p('M17 27Q13 34 17 40','none','stroke="#FFE2CD" stroke-width="4"'));
add('🍐','päron',p('M27 13C18 17 24 26 14 36C1 54 21 61 38 56C58 51 51 36 41 27C35 21 39 11 27 13Z','#B5CD73')+p('M32 15L35 5')+leaf(34,10)+p('M18 40Q13 48 22 51','none','stroke="#E9F0BE" stroke-width="4"'));
add('🍌','banan',p('M11 11C10 39 35 47 53 20L58 24C48 60 9 63 5 29Z',gold)+p('M11 11L17 13L13 23M14 30Q25 50 48 34')+p('M53 20L55 15L60 17L58 24Z','#AA8854'));
add('🍊','apelsin',c(32,36,23,'#F5A750')+leaf(32,14)+p('M32 16V9')+c(19,34,1,'#D58136')+c(23,43,1,'#D58136')+c(18,42,1,'#D58136'));
add('🍑','persika',p('M32 20C15 8 3 24 10 42C16 57 29 60 33 55C46 60 61 39 54 25C49 14 38 14 32 20Z','#F2A394')+p('M32 22Q42 39 33 53')+leaf(30,15));
add('🍓','jordgubbe',p('M11 25Q8 43 31 58Q56 43 53 25Q32 10 11 25Z',red)+p('M12 23L22 17L23 8L32 17L44 9L43 19L54 24L37 25L31 32L25 24Z',green)+[ [21,33],[35,35],[43,29],[27,43],[37,45] ].map(([x,y])=>p(`M${x} ${y}v3`, 'none','stroke="#FFF1B9"')).join(''));
add('🍇','vindruvor',p('M31 18V7')+leaf(30,13)+[[20,23],[35,23],[46,30],[16,36],[30,37],[40,44],[27,51]].map(([x,y])=>c(x,y,8,purple)).join(''));
add('🍉','vattenmelon',p('M6 22H58Q57 56 32 58Q6 54 6 22Z',green)+p('M11 23H53Q51 49 32 51Q13 49 11 23Z',red)+p('M21 31L22 35M33 31V36M44 31L42 35M32 42V45'));
add('🍋','citron',p('M9 35Q4 28 12 22Q24 5 43 15Q58 18 56 29Q62 36 53 42Q37 60 19 48Q8 46 9 35Z','#F4D56A')+p('M20 23Q28 16 37 20','none','stroke="#FFF2BC" stroke-width="4"'));
add('🥕','morot',p('M22 24L51 38Q34 54 7 59Q10 36 22 24Z','#F0A256')+p('M41 32L45 9L53 13L49 32L59 20L62 28L50 38Z',green)+p('M21 36L28 40M16 46L22 49'));
add('🍫','choklad',r(15,6,34,51,'#865B46',3)+[0,1].flatMap(x=>[0,1,2].map(y=>r(19+x*14,10+y*13,11,10,'#B58362',1))).join('')+p('M12 37L51 42L48 60L11 55Z','#AE9CD1')+p('M12 37L25 43L34 39L51 42','#F7ECE0'));
add('🍦','glass',p('M19 33H45L33 60Z','#DDB179')+p('M23 38L37 49M29 36L41 43M40 38L28 50')+p('M17 35Q11 28 20 25Q17 18 27 16Q25 9 34 5Q33 15 41 17Q49 21 44 26Q54 35 45 37Z',cream)+p('M22 25Q33 29 43 25M26 17Q33 22 40 18'));
function vehicle(body,col){return body+wheel(17)+wheel(47)+p('M10 39H55','none','stroke="#FFFFFF"');}
add('🚗','bil',vehicle(p('M7 30L15 27L22 14H42L50 28L58 32V45H6Z',red)+p('M24 18H31V28H19ZM35 18H41L46 28H35Z','#D9EFF5'),red));
add('🚌','buss',vehicle(r(5,12,54,34,gold,7)+[0,1,2,3].map(i=>r(10+i*12,18,9,12,'#D9EFF5',2)).join(''),gold));
add('🚚','lastbil',vehicle(r(5,14,32,31,blue,2)+p('M37 24H50L59 34V45H37Z',red)+p('M42 28H48L54 35H42Z','#D9EFF5'),blue));
add('🚜','traktor',r(21,17,21,27,green,2)+r(26,21,11,14,'#D9EFF5',1)+r(40,31,18,14,green,2)+p('M23 16H45M49 30V20')+c(23,45,12,ink)+c(23,45,6,gold)+c(51,49,7,ink)+c(51,49,3,gold));
add('🚲','cykel',c(15,44,11,'#E9F1EF')+c(50,44,11,'#E9F1EF')+p('M15 44L24 25L37 44H15L34 29H45L50 44M43 20L45 29M22 24H30M42 20H50','none','stroke="#D7756E" stroke-width="3"'));
add('🚂','tåg',r(7,25,31,21,blue)+r(35,13,21,33,red)+r(39,18,12,13,'#DCEEF2',2)+r(12,15,9,11,ink,1)+p('M9 14H24M33 11H59')+[16,30,47].map(x=>wheel(x)).join('')+c(15,7,4,'#D9E3E8'));
add('✈️','flygplan',p('M28 8Q32 1 36 8V25L59 39V45L36 38V50L43 56V60L32 56L21 60V56L28 50V38L5 45V39L28 25Z','#C4DCE5')+p('M29 15H35M29 20H35','none','stroke="#5E99B4"'));
add('⛵','segelbåt',p('M7 43H58L49 55H17Z',red)+p('M31 8V43M27 12L10 37H27ZM36 17L53 37H36Z',cream)+p('M5 59Q11 54 18 59T32 59T46 59T60 59','none','stroke="#65ADC7"'));
add('🛴','sparkcykel',c(14,51,7,ink)+c(51,51,7,ink)+p('M14 49H43L47 16H38M43 17H52','none','stroke="#7BACC3" stroke-width="5"'));
add('⚽','fotboll',ball('#FFFCF0')+p('M27 23L39 25L42 36L32 43L22 34Z',ink)+p('M27 23L23 12M39 25L49 17M42 36L54 41M32 43L31 55M22 34L10 36'));
add('🏀','basketboll',ball('#EFA566')+p('M9 30Q32 37 55 29M32 9Q26 33 35 55M17 15Q39 25 49 47M15 48Q21 25 48 16'));
add('🏓','pingis',p('M34 41L20 59L13 53L28 35Z','#D7B082')+e(38,25,18,20,red)+p('M24 39L35 45',cream)+c(12,18,7,'#FFFCF0'));
add('🎾','tennisboll',ball('#C2D477')+p('M14 17Q37 23 24 54M43 12Q25 37 51 45','none','stroke="#FFFCED" stroke-width="4"'));
add('🛹','skateboard',c(17,49,5,ink)+c(46,49,5,ink)+p('M5 29Q9 38 18 38H45Q53 37 58 28L60 35Q54 46 43 46H19Q6 46 3 34Z',purple)+p('M16 40H46','none','stroke="#DED3EB"'));
add('♟️','schackpjäs',c(32,13,9,'#63778F')+p('M23 24H41L37 35L42 47H22L27 35Z','#63778F')+r(17,47,30,9,'#63778F',3)+p('M22 25H42M24 35H38','none','stroke="#D2DFEA"'));
add('🎨','palett',p('M36 7C5 1 0 37 16 51C30 66 38 54 34 45Q31 37 43 37C66 38 60 9 36 7Z','#E6C59A')+c(20,21,5,red)+c(35,16,5,blue)+c(47,25,5,gold)+c(15,36,5,green)+e(26,47,4,5,cream));
add('🎵','musiknot',p('M24 43V15L51 8V37','none','stroke="#677C9C" stroke-width="5"')+p('M24 15L51 8V17L24 24Z',blue)+e(17,46,10,7,blue)+e(44,40,10,7,blue));
add('☀️','sol',c(32,32,14,gold)+Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return p(`M${32+21*Math.cos(a)} ${32+21*Math.sin(a)}L${32+28*Math.cos(a)} ${32+28*Math.sin(a)}`,'none','stroke="#E3AA3E" stroke-width="3"');}).join(''));
add('☁️','moln',cloud());
add('🌧️','regn',cloud()+p('M19 46L15 54M32 46L28 54M45 46L41 54','none','stroke="#66A8CA" stroke-width="4"'));
add('❄️','snö',Array.from({length:6},(_,i)=>`<g transform="rotate(${i*60} 32 32)">${p('M32 32V6M32 17L25 11M32 17L39 11','none','stroke="#71B3D0" stroke-width="3"')}</g>`).join(''));
add('🌈','regnbåge',p('M6 51A26 26 0 0 1 58 51','none',`stroke="${red}" stroke-width="7"`)+p('M13 51A19 19 0 0 1 51 51','none',`stroke="${gold}" stroke-width="7"`)+p('M20 51A12 12 0 0 1 44 51','none',`stroke="${blue}" stroke-width="7"`));
add('⭐','stjärna',p('M32 5L40 23L59 25L45 39L49 58L32 48L15 58L19 39L5 25L24 23Z',gold));
add('📚','böcker',r(9,43,46,13,blue,2)+r(14,28,42,13,red,2)+r(7,12,45,14,green,2)+p('M18 48H51M23 33H52M17 17H48','none','stroke="#FFF4DC" stroke-width="3"'));
for(const [key,name,col] of [['🔴','röd',red],['🟠','orange','#EFA566'],['🟡','gul',gold],['🟢','grön',green],['🔵','blå',blue],['🟣','lila',purple]])add(key,name,c(32,32,23,col)+p('M18 26Q20 19 27 17','none','stroke="#FFFFFF90" stroke-width="4"'));
add('🍕','pizza',p('M9 15Q32 3 56 16L33 58Z','#F1D181')+p('M9 15Q32 3 56 16L53 24Q32 12 13 24Z','#CA985B')+c(24,29,5,red)+c(40,29,5,red)+c(33,43,5,red));
add('🧸','nalle',c(17,14,9,'#BD8B65')+c(47,14,9,'#BD8B65')+e(32,42,16,17,'#BD8B65')+e(13,38,7,11,'#BD8B65')+e(51,38,7,11,'#BD8B65')+e(21,55,9,6,'#DDBA92')+e(43,55,9,6,'#DDBA92')+c(32,24,17,'#BD8B65')+e(32,30,9,7,cream)+c(25,22,1.5,ink)+c(39,22,1.5,ink)+c(32,28,2,ink)+p('M27 41L32 45L37 41L36 49L32 45L28 49Z',red));
add('🛷','pulka',p('M11 19Q9 12 18 12H46Q55 12 53 21L49 45Q47 52 39 52H22Q12 51 12 43Z',red)+r(19,20,27,24,'#F3B2A2',7)+p('M16 14Q4 3 6 35M24 25V38M32 25V38M40 25V38'));
add('⛸️','skridsko',p('M17 8H35L37 30L51 35Q59 37 54 45H13V34L17 25Z',cream)+p('M18 46V53M47 46V53M8 54H49Q58 54 58 48','none','stroke="#8197AC" stroke-width="3"')+p('M25 17H35M25 23H35M25 29L37 30'));
add('🧤','vante',p('M18 49L13 33Q4 24 11 21Q15 19 20 29V13Q19 3 28 5Q33 5 33 13V10Q37 3 43 9L48 29Q51 40 43 49Z',red)+r(18,46,26,12,'#EAB694',2)+p('M25 50V55M32 50V55M39 50V55'));
add('🧣','halsduk',p('M16 8H44V22H35L44 56H29L23 32L16 51H5L18 20Z',purple)+p('M15 15H44M27 37L39 34M30 48L42 45M7 44H18','none','stroke="#E7D9EF" stroke-width="4"')+p('M29 56V61M35 56V61M42 56V61'));
add('🥾','känga',p('M14 9H35L38 32L53 37Q60 40 56 49H9V34L14 27Z','#B78D63')+r(8,47,49,9,ink,2)+p('M22 17H34M22 24H35M24 31L38 33','none','stroke="#F8E5BB" stroke-width="3"'));
add('🎈','ballong',e(32,24,19,22,red)+p('M32 46L28 51H36Z',red)+p('M32 51Q43 57 31 62')+p('M21 16Q23 10 28 9','none','stroke="#FFE2D6" stroke-width="4"'));
add('🎲','tärning',r(9,9,46,46,cream,9)+[[20,20],[44,20],[32,32],[20,44],[44,44]].map(([x,y])=>c(x,y,3.5,ink)).join(''));
function content(key){const a=A[key];return a?`<g stroke="${ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${a.body}</g>`:'';}
function html(key){return A[key]?`<svg class="diagram-bild" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${content(key)}</svg>`:'';}
function svg(key,x,y,size){return A[key]?`<g class="diagram-symbol" transform="translate(${x} ${y}) scale(${size/64})" aria-hidden="true">${content(key)}</g>`:'';}
window.DiagramBilder={html,svg,namn:key=>A[key]?.name||'Bild',keys:Object.keys(A)};
})();
