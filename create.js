const form = document.getElementById("quizForm");
const questionList = document.getElementById("questionList");

let quizBank = JSON.parse(localStorage.getItem("customQuiz")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const question = document.getElementById("question").value;
  const options = Array.from(document.getElementsByClassName("option")).map(input => input.value);
  const correct = parseInt(document.getElementById("correct").value) - 1;

  if (!question || options.some(opt => opt === "") || isNaN(correct) || correct < 0 || correct > 3) {
    alert("Please fill all fields correctly.");
    return;
  }

  const newQuestion = {
    q: question,
    options: options,
    correct: correct
  };

  quizBank.push(newQuestion);
  localStorage.setItem("customQuiz", JSON.stringify(quizBank));
  displayQuestions();
  form.reset();
});

// Display Questions with Delete Button
function displayQuestions() {
  questionList.innerHTML = "";

  quizBank.forEach((q, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${q.q} <br>
      <small>Correct: ${q.options[q.correct]}</small>
      <button class="delete-btn" onclick="deleteQuestion(${idx})">🗑 Delete</button>
    `;
    questionList.appendChild(li);
  });
}

// Delete a Question by Index
function deleteQuestion(index) {
  quizBank.splice(index, 1);
  localStorage.setItem("customQuiz", JSON.stringify(quizBank));
  displayQuestions();
}

// Show on load
displayQuestions();
