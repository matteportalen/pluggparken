import {Game,WORLDS,level,adjacent as gridAdjacent} from './motor.mjs';
const $=id=>document.getElementById(id),KEY='mattespel-talkross-v1',reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
let data={stars:{},betyg:{},best:{}};
try{const stored=JSON.parse(localStorage.getItem(KEY)||'null');if(stored&&typeof stored==='object')for(const k of ['stars','betyg','best'])if(stored[k]&&typeof stored[k]==='object'&&!Array.isArray(stored[k]))data[k]=stored[k];}catch{}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(data));}catch{}};
let game=null,selected=null,busy=false,token=0,currentWorld='tio',currentLevel=1,focusCell=0,drag=null,suppressClick=false;
let SIZE=6;
const adjacent=(a,b)=>game?.config.type==='pair'?Number.isInteger(a)&&Number.isInteger(b)&&a>=0&&b>=0&&a<16&&b<16&&a!==b:gridAdjacent(a,b);
const buttons=[];
function buildBoard(){
 buttons.length=0;$('board').replaceChildren();$('board').style.gridTemplateColumns=`repeat(${SIZE},1fr)`;
for(let i=0;i<SIZE*SIZE;i++){
 const b=document.createElement('button');b.className='tile';b.setAttribute('role','gridcell');b.dataset.index=i;b.dataset.paint=(Math.floor(i/SIZE)*3+i%SIZE)%4;b.tabIndex=i? -1:0;
 $('board').append(b);buttons.push(b);
}
}
buildBoard();
const say=t=>$('message').textContent=t;
const rating=n=>{n=Math.max(0,Math.min(3,Math.floor(Number(n)||0)));return '★'.repeat(n)+'☆'.repeat(3-n);};
const screen=id=>{for(const n of ['choose','game','result'])$(n).hidden=n!==id;document.body.classList.toggle('playing',id==='game');};
const rec=(w,n)=>Math.max(0,Math.min(3,Number(data.betyg[w+'-'+n])||0));
function menu(){
 $('worlds').replaceChildren();
 for(const w of WORLDS){
  const article=document.createElement('article');article.className='world';
  const head=document.createElement('div');head.className='world-head';
  head.innerHTML='<span class="world-icon" aria-hidden="true">'+w.icon+'</span><div><h3>'+w.name+'</h3><small>'+w.short+'</small></div><span class="world-stars" aria-label="'+(data.stars[w.id]||0)+' världsstjärnor">'+rating(data.stars[w.id]||0)+'</span>';article.append(head);
  const levels=document.createElement('div');levels.className='levels';
  for(let n=1;n<=4;n++){
   const b=document.createElement('button');b.className='level';b.disabled=n>1&&!rec(w.id,n-1);
   b.setAttribute('aria-label',w.name+', bana '+n+(b.disabled?', låst':', '+rec(w.id,n)+' stjärnor'));
   b.innerHTML='<b>'+(b.disabled?'🔒':n)+'</b><span>'+rating(rec(w.id,n))+'</span>';b.onclick=()=>start(w.id,n);levels.append(b);
  }
  article.append(levels);$('worlds').append(article);
 }
}
function sound(){const on=!window.Ljud||Ljud.on;$('sound').textContent=on?'🔊':'🔇';$('sound').setAttribute('aria-pressed',String(!on));}
function start(world,n){
 token++;drag=null;$('burst').replaceChildren();busy=false;selected=null;focusCell=0;currentWorld=world;currentLevel=n;
 const config=level(world,n),seed=0x711+WORLDS.findIndex(w=>w.id===world)*10000+n*91;
 game=new Game(config,seed);SIZE=config.type==='pair'?4:6;buildBoard();screen('game');$('levelName').textContent=config.icon+' '+config.name+' · '+n+'/4';
 $('goalLabel').textContent=config.type==='equal'?'MATCHA':'BYGG SUMMAN';$('goal').textContent=config.type==='equal'?'=':config.target;
 $('ruleTitle').textContent=config.short;$('rule').textContent=config.note;
 $('example').textContent=config.type==='sum'?(config.target===10?'2 + 3 + 5 = 10':config.target===20?'4 + 7 + 9 = 20':'20 + 30 + 50 = 100'):config.ops==='add'?'4 + 4 = 10 − 2 = 8':n<3?'3 · 4 = 2 · 6 = 12':'24 / 2 = 3 · 4 = 12';
 if(config.type==='equal'&&config.ops==='multiply'&&n>=3)$('example').innerHTML='<span class="frac"><span>24</span><span>2</span></span> = 3 · 4 = 12';
 $('starNote').textContent='Tre stjärnor inom '+config.par+' drag, två inom '+(config.par+4)+'. Du kan alltid fortsätta tills banan är klar.';
 if(config.type==='pair'){$('example').textContent='3 + 7 = 10';$('starNote').textContent='Hitta '+game.config.goal+' tiokompispar. Ingen tidspress — prova så mycket du vill!';}
 $('gameTip').textContent=config.type==='pair'?'Dra ett tal till ett annat tal, eller tryck på två tal. De ska bli 10 tillsammans.':'Byt två grannar. Båda flyttas — det räcker att en skapar en giltig rad.';
 render(game.board);hud();sound();say(config.note);buttons[0].focus({preventScroll:true});
}
function render(board,from){
 $('board').classList.remove('show-match');
 const size=buttons[0].offsetHeight+parseFloat(getComputedStyle($('board')).gap||6);
 board.forEach((tile,i)=>{
  const b=buttons[i];b.className='tile'+(tile.text.length>2?' expression':'');b.removeAttribute('style');
  b.replaceChildren();
  if(tile.fr){const f=document.createElement('span');f.className='frac';for(const n of tile.fr){const span=document.createElement('span');span.textContent=n;f.append(span);}b.append(f);}
  else b.textContent=tile.text;
  b.setAttribute('aria-label','Rad '+(Math.floor(i/SIZE)+1)+', kolumn '+(i%SIZE+1)+': '+tile.text.replace(' / ',' delat med ').replace(' · ',' gånger '));
  b.tabIndex=i===focusCell?0:-1;b.setAttribute('aria-selected',String(selected===i));
  if(from&&from[i]!==Math.floor(i/SIZE)){b.style.setProperty('--drop',(from[i]-Math.floor(i/SIZE))*size+'px');b.classList.add('falling');}
 });
 if(selected!=null)buttons[selected].classList.add('selected');
}
function showMatchRows(groups){
 const host=$('burst'),base=host.getBoundingClientRect();
 host.querySelectorAll('.match-row').forEach(e=>e.remove());
 for(const g of groups){
  const rects=g.cells.map(i=>buttons[i].getBoundingClientRect());
  const left=Math.min(...rects.map(r=>r.left)),top=Math.min(...rects.map(r=>r.top));
  const row=document.createElement('i');row.className='match-row';
  Object.assign(row.style,{left:left-base.left-3+'px',top:top-base.top-3+'px',width:Math.max(...rects.map(r=>r.right))-left+6+'px',height:Math.max(...rects.map(r=>r.bottom))-top+6+'px'});host.append(row);
 }
}
function popRings(cells){
 if(reduce)return;
 const host=$('burst'),rect=host.getBoundingClientRect();
 for(const i of cells){
  const tile=buttons[i].getBoundingClientRect(),ring=document.createElement('i');ring.className='pop-ring';
  ring.style.left=tile.x-rect.x+tile.width/2+'px';ring.style.top=tile.y-rect.y+tile.height/2+'px';
  ring.style.width=tile.width*.8+'px';ring.style.height=tile.height*.8+'px';host.append(ring);
  ring.addEventListener('animationend',()=>ring.remove(),{once:true});
 }
}
function hud(){
 const c=game.config;$('turns').textContent=game.turns;$('score').textContent=game.points;$('chain').textContent=game.maxChain?game.maxChain+' i följd':'—';
 $('meter').max=c.goal;$('meter').value=Math.min(c.goal,game.lines);$('progressLabel').textContent=Math.min(c.goal,game.lines)+' av '+c.goal+(c.type==='pair'?' par':' rader');
 $('undo').disabled=busy||!game.history.length;$('hint').disabled=busy;$('restart').disabled=busy;
 $('board').setAttribute('aria-busy',String(busy));
}
const wait=ms=>new Promise(r=>setTimeout(r,reduce?60:ms));
async function play(a,b){
 if(busy||!game||game.won)return;
 const result=game.swap(a,b);selected=null;
 if(!result.ok){
  say(result.reason==='neighbor'?'Välj två brickor som ligger intill varandra.':game.config.type==='pair'?'De två talen blir inte 10. Prova en annan kompis!':'Det bytet ger ingen matchning. '+game.config.note+' Draget räknas inte.');
  if(adjacent(a,b)){busy=true;const run=++token;hud();swapVisual(a,b);await wait(180);if(run!==token)return;await springHome(run);}
  else render(game.board);
  return;
 }
 busy=true;const run=++token;hud();
 for(const event of result.events){
  if(run!==token)return;
  if(event.kind==='swap'){
   swapVisual(a,b);
   window.Ljud?.slurp();await wait(180);if(run!==token)return;render(event.board);
  }else if(event.kind==='clear'){
   event.cells.forEach(i=>buttons[i].classList.add('match-ready'));
   const msg=$('message');msg.replaceChildren();
   if(game.config.type!=='pair')showMatchRows(event.groups);
   $('board').classList.add('show-match');
   const reason=document.createElement('strong');reason.className='match-reason';
   reason.textContent=game.config.type==='pair'?'Tiokompisar! De två talen blir 10 tillsammans.':event.chain>1?'Kedja! De fallande brickorna skapade en ny rad.':event.cells.includes(b)?'Brickan du flyttade bildar den markerade raden.':'Grannbrickan bildar den markerade raden när ni byter plats.';
   msg.append(reason);
   event.groups.slice(0,2).forEach((g,j)=>{
     if(j)msg.append(' · ');
     g.parts.forEach((part,i)=>{if(i)msg.append(game.config.type!=='equal'?' + ':' = ');
       if(part.fr){const f=document.createElement('span');f.className='frac';for(const n of part.fr){const span=document.createElement('span');span.textContent=n;f.append(span);}msg.append(f);}
       else msg.append(part.text);
     });
     if(game.config.type!=='equal')msg.append(' = '+game.config.target);
   });
   if(event.groups.length>2)msg.append(' · fler matchningar!');
   await new Promise(r=>setTimeout(r,event.chain===1?1600:1000));if(run!==token)return;
   $('board').classList.remove('show-match');$('burst').querySelectorAll('.match-row').forEach(e=>e.remove());
   event.cells.forEach(i=>{buttons[i].classList.remove('match-ready');buttons[i].classList.add('matched');});
   popRings(event.cells);window.Ljud?.pop(Math.min(6,event.chain-1));await wait(440);
   if(run!==token)return;await wait(90);
  }else if(event.kind==='fall'){render(event.board,event.from);await wait(600);}
  else{render(event.board);say('Inga byten kvar — nya tal kommer in. Dina framsteg finns kvar.');await wait(450);}
 }
 if(run!==token)return;busy=false;render(game.board);hud();
 if(game.won)finish();else if(game.config.type==='pair'){say('Ett tiokompispar! Hitta '+(game.config.goal-game.lines)+' par till.');}else{say('Bytet gav en giltig rad. '+Math.max(0,game.config.goal-game.lines)+' rader kvar. Båda brickorna flyttas — det räcker att en av dem skapar en rad.');}
}
function choose(i){
 if(busy||!game)return;
 buttons.forEach(b=>b.classList.remove('hinted'));focusCell=i;
 if(selected===i){selected=null;render(game.board);return;}
 if(selected==null){selected=i;render(game.board);return;}
 if(!adjacent(selected,i)){selected=i;render(game.board);say('Välj en granne till brickan du markerat.');return;}
 play(selected,i);
}
$('board').addEventListener('click',e=>{if(suppressClick){suppressClick=false;return;}const b=e.target.closest('.tile');if(b)choose(Number(b.dataset.index));});
function swapVisual(a,b){
 const step=buttons[0].offsetWidth+parseFloat(getComputedStyle($('board')).gap||6);
 const dx=(b%SIZE-a%SIZE)*step,dy=(Math.floor(b/SIZE)-Math.floor(a/SIZE))*step;
 buttons.forEach(t=>t.classList.remove('dragging','drag-neighbor','selected','hinted'));
 buttons[a].style.transform=`translate(${dx}px,${dy}px)`;if(game.config.type!=='pair')buttons[b].style.transform=`translate(${-dx}px,${-dy}px)`;
}
async function springHome(run=++token){
 busy=true;hud();
 buttons.forEach(b=>{b.classList.remove('dragging','drag-neighbor','selected');b.classList.add('returning');b.style.transform='translate(0px,0px)';});
 await wait(380);if(run!==token)return;
 busy=false;selected=null;render(game.board);hud();
}
function moveDrag(e){
 if(!drag||drag.id!==e.pointerId)return;
 const d=drag,dx=e.clientX-d.x,dy=e.clientY-d.y;
 if(!d.moved&&Math.hypot(dx,dy)<6)return;
 d.moved=true;
 const step=buttons[0].offsetWidth+parseFloat(getComputedStyle($('board')).gap||6);
 if(game.config.type==='pair'){
  buttons.forEach(b=>{b.classList.remove('selected','hinted');b.style.transform='';});
  const tile=buttons[d.i];tile.classList.add('dragging');tile.style.transform=`translate(${dx}px,${dy}px)`;
  const rect=$('board').getBoundingClientRect(),col=Math.floor((e.clientX-rect.left)/step),row=Math.floor((e.clientY-rect.top)/step);
  d.next=col>=0&&col<4&&row>=0&&row<4&&row*4+col!==d.i?row*4+col:null;d.distance=Math.hypot(dx,dy);return;
 }
 const x=Math.max(-step,Math.min(step,dx)),y=Math.max(-step,Math.min(step,dy));
 const next=d.i+(Math.abs(dx)>Math.abs(dy)?Math.sign(dx):Math.sign(dy)*SIZE);
 d.next=adjacent(d.i,next)?next:null;d.distance=Math.max(Math.abs(dx),Math.abs(dy));
 buttons.forEach(b=>{b.classList.remove('selected','hinted','drag-neighbor');b.style.transform='';});
 const tile=buttons[d.i];tile.classList.add('dragging');tile.style.transform=`translate(${x}px,${y}px)`;
 if(d.next!=null){const neighbor=buttons[d.next];neighbor.classList.add('drag-neighbor');neighbor.style.transform=Math.abs(dx)>Math.abs(dy)?`translate(${-x}px,0px)`:`translate(0px,${-y}px)`;}
}
$('board').addEventListener('pointerdown',e=>{
 const b=e.target.closest('.tile');if(!b||busy||drag||e.button!==0||!game||game.won)return;
 suppressClick=false;drag={i:Number(b.dataset.index),x:e.clientX,y:e.clientY,id:e.pointerId,moved:false,next:null,distance:0};b.setPointerCapture(e.pointerId);
});
$('board').addEventListener('pointermove',moveDrag);
$('board').addEventListener('pointerup',e=>{
 if(!drag||drag.id!==e.pointerId)return;moveDrag(e);const d=drag;drag=null;
 if(!d.moved)return;suppressClick=true;selected=null;
 if(d.next!=null&&d.distance>=18)play(d.i,d.next);else springHome();
});
function cancelDrag(e){if(!drag||drag.id!==e.pointerId)return;const moved=drag.moved;drag=null;if(moved){suppressClick=true;springHome();}}
$('board').addEventListener('pointercancel',cancelDrag);
$('board').addEventListener('lostpointercapture',cancelDrag);
$('board').addEventListener('keydown',e=>{
 const b=e.target.closest('.tile');if(!b||busy)return;const i=Number(b.dataset.index);
 const shifts={ArrowLeft:-1,ArrowRight:1,ArrowUp:-SIZE,ArrowDown:SIZE};
 if(e.key in shifts){e.preventDefault();const next=i+shifts[e.key];if(next>=0&&next<SIZE*SIZE&&Math.abs(Math.floor(next/SIZE)-Math.floor(i/SIZE))+Math.abs(next%SIZE-i%SIZE)===1){focusCell=next;buttons.forEach((b,j)=>b.tabIndex=j===next?0:-1);buttons[next].focus();}}
 else if(e.key==='Escape'){selected=null;render(game.board);}
});
$('undo').onclick=()=>{if(busy||!game.undo())return;selected=null;render(game.board);hud();say('Draget och hela kedjan är ångrade. Prova en annan väg!');};
$('hint').onclick=()=>{if(busy)return;const h=game.hint();if(!h)return;selected=null;render(game.board);buttons[h.a].classList.add('hinted');buttons[h.b].classList.add('hinted');say(game.config.type==='pair'?'De markerade talen är tiokompisar. Dra ihop dem!':'De två markerade brickorna kan byta plats. Räkna på vad raden blir!');};
$('restart').onclick=()=>start(currentWorld,currentLevel);
function back(){token++;drag=null;$('burst').replaceChildren();busy=false;selected=null;screen('choose');menu();$('chooseTitle').tabIndex=-1;$('chooseTitle').focus({preventScroll:true});}
$('back').onclick=back;$('return').onclick=back;
$('sound').onclick=()=>{if(window.Ljud){Ljud.set(!Ljud.on);sound();document.dispatchEvent(new Event('mp-ljud-andrat'));}};
function finish(){
 const k=currentWorld+'-'+currentLevel;data.betyg[k]=Math.max(rec(currentWorld,currentLevel),game.stars);data.best[k]=Math.max(Number(data.best[k])||0,game.points);
 for(const w of WORLDS)data.stars[w.id]=Math.min(...[1,2,3,4].map(n=>rec(w.id,n)));
 save();screen('result');$('resultTitle').textContent=game.config.name+' · bana '+currentLevel+' klar!';
 $('stars').textContent=rating(game.stars);$('stars').setAttribute('aria-label',game.stars+' av 3 stjärnor');
 $('summary').textContent=game.turns+' drag · '+game.points+' poäng · största kedja: '+game.maxChain+'.';
 const remaining=[1,2,3,4].filter(n=>!rec(currentWorld,n)).length;
 $('worldReward').textContent=remaining?'Klara världens '+remaining+' återstående '+(remaining===1?'bana':'banor')+' för världsstjärnor.':'Världen är klar! '+rating(data.stars[currentWorld])+' världsstjärnor.';
 const wi=WORLDS.findIndex(w=>w.id===currentWorld);
 $('next').textContent=currentLevel<4?'Nästa bana →':wi<WORLDS.length-1?'Nästa värld →':'Till världarna →';
 $('next').disabled=true;const run=token;setTimeout(()=>{if(run===token)$('next').disabled=false;},650);
 window.Ljud?.fanfare();
}
$('next').onclick=()=>{if(currentLevel<4)start(currentWorld,currentLevel+1);else{const next=WORLDS.findIndex(w=>w.id===currentWorld)+1;if(next<WORLDS.length)start(WORLDS[next].id,1);else back();}};
menu();sound();
window.__talkross={get game(){return game;},get busy(){return busy;},start,choose,play,get data(){return data;}};
