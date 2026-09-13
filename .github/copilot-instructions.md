# Instructions pour GitHub Copilot

## OpenSpec

Le CLI `openspec` n'est pas installé globalement sur ce poste : la commande
`openspec` seule échoue avec `commande introuvable`.

Le paquet est une dépendance locale du projet (`@fission-ai/openspec` dans
`package.json`). Il faut donc **toujours préfixer les commandes avec `npx`**,
par exemple :

```bash
npx openspec status --change "<name>" --json
npx openspec instructions <artifact-id> --change "<name>" --json
npx openspec list --specs
```

Ne pas retenter la commande sans `npx`, et ne pas tenter d'installer
`openspec` globalement.
