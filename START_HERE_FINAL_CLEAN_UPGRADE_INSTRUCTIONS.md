# Choosimple Final Clean Homepage + Category Landing Upgrade

Use this package only. Ignore the earlier zip files from the troubleshooting attempts.

## What this package is

This is a changed-files-only upgrade package. It does not include package.json, package-lock.json, .node-version, .nvmrc, affiliate-links.js, affiliate-loader.js, images, or product pages.

That is intentional. Your existing working main branch should keep those files exactly as they are.

## Clean branch workflow

1. In GitHub, switch back to your working `main` branch.
2. Create a fresh branch from `main`.
   Suggested branch name: `homepage-category-upgrade-clean`.
3. Do not use the old branch that is several commits ahead.
4. Upload/replace only the files in this package.
5. Commit once.
6. Let Cloudflare deploy that clean branch.

## Files to replace or add

Replace these existing files:

- `.eleventy.js`
- `styles.css`
- `src/_data/site.js`
- `src/index.njk`
- `src/_includes/header.njk`
- `src/_includes/footer.njk`

Add these new files:

- `src/category-landing.njk`
- `src/all-decisions.njk`
- `src/sitemap.xml.njk`

Also included:

- `CHOOSIMPLE_SCALING_UPGRADE_SOP.md`

## Files not to touch

Do not change these during this clean install:

- `package.json`
- `package-lock.json`
- `.node-version`
- `.nvmrc`
- `affiliate-links.js`
- `affiliate-loader.js`
- `src/_data/categories.js`
- any individual product page
- product images

## Cloudflare settings

Use the settings that worked for your original Eleventy setup:

- Build command: `npm run build`
- Build output directory: `_site`
- Root directory: blank/default
- NODE_VERSION: keep whatever your working main used, or use `20.12.2` if that is now the stable value in your project settings.

Do not add `SKIP_DEPENDENCY_INSTALL` for this clean attempt.

## Why .eleventy.js must be included

The upgraded homepage uses Eleventy/Nunjucks filters such as:

- `limitItems`
- `latestItems`
- `groupItems`
- `groupCount`
- `featuredItems`

Those filters are defined in the included root-level `.eleventy.js` file. If you replace `src/index.njk` but do not replace `.eleventy.js`, the build will fail with an error like:

`filter not found: limitItems`

## Expected new pages

After successful deployment, these should exist:

- `/kitchen/`
- `/home-essentials/`
- `/personal-care/`
- `/all-decisions.html`
- `/sitemap.xml`

