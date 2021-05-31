import React from "react";
import styles from "./Buyer.module.scss";
import { Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "../../components/PaymentForm";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { StyledBreadcrumb } from "../../components/StyledComponents";
import HomeIcon from "@material-ui/icons/Home";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// loadStripe is async
const stripeKey: string = process.env.REACT_APP_STRIPE_KEY as string;
const stripe = loadStripe(stripeKey);

function Payment() {
  return (
    <div className={styles.container}>
      <div className={styles.checkout_nav}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">
            <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} />
          </Link>
          <Link to="/checkout">
            <StyledBreadcrumb label="Checkout" />
          </Link>
          <StyledBreadcrumb label="Payment" />
        </Breadcrumbs>
      </div>

      <div className={styles.my_lg}>
        <Elements stripe={stripe}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
}

export default Payment;
