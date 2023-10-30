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
		name: 'JS - Get elements',
		questionsArray: 'jsgetelements'
	},
	{
		name: 'JS - Change elements',
		questionsArray: 'jschangeelements'
	},
	{
		name: 'GITHUB - Uppdatera repo',
		questionsArray: 'githubuppdaterarepo'
	},
	{
		name: 'SERVER - Grundfil och ta emot data',
		questionsArray: 'servergrundfilochtaemotdata'
	},
	{
		name: 'SERVER - Routes',
		questionsArray: 'serverroutes'
	},
	{
		name: 'SERVER - Models',
		questionsArray: 'servermodels'
	},
	{
		name: 'SERVER - Controllers',
		questionsArray: 'servercontrollers'
	},
	{
		name: 'SERVER - Mongodb',
		questionsArray: 'servermongodb'
	},
	{
		name: 'SERVER - Dotenv',
		questionsArray: 'serverdotenv'
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
			break;
		case "JS - Get elements":
			questions = jsgetelements;
			break;	
		case "JS - Change elements":
			questions = jschangeelements;
			break;
		case "SERVER - Grundfil och ta emot data":
			questions = servergrundfilochtaemotdata;
			break;
		case "SERVER - Routes":
			questions = serverroutes;
			break;
		case "SERVER - Models":
			questions = servermodels;
			break;
		case "SERVER - Controllers":
			questions = servercontrollers;
			break;
		case "SERVER - Mongodb":
			questions = servermongodb;
			break;
		case "SERVER - Dotenv":
			questions = serverdotenv;
			break;
	}
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
			answerButtonsElement.style.gridTemplateColumns = "repeat(1, auto)";
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










/*  --------------------- QUESTIONS ----------------- */





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


var jsgetelements = [
{question: 'Hur läser man in ett element utifrån Id?',answers: [{ text: 'const elementName = document.getElementById("id");', correct: true }]},
{question: 'Hur läser man in element utifrån Class?',answers: [{ text: 'const elements = document.getElementsByClassName("class");', correct: true }]},
{question: 'Hur läser man in element utifrån tagg?',answers: [{ text: 'const elements = document.getElementsByTagName("tagg");', correct: true }]},
{question: 'Hur får man ett element att reagera på klick ? ',answers: [{ text: 'Läs först in elementet. Lägg sedan på elementName.addEventListener("click", () => {});', correct: true }]},
{question: 'Hur loopar man igenom inlästa flexbox items element?',answers: [{ text: 'Läs först in parent element. Sedan: Array.from(answerButtonsElement.children).forEach(button => {});', correct: true }]}
];


var jschangeelements = [
{question: 'Hur skapar man element?',answers: [{ text: 'document.createElement(element);', correct: true }]},
{question: 'Hur tar man bort element?',answers: [{ text: 'document.removeChild(element);', correct: true }]},
{question: 'Hur lägger man till element?',answers: [{ text: 'document.appendChild(element);', correct: true }]},
{question: 'Hur ersätter man element?',answers: [{ text: 'document.replaceChild(new, old);', correct: true }]},
{question: 'Hur ändrar man inuti ett element?',answers: [{ text: 'element.innerHTML = new html content;', correct: true }]},
{question: 'Vad är exempel på ett elements attribut?',answers: [{ text: 'src, href, width, height, alt, style, lang, title ', correct: true }]},
{question: 'Hur ändrar man ett elements attribut?',answers: [{ text: 'element.attribute = new value; eller element.setAttribute(attribute, value);', correct: true }]},
{question: 'Hur ändrar man style på ett element?',answers: [{ text: 'element.style.property = new style;', correct: true }]}
];


var servergrundfilochtaemotdata = [
{question: 'Hur läser man in Express och startar en server?',answers: [{ text: 'const express = require("express"); const app = express(); app.listen(3000, () => console.log("Server started"));', correct: true }]},
{question: 'På vilka sätt kan data komma in från clienten?',answers: [{ text: 'REQ.BODY, REQ.PARAMS, REQ.QUERY', correct: true }]},
{question: 'Hur parsar man data som kommer in i bodyn?',answers: [{ text: 'REQ.BODY parsa med express.json() eller express.urlencoded()', correct: true }]},
{question: 'Hur läser man in express.json?',answers: [{ text: 'app.use(express.json());', correct: true }]},
{question: 'Hur läser man in express.urlencoded?',answers: [{ text: 'app.use(express.urlencoded({extended: true});', correct: true }]},
{question: 'Hur skickar man data genom params?',answers: [{ text: 'http://localhost:3000/espresso/tobbe/123', correct: true }]},
{question: 'Hur tar man emot och läser data som kommer från params?',answers: [{ text: 'app.get("/espresso/:user/:userId", (req,res) => {..req.params..});', correct: true }]},
{question: 'Hur skickar man data genom query?',answers: [{ text: 'http://localhost:3000/animals?page=10  (som en GET-req i linken)', correct: true }]},
{question: 'Hur tar man emot och läser data som kommer från query?',answers: [{ text: 'app.get("/animals", () => { console.log(req.query.page); });', correct: true }]}
];



var serverroutes = [
{question: 'Hur läser vi in en fil med routes i server.js?',answers: [{ text: 'const userRouter = require("./routes/user");', correct: true }]},
{question: 'Hur hänvisar vi anrop till filen med routes i server.js?',answers: [{ text: 'app.use("/user", userRouter);', correct: true }]},
{question: 'Hur ser grunderna ut i en route-fil, förklara med text?',answers: [{ text: 'Läs in express och skapa en router. Läs in controllerfil. Sätt upp routes. Exportera router.', correct: true }]},
{question: 'Hur börjar vi koden i en routes-fil?',answers: [{ text: 'const express = require("express"), const router = express.Router();', correct: true }]},
{question: 'Hur skriver vi en route i routes-filen utan controller?',answers: [{ text: 'router.get("/", (req, res) => {});', correct: true }]},
{question: 'Hur skriver vi en route i routes-filen med controller?',answers: [{ text: 'router.get("/", userController.getUserPage);', correct: true }]},
{question: 'Vilka router-metoder finns det?',answers: [{ text: 'get, post, put(uppd allt), patch(uppd endast det vi skickar med), delete', correct: true }]},
{question: 'Hur avslutar vi en router-fil?',answers: [{ text: 'module.exports = router;', correct: true }]}
];


var servermongodb = [
{question: 'Hur importera/läsa in mongoose library?',answers: [{ text: 'const mongoose = require("mongoose");', correct: true }]},
{question: 'Hur connecta till mongoose?',answers: [{ text: 'mongoose.connect("mongodb://localhost/subscribers", {useNewUrlParser:true});', correct: true }]},
{question: 'Hur sparar vi databas-kopplingen i en variabel?',answers: [{ text: 'const db = mongoose.connection;', correct: true }]},
{question: 'Hur lyssnar vi på problem från databasen?',answers: [{ text: 'db.on("error", (error) => console.error(error));', correct: true }]},
{question: 'Hur skriver vi ut något när vi kopplar upp första gången?',answers: [{ text: 'db.once("open", () => console.log("Connected to Database"));', correct: true }]}
];


var serverdotenv = [
{question: 'Vad kan vi skriva in i dotEnv?',answers: [{ text: 'process.env.PORT=3000, process.env.DATABASE_URL=adress till databas..', correct: true }]},
{question: 'Hur läser vi in dotEnv i servern?',answers: [{ text: 'require("dotenv").config();   //denna läser vi in OM vi är i development environment.', correct: true }]},
{question: 'Hur använder vi dotEnv-variabeln DATABASE_URL i koden? ',answers: [{ text: 'mongoose.connect(DATABASE_URL, {useNewUrlParser:true});', correct: true }]},
{question: 'Hur använder vi dotEnv-variabeln PORT i koden?',answers: [{ text: 'app.listen(PORT, () => console.log("Server started!");', correct: true }]}
];


var servermodels = [
{question: 'Var använder man en model-fil och hur läser man in den?',answers: [{ text: 'i controllerfiler. const User = require("../models/userModel");', correct: true }]},
{question: 'Hur ser grunderna ut i en modellfil, förklara i text?',answers: [{ text: 'Läs in mongoose, skapa Schema, skapa modell, exportera modell.', correct: true }]},
{question: 'Hur ser grunderna ut i en modellfil, förklara i kod?',answers: [{ text: 'const mongoose = require("mongoose"); const userSchema = new mongoose.Schema({...}); const User = mongoose.model('user', userSchema); module.exports = User;', correct: true }]},
{question: 'Hur kan man skriva "Sport" som en key i Schemat?',answers: [{ text: 'Sport: { type: String, required: [true, "Please choose a sport"] },', correct: true }]},
{question: 'Hur kan man skriva "Date" som en key i Schemat?',answers: [{ text: 'Date: { type: Date, required: true },', correct: true }]},
{question: 'Hur kan man skriva "employeename" i Schemat?',answers: [{ text: 'employeename: { type: String, required: true, unique: true, trim: true, minlength: 5 },', correct: true }]},
{question: 'Hur kan man skriva "updated" i Schemat?',answers: [{ text: 'updated: { type: Date, default: Date.now },', correct: true }]},
{question: 'Hur kan man skriva "age" i Schemat?',answers: [{ text: 'age: { type: Number, min: 18, max: 65, required: true },', correct: true }]}
];


var servercontrollers = [
{question: 'Var använder man en controller-fil och hur läser man in den?',answers: [{ text: 'i routefiler. const userController = require("../controllers/userController"); router.get("/", userController.getUserPage);', correct: true }]},
{question: 'Hur ser grunderna ut i en controllerfil, förklara med text?',answers: [{ text: 'Läs in modell, skapa/exportmetoder (och därif läs in data, spara/hämta mot/från databas, skicka tillbaks till clienten)', correct: true }]},
{question: 'Hur ser grunderna ut i en controllerfil, förklara med kod?',answers: [{ text: 'const User = require("../models/userModel"); exports.createUser = async(req, res) => {läs in data, spara/hämta mot/från databas, skicka tillbaks till clienten};', correct: true }]}
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























