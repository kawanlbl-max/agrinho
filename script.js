const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const restartButton = document.getElementById('restart-button');

let currentQuestionIndex = 0;
let score = 0;

// Array de perguntas sobre "Vidas Secas"
const questions = [
    {
        question: "Qual é o nome da família protagonista de Vidas Secas?",
        answers: [
            { text: "Família Guedes", correct: false },
            { text: "Família Silva", correct: false },
            { text: "Família de Fabiano", correct: true }, // Correta: Fabiano, Sinhá Vitória, meninos e a cachorra Baleia
            { text: "Família Santos", correct: false }
        ]
    },
    {
        question: "Qual animal é um membro importante da família e tem um capítulo dedicado a ele?",
        answers: [
            { text: "Um papagaio", correct: false },
            { text: "Uma cabra", correct: false },
            { text: "Um bode", correct: false },
            { text: "Uma cachorra (Baleia)", correct: true }
        ]
    },
    {
        question: "Qual era o sonho de Sinhá Vitória?",
        answers: [
            { text: "Ter uma casa na cidade", correct: false },
            { text: "Ter uma cama de couro", correct: true },
            { text: "Comprar um rádio", correct: false },
            { text: "Se tornar professora", correct: false }
        ]
    },
    {
        question: "O que o menino mais novo da família repete constantemente?",
        answers: [
            { text: "Palavras que não entende", correct: false },
            { text: "Onde estamos?", correct: false },
            { text: "Mundo", correct: true },
            { text: "Estou com fome", correct: false }
        ]
    },
    {
        question: "Qual é o nome do homem que a família encontra e com quem Fabiano se desentende?",
        answers: [
            { text: "Seu João", correct: false },
            { text: "O Soldado Amarelo", correct: true },
            { text: "Mestre José", correct: false },
            { text: "Pedro", correct: false }
        ]
    }
];

// Inicia o quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    resultContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    showQuestion();
}

// Mostra a próxima pergunta
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

// Reseta o estado dos botões e do quiz para a próxima pergunta
function resetState() {
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Lida com a seleção de uma resposta
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    }

    // Marca as respostas como corretas ou erradas
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    nextButton.classList.remove('hide'); // Mostra o botão "Próxima Pergunta"
}

// Define a classe CSS para o botão (correto/errado)
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
    // Desabilita os botões após uma resposta ser selecionada
    Array.from(answerButtons.children).forEach(button => {
        button.removeEventListener('click', selectAnswer);
    });
}

// Limpa as classes de status
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Avança para a próxima pergunta ou mostra o resultado final
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Mostra o resultado final do quiz
function showResult() {
    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreText.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;
}

// Reinicia o quiz
restartButton.addEventListener('click', startQuiz);

// Inicia o quiz ao carregar a página
startQuiz();
