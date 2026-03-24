# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Vite)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Environment Setup

Copy `.env.example` to `.env` and fill in the values:

- `VITE_EMAILJS_SERVICE_ID` — EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` — EmailJS template for the main contact message
- `VITE_EMAILJS_TEMPLATE_VERIFICATION_ID` — EmailJS template for the verification code email
- `VITE_EMAILJS_USER_ID` — EmailJS public key
- `VITE_RECAPTCHA_SITE_KEY` — Google reCAPTCHA v2 site key

All env vars must be prefixed with `VITE_` to be exposed to the browser by Vite.

## Architecture

**Stack**: React 18 + Vite, MUI v6 (Material UI), React Router v7, i18next, Formik + Yup, EmailJS, Redux Toolkit.

**Routing** (defined in `src/App.jsx`): `/` (Home), `/about`, `/services`, `/contact`, and a catch-all 404.

**Theme** (`src/theme.jsx`): Light/dark mode is detected from the system preference at startup (`prefers-color-scheme`). Primary color is near-black (`#222222`) in light mode and white in dark mode; secondary/accent is red (`#ef1717`). CSS variables are set via `MuiCssBaseline` overrides so they work outside MUI components.

**Internationalization** (`src/i18n.jsx`): Supports Turkish (`tr`, default), English (`en`), and Greek (`el`). Translation files live in `/locales/{lang}/translation.json` (at the project root, not inside `src`). Language can be switched at runtime via the header's translate icon.

**Contact form flow** (`src/components/Contact/ContactForm.jsx`): Formik validates fields → reCAPTCHA must be verified → on submit, EmailJS sends a 6-digit verification code to the user's email (90-second expiry) → a dialog prompts the user to enter the code → on success, EmailJS sends the actual contact message. There is a 30-second cooldown after 5 failed code attempts.

**Deployment**: Hosted on Netlify. `netlify.toml` and `_redirects` both rewrite all paths to `/` for client-side routing (SPA mode).

**Images**: All images are WebP format, stored in `src/assets/images/`. The home page preloads the first hero image for LCP optimization. `ServiceCard` is lazy-loaded with a `Skeleton` fallback.
