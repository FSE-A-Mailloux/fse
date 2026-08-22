## Why

Le site actuel remplit sa fonction d'information mais renvoie une impression trop austere, ce qui peut freiner l'engagement des familles et des eleves. Une evolution visuelle est necessaire pour renforcer la confiance, valoriser les actions du FSE et offrir une experience plus chaleureuse tout en restant sobre et elegante.

## What Changes

- Reviser l'identite visuelle globale pour introduire un style plus classe: palette, typographie, contrastes, ombres et rayons plus harmonieux.
- Structurer les pages avec une meilleure hierarchie visuelle (titres, intertitres, zones de contenu, appels a l'action) pour une lecture plus fluide.
- Moderniser les composants de navigation et les blocs de contenu afin d'ameliorer perception de qualite et confort d'utilisation sur desktop et mobile.
- Definir des contraintes de coherence pour garantir un rendu homogene sur l'ensemble des pages existantes et futures.
- Remplacer toutes les references au domaine `https://example.org` par `https://www.fse-cooperativescolaire-amailloux.com` dans les contenus et metadonnees publiques du site.

## Capabilities

### New Capabilities
- Aucune.

### Modified Capabilities
- `site-visual-identity`: renforcer les exigences de style pour obtenir une apparence plus elegante et contemporaine, avec des criteres explicites sur la coherence, la lisibilite, les interactions et la perception premium.
- `seo-information-architecture`: imposer l'utilisation du domaine public officiel pour les references absolues, canoniques et signaux SEO, en remplacement de toute valeur `example.org`.

## Impact

- Impact principal sur `src/assets/site.css` et, si necessaire, sur certaines structures HTML des pages dans `src/` pour appliquer la nouvelle hierarchie visuelle.
- Impact potentiel sur les interactions de navigation (`src/assets/navigation.js`) pour conserver une ergonomie claire apres restylage.
- Impact sur les pages HTML et artefacts SEO (liens absolus, canoniques, sitemap/robots si concernes) afin d'eliminer toute reference `example.org`.
- Pas de changement d'API ni de dependance externe requis a ce stade.


