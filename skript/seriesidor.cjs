/* Seriesidor att skriva ut (skriv-ut/seriesidor.pdf och .png).
   Kör: NODE_PATH=/opt/homebrew/lib/node_modules node skript/seriesidor.cjs  (servern behövs inte)
   Varje sida är A4 i mm. En sida = rader med rutor; bubblor ritas ovanpå med vit fyllning så att de kan gå över rutans kant. */
const {chromium}=require('playwright');const path=require('path');
const UT=path.join(__dirname,'..','skriv-ut');
const W=210,H=297,M=13,G=4.5,LW=.55,BW=.42;
const TOP=24; // under namnraden

/* rad: {h: relativ höjd, c:[relativa bredder]} ; titel: true = titelruta överst */
const SIDOR=[
 {namn:'Omslag',omslag:true,rader:[{h:1,c:[1]}]},
 {namn:'Titel och tolv rutor',titel:true,rader:[{h:1,c:[1,1,1,1]},{h:1,c:[1,1,1,1]},{h:1,c:[1,1,1,1]}]},
 {namn:'Sju rutor med bubblor',rader:[{h:1,c:[1,1]},{h:1,c:[1]},{h:1,c:[1.75,1]},{h:1,c:[1,1.55]}],
  bubblor:[{t:'text',r:0,k:0,x:.62,y:.02,w:.35,h:.24,sx:.52,sy:.33},{t:'tanke',r:1,k:0,x:.55,y:-.12,w:.24,h:.38,sx:.66,sy:.42},
           {t:'tal',r:2,k:0,x:.02,y:.04,w:.4,h:.36,sx:.3,sy:.6},{t:'tal',r:3,k:1,x:.62,y:.04,w:.36,h:.34,sx:.66,sy:.6}]},
 {namn:'Sex lika rutor',rader:[{h:1,c:[1,1]},{h:1,c:[1,1]},{h:1,c:[1,1]}]},
 {namn:'Sex rutor med bubblor',rader:[{h:1,c:[1,1]},{h:1,c:[1,1]},{h:1,c:[1,1]}],
  bubblor:[{t:'tal',r:0,k:0,x:.04,y:.05,w:.6,h:.3,sx:.4,sy:.52},{t:'tal',r:0,k:1,x:.36,y:.05,w:.6,h:.3,sx:.62,sy:.52},
           {t:'tanke',r:1,k:1,x:.4,y:.04,w:.55,h:.34,sx:.36,sy:.56},{t:'tal',r:2,k:0,x:.04,y:.05,w:.6,h:.3,sx:.5,sy:.55},
           {t:'text',r:1,k:0,x:0,y:0,w:.6,h:.16,sx:.4,sy:.27},{t:'tal',r:2,k:1,x:.36,y:.05,w:.6,h:.3,sx:.5,sy:.55}]},
 {namn:'Tre stora rutor',titel:true,rader:[{h:1,c:[1]},{h:1,c:[1]},{h:1,c:[1]}]},
 {namn:'Stor bild och små rutor',rader:[{h:1.7,c:[1]},{h:1,c:[1,1,1]},{h:1,c:[1.3,1]}],
  bubblor:[{t:'tal',r:0,k:0,x:.04,y:.06,w:.32,h:.22,sx:.3,sy:.45},{t:'text',r:1,k:0,x:0,y:0,w:.75,h:.17,sx:.45,sy:.28}]},
 {namn:'Åtta rutor',rader:[{h:1,c:[1,1]},{h:1,c:[1,1]},{h:1,c:[1,1]},{h:1,c:[1,1]}]},
 {namn:'Seriestrippar',rader:[{h:1,c:[1,1,1]},{h:1,c:[1,1,1]},{h:1,c:[1,1,1]},{h:1,c:[1,1,1]}],strippar:true},
 {namn:'Hög ruta vid sidan',rader:[{h:1,c:[1.15,1],rs:[0]},{h:1,c:[1.15,1],rs:[0]},{h:1,c:[1.15,1],rs:[0]},{h:1.2,c:[1]}],hog:true,
  bubblor:[{t:'tanke',r:0,k:1,x:.3,y:.05,w:.6,h:.55,sx:.3,sy:.86},{t:'tal',r:3,k:0,x:.62,y:.06,w:.33,h:.32,sx:.7,sy:.66}]},
 {namn:'Titel och fem rutor',titel:true,rader:[{h:1,c:[1.4,1]},{h:1.15,c:[1]},{h:1,c:[1,1.4]}],
  bubblor:[{t:'tal',r:0,k:0,x:.05,y:.06,w:.45,h:.3,sx:.4,sy:.55},{t:'tanke',r:1,k:0,x:.62,y:.05,w:.3,h:.36,sx:.55,sy:.6},{t:'tal',r:2,k:1,x:.5,y:.06,w:.45,h:.3,sx:.65,sy:.55}]}
,
 // ---- fler sidor (18 nov 2026, lärarens önskan "Fler") ----
 {namn:'Fyra rutor med bubblor',rader:[{h:1,c:[1,1]},{h:1,c:[1,1]}],
  bubblor:[{t:'tal',r:0,k:0,x:.05,y:.05,w:.6,h:.24,sx:.45,sy:.45},{t:'tanke',r:0,k:1,x:.42,y:.04,w:.52,h:.3,sx:.4,sy:.55},
           {t:'text',r:1,k:0,x:0,y:0,w:.62,h:.12,sx:.4,sy:.2},{t:'tal',r:1,k:1,x:.36,y:.05,w:.6,h:.24,sx:.55,sy:.45}]},
 {namn:'Nio rutor',rader:[{h:1,c:[1,1,1]},{h:1,c:[1,1,1]},{h:1,c:[1,1,1]}]},
 {namn:'Rita och skriv, sex rutor',rader:[{h:1,c:[1,1]},{h:1,c:[1,1]},{h:1,c:[1,1]}],skriv:3},
 {namn:'Rita och skriv, fyra rutor',titel:true,rader:[{h:1,c:[1,1]},{h:1,c:[1,1]}],skriv:4},
 {namn:'Seriestrippar med bubblor',strippar:true,rader:[{h:1,c:[1,1,1]},{h:1,c:[1,1,1]},{h:1,c:[1,1,1]},{h:1,c:[1,1,1]}],
  bubblor:[{t:'tal',r:0,k:0,x:.05,y:.05,w:.75,h:.3,sx:.45,sy:.55},{t:'tal',r:0,k:2,x:.2,y:.05,w:.75,h:.3,sx:.6,sy:.55},
           {t:'tanke',r:1,k:1,x:.15,y:.04,w:.7,h:.4,sx:.4,sy:.68},{t:'text',r:2,k:0,x:0,y:0,w:.85,h:.16,sx:.5,sy:.28},
           {t:'tal',r:3,k:1,x:.2,y:.05,w:.75,h:.3,sx:.5,sy:.55}]},
 {namn:'Två stora rutor',rader:[{h:1,c:[1]},{h:1,c:[1]}],
  bubblor:[{t:'tal',r:0,k:0,x:.04,y:.05,w:.36,h:.24,sx:.32,sy:.48},{t:'tanke',r:1,k:0,x:.66,y:.05,w:.28,h:.3,sx:.6,sy:.55}]},
 {namn:'Actionsida',band:[{top:[0,0],bot:[82,-.0815],cut:[[112,96]]},{top:[87,-.0815],bot:[150,.09],cut:[]},{top:[155,.09],bot:[260,0],cut:[[62,50],[124,134]]}],
  bubblor:[{t:'tal',r:0,k:1,x:.3,y:.06,w:.62,h:.3,sx:.45,sy:.6},{t:'tanke',r:2,k:1,x:.2,y:.09,w:.62,h:.3,sx:.4,sy:.5}]},
 {namn:'Blandade rutor',rader:[{h:1,c:[1,1.8]},{h:1,c:[1.8,1]},{h:1,c:[1,1,1]},{h:1,c:[1]}],
  bubblor:[{t:'tal',r:0,k:1,x:.55,y:.06,w:.4,h:.3,sx:.6,sy:.58},{t:'tanke',r:1,k:0,x:.04,y:.05,w:.32,h:.4,sx:.4,sy:.7},{t:'tal',r:3,k:0,x:.04,y:.06,w:.3,h:.3,sx:.3,sy:.6}]},
 {namn:'Hög ruta till höger',hog:'h',rader:[{h:1,c:[1,1.15]},{h:1,c:[1,1.15]},{h:1,c:[1,1.15]},{h:1.2,c:[1]}],
  bubblor:[{t:'tal',r:0,k:0,x:.08,y:.06,w:.84,h:.34,sx:.5,sy:.7},{t:'tanke',r:0,k:1,x:.45,y:.03,w:.5,h:.22,sx:.4,sy:.38},{t:'text',r:3,k:0,x:0,y:0,w:.4,h:.17,sx:.3,sy:.3}]}
];

const f=n=>+n.toFixed(2);
function rutor(S){
  let y=TOP;const bot=H-M,bredd=W-2*M,R=[];
  if(S.band){// actionsida: band med sneda kanter, x och y i mm inne i marginalen; linjer a+b*x
    const L=(l,x)=>l[0]+l[1]*x;
    return S.band.map(B=>{const ks=[[-G/2,-G/2],...B.cut,[bredd+G/2,bredd+G/2]];const out=[];
      for(let i=0;i<ks.length-1;i++){const lt=ks[i][0]+G/2,lb=ks[i][1]+G/2,rt=ks[i+1][0]-G/2,rb=ks[i+1][1]-G/2;
        const pts=[[lt,L(B.top,lt)],[rt,L(B.top,rt)],[rb,L(B.bot,rb)],[lb,L(B.bot,lb)]].map(([x,yy])=>[x+M,yy+TOP]);
        const xs=pts.map(q=>q[0]),ys=pts.map(q=>q[1]);out.push({pts,x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)});}
      return out;});}
  if(S.omslag){R.titel={x:M,y,w:bredd,h:40};R.av=y+40+12;y+=40+20;}
  if(S.titel){R.titel={x:M,y,w:bredd,h:24};y+=24+G;}
  const hs=S.rader.reduce((s,r)=>s+r.h,0),tot=bot-y-G*(S.rader.length-1)-(S.strippar?G*.6*(S.rader.length-1):0);
  S.rader.forEach((r,i)=>{const rh=tot*r.h/hs,cs=r.c.reduce((a,b)=>a+b,0),cw=bredd-G*(r.c.length-1);let x=M;
    R[i]=r.c.map(c=>{const w=cw*c/cs,p={x,y,w,h:rh};x+=w+G;return p;});y+=rh+G+(S.strippar?G*.6:0);});
  if(S.hog){// en kolumns tre översta rutor slås ihop till en hög ruta (vänster, eller höger med hog:'h')
    const k=S.hog==='h'?1:0,a=R[0][k],c=R[2][k];R[0][k]={x:a.x,y:a.y,w:a.w,h:c.y+c.h-a.y};R[1][k]=null;R[2][k]=null;}
  return R;
}
function ellips(cx,cy,rx,ry){return `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}"/>`;}
function bubbla(b,p){
  const x=p.x+b.x*p.w,y=p.y+b.y*p.h,w=b.w*p.w,h=b.h*p.h,sx=p.x+b.sx*p.w,sy=p.y+b.sy*p.h;
  let form='';
  if(b.t==='tal'){const cx=x+w/2,cy=y+h/2,d=Math.sign(sx-cx)||1,bx=cx+d*w*.12;
    form=ellips(cx,cy,w/2,h/2)+`<path d="M${f(bx-d*w*.09)} ${f(cy+h*.2)} L${f(sx)} ${f(sy)} L${f(bx+d*w*.06)} ${f(cy+h*.2)}Z"/>`;}
  if(b.t==='text'){const ty=y+h,bx=Math.min(Math.max(sx,x+6),x+w-6);
    form=`<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}"/><path d="M${f(bx-3.5)} ${f(ty-2)} L${f(sx)} ${f(sy)} L${f(bx+3.5)} ${f(ty-2)}Z"/>`;}
  if(b.t==='tanke'){const cx=x+w/2,cy=y+h*.42,rx=w/2,ry=h*.42,n=9;let c='';
    for(let i=0;i<n;i++){const v=i/n*2*Math.PI,r=Math.min(rx,ry)*(i%2?.4:.47);c+=`<circle cx="${f(cx+Math.cos(v)*(rx-r*.75))}" cy="${f(cy+Math.sin(v)*(ry-r*.75))}" r="${f(r)}"/>`;}
    c+=ellips(cx,cy,rx*.72,ry*.66);
    let dx=sx-cx,dy=sy-(cy+ry);const L=Math.hypot(dx,dy),max=13;if(L>max){dx*=max/L;dy*=max/L;}[[.3,2.1],[.62,1.5],[.92,1]].forEach(([t,r])=>{c+=`<circle cx="${f(cx+dx*t)}" cy="${f(cy+ry*.95+dy*t)}" r="${r}"/>`;});
    form=c;}
  // först konturen (tjockare), sedan samma former vita ovanpå: bara ytterkanten syns och rutans kant döljs
  return `<g fill="none" stroke="#111" stroke-width="${BW*2}" stroke-linejoin="round">${form}</g><g fill="#fff" stroke="none">${form}</g>`;
}
function sida(S){
  const R=rutor(S);let s='';
  const rect=p=>`<rect x="${f(p.x)}" y="${f(p.y)}" width="${f(p.w)}" height="${f(p.h)}"/>`;
  s+=`<text x="${M}" y="15.5" font-size="4.6" fill="#555" font-family="'Baloo 2', sans-serif" font-weight="700">Namn</text><line x1="${M+14}" y1="16" x2="${W/2+12}" y2="16" stroke="#999" stroke-width=".3"/>`;
  s+=`<g fill="#fff" stroke="#111" stroke-width="${LW}">`;
  if(R.titel)s+=rect(R.titel);
  R.forEach(r=>r.forEach(p=>{if(p)s+=p.pts?`<path d="M${p.pts.map(q=>f(q[0])+' '+f(q[1])).join(' L')}Z" stroke-linejoin="miter"/>`:rect(p);}));s+='</g>';
  if(R.av)s+=`<text x="${M}" y="${f(R.av)}" font-size="5.5" fill="#555" font-family="'Baloo 2', sans-serif" font-weight="700">av</text><line x1="${M+9}" y1="${f(R.av+.5)}" x2="${W-M}" y2="${f(R.av+.5)}" stroke="#999" stroke-width=".3"/>`;
  if(S.skriv){const RAD=8.5;// skrivrader längst ner i varje ruta
    R.forEach(r=>r.forEach(p=>{if(!p)return;const y0=p.y+p.h-S.skriv*RAD-1.5;s+=`<line x1="${f(p.x)}" y1="${f(y0)}" x2="${f(p.x+p.w)}" y2="${f(y0)}" stroke="#111" stroke-width="${LW}"/>`;
      for(let i=1;i<=S.skriv;i++)s+=`<line x1="${f(p.x+4)}" y1="${f(y0+i*RAD)}" x2="${f(p.x+p.w-4)}" y2="${f(y0+i*RAD)}" stroke="#aaa" stroke-width=".3"/>`;}));}
  (S.bubblor||[]).forEach(b=>{const p=R[b.r][b.k];if(p)s+=bubbla(b,p);});
  return `<section><svg viewBox="0 0 ${W} ${H}" width="210mm" height="297mm" xmlns="http://www.w3.org/2000/svg">${s}</svg></section>`;
}
const FONT=`@font-face{font-family:"Baloo 2";font-weight:400 800;src:url(data:font/woff2;base64,${require('fs').readFileSync(path.join(__dirname,'..','fonts','baloo-2-latin-500-1.woff2')).toString('base64')}) format("woff2")}`;
const html=`<!doctype html><meta charset="utf-8">
<style>${FONT}@page{size:A4;margin:0}html,body{margin:0}section{width:210mm;height:297mm;page-break-after:always;overflow:hidden}section:last-child{page-break-after:auto}svg{display:block}</style>${SIDOR.map(sida).join('')}`;
const fs=require('fs'),os=require('os'),tmp=path.join(os.tmpdir(),'seriesidor.html');fs.writeFileSync(tmp,html);
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+tmp,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.load('700 10px "Baloo 2"'));
  await p.pdf({path:path.join(UT,'seriesidor.pdf'),format:'A4',printBackground:true,margin:{top:0,bottom:0,left:0,right:0}});
  // förhandsbild: sida 2 (med bubblor), samma storlek som de andra förhandsbilderna
  const q=await b.newPage({viewport:{width:351,height:497},deviceScaleFactor:2});
  await q.setContent(`<!doctype html><style>${FONT}html,body{margin:0}svg{display:block;width:351px;height:497px}</style>`+sida(SIDOR[2]).replace(/width="210mm" height="297mm"/,''));await q.evaluate(()=>document.fonts.load('700 10px "Baloo 2"'));
  await q.screenshot({path:path.join(UT,'seriesidor.png')});
  if(process.argv[2]){for(let i=0;i<SIDOR.length;i++){await q.setContent(`<!doctype html><style>${FONT}html,body{margin:0}svg{display:block;width:351px;height:497px}</style>`+sida(SIDOR[i]).replace(/width="210mm" height="297mm"/,''));await q.evaluate(()=>document.fonts.load('700 10px "Baloo 2"'));await q.screenshot({path:path.join(process.argv[2],`serie-${i+1}.png`)});}}
  await b.close();console.log(SIDOR.length,'sidor');})();
