const express = require('express')
const usersRouter = new express.Router()
const verifyToken = require('../userAuth.js')

usersRouter.route('/')
  .post(usersCtrl.create)