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
    beskrivelse: "En Haute Couture blomsterduft, modernisert med en overdose av tre.",
    pris: 139.99,
    bilde: "https://cdn.tax-free.no/medias/440X440-134547243071217319611412892.jpg?context=bWFzdGVyfHByb2R1Y3RfcGljdHVyZXN8NjMyNDh8aW1hZ2UvanBlZ3xhRFF3TDJoak9TODVPREUwTnpZeU9EZ3hNRFUwTHpRME1GZzBOREJmTVRNME5UUTNNalF6TURjeE1qRTNNekU1TmpFeE5ERXlPRGt5TG1wd1p3fGM5OWFjYjVlOWU1YzRiNGRmMzU3YzM4ZDY4MzZkNWU4MzY2ODk3OTUzYzc5MjRjYThkMWJlZWE4YWFhNzIzYjc&cacheHash=6A3FDADC"
  },
  {
    navn: "Burberry Goddess Eau De Parfum",
    beskrivelse: "Vegansk gourmandduft med vanilje og lavendel.",
    pris: 109.99,
    bilde: "https://www.kicks.no/globalassets/integrationimages/3616302020652.jpeg"
  },
  {
    navn: "JEAN PAUL GAULTIER LE MALE ELIXIR PARFUM",
    beskrivelse: "En lidenskapelig og forlokkende parfyme.",
    pris: 119.99,
    bilde: "https://fredrikoglouisa.no/wp-content/uploads/2023/07/8435415076937.jpg"
  },
  {
    navn: "HUGO BOSS THE SCENT FOR HER EDP",
    beskrivelse: "En forførende og elegant parfyme med fresia, osmanthus og kakaobønner til henne.",
    pris: 79.99,
    bilde: "https://fredrikoglouisa.no/wp-content/uploads/2024/10/8005610298863.jpg"
  }
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
    li.innerHTML = `
      ${vare.navn} x${vare.antall} - $${(vare.pris * vare.antall).toFixed(2)}
      <button onclick="fjernFraKurv(${i})">Fjern</button>
    `;
    liste.appendChild(li);
  }

  const checkoutBtn = document.getElementById("checkout-btn");

  const totalContainer = document.getElementById("cart-total-container");

  if (handlekurv.length > 0) {
    tomMelding.style.display = "none";
    checkoutBtn.style.display = "block";
    totalContainer.style.display = "block";
    totalContainer.innerHTML = `
      <p id="cart-total">Total: <strong>$${total.toFixed(2)}</strong></p>
    `;
  } else {
    tomMelding.style.display = "block";
    checkoutBtn.style.display = "none";
    totalContainer.style.display = "none";
  }

  teller.textContent = antall;
}

document.getElementById("toggle-cart").addEventListener("click", function () {
  document.getElementById("cart-items").classList.toggle("åpen");
});

document.getElementById("clear-cart-btn").addEventListener("click", () => {
  const bekreft = confirm("Er du sikker på at du vil tømme handlekurven?");
  if (bekreft) tømHandlekurv();
});

document.getElementById("lukk-cart").addEventListener("click", function () {
  document.getElementById("cart-items").classList.remove("åpen");
});

const toggleCartBtn = document.getElementById("toggle-cart");
const cart = document.getElementById("cart-items");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("lukk-cart");

toggleCartBtn.addEventListener("click", () => {
  cart.classList.add("åpen");
  overlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  cart.classList.remove("åpen");
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  cart.classList.remove("åpen");
  overlay.style.display = "none";
});

visProdukter();
visHandlekurv();