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
    category: "action",
    thumbnail: "thumbnail: "https://raw.githubusercontent.com/cjhub-thumbs/short-ride.png"
  },
  {
    id: "retro-bowl",
    name: "Retro Bowl",
    emoji: "🏈",
    desc: "Retro-style football management and gameplay.",
    externalUrl: "https://example-retro-bowl-mirror.github.io",
    category: "sports",
    thumbnail: "https://i.imgur.com/1oQ0yqV.png"
  },
  {
    id: "1v1-lol",
    name: "1v1.lol",
    emoji: "⚔️",
    desc: "Build and fight in fast 1v1 matches.",
    externalUrl: "https://example-1v1lol-mirror.github.io",
    category: "action",
    thumbnail: "https://i.imgur.com/8xYkz8s.png"
  },
  {
    id: "slope",
    name: "Slope",
    emoji: "🟢",
    desc: "Fast 3D downhill ball game.",
    externalUrl: "https://ubg98.github.io/slope/",
    category: "runner",
    thumbnail: "https://i.imgur.com/8z6xF3P.png"
  },
  {
    id: "drift-boss",
    name: "Drift Boss",
    emoji: "🚗",
    desc: "Simple drifting game with addictive controls.",
    externalUrl: "https://ubg98.github.io/drift-boss/",
    category: "arcade",
    thumbnail: "https://i.imgur.com/3k0m1tV.png"
  },
  {
    id: "run-3",
    name: "Run 3",
    emoji: "🏃",
    desc: "Parkour through space tunnels.",
    externalUrl: "https://ubg98.github.io/run-3/",
    category: "runner",
    thumbnail: "https://i.imgur.com/2yq8p8U.png"
  }
];


// =========================
//  PROXIES / CLOAKERS
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
    id: "docs",
    name: "Google Docs",
    emoji: "📄",
    desc: "Disguises the tab as Google Docs.",
    title: "Google Docs",
    icon: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png"
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
  }
];


// =========================
//  STATE
// =========================

let favorites = [];
let recent = [];
let activeCategory = "all";

function loadState() {
  favorites = JSON.parse(localStorage.getItem("favoritesGames") || "[]");
  recent = JSON.parse(localStorage.getItem("recentGames") || "[]");
}

function saveFavorites() {
  localStorage.setItem("favoritesGames", JSON.stringify(favorites));
}

function saveRecent() {
  localStorage.setItem("recentGames", JSON.stringify(recent));
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
  const isFav = favorites.includes(item.id);

  card.innerHTML = `
    <img src="${item.thumbnail}" style="
      width:100%;
      height:140px;
      object-fit:cover;
      border-radius:8px;
      margin-bottom:10px;
    ">

    <div>
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="font-size:30px;">${item.emoji}</div>
        <div class="card-title" style="font-size:20px; font-weight:bold;">${item.name}</div>
      </div>
      <div class="card-body" style="margin-top:10px; opacity:0.8;">${item.desc}</div>
    </div>

    <div style="margin-top:15px; display:flex; justify-content:space-between; align-items:center;">
      <span style="opacity:0.7;">${isGame ? "Game" : "Cloaker"}</span>

      <div style="display:flex; gap:6px;">
        ${isGame ? `<button class="fav-toggle" style="padding:4px 8px; background:#333; border:none; border-radius:6px; cursor:pointer;">${isFav ? "★" : "☆"}</button>` : ""}
        <button class="card-button" style="padding:6px 12px; cursor:pointer;">Open</button>
      </div>
    </div>
  `;

  const openBtn = card.querySelector(".card-button");

  if (isGame) {
    openBtn.addEventListener("click", () => {
      addToRecent(item.id);
      window.location.href = `game.html?id=${item.id}`;
    });

    const favBtn = card.querySelector(".fav-toggle");
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(item.id);
      favBtn.textContent = favorites.includes(item.id) ? "★" : "☆";
      renderFavorites();
    });
  } else {
    openBtn.addEventListener("click", () => setCloak(item));
  }

  return card;
}


// =========================
//  FAVORITES / RECENT
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


// =========================
//  RENDERING
// =========================

function renderGames() {
  const grid = document.getElementById("games-grid");
  grid.innerHTML = "";

  games.forEach(g => {
    if (activeCategory !== "all" && g.category !== activeCategory) return;
    grid.appendChild(createCard(g, "game"));
  });

  applySearchFilter();
}

function renderFavorites() {
  const grid = document.getElementById("favorites-grid");
  grid.innerHTML = "";

  favorites
    .map(id => games.find(g => g.id === id))
    .filter(Boolean)
    .forEach(g => grid.appendChild(createCard(g, "game")));
}

function renderRecent() {
  const grid = document.getElementById("recent-grid");
  grid.innerHTML = "";

  recent
    .map(id => games.find(g => g.id === id))
    .filter(Boolean)
    .forEach(g => grid.appendChild(createCard(g, "game")));
}


// =========================
//  SEARCH
// =========================

function applySearchFilter() {
  const input = document.getElementById("game-search");
  const value = input.value.toLowerCase();

  document.querySelectorAll("#games-grid .card").forEach(card => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const desc = card.querySelector(".card-body").textContent.toLowerCase();
    const category = card.dataset.category;

    const matchesText = title.includes(value) || desc.includes(value);
    const matchesCategory = activeCategory === "all" || category === activeCategory;

    card.style.display = matchesText && matchesCategory ? "block" : "none";
  });
}


// =========================
//  CLOAKER
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

function setCloak(c) {
  localStorage.setItem("activeCloak", JSON.stringify(c));
  applyCloak();
}


// =========================
//  INIT
// =========================

function init() {
  loadState();

  renderGames();
  renderFavorites();
  renderRecent();

  const proxyGrid = document.getElementById("proxy-grid");
  proxies.forEach(p => proxyGrid.appendChild(createCard(p, "proxy")));

  applyCloak();

  document.getElementById("game-search").addEventListener("input", applySearchFilter);

  const catBtns = document.querySelectorAll(".cat-btn");
  catBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      catBtns.forEach(b => b.style.background = "#222");
      btn.style.background = "#333";
      activeCategory = btn.dataset.category;
      renderGames();
    });
  });

  document.getElementById("reset-cloak").addEventListener("click", () => {
    localStorage.removeItem("activeCloak");
    document.title = "67";
    const link = document.querySelector("link[rel='icon']");
    if (link) link.href = "";
  });

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
}

document.addEventListener("DOMContentLoaded", init);


// =========================
//  EXPORT CONFIG
// =========================

window.__UNBLOCKED_CONFIG__ = { games, proxies };
