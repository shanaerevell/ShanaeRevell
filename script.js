// Wait until the HTML page is fully loaded before running anything
document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     CONTACT POP-UP
  ========================== */
  const contactModal = document.getElementById("contactModal");
  const topContactButton = document.getElementById("contactButton");
  const sideContactButton = document.getElementById("contactButtonSide");
  const closeContactButton = document.getElementById("closeContact");

  function openContactModal() {
    contactModal.classList.add("active");
  }

  function closeContactModal() {
    contactModal.classList.remove("active");
  }

  topContactButton.addEventListener("click", openContactModal);
  sideContactButton.addEventListener("click", openContactModal);
  closeContactButton.addEventListener("click", closeContactModal);

  // Clicking the dark area outside the card also closes it
  contactModal.addEventListener("click", function (event) {
    if (event.target === contactModal) {
      closeContactModal();
    }
  });


  /* =========================
     KEYBOARD
  ========================== */
  // Esc closes whichever pop-up is open
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeContactModal();
      closeImage();
    }
  });


  /* =========================
     MOONWALKER (the little figure on the orange line)
     This part only decides WHEN things happen. What each move looks
     like lives in style.css under MOONWALKER.

     Two tools do all the work:
     - Classes: adding "is-reading" starts the reading move,
       removing it stops it.
     - data-view: setting it to "front", "side", "read", etc.
       picks which drawing of the figure is shown.
  ========================== */
  const moonwalkStage = document.getElementById("moonwalkStage");
  const moonwalker = document.getElementById("moonwalker");

  // True if the visitor's device is set to "reduce motion"
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Every scheduled step is saved here so a replay can cancel them all
  let moonwalkTimers = [];

  // Run "step" after "ms" milliseconds (1000 ms = 1 second)
  function later(ms, step) {
    moonwalkTimers.push(setTimeout(step, ms));
  }

  // Show a different drawing of the figure
  function showView(view) {
    moonwalker.dataset.view = view;
  }

  // Restart a CSS animation: take the class off, make the browser notice,
  // then put it back on. (Reading offsetWidth is what makes it notice.)
  function restartClass(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  }

  // Turn around smoothly by flipping through in-between poses,
  // e.g. turnThrough(["q-front", "front"]) turns from the side to face you.
  const STEP_MS = 110; // how long each in-between pose is shown
  function turnThrough(views) {
    moonwalker.style.setProperty("--turn-ms", STEP_MS * views.length + "ms");
    restartClass(moonwalker, "is-turning");
    views.forEach(function (view, i) {
      later(STEP_MS * (i + 1), function () { showView(view); });
    });
    later(STEP_MS * views.length, function () {
      moonwalker.classList.remove("is-turning");
    });
  }

  // STEP 1: moonwalk in from the right (starts the show, also used to replay)
  function playMoonwalk() {
    if (reduceMotion.matches) return; // no animation for reduce-motion users

    // Cancel anything still scheduled from a previous run
    moonwalkTimers.forEach(clearTimeout);
    moonwalkTimers = [];
    moonwalker.classList.remove("is-turning", "is-reading", "is-nodding", "is-tipping");
    moonwalkStage.classList.remove("is-leaving", "is-gone");

    showView("side");
    restartClass(moonwalkStage, "is-playing");
  }

  // STEP 2 onward: runs when the walk-in finishes.
  // The numbers are milliseconds after the figure stops on the line.
  function afterWalk() {
    moonwalkStage.classList.remove("is-playing");

    // Face the viewer
    turnThrough(["q-front", "front"]);

    // Turn away and read the headline (lean in, hand on chin)
    later(1600, function () { turnThrough(["q-front", "side", "q-back", "read"]); });
    later(2300, function () { moonwalker.classList.add("is-reading"); });
    later(5900, function () { moonwalker.classList.remove("is-reading"); });

    // Turn back to the viewer and nod "yes"
    later(6100, function () { turnThrough(["q-back", "side", "q-front", "front"]); });
    later(6750, function () { moonwalker.classList.add("is-nodding"); });
    later(8000, function () { moonwalker.classList.remove("is-nodding"); });

    // Tip the hat
    later(8150, function () { moonwalker.classList.add("is-tipping"); });
    later(9550, function () { moonwalker.classList.remove("is-tipping"); });

    // Turn sideways and moonwalk off to the left
    later(9900, function () { turnThrough(["q-front", "side"]); });
    later(10200, function () { moonwalkStage.classList.add("is-leaving"); });
  }

  // LAST STEP: runs when the walk-off finishes. Hide the figure until replayed.
  function afterExit() {
    moonwalkStage.classList.remove("is-leaving");
    moonwalkStage.classList.add("is-gone");
    showView("front");
  }

  if (moonwalkStage && moonwalker) {
    // Click the line or the figure to replay
    moonwalkStage.addEventListener("click", playMoonwalk);

    // CSS tells us when the walk-in or the walk-off animation finishes
    moonwalker.addEventListener("animationend", function (event) {
      if (event.animationName === "mw-travel") {
        afterWalk();
      } else if (event.animationName === "mw-exit") {
        afterExit();
      }
    });

    // Start the show when the page loads
    playMoonwalk();
  }
});


/* =========================
   SCREENSHOT POP-UP
   (used by the onclick="openImage(...)" buttons on project screenshots)
========================== */
function openImage(imageSrc) {
  const modal = document.getElementById("imageModal");
  const image = document.getElementById("expandedImage");

  image.src = imageSrc;
  modal.classList.add("active");
}

function closeImage() {
  document.getElementById("imageModal").classList.remove("active");
}
