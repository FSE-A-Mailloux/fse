# Criteres SEO de recette

Ce lot ne depend pas d'analytics/search console.

## Criteres obligatoires

- `title` present sur chaque page HTML
- `meta description` presente sur chaque page indexable
- `canonical` present et coherent
- `og:title` et `og:description` presents
- `sitemap.xml` genere avec URLs indexables uniquement
- `robots.txt` genere
- `_redirects` present avec mappings 301

## Verification automatique

- `npm run audit`
- `npm run check:redirects`
- Rapport consolide dans `reports/preprod-audit.json` et `reports/redirect-check.json`

