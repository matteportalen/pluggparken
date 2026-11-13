/* Egna ljudmotorer. Web Audios bandbegränsade oscillatorer fungerar även offline. */
(function(){
'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,Number.isFinite(+v)?+v:a));
const defaults={flavor:0,trim:50,ping:0,kit:0,cut:62,res:18,attack:8,decay:32,sustain:65,release:32,color:45,motion:18,rate:28,echo:18,space:20,vol:70};
const modules=[
{id:'glod',name:'Glöd',tag:'ANALOG POLYSYNT',color:'#ff985d',desc:'Två förstämda oscillatorer, subbas och ett dubbelt lågpassfilter.',presets:[['Varm puls',{cut:48,color:35}],['Syrlig bas',{cut:26,res:72,attack:0,decay:22,sustain:22,release:8,color:72}],['Mässing',{cut:58,attack:12,decay:30,sustain:58,color:42}]]},
{id:'prisma',name:'Prisma',tag:'FM · METALL & GLAS',color:'#b69bff',desc:'Frekvensmodulation med levande övertoner: från elpiano till metall.',presets:[['Glasregn',{color:58,attack:0,decay:65,sustain:12,release:55,cut:88}],['Elektriska tangenter',{color:25,attack:0,decay:40,sustain:24,release:25}],['Metallverk',{color:90,res:30,cut:83,motion:38}]]},
{id:'svav',name:'Sväv',tag:'BRED PAD · STEREO',color:'#70dacf',desc:'Fem svävande oscillatorer som långsamt rör sig genom filtret.',presets:[['Norrsken',{attack:55,release:75,cut:48,motion:40,space:65}],['Ljushav',{attack:35,release:65,cut:78,color:65,space:48}],['Mörk materia',{attack:62,release:80,cut:25,color:80,motion:60}]]},
{id:'strang',name:'Sträng',tag:'FYSISK MODELL · PLOCK',color:'#f1ce7b',desc:'En beräknad sträng: ett kort brusanslag cirkulerar och dämpas.',presets:[['Träharpa',{attack:0,color:35,decay:55,sustain:0,release:30,cut:78}],['Ståltråd',{attack:0,color:88,decay:72,sustain:0,release:48,cut:92}],['Dämpad',{attack:0,color:12,decay:18,sustain:0,release:8,cut:48}]]},
{id:'katedral',name:'Katedral',tag:'ADDITIV ORGEL',color:'#f39fbd',desc:'Sex harmoniska register bildar en orgel med rörelse i filtret.',presets:[['Valv',{attack:12,color:58,sustain:90,release:50,space:62}],['Ljus orgel',{attack:0,color:85,sustain:85,release:15,cut:88}],['Djup andning',{attack:40,color:15,sustain:90,release:65,cut:45}]]},
{id:'korn',name:'Korn',tag:'SYNTETISKA LJUDKORN',color:'#96d47b',desc:'Små överlappande ljudkorn med spridd tonhöjd och stereoplacering.',presets:[['Stjärnstoft',{attack:25,color:65,decay:55,release:65,space:65,motion:55}],['Frusna vågor',{attack:52,color:32,release:72,motion:28,space:50}],['Pulver',{attack:0,color:90,decay:22,sustain:20,release:22,motion:70}]]}
];
modules.push({id:'slagverk',name:'Slagverk',tag:'TRUMKIT · 16 SLAGLJUD',color:'#ffba71',desc:'Varje pad spelar ett eget slagljud: bastrumma, virvel, hi-hats, klapp och slagverk.',presets:[['Studio',{kit:0,cut:100,attack:0,sustain:100,release:0,echo:0,space:8,motion:0}],['Elektrisk',{kit:1,cut:100,attack:0,sustain:100,release:0,echo:0,space:5,motion:0}],['Lo-fi',{kit:2,cut:94,attack:0,sustain:100,release:0,echo:5,space:15,motion:0}]]});
modules.push({id:'rostklipp',name:'Röstklipp',tag:'EGNA LOOPKLIPP',color:'#86dce0',desc:'Spela in rösten i RÖSTLOOP eller hämta en loop från loopstationen. Håll nere en pad för att loopa delen, släpp för att stoppa.',presets:[['Egna loopklipp',{cut:100,attack:0,release:0,sustain:100,color:50,motion:0,echo:0,space:0}]]});
modules.push({id:'samplepaket',name:'Samplepaket',tag:'16 LJUD PÅ PADS',color:'#7fe08a',desc:'Välj ett av Musiklabbets samplepaket. Varje pad och tangent spelar ett klipp en gång, även när du släpper.',presets:[['Samplepaket',{cut:100,attack:0,sustain:100,release:0,color:50,motion:0,echo:0,space:0}]]});
const drumNames=['Bastrumma','Virvel','Stängd hat','Öppen hat','Klapp','Låg tom','Mellan-tom','Hög tom','Rim','Claves','Shaker','Tamburin','Crash','Triangel','Bongo','Zap'];
const drumShort=['Bas','Virvel','Hat st','Hat öp','Klapp','Tom L','Tom M','Tom H','Rim','Claves','Shaker','Tamb','Crash','Triang','Bongo','Zap'];
const drumIndex=midi=>((Math.round(midi)-48)%16+16)%16;
const arpNotes=mode=>mode===2?[0,3,7,12]:mode===3?[12,7,4,0]:mode===4?[0,4,7,12,7,4]:mode===5?[0,3,7,12,7,3]:[0,4,7,12];
// Stable ids keep the sound library expandable without changing saved tracks.
const sounds=[];
const add=(id,name,category,module,preset,params={},desc='')=>sounds.push({id,name,category,module,preset,params:{...defaults,...(preset===null?{}:modules.find(m=>m.id===module).presets[preset][1]),...params},desc});
add('varm-puls','Varm puls','SYNT','glod',0);
add('djupbas','Djupbas','BAS','glod',1);
add('massing','Mässing','SYNT','glod',2);
add('ufo','UFO','RYMD','glod',null,{flavor:2,cut:80,res:35,color:28,attack:8,decay:55,sustain:80,release:45,motion:42,rate:18,space:48},'Ett svävande tefat. RÖRELSE böjer tonhöjden i vida cirklar.');
add('glasdroppar','Glasdroppar','KLOCKOR','prisma',0);
add('elpiano','Elpiano','TANGENTER','prisma',1);
add('metallverk','Metallverk','METALL','prisma',2);
add('telefon','Telefon','EFFEKTER','prisma',null,{flavor:1,cut:100,res:0,color:40,motion:0,attack:0,decay:10,sustain:100,release:0,echo:0,space:0},'Två toner tillsammans, som knapparna på en telefon. KLANG byter tonernas avstånd.');
add('robot','Robot','EFFEKTER','prisma',null,{flavor:3,cut:84,res:20,color:62,motion:38,rate:48,attack:0,decay:28,sustain:75,release:12,echo:10,space:8},'En metallisk robotröst. KLANG formar övertonerna och RÖRELSE ger vibrato.');
add('norrsken','Norrsken','PAD','svav',0);
add('ljushav','Ljushav','PAD','svav',1);
add('mork-materia','Mörk materia','RYMD','svav',2);
add('rymdradio','Rymdradio','RYMD','svav',null,{flavor:4,cut:78,res:15,color:60,motion:50,rate:25,attack:12,decay:40,sustain:70,release:45,echo:35,space:45},'En avlägsen radiosignal med brus och ringande toner. KLANG blandar in mer brus.');
add('traharpa','Träharpa','STRÄNGAR','strang',0);
add('staltrad','Ståltråd','STRÄNGAR','strang',1);
add('dampad','Dämpad','STRÄNGAR','strang',2);
add('pizzicato','Pizzicato','STRÄNGAR','strang',null,{cut:72,color:55,attack:0,decay:38,sustain:0,release:14,motion:0,echo:5,space:28},'Ett kort plock på en spänd sträng. KLANG går från mjukt trä till blank metall.');
add('valv','Valv','ORGEL','katedral',0);
add('ljus-orgel','Ljus orgel','ORGEL','katedral',1);
add('djup-andning','Djup andning','ORGEL','katedral',2);
add('stjarnstoft','Stjärnstoft','RYMD','korn',0);
add('frusna-vagor','Frusna vågor','PAD','korn',1);
add('pulver','Pulver','EFFEKTER','korn',2);
add('kosmiskt-regn','Kosmiskt regn','RYMD','korn',null,{cut:92,color:82,attack:5,decay:65,sustain:45,release:75,motion:85,rate:50,echo:42,space:72},'Korta glittrande ljudkorn med stort eko. RÖRELSE sprider kornen i tonhöjd.');
// Gain trims measured on a C4 note: preserve pad attacks and balance the audible onset of plucks.
const soundTrim={'varm-puls':42,djupbas:35,massing:48,ufo:26,glasdroppar:36,elpiano:50,metallverk:32,telefon:29,robot:63,norrsken:57,ljushav:64,'mork-materia':59,rymdradio:35,traharpa:66,staltrad:67,dampad:185,pizzicato:85,valv:39,'ljus-orgel':36,'djup-andning':55,stjarnstoft:55,'frusna-vagor':69,pulver:115,'kosmiskt-regn':57};
sounds.forEach(s=>s.params.trim=soundTrim[s.id]);
add('studsboll','Studsboll','ARPEGGIO','prisma',null,{cut:90,color:24,attack:0,decay:22,sustain:20,release:12,motion:8,echo:20,space:15,trim:50},'Håll en tangent: tonerna studsar upp och ner i takt med tempot.');sounds[sounds.length-1].arp=4;
add('studseko','Studseko','STEREO-EKO','prisma',null,{cut:88,color:25,attack:0,decay:32,sustain:20,release:18,ping:1,echo:65,space:0,trim:48},'Ett tempobundet eko som växlar mellan vänster och höger. Hörs tydligast i hörlurar.');
add('trumkit-studio','Trumkit · Studio','TRUMMOR','slagverk',0,{trim:50});
add('trumkit-elektrisk','Trumkit · Elektrisk','TRUMMOR','slagverk',1,{trim:50});
add('trumkit-lofi','Trumkit · Lo-fi','TRUMMOR','slagverk',2,{trim:50});
add('rostklipp','Röstklipp','EGNA LJUD','rostklipp',0,{trim:90,vol:80});
add('samplepaket','Samplepaket','LJUDKLIPP','samplepaket',0,{trim:90,vol:80});
function soundFor(track){return sounds.find(s=>s.id===track.soundId&&s.module===track.module)||sounds.find(s=>s.module===track.module&&s.preset===track.preset)||sounds[0]}
const buffers=new WeakMap();
function stringBuffer(c,midi,p){let cache=buffers.get(c);if(!cache){cache=new Map();buffers.set(c,cache)}const key=[midi,p.color,p.decay].join(':');if(cache.has(key))return cache.get(key);const hz=440*2**((midi-69)/12),n=Math.max(2,Math.round(c.sampleRate/hz)),len=Math.ceil(c.sampleRate*(.3+p.decay/25)),b=c.createBuffer(1,len,c.sampleRate),out=b.getChannelData(0),ring=new Float32Array(n);let seed=931+midi*313;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296*2-1};for(let i=0;i<n;i++)ring[i]=rand()*.7;const bright=.12+p.color/140,damp=.97+p.decay/3500;for(let i=0;i<len;i++){const j=i%n,next=(j+1)%n;out[i]=ring[j];ring[j]=damp*(ring[j]*bright+ring[next]*(1-bright))}if(cache.size>96)cache.clear();cache.set(key,b);return b}
function create(c,{ut,module='glod',params={},bpm=90,limit=8,asset=null,sample=null}={}){
let p={...defaults,...params};const voices=[];const input=c.createGain(),dry=c.createGain(),delay=c.createDelay(2),feedback=c.createGain(),wet=c.createGain(),pan=c.createStereoPanner();const hall=c.createGain(),roomNodes=[];[.071,.113,.173].forEach((time,i)=>{const dl=c.createDelay(.5),fb=c.createGain(),lp=c.createBiquadFilter(),pn=c.createStereoPanner();dl.delayTime.value=time;fb.gain.value=.62;lp.frequency.value=2200+i*700;pn.pan.value=i-1;input.connect(dl);dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(pn);pn.connect(hall);roomNodes.push(dl,fb,lp,pn)});hall.connect(ut);input.connect(dry);dry.connect(ut);input.connect(delay);delay.connect(feedback);feedback.connect(delay);delay.connect(wet);wet.connect(pan);pan.connect(ut);
const rightDelay=c.createDelay(2),crossL=c.createGain(),crossR=c.createGain(),rightWet=c.createGain(),rightPan=c.createStereoPanner();delay.connect(crossL);crossL.connect(rightDelay);rightDelay.connect(crossR);crossR.connect(delay);rightDelay.connect(rightWet);rightWet.connect(rightPan);rightPan.pan.value=1;rightPan.connect(ut);
function sync(){hall.gain.value=p.space/350;dry.gain.value=.8;delay.delayTime.value=60/bpm*.75;feedback.gain.value=p.ping?0:.12+p.echo/180;wet.gain.value=p.echo/180;pan.pan.value=p.ping?-1:.3;rightDelay.delayTime.value=60/bpm*.75;crossL.gain.value=p.ping?.6:0;crossR.gain.value=p.ping?.6:0;rightWet.gain.value=p.ping?p.echo/180:0;}
sync();
function noteOn(midi,vel=1,t=c.currentTime,duration=1){const clip=module==='samplepaket'&&sample?.(midi);if(module==='samplepaket'){if(!clip?.buf)return{release(){},kill(){}};duration=clip.buf.duration/2**((p.color-50)/50);}if(module==='rostklipp'&&!asset)return{release(){},kill(){}};const held=module==='rostklipp'&&!Number.isFinite(duration);if(held)duration=86400;if(module==='slagverk')duration=.95;t=Math.max(t,c.currentTime);midi=clamp(midi,24,96);const f=440*2**((midi-69)/12),a=Math.min(.003+(p.attack/100)**2*2,Math.max(.01,duration*.45)),d=.035+p.decay/80,r=module==='rostklipp'?.006:.025+(p.release/100)**2*2.4,end=t+Math.max(.04,duration),stop=end+r+.05;
// Eight voices globally when the host assigns two to each of four tracks.
while(voices.length&&voices[0].stop<=t)voices.shift();if(voices.length>=limit){const old=voices.shift();old.kill(t)}
const amp=c.createGain(),f1=c.createBiquadFilter(),f2=c.createBiquadFilter(),vpan=c.createStereoPanner(),nodes=[],sources=[];f1.type=f2.type='lowpass';const cutoff=Math.min(c.sampleRate*.42,module==='slagverk'&&p.kit===2?6500:22050,70*2**(p.cut/12));f1.frequency.setValueAtTime(cutoff,t);f1.frequency.exponentialRampToValueAtTime(Math.max(45,cutoff*(.35+.65*p.sustain/100)),t+a+d);f2.frequency.value=cutoff;f1.Q.value=.6+p.res/12;f2.Q.value=.6;f1.connect(f2);f2.connect(amp);amp.connect(vpan);vpan.connect(input);vpan.pan.value=module==='svav'?(midi%3-1)*.4:0;
const level=.42*(p.trim/50)*(module==='strang'?1.6:module==='katedral'?.8:1)*vel*(p.vol/100)**1.5; amp.gain.setValueAtTime(0,t);amp.gain.linearRampToValueAtTime(level,t+a);amp.gain.setTargetAtTime(level*p.sustain/100,t+a,d/4);amp.gain.cancelScheduledValues(end);amp.gain.setTargetAtTime(0,end,r/5);
function osc(type,hz,gain,det=0,dest=f1){const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=hz;o.detune.value=det;g.gain.value=gain;o.connect(g);g.connect(dest);o.start(t);o.stop(stop);sources.push(o);nodes.push(o,g);return o}
if(module==='samplepaket'){const src=c.createBufferSource();src.buffer=clip.buf;src.playbackRate.value=2**((p.color-50)/50);src.connect(f1);src.start(t);src.stop(stop);sources.push(src);nodes.push(src)}
else if(module==='rostklipp'){const b=PPSyntKlipp.slice(asset,PPSyntKlipp.padIndex(midi,asset.cuts.length-1),c),src=c.createBufferSource();src.buffer=b;src.loop=true;src.playbackRate.value=2**((p.color-50)/50);src.connect(f1);src.start(t);if(!held)src.stop(stop);sources.push(src);nodes.push(src)}
else if(module==='slagverk'){
  const ix=drumIndex(midi),tune=.8+p.color/220,kit=p.kit;
  function tone(hz,tail,amount=.7,type='sine',slide=0){const o=osc(type,hz*tune,amount),g=c.createGain();o.disconnect();o.connect(g);g.connect(f1);g.gain.setValueAtTime(1,t);g.gain.exponentialRampToValueAtTime(.0001,t+tail);if(slide)o.frequency.exponentialRampToValueAtTime(slide*tune,t+Math.min(tail,.18));nodes.push(g)}
  function noise(tail,hz,type='highpass',amount=.7,dt=0){const b=c.createBuffer(1,Math.ceil(c.sampleRate*(tail+.01)),c.sampleRate),a=b.getChannelData(0);let seed=123+ix*31;for(let i=0;i<a.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;a[i]=(seed/4294967296)*2-1}const n=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();n.buffer=b;f.type=type;f.frequency.value=hz;f.Q.value=.7;g.gain.setValueAtTime(amount,t+dt);g.gain.exponentialRampToValueAtTime(.0001,t+dt+tail);n.connect(f);f.connect(g);g.connect(f1);n.start(t+dt);n.stop(t+dt+tail+.01);sources.push(n);nodes.push(n,f,g)}
  if(ix===0){tone(kit===1?165:125,kit===1?.65:.42,.9,kit===1?'triangle':'sine',45);noise(.012,2200,'highpass',.25)}
  else if(ix===1){tone(185,.13,.35);noise(.18,1500,'highpass',1)}
  else if(ix===2)noise(.065,kit===2?4200:6800,'highpass',.8);
  else if(ix===3)noise(.46,kit===2?4000:6200,'highpass',.7);
  else if(ix===4){noise(.025,1300,'bandpass',1);noise(.03,1300,'bandpass',1,.025);noise(.16,1300,'bandpass',.7,.05)}
  else if(ix>=5&&ix<=7)tone([90,145,210][ix-5]*1.4,.34,.8,'sine',[75,120,175][ix-5]);
  else if(ix===8){tone(1600,.025,.45,'triangle');tone(650,.04,.25)}
  else if(ix===9)tone(2400,.055,.55);
  else if(ix===10)noise(.12,4800,'highpass',.9);
  else if(ix===11){noise(.12,5000,'highpass',.65);[3100,4200,6300].forEach(h=>tone(h,.23,.16))}
  else if(ix===12){noise(.8,3600,'highpass',.8);[2300,3970,5710].forEach(h=>tone(h,.5,.13))}
  else if(ix===13)[2400,4800,7200].forEach((h,i)=>tone(h,.75,.35/(i+1)));
  else if(ix===14)tone(470,.22,.8,'sine',250);
  else tone(1400,.24,.65,kit===1?'square':'sine',70);
  // One-shot tails continue after a finger lifts; this silent clock cleans up the full hit.
  const clock=c.createBufferSource();clock.buffer=c.createBuffer(1,1,c.sampleRate);clock.loop=true;clock.start(t);clock.stop(stop);sources.push(clock);nodes.push(clock);
}
else if(p.flavor===1){osc('sine',697*f/261.6256,.5);osc('sine',(1100+p.color*4)*f/261.6256,.5)}
else if(p.flavor===2){const o=osc('sine',f,.85);osc('triangle',f*2,.12);const l=osc('sine',.4+p.rate/15,f*(.05+p.motion/90),0,o.frequency);void l}
else if(p.flavor===3){const o=osc('sawtooth',f,.45);osc('sine',f*(1.5+p.color/20),f*(.1+p.color/30),0,o.frequency);osc('square',f/2,.15);osc('sine',2+p.rate/8,f*p.motion/2000,0,o.frequency)}
else if(p.flavor===4){osc('sine',f,.6);osc('sine',f*1.503,.2);const n=Math.ceil(c.sampleRate*.3),buf=c.createBuffer(1,n,c.sampleRate),arr=buf.getChannelData(0);let seed=37;for(let i=0;i<n;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;arr[i]=(seed/4294967296*2-1)*p.color/220}const src=c.createBufferSource(),hp=c.createBiquadFilter();hp.type='bandpass';hp.frequency.value=f*3;hp.Q.value=5;src.buffer=buf;src.loop=true;src.connect(hp);hp.connect(f1);src.start(t);src.stop(stop);sources.push(src);nodes.push(src,hp)}
else if(module==='prisma'){const car=osc('sine',f,.8),mod=osc('sine',f*(p.color>70?3.5:2),f*(.1+p.color/12),0,car.frequency);void mod;}
else if(module==='strang'){const s=c.createBufferSource();s.buffer=stringBuffer(c,Math.round(midi),p);s.connect(f1);s.start(t);s.stop(stop);sources.push(s);nodes.push(s)}
else if(module==='katedral'){[1,2,3,4,6,8].forEach((n,i)=>osc('sine',f*n,(i===0?.7:(p.color/100)**(i/2)*.35)/Math.sqrt(n)))}
else if(module==='korn'){const count=12;for(let i=0;i<count;i++){const gt=t+i*Math.max(.012,duration/count),gd=.06+p.color/350,g=c.createGain(),o=c.createOscillator(),pa=c.createStereoPanner();o.type='sine';o.frequency.value=f*2**(((i*7%5)-2)*p.motion/600);pa.pan.value=(i%3-1)*.7;g.gain.setValueAtTime(0,gt);g.gain.linearRampToValueAtTime(.38,gt+gd/2);g.gain.linearRampToValueAtTime(0,gt+gd);o.connect(g);g.connect(pa);pa.connect(f1);o.start(gt);o.stop(gt+gd);sources.push(o);nodes.push(o,g,pa)}}
else if(module==='svav'){[-2,-1,0,1,2].forEach(n=>osc('sawtooth',f,.22,n*(3+p.color/8)))}
else{osc('sawtooth',f,.5,-p.color/12);osc(p.color>55?'square':'sawtooth',f,.35,p.color/12);osc('sine',f/2,.24)}
if(p.motion>0){const l=c.createOscillator(),g=c.createGain();l.frequency.value=.08+p.rate/12;g.gain.value=p.motion*5;l.connect(g);g.connect(f1.detune);l.start(t);l.stop(stop);sources.push(l);nodes.push(l,g)}
const voice={midi,stop,kill(at){amp.gain.cancelScheduledValues(at);amp.gain.setTargetAtTime(0,at,.008);for(const s of sources)try{s.stop(at+.06)}catch{}},release(at){if(module==='slagverk'||module==='samplepaket')return;at=Math.max(at,c.currentTime);amp.gain.cancelScheduledValues(at);amp.gain.setTargetAtTime(0,at,r/5);for(const s of sources)try{s.stop(at+r+.05)}catch{}}};voices.push(voice);
// Release all node references after audio ends; no per-note timers during offline export.
const cleanup=sources[sources.length-1];if(cleanup)cleanup.onended=()=>{for(const n of [...nodes,amp,f1,f2,vpan])try{n.disconnect()}catch{};const ix=voices.indexOf(voice);if(ix>=0)voices.splice(ix,1)};
return voice;
}
return {noteOn,noteOff(midi,t=c.currentTime){voices.filter(v=>v.midi===midi).forEach(v=>v.release(t))},setParam(k,v){if(k in defaults)p[k]=clamp(v,0,k==='trim'?200:100);sync()},allOff(){voices.forEach(v=>v.kill(c.currentTime));voices.length=0},hamta:()=>({...p}),satt(v){p={...defaults,...v};sync()},stang(){this.allOff();input.disconnect();dry.disconnect();delay.disconnect();feedback.disconnect();wet.disconnect();pan.disconnect();hall.disconnect();rightDelay.disconnect();crossL.disconnect();crossR.disconnect();rightWet.disconnect();rightPan.disconnect();roomNodes.forEach(n=>n.disconnect())}};
}
window.PPSyntLjud={modules,sounds,soundFor,defaults,create,clamp,drumNames,drumShort,drumIndex,arpNotes};
})();
