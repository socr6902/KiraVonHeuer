# Landing Page Testing Guide

## Available Versions

You now have 3 different landing page versions to test:

### **Version 1 (Current)** — `index.html`
- **Layout:** 4-column uniform grid
- **Aspect Ratio:** All images 3:4 (portrait)
- **Best For:** Clean, organized, symmetrical presentation
- **View:** http://localhost:port/ or your-domain.com/

### **Version 2** — `index-v2.html`
- **Layout:** 3-column uniform grid (larger images)
- **Aspect Ratio:** All images 3:4 (portrait)
- **Best For:** More breathing room, larger image showcase
- **View:** http://localhost:port/index-v2.html or your-domain.com/index-v2.html

### **Version 3** — `index-v3.html`
- **Layout:** 4-column masonry/asymmetric grid
- **Features:** Mixed sizes (large 2x2, wide 2x1, tall 1x2, standard 1x1)
- **Best For:** Dynamic, editorial magazine feel
- **View:** http://localhost:port/index-v3.html or your-domain.com/index-v3.html

---

## How to Test

### Option 1: Direct URL Testing
Simply navigate to each version:
- `index.html` (version 1)
- `index-v2.html` (version 2)
- `index-v3.html` (version 3)

### Option 2: A/B Testing with Analytics

Add this to the `<head>` of each version to track which performs better:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID', {
    'page_title': 'Landing Page V1', // Change per version
    'page_location': window.location.href
  });
</script>
```

### Option 3: Random Split Testing

Create a simple redirect script at `index.html`:

```html
<script>
  // Randomly redirect to one of the versions
  const versions = ['index-v1.html', 'index-v2.html', 'index-v3.html'];
  const randomVersion = versions[Math.floor(Math.random() * versions.length)];
  window.location.href = randomVersion;
</script>
```

---

## What to Test

### Quantitative Metrics
- **Click-through rate** on gallery items
- **Time on page**
- **Scroll depth**
- **Bounce rate**
- **Conversion rate** (add to cart, newsletter signup, etc.)

### Qualitative Feedback
- Which feels most "premium"?
- Which layout best represents the brand?
- Which is easiest to navigate?
- Which images get the most attention?

---

## User Testing Questions

Share these versions with 5-10 people and ask:

1. "Which version makes you want to explore more?"
2. "Which feels most like a high-end atelier?"
3. "Which layout is most visually interesting?"
4. "Do you understand what's being sold?"
5. "Which version would you share with a friend?"

---

## Making Changes

### To edit a specific version:
1. Open the file (`index.html`, `index-v2.html`, or `index-v3.html`)
2. Make your changes
3. Save and refresh browser

### To add more versions:
Copy any existing version and modify:
```bash
cp index-v3.html index-v4.html
```

Then customize the layout, images, or styling.

---

## Quick Wins to Test

### Image Order
Try different "hero" images in the first position

### Grid Gaps
Adjust `gap: 2px` to `gap: 0` or `gap: 1rem` for different feels

### Aspect Ratios
Change `aspect-ratio: 3/4` to `1/1` (square) or `16/9` (landscape)

### Caption Placement
Test caption on bottom vs. center vs. top-left corner

### Hover Effects
Try different zoom amounts (1.03 vs 1.1) or fade effects

---

## Deployment

### To make a version live:
1. Rename your chosen version to `index.html`
2. Push to GitHub
3. Your hosting will automatically serve it

### To keep all versions public:
Keep all files and let users access via URL:
- Main: `yoursite.com`
- Alt 1: `yoursite.com/index-v2.html`
- Alt 2: `yoursite.com/index-v3.html`

---

## Winner Selection

After testing for 1-2 weeks:

1. Review metrics from analytics
2. Compile user feedback
3. Consider brand alignment
4. Make the winning version your permanent `index.html`
5. Archive other versions for future reference

---

**Current Status:**
- ✅ Version 1: 4-column uniform (LIVE)
- ✅ Version 2: 3-column uniform
- ✅ Version 3: 4-column masonry

**Next Steps:**
Choose which to make your primary landing page!
