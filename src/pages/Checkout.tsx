import React from "react";
import styles from "./Pages.module.scss";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CallToAction from "../components/CallToAction";
import CartPreview from "../components/CartPreview";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { StyledBreadcrumb } from "../components/StyledComponents";
import HomeIcon from "@material-ui/icons/Home";

function Checkout() {
  return (
    <div>
      <Navbar disableCartButton={true} />
      <div className={styles.container}>
        <div className={styles.checkout_nav}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/">
              <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} />
            </Link>
            <StyledBreadcrumb label="Checkout" />
          </Breadcrumbs>
        </div>

        <CartPreview />
      </div>

      <CallToAction />
      <div className={styles.container}>
        <Footer />
      </div>
    </div>
  );
}

export default Checkout;
