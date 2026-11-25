# YourLunchbox

High-protein, ready-to-eat meal delivery. Next.js (App Router), TypeScript, Tailwind CSS, Zustand, Zod, Framer Motion.

    npm install
    npm run dev
    npm run build
    npx tsc --noEmit
    npm run lint

## Structure

    src/data        Typed catalogue: meals, plans, add-ons, promos, service area, FAQs, reviews
    src/lib         Pure logic: pricing, postal codes, delivery dates, macros, Zod schemas
    src/store       Zustand store, saved to localStorage
    src/i18n        UI strings (EN; add fr.ts with the same shape)
    src/components  ui, layout, landing, menu, builder, dashboard
    src/app         Routes

## Hosting

The site exports to static files in `out/`. Every push to `main` deploys to GitHub Pages through `.github/workflows/pages.yml`. To use a custom domain, set it in the repository Pages settings and point DNS at GitHub; the next deploy picks up the new path.

## Before launch

- Search engines are blocked. Remove `robots` from `src/app/layout.tsx` when ready.

- Payments: replace the card fields in `StepCheckout.tsx` with Stripe Elements and move `lib/checkout.ts` to a backend (GitHub Pages cannot run one).
- Database and sign-in: orders currently live only in the visitor's browser.
- Reviews in `data/reviews.ts` are samples. Replace them, then flip `REVIEWS_ARE_SAMPLES`.
- Recipes, nutrition, allergens, sourcing and food-safety statements are placeholders. Verify each against your kitchen.
- Confirm the delivery postal prefixes and tax in `data/serviceArea.ts`.
- "Made in Canada" is a regulated food claim: confirm the CFIA wording (often "Made in Canada from domestic and imported ingredients") before launch.
- Photos are Unsplash stand-ins. Replace with your own dishes.
- Connect the newsletter form and social links. Have a lawyer review Terms and Privacy.
