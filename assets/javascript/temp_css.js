

 $(".welcome").hide()
 $(".quiz-screen").hide();
 $(".result-screen").show();

 for (var i = 0; i < 2; i++) {
    var questionDiv = $("<div>").attr("class", "result-question");
    questionDiv.text("Question: " + "What is the question");
    var correctDiv = $("<div>").attr("class", "result-correct-answer");
    correctDiv.text("Correct Answer: " + "this is the correct one");
    var userSelectedDiv = $("<span>").attr("class", "result-selected-answer-title");
    userSelectedDiv.text("Your Answer: ");
    var userAnswer = $("<span>").attr("class", "result-selected-answer");
    userAnswer.text("i selected this one");
    userSelectedDiv.append(userAnswer);

    var lineSpace = $("<br><hr>");


    // questionDiv.append(correctDiv).append(userSelectedDiv);
    $(".display-results").append(questionDiv).append(correctDiv).append(userSelectedDiv).append(lineSpace);
};

$(".grade").text("You scored " +"67"+ "%");