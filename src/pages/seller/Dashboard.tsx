import React, { useEffect } from "react";
import styles from "./Seller.module.scss";
import { useAppDispatch } from "../../redux/hooks";
import { getSellerProducts } from "../../redux/dashboard/dashboardSlice";

import SellerProducts from "../../components/SellerProducts";
import SellerTopProducts from "../../components/SellerTopProducts";
import Typography from "@material-ui/core/Typography";

function Dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSellerProducts(0));
  });

  return (
    <main className={styles.container}>
      <div className={styles.my_xl}>
        <SellerProducts />
      </div>
      <div className={styles.my_xl}>
        <div className={styles.my_sm}>
          <Typography>Top Selling Products</Typography>
        </div>
        <SellerTopProducts />
      </div>
    </main>
  );
}

export default Dashboard;
