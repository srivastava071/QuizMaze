// auth.js

// Handle Registration
const regForm = document.getElementById("registerForm");
if (regForm) {
  regForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    if (!username || !email || !password) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some(user => user.email === email || user.username === username);
    
    const msg = document.getElementById("registerMessage");
    if (exists) {
      msg.textContent = "❌ User already exists!";
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    msg.style.color = "green";
    msg.textContent = "✅ Registered successfully! Redirecting...";
    setTimeout(() => window.location.href = "login.html", 2000);
  });
}

// Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const msg = document.getElementById("loginMessage");
    const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

    if (!user) {
      msg.textContent = "❌ Invalid credentials!";
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    msg.style.color = "green";
    msg.textContent = "✅ Login successful! Redirecting...";
    setTimeout(() => window.location.href = "play.html", 2000);
  });
}
