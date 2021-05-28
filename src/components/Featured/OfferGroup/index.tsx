import React from "react";
import styles from "./OfferGroup.module.scss";
import type { ProductInterface } from "../../../redux/shop/types";
import Product from "./Product";
import cx from "classnames";

interface Props {
  offerProducts: ProductInterface[];
  isLoading: boolean;
}

const OfferGroup: React.FC<Props> = ({ offerProducts, isLoading }) => {
  return (
    <div className={styles.offer_grid}>
      {offerProducts.map((offerProduct, index) => (
        <div className={cx(index == 0 ? styles.first : styles.other)} key={index}>
          <Product isLoading={isLoading} productDetails={offerProduct} showcaseFirstItem={true} index={index} />
        </div>
      ))}
    </div>
  );
};

export default OfferGroup;
