## Purpose

Definir le comportement requis pour publier un site 100% statique genere par Eleventy a partir du contenu Joomla publie, tout en supprimant les dependances CMS au runtime.

## ADDED Requirements

### Requirement: Le contenu Joomla publie MUST etre exporte vers les entrees de build statique
Le pipeline de migration SHALL extraire les articles, categories et hierarchies de menus publies depuis la source Joomla, puis produire des donnees d'entree deterministes pour la generation statique.

#### Scenario: L'export ne contient que le contenu publie dans le perimetre
- **WHEN** le pipeline d'export est execute pour une release
- **THEN** il inclut uniquement le contenu publie retenu dans le perimetre et exclut les enregistrements archives, supprimes ou reserves a l'administration

#### Scenario: L'export produit un resultat deterministe
- **WHEN** le pipeline d'export est execute deux fois avec des donnees source inchangees
- **THEN** il produit des sorties structurees equivalentes, compatibles avec des builds statiques reproductibles

### Requirement: Des pages statiques MUST etre generees pour toutes les entrees de navigation publique dans le perimetre
Le generateur de site SHALL creer des pages HTML statiques pour chaque destination de menu public publiee et pour chaque page de contenu associee dans le perimetre.

#### Scenario: Une entree de navigation resolue vers une page statique
- **WHEN** un visiteur demande une URL publiee presente dans la navigation publique
- **THEN** le serveur renvoie une page HTML statique pre-generee sans execution runtime du CMS

#### Scenario: Le build echoue sur une cible de navigation non resolue
- **WHEN** une entree de menu publiee pointe vers un contenu source manquant
- **THEN** le build signale la cible non resolue et echoue avant publication

### Requirement: Les fonctions frontend dynamiques MUST etre retirees du runtime public
Le site public livre SHALL ne pas dependre du login CMS, des composants de calendrier dynamique, ni de modules rendus cote serveur au runtime.

#### Scenario: Une route dynamique retiree n'est plus disponible
- **WHEN** un visiteur accede a un endpoint dynamique retire
- **THEN** le site public n'execute aucun comportement backend dynamique et applique le comportement de fallback statique configure

#### Scenario: Les pages publiques se rendent sans session authentifiee
- **WHEN** un visiteur navigue sur n'importe quelle page publique
- **THEN** tout le contenu de page est disponible sans gestion de session Joomla ni module d'authentification frontend

