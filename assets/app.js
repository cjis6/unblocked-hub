// =========================
//  GAME + PROXY CONFIG
// =========================

const games = [
  {
    id: "short-ride",
    name: "Short Ride",
    emoji: "🚴‍♂️",
    desc: "Ragdoll bike chaos with traps and physics.",
    localPath: null,
    externalUrl: "https://ubg98.github.io/short-ride/"
  },
  {
    id: "retro-bowl",
    name: "Retro Bowl",
    emoji: "🏈",
    desc: "Retro-style football management and gameplay.",
    externalUrl: "https://example-retro-bowl-mirror.github.io"
  },
  {
    id: "1v1-lol",
    name: "1v1.lol",
    emoji: "⚔️",
    desc: "Build and fight in fast 1v1 matches.",
    externalUrl: "https://example-1v1lol-mirror.github.io"
  }
];

// =========================
//  TAB CLOAKERS (replaces browsing proxies)
// =========================

const proxies = [
  {
    id: "classroom",
    name: "Google Classroom",
    emoji: "📚",
    desc: "Makes the tab look like Google Classroom.",
    title: "Google Classroom",
    icon: "https://ssl.gstatic.com/classroom/favicon.ico"
  },
  {
    id: "learning",
    name: "Learning App",
    emoji: "📘",
    desc: "Makes the tab look like a learning dashboard.",
    title: "Learning Dashboard",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Blue_book_icon.svg"
  }
];


// =========================
//  CARD GENERATOR
// =========================

function createCard(item, type) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div>
      <div class="card-header">
        <div class="card-emoji">${item.emoji}</div>
        <div class="card-title">${item.name}</div>
      </div>
      <div class="card-body">${item.desc}</div>
    </div>
    <div class="card-footer">
      <span class="card-tag">${type === "game" ? "Game" : "Cloaker"}</span>
      <button class="card-button">Open</button>
    </div>
  `;

  const button = card.querySelector(".card-button");
  button.addEventListener("click", () => {
    if (type === "game") {
      window.location.href = `game.html?id=${encodeURIComponent(item.id)}`;
    } else {
      window.location.href = `proxy.html?id=${encodeURIComponent(item.id)}`;
    }
  });

  return card;
}


// =========================
//  PAGE INITIALIZER
// =========================

function init() {
  const gamesGrid = document.getElementById("games-grid");
  const proxyGrid = document.getElementById("proxy-grid");

  games.forEach(g => gamesGrid.appendChild(createCard(g, "game")));
  proxies.forEach(p => proxyGrid.appendChild(createCard(p, "proxy")));
}

document.addEventListener("DOMContentLoaded", init);


// =========================
//  EXPORT CONFIG
// =========================

window.__UNBLOCKED_CONFIG__ = { games, proxies };
