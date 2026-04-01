# Artisans On Main -- Setup Guide

This guide covers everything needed to set up, configure, and deploy the Artisans On Main website. It is written for both the developer maintaining the codebase and the shop owner who may need to understand the high-level pieces.

---

## 1. Overview

Artisans On Main is a headless e-commerce website for an art consignment gallery located in Weaverville, NC. The site showcases artists and their work, allows customers to browse and purchase art online, and provides the shop owner with a content management system to update announcements, artist profiles, and page content.

**Tech stack:**

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (React 19) |
| Styling | Tailwind CSS 4 |
| E-commerce | Shopify Storefront API (headless -- no Shopify theme, just the data) |
| CMS | Sanity.io v3 (v5 SDK) with embedded Studio |
| Contact form | Formspree |
| Hosting | Vercel |

The site ships with built-in demo data so it can run without any external services connected. When you are ready to go live, you flip a single flag and point it at your real Shopify store and Sanity project.

---

## 2. Prerequisites

- **Node.js 18+** -- Download from https://nodejs.org
- **npm** -- Comes with Node.js
- **Git** -- Download from https://git-scm.com

You will also need accounts on the following services (all have free tiers):

| Service | Purpose | Sign up |
|---|---|---|
| Shopify | Product catalog, checkout, and payments | https://shopify.com |
| Sanity.io | Content management (artists, announcements, pages) | https://sanity.io |
| Vercel | Hosting and deployment | https://vercel.com |
| Formspree | Contact form submissions | https://formspree.io |

---

## 3. Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/smeinzer/ArtisansMain.git
cd ArtisansMain

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.local.example .env.local

# 4. (Optional) Fill in your environment variables -- see Section 4 below.
#    The site works out of the box with demo data, so this step is not
#    required to get started.

# 5. Start the dev server
npm run dev
```

Visit **http://localhost:3000** in your browser. You should see the site running with demo data.

Other useful commands:

| Command | What it does |
|---|---|
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## 4. Environment Variables

Open `.env.local` and fill in the values below. Each variable is explained in detail.

```
# Shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=y3eiyxtt
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token_here

# Formspree
NEXT_PUBLIC_FORMSPREE_ID=your_form_id

# Demo Mode
NEXT_PUBLIC_USE_DEMO_DATA=true
```

### Variable reference

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Your Shopify store's `.myshopify.com` domain. Find it in the Shopify admin URL (e.g., `artisans-on-main.myshopify.com`). |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | The Storefront API access token. See Section 5 for how to create this. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID. The current project ID is `y3eiyxtt`. Find yours at https://sanity.io/manage. |
| `NEXT_PUBLIC_SANITY_DATASET` | The Sanity dataset name. This is almost always `production`. |
| `SANITY_API_TOKEN` | A Sanity API token with read permissions. Create one at sanity.io/manage under your project's API settings. This token is used for server-side data fetching and is not exposed to the browser. |
| `NEXT_PUBLIC_FORMSPREE_ID` | Your Formspree form ID. Create a form at https://formspree.io, then copy the form ID from the dashboard (it looks like `xabcdefg`). |
| `NEXT_PUBLIC_USE_DEMO_DATA` | Set to `true` to use built-in demo data. Set to `false` to fetch real data from Shopify and Sanity. Defaults to `true` if not set. |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. This is expected and safe for the Shopify Storefront token (it is a public, read-only token) and for the Sanity project ID. The `SANITY_API_TOKEN` does NOT have this prefix and stays server-side.

---

## 5. Shopify Setup

This section walks through setting up Shopify as the product backend. If you already have a Shopify store with products, skip to step 2.

### Step 1 -- Create a Shopify store

Sign up at https://shopify.com. You can start with a free trial. You do not need to pick a Shopify theme since this website acts as the storefront.

### Step 2 -- Create a custom app for the Storefront API

1. In the Shopify admin, go to **Settings > Apps and sales channels**.
2. Click **Develop apps** (you may need to enable developer access first).
3. Click **Create an app** and name it something like "Artisans On Main Website".
4. Under **Configuration**, click **Configure Storefront API scopes** and enable these scopes:
   - `unauthenticated_read_products`
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
5. Click **Save**, then click **Install app**.
6. Go to the **API credentials** tab and copy the **Storefront API access token**.
7. Paste it into your `.env.local` as `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

### Step 3 -- Add products

When adding products in Shopify, the following fields are used by the website:

| Shopify field | How it appears on the site |
|---|---|
| **Title** | Product name |
| **Description** | Product detail page description |
| **Images** | Product gallery |
| **Price** | Displayed price and used at checkout |
| **Vendor** | Maps to the **artist name**. Set this to the artist who created the piece. |
| **Product type** | Maps to the **category** (e.g., "Painting", "Pottery", "Jewelry"). Used for filtering. |

**Important:** The **Vendor** field is how the website links products to artists. Make sure the vendor name in Shopify matches the `shopifyVendorTag` field on the corresponding Artist document in Sanity.

---

## 6. Sanity CMS Setup

Sanity is used for managing non-product content: artist profiles, announcements, site settings, homepage configuration, and custom pages.

### Accessing the Studio

The Sanity Studio is embedded directly in the website. Access it at:

- **Local:** http://localhost:3000/studio
- **Production:** https://your-production-url.com/studio

You will need to log in with your Sanity account.

### Project details

- **Project ID:** `y3eiyxtt`
- **Dataset:** `production`
- **Manage your project:** https://sanity.io/manage

### CORS origins

For the Studio to work, your domains must be added as allowed CORS origins:

1. Go to https://sanity.io/manage and select your project.
2. Navigate to **API > CORS origins**.
3. Add the following origins (with **Allow credentials** checked):
   - `http://localhost:3000` (for local development)
   - Your production URL (e.g., `https://artisansonmain.com`)
   - Your Vercel preview URL (e.g., `https://artisans-main.vercel.app`)

### Content types

| Content type | Purpose |
|---|---|
| **Site Settings** | Business name, tagline, phone, email, address, hours of operation, social media links, and logo. This is a singleton -- there should be only one document. |
| **Artist** | Artist profiles with name, slug, headshot, bio (rich text), Shopify vendor tag (links them to their products), website URL, and Instagram handle. |
| **Announcement** | Time-limited banners or notices. Each has a title, rich text body, start/end dates, and an active toggle. |
| **Homepage Config** | Controls the hero section: hero image, headline, subline, and a featured Shopify collection handle. |
| **Page** | Generic content pages with a title, slug, and rich text body (supports embedded images). Use this for About, FAQ, or any custom page. |

### Linking artists to products

Each Artist document in Sanity has a **Shopify Vendor Tag** field. This value must exactly match the **Vendor** field on the corresponding products in Shopify. This is how the site knows which products belong to which artist.

---

## 7. Deployment (Vercel)

The site is deployed on Vercel.

### Manual deployment

```bash
# Install the Vercel CLI (one-time)
npm install -g vercel

# Deploy to production
vercel --prod
```

### Automatic deployment via GitHub

To deploy automatically whenever you push to `main`:

1. Go to https://vercel.com and click **Add New Project**.
2. Import the `smeinzer/ArtisansMain` GitHub repository.
3. Vercel will detect it as a Next.js project and configure the build settings automatically.
4. Add your environment variables (see below).
5. Deploy. From now on, every push to `main` triggers a production deployment, and pull requests get preview deployments.

### Environment variables in Vercel

Go to your project in the Vercel dashboard, then **Settings > Environment Variables**, and add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Your Storefront API token |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `y3eiyxtt` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | Your Sanity API read token |
| `NEXT_PUBLIC_FORMSPREE_ID` | Your Formspree form ID |
| `NEXT_PUBLIC_USE_DEMO_DATA` | `false` (for production) |

Make sure each variable is enabled for the **Production** environment. You can also enable them for **Preview** and **Development** if desired.

---

## 8. Going Live Checklist

Use this checklist when transitioning from demo mode to a live site.

- [ ] Set up a Shopify store and add products (with correct Vendor and Product Type fields)
- [ ] Create a Storefront API custom app and copy the access token
- [ ] Create Artist profiles in Sanity with matching Shopify Vendor Tags
- [ ] Fill in Site Settings in Sanity (business name, address, hours, etc.)
- [ ] Configure Homepage Config in Sanity (hero image, headline, featured collection)
- [ ] Set `NEXT_PUBLIC_USE_DEMO_DATA` to `false` in Vercel environment variables
- [ ] Add all other environment variables in the Vercel dashboard
- [ ] Add the production URL to Sanity CORS origins (with credentials allowed)
- [ ] Create a Formspree form and add the form ID to environment variables
- [ ] Set up a custom domain in Vercel (Settings > Domains) -- optional
- [ ] Add an Open Graph image at `public/og-image.jpg` (1200x630 pixels recommended)
- [ ] Test all pages on the production URL
- [ ] Test the checkout flow end to end (add to cart, checkout, payment)
- [ ] Verify the contact form submits correctly

---

## 9. Switching from Demo to Live Data

The site includes a demo mode controlled by the `NEXT_PUBLIC_USE_DEMO_DATA` environment variable. When this is set to `true` (or left unset), the site displays built-in sample data instead of fetching from Shopify and Sanity. This lets you run the site without any external accounts.

### How to transition

1. **Set up Shopify products.** Add your real products in Shopify. Make sure each product has a title, description, at least one image, a price, a vendor (artist name), and a product type (category).

2. **Set up Sanity content.** Log in to the Sanity Studio and create:
   - A **Site Settings** document with your business info.
   - **Artist** documents for each artist, with the `shopifyVendorTag` matching the Vendor field in Shopify.
   - Any **Announcements** you want to display.
   - A **Homepage Config** document with your hero image and featured collection.

3. **Change the flag.** Set `NEXT_PUBLIC_USE_DEMO_DATA` to `false` in your `.env.local` (for local) and in your Vercel environment variables (for production).

4. **Redeploy.** If you are using automatic GitHub deployments, push a commit. If you are using the CLI, run `vercel --prod`. The site will now pull real data from Shopify and Sanity.

### Rolling back to demo mode

If something goes wrong, set `NEXT_PUBLIC_USE_DEMO_DATA` back to `true` and redeploy. The site will immediately revert to showing demo data.

---

## Questions or Issues

If something is not working as expected:

1. **Check the browser console** (F12 > Console) for error messages.
2. **Check the Vercel function logs** (Vercel dashboard > Deployments > select a deployment > Functions) for server-side errors.
3. **Verify environment variables** are set correctly -- a missing or mistyped token is the most common issue.
4. **Check Sanity CORS origins** -- if the Studio will not load, your domain is probably not listed.
