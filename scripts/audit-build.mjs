import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
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
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  const out = [];
  for (const item of items) {
    const full = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      out.push(...(await collectHtmlFiles(full)));
    } else if (item.isFile() && item.name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  const htmlFiles = await collectHtmlFiles(DIST_DIR);
  const errors = [];

  for (const file of htmlFiles) {
    const content = await fs.readFile(file, "utf8");
    const relative = path.relative(DIST_DIR, file).replaceAll("\\", "/");

    const checks = [
      { name: "title", ok: /<title>[^<]+<\/title>/i.test(content) },
      { name: "description", ok: /<meta\s+name="description"\s+content="[^"]+"/i.test(content) },
      { name: "canonical", ok: /<link\s+rel="canonical"\s+href="[^"]+"/i.test(content) },
      { name: "og:title", ok: /<meta\s+property="og:title"\s+content="[^"]+"/i.test(content) },
      { name: "og:description", ok: /<meta\s+property="og:description"\s+content="[^"]+"/i.test(content) },
    ];

    for (const check of checks) {
      if (!check.ok) {
        errors.push({ file: relative, missing: check.name });
      }
    }
  }

  const report = {
    checkedFiles: htmlFiles.length,
    blockingIssues: errors.length,
    issues: errors,
  };

  await fs.mkdir(REPORTS_DIR, { recursive: true });
  await fs.writeFile(path.join(REPORTS_DIR, "preprod-audit.json"), `${stableStringify(report)}\n`, "utf8");

  if (errors.length > 0) {
    throw new Error(`Audit SEO en echec: ${errors.length} probleme(s)`);
  }

  console.log(`Audit SEO OK sur ${htmlFiles.length} pages HTML.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

