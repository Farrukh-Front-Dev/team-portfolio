# Portfolio Sayt Dizayn Tizimi

## 🎨 Umumiy Konsepsiya

Portfolio sayt **ikki xil tema** bilan ishlaydi:
- **Light Mode**: Classic oq dizayn, minimal va professional
- **Dark Mode**: Glass morphism (shisha effekt) bilan zamonaviy va interactive

---

## 🌓 Light Mode (Classic)

### Xususiyatlari:
- ✅ Toza oq background
- ✅ Oddiy shadow effektlar
- ✅ Minimal va professional ko'rinish
- ✅ Yuqori contrast (o'qish uchun qulay)
- ✅ Classic typography

### Ranglar:
- **Background**: `#ffffff` (oq)
- **Text**: `#111827` (qora)
- **Cards**: `#f3f4f6` (och kulrang)
- **Borders**: `#e5e7eb` (kulrang)

---

## 🌙 Dark Mode (Glass Morphism)

### Xususiyatlari:
- ✅ Glass blur effektlar (`backdrop-blur-xl`)
- ✅ Semi-transparent elementlar
- ✅ Gradient backgrounds
- ✅ Interactive hover effektlar
- ✅ Shine va glow effektlar

### Ranglar:
- **Background**: Gradient (`#0f0c29` → `#302b63` → `#24243e`)
- **Text**: `#ffffff` (oq)
- **Glass Cards**: `rgba(255,255,255,0.1)` + blur
- **Borders**: `rgba(255,255,255,0.2)`

### Glass Effect Parametrlari:
```css
backdrop-blur-xl: 24px
bg-white/10: 10% opacity
border-white/20: 20% opacity
shadow-xl: Chuqur shadow
```

---

## 📱 Responsive Design

### Breakpoints:
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### Mobile Optimizatsiya:
- Sidebar pastda (bottom navigation)
- Hero section: 50% rasm, 50% text
- Cards: 2 ustun grid
- Touch-friendly buttonlar

### Desktop Optimizatsiya:
- Sidebar o'ngda (vertical navigation)
- Hero section: horizontal layout
- Cards: 4-5 ustun grid
- Hover effektlar

---

## 🎭 Komponentlar

### 1. Hero Section
- **Mobile**: Vertikal (rasm yuqori, text pasti)
- **Desktop**: Horizontal (rasm chap, text o'ng)
- **Rasm**: Circular, 3D tilt effect
- **Text**: Gradient title, rotating subtitle

### 2. Skills Cards (TechStack)
- **Light**: Oq background, simple shadow
- **Dark**: Glass blur, gradient hover
- **Layout**: Responsive grid (2-5 ustun)
- **Animation**: Fade in, hover scale

### 3. Timeline (Experience)
- **Light**: Oq cards, vertical line
- **Dark**: Glass cards, glowing line
- **Layout**: Vertical timeline
- **Animation**: Staggered fade in

### 4. Project Cards
- **Light**: Oq background, image preview
- **Dark**: Glass blur, gradient overlay
- **Hover**: Scale up, show buttons
- **Buttons**: Glass morphism (dark mode)

### 5. Sidebar/Navigation
- **Mobile**: Bottom bar, glass background
- **Desktop**: Right sidebar, vertical
- **Tooltips**: Glass blur (dark mode)
- **Icons**: Smooth transitions

---

## ✨ Effektlar

### Background Effektlar (Dark Mode):
1. **PixelBlast**: Animated pixel pattern
2. **LightRays**: Gradient light rays
3. **Particles**: Floating particles (eski versiya)

### Hover Effektlar:
- `scale(1.05)`: Kichik zoom
- `translateY(-8px)`: Yuqoriga ko'tarilish
- `backdrop-blur-2xl`: Blur kuchayishi
- Gradient overlay: Rang o'zgarishi

### Animation Delays:
```css
animation-delay-100: 100ms
animation-delay-200: 200ms
animation-delay-400: 400ms
```

---

## 🔤 Typography

### Fontlar:
- **Sans-serif**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono (code uchun)

### Font Sizes (Responsive):
```css
/* Headings */
text-2xl sm:text-3xl md:text-4xl lg:text-5xl

/* Body */
text-sm sm:text-base md:text-lg

/* Small */
text-xs sm:text-sm
```

### Font Weights:
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

---

## 🎯 Animatsiyalar

### Fade In Animations:
```css
animate-fadeInUp: Pastdan yuqoriga fade
animate-fadeInDown: Yuqoridan pastga fade
animation-delay-{n}: Staggered animation
```

### Hover Animations:
```css
hover:scale-105: 5% zoom
hover:-translate-y-2: 8px yuqoriga
hover:backdrop-blur-2xl: Blur kuchayishi
transition-all duration-300: Smooth transition
```

---

## 🎨 Color Palette

### Light Mode:
- **Primary**: `#3b82f6` (blue)
- **Secondary**: `#8b5cf6` (purple)
- **Background**: `#ffffff` (white)
- **Text**: `#111827` (gray-900)
- **Muted**: `#6b7280` (gray-500)

### Dark Mode:
- **Primary**: `#60a5fa` (blue-400)
- **Secondary**: `#a78bfa` (purple-400)
- **Background**: Gradient
- **Text**: `#ffffff` (white)
- **Muted**: `#9ca3af` (gray-400)

---

## 📦 Komponent Strukturasi

```
app/(site)/
├── _components/
│   ├── sections/          # Asosiy sectionlar
│   ├── features/          # Feature komponentlar
│   │   ├── about/        # About section
│   │   ├── hero/         # Hero section
│   │   ├── projects/     # Projects section
│   │   ├── contact/      # Contact section
│   │   └── sidebar/      # Navigation
│   ├── effects/          # Visual effektlar
│   └── ui/               # UI komponentlar
├── _content/             # Content data (JSON)
├── _hooks/               # Custom hooks
└── _lib/                 # Utility functions
```

---

## 🚀 Performance

### Optimizatsiyalar:
- ✅ Lazy loading (effects)
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting
- ✅ CSS-in-JS (Tailwind)
- ✅ Memoization (React.memo)

### Bundle Size:
- Minimal dependencies
- Tree shaking
- Dynamic imports

---

## 📱 Accessibility

### Features:
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Color contrast (WCAG AA)

---

## 🎭 Theme Toggle

### Funksiyalar:
- Light/Dark mode switch
- System preference detection
- Smooth transition
- LocalStorage persistence

### Implementation:
```tsx
const { darkMode, toggleTheme } = useTheme();
```

---

## 📝 Xulosa

Portfolio sayt zamonaviy, responsive va professional dizaynga ega:
- **Light mode**: Classic va minimal
- **Dark mode**: Glass morphism va interactive
- **Performance**: Optimized va fast
- **Accessibility**: WCAG compliant
- **Mobile-first**: Responsive design

Dizayn tizimi **consistent**, **scalable** va **maintainable**! 🎨✨
