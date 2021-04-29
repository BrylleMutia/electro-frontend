import React from "react";
import styles from "./OfferGroup.module.scss";
import type { ProductInterface } from "../../../redux/types";
import { IconButton, Button } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

interface Props {
  offerProducts: ProductInterface[];
}

const OfferGroup: React.FC<Props> = ({ offerProducts }) => {
  return (
    <div className={styles.offer_grid}>
      {offerProducts.map((offerProduct, index) => (
        <div className={index == 0 ? styles.first : ""}>
          <h4>{offerProduct.product_name}</h4>
          <img key={index} src={offerProduct.product_image} alt="offer-1" />
          <div className={styles.product}>
            <h4>P {offerProduct.price.toLocaleString()}</h4>
            {index == 0 ? (
              <Button color="primary" variant="contained" disableElevation size="small">Add to Cart</Button>
            ) : (
              <IconButton style={{ background: "var(--primary)", padding: "0.4em" }} size="small">
                <AddShoppingCart fontSize="small" />
              </IconButton>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferGroup;
