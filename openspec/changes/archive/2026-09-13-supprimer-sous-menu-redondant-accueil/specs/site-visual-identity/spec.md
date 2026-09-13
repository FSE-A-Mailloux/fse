## MODIFIED Requirements

### Requirement: La navigation principale MUST être lisible et bien organisée

La barre de navigation SHALL présenter une hiérarchie visuelle claire, des groupes de liens distinguables, des états de survol/focus/actif explicites et des zones cliquables confortables sur desktop comme sur mobile. Le sous-menu secondaire SHALL rester masqué lorsque la section active ne compte qu'une seule page, afin de ne pas dupliquer un lien déjà présent dans le menu principal.

#### Scenario: État de survol visible dans la navigation
- **WHEN** un visiteur passe la souris sur un lien de navigation
- **THEN** un changement visuel net (couleur, fond, contour ou soulignement) indique clairement que le lien est interactif

#### Scenario: Navigation lisible sur petits écrans
- **WHEN** un visiteur accède au site depuis un écran de moins de 768px de large
- **THEN** la navigation est accessible sans défilement horizontal et les liens restent facilement utilisables au doigt

#### Scenario: Focus clavier visible
- **WHEN** un visiteur navigue au clavier
- **THEN** le lien actuellement focus affiche un indicateur visuel explicite et contraste

#### Scenario: Absence de sous-menu redondant sur une section à page unique
- **WHEN** un visiteur charge une page dont la section de navigation ne contient qu'une seule entrée (par exemple la page d'accueil, le plan du site, la page "Liens avec les associations" ou la page "Nous contacter")
- **THEN** aucun sous-menu secondaire n'est affiché, car il ne ferait que reproduire le lien déjà présent dans le menu principal

#### Scenario: Sous-menu conservé pour une section à plusieurs pages
- **WHEN** un visiteur charge une page appartenant à une section comportant plusieurs pages (par exemple FSE, Actualités ou CoopSco)
- **THEN** le sous-menu secondaire affiche la liste des pages de cette section
