import { addProductToCart, changeAmount } from './cart.js';
import getData from '../getData.js';
import getQuestion from '../getQuestion.js'
import { addProduct, changeProduct, removeProduct, viewProducts } from './products.js';

const db = await getData('/webshop/shop.json', {})
await db.read()
if (!db.data.products && !db.data.cart) {
	db.data.products = []
	db.data.cart = []
}
const [question, close] = getQuestion()


// let product = {
// 	name: 'hammare', String,
// 	price: 99, Number,
// 	id: 44, Number
// 	// Och amount: 1, Number, när den hamnar i kundkorgen.
// }

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
		viewProducts(db.data.products, 'products')

	}
	else if (pick === '2') {

		await addProduct(db.data.products)

		await db.write()
	} else if (pick === '3') {
		console.log('\nChoose the id of the product you want to change: \n');

		viewProducts(db.data.products, 'products')

		const change = await question('\nId: ')
		const newName = await question('\nSet new name for product: ')
		const newPrice = await question('\nSet new price for product: ')

		changeProduct(db.data.products, change, newName, newPrice)

		await db.write()
	} else if (pick === '4') {
		console.log('\nChoose the id of the product you want to remove: \n');

		viewProducts(db.data.products, 'products')
		const remove = await question('\nNumber: ')

		removeProduct(db.data.products, remove)

		await db.write()
	} else if (pick === '5') {

		console.log('\nCart: \n');
		viewProducts(db.data.cart, 'cart')

	} else if (pick === '6') {
		console.log('\n');
		viewProducts(db.data.products, 'products')

		const productChoice = await question('\nChoose the id of the product you want to add to the cart: ')

		addProductToCart(db.data.products, db.data.cart, productChoice)

		await db.write()
	} else if (pick === '7') {
		console.log('\nCart: \n');
		viewProducts(db.data.cart, 'cart')

		const productChoice = await question('\nChoose the id of the product you want to change the amount of: ')
		await changeAmount(db.data.cart, productChoice)

		await db.write()
	} else if (pick === '8') {
		console.log('\nCart: \n');
		viewProducts(db.data.cart, 'cart')

		const productChoice = await question('\nChoose the id of the product you want to remove: ')
		removeProduct(db.data.cart, productChoice)

		await db.write()
	} else if (pick === '9') {
		close()
		return
	}
	webShop()
}

webShop()