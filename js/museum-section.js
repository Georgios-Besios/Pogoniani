function ensureMuseumSection() {
  if (document.getElementById('folklore-museum')) return;

  const imgs = [
    {
      src: 'assets/photos/FB_IMG_1782483458036.jpg',
      fallback: ['photos/FB_IMG_1782483458036.jpg', 'assets/photos/museum-pogoniani-01.svg'],
      t: 'Εξωτερικός χώρος',
      c: 'Η πρώτη εικόνα του επισκέπτη: πέτρα, αυλή και είσοδος στο Λαογραφικό Μουσείο Πωγωνιανής.'
    },
    {
      src: 'assets/photos/FB_IMG_1782483451491.jpg',
      fallback: ['photos/FB_IMG_1782483451491.jpg', 'assets/photos/museum-pogoniani-01.svg'],
      t: 'Πέτρινη αυλή και πρόσοψη',
      c: 'Το πέτρινο κτίριο και η αυλή εντάσσονται φυσικά στην αρχιτεκτονική ταυτότητα της Πωγωνιανής.'
    },
    {
      src: 'assets/photos/FB_IMG_1782483442914.jpg',
      fallback: ['photos/FB_IMG_1782483442914.jpg', 'assets/photos/museum-laografiko.jpg'],
      t: 'Αίθουσα ιστορικής μνήμης',
      c: 'Φωτογραφίες, αρχειακό υλικό και αντικείμενα συνδέουν το χωριό με τη μνήμη των ανθρώπων του.'
    },
    {
      src: 'assets/photos/FB_IMG_1782483436926.jpg',
      fallback: ['photos/FB_IMG_1782483436926.jpg', 'assets/photos/museum-laografiko.jpg'],
      t: 'Εργαλεία και αντικείμενα εργασίας',
      c: 'Αγροτικά εργαλεία, μηχανές, σκεύη και αντικείμενα παρουσιάζουν τον κόσμο της εργασίας και της καθημερινότητας.'
    },
    {
      src: 'assets/photos/FB_IMG_1782483431010.jpg',
      fallback: ['photos/FB_IMG_1782483431010.jpg', 'assets/photos/museum-laografiko.jpg'],
      t: 'Φορεσιές και προθήκες',
      c: 'Οι παραδοσιακές φορεσιές αναδεικνύουν την πωγωνίσια ενδυματολογική παράδοση και την τοπική αισθητική.'
    },
    {
      src: 'assets/photos/FB_IMG_1782483428771.jpg',
      fallback: ['photos/FB_IMG_1782483428771.jpg', 'assets/photos/museum-laografiko.jpg'],
      t: 'Συλλογή ενδυμασιών και ιστορικών τεκμηρίων',
      c: 'Η αίθουσα συνδυάζει φορεσιές, προθήκες και αντικείμενα που αφηγούνται διαφορετικές πλευρές της τοπικής ζωής.'
    },
    {
      src: 'assets/photos/FB_IMG_1782483421145.jpg',
      fallback: ['photos/FB_IMG_1782483421145.jpg', 'assets/photos/museum-laografiko.jpg'],
      t: 'Γυναικεία φορεσιά',
      c: 'Λεπτομέρειες φορεσιάς, χρωμάτων και στολισμού μέσα από εκθεσιακή προθήκη.'
    },
    {
      src: 'assets/photos/FB_IMG_1782483413196.jpg',
      fallback: ['photos/FB_IMG_1782483413196.jpg', 'assets/photos/museum-laografiko.jpg'],
      t: 'Παραδοσιακή ενδυμασία και οικιακά αντικείμενα',
      c: 'Ενδυμασία, σκεύη και αντικείμενα σπιτιού συγκροτούν μια καθαρή εικόνα της παλιάς ζωής στο Πωγώνι.'
    }
  ];

  const style = document.createElement('style');
  style.textContent = `
    .museum-section { position: relative; overflow: hidden; }
    .museum-feature {
      width: min(var(--container), calc(100% - 28px));
      margin: 0 auto;
      display: grid;
      grid-template-columns: minmax(280px, .86fr) minmax(0, 1.14fr);
      gap: 22px;
      align-items: stretch;
    }
    .museum-copy,
    .museum-showcase {
      border: 1px solid var(--line);
      background: var(--surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
    }
    .museum-copy {
      padding: clamp(24px, 4vw, 38px);
      display: grid;
      align-content: center;
      gap: 18px;
    }
    .museum-copy h3 {
      font-size: clamp(1.8rem, 4vw, 3.25rem);
      line-height: .95;
      letter-spacing: -.05em;
    }
    .museum-copy p { color: var(--muted); font-size: 1.03rem; }
    .museum-highlights { display: grid; gap: 12px; }
    .museum-highlights article {
      padding: 14px 16px;
      border-radius: 18px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.055);
    }
    .museum-kicker,
    .museum-highlights span {
      color: var(--gold);
      font-size: .78rem;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .12em;
    }
    .museum-highlights strong {
      display: block;
      margin-top: 6px;
      color: var(--text);
    }
    .museum-showcase {
      overflow: hidden;
      min-height: 560px;
      display: grid;
      grid-template-rows: minmax(400px, 1fr) auto;
    }
    .museum-main-img {
      width: 100%;
      height: 100%;
      min-height: 400px;
      object-fit: cover;
      display: block;
      background: rgba(255,255,255,.04);
    }
    .museum-showcase-info {
      padding: 20px 22px;
      border-top: 1px solid var(--line);
      background: rgba(255,255,255,.045);
    }
    .museum-showcase-info h3 { font-size: clamp(1.4rem, 3vw, 2.2rem); }
    .museum-showcase-info p { color: var(--muted); margin-top: 6px; }
    .museum-thumbs {
      width: min(var(--container), calc(100% - 28px));
      margin: 22px auto 0;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }
    .museum-thumb {
      border: 1px solid var(--line);
      background: var(--surface);
      border-radius: 18px;
      overflow: hidden;
      cursor: pointer;
      text-align: left;
      color: var(--text);
      transition: transform .2s ease, border-color .2s ease;
    }
    .museum-thumb:hover,
    .museum-thumb.active {
      transform: translateY(-3px);
      border-color: rgba(243,201,121,.65);
    }
    .museum-thumb img {
      width: 100%;
      height: 155px;
      object-fit: cover;
      display: block;
      background: rgba(255,255,255,.04);
    }
    .museum-thumb span {
      display: block;
      padding: 10px 12px;
      font-weight: 900;
    }
    .place-panel .museum-more-btn { margin-top: 18px; width: max-content; }
    @media (max-width: 1050px) { .museum-thumbs { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 900px) {
      .museum-feature { grid-template-columns: 1fr; }
      .museum-showcase { min-height: auto; }
    }
    @media (max-width: 620px) {
      .museum-thumbs { grid-template-columns: 1fr; }
      .museum-thumb img { height: 230px; }
    }
  `;
  document.head.appendChild(style);

  function imageAttrs(img) {
    return `src="${img.src}" data-fallbacks="${img.fallback.join('|')}" alt="${img.t}"`;
  }

  const section = document.createElement('section');
  section.className = 'section museum-section';
  section.id = 'folklore-museum';
  section.innerHTML = `
    <div class="section-title centered reveal visible">
      <p class="eyebrow">Λαογραφικό Μουσείο</p>
      <h2>Λαογραφικό Μουσείο Πωγωνιανής</h2>
      <p>Μια καθαρή ψηφιακή παρουσίαση του χώρου: εξωτερικό, αίθουσες, εργαλεία, φορεσιές και αντικείμενα καθημερινής ζωής.</p>
    </div>

    <div class="museum-feature reveal visible">
      <div class="museum-copy">
        <p class="eyebrow">Μνήμη της Βοστίνας</p>
        <h3>Το χωριό μέσα από τα αντικείμενά του.</h3>
        <p>
          Το μουσείο παρουσιάζει τον υλικό κόσμο της Πωγωνιανής: παλιές φωτογραφίες,
          αντικείμενα σπιτιού, αγροτικά εργαλεία, φορεσιές και τεκμήρια που κρατούν ζωντανή
          την κοινωνική μνήμη του τόπου.
        </p>
        <div class="museum-highlights">
          <article><span>Κτίριο</span><strong>Πέτρινος εξωτερικός χώρος και αυλή που ταιριάζουν στον χαρακτήρα του χωριού.</strong></article>
          <article><span>Καθημερινότητα</span><strong>Εργαλεία, σκεύη, έπιπλα και αντικείμενα εργασίας από την παλιά ζωή του Πωγωνίου.</strong></article>
          <article><span>Φορεσιές</span><strong>Παραδοσιακές ενδυμασίες και προθήκες που αναδεικνύουν την τοπική ταυτότητα.</strong></article>
        </div>
      </div>

      <div class="museum-showcase">
        <img class="museum-main-img" id="museumMainImg" ${imageAttrs(imgs[0])}>
        <div class="museum-showcase-info">
          <span class="museum-kicker">Περιήγηση</span>
          <h3 id="museumMainTitle">${imgs[0].t}</h3>
          <p id="museumMainCaption">${imgs[0].c}</p>
        </div>
      </div>
    </div>

    <div class="museum-thumbs" id="museumThumbs">
      ${imgs.map((img, i) => `
        <button class="museum-thumb ${i === 0 ? 'active' : ''}" type="button" data-index="${i}">
          <img ${imageAttrs(img)} loading="lazy" decoding="async">
          <span>${String(i + 1).padStart(2, '0')} · ${img.t}</span>
        </button>
      `).join('')}
    </div>
  `;

  const see = document.getElementById('see');
  const directions = document.getElementById('directions');
  if (see) see.insertAdjacentElement('afterend', section);
  else if (directions) directions.insertAdjacentElement('beforebegin', section);
  else document.querySelector('main')?.appendChild(section);

  function installFallbacks(root = document) {
    root.querySelectorAll('img[data-fallbacks]').forEach((image) => {
      if (image.dataset.fallbackReady === 'true') return;
      image.dataset.fallbackReady = 'true';
      image.addEventListener('error', () => {
        const fallbacks = (image.dataset.fallbacks || '').split('|').filter(Boolean);
        if (!fallbacks.length) return;
        image.src = fallbacks.shift();
        image.dataset.fallbacks = fallbacks.join('|');
      });
    });
  }

  installFallbacks(section);

  document.querySelectorAll('.museum-thumb').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.index);
      const img = imgs[i];
      document.querySelectorAll('.museum-thumb').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const main = document.getElementById('museumMainImg');
      if (main) {
        main.src = img.src;
        main.dataset.fallbacks = img.fallback.join('|');
        main.alt = img.t;
      }
      document.getElementById('museumMainTitle').textContent = img.t;
      document.getElementById('museumMainCaption').textContent = img.c;
      document.getElementById('museumMainImg')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
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
