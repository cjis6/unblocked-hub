// =========================
//  GAME CONFIG
// =========================

const games = [
  {
    id: "short-ride",
    name: "Short Ride",
    emoji: "🚴‍♂️",
    desc: "Ragdoll bike chaos with traps and physics.",
    externalUrl: "https://ubg98.github.io/short-ride/",
    category: "action"
  },
  {
    id: "retro-bowl",
    name: "Retro Bowl",
    emoji: "🏈",
    desc: "Retro-style football management and gameplay.",
    externalUrl: "https://example-retro-bowl-mirror.github.io",
    category: "sports"
  },
  {
    id: "1v1-lol",
    name: "1v1.lol",
    emoji: "⚔️",
    desc: "Build and fight in fast 1v1 matches.",
    externalUrl: "https://example-1v1lol-mirror.github.io",
    category: "action"
  },
  {
    id: "slope",
    name: "Slope",
    emoji: "🟢",
    desc: "Fast 3D downhill ball game.",
    externalUrl: "https://ubg98.github.io/slope/",
    category: "runner"
  },
  {
    id: "drift-boss",
    name: "Drift Boss",
    emoji: "🚗",
    desc: "Simple drifting game with addictive controls.",
    externalUrl: "https://ubg98.github.io/drift-boss/",
    category: "arcade"
  },
  {
    id: "run-3",
    name: "Run 3",
    emoji: "🏃",
    desc: "Parkour through space tunnels.",
    externalUrl: "https://ubg98.github.io/run-3/",
    category: "runner"
  }
];


// =========================
//  TAB CLOAKERS
// =========================

const proxies = [
  {
    id: "classroom",
    name: "Google Classroom",
    emoji: "📚",
    desc: "Makes the tab look like Google Classroom.",
    title: "Google Classroom",
    icon: "https://www.gstatic.com/classroom/favicon.ico"
  },
  {
    id: "learning",
    name: "Learning App",
    emoji: "📘",
    desc: "Makes the tab look like a learning dashboard.",
    title: "Learning Dashboard",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Blue_book_icon.svg"
  },
  {
    id: "docs",
    name: "Google Docs",
    emoji: "📄",
    desc: "Disguises the tab as Google Docs.",
    title: "Google Docs",
    icon: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png"
  },
  {
    id: "drive",
    name: "Google Drive",
    emoji: "📁",
    desc: "Disguises the tab as Google Drive.",
    title: "My Drive - Google Drive",
    icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"
  },
  {
    id: "slides",
    name: "Google Slides",
    emoji: "📊",
    desc: "Disguises the tab as Google Slides.",
    title: "Google Slides",
    icon: "https://ssl.gstatic.com/docs/presentations/images/favicon5.ico"
  },
  {
    id: "forms",
    name: "Google Forms",
    emoji: "📝",
    desc: "Disguises the tab as Google Forms.",
    title: "Google Forms",
    icon: "https://ssl.gstatic.com/docs/spreadsheets/forms/favicon_qp2.png"
  },
  {
    id: "gmail",
    name: "Gmail",
    emoji: "✉️",
    desc: "Disguises the tab as Gmail.",
    title: "Gmail",
    icon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
  },
  {
    id: "khan",
    name: "Khan Academy",
    emoji: "📗",
    desc: "Disguises the tab as Khan Academy.",
    title: "Khan Academy",
    icon: "https://cdn.kastatic.org/images/favicon.ico"
  },
  {
    id: "schoology",
    name: "Schoology",
    emoji: "🏫",
    desc: "Disguises the tab as Schoology.",
    title: "Schoology",
    icon: "https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico"
  },
  {
    id: "canvas",
    name: "Canvas",
    emoji: "🖍️",
    desc: "Disguises the tab as Canvas LMS.",
    title: "Dashboard — Canvas",
    icon: "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico"
  },
  {
    id: "wiki",
    name: "Wikipedia",
    emoji: "🌐",
    desc: "Disguises the tab as Wikipedia.",
    title: "Wikipedia",
    icon: "https://www.wikipedia.org/static/favicon/wikipedia.ico"
  },
  {
    id: "math",
    name: "Math Practice",
    emoji: "➗",
    desc: "Generic school math practice tab.",
    title: "Math Practice",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  }
];


// =========================
//  STATE & STORAGE HELPERS
// =========================

let favorites = [];
let recent = [];
let activeCategory = "all";

function loadArray(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveArray(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

function loadState() {
  favorites = loadArray("favoritesGames");
  recent = loadArray("recentGames");
}

function saveFavorites() {
  saveArray("favoritesGames", favorites);
}

function saveRecent() {
  saveArray("recentGames", recent);
}


// =========================
//  CARD GENERATOR
// =========================

function createCard(item, type) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.background = "#222";
  card.style.padding = "15px";
  card.style.borderRadius = "10px";
  card.dataset.category = item.category || "";

  const isGame = type === "game";
  const isFav = isGame && favorites.includes(item.id);

  card.innerHTML = `
    <div>
      <div class="card-header" style="display:flex; align-items:center; gap:10px;">
        <div class="card-emoji" style="font-size:30px;">${item.emoji}</div>
        <div class="card-title" style="font-size:20px; font-weight:bold;">${item.name}</div>
      </div>
      <div class="card-body" style="margin-top:10px; opacity:0.8;">${item.desc}</div>
    </div>
    <div class="card-footer" style="margin-top:15px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
      <span class="card-tag" style="opacity:0.7;">${isGame ? "Game" : "Cloaker"}</span>
      <div style="display:flex; gap:6px; align-items:center;">
        ${
          isGame
            ? `<button class="fav-toggle" style="padding:4px 8px; cursor:pointer; border:none; border-radius:6px; background:#333; color:#fff;">
                 ${isFav ? "★" : "☆"}
               </button>`
            : ""
        }
        <button class="card-button" style="padding:6px 12px; cursor:pointer;">Open</button>
      </div>
    </div>
  `;

  const openButton = card.querySelector(".card-button");

  if (isGame) {
    openButton.addEventListener("click", () => {
      addToRecent(item.id);
      window.location.href = `game.html?id=${encodeURIComponent(item.id)}`;
    });

    const favBtn = card.querySelector(".fav-toggle");
    if (favBtn) {
      favBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(item.id);
        favBtn.textContent = favorites.includes(item.id) ? "★" : "☆";
        renderFavorites();
      });
    }
  } else {
    openButton.addEventListener("click", () => {
      setCloak(item);
    });
  }

  return card;
}


// =========================
//  RENDER FUNCTIONS
// =========================

function renderGames() {
  const gamesGrid = document.getElementById("games-grid");
  if (!gamesGrid) return;
  gamesGrid.innerHTML = "";

  games.forEach(g => {
    if (activeCategory !== "all" && g.category !== activeCategory) return;
    gamesGrid.appendChild(createCard(g, "game"));
  });

  applySearchFilter();
}

function renderFavorites() {
  const favGrid = document.getElementById("favorites-grid");
  if (!favGrid) return;
  favGrid.innerHTML = "";

  const favGames = favorites
    .map(id => games.find(g => g.id === id))
    .filter(Boolean);

  favGames.forEach(g => {
    favGrid.appendChild(createCard(g, "game"));
  });
}

function renderRecent() {
  const recentGrid = document.getElementById("recent-grid");
  if (!recentGrid) return;
  recentGrid.innerHTML = "";

  const recentGames = recent
    .map(id => games.find(g => g.id === id))
    .filter(Boolean);

  recentGames.forEach(g => {
    recentGrid.appendChild(createCard(g, "game"));
  });
}


// =========================
//  FAVORITES & RECENT LOGIC
// =========================

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(x => x !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites();
}

function addToRecent(id) {
  recent = [id, ...recent.filter(x => x !== id)].slice(0, 5);
  saveRecent();
}

function applySearchFilter() {
  const searchInput = document.getElementById("game-search");
  if (!searchInput) return;

  const value = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll("#games-grid .card");

  cards.forEach(card => {
    const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
    const desc = card.querySelector(".card-body")?.textContent.toLowerCase() || "";
    const category = card.dataset.category || "";

    const matchesText = title.includes(value) || desc.includes(value);
    const matchesCategory =
      activeCategory === "all" || category === activeCategory;

    card.style.display = matchesText && matchesCategory ? "block" : "none";
  });
}


// =========================
//  PAGE INITIALIZER
// =========================

function init() {
  loadState();

  const proxyGrid = document.getElementById("proxy-grid");
  const resetBtn = document.getElementById("reset-cloak");

  // Render proxies
  proxies.forEach(p => proxyGrid.appendChild(createCard(p, "proxy")));

  // Render main sections
  renderGames();
  renderFavorites();
  renderRecent();

  // Apply cloak if active
  applyCloak();

  // Search bar
  const searchInput = document.getElementById("game-search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      applySearchFilter();
    });
  }

  // Category filters
  const catButtons = document.querySelectorAll("#category-filters .cat-btn");
  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      catButtons.forEach(b => (b.style.background = "#222"));
      btn.style.background = "#333";
      activeCategory = btn.dataset.category || "all";
      renderGames();
    });
  });

  // Reset cloaker button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      localStorage.removeItem("activeCloak");
      document.title = "Home";
      const link = document.querySelector("link[rel='icon']");
      if (link) link.href = "";
    });
  }

  // Panic key: Q = cloak (first proxy), ESC = reset
  window.addEventListener("keydown", (e) => {
    if (e.key === "q" || e.key === "Q") {
      if (proxies[0]) setCloak(proxies[0]);
    }
    if (e.key === "Escape") {
      localStorage.removeItem("activeCloak");
      document.title = "Home";
      const link = document.querySelector("link[rel='icon']");
      if (link) link.href = "";
    }
  });

  // Loading screen fade out
  window.addEventListener("load", () => {
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 300);
    }
  });
}

document.addEventListener("DOMContentLoaded", init);


// =========================
//  TAB CLOAKER SYSTEM
// =========================

function applyCloak() {
  const cloak = JSON.parse(localStorage.getItem("activeCloak"));
  if (!cloak) return;

  document.title = cloak.title;

  let link = document.querySelector("link[rel='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = cloak.icon;
}

function setCloak(cloaker) {
  localStorage.setItem("activeCloak", JSON.stringify(cloaker));
  applyCloak();
}


// =========================
//  EXPORT CONFIG
// =========================

window.__UNBLOCKED_CONFIG__ = { games, proxies };
