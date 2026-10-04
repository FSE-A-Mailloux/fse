## ADDED Requirements

### Requirement: Les accueils MUST présenter les logos actuels du FSE et de la CoopSco

Les pages `/` et `/home/` SHALL afficher dans leur bloc d'introduction le logo FSE et le logo CoopSco fournis pour ce changement. L'ancien logo FSE SHALL ne plus apparaître dans ces blocs. Chaque logo SHALL conserver ses couleurs et ses proportions, sans recadrage ni déformation, et disposer d'un texte alternatif identifiant la structure et le collège Auguste Mailloux.

#### Scenario: Identités actualisées sur les deux accueils
- **WHEN** un visiteur consulte `/` ou `/home/`
- **THEN** le bloc d'introduction affiche les deux logos fournis et n'affiche plus l'ancien logo FSE

#### Scenario: Identification accessible des structures
- **WHEN** un visiteur consulte l'accueil avec un lecteur d'écran ou sans chargement des images
- **THEN** les textes alternatifs identifient séparément le Foyer Socio-Éducatif et la Coopérative Scolaire du collège Auguste Mailloux

### Requirement: Le duo de logos MUST s'intégrer harmonieusement à l'introduction

Les deux logos SHALL former un ensemble visuel cohérent, avec des dimensions comparables et des espacements réguliers, sans masquer le titre, le texte d'introduction ou l'accès principal. La composition SHALL rester lisible sans défilement horizontal à 320px, 375px, 768px et 1280px de largeur. Les deux images SHALL être servies localement dans le site publié.

#### Scenario: Composition sur bureau
- **WHEN** un visiteur consulte l'un des accueils à 1280px de largeur
- **THEN** les deux logos sont entièrement visibles dans un ensemble équilibré et le titre, l'introduction et l'accès principal restent clairement identifiables

#### Scenario: Composition aux petites et moyennes largeurs
- **WHEN** un visiteur consulte l'un des accueils à 320px, 375px ou 768px de largeur
- **THEN** les deux logos restent entièrement visibles, sans chevauchement ni débordement horizontal, avec un ordre de lecture compréhensible

#### Scenario: Ressources publiées autonomes
- **WHEN** le site généré est servi depuis son artefact de publication
- **THEN** les deux logos se chargent depuis des ressources locales sans requête vers un service externe
