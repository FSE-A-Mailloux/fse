## Why

Le site actuel présente un style minimal et peu soigné : typographie sans hiérarchie visuelle claire, navigation surchargée, message d'accueil générique et peu engageant. Cela nuit à l'image du FSE et à l'expérience utilisateur des familles qui consultent le site. Il est temps de donner au site une identité visuelle moderne, cohérente et accueillante.

## What Changes

- Refonte complète du fichier `src/assets/site.css` : palette de couleurs, typographie, espacements, composants (topbar, navigation, articles, footer)
- Remplacement du message d'accueil générique « Bienvenue sur la version statique modernisee du site. » par un texte accueillant et représentatif du FSE
- Ajout d'une hiérarchie visuelle claire dans la navigation principale (groupement, espacement, états actifs)
- Amélioration de la lisibilité sur mobile (responsive design renforcé)
- Harmonisation de l'apparence sur toutes les pages du site

## Capabilities

### New Capabilities

- `site-visual-identity` : Définir les exigences visuelles et d'expérience utilisateur du site public — palette, typographie, composants UI et message d'accueil

### Modified Capabilities

*(Aucune spec existante ne couvre la dimension visuelle du site — aucune modification de spec existante nécessaire.)*

## Impact

- `src/assets/site.css` : réécriture complète du style
- `src/index.html` : mise à jour du message d'accueil
- Aucune modification de structure HTML, de routes, de SEO ou de pipeline de build
- Aucune dépendance externe ajoutée (CSS vanilla uniquement)

