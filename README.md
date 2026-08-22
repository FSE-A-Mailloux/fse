# Migration Joomla -> HTML/CSS statique

Ce repository contient une implementation de migration vers un site purement statique HTML/CSS, avec:
- extraction MySQL Joomla,
- normalisation de contenu,
- generation de pages statiques,
- artefacts SEO (`sitemap.xml`, `robots.txt`) et table `_redirects`,
- audits automatiques de pre-production.

## Prerequis

- Node.js 20+
- Acces MySQL (par defaut `127.0.0.1:3399`, base `fsecoopeidam`, `root/root`)

Variables optionnelles:
- `JOOMLA_DB_HOST`
- `JOOMLA_DB_PORT`
- `JOOMLA_DB_USER`
- `JOOMLA_DB_PASSWORD`
- `JOOMLA_DB_NAME`
- `SITE_BASE_URL` (ex: `https://fse.example.org`)

## Commandes

```bash
npm install
npm run export
npm run normalize
npm run build:site
```

Premier passage de migration (capture baseline 11ty pour les controles de parite/couverture):

```bash
npm run baseline:capture
```

Pipeline complet + controles:

```bash
npm run qa
```

Demarrer un serveur local pour ouvrir le site dans le navigateur:

```bash
npm run build
npm run serve
```

Puis ouvrir `http://127.0.0.1:8080`.

Verification determinisme export:

```bash
npm run export:verify
```

## Sorties

- Donnees brutes: `data/raw/*.json`
- Donnees normalisees: `data/normalized/*.json`
- Rapports: `reports/*.json`
- Site genere: `dist/`

## Notes migration hors 11ty

- Inventaire des points d'entree historiques: `docs/eleventy-inventory.md`
- Rendu statique direct: `scripts/build-static.mjs`
- Controle parite structure HTML: `scripts/check-html-parity.mjs`
- Controle couverture URL: `scripts/compare-coverage.mjs`

