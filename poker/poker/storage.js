let chips = 100;

function loadCurrency() {
  const saved = localStorage.getItem('pokerChips');
  chips = saved ? parseInt(saved) : 100;
  updateCurrency();
}

function saveCurrency() {
  localStorage.setItem('pokerChips', chips);
}

function updateCurrency() {
  document.getElementById('chips').innerText = chips;
}

function resetCurrency() {
  chips = 100;
  saveCurrency();
  updateCurrency();
}
