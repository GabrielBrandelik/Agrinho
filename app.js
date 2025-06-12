document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-btn');
    const resultContainer = document.getElementById('result-container');
    const scoreText = document.getElementById('score');
    const totalQuestionsText = document.getElementById('total-questions');
    const questionContainer = document.getElementById('question-container');

    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = new Array(perguntas.length).fill(null);

    function showQuestion() {
        const question = perguntas[currentQuestionIndex];
        questionText.textContent = question.pergunta;
        
        optionsContainer.innerHTML = '';
        question.opcoes.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            if (userAnswers[currentQuestionIndex] === index) {
                button.classList.add('selected');
            }
            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });

        updateProgressBar();
        updateButtons();
    }

    function selectOption(optionIndex) {
        userAnswers[currentQuestionIndex] = optionIndex;
        showQuestion();
    }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / perguntas.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function updateButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = currentQuestionIndex === perguntas.length - 1;
        submitBtn.style.display = currentQuestionIndex === perguntas.length - 1 ? 'block' : 'none';
    }

    function showNextQuestion() {
        if (currentQuestionIndex < perguntas.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        }
    }

    function showPrevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    }

    function calculateScore() {
        score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === perguntas[index].resposta) {
                score++;
            }
        });
    }

    function showResults() {
        calculateScore();
        questionContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        scoreText.textContent = score;
        totalQuestionsText.textContent = perguntas.length;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = new Array(perguntas.length).fill(null);
        questionContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        showQuestion();
    }

    prevBtn.addEventListener('click', showPrevQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitBtn.addEventListener('click', showResults);
    restartBtn.addEventListener('click', restartQuiz);

    showQuestion();
});