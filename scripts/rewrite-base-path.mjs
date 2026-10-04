#!/usr/bin/env node
// Reecrit les chemins racine absolus (href/src/action, y compris navigation.js) sous dist/
// pour qu'ils fonctionnent une fois servis depuis un sous-chemin (apercu de PR).
import fs from "node:fs/promises";
import path from "node:path";

const [, , distArg, basePathArg] = process.argv;

if (!distArg || !basePathArg) {
  console.error("Usage: node scripts/rewrite-base-path.mjs <dist-dir> <base-path>");
  process.exitCode = 1;
  process.exit();
}

const DIST_DIR = path.resolve(distArg);
// Le chemin de base ne doit pas se terminer par "/" (ex: "/fse/pr-4").
const BASE_PATH = basePathArg.replace(/\/+$/, "");

if (!BASE_PATH.startsWith("/")) {
  console.error(`Chemin de base invalide (doit commencer par "/"): ${basePathArg}`);
  process.exitCode = 1;
  process.exit();
}

const REWRITE_EXTENSIONS = new Set([".html", ".js"]);

// Cible href=/src=/action= (HTML), href: (objets JS), et url(...) (@import CSS), avec guillemets simples ou doubles.
// Le lookahead (?!\/) evite de reecrire les chemins protocole-relatif ("//exemple.com").
const ATTR_PATTERN = /((?:href|src|action)\s*[:=]\s*)(["'])\/(?!\/)/g;
const URL_FUNCTION_PATTERN = /(url\(\s*)(["']?)\/(?!\/)/g;

function rewriteContent(content) {
  return content
    .replace(ATTR_PATTERN, (_match, prefix, quote) => `${prefix}${quote}${BASE_PATH}/`)
    .replace(URL_FUNCTION_PATTERN, (_match, prefix, quote) => `${prefix}${quote}${BASE_PATH}/`);
}

async function walkAndRewrite(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walkAndRewrite(entryPath);
      continue;
    }

    if (entry.isFile() && REWRITE_EXTENSIONS.has(path.extname(entry.name))) {
      const original = await fs.readFile(entryPath, "utf8");
      const rewritten = rewriteContent(original);
      if (rewritten !== original) {
        await fs.writeFile(entryPath, rewritten);
      }
    }
  }
}

async function main() {
  const stat = await fs.stat(DIST_DIR).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    throw new Error(`Dossier dist introuvable: ${DIST_DIR}`);
  }

  await walkAndRewrite(DIST_DIR);
  console.log(`Chemins racine absolus reecrits avec le prefixe "${BASE_PATH}" dans ${DIST_DIR}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
