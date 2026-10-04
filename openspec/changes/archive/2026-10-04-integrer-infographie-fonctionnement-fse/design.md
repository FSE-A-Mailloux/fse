## Context

Voir `proposal.md` pour la motivation et `specs/site-visual-identity/spec.md` pour le contrat fonctionnel. La page « FSE - Vue d'ensemble » est produite depuis `src/fse/index.html` ; les pages utilisent les partials EJS sous `src/_partials/` et la feuille `src/assets/site.css`. Le flyer fournit le contenu et une composition en étoile, mais son texte ne doit pas être emprisonné dans une image.

## Goals / Non-Goals

**Goals:**
- Insérer l'infographie dans la page de présentation sans modifier son URL, ses métadonnées ni les sections existantes, et ne pas la dupliquer sur l'accueil.
- Conserver la définition et les cinq actions comme contenu HTML sémantique, dans un ordre de lecture logique.
- Évoquer la composition du flyer avec une palette vert menthe et framboise propre à l'infographie, tout en préservant les conventions de l'accueil et l'adaptation aux petits écrans.

**Non-Goals:**
- Reproduire à l'identique toutes les illustrations ou la mise en page du document imprimé.
- Remplacer le PDF, créer une nouvelle page de navigation ou ajouter une dépendance, une police ou un service externe.

## Decisions

- **Intégrer le contenu à `src/fse/index.html`.** À la demande de l'utilisateur, l'infographie appartient à la vue d'ensemble du FSE. Elle n'est incluse ni sur l'accueil ni sur « Qui sommes-nous ? » ; les autres contenus des pages sont conservés.
- **Isoler le balisage de l'infographie dans un partial EJS.** Cette approche suit les inclusions déjà employées par le site et garde le contenu réutilisable et lisible. Le partial est inclus après l'introduction, avant les repères chiffrés et les missions.
- **Composer une représentation HTML/CSS plutôt qu'une image du flyer.** Structurer la définition comme un bloc introductif, puis les cinq raisons d'agir comme une liste de cartes ou de points reliés visuellement à « Pourquoi ? ». Garder les textes dans le HTML et traiter les ornements éventuels comme décoratifs.
- **Réordonner la composition selon la largeur disponible.** Utiliser une composition répartie sur grand écran et une pile verticale à largeur mobile, sans dépendre de connecteurs graphiques pour transmettre le sens. Réutiliser les variables et styles partagés existants ; n'ajouter aucun chargement externe.
- **Retouche ludique inspirée du flyer, choisie par l'utilisateur.** Limiter la palette menthe/framboise à l'infographie, avec un fond pêche décoratif, des flèches courbes et des contours arrondis légèrement inclinés sur bureau. Garder le corps du texte dans la police du site ; réserver une police manuscrite disponible localement, avec repli système, aux questions. Supprimer les inclinaisons des blocs sur mobile, sans animation ni ressource distante.

## Risks / Trade-offs

- [Une composition décorative peut masquer ou désordonner le contenu] → Garder le flux DOM dans l'ordre définition puis actions, et vérifier la lecture sans CSS et au clavier.
- [Les libellés longs peuvent provoquer un débordement à 320px] → Laisser les cartes se réorganiser et les textes revenir à la ligne, puis vérifier la largeur mobile minimale prévue.
- [La palette du flyer peut détonner avec l'accueil actuel] → La limiter à la section infographique et conserver la typographie de lecture, les espacements et la structure du site.

## Migration Plan

Aucune migration n'est nécessaire. Le changement est additif dans le HTML/CSS de la page de présentation ; son retrait consiste à supprimer l'inclusion et les styles propres à l'infographie.
