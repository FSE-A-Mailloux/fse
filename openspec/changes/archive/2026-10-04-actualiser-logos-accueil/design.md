## Contexte

Voir `proposal.md` pour la motivation. Les deux pages `src/index.html` et `src/home/index.html` possèdent un bloc `.home-hero` avec une colonne de texte et une figure unique utilisant `/assets/logo-fse.png`. La CSS commune applique à cette figure un fond blanc, une rotation de trois degrés et une ombre décalée ; elle passe le bloc sur une colonne à 768px.

Les deux images fournies sont présentes sous `src/docs/images/site/`, mais ne sont pas encore suivies par Git. Elles comportent un fond blanc et une identité circulaire. Le site repose sur des pages HTML avec partials EJS et une CSS locale, publiées par le build existant.

Ce document fixe les choix de composition nécessaires pour transformer une figure unique en duo sans déséquilibrer l'introduction.

## Objectifs et non-objectifs

**Objectifs :** retouche locale destinée aux familles et élèves, mettant les deux structures en regard. Conserver le vert profond, le fond crème, la typographie système et le rythme éditorial existants ; laisser les couleurs propres aux logos jouer leur rôle d'identification.

**Non-objectifs :** aucune refonte de palette, de navigation, d'en-tête ou de pied de page ; aucun changement de texte, de métadonnées, de liens ou de date d'actualité ; aucune extension aux pages internes sans autre demande ; aucune nouvelle dépendance ni interaction ; aucun déplacement des autres images ou des PDF.

## Décisions

### Déplacer les deux logos dans les ressources d'identité visuelle

Déplacer les deux fichiers fournis de `src/docs/images/site/` vers `src/assets/logos/`, puis référencer `/assets/logos/logo-fse.png` et `/assets/logos/logo-coopsco.png` dans les deux accueils. Le sous-dossier `logos/` distingue les identités actuelles de l'ancien fichier déjà présent dans `src/assets/logo-fse.png`, sans collision ni écrasement. Ne pas conserver de copies inutiles aux anciens emplacements.

Vérifier leur poids et leurs dimensions lors de l'implémentation et conserver les fichiers originaux lors du déplacement. Une éventuelle optimisation ne doit modifier ni le dessin ni la fidélité des couleurs.

Alternative écartée : écraser `/assets/logo-fse.png`, qui changerait implicitement tous ses autres usages. Conserver cet ancien fichier tant que son absence d'usage n'est pas démontrée ; sa suppression n'est pas nécessaire à cette retouche.

Les fichiers fournis ne sont pas encore suivis par Git : aucune URL publiée sous `/docs/images/site/` n'est identifiée à ce stade. Vérifier leurs références avant déplacement et les mettre à jour si nécessaire ; si une publication antérieure est découverte, préserver les anciennes URL avec le mécanisme de compatibilité existant. Les autres images et PDF restent à leur emplacement actuel.

### Composer un duo dans la zone visuelle existante

Remplacer la figure unique par un groupe de deux figures, FSE puis CoopSco dans l'ordre du document, avec un traitement commun. Sur bureau, disposer les figures verticalement dans la colonne visuelle actuelle pour ne pas comprimer davantage le titre. Après le passage du bloc principal sur une colonne, disposer les logos côte à côte dans la largeur disponible, avec des colonnes réductibles et des images fluides.

Employer des dimensions comparables, une séparation régulière et un fond blanc sobre compatible avec celui des images. Retirer la rotation et l'ombre décalée de l'ancienne figure pour ne pas mettre les identités en concurrence. Ajuster les limites de taille à la prévisualisation afin de préserver le rythme du bloc principal.

Alternatives écartées : placer la CoopSco dans une carte plus bas, qui dissocierait les deux identités ; placer deux grands logos côte à côte dans la colonne de bureau existante, qui les rendrait trop petits ou imposerait une modification majeure de la grille.

### Garder les logos informatifs, sans nouvelle action

Utiliser des images non cliquables avec des textes alternatifs distincts : « Logo du Foyer Socio-Éducatif du collège Auguste Mailloux » et « Logo de la Coopérative Scolaire du collège Auguste Mailloux ». Renseigner leurs dimensions intrinsèques vérifiées et utiliser une hauteur automatique afin de limiter les déplacements de mise en page.

Alternative écartée : créer des liens sur les logos, qui ajouterait un comportement non demandé alors que les parcours FSE et CoopSco existent déjà.

### Partager le traitement entre les deux pages d'accueil

Réutiliser les mêmes classes et règles CSS pour `/` et `/home/`. Préserver leurs titres et contenus distincts, ainsi que leurs partials communs. L'inclusion de `/home/` est une hypothèse de cohérence limitée : cette page affiche actuellement la même ancienne identité.

## Risques et compromis

- [Hauteur supplémentaire sur bureau] → limiter la taille des figures et contrôler que les logos ne dominent pas le message principal.
- [Fond blanc perceptible sur le fond crème] → conserver une surface blanche discrète et identique pour les deux images, sans découpage du dessin.
- [Images sources volumineuses] → mesurer leur poids avant publication et n'envisager qu'une optimisation fidèle avec les outils disponibles, sans dépendance supplémentaire.
- [Débordement dû aux anciennes règles de figure] → adapter les règles du composant et son point de rupture, puis contrôler les deux pages à 320px, 375px, 768px et 1280px.
- [Contrôles automatiques insuffisants pour l'équilibre visuel] → compléter `npm run build` et `npm run check` par une prévisualisation des deux pages, au clavier et sans CSS.

## Plan de publication

Avant toute implémentation, créer une branche dédiée `feat/actualiser-logos-accueil` depuis la branche de base du projet, après vérification de la branche courante et de l'état du répertoire de travail. Préserver les artefacts de planification, les images fournies et tout autre changement local ; ne pas réinitialiser une branche déjà existante. La création de cette branche est prévue pour la phase d'application, pas pour la planification.

Déplacer et versionner les images fournies sous `src/assets/logos/` avec les modifications HTML/CSS, générer le site avec le pipeline existant et vérifier le chargement des deux ressources aux URL `/assets/logos/logo-fse.png` et `/assets/logos/logo-coopsco.png`. Ne jamais éditer `dist/` comme source de vérité.

En cas de régression, rétablir uniquement les modifications propres à ce changement dans les sources puis reconstruire ; aucune migration de données ou d'URL n'est nécessaire.
