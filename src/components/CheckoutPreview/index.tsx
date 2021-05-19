import React from "react";
import styles from "./CheckoutPreview.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { numWithCommas } from "../../utils/filters";

import { ItemsList } from "../Cart";
import CheckoutDetails from "./CheckoutDetails";
import Button from "@material-ui/core/Button";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function CartPreview() {
  const { total } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <main className={styles.checkout_preview}>
      <CheckoutDetails />
      <div className={styles.list_container}>
        <div className={styles.items_list}>
          <ItemsList />
        </div>
        <div className={styles.total}>
          <h4>TOTAL:</h4>
          <h4>P {numWithCommas(total)}</h4>
        </div>
        <Button startIcon={<CheckCircleIcon />} disabled={!isAuthenticated} style={{ alignSelf: "flex-end" }} disableElevation variant="contained" color="primary">
          Continue to checkout
        </Button>
      </div>
    </main>
  );
}

export default CartPreview;
