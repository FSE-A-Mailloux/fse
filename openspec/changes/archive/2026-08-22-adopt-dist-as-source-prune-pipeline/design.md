## Context

Etat actuel: le depot contient encore la chaine complete de migration (`scripts/`, `data/`, rapports QA) qui a servi a produire un corpus statique dans `dist/`. Le dossier `src/` est vide alors que l'objectif operationnel est de publier uniquement des fichiers statiques de reference.

Contraintes:
- Conserver la parite SEO/fonctionnelle deja atteinte par le corpus genere.
- Eviter toute regression de routes publiques (`index`, sections de contenu, `_redirects`, `sitemap.xml`, `robots.txt`).
- Rendre le depot maintenable sans acces Joomla ni base MySQL.

Voir `proposal.md` pour la motivation metier.

## Goals / Non-Goals

**Goals:**
- Promouvoir le contenu valide de `dist/` vers `src/` comme source de verite versionnee.
- Simplifier la chaine de build pour ne conserver qu'un flux de publication statique (copie/verification/serve).
- Retirer du flux actif les scripts et donnees intermediaires qui ne sont plus requis par la publication.
- Mettre a jour la documentation et les commandes npm pour refleter le nouveau mode de fonctionnement.

**Non-Goals:**
- Regenerer le contenu depuis Joomla dans ce changement.
- Re-designer les pages, modifier le contenu editorial ou changer la strategie SEO au-dela de la preservation de l'existant.
- Introduire un nouveau SSG, framework frontend ou pipeline CI complexe.

## Decisions

### Decision 1: `src/` devient l'unique entree publiee
- Choix: copier la structure de `dist/` vers `src/` et faire pointer le processus de publication vers `src/`.
- Rationale: aligne le depot avec la realite de production (artefacts pre-rendus), diminue les dependances techniques, facilite la revue de changements de contenu.
- Alternatives considerees:
  - Conserver `dist/` comme sortie build: rejete car perpetue la confusion source/sortie.
  - Introduire un script de synchronisation bidirectionnelle `src`/`dist`: rejete car ajoute une complexite sans valeur produit.

### Decision 2: declasser le pipeline Joomla au lieu de le maintenir en mode dormant
- Choix: supprimer du flux standard les scripts/commandes de migration et les donnees intermediaires associees.
- Rationale: reduit la dette de maintenance et le risque d'usage accidental d'un workflow obsolete.
- Alternatives considerees:
  - Garder les scripts mais non documentes: rejete car ambigu pour les contributeurs.
  - Archiver dans ce meme depot sous un dossier legacy: rejete car gonfle l'historique actif; le versioning Git sert deja d'archive.

### Decision 3: conserver des verifications minimales de publication statique
- Choix: maintenir uniquement des controles lies au resultat statique (presence des pages attendues, coherence de redirections/SEO), sans etapes d'export Joomla.
- Rationale: protege contre les regressions visibles tout en respectant la simplification.
- Alternatives considerees:
  - Supprimer tous les controles: rejete pour risque de regressions silencieuses.

## Risks / Trade-offs

- [Perte de capacite de regeneration depuis Joomla] -> Mitigation: documenter explicitement le changement BREAKING et la source de verite statique.
- [Suppression d'artefacts utiles au diagnostic historique] -> Mitigation: s'appuyer sur l'historique Git et ajouter une note de migration dans la documentation.
- [Regression de couverture d'URLs lors de la bascule `dist` -> `src`] -> Mitigation: executer des checks de structure/URLs avant validation finale.

## Migration Plan

1. Copier le corpus de `dist/` vers `src/` en preservant l'arborescence et les fichiers SEO (`sitemap.xml`, `robots.txt`, `_redirects`).
2. Adapter les scripts npm/build pour publier depuis `src/`.
3. Supprimer les scripts et donnees du pipeline Joomla devenus hors perimetre du flux standard.
4. Mettre a jour `README.md` et toute documentation operationnelle.
5. Lancer les controles statiques conserves et valider qu'aucune route publique attendue ne manque.
6. Plan de rollback: restaurer les fichiers/commandes retires via revert Git du commit de bascule.

