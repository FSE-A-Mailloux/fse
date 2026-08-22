import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "data", "raw");

function runExport() {
  return new Promise((resolve, reject) => {
    const proc = spawn(process.execPath, [path.join(ROOT, "scripts", "export-joomla.mjs")], {
      stdio: "inherit",
      env: process.env,
    });
    proc.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`export-joomla.mjs a echoue avec code ${code}`));
      }
    });
  });
}

async function hashFile(filePath) {
  const content = await fs.readFile(filePath);
  return crypto.createHash("sha256").update(content).digest("hex");
}

async function snapshotHashes() {
  const files = ["articles.json", "categories.json", "menus.json"];
  const hashes = {};
  for (const file of files) {
    hashes[file] = await hashFile(path.join(RAW_DIR, file));
  }
  return hashes;
}

async function main() {
  await runExport();
  const first = await snapshotHashes();

  await runExport();
  const second = await snapshotHashes();

  const mismatches = Object.keys(first).filter((file) => first[file] !== second[file]);
  if (mismatches.length > 0) {
    throw new Error(`Export non deterministe sur: ${mismatches.join(", ")}`);
  }

  console.log("Verification determinisme export: OK");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

