import React, { useEffect } from "react";
import styles from "./Seller.module.scss";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

function Dashboard() {
  return (
    <main className={styles.container}>
      <div className={styles.mt_xl}>
        <Button component={Link} to="/product/new" variant="contained" disableElevation color="primary">
          Add New Product
        </Button>
      </div>
    </main>
  );
}

export default Dashboard;
