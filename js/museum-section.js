function ensureMuseumSection() {
  if (document.getElementById('folklore-museum')) return;

  const style = document.createElement('style');
  style.textContent = `
    .museum-section { position: relative; overflow: hidden; }
    .museum-feature { width: min(var(--container), calc(100% - 28px)); margin: 0 auto; display: grid; grid-template-columns: minmax(280px, .88fr) minmax(0, 1.12fr); gap: 22px; align-items: stretch; }
    .museum-copy, .museum-photo-card, .museum-mini-card { border: 1px solid var(--line); background: var(--surface); border-radius: var(--radius-lg); box-shadow: var(--shadow); backdrop-filter: blur(18px); }
    .museum-copy { padding: clamp(24px, 4vw, 38px); display: grid; align-content: center; gap: 18px; }
    .museum-copy h3 { font-size: clamp(1.8rem, 4vw, 3.3rem); line-height: .95; letter-spacing: -.05em; }
    .museum-copy p { color: var(--muted); font-size: 1.03rem; }
    .museum-highlights { display: grid; gap: 12px; margin-top: 6px; }
    .museum-highlights article { padding: 14px 16px; border-radius: 18px; border: 1px solid var(--line); background: rgba(255,255,255,.055); }
    .museum-highlights span, .museum-caption-label { color: var(--gold); font-size: .78rem; font-weight: 950; text-transform: uppercase; letter-spacing: .12em; }
    .museum-highlights strong { display: block; margin-top: 6px; color: var(--text); }
    .museum-photo-card { overflow: hidden; position: relative; min-height: 520px; }
    .museum-photo-card img { width: 100%; height: 100%; min-height: 520px; object-fit: cover; display: block; }
    .museum-photo-card figcaption { position: absolute; left: 18px; right: 18px; bottom: 18px; padding: 16px 18px; border-radius: 22px; background: rgba(14,23,20,.78); color: #fff7ea; backdrop-filter: blur(14px); }
    .museum-gallery { width: min(var(--container), calc(100% - 28px)); margin: 24px auto 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
    .museum-mini-card { overflow: hidden; }
    .museum-mini-card img { width: 100%; height: 260px; object-fit: cover; display: block; }
    .museum-mini-card div { padding: 18px; }
    .museum-mini-card p { color: var(--muted); margin-top: 8px; }
    .place-panel .museum-more-btn { margin-top: 18px; width: max-content; }
    @media (max-width: 900px) { .museum-feature, .museum-gallery { grid-template-columns: 1fr; } .museum-photo-card, .museum-photo-card img { min-height: 360px; } .museum-mini-card img { height: 280px; } }
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.className = 'section museum-section';
  section.id = 'folklore-museum';
  section.innerHTML = `
    <div class="section-title centered reveal visible">
      <p class="eyebrow">Λαογραφικό Μουσείο</p>
      <h2>Λαογραφικό Μουσείο Πωγωνιανής</h2>
      <p>Ένας χώρος μνήμης για την καθημερινή ζωή, τη φορεσιά, τα εργαλεία και την τοπική ταυτότητα του Πωγωνίου.</p>
    </div>

    <div class="museum-feature reveal visible">
      <div class="museum-copy">
        <p class="eyebrow">Μνήμη της Βοστίνας</p>
        <h3>Το χωριό μέσα από τα αντικείμενά του.</h3>
        <p>
          Το Λαογραφικό Μουσείο παρουσιάζει τον υλικό κόσμο της Πωγωνιανής: παλιές φωτογραφίες,
          αντικείμενα σπιτιού, αγροτικά εργαλεία, φορεσιές και τεκμήρια που κρατούν ζωντανή την κοινωνική μνήμη του τόπου.
        </p>
        <div class="museum-highlights">
          <article><span>Έξω</span><strong>Πέτρινο κτίριο, αυλή και αρχιτεκτονική που ταιριάζει στον χαρακτήρα του χωριού.</strong></article>
          <article><span>Μέσα</span><strong>Εκθέματα καθημερινής ζωής: εργαλεία, οικιακά σκεύη, φωτογραφίες, έπιπλα και αντικείμενα εργασίας.</strong></article>
          <article><span>Φορεσιές</span><strong>Παραδοσιακές ενδυμασίες που συνδέουν την Πωγωνιανή με την ευρύτερη πολιτισμική ταυτότητα του Πωγωνίου.</strong></article>
        </div>
      </div>

      <figure class="museum-photo-card">
        <img src="assets/photos/museum-pogoniani-01.svg" alt="Εξωτερικός χώρος του Λαογραφικού Μουσείου Πωγωνιανής" loading="lazy" decoding="async" />
        <figcaption><span class="museum-caption-label">Εξωτερικός χώρος</span><br />Πέτρα, αυλή και είσοδος στον χώρο της λαογραφικής μνήμης.</figcaption>
      </figure>
    </div>

    <div class="museum-gallery reveal visible">
      <article class="museum-mini-card">
        <img src="assets/photos/museum-pogoniani-01.svg" alt="Πέτρινο κτίριο του Λαογραφικού Μουσείου Πωγωνιανής" loading="lazy" decoding="async" />
        <div><span class="museum-caption-label">Κτίριο</span><p>Ο επισκέπτης συναντά πρώτα την πέτρινη αρχιτεκτονική και την αυλή.</p></div>
      </article>
      <article class="museum-mini-card">
        <img src="assets/photos/museum-laografiko.jpg" alt="Λαογραφικό Μουσείο Πωγωνιανής" loading="lazy" decoding="async" />
        <div><span class="museum-caption-label">Συλλογή</span><p>Ο χώρος κρατά αντικείμενα που αφηγούνται την καθημερινή ζωή του χωριού.</p></div>
      </article>
      <article class="museum-mini-card">
        <img src="assets/photos/museum-laografiko.jpg" alt="Εκθέματα λαογραφικού μουσείου" loading="lazy" decoding="async" />
        <div><span class="museum-caption-label">Ταυτότητα</span><p>Η λαογραφική μνήμη συνδέει γενιές, οικογένειες, εργασία και παράδοση.</p></div>
      </article>
    </div>
  `;

  const see = document.getElementById('see');
  const directions = document.getElementById('directions');
  if (see) see.insertAdjacentElement('afterend', section);
  else if (directions) directions.insertAdjacentElement('beforebegin', section);
  else document.querySelector('main')?.appendChild(section);
}

function addMuseumButtonToPanel() {
  const panel = document.getElementById('placePanel');
  if (!panel) return;
  const title = panel.querySelector('h3')?.textContent || '';
  if (!title.includes('Λαογραφ')) return;
  if (panel.querySelector('.museum-more-btn')) return;
  const button = document.createElement('a');
  button.className = 'btn btn-primary museum-more-btn';
  button.href = '#folklore-museum';
  button.textContent = 'Μάθε περισσότερα';
  panel.appendChild(button);
}

function wireMuseumMapButton() {
  document.querySelectorAll('.map-pin[data-place="museum"]').forEach((pin) => {
    pin.addEventListener('click', () => window.setTimeout(addMuseumButtonToPanel, 0));
  });
}

function addMuseumNavLink() {
  const nav = document.getElementById('nav-menu');
  if (!nav || nav.querySelector('a[href="#folklore-museum"]')) return;
  const link = document.createElement('a');
  link.href = '#folklore-museum';
  link.textContent = 'Μουσείο';
  const see = nav.querySelector('a[href="#see"]');
  if (see) see.insertAdjacentElement('afterend', link);
  else nav.appendChild(link);
}

ensureMuseumSection();
wireMuseumMapButton();
addMuseumNavLink();
