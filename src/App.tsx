import React, { useEffect } from "react";
import "./App.scss";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UnderConstruction from "./pages/UnderConstruction";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        {/* <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/" component={Home} /> */}
        {/* {location.pathname !== "/auth" && <Navbar />} */}
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/test" component={UnderConstruction} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
