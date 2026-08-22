## 1. Preparation du pipeline statique

- [x] 1.1 Inventorier les points d'entree 11ty (config, templates, commandes npm) et verifier l'inventaire avec une liste validee des fichiers impactes
- [x] 1.2 Definir le dossier de sortie HTML/CSS cible et verifier qu'un build a blanc cree bien l'arborescence attendue sans erreur

## 2. Remplacement de la generation des pages

- [x] 2.1 Implementer le rendu statique direct des pages de navigation depuis `data/normalized/pages.json` et verifier que toutes les URLs publiques du perimetre produisent un fichier HTML
- [x] 2.2 Integrer la generation/livraison des assets CSS associes et verifier que chaque page publiee reference des assets resolvables en sortie
- [x] 2.3 Conserver l'echec du build sur cible de navigation non resolue et verifier avec un cas de donnee invalide que le build s'arrete explicitement

## 3. Parite et qualite de release

- [x] 3.1 Ajouter un controle de parite stricte de structure HTML contre une baseline de reference et verifier que le controle detecte une divergence volontaire
- [x] 3.2 Adapter les scripts d'audit (liens internes, redirections, sitemap, robots) a la nouvelle sortie et verifier que tous les rapports passent sur un build nominal
- [x] 3.3 Executer une comparaison de couverture entre sortie actuelle et nouvelle sortie et verifier qu'aucune URL publique dans le perimetre n'est perdue

## 4. Bascule et nettoyage

- [x] 4.1 Basculer les commandes de build/publication vers le nouveau pipeline statique et verifier qu'une execution CI locale reussit de bout en bout
- [x] 4.2 Retirer les dependances et configurations Eleventy devenues obsoletes et verifier que `npm install` puis le build ne referencent plus 11ty
- [x] 4.3 Mettre a jour la documentation d'exploitation (README/process release) et verifier qu'un tiers peut reproduire un build statique en suivant uniquement la doc


