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
     The full show plays when the page loads. After that, each click on
     the line plays the next act, #2 to #4 (see THE SEQUENCE).
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

  // STEP 1: moonwalk in from the right (runs once, when the page loads)
  function playMoonwalk() {
    if (reduceMotion.matches) return; // no animation for reduce-motion users

    // Cancel anything still scheduled from a previous run
    moonwalkTimers.forEach(clearTimeout);
    moonwalkTimers = [];
    moonwalker.classList.remove("is-turning", "is-reading", "is-nodding", "is-tipping",
                                "is-bending", "is-straightening");
    moonwalkStage.classList.remove("is-leaving", "is-gone", "is-skating", "is-biking", "is-jogging");

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

  // LAST STEP: runs when the walk-off finishes. The figure is gone.
  function afterExit() {
    moonwalkStage.classList.remove("is-leaving");
    moonwalkStage.classList.add("is-gone");
    showView("front");
    playWaitingClick();
  }

  // If someone clicked while the figure was busy, start the next act now
  function playWaitingClick() {
    if (!clickWaiting) return;
    clickWaiting = false;
    later(300, playNextAct);
  }

  /* ---- THE SEQUENCE ----
     #1 the full moonwalk show plays when the page loads, then waits.
     Each click on the line plays the next act:
       click 1 -> #2 skate + wave       (left to right)
       click 2 -> #3 bike joy ride      (right to left, the moonwalk's path)
       click 3 -> #4 run + catch breath (left to right, the skate's path)
     #4 closes it out: after that, clicks do nothing until the page is
     refreshed (which starts again at #1).
     A click while the figure is still on screen is remembered, and the
     next act starts as soon as the current one finishes. */

  // #2: skate toward the starting point, wave, fade away
  function skateBy() {
    startAct("is-skating", "side");
  }

  // #3: joy ride a bike to the left (helmet on, arms and legs out), fade away
  function bikeBy() {
    startAct("is-biking", "bike");
  }

  // Change how fast the running legs, arms and bounce move.
  // 1 = normal speed, 0.5 = half speed. Used to slow down into the stop
  // and speed back up, so the legs match how fast the body is moving.
  function setRunSpeed(rate) {
    moonwalker.getAnimations({ subtree: true }).forEach(function (animation) {
      if (animation.animationName && animation.animationName.indexOf("mw-run-") === 0) {
        animation.updatePlaybackRate(rate);
      }
    });
  }

  // #4: run in, slow to a stop in the middle, bend over to catch its
  // breath, stand back up, run off. (The run takes 8 seconds; it is stopped
  // from 2.8s to 5.2s.)
  function jogBy() {
    startAct("is-jogging", "side");

    // Slowing down: the strides get slower as it nears the stop
    later(1900, function () { setRunSpeed(0.8); });
    later(2250, function () { setRunSpeed(0.6); });
    later(2550, function () { setRunSpeed(0.4); });

    // 2.8s: stopped. Switch to the bent-over drawing, folding down smoothly
    later(2800, function () {
      showView("tired");
      restartClass(moonwalker, "is-bending");
    });
    later(3300, function () { moonwalker.classList.remove("is-bending"); });

    // 4.7s: stand back up, then 5.2s: start running again
    later(4700, function () { moonwalker.classList.add("is-straightening"); });
    later(5200, function () {
      moonwalker.classList.remove("is-straightening");
      showView("side");
      setRunSpeed(0.5);                            // first strides are slow...
    });
    later(5600, function () { setRunSpeed(0.75); });
    later(6000, function () { setRunSpeed(1); });  // ...then back to full speed
  }

  // Shared start for acts #2 to #4: show the figure and add the act's class
  function startAct(actClass, view) {
    moonwalkStage.classList.remove("is-gone");
    showView(view);
    restartClass(moonwalkStage, actClass);
  }

  // When any of acts #2 to #4 finishes, the figure is gone again.
  // After the last act (#4), mark the sequence as finished.
  function afterAct() {
    moonwalkStage.classList.remove("is-skating", "is-biking", "is-jogging");
    moonwalkStage.classList.add("is-gone");
    showView("front");
    if (nextAct >= acts.length) {
      moonwalkStage.classList.add("is-finished");
      return;
    }
    playWaitingClick();
  }

  const acts = [skateBy, bikeBy, jogBy];
  let nextAct = 0;
  let clickWaiting = false; // true if someone clicked while an act was still playing

  // Click on the line: play the next act now, or as soon as the figure has left
  function playNextAct() {
    if (reduceMotion.matches) return;
    if (nextAct >= acts.length) return; // all acts played: the sequence is over
    if (!moonwalkStage.classList.contains("is-gone")) {
      clickWaiting = true;
      return;
    }

    const act = acts[nextAct];
    nextAct = nextAct + 1;
    act();
  }

  if (moonwalkStage && moonwalker) {
    // After the figure has left, clicking the line (or the hidden figure)
    // plays the next act in the sequence
    moonwalkStage.addEventListener("click", playNextAct);

    // CSS tells us when each trip across the line finishes
    moonwalker.addEventListener("animationend", function (event) {
      const name = event.animationName;
      if (name === "mw-travel") {
        afterWalk();
      } else if (name === "mw-exit") {
        afterExit();
      } else if (name === "mw-skate-path" || name === "mw-bike-path" || name === "mw-jog-out") {
        afterAct();
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
