import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getAllProducts } from "../../redux/shop/shopSlice";
import styles from "./Buyer.module.scss";

import Showcase from "../../components/Showcase";
import Featured from "../../components/Featured";
import Categories from "../../components/Categories";
import Sellers from "../../components/Sellers";
import Notify from "../../components/Notify";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts(0));
  }, []);

  return (
    <>
      <section className={styles.showcase}>
        <Showcase />
      </section>
      <div className={styles.container}>
        <div className={styles.featured}>
          <Featured />
        </div>
      </div>
      <div id="categories" className={styles.category}>
        <div className={styles.container}>
          <Categories />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.sellers}>
          <Sellers />
        </div>
      </div>
      
      {/* for notifications / toast */}
      <Notify />
    </>
  );
}
