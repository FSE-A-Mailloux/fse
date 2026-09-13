## Context

Le site est un corpus HTML/CSS statique versionne dans `src/`, publie tel quel via `scripts/build-static.mjs` (copie recursive vers `dist/`, sans transformation). Cette architecture resulte du changement archive `2026-08-22-replace-eleventy-with-pure-static-html-css` (suppression d'Eleventy/Nunjucks) et de `2026-08-22-adopt-dist-as-source-prune-pipeline` (promotion de `dist/` vers `src/` comme source unique). Le spec `static-site-source-freeze` impose que `src/` soit "exploitable sans etape de compilation applicative".

Constat actuel: 21 pages dupliquent integralement le bandeau (`<header class="topbar">`), la navigation principale (`<nav class="subnav subnav-primary">`) et le pied de page (`<footer>` + script). Une correction recente (texte du bandeau) a du etre appliquee individuellement sur 21 fichiers, avec un risque d'incoherence deja materialise par le passe (orthographe "college" vs "collège").

Voir `proposal.md` pour la motivation produit.

## Goals / Non-Goals

**Goals:**
- Supprimer la duplication du bandeau, de la navigation principale et du pied de page entre les pages.
- Garder l'outillage minimal: un seul moteur de templating logique minimal (EJS), une seule dependance npm, aucune configuration additionnelle.
- Produire dans `dist/` des pages HTML strictement equivalentes (structure, contenu, attributs) a l'existant.
- Ameliorer la lisibilite du HTML source (indentation coherente sur 2 espaces).
- Faire echouer le build de maniere explicite si un partial reference est manquant, pour eviter une page cassee en production.

**Non-Goals:**
- Introduire un SSG complet (Eleventy, 11ty) ou un moteur de templating a forte empreinte (Handlebars avec helpers, moteurs necessitant une etape de compilation dediee).
- Modifier le contenu editorial, les URLs publiques, les redirections ou la strategie SEO.
- Gerer une logique conditionnelle riche (boucles, conditions complexes) dans les templates: seul un mecanisme d'inclusion simple est requis, meme si EJS le permettrait.

## Decisions

### Decision 1: moteur de templating EJS pour l'inclusion de partials
- Choix: chaque page source contient un marqueur `<%- include('_partials/<nom>') %>` a l'endroit ou le partial doit etre insere. Un script (`scripts/render-templates.mjs`) parcourt chaque fichier `.html` sous `src/` (hors `_partials/`), le rend avec `ejs.renderFile`, puis ecrit le resultat assemble dans `dist/`.
- Rationale: EJS est un moteur de templating largement repandu, sans configuration, avec une syntaxe d'inclusion native (`include`) qui gere deja la resolution de chemins relatifs et remonte une erreur explicite si un partial est introuvable; cela evite d'ecrire et de maintenir un mecanisme d'inclusion et de gestion d'erreurs maison.
- Alternatives considerees:
  - Script Node natif avec regex sur des marqueurs `<!-- include: ... -->`: ecarte au profit d'un moteur eprouve (EJS) a la demande explicite d'utiliser "un framework de templating le plus simple qui soit", ce qui reduit la dette de maintenance du mecanisme d'inclusion lui-meme.
  - Handlebars: ecarte, plus riche en fonctionnalites (helpers, partials enregistres) que le besoin strict d'inclusion de fragments.
  - Mustache: ecarte, les partials ne sont pas resolus automatiquement depuis le systeme de fichiers (necessite un chargeur maison), ce qui r'introduit la complexite qu'on cherche a eviter.
  - Utiliser un moteur existant plus lourd (Eleventy, 11ty complet): rejete, contredit la decision archivee de sortie d'Eleventy et le besoin de rester minimal.
  - Includes cote client en JavaScript (fetch/innerHTML au chargement): rejete, degrade le SEO/no-JS et le temps de rendu initial (deja partiellement utilise pour la sous-navigation, mais pas etendu au bandeau/pied de page structurants).
  - Server Side Includes (SSI, `.shtml`) dependant du serveur web cible: rejete, ajoute une dependance a la configuration d'hebergement.

### Decision 2: `src/` devient la source *authoring*, `dist/` devient l'unique artefact "exploitable sans compilation"
- Choix: amender `static-site-source-freeze` pour deplacer la garantie de "servable sans etape de compilation" de `src/` vers `dist/`. `src/` reste versionne, lisible, et demeure la reference editoriale, mais necessite desormais `npm run build` pour produire l'artefact final.
- Rationale: c'est le seul moyen de factoriser des blocs communs sans dupliquer du HTML statique pur; `dist/` remplit deja ce role d'artefact de publication dans le pipeline actuel.
- Alternatives considerees:
  - Garder `src/` integralement autonome et dupliquer les partials a la main a chaque modification: rejete, c'est le probleme que ce changement resout.
  - Dupliquer les partials automatiquement dans chaque fichier `src/**/index.html` via un script "sync" qui reecrit `src/` a partir des partials: rejete, complexifie sans necessite (le probleme resurgirait a la moindre modification manuelle non suivie d'une resynchronisation).

### Decision 3: partials limites au strict perimetre duplique
- Choix: seuls 2 partials sont crees sous `src/_partials/`: `header.ejs` (bandeau + nav principale + conteneur de sous-navigation) et `footer.ejs` (pied de page + script de navigation). Le `<head>` de chaque page (title/description/canonical/og) reste propre a chaque page et n'est pas factorise.
- Rationale: minimiser la surface du mecanisme de templating au strict besoin de deduplication identifie, meme si EJS permettrait d'aller plus loin (variables, boucles).
- Alternatives considerees:
  - Factoriser aussi le `<head>` avec des variables EJS (title, description passes en donnees au rendu): rejete pour cette iteration, la duplication du `<head>` n'est pas un probleme identifie (le contenu y est deja specifique par page); peut faire l'objet d'un changement ulterieur si le besoin se confirme.

## Risks / Trade-offs

- [Rupture du contrat "src/ servable sans build"] -> Mitigation: documenter clairement le changement BREAKING dans le README et le proposal; `npm run build` reste une commande unique et rapide (pas de dependance reseau, un seul package `ejs`).
- [Nouvelle dependance npm (`ejs`)] -> Mitigation: package stable, tres largement utilise, sans dependances transverses lourdes; verrouille via `package-lock.json`.
- [Divergence de rendu entre l'existant et les pages assemblees] -> Mitigation: comparer le HTML de `dist/` avant/apres sur l'ensemble des pages (diff structurel) avant de valider le changement.
- [Oubli de mise a jour d'un script qui lit directement `src/**/index.html` comme HTML final (ex: futurs audits)] -> Mitigation: verifier que `audit-build.mjs`, `check-redirects.mjs` et `compare-coverage.mjs` s'executent bien contre `dist/` (deja le cas actuellement) et non contre `src/`.
- [Marqueur d'inclusion mal forme ou partial manquant] -> Mitigation: EJS remonte nativement une erreur a la resolution d'un `include` introuvable; le script de rendu capture cette erreur et l'enrichit avec le chemin de la page source avant d'arreter le build (exit code non nul).

## Migration Plan

1. Ajouter la dependance npm `ejs` (`npm install ejs`).
2. Creer `src/_partials/header.ejs` et `src/_partials/footer.ejs` a partir du contenu strictement identique actuellement duplique.
3. Ecrire `scripts/render-templates.mjs`: rendu de chaque page via `ejs.renderFile`, capture et enrichissement des erreurs d'inclusion manquante, ecriture du HTML assemble et reformate (indentation lisible).
4. Remplacer, dans chacune des 21 pages sources, les blocs dupliques par les directives `<%- include('_partials/header') %>` / `<%- include('_partials/footer') %>`; reformater le reste du fichier en indentation 2 espaces lisible.
5. Integrer l'appel a `render-templates.mjs` dans `scripts/build-static.mjs`, avant/au lieu de la copie brute pour les fichiers `.html`.
6. Executer `npm run check` (build + audits + redirections + couverture) et comparer manuellement un echantillon de pages `dist/` avant/apres pour confirmer l'absence de regression visuelle/structurelle.
7. Mettre a jour `README.md` pour documenter le nouveau flux d'authoring (`src/` + partials EJS) et la necessite de `npm run build` avant publication.
