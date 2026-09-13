# Publication statique de FSE

Ce repository publie un site HTML/CSS statique a partir d'un corpus versionne dans `src/`.
Le dossier `dist/` est l'artefact de publication genere par le build: c'est lui qui est exploitable tel quel, sans etape supplementaire, sur un hebergement statique.

## BREAKING CHANGE

La regeneration depuis Joomla (export MySQL + normalisation) est retiree de ce depot.
Les mises a jour de contenu passent desormais par la mise a jour des fichiers statiques de reference dans `src/`.

**Autre changement notable**: `src/` n'est plus directement servable sans build. Les pages sous `src/**/index.html` utilisent des directives EJS (`<%- include('/_partials/header') %>` / `<%- include('/_partials/footer') %>`) pour reutiliser le bandeau, la navigation principale et le pied de page communs, factorises dans `src/_partials/*.ejs`. `npm run build` est desormais obligatoire pour produire l'artefact final dans `dist/`.

## Source de verite

- Source d'authoring versionnee: `src/` (pages + partials communs sous `src/_partials/`)
- Sortie de publication (artefact deployable sans etape supplementaire): `dist/`
- Scripts actifs: `scripts/build-static.mjs`, `scripts/render-templates.mjs`, `scripts/serve-static.mjs`, `scripts/audit-build.mjs`, `scripts/check-redirects.mjs`, `scripts/compare-coverage.mjs`

## Mettre a jour une page

1. Editer le fichier de contenu sous `src/**/index.html` (le contenu specifique a la page uniquement; le bandeau/nav/pied de page viennent des partials).
2. Pour modifier le bandeau, la navigation principale ou le pied de page communs a toutes les pages, editer `src/_partials/header.ejs` ou `src/_partials/footer.ejs`.
3. Executer `npm run build` pour regenerer `dist/` avant toute publication ou verification.

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

- `src/`: source d'authoring (pages + partials communs sous `src/_partials/`)
- `dist/`: artefact de publication genere par `npm run build` (autonome, exploitable tel quel)
- `reports/`: rapports QA generes localement (artefacts JSON non versionnes)
- `openspec/`: specifications et suivi du changement

