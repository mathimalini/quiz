const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "What is 543 - 30?",
    answers: [
      { text: "513", correct: true },
      { text: "522", correct: false },
      { text: "422", correct: false },
      { text: "528", correct: false },
    ],
  },
  {
    question: "In JavaScript, what is used to find an HTML element by its ID?",
    answers: [
      { text: " getElementById()", correct:true },
      { text: "querySelector()", correct: false},
      { text: "getElementByClassName()", correct: false },
      { text: "getElementByName()", correct: false },
    ],
  },
  {
    question: "What is the default display value for <div> elements?",
    answers: [
      { text: "inline", correct: false },
      { text: "block", correct: true },
      { text: "inline-block", correct: false },
      { text: "flex", correct: false },
    ],
  },
  {
    question: "Which of the following is used to add a comment in JavaScript?",
    answers: [
      { text: "<!-- This is a comment -->", correct: false },
      { text: "// This is a comment", correct: true },
      { text: "/* This is a comment */", correct: true },
      { text: "Both B and C", correct: false },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
   nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
   resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
   showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
   question.answers.forEach((answer, index) =>{ 
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
   });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

 restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}