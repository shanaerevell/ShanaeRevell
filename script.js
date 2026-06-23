// Wait until the HTML page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Find the contact pop-up
  const contactModal = document.getElementById("contactModal");

  // Find the buttons
  const topContactButton = document.getElementById("contactButton");
  const sideContactButton = document.getElementById("contactButtonSide");
  const closeContactButton = document.getElementById("closeContact");

  // Open pop-up
  function openContactModal() {
    contactModal.classList.add("active");
  }

  // Close pop-up
  function closeContactModal() {
    contactModal.classList.remove("active");
  }

  topContactButton.addEventListener("click", openContactModal);
  sideContactButton.addEventListener("click", openContactModal);
  closeContactButton.addEventListener("click", closeContactModal);

  contactModal.addEventListener("click", function (event) {
    if (event.target === contactModal) {
      closeContactModal();
    }
  });
});

// Open image modal
  function openImage(imageSrc) {
  const modal = document.getElementById("imageModal");
  const image = document.getElementById("expandedImage");

  image.src = imageSrc;
  modal.classList.add("active");
  }

  function closeImage() {
  document.getElementById("imageModal").classList.remove("active");
  }

