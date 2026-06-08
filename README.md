# ☕ Interactive Barista CV — Ngô Gia

Trang web CV cá nhân dành cho **Ngô Gia** — Barista & F&B Service tại **Đà Nẵng, Việt Nam**.

Được xây dựng với **Vanilla HTML + CSS + JavaScript**, thiết kế theo phong cách **Artisan Espresso** ấm áp, sáng tạo và đầy tương tác. Không cần build tool, không package manager — mở trực tiếp trong trình duyệt.

---

## 🚀 Deployment (GitHub Pages)

### Bước 1: Tạo GitHub repository

```bash
git init
git add .
git commit -m "feat: initial CV website"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

### Bước 2: Bật GitHub Pages

1. Vào repo trên GitHub → **Settings**
2. Sidebar → **Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` | Folder: `/ (root)`
5. Click **Save**
6. Sau 1–2 phút: truy cập `https://<username>.github.io/<repo-name>`

### Bước 3: Cập nhật nội dung

```bash
git add .
git commit -m "update: mô tả thay đổi"
git push
```

GitHub Pages tự động rebuild sau ~1 phút.

---

## 📂 Cấu trúc project

```
my-cv/
├── index.html            ← Main HTML (tất cả nội dung + cấu trúc)
├── style.css             ← CSS (theme, animations, responsive)
├── main.js               ← JavaScript (interactivity, scroll effects)
├── assets/
│   └── latte/            ← Latte Art Gallery images (6 ảnh .jpg)
├── CONTEXT.md            ← Handoff context cho AI agents
└── README.md             ← Hướng dẫn deploy + tùy chỉnh
```

---

## 🎨 Design System

### Color Palette

| Variable    | Value     | Usage                           |
|-------------|-----------|---------------------------------|
| `--espresso`| `#2C1A0E` | Dark text, primary background   |
| `--crema`   | `#F5EDD8` | Light background, hero gradient |
| `--gold`    | `#C8922A` | Accent, interactive elements    |
| `--sage`    | `#6B8F6E` | Secondary accent (latte art)    |
| `--dust`    | `#C4856A` | Highlights                      |
| `--surface` | `#FDF8F0` | Page background                 |
| `--text`    | `#1A1008` | Body text                       |
| `--muted`   | `#7A6048` | Secondary text                  |

### Typography

- **Display**: `'Playfair Display', serif` — headings, name
- **Body**: `'DM Sans', sans-serif` — paragraphs, navigation
- **Mono**: `'DM Mono', monospace` — contact info, badges, labels

---

## 📄 Sections (6 sections)

### 1. HERO (`#hero`)
- Tên "Ngô Gia" với hiệu ứng chữ xuất hiện từng ký tự (letter reveal animation)
- Subtitle: "Barista · F&B Service"
- Location: Đà Nẵng, Việt Nam (kèm SVG pin icon)
- **Personal introduction card**: Giới thiệu bản thân — sinh năm 2007, làm việc trong ngành F&B, đang học IC Design tại FPT University, biết tiếng Anh/Trung/Nhật cơ bản
- Gradient mesh background + grain texture overlay
- Steam particles (8 chấm CSS animation bay lên)
- Scroll indicator (icon chuột + chữ "Cuộn xuống")

### 2. CONTACT (`#contact`)
- 3 thẻ dạng lưới: SĐT, Email, Địa chỉ
- Click → copy to clipboard + toast notification "Đã sao chép!"
- Visual feedback scale animation khi click
- Hover: card lift + gradient bar slide-in phía trên

### 3. EXPERIENCE (`#experience`)
- Timeline layout với đường kẻ dọc (CSS animation khi scroll)
- Badge: "3 tháng kinh nghiệm"
- Workplace: **The Taste Of Sea** — Barista (08/2025 – 11/2025)
- 4 nhiệm vụ chính:
  1. Pha chế các loại đồ uống espresso-based theo tiêu chuẩn
  2. Phục vụ khách hàng, xử lý order nhanh chóng
  3. Vệ sinh và bảo dưỡng máy pha cà phê
  4. Giữ vững tiêu chuẩn vệ sinh an toàn thực phẩm
- Decorative SVG coffee cup
- Future placeholder card (dashed border, "Thêm trải nghiệm mới")

### 4. LATTE ART GALLERY (`#gallery`)
- 6 tác phẩm latte art (Rosetta, Heart, Tulip, Swan, Leaf, Etching)
- Responsive grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- Hover: scale(1.03) + overlay fade với tên kỹ thuật
- Custom lightbox (không thư viện ngoài):
  - Backdrop blur
  - Keyboard navigation (← → ESC)
  - Touch swipe cho mobile
  - Hiển thị caption

### 5. AVAILABILITY SCHEDULE (`#schedule`)
- 7 cột (T2–CN) × 3 khung (Sáng/Chiều/Tối)
- Click ô để toggle available (gold + ✓) / unavailable (muted)
- Default: Sáng T2–T6 available, còn lại off
- localStorage persistence (key: `barista-cv-schedule`)
- Nút "Đặt lại" (reset về mặc định)
- Nút "Sao chép lịch" → plaintext dạng bảng vào clipboard

### 6. FOOTER
- "Ngô Gia © 2025"
- "Made with ☕" (hiệu ứng pulse animation)

---

## ✨ Interactive Features

| Feature              | Implementation                                                  |
|----------------------|-----------------------------------------------------------------|
| Custom cursor        | Dot + ring, smooth follow, hover effect trên clickable elements |
| Scroll reveal        | Intersection Observer (threshold 0.15), fade-up animation       |
| Sticky nav           | Frosted glass on scroll (backdrop-filter: blur)                 |
| Mobile drawer        | Hamburger → slide-in drawer + overlay backdrop                  |
| Copy to clipboard    | `navigator.clipboard` với fallback, toast notification          |
| Timeline draw        | Intersection Observer triggers line scaleY animation            |
| Lightbox             | Custom-built, keyboard + swipe navigation                       |
| Schedule toggle      | localStorage persistence, reset, copy as text                   |
| Smooth scroll        | JS-based smooth scrolling cho tất cả anchor links               |
| Personal intro card  | Frosted glass bio card trong hero section                       |
| Steam particles      | 8 CSS-animated particles với `steamRise` keyframes              |

---

## 🎯 Tính năng nổi bật

- ✨ Scroll reveal animation (từ từ hiện ra khi scroll)
- 🖱️ Custom cursor (chấm tròn + vòng theo sau)
- 📋 Copy to clipboard (SĐT, Email, lịch làm việc)
- 🖼️ Lightbox gallery với keyboard & touch navigation
- 🗓️ Lịch làm việc interactive (lưu bằng localStorage)
- 📱 Responsive (mobile-first, breakpoints: 480px, 768px, 1024px)
- ♿ Reduced motion support (`prefers-reduced-motion: reduce`)

---

## ✏️ Tùy chỉnh

| Nội dung              | File cần sửa               | Chi tiết                                  |
|-----------------------|----------------------------|-------------------------------------------|
| Thông tin cá nhân     | `index.html`               | Tên, SĐT, email, địa chỉ, giới thiệu      |
| Kinh nghiệm làm việc  | `index.html`               | Timeline section — thêm/sửa jobs          |
| Màu sắc               | `style.css`                | Chỉnh CSS variables trong `:root`         |
| Latte Art Gallery     | `main.js` + `assets/latte/`| Update `galleryData` array, thêm ảnh thật |
| Schedule defaults     | `main.js`                  | `DEFAULT_SCHEDULE` object                 |
| Navigation links      | `index.html`               | Header nav + drawer nav                   |

---

## 📝 Ghi chú

- **No build tools** — pure vanilla web stack. Mở `index.html` trực tiếp trong browser để xem.
- **Gallery images**: Hiện tại đang dùng ảnh thật trong `assets/latte/`. Để thay ảnh, drop file .jpg/.webp vào thư mục và cập nhật `galleryData` trong `main.js`.
- **Schedule**: Dữ liệu lưu trong localStorage (key: `barista-cv-schedule`). Clear qua DevTools → Application → Local Storage nếu cần reset.
- **Trình duyệt hỗ trợ**: Chrome, Firefox, Safari, Edge (các phiên bản hiện tại).
