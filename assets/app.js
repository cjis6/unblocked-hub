// =========================
//  GAME CONFIG
// =========================

const games = [
  {
    id: "short-ride",
    name: "Short Ride",
    emoji: "🚴‍♂️",
    desc: "Ragdoll bike chaos with traps and physics.",
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
  }
];


// =========================
//  CARD GENERATOR
// =========================

function createCard(item, type) {
  const card = document.createElement("div");
  card.style.background = "#222";
  card.style.padding = "15px";
  card.style.borderRadius = "10px";

  card.innerHTML = `
    <div>
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="font-size:30px;">${item.emoji}</div>
        <div style="font-size:20px; font-weight:bold;">${item.name}</div>
      </div>
      <div style="margin-top:10px; opacity:0.8;">${item.desc}</div>
    </div>
    <div style="margin-top:15px; display:flex; justify-content:space-between; align-items:center;">
      <span style="opacity:0.7;">${type === "game" ? "Game" : "Cloaker"}</span>
      <button style="padding:6px 12px; cursor:pointer;">Open</button>
    </div>
  `;

  const button = card.querySelector("button");

  if (type === "game") {
    button.addEventListener("click", () => {
      window.location.href = `game.html?id=${encodeURIComponent(item.id)}`;
    });
  } else {
    button.addEventListener("click", () => {
      setCloak(item);
    });
  }

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

  applyCloak();
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
