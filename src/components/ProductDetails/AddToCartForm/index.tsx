import React from "react";
import styles from "./AddToCartForm.module.scss";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface Props {
  price: string | number | undefined;
}

const AddToCartForm: React.FC<Props> = ({ price = 0 }) => {
  return (
    <Paper variant="outlined">
      <div className={styles.cart_form}>
        <div className={styles.availability}>
          <h5>Availability: <span>In stock</span></h5>
        </div>

        <h1 className={styles.price}>P {price.toLocaleString().replace(",", ", ")}</h1>

        <form>
          <TextField
            className={styles.quantity}
            label="Quantity"
            type="number"
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button fullWidth={true} variant="contained" color="primary" type="submit" disableElevation>
            Add to Cart
          </Button>
        </form>
      </div>
    </Paper>
  );
};

export default AddToCartForm;
