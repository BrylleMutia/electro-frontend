import React from "react";
import styles from "./OfferGroup.module.scss";
import type { ProductInterface } from "../../../redux/types";
import { IconButton, Button, Typography, useMediaQuery } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

interface Props {
  offerProducts: ProductInterface[];
}

const OfferGroup: React.FC<Props> = ({ offerProducts }) => {
  const matches = useMediaQuery("(max-width: 768px)");

  return (
    <div className={styles.offer_grid}>
      {offerProducts.map((offerProduct, index) => (
        <div className={index == 0 ? styles.first : ""}>
          <a href="#">
            <Typography className={styles.product_name} variant="body1" color="secondary">
              {offerProduct.product_name}
            </Typography>
            <div className={styles.overlay_container}>
              <img key={index} src={offerProduct.product_image} alt="offer-1" />
              <div className={styles.overlay}>
                <div className={styles.overlay_text}>See Details</div>
              </div>
            </div>
          </a>
          <div className={styles.product}>
            <Typography variant="body2" style={{ opacity: 0.6 }}>
              P {offerProduct.price.toLocaleString().replace(",", ", ")}
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
      ))}
    </div>
  );
};

export default OfferGroup;
