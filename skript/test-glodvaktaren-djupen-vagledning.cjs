/* Djupen: en uppgift per mekanism i ett steg, vägvisare till nästa mål och måltext. */
const assert=require('node:assert/strict'),{chromium}=require('playwright');const{state,walk,begin}=require('./depth-test-helpers.cjs');const URL=process.env.BASE_URL||'http://127.0.0.1:8765',UT=process.env.UT||'/tmp';
const spar=depth=>({mode:'tabell',campaigns:{tabell:{region:'depths',cityRestored:true,passWon:true,won:true,portalUnlocked:true,boots:true,shield:true,depth}}});
const rensat=['shaft-grub','hall-crab','hall-grub','hall-crab2','pump-crab','pump-grub','archive-grub','archive-crab','quarters-grub','quarters-crab','gallery-crab','gallery-grub','cistern-crab','cistern-grub','prison-crab','prison-grub','heart-crab','heart-grub'];
(async()=>{const b=await chromium.launch();try{for(const[namn,vp]of[['dator',{width:1280,height:850}],['mobil',{width:390,height:844}]]){
  const p=await b.newPage({viewport:vp}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  const oppna=async depth=>{await p.goto(URL+'/spel/glodvaktaren/');await p.evaluate(d=>localStorage.setItem('mattespel-glodvaktaren-v1',JSON.stringify(d)),spar({defeated:rensat,...depth}));await p.reload();await p.waitForFunction(()=>MPGlod.ready&&MPGlod.depthsReady());await begin(p);await p.waitForTimeout(400)};
  const mal=()=>p.locator('#objective').textContent(),bild=n=>p.locator('#stage').screenshot({path:`${UT}/vag-${namn}-${n}.png`});
  // 1. Klockhissen: först slussvakten, sedan Mål 1 och rätt dörr
  await oppna({room:'shaft',visited:['shaft']});assert.match(await mal(),/Prata med slussvakten/);let g=await p.evaluate(()=>MPGlod.depthGuide());assert.equal(g.label,'SLUSSVAKTEN');await bild('1-hiss');
  await walk(p,430);await p.keyboard.press('e');assert((await state(p)).depth.clues.includes('keeper'));assert.match(await p.locator('#speechText').innerText(),/karta i din journal/);
  g=await p.evaluate(()=>MPGlod.depthGuide());assert.equal(g.label,'VÅGHALLEN');assert.equal(g.x,1120);
  // 2. Våghallen: mål 1, en uppgift i ett steg
  await oppna({room:'hall',visited:['shaft','hall'],clues:['keeper']});assert.match(await mal(),/^Mål 1 av 7 · Ställ in motvikten/);g=await p.evaluate(()=>MPGlod.depthGuide());assert.equal(g.label,'MOTVIKTEN');assert.equal(g.x,730);
  await walk(p,730);await p.waitForTimeout(300);assert((await p.evaluate(()=>MPGlod.depthGuide())).nara);await bild('2-motvikt-framme');
  await p.keyboard.press('e');assert.match(await p.locator('#depthEquation').innerText(),/3 · □ = 12/);assert.equal(await p.locator('#depthTitle').innerText(),'MOTVIKTEN');
  await p.fill('#depthValue','2');await p.click('#depthSubmit');assert.match(await p.locator('#depthHint').textContent(),/För lätt\. Vilket tal gånger 3 blir 12\?/);await bild('3-motvikt-fel');
  await p.fill('#depthValue','4');await p.click('#depthSubmit');assert((await state(p)).depth.solved.includes('balance'),'klar efter en uppgift');
  await p.waitForTimeout(300);assert.match(await mal(),/^Mål 2 av 7 · Töm arkivet med pumpen\. Gå till Pumprummet: höger dörr/);g=await p.evaluate(()=>MPGlod.depthGuide());assert.equal(g.x,1400);assert(await p.locator('.guide-banner.visa').count(),'skylten Nytt mål');await bild('4-nytt-mal');
  // 3. Arkivet: fel ordning lägger tillbaka tavlorna med tips
  await oppna({room:'archive',visited:['shaft','hall','pump','archive'],clues:['keeper'],solved:['balance','pump']});await walk(p,900);
  await p.evaluate(()=>MPGlod.depthOpen('archive'));for(const i of [1,0,2])await p.locator(`[data-tablet="${i}"]`).click();await p.click('#depthSubmit');assert.match(await p.locator('#depthHint').textContent(),/Inte rätt ordning än/);assert.equal(await p.locator('[data-tablet][aria-pressed=true]').count(),0);await bild('5-arkiv');
  for(const i of [0,2,1])await p.locator(`[data-tablet="${i}"]`).click();await p.click('#depthSubmit');assert((await state(p)).depth.solved.includes('archive'));
  // 4. Vilse i Bostäderna: vägvisaren pekar tillbaka mot nästa mål
  await oppna({room:'quarters',visited:['shaft','hall','quarters'],clues:['keeper'],solved:['balance']});g=await p.evaluate(()=>MPGlod.depthGuide());assert.equal(g.label,'VÅGHALLEN');assert.match(await mal(),/Mål 2 av 7/);
  // 5. Kedjekammaren: ett sigill, sedan sista länken
  await oppna({room:'prison',visited:['prison'],clues:['keeper'],solved:['balance','pump','archive','bridge','cistern']});assert.match(await mal(),/^Mål 6 av 7 · Befria väktaren/);await walk(p,770);await p.keyboard.press('e');assert.match(await p.locator('#depthEquation').innerText(),/3 · □ = 12/);await bild('6-sigill');
  await p.fill('#depthValue','4');await p.click('#depthSubmit');await p.waitForTimeout(300);g=await p.evaluate(()=>MPGlod.depthGuide());assert.equal(g.label,'SISTA LÄNKEN');assert.match(await mal(),/Slå av den sista länken/);await walk(p,940);await p.waitForTimeout(300);await bild('7-lank');
  // 6. Hjärtvalvet: två ventiler
  await oppna({room:'heart',visited:['heart'],clues:['keeper'],solved:['balance','pump','archive','bridge','cistern','chain0','chain1','chain2','guardian']});assert.match(await mal(),/^Mål 7 av 7 · Väck hjärtat/);await p.evaluate(()=>MPGlod.depthOpen('heart'));assert.equal(await p.locator('[data-valve]').count(),2);await bild('8-hjarta');
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);await p.close()}
  console.log('Djupen, enklare uppgifter och vägledning: ok')}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
