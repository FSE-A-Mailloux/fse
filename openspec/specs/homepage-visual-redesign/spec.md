# homepage-visual-redesign Specification

## Purpose
Définir une expérience d'accueil reconnaissable et contemporaine pour le FSE, capable de guider rapidement les visiteurs vers les actions, actualités et ressources utiles sans perdre la lisibilité d'un site scolaire.

## Requirements

### Requirement: La page d'accueil MUST exprimer un parti pris visuel spécifique au FSE

La page d'accueil SHALL présenter une composition, une hiérarchie typographique et une relation entre couleurs, espaces et contenus qui permettent d'identifier le FSE au-delà d'un simple modèle de site institutionnel.

#### Scenario: Première impression distinctive
- **WHEN** un visiteur arrive sur la page d'accueil
- **THEN** il perçoit immédiatement un élément signature et une composition propres au FSE, sans dépendre d'un texte expliquant le design

#### Scenario: Parti pris cohérent avec le contenu
- **WHEN** un visiteur parcourt l'accueil
- **THEN** les choix visuels renforcent la compréhension de la mission du FSE, de la CoopSco, des actualités et des actions proposées

### Requirement: La page d'accueil MUST guider les parcours prioritaires

La page d'accueil SHALL hiérarchiser les accès vers les contenus prioritaires, notamment les actualités, les commandes, les actions du FSE et les documents utiles, avec des libellés français explicites et des appels à l'action identifiables.

#### Scenario: Accès rapides compréhensibles
- **WHEN** un visiteur consulte la zone principale de l'accueil
- **THEN** il peut identifier les parcours prioritaires sans devoir interpréter des icônes ou des formulations marketing

#### Scenario: Contenus secondaires non concurrents
- **WHEN** un visiteur descend dans la page
- **THEN** les actualités et contenus secondaires sont visibles dans une hiérarchie distincte du message principal, sans créer de compétition visuelle confuse

### Requirement: La nouvelle direction visuelle MUST rester utilisable sur tous les écrans

La page d'accueil SHALL rester lisible et navigable entre 320px et les grandes largeurs de bureau, avec des contrôles accessibles au clavier, des contrastes suffisants et aucune information essentielle dépendante d'une animation ou d'une ressource distante.

#### Scenario: Composition stable sur mobile
- **WHEN** un visiteur consulte l'accueil sur un écran de 320px à 375px de large
- **THEN** le contenu ne déborde pas horizontalement et l'ordre de lecture reste compréhensible

#### Scenario: Navigation clavier et réduction des mouvements
- **WHEN** un visiteur navigue au clavier ou active la réduction des animations
- **THEN** les focus restent visibles, les actions restent compréhensibles et les animations non essentielles sont réduites ou supprimées

#### Scenario: Ressources locales autonomes
- **WHEN** la page d'accueil est publiée dans l'artefact `dist/`
- **THEN** son rendu ne dépend d'aucune police, image ou service externe non vérifié

### Requirement: La refonte MUST préserver les contrats éditoriaux et SEO de l'accueil

La page d'accueil SHALL conserver son URL, ses métadonnées pertinentes, son titre principal, ses liens internes et le contenu informatif nécessaire, même si leur présentation visuelle évolue.

#### Scenario: URL et métadonnées conservées
- **WHEN** le nouveau build est publié
- **THEN** l'URL publique de l'accueil et ses métadonnées SEO existantes restent disponibles

#### Scenario: Contenu accessible sans habillage visuel
- **WHEN** un visiteur ou un outil consulte le HTML de l'accueil sans CSS
- **THEN** le titre, le message d'accueil, les liens et les contenus essentiels restent dans un ordre de lecture compréhensible
