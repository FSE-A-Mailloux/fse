# Inventaire points d'entree 11ty

## Scripts npm

- `build` (appelait `eleventy`)
- `build:site` (appelait `eleventy`)
- `dev` (appelait `eleventy --serve`)

## Configuration

- `.eleventy.js`

## Templates et donnees 11ty

- `site/index.njk`
- `site/pages.njk`
- `site/redirects.njk`
- `site/sitemap.njk`
- `site/robots.njk`
- `site/_includes/layouts/base.njk`
- `site/_data/pages.js`
- `site/_data/redirects.js`
- `site/_data/site.js`

## Verification de l'inventaire

Cet inventaire est valide si:
1. `package.json` ne contient plus de scripts invoquant `eleventy`.
2. `package.json` ne contient plus `@11ty/eleventy`.
3. Le build statique est produit via `scripts/build-static.mjs`.

