
//questions array
var triviaQ = [
    { question: "What is the capital city of SPAIN?", 
    choices: ["Madrid", "Barcelona", "Tunisia", "Ibiza"],
    correctAnswer: "Madrid"
  },

  { question: "What is the capital city of NIGERIA?", 
    choices: ["Benin", "Ghana", "Lagos", "Abuja"],
    correctAnswer: "Abuja"
  },

  { question: "What is the capital city of COLOMBIA?", 
    choices: ["Buenos Aires", "Bogotá", "San Jose", "Lima"],
    correctAnswer: "Bogotá"
  },

  { question: "What is the capital city of PHILLIPINES?", 
    choices: ["Palau", "Boracay", "Manila", "Cebu"],
    correctAnswer: "Manila"
  },
  
  { question: "What is the capital city of NEW ZEALAND?", 
    choices: ["Auckland", "Wales", "Victoria", "Wellington"],
    correctAnswer: "Wellington"
  },
 
  { question: "What is the capital city of PAKISTAN?", 
    choices: ["Islamabad", "Mumbai", "Karachi", "Mecca"],
    correctAnswer: "Islamabad"
  },

  { question: "What is the capital city of HAITI?",
    choices: ["Petionville", "Port-au-Prince", "Delmas", "Port-de-Paix"],
    correctAnswer: "Port-au-Prince"
  },

  { question: "What is the capital city of POLAND?",
    choices: ["Saint Petersburg", "Kraków", "Delmas", "Warsaw"],
    correctAnswer: "Warsaw"
  },

  {
  question: "What is the capital city of SOUTH KOREA?",
  choices: ["Jeju-si", "Kuala Lumpur", "Seoul", "Macau"],
  correctAnswer: "Seoul"
  },

  {
  question: "What is the capital city of the USA?",
  choices: ["New York City", "Washington D.C", "Los Angeles", "Chicago"],
  correctAnswer: "Washington D.C"
  },

  {
  question: "What is the capital city of CHINA?",
  choices: ["Shanghai", "Beijing", "Hong Kong", "Taipei"],
  correctAnswer: "Beijing"
  },

  {
  question: "What is the capital city of MOROCCO?",
  choices: ["Marrakesh", "Tangier", "Rabat", "Casablanca"],
  correctAnswer: "Rabat"
  },

  {
  question: "What is the capital city of LEBANON?",
  choices: ["Damascus", "Beirut", "Tripoli", "Sidon"],
  correctAnswer: "Beirut"
  },

  {
  question: "What is the capital city of JAMAICA?",
  choices: ["Montego Bay", "Ocho Rios", "Negril", "Kingston"],
  correctAnswer: "Kingston"
  },

  {
  question: "What is the capital city of Canada?",
  choices: ["Toronto", "Montreal", "Ottawa", "Vancouver"],
  correctAnswer: "Ottawa"
  },
]

// Variables for Score Counter
var score = 0;
var lost = 0;
//Number Counter
var counter = 15;
//currentq variable
var currentQuestion = 0;
//Variable that will hold our interval ID when we execute the "run" function
var intervalID;



// next question after countdown
function nextQuestion() {
    var isQuestionOver = (triviaQ.length - 1) === currentQuestion;
    if (isQuestionOver) {
//hoisted
        console.log('Gameover');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
    
}

// Start a 15 seconds timer to pick or miss chance
function timeUp() {
    clearInterval(intervalID);

    lost++;

    
    setTimeout(nextQuestion, 3500);
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

// Display the question and the choices to the browser
function loadQuestion() {
    counter = 15;
    intervalID = setInterval(countDown, 2500);

    var question = triviaQ[currentQuestion].question; // 
    var choices = triviaQ[currentQuestion].choices; // 

    
    $('#time').html('Timer: ' + counter);
    $('#quiz').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
}

function loadChoices(choices) {
    var result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

// Either correct/wrong choice selected, go to the next question
// Event Delegation
$(document).on('click', '.choice', function() {
    clearInterval(intervalID);
    var selectedAnswer = $(this).attr('data-answer');
    var correctAnswer = triviaQ[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('win');
        displayResult('win');
        setTimeout(nextQuestion, 2500);
    } else {
        lost++;
        console.log('lost');
        displayResult('lost');
        setTimeout(nextQuestion, 2500);
    }
});



//results page at end of game
function displayResult() {
    var result = `
        <p>This round ${score} questions(s) right</p>
        <p>You missed ${lost} questions(s)</p>
        <p>Total questions ${triviaQ.length} right</p>
        <button class="btn btn-primary" id="restart">Play Again</button>
    `;

    $('#quiz').html(result);
}

$(document).on('click', '#restart', function() {
    counter = 15;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    intervalID = null;

    loadQuestion();
});


function loadRemainingQuestion() {
    var remainingQuestion = triviaQ.length - (currentQuestion + 1);
    var totalQuestion = triviaQ.length;

    return `Question: ${remainingQuestion}/${totalQuestion}`;
}



//if user selects right answer
function displayResult(status) {
   var correctAnswer = triviaQ[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#quiz').html(`
            <p>You got it right!</p>
            <p>The correct answer is: <b>${correctAnswer}</b></p>
            
        `);
    } else {
        $('#quiz').html(`
            <p> Nope. The correct answer was <b>${correctAnswer}</b></p>
            <p> You were incorrect</p>
            
        `);
    }
}

//start function
$('#start').click(function() {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();

});
