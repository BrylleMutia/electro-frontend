import React from "react";
import styles from "./CartItem.module.scss";
import { numWithCommas } from "../../../utils/filters";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItem";
import { ProductInterface } from "../../../redux/shop/types";
import QtyInput from "./QtyInput";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/RemoveCircleOutline";

interface Props {
  quantity: number;
  product: ProductInterface;
}

const CartItem: React.FC<Props> = ({ quantity, product }) => {
  const { product_name, product_image, price } = product;

  return (
    <ListItem disableGutters className={styles.cart_item}>
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <img src={product_image} alt="cart-item" />
      <div className={styles.details}>
        <h5 className={styles.name}>{product_name}</h5>
        <div className={styles.charge_details}>
          <QtyInput value={quantity} />
          <h4 className={styles.total}>P {numWithCommas(quantity * Number(price))}</h4>
        </div>
      </div>
    </ListItem>
  );
};

export default CartItem;
