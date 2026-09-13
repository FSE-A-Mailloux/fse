## Purpose

Definir le comportement requis pour construire automatiquement, via la CI GitHub, un apercu statique isole de chaque pull request et le publier sur GitHub Pages, avec exposition d'un lien de consultation et nettoyage a la fermeture de la PR.

## ADDED Requirements

### Requirement: Construction automatique de l'apercu sur evenement de pull request
Le systeme SHALL declencher automatiquement, a chaque ouverture, mise a jour (nouveau commit push) ou reouverture d'une pull request ciblant le depot, une execution de la CI qui produit le site statique a partir du contenu de la branche source de la PR.

#### Scenario: Ouverture d'une nouvelle pull request
- **WHEN** une pull request est ouverte contre le depot
- **THEN** un workflow de CI se declenche et construit le site statique a partir du contenu de la branche source de cette PR

#### Scenario: Nouveau commit pousse sur une pull request existante
- **WHEN** un nouveau commit est pousse sur la branche source d'une pull request deja ouverte
- **THEN** le workflow de CI reconstruit le site statique avec le contenu mis a jour et republie l'apercu correspondant

### Requirement: Publication d'un apercu isole par pull request
Le systeme SHALL publier le resultat de la construction de chaque pull request a un emplacement GitHub Pages qui lui est propre, sans ecraser l'apercu d'une autre pull request ni le site de production publie separement.

#### Scenario: Deux pull requests ouvertes simultanement
- **WHEN** deux pull requests distinctes sont ouvertes en meme temps et ont chacune declenche une construction d'apercu
- **THEN** chaque pull request dispose de son propre apercu consultable, et la publication de l'une ne modifie ni ne supprime l'apercu de l'autre

#### Scenario: Mise a jour d'un apercu existant
- **WHEN** une pull request pour laquelle un apercu existe deja recoit un nouveau commit
- **THEN** l'apercu publie a l'emplacement dedie de cette pull request est remplace par la nouvelle version, sans affecter le site de production

### Requirement: Exposition d'un lien vers l'apercu sur la pull request
Le systeme SHALL rendre visible, directement sur la pull request, un lien pointant vers l'URL GitHub Pages de l'apercu genere, et SHALL mettre a jour ce lien ou son statut a chaque reconstruction reussie.

#### Scenario: Premiere publication reussie
- **WHEN** la premiere construction et publication de l'apercu d'une pull request reussit
- **THEN** un lien vers l'URL de l'apercu est visible sur la pull request (commentaire ou statut de check)

#### Scenario: Echec de construction
- **WHEN** la construction du site statique pour une pull request echoue
- **THEN** aucun lien vers un apercu obsolete ou casse n'est presente comme valide, et l'echec est visible sur la pull request

### Requirement: Nettoyage de l'apercu a la fermeture de la pull request
Le systeme SHALL supprimer ou desactiver l'apercu publie d'une pull request lorsque celle-ci est fermee ou fusionnee, afin de ne pas accumuler d'apercus obsoletes sur GitHub Pages.

#### Scenario: Fermeture sans fusion
- **WHEN** une pull request ayant un apercu publie est fermee sans etre fusionnee
- **THEN** l'apercu correspondant est supprime ou rendu inaccessible sur GitHub Pages

#### Scenario: Fermeture par fusion
- **WHEN** une pull request ayant un apercu publie est fusionnee
- **THEN** l'apercu correspondant est supprime ou rendu inaccessible sur GitHub Pages, sans impact sur le site de production

### Requirement: Fonctionnement correct de l'apercu publie sous un sous-chemin
Le systeme SHALL publier chaque apercu de sorte que ses pages, ses feuilles de style, ses scripts et sa navigation interne fonctionnent correctement lorsqu'ils sont servis depuis le sous-chemin dedie de la pull request (par exemple `/pr-<numero>/`), sans dependre d'une publication a la racine du domaine.

#### Scenario: Chargement des styles et scripts de l'apercu
- **WHEN** un relecteur ouvre l'URL de l'apercu d'une pull request
- **THEN** la feuille de style et les scripts de la page se chargent correctement depuis le sous-chemin de l'apercu, sans erreur 404 liee a un chemin resolu depuis la racine du domaine

#### Scenario: Navigation interne de l'apercu
- **WHEN** un relecteur clique sur un lien de navigation interne (menu, contenu de page) dans l'apercu d'une pull request
- **THEN** la page de destination chargee reste a l'interieur du sous-chemin de cet apercu, sans rediriger vers la racine du domaine ou un autre apercu
