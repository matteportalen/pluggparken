// Pure deterministic board rules. Presentation never consumes this RNG.
export const SIZE=6;
export const WORLDS=[
 {id:'kompis',name:'Tiokompisarna',short:'Börja här · två tal blir 10',type:'pair',target:10,icon:'🌱',note:'Dra ett tal till dess tiokompis. Till exempel 3 till 7. De behöver inte ligga bredvid varandra.'},
 {id:'tio',name:'Tioträdgården',short:'Bygg 10',type:'sum',target:10,icon:'🌸',color:'#C76095',note:'Tre tal på rad ska tillsammans bli 10.'},
 {id:'tjugo',name:'Tjugoviken',short:'Bygg 20',type:'sum',target:20,icon:'🐚',color:'#328E9C',note:'Tre tal på rad ska tillsammans bli 20.'},
 {id:'hundra',name:'Hundratoppen',short:'Bygg 100',type:'sum',target:100,icon:'🏔️',color:'#6D6ABA',note:'Tre tiotal på rad ska tillsammans bli 100.'},
 {id:'lika',name:'Likhetslunden',short:'Samma värde',type:'equal',ops:'add',icon:'🌿',color:'#47855E',note:'Tre uttryck eller tal på rad ska ha samma värde.'},
 {id:'tabell',name:'Tabellskatten',short:'Tabeller & division',type:'equal',ops:'multiply',icon:'💎',color:'#B37B30',note:'Räkna ut värdena. Matcha tre lika, med multiplikation och division.'}
];
const copy=x=>JSON.parse(JSON.stringify(x));
export function level(world,n=1){return {...WORLDS.find(w=>w.id===world)||WORLDS[0],level:Math.max(1,Math.min(4,n)),goal:[8,11,14,18][Math.max(0,Math.min(3,n-1))],par:[7,9,11,13][Math.max(0,Math.min(3,n-1))]};}
export function adjacent(a,b){return Number.isInteger(a)&&Number.isInteger(b)&&a>=0&&b>=0&&a<SIZE*SIZE&&b<SIZE*SIZE&&Math.abs(Math.floor(a/SIZE)-Math.floor(b/SIZE))+Math.abs(a%SIZE-b%SIZE)===1;}
export function matches(board,config){
 const groups=[];
 for(let r=0;r<SIZE;r++)for(let c=0;c<SIZE;c++)for(const [dr,dc]of [[0,1],[1,0]]){
  if(r+2*dr>=SIZE||c+2*dc>=SIZE)continue;
  const cells=[0,1,2].map(k=>(r+k*dr)*SIZE+c+k*dc),tiles=cells.map(i=>board[i]);if(tiles.some(t=>!t))continue;
  if(config.type==='sum'?tiles.reduce((s,t)=>s+t.v,0)===config.target:tiles.every(t=>t.v===tiles[0].v))
   groups.push({cells,values:tiles.map(t=>t.v),labels:tiles.map(t=>t.text),parts:tiles.map(t=>({text:t.text,fr:t.fr})),equation:config.type==='sum'?tiles.map(t=>t.v).join(' + ')+' = '+config.target:tiles.map(t=>t.text).join(' = ')});
 }
 return groups;
}
export function moves(board,config){
 if(config.type==='pair'){const out=[];for(let a=0;a<board.length;a++)for(let b=a+1;b<board.length;b++)if(board[a].v+board[b].v===10)out.push({a,b,groups:[]});return out;}
 const out=[];
 for(let a=0;a<board.length;a++)for(const b of [a+1,a+SIZE]){
  if(!adjacent(a,b)||board[a].v===board[b].v)continue;
  const next=board.slice();[next[a],next[b]]=[next[b],next[a]];
  const groups=matches(next,config);if(groups.some(g=>g.cells.includes(a)||g.cells.includes(b)))out.push({a,b,groups});
 }
 return out;
}
export class Game{
 constructor(config,seed=1){if(config.type==='pair')return new PairGame(config,seed);this.config=config;this.rng=seed>>>0||1;this.turns=0;this.lines=0;this.points=0;this.maxChain=0;this.history=[];this.board=this.generate();}
 random(){this.rng=(Math.imul(this.rng,1664525)+1013904223)>>>0;return this.rng/4294967296;}
 pick(a){return a[Math.floor(this.random()*a.length)];}
 tile(){
  const c=this.config;
  if(c.type==='sum'){const unit=c.target===100?10:1,max=c.target===20?18:9,v=(1+Math.floor(this.random()*max))*unit;return {v,text:String(v)};}
  const v=this.pick(c.ops==='add'?[4,6,8,10,12]:[6,8,10,12,15,18]);
  if(this.random()<.25)return {v,text:String(v)};
  if(c.ops==='add'){
   const a=1+Math.floor(this.random()*(v-1));
   return this.random()<.5?{v,text:a+' + '+(v-a)}:{v,text:(v+a)+' − '+a};
  }
  const factors=[2,3,4,5,6,8,9].filter(n=>v%n===0&&v/n<=9),a=this.pick(factors),b=v/a;
  if(c.level<3||this.random()<.55)return {v,text:a+' · '+b};
  const d=this.pick([2,3,4,5].filter(d=>d*v<=100));return {v,text:(v*d)+' / '+d,fr:[v*d,d]};
 }
 generate(){
  for(let attempt=0;attempt<150;attempt++){
   const board=Array(SIZE*SIZE).fill(null);
   for(let i=0;i<board.length;i++){
    for(let tries=0;tries<100;tries++){board[i]=this.tile();if(!matches(board,this.config).length)break;}
   }
   if(!matches(board,this.config).length&&moves(board,this.config).length)return board;
  }
  throw Error('Kunde inte skapa en spelbar bana.');
 }
 snapshot(){return copy({board:this.board,rng:this.rng,turns:this.turns,lines:this.lines,points:this.points,maxChain:this.maxChain});}
 undo(){if(!this.history.length)return false;Object.assign(this,this.history.pop());return true;}
 swap(a,b){
  if(!adjacent(a,b)||this.won)return {ok:false,reason:'neighbor'};
  const before=this.snapshot(),next=this.board.slice();[next[a],next[b]]=[next[b],next[a]];
  let groups=matches(next,this.config);
  if(!groups.some(g=>g.cells.includes(a)||g.cells.includes(b)))return {ok:false,reason:'match'};
  this.history.push(before);this.board=next;this.turns++;
  const events=[{kind:'swap',a,b,board:copy(next)}];let chain=0;
  while(groups.length){
   chain++;this.lines+=groups.length;this.maxChain=Math.max(chain,this.maxChain);
   const cells=[...new Set(groups.flatMap(g=>g.cells))];this.points+=cells.length*10*chain;
   events.push({kind:'clear',groups:copy(groups),cells,chain});
   cells.forEach(i=>this.board[i]=null);
   const from=Array(SIZE*SIZE);
   for(let c=0;c<SIZE;c++){
    const keep=[];for(let r=SIZE-1;r>=0;r--)if(this.board[r*SIZE+c])keep.push({tile:this.board[r*SIZE+c],r});
    for(let r=SIZE-1;r>=0;r--){const k=SIZE-1-r;
     if(k<keep.length){this.board[r*SIZE+c]=keep[k].tile;from[r*SIZE+c]=keep[k].r;}
     else{this.board[r*SIZE+c]=this.tile();from[r*SIZE+c]=-(k-keep.length)-1;}
    }
   }
   events.push({kind:'fall',board:copy(this.board),from});
   groups=matches(this.board,this.config);
   // A finite guard for extremely long random cascades; the new board is stable and playable.
   if(chain>=20&&groups.length){this.board=this.generate();events.push({kind:'shuffle',board:copy(this.board)});break;}
  }
  if(!moves(this.board,this.config).length){this.board=this.generate();events.push({kind:'shuffle',board:copy(this.board)});}
  return {ok:true,events};
 }
 get won(){return this.lines>=this.config.goal;}
 get stars(){return this.won?(this.turns<=this.config.par?3:this.turns<=this.config.par+4?2:1):0;}
 hint(){return moves(this.board,this.config).sort((a,b)=>b.groups.length-a.groups.length)[0];}
}

class PairGame extends Game{
 constructor(config,seed){super({...config,type:'sum'},seed);this.config={...config,goal:[4,6,8,10][config.level-1],par:20};this.board=this.generate();}
 generate(){
  if(this.config.type!=='pair')return super.generate();
  const board=[];for(let i=0;i<8;i++){const v=1+Math.floor(this.random()*9);board.push({v,text:String(v)},{v:10-v,text:String(10-v)});}
  for(let i=board.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[board[i],board[j]]=[board[j],board[i]];}return board;
 }
 swap(a,b){
  if(this.won||!Number.isInteger(a)||!Number.isInteger(b)||a===b||!this.board[a]||!this.board[b])return {ok:false,reason:'neighbor'};
  if(this.board[a].v+this.board[b].v!==10)return {ok:false,reason:'match'};
  this.history.push(this.snapshot());this.turns++;this.lines++;this.points+=20;this.maxChain=1;
  const tiles=[this.board[a],this.board[b]],cells=[a,b],group={cells,parts:tiles.map(t=>({text:t.text})),values:tiles.map(t=>t.v)};
  const events=[{kind:'swap',a,b,board:copy(this.board)},{kind:'clear',groups:[group],cells,chain:1}];
  cells.forEach(i=>this.board[i]=null);const from=[];
  for(let c=0;c<4;c++){const keep=[];for(let r=3;r>=0;r--)if(this.board[r*4+c])keep.push({tile:this.board[r*4+c],r});for(let r=3;r>=0;r--){const k=3-r;if(k<keep.length){this.board[r*4+c]=keep[k].tile;from[r*4+c]=keep[k].r;}else{this.board[r*4+c]=this.tile();from[r*4+c]=-(k-keep.length)-1;}}}
  events.push({kind:'fall',board:copy(this.board),from});if(!moves(this.board,this.config).length){this.board=this.generate();events.push({kind:'shuffle',board:copy(this.board)});}return {ok:true,events};
 }
 tile(){if(this.config.type!=='pair')return super.tile();const v=1+Math.floor(this.random()*9);return {v,text:String(v)};}
 get stars(){return this.won?3:0;}
}
