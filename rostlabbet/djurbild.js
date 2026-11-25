/* Djurens genomskärningar i Röstlabbet (Djurens röster i scen.js).
   Efter originalets CreatureView (CHIMERA, MIT): konturen, luftvägarna med motorns egen bredd och
   tvärstreck som lyser av ljudtrycket, och ljudkällorna som ringar som pulserar med tonen.
   Förenklad: inga parametervärden längst ner, svenska etiketter i scen.js. */
import {V,SLOTS,heat,pressureLevel} from './chimera/ui/colors.js';
import {beamPts,dot,ring,seg} from './chimera/ui/render/vector.js';

function smooth(pts,per,closed){const n=pts.length;if(n<3)return pts.slice();const at=i=>closed?pts[(i+n)%n]:pts[Math.max(0,Math.min(n-1,i))];const out=[];
 for(let i=0;i<(closed?n:n-1);i++){const p0=at(i-1),p1=at(i),p2=at(i+1),p3=at(i+2);for(let k=0;k<per;k++){const t=k/per,t2=t*t,t3=t2*t;const f=(a,b,c,d)=>.5*(2*b+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);out.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])])}}
 if(!closed)out.push(pts[n-1]);return out}
const geoms=new Map();
function geometry(def){let g=geoms.get(def.id);if(g)return g;const v=def.visual;
 g={silhouette:smooth(v.silhouette,8,true),parts:(v.parts||[]).map(p=>({shade:p.shade,pts:smooth(p.pts,6,true)})),
  tubes:v.tubes.map(t=>{const pts=smooth(t.path,6,false),cum=[0];for(let i=1;i<pts.length;i++)cum.push(cum[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));return{tube:t.tube,pts,cum,length:cum[cum.length-1]}})};
 geoms.set(def.id,g);return g}
function pointAt(t,s){let i=1;while(i<t.cum.length-1&&t.cum[i]<s)i++;const u=Math.max(0,Math.min(1,(s-t.cum[i-1])/Math.max(1e-9,t.cum[i]-t.cum[i-1])));return[t.pts[i-1][0]+(t.pts[i][0]-t.pts[i-1][0])*u,t.pts[i-1][1]+(t.pts[i][1]-t.pts[i-1][1])*u]}

const minne={peak:{},phase:{}};
/** Rita djuret i canvas. live = motorns djurtelemetri (null när djuret är tyst), preview = stillbild före ljud. */
export function ritaDjur(canvas,def,live,preview,dt,etiketter){
 const dpr=Math.min(devicePixelRatio||1,2),w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;
 if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}
 const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#0c2234';ctx.fillRect(0,0,w,h);
 const vis=def.visual,geo=geometry(def),tele=live||preview;if(!tele)return;
 const vw=vis.view.x1-vis.view.x0,vh=vis.view.y1-vis.view.y0,pad=14;
 const sc=Math.min((w-2*pad)/vw,(h-2*pad)/vh),ox=w/2-((vis.view.x0+vis.view.x1)/2)*sc,oy=h/2+((vis.view.y0+vis.view.y1)/2)*sc;
 const S=([x,y])=>[ox+x*sc,oy-y*sc];
 beamPts(ctx,geo.silhouette.map(S),V.blue,1.7,{hot:true,close:true});
 for(const part of geo.parts)beamPts(ctx,part.pts.map(S),part.shade>.5?V.blueMid:V.blueDim,1,{close:true,alpha:.9});
 const ex=vis.tubeScale??1.6;
 for(const tg of geo.tubes){const data=tele.tubes&&tele.tubes[tg.tube];if(!data)continue;const n=data.areas.length;
  const half=k=>Math.sqrt(Math.max(0,data.areas[Math.min(n-1,k)])/Math.PI)*ex;
  const frame=s=>{const a=pointAt(tg,Math.max(0,s-.02*tg.length)),b=pointAt(tg,Math.min(tg.length,s+.02*tg.length));const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;return{p:pointAt(tg,s),nx:-dy/l,ny:dx/l}};
  const A=[],B=[];for(let k=0;k<=n;k++){const{p,nx,ny}=frame(k/n*tg.length),r=half(k);A.push(S([p[0]+nx*r,p[1]+ny*r]));B.push(S([p[0]-nx*r,p[1]-ny*r]))}
  beamPts(ctx,A,V.blue,1.2,{hot:true});beamPts(ctx,B,V.blue,1.2,{hot:true});
  for(let k=0;k<n;k++){const{p,nx,ny}=frame((k+.5)/n*tg.length),r=half(k);const lvl=live&&data.rms?Math.pow(pressureLevel(data.rms[k]*.6),.85):0;
   const[x0,y0]=S([p[0]+nx*r,p[1]+ny*r]),[x1,y1]=S([p[0]-nx*r,p[1]-ny*r]);seg(ctx,x0,y0,x1,y1,live?heat(lvl):V.blueDim,1,{alpha:live?.35+.65*lvl:.6})}}
 const pp=def.params.find(p=>p.role==='pitch'),pitch=live&&pp?(live.params?.[pp.key]??pp.default):pp?.default??200;
 const rate=1.2+4.8*Math.max(0,Math.min(1,Math.log(pitch/10)/Math.log(900)));
 ctx.font='700 12px "Baloo 2",sans-serif';
 (vis.sources||[]).forEach((s,i)=>{const color=SLOTS[i%4],raw=Math.max(0,Math.min(1,live?.source?.[s.key]??0));
  const pk=Math.max(raw,(minne.peak[s.key]??0)*Math.exp(-dt/.18));minne.peak[s.key]=pk;const ph=((minne.phase[s.key]??0)+dt*rate)%1;minne.phase[s.key]=ph;
  const[x,y]=S(s.at),r0=3.5+6*pk;
  if(pk>.04)for(let j=0;j<3;j++){const u=(ph+j/3)%1;ring(ctx,x,y,r0+u*28,color,1,{alpha:(1-u)*Math.min(1,pk*1.3)*.8})}
  ring(ctx,x,y,r0,color,1.5,{hot:true});dot(ctx,x,y,1.8,color);
  const t=etiketter?.[s.key];if(t){ctx.fillStyle=color;ctx.fillText(t,Math.min(w-ctx.measureText(t).width-4,x+12),y+20)}});
}
