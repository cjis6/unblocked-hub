// assets/app.js

const games = [
  {
    id: "short-ride",
    name: "Short Ride",
    emoji: "🚴‍♂️",
    desc: "Ragdoll bike chaos with traps and physics.",
    // If you host the game yourself:
    localPath: "games/short-ride/index.html",
    // Or if you only have an external mirror:
    externalUrl: "https://shortrideonline.github.io"
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

const proxies = [
  {
    id: "proxy-1",
    name: "Stealth Proxy",
    emoji: "🛰",
    desc: "Loads a web proxy UI in fullscreen.",
    url: "https://example-proxy-1.github.io"
  },
  {
    id: "proxy-2",
    name: "Tab Cloak Tool",
    emoji: "🕶",
    desc: "Simple web tool interface in an iframe.",
    url: "https://example-proxy-2.github.io"
  }
];

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
      <span class="card-tag">${type === "game" ? "Game" : "Proxy"}</span>
      <button class="card-button">Open</button>
    </div>
  `;

  const button = card.querySelector(".card-button");
  button.addEventListener("click", () => {
    if (type === "game") {
      // Send to game loader with id
      window.location.href = `game.html?id=${encodeURIComponent(item.id)}`;
    } else {
      // Send to proxy loader with id
      window.location.href = `proxy.html?id=${encodeURIComponent(item.id)}`;
    }
  });

  return card;
}

function init() {
  const gamesGrid = document.getElementById("games-grid");
  const proxyGrid = document.getElementById("proxy-grid");

  games.forEach(g => gamesGrid.appendChild(createCard(g, "game")));
  proxies.forEach(p => proxyGrid.appendChild(createCard(p, "proxy")));
}

document.addEventListener("DOMContentLoaded", init);

// Expose configs for other pages
window.__UNBLOCKED_CONFIG__ = { games, proxies };

