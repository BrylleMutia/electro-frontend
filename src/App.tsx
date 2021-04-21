import React, { useEffect } from "react";
import "./App.scss";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Showcase from "./components/Showcase";
import Featured from "./components/Featured";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";


function App(): JSX.Element {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="app">
            <Navbar />
          </div>
          <Showcase />
          <div className="app">
            <Featured />
          </div>
        </Route>
        <Route exact path="/auth" component={Auth} />
      </Switch>
    </Router>
  );
}

export default App;
