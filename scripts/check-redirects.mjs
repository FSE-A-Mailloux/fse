import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

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

async function main() {
  const normalized = JSON.parse(
    await fs.readFile(path.join(ROOT, "data", "normalized", "redirects.json"), "utf8")
  );
  const redirectsText = await fs.readFile(path.join(ROOT, "dist", "_redirects"), "utf8");

  const missing = normalized.filter((r) => {
    const expected = `${r.from} ${r.to} ${r.status}`;
    return !redirectsText.includes(expected);
  });

  const badStatus = normalized.filter((r) => r.status !== 301);

  const report = {
    totalExpected: normalized.length,
    missingMappings: missing,
    badStatus,
  };

  await fs.mkdir(path.join(ROOT, "reports"), { recursive: true });

  await fs.writeFile(
    path.join(ROOT, "reports", "redirect-check.json"),
    `${stableStringify(report)}\n`,
    "utf8"
  );

  if (missing.length > 0 || badStatus.length > 0) {
    throw new Error(
      `Verification redirections en echec: ${missing.length} mapping(s) manquant(s), ${badStatus.length} statut(s) invalide(s)`
    );
  }

  console.log(`Verification redirections OK: ${normalized.length} mapping(s) 301.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

