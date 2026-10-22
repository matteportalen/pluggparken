/* Schackmotor för Pluggparken (egen kod, inga bibliotek). Används av schack/index.html och testas i node.
   Brädet är en lista med W*H rutor, index = rad*W + kolumn, rad 0 överst (svarts sida). Versaler = vita, gemener = svarta.
   Tillstånd: {W,H,b,turn:'w'|'b',cast:{K,Q,k,q},ep:index|-1,hm,opt:{dbl,castle,ep}} */
(function(root){
'use strict';
const VAL={p:100,n:320,b:330,r:500,q:900,k:0};
const ND=[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
const KD=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
const BD=[[-1,-1],[-1,1],[1,-1],[1,1]],RD=[[-1,0],[1,0],[0,-1],[0,1]];
const isW=p=>p>='A'&&p<='Z';
const colOf=p=>isW(p)?'w':'b';

function newState(kind){
  if(kind==='mini'){
    const W=5,H=5,b=Array(25).fill(null);
    'rnbqk'.split('').forEach((p,i)=>{b[i]=p;b[20+i]=p.toUpperCase();});
    for(let i=0;i<5;i++){b[5+i]='p';b[15+i]='P';}
    return {W,H,b,turn:'w',cast:{K:0,Q:0,k:0,q:0},ep:-1,hm:0,opt:{dbl:false,castle:false,ep:false}};
  }
  const b=Array(64).fill(null);
  'rnbqkbnr'.split('').forEach((p,i)=>{b[i]=p;b[56+i]=p.toUpperCase();});
  for(let i=0;i<8;i++){b[8+i]='p';b[48+i]='P';}
  return {W:8,H:8,b,turn:'w',cast:{K:1,Q:1,k:1,q:1},ep:-1,hm:0,opt:{dbl:true,castle:true,ep:true}};
}
/* tomt bräde med givna pjäser: pcs = {"e1":"K",...} (a1 längst ner till vänster) */
function fromPieces(pcs,turn,W,H){
  W=W||8;H=H||8;const b=Array(W*H).fill(null);
  for(const k in pcs){const c=k.charCodeAt(0)-97,r=H-(+k.slice(1));b[r*W+c]=pcs[k];}
  return {W,H,b,turn:turn||'w',cast:{K:0,Q:0,k:0,q:0},ep:-1,hm:0,opt:{dbl:true,castle:false,ep:false}};
}
function sqName(S,i){return String.fromCharCode(97+i%S.W)+(S.H-Math.floor(i/S.W));}
function copy(S){return {W:S.W,H:S.H,b:S.b.slice(),turn:S.turn,cast:{K:S.cast.K,Q:S.cast.Q,k:S.cast.k,q:S.cast.q},ep:S.ep,hm:S.hm,opt:S.opt};}

function attacked(S,idx,by){
  const {W,H,b}=S,r=Math.floor(idx/W),c=idx%W,W_=by==='w';
  const at=(rr,cc)=>rr>=0&&rr<H&&cc>=0&&cc<W?b[rr*W+cc]:null;
  // bönder: en vit bonde på (r+1,c±1) hotar uppåt
  const pr=W_?r+1:r-1,pc=W_?'P':'p';
  if(at(pr,c-1)===pc||at(pr,c+1)===pc)return true;
  const nn=W_?'N':'n',kk=W_?'K':'k';
  for(const d of ND)if(at(r+d[0],c+d[1])===nn)return true;
  for(const d of KD)if(at(r+d[0],c+d[1])===kk)return true;
  const bq=W_?['B','Q']:['b','q'],rq=W_?['R','Q']:['r','q'];
  for(const d of BD){let rr=r+d[0],cc=c+d[1];while(rr>=0&&rr<H&&cc>=0&&cc<W){const p=b[rr*W+cc];if(p){if(bq.includes(p))return true;break;}rr+=d[0];cc+=d[1];}}
  for(const d of RD){let rr=r+d[0],cc=c+d[1];while(rr>=0&&rr<H&&cc>=0&&cc<W){const p=b[rr*W+cc];if(p){if(rq.includes(p))return true;break;}rr+=d[0];cc+=d[1];}}
  return false;
}
function kingIdx(S,col){const k=col==='w'?'K':'k';return S.b.indexOf(k);}
function inCheck(S,col){const k=kingIdx(S,col);return k>=0&&attacked(S,k,col==='w'?'b':'w');}

/* pseudodrag; only = ett fältindex (för att visa var en viss pjäs får gå) */
function pseudo(S,only){
  const {W,H,b}=S,out=[],me=S.turn,w=me==='w';
  const from=only==null?0:only,to=only==null?W*H:only+1;
  for(let i=from;i<to;i++){
    const p=b[i];if(!p||colOf(p)!==me)continue;
    const r=Math.floor(i/W),c=i%W,t=p.toLowerCase();
    const push=(j,extra)=>{const m={f:i,t:j,p:null,cap:b[j]||null,fl:null};if(extra)Object.assign(m,extra);out.push(m);};
    if(t==='p'){
      const dir=w?-1:1,sr=w?H-2:1,pr=w?0:H-1,r1=r+dir;
      if(r1<0||r1>=H)continue;
      const addP=(j,cap)=>{if(r1===pr)['q','r','b','n'].forEach(x=>push(j,{p:x,cap}));else push(j,{cap});};
      if(!b[r1*W+c]){addP(r1*W+c,null);
        if(S.opt.dbl&&r===sr&&!b[(r+2*dir)*W+c])push((r+2*dir)*W+c,{fl:'dbl'});}
      for(const dc of[-1,1]){const cc=c+dc;if(cc<0||cc>=W)continue;const j=r1*W+cc,q=b[j];
        if(q&&colOf(q)!==me)addP(j,q);
        else if(!q&&S.opt.ep&&j===S.ep)push(j,{fl:'ep',cap:w?'p':'P'});}
    }else if(t==='n'||t==='k'){
      for(const d of(t==='n'?ND:KD)){const rr=r+d[0],cc=c+d[1];if(rr<0||rr>=H||cc<0||cc>=W)continue;const j=rr*W+cc,q=b[j];
        if(!q||colOf(q)!==me)push(j);}
      if(t==='k'&&S.opt.castle&&r===(w?7:0)&&c===4){
        const en=w?'b':'w';
        if((w?S.cast.K:S.cast.k)&&b[i+1]==null&&b[i+2]==null&&b[i+3]===(w?'R':'r')&&!attacked(S,i,en)&&!attacked(S,i+1,en))push(i+2,{fl:'ck'});
        if((w?S.cast.Q:S.cast.q)&&b[i-1]==null&&b[i-2]==null&&b[i-3]==null&&b[i-4]===(w?'R':'r')&&!attacked(S,i,en)&&!attacked(S,i-1,en))push(i-2,{fl:'cq'});
      }
    }else{
      const dirs=t==='b'?BD:t==='r'?RD:BD.concat(RD);
      for(const d of dirs){let rr=r+d[0],cc=c+d[1];
        while(rr>=0&&rr<H&&cc>=0&&cc<W){const j=rr*W+cc,q=b[j];
          if(!q)push(j);else{if(colOf(q)!==me)push(j);break;}
          rr+=d[0];cc+=d[1];}}
    }
  }
  return out;
}
function make(S,m){
  const N=copy(S),{W,H,b}=N,p=b[m.f],w=isW(p),t=p.toLowerCase();
  b[m.f]=null;
  if(m.fl==='ep')b[m.t+(w?W:-W)]=null;
  b[m.t]=m.p?(w?m.p.toUpperCase():m.p):p;
  if(m.fl==='ck'){b[m.t-1]=b[m.t+1];b[m.t+1]=null;}
  if(m.fl==='cq'){b[m.t+1]=b[m.t-2];b[m.t-2]=null;}
  N.ep=m.fl==='dbl'?(m.f+m.t)/2:-1;
  if(t==='k'){if(w){N.cast.K=0;N.cast.Q=0;}else{N.cast.k=0;N.cast.q=0;}}
  if(m.f===W*H-1||m.t===W*H-1)N.cast.K=0;
  if(m.f===W*H-W||m.t===W*H-W)N.cast.Q=0;
  if(m.f===W-1||m.t===W-1)N.cast.k=0;
  if(m.f===0||m.t===0)N.cast.q=0;
  N.hm=(t==='p'||m.cap)?0:S.hm+1;
  N.turn=w?'b':'w';
  return N;
}
function legal(S,only){
  const col=S.turn,res=[];
  for(const m of pseudo(S,only)){const N=make(S,m);if(!inCheck(N,col))res.push(m);}
  return res;
}
function status(S){
  const L=legal(S);
  if(!L.length)return inCheck(S,S.turn)?'matt':'patt';
  if(S.hm>=100)return 'remi50';
  if(material(S))return 'remimat';
  return 'pågår';
}
/* för lite material för matt */
function material(S){
  const o=[];for(const p of S.b)if(p&&p.toLowerCase()!=='k')o.push(p.toLowerCase());
  if(!o.length)return true;
  if(o.length===1&&(o[0]==='n'||o[0]==='b'))return true;
  return false;
}
function key(S){return S.b.map(x=>x||'.').join('')+S.turn+S.cast.K+S.cast.Q+S.cast.k+S.cast.q+(S.ep>=0?S.ep:'');}

/* ---------- datorn ---------- */
function evalS(S){
  const {W,H,b}=S;let s=0;
  for(let i=0;i<b.length;i++){const p=b[i];if(!p)continue;
    const t=p.toLowerCase(),w=isW(p),r=Math.floor(i/W),c=i%W;
    let v=VAL[t];
    const cd=Math.abs(c-(W-1)/2)+Math.abs(r-(H-1)/2); // avstånd från mitten
    if(t==='n'||t==='b')v+=(6-cd)*6;
    else if(t==='q')v+=(6-cd)*1.5;
    else if(t==='p'){const adv=w?(H-1-r):r;v+=adv*adv*2+(6-Math.abs(c-(W-1)/2)*2)*0;}
    else if(t==='k'){const endg=false;v+=endg?0:(w?(H-1-r):r)<=0?8:-4*((w?(H-1-r):r));}
    s+=w?v:-v;}
  return s;
}
function ordered(S,L){
  return L.sort((a,b)=>score(S,b)-score(S,a));
}
function score(S,m){let s=0;if(m.cap)s+=10*VAL[m.cap.toLowerCase()]-VAL[S.b[m.f].toLowerCase()]/10+1000;if(m.p)s+=VAL[m.p]+500;return s;}
function qsearch(S,alpha,beta,d){
  const sgn=S.turn==='w'?1:-1;
  const stand=sgn*evalS(S);
  if(d<=0)return stand;
  if(stand>=beta)return stand;
  if(stand>alpha)alpha=stand;
  const L=ordered(S,legal(S).filter(m=>m.cap||m.p==='q'));
  for(const m of L){const v=-qsearch(make(S,m),-beta,-alpha,d-1);if(v>=beta)return v;if(v>alpha)alpha=v;}
  return alpha;
}
function search(S,depth,alpha,beta,ply,nodes){
  nodes.n++;
  const L=legal(S);
  if(!L.length)return inCheck(S,S.turn)?-30000+ply:0;
  if(depth<=0)return qsearch(S,alpha,beta,3);
  let best=-Infinity;
  for(const m of ordered(S,L)){const v=-search(make(S,m),depth-1,-beta,-alpha,ply+1,nodes);
    if(v>best)best=v;if(v>alpha)alpha=v;if(alpha>=beta)break;}
  return best;
}
/* nivå 1: lätt, 2: mellan, 3: svår */
function pick(S,level){
  const L=legal(S);if(!L.length)return null;
  const mini=S.W<8;
  const cfg=level===1?{d:1,noise:140,rnd:.22}:level===2?{d:2,noise:35,rnd:0}:{d:mini?5:3,noise:0,rnd:0};
  if(Math.random()<cfg.rnd)return L[Math.floor(Math.random()*L.length)];
  const sgn=S.turn==='w'?1:-1;let best=null,bv=-Infinity;const nodes={n:0};
  for(const m of ordered(S,L)){
    const N=make(S,m);
    let v=-search(N,cfg.d-1,-Infinity,Infinity,1,nodes);
    // lite slump så att partierna varierar
    v+=Math.random()*cfg.noise;
    if(v>bv){bv=v;best=m;}
  }
  return best;
}

/* ---------- pussel: matt i ett drag ---------- */
function rnd(n){return Math.floor(Math.random()*n);}
function makeMate1(level){
  for(let tries=0;tries<200000;tries++){
    const pcs={},used=new Set();
    const put=(p)=>{for(let k=0;k<30;k++){const c=rnd(8),r=1+rnd(8),n=String.fromCharCode(97+c)+r;
      if(used.has(n))continue;if((p==='P'||p==='p')&&(r===1||r===8))continue;used.add(n);pcs[n]=p;return true;}return false;};
    put('K');put('k');
    const pool=level===1?[['Q'],['R']][rnd(2)]:level===2?[['Q','B'],['R','R'],['R','B'],['Q','N'],['R','N'],['Q','P'],['R','P']][rnd(7)]
      :[['Q','R','p'],['R','B','N','p'],['Q','B','p','p'],['R','N','p','p'],['Q','N','P','p'],['R','R','B','p']][rnd(6)];
    pool.forEach(put);
    const S=fromPieces(pcs,'w');
    // kungarna får inte stå intill varandra, svart får inte stå i schack
    const wk=kingIdx(S,'w'),bk=kingIdx(S,'b');
    if(Math.abs(Math.floor(wk/8)-Math.floor(bk/8))<2&&Math.abs(wk%8-bk%8)<2)continue;
    if(inCheck(S,'b'))continue;
    const mates=[];
    for(const m of legal(S)){if(m.p&&m.p!=='q')continue;const N=make(S,m);if(!legal(N).length&&inCheck(N,'b'))mates.push(m);}
    if(!mates.length||mates.length>(level===1?3:2))continue;
    // inte ett förbjudet "ge schack med bonde-omvandling"
    if(mates.every(m=>m.p))continue;
    // svart ska inte redan vara i en position där vit är i schack
    if(inCheck(S,'w'))continue;
    return {S,mates};
  }
  return null;
}

/* ---------- Lär känna pjäserna: uppdrag ---------- */
/* fånga svarta pjäser med en enda vit pjäs (svart står still). Minsta antal drag med bred sökning. */
function lessonMoves(S,idx){ // drag för pjäsen på idx, utan schackregler (kungen får gå fritt)
  const S2=copy(S);S2.turn=colOf(S.b[idx]);S2.ep=-1;S2.opt={dbl:true,castle:false,ep:false};
  return pseudo(S2,idx);
}
function solveCapture(S,start,targets,limit){
  // bred sökning över (plats, tagna mål); ger {d, path:[platser]} eller null
  const seen=new Set([start+':0']),nodes=[{pos:start,mask:0,b:S.b,par:-1}],full=(1<<targets.length)-1;
  for(let h=0;h<nodes.length;h++){
    const st=nodes[h];
    if(st.mask===full){const path=[];for(let k=h;k>=0;k=nodes[k].par)path.unshift(nodes[k].pos);return {d:path.length-1,path};}
    let depth=0;for(let k=h;nodes[k].par>=0;k=nodes[k].par)depth++;
    if(depth>=limit)continue;
    const T=copy(S);T.b=st.b.slice();
    for(const m of lessonMoves(T,st.pos)){
      const nb=st.b.slice();nb[m.t]=nb[st.pos];nb[st.pos]=null;
      let mask=st.mask;const ti=targets.indexOf(m.t);if(ti>=0)mask|=1<<ti;
      const k=m.t+':'+mask;if(seen.has(k))continue;seen.add(k);
      nodes.push({pos:m.t,mask,b:nb,par:h});
    }
  }
  return null;
}

const api={newState,fromPieces,sqName,copy,attacked,inCheck,kingIdx,pseudo,make,legal,status,key,evalS,pick,makeMate1,solveCapture,lessonMoves,isW,colOf,VAL,material};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.MPSchack=api;
})(typeof window!=='undefined'?window:globalThis);
