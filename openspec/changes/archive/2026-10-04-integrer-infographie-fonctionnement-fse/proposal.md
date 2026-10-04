## Why

Le flyer 2025 présente en une infographie le rôle du FSE et ses actions, mais ces informations ne sont pas encore exposées de façon aussi visuelle et immédiate sur le site. Les intégrer en HTML/CSS à la page « FSE - Vue d'ensemble » rendra cette présentation consultable, responsive et accessible sans ouvrir le PDF.

## What Changes

- Ajouter à la page « FSE - Vue d'ensemble » une section infographique consacrée au fonctionnement du FSE, à partir du contenu de la première page de `docs/Flyer_FSE.pdf`, sans la dupliquer sur l'accueil ni sur « Qui sommes-nous ? ».
- Présenter « C’est quoi ? » — une association qui réunit des parents et des profs — puis « Pourquoi ? » et les cinq actions du flyer : accompagner les élèves dans leurs envies pour le collège, accompagner les enseignants dans leurs projets éducatifs ou autres, améliorer le cadre de vie au collège, soutenir les sorties et voyages scolaires, et la coopérative scolaire pour les fournitures.
- Recomposer l’infographie en HTML/CSS plutôt que d’intégrer la page du PDF comme une image, afin de conserver un contenu sélectionnable et lisible sur petit écran.
- Préserver les parcours, métadonnées et contenus existants de l'accueil et de la page de présentation.

## Capabilities

### New Capabilities

Aucune.

### Modified Capabilities

- `site-visual-identity` : préciser les exigences de contenu, de présentation responsive et d’accessibilité de l’infographie FSE sur la page « FSE - Vue d'ensemble ».

## Impact

- Page de présentation et styles associés, en réutilisant les conventions de présentation et de templating existantes.
- Spécification `site-visual-identity`.
- Aucun changement d’URL, de dépendance ou de service distant requis.
