## ADDED Requirements

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
