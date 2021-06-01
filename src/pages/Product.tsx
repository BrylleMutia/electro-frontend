import React, { useEffect } from "react";
import styles from "./Pages.module.scss";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../redux/shop/shopSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import CircularProgress from "@material-ui/core/CircularProgress";
import ProductNav from "../components/ProductNav";
import ProductDetails from "../components/ProductDetails";
import ProductTabs from "../components/ProductTabs";

interface RouteParams {
  product_id: string;
  selection: string;
}

function Product() {
  let { product_id } = useParams<RouteParams>();
  let { isLoading } = useAppSelector((state) => state.shop);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductDetails(product_id));
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  } else {
    return (
      <div>
        <div className={styles.container}>
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
      </div>
    );
  }
}

export default Product;
