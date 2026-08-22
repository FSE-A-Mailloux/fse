## Change note - ameliorer-style-site-classe

### Choix de style retenus

- Palette modernisee avec contraste eleve, accents sobres et surfaces plus profondes.
- Echelle typographique harmonisee pour clarifier la hierarchie (titres, texte courant, liens).
- Navigation amelioree avec etats hover/actif/focus explicites et cibles plus confortables.
- Composants de contenu uniformises (cartes accueil, blocs de soutien, liens d'action) pour une perception plus elegante et coherente.
- Ajustements mobile renforces pour conserver lisibilite et interaction sans debordement horizontal.

### Domaine canonique et references absolues

- Domaine canonique unique applique: `https://www.fse-cooperativescolaire-amailloux.com`.
- Remplacement complet de `https://example.org` dans les pages HTML publiques et metadonnees SEO de `src/`.
- `robots.txt` deja conforme, conserve tel quel.

### Verification de couverture des exigences

- `site-visual-identity`:
  - coherence visuelle cross-pages: appliquee via `src/assets/site.css` (tokens, composants, navigation, responsive),
  - hierarchie visuelle et lisibilite: typographie + espacements + titres,
  - mobile: taille de base >= 16px et navigation adaptee.
- `seo-information-architecture`:
  - metadonnees absolues/canoniques sur domaine officiel,
  - absence de `https://example.org` verifiee par recherche globale,
  - audit SEO et controles de build passes.

### Verifications executees

- `npm run build`
- `npm run check:seo`
- `npm run check`

