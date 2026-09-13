## Context

`npm run build` (script `scripts/build-static.mjs`) genere le site statique dans `dist/` a partir de `src/`, sans dependance externe au moment du build (pas de CMS, pas de rendu serveur). Le depot ne contient aujourd'hui aucun workflow GitHub Actions (`.github/workflows/` n'existe pas) ni de configuration GitHub Pages active. Voir proposal.md - Why pour la motivation.

## Goals / Non-Goals

**Goals:**
- Construire le site avec le pipeline existant (`npm run build`) sans le modifier.
- Publier un apercu par pull request, isole des autres apercus et du site de production, sur GitHub Pages.
- Rendre l'URL de l'apercu decouvrable directement depuis la pull request.
- Nettoyer automatiquement l'apercu quand la pull request se ferme.

**Non-Goals:**
- Ne modifie pas le pipeline de publication de production ni la capacite `static-site-publishing`.
- Ne met pas en place de protection par authentification sur les apercus (GitHub Pages public reste public).
- Ne couvre pas les pull requests venant de forks externes sans acces en ecriture aux secrets (limitation connue, voir Risques).

## Decisions

**Une seule branche `gh-pages`, un sous-dossier par PR.**
GitHub Pages ne sait servir qu'une seule source par depot (une branche, ou `/docs`, ou une Pages "environment" avec un seul deploiement actif a la fois pour le flux classique `actions/deploy-pages`). Pour isoler plusieurs apercus simultanes, on utilise une branche dediee `gh-pages` (source de Pages en mode "Deploy from a branch") et on publie le contenu de chaque PR dans un sous-dossier nomme d'apres son numero, par exemple `pr-<numero>/`. L'URL resultante est de la forme `https://<owner>.github.io/<repo>/pr-<numero>/`.
Alternative ecartee: utiliser l'action officielle `actions/deploy-pages` (deploiement Pages "environment-based"). Elle ne supporte qu'un seul artefact deploye a la fois par depot, donc chaque nouvelle PR ecraserait l'apercu de la precedente - incompatible avec l'isolation exigee par la spec.

**Action tierce `peaceiris/actions-gh-pages` (ou equivalent) pour publier dans un sous-dossier sans ecraser le reste de la branche.**
Cette action supporte un parametre de repertoire de destination (`destination_dir`) et un mode de conservation du contenu existant sur la branche cible, ce qui permet d'ajouter/mettre a jour le sous-dossier `pr-<numero>/` sans supprimer les autres sous-dossiers d'apercus deja publies.
Alternative ecartee: script git manuel (checkout de `gh-pages`, copie, commit, push) - plus verbeux et plus fragile a maintenir qu'une action mature dediee a cet usage, sans benefice fonctionnel supplementaire ici.

**Deux workflows distincts: construction/publication, et nettoyage.**
- `pages-preview.yml`, declenche sur `pull_request` (types `opened`, `synchronize`, `reopened`), execute `npm ci` + `npm run build`, puis publie `dist/` dans `pr-<numero>/` sur `gh-pages`.
- `pages-preview-cleanup.yml`, declenche sur `pull_request` (type `closed`, quel que soit `merged`), supprime le sous-dossier `pr-<numero>/` de la branche `gh-pages`.
Separer les deux evite de complexifier un seul workflow avec des branches conditionnelles fortement divergentes (build+deploy vs suppression) et suit le principe d'un declencheur clair par intention.

**Commentaire de PR mis a jour en place (upsert) plutot qu'un nouveau commentaire a chaque run.**
Une etape dediee (ex. `marocchino/sticky-pull-request-comment` ou script `gh pr comment --edit-last`) recherche un commentaire existant marque par un identifiant stable et le met a jour avec le lien d'apercu et le statut de la derniere construction, au lieu d'empiler un commentaire par push.
Alternative ecartee: utiliser uniquement un "check run" / statut de commit sans commentaire - moins visible pour les relecteurs humains dans l'interface de conversation de la PR; le design retient donc un commentaire, le statut de check restant un complement naturel deja fourni par l'affichage du workflow dans l'onglet "Checks".

**Permissions minimales du workflow.**
Le workflow de build/publication demande `contents: write` (pour pousser sur `gh-pages`) et `pull-requests: write` (pour commenter la PR); le workflow de nettoyage ne demande que `contents: write`. Aucun secret supplementaire au-dela du `GITHUB_TOKEN` fourni automatiquement n'est necessaire.

**Reecriture des chemins racine absolus (`/...`) en sortie de build, uniquement pour l'apercu.**
Les partials et pages de `src/` referencent leurs liens internes et leurs assets avec des chemins racine absolus (`href="/coopsco/"`, `src="/assets/site.css"`, y compris dans `src/assets/navigation.js`). Ce choix est correct pour la production, hebergee a la racine d'un domaine, mais casse tout sous un sous-chemin GitHub Pages comme `/<repo>/pr-<numero>/`: le navigateur resout `/assets/site.css` contre la racine du domaine, pas contre le sous-chemin de l'apercu. Plutot que de modifier `scripts/build-static.mjs` (partage avec la production, cf Non-Goals), le workflow `pages-preview.yml` execute un script dedie `scripts/rewrite-base-path.mjs` juste apres `npm run build`, qui reecrit dans `dist/` (fichiers `.html` et `.js`) tout chemin racine absolu (`href=`, `src=`, `action=`, et les entrees `href:` du menu genere par `navigation.js`) en le prefixant par le chemin de base de l'apercu (`/<repo>/pr-<numero>`).
Alternative ecartee: passer un `--base-path` a `scripts/build-static.mjs`/`render-templates.mjs` pour generer directement des liens prefixes - plus propre a terme, mais modifie le script de build partage avec la production, ce que ce changement s'interdit (Non-Goals).

## Risks / Trade-offs

- [Les apercus sont publics sur GitHub Pages sans authentification] → Accepte car le contenu source de `src/` est deja public dans le depot; pas d'information sensible additionnelle exposee par l'apercu.
- [`GITHUB_TOKEN` d'une PR issue d'un fork externe est en lecture seule et ne peut pas pousser sur `gh-pages`] → Documenter cette limite dans le workflow (etape qui echoue explicitement ou est ignoree pour les PR de forks) plutot que d'echouer silencieusement; l'automatisation reste garantie pour les PR internes au depot.
- [Accumulation possible de sous-dossiers `pr-<numero>/` si le nettoyage echoue ou si une PR est fermee sans declencher l'evenement `closed`] → Le workflow de nettoyage se declenche sur `closed` (fusionne ou non); en cas d'echec, le sous-dossier reste jusqu'a une purge manuelle - risque juge acceptable car sans impact sur la production.
- [Concurrence entre deux runs de build sur la meme PR (pushes rapproches)] → Utiliser la configuration de concurrence GitHub Actions (`concurrency: group: pr-preview-${{ github.event.pull_request.number }}`, `cancel-in-progress: true`) pour annuler un run obsolete au profit du plus recent.
- [La reecriture regex des chemins absolus peut manquer un motif non anticipe (ex. nouvel attribut ou nouvelle syntaxe introduite plus tard dans `src/`)] → Limiter la reecriture aux motifs connus et documentes (`href=`, `src=`, `action=`, `href:` dans `navigation.js`); un motif non couvert cassera un lien dans l'apercu sans affecter la production, risque juge acceptable et detectable visuellement lors de la revue de PR.

## Migration Plan

1. Activer GitHub Pages sur le depot avec la branche `gh-pages` comme source (creation de la branche vide si besoin, via une premiere execution du workflow).
2. Ajouter les workflows `pages-preview.yml` et `pages-preview-cleanup.yml` sous `.github/workflows/`.
3. Ouvrir une pull request de test pour valider bout en bout: build, publication, lien commente, puis fermeture et verification de la suppression du sous-dossier.
4. Aucune etape de rollback specifique requise: la suppression des workflows desactive la fonctionnalite sans affecter le site de production, qui ne depend pas de la branche `gh-pages`.
