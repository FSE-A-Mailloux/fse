## Pourquoi

L'accueil affiche un ancien logo du FSE alors que son introduction présente aussi la CoopSco, sans identité graphique correspondante. Les deux logos fournis permettent de représenter fidèlement ces structures du collège Auguste Mailloux.

## Changements prévus

- Remplacer l'ancien logo FSE par l'image fournie dans `src/docs/images/site/logo-fse.png`.
- Intégrer le logo fourni dans `src/docs/images/site/logo-coopsco.png` dans un duo visuel équilibré au sein du bloc d'introduction.
- Déplacer uniquement ces deux fichiers dans `src/assets/logos/`, sans déplacer les autres images ni les PDF.
- Préserver les couleurs et proportions des images, leur identification accessible et la lisibilité sur mobile.
- Harmoniser les deux pages d'accueil `/` et `/home/`, qui utilisent actuellement le même ancien logo, sans modifier leurs contenus ni leurs parcours.

## Capacités

### Nouvelles capacités

Aucune.

### Capacités modifiées

- `homepage-visual-redesign` : imposer la présence des deux logos actuels dans les blocs d'introduction des pages d'accueil, avec une présentation harmonieuse, accessible et responsive.

## Impact

Les changements d'implémentation concerneront `src/index.html`, `src/home/index.html`, les règles d'accueil de `src/assets/site.css` et le déplacement des deux images locales fournies vers `src/assets/logos/`. Le build existant publiera les ressources dans `dist/`, sans édition directe de ce dossier.

Aucune dépendance, ressource distante, modification de navigation ou refonte globale n'est prévue. L'ancien fichier `src/assets/logo-fse.png` ne sera pas supprimé sans vérification de ses autres usages ; seule son utilisation dans les pages d'accueil doit disparaître.
