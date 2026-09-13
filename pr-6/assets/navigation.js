(function () {
  "use strict";

  var sections = {
    accueil: {
      root: "/",
      items: [
        { href: "/fse/pr-6/", label: "Accueil" }
      ]
    },
    fse: {
      root: "/fse/",
      items: [
        { href: "/fse/pr-6/fse/", label: "Vue d'ensemble" },
        { href: "/fse/pr-6/fse/comptes-rendus/", label: "Comptes rendus" },
        { href: "/fse/pr-6/fse/fse-les-actions/", label: "Les actions" },
        { href: "/fse/pr-6/fse/fse-les-actions/autres-dons-soutiens/", label: "Autres soutiens" },
        { href: "/fse/pr-6/fse/fse-les-actions/equipements-materiels/", label: "Équipements" },
        { href: "/fse/pr-6/fse/fse-les-actions/photos-de-classe/", label: "Photos de classe" },
        { href: "/fse/pr-6/fse/fse-les-actions/voyages-scolaires/", label: "Voyages scolaires" },
        { href: "/fse/pr-6/fse/fse-qui-sommes-nous/", label: "Qui sommes-nous" }
      ]
    },
    actualites: {
      root: "/actualites/",
      items: [
        { href: "/fse/pr-6/actualites/", label: "Toutes les actualités" },
        { href: "/fse/pr-6/actualites/prochaine-ag/", label: "Prochaine AG" },
        { href: "/fse/pr-6/actualites/ouverture-des-commandes-en-ligne/", label: "Commandes" },
        { href: "/fse/pr-6/actualites/vente-de-brioches/", label: "Vente de brioches" }
      ]
    },
    coopsco: {
      root: "/coopsco/",
      items: [
        { href: "/fse/pr-6/coopsco/", label: "Vue d'ensemble" },
        { href: "/fse/pr-6/coopsco/coopsco-commande/", label: "Commande" }
      ]
    },
    liens: {
      root: "/liens-avec-les-associations/",
      items: [
        { href: "/fse/pr-6/liens-avec-les-associations/", label: "Liens avec les associations" }
      ]
    },
    contact: {
      root: "/nous-contacter/",
      items: [
        { href: "/fse/pr-6/nous-contacter/", label: "Nous contacter" }
      ]
    }
  };

  function normalizePath(pathname) {
    if (!pathname) {
      return "/";
    }
    return pathname.endsWith("/") ? pathname : pathname + "/";
  }

  function sectionFromPath(pathname) {
    if (pathname === "/" || pathname === "/home/") return "accueil";
    if (pathname.indexOf("/sitemap/") === 0) return "accueil";
    if (pathname.indexOf("/actualites/") === 0) return "actualites";
    if (pathname.indexOf("/coopsco/") === 0) return "coopsco";
    if (pathname.indexOf("/fse/") === 0) return "fse";
    if (pathname.indexOf("/liens-avec-les-associations/") === 0) return "liens";
    if (pathname.indexOf("/nous-contacter/") === 0) return "contact";

    // Pages hors sections principales: fallback vers Accueil.
    return "accueil";
  }

  function topLinkSection(href) {
    if (href === "/") return "accueil";
    if (href === "/actualites/") return "actualites";
    if (href === "/coopsco/") return "coopsco";
    if (href === "/fse/") return "fse";
    if (href === "/liens-avec-les-associations/") return "liens";
    if (href === "/nous-contacter/") return "contact";
    return "";
  }

  function renderSecondaryMenu(container, sectionKey, pathname) {
    var config = sections[sectionKey];
    if (!config || config.items.length <= 1) {
      // Un sous-menu à une seule entrée ne fait que dupliquer le lien du menu principal.
      container.innerHTML = "";
      return;
    }

    var links = config.items
      .map(function (item) {
        var isCurrent = pathname === item.href ? " aria-current=\"page\"" : "";
        var klass = pathname === item.href ? ' class="is-current"' : "";
        return '<a' + klass + ' href="' + item.href + '"' + isCurrent + '>' + item.label + '</a>';
      })
      .join("");

    container.innerHTML = links;
  }

  function highlightPrimary(sectionKey) {
    var links = document.querySelectorAll(".subnav-primary a");
    links.forEach(function (link) {
      if (topLinkSection(link.getAttribute("href")) === sectionKey) {
        link.setAttribute("aria-current", "page");
        link.classList.add("is-current");
      }
    });
  }

  function init() {
    var secondary = document.getElementById("secondary-nav");
    if (!secondary) return;

    var path = normalizePath(window.location.pathname);
    var sectionKey = sectionFromPath(path);

    highlightPrimary(sectionKey);
    renderSecondaryMenu(secondary, sectionKey, path);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


