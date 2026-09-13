## 1. Inventaire du contenu

- [ ] 1.1 Recenser les pages HTML et les partials éditoriaux sous `src/` qui contiennent du texte visible.
- [ ] 1.2 Distinguer les textes à corriger des URL, slugs, identifiants, chemins et autres valeurs techniques à préserver.
- [ ] 1.3 Relever les libellés répétés et les formulations communes à harmoniser.

## 2. Correction éditoriale

- [ ] 2.1 Relire et corriger les partials partagés de l'en-tête, de la navigation et du pied de page.
- [ ] 2.2 Corriger les accents, cédilles, apostrophes, majuscules, ponctuation, orthographe, accords et grammaire dans les pages du périmètre.
- [ ] 2.3 Vérifier les titres, liens, boutons, textes alternatifs et métadonnées visibles afin de conserver des formulations cohérentes.
- [ ] 2.4 Effectuer une relecture humaine des cas ambigus, des noms propres et des contenus dont la correction automatique pourrait modifier le sens.

## 3. Contrôles de non-régression

- [ ] 3.1 Vérifier que les sources et les sorties utilisent l'UTF-8 et ne produisent aucun caractère illisible ou mojibake.
- [ ] 3.2 Exécuter le build statique et vérifier que les textes corrigés sont propagés dans les pages générées.
- [ ] 3.3 Contrôler les liens, les routes, les redirections et les références de ressources après les modifications.
- [ ] 3.4 Exécuter les audits SEO, de redirections et de couverture existants du projet.

## 4. Validation finale

- [ ] 4.1 Relancer la recherche de détection des occurrences suspectes sur l'ensemble du périmètre et examiner chaque résultat conservé.
- [ ] 4.2 Vérifier manuellement les pages représentatives et les éléments communs dans les sorties générées.
- [ ] 4.3 Documenter les fichiers relus, les contrôles exécutés et les occurrences volontairement conservées pour des raisons techniques ou éditoriales.