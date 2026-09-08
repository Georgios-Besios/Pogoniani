const museumMainImage = document.getElementById("museumMainImg");
const museumMainTitle = document.getElementById("museumMainTitle");
const museumMainCaption = document.getElementById("museumMainCaption");
const museumThumbs = [...document.querySelectorAll(".museum-thumb")];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function selectMuseumImage(button) {
  if (!button || !museumMainImage || !museumMainTitle || !museumMainCaption) return;

  const applyImage = () => {
    museumMainImage.src = button.dataset.image || "";
    museumMainImage.alt = button.dataset.alt || button.dataset.title || "Έκθεμα του Λαογραφικού Μουσείου Πωγωνιανής";
    museumMainTitle.textContent = button.dataset.title || "Λαογραφικό Μουσείο Πωγωνιανής";
    museumMainCaption.textContent = button.dataset.caption || "";
    museumMainImage.classList.remove("is-changing");
  };

  museumThumbs.forEach((thumb) => {
    const active = thumb === button;
    thumb.classList.toggle("active", active);
    thumb.setAttribute("aria-selected", String(active));
    thumb.tabIndex = active ? 0 : -1;
  });

  if (reduceMotion) {
    applyImage();
    return;
  }

  museumMainImage.classList.add("is-changing");
  window.setTimeout(applyImage, 140);
}

museumThumbs.forEach((button, index) => {
  button.addEventListener("click", () => selectMuseumImage(button));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % museumThumbs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + museumThumbs.length) % museumThumbs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = museumThumbs.length - 1;

    museumThumbs[nextIndex]?.focus();
    selectMuseumImage(museumThumbs[nextIndex]);
  });
});

const weatherCodeMap = {
  0: ["☀️", "Καθαρός ουρανός"],
  1: ["🌤️", "Κυρίως αίθριος"],
  2: ["⛅", "Μερική συννεφιά"],
  3: ["☁️", "Συννεφιά"],
  45: ["🌫️", "Ομίχλη"],
  48: ["🌫️", "Παγωμένη ομίχλη"],
  51: ["🌦️", "Ασθενές ψιλόβροχο"],
  53: ["🌦️", "Ψιλόβροχο"],
  55: ["🌧️", "Έντονο ψιλόβροχο"],
  56: ["🌧️", "Παγωμένο ψιλόβροχο"],
  57: ["🌧️", "Έντονο παγωμένο ψιλόβροχο"],
  61: ["🌧️", "Ασθενής βροχή"],
  63: ["🌧️", "Βροχή"],
  65: ["🌧️", "Έντονη βροχή"],
  66: ["🌧️", "Παγωμένη βροχή"],
  67: ["🌧️", "Έντονη παγωμένη βροχή"],
  71: ["🌨️", "Ασθενής χιονόπτωση"],
  73: ["🌨️", "Χιονόπτωση"],
  75: ["❄️", "Έντονη χιονόπτωση"],
  77: ["❄️", "Κόκκοι χιονιού"],
  80: ["🌦️", "Τοπικές μπόρες"],
  81: ["🌧️", "Μπόρες"],
  82: ["⛈️", "Ισχυρές μπόρες"],
  85: ["🌨️", "Μπόρες χιονιού"],
  86: ["❄️", "Ισχυρές μπόρες χιονιού"],
  95: ["⛈️", "Καταιγίδα"],
  96: ["⛈️", "Καταιγίδα με χαλάζι"],
  99: ["⛈️", "Ισχυρή καταιγίδα με χαλάζι"]
};

const weatherElements = {
  status: document.getElementById("weatherStatus"),
  icon: document.getElementById("weatherIcon"),
  temp: document.getElementById("weatherTemp"),
  condition: document.getElementById("weatherCondition"),
  wind: document.getElementById("weatherWind"),
  humidity: document.getElementById("weatherHumidity"),
  feels: document.getElementById("weatherFeels"),
  forecast: document.getElementById("weatherForecastList"),
  updated: document.getElementById("weatherUpdated"),
  refresh: document.getElementById("weatherRefresh")
};

const WEATHER_CACHE_KEY = "pogoniani-weather-v2";
const WEATHER_CACHE_TTL = 15 * 60 * 1000;
const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.004392&longitude=20.42283&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FAthens&forecast_days=4";

function weatherDescription(code) {
  return weatherCodeMap[code] || ["🌡️", "Καιρικές συνθήκες"];
}

function readWeatherCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY) || "null");
    if (!cached || !cached.data || typeof cached.timestamp !== "number") return null;
    return cached;
  } catch {
    return null;
  }
}

function writeWeatherCache(data) {
  try {
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    // Weather still works when local storage is unavailable.
  }
}

function formatGreekDay(dateString, index) {
  if (index === 0) return "Σήμερα";
  return new Intl.DateTimeFormat("el-GR", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  }).format(new Date(`${dateString}T12:00:00`));
}

function renderForecast(data) {
  if (!weatherElements.forecast) return;
  weatherElements.forecast.replaceChildren();

  data.daily.time.forEach((day, index) => {
    const [icon, label] = weatherDescription(data.daily.weather_code[index]);
    const min = Math.round(data.daily.temperature_2m_min[index]);
    const max = Math.round(data.daily.temperature_2m_max[index]);
    const rain = data.daily.precipitation_probability_max[index] ?? 0;

    const article = document.createElement("article");
    article.className = "weather-day";

    const dayLabel = document.createElement("strong");
    dayLabel.textContent = `${icon} ${formatGreekDay(day, index)}`;

    const condition = document.createElement("span");
    condition.textContent = label;

    const values = document.createElement("span");
    values.textContent = `${min}° / ${max}° · ${rain}% βροχή`;

    article.append(dayLabel, condition, values);
    weatherElements.forecast.appendChild(article);
  });
}

function renderWeather(data, { stale = false } = {}) {
  const current = data.current;
  const [icon, condition] = weatherDescription(current.weather_code);

  if (weatherElements.icon) weatherElements.icon.textContent = icon;
  if (weatherElements.temp) weatherElements.temp.textContent = `${Math.round(current.temperature_2m)}°`;
  if (weatherElements.condition) weatherElements.condition.textContent = condition;
  if (weatherElements.wind) weatherElements.wind.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  if (weatherElements.humidity) weatherElements.humidity.textContent = `${Math.round(current.relative_humidity_2m)}%`;
  if (weatherElements.feels) weatherElements.feels.textContent = `${Math.round(current.apparent_temperature)}°C`;
  if (weatherElements.status) weatherElements.status.textContent = stale ? "Πρόσφατα δεδομένα" : "Live";

  renderForecast(data);

  if (weatherElements.updated) {
    const [, time = ""] = String(current.time || "").split("T");
    weatherElements.updated.textContent = `${stale ? "Τελευταία διαθέσιμη ενημέρωση" : "Ενημέρωση"}: ${time || "μόλις"} · Δεδομένα Open-Meteo.`;
  }
}

function renderWeatherError() {
  if (weatherElements.status) weatherElements.status.textContent = "Offline";
  if (weatherElements.condition) weatherElements.condition.textContent = "Ο καιρός δεν φορτώθηκε προσωρινά.";
  if (weatherElements.forecast) {
    const message = document.createElement("p");
    message.className = "weather-error";
    message.textContent = "Δεν ήταν δυνατή η φόρτωση της πρόγνωσης. Δοκίμασε ξανά σε λίγο.";
    weatherElements.forecast.replaceChildren(message);
  }
}

async function loadWeather({ force = false } = {}) {
  if (!weatherElements.status) return;

  const cached = readWeatherCache();
  const freshCache = cached && Date.now() - cached.timestamp < WEATHER_CACHE_TTL;

  if (!force && freshCache) {
    renderWeather(cached.data);
    return;
  }

  weatherElements.status.textContent = "Σύνδεση...";
  if (weatherElements.refresh) weatherElements.refresh.disabled = true;

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(weatherUrl, {
      cache: "no-store",
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);

    const data = await response.json();
    writeWeatherCache(data);
    renderWeather(data);
  } catch {
    if (cached?.data) renderWeather(cached.data, { stale: true });
    else renderWeatherError();
  } finally {
    window.clearTimeout(timeout);
    if (weatherElements.refresh) weatherElements.refresh.disabled = false;
  }
}

weatherElements.refresh?.addEventListener("click", () => loadWeather({ force: true }));
loadWeather();
