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

// Keep a single exterior museum photo, remove the duplicate card and renumber the gallery.
(function normalizeMuseumGallery() {
  const exteriorPhoto = "assets/photos/museum-laografiko.jpg";
  const gallery = document.querySelector(".museum-thumbs");
  if (!gallery) return;

  const originalThumbs = [...gallery.querySelectorAll(".museum-thumb")];
  const duplicateExterior = originalThumbs.find(
    (button) => button.dataset.title === "Εξωτερικός χώρος"
  );
  duplicateExterior?.remove();

  const thumbs = [...gallery.querySelectorAll(".museum-thumb")];
  if (!thumbs.length) return;

  const first = thumbs[0];
  first.dataset.image = exteriorPhoto;
  first.dataset.position = "62% center";
  first.dataset.alt = "Πέτρινη αυλή και πρόσοψη του Λαογραφικού Μουσείου Πωγωνιανής";

  const firstThumbImage = first.querySelector("img");
  if (firstThumbImage) {
    firstThumbImage.src = exteriorPhoto;
    firstThumbImage.alt = "";
    firstThumbImage.style.objectPosition = first.dataset.position;
  }

  thumbs.forEach((button, index) => {
    button.classList.toggle("active", index === 0);
    button.setAttribute("aria-selected", index === 0 ? "true" : "false");
    button.tabIndex = index === 0 ? 0 : -1;

    const label = button.querySelector("span");
    if (!label) return;
    const title = label.textContent.replace(/^\d+\s*·\s*/, "").trim();
    label.textContent = `${String(index + 1).padStart(2, "0")} · ${title}`;
  });

  const mainImage = document.getElementById("museumMainImg");
  const mainTitle = document.getElementById("museumMainTitle");
  const mainCaption = document.getElementById("museumMainCaption");

  if (mainImage) {
    mainImage.src = first.dataset.image;
    mainImage.alt = first.dataset.alt || first.dataset.title || "Λαογραφικό Μουσείο Πωγωνιανής";
    mainImage.style.objectPosition = first.dataset.position || "center";
  }
  if (mainTitle) mainTitle.textContent = first.dataset.title || "Αυλή και πρόσοψη";
  if (mainCaption) mainCaption.textContent = first.dataset.caption || "";

  const galleryMuseum = document.querySelector('.gallery-item[data-category="memory"]');
  if (galleryMuseum) {
    galleryMuseum.dataset.image = exteriorPhoto;
    const image = galleryMuseum.querySelector("img");
    if (image) image.src = exteriorPhoto;
  }
})();
