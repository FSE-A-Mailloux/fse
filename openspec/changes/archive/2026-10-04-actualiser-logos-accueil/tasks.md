## 0. Branche dédiée

- [x] 0.1 Avant toute modification d'implémentation, examiner `git status` et la branche courante, puis créer et basculer sur `feat/actualiser-logos-accueil` depuis la branche de base du projet ; préserver tous les changements locaux existants et vérifier le nom de la branche avec `git branch --show-current`. Si cette branche existe déjà, vérifier son origine et son contenu avant de la réutiliser, sans la réinitialiser ni l'écraser.

## 1. Ressources et périmètre

- [x] 1.1 Vérifier les dimensions, le poids et la provenance des deux images fournies dans `src/docs/images/site/` ; confirmer qu'elles correspondent aux pièces jointes et conserver les originaux sans altérer leurs couleurs ni leurs proportions.
- [x] 1.2 Recenser les usages de `/assets/logo-fse.png` et des classes de la figure actuelle ; confirmer les deux accueils concernés et laisser les usages hors périmètre inchangés.
- [x] 1.3 Déplacer uniquement les deux logos fournis de `src/docs/images/site/` vers `src/assets/logos/`, sans écraser l'ancien `src/assets/logo-fse.png` ; vérifier l'identité des fichiers avant et après déplacement, leur absence aux emplacements sources et l'absence de déplacement des autres images et PDF. Recenser et mettre à jour leurs éventuelles références ; si les anciennes URL ont déjà été publiées, préserver leur accès avec le mécanisme de compatibilité existant.

## 2. Intégration des logos

- [x] 2.1 Remplacer la figure unique dans `src/index.html` et `src/home/index.html` par le duo FSE puis CoopSco utilisant `/assets/logos/logo-fse.png` et `/assets/logos/logo-coopsco.png`, des textes alternatifs distincts et les dimensions intrinsèques vérifiées ; contrôler dans les deux sources que l'ancien logo n'est plus référencé et que les titres, métadonnées, contenus et liens sont préservés.
- [x] 2.2 Adapter les règles du bloc visuel dans `src/assets/site.css` pour un duo vertical sur bureau et côte à côte après le passage sur une colonne, sans rotation ni ombre décalée ; vérifier que les deux images restent entières, de dimensions comparables et sans débordement.

## 3. Validation de la publication et du rendu

- [x] 3.1 Exécuter `npm run build` puis `npm run check` et corriger toute régression causée par le changement dans les sources ; confirmer la réussite des contrôles et la présence des deux ressources locales dans le site généré sans édition manuelle de `dist/`.
- [x] 3.2 Prévisualiser avec `npm run preview` et contrôler `/` et `/home/` à 320px, 375px, 768px et 1280px ; confirmer l'absence de défilement horizontal et de chevauchement, la visibilité complète des logos et l'équilibre avec le titre, l'introduction et l'accès principal.
- [x] 3.3 Contrôler les deux pages au clavier, sans CSS et avec les images désactivées ; confirmer les focus existants, l'ordre de lecture, les alternatives identifiant les deux structures et l'absence de nouvelle interaction.
- [x] 3.4 Vérifier le chargement local des deux images aux URL `/assets/logos/logo-fse.png` et `/assets/logos/logo-coopsco.png` dans le navigateur et examiner le diff final ; confirmer que les ressources fournies sont incluses dans les fichiers à livrer sous `src/assets/logos/` et qu'aucune modification hors périmètre n'est introduite.
