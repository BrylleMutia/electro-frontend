import React, { useEffect } from "react";
import styles from "./Pages.module.scss";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../redux/shop/shopSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import CircularProgress from "@material-ui/core/CircularProgress";
import Navbar from "../components/Navbar";
import ProductNav from "../components/ProductNav";
import ProductDetails from "../components/ProductDetails";
import ProductTabs from "../components/ProductTabs";

interface RouteParams {
  id: string;
  selection: string;
}

function Product() {
  let { id } = useParams<RouteParams>();
  let { isLoading } = useAppSelector((state) => state.shop);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  } else {
    return (
      <main>
        <div className={styles.container}>
          <Navbar />
          <div className={styles.product_nav}>
            <ProductNav />
          </div>
          <div className={styles.mb_md}>
            <ProductDetails />
          </div>
        </div>
        <div className={styles.product_tabs}>
          <div className={styles.container}>
            <ProductTabs />
          </div>
        </div>
      </main>
    );
  }
}

export default Product;
