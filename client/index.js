import React from 'react';
import { render } from 'react-dom';
// import { Provider } from "react-redux";
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// import store from "./store";

import App from './pages/App';
import Home from './pages/Home';

// const history = syncHistoryWithStore(hashHistory, store);

render(
  <Router history={history}>
    <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/detail/:eventId" component={Detail}></Route>
    <Route path="/profiles/:userId" component={Profile}></Route>
    <Route path="/eventmap" component={EventMap}></Route>
    <Route path="/settings" component={Settings}></Route>
    <Route path="/memories" component={Memories}></Route>
    </Route>
  </Router>,
  document.getElementById('app'));
