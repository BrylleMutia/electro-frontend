import React from "react";
import styles from "./Buyer.module.scss";
import { Link } from "react-router-dom";

import CheckoutPreview from "../../components/CheckoutPreview";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { StyledBreadcrumb } from "../../components/StyledComponents";
import HomeIcon from "@material-ui/icons/Home";

function Checkout() {
  return (
    <div className={styles.container}>
      <div className={styles.checkout_nav}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">
            <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} />
          </Link>
          <StyledBreadcrumb label="Checkout" />
        </Breadcrumbs>
      </div>

      <div className={styles.my_md}>
        <CheckoutPreview />
      </div>
    </div>
  );
}

export default Checkout;
