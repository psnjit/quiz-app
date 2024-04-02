const data=
    [
        {
            question: "What is the capital of India?",
            options: [
                {text: "Delhi", correct: "wrong"},
                {text: "Mumbai", correct: "wrong"}, 
                {text: "New Delhi", correct: "right"}, 
                {text: "Hyderabad", correct: "wrong"}, 
            ]
        },
        {
            question: "What comes after May?",
            options: [
                {text: "June", correct: "right"},
                {text: "April", correct: "wrong"}, 
                {text: "September", correct: "wrong"}, 
                {text: "July", correct: "wrong"}, 
            ]
        },
        {
            question: "What is the pin code of Hafeezpet?",
            options: [
                {text: "500048", correct: "wrong"},
                {text: "500049", correct: "right"}, 
                {text: "500050", correct: "wrong"}, 
                {text: "500051", correct: "wrong"},
            ]
        },
    ];

let index=0;
let result=0;
let answered= false;
const numberOfQuestion= data.length;

function onOptionClick(Event){
    answered=true;
    Event.stopPropagation();
    const nextButton=document.getElementById("next");
    console.log(nextButton);
    nextButton.classList.remove("hide");
    const clickedOption= Event.target;
    if(clickedOption.id==='right'){
        result++;
        clickedOption.classList.add("rightoption");
        console.log(`Correct op clicked ${clickedOption.classList}`);
    }
    else {
        console.log("Wrong clicked");
        clickedOption.classList.add("wrongoption");
        let parentElement = clickedOption.parentNode;
        console.log(parentElement);
        let childElements= parentElement.childNodes;
        for (let childElement of childElements) {
            if(childElement.id==="right")
                childElement.classList.add("rightoption");
        }
    }
}

function onNextButtonClick(){
    showQuiz();
    answered=false;
}
function showResult(){
    const question=document.getElementById("quesion");
}
function showQuiz() {
    const question=document.getElementById("quesion");
    const answerButtons= document.getElementById("answer-buttons");
    let optionsElement=document.getElementById("options");
    answerButtons.removeChild(optionsElement);

    if(index<numberOfQuestion){
        currentData=data[index];
        question.textContent=currentData.question;
        optionsElement=document.createElement("div");
        optionsElement.id="options";

        currentData.options.map((option)=>{
            const button=document.createElement("button");
            button.classList.add('btn');
            button.innerText=option.text;
            button.id=option.correct;
            optionsElement.appendChild(button);
            button.addEventListener('click', function(Event){
                if(answered===true)
                    return;
                onOptionClick(Event);});
        })
        answerButtons.appendChild(optionsElement);
        const nextButton=document.getElementById("next");
        nextButton.classList.add("hide");
        if(index===numberOfQuestion-1)
            nextButton.textContent="Show Result"
        index++;
    }
    else {
        question.remove();
        const resultDiv=document.createElement("div");
        resultDiv.textContent=`You answered ${result} out of ${numberOfQuestion} correctly.`;
        answerButtons.appendChild(resultDiv);
        const nextButton=document.getElementById("next");
        nextButton.remove();
    }
}

showQuiz();