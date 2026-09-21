/**
 * genere-accroche.mjs
 *
 * Demande à Claude trois propositions d'accroche pour une page personnelle.
 * La clé API est lue dans le fichier .env.local, qui n'est jamais envoyé sur GitHub.
 *
 * Utilisation :
 *   node genere-accroche.mjs marie
 */

import { readFileSync, existsSync } from "node:fs";

// ---------------------------------------------------------------------------
// 1. Lire la clé dans .env.local
// ---------------------------------------------------------------------------

function lireEnvLocal() {
  if (!existsSync(".env.local")) {
    console.error(
      "\nLe fichier .env.local est introuvable.\n" +
      "Duplique .env.local.exemple, renomme la copie en .env.local, puis colle la clé dedans.\n"
    );
    process.exit(1);
  }

  const variables = {};
  const contenu = readFileSync(".env.local", "utf8");

  for (const ligne of contenu.split("\n")) {
    const propre = ligne.trim();
    if (propre === "" || propre.startsWith("#")) continue;

    const separateur = propre.indexOf("=");
    if (separateur === -1) continue;

    const nom = propre.slice(0, separateur).trim();
    const valeur = propre.slice(separateur + 1).trim().replace(/^["']|["']$/g, "");
    variables[nom] = valeur;
  }

  return variables;
}

const env = lireEnvLocal();
const cle = env.ANTHROPIC_API_KEY;

if (!cle) {
  console.error(
    "\nLa variable ANTHROPIC_API_KEY est vide dans .env.local.\n" +
    "Colle la clé juste après le signe égal, sans guillemets ni espace.\n"
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Lire la page de la personne
// ---------------------------------------------------------------------------

const prenom = process.argv[2];

if (!prenom) {
  console.error("\nIndique ton prénom : node genere-accroche.mjs marie\n");
  process.exit(1);
}

const fichier = `${prenom.toLowerCase()}.html`;

if (!existsSync(fichier)) {
  console.error(
    `\nLe fichier ${fichier} n'existe pas encore.\n` +
    "Crée d'abord ta page à partir de prenom.html, puis relance.\n"
  );
  process.exit(1);
}

// On retire les balises pour ne garder que le texte visible de la page
const texte = readFileSync(fichier, "utf8")
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

// ---------------------------------------------------------------------------
// 3. Demander trois propositions à Claude
// ---------------------------------------------------------------------------

const consigne = `Voici le contenu de la page de présentation d'une personne qui travaille chez Lit uP, une association qui accompagne des jeunes de 14 à 25 ans.

${texte}

Propose trois accroches possibles pour cette page. Une accroche dit en une phrase ce que la personne fait, dans des mots que comprendrait quelqu'un qui arrive demain.

Contraintes :
- une seule phrase par proposition, moins de 20 mots
- en français, sans tiret cadratin
- concret plutôt que valorisant : ce qu'elle fait, pas ce qu'elle est
- trois angles différents

Réponds uniquement par les trois phrases, numérotées de 1 à 3, sans introduction ni commentaire.`;

console.log(`\nDemande envoyée à Claude pour ${fichier}...\n`);

let reponse;

try {
  reponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": cle,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      messages: [{ role: "user", content: consigne }],
    }),
  });
} catch (erreur) {
  console.error("\nImpossible de joindre l'API. Vérifie ta connexion internet.\n");
  process.exit(1);
}

if (!reponse.ok) {
  const details = await reponse.text();

  if (reponse.status === 401) {
    console.error("\nLa clé API est refusée. Vérifie qu'elle est bien collée en entier dans .env.local.\n");
  } else {
    console.error(`\nL'API a répondu une erreur ${reponse.status} :\n${details}\n`);
  }
  process.exit(1);
}

const donnees = await reponse.json();
const propositions = donnees.content
  .filter((bloc) => bloc.type === "text")
  .map((bloc) => bloc.text)
  .join("\n");

console.log("Trois propositions :\n");
console.log(propositions);
console.log(
  "\nChoisis celle qui te convient, ou aucune, et remplace le texte de la balise " +
  `<p class="accroche"> dans ${fichier}.\n`
);
