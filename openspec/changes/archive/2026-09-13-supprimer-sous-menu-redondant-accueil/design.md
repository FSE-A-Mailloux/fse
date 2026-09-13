## Context

Le sous-menu secondaire (`#secondary-nav`, dans `subnav-secondary`) est
généré côté client par `src/assets/navigation.js`. Chaque section déclarée
dans l'objet `sections` fournit une liste `items`. Pour certaines sections,
cette liste ne contient qu'un seul élément dont le `href` et le `label`
reproduisent exactement le lien déjà présent dans le menu principal
(`subnav-primary`) :

- `accueil` → `{ href: "/", label: "Accueil" }` (utilisé par `/`, `/home/`,
  `/sitemap/`, et toute page de secours via le fallback de
  `sectionFromPath`, notamment `/fonctionnalites-retirees/`)
- `liens` → `{ href: "/liens-avec-les-associations/", label: "Liens avec les associations" }`
- `contact` → `{ href: "/nous-contacter/", label: "Nous contacter" }`

Voir `proposal.md` - Why, pour la motivation.

## Goals / Non-Goals

**Goals:**
- Ne plus afficher de sous-menu secondaire lorsque la section active ne
  contient qu'une seule entrée de navigation.
- Ne rien changer pour les sections à plusieurs pages (FSE, Actualités,
  CoopSco).

**Non-Goals:**
- Ne pas modifier la structure du menu principal (`subnav-primary`).
- Ne pas modifier le contenu ou la liste des pages de chaque section.
- Ne pas introduire de nouvelle dépendance ou de changement de build.

## Decisions

- **Détection générique plutôt que liste de sections à exclure** : dans
  `renderSecondaryMenu`, si `config.items.length <= 1`, vider le conteneur
  (`container.innerHTML = ""`) au lieu de générer un lien unique.
  Alternative envisagée : coder en dur la liste des sections à masquer
  (`accueil`, `liens`, `contact`). Rejetée car moins robuste : toute
  nouvelle section à page unique ajoutée plus tard serait automatiquement
  couverte par la règle générique, sans nécessiter de mise à jour de cette
  logique de masquage.
- **Le CSS `subnav-secondary` reste inchangé** : le conteneur `wrap` reste
  dans le DOM (rendu par le partial EJS côté build), seul son contenu
  interne est vidé par JS. Cela évite de modifier `_partials/header.ejs`
  et le CSS associé, et limite le changement au script de navigation.

## Risks / Trade-offs

- [Le sous-menu reste vide un court instant avant l'exécution du JS
  (flash potentiel si `subnav-secondary` a une hauteur visuelle par
  défaut)] → Risque déjà existant aujourd'hui (le rendu est déjà différé
  au JS) ; aucune régression introduite par ce changement.
- [Une section actuellement à 2+ pages qui serait réduite à 1 page à
  l'avenir masquera automatiquement son sous-menu] → Comportement voulu,
  cohérent avec l'objectif de ne jamais dupliquer un lien unique.
