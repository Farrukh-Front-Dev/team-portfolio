# I18n Implementation Guide - Quick Start

## 🚀 Quick Start

### **1. Use in Components**

```tsx
import { useI18n } from "@context/I18nContext";

function MyComponent() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div>
      {/* Translate text */}
      <h1>{t("heading", "hero")}</h1>
      
      {/* Current language */}
      <p>Current: {locale}</p>
      
      {/* Change language */}
      <button onClick={() => setLocale("uz")}>
        O'zbekcha
      </button>
    </div>
  );
}
```

---

## 📝 Translation Files

### **Location:**
```
app/(site)/_content/translations/
├── en/
│   ├── common.json    # Shared labels
│   ├── hero.json      # Hero section
│   ├── about.json     # About section
│   ├── projects.json  # Projects section
│   ├── contact.json   # Contact section
│   ├── team.json      # Team section
│   └── services.json  # Services section
├── ru/
│   └── ... (same structure)
└── uz/
    └── ... (same structure)
```

### **Example Translation File:**

```json
// en/hero.json
{
  "title": "Farrukh — Frontend Engineer",
  "subtitle": {
    "prefix": "I build",
    "rotating": [
      "modern web applications",
      "responsive designs"
    ]
  },
  "cta": {
    "primary": "About Me",
    "secondary": "Projects"
  }
}
```

---

## 🎯 Common Patterns

### **1. Simple Translation**
```tsx
const title = t("title", "hero");
```

### **2. Nested Keys**
```tsx
const primaryCTA = t("cta.primary", "hero");
```

### **3. Common Labels**
```tsx
const viewCode = t("labels.viewCode", "common");
```

### **4. Navigation**
```tsx
const homeLabel = t("navigation.home", "common");
```

---

## 🔧 Update Existing Components

### **Before:**
```tsx
function HeroSection() {
  return (
    <div>
      <h1>Farrukh — Frontend Engineer</h1>
      <button>About Me</button>
    </div>
  );
}
```

### **After:**
```tsx
import { useI18n } from "@context/I18nContext";

function HeroSection() {
  const { t } = useI18n();

  return (
    <div>
      <h1>{t("title", "hero")}</h1>
      <button>{t("cta.primary", "hero")}</button>
    </div>
  );
}
```

---

## 📋 Checklist for Each Section

- [ ] Create translation files (en, ru, uz)
- [ ] Add all text content to JSON
- [ ] Import `useI18n` hook
- [ ] Replace hardcoded strings with `t()`
- [ ] Test language switching
- [ ] Verify all languages display correctly

---

## 🎨 Language Switcher

Already added to Sidebar! Users can:
- Click globe icon to open menu
- Select language (en, ru, uz)
- Language persists in localStorage
- Smooth transitions

---

## 🐛 Troubleshooting

### **Translation not found:**
```tsx
// Check:
1. File exists: translations/en/hero.json
2. Key exists in JSON: { "title": "..." }
3. Section name correct: t("title", "hero")
```

### **Language not changing:**
```tsx
// Check:
1. I18nProvider wraps app (in layout.tsx)
2. Translation files exist for all languages
3. Browser console for errors
```

---

## 📚 Next Steps

1. **Update HeroSection** - Replace hardcoded text
2. **Update AboutSection** - Add translations
3. **Update ProjectsSection** - Add translations
4. **Update ContactSection** - Add translations
5. **Update TeamSection** - Add translations
6. **Update ServicesSection** - Add translations
7. **Test all languages** - Switch and verify

---

## 💡 Tips

- Keep translation keys consistent across languages
- Use descriptive key names
- Group related translations
- Test on mobile (language switcher responsive)
- Check RTL languages if needed (future)

---

**Ready to implement!** 🚀

Start with one section, test it, then move to the next.
