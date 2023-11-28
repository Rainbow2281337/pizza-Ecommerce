const Router = require('express')
const router = new Router();
const orderRouter = require('./orderRouter')
const pizzaRouter = require('./pizzaRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/order', orderRouter)
router.use('/pizza', pizzaRouter)

module.exports = router