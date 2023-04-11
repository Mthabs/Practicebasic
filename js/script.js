
//selecting all required elements
const start_quiz = document.querySelector(".home_page button");
const instructions = document.querySelector(".instructions");
/*buttons*/
const exit_btn = instructions.querySelector(".buttons .exit_quiz");
const continue_btn = instructions.querySelector(".buttons .restart");
/*Quiz*/
const quiz_page = document.querySelector(".quiz_page");
const timeText = document.querySelector(".clock .show-time");
const timeCount = document.querySelector(".clock .count_down");
const time_line = document.querySelector("header .time_line");
const option_list = document.querySelector(".option_list");
/*result*/ 
const results_page = document.querySelector(".results_page");


// if startQuiz button clicked
start_quiz.onclick = ()=>{
    instructions.classList.add("activeInfo"); //display instruction page
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    instructions.classList.remove("activeInfo"); //hide instruction page
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    instructions.classList.remove("activeInfo"); //hide instruction page
    quiz_page.classList.add("activeQuiz"); //display quiz page
    displayquestions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(99); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}
let length = 0;
let allocated_time =  99;
let participscore = 0;
let question_index = 0;
let questionNo = 1;
let counter;
let counterLine;


const restart_quiz = results_page.querySelector(".buttons .restart");
const exitquiz = results_page.querySelector(".buttons .exit_quiz");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_page.classList.add("activeQuiz"); //display quiz page
    results_page.classList.remove("activeResult"); //hide result page
    participscore = 0;
    allocated_time = 99; 
    questionNo = 1;
    question_index = 0;
    length = 0;
    displayquestions(question_index); //calling showQestions function
    queCounter(questionNo); //passing questionNo value to queCounter
    startTimer(allocated_time); //calling startTimer function
    startTimerLine(length); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_button.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
exitquiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_button = document.querySelector("footer .next_button");
const bottom_ques_counter = document.querySelector("header .sum_qstn");

// if Next Que button clicked
next_button.onclick = ()=>{
    if(question_index < questions.length - 1){ //if question count is less than total question length
        questionNo++;//increment the questionNo value
        question_index++; //increment the question_index value
        queCounter(questionNo); //passing questionNo value to queCounter
        displayquestions(question_index); //calling showQestions function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_button.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        displayresult(); //calling displayresult function 
    }
}

// getting questions and options from array
function displayquestions(index){
    const questiontxt = document.querySelector(".questionz");

    //creating a new span and div tag for question and option and passing the value using array index
    let questiontag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let optiontag = '<div class="option">'+ questions[index].options[0] +'</div>'
    + '<div class="option">'+ questions[index].options[1] +'</div>'
    + '<div class="option">'+ questions[index].options[2] +'</div>'
    + '<div class="option">'+ questions[index].options[3] +'</div>';
    questiontxt.innerHTML = questiontag; //adding new span tag inside questiontag
    option_list.innerHTML = optiontag; //adding new div tag inside optiontag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "clickedoption(this)");
    }
}

//if user clicked on option
function clickedoption(answer){

    let particanswers = answer.textContent; //getting user selected option
    let correctanswers = questions[question_index].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(particanswers == correctanswers){ //if user selected option is equal to array's correct answer
        participscore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        console.log("Your correct answers = " + participscore); 
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        console.log("Wrong Answer =" + participscore)
    }
    
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_button.classList.add("show"); //display the next button if user selected any option
}

function displayresult(){
    instructions.classList.remove("activeInfo"); //hide instruction page
    quiz_page.classList.remove("activeQuiz"); //hide quiz page
    results_page.classList.add("activeResult"); //display result box
    const scoreText = results_page.querySelector(".score_text");
    if (participscore > 8){ // if user scored more than 8
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Congratulations!!!, You got <p>'+ participscore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(participscore > 4){ // if user scored more than 4
        let scoreTag = '<span>Nice!!!, You got <p>'+ participscore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 5
        let scoreTag = '<span>Unfortunately, You got only <p>'+ participscore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
      
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            clearInterval(counterLine); //clear counterLine
         
            
            const allOptions = option_list.children.length; //getting all option items
        
            let correctanswers = questions[question_index].answer; //getting correct answer from array
            
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctanswers){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option 
                }
            }
        
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
           
            displayresult();
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 183);
    function timer(){
        time += 1; //incrementing time with 1
        timeline.style.length = time + "px"; //increasing length of time_line with px by time value
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let No_ofquestios = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = No_ofquestios;  //adding new span tag inside bottom_ques_counter
}