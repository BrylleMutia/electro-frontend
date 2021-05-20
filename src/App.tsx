import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { updateCartFromLocalStorage } from "./redux/cart/cartSlice";
import { loadDetails } from "./redux/auth/authSlice";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import UnderConstruction from "./pages/UnderConstruction";
import Checkout from "./pages/Checkout";
import Cart from "./components/Cart";

function App(): JSX.Element {
  const { userType } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // get cart items from localstorage
    dispatch(updateCartFromLocalStorage());

    // get user details using token from LS
    // dispatch(loadDetails(userType));
  }, []);

  return (
    <Router>
      <Switch>
        {/* <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/" component={Home} /> */}
        {/* {location.pathname !== "/auth" && <Navbar />} */}
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/test" component={UnderConstruction} />
        <Route path="/product/:id" component={Product} />
        <Route path="*" component={NotFound} />
      </Switch>

      <Cart />
    </Router>
  );
}

export default App;
