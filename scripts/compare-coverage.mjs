import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const DIST_DIR = path.join(ROOT, "dist");
const REPORTS_DIR = path.join(ROOT, "reports");

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value).sort();
    return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

async function collectHtmlFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(full)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function normalizedUrlFromHtmlRelative(relativePath) {
  const clean = relativePath.replaceAll("\\", "/");
  if (clean === "index.html") {
    return "/";
  }
  if (!clean.endsWith("/index.html")) {
    return null;
  }
  return `/${clean.slice(0, -"/index.html".length)}/`;
}

async function publishedUrlsFrom(dirPath) {
  const files = await collectHtmlFiles(dirPath);
  const urls = new Set();
  for (const filePath of files) {
    const relative = path.relative(dirPath, filePath);
    const url = normalizedUrlFromHtmlRelative(relative);
    if (url) {
      urls.add(url);
    }
  }
  return [...urls].sort();
}

async function main() {
  const sourceUrls = await publishedUrlsFrom(SRC_DIR);
  const builtUrls = await publishedUrlsFrom(DIST_DIR);

  const sourceSet = new Set(sourceUrls);
  const builtSet = new Set(builtUrls);

  const missingFromBuild = sourceUrls.filter((url) => !builtSet.has(url));
  const extraInBuild = builtUrls.filter((url) => !sourceSet.has(url));

  const report = {
    sourceCount: sourceUrls.length,
    buildCount: builtUrls.length,
    missingFromBuild,
    extraInBuild,
  };

  await fs.mkdir(REPORTS_DIR, { recursive: true });
  await fs.writeFile(path.join(REPORTS_DIR, "coverage-compare.json"), `${stableStringify(report)}\n`, "utf8");

  if (missingFromBuild.length || extraInBuild.length) {
    throw new Error(
      `Couverture en echec: ${missingFromBuild.length} URL source manquante(s) dans dist, ${extraInBuild.length} URL en trop dans dist`
    );
  }

  console.log(`Couverture URL OK: ${builtUrls.length} URL(s) publiee(s) conformes a src/.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
