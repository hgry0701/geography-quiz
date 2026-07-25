let quiz = [];
let current = 0;
let score = 0;
let wrongQuestions = [];
let timer;
let timeLeft = 30;

function shuffle(array){
    const arr = [...array];
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function startQuiz(){

    // 20問ランダム（20問未満なら全部）
    quiz = shuffle(questions).slice(0,20);

    if(questions.length < 20){
        quiz = shuffle(questions);
    }

    current = 0;
    score = 0;
    wrongQuestions = [];

    document.getElementById("start").style.display = "none";
    document.getElementById("finish").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    showQuestion();
}

function showQuestion(){

    clearInterval(timer);

    timeLeft = 30;

    const q = quiz[current];

    document.getElementById("question").innerHTML =
    `問題 ${current+1} / ${quiz.length}<br><br>${q.question}<br><br>⏱️ <span id="time">${timeLeft}</span> 秒`;

    const area = document.getElementById("choices");
    area.innerHTML = "";

    q.choices.forEach((choice,index)=>{

        const btn = document.createElement("button");

        btn.className = "choice";

        btn.textContent = choice;

        btn.onclick = ()=>answer(index);

        area.appendChild(btn);

    });

    timer = setInterval(updateTimer,1000);

}
