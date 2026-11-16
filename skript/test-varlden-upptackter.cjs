/* Run with a local HTTP server. PLAYWRIGHT_PATH may point to a bundled installation.
   WORLD_URL defaults to http://127.0.0.1:8765/varlden/. */
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const path=require('node:path');
const fs=require('node:fs');
(async()=>{
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
  try{
    for(const config of [
      {name:'desktop',viewport:{width:1440,height:900}},
      {name:'mobile',viewport:{width:390,height:844},isMobile:true,hasTouch:true},
      {name:'reduced-low',viewport:{width:1100,height:800},reducedMotion:'reduce',low:true}
    ]){
      const {name,low,...options}=config,context=await browser.newContext(options),page=await context.newPage(),errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      if(low)await page.addInitScript(()=>localStorage.setItem('mp-varlden-lagt','1'));
      await page.goto(process.env.WORLD_URL||'http://127.0.0.1:8765/varlden/');
      await page.waitForFunction(()=>window.__varlden);
      const scene=async id=>{await page.evaluate(id=>__varlden.laddaScen(id),id);await page.waitForTimeout(80);};
      const station=async id=>page.evaluate(id=>{const st=__varlden.S.upptackter.stations.find(s=>s.id===id);return st&&{x:st.x,y:st.y,z:st.z,r:st.r};},id);
      const move=async(x,y,z)=>{await page.evaluate(({x,y,z})=>{__varlden.placera(x,z,Math.PI);__varlden.P.y=y;},{x,y,z});await page.waitForTimeout(100);};
      const act=async (id,index=0)=>{const a=await page.evaluate(({id,index})=>{const a=__varlden.S.upptackter.actions.filter(a=>a.station===id)[index];return a&&{x:a.x,y:a.y,z:a.z};},{id,index});
        assert(a,'Missing action '+id+'/'+index);await move(a.x,a.y,a.z);
        await page.waitForFunction(()=>!document.getElementById('prompt').hidden);
        if(config.hasTouch)await page.locator('#prompt').tap();else await page.keyboard.press('Enter');await page.waitForTimeout(80);
      };
      const seen=async id=>page.evaluate(id=>__varlden.SV.seen.includes('lek-'+id),id);
      const expected={hub:1,matte:1,svenska:2,spel:2,so:1,no:1,kroppen:1,fler:1,extra:1,bio:0};
      for(const [id,n]of Object.entries(expected)){
        await scene(id);
        const result=await page.evaluate(()=>{const s=__varlden.S;return {
          count:s.upptackter.stations.length,
          outside:s.upptackter.stations.filter(st=>Math.hypot(st.x,st.z)+st.r+2>s.randR(Math.atan2(st.z,st.x))).map(st=>st.id),
          blocked:s.upptackter.stations.filter(st=>s.portaler.some(po=>Math.hypot(st.x-po.g.position.x,st.z-po.g.position.z)<st.r+5)).map(st=>st.id)
        };});
        assert.equal(result.count,n,id+' station count');assert.deepEqual(result.outside,[],id+' outside coast');assert.deepEqual(result.blocked,[],id+' overlaps portal');
      }
      await scene('rymdlabbet');assert.equal(await page.evaluate(()=>__varlden.S.klot),true);
      await scene('matte');await act('brakbro',0);await act('brakbro',1);assert(await seen('brakbro'));
      await scene('svenska');let st=await station('ordros');
      for(const dx of [-2.5,0,2.5])await move(st.x+dx,st.y,st.z+2);assert(await seen('ordros'));
      await scene('spel');st=await station('kulkedja');await move(st.x-4,st.y,st.z+3);await page.waitForTimeout(3400);assert(await seen('kulkedja'));
      await scene('so');await act('ljusblommor');await act('ljusblommor');assert(await seen('ljusblommor'));
      await scene('fler');for(let i=0;i<7;i++)await act('puttalada');assert(await seen('puttalada'));
      await scene('extra');await act('tonminne');await page.waitForTimeout(3700);st=await station('tonminne');
      for(const i of [0,2,1,0])await move(st.x+(i-1)*2.5,st.y,st.z+2);assert(await seen('tonminne'));
      await scene('no');await act('vattenhjul',1);assert.equal(await page.evaluate(()=>__varlden.S.upptackter.riding),false,'lift must require water');
      await act('vattenhjul',0);await act('vattenhjul',1);assert(await page.evaluate(()=>__varlden.S.upptackter.riding));
      await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>__varlden.S.upptackter.riding),false);
      await act('vattenhjul',1);await page.waitForFunction(()=>!__varlden.S.upptackter.riding,{},{timeout:15000});assert(await seen('vattenhjul'));
      await act('vattenhjul',2);assert(await seen('vattenhemlighet'));
      await scene('hub');for(let i=0;i<3;i++)await act('egen-glanta',1);assert(await seen('egen-glanta'));
      await act('egen-glanta',0);await act('egen-glanta',2);
      const garden=await page.evaluate(()=>JSON.stringify(__varlden.SV.glanta));
      await page.reload();await page.waitForFunction(()=>window.__varlden);assert.equal(await page.evaluate(()=>JSON.stringify(__varlden.SV.glanta)),garden);
      await scene('no');await page.locator('#qbtn').click();await page.locator('[data-lek="vattenhjul"]').click();assert.equal(await page.locator('#panel').isVisible(),false);
      st=await station('vattenhjul');
      // Frame the clearing without changing production camera controls.
      await move(st.x,st.y,st.z+8);
      await page.evaluate(st=>{window.__oversikt=true;__varlden.cam.position.set(st.x+14,st.y+16,st.z+18);__varlden.cam.lookAt(st.x,st.y+1,st.z);},st);
      await page.waitForTimeout(100);
      if(process.env.WORLD_SCREENSHOTS){fs.mkdirSync(process.env.WORLD_SCREENSHOTS,{recursive:true});await page.screenshot({path:path.join(process.env.WORLD_SCREENSHOTS,name+'.png')});}
      assert.deepEqual(errors,[],name+' page errors');
      console.log(name+': all islands, activities, transport, persistence and guide passed');
      await context.close();
    }
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
