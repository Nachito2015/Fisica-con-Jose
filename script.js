// --- 1. Referencias a los elementos del HTML ---
const scoreDisplay = document.getElementById('score-display');
const positionDisplay = document.getElementById('position-display');
const mainVideo = document.getElementById('main-video');
const infoBar = document.getElementById('info-bar');
const questionPopup = document.getElementById('question-popup');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackPopup = document.getElementById('feedback-popup');
const feedbackVideo = document.getElementById('feedback-video');
const contentArea = document.getElementById('content-area');
const skipBtn = document.getElementById('skip-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const nameInput = document.getElementById('name-input');
const namePrompt = document.getElementById('name-prompt');
const playerNameDisplay = document.getElementById('player-name-display');
const timerText = document.getElementById('timer-text');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');
const explanationPopup = document.getElementById('explanation-popup');
const explanationText = document.getElementById('explanation-text');
const nextQuestionBtn = document.getElementById('next-question-btn');
const jokerBtn = document.getElementById('joker-5050-btn');
const jokerCount = document.getElementById('joker-count');
const initialScreen = document.getElementById('initial-screen');
const modeSelectionScreen = document.getElementById('mode-selection-screen');
const competitionModeBtn = document.getElementById('competition-mode-btn');
const studyModeBtn = document.getElementById('study-mode-btn');
const startBtn = document.getElementById('start-btn');
const rankingContainer = document.getElementById('ranking-container');


// --- 2. Datos del Juego (sin cambios) ---
const QUESTIONS_POOL = [
    {"text": "¿Qué relaciona la Ley de Gauss para el campo eléctrico?", "options": ["Flujo magnético y corriente", "Flujo eléctrico y carga encerrada", "Campo eléctrico y potencial", "Resistencia y voltaje"], "correct_answer": "Flujo eléctrico y carga encerrada", "explanation": "La Ley de Gauss establece que el flujo eléctrico neto a través de una superficie cerrada es directamente proporcional a la carga eléctrica neta encerrada por la superficie.", "category": "Electromagnetismo"},
    {"text": "La Ley de Gauss para el campo magnético implica que...", "options": ["Existen monopolos magnéticos", "El flujo magnético neto es siempre cero", "El campo magnético es conservativo", "Las cargas magnéticas se conservan"], "correct_answer": "El flujo magnético neto es siempre cero", "explanation": "Esta ley indica que no existen monopolos magnéticos (polos norte o sur aislados). Por lo tanto, las líneas de campo magnético siempre son cerradas.", "category": "Electromagnetismo"},
    {"text": "El signo negativo en la Ley de Faraday se asocia con la Ley de...", "options": ["Ohm", "Lenz", "Gauss", "Coulomb"], "correct_answer": "Lenz", "explanation": "La Ley de Lenz complementa la Ley de Faraday, indicando que la corriente inducida siempre fluye en una dirección que se opone al cambio de flujo magnético que la produjo.", "category": "Electromagnetismo"},
    {"text": "La Ley de Ampère (original) relaciona la circulación del campo magnético con...", "options": ["La carga eléctrica encerrada", "El flujo eléctrico cambiante", "La corriente eléctrica encerrada", "La resistencia del circuito"], "correct_answer": "La corriente eléctrica encerrada", "explanation": "La Ley de Ampère establece que la circulación de un campo magnético a lo largo de una trayectoria cerrada es proporcional a la corriente eléctrica que atraviesa el área delimitada por dicha trayectoria.", "category": "Electromagnetismo"},
    {"text": "¿Qué modificación añadió Maxwell a la Ley de Ampère?", "options": ["Término de flujo eléctrico", "Término de corriente de desplazamiento", "Término de carga magnética", "Constante dieléctrica"], "correct_answer": "Término de corriente de desplazamiento", "explanation": "Maxwell añadió el término de 'corriente de desplazamiento', que representa un campo eléctrico cambiante, permitiendo así que la ley se aplique a situaciones donde no hay corrientes físicas, como en los capacitores.", "category": "Electromagnetismo"},
    {"text": "¿Cuál es la unidad de la corriente eléctrica?", "options": ["Voltio (V)", "Ohmio (Ω)", "Amperio (A)", "Coulomb (C)"], "correct_answer": "Amperio (A)", "explanation": "El Amperio (A) es la unidad del Sistema Internacional para la intensidad de corriente eléctrica, que mide el flujo de carga por unidad de tiempo.", "category": "Circuitos Eléctricos"},
    {"text": "La Ley de Ohm establece una relación entre voltaje, corriente y...", "options": ["Capacitancia", "Inductancia", "Resistencia", "Potencia"], "correct_answer": "Resistencia", "explanation": "La Ley de Ohm, V = I * R, es una de las relaciones fundamentales en los circuitos eléctricos, conectando voltaje (V), corriente (I) y resistencia (R).", "category": "Circuitos Eléctricos"},
    {"text": "En una conexión de resistencias en serie, la resistencia total es...", "options": ["La suma de las resistencias", "El inverso de la suma de inversos", "El promedio de las resistencias", "La menor de las resistencias"], "correct_answer": "La suma de las resistencias", "explanation": "En una conexión en serie, las resistencias se suman para obtener la resistencia total equivalente: R_total = R1 + R2 + ...", "category": "Circuitos Eléctricos"},
    {"text": "La primera Ley de Kirchhoff (ley de nodos) se basa en la conservación de la...", "options": ["Energía", "Momento", "Carga", "Masa"], "correct_answer": "Carga", "explanation": "La ley de nodos establece que la suma de las corrientes que entran a un nodo es igual a la suma de las corrientes que salen, lo cual es una manifestación de la conservación de la carga eléctrica.", "category": "Circuitos Eléctricos"},
    {"text": "¿Qué componente almacena energía en forma de campo eléctrico?", "options": ["Resistencia", "Inductor", "Capacitor", "Diodo"], "correct_answer": "Capacitor", "explanation": "Un capacitor o condensador almacena energía en el campo eléctrico que se forma entre sus placas conductoras.", "category": "Circuitos Eléctricos"},
    {"text": "Según la relatividad especial de Einstein, ¿qué ocurre con el tiempo para un observador en movimiento rápido?", "options": ["Se acelera", "Se detiene", "Se ralentiza (dilatación del tiempo)", "No cambia"], "correct_answer": "Se ralentiza (dilatación del tiempo)", "explanation": "La dilatación del tiempo es una consecuencia de la teoría de la relatividad especial, donde un reloj en movimiento se observa funcionar más lentamente que un reloj en reposo.", "category": "Física Moderna y Conceptos"},
    {"text": "La famosa ecuación E=mc² relaciona la energía (E) con la masa (m) y...", "options": ["La aceleración de la gravedad (g)", "La constante de Planck (h)", "La velocidad de la luz (c)", "La constante de Boltzmann (k)"], "correct_answer": "La velocidad de la luz (c)", "explanation": "Esta ecuación expresa la equivalencia entre masa y energía, donde 'c' es la velocidad de la luz en el vacío, una constante universal muy grande.", "category": "Física Moderna y Conceptos"},
    {"text": "En la física cuántica, la luz se comporta como...", "options": ["Solo partícula", "Solo onda", "Partícula y onda a la vez", "Ni partícula ni onda"], "correct_answer": "Partícula y onda a la vez", "explanation": "Este es el principio de la dualidad onda-partícula, uno de los conceptos fundamentales de la mecánica cuántica. La luz puede exhibir propiedades de ambas.", "category": "Física Moderna y Conceptos"},
    {"text": "¿Cuál es la unidad de carga eléctrica en el SI?", "options": ["Amperio (A)", "Voltio (V)", "Ohmio (Ω)", "Coulomb (C)"], "correct_answer": "Coulomb (C)", "explanation": "El Coulomb (C) es la unidad del Sistema Internacional para la medida de la cantidad de carga eléctrica.", "category": "Física Moderna y Conceptos"},
    {"text": "Si duplicas la distancia a una carga puntual, el campo eléctrico se reduce a...", "options": ["La mitad", "La cuarta parte", "No cambia", "El doble"], "correct_answer": "La cuarta parte", "explanation": "El campo eléctrico de una carga puntual sigue una ley de la inversa del cuadrado (1/r²). Si duplicas la distancia (r -> 2r), el campo se reduce por un factor de (2r)² = 4r², es decir, a la cuarta parte.", "category": "Física Moderna y Conceptos"},
    { "text": "La Primera Ley de la Termodinámica es una expresión de la conservación de la...", "options": ["Masa", "Carga", "Energía", "Momento"], "correct_answer": "Energía", "explanation": "Establece que el cambio en la energía interna de un sistema es igual al calor añadido al sistema menos el trabajo realizado por el sistema.", "category": "Termodinámica" },
    { "text": "El 'cero absoluto' (0 Kelvin) es la temperatura a la cual...", "options": ["El agua se congela", "Las partículas tienen energía cinética mínima", "Todos los materiales se vuelven superconductores", "La presión es máxima"], "correct_answer": "Las partículas tienen energía cinética mínima", "explanation": "Es el punto teórico en el que las partículas subatómicas carecerían de energía en forma de calor (aunque conservan la energía del punto cero cuántico).", "category": "Termodinámica" },
    { "text": "La transferencia de calor por el movimiento de fluidos (líquidos o gases) se llama...", "options": ["Conducción", "Convección", "Radiación", "Evaporación"], "correct_answer": "Convección", "explanation": "La convección implica el movimiento de masa de regiones de alta temperatura a regiones de baja temperatura.", "category": "Termodinámica" },
    { "text": "La entropía es una medida de...", "options": ["La temperatura de un sistema", "La energía útil de un sistema", "El desorden de un sistema", "La presión de un sistema"], "correct_answer": "El desorden de un sistema", "explanation": "La Segunda Ley de la Termodinámica establece que la entropía de un sistema aislado siempre tiende a aumentar con el tiempo.", "category": "Termodinámica" },
    { "text": "¿Qué principio establece que no se puede construir una máquina que sea 100% eficiente?", "options": ["Primera Ley de la Termodinámica", "Segunda Ley de la Termodinámica", "Tercera Ley de la Termodinámica", "Ley Cero de la Termodinámica"], "correct_answer": "Segunda Ley de la Termodinámica", "explanation": "Debido al inevitable aumento de la entropía, una parte de la energía en cualquier proceso real se disipará como calor no aprovechable, impidiendo una eficiencia del 100%.", "category": "Termodinámica" },
    { "text": "El fenómeno por el cual una onda se desvía al pasar por un obstáculo o una rendija se llama...", "options": ["Reflexión", "Refracción", "Difracción", "Interferencia"], "correct_answer": "Difracción", "explanation": "La difracción es la curvatura de las ondas al rodear los bordes de un objeto. Es más pronunciada cuando el tamaño del obstáculo es comparable a la longitud de onda.", "category": "Ondas y Óptica" },
    { "text": "En la refracción, una onda cambia de dirección al pasar de un medio a otro. ¿Qué propiedad de la onda cambia siempre?", "options": ["Frecuencia", "Amplitud", "Velocidad", "Período"], "correct_answer": "Velocidad", "explanation": "La velocidad de una onda depende del medio en el que se propaga. La frecuencia, sin embargo, permanece constante.", "category": "Ondas y Óptica" },
    { "text": "Una lente convergente...", "options": ["Dispersa los rayos de luz", "Concentra los rayos de luz en un punto focal", "Solo refleja la luz", "No afecta la trayectoria de la luz"], "correct_answer": "Concentra los rayos de luz en un punto focal", "explanation": "Las lentes convergentes (convexas) son más gruesas en el centro y hacen que los rayos de luz paralelos converjan en un punto llamado foco.", "category": "Ondas y Óptica" },
    { "text": "El color de la luz visible está determinado por su...", "options": ["Intensidad", "Velocidad", "Frecuencia", "Polarización"], "correct_answer": "Frecuencia", "explanation": "Dentro del espectro visible, las diferentes frecuencias de la luz son percibidas por el ojo humano como diferentes colores (del rojo a baja frecuencia al violeta a alta frecuencia).", "category": "Ondas y Óptica" },
    { "text": "Las ondas de sonido son un ejemplo de ondas...", "options": ["Transversales", "Electromagnéticas", "Longitudinales", "Superficiales"], "correct_answer": "Longitudinales", "explanation": "En las ondas longitudinales, la oscilación de las partículas del medio es paralela a la dirección de propagación de la onda, como en las compresiones y rarefacciones del sonido.", "category": "Ondas y Óptica" },
    { "text": "¿Cuál de las siguientes es una cantidad vectorial?", "options": ["Masa", "Tiempo", "Velocidad", "Temperatura"], "correct_answer": "Velocidad", "explanation": "La velocidad tiene tanto magnitud (rapidez) como dirección, lo que la define como un vector. Las otras son cantidades escalares.", "category": "Mecánica Clásica" },
    { "text": "La segunda ley de Newton establece que la fuerza es igual a...", "options": ["Masa por velocidad", "Masa por aceleración", "Trabajo por distancia", "Energía por tiempo"], "correct_answer": "Masa por aceleración", "explanation": "La fórmula F=ma indica que la fuerza neta sobre un objeto es igual a su masa multiplicada por su aceleración.", "category": "Mecánica Clásica" },
    { "text": "El principio de conservación de la energía mecánica se aplica cuando...", "options": ["Solo actúan fuerzas conservativas", "La velocidad es constante", "No hay aceleración", "El sistema está en reposo"], "correct_answer": "Solo actúan fuerzas conservativas", "explanation": "La energía mecánica (cinética + potencial) se conserva solo si no hay fuerzas no conservativas, como la fricción, realizando trabajo.", "category": "Mecánica Clásica" },
    { "text": "La unidad de trabajo y energía en el Sistema Internacional es el...", "options": ["Newton (N)", "Vatio (W)", "Pascal (Pa)", "Joule (J)"], "correct_answer": "Joule (J)", "explanation": "El Joule (J) es la unidad derivada para energía, trabajo y calor. Un Joule es el trabajo hecho por una fuerza de un Newton en un metro.", "category": "Mecánica Clásica" },
    { "text": "En un movimiento circular uniforme, ¿qué magnitud permanece constante?", "options": ["La velocidad", "La aceleración", "La rapidez", "La fuerza neta"], "correct_answer": "La rapidez", "explanation": "En un MCU, la dirección de la velocidad cambia constantemente (siempre es tangente a la trayectoria), pero su magnitud, la rapidez, es constante.", "category": "Mecánica Clásica" },
];

const questions = QUESTIONS_POOL.sort(() => 0.5 - Math.random());

// --- 3. Estado del Juego ---
let score = 0;
let currentPosition = 0;
let currentQuestionIndex = 0;
let playerName = '';
let questionTimer = null;
let lastAnswerWasCorrect = false;
let categoryPerformance = {};
let jokersLeft = 1;
let gameMode = '';

// --- 4. Funciones Principales ---

function stopTimer() {
    if (questionTimer) {
        clearInterval(questionTimer);
        questionTimer = null;
    }
}

function updateCategoryPerformance(question, isCorrect) {
    const category = question.category || 'General';
    if (!categoryPerformance[category]) {
        categoryPerformance[category] = { correct: 0, total: 0 };
    }
    categoryPerformance[category].total++;
    if (isCorrect) {
        categoryPerformance[category].correct++;
    }
}

function handleTimeout() {
    stopTimer();
    lastAnswerWasCorrect = false;
    const currentQuestion = questions[currentQuestionIndex];
    updateCategoryPerformance(currentQuestion, false);

    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.innerText === currentQuestion.correct_answer) {
            button.classList.add('correct');
        }
    });
    setTimeout(() => {
        questionPopup.classList.remove('active');
        playFeedbackVideo('assets/te_espero.mp4');
    }, 1200);
}


function checkAnswer(selectedOption, clickedButton) {
    stopTimer();
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correct_answer;
    lastAnswerWasCorrect = isCorrect;
    updateCategoryPerformance(currentQuestion, isCorrect);

    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.innerText === currentQuestion.correct_answer) {
            button.classList.add('correct');
        }
    });

    if (!isCorrect) {
        clickedButton.classList.add('incorrect');
    }

    if (isCorrect) {
        score++;
    }
    scoreDisplay.innerText = score;

    setTimeout(() => {
        questionPopup.classList.remove('active');
        if (isCorrect) {
            playFeedbackVideo('assets/muy_bien.mp4');
        } else {
            playFeedbackVideo('assets/te_espero.mp4');
        }
    }, 1200);
}

function playFeedbackVideo(videoSrc) {
    feedbackPopup.classList.add('active');
    feedbackVideo.src = videoSrc;
    feedbackVideo.play();
}

function showExplanationOrNextQuestion() {
    feedbackPopup.classList.remove('active');
    const question = questions[currentQuestionIndex];

    const shouldShowExplanation = (gameMode === 'study' || !lastAnswerWasCorrect) && question.explanation;

    if (shouldShowExplanation) {
        explanationText.innerText = question.explanation;
        explanationPopup.classList.add('active');
    } else {
        showNextQuestion();
    }
}

function showNextQuestion() {
    explanationPopup.classList.remove('active');
    currentQuestionIndex++;
    currentPosition++;
    
    if (currentQuestionIndex < questions.length) {
        positionDisplay.innerText = `${currentPosition} / ${questions.length}`;
        updateProgressBar();
        showQuestion(currentQuestionIndex);
    } else {
        endGame();
    }
}

function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    questionText.innerText = question.text;
    optionsContainer.innerHTML = ''; 

    question.options.forEach(optionText => {
        const button = document.createElement('button');
        button.innerText = optionText;
        button.onclick = () => checkAnswer(optionText, button);
        optionsContainer.appendChild(button);
    });

    if (questionIndex === questions.length - 1) {
        skipBtn.classList.add('hidden');
    } else {
        skipBtn.classList.remove('hidden');
    }
    
    jokerBtn.disabled = jokersLeft <= 0;
    jokerCount.innerText = `(${jokersLeft})`;

    if (gameMode === 'study') {
        timerText.parentElement.classList.add('hidden');
        jokerBtn.classList.add('hidden');
    } else {
        timerText.parentElement.classList.remove('hidden');
        jokerBtn.classList.remove('hidden');
    }

    questionPopup.classList.add('active');

    if (gameMode === 'competition') {
        let timeLeft = 12;
        timerText.innerText = timeLeft;
        stopTimer();
        questionTimer = setInterval(() => {
            timeLeft--;
            timerText.innerText = timeLeft;
            if (timeLeft <= 0) {
                handleTimeout();
            }
        }, 1000);
    }
}

function useJoker5050() {
    if (jokersLeft <= 0) return;

    jokersLeft--;
    jokerBtn.disabled = true;
    jokerCount.innerText = `(${jokersLeft})`;
    
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('button');
    
    const incorrectOptions = currentQuestion.options.filter(opt => opt !== currentQuestion.correct_answer);
    incorrectOptions.sort(() => 0.5 - Math.random());
    const toRemove = incorrectOptions.slice(0, 2);

    buttons.forEach(button => {
        if (toRemove.includes(button.innerText)) {
            button.classList.add('hidden');
        }
    });
}


function selectMode(mode) {
    gameMode = mode;
    modeSelectionScreen.classList.add('hidden');
    namePrompt.classList.remove('hidden');
}

function playWelcomeVideo() {
    playerName = nameInput.value.trim() || 'Jugador Anónimo';
    playerNameDisplay.innerText = playerName;

    namePrompt.classList.add('hidden');
    initialScreen.classList.remove('hidden');
    
    mainVideo.src = 'assets/welcome_video.mp4';
    mainVideo.controls = false;
    mainVideo.play();
    mainVideo.addEventListener('ended', startGame);
}

function startGame() {
    initialScreen.classList.add('hidden');
    infoBar.classList.remove('hidden');
    progressBarContainer.classList.remove('hidden');
    
    jokersLeft = 1;
    
    currentPosition = 1;
    positionDisplay.innerText = `${currentPosition} / ${questions.length}`;
    updateProgressBar();
    showQuestion(0);
}

function updateProgressBar() {
    const progress = (currentPosition / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}


function skipToEnd() {
    stopTimer();
    questionPopup.classList.remove('active');
    feedbackPopup.classList.remove('active');
    
    currentQuestionIndex = questions.length - 1;
    currentPosition = questions.length;
    
    positionDisplay.innerText = `${currentPosition} / ${questions.length}`;
    updateProgressBar();
    showQuestion(currentQuestionIndex);
}

async function saveScore() {
    if (gameMode !== 'competition' || !playerName) {
        return;
    }
    try {
        await db.collection("scores").add({
            name: playerName,
            score: score,
            percentage: Math.round((score / questions.length) * 100),
            timestamp: new Date()
        });
        console.log("Puntaje guardado en Firebase exitosamente.");
    } catch (error) {
        console.error("Error al guardar el puntaje: ", error);
    }
}

// --- FUNCIÓN MODIFICADA ---
async function displayRanking() {
    rankingContainer.classList.remove('hidden');
    rankingContainer.innerHTML = '<h3>Mejores Puntajes</h3><p>Cargando...</p>';

    try {
        // Usamos .get() que es el método correcto para obtener los datos una vez
        const querySnapshot = await db.collection("scores").orderBy("score", "desc").limit(10).get();
        
        if (querySnapshot.empty) {
            rankingContainer.innerHTML = '<h3>Mejores Puntajes</h3><p>Aún no hay puntajes. ¡Sé el primero!</p>';
            return;
        }

        let rankingHtml = '<table><thead><tr><th>Pos.</th><th>Nombre</th><th>Puntaje</th></tr></thead><tbody>';
        let rank = 1;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            rankingHtml += `<tr><td>${rank}</td><td>${data.name}</td><td>${data.score}</td></tr>`;
            rank++;
        });
        rankingHtml += '</tbody></table>';
        rankingContainer.innerHTML = rankingHtml;
    } catch (error) {
        console.error("Error al obtener el ranking: ", error);
        rankingContainer.innerHTML = '<h3>Mejores Puntajes</h3><p>No se pudo cargar el ranking.</p>';
    }
}
// --- FIN FUNCIÓN MODIFICADA ---


async function endGame() {
    infoBar.classList.add('hidden');
    progressBarContainer.classList.add('hidden');

    await saveScore();

    const percentage = Math.round((score / questions.length) * 100);
    let finalLevel = "";

    if (percentage >= 90) {
        finalLevel = "Profesor de Física";
    } else if (percentage >= 80) {
        finalLevel = "Estudiante de IFD o CERP";
    } else {
        finalLevel = "Estudiante de Secundaria";
    }
    
    contentArea.innerHTML = `<p style="font-size: 1.5em;">¡Juego terminado, ${playerName}!<br>Puntaje: ${score}/${questions.length} (${percentage}%)<br>Tu nivel es: <strong>${finalLevel}</strong></p>`;
    
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'category-summary';
    summaryDiv.innerHTML = '<h3>Rendimiento por Tema</h3>';

    for (const category in categoryPerformance) {
        const item = categoryPerformance[category];
        const percent = Math.round((item.correct / item.total) * 100);
        summaryDiv.innerHTML += `
            <div class="category-item">
                <span class="category-name">${category}:</span>
                <span class="category-score">${item.correct} / ${item.total} (${percent}%)</span>
            </div>
        `;
    }
    contentArea.appendChild(summaryDiv);
    
    await displayRanking();

    const finalVideo = document.createElement('video');
    finalVideo.src = 'assets/final.mp4';
    finalVideo.controls = true;
    finalVideo.autoplay = true;
    finalVideo.width = 640;
    contentArea.appendChild(finalVideo);

    contentArea.appendChild(playAgainBtn);
    playAgainBtn.classList.remove('hidden');
}


// --- Event Listeners ---
mainVideo.addEventListener('ended', () => {
    initialScreen.classList.add('hidden');
    modeSelectionScreen.classList.remove('hidden');
});
competitionModeBtn.addEventListener('click', () => selectMode('competition'));
studyModeBtn.addEventListener('click', () => selectMode('study'));
startBtn.addEventListener('click', playWelcomeVideo);
feedbackVideo.addEventListener('ended', showExplanationOrNextQuestion);
nextQuestionBtn.addEventListener('click', showNextQuestion);
skipBtn.addEventListener('click', skipToEnd);
jokerBtn.addEventListener('click', useJoker5050);
playAgainBtn.addEventListener('click', () => {
    location.reload();
});