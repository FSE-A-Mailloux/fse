import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, "dist");
const REPORTS_DIR = path.join(ROOT, "reports");
const BASELINE_PATH = path.join(REPORTS_DIR, "url-coverage-baseline.json");
const NORMALIZED_PAGES_PATH = path.join(ROOT, "data", "normalized", "pages.json");

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
  return `/${clean.slice(0, -"index.html".length)}`;
}

async function currentPublishedUrls() {
  const files = await collectHtmlFiles(DIST_DIR);
  const urls = new Set();
  for (const filePath of files) {
    const relative = path.relative(DIST_DIR, filePath);
    const url = normalizedUrlFromHtmlRelative(relative);
    if (url) {
      urls.add(url);
    }
  }
  return [...urls].sort();
}

async function captureBaseline() {
  const urls = await currentPublishedUrls();
  await fs.mkdir(REPORTS_DIR, { recursive: true });
  await fs.writeFile(BASELINE_PATH, `${stableStringify({ urls })}\n`, "utf8");
  console.log(`Baseline de couverture capturee (${urls.length} URL(s)).`);
}

async function verifyCoverage() {
  const baseline = JSON.parse(await fs.readFile(BASELINE_PATH, "utf8"));
  const current = await currentPublishedUrls();
  const expectedPages = JSON.parse(await fs.readFile(NORMALIZED_PAGES_PATH, "utf8"));

  const currentSet = new Set(current);
  const baselineSet = new Set(baseline.urls || []);
  const expectedSet = new Set(["/", ...expectedPages.map((page) => page.url)]);

  const missingFromBaseline = [...baselineSet].filter((url) => !currentSet.has(url)).sort();
  const missingFromExpected = [...expectedSet].filter((url) => !currentSet.has(url)).sort();

  const report = {
    baselineCount: baselineSet.size,
    expectedFromDataCount: expectedSet.size,
    currentCount: currentSet.size,
    missingFromBaseline,
    missingFromExpected,
  };

  await fs.mkdir(REPORTS_DIR, { recursive: true });
  await fs.writeFile(path.join(REPORTS_DIR, "coverage-compare.json"), `${stableStringify(report)}\n`, "utf8");

  if (missingFromBaseline.length || missingFromExpected.length) {
    throw new Error(
      `Couverture en echec: ${missingFromBaseline.length} URL baseline manquante(s), ${missingFromExpected.length} URL attendue(s) manquante(s)`
    );
  }

  console.log(`Couverture URL OK: ${currentSet.size} URL(s) publiee(s).`);
}

async function main() {
  const mode = process.argv[2];
  if (mode === "--capture") {
    await captureBaseline();
    return;
  }
  await verifyCoverage();
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

