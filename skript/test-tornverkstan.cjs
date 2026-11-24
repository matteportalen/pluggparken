// Tornverkstan. Lokal server på port 8765; kräver Playwright.
// Referenstorn: en enkel lösning ger 1–2 stjärnor, en genomtänkt ger tre stjärnor inom budgeten. Torn utan sneda stag välter.
const {chromium}=require('playwright');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1280,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await page.goto(process.env.TORN_URL||'http://127.0.0.1:8765/tornverkstan/');await page.waitForFunction(()=>window.__torn);assert.equal(await page.locator('#niv button').count(),6);
const ref=await page.evaluate(()=>{const T=__torn;
  const stege=(xa,xb,H,ph,m,d,nere)=>{const o=[];let y=0;while(y<H){const y2=Math.min(H,y+ph),q=(y<2&&nere)?nere:m;o.push([xa,-y,xa,-y2,q],[xb,-y,xb,-y2,q],[xa,-y2,xb,-y2,q]);if(d==='z')o.push(((y/ph)%2)?[xa,-y,xb,-y2,q]:[xb,-y,xa,-y2,q]);if(d==='x')o.push([xa,-y,xb,-y2,q],[xb,-y,xa,-y2,q]);y=y2}return o};
  const tre=(H,m)=>{const o=[];for(let y=0;y<H;y+=2){for(const x of [2,4,6])o.push([x,-y,x,-y-2,m]);o.push([2,-y-2,4,-y-2,'tra'],[4,-y-2,6,-y-2,'tra'],[2,-y,4,-y-2,'tra'],[6,-y,4,-y-2,'tra'])}return o};
  const rep=[[0,0,3,-4,'rep'],[8,0,5,-4,'rep']];
  const fall={1:{enkel:stege(3,5,3,1,'tra','z'),bast:stege(3,5,5,2,'tra','z')},
    2:{enkel:stege(2,4,4,2,'tra','z'),bast:tre(4,'tra')},
    3:{enkel:stege(3,5,5,2,'tra','z'),bast:[...stege(3,5,5,2,'tra','x'),[2,0,3,-2,'stal'],[6,0,5,-2,'stal']]},
    4:{enkel:stege(3,5,7,2,'tra','z'),bast:[...stege(3,5,7,2,'tra','z'),...rep]},
    5:{enkel:tre(6,'tra'),bast:tre(6,'stal')},
    6:{enkel:stege(3,5,7,2,'tra','z'),bast:[...stege(3,5,9,2,'tra','z'),...rep]}};
  const st=(n,pr)=>n.typ==="hojd"?(pr.klarade>=0?n.hojd.filter(v=>-pr.topY>=v).length:0):(pr.klarade>=n.mal?Math.min(3,1+pr.klarade-n.mal):0);
  const ut={};for(const l in fall){const n=T.NIV[l],f=fall[l];for(const b of f.bast){const L=Math.hypot(b[2]-b[0],b[3]-b[1]);if(L>T.MAT[b[4]].max+1e-6||!n.mat.includes(b[4]))throw Error('ogiltig balk nivå '+l+': '+b)}
    ut[l]={enkel:st(n,T.prov(n,f.enkel)),bast:st(n,T.prov(n,f.bast)),pris:T.kostnad(f.bast),kr:n.kr}}
  const n1=T.NIV[1];ut.pinne=T.prov(n1,[[3,0,3,-1,'tra'],[3,-1,3,-2,'tra'],[3,-2,3,-3,'tra']]).orsak;
  ut.utanStag=T.prov(n1,stege(3,5,4,1,'tra','')).orsak;return ut});
for(const l of [1,2,3,4,5,6]){const r=ref[l];assert(r.pris<=r.kr,`nivå ${l}: referenstornet kostar ${r.pris} av ${r.kr}`);assert.equal(r.bast,3,`nivå ${l}: tre stjärnor går inte`);assert(r.enkel<3,`nivå ${l}: det enkla tornet ska inte ge tre stjärnor`)}
assert.equal(ref.pinne,'valte');assert.equal(ref.utanStag,'valte');
console.log('alla sex torn: tre stjärnor går inom budget, enkla torn ger färre',JSON.stringify([1,2,3,4,5,6].map(l=>`${ref[l].enkel}→${ref[l].bast} (${ref[l].pris}/${ref[l].kr})`)));
console.log('en pinne rakt upp och en stege utan sneda stag välter OK');
// bygga med musen och testa i sidan
await page.locator('#niv button').first().click();await page.waitForTimeout(300);
const dra=async(a,b)=>{const p=await page.evaluate(([a,b])=>{const T=__torn,r=document.getElementById('cv').getBoundingClientRect(),d=T.V.d;return[r.left+T.X(a[0])/d,r.top+T.Y(a[1])/d,r.left+T.X(b[0])/d,r.top+T.Y(b[1])/d]},[a,b]);await page.mouse.move(p[0],p[1]);await page.mouse.down();await page.mouse.move(p[2],p[3],{steps:6});await page.mouse.up()};
await page.evaluate(()=>__torn.satt([]));await dra([3,0],[3,-2]);assert.deepEqual(await page.evaluate(()=>__torn.G.bal.map(b=>b.join())),['3,0,3,-2,tra']);console.log('dra en tandpetare uppåt OK');
await dra([5,0],[5,-2]);await dra([3,-2],[5,-2]);await page.evaluate(()=>__torn.satt([[3,0,3,-2,'tra'],[5,0,5,-2,'tra'],[3,-2,5,-2,'tra']]));await dra([4,-1],[4,-2]).catch(()=>{});
await page.evaluate(()=>__torn.satt([[3,0,3,-3,'tra']]));await dra([5,0],[3,-2]);
assert.deepEqual((await page.evaluate(()=>__torn.G.bal.map(b=>b.join()))).sort(),['3,-2,3,-3,tra','3,0,3,-2,tra','5,0,3,-2,tra'].sort());console.log('en balk som fästs mitt på en annan delar den i en led OK');
await page.evaluate(()=>{const T=__torn;const o=[];for(let y=0;y<5;y+=2){const y2=Math.min(5,y+2);o.push([3,-y,3,-y2,'tra'],[5,-y,5,-y2,'tra'],[3,-y2,5,-y2,'tra'],(y/2)%2?[3,-y,5,-y2,'tra']:[5,-y,3,-y2,'tra'])}T.satt(o);T.startProv();T.G.pr.snabb=4});
await page.waitForFunction(()=>!document.getElementById('bNasta').hidden,null,{timeout:30000});assert.match(await page.locator('#pExpl').textContent(),/5 m högt/);console.log('provet i sidan:',await page.locator('#pExpl').textContent());
for(const w of [390,1024]){await page.setViewportSize({width:w,height:844});await page.waitForTimeout(200);const sw=await page.evaluate(()=>document.documentElement.scrollWidth);assert(sw<=w,`sidledsscroll vid ${w}`)}console.log('390 och 1024 px utan sidledsscroll OK');
assert.deepEqual(errors,[]);console.log('inga JS-fel');await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
