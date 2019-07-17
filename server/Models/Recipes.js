const mongoose = require('mongoose');
const User = require('./Users.js');

const recipeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //Belongs to the user who created it
  name: { type: String },
  imageUrl: { type: String },
  cookingTime: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 }
  },
  servingSize: { type: String },
  description: { type: String },
  ingredients: [{ name: String, quantity: Number }],
  instructions: [{ name: String }],
  tags: [{ name: String }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
