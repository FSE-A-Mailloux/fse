import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");

let building = false;
let rebuildQueued = false;

function build() {
  if (building) {
    rebuildQueued = true;
    return;
  }

  building = true;
  const child = spawn(process.execPath, ["scripts/build-static.mjs"], {
    cwd: ROOT,
    stdio: "inherit"
  });

  child.on("exit", () => {
    building = false;
    if (rebuildQueued) {
      rebuildQueued = false;
      build();
    }
  });
}

// fs.watch(recursive) n'est pas fiable sur toutes les plateformes: on watch chaque dossier explicitement.
function watchDirRecursive(dir) {
  fs.watch(dir, () => build());

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      watchDirRecursive(path.join(dir, entry.name));
    }
  }
}

build();
watchDirRecursive(SRC_DIR);
console.log(`Watch actif sur ${path.relative(ROOT, SRC_DIR)}/: build relance automatiquement a chaque modification.`);
