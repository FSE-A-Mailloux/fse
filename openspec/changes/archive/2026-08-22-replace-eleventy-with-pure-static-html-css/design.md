## Context

Le projet publie actuellement un site statique via une chaine Eleventy (voir `proposal.md` section Why). Les donnees normalisees et les controles de qualite existent deja (exports, redirections, audits), mais la couche de templating/build doit etre remplacee par une production directe d'artefacts HTML/CSS.

Contraintes:
- Preserver les URLs publiques et le comportement SEO deja defini.
- Conserver les controles de non-regression (liens, redirections, couverture pages).
- Produire un resultat deterministe pour les releases.

## Goals / Non-Goals

**Goals:**
- Remplacer la generation Eleventy par un pipeline qui produit directement des fichiers HTML/CSS statiques.
- Garder la parite fonctionnelle des pages publiques dans le perimetre.
- Maintenir les verifications automatiques de qualite avant publication.

**Non-Goals:**
- Refonte graphique complete du site.
- Changement du perimetre de contenu migre depuis Joomla.
- Ajout de fonctionnalites dynamiques cote serveur.

## Decisions

1. Remplacer les templates Nunjucks/11ty par un rendu statique explicite
   - Decision: introduire un script de build statique qui consomme les donnees normalisees et ecrit les fichiers HTML/CSS finaux dans un dossier de sortie versionnable.
   - Rationale: reduit les dependances runtime et clarifie la chaine de publication.
   - Alternatives considerees:
     - Conserver Eleventy avec configuration minimale: rejetee, car ne supprime pas la dependance demandee.
     - Migrer vers un autre SSG: rejetee, car l'objectif est une sortie purement statique sans nouvelle couche SSG.

2. Conserver les memes sources de verite de contenu et de SEO
   - Decision: reutiliser les fichiers `data/normalized/*` et les regles de redirection/sitemap existantes pour produire des artefacts equivalents.
   - Rationale: limite les regressions et facilite la verification de parite.
   - Alternatives considerees:
     - Reconcevoir le schema de donnees: rejetee pour eviter un couplage fort avec cette migration.

3. Verifier la parite via controles de build existants + controles cibles
   - Decision: adapter les scripts d'audit pour valider les artefacts HTML/CSS produits (presence, liens internes, redirections, sitemap, robots).
   - Rationale: garantit que le changement de moteur de generation ne degrade pas le comportement observable.
   - Alternatives considerees:
     - Validation manuelle uniquement: rejetee, couverture insuffisante.

4. Imposer une parite stricte de structure HTML sur les pages du perimetre
   - Decision: ajouter une verification automatique qui compare la structure HTML cible a une baseline de reference pour detecter toute divergence non voulue.
   - Rationale: verrouille la non-regression de rendu au-dela de la seule parite fonctionnelle.
   - Alternatives considerees:
     - Parite uniquement fonctionnelle: rejetee, trop permissive pour cette migration.

5. Autoriser une evolution controlee de l'arborescence de sortie
   - Decision: ne pas imposer une equivalence 1:1 de l'arborescence interne des fichiers, tant que les URLs publiques, redirections et artefacts SEO restent conformes.
   - Rationale: offre plus de souplesse pour simplifier le pipeline statique.
   - Alternatives considerees:
     - Arborescence strictement identique: rejetee, contrainte inutile si les contrats publics sont preserves.

## Risks / Trade-offs

- [Risque de divergence de rendu entre templates 11ty et HTML statique final] -> Mitigation: etablir une comparaison de sorties sur un echantillon representatif et corriger avant bascule.
- [Risque de trous de couverture dans la generation de pages] -> Mitigation: echouer le build sur cible non resolue et executer les audits de couverture a chaque release.
- [Risque de dette de maintenance sur un renderer maison] -> Mitigation: structurer le rendu par modules simples et tests automatiques des transformations critiques.

## Migration Plan

1. Introduire le nouveau pipeline de rendu statique en parallele de la chaine actuelle.
2. Produire un build de reference et comparer sorties/couverture avec la version Eleventy.
3. Basculer les scripts de publication et CI vers la nouvelle sortie HTML/CSS.
4. Retirer les dependances et fichiers de configuration Eleventy devenus inutiles.
5. Executer les audits finaux pre-release, puis publier.
