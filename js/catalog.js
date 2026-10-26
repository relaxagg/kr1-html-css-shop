const filtersForm = document.getElementById('filters');
const cards = document.querySelectorAll('.card');
const emptyMessage = document.getElementById('empty-message');

filtersForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const checkedBoxes = filtersForm.querySelectorAll('input[name="model"]:checked');
  const checkedModels = Array.from(checkedBoxes).map((box) => box.value);

  const priceFrom = Number(filtersForm.elements['price-from'].value) || 0;
  const priceTo = Number(filtersForm.elements['price-to'].value) || Infinity;

  let visibleCount = 0;

  cards.forEach((card) => {
    const model = card.dataset.model;
    const price = Number(card.dataset.price);

    const modelMatches = checkedModels.length === 0 || checkedModels.includes(model);
    const priceMatches = price >= priceFrom && price <= priceTo;

    if (modelMatches && priceMatches) {
      card.hidden = false;
      visibleCount++;
    } else {
      card.hidden = true;
    }
  });

  emptyMessage.hidden = visibleCount > 0;
});

filtersForm.addEventListener('reset', () => {
  cards.forEach((card) => {
    card.hidden = false;
  });
  emptyMessage.hidden = true;
});
