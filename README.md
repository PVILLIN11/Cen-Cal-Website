# Cen Cal Engineering — Portfolio Project

A fully custom, responsive business website built from scratch for a California Class A General Engineering Contractor. No frameworks, no templates — pure HTML, CSS, and vanilla JavaScript.

**Live project:** Cen Cal Engineering | Tulare, CA
https://cencalengineering.com/

---

## Skills Demonstrated

### JavaScript (Vanilla)
- Built a reusable **object-oriented Carousel class** from scratch — handles responsive breakpoints, dynamic `translateX` offset calculation, boundary-aware button states, and debounced resize events
- Built a full-featured **Lightbox class** with click-to-zoom at cursor origin, mouse/touch drag-to-pan on zoomed images, sequential image navigation, keyboard controls (`←` `→` `Escape`), and scroll lock
- Used `querySelector`, `closest()`, event delegation, and DOM traversal without any libraries
- Touch event handling for mobile pan support (`touchstart`, `touchmove`, `touchend`)

### CSS
- Fully **responsive layout** built with CSS Grid and Flexbox — no Bootstrap or utility frameworks
- Mobile-first approach with custom breakpoints
- Smooth transitions and hover effects
- Custom sticky navbar, hero section, card grids, and carousel track styling

### HTML
- Semantic HTML5 structure (`<nav>`, `<section>`, `<footer>`)
- SEO meta tags including description and referrer policy
- Accessibility attributes (`aria-label` on buttons, `alt` text on all images)
- Anchor-based single-page navigation

### General
- Smooth scroll with fixed navbar offset calculation
- Hamburger mobile menu with toggle and auto-close behavior
- YouTube video spotlight using thumbnail + overlay instead of a heavy iframe embed
- Clean separation of concerns across `index.html`, `styles.css`, and `script.js`
- Zero dependencies — no jQuery, no frameworks, no build tools

---

## What Was Built

A complete single-page marketing site including:
- Sticky responsive navbar with mobile hamburger menu
- Hero section, about/credentials section, and 8-service card grid
- 4 independent photo carousels (29 total project images)
- Full-screen lightbox with zoom, pan, and keyboard navigation
- Featured project spotlight with video thumbnail
- Contact section and footer with license info
