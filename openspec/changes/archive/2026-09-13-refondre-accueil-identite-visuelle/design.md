## Context

Le site est une publication HTML/CSS statique assemblée depuis `src/` vers `dist/` par un build EJS. Les éléments communs sont déjà factorisés dans `src/_partials/`, tandis que l'accueil possède son contenu propre dans `src/home/index.html` et partage la feuille de style `src/assets/site.css`.

La motivation et le périmètre produit sont décrits dans `proposal.md`. Les comportements attendus sont définis dans les deltas `homepage-visual-redesign` et `site-visual-identity`.

## Goals / Non-Goals

**Goals:**

- Tester une identité visuelle nettement plus distinctive sur l'accueil avant toute extension au reste du site.
- Construire un système visuel réutilisable : variables, typographie, grille, rythme, surfaces, liens, boutons et états de focus.
- Donner à l'accueil un élément signature lié au FSE plutôt qu'un hero ou une grille de cartes génériques.
- Garder le HTML sémantique, les liens et les métadonnées compatibles avec le pipeline statique existant.
- Valider la composition sur mobile, bureau, clavier et avec la réduction des mouvements.

**Non-Goals:**

- Refondre immédiatement toutes les pages internes.
- Changer les URLs, le contenu éditorial de fond, le moteur EJS ou la chaîne de publication.
- Ajouter React, une bibliothèque CSS, un framework de composants, une police distante ou une API externe.
- Transformer l'accueil en tableau de bord applicatif ou en landing page marketing.

## Decisions

### Décision 1 : comparer plusieurs directions avant l'implémentation

La phase de conception commencera par deux ou trois pistes visuelles distinctes, chacune décrivant sa palette, sa typographie, sa composition, son élément signature et son risque principal. Une seule piste sera retenue avant toute modification de `src/`.

Cette étape évite de retomber sur la palette bleu/or actuelle ou sur une composition générique par inertie. Elle rend le choix visuel discutable et permet de relier le design au public du FSE.

Alternative écartée : commencer directement par des retouches CSS. Cette approche améliore des détails sans garantir un changement d'identité perceptible.

#### Pistes comparées

- **Carnet d'actions** : ivoire, encre vert forêt, corail et vert feuille ; titres éditoriaux en Georgia disponible localement ; composition en une grande introduction, une annotation d'actualité et trois chemins numérotés ; signature sous forme de sceau « FSE x CoopSco ». Risque : le ton papier peut devenir décoratif s'il prend le pas sur les liens.
- **Cour de récré** : jaune craie, bleu outremer et rouge signal ; typographie système très grasse ; composition en panneaux asymétriques et bandeau d'annonces ; signature sous forme de marge quadrillée. Risque : contraste trop ludique pour les documents et actualités institutionnelles.
- **Atelier commun** : blanc cassé, orange terre cuite et bleu pétrole ; titres condensés simulés par une pile locale ; composition en index de projets avec onglets ; signature sous forme de ligne de progression des actions. Risque : ressembler à un tableau de bord et réduire la place du message d'accueil.

La piste **Carnet d'actions** est retenue : elle relie la lecture aux projets concrets du collège, introduit une rupture nette avec le bleu/or existant et reste réalisable sans image, police distante ou JavaScript supplémentaire.

### Décision 2 : concentrer la rupture sur l'accueil et le système partagé minimal

L'accueil sera la surface pilote. Les variables et composants génériques seront ajustés dans `site.css`, et les partials communs ne seront modifiés que si l'accueil ne peut pas exprimer la direction choisie autrement.

Alternative écartée : modifier toutes les pages en une seule passe. Cela augmenterait le risque de régression et empêcherait d'évaluer clairement la nouvelle direction avant son extension.

### Décision 3 : privilégier les ressources locales et la typographie disponible

La refonte utilisera les assets déjà présents et les polices disponibles localement ou via une pile de repli vérifiée. Toute nouvelle image ou police devra être stockée dans le dépôt, documentée par sa licence et évaluée pour son poids.

Alternative écartée : charger une police ou des images depuis un CDN. Cela ajoute une dépendance réseau, fragilise le rendu autonome de `dist/` et complique la vérification des licences.

### Décision 4 : préserver la structure éditoriale avant les effets

Le HTML de l'accueil conservera un `h1` pertinent, des sections sémantiques, des liens explicites et un ordre de lecture utile sans CSS. Le caractère audacieux viendra d'abord de la composition, de la typographie et d'un élément signature, non d'animations ou d'effets indispensables au sens.

Alternative écartée : construire une expérience principalement animée ou pilotée par JavaScript. Elle dégraderait le no-JavaScript, l'accessibilité et la robustesse du site statique.

### Décision 5 : travailler sur une branche dédiée lors de l'application

La branche `refonte-accueil-identite-visuelle` sera créée au début de la phase d'application, avant toute modification du code. La proposition actuelle ne crée pas cette branche, conformément à la frontière de planification du workflow.

### Tokens de la piste retenue

- **Couleurs** : encre `#183b35`, corail `#ef6b55`, fond ivoire `#fffdf7`, papier `#f1eee5`, vert feuille `#dfeae1` et texte `#1d2825`.
- **Typographie** : pile système locale pour la lecture ; titres larges, sobres et responsifs ; libellés en capitales espacées pour les repères éditoriaux.
- **Grille et rythme** : conteneur existant, introduction en deux colonnes sur bureau puis empilement mobile, alerte sur une ligne puis trois cartes à largeur égale ; espacements en multiples de `0.5rem`.
- **Surfaces** : rayon court de `8px`, bordures fines, aplats papier différenciés et ombres réservées au cadre principal.
- **États** : liens soulignés, flèches textuelles compréhensibles sans couleur seule, focus visible conservé par les règles partagées et mouvements neutralisés avec `prefers-reduced-motion`.

## Risks / Trade-offs

- [Une rupture visuelle trop forte peut réduire la familiarité du site] -> Conserver des libellés explicites, une navigation stable et les repères de contenu du FSE ; tester avec un parcours de visiteur nouveau.
- [La composition signature peut devenir décorative ou fragile sur mobile] -> Concevoir d'abord une version mobile lisible, puis vérifier les largeurs 320px, 375px et bureau avant d'ajouter les traitements de bureau.
- [Une nouvelle palette peut diminuer le contraste] -> Vérifier les contrastes des textes et états interactifs, puis conserver des focus visibles et des alternatives non chromatiques.
- [La refonte de la feuille de style peut affecter des pages internes] -> Isoler les règles spécifiques à l'accueil, vérifier les sélecteurs partagés et exécuter `npm run check` après chaque étape significative.
- [Les assets locaux peuvent alourdir le build] -> Limiter leur nombre et leur poids, préférer les formats adaptés et vérifier que le build reste autonome et reproductible.

## Migration Plan

1. Créer la branche `refonte-accueil-identite-visuelle` sans modifier la branche de référence.
2. Examiner l'accueil et les composants CSS existants, puis documenter deux ou trois pistes visuelles.
3. Retenir une piste et définir ses tokens de couleur, typographie, grille, surfaces et interactions.
4. Modifier les sources sous `src/`, en commençant par l'accueil et sans éditer `dist/` directement.
5. Exécuter `npm run build`, `npm run check` et une prévisualisation locale.
6. Contrôler la page au clavier, avec réduction des mouvements, sur mobile et sur bureau ; examiner des captures avant/après.
7. Comparer le rendu et les contrats SEO avec l'état précédent.
8. En cas de rejet de la direction, supprimer ou réviser les changements uniquement sur la branche dédiée ; la branche de référence reste inchangée.

## Validation finale

- Les captures HTTP avant/après montrent une rupture nette : l'accueil passe d'une carte institutionnelle bleu/or à un carnet éditorial ivoire, vert forêt et corail, avec le sceau FSE x CoopSco comme élément signature.
- Le système ne dépend d'aucun nouvel asset, d'aucune police distante ou d'un service externe. La marge quadrillée et les aplats colorés sont des traitements CSS supprimables sans perte d'information.
- Les libellés restent explicites et les parcours prioritaires sont plus directs. Le principal compromis est une navigation mobile volontairement dense, héritée du composant partagé, mais sans débordement horizontal.
- Les vérifications à 320px, 375px et 1280px confirment l'absence de débordement sur `/` et `/home/`. Le focus clavier est visible et la règle `prefers-reduced-motion` est présente dans la feuille de style.
- `npm run build` et `npm run check` passent ; `dist/` est généré mais aucun fichier sous `dist/` n'est modifié comme source.

## Open Questions

Aucune question bloquante ne reste pour la proposition. Le choix final de la palette, de la typographie et de l'élément signature sera fait entre les pistes de la passe de conception, avant l'application.
