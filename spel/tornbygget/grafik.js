/* Tornbyggets bildlager. Spelregler, kroppar och koordinater ägs av spel/index.html. */
window.TowerArt=(()=>{
 const base=new URL('.',document.currentScript.src),art={},voices=new Set();let loaded=false;
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 function load(){if(loaded)return;loaded=true;for(const [key,file] of Object.entries({site:'byggplats',clouds:'moln',orbit:'omloppsbana'})){const im=new Image();im.src=new URL(`bilder/${file}-v1.webp`,base);art[key]=im;}}
 function stopSound(){voices.forEach(a=>{a.pause();a.currentTime=0});voices.clear();}
 function sound(kind){if(!window.Ljud?.on||document.hidden)return;const file=kind==='crash'?'crash':`land-${Math.random()<.5?0:1}`,a=new Audio(new URL(`ljud/${file}.wav`,base));a.volume=kind==='crash'?.32:.26;a.playbackRate=.94+Math.random()*.08;voices.add(a);a.onended=a.onerror=()=>voices.delete(a);a.play().catch(()=>voices.delete(a));}
 document.addEventListener('mp-ljud',()=>{if(!window.Ljud?.on)stopSound()});document.addEventListener('visibilitychange',()=>{if(document.hidden)stopSound()});
 const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
 function image(ctx,im,x,y,w,h,alpha=1){if(!im?.complete||!im.naturalWidth||alpha<=0)return;ctx.save();ctx.globalAlpha=alpha;ctx.drawImage(im,x,y,w,h);ctx.restore()}
 function beam(ctx,cx,cy,w,h,ang,col,lean=0){
  ctx.save();ctx.translate(cx,cy);ctx.rotate(ang);const x=-w/2,y=-h/2,t=Math.max(2,h*.17);
  // Alla bärande ytor ligger inom fysikkroppens rektangel.
  const well=ctx.createLinearGradient(0,y,0,y+h);well.addColorStop(0,'#253744');well.addColorStop(.5,'#111f2a');well.addColorStop(1,'#405260');ctx.fillStyle=well;ctx.fillRect(x,y,w,h);
  ctx.strokeStyle='#141e25';ctx.lineWidth=t+1;ctx.lineCap='butt';ctx.beginPath();for(let i=0;i<=5;i++){const xx=x+t+(w-2*t)*i/5,yy=i%2?y+h-t:y+t;i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)}ctx.stroke();
  ctx.strokeStyle=col;ctx.lineWidth=t*.68;ctx.stroke();
  const metal=ctx.createLinearGradient(0,y,0,y+h);metal.addColorStop(0,'#eff1e4');metal.addColorStop(.08,col);metal.addColorStop(.5,col);metal.addColorStop(.8,'#283846');metal.addColorStop(1,col);ctx.fillStyle=metal;ctx.fillRect(x,y,w,t);ctx.fillRect(x,y+h-t,w,t);ctx.fillRect(x,y,t,h);ctx.fillRect(x+w-t,y,t,h);
  ctx.strokeStyle='#17242c';ctx.lineWidth=.8;ctx.strokeRect(x+.4,y+.4,w-.8,h-.8);ctx.fillStyle='#f4f4db99';ctx.fillRect(x+1,y+1,w-2,1);
  for(let i=0;i<=5;i++)for(const yy of [y+t*.5,y+h-t*.5]){const xx=x+t*.6+(w-t*1.2)*i/5;ctx.fillStyle='#172733';ctx.beginPath();ctx.arc(xx,yy,Math.max(.8,t*.22),0,7);ctx.fill();ctx.fillStyle='#d9d8bd';ctx.fillRect(xx-.4,yy-.6,.8,.6)}
  if(lean>.65){ctx.fillStyle='#ffa339';for(const xx of [x+2,x+w-4])ctx.fillRect(xx,y+h-t,2,t)}ctx.restore();
 }
 function crane(ctx,{W,H,T,c,beamPos,SX,TW,crewImg,drawTruss}){
  const mx=W*.085,mw=Math.max(14,W*.036),jy=c.jibY,ah=Math.max(13,H*.028),rail=ctx.createLinearGradient(mx-mw/2,0,mx+mw/2,0);rail.addColorStop(0,'#89651b');rail.addColorStop(.4,'#ffdb68');rail.addColorStop(.7,'#ddb044');rail.addColorStop(1,'#6c501b');
  ctx.fillStyle='#21313a';ctx.fillRect(mx-mw/2-2,jy,mw+4,H);ctx.fillStyle=rail;ctx.fillRect(mx-mw/2,jy,4,H);ctx.fillRect(mx+mw/2-4,jy,4,H);ctx.strokeStyle='#deb348';ctx.lineWidth=2.5;ctx.beginPath();for(let y=jy;y<H;y+=mw*1.15){ctx.moveTo(mx-mw/2+3,y);ctx.lineTo(mx+mw/2-3,y+mw*1.15);ctx.lineTo(mx-mw/2+3,y+mw*1.15)}ctx.stroke();
  const jib=ctx.createLinearGradient(0,jy-ah,0,jy+4);jib.addColorStop(0,'#ffe09a');jib.addColorStop(.2,'#dfae38');jib.addColorStop(.65,'#bb8c2b');jib.addColorStop(1,'#77591d');ctx.fillStyle='#23323d';ctx.fillRect(3,jy-ah,W-6,ah+5);ctx.strokeStyle='#f5c752';ctx.lineWidth=2;ctx.beginPath();for(let x=4;x<W-6;x+=ah*1.4){ctx.moveTo(x,jy+1);ctx.lineTo(x+ah*.7,jy-ah+1);ctx.lineTo(x+ah*1.4,jy+1)}ctx.stroke();ctx.fillStyle=jib;ctx.fillRect(3,jy-ah,W-6,3);ctx.fillRect(3,jy,W-6,4);
  ctx.strokeStyle='#53646c';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(9,jy-ah);ctx.lineTo(mx,jy-ah*2.5);ctx.lineTo(W*.7,jy-ah);ctx.stroke();ctx.fillStyle=rail;ctx.fillRect(mx-3,jy-ah*2.5,6,ah*1.5);
  ctx.fillStyle='#5f6b70';ctx.fillRect(5,jy+5,mw,ah*1.3);ctx.fillStyle='#939a95';ctx.fillRect(5,jy+5,mw,3);
  const cw=Math.max(50,W*.115),ch=cw*.8,cx=mx+mw/2+3,cy=jy+7;
  ctx.save();ctx.shadowColor='#101c2d77';ctx.shadowBlur=6;ctx.shadowOffsetY=3;ctx.fillStyle='#d7aa3c';ctx.fillRect(cx,cy,cw,ch);ctx.restore();ctx.fillStyle='#faD572';ctx.fillRect(cx,cy,cw,4);ctx.strokeStyle='#182a34';ctx.lineWidth=2;ctx.strokeRect(cx,cy,cw,ch);
  const glass=ctx.createLinearGradient(cx,cy,cx+cw,cy+ch);glass.addColorStop(0,'#adcbd0');glass.addColorStop(.55,'#6d969f');glass.addColorStop(1,'#254655');ctx.fillStyle=glass;ctx.fillRect(cx+4,cy+5,cw-8,ch*.65);
  if(crewImg.complete&&crewImg.naturalWidth){const pw=cw*.68;ctx.save();ctx.beginPath();ctx.rect(cx+4,cy+5,cw-8,ch*.65);ctx.clip();ctx.translate(cx+cw/2,cy+ch*.7);if(!reduced()&&T.shake)ctx.rotate(Math.sin(T.t*20)*.1*T.shake);ctx.drawImage(crewImg,-pw/2,-pw*.8,pw,pw*1.167);ctx.restore()}
  ctx.fillStyle='#f7ffff33';ctx.beginPath();ctx.moveTo(cx+5,cy+6);ctx.lineTo(cx+cw*.65,cy+6);ctx.lineTo(cx+5,cy+ch*.55);ctx.fill();ctx.fillStyle='#263b45';ctx.fillRect(cx+4,cy+ch*.7,cw-8,2);ctx.fillRect(cx+cw-12,cy+ch*.8,6,2);
  for(const [color,offset] of [['r',-14],['g',0]]){const on=T.lamp?.c===color;ctx.fillStyle=on?(color==='g'?'#b9ef83':'#ff785d'):'#425049';ctx.beginPath();ctx.arc(cx+cw-7+offset,cy-5,4,0,7);ctx.fill()}
  const bp=T.beam?beamPos():null,tx=bp?bp.tx:SX(T.trolley??TW/2,c.s),hx=bp?bp.x:tx+(reduced()?0:Math.sin(T.t*1.3)*4),hy=bp?bp.y-c.bh*.9:jy+c.L*.35;
  ctx.fillStyle='#263b48';ctx.fillRect(tx-11,jy+4,22,9);ctx.fillStyle='#a4a9a2';ctx.fillRect(tx-8,jy+5,16,2);ctx.lineWidth=2;ctx.strokeStyle='#1d313d';ctx.beginPath();ctx.moveTo(tx,jy+12);ctx.lineTo(hx,hy);ctx.stroke();ctx.strokeStyle='#adbdc0';ctx.lineWidth=.6;ctx.stroke();
  ctx.fillStyle='#dcad3d';ctx.fillRect(hx-5,hy,10,8);ctx.strokeStyle='#253945';ctx.lineWidth=3;ctx.beginPath();ctx.arc(hx,hy+10,5,-.4,Math.PI+1);ctx.stroke();
  if(bp){ctx.strokeStyle='#46606b';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(hx,hy+13);ctx.lineTo(bp.x-c.bw*.4,bp.y-c.bh/2);ctx.moveTo(hx,hy+13);ctx.lineTo(bp.x+c.bw*.4,bp.y-c.bh/2);ctx.stroke();drawTruss(bp.x,bp.y,c.bw,c.bh,0,T.beam.col);
   if(T.state==='swing'&&T.n<3){ctx.setLineDash([3,5]);ctx.strokeStyle='#f3f7dd88';ctx.beginPath();ctx.moveTo(bp.x,bp.y+c.bh/2+3);ctx.lineTo(bp.x,bp.y+c.bh*2);ctx.stroke();ctx.setLineDash([])}}
 }
 function background(ctx,{W,H,T,s,Y,X,moonR,topW,TGOAL,BW,FH}){
  if(!window.Ljud?.on&&voices.size)stopSound();const level=T.artLevel??0,cloud=smooth((level-3)/5),space=smooth((level-11)/6),gy=Y(0),t=reduced()?0:T.t;
  const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,space>.2?'#091c32':'#5289bd');sky.addColorStop(1,space>.2?'#386a92':'#d8e6e8');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  const sceneHeight=Math.max(H*1.85,W*1.5);image(ctx,art.site,0,gy-sceneHeight*.81,W,sceneHeight,1-cloud);
  image(ctx,art.clouds,0,-Math.sin(t*.025)*8,W,H+16,cloud*(1-space));
  image(ctx,art.orbit,0,0,W,H,space);
  if(space>.1){ctx.save();ctx.globalAlpha=space*.6;ctx.fillStyle='#dce9ee';for(const st of T.stars)ctx.fillRect(st.x*W,st.y*H,st.s*.65,st.s*.65);ctx.restore()}
  // Små rörelser i periferin; siktområdet hålls fritt.
  if(level<12){ctx.strokeStyle='#344d6288';ctx.lineWidth=1.6;for(const bird of T.birds.slice(0,3)){const x=(.72+(bird.x%1)*.25)*W,y=H*(.35+Math.sin(bird.ph)*.1),flap=Math.sin(t*8+bird.ph)*3;ctx.beginPath();ctx.moveTo(x-6,y-flap);ctx.quadraticCurveTo(x-2,y-3,x,y);ctx.quadraticCurveTo(x+2,y-3,x+6,y-flap);ctx.stroke()}}
  if(gy<H+FH*s){const bx=X(180)-(BW+30)*s/2,by=Y(-FH),bw=(BW+30)*s,bh=FH*s;const concrete=ctx.createLinearGradient(0,by,0,by+bh);concrete.addColorStop(0,'#d9d9cc');concrete.addColorStop(.14,'#aeb5ae');concrete.addColorStop(1,'#78888b');ctx.fillStyle=concrete;ctx.fillRect(bx,by,bw,bh);ctx.strokeStyle='#51666c';ctx.lineWidth=1;ctx.strokeRect(bx,by,bw,bh);ctx.fillStyle='#dde0d6';ctx.fillRect(bx+2,by+1,bw-4,2);for(let i=1;i<7;i++){ctx.fillStyle='#697b7e66';ctx.fillRect(bx+bw*i/7,by+bh*.6,2,2)}}
  const moonY=Y(topW(TGOAL))-moonR*.92;
  if(moonY>-moonR*1.4){const glow=ctx.createRadialGradient(W/2,moonY,moonR*.8,W/2,moonY,moonR*1.4);glow.addColorStop(0,'#b8d7e82c');glow.addColorStop(1,'#b8d7e800');ctx.fillStyle=glow;ctx.fillRect(W/2-moonR*1.4,moonY-moonR*1.4,moonR*2.8,moonR*2.8);const moon=ctx.createRadialGradient(W/2-moonR*.4,moonY-moonR*.4,0,W/2+moonR*.1,moonY+moonR*.2,moonR*1.3);moon.addColorStop(0,'#f0eee0');moon.addColorStop(.6,'#c6cbc5');moon.addColorStop(1,'#596f7c');ctx.fillStyle=moon;ctx.beginPath();ctx.arc(W/2,moonY,moonR,0,7);ctx.fill();for(const [dx,dy,r] of [[-.35,-.2,.18],[.3,.1,.14],[-.05,.35,.11],[.4,-.4,.08]]){ctx.fillStyle='#596e7a30';ctx.beginPath();ctx.ellipse(W/2+dx*moonR,moonY+dy*moonR,r*moonR,r*moonR*.8,-.3,0,7);ctx.fill();ctx.strokeStyle='#f5f3dc44';ctx.lineWidth=1;ctx.stroke()}}
  return moonY;
 }
 return{load,beam,crane,background,sound,stopSound,ready:()=>loaded&&Object.values(art).every(im=>im.complete&&im.naturalWidth)};
})();
