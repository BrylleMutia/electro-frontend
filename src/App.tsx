import React, { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { updateCartFromLocalStorage } from "./redux/cart/cartSlice";
import { loadDetails } from "./redux/auth/authSlice";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Disclaimer from "./components/Disclaimer";
import Cart from "./components/Cart";
import SellerProducts from "./components/SellerProducts";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import UnderConstruction from "./pages/UnderConstruction";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Summary from "./pages/Summary";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const toggleDisclaimer = () => setIsDisclaimerOpen((prev) => !prev);

  useEffect(() => {
    // get cart items from localstorage
    dispatch(updateCartFromLocalStorage());

    if (localStorage.getItem("token")) {
      // if token is present in LS, fetch details
      dispatch(loadDetails(1));
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("seen_disclaimer")) {
      setIsDisclaimerOpen(true);

      // save action to localstorage
      localStorage.setItem("seen_disclaimer", "true");
    }
  }, []);

  return (
    <Router>
      {/* for scroll restoration on navigation */}
      <ScrollToTop />

      <ExcludeNavFromPages excludedPages={["/auth", "/test"]}>
        <main>
          <Switch>
            {/* <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/" component={Home} /> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/summary" component={Summary} />
            <Route exact path="/search" component={Search} />
            <Route path="/product/:product_id" component={Product} />

            <Route exact path="/test" component={UnderConstruction} />
            <Route exact path="/auth" component={Auth} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </ExcludeNavFromPages>

      <Disclaimer isOpen={isDisclaimerOpen} toggleDisclaimer={toggleDisclaimer} />
    </Router>
  );
}

interface Props {
  excludedPages: string[];
}

const ExcludeNavFromPages: React.FC<Props> = ({ excludedPages, children }) => {
  const { userType } = useAppSelector((state) => state.auth);
  const location = useLocation();

  return (
    <>
      {!excludedPages.includes(location.pathname) && <Navbar buttonLabel={userType === "buyer"  || userType === null ? "My Cart" : "My Products"} disabledPages={["/checkout", "/payment"]} />}

      {children}

      {!excludedPages.includes(location.pathname) && <CallToAction />}

      {!excludedPages.includes(location.pathname) && (
        <div className="container">
          <Footer />
        </div>
      )}

      {userType === "buyer" || userType === null ? <Cart /> : <SellerProducts />}
    </>
  );
};

export default App;
