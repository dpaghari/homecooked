const Recipe = require('../Models/Recipes.js');
require('dotenv').config();
const { signToken, verifyToken } = require('../userAuth.js');
"use strict";
module.exports = {
  index: (req,res)=>{
    Recipe.find({}).populate('user', '_id name imageUrl location').exec((err,allDemRecipes) => {
      if (err) return err;
      // let allRecipes = allDemRecipes.map((el, idx) => {
      //   el.user.email = undefined;
      //   el.user.password = undefined;
      //   return el;
      // });
      res.json(allDemRecipes);
    });
  },
  create: (req,res)=>{
    Recipe.create(req.body, (err,newRecipe)=>{
      if (err) return err;
      res.json({success: true, message: "recipe created", newRecipe});
    });
  },
  show: (req,res) =>{
    Recipe.findById(req.params.id, (err, datRecipe)=>{
      if (err) return err;
      res.json(datRecipe);
    });
  },
  showPosts: (req,res)=>{
    Recipe.find({'user': req.params.id}, (err, usersRecipe)=>{
      if (err) return err;
      res.json(usersRecipe);
    });
  },
  update: (req,res)=>{
    Recipe.findById(req.params.id, (err,recipe)=>{
      Object.assign(recipe, req.body);
      recipe.save((err,updatedRecipe)=>{
        if (err) return err;
        res.json({success: true, message: "recipe updated", updatedRecipe});
      });
    });
  },
  destroy: (req,res)=>{
    Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe)=>{
      res.json({message: "recipe deleted", deletedRecipe});
    });
  }

};
