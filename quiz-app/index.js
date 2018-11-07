'use strict';

/*Question bank to store data*/
const STORE = [
    {
      question: 'What is the surname given to bastards born in Dorne?',
      answers: [
        'Rivers',
        'Sand',
        'Stone',
        'Snow'
        ],
      correctAnswer: 'Sand',
    },
    {
      question: "'The Mountain' is the nickname for which character?",
      answers: [
        'Sandor Clegane',
        'Dragon',
        'Gerold Clegane',
        'Night King'
        ],
        correctAnswer: 'Sandor Clegane',
    },
    {
      question: "Who is known as 'The-King-Beyond-the-Wall'?",
      answers: [
        'The Night King',
        'Sir Day King',
        'Mance Rayder',
        'Tormund Giantsbane'
        ],
        correctAnswer: 'Mance Rayder',
    },
    {
      question: 'How many times has Sansa been married?',
      answers: [
        'Twice',
        'None... really',
        'OK once',
        '4 bloody times'
        ],
      correctAnswer: 'Twice',
    },
    {
      question: 'Who killed Rob Stark at the red redding?',
      answers: [
        'The faceless man',
        'Ramsay Bolton',
        'The faceless women',
        'Roose Bolton'
        ],
      correctAnswer: 'Roose Bolton',
    },
    {
      question: "Which rival king attempted to take King's Landing during the Battle of the Blackwater?",
      answers: [
        'Sir Davos',
        'Balon Greyjoy',
        'Renly Baratheon',
        'Stannis Baratheon'
        ],
      correctAnswer: 'Stannis Baratheon',
    },
    {
      question: 'The wildling Gilly has a son, who is the father?',
      answers: [
      'Jeor Mormont',
      'Varis',
      'Craster',
      'Samwell Tarly'
      ],
      correctAnswer: 'Craster',
    },
    {
      question: 'Which of the main characters has appeared in more episodes than any other character?',
      answers: [
        'Jon Snow',
        'Sansa Stark',
        'Tyrion Lannister',
        'Daenerys Stormborn'
      ],
      correctAnswer: 'Tyrion Lannister',
    },
    {
      question: 'What city does Arya Stark train to become a Faceless Man?',
      answers: [
      'Tall statue',
      'Brayos',
      'Pentos',
      'Braavos'
      ],
      correctAnswer: 'Braavos',
    },
    {
      question: 'How many soldiers does Lyanna Mormont, Lady of Bear Island, provide for the "Battle of the Bastards"?',
      answers: [
        '2',
        '62',
        '620',
        '6,200'
    ],
    correctAnswer: '62',
    }
];

//Global variables to track question number and current score
let questionNumber = 0;
let score = 0;

//on startQuizButton click hide start div
//unhide quiz form div
function startQuiz () {
    $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
  });
};

function renderQuestion() {
  $('.questionAnswerForm').html(generateQuestion());
};

function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}

//Change question number top right of screen as new question appears
function changeQuestionNumber () {
  questionNumber ++;
  $('.questionNumber').text(questionNumber+1);
};

//user selects answer on submit run user feedback
function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
};

//what happens when the user clicks next
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
};

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
};

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
};

//user feedback for correct answer
function userAnswerFeedbackCorrect() {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>You are a bloody good warrior!!!</b></p><button type=button class="nextButton">Next</button></div>`);
};

//user feedback for wrong answer
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>You got it wrong bruh!</b><br>the bloody answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
};

//update score text
function updateScore () {
  changeScore();
  $('.score').text(score);
};

function changeScore () {
  score ++;
};

//when quiz is over this is the html for the page
function renderResults () {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You must be the king of the 7 realms!!!!</h3><p>You got ${score} / 10</p><p>Truly amazing!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You need training!</h3><p>You got ${score} / 10</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You won't make it in Westeros</h3><p>You got ${score} / 10</p><button class="restartButton">Restart Quiz</button></div>`);
  }
};

//restart quiz function - reloads page to start quiz over
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
};


//run quiz functions
function createQuiz () {

};

//run quiz functions
function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);

