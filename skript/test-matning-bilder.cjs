const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome'});try{
for(const width of [1200,390]){
 const page=await browser.newPage({viewport:{width,height:844},hasTouch:width===390});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/matning/');await page.evaluate(()=>start(4));
 const missing=await page.evaluate(()=>[...Object.values(RIM).flat().map(r=>r[0]),...Object.values(LUCKA).flat().map(r=>r[0]),...Object.values(SKATT).flat().map(r=>r[0]),...UNITS.map(r=>r[0]),...Object.values(SORT).flat().map(r=>r[1])].filter(q=>!MatBild.subject(q)));assert.deepEqual(missing,[],'Every concrete situation has an illustration');
 const subjects=await page.evaluate(()=>[...new Set([...Object.values(RIM).flat().map(r=>r[0]),...Object.values(LUCKA).flat().map(r=>r[0]),...Object.values(SKATT).flat().map(r=>r[0]),...UNITS.map(r=>r[0]),...Object.values(SORT).flat().map(r=>r[1])].map(q=>MatBild.subject(q)))]);
 for(const id of subjects){assert(await page.evaluate(async id=>{const el=document.createElement('div');el.innerHTML=MatBild.img(id);const img=el.firstChild;try{await img.decode();return img.naturalWidth>0}catch{return false}},id),'Image missing: '+id)}
 for(const count of [2,3,6])for(const each of [1,2,3])for(const litres of [1,2]){
  await page.evaluate(({count,each,litres})=>{T={...rackerTask(),juice:{count,each,litres},a:count*each<=litres*10?'Ja, det räcker':'Nej, det räcker inte',tries:0,done:false};render()},{count,each,litres});
  assert.equal(await page.locator('.juice-servings figure').count(),count);assert.equal(await page.locator('.juice-result').count(),0);
  assert((await page.locator('.juice-servings figcaption').allTextContents()).every(t=>t===`${each} dl`));
  await page.locator('#choices button').filter({hasText:count*each<=litres*10?'Ja, det räcker':'Nej, det räcker inte'}).click();assert(await page.evaluate(()=>T.done));
  assert((await page.locator('.juice-result').innerText()).includes(`${count*each} dl`));
 }
 await page.evaluate(()=>{start(4);T={...rackerTask(),q:'Du har 1 l saft. 3 kompisar ska få 3 dl var. Räcker saften?',juice:{litres:1,each:3,count:3},a:'Ja, det räcker',tries:0,done:false};render()});
 await page.waitForFunction(()=>[...document.querySelectorAll('#stage img')].every(i=>i.complete&&i.naturalWidth));await page.screenshot({path:`/tmp/matning-saft-${width}.png`,fullPage:true});
 await page.locator('#choices button').filter({hasText:'Nej, det räcker inte'}).click();assert.equal(await page.locator('.juice-result').count(),0);assert.equal(await page.evaluate(()=>T.tries),1);
 await page.locator('#choices button').filter({hasText:'Ja, det räcker'}).click();assert.equal(await page.locator('.juice-result').count(),1);
 await page.evaluate(()=>{start(3);T={...sortTask('vikt'),tries:0,done:false};render()});assert.equal(await page.locator('.mat-sort-picture').count(),4);
 const order=await page.evaluate(()=>T.items.map((x,i)=>({i,v:x.v})).sort((a,b)=>a.v-b.v).map(x=>x.i));for(const i of order)await page.locator(`[data-s="${i}"]`).click();assert(await page.evaluate(()=>T.done&&T.right===1));
 await page.evaluate(()=>{start(2);T={...rimTask('len'),q:'En buss är 12 m lång. Är det rimligt?',a:'Rimligt',tries:0,done:false};render()});await page.waitForFunction(()=>[...document.querySelectorAll('#stage img')].every(i=>i.complete&&i.naturalWidth));await page.screenshot({path:`/tmp/matning-buss-${width}.png`,fullPage:true});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
 console.log(`${width}px: all subject images, quantities, hidden solution, correct/wrong answers and sorting passed`);await page.close();
}
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
