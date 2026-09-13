## Context

Le site est un corpus statique versionné sous `src/`, rendu avec des partials EJS communs puis contrôlé par les scripts de build et d'audit du dépôt. La demande porte sur une correction éditoriale transversale : les accents et la qualité du français doivent être rétablis dans les textes visibles sans fragiliser les liens, les routes ou les mécanismes de publication.

## Goals / Non-Goals

### Goals

- Établir un inventaire des textes visibles dans les pages HTML et les partials sous `src/`.
- Corriger les fautes d'orthographe, de grammaire, d'accord et de typographie française, avec une attention particulière aux accents manquants.
- Traiter d'abord les contenus partagés afin que la correction soit propagée à toutes les pages qui les utilisent.
- Conserver un encodage UTF-8 cohérent dans les sources et les sorties générées.
- Vérifier la propagation par un build complet et les contrôles de qualité existants.

### Non-Goals

- Modifier la structure des URLs, les slugs ou les noms de fichiers.
- Réécrire le positionnement éditorial, le contenu métier ou le ton du site au-delà des corrections linguistiques nécessaires.
- Corriger les données techniques, les identifiants, les chemins ou les valeurs structurées qui ne sont pas du texte visible.
- Ajouter une dépendance de correction automatique ou remplacer la relecture humaine par une simple règle de recherche.

## Proposed Design

1. Constituer une liste des fichiers éditoriaux sous `src/`, en distinguant les pages, les partials et les zones techniques exclues.
2. Relire les éléments communs dans `src/_partials/` et les contenus de page dans un ordre stable, en corrigeant directement les sources.
3. Utiliser des recherches ciblées pour repérer les mots sans accents, les apostrophes ASCII inadaptées, les doublons de libellés et les formulations incohérentes. Chaque résultat est confirmé selon son contexte avant modification.
4. Construire le site avec le pipeline existant, puis contrôler que les caractères accentués sont correctement présents dans les sorties et que les liens, redirections, SEO et audits existants restent valides.
5. Documenter dans la validation finale les fichiers relus et les éventuelles occurrences conservées parce qu'elles appartiennent à un identifiant, une URL, un nom propre ou une donnée technique.

## Risks / Trade-offs

- Une recherche naïve peut signaler des slugs ou des identifiants légitimes ; la confirmation contextuelle est donc obligatoire.
- Une correction d'un partial peut modifier de nombreuses pages à la fois ; le build complet permet de détecter rapidement une régression globale.
- La correction automatique peut changer le sens ou la casse de noms propres ; la relecture humaine reste l'autorité pour les choix éditoriaux.

## Validation

- Vérifier l'absence d'erreurs de rendu et la présence des caractères accentués après le build.
- Exécuter les contrôles existants du projet, notamment les audits SEO, les redirections et la comparaison de couverture.
- Effectuer une relecture ciblée des pages et partials corrigés, avec une attention aux libellés de navigation et aux textes répétés.