const terms = [
  {
    subject: "Budget",
    meaning: "A spending plan showing sources and uses of income",
  },
  { subject: "Asset", meaning: "What you own" },
  { subject: "Liability", meaning: "What you owe" },
  {
    subject: "Net Worth",
    meaning: "(Value of what you own) - (Value of what you owe)",
  },
  {
    subject: "Liquidity",
    meaning: "Access to funds to cover any short-term cash deficiencies",
  },
  {
    subject: "Credit",
    meaning:
      "The use of someone else's money, borrowed now with the agreement to pay it back later",
  },
  {
    subject: "Debtor",
    meaning:
      "A person who owes money to another person or financial institution",
  },
  {
    subject: "Creditor",
    meaning: "A person or business that lends money to others",
  },
  {
    subject: "Lump Sum",
    meaning: "single payment at one time rather than many small payments",
  },
  {
    subject: "Collateral",
    meaning: "Property pledged to assure repayment of a loan",
  },
  {
    subject: "Interest",
    meaning: "The percentage of money on top of the original amount",
  },
  {
    subject: "Bond",
    meaning:
      "Certificates issued by borrowers, usually firms and government agencies, to raise funds",
  },
  {
    subject: "Stock",
    meaning: "Certificates representing partial ownership in a firm",
  },
  {
    subject: "Insurance",
    meaning:
      "A financial product purchased by a group of people facing a similar risk to protect against the risk",
  },
  {
    subject: "Premium",
    meaning: "The money paid to an insurance company to purchase a policy",
  },
  {
    subject: "Deductible",
    meaning:
      "The out‐of‐pocket money paid by the policyholder before an insurance company will cover the remaining costs attributed to the loss",
  },
];

let index = 0;
let score = 0;

const gameStates = {
  menu: document.getElementById("menu-state"),
  flashcard: document.getElementById("flashcard-state"),
  quiz: document.getElementById("quiz-state"),
  finalScore: document.getElementById("final-score-state"),
};

const flashcard = {
  inner: document.querySelector(".flashcard-inner"),
  front: document.querySelector(".flashcard-front"),
  back: document.querySelector(".flashcard-back"),
};

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("flip-button").addEventListener("click", flipCard);
document
  .getElementById("next-button")
  .addEventListener("click", () => changeCard(1));
document
  .getElementById("prev-button")
  .addEventListener("click", () => changeCard(-1));
document.getElementById("quiz-button").addEventListener("click", startQuiz);
document.getElementById("submit-button").addEventListener("click", checkAnswer);
document
  .getElementById("restart-button")
  .addEventListener("click", restartGame);

function startGame() {
  switchState("flashcard");
  displayFlashcard();
}

function switchState(stateName) {
  Object.values(gameStates).forEach((state) => state.classList.add("hidden"));
  gameStates[stateName].classList.remove("hidden");
}

function displayFlashcard() {
  const currentTerm = terms[index];
  flashcard.front.textContent = currentTerm.subject;
  flashcard.back.textContent = currentTerm.meaning;
  flashcard.inner.style.transform = "rotateY(0deg)";
}

function flipCard() {
  flashcard.inner.style.transform =
    flashcard.inner.style.transform === "rotateY(180deg)"
      ? "rotateY(0deg)"
      : "rotateY(180deg)";
}

function changeCard(direction) {
  index += direction;
  if (index < 0) index = terms.length - 1;
  if (index >= terms.length) index = 0;
  displayFlashcard();
}

function startQuiz() {
  switchState("quiz");
  index = 0;
  score = 0;
  displayQuiz();
}

function displayQuiz() {
  document.getElementById("question").textContent = terms[index].meaning;
  document.getElementById("answer-input").value = "";
  document.getElementById("feedback").textContent = "";
}

function normalizeAnswer(answer) {
  const plurals = {
    assets: "asset",
    liabilities: "liability",
    bonds: "bond",
    stocks: "stock",
    debts: "debt",
    creditors: "creditor",
    debtors: "debtor",
    deductibles: "deductible",
  };

  answer = answer.trim().toLowerCase();

  if (plurals[answer]) {
    return plurals[answer];
  }

  return answer;
}

function checkAnswer() {
  const userAnswer = normalizeAnswer(
    document.getElementById("answer-input").value.trim().toLowerCase()
  );
  const correctAnswer = normalizeAnswer(terms[index].subject);
  const feedback = document.getElementById("feedback");

  if (userAnswer === correctAnswer) {
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `Incorrect. The correct answer is: ${terms[index].subject}`;
    feedback.style.color = "red";
  }

  document.getElementById("score").textContent = `Score: ${score}`;

  index++;
  if (index < terms.length) {
    setTimeout(displayQuiz, 1000);
  } else {
    setTimeout(showFinalScore, 2000);
  }
}

function showFinalScore() {
  switchState("finalScore");
  document.getElementById(
    "final-score"
  ).textContent = `Your final score is: ${score} out of ${terms.length}`;
}

function restartGame() {
  switchState("menu");
}
