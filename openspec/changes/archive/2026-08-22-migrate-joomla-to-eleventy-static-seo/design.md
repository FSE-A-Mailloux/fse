## Context

Le contenu actuel est stocke dans Joomla/MySQL (`fsecoopeidam`), avec la navigation et les corps d'articles dans les tables `joo5121_*`, tandis que le modele cible est un hebergement statique. Voir `proposal.md` pour la motivation et le perimetre.

La migration doit preserver l'information publique tout en supprimant les dependances runtime Joomla/PHP/MySQL et en introduisant une architecture SEO moderne avec des URLs propres et des redirections maitrisees.

## Goals / Non-Goals

**Goals:**
- Construire une chaine deterministe d'export vers statique avec Eleventy comme moteur de rendu.
- Definir un modele d'URL canonique independant des routes Joomla historiques en query string.
- Generer les artefacts SEO requis (`meta`, canonical, Open Graph, `sitemap.xml`, `robots.txt`).
- Appliquer une table de redirection entre les anciennes URLs convenues et les nouvelles routes.
- Exclure les capacites frontend dynamiques (login, calendrier dynamique, modules runtime).

**Non-Goals:**
- Reproduire l'administration Joomla, ses extensions ou les workflows d'edition en place.
- Maintenir le comportement dynamique du calendrier ou les parcours frontend authentifies.
- Conserver les formes d'URL legacy comme URLs publiees principales.
- Implementer un backend runtime pour la diffusion du contenu public.

## Decisions

### 1) Decoupage du pipeline: Extract -> Normalize -> Render -> Validate -> Publish
- **Decision:** Utiliser un pipeline par etapes, avec extraction MySQL separee du rendu de pages.
- **Rationale:** Isole les problemes de donnees des problemes de templates et permet des executions reproductibles.
- **Alternatives considered:**
  - Requetes directes en base depuis les templates Eleventy: rejete a cause d'un couplage fort et d'une faible reproductibilite.
  - Migration manuelle copier/coller: rejetee a cause des risques de volumetrie, de qualite et de tracabilite.

### 2) Contrat de contenu pour les collections Eleventy
- **Decision:** Convertir le contenu Joomla en fichiers intermediaires normalises (JSON/Markdown) representant pages, categories, menus et mappings de redirection.
- **Rationale:** Fournit un contrat de donnees stable pour les templates et facilite une validation testable.
- **Alternatives considered:**
  - Rendu direct depuis le schema Joomla brut: rejete a cause du bruit du schema et de la fragilite de migration.

### 3) Modele de routage SEO-first
- **Decision:** Definir d'abord la taxonomie des nouvelles routes, puis mapper le contenu importe vers cette taxonomie.
- **Rationale:** Evite de reproduire des URLs techniques legacy et ameliore la coherence.
- **Alternatives considered:**
  - Miroir des chemins Joomla et de leurs query params: rejete car conserve de la dette SEO historique.

### 4) Table de redirection comme artefact de release
- **Decision:** Traiter les mappings de redirection comme un artefact versionne valide au build.
- **Rationale:** Reduit le risque de perte de trafic au cutover et permet des verifications de couverture auditables.
- **Alternatives considered:**
  - Regles de rewrite ad hoc uniquement sur la plateforme d'hebergement: rejete a cause d'une mauvaise testabilite.

### 5) Retrait explicite des fonctions dynamiques
- **Decision:** Retirer le login et le calendrier dynamique du runtime public; remplacer par des pages statiques informatives si necessaire.
- **Rationale:** Aligne la solution avec un modele 100% statique et reduit les couts de maintenance et de securite.
- **Alternatives considered:**
  - Architecture hybride avec widgets dynamiques conserves: rejetee pour garder un runtime simple et coherent.

### 6) Resolution des questions de cadrage
- **Decision:** Le perimetre de redirection 301 couvre toutes les pages statiques Joomla publiques.
- **Rationale:** Evite les pertes de trafic sur des contenus historiques et fixe un critere de couverture exhaustif.
- **Alternatives considered:**
  - Couvrir uniquement les pages prioritaires: rejete pour reduire le risque de liens entrants orphelins.

### 7) Politique sur les composants dynamiques
- **Decision:** Les composants dynamiques, dont le calendrier, ne sont pas repris dans la cible statique.
- **Rationale:** Le projet assume un runtime 100% statique sans logique applicative dynamique.
- **Alternatives considered:**
  - Maintenir une brique dynamique dediee au calendrier: rejetee pour conserver la simplicite d'exploitation.

### 8) Politique de mesure post-bascule
- **Decision:** Aucune propriete analytics/search console n'est requise dans ce lot.
- **Rationale:** Le lot se concentre sur la migration de contenu, la structure SEO et les redirections.
- **Alternatives considered:**
  - Rendre analytics/search console bloquants des la premiere livraison: rejete pour limiter le scope initial.

## Risks / Trade-offs

- [Les liens legacy dans le contenu riche peuvent casser apres refonte des routes] -> Ajouter des regles de reecriture de liens et un link checker en CI avant publication.
- [Incoherences d'encodage sur le contenu historique] -> Executer une normalisation puis des QA manuelles sur un echantillon representatif de pages.
- [Volatilite SEO au moment du cutover] -> Passer par une pre-prod avec table 301 complete, crawl de diff avant mise en ligne et suivi d'indexation apres bascule.
- [Perte d'attentes utilisateur sur les fonctions dynamiques] -> Publier des pages de remplacement claires et mettre a jour les labels de navigation.
- [Derive des chemins d'assets entre Joomla et le nouveau layout statique] -> Inclure un inventaire d'assets et des verifications de ressources cassees dans la validation de release.

## Migration Plan

1. Inventorier et classer les routes publiques Joomla et les entites de contenu dans le perimetre.
2. Definir l'architecture d'information cible, les conventions d'URL et les regles de mapping metadata.
3. Produire des sorties d'extraction et de normalisation depuis MySQL Joomla vers des donnees exploitables par Eleventy.
4. Implementer templates, collections et generation de pages Eleventy selon la politique d'URL cible.
5. Generer le fichier de mapping de redirection legacy -> cible et valider sa couverture.
6. Executer la suite de validation (completude metadata, liens internes, sitemap/robots, verifications des redirections).
7. Publier en pre-production, executer un crawl comparatif, puis basculer en production.
8. Conserver un chemin de rollback en preservant la configuration d'hebergement precedente et les artefacts de redirection.

## Open Questions

Aucune question ouverte bloquante a ce stade.

