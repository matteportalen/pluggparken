const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({channel:'chrome'});try{
for(const width of [1440,390]){
 const p=await b.newPage({viewport:{width,height:844}});await p.goto(process.env.TEST_URL||'http://127.0.0.1:8765/sagobyggaren/');await p.waitForFunction(()=>window.__sb);
 await p.evaluate(()=>{window.print=()=>window.printCount=(window.printCount||0)+1});
 for(const id of ['guldringen','harenochskoldpaddan','manen']){
  await p.locator(`[data-series="${id}"]`).click();
  assert(await p.locator('#finish').isDisabled());
  await p.locator('#worksheetPrint').click();await p.waitForFunction(()=>document.body.classList.contains('worksheet-print'));
  const count=id==='manen'?3:4;
  assert.equal(await p.locator('.worksheet-row').count(),count);assert.equal(await p.locator('.worksheet-lines span').count(),count*5);
  await p.emulateMedia({media:'print'});
  const metrics=await p.locator('.worksheet-lines span').first().evaluate(el=>({height:el.getBoundingClientRect().height,width:el.getBoundingClientRect().width}));
  assert(metrics.height>=37,'10mm handwriting lines');
  if(width===1440)await p.pdf({path:`/tmp/skrivblad-${id}.pdf`,format:'A4',printBackground:true,preferCSSPageSize:true});
  await p.screenshot({path:`/tmp/skrivblad-${id}-${width}.png`,fullPage:true});
  await p.evaluate(()=>dispatchEvent(new Event('afterprint')));await p.emulateMedia({media:'screen'});
  assert(!await p.evaluate(()=>document.body.classList.contains('worksheet-print')));
  assert(await p.locator('#game').isVisible());assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await p.locator('#back').click();
 }
 await p.close();console.log(width+' worksheet blank print / five 10mm lines / return to editor OK');
}
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
