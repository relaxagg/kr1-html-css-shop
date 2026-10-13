const successMessage = document.getElementById('success-message');
let successTimer;

function showSuccessMessage() {
  if (!successMessage) {
    return;
  }

  successMessage.hidden = false;
  clearTimeout(successTimer);
  successTimer = setTimeout(() => {
    successMessage.hidden = true;
  }, 5000);
}

function validateForm(form) {
  const fields = Array.from(form.elements).filter((element) => element.willValidate);

  fields.forEach((field) => {
    field.removeAttribute('aria-invalid');
  });

  if (form.checkValidity()) {
    return true;
  }

  fields.forEach((field) => {
    if (!field.checkValidity()) {
      field.setAttribute('aria-invalid', 'true');
    }
  });

  form.reportValidity();
  return false;
}

const orderDialog = document.getElementById('order-dialog');

if (orderDialog) {
  const orderForm = document.getElementById('order-form');
  const orderButtons = document.querySelectorAll('.product-card__button[data-product]');
  const closeDialogButton = document.getElementById('close-order-dialog');
  const selectedProductInput = document.getElementById('selected-product');
  const dialogProductName = document.getElementById('dialog-product-name');

  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product;
      selectedProductInput.value = productName;
      dialogProductName.textContent = productName;
      orderDialog.showModal();
    });
  });

  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm(orderForm)) {
      return;
    }

    orderForm.reset();
    orderDialog.close();
    showSuccessMessage();
  });
}

const orderPageForm = document.getElementById('order-page-form');

if (orderPageForm) {
  const productSelect = document.getElementById('page-product');
  const urlParams = new URLSearchParams(window.location.search);
  const productFromUrl = urlParams.get('product');
  const productOptions = Array.from(productSelect.options);
  const hasProductOption = productOptions.some((option) => option.value === productFromUrl);

  if (hasProductOption) {
    productSelect.value = productFromUrl;
  }

  orderPageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm(orderPageForm)) {
      return;
    }

    orderPageForm.reset();
    showSuccessMessage();
  });
}
