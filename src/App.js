import React from 'react';
import { Header } from './components/common'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 
import './App.css';
import Routers from './router/index'

import Login from './starter/Login'
import Register from './starter/Register'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path={["/tracker", "/budget", "/account"]} component={Header} />
        <Switch>
          <Routers />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
