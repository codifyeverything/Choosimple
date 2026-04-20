# Choosimple production architecture

## Recommended file architecture

```text
/
├── index.html
├── about.html
├── disclosure.html
├── blender.html
├── air-fryer.html
├── robot-vacuum.html
├── electric-toothbrush.html
├── category-template.html
├── styles.css
├── assets/
│   ├── TRANSPARENT_Logo.png
│   └── product-images...
└── README-architecture.md
```

## Why this structure
- One shared `styles.css` for the full site.
- One flat set of HTML entry files that maps cleanly to GitHub Pages / Cloudflare static hosting.
- One reusable `category-template.html` that matches the approved Blender production structure.
- Assets separated from page files so content edits do not require CSS or HTML path changes later.

## Notes
- The approved homepage rotator script stays inline in `index.html` because it is page-specific behavior, not styling.
- Category pages should stay structurally consistent with `category-template.html`.
- Affiliate links remain placeholder `#` values until you swap in live URLs.


## Final production asset layout

```text
/
  index.html
  blender.html
  air-fryer.html
  robot-vacuum.html
  electric-toothbrush.html
  about.html
  disclosure.html
  category-template.html
  styles.css
  /assets
    /images
      /logos
        choosimple-logo.png
      /products
        blender-breville-bbl620.png
        robot-vacuum-roborock-qrevo-curv.png
        air-fryer-instant-vortex-plus-6qt.png
        electric-toothbrush-philips-sonicare-4100.png
```

See `ASSET-MANIFEST.md` for the exact old-to-new image filename mapping.
