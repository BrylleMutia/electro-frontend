import React, { useState } from "react";
import styles from "./Cart.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { toggleCartDrawer } from "../../redux/cart/cartSlice";
import { numWithCommas } from "../../utils/filters";
import { Link } from "react-router-dom";

import ItemsList from "./ItemsList";
import CartItem from "./ItemsList/CartItem";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

function Cart() {
  const { isCartOpen, cartItems, total } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleToggleDrawer = () => dispatch(toggleCartDrawer());

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={handleToggleDrawer} elevation={5}>
      <div className={styles.drawer}>
        <h4>My Cart</h4>

        {cartItems.length ? <ItemsList items={cartItems} /> : <div className={styles.items}>No items in cart.</div>}

        <div className={styles.cart_actions}>
          <ButtonGroup fullWidth aria-label="outlined primary button group">
            <Button variant="outlined" color="secondary" disableFocusRipple disableTouchRipple disableRipple>
              P {numWithCommas(total)}
            </Button>
            <Button component={Link} onClick={handleToggleDrawer} to="/checkout" variant="contained" color="primary" disableElevation disabled={!total}>
              Checkout
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Drawer>
  );
}

export default Cart;
export { ItemsList, CartItem };
