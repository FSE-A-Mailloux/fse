# Publication statique de FSE

Ce repository publie un site HTML/CSS statique a partir d'un corpus versionne dans `src/`.
Le dossier `dist/` est une sortie de publication reconstruite par copie depuis `src/`.

## BREAKING CHANGE

La regeneration depuis Joomla (export MySQL + normalisation) est retiree de ce depot.
Les mises a jour de contenu passent desormais par la mise a jour des fichiers statiques de reference dans `src/`.

## Source de verite

- Source statique versionnee: `src/`
- Sortie de publication: `dist/`
- Scripts actifs: `scripts/build-static.mjs`, `scripts/serve-static.mjs`, `scripts/audit-build.mjs`, `scripts/check-redirects.mjs`, `scripts/compare-coverage.mjs`

## Prerequis

- Node.js 20+
- Aucun acces Joomla/MySQL requis

## Commandes

```bash
npm install
npm run build
npm run check
```

Previsualiser localement (build + serveur):

```bash
npm run preview
```

Ou lancer uniquement le serveur local:

```bash
npm run serve
```

Puis ouvrir `http://127.0.0.1:8080`.

## Controles conserves

- `npm run check:seo`: verifie les balises SEO minimales sur les pages HTML publiees
- `npm run check:redirects`: verifie la validite des redirections statiques (`src/_redirects` -> `dist/_redirects`)
- `npm run check:coverage`: verifie la parite des URLs publiees entre `src/` et `dist/`
- `npm run check`: enchaine tous les controles apres build
- `npm run qa`: alias de `npm run check`

## Arborescence utile

- `src/`: corpus statique de reference
- `dist/`: sortie de publication reconstruite
- `reports/`: rapports QA generes localement (artefacts JSON non versionnes)
- `openspec/`: specifications et suivi du changement
