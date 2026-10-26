const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('[data-product]');
const closeButton = document.getElementById('close-dialog');
const productInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    productInput.value = button.dataset.product;
    orderDialog.showModal();
  });
});

closeButton.addEventListener('click', () => {
  orderDialog.close();
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = Array.from(orderForm.elements);

  fields.forEach((field) => {
    field.removeAttribute('aria-invalid');
  });

  if (!orderForm.checkValidity()) {
    fields.forEach((field) => {
      if (field.willValidate && !field.checkValidity()) {
        field.setAttribute('aria-invalid', 'true');
      }
    });
    orderForm.reportValidity();
    return;
  }

  orderForm.reset();
  orderDialog.close();
  successMessage.hidden = false;
});
