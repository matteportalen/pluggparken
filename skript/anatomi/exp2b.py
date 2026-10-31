import bpy, bmesh, json, re, sys, time, os
sys.path.insert(0,os.getcwd())
from spec import G
t0=time.time()
NC=re.compile(r"kidney|renal|cochlea|semicircular|vestibul|utricle|saccule|ampulla|stapes|malleus|incus|labyrinth|omentum|mesocolon|penis|scrotum|testis|prostate|seminal|epididymis|ductus deferens",re.I)
CONT=["1: Skeletal system","4: Muscular system","5: Cardiovascular system","7: Nervous system & Sense organs","8: Visceral systems"]
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
    bpy.ops.export_scene.gltf(filepath=f"out2b/{sysn}.glb",use_selection=True,export_format='GLB',export_apply=False,
        export_materials='NONE',export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=7,export_yup=True)
json.dump(info,open("out2b/grupper.json","w"),ensure_ascii=False)
print("klart",round(time.time()-t0),"s")
