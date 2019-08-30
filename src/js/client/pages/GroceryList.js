import React from 'react';

import httpClient from '../../httpClient.js';

export default class GroceryList extends React.Component {
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
    <section className="c-grocery-list container">
      <h1 className="c-grocery-list__headline">Grocery List</h1>
      <div className="c-grocery-list__body">
        <ul className="c-grocery-list__list">
          <li className="c-grocery-list__item">
            Cucumber Tomato Salad
          </li>
          <li className="c-grocery-list__item">
            Blueberry Banana Bread
          </li>
          <li className="c-grocery-list__item">
            Pork Adobo
          </li>
        </ul>
      </div>
    </section>);
  }
}
