## 1. Logique de rendu du sous-menu

- [x] 1.1 Modifier `renderSecondaryMenu` dans `src/assets/navigation.js` pour vider `#secondary-nav` (`container.innerHTML = ""` et sortie anticipée) lorsque `config.items.length <= 1`, et vérifier que la fonction ne génère plus de lien unique dans ce cas
- [x] 1.2 Vérifier que les sections à plusieurs pages (FSE, Actualités, CoopSco) continuent de générer leur liste de liens sans changement de comportement

## 2. Vérification manuelle des pages concernées

- [x] 2.1 Lancer le serveur local (`node scripts/serve-static.mjs` ou équivalent existant) et ouvrir `/home/`, `/sitemap/`, `/liens-avec-les-associations/`, `/nous-contacter/` et `/fonctionnalites-retirees/` pour confirmer l'absence de sous-menu secondaire affiché
- [x] 2.2 Ouvrir une page de chacune des sections `FSE`, `Actualités`, `CoopSco` (ex. `/fse/`, `/actualites/`, `/coopsco/`) pour confirmer que leur sous-menu secondaire s'affiche toujours normalement

## 3. Validation OpenSpec

- [x] 3.1 Exécuter `npx openspec validate supprimer-sous-menu-redondant-accueil --strict` et vérifier qu'il n'y a aucune erreur
