# Conventions Lit uP

Fichier lu automatiquement à chaque session de Claude Code dans ce dépôt.

## Le projet

Dépôt d'entraînement. Chaque membre de l'équipe y a une page personnelle en HTML et CSS pur, publiée sur GitHub Pages. Pas de framework, pas d'étape de construction, pas de dépendances.

## Français

- Ne jamais utiliser le tiret cadratin (—). Préférer les parenthèses, sinon la virgule, le point-virgule ou les deux-points.
- Le nom de l'association s'écrit toujours « Lit uP ». Jamais « Lit uP+ », jamais « LitUp ».
- Ne jamais écrire « vulnérable » ou « vulnérabilité » à propos des jeunes. Écrire « en situation complexe », « en risque de rupture de parcours » ou « aux freins multiples ».
- Ne pas employer « donner envie » dans un texte destiné à l'extérieur. Écrire « inciter à ».
- Écrire « M. » et non « Mr ».
- Écrire « périmètre » et non « circonscription ».

## Charte graphique

Les couleurs sont définies comme variables CSS dans `styles.css`. Toujours les utiliser par leur nom, jamais en écrivant le code hexadécimal dans une page.

- `--anthracite` (#2B3442) : texte principal
- `--canard` (#00989D) : couleur primaire
- `--jaune` (#FCC33E) : accent
- `--violet` (#6B2468) : touche rare, focus clavier
- `--fond` (#F6F6F8) : fond de page

Typographie : Source Sans 3, en 700 pour les titres, 400 pour le texte courant, 700 italique pour les accroches.

## Ce qu'il ne faut pas modifier

- `styles.css` : feuille commune à toutes les pages. Ne pas y toucher sans demander.
- `index.html` : page d'accueil partagée. Les liens vers les pages personnelles y sont ajoutés en une seule fois, en fin de séance.
- `prenom.html` : modèle vierge, à dupliquer et non à remplir.
- La page personnelle d'une autre personne.

Règle générale : un fichier, une personne. C'est ce qui permet de travailler à plusieurs sans conflit.

## Git

- Ne jamais écrire directement sur `main`. Toujours une branche, toujours une demande de fusion.
- Nommer les branches `feat/`, `fix/` ou `content/` suivi du sujet en minuscules avec des tirets.
- Messages de commit en français, une ligne à l'infinitif qui dit ce qui change. Pas de « modifs », « update » ou « wip ».
- Ne jamais ajouter de mention d'auteur ou de co-auteur générée automatiquement dans les commits.

## Secrets

- Ne jamais écrire de clé API dans le code, même temporairement.
- Ne jamais ajouter `.env.local` à un commit. Le fichier `.gitignore` le protège : ne pas le contourner.
- Si une clé apparaît dans un fichier suivi par Git, le signaler immédiatement plutôt que de la retirer discrètement.

## Accessibilité

- Chaque page déclare `lang="fr"` et un titre explicite.
- Les images portent un attribut `alt` décrivant ce qu'elles montrent.
- Le focus clavier reste visible. Ne pas supprimer les règles `:focus-visible` de `styles.css`.
- La page reste lisible sur un écran de téléphone.

## Posture

Proposer les modifications et attendre la validation. Expliquer en une phrase ce qui est fait et pourquoi, dans un français simple : les personnes qui travaillent ici découvrent le développement.
