/* Delat klot för filmerna: jorden som riktigt klot ur Solar System Scope-texturerna (CC BY 4.0) i ovriga/solsystemet/bilder/.
   MPKlot.jorden(rot) ger en canvas (300 × 300) med dagkartan, ljus från vänster; rot = rotation i bildpunkter (0–1023). */
(function(){
const ROOT=(()=>{try{return new URL("./",document.currentScript.src).href;}catch(e){return "/";}})();
const TEX=ROOT+"../ovriga/solsystemet/bilder/";
const IMG={};function img(n){if(!IMG[n]){const i=new Image();i.src=TEX+n;IMG[n]=i;}return IMG[n];}
function texData(n){const i=img(n);if(!i.complete||!i.naturalWidth)return null;if(!i._d){const c=document.createElement("canvas");c.width=1024;c.height=512;const g=c.getContext("2d");g.drawImage(i,0,0,1024,512);i._d=g.getImageData(0,0,1024,512).data;}return i._d;}
function makeSphere(N){const n=N*N,rowIdx=new Uint16Array(n),lonIdx=new Uint16Array(n),shade=new Float32Array(n),alpha=new Uint8Array(n),R=N/2-1;
  for(let y=0;y<N;y++)for(let xx=0;xx<N;xx++){const nx=(xx-N/2+.5)/R,ny=(y-N/2+.5)/R,r2=nx*nx+ny*ny,p=y*N+xx;if(r2>1){alpha[p]=0;continue;}
    const nz=Math.sqrt(1-r2),lat=Math.asin(-ny),lon=Math.atan2(nx,nz);rowIdx[p]=Math.max(0,Math.min(511,Math.round((.5-lat/Math.PI)*511)));
    lonIdx[p]=Math.round(((lon/(Math.PI*2))+.5)*1023)&1023;
    const lx=-.75,lz=.66,d=Math.max(0,nx*lx+nz*lz);shade[p]=.06+.94*Math.pow(d,.8);alpha[p]=r2>.985?Math.round(255*(1-r2)/.015):255;}
  const cv=document.createElement("canvas");cv.width=N;cv.height=N;const g=cv.getContext("2d"),id=g.createImageData(N,N);
  return{N,cv,g,id,rowIdx,lonIdx,shade,alpha,draw(tex,rot,lit){const d=texData(tex);if(!d)return false;const o=id.data;
    for(let p=0;p<n;p++){const a=alpha[p],q=p*4;if(!a){o[q+3]=0;continue;}const s=lit===false?1:shade[p],u=(lonIdx[p]+rot)&1023,t=(rowIdx[p]*1024+u)*4;o[q]=d[t]*s;o[q+1]=d[t+1]*s;o[q+2]=d[t+2]*s;o[q+3]=a;}
    g.putImageData(id,0,0);return true;}};}
let EARTH=null;img("2k_earth_daymap.jpg");
window.MPKlot={jorden(rot){if(!EARTH)EARTH=makeSphere(300);return EARTH.draw("2k_earth_daymap.jpg",Math.round(rot)&1023,true)?EARTH.cv:null;}};
})();
