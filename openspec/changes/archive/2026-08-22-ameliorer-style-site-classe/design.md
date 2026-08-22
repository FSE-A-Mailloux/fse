## Context

Le site est deja publie en HTML/CSS statique et la personnalisation visuelle est concentree dans `src/assets/site.css`, avec un comportement de navigation porte par `src/assets/navigation.js`. Voir `proposal.md` (section Why) pour la motivation metier. Le changement doit rester compatible avec l'arborescence actuelle et ne pas introduire de dependance front-end supplementaire.
Une contrainte complementaire est d'eliminer toute reference `https://example.org` au profit de `https://www.fse-cooperativescolaire-amailloux.com` dans les contenus et signaux SEO publics.

## Goals / Non-Goals

**Goals:**
- Definir un systeme visuel sobre et elegant (couleurs, typographie, surfaces, espacements) applicable a tout le site.
- Renforcer la lisibilite et la hierarchie des contenus, en particulier sur les pages a forte densite de texte.
- Harmoniser les etats interactifs (hover, focus, actif) pour la navigation et les liens importants.
- Garantir un rendu mobile robuste sans regression d'accessibilite de base (contraste, tailles de texte, zones tactiles).
- Uniformiser toutes les references absolues publiques sur le domaine de production officiel.

**Non-Goals:**
- Refonte editoriale des contenus textuels page par page.
- Changement de stack technique (pas de framework CSS/JS additionnel).
- Modification fonctionnelle des parcours utilisateur ou des URLs.

## Decisions

- Mettre en place des jetons CSS (variables) pour la palette, les espacements, les rayons et les ombres.
  - Rationale: centralise les choix graphiques et facilite la coherence cross-page.
  - Alternative consideree: regler les styles composant par composant sans variables; rejetee car plus difficile a maintenir.

- Introduire une echelle typographique explicite (titres, intertitres, texte courant, micro-texte) avec interlignage coherent.
  - Rationale: apporte une hierarchie visuelle stable et ameliore la lisibilite.
  - Alternative consideree: conserver les tailles existantes en ajustant uniquement les couleurs; rejetee car insuffisant pour l'effet "plus classe" attendu.

- Standardiser des composants visuels reutilisables (cartes de contenu, boutons/liens d'action, blocs d'information).
  - Rationale: obtenir une apparence premium reguliere sans re-ecrire chaque page.
  - Alternative consideree: styles ad hoc par page; rejetee pour eviter la divergence visuelle.

- Revoir les etats d'interaction et focus clavier de la navigation.
  - Rationale: clarifie les actions disponibles et reduit le risque de perte de contexte en navigation clavier.
  - Alternative consideree: hover uniquement; rejetee pour risque d'accessibilite insuffisante.

- Definir `https://www.fse-cooperativescolaire-amailloux.com` comme domaine canonique unique pour les URLs absolues publiques.
  - Rationale: evite les incoherences SEO et supprime les references de placeholder non conformes a la production.
  - Alternative consideree: conserver des URLs relatives partout; rejetee car certains signaux SEO exigent des references absolues explicites.

## Risks / Trade-offs

- [Risque de contraste insuffisant avec une palette plus douce] -> Definir des couples couleur/fond avec verification systematique des contrastes critiques.
- [Risque de regressions visuelles sur pages anciennes] -> Appliquer les nouveaux styles via classes/utilitaires progressifs et verifier un echantillon representatif de pages.
- [Risque de surcharge visuelle en voulant "faire plus moderne"] -> Limiter le nombre d'effets decoratifs et prioriser lisibilite + sobrieté.
- [Risque d'oubli de liens `example.org` dans des pages peu frequentees] -> Ajouter un controle de recherche globale sur le contenu publie avant validation finale.

## Migration Plan

1. Definir les jetons de design et la base typographique dans `src/assets/site.css`.
2. Appliquer les styles de navigation (desktop/mobile + focus) et valider les points de rupture existants.
3. Restyler les composants de contenu prioritaires (hero, cartes, blocs d'actus, CTA).
4. Remplacer les references `https://example.org` par `https://www.fse-cooperativescolaire-amailloux.com` dans les pages et metadonnees concernees.
5. Realiser une passe de verification multi-pages et mobile (accueil, actualites, pages FSE, contact), incluant le controle d'absence de `example.org`.
6. En cas de regression majeure, rollback en revenant au commit precedent de `site.css` et des fichiers SEO modifies, puis reappliquer les ajustements incrementalement.

## Open Questions

- Souhaite-t-on une variante "theme saisonnier" (couleurs alternatives) ou uniquement une identite unique toute l'annee ?


