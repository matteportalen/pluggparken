/* Mitt rum och Mitt hus: gemensam katalog (MPRum). Används av mittrum/ (2D, SVG) och varlden/hus.js (huset i Pluggparken-världen).
   Köp sparas som "rum:plats:id" i matteportalen-mynt (MPMynt.kop i huvud.js), valen i matteportalen-rum {val,t,fx,pos}. pos = egna platser för möbler i huset {plats:[x,z,vridning]} (tid i t["pos:plats"]).
   Ett köp gäller alltså både i 2D-rummet och i huset. Platser med d3:true finns bara i huset (2D-rummet visar dem inte); rum:"lek" = i lekrummet, annars vardagsrummet.
   Varje sak: [id, namn, emoji, pris, säsong (frivillig, se SASONGER i djur.js)]. */
window.MPRum=(function(){
const KEY="matteportalen-rum";
const RUM={
 tapet:{n:"Tapet",items:[["slat","Slät","🟦",0],["prickar","Prickig","🔵",40],["rander","Randig","〰️",40],["rutor","Rutig","🔲",60],["stjarnor","Stjärnor","⭐",120],["regnbage","Regnbåge","🌈",200]]},
 golv:{n:"Golv",items:[["tra","Trägolv","🪵",0],["rutigt","Rutigt golv","🏁",40],["blatt","Blått golv","🟦",50],["gras","Gräsmatta","🌱",120]]},
 fonster:{n:"Fönster",items:[["dag","Dagsljus","☀️",0],["kvall","Solnedgång","🌇",60],["natt","Stjärnnatt","🌙",100],["hav","Havsutsikt","🌊",120],["rymd","Rymden","🪐",250],["sno","Snöig kväll","❄️",100,"jul"]]},
 sang:{n:"Säng",items:[["enkel","Säng","🛏️",0],["hangmatta","Hängmatta","🏝️",120],["himmel","Himmelssäng","👑",150],["raket","Raketsäng","🚀",300]]},
 tak:{n:"I taket",items:[["inget","Inget","➖",0],["lampa","Taklampa","💡",40],["slinga","Ljusslinga","✨",80],["disco","Discokula","🪩",200],["hjartslinga","Hjärtslinga","💕",80,"hjarta"]]},
 matta:{n:"Matta",items:[["ingen","Ingen","➖",0],["rund","Rund matta","🟠",30],["fluffig","Fluffig matta","☁️",50],["regnbage","Regnbågsmatta","🌈",80],["handduk","Badlakan","🏖️",50,"sommar"]]},
 hylla:{n:"Hylla",items:[["ingen","Ingen","➖",0],["bok","Bokhylla","📚",60],["leksak","Leksakshylla","🧸",90],["akvarium","Akvarium","🐠",180],["pumpor","Pumpalyktor","🎃",90,"halloween"]]},
 tavla:{n:"Tavla",items:[["ingen","Ingen","➖",0],["sol","Soltavla","🌞",30],["karta","Världskarta","🗺️",50],["portratt","Porträtt","🖼️",80],["hjarta","Hjärttavla","💖",40,"hjarta"]]},
 vaxt:{n:"Växt",items:[["ingen","Ingen","➖",0],["kaktus","Kaktus","🌵",30],["kruk","Krukväxt","🪴",40],["palm","Palm","🌴",90],["julgran","Julgran","🎄",120,"jul"],["paskris","Påskris","🪶",80,"pask"],["solros","Solros","🌻",60,"sommar"]]},
 husdjur:{n:"Husdjur",items:[["ingen","Inget","➖",0],["hamster","Hamster","🐹",100],["fagel","Fågel i bur","🐦",120],["robot","Liten robot","🤖",150],["spoke","Litet spöke","👻",120,"halloween"],["kyckling","Kyckling","🐥",100,"pask"]]},
 gardin:{n:"Gardiner",d3:true,items:[["rod","Röda","🟥",0],["bla","Blå","🟦",30],["randig","Randiga","🦓",50],["prickig","Prickiga","🔴",50],["regnbage","Regnbåge","🌈",80]]},
 soffa:{n:"Soffa",d3:true,items:[["ingen","Ingen","➖",0],["soffa","Soffa","🛋️",80],["sacco","Saccosäck","🫘",50],["fatolj","Fåtölj","💺",60]]},
 bord:{n:"Bord",d3:true,items:[["ingen","Inget","➖",0],["bord","Bord och stolar","🪑",60],["kalas","Kalasbord","🎂",120]]},
 kyl:{n:"Kylskåp",d3:true,items:[["ingen","Inget","➖",0],["vit","Kylskåp","🧊",80],["retro","Retrokyl","🍒",130]]},
 spis:{n:"Spis",d3:true,items:[["ingen","Ingen","➖",0],["spis","Spis","🍳",80],["pizza","Pizzaugn","🍕",150]]},
 tvatt:{n:"Tvättmaskin",d3:true,items:[["ingen","Ingen","➖",0],["tvatt","Tvättmaskin","🫧",90]]},
 tv:{n:"Tv",d3:true,items:[["ingen","Ingen","➖",0],["tv","Tv","📺",120],["spel","Tv-spel","🎮",200]]},
 kompis:{n:"Kompis",d3:true,items:[["ingen","Ingen","➖",0],["katt","Katt","🐱",150],["hund","Hund","🐶",150],["kanin","Kanin","🐰",120],["skoldpadda","Sköldpadda","🐢",100],["pingvin","Pingvin","🐧",200]]},
 musik:{n:"Musik",d3:true,rum:"lek",items:[["ingen","Inget","➖",0],["piano","Piano","🎹",150],["trummor","Trumset","🥁",150],["xylofon","Xylofon","🎶",90]]},
 lek:{n:"Lek",d3:true,rum:"lek",items:[["ingen","Inget","➖",0],["studsmatta","Studsmatta","🤸",120],["bollhav","Bollhav","🔴",150]]},
 teleskop:{n:"Teleskop",d3:true,rum:"lek",items:[["ingen","Inget","➖",0],["teleskop","Teleskop","🔭",120]]}};
const START={tapet:"slat",golv:"tra",fonster:"dag",sang:"enkel",tak:"inget",matta:"ingen",hylla:"ingen",tavla:"ingen",vaxt:"ingen",husdjur:"ingen",gardin:"rod",soffa:"ingen",bord:"ingen",kyl:"ingen",spis:"ingen",tvatt:"ingen",tv:"ingen",kompis:"ingen",musik:"ingen",lek:"ingen",teleskop:"ingen"};
function las(){try{const d=JSON.parse(localStorage.getItem(KEY)||"{}");return{val:Object.assign({},START,d.val||{}),t:d.t||{},fx:Object.assign({lampa:true,gardin:false},d.fx||{}),pos:d.pos||{}};}catch(e){return{val:Object.assign({},START),t:{},fx:{lampa:true,gardin:false}};}}
function spara(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch(e){}}
const item=(slot,id)=>RUM[slot]&&RUM[slot].items.find(x=>x[0]===id);
const sasong=()=>window.sasongNu?sasongNu():null;
const kanKopa=it=>{const SN=sasong();return !it[4]||(SN&&SN.id===it[4]);};
const owned=(slot,id)=>{const it=item(slot,id);return !it||!it[3]||!!(window.MPMynt&&(MPMynt.get().kopt||[]).includes("rum:"+slot+":"+id));};
return{KEY,RUM,START,las,spara,item,kanKopa,owned,sasong};
})();
