/* Illustrated drag builder. Normalized positions keep the same monster across screen sizes. */
(function(){
const ASSET={ogon:'eye',armar:'arm',ben:'leg',horn:'horn',mun:'mouth'};
const NAMES={ogon:'öga',armar:'arm',ben:'ben',horn:'horn',mun:'mun'};
const LIMIT={ogon:6,armar:6,ben:4,horn:3};
const HUE={green:35,red:-70,blue:150,yellow:-15,purple:210,orange:-40,pink:245};
let uid=0;
function defaults(m){const out=[];const add=(k,x,y,v)=>out.push({id:++uid,k,x,y,v});
 for(let i=0;i<m.armar;i++)add('armar',i%2?82:18,44+Math.floor(i/2)*13);
 for(let i=0;i<m.ben;i++)add('ben',50+(i-(m.ben-1)/2)*13,84);
 for(let i=0;i<m.horn;i++)add('horn',50+(i-(m.horn-1)/2)*14,20);
 for(let i=0;i<m.ogon;i++){const n=Math.min(m.ogon,3),row=Math.floor(i/3),nr=row?m.ogon-3:n;add('ogon',50+(i%3-(nr-1)/2)*13,40+row*12)}
 if(m.mun)add('mun',50,65,m.mun);return out;
}
function partHTML(p,color,interactive=false,selected=false){const skin=p.k==='armar'||p.k==='ben',flip=p.k==='armar'&&p.x>50;
 return `<${interactive?'button':'span'} ${interactive?'type="button"':''} class="monster-part ${p.k} ${p.v||''}${selected?' chosen':''}" data-id="${p.id}" style="left:${p.x}%;top:${p.y}%;--mirror:${flip?-1:1};--hue:${skin?HUE[color]:0}deg" ${interactive?`aria-label="Flytta ${NAMES[p.k]}${p.v==='big'?' (stor)':p.v==='small'?' (liten)':''}" aria-pressed="${selected}"`:''}><img src="bilder/${ASSET[p.k]}.webp" alt="" draggable="false"></${interactive?'button':'span'}>`;
}
function picture(m,parts=defaults(m),interactive=false,selected=null){return `<div class="monster-art${interactive?' editable':''}" ${interactive?'tabindex="0" role="group" aria-label="Byggyta. Välj en del och tryck här, eller dra en del hit. Piltangenter flyttar vald del; Delete tar bort den."':'role="img" aria-label="Ditt byggda monster"'}><div class="monster-shadow"></div><img class="monster-body" src="bilder/body.webp" alt="" draggable="false" style="--hue:${HUE[m.farg]}deg">${parts.map(p=>partHTML(p,m.farg,interactive,p.id===selected)).join('')}</div>`}
function mount(host,options){let parts=options.parts,selected=null,pending=null,gesture=null,undo=[],live=true,scrollFrame=0;
 const model=options.model;
 const hint=options.hint;
 function tell(text){hint.textContent=text}
 function sync(){for(const k of Object.keys(LIMIT))model[k]=parts.filter(p=>p.k===k).length;model.mun=parts.find(p=>p.k==='mun')?.v||null;options.changed(parts);}
 function snapshot(){undo.push({parts:parts.map(p=>({...p})),farg:model.farg});if(undo.length>30)undo.shift()}
 function render(){host.innerHTML=picture(model,parts,true,selected);options.controls?.(selected,undo.length);}
 function clearChoice(){pending=null;options.choice(null)}
 function point(e){const r=host.querySelector('.monster-art').getBoundingClientRect();return {x:Math.max(7,Math.min(93,(e.clientX-r.left)/r.width*100)),y:Math.max(8,Math.min(92,(e.clientY-r.top)/r.height*100)),inside:e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom}}
 function add(k,v,q){if(LIMIT[k]&&parts.filter(p=>p.k===k).length>=LIMIT[k]){tell(`Du kan ha högst ${LIMIT[k]} ${({ogon:'ögon',armar:'armar',ben:'ben',horn:'horn'})[k]}. Flytta eller ta bort en del först.`);return false}snapshot();if(k==='mun')parts=parts.filter(p=>p.k!=='mun');const p={id:++uid,k,v,x:q.x,y:q.y};parts.push(p);selected=p.id;sync();render();tell('Delen sitter där! Du kan flytta den eller välja Ta bort.');return true}
 function movePart(id,q){const p=parts.find(p=>p.id===id);if(!p)return;p.x=q.x;p.y=q.y;const el=host.querySelector(`[data-id="${id}"]`);if(el){el.style.left=q.x+'%';el.style.top=q.y+'%';el.style.setProperty('--mirror',p.k==='armar'&&q.x>50?-1:1)}}
 function down(e){if(!live||options.locked()||e.button>0)return;const b=e.target.closest('[data-id],[data-part]');if(!b)return;if(pending&&b.dataset.id)return;const id=Number(b.dataset.id)||null;gesture={pointer:e.pointerId,id,k:b.dataset.part,v:b.dataset.variant||undefined,x:e.clientX,y:e.clientY,drag:false,origin:id?{...parts.find(p=>p.id===id)}:null,target:b};b.setPointerCapture?.(e.pointerId);e.preventDefault();}
 function edgeScroll(){if(!gesture?.drag)return;const y=gesture.clientY,dy=y<140?-10:y>innerHeight-65?10:0;if(dy)window.scrollBy(0,dy);scrollFrame=requestAnimationFrame(edgeScroll)}
 function moving(e){const g=gesture;if(!g||g.pointer!==e.pointerId)return;if(!g.drag&&Math.hypot(e.clientX-g.x,e.clientY-g.y)>7){g.drag=true;g.clientY=e.clientY;scrollFrame=requestAnimationFrame(edgeScroll);if(g.id)snapshot();else{const im=document.createElement('img');im.className='part-ghost';im.src='bilder/'+ASSET[g.k]+'.webp';document.body.appendChild(im);g.ghost=im}}
  if(!g.drag)return;g.clientY=e.clientY;e.preventDefault();if(g.ghost){g.ghost.style.left=e.clientX+'px';g.ghost.style.top=e.clientY+'px'}else movePart(g.id,point(e));}
 function release(e,cancel=false){const g=gesture;if(!g||g.pointer!==e.pointerId)return;gesture=null;cancelAnimationFrame(scrollFrame);g.ghost?.remove();if(g.target.hasPointerCapture?.(e.pointerId))g.target.releasePointerCapture(e.pointerId);
  if(cancel){if(g.drag&&g.id){Object.assign(parts.find(p=>p.id===g.id),g.origin);undo.pop();render()}return}
  if(g.drag){const q=point(e);if(g.id){if(!q.inside){Object.assign(parts.find(p=>p.id===g.id),g.origin);undo.pop()}selected=g.id;sync();render();clearChoice()}else if(q.inside){add(g.k,g.v,q);clearChoice()}return}
  if(g.id){selected=g.id;clearChoice();render();tell('Vald del. Dra för att flytta, eller välj Ta bort.')}else choose(g.k,g.v);
 }
 function choose(k,v){if(options.locked())return;pending={k,v};selected=null;options.choice(pending);render();tell('Tryck på monstret där delen ska sitta. Du kan också dra delen direkt.')}
 function stageClick(e){if(!pending||options.locked())return;const q=point(e);if(q.inside&&add(pending.k,pending.v,q)){clearChoice();e.stopImmediatePropagation()}}
 function key(e){if(options.locked())return;const el=e.target.closest('[data-id]');if(el)selected=+el.dataset.id;
  if(e.key==='Escape'){clearChoice();selected=null;render();return}
  if(e.key==='Delete'||e.key==='Backspace'){if(selected){e.preventDefault();remove()}return}
  if(pending&&(e.key==='Enter'||e.key===' ')){e.preventDefault();if(add(pending.k,pending.v,{x:50,y:50}))clearChoice();return}
  const dirs={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]},d=dirs[e.key],p=parts.find(p=>p.id===selected);if(d&&p){e.preventDefault();snapshot();movePart(p.id,{x:Math.max(7,Math.min(93,p.x+d[0]*(e.shiftKey?5:2))),y:Math.max(8,Math.min(92,p.y+d[1]*(e.shiftKey?5:2)))});sync();options.controls?.(selected,undo.length)}
 }
 function remove(){if(!selected||options.locked())return;snapshot();parts=parts.filter(p=>p.id!==selected);selected=null;sync();render();tell('Delen är borttagen.')}
 host.addEventListener('pointerdown',down);options.tray.addEventListener('pointerdown',down);window.addEventListener('pointermove',moving,{passive:false});window.addEventListener('pointerup',release);const cancel=e=>release(e,true);window.addEventListener('pointercancel',cancel);host.addEventListener('click',stageClick);host.addEventListener('keydown',key);
 // Keyboard activation of a placed part selects it, matching pointer/touch selection.
 function selectKey(e){if(e.detail===0&&e.target.closest('[data-id]')){selected=+e.target.closest('[data-id]').dataset.id;clearChoice();render()}}
 host.addEventListener('click',selectKey);
 function trayKey(e){if(e.detail===0){const b=e.target.closest('[data-part]');if(b)choose(b.dataset.part,b.dataset.variant||undefined)}}
 options.tray.addEventListener('click',trayKey);
 render();return {render,remove,color(value){if(options.locked())return;snapshot();model.farg=value;sync();render()},undo(){if(options.locked()||!undo.length)return;const old=undo.pop();parts=old.parts;model.farg=old.farg;selected=null;clearChoice();sync();render()},destroy(){live=false;cancelAnimationFrame(scrollFrame);gesture?.ghost?.remove();gesture=null;host.removeEventListener('pointerdown',down);options.tray.removeEventListener('pointerdown',down);window.removeEventListener('pointermove',moving);window.removeEventListener('pointerup',release);window.removeEventListener('pointercancel',cancel);host.removeEventListener('click',stageClick);host.removeEventListener('keydown',key);host.removeEventListener('click',selectKey);options.tray.removeEventListener('click',trayKey)}};
}
window.MonsterBygge={picture,defaults,mount};
})();
