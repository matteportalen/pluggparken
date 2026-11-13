/* Glödväktaren: vägvisaren. Ett glödljus leder till nästa mål, en ljuspelare och en romb står över målet,
   en pil i kanten visar hållet när målet ligger utanför bilden, och en skylt visar knappen när man är framme.
   Bara ritning: var målet ligger bestäms i index.html (guideTarget). Mörk pixelstil, inga ljusa rutor. */
(function(){
'use strict';
const GULD='#f2c15c',LJUS='#fff1c4',MORK='#15131d',KANT='#7f6887';
let wisp=null,spar=[];
const px=(c,x,y,w,h,f)=>{c.fillStyle=f;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
function platta(c,x,y,text,{nyckel=null,stor=false}={}){c.save();c.font=(stor?'bold 17px':'bold 13px')+' monospace';c.textAlign='left';c.textBaseline='middle';
  const tw=text?c.measureText(text).width:0,kw=nyckel?(stor?30:24):0,gap=nyckel&&text?9:0,pad=10,w=tw+kw+gap+pad*2,h=stor?40:28,x0=Math.round(x-w/2),y0=Math.round(y-h/2);
  px(c,x0+3,y0+4,w,h,'#00000088');px(c,x0,y0,w,h,MORK);c.strokeStyle=GULD;c.lineWidth=2;c.strokeRect(x0+1,y0+1,w-2,h-2);
  if(nyckel){const k=kw,kx=x0+pad,ky=y0+(h-k)/2;px(c,kx,ky+2,k,k,'#6b5524');px(c,kx,ky,k,k-2,GULD);c.fillStyle=MORK;c.textAlign='center';c.fillText(nyckel,kx+k/2,ky+k/2-1);c.textAlign='left'}
  if(text){c.fillStyle=LJUS;c.fillText(text,x0+pad+kw+gap,y0+h/2+1)}c.restore();return{w,h}}
function romb(c,x,y,s,f){for(let i=0;i<s;i++){const w=(i+1)*2;px(c,x-w/2,y-s+i,w,1,f);px(c,x-w/2,y+s-1-i,w,1,f)}}
function pil(c,x,y,dir,f){for(let i=0;i<9;i++)px(c,dir>0?x+i*2-8:x+8-i*2-2,y-9+i,2,(9-i)*2,f)}
/* e: {tx,ty,hx,hy (världen), cam,dy, VW,VH, t, reduce, label, verb, nara, nyckel, prat} */
function draw(c,e){const sx=e.tx-e.cam,sy=e.ty+e.dy,hx=e.hx-e.cam,hy=e.hy+e.dy,t=e.reduce?0:e.t,dir=e.tx>=e.hx?1:-1,bob=Math.sin(t*3)*5;
  c.save();c.imageSmoothingEnabled=false;
  if(sx>-30&&sx<e.VW+30){const g=c.createLinearGradient(0,sy-330,0,sy);g.addColorStop(0,'#f2c15c00');g.addColorStop(1,'#f2c15c48');c.fillStyle=g;c.fillRect(Math.round(sx-22),sy-330,44,330);
    const g2=c.createLinearGradient(0,sy-330,0,sy);g2.addColorStop(0,'#fff1c400');g2.addColorStop(1,'#fff1c455');c.fillStyle=g2;c.fillRect(Math.round(sx-5),sy-330,10,330);
    const r=18+(e.reduce?0:(t*1.4%1)*26),a=e.reduce?.7:1-(t*1.4%1);c.strokeStyle=`rgba(242,193,92,${(a*.8).toFixed(2)})`;c.lineWidth=3;c.beginPath();c.ellipse(sx,sy-3,r,r*.3,0,0,7);c.stroke();
    if(!e.nara){const my=sy-158+bob;romb(c,sx,my,11,'#6b5524');romb(c,sx,my-2,11,GULD);romb(c,sx,my-2,5,LJUS);if(e.label)platta(c,sx,my-34,e.label)}}
  else{const ax=sx<0?40:e.VW-40,ay=Math.max(120,Math.min(e.VH-150,hy-70)),d=sx<0?-1:1,ox=e.reduce?0:Math.sin(t*5)*5*d;
    px(c,ax-21+ox+3,ay-21+4,42,42,'#00000088');px(c,ax-21+ox,ay-21,42,42,MORK);c.strokeStyle=GULD;c.lineWidth=2;c.strokeRect(ax-20+ox,ay-20,40,40);pil(c,ax+ox,ay,d,GULD);
    if(e.label){c.font='bold 13px monospace';const w=c.measureText(e.label).width+24;platta(c,Math.max(w/2+8,Math.min(e.VW-w/2-8,ax)),ay+42,e.label)}}
  /* glödljuset: flyger en bit framför riddaren, mot målet */
  const avst=Math.abs(e.tx-e.hx),malX=avst<170?e.tx:e.hx+dir*125,malY=(avst<170?e.ty-95:e.hy-84)+Math.sin(t*4)*7;
  if(!wisp||Math.abs(wisp.x-e.hx)>900)wisp={x:e.hx,y:e.hy-80};wisp.x+=(malX-wisp.x)*(e.reduce?1:.075);wisp.y+=(malY-wisp.y)*(e.reduce?1:.09);
  if(!e.reduce){spar.push({x:wisp.x,y:wisp.y,l:1});if(spar.length>14)spar.shift();spar.forEach(p=>p.l-=.07)}else spar=[];
  for(const p of spar){if(p.l<=0)continue;const s=Math.max(1,Math.round(p.l*4));px(c,p.x-e.cam-s/2,p.y+e.dy-s/2,s,s,`rgba(242,193,92,${(p.l*.55).toFixed(2)})`)}
  const wx=wisp.x-e.cam,wy=wisp.y+e.dy,gl=c.createRadialGradient(wx,wy,1,wx,wy,26);gl.addColorStop(0,'#fff1c4cc');gl.addColorStop(.35,'#f2c15c66');gl.addColorStop(1,'#f2c15c00');c.fillStyle=gl;c.fillRect(wx-26,wy-26,52,52);px(c,wx-3,wy-3,6,6,LJUS);px(c,wx-1,wy-5,2,10,LJUS);px(c,wx-5,wy-1,10,2,LJUS);
  /* framme: visa knappen */
  if(e.nara&&e.verb){const gung=e.reduce?0:Math.sin(t*6)*4;if(e.prat)platta(c,e.VW/2,e.VH-46+gung,e.verb.toUpperCase(),{nyckel:e.nyckel,stor:true});else platta(c,Math.max(120,Math.min(e.VW-120,hx)),Math.max(34,hy-168+gung),e.verb.toUpperCase(),{nyckel:e.nyckel,stor:true})}
  c.restore()}
function tangenter(c,VW,VH,touch){if(touch)return;const delar=[['←→','GÅ'],['↑','HOPPA'],['E','ANVÄND']];c.save();c.font='bold 13px monospace';let w=0;const b=delar.map(d=>{const kw=d[0].length>1?40:24,tw=c.measureText(d[1]).width;w+=kw+8+tw+22;return{kw,tw,d}});w-=22;
  let x=Math.round(VW/2-w/2);const y=VH-58;px(c,x-14+3,y-20+4,w+28,40,'#00000088');px(c,x-14,y-20,w+28,40,MORK);c.strokeStyle=KANT;c.lineWidth=2;c.strokeRect(x-13,y-19,w+26,38);c.textBaseline='middle';
  for(const q of b){px(c,x,y-10,q.kw,22,'#6b5524');px(c,x,y-12,q.kw,22,GULD);c.fillStyle=MORK;c.textAlign='center';c.fillText(q.d[0],x+q.kw/2,y-1);c.textAlign='left';c.fillStyle=LJUS;c.fillText(q.d[1],x+q.kw+8,y);x+=q.kw+8+q.tw+22}c.restore()}
/* Bron vid bäcken: står rest tills den sparkas ner. p = 0 (rest) till 1 (nere). Ritas i världens koordinater. */
function bro(c,x,g,p,stovlar,t,reduce,nara){const fall=p*p,v=fall*Math.PI/2,len=175+95*fall;
  px(c,x-22,g-190,12,190,'#3b2f3d');px(c,x-25,g-196,18,8,'#55455a');
  if(p<.12){c.strokeStyle='#b89b5e';c.lineWidth=3;c.beginPath();c.moveTo(x-14,g-186);c.lineTo(x+4,g-166);c.stroke()}
  c.save();c.translate(x-2,g-6);c.rotate(v-Math.PI/2);px(c,0,-10,len,19,'#3b2f3d');px(c,0,-8,len,15,'#6d5668');for(let i=0;i*23<len-4;i++)px(c,i*23+4,-11,5,21,'#a48594');px(c,0,-8,len,3,'#8a6f86');c.restore();
  if(p>0)return;
  if(stovlar){const a=reduce?.9:.55+.45*Math.sin(t*6);c.save();c.globalAlpha=a;for(let i=0;i<3;i++)pil(c,x-78+i*18+(reduce?0:(t*2%1)*8),g-128,1,GULD);c.restore();c.fillStyle=`rgba(242,193,92,${(a*.45).toFixed(2)})`;c.fillRect(x-12,g-176,24,168)}
  else if(nara){c.save();c.translate(x-40,g-222);platta(c,0,0,'SITTER FAST · BEHÖVER GLÖDSTÖVLAR');c.restore()}}
/* Skylten för nytt mål (i scenen, mörk pixelplatta) */
function skylt(stage,text){let el=stage.querySelector('.guide-banner');if(!el){el=document.createElement('div');el.className='guide-banner';el.setAttribute('aria-hidden','true');el.innerHTML='<small>NYTT MÅL</small><b></b>';stage.appendChild(el)}el.querySelector('b').textContent=text;el.classList.remove('visa');void el.offsetWidth;el.classList.add('visa')}
window.GlodGuide={draw,tangenter,bro,skylt,platta,vila(){wisp=null;spar=[]}};
})();
