/* Kartan över De glömda djupen i journalen: besökta rum, "du är här", låsta gångar och dörrlistan. */
const assert=require('node:assert/strict'),{chromium}=require('playwright');const{begin}=require('./depth-test-helpers.cjs');const URL=process.env.BASE_URL||'http://127.0.0.1:8765',UT=process.env.UT||'/tmp';
const spar=depth=>({mode:'plus',campaigns:{plus:{region:'depths',cityRestored:true,passWon:true,won:true,portalUnlocked:true,boots:true,depth}}});
(async()=>{const b=await chromium.launch();try{for(const[namn,vp]of[['dator',{width:1280,height:850}],['mobil',{width:390,height:844}]]){
  const p=await b.newPage({viewport:vp}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  const oppna=async depth=>{await p.goto(URL+'/spel/glodvaktaren/');await p.evaluate(d=>localStorage.setItem('mattespel-glodvaktaren-v1',JSON.stringify(d)),spar(depth));await p.reload();await p.waitForFunction(()=>MPGlod.ready&&MPGlod.depthsReady());await begin(p);await p.click('#journal');await p.waitForSelector('.depth-map svg')};
  // Början: två rum hittade, resten "?"
  await oppna({room:'hall',visited:['shaft','hall']});
  assert.equal(await p.locator('.dm-rum.okand').count(),7);assert.equal(await p.locator('.dm-rum.nu').count(),1);
  assert.equal(await p.locator('.dm-rad.nu').textContent(),'DU ÄR HÄR');assert.equal(await p.locator('.dm-rad.kvar').count(),0);
  assert.equal(await p.locator('.dm-gang').count(),3,'gångar från kända rum');assert.equal(await p.locator('.dm-gang.last').count(),1,'pumprummet är låst');
  let d=await p.locator('.dm-dorrar li').allTextContents();assert.equal(d.length,3);assert(d[0].includes('Vänster')&&d[0].includes('Klockhissen'));assert(d[1].includes('Höger')&&d[1].includes('låst tills Motvikten'));assert(d[2].includes('Uppe')&&d[2].includes('Bostäderna'));
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));const box=await p.locator('.depth-map svg').boundingBox();assert(box.width<=vp.width&&box.width>250);
  const liten=await p.evaluate(()=>Math.min(...[...document.querySelectorAll('.dm-namn:not(.okand)')].map(t=>t.getBoundingClientRect().height)));assert(liten>=8,'namnen går att läsa: '+liten);
  const ut=await p.evaluate(()=>[...document.querySelectorAll('.depth-map svg rect.dm-rum')].some((r,i)=>{const t=r.parentNode.querySelectorAll('text.dm-namn')[i],a=r.getBoundingClientRect(),c=t.getBoundingClientRect();return c.left<a.left||c.right>a.right}));assert(!ut,'namnen ryms i rutorna');
  assert.equal(await p.evaluate(()=>document.querySelector('.talk-box').scrollTop),0,'journalen öppnas överst');await p.locator('.talk-box').screenshot({path:`${UT}/karta-${namn}-1.png`});
  // Långt in: nästan allt hittat, vissa pussel lösta
  await oppna({room:'cistern',visited:['shaft','hall','pump','archive','quarters','gallery','cistern'],solved:['balance','pump','archive','bridge']});
  assert.equal(await p.locator('.dm-rum.okand').count(),2);assert.equal(await p.locator('.dm-rad.klar').count(),4);
  assert.equal(await p.locator('.dm-gang.last').count(),2,'bakvägen och kedjekammaren är låsta');assert.equal(await p.locator('.dm-gang').count(),8);
  d=await p.locator('.dm-dorrar li').allTextContents();assert(d[1].includes('Kedjekammaren')&&d[1].includes('låst tills Cisternens fördelare'));
  assert.equal(await p.evaluate(()=>document.querySelector('.talk-box').scrollTop),0,'journalen öppnas överst');await p.locator('.talk-box').screenshot({path:`${UT}/karta-${namn}-2.png`});
  assert.deepEqual(errors,[]);await p.close()}
  console.log('Kartan i Djupen: ok')}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
