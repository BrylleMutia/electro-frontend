import React from "react";
import styles from "./ProductDetails.module.scss";
import { useAppSelector } from "../../redux/hooks";
import cx from "classnames";

import AddToCartForm from "./AddToCartForm";
import Chip from "@material-ui/core/Chip";
import Rating from "@material-ui/lab/Rating";

function ProductDetails() {
  let { currentProduct } = useAppSelector((state) => state.shop);

  return (
    <div className={styles.product_container}>
      <div className={styles.product_image}>
        <img src={currentProduct?.product_image} alt="product" />
      </div>

      <div className={styles.details}>
        <div className={cx(styles.categories, styles.mb_sm)}>
          {currentProduct?.categories.map((category, index) => (
            <Chip size="small" key={index} label={category.name} />
          ))}
        </div>
        <h2>{currentProduct?.product_name}</h2>
        <h4>{currentProduct?.seller.name}</h4>
        <div className={styles.mb_sm}>
          <Rating name="disabled" value={3} readOnly />
        </div>
        <p className={styles.description}>{currentProduct?.description}</p>
      </div>

      <div className={styles.cart_form}>
        <AddToCartForm price={currentProduct?.price} />
      </div>
    </div>
  );
}

export default ProductDetails;
