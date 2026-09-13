# static-site-source-freeze Specification

## Purpose
Definir le comportement attendu quand le depot adopte un corpus HTML/CSS statique comme reference unique, afin de supprimer durablement la dependance a une regeneration Joomla locale.

## Requirements

### Requirement: Le depot de publication MUST versionner un corpus statique de reference
Le projet SHALL conserver dans `src/` les pages sources (contenu par page) et les partials communs (`src/_partials/`) comme source de verite editoriale pour la livraison. `src/` SHALL rester une structure stable, versionnee et lisible dans un editeur de code, mais n'est plus tenu d'etre directement servable sans etape de build: c'est l'artefact produit dans `dist/` par `npm run build` qui SHALL etre exploitable tel quel, sans etape de compilation supplementaire, sur un hebergement statique.

#### Scenario: Promotion des artefacts statiques vers la source
- **WHEN** une version du site est preparee
- **THEN** le corpus statique valide est present dans `src/` et constitue l'entree unique du packaging de publication

#### Scenario: Source de verite explicite pour l'equipe
- **WHEN** un contributeur consulte la documentation projet
- **THEN** il trouve une consigne explicite indiquant que les mises a jour de contenu passent par la mise a jour de `src/` (pages et partials), suivie d'un `npm run build` avant publication

### Requirement: Les composants de generation Joomla obsoletes MUST etre retires du flux standard
Le flux de publication standard SHALL exclure les scripts, donnees intermediaires et commandes qui servent uniquement a extraire, normaliser ou regenerer le site depuis Joomla dans ce depot.

#### Scenario: Le flux standard ne propose plus de regeneration Joomla
- **WHEN** un contributeur execute les commandes documentees pour preparer une publication
- **THEN** aucune commande standard n'exige d'acces a la base Joomla ni d'etape de transformation intermediaire

#### Scenario: Les artefacts techniques obsoletes sont identifies comme hors perimetre
- **WHEN** un audit de depot est realise avant publication
- **THEN** les fichiers et scripts dedies a la chaine Joomla sont absents du flux actif ou explicitement declasses
