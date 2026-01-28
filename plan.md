# Priority Flyers - План разработки
## Премиальный сайт для Business & First Class авиабилетов

---

## Исследование и референсы

### Конкуренты:
- **FlyBasis.com** - минимализм, teal акцент, Trustpilot
- **Business-Class.com** - теплая палитра (terracotta), 24/7 агенты
- **Premium-Flights.com** - только премиум, newsletter
- **Black Tomato** - редакционный стиль, full-screen визуалы

### UI/UX тренды 2026:
- AI-персонализация
- Glassmorphism (полупрозрачность, blur)
- Bento Grid layouts
- Soft UI / Neumorphism 2.0
- Mobile-first (60%+ бронирований)

---

## 1. Цветовая палитра

```css
/* PRIMARY ACCENT */
--pf-red: #E01F3D;           /* Priority Red - энергия, премиум */
--pf-red-light: #F04D66;     /* Light Red */
--pf-red-dark: #B8182F;      /* Deep Red */

/* SECONDARY */
--pf-navy: #1A2744;          /* Deep Navy - доверие */
--pf-navy-light: #2E3F5C;    /* Navy */

/* NEUTRALS */
--pf-ivory: #FAF9F7;         /* Ivory */
--pf-pearl: #F5F3EF;         /* Pearl */
--pf-white: #FEFEFE;         /* Pure White */
--pf-charcoal: #1F2937;      /* Charcoal */

/* STATUS COLORS */
--pf-emerald: #10B981;       /* Success */
--pf-amber: #F59E0B;         /* Warning */

/* GLASSMORPHISM */
--pf-glass-white: rgba(255,255,255,0.7);
--pf-glass-dark: rgba(26,39,68,0.8);
--pf-glass-red: rgba(224,31,61,0.15);

/* SHADOWS */
--pf-shadow-sm: 0 2px 8px rgba(26,39,68,0.08);
--pf-shadow-md: 0 4px 20px rgba(26,39,68,0.12);
--pf-shadow-lg: 0 8px 40px rgba(26,39,68,0.16);
--pf-shadow-red: 0 4px 30px rgba(224,31,61,0.25);
```

---

## 2. Структура страниц

```
/                     # Главная
/flights              # Поиск рейсов
/flights/results      # Результаты поиска
/flights/[id]         # Детали рейса
/destinations         # Направления
/destinations/[slug]  # Конкретное направление
/airlines             # Авиакомпании
/airlines/[slug]      # Профиль авиакомпании
/cabin-classes        # Классы обслуживания
/about                # О нас
/contact              # Контакты
/blog                 # Блог/Журнал
/blog/[slug]          # Статья
/faq                  # FAQ
/privacy              # Политика конфиденциальности
/terms                # Условия использования
```

---

## 3. Структура главной страницы

```
[1] NAVBAR (sticky, glassmorphism)
    - Logo Priority Flyers
    - Menu: Flights, Destinations, Airlines, Services
    - CTA "Get a Quote"
    - Language/Currency
    - Profile/Auth

[2] HERO SECTION (full-screen)
    - Background: Video/Parallax image
    - Headline: "Elevate Your Journey"
    - Subheadline: "Premium Business & First Class at Exceptional Value"
    - Booking Form (glassmorphism card):
      * Trip Type Toggle
      * From/To Airport Pickers
      * Date Pickers
      * Passengers & Class
      * Search Button

[3] TRUST BAR
    - "Save up to 60%"
    - "24/7 Expert Support"
    - "100% Secure Booking"
[4] FEATURED DEALS (Bento Grid)
    - 6-8 premium deals
    - Price: Was/Now
    - Hover animations

[5] WHY CHOOSE US
    - Lie-Flat Seats Guaranteed
    - Expert Travel Advisors
    - Best Price Promise
    - Flexible Changes

[6] DESTINATIONS (Carousel)
    - Popular Business Class Routes
    - Full-bleed imagery
    - Price overlays

[7] CABIN COMPARISON
    - Business vs First Class
    - Interactive comparison
    - Animated seat illustrations

[8] AIRLINES PARTNERS
    - Logo carousel
    - Featured airline cards

[9] TESTIMONIALS
    - Video testimonials
    - Trustpilot integration
    - Client quotes

[10] BLOG PREVIEW
     - Editorial-style cards
     - "Best lounges", "Route guides"

[11] NEWSLETTER
     - Email subscription
     - "Exclusive deals" promise

[12] FOOTER
     - Contact info
     - Quick links
     - Social media
     - IATA, certifications
```

---

## 4. Компоненты shadcn/ui

### Установка:
```bash
npx shadcn@latest add button input label select calendar popover command form radio-group navigation-menu dropdown-menu sheet tabs breadcrumb card badge avatar separator accordion carousel skeleton dialog drawer toast alert progress tooltip table scroll-area
```

### Кастомные варианты Button:
- `primary` - градиент красного (#E01F3D), shadow-red
- `navy` - Deep Navy background
- `glass` - glassmorphism белый
- `glassDark` - glassmorphism темный

---

## 5. Кастомные компоненты

```
components/
├── layout/
│   ├── Navbar.tsx           # Glassmorphism навигация
│   ├── Footer.tsx           # Premium footer
│   ├── Container.tsx        # Max-width wrapper
│   ├── Section.tsx          # Section с padding
│   └── BentoGrid.tsx        # Модульная сетка
│
├── booking/
│   ├── FlightSearchForm.tsx # Главная форма поиска
│   ├── AirportPicker.tsx    # Combobox с autocomplete
│   ├── DateRangePicker.tsx  # Выбор дат
│   ├── PassengerSelector.tsx # Пассажиры + класс
│   ├── TripTypeToggle.tsx   # One-way/Round/Multi
│   ├── FlightCard.tsx       # Карточка рейса
│   └── PriceBreakdown.tsx   # Разбивка цены
│
├── destinations/
│   ├── DestinationCard.tsx  # Карточка направления
│   ├── DestinationGrid.tsx  # Сетка направлений
│   └── DestinationHero.tsx  # Hero для страницы
│
├── airlines/
│   ├── AirlineCard.tsx      # Карточка авиакомпании
│   ├── AirlineLogo.tsx      # Логотип с fallback
│   └── AirlineCarousel.tsx  # Карусель партнеров
│
├── cabin/
│   ├── CabinComparison.tsx  # Сравнение классов
│   └── AmenityList.tsx      # Список удобств
│
├── testimonials/
│   ├── TestimonialCard.tsx  # Карточка отзыва
│   └── TrustpilotWidget.tsx # Интеграция Trustpilot
│
├── common/
│   ├── Logo.tsx             # Брендовый логотип
│   ├── TrustBar.tsx         # Индикаторы доверия
│   ├── PriceTag.tsx         # Ценник с анимацией
│   └── CountdownTimer.tsx   # Таймер для deals
│
└── animations/
    ├── RevealOnScroll.tsx   # Motion появление
    ├── ParallaxSection.tsx  # GSAP параллакс
    ├── NumberCounter.tsx    # Анимация чисел
    └── TextReveal.tsx       # Посимвольное появление
```

---

## 6. Анимации

### Motion (микро-интеракции):
```typescript
// lib/motion.ts
export const motionPresets = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },

  cardHover: {
    whileHover: { y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" },
    transition: { duration: 0.2 },
  },

  buttonTap: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  },

  staggerContainer: {
    animate: { transition: { staggerChildren: 0.1 } },
  },
}
```

### GSAP (scroll-анимации):
```typescript
// lib/gsap.ts
- createHeroParallax() - параллакс фона
- createSectionReveal() - появление секций
- animateCounter() - счетчики чисел
- createTextReveal() - посимвольное появление
- createHorizontalScroll() - горизонтальный скролл
```

---

## 7. SEO

### Metadata:
```typescript
export const metadata: Metadata = {
  title: "Priority Flyers | Premium Business & First Class Flights",
  description: "Save up to 60% on Business and First Class flights worldwide. Expert advisors, 24/7 support.",
  keywords: ["business class flights", "first class tickets", "premium cabin", "luxury travel"],
  openGraph: { ... },
  twitter: { ... },
}
```

### Structured Data:
- Organization schema
- TravelAgency schema
- Flight search schema

---

## 8. Порядок разработки

### Sprint 0: Настройка (1 день)
- [ ] Цветовая палитра в globals.css
- [ ] Установка всех shadcn компонентов
- [ ] Motion/GSAP конфигурация в lib/
- [ ] Структура папок components/

### Sprint 1: Layout (2 дня)
- [ ] Navbar (desktop + mobile Sheet)
- [ ] Footer
- [ ] Container, Section wrappers
- [ ] Logo компонент

### Sprint 2: Hero + Booking (3-4 дня)
- [ ] Hero Section с parallax background
- [ ] FlightSearchForm (главная форма)
- [ ] AirportPicker с Command autocomplete
- [ ] DateRangePicker с Calendar
- [ ] PassengerSelector
- [ ] TripTypeToggle
- [ ] TrustBar

### Sprint 3: Content Sections (3-4 дня)
- [ ] BentoGrid компонент
- [ ] Featured Deals секция
- [ ] Why Choose Us секция
- [ ] Destinations Carousel
- [ ] Cabin Comparison

### Sprint 4: Дополнительные секции (2-3 дня)
- [ ] Airlines Partners carousel
- [ ] Testimonials секция
- [ ] Newsletter форма
- [ ] Blog Preview

### Sprint 5: Внутренние страницы (4-5 дней)
- [ ] /flights - результаты поиска
- [ ] /destinations/[slug]
- [ ] /airlines/[slug]
- [ ] /about
- [ ] /contact

### Sprint 6: Полировка (2-3 дня)
- [ ] Все scroll анимации (GSAP)
- [ ] Page transitions
- [ ] SEO метаданные всех страниц
- [ ] Lighthouse оптимизация
- [ ] Mobile тестирование
- [ ] Cross-browser тестирование

---

## 9. Ключевые файлы

| Файл | Изменения |
|------|-----------|
| `app/globals.css` | Цвета PF, glassmorphism, анимации |
| `app/layout.tsx` | SEO metadata, JSON-LD |
| `app/page.tsx` | Все секции главной страницы |
| `lib/utils.ts` | Расширить helper функциями |
| `lib/motion.ts` | Создать - Motion presets |
| `lib/gsap.ts` | Создать - GSAP helpers |
| `components.json` | Уже настроен |

---

## 10. Верификация

После каждого спринта:
1. `npm run dev` - локальная проверка
2. `npm run build` - проверка билда
3. Lighthouse audit (Performance, Accessibility, SEO)
4. Mobile preview (iPhone, Android)
5. Animations smoothness check (60fps)

### Core Web Vitals цели:
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

## Технологии

| Технология | Версия | Назначение |
|------------|--------|------------|
| Next.js | 16.1.5 | Framework |
| React | 19.2.3 | UI Library |
| TypeScript | latest | Type safety |
| Tailwind CSS | v4 | Styling |
| shadcn/ui | latest | UI Components |
| Lucide React | 0.563.0 | Icons |
| Motion | 12.29.2 | Animations |
| GSAP | 3.14.2 | Scroll animations |
| @gsap/react | 2.1.2 | React integration |
| Manrope | Variable | Typography |

---

## Референсы

- [Baymard Flight Booking UX 2025](https://baymard.com/blog/flight-booking-and-airlines-2025-benchmark)
- [UI/UX Design Trends 2026](https://www.index.dev/blog/ui-ux-design-trends)
- [Luxury Travel Website Design](https://mediaboom.com/news/luxury-travel-website-design/)
- [FlyBasis.com](https://www.flybasis.com/)
- [Business-Class.com](https://www.business-class.com/)
