/* Coin feedback is presentation only. R.coins remains the authoritative reward. */
window.RallyCoins=(()=>{
 let target={x:.9,y:.7};const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 function reset(r){r.coinFeel={flights:[],shown:-1,bump:0,last:-10,chain:0};show(r)}
 function measure(canvas){const el=document.getElementById('coinWallet');if(!el||!canvas)return;const a=canvas.getBoundingClientRect(),b=el.getBoundingClientRect();if(a.width&&a.height)target={x:(b.left+b.width*.25-a.left)/a.width,y:(b.top+b.height*.5-a.top)/a.height}}
 function show(r){const f=r.coinFeel;if(!f)return;const el=document.getElementById('coinWallet'),n=document.getElementById('coinCount');if(!el||!n)return;const shown=Math.max(0,r.coins-f.flights.length);if(f.shown!==shown){f.shown=shown;n.textContent=shown;el.setAttribute('aria-label',`${shown} insamlade mynt i loppet`)}el.style.setProperty('--coin-bump',f.bump)}
 function collect(r,x,y,w,h,reduce){if(!r.coinFeel)reset(r);const f=r.coinFeel;f.chain=r.clock-f.last<1.05?Math.min(6,f.chain+1):0;f.last=r.clock;
  if(reduce){f.bump=0;show(r)}else{if(f.flights.length>=16)f.flights.shift();f.flights.push({x:clamp(x/w,0,1),y:clamp(y/h,.35,.98),age:0,phase:f.chain});show(r)}
  window.Ljud?.rally?.pickup?.(f.chain);
 }
 function reward(r){if(!r.coinFeel)reset(r);r.coinFeel.bump=1;show(r)}
 function step(r,dt,reduce){const f=r.coinFeel;if(!f)return;if(reduce){f.flights=[];f.bump=0;show(r);return}const count=f.flights.length;f.flights.forEach(c=>c.age+=dt);f.flights=f.flights.filter(c=>c.age<.64);if(f.flights.length<count)f.bump=1;else f.bump=Math.max(0,f.bump-dt*5);show(r)}
 function flush(r){if(!r.coinFeel)return;r.coinFeel.flights=[];r.coinFeel.bump=0;show(r)}
 function coin(ctx,x,y,r,turn=1){ctx.save();ctx.translate(x,y);ctx.scale(Math.max(.32,Math.abs(turn)),1);const g=ctx.createLinearGradient(-r,-r,r,r);g.addColorStop(0,'#fff2a9');g.addColorStop(.45,'#e9b951');g.addColorStop(1,'#b77927');ctx.fillStyle=g;ctx.strokeStyle='#9b6c2e';ctx.lineWidth=1.3;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle='#fff0a3';ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,r*.7,0,Math.PI*2);ctx.stroke();ctx.restore()}
 function draw(ctx,{R,W,H,reduce}){const f=R.coinFeel;if(!f||reduce)return;ctx.save();for(const c of f.flights){const t=c.age,x=c.x*W,y=c.y*H,r=clamp(W*.022,8,18);
   if(t<.2){const u=t/.2;ctx.globalAlpha=1-u;for(let i=0;i<7;i++){const a=i*Math.PI*2/7+c.phase*.3,dist=8+u*26,s=3*(1-u);ctx.fillStyle='#ffe2a1';ctx.beginPath();ctx.moveTo(x+Math.cos(a)*dist-s,y+Math.sin(a)*dist);ctx.lineTo(x+Math.cos(a)*dist,y+Math.sin(a)*dist-s*1.8);ctx.lineTo(x+Math.cos(a)*dist+s,y+Math.sin(a)*dist);ctx.lineTo(x+Math.cos(a)*dist,y+Math.sin(a)*dist+s*1.8);ctx.closePath();ctx.fill()}ctx.globalAlpha=1}
   if(t<.13){coin(ctx,x,y,r*(1+Math.sin(t/.13*Math.PI)*.65),1)}else{const u=clamp((t-.13)/.51,0,1),v=1-u,tx=target.x*W,ty=target.y*H,cx=(x+tx)/2,cy=Math.max(H*.35,Math.min(y,ty)-Math.min(36,H*.08));coin(ctx,v*v*x+2*v*u*cx+u*u*tx,v*v*y+2*v*u*cy+u*u*ty,r*(1-u*.55),Math.cos(u*Math.PI*2))}}
  ctx.restore()
 }
 return{reset,measure,collect,reward,step,flush,draw};
})();
