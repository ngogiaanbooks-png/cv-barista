/* ════════════════════════════════════════════════════════════════
   INTERACTIVE BARISTA CV — MAIN.JS
   All Interactivity: Scroll Reveal, Lightbox, Schedule, Copy, etc.
   ════════════════════════════════════════════════════════════════ */

'use strict';

// ─── Utility ───────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ─── ======================================================
//  1. CUSTOM CURSOR  (desktop only)
// ─── ======================================================
const cursorDot = $('#cursorDot');
const cursorRing = $('#cursorRing');
let mouseX = -100, mouseY = -100;
let ringX = -100, ringY = -100;

function initCursor() {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth follow for ring
  function followRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(followRing);
  }
  followRing();

  // Hover effect on interactive elements
  $$('a, button, .contact__card, .gallery__item, .schedule__table td:not(.schedule__shift), .btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
  });
}

// ─── ======================================================
//  2. SCROLL REVEAL  (Intersection Observer)
// ─── ======================================================
function initScrollReveal() {
  const revealEls = $$('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Don't unobserve if we want the animation to replay — but we'll unobserve for performance
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ─── ======================================================
//  3. NAVIGATION — Sticky + Scroll Glass
// ─── ======================================================
function initNav() {
  const navbar = $('#navbar');
  let ticking = false;

  document.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ─── ======================================================
//  4. MOBILE HAMBURGER / DRAWER
// ─── ======================================================
function initDrawer() {
  const hamburger = $('#hamburger');
  const drawer = $('#drawer');
  const overlay = $('#drawerOverlay');
  const closeBtn = $('#drawerClose');
  const drawerLinks = $$('.drawer__link');

  function openDrawer() {
    hamburger.classList.add('active');
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    hamburger.classList.remove('active');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    isOpen ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });
}

// ─── Shared toast timer ───
let _toastTimer;

function showToast(message) {
  const toast = $('#toast');
  const toastMsg = $('#toastMessage');
  toastMsg.textContent = message;
  toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ─── ======================================================
//  5. CONTACT — Copy to Clipboard + Toast
// ─── ======================================================
function initContactCopy() {
  const cards = $$('.contact__card');

  cards.forEach(card => {
    card.addEventListener('click', async () => {
      const text = card.dataset.copy;
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        showToast('Copied!');
      } catch {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied!');
      }

      // Visual feedback
      card.style.transform = 'scale(0.97)';
      setTimeout(() => card.style.transform = '', 200);
    });
  });
}

// ─── ======================================================
//  6. EXPERIENCE — Timeline Line Animation
// ─── ======================================================
function initTimeline() {
  const line = $('#timelineLine');
  if (!line) return;

  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        line.classList.add('drawn');
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  lineObserver.observe(line);

  // Reveal timeline items individually
  const items = $$('.timeline__item');
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => itemObserver.observe(item));
}

// ─── ======================================================
//  7. GALLERY — Masonry + Lightbox
// ─── ======================================================

/* --- Gallery Data (Real Latte Art Photos) --- */
/* To add your own images, drop .jpg/.webp files into assets/latte/
   and update the paths below. Recommended: WebP format, max 300KB each. */
const galleryData = [
  { name: 'Heart',    image: 'assets/latte/latte-02-heart.jpg' },
  { name: 'Latte Art', image: 'assets/latte/528559435_1442250380259361_4695418227474747489_n.jpg' },
];

function buildGallery() {
  const grid = $('#galleryGrid');
  if (!grid) return;

  galleryData.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'gallery__item';
    div.dataset.index = index;

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name} - Latte Art" />
      <div class="gallery__overlay">
        <span class="gallery__label">${item.name}</span>
      </div>
    `;

    div.querySelector('img').onerror = function() {
      this.style.display = 'none';
      this.parentElement.classList.add('gallery__item--fallback');
      this.parentElement.textContent = item.name;
    };

    div.addEventListener('click', () => openLightbox(index));
    grid.appendChild(div);
  });
}

/* --- Lightbox --- */
const lightbox = $('#lightbox');
const lightboxImg = $('#lightboxImage');
const lightboxCaption = $('#lightboxCaption');
const lightboxPrev = $('#lightboxPrev');
const lightboxNext = $('#lightboxNext');
const lightboxClose = $('#lightboxClose');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const item = galleryData[index];
  lightboxImg.src = item.image;
  lightboxImg.alt = `${item.name} - Latte Art`;
  lightboxCaption.textContent = `${item.name} · Latte Art`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentIndex = (currentIndex + direction + galleryData.length) % galleryData.length;
  const item = galleryData[currentIndex];
  lightboxImg.src = item.image;
  lightboxImg.alt = `${item.name} - Latte Art`;
  lightboxCaption.textContent = `${item.name} · Latte Art`;
}

function initLightbox() {
  if (!lightbox) return;

  // Close
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navigation
  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Touch swipe for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) navigateLightbox(1);
      else navigateLightbox(-1);
    }
  }, { passive: true });
}

// ─── ======================================================
//  8. SCHEDULE — Availability Toggle + localStorage
// ─── ======================================================
// Fixed schedule — read-only, not toggleable
const DEFAULT_SCHEDULE = {
  // Mon-Wed: only night
  'Sáng-T2': false, 'Sáng-T3': false, 'Sáng-T4': false,
  'Chiều-T2': false, 'Chiều-T3': false, 'Chiều-T4': false,
  'Tối-T2': true, 'Tối-T3': true, 'Tối-T4': true,
  // Thu: afternoon + night
  'Sáng-T5': false,
  'Chiều-T5': true,
  'Tối-T5': true,
  // Fri: morning + night
  'Sáng-T6': true,
  'Chiều-T6': false,
  'Tối-T6': true,
  // Sat: full day
  'Sáng-T7': true,
  'Chiều-T7': true,
  'Tối-T7': true,
  // Sun: only night
  'Sáng-CN': false,
  'Chiều-CN': false,
  'Tối-CN': true,
};

function initSchedule() {
  const table = $('#scheduleTable');
  if (!table) return;

  const cells = $$('td:not(.schedule__shift)', table);
  const copyBtn = $('#scheduleCopy');

  // Apply the fixed default schedule to cells
  function applyState() {
    cells.forEach(cell => {
      const shift = cell.dataset.shift;
      const day = cell.dataset.day;
      const key = `${shift}-${day}`;
      const isAvailable = DEFAULT_SCHEDULE[key];

      cell.classList.remove('available', 'unavailable');
      if (isAvailable) {
        cell.classList.add('available');
      } else {
        cell.classList.add('unavailable');
      }
    });
  }

  // Copy schedule as text
  function copySchedule() {
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const shifts = ['Sáng', 'Chiều', 'Tối'];
    let text = 'Work Schedule:\n\n';
    text += '         ' + days.join('   ') + '\n';
    shifts.forEach(shift => {
      text += shift.padEnd(8);
      days.forEach(day => {
        const key = `${shift}-${day}`;
        text += DEFAULT_SCHEDULE[key] ? '  ✓  ' : '  -  ';
      });
      text += '\n';
    });

    navigator.clipboard.writeText(text).then(() => {
      showToast('Schedule copied!');
    }).catch(() => {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Schedule copied!');
    });
  }

  copyBtn.addEventListener('click', copySchedule);

  // Initial render
  applyState();
}

// ─── ======================================================
//  9. THEME TOGGLE (Dark Mode)
// ─── ======================================================
const THEME_STORAGE_KEY = 'barista-cv-theme';

function initTheme() {
  const html = document.documentElement;
  const toggles = [
    $('#themeToggle'),
    $('#drawerThemeToggle'),
  ].filter(Boolean);

  // Determine initial theme
  let theme;
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') {
    theme = saved;
  } else {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply theme
  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    const icon = t === 'dark' ? '☀️' : '🌙';
    toggles.forEach(btn => {
      btn.querySelector('.theme-toggle__icon').textContent = icon;
    });
    try {
      localStorage.setItem(THEME_STORAGE_KEY, t);
    } catch { /* ignore */ }
  }

  // Toggle
  function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Event listeners
  toggles.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Listen for system preference changes (only if user hasn't saved a preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Apply initial theme
  applyTheme(theme);
}

// ─── ======================================================
//  10. SMOOTH SCROLL FOR NAV LINKS
// ─── ======================================================
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ─── ======================================================
//  11. INIT ALL
// ─── ======================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCursor();
  initScrollReveal();
  initNav();
  initDrawer();
  initContactCopy();
  initTimeline();
  buildGallery();
  initLightbox();
  initSchedule();
  initSmoothScroll();
});
