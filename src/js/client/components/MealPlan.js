import React from 'react';

export default class MealPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: '',
      currentDate: '',
      currentDay: ' '
    };
  }

  componentDidMount() {
    var today = new Date();
    var day = today.getDay();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var startOfTheWeek;
    var endOfTheWeek;
    if (day) {
      startOfTheWeek = mm + '/' + (dd - day) + '/' + yyyy;
      endOfTheWeek = mm + '/' + (dd + (6 - day)) + '/' + yyyy;
    }
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = mm + '/' + dd + '/' + yyyy;
    this.setState({
      currentWeek: startOfTheWeek + '-' + endOfTheWeek,
      currentDate: today,
      currentDay: day
    });
  }

  render() {
    return (
      <section class="c-mealplan">
        <div class="c-mealplan__header">
          {this.state.currentDate}
          <br />
          {this.state.currentDay}
          <br />
          {this.state.currentWeek}
          <br />
        </div>
        <div class="c-menu">
          <div class="c-menu__day">
            <span class="c-menu__day__label">Sun</span>
            <ul class="c-menu__day__list" />
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Mon</span>
            <ul class="c-menu__day__list" />
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Tue</span>
            <ul class="c-menu__day__list" />
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Wed</span>
            <ul class="c-menu__day__list" />
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Thur</span>
            <ul class="c-menu__day__list" />
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Fri</span>
            <ul class="c-menu__day__list" />
          </div>
          <div class="c-menu__day">
            <span class="c-menu__day__label">Sat</span>
            <ul class="c-menu__day__list" />
          </div>
        </div>
        <button>next week</button>
      </section>
    );
  }
}
