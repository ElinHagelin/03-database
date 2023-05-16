import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { question } from 'readline-sync'


const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter, [])

await db.read()
db.data.guestbook = []

function menu() {
	console.log('\nWelcome to the guestbook\n');

	console.log('[1] Add your name');
	console.log('[2] View the guestbook');
	console.log('[3] Exit');

	let pick = question('\nChoose an option: ')

	if (pick === '1') {
		let name = question('\nWhat is your name? ')
		db.data.guestbook.push(name)
		db.write()
	} else if (pick === '2') {
		if (db.data.guestbook.length === 0) {
			console.log('\nThe guestbook is empty');
		}
		console.log('\nNames in the guestbook are: ');
		db.data.guestbook.forEach(name => {
			console.log(name);
		});
	} else if (pick === '3') {
		return
	}

	menu()
}

menu()
