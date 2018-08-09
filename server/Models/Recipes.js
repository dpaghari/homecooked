const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //Belongs to the user who created it
  name:({type:String}),
  imageUrl: ({type:String}),
  cookingTime: {
    hours:Number,
    minutes:Number,
    seconds: Number
  },
  servingSize: ({type: Number}),
  description: ({type: String})

});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
