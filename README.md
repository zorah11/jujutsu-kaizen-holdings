# Jujutsu Kaizen Holdings Limited website

A five-page static website for a diversified Ugandan company with a primary direction in tourism, travel and hospitality.

## Pages

- `dist/index.html` — Home
- `dist/about.html` — About Us
- `dist/travel.html` — Travel & Hospitality
- `dist/sectors.html` — Our Business Sectors
- `dist/contact.html` — Contact Us

## Run locally

Open `dist/index.html` directly in a browser, or serve the `dist` directory with any static web server. For example:

```powershell
npx serve dist
```

## Edit

- Shared visual styling is in `dist/assets/styles.css`.
- Shared menu, reveal and contact-form behavior is in `dist/assets/site.js`.
- The site uses exactly three generated images in `dist/assets/`.
- Each HTML page contains its own page copy and metadata.

## Contact form

The form validates input and opens an email draft addressed to the company's public email. A copy button remains available as a fallback.

## Deployment

The output is plain static HTML and can be hosted from `dist/`. For GitHub Pages, publish the contents of `dist` from a deployment branch or workflow. No hosting provider is configured.

## Client information still needed

- Confirmation of currently operational travel and hospitality services
- Confirmed destinations, packages, vehicles, accommodation or partnerships, if any
- Confirmation of which wider business sectors are active
- Approved logo or formal brand assets, if available
