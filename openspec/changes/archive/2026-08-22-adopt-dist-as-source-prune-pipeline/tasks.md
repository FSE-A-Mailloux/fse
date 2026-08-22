## 1. Bascule de la source statique

- [x] 1.1 Copier integralement le corpus valide de `dist/` vers `src/` et verifier que les fichiers racine critiques (`index.html`, `sitemap.xml`, `robots.txt`, `_redirects`) existent bien dans `src/`.
- [x] 1.2 Adapter le flux de publication pour consommer `src/` comme entree unique et verifier via une execution locale que la sortie publiee est servable sans etape de regeneration Joomla.
- [x] 1.3 Verifier la parite minimale des routes publiques attendues apres bascule (pages principales et sections) et confirmer qu'aucune URL cle n'est manquante.

## 2. Retrait du pipeline Joomla obsolete

- [x] 2.1 Identifier puis retirer les scripts npm et fichiers de pipeline dedies a l'export/normalisation/build Joomla, puis verifier que `npm run` n'expose plus ces commandes dans le flux standard.
- [x] 2.2 Supprimer les donnees intermediaires et rapports devenus hors perimetre (`data/raw`, `data/normalized`, rapports relies a la migration) et verifier qu'aucun script actif ne reference ces chemins.
- [x] 2.3 Conserver uniquement les verifications utiles au resultat statique et verifier leur execution sans dependance MySQL Joomla.

## 3. Documentation et validation finale

- [x] 3.1 Mettre a jour `README.md` pour decrire la nouvelle source de verite (`src/`) et verifier qu'un nouveau contributeur peut suivre le flux sans prerequis Joomla.
- [x] 3.2 Documenter explicitement le changement BREAKING (fin de regeneration Joomla dans ce depot) et verifier la presence de cette note dans la documentation de projet.
- [x] 3.3 Executer la verification finale de publication statique (fichiers, redirections, SEO de base) et verifier que tous les controles retenus passent avant merge.





