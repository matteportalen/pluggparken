const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const base='http://127.0.0.1:8765';
(async()=>{const b=await chromium.launch({channel:'chrome'});try{
for(const viewport of [{width:390,height:844},{width:1200,height:760},{width:375,height:667}]){
 const p=await b.newPage({viewport}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'/dubbelteckning/');await p.evaluate(()=>begin(1));await p.waitForFunction(()=>document.querySelector('#bild').complete&&document.querySelector('#bild').naturalWidth>0);
 assert.equal(await p.evaluate(()=>K.length+L.length),52);
 await p.evaluate(async()=>{for(const w of K.concat(L)){const i=new Image();i.src='bilder/'+w[1]+'.svg?v=2';await i.decode()}});
 await p.locator(`[data-o="${await p.evaluate(()=>G.q.x[3])}"]`).click();assert(await p.evaluate(()=>G.gjort));
 const dh=await p.evaluate(()=>document.documentElement.scrollHeight-innerHeight);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await p.screenshot({path:`/tmp/dubbel-bilder-${viewport.width}.png`,fullPage:true});
 await p.goto(base+'/geometri/');await p.evaluate(()=>start(AREAS.find(a=>a.id==='kroppar')));
 await p.evaluate(async()=>{for(const [name]of THINGS){const i=new Image();i.src='bilder/saker/'+name+'.svg';await i.decode()}});
 for(const options of [false,true]){
  await p.evaluate(options=>{let t;for(let n=0;n<500;n++){t=genKropparNamn();if(options?t.cls==='saker':t.html.includes('sakfraga'))break;}G.t=t;G.busy=false;render()},options);
  await p.waitForFunction(()=>[...document.querySelectorAll('#content img')].every(i=>i.complete&&i.naturalWidth));assert.equal(await p.locator('#content img').count(),options?4:1);
  await p.evaluate(()=>document.querySelector(`[data-o="${G.t.answer}"]`).click());assert(await p.evaluate(()=>G.busy));
  const help=await p.evaluate(()=>G.t.help().vis);assert(help.includes('bilder/saker/'));
 }
 await p.screenshot({path:`/tmp/kroppar-bilder-${viewport.width}.png`,fullPage:true});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
 console.log(viewport.width+'px: 52 word images, 12 objects, both question directions, correct answers and help OK; spelling scroll '+dh);await p.close();
}
const p=await b.newPage({viewport:{width:900,height:600}});await p.goto(base+'/geometri/');const html=await p.evaluate(()=>THINGS.map(([n])=>`<div style="background:white;border-radius:14px;padding:12px;text-align:center">${thingImg(n)}<div>${n}</div></div>`).join(''));await p.setContent('<base href="'+base+'/geometri/"><style>body{background:#eaf3ff;display:grid;grid-template-columns:repeat(6,1fr);gap:12px;font:16px Arial}img{width:110px;height:110px}</style>'+html);await p.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth));await p.screenshot({path:'/tmp/kroppar-alla.png'});
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
