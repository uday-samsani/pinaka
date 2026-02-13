// Intersection Observer for scroll-triggered animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const fadeInObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with data-animate attribute
document.querySelectorAll("[data-animate]").forEach(el => {
  fadeInObserver.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Add parallax effect to hero section
const heroSection = document.querySelector("#hero");
if (heroSection) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.3;
    heroSection.style.transform = `translateY(${rate}px)`;
  });
}

// Stagger animation for lists
document.querySelectorAll("[data-stagger]").forEach(container => {
  const children = container.children;
  Array.from(children).forEach((child, index) => {
    child.style.animationDelay = `${index * 100}ms`;
    child.classList.add("stagger-item");
  });
});
