import getData from './getData.js';
import getQuestion from './getQuestion.js'


const db = getData('bookreview.json', [])

// Lägg till en ny bokrecension. Skriptet ska fråga efter bokens namn och hur många stjärnor du ger den, på skalan 	1-5. (Tips: ge varje recension ett unikt id. Det underlättar när du ska göra menyalternativen 3 och 4.)
// Se alla recensioner som lagts in.
// Ta bort en recension.
// Ändra antalet stjärnor på en recension.
// Avsluta

await db.read()
const [question, close] = getQuestion()
// let reviews =[]

async function bookReview() {
	console.log('\nWelcome to the book review app\n');

	console.log('[1] Add a review');
	console.log('[2] View the reviews');
	console.log('[3] Remove a review');
	console.log('[4] Change a review');
	console.log('[5] Exit');

	let pick = await question('\nChoose an option: ')

	if (pick === '1') {
		let title = await question('\nPlease write the title of the book: ')
		let author = await question('\nPlease write the author of the book: ')
		let rating = await question('\nPlease rate the book on a scale of 1-5 ')
		let id = Math.floor(Math.random() * 100) + 1

		let review = { title, author, rating, id }
		db.data.push(review)
		await db.write()
	} else if (pick === '2') {
		db.data.forEach(review => {
			console.log(`${title} by ${author} received ${rating} stars`)
		});
	} else if (pick === '3') {
		console.log('\nChoose the number of the review you want to remove: \n');
		db.data.forEach(({ id, title, author, rating }) => {
			console.log(`${id} ${title} by ${author} received ${rating} stars`)
		});
		const remove = await question('\nNumber: ')
		db.data.filter(review => review.id !== remove)
		await db.write()
	} else if (pick === '4') {
		console.log('\nChoose the number of the review you want to change: \n');
		db.data.forEach(({ id, title, author, rating }) => {
			console.log(`${id} ${title} by ${author} received ${rating} stars`)
		});
		const change = await question('\nNumber: ')
		const newRating = await question('\nPlease rate the book on a scale of 1-5 ')
		let targetReview = db.data.find(review => review.id === change)
		targetReview.rating = newRating
		await db.write()
	}
}