// add JS to display the correct questions so that we can select the answers:

const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]
    },
    {   question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
    {   question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Afrika", correct: false},
        ]
    }
];

// Add variables for question, answer, and next buttons:

const questionElement = document.getElementById("question")             // line 12 in the html file
const answerButtons = document.getElementById("answer-buttons")          // line 13 in the html file
const nextButton = document.getElementById("next-btn")                  // line 19 in the html file

// Whenever you start the quiz and give the answers, the question number and score will be changing;
// Add variables to hold question index and score:

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";                                      // To start or replay the next quiz
    showQuestion();                                                     // Will display the questions
}

function showQuestion(){
    resetState();                                                       // Last function: we have to hide/clear the 'Answers' btns
    let currentQuestion = questions[currentQuestionIndex];              // Pulling questions from the questions object
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

currentQuestion.answers.forEach(answer => {                             // Code to display the answers:
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;                        // Last conditional; it will check object if true or false
    }
    button.addEventListener("click", selectAnswer);
});
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){                                    // If it has a 'child element', remove that; remove all previous answers
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");                         // Background color change whether correct or incorrect
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){                          // Disable the click after selecting one answer; 
            button.classList.add("correct");                            // If we choose wrong answer, it will automatically highlight the correct answer;
        }
        button.disabled = true;                                         // We also cannot select any other answer
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
});

startQuiz();




