/* fackverk.js – MPFack: motorn i Brobygget och Tornverkstan. Inga kopior i sidorna.
   Ändra inte materialvärdena utan att köra skript/test-brobygget.cjs och skript/test-tornverkstan.cjs. */
(function(g){
/* Fackverksmotorn (MPFack), delas av Brobygget och Tornverkstan. Se docs/brobygget.md.
   Leder är punkter med massa, balkar håller avståndet mellan två leder (XPBD med små tidssteg).
   Kraften i varje balk läses ur lösaren och jämförs med materialets styrka: går den över brister balken.
   Enheter: meter, kilo, newton, sekunder. y pekar nedåt. Inget i motorn rör sidan, så den går att köra i node. */
const MAT={
  vag:{namn:"Väg",pris:20,kg:60,styrka:150e3,ea:1e8,max:3.2,farg:"#4A5263"},
  tra:{namn:"Trä",pris:10,kg:20,styrka:100e3,ea:6e6,max:3.2,farg:"#C98B4E"},
  stal:{namn:"Stål",pris:30,kg:45,styrka:420e3,ea:2.4e7,max:3.2,farg:"#8FA3B8"},
  rep:{namn:"Rep",pris:8,kg:4,styrka:260e3,ea:8e6,max:5.2,farg:"#E9D8A6",rep:true}};
const GRAV=9.81,DT=1/60,SUB=16,FART=2.4;
const kostnad=bal=>bal.reduce((s,b)=>s+Math.round(Math.hypot(b[2]-b[0],b[3]-b[1])*MAT[b[4]].pris),0);
/* balkar: [[x1,y1,x2,y2,material], ...]; nivå: {gap,djup,ank:[[x,y],...]} */
function nyVarld(niv,bal){const W={niv,p:[],b:[],seg:[],ford:null,t:0,brott:[],idx:new Map()};
  const led=(x,y)=>{const k=x+","+y;if(!W.idx.has(k)){W.idx.set(k,W.p.length);W.p.push({x,y,px:x,py:y,vx:0,vy:0,m:4,w:0,fast:false,x0:x,y0:y})}return W.idx.get(k)};
  niv.ank.forEach(a=>{W.p[led(a[0],a[1])].fast=true});
  bal.forEach((q,n)=>{const M=MAT[q[4]],i=led(q[0],q[1]),j=led(q[2],q[3]),L=Math.hypot(q[2]-q[0],q[3]-q[1]);if(L<1e-6)return;
    W.p[i].m+=M.kg*L/2;W.p[j].m+=M.kg*L/2;W.b.push({i,j,L,mat:q[4],al:L/M.ea,styrka:M.styrka,rep:!!M.rep,vag:q[4]==="vag",hel:true,T:0,acc:0,max:0,n})});
  W.p.forEach(p=>{p.w=p.fast?0:1/p.m});
  W.seg=niv.gap!=null?[{ax:-9,ay:0,bx:0,by:0},{ax:niv.gap,ay:0,bx:niv.gap+9,by:0}]:[];return W}
function narmast(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy;let t=l2>0?((px-ax)*dx+(py-ay)*dy)/l2:0;t=t<0?0:t>1?1:t;return{t,x:ax+dx*t,y:ay+dy*t}}
function steg(W,damp){const h=DT/SUB,P=W.p,f=W.ford,hj=f?[f.a,f.b]:[],d=1-(damp||.6)*h;
  for(const b of W.b)b.acc=0;
  for(let s=0;s<SUB;s++){
    for(const p of P){if(!p.w)continue;if(p.fx)p.vx+=p.fx*p.w*h;p.vy+=GRAV*h;p.vx*=d;p.vy*=d;p.px=p.x;p.py=p.y;p.x+=p.vx*h;p.y+=p.vy*h}
    for(const q of hj){q.vy+=GRAV*h;q.px=q.x;q.py=q.y;q.x+=q.vx*h;q.y+=q.vy*h;q.kont=false}
    for(const b of W.b){if(!b.hel)continue;const A=P[b.i],B=P[b.j],dx=B.x-A.x,dy=B.y-A.y,l=Math.hypot(dx,dy)||1e-9,C=l-b.L;if(b.rep&&C<0)continue;const ws=A.w+B.w;if(!ws)continue;
      const lam=-C/(ws+b.al/(h*h)),nx=dx/l,ny=dy/l;A.x-=A.w*lam*nx;A.y-=A.w*lam*ny;B.x+=B.w*lam*nx;B.y+=B.w*lam*ny;b.acc-=lam/(h*h)}
    if(f){const A=f.a,B=f.b,dx=B.x-A.x,dy=B.y-A.y,l=Math.hypot(dx,dy)||1e-9,lam=-(l-f.F.ax)/(A.w+B.w),nx=dx/l,ny=dy/l;A.x-=A.w*lam*nx;A.y-=A.w*lam*ny;B.x+=B.w*lam*nx;B.y+=B.w*lam*ny;
      for(const q of hj){
        for(const g of W.seg){const c=narmast(q.x,q.y,g.ax,g.ay,g.bx,g.by),ex=q.x-c.x,ey=q.y-c.y,di=Math.hypot(ex,ey);if(di<q.r&&ey<=0.02){const nx2=di>1e-6?ex/di:0,ny2=di>1e-6?ey/di:-1;q.x+=nx2*(q.r-di);q.y+=ny2*(q.r-di);q.kont=true;q.tx=1;q.ty=0}}
        for(const b of W.b){if(!b.hel||!b.vag)continue;const A2=P[b.i],B2=P[b.j],c=narmast(q.x,q.y,A2.x,A2.y,B2.x,B2.y),ex=q.x-c.x,ey=q.y-c.y,di=Math.hypot(ex,ey);if(di>=q.r)continue;
          const nx2=di>1e-6?ex/di:0,ny2=di>1e-6?ey/di:-1,wa=(1-c.t),wb=c.t,ws=q.w+wa*wa*A2.w+wb*wb*B2.w,lm=(q.r-di)/ws;
          q.x+=q.w*lm*nx2;q.y+=q.w*lm*ny2;A2.x-=A2.w*wa*lm*nx2;A2.y-=A2.w*wa*lm*ny2;B2.x-=B2.w*wb*lm*nx2;B2.y-=B2.w*wb*lm*ny2;
          q.kont=true;let tx=B2.x-A2.x,ty=B2.y-A2.y;const tl=Math.hypot(tx,ty)||1;tx/=tl;ty/=tl;if(tx<0){tx=-tx;ty=-ty}q.tx=tx;q.ty=ty}}}
    for(const p of P){if(!p.w)continue;p.vx=(p.x-p.px)/h;p.vy=(p.y-p.py)/h}
    for(const q of hj){q.vx=(q.x-q.px)/h;q.vy=(q.y-q.py)/h;if(q.kont){const vt=q.vx*q.tx+q.vy*q.ty,dv=Math.max(-8*h,Math.min(8*h,FART-vt));q.vx+=dv*q.tx;q.vy+=dv*q.ty}}}
  let varst=null;for(const b of W.b){if(!b.hel)continue;b.T+=(b.acc/SUB-b.T)*.35;const r=Math.abs(b.T)/b.styrka;if(r>b.max)b.max=r;if(r>1&&(!varst||r>varst.r))varst={b,r}}
  if(varst){varst.b.hel=false;W.brott.push({n:varst.b.n,t:W.t,T:varst.b.T,x:(P[varst.b.i].x+P[varst.b.j].x)/2,y:(P[varst.b.i].y+P[varst.b.j].y)/2})}
  if(f&&!f.klar&&!f.plums){if(f.a.x>W.niv.gap+.6&&f.a.kont)f.klar=true;else if(Math.max(f.a.y,f.b.y)>W.niv.djup-.1)f.plums=true}
  W.t+=DT}
/* Foga in en ny balk (lärarens önskan 24 nov 2026): balkar sitter bara ihop i leder. Hamnar den nya balkens ände mitt på en
   annan balk delas den balken där, och går den nya balken rakt över en led som redan finns delas den nya. Då sitter allt ihop där
   det ser ut att sitta ihop. Rutpunkterna är heltal, så kontrollen är exakt. Dubbletter tas bort (den gamla balken behålls). */
function foga(bal,nb,extra){const inne=(q,x,y)=>{const dx=q[2]-q[0],dy=q[3]-q[1];if(dx*(y-q[1])-dy*(x-q[0])!==0)return -1;const t=(x-q[0])*dx+(y-q[1])*dy,L2=dx*dx+dy*dy;return t>0&&t<L2?t/L2:-1};
  const dela=(q,pts)=>{const ps=pts.map(p=>[inne(q,p[0],p[1]),p]).filter(v=>v[0]>0).sort((u,v)=>u[0]-v[0]);if(!ps.length)return[q];const o=[];let x=q[0],y=q[1];
    for(const [,p] of ps){if(p[0]===x&&p[1]===y)continue;o.push([x,y,p[0],p[1],q[4]]);x=p[0];y=p[1]}o.push([x,y,q[2],q[3],q[4]]);return o};
  const ander=[[nb[0],nb[1]],[nb[2],nb[3]]],leder=(extra||[]).concat(bal.flatMap(q=>[[q[0],q[1]],[q[2],q[3]]]));
  const ut=[],sett=new Set(),nyckel=q=>{const a=q[0]+","+q[1],b=q[2]+","+q[3];return a<b?a+"|"+b:b+"|"+a};
  for(const q of bal.flatMap(q=>dela(q,ander)).concat(dela(nb,leder))){const k=nyckel(q);if(!sett.has(k)){sett.add(k);ut.push(q)}}return ut}
g.MPFack={MAT,GRAV,DT,SUB,FART,narmast,nyVarld,steg,kostnad,foga};
})(typeof window!=="undefined"?window:globalThis);
