# Regles de migration Joomla -> statique

## Perimetre redirections 301

- Source de verite: corpus statique versionne dans `src/` et mappings definis dans `src/_redirects`
- Toutes les pages statiques Joomla publiques doivent avoir un mapping 301.

## Composants dynamiques exclus

- Login frontend Joomla
- Calendrier dynamique (`com_dpcalendar`)
- Modules runtime dynamiques

Les entrees menu dynamiques sont redirigees vers `/fonctionnalites-retirees/` via `_redirects`.

