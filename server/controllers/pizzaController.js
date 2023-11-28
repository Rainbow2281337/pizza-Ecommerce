const {Pizza} = require('../models/models.js')
const ApiError = require('../Error/ApiError')
const uuid = require('uuid')
const path = require('path')

class PizzaController {
	async create(req, res, next) {
		try {
			const {name, description, price} = req.body
			const {img} = req.files
			let fileName = uuid.v4() + ".jpg"

			img.mv(path.resolve(__dirname, '..', 'static', fileName))

			const pizza = await Pizza.create({name, description, price, img: fileName})

			return res.json(pizza)
		} catch(e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getOne(req, res, next) {
		try {
			const {id} = req.params
			const pizza = await Pizza.findById(id)

			if (!id) {
				return next(ApiError.badRequest('Id not found'))
			}

			return res.json(pizza)
		} catch (e) {
			next(ApiError.internal(e.message))
		}
	}

	async getAll(req, res, next) {
		try {
			const pizza = await Pizza.find()

			return res.json(pizza)
		} catch (e) {
			next(ApiError.internal(e.message))
		}
	}

	async delete(req, res, next) {
		try {
			const {id} = req.params
			const pizza = await Pizza.findByIdAndDelete(id)

			if (!id) {
				return next(ApiError.badRequest('Id not found'))
			}

			return res.json(pizza)
		} catch (e) {
			next(ApiError.internal(e.message))
		}
	}
}

module.exports = new PizzaController()