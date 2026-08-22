## MODIFIED Requirements

### Requirement: Le contenu Joomla publie MUST etre exporte vers les entrees de build statique
Le pipeline de publication SHALL prendre comme entree un corpus statique versionne dans le depot et ne plus imposer d'export Joomla pour produire la release publique.

#### Scenario: L'export ne contient que le contenu publie dans le perimetre
- **WHEN** la preparation de release est executee
- **THEN** elle consomme uniquement les fichiers statiques de reference versionnes dans le depot et n'exige pas de connexion MySQL Joomla

#### Scenario: L'export produit un resultat deterministe
- **WHEN** la publication est executee deux fois sans modification des fichiers statiques de reference
- **THEN** elle produit des sorties equivalentes et reproductibles

### Requirement: Des pages statiques MUST etre generees pour toutes les entrees de navigation publique dans le perimetre
Le processus de publication SHALL produire, pour chaque destination de menu public publiee et chaque page de contenu associee dans le perimetre, des fichiers HTML et CSS pre-rendus deployables tels quels sur un hebergement statique, sans dependance a un moteur SSG specifique au moment de la livraison.

#### Scenario: Une entree de navigation est resolue vers un fichier statique publie
- **WHEN** un visiteur demande une URL publiee presente dans la navigation publique
- **THEN** le serveur renvoie le fichier HTML pre-publie correspondant, avec ses assets CSS associes, sans execution runtime du CMS

#### Scenario: Le build echoue sur une cible de navigation non resolue
- **WHEN** une entree de menu publiee pointe vers un contenu source manquant
- **THEN** le build signale la cible non resolue et echoue avant publication

#### Scenario: Le paquet de publication est autoportant
- **WHEN** la generation de release est terminee
- **THEN** les pages publiques du perimetre sont livrees sous forme de fichiers statiques complets, sans etape de rendu supplementaire requise en environnement cible

### Requirement: Les fonctions frontend dynamiques MUST etre retirees du runtime public
Le site public livre SHALL ne pas dependre du login CMS, des composants de calendrier dynamique, ni de modules rendus cote serveur au runtime.

#### Scenario: Une route dynamique retiree n'est plus disponible
- **WHEN** un visiteur accede a un endpoint dynamique retire
- **THEN** le site public n'execute aucun comportement backend dynamique et applique le comportement de fallback statique configure

#### Scenario: Les pages publiques se rendent sans session authentifiee
- **WHEN** un visiteur navigue sur n'importe quelle page publique
- **THEN** tout le contenu de page est disponible sans gestion de session Joomla ni module d'authentification frontend

