const questions = [
    { 
        question: 'What is 2 + 2?', 
        options: ['3', '4', '5'], 
        answer: '4',
        selectedAnswer: null 
    },
    { 
        question: 'What is the capital of France?', 
        options: ['Berlin', 'Paris', 'Rome'], 
        answer: 'Paris',
        selectedAnswer: null
    },
    { 
        question: 'What is the capital of Nigeria?', 
        options: ['Abuja', 'Lagos', 'Kano'], 
        answer: 'Abuja',
        selectedAnswer: null
    },
    { 
        question: 'What is the name of your Nigeria President?', 
        options: ['Asiwaju Tinubu', 'Peter Obi', 'Abdul Tanbua'], 
        answer: 'Asiwaju Tinubu',
        selectedAnswer: null
    },
    { 
        question: 'What do you use for responsiveness of your website?', 
        options: ['PHP', 'Javascript', 'Kotlin'], 
        answer: 'Javascript',
        selectedAnswer: null
    },
    { 
        question: 'Who is the owner of Facebook?', 
        options: ['Jeff Benzos', 'Mark Zukarberg', 'Kotlin'], 
        answer: 'Mark Zukarberg',
        selectedAnswer: null
    },
    { 
        question: 'One of this is the backend language?', 
        options: ['PHP', 'Javascript', 'HTML'], 
        answer: 'PHP',
        selectedAnswer: null
    },
    { 
        question: 'Who is the speaker of Oyo State House of Assembly?', 
        options: ['Rt Honourable Speaker Debo Ogundoyin', 'Rt Honourable Speaker Peter Ayoola', 'Rt Honourable Speaker Giwa Tanbua'], 
        answer: 'Rt Honourable Speaker Debo Ogundoyin',
        selectedAnswer: null
    },
    { 
        question: 'The following are the type of laptop except?', 
        options: ['HP', 'Dell', 'Kotlin'], 
        answer: 'Kotlin',
        selectedAnswer: null
    },
    { 
        question: 'What is the full meaning of PHP?', 
        options: ['People Health Page', 'Hypertext Preprocessor', 'Personal Home Page'], 
        answer: 'Hypertext Preprocessor',
        selectedAnswer: null  
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let selectedOption = null;

function next() {
    const ready = document.getElementById('ready');
    ready.classList.add('hidden');

    const next = document.getElementById('instructions');
    next.classList.remove('hidden');

    loadQuestion();
}

function startQuiz() {
    const instructions = document.getElementById('instructions');
    instructions.classList.add('hidden');

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.classList.remove('hidden');

    loadQuestion();
}

function loadQuestion() {
    clearTimeout(timer);
    timeLeft = 10;
    selectedOption = null; 

    const questionContainer = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options');
    const questionNumber = document.getElementById('question-number');
    const progressBar = document.getElementById('progress-bar');
    const statusContainer = document.getElementById('status-container');
    const timerElement = document.getElementById('timer');

    const question = questions[currentQuestionIndex];

    questionNumber.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionContainer.innerText = question.question;

    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.value = option;
        input.addEventListener('change', checkAnswer);
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement('br'));
    });

    if (question.selectedAnswer) {
        const selectedLabel = optionsContainer.querySelector(`input[value='${question.selectedAnswer}']`).parentElement;
        if (question.selectedAnswer === question.answer) {
            selectedLabel.classList.add('correct');
        } else {
            selectedLabel.classList.add('wrong');
        }
    }

    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    statusContainer.innerHTML = '';
    for (let i = 0; i < questions.length; i++) {
        const circle = document.createElement('div');
        circle.classList.add('status-circle');
        if (i < currentQuestionIndex) {
            const correctAnswer = questions[i].answer;
            const selectedAnswer = questions[i].selectedAnswer;
            if (selectedAnswer === correctAnswer) {
                circle.classList.add('correct');
            } else {
                circle.classList.add('wrong');
            }
        } else if (i === currentQuestionIndex) {
            circle.classList.add('active');
        }
        statusContainer.appendChild(circle);
        
    } 

    timerElement.innerText = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearTimeout(timer); 
            if (!questions[currentQuestionIndex].selectedAnswer) {
                nextQuestion(); // Move to the next question
            }
        }
    }, 1000);
}

function checkAnswer(event) {
    clearTimeout(timer);
    if (event) { // Check if there's an event object (user clicked an option)
      selectedOption = event.target;
    }
    const selectedValue = selectedOption ? selectedOption.value : null; // Get selected value (or null if no option selected)
    const correctAnswer = questions[currentQuestionIndex].answer;
  
    questions[currentQuestionIndex].selectedAnswer = selectedValue;
  
    if (selectedValue === correctAnswer) {
      score++;
      markAnswer('correct');
    } else {
      markAnswer('wrong');
    }
  
    nextQuestion(); // Always proceed to the next question after checking the answer
  }

function markAnswer(status) {
    const circles = document.querySelectorAll('.status-circle');
    circles[currentQuestionIndex].classList.add(status);

    const optionsContainer = document.getElementById('options');
    const correctAnswer = questions[currentQuestionIndex].answer;

    const selectedLabel = optionsContainer.querySelector(`input[value='${questions[currentQuestionIndex].selectedAnswer}']`).parentElement;
    selectedLabel.classList.add(status === 'correct' ? 'correct' : 'wrong');

    const correctLabel = optionsContainer.querySelector(`input[value='${correctAnswer}']`).parentElement;
    correctLabel.classList.add('correct');
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.classList.add('hidden');

    const finalResult = document.getElementById('final-result');
    finalResult.classList.remove('hidden');
    const result = document.getElementById('result');

    const passFail = document.getElementById('pass-fail');
    const winnerVideo = document.getElementById('winner-animation-video');
    const loserVideo = document.getElementById('loser-animation-video');

    if (score < 6) {
        passFail.innerText = "Ops You Fail, Try Your Luck Next Time";
        loserVideo.style.display = 'block';
        winnerVideo.style.display = 'none';
        loserVideo.play(); 
    } else {
        passFail.innerText = "Congratulations You Pass!!!!";
        winnerVideo.style.display = 'block';
        loserVideo.style.display = 'none';
        winnerVideo.play(); 
    }

    result.innerText = `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questions.forEach(question => {
        question.selectedAnswer = null;
    });
    const finalResult = document.getElementById('final-result');
    finalResult.classList.add('hidden');

    const winnerVideo = document.getElementById('winner-animation-video');
    const loserVideo = document.getElementById('loser-animation-video');
    winnerVideo.style.display = 'none';
    loserVideo.style.display = 'none';

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.classList.remove('hidden');

    loadQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', next);

    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', restartQuiz);
});

