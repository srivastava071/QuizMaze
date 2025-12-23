//routing bet sections
function navigateTo(sectionId) {
  document.querySelectorAll(".page-section").forEach(sec => {
    sec.classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");

  //reset
  if (sectionId === "quizSection") {
    currentId = 1;
    score = 0;
    path = [1];
    renderQuestion(currentId);
  }
}

//tree like struct
const quizTree = {
  1: {
    question: "What's your coding level?",
    options: [
      { text: "Beginner", nextId: 2 },
      { text: "Advanced", nextId: 3 }
    ]
  },
  2: {
    question: "Pick your first concept:",
    options: [
      { text: "Variables", nextId: 4, isCorrect: true },
      { text: "Inheritance", nextId: 5, isCorrect: false }
    ]
  },
  3: {
    question: "Choose a DSA topic:",
    options: [
      { text: "Graphs", nextId: 6, isCorrect: true },
      { text: "Stacks", nextId: 7, isCorrect: false }
    ]
  },
  4: { question: "✅ Great start with basics!", options: [] },
  5: { question: "❌ Inheritance comes later!", options: [] },
  6: { question: "✅ Graphs are great for advanced logic!", options: [] },
  7: { question: "❌ Maybe revisit stacks later.", options: [] }
};

let currentId = 1;
let score = 0;
let path = [1];
let timer;
const timeLimit = 10;



function renderQuestion(id) {
  clearInterval(timer);
  const quizBox = document.getElementById("quizBox");
  const node = quizTree[id];
  quizBox.innerHTML = `<h2>${node.question}</h2>`;
  startTimer();

  if (node.options.length === 0) {
    quizBox.innerHTML += `<p>🏁 End of path!</p><p><strong>Score:</strong> ${score}</p>`;
    return;
  }

  node.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => {
      if (opt.isCorrect) {
        score++;
        playSound(true);
      } else {
        playSound(false);
      }
      path.push(opt.nextId); //goingdeeper
      renderQuestion(opt.nextId);//nextnode
    };
    quizBox.appendChild(btn);
  });
}

function startTimer() {
  let seconds = timeLimit;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `⏱ ${seconds}s`;

  timer = setInterval(() => {
    seconds--;
    timerDisplay.textContent = `⏱ ${seconds}s`;
    if (seconds <= 0) {
      clearInterval(timer);
      document.getElementById("quizBox").innerHTML = "<p>⏰ Time's up!</p><button onclick='navigateTo(\"homeSection\")'>Back to Home</button>";
    }
  }, 1000);
}




//scroll to top on section change
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => window.scrollTo(0, 0));
});


window.addEventListener("DOMContentLoaded", () => {
   const toggle = document.getElementById("darkModeToggle");
  const modeLabel = document.getElementById("modeLabel");
  const musicBtn = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const colorInput = document.getElementById("themeColor");
  const body = document.body;

    // 🔊 Audio Elements (moved here to ensure DOM is loaded)
  const correctSound = document.getElementById("correctSound");
  const wrongSound = document.getElementById("wrongSound");

  // ✅ Sound Playback Function
  window.playSound = function (correct) {
    const sound = correct ? correctSound : wrongSound;
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.warn("Sound failed:", err));
    }
  };

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    toggle.checked = true;
    modeLabel.textContent = "Dark Mode";
  } else {
    modeLabel.textContent = "Light Mode";
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
      modeLabel.textContent = "Dark Mode";
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
      modeLabel.textContent = "Light Mode";
    }
  });

  //music
  let musicPlaying = false;
  musicBtn.addEventListener("click", () => {
    if (musicPlaying) {
      bgMusic.pause();
      musicBtn.textContent = "🔇 Music Off";
    } else {
      bgMusic.play();
      musicBtn.textContent = "🔊 Music On";
    }
    musicPlaying = !musicPlaying;
  });

  //Theme Color Picker
  const savedColor = localStorage.getItem("themeColor");
  if (savedColor) {
    applyThemeColor(savedColor);
    colorInput.value = savedColor;
  }

  colorInput.addEventListener("input", (e) => {
    const selectedColor = e.target.value;
    applyThemeColor(selectedColor);
    localStorage.setItem("themeColor", selectedColor);
  });

  function applyThemeColor(color) {
  document.documentElement.style.setProperty('--primary-color', color);
}
  const resetBtn = document.getElementById("resetTheme");

resetBtn.addEventListener("click", () => {
  const defaultColor = "#007bff";
  applyThemeColor(defaultColor);
  colorInput.value = defaultColor;
  localStorage.removeItem("themeColor");
});
});
