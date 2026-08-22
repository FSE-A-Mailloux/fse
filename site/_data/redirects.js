import fs from "node:fs";
import path from "node:path";

export default function () {
  const filePath = path.join(process.cwd(), "data", "normalized", "redirects.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

