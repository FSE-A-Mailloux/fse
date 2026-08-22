## 1. Variante visuelle et fondations

- [x] 1.1 Definir la variante de design tokens (palette, surfaces, contrastes, ombres, rayons) dans `src/assets/site.css` et verifier que `npm run build` se termine sans erreur.
- [x] 1.2 Mettre a jour l'echelle typographique (titres, texte courant, interlignage) et verifier sur `src/index.html` et `src/home/index.html` que la hierarchie est visuellement nette.

## 2. Composants d'accueil et pages prioritaires

- [x] 2.1 Ajouter/ajuster un bloc hero editorial sur l'accueil et verifier que le message FSE/CoopSco est visible au premier ecran sur desktop.
- [x] 2.2 Enrichir les cartes/CTA de l'accueil et verifier que le parcours vers `actualites`, `fse` et `coopsco` est identifiable en moins de trois zones d'interaction principales.
- [x] 2.3 Harmoniser les sections de contenu sur `src/actualites/index.html` et `src/fse/index.html` avec la nouvelle direction visuelle et verifier la coherence de rendu entre ces pages et l'accueil.
- [x] 2.4 Concevoir et tester 3 propositions visuelles tres differentes de la page `FSE > Vue d'ensemble`, retenir la proposition A pour l'ensemble du site, puis retirer les variantes et liens de test du menu sans casser la navigation.

## 3. Navigation et experience mobile

- [x] 3.1 Renforcer les etats hover/focus/actif de la navigation principale et verifier visuellement qu'un etat actif et un etat focus clavier sont perceptibles.
- [x] 3.2 Ajuster, si necessaire, `src/assets/navigation.js` pour conserver la selection contextuelle correcte et verifier le comportement sur `index`, `fse`, `actualites` et `sitemap`.
- [x] 3.3 Verifier la robustesse mobile (>=320px) et confirmer sur un viewport 375px l'absence de debordement horizontal et une taille de texte corps >= 16px.

## 4. Validation finale et documentation

- [x] 4.1 Executer `npm run check` et verifier que build, SEO, redirections et couverture passent sans regression.
- [x] 4.2 Documenter les choix de la direction visuelle alternative dans une note de changement et verifier la couverture des exigences de `specs/site-visual-identity/spec.md`.


