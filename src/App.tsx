import React from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import Showcase from "./components/Showcase";
import Auth from "./components/Auth";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="app">
            <Navbar />
          </div>
          <Showcase />
        </Route>
        <Route exact path="/auth" component={Auth} />
      </Switch>
    </Router>
  );
}

export default App;
