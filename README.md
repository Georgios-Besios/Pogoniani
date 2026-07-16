# Πωγωνιανή / Βοστίνα — pogoniani.gr

Δημόσιος ψηφιακός οδηγός για την Πωγωνιανή Ιωαννίνων, την παλιά Βοστίνα.

## Ζωντανή ιστοσελίδα

- https://pogoniani.gr/
- Φιλοξενία: GitHub Pages
- Custom domain και HTTPS: ενεργά

## Περιεχόμενο και λειτουργίες

- Responsive αρχική παρουσίαση με εναλλαγή εποχών
- Ιστορική χρονογραμμή
- Διαδραστικός χάρτης εμπειρίας
- Ενότητα «Τι να δεις»
- Πλήρης φωτογραφική παρουσίαση Λαογραφικού Μουσείου
- Διαδρομή Ιωάννινα – Πωγωνιανή με Google Maps
- Live καιρός και τετραήμερη πρόγνωση από Open-Meteo
- Gallery με φίλτρα και lightbox
- Προσωπικός τοπικός τοίχος μνήμης με `localStorage`
- Dark/light theme
- Βασική προσβασιμότητα και υποστήριξη reduced motion
- Custom σελίδα 404

## SEO

Η σελίδα περιλαμβάνει στατικό, crawlable SEO στο `<head>`:

- canonical URL
- meta description και robots directives
- Open Graph / Twitter metadata
- Schema.org `WebSite` και `Place`
- εναλλακτικές ονομασίες: Πωγωνιανή, Βοστίνα, Pogoniani, Vostina, Bostina
- `robots.txt`
- `sitemap.xml`

Το domain έχει επαληθευτεί στο Google Search Console και το sitemap έχει υποβληθεί.

## Δομή

```text
index.html                 Στατικό κύριο περιεχόμενο και SEO
404.html                   Σελίδα μη εύρεσης
css/styles.css             Βασικό design system και κύριες ενότητες
css/visitor.css            «Τι να δεις» και διαδρομή
css/hero-season.css        Εναλλαγή hero και μικρές ειδικές προσαρμογές
css/features.css           Μουσείο και live καιρός
js/app.js                  Κύριες διαδραστικές λειτουργίες
js/hero-season.js          Εναλλαγή εποχιακής εικόνας hero
js/features.js             Museum gallery και live weather
assets/photos/             Φωτογραφικό υλικό
assets/docs/               Ιστορικό αρχείο PDF
```

## Φωτογραφίες μουσείου

Η ενότητα του Λαογραφικού Μουσείου χρησιμοποιεί δύο εξωτερικές εικόνες και οκτώ φωτογραφίες εσωτερικών εκθεμάτων από τον φάκελο `assets/photos/`.

## Απόρρητο

Ο τοίχος μνήμης αποθηκεύει το κείμενο μόνο στον browser του επισκέπτη. Δεν υπάρχει backend και δεν αποστέλλονται προσωπικά δεδομένα σε βάση δεδομένων.

Δεν έχει εγκατασταθεί σύστημα analytics χωρίς προηγούμενη επιλογή υπηρεσίας, Measurement ID και κατάλληλη ενημέρωση απορρήτου.
