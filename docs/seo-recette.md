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

- `npm run check:seo`
- `npm run check:redirects`
- `npm run check:coverage`
- Rapports QA generes localement dans `reports/preprod-audit.json`, `reports/redirect-check.json` et `reports/coverage-compare.json`

