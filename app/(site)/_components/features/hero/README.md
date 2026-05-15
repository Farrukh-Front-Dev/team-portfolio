# Hero Section Components

Professional, modular hero section architecture for team portfolio.

## 📁 Structure

```
hero/
├── HeroTitle.tsx          # Main title with gradient effect
├── AnimatedTagline.tsx    # Typing animation tagline
├── StatCard.tsx          # Individual stat card component
├── CTAButtons.tsx        # Call-to-action buttons
├── ScrollIndicator.tsx   # Animated scroll indicator
└── README.md            # This file
```

## 🎯 Components

### HeroTitle
**Purpose**: Display team name with gradient animation

**Props**:
- `title: string` - Team name to display
- `isVisible: boolean` - Controls animation trigger

**Features**:
- Gradient text effect (purple → pink)
- Fade-in animation
- Responsive font sizes (6xl → 9xl)
- Accessibility: ARIA labels

---

### AnimatedTagline
**Purpose**: Display tagline with typing animation

**Props**:
- `text: string` - Tagline text
- `isVisible: boolean` - Controls animation trigger
- `typingSpeed?: number` - Typing speed in ms (default: 50)

**Features**:
- Character-by-character typing effect
- Blinking cursor animation
- Responsive font sizes
- Accessibility: ARIA heading level 2

---

### StatCard
**Purpose**: Display individual statistic with icon

**Props**:
- `value: string` - Stat value (e.g., "5+")
- `label: string` - Stat label (e.g., "Years Experience")
- `icon: LucideIcon` - Lucide icon component
- `index: number` - Card index for staggered animation
- `isVisible: boolean` - Controls animation trigger
- `delay?: number` - Base animation delay (default: 0.7)

**Features**:
- Glassmorphism card design
- Hover scale effect
- Gradient value text
- Lucide icons
- Staggered animations
- Accessibility: ARIA article role

---

### CTAButtons
**Purpose**: Display primary and secondary action buttons

**Props**:
- `isVisible: boolean` - Controls animation trigger
- `primaryText?: string` - Primary button text (default: "Meet the Team")
- `primaryHref?: string` - Primary button link (default: "#team")
- `secondaryText?: string` - Secondary button text (default: "View Projects")
- `secondaryHref?: string` - Secondary button link (default: "#projects")
- `delay?: number` - Animation delay (default: 0.9)

**Features**:
- Gradient primary button
- Glassmorphism secondary button
- Hover effects with scale
- Lucide icons
- Focus states for accessibility
- Keyboard navigation support

---

### ScrollIndicator
**Purpose**: Animated scroll indicator for UX guidance

**Props**:
- `targetId?: string` - Target section ID (default: "team")
- `ariaLabel?: string` - Accessibility label

**Features**:
- Bouncing animation
- Smooth scroll to target
- Hover color change
- Keyboard accessible
- Focus ring for accessibility

---

## 🎨 Design Principles

1. **Modularity**: Each component is self-contained and reusable
2. **Performance**: Memoized components prevent unnecessary re-renders
3. **Accessibility**: ARIA labels, keyboard navigation, focus states
4. **Responsiveness**: Mobile-first design with breakpoints
5. **Type Safety**: Full TypeScript support with proper types
6. **Maintainability**: Clear prop interfaces and documentation

---

## 🚀 Usage Example

```tsx
import HeroTitle from "@components/features/hero/HeroTitle";
import AnimatedTagline from "@components/features/hero/AnimatedTagline";
import StatCard from "@components/features/hero/StatCard";
import CTAButtons from "@components/features/hero/CTAButtons";
import ScrollIndicator from "@components/features/hero/ScrollIndicator";
import { Zap } from "lucide-react";

function MyHero() {
  const { ref, isVisible } = useRevealAnimation();

  return (
    <section ref={ref}>
      <HeroTitle title="DevDuo" isVisible={isVisible} />
      <AnimatedTagline text="Building the Future" isVisible={isVisible} />
      <StatCard 
        value="5+" 
        label="Years" 
        icon={Zap} 
        index={0} 
        isVisible={isVisible} 
      />
      <CTAButtons isVisible={isVisible} />
      <ScrollIndicator />
    </section>
  );
}
```

---

## ✅ Best Practices

### Performance
- ✅ Use `memo()` for all components
- ✅ Use `useMemo()` for computed values
- ✅ Avoid inline object/array creation in render

### Accessibility
- ✅ Add ARIA labels to all interactive elements
- ✅ Support keyboard navigation
- ✅ Add focus states
- ✅ Use semantic HTML

### Maintainability
- ✅ Extract magic numbers to constants
- ✅ Use TypeScript for type safety
- ✅ Document all props and features
- ✅ Keep components small and focused

---

## 🔧 Customization

All components accept customizable props. Example:

```tsx
<CTAButtons 
  primaryText="Get Started"
  primaryHref="/contact"
  secondaryText="Learn More"
  secondaryHref="/about"
  delay={1.0}
/>
```

---

## 📦 Dependencies

- `motion/react` - Animations
- `lucide-react` - Icons
- `next/link` - Navigation
- `react` - Core library

---

## 🎯 Future Improvements

- [ ] Add unit tests
- [ ] Add Storybook stories
- [ ] Add theme customization
- [ ] Add animation presets
- [ ] Add loading states
