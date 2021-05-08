import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Showcase from "../components/Showcase";
import Featured from "../components/Featured";
import Categories from "../components/Categories";
import Sellers from "../components/Sellers";
import { useAppDispatch } from "../redux/hooks";
import { getAllProducts } from "../redux/shop/shopSlice";
import styles from "./Pages.module.scss";
import cx from "classnames";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts(0));
  }, []);

  return (
    <>
      <div className={styles.app}>
        <Navbar />
      </div>
      <section className={styles.showcase}>
        <Showcase />
      </section>
      <div className={styles.app}>
        <div className={styles.featured}>
          <Featured />
        </div>
      </div>
      <div className={styles.category}>
        <div className={styles.app}>
          <Categories />
        </div>
      </div>
      <div className={styles.app}>
        <Sellers />
      </div>
    </>
  );
}
