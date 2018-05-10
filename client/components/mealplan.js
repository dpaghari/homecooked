import React from 'react';


export default class MealPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <section class="c-mealplan">
        <div class="c-mealplan__header">Jan 7 - 13</div>
        <div class="c-menu">
          <div class="c-menu__day">
            <span class="c-menu__day__label">Mon</span>
            <ul class="c-menu__day__list"></ul>
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Tue</span>
            <ul class="c-menu__day__list"></ul>
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Wed</span>
            <ul class="c-menu__day__list"></ul>
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Thu</span>
            <ul class="c-menu__day__list"></ul>
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Fri</span>
            <ul class="c-menu__day__list"></ul>
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Sat</span>
            <ul class="c-menu__day__list"></ul>
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Sun</span>
            <ul class="c-menu__day__list"></ul>
          </div>
        </div>
      </section>
    );
  }
}
