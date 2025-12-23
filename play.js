const quizBox = document.getElementById("quizBox");
const catName = document.getElementById("catName");
const diffName = document.getElementById("diffName");
const timerDisplay = document.getElementById("timer");

let questions = [];
let index = 0;
let score = 0;
let timer;
const timeLimit = 10;

let quizData = {
  dsa: {
    easy: [
      { q: "What does DSA stand for?", options: ["Data Structures and Algorithms", "Data Source Array", "Data Software Access", "None"], correct: 0 },
      { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correct: 1 }
    ],
    medium: [
      { q: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Tree", "Graph"], correct: 1 },
      { q: "Which sorting algorithm is best on average?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], correct: 2 }
    ],
    hard: [
      { q: "Which algorithm is used for finding shortest path in graphs?", options: ["DFS", "BFS", "Dijkstra", "Kruskal"], correct: 2 },
      { q: "What is the worst-case time for QuickSort?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"], correct: 2 }
    ]
  },

  web: {
    easy: [
      { q: "What does HTML stand for?", options: ["HyperText Markup Language", "Hot Mail", "How To Make Language", "None"], correct: 0 },
      { q: "Which tag is used for headings in HTML?", options: ["<heading>", "<h1>", "<head>", "<title>"], correct: 1 }
    ],
    medium: [
      { q: "Which CSS property changes text color?", options: ["background", "font-size", "color", "text-align"], correct: 2 },
      { q: "What does DOM stand for?", options: ["Document Object Model", "Data Object Map", "Digital Order Method", "None"], correct: 0 }
    ],
    hard: [
      { q: "Which HTTP method is idempotent?", options: ["POST", "GET", "PUT", "PATCH"], correct: 2 },
      { q: "What is the purpose of media queries in CSS?", options: ["Animations", "Styling forms", "Responsive design", "Font changes"], correct: 2 }
    ]
  }
};
function startSelectedQuiz() {
  const selected = document.getElementById("quizType").value;
  const difficulty=document.getElementById("quizDifficulty").value;
  index = 0;
  score = 0;
  clearInterval(timer);

  if (selected === "custom") {
    const stored = localStorage.getItem("customQuiz");
    if (stored) {
      questions = JSON.parse(stored);
    
    if (questions.length === 0) {
        quizBox.innerHTML = `<p>No custom questions found.</p>`;
        return;
      }
      catName.textContent = "CUSTOM";
      diffName.textContent = "N/A";
      renderQuestion();
    }
     else {
      quizBox.innerHTML = `<p>No custom quiz found! Please create one in <a href="create.html">Create Quiz</a>.</p>`;
      catName.textContent = "CUSTOM";
      return;
    }
  } 
  else {
    const data=quizData[selected];
    if(!data || !data[difficulty]){
      quizBox.innerHTML= `<p>No questions available for this category and difficulty.</p>`;
      return;
    }
    questions = quizData[selected][difficulty];
  }

  catName.textContent = selected.toUpperCase();
   document.getElementById("diffName").textContent = difficulty.toUpperCase();
  renderQuestion();
}


function renderQuestion() {
  clearInterval(timer);


   if (index >= questions.length) {
    updateLeaderboard(score); // ✅ Add this
    return;
  }

  const qObj = questions[index];
  quizBox.innerHTML = `<h2>${qObj.q}</h2>`;
  qObj.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      if (i === qObj.correct) score++;
      index++;
      renderQuestion();
    };
    quizBox.appendChild(btn);
  });

  let timeLeft = timeLimit;
  timerDisplay.textContent = `⏱ ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏱ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      index++;
      renderQuestion();
    }
  }, 1000);
}

//leaderboard
document.getElementById("showLeaderboardBtn").onclick = () => {
  document.getElementById("leaderboardModal").style.display = "block";
  showLeaderboard();
};

document.getElementById("closeLeaderboard").onclick = () => {
  document.getElementById("leaderboardModal").style.display = "none";
};

//LeaderboardlogiC
function updateLeaderboard(latestScore) {
  document.getElementById("nameModal").style.display = "block";

  document.getElementById("submitName").onclick = () => {
    const nameInput = document.getElementById("playerName");
    const name = nameInput.value.trim();

    if (name === "") {
      nameInput.style.border = "2px solid red";
      return;
    }

    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name, score: latestScore });
    leaderboard.sort((a, b) => b.score - a.score);
    if (leaderboard.length > 10) leaderboard.length = 10;
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    nameInput.value = "";
    document.getElementById("nameModal").style.display = "none";
    document.getElementById("leaderboardModal").style.display = "block";
    showLeaderboard();
  };
}

function showLeaderboard() {
  const list = document.getElementById("leaderboardList");
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  list.innerHTML = "";
  leaderboard.forEach((entry, i) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} — ${entry.score}`;
    list.appendChild(li);
  });
}

// 🔁 Reset Leaderboard Functionality
document.getElementById("resetLeaderboardBtn").onclick = () => {
  const confirmReset = confirm("Are you sure you want to reset the leaderboard?");
  if (confirmReset) {
    localStorage.removeItem("leaderboard");
    showLeaderboard(); // Update the display
  }
};


// Close modals on outside click
window.addEventListener("click", function (e) {
  const leaderboardModal = document.getElementById("leaderboardModal");
  const nameModal = document.getElementById("nameModal");
  if (e.target === leaderboardModal) leaderboardModal.style.display = "none";
  if (e.target === nameModal) nameModal.style.display = "none";
});

window.addEventListener("DOMContentLoaded", showLeaderboard)


// 🚫 Block access if not logged in
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  alert("⚠️ Please login first!");
  window.location.href = "login.html";
}

// ✅ Show username and logout button
document.getElementById("userInfo").textContent = `👤 ${currentUser.username}`;
document.getElementById("logoutBtn").style.display = "inline-block";

// 🔓 Handle Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});
window.addEventListener("DOMContentLoaded", () => {
  // Auto-load previous selection if available
  const lastCategory = localStorage.getItem("lastCategory");
  const lastDifficulty = localStorage.getItem("lastDifficulty");

  if (lastCategory && lastDifficulty) {
    document.getElementById("quizType").value = lastCategory;
    document.getElementById("quizDifficulty").value = lastDifficulty;
    startSelectedQuiz();
  }
});
