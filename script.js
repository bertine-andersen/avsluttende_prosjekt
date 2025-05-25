const produkter = [
  {
    navn: "GABRIELLE CHANEL",
    beskrivelse: "En floral, solfylt og vellystig tolkning komponert av Olivier Polge.",
    pris: 149.99,
    bilde: "https://www.kicks.no/globalassets/integrationimages/31458912062032.jpg"
  },
  {
    navn: "BLEU DE CHANEL",
    beskrivelse: "En hyllest til maskulin frihet uttrykt i en aromatisk, treaktig duft.",
    pris: 129.99,
    bilde: "https://fredrikoglouisa.no/wp-content/uploads/2025/05/3145891073508.jpg"
  },
  {
    navn: "DIOR Sauvage EdP",
    beskrivelse: "Frisk, krydret duft perfekt for kvelden.",
    pris: 139.99,
    bilde: "https://no.swedishface.com/image/cache/data/dior/dior-sauvage-edp-60ml-900x900.jpg"
  },
  {
    navn: "Versace Eros Eau De Toilette",
    beskrivelse: "Frisk og maskulin duft for den sterke og lidenskapelige mannen som er sin egen 'master in command'.",
    pris: 89.99,
    bilde: "https://pricespy-75b8.kxcdn.com/product/standard/280/1652942.jpg"
  },
  {
    navn: "Valentino Born in Roma",
    beskrivelse: "En Haute Couture blomsterduft, modernisert med en overdose av tre",
    pris: 139.99,
    bilde: "https://cdn.tax-free.no/medias/440X440-134547243071217319611412892.jpg?context=bWFzdGVyfHByb2R1Y3RfcGljdHVyZXN8NjMyNDh8aW1hZ2UvanBlZ3xhRFF3TDJoak9TODVPREUwTnpZeU9EZ3hNRFUwTHpRME1GZzBOREJmTVRNME5UUTNNalF6TURjeE1qRTNNekU1TmpFeE5ERXlPRGt5TG1wd1p3fGM5OWFjYjVlOWU1YzRiNGRmMzU3YzM4ZDY4MzZkNWU4MzY2ODk3OTUzYzc5MjRjYThkMWJlZWE4YWFhNzIzYjc&cacheHash=6A3FDADC"
  },
  {
    navn: "Burberry Goddess Eau De Parfum",
    beskrivelse: "Vegansk gourmandduft med vanilje og lavendel.",
    pris: 109.99,
    bilde: "https://www.kicks.no/globalassets/integrationimages/3616302020652.jpeg?ref=3567382&hasAlpha=false"
  },
];

let handlekurv = [];

if (localStorage.getItem("handlekurv")) {
  handlekurv = JSON.parse(localStorage.getItem("handlekurv"));
}

function visProdukter() {
  const liste = document.getElementById("product-list");
  liste.innerHTML = "";

  for (let i = 0; i < produkter.length; i++) {
    const p = produkter[i];

    const produktDiv = document.createElement("div");
    produktDiv.className = "masterdiv";
    produktDiv.innerHTML = `
      <img src="${p.bilde}" alt="${p.navn}">
      <div class="innhold">
        <h2>${p.navn}</h2>
        <p>${p.beskrivelse}</p>
        <p class="sale">$${p.pris.toFixed(2)}</p>
        <button onclick="leggTilIKurv(${i})"><i class="fas fa-cart-plus"></i> Legg i handlekurv</button>
      </div>
    `;
    liste.appendChild(produktDiv);
  }
}

function leggTilIKurv(indeks) {
  let funnet = false;

  for (let i = 0; i < handlekurv.length; i++) {
    if (handlekurv[i].navn === produkter[indeks].navn) {
      handlekurv[i].antall++;
      funnet = true;
      break;
    }
  }

  if (!funnet) {
    const nyVare = {
      navn: produkter[indeks].navn,
      pris: produkter[indeks].pris,
      antall: 1
    };
    handlekurv.push(nyVare);
  }

  lagreHandlekurv();
  visHandlekurv();
}

function fjernFraKurv(indeks) {
  if (handlekurv[indeks].antall > 1) {
    handlekurv[indeks].antall--;
  } else {
    handlekurv.splice(indeks, 1);
  }

  lagreHandlekurv();
  visHandlekurv();
}

function tømHandlekurv() {
  handlekurv = [];
  lagreHandlekurv();
  visHandlekurv();
}

function lagreHandlekurv() {
  localStorage.setItem("handlekurv", JSON.stringify(handlekurv));
}

function visHandlekurv() {
  const liste = document.getElementById("cart-list");
  const teller = document.getElementById("cart-count");
  const tomMelding = document.getElementById("empty-cart-msg");

  liste.innerHTML = "";
  let total = 0;
  let antall = 0;

  for (let i = 0; i < handlekurv.length; i++) {
    const vare = handlekurv[i];
    total += vare.pris * vare.antall;
    antall += vare.antall;

    const li = document.createElement("li");
    li.innerHTML = `${vare.navn} x${vare.antall} - $${(vare.pris * vare.antall).toFixed(2)} 
      <button onclick="fjernFraKurv(${i})">Fjern</button>`;
    liste.appendChild(li);
  }

  if (handlekurv.length > 0) {
    const totalLi = document.createElement("li");
    totalLi.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    liste.appendChild(totalLi);
    tomMelding.style.display = "none";
  } else {
    tomMelding.style.display = "block";
  }

  teller.textContent = antall;
}

document.getElementById("toggle-cart").addEventListener("click", function () {
  document.getElementById("cart-items").classList.toggle("åpen");
});

document.getElementById("clear-cart-btn").addEventListener("click", tømHandlekurv);

document.getElementById("lukk-cart").addEventListener("click", function () {
  document.getElementById("cart-items").classList.remove("åpen");
});

visProdukter();
visHandlekurv();