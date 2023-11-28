const ApiError = require('../Error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Order } = require('../models/models.js'); // Mongoose models

const generateJWT = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
}

class UserController {
  async registration(req, res, next) {
    const { id, email, password, role } = req.body

    if (!email || !password) {
      return next(ApiError.badRequest('Incorrect email or password'))
    }

    // Find if the user already exists in the database
    const candidate = await User.findOne({ email })

    if (candidate) {
      return next(ApiError.badRequest('User with such email already exists'))
    }

    // Hash the password and create a new user
    const hashPassword = await bcrypt.hash(password, 5)

    const user = new User({ id, email, role, password: hashPassword })
    await user.save()

    // Create an order associated with the new user
    const order = new Order({ customerID: user._id })
    await order.save()

    // Generate a JWT token
    const token = generateJWT(user._id, user.email, user.role)

    return res.json({ token })
  }

  async login(req, res, next) {
    const { email, password } = req.body

    // Find the user by email in the database
    const user = await User.findOne({ email })

    if (!user) {
      return next(ApiError.internal('User not found'))
    }

    // Compare the provided password with the stored hashed password
    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
      return next(ApiError.internal('Bad password'))
    }

    // Generate a JWT token
    const token = generateJWT(user._id, user.email, user.role)

    return res.json({ token })
  }

  async check(req, res, next) {
	const token = generateJWT(req.user._id, req.user.email, req.user.role)

	return res.json({ token })
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.params

      const users = await User.findByIdAndDelete(id);

      res.json(users);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new UserController();
