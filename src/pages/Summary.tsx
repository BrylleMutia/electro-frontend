import React from "react";
import styles from "./Pages.module.scss";
import { Link } from "react-router-dom";

import SummaryTable from "../components/SummaryTable";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { StyledBreadcrumb } from "../components/StyledComponents";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import NavigateBefore from "@material-ui/icons/NavigateBefore"


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

        <Button component={Link} to="/" startIcon={<NavigateBefore />}>Home</Button>
      </div>
    </div>
  );
}

export default Summary;
