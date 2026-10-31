import bpy, bmesh, json, re, sys, time, os
sys.path.insert(0,os.getcwd())
G=[("hud","hud","Huden",r"^(?!.*(Urogenital|Pubic|Anal region|Perine)).*$","#e9b99a",40000,"Huden är kroppens största organ. Den skyddar mot smuts, bakterier och kyla, och den känner av beröring, värme och smärta.")]
t0=time.time()
NC=re.compile(r"kidney|renal|cochlea|semicircular|vestibul|utricle|saccule|ampulla|stapes|malleus|incus|labyrinth|omentum|mesocolon|penis|scrotum|testis|prostate|seminal|epididymis|ductus deferens",re.I)
CONT=["9: Regions of human body"]
objs=[]
for cn in CONT:
    for o in bpy.data.collections[cn].all_objects:
        if o.type in("MESH","CURVE") and not o.name.endswith((".j",".g")) and not NC.search(o.name):
            objs.append(o)
sc=bpy.context.scene
Y0=[]
for o in objs:
    if re.search(r"^(Hypogastric|Inguinal) region",o.name):
        Y0+= [(o.matrix_world@v.co).y for v in o.data.vertices if (o.matrix_world@v.co).z<0.95]
YF=min(Y0); print("YF",YF,flush=True)
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
        me.transform(o.matrix_world)
        if re.search(r"^Urogenital",o.name):
            for v in me.vertices:
                b=-0.072-0.03*min(1,max(0,(v.co.z-0.72)/0.12))
                if v.co.y<b: v.co.y=b
        bm.from_mesh(me); bpy.data.meshes.remove(me); n+=1
    if n==0:
        print("TOMT",gid,flush=True); bm.free(); continue
    bmesh.ops.remove_doubles(bm,verts=bm.verts,dist=0.0006)
    HV=[v for v in bm.verts if v.co.z>1.655 and abs(v.co.x)<0.12]
    print("HAIRVERTS",len(HV),flush=True)
    from mathutils import Vector
    for _ in range(80):
        new={}
        for v in HV:
            nb=[e.other_vert(v) for e in v.link_edges]
            if nb: new[v]=sum((n.co for n in nb),Vector())/len(nb)
        for v,c in new.items(): v.co=v.co.lerp(c,0.7)
    bm.edges.ensure_lookup_table()
    be=[e for e in bm.edges if len(e.link_faces)==1 and all(0.75<v.co.z<1.02 and abs(v.co.x)<0.12 for v in e.verts)] if False else []
    ys=[(v.co.x,v.co.y,v.co.z) for v in bm.verts]
    print("BBOX",min(y[0] for y in ys),max(y[0] for y in ys),min(y[1] for y in ys),max(y[1] for y in ys),min(y[2] for y in ys),max(y[2] for y in ys),flush=True)
    HB=[e for e in bm.edges if len(e.link_faces)==1 and all(abs(v.co.x)<0.12 and 0.62<v.co.z<0.95 for v in e.verts)]
    print("HOLEEDGES",len(HB),flush=True)
    r=bmesh.ops.holes_fill(bm,edges=HB,sides=80)
    print("FILLED",len(r["faces"]),flush=True)
    bmesh.ops.recalc_face_normals(bm,faces=bm.faces)
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
    bpy.ops.export_scene.gltf(filepath=f"out4/{sysn}.glb",use_selection=True,export_format='GLB',export_apply=False,
        export_materials='NONE',export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=7,export_yup=True)
json.dump(info,open("out4/grupper.json","w"),ensure_ascii=False)
print("klart",round(time.time()-t0),"s")
