import { removeProduct } from "./products.js"
import getQuestion from '../getQuestion.js'

const [question, close] = getQuestion()


export const addProductToCart = (productList, cart, productChoice) => {


	const productIsInCart = cart.find(p => p.id == productChoice)
	const productNotInCart = productList.find(p => p.id == productChoice)

	if (productIsInCart) {
		productIsInCart.amount = productIsInCart.amount + 1

	} else if (productNotInCart) {
		let product = { ...productNotInCart }
		product.amount = 1
		cart.push(product)
		console.log(`\nadded ${product.name} to the basket`);

	} else if (!productNotInCart && !productIsInCart) {
		console.log(`Couldn't find product with that id`);
		return
	}
}

export const changeAmount = async (cart, productChoice) => {

	const product = cart.find(p => p.id == productChoice)

	if (!product) {
		console.log(`Couldn't find product with that id`);
		return
	} else {
		console.log(`Current amount of ${product.name} is ${product.amount} `);
		const newAmount = await question('\nSet the new amount: ')

		if (newAmount === '0') {
			console.log(`removing ${product.name} from cart`);
			removeProduct(cart, product)
		} else {
			product.amount = newAmount
		}
	}

}