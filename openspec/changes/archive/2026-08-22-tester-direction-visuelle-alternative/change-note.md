## Change note - tester-direction-visuelle-alternative

### Direction visuelle alternative retenue

Cette iteration introduit une ambiance plus editoriale et chaleureuse via:
- une entree de page en hero (kicker + message principal),
- des cartes de contenu enrichies avec CTA plus visibles,
- des sections harmonisees (actualites, FSE) avec blocs lisibles,
- des etats interactifs explicites (hover/focus/actif) sur la navigation et les liens d'action.

### Choix final apres tests visuels

Trois variantes de test de `FSE > Vue d'ensemble` ont ete comparees pendant l'implementation.
Le style **A** a ete retenu puis applique globalement a l'ensemble du site via les regles
`article` dans `src/assets/site.css`.

Les pages temporaires de variantes et leurs liens de menu ont ete retires pour revenir
a une navigation publique propre et unique.

### Couverture des exigences `specs/site-visual-identity/spec.md`

- Identite visuelle moderne et coherente: appliquee via extension de `src/assets/site.css` (tokens, composants et style A harmonise sur toutes les pages).
- Hierarchie visuelle claire: titres, lead text, blocs KPI/cartes, CTA differencies.
- Navigation lisible et organisee: etats hover/focus/actif renforces et suppression des liens de test temporaires pour conserver un menu clair.
- Lisibilite mobile: base 16px maintenue, composants adaptes, build/check sans regression.
- Ambiance editoriale d'accueil: bloc hero + cartes enrichies + parcours guide vers les rubriques principales.

### Verification

- `npm run build`: OK
- `npm run check`: OK (build, SEO, redirections, couverture)

