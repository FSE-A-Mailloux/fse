import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, "dist");
const DATA_DIR = path.join(ROOT, "data", "normalized");
const SITE_ASSETS_DIR = path.join(ROOT, "site", "assets");
const DOCS_DIR = path.join(ROOT, "docs");
const SITE = {
  name: "FSE",
  baseUrl: process.env.SITE_BASE_URL || "https://example.org",
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeUrlPath(url) {
  if (!url || typeof url !== "string") {
    throw new Error("URL de page invalide ou absente.");
  }
  const trimmed = url.trim();
  if (!trimmed.startsWith("/")) {
    throw new Error(`URL invalide (doit commencer par /): ${trimmed}`);
  }
  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}

function outputFileForUrl(url) {
  const normalized = normalizeUrlPath(url);
  if (normalized === "/") {
    return path.join(DIST_DIR, "index.html");
  }
  return path.join(DIST_DIR, normalized.slice(1), "index.html");
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function cleanDist() {
  await fs.rm(DIST_DIR, { recursive: true, force: true });
  await fs.mkdir(DIST_DIR, { recursive: true });
}

async function copyDirRecursive(sourceDir, targetDir) {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const from = path.join(sourceDir, entry.name);
    const to = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      await copyDirRecursive(from, to);
      continue;
    }
    if (entry.isFile()) {
      await fs.copyFile(from, to);
    }
  }
}

function renderLayout({ seoTitle, seoDescription, canonicalUrl, ogTitle, ogDescription, indexable, contentHtml, navPages }) {
  const navLinks = navPages
    .map((navPage) => `<a href="${escapeHtml(navPage.url)}">${escapeHtml(navPage.title)}</a>`)
    .join("\n        ");

  const robotsTag = indexable ? "" : '<meta name="robots" content="noindex, nofollow">';

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(seoTitle)}</title>
    <meta name="description" content="${escapeHtml(seoDescription)}">
    <link rel="canonical" href="${escapeHtml(SITE.baseUrl)}${escapeHtml(canonicalUrl)}">
    ${robotsTag}
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(ogTitle)}">
    <meta property="og:description" content="${escapeHtml(ogDescription)}">
    <meta property="og:url" content="${escapeHtml(SITE.baseUrl)}${escapeHtml(canonicalUrl)}">
    <style>
      @import url("/assets/site.css");
    </style>
  </head>
  <body>
    <header class="topbar">
      <div class="wrap">
        <strong class="brand">${escapeHtml(SITE.name)}</strong>
        <nav class="meta-nav">
          <a href="/">Accueil</a>
          <a href="/sitemap.xml">Sitemap</a>
        </nav>
      </div>
    </header>
    <nav class="subnav" aria-label="Navigation principale">
      <div class="wrap">
        ${navLinks}
      </div>
    </nav>
    <main class="wrap">
      <article>
        ${contentHtml}
      </article>
    </main>
    <footer class="wrap">
      <small>Version statique HTML/CSS</small>
    </footer>
  </body>
</html>
`;
}

function buildIndexContent(indexablePages) {
  const firstPage = indexablePages[0];
  const firstLink = firstPage
    ? `<p><a href="${escapeHtml(firstPage.url)}">Acceder au contenu</a></p>`
    : "";

  const listItems = indexablePages
    .map((page) => `<li><a href="${escapeHtml(page.url)}">${escapeHtml(page.title)}</a></li>`)
    .join("\n");

  return `<h1>${escapeHtml(SITE.name)}</h1>
<p>Bienvenue sur la version statique modernisee du site.</p>
${firstLink}

<h2>Pages disponibles</h2>
<ul>
${listItems}
</ul>`;
}

async function writeTextFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf8");
}

function validatePages(pages) {
  const seenUrls = new Set();
  for (const page of pages) {
    if (!page || typeof page !== "object") {
      throw new Error("Page invalide dans pages.json.");
    }
    const normalizedUrl = normalizeUrlPath(page.url);
    if (seenUrls.has(normalizedUrl)) {
      throw new Error(`URL dupliquee detectee: ${normalizedUrl}`);
    }
    seenUrls.add(normalizedUrl);
    if (!page.title || !page.bodyHtml) {
      throw new Error(`Page incomplete (title/bodyHtml manquant): ${normalizedUrl}`);
    }
  }
}

function buildSitemap(pages) {
  const indexable = pages.filter((page) => page.indexable);
  const urls = indexable
    .map((page) => `  <url>\n    <loc>${SITE.baseUrl}${page.canonicalUrl}</loc>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
  <url>
    <loc>${SITE.baseUrl}/</loc>
  </url>
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /
Disallow: /fonctionnalites-retirees/

Sitemap: ${SITE.baseUrl}/sitemap.xml
`;
}

function buildRedirects(redirects) {
  return redirects.map((redirect) => `${redirect.from} ${redirect.to} ${redirect.status}`).join("\n") + "\n";
}

async function main() {
  const pagesPath = path.join(DATA_DIR, "pages.json");
  const redirectsPath = path.join(DATA_DIR, "redirects.json");

  const pages = await readJson(pagesPath);
  const redirects = await readJson(redirectsPath);
  validatePages(pages);

  await cleanDist();

  const indexablePages = pages.filter((page) => page.indexable);
  const navPages = indexablePages;

  const indexHtml = renderLayout({
    seoTitle: SITE.name,
    seoDescription: "Site statique genere depuis Joomla",
    canonicalUrl: "/",
    ogTitle: SITE.name,
    ogDescription: "Site statique genere depuis Joomla",
    indexable: true,
    contentHtml: buildIndexContent(indexablePages),
    navPages,
  });
  await writeTextFile(path.join(DIST_DIR, "index.html"), indexHtml);

  for (const page of pages) {
    const html = renderLayout({
      seoTitle: page.title,
      seoDescription: page.description,
      canonicalUrl: page.canonicalUrl,
      ogTitle: page.ogTitle,
      ogDescription: page.ogDescription,
      indexable: page.indexable,
      contentHtml: `<h1>${escapeHtml(page.title)}</h1>\n${page.bodyHtml}`,
      navPages,
    });
    await writeTextFile(outputFileForUrl(page.url), html);
  }

  await writeTextFile(path.join(DIST_DIR, "sitemap.xml"), buildSitemap(pages));
  await writeTextFile(path.join(DIST_DIR, "robots.txt"), buildRobots());
  await writeTextFile(path.join(DIST_DIR, "_redirects"), buildRedirects(redirects));

  await copyDirRecursive(SITE_ASSETS_DIR, path.join(DIST_DIR, "assets"));
  await copyDirRecursive(DOCS_DIR, path.join(DIST_DIR, "docs"));

  console.log(`Build statique termine: ${pages.length + 1} page(s) HTML, assets CSS et artefacts SEO generes.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});


