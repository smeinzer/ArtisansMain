# ROADMAP.md — Artisans On Main Build Phases

This file lives in the project root. The AI agent references it to stay on track.

---

## Phase 1: Foundation
**Goal**: Runnable app with layout shell and demo data

- [ ] Initialize Next.js 14+ with App Router, TypeScript, Tailwind
- [ ] Configure Tailwind with custom color palette, typography, spacing
- [ ] Set up Google Fonts (or self-host the chosen serif + sans-serif pair)
- [ ] Create all demo data files (products, artists, siteSettings, announcements)
- [ ] Build root layout with global styles
- [ ] Build Header component (logo/business name, navigation, cart icon with count)
- [ ] Build Footer component (business info, hours, social links, copyright)
- [ ] Build mobile navigation (slide-out menu)
- [ ] Verify: `npm run dev` works, layout renders on all pages, responsive at 375/768/1440

**Deliverable**: Navigable shell site with header/footer on every page.

---

## Phase 2: Homepage
**Goal**: Compelling landing page that sells the space

- [ ] Hero section — full-width image with overlaid headline and CTA button
- [ ] Featured Products section — grid of 4-6 products pulled from demo data
- [ ] ProductCard component — image, title, artist name, price, hover effect
- [ ] Announcements section — active announcements displayed as a subtle banner or card
- [ ] "Visit Us" teaser section — address, hours preview, link to Visit page
- [ ] Scroll animations (fade-in on scroll using Intersection Observer)
- [ ] Verify: Homepage is visually complete and responsive

**Deliverable**: A homepage you'd be proud to screenshot and send to the client.

---

## Phase 3: Shop
**Goal**: Browsable, filterable product catalog

- [ ] Shop page — full product grid with all demo products
- [ ] Filter sidebar/bar — filter by category (painting, ceramics, jewelry, etc.), artist, price range
- [ ] Sort options — price low/high, newest, alphabetical
- [ ] Product detail page — image gallery (main image + thumbnails), title, artist, price, description, dimensions, medium
- [ ] ProductGallery component — click to zoom or cycle images
- [ ] "More from this artist" section on product detail page
- [ ] Breadcrumb navigation on product pages
- [ ] Verify: Can browse, filter, and view all products. Detail page is rich and editorial.

**Deliverable**: Fully functional shop browsing experience with demo data.

---

## Phase 4: Cart & Checkout Flow
**Goal**: Working cart that connects to Shopify checkout

- [ ] CartContext provider — manages cart state (items, quantities, totals)
- [ ] Add to Cart button on product detail page (with quantity selector)
- [ ] Cart slide-out panel — shows items, quantities, line totals, subtotal
- [ ] Update quantity and remove item from cart
- [ ] Cart page (full page version) with same functionality
- [ ] "Proceed to Checkout" button (in demo mode: shows message about Shopify not connected yet; in live mode: redirects to Shopify checkout URL)
- [ ] Cart icon in header shows item count badge
- [ ] Verify: Can add items, modify cart, see totals. Cart persists during session.

**Deliverable**: Complete cart experience, ready to plug into Shopify checkout.

---

## Phase 5: Artists
**Goal**: Showcase the people behind the work

- [ ] Artists grid page — cards with headshot, name, short bio excerpt
- [ ] Individual artist page — full bio, headshot, Instagram/website links
- [ ] Artist's products section — filtered grid of their consigned pieces (from demo data, matched by artist name)
- [ ] Link from product detail "artist name" to their artist page
- [ ] Verify: Artist pages render correctly, product links work bidirectionally

**Deliverable**: Artist profiles that make the consignment model feel personal and curated.

---

## Phase 6: Content Pages
**Goal**: About, Visit, Contact — all CMS-ready

- [ ] About page — business story, mission, photo gallery section
- [ ] Visit page — address, hours (rendered from siteSettings), embedded Google Map (use iframe with placeholder coordinates: 35.6971, -82.5607), parking info
- [ ] Contact page — form (name, email, subject, message) wired to Formspree (placeholder endpoint), plus phone/email/social links
- [ ] Verify: All pages render, form submits (or shows placeholder message), map loads

**Deliverable**: All informational pages complete.

---

## Phase 7: Sanity Studio Integration
**Goal**: Embedded CMS that the shop owner can use

- [ ] Initialize Sanity project inside the repo
- [ ] Define all schemas: siteSettings, artist, announcement, homepageConfig, page
- [ ] Embed Sanity Studio at /studio route in Next.js
- [ ] Build Sanity client and GROQ queries
- [ ] Wire up demo data fallback: if Sanity returns null/empty, serve demo data
- [ ] Test: Sanity Studio loads at /studio, schemas are visible, can create/edit documents
- [ ] Verify: Site gracefully uses demo data when Sanity has no content

**Deliverable**: Working CMS at /studio. Owner can manage all non-product content.

---

## Phase 8: Shopify Integration
**Goal**: Real product data flows from Shopify

- [ ] Build Shopify Storefront API client with GraphQL
- [ ] Implement all product queries (all products, by handle, by collection, by vendor/tag)
- [ ] Implement cart mutations (create, add, update, remove)
- [ ] Wire ProductGrid, ProductDetail, FeaturedProducts to use Shopify client (with demo fallback)
- [ ] Wire CartContext to use Shopify cart API (with demo fallback)
- [ ] Checkout redirect to Shopify hosted checkout
- [ ] Test with USE_DEMO_DATA=false and placeholder credentials (should fail gracefully)
- [ ] Verify: When Shopify is connected, products load from API. When not, demo data shows.

**Deliverable**: Shopify integration complete, waiting for real credentials.

---

## Phase 9: Polish & Performance
**Goal**: Production-grade quality

- [ ] SEO: meta tags, Open Graph images, structured data (LocalBusiness schema) on every page
- [ ] Favicon and web manifest
- [ ] 404 page (styled, with navigation back)
- [ ] Loading states — skeleton screens for product grids and images
- [ ] Error boundaries for Shopify/Sanity API failures
- [ ] Image optimization audit — all images use next/image, proper sizes/formats
- [ ] Responsive audit — test every page at 375px, 768px, 1024px, 1440px
- [ ] Accessibility audit — keyboard nav, focus states, alt text, ARIA labels, color contrast
- [ ] Lighthouse run — target 90+ performance, 95+ accessibility, 95+ SEO
- [ ] Remove all console.logs, fix all TypeScript warnings
- [ ] Verify: `npm run build` succeeds with zero errors

**Deliverable**: Ship-ready website.

---

## Phase 10: Deployment & Handoff
**Goal**: Live site with documentation

- [ ] Deploy to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set up custom domain (when ready)
- [ ] Create SETUP.md with instructions for:
  - Creating Shopify store and generating Storefront API token
  - Creating Sanity project and deploying dataset
  - Setting up Formspree endpoint
  - Adding products in Shopify (tagging conventions, collections setup)
  - Using Sanity Studio to manage content
  - Deploying updates via Vercel
- [ ] Create a 1-page "Daily Operations" cheat sheet for the shop owner

**Deliverable**: Live site + documentation the owner can actually follow.
