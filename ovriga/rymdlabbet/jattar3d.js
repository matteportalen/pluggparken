/* Jättarna i rymden: realistisk 3D-ritning (three.js, egna shaders).
   Varje himlakropp är en skärmvänd platta (impostor) där fragmentskuggaren räknar ut klotet:
   - planeter: riktiga ytor, solljus från vänster, atmosfärsglöd och nattlandskap (Jorden)
   - stjärnor: solens kokande yta i stjärnans färg, mörkare kant och korona; storlekarna på cellerna följer stjärnans storlek
   - svarta hål: skuggan, fotonringen och en lysande gasskiva som ljuset böjs runt
   - banor: mjukt lysande streckade ringar
   Jättestora kroppar ritas med högst 8 bildhöjder som radie (kanten vid marken ser likadan ut). */
import * as THREE from 'three';

const VERT=`varying vec2 vP;uniform float ext;void main(){vP=position.xy*2.0*ext;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const COMMON=`precision highp float;varying vec2 vP;uniform float time,alpha,seed;
vec3 sph(vec2 p,float a){float z=sqrt(max(0.,1.-dot(p,p)));vec3 N=vec3(p,z);float ca=cos(a),sa=sin(a);return vec3(ca*N.x+sa*N.z,N.y,-sa*N.x+ca*N.z);}
vec2 sUV(vec3 Nr){return vec2(atan(Nr.x,Nr.z)/6.2831853+.5,asin(clamp(Nr.y,-1.,1.))/3.1415927+.5);}`;

const FRAG_STAR=COMMON+`uniform sampler2D tex;uniform vec3 col;uniform float cell,glow,spin,tint;
void main(){vec2 p=vP;float r=length(p);
 if(r<1.0){float z=sqrt(1.-r*r);vec3 Nr=sph(p,time*spin+seed);vec2 uv=sUV(Nr);uv=(uv-.5)*cell+.5;
  vec3 t=texture2D(tex,uv+vec2(sin(time*.05+seed)*.01,0.)).rgb;float lum=dot(t,vec3(.3,.59,.11));
  vec3 c1=col*(.92+.5*lum)+vec3(1.,.97,.9)*pow(lum,3.)*.2;vec3 c0=t*1.45+vec3(1.,.8,.4)*pow(lum,2.)*.5;vec3 c=mix(c0,c1,tint);
  c*=1.-mix(.62,.38,tint)*(1.-z);c=mix(c,col*1.3,pow(1.-z,4.)*.3);
  float e=smoothstep(1.,.985,r);gl_FragColor=vec4(c,e*alpha);}
 else{float d=r-1.;float a=atan(p.y,p.x);float s=.55+.45*sin(a*7.+time*.22+seed)*sin(a*3.-time*.13+seed*2.);
  float g=exp(-d*glow)*.62*(.7+.5*s)+exp(-d*glow*.18)*.1;gl_FragColor=vec4(col*1.15,clamp(g,0.,1.)*alpha*smoothstep(1.9,1.0,r));}}`;

const FRAG_PLANET=COMMON+`uniform sampler2D day,night,clouds;uniform vec3 L,atmo;uniform float hasN,hasC,spin,rim;
void main(){vec2 p=vP;float r=length(p);vec3 Ld=normalize(L);
 if(r<1.0){float z=sqrt(1.-r*r);vec3 N=vec3(p,z);vec3 Nr=sph(p,time*spin+seed);vec2 uv=sUV(Nr);
  float diff=max(dot(N,Ld),0.);vec3 c=texture2D(day,uv).rgb;
  if(hasC>.5){float cl=texture2D(clouds,uv+vec2(time*.0012,0.)).r;c=mix(c,vec3(1.),cl*.85);}
  vec3 lit=c*(diff*1.15+.025);
  if(hasN>.5){float dark=1.-smoothstep(0.,.18,diff);lit+=texture2D(night,uv).rgb*dark*1.3;}
  float f=pow(1.-z,2.6)*rim;lit+=atmo*f*(diff*1.3+.1);
  gl_FragColor=vec4(lit,smoothstep(1.,.985,r)*alpha);}
 else{float d=r-1.;float side=max(dot(normalize(p),Ld.xy/length(Ld.xy)),-.2)*.5+.55;
  float g=exp(-d*(rim>0.?26.:60.))*.75*side*rim;gl_FragColor=vec4(atmo,clamp(g,0.,1.)*alpha*smoothstep(1.2,1.0,r));}}`;

const FRAG_BH=COMMON+`void main(){vec2 q=vP;float R=length(q);
 float phot=exp(-pow((R-1.03)/.022,2.));
 float up=smoothstep(-.1,.45,q.y);float arcUp=exp(-pow((R-1.42)/.2,2.))*up;
 float arcDn=exp(-pow((R-1.18)/.09,2.))*smoothstep(.1,-.5,q.y)*.5;
 float w=.1+.035*abs(q.x);float band=exp(-pow(q.y/w,2.))*smoothstep(1.15,1.5,abs(q.x))*smoothstep(5.,2.4,abs(q.x))*pow(1./max(abs(q.x),1.),1.1);
 float dop=1.+.65*sign(-q.x)*smoothstep(0.,3.,abs(q.x));
 float tur=.8+.2*sin(atan(q.y,q.x)*9.+time*.6+R*5.);
 float I=band*1.9*dop*tur+arcUp*1.05+arcDn*.8;
 float halo=exp(-(R-1.)*1.3)*.16*smoothstep(1.,1.6,R);
 vec3 hot=mix(vec3(1.,.38,.08),vec3(1.,.93,.75),clamp(I*.6,0.,1.));
 vec3 c=hot*I+mix(vec3(1.,.55,.2),vec3(1.,.95,.85),.6)*phot*1.1+vec3(1.,.4,.1)*halo;
 float inside=step(R,1.);
 float a=clamp(max(I,max(phot,halo*2.)),0.,1.);
 a=max(a,inside);c*=1.-inside;
 gl_FragColor=vec4(c,a*alpha*smoothstep(5.,3.4,R));}`;

const FRAG_ORBIT=COMMON+`uniform float Rpx;void main(){vec2 p=vP;float R=length(p);float d=abs(R-1.)*Rpx;float a=atan(p.y,p.x);
 float dash=smoothstep(.35,.5,sin(a*Rpx*.012+ .0)*.5+.5);float core=smoothstep(1.7,.4,d),halo=exp(-d*.14)*.22;
 gl_FragColor=vec4(.78,.84,.97,clamp((core*(.45+.55*dash)+halo)*.85,0.,1.)*alpha);}`;

const FRAG_BG=`precision highp float;varying float vA;void main(){vec2 c=gl_PointCoord-.5;float d=length(c)*2.;if(d>1.)discard;gl_FragColor=vec4(vec3(.85,.9,1.),vA*(1.-d)*(1.-d));}`;
const VERT_BG=`attribute float aSize;attribute float aPar;attribute float aA;uniform vec2 res;uniform float off;varying float vA;void main(){vA=aA;float x=mod(position.x-off*aPar,res.x);gl_Position=vec4(x/res.x*2.-1.,position.y/res.y*2.-1.,0.,1.);gl_PointSize=aSize;}`;

export async function init(canvas,opts){
  const {GI,POS,IMG}=opts;
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.setClearColor(0x05070F,1);
  const scene=new THREE.Scene(),cam=new THREE.OrthographicCamera(0,1,1,0,-10,10);
  const TL=new THREE.TextureLoader();
  const tx=(f,rep)=>{const t=TL.load(IMG+f);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;t.wrapS=THREE.RepeatWrapping;t.wrapT=THREE.MirroredRepeatWrapping;return t;};
  const T={sun:tx('2k_sun.jpg'),eday:tx('2k_earth_daymap.jpg'),enight:tx('2k_earth_nightmap.jpg'),ecl:tx('2k_earth_clouds.jpg'),jup:tx('2k_jupiter.jpg')};
  const geo=new THREE.PlaneGeometry(1,1);
  const col3=s=>{const m=/(\d+)\D+(\d+)\D+(\d+)/.exec(s||'rgb(255,200,60)');return new THREE.Color(m[1]/255,m[2]/255,m[3]/255);};
  const base={time:{value:0},alpha:{value:1},seed:{value:0},ext:{value:1}};
  const mk=(frag,u,ext)=>{const m=new THREE.ShaderMaterial({vertexShader:VERT,fragmentShader:frag,transparent:true,depthTest:false,depthWrite:false,uniforms:Object.assign({time:{value:0},alpha:{value:1},seed:{value:0},ext:{value:ext}},u)});return m;};
  const L=new THREE.Vector3(-.8,.35,.55);
  const objs=GI.map((o,i)=>{let mat,ext;const seed=i*1.37;
    if(o.typ==='bana'){ext=1.06;mat=mk(FRAG_ORBIT,{Rpx:{value:100}},ext);}
    else if(o.typ==='bh'){ext=5;mat=mk(FRAG_BH,{},ext);}
    else if(o.typ==='planet'){ext=1.16;const earth=o.p==='jorden';mat=mk(FRAG_PLANET,{day:{value:earth?T.eday:T.jup},night:{value:T.enight},clouds:{value:T.ecl},L:{value:L},atmo:{value:earth?new THREE.Vector3(.35,.62,1):new THREE.Vector3(.95,.8,.6)},hasN:{value:earth?1:0},hasC:{value:earth?1:0},spin:{value:earth?.05:.12},rim:{value:earth?1:.45}},ext);}
    else{ext=o.n==='Solen'?2.6:2.2;const big=Math.min(1,o.r/40);const cell=o.n==='Solen'?1:Math.max(.3,1-big*.7);
      mat=mk(FRAG_STAR,{tex:{value:T.sun},col:{value:col3(o.col)},cell:{value:cell},glow:{value:o.n==='Solen'?6.5:7.5},spin:{value:.02},tint:{value:o.n==='Solen'?.0:.85}},ext);}
    mat.uniforms.seed.value=seed;
    const mesh=new THREE.Mesh(geo,mat);mesh.visible=false;scene.add(mesh);return{o,mesh,mat,ext};});
  // bakgrundsstjärnor med parallax
  const NS=260,pos=new Float32Array(NS*3),sz=new Float32Array(NS),par=new Float32Array(NS),aa=new Float32Array(NS);let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
  const bgMat=new THREE.ShaderMaterial({vertexShader:VERT_BG,fragmentShader:FRAG_BG,transparent:true,depthTest:false,uniforms:{res:{value:new THREE.Vector2(1,1)},off:{value:0}}});
  const bgGeo=new THREE.BufferGeometry();
  const bgPts=new THREE.Points(bgGeo,bgMat);bgPts.frustumCulled=false;bgPts.renderOrder=-1e9;scene.add(bgPts);
  let W=0,H=0,P=null,disposed=false;
  const resize=(w,h)=>{const d=Math.min(devicePixelRatio||1,2);renderer.setPixelRatio(d);renderer.setSize(w,h,false);cam.left=0;cam.right=w;cam.top=h;cam.bottom=0;cam.updateProjectionMatrix();bgMat.uniforms.res.value.set(w,h);
    for(let i=0;i<NS;i++){pos[i*3]=rnd()*w;pos[i*3+1]=rnd()*h;pos[i*3+2]=0;sz[i]=1+rnd()*rnd()*3.2;par[i]=.02+rnd()*.35;aa[i]=.25+rnd()*.7;}
    bgGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));bgGeo.setAttribute('aSize',new THREE.BufferAttribute(sz,1));bgGeo.setAttribute('aPar',new THREE.BufferAttribute(par,1));bgGeo.setAttribute('aA',new THREE.BufferAttribute(aa,1));
    W=w;H=h;};
  let t0=performance.now();
  function draw(){if(!P||disposed)return;const {w,h,s,fx,base,cx}=P;if(w!==W||h!==H)resize(w,h);
    const time=(performance.now()-t0)/1000;bgMat.uniforms.off.value=fx*s*.4;
    objs.forEach((ob,i)=>{const o=ob.o,r=o.r*s,x=(cx||w*.58)+(POS[i]-fx)*s,R=Math.min(r,h*8),ext=ob.ext;
      if(r<.35||x+R*ext<-4||x-R*ext>w+4){ob.mesh.visible=false;return;}
      ob.mesh.visible=true;const yDown=base-R,sc=2*R*ext;ob.mesh.position.set(x,h-yDown,0);ob.mesh.scale.set(sc,sc,1);ob.mesh.renderOrder=-Math.round(r*1000)/1000;
      ob.mat.uniforms.time.value=time;ob.mat.uniforms.alpha.value=Math.max(0,Math.min(1,(r-.35)/2));
      if(ob.mat.uniforms.Rpx)ob.mat.uniforms.Rpx.value=R;});
    renderer.render(scene,cam);}
  let raf=0;const loop=()=>{if(disposed)return;draw();raf=requestAnimationFrame(loop);};
  return{set(p){P=p;},start(){if(!raf)loop();},stop(){cancelAnimationFrame(raf);raf=0;},draw,dispose(){disposed=true;cancelAnimationFrame(raf);renderer.dispose();}};
}
