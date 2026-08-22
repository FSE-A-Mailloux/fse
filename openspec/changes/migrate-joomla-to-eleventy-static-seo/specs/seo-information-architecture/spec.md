## Purpose

Definir le comportement SEO cible du site statique afin que l'architecture d'information, les signaux d'indexation et les redirections de migration soient coherents et mesurables.

## ADDED Requirements

### Requirement: Les URLs publiques MUST suivre une architecture d'information propre et stable
Le site statique SHALL exposer des URLs lisibles, avec une structure hierarchique coherente et des slugs stables pour toutes les pages dans le perimetre.

#### Scenario: L'URL generee respecte la structure cible
- **WHEN** une page est generee a partir du contenu dans le perimetre
- **THEN** son URL respecte les conventions de chemin definies et n'expose pas de parametres Joomla

#### Scenario: L'URL canonique est unique par page
- **WHEN** une page est rendue
- **THEN** elle declare exactement une URL canonique correspondant a sa route publiee

### Requirement: Chaque page indexable MUST fournir des metadonnees SEO completes
Chaque page indexable SHALL inclure un titre, une meta description, un lien canonique et des metadonnees Open Graph derivees des champs de contenu mappes.

#### Scenario: Le controle de presence des metadonnees reussit
- **WHEN** l'etape de validation des metadonnees est executee sur les pages generees
- **THEN** tous les champs SEO requis sont presents et non vides pour chaque page indexable

#### Scenario: Les pages non indexables sont explicitement marquees
- **WHEN** une page est configuree comme non indexable
- **THEN** elle emet des directives noindex explicites et est exclue du sitemap

### Requirement: La migration depuis les URLs Joomla MUST preserver la decouvrabilite via redirections
La configuration de livraison SHALL fournir des redirections permanentes explicites entre les URLs legacy Joomla mappees et les nouvelles URLs statiques correspondantes, avec une couverture exhaustive des pages statiques Joomla publiques dans le perimetre.

#### Scenario: Une URL legacy est resolue vers sa cible mappee
- **WHEN** un crawler demande une URL legacy Joomla mappee
- **THEN** la reponse est une redirection permanente vers la nouvelle URL statique definie

#### Scenario: La couverture de redirection est validee avant release
- **WHEN** un candidat de release est prepare
- **THEN** des controles automatiques confirment l'existence des mappings de redirection pour toutes les URLs legacy des pages statiques Joomla publiques dans le perimetre

### Requirement: Les artefacts de decouverte crawler MUST etre generes a chaque release
Le build du site SHALL generer `sitemap.xml` et `robots.txt` alignes avec les regles d'indexabilite et de canonicalisation.

#### Scenario: Le sitemap ne contient que des URLs canoniques indexables
- **WHEN** le sitemap est genere
- **THEN** il liste uniquement les URLs canoniques des pages indexables dans le perimetre

#### Scenario: La politique robots est alignee avec l'intention de release
- **WHEN** un build de production est publie
- **THEN** les directives robots autorisent le crawl du contenu public et n'interdisent que les chemins explicitement exclus

