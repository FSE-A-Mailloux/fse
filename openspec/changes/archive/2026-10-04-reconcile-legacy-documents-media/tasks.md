## 1. Inventaire et identification

- [x] 1.1 Relever les fichiers présents dans `src\docs`, leurs tailles et leurs empreintes SHA-256, puis créer `docs\legacy-resource-inventory.md` ; vérifier que chaque fichier du lot initial possède une ligne unique.
- [x] 1.2 Examiner toutes les pages actuelles, les partials et les références CSS pour relever les usages de PDF et images, y compris les URL encodées ; vérifier que la liste des pages examinées couvre toutes les pages sources et comprend les huit emplacements d'images manquantes relevés initialement.
- [x] 1.3 Inspecter les images et consulter les PDF nécessaires à l'identification pour établir les correspondances de sujet et d'année ; vérifier que chaque ligne d'inventaire indique une décision motivée, des pages utilisatrices éventuelles et les incertitudes explicites, sans correspondance déduite uniquement d'un nom.

## 2. Raccordement aux contenus actuels

- [x] 2.1 Confirmer les PDF liés dans les comptes rendus, la commande CoopSco et `home`, conserver leurs URL et résoudre explicitement les discordances éventuelles ; vérifier que les fichiers existent et correspondent aux sujets et années annoncés.
- [x] 2.2 Raccorder les images confirmées dans les pages associations et équipements ; vérifier que les images FCPE, Espace Jeunesse et ping-pong retenues correspondent aux contenus et disposent de textes alternatifs et dimensions cohérents.
- [x] 2.3 Raccorder les images confirmées dans les pages voyages et autres soutiens, et intégrer les autres médias pertinents aux contenus déjà présents ; vérifier chaque association visuellement et documenter tout emplacement sans correspondance plutôt que lui attribuer une image arbitraire.

## 3. Classement réversible

- [x] 3.1 Déplacer les ressources non retenues vers `not-used\docs` en préservant les chemins relatifs et sans écraser de destination existante ; vérifier au préalable l'absence de référence restante et ensuite l'égalité des empreintes avant et après déplacement.
- [x] 3.2 Finaliser l'inventaire et documenter dans le README le rôle de `src\docs` et de `not-used\docs` ; vérifier que chaque fichier initial a exactement une destination existante et que les motifs d'archivage distinguent obsolescence et correspondance non établie.

## 4. Recette de publication

- [x] 4.1 Exécuter `npm run check` avec les outils existants ; vérifier que le build, le SEO, les redirections et la couverture des routes restent conformes, en distinguant les anomalies préexistantes des régressions.
- [x] 4.2 Contrôler les références locales aux ressources importées dans les sources et dans `dist`, en décodant les URL si nécessaire ; vérifier qu'aucune cible ne manque, qu'aucune référence ne pointe vers `not-used` et qu'aucun fichier archivé ne subsiste à son ancienne destination publiée.
- [x] 4.3 Examiner les pages modifiées sur mobile et grand écran ; vérifier l'absence de déformation ou débordement des images, la pertinence des textes alternatifs et le fonctionnement des liens PDF, puis consigner la recette et les éventuelles correspondances non résolues dans l'inventaire.
