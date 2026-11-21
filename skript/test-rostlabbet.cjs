const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const URL=process.env.TEST_URL||'http://127.0.0.1:8765/rostlabbet/';
const slider=async(p,id,v)=>p.locator('#'+id).evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}))},String(v));
(async()=>{const b=await chromium.launch({channel:'chrome'});try{
 for(const width of [1200,390]){
  const p=await b.newPage({viewport:{width,height:width===390?844:760}}),errors=[],external=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith(new globalThis.URL(URL).origin))external.push(r.url())});
  await p.goto(URL);await p.waitForFunction(()=>window.__rost?.ready);await p.waitForTimeout(100);
  assert.equal(await p.evaluate(()=>__rost.audioState),'not-started','No autoplay');
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  // Pointer movement changes the same articulation as the accessible sliders.
  const h=await p.evaluate(()=>__rost.handles.find(h=>h.id==='tongue')),rect=await p.locator('#head').boundingBox();
  const before=await p.evaluate(()=>__rost.artic.tbX);await p.mouse.move(rect.x+h.x,rect.y+h.y);await p.mouse.down();await p.mouse.move(rect.x+h.x+16,rect.y+h.y-12,{steps:4});await p.mouse.up();
  assert.notEqual(await p.evaluate(()=>__rost.artic.tbX),before);assert.equal(await p.evaluate(()=>__rost.audioState),'not-started');
  await p.locator('[data-vowel="i"]').click();const i=await p.evaluate(()=>__rost.artic);await p.locator('[data-vowel="u"]').click();const u=await p.evaluate(()=>__rost.artic);assert.notDeepEqual(i,u);
  await p.locator('#play').click();await p.waitForFunction(()=>__rost.audioState==='running'&&__rost.telemetry?.t.outRms>0.0001);
  await p.waitForTimeout(300);assert(await p.evaluate(()=>__rost.sample().some(x=>Math.abs(x)>.0001)),'Real audio output');
  await slider(p,'pitch',300);await p.waitForFunction(()=>Math.abs(__rost.telemetry?.t.f0-300)<8);
  await p.locator('[data-mode="whisper"]').click();assert(await p.locator('#pitch').isDisabled());await p.waitForTimeout(500);assert(await p.evaluate(()=>__rost.sample().some(x=>Math.abs(x)>.00001)),'Whisper audio output');
  await p.locator('[data-mode="sing"]').click();assert.equal(await p.evaluate(()=>__rost.mode),'sing');assert(!await p.locator('#pitch').isDisabled());
  await slider(p,'volume',0);await p.waitForTimeout(500);assert(await p.evaluate(()=>__rost.sample().every(x=>Math.abs(x)<.00001)),'Volume zero is silent');
  await slider(p,'volume',35);await p.locator('#stop').click();await p.waitForTimeout(500);assert(!await p.evaluate(()=>__rost.playing));assert(await p.evaluate(()=>__rost.sample().every(x=>Math.abs(x)<.00001)));
  await p.locator('#play').click();await p.waitForFunction(()=>__rost.playing);await p.evaluate(()=>dispatchEvent(new Event('blur')));assert(!await p.evaluate(()=>__rost.playing),'Focus loss stops sound');
  await p.locator('#play').click();await p.waitForFunction(()=>__rost.playing);await p.evaluate(()=>{Ljud.set(false);document.dispatchEvent(new Event('mp-ljud'))});assert(!await p.evaluate(()=>__rost.playing),'Shared mute stops sound');
  await p.locator('#reset').click();assert.equal(await p.locator('#pitch').inputValue(),'170');assert.equal(await p.locator('#volume').inputValue(),'35');assert.equal(await p.evaluate(()=>__rost.mode),'normal');
  await p.locator('#next').click();assert.match(await p.locator('#experiment-count').innerText(),/2 AV 3/);
  await p.screenshot({path:`/tmp/rost-${width}.png`,fullPage:true});assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  console.log(`${width}px: drag, presets, actual WASM audio, pitch, whisper, singing, mute, reset, no external requests OK`);await p.close();
 }
 // A cancelled start must not begin playback when delayed AudioWorklet loading completes.
 const race=await b.newPage();await race.route('**/worklet/processor.js',async r=>{await new Promise(resolve=>setTimeout(resolve,500));await r.continue()});
 await race.goto(URL);await race.waitForFunction(()=>__rost.ready);await race.locator('#play').click();await race.locator('#stop').click();await race.waitForTimeout(1500);assert(!await race.evaluate(()=>__rost.playing));assert(await race.evaluate(()=>__rost.sample().every(x=>Math.abs(x)<.00001)));await race.close();
 const bad=await b.newPage();await bad.route('**/chimera.wasm',r=>r.abort());await bad.goto(URL);await bad.waitForFunction(()=>document.querySelector('#loading').textContent.includes('kunde inte'));assert(await bad.locator('#play').isDisabled());await bad.close();console.log('Cancelled startup and failed engine load handled');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
