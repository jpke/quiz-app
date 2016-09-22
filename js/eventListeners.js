$('#start').on('click', function(event) {
  event.preventDefault();
  state.index = 1;
  state.record = [];
  $('#next').removeClass('hidden');
  $('#start').addClass('hidden');
  renderQuiz(state);
  $('.quiz').removeClass('hidden');
  $('.finished').addClass('hidden');
});

$('#next').on('click', function(event) {
  event.preventDefault();
  if($('.quiz-answers').get(0).classList.contains('unclicked')) {
    return $('.response').html("You must make a selection before continuing. Select from the options below");
  };

  if(state.index < 10) {
    state.index++;
    renderQuiz(state);
    $('.quiz-answers').addClass('unclicked');
  } else {
    $('.quiz').addClass('hidden');
    $('.finished').removeClass('hidden');
    $('.totalScore').html(state.record.reduce((a, b) => a + b, 0));
    $('#start').removeClass('hidden');
    $('#next').addClass('hidden');
  }
});

$('.quiz-answers').on('click', 'li', function(event) {
  event.preventDefault();
  //check if first try on question
  if($('.quiz-answers').get(0).classList.contains('unclicked')) {
    $('.quiz-answers').removeClass('unclicked');
    var response = evaluateResponse($(this).attr('class'));
    renderResponse(state, response);
    renderScore(state, $('.score'));
  } else {
      // alert("Selection already made. Click next to advance.");
      $('.response').html("Selection already made. Click next to advance.")
    }
});