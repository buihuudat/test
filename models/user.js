const mongoose = require('mongoose')

const USerModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  fullName: String,
  role: {
    type: String,
    default: "user",
  }
}, {timestamps: true})

module.exports = mongoose.model("User", USerModel)