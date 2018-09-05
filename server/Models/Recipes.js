const mongoose = require('mongoose');
const User = require('./Users.js');

const recipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    trim: true
  }, //Belongs to the user who created it
  name:({type:String}),
  imageUrl: ({type:String}),
  cookingTime: {
    hours:String,
    minutes:String
  },
  servingSize: ({type: String}),
  description: ({type: String}),
  ingredients:[
    {
      name:String,
      quantity:String
    }
  ],
  instructions:[{name:String}]
  // refRecipe: { type: mongoose.Schema.Types.ObjectId}
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
