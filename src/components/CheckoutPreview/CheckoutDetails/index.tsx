import React from "react";
import styles from "./CheckoutDetails.module.scss";
import { useAppSelector } from "../../../redux/hooks";

import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function CheckoutDetails() {
  const { isAuthenticated, userDetails } = useAppSelector((state) => state.auth);

  if (!isAuthenticated)
    return (
      <div className={styles.alert}>
        <h4>Checkout Preview</h4>
        <p>This order will be delivered to:</p>
        <Alert icon={<HighlightOffIcon />} color="error">
          Please <Link to="/auth">register</Link> or <Link to="/auth">login</Link> first.
        </Alert>
      </div>
    );

  return (
    <main className={styles.checkout_details}>
      <h4>Checkout Preview</h4>
      <p>This order will be delivered to:</p>

      <div className={styles.details}>
        <form>
          <TextField className={styles.detail_input} variant="standard" disabled value={userDetails?.name} label="Name" />
          <TextField className={styles.detail_input} variant="standard" disabled value={userDetails?.address ?? ""} label="Address" />
          <TextField className={styles.detail_input} variant="standard" disabled value={userDetails?.barangay} label="Barangay" />
          <TextField className={styles.detail_input} variant="standard" disabled value={userDetails?.city} label="City" />
          <TextField className={styles.detail_input} variant="standard" disabled value={userDetails?.province} label="Province" />
          <TextField className={styles.detail_input} variant="standard" disabled value={userDetails?.zip_code} label="Zip Code" />
          <TextField className={styles.detail_input} variant="standard" disabled value={userDetails?.email} label="Email" />
          <TextField className={styles.detail_input} variant="standard" disabled value={userDetails?.phone} label="Phone" />
        </form>
      </div>
    </main>
  );
}

export default CheckoutDetails;
