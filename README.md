# Kira Allegra Heuer Atelier Site

A sophisticated, restrained website system for an atelier practice that bridges art, craft, and quiet commerce.

## Philosophy

This site embodies the principle: **white space + restraint > efficiency**

### Core Rules
- **No global cart icon** — commerce is discovered, not advertised
- **No prices until object pages** — meaning precedes transaction
- **"Available" is the primary signal** — not urgency or scarcity
- **Navigation is cultural, not functional** — section names position the practice
- **Footer confirms commerce** — shipping/returns visible but unobtrusive

## Site Structure

### 1. Homepage (`index.html`)
**Purpose:** Gallery index that introduces the practice through visual discovery

- Full-bleed asymmetrical grid
- Mixed content: objects, installations, editorial, books
- Hover reveals: title, category, status
- No explicit "shop" language
- Links to all major sections

### 2. Collections Section
**Files:** `collections.html`, `collections/*.html`

**Purpose:** Where commerce lives (quietly)

- **Collections Index:** Bodies of work with conceptual lines
- **Individual Collection Pages:** Editorial immersion with inline objects
- Objects show: title, material, edition, "Available"
- Non-purchasable works included for integrity
- No prices until object pages

### 3. Object Pages
**Files:** `objects/*.html`

**Purpose:** The ONLY explicit commerce page

Structure:
- Primary image (calm, centered)
- Object details (material, dimensions, year, edition)
- Process/context paragraph
- **Availability block** (bottom): Status, price, [Acquire] button
- No urgency language ever

### 4. Galerie Section
**Files:** `galerie.html`, `galerie/*.html`

**Purpose:** Remove doubt this is a cultural practice

- Exhibition-based documentation
- Installation photography
- Show texts and credits
- Some works may later appear in Collections — but not always
- Protects art from commerce contamination

### 5. Curatorial Projects
**Files:** `curatorial.html`, `curatorial/*.html`

**Purpose:** Position as curator/authority, not just maker

- Curatorial approach description
- Past projects: pop-ups, advisory work
- Images, concept, collaborators, outcomes
- **No buying here. Ever.**

### 6. Crusades Section
**Files:** `crusades.html`, `crusades/*.html`

**Purpose:** Explain why the atelier exists — passion, ideology, poetry

- Essay-forward content
- Visual fragments
- Environmental/philosophical commitments
- Objects may appear but **never purchasable here**
- Makes commerce feel earned elsewhere

### 7. Books Section
**Files:** `books.html`, `books/*.html`

**Purpose:** Slow objects — publications with same attention as physical work

- Minimal presentation
- Status: Coming Soon / Available / Out of Print
- Books can be purchasable — but quietly
- Same restrained commerce as objects

### 8. About Page
**Files:** `about.html`

**Purpose:** Definition, not résumé

- Atelier definition and etymology
- Intention and process
- Studio information
- **No calls to action**

### 9. Footer Pages
**Files:** `contact.html`, `faq.html`, `shipping.html`, `privacy.html`, `accessibility.html`

**Purpose:** Commerce confirmation without selling

- Contact information
- FAQ (subtle commerce confirmation)
- Shipping & Returns (confirms objects can be acquired)
- Confirms: "Yes, you can acquire things here"

## User Journey

How users learn it's a shop without being told:

1. **Homepage** → sees functional objects + "Available"
2. **Clicks Collection** → sees editions + repetition
3. **Clicks Object** → sees price + "Acquire"
4. **Footer** → sees Shipping & Returns

At no point do they feel sold to.

## Design System

### Typography
- **Serif (Crimson Text/Georgia):** Body text, warmth, editorial
- **Sans-serif (Inter):** Navigation, metadata, restraint

### Color Palette
- `--color-bg: #f8f7f4` — warm neutral background
- `--color-text: #1a1a1a` — primary text
- `--color-text-light: #666` — metadata, captions
- `--color-border: #d4d2cc` — subtle divisions
- `--color-accent: #2a2a2a` — interactions

### Spacing System
- `--spacing-xs: 0.5rem` (8px)
- `--spacing-sm: 1rem` (16px)
- `--spacing-md: 2rem` (32px)
- `--spacing-lg: 4rem` (64px)
- `--spacing-xl: 6rem` (96px)

### Interaction Principles
- Hover states: subtle opacity/scale changes
- Transitions: 0.3s–0.6s ease curves
- No aggressive animations
- Image zoom on hover (3-5% scale)
- Caption reveals: opacity + translateY

## JavaScript Features (`js/main.js`)

### Implemented
- Gallery item click/keyboard navigation
- Lazy load with fade-in
- Smooth scroll for anchors
- Acquire button interaction (subtle acknowledgment)
- Intersection Observer scroll animations
- Navigation active state highlighting
- Layout shift prevention

### Philosophy
- Progressive enhancement
- No aggressive prompts
- Subtle acknowledgments over loud confirmations
- Accessibility-first interactions

## File Structure

```
Kira Allegra Heuer/
├── index.html              # Homepage gallery
├── collections.html        # Collections index
├── galerie.html           # Exhibitions index
├── curatorial.html        # Curatorial projects index
├── crusades.html          # Crusades index
├── books.html             # Books index
├── about.html             # Atelier definition
├── contact.html           # Contact information
├── faq.html               # Frequently asked questions
├── shipping.html          # Shipping & returns
├── collections/
│   └── amulets.html       # Collection detail example
├── objects/
│   └── amulet-i.html      # Object detail example (commerce)
├── galerie/
│   └── water-chapels.html # Exhibition detail example
├── curatorial/
│   └── material-memory.html # Curatorial project example
├── crusades/
│   └── ocean-letters.html # Crusade detail example
├── books/
│   └── water-chapels.html # Book detail example
├── css/
│   └── styles.css         # Complete design system
├── js/
│   └── main.js           # Interactions
├── images/                # Image assets
└── README.md             # This file
```

## Development Notes

### To Add Images
Place images in `/images/` directory. Current placeholders:
- Homepage gallery images
- Collection hero images
- Object detail photos
- Exhibition documentation
- Studio photography

### To Add New Collection
1. Create `collections/[collection-name].html` from `amulets.html` template
2. Add entry to `collections.html`
3. Create object pages in `objects/` directory
4. Update homepage gallery with representative images

### To Add New Object
1. Create `objects/[object-name].html` from `amulet-i.html` template
2. Include in parent collection page as `.object-inline`
3. Ensure availability block is present (only place price appears)

### Commerce Integration
Current "Acquire" buttons are styled and interactive but not connected to backend. To integrate:
- Add cart/checkout system
- Connect acquire buttons to cart logic
- Implement order processing
- Maintain restrained UI — no cart icon in header

## Responsive Design

Mobile breakpoint: `768px`
- Single column layouts
- Maintained white space
- Touch-friendly interactions
- Same restraint as desktop

## Accessibility

- Semantic HTML throughout
- Keyboard navigation support
- Image alt text structure
- Color contrast compliance
- Focus states on interactive elements

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement approach
- Graceful degradation for older browsers

---

**Built with restraint. Made with intention.**

