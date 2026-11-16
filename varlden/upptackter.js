/* Små, frivilliga lekplatser. Allt tillstånd och alla resurser ägs av den aktuella ön.
   Sparade fynd och den egna gläntan använder världens befintliga profilnyckel. */
export function byggUpptackter(A) {
  const {THREE:T,S,P,SV,save,label,toast,tone,done,reduce,low}=A;
  const actions=[],updates=[],stations=[],quests=[];
  let near=null,transport=null,elapsed=0;
  const mat=(c)=>new T.MeshLambertMaterial({color:c});
  const wood=mat(0xB77D4E),cream=mat(0xF4E9CA),dark=mat(0x405269),green=mat(0x76B877);
  const grain=document.createElement('canvas');grain.width=grain.height=128;
  const gc=grain.getContext('2d');gc.fillStyle='#E5C5A2';gc.fillRect(0,0,128,128);
  for(let i=0;i<18;i++){gc.strokeStyle=i%3?'rgba(112,65,30,.09)':'rgba(255,248,222,.3)';gc.lineWidth=i%3?1:2;gc.beginPath();
    gc.moveTo(0,i*8);gc.bezierCurveTo(35,i*8-4,78,i*8+5,128,i*8);gc.stroke();}
  wood.map=new T.CanvasTexture(grain);wood.map.colorSpace=T.SRGBColorSpace;
  const mesh=(parent,geo,m,x=0,y=0,z=0)=>{const o=new T.Mesh(geo,m);o.position.set(x,y,z);parent.add(o);return o;};
  const box=(g,w,h,d,m,x,y,z)=>mesh(g,new T.BoxGeometry(w,h,d),m,x,y,z);
  const ball=(g,r,m,x,y,z)=>mesh(g,new T.SphereGeometry(r,12,8),m,x,y,z);
  const disk=(g,r,m,x,y,z)=>mesh(g,new T.CylinderGeometry(r,r,.16,24),m,x,y,z);
  const text=(g,t,x,y,z,w=4)=>{const o=label(t,'',w,'#607C83');o.position.set(x,y,z);g.add(o);return o;};
  const dist=(x,z)=>Math.hypot(P.x-x,P.z-z);
  function finish(key,message) { if(!done('lek-'+key,message))toast(message); }
  function locate(radius) {
    let best=null,score=-Infinity;
    for(let i=0;i<1700;i++){
      const a=i*2.399963,r=S.randR(a)*(.16+(i%29)/29*.78),x=Math.cos(a)*r,z=Math.sin(a)*r;
      if(!A.inside(x,z,radius+3)||!A.free(x,z,radius))continue;
      const y=S.hojd(x,z);
      if([[-radius,0],[radius,0],[0,-radius],[0,radius]].some(([dx,dz])=>Math.abs(S.hojd(x+dx,z+dz)-y)>.6))continue;
      if(S.stjarnor.some(q=>Math.hypot(x-q.x,z-q.z)<radius+2))continue;
      const d=Math.min(...(S.stigPkt||[]).map(q=>Math.hypot(x-q[0],z-q[1])));
      if(-d>score){score=-d;best={x,z,y};}
    }
    return best;
  }
  function station(id,title,r=7) {
    const p=locate(r);if(!p)return null;
    S.fria.push({x:p.x,z:p.z,r:r+2});
    const g=new T.Group();g.position.set(p.x,p.y,p.z);S.W.add(g);
    disk(g,r,mat(S.id==='matte'?0xBDB1DB:0xD8D7AE),0,.04,0);
    // A quiet ring of low stones, with a wide opening toward the nearest path.
    for(let i=2;i<11;i++){const a=i/12*Math.PI*2;const o=ball(g,.32,cream,Math.cos(a)*r,.2,Math.sin(a)*r);o.scale.set(1.4,.6,1);}
    text(g,title,0,1,-r+.6,5);
    const st={id,title,g,...p,r};stations.push(st);
    quests.push({id:'lek-'+id,e:'🔎',n:title,fram:()=>''});
    // A few small footsteps, never an obstacle, lead from the path to the clearing.
    const path=(S.stigPkt||[]).reduce((b,q)=>!b||Math.hypot(q[0]-p.x,q[1]-p.z)<Math.hypot(b[0]-p.x,b[1]-p.z)?q:b,null);
    if(path){for(let i=1;i<6;i++){const f=i/6,x=path[0]+(p.x-path[0])*f,z=path[1]+(p.z-path[1])*f;
      const o=disk(S.W,.17,cream,x,S.hojd(x,z)+.2,z);o.scale.z=1.6;}}
    return st;
  }
  function action(st,x,z,title,fn,y=0) {
    const a={station:st.id,x:st.x+x,z:st.z+z,y:st.y+y,title,fn};actions.push(a);return a;
  }
  function plate(st,x,z,title,fn,c=0xF2C76B){
    const m=mat(c),o=disk(st.g,1.05,m,x,.2,z);
    text(st.g,title,x,.85,z,2.2);
    let was=false;
    updates.push(()=>{const inside=!transport&&dist(st.x+x,st.z+z)<1.05&&Math.abs(P.y-st.y)<.8;
      o.position.y=inside?.08:.2;if(inside&&!was)fn();was=inside;});
    return o;
  }
  function trip(st,points,seconds,then) {
    if(transport)return;
    transport={st,points:points.map(([x,y,z])=>new T.Vector3(st.x+x,st.y+y,st.z+z)),seconds,t:0,then};
    P.fartX=P.fartZ=P.vy=0;P.hoppKo=false;near=null;
  }
  function flower(st,x,z,color) {
    const g=new T.Group();g.position.set(x,0,z);st.g.add(g);
    box(g,.12,1,.12,green,0,.5,0);
    for(let i=0;i<5;i++){const a=i/5*Math.PI*2;ball(g,.26,mat(color),Math.cos(a)*.3,1.1+Math.sin(a)*.3,0);}
    ball(g,.18,mat(0xFFD65F),0,1.1,.12);return g;
  }
  function hatch(st,x,z){
    const lid=box(st.g,1.8,.22,1.3,wood,x,.3,z),gem=ball(st.g,.5,mat(0x80E4D8),x,.9,z);
    gem.visible=false;
    return()=>{lid.rotation.z=-.55;lid.position.x=x-1;gem.visible=true;};
  }

  // Water is the cause: gate -> wheel -> lift -> return slide.
  if(S.id==='no'){
    const st=station('vattenhjul','Vattnet driver hissen',9);
    if(st){
      box(st.g,2.4,.35,9,cream,-3,.25,0);
      const water=box(st.g,1.8,.12,8,mat(0x58C3DE),-3,.5,0);
      disk(st.g,2,mat(0x58C3DE),-3,.5,-4);
      const gate=box(st.g,2,.9,.25,wood,-3,.95,-2.4);
      for(const x of [-4.2,-1.8])box(st.g,.2,2,.2,dark,x,1,-2.4);
      const wheel=new T.Group();wheel.position.set(-2.1,1.6,1.5);wheel.rotation.y=Math.PI/2;st.g.add(wheel);
      mesh(wheel,new T.TorusGeometry(1.3,.15,6,24),wood);
      for(let i=0;i<8;i++){const a=i/8*Math.PI*2,o=box(wheel,.22,2.6,.3,wood,0,0,0);o.rotation.z=a;}
      const deck=box(st.g,4.2,.2,2.7,wood,2.6,4,0);
      for(const x of [.5,3.5])box(st.g,.22,4,.22,wood,x,2,-1.4);
      const lift=box(st.g,2.3,.2,2.3,mat(0xE8B550),2,.3,0);
      const slide=box(st.g,1.3,.15,6.8,mat(0x7AC6BE),4,2.1,2.5);slide.rotation.x=.64;
      for(const x of [3.3,4.7]){const rail=box(st.g,.12,.3,6.8,cream,x,2.3,2.5);rail.rotation.x=.64;}
      let open=false;water.scale.z=.15;water.position.z=-3.4;
      action(st,-3,-3.7,()=>open?'💧 Stäng dammluckan':'💧 Öppna dammluckan',()=>{
        open=!open;gate.position.y=open?1.9:.95;water.scale.z=open?1:.15;water.position.z=open?0:-3.4;water.material.color.setHex(open?0x58C3DE:0x7E9FA7);
        toast(open?'Vattnet får hjulet att snurra. Prova hissen!':'Luckan stoppar vattnet och hjulet stannar.');tone(330,open?660:260);
      });
      action(st,2,2,'🛗 Åk vattenhissen',()=>{
        if(!open){toast('Öppna dammluckan först. Hissen behöver vattenhjulet.');return;}
        trip(st,[[2,0,2],[2,0,0],[2,4.2,0],[4,4.2,0],[4,0,5.3]],reduce?1.8:8,()=>{
          finish(st.id,'Du fick vatten att driva ett hjul och en hiss!');lift.position.y=.3;
        });
      });
      const drops=[];
      for(let i=0;i<(low?3:7);i++)drops.push(ball(st.g,.09,mat(0xBFEAF2),-2,1,1.5));
      updates.push(dt=>{drops.forEach((d,i)=>{d.visible=open&&!reduce;const u=(elapsed*.8+i/drops.length)%1;d.position.set(-2+u*.8,.5+Math.sin(u*Math.PI)*1.2,1.5);});
        if(open&&!reduce)wheel.rotation.z-=dt*1.4;
        lift.position.y=transport?.st===st?Math.min(4,Math.max(.3,P.y-st.y-.1)):.3;});
      const reveal=hatch(st,-.2,4);
      action(st,-.2,5.8,'🔎 Titta bakom vattenhjulet',()=>{if(!open){toast('Här finns en lucka. Kanske händer något när hjulet snurrar?');return;}reveal();finish('vattenhemlighet','Du hittade glaskristallen bakom vattenhjulet!');});
      st.state=()=>({open});
    }
  }

  if(S.id==='matte'){
    const st=station('brakbro','Hjälp kaninen över bråkbron',8);
    if(st){
      box(st.g,3.2,.12,9,mat(0x70BED9),0,.22,0);
      const bridge=box(st.g,3.3,.22,1.7,wood,0,.5,0);bridge.visible=false;
      const rabbit=new T.Group();rabbit.position.set(3,0,0);st.g.add(rabbit);
      ball(rabbit,.6,cream,0,.6,0);ball(rabbit,.4,cream,0,1.25,0);
      for(const x of [-.2,.2]){const e=ball(rabbit,.15,cream,x,1.8,0);e.scale.y=2.5;}
      let count=0;const pieces=[];
      for(let i=0;i<2;i++){const x=-5,z=-2+i*3,part=box(st.g,1.55,.3,1.7,mat(0xEFA2C3),x,.35,z);pieces.push(part);text(st.g,'½',x,1,z,2);
        action(st,x,z,()=>part.userData.placed?'✓ Den halvan ligger på bron':'🧩 Lägg halvan på bron',()=>{
          if(part.userData.placed)return;part.userData.placed=true;part.position.set(count? .8:-.8,.65,0);count++;tone(440,660);
          if(count===2){bridge.visible=true;finish(st.id,'½ + ½ = 1. Nu kan kaninen komma över!');}
          else toast('En halv på plats. Vilken bit fyller resten?');
        });}
      updates.push(dt=>{if(count===2)rabbit.position.x=Math.max(-3,rabbit.position.x-dt*1.4);});
      st.state=()=>({count});
    }
  }

  if(S.id==='svenska'){
    const st=station('ordros','Väck ordträdgården',7);
    if(st){
      const rose=flower(st,0,-2,0xE85C87);rose.visible=false;let word='';
      const reveal=hatch(st,0,-4);
      ['R','O','S'].forEach((letter,i)=>plate(st,(i-1)*2.5,2,letter,()=>{
        word+=letter;tone(330+i*100,440+i*100);
        if(!'ROS'.startsWith(word)){word=letter==='R'?'R':'';toast('Prova R – O – S. Börja med R.');}
        else if(word==='ROS'){rose.visible=true;reveal();finish(st.id,'R–O–S blev en ros! Under blomman låg en hemlig lucka.');word='';}
        else toast(word.split('').join(' – ')+' …');
      },0xECAFC4));
      st.state=()=>({rose:rose.visible,word});
    }
  }

  if(S.id==='spel'){
    const st=station('kulkedja','Starta den lilla kulkedjan',8);
    if(st){
      const track=box(st.g,9,.18,1.5,wood,-1,.5,0);track.rotation.z=-.08;
      const marble=ball(st.g,.45,mat(0x69B7D7),-5,1.25,0),domino=[];
      for(let i=0;i<5;i++)domino.push(box(st.g,.3,1.5,.8,mat([0xE98E7D,0xEAC666,0x79BDA9][i%3]),-1+i*.9,1.1,0));
      mesh(st.g,new T.ConeGeometry(.65,.8,16),mat(0xEAC666),4,1.4,0);
      const reveal=hatch(st,5,3);let run=-1;
      plate(st,-4,3,'Dra igång',()=>{if(run>=0)return;run=0;marble.visible=true;domino.forEach(o=>o.rotation.z=0);tone(440,660);});
      updates.push(dt=>{if(run<0)return;run+=dt;marble.position.x=Math.min(-.8,-5+run*2.8);
        domino.forEach((o,i)=>o.rotation.z=-Math.min(1.35,Math.max(0,(run-1.5-i*.22)*5)));
        if(run>3){reveal();marble.visible=false;run=-1;finish(st.id,'Kulan välte klossarna, klossarna ringde i klockan och luckan öppnades!');}});
      st.state=()=>({run});
    }
  }

  if(S.id==='extra'||S.id==='kroppen'){
    const music=S.id==='extra',st=station(music?'tonminne':'hjartpuls',music?'Härma fågelns toner':'Hjärtat arbetar när du rör dig',7);
    if(st){
      if(music){
        const seq=[0,2,1,0],tones=[392,494,587],pads=[];let showing=-1,index=0,last=-1;
        const bird=ball(st.g,.6,mat(0xEBC75F),0,2,-2);box(st.g,.15,2,.15,wood,0,1,-2);
        action(st,0,-3.5,'🐦 Lyssna och titta på fågelns följd',()=>{showing=0;index=0;last=-1;});
        for(let i=0;i<3;i++)pads.push(plate(st,(i-1)*2.5,2,String(i+1),()=>{
          if(showing>=0)return;tone(tones[i],tones[i]);
          if(i===seq[index]){index++;if(index===seq.length){finish(st.id,'Du härmade hela melodin! Fågeln svarar med en bugning.');bird.scale.y=.65;index=0;}}
          else {index=0;toast('Nästan! Fågeln kan visa igen. Följden är 1 – 3 – 2 – 1.');}
        },[0xECA7A0,0xEACD75,0x99BEDC][i]));
        updates.push(dt=>{if(showing<0)return;showing+=dt;const step=Math.floor(showing/.85);
          pads.forEach((o,i)=>o.material.emissive.setHex(step<4&&i===seq[step]?0x665522:0));
          if(step!==last&&step<4){tone(tones[seq[step]],tones[seq[step]]);last=step;}
          if(step>=4){showing=-1;toast('Din tur: gå på tonplattorna!');}});
        st.state=()=>({index,showing});
      }else{
        const heart=ball(st.g,1.1,mat(0xE96E8F),0,2,0);let effort=0,travel=0,lastX=P.x,lastZ=P.z,awarded=false;
        text(st.g,'Spring en runda här',0,1,3);
        updates.push(dt=>{const d=Math.hypot(P.x-lastX,P.z-lastZ);lastX=P.x;lastZ=P.z;
          const inside=dist(st.x,st.z)<7;effort=Math.max(0,Math.min(1,effort+(inside&&d>.01?dt*.4:-dt*.2)));
          if(inside&&d<1)travel+=d;
          heart.scale.setScalar(reduce?1:1+Math.sin(elapsed*(4+effort*6))*(.05+effort*.08));
          if(travel>18&&!awarded){awarded=true;finish(st.id,'När du rör dig behöver musklerna mer syre. Hjärtat slår snabbare. Vila och se pulsen lugna sig.');}});
      }
    }
  }

  if(S.id==='so'||S.id==='fler'){
    const mirror=S.id==='so',st=station(mirror?'ljusblommor':'puttalada',mirror?'Led solljuset till blommorna':'Putta lådan till tryckplattan',8);
    if(st){
      if(mirror){
        const post=box(st.g,.2,2,.2,wood,0,1,0),disc=box(st.g,1.7,1.3,.15,mat(0xB8DFE6),0,2.2,0);
        const flowers=[-2,0,2].map(x=>flower(st,x,-4,0xEDC966));flowers.forEach(f=>f.scale.setScalar(.35));
        const beam=box(st.g,.12,.12,4,mat(0xFFF5A5),0,2.2,-2);let angle=0;beam.visible=false;
        const reveal=hatch(st,3,-3);
        action(st,0,2,'🪞 Vrid spegeln ett steg',()=>{angle=(angle+1)%4;disc.rotation.y=angle*Math.PI/2;beam.visible=angle===2;
          flowers.forEach(f=>f.scale.setScalar(angle===2?1:.35));
          if(angle===2){reveal();finish(st.id,'Spegeln leder solljuset till blommorna. Du hittade deras gömma!');}
          else toast('Vart pekar spegeln? Försök rikta ljuset mot blommorna.');});
        st.state=()=>({angle});
      }else{
        const crate=box(st.g,1.5,1.5,1.5,wood,-4,.85,0),target=disk(st.g,1.3,mat(0xEDC966),3,.2,0);
        text(st.g,'→',0,.65,0,2);let x=-4;
        const reveal=hatch(st,4,-3);
        const a=action(st,-5.5,0,'📦 Putta lådan ett steg',()=>{if(x>=3){toast('Lådan håller plattan nere. Luckan är öppen!');return;}x=Math.min(3,x+1);crate.position.x=x;a.x=st.x+x-1.6;
          tone(220,330);if(x===3){target.position.y=.06;reveal();finish(st.id,'Lådans tyngd håller tryckplattan nere och öppnar luckan!');}});
        st.state=()=>({x});
      }
    }
  }

  if(S.id==='hub'){
    const st=station('egen-glanta','Din egen glänta',6);
    if(st){
      const saved=SV.glanta&&typeof SV.glanta==='object'?SV.glanta:{};
      SV.glanta={bank:Number.isInteger(saved.bank)?saved.bank%3:0,vaxt:Math.max(0,Math.min(3,Number(saved.vaxt)||0)),platser:Array.isArray(saved.platser)?saved.platser.slice(0,2):['','']};
      const bench=new T.Group();st.g.add(bench);
      box(bench,2.5,.2,.9,wood,0,.8,-2);box(bench,2.5,.8,.18,wood,0,1.3,-2.5);
      for(const x of [-1,1])box(bench,.2,.8,.8,dark,x,.4,-2);
      const positions=[[-2,-2],[2,-2],[0,-3]];
      const moveBench=()=>{const[x,z]=positions[SV.glanta.bank];bench.position.set(x,0,z+2);};moveBench();
      action(st,0,2,'🪑 Flytta bänken',()=>{SV.glanta.bank=(SV.glanta.bank+1)%3;moveBench();save();tone(330,440);});
      const plant=flower(st,0,-.5,0xE795AD);
      const grow=()=>plant.scale.setScalar(.25+SV.glanta.vaxt*.3);grow();
      action(st,0,-.5,'🌱 Vattna din blomma',()=>{SV.glanta.vaxt=Math.min(3,SV.glanta.vaxt+1);grow();save();
        if(SV.glanta.vaxt===3)finish(st.id,'Din glänta blommar! Du kan flytta bänken och välja prydnader.');
        else toast('Blomman växer. Vattna igen!');});
      for(let i=0;i<2;i++){
        const g=new T.Group();g.position.set(i?3.5:-3.5,0,0);st.g.add(g);
        disk(g,1.2,cream,0,.12,0);
        const visual=new T.Group();g.add(visual);
        const draw=()=>{while(visual.children.length){const o=visual.children[0];o.traverse(n=>{n.geometry?.dispose();if(n.material){for(const m of [n.material].flat()){m.map?.dispose();m.dispose();}}});visual.remove(o);}
          const def=A.deco.find(d=>d.id===SV.glanta.platser[i]&&SV.deko.includes(d.id));
          if(def){def.bygg(visual,c=>mat(c));visual.scale.setScalar(.4);}
          else {ball(visual,.25,mat(0x9CBBA2),0,.4,0);}};
        draw();
        action(st,i?3.5:-3.5,1.6,'🎁 Välj prydnad på sockeln',()=>{const pool=['',...SV.deko.filter(id=>A.deco.some(d=>d.id===id))],k=pool.indexOf(SV.glanta.platser[i]);SV.glanta.platser[i]=pool[(k+1)%pool.length];draw();save();
          toast(pool.length===1?'Hitta hemligheter och gör uppdrag för att få prydnader till din glänta.':'Prydnaden är vald och sparad. Tryck igen för nästa.');});
      }
    }
  }

  // A short spring trail is a playful route to a lookout, separate from portals.
  if(S.id==='svenska'||S.id==='spel'){
    const st=station(S.id+'-studs','Följ svamparna till utsikten',5);
    if(st){
      for(let i=0;i<3;i++){const x=-2+i*2,z=i%2?1:-1,top=.4+i*.8;
        box(st.g,.35,top,.35,cream,x,top/2,z);
        const cap=mesh(st.g,new T.SphereGeometry(1,12,6,0,Math.PI*2,0,Math.PI/2),mat(i%2?0xEACB69:0xDB8278),x,top,z);
        S.pads.push({x:st.x+x,z:st.z+z,r:1,top:st.y+top,boost:12.5,f:330+i*110});
      }
      const lookout=box(st.g,2.5,.2,2.5,wood,0,3,-3);
      S.kollider.push({x:st.x,z:st.z-3,r:1.25,top:st.y+3.1,halv:true});
      action(st,0,-3,'🔭 Titta ut över ön',()=>finish(st.id,'Du hittade utsiktsplatsen via studssvamparna!'),3.1);
    }
  }

  let guide=null,guideArrow=null;
  const api={
    stations,actions,quests,
    guide(id){guide=stations.find(st=>st.id===id)||null;if(!guide)return;
      if(!guideArrow){guideArrow=new T.Mesh(new T.ConeGeometry(.35,1,6),mat(0xFFD36A));S.W.add(guideArrow);}
      guideArrow.visible=true;toast('Följ den gula pilen till '+guide.title.toLowerCase()+'.');},

    get near(){return near;},
    get riding(){return !!transport;},
    interact(){if(near&&!transport){near.fn();return true;}return false;},
    cancel(){if(!transport)return;const tr=transport;transport=null;P.x=tr.st.x;P.z=tr.st.z+tr.st.r-1;P.y=S.hojd(P.x,P.z);P.vy=0;P.fartX=P.fartZ=0;P.mark=true;P.hoppKo=false;},
    update(dt,blocked=false){
      elapsed+=dt;
      if(guide&&guideArrow){
        const dx=guide.x-P.x,dz=guide.z-P.z,d=Math.hypot(dx,dz);
        guideArrow.visible=d>guide.r;
        if(d>guide.r){guideArrow.position.set(P.x+dx/d*3,P.y+2,P.z+dz/d*3);
          guideArrow.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),new T.Vector3(dx/d,0,dz/d));}
      }
      // Do not advance plates or reactions under dialogs or while changing scenes.
      if(!blocked)updates.forEach(f=>f(dt));
      near=null;
      if(!blocked&&!transport)for(const a of actions){
        if(dist(a.x,a.z)<2.1&&Math.abs(P.y-a.y)<1.8&&(!near||dist(a.x,a.z)<dist(near.x,near.z)))near=a;
      }
    },
    move(dt){
      if(!transport)return false;
      const tr=transport;tr.t+=dt;
      const f=Math.min(1,tr.t/tr.seconds)*(tr.points.length-1),i=Math.min(tr.points.length-2,Math.floor(f)),u=f-i;
      const v=new T.Vector3().lerpVectors(tr.points[i],tr.points[i+1],u);
      P.x=v.x;P.y=v.y;P.z=v.z;P.vy=P.fartX=P.fartZ=0;P.mark=true;P.hoppKo=false;
      P.ang=Math.atan2(tr.points[i+1].x-tr.points[i].x,tr.points[i+1].z-tr.points[i].z);
      if(tr.t>=tr.seconds){transport=null;P.y=S.hojd(P.x,P.z);tr.then();}
      return true;
    }
  };
  return api;
}

/* Cheap contact shading and a quiet shoreline, with no real-time shadow maps. */
export function putsaMiljo({THREE:T,S,reduce,low}) {
  if(S.klot)return;
  const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');
  const gr=q.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(34,55,60,.24)');gr.addColorStop(.5,'rgba(34,55,60,.12)');gr.addColorStop(1,'rgba(34,55,60,0)');q.fillStyle=gr;q.fillRect(0,0,64,64);
  const tx=new T.CanvasTexture(c),material=new T.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
  const points=S.kollider.filter(k=>k.top>=90).slice(0,low?80:160);
  const shadows=new T.InstancedMesh(new T.PlaneGeometry(1,1),material,points.length),dummy=new T.Object3D();
  points.forEach((k,i)=>{dummy.position.set(k.x,S.hojd(k.x,k.z)+.025,k.z);dummy.rotation.x=-Math.PI/2;dummy.scale.setScalar(Math.max(1.6,k.r*3.4));dummy.updateMatrix();shadows.setMatrixAt(i,dummy.matrix);});S.W.add(shadows);
  // Wide translucent shallows and a narrow foam line follow the actual coast.
  for(const [inner,outer,color,opacity] of [[.2,5.5,0xB5ECE6,.24],[1.1,1.35,0xFFF7DE,.6]]){
    const positions=[],indices=[],n=low?96:180;
    for(let i=0;i<=n;i++){const a=i/n*Math.PI*2,r=S.randR(a);
      for(const d of [inner,outer])positions.push(Math.cos(a)*(r+d),-2.12,Math.sin(a)*(r+d));
      if(i<n){const k=i*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}}
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setIndex(indices);
    const m=new T.MeshBasicMaterial({color,transparent:true,opacity,side:T.DoubleSide,depthWrite:false});
    const band=new T.Mesh(geo,m);S.W.add(band);
    if(!reduce)S.liv.push(t=>{m.opacity=opacity*(.85+.15*Math.sin(t*.8));});
  }
  // Portals retain one silhouette. Small book spines / roof beams give them texture.
  S.portaler.forEach(po=>{
    if(po.p.scen==='hub')return;
    const g=po.g,k=po.sk,m=new T.MeshLambertMaterial({color:0xD8B58B});
    const theme=po.p.scen||S.id;
    const ornament=new T.Group();ornament.position.set(-2.4*k,4.3*k,0);g.add(ornament);
    if(theme==='svenska'||theme==='bio'){
      for(let i=0;i<3;i++){const book=new T.Mesh(new T.BoxGeometry(.19*k,.65*k,.45*k),new T.MeshLambertMaterial({color:[0xC67368,0xE6CC8C,0x6A9A9C][i]}));book.position.x=(i-1)*.22*k;book.rotation.z=(i-1)*.12;ornament.add(book);}
    }else if(theme==='no'||theme==='fler'){
      const gear=new T.Mesh(new T.TorusGeometry(.38*k,.12*k,5,12),m);ornament.add(gear);
      for(let i=0;i<8;i++){const a=i/8*Math.PI*2,tooth=new T.Mesh(new T.BoxGeometry(.18*k,.2*k,.2*k),m);tooth.position.set(Math.cos(a)*.46*k,Math.sin(a)*.46*k,0);tooth.rotation.z=a;ornament.add(tooth);}
    }else{
      const gem=new T.Mesh(new T.OctahedronGeometry(.4*k),new T.MeshLambertMaterial({color:po.p.c||0xF2C76B}));ornament.add(gem);
    }
    for(const side of [-1,1]){
      const foot=new T.Mesh(new T.CylinderGeometry(.76*k,.86*k,.25,10),m);foot.position.set(side*2.4*k,.15,0);g.add(foot);
      for(let j=0;j<2;j++){const band=new T.Mesh(new T.TorusGeometry(.52*k,.055*k,4,12),m);band.rotation.x=Math.PI/2;band.position.set(side*2.4*k,(.75+j*1.8)*k,0);g.add(band);}
    }
  });
}

/* Huvudöns entréer: en gemensam arkitektur, egen färg och ämnessymbol.
   Skyltarna är canvastexturer (lokala typsnitt), läsbara från båda håll. */
export function huvudonsPortaler({THREE:T,S,cam,reduce,low}){
  if(S.id!=='hub')return;
  const captions={
    matte:'Räkna · bygg · upptäck',svenska:'Läs · skriv · lek med ord',
    spel:'Spela · klura · prova',so:'Platser · människor · historia',
    rymdlabbet:'Planeter · stjärnor · rymden',no:'Vatten · teknik · experiment',
    kroppen:'Hjärta · hjärna · kroppen',bio:'Slå dig ner och se en film',
    fler:'Skapa · koda · utforska',extra:'Spela · lyssna · skapa'
  };
  const colors={matte:'#5961CE',svenska:'#C65F71',spel:'#C58B22',so:'#CB7644',rymdlabbet:'#467A86',no:'#3C91AB',kroppen:'#C5688B',bio:'#8460B8',fler:'#328F86',extra:'#B95D99'};
  for(const po of S.portaler){
    const id=po.p.scen,g=po.g,k=po.sk,c=colors[id]||'#547C87';
    const stone=new T.MeshLambertMaterial({color:0xEEE3CE}),trim=new T.MeshLambertMaterial({color:0xDDBA76}),accent=new T.MeshLambertMaterial({color:c});
    const add=(geo,m,x,y,z)=>{const o=new T.Mesh(geo,m);o.position.set(x*k,y*k,z*k);o.scale.setScalar(k);g.add(o);return o;};
    // Broad, low entrance terrace; side towers frame rather than occupy the opening.
    add(new T.CylinderGeometry(4.8,5,.12,40),stone,0,.01,1.2);
    for(const x of [-3.25,3.25]){
      add(new T.CylinderGeometry(.8,1,.4,8),stone,x,.2,0);
      add(new T.CylinderGeometry(.48,.62,4.5,8),stone,x,2.6,0);
      add(new T.CylinderGeometry(.7,.7,.22,8),trim,x,4.9,0);
      add(new T.SphereGeometry(.5,12,8),accent,x,5.35,0);
      // Small inset tiles make the masonry feel crafted.
      for(let i=0;i<3;i++)add(new T.BoxGeometry(.36,.45,.08),accent,x,1.4+i*.9,.54);
    }
    const arch=add(new T.TorusGeometry(3.25,.24,8,32,Math.PI),stone,0,4.9,0);
    const rim=add(new T.TorusGeometry(3.25,.055,5,32,Math.PI),trim,0,4.9,.25);
    // Warm lights sit around the portal, outside its walk-through volume.
    for(const side of [-1,1]){
      add(new T.CylinderGeometry(.18,.22,1.1,8),stone,side*4,.6,2.5);
      const lamp=add(new T.SphereGeometry(.3,10,8),new T.MeshBasicMaterial({color:0xFFE8A8}),side*4,1.3,2.5);
      if(!reduce&&!low)S.liv.push(t=>{lamp.scale.setScalar(k*(1+Math.sin(t*.9+side)*.035));});
    }
    const cv=document.createElement('canvas');cv.width=1024;cv.height=320;const q=cv.getContext('2d');
    q.fillStyle='rgba(34,48,64,.22)';q.beginPath();q.roundRect(22,27,980,280,37);q.fill();
    const fill=q.createLinearGradient(0,10,0,290);fill.addColorStop(0,'#FFF9E9');fill.addColorStop(1,'#F1E3C8');
    q.fillStyle=fill;q.beginPath();q.roundRect(12,12,1000,278,34);q.fill();
    q.strokeStyle=c;q.lineWidth=15;q.stroke();
    q.strokeStyle='#D7B76F';q.lineWidth=3;q.beginPath();q.roundRect(30,30,964,242,22);q.stroke();
    q.textAlign='center';q.textBaseline='middle';
    let fs=76;q.font='800 '+fs+'px "Baloo 2","Trebuchet MS",sans-serif';
    while(q.measureText(po.p.n).width>900){fs-=2;q.font='800 '+fs+'px "Baloo 2","Trebuchet MS",sans-serif';}
    q.fillStyle='#243B50';q.fillText(po.p.n,512,115);
    q.fillStyle=c;q.font='700 38px "Baloo 2","Trebuchet MS",sans-serif';q.fillText(captions[id]||'Stig in och upptäck',512,211);
    const texture=new T.CanvasTexture(cv);texture.colorSpace=T.SRGBColorSpace;
    po.sign.material.map.dispose();po.sign.material.map=texture;po.sign.material.depthTest=true;po.sign.material.needsUpdate=true;po.sign.renderOrder=0;
    po.sign.scale.set(8.5*k,8.5*k*320/1024,1);po.sign.position.set(0,9.55*k,.4*k);
    // The large crest is visible before the words can be read.
    const badge=document.createElement('canvas');badge.width=badge.height=256;const b=badge.getContext('2d');
    b.fillStyle=c;b.beginPath();b.arc(128,128,116,0,Math.PI*2);b.fill();
    b.strokeStyle='#F0D89C';b.lineWidth=10;b.stroke();
    b.fillStyle='#FFF8E7';b.font='118px "Apple Color Emoji","Segoe UI Emoji",sans-serif';b.textAlign='center';b.textBaseline='middle';b.fillText(po.p.e,128,135);
    const bt=new T.CanvasTexture(badge);bt.colorSpace=T.SRGBColorSpace;
    const crest=new T.Sprite(new T.SpriteMaterial({map:bt,transparent:true,depthWrite:false}));crest.scale.set(2.2*k,2.2*k,1);crest.position.set(0,11.95*k,0);g.add(crest);
    // A nearby sign must not cover the camera's view of the square.
    S.liv.push(()=>{const d=Math.hypot(cam.position.x-g.position.x,cam.position.z-g.position.z),opacity=Math.max(0,Math.min(1,(d-9)/7));
      po.sign.material.opacity=opacity;crest.material.opacity=opacity;});

    // Arrival spots and guide clearances include the wider towers and lamps.
    const right=new T.Vector3(1,0,0).applyQuaternion(g.quaternion),forward=new T.Vector3(0,0,1).applyQuaternion(g.quaternion);
    for(const side of [-1,1]){
      const pos=g.position.clone().addScaledVector(right,side*3.25*k);
      S.kollider.push({x:pos.x,z:pos.z,r:.85*k,top:99});
      const lp=g.position.clone().addScaledVector(right,side*4*k).addScaledVector(forward,2.5*k);
      S.kollider.push({x:lp.x,z:lp.z,r:.25*k,top:g.position.y+1.5*k});
    }
  }
}

export function huvudonsMiljo({THREE:T,S,free,inside,reduce,low,toast}){
  const material=c=>new T.MeshLambertMaterial({color:c});
  const stone=material(0xDDD3B9),wood=material(0xA9764F),leaf=material(0x629C73),water=material(0x70C7D1);
  const put=(g,geo,m,x,y,z)=>{const o=new T.Mesh(geo,m);o.position.set(x,y,z);g.add(o);return o;};
  const box=(g,w,h,d,m,x,y,z)=>put(g,new T.BoxGeometry(w,h,d),m,x,y,z);
  // A fountain around the existing star is the shared landmark at the centre.
  const fountain=new T.Group();S.W.add(fountain);
  put(fountain,new T.CylinderGeometry(4.5,4.7,.45,48),stone,0,.2,0);
  put(fountain,new T.CylinderGeometry(4.1,4.1,.08,48),water,0,.46,0);
  const rim=put(fountain,new T.TorusGeometry(4.3,.22,8,64),material(0xF5E6C5),0,.5,0);rim.rotation.x=Math.PI/2;
  const jets=new T.Group();fountain.add(jets);
  for(let i=0;i<(low?4:8);i++){
    const a=i/(low?4:8)*Math.PI*2,pts=[];
    for(let j=0;j<=16;j++){const u=j/16,r=1.5+u*2.3;pts.push(new T.Vector3(Math.cos(a)*r,.7+Math.sin(Math.PI*u)*1.6,Math.sin(a)*r));}
    const stream=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),24,.055,5,false),new T.MeshBasicMaterial({color:0xBEEEF1,transparent:true,opacity:.75}));jets.add(stream);
  }
  if(!reduce)S.liv.push(t=>{jets.scale.y=.98+Math.sin(t*1.2)*.035;});
  S.kollider.push({x:0,z:0,r:4.6,top:1});S.fria.push({x:0,z:0,r:9});
  // Lanterns and flower beds form pairs between paths, never on a path.
  for(let i=0;i<10;i++){
    const a=(i+.5)/10*Math.PI*2,x=Math.cos(a)*11.8,z=Math.sin(a)*11.8;
    if(!free(x,z,.5))continue;
    const g=new T.Group();g.position.set(x,S.hojd(x,z),z);S.W.add(g);
    put(g,new T.CylinderGeometry(.12,.17,2.3,8),wood,0,1.15,0);
    box(g,.7,.1,.7,stone,0,2.6,0);
    put(g,new T.SphereGeometry(.32,10,8),new T.MeshBasicMaterial({color:0xFFE7A0}),0,2.2,0);
    S.kollider.push({x,z,r:.35,top:2.7});S.fria.push({x,z,r:1.4});
  }
  function clearing(radius,phase){
    for(let i=0;i<180;i++){
      const a=phase+i*.061,r=S.randR(a)-radius-5,x=Math.cos(a)*r,z=Math.sin(a)*r;
      if(inside(x,z,radius+3)&&free(x,z,radius)){
        S.fria.push({x,z,r:radius+2});
        const g=new T.Group();g.position.set(x,S.hojd(x,z),z);g.rotation.y=-a+Math.PI/2;S.W.add(g);
        return {g,x,z,a};
      }
    }
  }
  const lighthouse=clearing(4.5,Math.PI*.9);
  if(lighthouse){
    const {g,x,z}=lighthouse;
    put(g,new T.CylinderGeometry(2.3,2.6,.4,12),stone,0,.2,0);
    put(g,new T.CylinderGeometry(1.1,1.7,7,16),material(0xF4EBD7),0,3.7,0);
    for(const y of [2,5])put(g,new T.CylinderGeometry(1.2+(7-y)*.085,1.2+(7-y)*.085,.7,16),material(0x6EA9A3),0,y,0);
    put(g,new T.CylinderGeometry(1.65,1.65,.2,16),wood,0,7.3,0);
    put(g,new T.CylinderGeometry(1,1,1.1,16),new T.MeshBasicMaterial({color:0xFFE5A2}),0,8,0);
    put(g,new T.ConeGeometry(1.6,1.3,16),material(0x547A85),0,9.1,0);
    box(g,.6,1.4,.12,wood,0,.9,1.65);
    S.kollider.push({x,z,r:1.8,top:99});
    // One calm lamp, without a sweeping full-screen beam.
    const glow=put(g,new T.SphereGeometry(.24,10,8),new T.MeshBasicMaterial({color:0xFFEEAA}),0,9.9,0);
    if(!reduce)S.liv.push(t=>{glow.scale.setScalar(.9+Math.sin(t*.6)*.1);});
  }
  const dock=clearing(5.5,-Math.PI*.35);
  if(dock){
    const {g,x,z}=dock;
    // The jetty remains inside the walkable shoreline; a lookout deck overlooks the sea.
    for(let i=0;i<22;i++)box(g,3,.13,.47,wood,0,.16,i*.5-3);
    for(const xx of [-1.4,1.4]){
      for(const zz of [-2.8,0,3.4,7.2])box(g,.16,1.2,.16,stone,xx,.65,zz);
      box(g,.09,.09,10,wood,xx,1.1,2.2);
    }
    box(g,2.2,.2,.7,wood,0,.7,-2.4);box(g,2.2,.65,.12,wood,0,1.1,-2.75);
    const float=put(g,new T.TorusGeometry(.65,.17,8,20),material(0xEABF6A),-1.6,.85,1);float.rotation.y=Math.PI/2;
    S.upptackter?.actions.push({station:'bryggan',x,z,y:S.hojd(x,z),title:'🌊 Ta en paus på bryggan',fn:()=>toast('En lugn stund vid havet. Ser du fyren på andra sidan ön?')});
  }
  // Small groves replace evenly scattered conifers. Shared geometry keeps them cheap.
  const trees=low?18:30,stemGeo=new T.CylinderGeometry(.22,.38,3.3,7),crownGeo=new T.IcosahedronGeometry(1,1);
  const stems=new T.InstancedMesh(stemGeo,wood,trees),crowns=new T.InstancedMesh(crownGeo,material(0xFFFFFF),trees*3);
  const d=new T.Object3D();let count=0;
  for(let i=0;i<500&&count<trees;i++){
    const cluster=i%7,a=cluster/7*Math.PI*2+.19+Math.sin(i*2.1)*.11,r=S.O-11+Math.sin(i*1.7)*4,x=Math.cos(a)*r,z=Math.sin(a)*r;
    if(!inside(x,z,5)||!free(x,z,2.8))continue;
    const size=.8+(i%4)*.12,y=S.hojd(x,z);
    d.position.set(x,y+1.65*size,z);d.scale.set(size,size,size);d.rotation.set(0,i,0);d.updateMatrix();stems.setMatrixAt(count,d.matrix);
    for(let j=0;j<3;j++){
      d.position.set(x+(j-1)*1.05*size,y+(j===1?5:4)*size,z+Math.sin(j*2)*.65);d.scale.set(2*size,1.8*size,1.8*size);d.updateMatrix();crowns.setMatrixAt(count*3+j,d.matrix);
      crowns.setColorAt(count*3+j,new T.Color([0x659C77,0x7EAD7C,0x9CBF83,0xE9B7BC][cluster%4]));
    }
    S.kollider.push({x,z,r:.55*size,top:99});count++;
  }
  stems.count=count;crowns.count=count*3;S.W.add(stems,crowns);
  // Low flowering bushes at grove edges, leaving the central lawn open.
  for(let i=0;i<18;i++){
    const a=i*2.399,r=S.O-18+(i%3)*2,x=Math.cos(a)*r,z=Math.sin(a)*r;
    if(!inside(x,z,4)||!free(x,z,2))continue;
    const y=S.hojd(x,z);put(S.W,new T.IcosahedronGeometry(.9,1),leaf,x,y+.6,z);
    for(let j=0;j<3;j++)put(S.W,new T.SphereGeometry(.17,7,5),material(i%2?0xF1D791:0xE7B4BF),x+Math.cos(j*2)*.65,y+.9,z+Math.sin(j*2)*.65);
  }
}
