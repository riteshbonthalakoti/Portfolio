# Ritesh Bonthalakoti Portfolio — Architectural Context & Codebase Map

## Repository Architecture & Core Flow
- **Framework**: Next.js App Router (Next.js 16) with React 19, TypeScript, Tailwind CSS, Framer Motion, and HeroUI component libraries.
- **Root Directory**: `c:\Projects\Portfolio`

### Key Entry Points & Data Mapping
1. **Homepage Section Composition (`app/page.tsx`)**:
   - Renders sections sequentially: `ScrollNavigation` -> `Hero` -> `About` -> `Projects` -> `Experience` -> `Education` -> `Skills` -> `Services` -> `Certificates` -> `Blog` -> `Contact`.
   - Data is dynamically imported from files under `data/` (`config.ts`, `projects.ts`, `experience.ts`, `education.ts`, `skills.ts`, `services.tsx`, `certificates.ts`, `blog-posts.ts`).

2. **Metadata & Global SEO Pipeline (`app/layout.tsx` & `data/config.ts`)**:
   - `data/config.ts` (`siteConfig`) is the **single active source of truth** for metadata, user bio, socials, and contact info.
   - `app/layout.tsx` imports `siteConfig` from `data/config.ts` to construct the Next.js `metadata` object and layout shell (`Providers`, `Navbar`, `Footer`).
   - Hardcoded JSON-LD structured data exists in `layout.tsx` (Person / WebSite schema).

3. **Legacy Config Gotcha (`config/site.ts` vs `data/config.ts`)**:
   - `config/site.ts` is a legacy leftover from the original HeroUI template and is **NOT** used by `layout.tsx` or main page sections.
   - Always edit or reference `data/config.ts` for site-wide variables and content.

4. **Marketplace Flow (`app/marketplace/page.tsx` & `app/api/payment/route.ts`)**:
   - Catalog: `products[]` in `app/marketplace/page.tsx` (currently empty).
   - Checkout modal: `components/PaymentModal.tsx` triggering `POST /api/payment`.
   - Backend API: `app/api/payment/route.ts` is currently a simulated stub returning `{ success: true }`.

5. **Docs Page (`app/docs/page.tsx`)**:
   - Fully self-contained static page with inline categories (`docsCategories`), not currently wired to `data/`.

6. **Contact Form (`components/Contact.tsx`)**:
   - Form submits via POST fetch to Formcarry (`https://formcarry.com/s/YOUR_FORM_ID`).
