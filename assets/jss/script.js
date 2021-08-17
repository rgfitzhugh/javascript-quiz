//Assignments
const startTextEl = document.getElementById("start-text");
const startTitleEL = document.getElementById("start-title")
const beginQuiz = document.getElementById("begin-quiz");
const timerEl = document.getElementById("timer");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const nextButtonEl = document.getElementById('next-button');
const viewScoresEl = document.getElementById('view-scores');
const enterScoreButtonEl = document.getElementById('enter-score-button');
const endGameButton = document.getElementById("endgame-button");
const highScoreContainer = document.getElementById('hs-container');
const inputScoreEl = document.getElementById("hs-chart");
const saveButtonEl = document.getElementById("save-button");
const highScoreChartEl = document.getElementById("high-score-chart");
var scoreCounter = 0;

let shuffledQuestions, currentQuestionIndex

//Quiz Questions
const questions = [
    {
        q: "A built-in Javascript function that will log information in the browser's console?",
        a: [
            {text: ".floor()", correct: false},
            {text: "console.log()", correct: true},
            {text: ".ceil()", correct: false},
            {text: ".sqrt()", correct: false},
        ]
    },
    {
        q: 'What must a variable begin with?',
        a: [
            {text: "Container for a piece of data", correct: false},
            {text: "A letter, $, or _", correct: true},
            {text: "Local or global'", correct: false},
            {text: "Undefined", correct: false},
        ]
    },

    {
        q: 'A javascript function that writes a string in the HTML document',
        a: [
            {text: "decrement--", correct: false},
            {text: "boolean", correct: false},
            {text: "document.write()", correct: true},
            {text: "increment++", correct: false},
        ]
    },
    {
        q: "Syntax that returns true, if the operand is false, and false if the operand is true?",
        a: [
            {text: "!", correct: true},
            {text: "&&", correct: false},
            {text: "variable", correct: false},
            {text: "||", correct: false},
        ]
    },
    {
        q: "Which operator subtracts the numeric value of its operand by one?",
        a: [
            {text: "document.write", correct: false},
            {text: "decrement--", correct: true},
            {text: "concatenation", correct: false},
            {text: "increment++", correct: false},
        ]
    },
    {
        q: 'A container for storing data values. Declared by the keyword "var"?',
        a: [
            {text: "div", correct: false},
            {text: "string", correct: false},
            {text: "array", correct: false},
            {text: "variable", correct: true},
        ]
    },
    {
        q: 'Syntax that returns true, if both opersnds are true?',
        a: [
            {text: "&&", correct: true},
            {text: "!", correct: false},
            {text: "||", correct: false},
            {text: "++", correct: false},
        ]
    },
    {
        q: 'A programming language that add interactivity to the web?',
        a: [
            {text: "variable", correct: false},
            {text: "decrement--", correct: false},
            {text: "increment++", correct: false},
            {text: "Javascript", correct: true},
        ]
    },
    {
        q: 'What data type only has two possible values (true and false)?',
        a: [
            {text: "modulus", correct: false},
            {text: "boolean", correct: true},
            {text: "string", correct: false},
            {text: "array", correct: false},
        ]
    },
    {
        q: 'What stores values into a variable? Represented by "=".',
        a: [
            {text: "heavy equipment operator", correct: false},
            {text: "switchboard operator", correct: false},
            {text: "assignment operator", correct: true},
            {text: "comparison operator", correct: false},
        ]
    },
]

//Event Listeners
beginQuiz.addEventListener("click", startGame);
nextButtonEl.addEventListener("click", ()=> {
    currentQuestionIndex++
    setNextQuestion();
})
viewScoresEl.addEventListener("click", seeScore)
enterScoreButtonEl.addEventListener("click", viewHighScore)
endGameButton.addEventListener("click", seeScore)

//Save Button Event Listener
saveButtonEl.addEventListener('click',function(event){
    event.preventDefault();
   
    var scoreInput = document.querySelector('#high-score').value + ": " + scoreCounter;

    if (scoreInput === '') {
        alert("Please type your initials!");
    };
        localStorage.setItem('score', scoreInput);
    
    renderLastScoreInput();

})

//Timer Display Message
function displayMessage(){
    document.getElementById('timer').innerHTML="Quiz Over!";
}

//Quiz Timer
var timeLeft = 60;

function countdown() {
    var timeInterval = setInterval(function() {
        document.getElementById("timer").innerHTML= ":" + timeLeft;
        timeLeft--;
        if (timeLeft < 1) {
            clearInterval(timeInterval);
            displayMessage();
            viewScoresEl.classList.add('hide')
            questionContainerEl.classList.add('hide')
            enterScoreButtonEl.classList.remove('hide')
            endGameButton.classList.add('hide')
            highScoreContainer.classList.remove('hide')
            seeScore();
        }
    }, 1000);
}


//Start Game
function startGame() {
//hide Start Quiz elements
    beginQuiz.classList.add('hide')
    startTextEl.classList.add('hide')
    startTitleEL.classList.add('hide')
//Shuffle Question Order
    shuffledQuestions = questions.sort(()=> Math.random() - .5)
    currentQuestionIndex = 0
//Recall Quiz Questions
    questionContainerEl.classList.remove('hide')
//Recall Buttons
   
    nextButtonEl.classList.remove('hide')

    setNextQuestion();
    countdown();
    scoreCounter = 0;
}

//Shows Questions on Screen
function showQuestion (questions) {
    questionEl.innerText = questions.q
    questions.a.forEach(a => {
        const button = document.createElement('button')
        button.innerText = a.text
        button.classList.add('btn')
        if (a.correct) {
            button.dataset.correct = a.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

//Next Question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

//Reset State of Questions
function resetState() {
    nextButtonEl.classList.add('hide')
    highScoreContainer.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

//Select Answer
function selectAnswer (e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextButtonEl.classList.remove('hide')
    } else {
        endGameButton.classList.remove('hide')
        }
    
    if (selectedButton.dataset = correct){
        scoreCounter++;
    } else {
        timeLeft-=10;
    }
}
//Sets the correct answers to be correct
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove ('correct')
    element.classList.remove('wrong')
}


//See Last High Score
function renderLastScoreInput(){
    highScoreChartEl .classList.remove("hide");
    var scoreInput = localStorage.getItem("score");
    highScoreChartEl.textContent = scoreInput;

}

//End Game 
function endGame(){
    seeScore();
};

//See Score
function seeScore (){
    questionContainerEl.classList.add('hide')
    viewScoresEl.classList.add('hide')
    enterScoreButtonEl.classList.remove('hide')
    nextButtonEl.classList.add('hide')
    highScoreContainer.classList.remove('hide')
    function hsMessage(){
        document.getElementById('hs-container').innerHTML="Your Score: " + scoreCounter;
        
        }
    timeLeft=1;
    hsMessage();
}

//View High Score
function viewHighScore (){
    questionContainerEl.classList.add('hide')
    viewScoresEl.classList.add('hide')
    enterScoreButtonEl.classList.add('hide')
    nextButtonEl.classList.add('hide')
    highScoreContainer.classList.remove('hide')
    inputScoreEl.classList.remove('hide')

    renderLastScoreInput();
}