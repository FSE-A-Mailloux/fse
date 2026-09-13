# static-site-templating Specification

## Purpose
Definir un assemblage deterministe des pages HTML a partir du contenu propre a chaque page et de partials communs, afin de maintenir une source lisible tout en livrant un artefact statique autonome.

## Requirements

### Requirement: L'assemblage de pages a partir de partials communs MUST etre deterministe
Le pipeline de publication SHALL assembler chaque page HTML publiee a partir de son contenu source et de partials communs (en-tete/bandeau, navigation principale, pied de page) de maniere deterministe: une meme version de `src/` SHALL toujours produire un artefact `dist/` identique.

#### Scenario: Deux builds successifs sans modification produisent le meme resultat
- **WHEN** le build statique est execute deux fois de suite sans modification de `src/`
- **THEN** les fichiers HTML produits dans `dist/` sont strictement identiques

#### Scenario: Un partial commun est modifie une seule fois
- **WHEN** un contributeur modifie le contenu d'un partial partage (ex: bandeau)
- **THEN** toutes les pages publiees qui referencent ce partial refletent la modification apres un nouveau build, sans edition individuelle de chaque page

### Requirement: Le build MUST echouer explicitement sur un partial reference manquant ou invalide
Le processus de rendu SHALL detecter toute reference EJS (`include`) vers un partial absent ou invalide et interrompre le build avant publication, avec un message identifiant le fichier source et la reference fautive.

#### Scenario: Une directive d'inclusion pointe vers un fichier inexistant
- **WHEN** une page source reference (`<%- include('_partials/...') %>`) un partial qui n'existe pas dans `src/_partials/`
- **THEN** le build echoue avec un message indiquant le fichier source et le chemin de partial manquant

### Requirement: Les fichiers de partials MUST etre exclus de la publication directe
Les fichiers sous `src/_partials/` SHALL servir uniquement d'entrees au rendu et ne SHALL PAS etre publies tels quels comme pages accessibles dans `dist/`.

#### Scenario: Un partial n'est pas accessible comme page publique
- **WHEN** le build de publication est execute
- **THEN** aucun fichier de `dist/` ne correspond a un chemin sous `_partials/`
