## Context

Le site est un ensemble de fichiers HTML/CSS statiques dans `src/`. Le style global est centralisé dans `src/assets/site.css` (19 lignes). Chaque page HTML importe ce fichier via `<style>@import url("/assets/site.css");</style>`. Le HTML existant utilise des classes stables (`.topbar`, `.subnav`, `.wrap`, `.brand`, `.meta-nav`, `article`, `footer`).

Voir `proposal.md – Why` pour la motivation.

## Goals / Non-Goals

**Goals:**

- Réécrire `src/assets/site.css` pour un rendu moderne, lisible et cohérent
- Améliorer la palette de couleurs, la typographie et les espacements
- Renforcer le responsive design (mobile-first, breakpoints déclarés)
- Améliorer l'état de survol et la hiérarchie visuelle de la navigation
- Remplacer le message d'accueil dans `src/index.html`

**Non-Goals:**

- Modifier la structure HTML des pages (pas de refonte des templates)
- Introduire des frameworks CSS externes (Bootstrap, Tailwind, etc.)
- Ajouter du JavaScript
- Modifier le pipeline de build, le SEO ou les redirections

## Decisions

### Décision 1 : CSS vanilla uniquement, pas de framework

**Choix** : Réécrire `site.css` en CSS moderne natif (custom properties, `clamp()`, media queries).

**Raison** : Le site est 100% statique sans étape de compilation. Ajouter un framework CSS imposerait un outil de build. Le CSS natif est suffisant pour atteindre un rendu moderne et reste maintenable facilement par un contributeur non spécialiste.

**Alternative considérée** : Tailwind CSS — rejeté car nécessite une étape de compilation et ajoute une dépendance externe.

### Décision 2 : Conserver les classes HTML existantes

**Choix** : Ne pas modifier les noms de classes ni la structure HTML des pages.

**Raison** : Toutes les pages partagent la même structure. Modifier le HTML impliquerait d'éditer 20+ fichiers. En ne touchant qu'au CSS, un seul fichier suffit à transformer l'ensemble du site.

**Alternative considérée** : Ajouter de nouvelles classes sémantiques — rejeté car inutile pour ce périmètre.

### Décision 3 : Palette inspirée de l'univers scolaire/associatif

**Choix** : Palette sobre et chaleureuse — bleu primaire profond, blanc cassé pour le fond, accents doux. Police système (`system-ui`) pour la rapidité de chargement et la lisibilité.

**Raison** : Convient à un public de familles et d'enseignants. Évite les polices Google Fonts (dépendance réseau, problèmes RGPD).

**Alternative considérée** : Police Google Fonts `Inter` — rejeté pour éliminer la dépendance réseau externe.

### Décision 4 : Message d'accueil rédigé directement dans `src/index.html`

**Choix** : Remplacer les paragraphes génériques par un texte chaleureux présentant le FSE et la CoopSco.

**Raison** : Il n'existe pas de système de templates — le contenu est directement dans les fichiers HTML.

## Risks / Trade-offs

- **[Risque] Régression visuelle sur des pages non testées** → Mitigation : le CSS ne touche qu'aux classes existantes ; un rendu visuel rapide sur chaque page suffit à valider.
- **[Trade-off] CSS vanilla vs framework** : moins de composants prêts à l'emploi, mais zéro dépendance et maintenabilité maximale pour une équipe non technique.
- **[Trade-off] Police système vs police personnalisée** : moins distinctive visuellement, mais chargement instantané et aucune requête externe.

## Migration Plan

1. Remplacer le contenu de `src/assets/site.css`
2. Mettre à jour le texte d'accueil dans `src/index.html`
3. Vérifier visuellement les principales pages dans un navigateur (`npm run serve` ou équivalent)

**Rollback** : le fichier CSS original peut être restauré via `git revert` — aucune autre modification de structure.

