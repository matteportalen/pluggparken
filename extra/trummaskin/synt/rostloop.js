/* Röstloop: syntens egen loopstation för Röstklipp.
   Ljudet finns bara i minnet och i projektfiler som eleven själv sparar. Inget skickas någonstans. */
(function(G){
'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/* ---------- Tonhöjd med samma längd ----------
   Loopen tänjs först i tid (WSOLA: varje ny bit läggs där vågen passar bäst mot den förra,
   så att perioderna inte släcker ut varandra) och läses sedan upp snabbare eller långsammare.
   Ljudet behandlas som en loop: slutet går sömlöst över i början. */
function lagpass(x,fc,sr){const y=Float32Array.from(x);for(const q of [.5412,1.3066]){const w=2*Math.PI*fc/sr,al=Math.sin(w)/(2*q),c=Math.cos(w),a0=1+al,b0=(1-c)/2/a0,b1=(1-c)/a0,a1=-2*c/a0,a2=(1-al)/a0;let x1=0,x2=0,y1=0,y2=0;for(let i=0;i<y.length;i++){const v=y[i],o=b0*v+b1*x1+b0*x2-a1*y1-a2*y2;x2=x1;x1=v;y2=y1;y1=o;y[i]=o}}return y}
function pitch(x,st,sr=44100){const n=x.length;if(!st||n<64)return x;const r=2**(st/12);
  let N=2*Math.round(sr*.02);while(N>n/2&&N>32)N>>=1;const Hs=N>>1,tol=Math.max(4,Math.min(Math.round(sr*.008),N)),F=Math.min(Math.round(sr*.012),n>>2);
  const pad=4*N+2*tol+8,xp=new Float32Array(n+2*pad);for(let i=0;i<xp.length;i++)xp[i]=x[(((i-pad)%n)+n)%n];
  const win=new Float32Array(N);for(let i=0;i<N;i++)win[i]=.5-.5*Math.cos(2*Math.PI*i/N);
  const need=Math.ceil((n+F+4)*r)+N,frames=Math.ceil(need/Hs)+2,y=new Float32Array((frames+2)*Hs+N);
  const corr=(a,b,step)=>{let s=0,e=0;for(let j=0;j<N;j+=step){const v=xp[a+j];s+=v*xp[b+j];e+=v*v}return s/Math.sqrt(e+1e-9)};
  const lo=-N-tol,hi=n+3*N+tol;let prev=0;
  for(let k=0;k<frames;k++){const ideal=Math.round((k-1)*Hs/r);let pos=ideal;
    if(k){const tg=prev+Hs+pad;let best=-Infinity,bd=0;
      for(let d=-tol;d<=tol;d+=4){const c=corr(ideal+d+pad,tg,4);if(c>best){best=c;bd=d}}
      const c0=bd;for(let d=Math.max(-tol,c0-3);d<=Math.min(tol,c0+3);d++){const c=corr(ideal+d+pad,tg,2);if(c>best){best=c;bd=d}}
      pos=ideal+bd}
    pos=clamp(pos,lo,hi);prev=pos;const o=k*Hs,p=pos+pad;for(let j=0;j<N;j++)y[o+j]+=xp[p+j]*win[j]}
  const src=r>1.12?lagpass(y,.45*sr/r,sr):y,out=new Float32Array(n+F);
  for(let i=0;i<n+F;i++){const q=Hs+i*r,i0=Math.floor(q),f=q-i0,a=src[i0-1],b=src[i0],c=src[i0+1],d=src[i0+2];out[i]=b+.5*f*(c-a+f*(2*a-5*b+4*c-d+f*(3*(b-c)+d-a)))}
  const res=out.subarray(0,n).slice();for(let i=0;i<F;i++){const w=i/F;res[i]=out[i]*w+out[n+i]*(1-w)}return res}

/* ---------- Effekter per del ---------- */
const HALL=['LOOP','HACK 1/8','HACK 1/16','HACK 1/32','FRYS'],GRIND=['AV','1/8','1/16','1/32'];
const fresh=()=>({ton:0,rost:0,tune:0,rev:0,hall:0,grind:0,flytt:0});
function clean(o){const f=fresh();if(!o||typeof o!=='object')return f;const int=(k,a,b)=>{if(Number.isFinite(o[k]))f[k]=Math.round(clamp(o[k],a,b))};int('ton',-12,12);int('rost',0,6);int('tune',0,3);int('rev',0,1);int('hall',0,4);int('grind',0,3);int('flytt',0,15);return f}
const sig=(f,env)=>[f.ton,f.rost,f.tune,f.rev,f.hall,f.grind,f.flytt,env.bpm,f.tune?env.key+'/'+env.scale:''].join(',');
const neutral=f=>!f||!(f.ton||f.rost||f.tune||f.rev||f.hall||f.grind||f.flytt);
function slump(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296}}
/* FRYS: korta korn runt delens starkaste ögonblick läggs om lott, så att rösten står still som en ton */
function frys(ch,sr){const n=ch[0].length,g=Math.round(sr*.07);if(n<g*2)return ch;const W=Math.round(sr*.05);let best=0,bi=0,e=0;const x=ch[0];
  for(let i=0;i<n;i++){e+=x[i]*x[i];if(i>=W)e-=x[i-W]*x[i-W];if(i>=W&&e>best){best=e;bi=i-W}}
  const c0=clamp(bi+W/2,g,n-g),spread=Math.min(Math.round(sr*.03),c0-g/2,n-c0-g/2-1),L=Math.round(sr*1.5),X=Math.round(sr*.12),hop=g>>2,rnd=slump(977+n);
  const starts=[];for(let o=0;o<L+X;o+=hop)starts.push(Math.round(c0-g/2+(rnd()*2-1)*Math.max(0,spread)));
  return ch.map(x=>{const y=new Float32Array(L+X+g);starts.forEach((s,k)=>{const o=k*hop;for(let j=0;j<g;j++)y[o+j]+=x[clamp(s+j,0,n-1)]*(.5-.5*Math.cos(2*Math.PI*j/g))*.5});
    const out=new Float32Array(L);for(let i=0;i<L;i++)out[i]=y[i+g];for(let i=0;i<X;i++){const w=i/X;out[i]=out[i]*w+y[L+g+i]*(1-w)}return out})}
function post(ch,sr,f,bpm){let somlos=false;if(f.rev)ch=ch.map(x=>Float32Array.from(x).reverse());
  const not=d=>Math.max(64,Math.round(sr*60/bpm/d));
  if(f.hall===4){const y=frys(ch,sr);somlos=y!==ch;ch=y}
  else if(f.hall){const len=Math.min(ch[0].length,not([2,4,8][f.hall-1]));ch=ch.map(x=>x.slice(0,len))}
  if(f.grind){const per=not([2,4,8][f.grind-1]),on=per>>1,fd=Math.min(Math.round(sr*.003),on>>2);ch=ch.map(x=>{const y=Float32Array.from(x);for(let i=0;i<y.length;i++){const q=i%per;y[i]*=q>=on?0:Math.min(1,q/fd,(on-q)/fd)}return y});somlos=false}
  return{ch,somlos}}

/* En vy av en inspelning med effekterna inräknade. Originalet ändras aldrig. */
function view(asset,f,env){if(!asset)return null;f=clean(f);if(neutral(f))return asset;if(!asset.views)asset.views=new Map();const key=sig(f,env);let v=asset.views.get(key);if(v){asset.views.delete(key);asset.views.set(key,v);return v}
  const b=asset.buffer,sr=b.sampleRate,hel=[f.ton,f.rost,f.tune].join()+(f.tune?env.key+'/'+env.scale:'');if(!asset.hela)asset.hela=new Map();let ch=asset.hela.get(hel);
  if(!ch){ch=[];for(let c=0;c<b.numberOfChannels;c++){let x=b.getChannelData(c);if(f.tune&&env.autoTune)x=env.autoTune(x,sr,f.tune);if(f.ton)x=pitch(x,f.ton,sr);if(f.rost&&env.rost)x=env.rost(x,f.rost,sr);ch.push(x)}
    let pk=0;ch.forEach(x=>{for(let i=0;i<x.length;i++){const a=Math.abs(x[i]);if(a>pk)pk=a}});if(pk>.98)ch=ch.map(x=>x.map(s=>s*.98/pk));
    asset.hela.set(hel,ch);while(asset.hela.size>3)asset.hela.delete(asset.hela.keys().next().value)}
  const k=Math.round(b.length*f.flytt/16),data=k?ch.map(x=>{const y=new Float32Array(x.length);y.set(x.subarray(x.length-k),0);y.set(x.subarray(0,x.length-k),k);return y}):ch;v={id:asset.id,name:asset.name,cuts:asset.cuts,cache:new Map(),buffer:{length:b.length,sampleRate:sr,numberOfChannels:data.length,duration:b.duration,getChannelData:c=>data[c]},post:(parts,rate)=>post(parts,rate,f,env.bpm)};
  asset.views.set(key,v);while(asset.views.size>4)asset.views.delete(asset.views.keys().next().value);return v}
const ready=(asset,f,env)=>!asset||neutral(clean(f))||!!asset.views?.has(sig(clean(f),env));

G.PPRostloop={pitch,post,frys,view,ready,fresh,clean,sig,neutral,HALL,GRIND};
})(typeof window!=='undefined'?window:globalThis);
