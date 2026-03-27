# sprdlx

**The product and venture studio creating beautiful AI companies.**

sprdlx is the marketing site for SPRDLX — a React + Vite single-page app with smooth scroll (Lenis), GSAP motion, and a high-contrast black / white art direction.

---

## Stack

- **React 19** · **TypeScript** · **Vite 6**
- **Tailwind CSS** · **shadcn-style UI** · **i18next**
- **GSAP** + **ScrollTrigger** (section background transitions)
- **Lenis** (smooth scrolling)
- **Spline** (hero 3D), optional **ogl** shaders elsewhere

---

## Getting started

**Requirements:** Node.js 20+ (recommended)

```bash
npm install
npm run dev
```

Dev server defaults to port **3000** (see `package.json`).

```bash
npm run build    # production build → dist/
npm run preview  # preview production build
npm run lint     # TypeScript check
```

---

## Environment (optional)

If you use features that call the Gemini API, copy `.env.example` to `.env` / `.env.local` and set:

- `GEMINI_API_KEY` — your Google AI key  
- `APP_URL` — public URL when deployed (callbacks / links)

Fonts: place **Feature Deck Regular** as `public/fonts/FeatureDeck-Regular.woff2` (see `src/index.css`) for the intended typography.

---

## Repository

[github.com/somapujith/sprdlx](https://github.com/somapujith/sprdlx)
