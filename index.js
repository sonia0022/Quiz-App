const questions = [
    {
        number: 1,
        question: 'HTML stands for?',
        answer: 'Hyper Text Markup Lang',
        options: [
            'Home Tool Markup Lang',
            'Hyper Text Markup Lang',
            'Hyperlinks and Text Markup Lang',
            'Home Tool Markup Lang'
        ]
    },
    {
        number: 2,
        question: "Which programming language is used for client-side scripting?",
        answer: "JavaScript",
        options: [
            "Java",
            "Python",
            "JavaScript",
            "C++"
        ]
    },
    {
        number: 3,
        question: "What is the purpose of CSS?",
        answer: "Cascading Style Sheets",
        options: [
            "Cascading Style Sheets",
            "Creating Stylish Sites",
            "Crazy Style Sheets",
            "Creative Style Sheets"
        ]
    },
    {
        number: 4,
        question: "What is the difference between null and undefined?",
        answer: "null is an empty object, undefined is an uninitialized variable",
        options: [
            "null is an empty object, undefined is an uninitialized variable",
            "null is an uninitialized variable, undefined is an empty object",
            "null and undefined are the same",
            "null is a number, undefined is a string"
        ]
    },
    {
        number: 5,
        question: "What is the purpose of the var keyword in JavaScript?",
        answer: "To declare a variable",
        options: [
            "To declare a constant",
            "To declare a function",
            "To declare a variable",
            "To declare a class"
        ]
    }
]

let mainWrapper = document.querySelector(".main-wrapper");
let container = mainWrapper.querySelector(".container")
let startQuizBtn = mainWrapper.querySelector(".start-quiz-btn")
let quesBox = container.querySelector(".ques-box")
let optionBox = container.querySelector(".option-box")
let nextQuesBtn = container.querySelector(".next-ques-btn")
let noOfQues = container.querySelector(".quiz-top-bar .no-of-question")
let timerLine = container.querySelector(".quiz-top-bar .timer-progress-bar")
let result  = document.querySelector(".result-box")
let replay  = result.querySelector(".replay-quiz-btn")

let quesIndex = 0
let quesCount = 0
let score     = 0

let correctIcon = 
            `<div class="icon correct-icon">
                <i class="fa-solid fa-check"></i>
            </div>`
let wrongIcon = 
            `<div class="icon wrong-icon">
                <i class="fa-solid fa-xmark"></i>
            </div>`

startQuizBtn.addEventListener("click", () => {

    // hide start btn and show quiz container
    startQuizBtn.style.display = 'none'
    container.style.display = 'block'

    noOfQuestion();
    startQuiz();
    updateTimerLine(0);
})

// /func to start the quiz
let startQuiz = () => {
    // Create question HTML
    let ques = `<h3> ${questions[quesIndex].number}.  ${questions[quesIndex].question}</h3>`

    // Create options for the questions 
    let quizOptions =
        `<div class="option">
            <div class="option-num-lett">A</div>
            <span class="option-text">${questions[quesIndex].options[0]}</span>
        </div>
        <div class="option">
            <div class="option-num-lett">B</div>
            <span class="option-text">${questions[quesIndex].options[1]}</span>
        </div>
        <div class="option">
            <div class="option-num-lett">C</div>
            <span class="option-text">${questions[quesIndex].options[2]}</span>
        </div>
        <div class="option">
            <div class="option-num-lett">D</div>
            <span class="option-text">${questions[quesIndex].options[3]}</span>
        </div>
        `       

    // Set question 
    quesBox.innerHTML = ques;

    // Set Options
    optionBox.innerHTML = quizOptions;

    // Select all the option
    let options = optionBox.querySelectorAll(".option")

    // Add event listener to each option
    for(let i = 0 ; i < options.length ; i++){
        options[i].setAttribute("onclick","optionSelect(this)")
    }
}

// Function to handle option selection
let optionSelect = (userAns) => {

    clearInterval(countLine)

    let userAnswer = userAns.querySelector("span").textContent;
    let correctAnswer = questions[quesIndex].answer

    // Check if user answer is correct or not
    if(userAnswer === correctAnswer){
        score++;
        userAns.classList.add("correct")
        userAns.insertAdjacentHTML("beforeend" , correctIcon)
    } else{
        userAns.classList.add("incorrect")
        userAns.insertAdjacentHTML("beforeend" , wrongIcon)
    }

    let allOptionTxt = optionBox.querySelectorAll("div span")
    
    // Loop through each option text element 
    for(let i = 0 ; i < allOptionTxt.length ; i++){
        if(allOptionTxt[i] .textContent === correctAnswer){
            allOptionTxt[i].parentElement.classList.add("correct")
            allOptionTxt[i].parentElement.insertAdjacentHTML("beforeend", correctIcon)
        }
    }
    
    // Disable all option after selecting
    let allOption = optionBox.children.length;
    for(let i = 0 ; i < allOption ; i++){
        optionBox.children[i].classList.add("disabled")
    }

    // Enable next question btn 
        nextQuesBtn.style.pointerEvents  = "auto"

}


nextQuesBtn.addEventListener("click" , ()=>{
    if(quesCount < questions.length-1){
        quesCount++  //Increament question count
        quesIndex++ // Increament questtion index

        noOfQuestion();
        startQuiz();
        clearInterval(countLine)
        updateTimerLine(0);

        // Disable next question btn temporarily
        nextQuesBtn.style.pointerEvents = "none"
    }else{
        showResult()
    }
})

let noOfQuestion = () => {
    noOfQues.innerHTML = `${questions[quesIndex].number} of ${questions.length} Question`
}

let updateTimerLine = (time)=>{
    countLine = setInterval(()=>{
        time += 1;
        timerLine.style.width = time + "px"

        if(timerLine > 359){
            clearInterval(countLine)
        }
    }, 83)
}

let showResult = () => {
    container.style.display = "none"
    result.style.display    = "block"

    // display the score
    let scoreBox = document.querySelector(".score");
    if(score > 3){
        let scoreTxt = `<span>Congrats! You scored ${score} out of ${questions.length} &#x1F525;</span>`
        scoreBox.innerHTML = scoreTxt
    }else if (score > 1){
        let scoreTxt = `<span>Nice! You scored ${score} out of ${questions.length} &#x1F525;</span>`
        scoreBox.innerHTML = scoreTxt
    }else{
        let scoreTxt = `<span>Sorry! You scored ${score} out of ${questions.length} &#x1F525;</span>`
        scoreBox.innerHTML = scoreTxt
    }
}

replay.addEventListener("click", ()=>{
    location.reload()
})