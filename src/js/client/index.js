import React from 'react';
import { render } from 'react-dom';
// import { Provider } from "react-redux";
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// import store from "./store";

import App from './pages/App';
import Home from './pages/Home';
import Cookbook from './pages/Cookbook';
import Settings from './pages/Settings';
import Explore from './pages/Explore';
import GroceryList from './pages/GroceryList';

// const history = syncHistoryWithStore(browserHistory, store);

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/cookbook" component={Cookbook} />
      <Route path="/grocery-list" component={GroceryList} />
      <Route path="/settings" component={Settings} />
      <Route path="/explore" component={Explore} />
    </Route>
  </Router>,
  document.getElementById('app')
);
