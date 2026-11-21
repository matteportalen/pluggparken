// Small Swedish spelling-to-sound front end for Chimera. Approximate, not a pronunciation dictionary.
const WORDS={hej:'h ɛ j',jag:'j ɑː',du:'d ʉː',vi:'v iː',ni:'n iː',de:'d ɔ m',det:'d eː',är:'ɛː r',en:'ɛ n',ett:'ɛ t',och:'ɔ k',att:'a t',vill:'v ɪ l',med:'m eː d',mig:'m ɛ j',dig:'d ɛ j',sig:'s ɛ j',vad:'v ɑː d',var:'v ɑː r',har:'h ɑː r',här:'h ɛː r',där:'d ɛː r',jätte:'j ɛ t ɛ',tack:'t a k',mamma:'m a m a',pappa:'p a p a',hejda:'h ɛ j d oː',hejdå:'h ɛ j d oː',sol:'s uː l',solen:'s uː l ɛ n',katt:'k a t',katten:'k a t ɛ n',hund:'h ɵ n d',hunden:'h ɵ n d ɛ n',leka:'l eː k a',heter:'h eː t ɛ r',kul:'k ʉː l'};
const VOWELS='aeiouyåäö';
const LONG={a:'ɑ',e:'e',i:'i',o:'u',u:'ʉ',y:'y',å:'o',ä:'ɛ',ö:'ø'};
const SHORT={a:'a',e:'ɛ',i:'ɪ',o:'ɔ',u:'ɵ',y:'y',å:'ɔ',ä:'ɛ',ö:'œ'};
export function wordSounds(word){
 if(WORDS[word])return WORDS[word].split(' ');
 const result=[];let stressed=false;
 for(let i=0;i<word.length;i++){
  const rest=word.slice(i),c=word[i],soft=/^[eiyäö]/.test(word[i+1]||'');
  const cluster=[['skj','ʃ'],['stj','ʃ'],['sch','ʃ'],['sj','ʃ'],['tj','ɕ'],['ng','ŋ'],['ck','k'],['lj','j'],['hj','j'],['dj','j'],['gj','j']].find(([s])=>rest.startsWith(s));
  if(cluster){result.push(cluster[1]);i+=cluster[0].length-1;continue}
  if(rest.startsWith('sk')&&/^[eiyäö]/.test(word[i+2]||'')){result.push('ʃ');i++;continue}
  if(VOWELS.includes(c)){
   const consonants=(word.slice(i+1).match(/^[^aeiouyåäö]+/)||[''])[0].length;
   const long=!stressed&&consonants<2;result.push((long?LONG:SHORT)[c]+(long?'ː':''));stressed=true;
  }else{const sound=c==='k'&&soft?'ɕ':c==='g'&&soft?'j':({c:soft?'s':'k',q:'k',w:'v',z:'s',x:'k s'}[c]||c);result.push(...sound.split(' '));if(word[i+1]===c)i++;}
 }
 return result;
}
export function swedishPhrases(text,tokenize){
 const chunks=text.toLowerCase().normalize('NFC').match(/[a-zåäö\s-]+[.!?,;:]*/g)||[];
 return chunks.map(chunk=>{const words=chunk.match(/[a-zåäö]+/g)||[];const segments=words.flatMap(word=>{
  // Chimera lacks Swedish central rounded vowels: use its closest supported rounded positions.
  const ipa=wordSounds(word).join(' ').replaceAll('ʉ','y').replaceAll('ɵ','œ').replaceAll('ɕ','ʃ');
  const segs=tokenize(ipa);if(segs.length)segs[segs.length-1].wordEnd=true;return segs;
 });return {segments,intonation:chunk.includes('?')?'question':'statement',pause:.2}}).filter(p=>p.segments.length);
}
