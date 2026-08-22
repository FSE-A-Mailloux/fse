## MODIFIED Requirements

### Requirement: Chaque page indexable MUST fournir des metadonnees SEO completes
Chaque page indexable SHALL inclure un titre, une meta description, un lien canonique et des metadonnees Open Graph derivees des champs de contenu mappes. Les URLs absolues declarees dans ces metadonnees SHALL utiliser le domaine `https://www.fse-cooperativescolaire-amailloux.com`.

#### Scenario: Le controle de presence des metadonnees reussit
- **WHEN** l'etape de validation des metadonnees est executee sur les pages generees
- **THEN** tous les champs SEO requis sont presents et non vides pour chaque page indexable

#### Scenario: Les pages non indexables sont explicitement marquees
- **WHEN** une page est configuree comme non indexable
- **THEN** elle emet des directives noindex explicites et est exclue du sitemap

#### Scenario: Le domaine canonique de production est applique
- **WHEN** une page indexable est rendue
- **THEN** ses metadonnees canoniques et Open Graph n'utilisent pas `https://example.org` et utilisent `https://www.fse-cooperativescolaire-amailloux.com`

## ADDED Requirements

### Requirement: Les references absolues publiques MUST utiliser le domaine officiel
Le site public SHALL remplacer toute reference absolue `https://example.org` par `https://www.fse-cooperativescolaire-amailloux.com` dans les pages publiees et les artefacts SEO publics.

#### Scenario: Absence de reference example.org dans les pages publiques
- **WHEN** un controle est effectue sur les pages HTML publiees
- **THEN** aucune occurrence de `https://example.org` n'est presente

#### Scenario: Cohérence du domaine dans les artefacts SEO
- **WHEN** `sitemap.xml` et `robots.txt` sont generes pour la release
- **THEN** toute URL absolue presente utilise `https://www.fse-cooperativescolaire-amailloux.com`

