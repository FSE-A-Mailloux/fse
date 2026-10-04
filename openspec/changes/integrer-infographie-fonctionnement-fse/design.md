## Context

Voir `proposal.md` pour la motivation et `specs/homepage-visual-redesign/spec.md` pour le contrat fonctionnel. L'accueil public est produit depuis `src/index.html` ; les pages utilisent les partials EJS sous `src/_partials/` et la feuille `src/assets/site.css`. Le flyer fournit le contenu et une composition en étoile, mais son texte ne doit pas être emprisonné dans une image.

## Goals / Non-Goals

**Goals:**
- Insérer l'infographie dans l'accueil public sans modifier son URL, ses métadonnées ni les sections existantes.
- Conserver la définition et les cinq actions comme contenu HTML sémantique, dans un ordre de lecture logique.
- Évoquer la composition du flyer tout en reprenant les conventions visuelles de l'accueil et en adaptant la disposition aux petits écrans.

**Non-Goals:**
- Reproduire à l'identique toutes les illustrations ou la mise en page du document imprimé.
- Remplacer le PDF, créer une nouvelle page de navigation ou ajouter une dépendance, une police ou un service externe.

## Decisions

- **Intégrer le contenu à la page canonique `src/index.html`.** L'accueil public a son URL canonique à la racine ; une section intégrée rend l'infographie immédiatement visible sans ajouter de parcours ou de page.
- **Isoler le balisage de l'infographie dans un partial EJS.** Cette approche suit les inclusions déjà employées par l'accueil et garde le contenu réutilisable et lisible. Le partial sera inclus dans le contenu principal après le hero, avant les sections d'accès et d'actualités.
- **Composer une représentation HTML/CSS plutôt qu'une image du flyer.** Structurer la définition comme un bloc introductif, puis les cinq raisons d'agir comme une liste de cartes ou de points reliés visuellement à « Pourquoi ? ». Garder les textes dans le HTML et traiter les ornements éventuels comme décoratifs.
- **Réordonner la composition selon la largeur disponible.** Utiliser une composition répartie sur grand écran et une pile verticale à largeur mobile, sans dépendre de connecteurs graphiques pour transmettre le sens. Réutiliser les variables et styles partagés existants ; n'ajouter aucun chargement externe.

## Risks / Trade-offs

- [Une composition décorative peut masquer ou désordonner le contenu] → Garder le flux DOM dans l'ordre définition puis actions, et vérifier la lecture sans CSS et au clavier.
- [Les libellés longs peuvent provoquer un débordement à 320px] → Laisser les cartes se réorganiser et les textes revenir à la ligne, puis vérifier la largeur mobile minimale prévue.
- [Une imitation trop littérale du flyer peut détonner avec l'accueil actuel] → Reprendre seulement ses repères éditoriaux et une composition en étoile, en conservant la palette et les conventions de l'accueil.

## Migration Plan

Aucune migration n'est nécessaire. Le changement est additif dans le HTML/CSS de l'accueil ; son retrait consiste à supprimer l'inclusion et les styles propres à l'infographie.
