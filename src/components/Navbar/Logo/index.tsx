import React from "react";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <h3 className={styles.logo}>
        Electro<span>.</span>
      </h3>
    </Link>
  );
}

export default Logo;
