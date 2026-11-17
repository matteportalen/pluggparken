import assert from 'node:assert/strict';
import {Game,WORLDS,level,matches,moves} from '../spel/talkross/motor.mjs';
for(const world of WORLDS){
 for(let seed=1;seed<=80;seed++){
  const g=new Game(level(world.id,1+(seed%4)),seed);
  assert.equal(matches(g.board,g.config).length,0);assert(moves(g.board,g.config).length);
  const original=g.snapshot();assert.equal(g.swap(0,35).ok,false);assert.deepEqual(g.snapshot(),original);
  for(let turns=0;turns<100&&!g.won;turns++){
   for(const t of g.board){if(t.fr)assert.equal(t.fr[0]/t.fr[1],t.v);
    else if(t.text.includes(' + '))assert.equal(t.text.split(' + ').map(Number).reduce((a,b)=>a+b),t.v);
    else if(t.text.includes(' − ')){const[a,b]=t.text.split(' − ').map(Number);assert.equal(a-b,t.v);}
    else if(t.text.includes(' · ')){const[a,b]=t.text.split(' · ').map(Number);assert.equal(a*b,t.v);}
   }
   const before=g.snapshot(),h=g.hint(),events=g.swap(h.a,h.b);assert(events.ok);assert(events.events.length>=3);
   const after=g.snapshot();assert(g.undo());assert.deepEqual(g.snapshot(),before);g.swap(h.a,h.b);assert.deepEqual(g.snapshot(),after);
   assert.equal(matches(g.board,g.config).length,0);assert(moves(g.board,g.config).length);
  }
  assert(g.won,world.id+' seed '+seed);assert(g.stars>=1&&g.stars<=3);
 }
 console.log(world.id+': 80 seeds, expressions, complete games, stable refills and exact undo passed');
}
const board=Array.from({length:36},()=>({v:9,text:'9'}));[2,3,5,2].forEach((v,i)=>board[i]={v,text:String(v)});
const overlap=matches(board,level('tio'));assert.equal(overlap.length,2);assert.equal(new Set(overlap.flatMap(g=>g.cells)).size,4);
console.log('overlapping triples counted and cleared as a union');
