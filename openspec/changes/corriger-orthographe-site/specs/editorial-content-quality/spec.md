## ADDED Requirements

### Requirement: Les textes visibles du site MUST être rédigés en français correctement accentué

Les contenus textuels visibles dans les pages HTML et les partials éditoriaux du périmètre `src/` SHALL respecter l'orthographe, la grammaire, les accords et les règles typographiques françaises applicables, notamment l'emploi des accents et des caractères apostrophes.

#### Scenario: Une page publiée ne contient plus de texte français manifestement non accentué
- **WHEN** les contenus éditoriaux du périmètre sont relus avant publication
- **THEN** les mots français nécessitant un accent, une cédille ou un caractère typographique spécifique sont corrigés sans altérer le sens du texte

#### Scenario: Les éléments communs sont cohérents avec les pages
- **WHEN** un visiteur navigue entre plusieurs pages utilisant les mêmes éléments communs
- **THEN** l'en-tête, la navigation et le pied de page présentent les mêmes libellés corrigés et les mêmes formulations validées

### Requirement: Les corrections éditoriales MUST préserver les contrats techniques du site

La correction des textes SHALL préserver les URL, slugs, noms de fichiers, identifiants, chemins de ressources, attributs fonctionnels et valeurs structurées nécessaires au build, sauf correction explicitement justifiée d'une valeur visible.

#### Scenario: Les liens et routes restent fonctionnels après correction
- **WHEN** le build et les contrôles de liens sont exécutés après la relecture
- **THEN** les routes publiques, les liens internes et les références de ressources restent résolus comme avant la correction

#### Scenario: Le contenu corrigé est encodé en UTF-8
- **WHEN** les pages source et les pages générées sont inspectées
- **THEN** les caractères accentués et typographiques sont conservés sans mojibake ni remplacement par des caractères illisibles

### Requirement: La qualité linguistique MUST être vérifiée avant publication

Le processus de publication SHALL inclure une vérification reproductible du périmètre relu, complétée par une relecture humaine des corrections qui ne peuvent pas être déduites de manière fiable par une règle automatique.

#### Scenario: Une vérification de contenu est exécutée sur le périmètre complet
- **WHEN** la validation de la correction éditoriale est lancée
- **THEN** elle couvre les pages HTML et les partials éditoriaux sous `src/` et signale les occurrences suspectes à examiner

#### Scenario: Le build confirme la propagation des corrections
- **WHEN** le build statique est exécuté après la correction
- **THEN** les artefacts HTML générés contiennent les libellés corrigés et les contrôles existants restent passants