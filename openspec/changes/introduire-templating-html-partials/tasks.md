## 1. Partials et script de rendu

- [ ] 1.1 Ajouter la dependance npm `ejs` et verifier que `npm install` s'execute sans erreur
- [x] 1.2 Extraire le bandeau, la navigation principale et le conteneur de sous-navigation dans `src/_partials/header.ejs`, en verifiant que le contenu est un copier-coller exact d'une page existante
- [x] 1.3 Extraire le pied de page et le script de navigation dans `src/_partials/footer.ejs`, en verifiant que le contenu est un copier-coller exact d'une page existante
- [x] 1.4 Ecrire `scripts/render-templates.mjs` (rendu de chaque page via `ejs.renderFile`, capture et enrichissement des erreurs d'inclusion manquante avec le chemin du fichier source) et verifier avec un cas de partial manquant que le script s'arrete avec un message d'erreur clair

## 2. Adaptation des pages sources

- [x] 2.1 Remplacer les blocs dupliques par les directives `<%- include('_partials/header') %>` / `<%- include('_partials/footer') %>` dans les 21 pages sous `src/`, et verifier par diff que seul le bandeau/nav/pied de page a ete remplace, sans perte de contenu specifique
- [x] 2.2 Reformater l'ensemble des pages HTML sources en indentation lisible (2 espaces) et verifier qu'aucun fichier ne contient plus de HTML minifie sur une seule ligne

## 3. Integration au build et non-regression

- [x] 3.1 Integrer `render-templates.mjs` dans `scripts/build-static.mjs` pour que chaque page `.html` copiee vers `dist/` soit d'abord rendue via EJS, et verifier qu'un build nominal ne produit plus de directive `<%- include -%>` residuelle ni de fichier `_partials/` dans `dist/`
- [x] 3.2 Executer `npm run check` (build, audit SEO, redirections, couverture) et verifier que tous les controles passent sans modification de leur perimetre
- [x] 3.3 Comparer un echantillon representatif de pages `dist/` avant/apres le changement (structure HTML, liens, textes) et confirmer l'absence de regression visuelle ou fonctionnelle
- [x] 3.4 Mettre a jour `README.md` pour documenter le flux d'authoring `src/` + partials et la necessite de `npm run build` avant toute publication
