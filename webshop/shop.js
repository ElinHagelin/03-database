import getData from './getData.js';
import getQuestion from './getQuestion.js'

const db = getData('shop.json', {})
await db.read()
db.data.products = []

// Visa alla produkter. (get)
// Lägg till en ny produkt. (*post)
// Ändra en befintlig produkt. (*put)
// Ta bort en produkt. (*delete)
// Visa kundvagnen. (get)
// Lägg till en produkt till kundvagnen. (post)
// Ändra antalet av en viss produkt i kundvagnen. (put)
// Ta bort en produkt ur kundvagnen. (delete)

let product = {
	name: 'hammare', String,
	price: 99, Number,
	id: 44, Number
	// Och amount: 1, Number, när den hamnar i kundkorgen.
}

async function webShop() {
	console.log('\nWelcome to the shop\n');

	console.log('[1] Show all products');
	console.log('[2] Add new product');
	console.log('[3] Change a product');
	console.log('[4] Remove a product');
	console.log('[5] Show the cart');
	console.log('[6] Add a product to cart');
	console.log('[7] Change amount in cart');
	console.log('[8] Remove product from cart');
	console.log('[9] Exit');

	let pick = await question('\nChoose an option: ')

	if (pick === '1') {

		console.log('\n');
		if (db.data.products.length === 0) {
			console.log('No products yet...');
		}
		db.data.products.forEach(({ name, price }) => {
			console.log(`${name}, ${price}:-`)
		});

	}
	else if (pick === '2') {

		let name = await question('\nProduct to add: ')
		let price = await question('\nPrice of the product: ')
		let id = Math.floor(Math.random() * 100) + 1

		let product = { name, price, id }
		db.data.products.push(product)

		await db.write()
	} else if (pick === '3') {

		console.log('\nChoose the number of the product you want to change: \n');

		db.data.products.forEach(({ name, price }) => {
			console.log(`${id} ${name}, ${price}:-`)
		});
		const change = await question('\nNumber: ')
		const newName = await question('\nWhat should the products name be? ')
		const newPrice = await question('\nWhat should the products price be? ')

		db.data.products.find(product => product.id == change).name = newName

		await db.write()
	}
}