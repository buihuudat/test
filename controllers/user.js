const co = require('co')
const User = require('../models/user')
const CryptoJS = require('crypto-js')

const admin_account = require('../Data/admin-account.json')

module.exports = {
  signin: (req, res) => {
    const {username, password} = req.body
    co(function* () {
      const user = yield User.findOne({username: username})
      
      if (user) {
        const decryptedPass = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
        if (decryptedPass === password) {
          return user
        }
      }
      return res.status(401).json({
        errors: [{
          param: 'password',
          msg: 'Incorrect username or password',
        }]
      })
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  // CRUD
  signup: (req, res) => {
    const { password } = req.body
    co(function* () {
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
      )
      const user = yield User.create(req.body)
      return user
    })
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json(err))
  },

  update: (req, res) => {
    const { id } = req.params
    const { password } = req.body
    co(function* () {
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
        ).toString()
        console.log(req.body);
      const user = yield User.findByIdAndUpdate(id, req.body)
      return user
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  delete: (req, res) => {
    const {id} = req.params
    co(function* () {
      yield User.findByIdAndDelete(id)
      return Promise.resolve("Deleted user")
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  get: (req, res) => {
    const { id } = req.params
    co(function* () {
      const user = yield User.findById(id)
      return user
    })
    .then(data => res.status(200).json(data))
    .catch(() => res.status(500).json({message: "Invalid User"}))
  },

  get_all: (req, res) => {
    co(function* () {
      const isAdmin = yield User.find({role: "admin"})
      if (!isAdmin.length) {
        yield admin_account.map(acc => {
          acc.password = CryptoJS.AES.encrypt(
            acc.password,
            process.env.PASSWORD_SECRET_KEY
          ).toString()
          User.create({...acc, role: 'admin'})
        })
      }
      const users = yield User.find()
      return users
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  }
}