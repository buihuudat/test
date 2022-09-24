const router = require('express').Router()
const userController = require('../controllers/user')
const validation = require('../handler/validation')

router.post(
  '/signup',
  validation.signup,
  userController.signup,
)

router.post(
  '/signin',
  userController.signin
)

router.put(
  '/update',
  validation.update,
  userController.update
)

router.post(
  '/delete/:username',
  userController.delete
)

router.post(
  '/get/:username',
  userController.get
)

router.get(
  '/get_all',
  userController.get_all
)

module.exports = router;