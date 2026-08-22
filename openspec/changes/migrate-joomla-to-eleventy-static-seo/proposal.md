## Why

Le site Joomla actuel dépend d'un CMS historique et de composants dynamiques qui compliquent la maintenance, la sécurité et l'évolution. Une migration vers un site statique Eleventy avec une refonte SEO complète permet de simplifier l'exploitation et d'améliorer durablement la visibilité organique.

## What Changes

- Construire un nouveau site statique généré avec Eleventy à partir du contenu publié de Joomla.
- Reconcevoir l'architecture SEO (arborescence, slugs, metadata, maillage interne, canonical, sitemap, robots).
- Mettre en place une stratégie de redirections 301 de l'ancien schéma Joomla vers les nouvelles URLs.
- Supprimer les fonctionnalités dynamiques front (authentification, calendrier dynamique, modules runtime) et ne conserver que des pages statiques.
- Définir une chaîne d'export/transformation des contenus Joomla (articles, catégories, menus) vers les données d'entrée du site statique.

## Capabilities

### New Capabilities
- `static-site-publishing`: Générer et publier un site institutionnel 100% statique depuis le contenu Joomla publié.
- `seo-information-architecture`: Fournir une architecture SEO moderne avec URLs propres, métadonnées complètes, maillage cohérent et redirections de migration.

### Modified Capabilities
- Aucun.

## Impact

- Systèmes affectés: base MySQL Joomla (`fsecoopeidam`), pipeline de build statique, hébergement web statique.
- Code affecté: nouveau projet Eleventy, scripts d'export/normalisation de contenu, templates de pages, gestion des assets.
- Dépendances: runtime Node.js pour build Eleventy, plugins SEO/templating Eleventy selon besoins.
- Exploitation: disparition de la dépendance Joomla/PHP/MySQL en production pour le front public.

