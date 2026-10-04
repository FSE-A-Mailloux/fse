## Purpose

Garantir que les documents et images récupérés de l'ancien site sont reliés aux contenus actuels de façon pertinente et traçable, et que les fichiers sans usage sont conservés sans être publiés.

## ADDED Requirements

### Requirement: Chaque ressource importée MUST recevoir une décision traçable

Le rapprochement SHALL couvrir toutes les pages actuelles et tous les PDF et images importés dans `src\docs`. Un inventaire conservé dans le dépôt SHALL indiquer pour chaque fichier son chemin d'origine, sa destination, sa décision de conservation ou d'archivage, les pages utilisatrices éventuelles et le motif de la décision.

#### Scenario: Couverture complète du lot importé
- **WHEN** le rapprochement est terminé
- **THEN** chaque fichier du lot initial figure exactement une fois dans l'inventaire avec une destination existante et une décision motivée
- **AND** chaque page actuelle a été examinée, même si elle ne nécessite aucune modification

#### Scenario: Identification incertaine
- **WHEN** le contenu et le contexte disponibles ne permettent pas de rattacher une ressource à une page avec certitude
- **THEN** la ressource n'est pas publiée sous une légende ou un contexte supposé
- **AND** l'incertitude est explicitement documentée, et le fichier est conservé hors publication si aucune référence actuelle ne le requiert

### Requirement: Les ressources pertinentes MUST être accessibles depuis les pages correspondantes

Les pages SHALL utiliser les ressources importées dont la correspondance avec leur contenu est confirmée. Les images de remplacement SHALL être remplacées lorsqu'une correspondance est confirmée ; les autres ressources utiles aux contenus existants SHALL être intégrées sans création d'une rubrique artificielle destinée uniquement à utiliser un fichier.

#### Scenario: Restauration d'une image manquante
- **WHEN** une image importée est confirmée comme correspondant à un emplacement actuellement occupé par une image de remplacement
- **THEN** la page affiche cette image locale avec un texte alternatif fidèle au contenu et sans déformation ni débordement sur mobile

#### Scenario: Conservation d'un document déjà lié
- **WHEN** un PDF importé est déjà référencé par une page actuelle
- **THEN** le document reste disponible à l'URL locale existante
- **AND** son contenu est rapproché du sujet et de l'année annoncés, toute discordance étant résolue explicitement plutôt que masquée par une substitution arbitraire

#### Scenario: Absence de ressource correspondante
- **WHEN** aucun fichier importé ne correspond à un emplacement d'image manquante
- **THEN** aucune image non pertinente n'est substituée
- **AND** l'absence de correspondance est enregistrée dans l'inventaire

#### Scenario: Correspondance validée explicitement après une première passe
- **WHEN** une correspondance initialement incertaine est validée explicitement (par exemple pour des emplacements voyages)
- **THEN** la page concernée référence une ressource locale publiée sous un nom de fichier explicite
- **AND** l'inventaire conserve la traçabilité entre le nom source initial et la destination finale retenue
- **AND** l'emplacement ne conserve plus d'image de remplacement

### Requirement: Les fichiers sans usage MUST être conservés hors publication

Les PDF et images importés sans usage retenu et sans référence dans les sources actuelles SHALL être déplacés vers `not-used\docs` à la racine du dépôt. Leur chemin relatif au dossier d'origine `src\docs`, leur nom et leurs octets SHALL être préservés. Aucun fichier archivé SHALL apparaître dans l'artefact publié.

#### Scenario: Archivage d'un document historique inutilisé
- **WHEN** un ancien document de fournitures n'est ni référencé ni retenu pour les contenus actuels
- **THEN** il est conservé à son chemin relatif sous `not-used\docs`
- **AND** il est absent de `src\docs` et de l'artefact publié

#### Scenario: Protection d'une ressource référencée
- **WHEN** une ressource reste référencée par une page, un partial ou une feuille de style
- **THEN** elle n'est pas déplacée hors publication

#### Scenario: Collision de destination
- **WHEN** une destination d'archivage existe déjà avec un contenu différent
- **THEN** le déplacement est bloqué et la collision est signalée sans écraser aucun fichier

### Requirement: Le rapprochement MUST préserver l'intégrité de la publication

Les pages, routes, métadonnées SEO et liens utiles existants SHALL rester fonctionnels. Toutes les références locales aux PDF et images importés SHALL se résoudre dans l'artefact publié, y compris les chemins comportant des accents, espaces ou caractères encodés.

#### Scenario: Navigation après rapprochement
- **WHEN** un visiteur consulte une page modifiée et ouvre ses documents ou images locaux
- **THEN** chaque référence correspond à un fichier présent dans l'artefact publié
- **AND** aucun lien ni média ne pointe vers `not-used`

#### Scenario: Conservation intégrale des fichiers
- **WHEN** les fichiers du lot initial sont comparés aux fichiers conservés et archivés après rapprochement
- **THEN** chaque fichier initial possède une destination unique avec un contenu binaire identique
