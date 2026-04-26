// Footer year
(function setYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();

// Theme toggle with localStorage
(function themeInit() {
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.body.classList.add("dark");
  }

  if (!toggle) return;

  const updateIcon = () => {
    toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  };

  updateIcon();

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
    updateIcon();
  });
})();

// Load announcements from JSON + search filter
(async function loadAnnouncements() {
  const container = document.getElementById("announcements");
  const emptyState = document.getElementById("announcementsEmpty");
  const searchInput = document.getElementById("announcementSearch");

  if (!container) return;

  try {
    const res = await fetch("data/announcements.json", { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed to load announcements");
    const items = await res.json();

    const render = (list) => {
      container.innerHTML = list
        .map(
          (a) => `
        <article class="announcement">
          <h4>${a.title}</h4>
          <small>${a.date}</small>
          <p>${a.text}</p>
        </article>
      `
        )
        .join("");

      if (emptyState) {
        emptyState.classList.toggle("hidden", list.length > 0);
      }
    };

    render(items);

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const q = searchInput.value.toLowerCase();
        const filtered = items.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.text.toLowerCase().includes(q) ||
            a.date.toLowerCase().includes(q)
        );
        render(filtered);
      });
    }
  } catch (err) {
    console.error(err);
    if (container) {
      container.innerHTML = "<p>Unable to load announcements at this time.</p>";
    }
  }
})();

// Gallery lightbox
(function galleryLightbox() {
  const imgs = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (!imgs.length || !lightbox || !lightboxImg) return;

  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove("hidden");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
  });
})();

// Contact form handler (front-end only)
(function contactFormHandler() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form || !status) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in all fields.";
      status.style.color = "#c62828";
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      status.textContent = "Please enter a valid email address.";
      status.style.color = "#c62828";
      return;
    }

    status.textContent = "Sending…";
    status.style.color = "#1565c0";

    // Simulate async send
    await new Promise((r) => setTimeout(r, 1200));

    status.textContent = "Thank you for your message. We will get back to you soon.";
    status.style.color = "#2e7d32";
    form.reset();
  });
})();
