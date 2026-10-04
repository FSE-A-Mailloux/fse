## ADDED Requirements

### Requirement: L'accueil MUST présenter l'infographie sur le fonctionnement du FSE

La page d'accueil SHALL proposer une présentation visuelle et textuelle du Foyer Socio Éducatif à partir des informations de la première page du flyer 2025. Elle SHALL distinguer sa définition de ses raisons d'agir et conserver les cinq actions exposées dans le flyer.

#### Scenario: Définition et actions du FSE présentées
- **WHEN** un visiteur consulte la section consacrée au FSE sur la page d'accueil
- **THEN** il trouve l'explication « Une association qui réunit des parents et des profs », les repères « C'est quoi ? » et « Pourquoi ? », et les cinq actions suivantes : accompagner les élèves dans leurs envies pour le collège, accompagner les enseignants dans leurs projets éducatifs ou autres, améliorer le cadre de vie au collège, soutenir les sorties et voyages scolaires, et la coopérative scolaire pour les fournitures

#### Scenario: Infographie consultable comme contenu de page
- **WHEN** la page d'accueil est consultée avec ou sans ses styles visuels
- **THEN** les textes de l'infographie restent du contenu HTML sélectionnable, compréhensible dans un ordre de lecture logique, et ne dépendent pas de l'affichage du PDF ou d'une image contenant le texte

#### Scenario: Infographie lisible sur petit écran
- **WHEN** un visiteur consulte l'accueil sur un écran de 320px de large
- **THEN** la définition et les cinq actions restent lisibles dans un ordre cohérent, sans débordement horizontal ni perte d'information
