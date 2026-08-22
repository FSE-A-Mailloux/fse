# Inventaire points d'entree 11ty

## Scripts npm

- `build` (appelait `eleventy`)
- `build:site` (appelait `eleventy`)
- `dev` (appelait `eleventy --serve`)

## Configuration

- `.eleventy.js`

## Templates et donnees 11ty

Ces artefacts faisaient partie de l'ancien dossier `site/` et ont ete retires du depot lors de la bascule vers `src/` comme source statique unique.

## Verification de l'inventaire

Cet inventaire est valide si:
1. `package.json` ne contient plus de scripts invoquant `eleventy`.
2. `package.json` ne contient plus `@11ty/eleventy`.
3. Le build statique est produit via `scripts/build-static.mjs`.

