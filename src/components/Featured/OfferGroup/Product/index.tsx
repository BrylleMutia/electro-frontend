import React from "react";
import styles from "./Product.module.scss";
import { IconButton, Button, Typography, useMediaQuery } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import type { ProductInterface } from "../../../../redux/types";



interface Props {
  productDetails: ProductInterface,
  index: number
}

const Product: React.FC<Props> = ({ productDetails, index }) => {
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
        {index == 0 ? (
          <Button color="primary" variant="contained" disableElevation size="small">
            Add to Cart
          </Button>
        ) : (
          <IconButton style={{ background: "var(--primary)", padding: "0.4em" }} hidden={matches} size="small">
            <AddShoppingCart fontSize="small" />
          </IconButton>
        )}
      </div>
    </div>
  );
}


export default Product;