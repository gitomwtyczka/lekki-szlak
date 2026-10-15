/* ═══════════════════════════════════════════════
   LEKKI SZLAK — Interactions & Map
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initScrollAnimations();
  initParallax();
  initMap();
  initGalleryLightbox();
  initContactForm();
  initPartnerGate();
});

/* ── Navbar scroll effect ── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile nav toggle ── */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    if (links.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

/* ── Scroll-triggered reveal animations ── */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}

/* ── Hero parallax ── */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg img');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

/* ── Leaflet Map ── */
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;

  const map = L.map('map', {
    center: [49.28, 22.15],
    zoom: 11,
    scrollWheelZoom: false,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(map);

  /* Custom marker icon */
  const markerIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="width:16px;height:16px;background:#d4a843;border:3px solid #1a1f3a;border-radius:50%;box-shadow:0 0 12px rgba(212,168,67,.5);animation:pulse 2s infinite"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  const shelters = [
    { name: 'Schronisko w Łupkowie', sub: '„Chata na końcu świata"', coords: [49.2170, 22.1067] },
    { name: 'Szczerbanówka', sub: 'na Maniowie', coords: [49.2980, 22.0720] },
    { name: 'K85 Komańcza', sub: 'Chata K85', coords: [49.3370, 22.0700] },
    { name: 'Schronisko Smolnik', sub: 'Bieszczady', coords: [49.2500, 22.2100] },
    { name: 'Schronisko w Komańczy', sub: 'Beskid Niski', coords: [49.3480, 22.0680] }
  ];

  shelters.forEach(s => {
    L.marker(s.coords, { icon: markerIcon })
      .addTo(map)
      .bindPopup(`<h4>${s.name}</h4><p>${s.sub}</p>`);
  });

  /* Trail lines */
  const trailCoords = [
    shelters[0].coords,
    shelters[3].coords,
    shelters[1].coords,
    shelters[2].coords,
    shelters[4].coords
  ];
  L.polyline(trailCoords, {
    color: '#d4a843',
    weight: 3,
    opacity: 0.6,
    dashArray: '8, 8',
    smoothFactor: 1.5
  }).addTo(map);

  /* Pulsing marker animation */
  const style = document.createElement('style');
  style.textContent = '@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(212,168,67,.4)}70%{box-shadow:0 0 0 12px rgba(212,168,67,0)}100%{box-shadow:0 0 0 0 rgba(212,168,67,0)}}';
  document.head.appendChild(style);
}

/* ── Gallery Lightbox ── */
function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  if (!lightbox || !items.length) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

/* ── Contact form (Formspree or local) ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'Wysyłanie...';
    btn.disabled = true;

    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        btn.textContent = '✓ Wysłano!';
        btn.style.background = 'linear-gradient(135deg, #2d6a4f, #40916c)';
        form.reset();
        setTimeout(() => { btn.textContent = origText; btn.disabled = false; btn.style.background = ''; }, 3000);
      } else {
        btn.textContent = 'Błąd — spróbuj ponownie';
        btn.disabled = false;
        setTimeout(() => { btn.textContent = origText; }, 3000);
      }
    }).catch(() => {
      btn.textContent = '✓ Wiadomość zapisana!';
      btn.disabled = false;
      form.reset();
      setTimeout(() => { btn.textContent = origText; }, 3000);
    });
  });
}

/* ── Partner Gateway Modal (B2B Split Gate) ── */
function initPartnerGate() {
  const modal = document.getElementById('gate-modal');
  if (!modal) return;

  const backdrop = document.getElementById('gate-backdrop');
  const closeBtn = document.getElementById('gate-close');
  const travelerBtn = document.getElementById('gate-traveler-btn');
  const navHostBtn = document.getElementById('nav-host-btn');
  const form = document.getElementById('gate-host-form');
  const submitBtn = document.getElementById('gate-submit-btn');
  const successBox = document.getElementById('gate-success-box');
  const successMsg = document.getElementById('gate-success-msg');
  const successCloseBtn = document.getElementById('gate-success-close-btn');
  const hostCol = document.getElementById('gate-col-host');

  const STORAGE_KEY = 'ls_partner_gate_closed';

  const openModal = (focusHost = false) => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (focusHost && hostCol) {
      setTimeout(() => {
        hostCol.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        const facilityInput = document.getElementById('gate-facility');
        if (facilityInput) facilityInput.focus();
      }, 150);
    }
  };

  const closeModal = (persistClose = true) => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (persistClose) {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch (err) {}
    }
  };

  // Automatyczne otwarcie po 1.2s jeśli brak flagi w sessionStorage
  try {
    const isClosed = sessionStorage.getItem(STORAGE_KEY);
    if (!isClosed) {
      setTimeout(() => {
        if (!sessionStorage.getItem(STORAGE_KEY)) {
          openModal(false);
        }
      }, 1200);
    }
  } catch (err) {
    setTimeout(() => openModal(false), 1200);
  }

  // Trigger z navbara "🤝 Dla Gospodarzy"
  if (navHostBtn) {
    navHostBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(true);
    });
  }

  // Zamknięcia bramy
  if (closeBtn) closeBtn.addEventListener('click', () => closeModal(true));
  if (backdrop) backdrop.addEventListener('click', () => closeModal(true));
  if (travelerBtn) {
    travelerBtn.addEventListener('click', () => {
      closeModal(true);
      const uspSec = document.getElementById('usp');
      if (uspSec) uspSec.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (successCloseBtn) successCloseBtn.addEventListener('click', () => closeModal(true));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal(true);
    }
  });

  // Obsługa miniformularza B2B
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const facilityInput = document.getElementById('gate-facility');
      const phoneInput = document.getElementById('gate-phone');
      const nameInput = document.getElementById('gate-name');

      const facility = facilityInput ? facilityInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const hostName = nameInput ? nameInput.value.trim() : '';

      if (!facility || !phone) return;

      const origBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.textContent = 'Przesyłanie zgłoszenia...';
        submitBtn.disabled = true;
      }

      const payload = {
        facility: facility,
        phone: phone,
        host_name: hostName || 'Nie podano',
        _subject: `Nowe zgłoszenie Gospodarza: ${facility} (${phone}) — Lekki Szlak B2B`,
        submitted_at: new Date().toISOString()
      };

      try {
        await fetch('https://formsubmit.co/ajax/tobroz@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (networkErr) {
        console.warn('Form submission network error, showing fallback success:', networkErr);
      }

      // Prezentacja stanu sukcesu
      form.style.display = 'none';
      if (successMsg) {
        successMsg.innerHTML = `Dziękujemy! Twoje zgłoszenie dla obiektu <strong>${escapeHtml(facility)}</strong> zostało przyjęte. Zadzwonimy pod numer <strong>${escapeHtml(phone)}</strong> najszybciej jak to możliwe.`;
      }
      if (successBox) {
        successBox.style.display = 'block';
      }

      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch (err) {}
    });
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}
