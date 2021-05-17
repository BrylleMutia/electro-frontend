import React from "react";
import styles from "./Product.module.scss";
import { AddShoppingCart } from "@material-ui/icons";
import type { ProductInterface } from "../../../../redux/shop/types";
import cx from "classnames";
import { Link } from "react-router-dom";
import { numWithCommas } from "../../../../utils/filters";
import { useAppDispatch } from "../../../../redux/hooks";
import { addItemToCart } from "../../../../redux/cart/cartSlice";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";

interface Props {
  productDetails: ProductInterface;
  index: number;
  showcaseFirstItem?: boolean;
}

const Product: React.FC<Props> = ({ productDetails, index, showcaseFirstItem = false }) => {
  const { id, product_name, product_image, price } = productDetails;
  const dispatch = useAppDispatch();

  const handleAddItemToCart = () => {
    let newItemDetails = {
      product: productDetails,
      quantity: 1,
    };

    dispatch(addItemToCart(newItemDetails));
  };

  const matches = useMediaQuery("(max-width: 768px)");

  return (
    <div className={styles.product}>
      <Link to={`/product/${id}`}>
        <div className={styles.name_wrapper}>
          <Typography className={styles.product_name} variant="body1" color="secondary">
            {product_name}
          </Typography>
        </div>
        <div className={cx(styles.overlay_container, styles.product_image)}>
          <img key={index} src={product_image} alt="product" />
          <div className={styles.overlay}>
            <div className={styles.overlay_text}>See Details</div>
          </div>
        </div>
      </Link>
      <div className={styles.details}>
        <Typography variant="body2" style={{ opacity: 0.6 }}>
          P {numWithCommas(price)}
        </Typography>
        {index == 0 && showcaseFirstItem ? (
          <Button onClick={handleAddItemToCart} color="primary" variant="contained" disableElevation size="small">
            Add to Cart
          </Button>
        ) : (
          <Tooltip title="Add to cart">
            <IconButton onClick={handleAddItemToCart} hidden={matches} size="small">
              <AddShoppingCart fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Product;
