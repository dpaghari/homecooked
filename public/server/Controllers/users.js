const User = require('../Model/Users.js')
require('dotenv').config()
const { signToken } = require('../userAuth.js')

module.exports = {
  // show all users
  index: (req,res) =>{
    User.find({}, (err, demUsers)=>{
      if (err) return err
      res.json(demUsers)
    })
  },
  // show a specific user
  show:(req,res)=>{
    User.findById(req.params.id, (err, datUser)=>{
      if (err) return err
      res.json(datUser)
    })
  },
  // make sure log in is correct
  authenticate: (req, res) => {
    // query defines whether to find by username or email depending on the users input
    const query={
      $or:[{'name': req.body.name},{'email': req.body.name}]
  }
   // check if the username or email exists
		User.findOne(query, (err, user) => {
      console.log(user)
			// if there's no user or the password is invalid
			if(!user || !user.validPassword(req.body.password)) {
				// deny access
				return res.json({success: false, message: "Invalid credentials."})
			}

			const token = signToken(user)
			res.json({success: true, message: "Token attached.", token})
		})
  },
  //creates user
  create: (req, res) => {
		User.create(req.body, (err, user) => {
			if(err) return res.json({success: false, code: err.code})
			// once user is created, generate a token to "log in":
			const token = signToken(user)
			res.json({success: true, message: "User created. Token attached.", token})
		})
  },
  //updates user info
  update: (req, res)=>{
    User.findById(req.params.id, (err, user) => {
			if(!req.body.password) delete req.body.password
			Object.assign(user, req.body)
			user.save((err, updatedUser) => {
				if (err) console.log(err)
				res.json({success: true, message: "User updated.", updatedUser})
			})
		})
  },
  //deletes user from database forever
  destroy: (req, res)=>{
    User.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
      res.json({success:true, message: deletedUser + "removed from database"})
    })
  }
}