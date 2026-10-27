/* ==========================================================
   MANPREET PORTFOLIO
   Beginner-friendly interactions:
   1. Scroll reveals
   2. Mouse movement parallax
   3. Scroll-based depth movement
   4. Mobile navigation
   5. Project category filters
   ========================================================== */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 1) Reveal content as it enters the screen. */
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      // We only need to reveal each item once.
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

/* Reveal the skill bars when the skills section becomes visible. */
const skillsSection = document.querySelector(".skills");
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      skillsSection.classList.add("is-visible");
      skillsObserver.disconnect();
    }
  }, { threshold: 0.25 });
  skillsObserver.observe(skillsSection);
}

/* 2) Mouse parallax.
   Each element has data-depth="0.1", "0.3", etc.
   Higher values move a little more. We use CSS variables so the
   browser can animate the transform smoothly. */
const depthLayers = document.querySelectorAll("[data-depth]");
let pointerX = 0;
let pointerY = 0;
let currentX = 0;
let currentY = 0;

if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  let pointerFrame = 0;
  function moveLayers() {
    currentX += (pointerX - currentX) * 0.12;
    currentY += (pointerY - currentY) * 0.12;
    depthLayers.forEach((layer) => {
      const depth = Number(layer.dataset.depth) || 0;
      const moveX = currentX * depth * 34;
      const moveY = currentY * depth * 22;
      layer.style.setProperty("--mouse-x", moveX + "px");
      layer.style.setProperty("--mouse-y", moveY + "px");
      layer.style.setProperty("--mouse-depth", depth);
      const pageScroll = Number.parseFloat(layer.style.getPropertyValue("--page-scroll")) || 0;
      layer.style.translate = moveX + "px " + (moveY + pageScroll) + "px";
    });
    // Keep animating only while the pointer is still easing into place.
    if (Math.abs(pointerX - currentX) > 0.002 || Math.abs(pointerY - currentY) > 0.002) {
      pointerFrame = requestAnimationFrame(moveLayers);
    } else {
      pointerFrame = 0;
    }
  }
  window.addEventListener("pointermove", (event) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    if (!pointerFrame) pointerFrame = requestAnimationFrame(moveLayers);
  }, { passive: true });
}

/* 3) Scroll parallax.
   Background layers move more slowly than the page, creating depth.
   The movement is deliberately subtle so the text stays readable. */
let scrollTicking = false;

function updateScrollParallax() {
  const scrollY = window.scrollY;

  depthLayers.forEach((layer) => {
    const section = layer.closest("section");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    // Skip sections that are far outside the viewport.
    if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

    const depth = Number(layer.dataset.depth) || 0;
    const sectionProgress = (window.innerHeight - rect.top) * depth * 0.12;
    layer.style.setProperty("--scroll-y", sectionProgress + "px");
    // CSS custom property is used by the stylesheet transform below.
    const pageScroll = scrollY * depth * -0.12;
    layer.style.setProperty("--page-scroll", pageScroll + "px");

    // Apply the scroll movement immediately, even on touch screens.
    const mouseX = Number.parseFloat(layer.style.getPropertyValue("--mouse-x")) || 0;
    const mouseY = Number.parseFloat(layer.style.getPropertyValue("--mouse-y")) || 0;
    layer.style.translate = mouseX + "px " + (mouseY + pageScroll) + "px";
  });

  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollParallax);
    scrollTicking = true;
  }
}, { passive: true });

/* 4) Mobile menu button opens/closes the full-screen navigation. */
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const navigationLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) closeMenu();
  });
}

/* Highlight the navigation item for the section currently on screen. */
const pageSections = document.querySelectorAll("main section[id]");
const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navigationLinks.forEach((link) => {
      const active = link.getAttribute("href") === "#" + entry.target.id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

pageSections.forEach((section) => activeLinkObserver.observe(section));

/* 5) Work filters.
   Buttons show all projects, only websites, or only graphics.
   Edit data-category in index.html when adding your own project. */
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filter) => {
      const isSelected = filter === button;
      filter.classList.toggle("is-selected", isSelected);
      filter.setAttribute("aria-pressed", String(isSelected));
    });

    projectCards.forEach((card) => {
      const matches = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.hidden = !matches;
      if (matches) {
        // Re-trigger the gentle entrance animation after filtering.
        card.classList.remove("is-visible");
        requestAnimationFrame(() => card.classList.add("is-visible"));
      }
    });
  });
});

/* If reduced motion is requested, don't apply pointer movement. */
if (reduceMotion) {
  depthLayers.forEach((layer) => {
    layer.style.translate = "none";
    layer.style.transform = "none";
  });
}


/* ABOUT: cards unfold on scroll and fold back after mouse movement. */
const aboutSection = document.querySelector(".about");
const identityDeck = document.querySelector(".identity-deck");
const identityCards = document.querySelectorAll(".identity-card");

if (aboutSection && identityDeck) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutSection.classList.add("is-visible");
        identityDeck.classList.add("is-unfolded");
      }
    });
  }, { threshold: 0.18 });
  aboutObserver.observe(aboutSection);
}

let openedCardWithMouse = null;
let pointerPositionAtOpen = null;
const canHoverWithMouse = window.matchMedia("(hover: hover) and (pointer: fine)");

function closeIdentityCards() {
  identityCards.forEach((card) => {
    card.classList.remove("is-open");
    card.setAttribute("aria-expanded", "false");
    const detail = card.querySelector(".card-detail");
    if (detail) detail.hidden = true;
  });
  openedCardWithMouse = null;
  pointerPositionAtOpen = null;
}

identityCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    const wasOpen = card.classList.contains("is-open");
    closeIdentityCards();

    if (!wasOpen) {
      card.classList.add("is-open");
      card.setAttribute("aria-expanded", "true");
      const detail = card.querySelector(".card-detail");
      if (detail) detail.hidden = false;

      // With a mouse, the card folds back once the pointer moves away.
      // Touch and keyboard users can keep the detail open while reading.
      if (canHoverWithMouse.matches && event.detail > 0) {
        openedCardWithMouse = card;
        pointerPositionAtOpen = { x: event.clientX, y: event.clientY };
      }
    }
  });
});

window.addEventListener("pointermove", (event) => {
  if (!canHoverWithMouse.matches || event.pointerType !== "mouse") return;
  if (!openedCardWithMouse || !pointerPositionAtOpen) return;

  const dx = event.clientX - pointerPositionAtOpen.x;
  const dy = event.clientY - pointerPositionAtOpen.y;
  // Ignore tiny hand jitters; a real move sends the card back to its deck.
  if (Math.hypot(dx, dy) > 24) closeIdentityCards();
}, { passive: true });


/* SELECTED WORKS: subtle pointer tilt on desktop.
   The card always resets when the pointer leaves, so it never stays crooked. */
const workCards = document.querySelectorAll(".project-card");
if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  workCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const tiltX = (x - 0.5) * 4;
      const tiltY = (0.5 - y) * 4;
      card.style.setProperty("--tilt-x", tiltX.toFixed(2) + "deg");
      card.style.setProperty("--tilt-y", tiltY.toFixed(2) + "deg");
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}
