---
name: frontend-design-fse
description: "À utiliser pour refondre, concevoir, moderniser ou corriger l'interface visuelle du site FSE dans src, notamment HTML, CSS et partials EJS, avec une direction distinctive tout en respectant le site statique, le SEO et le responsive."
---

# Design frontend du site FSE

Cette skill guide les évolutions visuelles du site du Foyer socio-éducatif. Elle s'applique aux fichiers de source sous `src/`, en particulier `src/assets/site.css`, les pages HTML et les partials EJS.

## Autorité des règles

Respecter cet ordre de priorité :

1. La demande explicite de l'utilisateur.
2. Les contraintes et conventions du dépôt, notamment le README, les specs OpenSpec et le fonctionnement `src/` -> `dist/`.
3. L'accessibilité, la lisibilité, le responsive et le SEO.
4. Les principes de cette skill.

Ne pas transformer le site statique en application frontend. Ne pas introduire React, une bibliothèque CSS, une police externe, une dépendance npm ou un appel réseau sans demande explicite et justification vérifiable.

## Avant de modifier le style

- Identifier la page, le partial ou le sélecteur qui possède réellement le comportement.
- Lire les variables et les composants voisins dans `src/assets/site.css` avant d'ajouter une règle.
- Préserver les contenus, URLs, balises SEO, liens de navigation et structure HTML existants, sauf demande contraire.
- Formuler une direction visuelle courte et concrète : public concerné, objectif de la page, palette, typographie, rythme et élément distinctif.
- Identifier s'il s'agit d'une retouche, d'une modernisation ou d'une refonte. Une refonte autorise et encourage une évolution nette de la palette, de la typographie, de la composition et de la navigation, sans sacrifier les contraintes fonctionnelles.
- Pour une retouche simple, prolonger les conventions existantes. Ne pas imposer le processus de refonte à une correction locale.

## Processus de refonte

Pour une refonte ou une demande explicitement audacieuse, travailler en deux passes.

### Passe 1 : parti pris avant le code

Présenter brièvement deux ou trois pistes réellement différentes, puis en retenir une. Chaque piste doit préciser :

- une idée directrice liée au FSE, à l'établissement et à son public ;
- une palette de 4 à 6 couleurs nommées avec leurs rôles ;
- les familles typographiques et leur hiérarchie ;
- le principe de composition et de navigation ;
- l'élément signature qui rendra le site reconnaissable ;
- un risque assumé et la manière de le contenir sur mobile et pour l'accessibilité.

Avant de coder, éliminer toute proposition qui pourrait convenir sans changement à un site d'association, une mairie, un SaaS ou une landing page générique. La direction choisie doit pouvoir être résumée par une phrase spécifique au site FSE, pas par « moderne, épuré et professionnel ».

### Passe 2 : réalisation et critique

- Construire d'abord le système visuel : variables, typographie, grille, rythme vertical, surfaces, liens, boutons et états interactifs.
- Dépenser l'audace dans un élément principal identifiable : composition éditoriale, traitement typographique, navigation, contraste chromatique ou relation particulière aux images. Garder le reste discipliné.
- Éviter les recettes automatiques : hero centré avec dégradé, cartes identiques empilées, ombres molles partout, pastilles, titres en capitales, monospace décorative, badges numérotés ou animations de révélation sur chaque bloc.
- Ces éléments restent possibles uniquement s'ils découlent du contenu et de la direction choisie, jamais comme décoration par défaut.
- Après une première implémentation, formuler une critique courte : ce qui est distinctif, ce qui ressemble encore à un modèle générique, ce qui peut être supprimé et ce qui nuit à la compréhension.
- Vérifier que le parti pris reste lisible sans CSS, compréhensible par un nouveau visiteur et stable sur mobile.

## Direction visuelle

Le site doit être accueillant, fiable et lisible pour des familles, élèves, personnels et partenaires d'un établissement scolaire. Les choix visuels doivent servir l'information et la navigation avant l'effet décoratif.

- Utiliser les variables CSS existantes avant d'en créer de nouvelles.
- Conserver une hiérarchie claire entre en-tête, navigation, contenu, appels à l'action et pied de page.
- Employer une palette contrastée et limitée ; vérifier les états `hover`, `focus-visible`, actif et désactivé.
- Choisir la typographie pour sa lisibilité en français et sa disponibilité locale. Ne pas charger une ressource distante par défaut.
- Réserver les effets marqués à un seul élément ou à une fonction identifiable. Éviter les gradients, ombres, cartes et bordures décoratifs sans rôle.
- Ne pas appliquer mécaniquement une esthétique de landing page, de tableau de bord ou de design system SaaS à une page informative.
- Pour une refonte, ne pas confondre sobriété et neutralité : le site peut être expressif, éditorial, coloré ou surprenant si le choix sert son sujet et reste lisible.
- Faire du site FSE un objet visuel identifiable. La singularité doit venir de choix cohérents et répétés, pas d'une accumulation d'effets.
- Garder les libellés en français, explicites et orientés vers l'action. Ne pas ajouter de texte décoratif ou de slogans génériques.

## HTML, CSS et EJS

- Modifier la source dans `src/`, jamais `dist/` directement.
- Utiliser les partials existants pour les éléments communs ; ne pas dupliquer l'en-tête, la navigation ou le pied de page.
- Préférer des éléments HTML sémantiques et des classes explicites aux sélecteurs fragiles ou aux styles inline.
- Préserver une spécificité CSS maîtrisable et vérifier les interactions avec les règles existantes.
- Ne pas utiliser JavaScript pour une interaction qui peut rester accessible en HTML/CSS.
- Pour les contrôles iconographiques, fournir un nom accessible ou un texte visible ; ne pas remplacer une action claire par une icône seule.

## Responsive et accessibilité

Vérifier au minimum les largeurs mobile et bureau, les retours à la ligne, les menus, les tableaux, les boutons et les liens longs.

- Le contenu ne doit pas déborder horizontalement sur mobile.
- Les zones interactives doivent rester utilisables au clavier et afficher un focus visible.
- Le contraste doit rester lisible dans tous les états.
- Respecter `prefers-reduced-motion` et limiter les animations non déclenchées par l'utilisateur.
- Ne pas transmettre une information uniquement par la couleur, la position ou une animation.
- Ne pas réduire la taille de texte de base sous les conventions déjà établies du site.

## SEO et contenu

Toute évolution visuelle doit préserver :

- un seul titre `h1` pertinent par page ;
- l'ordre logique des titres ;
- les liens internes et leurs libellés compréhensibles ;
- les attributs `alt` utiles pour les images informatives ;
- les métadonnées et URL existantes ;
- la lisibilité du contenu sans CSS ni JavaScript lorsque c'est raisonnablement possible.

Ne pas ajouter une image, une police, une icône ou une ressource distante sans vérifier sa licence, son poids, son mode de chargement et son intérêt réel pour la page.

## Validation attendue

Après une modification frontend :

1. Exécuter `npm run build`.
2. Exécuter `npm run check` pour couvrir le SEO, les redirections et la parité `src`/`dist`.
3. Prévisualiser la page avec `npm run preview` si le changement est visuel ou responsive.
4. Pour une refonte, prendre des captures ou examiner la page dans le navigateur afin de vérifier la composition réelle, les débordements, les contrastes et l'identité visuelle sur mobile et bureau.
5. Contrôler au clavier et sur une largeur mobile ainsi que sur une largeur bureau.
6. Vérifier qu'aucun fichier généré dans `dist/` n'a été édité comme source de vérité.

Si une validation échoue, corriger le problème dans la source concernée avant de poursuivre. Ne pas contourner les contrôles en modifiant les scripts de QA.
