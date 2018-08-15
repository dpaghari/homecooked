const express = require('express');
const usersRouter = new express.Router();
const verifyToken = require('../userAuth.js');
const usersCtrl = require("../Controllers/users.js");

usersRouter.route('/')
  .post(usersCtrl.create);

usersRouter.route('/authenticate')
  .post(usersCtrl.authenticate);

usersRouter.route('/:id').get(usersCtrl.show);


module.exports= usersRouter;
