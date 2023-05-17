import getQuestion from './getQuestion.js'
import getData from './getData.js'


const db = getData('db.json', [])

await db.read()
db.data.guestbook = []
const [question, close] = getQuestion()

async function menu() {
	console.log('\nWelcome to the guestbook\n');

	console.log('[1] Add your name');
	console.log('[2] View the guestbook');
	console.log('[3] Exit');

	let pick = await question('\nChoose an option: ')

	if (pick === '1') {
		let name = await question('\nWhat is your name? ')
		db.data.guestbook.push(name)
		await db.write()
	} else if (pick === '2') {
		if (db.data.guestbook.length === 0) {
			console.log('\nThe guestbook is empty');
		}
		console.log('\nNames in the guestbook are: ');
		db.data.guestbook.forEach(name => {
			console.log(name);
		});
	} else if (pick === '3') {
		close()
		return
	}

	menu()
}

menu()
