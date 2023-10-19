const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex   /* Detta kommer att default those constants to undefined  */

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
	currentQuestionIndex++;
	setNextQuestion();
});

function startGame() {
	startButton.classList.add('hide');
	shuffledQuestions = questions.sort(() => Math.random() - .5);
	console.log(shuffledQuestions);
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
	console.log(e.target.innerText);
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide');	
	} else {
		startButton.innerText = 'Restart';
		startButton.classList.remove('hide');
	}
}

const questions = [
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

let topics = [
	{ topic: "Math",
		subTopics: [
			'Addition', 'Subtraction'
		]
	}
]

console.log(topics.Math.subTopics);








