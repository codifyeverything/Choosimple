# Choosimple Eleventy Migration

This package keeps Choosimple as a static site, but moves repeated site sections into reusable Eleventy templates.

## What changed

- `src/_includes/header.njk` controls the sitewide header.
- `src/_includes/footer.njk` controls the sitewide footer.
- `src/_data/categories.js` controls category links, homepage category cards, and the homepage featured rotation.
- `affiliate-links.js` and `affiliate-loader.js` are still kept as normal root-level files.
- Affiliate scripts are included globally from `src/_includes/base.njk`, so new pages do not need separate script tags.

## Cloudflare Pages build settings

Build command:

```bash
npm run build
```

Build output directory:

```text
_site
```

## Adding a new category later

1. Create a new page in `src/`, for example `espresso-machine.njk`.
2. Add the category entry to `src/_data/categories.js`.
3. Add the product IDs to `affiliate-links.js`.
4. Add the product image file to the repo root.
5. Preview through Cloudflare branch preview before merging.
