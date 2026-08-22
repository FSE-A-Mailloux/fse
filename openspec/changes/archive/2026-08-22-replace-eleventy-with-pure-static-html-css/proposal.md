## Why

La publication actuelle repose sur Eleventy, ce qui maintient une couche de generation supplementaire a operer et a maintenir. Nous voulons livrer un site purement statique HTML/CSS pour simplifier la chaine de publication et reduire les risques operationnels.

## What Changes

- Supprimer la dependance au generateur Eleventy dans le processus de build et de livraison.
- Produire et publier des pages HTML statiques et leurs assets CSS sans moteur de templates/runtime applicatif.
- Conserver les garanties de publication statique existantes (couverture des pages publiques, reproductibilite, controle des erreurs de cible non resolue).
- Mettre a jour les controles de build pour verifier la presence et la coherence des artefacts HTML/CSS publies.

## Capabilities

### New Capabilities
- Aucun.

### Modified Capabilities
- `static-site-publishing`: remplacer l'exigence implicite de generation via Eleventy par une exigence de livraison purement statique HTML/CSS, independante d'un SSG specifique.

## Impact

- Artefacts impactes: pipeline de build statique, templates/pages, gestion des assets CSS, scripts de verification.
- Dependances impactees: suppression des composants lies a Eleventy et de leur configuration associee.
- Risques a maitriser: preservation des URLs publiques, parite fonctionnelle des pages, maintien des controles de qualite existants.

