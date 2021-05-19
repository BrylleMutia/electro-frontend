import React from "react";
import styles from "./CartPreview.module.scss";
import { useAppSelector } from "../../redux/hooks";

import { CartItem } from "../Cart"
import List from "@material-ui/core/List";

function CartPreview() {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <div>
      
    </div>
  );
}

export default CartPreview;
