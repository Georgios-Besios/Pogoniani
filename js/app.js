const root = document.documentElement;
const progressBar = document.querySelector(".scroll-progress");
const cursorGlow = document.querySelector(".cursor-glow");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = [...document.querySelectorAll(".nav-menu a")];
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

function readStorage(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The site remains usable when storage is unavailable.
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage restrictions.
  }
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setTheme(theme) {
  root.dataset.theme = theme;
  if (themeIcon) themeIcon.textContent = theme === "light" ? "☀" : "☾";
}

const savedTheme = readStorage("pogoniani-theme");
setTheme(savedTheme === "light" || savedTheme === "earth" ? savedTheme : root.dataset.theme || "earth");

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "earth" : "light";
  setTheme(nextTheme);
  writeStorage("pogoniani-theme", nextTheme);
});

function closeMobileNav() {
  navMenu?.classList.remove("open");
  navToggle?.classList.remove("active");
  navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const open = navMenu?.classList.toggle("open") ?? false;
  navToggle.classList.toggle("active", open);
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach((link) => link.addEventListener("click", closeMobileNav));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileNav();
});

window.addEventListener("scroll", () => {
  if (!progressBar) return;
  const maximum = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = maximum > 0 ? (window.scrollY / maximum) * 100 : 0;
  progressBar.style.width = `${percentage}%`;
}, { passive: true });

if (cursorGlow && canHover && !prefersReducedMotion) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.opacity = "1";
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window && sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach((section) => navObserver.observe(section));
}

if (!prefersReducedMotion) {
  document.querySelectorAll("[data-parallax]").forEach((element) => {
    const speed = Number(element.dataset.parallax || 0);
    window.addEventListener("scroll", () => {
      element.style.transform = `translateY(${window.scrollY * speed}px)`;
    }, { passive: true });
  });
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = "true";
      const target = Number(entry.target.dataset.counter);
      const output = entry.target.querySelector(".stat-number");
      if (!output) return;

      const start = performance.now();
      const duration = 1300;
      const frame = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        output.textContent = Math.floor(target * eased).toLocaleString("el-GR");
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.45 });

  document.querySelectorAll("[data-counter]").forEach((card) => counterObserver.observe(card));
} else {
  document.querySelectorAll("[data-counter]").forEach((card) => {
    const output = card.querySelector(".stat-number");
    if (output) output.textContent = Number(card.dataset.counter).toLocaleString("el-GR");
  });
}

function updateClock() {
  const clock = document.getElementById("localClock");
  if (!clock) return;
  const formatted = new Intl.DateTimeFormat("el-GR", {
    timeZone: "Europe/Athens",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
  clock.textContent = `Ώρα Ελλάδας: ${formatted}`;
}

updateClock();
setInterval(updateClock, 30000);

const timelineData = [
  {
    year: "12ος–2ος αι. π.Χ.",
    title: "Ζώνη μακράς κατοίκησης και διέλευσης",
    text: "Η ευρύτερη κοιλάδα του Γορμού έχει προϊστορικούς και αρχαίους οικισμούς, τύμβους και οχυρώσεις. Η Πωγωνιανή ανήκει σε αυτό το παλιό πέρασμα του Πωγωνίου."
  },
  {
    year: "1030–1100",
    title: "Η τοπική παράδοση για τους πρώτους κατοίκους",
    text: "Η παράδοση συνδέει τους πρώτους κατοίκους της περιοχής με αγροτικούς πληθυσμούς που αναζητούσαν ασφαλέστερο τόπο εγκατάστασης."
  },
  {
    year: "μετά το 1550",
    title: "Συγκρότηση της Βοστίνας",
    text: "Η τοπική ιστοριογραφία τοποθετεί τη διαμόρφωση της Βοστίνας ως ξεχωριστού οικισμού μετά τα μέσα του 16ου αιώνα."
  },
  {
    year: "1895",
    title: "Έδρα του καζά Πωγωνίου",
    text: "Στο οθωμανικό διοικητικό ετήσιο του 1895 η Βοστίνα εμφανίζεται ως έδρα του καζά Πωγωνίου, με 262 νοικοκυριά και 1.323 κατοίκους."
  },
  {
    year: "1872–1894",
    title: "Ο Άγιος Νικόλαος",
    text: "Ο κεντρικός ναός θεμελιώθηκε το 1872, λειτούργησε από το 1873, απέκτησε τέμπλο το 1874 και εγκαινιάστηκε επίσημα το 1894."
  },
  {
    year: "1892–1924",
    title: "Σχολεία, Οικοτροφείο και Γυμνάσιο",
    text: "Το διδακτήριο του Ελληνικού σχολείου ανεγέρθηκε το 1892–1897. Το 1923 ιδρύθηκε το Εθνικό Οικοτροφείο Αρρένων Πωγωνίου και το 1924 το Γυμνάσιο."
  },
  {
    year: "1913",
    title: "Ένταξη στο ελληνικό κράτος",
    text: "Μετά τους Βαλκανικούς Πολέμους η Βοστίνα, μαζί με την ευρύτερη περιοχή των Ιωαννίνων, εντάχθηκε στο ελληνικό κράτος."
  },
  {
    year: "1928",
    title: "Βοστίνα → Πωγωνιανή",
    text: "Το 1928 η Βοστίνα μετονομάστηκε επίσημα σε Πωγωνιανή, συνδέοντας το χωριό με τη βαθύτερη ιστορική μνήμη του Πωγωνίου."
  },
  {
    year: "1940–1941",
    title: "Στρατιωτικό νοσοκομείο",
    text: "Κατά τον πόλεμο του 1940–1941, τα σχολικά ιδρύματα της Πωγωνιανής χρησιμοποιήθηκαν ως στρατιωτικό νοσοκομείο."
  },
  {
    year: "δεύτερο μισό 20ού αιώνα",
    title: "Μετανάστευση και δημογραφική συρρίκνωση",
    text: "Η μεταπολεμική μετανάστευση και η αστυφιλία περιόρισαν σταδιακά τον μόνιμο πληθυσμό, όπως συνέβη σε μεγάλο μέρος της ηπειρωτικής υπαίθρου."
  },
  {
    year: "Σήμερα",
    title: "Ακριτική κοινότητα με ζωντανή μνήμη",
    text: "Το 2021 η Δημοτική Κοινότητα είχε 441 μόνιμους κατοίκους. Η Πωγωνιανή κρατά ισχυρή ταυτότητα μέσα από την τοπική μνήμη, τα μνημεία και το πολυφωνικό τραγούδι."
  }
];

const timelineCard = document.getElementById("timelineCard");
function renderTimeline(data) {
  if (!timelineCard || !data) return;
  timelineCard.animate?.(
    [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 260, easing: "ease-out" }
  );
  timelineCard.innerHTML = `
    <p class="timeline-year">${escapeHTML(data.year)}</p>
    <h3>${escapeHTML(data.title)}</h3>
    <p>${escapeHTML(data.text)}</p>
  `;
}

document.querySelectorAll(".timeline-dot").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".timeline-dot").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    renderTimeline(timelineData[Number(button.dataset.timeline)]);
  });
});

const places = {
  square: {
    step: "Στάση 01",
    title: "Πλατεία και κέντρο χωριού",
    text: "Το φυσικό σημείο εκκίνησης για κάθε επισκέπτη. Από εδώ αρχίζει η γνωριμία με τον ρυθμό του χωριού, τους δρόμους και την καθημερινή εικόνα της Πωγωνιανής.",
    bullets: ["Ιδανικό για πρώτη βόλτα", "Καλή αφετηρία για φωτογραφίες", "Σημείο συνάντησης και προσανατολισμού"]
  },
  church: {
    step: "Στάση 02",
    title: "Άγιος Νικόλαος",
    text: "Ο κεντρικός ναός της Πωγωνιανής αποτελεί βασικό σημείο θρησκευτικής και κοινοτικής μνήμης. Θεμελιώθηκε το 1872 και εγκαινιάστηκε επίσημα το 1894.",
    bullets: ["Θεμελίωση 1872", "Ξυλόγλυπτο τέμπλο 1874", "Φωτογραφίες στη gallery"]
  },
  museum: {
    step: "Στάση 03",
    title: "Λαογραφικό Μουσείο Πωγωνιανής",
    text: "Ο χώρος διατηρεί αντικείμενα καθημερινής ζωής, εργαλεία, φορεσιές, φωτογραφίες και ιστορικά τεκμήρια του Πωγωνίου.",
    bullets: ["Παλιές φωτογραφίες", "Αντικείμενα καθημερινής ζωής", "Παραδοσιακές φορεσιές"],
    cta: { href: "#folklore-museum", label: "Μάθε περισσότερα" }
  },
  nature: {
    step: "Στάση 04",
    title: "Φύση και ορεινό τοπίο",
    text: "Το τοπίο του Πωγωνίου είναι βασικό στοιχείο της εμπειρίας: φως, βουνό, καθαρός αέρας και διαδρομές για ήρεμη περιήγηση.",
    bullets: ["Περίπατος", "Φωτογραφίες", "Ηρεμία και παρατήρηση"]
  }
};

const placePanel = document.getElementById("placePanel");
function renderPlace(place) {
  if (!placePanel || !place) return;
  placePanel.animate?.(
    [{ opacity: 0, transform: "translateX(8px)" }, { opacity: 1, transform: "translateX(0)" }],
    { duration: 260, easing: "ease-out" }
  );
  placePanel.innerHTML = `
    <p class="eyebrow">${escapeHTML(place.step)}</p>
    <h3>${escapeHTML(place.title)}</h3>
    <p>${escapeHTML(place.text)}</p>
    <ul>${place.bullets.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
    ${place.cta ? `<a class="btn btn-primary museum-more-btn" href="${escapeHTML(place.cta.href)}">${escapeHTML(place.cta.label)}</a>` : ""}
  `;
}

document.querySelectorAll(".map-pin").forEach((pin) => {
  pin.addEventListener("click", () => {
    document.querySelectorAll(".map-pin").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    pin.classList.add("active");
    pin.setAttribute("aria-pressed", "true");
    renderPlace(places[pin.dataset.place]);
  });
});

const seasons = {
  spring: {
    eyebrow: "Άνοιξη",
    title: "Πράσινο, φως και καθαρός αέρας",
    text: "Η καλύτερη εποχή για ήπιους περιπάτους, φωτογραφίες και γνωριμία με το τοπίο χωρίς βιασύνη.",
    image: "assets/photos/nature-mountains.jpg",
    alt: "Φυσικό τοπίο και βουνά κοντά στην Πωγωνιανή"
  },
  summer: {
    eyebrow: "Καλοκαίρι",
    title: "Επιστροφή, παρέες και χωριό που ξαναζωντανεύει",
    text: "Το καλοκαίρι είναι η εποχή της επιστροφής. Απόδημοι, οικογένειες και νεότερες γενιές ξανασυναντιούνται στον τόπο.",
    image: "assets/photos/square-main.jpg",
    alt: "Η πλατεία της Πωγωνιανής το καλοκαίρι"
  },
  autumn: {
    eyebrow: "Φθινόπωρο",
    title: "Χρώματα, ηρεμία και βαθύτερη ατμόσφαιρα",
    text: "Το φθινόπωρο δίνει στο χωριό πιο ήρεμο χαρακτήρα, ιδανικό για περιπατητές και φωτογράφους.",
    image: "assets/photos/church-02.jpg",
    alt: "Πέτρινη εκκλησία στην Πωγωνιανή"
  },
  winter: {
    eyebrow: "Χειμώνας",
    title: "Σιωπή, πέτρα και βουνό",
    text: "Ο χειμώνας αναδεικνύει τη σκληρή και όμορφη πλευρά της ορεινής Ηπείρου.",
    image: "assets/photos/winter-path.jpg",
    alt: "Χειμωνιάτικος δρόμος στην Πωγωνιανή"
  }
};

const seasonCard = document.getElementById("seasonCard");
function renderSeason(data) {
  if (!seasonCard || !data) return;
  seasonCard.animate?.(
    [{ opacity: 0, transform: "scale(0.985)" }, { opacity: 1, transform: "scale(1)" }],
    { duration: 260, easing: "ease-out" }
  );
  seasonCard.innerHTML = `
    <div>
      <p class="eyebrow">${escapeHTML(data.eyebrow)}</p>
      <h3>${escapeHTML(data.title)}</h3>
      <p>${escapeHTML(data.text)}</p>
    </div>
    <img src="${escapeHTML(data.image)}" alt="${escapeHTML(data.alt)}" loading="lazy" decoding="async" />
  `;
}

document.querySelectorAll(".season-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".season-tab").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    renderSeason(seasons[tab.dataset.season]);
  });
});

document.querySelectorAll(".filter").forEach((filter) => {
  filter.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    filter.classList.add("active");
    filter.setAttribute("aria-pressed", "true");

    const selected = filter.dataset.filter;
    document.querySelectorAll(".gallery-item").forEach((item) => {
      const hidden = selected !== "all" && item.dataset.category !== selected;
      item.classList.toggle("hidden", hidden);
      item.toggleAttribute("hidden", hidden);
    });
  });
});

const galleryModal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
let lastFocusedElement = null;

function openDialog(dialog) {
  if (!dialog) return;
  lastFocusedElement = document.activeElement;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  document.body.classList.add("modal-open");
  dialog.querySelector("[data-close-modal]")?.focus({ preventScroll: true });
}

function closeDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus({ preventScroll: true });
}

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    if (!modalImage || !modalTitle) return;
    modalImage.src = item.dataset.image || "";
    modalImage.alt = item.dataset.title || "Φωτογραφία Πωγωνιανής";
    modalTitle.textContent = item.dataset.title || "Πωγωνιανή";
    openDialog(galleryModal);
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button.closest("dialog")));
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    const rectangle = dialog.getBoundingClientRect();
    const outside = event.clientX < rectangle.left || event.clientX > rectangle.right || event.clientY < rectangle.top || event.clientY > rectangle.bottom;
    if (outside) closeDialog(dialog);
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (dialog.id === "galleryModal" && modalImage) {
      modalImage.removeAttribute("src");
      modalImage.alt = "";
    }
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus({ preventScroll: true });
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && galleryModal?.open) closeDialog(galleryModal);
});

const memoryForm = document.getElementById("memoryForm");
const memoryInput = document.getElementById("memoryInput");
const memoryNotes = document.getElementById("memoryNotes");
const clearMemories = document.getElementById("clearMemories");

function readMemories() {
  try {
    const parsed = JSON.parse(readStorage("pogoniani-memories", "[]"));
    return Array.isArray(parsed) ? parsed.filter((note) => note && typeof note.text === "string") : [];
  } catch {
    return [];
  }
}

function createMemoryNote(note) {
  const article = document.createElement("article");
  const title = document.createElement("span");
  const text = document.createElement("p");
  title.textContent = note.title || "Ανάμνηση";
  text.textContent = note.text;
  article.append(title, text);
  return article;
}

function loadMemories() {
  if (!memoryNotes) return;
  const defaults = [
    { title: "Βοστίνα", text: "Ο τόπος που κρατά τις ιστορίες των ανθρώπων του." },
    { title: "Πωγώνι", text: "Πέτρα, βουνό, καθαρός αέρας και επιστροφή." }
  ];
  memoryNotes.replaceChildren(...[...defaults, ...readMemories()].map(createMemoryNote));
}

memoryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!memoryInput) return;
  const text = memoryInput.value.replace(/\s+/g, " ").trim().slice(0, 160);
  if (!text) return;
  const saved = readMemories();
  saved.unshift({ title: "Ανάμνηση", text });
  writeStorage("pogoniani-memories", JSON.stringify(saved.slice(0, 8)));
  memoryInput.value = "";
  loadMemories();
});

clearMemories?.addEventListener("click", () => {
  removeStorage("pogoniani-memories");
  loadMemories();
});

loadMemories();

if (canHover && !prefersReducedMotion) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rectangle = card.getBoundingClientRect();
      const x = (event.clientX - rectangle.left) / rectangle.width - 0.5;
      const y = (event.clientY - rectangle.top) / rectangle.height - 0.5;
      card.style.transform = `rotateX(${y * -7}deg) rotateY(${x * 7}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    });
  });

  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rectangle = button.getBoundingClientRect();
      const x = event.clientX - rectangle.left - rectangle.width / 2;
      const y = event.clientY - rectangle.top - rectangle.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  });
}

const canvas = document.getElementById("mistCanvas");
const context = canvas?.getContext("2d");
let particles = [];

function resizeCanvas() {
  if (!canvas || !context || !canvas.parentElement) return;
  const rectangle = canvas.parentElement.getBoundingClientRect();
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.floor(rectangle.width * ratio);
  canvas.height = Math.floor(rectangle.height * ratio);
  canvas.style.width = `${rectangle.width}px`;
  canvas.style.height = `${rectangle.height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({ length: Math.min(90, Math.floor(rectangle.width / 12)) }, () => ({
    x: Math.random() * rectangle.width,
    y: Math.random() * rectangle.height,
    radius: Math.random() * 3 + 1,
    velocity: Math.random() * 0.22 + 0.05,
    alpha: Math.random() * 0.28 + 0.08
  }));
}

function drawMist() {
  if (!canvas || !context) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  context.clearRect(0, 0, width, height);

  const gradient = context.createLinearGradient(0, height * 0.15, 0, height);
  gradient.addColorStop(0, "rgba(243,201,121,0.08)");
  gradient.addColorStop(1, "rgba(143,173,141,0.02)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  particles.forEach((particle) => {
    particle.x += particle.velocity;
    if (particle.x > width + 20) particle.x = -20;
    context.beginPath();
    context.fillStyle = `rgba(255,247,234,${particle.alpha})`;
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fill();
  });

  requestAnimationFrame(drawMist);
}

if (!prefersReducedMotion && canvas && context) {
  resizeCanvas();
  drawMist();
  window.addEventListener("resize", resizeCanvas, { passive: true });
}
