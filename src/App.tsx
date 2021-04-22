import React, { useEffect } from "react";
import "./App.scss";
import AuthForm from "./components/AuthForm";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useAppSelector } from "./redux/hooks";

function App(): JSX.Element {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Switch>
        {/* <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/" component={Home} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={AuthForm} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
