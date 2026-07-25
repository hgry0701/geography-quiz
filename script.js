let quiz = [];
let current = 0;
let score = 0;

function shuffle(array){
    return [...array].sort(()=>Math.random()-0.5);
}

function startQuiz(){

    quiz = shuffle(questions).slice(0,20);

    // 問題数が20未満なら全部使う
    if(questions.length < 20){
        quiz = shuffle(questions);
    }

    current = 0;
    score = 0;

    document.getElementById("start").style.display="none";
    document.getElementById("quiz").style.display="block";

    showQuestion();
}

function showQuestion(){

    const q = quiz[current];

    document.getElementById("question").textContent =
    `問題 ${current+1} / ${quiz.length}\n${q.question}`;

    const choices = document.getElementById("choices");
    choices.innerHTML="";

    q.choices.forEach((choice,index)=>{

        const btn=document.createElement("button");

        btn.className="choice";

        btn.textContent=choice;

        btn.onclick=()=>answer(index);

        choices.appendChild(btn);

    });

}

function answer(index){

    if(index===quiz[current].answer){
        score++;
    }

    current++;

    if(current>=quiz.length){

        document.getElementById("quiz").style.display="none";
        document.getElementById("finish").style.display="block";

        const rate=Math.round(score/quiz.length*100);

        document.getElementById("result").innerHTML=
        `
        正解数：${score} / ${quiz.length}<br><br>
        正答率：${rate}%
        `;

        return;
    }

    showQuestion();

}
