/* Handstil: bokstävernas penndrag (MPGlyfer). Egna ritningar, inget kopierat.
   Koordinater: överlinje y=0, mittlinje y=50, baslinje y=100, nedre linje y=150. Ringar och prickar över bokstaven har negativt y.
   Ett penndrag är en lista med punkter [x,y], eller {dot:[x,y]} för en prick. Stilarna: "tryck" (tryckbokstäver) och "skrift" (skrivstil, lutande med utgångssvep).
   MPGlyfer.get(stil,tecken) ger penndragen, MPGlyfer.GROUPS grupperna, MPGlyfer.PRE förövningarna. */
window.MPGlyfer=(()=>{
const D=Math.PI/180;
const arc=(cx,cy,rx,ry,a0,a1)=>{const n=Math.max(6,Math.ceil(Math.abs(a1-a0)/9)),p=[];for(let i=0;i<=n;i++){const a=(a0+(a1-a0)*i/n)*D;p.push([cx+rx*Math.cos(a),cy+ry*Math.sin(a)]);}return p;};
const L=(...c)=>{const p=[];for(let i=0;i<c.length;i+=2)p.push([c[i],c[i+1]]);return p;};
const J=(...parts)=>{const o=[];parts.forEach(pt=>pt.forEach((q,i)=>{const l=o[o.length-1];if(i===0&&l&&Math.hypot(l[0]-q[0],l[1]-q[1])<2)return;o.push(q);}));return o;};
const dot=(x,y)=>({dot:[x,y]});
const S=(w,h,y0)=>J(arc(w/2,y0+h*.25,w*.47,h*.25,-30,-270),arc(w/2,y0+h*.75,w*.5,h*.25,-90,150));
const bowl=(x,y0)=>J(L(x,y0,x+24,y0),arc(x+24,y0+26,26,26,-90,90),L(x+24,y0+52,x,y0+52));

/* ---------- tryckbokstäver, stora ---------- */
const CAP={
A:()=>[L(35,0,0,100),L(35,0,70,100),L(11,68,59,68)],
B:()=>[L(0,0,0,100),J(L(0,0,28,0),arc(28,25,26,25,-90,90),L(28,50,0,50)),J(L(0,50,30,50),arc(30,75,28,25,-90,90),L(30,100,0,100))],
C:()=>[arc(34,50,34,50,-40,-320)],
D:()=>[L(0,0,0,100),J(L(0,0,26,0),arc(26,50,36,50,-90,90),L(26,100,0,100))],
E:()=>[L(0,0,0,100),L(0,0,48,0),L(0,50,40,50),L(0,100,48,100)],
F:()=>[L(0,0,0,100),L(0,0,48,0),L(0,50,40,50)],
G:()=>[J(arc(34,50,34,50,-40,-360),L(68,50,38,50))],
H:()=>[L(0,0,0,100),L(60,0,60,100),L(0,50,60,50)],
I:()=>[L(0,0,0,100)],
J:()=>[J(L(36,0,36,72),arc(18,72,18,28,0,170))],
K:()=>[L(0,0,0,100),L(56,0,2,54),L(18,38,58,100)],
L:()=>[L(0,0,0,100),L(0,100,44,100)],
M:()=>[L(0,0,0,100),L(0,0,42,70,84,0),L(84,0,84,100)],
N:()=>[L(0,0,0,100),L(0,0,62,100),L(62,100,62,0)],
O:()=>[arc(35,50,35,50,-90,-450)],
P:()=>[L(0,0,0,100),bowl(0,0)],
Q:()=>[arc(35,50,35,50,-90,-450),L(46,72,70,102)],
R:()=>[L(0,0,0,100),bowl(0,0),L(22,52,56,100)],
S:()=>[S(52,100,0)],
T:()=>[L(0,0,64,0),L(32,0,32,100)],
U:()=>[J(L(0,0,0,64),arc(30,64,30,36,180,0),L(60,64,60,0))],
V:()=>[L(0,0,32,100,64,0)],
W:()=>[L(0,0,23,100,46,30,69,100,92,0)],
X:()=>[L(0,0,60,100),L(60,0,0,100)],
Y:()=>[L(0,0,30,52),L(60,0,30,52,30,100)],
Z:()=>[L(0,0,54,0,0,100,54,100)],
};
CAP["Å"]=()=>[...CAP.A(),arc(35,-20,11,11,-90,-450)];
CAP["Ä"]=()=>[...CAP.A(),dot(22,-16),dot(48,-16)];
CAP["Ö"]=()=>[...CAP.O(),dot(24,-16),dot(46,-16)];

/* ---------- tryckbokstäver, små ---------- */
const LOW={
a:()=>[arc(22,75,22,25,-45,-405),L(44,50,44,100)],
b:()=>[L(0,0,0,100),arc(22,75,22,25,-180,180)],
c:()=>[arc(24,75,24,25,-40,-320)],
d:()=>[arc(22,75,22,25,-45,-405),L(44,0,44,100)],
e:()=>[J(L(0,75,44,75),arc(22,75,22,25,0,-320))],
f:()=>[J(arc(34,22,12,22,-40,-180),L(22,22,22,100)),L(6,50,38,50)],
g:()=>[arc(22,75,22,25,-45,-405),J(L(44,50,44,125),arc(22,125,22,25,0,150))],
h:()=>[L(0,0,0,100),J(arc(22,72,22,22,-180,0),L(44,72,44,100))],
i:()=>[L(4,50,4,100),dot(4,28)],
j:()=>[J(L(4,50,4,125),arc(-8,125,12,25,0,150)),dot(4,28)],
k:()=>[L(0,0,0,100),L(38,50,2,76),L(14,66,40,100)],
l:()=>[L(0,0,0,100)],
m:()=>[L(0,50,0,100),J(arc(17,72,17,22,-180,0),L(34,72,34,100)),J(arc(51,72,17,22,-180,0),L(68,72,68,100))],
n:()=>[L(0,50,0,100),J(arc(20,72,20,22,-180,0),L(40,72,40,100))],
o:()=>[arc(22,75,22,25,-90,-450)],
p:()=>[L(0,50,0,150),arc(22,75,22,25,-180,180)],
q:()=>[arc(22,75,22,25,-45,-405),L(44,50,44,150)],
r:()=>[L(0,50,0,100),arc(18,72,18,22,-180,-50)],
s:()=>[S(34,50,50)],
t:()=>[J(L(12,20,12,86),arc(28,86,16,14,180,60)),L(0,50,32,50)],
u:()=>[J(L(0,50,0,78),arc(20,78,20,22,180,0)),L(40,50,40,100)],
v:()=>[L(0,50,22,100,44,50)],
w:()=>[L(0,50,14,100,30,64,46,100,60,50)],
x:()=>[L(0,50,40,100),L(40,50,0,100)],
y:()=>[L(0,50,20,100),L(40,50,10,150)],
z:()=>[L(0,50,38,50,0,100,38,100)],
};
LOW["å"]=()=>[...LOW.a(),arc(22,32,9,9,-90,-450)];
LOW["ä"]=()=>[...LOW.a(),dot(12,36),dot(32,36)];
LOW["ö"]=()=>[...LOW.o(),dot(12,36),dot(32,36)];

/* ---------- skrivstil: lutande, med utgångssvep och öglor (första version, granska) ---------- */
const TAIL=x=>[[x,96],[x+6,100],[x+16,97]];
const CUR={
a:()=>[arc(22,75,20,25,-30,-390),J(L(42,52,42,96),TAIL(42))],
b:()=>[L(-6,14,0,2,0,100),arc(21,75,21,25,-180,180)],
c:()=>[arc(21,75,21,25,-40,-320)],
d:()=>[arc(22,75,20,25,-30,-390),J(L(42,0,42,96),TAIL(42))],
e:()=>[J(L(2,76,40,72),arc(21,75,21,25,-8,-318))],
f:()=>[J(arc(34,22,12,22,-40,-180),L(22,22,22,150)),L(6,50,38,50)],
g:()=>[arc(22,75,20,25,-30,-390),J(L(42,52,42,125),arc(24,125,18,25,0,160))],
h:()=>[L(-6,14,0,2,0,100),J(arc(21,72,21,22,-180,0),L(42,72,42,96),TAIL(42))],
i:()=>[J(L(2,50,2,96),TAIL(2)),dot(4,30)],
j:()=>[J(L(4,50,4,125),arc(-8,125,12,25,0,150)),dot(4,30)],
k:()=>[L(-6,14,0,2,0,100),L(38,50,2,76,40,100)],
l:()=>[J(L(-4,98,8,50,16,10),arc(8,10,8,10,0,-180),L(0,10,0,96),TAIL(0))],
m:()=>[L(2,52,2,100),J(arc(19,72,17,22,-180,0),L(36,72,36,100)),J(arc(53,72,17,22,-180,0),L(70,72,70,96),TAIL(70))],
n:()=>[L(2,52,2,100),J(arc(21,72,19,22,-180,0),L(40,72,40,96),TAIL(40))],
o:()=>[arc(22,75,22,25,-90,-450)],
p:()=>[L(0,50,0,150),arc(21,75,21,25,-180,180)],
q:()=>[arc(22,75,20,25,-30,-390),L(42,50,42,150)],
r:()=>[L(2,52,2,100),arc(18,72,16,22,-180,-50)],
s:()=>[S(34,50,50)],
t:()=>[J(L(12,20,12,86),arc(28,86,16,14,180,60)),L(0,50,32,50)],
u:()=>[J(L(0,50,0,78),arc(20,78,20,22,180,0)),J(L(40,50,40,96),TAIL(40))],
v:()=>[L(0,50,22,100,44,50)],
w:()=>[L(0,50,14,100,30,64,46,100,60,50)],
x:()=>[L(0,50,40,100),L(40,50,0,100)],
y:()=>[L(0,50,20,100),L(40,50,10,150)],
z:()=>[L(0,50,38,50,0,100,38,100)],
};
CUR["å"]=()=>[...CUR.a(),arc(22,32,9,9,-90,-450)];
CUR["ä"]=()=>[...CUR.a(),dot(12,36),dot(32,36)];
CUR["ö"]=()=>[...CUR.o(),dot(12,36),dot(32,36)];
const shear=(strokes,k)=>strokes.map(s=>s.dot?{dot:[s.dot[0]+(100-s.dot[1])*k,s.dot[1]]}:s.map(p=>[p[0]+(100-p[1])*k,p[1]]));

/* ---------- siffror ---------- */
const rot=(strokes)=>strokes.map(st=>st.dot?{dot:[50-st.dot[0],100-st.dot[1]]}:st.map(p=>[50-p[0],100-p[1]]).reverse());
const NUM={
"0":()=>[arc(26,50,26,50,-90,-450)],
"1":()=>[L(8,18,24,0,24,100)],
"2":()=>[J(arc(25,28,23,28,-170,25),L(46,42,2,100,50,100))],
"3":()=>[J(arc(24,25,22,25,-150,90),arc(24,75,26,25,-90,150))],
"4":()=>[L(38,0,0,66,50,66),L(38,26,38,100)],
"5":()=>[J(L(44,0,6,0,3,46),arc(24,72,24,28,-125,150))],
"6":()=>[J(arc(52,52,50,52,-100,-180),L(2,52,2,76),arc(25,76,23,24,-180,180))],
"7":()=>[L(0,0,50,0,16,100)],
"8":()=>[J(arc(25,26,21,26,-90,-270),arc(25,77,25,25,-90,270),arc(25,26,21,26,90,-90))],
"9":()=>rot(NUM["6"]()),
};

function get(stil,ch){
  if(/\d/.test(ch))return stil==="skrift"?shear(NUM[ch](),.16):NUM[ch]();
  const up=ch!==ch.toLowerCase()||ch==="Å"||ch==="Ä"||ch==="Ö";
  if(stil==="skrift")return up?shear(CAP[ch](),.16):shear(CUR[ch](),.16);
  return up?CAP[ch]():LOW[ch]();
}

/* ---------- förövningar (samma för båda stilarna) ---------- */
const PRE={
p1:()=>[L(0,0,0,100)],
p2:()=>[L(0,50,80,50)],
p3:()=>[L(0,0,40,100)],
p4:()=>[L(40,0,0,100)],
p5:()=>[arc(35,50,35,50,-90,-450)],
p6:()=>[J(arc(22,100,22,45,-180,0),arc(66,100,22,45,-180,0))],
p7:()=>[Array.from({length:61},(_,i)=>[i*2,75-24*Math.sin(i/60*4*Math.PI)])],
};
const PRENAMN=[["p1","Lodrät linje"],["p2","Vågrät linje"],["p3","Snett neråt"],["p4","Snett uppåt"],["p5","Cirkel"],["p6","Bågar"],["p7","Våg"]];

const par=(...t)=>t.map(c=>({id:c+c.toLowerCase(),u:c,l:c.toLowerCase()}));
const GROUPS=[
 {id:"g0",n:"Förövningar",sub:"Linjer, cirklar och vågor innan bokstäverna",pre:true,items:PRENAMN.map(([id,label])=>({id,label,pre:true}))},
 {id:"g1",n:"Raka streck",sub:"Bokstäver som mest är streck",items:par("I","L","T","H","E","F")},
 {id:"g2",n:"Runda bokstäver",sub:"Bokstäver med runda former",items:par("O","C","S","G","Q","A","D")},
 {id:"g3",n:"Bågar och hakar",sub:"Bokstäver med bågar, bukter och ben",items:par("B","P","R","N","M","U","J")},
 {id:"g4",n:"Snedstreck",sub:"Bokstäver med sneda streck",items:par("V","W","X","Y","Z","K")},
 {id:"g5",n:"Ringar och prickar",sub:"Å, Ä och Ö",items:par("Å","Ä","Ö")},
 {id:"g6",n:"Siffror",sub:"0 till 9",items:"0123456789".split("").map(c=>({id:"n"+c,one:true,ch:c}))}
];
/* ---------- gemensamt för sidan och utskriftsbladen: punkter med jämna avstånd, ord i rad ---------- */
const dst=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
function resample(pts,step){const out=[pts[0]];let carry=0;
  for(let i=1;i<pts.length;i++){let a=pts[i-1],b=pts[i],d=dst(a,b);if(!d)continue;let t=step-carry;
    while(t<=d){out.push([a[0]+(b[0]-a[0])*t/d,a[1]+(b[1]-a[1])*t/d]);t+=step;}carry=d-(t-step);}
  const l=out[out.length-1],e=pts[pts.length-1];if(dst(l,e)>.8)out.push(e.slice());return out;}
/* ett tecken: {S:[{pts}|{dot}], minx, maxx, w} med x från 0 */
function prepare(strokes,step){const S=[];let mn=1e9,mx=-1e9;
  const acc=p=>{mn=Math.min(mn,p[0]);mx=Math.max(mx,p[0]);};
  strokes.forEach(s=>{if(s.dot){S.push({dot:s.dot.slice()});acc(s.dot);}else{const pts=resample(s,step||2.5);pts.forEach(acc);S.push({pts});}});
  S.forEach(s=>{if(s.dot)s.dot[0]-=mn;else s.pts.forEach(p=>p[0]-=mn);});return{S,w:mx-mn};}
/* ett ord: bokstäverna efter varandra, x från 0 */
function word(text,stil,step){const out=[];let cur=0;const GAP=16;
  [...text].forEach(c=>{if(c===" "){cur+=34;return;}const g=prepare(get(stil,c),step);
    g.S.forEach(st=>{if(st.dot)st.dot[0]+=cur;else st.pts.forEach(p=>p[0]+=cur);out.push(st);});cur+=g.w+GAP;});
  return{S:out,w:Math.max(0,cur-GAP)};}
return{get,GROUPS,PRE,CAP,LOW,CUR,prepare,word,resample};
})();
