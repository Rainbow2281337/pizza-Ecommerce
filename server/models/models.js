const mongoose = require('mongoose')


const user = new mongoose.Schema({
	id: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	role: {type: String, default: 'USER'}
})

const order = new mongoose.Schema({
	customerID: {type: String, required: true},
})

const pizza = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},
	img: {type: String}
})

const Pizza = mongoose.model('Pizza', pizza)
const User = mongoose.model('User', user)
const Order = mongoose.model('Order', order)


module.exports = {
	User,
	Order,
	Pizza
}