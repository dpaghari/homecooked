const express = require('express');
const usersRouter = new express.Router();
const verifyToken = require('../userAuth.js');
const usersCtrl = require("../Controllers/users.js");
const middleware = require("./middleware");

usersRouter.route('/')
  .post(middleware.formatNewUser, usersCtrl.create);

usersRouter.route('/authenticate')
  .post(middleware.formatNewUser, usersCtrl.authenticate);

usersRouter.route('/:id').get(usersCtrl.show);


module.exports= usersRouter;
