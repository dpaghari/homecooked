import React from 'react';
import { render } from 'react-dom';
// import { Provider } from "react-redux";
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// import store from "./store";

import App from './pages/App';
import Home from './pages/Home';


// const history = syncHistoryWithStore(browserHistory, store);

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    </Route>
  </Router>,
  document.getElementById('app'));
