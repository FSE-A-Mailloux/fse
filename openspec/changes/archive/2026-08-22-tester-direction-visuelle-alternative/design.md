## Context

Le site repose sur des pages HTML statiques avec un style centralise dans `src/assets/site.css` et une logique de navigation legere dans `src/assets/navigation.js`. Voir `proposal.md` (Why) pour la motivation. La nouvelle iteration doit proposer une direction visuelle moins austere sans introduire de framework CSS/JS ni casser la structure de navigation existante.

## Goals / Non-Goals

**Goals:**
- Definir une variante visuelle plus chaleureuse et editoriale, identifiable des la page d'accueil.
- Renforcer la perception de qualite via tokens, typographie et composants plus expressifs mais lisibles.
- Conserver des interactions claires (hover/focus/actif) et une experience mobile robuste.
- Permettre un ajustement progressif page par page sans refonte technique lourde.

**Non-Goals:**
- Changer l'architecture du site ou les URLs publiques.
- Introduire des dependances externes (framework CSS, librairie JS UI).
- Reecrire l'ensemble des contenus redactionnels existants.

## Decisions

- Introduire une variante de design token "editoriale chaleureuse" dans `site.css`.
  - Rationale: un socle de variables coherent permet de tester une nouvelle ambiance sans dupliquer les regles.
  - Alternative consideree: retoucher uniquement des couleurs ponctuelles; rejetee car impact trop limite sur la perception globale.

- Structurer l'accueil avec un bloc hero et des cartes enrichies, puis propager les memes codes visuels aux pages internes prioritaires.
  - Rationale: la premiere impression se joue a l'arrivee, puis doit rester coherente sur actualites/FSE.
  - Alternative consideree: moderniser uniquement la navigation; rejetee car insuffisant pour sortir de l'effet austere.

- Uniformiser les etats interactifs (hover/focus/actif) avec des contrastes explicites et des cibles tactiles confortables.
  - Rationale: la sensation de qualite percue depend autant des details d'interaction que de la palette.
  - Alternative consideree: garder les etats actuels et changer seulement la mise en page; rejetee pour risque d'incoherence UX.

- Conserver la logique `navigation.js` et n'ajuster que les cas de selection contextuelle necessaires.
  - Rationale: limiter les regressions fonctionnelles tout en permettant l'evolution visuelle.
  - Alternative consideree: refondre la navigation JS; rejetee car hors perimetre du besoin.

## Risks / Trade-offs

- [Risque de surcharge decorative] -> Limiter les effets visuels a quelques composants cibles et privilegier la lisibilite.
- [Risque de contraste insuffisant avec une palette plus chaude] -> Verifier les contrastes sur les etats de texte, liens et boutons avant validation.
- [Risque d'heterogeneite entre pages] -> Appliquer un set minimal commun (hero/cartes/titres/CTA) sur les pages prioritaires avant extension.

## Migration Plan

1. Definir la variante de tokens et la nouvelle echelle typographique dans `src/assets/site.css`.
2. Mettre a jour les composants structurants (hero, cartes, CTA, sections) pour l'accueil et les pages internes prioritaires.
3. Ajuster la navigation visuelle et les etats interactifs desktop/mobile.
4. Verifier la coherence visuelle sur `src/index.html`, `src/home/index.html`, `src/actualites/index.html`, `src/fse/index.html`.
5. En cas de regression, rollback par commit cible de `site.css` et reapplication incrementale composant par composant.

