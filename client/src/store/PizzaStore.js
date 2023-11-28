import { makeAutoObservable } from 'mobx'

export default class PizzaStore {
	constructor() {
		this._pizzas = []
		this._selectedType = 'All'
		this._priceFilter = ''
		this._cart = []
		makeAutoObservable(this)

		this.loadCartFromSessionStorage()
	}

	setPizzas(pizza) {
		this._pizzas = pizza
	}
	setSelectedType(selectedType) {
		this._selectedType = selectedType
	}
	setPriceFilter(priceFilter) {
		this._priceFilter = priceFilter
	}

	addToCart(item) {
		this._cart.push(item)

		this.saveCartToSessionStorage()
	}

	deleteFromCart(item) {
		this._cart = this._cart.filter(cartItem => cartItem !== item)

		this.saveCartToSessionStorage()
	}

	get pizza() {
		return this._pizzas
	}
	get selectedType() {
		return this._selectedType
	}
	get cart() {
		return this._cart
	}

	filterPrice(priceFilter, pizzas = this._pizzas) {
		return pizzas.slice().sort((a, b) => {
			if (priceFilter === 'expensive') {
				return b.price - a.price
			} else if (priceFilter === 'cheap') {
				return a.price - b.price
			}
			return 0
		})
	}

	filterByType() {
		let filteredPizzas = this._pizzas;

		if (this._selectedType !== 'All') {
			filteredPizzas = filteredPizzas.filter(pizza => pizza.name === this._selectedType)
		}

		filteredPizzas = this.filterPrice(this._priceFilter, filteredPizzas)

		return filteredPizzas
	}

	saveCartToSessionStorage() {
		sessionStorage.setItem('cart', JSON.stringify(this._cart))
	}

	loadCartFromSessionStorage() {
		const storedCart = sessionStorage.getItem('cart')

		if (storedCart) {
			this._cart = JSON.parse(storedCart)
		}
  	}
}