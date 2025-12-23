// 🌗 Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const modeLabel = document.getElementById("modeLabel");
const themeColorInput = document.getElementById("themeColor");
const resetThemeButton = document.getElementById("resetTheme");

function applyThemeColor(color) {
  document.documentElement.style.setProperty("--primary-color", color);
  document.querySelector("header").style.background = `linear-gradient(to right, ${color}, #00c9ff)`;
  document.querySelector("footer").style.background = `linear-gradient(to right, ${color}, #00c9ff)`;
}

// Set initial theme color from localStorage
const savedColor = localStorage.getItem("themeColor");
if (savedColor) {
  themeColorInput.value = savedColor;
  applyThemeColor(savedColor);
}

// Color Picker Handler (works in both modes)
themeColorInput.addEventListener("input", (e) => {
  const newColor = e.target.value;
  localStorage.setItem("themeColor", newColor);
  applyThemeColor(newColor);
});

// Reset Button
resetThemeButton.addEventListener("click", () => {
  localStorage.removeItem("themeColor");
  themeColorInput.value = "#007bff";
  applyThemeColor("#007bff");
});

// Dark Mode Toggle Handler
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  modeLabel.textContent = document.body.classList.contains("dark") ? "Dark Mode" : "Light Mode";

  // Reapply current theme color after mode switch
  const currentColor = localStorage.getItem("themeColor") || "#007bff";
  applyThemeColor(currentColor);
});
