# Esercitazione
```javascript
// Array che rappresenta i prodotti disponibili nel catalogo
const products = [
  { id: 1, name: "Maglietta", price: 15.99 },
  { id: 2, name: "Jeans", price: 39.99 },
  { id: 3, name: "Cappello", price: 12.5 },
  { id: 4, name: "Maglione", price: 20.5 },
  { id: 5, name: "Scarpe", price: 50 },
  { id: 6, name: "Borsa", price: 120 },
  { id: 7, name: "Cappotto", price: 80.5 },
];

// Selezioniamo gli elementi HTML dove mostreremo il catalogo, il carrello e il totale
const catalogSection = document.getElementById("product-catalog");
const cartList = document.getElementById("cart-items");
const totalPriceSpan = document.getElementById("total-price");

// Il carrello è un array che conterrà oggetti { id, name, price, quantity }
let cart = [];

/*
  Funzione che mostra tutti i prodotti nella sezione del catalogo
  Viene eseguita una sola volta quando la pagina si carica
*/
function showCatalog() {
  // Cicliamo tutti i prodotti
  for (let i = 0; i < products.length; i++) {
    const product = products[i]; // prendiamo un prodotto

    // Creiamo un <div> per contenere ogni prodotto
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    // Inseriamo nel div il nome, prezzo e bottone "Aggiungi al carrello"
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Prezzo: €${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Aggiungi al carrello</button>
    `;

    // Aggiungiamo il div al catalogo nella pagina
    catalogSection.appendChild(productDiv);
  }
}

/*
  Funzione per aggiungere un prodotto al carrello, dato il suo ID
*/
function addToCart(productId) {
  let found = false; // variabile per controllare se il prodotto è già nel carrello

  // Cerchiamo nel carrello se il prodotto esiste già
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart[i].quantity += 1; // aumentiamo la quantità
      found = true;
      break; // fermiamo il ciclo perché abbiamo trovato il prodotto
    }
  }

  // Se il prodotto non era nel carrello, lo aggiungiamo con quantità 1
  if (!found) {
    // Se il prodotto non era nel carrello (!found è true), lo aggiungiamo con quantità 1
    for (let j = 0; j < products.length; j++) {
      if (products[j].id === productId) {
        cart.push({
          id: products[j].id,
          name: products[j].name,
          price: products[j].price,
          quantity: 1,
        });
        break; // fermiamo il ciclo perché abbiamo aggiunto il prodotto
      }
    }
  }

  updateCart(); // aggiorniamo la visualizzazione del carrello
}

/*
  Funzione per rimuovere un prodotto dal carrello, dato il suo ID
*/
function removeFromCart(productId) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart[i].quantity -= 1; // riduciamo la quantità

      // Se la quantità arriva a zero, rimuoviamo completamente il prodotto dal carrello
      if (cart[i].quantity === 0) {
        cart.splice(i, 1); // rimuove 1 elemento all'indice i
      }

      break; // fermiamo il ciclo perché abbiamo trovato il prodotto
    }
  }

  updateCart(); // aggiorniamo la visualizzazione del carrello
}

/*
  Funzione che aggiorna il contenuto del carrello sulla pagina
   Viene chiamata ogni volta che si aggiunge o rimuove un prodotto.
  Scopo:
  - Mostrare ogni prodotto nel carrello
  - Calcolare il totale
  - Permettere di rimuovere prodotti con un pulsante
*/
function updateCart() {
  cartList.innerHTML = ""; // Svuota completamente il contenuto HTML della lista del carrello

  let total = 0; // inizializziamo il totale a 0

  // Cicliamo su ogni oggetto nel carrello
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i]; // Prende il prodotto alla posizione corrente

    // Creiamo un elemento <li> per mostrare ogni prodotto nel carrello
    const li = document.createElement("li");
    // document rappresenta la pagina HTML corrente e permette di accedere e modificare gli elementi della pagina tramite JavaScript (ad esempio per creare nuovi elementi, selezionare elementi esistenti o cambiare il loro contenuto)

    /*
      Inserisce nell'elemento <li>:
      - Il nome del prodotto
      - La quantità (es. x2)
      - Il prezzo totale per quel prodotto (quantità × prezzo unitario)
      - Un pulsante per rimuovere quel prodotto dal carrello
    */
    // .innerHTML permette di inserire o modificare il contenuto HTML di un elemento, aggiungendo testo o altri tag HTML all’interno dell’elemento stesso
    li.innerHTML = `
   
      ${item.name} (x${item.quantity}) - €${(
      item.price * item.quantity
    ).toFixed(2)}
      <button onclick="removeFromCart(${item.id})">Rimuovi</button>
    `;

    // Aggiungiamo il <li> alla lista visuale del carrello
    cartList.appendChild(li);

    // Aggiungiamo il prezzo di questo prodotto al totale
    total += item.price * item.quantity;
  }

  // Aggiorniamo il testo con il prezzo totale
  totalPriceSpan.textContent = total.toFixed(2);
}

// Alla fine del file, chiamiamo questa funzione per mostrare subito il catalogo
showCatalog();
