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
      <h1 className="c-meal-planner__headline">Meal Planner</h1>
      <div classname="c-meal-planner__body">
      </div>
    </section>);
  }
}
