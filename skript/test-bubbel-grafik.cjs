/* Local server on port 8765. Optional PLAYWRIGHT_PATH, BUBBEL_BASE_REF and BUBBEL_SCREENSHOTS.
   Baseline 8a1494a is the version before the visual-only change. */
const fs=require('node:fs'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const {execFileSync}=require('node:child_process');
const before=execFileSync('git',['show',(process.env.BUBBEL_BASE_REF||'8a1494a')+':spel/index.html'],{encoding:'utf8'}),after=fs.readFileSync('spel/index.html','utf8');
const core=s=>s.slice(s.indexOf('const BCOLS='),s.indexOf('/* ---------- Ritning (Bubbelskjutaren)'));
assert.equal(core(after),core(before),'Game logic/world generation changed');
assert.equal(after.slice(after.indexOf('<style>'),after.indexOf('</style>')),before.slice(before.indexOf('<style>'),before.indexOf('</style>')),'Existing styles changed');
const menu=s=>s.slice(s.indexOf('<div class="wrap" id="choose"'),s.indexOf('<div id="bub" hidden>'));
assert.equal(menu(after),menu(before),'Chooser changed');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
 let baseline;
 for(const old of [true,false]){
  const context=await browser.newContext({viewport,hasTouch:viewport.width<500,isMobile:viewport.width<500}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  if(old)await page.route('http://127.0.0.1:8765/spel/',r=>r.fulfill({contentType:'text/html',body:before}));
  await page.goto('http://127.0.0.1:8765/spel/#bub');await page.locator('#btnStart').click();await page.waitForFunction(()=>B&&VS);
  await page.evaluate(()=>Promise.all(Object.values(vImg).map(im=>im.complete?Promise.resolve():new Promise(r=>im.addEventListener('load',r,{once:true})))));
  const snapshots=await page.evaluate(()=>{
    cancelAnimationFrame(braf);let seed=71;Math.random=()=>((seed=seed*16807%2147483647)-1)/2147483646;
    const snapshots=[];
    for(const category of ['plus10','multi','div']){
      cat=category;
      for(let lvl=1;lvl<=6;lvl++){seed=lvl*101;bLevelStart(lvl);
        const snap={BL,cur:B.cur,next:B.next,g:JSON.stringify(B.g),shots:B.shots,traces:[.2,.6,1,Math.PI/2,2,2.7].map(a=>bTrace(a))};
        const angles=Array.from({length:100},(_,i)=>.14+i*(Math.PI-.28)/99);
        const right=angles.find(a=>{const tr=bTrace(a);if(!tr.cell)return false;return bNbrs(...tr.cell).some(([r,c])=>B.g[r][c]?.v===B.cur.a);});
        if(right!==undefined){B.ang=right;bFire();bLand();clearTimeout(bT);snap.land={right:B.right,wrong:B.wrong,pts:B.pts,shots:B.shots,g:JSON.stringify(B.g)};}
        snapshots.push(snap);
      }
    }
    cat='plus10';seed=71;bLevelStart(1);B.tip=false;document.getElementById('bubBan').classList.remove('show');bDraw();return snapshots;
  });
  if(old)baseline=snapshots;else assert.deepEqual(snapshots,baseline,'Layout or outcomes changed');
  if(!old){
    if(process.env.BUBBEL_SCREENSHOTS)await page.screenshot({path:process.env.BUBBEL_SCREENSHOTS+'/bubbel-'+viewport.width+'.png'});
    await page.evaluate(()=>{braf=requestAnimationFrame(bFrame);});
    const left=await page.evaluate(()=>B.shots);await page.keyboard.press('ArrowLeft');await page.keyboard.press(' ');await page.waitForTimeout(1300);
    assert(await page.evaluate(()=>B.right+B.wrong>0));
    await page.locator('#bubQuit').click();assert(await page.locator('#choose').isVisible());
  }
  assert.deepEqual(errors,[]);await context.close();
 }
 console.log(viewport.width+': identical rules, layout, traces and scoring across 18 boards; play/quit passed');
}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
