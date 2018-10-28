import React, { Component } from 'react';
import { Router, Route, Switch, Redirect  } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

import { Provider } from 'react-redux';
import Home from './components/Home';
import MovieDetail from './components/Movie/MovieDetail';
// import './App.css';
import '../src/css/app.css';

// Setting store
import { createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import MoviePopular from './components/MoviePopular';


const history = createBrowserHistory()
const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

let store = createStore(rootReducer, enhancers)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/moviepopular" component={MoviePopular}></Route>
              <Route exact path="/:Id" component={MovieDetail}></Route>
              <Redirect from='*' to='/' />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
