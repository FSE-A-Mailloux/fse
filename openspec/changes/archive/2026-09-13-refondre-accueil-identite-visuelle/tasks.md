## 1. Préparer la branche et l'état de référence

- [x] 1.1 Créer ou vérifier la branche dédiée `refonte-accueil-identite-visuelle` avant toute modification du code, puis confirmer que la branche de référence reste intacte.
- [x] 1.2 Examiner `src/home/index.html`, `src/assets/site.css` et les partials communs, puis conserver une capture ou un état de référence de l'accueil sur mobile et bureau.

## 2. Définir et choisir la direction visuelle

- [x] 2.1 Produire deux ou trois pistes visuelles distinctes pour l'accueil, chacune avec palette locale, typographie, composition, navigation et élément signature, puis vérifier qu'elles ne reproduisent pas un modèle de site générique.
- [x] 2.2 Choisir une piste avec l'utilisateur et formaliser ses tokens CSS, sa hiérarchie typographique, sa grille, son rythme vertical, ses surfaces et ses états interactifs.
- [x] 2.3 Vérifier les contrastes prévus, les tailles de texte, les focus clavier et les comportements mobiles de la piste choisie avant de coder.

## 3. Réaliser la refonte de l'accueil

- [x] 3.1 Réorganiser le HTML de `src/home/index.html` autour d'une hiérarchie éditoriale claire, sans modifier l'URL, le contenu SEO essentiel ni les liens internes.
- [x] 3.2 Mettre en œuvre le système visuel dans `src/assets/site.css`, en isolant les règles propres à l'accueil et en préservant les composants partagés nécessaires aux autres pages.
- [x] 3.3 Ajouter uniquement les ressources locales nécessaires, vérifier leurs licences et leur poids, puis confirmer qu'aucun appel réseau n'est requis pour rendre l'accueil.
- [x] 3.4 Adapter les partials EJS uniquement si la direction retenue l'exige, en conservant une navigation et un pied de page accessibles.

## 4. Valider l'expérience et la non-régression

- [x] 4.1 Exécuter `npm run build` et vérifier que `dist/` contient un accueil complet sans directive EJS résiduelle ni ressource externe non prévue.
- [x] 4.2 Exécuter `npm run check` et corriger toute régression SEO, redirection ou couverture d'URL avant de poursuivre.
- [x] 4.3 Examiner l'accueil sur des largeurs de 320px, 375px et bureau, puis vérifier l'absence de débordement, la lisibilité, les contrastes, les focus clavier et `prefers-reduced-motion`.
- [x] 4.4 Comparer des captures avant/après et formuler une critique de la direction : élément distinctif, résidus de style générique, décorations supprimables et éventuels obstacles à la compréhension.
- [x] 4.5 Vérifier qu'aucun fichier sous `dist/` n'a été modifié comme source de vérité et documenter les résultats avant revue de la branche.
