import React from "react";
import styles from "./OfferGroup.module.scss";
import type { ProductInterface } from "../../../redux/types";
import Product from "./Product";
import cx from "classnames";

interface Props {
  offerProducts: ProductInterface[];
}

const OfferGroup: React.FC<Props> = ({ offerProducts }) => {
  return (
    <div className={styles.offer_grid}>
      {offerProducts.map((offerProduct, index) => (
        <div className={cx(index == 0 ? styles.first : styles.other)} key={index}>
          <Product productDetails={offerProduct} showcaseFirstItem={true} index={index} />
        </div>
      ))}
    </div>
  );
};

export default OfferGroup;
