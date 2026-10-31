import bpy, bmesh, json, re, sys, time, os
sys.path.insert(0,os.getcwd())
G=[
("aorta","karl","Aorta (kroppspulsådern)",r"^(Aortic arch|Thoracic aorta|Abdominal aorta|Brachiocephalic trunk|Root of aorta|Ascending aorta)$","#d94a4a",5000,"Kroppens största pulsåder. Den för syrerikt blod från hjärtat ut i kroppen."),
("halspuls","karl","Halspulsådrorna",r"^(Right|Left) common carotid artery$|^(External|Internal) carotid artery","#d94a4a",3000,"Pulsådror som för blod upp till huvudet och hjärnan. Pulsen kan kännas på halsens sida."),
("armben_art","karl","Pulsådror till armar och ben",r"^(Right|Left) subclavian artery|^(Common|External) iliac artery|^Femoral artery|^Popliteal artery|^Axillary artery|^Brachial artery|^Radial artery|^Ulnar artery|^Anterior tibial artery|^Posterior tibial artery","#c43c3c",9000,"Pulsådror som för blod ut i armar och ben."),
("lungartar","karl","Lungartärerna",r"^(Pulmonary trunk|Left pulmonary artery|Right pulmonary artery)$","#6b86c9",2500,"De för syrefattigt blod från hjärtat till lungorna."),
("lungvener","karl","Lungvenerna",r"^(Right|Left) (superior|inferior) pulmonary vein","#e0605a",2500,"De för syrerikt blod från lungorna tillbaka till hjärtat."),
("kranskarl","karl","Kranskärlen",r"^(Right coronary artery|Left coronary artery|Circumflex artery of heart|Anterior interventricular artery|Right inferolateral branch of right coronary artery)","#e0453f",2500,"Hjärtat är en muskel som också behöver blod. Kranskärlen ligger utanpå hjärtat och ger det syre och näring."),
("bukart","karl","Pulsådror till mage och tarmar",r"^(Coeliac trunk|Common hepatic artery|Proper hepatic artery|Splenic artery|Left gastric artery|Gastroduodenal artery|Superior mesenteric artery|Inferior mesenteric artery|Ileocolic artery|Right colic artery|Left colic artery|Marginal artery|Median sacral artery)","#cf3b3b",4500,"Pulsådror som för syrerikt blod till magsäck, lever, tarmar och mjälte."),
("huvudart","karl","Pulsådror i huvudet",r"^(External carotid artery|Facial artery|Superficial temporal artery|Maxillary artery|Occipital artery|Angular artery|Lingual artery|Superior thyroid artery|Vertebral artery)","#e0524f",5000,"Förgreningar av halspulsådern som ger blod till ansikte, käke, tunga och hjärnan. Pulsen kan kännas på tinningen."),
("halven","ven","Hålvenerna",r"^(Superior vena cava|Inferior vena cava)","#3b64c4",4500,"De två största venerna. Den övre tar blod från huvud och armar, den nedre från resten av kroppen. Båda leder till hjärtat."),
("brostvener","ven","Venerna i bröstet",r"^(Right|Left) brachiocephalic vein|^(Right|Left) subclavian vein|^Azygos vein|^Hemi-azygos vein|^Accessory hemi-azygos vein|^(Left|Right) superior intercostal vein","#4a74d6",4500,"Vener som samlar blod från armar, huvud och revbensmellanrum och för det till övre hålvenen."),
("halsvener","ven","Halsvenerna",r"^(Internal jugular vein|External jugular vein|Anterior jugular vein)","#5b86e0",3000,"Vener som för blodet från huvudet ner till hjärtat. Den yttre syns ibland på halsen när man anstränger sig."),
("armvener","ven","Armens vener",r"^(Cephalic vein|Basilic vein|Median cubital vein|Median antebrachial vein|Axillary vein|Brachial veins|Radial veins|Ulnar veins)","#3f6fd1",5000,"Vener som för blodet från händer och armar tillbaka till hjärtat. De syns blå under huden. Vid armvecket tas blodprov."),
("benvener","ven","Benens vener",r"^(Femoral vein|Great saphenous vein|Small saphenous vein|Popliteal vein|Posterior tibial veins|Anterior tibial veins|Deep femoral vein|Fibular veins|Common iliac vein|External iliac vein|Internal iliac vein)","#3a63c8",7000,"Vener som för blodet uppåt från fötter och ben mot hjärtat. Vadmusklerna pressar blodet uppåt när vi går."),
("portader","ven","Portådern och levervenerna",r"^(Hepatic portal vein|Hepatic veins|Superior mesenteric vein|Splenic vein|Inferior mesenteric vein)","#5a4fc4",4500,"Portådern för blodet från tarmarna till levern, som rensar det och tar hand om näringen. Sedan går blodet vidare till hjärtat."),
("hjartaven","ven","Hjärtats vener",r"^(Great cardiac vein|Middle cardiac vein|Coronary sinus)","#4a6fd0",1500,"Vener på hjärtats yta som tar tillbaka blodet från hjärtmuskeln."),
]

t0=time.time()
NC=re.compile(r"kidney|renal|cochlea|semicircular|vestibul|utricle|saccule|ampulla|stapes|malleus|incus|labyrinth|omentum|mesocolon|penis|scrotum|testis|prostate|seminal|epididymis|ductus deferens",re.I)
CONT=["5: Cardiovascular system"]
objs=[]
for cn in CONT:
    for o in bpy.data.collections[cn].all_objects:
        if o.type in("MESH","CURVE") and not o.name.endswith((".j",".g")) and not NC.search(o.name):
            objs.append(o)
sc=bpy.context.scene
tmp=bpy.data.collections.new("tmp"); sc.collection.children.link(tmp)
bysys={}; info=[]
for gid,sysn,sv,rx,col,tgt,txt in G:
    R=re.compile(rx)
    mem=[o for o in objs if R.search(o.name)]
    bm=bmesh.new(); n=0
    for o in mem:
        dg=bpy.context.evaluated_depsgraph_get()
        me=bpy.data.meshes.new_from_object(o.evaluated_get(dg),depsgraph=dg)
        if len(me.polygons)==0: bpy.data.meshes.remove(me); continue
        me.transform(o.matrix_world); bm.from_mesh(me); bpy.data.meshes.remove(me); n+=1
    if n==0:
        print("TOMT",gid,flush=True); bm.free(); continue
    me=bpy.data.meshes.new(gid); bm.to_mesh(me); bm.free()
    tot=len(me.polygons)
    ob=bpy.data.objects.new(gid,me); tmp.objects.link(ob)
    if tot>tgt:
        m=ob.modifiers.new("d","DECIMATE"); m.ratio=tgt/tot
        dg=bpy.context.evaluated_depsgraph_get()
        me2=bpy.data.meshes.new_from_object(ob.evaluated_get(dg),depsgraph=dg)
        ob.modifiers.clear(); ob.data=me2
    f=len(ob.data.polygons)
    print(gid,"delar",n,"från",tot,"till",f,round(time.time()-t0),"s",flush=True)
    bysys.setdefault(sysn,[]).append(ob)
    info.append({"id":gid,"s":sysn,"sv":sv,"c":col,"t":txt,"f":f})
for sysn,L in bysys.items():
    bpy.ops.object.select_all(action='DESELECT')
    for o in L: o.select_set(True)
    bpy.context.view_layer.objects.active=L[0]
    bpy.ops.export_scene.gltf(filepath=f"out5/{sysn}.glb",use_selection=True,export_format='GLB',export_apply=False,
        export_materials='NONE',export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=7,export_yup=True)
json.dump(info,open("out5/grupper.json","w"),ensure_ascii=False)
print("klart",round(time.time()-t0),"s")
