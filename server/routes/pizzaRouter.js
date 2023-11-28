const Router = require('express')
const pizzaController = require('../controllers/pizzaController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

const router = new Router();

router.post('/', checkRole('ADMIN'), pizzaController.create)
router.get('/', pizzaController.getAll)
router.get('/:id', pizzaController.getOne)
router.delete('/:id', pizzaController.delete)

module.exports = router