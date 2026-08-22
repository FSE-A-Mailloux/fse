import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, "dist");
const REPORTS_DIR = path.join(ROOT, "reports");
const BASELINE_PATH = path.join(REPORTS_DIR, "html-structure-baseline.json");

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

function tagStructureSignature(html) {
  const tags = html.match(/<\/?[a-zA-Z][^>]*>/g) || [];
  return tags
    .filter((tag) => {
      const compact = tag.replace(/\s+/g, " ").trim().toLowerCase();
      if (compact.startsWith("<meta name=\"robots\"") || compact.startsWith("<meta name='robots'")) {
        return false;
      }
      if (compact.startsWith("<link rel=\"stylesheet\"") || compact.startsWith("<link rel='stylesheet'")) {
        return false;
      }
      return true;
    })
    .map((tag) => {
      const simplified = tag
        .replace(/\s+/g, " ")
        .replace(/=\s*"[^"]*"/g, "")
        .replace(/=\s*'[^']*'/g, "")
        .trim();
      return simplified;
    })
    .join("\n");
}

async function snapshotCurrentStructure() {
  const htmlFiles = await collectHtmlFiles(DIST_DIR);
  const snapshot = {};
  for (const filePath of htmlFiles) {
    const relative = path.relative(DIST_DIR, filePath).replaceAll("\\", "/");
    const html = await fs.readFile(filePath, "utf8");
    snapshot[relative] = tagStructureSignature(html);
  }
  return snapshot;
}

function compareSnapshots(baseline, current) {
  const missing = [];
  const added = [];
  const changed = [];

  for (const key of Object.keys(baseline)) {
    if (!(key in current)) {
      missing.push(key);
      continue;
    }
    if (baseline[key] !== current[key]) {
      changed.push(key);
    }
  }

  for (const key of Object.keys(current)) {
    if (!(key in baseline)) {
      added.push(key);
    }
  }

  return { missing, added, changed };
}

async function captureBaseline() {
  const snapshot = await snapshotCurrentStructure();
  await fs.mkdir(REPORTS_DIR, { recursive: true });
  await fs.writeFile(BASELINE_PATH, `${stableStringify(snapshot)}\n`, "utf8");
  console.log(`Baseline HTML structure capturee (${Object.keys(snapshot).length} fichier(s)).`);
}

async function verifyParity() {
  const baseline = JSON.parse(await fs.readFile(BASELINE_PATH, "utf8"));
  const current = await snapshotCurrentStructure();
  const diff = compareSnapshots(baseline, current);

  const report = {
    baselineCount: Object.keys(baseline).length,
    currentCount: Object.keys(current).length,
    missing: diff.missing,
    added: diff.added,
    changed: diff.changed,
  };

  await fs.mkdir(REPORTS_DIR, { recursive: true });
  await fs.writeFile(path.join(REPORTS_DIR, "html-parity-report.json"), `${stableStringify(report)}\n`, "utf8");

  if (diff.missing.length || diff.added.length || diff.changed.length) {
    throw new Error(
      `Parite HTML en echec: ${diff.missing.length} manquant(s), ${diff.added.length} ajoute(s), ${diff.changed.length} modifie(s)`
    );
  }

  console.log(`Parite HTML stricte OK sur ${Object.keys(current).length} fichier(s).`);
}

async function selfTest() {
  const baseline = { "index.html": "<html>\n<body>\n</body>\n</html>" };
  const current = { "index.html": "<html>\n<body>\n<section>\n</section>\n</body>\n</html>" };
  const diff = compareSnapshots(baseline, current);
  if (diff.changed.length !== 1) {
    throw new Error("Self-test parite HTML en echec: divergence non detectee.");
  }
  console.log("Self-test parite HTML OK: divergence volontaire detectee.");
}

async function main() {
  const mode = process.argv[2];
  if (mode === "--capture") {
    await captureBaseline();
    return;
  }
  if (mode === "--self-test") {
    await selfTest();
    return;
  }
  await verifyParity();
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});


