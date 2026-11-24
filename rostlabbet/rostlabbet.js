import {drawFront} from './framifran.js';
import {swedishPhrases} from './svenska-ljud.js';
import {initChimera,chimeraModule} from './chimera/wasm/chimera.js';
const $=id=>document.getElementById(id),clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
let model,renderer,VoiceModel,NEUTRAL,SPECS,TARGETS,artic,shown,frame,tele=null;
let context=null,node=null,gain=null,analyser=null,starting=null,wanted=false,ready=false,mode='normal',pitch=170,volume=35;
let utterance=null,speechId=0,planPhrases,tokenizeIpa;
let drag=null,hover=null,lastFrame=0,raf=0,experiment=0;
const canvas=$('head'),ctx=canvas.getContext('2d'),wave=$('wave'),waveCtx=wave.getContext('2d');
const samples=new Float32Array(1024),body={female:0,child:0};
const experiments=[
 ['Vad händer när munnen öppnas?','Välj A och starta rösten. Öppna och stäng munnen långsamt. Hur förändras ljudet?'],
 ['Kan du forma ett nytt ljud?','Välj I och starta rösten. Runda läpparna och flytta tungan. Vilka ljud hittar du?'],
 ['Sjung med en enda vokal','Välj O och tryck på Sjung. Starta rösten och dra Tonhöjd uppåt och neråt. Hitta på en liten melodi.']
];
function status(text,error=false){$('status').textContent=text;$('status').classList.toggle('error',error)}
function reflectPlay(){const on=wanted&&context?.state==='running'&&!!node;$('play').textContent=wanted?'Ⅱ Pausa rösten':'▶ Starta rösten';$('play').setAttribute('aria-pressed',String(wanted));$('play').classList.toggle('playing',wanted);$('live').textContent=on?'Rösten låter':'Rösten vilar';$('live').classList.toggle('on',on);$('stop').disabled=!wanted&&!utterance;}
function send(message){node?.port.postMessage(message)}
function setVolume(){if(gain&&context){gain.gain.cancelScheduledValues(context.currentTime);gain.gain.setTargetAtTime(wanted ? .6*(volume/100)**2 : 0,context.currentTime,.02)}}
function setSource(){send({type:'source',values:{f0:pitch,voiced:mode!=='whisper',breathiness:mode==='whisper'?.6:.15,vibratoDepth:mode==='sing'?.025:0,vibratoRate:5.5,roughness:.03,drift:2}});}
function stop(message='Rösten är tyst. Tryck på Starta för att fortsätta.'){
 stopSpeech();wanted=false;send({type:'stopSpeech'});send({type:'gate',level:0});setVolume();reflectPlay();status(message);
}
function failAudio(error){console.error('Röstlabbet:',error);stop();node?.disconnect();node=null;const old=context;context=null;gain=null;analyser=null;void old?.close().catch(()=>{});status('Ljudet kunde inte starta. Tryck på Starta för att försöka igen.',true);}
async function ensureAudio(){
 if(starting)return starting;
 if(context&&node){await context.resume();return;}
 const AC=window.AudioContext||window.webkitAudioContext;
 if(!AC)throw new Error('Web Audio saknas');
 const c=new AC({latencyHint:'interactive'});context=c;
 // Resume from this user gesture, before awaiting fetch/addModule.
 const resumed=c.resume();
 starting=(async()=>{
  if(!c.audioWorklet)throw new Error('AudioWorklet saknas');
  await Promise.all([resumed,c.audioWorklet.addModule(new URL('./chimera/worklet/processor.js',import.meta.url))]);
  const n=new AudioWorkletNode(c,'chimera',{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[1],processorOptions:{module:chimeraModule()}});
  node=n;
  const meter=c.createAnalyser();meter.fftSize=2048;analyser=meter;
  const limiter=c.createDynamicsCompressor();limiter.threshold.value=-12;limiter.knee.value=12;limiter.ratio.value=12;limiter.attack.value=.003;limiter.release.value=.15;
  gain=c.createGain();gain.gain.value=0;n.connect(limiter);limiter.connect(gain);gain.connect(meter);meter.connect(c.destination);
  await new Promise((resolve,reject)=>{
   const timer=setTimeout(()=>reject(new Error('Rösten svarade inte')),10000);
   n.onprocessorerror=()=>{clearTimeout(timer);reject(new Error('Röstmotorn stannade'));failAudio(new Error('AudioWorklet processorerror'))};
   n.port.onmessage=({data})=>{
    if(data.type==='ready'){clearTimeout(timer);resolve();}
    if(data.type==='planned'&&utterance?.id===data.id)utterance.end=data.end;
    if(data.type==='telemetry'){tele=data;if(utterance?.end&&data.t.clock>utterance.end+.15){stop();speechStatus('Klart! Prova ett nytt ord eller en ny mening.')}}
    if(data.type==='error'){clearTimeout(timer);reject(new Error(data.message));failAudio(new Error(data.message));}
   };
  });
  model.dispose();model=new VoiceModel(body,c.sampleRate);tele=null;
  send({type:'artic',values:artic,tipFree:true});setSource();
  c.onstatechange=()=>{if(c!==context)return;if(c.state==='interrupted'||c.state==='suspended')stop('Rösten pausades. Tryck på Starta för att fortsätta.');reflectPlay()};
 })().finally(()=>{starting=null});
 return starting;
}
async function play(){
 if(!ready)return;
 stopSpeech();
 if(wanted){stop();return;}
 if(window.Ljud&&!Ljud.on){Ljud.set(true);document.dispatchEvent(new Event('mp-ljud-andrat'));}
 wanted=true;reflectPlay();status('Startar rösten …');
 try{await ensureAudio();if(!wanted||document.hidden){stop();return;}send({type:'gate',level:1});setVolume();reflectPlay();status('Lyssna och forma rösten med punkterna eller reglagen.');}catch(error){failAudio(error)}
}
$('play').onclick=play;$('stop').onclick=()=>stop();
function setArtic(values,mark=true){
 if(utterance)stop();
 for(const [key,val] of Object.entries(values)){if(SPECS[key])artic[key]=clamp(val,SPECS[key].min,SPECS[key].max)}
 send({type:'artic',values:artic,tipFree:true});tele=null;
 if(mark)document.querySelectorAll('[data-vowel]').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false')});
 syncControls();
}
function syncControls(){
 $('jaw').value=artic.jaw/2.6*100;$('jaw-value').textContent=Math.round(artic.jaw/2.6*100)+' %';
 $('round').value=clamp(artic.lipProt/1.2*100,0,100);$('round-value').textContent=Math.round($('round').value)+' %';
 $('tongue-x').value=(artic.tbX-1)/3.8*100;$('tongue-y').value=(artic.tbY-4.8)/4.4*100;
 $('pitch').value=pitch;$('pitch-value').textContent=Math.round(pitch)+' Hz';$('volume').value=volume;$('volume-value').textContent=volume+' %';
}
function vowel(ipa){setArtic({...NEUTRAL,...TARGETS[ipa].artic},false);document.querySelectorAll('[data-vowel]').forEach(b=>{const yes=b.dataset.vowel===ipa;b.classList.toggle('selected',yes);b.setAttribute('aria-pressed',String(yes))});}
function setMode(value){mode=value;document.querySelectorAll('[data-mode]').forEach(b=>{const yes=b.dataset.mode===mode;b.classList.toggle('selected',yes);b.setAttribute('aria-pressed',String(yes))});setSource();$('pitch').disabled=mode==='whisper';}
$('settings').addEventListener('click',e=>{const v=e.target.closest('[data-vowel]'),m=e.target.closest('[data-mode]');if(v)vowel(v.dataset.vowel);if(m)setMode(m.dataset.mode)});
$('jaw').oninput=e=>setArtic({jaw:+e.target.value/100*2.6});
$('round').oninput=e=>{const u=+e.target.value/100;setArtic({lipProt:u*1.2,lipWidth:.9-u*.65,lipAp:1.5-u*1.15})};
$('tongue-x').oninput=e=>setArtic({tbX:1+(+e.target.value/100)*3.8});
$('tongue-y').oninput=e=>setArtic({tbY:4.8+(+e.target.value/100)*4.4});
$('pitch').oninput=e=>{pitch=+e.target.value;setSource();syncControls()};
$('volume').oninput=e=>{volume=+e.target.value;setVolume();syncControls()};
$('reset').onclick=()=>{stop();pitch=170;volume=35;setMode('normal');vowel('ɑ');};
$('next').onclick=()=>{experiment=(experiment+1)%experiments.length;$('experiment-count').textContent=`EXPERIMENT ${experiment+1} AV 3`;$('experiment-title').textContent=experiments[experiment][0];$('experiment-text').textContent=experiments[experiment][1]};
function pointer(e){const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}}
function pick(e){if(!ready||!frame)return null;const p=pointer(e);let best=null,distance=30;for(const h of renderer.handles(model,frame,shown)){const d=Math.hypot(renderer.X(h.pos)-p.x,renderer.Y(h.pos)-p.y);if(d<distance){best=h.id;distance=d}}return best}
canvas.onpointerdown=e=>{const id=pick(e);if(!id)return;const p=pointer(e);drag={id,start:renderer.toBody(p.x,p.y),artic:{...artic},pointer:e.pointerId};canvas.setPointerCapture(e.pointerId);e.preventDefault()};
canvas.onpointermove=e=>{if(!drag){hover=pick(e);canvas.style.cursor=hover?'grab':'default';return;}if(e.pointerId!==drag.pointer)return;const q=pointer(e),p=renderer.toBody(q.x,q.y),k=model.tract.scale,dx=(p.x-drag.start.x)/k,dy=(p.y-drag.start.y)/k;
 if(drag.id==='tongue'){const pos=model.tract.unP(p.x,p.y);setArtic({tbX:pos.x,tbY:pos.y})}
 if(drag.id==='jaw')setArtic({jaw:drag.artic.jaw-dy});
 if(drag.id==='lips')setArtic({lipAp:drag.artic.lipAp-dy*1.2,lipProt:drag.artic.lipProt+dx});
};
const release=e=>{if(drag&&e.pointerId===drag.pointer){drag=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId)}};
canvas.onpointerup=canvas.onpointercancel=canvas.onlostpointercapture=release;
function draw(time){
 raf=requestAnimationFrame(draw);if(document.hidden||!ready||time-lastFrame<32)return;
 const dt=Math.min(.05,(time-lastFrame)/1000||.033);lastFrame=time;
 const dpr=Math.min(devicePixelRatio||1,2),w=canvas.clientWidth,h=canvas.clientHeight;
 if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);renderer.resize(w,h)}
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#0c2234';ctx.fillRect(0,0,w,h);
 shown=tele&&wanted?VoiceModel.articFromArray(tele.t.artic):artic;frame=model.frame(shown);
 drawFront($('front'),shown);
 renderer.face.update(wanted?tele:null,dt);
 renderer.draw(ctx,model,frame,shown,wanted?tele:null,{pressure:true,particles:!matchMedia('(prefers-reduced-motion: reduce)').matches,grid:false,calipers:false},{hover,drag:drag?.id||null,dt,formants:[],slots:[],info:[]});
 const ww=wave.clientWidth,wh=wave.clientHeight;if(wave.width!==Math.round(ww*dpr)){wave.width=Math.round(ww*dpr);wave.height=Math.round(wh*dpr)}waveCtx.setTransform(dpr,0,0,dpr,0,0);waveCtx.clearRect(0,0,ww,wh);samples.fill(0);if(analyser&&wanted)analyser.getFloatTimeDomainData(samples);
 waveCtx.strokeStyle='#ffcf7d';waveCtx.lineWidth=1.5;waveCtx.beginPath();for(let i=0;i<ww;i++){const v=samples[Math.floor(i/ww*samples.length)]||0,y=wh/2-clamp(v*4,-1,1)*(wh/2-2);i?waveCtx.lineTo(i,y):waveCtx.moveTo(i,y)}waveCtx.stroke();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();void context?.suspend().catch(()=>{})}});
window.addEventListener('pagehide',()=>{stop();void context?.suspend().catch(()=>{})});
window.addEventListener('blur',()=>{if(drag)drag=null;stop()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')stop()});
for(const ev of ['mp-ljud','mp-ljud-andrat'])document.addEventListener(ev,()=>{if(window.Ljud&&!Ljud.on)stop('Ljudet är avstängt. Tryck på Starta för att lyssna igen.')});
async function boot(){
 try{
  await initChimera(new URL('./chimera/wasm/chimera.wasm',import.meta.url).href);
  const [engine,analysis,view]=await Promise.all([import('./chimera/wasm/engine.js'),import('./chimera/ui/analysis.js'),import('./chimera/ui/render/anatomy.js')]);
  planPhrases=engine.planPhrases;tokenizeIpa=engine.tokenizeIpa;NEUTRAL=engine.NEUTRAL;SPECS=engine.ARTIC_SPECS;TARGETS={...engine.VOWEL_TARGETS.male};
  // Approximate Swedish central rounded U between the calibrated Y and O postures.
  const uArtic={};for(const key of Object.keys(TARGETS.y.artic))uArtic[key]=(TARGETS.y.artic[key]+TARGETS.u.artic[key])/2;
  TARGETS['sv-u']={artic:uArtic};VoiceModel=analysis.VoiceModel;
  model=new VoiceModel(body,48000);renderer=new view.AnatomyRenderer();artic={...NEUTRAL};vowel('ɑ');ready=true;refreshSpeech();
  $('loading').hidden=true;canvas.parentElement.classList.add('ready');$('settings').disabled=false;$('play').disabled=false;$('reset').disabled=false;requestAnimationFrame(draw);
 }catch(error){console.error(error);$('loading').textContent='Röstlabbet kunde inte laddas. Ladda om sidan och försök igen.';status('Röstmotorn kunde inte laddas.',true)}
}
// Read-only diagnostic access for browser regression tests.
window.__rost={get ready(){return ready},get playing(){return wanted},get artic(){return {...artic}},get telemetry(){return tele},get audioState(){return context?.state||'not-started'},get mode(){return mode},get handles(){return ready&&frame?renderer.handles(model,frame,shown).map(h=>({id:h.id,x:renderer.X(h.pos),y:renderer.Y(h.pos)})):[]},sample(){const s=new Float32Array(2048);analyser?.getFloatTimeDomainData(s);return Array.from(s)}};
function speechStatus(text){$('speech-status').textContent=text}
function refreshSpeech(){$('read').disabled=!ready||!$('sentence').value.trim()}
function stopSpeech(){
 if(!utterance)return;
 utterance=null;send({type:'stopSpeech'});$('read-stop').disabled=true;$('read').textContent='▶ Låt munnen prata';speechStatus('Munnen har slutat prata.');
}
$('sentence').oninput=()=>{$('sentence-count').textContent=`${$('sentence').value.length} / 200`;refreshSpeech()};
$('read-stop').onclick=()=>stop();
$('read').onclick=async()=>{
 const text=$('sentence').value.trim().slice(0,200);if(!ready||!text)return;
 if(/[^a-zåäö\s.!?,;:\-]/i.test(text)){speechStatus('Skriv med bokstäver. Skriv siffror som ord, till exempel tre.');return}
 stop();const phrases=swedishPhrases(text,tokenizeIpa);if(!phrases.length)return;
 if(window.Ljud&&!Ljud.on){Ljud.set(true);document.dispatchEvent(new Event('mp-ljud-andrat'));}
 const id=++speechId;utterance={id,end:null};wanted=true;reflectPlay();$('read-stop').disabled=false;speechStatus('Munnen gör sig redo …');
 try{
  const plan=planPhrases(phrases,{body,t0:0,rate:.8,f0:pitch});
  await ensureAudio();if(!utterance||utterance.id!==id||!wanted||document.hidden)return;
  send({type:'gate',level:0});setSource();setVolume();
  send({type:'schedule',id,gestures:plan.gestures,segments:plan.segments,end:plan.end,replace:true});
  $('read').textContent='↻ Säg igen';speechStatus('Tungan och munnen formar ljuden du hör.');reflectPlay();
 }catch(error){failAudio(error);speechStatus('Munnen kunde inte säga texten. Prova igen.');}
};
refreshSpeech();
void boot();
