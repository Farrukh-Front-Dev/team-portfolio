# DevDuo - Team Portfolio

A modern, high-performance team portfolio website built with Next.js, React, and TypeScript.

## 👥 Team

**DevDuo** - Full-Stack Development Team

### Team Members:
- **Farrukh Djumayev** - Frontend Developer (React, Next.js, TypeScript)
- **Backend Developer** - Backend Developer (Django, Python, PostgreSQL)

---

## 🚀 Features

- **Multilingual Support** - 3 languages (English, Russian, Uzbek) with smooth switching
- **Team Showcase** - Professional team member profiles
- **Services Section** - Comprehensive service offerings
- **Project Portfolio** - Team and individual projects with filtering
- **Modern Design** - Glassmorphism UI with smooth animations
- **Dark/Light Mode** - Theme switching with persistent storage
- **Responsive** - Mobile-first design approach
- **Performance Optimized** - Lazy loading, code splitting, image optimization, translation caching
- **Type Safe** - Full TypeScript support
- **Accessible** - WCAG compliant components
- **Contact Form** - Integrated with Telegram Bot API
- **I18n Architecture** - Senior-level internationalization system

---

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

---

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Farrukh-Front-Dev/team-portfolio.git
cd team-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=DevDuo Team Portfolio
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🚀 Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
app/
├── (site)/                    # Main site layout
│   ├── _components/           # React components
│   │   ├── common/            # Reusable components
│   │   ├── sections/          # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── features/          # Feature-specific components
│   │   │   ├── team/          # Team member components
│   │   │   ├── projects/      # Project components
│   │   │   └── contact/       # Contact components
│   │   ├── effects/           # Visual effects
│   │   └── ui/                # UI primitives
│   │       └── LanguageSwitcher.tsx  # Language selector
│   ├── _hooks/                # Custom React hooks
│   ├── _lib/                  # Utilities & helpers
│   │   ├── teamData.ts        # Team data utilities
│   │   └── i18n.ts            # I18n utilities
│   ├── _types/                # TypeScript types
│   ├── _context/              # React context providers
│   │   ├── ThemeContext.tsx   # Theme management
│   │   └── I18nContext.tsx    # I18n management
│   ├── _content/              # Static content
│   │   ├── teamData.json      # Team information (EDIT THIS!)
│   │   └── translations/      # I18n translations
│   │       ├── en/            # English translations
│   │       ├── ru/            # Russian translations
│   │       └── uz/            # Uzbek translations
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── _lib/                      # Global utilities
├── _types/                    # Global TypeScript types
│   ├── index.ts
│   └── team.ts                # Team-related types
├── api/                       # API routes
│   ├── contact/               # Contact form endpoint
│   └── visit/                 # Visitor tracking endpoint
└── globals.css                # Global styles
```

---

## 🎨 Customization

### Multilingual Content

Edit translation files in `app/(site)/_content/translations/`:
- `en/` - English translations
- `ru/` - Russian translations  
- `uz/` - Uzbek translations

Each language has section-specific files:
- `common.json` - Shared labels, navigation
- `hero.json` - Hero section
- `about.json` - About section
- `projects.json` - Projects section
- `contact.json` - Contact section
- `team.json` - Team section
- `services.json` - Services section

See `I18N_IMPLEMENTATION_GUIDE.md` for details.

### Team Information

Edit `app/(site)/_content/teamData.json` to update:
- Team name and description
- Team member information
- Projects (team and individual)
- Services offered
- Tech stack

### Backend Developer Information

To update the backend developer's information, edit the second member in `teamData.json`:

```json
{
  "id": "backend-dev",
  "name": "Your Name",
  "role": "Backend Developer",
  "bio": "Your bio here...",
  "image": "/path-to-your-image.jpg",
  "skills": ["Python", "Django", "PostgreSQL", ...],
  "contact": {
    "email": "your-email@example.com",
    "github": "https://github.com/your-username",
    ...
  },
  "projects": [...]
}
```

### Colors & Theme

Edit `tailwind.config.ts` to customize colors and theme.

### Components

All components are in `app/(site)/_components/` organized by feature.

---

## 🔐 Environment Variables

### Required (Server-side)
- `TELEGRAM_BOT_TOKEN` - Telegram bot token from @BotFather
- `TELEGRAM_CHAT_ID` - Your Telegram chat ID

### Required (Client-side)
- `NEXT_PUBLIC_SITE_URL` - Your site URL
- `NEXT_PUBLIC_SITE_NAME` - Site name
- `NEXT_PUBLIC_API_URL` - API base URL

---

## 📊 Performance

- Lighthouse Score: 90+
- Core Web Vitals: All green
- Bundle Size: ~150KB (gzipped)

---

## 🔒 Security

- Input validation on all forms
- Rate limiting on API endpoints
- XSS protection
- Environment variables for sensitive data

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

```bash
npm run build
npm run start
```

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👥 Team Contact

**DevDuo Team**
- Email: team@devduo.dev
- Telegram: [@DevDuo_Team](http://t.me/DevDuo_Team)

### Individual Contacts:

**Farrukh Djumayev** (Frontend Developer)
- GitHub: [@Farrukh-Front-Dev](https://github.com/Farrukh-Front-Dev)
- LinkedIn: [farrukhdjumayev](https://www.linkedin.com/in/farrukhdjumayev)
- Email: farrukh.front.dev@gmail.com

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ by DevDuo Team
