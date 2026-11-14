/* Sagoriket, Molnriket: en robot spelar igenom alla åtta banor och bossen. Spelet stegas för hand (MPSaga.manuell), så testet går fort och blir likadant varje gång.
   Kör: python3 -m http.server 8765 --bind 127.0.0.1 &  NODE_PATH=... node skript/test-sagoriket-moln.cjs [bild-mapp] */
const assert=require('node:assert/strict'),{chromium}=require('playwright');const URL=process.env.BASE_URL||'http://127.0.0.1:8765',UT=process.argv[2]||process.env.UT||'/tmp';
// roboten körs inne i sidan: n bilder i taget
const ROBOT=`(n)=>{const S=window.__bot||(window.__bot={u:0,fast:0,sx:0,vanta:0,logg:[]});
  const stod=(x,y)=>{const c=Math.floor(x/T),r=Math.floor(y/T);if(fast(c,r)&&LV.grid[r]&&LV.grid[r][c]!=="A")return r*T;const m=LV.plankor.find(m=>m.y<1e5&&x>m.x-6&&x<m.x+m.w+6&&y>=m.y&&y<m.y+T);return m?m.y:null;};
  const under=(x,y,djup)=>{for(let d=0;d<=djup;d+=16){const q=stod(x,y+d);if(q!==null)return q;}return null;};
  const landning=(fran,till)=>{for(let dx=fran;dx<=till;dx+=16)for(let dy=-170;dy<=440;dy+=16){const q=stod(P.x+dx,P.y+dy);if(q!==null&&!(stod(P.x+dx,q-8)!==null))return true;}return false;};
  for(let i=0;i<n;i++){if(!igang)break;IN.v=IN.h=IN.u=false;IN.m=(S.fast%24)<2;S.fast++;
    const port=LV.portar.find(p=>!p.open&&!p.boss&&P.x<(p.bro?p.broX:p.x)*T+T);let gor="fram";
    if(port&&P.x>(port.block[0].x-1.5)*T){const bl=port.block.find(b=>b.v===port.q.a),tx=bl.x*T+T/2;gor="port";
      if(S.u>0){S.u--;IN.u=true;}else if(Math.abs(P.x-tx)>14){IN[P.x<tx?"h":"v"]=true;}else if(P.mark&&Math.abs(P.vx)<150){IN.u=true;IN.uT=true;S.u=12;}}
    if(gor==="fram"){const vind=LV.vindar.find(z=>!z.boss&&P.x>z.x-T&&P.x<z.x+z.w),fas=vind?vind.fas%3.6:0,vindOk=!vind||(vind.vx>0?fas<.7:(fas>2.35&&fas<2.6));
      const blixt=LV.blixtar.find(b=>b.t<1.25&&Math.abs(b.x-(P.x+70))<70);
      if(P.mark){const tom=under(P.x+34,P.y+4,8)===null,fjader=LV.fjadrar.some(f=>Math.abs(f.x*T+T/2-P.x)<90&&f.x*T>P.x-20);
        const mur=fast(Math.floor((P.x+34)/T),Math.floor((P.y-20)/T));
        if(blixt&&!tom&&!LV.blixtar.some(b=>b.t<1.25&&Math.abs(b.x-P.x)<56)){/* vänta på blixten framför */}
        else if(tom&&!fjader){if(vindOk&&landning(60,vind&&vind.vx>0?10*T:5.6*T)){IN.h=true;IN.u=true;S.u=14;}}
        else if(mur){IN.h=true;IN.u=true;S.u=16;}else IN.h=true;}
      else{IN.h=true;if(S.u>0){S.u--;IN.u=true;}
        // dubbelhopp när man faller och inget finns under
        if(P.vy>120&&P.hopp<2&&under(P.x+20,P.y,200)===null&&under(P.x+70,P.y,200)===null){IN.u=true;IN.uT=true;S.u=16;}
        // sikta: stanna över ett stöd om man är på väg förbi
        if(P.vy>0&&under(P.x,P.y,260)!==null&&under(P.x+60,P.y,260)===null&&under(P.x+120,P.y,260)===null)IN.h=false;}}
    const fore=P.hjartan;uppdatera(1/60);if(P.hjartan<fore)S.logg.push("hjärta vid x="+Math.round(P.x/T));}
  return{igang,x:P.x,y:P.y,hj:P.hjartan,stj:P.stj,logg:S.logg.splice(0)};}`;
(async()=>{const b=await chromium.launch();try{
  const p=await b.newPage({viewport:{width:1280,height:800}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(URL+'/spel/sagoriket/');await p.evaluate(()=>{localStorage.setItem('mattespel-sagoriket-v1',JSON.stringify({betyg:{"hav-6":1},cat:"multi",tables:[2],sett:{},musik:false}))});await p.reload();await p.waitForFunction(()=>window.MPSaga);await p.waitForTimeout(800);
  assert.equal(await p.locator('[data-v="moln"]').count(),9,'åtta banor och en boss i menyn');assert(await p.locator('[data-v="moln"][data-n="0"]').isEnabled(),'Molnriket öppnas efter Havsrikets bana 6');
  const bilder=process.env.BILDER?{0:[14,34],1:[16],2:[14,17],3:[13,30],4:[13,15],5:[14],6:[12,30],7:[40]}:{};
  for(let nr=0;nr<8;nr++){await p.evaluate(nr=>{let fro=1234+nr*77;Math.random=()=>{fro=(fro*9301+49297)%233280;return fro/233280};MPSaga.manuell=true;window.__bot=null;MPSaga.start("moln",nr)},nr);let forsok=0,fast=0,sistaX=0,bildNr=0,hjartan=0;
    for(let k=0;k<400;k++){const r=await p.evaluate(`(${ROBOT})(30)`);r.logg.forEach(l=>{hjartan++;if(process.env.PRAT)console.log('  bana',nr+1,l)});
      if((bilder[nr]||[]).includes(k)){await p.waitForTimeout(700);await p.screenshot({path:`${UT}/moln-${nr+1}-${bildNr++}.png`})}
      if(!r.igang){await p.waitForFunction(()=>!document.getElementById('slutRuta').hidden||!document.getElementById('result').hidden,null,{timeout:4000});if(await p.locator('#slutRuta').isVisible()){assert(forsok++<4,`bana ${nr+1}: hjärtana tog slut för många gånger vid x=${Math.round(r.x/64)}`);await p.locator('#slutRuta button').first().click();await p.evaluate(()=>{MPSaga.manuell=true});continue}break}
      if(Math.abs(r.x-sistaX)<8)fast++;else{fast=0;sistaX=r.x}assert(fast<40,`bana ${nr+1}: roboten fastnade vid kolumn ${Math.round(r.x/64)}, y=${Math.round(r.y)}`)}
    const betyg=await p.evaluate(nr=>MPSaga.data.betyg["moln-"+(nr+1)],nr);assert(betyg>=1,`bana ${nr+1} klarad (betyg ${betyg})`);console.log(`bana ${nr+1}: klar, betyg ${betyg}, tappade hjärtan ${hjartan}, fortsatt ${forsok}`);
    await p.evaluate(()=>MPSaga.data.betyg)}
  // bossen: roboten flyttar sig från blixtarna och svarar rätt sju gånger
  await p.evaluate(()=>{let fro=99;Math.random=()=>{fro=(fro*9301+49297)%233280;return fro/233280};MPSaga.manuell=true;window.__bot=null;MPSaga.start("moln","boss")});
  const BOSS=`(n)=>{const S=window.__bot||(window.__bot={u:0});for(let i=0;i<n;i++){if(!igang)break;IN.v=IN.h=IN.u=false;const p=LV.portar[0],B=LV.boss;
    if(B.trollad){IN.h=true;uppdatera(1/60);continue;}
    const hot=LV.blixtar.find(b=>b.t<1.25&&Math.abs(b.x-P.x)<70);
    if(S.u>0){S.u--;IN.u=true;}else if(hot){IN[P.x<hot.x?"v":"h"]=true;}
    else if(!p.vantar){const bl=p.block.find(b=>b.v===p.q.a),tx=bl.x*T+T/2;if(Math.abs(P.x-tx)>14)IN[P.x<tx?"h":"v"]=true;else if(P.mark&&Math.abs(P.vx)<150){IN.u=true;IN.uT=true;S.u=12;}}
    uppdatera(1/60);}return{igang,hp:LV.boss.hp,hj:P.hjartan,vantar:LV.portar[0].vantar,trollad:!!LV.boss.trollad,vind:LV.vindar.length};}`;
  let sagVind=false,bossBild=0;for(let k=0;k<900;k++){const r=await p.evaluate(`(${BOSS})(12)`);if(r.vind)sagVind=true;
    if(k===40||(r.vind&&bossBild<2&&k%7===0)){await p.waitForTimeout(400);await p.screenshot({path:`${UT}/moln-boss-${bossBild++}.png`})}
    if(r.vantar)await p.waitForTimeout(1080);
    if(!r.igang){await p.waitForFunction(()=>!document.getElementById('slutRuta').hidden||!document.getElementById('result').hidden,null,{timeout:4000});if(await p.locator('#slutRuta').isVisible()){await p.locator('#slutRuta button').first().click();await p.evaluate(()=>{MPSaga.manuell=true});continue}break}
    if(r.trollad&&k%20===0)await p.screenshot({path:`${UT}/moln-boss-klar.png`})}
  assert((await p.evaluate(()=>MPSaga.data.betyg["moln-boss"]))>=1,'bossen besegrad');assert(sagVind,'bossen blåser när den är svag');
  assert((await p.evaluate(()=>MPSaga.data.stars.moln))>=1,'världens stjärnor räknas');console.log('Åskmolnet: besegrat');
  // de gamla världarna är orörda: en bana i varje startar och går att stega utan fel
  for(const v of ["skog","oken","is","hav"]){const r=await p.evaluate(v=>{MPSaga.manuell=true;MPSaga.start(v,1);IN.h=true;MPSaga.steg(240);IN.h=false;return{x:P.x,cols:LV.cols,moln:!!LV.V.moln}},v);assert(r.x>200&&!r.moln,'världen '+v+' går att spela')}
  // mobil, stående: banan och bossen får plats
  await p.setViewportSize({width:390,height:844});await p.evaluate(()=>{MPSaga.manuell=true;MPSaga.start("moln",2);IN.h=true;MPSaga.steg(150);IN.h=false});await p.waitForTimeout(900);await p.screenshot({path:`${UT}/moln-mobil-bana.png`});
  await p.evaluate(()=>{MPSaga.manuell=true;MPSaga.start("moln","boss");MPSaga.steg(200)});await p.waitForTimeout(900);await p.screenshot({path:`${UT}/moln-mobil-boss.png`});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await p.evaluate(()=>{MPSaga.manuell=false});
  assert.deepEqual(errors,[]);console.log('Molnriket: alla åtta banor går att klara')}finally{await b.close()}})().catch(e=>{console.error(e.message||e);process.exit(1)});
