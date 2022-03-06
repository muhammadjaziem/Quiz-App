
let availableQuestions = [];
let questionCounter = 0;
let currentQuestion;
let displayQuizQuestions;
let answerQuizOne;
let answerQuizTwo;
let answerQuizThree;
let answerQuizFour;
let answerCorrect;
let differentTypeQuestion = {};
let questionIndex;

fetch(
    'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
)
    .then((res) => {
        return res.json();
    })

    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                questionDisplay: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });
            console.log(formattedQuestion);
            return formattedQuestion;
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });


    startGame = () => {
        questionCounter = 0;
        availableQuestions = [...questions]; //load all the questions
        getNewQuestion();
    };

    getNewQuestion = () => {
        let questionIndex = Math.floor(Math.random() * availableQuestions.length);
        
         console.log(questionIndex);
        currentQuestion = availableQuestions[questionIndex];
       // differentTypeQuestion.add 
        displayQuizQuestions = currentQuestion.questionDisplay;
        answerQuizOne = currentQuestion.choice1;
        answerQuizTwo = currentQuestion.choice2;
        answerQuizThree = currentQuestion.choice3;
        answerQuizFour = currentQuestion.choice4;
        answerCorrect = JSON.stringify(currentQuestion.answer);
     
        
    };


const quizDisplay = document.getElementById("quizDisplay");
const answerEls = document.querySelectorAll(".answer");
const questionDisplay = document.getElementById("questionDisplay");
const first_answer = document.getElementById("first_answer");
const second_answer = document.getElementById("second_answer");
const third_answer = document.getElementById("third_answer");
const fourth_answer = document.getElementById("fourth_answer");
const submitAnswer = document.getElementById("submitAnswer");

let currentQuiz = 0;
let score = 0;

loadQuiz();


function loadQuiz() {
    deselectAnswers();
   // console.log(hello);
    //const currentquizQuestions = quizQuestions; //load the questions one by one to the respective variables.
    //currentquizQuestions[questionDisplay] = hello
    //to display the question in the mainpage
    if(displayQuizQuestions)
    {
        questionDisplay.innerText =  displayQuizQuestions;
        first_answer.innerText = answerQuizOne;
        second_answer.innerText = answerQuizTwo;
        third_answer.innerText = answerQuizThree;
        fourth_answer.innerText = answerQuizFour;
    }
    else
    {
         
    

        questionDisplay.innerText =  "Who is the President of America?";
        first_answer.innerText = "Barrack Obama";
        second_answer.innerText = "George W Bush";
        third_answer.innerText = "Jason Kenny";
        fourth_answer.innerText = "Leonadro Spinazoola";
    }
   
}

//displaying all the selected answers
function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
    
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        //to deselect the answer. If you choose 'A' and want to switch to 'B', 'A' will be deselected
        answerEl.checked = false;
    });
}

//event listener when the button is clicked
submitAnswer.addEventListener("click", () => {

    //check the correct answer
    const answer = getSelected();
    
    //console.log(answerCorrect);
    //console.log(answer);
    //check the correct answer
    if (answer) {
        if (answer ===  answerCorrect) {
            score++;
            
        }
        
        //the currentQuiz will be moved to the next question or if it is finished. The score will be displayed
        currentQuiz++;
        if (currentQuiz < availableQuestions.length) {
            startGame();
            loadQuiz();
        } else {
            quizDisplay.innerHTML = `
                <h2>You answered correctly at ${score}/${availableQuestions.length} questions.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});

