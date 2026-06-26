function placeWeatherAfterDirections() {
  const weather = document.getElementById("weather");
  const directions = document.getElementById("directions");
  if (!weather || !directions) return;
  directions.insertAdjacentElement("afterend", weather);
}

placeWeatherAfterDirections();
window.addEventListener("load", placeWeatherAfterDirections);
