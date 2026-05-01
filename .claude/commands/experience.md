---
description: Interview interactive pour ajouter ou enrichir une expérience pro (resume.json + page SEO sur /experiences)
argument-hint: "[nouvelle | <slug ou nom d'une expérience existante>]"
allowed-tools: Read, Edit, Write, Bash
---

# /experience

Tu pilotes une interview interactive en français avec Guillaume pour ajouter ou enrichir **une** expérience professionnelle. Le résultat alimente :

1. `content/resume.json` — données structurées utilisées par `/resume` (CV ATS + PDF)
2. `content/experiences/<slug>.md` — article long format (700-1200 mots) servi sur `/experiences/<slug>`, indexé par les moteurs de recherche

---

## Étape 1 — Mode

Lis d'abord `content/resume.json` et `content/experiences/`.

L'argument `$ARGUMENTS` te donne un indice :
- Vide ou `nouvelle` → nouvelle expérience.
- Sinon → tente de matcher avec un `slug` existant (ou nom d'entreprise) ; si trouvé, mode **enrichissement** ; sinon, demande confirmation.

Au démarrage, affiche en 1 phrase ce que tu as compris et demande confirmation avant d'enchaîner.

## Étape 2 — Interview

Pose les questions **une par une**, en français, ton conversationnel. Reformule sous forme de récap toutes les 3-4 questions pour valider la compréhension. Couvre obligatoirement :

1. **Période** précise (mois + année début / fin, ou "Présent")
2. **Entreprise** : nom, secteur, taille (effectif), stade (startup early / scale-up / grand groupe), business
3. **Rôle exact** + niveau de séniorité, rattachement hiérarchique, équipe encadrée
4. **Contexte d'arrivée** : quel problème tu venais résoudre, quelle était la situation tech / produit / équipe
5. **Missions** principales (3-5)
6. **Réalisations concrètes** : ce que tu as construit / mené / livré, **avec des chiffres** (taille équipe, ARR, nb users, latence, conversion, time-to-market, économies, etc.). N'avance pas tant que tu n'as pas extrait au moins 2 métriques.
7. **Défis** : moments durs, choix difficiles, comment tu les as gérés
8. **Stack technique** exhaustif (langages, frameworks, infra, outils, méthodes)
9. **Soft skills** & compétences transverses à mettre en avant
10. **Anecdote** ou réussite mémorable (1-2)
11. **Témoignage** d'un manager / collègue (cite si tu en as un, optionnel)
12. **Mots-clés** à faire remonter pour ATS / SEO (techs, méthodes, secteurs cibles)

Règle : si une réponse est vague ou trop courte, **relance avec une sous-question**. Ne jamais inventer.

## Étape 3 — Validation

Une fois tout récolté, affiche un récap structuré (10-12 bullets) et demande :
> Est-ce que tu valides ? On peut corriger / compléter avant que je rédige.

Attend le feu vert.

## Étape 4 — Rédaction

Génère :

### Bullets (`resume.json` → `bullets`)

- 3 à 6 bullets max
- Chacune commence par un **verbe d'action fort** au substantif (Pilotage, Conception, Migration, Refonte, Déploiement, Industrialisation, Encadrement…)
- Format : verbe + objet précis + chiffre / scope / impact
- Pas de "responsable de", pas de passif, pas de buzzwords creux

### Impact (`resume.json` → `impact`)

- 1 phrase max, l'outcome le plus marquant, **avec un chiffre quantifié** quand c'est possible

### Stack (`resume.json` → `stack`) et Tags (`resume.json` → `tags`)

- `stack` = techs/outils littéraux (NodeJS, PostgreSQL, Kubernetes, OpenAI…)
- `tags` = mots-clés rôle / secteur en kebab-case (cto, saas, rh, ia, leadership, e-commerce…)

### metaDescription (`resume.json` → `metaDescription`)

- 140-160 caractères
- Verbes d'action + rôle + entreprise + outcome principal
- Français naturel, pas de keyword stuffing

### Slug

- kebab-case dérivé du nom d'entreprise, court, unique parmi les autres slugs déjà présents

### Article long format (`content/experiences/<slug>.md`)

**Frontmatter YAML** (obligatoire) :

```yaml
---
title: <Rôle> chez <Entreprise>
description: <metaDescription identique au resume.json>
slug: <slug>
period: <même format que resume.json>
company: <Entreprise>
location: <Lieu>
role: <title>
stack: [<...>]
tags: [<...>]
navigation:
  title: <Entreprise> — <Rôle>
---
```

**Corps du markdown** : 700 à 1200 mots, en français, avec ces sections **dans cet ordre exact**, chacune en `##` :

1. **## Contexte** — qui était l'entreprise, état du produit / tech / équipe à ton arrivée. **Premier paragraphe obligatoire** : il doit contenir le nom de l'entreprise, le rôle, la période, le secteur (signal SEO fort).
2. **## Mission** — pourquoi ils t'ont embauché, quels enjeux explicites
3. **## Ce que j'ai mené** — réalisations concrètes, en sous-sections `###` portant les noms exacts des techs / domaines (ex: `### Migration vers Kubernetes`, `### Plateforme RH`). Une sous-section par chantier majeur.
4. **## Stack & méthodes** — techs, process, choix orga
5. **## Résultats** — outcomes quantifiés, ce qui a changé grâce à toi (liste ou paragraphes courts)
6. **## Ce que j'en retiens** — paragraphe court réflexif, humanise la page (utile pour le dwell time / l'engagement)

**Règles SEO non négociables :**

- Pas de `# H1` dans le corps (le titre frontmatter génère le H1 via la page)
- Chaque `##` contient au moins un mot-clé cible (tech, rôle, secteur)
- Densité de mots-clés naturelle : utilise des **synonymes sémantiques** (CTO ≈ leader technique ≈ direction technique ; lead dev ≈ développeur principal)
- Cite les **noms de techs concrets** (VueJS, NodeJS, Kubernetes, etc.) — c'est ce qui fait remonter sur "VueJS Bordeaux", "CTO freelance", etc.
- Utilise `**bold**` pour 3-5 métriques ou termes-clés max — sparingly
- 1 lien interne vers `/contact` au bas de l'article ("envie d'en discuter ?", "discutons de votre projet")
- Ton : 1ʳᵉ personne, sobre, factuel, concret. Évite le marketing creux.
- Phrases courtes. Pas de pavé.

## Étape 5 — Écriture des fichiers

1. Sur `content/resume.json` : utilise **Edit** pour ajouter ou remplacer l'entrée correspondant au `slug` dans `experiences[]`. Ne touche à rien d'autre. Conserve l'ordre chronologique inverse (plus récent en premier).
2. Sur `content/experiences/<slug>.md` : utilise **Write** (création) ou **Edit** (mise à jour) pour le markdown long format.
3. Vérifie en lisant les fichiers que le JSON est valide et que le frontmatter est bien fermé.

## Étape 6 — Récap final

Affiche en 5 lignes max :
- Le slug
- Le path du markdown créé
- Le nb de mots de l'article
- Les 3 mots-clés SEO dominants choisis
- Le rappel : `pnpm dev` puis `/experiences/<slug>` pour vérifier visuellement

---

## Garde-fous

- **Aucune invention** : si une info manque, demande. N'extrapole pas chiffres / clients / outcomes.
- **Pas de modification** des autres expériences ni d'autres fichiers que ceux listés.
- **Pas d'emoji** dans le contenu généré (CV pro + SEO sobre).
- Si Guillaume change d'avis pendant l'interview, accepte et reprends à la question concernée.
- Si une métrique citée semble fragile (estimation, ordre de grandeur), tu dois le formuler honnêtement (ex : "réduction d'environ X%", "gain estimé de…").

`$ARGUMENTS`
