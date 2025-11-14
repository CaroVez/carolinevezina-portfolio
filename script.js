// ########### SELECTEURS ########### //
const navMenu = document.querySelector(".header-right");
const menuLinks = document.querySelectorAll(".menu-link");
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const header = document.querySelector(".header");

// Safety checks
if (!toggleBtn || !header) {
  console.warn("theme-toggle ou header introuvable");
}

// ########### THEME LOGIC ########### //
const MOBILE_BREAK = 1079;

function applyHeaderMobileStyles(isLight) {
  // image mobile (change paths si besoin)
  const headerBg = isLight ? "#f2f2f2" : "#494949";

  // couleur .header-right mobile
  const headerRightBg = isLight ? "#f2f2f2" : "#494949";

  // n'affecte que si on est en mobile
  if (window.innerWidth <= MOBILE_BREAK) {
    header.style.backgroundColor = headerBg;
    navMenu.style.backgroundColor = headerRightBg;
  } else {
    // en desktop, restaure style inline (ne pas écraser les règles CSS desktop)
    header.style.backgroundColor = "";
    navMenu.style.backgroundColor = "";
  }
}

function applyThemeClassesFromStorage() {
  // theme par défaut = dark
  body.classList.add("dark-bg");
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    body.classList.add("light", "light-bg");
    body.classList.remove("dark-bg");
  }
  // appliquer header mobile au chargement
  applyHeaderMobileStyles(body.classList.contains("light"));
}

// appelle au chargement
applyThemeClassesFromStorage();

// mettre à jour la UI et fermer le menu
function toggleTheme(e) {
  if (e) e.preventDefault(); // car c'est un <a>
  body.classList.toggle("light");
  body.classList.toggle("light-bg");
  body.classList.toggle("dark-bg");

  const isLight = body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");

  // appliquer image + couleur en mobile
  applyHeaderMobileStyles(isLight);
}

// click toggle
toggleBtn?.addEventListener("click", toggleTheme);

// gérer redimensionnement (si on passe mobile <-> desktop)
window.addEventListener("resize", () => {
  // ré-appliquer header mobile/desktop selon la largeur
  applyHeaderMobileStyles(body.classList.contains("light"));
});
