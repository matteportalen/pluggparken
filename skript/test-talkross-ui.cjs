const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});try{
for(const width of [1440,390]){
 const context=await b.newContext({viewport:{width,height:width===390?844:1000},hasTouch:width===390,isMobile:width===390,reducedMotion:'reduce'}),p=await context.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:8765/spel/talkross/');await p.waitForFunction(()=>window.__talkross);
 assert.equal(await p.locator('.level').count(),24);assert.equal(await p.locator('.level:not(:disabled)').count(),6);
 await p.evaluate(()=>__talkross.start('tio',1));assert(await p.locator('#game').isVisible());
 const state=()=>p.evaluate(()=>__talkross.game.snapshot());
 const before=await state(),hint=await p.evaluate(()=>__talkross.game.hint());
 if(width===390){
  const a=await p.locator('.tile').nth(hint.a).boundingBox(),c=await p.locator('.tile').nth(hint.b).boundingBox();
  const session=await context.newCDPSession(p);
  await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:a.x+a.width/2,y:a.y+a.height/2}]});
  await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:c.x+c.width/2,y:c.y+c.height/2}]});
  await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 }else{
  await p.locator('.tile').nth(hint.a).focus();await p.keyboard.press('Enter');await p.locator('.tile').nth(hint.b).focus();await p.keyboard.press('Enter');
 }
 await p.waitForFunction(()=>__talkross.game.turns===1&&!__talkross.busy);
 if(await p.locator('#game').isVisible()){await p.locator('#undo').click();assert.deepEqual(await state(),before);}
 await p.evaluate(()=>__talkross.start('tio',1));
 // Finish four stages through the production async resolver and check world awards.
 for(let n=1;n<=4;n++){
  if(n>1){await p.waitForTimeout(700);await p.locator('#next').click();}
  for(let k=0;k<100;k++){
   if(await p.evaluate(()=>__talkross.game.won))break;
   await p.evaluate(async()=>{const h=__talkross.game.hint();await __talkross.play(h.a,h.b);});
  }
  assert(await p.locator('#result').isVisible());
 }
 const saved=await p.evaluate(()=>__talkross.data);assert(saved.stars.tio>=1);assert.equal(Object.keys(saved.betyg).length,4);
 await p.reload();await p.waitForFunction(()=>window.__talkross);assert.deepEqual(await p.evaluate(()=>__talkross.data),saved);
 for(const id of ['tio','tjugo','hundra','lika','tabell']){
  await p.evaluate(id=>__talkross.start(id,id==='tabell'?3:1),id);
  assert.equal(await p.locator('.tile').count(),36);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  if(id==='tabell')assert(await p.locator('.tile .frac').count()>0);
 }
 await p.evaluate(()=>__talkross.start('lika',1));await p.locator('#hint').click();assert.equal(await p.locator('.hinted').count(),2);
 if(process.env.TALKROSS_SCREENSHOTS){require('node:fs').mkdirSync(process.env.TALKROSS_SCREENSHOTS,{recursive:true});await p.screenshot({path:process.env.TALKROSS_SCREENSHOTS+'/talkross-'+width+'.png',fullPage:true});}
 await p.locator('#back').click();assert(await p.locator('#choose').isVisible());
 assert.deepEqual(errors,[]);console.log(width+': input, undo, four stages, world stars, reload, all modes and hints passed');await context.close();
}
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
