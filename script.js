
let availableQuestions = [];
let questionCounter = 0;
let currentQuestion = {};
let differentTypeQuestion = {};

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
        availableQuestions = [...questions];
        getNewQuestion();
    };

    getNewQuestion = () => {
        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        differentTypeQuestion.add  
        hello = currentQuestion.questionDisplay;
        console.log(hello);

const quizQuestions = [
    {
        questionDisplay : JSON.stringify(hello),
        a: "Sofia",
        b: "Kuala Lumpur",
        c: "London",
        d: "Budapest",
        correct: "a",
    },
    {
        questionDisplay : JSON.stringify(hello),
        a: "Florin Pop",
        b: "Azizul Hasni Awang",
        c: "Ivan Saldano",
        d: "Mihai Andrei",
        correct: "b",
    },
    {
       
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

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

    const currentquizQuestions = quizQuestions[currentQuiz];

    //variables for manipulating the HTML elements.
    questionDisplay.innerText = currentquizQuestions.questionDisplay;
    first_answer.innerText = currentquizQuestions.a;
    second_answer.innerText = currentquizQuestions.b;
    third_answer.innerText = currentquizQuestions.c;
    fourth_answer.innerText = currentquizQuestions.d;
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
    console.log(answer);

    if (answer) {
        if (answer === quizQuestions[currentQuiz].correct) {
            score++;
        }
        
        //the currentQuiz will be moved to the next question or if it is finished. The score will be displayed
        currentQuiz++;
        if (currentQuiz < quizQuestions.length) {
            loadQuiz();
        } else {
            quizDisplay.innerHTML = `
                <h2>You answered correctly at ${score}/${quizQuestions.length} questions.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});
};
