const museumPin = document.querySelector('.map-pin[data-place="museum"]');

museumPin?.addEventListener("click", () => {
  window.setTimeout(() => {
    const panel = document.getElementById("placePanel");
    if (!panel || panel.querySelector(".museum-more-btn")) return;

    const link = document.createElement("a");
    link.className = "btn btn-primary museum-more-btn";
    link.href = "#folklore-museum";
    link.textContent = "Μάθε περισσότερα";
    panel.appendChild(link);
  }, 0);
});
