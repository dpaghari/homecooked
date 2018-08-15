import React from 'react';
import axios from 'axios';
import Login from '../components/Login';
import httpClient from '../../httpClient';


export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      global_recipes: []
    };
  }


  componentDidMount() {
    let { appState } = this.props;

    let userId = appState.currentUser._id;
    this.getGlobalRecipes(userId);
    console.log(this.state)
  }

  getGlobalRecipes(userId) {
    httpClient.allRecipesExceptUser(userId).then((response) => {
      if(response.length) {
        this.setState({
          global_recipes: response
        });
      }
    });
  }

  render() {
    let { appState, updateAppState } = this.props;

    if(appState.currentUser) {
      return (
        <div class="c-explore">
          <h1 class="c-explore__heading">Explore</h1>
          <div class="c-explore__page container">
            <section class="c-user-recipes container">
              {this.renderRecipesList()}
            </section>
          </div>
        </div>
      );
    }
    else {
      return <Login updateAppState={updateAppState.bind(this)} />;
    }
  }

  renderRecipesList() {
    let recipes = this.state.global_recipes;

    if(recipes.length > 0) {
      return recipes.map((recipe, idx) => {
        recipe.ingredients = typeof recipe.ingredients === 'string' ? JSON.parse(recipe.ingredients) : recipe.ingredients;
        recipe.instructions = typeof recipe.instructions === 'string' ? JSON.parse(recipe.instructions) : recipe.instructions;
        return this.renderRecipe(recipe, idx);
      });
    }
    else return null;
  }

  renderRecipe(recipe, idx) {
    const {
      name,
      imageUrl,
      cookingTime,
      user,
      servingSize,
      description
    } = recipe;
    const {
      hours,
      minutes,
      seconds
    } = cookingTime;

    let imgUrl = recipe.imageUrl ? recipe.imageUrl : './img/placeholder-recipe.jpg';

    return (
      <li key={idx} class="c-user-recipes__list-item">
        <div class="c-user-recipes__wrapper">
          <img class="c-user-recipes__image" src={imgUrl} alt={recipe.name} />
          <div class="c-user-recipes__info">
            <strong class=".c-recipe-detail__recipe-name">{recipe.name}</strong>
            <div class="c-user-recipes__user-lockup">
              <img src={user.imageUrl} class="c-user-recipes__user-image" />
              <span class="c-user-recipes__cook-time">
                {hours}
                {minutes}
                {seconds}
              </span>
              <span class="c-user-recipes__serving-size">
                {recipe.servingSize}
              </span>
            </div>
            <p class="c-user-recipes__blurb">{recipe.description}</p>
          </div>
        </div>
      </li>
    );
  }

  handleAddToCookbook(recipe_id) {
    let user_id =  this.props.appState.currentUser.user_id;
    axios.post('/api/add_follower_to_recipe', {
      recipe_id,
      follower_id: user_id
    })
    .then((response) => {

    })
    .catch((err) => {
      throw err;
    })
  }

  renderIngredientList(ingredients) {
    if(ingredients !== null && ingredients.length > 0) {
      return ingredients.map((ingredient, idx) => {
        return (
          <li key={idx} class="c-ingredient">
            <span>{ingredient.name}</span>
            <span>{ingredient.quantity}</span>
          </li>
        )
      });
    }
    else return null;
  }

  renderInstructionsList(instructions) {
    if(instructions !== null && instructions.length > 0) {
      return instructions.map((instruction, idx) => {
        return (
          <li key={idx} class="c-instruction">
            <p>{instruction.name}</p>
          </li>
        );
      });
    }
    else return null;
  }

}
