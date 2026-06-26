const heroSeasonCard = document.getElementById("seasonHeroCard");
const heroSeasonImage = document.getElementById("seasonHeroImage");
const heroSeasonKicker = document.getElementById("seasonHeroKicker");
const heroSeasonTitle = document.getElementById("seasonHeroTitle");

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
    alt: "Η πλατεία της Πωγωνιανής σε φωτεινή εποχή",
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
  heroSeasonCard.classList.add("is-changing");

  window.setTimeout(() => {
    heroSeasonImage.src = slide.image;
    heroSeasonImage.alt = slide.alt;
    heroSeasonKicker.textContent = slide.kicker;
    heroSeasonTitle.textContent = slide.title;
    heroSeasonCard.setAttribute("aria-label", `${slide.kicker}. Πάτησε για επόμενη εποχή.`);
    heroSeasonCard.classList.remove("is-changing");
  }, 150);
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
