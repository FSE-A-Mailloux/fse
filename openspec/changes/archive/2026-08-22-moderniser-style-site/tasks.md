## 1. Refonte du style CSS

- [x] 1.1 Définir les custom properties CSS (palette, typographie, espacements) en tête de `src/assets/site.css` et vérifier qu'elles sont référencées par tous les composants
- [x] 1.2 Réécrire le style de la topbar (`.topbar`, `.brand`, `.meta-nav`) avec la nouvelle palette et vérifier le rendu dans un navigateur
- [x] 1.3 Réécrire le style de la navigation principale (`.subnav`) avec hiérarchie visuelle, états de survol et espacements améliorés, et vérifier visuellement
- [x] 1.4 Réécrire le style du contenu principal (`main`, `article`, `a`) avec typographie lisible, ombres douces et coins arrondis cohérents, et vérifier visuellement
- [x] 1.5 Réécrire le style du footer avec harmonisation des couleurs et vérifier visuellement

## 2. Responsive design

- [x] 2.1 Ajouter un breakpoint mobile (≤ 768px) dans `site.css` couvrant la navigation et le contenu, et vérifier l'absence de défilement horizontal à 375px dans les DevTools
- [x] 2.2 Vérifier que la taille de police du corps de texte est d'au moins 16px sur mobile (inspection DevTools ou mesure CSS)

## 3. Mise à jour du message d'accueil

- [x] 3.1 Remplacer le paragraphe « Bienvenue sur la version statique modernisee du site. » dans `src/index.html` par un texte chaleureux présentant le FSE et la CoopSco, et vérifier que le message technique n'apparaît plus dans le rendu

## 4. Validation finale

- [ ] 4.1 Ouvrir au moins 5 pages représentatives (accueil, actualités, FSE, CoopSco, nous contacter) et vérifier la cohérence visuelle et l'absence de régression de mise en page
- [ ] 4.2 Valider le HTML et le CSS avec les outils de développement du navigateur (absence d'erreurs console liées aux styles)
