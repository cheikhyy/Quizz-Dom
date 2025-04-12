// Tableau d'objets représentant nos questions
const questions = [
    {
        question: "Que fait ce code ?\nconst element = document.getElementById('monElement');",
        options: [
            "Crée un nouvel élément avec l'ID 'monElement'",
            "Sélectionne l'élément HTML qui a l'ID 'monElement'",
            "Change l'ID de tous les éléments en 'monElement'",
            "Supprime l'élément avec l'ID 'monElement'"
        ],
        correctAnswer: 1,
        explanation: "getElementById() est une méthode qui cherche un élément par son attribut ID. 'monElement' est l'ID recherché. Le résultat est stocké dans la variable 'element'."
    },
    {
        question: "Que fait ce code ?\ndocument.querySelector('.maClasse').textContent = 'Bonjour';",
        options: [
            "Change le texte de tous les éléments avec la classe 'maClasse' en 'Bonjour'",
            "Change le texte du premier élément avec la classe 'maClasse' en 'Bonjour'",
            "Ajoute une nouvelle classe 'maClasse' à l'élément contenant 'Bonjour'",
            "Crée un nouvel élément avec la classe 'maClasse' et le texte 'Bonjour'"
        ],
        correctAnswer: 1,
        explanation: "querySelector() sélectionne le premier élément correspondant au sélecteur CSS. '.maClasse' cible les éléments avec class='maClasse'. textContent change le texte de l'élément."
    },
    {
        question: "Que fait ce code ?\nconst btn = document.getElementById('monBouton');\nbtn.addEventListener('click', function() {\n    alert('Bouton cliqué!');\n});",
        options: [
            "Crée un nouveau bouton avec un ID 'monBouton'",
            "Ajoute un message d'alerte quand la page se charge",
            "Exécute une fonction quand on clique sur le bouton",
            "Supprime le bouton quand on clique dessus"
        ],
        correctAnswer: 2,
        explanation: "addEventListener() ajoute un écouteur d'événement. 'click' est l'événement écouté. La fonction anonyme est exécutée lors du clic, affichant une alerte."
    },
    {
        question: "Que fait ce code ?\nconst newDiv = document.createElement('div');\nnewDiv.className = 'maDiv';\ndocument.body.appendChild(newDiv);",
        options: [
            "Supprime toutes les div de la page",
            "Crée une nouvelle div avec la classe 'maDiv' et l'ajoute au body",
            "Change la classe de toutes les div en 'maDiv'",
            "Sélectionne une div existante avec la classe 'maDiv'"
        ],
        correctAnswer: 1,
        explanation: "createElement() crée un nouvel élément HTML. className définit l'attribut class. appendChild() ajoute l'élément au DOM (comme dernier enfant du body)."
    },
    {
        question: "Que fait ce code ?\nconst element = document.getElementById('monElement');\nelement.style.backgroundColor = 'blue';",
        options: [
            "Change la couleur de texte en bleu",
            "Change la couleur d'arrière-plan en bleu",
            "Ajoute une classe 'blue' à l'élément",
            "Crée un nouvel élément avec fond bleu"
        ],
        correctAnswer: 1,
        explanation: "style donne accès aux styles CSS de l'élément. backgroundColor est la propriété CSS (en camelCase). La valeur 'blue' change la couleur d'arrière-plan."
    }
];

// Variables d'état
let currentQuestionIndex = 0;
let score = 0;

// Éléments DOM
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart');
const explanationContainer = document.getElementById('explanation');
const explanationText = document.getElementById('explanation-text');

// Fonction pour afficher une question
function showQuestion(questionObj) {
    // Crée le HTML pour la question
    const questionHTML = `
        <div class="question">
            <h3>Question ${currentQuestionIndex + 1}/${questions.length}</h3>
            <p>${questionObj.question}</p>
            <div class="options">
                ${questionObj.options.map((option, index) => `
                    <div class="option" data-index="${index}">${option}</div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Injecte le HTML dans le conteneur
    questionContainer.innerHTML = questionHTML;
    
    // Ajoute les écouteurs d'événements aux options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', selectAnswer);
    });
}

// Fonction pour gérer la sélection de réponse
function selectAnswer(e) {
    const selectedOption = e.target;
    const selectedIndex = parseInt(selectedOption.getAttribute('data-index'));
    const currentQuestion = questions[currentQuestionIndex];
    
    // Désactive tous les options pour éviter les clics multiples
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Vérifie si la réponse est correcte
    if (selectedIndex === currentQuestion.correctAnswer) {
        selectedOption.classList.add('correct');
        score++;
    } else {
        selectedOption.classList.add('incorrect');
        // Met aussi en évidence la bonne réponse
        options[currentQuestion.correctAnswer].classList.add('correct');
    }
    
    // Affiche l'explication
    explanationText.textContent = currentQuestion.explanation;
    explanationContainer.classList.remove('hidden');
    
    // Passe à la question suivante après un délai
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
            explanationContainer.classList.add('hidden');
        } else {
            showResult();
        }
    }, 6000);
}

// Fonction pour afficher le résultat final
function showResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.textContent = `Score: ${score}/${questions.length}`;
}

// Fonction pour redémarrer le quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    explanationContainer.classList.add('hidden');
    showQuestion(questions[0]);
}

// Écouteur d'événement pour le bouton restart
restartButton.addEventListener('click', restartQuiz);

// Démarre le quiz
showQuestion(questions[0]);