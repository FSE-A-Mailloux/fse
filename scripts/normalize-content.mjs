import fs from "node:fs/promises";
import path from "node:path";
import he from "he";

const { decode } = he;

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "data", "raw");
const NORMALIZED_DIR = path.join(ROOT, "data", "normalized");
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

async function writeStableJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${stableStringify(data)}\n`, "utf8");
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

function slugify(input) {
  return String(input ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "page";
}

function parseContentLink(link) {
  if (!link || !link.includes("option=com_content")) {
    return null;
  }
  const query = link.includes("?") ? link.split("?")[1] : link;
  const params = new URLSearchParams(query);
  const view = params.get("view");
  const id = Number(params.get("id"));
  if (!view || Number.isNaN(id)) {
    return null;
  }
  return { view, id };
}

function sanitizeAndRewriteHtml(html, mapByArticleId, mapByCategoryId, linkReport) {
  if (!html) {
    return "";
  }
  let out = decode(String(html));

  out = out.replace(/href=["']index\.php\?([^"']+)["']/gi, (full, query) => {
    const params = new URLSearchParams(query.replace(/&amp;/g, "&"));
    const option = params.get("option");
    const view = params.get("view");
    const id = Number(params.get("id"));

    if (option !== "com_content" || Number.isNaN(id)) {
      linkReport.push({ type: "non-rewriteable", source: full });
      return full;
    }

    if (view === "article" && mapByArticleId.has(id)) {
      return `href="${mapByArticleId.get(id)}"`;
    }
    if (view === "category" && mapByCategoryId.has(id)) {
      return `href="${mapByCategoryId.get(id)}"`;
    }

    linkReport.push({ type: "missing-target", source: full });
    return full;
  });

  return out;
}

function legacyCandidates(menuItem) {
  const out = [];
  if (menuItem?.link) {
    out.push(`/index.php?${menuItem.link.split("?")[1] ?? ""}`);
    out.push(`/${menuItem.link}`);
  }
  if (menuItem?.alias) {
    out.push(`/${menuItem.alias}`);
  }
  return Array.from(new Set(out.filter(Boolean)));
}

async function main() {
  const articles = await readJson(path.join(RAW_DIR, "articles.json"));
  const categories = await readJson(path.join(RAW_DIR, "categories.json"));
  const menus = await readJson(path.join(RAW_DIR, "menus.json"));

  const publishedArticles = new Map(articles.filter((a) => a.state === 1).map((a) => [a.id, a]));
  const publishedCategories = new Map(categories.filter((c) => c.published === 1).map((c) => [c.id, c]));
  const menusById = new Map(menus.map((m) => [m.id, m]));

  const publicMenus = menus.filter((m) => m.published === 1).sort((a, b) => a.lft - b.lft);
  const staticMenus = [];
  const dynamicMenus = [];

  for (const menu of publicMenus) {
    if (!menu.link || menu.link.includes("option=com_content")) {
      staticMenus.push(menu);
    } else {
      dynamicMenus.push(menu);
    }
  }

  const parentCache = new Map();
  const routeForMenu = (menu) => {
    if (parentCache.has(menu.id)) {
      return parentCache.get(menu.id);
    }
    const segments = [slugify(menu.alias || menu.title)];
    let parentId = menu.parent_id;
    while (parentId && parentId !== 1 && menusById.has(parentId)) {
      const parent = menusById.get(parentId);
      segments.unshift(slugify(parent.alias || parent.title));
      parentId = parent.parent_id;
    }
    const route = `/${segments.join("/")}/`;
    parentCache.set(menu.id, route);
    return route;
  };

  const articleUrlById = new Map();
  const categoryUrlById = new Map();

  for (const menu of staticMenus) {
    const parsed = parseContentLink(menu.link);
    const url = routeForMenu(menu);
    if (parsed?.view === "article") {
      articleUrlById.set(parsed.id, url);
    }
    if (parsed?.view === "category") {
      categoryUrlById.set(parsed.id, url);
    }
  }

  const pages = [];
  const redirects = [];
  const unresolvedTargets = [];
  const linkReport = [];

  for (const menu of staticMenus) {
    const url = routeForMenu(menu);
    const parsed = parseContentLink(menu.link);
    let title = decode(menu.title || "").trim() || "Sans titre";
    let bodyHtml = "";
    let indexable = true;

    if (!parsed) {
      bodyHtml = `<p>Section: ${title}</p>`;
    } else if (parsed.view === "article") {
      const article = publishedArticles.get(parsed.id);
      if (!article) {
        unresolvedTargets.push({ menuId: menu.id, menuTitle: menu.title, missing: `article:${parsed.id}` });
        continue;
      }
      title = decode(article.title || title).trim() || title;
      bodyHtml = `${article.introtext || ""}\n${article.fulltext || ""}`;
    } else if (parsed.view === "category") {
      const category = publishedCategories.get(parsed.id);
      if (!category) {
        unresolvedTargets.push({ menuId: menu.id, menuTitle: menu.title, missing: `category:${parsed.id}` });
        continue;
      }
      title = decode(category.title || title).trim() || title;
      const articleItems = Array.from(publishedArticles.values())
        .filter((a) => a.catid === parsed.id)
        .sort((a, b) => a.id - b.id)
        .map((a) => {
          const articleUrl = articleUrlById.get(a.id) || `${url}${slugify(a.alias || a.title)}/`;
          return `<li><a href="${articleUrl}">${decode(a.title)}</a></li>`;
        })
        .join("\n");
      bodyHtml = `<h2>${title}</h2><ul>${articleItems}</ul>`;
    }

    const normalizedBody = sanitizeAndRewriteHtml(bodyHtml, articleUrlById, categoryUrlById, linkReport);
    const descriptionText = decode(normalizedBody.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()).slice(0, 155);

    const page = {
      sourceMenuId: menu.id,
      title,
      url,
      canonicalUrl: url,
      indexable,
      description: descriptionText || `Page ${title}`,
      ogTitle: title,
      ogDescription: descriptionText || `Page ${title}`,
      legacyUrls: legacyCandidates(menu),
      bodyHtml: normalizedBody,
    };

    pages.push(page);
    for (const legacy of page.legacyUrls) {
      redirects.push({ from: legacy, to: page.url, status: 301 });
    }
  }

  const fallbackUrl = "/fonctionnalites-retirees/";
  pages.push({
    sourceMenuId: null,
    title: "Fonctionnalites retirees",
    url: fallbackUrl,
    canonicalUrl: fallbackUrl,
    indexable: false,
    description: "Certaines fonctionnalites dynamiques Joomla ne sont pas reprises dans le site statique.",
    ogTitle: "Fonctionnalites retirees",
    ogDescription: "Certaines fonctionnalites dynamiques Joomla ne sont pas reprises dans le site statique.",
    legacyUrls: [],
    bodyHtml: "<p>Le calendrier dynamique, le login frontend et les modules runtime ne sont pas repris dans cette version statique.</p>",
  });

  for (const menu of dynamicMenus) {
    const from = legacyCandidates(menu);
    for (const candidate of from) {
      redirects.push({ from: candidate, to: fallbackUrl, status: 301 });
    }
  }

  pages.sort((a, b) => a.url.localeCompare(b.url));

  const redirectsUnique = Array.from(
    new Map(redirects.map((item) => [`${item.from}->${item.to}`, item])).values()
  ).sort((a, b) => a.from.localeCompare(b.from));

  const seoAcceptance = {
    indexablePages: pages.filter((p) => p.indexable).length,
    nonIndexablePages: pages.filter((p) => !p.indexable).length,
    rules: {
      requiresTitle: true,
      requiresDescription: true,
      requiresCanonical: true,
      requiresOpenGraph: true,
      analyticsRequired: false,
      searchConsoleRequired: false,
    },
  };

  await writeStableJson(path.join(NORMALIZED_DIR, "pages.json"), pages);
  await writeStableJson(path.join(NORMALIZED_DIR, "redirects.json"), redirectsUnique);
  await writeStableJson(path.join(REPORTS_DIR, "internal-link-report.json"), {
    unresolvedTargets,
    rewriteIssues: linkReport,
  });
  await writeStableJson(path.join(REPORTS_DIR, "seo-acceptance.json"), seoAcceptance);

  if (unresolvedTargets.length > 0) {
    throw new Error(`Targets de navigation non resolues: ${unresolvedTargets.length}`);
  }

  console.log(`Normalisation terminee: ${pages.length} pages, ${redirectsUnique.length} redirections.`);
}

main().catch((error) => {
  console.error("Echec normalisation:", error.message);
  process.exitCode = 1;
});


