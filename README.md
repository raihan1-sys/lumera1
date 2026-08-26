# LUMERA — Full Portfolio Rebuild

This is a complete from-scratch rebuild of the Lumera portfolio marketplace. It does **not** depend on the earlier page structure.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## What is included

- High-end dark luxury design across the entire application
- Fully responsive layout with horizontal overflow prevented
- Home page with premium hero, category discovery, best sellers and campaigns
- Full `/shop` landing page with department imagery
- Every department gets its own cinematic hero section
- Nested department pages such as `/shop/automotive/accessories`
- Sports & Outdoors, Automotive, Accessories and every other department are populated
- Product pages with image gallery, details, cart and wishlist controls
- Functional local cart and wishlist persisted in the browser
- Search across a generated 6,000-product catalog
- Pagination and product grids
- Account demo
- Checkout demo with no real payment processing
- Membership plans
- Newsletter subscription demo
- Order tracking demo

## Product data

The 6,000 products are generated from structured catalog logic rather than stored as a giant 6,000-item browser array. This keeps the project small and makes the catalog easy to replace later with PostgreSQL, Prisma, Supabase, Firebase, or a real product API.

## Portfolio note

This is a portfolio/demo store. Payments are intentionally simulated and no card or mobile-money transaction is performed.
