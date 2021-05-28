import React from "react";
import styles from "./ProductDetails.module.scss";
import { useAppSelector } from "../../redux/hooks";
import cx from "classnames";

import AddToCartForm from "./AddToCartForm";
import Chip from "@material-ui/core/Chip";
import Rating from "@material-ui/lab/Rating";
import Skeleton from "@material-ui/lab/Skeleton";

function ProductDetails() {
  let { currentProduct, isLoading } = useAppSelector((state) => state.shop);

  return (
    <div className={styles.product_container}>
      <div className={styles.product_image}>
        {isLoading ? (
          <Skeleton>
            <img src={currentProduct?.product_image} alt="product" />
          </Skeleton>
        ) : (
          <img src={currentProduct?.product_image} alt="product" />
        )}
      </div>

      <div className={styles.details}>
        <div className={cx(styles.categories, styles.mb_sm)}>
          {currentProduct?.categories.map((category, index) =>
            isLoading ? (
              <Skeleton>
                <Chip size="small" key={index} label={category.name} />
              </Skeleton>
            ) : (
              <Chip size="small" key={index} label={category.name} />
            )
          )}
        </div>
        <h2>{isLoading ? <Skeleton /> : currentProduct?.product_name}</h2>
        <h4>{isLoading ? <Skeleton /> : currentProduct?.seller.name}</h4>
        <div className={styles.mb_sm}>{isLoading ? <Skeleton /> : <Rating name="disabled" value={3} readOnly />}</div>
        <p className={styles.description}>{isLoading ? <Skeleton height="10em" /> : currentProduct?.description}</p>
      </div>

      <div className={styles.cart_form}>
        <AddToCartForm product={currentProduct} />
      </div>
    </div>
  );
}

export default ProductDetails;
