let STORE = [
  {
    question: 'Who is known to be Mr. Hockey?',
    answers: ['Gordie Howe', 'Wayne Gretzky', 'Mario Lemieux', 'Mark Messier'],
    correctAnswer: 'Gordie Howe'
  },
  {
    question: 'How many games are in a regular hockey season? NOT including playoffs',
    answers: ['50 games', '110 games', '82 games', '90 games'],
    correctAnswer: '82 games'
  },
  {
    question: 'How many teams are in the National Hockey League?',
    answers: ['30 teams', '38 teams', '35 teams', '31 teams'],
    correctAnswer: '31 teams'
  },
  {
    question: 'How many divisions are in the National Hockey League?',
    answers: ['6 divisions', '4 divisions', '2 divisions', '8 divisions'],
    correctAnswer: '4 divisions'
  },
  {
    question: 'Who is known as The Great One?',
    answers: ['Gordie Howe', 'Wayne Gretzky', 'Mario Lemieux', 'Mark Messier'],
    correctAnswer: 'Wayne Gretzky'
  },
  {
    question: 'What is it called when a player scores three goals in a single game?',
    answers: ['A Woohoo', 'A Good Game', 'A Hat Trick', 'A Triple Scorer'],
    correctAnswer: 'A Hat Trick'
  },
  {
    question: 'What is it called when a single player scores a goal, gets an assist, and has a fight in a single game?',
    answers: ['A Wow Gamer', 'A Super Player', 'A Gordie Howe Hat Trick', 'A Power Play'],
    correctAnswer: 'A Gordie Howe Hat Trick'
  },
  {
    question: 'When a player receives a penalty, where does the player serve his penalty time?',
    answers: ['The Timeout Seat', 'In The Locker Room', 'On The Bench', 'In The Penalty Box'],
    correctAnswer: 'In The Penalty Box'
  },
  {
    question: 'What is the name of the Trophy that is presented to the Champions?',
    answers: ['The Prince Of Wales', 'The Stanley Cup', 'Champions Championship', 'The Campbell Trophy'],
    correctAnswer: 'The Stanley Cup'
  },
  {
    question: 'What is the name of the Trophy given to the team with the most points at the end of the regular season?',
    answers: ['The Prince Of Wales', 'The Stanley Cup', 'The Presidents Trophy', 'The Campbell Trophy'],
    correctAnswer: 'The Presidents Trophy'
  }
  
];

let totalScore = 0;
let questionCount = 0;

function handleStartBtn(){
  $('.controls').append(`
    <button id="start-btn" class="start-btn btn">Start</button>
    `);
  $('.intro').append(`
    <h1>Welcome! Let's test your hockey knowledge!</h1>
    `);
  $('.start-btn').on('click', function(){
      $('.start-btn').remove();
      $('.intro').empty('');
      handleSetQuestion();
  });


}

function handleSetQuestion(){
  if(questionCount < STORE.length){
    $('.score').append(`
      <h2>Current Score: ${totalScore}/10<h2>
      `);
    $('.questionCount').append(`
      <h2>Current Question Number: ${questionCount + 1}/10<h2>
      `);

    let questionToShow = STORE[questionCount].question;
    $('#question-container').show();
    $('#question').append(questionToShow);
    $('#answer-radio').append(`
      <div class=radioButtons>
        <input type="radio" checked="checked" name="answer" value="${STORE[questionCount].answers[0]}" id="answerZero">
        <label for="answerZero" id="labelZero" class="label">${STORE[questionCount].answers[0]}</label>
      </div>
      <div class=radioButtons>
        <input type="radio" name="answer" value="${STORE[questionCount].answers[1]}" id="answerOne">
        <label for="answerOne" id="labelOne" class="label">${STORE[questionCount].answers[1]}</label>
      </div>
      <div class=radioButtons>
        <input type="radio" name="answer" value="${STORE[questionCount].answers[2]}" id="answerTwo">
        <label for="answerTwo" id="labelTwo" class="label">${STORE[questionCount].answers[2]}</label>
      </div>
      <div class=radioButtons>
        <input type="radio" name="answer" value="${STORE[questionCount].answers[3]}" id="answerThree">
        <label for="answerThree" id="labelThree" class="label">${STORE[questionCount].answers[3]}</label>
      </div>
      <input type="button" name="submit" value="submit" id="subBtn" class="submit-btn btn"><br>
      `);
  } else {
    handleRestart();
  };

  $('#subBtn').on('click', function(){
    event.preventDefault();
    $('.controls').append(`
      <button id="next-btn" class="next-btn btn">Next</button>
      `);
    handleGrading();
  });

}

function handleGrading(){
  let userAnswer = $("input[name='answer']:checked").val();
  let correctAnswer = STORE[questionCount].correctAnswer;

  if(userAnswer == correctAnswer) {
    $('.feedback').append(`
      <div id="correctFeedback" class="correct">
        <h2 class="correct">You got the correct answer!</h2>
        <h2 class="correct">That was a great choice!</h2>
        <img src="images/goal-light.jpg" alt="hockey goal light" class="correctImage">
      </div>
      `);
    questionCount++;
    totalScore++;
    $('#question').empty('');
    $('#answer-radio').empty('');

  }
  else {
    $('.feedback').append(`
      <div id="wrongFeedback" class="wrong">
        <h2 class="wrong">You got the wrong answer!</h2>
        <h2 class="wrong">You'll get it next time!</h2>
        <h2 class="wrong">The Correct Answer was: ${correctAnswer}</h2>
        <img src="images/ref-calling-pen.jpg" alt="referee calling penalty" class="wrongImage">
      </div>
      `);
      questionCount++;
      $('#question').empty('');
      $('#answer-radio').empty('');
  }

    handleNextBtn();
}

function handleNextBtn(){
  $('#next-btn').on('click', function(){
    event.preventDefault();
    $('#question-container').show();
    $('#question').empty('');
    $('#answer-radio').empty('');
    $('.feedback').empty('');
    $('#next-btn').remove('');
    handleSetQuestion();
  });

  $('.score').empty(``);
  $('.questionCount').empty(``);
}

function handleRestart(){
  let percentScore = (totalScore/10) * 100;
  $('.feedback').append(`
    <div id="finalScore" class="final">
      <h2 class="final">Congratulations!</h2>
      <h2 class="final">Your Final Score is ${totalScore}/10!</h2>
      <h2 class="final">Your Shooting Percentage was ${percentScore}%</h2>
      <img class="finalImage" src="images/final-feedback-photo.jpg" alt="USA Womans Hockey team winning Gold by Maddie Meyer">
    </div>
    `);
  $('.controls').append(`
    <button id="restart-btn" class="restart-btn btn">restart</button>
    `);

  $('#restart-btn').on('click', function(){
    event.preventDefault();
    $('.score').empty(' ');
    $('.feedback').empty(' ');
    $('.restart-btn').remove();
    handleStartBtn();
    questionCount = 0;
    totalScore = 0;
  });


}

function handleClicks(){
  handleStartBtn();
  handleNextBtn();
}

$(handleClicks);
