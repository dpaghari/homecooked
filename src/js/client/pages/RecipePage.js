import React from "react";


export default class RecipePage extends React.Component {
  constructor() {
    super();
  }

  handleToggleRecipeDetail(idx, recipe) {
    this.setState({
      recipeDetail: {
        ...this.state.recipeDetail,
        isActive: !this.state.recipeDetail.isActive,
        edit: false,
        idx: idx,
        recipe: recipe
      }
    });
  }
}

