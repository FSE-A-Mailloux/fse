import fs from "node:fs/promises";
import path from "node:path";
import ejs from "ejs";

export const PARTIALS_DIR_NAME = "_partials";

// Rend une page HTML source (avec directives EJS `include`) en HTML autonome.
export async function renderPage(filePath, srcRoot) {
  try {
    return await ejs.renderFile(filePath, {}, { root: srcRoot });
  } catch (error) {
    const relativePath = path.relative(srcRoot, filePath);
    throw new Error(`Echec du rendu de la page "${relativePath}": ${error.message}`);
  }
}

export async function collectHtmlFiles(dir, rootDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    if (entry.name === PARTIALS_DIR_NAME) {
      continue;
    }

    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(await collectHtmlFiles(entryPath, rootDir));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(entryPath);
    }
  }

  return files;
}
