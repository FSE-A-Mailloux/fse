## Why

Le corpus statique versionne dans `src/` duplique integralement l'en-tete (bandeau, navigation principale), le conteneur de sous-navigation et le pied de page sur chacune des 21 pages du site. Toute evolution de ces blocs communs (ex: texte du bandeau, liens de navigation) impose de modifier chaque fichier HTML individuellement, ce qui est source d'erreurs et d'incoherences (deux orthographes de "college"/"collège" ont deja ete constatees). Nous voulons factoriser ces blocs communs dans des partials reutilisables et adopter une mise en forme HTML lisible, sans reintroduire de dependance a un CMS ou a un SSG complexe.

## What Changes

- Introduire le moteur de templating minimal EJS (une seule dependance npm legere, sans configuration) pour assembler des partials HTML partages (en-tete/bandeau, navigation principale, pied de page) avec le contenu propre a chaque page via `<%- include('...') %>`.
- Deplacer les blocs d'en-tete et de pied de page dupliques dans des fichiers partials dedies sous `src/_partials/`, non publies tels quels.
- Adapter `scripts/build-static.mjs` pour rendre chaque page avec EJS au moment du build et ecrire des fichiers HTML complets et autonomes dans `dist/`.
- Reformater l'ensemble des pages HTML sources avec une indentation lisible (2 espaces, une balise par ligne pour les blocs structurants).
- **BREAKING**: `src/` cesse d'etre directement servable sans etape de build; c'est desormais `dist/` qui constitue l'artefact statique autonome et deployable tel quel. Le build (`npm run build`) devient une etape obligatoire avant toute publication ou verification.

## Capabilities

### New Capabilities
- `static-site-templating`: Encadrer l'assemblage deterministe de pages HTML a partir de partials communs (en-tete, navigation, pied de page) et de contenus specifiques par page.

### Modified Capabilities
- `static-site-source-freeze`: `src/` devient la source de verite *authoring* (partials + contenu de page), et non plus directement l'artefact publie; la garantie de "servable sans compilation" est transferee a `dist/`.
- `static-site-publishing`: le pipeline de publication integre desormais une resolution de partials avant copie vers `dist/`, avec echec du build si un partial referenced est introuvable.

## Impact

- Code affecte: toutes les pages sous `src/**/index.html`, `scripts/build-static.mjs`, nouveaux fichiers `src/_partials/*.ejs`, `package.json` (nouvelle dependance).
- Outillage: une seule nouvelle dependance npm (`ejs`), moteur de templating logique minimal largement repandu, sans configuration additionnelle, conforme a la demande d'un framework "le plus simple possible".
- Controles qualite: `scripts/audit-build.mjs`, `scripts/check-redirects.mjs` et `scripts/compare-coverage.mjs` continuent de s'executer contre `dist/` (deja le cas), sans changement de contrat.
- Risques: necessite une verification manuelle que chaque page assemblee reste visuellement/structurellement identique a la version actuelle publiee (non-regression de rendu).
