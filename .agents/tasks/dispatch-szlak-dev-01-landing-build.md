## ⚡ KROK 0 — ZANIM cokolwiek zrobisz

**0. Wczytaj blok systemowy (skills + SSH + protokół):**
view_file → /home/tobroz/projects/sonic-void/.agents/protocols/dispatch-system-block.md

---

# DISPATCH — Lekki Szlak Landing Page Build + Deploy

| Pole | Wartość |
|------|---------|
| **Do** | `[SZLAK-DEV 01]` |
| **Od** | `[Supervisor 01]` |
| **Workspace** | `lekki-szlak` |
| **Priorytet** | 🔴 HIGH |
| **Model** | Claude Sonnet 4.6 (Thinking) |
| **Cel** | Zbudować premium landing page + deploy na Oracle VPS |

---

## 🎯 Deliverable

Działający statyczny landing page pod `https://lekki-szlak.impresjapr.pl` z pełnym designem premium.

---

## 📋 Kontekst projektu

**Lekki Szlak** — sieć obiektów noclegowych na pograniczu Beskidu Niskiego i Bieszczadów. Turystyka wędrowna „na lekko" — bez ciężkiego plecaka.

**Trzy filary USP:**
1. 🎒 **Zero Balastu** — transport bagażu między obiektami, turysta idzie z lekkim plecakiem
2. 🍽️ **Dobre Karmienie** — śniadanie + lunch-box + ciepła kolacja na mecie
3. 🤫 **Gwarancja Ciszy** — brak off-roadu, głośnych imprez, święty spokój

**Obiekty partnerskie (5 na start):**
- 📍 Schronisko w Łupkowie „Chata na końcu świata" (lupkow.pl)
- 📍 Szczerbanówka na Maniowie
- 📍 K85 w Komańczy
- 📍 Schronisko Smolnik
- 📍 Schronisko w Komańczy

**Slogan:** „Bieszczady & Beskid Niski. Przejdź region na lekko."

**Hasła marketingowe (do wykorzystania):**
- „W Lekkim Szlaku ciężkie są tylko wspomnienia — plecak zostaw nam."
- „Łączymy kropki na mapie Twojej wolności."
- „3+ obiekty, 2 regiony, 0 ciężkich plecaków."

---

## 🏗️ Co zbudować

### Architektura
```
lekki-szlak/
├── index.html          ← Single-page landing z sekcjami (scroll)
├── css/
│   └── style.css       ← Design system
├── js/
│   └── app.js          ← Interakcje, animacje, mapa
├── img/                ← Zdjęcia (hero, obiekty, szlaki)
├── Dockerfile          ← Prosty nginx serve static
└── docker-compose.yml  ← Deploy config
```

### Sekcje strony (scroll-based single page)

1. **🏔️ HERO** — Full-viewport background image (góry Bieszczady), overlay gradient, nagłówek „Bieszczady & Beskid Niski na lekko", subheading z USP, CTA button „Zaplanuj wędrówkę" (scroll do kontaktu)
2. **🎒 USP — 3 Filary** — Trzy kolumny z ikonami (SVG), krótki opis każdego filara, animacja scroll-triggered fade-in
3. **🗺️ MAPA SIECI** — Interaktywna mapa z Leaflet + OpenStreetMap (darmowe), 5 markerów obiektów, linie łączące = szlaki, popup z nazwą i odległością
4. **🏡 OBIEKTY** — Karty z foto, nazwą, krótkim opisem, dystansem od sąsiadów. 5 kart.
5. **🥾 TRASY** — 3 gotowe propozycje tras: „Odcinek Łupkowski", „Pętla Komańczańska", „Szlak Bieszczadzki". Czas przejścia, trudność (łatwy/średni), km.
6. **📸 GALERIA** — Grid zdjęć (placeholder do zastąpienia realnymi z Google Photos albumu)
7. **📱 PASZPORT WĘDROWCA** — Teaser zapowiadający aplikację mobilną + system pieczęci. CTA do newslettera.
8. **📞 KONTAKT** — Formularz zapytania (Formspree.io), dane kontaktowe sieci, linki social media
9. **FOOTER** — Prawa autorskie, linki, social media icons

### Design — Estetyka „Mountain Luxury"

| Aspekt | Wartość |
|--------|---------|
| **Background** | Głęboki granat `#1a1f3a` |
| **Primary** | Leśna zieleń `#2d6a4f` |
| **Accent** | Złoty `#d4a843` |
| **Surface** | Ciepła biel `#faf8f5` |
| **Text** | `#1a1a2e` na jasnym, `#e8e6e1` na ciemnym |
| **Typography** | Google Fonts: **Outfit** (nagłówki) + **Inter** (body) |
| **Styl** | Minimal luxury — glassmorphism karty, parallax hero, smooth scroll |
| **Animacje** | IntersectionObserver fade-in, parallax, pulsujące markery mapy |
| **Mobile-first** | Breakpoints: 480px / 768px / 1024px / 1280px |

### Logo
Zaprojektuj prosty text-based logo: „LEKKI SZLAK" z motywem połączonych węzłów (sieć). SVG inline w nawigacji. Minimalistyczny, premium look.

### SEO

Schema.org JSON-LD:
- `Organization` (Lekki Szlak)
- `TouristTrip` (każda trasa)
- `LodgingBusiness` (każdy obiekt)
- `FAQPage`

Meta tags:
- Title: „Lekki Szlak — Bieszczady & Beskid Niski na lekko | Sieć schronisk"
- Description: „Wędruj bez ciężkiego plecaka. Sieć 5 schronisk na pograniczu Bieszczadów i Beskidu Niskiego z transportem bagażu i gwarantowanym wyżywieniem."
- Keywords: bieszczady bez plecaka, trekking beskid niski, turystyka wędrowna, transport bagażu, slow travel

Open Graph + Twitter Cards dla social sharing.

---

## 🚀 Deploy na Oracle VPS

### Mapa portów VPS (AKTUALNA — nie naruszaj istniejących!)

| Port | Serwis | Status |
|------|--------|--------|
| 80 | crimson-nginx (reverse proxy) | ✅ zajęty |
| 443 | crimson-nginx (HTTPS) | ✅ zajęty |
| 3000 | crimson-frontend | ✅ zajęty |
| 5432 | crimson-postgres | ✅ zajęty |
| 5433 | crawler-db | ✅ zajęty |
| 8001 | crimson-backend | ✅ zajęty |
| 8002 | crawler-web | ✅ zajęty |
| 8081 | prawy-wordpress | ✅ zajęty |
| 8082 | otwock-museum | ✅ zajęty |
| 8083 | pressai-academy | ✅ zajęty |
| **8084** | **lekki-szlak** | ⬜ **WOLNY — użyj tego!** |

### Deployment steps:

1. **Dockerfile** — prosty nginx:alpine serve static files
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 8084
```

2. **docker-compose.yml**:
```yaml
services:
  lekki-szlak:
    build: .
    container_name: lekki-szlak-web
    ports:
      - "8084:80"
    restart: unless-stopped
```

3. **Nginx vhost** — dodaj do crimson-nginx config:
```nginx
# ── Lekki Szlak ──
server {
    listen 80;
    server_name lekki-szlak.impresjapr.pl;

    location / {
        proxy_pass http://172.17.0.1:8084;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

4. **⚠️ UWAGA — Bezpieczeństwo nginx:**
   - DOPISZ nowy server block do **istniejącego** pliku `/etc/nginx/conf.d/default.conf`
   - NIE nadpisuj pliku — DOPISZ na końcu (przed ostatnim blokiem redirect prawy)
   - Po zmianie: `docker exec crimson-nginx nginx -t` → sprawdź syntax
   - Dopiero po OK: `docker exec crimson-nginx nginx -s reload`
   - Jeśli test failuje → COFNIJ zmianę natychmiast

5. **DNS** — subdomena `lekki-szlak.impresjapr.pl` musi wskazywać na 147.224.162.100. Sprawdź:
   ```bash
   ssh -i ~/.ssh/oracle-crimson.key ubuntu@147.224.162.100 "dig lekki-szlak.impresjapr.pl +short"
   ```
   Jeśli brak → raport bloker do Supervisora. DNS konfiguruję ja (Supervisor) lub user.

---

## 🖼️ Zasoby graficzne

W katalogu `/home/tobroz/projects/sonic-void/lekki-szlak/img/` znajdują się wygenerowane placeholder images:
- `hero.png` — panorama gór (hero background)
- `lupkow.png` — schronisko w Łupkowie
- `szczerbanowka.png` — pensjonat Szczerbanówka
- `k85.png` — chata K85 Komańcza

Użyj ich jako placeholderów. W przyszłości zastąpimy realnymi zdjęciami z Google Photos.

**Wygeneruj brakujące:**
- Zdjęcie Schroniska Smolnik (generate_image)
- Zdjęcie Schroniska w Komańczy (generate_image)
- Zdjęcia szlaków/tras (generate_image)

---

## ✅ Definition of Done

1. [ ] Landing page renderuje się poprawnie na mobile / tablet / desktop
2. [ ] Mapa Leaflet działa z 5 markerami i liniami tras
3. [ ] Formularz kontaktowy wysyła (Formspree lub prostsze)
4. [ ] Lighthouse score > 85 mobile
5. [ ] Schema.org JSON-LD zaimplementowane
6. [ ] Docker container uruchomiony na Oracle VPS port 8084
7. [ ] Nginx vhost dodany i działający (lekki-szlak.impresjapr.pl)
8. [ ] Kod w repozytorium `gitomwtyczka/lekki-szlak` (branch: main)
9. [ ] Raport do Supervisora z podsumowaniem

---

## 📨 Raport

Po zakończeniu — raport do [Supervisor 01]:
```
📨 RAPORT DO [Supervisor 01]:
[SZLAK-DEV 01] zakończył build + deploy landing page.
URL: https://lekki-szlak.impresjapr.pl
Wynik: [status]. Blokery: [lista lub brak].
```
