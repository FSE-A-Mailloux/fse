## 1. Actualiser les contenus de l'assemblée générale

- [x] 1.1 Mettre à jour le bloc de mise en avant sur `/` et `/home/` pour nommer la dernière AG du 1er octobre 2026 et renvoyer vers sa page dédiée ; vérifier les deux libellés et destinations.
- [x] 1.2 Actualiser le titre, les métadonnées et le contenu de `/actualites/prochaine-ag/` pour confirmer la tenue de l'AG, conserver l'URL et signaler que son compte rendu est en cours de rédaction.
- [x] 1.3 Ajouter l'AG du 1er octobre 2026 à `/fse/comptes-rendus/` avec un statut « en cours de rédaction » jusqu'à publication ; vérifier qu'aucun lien vers un document indisponible n'est produit.
- [x] 1.4 Mettre à jour les libellés de l'actualité, du sitemap et de la navigation ; rechercher dans `src/` les formulations résiduelles qui décrivent cette AG comme « prochaine ».

## 2. Vérifier la publication

- [x] 2.1 Exécuter `npm run build` et vérifier que les pages générées contiennent les formulations mises à jour.
- [x] 2.2 Exécuter `npm run check` et vérifier que les contrôles SEO, redirections et couverture restent valides.
