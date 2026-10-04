## ADDED Requirements

### Requirement: Les annonces d'événements datés MUST refléter leur temporalité et leur statut

Les contenus éditoriaux SHALL présenter un événement daté comme passé après sa tenue, et non comme prochain ou à venir. Lorsqu'un compte rendu n'est pas encore publié, les pages qui y renvoient SHALL signaler qu'il est en cours de rédaction sans créer de lien vers une ressource indisponible.

#### Scenario: La dernière assemblée générale est passée
- **WHEN** un visiteur consulte l'accueil après l'assemblée générale du 1er octobre 2026
- **THEN** l'assemblée est présentée comme la dernière AG, et le lien de mise en avant conduit à sa page dédiée sans la qualifier de rendez-vous à venir

#### Scenario: Le compte rendu est en cours de rédaction
- **WHEN** le compte rendu de l'assemblée générale n'est pas encore publié
- **THEN** la page dédiée et la liste des comptes rendus indiquent qu'il est en cours de rédaction et ne proposent pas de lien non fonctionnel vers le document
