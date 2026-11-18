"""Lägger lärarens fem A4-seriemallar (skript/mallar/seriemallar-a4.pdf) sist i skriv-ut/seriesidor.pdf som A4-sidor.
Kör efter `node skript/seriesidor.cjs`:  python3 skript/seriesidor-lagg-till-mallar.py   (kräver PyMuPDF: pip install pymupdf)
Vektorerna behålls (inget rastras). Sidor som inte är A4 skalas in och centreras."""
import fitz, os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
ut=os.path.join(R,'skriv-ut','seriesidor.pdf')
d=fitz.open(ut)
if len(d)>20:
    d.delete_pages(20,len(d)-1)   # gör om rent om filen redan har mallar
mall=fitz.open(os.path.join(R,'skript','mallar','seriemallar-a4.pdf'))
W,H=fitz.paper_size('a4')
for sida in mall:
    ny=d.new_page(width=W,height=H)
    k=min(W/sida.rect.width,H/sida.rect.height)           # A4 -> 1,0
    w,h=sida.rect.width*k,sida.rect.height*k
    ny.show_pdf_page(fitz.Rect((W-w)/2,(H-h)/2,(W+w)/2,(H+h)/2),mall,sida.number)
d.save(ut+'.tmp',garbage=3,deflate=True);d.close();os.replace(ut+'.tmp',ut)
print('sidor:',len(fitz.open(ut)))
