import React from 'react';

import httpClient from '../../httpClient.js';

export default class MealPlanner extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let { appState } = this.props;
  }

  componentDidMount() {
    
  }

  render() {
    return (
    <section className="c-meal-planner">
      <h1>Meal Planner</h1>
      
    </section>);
  }
}
