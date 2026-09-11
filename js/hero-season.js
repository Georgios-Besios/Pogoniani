const heroSeasonCard = document.getElementById("seasonHeroCard");
const heroSeasonImage = document.getElementById("seasonHeroImage");
const heroSeasonKicker = document.getElementById("seasonHeroKicker");
const heroSeasonTitle = document.getElementById("seasonHeroTitle");
const reduceHeroMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const heroSeasonSlides = [
  {
    image: "assets/photos/winter-path.jpg",
    alt: "Χιονισμένος δρόμος στην Πωγωνιανή τον χειμώνα",
    kicker: "Χειμώνας στην Πωγωνιανή",
    title: "Χιόνι και πέτρα"
  },
  {
    image: "assets/photos/nature-mountains.jpg",
    alt: "Φυσικό τοπίο και βουνά κοντά στην Πωγωνιανή την άνοιξη",
    kicker: "Άνοιξη στο Πωγώνι",
    title: "Πράσινο και καθαρός αέρας"
  },
  {
    image: "assets/photos/square-main.jpg",
    alt: "Η πλατεία της Πωγωνιανής το καλοκαίρι",
    kicker: "Καλοκαίρι στο χωριό",
    title: "Πλατεία και επιστροφή"
  },
  {
    image: "assets/photos/church-02.jpg",
    alt: "Πέτρινη εκκλησία στην Πωγωνιανή με δέντρα στον περίβολο",
    kicker: "Φθινόπωρο στη Βοστίνα",
    title: "Ηρεμία και μνήμη"
  }
];

let heroSeasonIndex = 0;

function renderHeroSeasonSlide(index) {
  if (!heroSeasonCard || !heroSeasonImage || !heroSeasonKicker || !heroSeasonTitle) return;
  const slide = heroSeasonSlides[index];

  const applySlide = () => {
    heroSeasonImage.src = slide.image;
    heroSeasonImage.alt = slide.alt;
    heroSeasonKicker.textContent = slide.kicker;
    heroSeasonTitle.textContent = slide.title;
    heroSeasonCard.setAttribute("aria-label", `${slide.kicker}. Πάτησε για επόμενη εποχή.`);
    heroSeasonCard.classList.remove("is-changing");
  };

  if (reduceHeroMotion) {
    applySlide();
    return;
  }

  heroSeasonCard.classList.add("is-changing");
  window.setTimeout(applySlide, 150);
}

function nextHeroSeasonSlide() {
  heroSeasonIndex = (heroSeasonIndex + 1) % heroSeasonSlides.length;
  renderHeroSeasonSlide(heroSeasonIndex);
}

heroSeasonCard?.addEventListener("click", nextHeroSeasonSlide);
heroSeasonCard?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  nextHeroSeasonSlide();
});

// Repair the two exterior museum thumbnails. The old SVG wrappers were low-resolution
// and one of them referenced an external image that browsers do not reliably render
// when the SVG itself is used inside an <img> element.
(function repairMuseumExteriorPhotos() {
  const exteriorPhoto = "assets/photos/museum-laografiko.jpg";
  const mainImage = document.getElementById("museumMainImg");
  const thumbs = [...document.querySelectorAll(".museum-thumb")];

  if (mainImage && /museum-pogoniani-0[12]\.svg$/.test(mainImage.getAttribute("src") || "")) {
    mainImage.src = exteriorPhoto;
    mainImage.style.objectPosition = "center";
  }

  const exteriorSettings = [
    {
      title: "Εξωτερικός χώρος",
      position: "center",
      alt: "Εξωτερικός χώρος του Λαογραφικού Μουσείου Πωγωνιανής"
    },
    {
      title: "Αυλή και πρόσοψη",
      position: "62% center",
      alt: "Πέτρινη αυλή και πρόσοψη του Λαογραφικού Μουσείου Πωγωνιανής"
    }
  ];

  exteriorSettings.forEach((settings, index) => {
    const button = thumbs[index];
    if (!button) return;

    button.dataset.image = exteriorPhoto;
    button.dataset.position = settings.position;
    button.dataset.alt = settings.alt;

    const image = button.querySelector("img");
    if (image) {
      image.src = exteriorPhoto;
      image.alt = "";
      image.style.objectPosition = settings.position;
    }
  });

  const galleryMuseum = document.querySelector('.gallery-item[data-category="memory"]');
  if (galleryMuseum) {
    galleryMuseum.dataset.image = exteriorPhoto;
    const image = galleryMuseum.querySelector("img");
    if (image) image.src = exteriorPhoto;
  }

  thumbs.slice(0, 2).forEach((button) => {
    button.addEventListener("click", () => {
      window.setTimeout(() => {
        if (mainImage) mainImage.style.objectPosition = button.dataset.position || "center";
      }, 0);
    });
  });
})();
