import React, { useState } from "react";
import styles from "./Cart.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { toggleCartDrawer } from "../../redux/cart/cartSlice";
import { numWithCommas } from "../../utils/filters"

import CartItem from "./CartItem";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

function Cart() {
  const { isCartOpen, cartItems, total } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleToggleDrawer = () => dispatch(toggleCartDrawer());

  const getCartContent = () => {
    if (cartItems.length) {
      return (
        <List className={styles.items}>
          {cartItems.map((item, index) => (
            <CartItem product={item.product} quantity={item.quantity} key={index} />
          ))}
        </List>
      );
    } else {
      return <div className={styles.items}>No items in cart.</div>;
    }
  };

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={handleToggleDrawer} elevation={5}>
      <div className={styles.drawer}>
        <h4>My Cart</h4>

        {getCartContent()}

        <div className={styles.cart_actions}>
          <ButtonGroup fullWidth aria-label="outlined primary button group">
            <Button variant="outlined" color="secondary" disableFocusRipple disableTouchRipple disableRipple>P {numWithCommas(total)}</Button>
            <Button variant="contained" color="primary" disableElevation disabled={!total}>Checkout</Button>
          </ButtonGroup>
        </div>
      </div>
    </Drawer>
  );
}

export default Cart;
