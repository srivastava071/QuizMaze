const chatBox = document.getElementById("chatBox");

function handleUserInput(){
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if(!message) return;

    appendMessage("You",message);
    respondToUser(message);
    input.value = "";
}

function appendMessage(sender,text){
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</stromg> ${text}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop=chatBox.scrollHeight;
}

function respondToUser(input) {
  input = input.toLowerCase();

  if (input.includes("create mcq") || input.includes("generate mcq")) {
    // Clean up message and extract topic
    const topic = input.replace(/create|generate|mcq|on|for/gi, "").trim();
    const mcqs = generateMCQ(topic);
    if (mcqs.length > 0) {
      mcqs.forEach(mcq => {
        appendMessage("Bot", `📘 ${mcq.question}<br>Options: ${mcq.options.join(", ")}<br>Answer: ${mcq.answer}`);
      });
    } else {
      appendMessage("Bot", `❌ Sorry, I couldn't generate MCQs for the topic "${topic}".`);
    }
  } else if (input.includes("how to create a quiz")) {
    appendMessage("Bot", "📌 You can create a quiz by visiting the Create Quiz page from the top menu.");
  } else {
    appendMessage("Bot", "🤔 I'm still learning. Try asking me to generate MCQs or guide you!");
  }
}


function generateMCQ(topic) {
  const lower = topic.toLowerCase();
  if (lower.includes("binary tree")) {
    return [
      {
        question: "Which traversal method uses recursion in Binary Trees?",
        options: ["Inorder", "Preorder", "Postorder", "All of the above"],
        answer: "All of the above"
      },
      {
        question: "What is the max number of children a node can have in a binary tree?",
        options: ["1", "2", "3", "4"],
        answer: "2"
      }
    ];
  } else if (lower.includes("html")) {
    return [
      {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None"],
        answer: "HyperText Markup Language"
      }
    ];
  }

  return [];

}