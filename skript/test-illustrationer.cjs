/* Kör med Playwright tillgängligt i NODE_PATH och lokal server på :8765. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.BASE_URL||'http://127.0.0.1:8765';
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 for(const viewport of [{width:1200,height:844},{width:390,height:844}]){
  const page=await browser.newPage({viewport});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/engelskaord/');
  const loaded=await page.evaluate(()=>PPBild.preload(PPBild.names));
  assert.equal(loaded.length,52);assert(loaded.every(Boolean),'Alla bilder ska laddas');
  await page.evaluate(()=>{starta(1);G.U=G.kv.find(u=>u.typ==='las'||u.typ==='lyssna');ritaFraga();ritaYta();});
  const correct=await page.evaluate(()=>G.U.val.findIndex(o=>o[0]===G.U.en));
  assert(await page.locator('#rutor img').count()>0);
  await page.locator(`#rutor [data-i="${correct}"]`).click();
  assert(await page.evaluate(()=>G.last));
  await page.screenshot({path:`/tmp/engelska-${viewport.width}.png`});
  await page.goto(base+'/brak/');await page.locator('[data-a="antal"]').click();
  const total=await page.locator('.things .tok').count();assert(total>0);
  await page.locator('.things .tok').first().click();
  assert.equal(await page.locator('.plate .tok').count(),1);
  await page.locator('.plate .tok').click();
  assert.equal(await page.locator('.things .tok').count(),total);
  const token=await page.locator('.things .tok').first().boundingBox();
  const plate=await page.locator('.plate').first().boundingBox();
  await page.mouse.move(token.x+token.width/2,token.y+token.height/2);await page.mouse.down();
  await page.mouse.move(plate.x+plate.width/2,plate.y+plate.height/2,{steps:8});await page.mouse.up();
  assert.equal(await page.locator('.plate .tok').count(),1);
  await page.locator('#reset').click();assert.equal(await page.locator('.things .tok').count(),total);
  assert.equal(await page.locator('.things img').count(),total);
  await page.screenshot({path:`/tmp/brak-${viewport.width}.png`});
  const answer=await page.evaluate(()=>String(G.t.answer));
  for(const n of answer)await page.locator(`[data-k="${n}"]`).click();
  await page.locator('[data-k="ok"]').click();assert(await page.evaluate(()=>G.busy));
  await page.goto(base+'/flytasjunka/');await page.evaluate(()=>PPBild.preload(PPBild.names));
  await page.evaluate(()=>starta(1));
  assert(await page.evaluate(()=>__fs.objs.every(o=>!o.e||PPBild.get(o.e).naturalWidth>0)));
  await page.waitForTimeout(300);
  await page.screenshot({path:`/tmp/flyta-${viewport.width}.png`});
  await page.locator('[data-g="flyter"]').click();
  await page.waitForTimeout(900);
  assert(await page.evaluate(()=>__fs.objs.length>0));
  await page.goto(base+'/ovriga/ordgomma/');
  for(const theme of ['djur','frukt','kropp']){
   await page.evaluate(id=>OG.starta(OG.TEMAN.find(t=>t.id===id)),theme);
   assert(await page.locator('#grid span').count()>0);
   assert(await page.evaluate(()=>OG.G().t.em.every(e=>!!PPBild.src(e))));
  }
  await page.screenshot({path:`/tmp/ordgomma-${viewport.width}.png`});
  assert.deepEqual(errors,[]);await page.close();
 }
 await browser.close();console.log('52 bilder, engelskt bildval, bråk (tryck/dra/återställ/svar), flyta och tre ordteman: OK på mobil och dator.');
})().catch(e=>{console.error(e);process.exit(1)});
