import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SRC_REDIRECTS_PATH = path.join(ROOT, "src", "_redirects");
const DIST_REDIRECTS_PATH = path.join(ROOT, "dist", "_redirects");
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

function parseRedirectLines(content) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

function parseLine(rawLine) {
  const parts = rawLine.split(/\s+/);
  if (parts.length < 3) {
    return { rawLine, valid: false, reason: "format-invalide" };
  }
  const [from, to, status] = parts;
  return { rawLine, from, to, status: Number(status), valid: true };
}

async function main() {
  const srcContent = await fs.readFile(SRC_REDIRECTS_PATH, "utf8");
  const distContent = await fs.readFile(DIST_REDIRECTS_PATH, "utf8");

  const srcLines = parseRedirectLines(srcContent);
  const distLines = parseRedirectLines(distContent);

  const srcSet = new Set(srcLines);
  const distSet = new Set(distLines);

  const missingInDist = srcLines.filter((line) => !distSet.has(line));
  const extraInDist = distLines.filter((line) => !srcSet.has(line));

  const invalidFormat = [];
  const badStatus = [];

  for (const line of srcLines) {
    const parsed = parseLine(line);
    if (!parsed.valid) {
      invalidFormat.push(parsed);
      continue;
    }
    if (parsed.status !== 301) {
      badStatus.push({ line: parsed.rawLine, status: parsed.status });
    }
  }

  const report = {
    totalSourceMappings: srcLines.length,
    missingInDist,
    extraInDist,
    invalidFormat,
    badStatus,
  };

  await fs.mkdir(REPORTS_DIR, { recursive: true });
  await fs.writeFile(path.join(REPORTS_DIR, "redirect-check.json"), `${stableStringify(report)}\n`, "utf8");

  if (missingInDist.length > 0 || extraInDist.length > 0 || invalidFormat.length > 0 || badStatus.length > 0) {
    throw new Error(
      `Verification redirections en echec: ${missingInDist.length} ligne(s) absente(s) dans dist, ${extraInDist.length} ligne(s) en trop, ${invalidFormat.length} format(s) invalide(s), ${badStatus.length} statut(s) non-301`
    );
  }

  console.log(`Verification redirections OK: ${srcLines.length} mapping(s) permanents synchronises.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
