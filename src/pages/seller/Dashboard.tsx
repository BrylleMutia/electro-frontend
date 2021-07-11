import React, { useEffect } from "react";
import styles from "./Seller.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSellerProducts, getProductOrders } from "../../redux/dashboard/dashboardSlice";

import LoadingBackdrop from "../../components/LoadingBackdrop";
import SellerProducts from "../../components/SellerProducts";
import SellerTopProducts from "../../components/SellerTopProducts";
import OrdersTable from "../../components/OrdersTable";
import Typography from "@material-ui/core/Typography";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.dashboard);


  useEffect(() => {
    dispatch(getSellerProducts(0));
    dispatch(getProductOrders(0));
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
      <div className={styles.my_xl}>
        <div className={styles.my_sm}>
          <Typography>Pending Orders</Typography>
        </div>
        <OrdersTable contentStatus="pending" color="secondary" />
      </div>
      <div className={styles.my_xl}>
        <div className={styles.my_sm}>
          <Typography>Fulfilled Orders</Typography>
        </div>
        <OrdersTable contentStatus={["shipped", "delivered"]} />
      </div>

      <LoadingBackdrop isLoading={isLoading} loadingText="Loading ..." />
    </main>
  );
}

export default Dashboard;
