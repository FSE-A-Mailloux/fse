## Why

Le site statique a deja ete genere depuis la base Joomla et valide comme sortie exploitable. Continuer a maintenir la chaine d'export/normalisation/build ajoute une complexite inutile et entretient des dependances techniques qui ne sont plus necessaires pour la publication.

## What Changes

- Basculer la source de verite du projet vers les fichiers statiques deja produits dans `dist/`, en les promouvant dans `src/`.
- Mettre a jour le flux de publication pour servir uniquement des artefacts statiques versionnes dans le depot, sans regeneration depuis Joomla.
- Supprimer les composants de pipeline devenus obsoletes pour la production des pages statiques (scripts de collecte/transformation et jeux de donnees intermediaires).
- Mettre a jour la documentation et les commandes de projet pour refleter un mode d'exploitation centré sur des fichiers statiques pre-rendus.
- **BREAKING**: retrait du mode de regeneration depuis la base Joomla dans ce depot; les mises a jour de contenu passent par la mise a jour des artefacts statiques de reference.

## Capabilities

### New Capabilities
- `static-site-source-freeze`: Encadrer la gestion d'un depot dont la publication depend uniquement d'artefacts statiques de reference.

### Modified Capabilities
- `static-site-publishing`: Le comportement de publication ne depend plus d'un pipeline d'extraction Joomla dans ce depot et se base sur un corpus statique versionne.

## Impact

- Codes affectes: `package.json`, `README.md`, `scripts/`, `data/`, `reports/`, `site/` et `src/`.
- Build/deploiement: simplification vers des etapes de copie/serving statique et verification de structure/fichiers publies.
- Compatibilite: changement de processus pour l'equipe (fin du workflow de regeneration locale depuis MySQL Joomla).
- Risques: perte de tracabilite de regeneration si les artefacts supprimes ne sont pas archives hors depot ou documentes avant nettoyage.

