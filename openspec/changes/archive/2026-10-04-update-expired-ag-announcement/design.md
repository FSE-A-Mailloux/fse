## Context

Voir `proposal.md` pour la motivation. Le site publie deux pages d'accueil (`/` et `/home/`) ainsi qu'une page d'information sur l'assemblée générale, référencée aussi dans les actualités, le sitemap et la navigation. Les fichiers sous `src/` sont les sources ; les routes publiques existantes doivent rester stables.

## Goals / Non-Goals

**Goals:**
- Mettre en avant sur les deux accueils la dernière assemblée générale et renvoyer vers sa page dédiée.
- Indiquer clairement que le compte rendu est en cours de rédaction sur la page dédiée et dans la liste des comptes rendus.
- Préserver les URLs, redirections et fonctionnement du site statique.

**Non-Goals:**
- Ajouter une détection automatique des dates échues ou un nouveau mécanisme de publication.
- Rédiger le compte rendu ou inventer des résultats.
- Modifier l'apparence générale des pages d'accueil.

## Decisions

- Conserver le bloc de mise en avant des deux accueils, le renommer pour identifier la dernière AG du 1er octobre 2026 et le relier à la page dédiée existante.
- Conserver la route `/actualites/prochaine-ag/` pour compatibilité, mais actualiser le titre, les métadonnées et le contenu afin qu'ils identifient l'assemblée passée et confirment sa tenue.
- Tant que le compte rendu est en rédaction, afficher un avis d'indisponibilité sans lien fictif.
- Ajouter dans la liste des comptes rendus une entrée pour l'AG du 1er octobre avec un statut en rédaction.
- Réserver la publication du PDF et l'ajout de ses liens à un changement OpenSpec ultérieur.
- Mettre à jour les intitulés d'actualité, de sitemap et de navigation sans modifier leurs destinations.
- Modifier uniquement les sources dans `src/`, puis vérifier la sortie avec le build et les contrôles existants.

## Risks / Trade-offs

- [Le document n'est pas disponible au moment de la mise à jour] → Afficher uniquement le statut « en cours de rédaction » ; traiter le PDF et son lien dans un changement séparé.
- [Des intitulés résiduels pourraient encore présenter l'AG comme prochaine] → Rechercher les anciennes formulations dans l'ensemble de `src/` et vérifier les métadonnées de la page dédiée.
