var recordResponse = function(state, score) {
  state.record.push(score);
};

var renderQuestion = function(state, element) {
  var questionHTML = '<li>' + state.questions[state.index][0] + '</li>';
  element.html(questionHTML);
}

var renderAnswers = function(state, element) {
  var answersHTML = state.questions[state.index].slice(1,5).map(function(answer) {
    return '<li>' + answer + '</li>';
  });
  // identify correct answer
  answersHTML[0] = answersHTML[0].replace(/<.*?>/, "<li class='correct'>");
  element.html(answersHTML);
};

function randomizeAnswers() {
  var ul = document.querySelector('.quiz-answers');
  for (var i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[Math.random() * i | 0]);
  }
};

function evaluateResponse(responseClass) {

  if(responseClass == "correct") {
    state.record.push(1);
    return true;
  } else {
    state.record.push(0);
    return false;
  }
}

function renderResponse(state, response) {
  $('.correct').addClass('correct_answer');
  if(response) {
    return $('.response').html("Correct!");
    // return alert("Correct. Click 'Next' to advance.");
  } else {
    return $('.response').html("Incorrect, the correct answer is highlighted.");
    // return alert("Incorrect. The correct answer is: " + state.questions[state.index][1]);
  }
};

function renderProgress(state, element) {
  var progress = "<span>Question: " + (state.index) + " of 10</span>";
  element.html(progress);
};

function renderScore(state, element) {
  var score = state.record.reduce((a, b) => a + b, 0);
  if(score == 1) {
    var scoreHTML ="<span>Score: " + score + " question correct</span>";
  } else {
    var scoreHTML = "<span>Score: " + score + " questions correct</span>";
  }
  element.html(scoreHTML);
};

function renderQuiz(state) {
  $('.response').html("Answers:");
  renderQuestion(state, $('.quiz-question'));
  renderAnswers(state, $('.quiz-answers'));
  randomizeAnswers();
  renderProgress(state, $('.progress'));
  renderScore(state, $('.score'));
}