## 1. Preparation du depot

- [x] 1.1 Activer GitHub Pages sur le depot avec la branche `gh-pages` comme source, et verifier que la page de parametres Pages affiche cette source comme active
- [x] 1.2 Creer la branche `gh-pages` vide (ou avec un fichier `.gitkeep`) si elle n'existe pas encore, et verifier qu'elle apparait dans `git branch -r`

## 2. Workflow de construction et publication de l'apercu

- [x] 2.1 Creer `.github/workflows/pages-preview.yml` declenche sur `pull_request` (`opened`, `synchronize`, `reopened`), avec permissions `contents: write` et `pull-requests: write`, et verifier qu'il se declenche a l'ouverture d'une PR de test
- [x] 2.2 Ajouter les etapes `checkout`, `setup-node`, `npm ci`, `npm run build` dans ce workflow, et verifier que `dist/` est genere sans erreur dans les logs du run
- [x] 2.3 Ajouter l'etape de publication de `dist/` vers la branche `gh-pages` dans le sous-dossier `pr-<numero>/` (action de type `peaceiris/actions-gh-pages` avec `destination_dir` et conservation du contenu existant), et verifier que le sous-dossier apparait sur la branche `gh-pages` apres le run
- [x] 2.4 Ajouter la configuration de concurrence (`concurrency: group: pr-preview-${{ github.event.pull_request.number }}`, `cancel-in-progress: true`), et verifier qu'un second push annule le run precedent encore en cours pour la meme PR
- [ ] 2.5 Verifier que deux pull requests ouvertes simultanement produisent bien deux sous-dossiers distincts sur `gh-pages` sans que l'un n'ecrase l'autre

## 3. Lien d'apercu sur la pull request

- [x] 3.1 Ajouter une etape qui calcule l'URL de l'apercu (`https://<owner>.github.io/<repo>/pr-<numero>/`) et l'affiche dans le resume du run
- [x] 3.2 Ajouter une etape de commentaire de PR en upsert (identifiant stable) publiant ce lien, et verifier qu'un seul commentaire est cree puis mis a jour a chaque nouveau push sur la meme PR
- [ ] 3.3 Verifier qu'un echec de `npm run build` empeche la publication du lien comme reussi et rend l'echec visible sur la pull request (statut de check en echec)

## 4. Workflow de nettoyage

- [x] 4.1 Creer `.github/workflows/pages-preview-cleanup.yml` declenche sur `pull_request` de type `closed`, avec permissions `contents: write`
- [x] 4.2 Ajouter les etapes qui suppriment le sous-dossier `pr-<numero>/` correspondant sur la branche `gh-pages` et poussent le commit de suppression
- [ ] 4.3 Verifier, en fermant une pull request de test sans la fusionner, que son sous-dossier `pr-<numero>/` disparait de `gh-pages`
- [ ] 4.4 Verifier, en fusionnant une autre pull request de test, que son sous-dossier `pr-<numero>/` disparait egalement de `gh-pages` sans impact sur le contenu de production

## 5. Documentation

- [x] 5.1 Documenter dans le README (ou `docs/`) le fonctionnement des apercus de PR (declenchement, URL, duree de vie), et verifier que la section est presente et coherente avec le comportement observe

## 6. Reecriture des chemins racine absolus pour l'apercu

- [x] 6.1 Creer `scripts/rewrite-base-path.mjs` qui reecrit, dans `dist/` (fichiers `.html` et `.js`), les chemins racine absolus (`href="/..."`, `src="/..."`, `action="/..."`, `href: "/..."` dans `navigation.js`) en les prefixant par un chemin de base fourni en argument, et verifier sur un dossier `dist/` de test que les occurrences sont correctement prefixees sans doublon ni alteration des URLs externes (`http(s)://...`, `//...`)
- [x] 6.2 Appeler ce script dans `pages-preview.yml` juste apres `npm run build`, avec `/<repo>/pr-<numero>` comme chemin de base, et verifier dans les logs du run que la reecriture s'execute sans erreur avant la publication
- [ ] 6.3 Verifier manuellement, sur l'URL d'un apercu publie, que la feuille de style, le script de navigation et les liens internes se chargent et pointent correctement vers le sous-chemin de l'apercu (plus de 404 sur les assets ni de liens renvoyant vers la racine du domaine)
