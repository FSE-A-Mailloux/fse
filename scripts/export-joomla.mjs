import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import mysql from "mysql2/promise";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "data", "raw");
const REPORTS_DIR = path.join(ROOT, "reports");

const DB_CONFIG = {
  host: process.env.JOOMLA_DB_HOST ?? "127.0.0.1",
  port: Number(process.env.JOOMLA_DB_PORT ?? "3399"),
  user: process.env.JOOMLA_DB_USER ?? "root",
  password: process.env.JOOMLA_DB_PASSWORD ?? "root",
  database: process.env.JOOMLA_DB_NAME ?? "fsecoopeidam",
};

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value).sort();
    return `{${keys
      .map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

async function writeStableJson(filePath, data) {
  const content = `${stableStringify(data)}\n`;
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf8");
}

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function parseJsonSafe(input, fallback = {}) {
  if (!input || typeof input !== "string") {
    return fallback;
  }
  try {
    return JSON.parse(input);
  } catch {
    return fallback;
  }
}

function extractAssetCandidates(html) {
  const out = new Set();
  if (!html) {
    return out;
  }
  const regex = /(src|href)=["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const candidate = match[2].trim();
    if (!candidate || candidate.startsWith("mailto:") || candidate.startsWith("#")) {
      continue;
    }
    out.add(candidate);
  }
  return out;
}

async function main() {
  const connection = await mysql.createConnection(DB_CONFIG);

  try {
    const [articlesRows] = await connection.query(
      `SELECT id, title, alias, catid, state, introtext, \`fulltext\` AS full_text, images, created, modified
       FROM joo5121_content
       ORDER BY id ASC`
    );
    const [categoriesRows] = await connection.query(
      `SELECT id, title, alias, parent_id, level, path, extension, published, lft
       FROM joo5121_categories
       WHERE extension='com_content'
       ORDER BY lft ASC`
    );
    const [menuRows] = await connection.query(
      `SELECT id, title, alias, link, type, published, parent_id, level, menutype, lft
       FROM joo5121_menu
       WHERE menutype='mainmenu'
       ORDER BY lft ASC`
    );

    const articles = articlesRows.map((row) => {
      const { full_text, ...rest } = row;
      return {
        ...rest,
        fulltext: full_text,
        images: parseJsonSafe(row.images, {}),
      };
    });

    const categories = categoriesRows.map((row) => ({ ...row }));
    const menus = menuRows.map((row) => ({ ...row }));

    await writeStableJson(path.join(RAW_DIR, "articles.json"), articles);
    await writeStableJson(path.join(RAW_DIR, "categories.json"), categories);
    await writeStableJson(path.join(RAW_DIR, "menus.json"), menus);

    const staticMenus = menus.filter((m) => m.published === 1 && (!m.link || /option=com_content/.test(m.link)));
    const dynamicMenus = menus.filter((m) => m.published === 1 && m.link && !/option=com_content/.test(m.link));

    const assets = new Set();
    for (const article of articles) {
      for (const item of extractAssetCandidates(`${article.introtext ?? ""}\n${article.fulltext ?? ""}`)) {
        assets.add(item);
      }
      const imgs = article.images ?? {};
      if (imgs.image_intro) {
        assets.add(imgs.image_intro);
      }
      if (imgs.image_fulltext) {
        assets.add(imgs.image_fulltext);
      }
    }

    const exportSummary = {
      generatedAt: new Date().toISOString(),
      db: {
        host: DB_CONFIG.host,
        port: DB_CONFIG.port,
        database: DB_CONFIG.database,
      },
      counts: {
        articlesTotal: articles.length,
        articlesPublished: articles.filter((a) => a.state === 1).length,
        categoriesPublished: categories.filter((c) => c.published === 1).length,
        menusTotal: menus.length,
        staticMenusPublished: staticMenus.length,
        dynamicMenusPublished: dynamicMenus.length,
      },
      reproducibility: {
        articlesHash: sha256(stableStringify(articles)),
        categoriesHash: sha256(stableStringify(categories)),
        menusHash: sha256(stableStringify(menus)),
      },
    };

    await writeStableJson(path.join(REPORTS_DIR, "inventory-static-pages.json"), {
      source: "joo5121_menu",
      staticPages: staticMenus.map((m) => ({
        id: m.id,
        title: m.title,
        alias: m.alias,
        link: m.link,
        type: m.type,
        parentId: m.parent_id,
        level: m.level,
      })),
    });

    await writeStableJson(path.join(REPORTS_DIR, "excluded-dynamic-pages.json"), {
      source: "joo5121_menu",
      excludedPages: dynamicMenus.map((m) => ({
        id: m.id,
        title: m.title,
        alias: m.alias,
        link: m.link,
        reason: "dynamic-component-not-in-scope",
      })),
    });

    await writeStableJson(path.join(REPORTS_DIR, "asset-inventory.json"), {
      totalAssetsReferenced: assets.size,
      assets: Array.from(assets).sort(),
    });

    await writeStableJson(path.join(REPORTS_DIR, "export-summary.json"), exportSummary);

    console.log(`Export termine: ${articles.length} articles, ${categories.length} categories, ${menus.length} menus.`);
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error("Echec export Joomla:", error.message);
  process.exitCode = 1;
});




