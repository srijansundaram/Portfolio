/* ----------------------------------------
   SMOOTH SCROLL FOR NAV
---------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* -------------------------------------------------
   repoArea hidden AFTER DOM is ready
------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const repoArea = document.getElementById("repoArea");
  repoArea.classList.add("hidden");
});

/* ----------------------------------------
   LOAD REPOS (store in memory)
---------------------------------------- */
let allRepos = [];

fetch("https://api.github.com/users/srijansundaram/repos")
  .then((res) => res.json())
  .then((repos) => {
    allRepos = repos;
  });

/* ----------------------------------------
   CATEGORY MATCHER
---------------------------------------- */
function categoryMatch(repo, cat) {
  const text = `
    ${repo.name}
    ${repo.description || ""}
    ${repo.language || ""}
  `.toLowerCase();

  const keywords = {
    ai: ["ai", "ml", "predict", "solar", "assessment", "dataset"],
    web: ["html", "css", "js", "javascript", "jsp", "j2ee", "frontend"],
    system: ["compiler", "system", "os", "scheduler"],
    game: ["game", "snake", "arcade", "puzzle"],
  };

  if (cat === "all") return true;

  return keywords[cat].some((k) => text.includes(k));
}

/* ----------------------------------------
   FILTER LOGIC
---------------------------------------- */
document.querySelectorAll(".fbtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.filter.toLowerCase();
    const list = document.getElementById("repoList");

    list.innerHTML = ""; // clear previous

    const filtered = allRepos.filter((r) => categoryMatch(r, cat));

    filtered.forEach((r) => {
      const card = document.createElement("article");
      card.className = "project";
      card.innerHTML = `
        <h3>${r.name}</h3>
        <p>${r.description || "No description provided."}</p>
        <a class="small-link" target="_blank" href="${r.html_url}">View Repo</a>
      `;
      list.appendChild(card);
    });

    list.style.display = "flex"; // horizontal scroll fix
  });
});

/* ----------------------------------------
   VIEW MORE BUTTON
---------------------------------------- */
document.getElementById("viewMoreBtn").addEventListener("click", () => {
  const repoArea = document.getElementById("repoArea");
  repoArea.classList.remove("hidden");

  // Keep list empty until filter is clicked
  document.getElementById("repoList").innerHTML = "";
});

/* ----------------------------------------
   INTRO TYPING ANIMATION
---------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const introLines = [
    "Initializing Srijan Portfolio v1.0...",
    "Loading assets...",
    "Activating retro mode...",
    "System Ready.",
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function typeIntro() {
    if (lineIndex < introLines.length) {
      if (charIndex < introLines[lineIndex].length) {
        intro.textContent += introLines[lineIndex][charIndex];
        charIndex++;
        setTimeout(typeIntro, 35);
      } else {
        intro.textContent += "\n";
        lineIndex++;
        charIndex = 0;
        setTimeout(typeIntro, 200);
      }
    } else {
      intro.style.transition = "opacity 0.6s ease";
      intro.style.opacity = "0";
      setTimeout(() => intro.remove(), 600);
    }
  }

  typeIntro();
});

/* ----------------------------------------
   RETRO CLICK SOUND
---------------------------------------- */
const clickSound = new Audio(
  "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
);
document.body.addEventListener("click", () => clickSound.play(), {
  once: true,
});
