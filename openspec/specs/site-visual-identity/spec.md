# site-visual-identity Specification

## Purpose
Définir les exigences visuelles et d'expérience utilisateur du site public du FSE : palette de couleurs, typographie, composants UI, message d'accueil et lisibilité sur tous les écrans.

## Requirements

### Requirement: Le site MUST présenter une identité visuelle moderne, distinctive et cohérente

Le site public SHALL appliquer une direction visuelle expressive et identifiable, liée au FSE, à l'établissement et à son public scolaire. Elle SHALL pouvoir s'éloigner nettement de la palette, de la typographie et de la composition actuelles, tout en combinant contrastes lisibles, hiérarchie éditoriale, composants harmonisés et impression soignée sur l'ensemble des pages concernées.

#### Scenario: Rendu cohérent sur toutes les pages
- **WHEN** un visiteur navigue entre les différentes pages du site
	- **THEN** la mise en page, les couleurs, la typographie et les composants suivent la même direction visuelle distinctive sur chaque page concernée

#### Scenario: Hiérarchie visuelle claire
- **WHEN** un visiteur charge une page quelconque du site
- **THEN** les titres, le corps du texte, les blocs d'information et les appels à l'action sont visuellement distincts et lisibles sans effort

#### Scenario: Perception visuelle plus elegante
- **WHEN** un visiteur consulte la page d'accueil ou une page interne
	- **THEN** les surfaces, bordures, ombres et espacements donnent une impression singulière et maîtrisée sans surcharge décorative

### Requirement: La navigation principale MUST être lisible et bien organisée

La barre de navigation SHALL présenter une hiérarchie visuelle claire, des groupes de liens distinguables, des états de survol/focus/actif explicites et des zones cliquables confortables sur desktop comme sur mobile. Le sous-menu secondaire SHALL rester masqué lorsque la section active ne compte qu'une seule page, afin de ne pas dupliquer un lien déjà présent dans le menu principal.

#### Scenario: État de survol visible dans la navigation
- **WHEN** un visiteur passe la souris sur un lien de navigation
- **THEN** un changement visuel net (couleur, fond, contour ou soulignement) indique clairement que le lien est interactif

#### Scenario: Navigation lisible sur petits écrans
- **WHEN** un visiteur accède au site depuis un écran de moins de 768px de large
- **THEN** la navigation est accessible sans défilement horizontal et les liens restent facilement utilisables au doigt

#### Scenario: Focus clavier visible
- **WHEN** un visiteur navigue au clavier
- **THEN** le lien actuellement focus affiche un indicateur visuel explicite et contraste

#### Scenario: Absence de sous-menu redondant sur une section à page unique
- **WHEN** un visiteur charge une page dont la section de navigation ne contient qu'une seule entrée (par exemple la page d'accueil, le plan du site, la page "Liens avec les associations" ou la page "Nous contacter")
- **THEN** aucun sous-menu secondaire n'est affiché, car il ne ferait que reproduire le lien déjà présent dans le menu principal

#### Scenario: Sous-menu conservé pour une section à plusieurs pages
- **WHEN** un visiteur charge une page appartenant à une section comportant plusieurs pages (par exemple FSE, Actualités ou CoopSco)
- **THEN** le sous-menu secondaire affiche la liste des pages de cette section

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

### Requirement: Le message d'accueil MUST être accueillant et représentatif du FSE

La page d'accueil SHALL présenter un texte d'introduction clair, chaleureux et représentatif de la mission du FSE et de la CoopSco, remplaçant tout message générique ou technique.

#### Scenario: Absence de message technique en production

- **WHEN** un visiteur consulte la page d'accueil
- **THEN** aucun message faisant référence à la nature statique ou technique du site n'est visible

#### Scenario: Message d'accueil représentatif

- **WHEN** un visiteur arrive sur la page d'accueil
- **THEN** le texte d'introduction mentionne le FSE et/ou la CoopSco et invite à découvrir le contenu du site

### Requirement: La page d'accueil MUST exprimer une ambiance éditoriale accueillante

La page d'accueil SHALL utiliser un bloc d'introduction visuel (hero ou équivalent), des cartes de contenu enrichies et des appels à l'action clairs afin de donner une première impression chaleureuse, dynamique et structurée.

#### Scenario: Présence d'un bloc d'introduction éditorial
- **WHEN** un visiteur arrive sur la page d'accueil
- **THEN** il voit immédiatement un bloc d'introduction mettant en valeur le FSE/CoopSco avec un ton accueillant

#### Scenario: Parcours de découverte guidé
- **WHEN** un visiteur consulte la zone principale de la page d'accueil
- **THEN** les cartes et appels à l'action lui permettent d'identifier rapidement les rubriques prioritaires du site

### Requirement: La page de présentation MUST présenter l'infographie sur le fonctionnement du FSE

La page « FSE - Vue d'ensemble » à l'URL `/fse/` SHALL proposer une présentation visuelle et textuelle du Foyer Socio Éducatif après son introduction, à partir des informations de la première page du flyer 2025. Elle SHALL distinguer sa définition de ses raisons d'agir et conserver les cinq actions exposées dans le flyer. L'infographie ne SHALL PAS être dupliquée sur l'accueil ni sur « Qui sommes-nous ? ».

#### Scenario: Définition et actions du FSE présentées
- **WHEN** un visiteur consulte la page « FSE - Vue d'ensemble »
- **THEN** il trouve l'explication « Une association qui réunit des parents et des profs », les repères « C'est quoi ? » et « Pourquoi ? », et les cinq actions suivantes : accompagner les élèves dans leurs envies pour le collège, accompagner les enseignants dans leurs projets éducatifs ou autres, améliorer le cadre de vie au collège, soutenir les sorties et voyages scolaires, et la coopérative scolaire pour les fournitures

#### Scenario: Infographie consultable comme contenu de page
- **WHEN** la page de présentation est consultée avec ou sans ses styles visuels
- **THEN** les textes de l'infographie restent du contenu HTML sélectionnable, compréhensible dans un ordre de lecture logique, et ne dépendent pas de l'affichage du PDF ou d'une image contenant le texte

#### Scenario: Infographie lisible sur petit écran
- **WHEN** un visiteur consulte la page de présentation sur un écran de 320px de large
- **THEN** la définition et les cinq actions restent lisibles dans un ordre cohérent, sans débordement horizontal ni perte d'information

#### Scenario: Autres pages sans duplication
- **WHEN** un visiteur consulte l'accueil ou la page « Qui sommes-nous ? »
- **THEN** l'infographie n'y est pas affichée et les contenus et liens existants restent disponibles
