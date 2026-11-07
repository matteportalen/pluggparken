/* Presentation only: never changes distance, speed, steering or question timing. */
window.RallyFeel=(()=>{
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),hash=(i,seed)=>{const n=Math.sin(i*127.1+seed*31.7)*43758.5453;return n-Math.floor(n)};
 function step(r,dt,reduce){const f=r.feel||(r.feel={fov:0,lag:0,followSpeed:0});if(reduce){f.fov=f.lag=0;f.followSpeed=r.speed;return}const ratio=clamp(r.speed/.68,0,1),target=.08*ratio+(r.nitro>0?.06:0),accel=clamp((r.speed-f.followSpeed)/.68,-.65,.65);f.followSpeed+=(r.speed-f.followSpeed)*(1-Math.exp(-dt*2.5));f.fov+=(target-f.fov)*(1-Math.exp(-dt*6));f.lag+=(accel*.025-f.lag)*(1-Math.exp(-dt*8))}
 // Stable world-space IDs, including items just behind the player's projection plane.
 function roadside(r){const list=[],spacing=.42,first=Math.floor((r.d-.3)/spacing);for(let i=first;i<=first+22;i++){const h=hash(i,r.seed);list.push({id:i,d:i*spacing,side:i%2?-1:1,variant:Math.floor(h*4),jitter:h})}return list}
 function scenery(ctx,{R,W,H,project}){const winter=R.track==='vinter',forest=R.track==='skog',desert=R.track==='oken',items=roadside(R);
  // Paired close posts and rails give parallax; all are decorative, outside the driving lanes.
  for(let i=items.length-1;i>=0;i--){const item=items[i],p=project(item.d);if(!p||p.scale<.08)continue;const s=p.scale,h=clamp(W*.09*s,5,105),x=p.x+item.side*p.half*1.13;
   if(!desert){const next=project(item.d+.84);if(next){const nx=next.x+item.side*next.half*1.13,nh=clamp(W*.09*next.scale,5,105);ctx.strokeStyle=winter?'#b2cbcd':'#aeb8af';ctx.lineWidth=Math.max(1,4*s);ctx.beginPath();ctx.moveTo(x,p.y-h*.4);ctx.lineTo(nx,next.y-nh*.4);ctx.stroke();ctx.strokeStyle='#344d5355';ctx.lineWidth=Math.max(1,2*s);ctx.beginPath();ctx.moveTo(x,p.y-h*.35);ctx.lineTo(nx,next.y-nh*.35);ctx.stroke()}}
   ctx.fillStyle=desert?'#e3d2a8':winter?'#e8b45f':'#d3dacc';ctx.fillRect(x-h*.035,p.y-h*.65,Math.max(1,h*.07),h*.65);ctx.fillStyle=desert?'#9a4b32':'#d17a43';ctx.fillRect(x-h*.04,p.y-h*.56,Math.max(1,h*.08),Math.max(2,h*.12));
   const fx=p.x+item.side*p.half*(1.6+item.jitter*.65),fh=h*(1.2+item.jitter*.8);
   if(forest||winter){ctx.fillStyle=winter?'#537577':'#264c40';ctx.beginPath();ctx.moveTo(fx,p.y-fh);ctx.lineTo(fx+fh*.3,p.y);ctx.lineTo(fx-fh*.3,p.y);ctx.closePath();ctx.fill();ctx.fillStyle=winter?'#dce8de':'#477052';ctx.beginPath();ctx.moveTo(fx,p.y-fh);ctx.lineTo(fx+fh*.2,p.y-fh*.35);ctx.lineTo(fx-fh*.2,p.y-fh*.35);ctx.closePath();ctx.fill()}
   else if(desert){ctx.fillStyle=item.variant%2?'#a47856':'#bb956c';ctx.beginPath();ctx.moveTo(fx-fh*.3,p.y);ctx.lineTo(fx-fh*.18,p.y-fh*.45);ctx.lineTo(fx+fh*.14,p.y-fh*.6);ctx.lineTo(fx+fh*.35,p.y);ctx.closePath();ctx.fill()}
   else if(item.variant===0){ctx.strokeStyle='#4d6b73';ctx.lineWidth=Math.max(1,3*s);ctx.beginPath();ctx.moveTo(fx,p.y);ctx.lineTo(fx,p.y-fh);ctx.lineTo(fx-item.side*fh*.22,p.y-fh);ctx.stroke();ctx.fillStyle='#e2d6af';ctx.fillRect(fx-item.side*fh*.22-fh*.06,p.y-fh,fh*.12,Math.max(2,fh*.04))}
   else{ctx.fillStyle=item.variant%2?'#c8c9b2':'#d28a54';ctx.fillRect(fx-fh*.25,p.y-fh*.28,fh*.5,fh*.28);ctx.fillStyle='#3c5a6099';ctx.fillRect(fx-fh*.25,p.y-fh*.14,fh*.5,Math.max(1,fh*.045))}
  }
 }
 function lines(ctx,{R,W,H,projection,reduce}){if(reduce||R.phase!=='driving'||R.finish)return;const ratio=R.speed/.68,near=R.gate&&R.gate.d-R.d<1.2,alpha=clamp((ratio-.85)*.11+(R.nitro>0?.13:0),0,.24)*(near?.2:1);if(alpha<=.005)return;const van=projection.at(-1);ctx.save();ctx.lineWidth=1.2;ctx.strokeStyle=`rgba(238,238,207,${alpha})`;for(let i=0;i<18;i++){const side=i%2?-1:1,phase=(hash(i,731)+R.clock*(.5+ratio*.65))%1,y=H*(.48+phase*.58),edge=W*(.035+hash(i,911)*.09),x=side<0?edge:W-edge,tail=.035+ratio*.035;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+(van.x-x)*tail,y+(van.y-y)*tail);ctx.stroke()}ctx.restore()}
 return{step,roadside,scenery,lines};
})();
