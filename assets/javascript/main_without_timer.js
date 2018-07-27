

var examArray = [];
var index = 0; // used to display question in the dom
var tempGameArray = []; // used to push each answer after it is asked with users answer
var lengthOfQuiz;
var allAnswersArray = []; // array containing all relevant answers to choose from
var selected;  // assigned var on answer submit
var haveSelected = false;  // state for making sure they selected an answer
var missedAnswerArray = []; // array to push the incorrect answers
var randomAnswersArray = []; // used to select 3 "incorrect answers for each question"

//==== answer value from radio buttons in quiz ===

function radioBtnVal(x) {
    $("#display-selected").text(x);
    selected = x;
    // console.log(selected);
    haveSelected = true;
};

//===============================================

$(document).ready(function () {
    $(".welcome").show()
    $(".quiz-screen").hide();
    $(".result-screen").hide();

    //===== function to shuffle questions ====

    function selectQuizShuffle(arr) {
        for (i = 0; i < arr.lenght; i++) {
            examArray.push(arr[i]);
        };
        examArray.sort(function (a, b) { return 0.5 - Math.random() });
    };

    //===========================================


    //======== on click begin quiz=======
    $("#application-quiz-submit").on("click", function () {

        var y = $("#application-quiz-select").val();
        console.log("this is selected: " + y);
        if (y === "html") {
            lengthOfQuiz = htmlQuiz.length;
            examArray = htmlQuiz;
            selectQuizShuffle(htmlQuiz);
            displayQuestion(index, examArray);
        } else if (y === "css") {
            lengthOfQuiz = cssQuiz.length;
            examArray = cssQuiz;
            selectQuizShuffle(cssQuiz);
            displayQuestion(index, cssQuiz);
        } else if (y === "javascript") {
            lengthOfQuiz = javascriptQuiz.length;
            examArray = javascriptQuiz;
            selectQuizShuffle(javascriptQuiz);
            displayQuestion(index, javacsriptQuiz);
        };

        $(".welcome").hide()
        $(".quiz-screen").show();
    });

    //=============================================

    //===== function to display questions in the dom =====
    function displayQuestion(i, inputArray) {

        var x = inputArray[i];
        console.log("question: " + x.question);
        console.log("this is the answer: " + x.correctAnswer);
        console.log("these are the choices: " + x.incorrectAnswers);
        $(".display-question-area").text(x.question);

        // push the question and correct answer to the temp object
        var objectForArray = new Object();
        objectForArray.question = x.question;
        objectForArray.correctAnswer = x.correctAnswer;
        tempGameArray.push(objectForArray);

        // display the answers in dom
        for (var i = 0; i < 4; i++) {
            var answers = x.incorrectAnswers[i];
            $("#selection-area").append("<input type='radio' class='radio-button' onclick='radioBtnVal(this.value)' name='questions' value='" + answers + "' text='" + answers + "'>").append("<span class='rbanswer'> " + answers + "</span>").append("<br>");
        };
    };
    //====== end of function to display answers in the dom =====

    //======= on click to submit your answer ============
    $("#submit-button").on("click", function () {
        if (haveSelected) {
            haveSelected = false;
            $("#display-selected").empty();
            // console.log("this is selected: " + selected);

            // push the selected answer to the tempArray
            tempGameArray[index].selectedAnswer = selected;
            console.log("this is the temp game array");
            console.log(tempGameArray);
            console.log("==================");
            //==================================

            if (tempGameArray.length === lengthOfQuiz) {
                alert("checking answers")
                $(".quiz-screen").hide()
                $(".result-screen").show()

                checkAnswers();
            } else {
                //==================================
                // empty the radio button area
                // increase index++
                // call displayQuestion()
                index++;
                $("#selection-area").empty();
                displayQuestion(index, examArray);
            };

        } else {
            alert("Please make a selection");
        };
    });
    //===================================================


    //===== function for checking answers ========
    function checkAnswers() {

        for (var i = 0; i < tempGameArray.length; i++) {

            // console.log("this is tempgamearray " + tempGameArray[i].correctAnswer);
            // console.log("this is tempgamearray " + tempGameArray[i].selectedAnswer);
            if (tempGameArray[i].selectedAnswer !== tempGameArray[i].correctAnswer) {
                var wrongObj = new Object();
                wrongObj.question = tempGameArray[i].question;
                wrongObj.correctAnswer = tempGameArray[i].correctAnswer;
                wrongObj.selectedAnswer = tempGameArray[i].selectedAnswer;
                missedAnswerArray.push(wrongObj);
            }
        };
        // console.log(missedAnswerArray);
        $(".quiz-screen").hide();
        $(".result-screen").show();
        results();

    };
    //=====================================

    //===== function to display results ====
    function results() {
        if (missedAnswerArray.length === 0) {
            $(".grade").text("100%").addClass("correct text-center");

            var correct = $("<div>");
            correct.addClass("all-correct text-center").text("Well Done!");
            $(".display-results").append(correct);
        } else {

            for (var i = 0; i < missedAnswerArray.length; i++) {
                var questionDiv = $("<div>").attr("class", "result-question");
                questionDiv.text("Code: " + missedAnswerArray[i].question);
                var correctDiv = $("<div>").attr("class", "result-correct-answer");
                correctDiv.text("Correct Answer: " + missedAnswerArray[i].correctAnswer);
                var userSelectedDiv = $("<span>").attr("class", "result-selected-answer-title");
                userSelectedDiv.text("Your Answer: ");
                var userAnswer = $("<span>").attr("class", "result-selected-answer");
                userAnswer.text(missedAnswerArray[i].selectedAnswer);
                userSelectedDiv.append(userAnswer);
                var lineSpace = $("<br><hr>");

                $(".display-results").append(questionDiv).append(correctDiv).append(userSelectedDiv).append(lineSpace);
            };

            var grade = 100 - (Math.floor((missedAnswerArray.length / examArray.length) * 100));
            console.log("this is grade: " + grade + "%");

            $(".grade").text("You scored " + grade + "%");
        };

        $("#reset").on("click", function () {
            reset();
        });
    };
    //=============================================

    //====== function to reset ========
    function reset() {

        examArray = [];
        index = 0;
        tempGameArray = [];
        lengthOfQuiz;
        allAnswersArray = [];
        selected;
        haveSelected = false;
        missedAnswerArray = [];
        randomAnswersArray = [];

        $(".display-question").empty();
        $("#display-selected").empty();
        $("#selection-area").empty();
        $(".display-results").empty();

        $(".welcome").show();
        $(".quiz-screen").hide();
        $(".result-screen").hide();

    };

});  // end of document ready


