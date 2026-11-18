// Lab Notes page (homelab.html): tier tabs, screenshot pop-up, contact pop-up
document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     TIER TABS
     Shows one tier at a time. The open tier is saved in the address
     (#tier-2), so a link can open a specific tier.
  ========================== */
  const tabs = document.querySelectorAll(".tier-tab");
  const panels = document.querySelectorAll(".tier-panel");

  function showTier(id) {
    tabs.forEach(function (tab) {
      tab.setAttribute("aria-selected", tab.dataset.tier === id ? "true" : "false");
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.id !== id;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      showTier(tab.dataset.tier);
      history.replaceState(null, "", "#" + tab.dataset.tier);
    });
  });

  // Open the tier named in the address, or Tier 1
  const fromAddress = location.hash.replace("#", "");
  showTier(document.getElementById(fromAddress) ? fromAddress : "tier-1");


  /* =========================
     CONTACT POP-UP
  ========================== */
  const contactModal = document.getElementById("contactModal");

  document.getElementById("contactButton").addEventListener("click", function () {
    contactModal.classList.add("active");
  });
  document.getElementById("closeContact").addEventListener("click", function () {
    contactModal.classList.remove("active");
  });
  contactModal.addEventListener("click", function (event) {
    if (event.target === contactModal) contactModal.classList.remove("active");
  });

  // Esc closes whichever pop-up is open
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      contactModal.classList.remove("active");
      closeImage();
    }
  });
});


/* =========================
   SCREENSHOT POP-UP
   (used by the onclick="openImage(...)" buttons)
========================== */
function openImage(imageSrc) {
  document.getElementById("expandedImage").src = imageSrc;
  document.getElementById("imageModal").classList.add("active");
}

function closeImage() {
  document.getElementById("imageModal").classList.remove("active");
}
