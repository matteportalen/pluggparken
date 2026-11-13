// Brobygget. Lokal server på port 8765; kräver Playwright.
const {chromium}=require('playwright');const assert=require('node:assert/strict');
const bild=process.env.BRO_BILDER;
(async()=>{const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1280,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await page.goto(process.env.BRO_URL||'http://127.0.0.1:8765/brobygget/');await page.waitForFunction(()=>window.__bro);assert.equal(await page.locator('#niv button').count(),7);
// Referensbroar: varje nivå går att klara, och tre stjärnor går att nå inom budgeten
const ref=await page.evaluate(()=>{const B=__bro,D=(g,st)=>{const o=[];for(let x=0;x<g;x+=st)o.push([x,0,x+st,0,'vag']);return o},mir=(g,a)=>a.concat(a.map(b=>[g-b[0],b[1],g-b[2],b[3],b[4]])),W=(g,m,y)=>{const o=[];for(let x=0;x<g;x+=2){o.push([x,0,x+1,y,m],[x+1,y,x+2,0,m]);if(x+2<g)o.push([x+1,y,x+3,y,m])}return o};
  const fall={1:{enkel:D(4,2),bast:[...D(4,1),[0,2,1,0,'tra'],[4,2,3,0,'tra']]},2:{enkel:D(6,2),bast:[...D(6,2),[0,2,2,0,'tra'],[6,2,4,0,'tra']]},
   3:{enkel:D(8,2),bast:[...D(8,2),[4,2,2,0,'tra'],[4,2,4,0,'tra'],[4,2,6,0,'tra'],...W(8,'tra',-2)]},4:{enkel:D(8,2),bast:[...D(8,2),...W(8,'tra',2),...W(8,'tra',-2)]},
   5:{enkel:D(10,2),bast:[...D(10,2),...W(10,'stal',-2)]},6:{enkel:D(12,2),bast:[...D(12,2),...mir(12,[[0,-3,2,0,'rep'],[0,-3,4,0,'rep'],[0,-3,4,-2,'rep'],[4,-2,5,-2,'tra'],[4,-2,4,0,'tra']]),[4,0,5,-2,'tra'],[5,-2,6,0,'tra'],[6,0,7,-2,'tra'],[7,-2,8,0,'tra'],[5,-2,7,-2,'tra']]},
   7:{enkel:D(10,2),bast:[...D(10,2),...W(10,'stal',2),[0,2,1,2,'stal'],[9,2,10,2,'stal'],...mir(10,[[0,-3,2,0,'rep'],[0,-3,4,0,'rep']])]}};
  const ut={};for(const l in fall){const n=B.NIV[l],f=fall[l];for(const b of f.bast){const L=Math.hypot(b[2]-b[0],b[3]-b[1]);if(L>B.MAT[b[4]].max+1e-6||!n.mat.includes(b[4]))throw Error('ogiltig balk nivå '+l+': '+b)}
    ut[l]={mal:n.mal,kr:n.kr,enkel:B.prov(n,f.enkel,n.mal).klarade,bast:B.prov(n,f.bast,n.mal).klarade,pris:B.kostnad(f.bast)}}return ut});
for(const l in ref){const r=ref[l];assert(r.pris<=r.kr,`nivå ${l}: referensbron kostar ${r.pris} av ${r.kr}`);assert(r.bast>=r.mal+2,`nivå ${l}: tre stjärnor går inte (${r.bast} mot ${r.mal+2})`);if(l>1)assert(r.enkel<r.mal,`nivå ${l}: bara väg ska inte räcka`)}
assert.equal(ref[1].enkel,2);console.log('alla sju nivåer: tre stjärnor går inom budget, bara väg räcker inte efter nivå 1',JSON.stringify(Object.values(ref).map(r=>r.pris+'/'+r.kr)));
// Bygga för hand på nivå 1
await page.locator('#niv button').first().click();await page.waitForFunction(()=>__bro.G&&__bro.V.s>10);
const pt=(x,y)=>page.evaluate(([x,y])=>{const c=document.querySelector('#cv'),r=c.getBoundingClientRect(),d=c.width/r.width;return{x:r.left+__bro.X(x)/d,y:r.top+__bro.Y(y)/d}},[x,y]);
const dra=async(a,b)=>{const p=await pt(...a),q=await pt(...b);await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move((p.x+q.x)/2,(p.y+q.y)/2,{steps:4});await page.mouse.move(q.x,q.y,{steps:4});await page.mouse.up()};
const bal=()=>page.evaluate(()=>__bro.G.bal.map(b=>b.join()));
await dra([0,0],[3,0]);await dra([3,0],[4,0]);assert.deepEqual(await bal(),['0,0,3,0,vag','3,0,4,0,vag']);assert.match(await page.locator('#kTxt').textContent(),/80 av 200/);console.log('dra väg mellan punkter, kostnad 80 kr OK');
await dra([0,0],[3,0]);assert.equal((await bal()).length,2);await dra([2,-2],[3,-2]);assert.equal((await bal()).length,2);console.log('dubbla balkar och start i tomma luften avvisas OK');
await page.locator('[data-v="tra"]').click();await dra([0,2],[1,0]);await dra([4,2],[3,0]);assert.equal((await bal()).length,4);
await page.locator('[data-v="sudda"]').click();const m=await pt(.5,1);await page.mouse.click(m.x,m.y);assert.equal((await bal()).length,3);await page.locator('[data-a="angra"]').click();assert.equal((await bal()).length,4);console.log('trä, sudda och ångra OK');
await page.locator('[data-v="vag"]').click();await dra([0,0],[0,-3]);await dra([0,-3],[3,-3]);assert.equal((await bal()).length,5);assert.match(await page.locator('#expl').textContent(),/Pengarna räcker inte/);console.log('budgeten stoppar för dyra balkar OK');
await page.locator('[data-a="angra"]').click();assert.equal((await bal()).length,4);const vantat=await page.evaluate(()=>__bro.prov(__bro.G.niv,__bro.G.bal,__bro.G.niv.mal).klarade);assert(vantat>=3);
if(bild)await page.locator('#game').screenshot({path:bild+'/bro-bygg.png'});
// Testa: däck + stöttor ska bära moped, bil och minibuss men inte elefanten
await page.click('#bTesta');await page.click('#bFort');if(bild){await page.waitForFunction(()=>__bro.G.W.ford&&__bro.G.W.ford.b.x>1.2);await page.locator('#game').screenshot({path:bild+'/bro-prov.png'})}
await page.waitForFunction(()=>__bro.G.pr&&__bro.G.pr.fas==='slut',null,{timeout:60000});const res=await page.evaluate(()=>({kl:__bro.G.pr.klarade,st:JSON.parse(localStorage.getItem('mattespel-brobygget-v1'))}));
assert.equal(res.kl,vantat);assert.equal(res.st.stars[1],3);assert.equal(res.st.rek[1],vantat);assert.equal(res.st.bro[1].length,4);assert.match(await page.locator('#pExpl').textContent(),/Din bro bar en .+ på \d+ ton/);assert(await page.locator('#bNasta').isVisible());console.log('provet i sidan stämmer med motorn, 3 stjärnor, rekord och bron sparade OK:',(await page.locator('#pExpl').textContent()).slice(3,90));
if(bild)await page.locator('#game').screenshot({path:bild+'/bro-klar.png'});
await page.click('#bBygg');assert(await page.locator('#byggUI').isVisible());assert(await page.evaluate(()=>__bro.G.mark&&__bro.G.mark.forst!=null));
// Bara en halv väg: fordonet faller, tydligt besked
await page.locator('[data-a="rensa"]').click();await page.locator('[data-a="rensa"]').click();assert.equal((await bal()).length,0);await page.locator('[data-v="vag"]').click();await dra([0,0],[2,0]);await page.click('#bTesta');await page.click('#bFort');await page.waitForFunction(()=>__bro.G.pr.fas==='slut',null,{timeout:60000});assert.match(await page.locator('#pExpl').textContent(),/föll i vattnet|brast/);assert(await page.locator('#bNasta').isHidden());console.log('halv bro ger tydligt besked OK:',(await page.locator('#pExpl').textContent()).slice(0,60));
// Hem: stjärnor och rekord syns, sparad bro finns kvar
await page.evaluate(()=>hem());assert.match(await page.locator('#niv button').first().textContent(),/Bar .+ ton/);await page.locator('#niv button').nth(5).click();await page.waitForFunction(()=>__bro.G&&__bro.G.l===6);assert.equal(await page.locator('#verk [data-v]').count(),5);if(bild)await page.locator('#game').screenshot({path:bild+'/bro-hang.png'});
for(const [w,h] of [[390,844],[375,667],[1024,768]]){await page.setViewportSize({width:w,height:h});await page.waitForTimeout(200);const o=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,w:innerWidth}));assert(o.doc<=o.w,'sidledsscroll vid '+w);if(bild&&w===390)await page.screenshot({path:bild+'/bro-mobil.png',fullPage:true})}console.log('390, 375 och 1024 px utan sidledsscroll OK');
await page.evaluate(()=>hem());if(bild)await page.screenshot({path:bild+'/bro-hem-mobil.png',fullPage:true});
assert.deepEqual(errors,[]);console.log('inga JS-fel');await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
