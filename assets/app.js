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
//  CARD GENERATOR
// =========================

function createCard(item, type) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.background = "#222";
  card.style.padding = "15px";
  card.style.borderRadius = "10px";

  card.innerHTML = `
    <div>
      <div class="card-header" style="display:flex; align-items:center; gap:10px;">
        <div class="card-emoji" style="font-size:30px;">${item.emoji}</div>
        <div class="card-title" style="font-size:20px; font-weight:bold;">${item.name}</div>
      </div>
      <div class="card-body" style="margin-top:10px; opacity:0.8;">${item.desc}</div>
    </div>
    <div class="card-footer" style="margin-top:15px; display:flex; justify-content:space-between; align-items:center;">
      <span class="card-tag" style="opacity:0.7;">${type === "game" ? "Game" : "Cloaker"}</span>
      <button class="card-button" style="padding:6px 12px; cursor:pointer;">Open</button>
    </div>
  `;

  const button = card.querySelector(".card-button");

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

  // SEARCH BAR LOGIC
  const searchInput = document.getElementById("game-search");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();

      const cards = document.querySelectorAll("#games-grid .card");

      cards.forEach(card => {
        const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
        const desc = card.querySelector(".card-body")?.textContent.toLowerCase() || "";

        if (title.includes(value) || desc.includes(value)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
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
