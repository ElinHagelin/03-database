import getQuestion from '../getQuestion.js'


const [question, close] = getQuestion()

export const viewProducts = (productList, listType) => {
	if (productList.length === 0) {
		console.log('No products yet...');
	}
	if (listType === 'products') {
		return productList.forEach(({ name, price, id }) => {
			console.log(`id: ${id}: ${name}, ${price}:-`)
		});
	} else if (listType === 'cart') {
		return productList.forEach(({ name, price, amount, id }) => {
			console.log(`id: ${id}: ${name}, antal: ${amount}, ${price * amount}:-`)
		});
	}
}

export const addProduct = async (productList) => {
	let name = await question('\nProduct to add: ')
	let price = await question('\nPrice of the product: ')
	let id = Math.floor(Math.random() * 100) + 1

	let product = { name, price, id }
	productList.push(product)
}

export const changeProduct = (productList, change, newName, newPrice) => {

	const productToChange = productList.find(product => product.id == change)
	productToChange.name = newName
	productToChange.price = newPrice
}

export const removeProduct = (productList, remove) => {
	const productToRemove = productList.find(product => product.id == remove)
	if (!productToRemove) {
		console.log(`Couldn't find product with that id`);
		return
	} else {
		return productList.splice(productList.indexOf(productToRemove), 1)
	}
}