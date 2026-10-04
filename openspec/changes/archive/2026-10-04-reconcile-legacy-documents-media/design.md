## Context

Voir `proposal.md` pour la motivation. L'examen initial couvre 21 pages HTML et 71 ressources importées : 47 PDF et 24 images. Les liens PDF existants concernent les comptes rendus, les statuts, la commande 2026-2027 et un flyer 2025-2026 dans `home`. Huit images utilisent encore `/assets/missing-image.svg` : FCPE, Espace Jeunesse, ping-pong, Incorruptibles et quatre voyages.

Le build actuel rend les pages et copie le reste de `src` vers `dist`. Un dossier d'archives dans `src` serait donc publié. Les fichiers importés sont déjà en partie indexés dans Git : préserver ces ajouts et ne pas réinitialiser l'index. Les noms des images de voyages ne suffisent pas tous à identifier leur contexte.

## Goals / Non-Goals

**Objectifs :** rendre les choix de classement réversibles et vérifiables, restaurer les médias confirmés dans les composants existants, distinguer une ressource sans usage d'une ressource simplement ancienne.

**Hors périmètre :** refonte graphique, changement des routes, réécriture générale des pages, création d'archives publiques de fournitures, récupération de nouvelles ressources sur Internet, compression ou renommage systématique des fichiers, modification de l'architecture de build.

## Decisions

### 1. Construire une matrice exhaustive avant tout déplacement

Créer `docs\legacy-resource-inventory.md` pendant l'implémentation, avec une ligne par fichier : origine, destination, pages utilisatrices, décision et justification. Ajouter la liste des pages examinées et des emplacements non résolus. Relever au départ les tailles et empreintes SHA-256 pour comparer le lot avant et après les déplacements.

Analyser les références HTML, EJS et CSS, y compris les chemins encodés, puis lire le contenu des pages. Inspecter visuellement les images et consulter les PDF utiles à l'identification avec les moyens locaux disponibles. L'analyse automatique des références seule serait insuffisante : les images manquantes ne portent plus leur chemin d'origine.

### 2. Distinguer les candidats des correspondances confirmées

Les candidats évidents sont `FCPE.jpg`, `EspaceJeunesse.jpg`, `tables_pingpong.jpg` et `Barcelone.jpg`. Ils restent à confirmer par leur contenu. Comparer les affiches et sélections des Incorruptibles au contexte de la page ; examiner individuellement les photos génériques pour Bordeaux, l'Italie et l'Allemagne.

Conserver tous les PDF actuellement référencés, y compris les anciens PV et statuts. Ne pas remplacer le flyer de `home` par un document plus récent sans vérifier le contenu et le libellé. Signaler les discordances factuelles nécessitant une décision éditoriale. Un fichier non référencé peut être utilisé s'il illustre réellement un contenu déjà présent ; ne pas imposer une galerie ou réintroduire une ancienne campagne uniquement pour le garder.

Alternative rejetée : décider seulement d'après les noms ou les années, ce qui pourrait associer une mauvaise photographie ou retirer un compte rendu historique encore utile.

### 3. Archiver hors de la source publiée

Déplacer les fichiers non retenus de `src\docs\<chemin>` vers `not-used\docs\<chemin>` à la racine du dépôt. Préserver exactement l'arborescence et les octets. Vérifier l'absence de référence résiduelle et de collision avant chaque déplacement ; ne jamais écraser une destination différente.

Les incertitudes sans référence actuelle peuvent être archivées avec un motif explicite « correspondance non établie », sans affirmer que la ressource est obsolète. Le dossier reste versionnable mais hors du build, sans règle d'exclusion supplémentaire.

Alternative rejetée : suppression définitive ou dossier `src\not-used`, qui ferait respectivement perdre le corpus ou publier les archives.

### 4. Conserver les composants et URL utiles

Modifier uniquement les références et les adaptations éditoriales directement nécessaires, en réutilisant les figures et cartes existantes. Ajuster les dimensions intrinsèques et les textes alternatifs selon l'image retenue ; préserver le ratio et la lisibilité mobile. Garder les noms de fichiers et URL des documents conservés, y compris leurs caractères accentués.

Ne pas modifier les images externes déjà utilisées, le logo courant ou l'image générique de remplacement dans le cadre de ce lot, sauf nécessité directement établie.

### 5. Utiliser les contrôles existants et une recette ciblée

Exécuter le build et les contrôles existants. Compléter par un contrôle local des références aux ressources importées dans les sources et la sortie, une comparaison des empreintes et un contrôle de l'absence d'archives publiées. Les contrôles SEO et de couverture actuels ne valident pas à eux seuls l'existence des PDF et images.

Ne pas ajouter de dépendance ni de nouvel outil de test. Documenter les commandes de recette et résultats du rapprochement dans l'inventaire. Examiner le rendu des pages modifiées à petite et grande largeur.

## Risks / Trade-offs

- [Photos génériques difficiles à identifier] → inspection visuelle et contexte textuel ; archivage motivé plutôt qu'association spéculative.
- [PDF lié mais manquant ou contenu discordant] → signaler précisément l'anomalie et résoudre avec une source confirmée ou une décision utilisateur, sans lien de remplacement arbitraire.
- [Chemins accentués ou encodés] → conserver les noms et vérifier la résolution des URL décodées dans la sortie.
- [Archives encore servies depuis une ancienne publication] → régénérer et publier l'artefact complet ; vérifier l'absence des fichiers déplacés dans la nouvelle sortie.
- [Ajouts déjà indexés ou changements concurrents] → limiter les opérations aux ressources inventoriées et ne pas réinitialiser ni réindexer globalement le dépôt.

## Migration Plan

1. Relever l'inventaire initial et les empreintes, puis confirmer les correspondances.
2. Raccorder les ressources retenues et consigner les décisions.
3. Déplacer uniquement les ressources sans référence restante vers les destinations vérifiées.
4. Générer l'artefact et effectuer la recette ; compléter l'inventaire et la documentation de rangement.
5. Publier l'artefact complet selon le processus existant.

Retour arrière : restaurer les références des seules pages modifiées et déplacer les fichiers archivés vers leurs chemins d'origine en suivant la matrice ; ne pas annuler les changements utilisateur préexistants.
