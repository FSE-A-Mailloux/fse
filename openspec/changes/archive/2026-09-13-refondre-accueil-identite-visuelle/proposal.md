## Why

L'accueil actuel remplit son rôle informatif mais ressemble encore à un site institutionnel générique : sa composition, sa typographie et son système de surfaces ne donnent pas au FSE une présence visuelle immédiatement reconnaissable. Une refonte pilote de l'accueil permettra de tester une identité plus expressive et contemporaine avant d'étendre, si elle est validée, les choix aux autres pages.

## What Changes

- Créer une nouvelle direction visuelle pour l'accueil, avec une rupture assumée par rapport à la palette bleu/or actuelle.
- Proposer et comparer plusieurs partis pris avant l'implémentation, puis retenir une piste spécifique au FSE et à son public scolaire.
- Recomposer l'accueil autour d'une hiérarchie éditoriale plus forte : message principal, accès rapides, actualités et actions du FSE.
- Faire évoluer les variables CSS, la typographie, la grille, les espacements, les surfaces et les états interactifs nécessaires à cette direction.
- Adapter les partials communs uniquement lorsque l'accueil en a besoin, sans réécrire prématurément toutes les pages du site.
- Utiliser uniquement des ressources locales déjà présentes ou ajoutées au dépôt avec une licence et un poids vérifiés.
- Préserver les URLs, le contenu utile, les métadonnées SEO, l'accessibilité clavier, le responsive et le pipeline `src/` vers `dist/`.
- Réaliser l'implémentation sur une branche dédiée, à créer au démarrage de la phase d'application : `refonte-accueil-identite-visuelle`.

## Capabilities

### New Capabilities
- `homepage-visual-redesign`: Définir l'expérience visuelle, la composition et les états attendus du nouvel accueil du site FSE.

### Modified Capabilities
- `site-visual-identity`: Étendre l'identité visuelle du site pour autoriser une expression plus distinctive, tout en conservant lisibilité, accessibilité et cohérence.

## Impact

- Fichiers principalement concernés pendant l'implémentation : `src/home/index.html`, `src/assets/site.css` et, si nécessaire, `src/_partials/header.ejs` et `src/_partials/footer.ejs`.
- Aucun changement d'URL publique, de dépendance applicative ou de moteur de build n'est prévu.
- Les contrôles `npm run check`, le rendu EJS et l'artefact `dist/` restent les références de validation.
- Une vérification visuelle sur mobile et bureau sera nécessaire avant toute extension de la direction aux autres pages.
