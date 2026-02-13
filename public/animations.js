/**
 * Pinaka Animation System
 * Elegant, fluid animations inspired by:
 * - Josh Comeau (joshwcomeau.com) - playful, smooth interactions
 * - Lee Robinson (leerob.io) - minimal, warm animations
 * - Max Böck (mxb.dev) - craft-focused micro-interactions
 */

// Easing functions for smooth, natural motion
const EASING = {
  // Smooth deceleration - for entrance animations
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Bouncy but elegant - for hover effects
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  // Sharp acceleration - for exits
  snappy: "cubic-bezier(0.4, 0, 1, 1)",
  // Gentle ease - for subtle movements
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
 * Intersection Observer for scroll-triggered staggered animations
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        container.classList.add("is-visible");

        // Stagger children if data-stagger is present
        if (container.hasAttribute("data-stagger")) {
          const children = container.querySelectorAll("[data-stagger-item]");
          const delay = parseInt(container.dataset.stagger) || 100;

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
}

/**
 * Parallax effect for hero sections
 */
function initParallax() {
  const heroElements = document.querySelectorAll("[data-parallax]");

  if (heroElements.length === 0) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    heroElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const yPos = scrollY * speed;
      el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
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
 * Fade in elements on page load (not just scroll)
 */
function initPageLoadAnimations() {
  const pageElements = document.querySelectorAll("[data-page-animate]");

  pageElements.forEach((el, index) => {
    const delay = parseInt(el.dataset.pageAnimate) || index * 100;

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity ${DURATION.slow}ms ${EASING.smooth}, transform ${DURATION.slow}ms ${EASING.smooth}`;

    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, delay);
  });
}

/**
 * Initialize all animations
 */
function initAnimations() {
  initScrollAnimations();
  initParallax();
  initMagneticButtons();
  initTextReveal();
  initSmoothScroll();
  initCardTilt();
  initPulseAnimation();
  initPageLoadAnimations();
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  initAnimations();
}

// Re-initialize after Astro view transitions
document.addEventListener("astro:after-swap", initAnimations);

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
};
