const User = require('../Model/Users.js')
require('dotenv').config()
const { signToken } = require('../userAuth.js')

module.exports = {
  authenticate: (req, res) => {
    User.create(req.body, (err, user)=>{
      if (err) return res.json ({success: false, code: err.code})
      const token = signToken(user)
      res.json({success: true, message: 'user created, token attached', token})
    })
  },
  create: (req, res) => {
		User.create(req.body, (err, user) => {
			if(err) return res.json({success: false, code: err.code})
			// once user is created, generate a token to "log in":
			const token = signToken(user)
			res.json({success: true, message: "User created. Token attached.", token})
		})
	}
}