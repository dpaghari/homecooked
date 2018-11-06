import React from "react";


export default class RecipePage extends React.Component {
  constructor(props) {
    super();
  }

  handleToggleRecipeDetail(idx) {
    this.setState({
      recipeDetail: {
        ...this.state.recipeDetail,
        isActive: !this.state.recipeDetail.isActive,
        edit: false,
        idx: idx
      }
    });
  }

  handleSetRecipe(recipe) {
    this.setState({
      recipeDetail: {
        recipe
      }
    });
  }


}

