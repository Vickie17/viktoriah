
const questionText=document.querySelector(".question_text");
const optionBox=document.querySelector(".option_box");
const currentQuestionNumber=document.querySelector(".current_question_number");
const nextQuestionButton=document.querySelector(".next_question_btn");
const correctAnswers=document.querySelector(".correct_ans");
const resultButton=document.querySelector(".view_result_btn");
const quizHome=document.querySelector(".quiz_home");
const quizBox=document.querySelector(".quiz_box");
const quizOverBox=document.querySelector(".quiz_over");
const startQuizButton=document.querySelector(".start_quiz_btn")
let questionIndex=0;
let number=0;
let score=0;

// Questions and Options and Answer
// array of object
quizApp=[
         {
           question:"What is the capital of Senegal",
           options:["Abuja","Lome","Dakar","Juba"],
           answer:2  
         },
         {
           question:"Rice is to Oryza sativa,Cassava is to .......",
           options:["Manihot esculenta","Mangifera indica","Carica papaya","Zea mays"],
           answer:0  
         },
         {
           question:"Which of these is not a type of functional test",
           options:["Smoke Testing ","Install Testing","System Testing","Sanity Testing"],
           answer:1
         },
         {
           question:"Who is the author of Things Fall Apart",
           options:["Williams Shakespeare","Wole Soyinka","Chimamanda Adichie","Chinua Achebe"],
           answer:3   
         },
         {
           question:"Nigeria became a republic in what year",
           options:["1960","1963","1979","1983"],
           answer:1   
         }

        ]
function load(){
    number++;
    questionText.innerHTML=quizApp[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNumber.innerHTML=number + " / " + quizApp.length;
}

function createOptions(){
    optionBox.innerHTML="";
    for(let i=0; i<quizApp[questionIndex].options.length; i++){
      const option=document.createElement("div");
            option.innerHTML=quizApp[questionIndex].options[i];
            option.classList.add("option");
            option.id=i;
            option.setAttribute("onclick","check(this)");
            optionBox.appendChild(option);
    }
}

function check(ele){
    const id=ele.id;
    if(id==quizApp[questionIndex].answer){
        ele.classList.add("correct");
        score++;
        scoreBoard();
    }
    else{
        ele.classList.add("wrong");
        //show correct option after the wrong answer is clicked
        for(let i=0; i<optionBox.children.length; i++){
            if(optionBox.children[i].id==quizApp[questionIndex].answer){
                optionBox.children[i].classList.add("show-correct");
            }
        }
    }
    disableOptions()
    showNextQuestionButton();

    if(number == quizApp.length){
        quizOver();
    }
}

function disableOptions(){
    for(let i=0; i<optionBox.children.length; i++){
        optionBox.children[i].classList.add("already_answered");
    }
}

function showNextQuestionButton(){
    nextQuestionButton.classList.add("show");
}
function hideNextQuestionButton(){
    nextQuestionButton.classList.remove("show");
}

function scoreBoard(){
    correctAnswers.innerHTML=score;
}

nextQuestionButton.addEventListener("click",nextQuestion);

function nextQuestion(){
    questionIndex++;
    load();
    hideNextQuestionButton();
}

function quizResult(){
    document.querySelector(".total_questions").innerHTML=quizApp.length;
    document.querySelector(".total_correct").innerHTML=score;
    const percentage=(score/quizApp.length)*100;
    document.querySelector(".percentage").innerHTML=percentage.toFixed(2) +"%";
}


function quizOver(){
    nextQuestionButton.classList.remove("show");
    resultButton.classList.add("show");
}
resultButton.addEventListener("click",()=>{
    quizBox.style.display="none";
    
    resultButton.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResult();
})

startQuizButton.addEventListener("click",()=>{
    quizHome.classList.remove("show");
    quizBox.classList.add("show");
    
})

onload=()=>{
    load();
}
