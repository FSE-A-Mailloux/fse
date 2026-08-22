## 1. Cadrage de migration et critères d'acceptation

- [x] 1.1 Constituer l'inventaire exhaustif des pages statiques Joomla publiques et vérifier qu'il est versionné comme source de vérité pour la couverture 301.
- [x] 1.2 Documenter l'exclusion des composants dynamiques (dont calendrier) dans les règles de migration et vérifier qu'aucune page cible ne dépend d'un composant dynamique repris.
- [x] 1.3 Définir les critères SEO de recette sans dépendance analytics/search console (métadonnées, canonical, sitemap, robots, redirections) et vérifier qu'ils sont testables automatiquement.

## 2. Extraction et normalisation du contenu Joomla

- [x] 2.1 Implémenter l'extraction des contenus publiés (articles, catégories, menus) depuis MySQL et vérifier qu'un export reproductible est généré deux fois à l'identique.
- [x] 2.2 Implémenter la normalisation des contenus (encodage, nettoyage HTML, réécriture des liens internes) et vérifier via un rapport que les liens Joomla `index.php?...` sont transformés.
- [x] 2.3 Construire l'inventaire des assets référencés et vérifier qu'aucune ressource obligatoire n'est manquante dans le rapport d'export.

## 3. Implémentation du site statique Eleventy

- [x] 3.1 Initialiser la structure Eleventy (layouts, includes, collections, data) et vérifier que le build local génère des pages HTML sans dépendance CMS runtime.
- [x] 3.2 Implémenter la génération des pages depuis les données normalisées et vérifier que chaque entrée de navigation publique in-scope résout vers une page statique.
- [x] 3.3 Supprimer les fonctionnalités dynamiques (login frontend, calendrier dynamique, modules runtime) et vérifier qu'aucune route dynamique supprimée n'est exposée au runtime public.

## 4. SEO, redirections et publication

- [x] 4.1 Implémenter les métadonnées SEO (title, description, canonical, Open Graph) et vérifier via un audit que tous les documents indexables sont conformes.
- [x] 4.2 Générer `sitemap.xml` et `robots.txt` et vérifier que le sitemap ne contient que des URLs canoniques indexables.
- [x] 4.3 Générer la table de redirections legacy -> nouvelles URLs et vérifier via tests automatiques que chaque URL legacy des pages statiques Joomla publiques retourne une redirection permanente correcte.
- [x] 4.4 Exécuter une recette de pré-production (crawl interne, vérification liens, validation SEO) et vérifier qu'aucun blocant n'est ouvert avant bascule production.

