const priceElement = document.getElementById('price');
const oldPriceElement = document.getElementById('old-price');
const selectedText = document.getElementById('selected');
const optionInputs = document.querySelectorAll('.option input');

const basePrice = Number(priceElement.dataset.price);

function formatPrice(number) {
  return number.toLocaleString('ru-RU') + ' ₽';
}

function updateProduct() {
  const memory = document.querySelector('input[name="memory"]:checked');
  const color = document.querySelector('input[name="color"]:checked');
  const extra = Number(memory.dataset.extra);

  priceElement.textContent = formatPrice(basePrice + extra);

  if (oldPriceElement) {
    const baseOldPrice = Number(oldPriceElement.dataset.price);
    oldPriceElement.textContent = formatPrice(baseOldPrice + extra);
  }

  selectedText.textContent = memory.value + ', ' + color.value;
}

optionInputs.forEach((input) => {
  input.addEventListener('change', updateProduct);
});
