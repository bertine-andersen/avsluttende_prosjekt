var produkter = [
    {
      navn: "Gabrielle Essence Eau De Parfum",
      beskrivelse: "En floral og luksuriøs parfyme laget av Olivier Polge.",
      pris: 149.99,
      bilde: "images/image-product-desktop.jpg"
    },
    {
      navn: "Bleu de Chanel",
      beskrivelse: "En tidløs duft med aromatiske toner.",
      pris: 129.99,
      bilde: "images/bleu.jpg"
    },
    {
      navn: "Dior Sauvage",
      beskrivelse: "Frisk, krydret duft perfekt for kvelden.",
      pris: 139.99,
      bilde: "images/sauvage.jpg"
    }
  ];
  
  // Handlekurv
  var handlekurv = [];
  
  // Hent lagret handlekurv fra localStorage hvis den finnes
  if (localStorage.getItem("handlekurv")) {
    handlekurv = JSON.parse(localStorage.getItem("handlekurv"));
  }
  
  // Vis produkter på siden
  function visProdukter() {
    var liste = document.getElementById("product-list");
    liste.innerHTML = "";
  
    for (var i = 0; i < produkter.length; i++) {
      var p = produkter[i];
  
      var produktDiv = document.createElement("div");
      produktDiv.className = "masterdiv";
      produktDiv.innerHTML = `
        <img src="${p.bilde}" alt="${p.navn}">
        <div class="innhold">
          <h2>${p.navn}</h2>
          <p>${p.beskrivelse}</p>
          <p class="sale">$${p.pris.toFixed(2)}</p>
          <button onclick="leggTilIKurv(${i})">Legg i handlekurv</button>
        </div>
      `;
      liste.appendChild(produktDiv);
    }
  }
  
  // Legg til i handlekurv
  function leggTilIKurv(indeks) {
    handlekurv.push(produkter[indeks]);
    lagreHandlekurv();
    visHandlekurv();
  }
  
  // Fjern produkt
  function fjernFraKurv(indeks) {
    handlekurv.splice(indeks, 1);
    lagreHandlekurv();
    visHandlekurv();
  }
  
  // Lagre handlekurven i localStorage
  function lagreHandlekurv() {
    localStorage.setItem("handlekurv", JSON.stringify(handlekurv));
  }
  
  // Vis handlekurv
  function visHandlekurv() {
    var liste = document.getElementById("cart-list");
    var teller = document.getElementById("cart-count");
    var seksjon = document.getElementById("cart-items");
  
    liste.innerHTML = "";
    var total = 0;
  
    for (var i = 0; i < handlekurv.length; i++) {
      var vare = handlekurv[i];
      total += vare.pris;
  
      var li = document.createElement("li");
      li.innerHTML = `${vare.navn} - $${vare.pris.toFixed(2)} 
        <button onclick="fjernFraKurv(${i})">Fjern</button>`;
      liste.appendChild(li);
    }
  
    // Vis total
    var totalLi = document.createElement("li");
    totalLi.innerHTML = "<strong>Total: $" + total.toFixed(2) + "</strong>";
    liste.appendChild(totalLi);
  
    // Vis antall varer
    teller.textContent = handlekurv.length;
  
    // Vis seksjon hvis det er varer i handlekurven
    seksjon.style.display = handlekurv.length > 0 ? "block" : "none";
  }
  
  // Kjør når siden laster
  visProdukter();
  visHandlekurv();