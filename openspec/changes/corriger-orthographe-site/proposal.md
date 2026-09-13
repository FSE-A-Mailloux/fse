## Why

Le site public contient de nombreuses fautes d'orthographe, de grammaire et des caractères accentués manquants, ce qui dégrade sa lisibilité, sa crédibilité et son accessibilité pour les visiteurs francophones. Une correction éditoriale globale est nécessaire avant les prochaines publications afin d'offrir un contenu cohérent en français.

## What Changes

- Relire et corriger les textes visibles des pages HTML et des partials éditoriaux sous `src/`.
- Rétablir les accents, la ponctuation, les apostrophes et les caractères français correctement encodés.
- Corriger l'orthographe, la grammaire, les accords et les coquilles sans modifier le sens des contenus validés.
- Harmoniser les formulations répétées dans les éléments communs, notamment l'en-tête, la navigation et le pied de page.
- Vérifier que les corrections sont conservées dans les pages statiques générées et ne créent pas de régression de rendu ou d'encodage.
- Préserver les URL, slugs, noms de fichiers, identifiants techniques, chemins, attributs nécessaires au fonctionnement et valeurs structurées, sauf erreur explicitement confirmée.

## Capabilities

### New Capabilities

- `editorial-content-quality`: définir et vérifier la qualité linguistique, l'encodage et la cohérence des textes visibles du site statique en français.

### Modified Capabilities

<!-- Aucune exigence existante ne définit actuellement la qualité linguistique du contenu. -->

## Impact

- Pages HTML et partials éditoriaux sous `src/`, y compris les contenus partagés de l'en-tête, de la navigation et du pied de page.
- Artefacts HTML produits par le build statique, qui devront refléter les textes corrigés.
- Contrôles de publication et de qualité à compléter pour détecter les caractères non accentués ou les erreurs éditoriales résiduelles dans le périmètre retenu.
- Aucun changement d'API, de dépendance ou de structure d'URL n'est prévu.