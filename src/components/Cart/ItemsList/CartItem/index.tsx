import React, { useState } from "react";
import styles from "./CartItem.module.scss";
import { numWithCommas } from "../../../../utils/filters";
import { removeCartItem } from "../../../../redux/cart/cartSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { ProductInterface } from "../../../../redux/shop/types";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItem";
import QtyInput from "./QtyInput";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/RemoveCircleOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { RemoveButton } from "../../../StyledComponents";
import Overlay from "../../../Overlay";

interface Props {
  quantity: number;
  product: ProductInterface;
  toggleCart?: () => void
}

const CartItem: React.FC<Props> = ({ quantity, product, toggleCart }) => {
  const { product_name, product_image, price, id } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const openConfirmModal = () => {
    setIsModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveItem = () => {
    dispatch(removeCartItem({ id }));
    closeConfirmModal();
  };

  return (
    <ListItem disableGutters className={styles.cart_item}>
      <IconButton onClick={openConfirmModal}>
        <DeleteIcon />
      </IconButton>

      <div className={styles.product_image}>
        <Link to={`/product/${id}`} onClick={toggleCart}>
          <Overlay label="Details" fontSize="0.8rem">
            <img src={product_image} alt="cart-item" />
          </Overlay>
        </Link>
      </div>

      <div className={styles.details}>
        <h5 className={styles.name}>{product_name}</h5>
        <div className={styles.charge_details}>
          <QtyInput value={quantity} />
          <h4 className={styles.total}>P {numWithCommas(quantity * Number(price))}</h4>
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={closeConfirmModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Remove this item from your cart?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmModal}>Cancel</Button>
          <RemoveButton onClick={handleRemoveItem} autoFocus>
            Yes
          </RemoveButton>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};

export default CartItem;
