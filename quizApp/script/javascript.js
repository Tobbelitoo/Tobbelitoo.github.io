const quizButtonContainerElement = document.getElementById('quiz-button-container');
const quizGamesElement = document.getElementById('quiz-games');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const questionNumberElement = document.getElementById('question-number');
const answerButtonsElement = document.getElementById('answer-buttons');

const startButton = document.getElementById('start-btn');
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
		name: 'CSS - Flexbox parent',
		questionsArray: 'cssflexboxparent'
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
		case "CSS - Flexbox parent":
			questions = cssflexboxparent;
			break;
	}
	totalQuestions = questions.length;
	console.log(totalQuestions);
}


startButton.addEventListener('click', startGame);
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
	console.log(question);
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
	{
		question: 'Vilka element används i head?',
		answers: [
			{ text: 'title, meta, link, script', correct: true }
		]
	},
	{
		question: 'Vilka meta-element finns?',
		answers: [
			{ text: 'meta charset, meta viewport', correct: true }
		]
	},
	{
		question: 'Beskriv meta charset',
		answers: [
			{ text: 'meta charset="UTF-8"', correct: true }
		]
	},
	{
		question: 'Beskriv meta viewport',
		answers: [
			{ text: 'meta name="viewport" content="width=device-width, initial-scale=1.0"', correct: true }
		]
	},
	{
		question: 'Beskriv link',
		answers: [
			{ text: 'link rel="stylesheet" href="css/style.css"', correct: true }
		]
	},
	{
		question: 'Besrkvit script',
		answers: [
			{ text: 'script defer src="script/javascript.js"></script', correct: true }
		]
	}
];




var cssflexboxparent = [
	{
		question: 'Räkna upp flexbox properties',
		answers: [
			{ text: 'display, flex-direction, justify-content, gap, flex-wrap, flex-direction, align-items', correct: true }
		]
	},
	{
		question: 'Beskriv display values',
		answers: [
			{ text: 'flex', correct: true }
		]
	},
	{
		question: 'Beskriv flex-direction values',
		answers: [
			{ text: 'column, row (row default)', correct: true }
		]
	},
	{
		question: 'Beskriv justify-content values',
		answers: [
			{ text: 'space-between', correct: true }
		]
	},
	{
		question: 'Beskriv gap',
		answers: [
			{ text: '1rem, mellanrum mellan flex-items', correct: true }
		]
	},
	{
		question: 'Beskriv flex-wrap',
		answers: [
			{ text: 'wrap (default nowrap)', correct: true }
		]
	},
	{
		question: 'Beskriv flex-direction',
		answers: [
			{ text: 'row, column (row default)', correct: true }
		]
	},
	{
		question: 'Beskriv justify-content',
		answers: [
			{ text: 'center, flex-start, flex-end, space-between, space-around, space-evenly (om space finns)', correct: true }
		]
	},
	{
		question: 'Beskriv align-items',
		answers: [
			{ text: 'flex-start, flex-end, center, stretch (default) (om space finns)', correct: true }
		]
	}
];






