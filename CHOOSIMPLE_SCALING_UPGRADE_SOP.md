# Choosimple Scaling Upgrade SOP

## What this upgrade adds

This update converts Choosimple from a homepage that tries to show every product into a scalable decision-library structure.

It adds:

- A premium curated homepage
- Automatic parent category landing pages
- A full human-readable product index at `/all-decisions.html`
- An XML sitemap at `/sitemap.xml`
- Cleaner header navigation
- Cleaner footer navigation
- A parent-category data system that can support future areas like Software, Electronics, Outdoor, Baby & Kids, etc.

The affiliate system is intentionally left intact.

---

## Files changed

### Updated files

```text
src/_data/site.js
.eleventy.js
src/index.njk
src/_includes/header.njk
src/_includes/footer.njk
styles.css
```

### New files

```text
src/category-landing.njk
src/all-decisions.njk
src/sitemap.xml.njk
CHOOSIMPLE_SCALING_UPGRADE_SOP.md
```

### Files intentionally not changed

```text
src/_data/categories.js
affiliate-links.js
affiliate-loader.js
src/_includes/base.njk
src/_includes/head.njk
src/_includes/category-card.njk
individual product pages
```

Reason: the goal is to improve the site architecture without disrupting your working page-production and affiliate-link systems.

---

## New site structure

### Homepage

File:

```text
src/index.njk
```

The homepage is now curated. It shows:

1. Hero section
2. Featured decision rotator
3. Parent decision-area cards
4. Latest decisions
5. How Choosimple decides
6. Email signup

The homepage no longer needs to show every product category.

---

### Parent category landing pages

File:

```text
src/category-landing.njk
```

This is the new category template.

It automatically generates one page for every parent category listed in:

```text
src/_data/site.js
```

Current generated pages:

```text
/kitchen/
/home-essentials/
/personal-care/
```

You do not need to create separate `kitchen.njk`, `home-essentials.njk`, or `personal-care.njk` files. Eleventy generates those pages from the one reusable template.

This is the scalable part.

---

### All Decisions page

File:

```text
src/all-decisions.njk
```

Generated URL:

```text
/all-decisions.html
```

This page lists every product decision grouped by parent category.

It is useful for:

- users
- internal linking
- SEO crawlability
- LLM extractability
- future site scale

---

### XML sitemap

File:

```text
src/sitemap.xml.njk
```

Generated URL:

```text
/sitemap.xml
```

This includes:

- homepage
- all parent category pages
- all product pages
- all-decisions page
- about/disclosure/privacy/contact

After deploying, submit this URL in Google Search Console:

```text
https://choosimple.com/sitemap.xml
```

---

## How the new data system works

### Parent categories live in `site.js`

File:

```text
src/_data/site.js
```

Each parent category now has this structure:

```js
{
  title: "Kitchen",
  slug: "kitchen",
  url: "/kitchen/",
  description: "Simple, reliable decisions for everyday kitchen products — from prep tools to countertop appliances.",
  shortDescription: "Countertop appliances, prep tools, and kitchen upgrades that are easy to overthink.",
  eyebrow: "Everyday kitchen decisions"
}
```

This controls:

- homepage decision-area cards
- header dropdown parent groups
- footer decision-area links
- parent category landing pages
- XML sitemap parent category URLs

---

### Product categories still live in `categories.js`

File:

```text
src/_data/categories.js
```

Each product page still has a category entry like this:

```js
{
  title: "Blender",
  slug: "blender",
  url: "/blender.html",
  group: "Kitchen",
  cardTitle: "The blender that makes the most sense",
  decision: "Vitamix 5200",
  image: "/Vitamix_5200.png",
  imageAlt: "Vitamix 5200",
  summary: "...",
  proof: "...",
  price: "Typical price: $350–$480",
  featured: true,
  featuredSub: "Kitchen · Typical price: $350–$480",
  featuredQuote: "...",
  featuredProof: "..."
}
```

The key field is:

```js
group: "Kitchen"
```

That field automatically determines which parent category landing page the product appears on.

---

## Updated filters in `.eleventy.js`

This update adds/keeps filters that make the system data-driven:

```text
groupItems
```

Returns all products in a parent category.

```text
groupCount
```

Counts products in a parent category.

```text
featuredItems
```

Returns products marked `featured: true`.

```text
latestItems
```

Returns the newest products based on their order in `categories.js`. Add new product entries near the bottom of `categories.js` so they appear in Latest Decisions.

```text
limitItems
```

Limits preview lists to a set number.

```text
groupMeta
```

Returns parent category metadata from `site.categoryGroups`.

---

## Standard operating procedure: adding a new product category

Use this workflow for category #16, #17, #25, #50, etc.

### Step 1 — Create the product page

Add the new product page:

```text
src/new-product.njk
```

Example:

```text
src/stand-mixer.njk
```

Use the same product-page template system you already use.

---

### Step 2 — Add the product to `categories.js`

Add a new object near the bottom of:

```text
src/_data/categories.js
```

Example:

```js
{
  title: "Stand Mixer",
  slug: "stand-mixer",
  url: "/stand-mixer.html",
  group: "Kitchen",
  cardTitle: "The stand mixer that makes the most sense",
  decision: "KitchenAid Artisan Series 5-Quart",
  image: "/kitchenaid-artisan.png",
  imageAlt: "KitchenAid Artisan Series 5-Quart stand mixer",
  summary: "The best stand mixer for most people: proven reliability, broad attachment support, and enough power for normal home baking.",
  proof: "balances durability, usability, attachment ecosystem, and long-term ownership better than cheaper or oversized alternatives.",
  price: "Typical price: $350–$450",
  featured: true,
  featuredSub: "Kitchen · Typical price: $350–$450",
  featuredQuote: "“The best stand mixer for most people: KitchenAid Artisan Series 5-Quart — proven, practical, and easier to defend than cheaper or oversized alternatives.”",
  featuredProof: "<strong>Why it wins:</strong> durable ownership patterns, broad attachment support, and practical capacity for most home bakers."
}
```

Important: the `group` value must exactly match a parent category title in `site.js`.

Good:

```js
group: "Kitchen"
```

Bad:

```js
group: "kitchen"
group: "Kitchen Appliances"
group: "Home"
```

---

### Step 3 — Add the image

Add the product image to the repo root unless you intentionally change your image system.

Example:

```text
/kitchenaid-artisan.png
```

Then make sure the image path in `categories.js` matches exactly:

```js
image: "/kitchenaid-artisan.png"
```

---

### Step 4 — Add affiliate IDs

Update:

```text
affiliate-links.js
```

Every `data-affiliate-id` used on the product page should exist in `affiliate-links.js`.

Keep the URL blank until you have Amazon/Geniuslink ready:

```js
"kitchenaid-artisan-5-quart": {
  "name": "KitchenAid Artisan Series 5-Quart",
  "url": "",
  "merchant": "Amazon",
  "notes": "Paste the Geniuslink URL for this product here after Amazon Associates/Geniuslink setup."
}
```

Do not change `affiliate-loader.js` for normal page production.

---

### Step 5 — Build locally or via Cloudflare

Run:

```bash
npm run build
```

Confirm the build succeeds.

Expected outcome:

- new product page generated
- homepage Latest Decisions updates automatically
- parent landing page updates automatically
- header dropdown updates automatically
- footer count updates automatically
- `/all-decisions.html` updates automatically
- `/sitemap.xml` updates automatically

---

## Standard operating procedure: adding a new parent category later

Use this only when you create a new decision area such as Software, Electronics, Outdoor, Baby & Kids, etc.

### Step 1 — Add the parent category to `site.js`

File:

```text
src/_data/site.js
```

Example:

```js
{
  title: "Software",
  slug: "software",
  url: "/software/",
  description: "Simple software decisions for everyday buyers, families, and small teams.",
  shortDescription: "Software picks where trust, usability, privacy, and long-term value matter.",
  eyebrow: "Simple software decisions"
}
```

---

### Step 2 — Add product pages with the matching group

In `categories.js`, products under this parent category must use:

```js
group: "Software"
```

Example:

```js
{
  title: "Password Manager",
  slug: "password-manager",
  url: "/password-manager.html",
  group: "Software",
  ...
}
```

---

### Step 3 — Build

Run:

```bash
npm run build
```

Eleventy will automatically generate:

```text
/software/
```

You do not need to create a new `software.njk` file.

---

## Homepage controls

In `src/_data/site.js`, these values control homepage display limits:

```js
homepage: {
  featuredLimit: 8,
  categoryPreviewLimit: 4,
  latestLimit: 6
}
```

### `featuredLimit`

Controls how many products appear in the featured decision rotator.

### `categoryPreviewLimit`

Controls how many product names appear inside each parent category card on the homepage.

### `latestLimit`

Controls how many cards appear in the Latest Decisions section.

This means you can scale to 30, 50, or 100+ product pages without redesigning the homepage.

---

## Affiliate system notes

The affiliate system remains unchanged.

Current model:

1. Product pages include links with `data-affiliate-id`.
2. `affiliate-loader.js` reads those IDs.
3. `affiliate-links.js` provides the final URL when available.
4. Blank URLs safely keep placeholders inactive.

Normal production should only require updating:

```text
affiliate-links.js
```

Do not touch:

```text
affiliate-loader.js
```

unless the affiliate-link logic itself changes.

---

## Deployment checklist

Before deploying:

1. Run `npm run build`.
2. Confirm there are no Eleventy errors.
3. Check homepage:
   - `/index.html`
4. Check parent category pages:
   - `/kitchen/`
   - `/home-essentials/`
   - `/personal-care/`
5. Check full index:
   - `/all-decisions.html`
6. Check sitemap:
   - `/sitemap.xml`
7. Check one product page from each parent category.
8. Confirm header dropdown works on desktop and mobile.
9. Confirm footer links work.
10. Deploy to Cloudflare Pages.
11. Check `.pages.dev` preview first.
12. Purge Cloudflare cache if `choosimple.com` does not update immediately.

---

## Quick file map

### Product source of truth

```text
src/_data/categories.js
```

### Parent category source of truth

```text
src/_data/site.js
```

### Product card template

```text
src/_includes/category-card.njk
```

### Parent category page template

```text
src/category-landing.njk
```

### Homepage

```text
src/index.njk
```

### Header

```text
src/_includes/header.njk
```

### Footer

```text
src/_includes/footer.njk
```

### Human-readable product index

```text
src/all-decisions.njk
```

### XML sitemap

```text
src/sitemap.xml.njk
```

### Global styles

```text
styles.css
```

### Affiliate registry

```text
affiliate-links.js
```

### Affiliate runtime loader

```text
affiliate-loader.js
```

---

## Important principle going forward

Do not let the homepage become the catalogue again.

The homepage should stay premium and curated.

The full catalogue should live in:

```text
/all-decisions.html
```

The parent category lists should live in:

```text
/kitchen/
/home-essentials/
/personal-care/
```

This gives Choosimple room to scale without making the site feel crowded.
