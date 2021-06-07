import React, { useEffect, useState } from "react";
import "./App.scss";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { updateCartFromLocalStorage } from "./redux/cart/cartSlice";
import { loadDetails } from "./redux/auth/authSlice";
import { SellerHome, BuyerHome } from "./components/HomeLink";

import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Disclaimer from "./components/Disclaimer";
import Cart from "./components/Cart";
import Notify from "./components/Notify";
import Auth from "./pages/Auth";
import Home from "./pages/buyer/Home";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import UnderConstruction from "./pages/UnderConstruction";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Checkout from "./pages/buyer/Checkout";
import Payment from "./pages/buyer/Payment";
import Summary from "./pages/buyer/Summary";
import Dashboard from "./pages/seller/Dashboard";
import AddProduct from "./pages/seller/AddProduct";

function App(): JSX.Element {
  const { userType, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

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
    // restrict seller access to buyer homepage
    if (userType === "seller" && location.pathname === "/") {
      history.push(SellerHome);
    }
  }, [location.pathname, userType]);

  useEffect(() => {
    if (!localStorage.getItem("seen_disclaimer")) {
      setIsDisclaimerOpen(true);

      // save action to localstorage
      localStorage.setItem("seen_disclaimer", "true");
    }
  }, []);

  return (
    <main>
      {/* for scroll restoration on navigation */}
      <ScrollToTop />

      <ExcludeNavFromPages excludedPages={["/auth", "/test"]}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/summary" component={Summary} />
          <Route exact path="/search" component={Search} />

          <ProtectedRoute isAuthenticated={isAuthenticated} path="/seller/dashboard" component={Dashboard} />
          <ProtectedRoute isAuthenticated={isAuthenticated} path="/product/new" component={AddProduct} />

          <Route path="/product/:product_id" component={Product} />

          <Route exact path="/test" component={UnderConstruction} />
          <Route exact path="/auth" component={Auth} />
          <Route path="*" component={NotFound} />
        </Switch>
      </ExcludeNavFromPages>

      <Disclaimer isOpen={isDisclaimerOpen} toggleDisclaimer={toggleDisclaimer} />
    </main>
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
      {!excludedPages.includes(location.pathname) && <Navbar buttonLabel={userType === "buyer" || userType === null ? "My Cart" : "My Products"} disabledPages={["/checkout", "/payment"]} />}

      {children}

      {!excludedPages.includes(location.pathname) && <CallToAction />}

      {!excludedPages.includes(location.pathname) && (
        <div className="container">
          <Footer />
        </div>
      )}

      <Cart />

      {/* for notifications / toast */}
      <Notify />
    </>
  );
};

export default App;
