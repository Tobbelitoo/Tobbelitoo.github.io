const quizButtonContainerElement = document.getElementById('quiz-button-container');
const quizGamesElement = document.getElementById('quiz-games');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const questionNumberElement = document.getElementById('question-number');
const answerButtonsElement = document.getElementById('answer-buttons');

const startButton = document.getElementById('start-btn');
const viewAnswerButton = document.getElementById('viewAnswer-btn');
const nextButton = document.getElementById('next-btn');
const quizContainerElement = document.getElementById('quiz-container');

let shuffledQuestions, currentQuestionIndex, totalQuestions   /* Detta kommer att default those constants to undefined  */

let topics = [
	{
		name: 'Matematik',
		questionsArray: 'matematik'
	},
	{
		name: 'HTML - Head',
		questionsArray: 'htmlhead'
	},
	{
		name: 'HTML - Body',
		questionsArray: 'htmlbody'
	},
	{
		name: 'CSS - Flexbox parent',
		questionsArray: 'cssflexboxparent'
	},
	{
		name: 'CSS - Flexbox child',
		questionsArray: 'cssflexboxchild'
	},
	{
		name: 'GITHUB - Uppdatera repo',
		questionsArray: 'githubuppdaterarepo'
	}
]

function loadGameButtons() {
	for (let topic of topics) {
		let button = document.createElement('div');
		button.innerText = topic.name;
		button.classList.add('btn', 'btn-topic');
		button.addEventListener('click', (e) => prepareGame(e));
		quizButtonContainerElement.appendChild(button);
	}
}


loadGameButtons();



function prepareGame(e) {
	quizGamesElement.classList.add('hide');
	quizContainerElement.classList.remove('hide');
	let topicName = e.target.innerText;	
	switch(topicName) {
		case "Matematik":
			questions = matematik;
			break;
		case "HTML - Head":
			questions = htmlhead;
			break;
		case "HTML - Body":
			questions = htmlbody;
			break;
		case "CSS - Flexbox parent":
			questions = cssflexboxparent;
			break;
		case "CSS - Flexbox child":
			questions = cssflexboxchild;
			break;	}
	totalQuestions = questions.length;
	console.log(totalQuestions);
}


startButton.addEventListener('click', startGame);
viewAnswerButton.addEventListener('click', () => {
	viewAnswerButton.classList.add('hide');
	Array.from(answerButtonsElement.children).forEach((button) => {
		button.classList.remove('hide');
	});
	
});
nextButton.addEventListener('click', () => {
	currentQuestionIndex++;
	setNextQuestion();
});



function startGame() {
	startButton.classList.add('hide');
	shuffledQuestions = questions.sort(() => Math.random() - .5);
	currentQuestionIndex = 0;
	questionContainerElement.classList.remove('hide');
	setNextQuestion();
}

function setNextQuestion() {
	resetState();							/* innan vi fyller i en ny fråga rensar vi.. */
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
	questionNumberElement.innerText = `${currentQuestionIndex + 1} / ${totalQuestions}`; 
	questionElement.innerText = question.question;
	question.answers.forEach(answer => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('btn');
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', selectAnswer)	/* När vi klickar här kommer funktionen ta emot eventet */
		answerButtonsElement.appendChild(button);
		if (question.answers.length == 1) {
			viewAnswerButton.classList.remove('hide');
			button.classList.add('hide');
		}
	});
}

function resetState() {
	nextButton.classList.add('hide');
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

function selectAnswer(e) {	/* funktionen tar emot event in as a parameter */ 
	checkAnswer(e);
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide');	
	} else {
		startButton.innerText = 'Restart';
		startButton.classList.remove('hide');
	}
}

function checkAnswer(e) {
	const selectedButton = e.target;
	Array.from(answerButtonsElement.children).forEach(button => {
		if (button === selectedButton) {
			if (button.dataset.correct) {
				console.log('yeeess..');
				button.classList.add('correct');
			} else {
				button.classList.add('wrong');
			}
		} else {
			if (button.dataset.correct) {
				button.classList.add('correct');
			}
		}
	});
}










var matematik = [
	{
		question: 'What is 2 + 2',
		answers: [
			{ text: '4', correct: true },
			{ text: '22', correct: false },
			{ text: '2', correct: false },
			{ text: '8', correct: false }
		]
	},
	{
		question: 'What is 7 + 3',
		answers: [
			{ text: '73', correct: false },
			{ text: '37', correct: false },
			{ text: '10', correct: true },
			{ text: '9', correct: false }
		]
	},
	{
		question: 'What is 1 + 1',
		answers: [
			{ text: '11', correct: false },
			{ text: '111', correct: false },
			{ text: '1', correct: false },
			{ text: '2', correct: true }
		]
	}
];




var htmlhead = [
{question: 'Vilka element används i head?',answers: [{ text: 'title, meta, link, script', correct: true }]},
{question: 'Vilka meta-element finns?',answers: [{ text: 'meta charset, meta viewport', correct: true }]},
{question: 'Beskriv meta charset',answers: [{ text: 'meta charset="UTF-8"', correct: true }]},
{question: 'Beskriv meta viewport',answers: [{ text: 'meta name="viewport" content="width=device-width, initial-scale=1.0"', correct: true }]},
{question: 'Beskriv link',answers: [{ text: 'link rel="stylesheet" href="css/style.css"', correct: true }]},
{question: 'Besrkvit script',answers: [{ text: 'script defer src="script/javascript.js"></script', correct: true }]}
];

var htmlbody = [
{question: 'Räkna upp body element, de med beskrivande namn',answers: [{ text: 'container, content, aside, main, header, footer', correct: true }]},
{question: 'Hur lägger man in flera klasser eller id:n i ett element',answers: [{ text: 'class="klass1, klass2"', correct: true }]},
{question: 'I vilket format skriver man klasser och id:n',answers: [{ text: '"btn-grid", "start-btn"', correct: true }]},
{question: 'Hur skriver man en selekt-meny',answers: [{ text: 'select name="cars"   option value="volvo"  Volvo /option  /select', correct: true }]},
{question: 'Hur skriver man en rubrik till select-menyn',answers: [{ text: 'label for="cars"  Choose a car:  /label', correct: true }]}
];



var cssflexboxparent = [
{question: 'Räkna upp flexbox properties',answers: [{ text: 'display, flex-direction, justify-content, gap, flex-wrap, flex-direction, align-items', correct: true }]},
{question: 'Beskriv display values',answers: [{ text: 'flex', correct: true }]},
{question: 'Beskriv flex-direction values',answers: [{ text: 'column, row (row default)', correct: true }]},
{question: 'Beskriv justify-content values',answers: [{ text: 'center, flex-start, flex-end, space-between, space-around, space-evenly (om space finns)', correct: true }]},
{question: 'Beskriv gap',answers: [{ text: '1rem, mellanrum mellan flex-items', correct: true }]},
{question: 'Beskriv flex-wrap',answers: [{ text: 'wrap (default nowrap)', correct: true }]},
{question: 'Beskriv align-items',answers: [{ text: 'flex-start, flex-end, center, stretch (default) (om space finns)', correct: true }]}
];

var cssflexboxchild = [
{question: 'Räkna upp flexbox properties för flex item',answers: [{ text: 'flex-grow, flex-shrink, flex-basis', correct: true }]},
{question: 'Beskriv flex-grow',answers: [{ text: '1 , ett nummer som beskriver hur mycket olika element ska växa i förhållande till varandra', correct: true }]},
{question: 'Beskriv flex-shrink',answers: [{ text: '1 , hur ett element ska förminskas i förhållande till de andra i samma container', correct: true }]},
{question: 'Beskriv flex-basis',answers: [{ text: '100px , sätter den initiala längden av ett item', correct: true }]},
{question: 'Vad är en shorthand för flex items properties',answers: [{ text: 'flex , shorthand för flex-grow, flex-shrink, flex-basis. Sätter den flexibla längden på ett item', correct: true }]},
{question: 'Vilka värden kan flex ha',answers: [{ text: '0, 1, 50%, 100%, m.fl. ?', correct: true }]},
{question: 'Vad innebär flex: 1',answers: [{ text: 'flex-grow: 1, flex-shrink: 1, flex-basis: 0', correct: true }]}
];





/*  


ONE ANSWER...


var questions.. = [
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]}
];


var questions.. = [
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]}
];


var questions.. = [
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]},
{question: '',answers: [{ text: '', correct: true }]}
];






MANY ANSWERS



var questions.. = [
{question: '',answers: [{ text: '', correct: true }, { text: '', correct: false }, { text: '', correct: false }, { text: '', correct: false }]},
{question: '',answers: [{ text: '', correct: true }, { text: '', correct: false }, { text: '', correct: false }, { text: '', correct: false }]},
{question: '',answers: [{ text: '', correct: true }, { text: '', correct: false }, { text: '', correct: false }, { text: '', correct: false }]},
{question: '',answers: [{ text: '', correct: true }, { text: '', correct: false }, { text: '', correct: false }, { text: '', correct: false }]},
{question: '',answers: [{ text: '', correct: true }, { text: '', correct: false }, { text: '', correct: false }, { text: '', correct: false }]},
{question: '',answers: [{ text: '', correct: true }, { text: '', correct: false }, { text: '', correct: false }, { text: '', correct: false }]}
];






*/























