/* Klassiska mattmönster (vit drar och sätter matt i ett drag). Kontrolleras av motorn i node (se CLAUDE.md). */
(function(root){
const MONSTER=[
 {id:'ryggrad',namn:'Ryggradsmatt',text:'Kungen sitter instängd bakom sina egna bönder på sista raden. Ett torn eller en dam på raden ger matt!',
  pcs:{g8:'k',f7:'p',g7:'p',h7:'p',a1:'R',g1:'K'}},
 {id:'ryggrad2',namn:'Ryggradsmatt med dam',text:'Samma mönster, men nu med damen. Bönderna framför kungen hjälper dig, för kungen kan inte gå dit.',
  pcs:{g8:'k',f7:'p',g7:'p',h7:'p',d1:'Q',g1:'K'}},
 {id:'mitten',namn:'Ryggradsmatt i mitten',text:'Kungen står kvar i mitten och bönderna stänger inne honom. Tornet tar hela sista raden.',
  pcs:{e8:'k',d7:'p',e7:'p',f7:'p',a1:'R',g1:'K'}},
 {id:'tva_torn',namn:'Trappmatt',text:'Två torn (eller damer) trycker ner kungen rad för rad. Ett torn stänger sjunde raden, det andra ger matt på åttonde.',
  pcs:{h8:'k',a7:'R',b1:'R',g1:'K'}},
 {id:'tva_damer',namn:'Två damer',text:'Två damer fungerar som trappan: den ena stänger sjunde raden och den andra ger matt på åttonde.',
  pcs:{g8:'k',a7:'Q',b1:'Q',g1:'K'}},
 {id:'dam_kung',namn:'Damen och kungen',text:'Damen går bredvid kungen och din egen kung skyddar henne. Då kan svarts kung inte ta henne.',
  pcs:{h8:'k',f6:'K',a7:'Q'}},
 {id:'kant',namn:'Kungen hjälper damen',text:'Din kung tar bort flyktrutorna och damen ger schack bredvid svarts kung. Kungen skyddar damen så att hon inte kan tas.',
  pcs:{e8:'k',e6:'K',h7:'Q'}},
 {id:'opposition',namn:'Kungarna mot varandra',text:'Din kung täcker rutorna framför svarts kung. Tornet ger schack från sidan och kungen kan inte fly.',
  pcs:{e8:'k',e6:'K',h1:'R'}},
 {id:'horn',namn:'Matt i hörnet',text:'Kungen i hörnet har få rutor. Din kung tar de två rutorna intill, och tornet ger schack längs sista raden.',
  pcs:{a8:'k',b6:'K',h1:'R'}},
 {id:'kvav',namn:'Kvävmatt',text:'Kungen är kvävd av sina egna pjäser. Bara springaren kan ge schack, för den hoppar över allt och ingen kan ta den!',
  pcs:{h8:'k',g8:'r',g7:'p',h7:'p',e5:'N',g1:'K'}},
 {id:'springare_horn',namn:'Springaren i hörnet',text:'Kungen i hörnet är instängd av sina egna pjäser. Springarens hopp ger schack och ingen kan ta den.',
  pcs:{a8:'k',b8:'r',a7:'p',b7:'p',b5:'N',g1:'K'}},
 {id:'arabisk',namn:'Arabisk matt',text:'Tornet ger schack i hörnet och springaren skyddar tornet. Springaren täcker också flyktrutan.',
  pcs:{h8:'k',f6:'N',a7:'R',a1:'K'}},
 {id:'dam_lopare',namn:'Damen och löparen',text:'Löparen står bakom damen på samma diagonal och skyddar henne. Damen tar bonden och ger matt.',
  pcs:{h8:'k',g7:'p',d4:'Q',b2:'B',g1:'K'}},
 {id:'bonde',namn:'Bonden ger matt',text:'Även en bonde kan ge matt! Den tar steget framåt och hotar kungen snett, och springaren skyddar bonden.',
  pcs:{g8:'k',f8:'n',h8:'r',g7:'p',h7:'p',f6:'P',g5:'N',g1:'K'}},
 {id:'skol',namn:'Skolmatten',text:'Ett klassiskt tricks: damen och löparen siktar båda på svarts svagaste ruta, f7. Damen tar bonden, löparen skyddar henne.',
  pcs:{a8:'r',c8:'b',d8:'q',e8:'k',f8:'b',h8:'r',c6:'n',f6:'n',a7:'p',b7:'p',c7:'p',d7:'p',e5:'p',f7:'p',g7:'p',h7:'p',
       a1:'R',b1:'N',c1:'B',e1:'K',g1:'N',h1:'R',c4:'B',h5:'Q',a2:'P',b2:'P',c2:'P',d2:'P',e4:'P',f2:'P',g2:'P',h2:'P'}}
];
if(typeof module!=='undefined'&&module.exports)module.exports=MONSTER;else root.MPSchackMonster=MONSTER;
})(typeof window!=='undefined'?window:globalThis);
