import fs from "node:fs/promises";
import path from "node:path";
import { renderPage, PARTIALS_DIR_NAME } from "./render-templates.mjs";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const DIST_DIR = path.join(ROOT, "dist");

async function copyDirRecursive(sourceDir, targetDir) {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    // Les partials sont des entrees de rendu, pas des pages publiees.
    if (entry.name === PARTIALS_DIR_NAME) {
      continue;
    }

    const from = path.join(sourceDir, entry.name);
    const to = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirRecursive(from, to);
      continue;
    }

    if (entry.isFile()) {
      if (entry.name.endsWith(".html")) {
        const html = await renderPage(from, SRC_DIR);
        await fs.writeFile(to, html);
      } else {
        await fs.copyFile(from, to);
      }
    }
  }
}

async function assertSourceReady() {
  const requiredFiles = ["index.html", "robots.txt", "_redirects"];
  const requiredDirs = ["sitemap"];

  for (const fileName of requiredFiles) {
    const target = path.join(SRC_DIR, fileName);
    try {
      const stat = await fs.stat(target);
      if (!stat.isFile()) {
        throw new Error();
      }
    } catch {
      throw new Error(`Source statique invalide: fichier requis manquant dans src/: ${fileName}`);
    }
  }

  for (const dirName of requiredDirs) {
    const target = path.join(SRC_DIR, dirName);
    try {
      const stat = await fs.stat(target);
      if (!stat.isDirectory()) {
        throw new Error();
      }
    } catch {
      throw new Error(`Source statique invalide: dossier requis manquant dans src/: ${dirName}/`);
    }
  }
}

async function main() {
  await assertSourceReady();

  await fs.rm(DIST_DIR, { recursive: true, force: true });
  await fs.mkdir(DIST_DIR, { recursive: true });
  await copyDirRecursive(SRC_DIR, DIST_DIR);

  console.log("Build statique termine: dist/ est une copie publiee de src.");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
