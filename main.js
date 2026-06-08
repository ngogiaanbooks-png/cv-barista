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
//  I18N — Translations & Language Toggle
// ─── ======================================================
const LANG_STORAGE_KEY = 'barista-cv-lang';
let currentLang = 'vi';

const translations = {
  vi: {
    'page.title': 'CV Barista · F&B Service',
    'nav.logo.aria': 'Trang chủ',
    'nav.intro': 'Giới thiệu',
    'nav.experience': 'Kinh nghiệm',
    'nav.gallery': 'Gallery',
    'nav.schedule': 'Lịch làm',
    'nav.contact': 'Liên hệ',
    'hero.subtitle': 'Barista · F&B Service',
    'hero.location': 'Đà Nẵng, Việt Nam',
    'hero.scroll': 'Cuộn xuống',
    'hero.intro.p1': 'Tôi sinh năm 2007 và đã làm việc trong ngành F&B được 5 tháng. Hiện tại tôi đang tìm kiếm cơ hội mới để tích lũy thêm kinh nghiệm, không chỉ với vai trò barista mà còn tìm hiểu về cách quản lý và vận hành một doanh nghiệp.',
    'hero.intro.p2': 'Đồng thời, tôi đang học ngành Thiết kế Vi mạch tại Đại học FPT. Tôi có kỹ năng cơ bản về công nghệ và tiếng Anh, và mặc dù chưa có chứng chỉ ngôn ngữ, tôi có thể hiểu một chút tiếng Trung và tiếng Nhật.',
    'hero.intro.p3': 'Tôi luôn sẵn sàng học hỏi, thích nghi nhanh và không ngừng cải thiện kỹ năng của mình thông qua những thử thách và trải nghiệm mới.',
    'contact.title': 'Liên hệ',
    'contact.phone': 'Điện thoại',
    'contact.email': 'Email',
    'contact.address': 'Địa chỉ',
    'contact.hint': 'Nhấn để sao chép',
    'experience.title': 'Kinh nghiệm làm việc',
    'experience.badge': '3 tháng kinh nghiệm',
    'experience.bullet1': 'Pha chế các loại đồ uống espresso-based theo tiêu chuẩn',
    'experience.bullet2': 'Phục vụ khách hàng, xử lý order nhanh chóng',
    'experience.bullet3': 'Vệ sinh và bảo dưỡng máy pha cà phê',
    'experience.bullet4': 'Giữ vững tiêu chuẩn vệ sinh an toàn thực phẩm',
    'experience.future.title': 'Thêm trải nghiệm mới',
    'experience.future.period': 'Trong tương lai',
    'experience.future.text': 'Cơ hội luôn rộng mở ✨',
    'gallery.title': 'Latte Art Gallery',
    'gallery.subtitle': 'Những tác phẩm nghệ thuật trên ly cà phê',
    'lightbox.close': 'Đóng',
    'lightbox.prev': 'Ảnh trước',
    'lightbox.next': 'Ảnh tiếp theo',
    'schedule.title': 'Lịch làm việc',
    'schedule.subtitle': 'Lịch cố định — không thể thay đổi',
    'schedule.morning': 'Sáng(7h-12h)',
    'schedule.afternoon': 'Chiều(12h-17h)',
    'schedule.evening': 'Tối(17h-22h)',
    
    'schedule.copy': 'Sao chép lịch',
    'footer.text': 'Ngô Gia © 2025',
    'footer.made': 'Made with ',
    'drawer.theme': 'Chế độ tối',
    'drawer.lang': 'Ngôn ngữ',
    'toast.copied': 'Đã sao chép!',
    'toast.schedule_copied': 'Đã sao chép lịch!',
    'schedule.header': 'Lịch làm việc',
  },
  en: {
    'page.title': 'CV Barista · F&B Service',
    'nav.logo.aria': 'Home',
    'nav.intro': 'Introduction',
    'nav.experience': 'Experience',
    'nav.gallery': 'Gallery',
    'nav.schedule': 'Schedule',
    'nav.contact': 'Contact',
    'hero.subtitle': 'Barista · F&B Service',
    'hero.location': 'Đà Nẵng, Vietnam',
    'hero.scroll': 'Scroll down',
    'hero.intro.p1': 'I was born in 2007 and have been working in the F&B industry for the past five months. I am currently seeking new opportunities to gain more experience, not only as a barista but also in understanding how to manage and operate a business.',
    'hero.intro.p2': 'At the same time, I am studying IC Design at FPT University. I have basic skills in technology and English, and although I do not hold any language certifications, I can understand a little Chinese and Japanese.',
    'hero.intro.p3': 'I am eager to learn, adapt quickly, and continuously improve my skills through new challenges and experiences.',
    'contact.title': 'Contact',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.hint': 'Click to copy',
    'experience.title': 'Work Experience',
    'experience.badge': '3 months experience',
    'experience.bullet1': 'Prepared espresso-based beverages to standard recipes',
    'experience.bullet2': 'Served customers and processed orders efficiently',
    'experience.bullet3': 'Cleaned and maintained coffee brewing equipment',
    'experience.bullet4': 'Maintained food safety and hygiene standards',
    'experience.future.title': 'Add new experience',
    'experience.future.period': 'Coming soon',
    'experience.future.text': 'Opportunities are always open ✨',
    'gallery.title': 'Latte Art Gallery',
    'gallery.subtitle': 'Coffee art masterpieces',
    'lightbox.close': 'Close',
    'lightbox.prev': 'Previous image',
    'lightbox.next': 'Next image',
    'schedule.title': 'Availability Schedule',
    'schedule.subtitle': 'Fixed schedule — read-only',
    'schedule.morning': 'Morning(7am-12pm)',
    'schedule.afternoon': 'Afternoon(12pm-5pm)',
    'schedule.evening': 'Evening(5pm-10pm)',
    
    'schedule.copy': 'Copy schedule',
    'footer.text': 'Ngô Gia © 2025',
    'footer.made': 'Made with ',
    'drawer.theme': 'Dark mode',
    'drawer.lang': 'Language',
    'toast.copied': 'Copied!',
    'toast.schedule_copied': 'Schedule copied!',
    'schedule.header': 'Work Schedule',
  },
};

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

function initLanguage() {
  const html = document.documentElement;
  const toggles = [
    $('#langToggle'),
    $('#drawerLangToggle'),
  ].filter(Boolean);

  // Determine initial language
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  currentLang = (saved === 'vi' || saved === 'en') ? saved : 'vi';

  function applyLanguage(lang) {
    currentLang = lang;
    html.setAttribute('lang', lang);

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      const hasChildElements = [...el.children].length > 0;

      // Always update aria-label if present
      if (el.hasAttribute('aria-label')) {
        el.setAttribute('aria-label', text);
      }

      // For <title> element
      if (el.tagName === 'TITLE') {
        el.textContent = text;
      }
      // For leaf elements (no child elements) — replace entire text
      else if (!hasChildElements) {
        el.textContent = text;
      }
      // For elements with child elements, update only text nodes (not child elements)
      else {
        el.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            node.textContent = text;
          }
        });
      }
    });

    // Update toggle buttons
    const label = lang === 'vi' ? 'EN' : 'VI';
    toggles.forEach(btn => {
      btn.textContent = label;
      btn.setAttribute('title', label === 'EN' ? 'English' : 'Tiếng Việt');
    });

    // Update lightbox aria-labels (special case — no data-i18n)
    const lightboxClose = $('#lightboxClose');
    const lightboxPrev = $('#lightboxPrev');
    const lightboxNext = $('#lightboxNext');
    if (lightboxClose) lightboxClose.setAttribute('aria-label', t('lightbox.close'));
    if (lightboxPrev) lightboxPrev.setAttribute('aria-label', t('lightbox.prev'));
    if (lightboxNext) lightboxNext.setAttribute('aria-label', t('lightbox.next'));

    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch { /* ignore */ }
  }

  function toggleLanguage() {
    applyLanguage(currentLang === 'vi' ? 'en' : 'vi');
  }

  toggles.forEach(btn => {
    btn.addEventListener('click', toggleLanguage);
  });

  // Apply initial language
  applyLanguage(currentLang);
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
        showToast(t('toast.copied'));
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
        showToast(t('toast.copied'));
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
    let text = t('schedule.header') + ':\n\n';
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
      showToast(t('toast.schedule_copied'));
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
      showToast(t('toast.schedule_copied'));
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
  initLanguage();
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
