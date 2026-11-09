#!/usr/bin/env python3
"""Konverterar PNG-bilder i en mapp till WebP (kvalitet 90, behåller transparens).
Användning: python3 skript/till-webp.py spel/glodvaktaren/bilder
Ändrar ingen kod: byt .png till .webp i koden själv och ta bort PNG-originalen (de finns i git)."""
import sys, glob, os
from PIL import Image
mapp = sys.argv[1] if len(sys.argv) > 1 else "."
for p in sorted(glob.glob(os.path.join(mapp, "*.png"))):
    im = Image.open(p); w = p[:-4] + ".webp"
    im.save(w, "WEBP", quality=90, method=6)
    assert Image.open(w).size == im.size, p
    print(f"{os.path.basename(p):34s} {os.path.getsize(p)//1024:5d} -> {os.path.getsize(w)//1024:4d} kB")
