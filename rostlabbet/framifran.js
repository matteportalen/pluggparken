// Pedagogical front view; uses the same live articulation as the side view.
export function drawFront(canvas,a){
 const w=canvas.clientWidth,h=canvas.clientHeight,dpr=Math.min(devicePixelRatio||1,2);
 if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}
 const c=canvas.getContext('2d'),scale=Math.min(w/240,h/330);c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);c.translate(w/2,h/2);c.scale(scale,scale);
 const clamp=(x,l,r)=>Math.max(l,Math.min(r,x));
 const jaw=clamp(a.jaw/2.6,0,1),round=clamp(a.lipProt/1.2,0,1),open=clamp(a.lipAp/2.4,0,1);
 const mw=22+clamp(a.lipWidth,0,1)*19-round*7,mh=a.lipAp<=0?1:4+open*20+jaw*9,my=62+jaw*8;
 function ellipse(x,y,rx,ry,fill,stroke){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}}
 const skin=c.createLinearGradient(-70,-110,75,140);skin.addColorStop(0,'#ffe5cc');skin.addColorStop(1,'#dba988');
 ellipse(-82,2,12,24,'#d6a184');ellipse(82,2,12,24,'#d6a184');
 c.beginPath();c.moveTo(0,-137);c.bezierCurveTo(105,-137,100,-25,78,59);c.bezierCurveTo(65,113+jaw*13,30,129+jaw*15,0,132+jaw*15);c.bezierCurveTo(-30,129+jaw*15,-65,113+jaw*13,-78,59);c.bezierCurveTo(-100,-25,-105,-137,0,-137);c.fillStyle=skin;c.fill();c.strokeStyle='#ecceb7';c.lineWidth=2;c.stroke();
 // Hair, eyebrows, calm eyes and a small nose keep attention on the mouth.
 c.beginPath();c.moveTo(-80,-45);c.bezierCurveTo(-100,-146,-16,-166,44,-127);c.bezierCurveTo(92,-131,95,-73,82,-37);c.lineTo(70,-85);c.bezierCurveTo(30,-70,15,-105,-20,-99);c.bezierCurveTo(-43,-80,-65,-85,-80,-45);c.fillStyle='#413c4b';c.fill();
 for(const x of [-33,33]){ellipse(x,-23,15,9,'#fff7ef');ellipse(x,-22,5,7,'#34465c');ellipse(x+1,-24,1.5,2,'white');c.beginPath();c.moveTo(x-13,-43);c.quadraticCurveTo(x,-49,x+13,-43);c.strokeStyle='#65505a';c.lineWidth=4;c.lineCap='round';c.stroke()}
 c.beginPath();c.moveTo(0,-13);c.quadraticCurveTo(-8,19,-5,23);c.quadraticCurveTo(0,27,9,22);c.strokeStyle='#bb866c';c.lineWidth=2;c.stroke();
 ellipse(-53,37,14,7,'#e6a18e');ellipse(53,37,14,7,'#e6a18e');
 // Jaw guide and enlarged lips show subtle changes without pretending to be a medical model.
 c.beginPath();c.moveTo(-57,87+jaw*8);c.quadraticCurveTo(0,158+jaw*14,57,87+jaw*8);c.strokeStyle='#ff916e';c.lineWidth=3;c.stroke();
 ellipse(0,my,mw+7,mh+6,'#ee8dad','#ffbad3');ellipse(0,my,mw,mh,'#43283d');
 if(mh>6){c.save();c.beginPath();c.ellipse(0,my,mw,mh,0,0,Math.PI*2);c.clip();c.fillStyle='#fff6dc';c.fillRect(-mw+4,my-mh,mw*2-8,6);const tongueHeight=clamp((a.tbY-4.8)/4.4,0,1);ellipse(0,my+mh+4-tongueHeight*mh*.75,mw*.65,Math.max(5,mh*.52),'#62d695');c.restore()}
}
