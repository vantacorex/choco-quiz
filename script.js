
const questions = [
    {
        difficulty: "Easy",
        question: "What plant do Choco beans come from?",
        options: ["Coffee plant", "Cacao tree", "Tea plant", "Vanilla orchid"],
        answer: "Cacao tree",
        explanation: "Choco is made using cacao beans, which grow inside pods on cacao trees."
    },
    {
        difficulty: "Easy",
        question: "Ancient people drank Choco long before modern Choco bars existed.",
        options: ["True", "False"],
        answer: "True",
        explanation: "Cacao was prepared as a drink thousands of years ago, long before modern solid bars."
    },
    {
        difficulty: "Easy",
        question: "Which type of Choco generally has the highest cocoa solids content?",
        options: ["White Choco", "Milk Choco", "Dark Choco", "Strawberry Choco"],
        answer: "Dark Choco",
        explanation: "Dark Choco generally contains more cocoa solids than milk Choco."
    },
    {
        difficulty: "Medium",
        question: "Which ancient civilization used cacao beans as currency?",
        options: ["Ancient Romans", "Ancient Egyptians", "Ancient Greeks", "Maya"],
        answer: "Maya",
        explanation: "Cacao beans had economic and cultural importance among the Maya and other Mesoamerican peoples."
    },
    {
        difficulty: "Medium",
        question: "Cacao beans naturally taste as sweet as a typical milk Choco bar.",
        options: ["True", "False"],
        answer: "False",
        explanation: "Cacao beans are naturally bitter. Many Choco products get their sweetness from added sugar."
    },
    {
        difficulty: "Medium",
        question: "Which people are famous for consuming cacao drinks in pre-Columbian Central Mexico?",
        options: ["Vikings", "Aztecs", "Ancient Spartans", "Sumerians"],
        answer: "Aztecs",
        explanation: "The Aztecs valued cacao drinks and cacao beans, which also played a role in trade."
    },
    {
        difficulty: "Medium",
        question: "Which year is associated with an early modern solid Choco bar made by J. S. Fry & Sons?",
        options: ["1492", "1750", "1847", "1920"],
        answer: "1847",
        explanation: "J. S. Fry & Sons developed a moldable Choco mixture in 1847."
    },
    {
        difficulty: "Medium",
        question: "Which step helps develop the flavour of cacao beans?",
        options: ["Roasting the beans", "Growing them underwater", "Freezing them", "Mixing them with tea leaves"],
        answer: "Roasting the beans",
        explanation: "Roasting helps develop the flavour of cacao beans used to make Choco."
    },
    {
        difficulty: "Hard",
        question: "Solid Choco bars became popular in Europe before cacao drinks.",
        options: ["True", "False"],
        answer: "False",
        explanation: "Cacao first became popular in Europe mainly as a drink. Solid products developed later."
    },
    {
        difficulty: "Hard",
        question: "What does Theobroma, the genus name of the cacao tree, mean?",
        options: ["Bitter seed", "Golden fruit", "Tropical tree", "Food of the gods"],
        answer: "Food of the gods",
        explanation: "Theobroma comes from Greek words meaning 'food of the gods'."
    }
];

// Get elements from the HTML
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const questionProgress = document.getElementById("question-progress");
const scoreDisplay = document.getElementById("score-display");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");

// Game variables
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Start the quiz
startButton.addEventListener("click", function () {
    welcomeScreen.hidden = true;
    resultScreen.hidden = true;
    quizScreen.hidden = false;

    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
});

// Display a question
function showQuestion() {
    answered = false;

    const currentQuestion = questions[currentQuestionIndex];

    questionProgress.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length} · ${currentQuestion.difficulty}`;

    scoreDisplay.textContent = `Score: ${score}`;
    questionText.textContent = currentQuestion.question;

    answerButtons.innerHTML = "";
    feedback.textContent = "";
    nextButton.hidden = true;

    currentQuestion.options.forEach(function (option) {
        const button = document.createElement("button");

        button.textContent = option;

        button.addEventListener("click", function () {
            checkAnswer(option, button);
        });

        answerButtons.appendChild(button);
    });
}

// Check the selected answer
function checkAnswer(selectedAnswer, selectedButton) {
    if (answered) return;

    answered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.answer;

    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach(function (button) {
        button.disabled = true;

        if (button.textContent === currentQuestion.answer) {
            button.classList.add("correct");
        }
    });

    if (correct) {
        score += 10;
        feedback.textContent = "✅ Correct! +10 points. " + currentQuestion.explanation;
    } else {
        selectedButton.classList.add("incorrect");
        feedback.textContent = "❌ Not quite! The correct answer is " +
            currentQuestion.answer + ". " + currentQuestion.explanation;
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextButton.textContent =
        currentQuestionIndex === questions.length - 1
            ? "See Results 🏆"
            : "Next Question →";

    nextButton.hidden = false;
}

// Move to the next question
nextButton.addEventListener("click", function () {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

// Show the final score
function showResults() {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    finalScore.textContent = `${score} / 100`;

    if (score === 100) {
        resultMessage.textContent = "Perfect score! You are the Choco Champion! 👑";
    } else if (score >= 70) {
        resultMessage.textContent = "Excellent work! You know your Choco facts! 🍫";
    } else if (score >= 40) {
        resultMessage.textContent = "Good effort! Keep learning and try again!";
    } else {
        resultMessage.textContent = "Keep practising! You can beat your score next time!";
    }
}

// Restart the quiz
restartButton.addEventListener("click", function () {
    resultScreen.hidden = true;
    welcomeScreen.hidden = false;
});
