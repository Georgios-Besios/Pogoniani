const heroSeasonCard = document.getElementById('seasonHeroCard');
const heroSeasonImage = document.getElementById('seasonHeroImage');
const heroSeasonKicker = document.getElementById('seasonHeroKicker');
const heroSeasonTitle = document.getElementById('seasonHeroTitle');

const heroSeasonSlides = [
  { image: 'assets/photos/winter-path.jpg', alt: 'Χιονισμένος δρόμος στην Πωγωνιανή τον χειμώνα', kicker: 'Χειμώνας στην Πωγωνιανή', title: 'Χιόνι και πέτρα' },
  { image: 'assets/photos/nature-mountains.jpg', alt: 'Φυσικό τοπίο και βουνά κοντά στην Πωγωνιανή την άνοιξη', kicker: 'Άνοιξη στο Πωγώνι', title: 'Πράσινο και καθαρός αέρας' },
  { image: 'assets/photos/square-main.jpg', alt: 'Η πλατεία της Πωγωνιανής σε φωτεινή εποχή', kicker: 'Καλοκαίρι στο χωριό', title: 'Πλατεία και επιστροφή' },
  { image: 'assets/photos/church-02.jpg', alt: 'Πέτρινη εκκλησία στην Πωγωνιανή με δέντρα στον περίβολο', kicker: 'Φθινόπωρο στη Βοστίνα', title: 'Ηρεμία και μνήμη' }
];

let heroSeasonIndex = 0;

function renderHeroSeasonSlide(index) {
  if (!heroSeasonCard || !heroSeasonImage || !heroSeasonKicker || !heroSeasonTitle) return;
  const slide = heroSeasonSlides[index];
  heroSeasonCard.classList.add('is-changing');
  window.setTimeout(() => {
    heroSeasonImage.src = slide.image;
    heroSeasonImage.alt = slide.alt;
    heroSeasonKicker.textContent = slide.kicker;
    heroSeasonTitle.textContent = slide.title;
    heroSeasonCard.setAttribute('aria-label', slide.kicker + '. Πάτησε για επόμενη εποχή.');
    heroSeasonCard.classList.remove('is-changing');
  }, 150);
}

function nextHeroSeasonSlide() {
  heroSeasonIndex = (heroSeasonIndex + 1) % heroSeasonSlides.length;
  renderHeroSeasonSlide(heroSeasonIndex);
}

heroSeasonCard?.addEventListener('click', nextHeroSeasonSlide);
heroSeasonCard?.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  nextHeroSeasonSlide();
});

function removeVisitPlanner() {
  document.getElementById('planner')?.remove();
  Array.from(document.querySelectorAll('.nav-menu a')).forEach((link) => {
    if (link.getAttribute('href') === '#planner' || link.textContent.trim() === 'Πλάνο επίσκεψης') link.remove();
  });
}

function insertWeatherNavLink() {
  const navMenu = document.getElementById('nav-menu');
  if (!navMenu) return;
  const hasWeather = Array.from(navMenu.querySelectorAll('a')).some((link) => link.getAttribute('href') === '#weather');
  if (hasWeather) return;
  const link = document.createElement('a');
  link.href = '#weather';
  link.textContent = 'Καιρός';
  const directionsLink = Array.from(navMenu.querySelectorAll('a')).find((item) => item.getAttribute('href') === '#directions');
  if (directionsLink) directionsLink.insertAdjacentElement('afterend', link);
  else navMenu.appendChild(link);
}

const weatherStyle = document.createElement('style');
weatherStyle.textContent = `
  .weather-section { position: relative; overflow: hidden; }
  .weather-shell { width: min(var(--container), calc(100% - 28px)); margin: 0 auto; display: grid; grid-template-columns: minmax(280px, .92fr) minmax(0, 1.08fr); gap: 22px; align-items: stretch; }
  .weather-widget, .weather-forecast-card { border: 1px solid var(--line); border-radius: var(--radius-lg); background: radial-gradient(circle at 18% 10%, rgba(243,201,121,.22), transparent 30%), linear-gradient(135deg, rgba(255,255,255,.10), rgba(255,255,255,.035)); box-shadow: var(--shadow); backdrop-filter: blur(18px); }
  .weather-widget { min-height: 390px; padding: clamp(24px, 4vw, 38px); display: grid; align-content: space-between; position: relative; }
  .weather-widget::after { content: ''; position: absolute; width: 210px; height: 210px; right: -70px; top: -70px; border-radius: 999px; background: rgba(243,201,121,.14); filter: blur(4px); }
  .weather-topline { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; position: relative; z-index: 1; }
  .weather-status { padding: 8px 12px; border-radius: 999px; color: var(--gold); border: 1px solid rgba(243,201,121,.35); background: rgba(243,201,121,.08); font-size: .82rem; font-weight: 900; white-space: nowrap; }
  .weather-main { position: relative; z-index: 1; }
  .weather-temp-row { display: flex; align-items: center; gap: 18px; margin: 26px 0 8px; }
  .weather-icon { font-size: clamp(3.2rem, 7vw, 5.8rem); line-height: 1; filter: drop-shadow(0 14px 24px rgba(0,0,0,.20)); }
  .weather-temp { font-size: clamp(3.5rem, 9vw, 6.5rem); line-height: .88; letter-spacing: -.08em; color: var(--text); font-weight: 1000; }
  .weather-condition { color: var(--text); font-size: clamp(1.15rem, 2.5vw, 1.7rem); font-weight: 950; }
  .weather-meta { margin-top: 20px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; position: relative; z-index: 1; }
  .weather-meta article, .weather-day { border: 1px solid var(--line); background: rgba(255,255,255,.055); }
  .weather-meta article { padding: 14px; border-radius: 18px; }
  .weather-meta span { display: block; color: var(--muted); font-size: .78rem; font-weight: 850; }
  .weather-meta strong { display: block; margin-top: 6px; color: var(--text); font-size: 1.02rem; }
  .weather-forecast-card { padding: clamp(22px, 3vw, 30px); }
  .weather-forecast-list { display: grid; gap: 12px; margin-top: 20px; }
  .weather-day { display: grid; grid-template-columns: 1.2fr auto auto; gap: 12px; align-items: center; padding: 14px 16px; border-radius: 18px; }
  .weather-day strong { color: var(--text); }
  .weather-day span, .weather-credit, .weather-error { color: var(--muted); }
  .weather-day span { font-weight: 850; }
  .weather-credit { margin-top: 18px; font-size: .86rem; }
  .weather-error { margin-top: 18px; }
  @media (max-width: 900px) { .weather-shell { grid-template-columns: 1fr; } }
  @media (max-width: 620px) { .weather-meta, .weather-day { grid-template-columns: 1fr; } }
`;
document.head.appendChild(weatherStyle);

function createWeatherSection() {
  if (document.getElementById('weather')) return;
  const section = document.createElement('section');
  section.className = 'section weather-section';
  section.id = 'weather';
  section.innerHTML = `
    <div class='section-title centered reveal visible'>
      <p class='eyebrow'>Live Καιρός</p>
      <h2>Ο καιρός τώρα στην Πωγωνιανή.</h2>
      <p>Μια ζωντανή εικόνα για θερμοκρασία, άνεμο, υγρασία και σύντομη πρόγνωση.</p>
    </div>
    <div class='weather-shell reveal visible'>
      <section class='weather-widget' aria-label='Τρέχων καιρός Πωγωνιανής'>
        <div class='weather-topline'><div><p class='eyebrow'>Πωγωνιανή / Βοστίνα</p><h3>Τώρα στο χωριό</h3></div><span class='weather-status' id='weatherStatus'>Σύνδεση...</span></div>
        <div class='weather-main'><div class='weather-temp-row'><span class='weather-icon' id='weatherIcon'>☁️</span><strong class='weather-temp' id='weatherTemp'>--°</strong></div><p class='weather-condition' id='weatherCondition'>Φόρτωση καιρού...</p></div>
        <div class='weather-meta'><article><span>Άνεμος</span><strong id='weatherWind'>-- km/h</strong></article><article><span>Υγρασία</span><strong id='weatherHumidity'>--%</strong></article><article><span>Αίσθηση</span><strong id='weatherFeels'>--°C</strong></article></div>
      </section>
      <aside class='weather-forecast-card' aria-label='Πρόγνωση καιρού Πωγωνιανής'>
        <p class='eyebrow'>Πρόγνωση</p><h3>Επόμενες ημέρες</h3><div class='weather-forecast-list' id='weatherForecastList'><p class='weather-error'>Φόρτωση πρόγνωσης...</p></div><p class='weather-credit' id='weatherUpdated'>Δεδομένα καιρού από Open-Meteo.</p>
      </aside>
    </div>
  `;
  const directions = document.getElementById('directions');
  const identity = document.getElementById('identity');
  if (directions) directions.insertAdjacentElement('afterend', section);
  else if (identity) identity.insertAdjacentElement('afterend', section);
  else document.querySelector('main')?.prepend(section);
}

const weatherCodeMap = {
  0: ['☀️', 'Καθαρός ουρανός'], 1: ['🌤️', 'Κυρίως αίθριος'], 2: ['⛅', 'Μερική συννεφιά'], 3: ['☁️', 'Συννεφιά'],
  45: ['🌫️', 'Ομίχλη'], 48: ['🌫️', 'Παγωμένη ομίχλη'], 51: ['🌦️', 'Ασθενές ψιλόβροχο'], 53: ['🌦️', 'Ψιλόβροχο'], 55: ['🌧️', 'Έντονο ψιλόβροχο'],
  61: ['🌧️', 'Ασθενής βροχή'], 63: ['🌧️', 'Βροχή'], 65: ['🌧️', 'Έντονη βροχή'], 71: ['🌨️', 'Ασθενής χιονόπτωση'], 73: ['🌨️', 'Χιονόπτωση'], 75: ['❄️', 'Έντονη χιονόπτωση'],
  80: ['🌦️', 'Τοπικές μπόρες'], 81: ['🌧️', 'Μπόρες'], 82: ['⛈️', 'Ισχυρές μπόρες'], 95: ['⛈️', 'Καταιγίδα'], 96: ['⛈️', 'Καταιγίδα με χαλάζι'], 99: ['⛈️', 'Ισχυρή καταιγίδα με χαλάζι']
};

function weatherDescription(code) { return weatherCodeMap[code] || ['🌡️', 'Καιρικές συνθήκες']; }
function formatGreekDay(dateString) { return new Intl.DateTimeFormat('el-GR', { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date(dateString + 'T12:00:00')); }

async function loadPogonianiWeather() {
  const status = document.getElementById('weatherStatus');
  const icon = document.getElementById('weatherIcon');
  const temp = document.getElementById('weatherTemp');
  const condition = document.getElementById('weatherCondition');
  const wind = document.getElementById('weatherWind');
  const humidity = document.getElementById('weatherHumidity');
  const feels = document.getElementById('weatherFeels');
  const forecastList = document.getElementById('weatherForecastList');
  const updated = document.getElementById('weatherUpdated');
  if (!status || !icon || !temp || !condition || !wind || !humidity || !feels || !forecastList || !updated) return;
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=40.005&longitude=20.334&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FAthens&forecast_days=4';
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error('Weather request failed');
    const data = await response.json();
    const current = data.current;
    const currentDescription = weatherDescription(current.weather_code);
    icon.textContent = currentDescription[0];
    temp.textContent = Math.round(current.temperature_2m) + '°';
    condition.textContent = currentDescription[1];
    wind.textContent = Math.round(current.wind_speed_10m) + ' km/h';
    humidity.textContent = Math.round(current.relative_humidity_2m) + '%';
    feels.textContent = Math.round(current.apparent_temperature) + '°C';
    status.textContent = 'Live';
    forecastList.innerHTML = data.daily.time.map((day, index) => {
      const dayDescription = weatherDescription(data.daily.weather_code[index]);
      const min = Math.round(data.daily.temperature_2m_min[index]);
      const max = Math.round(data.daily.temperature_2m_max[index]);
      const rain = data.daily.precipitation_probability_max[index] ?? 0;
      return `<article class='weather-day'><strong>${dayDescription[0]} ${formatGreekDay(day)}</strong><span>${dayDescription[1]}</span><span>${min}° / ${max}° · ${rain}% βροχή</span></article>`;
    }).join('');
    const updatedAt = new Intl.DateTimeFormat('el-GR', { timeZone: 'Europe/Athens', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(current.time));
    updated.textContent = 'Τελευταία ενημέρωση: ' + updatedAt + ' · Δεδομένα Open-Meteo.';
  } catch (error) {
    status.textContent = 'Offline';
    condition.textContent = 'Ο καιρός δεν φορτώθηκε προσωρινά.';
    forecastList.innerHTML = `<p class='weather-error'>Δεν ήταν δυνατή η φόρτωση της πρόγνωσης. Δοκίμασε ξανά αργότερα.</p>`;
  }
}

removeVisitPlanner();
insertWeatherNavLink();
createWeatherSection();
loadPogonianiWeather();
window.addEventListener('load', removeVisitPlanner);
