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
B:()=>[L(0,0,0,100),J(L(0,0,28,0),arc(28,25,26,25,-90,90),L(28,50,0,50,30,50),arc(30,75,28,25,-90,90),L(30,100,0,100))],
C:()=>[arc(34,50,34,50,-40,-320)],
D:()=>[L(0,0,0,100),J(L(0,0,26,0),arc(26,50,36,50,-90,90),L(26,100,0,100))],
E:()=>[J(L(0,0,0,100),L(0,100,48,100)),L(0,0,48,0),L(0,50,40,50)],   // som ett L, sedan övre och mittre strecket
F:()=>[L(0,0,0,100),L(0,0,48,0),L(0,50,40,50)],
G:()=>[J(arc(34,50,34,50,-40,-360),L(68,50,38,50))],
H:()=>[L(0,0,0,100),L(60,0,60,100),L(0,50,60,50)],
I:()=>[L(0,0,0,100)],
J:()=>[J(L(36,0,36,72),arc(18,72,18,28,0,170))],
K:()=>[L(0,0,0,100),L(56,0,2,52,58,100)],   // två rörelser: stammen, sedan armen och benet i ett drag
L:()=>[J(L(0,0,0,100),L(0,100,44,100))],
M:()=>[L(0,100,0,0,42,70,84,0,84,100)],   // nerifrån, hela i ett svep
N:()=>[J(L(0,0,0,100),L(0,100,0,0),L(0,0,62,100),L(62,100,62,0))],
O:()=>[arc(35,50,35,50,-90,-450)],
P:()=>[L(0,0,0,100),bowl(0,0)],
Q:()=>[arc(35,50,35,50,-90,-450),L(46,72,70,102)],
R:()=>[L(0,0,0,100),J(bowl(0,0),L(0,52,22,52,56,100))],
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
a:()=>[J(arc(22,75,22,25,-35,-395),L(44,66,44,100))],
b:()=>[J(L(0,0,0,100),L(0,100,0,75),arc(22,75,22,25,-180,180))],
c:()=>[arc(24,75,24,25,-40,-320)],
d:()=>[J(arc(22,75,22,25,-35,-395),L(44,66,44,0),L(44,0,44,100))],
e:()=>[J(L(0,75,44,75),arc(22,75,22,25,0,-320))],
f:()=>[J(arc(34,22,12,22,-40,-180),L(22,22,22,100)),L(6,50,38,50)],
g:()=>[J(arc(22,75,22,25,-35,-395),L(44,66,44,125),arc(22,125,22,25,0,150))],
h:()=>[J(L(0,0,0,100),L(0,100,0,72),arc(22,72,22,22,-180,0),L(44,72,44,100))],
i:()=>[L(4,50,4,100),dot(4,28)],
j:()=>[J(L(4,50,4,125),arc(-8,125,12,25,0,150)),dot(4,28)],
k:()=>[L(0,0,0,100),L(38,50,2,76,40,100)],
l:()=>[L(0,0,0,100)],
m:()=>[J(L(0,50,0,100),L(0,100,0,72),arc(17,72,17,22,-180,0),L(34,72,34,100),L(34,100,34,72),arc(51,72,17,22,-180,0),L(68,72,68,100))],
n:()=>[J(L(0,50,0,100),L(0,100,0,72),arc(20,72,20,22,-180,0),L(40,72,40,100))],
o:()=>[arc(22,75,22,25,-90,-450)],
p:()=>[J(L(0,50,0,150),L(0,150,0,75),arc(22,75,22,25,-180,180))],
q:()=>[J(arc(22,75,22,25,-35,-395),L(44,66,44,150))],
r:()=>[J(L(0,50,0,100),L(0,100,0,72),arc(18,72,18,22,-180,-50))],
s:()=>[S(34,50,50)],
t:()=>[J(L(12,20,12,86),arc(28,86,16,14,180,60)),L(0,50,32,50)],
u:()=>[J(L(0,50,0,78),arc(20,78,20,22,180,0),L(40,78,40,50),L(40,50,40,100))],
v:()=>[L(0,50,22,100,44,50)],
w:()=>[L(0,50,14,100,30,64,46,100,60,50)],
x:()=>[L(0,50,40,100),L(40,50,0,100)],
y:()=>[L(0,50,20,100),L(40,50,10,150)],
z:()=>[L(0,50,38,50,0,100,38,100)],
};
LOW["å"]=()=>[...LOW.a(),arc(22,32,9,9,-90,-450)];
LOW["ä"]=()=>[...LOW.a(),dot(12,36),dot(32,36)];
LOW["ö"]=()=>[...LOW.o(),dot(12,36),dot(32,36)];

/* ---------- skrivstil: sammanhängande. Varje liten bokstav är ETT penndrag med ingångssvep (från baslinjen eller mittlinjen)
   och utgångssvep, så att bokstäverna hänger ihop i ord; prickar, tvärstreck och ringar läggs till efteråt (pennan lyfts).
   Funktionen får höjden där föregående bokstav slutade (100 = baslinjen, ~52 = uppe vid mittlinjen) och ritar ingången därifrån.
   Första versionen, ska granskas av läraren. ---------- */
const bez=(a,b,c,n)=>{n=n||7;const p=[];for(let i=0;i<=n;i++){const t=i/n,u=1-t;p.push([u*u*a[0]+2*u*t*b[0]+t*t*c[0],u*u*a[1]+2*u*t*b[1]+t*t*c[1]]);}return p;};
const EN=(tx,ty,fy)=>{fy=fy||100;return fy>=90?bez([-12,100],[tx*.55-4,98],[tx,ty]):bez([-12,fy],[(tx-12)/2,fy+2],[tx,ty]);};
const TL=(x,y)=>bez([x,y],[x+7,y+5],[x+17,y+1]);
const ASC=(fy)=>J(EN(10,8,fy),arc(5,8,5,8,0,-180));            // ingång upp till en smal ögla överst (b d f h k l)
const CURB={
a:fy=>({b:J(EN(32,54,fy),arc(22,75,20,25,-62,-392),L(41,63,41,95),TL(41,95)),x:[]}),
b:fy=>({b:J(ASC(fy),L(0,8,0,94),bez([0,94],[3,101],[1.3,83.5]),arc(22,75,22,25,160,450),TL(22,100)),x:[]}),
c:fy=>({b:J(EN(36,58,fy),arc(21,75,21,25,-45,-320),TL(37,92)),x:[]}),
d:fy=>({b:J(EN(37,59,fy),arc(22,75,20,25,-30,-360),L(42,75,48,8),arc(45,8,3,8,0,-180),L(42,8,42,95),TL(42,95)),x:[]}),   // runda ccw, rakt upp till taket utan stopp, ner längs samma sida
e:fy=>({b:J(EN(36,73,fy),arc(21,75,21,25,-8,-318),TL(38,92)),x:[]}),
f:fy=>({b:J(ASC(fy),L(0,8,2,70,5,118),bez([5,118],[5,146],[-8,148]),bez([-8,148],[-18,148],[-12,130]),bez([-12,130],[-2,112],[14,102]),L(14,102,34,98)),x:[L(-12,52,22,52)]}),
g:fy=>({b:J(EN(32,54,fy),arc(22,75,20,25,-62,-392),L(41,63,41,122),arc(25,122,16,26,0,150),L(11,135,20,112,40,100,52,98)),x:[]}),
h:fy=>({b:J(ASC(fy),L(0,8,0,100),L(0,100,3,74),arc(21,72,18,22,-180,0),L(39,72,39,95),TL(39,95)),x:[]}),
i:fy=>({b:J(EN(3,54,fy),L(3,54,3,95),TL(3,95)),x:[dot(6,30)]}),
j:fy=>({b:J(EN(4,54,fy),L(4,54,4,122),arc(-6,122,10,26,0,150),L(-14,135,-8,112,10,100,24,98)),x:[dot(7,30)]}),
k:fy=>({b:J(ASC(fy),L(0,8,0,100),L(0,100,2,80,34,52,6,76,16,80,38,98),TL(38,98)),x:[]}),
l:fy=>({b:J(ASC(fy),L(0,8,0,95),TL(0,95)),x:[]}),
m:fy=>({b:J(EN(3,54,fy),L(3,54,3,100),L(3,100,6,74),arc(21,72,15,22,-180,0),L(36,72,36,100),L(36,100,39,74),arc(54,72,15,22,-180,0),L(69,72,69,95),TL(69,95)),x:[]}),
n:fy=>({b:J(EN(3,54,fy),L(3,54,3,100),L(3,100,6,74),arc(23,72,17,22,-180,0),L(40,72,40,95),TL(40,95)),x:[]}),
o:fy=>({b:J(EN(22,50,fy),arc(22,75,22,25,-90,-450),L(22,50,34,49,48,52)),x:[]}),
p:fy=>({b:J(EN(3,54,fy),L(3,54,3,150),L(3,150,6,100),arc(25,75,20,25,-180,95),TL(23,100)),x:[]}),
q:fy=>({b:J(EN(32,54,fy),arc(22,75,20,25,-62,-392),L(41,63,41,148),L(41,148,50,150,58,142)),x:[]}),
r:fy=>({b:J(EN(3,54,fy),L(3,54,3,100),L(3,100,6,70),arc(18,70,12,20,-180,-70),L(22,51,32,50,42,52)),x:[]}),
s:fy=>({b:J(EN(30,56,fy),arc(17,62.5,16,12.5,-35,-270),arc(17,87.5,17,12.5,-90,95),TL(18,99)),x:[]}),
t:fy=>({b:J(EN(10,20,fy),L(10,20,10,92),TL(10,92)),x:[L(-4,50,26,50)]}),
u:fy=>({b:J(EN(2,52,fy),L(2,52,2,78),arc(20,78,18,22,180,0),L(38,78,38,52),L(38,52,40,96),TL(40,96)),x:[]}),
v:fy=>({b:J(EN(2,52,fy),L(2,52,22,98,44,52),L(44,52,52,50,60,52)),x:[]}),
w:fy=>({b:J(EN(2,52,fy),L(2,52,14,98,30,64,46,98,60,52),L(60,52,68,50,76,52)),x:[]}),
x:fy=>({b:J(EN(2,52,fy),L(2,52,38,98),TL(38,98)),x:[L(38,52,2,98)]}),
y:fy=>({b:J(EN(2,52,fy),L(2,52,2,78),arc(20,78,18,22,180,0),L(38,78,38,52),L(38,52,36,122),arc(18,122,18,26,0,160),L(1,134,10,112,30,100,46,98)),x:[]}),
z:fy=>({b:J(EN(2,52,fy),L(2,52,36,52,8,94),bez([8,94],[34,102],[24,126]),bez([24,126],[16,140],[2,128]),bez([2,128],[-2,116],[14,104]),L(14,104,40,98)),x:[]}),
};
CURB["å"]=fy=>{const r=CURB.a(fy);r.x=[arc(22,32,9,9,-90,-450)];return r;};
CURB["ä"]=fy=>{const r=CURB.a(fy);r.x=[dot(12,36),dot(32,36)];return r;};
CURB["ö"]=fy=>{const r=CURB.o(fy);r.x=[dot(12,36),dot(32,36)];return r;};
/* ---------- skrivstil, stora bokstäver: rundade skrivformer efter lärarens förebild (första version) ---------- */
const CAPC={
A:()=>[J(bez([0,100],[14,40],[32,2],10),bez([32,2],[46,44],[58,100],10)),L(10,70,50,64)],
B:()=>[J(L(0,0,0,100),L(0,100,0,3),L(0,3,26,3),arc(26,27,24,24,-90,90),L(26,51,0,51,28,51),arc(28,76,28,24,-90,90),L(28,100,0,100))],
C:()=>[arc(36,50,36,50,-35,-325)],
D:()=>[J(L(0,0,0,100),L(0,100,0,4),arc(10,50,50,46,-90,90))],
E:()=>[J(arc(26,25,26,25,-35,-270),arc(28,75,30,25,-90,-330))],
F:()=>[J(bez([16,0],[12,50],[8,94]),bez([8,94],[4,106],[-8,100])),L(-4,4,40,0),L(0,50,32,48)],
G:()=>[J(arc(34,50,34,50,-35,-360),L(68,50,68,118),arc(50,118,18,22,0,160))],
H:()=>[L(2,0,0,100),L(50,0,48,100),bez([0,52],[24,44],[50,50])],
I:()=>[J(bez([14,0],[10,50],[6,92]),bez([6,92],[2,106],[-10,98])),L(-4,4,28,2)],
J:()=>[J(L(32,0,28,112),arc(12,112,16,24,0,170))],
K:()=>[L(0,0,0,100),L(56,0,2,52,58,100)],
L:()=>[J(bez([12,0],[8,50],[2,96]),bez([2,96],[18,106],[50,98]))],
M:()=>[L(0,100,0,0,42,70,84,0,84,100)],
N:()=>[L(0,100,0,0,62,100,62,0)],
O:()=>[arc(32,50,32,50,-90,-450)],
P:()=>[L(0,0,0,100),bowl(0,0)],
Q:()=>[arc(32,50,32,50,-90,-450),L(44,72,64,106)],
R:()=>[L(0,0,0,100),J(bowl(0,0),L(0,52,22,52,56,100))],
S:()=>[S(52,100,0)],
T:()=>[L(0,4,50,0),J(bez([26,0],[28,60],[22,94]),bez([22,94],[18,104],[8,100]))],
U:()=>[J(L(0,0,0,64),arc(30,64,30,36,180,0),L(60,64,60,0),L(60,0,60,100))],
V:()=>[L(0,0,32,100,64,0)],
W:()=>[L(0,0,23,100,46,30,69,100,92,0)],
X:()=>[L(0,0,60,100),L(60,0,0,100)],
Y:()=>[L(0,0,26,54),J(L(50,0,30,66,26,118),arc(10,118,16,24,0,160))],
Z:()=>[J(L(0,0,54,0,0,98),bez([0,98],[36,108],[56,98]))],
};
CAPC["Å"]=()=>[...CAPC.A(),arc(32,-20,11,11,-90,-450)];
CAPC["Ä"]=()=>[...CAPC.A(),dot(18,-16),dot(44,-16)];
CAPC["Ö"]=()=>[...CAPC.O(),dot(20,-16),dot(44,-16)];
const shear=(strokes,k)=>strokes.map(s=>s.dot?{dot:[s.dot[0]+(100-s.dot[1])*k,s.dot[1]]}:s.map(p=>[p[0]+(100-p[1])*k,p[1]]));

/* ---------- siffror ---------- */
const rot=(strokes)=>strokes.map(st=>st.dot?{dot:[50-st.dot[0],100-st.dot[1]]}:st.map(p=>[50-p[0],100-p[1]]).reverse());
const NUM={
"0":()=>[arc(26,50,26,50,-90,-450)],
"1":()=>[L(8,18,24,0,24,100)],
"2":()=>[J(arc(25,28,23,28,-170,25),L(46,42,2,100,50,100))],
"3":()=>[J(arc(24,25,22,25,-150,90),arc(24,75,26,25,-90,150))],
"4":()=>[L(0,0,0,60,50,60),L(38,0,38,100)],
"5":()=>[J(L(44,0,6,0,3,46),arc(24,72,24,28,-125,150))],
"6":()=>[J(arc(52,52,50,52,-100,-180),L(2,52,2,76),arc(25,76,23,24,180,-180))],   // fortsätter ner och runt (moturs), vänder inte vid magen
"7":()=>[L(0,0,50,0,16,100)],
"8":()=>[J(arc(25,26,21,26,-90,-270),arc(25,77,25,25,-90,270),arc(25,26,21,26,90,-90))],
"9":()=>[J(arc(25,24,23,24,-20,-380),L(46.6,15.8,48,26,48,100))],   // ring moturs, sedan ett rakt streck ner   // runt (moturs) från toppen, sedan svansen ner
};

function get(stil,ch){
  if(/\d/.test(ch))return stil==="skrift"?shear(NUM[ch](),.16):NUM[ch]();
  const up=ch!==ch.toLowerCase()||ch==="Å"||ch==="Ä"||ch==="Ö";
  if(stil==="skrift"){if(up)return shear(CAPC[ch](),.16);const r=CURB[ch](100);return shear([r.b,...r.x],.16);}
  return up?CAP[ch]():LOW[ch]();
}

/* ---------- förövningar (samma för båda stilarna) ---------- */
const PRE={
p1:()=>[L(0,0,0,100)],
p2:()=>[L(0,50,240,50)],
p3:()=>Array.from({length:6},(_,i)=>L(i*40,0,i*40+40,100)),
p4:()=>Array.from({length:6},(_,i)=>L(i*40+40,0,i*40,100)),
p5:()=>[arc(35,50,35,50,-90,-450)],
p6:()=>[J(...Array.from({length:6},(_,i)=>arc(22+i*44,100,22,45,-180,0)))],
p7:()=>[Array.from({length:151},(_,i)=>[i*2,75-24*Math.sin(i/150*10*Math.PI)])],
p8:()=>[L(...Array.from({length:15},(_,i)=>[i*22,i%2?10:90]).flat())],
p9:()=>[Array.from({length:150},(_,i)=>{const t=i/150*4*2*Math.PI;return[11*t-28*Math.sin(t),52-28*Math.cos(t)];})],
p10:()=>[J(...Array.from({length:5},(_,i)=>arc(25+i*50,30,25,55,180,0)))],
p11:()=>[Array.from({length:140},(_,i)=>{const t=i/140*3;const a=t*2*Math.PI,r=3+14*t;return[50+r*Math.cos(a),50+r*Math.sin(a)];})],
p12:()=>[L(0,10,70,90),L(70,10,0,90)],
p13:()=>[L(0,15,80,15,80,90,0,90,0,15)],
p14:()=>[L(35,5,0,95,70,95,35,5)],
p15:()=>Array.from({length:10},(_,i)=>dot(i*30,50)),
p16:()=>Array.from({length:10},(_,i)=>L(i*28,10,i*28,92)),
};
const PRENAMN=[["p1","Lodrät linje"],["p2","Vågrät linje"],["p3","Snett från vänster"],["p4","Snett från höger"],["p5","Cirkel"],["p6","Bågar"],["p7","Våg"],["p8","Sicksack"],["p9","Öglor"],["p10","Hängbågar"],["p11","Spiral"],["p12","Kryss"],["p13","Fyrkant"],["p14","Triangel"],["p15","Prickar"],["p16","Streck på rad"]];

const par=(...t)=>t.map(c=>({id:c+c.toLowerCase(),u:c,l:c.toLowerCase()}));
const GROUPS=[
 {id:"g0",n:"Förövningar",sub:"Linjer, vågor, sicksack, öglor och former innan bokstäverna",pre:true,items:PRENAMN.map(([id,label])=>({id,label,pre:true}))},
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
/* ett ord: bokstäverna efter varandra, x från 0. Skrivstil: små bokstäver hakas ihop i ett enda penndrag, prickar och tvärstreck kommer sist. */
function word(text,stil,step){
  if(stil==="skrift")return wordCursive(text,step);
  const out=[];let cur=0;const GAP=16;
  [...text].forEach(c=>{if(c===" "){cur+=34;return;}const g=prepare(get(stil,c),step);
    g.S.forEach(st=>{if(st.dot)st.dot[0]+=cur;else st.pts.forEach(p=>p[0]+=cur);out.push(st);});cur+=g.w+GAP;});
  return{S:out,w:Math.max(0,cur-GAP)};}
function wordCursive(text,step){
  const raw=[],extras=[],K=.16;let path=null,exit=null,cursor=0;
  const flush=()=>{if(path){raw.push(path);cursor=Math.max(cursor,exit[0]+8);path=null;exit=null;}};
  const sh=(p)=>[p[0]+(100-p[1])*K,p[1]];
  [...text].forEach(c=>{
    if(c===" "){flush();cursor+=34;return;}
    const up=c!==c.toLowerCase();
    if(up){flush();const g=prepare(get("skrift",c),step);
      g.S.forEach(st=>{if(st.dot)st.dot[0]+=cursor;else st.pts.forEach(p=>p[0]+=cursor);raw.push(st.dot?{dot:st.dot}:st.pts);});cursor+=g.w+14;return;}
    const fy=exit?(exit[1]<85?exit[1]:100):100,r=CURB[c](fy),b=r.b.map(sh),ox=(exit?exit[0]:cursor)+12;
    const pl=b.map(p=>[p[0]+ox,p[1]]);
    if(path){path=path.concat(pl.slice(1));}else path=pl;exit=pl[pl.length-1];
    r.x.forEach(x=>extras.push(x.dot?{dot:[sh(x.dot)[0]+ox,x.dot[1]]}:x.map(sh).map(p=>[p[0]+ox,p[1]])));});
  flush();raw.push(...extras);
  /* jämna avstånd och flytta så att ordet börjar vid x = 0 */
  const S=[];let mn=1e9,mx=-1e9;
  raw.forEach(s=>{if(s.dot){S.push({dot:s.dot.slice()});mn=Math.min(mn,s.dot[0]);mx=Math.max(mx,s.dot[0]);}else{const pts=resample(s,step||2.5);pts.forEach(p=>{mn=Math.min(mn,p[0]);mx=Math.max(mx,p[0]);});S.push({pts});}});
  S.forEach(s=>{if(s.dot)s.dot[0]-=mn;else s.pts.forEach(p=>p[0]-=mn);});
  return{S,w:mx-mn};}
/* ---------- mönster på rad för utskrift (motorik): gen(bredd) ger penndrag över hela raden ---------- */
const MON=[
 {id:"vag",n:"Vågor",gen:w=>[Array.from({length:Math.floor(w/3)+1},(_,i)=>[i*3,52+30*Math.sin(i*3/80*2*Math.PI)])]},
 {id:"sicksack",n:"Sicksack",gen:w=>{const p=[];for(let x=0,k=0;x<=w;x+=28,k++)p.push([x,k%2?15:88]);return[p];}},
 {id:"oglor",n:"Öglor",gen:w=>[Array.from({length:Math.floor(w/1.6)},(_,i)=>{const t=i/ (w/1.6)*(w/14);return[14*t-28*Math.sin(t),52-28*Math.cos(t)];})]},
 {id:"hangbagar",n:"Hängande bågar",gen:w=>{const a=[];for(let x=0;x+60<=w;x+=60)a.push(arc(x+30,30,30,55,180,0));return[J(...a)];}},
 {id:"bagarupp",n:"Bågar uppåt",gen:w=>{const a=[];for(let x=0;x+60<=w;x+=60)a.push(arc(x+30,92,30,55,-180,0));return[J(...a)];}},
 {id:"cirklar",n:"Cirklar",gen:w=>{const a=[];for(let x=0;x+66<=w;x+=66)a.push(arc(x+30,52,30,40,-90,-450));return a;}},
 {id:"streck",n:"Raka streck",gen:w=>{const a=[];for(let x=10;x<=w-10;x+=36)a.push(L(x,12,x,92));return a;}},
 {id:"snedstreck",n:"Snedstreck",gen:w=>{const a=[];for(let x=0;x+24<=w;x+=34)a.push(L(x,92,x+22,12));return a;}},
 {id:"kryss",n:"Kryss",gen:w=>{const a=[];for(let x=0;x+50<=w;x+=66){a.push(L(x,12,x+44,92));a.push(L(x+44,12,x,92));}return a;}},
 {id:"fyrkanter",n:"Fyrkanter",gen:w=>{const a=[];for(let x=0;x+66<=w;x+=84)a.push(L(x,18,x+62,18,x+62,88,x,88,x,18));return a;}},
];
/* ---------- ordlistor att öva på (bara bokstäver, högst 14 tecken) ---------- */
const ORD=[
["Första orden","jag och det är en på har med kan vi du han hon"],
["Veckodagar","måndag tisdag onsdag torsdag fredag lördag söndag"],
["Månader","januari februari mars april maj juni juli augusti september oktober november december"],
["Tid","dag natt morgon kväll idag igår imorgon vår sommar höst vinter"],
["Färger","röd blå gul grön vit svart rosa lila orange brun grå"],
["Siffror som ord","noll ett två tre fyra fem sex sju åtta nio tio"],
["Husdjur","katt hund kanin hamster fisk häst ko gris get får höna"],
["Vilda djur","räv varg björn älg hare ekorre igelkott lo orm groda"],
["Fåglar","uggla svan gås anka kråka mås örn talgoxe"],
["Havet","val haj säl krabba sjöstjärna delfin bläckfisk fisk"],
["Mat","bröd ost mjölk smör ägg korv pasta ris soppa"],
["Frukt och grönt","äpple päron banan apelsin citron morot gurka tomat potatis"],
["Kläder","tröja byxor jacka mössa sko strumpa halsduk vante kjol"],
["Kroppen","huvud öga öra näsa mun arm hand ben fot mage"],
["Familjen","mamma pappa syster bror farmor mormor farfar morfar barn"],
["Skolan","penna sudd bok lärare skola bänk tavla rast klass"],
["Vädret","sol regn snö vind moln åska dimma"],
["Hemma","säng stol bord lampa dörr fönster soffa kök badrum"],
["Fordon","bil buss cykel tåg båt flygplan lastbil traktor"],
["Natur","skog sjö berg träd blomma sten gräs äng bäck"],
["Yrken","läkare lärare brandman polis bagare bonde pilot kock"],
["Lek och sport","boll fotboll hoppa springa simma gunga rutschkana kull"],
["Rymden","sol måne stjärna planet raket jorden rymd"],
["Känslor","glad ledsen arg trött rädd stolt snäll"],
["Verb","springa hoppa läsa skriva måla leka sova äta dricka rita"],
["Ord med å, ä och ö","båt råd gård äpple älg väg öga öppna höst björn"],
["Skrivstil: korta ord","om av ut in ur så nu på vi du jo ni en ha se","s"],
["Skrivstil: runda bokstäver (a, o, d, g, c, e)","sol ros dag god mod lada odla gädda cola glad grad ordna","s"],
["Skrivstil: bågar (m, n, h, r, u)","mun hem hus mur ruta nu hummer människa munnen minut","s"],
["Skrivstil: öglor (l, b, h, k, f)","lila bil bok hal kul fel flik blomma klocka bläck","s"],
["Skrivstil: bokstäver som går under raden (g, j, p, y)","gul jag yxa pipa gryta pyjamas jordgubbe hjärta","s"],
["Skrivstil: spetsiga bokstäver (v, w, x, z, k)","vit vår väg vaken xylofon zebra kex kaktus vacker vinter","s"],
["Skrivstil: dubbla bokstäver","katt mamma pappa boll gubbe bubbla kanna tallrik tomma","s"],
["Skrivstil: namn (stor bokstav först)","Anna Elsa Mia Alma Ella Maja Sara Emil Oskar Hugo Liam Noah Filip Ali","s"],
].map(([n,l,s])=>({n,w:l.split(" "),sk:!!s}));
return{get,GROUPS,PRE,CAP,LOW,CURB,prepare,word,resample,ORD,MON};
})();
