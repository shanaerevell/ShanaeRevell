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

  // Esc closes whichever pop-up is open
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeContactModal();
      closeImage();
    }
  });

  // Moonwalk: glide in, face the screen, turn away to read the headline,
  // turn back with a "yes" nod, tip the hat, then keep moonwalking left
  // and fade out.
  // Plays once on load; click the line (or figure) to replay.
  const moonwalkStage = document.getElementById("moonwalkStage");
  const moonwalker = document.getElementById("moonwalker");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let moonwalkTimers = [];

  function later(ms, step) {
    moonwalkTimers.push(setTimeout(step, ms));
  }

  // Turn by stepping through in-between poses (side -> three-quarter -> front, etc.)
  const STEP_MS = 110;
  function turnThrough(views) {
    moonwalker.style.setProperty("--turn-ms", STEP_MS * views.length + "ms");
    moonwalker.classList.remove("is-turning");
    void moonwalker.offsetWidth; // restart the CSS animation
    moonwalker.classList.add("is-turning");
    views.forEach(function (view, i) {
      later(STEP_MS * (i + 1), function () { moonwalker.dataset.view = view; });
    });
    later(STEP_MS * views.length, function () { moonwalker.classList.remove("is-turning"); });
  }

  function playMoonwalk() {
    if (reduceMotion.matches) return;
    moonwalkTimers.forEach(clearTimeout);
    moonwalkTimers = [];
    moonwalker.classList.remove("is-turning", "is-reading", "is-nodding", "is-tipping");
    moonwalker.dataset.view = "side";
    moonwalkStage.classList.remove("is-playing", "is-leaving", "is-gone");
    void moonwalkStage.offsetWidth; // restart the CSS animation
    moonwalkStage.classList.add("is-playing");
  }

  function afterWalk() {
    moonwalkStage.classList.remove("is-playing");
    turnThrough(["q-front", "front"]);                             // face the screen
    later(1600, function () { turnThrough(["q-front", "side", "q-back", "read"]); }); // turn away, lean in, hand on chin
    later(2300, function () { moonwalker.classList.add("is-reading"); });
    later(5900, function () { moonwalker.classList.remove("is-reading"); });
    later(6100, function () { turnThrough(["q-back", "side", "q-front", "front"]); }); // turn back to the viewer
    later(6750, function () { moonwalker.classList.add("is-nodding"); });   // "yes, I'm the one"
    later(8000, function () { moonwalker.classList.remove("is-nodding"); });
    later(8150, function () { moonwalker.classList.add("is-tipping"); });   // tip the hat
    later(9550, function () { moonwalker.classList.remove("is-tipping"); });
    later(9900, function () { turnThrough(["q-front", "side"]); }); // turn sideways again
    later(10200, function () { moonwalkStage.classList.add("is-leaving"); }); // moonwalk off to the left
  }

  if (moonwalkStage && moonwalker) {
    // Clicks on the figure bubble up here too, so one listener covers both
    moonwalkStage.addEventListener("click", playMoonwalk);
    moonwalker.addEventListener("animationend", function (event) {
      if (event.animationName === "mw-travel") {
        afterWalk();
      } else if (event.animationName === "mw-exit") {
        moonwalkStage.classList.remove("is-leaving");
        moonwalkStage.classList.add("is-gone");
        moonwalker.dataset.view = "front";
      }
    });
    playMoonwalk();
  }
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

