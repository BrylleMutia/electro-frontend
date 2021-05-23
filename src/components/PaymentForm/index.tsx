import React, { useState } from "react";
import styles from "./PaymentForm.module.scss";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { UserDetails } from "../../redux/auth/types";
import { confirmPurchase } from "../../redux/cart/cartSlice";

import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

export interface PurchaseDetails extends UserDetails {
  payment_method_id: string;
  amount: number;
  cart: string;
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();

  const { userDetails } = useAppSelector((state) => state.auth);
  const { total, cartItems, isLoading } = useAppSelector((state) => state.cart);

  const [isPaymentLoading, setPaymentLoading] = useState(false);

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    // REFER TO STRIPE DOCS FOR MORE DETAILS
    // send payment information to Laravel + stripe backend
    e.preventDefault();

    if (!stripe || !elements || !userDetails) {
      return;
    }

    setPaymentLoading(true);

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        address: {
          line1: userDetails.address ?? "Not specified",
          city: userDetails.city,
          state: userDetails.province,
          postal_code: userDetails.zip_code,
        },
      },
    });

    setPaymentLoading(false);

    if (error) {
      alert(error.message);
    } else {
      if (paymentMethod) {
        let purchaseDetails: PurchaseDetails = {
          ...userDetails,
          payment_method_id: paymentMethod?.id,
          amount: total,
          cart: JSON.stringify(cartItems),
        };

        // axios request here
        dispatch(confirmPurchase(purchaseDetails));

        // redirect to summary page
      }
    }
  };

  return (
    <div className={styles.payment_form}>
      <Alert className={styles.alert} severity="info">
        As of now, the platform only accepts payments through <strong>card.</strong>
      </Alert>
      <Alert className={styles.alert} severity="info">
        For testing purposes, you can use the following details: <br />{" "}
        <ul>
          <li>Card number: 4242 4242 4242 4242</li>
          <li>CVC/EXP/ZIP: any (number)</li>
        </ul>
      </Alert>

      <form onSubmit={processPayment}>
        <CardElement
          className={styles.payment_card}
          options={{
            style: {
              base: {
                backgroundColor: "white",
              },
            },
          }}
        />
        <Button type="submit" variant="contained" color="primary" disableElevation disabled={isPaymentLoading || isLoading}>
          {isPaymentLoading || isLoading ? "Processing..." : "Pay"}
        </Button>
      </form>
    </div>
  );
}

export default PaymentForm;
