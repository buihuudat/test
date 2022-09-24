const router = require('express').Router()
const User = require('../models/user')
const { body } = require('express-validator')
const userController = require('../controllers/user')
const validation = require('../handler/validation')

router.post(
  '/signup',
  body('username').trim().isLength({ min: 8 }).withMessage(
    "username requires at least 8 characters"
  ),
  body('password').trim().isLength({ min: 8 }).withMessage(
    "password requires at least 8 characters"
  ),
  body('username').custom(value => {
    return User.findOne({username: value}).then(user => {
      if (user) {
        return Promise.reject("User already in use")
      }
    })
  }),
  validation,
  userController.signup,
)

router.post(
  '/signin',
  validation,
  userController.signin
)

router.put(
  '/update/:id',
  body('password').trim().isLength({min: 8}).withMessage(
    'password requires at least 8 characters'
  ),
  validation,
  userController.update
)

router.post(
  '/delete/:id',
  validation,
  userController.delete
)

router.post(
  '/get/:id',
  validation,
  userController.get
)

router.get(
  '/get_all',
  validation,
  userController.get_all
)

module.exports = router;