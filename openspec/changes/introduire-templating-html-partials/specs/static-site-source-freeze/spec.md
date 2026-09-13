## MODIFIED Requirements

### Requirement: Le depot de publication MUST versionner un corpus statique de reference
Le projet SHALL conserver dans `src/` les pages sources (contenu par page) et les partials communs (`src/_partials/`) comme source de verite editoriale pour la livraison. `src/` SHALL rester une structure stable, versionnee et lisible dans un editeur de code, mais n'est plus tenu d'etre directement servable sans etape de build: c'est l'artefact produit dans `dist/` par `npm run build` qui SHALL etre exploitable tel quel, sans etape de compilation supplementaire, sur un hebergement statique.

#### Scenario: Promotion des artefacts statiques vers la source
- **WHEN** une version du site est preparee
- **THEN** le corpus source valide (pages + partials) est present dans `src/` et constitue l'entree unique du build de publication

#### Scenario: L'artefact publie est autonome
- **WHEN** `npm run build` est execute
- **THEN** `dist/` contient des fichiers HTML complets et autonomes, sans marqueur d'inclusion residuel ni dependance a une etape de rendu supplementaire pour etre servis

#### Scenario: Source de verite explicite pour l'equipe
- **WHEN** un contributeur consulte la documentation projet
- **THEN** il trouve une consigne explicite indiquant que les mises a jour de contenu passent par la mise a jour de `src/` (pages et partials), suivie d'un `npm run build` avant publication
