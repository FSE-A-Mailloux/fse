# Migration Joomla -> Eleventy (statique)

Ce repository contient une implementation de migration vers un site statique Eleventy, avec:
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

Pipeline complet + controles:

```bash
npm run qa
```

Verification determinisme export:

```bash
npm run export:verify
```

## Sorties

- Donnees brutes: `data/raw/*.json`
- Donnees normalisees: `data/normalized/*.json`
- Rapports: `reports/*.json`
- Site genere: `dist/`

