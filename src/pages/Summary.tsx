import React from "react";
import styles from "./Pages.module.scss";
import { Link } from "react-router-dom";

import SummaryTable from "../components/SummaryTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CallToAction from "../components/CallToAction";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { StyledBreadcrumb } from "../components/StyledComponents";
import HomeIcon from "@material-ui/icons/Home";

function Summary() {
  return (
    <div className={styles.container}>
      <div className={styles.checkout_nav}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">
            <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} />
          </Link>
          <StyledBreadcrumb label="Summary" />
        </Breadcrumbs>
      </div>

      <div className={styles.payment_form}>
        <SummaryTable />
      </div>
    </div>
  );
}

export default Summary;
