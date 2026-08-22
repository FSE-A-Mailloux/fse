import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, "dist");
const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || "127.0.0.1";

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function safePathFromUrl(urlPathname) {
  const decoded = decodeURIComponent(urlPathname);
  const normalized = path.posix.normalize(decoded);
  const relative = normalized.replace(/^\/+/, "");
  const resolved = path.resolve(DIST_DIR, relative);
  if (!resolved.startsWith(path.resolve(DIST_DIR))) {
    return null;
  }
  return resolved;
}

async function resolveFilePath(urlPathname) {
  const basePath = safePathFromUrl(urlPathname);
  if (!basePath) {
    return null;
  }

  const candidates = [];
  if (urlPathname.endsWith("/")) {
    candidates.push(path.join(basePath, "index.html"));
  } else {
    candidates.push(basePath);
    candidates.push(`${basePath}.html`);
    candidates.push(path.join(basePath, "index.html"));
  }

  for (const candidate of candidates) {
    try {
      const stat = await fs.stat(candidate);
      if (stat.isFile()) {
        return candidate;
      }
    } catch {
      // Ignore missing candidate and continue.
    }
  }

  return null;
}

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url || "/", `http://${HOST}:${PORT}`);
  const filePath = await resolveFilePath(reqUrl.pathname);

  if (!filePath) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 - Not Found");
    return;
  }

  try {
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": CONTENT_TYPES[ext] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(content);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("500 - Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Serveur statique actif sur http://${HOST}:${PORT}`);
  console.log(`Dossier servi: ${DIST_DIR}`);
});

