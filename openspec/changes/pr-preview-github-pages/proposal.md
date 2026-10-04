## Why

Aujourd'hui, valider visuellement une pull request impose de construire le site statique en local (`npm run build`) et de le servir soi-meme. Il n'existe aucun apercu partageable en ligne pour relire une PR, ce qui ralentit la revue et augmente le risque de regressions non detectees avant fusion. Automatiser la generation et la publication d'un apercu par PR via la CI GitHub permettrait a n'importe quel relecteur d'ouvrir le site genere sans installation locale.

## What Changes

- Ajout d'un workflow GitHub Actions declenche sur les evenements `pull_request` (ouverture, mise a jour, reouverture) qui execute `npm run build` pour generer le site statique dans `dist/`.
- Publication du resultat de build sur GitHub Pages, dans un emplacement dedie et isole par PR (par exemple un sous-chemin ou une branche de deploiement nommee d'apres le numero de PR), sans ecraser l'apercu d'une autre PR ni le site de production.
- Publication automatique d'un lien vers l'apercu (commentaire de PR ou statut de check) pointant vers l'URL GitHub Pages correspondante, mis a jour a chaque nouveau push sur la PR.
- Ajout d'un workflow (ou d'une etape) de nettoyage qui supprime l'apercu publie lorsque la PR est fermee ou fusionnee, afin d'eviter l'accumulation d'apercus obsoletes sur GitHub Pages.
- **BREAKING**: aucun impact sur le site de production existant; le changement est additif et scope au flux de revue de PR.

## Capabilities

### New Capabilities
- `pr-preview-deployment`: comportement requis pour construire et publier automatiquement, via la CI GitHub, un apercu statique isole par pull request sur GitHub Pages, incluant son exposition (lien) et son nettoyage a la fermeture de la PR.

### Modified Capabilities
- Aucune capacite existante ne voit ses exigences changer: `static-site-publishing` couvre la publication de production et n'est pas modifiee par cet ajout d'un canal d'apercu de revue.

## Impact

- Nouveau code: workflow(s) GitHub Actions sous `.github/workflows/` (build + deploiement d'apercu, nettoyage a la fermeture de PR).
- Dependances: utilisation de `npm run build` existant (aucun changement du pipeline de build lui-meme) et de l'action GitHub Pages / deploiement (a choisir en design).
- Configuration du depot: activation de GitHub Pages comme source de deploiement (branche ou environnement dedie), et permissions du workflow (`GITHUB_TOKEN` ou action tierce) pour publier des pages et commenter les PR.
- Aucun impact sur `src/`, sur le contenu publie en production, ni sur les specs `static-site-publishing` ou `static-site-source-freeze`.
