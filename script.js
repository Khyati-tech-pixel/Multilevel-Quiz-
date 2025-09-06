const quizData = {
  level1: [
    { question: "What is the capital of France?", options: { A: "Berlin", B: "Madrid", C: "Paris", D: "Lisbon" }, correct: "C" },
    { question: "Which language runs in a web browser?", options: { A: "Java", B: "C", C: "Python", D: "JavaScript" }, correct: "D" },
    { question: "What does CSS stand for?", options: { A: "Central Style Sheets", B: "Cascading Style Sheets", C: "Cascading Simple Sheets", D: "Cars SUVs Sailboats" }, correct: "B" },
    
  ],
  level2: [
    { question: "Which company developed JavaScript?", options: { A: "Netscape", B: "Microsoft", C: "Google", D: "Sun Microsystems" }, correct: "A" },
    { question: "What does JSON stand for?", options: { A: "JavaScript Object Notation", B: "JavaScript Online Network", C: "Java and Node", D: "Java Syntax Object Notation" }, correct: "A" },
    { question: "What is the default port for HTTP?", options: { A: "80", B: "443", C: "21", D: "22" }, correct: "A" },
  ],
  level3: [
    { question: "Who is known as the father of computers?", options: { A: "Alan Turing", B: "Charles Babbage", C: "John von Neumann", D: "Tim Berners-Lee" }, correct: "B" },
    { question: "What is the time complexity of binary search?", options: { A: "O(n)", B: "O(log n)", C: "O(n^2)", D: "O(1)" }, correct: "B" },
    { question: "Which protocol is used to send emails?", options: { A: "FTP", B: "SMTP", C: "HTTP", D: "POP3" }, correct: "B" },
  ],
  level4: [
    { question: "What does the term 'big O' notation describe?", options: { A: "Code readability", B: "Algorithm efficiency", C: "Memory usage", D: "Syntax" }, correct: "B" },
    { question: "Which algorithm is used in pathfinding for AI?", options: { A: "Dijkstra's Algorithm", B: "Quicksort", C: "Merge Sort", D: "Depth-First Search" }, correct: "A" },
    { question: "What does the acronym HTTP stand for?", options: { A: "Hyper Text Transmission Protocol", B: "Hyper Text Transfer Protocol", C: "High Transfer Text Protocol", D: "Hyper Transfer Text Protocol" }, correct: "B" },
  ],
  level5: [
    { question: "Which language is used for artificial intelligence?", options: { A: "Python", B: "JavaScript", C: "HTML", D: "CSS" }, correct: "A" },
    { question: "Which data structure uses FIFO?", options: { A: "Stack", B: "Queue", C: "Linked List", D: "Binary Tree" }, correct: "B" },
    { question: "What is the best-case time complexity of quicksort?", options: { A: "O(n^2)", B: "O(log n)", C: "O(n log n)", D: "O(n)" }, correct: "C" },
  ],
};

let currentQuestion = 0;
let score = 0;
let level = "level1";

const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  const currentQuiz = quizData[level][currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.forEach((option) => {
    const key = option.dataset.option;
    option.textContent = `${key}: ${currentQuiz.options[key]}`;
    option.className = "option";
    option.onclick = () => selectOption(option, currentQuiz.correct);
  });
}

function selectOption(selectedOption, correctAnswer) {
  optionsEl.forEach((option) => {
    option.onclick = null;
    if (option.dataset.option === correctAnswer) {
      option.classList.add("correct");
    } else {
      option.classList.add("incorrect");
    }
  });
  if (selectedOption.dataset.option === correctAnswer) score++;
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData[level].length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    const levels = Object.keys(quizData);
    const currentLevelIndex = levels.indexOf(level);

    if (currentLevelIndex < levels.length - 1) {
      level = levels[currentLevelIndex + 1];
      currentQuestion = 0;
      alert(`Welcome to Level ${currentLevelIndex + 2}!`);
      loadQuestion();
    } else {
      showCongratulations();
    }
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  level = "level1";
  resultEl.classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  loadQuestion();
});

function showCongratulations() {
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `
    <h2>Congratulations!</h2>
    <p>You completed all levels!</p>
    <p>Your final score is ${score} out of ${
    Object.values(quizData).flat().length
  }.</p>
    <button id="restart-btn" onclick="restartQuiz()">Restart Quiz</button>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  level = "level1";
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  loadQuestion();
}

loadQuestion();
