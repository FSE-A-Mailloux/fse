## Why

Sur la page d'accueil (et sur d'autres pages dont la section n'a qu'une seule
page), le sous-menu secondaire affiche un unique lien qui reproduit exactement
le lien déjà présent dans le menu principal (ex. "Accueil" > "Accueil"). Ce
niveau de menu redondant n'apporte aucune information de navigation
supplémentaire, alourdit l'interface et peut créer de la confusion pour les
utilisateurs et pour le SEO (structure de navigation dupliquée).

## What Changes

- Ne plus afficher le sous-menu secondaire (`subnav-secondary`) lorsque la
  section courante ne contient qu'une seule entrée de navigation identique au
  lien du menu principal (cas "Accueil", "Liens avec les associations", "Nous
  contacter", et toute page de secours retombant sur la section Accueil comme
  `/sitemap/`).
- Conserver l'affichage du sous-menu secondaire pour les sections qui
  comportent plusieurs pages réelles (FSE, Actualités, CoopSco).
- Adapter le script de navigation (`src/assets/navigation.js`) afin qu'il
  masque/ne génère pas le conteneur `#secondary-nav` quand la section n'a
  qu'une seule entrée.

## Capabilities

### New Capabilities

_Aucune._

### Modified Capabilities

- `site-visual-identity`: la barre de navigation ne doit plus présenter de
  niveau de sous-menu redondant lorsque la section active ne comporte qu'une
  seule page.

## Impact

- `src/assets/navigation.js` (logique de rendu du sous-menu secondaire).
- Pages concernées: `src/home/index.html`, `src/sitemap/index.html`,
  `src/liens-avec-les-associations/index.html`, `src/nous-contacter/index.html`,
  `src/fonctionnalites-retirees/index.html` (et toute page retombant sur la
  section "Accueil" par défaut).
- Pas d'impact sur les sections FSE, Actualités et CoopSco, qui conservent
  leur sous-menu.
