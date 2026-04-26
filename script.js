const body = document.body;
const header = document.querySelector("[data-elevate]");
const progress = document.querySelector(".scroll-progress");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll(".section-observe")];
const revealItems = [...document.querySelectorAll(".reveal")];
const tiltItems = [...document.querySelectorAll("[data-tilt]")];

const details = {
  storage: {
    title: "Built-in calm",
    copy: "Drawers, cabinets, baskets, and closed storage give every everyday object a place to land.",
    width: "74%",
  },
  softness: {
    title: "Gentle silhouettes",
    copy: "Curved seating, round tables, curtains, cushions, and warm light make clean rooms feel comfortable.",
    width: "58%",
  },
  polish: {
    title: "Quiet luxury",
    copy: "Black frames, gold lighting, emerald accents, and one floral detail add refinement without visual noise.",
    width: "86%",
  },
};

function updateScrollState() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const amount = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

  progress.style.width = `${amount}%`;
  header.classList.toggle("is-elevated", scrollTop > 18);
}

function closeMenu() {
  body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px 140px 0px" }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  revealObserver.observe(item);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const activeLink = navLinks.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
      if (!activeLink) return;

      navLinks.forEach((link) => link.classList.remove("is-active"));
      activeLink.classList.add("is-active");
    });
  },
  { threshold: 0.42 }
);

sections.forEach((section) => {
  if (section.id) sectionObserver.observe(section);
});

tiltItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    item.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-4px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

document.querySelectorAll(".magnetic").forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    item.style.transform = `translate(${x * 0.08}px, ${y * 0.16}px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

const detailTitle = document.querySelector("[data-detail-title]");
const detailCopy = document.querySelector("[data-detail-copy]");
const detailMeter = document.querySelector(".detail-meter span");

document.querySelectorAll(".switcher-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const detail = details[tab.dataset.detail];
    if (!detail) return;

    document.querySelectorAll(".switcher-tab").forEach((item) => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });

    detailTitle.textContent = detail.title;
    detailCopy.textContent = detail.copy;
    detailMeter.style.width = detail.width;
  });
});

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
updateScrollState();
