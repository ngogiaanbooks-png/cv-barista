# ☕ Interactive Barista CV — Project Context & Conversation History

> **Generated**: 2025-06-08
> **Project**: `my-cv/` — Personal interactive CV website for Ngô Gia (Barista & F&B Service)
> **Stack**: Vanilla HTML5 + CSS3 + Vanilla JavaScript
> **Theme**: "Artisan Espresso" — Warm, creative, interactive

---

## 📁 Project Structure

```
my-cv/
├── index.html       ← Main HTML (all sections, structure)
├── style.css        ← All CSS (theme, animations, responsive)
├── main.js          ← All JavaScript (interactivity, scroll effects)
├── README.md        ← Deployment instructions (GitHub Pages)
└── CONTEXT.md       ← THIS FILE — Handoff context for next agent
```

---

## 🎨 Design System

### Color Palette
| Variable      | Value     | Usage                          |
|---------------|-----------|--------------------------------|
| --espresso    | `#2C1A0E` | Dark text, primary background   |
| --crema       | `#F5EDD8` | Light background, hero gradient |
| --gold        | `#C8922A` | Accent, interactive elements    |
| --sage        | `#6B8F6E` | Secondary accent (latte art)    |
| --dust        | `#C4856A` | Highlights                      |
| --surface     | `#FDF8F0` | Page background                 |
| --text        | `#1A1008` | Body text                       |
| --muted       | `#7A6048` | Secondary text                  |

### Typography
- **Display**: 'Playfair Display', serif (headings, name)
- **Body**: 'DM Sans', sans-serif
- **Mono**: 'DM Mono', monospace (contact info, badges)

---

## 📄 Section Structure (6 sections total)

### SECTION 1 — HERO (id: `#hero`)
- Name: "Ngô Gia" with animated letter reveal (CSS `@keyframes letterAppear`)
- Subtitle: "Barista · F&B Service" (DM Mono, uppercase)
- Location: "Đà Nẵng, Việt Nam" (with SVG pin icon)
- Background: Gradient mesh + grain texture overlay (CSS noise via SVG filter)
- Steam particles (8 CSS-animated dots, `steamRise` keyframes)
- Scroll indicator (mouse wheel icon, fades in)
- Nav "Giới thiệu" link points to `#hero`

### SECTION 2 — CONTACT (id: `#contact`)
- 3 cards in a grid: Phone, Email, Address
- Click SĐT / Email → copies to clipboard + toast notification "Đã sao chép!"
- Visual feedback on click (scale animation)
- Card hover: lift + top gradient bar slide-in

### SECTION 3 — EXPERIENCE (id: `#experience`)
- Timeline layout with vertical drawn line (CSS animation on scroll)
- Badge: "3 tháng kinh nghiệm"
- Workplace: "The Taste Of Sea"
- Position: "Barista"
- Period: "08/2025 – 11/2025"
- 4 bullet points:
  1. Pha chế các loại đồ uống espresso-based theo tiêu chuẩn
  2. Phục vụ khách hàng, xử lý order nhanh chóng
  3. Vệ sinh và bảo dưỡng máy pha cà phê
  4. Giữ vững tiêu chuẩn vệ sinh an toàn thực phẩm
- Decorative SVG coffee cup
- Future placeholder card (dashed border, "Thêm trải nghiệm mới")

### SECTION 4 — LATTE ART GALLERY (id: `#gallery`)
- 6 SVG placeholder art pieces (Rosetta, Heart, Tulip, Swan, Leaf, Etching)
- Responsive grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- Hover: scale(1.03) + overlay fade with technique name
- Custom lightbox with:
  - Backdrop blur
  - Keyboard navigation (← → ESC)
  - Touch swipe for mobile
  - Blob URL loading for SVGs

### SECTION 5 — AVAILABILITY SCHEDULE (id: `#schedule`)
- 7 columns (T2–CN) × 3 rows (Sáng/Chiều/Tối)
- Click to toggle available (gold + ✓) / unavailable (muted)
- Default: Sáng T2–T6 on, rest off
- localStorage persistence (key: `barista-cv-schedule`)
- Reset button ("Đặt lại")
- Copy button ("Sao chép lịch") → plaintext to clipboard

### SECTION 6 — FOOTER
- "Ngô Gia © 2025"
- "Made with ☕" (animated pulse on ☕)

---

## ✨ Interactive Features

| Feature | Implementation |
|---------|---------------|
| Custom cursor | Dot + ring, smooth follow, hover effect on clickable elements |
| Scroll reveal | Intersection Observer (threshold 0.15), fade-up animation |
| Sticky nav | Frosted glass on scroll (backdrop-filter: blur) |
| Mobile drawer | Hamburger → slide-in drawer, overlay backdrop |
| Copy to clipboard | navigator.clipboard with fallback, toast notification |
| Timeline draw | Intersection Observer triggers line scaleY animation |
| Lightbox | Custom-built (no libraries), keyboard + swipe navigation |
| Schedule toggle | localStorage persistence, reset, copy as text |
| Smooth scroll | All anchor links scroll smoothly (JS, not CSS) |

---

## 🔧 Recent Changes Made

### What was done (aligning the site to spec):
1. **Hero location**: Changed from "Hội An, Việt Nam" → "Đà Nẵng, Việt Nam"
2. **Contact address**: Updated to "Đà Nẵng, Việt Nam" (was a specific Hội An address)
3. **About section**: REMOVED (spec has no About section — Hero serves as introduction)
4. **Nav links**: "Giới thiệu" now points to `#hero` instead of removed `#about`
5. **Experience badge**: Changed from "5 tháng kinh nghiệm pha chế & phục vụ" → "3 tháng kinh nghiệm"
6. **Experience role**: Changed from "Pha chế và phục vụ" → "Barista"
7. **Experience period**: Changed from "06/2025 – 11/2025" → "08/2025 – 11/2025"
8. **Experience bullets**: Added 4th bullet "Vệ sinh và bảo dưỡng máy pha cà phê"
9. **Section numbering**: Updated comments (1–6) after removing About section
10. **CSS cleanup**: Removed unused `.about` section styles

---

## 🚀 How to Deploy (GitHub Pages)

```bash
git init
git add .
git commit -m "feat: initial CV website"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

Then enable GitHub Pages in repo Settings → Pages → Deploy from branch `main` / root.

---

## 📝 To-Do / Next Steps

- [x] Align code with CONTEXT.md spec (hero location, About removal, experience details, nav links, section numbering)
- [ ] Replace SVG placeholder gallery images with real latte art photos (in `assets/latte/`)
- [ ] Fill in actual full address for Đà Nẵng in contact section
- [ ] Update README with the latest spec
- [ ] Add dark mode toggle (CSS `prefers-color-scheme`)
- [ ] Add contact form via Formspree
- [ ] Add VI/EN language toggle
- [ ] Consider PWA support (manifest.json + Service Worker)

---

## 🤖 Agent Instructions

When you take over this project:

1. **Read the files first** — `index.html`, `style.css`, `main.js`, `README.md`
2. The site is fully functional as-is — it opens directly in a browser (no build step)
3. **Editorial changes**: Edit `index.html` for content, `style.css` for styling, `main.js` for behavior
4. **Gallery images**: To add real photos, update the `galleryData` array in `main.js` to use real image URLs instead of SVG shapes
5. **Contact info**: Update phone, email, and address in `index.html`'s contact section
6. **Experience**: Edit the timeline section in `index.html` to add/remove jobs
7. The schedule uses `localStorage` — clear it via DevTools Application tab if needed
8. The site is designed mobile-first with breakpoints at 768px and 1024px
9. Reduced motion is respected via `prefers-reduced-motion: reduce`
10. No build tools, no package manager, no npm — pure vanilla web stack
