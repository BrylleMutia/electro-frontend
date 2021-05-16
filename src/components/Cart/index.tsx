import React, { useState } from "react";
import styles from "./Cart.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { toggleCartDrawer } from "../../redux/cart/cartSlice";

import CartItem from "./CartItem";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";

function Cart() {
  const { isCartOpen, cartItems } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleToggleDrawer = () => dispatch(toggleCartDrawer());

  const getCartContent = () => {
    if (cartItems.length) {
      return (
        <List>
          {cartItems.map((item, index) => <CartItem product={item.product} quantity={item.quantity} key={index} />)}
        </List>
      );
    } else {
      return <div className={styles.empty}>No items in cart.</div>;
    }
  };

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={handleToggleDrawer} elevation={5}>
      <div className={styles.drawer}>
        <h4>My Cart</h4>
        
        {getCartContent()}
      </div>
    </Drawer>
  );
}

export default Cart;
