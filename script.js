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

function applyHeaderMobileStyles(isDark) {
  // image mobile (change paths si besoin)
  const headerBg = isDark ? "#494949" : "#f2f2f2";

  // couleur .header-right mobile
  const headerRightBg = isDark ? "#494949" : "#f2f2f2";

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
  // theme par défaut = light
  body.classList.add("light-bg");
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    body.classList.add("dark", "dark-bg");
    body.classList.remove("light-bg");
  }
  // appliquer header mobile au chargement
  applyHeaderMobileStyles(body.classList.contains("dark"));
}

// appelle au chargement
applyThemeClassesFromStorage();

// mettre à jour la UI et fermer le menu
function toggleTheme(e) {
  if (e) e.preventDefault(); // car c'est un <a>
  body.classList.toggle("dark");
  body.classList.toggle("dark-bg");
  body.classList.toggle("light-bg");

  const isDark = body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // appliquer image + couleur en mobile
  applyHeaderMobileStyles(isDark);
}

// click toggle
toggleBtn?.addEventListener("click", toggleTheme);

// gérer redimensionnement (si on passe mobile <-> desktop)
window.addEventListener("resize", () => {
  // ré-appliquer header mobile/desktop selon la largeur
  applyHeaderMobileStyles(body.classList.contains("light"));
});
