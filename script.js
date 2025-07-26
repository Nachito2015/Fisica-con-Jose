// --- 1. Referencias a los elementos del HTML ---
const scoreDisplay = document.getElementById('score-display');
const positionDisplay = document.getElementById('position-display');
const mainVideo = document.getElementById('main-video');
const startBtn = document.getElementById('start-btn');
const infoBar = document.getElementById('info-bar');
const questionPopup = document.getElementById('question-popup');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackPopup = document.getElementById('feedback-popup');
const feedbackVideo = document.getElementById('feedback-video');
const contentArea = document.getElementById('content-area');
const skipBtn = document.getElementById('skip-btn');
const playAgainBtn = document.getElementById('play-again-btn');
// AÑADIDO: Referencias para el nombre del jugador
const nameInput = document.getElementById('name-input');
const namePrompt = document.getElementById('name-prompt');
const playerNameDisplay = document.getElementById('player-name-display');

// --- 2. Datos del Juego (Banco de preguntas completo) ---
const QUESTIONS_POOL = [
    {"text": "¿Qué relaciona la Ley de Gauss para el campo eléctrico?", "options": ["Flujo magnético y corriente", "Flujo eléctrico y carga encerrada", "Campo eléctrico y potencial", "Resistencia y voltaje"], "correct_answer": "Flujo eléctrico y carga encerrada"},
    {"text": "El flujo eléctrico a través de una superficie cerrada depende de...", "options": ["El tamaño de la superficie", "La forma de la superficie", "La carga neta encerrada", "El campo magnético externo"], "correct_answer": "La carga neta encerrada"},
    {"text": "La Ley de Gauss para el campo magnético implica que...", "options": ["Existen monopolos magnéticos", "El flujo magnético neto es siempre cero", "El campo magnético es conservativo", "Las cargas magnéticas se conservan"], "correct_answer": "El flujo magnético neto es siempre cero"},
    {"text": "¿Qué significa que el flujo magnético neto a través de una superficie cerrada sea cero?", "options": ["No hay campo magnético", "Las líneas de campo magnético son cerradas", "El campo es uniforme", "Hay cargas magnéticas dentro"], "correct_answer": "Las líneas de campo magnético son cerradas"},
    {"text": "La Ley de Ampère (original) relaciona la circulación del campo magnético con...", "options": ["La carga eléctrica encerrada", "El flujo eléctrico cambiante", "La corriente eléctrica encerrada", "La resistencia del circuito"], "correct_answer": "La corriente eléctrica encerrada"},
    {"text": "¿Qué modificación añadió Maxwell a la Ley de Ampère?", "options": ["Término de flujo eléctrico", "Término de corriente de desplazamiento", "Término de carga magnética", "Constante dieléctrica"], "correct_answer": "Término de corriente de desplazamiento"},
    {"text": "La Ley de Faraday describe el fenómeno de...", "options": ["Atracción electrostática", "Fuerza magnética sobre corrientes", "Inducción electromagnética", "Resistencia eléctrica"], "correct_answer": "Inducción electromagnética"},
    {"text": "Una FEM (fuerza electromotriz) se induce en un circuito si cambia...", "options": ["La resistencia del circuito", "El voltaje aplicado", "El flujo magnético a través del circuito", "La capacitancia"], "correct_answer": "El flujo magnético a través del circuito"},
    {"text": "El signo negativo en la Ley de Faraday se asocia con la Ley de...", "options": ["Ohm", "Lenz", "Gauss", "Coulomb"], "correct_answer": "Lenz"},
    {"text": "¿Cuántas ecuaciones fundamentales componen las Ecuaciones de Maxwell?", "options": ["Una", "Dos", "Tres", "Cuatro"], "correct_answer": "Cuatro"},
    {"text": "Las ecuaciones de Maxwell unifican los fenómenos...", "options": ["Gravitatorios y nucleares", "Eléctricos y magnéticos", "Ópticos y térmicos", "Químicos y biológicos"], "correct_answer": "Eléctricos y magnéticos"},
    {"text": "¿Cuál es la unidad de la corriente eléctrica?", "options": ["Voltio (V)", "Ohmio (Ω)", "Amperio (A)", "Coulomb (C)"], "correct_answer": "Amperio (A)"},
    {"text": "La Ley de Ohm establece una relación entre voltaje, corriente y...", "options": ["Capacitancia", "Inductancia", "Resistencia", "Potencia"], "correct_answer": "Resistencia"},
    {"text": "En una conexión de resistencias en serie, la resistencia total es...", "options": ["La suma de las resistencias", "El inverso de la suma de inversos", "El promedio de las resistencias", "La menor de las resistencias"], "correct_answer": "La suma de las resistencias"},
    {"text": "En una conexión de resistencias en paralelo, ¿qué magnitud es igual para todas?", "options": ["La corriente", "La resistencia", "La potencia disipada", "El voltaje"], "correct_answer": "El voltaje"},
    {"text": "La primera Ley de Kirchhoff (ley de nodos) se basa en la conservación de...", "options": ["La energía", "El momento", "La carga", "El flujo magnético"], "correct_answer": "La carga"},
    {"text": "La segunda Ley de Kirchhoff (ley de mallas) se basa en la conservación de...", "options": ["La carga", "La energía", "La masa", "La corriente"], "correct_answer": "La energía"},
    {"text": "¿Qué componente almacena energía en forma de campo eléctrico?", "options": ["Resistencia", "Inductor", "Capacitor", "Diodo"], "correct_answer": "Capacitor"},
    {"text": "La unidad de capacitancia es el...", "options": ["Faradio (F)", "Henrio (H)", "Tesla (T)", "Weber (Wb)"], "correct_answer": "Faradio (F)"},
    {"text": "La Fuerza de Lorentz actúa sobre...", "options": ["Cargas eléctricas en reposo", "Masas en un campo gravitatorio", "Cargas eléctricas en movimiento en campos E y/o B", "Conductores sin corriente"], "correct_answer": "Cargas eléctricas en movimiento en campos E y/o B"},
    {"text": "La parte magnética de la Fuerza de Lorentz es perpendicular a...", "options": ["El campo eléctrico", "La velocidad de la carga solamente", "El campo magnético solamente", "Tanto la velocidad como el campo magnético"], "correct_answer": "Tanto la velocidad como el campo magnético"},
    {"text": "Las ondas electromagnéticas consisten en oscilaciones de...", "options": ["Presión y densidad", "Campos eléctricos y magnéticos", "Temperatura y entropía", "Cuerdas y membranas"], "correct_answer": "Campos eléctricos y magnéticos"},
    {"text": "¿Cómo son los campos E y B en una onda electromagnética respecto a la dirección de propagación?", "options": ["Paralelos", "Perpendiculares", "Forman 45 grados", "Uno es paralelo y otro perpendicular"], "correct_answer": "Perpendiculares"},
    {"text": "¿Cuál de estas pertenece al espectro electromagnético?", "options": ["Ultrasonido", "Sonido audible", "Luz infrarroja", "Ondas sísmicas"], "correct_answer": "Luz infrarroja"},
    {"text": "Todas las ondas electromagnéticas en el vacío viajan a la velocidad de...", "options": ["El sonido", "La luz", "Depende de la frecuencia", "Depende de la amplitud"], "correct_answer": "La luz"},
    {"text": "¿Cuál es la unidad de carga eléctrica?", "options": ["Amperio (A)", "Voltio (V)", "Ohmio (Ω)", "Coulomb (C)"], "correct_answer": "Coulomb (C)"},
    {"text": "El campo eléctrico se mide en...", "options": ["Teslas (T)", "Newtons (N)", "Newtons por Coulomb (N/C)", "Joules (J)"], "correct_answer": "Newtons por Coulomb (N/C)"},
    {"text": "El campo magnético (B) se mide en...", "options": ["Webers (Wb)", "Faradios (F)", "Teslas (T)", "Henrios (H)"], "correct_answer": "Teslas (T)"},
    {"text": "Verdadero o Falso: Las cargas eléctricas del mismo signo se atraen.", "options": ["Verdadero", "Falso"], "correct_answer": "Falso"},
    {"text": "¿Qué ley relaciona voltaje y corriente en una resistencia?", "options": ["Ley de Gauss", "Ley de Faraday", "Ley de Ohm", "Ley de Ampère"], "correct_answer": "Ley de Ohm"}
];

const questions = QUESTIONS_POOL.sort(() => 0.5 - Math.random()).slice(0, 30);

let score = 0;
let currentPosition = 0;
let currentQuestionIndex = 0;
let playerName = ''; // Variable para guardar el nombre

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    questionPopup.classList.add('hidden');

    if (selectedOption === currentQuestion.correct_answer) {
        score++;
        playFeedbackVideo('assets/muy_bien.mp4');
    } else {
        playFeedbackVideo('assets/te_espero.mp4');
    }
    scoreDisplay.innerText = score;
}

function playFeedbackVideo(videoSrc) {
    feedbackPopup.classList.remove('hidden');
    feedbackVideo.src = videoSrc;
    feedbackVideo.play();
}

function showNextQuestion() {
    feedbackPopup.classList.add('hidden');
    currentQuestionIndex++;
    currentPosition++;
    
    if (currentQuestionIndex < questions.length) {
        positionDisplay.innerText = `${currentPosition} / 30`;
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
        button.onclick = () => checkAnswer(optionText);
        optionsContainer.appendChild(button);
    });

    if (questionIndex === questions.length - 1) {
        skipBtn.classList.add('hidden');
    } else {
        skipBtn.classList.remove('hidden');
    }

    questionPopup.classList.remove('hidden');
}

function playWelcomeVideo() {
    // AÑADIDO: Guardar el nombre y mostrarlo
    playerName = nameInput.value.trim() || 'Jugador Anónimo';
    playerNameDisplay.innerText = playerName;

    startBtn.classList.add('hidden');
    namePrompt.classList.add('hidden'); // Ocultamos el campo de nombre
    mainVideo.src = 'assets/welcome_video.mp4';
    mainVideo.controls = false;
    mainVideo.play();
    mainVideo.addEventListener('ended', startGame);
}

function startGame() {
    mainVideo.classList.add('hidden');
    infoBar.classList.remove('hidden');
    
    currentPosition = 1;
    positionDisplay.innerText = `${currentPosition} / 30`;
    showQuestion(0);
}

function skipToEnd() {
    questionPopup.classList.add('hidden');
    feedbackPopup.classList.add('hidden');
    
    currentQuestionIndex = questions.length - 1;
    currentPosition = questions.length;
    
    positionDisplay.innerText = `${currentPosition} / 30`;
    showQuestion(currentQuestionIndex);
}

function endGame() {
    infoBar.classList.add('hidden');

    let finalLevel = "";
    if (score >= 27) finalLevel = "Docente de IFD o CERP";
    else if (score >= 24) finalLevel = "Docente de Secundaria";
    else if (score >= 20) finalLevel = "Estudiante de IFD o CERP";
    else finalLevel = "Estudiante de Secundaria";
    
    // AÑADIDO: Mostrar el nombre del jugador en el mensaje final
    contentArea.innerHTML = `<p style="font-size: 1.5em;">¡Juego terminado, ${playerName}! Tu nivel es:<br><strong>${finalLevel}</strong></p>`;
    
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
startBtn.addEventListener('click', playWelcomeVideo);
feedbackVideo.addEventListener('ended', showNextQuestion);
skipBtn.addEventListener('click', skipToEnd);
playAgainBtn.addEventListener('click', () => {
    location.reload();
});