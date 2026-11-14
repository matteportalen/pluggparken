const mytamnen = document.querySelector("#mytamnen");
const amnesval = document.querySelector("#amnesval");
const mytrunda = document.querySelector("#mytrunda");
const mytinnehall = document.querySelector("#mytinnehall");
const mytstatus = document.querySelector("#mytstatus");
const mytprogress = document.querySelector("#mytprogress");
let runda;

mytamnen.innerHTML = MYTAMNEN.map(amne => `
  <a class="kort" href="#${amne.id}" style="--c:${amne.farg};--bi:url(${amne.omslag})">
    <b>${amne.titel}</b>
    <small>${amne.pastaenden.length} påståenden</small>
  </a>`).join("");

function startaRunda(amne) {
  runda = {amne, index: 0, ratt: 0};
  mytrunda.style.setProperty("--c", amne.farg);
  mytprogress.max = amne.pastaenden.length;
  mytprogress.value = 0;
  visaPastaende();
}

function bildhtml(pastaende, amne) {
  let bild = pastaende.bild;
  if (pastaende.foto !== undefined) {
    const foto = BILDER[amne.id][pastaende.foto];
    bild = {url: "../bilder/" + foto.f, kred: foto.k, kalla: foto.s};
  }
  if (!bild) return "";
  return `<figure class="myt-bild">
    <img src="${bild.url}" alt="${pastaende.alt || ""}">
    <figcaption>${bild.kalla ? `<a href="${bild.kalla}">${bild.kred}</a>` : bild.kred}</figcaption>
  </figure>`;
}

const synprov = {
  kontrast: `<div class="myt-kontrast" role="img" aria-label="Två likadana grå rutor, en på ljus och en på mörk bakgrund">
    <div><span></span></div><div><span></span></div>
  </div>
  <button class="btn myt-jamfor" aria-pressed="false">Ta bort bakgrunderna</button>`,
  blindflack: `<p>Blunda med vänster öga och titta på krysset med höger. Håll blicken på krysset medan du långsamt ändrar avståndet till skärmen. Kan du få pricken att försvinna?</p>
  <div class="myt-blindflack" role="img" aria-label="Ett kryss till vänster och en prick till höger"><span>✚</span><span>●</span></div>`
};

function visaPastaende() {
  const {amne, index} = runda;
  const pastaende = amne.pastaenden[index];
  const antal = amne.pastaenden.length;
  mytstatus.textContent = `${amne.titel} · ${index + 1} av ${antal}`;
  const bild = bildhtml(pastaende, amne);
  mytinnehall.innerHTML = `<article class="myt-panel">
    ${pastaende.bildEfterSvar ? "" : bild}
    <h2 id="mytfraga" tabindex="-1">${pastaende.fraga}</h2>
    <div class="myt-svar">
      <button class="btn" data-svar="sant">Sant</button>
      <button class="btn" data-svar="myt">Myt</button>
    </div>
    <div class="myt-facit" hidden></div>
    <div class="slut"><button class="btn guld" id="mytnasta" hidden>${index + 1 === antal ? "Se resultatet" : "Nästa påstående →"}</button></div>
  </article>`;

  const svarsknappar = [...mytinnehall.querySelectorAll("[data-svar]")];
  const facit = mytinnehall.querySelector(".myt-facit");
  const nasta = mytinnehall.querySelector("#mytnasta");
  for (const knapp of svarsknappar) {
    knapp.onclick = () => {
      const ratt = knapp.dataset.svar === pastaende.svar;
      runda.ratt += Number(ratt);
      mytprogress.value = index + 1;

      for (const val of svarsknappar) {
        val.disabled = true;
        if (val.dataset.svar === pastaende.svar) val.classList.add("ratt");
        else if (val === knapp) val.classList.add("fel");
      }

      facit.innerHTML = `<strong>${ratt ? "Rätt!" : "Inte riktigt."} ${pastaende.svar === "sant" ? "Det är sant." : "Det är en myt."}</strong>
        <p>${pastaende.forklaring}</p>
        ${pastaende.bildEfterSvar ? bild : ""}
        ${synprov[pastaende.prov] || ""}
        ${pastaende.kalla ? `<a href="${pastaende.kalla}">Läs mer hos källan</a>` : ""}`;
      const jamfor = facit.querySelector(".myt-jamfor");
      if (jamfor) {
        const kontrast = facit.querySelector(".myt-kontrast");
        jamfor.onclick = () => {
          const samma = kontrast.classList.toggle("samma-bakgrund");
          jamfor.setAttribute("aria-pressed", samma);
          kontrast.setAttribute("aria-label", samma ? "Två likadana grå rutor på samma bakgrund" : "Två likadana grå rutor, en på ljus och en på mörk bakgrund");
        };
      }
      facit.hidden = false;
      facit.tabIndex = -1;
      nasta.hidden = false;
      facit.focus();
    };
  }
  nasta.onclick = () => {
    runda.index++;
    if (runda.index === antal) visaResultat();
    else visaPastaende();
  };
  fokuseraFraga();
}

function fokuseraFraga() {
  window.scrollTo(0, 0);
  mytinnehall.querySelector("#mytfraga").focus({preventScroll: true});
}

function visaResultat() {
  const {amne, ratt} = runda;
  mytstatus.textContent = amne.titel;
  mytinnehall.innerHTML = `<article class="myt-panel">
    <h2 id="mytfraga" tabindex="-1">${ratt} av ${amne.pastaenden.length} rätt</h2>
    <div class="slut">
      <button class="btn guld" id="mytigen">Spela igen</button>
      <a class="btn" href="#">Välj ett annat ämne</a>
    </div>
  </article>`;
  mytinnehall.querySelector("#mytigen").onclick = () => startaRunda(amne);
  fokuseraFraga();
}

function visaValdSida() {
  const amne = MYTAMNEN.find(a => "#" + a.id === location.hash);
  const forraAmnet = runda?.amne.id;
  amnesval.hidden = Boolean(amne);
  mytrunda.hidden = !amne;
  if (amne) startaRunda(amne);
  else {
    runda = null;
    mytinnehall.replaceChildren();
    if (forraAmnet) mytamnen.querySelector(`[href="#${forraAmnet}"]`).focus();
  }
}

window.addEventListener("hashchange", visaValdSida);
visaValdSida();
