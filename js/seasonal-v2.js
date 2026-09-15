(() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const seasonalData = {
    spring: {
      number: "01",
      label: "Άνοιξη",
      heroKicker: "Άνοιξη στην Πωγωνιανή",
      heroTitle: "Η φύση ανοίγει ξανά τον ορίζοντα",
      title: "Όλα ξαναρχίζουν.",
      text: "Ανθισμένες διαδρομές, ζωηρό πράσινο και το πασχαλινό φως της κοινότητας. Η Πωγωνιανή βγαίνει ξανά στην ύπαιθρο.",
      facts: ["Άνθηση", "Πάσχα", "Περίπατος"],
      note: "Άνοιξη στους δρόμους και στα ξωκλήσια",
      main: "assets/seasonal/spring/springPog2.webp",
      detail: "assets/seasonal/spring/easterPog.webp",
      hero: "assets/seasonal/spring/springPog2.webp",
      alt: "Ανθισμένο δέντρο σε δρόμο της Πωγωνιανής την άνοιξη",
      detailAlt: "Ανάσταση στην Πωγωνιανή"
    },
    summer: {
      number: "02",
      label: "Καλοκαίρι",
      heroKicker: "Καλοκαίρι στην Πωγωνιανή",
      heroTitle: "Επιστροφή, παρέες και μεγάλοι ορίζοντες",
      title: "Το χωριό ξαναγεμίζει.",
      text: "Οι δρόμοι και η πλατεία παίρνουν ζωή, το φως κρατά περισσότερο και κάθε ηλιοβασίλεμα γίνεται αφορμή για άλλη μία βόλτα.",
      facts: ["Αντάμωμα", "Πλατεία", "Ηλιοβασίλεμα"],
      note: "Καλοκαιρινές επιστροφές στην Πωγωνιανή",
      main: "assets/seasonal/summer/sumPog9.webp",
      detail: "assets/seasonal/summer/sumPog10.webp",
      hero: "assets/seasonal/summer/sumPog9.webp",
      alt: "Καλοκαιρινή βραδιά στο κέντρο της Πωγωνιανής",
      detailAlt: "Ηλιοβασίλεμα στα βουνά του Πωγωνίου"
    },
    autumn: {
      number: "03",
      label: "Φθινόπωρο",
      heroKicker: "Φθινόπωρο στην Πωγωνιανή",
      heroTitle: "Δάσος, νερό και χρυσαφένιο φως",
      title: "Το νερό δείχνει τον δρόμο.",
      text: "Στις διαδρομές του Γορμού, κάτω από τον πυκνό ίσκιο, η φύση γίνεται πιο ήσυχη και πιο βαθιά.",
      facts: ["Πεζοπορία", "Γορμός", "Δάσος"],
      note: "Διαδρομές κοντά στον Γορμό",
      main: "assets/seasonal/autumn/river2023.webp",
      detail: "assets/seasonal/autumn/river4.webp",
      hero: "assets/seasonal/autumn/river2023.webp",
      alt: "Πεζοπορία στο δάσος του Πωγωνίου το φθινόπωρο",
      detailAlt: "Νερά του ποταμού Γορμού"
    },
    winter: {
      number: "04",
      label: "Χειμώνας",
      heroKicker: "Χειμώνας στην Πωγωνιανή",
      heroTitle: "Πέτρα, γυμνά κλαδιά και απόλυτη ησυχία",
      title: "Η σιωπή έχει τοπίο.",
      text: "Το χωριό αποκαλύπτει τη λιτή ορεινή του μορφή. Καθαρό φως, πέτρινα σπίτια και η αίσθηση ότι ο χρόνος κινείται πιο αργά.",
      facts: ["Πέτρα", "Ηρεμία", "Βουνό"],
      note: "Χειμωνιάτικο φως στην Πωγωνιανή",
      main: "assets/seasonal/winter/winterPog2.webp",
      detail: "assets/seasonal/winter/winterPog3.webp",
      hero: "assets/seasonal/winter/winterPog2.webp",
      alt: "Χειμωνιάτικος δρόμος στην Πωγωνιανή",
      detailAlt: "Λίμνη και βουνό τον χειμώνα"
    }
  };

  const photos = [
    ["spring", "easterPog", "Η Ανάσταση στο χωριό", "Η πασχαλινή σύναξη στην Πωγωνιανή"],
    ["spring", "springLake", "Άνοιξη στη λίμνη", "Τραπέζι πικνίκ δίπλα στη λίμνη την άνοιξη"],
    ["spring", "springPog", "Το μονοπάτι ανθίζει", "Ανοιξιάτικο μονοπάτι στην ύπαιθρο"],
    ["spring", "springPog2", "Λευκή ανθοφορία", "Ανθισμένο δέντρο σε δρόμο της Πωγωνιανής"],
    ["spring", "springPog3", "Στον ίσκιο των δέντρων", "Πράσινος χώρος στην Πωγωνιανή"],
    ["spring", "springPog4", "Η πλατεία ξυπνά", "Η πλατεία της Πωγωνιανής την άνοιξη"],
    ["spring", "springPog5", "Το μικρό ξωκλήσι", "Πέτρινο ξωκλήσι μέσα στην ανοιξιάτικη φύση"],
    ["spring", "springPog6", "Πράσινες πλαγιές", "Ζώο που βόσκει σε πράσινη πλαγιά"],
    ["spring", "springPog7", "Μετά τη βροχή", "Χωματόδρομος στα βουνά του Πωγωνίου"],
    ["spring", "springPog8", "Παρέα στη φύση", "Παρέα σε ανοιξιάτικη εξόρμηση"],
    ["spring", "springPog9", "Σούρουπο στις στέγες", "Απογευματινή θέα πάνω από τις στέγες του χωριού"],
    ["spring", "springPog10", "Άνθη και κοπάδι", "Αγελάδα δίπλα σε ανθισμένα δέντρα"],
    ["summer", "summerPog7", "Ορίζοντας του Αυγούστου", "Καλοκαιρινή θέα προς τα βουνά"],
    ["summer", "sumPog", "Πρωινό πάνω από το χωριό", "Καλοκαιρινή θέα της Πωγωνιανής από ψηλά"],
    ["summer", "sumPog2", "Ο δρόμος το σούρουπο", "Δρόμος του χωριού σε καλοκαιρινό σούρουπο"],
    ["summer", "sumPog3", "Η ώρα που πέφτει το φως", "Δέντρα και απογευματινό καλοκαιρινό φως"],
    ["summer", "sumPog4", "Μονοπάτι μέσα στο πράσινο", "Σκιερό καλοκαιρινό μονοπάτι"],
    ["summer", "sumPog5", "Σύννεφα πάνω από τις πλαγιές", "Καλοκαιρινό τοπίο του Πωγωνίου"],
    ["summer", "sumPog6", "Το τελευταίο φως", "Ηλιοβασίλεμα πίσω από το βουνό"],
    ["summer", "sumPog8", "Δρόμος προς το βουνό", "Καλοκαιρινός δρόμος με θέα το βουνό"],
    ["summer", "sumPog9", "Βραδιά στο κέντρο", "Καλοκαιρινή βραδιά στην Πωγωνιανή"],
    ["summer", "sumPog10", "Χρυσός ορίζοντας", "Πορτοκαλί ηλιοβασίλεμα στα βουνά"],
    ["summer", "sumPog11", "Ο ουρανός φλέγεται", "Έντονο κόκκινο καλοκαιρινό ηλιοβασίλεμα"],
    ["summer", "sumPog12", "Δίπλα στο νερό", "Καλοκαιρινό τοπίο δίπλα στη λίμνη"],
    ["autumn", "river2", "Στη σκιά του Γορμού", "Πράσινη διαδρομή κοντά στον Γορμό"],
    ["autumn", "river3", "Πέρασμα του νερού", "Βραχώδες πέρασμα με νερό"],
    ["autumn", "river4", "Η κρυφή βάθρα", "Φυσική βάθρα σε βραχώδες τοπίο"],
    ["autumn", "river2023", "Πορεία μέσα στο δάσος", "Ομάδα πεζοπόρων σε δασική διαδρομή"],
    ["winter", "winterPog", "Τα φώτα στα πέτρινα σπίτια", "Χειμωνιάτικο δειλινό σε δρόμο της Πωγωνιανής"],
    ["winter", "winterPog2", "Καθαρός χειμωνιάτικος ορίζοντας", "Δρόμος του χωριού και βουνά τον χειμώνα"],
    ["winter", "winterPog3", "Ήρεμη λίμνη", "Χειμωνιάτικη λίμνη με τραπέζι πικνίκ"],
    ["winter", "winterPog4", "Ο πλάτανος χωρίς φύλλα", "Μεγάλος γυμνός πλάτανος ανάμεσα σε πέτρινα σπίτια"]
  ];

  const seasonOrder = ["spring", "summer", "autumn", "winter"];
  const gallery = document.getElementById("galleryGrid");
  const galleryStatus = document.getElementById("galleryStatus");
  const heroCard = document.getElementById("seasonHeroCard");
  const heroImage = document.getElementById("seasonHeroImage");
  const heroKicker = document.getElementById("seasonHeroKicker");
  const heroTitle = document.getElementById("seasonHeroTitle");
  const seasonCounter = document.getElementById("seasonCounter");
  const seasonIndex = document.getElementById("seasonIndex");
  const experienceTitle = document.getElementById("seasonExperienceTitle");
  const experienceText = document.getElementById("seasonExperienceText");
  const seasonFacts = document.getElementById("seasonFacts");
  const seasonMainImage = document.getElementById("seasonMainImage");
  const seasonDetailImage = document.getElementById("seasonDetailImage");
  const seasonPhotoNote = document.getElementById("seasonPhotoNote");
  const openSeasonGallery = document.getElementById("openSeasonGallery");
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");

  function seasonForMonth(month) {
    if ([2, 3, 4].includes(month)) return "spring";
    if ([5, 6, 7].includes(month)) return "summer";
    if ([8, 9, 10].includes(month)) return "autumn";
    return "winter";
  }

  function readSeason() {
    try {
      const saved = localStorage.getItem("pogoniani-season");
      return seasonOrder.includes(saved) ? saved : seasonForMonth(new Date().getMonth());
    } catch {
      return seasonForMonth(new Date().getMonth());
    }
  }

  function writeSeason(season) {
    try { localStorage.setItem("pogoniani-season", season); } catch {}
  }

  function assetPath(season, name) {
    return `assets/seasonal/${season}/${name}.webp`;
  }

  function updateGallery(filter) {
    if (!gallery) return;
    if (!seasonOrder.includes(filter)) return;
    const shown = photos.filter(([season]) => season === filter);
    gallery.innerHTML = shown.map(([season, name, title, alt], index) => {
      const data = seasonalData[season];
      return `
        <button class="gallery-item" style="animation-delay:${Math.min(index, 10) * 34}ms" data-category="${season}" data-season-label="${data.label}" data-title="${title}" data-image="${assetPath(season, name)}" type="button">
          <img src="${assetPath(season, name)}" loading="lazy" decoding="async" alt="${alt}" />
          <span>${title}</span>
        </button>`;
    }).join("");

    const filterLabel = seasonalData[filter].label;
    if (galleryStatus) galleryStatus.textContent = `${shown.length} φωτογραφίες — ${filterLabel}`;

    gallery.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("click", () => {
        if (!modal || !modalImage || !modalTitle) return;
        modalImage.src = item.dataset.image || "";
        modalImage.alt = item.querySelector("img")?.alt || "Φωτογραφία από την Πωγωνιανή";
        modalTitle.textContent = item.dataset.title || "Πωγωνιανή";
        openDialog(modal);
      });
    });
  }

  function selectGalleryFilter(filter) {
    document.querySelectorAll("[data-season-filter]").forEach((button) => {
      const selected = button.dataset.seasonFilter === filter;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    updateGallery(filter);
  }

  function setSeason(season, options = {}) {
    const data = seasonalData[season];
    if (!data) return;
    root.dataset.season = season;
    writeSeason(season);
    heroCard?.classList.add("is-changing");

    document.querySelectorAll("[data-set-season]").forEach((button) => {
      const selected = button.dataset.setSeason === season;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-selected", String(selected));
    });

    const apply = () => {
      if (heroImage) {
        heroImage.src = data.hero;
        heroImage.alt = data.alt;
      }
      if (heroKicker) heroKicker.textContent = data.heroKicker;
      if (heroTitle) heroTitle.textContent = data.heroTitle;
      if (seasonCounter) seasonCounter.textContent = `${data.number} / 04`;
      if (heroCard) {
        heroCard.dataset.label = data.label.toUpperCase();
        heroCard.classList.remove("is-changing");
      }
      if (seasonIndex) seasonIndex.textContent = `${data.number} — ${data.label.toUpperCase()}`;
      if (experienceTitle) experienceTitle.textContent = data.title;
      if (experienceText) experienceText.textContent = data.text;
      if (seasonFacts) seasonFacts.innerHTML = data.facts.map((fact) => `<span>${fact}</span>`).join("");
      if (seasonMainImage) {
        seasonMainImage.src = data.main;
        seasonMainImage.alt = data.alt;
      }
      if (seasonDetailImage) {
        seasonDetailImage.src = data.detail;
        seasonDetailImage.alt = data.detailAlt;
      }
      if (seasonPhotoNote) seasonPhotoNote.textContent = data.note;
      if (openSeasonGallery) {
        openSeasonGallery.innerHTML = `Δες ${data.label === "Άνοιξη" ? "την" : data.label === "Καλοκαίρι" ? "το" : data.label === "Φθινόπωρο" ? "το" : "τον"} ${data.label.toLowerCase()} <span>→</span>`;
      }
      if (options.filter !== false) selectGalleryFilter(season);
    };

    if (reduceMotion) apply();
    else window.setTimeout(apply, 180);
  }

  document.querySelectorAll("[data-set-season]").forEach((button) => {
    button.addEventListener("click", () => setSeason(button.dataset.setSeason));
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const current = seasonOrder.indexOf(button.dataset.setSeason);
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const next = seasonOrder[(current + delta + seasonOrder.length) % seasonOrder.length];
      const nextButton = document.querySelector(`.season-switcher [data-set-season="${next}"]`);
      nextButton?.focus();
      setSeason(next);
    });
  });

  document.querySelectorAll("[data-season-filter]").forEach((button) => {
    button.addEventListener("click", () => selectGalleryFilter(button.dataset.seasonFilter));
  });

  openSeasonGallery?.addEventListener("click", () => {
    selectGalleryFilter(root.dataset.season || "autumn");
    document.getElementById("gallery")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });

  if (!reduceMotion) {
    const atmosphere = document.createElement("div");
    atmosphere.className = "season-atmosphere";
    atmosphere.setAttribute("aria-hidden", "true");
    atmosphere.innerHTML = Array.from({ length: 16 }, (_, index) =>
      `<i class="season-particle" style="left:${(index * 17 + 6) % 100}%;--delay:-${index * .83}s;--duration:${10 + (index % 7)}s;--drift:${24 + (index % 6) * 11}px"></i>`
    ).join("");
    document.body.prepend(atmosphere);
  }

  setSeason(readSeason());
})();
