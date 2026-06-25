const root = document.documentElement;
const progress = document.querySelector(".scroll-progress");
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
    // The site still works when storage is unavailable, e.g. private mode.
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
if (savedTheme === "light" || savedTheme === "earth") setTheme(savedTheme);
else setTheme(root.dataset.theme || "earth");

themeToggle?.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "earth" : "light";
  setTheme(next);
  writeStorage("pogoniani-theme", next);
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
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${pct}%`;
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
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window && sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "page");
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
      const duration = 1300;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        output.textContent = Math.floor(target * eased).toLocaleString("el-GR");
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
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
  const now = new Date();
  const formatted = new Intl.DateTimeFormat("el-GR", {
    timeZone: "Europe/Athens",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  }).format(now);
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
    year: "μετά το 1550",
    title: "Συγκρότηση της Βοστίνας",
    text: "Η τοπική ιστοριογραφία τοποθετεί τη διαμόρφωση της Βοστίνας ως ξεχωριστού οικισμού μετά τα μέσα του 16ου αιώνα."
  },
  {
    year: "1895",
    title: "Έδρα του καζά Πωγωνίου",
    text: "Στο οθωμανικό σαλαναμέ του 1895 η Βοστίνα εμφανίζεται ως έδρα του καζά Πωγωνίου, με 262 χανέδες και 1.323 κατοίκους."
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
    title: "Και πάλι ελληνική!",
    text: "Το 1913, κατά τη διάρκεια του Ά Βαλκανικού Πολέμου, η Ελλάδα προσαρτεί τον Νομό Ιωαννίνων και η Βοστίνα απελευθερώνεται από τον Οθωμανικό ζυγό."
  },
  {
    year: "1928",
    title: "Βοστίνα → Πωγωνιανή",
    text: "Το 1928 η Βοστίνα μετονομάστηκε επίσημα σε Πωγωνιανή, συνδέοντας το χωριό με τη βαθύτερη ιστορική μνήμη του Πωγωνίου."
  },
  {
    year: "1940–1941",
    title: "Στρατιωτικό νοσοκομείο",
    text: "Κατά την εποποιία του 1940–1941, τα σχολικά ιδρύματα της Πωγωνιανής χρησιμοποιήθηκαν ως στρατιωτικό νοσοκομείο."
  },
  {
    year: "Σήμερα",
    title: "Ακριτική κοινότητα με ζωντανή μνήμη",
    text: "Το 2021 η Δημοτική Κοινότητα είχε 441 μόνιμους κατοίκους. Η Πωγωνιανή κρατά ισχυρή ταυτότητα μέσα από την τοπική μνήμη, τα μνημεία και το πολυφωνικό τραγούδι."
  }
];

const timelineCard = document.getElementById("timelineCard");
function renderTimeline(data) {
  if (!timelineCard) return;
  timelineCard.animate?.([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 260, easing: "ease-out" });
  timelineCard.innerHTML = `
    <p class="timeline-year">${escapeHTML(data.year)}</p>
    <h3>${escapeHTML(data.title)}</h3>
    <p>${escapeHTML(data.text)}</p>
  `;
}

document.querySelectorAll(".timeline-dot").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".timeline-dot").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
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
    title: "Λαογραφική μνήμη",
    text: "Χώρος για ανάδειξη της καθημερινής ζωής, της αγροκτηνοτροφικής παράδοσης, των παλιών αντικειμένων και των οικογενειακών ιστοριών του Πωγωνίου.",
    bullets: ["Παλιές φωτογραφίες", "Αντικείμενα καθημερινής ζωής", "Ιστορίες οικογενειών"]
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
  placePanel.animate?.([{ opacity: 0, transform: "translateX(8px)" }, { opacity: 1, transform: "translateX(0)" }], { duration: 260, easing: "ease-out" });
  placePanel.innerHTML = `
    <p class="eyebrow">${escapeHTML(place.step)}</p>
    <h3>${escapeHTML(place.title)}</h3>
    <p>${escapeHTML(place.text)}</p>
    <ul>${place.bullets.map((b) => `<li>${escapeHTML(b)}</li>`).join("")}</ul>
  `;
}

document.querySelectorAll(".map-pin").forEach((pin) => {
  pin.addEventListener("click", () => {
    document.querySelectorAll(".map-pin").forEach((p) => {
      p.classList.remove("active");
      p.setAttribute("aria-pressed", "false");
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
    img: "assets/photos/nature-mountains.jpg",
    alt: "Φυσικό τοπίο και βουνά κοντά στην Πωγωνιανή"
  },
  summer: {
    eyebrow: "Καλοκαίρι",
    title: "Επιστροφή, παρέες και χωριό που ξαναζωντανεύει",
    text: "Το καλοκαίρι είναι η εποχή της επιστροφής. Απόδημοι, οικογένειες και νεότερες γενιές ξανασυναντιούνται στον τόπο.",
    img: "assets/photos/square-main.jpg",
    alt: "Η πλατεία της Πωγωνιανής το καλοκαίρι"
  },
  autumn: {
    eyebrow: "Φθινόπωρο",
    title: "Χρώματα, ηρεμία και βαθύτερη ατμόσφαιρα",
    text: "Το φθινόπωρο δίνει στο χωριό πιο ήρεμο και κινηματογραφικό χαρακτήρα, ιδανικό για περιπατητές και φωτογράφους.",
    img: "assets/photos/nature-mountains.jpg",
    alt: "Φύση και βουνά του Πωγωνίου"
  },
  winter: {
    eyebrow: "Χειμώνας",
    title: "Σιωπή, πέτρα και βουνό",
    text: "Ο χειμώνας αναδεικνύει τη σκληρή και όμορφη πλευρά της ορεινής Ηπείρου. Το site μπορεί να φιλοξενεί χειμερινές φωτογραφίες μεγάλης δύναμης.",
    img: "assets/photos/winter-path.jpg",
    alt: "Χειμωνιάτικος δρόμος στην Πωγωνιανή"
  }
};

const seasonCard = document.getElementById("seasonCard");
function renderSeason(data) {
  if (!seasonCard || !data) return;
  seasonCard.animate?.([{ opacity: 0, transform: "scale(0.985)" }, { opacity: 1, transform: "scale(1)" }], { duration: 260, easing: "ease-out" });
  seasonCard.innerHTML = `
    <div>
      <p class="eyebrow">${escapeHTML(data.eyebrow)}</p>
      <h3>${escapeHTML(data.title)}</h3>
      <p>${escapeHTML(data.text)}</p>
    </div>
    <img src="${escapeHTML(data.img)}" alt="${escapeHTML(data.alt)}" loading="lazy" decoding="async" />
  `;
}

document.querySelectorAll(".season-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".season-tab").forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    renderSeason(seasons[tab.dataset.season]);
  });
});

document.querySelectorAll(".filter").forEach((filter) => {
  filter.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((f) => {
      f.classList.remove("active");
      f.setAttribute("aria-pressed", "false");
    });
    filter.classList.add("active");
    filter.setAttribute("aria-pressed", "true");
    const value = filter.dataset.filter;
    document.querySelectorAll(".gallery-item").forEach((item) => {
      const hidden = value !== "all" && item.dataset.category !== value;
      item.classList.toggle("hidden", hidden);
      item.toggleAttribute("hidden", hidden);
    });
  });
});

const modal = document.getElementById("galleryModal");
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
    modalImage.src = item.dataset.image;
    modalImage.alt = item.dataset.title;
    modalTitle.textContent = item.dataset.title;
    openDialog(modal);
  });
});

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    openDialog(document.getElementById(button.dataset.openModal));
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button.closest("dialog")));
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (outside) closeDialog(dialog);
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (modalImage && dialog.id === "galleryModal") {
      modalImage.removeAttribute("src");
      modalImage.alt = "";
    }
    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus({ preventScroll: true });
    }
  });
});

const plans = {
  short: {
    first: ["Ξεκίνα από την πλατεία και πάρε μια πρώτη αίσθηση του χωριού.", "Περπάτησε σε κοντινούς δρόμους με πέτρινα σημεία.", "Κλείσε με μερικές φωτογραφίες και άνοιγμα χάρτη για επόμενη στάση."],
    history: ["Ξεκίνα από την πλατεία και τον Άγιο Νικόλαο.", "Σημείωσε το Παλιό Γυμνάσιο, το Σεράι και όσα πέτρινα σημεία βρίσκονται στη διαδρομή.", "Κράτησε φωτογραφίες που μπορούν να μπουν στο ιστορικό αρχείο του site."],
    nature: ["Περπάτησε προς σημείο με θέα.", "Φωτογράφισε το ορεινό ανάγλυφο.", "Κράτησε σύντομη διαδρομή χωρίς να βιαστείς."],
    family: ["Κάντε ήρεμη βόλτα στο κέντρο.", "Βγάλτε οικογενειακές φωτογραφίες.", "Αφήστε μια ανάμνηση στον ψηφιακό τοίχο του site."]
  },
  half: {
    first: ["Πλατεία και κέντρο χωριού.", "Περίπατος σε πέτρινα σημεία και φωτογραφίες.", "Στάση σε θρησκευτικό ή λαογραφικό σημείο.", "Μικρή διαδρομή προς το φυσικό τοπίο."],
    history: ["Περιήγηση σε Άγιο Νικόλαο, Παλιό Γυμνάσιο και κέντρο χωριού.", "Καταγραφή παλιών κτισμάτων με φωτογραφίες.", "Συζήτηση με κατοίκους ή ανθρώπους που ξέρουν την τοπική ιστορία.", "Προσθήκη υλικού στο μελλοντικό αρχείο."],
    nature: ["Πρωινή βόλτα με φως.", "Φωτογραφίες στο ορεινό τοπίο.", "Στάση σε σημεία ηρεμίας.", "Επιστροφή στο χωριό για δεύτερη σειρά λήψεων."],
    family: ["Πλατεία και εύκολη βόλτα.", "Φωτογραφίες με παιδιά/οικογένεια.", "Επίσκεψη σε ασφαλή κοντινά σημεία.", "Μικρή ανάμνηση στον ψηφιακό τοίχο."]
  },
  full: {
    first: ["Άφιξη πρωί και γνωριμία με το κέντρο.", "Περιήγηση στα βασικά σημεία.", "Μεσημεριανή παύση.", "Απογευματινές φωτογραφίες με πιο μαλακό φως.", "Κλείσιμο με άνοιγμα διαδρομής για γειτονικά Πωγωνοχώρια."],
    history: ["Πρωινή καταγραφή Αγίου Νικολάου, Παλιού Γυμνασίου, Σεραγιού και πέτρινων διαδρομών.", "Συνεντεύξεις/μνήμες από ανθρώπους του τόπου.", "Φωτογραφική τεκμηρίωση παλιών στοιχείων.", "Οργάνωση υλικού για μελλοντική ενότητα αρχείου."],
    nature: ["Πρωινή διαδρομή στη φύση.", "Πανοραμικές φωτογραφίες.", "Παύση στο χωριό.", "Απογευματινή βόλτα για δεύτερο φως.", "Επιλογή καλύτερων εικόνων για gallery."],
    family: ["Ήρεμη άφιξη χωρίς βιασύνη.", "Βόλτα στο κέντρο.", "Στάσεις για φωτογραφίες και ιστορίες.", "Χρόνος για ξεκούραση.", "Καταγραφή οικογενειακής ανάμνησης."]
  }
};

const durationLabel = {
  short: "1–2 ώρες",
  half: "Μισή ημέρα",
  full: "Ολόκληρη ημέρα"
};

const interestLabel = {
  first: "Πρώτη γνωριμία",
  history: "Ιστορία και μνήμη",
  nature: "Φύση και φωτογραφίες",
  family: "Οικογενειακή επίσκεψη"
};

const generatePlan = document.getElementById("generatePlan");
generatePlan?.addEventListener("click", () => {
  const duration = document.getElementById("visitDuration")?.value || "short";
  const interest = document.getElementById("visitInterest")?.value || "first";
  const list = plans[duration]?.[interest] || plans.short.first;
  const output = document.getElementById("planOutput");
  if (!output) return;
  output.animate?.([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 260, easing: "ease-out" });
  output.innerHTML = `
    <p class="eyebrow">Πρόταση</p>
    <h3>${escapeHTML(interestLabel[interest])} — ${escapeHTML(durationLabel[duration])}</h3>
    <ol>${list.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ol>
  `;
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
  const saved = readMemories();
  const defaults = [
    { title: "Βοστίνα", text: "Ο τόπος που κρατά τις ιστορίες των ανθρώπων του." },
    { title: "Πωγώνι", text: "Πέτρα, βουνό, καθαρός αέρας και επιστροφή." }
  ];
  memoryNotes.replaceChildren(...[...defaults, ...saved].map(createMemoryNote));
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
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${y * -7}deg) rotateY(${x * 7}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    });
  });
}

const canvas = document.getElementById("mistCanvas");
const ctx = canvas?.getContext("2d");
let particles = [];

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * devicePixelRatio);
  canvas.height = Math.floor(rect.height * devicePixelRatio);
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  particles = Array.from({ length: Math.min(90, Math.floor(rect.width / 12)) }, () => ({
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,
    r: Math.random() * 3 + 1,
    vx: Math.random() * 0.22 + 0.05,
    alpha: Math.random() * 0.28 + 0.08
  }));
}

function drawMist() {
  if (!canvas || !ctx) return;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);

  const gradient = ctx.createLinearGradient(0, h * 0.15, 0, h);
  gradient.addColorStop(0, "rgba(243,201,121,0.08)");
  gradient.addColorStop(1, "rgba(143,173,141,0.02)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  particles.forEach((p) => {
    p.x += p.vx;
    if (p.x > w + 20) p.x = -20;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,247,234,${p.alpha})`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawMist);
}

if (!prefersReducedMotion && canvas && ctx) {
  resizeCanvas();
  drawMist();
  window.addEventListener("resize", resizeCanvas, { passive: true });
}
