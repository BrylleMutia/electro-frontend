import React, { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { getAllProducts } from "../redux/shop/shopSlice";
import styles from "./Pages.module.scss";
import cx from "classnames";

import Navbar from "../components/Navbar";
import Showcase from "../components/Showcase";
import Featured from "../components/Featured";
import Categories from "../components/Categories";
import Sellers from "../components/Sellers";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts(0));
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Navbar />
      </div>
      <section className={styles.showcase}>
        <Showcase />
      </section>
      <div className={styles.container}>
        <div className={styles.featured}>
          <Featured />
        </div>
      </div>
      <div className={styles.category}>
        <div className={styles.container}>
          <Categories />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.sellers}>
          <Sellers />
        </div>
      </div>
      <CallToAction />
      <div className={styles.container}>
        <Footer />
      </div>
    </>
  );
}
