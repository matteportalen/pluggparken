/* Kosmos: gemensam motor för galaxer, Laniakea och det kosmiska nätet. Används av zoomfilmen (zoomfilm.js) och 3D-modellen (ovriga/solsystemet).
   Allt är beräknade modeller (slumpade med fast frö), inte foton. Inga bibliotek: en liten WebGL-ritare med additiva punktsprites.
   MPKosmos.make(typ) -> scen {p,c,s,n}; MPKosmos.render(typ,t,N,cam) -> canvas; MPKosmos.proj(typ,[x,y,z]) -> [ndcX,ndcY] (efter senaste render).
   typ: "mv" (Vintergatan), "andromeda", "laniakea", "nat". Kvalitet: MPKosmos.kvalitet = 1 (normal) eller 0.5 (lätt). */
(function(){
const TAU=Math.PI*2;
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const gauss=r=>{let u=0,v=0;while(!u)u=r();v=r();return Math.sqrt(-2*Math.log(u))*Math.cos(TAU*v);};
/* ---------- 3D-matematik ---------- */
const mul=(a,b)=>{const o=new Float32Array(16);for(let i=0;i<4;i++)for(let j=0;j<4;j++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+j]*b[i*4+k];o[i*4+j]=s;}return o;};
const persp=(f,asp,n,fa)=>{const t=1/Math.tan(f/2),o=new Float32Array(16);o[0]=t/asp;o[5]=t;o[10]=(fa+n)/(n-fa);o[11]=-1;o[14]=2*fa*n/(n-fa);return o;};
const norm=v=>{const l=Math.hypot(v[0],v[1],v[2])||1;return[v[0]/l,v[1]/l,v[2]/l];};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const look=(e,t,u)=>{const z=norm([e[0]-t[0],e[1]-t[1],e[2]-t[2]]),x=norm(cross(u,z)),y=cross(z,x),o=new Float32Array(16);
  o[0]=x[0];o[4]=x[1];o[8]=x[2];o[12]=-(x[0]*e[0]+x[1]*e[1]+x[2]*e[2]);o[1]=y[0];o[5]=y[1];o[9]=y[2];o[13]=-(y[0]*e[0]+y[1]*e[1]+y[2]*e[2]);
  o[2]=z[0];o[6]=z[1];o[10]=z[2];o[14]=-(z[0]*e[0]+z[1]*e[1]+z[2]*e[2]);o[15]=1;return o;};
const apply=(m,p)=>{const x=p[0],y=p[1],z=p[2],w=m[3]*x+m[7]*y+m[11]*z+m[15];return[(m[0]*x+m[4]*y+m[8]*z+m[12])/w,(m[1]*x+m[5]*y+m[9]*z+m[13])/w,w];};
/* ---------- Generatorer ---------- */
function ny(n){return{p:new Float32Array(n*3),c:new Float32Array(n*3),s:new Float32Array(n*2),n:0,max:n};}
function add(B,x,y,z,r,g,b,sz,ph){const i=B.n++;if(i>=B.max)return;B.p[i*3]=x;B.p[i*3+1]=y;B.p[i*3+2]=z;B.c[i*3]=r;B.c[i*3+1]=g;B.c[i*3+2]=b;B.s[i*2]=sz;B.s[i*2+1]=ph==null?-1:ph;}
/* spiralgalax: skiva i xz-planet med logaritmiska armar, bula, rosa stjärnbildningsområden och en svag dimma. R = radie, (ox,oy,oz) = mitten, rot = lutning i skivans eget system. */
function galax(B,o){const r=rng(o.seed||1),n=o.n,R=o.R,arms=o.arms||4,tw=o.twist||1.5,ox=o.x||0,oy=o.y||0,oz=o.z||0,tilt=o.tilt||0,roll=o.roll||0,ct=Math.cos(tilt),st=Math.sin(tilt),cr=Math.cos(roll),sr=Math.sin(roll),gain=o.gain||1;
  const put=(x,y,z,c,sz,ph)=>{let y1=y*ct-z*st,z1=y*st+z*ct,x1=x;const x2=x1*cr-y1*sr,y2=x1*sr+y1*cr;add(B,ox+x2*R,oy+y2*R,oz+z1*R,c[0]*gain,c[1]*gain,c[2]*gain,sz,ph);};
  for(let i=0;i<n;i++){const t=r();
    if(t<.15){const rr=Math.pow(r(),1.6)*.16,a=r()*TAU,b=Math.acos(2*r()-1);put(rr*Math.sin(b)*Math.cos(a),rr*Math.cos(b)*.75,rr*Math.sin(b)*Math.sin(a),[1,.82+r()*.1,.55+r()*.15],1.4+r()*1.4);}
    else if(t<.158){const rad=.18+Math.pow(r(),.7)*.78,ang=(i%arms)*TAU/arms+tw*Math.pow(rad,.65)*TAU*.5+gauss(r)*.1;put(Math.cos(ang)*rad,gauss(r)*.008,Math.sin(ang)*rad,[.55,.2,.33],5+r()*5);}
    else if(t<.168){const rr=Math.pow(r(),1.3)*.45,a=r()*TAU;put(Math.cos(a)*rr,gauss(r)*.02,Math.sin(a)*rr,[.09,.065,.04],18+r()*8);}
    else{const u=r(),rad=-Math.log(1-u*.955)*.27+.02,arm=(r()*arms)|0,inArm=r()<.72,sc=.2+.35/(1+rad*3),ang=inArm?arm*TAU/arms+tw*Math.pow(rad,.65)*TAU*.5+gauss(r)*sc:r()*TAU,
      bl=Math.min(1,.2+rad*1.2),br=(inArm?1:.55)*(.5+r()*.6)*(1-rad*.35);put(Math.cos(ang)*rad,gauss(r)*(.010+.012*(1-rad)),Math.sin(ang)*rad,[(1-.42*bl)*br,(.9-.2*bl)*br,(.8+.2*bl)*br],1.1+r()*1.5);}}}
/* kosmiskt nät: noder, trådar (med pulser som rör sig längs dem), nodklumpar och tomrum */
function natet(B,o){const r=rng(o.seed||7),n=o.n,Nn=o.noder||90,nod=[];
  const cent=[];for(let i=0;i<24;i++)cent.push([gauss(r)*.6,gauss(r)*.45,gauss(r)*.6]);
  for(let i=0;i<Nn;i++){const c=cent[(r()*cent.length)|0];nod.push([Math.max(-1.1,Math.min(1.1,c[0]+gauss(r)*.35)),Math.max(-.9,Math.min(.9,c[1]+gauss(r)*.3)),Math.max(-1.1,Math.min(1.1,c[2]+gauss(r)*.35)),0]);}
  const E=[],seen=new Set();nod.forEach((p,i)=>{const d=nod.map((q,j)=>[j,Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2])]).filter(x=>x[0]!==i).sort((a,b)=>a[1]-b[1]).slice(0,3);
    d.forEach(([j,l])=>{if(l>.6)return;const k=i<j?i+"-"+j:j+"-"+i;if(seen.has(k))return;seen.add(k);E.push([i,j,l]);nod[i][3]++;nod[j][3]++;});});
  const tot=E.reduce((a,e)=>a+e[2],0),nf=Math.round(n*.74);
  E.forEach(([i,j,l],ei)=>{const A=nod[i],Bn=nod[j],m=Math.max(8,Math.round(nf*l/tot)),dir=[Bn[0]-A[0],Bn[1]-A[1],Bn[2]-A[2]],ph0=r(),bo=[gauss(r)*l*.1,gauss(r)*l*.1,gauss(r)*l*.1],bo2=[gauss(r)*l*.025,gauss(r)*l*.025,gauss(r)*l*.025];
    for(let k=0;k<m;k++){const u=r(),sg=.012*(1-.55*Math.sin(Math.PI*u))+.003,bz=4*u*(1-u),bz2=Math.sin(u*TAU*1.5);add(B,A[0]+dir[0]*u+bo[0]*bz+bo2[0]*bz2+gauss(r)*sg,A[1]+dir[1]*u+bo[1]*bz+bo2[1]*bz2+gauss(r)*sg,A[2]+dir[2]*u+bo[2]*bz+bo2[2]*bz2+gauss(r)*sg,
      (.5+r()*.25)*.9,(.66+r()*.2)*.9,1*.9,1.2+r()*1.2,r()<.35?(u*.6+ph0)%1:null);}});
  const nb=Math.round(n*.2),W=nod.reduce((a,p)=>a+p[3]+1,0);
  for(let k=0;k<nb;k++){let w=r()*W,q=nod[0];for(const p of nod){w-=p[3]+1;if(w<=0){q=p;break;}}const rr=.075*Math.pow(r(),2.3)*(1+q[3]*.12),a=r()*TAU,b=Math.acos(2*r()-1);
    add(B,q[0]+rr*Math.sin(b)*Math.cos(a),q[1]+rr*Math.cos(b),q[2]+rr*Math.sin(b)*Math.sin(a),1,.8+r()*.15,.55+r()*.2,1.4+r()*1.8);}
  nod.forEach(q=>{if(q[3]>=3)add(B,q[0],q[1],q[2],1,.9,.65,7+q[3]);});
  const nfv=Math.round(n*.05);for(let k=0;k<nfv;k++)add(B,(r()*2-1)*1.1,(r()*2-1)*.9,(r()*2-1)*1.1,.35,.45,.6,1.1);
  return nod;}
/* Laniakea: galaxer som strömmar längs böjda banor mot den stora attraktorn, med ljuspulser i strömlinjerna */
function laniakea(B,o){const r=rng(o.seed||3),A=[.55,.04,0.05],ankare={A};
  const nStr=o.strommar||170;
  for(let s=0;s<nStr;s++){let p=[0,0,0];do{p=[(r()*2-1),(r()*2-1)*.6,(r()*2-1)];}while(Math.hypot(...p)>1||Math.hypot(p[0]-A[0],p[1]-A[1],p[2]-A[2])<.2);
    const sw=(r()-.5)*.5,path=[p.slice()];let q=p.slice();for(let k=0;k<70;k++){const d=[A[0]-q[0],A[1]-q[1],A[2]-q[2]],l=Math.hypot(...d);if(l<.06)break;const stp=Math.min(.03,l*.5),up=[0,1,0],w=cross(d,up);
      q=[q[0]+d[0]/l*stp+w[0]/l*stp*sw,q[1]+d[1]/l*stp+w[1]/l*stp*sw,q[2]+d[2]/l*stp+w[2]/l*stp*sw];path.push(q.slice());}
    const L=path.length,ph0=r();path.forEach((q,k)=>{const u=k/L;add(B,q[0]+gauss(r)*.004,q[1]+gauss(r)*.004,q[2]+gauss(r)*.004,.55,.75,1,2.4+r()*1.2,(u*.5+ph0)%1);
      if(r()<.8)add(B,q[0]+gauss(r)*.025,q[1]+gauss(r)*.025,q[2]+gauss(r)*.025,.8,.88,1,1.8+r()*1.4);});}
  const klump=(c,rad,n,col,sz)=>{for(let i=0;i<n;i++){const rr=rad*Math.pow(r(),1.7),a=r()*TAU,b=Math.acos(2*r()-1);add(B,c[0]+rr*Math.sin(b)*Math.cos(a),c[1]+rr*Math.cos(b)*.7,c[2]+rr*Math.sin(b)*Math.sin(a),col[0],col[1],col[2],sz*(1+r()));}};
  const V=[.18,-.08,.02],PP=[-.72,.18,.3],SH=[.95,.1,-.35];ankare.V=V;ankare.PP=PP;ankare.SH=SH;ankare.mw=[0,0,0];
  klump(A,.22,2600,[1,.7,.4],2.4);klump(V,.1,1200,[1,.85,.6],2.2);klump(PP,.16,1600,[1,.8,.55],2.2);klump(SH,.12,900,[1,.75,.5],2);
  for(let i=0;i<2600;i++)add(B,(r()*2-1)*1.05,(r()*2-1)*.6,(r()*2-1)*1.05,.5,.6,.85,1.6);
  add(B,0,0,0,1,.95,.7,9);
  return ankare;}
const KONF={
 mv:{bygg(){const B=ny(Math.round(120000*KOS.kvalitet));galax(B,{n:B.max,R:1,arms:4,twist:1.55,seed:11});return{B,ank:{sol:[.52*Math.cos(.7),0,.52*Math.sin(.7)],mitt:[0,0,0]}};},
   cam(t){const y=t*.045,p=.92;return{e:[Math.sin(y)*Math.cos(p)*3.6,Math.sin(p)*3.6,Math.cos(y)*Math.cos(p)*3.6],t:[0,0,0],f:.62,sz:.0042,g:1.0};}},
 andromeda:{bygg(){const q=KOS.kvalitet,B=ny(Math.round(170000*q)),ank={};
   galax(B,{n:Math.round(64000*q),R:.5,arms:4,twist:1.5,seed:21,x:-.82,y:-.12,z:.05,tilt:.95,roll:.25});ank.mv=[-.82,-.12,.05];
   galax(B,{n:Math.round(96000*q),R:.82,arms:2,twist:1.1,seed:22,x:.78,y:.16,z:-.1,tilt:1.36,roll:-.65});ank.and=[.78,.16,-.1];
   galax(B,{n:Math.round(3500*q),R:.12,arms:2,twist:1,seed:23,x:-1.12,y:-.4,z:.35,tilt:.4,gain:.8});ank.lmc=[-1.12,-.4,.35];
   galax(B,{n:Math.round(1800*q),R:.08,arms:2,twist:1,seed:24,x:-1.02,y:-.52,z:.5,tilt:.7,gain:.8});
   galax(B,{n:Math.round(6000*q),R:.22,arms:3,twist:1.2,seed:25,x:.35,y:.7,z:-.5,tilt:.5,roll:.4,gain:.9});ank.tri=[.35,.7,-.5];
   galax(B,{n:Math.round(1500*q),R:.06,arms:1,twist:0,seed:26,x:.55,y:.05,z:.2,tilt:0,gain:.8});ank.m32=[.55,.05,.2];
   return{B,ank};},
   cam(t){const y=.4+Math.sin(t*.06)*.35,p=.38;return{e:[Math.sin(y)*Math.cos(p)*4.6,Math.sin(p)*4.6+.1,Math.cos(y)*Math.cos(p)*4.6],t:[0,0,0],f:.62,sz:.0044,g:1.0};}},
 laniakea:{bygg(){const B=ny(Math.round(30000*KOS.kvalitet+6000));const ank=laniakea(B,{strommar:Math.round(170*KOS.kvalitet)});return{B,ank};},
   cam(t){const y=-.5+t*.04,p=.5;return{e:[Math.sin(y)*Math.cos(p)*2.5,Math.sin(p)*2.5,Math.cos(y)*Math.cos(p)*2.5],t:[.1,0,0],f:.62,sz:.0056,g:1.1};}},
 nat:{bygg(){const B=ny(Math.round(150000*KOS.kvalitet));const nod=natet(B,{n:B.max,seed:7,noder:140});return{B,ank:{nod}};},
   cam(t){const y=t*.05,p=.3,d=2.5-Math.min(1,t/17)*.9;return{e:[Math.sin(y)*Math.cos(p)*d,Math.sin(p)*d,Math.cos(y)*Math.cos(p)*d],t:[0,0,0],f:.7,sz:.0038,g:.85};}}
};
/* ---------- WebGL ---------- */
let G=null;
function gl(){if(G)return G;const c=document.createElement("canvas"),g=c.getContext("webgl",{premultipliedAlpha:true,alpha:true,antialias:false,preserveDrawingBuffer:true});if(!g)return(G={fel:true});
  const sh=(t,s)=>{const o=g.createShader(t);g.shaderSource(o,s);g.compileShader(o);return o;},pr=g.createProgram();
  g.attachShader(pr,sh(g.VERTEX_SHADER,"attribute vec3 p;attribute vec3 c;attribute vec2 s;uniform mat4 m;uniform float z;uniform float t;uniform float gain;varying vec3 vc;void main(){vec4 q=m*vec4(p,1.);gl_Position=q;float w=max(q.w,.05);gl_PointSize=clamp(s.x*z/w,1.,46.);float k=1.-smoothstep(.62,.98,length(q.xy/w));if(s.y>=0.){float d=fract(s.y-t);k*=.4+2.4*exp(-d*12.);}vc=c*k*gain;}"));
  g.attachShader(pr,sh(g.FRAGMENT_SHADER,"precision mediump float;varying vec3 vc;void main(){vec2 d=gl_PointCoord-.5;float r=dot(d,d)*4.;if(r>1.)discard;float a=exp(-r*3.4);gl_FragColor=vec4(vc*a,a*.6);}"));
  g.linkProgram(pr);g.useProgram(pr);G={c,g,pr,L:{p:g.getAttribLocation(pr,"p"),c:g.getAttribLocation(pr,"c"),s:g.getAttribLocation(pr,"s"),m:g.getUniformLocation(pr,"m"),z:g.getUniformLocation(pr,"z"),t:g.getUniformLocation(pr,"t"),gain:g.getUniformLocation(pr,"gain")}};return G;}
const KOS={kvalitet:1,scener:{},ok(){return!gl().fel;},
  scen(typ){if(KOS.scener[typ])return KOS.scener[typ];const k=KONF[typ].bygg(),R=gl();if(R.fel)return null;const g=R.g,mk=d=>{const b=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,b);g.bufferData(g.ARRAY_BUFFER,d,g.STATIC_DRAW);return b;};
    return KOS.scener[typ]={n:k.B.n,ank:k.ank,bp:mk(k.B.p),bc:mk(k.B.c),bs:mk(k.B.s),mvp:null};},
  /* ritar scenen till ett N × N stort canvas och returnerar det (additiv blandning mot svart, kan läggas med "lighter") */
  render(typ,t,N,vals){const S=KOS.scen(typ);if(!S)return null;const R=gl(),g=R.g,K=KONF[typ].cam(t);if(vals&&vals.zm>1){const k=1/(1+(vals.zm-1)*.55);K.e=K.e.map((v,i)=>K.t[i]+(v-K.t[i])*k);}
    if(R.c.width!==N){R.c.width=N;R.c.height=N;}g.viewport(0,0,N,N);g.clearColor(0,0,0,0);g.clear(g.COLOR_BUFFER_BIT);g.enable(g.BLEND);g.blendFunc(g.ONE,g.ONE);g.disable(g.DEPTH_TEST);
    const m=mul(persp(K.f,1,.05,40),look(K.e,K.t,[0,1,0]));S.mvp=m;
    g.uniformMatrix4fv(R.L.m,false,m);g.uniform1f(R.L.z,N*K.sz*(KOS.kvalitet<1?1.25:1));g.uniform1f(R.L.t,(t*.18)%1);g.uniform1f(R.L.gain,K.g*(vals&&vals.g||1));
    const att=(l,b,sz)=>{g.bindBuffer(g.ARRAY_BUFFER,b);g.enableVertexAttribArray(l);g.vertexAttribPointer(l,sz,g.FLOAT,false,0,0);};att(R.L.p,S.bp,3);att(R.L.c,S.bc,3);att(R.L.s,S.bs,2);
    g.drawArrays(g.POINTS,0,S.n);return R.c;},
  /* skärmposition i [-1,1] för en 3D-punkt, efter senaste render; z<=0 betyder bakom kameran */
  proj(typ,p){const S=KOS.scener[typ];if(!S||!S.mvp)return null;const q=apply(S.mvp,p);return{x:q[0],y:q[1],w:q[2]};},
  ank(typ){const S=KOS.scen(typ);return S?S.ank:null;}};
window.MPKosmos=KOS;
})();
