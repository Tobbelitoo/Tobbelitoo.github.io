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
	{ name: "Math",
	  subTopics: ['Addition', 'Subtraction']
	}
]

for (let topic of topics) {
	console.log(topic);
	console.log(topic.subTopics);
	for (subTopic of topic.subTopics){
		console.log(subTopic);	
	}
}









