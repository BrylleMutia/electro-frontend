import React from "react";
import styles from "./Product.module.scss";
import { IconButton, Button, Typography, useMediaQuery, Tooltip } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import type { ProductInterface } from "../../../../redux/types";
import cx from "classnames";

interface Props {
  productDetails: ProductInterface;
  index: number;
  showcaseFirstItem?: boolean;
}

const Product: React.FC<Props> = ({ productDetails, index, showcaseFirstItem = false }) => {
  const { product_name, product_image, price } = productDetails;

  const matches = useMediaQuery("(max-width: 768px)");

  return (
    <div className={styles.product}>
      <a href="#">
        <div className={styles.name_wrapper}>
          <Typography className={styles.product_name} variant="body1" color="secondary">
            {product_name}
          </Typography>
        </div>
        <div className={styles.overlay_container}>
          <img key={index} src={product_image} alt="offer-1" />
          <div className={styles.overlay}>
            <div className={styles.overlay_text}>See Details</div>
          </div>
        </div>
      </a>
      <div className={styles.details}>
        <Typography variant="body2" style={{ opacity: 0.6 }}>
          P {price.toLocaleString().replace(",", ", ")}
        </Typography>
        {index == 0 && showcaseFirstItem ? (
          <Button color="primary" variant="contained" disableElevation size="small">
            Add to Cart
          </Button>
        ) : (
          <Tooltip title="Add to cart">
            <IconButton hidden={matches} size="small">
              <AddShoppingCart fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Product;
