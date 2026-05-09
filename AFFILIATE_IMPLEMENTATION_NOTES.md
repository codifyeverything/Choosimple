# Choosimple affiliate-ready update notes

Files in this folder keep the repo filenames unchanged..

What changed:
- Added `data-affiliate-id` to every existing affiliate placeholder link on the six category pages.
- Replaced generic CTA labels with Amazon-specific labels where the link is an outbound product CTA.
- Added `affiliate-links.js` as the central product-to-Geniuslink registry.
- Added `affiliate-loader.js` so populated registry URLs automatically activate all matching page links.
- Added `tools/apply-affiliate-links.js` for optional build-time href replacement once the Geniuslink URLs are filled in.
- Added `affiliate-links.js` and `affiliate-loader.js` script references to all HTML pages.
- Added a short Geniuslink routing note to `disclosure.html`.
- Left `styles.css` unchanged.

How to use:
1. Paste each Geniuslink URL into the matching `url` field in `affiliate-links.js`.
2. Commit/deploy the site. The loader will activate links at runtime.
3. Optional: run `node tools/apply-affiliate-links.js` before committing if you want the actual Geniuslink URLs written directly into the HTML.
