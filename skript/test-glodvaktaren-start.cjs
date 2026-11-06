// Run against the published site too: a plain local server does not reproduce Jekyll's file filtering.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
  const base=process.argv[2]||'http://127.0.0.1:8765';
  const browser=await chromium.launch();
  try{
    const page=await browser.newPage(),errors=[],failed=[],helpers=new Set();
    page.on('pageerror',e=>errors.push(e.message));
    page.on('requestfailed',r=>failed.push(`${r.url()}: ${r.failure()?.errorText}`));
    page.on('response',r=>{if(r.status()>=400)failed.push(`${r.status()}: ${r.url()}`);if(new URL(r.url()).pathname.endsWith('/_lib.js')&&r.ok())helpers.add(new URL(r.url()).pathname)});
    await page.goto(new URL('/spel/glodvaktaren/',base).href);
    await page.waitForFunction(()=>window.MPGlod?.ready,{},{timeout:20000});
    assert(helpers.size>=5,'The published site must serve all imported _lib.js helpers');
    await page.getByRole('button',{name:'Börja äventyret →',exact:true}).click();
    assert(await page.locator('#game').isVisible());
    assert.equal(await page.locator('#home').isVisible(),false);
    const before=await page.evaluate(()=>MPGlod.state().x);
    await page.keyboard.down('ArrowRight');
    await page.waitForFunction(x=>MPGlod.state().x>x+30,before);
    await page.keyboard.up('ArrowRight');
    assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
    console.log(`Start button / movement / ${helpers.size} library helpers / no failed requests or JS errors OK: ${base}`);
  }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
