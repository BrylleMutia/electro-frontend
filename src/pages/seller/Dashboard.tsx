import React, { useEffect } from "react";
import styles from "./Seller.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { getSellerProducts } from "../../redux/dashboard/dashboardSlice";

import SellerProducts from "../../components/SellerProducts";
import Button from "@material-ui/core/Button";

function Dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSellerProducts(0));
  })

  return (
    <main className={styles.container}>
      <div className={styles.my_xl}>
        <SellerProducts />
      </div>
    </main>
  );
}

export default Dashboard;
