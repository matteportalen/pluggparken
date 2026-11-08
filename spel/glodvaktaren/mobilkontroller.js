/* Local multi-pointer controls. Keyboard and the shared platform engine stay intact. */
window.GlodTouch={mount({input,active,actions}){
 const root=document.querySelector('.ktrl'),pointers=new Map(),buttons=[...root.querySelectorAll('button')],move=root.querySelector('.move-controls');
 const keys=['v','h','u'];function sync(){for(const k of keys){input[k]=[...pointers.values()].some(p=>p.key===k);const b=root.querySelector(`[data-k="${k}"]`);b?.classList.toggle('pa',input[k])}}
 function reset(){pointers.clear();for(const k of keys)input[k]=false;input.uT=false;buttons.forEach(b=>b.classList.remove('pa'))}
 root.addEventListener('pointerdown',e=>{const b=e.target.closest('button');if(!b)return;e.preventDefault();e.stopImmediatePropagation();if(!active())return;const key=b.dataset.k;if(key){if(key==='u'&&!input.u)input.uT=true;pointers.set(e.pointerId,{key,move:key!=='u'});sync()}else{b.classList.add('pa');pointers.set(e.pointerId,{button:b});actions[b.id]?.()}try{b.setPointerCapture(e.pointerId)}catch{}},true);
 root.addEventListener('pointermove',e=>{const p=pointers.get(e.pointerId);if(!p?.move)return;e.preventDefault();if(!active()){reset();return}const r=move.getBoundingClientRect();p.key=e.clientX<r.left-18||e.clientX>r.right+18||e.clientY<r.top-30||e.clientY>r.bottom+30?null:e.clientX<r.left+r.width/2?'v':'h';sync()},true);
 function release(e){const p=pointers.get(e.pointerId);if(!p)return;e.stopImmediatePropagation();p.button?.classList.remove('pa');pointers.delete(e.pointerId);sync()}
 for(const type of ['pointerup','pointercancel','lostpointercapture'])root.addEventListener(type,release,true);
 root.addEventListener('click',e=>{if(e.detail>0){e.preventDefault();e.stopImmediatePropagation()}},true);
 return {reset};
}};
