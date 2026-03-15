const quizData = [
    { question: "1) Em que área e em qual instituição a Alice está se formando?",
        options: ["Medicina - ESTÁCIO", "Análise e Desenvolvimento de Sistemas - UNISUAM", "Administração - UFRJ"],
        answer: 1,
        correctMsg: "Isso aí! Alice está construindo sua carreira em tecnologia na UNISUAM.",
        errorMsg: "Quase! Dica: ela vive com o VS Code aberto…"
    },
    {
        question: "2) Qual situação fez a Alice assumir responsabilidades muito cedo?",
        options: [
            "Mudança de país",
            "Ser filha única",
            "Cuidar da casa e da família quando a sua mãe adoeceu"
        ],
        answer: 2,
        correctMsg: "Isso! Ela segurou firme pela família e seguiu estudando.",
        errorMsg: "Não foi essa… tente outra!"
    },
    {
        question: "3) Como a Alice conquistou 100% de bolsa na universidade?",
        options: [
            "Sorteio",
            "Estudando muito de dia enquanto trabalhava como garçonete à noite",
            "Jogando no bicho (😅 brincadeira)"
        ],
        answer: 1,
        correctMsg: "Exatamente! Muito esforço e dedicação.",
        errorMsg: "Não! Essa conquista veio de muito esforço."
    },
    {
        question: "4) O que mais define minha trajetória na tecnologia?",
        options: ["Curiosidade", "Resiliência", "Aprendizado autodidata"],
        answer: 1,
        correctMsg: "Sim! Ela não desiste, aprende e recomeça.",
        errorMsg: "Poderia ser, mas pense em 'força'."
    },
    {
        question: "5) Além das habilidades técnicas em Dev, qual o nível de proficiência da Alice no idioma Inglês?",
        options: ["Básico", "Intermediário", "Fluente"],
        answer: 1,
        correctMsg: "Correto! Com inglês intermediário, ela consegue consultar documentações técnicas e se comunicar em ambientes globais.",
        errorMsg: "Quase! A Alice já possui nível intermediário, essencial para a área de tecnologia."
    },
    {
        question: "6) Além de Web, a Alice tem experiência em Mobile. Qual dessas ferramentas ela já utilizou?",
        options: ["Ionic, React e Android Studio", "Apenas montagem de PCs", "Design de Logotipos"],
        answer: 0,
        correctMsg: "Correto! Ela entende de tecnologias modernas.",
        errorMsg: "Tente de novo! A Alice usa frameworks."
    },
    {
        question: "7) Qual dessas plataformas Alice também usou para estudar programação?",
        options: ["Coursera", "Alura", "Senai"],
        answer: 1,
        correctMsg: "Correto! Essas foram aulas com foco em atividades práticas e soluções corporativas.",
        errorMsg: "Não foi essa! A Alice já passou pela maior escola online de tecnologia do Brasil."
    },
    {
        question: "8) Além do ambiente universitário, como a Alice adquiriu grande parte do seu conhecimento técnico?",
        options: [
            "Apenas na escola",
            "Estudos práticos, projetos pessoais e cursos online",
            "Observando amigos"
        ],
        answer: 1,
        correctMsg: "Certíssimo! Ela é autodidata também.",
        errorMsg: "Não foi essa! Ela cresceu muito praticando."
    },
    {
        question: "9) A Alice possui competência para atuar em quais frentes de uma aplicação Web?",
        options: ["Apenas no visual (Front-end)", "Apenas no servidor (Back-end)", "Na estruturação completa (Front e Back-end)"],
        answer: 2,
        correctMsg: "Exato! A Alice domina a estruturação de ponta a ponta, Full Stack!",
        errorMsg: "Na verdade, o diferencial da Alice é entender as duas frentes: Front e Back-end!"
    },
    {
        question: "10) Com base em suas competências, qual é o foco de carreira atual da Alice?",
        options: [
            "Trabalhar exclusivamente com design gráfico",
            "Ingressar como estagiária em desenvolvimento e evoluir na área de tecnologia",
            "Atuar na área administrativa de empresas"
        ],
        answer: 1,
        correctMsg: "Exatamente! A Alice está pronta para aplicar seus conhecimentos em projetos reais e crescer no time de tecnologia.",
        errorMsg: "Não é essa! O foco dela é na área de tecnologia."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function startQuiz() {
    score = 0;
    currentQuestion = 0;

    document.getElementById("startBtn").style.display = "none";
    document.getElementById("restartBtn").style.display = "none";
    document.getElementById("linkedinBtn").style.display = "none";
    document.getElementById("githubBtn").style.display = "none";
    document.getElementById("portfolioBtn").style.display = "none";
    document.getElementById("progress").style.display = "block";
    document.getElementById("progressBar").style.display = "block";
    document.getElementById("title").innerHTML = "Quiz Decode Alice Eduarda:<br>O futuro do seu time! 🖥️";

    loadQuestion();
}

function updateProgressBar() {
    const progressPercent = ((currentQuestion) / quizData.length) * 100;
    document.getElementById("progressFill").style.width = progressPercent + "%";
}

function loadQuestion() {
    answered = false;

    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("finalMessage").innerHTML = "";

    document.getElementById("progress").innerText =
        "Pergunta " + (currentQuestion + 1) + " / " + quizData.length;

    updateProgressBar();

    const q = quizData[currentQuestion];
    if (currentQuestion === quizData.length - 1) {
        document.getElementById("nextBtn").innerText = "Finalizar";
    } else {
        document.getElementById("nextBtn").innerText = "Próxima Pergunta";
    }

    document.getElementById("question").innerHTML = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("div");
        btn.classList.add("option");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(btn, index);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(btn, selected) {
    if (answered) return;
    answered = true;

    const q = quizData[currentQuestion];
    const options = document.querySelectorAll(".option");

    options.forEach((o, index) => {
        o.style.pointerEvents = "none";

        if (index === q.answer) {
            o.classList.add("correct");
        }
    });

    if (selected === q.answer) {
        score++;
        document.getElementById("feedback").innerText = q.correctMsg;
    } else {
        btn.classList.add("wrong");
        document.getElementById("feedback").innerText = q.errorMsg;
    }

    document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    document.getElementById("title").innerText = "Quiz Finalizado!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("progress").style.display = "none";
    document.getElementById("progressFill").style.width = "100%";

    let finalMsg = "";

    if (score >= 5) {
        finalMsg =
            `Você acertou ${score} de ${quizData.length}!  
            Agora você conhece um pouco mais sobre essa desenvolvedora, obrigada por jogar!
            Visite também meu LinkedIn e Github:`;
    } else {
        finalMsg =
            `Você acertou ${score} de ${quizData.length}.  
           Está quase lá! Obrigada por jogar, tente novamente ou visite meu LinkedIn e Github:`;
    }

    document.getElementById("question").innerHTML = "";
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("finalMessage").innerHTML = finalMsg;

    document.getElementById("linkedinBtn").style.display = "block";
    document.getElementById("githubBtn").style.display = "block";
    document.getElementById("portfolioBtn").style.display = "block";
    document.getElementById("restartBtn").style.display = "block";
}

function restartQuiz() {
    startQuiz();
}