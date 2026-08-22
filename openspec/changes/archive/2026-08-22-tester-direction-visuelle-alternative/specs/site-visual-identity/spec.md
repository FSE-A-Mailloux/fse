## MODIFIED Requirements

### Requirement: Le site MUST présenter une identité visuelle moderne et cohérente

Le site public SHALL appliquer une direction visuelle alternative plus chaleureuse et moins austère, combinant palette expressive, contrastes lisibles, typographie éditoriale et composants de contenu harmonisés, tout en conservant une impression soignée et professionnelle sur l'ensemble des pages.

#### Scenario: Rendu cohérent sur toutes les pages
- **WHEN** un visiteur navigue entre les différentes pages du site
- **THEN** la mise en page, les couleurs, la typographie et les composants suivent la même direction visuelle alternative sur chaque page

#### Scenario: Hiérarchie visuelle claire
- **WHEN** un visiteur charge une page quelconque du site
- **THEN** les titres, le corps du texte, les blocs d'information et les appels à l'action sont visuellement distincts et lisibles sans effort

#### Scenario: Perception visuelle plus elegante
- **WHEN** un visiteur consulte la page d'accueil ou une page interne
- **THEN** les surfaces, bordures, ombres et espacements donnent une impression premium sans surcharge decorative

### Requirement: La navigation principale MUST être lisible et bien organisée

La barre de navigation SHALL présenter une hiérarchie visuelle claire, des groupes de liens distinguables, des états de survol/focus/actif explicites et des zones cliquables confortables sur desktop comme sur mobile.

#### Scenario: État de survol visible dans la navigation
- **WHEN** un visiteur passe la souris sur un lien de navigation
- **THEN** un changement visuel net (couleur, fond, contour ou soulignement) indique clairement que le lien est interactif

#### Scenario: Navigation lisible sur petits écrans
- **WHEN** un visiteur accède au site depuis un écran de moins de 768px de large
- **THEN** la navigation est accessible sans défilement horizontal et les liens restent facilement utilisables au doigt

#### Scenario: Focus clavier visible
- **WHEN** un visiteur navigue au clavier
- **THEN** le lien actuellement focus affiche un indicateur visuel explicite et contraste

### Requirement: Le site MUST être lisible et utilisable sur mobile

La mise en page SHALL s'adapter aux écrans de petite taille (minimum 320px) sans défilement horizontal ni perte d'information, avec une densité visuelle maîtrisée et des interactions tactiles fiables.

#### Scenario: Absence de défilement horizontal sur mobile
- **WHEN** un visiteur charge n'importe quelle page sur un écran de 375px de large
- **THEN** aucun défilement horizontal n'est nécessaire pour voir le contenu

#### Scenario: Taille de texte lisible sur mobile
- **WHEN** un visiteur consulte le contenu principal sur un écran mobile
- **THEN** la taille de police du corps de texte est d'au moins 16px avec un interlignage confortable

#### Scenario: Cibles tactiles praticables
- **WHEN** un visiteur interagit avec les liens principaux depuis un smartphone
- **THEN** les elements interactifs critiques disposent d'une zone tactile suffisante pour eviter les erreurs de clic

## ADDED Requirements

### Requirement: La page d'accueil MUST exprimer une ambiance éditoriale accueillante

La page d'accueil SHALL utiliser un bloc d'introduction visuel (hero ou équivalent), des cartes de contenu enrichies et des appels à l'action clairs afin de donner une première impression chaleureuse, dynamique et structurée.

#### Scenario: Présence d'un bloc d'introduction éditorial
- **WHEN** un visiteur arrive sur la page d'accueil
- **THEN** il voit immédiatement un bloc d'introduction mettant en valeur le FSE/CoopSco avec un ton accueillant

#### Scenario: Parcours de découverte guidé
- **WHEN** un visiteur consulte la zone principale de la page d'accueil
- **THEN** les cartes et appels à l'action lui permettent d'identifier rapidement les rubriques prioritaires du site

