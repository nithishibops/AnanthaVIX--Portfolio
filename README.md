# Ananthavix Solutions — Immersive 3D Website

A cinematic, video-like 3D business website for Ananthavix Solutions, upgraded from the existing static site without removing its business content.

## 3D experience
- Full-screen animated canvas hero with depth, stars, network nodes and a futuristic skyline
- 3D Ananthavix brand core with orbiting rings and floating capability nodes
- Mouse / pointer parallax in the hero
- Perspective tilt and light-tracking on major cards
- Scroll depth, progress bar, glass panels, cinematic lighting and motion
- Reduced-motion accessibility fallback
- Mobile performance reductions for the 3D scene

## Existing business content preserved
The site continues to present Ananthavix services for analytics, Power BI, automation, digital systems, apps, banking / FinTech, advisory, dashboards, enablement and client support.

## Project structure
- `index.html` — main website
- `privacy.html` — privacy page
- `assets/css/style.css` — original design plus 3D cinematic upgrade
- `assets/js/script.js` — navigation, enquiry chat, canvas animation, parallax and 3D card interaction
- `assets/images/ananthavix-logo-transparent.png` — brand asset
- `vercel.json` — Vercel static-site settings
- `.nojekyll` — GitHub Pages compatibility

## Run locally
No build step is required.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy
### GitHub Pages
Upload all project files to the repository root and enable Pages from the main branch / root folder.

### Vercel
Import the GitHub repository into Vercel. No build command is required.

## Performance note
The 3D hero is canvas-based and does not require a large background video or WebGL library. This keeps the visual experience much lighter than a full video/Three.js scene while still providing continuous animation and 3D depth.

## V3 immersive motion layer

This build adds three progressive-enhancement layers without changing the existing plain HTML/CSS/JavaScript architecture:

- **GSAP + ScrollTrigger:** cinematic hero pinning, a pinned process sequence, scrubbed section reveals, staged cards and animated section handoffs.
- **Custom GLSL/WebGL shader:** a hand-written animated cyan/gold distortion/noise layer over the hero, driven by pointer position and scroll progress.
- **Section transitions:** subtle full-screen light sweeps and clip/reveal handoffs between major content sections.

If GSAP CDN or WebGL is unavailable, the normal website content and navigation still work. Reduced-motion users automatically receive a static experience.

### Dubai skyline image
The hero uses the CC0/public-domain Wikimedia Commons image **“Dubai Night Time (Pexels-804915).jpg”** by Zaib Azhar as a remote background, with dark overlays and effects applied by the site. Source: Wikimedia Commons / Pexels CC0.

## V4 smooth cinematic pass

This build keeps the V3 visual direction but removes the expensive procedural 2D skyline canvas and uses the real Dubai skyline photograph as the primary hero scene. The GLSL overlay now runs only on capable desktop pointers, is capped to roughly 30 FPS, uses a lower DPR, and pauses when the hero is outside the viewport. GSAP no longer pins the hero or process section; scroll effects use lightweight transforms/reveals instead.

Responsive alignment was rebuilt so the 3D Ananthavix orb and the Business Delivery panel never overlap: desktop uses a balanced two-column hero, tablet landscape places orb and panel side by side, and tablet/mobile stacks them cleanly.

Dubai hero image: `Dubai Night Time (Pexels-804915).jpg` by Zaib Azhar, available via Wikimedia Commons under CC0 1.0.

## V5 smooth-alignment update

- Opening experience now uses a short lightweight branded loading screen with progress feedback.
- Mobile/tablet 3D hero alignment was rebuilt so the orbit, capability nodes, live-system caption, and delivery panel occupy separate layout areas and cannot overlap.
- Mobile node floating is disabled for steadier alignment and lower GPU usage.
- Public mobile numbers were removed from the website.
- General business enquiries now prepare an email to `nithish.ibops@gmail.com`.
- Memora app support now prepares an email to `memoraapp.support@gmail.com`.
- The website now states worldwide / remote-first availability in the hero and contact area.
