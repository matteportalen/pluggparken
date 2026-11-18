"""Lägger lärarens fem A4-seriemallar (skript/mallar/seriemallar-a4.pdf) FÖRST i skriv-ut/seriesidor.pdf (sidorna 1–5, sedan de 20 egna sidorna).
Kör efter `node skript/seriesidor.cjs`:  python3 skript/seriesidor-lagg-till-mallar.py   (kräver PyMuPDF: pip install pymupdf)
Vektorerna behålls (inget rastras). Sidor som inte är A4 skalas in och centreras. Går att köra flera gånger: de 20 egna sidorna är alltid de sista 20."""
import fitz, os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
ut=os.path.join(R,'skriv-ut','seriesidor.pdf')
EGNA=20
gammal=fitz.open(ut)
mall=fitz.open(os.path.join(R,'skript','mallar','seriemallar-a4.pdf'))
W,H=fitz.paper_size('a4')
ny=fitz.open()
for sida in mall:
    p=ny.new_page(width=W,height=H)
    k=min(W/sida.rect.width,H/sida.rect.height)
    w,h=sida.rect.width*k,sida.rect.height*k
    p.show_pdf_page(fitz.Rect((W-w)/2,(H-h)/2,(W+w)/2,(H+h)/2),mall,sida.number)
ny.insert_pdf(gammal,from_page=len(gammal)-EGNA,to_page=len(gammal)-1)
ny.save(ut+'.tmp',garbage=3,deflate=True);ny.close();gammal.close();os.replace(ut+'.tmp',ut)
print('sidor:',len(fitz.open(ut)))
