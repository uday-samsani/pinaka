/**
 * Pinaka Animation System - Redesigned
 * Smoother, more reliable animations that never block content
 *
 * Philosophy: Content is always visible. Animations enhance, not require.
 */

// Easing functions for smooth, natural motion
const EASING = {
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  snappy: "cubic-bezier(0.4, 0, 1, 1)",
  gentle: "cubic-bezier(0.25, 0.1, 0.25, 1)",
};

// Animation durations
const DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
};

/**
 * Intersection Observer for scroll-triggered animations
 * Safely enhances content without blocking visibility
 */
function initScrollAnimations() {
  // Don't run if IntersectionObserver isn't supported
  if (!("IntersectionObserver" in window)) {
    // Make all elements visible immediately
    document
      .querySelectorAll("[data-animate], [data-stagger-item]")
      .forEach(el => {
        el.classList.add("is-visible");
      });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.05,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        container.classList.add("is-visible");

        // Stagger children if data-stagger is present
        if (container.hasAttribute("data-stagger")) {
          const children = container.querySelectorAll("[data-stagger-item]");
          const delay = parseInt(container.dataset.stagger) || 80;

          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("is-visible");
            }, index * delay);
          });
        }

        observer.unobserve(container);
      }
    });
  }, observerOptions);

  // Observe all animate containers
  document.querySelectorAll("[data-animate]").forEach(el => {
    observer.observe(el);
  });

  // Also observe stagger containers directly
  document.querySelectorAll("[data-stagger]").forEach(el => {
    if (!el.hasAttribute("data-animate")) {
      observer.observe(el);
    }
  });
}

/**
 * Parallax effect for hero sections
 */
function initParallax() {
  const heroElements = document.querySelectorAll("[data-parallax]");

  if (heroElements.length === 0) return;
  if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches)
    return;

  let ticking = false;
  let lastScrollY = 0;

  function updateParallax() {
    // Use lastScrollY captured at scroll time
    heroElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const yPos = lastScrollY * speed;
      el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );
}

/**
 * Magnetic button effect - buttons follow cursor slightly
 */
function initMagneticButtons() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches)
    return;

  const buttons = document.querySelectorAll("[data-magnetic]");

  buttons.forEach(button => {
    const strength = parseFloat(button.dataset.magnetic) || 0.3;

    button.addEventListener("mousemove", e => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate3d(0, 0, 0)";
      button.style.transition = `transform ${DURATION.normal}ms ${EASING.spring}`;

      setTimeout(() => {
        button.style.transition = "";
      }, DURATION.normal);
    });
  });
}

/**
 * Text reveal animation for headings
 */
function initTextReveal() {
  if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches)
    return;

  const headings = document.querySelectorAll("[data-reveal-text]");

  headings.forEach(heading => {
    const text = heading.textContent || "";
    heading.textContent = "";
    heading.style.opacity = "1";

    // Split into words
    const words = text.split(" ");

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "reveal-word";
      wordSpan.style.display = "inline-block";
      wordSpan.style.overflow = "hidden";
      wordSpan.style.marginRight = "0.25em";

      const innerSpan = document.createElement("span");
      innerSpan.textContent = word;
      innerSpan.style.display = "inline-block";
      innerSpan.style.transform = "translateY(100%)";
      innerSpan.style.opacity = "0";
      innerSpan.style.transition = `transform ${DURATION.slower}ms ${EASING.smooth}, opacity ${DURATION.slower}ms ${EASING.smooth}`;

      wordSpan.appendChild(innerSpan);
      heading.appendChild(wordSpan);

      // Trigger animation
      setTimeout(() => {
        innerSpan.style.transform = "translateY(0)";
        innerSpan.style.opacity = "1";
      }, wordIndex * 80);
    });
  });
}

/**
 * Smooth anchor scrolling
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href !== "#") {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

/**
 * Card hover lift effect with 3D tilt
 */
function initCardTilt() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches)
    return;

  const cards = document.querySelectorAll("[data-tilt]");

  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      card.style.transition = "transform 0.1s ease-out";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
      card.style.transition = `transform ${DURATION.normal}ms ${EASING.spring}`;
    });
  });
}

/**
 * Pulse animation for featured elements
 */
function initPulseAnimation() {
  const pulseElements = document.querySelectorAll("[data-pulse]");

  pulseElements.forEach(el => {
    el.classList.add("pulse-animation");
  });
}

/**
 * Ensure all content is visible (safety fallback)
 */
function ensureContentVisible() {
  // Make sure all animated elements are visible
  document
    .querySelectorAll("[data-animate], [data-stagger-item]")
    .forEach(el => {
      el.classList.add("is-visible");
    });
}

/**
 * Initialize all animations
 */
function initAnimations() {
  // Add 'js' class to html element to enable JS-only animations
  document.documentElement.classList.add("js");

  // Initialize animations
  initScrollAnimations();
  initParallax();
  initMagneticButtons();
  initTextReveal();
  initSmoothScroll();
  initCardTilt();
  initPulseAnimation();

  // Safety: ensure content is visible after a timeout
  // This catches any edge cases where observer might fail
  setTimeout(ensureContentVisible, 2000);
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  initAnimations();
}

// Re-initialize after Astro view transitions
document.addEventListener("astro:after-swap", initAnimations);

// Safety: ensure visibility on load event (catches all edge cases)
window.addEventListener("load", ensureContentVisible);

// Export for use in other scripts
window.PinakaAnimations = {
  EASING,
  DURATION,
  initScrollAnimations,
  initParallax,
  initMagneticButtons,
  initTextReveal,
  initSmoothScroll,
  initCardTilt,
  ensureContentVisible,
};
