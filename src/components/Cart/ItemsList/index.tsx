import React from "react";
import styles from "./ItemsList.module.scss";
import { useAppSelector } from "../../../redux/hooks";

import CartItem from "./CartItem";
import List from "@material-ui/core/List";


function ItemsList() {
  const { cartItems } = useAppSelector(state => state.cart);

  return (
    <List className={styles.items}>
      {cartItems.map((item, index) => (
        <CartItem product={item.product} quantity={item.quantity} key={index} />
      ))}
    </List>
  );
}

export default ItemsList;
