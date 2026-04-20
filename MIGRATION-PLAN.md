# Migration plan

1. Replace the current live `styles.css` with the new shared stylesheet in this package.
2. Upload the new `index.html` so the live homepage matches the approved prototype.
3. Upload `blender.html` from this package as the source template for all decision pages.
4. Replace `air-fryer.html`, `robot-vacuum.html`, and `electric-toothbrush.html` with the updated production versions in this package.
5. Keep `about.html` and `disclosure.html`, but use the updated versions here so navigation labels stay consistent.
6. Confirm that all referenced product images and the logo file exist in the same relative paths before publish.
7. In Cloudflare / GitHub, purge cache after deploy so CSS and image updates appear immediately.
8. After publish, test these breakpoints manually:
   - desktop wide
   - laptop
   - tablet
   - mobile
9. Then replace each `href="#"` affiliate placeholder with live retailer or Amazon links.

## Safe deployment order
- Commit all files in one GitHub commit.
- Publish.
- Purge cache.
- Smoke test homepage hero, category hero, CTA buttons, and footer links.


## Updated deployment order

1. Move or rename the image assets into `/assets/images/logos/` and `/assets/images/products/` using `ASSET-MANIFEST.md`.
2. Upload the updated HTML files and `styles.css`.
3. Push the whole package to GitHub.
4. Let Cloudflare deploy.
5. Purge Cloudflare cache.
6. Hard refresh and verify desktop + mobile.
