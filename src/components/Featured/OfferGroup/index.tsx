import React from "react";
import styles from "./OfferGroup.module.scss";
import type { ProductInterface } from "../../../redux/shop/types";
import Product from "./Product";
import cx from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";

interface Props {
  offerProducts: ProductInterface[];
  isLoading: boolean;
}


const OfferGroup: React.FC<Props> = ({ offerProducts, isLoading }) => {
  const matches = useMediaQuery("(min-width: 576px)");

  return (
    <div className={styles.offer_grid}>
      {offerProducts.map((offerProduct, index) => (
        <div className={cx(index === 0 ? styles.first : styles.other)} key={index}>
          <Product mainProduct={index === 0 && matches ? true : false} isLoading={isLoading} productDetails={offerProduct} showcaseFirstItem={true} index={index} />
        </div>
      ))}
    </div>
  );
};

export default OfferGroup;
