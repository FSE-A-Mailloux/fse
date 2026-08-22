## MODIFIED Requirements

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

