/* Sagoriket, Vulkanriket: en robot klättrar igenom alla åtta höga banor och besegrar Draken. Spelet stegas för hand (MPSaga.manuell).
   Kör: python3 -m http.server 8765 --bind 127.0.0.1 &  NODE_PATH=... node skript/test-sagoriket-vulkan.cjs [bild-mapp]   (BILDER=1 tar skärmbilder, PRAT=1 skriver ut tappade hjärtan) */
const assert=require('node:assert/strict'),{chromium}=require('playwright');const URL=process.env.BASE_URL||'http://127.0.0.1:8765',UT=process.argv[2]||process.env.UT||'/tmp';
const ROBOT=`(n)=>{const S=window.__bot||(window.__bot={u:0,steer:null,dbl:false,fr:0,logg:[]});
  const ytor=()=>{const L=LV.plankor.filter(m=>m.y<1e5).map(m=>({x0:m.x,x1:m.x+m.w,y:m.y,fast:false}));
    for(let r=1;r<ROWS;r++){let c=0;while(c<LV.cols){if(fast(c,r)&&!fast(c,r-1)&&LV.grid[r][c]!=="A"){let k=c;while(k<LV.cols&&fast(k,r)&&!fast(k,r-1)&&LV.grid[r][k]!=="A")k++;L.push({x0:c*T,x1:k*T,y:r*T,fast:true});c=k;}else c++;}}return L;};
  const stod=(x)=>ytor().some(q=>Math.abs(q.y-P.y)<6&&x>q.x0-14&&x<q.x1+14);
  const ga=(tx)=>{const d=tx-P.x;if(Math.abs(d)<9)return true;const dir=d>0?1:-1;
    if(P.mark&&LV.spikar.some(k=>k.y*T+T===P.y&&(k.x*T+T/2-P.x)*dir>0&&Math.abs(k.x*T+T/2-P.x)<96)){IN.u=true;IN.uT=true;S.u=18;S.steer=tx;}
    else if(P.mark&&!stod(P.x+dir*34)){IN.u=true;IN.uT=true;S.u=18;S.steer=tx;S.dbl=Math.abs(tx-P.x)>2.4*T;}
    IN[dir>0?"h":"v"]=true;return false;};
  for(let i=0;i<n;i++){if(!igang)break;IN.v=IN.h=IN.u=false;S.fr++;IN.m=(S.fr%24)<2;
    const port=LV.portar.find(p=>!p.open&&P.y<=p.golv+4&&P.y>p.tak);
    if(S.u>0){S.u--;IN.u=true;}
    if(P.mark){S.steer=null;S.dbl=false;}
    if(port){const bl=port.block.find(b=>b.v===port.q.a),tx=bl.x*T+T/2;
      if(S.u>0){}else if(Math.abs(P.x-tx)>14)IN[P.x<tx?"h":"v"]=true;else if(P.mark&&Math.abs(P.y-port.golv)<6&&Math.abs(P.vx)<150){IN.u=true;IN.uT=true;S.u=12;}}
    else if(P.mark&&S.u<=0){const fj=LV.fjadrar.find(f=>Math.abs((f.y+1)*T-P.y)<8&&Math.abs(f.x*T+T/2-P.x)<4*T);
      if(LV.mal&&Math.abs(P.y-(LV.mal.y+2)*T)<8)ga(LV.mal.x*T+T/2);
      else if(fj)ga(fj.x*T+T/2);
      else{const K=ytor().filter(q=>q.y<P.y-20&&P.y-q.y<=4.3*T&&!(q.fast&&q.y<=T)).sort((a,b)=>(b.y-a.y)||(Math.abs((a.x0+a.x1)/2-P.x)-Math.abs((b.x0+b.x1)/2-P.x)));const q=K[0];
        if(q){const rise=P.y-q.y;if(!q.fast){const tx=Math.max(q.x0+20,Math.min(q.x1-20,P.x));if(ga(tx)){IN.u=true;IN.uT=true;S.u=rise>1.5*T?20:13;S.dbl=rise>2.3*T;S.steer=tx;}}
          else{const inne=P.x>q.x0-10&&P.x<q.x1+10,v=q.x0-34,h=q.x1+34,okV=v>T+24,okH=h<(LV.cols-1)*T-24,ut=!okH||(okV&&Math.abs(v-P.x)<=Math.abs(h-P.x))?v:h;
            if(ga(ut)){IN.u=true;IN.uT=true;S.u=20;S.dbl=rise>2.2*T;S.steer=ut===v?q.x0+26:q.x1-26;S.vanta=6;}}}}}
    else if(!P.mark){if(S.steer===null){const K=ytor().filter(q=>q.y<P.y+T&&P.y-q.y<5*T&&!q.fast).sort((a,b)=>Math.abs((a.x0+a.x1)/2-P.x)-Math.abs((b.x0+b.x1)/2-P.x));if(K[0])S.steer=(K[0].x0+K[0].x1)/2;}
      if(P.vy<-300)IN.u=true; /* håll in hoppknappen: då blir studsen hög */
      if(S.steer!==null&&Math.abs(S.steer-P.x)>8&&!(S.vanta>0))IN[S.steer>P.x?"h":"v"]=true;if(S.vanta>0)S.vanta--;
      if(S.dbl&&P.vy>-60&&P.hopp<2){IN.u=true;IN.uT=true;S.u=18;S.dbl=false;}}
    const fore=P.hjartan;uppdatera(1/60);if(P.hjartan<fore)S.logg.push("hjärta vid rad "+Math.round(P.y/T)+", kol "+Math.round(P.x/T));}
  return{igang,x:P.x,y:P.y,hj:P.hjartan,rader:ROWS,lava:LV.lava?LV.lava.y:null,logg:S.logg.splice(0)};}`;
(async()=>{const b=await chromium.launch();try{
  const p=await b.newPage({viewport:{width:1280,height:800}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(URL+'/spel/sagoriket/');await p.evaluate(()=>{localStorage.setItem('mattespel-sagoriket-v1',JSON.stringify({betyg:{"moln-6":1},cat:"multi",tables:[2],sett:{},musik:false}))});await p.reload();await p.waitForFunction(()=>window.MPSaga);await p.waitForTimeout(800);
  assert.equal(await p.locator('[data-v="vulkan"]').count(),9,'åtta banor och en boss i menyn');assert(await p.locator('[data-v="vulkan"][data-n="0"]').isEnabled(),'Vulkanriket öppnas efter Molnrikets bana 6');
  const bilder=process.env.BILDER?{0:[6,20],1:[14],2:[22],3:[12],4:[10],5:[12],6:[12],7:[30]}:{},bara=process.env.BANA?[+process.env.BANA-1]:[0,1,2,3,4,5,6,7];
  for(const nr of bara){await p.evaluate(nr=>{let fro=4321+nr*77;Math.random=()=>{fro=(fro*9301+49297)%233280;return fro/233280};MPSaga.manuell=true;window.__bot=null;MPSaga.start("vulkan",nr)},nr);let forsok=0,fast=0,basta=1e9,bildNr=0,hjartan=0,sagLava=false;
    for(let k=0;k<900;k++){const r=await p.evaluate(`(${ROBOT})(30)`);r.logg.forEach(l=>{hjartan++;if(process.env.PRAT)console.log('  bana',nr+1,l)});if(r.lava!==null&&r.lava<r.rader*64-200)sagLava=true;
      if((bilder[nr]||[]).includes(k)){await p.waitForTimeout(700);await p.screenshot({path:`${UT}/vulkan-${nr+1}-${bildNr++}.png`})}
      if(!r.igang){await p.waitForFunction(()=>!document.getElementById('slutRuta').hidden||!document.getElementById('result').hidden,null,{timeout:4000});if(await p.locator('#slutRuta').isVisible()){assert(forsok++<4,`bana ${nr+1}: hjärtana tog slut för många gånger vid rad ${Math.round(r.y/64)}`);await p.locator('#slutRuta button').first().click();await p.evaluate(()=>{MPSaga.manuell=true});continue}break}
      if(r.y<basta-8){basta=r.y;fast=0}else fast++;assert(fast<70,`bana ${nr+1}: roboten fastnade vid rad ${Math.round(r.y/64)} av ${r.rader}, kol ${(r.x/64).toFixed(1)}`)}
    const betyg=await p.evaluate(nr=>MPSaga.data.betyg["vulkan-"+(nr+1)],nr);assert(betyg>=1,`bana ${nr+1} klarad (betyg ${betyg})`);if(nr>0)assert(sagLava,`bana ${nr+1}: lavan stiger`);
    console.log(`bana ${nr+1}: klar, betyg ${betyg}, tappade hjärtan ${hjartan}, fortsatt ${forsok}`)}
  if(!process.env.BANA){
  // bossen Draken: roboten hoppar över eldvågor och eldstrålen, flyttar sig från stenar och svarar rätt åtta gånger
  await p.evaluate(()=>{let fro=77;Math.random=()=>{fro=(fro*9301+49297)%233280;return fro/233280};MPSaga.manuell=true;window.__bot=null;MPSaga.start("vulkan","boss")});
  const BOSS=`(n)=>{const S=window.__bot||(window.__bot={u:0,logg:[]});for(let i=0;i<n;i++){if(!igang)break;IN.v=IN.h=IN.u=false;const p=LV.portar[0],B=LV.boss;
    if(B.trollad){IN.h=true;uppdatera(1/60);continue;}
    const vag=LV.vagor.find(v=>Math.abs(v.x-P.x)<130&&(v.x-P.x)*v.vx<0),sten=LV.tappar.find(t=>Math.abs(t.x-P.x)<60),eld=B.eld&&B.eld.t>.6&&B.eld.t<1.8&&(P.x-B.x)*B.eld.rikt>0&&Math.abs(P.x-B.x)<6.6*T;
    if(S.u>0){S.u--;IN.u=true;}
    if(eld||vag){if(P.mark){IN.u=true;IN.uT=true;S.u=22;}else if(P.vy>-80&&P.hopp<2){IN.u=true;IN.uT=true;S.u=22;}}
    else if(sten){IN[P.x<sten.x?"v":"h"]=true;}
    else if(Math.abs(B.x-P.x)<2.3*T&&B.y>8*T){IN[P.x<B.x?"v":"h"]=true;if(P.x<2*T||P.x>20*T){if(P.mark){IN.u=true;IN.uT=true;S.u=22;}IN.v=P.x>20*T;IN.h=P.x<2*T;}}
    else if(!p.vantar&&S.u<=0){const bl=p.block.find(b=>b.v===p.q.a),tx=bl.x*T+T/2;if(Math.abs(P.x-tx)>14)IN[P.x<tx?"h":"v"]=true;else if(P.mark&&Math.abs(P.vx)<150){IN.u=true;IN.uT=true;S.u=12;}}
    const fore=P.hjartan;uppdatera(1/60);if(P.hjartan<fore)S.logg.push("hjärta");}
    return{igang,hp:LV.boss.hp,hj:P.hjartan,vantar:LV.portar[0].vantar,trollad:!!LV.boss.trollad,eld:!!LV.boss.eld&&LV.boss.eld.t>1,stenar:LV.tappar.length,logg:S.logg.splice(0)};}`;
  let sagEld=false,sagSten=false,bossBild=0,bossHj=0,bf=0;for(let k=0;k<1500;k++){const r=await p.evaluate(`(${BOSS})(12)`);bossHj+=r.logg.length;if(r.eld)sagEld=true;if(r.stenar)sagSten=true;
    if(process.env.BILDER&&((r.eld&&bossBild<2)||k===30)){await p.waitForTimeout(300);await p.screenshot({path:`${UT}/vulkan-boss-${bossBild++}.png`})}
    if(r.vantar)await p.waitForTimeout(1080);
    if(!r.igang){await p.waitForFunction(()=>!document.getElementById('slutRuta').hidden||!document.getElementById('result').hidden,null,{timeout:4000});if(await p.locator('#slutRuta').isVisible()){assert(bf++<6,'bossen: hjärtana tog slut för många gånger');await p.locator('#slutRuta button').first().click();await p.evaluate(()=>{MPSaga.manuell=true});continue}break}}
  assert((await p.evaluate(()=>MPSaga.data.betyg["vulkan-boss"]))>=1,'Draken besegrad');assert(sagEld,'Draken sprutar eld');assert(sagSten,'stenar faller när Draken är svag');
  assert((await p.evaluate(()=>MPSaga.data.stars.vulkan))>=1,'världens stjärnor räknas');console.log(`Draken: besegrad, tappade hjärtan ${bossHj}, fortsatt ${bf}`);
  // de andra världarna är orörda: en bana i varje startar och går att stega utan fel, och banhöjden är tillbaka på 12 rader
  for(const v of ["skog","oken","is","hav","moln"]){const r=await p.evaluate(v=>{MPSaga.manuell=true;MPSaga.start(v,1);IN.h=true;MPSaga.steg(240);IN.h=false;return{x:P.x,rader:ROWS,hog:!!LV.hog}},v);assert(r.x>200&&r.rader===12&&!r.hog,'världen '+v+' går att spela')}
  // mobil, stående
  await p.setViewportSize({width:390,height:844});await p.evaluate(()=>{MPSaga.manuell=true;MPSaga.start("vulkan",1);MPSaga.steg(600)});assert.equal(await p.evaluate(()=>P.hjartan),3,"lavan väntar tills man börjar klättra");await p.waitForTimeout(900);await p.screenshot({path:`${UT}/vulkan-mobil-bana.png`});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await p.evaluate(()=>{MPSaga.manuell=false});}
  assert.deepEqual(errors,[]);console.log('Vulkanriket: banorna går att klara')}finally{await b.close()}})().catch(e=>{console.error(e.message||e);process.exit(1)});
