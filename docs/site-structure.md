# Site Structure

This site is a static shell plus loadable page fragments.

## Shell

- `www/index.html` is the persistent shell.
- The shell owns the shared `nav`, `footer`, shared scripts, and `<main id="page-content">`.
- Keep shell edits limited to global navigation, shared assets, and app bootstrapping.

## Pages

- Loadable content lives under `www/pages/`.
- `www/pages/home.html` is the landing page.
- Service detail pages live under `www/pages/services/*.html`.
- Page fragments should contain only page content, not duplicated header, footer, or script tags.

## Routing

- `www/js/main.js` loads fragments into `#page-content`.
- `data-page="..."` links load a page fragment such as `services/clean-core`.
- `data-home-target="..."` links ensure the home page is loaded, then scroll to a section like `#services` or `#contact`.
- Hash format:
  - `#page/home` is optional and resolves to the landing page.
  - `#page/services/clean-core` loads that service page.
  - `#services` and similar anchors are meaningful on the home page.

## Services Data

- Home-page service cards are rendered from `www/js/data/services.js`.
- The service catalog defines icon, route, featured state, and i18n keys.
- If service-card content changes, prefer editing `www/js/data/services.js` and language files instead of `www/pages/home.html`.

## I18n

- Translations live in `www/js/lang/*.js`.
- Prefer changing copy in translation files instead of duplicating text edits across fragments.
- Use stable keys; avoid renaming keys unless the structure itself changes.
- For development, never insert text content into the HTML code - use a placeholder `<!--I18N_TEXT-->`

## AI Amendment Guidance

- For home-page service-card changes, open:
  - `www/js/data/services.js`
  - `www/js/lang/*.js`
  - optionally `www/css/style.css`
- For service detail changes, open only the relevant file in `www/pages/services/`.
- For global navigation or shell behavior, open:
  - `www/index.html`
  - `www/js/main.js`
  - optionally `www/css/style.css`
- Avoid loading the whole repo when a change is page-scoped.
