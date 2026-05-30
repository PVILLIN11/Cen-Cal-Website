# Cen Cal Engineering — Business Website

A static, single-page marketing website for **Cen Cal Engineering**, a California Class A General Engineering Contractor based in Tulare, CA (License #1086803). The site showcases the company's services, credentials, project gallery, and contact information.

---

## Pages & Sections

The site is a single HTML page (`index.html`) divided into the following sections:

| Section | ID / Class | Description |
|---|---|---|
| Navigation | `.navbar` | Sticky top nav with mobile hamburger menu |
| Hero | `#home` | Full-screen logo display |
| Intro | `.intro` | Brief company overview paragraph |
| About | `#about` | Company background, location, and certifications |
| Services | `#services` | 8-card grid of core service offerings |
| Gallery | `.gallery` | 4 project photo carousels with lightbox viewer |
| Spotlight | `.spotlight-section` | Featured project with YouTube video thumbnail |
| Contact | `#contact` | Phone, email, mailing address, and Facebook link |
| Footer | `.footer` | Copyright and license number |

---

## Services Showcased

The website presents **8 core services**:

1. **General Engineering** — Residential and commercial planning, design, and construction oversight
2. **Project Management** — Capital improvement inspection and schedule/budget oversight
3. **Underground Utilities** — Water, sewer, storm, and dry utility installation and inspection
4. **Septic Systems** — Design, installation, and inspection for residential and commercial properties
5. **Grading / Earthwork** — Excavation, trenching, and site preparation
6. **Demolition Work** — Safe structural demolition with waste management
7. **Drafting Services** — Civil improvement plans and permit submission drawings
8. **Construction Surveying** — Construction staking, site layout, and base flood elevation certificates

---

## Credentials Highlighted

- **California ADA Certified** — Accessibility compliance
- **Traffic Safety / Flagger Certified**
- **Class A General Engineering License** — California License #1086803

---

## Project Gallery

Four carousel categories, each browsable left/right:

- **Project Management** (5 photos)
- **Grading** (6 photos)
- **Surveying** (4 photos)
- **Underground** (10 photos)

Each carousel supports a **lightbox** viewer with zoom, pan, and keyboard navigation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (external `styles.css`) |
| Behavior | Vanilla JavaScript (external `script.js`) |
| Fonts/Icons | Emoji icons for service cards |
| Video | YouTube thumbnail link (no embed) |

No frameworks, build tools, or dependencies — fully static and self-contained.

---

## JavaScript Features (`script.js`)

### Mobile Navigation
Toggles a `.active` class on the nav link list when the hamburger button is tapped; auto-closes when a link is selected.

### Smooth Scrolling
Intercepts all `href="#..."` anchor clicks and scrolls to the target with a 60px offset to account for the fixed navbar.

### `Carousel` Class
A custom carousel implementation for each `.gallery-carousel` element:
- Shows 1, 2, or 3 items depending on viewport width (responsive breakpoints at 768px and 968px)
- Calculates `translateX` offsets to slide the track
- Disables prev/next buttons at the boundaries
- Recalculates on window resize (debounced at 250ms)

### `Lightbox` Class
A full-screen image viewer triggered by clicking any carousel item:
- Opens the clicked image and builds a list of all gallery images for sequential navigation
- **Zoom** — click to zoom in at the cursor's exact position; click again to reset
- **Pan** — drag the zoomed image with mouse or touch
- **Keyboard** — `←`/`→` to navigate, `Escape` to close
- Locks page scroll while open

---

## File Structure

```
/
├── index.html          # Main page structure and content
├── styles.css          # All styling (layout, responsive, animations)
├── script.js           # Navigation, carousel, and lightbox logic
├── FinalLogo.jpg       # Hero section logo
├── main-logo.jpg       # Browser favicon
├── PM1–5.jpg           # Project Management gallery images
├── Grading1–6.jpg      # Grading gallery images
├── Surveying1–4.jpg    # Surveying gallery images
└── Underground1–10.jpg # Underground utilities gallery images
```
