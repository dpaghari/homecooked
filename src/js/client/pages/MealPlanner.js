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
    <section className="c-meal-planner container">
      <h1 className="c-meal-planner__headline">Meal Planner</h1>
      <div className="c-meal-planner__body">
        <button className="c-meal-planner__add-btn">Add meal</button>
        <ul className="c-meal-planner__meals">
          <li className="c-meal-planner__meal">
            Cucumber Tomato Salad
          </li>
          <li className="c-meal-planner__meal">
            Blueberry Banana Bread
          </li>
          <li className="c-meal-planner__meal">
            Pork Adobo
          </li>
        </ul>
      </div>
    </section>);
  }
}
