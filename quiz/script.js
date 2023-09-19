const quizQuestions = [
  {
    question: "The latest HTML standard is",
    options: ["HTML 4.0", "HTML 5.0", "XML", "SGML"],
    correctAnswer: "HTML 5.0"
  },
  {
    question: "HTML stands for?",
    options: ["HyperText Markup Language","HyperText Machine Language","HyperText Marking Language","HighText Marking Language"],
    correctAnswer: "HyperText Markup Language"
  },
  {
    question: "In which part of the HTML metadata is contained??",
    options: ["head tag", "title tag", "html tag", "body tag"],
    correctAnswer: "head tag"
  }
];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
function startQuiz() {
  document.getElementById("start-button").style.display = "none";
  displayQuestion();
  startTimer();
}
function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  questionText.innerHTML = "";
  answerButtons.innerHTML = "";
  questionText.innerHTML = currentQuestion.question;
  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);
    button.addEventListener("click", function() {
      checkAnswer(option);
    });
  });
}
function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}
function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}
function endQuiz() {
  clearInterval(timerInterval);
  const scorePercentage = (score / quizQuestions.length) * 100;
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} out of ${quizQuestions.length}</p>
    <p>Score Percentage: ${scorePercentage}%</p>
  `;
}
document.getElementById("start-button").addEventListener("click", startQuiz);