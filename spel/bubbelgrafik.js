/* Presentation only. No game state, randomness, timers, input or physics. */
window.MPBubbelGrafik=(()=>{
  const mix=(a,b,k)=>{const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),A=rgb(a),B=rgb(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,'0')).join('');};
  const round=(x,l,t,w,h,r)=>{x.beginPath();x.roundRect(l,t,w,h,r);};
  function sprite(col,r,dpr){
    const size=Math.ceil(r*2*dpr)+4,c=document.createElement('canvas');c.width=c.height=size;
    const x=c.getContext('2d');x.scale(dpr,dpr);const m=size/dpr/2;
    // A dark glass edge, a saturated body, and two restrained reflections.
    let g=x.createRadialGradient(m-r*.3,m-r*.4,r*.02,m,m,r);
    g.addColorStop(0,mix(col,'#ffffff',.68));g.addColorStop(.35,mix(col,'#ffffff',.18));
    g.addColorStop(.73,col);g.addColorStop(.93,mix(col,'#172C52',.32));g.addColorStop(1,mix(col,'#0C1D38',.5));
    x.fillStyle=g;x.beginPath();x.arc(m,m,r-.5,0,Math.PI*2);x.fill();
    x.strokeStyle=mix(col,'#ffffff',.65);x.lineWidth=Math.max(.8,r*.045);
    x.beginPath();x.arc(m,m,r*.89,Math.PI*1.02,Math.PI*1.91);x.stroke();
    x.strokeStyle='rgba(255,255,255,.38)';x.lineWidth=Math.max(1,r*.08);
    x.beginPath();x.arc(m,m,r*.82,.2,1.22);x.stroke();
    x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.ellipse(m-r*.33,m-r*.52,r*.27,r*.12,-.45,0,Math.PI*2);x.fill();
    x.fillStyle='rgba(255,255,255,.58)';x.beginPath();x.arc(m+r*.47,m-r*.43,r*.075,0,Math.PI*2);x.fill();
    return c;
  }
  function atmosphere(x,L,world){
    const {W,H}=L;x.save();
    const g=x.createRadialGradient(W*.5,H*.28,Math.min(W,H)*.15,W*.5,H*.48,Math.max(W,H)*.72);
    g.addColorStop(0,'rgba(12,27,50,0)');g.addColorStop(.65,'rgba(12,27,50,.05)');g.addColorStop(1,'rgba(9,20,45,.38)');
    x.fillStyle=g;x.fillRect(0,0,W,H);x.restore();
  }
  function board(x,L,world,cols){
    const {left,top,D,deadY}=L,w=cols*D;
    const colors={hav:['#123B62','#73DCEB'],djungel:['#173D39','#AAE7A5'],godis:['#683857','#FFC2DD'],is:['#172D59','#BAE9FA'],vulkan:['#402334','#FFC486'],slott:['#26385A','#F5D69A']};
    const [base,edge]=colors[world]||colors.hav;
    x.save();const g=x.createLinearGradient(0,top,0,deadY);
    g.addColorStop(0,mix(base,'#12213A',.25)+'D9');g.addColorStop(.55,base+'AA');g.addColorStop(1,base+'80');
    x.fillStyle=g;round(x,left-5,top-5,w+10,deadY-top+8,14);x.fill();
    x.lineWidth=1.5;x.strokeStyle=edge+'B0';x.stroke();
    // Inset edge and small rivets expose the exact playable corridor.
    x.strokeStyle='rgba(255,255,255,.13)';x.lineWidth=1;
    x.beginPath();x.moveTo(left+1,top+12);x.lineTo(left+1,deadY-8);x.moveTo(left+w-1,top+12);x.lineTo(left+w-1,deadY-8);x.stroke();
    for(const px of [left,left+w])for(const py of [top+12,deadY-9]){
      x.fillStyle=edge;x.beginPath();x.arc(px,py,2,0,Math.PI*2);x.fill();
    }
    x.restore();
  }
  function launcher(x,L,angle){
    const {shX,shY,Rs}=L;x.save();
    const g=x.createLinearGradient(0,shY-Rs-7,0,shY+Rs+7);
    g.addColorStop(0,'#ABC9DF');g.addColorStop(.45,'#426080');g.addColorStop(1,'#142B48');
    x.fillStyle=g;x.beginPath();x.arc(shX,shY,Rs+6,0,Math.PI*2);x.fill();
    x.lineWidth=2;x.strokeStyle='#D4EDF6';x.stroke();
    x.strokeStyle='#F9D27B';x.lineWidth=3;
    x.beginPath();x.arc(shX,shY,Rs+3,-angle-.24,-angle+.24);x.stroke();
    x.restore();
  }
  function trail(x,L,fly,at,reduce){
    if(reduce)return;
    x.save();
    for(let i=6;i>=1;i--){const s=fly.s-i*L.R*.4;if(s<0)continue;const [px,py]=at(fly.pts,s);
      x.globalAlpha=(1-i/7)*.24;x.fillStyle='#E5FAFF';x.beginPath();x.arc(px,py,L.R*(.2+(1-i/7)*.35),0,Math.PI*2);x.fill();}
    x.restore();
  }
  function pop(x,L,p,reduce){
    if(p.t<0)return;const u=p.t/.3;x.save();
    x.globalAlpha=(1-u)*.85;x.strokeStyle=mix(p.col,'#ffffff',.65);x.lineWidth=Math.max(1,L.R*.11*(1-u));
    x.beginPath();x.arc(p.x,p.y,L.R*(reduce?1.05:1+u*.9),0,Math.PI*2);x.stroke();
    if(!reduce)for(let i=0;i<6;i++){
      const a=i*Math.PI/3,r=L.R*(1.05+u*.9),px=p.x+Math.cos(a)*r,py=p.y+Math.sin(a)*r,s=L.R*.12*(1-u);
      x.fillStyle=i%2?'#FFF0BB':'#FFFFFF';x.beginPath();x.moveTo(px,py-s*2);x.lineTo(px+s*.6,py);x.lineTo(px,py+s*2);x.lineTo(px-s*.6,py);x.closePath();x.fill();
    }
    x.restore();
  }
  return {sprite,atmosphere,board,launcher,trail,pop};
})();
