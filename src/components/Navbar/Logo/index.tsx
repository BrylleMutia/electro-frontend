import React from "react";
import styles from "./Logo.module.scss";

function Logo() {
  return (
    <h3 className={styles.logo}>
      Electro<span>.</span>
    </h3>
  );
}

export default Logo;
