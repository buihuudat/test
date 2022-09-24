
module.exports = {
  signup : (req, res, next) => {
    const { username, password } = req.query
    if (username.length < 8) {
      return res.status(500).json({
        message: "username must be at least 8 characters"
      })
    }
    if (password.length < 8) {
      return res.status(500).json({
        message: "Password must be at least 8 characters"
      })
    }
    return next()
  },

  update: (req, res, next) => {
    const { password } = req.query
    if (password.length < 8) {
      return res.status(500).json({
        message: "Password must be at least 8 characters"
      })
    }
    return next()
  }
}
