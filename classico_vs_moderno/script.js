// Array iniziale di studenti
const studenti = [
  { nome: "Mario", voto: 8, presente: true },
  { nome: "Luigi", voto: 5, presente: false },
  { nome: "Anna", voto: 9, presente: true },
  { nome: "Beatrice", voto: 6, presente: true },
  { nome: "Carlo", voto: 4, presente: true },
  { nome: "Davide", voto: 7, presente: false },
  { nome: "Elena", voto: 10, presente: true },
  { nome: "Federico", voto: 3, presente: false },
  { nome: "Giorgia", voto: 8, presente: true },
  { nome: "Lorenzo", voto: 2, presente: false },
  { nome: "Martina", voto: 6, presente: true },
  { nome: "Simone", voto: 5, presente: true },
];

// Selezione elementi DOM
const btn = document.getElementById("run");
const out = document.getElementById("output");

// Funzione per stampare sul DOM
function log(titolo, dato) {
  const h4 = document.createElement("h4");
  const pre = document.createElement("pre");
  h4.textContent = titolo;
  pre.textContent = JSON.stringify(dato, null, 2);
  out.append(h4, pre);
}

// Funzione che usa il parametro rest per raccogliere un numero variabile di nomi in un array
function raggruppaNomi(...nomi) {
  return nomi; // Restituisce l'array dei nomi passati come argomento
}

// Funzione che usa il destructuring per estrarre proprietà da uno studente e restituire una frase di presentazione
function presentaStudente({ nome, voto, presente }) {
  return `Ciao, sono ${nome}, ho ${voto} e sono ${
    presente ? "presente" : "assente"
  }.`;
}

// Listener che reagisce al click sul bottone 'run'
/**
 * Esegue una serie di operazioni statistiche e di trasformazione sull’array degli studenti
 * quando viene cliccato il pulsante con id "run".
 * Utilizza i seguenti concetti moderni di JavaScript:
 * - Operatore ternario
 * - Spread operator
 * - Rest parameters
 * - Array.map()
 * - Array.filter()
 * - Array.forEach()
 * - Destructuring
 */
btn.addEventListener("click", () => {
  out.innerHTML = ""; // reset output

  // 1. Operatore ternario: controlla se il primo studente è promosso o bocciato in base al voto
  const primoStudente = studenti[0]; // Prende il primo studente dell'array 'studenti'

  const esito = primoStudente.voto >= 6 ? "Promosso" : "Bocciato"; // Usa l'operatore ternario per verificare se il voto del primo studente è maggiore o uguale a 6:
  // Se sì, assegna la stringa "Promosso" alla variabile 'esito', altrimenti "Bocciato"
  log("1. Esito Primo Studente", esito); // Mostra nell'output il risultato dell'esito del primo studente

  // 2. Spread operator: crea un nuovo array aggiungendo due nuovi studenti a quelli esistenti
  const nuovo1 = { nome: "Valeria Marrone", voto: 7, presente: true }; // Crea un nuovo oggetto studente chiamato 'nuovo1' con nome, voto e presenza

  const nuovo2 = { nome: "Pietro Viola", voto: 9, presente: false }; // Crea un secondo nuovo oggetto studente chiamato 'nuovo2'

  const tutti = [...studenti, nuovo1, nuovo2]; // Usa lo spread operator [...] per creare un nuovo array 'tutti' che contiene:
  // - tutti gli studenti già presenti nell'array 'studenti'
  // - più i due nuovi studenti 'nuovo1' e 'nuovo2' aggiunti in fondo
  log("2. Nuovo array con spread", tutti); // Mostra nell'output il nuovo array completo di tutti gli studenti

  // 3. Rest operator: raggruppa nomi passati come argomenti in un array
  const nomiRaggruppati = raggruppaNomi("Luca", "Sara", "Marco");
  log("3. Nomi con rest", nomiRaggruppati);

  // 4. map(): crea un array di stringhe con nome e voto di ogni studente
  // Usa il metodo map() per creare un nuovo array di stringhe a partire dall'array 'tutti'.
  // Per ogni elemento (studente) dell'array, crea una stringa con il formato "Nome: (Voto)".
  // Ad esempio: "Mario: (8)", "Luigi: (5)", ecc.
  const stringheFormattate = tutti.map((el) => `${el.nome}: (${el.voto})`);
  log("4. Stringhe formattate con map()", stringheFormattate);

  // 5. filter(): filtra solo gli studenti presenti (presente === true)
  // Usa il metodo filter() per creare un nuovo array che contiene solo gli studenti presenti.
  // La funzione di callback controlla la proprietà 'presente' di ogni studente:
  // - Se 'presente' è true, lo studente viene incluso nel nuovo array 'presenti'.
  // - Se 'presente' è false, lo studente viene escluso.
  const presenti = tutti.filter((el) => el.presente);
  log("5. Studenti presenti (filter)", presenti); // Mostra nell'output l'array degli studenti che risultano presenti

  // 6. forEach(): crea una lista HTML <ul> con tutti gli studenti e la loro presenza (✔️ o ❌)
  const ul = document.createElement("ul"); // Crea un nuovo elemento HTML <ul> che conterrà la lista degli studenti

  tutti.forEach(({ nome, presente }) => {
    // Scorre tutti gli studenti dell'array 'tutti' usando forEach()
    // Per ogni studente, estrae le proprietà 'nome' e 'presente' tramite destructuring
    const li = document.createElement("li"); // Crea un nuovo elemento <li> per rappresentare lo studente nella lista

    li.textContent = `${nome} – ${presente ? "✔️" : "❌"}`; // Imposta il testo del <li> con il nome dello studente e un simbolo:
    // ✔️ se presente è true, ❌ se presente è false
    ul.appendChild(li);  // Aggiunge il <li> appena creato alla lista <ul>

  });
  out.appendChild(ul); // Aggiunge la lista <ul> completa all'elemento di output della pagina


  // 7. map() + destructuring: crea un array di frasi di presentazione per ogni studente
  const presentazioni = tutti.map(presentaStudente);
  log("7. Presentazione studenti (destructuring)", presentazioni);
});
