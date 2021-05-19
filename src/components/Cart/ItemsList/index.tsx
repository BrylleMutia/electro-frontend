import React from "react";
import styles from "./ItemsList.module.scss";

import CartItem from "./CartItem";
import List from "@material-ui/core/List";
import { CartItemInterface } from "../../../redux/cart/types";


interface Props {
  items: CartItemInterface[]
}

const ItemsList: React.FC<Props> = ({ items }) => {
  return (
    <List className={styles.items}>
      {items.map((item, index) => (
        <CartItem product={item.product} quantity={item.quantity} key={index} />
      ))}
    </List>
  );
}

export default ItemsList;
