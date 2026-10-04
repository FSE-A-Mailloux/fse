## Why

Les PDF et images de l'ancien site viennent d'être importés dans `src\docs`, mais plusieurs pages affichent encore des images de remplacement et les fichiers historiques sont tous destinés à la publication. Il faut raccorder les ressources pertinentes aux contenus actuels et conserver les ressources inutilisées hors du site publié.

## What Changes

- Inventorier les pages, partials et références de ressources du site actuel, puis rapprocher chacun des fichiers importés de son usage réel ou potentiel.
- Conserver les PDF déjà référencés et vérifier leur correspondance avec les libellés, les années et les sujets des pages.
- Remplacer les images manquantes par les images importées dont le contenu et le contexte confirment la correspondance ; intégrer les autres médias pertinents sans créer artificiellement de nouvelles rubriques.
- Déplacer les PDF et images sans usage retenu vers `not-used\docs`, à la racine du dépôt, en préservant leur arborescence et leurs octets.
- Documenter les correspondances, motifs d'archivage et éventuelles incertitudes ; ne pas présenter une image ou un document non identifié comme une correspondance certaine.
- Préserver les routes, les contenus utiles, l'identité visuelle et les liens vers les documents conservés.

## Capabilities

### New Capabilities

- `legacy-resource-reconciliation` : rapprochement traçable des ressources importées avec les pages actuelles, restauration des médias pertinents et conservation hors publication des fichiers inutilisés.

### Modified Capabilities

Aucune. Les contrats existants de publication statique, de templating et d'identité visuelle restent inchangés.

## Impact

- Sources concernées : les 21 pages HTML de `src`, les partials et les références CSS, ainsi que les 71 fichiers importés dans `src\docs` au moment de l'inventaire initial.
- Pages prioritaires identifiées : comptes rendus, commande CoopSco, ressources de `home`, associations, équipements, voyages et autres soutiens.
- Nouveau rangement hors publication : `not-used\docs`. Le build copie uniquement `src` vers `dist` ; aucune modification de cette architecture n'est prévue.
- Documentation du rapprochement dans `docs`, sans nouvelle dépendance ni recours obligatoire à l'ancien site ou à Joomla.
- Aucun fichier du site ni média ne sera modifié pendant la phase de proposition.
