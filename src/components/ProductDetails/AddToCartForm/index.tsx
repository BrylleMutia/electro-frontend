import React, { useState } from "react";
import styles from "./AddToCartForm.module.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { addItemToCart } from "../../../redux/cart/cartSlice";
import { numWithCommas } from "../../../utils/filters";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ProductDetailsInterface } from "../../../redux/shop/types";

interface Props {
  product: ProductDetailsInterface;
}

const AddToCartForm: React.FC<Props> = ({ product }) => {
  const { price } = product;

  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  const handleAddItemToCart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let itemDetails = {
      quantity,
      product,
    };

    dispatch(addItemToCart(itemDetails));
  };

  return (
    <Paper variant="outlined">
      <div className={styles.cart_form}>
        <div className={styles.availability}>
          <h5>
            Availability: <span>In stock</span>
          </h5>
        </div>

        <h1 className={styles.price}>P {numWithCommas(price)}</h1>

        <form onSubmit={handleAddItemToCart}>
          <TextField
            className={styles.quantity}
            label="Quantity"
            type="number"
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))}
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
