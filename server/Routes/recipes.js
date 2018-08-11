const express = require('express')
const recipeRouter = new express.Router()
const verifyToken = require('../userAuth.js')
const recipeCtrl = require("../Controllers/recipes.js")

recipeRouter.route('/get_recipes')
  .get(recipeCtrl.index)

recipeRouter.route('/add_recipe')
  .post(recipeCtrl.create)

recipeRouter.route('/get_recipes/:id')
  .get(recipeCtrl.show)

recipeRouter.route('/get_users_recipe/:id')
  .get(recipeCtrl.showPosts)








module.exports = recipeRouter