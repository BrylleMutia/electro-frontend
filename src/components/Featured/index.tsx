import React from "react";
import styles from "./Featured.module.scss";
import Product1 from "./images/1/3.jpg";
import Product2 from "./images/2/2.jpg";
import Product3 from "./images/1/2.jpg";
import Product4 from "./images/2/1.png";
import Product5 from "./images/1/1.jpg";
import Product6 from "./images/2/3.webp";

export default function Featured() {
  return (
    <aside>
      <div className={styles.featured}>
        <div className={styles.first}><img src={Product4} alt="offer-1"/></div>
        <div><img src={Product1} alt="offer-1"/></div>
        <div><img src={Product3} alt="offer-1"/></div>
        <div><img src={Product5} alt="offer-1"/></div>
        <div><img src={Product6} alt="offer-1"/></div>
        <div><img src={Product2} alt="offer-1"/></div>
        <div><img src={Product2} alt="offer-1"/></div>
      </div>
    </aside>
  );
}
