
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process'

function getQuestion() {
	const rl = readline.createInterface({ input, output });
	return [rl.question.bind(rl), rl.close.bind(rl)]
	// Use like this:
	// const [question, close] = getQuestion()
}

export default getQuestion