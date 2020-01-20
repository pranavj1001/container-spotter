import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tool from './components/tool/tool';
import Home from './components/home/home';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/tool">
            <Tool />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
