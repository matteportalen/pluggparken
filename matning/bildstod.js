/* Illustrationer till vardagssituationer. Mått och antal kommer alltid från uppgiften. */
window.MatBild=(()=>{
 const sources={cat:'../varkatten/bilder/cat.webp',dog:'../varkatten/bilder/dog.webp',bed:'../varkatten/bilder/bed.webp'};
 const subjects=[[/mjölk/i,'milk'],[/lillfinger/i,'finger'],[/klassrum/i,'classroom'],[/fotbollsplan/i,'pitch'],[/flaggstång/i,'flag'],[/potatis/i,'potatoes'],[/vattenflask/i,'bottle'],[/badkar/i,'bath'],[/diskho/i,'sink'],[/godispås/i,'candy'],[/godisbit/i,'sweet'],[/fjäder/i,'feather'],[/giraff/i,'giraffe'],[/elefant/i,'elephant'],[/äpp/i,'apple'],[/banan/i,'banana'],[/katt/i,'cat'],[/hund/i,'dog'],[/cykel/i,'bicycle'],[/vuxen/i,'adult'],[/gem/i,'clip'],[/bok|böcker/i,'book'],[/dörr/i,'door'],[/penna|pennan/i,'pencil'],[/buss/i,'bus'],[/säng/i,'bed'],[/myr/i,'ant'],[/linjal/i,'ruler'],[/kopp/i,'cup'],[/hink/i,'bucket'],[/sked/i,'spoon'],[/glas/i,'glass'],[/balja/i,'basin'],[/mormors stad|till skolan/i,'town']];
 const subject=text=>subjects.find(([re])=>re.test(text))?.[1];
 const img=(id,cls='')=>`<img class="mat-picture ${cls}" src="${sources[id]||'bilder/'+id+'.webp'}" alt="" draggable="false">`;
 function render(t){
  if(t.juice){const {litres,each,count}=t.juice,total=each*count,available=litres*10;
   return `<div class="juice-scene"><figure class="juice-jug">${img('jug')}<figcaption>${litres} l saft</figcaption></figure><div class="juice-servings" aria-label="${count} glas, ${each} deciliter till varje kompis">${Array.from({length:count},()=>`<figure>${img('glass')}<figcaption>${each} dl</figcaption></figure>`).join('')}</div>${t.done?`<p class="juice-result">${count} · ${each} dl = ${total} dl<br>${total<=available?`${available-total} dl blir över.`:`Det saknas ${total-available} dl.`}</p>`:''}</div>`;
  }
  const id=subject(t.q||'');return id?`<div class="mat-illustration">${img(id)}</div>`:'';
 }
 return{subject,img,render};
})();
