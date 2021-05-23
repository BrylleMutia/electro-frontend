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
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ChevronLeft from "@material-ui/icons/ChevronLeft";

function Cart() {
  const { isCartOpen, cartItems, total } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleToggleDrawer = () => dispatch(toggleCartDrawer());

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={handleToggleDrawer} elevation={5}>
      <div className={styles.drawer}>
        <div className={styles.cart_header}>
          <span className={styles.back} onClick={handleToggleDrawer}>
            <ChevronLeft />
          </span>
          <h4>My Cart</h4>
        </div>

        {cartItems.length ? <ItemsList /> : <div className={styles.items}>No items in cart.</div>}

        <div className={styles.cart_actions}>
          <ButtonGroup fullWidth aria-label="outlined primary button group">
            <Button variant="outlined" color="secondary" disableFocusRipple disableTouchRipple disableRipple>
              P {numWithCommas(total)}
            </Button>
            <Button endIcon={<NavigateNextIcon />} component={Link} onClick={handleToggleDrawer} to="/checkout" variant="contained" color="primary" disableElevation disabled={!total}>
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
