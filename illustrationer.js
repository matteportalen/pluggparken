/* Gemensamma rasterillustrationer: se bilder/illustrationer/PROMPTS.md. */
window.PPBild=(()=>{
 const root=new URL('bilder/illustrationer/',document.currentScript.src).href;
 const names='apple spoon cork cat dog bird fish horse cow pig frog house sun moon star tree flower banana book car bus bike eye ear nose hand foot mouth milk bread cheese egg coin ice leaf key potato log swimmer strawberry cupcake cookie cherry carrot lemon donut pear grapes broccoli watermelon corn cucumber'.split(' ');
 const map={'🍎':'apple','🥄':'spoon','🐱':'cat','🐈':'cat','🐶':'dog','🐦':'bird','🐟':'fish','🐴':'horse','🐮':'cow','🐷':'pig','🐸':'frog','🏠':'house','☀️':'sun','🌙':'moon','⭐':'star','🌳':'tree','🌼':'flower','🍌':'banana','📖':'book','📚':'book','🚗':'car','🚌':'bus','🚲':'bike','👁️':'eye','👀':'eye','👂':'ear','👃':'nose','✋':'hand','🦶':'foot','👄':'mouth','🥛':'milk','🍞':'bread','🧀':'cheese','🥚':'egg','🪙':'coin','🧊':'ice','🍃':'leaf','🔑':'key','🥔':'potato','🪵':'log','🏊':'swimmer','🍓':'strawberry','🧁':'cupcake','🍪':'cookie','🍒':'cherry','🥕':'carrot','🍋':'lemon','🍩':'donut','🍐':'pear','🍇':'grapes','🥦':'broccoli','🍉':'watermelon','🌽':'corn','🥒':'cucumber'};
 const id=value=>map[value]||(names.includes(value)?value:null);
 const src=value=>id(value)?root+id(value)+'.webp':null;
 const html=value=>src(value)?`<img class="pp-bild" src="${src(value)}" alt="" draggable="false">`:value;
 const cache=new Map();
 function get(value){const key=id(value);if(!key)return null;if(!cache.has(key)){const image=new Image();image.src=src(key);cache.set(key,image);}return cache.get(key);}
 const preload=values=>Promise.all(values.map(value=>{const image=get(value);return image?image.decode().then(()=>true,()=>false):Promise.resolve(false)}));
 return{id,src,html,get,preload,names};
})();
